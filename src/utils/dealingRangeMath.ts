export interface DealingRangeInput {
  rangeLow: number;
  rangeHigh: number;
  currentPrice: number;
}

export interface DealingRangeResult {
  span: number;
  equilibrium: number;
  q25: number;
  q75: number;
  zone: 'Premium' | 'Equilibrium (50%)' | 'Discount' | 'Outside Range';
  guidance: string;
}

/** Compute 0%, 25%, 50% EQ, 75%, 100% quadrants and Premium/Discount classification. */
export function evaluateDealingRange(input: DealingRangeInput): DealingRangeResult {
  const low = Math.min(input.rangeLow, input.rangeHigh);
  const high = Math.max(input.rangeLow, input.rangeHigh);
  const span = Number((high - low).toFixed(4));
  const equilibrium = Number((low + span * 0.5).toFixed(4));
  const q25 = Number((low + span * 0.25).toFixed(4));
  const q75 = Number((low + span * 0.75).toFixed(4));

  let zone: DealingRangeResult['zone'] = 'Equilibrium (50%)';
  if (input.currentPrice > high || input.currentPrice < low) zone = 'Outside Range';
  else if (input.currentPrice > equilibrium) zone = 'Premium';
  else if (input.currentPrice < equilibrium) zone = 'Discount';

  const guidance =
    zone === 'Discount'
      ? `Price sits in Discount (< ${equilibrium}); bullish studies typically inspect PD arrays below 50% EQ.`
      : zone === 'Premium'
        ? `Price sits in Premium (> ${equilibrium}); bearish studies typically inspect PD arrays above 50% EQ.`
        : zone === 'Outside Range'
          ? 'Price closed outside the anchored dealing range—re-anchor to the new displacement leg.'
          : 'Price is sitting directly at 50% Equilibrium.';

  return { span, equilibrium, q25, q75, zone, guidance };
}
