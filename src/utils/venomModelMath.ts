// Deterministic arithmetic & synthetic candle builders for Chapter 67 (ID 53):
// Venom Model — Opening Range, Sweep & Two Fangs

export interface VenomCandle {
  index: number;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  role: 'range' | 'fang1' | 'fang2' | 'retest' | 'outcome';
}

export interface BprOverlapResult {
  hasOverlap: boolean;
  overlapLow: number;
  overlapHigh: number;
  width: number;
  midpoint: number;
  fang1Width: number;
  fang2Width: number;
}

export interface EntryChasingMetrics {
  entry: number;
  stop: number;
  target: number;
  risk: number;
  reward: number;
  rr: number;
  breakEvenBeforeCostsPct: number;
  valid: boolean;
}

export function computeBprOverlap(
  fvg1Low: number,
  fvg1High: number,
  fvg2Low: number,
  fvg2High: number,
): BprOverlapResult {
  const lo1 = Math.min(fvg1Low, fvg1High);
  const hi1 = Math.max(fvg1Low, fvg1High);
  const lo2 = Math.min(fvg2Low, fvg2High);
  const hi2 = Math.max(fvg2Low, fvg2High);
  const overlapLow = Math.max(lo1, lo2);
  const overlapHigh = Math.min(hi1, hi2);
  const width = Number(Math.max(0, overlapHigh - overlapLow).toFixed(2));
  const hasOverlap = overlapHigh > overlapLow;
  const midpoint = hasOverlap ? Number(((overlapLow + overlapHigh) / 2).toFixed(2)) : 0;
  return {
    hasOverlap,
    overlapLow: Number(overlapLow.toFixed(2)),
    overlapHigh: Number(overlapHigh.toFixed(2)),
    width,
    midpoint,
    fang1Width: Number((hi1 - lo1).toFixed(2)),
    fang2Width: Number((hi2 - lo2).toFixed(2)),
  };
}

export function computeEntryPlan(
  direction: 'bearish' | 'bullish',
  entry: number,
  stop: number,
  target: number,
): EntryChasingMetrics {
  const risk = direction === 'bearish' ? stop - entry : entry - stop;
  const reward = direction === 'bearish' ? entry - target : target - entry;
  const valid = risk > 0 && reward > 0;
  const rr = valid ? Number((reward / risk).toFixed(2)) : 0;
  const breakEvenBeforeCostsPct = valid ? Number(((1 / (1 + reward / risk)) * 100).toFixed(1)) : 0;
  return {
    entry: Number(entry.toFixed(2)),
    stop: Number(stop.toFixed(2)),
    target: Number(target.toFixed(2)),
    risk: Number(Math.max(0, risk).toFixed(2)),
    reward: Number(Math.max(0, reward).toFixed(2)),
    rr,
    breakEvenBeforeCostsPct,
    valid,
  };
}

export type VenomBranch = 'deferred-fill' | 'unfilled-runaway' | 'closing-failure';

const VENOM_BASE_CANDLES: VenomCandle[] = [
  { index: 0, time: '08:30', open: 103.0, high: 106.5, low: 100.0, close: 105.0, role: 'range' },
  { index: 1, time: '09:00', open: 105.0, high: 110.0, low: 104.2, close: 108.5, role: 'range' },
  { index: 2, time: '09:25', open: 108.5, high: 109.6, low: 105.8, close: 107.2, role: 'range' },
  { index: 3, time: '09:31', open: 107.2, high: 113.0, low: 107.0, close: 112.0, role: 'fang1' },
  { index: 4, time: '09:32', open: 112.0, high: 112.6, low: 110.2, close: 111.0, role: 'fang1' },
  { index: 5, time: '09:33', open: 111.0, high: 111.3, low: 107.4, close: 108.0, role: 'fang2' },
  { index: 6, time: '09:34', open: 108.0, high: 108.6, low: 106.8, close: 107.5, role: 'fang2' },
];

const VENOM_BRANCH_TAILS: Record<VenomBranch, VenomCandle[]> = {
  'deferred-fill': [
    { index: 7, time: '09:36', open: 107.5, high: 111.2, low: 107.2, close: 109.4, role: 'retest' },
    { index: 8, time: '09:39', open: 109.4, high: 109.8, low: 105.4, close: 105.8, role: 'outcome' },
    { index: 9, time: '09:43', open: 105.8, high: 106.2, low: 103.6, close: 104.0, role: 'outcome' },
  ],
  'unfilled-runaway': [
    { index: 7, time: '09:36', open: 107.5, high: 108.9, low: 105.6, close: 106.0, role: 'retest' },
    { index: 8, time: '09:39', open: 106.0, high: 106.4, low: 104.2, close: 104.5, role: 'outcome' },
    { index: 9, time: '09:43', open: 104.5, high: 105.0, low: 101.8, close: 102.2, role: 'outcome' },
  ],
  'closing-failure': [
    { index: 7, time: '09:36', open: 107.5, high: 111.6, low: 107.4, close: 111.4, role: 'retest' },
    { index: 8, time: '09:39', open: 111.4, high: 114.8, low: 111.0, close: 114.4, role: 'outcome' },
    { index: 9, time: '09:43', open: 114.4, high: 116.4, low: 113.8, close: 115.8, role: 'outcome' },
  ],
};

export function getVenomSceneCandles(branch: VenomBranch): VenomCandle[] {
  return [...VENOM_BASE_CANDLES, ...VENOM_BRANCH_TAILS[branch]];
}
