export interface BreakerCandle {
  index: number;
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  role?: 'swing-a' | 'origin-b' | 'sweep-c' | 'mss-d' | 'retest-e' | 'fvg' | 'normal';
}

export interface BreakerZoneMetrics {
  direction: 'bullish' | 'bearish';
  openingPrice: number;
  bodyLow: number;
  bodyHigh: number;
  bodyMidpoint: number;
  fullLow: number;
  fullHigh: number;
  fullMidpoint: number;
  bodySpan: number;
  fullSpan: number;
}

export interface UnicornOverlapResult {
  lower: number;
  upper: number;
  width: number;
  status: 'positive-overlap' | 'touching-only' | 'disjoint';
  fvgMidpoint: number;
  breakerMidpoint: number;
  fvgCeInsideOverlap: boolean;
}

export type BreakerSceneScenarioId =
  | 'bullish-breaker'
  | 'bearish-breaker'
  | 'unicorn-overlap'
  | 'wick-trap';

export interface BreakerSceneScenario {
  id: BreakerSceneScenarioId;
  title: string;
  badge: string;
  direction: 'bullish' | 'bearish' | 'invalid';
  summary: string;
  priceMin: number;
  priceMax: number;
  zoneLow: number;
  zoneHigh: number;
  zoneMid: number;
  fvgLow?: number;
  fvgHigh?: number;
  sweepLevel: number;
  sweepLabel: string;
  mssLevel: number;
  mssLabel: string;
  candles: BreakerCandle[];
  steps: {
    index: number;
    phase: string;
    caption: string;
    visibleCount: number;
    highlightZone: boolean;
    highlightFvg: boolean;
    showSweepLine: boolean;
    showMssLine: boolean;
  }[];
}

export function computeBreakerZoneMetrics(
  candles: Pick<BreakerCandle, 'open' | 'high' | 'low' | 'close'>[],
  direction: 'bullish' | 'bearish',
): BreakerZoneMetrics {
  const first = candles[0];
  const openingPrice = first.open;
  const bodyLows = candles.map((c) => Math.min(c.open, c.close));
  const bodyHighs = candles.map((c) => Math.max(c.open, c.close));
  const fullLows = candles.map((c) => c.low);
  const fullHighs = candles.map((c) => c.high);

  const bodyLow = Math.min(...bodyLows);
  const bodyHigh = Math.max(...bodyHighs);
  const fullLow = Math.min(...fullLows);
  const fullHigh = Math.max(...fullHighs);

  return {
    direction,
    openingPrice,
    bodyLow,
    bodyHigh,
    bodyMidpoint: Number(((bodyLow + bodyHigh) / 2).toFixed(2)),
    fullLow,
    fullHigh,
    fullMidpoint: Number(((fullLow + fullHigh) / 2).toFixed(2)),
    bodySpan: Number((bodyHigh - bodyLow).toFixed(2)),
    fullSpan: Number((fullHigh - fullLow).toFixed(2)),
  };
}

export function computeUnicornOverlap(
  bbLow: number,
  bbHigh: number,
  fvgLow: number,
  fvgHigh: number,
): UnicornOverlapResult {
  const safeBbLow = Math.min(bbLow, bbHigh);
  const safeBbHigh = Math.max(bbLow, bbHigh);
  const safeFvgLow = Math.min(fvgLow, fvgHigh);
  const safeFvgHigh = Math.max(fvgLow, fvgHigh);

  const lower = Math.max(safeBbLow, safeFvgLow);
  const upper = Math.min(safeBbHigh, safeFvgHigh);
  const rawWidth = Number((upper - lower).toFixed(2));
  const fvgMidpoint = Number(((safeFvgLow + safeFvgHigh) / 2).toFixed(2));
  const breakerMidpoint = Number(((safeBbLow + safeBbHigh) / 2).toFixed(2));

  let status: UnicornOverlapResult['status'] = 'disjoint';
  if (rawWidth > 0) status = 'positive-overlap';
  else if (rawWidth === 0) status = 'touching-only';

  const fvgCeInsideOverlap =
    status === 'positive-overlap' && fvgMidpoint >= lower && fvgMidpoint <= upper;

  return {
    lower: Number(lower.toFixed(2)),
    upper: Number(upper.toFixed(2)),
    width: Math.max(0, rawWidth),
    status,
    fvgMidpoint,
    breakerMidpoint,
    fvgCeInsideOverlap,
  };
}

export interface BreakerGateInput {
  htfBias: boolean;
  externalSweep: boolean;
  bodyCloseMss: boolean;
  fvgUnicornOverlap: boolean;
  activeKillzone: boolean;
  predefinedInvalidation: boolean;
}

export interface BreakerConfluenceScore {
  score: number;
  maxScore: number;
  tier: 'High-Probability Grade A' | 'Conditional Grade B' | 'Incomplete / No-Trade';
  weakestLink: string;
}

export function evaluateBreakerConfluence(gates: BreakerGateInput): BreakerConfluenceScore {
  const weights: [keyof BreakerGateInput, number, string][] = [
    ['externalSweep', 2, 'No prior liquidity sweep beyond Point A (this behaves like a mitigation block, not a breaker).'],
    ['bodyCloseMss', 2, 'Missing a completed candle body close through Point B (wick-only probes do not confirm a structural flip).'],
    ['htfBias', 2, 'No higher-timeframe directional bias or opposing liquidity draw aligned with the flip.'],
    ['fvgUnicornOverlap', 1, 'No positive-width Fair Value Gap overlapping the breaker (standard breaker rather than a Unicorn zone).'],
    ['activeKillzone', 1, 'Outside a primary London or New York liquidity window (lower volume can stall expansion).'],
    ['predefinedInvalidation', 2, 'No fixed closing invalidation level and protective stop budget defined prior to entry.'],
  ];

  let score = 0;
  let weakestLink = 'All six structural, timing, and risk gates are aligned for controlled study execution.';

  for (const [key, weight] of weights) {
    if (gates[key]) score += weight;
  }

  for (const [key, , message] of weights) {
    if (!gates[key]) {
      weakestLink = message;
      break;
    }
  }

  const coreStructureMet = gates.externalSweep && gates.bodyCloseMss && gates.predefinedInvalidation;
  let tier: BreakerConfluenceScore['tier'] = 'Incomplete / No-Trade';
  if (coreStructureMet && score >= 8) {
    tier = 'High-Probability Grade A';
  } else if (coreStructureMet && score >= 6) {
    tier = 'Conditional Grade B';
  }

  return {
    score,
    maxScore: 10,
    tier,
    weakestLink,
  };
}

export const BREAKER_SCENE_SCENARIOS: BreakerSceneScenario[] = [
  {
    id: 'bullish-breaker',
    title: 'Bullish Breaker (A–B–C–D Flip)',
    badge: 'Synthetic OHLC · Bullish Polarity',
    direction: 'bullish',
    summary:
      'Low A (100) forms, rallies to High B (110, saving the up-close origin at 106–110), sweeps below A to C (98), closes above B at D (112), and retests 106–110 from above as support.',
    priceMin: 95,
    priceMax: 118,
    zoneLow: 106,
    zoneHigh: 110,
    zoneMid: 108,
    sweepLevel: 100,
    sweepLabel: 'Point A Low (100.00)',
    mssLevel: 110,
    mssLabel: 'Point B High / MSS (110.00)',
    candles: [
      { index: 0, label: 'C1', open: 105, high: 106, low: 102, close: 103, role: 'normal' },
      { index: 1, label: 'A', open: 103, high: 104, low: 100, close: 102, role: 'swing-a' },
      { index: 2, label: 'C3', open: 102, high: 107, low: 101.5, close: 106.5, role: 'normal' },
      { index: 3, label: 'B', open: 106.5, high: 110, low: 106, close: 109.5, role: 'origin-b' },
      { index: 4, label: 'C5', open: 109.5, high: 109.8, low: 103.5, close: 104, role: 'normal' },
      { index: 5, label: 'C', open: 104, high: 104.5, low: 98, close: 101, role: 'sweep-c' },
      { index: 6, label: 'C7', open: 101, high: 107.5, low: 100.5, close: 107, role: 'normal' },
      { index: 7, label: 'D', open: 107, high: 113, low: 106.8, close: 112, role: 'mss-d' },
      { index: 8, label: 'C9', open: 112, high: 112.5, low: 109.5, close: 110.2, role: 'normal' },
      { index: 9, label: 'E', open: 110.2, high: 111.5, low: 107.6, close: 111.2, role: 'retest-e' },
      { index: 10, label: 'C11', open: 111.2, high: 116.5, low: 111, close: 115.8, role: 'normal' },
    ],
    steps: [
      {
        index: 0,
        phase: '1 · Swing Low A & High B',
        caption: 'Low A prints at 100.00 and price rallies into Swing High B (106.00–110.00), saving the final up-close reference before the drop.',
        visibleCount: 4,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: false,
      },
      {
        index: 1,
        phase: '2 · Sell-Side Sweep at C',
        caption: 'Price sells off sharply below Low A (100.00) down to 98.00, sweeping external sell-side liquidity and triggering breakout sellers.',
        visibleCount: 6,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: true,
      },
      {
        index: 2,
        phase: '3 · Body-Close MSS at D',
        caption: 'Displacement surges upward and closes firmly at 112.00 above High B (110.00). The old bearish origin at 106–110 flips into a Bullish Breaker.',
        visibleCount: 8,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: true,
      },
      {
        index: 3,
        phase: '4 · Retest E & Expansion',
        caption: 'Price retraces into the 106–110 Bullish Breaker near its 108.00 Mean Threshold and expands toward 116.50 without closing below 106.00.',
        visibleCount: 11,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: true,
      },
    ],
  },
  {
    id: 'bearish-breaker',
    title: 'Bearish Breaker (High Sweep + Breakdown)',
    badge: 'Synthetic OHLC · Bearish Polarity',
    direction: 'bearish',
    summary:
      'High A (110) drops to Low B (100, saving the down-close origin at 100–104), sweeps above A to C (112), closes below B at D (98), and retests 100–104 from below as resistance.',
    priceMin: 92,
    priceMax: 115,
    zoneLow: 100,
    zoneHigh: 104,
    zoneMid: 102,
    sweepLevel: 110,
    sweepLabel: 'Point A High (110.00)',
    mssLevel: 100,
    mssLabel: 'Point B Low / MSS (100.00)',
    candles: [
      { index: 0, label: 'C1', open: 106, high: 108.5, low: 105.5, close: 108, role: 'normal' },
      { index: 1, label: 'A', open: 108, high: 110, low: 107.2, close: 107.5, role: 'swing-a' },
      { index: 2, label: 'C3', open: 107.5, high: 107.8, low: 103.5, close: 104, role: 'normal' },
      { index: 3, label: 'B', open: 103.5, high: 104, low: 100, close: 100.8, role: 'origin-b' },
      { index: 4, label: 'C5', open: 100.8, high: 107, low: 100.5, close: 106.5, role: 'normal' },
      { index: 5, label: 'C', open: 106.5, high: 112, low: 106, close: 109, role: 'sweep-c' },
      { index: 6, label: 'C7', open: 109, high: 109.2, low: 102.5, close: 103, role: 'normal' },
      { index: 7, label: 'D', open: 103, high: 103.4, low: 97.2, close: 98, role: 'mss-d' },
      { index: 8, label: 'C9', open: 98, high: 101, low: 97.5, close: 100.4, role: 'normal' },
      { index: 9, label: 'E', open: 100.4, high: 102.6, low: 99, close: 99.4, role: 'retest-e' },
      { index: 10, label: 'C11', open: 99.4, high: 99.8, low: 94, close: 94.6, role: 'normal' },
    ],
    steps: [
      {
        index: 0,
        phase: '1 · Swing High A & Low B',
        caption: 'High A sets at 110.00, then price drops to Low B (100.00–104.00), saving the down-close origin candle before the buy-side run.',
        visibleCount: 4,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: false,
      },
      {
        index: 1,
        phase: '2 · Buy-Side Sweep at C',
        caption: 'Price rallies beyond High A (110.00) to 112.00, taking resting buy-side stops above the prior peak.',
        visibleCount: 6,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: true,
      },
      {
        index: 2,
        phase: '3 · Body-Close MSS at D',
        caption: 'Aggressive displacement closes at 98.00 below Low B (100.00). The saved 100–104 origin flips from prior support into a Bearish Breaker.',
        visibleCount: 8,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: true,
      },
      {
        index: 3,
        phase: '4 · Retest E & Breakdown',
        caption: 'Price rallies back into 100–104 (tagging 102.60 near the 102.00 Mean Threshold) and sells off toward 94.00 without closing above 104.00.',
        visibleCount: 11,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: true,
      },
    ],
  },
  {
    id: 'unicorn-overlap',
    title: 'ICT Unicorn Overlap (Breaker + FVG)',
    badge: 'Synthetic OHLC · Positive Intersection',
    direction: 'bullish',
    summary:
      'Bullish Breaker (106–110) intersects a displacement Bullish FVG (104–108), forming a narrow 2-point positive-width Unicorn overlap at 106–108.',
    priceMin: 95,
    priceMax: 118,
    zoneLow: 106,
    zoneHigh: 110,
    zoneMid: 108,
    fvgLow: 104,
    fvgHigh: 108,
    sweepLevel: 100,
    sweepLabel: 'Point A Low (100.00)',
    mssLevel: 110,
    mssLabel: 'Point B High / MSS (110.00)',
    candles: [
      { index: 0, label: 'A', open: 103, high: 104, low: 100, close: 102, role: 'swing-a' },
      { index: 1, label: 'C2', open: 102, high: 107, low: 101.5, close: 106.5, role: 'normal' },
      { index: 2, label: 'B', open: 106.5, high: 110, low: 106, close: 109.5, role: 'origin-b' },
      { index: 3, label: 'C', open: 109.5, high: 109.8, low: 98, close: 101, role: 'sweep-c' },
      { index: 4, label: 'F1', open: 101, high: 104, low: 100.5, close: 103.5, role: 'fvg' },
      { index: 5, label: 'D/F2', open: 103.5, high: 112.4, low: 103.2, close: 111.8, role: 'mss-d' },
      { index: 6, label: 'F3', open: 111.8, high: 114, low: 108, close: 113.2, role: 'fvg' },
      { index: 7, label: 'E', open: 113.2, high: 113.5, low: 106.6, close: 112.5, role: 'retest-e' },
      { index: 8, label: 'C9', open: 112.5, high: 117.2, low: 112, close: 116.8, role: 'normal' },
    ],
    steps: [
      {
        index: 0,
        phase: '1 · Breaker Zone Saved (106–110)',
        caption: 'After Low A (100) and High B (106–110), candle C sweeps to 98.00. The 106–110 candle at B is locked before displacement.',
        visibleCount: 4,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: true,
      },
      {
        index: 1,
        phase: '2 · Displacement Creates FVG (104–108)',
        caption: 'F1 high (104.00) and F3 low (108.00) frame a clean 4-point Bullish FVG across the same impulsive leg that closes at 111.80 above B.',
        visibleCount: 7,
        highlightZone: true,
        highlightFvg: true,
        showSweepLine: true,
        showMssLine: true,
      },
      {
        index: 2,
        phase: '3 · Unicorn Intersection (106–108)',
        caption: 'max(106, 104) = 106.00 to min(110, 108) = 108.00 defines a 2.00-point positive-width Unicorn overlap directly inside the breaker.',
        visibleCount: 8,
        highlightZone: true,
        highlightFvg: true,
        showSweepLine: true,
        showMssLine: true,
      },
      {
        index: 3,
        phase: '4 · Precision Retest & Continuation',
        caption: 'Candle E dips to 106.60 inside the 106–108 overlap and drives upward to 117.20. Both zones remain visibly distinct on the ruler.',
        visibleCount: 9,
        highlightZone: true,
        highlightFvg: true,
        showSweepLine: true,
        showMssLine: true,
      },
    ],
  },
  {
    id: 'wick-trap',
    title: 'Wick-Only Trap vs. Body-Close Failure',
    badge: 'Synthetic OHLC · Invalidation Study',
    direction: 'invalid',
    summary:
      'Candle W pokes above High B (110.00) with an upper wick to 111.20 but closes back at 109.10 inside the range—failing the body-close MSS requirement before price drops through the zone.',
    priceMin: 95,
    priceMax: 115,
    zoneLow: 106,
    zoneHigh: 110,
    zoneMid: 108,
    sweepLevel: 100,
    sweepLabel: 'Point A Low (100.00)',
    mssLevel: 110,
    mssLabel: 'Point B High (110.00 — Unbroken Close)',
    candles: [
      { index: 0, label: 'A', open: 103, high: 104, low: 100, close: 102, role: 'swing-a' },
      { index: 1, label: 'C2', open: 102, high: 107, low: 101.5, close: 106.5, role: 'normal' },
      { index: 2, label: 'B', open: 106.5, high: 110, low: 106, close: 109.5, role: 'origin-b' },
      { index: 3, label: 'C', open: 109.5, high: 109.8, low: 98, close: 101, role: 'sweep-c' },
      { index: 4, label: 'C5', open: 101, high: 107.5, low: 100.5, close: 107, role: 'normal' },
      { index: 5, label: 'W', open: 107, high: 111.2, low: 106.5, close: 109.1, role: 'mss-d' },
      { index: 6, label: 'F1', open: 109.1, high: 109.4, low: 104.2, close: 104.6, role: 'retest-e' },
      { index: 7, label: 'F2', open: 104.6, high: 105, low: 97.5, close: 98.2, role: 'normal' },
    ],
    steps: [
      {
        index: 0,
        phase: '1 · Sweep Below A (98.00)',
        caption: 'Price sweeps Low A (100.00) down to 98.00. So far this looks identical to the valid bullish setup.',
        visibleCount: 4,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: true,
      },
      {
        index: 1,
        phase: '2 · Wick-Only Probe Above B',
        caption: 'Candle W spikes to 111.20 above High B (110.00) but closes at 109.10—failing to produce a closing body break above 110.00.',
        visibleCount: 6,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: true,
      },
      {
        index: 2,
        phase: '3 · Failed Flip & Breakdown',
        caption: 'Without a verified body-close MSS, the 106–110 zone never qualified as support. Candle F1 closes at 104.60 and trend sellers resume to 97.50.',
        visibleCount: 8,
        highlightZone: true,
        highlightFvg: false,
        showSweepLine: true,
        showMssLine: true,
      },
    ],
  },
];

export interface MtfFractalProfile {
  id: 'swing' | 'day' | 'scalp';
  label: string;
  htfBias: string;
  breakerTf: string;
  entryTf: string;
  sessionFocus: string;
  typicalHold: string;
  summary: string;
}

export const MTF_FRACTAL_PROFILES: MtfFractalProfile[] = [
  {
    id: 'swing',
    label: 'Position / Swing Study',
    htfBias: 'Weekly / Daily',
    breakerTf: '4-Hour (4H)',
    entryTf: '15-Minute (15M)',
    sessionFocus: 'Multi-day London / NY Open expansions',
    typicalHold: '2 to 5 trading sessions',
    summary: 'Mark Weekly/Daily external liquidity, wait for a 4H sweep + body-close breaker, and refine retests on the 15M chart with an overlapping FVG.',
  },
  {
    id: 'day',
    label: 'Intraday Session Study',
    htfBias: 'Daily / 4-Hour',
    breakerTf: '15-Minute (15M)',
    entryTf: '1-Minute or 3-Minute',
    sessionFocus: 'London (02:00–05:00 NY) & NY AM (08:30–11:00 NY)',
    typicalHold: '30 minutes to 3 hours',
    summary: 'Anchor Daily/4H draw on liquidity, identify a 15M Killzone sweep and breaker flip, then confirm an LTF 1M–3M Unicorn shift inside the 15M zone.',
  },
  {
    id: 'scalp',
    label: 'Precision Macro Study',
    htfBias: '1-Hour / 15-Minute',
    breakerTf: '5-Minute (5M)',
    entryTf: '1-Minute (1M)',
    sessionFocus: 'NY 09:50–10:10 & 10:50–11:10 Macros',
    typicalHold: '10 to 45 minutes',
    summary: 'Use 1H/15M internal liquidity as the magnet, catch a 5M breaker formed during the NY macro sweep, and manage strictly on 1M body-close invalidation.',
  },
];
