export interface TrendRangeInput {
  swingHighs: 'rising' | 'flat' | 'falling';
  swingLows: 'rising' | 'flat' | 'falling';
  closeBeyondBoundary: boolean;
}

export interface TrendRangeResult {
  phase: 'Bullish Trend' | 'Bearish Trend' | 'Consolidation Range' | 'Transition Phase';
  expectation: string;
}

/** Classify market phase from swing-high/low sequence and boundary closes. */
export function evaluateMarketPhase(input: TrendRangeInput): TrendRangeResult {
  if (input.closeBeyondBoundary && input.swingHighs !== input.swingLows) {
    return {
      phase: 'Transition Phase',
      expectation: 'A boundary close broke the prior symmetry; wait for follow-through before assuming a full trend.',
    };
  }
  if (input.swingHighs === 'rising' && input.swingLows === 'rising') {
    return {
      phase: 'Bullish Trend',
      expectation: 'Higher highs and higher lows (HH/HL) remain intact; pullbacks into discount are monitored.',
    };
  }
  if (input.swingHighs === 'falling' && input.swingLows === 'falling') {
    return {
      phase: 'Bearish Trend',
      expectation: 'Lower highs and lower lows (LH/LL) remain intact; rallies into premium are monitored.',
    };
  }
  return {
    phase: 'Consolidation Range',
    expectation: 'Price oscillates between opposing boundaries; watch for sweeps of range highs/lows rather than chasing mid-range.',
  };
}
