export interface OrderBlockCandle {
  id: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface OrderBlockBoundaries {
  direction: 'bullish' | 'bearish';
  openingRef: number;
  bodyLow: number;
  bodyHigh: number;
  fullLow: number;
  fullHigh: number;
  bodyMeanThreshold: number;
  fullMeanThreshold: number;
  bodySpan: number;
  fullSpan: number;
}

export interface OverlapResult {
  low: number;
  high: number;
  width: number;
  midpoint: number | null;
  status: 'overlap' | 'touching' | 'disjoint';
}

export interface PaperRiskMetrics {
  riskPoints: number;
  rewardPoints: number;
  rrRatio: number;
  breakEvenPctBeforeCosts: number;
}

const round4 = (n: number) => Math.round(n * 10000) / 10000;

export function computeOrderBlockBoundaries(
  candles: OrderBlockCandle[],
  direction: 'bullish' | 'bearish',
): OrderBlockBoundaries {
  if (candles.length === 0) {
    throw new Error('At least one candle is required to compute order-block boundaries.');
  }
  const openingRef = candles[0].open;
  const bodyLow = Math.min(...candles.map((c) => Math.min(c.open, c.close)));
  const bodyHigh = Math.max(...candles.map((c) => Math.max(c.open, c.close)));
  const fullLow = Math.min(...candles.map((c) => c.low));
  const fullHigh = Math.max(...candles.map((c) => c.high));

  return {
    direction,
    openingRef: round4(openingRef),
    bodyLow: round4(bodyLow),
    bodyHigh: round4(bodyHigh),
    fullLow: round4(fullLow),
    fullHigh: round4(fullHigh),
    bodyMeanThreshold: round4((bodyLow + bodyHigh) / 2),
    fullMeanThreshold: round4((fullLow + fullHigh) / 2),
    bodySpan: round4(bodyHigh - bodyLow),
    fullSpan: round4(fullHigh - fullLow),
  };
}

export function computeObFvgOverlap(
  obLow: number,
  obHigh: number,
  fvgLow: number,
  fvgHigh: number,
): OverlapResult {
  const normObLow = Math.min(obLow, obHigh);
  const normObHigh = Math.max(obLow, obHigh);
  const normFvgLow = Math.min(fvgLow, fvgHigh);
  const normFvgHigh = Math.max(fvgLow, fvgHigh);

  const low = round4(Math.max(normObLow, normFvgLow));
  const high = round4(Math.min(normObHigh, normFvgHigh));
  const width = round4(high - low);

  if (width > 0) {
    return {
      low,
      high,
      width,
      midpoint: round4((low + high) / 2),
      status: 'overlap',
    };
  }
  if (width === 0) {
    return {
      low,
      high,
      width: 0,
      midpoint: low,
      status: 'touching',
    };
  }
  return {
    low,
    high,
    width: 0,
    midpoint: null,
    status: 'disjoint',
  };
}

export function computePaperRisk(
  entry: number,
  stop: number,
  target: number,
): PaperRiskMetrics {
  const riskPoints = round4(Math.abs(entry - stop));
  const rewardPoints = round4(Math.abs(target - entry));
  const rrRatio = riskPoints > 0 ? round4(rewardPoints / riskPoints) : 0;
  const breakEvenPctBeforeCosts =
    rrRatio > 0 ? round4((1 / (1 + rrRatio)) * 100) : 0;

  return {
    riskPoints,
    rewardPoints,
    rrRatio,
    breakEvenPctBeforeCosts,
  };
}

export function classifyMitigationDepth(
  retestExtreme: number,
  retestClose: number,
  boundaries: OrderBlockBoundaries,
): 'unmitigated' | 'opening-touch' | 'mean-threshold' | 'deep-wick' | 'closing-failure' {
  if (boundaries.direction === 'bullish') {
    if (retestClose < boundaries.fullLow) return 'closing-failure';
    if (retestExtreme > boundaries.openingRef) return 'unmitigated';
    if (retestExtreme <= boundaries.bodyMeanThreshold && retestExtreme >= boundaries.fullLow) {
      return retestExtreme < boundaries.bodyLow ? 'deep-wick' : 'mean-threshold';
    }
    if (retestExtreme < boundaries.fullLow) return 'deep-wick';
    return 'opening-touch';
  }
  if (retestClose > boundaries.fullHigh) return 'closing-failure';
  if (retestExtreme < boundaries.openingRef) return 'unmitigated';
  if (retestExtreme >= boundaries.bodyMeanThreshold && retestExtreme <= boundaries.fullHigh) {
    return retestExtreme > boundaries.bodyHigh ? 'deep-wick' : 'mean-threshold';
  }
  if (retestExtreme > boundaries.fullHigh) return 'deep-wick';
  return 'opening-touch';
}
