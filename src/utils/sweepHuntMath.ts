export interface SweepHuntInput {
  referenceLevel: number;
  wickExtreme: number;
  candleClose: number;
  tickSize: number;
  slippageTicks: number;
}

export interface SweepHuntResult {
  classification: 'Sweep & Reclaim' | 'Boundary Test' | 'Breakout Acceptance';
  excursionTicks: number;
  slippageBufferTicks: number;
  guidance: string;
}

/** Evaluate observable wick excursion beyond a reference level vs. close acceptance. */
export function evaluateSweepExcursion(input: SweepHuntInput): SweepHuntResult {
  const tick = Math.max(0.00001, input.tickSize);
  const excursionTicks = Math.round(Math.abs(input.wickExtreme - input.referenceLevel) / tick);
  const isBullishSweep = input.wickExtreme > input.referenceLevel;
  const closedInside = isBullishSweep
    ? input.candleClose <= input.referenceLevel
    : input.candleClose >= input.referenceLevel;

  const classification: SweepHuntResult['classification'] =
    excursionTicks === 0
      ? 'Boundary Test'
      : closedInside
        ? 'Sweep & Reclaim'
        : 'Breakout Acceptance';

  const slippageBufferTicks = Math.max(1, Math.round(input.slippageTicks));
  const guidance =
    classification === 'Sweep & Reclaim'
      ? `Wick pierced ${excursionTicks} ticks beyond reference and closed back inside; add >= ${slippageBufferTicks} ticks buffer when modeling stop-market slippage.`
      : classification === 'Breakout Acceptance'
        ? `Candle closed beyond the ${excursionTicks}-tick excursion; treat as acceptance rather than a failed-breakout sweep.`
        : 'Price tested the exact reference boundary without excursion.';

  return { classification, excursionTicks, slippageBufferTicks, guidance };
}
