export interface HtfLevel {
  id: string;
  label: string;
  timeframe: 'Monthly' | 'Weekly' | 'Daily' | '4H' | 'Session';
  side: 'BSL' | 'SSL';
  price: number;
  weight: number;
  note: string;
}

export interface HtfRangeInput {
  rangeHigh: number;
  rangeLow: number;
  currentPrice: number;
  tickSize: number;
  tickValue: number;
  targetPrice: number;
  invalidationPrice: number;
}

export interface HtfRangeMetrics {
  span: number;
  equilibrium: number;
  zone: 'Premium' | 'Discount' | 'Equilibrium';
  pctInRange: number;
  targetDistancePoints: number;
  targetTicks: number;
  riskPoints: number;
  riskTicks: number;
  rewardToRisk: number;
}

export interface HtfPreset {
  id: string;
  label: string;
  symbol: string;
  rangeHighLabel: string;
  rangeLowLabel: string;
  input: HtfRangeInput;
}

export const htfPresets: HtfPreset[] = [
  {
    id: 'nq-bullish-erl',
    label: 'NQ Futures — PDL Sweep to PWH',
    symbol: 'NQ (MNQ)',
    rangeHighLabel: 'PWH / PDH Stacked BSL',
    rangeLowLabel: 'PDL Swept SSL',
    input: {
      rangeHigh: 21480.0,
      rangeLow: 21160.0,
      currentPrice: 21240.0,
      tickSize: 0.25,
      tickValue: 0.5,
      targetPrice: 21480.0,
      invalidationPrice: 21150.0,
    },
  },
  {
    id: 'eurusd-bearish-irl',
    label: 'EUR/USD — PWH Sweep to PDL',
    symbol: 'EUR/USD',
    rangeHighLabel: 'PWH Swept BSL',
    rangeLowLabel: 'PDL + EQL SSL',
    input: {
      rangeHigh: 1.0940,
      rangeLow: 1.0820,
      currentPrice: 1.0910,
      tickSize: 0.0001,
      tickValue: 1.0,
      targetPrice: 1.0820,
      invalidationPrice: 1.0948,
    },
  },
  {
    id: 'xauusd-weekly-map',
    label: 'XAU/USD — 4H Discount to PMH',
    symbol: 'XAU/USD',
    rangeHighLabel: 'PMH External BSL',
    rangeLowLabel: 'PWL Discount SSL',
    input: {
      rangeHigh: 2745.0,
      rangeLow: 2665.0,
      currentPrice: 2685.0,
      tickSize: 0.1,
      tickValue: 1.0,
      targetPrice: 2745.0,
      invalidationPrice: 2661.0,
    },
  },
];

export function computeHtfRangeMetrics(input: HtfRangeInput): HtfRangeMetrics {
  const high = Math.max(input.rangeHigh, input.rangeLow);
  const low = Math.min(input.rangeHigh, input.rangeLow);
  const span = Math.max(high - low, input.tickSize);
  const equilibrium = low + span * 0.5;
  const pctInRange = ((input.currentPrice - low) / span) * 100;

  let zone: 'Premium' | 'Discount' | 'Equilibrium' = 'Equilibrium';
  if (pctInRange > 52) zone = 'Premium';
  else if (pctInRange < 48) zone = 'Discount';

  const targetDistancePoints = Math.abs(input.targetPrice - input.currentPrice);
  const riskPoints = Math.max(Math.abs(input.currentPrice - input.invalidationPrice), input.tickSize);
  const targetTicks = Math.round(targetDistancePoints / input.tickSize);
  const riskTicks = Math.max(1, Math.round(riskPoints / input.tickSize));
  const rewardToRisk = targetDistancePoints / riskPoints;

  return {
    span,
    equilibrium,
    zone,
    pctInRange,
    targetDistancePoints,
    targetTicks,
    riskPoints,
    riskTicks,
    rewardToRisk,
  };
}
