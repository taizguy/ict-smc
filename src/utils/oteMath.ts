export type OtePolarity = 'bullish' | 'bearish';
export type OteCinemaBranch = 'target' | 'invalidation' | 'shallow-miss' | 'deep-sweep';

export interface OteLevels {
  polarity: OtePolarity;
  anchorOrigin: number; // 1.0 level (Swing Low for bullish, Swing High for bearish)
  anchorEnd: number; // 0.0 level (Swing High for bullish, Swing Low for bearish)
  rangeSpan: number;
  equilibrium50: number;
  ote618: number;
  ote62: number;
  ote705: number;
  ote79: number;
  targetNeg27: number;
  targetNeg62: number;
  targetNeg100: number;
  targetNeg127: number;
  targetNeg162: number;
  stopPrice: number;
  rewardToNeg27: number;
  rewardToNeg62: number;
}

export interface OteConfluenceInput {
  inOteBand: boolean;
  hasFvgCe: boolean;
  hasOrderBlock: boolean;
  inKillzone: boolean;
}

export interface OteConfluenceResult {
  grade: 'qualified-ote' | 'partial-ote' | 'bare-fib' | 'invalid-zone';
  score: number;
  label: string;
  summary: string;
}

export interface OteSyntheticBar {
  label: string;
  timeNy: string;
  open: number;
  high: number;
  low: number;
  close: number;
  stage: number;
  tag?: string;
}

export interface OteMtfTier {
  id: 'htf' | 'mtf' | 'ltf';
  timeframe: string;
  role: string;
  rangeExample: string;
  focus: string;
}

const roundTo = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

/**
 * Computes Optimal Trade Entry Fibonacci retracement and extension levels inside a declared range.
 * Formula matches LearnSMC's OTE Calculator:
 *   Bullish: price(r) = anchorEnd - rangeSpan * r
 *   Bearish: price(r) = anchorEnd + rangeSpan * r
 */
export function computeOteLevels(
  polarity: OtePolarity,
  anchorOrigin: number,
  anchorEnd: number,
  decimals = 2,
  stopBufferPct = 0.05,
): OteLevels | null {
  if (!Number.isFinite(anchorOrigin) || !Number.isFinite(anchorEnd)) return null;
  if (polarity === 'bullish' && anchorEnd <= anchorOrigin) return null;
  if (polarity === 'bearish' && anchorEnd >= anchorOrigin) return null;

  const span = Math.abs(anchorEnd - anchorOrigin);
  if (span <= 0) return null;

  const atRatio = (r: number) =>
    roundTo(
      polarity === 'bullish' ? anchorEnd - span * r : anchorEnd + span * r,
      decimals,
    );

  const ote705 = atRatio(0.705);
  const stopPrice = roundTo(
    polarity === 'bullish'
      ? anchorOrigin - span * stopBufferPct
      : anchorOrigin + span * stopBufferPct,
    decimals,
  );
  const targetNeg27 = atRatio(-0.27);
  const targetNeg62 = atRatio(-0.62);
  const targetNeg100 = atRatio(-1.0);
  const targetNeg127 = atRatio(-1.272);
  const targetNeg162 = atRatio(-1.618);

  const riskDist = Math.abs(ote705 - stopPrice);
  const rewardToNeg27 = riskDist > 0 ? roundTo(Math.abs(targetNeg27 - ote705) / riskDist, 2) : 0;
  const rewardToNeg62 = riskDist > 0 ? roundTo(Math.abs(targetNeg62 - ote705) / riskDist, 2) : 0;

  return {
    polarity,
    anchorOrigin: roundTo(anchorOrigin, decimals),
    anchorEnd: roundTo(anchorEnd, decimals),
    rangeSpan: roundTo(span, decimals),
    equilibrium50: atRatio(0.5),
    ote618: atRatio(0.618),
    ote62: atRatio(0.62),
    ote705,
    ote79: atRatio(0.79),
    targetNeg27,
    targetNeg62,
    targetNeg100,
    targetNeg127,
    targetNeg162,
    stopPrice,
    rewardToNeg27,
    rewardToNeg62,
  };
}

export function classifyOteSlider(
  polarity: OtePolarity,
  anchorOrigin: number,
  anchorEnd: number,
  ratioPct: number,
  decimals = 2,
) {
  const levels = computeOteLevels(polarity, anchorOrigin, anchorEnd, decimals);
  if (!levels) return null;

  const clamped = Math.max(-0.2, Math.min(1.1, ratioPct / 100));
  const span = Math.abs(anchorEnd - anchorOrigin);
  const price = roundTo(
    polarity === 'bullish' ? anchorEnd - span * clamped : anchorEnd + span * clamped,
    decimals,
  );
  const riskDist = Math.abs(price - levels.stopPrice);
  const rNeg27 =
    clamped < 1 && riskDist > 0
      ? roundTo(Math.abs(levels.targetNeg27 - price) / riskDist, 2)
      : 0;
  const rNeg62 =
    clamped < 1 && riskDist > 0
      ? roundTo(Math.abs(levels.targetNeg62 - price) / riskDist, 2)
      : 0;

  let zoneStatus: 'invalidated' | 'sweet-spot' | 'ote-band' | 'equilibrium-shallow' | 'chasing';
  let zoneLabel: string;
  if (clamped > 1.0) {
    zoneStatus = 'invalidated';
    zoneLabel = 'Invalidated beyond 1.0 origin';
  } else if (clamped >= 0.68 && clamped <= 0.73) {
    zoneStatus = 'sweet-spot';
    zoneLabel = '0.705 Sweet Spot Core';
  } else if (clamped >= 0.618 && clamped <= 0.79) {
    zoneStatus = 'ote-band';
    zoneLabel =
      polarity === 'bullish' ? 'Inside Discount OTE (0.62–0.79)' : 'Inside Premium OTE (0.62–0.79)';
  } else if (clamped >= 0.5) {
    zoneStatus = 'equilibrium-shallow';
    zoneLabel =
      polarity === 'bullish'
        ? 'Shallow Discount (0.50–0.618)'
        : 'Shallow Premium (0.50–0.618)';
  } else {
    zoneStatus = 'chasing';
    zoneLabel =
      polarity === 'bullish' ? 'Premium Warning (< 0.50)' : 'Discount Warning (< 0.50)';
  }

  return {
    levels,
    ratio: roundTo(clamped, 3),
    price,
    rNeg27,
    rNeg62,
    zoneStatus,
    zoneLabel,
  };
}

export function evaluateOteConfluence(input: OteConfluenceInput): OteConfluenceResult {
  if (!input.inOteBand) {
    return {
      grade: 'invalid-zone',
      score: 0,
      label: 'Outside OTE Band — Stand Aside',
      summary:
        'Price has not reached the 0.62–0.79 zone; entering before 0.50 invites stop pressure and compresses potential R.',
    };
  }
  const score =
    1 + (input.hasFvgCe ? 1 : 0) + (input.hasOrderBlock ? 1 : 0) + (input.inKillzone ? 1 : 0);

  if (input.hasFvgCe && input.inKillzone && (input.hasOrderBlock || score >= 3)) {
    return {
      grade: 'qualified-ote',
      score,
      label: 'High-Confluence OTE Study',
      summary:
        '0.62–0.79 aligns with a clean PD array inside an active session window, anchored by a clear 1.0 invalidation line.',
    };
  }
  if (input.hasFvgCe || input.hasOrderBlock) {
    return {
      grade: 'partial-ote',
      score,
      label: 'Moderate Confluence — Confirm Timing or Structure',
      summary:
        'A PD array sits inside the 0.62–0.79 window, but checking Killzone timing or lower-timeframe structure improves clarity.',
    };
  }
  return {
    grade: 'bare-fib',
    score,
    label: 'Bare Fibonacci Line Only — Low Filter',
    summary:
      'Retracement numbers alone do not confirm participation; look for an overlapping FVG, Order Block, or Breaker first.',
  };
}

/** Synthetic NQ bullish dealing range: 20,400.00 (1.0) -> 20,500.00 (0.0) */
export const syntheticOteBullishBars: OteSyntheticBar[] = [
  { label: 'B1', timeNy: '09:30', open: 20416, high: 20420, low: 20400, close: 20406, stage: 1, tag: '1.0 Low' },
  { label: 'B2', timeNy: '09:35', open: 20406, high: 20438, low: 20404, close: 20434, stage: 2 },
  { label: 'B3', timeNy: '09:40', open: 20434, high: 20476, low: 20431, close: 20472, stage: 2, tag: 'FVG' },
  { label: 'B4', timeNy: '09:45', open: 20472, high: 20500, low: 20468, close: 20494, stage: 2, tag: '0.0 High' },
  { label: 'B5', timeNy: '09:50', open: 20494, high: 20496, low: 20462, close: 20466, stage: 3 },
  { label: 'B6', timeNy: '09:55', open: 20466, high: 20469, low: 20442, close: 20445, stage: 3, tag: '0.50 Eq' },
  { label: 'B7', timeNy: '10:00', open: 20445, high: 20447, low: 20427, close: 20435, stage: 4, tag: '0.705' },
  { label: 'B8', timeNy: '10:05', open: 20435, high: 20468, low: 20432, close: 20464, stage: 4 },
  { label: 'B9', timeNy: '10:10', open: 20464, high: 20504, low: 20460, close: 20498, stage: 5 },
  { label: 'B10', timeNy: '10:15', open: 20498, high: 20531, low: 20494, close: 20527, stage: 5, tag: '-0.27' },
  { label: 'B11', timeNy: '10:20', open: 20527, high: 20565, low: 20522, close: 20562, stage: 5, tag: '-0.62' },
];

/** Failure branch: price slices cleanly below the 1.0 origin (20,400.00) */
export const syntheticOteFailureBars: OteSyntheticBar[] = [
  ...syntheticOteBullishBars.slice(0, 6),
  { label: 'F7', timeNy: '10:00', open: 20445, high: 20447, low: 20426, close: 20429, stage: 4 },
  { label: 'F8', timeNy: '10:05', open: 20429, high: 20432, low: 20403, close: 20406, stage: 4 },
  { label: 'F9', timeNy: '10:10', open: 20406, high: 20410, low: 20382, close: 20386, stage: 5, tag: '1.0 Break' },
];

/** Shallow miss branch: bounces off 0.50 without reaching 0.62 OTE */
export const syntheticOteShallowBars: OteSyntheticBar[] = [
  ...syntheticOteBullishBars.slice(0, 5),
  { label: 'S6', timeNy: '09:55', open: 20466, high: 20471, low: 20449, close: 20468, stage: 3, tag: '0.50 Bounce' },
  { label: 'S7', timeNy: '10:00', open: 20468, high: 20502, low: 20465, close: 20498, stage: 4 },
  { label: 'S8', timeNy: '10:05', open: 20498, high: 20529, low: 20495, close: 20526, stage: 5, tag: 'Missed OTE' },
];

/** Deep sweep branch: wicks below 0.79 (20,415) without closing below 1.0 (20,400), then recovers */
export const syntheticOteDeepSweepBars: OteSyntheticBar[] = [
  ...syntheticOteBullishBars.slice(0, 6),
  { label: 'D7', timeNy: '10:00', open: 20445, high: 20447, low: 20413, close: 20432, stage: 4, tag: '0.87 Wick' },
  { label: 'D8', timeNy: '10:05', open: 20432, high: 20472, low: 20428, close: 20468, stage: 4 },
  { label: 'D9', timeNy: '10:10', open: 20468, high: 20506, low: 20464, close: 20501, stage: 5 },
  { label: 'D10', timeNy: '10:15', open: 20501, high: 20534, low: 20498, close: 20529, stage: 5, tag: '-0.27' },
];

/** Bearish synthetic EUR/USD dealing range: 1.0900 (1.0) -> 1.0800 (0.0) */
export const syntheticOteBearishBars: OteSyntheticBar[] = [
  { label: 'E1', timeNy: '03:00', open: 1.0884, high: 1.0900, low: 1.0880, close: 1.0888, stage: 1, tag: '1.0 High' },
  { label: 'E2', timeNy: '03:15', open: 1.0888, high: 1.0890, low: 1.0856, close: 1.0860, stage: 2 },
  { label: 'E3', timeNy: '03:30', open: 1.0860, high: 1.0863, low: 1.0824, close: 1.0828, stage: 2, tag: 'Bear OB' },
  { label: 'E4', timeNy: '03:45', open: 1.0828, high: 1.0832, low: 1.0800, close: 1.0805, stage: 2, tag: '0.0 Low' },
  { label: 'E5', timeNy: '07:00', open: 1.0805, high: 1.0842, low: 1.0802, close: 1.0838, stage: 3 },
  { label: 'E6', timeNy: '07:15', open: 1.0838, high: 1.0858, low: 1.0836, close: 1.0853, stage: 3, tag: '0.50 Eq' },
  { label: 'E7', timeNy: '07:30', open: 1.0853, high: 1.0874, low: 1.0850, close: 1.0861, stage: 4, tag: '0.705' },
  { label: 'E8', timeNy: '07:45', open: 1.0861, high: 1.0864, low: 1.0830, close: 1.0834, stage: 4 },
  { label: 'E9', timeNy: '08:00', open: 1.0834, high: 1.0836, low: 1.0796, close: 1.0799, stage: 5 },
  { label: 'E10', timeNy: '08:15', open: 1.0799, high: 1.0802, low: 1.0771, close: 1.0773, stage: 5, tag: '-0.27' },
  { label: 'E11', timeNy: '08:30', open: 1.0773, high: 1.0776, low: 1.0735, close: 1.0738, stage: 5, tag: '-0.62' },
];

export const syntheticOteBearishFailBars: OteSyntheticBar[] = [
  ...syntheticOteBearishBars.slice(0, 6),
  { label: 'EF7', timeNy: '07:30', open: 1.0853, high: 1.0877, low: 1.0851, close: 1.0875, stage: 4 },
  { label: 'EF8', timeNy: '07:45', open: 1.0875, high: 1.0898, low: 1.0872, close: 1.0894, stage: 4 },
  { label: 'EF9', timeNy: '08:00', open: 1.0894, high: 1.0916, low: 1.0891, close: 1.0912, stage: 5, tag: '1.0 Break' },
];

export const oteMtfProfiles: OteMtfTier[] = [
  {
    id: 'htf',
    timeframe: 'Daily / 4H Narrative Range',
    role: 'Defines the macro swing origin (1.0) and external target (0.0) across days or sessions.',
    rangeExample: 'Daily range 20,100 -> 20,600 (OTE zone 20,205 – 20,290)',
    focus: 'Sets overall directional bias and highlights where deeper pullbacks may attract swing interest.',
  },
  {
    id: 'mtf',
    timeframe: '1H / 15M Session Dealing Range',
    role: 'Frames the current London or New York impulse leg anchored after a session sweep.',
    rangeExample: '15M leg 20,400 -> 20,500 (0.705 Sweet Spot = 20,429.50)',
    focus: 'Maps overlapping 15M Fair Value Gaps and Order Blocks sitting directly inside 0.62–0.79.',
  },
  {
    id: 'ltf',
    timeframe: '5M / 1M Execution Trigger',
    role: 'Confirms price respects the higher-timeframe OTE band via a micro-MSS and local nested OTE.',
    rangeExample: '1M reaction 20,426 -> 20,456 inside the 15M 0.705 pocket',
    focus: 'Refines risk sizing and invalidation without guessing mid-air during fast falling candles.',
  },
];
