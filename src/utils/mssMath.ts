export interface MssInput {
  hadPriorSweep: boolean;
  displacementMultiple: number;
  closedBeyondSwing: boolean;
  hasCleanFvg: boolean;
}

export interface MssResult {
  status: 'Verified Mechanical MSS' | 'Unconfirmed / Hesitant Break' | 'Wick-Only Excursion';
  score: number;
  guidance: string;
}

/** Evaluate an MSS candidate from prior sweep, displacement multiple, close rule, and FVG. */
export function evaluateMssStudy(input: MssInput): MssResult {
  let score = 0;
  if (input.hadPriorSweep) score += 25;
  if (input.displacementMultiple >= 1.5) score += 30;
  if (input.closedBeyondSwing) score += 25;
  if (input.hasCleanFvg) score += 20;

  const status: MssResult['status'] = !input.closedBeyondSwing
    ? 'Wick-Only Excursion'
    : input.displacementMultiple >= 1.5
      ? 'Verified Mechanical MSS'
      : 'Unconfirmed / Hesitant Break';

  const guidance =
    status === 'Verified Mechanical MSS'
      ? `Score ${score}/100: Close + displacement (${input.displacementMultiple}x) confirmed; record FVG entry variant and stop assumptions before replay.`
      : status === 'Wick-Only Excursion'
        ? `Score ${score}/100: Wick-only crossing; separate initial crossing from a close-based MSS rule.`
        : `Score ${score}/100: Hesitant break (${input.displacementMultiple}x avg candle); avoid forcing an MSS label without displacement.`;

  return { status, score, guidance };
}
