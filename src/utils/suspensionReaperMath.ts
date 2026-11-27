export interface SrSyntheticBar {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  annotation?: string;
}

export interface SuspensionCalcInput {
  c1Open: number;
  c1High: number;
  c1Low: number;
  c1Close: number;
  c2Open: number;
  c2High: number;
  c2Low: number;
  c2Close: number;
  c3Open: number;
  c3High: number;
  c3Low: number;
  c3Close: number;
}

export interface SuspensionCalcResult {
  direction: 'bullish' | 'bearish' | 'mixed';
  hasLowerBodyGap: boolean;
  hasUpperBodyGap: boolean;
  isTrueSuspensionBlock: boolean;
  isClassicOuterWickFvg: boolean;
  wicksOverlapBetweenBodies: boolean;
  lowerGapLow: number;
  lowerGapHigh: number;
  upperGapLow: number;
  upperGapHigh: number;
  coreBodyLow: number;
  coreBodyHigh: number;
  coreMidpoint: number;
  totalEnvelopeLow: number;
  totalEnvelopeHigh: number;
  envelopeMidpoint: number;
  statusLabel: string;
}

export function bodyLow(open: number, close: number): number {
  return Math.min(open, close);
}

export function bodyHigh(open: number, close: number): number {
  return Math.max(open, close);
}

export function analyzeSuspensionTriad(input: SuspensionCalcInput): SuspensionCalcResult {
  const b1Lo = bodyLow(input.c1Open, input.c1Close);
  const b1Hi = bodyHigh(input.c1Open, input.c1Close);
  const b2Lo = bodyLow(input.c2Open, input.c2Close);
  const b2Hi = bodyHigh(input.c2Open, input.c2Close);
  const b3Lo = bodyLow(input.c3Open, input.c3Close);
  const b3Hi = bodyHigh(input.c3Open, input.c3Close);

  const bullGap12 = b2Lo > b1Hi;
  const bullGap23 = b3Lo > b2Hi;
  const bearGap12 = b2Hi < b1Lo;
  const bearGap23 = b3Hi < b2Lo;

  let direction: 'bullish' | 'bearish' | 'mixed' = 'mixed';
  let hasLowerBodyGap = false;
  let hasUpperBodyGap = false;
  let lowerGapLow = b1Hi;
  let lowerGapHigh = b2Lo;
  let upperGapLow = b2Hi;
  let upperGapHigh = b3Lo;

  if (bullGap12 || bullGap23) {
    direction = 'bullish';
    hasLowerBodyGap = bullGap12;
    hasUpperBodyGap = bullGap23;
    lowerGapLow = Math.min(b1Hi, b2Lo);
    lowerGapHigh = Math.max(b1Hi, b2Lo);
    upperGapLow = Math.min(b2Hi, b3Lo);
    upperGapHigh = Math.max(b2Hi, b3Lo);
  } else if (bearGap12 || bearGap23) {
    direction = 'bearish';
    hasUpperBodyGap = bearGap12;
    hasLowerBodyGap = bearGap23;
    upperGapLow = Math.min(b2Hi, b1Lo);
    upperGapHigh = Math.max(b2Hi, b1Lo);
    lowerGapLow = Math.min(b3Hi, b2Lo);
    lowerGapHigh = Math.max(b3Hi, b2Lo);
  }

  const isTrueSuspensionBlock =
    (bullGap12 && bullGap23) || (bearGap12 && bearGap23);

  const isClassicOuterWickFvg =
    (direction === 'bullish' && input.c3Low > input.c1High) ||
    (direction === 'bearish' && input.c3High < input.c1Low);

  const wicksOverlapBetweenBodies =
    direction === 'bullish'
      ? input.c2Low <= input.c1High && input.c3Low <= input.c2High
      : direction === 'bearish'
        ? input.c2High >= input.c1Low && input.c3High >= input.c2Low
        : false;

  const coreBodyLow = b2Lo;
  const coreBodyHigh = b2Hi;
  const coreMidpoint = (coreBodyLow + coreBodyHigh) / 2;

  const totalEnvelopeLow = isTrueSuspensionBlock
    ? Math.min(lowerGapLow, coreBodyLow, upperGapLow)
    : coreBodyLow;
  const totalEnvelopeHigh = isTrueSuspensionBlock
    ? Math.max(lowerGapHigh, coreBodyHigh, upperGapHigh)
    : coreBodyHigh;
  const envelopeMidpoint = (totalEnvelopeLow + totalEnvelopeHigh) / 2;

  let statusLabel = 'No dual body-to-body gap detected around Candle 2';
  if (isTrueSuspensionBlock && !isClassicOuterWickFvg) {
    statusLabel = 'True Suspension Block (Dual Body VIs with Overlapping Wicks)';
  } else if (isTrueSuspensionBlock && isClassicOuterWickFvg) {
    statusLabel = 'Dual Body-Gap Suspension + Open Outer-Wick FVG';
  } else if (hasLowerBodyGap || hasUpperBodyGap) {
    statusLabel = 'Single Volume Imbalance Only (Missing Opposite Body Separation)';
  }

  return {
    direction,
    hasLowerBodyGap,
    hasUpperBodyGap,
    isTrueSuspensionBlock,
    isClassicOuterWickFvg,
    wicksOverlapBetweenBodies,
    lowerGapLow,
    lowerGapHigh,
    upperGapLow,
    upperGapHigh,
    coreBodyLow,
    coreBodyHigh,
    coreMidpoint,
    totalEnvelopeLow,
    totalEnvelopeHigh,
    envelopeMidpoint,
    statusLabel,
  };
}

export interface ReaperOverlapResult {
  validOverlap: boolean;
  reaperLow: number;
  reaperHigh: number;
  reaperMidpoint: number;
  reaperWidth: number;
  ifvgWidth: number;
  opposingFvgWidth: number;
}

export function computeReaperOverlap(
  ifvgLow: number,
  ifvgHigh: number,
  opposingFvgLow: number,
  opposingFvgHigh: number,
): ReaperOverlapResult {
  const l1 = Math.min(ifvgLow, ifvgHigh);
  const h1 = Math.max(ifvgLow, ifvgHigh);
  const l2 = Math.min(opposingFvgLow, opposingFvgHigh);
  const h2 = Math.max(opposingFvgLow, opposingFvgHigh);

  const reaperLow = Math.max(l1, l2);
  const reaperHigh = Math.min(h1, h2);
  const validOverlap = reaperHigh > reaperLow;

  return {
    validOverlap,
    reaperLow,
    reaperHigh,
    reaperMidpoint: validOverlap ? (reaperLow + reaperHigh) / 2 : (l1 + h1) / 2,
    reaperWidth: validOverlap ? reaperHigh - reaperLow : 0,
    ifvgWidth: h1 - l1,
    opposingFvgWidth: h2 - l2,
  };
}

export interface ContractCalibrationResult {
  basisOffsetPoints: number;
  frontLow: number;
  frontHigh: number;
  frontMidpoint: number;
  tickIncrement: number;
  tickValueUsd: number;
  zoneTickDepth: number;
  alignedFrontMidpoint: number;
}

export function calibrateContractLevel(
  continuousLow: number,
  continuousHigh: number,
  frontChartLast: number,
  continuousChartLast: number,
  tickIncrement = 0.25,
  tickValueUsd = 0.5,
): ContractCalibrationResult {
  const low = Math.min(continuousLow, continuousHigh);
  const high = Math.max(continuousLow, continuousHigh);
  const basisOffsetPoints = frontChartLast - continuousChartLast;
  const frontLow = low + basisOffsetPoints;
  const frontHigh = high + basisOffsetPoints;
  const frontMidpoint = (frontLow + frontHigh) / 2;
  const alignedFrontMidpoint = Math.round(frontMidpoint / tickIncrement) * tickIncrement;
  const zoneTickDepth = Math.round((frontHigh - frontLow) / tickIncrement);

  return {
    basisOffsetPoints,
    frontLow,
    frontHigh,
    frontMidpoint,
    tickIncrement,
    tickValueUsd,
    zoneTickDepth,
    alignedFrontMidpoint,
  };
}

export interface ConfluenceInputs {
  dualBodyGapVerified: boolean;
  breakerContextPresent: boolean;
  closeThroughIfvg: boolean;
  nestedOpposingFvg: boolean;
  contractFeedMatched: boolean;
  activeKillzoneWindow: boolean;
}

export function evaluateSuspensionReaperConfluence(
  inputs: ConfluenceInputs,
): {
  score: number;
  tier: 'High-Discipline Setup' | 'Conditional — Needs Further Confirmation' | 'Stand Aside — Missing Prerequisites';
  missing: string[];
} {
  const checks: Array<[boolean, string]> = [
    [inputs.dualBodyGapVerified, 'Two separated adjacent body gaps (Close/Open) or verified nested IFVG bounds'],
    [inputs.breakerContextPresent, 'Prior swing sweep + opposing structural break (Breaker context)'],
    [inputs.closeThroughIfvg, 'Explicit candle body close beyond prior gap to validate IFVG'],
    [inputs.nestedOpposingFvg, 'Overlapping opposing FVG or clean Volume Imbalance confluence zone'],
    [inputs.contractFeedMatched, 'Front-month active delivery chart matched against any continuous reference'],
    [inputs.activeKillzoneWindow, 'Observed inside stated America/New_York active session window'],
  ];
  const score = checks.filter(([ok]) => ok).length;
  const missing = checks.filter(([ok]) => !ok).map(([, msg]) => msg);
  const tier =
    score >= 5
      ? 'High-Discipline Setup'
      : score >= 3
        ? 'Conditional — Needs Further Confirmation'
        : 'Stand Aside — Missing Prerequisites';

  return { score, tier, missing };
}

export interface SrMtfProfile {
  tier: string;
  narrativeTf: string;
  zoneTf: string;
  triggerTf: string;
  primaryRole: string;
  invalidationRule: string;
}

export const suspensionReaperMtfProfiles: SrMtfProfile[] = [
  {
    tier: 'Intraday Index Scalping',
    narrativeTf: '15M / 1H',
    zoneTf: '5M Suspension or Breaker',
    triggerTf: '1M Reaper IFVG',
    primaryRole: 'Align NY AM/PM Sweep + 5M Suspension Core with 1M nested IFVG trigger.',
    invalidationRule: 'Candle body close through opposite edge of 5M Suspension envelope or Breaker extreme.',
  },
  {
    tier: 'Session Day Trading',
    narrativeTf: '4H / 1H',
    zoneTf: '15M Suspension Core',
    triggerTf: '5M Reaper IFVG Overlap',
    primaryRole: 'Track Daily/4H draw toward ERL while framing pullbacks inside 15M body-gap pockets.',
    invalidationRule: 'Confirmed 15M body close beyond Suspension total envelope or opposing Reaper boundary.',
  },
  {
    tier: 'Multi-Day Swing Study',
    narrativeTf: 'Weekly / Daily',
    zoneTf: '4H Suspension Block',
    triggerTf: '1H / 15M Breaker + Reaper',
    primaryRole: 'Use Daily/4H Suspension cores as mid-swing continuation shelves across active sessions.',
    invalidationRule: 'Daily or 4H closing break outside the full Suspension envelope on stated delivery contract.',
  },
];

// Synthetic teaching candle sequences (explicit invented prices, NQ-style & EUR/USD-style)
export const syntheticBullishSuspensionBars: SrSyntheticBar[] = [
  {
    label: 'C1',
    open: 20404,
    high: 20422,
    low: 20400,
    close: 20416,
    annotation: 'Candle 1 closes bullish at 20,416; upper wick reaches 20,422.',
  },
  {
    label: 'C2',
    open: 20420,
    high: 20438,
    low: 20415,
    close: 20430,
    annotation: 'Candle 2 gaps open at 20,420 (4 pts above C1 close), lower wick 20,415 overlaps C1 wick.',
  },
  {
    label: 'C3',
    open: 20435,
    high: 20462,
    low: 20421,
    close: 20456,
    annotation: 'Candle 3 gaps open at 20,435 (5 pts above C2 close); wicks overlap, suspending C2 body.',
  },
  {
    label: 'R1',
    open: 20455,
    high: 20458,
    low: 20436,
    close: 20440,
    annotation: 'Pullback begins downward toward Upper VI (20,430–20,435).',
  },
  {
    label: 'R2',
    open: 20440,
    high: 20442,
    low: 20418,
    close: 20425,
    annotation: 'Price dips into Suspension Core (20,420–20,430) and tests Lower VI top.',
  },
  {
    label: 'E1',
    open: 20425,
    high: 20454,
    low: 20423,
    close: 20450,
    annotation: 'Bullish expansion exits the Suspension Block after respecting body-gap boundaries.',
  },
  {
    label: 'E2',
    open: 20450,
    high: 20476,
    low: 20448,
    close: 20472,
    annotation: 'Follow-through candle pushes toward upper buy-side objective at 20,476.',
  },
];

export const syntheticBearishSuspensionBars: SrSyntheticBar[] = [
  {
    label: 'C1',
    open: 20520,
    high: 20524,
    low: 20502,
    close: 20506,
    annotation: 'Candle 1 closes bearish at 20,506 with lower wick dipping to 20,502.',
  },
  {
    label: 'C2',
    open: 20501,
    high: 20507,
    low: 20486,
    close: 20491,
    annotation: 'Candle 2 opens at 20,501 (5 pts below C1 close); upper wick 20,507 overlaps C1.',
  },
  {
    label: 'C3',
    open: 20486,
    high: 20503,
    low: 20464,
    close: 20468,
    annotation: 'Candle 3 opens at 20,486 (5 pts below C2 close); lower/upper wicks overlap, suspending C2.',
  },
  {
    label: 'R1',
    open: 20469,
    high: 20489,
    low: 20466,
    close: 20484,
    annotation: 'Counter-trend rally retests Lower VI pocket (20,486–20,491).',
  },
  {
    label: 'R2',
    open: 20484,
    high: 20502,
    low: 20482,
    close: 20494,
    annotation: 'Wick probes into Suspension Core midpoint (20,496) beneath Upper VI ceiling 20,506.',
  },
  {
    label: 'E1',
    open: 20494,
    high: 20496,
    low: 20462,
    close: 20466,
    annotation: 'Bearish displacement rejects the Suspension shelf below C2 body.',
  },
  {
    label: 'E2',
    open: 20466,
    high: 20469,
    low: 20442,
    close: 20446,
    annotation: 'Continuation sweeps prior low toward 20,442 objective.',
  },
];

export const syntheticBearishReaperBars: SrSyntheticBar[] = [
  {
    label: 'B1',
    open: 20500,
    high: 20512,
    low: 20498,
    close: 20510,
    annotation: 'Up-close Leg 1 pushes above prior high, forming bullish FVG1 (20,512–20,524).',
  },
  {
    label: 'B2',
    open: 20510,
    high: 20536,
    low: 20509,
    close: 20532,
    annotation: 'Impulse candle establishes wide bullish FVG1 interior.',
  },
  {
    label: 'SW',
    open: 20532,
    high: 20546,
    low: 20524,
    close: 20526,
    annotation: 'Sweep candle tags BSL at 20,546 and fails back into FVG1 top (20,524).',
  },
  {
    label: 'BRK',
    open: 20526,
    high: 20528,
    low: 20504,
    close: 20506,
    annotation: 'Closing break beneath bullish FVG1 (20,512) validates Bearish IFVG + Breaker.',
  },
  {
    label: 'SIBI',
    open: 20506,
    high: 20514,
    low: 20490,
    close: 20492,
    annotation: 'Leg 2 displacement prints bearish FVG2 (20,514–20,526) overlapping inverted FVG1 (20,512–20,524).',
  },
  {
    label: 'RET',
    open: 20492,
    high: 20521,
    low: 20491,
    close: 20509,
    annotation: 'Retracement tags nested Reaper FVG overlap (20,514–20,524) without closing above 20,528.',
  },
  {
    label: 'DROP',
    open: 20509,
    high: 20511,
    low: 20478,
    close: 20482,
    annotation: 'Reaper reaction drives downward out of the Breaker-nested overlap zone.',
  },
];

export const syntheticInvalidatedSuspensionBars: SrSyntheticBar[] = [
  {
    label: 'C1',
    open: 20405,
    high: 20420,
    low: 20402,
    close: 20415,
    annotation: 'Initial Candle 1 closes at 20,415.',
  },
  {
    label: 'C2',
    open: 20419,
    high: 20435,
    low: 20414,
    close: 20429,
    annotation: 'Candle 2 forms apparent Suspension Core (20,419–20,429) on continuous feed.',
  },
  {
    label: 'C3',
    open: 20433,
    high: 20454,
    low: 20428,
    close: 20450,
    annotation: 'Candle 3 closes higher at 20,450; continuous vs. front-month offset shifts real fill level.',
  },
  {
    label: 'R1',
    open: 20450,
    high: 20452,
    low: 20424,
    close: 20426,
    annotation: 'First touch taps core without LTF confirmation.',
  },
  {
    label: 'R2',
    open: 20426,
    high: 20432,
    low: 20408,
    close: 20410,
    annotation: 'Full body close below Lower VI (20,415) invalidates bullish Suspension thesis.',
  },
  {
    label: 'F1',
    open: 20410,
    high: 20418,
    low: 20392,
    close: 20396,
    annotation: 'Former Lower VI flips into overhead resistance during continued breakdown.',
  },
];
