export interface BreakCompareInput {
  direction: 'with-trend' | 'counter-trend';
  priorSweep: boolean;
  displacement: boolean;
  closedBeyond: boolean;
}

export interface BreakCompareResult {
  label: 'Break of Structure (BOS)' | 'Change of Character (CHoCH)' | 'Market Structure Shift (MSS)' | 'Unconfirmed Wick Test';
  role: string;
}

/** Classify a structural break as BOS, CHoCH, MSS, or Wick Test. */
export function classifyStructuralBreak(input: BreakCompareInput): BreakCompareResult {
  if (!input.closedBeyond) {
    return {
      label: 'Unconfirmed Wick Test',
      role: 'Wick pierced the reference without a candle-body close; separate excursion from close-confirmed breaks.',
    };
  }
  if (input.direction === 'with-trend') {
    return {
      label: 'Break of Structure (BOS)',
      role: 'With-trend break of a prior extreme confirming continuation of the active structural sequence.',
    };
  }
  if (input.priorSweep && input.displacement) {
    return {
      label: 'Market Structure Shift (MSS)',
      role: 'Counter-trend break backed by a prior liquidity sweep and energetic displacement—often studied with an FVG.',
    };
  }
  return {
    label: 'Change of Character (CHoCH)',
    role: 'First counter-trend break warning that momentum may be shifting, even without a full sweep/displacement stack.',
  };
}
