export interface CurveBar {
  index: number;
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  stage: 'oc' | 'ss1' | 'ss2' | 'smr' | 'lrb' | 'reacc1' | 'reacc2' | 'term' | 'fail';
}

export interface EquilibriumAnalysis {
  high: number;
  low: number;
  range: number;
  equilibrium: number;
  ote62: number;
  ote705: number;
  ote79: number;
  pricePositionPct: number;
  zone: 'extreme-premium' | 'premium' | 'equilibrium' | 'discount' | 'extreme-discount';
  model6EligibleLong: boolean;
  model6EligibleShort: boolean;
}

export interface SymmetryEvaluation {
  direction: 'mmbm' | 'mmsm';
  smrPrice: number;
  terminusPrice: number;
  projectedLeg: number;
  midpoint50: number;
  firstStageTarget: number;
  rMultipleAtMidpoint: number;
  rMultipleAtTerminus: number;
}

export interface CisdCheckResult {
  sweepOccurred: boolean;
  cisdBodyClosedBeyondOrigin: boolean;
  mssConfirmed: boolean;
  fvgFormed: boolean;
  grade: 'confirmed-smr' | 'early-cisd' | 'unconfirmed-sweep' | 'invalid';
}

const round4 = (n: number) => Math.round(n * 10000) / 10000;

/**
 * Pure Dealing Range Equilibrium & OTE calculator for Market Maker curve studies.
 * Directional Discount/Premium convention: longs only in Discount (< 50%), shorts only in Premium (> 50%).
 */
export function evaluateDealingRange(
  rangeHigh: number,
  rangeLow: number,
  currentPrice: number,
): EquilibriumAnalysis | null {
  if (!Number.isFinite(rangeHigh) || !Number.isFinite(rangeLow) || !Number.isFinite(currentPrice)) {
    return null;
  }
  const high = Math.max(rangeHigh, rangeLow);
  const low = Math.min(rangeHigh, rangeLow);
  const range = round4(high - low);
  if (range <= 0) return null;

  const equilibrium = round4(low + range * 0.5);
  // Long retracement OTE measured downward from high -> low
  const ote62 = round4(high - range * 0.62);
  const ote705 = round4(high - range * 0.705);
  const ote79 = round4(high - range * 0.79);

  const rawPct = ((currentPrice - low) / range) * 100;
  const pricePositionPct = Math.round(Math.max(0, Math.min(100, rawPct)) * 10) / 10;

  let zone: EquilibriumAnalysis['zone'] = 'equilibrium';
  if (currentPrice > high - range * 0.21) zone = 'extreme-premium';
  else if (currentPrice > equilibrium + range * 0.01) zone = 'premium';
  else if (currentPrice < low + range * 0.21) zone = 'extreme-discount';
  else if (currentPrice < equilibrium - range * 0.01) zone = 'discount';

  return {
    high,
    low,
    range,
    equilibrium,
    ote62,
    ote705,
    ote79,
    pricePositionPct,
    zone,
    model6EligibleLong: currentPrice < equilibrium,
    model6EligibleShort: currentPrice > equilibrium,
  };
}

/**
 * Evaluates the 50% Smart Money Reversal Symmetry distance between the SMR extreme
 * and the Original Consolidation Terminus objective, plus R-multiples before costs.
 */
export function evaluateCurveSymmetry(
  direction: 'mmbm' | 'mmsm',
  smrPrice: number,
  terminusPrice: number,
  entryPrice: number,
  stopPrice: number,
): SymmetryEvaluation | null {
  if (
    ![smrPrice, terminusPrice, entryPrice, stopPrice].every(Number.isFinite) ||
    smrPrice === terminusPrice
  ) {
    return null;
  }
  const projectedLeg = round4(Math.abs(terminusPrice - smrPrice));
  const midpoint50 =
    direction === 'mmbm'
      ? round4(smrPrice + projectedLeg * 0.5)
      : round4(smrPrice - projectedLeg * 0.5);
  const firstStageTarget =
    direction === 'mmbm'
      ? round4(smrPrice + projectedLeg * 0.382)
      : round4(smrPrice - projectedLeg * 0.382);

  const risk = Math.abs(entryPrice - stopPrice);
  const rewardMid = direction === 'mmbm' ? midpoint50 - entryPrice : entryPrice - midpoint50;
  const rewardTerm = direction === 'mmbm' ? terminusPrice - entryPrice : entryPrice - terminusPrice;

  return {
    direction,
    smrPrice,
    terminusPrice,
    projectedLeg,
    midpoint50,
    firstStageTarget,
    rMultipleAtMidpoint: risk > 0 ? Math.round((rewardMid / risk) * 100) / 100 : 0,
    rMultipleAtTerminus: risk > 0 ? Math.round((rewardTerm / risk) * 100) / 100 : 0,
  };
}

/**
 * Classifies an SMR confirmation trigger strictly by completed candle rules:
 * Sweep -> CISD (close through opposing delivery leg) -> MSS (close through swing point) + FVG.
 */
export function evaluateSmrTrigger(input: {
  sweepOccurred: boolean;
  cisdBodyClosedBeyondOrigin: boolean;
  mssConfirmed: boolean;
  fvgFormed: boolean;
}): CisdCheckResult {
  if (!input.sweepOccurred) {
    return { ...input, grade: 'invalid' };
  }
  if (input.cisdBodyClosedBeyondOrigin && input.mssConfirmed && input.fvgFormed) {
    return { ...input, grade: 'confirmed-smr' };
  }
  if (input.cisdBodyClosedBeyondOrigin) {
    return { ...input, grade: 'early-cisd' };
  }
  return { ...input, grade: 'unconfirmed-sweep' };
}

/**
 * Deterministic synthetic EUR/USD-style MMBM candle series (Original Consolidation 1.0920 -> SMR 1.0800 -> Terminus 1.0920).
 * Purely illustrative teaching geometry; not historical price data.
 */
export const syntheticMmbmSeries: CurveBar[] = [
  { index: 0, label: 'OC-1', open: 1.0906, high: 1.0922, low: 1.0898, close: 1.0914, stage: 'oc' },
  { index: 1, label: 'OC-2', open: 1.0914, high: 1.0924, low: 1.0895, close: 1.0902, stage: 'oc' },
  { index: 2, label: 'SS1-A', open: 1.0902, high: 1.0905, low: 1.0872, close: 1.0878, stage: 'ss1' },
  { index: 3, label: 'SS1-B', open: 1.0878, high: 1.0888, low: 1.0874, close: 1.0882, stage: 'ss1' },
  { index: 4, label: 'SS1-C', open: 1.0882, high: 1.0885, low: 1.0862, close: 1.0866, stage: 'ss1' },
  { index: 5, label: 'SS2-A', open: 1.0866, high: 1.0869, low: 1.0840, close: 1.0845, stage: 'ss2' },
  { index: 6, label: 'SS2-B', open: 1.0845, high: 1.0856, low: 1.0842, close: 1.0851, stage: 'ss2' },
  { index: 7, label: 'SMR-1', open: 1.0851, high: 1.0852, low: 1.0800, close: 1.0812, stage: 'smr' },
  { index: 8, label: 'SMR-2', open: 1.0812, high: 1.0848, low: 1.0808, close: 1.0844, stage: 'smr' },
  { index: 9, label: 'LRB-1', open: 1.0844, high: 1.0846, low: 1.0820, close: 1.0836, stage: 'lrb' },
  { index: 10, label: 'RA1-A', open: 1.0836, high: 1.0866, low: 1.0834, close: 1.0861, stage: 'reacc1' },
  { index: 11, label: 'RA1-B', open: 1.0861, high: 1.0864, low: 1.0848, close: 1.0856, stage: 'reacc1' },
  { index: 12, label: 'RA2-A', open: 1.0856, high: 1.0894, low: 1.0855, close: 1.0889, stage: 'reacc2' },
  { index: 13, label: 'RA2-B', open: 1.0889, high: 1.0892, low: 1.0875, close: 1.0884, stage: 'reacc2' },
  { index: 14, label: 'TERM', open: 1.0884, high: 1.0925, low: 1.0882, close: 1.0919, stage: 'term' },
];

/**
 * Divergent failure branch when SMR fails to hold / reclaim Equilibrium (1.0860) and rolls lower.
 */
export const syntheticMmbmFailureBranch: CurveBar[] = [
  { index: 9, label: 'WEAK-1', open: 1.0844, high: 1.0854, low: 1.0832, close: 1.0835, stage: 'fail' },
  { index: 10, label: 'WEAK-2', open: 1.0835, high: 1.0839, low: 1.0806, close: 1.0810, stage: 'fail' },
  { index: 11, label: 'FAIL-LO', open: 1.0810, high: 1.0816, low: 1.0785, close: 1.0791, stage: 'fail' },
];

export interface MtfPairingProfile {
  id: 'swing' | 'short-term' | 'intraday';
  label: string;
  htfContext: string;
  curveMap: string;
  executionTrigger: string;
  typicalHold: string;
  keyFilter: string;
}

export const mtfPairingProfiles: MtfPairingProfile[] = [
  {
    id: 'swing',
    label: 'Multi-Week Swing Profile',
    htfContext: 'Monthly / Weekly PD Array',
    curveMap: 'Daily (D1) MMBM / MMSM Curve',
    executionTrigger: '4-Hour / 1-Hour SMR & FVG',
    typicalHold: '3 to 15 trading days',
    keyFilter: 'Wait for Weekly extreme tag plus Daily CISD/MSS before sizing Stage 1.',
  },
  {
    id: 'short-term',
    label: 'Short-Term Swing Profile',
    htfContext: 'Weekly / Daily PD Array',
    curveMap: '4-Hour / 1-Hour MMBM / MMSM Curve',
    executionTrigger: '15-Minute / 5-Minute SMR & Breaker',
    typicalHold: '1 to 3 trading days',
    keyFilter: 'Pair 20-day IPDA lookback with Tuesday/Wednesday Midweek Reversal windows.',
  },
  {
    id: 'intraday',
    label: 'Intraday Session Profile',
    htfContext: 'Daily / 4-Hour Session High-Low',
    curveMap: '15-Minute / 5-Minute Session Curve',
    executionTrigger: '1-Minute CISD / FVG inside Killzone',
    typicalHold: '30 minutes to 4 hours',
    keyFilter: 'Requires London or New York Killzone timing and Low-Resistance path.',
  },
];
