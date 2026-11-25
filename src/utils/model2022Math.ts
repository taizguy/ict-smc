export interface Model2022Bar {
  index: number;
  label: string;
  timeNy: string;
  open: number;
  high: number;
  low: number;
  close: number;
  phase: 'pre' | 'sweep' | 'mss' | 'fvg' | 'retrace' | 'target' | 'fail';
}

export interface FvgOteEvaluation {
  rangeHigh: number;
  rangeLow: number;
  fvgHigh: number;
  fvgLow: number;
  fvgCe: number;
  equilibrium50: number;
  ote62: number;
  ote705: number;
  ote79: number;
  selectedEntryPrice: number;
  depthPct: number;
  inDiscount: boolean;
  inOteBand: boolean;
  stopPrice: number;
  targetPrice: number;
  stopPoints: number;
  targetPoints: number;
  plannedR: number;
}

export interface MssCheckEvaluation {
  inTimeWindow: boolean;
  liquiditySwept: boolean;
  strongDisplacement: boolean;
  structureShifted: boolean;
  cleanFvgFormed: boolean;
  grade: 'qualified-setup' | 'wait-fvg' | 'unconfirmed-sweep' | 'out-of-window' | 'no-sweep';
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Pure arithmetic evaluator for bullish FVG Consequent Encroachment (CE)
 * and Optimal Trade Entry (0.62–0.79) alignment inside a synthetic NQ dealing leg.
 */
export function evaluateFvgOteConfluence(
  rangeLow: number,
  rangeHigh: number,
  fvgLow: number,
  fvgHigh: number,
  retraceDepthPct: number,
  targetPrice: number,
): FvgOteEvaluation | null {
  if (
    ![rangeLow, rangeHigh, fvgLow, fvgHigh, retraceDepthPct, targetPrice].every(Number.isFinite) ||
    rangeHigh <= rangeLow ||
    fvgHigh <= fvgLow
  ) {
    return null;
  }

  const legSpan = rangeHigh - rangeLow;
  const fvgSpan = fvgHigh - fvgLow;
  const fvgCe = round2(fvgLow + fvgSpan * 0.5);
  const equilibrium50 = round2(rangeLow + legSpan * 0.5);
  const ote62 = round2(rangeHigh - legSpan * 0.62);
  const ote705 = round2(rangeHigh - legSpan * 0.705);
  const ote79 = round2(rangeHigh - legSpan * 0.79);

  const clampedDepth = Math.max(0, Math.min(100, retraceDepthPct));
  const selectedEntryPrice = round2(fvgHigh - fvgSpan * (clampedDepth / 100));
  const stopPrice = round2(rangeLow - 2);
  const stopPoints = round2(selectedEntryPrice - stopPrice);
  const targetPoints = round2(targetPrice - selectedEntryPrice);

  return {
    rangeHigh,
    rangeLow,
    fvgHigh,
    fvgLow,
    fvgCe,
    equilibrium50,
    ote62,
    ote705,
    ote79,
    selectedEntryPrice,
    depthPct: Math.round(clampedDepth),
    inDiscount: selectedEntryPrice <= equilibrium50,
    inOteBand: selectedEntryPrice <= ote62 && selectedEntryPrice >= ote79,
    stopPrice,
    targetPrice,
    stopPoints,
    targetPoints,
    plannedR: stopPoints > 0 ? round2(targetPoints / stopPoints) : 0,
  };
}

/**
 * Sequential gate validator for ICT 2022 trigger verification.
 * Separates time window, sweep, displacement/MSS close, and strict No-FVG wait requirement.
 */
export function evaluate2022Sequence(input: {
  inTimeWindow: boolean;
  liquiditySwept: boolean;
  strongDisplacement: boolean;
  structureShifted: boolean;
  cleanFvgFormed: boolean;
}): MssCheckEvaluation {
  if (!input.inTimeWindow) return { ...input, grade: 'out-of-window' };
  if (!input.liquiditySwept) return { ...input, grade: 'no-sweep' };
  if (!input.strongDisplacement || !input.structureShifted) {
    return { ...input, grade: 'unconfirmed-sweep' };
  }
  if (!input.cleanFvgFormed) return { ...input, grade: 'wait-fvg' };
  return { ...input, grade: 'qualified-setup' };
}

/**
 * Deterministic synthetic NQ-style 5m/1m ICT 2022 Bullish Reversal series.
 * Illustrative teaching geometry only (not live quotes or historical NQ fills).
 * Prior SSL at 21,000 swept at 09:40 -> MSS above 21,020 -> Bullish FVG 21,012–21,032 (CE 21,022) -> BSL 21,085.
 */
export const synthetic2022BullishSeries: Model2022Bar[] = [
  { index: 0, label: 'B1', timeNy: '09:20', open: 21024, high: 21030, low: 21010, close: 21014, phase: 'pre' },
  { index: 1, label: 'B2', timeNy: '09:25', open: 21014, high: 21020, low: 21000, close: 21006, phase: 'pre' },
  { index: 2, label: 'B3', timeNy: '09:30', open: 21006, high: 21020, low: 21004, close: 21017, phase: 'pre' },
  { index: 3, label: 'B4', timeNy: '09:35', open: 21017, high: 21018, low: 21001, close: 21004, phase: 'pre' },
  { index: 4, label: 'SWP', timeNy: '09:40', open: 21004, high: 21007, low: 20986, close: 20996, phase: 'sweep' },
  { index: 5, label: 'C1', timeNy: '09:45', open: 20996, high: 21012, low: 20992, close: 21010, phase: 'mss' },
  { index: 6, label: 'C2', timeNy: '09:50', open: 21010, high: 21038, low: 21008, close: 21036, phase: 'fvg' },
  { index: 7, label: 'C3', timeNy: '09:55', open: 21036, high: 21060, low: 21032, close: 21054, phase: 'fvg' },
  { index: 8, label: 'RET1', timeNy: '10:00', open: 21054, high: 21055, low: 21034, close: 21037, phase: 'retrace' },
  { index: 9, label: 'RET2', timeNy: '10:05', open: 21037, high: 21039, low: 21019, close: 21028, phase: 'retrace' },
  { index: 10, label: 'EXP1', timeNy: '10:10', open: 21028, high: 21056, low: 21027, close: 21052, phase: 'target' },
  { index: 11, label: 'EXP2', timeNy: '10:15', open: 21052, high: 21072, low: 21049, close: 21068, phase: 'target' },
  { index: 12, label: 'TRG', timeNy: '10:20', open: 21068, high: 21090, low: 21064, close: 21086, phase: 'target' },
];

/**
 * Divergent continuation failure branch when there is weak displacement
 * and price slices straight through the 20,986 sweep extreme.
 */
export const synthetic2022FailureBranch: Model2022Bar[] = [
  { index: 5, label: 'WK-1', timeNy: '09:45', open: 20996, high: 21011, low: 20993, close: 21005, phase: 'fail' },
  { index: 6, label: 'WK-2', timeNy: '09:50', open: 21005, high: 21009, low: 20989, close: 20992, phase: 'fail' },
  { index: 7, label: 'FAIL', timeNy: '09:55', open: 20992, high: 20994, low: 20970, close: 20973, phase: 'fail' },
];

export interface KillzoneWindowSpec {
  id: 'midnight' | 'london' | 'ny-am-fx' | 'macro-830' | 'equity-930' | 'sb-1000' | 'ny-pm';
  label: string;
  nyWindow: string;
  utcEstEdt: string;
  karachiEstEdt: string;
  primaryMarkets: string;
  roleIn2022: string;
}

export const killzoneTimelineSpecs: KillzoneWindowSpec[] = [
  {
    id: 'midnight',
    label: 'Midnight Open',
    nyWindow: '00:00 NY Local',
    utcEstEdt: '05:00 / 04:00 UTC',
    karachiEstEdt: '10:00 / 09:00 PKT',
    primaryMarkets: 'Forex & Index Futures',
    roleIn2022: 'Reference open separating intraday Premium (above) from Discount (below) for Power of Three delivery.',
  },
  {
    id: 'london',
    label: 'London Killzone',
    nyWindow: '02:00–05:00 NY Local',
    utcEstEdt: '07:00–10:00 / 06:00–09:00',
    karachiEstEdt: '12:00–15:00 / 11:00–14:00',
    primaryMarkets: 'EUR/USD, GBP/USD, London Indices',
    roleIn2022: 'Frequently sweeps Asian Range high/low to print the daily Judas Swing and first MSS/FVG shift.',
  },
  {
    id: 'ny-am-fx',
    label: 'NY AM Forex',
    nyWindow: '07:00–10:00 NY Local',
    utcEstEdt: '12:00–15:00 / 11:00–14:00',
    karachiEstEdt: '17:00–20:00 / 16:00–19:00',
    primaryMarkets: 'Spot FX Majors & DXY',
    roleIn2022: 'Focus window for pairing NY Midnight Open reference with 08:30 news volatility sweeps.',
  },
  {
    id: 'macro-830',
    label: '08:30 News Macro',
    nyWindow: '08:30 NY Local',
    utcEstEdt: '13:30 / 12:30 UTC',
    karachiEstEdt: '18:30 / 17:30 PKT',
    primaryMarkets: 'NQ, ES, Treasury Yields, FX',
    roleIn2022: 'CPI/NFP/GDP release time; often creates the initial stop run prior to 09:30 equities opening range.',
  },
  {
    id: 'equity-930',
    label: '09:30 Equities Open',
    nyWindow: '09:30–11:00 NY Local',
    utcEstEdt: '14:30–16:00 / 13:30–15:00',
    karachiEstEdt: '19:30–21:00 / 18:30–20:00',
    primaryMarkets: 'NQ, ES, YM Index Futures',
    roleIn2022: 'Core index volatility window: 09:30 frequently sweeps 08:30 or London extremes before 5m/1m MSS.',
  },
  {
    id: 'sb-1000',
    label: '10:00–11:00 Overlap',
    nyWindow: '10:00–11:00 NY Local',
    utcEstEdt: '15:00–16:00 / 14:00–15:00',
    karachiEstEdt: '20:00–21:00 / 19:00–20:00',
    primaryMarkets: 'NQ, ES, EUR/USD',
    roleIn2022: 'Captures secondary continuation FVGs after 09:30 manipulation completes (aligns with Silver Bullet hour).',
  },
  {
    id: 'ny-pm',
    label: 'NY PM Session',
    nyWindow: '13:30–16:00 NY Local',
    utcEstEdt: '18:30–21:00 / 17:30–20:00',
    karachiEstEdt: '23:30–02:00 / 22:30–01:00',
    primaryMarkets: 'NQ, ES, Index Closing Hour',
    roleIn2022: 'Lunch-low/high sweep followed by afternoon trend expansion into close.',
  },
];

export interface Mtf2022Tier {
  id: 'swing' | 'intraday' | 'scalp';
  label: string;
  htfDrawChart: string;
  mssConfirmChart: string;
  entryFvgChart: string;
  typicalRiskStop: string;
  guidanceNote: string;
}

export const mtf2022Tiers: Mtf2022Tier[] = [
  {
    id: 'swing',
    label: 'Swing Alignment (D1 / 4H / 15m)',
    htfDrawChart: 'Daily / 4-Hour PD Array & PDH/PDL',
    mssConfirmChart: '1-Hour or 15-Minute Swing Break',
    entryFvgChart: '15-Minute or 5-Minute FVG inside OTE',
    typicalRiskStop: 'Above/below 1H–15m sweep wick',
    guidanceNote: 'Best for part-time learners holding multi-session expansions without 1-minute screen fatigue.',
  },
  {
    id: 'intraday',
    label: 'Standard Intraday (15m / 5m / 1m)',
    htfDrawChart: '1-Hour / 15-Minute Liquidity Pool',
    mssConfirmChart: '5-Minute or 3-Minute Displacement',
    entryFvgChart: '1-Minute or 2-Minute FVG Return',
    typicalRiskStop: 'Beyond 5m/1m sweep extreme',
    guidanceNote: 'Standard intraday pairing applied across NQ, ES, and major FX session examples.',
  },
  {
    id: 'scalp',
    label: 'Micro Session (5m / 1m / 15s)',
    htfDrawChart: '15-Minute / 5-Minute Session Extreme',
    mssConfirmChart: '1-Minute Displacement MSS',
    entryFvgChart: '1-Minute or 15-Second Nested FVG',
    typicalRiskStop: 'Tight structural extreme + buffer',
    guidanceNote: 'Highest noise sensitivity; spreads and slippage impact tiny stops heavily on lower timeframes.',
  },
];
