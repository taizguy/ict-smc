export type BprPolarity = 'bullish' | 'bearish';
export type RdrbCinemaScenario = 'bullish-bpr' | 'bearish-bpr' | 'rdrb-redelivery' | 'bpr-invalidation';

export interface RdrbSyntheticBar {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  tag?: string;
}

export interface BprZoneCalculation {
  polarity: BprPolarity;
  fvg1Low: number;
  fvg1High: number;
  fvg2Low: number;
  fvg2High: number;
  validOverlap: boolean;
  touchOnly: boolean;
  bprLow: number;
  bprHigh: number;
  bprMid50: number;
  bprSpan: number;
  fvg1Span: number;
  fvg2Span: number;
  overlapPctFvg1: number;
  overlapPctFvg2: number;
  invalidationEdge: number;
  nearEdge: number;
}

export interface BprConfluenceInput {
  hasOverlap: boolean;
  hasSweepOrigin: boolean;
  hasDisplacementMss: boolean;
  inPdDiscountOrPremium: boolean;
  hasActiveSession: boolean;
}

export interface BprConfluenceResult {
  score: number;
  grade: 'qualified-bpr' | 'partial-bpr' | 'invalid-bpr';
  summary: string;
}

const r = (value: number, decimals: number) => Number(value.toFixed(decimals));

/**
 * Exact intersection arithmetic for two opposing Fair Value Gaps:
 * BPR_Low = max(FVG1_Low, FVG2_Low), BPR_High = min(FVG1_High, FVG2_High).
 * True overlap requires BPR_Low < BPR_High.
 */
export function computeBprZone(
  polarity: BprPolarity,
  fvg1Low: number,
  fvg1High: number,
  fvg2Low: number,
  fvg2High: number,
  decimals = 2,
): BprZoneCalculation {
  const l1 = Math.min(fvg1Low, fvg1High);
  const h1 = Math.max(fvg1Low, fvg1High);
  const l2 = Math.min(fvg2Low, fvg2High);
  const h2 = Math.max(fvg2Low, fvg2High);

  const bprLow = Math.max(l1, l2);
  const bprHigh = Math.min(h1, h2);
  const validOverlap = bprLow < bprHigh;
  const touchOnly = bprLow === bprHigh;
  const bprSpan = validOverlap ? r(bprHigh - bprLow, decimals) : 0;
  const bprMid50 = validOverlap ? r((bprLow + bprHigh) / 2, decimals) : r(bprLow, decimals);
  const fvg1Span = r(h1 - l1, decimals);
  const fvg2Span = r(h2 - l2, decimals);
  const overlapPctFvg1 = validOverlap && fvg1Span > 0 ? r((bprSpan / fvg1Span) * 100, 1) : 0;
  const overlapPctFvg2 = validOverlap && fvg2Span > 0 ? r((bprSpan / fvg2Span) * 100, 1) : 0;

  return {
    polarity,
    fvg1Low: r(l1, decimals),
    fvg1High: r(h1, decimals),
    fvg2Low: r(l2, decimals),
    fvg2High: r(h2, decimals),
    validOverlap,
    touchOnly,
    bprLow: r(bprLow, decimals),
    bprHigh: r(bprHigh, decimals),
    bprMid50,
    bprSpan,
    fvg1Span,
    fvg2Span,
    overlapPctFvg1,
    overlapPctFvg2,
    nearEdge: polarity === 'bullish' ? r(bprHigh, decimals) : r(bprLow, decimals),
    invalidationEdge: polarity === 'bullish' ? r(bprLow, decimals) : r(bprHigh, decimals),
  };
}

/**
 * Enigma range-projection sensitivity check: demonstrates why anchor choice (wick vs. body)
 * alters projected price levels prior to tick rounding.
 */
export function computeEnigmaProjection(
  anchorOpen: number,
  endpoint: number,
  multiplier = 1.25,
  decimals = 4,
) {
  const legLength = r(Math.abs(endpoint - anchorOpen), decimals);
  const direction = endpoint >= anchorOpen ? 1 : -1;
  const target = r(anchorOpen + direction * legLength * multiplier, decimals);
  return { anchorOpen, endpoint, multiplier, legLength, target };
}

export function evaluateBprConfluence(input: BprConfluenceInput): BprConfluenceResult {
  const checks = [
    input.hasOverlap,
    input.hasSweepOrigin,
    input.hasDisplacementMss,
    input.inPdDiscountOrPremium,
    input.hasActiveSession,
  ];
  const score = checks.filter(Boolean).length;

  if (!input.hasOverlap) {
    return {
      score,
      grade: 'invalid-bpr',
      summary: 'No true overlap: without intersecting opposing FVGs, this is either a sequential rebalance or single IFVG, not a BPR.',
    };
  }
  if (!input.hasDisplacementMss) {
    return {
      score,
      grade: 'invalid-bpr',
      summary: 'Missing displacement & MSS: two slow overlapping wicks inside balance lack directional expansion context.',
    };
  }
  if (score === 5) {
    return {
      score,
      grade: 'qualified-bpr',
      summary: 'Qualified BPR Confluence: true opposing FVG overlap backed by sweep origin, displacement MSS, PD alignment, and active session.',
    };
  }
  return {
    score,
    grade: 'partial-bpr',
    summary: 'Partial BPR Structure: valid overlap and displacement exist, but missing sweep/PD/session alignment lowers context conviction.',
  };
}

export interface RdrbMtfProfile {
  id: 'htf-aligned' | 'rdrb-nested' | 'counter-htf';
  title: string;
  htfBias: string;
  mtfZone: string;
  ltfTrigger: string;
  alignmentStatus: string;
  note: string;
}

export const rdrbMtfProfiles: RdrbMtfProfile[] = [
  {
    id: 'htf-aligned',
    title: 'Daily/4H Discount BPR + 15M/5M BPR',
    htfBias: '4H Bullish (SSL Swept -> 4H BPR Support)',
    mtfZone: '15M Bullish BPR inside 4H Discount',
    ltfTrigger: '5M FVG + 50% BPR Midpoint Reclaim',
    alignmentStatus: 'Aligned Context',
    note: 'Higher-timeframe directional draw and lower-timeframe BPR overlap reinforce the same liquidity objective.',
  },
  {
    id: 'rdrb-nested',
    title: '4H BPR Visit 1 + 15M RDRB Visit 2',
    htfBias: '4H Expansion away from Initial BPR',
    mtfZone: '15M BPR already reacted once & cleared internal high',
    ltfTrigger: 'Second clean revisit (RDRB) into 50% BPR midpoint in NY AM',
    alignmentStatus: 'Redelivered Structure',
    note: 'Visit 1 demonstrates initial reaction; Visit 2 requires clear swing separation and an intact far edge.',
  },
  {
    id: 'counter-htf',
    title: '5M Bullish BPR Directly Beneath 4H Bearish BPR',
    htfBias: '4H Bearish (Heading Lower)',
    mtfZone: '15M Bearish Overhead Resistance',
    ltfTrigger: 'Counter-trend 5M Bullish BPR',
    alignmentStatus: 'Conflicting Warning',
    note: 'Lower-timeframe BPRs colliding against dominant 4H delivery frequently fail through their far edge.',
  },
];

/** Synthetic NQ Bullish BPR sequence (Leg 1 Bearish FVG 20,440–20,460 overlapped by Leg 2 Bullish FVG 20,432–20,454 -> BPR 20,440–20,454, 50% = 20,447) */
export const syntheticBullishBprBars: RdrbSyntheticBar[] = [
  { label: 'B1', open: 20468, high: 20470, low: 20460, close: 20461, tag: 'FVG1 C1' },
  { label: 'B2', open: 20461, high: 20462, low: 20438, close: 20439, tag: 'SIBI Leg' },
  { label: 'B3', open: 20439, high: 20440, low: 20426, close: 20428 },
  { label: 'B4', open: 20428, high: 20430, low: 20418, close: 20424, tag: 'SSL Sweep' },
  { label: 'B5', open: 20424, high: 20432, low: 20422, close: 20431, tag: 'FVG2 C1' },
  { label: 'B6', open: 20431, high: 20456, low: 20430, close: 20455, tag: 'BISI Overlap' },
  { label: 'B7', open: 20455, high: 20468, low: 20454, close: 20466, tag: 'MSS' },
  { label: 'B8', open: 20466, high: 20467, low: 20451, close: 20453 },
  { label: 'B9', open: 20453, high: 20455, low: 20446.5, close: 20454, tag: '50% BPR' },
  { label: 'B10', open: 20454, high: 20476, low: 20453, close: 20475 },
  { label: 'B11', open: 20475, high: 20492, low: 20473, close: 20489, tag: 'BSL Draw' },
];

/** Synthetic EUR/USD Bearish BPR sequence (Leg 1 Bullish FVG 1.0842–1.0862 overlapped by Leg 2 Bearish FVG 1.0846–1.0868 -> BPR 1.0846–1.0862, 50% = 1.0854) */
export const syntheticBearishBprBars: RdrbSyntheticBar[] = [
  { label: 'E1', open: 1.0836, high: 1.0842, low: 1.0834, close: 1.0841, tag: 'FVG1 C1' },
  { label: 'E2', open: 1.0841, high: 1.0865, low: 1.0840, close: 1.0864, tag: 'BISI Leg' },
  { label: 'E3', open: 1.0864, high: 1.0875, low: 1.0862, close: 1.0873 },
  { label: 'E4', open: 1.0873, high: 1.0884, low: 1.0871, close: 1.0879, tag: 'BSL Sweep' },
  { label: 'E5', open: 1.0879, high: 1.0881, low: 1.0868, close: 1.0870, tag: 'FVG2 C1' },
  { label: 'E6', open: 1.0870, high: 1.0871, low: 1.0844, close: 1.0845, tag: 'SIBI Overlap' },
  { label: 'E7', open: 1.0845, high: 1.0846, low: 1.0832, close: 1.0835, tag: 'MSS' },
  { label: 'E8', open: 1.0835, high: 1.0849, low: 1.0834, close: 1.0848 },
  { label: 'E9', open: 1.0848, high: 1.08545, low: 1.0847, close: 1.0848, tag: '50% BPR' },
  { label: 'E10', open: 1.0848, high: 1.0849, low: 1.0826, close: 1.0828 },
  { label: 'E11', open: 1.0828, high: 1.0829, low: 1.0812, close: 1.0815, tag: 'SSL Draw' },
];

/** Synthetic RDRB (Redelivered Rebalanced) second-visit sequence on NQ BPR 20,440–20,454 */
export const syntheticRdrbSecondVisitBars: RdrbSyntheticBar[] = [
  { label: 'R1', open: 20468, high: 20470, low: 20460, close: 20461 },
  { label: 'R2', open: 20461, high: 20462, low: 20438, close: 20439, tag: 'SIBI' },
  { label: 'R3', open: 20439, high: 20440, low: 20426, close: 20428 },
  { label: 'R4', open: 20428, high: 20432, low: 20423, close: 20431 },
  { label: 'R5', open: 20431, high: 20456, low: 20430, close: 20455, tag: 'BPR Formed' },
  { label: 'R6', open: 20455, high: 20466, low: 20454, close: 20464 },
  { label: 'R7', open: 20464, high: 20465, low: 20449, close: 20459, tag: '1st Touch' },
  { label: 'R8', open: 20459, high: 20476, low: 20458, close: 20473, tag: '1st Bounce' },
  { label: 'R9', open: 20473, high: 20474, low: 20446, close: 20455, tag: '2nd Visit (RDRB)' },
  { label: 'R10', open: 20455, high: 20478, low: 20454, close: 20476 },
  { label: 'R11', open: 20476, high: 20496, low: 20475, close: 20494, tag: 'Expansion' },
];

/** Synthetic Invalidation sequence: Bullish BPR 20,440–20,454 fails when candle closes cleanly below 20,440 */
export const syntheticBprInvalidationBars: RdrbSyntheticBar[] = [
  { label: 'I1', open: 20468, high: 20470, low: 20460, close: 20461 },
  { label: 'I2', open: 20461, high: 20462, low: 20438, close: 20439 },
  { label: 'I3', open: 20439, high: 20440, low: 20426, close: 20428 },
  { label: 'I4', open: 20428, high: 20432, low: 20423, close: 20431 },
  { label: 'I5', open: 20431, high: 20456, low: 20430, close: 20455, tag: 'BPR Zone' },
  { label: 'I6', open: 20455, high: 20465, low: 20454, close: 20462 },
  { label: 'I7', open: 20462, high: 20463, low: 20447, close: 20451 },
  { label: 'I8', open: 20451, high: 20452, low: 20433, close: 20435, tag: 'Close < 20,440' },
  { label: 'I9', open: 20435, high: 20442, low: 20420, close: 20422, tag: 'Invalidated' },
];
