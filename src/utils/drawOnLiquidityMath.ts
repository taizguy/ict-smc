export interface DolPriorityInput {
  htfBiasAligned: boolean;
  hasDisplacement: boolean;
  pathType: 'lrlr' | 'hrlr';
  inKillzone: boolean;
  entryPrice: number;
  stopPrice: number;
  targetPrice: number;
  tickSize: number;
}

export interface DolPriorityResult {
  score: number;
  grade: 'High Clarity' | 'Moderate Clarity' | 'Low Clarity / Wait';
  rewardToRisk: number;
  riskTicks: number;
  rewardTicks: number;
}

export function computeDolPriority(input: DolPriorityInput): DolPriorityResult {
  let score = 15;
  if (input.htfBiasAligned) score += 30;
  if (input.hasDisplacement) score += 25;
  if (input.pathType === 'lrlr') score += 15;
  if (input.inKillzone) score += 15;

  const risk = Math.max(Math.abs(input.entryPrice - input.stopPrice), input.tickSize);
  const reward = Math.abs(input.targetPrice - input.entryPrice);
  const rewardToRisk = reward / risk;
  const riskTicks = Math.max(1, Math.round(risk / input.tickSize));
  const rewardTicks = Math.round(reward / input.tickSize);

  let grade: DolPriorityResult['grade'] = 'Low Clarity / Wait';
  if (score >= 80 && rewardToRisk >= 1.5) grade = 'High Clarity';
  else if (score >= 55) grade = 'Moderate Clarity';

  return {
    score,
    grade,
    rewardToRisk,
    riskTicks,
    rewardTicks,
  };
}
