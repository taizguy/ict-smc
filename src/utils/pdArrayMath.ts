export type PdHalf = 'premium' | 'equilibrium' | 'discount';
export type PdQuadrant = 'Q4 Upper Premium' | 'Q3 Lower Premium' | 'Q2 Upper Discount' | 'Q1 Deep Discount';

export interface RangePositionResult {
  validRange: boolean;
  rangeSpan: number;
  equilibrium: number;
  q25: number;
  q75: number;
  ote62Bullish: number;
  ote705Bullish: number;
  ote79Bullish: number;
  ote62Bearish: number;
  ote705Bearish: number;
  ote79Bearish: number;
  depthFromLowPct: number;
  half: PdHalf;
  quadrant: PdQuadrant;
}

export function computeDealingRange(
  rangeLow: number,
  rangeHigh: number,
  currentPrice: number,
  decimals = 2,
): RangePositionResult {
  const round = (v: number) => Number(v.toFixed(decimals));
  const span = rangeHigh - rangeLow;
  const validRange = Number.isFinite(span) && span > 0;
  if (!validRange) {
    return {
      validRange: false,
      rangeSpan: 0,
      equilibrium: round(rangeLow),
      q25: round(rangeLow),
      q75: round(rangeLow),
      ote62Bullish: round(rangeLow),
      ote705Bullish: round(rangeLow),
      ote79Bullish: round(rangeLow),
      ote62Bearish: round(rangeLow),
      ote705Bearish: round(rangeLow),
      ote79Bearish: round(rangeLow),
      depthFromLowPct: 50,
      half: 'equilibrium',
      quadrant: 'Q2 Upper Discount',
    };
  }

  const eq = rangeLow + span * 0.5;
  const q25 = rangeLow + span * 0.25;
  const q75 = rangeLow + span * 0.75;
  const depthPct = Number((((currentPrice - rangeLow) / span) * 100).toFixed(1));

  let half: PdHalf = 'equilibrium';
  if (depthPct > 50.5) half = 'premium';
  else if (depthPct < 49.5) half = 'discount';

  let quadrant: PdQuadrant = 'Q2 Upper Discount';
  if (depthPct >= 75) quadrant = 'Q4 Upper Premium';
  else if (depthPct >= 50) quadrant = 'Q3 Lower Premium';
  else if (depthPct >= 25) quadrant = 'Q2 Upper Discount';
  else quadrant = 'Q1 Deep Discount';

  return {
    validRange: true,
    rangeSpan: round(span),
    equilibrium: round(eq),
    q25: round(q25),
    q75: round(q75),
    ote62Bullish: round(rangeHigh - span * 0.62),
    ote705Bullish: round(rangeHigh - span * 0.705),
    ote79Bullish: round(rangeHigh - span * 0.79),
    ote62Bearish: round(rangeLow + span * 0.62),
    ote705Bearish: round(rangeLow + span * 0.705),
    ote79Bearish: round(rangeLow + span * 0.79),
    depthFromLowPct: depthPct,
    half,
    quadrant,
  };
}

export interface PdArrayRankItem {
  rank: number;
  code: string;
  name: string;
  premiumRole: string;
  discountRole: string;
  refinementLine: string;
  keyRule: string;
}

export const pdArrayHierarchyList: PdArrayRankItem[] = [
  {
    rank: 1,
    code: 'OLD / LIQ',
    name: 'External Liquidity Pools (Old High / Old Low)',
    premiumRole: 'Buy-Side Liquidity (BSL) resting above old highs — sweep or target terminus',
    discountRole: 'Sell-Side Liquidity (SSL) resting below old lows — sweep or target terminus',
    refinementLine: 'Exact swing extreme tick / cluster highs-lows',
    keyRule: 'Draws price across the dealing range; sweeping an old extreme often initiates reversal.',
  },
  {
    rank: 2,
    code: 'MIT',
    name: 'Mitigation Block',
    premiumRole: 'Bearish structure fail retest where lower high fails to take a prior high',
    discountRole: 'Bullish structure fail retest where higher low fails to break a prior low',
    refinementLine: 'Last opposing candle open / 50% Mean Threshold',
    keyRule: 'Similar to a Breaker, except price never swept the preceding swing extreme first.',
  },
  {
    rank: 3,
    code: 'BRK',
    name: 'Breaker Block',
    premiumRole: 'Bullish OB broken after sweeping a high (now acts as overhead resistance)',
    discountRole: 'Bearish OB broken after sweeping a low (now acts as structural support)',
    refinementLine: 'Extreme open or 50% Mean Threshold of the broken OB run',
    keyRule: 'Combines liquidity sweep + failed order block; stronger when aligned with an FVG ("Unicorn").',
  },
  {
    rank: 4,
    code: 'LV',
    name: 'Liquidity Void',
    premiumRole: 'Wide multi-candle rapid sell-off corridor waiting above equilibrium',
    discountRole: 'Wide multi-candle rapid rally corridor sitting below equilibrium',
    refinementLine: '50% midpoint of the multi-candle void span',
    keyRule: 'Represents a broader multi-bar price run rather than a single 3-candle Fair Value Gap.',
  },
  {
    rank: 5,
    code: 'FVG',
    name: 'Fair Value Gap (BISI / SIBI / IFVG)',
    premiumRole: 'Bearish SIBI or Bearish Inverse FVG located above 50% Equilibrium',
    discountRole: 'Bullish BISI or Bullish Inverse FVG located below 50% Equilibrium',
    refinementLine: 'Near Edge (first touch) & 50% Consequent Encroachment (CE)',
    keyRule: 'Measured strictly between Candle 1 and Candle 3 outer wicks across Candle 2.',
  },
  {
    rank: 6,
    code: 'VI / SUSP',
    name: 'Volume Imbalance & Suspension Block',
    premiumRole: 'Body-open/close gap above equilibrium (or central candle dual body-gap)',
    discountRole: 'Body-open/close gap below equilibrium (or central candle dual body-gap)',
    refinementLine: '50% midpoint of the adjacent body gap (never relabeled as outer-wick FVG)',
    keyRule: 'Overlapping wicks can leave clear body-price gaps that must stay distinctly classified.',
  },
  {
    rank: 7,
    code: 'OB',
    name: 'Order Block (Opening & Mean Threshold)',
    premiumRole: 'Consecutive up-close run before energetic bearish breakdown',
    discountRole: 'Consecutive down-close run before energetic bullish departure',
    refinementLine: 'Opening price of the run (conservative) or 50% Mean Threshold (body midpoint)',
    keyRule: 'Candle bodies must break delivery cleanly; closing beyond the extreme invalidates it.',
  },
  {
    rank: 8,
    code: 'RB',
    name: 'Rejection Block',
    premiumRole: 'Long upper rejection wick above clustered candle bodies in deep Premium',
    discountRole: 'Long lower rejection wick below clustered candle bodies in deep Discount',
    refinementLine: 'Candle body highest close/open (premium) or lowest open/close (discount)',
    keyRule: 'Targets traders who enter around the body shelf rather than waiting for the extreme wick tip.',
  },
  {
    rank: 9,
    code: 'TIME',
    name: 'Opening Gaps & Anchored Levels (NWOG / NDOG / Midnight)',
    premiumRole: 'Prior New Week / New Day Opening Gap resting above current equilibrium',
    discountRole: 'Prior New Week / New Day Opening Gap resting below current equilibrium',
    refinementLine: 'Gap edges and exact 50% CE midpoint of the opening discontinuity',
    keyRule: 'Time-anchored reference levels act as sticky intraday inflection magnets regardless of pattern.',
  },
];

export interface ConfluenceGateInput {
  anchorsFrozen: boolean;
  correctHalf: boolean;
  opposingDrawClear: boolean;
  unmitigatedArray: boolean;
  activeSession: boolean;
  ltfConfirmation: boolean;
}

export interface ConfluenceGateResult {
  score: number;
  grade: 'qualified' | 'partial' | 'unqualified';
  label: string;
  note: string;
}

export function evaluatePdConfluence(input: ConfluenceGateInput): ConfluenceGateResult {
  const score = [
    input.anchorsFrozen,
    input.correctHalf,
    input.opposingDrawClear,
    input.unmitigatedArray,
    input.activeSession,
    input.ltfConfirmation,
  ].filter(Boolean).length;

  if (!input.anchorsFrozen || !input.correctHalf) {
    return {
      score,
      grade: 'unqualified',
      label: 'Disqualified: Wrong Half or Shifted Anchors',
      note: 'Buying above 50% Equilibrium, selling below 50%, or shifting lookbacks after the fact breaks PD Matrix discipline before pattern shapes even matter.',
    };
  }
  if (score === 6) {
    return {
      score,
      grade: 'qualified',
      label: 'Qualified PD Array Matrix Setup (6/6 Gates)',
      note: 'Range anchors, Discount/Premium polarity, opposing draw, unmitigated array refinement, active Killzone timing, and LTF confirmation are all aligned (not a profit guarantee).',
    };
  }
  return {
    score,
    grade: 'partial',
    label: 'Watchlist Only: Missing Execution Gate',
    note: 'Location inside the matrix is valid, yet missing session liquidity, an opposing draw, or LTF shift makes blind limit entries premature.',
  };
}

export interface PdMtfTier {
  id: 'weekly' | 'daily' | 'intraday';
  timeframe: string;
  role: string;
  rangeLabel: string;
  eqLabel: string;
  currentZone: string;
  nestedTruth: string;
}

export const pdMtfProfiles: PdMtfTier[] = [
  {
    id: 'weekly',
    timeframe: 'Weekly / 20-Day HTF',
    role: 'Primary Narrative & Macro Draw',
    rangeLabel: '19,800 – 20,800 (1,000 pts)',
    eqLabel: '20,300.00 (50% HTF)',
    currentZone: '20,180.00 · Deep Discount (38%)',
    nestedTruth: 'Higher timeframe says: accumulate bullish ideas toward 20,800 Buy-Side Liquidity.',
  },
  {
    id: 'daily',
    timeframe: 'Daily / 4H Intermediate',
    role: 'Dealing Range & Active Quadrant',
    rangeLabel: '20,000 – 20,400 (400 pts)',
    eqLabel: '20,200.00 (50% MTF)',
    currentZone: '20,180.00 · Upper Discount (45%)',
    nestedTruth: 'Price rests cleanly inside a 4H Discount FVG + Order Block confluence pocket.',
  },
  {
    id: 'intraday',
    timeframe: '15M / 5M Execution Leg',
    role: 'Local Pullback & Trigger',
    rangeLabel: '20,100 – 20,210 (110 pts)',
    eqLabel: '20,155.00 (50% LTF)',
    currentZone: '20,180.00 · 15M Local Premium (72.7%)',
    nestedTruth: 'Inside the tiny 15M swing, price sits in Premium—wait for price to dip into 15M Discount (20,130) inside the 4H Discount OB to align all three clocks!',
  },
];

export interface PdSyntheticBar {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  annotation?: string;
}

// Scenario 1: Bullish Discount Ladder (NQ-style 20,200 to 20,600 range; Eq 20,400)
export const syntheticPdBullishBars: PdSyntheticBar[] = [
  { label: '08:00', open: 20215, high: 20360, low: 20200, close: 20345, annotation: 'Impulse sets 20,200 Low' },
  { label: '08:15', open: 20345, high: 20600, low: 20340, close: 20585, annotation: 'Range High 20,600 locked' },
  { label: '08:30', open: 20585, high: 20592, low: 20465, close: 20480, annotation: 'Pullback leaves Premium' },
  { label: '08:45', open: 20480, high: 20495, low: 20385, close: 20395, annotation: 'Crosses 20,400 Eq -> Discount' },
  { label: '09:00', open: 20395, high: 20410, low: 20290, close: 20305, annotation: 'Enters Q1/Q2 Discount OB+FVG' },
  { label: '09:15', open: 20305, high: 20320, low: 20265, close: 20280, annotation: 'Sweeps SSL & taps 20,280 CE' },
  { label: '09:30', open: 20280, high: 20390, low: 20275, close: 20382, annotation: 'LTF MSS + Bullish FVG launch' },
  { label: '09:45', open: 20382, high: 20485, low: 20368, close: 20475, annotation: 'Clears 50% Eq into Premium' },
  { label: '10:00', open: 20475, high: 20625, low: 20465, close: 20612, annotation: 'Delivers 20,600 BSL Terminus' },
];

// Scenario 2: Bearish Premium Cascade (EUR/USD 1.0900 to 1.0800 range; Eq 1.0850)
export const syntheticPdBearishBars: PdSyntheticBar[] = [
  { label: '03:00', open: 1.0894, high: 1.0900, low: 1.0838, close: 1.0844, annotation: 'Down-leg sets 1.0900 High' },
  { label: '04:00', open: 1.0844, high: 1.0848, low: 1.0800, close: 1.0808, annotation: 'Range Low 1.0800 locked' },
  { label: '05:00', open: 1.0808, high: 1.0842, low: 1.0806, close: 1.0838, annotation: 'Relief bounce from Discount' },
  { label: '06:00', open: 1.0838, high: 1.0868, low: 1.0834, close: 1.0862, annotation: 'Breaks 1.0850 Eq -> Premium' },
  { label: '07:00', open: 1.0862, high: 1.0884, low: 1.0858, close: 1.0879, annotation: 'Tags Q4 Premium Breaker/FVG' },
  { label: '08:00', open: 1.0879, high: 1.0882, low: 1.0848, close: 1.0852, annotation: 'LTF CISD & Bearish SIBI' },
  { label: '08:30', open: 1.0852, high: 1.0858, low: 1.0825, close: 1.0829, annotation: 'Expands back under Eq' },
  { label: '09:00', open: 1.0829, high: 1.0834, low: 1.0792, close: 1.0796, annotation: 'Purges 1.0800 SSL Terminus' },
];

// Scenario 3: Internal-to-External Continuum (100–140 Box, Eq 120, IRL 110 -> ERL 140)
export const syntheticPdContinuumBars: PdSyntheticBar[] = [
  { label: 'C1', open: 102, high: 122, low: 100, close: 120, annotation: 'Base 100 Low & Q1–Q2 origin' },
  { label: 'C2', open: 120, high: 140, low: 118, close: 138, annotation: 'ERL 140 High established' },
  { label: 'C3', open: 138, high: 139, low: 124, close: 125, annotation: 'ERL rejects toward 120 Eq' },
  { label: 'C4', open: 125, high: 126, low: 109, close: 111, annotation: 'Taps Discount IRL FVG (108–112)' },
  { label: 'C5', open: 111, high: 123, low: 110, close: 122, annotation: 'Reclaims 120 Equilibrium' },
  { label: 'C6', open: 122, high: 133, low: 121, close: 132, annotation: 'Q4 Premium continuation' },
  { label: 'C7', open: 132, high: 143, low: 130, close: 141, annotation: 'Completes IRL -> ERL sweep' },
];

// Scenario 4: Range Shift & Non-Visited Array Failure (20,200–20,600 invalidated below 20,200)
export const syntheticPdFailureBars: PdSyntheticBar[] = [
  { label: '09:00', open: 20220, high: 20410, low: 20200, close: 20390, annotation: 'Declared 20,200–20,600 range' },
  { label: '09:15', open: 20390, high: 20600, low: 20380, close: 20575, annotation: 'High 20,600; Eq = 20,400' },
  { label: '09:30', open: 20575, high: 20580, low: 20420, close: 20435, annotation: 'Drops toward Eq' },
  { label: '09:45', open: 20435, high: 20445, low: 20275, close: 20285, annotation: 'Tags Discount OB+FVG at 20,285' },
  { label: '10:00', open: 20285, high: 20330, low: 20230, close: 20240, annotation: 'Weak bounce fails LTF MSS' },
  { label: '10:15', open: 20240, high: 20250, low: 20145, close: 20155, annotation: 'Closes below 20,200 Range Low -> Invalid!' },
  { label: '10:30', open: 20155, high: 20195, low: 20090, close: 20102, annotation: 'Range invalidation; do not shift anchors' },
];
