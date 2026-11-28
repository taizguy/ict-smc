export interface RangeCandle {
  index: number;
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  role: 'range' | 'sweep' | 'displacement' | 'retest' | 'delivery' | 'unfilled' | 'failure';
}

export type BreadButterBranch = 'completed' | 'unfilled' | 'failure';

export interface RangeQuartiles {
  high: number;
  upperQuartile: number;
  equilibrium: number;
  lowerQuartile: number;
  low: number;
  width: number;
}

export interface InstrumentCostMetrics {
  grossRisk: number;
  grossReward: number;
  grossR: number;
  netRisk: number;
  netReward: number;
  netR: number;
  grossBreakEvenPct: number;
  netBreakEvenPct: number;
  costDragPct: number;
}

/** Computes objective consolidation boundaries and quartiles before breakout. */
export function computeRangeQuartiles(low: number, high: number): RangeQuartiles {
  const safeLow = Math.min(low, high);
  const safeHigh = Math.max(low, high);
  const width = Number((safeHigh - safeLow).toFixed(4));
  return {
    high: Number(safeHigh.toFixed(4)),
    upperQuartile: Number((safeLow + width * 0.75).toFixed(4)),
    equilibrium: Number((safeLow + width * 0.5).toFixed(4)),
    lowerQuartile: Number((safeLow + width * 0.25).toFixed(4)),
    low: Number(safeLow.toFixed(4)),
    width,
  };
}

/** Computes pre-cost and after-cost reward-to-risk and break-even hit frequency. */
export function computeCostAdjustedMetrics(
  riskUnits: number,
  targetUnits: number,
  roundTripCostUnits: number,
): InstrumentCostMetrics {
  const grossRisk = Math.max(0.01, Number(riskUnits.toFixed(2)));
  const grossReward = Math.max(0.01, Number(targetUnits.toFixed(2)));
  const cost = Math.max(0, Number(roundTripCostUnits.toFixed(2)));

  const grossR = Number((grossReward / grossRisk).toFixed(2));
  const netRisk = Number((grossRisk + cost).toFixed(2));
  const netReward = Math.max(0, Number((grossReward - cost).toFixed(2)));
  const netR = netRisk > 0 ? Number((netReward / netRisk).toFixed(2)) : 0;

  const grossBreakEvenPct = Number(((1 / (1 + grossR)) * 100).toFixed(1));
  const netBreakEvenPct = netR > 0 ? Number(((1 / (1 + netR)) * 100).toFixed(1)) : 100;
  const costDragPct = Number((netBreakEvenPct - grossBreakEvenPct).toFixed(1));

  return {
    grossRisk,
    grossReward,
    grossR,
    netRisk,
    netReward,
    netR,
    grossBreakEvenPct,
    netBreakEvenPct,
    costDragPct,
  };
}

/**
 * Authored synthetic 100–130 (representing 1.0800–1.0830 scaled to pip units)
 * consolidation sequence for Motion Study 02 across three explicit outcomes:
 * - Range Box: 100.0 (SSL / 1.0800) to 130.0 (BSL / 1.0830), Midpoint 115.0
 * - Sweep Low: 92.0 (1.0792)
 * - Invalidation Stop: 86.0 (1.0786)
 * - Deferred Limit Entry (FVG): 106.0 (1.0806)
 * - Objective Target: 136.0 (1.0836)
 */
export function getBreadButterSceneCandles(branch: BreadButterBranch): RangeCandle[] {
  const shared: RangeCandle[] = [
    { index: 0, label: '01:00', open: 108, high: 124, low: 104, close: 120, role: 'range' },
    { index: 1, label: '01:30', open: 120, high: 129, low: 112, close: 114, role: 'range' },
    { index: 2, label: '02:00', open: 114, high: 126, low: 102, close: 106, role: 'range' },
    { index: 3, label: '02:30', open: 106, high: 130, low: 105, close: 123, role: 'range' },
    { index: 4, label: '02:55', open: 123, high: 125, low: 100, close: 104, role: 'range' },
    // London sweep below 100.0 SSL down to 92.0, closing back near 98.0
    { index: 5, label: '03:05', open: 104, high: 106, low: 92, close: 98, role: 'sweep' },
    // Bullish displacement candle back inside range leaving FVG (104–112)
    { index: 6, label: '03:10', open: 98, high: 118, low: 97, close: 116, role: 'displacement' },
  ];

  if (branch === 'completed') {
    return [
      ...shared,
      { index: 7, label: '03:15', open: 116, high: 118, low: 105, close: 110, role: 'retest' },
      { index: 8, label: '03:20', open: 110, high: 124, low: 108, close: 122, role: 'delivery' },
      { index: 9, label: '03:30', open: 122, high: 132, low: 119, close: 130, role: 'delivery' },
      { index: 10, label: '03:45', open: 130, high: 139, low: 127, close: 137, role: 'delivery' },
    ];
  }

  if (branch === 'unfilled') {
    return [
      ...shared,
      { index: 7, label: '03:15', open: 116, high: 121, low: 113, close: 119, role: 'unfilled' },
      { index: 8, label: '03:20', open: 119, high: 129, low: 118, close: 127, role: 'unfilled' },
      { index: 9, label: '03:30', open: 127, high: 136, low: 125, close: 134, role: 'unfilled' },
      { index: 10, label: '03:45', open: 134, high: 142, low: 132, close: 140, role: 'unfilled' },
    ];
  }

  // Breakdown continuation failure: sweep does NOT reverse; closes below 86.0 stop
  return [
    ...shared,
    { index: 7, label: '03:15', open: 116, high: 117, low: 103, close: 105, role: 'retest' },
    { index: 8, label: '03:20', open: 105, high: 108, low: 94, close: 96, role: 'failure' },
    { index: 9, label: '03:30', open: 96, high: 98, low: 85, close: 87, role: 'failure' },
    { index: 10, label: '03:45', open: 87, high: 89, low: 78, close: 80, role: 'failure' },
  ];
}
