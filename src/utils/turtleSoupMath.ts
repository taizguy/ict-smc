export interface RejectionCalcInput {
  referenceExtreme: number;
  bodyBoundary: number;
  wickExtreme: number;
  targetPrice: number;
  tickSize: number;
}

export interface RejectionCalcResult {
  bodyMidpoint: number;
  fullSpanMidpoint: number;
  sweepDepth: number;
  riskFromBodyMid: number;
  rewardFromBodyMid: number;
  rewardToRisk: number;
  stopTicks: number;
  rewardTicks: number;
}

export interface TurtlePreset {
  id: string;
  label: string;
  input: RejectionCalcInput;
}

export const turtlePresets: TurtlePreset[] = [
  {
    id: 'teaching-110',
    label: 'Teaching Example (110–112)',
    input: {
      referenceExtreme: 110.0,
      bodyBoundary: 111.0,
      wickExtreme: 112.0,
      targetPrice: 106.0,
      tickSize: 0.5,
    },
  },
  {
    id: 'nq-pdh-soup',
    label: 'NQ Futures PDH Soup',
    input: {
      referenceExtreme: 21450.0,
      bodyBoundary: 21462.0,
      wickExtreme: 21478.0,
      targetPrice: 21320.0,
      tickSize: 0.25,
    },
  },
  {
    id: 'eurusd-asian-low',
    label: 'EUR/USD Asian Low Soup',
    input: {
      referenceExtreme: 1.0840,
      bodyBoundary: 1.0832,
      wickExtreme: 1.0824,
      targetPrice: 1.0895,
      tickSize: 0.0001,
    },
  },
];

export function computeRejectionMetrics(input: RejectionCalcInput): RejectionCalcResult {
  const bodyMidpoint = (input.referenceExtreme + input.bodyBoundary) / 2;
  const fullSpanMidpoint = (input.referenceExtreme + input.wickExtreme) / 2;
  const sweepDepth = Math.abs(input.wickExtreme - input.referenceExtreme);
  const riskFromBodyMid = Math.max(Math.abs(input.wickExtreme - bodyMidpoint), input.tickSize);
  const rewardFromBodyMid = Math.abs(input.targetPrice - bodyMidpoint);
  const rewardToRisk = rewardFromBodyMid / riskFromBodyMid;
  const stopTicks = Math.max(1, Math.round(riskFromBodyMid / input.tickSize));
  const rewardTicks = Math.round(rewardFromBodyMid / input.tickSize);

  return {
    bodyMidpoint,
    fullSpanMidpoint,
    sweepDepth,
    riskFromBodyMid,
    rewardFromBodyMid,
    rewardToRisk,
    stopTicks,
    rewardTicks,
  };
}
