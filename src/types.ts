export type SessionName = 'Asia' | 'London' | 'New York AM' | 'New York PM' | 'London Close';

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  session?: SessionName;
}

export interface ChartAnnotation {
  id: string;
  type: 'BSL' | 'SSL' | 'FVG' | 'IFVG' | 'OB' | 'BREAKER' | 'MSS' | 'BOS' | 'SWEEP' | 'EQ' | 'PDH' | 'PDL' | 'PWH' | 'PWL' | 'OTE';
  label: string;
  priceLevel?: number;
  priceTop?: number;
  priceBottom?: number;
  candleIndexStart: number;
  candleIndexEnd: number;
  description: string;
  isBullish?: boolean;
}

export interface ChartScenario {
  id: string;
  title: string;
  asset: string;
  timeframe: string;
  htfContext: string;
  description: string;
  candles: Candle[];
  annotations: ChartAnnotation[];
  replaySteps: {
    candleIndex: number;
    title: string;
    narrative: string;
    activeLayers: string[];
    question?: {
      prompt: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    };
  }[];
}

export interface ConceptMastery {
  conceptId: string;
  understanding: number; // 0 - 100
  identification: number;
  application: number;
  quizzesTaken: number;
  quizzesCorrect: number;
}

export interface QuizQuestion {
  id: string;
  conceptId: string;
  type: 'definition' | 'recognition' | 'reasoning' | 'execution' | 'invalidation' | 'chart';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  chartSnippetId?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ChapterSection {
  id: string;
  title: string;
  content: string; // Markdown / formatted text
  diagramType?: 'liquidity_sweep' | 'fvg_formation' | 'order_block' | 'breaker_block' | 'mss_sequence' | 'po3_amd' | 'top_down_matrix' | 'session_timeline' | 'nested_structure';
  diagramData?: Record<string, unknown>;
  keyTakeaway?: string;
}

export interface TextbookChapter {
  id: number;
  slug: string;
  part: string;
  title: string;
  quote: string;
  summary: string[];
  keyTerms: { term: string; definition: string }[];
  practiceQuestions: string[];
  sections: ChapterSection[];
  level: number;
}

export interface ICTConceptSource {
  mentorship: string;
  seriesOrMonth: string;
  approximateDate: string;
  originalTerminology: string;
  conceptStatus: 'Foundational' | 'Active Core' | 'Refined' | 'Advanced Execution';
  lectureReference?: string;
}

export interface ICTConceptTripartite {
  ictTeaching: string; // What Michael J. Huddleston explicitly teaches
  observableMarketBehavior: string; // What empirically happens in auction book / charts
  derivedInterpretation: string; // How modern SMC/quant traders formalize & test it
}

export interface ICTExplanationLadder {
  level1Child: string; // Everyday simple analogy
  level2Beginner: string; // Core chart behavior
  level3Trader: string; // Orderflow, risk & execution
  level4Advanced: string; // Intermarket, HTF matrix & delivery timing
  level5ICTFramework: string; // Pure IPDA algorithmic delivery model
  whenItMatters: string; // High-probability actionable context
  whenToIgnore: string; // Low-probability noise context
}

export interface ConceptCounterexample {
  title: string;
  trapDescription: string;
  whyItFails: string;
  ruleOfThumb: string;
}

export interface ConceptCausalConnection {
  targetConceptId: string;
  targetLabel: string;
  whyThisFollows: string;
  institutionalMechanic: string;
  riskOfSkipping: string;
}

export interface ICTConcept {
  id: string;
  name: string;
  category: 'foundations' | 'structure' | 'liquidity' | 'imbalances' | 'order_blocks' | 'time_sessions' | 'models';
  shortDefinition: string;
  source?: ICTConceptSource;
  tripartiteView?: ICTConceptTripartite;
  explanationLadder?: ICTExplanationLadder;
  whyItExists: string;
  problemItSolves: string;
  howItForms: string | string[];
  chartAnatomy: string;
  identificationRules: string[];
  validCharacteristics: string[];
  invalidCharacteristics: string[];
  howICTUsesIt: string;
  commonMistakes: string[];
  advancedNuances: string | string[];
  prerequisites: string[];
  relatedConcepts: string[];
  bullishScenario: string;
  bearishScenario: string;
  counterexample: string;
  counterexamples?: ConceptCounterexample[];
  causalConnections?: ConceptCausalConnection[];
  timeframeMatrix?: {
    htfApplication: string;
    ltfApplication: string;
    sessionAndTiming: string;
  };
  tradeRules?: {
    entryModels: string[];
    targetingLogic: string[];
    invalidationCriteria: string;
  };
  invalidationCriteria: string;
  diagramType: 'liquidity_sweep' | 'fvg_formation' | 'order_block' | 'breaker_block' | 'mss_sequence' | 'po3_amd' | 'top_down_matrix' | 'session_timeline' | 'nested_structure';
  simplifiedExplanation: string;
}

export interface ConceptComparison {
  id: string;
  title: string;
  conceptA: {
    name: string;
    summary: string;
    keyPoints: string[];
    idealCondition: string;
  };
  conceptB: {
    name: string;
    summary: string;
    keyPoints: string[];
    idealCondition: string;
  };
  keyDifference: string;
  commonConfusion: string;
  decisionRule: string;
  diagramSnippet?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  time?: string;
  asset: string;
  pair?: string;
  timeframe: string;
  session?: SessionName | string;
  direction: 'LONG' | 'SHORT';
  modelUsed?: string;
  htfBias: string;
  dealingRangeLocation?: string;
  drawOnLiquidity?: string;
  liquiditySwept: string;
  sweepType?: string;
  displacementScore?: string;
  mssConfirmed?: boolean;
  entryArray: string;
  entryPdArray?: string;
  entryPrice?: number;
  stopPrice?: number;
  stopPlacement?: string;
  target?: string;
  targetPrice?: number;
  riskRewardRatio?: number;
  invalidationReason?: string;
  result: 'WIN' | 'LOSS' | 'BE' | 'Win' | 'Loss' | 'Breakeven' | 'Missed';
  rRealized: number;
  rMultiple?: number;
  pnl?: number;
  qualityScore?: number;
  checklistScore: number;
  notes?: string;
  psychologyNotes?: string;
  mistakesOrLearnings?: string;
  checklistPassed?: string[];
}


export interface BacktestConfig {
  modelName: string;
  asset: string;
  sessionFilter: string[];
  entryModel: string;
  stopType: string;
  riskPercent: number;
  minRiskReward: number;
}

export interface BacktestSummary {
  totalTrades: number;
  wins: number;
  losses: number;
  winRate: number;
  averageR: number;
  profitFactor: number;
  maxDrawdown: number;
  expectancy: number;
  tradesList: {
    id: string;
    tradeDate: string;
    type: 'Long' | 'Short';
    resultR: number;
    model: string;
    session: string;
  }[];
}

export type MasoodPlaylistId = 'beginners' | 'advanced' | 'daily_bias' | 'godfather' | 'psychology' | 'syndicate';

export interface MasoodLecture {
  id: string;
  lectureNumber: number;
  title: string;
  youtubeId: string;
  playlistType: MasoodPlaylistId;
  shortSummary: string;
  keyTakeaways: string[];
  coreRules: string[];
  tradingChecklist: string[];
  commonMistakes: string[];
  practicalExercise: string;
  bilingualNotes?: string;
  animationType?: 'po3_expansion' | 'seek_and_destroy' | 'smt_divergence' | 'mmxm_curve' | 'volume_imbalance' | 'session_clock' | 'timeframe_fractal' | 'prop_drawdown' | 'gold_smc' | 'tape_reading' | 'godfather_laws';
}

export interface MasoodPlaylist {
  id: MasoodPlaylistId;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  targetAudience: string;
  prerequisites: string[];
  lecturesCount: number;
  lectures: MasoodLecture[];
}
