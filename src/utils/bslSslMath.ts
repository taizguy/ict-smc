export interface BslSslInput {
  entryPrice: number;
  poolPrice: number;
  stopPrice: number;
  tickSize: number;
  accountRiskPct: number;
}

export interface BslSslResult {
  bias: 'BSL Target (Above)' | 'SSL Target (Below)' | 'At Pool';
  distanceTicks: number;
  riskTicks: number;
  rewardToRisk: number;
  guidance: string;
}

/** Compute objective BSL/SSL target distance, invalidation width, and R:R before replay. */
export function evaluateBslSslPlan(input: BslSslInput): BslSslResult {
  const tick = Math.max(0.00001, input.tickSize);
  const diff = input.poolPrice - input.entryPrice;
  const distanceTicks = Math.round(Math.abs(diff) / tick);
  const riskTicks = Math.max(1, Math.round(Math.abs(input.entryPrice - input.stopPrice) / tick));
  const rewardToRisk = Number((distanceTicks / riskTicks).toFixed(2));
  const bias: BslSslResult['bias'] =
    diff > tick * 0.5 ? 'BSL Target (Above)' : diff < -tick * 0.5 ? 'SSL Target (Below)' : 'At Pool';

  const guidance =
    rewardToRisk >= 2
      ? `Target pool is ${distanceTicks} ticks away vs. ${riskTicks} ticks risk (${rewardToRisk}R at ${input.accountRiskPct}% planned risk); verify clean corridor before entry.`
      : `Target pool offers ${rewardToRisk}R (${distanceTicks} ticks vs. ${riskTicks} ticks risk); check if an opposing HTF pool gives better asymmetry.`;

  return { bias, distanceTicks, riskTicks, rewardToRisk, guidance };
}
