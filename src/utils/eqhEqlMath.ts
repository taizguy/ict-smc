export interface EqhEqlInput {
  swingA: number;
  swingB: number;
  tolerance: number;
  touchCount: number;
  timeframe: '15m' | '1H' | '4H' | 'Daily';
}

export interface EqhEqlResult {
  spread: number;
  qualifies: boolean;
  label: 'Exact Equal Level' | 'Relative Equal Cluster' | 'Outside Tolerance';
  priorityScore: number;
  guidance: string;
}

const tfBonus: Record<EqhEqlInput['timeframe'], number> = {
  '15m': 15,
  '1H': 28,
  '4H': 38,
  Daily: 48,
};

/** Evaluate whether two swings qualify as an EQH/EQL pool under a predefined tolerance. */
export function evaluateEqhEqlCluster(input: EqhEqlInput): EqhEqlResult {
  const spread = Number(Math.abs(input.swingA - input.swingB).toFixed(4));
  const tol = Math.max(0.0001, input.tolerance);
  const qualifies = spread <= tol;
  const label: EqhEqlResult['label'] =
    spread <= tol * 0.25
      ? 'Exact Equal Level'
      : qualifies
        ? 'Relative Equal Cluster'
        : 'Outside Tolerance';

  const touchScore = Math.min(35, Math.max(2, input.touchCount) * 10);
  const tightness = qualifies ? Math.round((1 - spread / tol) * 17) : 0;
  const priorityScore = Math.min(100, tfBonus[input.timeframe] + touchScore + tightness);

  const guidance = qualifies
    ? `Spread ${spread} is inside your ${tol} tolerance (${label}). Wait for sweep + close check before framing a bias.`
    : `Spread ${spread} exceeds your ${tol} tolerance; log as staggered swings rather than an equal-level pool.`;

  return { spread, qualifies, label, priorityScore, guidance };
}
