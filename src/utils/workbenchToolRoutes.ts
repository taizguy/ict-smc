import { masterclassCollection, MasterclassItem } from '../data/masterclassData';
import { chartScenarios } from '../data/chartScenarios';
import { ChartScenario } from '../types';
import { conceptComparisons } from '../data/comparisonsData';
import { quizzes, QuizModule } from '../data/quizzesData';

// --- 1. MASTERCLASS HUB ROUTING TAXONOMY ---
export interface MasterclassCategoryMeta {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export const MASTERCLASS_CATEGORIES: MasterclassCategoryMeta[] = [
  {
    id: 'all',
    slug: 'all',
    name: 'All Masterclasses (34+)',
    description: 'Comprehensive compendium of 34 ICT & SMC visual blueprints, execution sequences, and delivery signatures.'
  },
  {
    id: 'masterclass_34',
    slug: 'core-masterclasses',
    name: 'Core Masterclasses',
    description: 'Foundational institutional blueprints covering weekly profiles, Judas swings, and delivery sequences.'
  },
  {
    id: 'pd_array_15',
    slug: 'pd-arrays',
    name: '15 PD Arrays Hierarchy',
    description: 'The strict hierarchy of institutional premium and discount arrays from Old Highs to Breakers and Mitigation.'
  },
  {
    id: 'entry_model_5',
    slug: 'entry-models',
    name: '5 A+ Entry Models',
    description: 'High-probability execution models: 2022 Mentorship, Silver Bullet, MMBM/MMSM, Turtle Soup, and Breaker setups.'
  },
  {
    id: 'opening_range_5',
    slug: 'opening-ranges',
    name: '5 Opening Ranges',
    description: 'True opening price filters across London Open, New York 09:30 AM, Asia, and Midnight benchmark lines.'
  },
  {
    id: 'mentorship_2026',
    slug: 'mentorship-frameworks',
    name: 'Mentorship Frameworks',
    description: 'Advanced 2026 institutional mechanics including Trinity Rules, ATH Alchemy, and NDOG gap matrices.'
  }
];

export function getMasterclassSlug(item: MasterclassItem): string {
  return item.id.replace(/^mc_\d+_/i, '').replace(/_/g, '-');
}

export function getMasterclassCategorySlug(category: string): string {
  const match = MASTERCLASS_CATEGORIES.find(c => c.id === category);
  return match ? match.slug : 'core-masterclasses';
}

export function getMasterclassUrl(item: MasterclassItem): string {
  const catSlug = getMasterclassCategorySlug(item.category);
  const slug = getMasterclassSlug(item);
  return `/tools/masterclass/${catSlug}/${slug}/`;
}

// --- 2. CHART LAB SCENARIOS TAXONOMY ---
export interface ChartScenarioMeta {
  id: string;
  slug: string;
  title: string;
  asset: string;
  description: string;
}

export const CHART_SCENARIOS_META: { [key: string]: { slug: string; metaTitle: string; metaDescription: string } } = {
  btc_2022_bullish_model: {
    slug: 'btc-2022-bullish-model',
    metaTitle: 'BTC/USDT 2022 Model Execution Lab — Chart Lab | LearnSMC',
    metaDescription: 'Step-by-step interactive candle training on BTC/USDT. Identify Asian low sweep, 5M FVG displacement, and PDH execution.'
  },
  nq_silver_bullet_short: {
    slug: 'nq-silver-bullet-short',
    metaTitle: 'NQ Futures 10:00 AM Silver Bullet Short — Chart Lab | LearnSMC',
    metaDescription: 'Mark and execute the ICT Silver Bullet short on NASDAQ futures between 10:00 AM and 11:00 AM NY macro delivery window.'
  },
  eurusd_failed_ob_breaker: {
    slug: 'eurusd-failed-ob-breaker',
    metaTitle: 'EUR/USD Failed Bullish OB to Bearish Breaker — Chart Lab | LearnSMC',
    metaDescription: 'Train your eye to spot trapped buyers in failed order blocks converted into high-probability institutional breaker blocks on EUR/USD.'
  },
  xauusd_gold_legacy_model: {
    slug: 'xauusd-gold-legacy-model',
    metaTitle: 'XAUUSD (Gold) Session Sweep & 50% FVG Lab — Chart Lab | LearnSMC',
    metaDescription: 'Precision candle replay of Gold session liquidity raid, 50% consequent encroachment test, and delivery into external targets.'
  },
  eur_mmbm_propulsion_model: {
    slug: 'eur-mmbm-propulsion-model',
    metaTitle: 'EUR/USD Market Maker Buy Model & Propulsion Block — Chart Lab | LearnSMC',
    metaDescription: 'Execute the complete 5-stage Market Maker Buy Model (MMBM) with nested propulsion block re-accumulation on EUR/USD.'
  },
  nq_2026_ath_alchemy_ndog_macro: {
    slug: 'nq-ath-alchemy-ndog-macro',
    metaTitle: 'NQ All-Time High Alchemy & NDOG Gap Matrix — Chart Lab | LearnSMC',
    metaDescription: 'Master the 2026 NDOG opening gap matrix, 09:50 macro inversion FVG, and Fibonacci ATH price expansion extensions.'
  }
};

export function getChartScenarioSlug(scenarioId: string): string {
  return CHART_SCENARIOS_META[scenarioId]?.slug || scenarioId.replace(/_/g, '-');
}

export function getChartScenarioUrl(scenarioId: string, step?: string): string {
  const slug = getChartScenarioSlug(scenarioId);
  return step ? `/tools/chartlab/${slug}/${step}/` : `/tools/chartlab/${slug}/`;
}

// --- 3. TRADE SIMULATOR MODELS TAXONOMY ---
export interface SimulatorModelMeta {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  direction: 'LONG' | 'SHORT';
  htfBias: 'Bullish' | 'Bearish';
  location: 'Discount' | 'Premium';
  liquidityEvent: string;
  confirmation: string;
  entryArray: string;
  stopPlacement: string;
  targetType: string;
}

export const SIMULATOR_MODELS: SimulatorModelMeta[] = [
  {
    id: 'ict-2022-model',
    slug: 'ict-2022-model',
    name: 'ICT 2022 Mentorship Model',
    subtitle: 'Classic SSL/BSL Sweep + 5m Displacement + FVG Retest',
    description: 'The flagship retail-to-institutional transition model: price sweeps key session liquidity, creates clear displacement and MSS, and retraces into a 50% CE Fair Value Gap.',
    direction: 'LONG',
    htfBias: 'Bullish',
    location: 'Discount',
    liquidityEvent: 'SSL Sweep',
    confirmation: 'Displacement + MSS',
    entryArray: 'FVG (50% CE)',
    stopPlacement: 'Structural Invalidation (Sweep Low/High)',
    targetType: 'Major External Liquidity (PDH/PDL)'
  },
  {
    id: 'silver-bullet-short',
    slug: 'silver-bullet-short',
    name: '10:00 AM NY Silver Bullet Short',
    subtitle: 'High-Frequency 60-Minute Macro Execution Engine',
    description: 'Executes strictly inside the 10:00 - 11:00 AM NY equities macro window following a raid of the 09:30 AM opening session highs.',
    direction: 'SHORT',
    htfBias: 'Bearish',
    location: 'Premium',
    liquidityEvent: 'BSL Sweep',
    confirmation: 'Displacement + MSS',
    entryArray: 'FVG (50% CE)',
    stopPlacement: 'Structural Invalidation (Sweep Low/High)',
    targetType: 'Internal Range Liquidity'
  },
  {
    id: 'london-judas-swing',
    slug: 'london-judas-swing',
    name: 'London Judas Swing Reversal',
    subtitle: '02:00 - 05:00 AM European Session False Expansion',
    description: 'Exploits the classic Tuesday/Wednesday European manipulation run below Asian range lows to engineer the Low of the Day (LOD).',
    direction: 'LONG',
    htfBias: 'Bullish',
    location: 'Discount',
    liquidityEvent: 'SSL Sweep',
    confirmation: 'Displacement + MSS',
    entryArray: 'Order Block',
    stopPlacement: 'Structural Invalidation (Sweep Low/High)',
    targetType: 'Major External Liquidity (PDH/PDL)'
  },
  {
    id: 'failed-ob-breaker',
    slug: 'failed-ob-breaker',
    name: 'Failed Order Block Breaker Model',
    subtitle: 'The Unicorn Reversal: Trapped Retail Volume Exploitation',
    description: 'When an order block fails after sweeping opposite liquidity, it inverts into an institutional breaker block for asymmetric payoff.',
    direction: 'SHORT',
    htfBias: 'Bearish',
    location: 'Premium',
    liquidityEvent: 'BSL Sweep',
    confirmation: 'Displacement + MSS',
    entryArray: 'Breaker Block',
    stopPlacement: 'Structural Invalidation (Sweep Low/High)',
    targetType: 'Major External Liquidity (PDH/PDL)'
  },
  {
    id: 'ote-expansion-long',
    slug: 'ote-expansion-long',
    name: 'Optimal Trade Entry (OTE 70.5%)',
    subtitle: 'Fibonacci Mathematical Equilibrium Expansion Model',
    description: 'Deep discount retracement into the 62% - 79% institutional Fibonacci sweet spot nested inside an unmitigated order block.',
    direction: 'LONG',
    htfBias: 'Bullish',
    location: 'Discount',
    liquidityEvent: 'SSL Sweep',
    confirmation: 'Displacement + MSS',
    entryArray: 'OTE (70.5%)',
    stopPlacement: 'Structural Invalidation (Sweep Low/High)',
    targetType: 'Major External Liquidity (PDH/PDL)'
  },
  {
    id: 'news-driver-reversal',
    slug: 'news-driver-reversal',
    name: 'Macro News Catalyst Reversal',
    subtitle: 'CPI / NFP Release Volatility Raid and Immediate Absorption',
    description: 'High-impact macroeconomic news spike that raids resting external liquidity and is absorbed by algorithmic institutional limit orders.',
    direction: 'SHORT',
    htfBias: 'Bearish',
    location: 'Premium',
    liquidityEvent: 'BSL Sweep',
    confirmation: 'Displacement + MSS',
    entryArray: 'FVG (50% CE)',
    stopPlacement: 'Structural Invalidation (Sweep Low/High)',
    targetType: 'Major External Liquidity (PDH/PDL)'
  }
];

// --- 4. BACKTEST LAB STRATEGIES TAXONOMY ---
export interface BacktestStrategyMeta {
  id: string;
  slug: string;
  title: string;
  shortName: string;
  description: string;
  expectedWinRate: string;
  avgRR: string;
  profitFactor: string;
}

export const BACKTEST_STRATEGIES: BacktestStrategyMeta[] = [
  {
    id: '2022_model',
    slug: '2022-mentorship-model',
    title: 'ICT Charter Model 13 / 2022 Mentorship Model (Displacement + FVG)',
    shortName: '2022 Mentorship Model',
    description: 'Executes strictly when session liquidity is swept, followed by aggressive displacement and MSS creating a clean 50% CE FVG.',
    expectedWinRate: '61% - 68%',
    avgRR: '2.8R',
    profitFactor: '1.95 - 2.45'
  },
  {
    id: 'charter_model_1',
    slug: 'charter-model-1',
    title: 'ICT Charter Model 1 (Intraday Scalping & 20-Day IPDA)',
    shortName: 'Charter Model 1 (Scalping)',
    description: 'Focuses on 15m structural order flow aligned with the 20-day institutional lookback high/low draw on liquidity.',
    expectedWinRate: '64% - 72%',
    avgRR: '2.1R',
    profitFactor: '2.05 - 2.62'
  },
  {
    id: 'charter_model_8',
    slug: 'charter-model-8',
    title: 'ICT Charter Model 8 (25 Pips / Week Framework)',
    shortName: 'Charter Model 8 (25 Pips)',
    description: 'High-probability single weekly setup design for busy professionals seeking exactly 25-30 pips compounding per week.',
    expectedWinRate: '69% - 76%',
    avgRR: '2.5R',
    profitFactor: '2.30 - 3.10'
  },
  {
    id: 'charter_model_9',
    slug: 'charter-model-9',
    title: 'ICT Charter Model 9 (One Shot One Kill - OSOK)',
    shortName: 'Charter Model 9 (OSOK Swing)',
    description: 'Captures the massive weekly range expansion from low of the week to high of the week using Daily & 4-Hour institutional order blocks.',
    expectedWinRate: '57% - 65%',
    avgRR: '4.2R',
    profitFactor: '2.15 - 2.85'
  },
  {
    id: 'silver_bullet',
    slug: 'silver-bullet',
    title: 'ICT Silver Bullet (10:00 - 11:00 AM NY Macro Engine)',
    shortName: 'Silver Bullet Engine',
    description: 'Executes strictly inside the 60-minute algorithmic window (10:00 - 11:00 AM NY) targeting 15-20 index handles with surgical precision.',
    expectedWinRate: '66% - 74%',
    avgRR: '2.2R',
    profitFactor: '2.10 - 2.70'
  },
  {
    id: 'breaker_reversal',
    slug: 'breaker-reversal',
    title: 'Institutional Breaker Block Reversal Protocol',
    shortName: 'Breaker Reversal Model',
    description: 'Capitalizes on trapped liquidity by trading the retest of failed order blocks that generated a stop run before structural breach.',
    expectedWinRate: '63% - 71%',
    avgRR: '3.1R',
    profitFactor: '2.20 - 2.80'
  }
];

// --- 5. TRADING JOURNAL MODULES TAXONOMY ---
export interface JournalSectionMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
}

export const JOURNAL_SECTIONS: JournalSectionMeta[] = [
  {
    id: 'log',
    slug: 'log-book',
    title: 'Trader Log Book & Executions',
    description: 'Comprehensive historical audit of all recorded trades with automated PnL, R-multiple, and institutional confluence metrics.'
  },
  {
    id: 'audit',
    slug: 'audit-protocol',
    title: '7-Point Institutional Quality Audit',
    description: 'Mechanical pre-trade checklist validating HTF bias, discount/premium location, sweep sequence, displacement, and invalidation rules.'
  },
  {
    id: 'analytics',
    slug: 'analytics',
    title: 'Performance & Mathematical Expectancy',
    description: 'Statistical breakdown of win-rates, risk-to-reward distributions, profit factor, and consistency metrics.'
  },
  {
    id: 'new',
    slug: 'new-entry',
    title: 'Record New Institutional Execution',
    description: 'Codify a new trade entry with screenshot attachments, emotional psychology state, and institutional setup mechanics.'
  }
];

// --- 6. KNOWLEDGE GRAPH PIPELINE & NETWORK TAXONOMY ---
export interface KnowledgeGraphStepMeta {
  step: number;
  slug: string;
  title: string;
  shortDesc: string;
}

export const KNOWLEDGE_GRAPH_STEPS: KnowledgeGraphStepMeta[] = [
  { step: 1, slug: 'step-1-resting-liquidity', title: '1. Resting Liquidity Queues', shortDesc: 'Limit bids and asks resting in central order book Depth of Market queues.' },
  { step: 2, slug: 'step-2-liquidity-pools', title: '2. Liquidity Pool Concentration', shortDesc: 'Dense clustering of retail stop-losses above swing highs (BSL) and lows (SSL).' },
  { step: 3, slug: 'step-3-liquidity-sweep', title: '3. Liquidity Purge (The Raid)', shortDesc: 'False breakout piercing key levels to trigger resting stops as execution fuel.' },
  { step: 4, slug: 'step-4-institutional-absorption', title: '4. Institutional Absorption', shortDesc: 'Smart money absorbs retail stop volume without allowing price continuation.' },
  { step: 5, slug: 'step-5-displacement-engine', title: '5. Algorithmic Displacement', shortDesc: 'Explosive, energetic directional impulse candles creating price imbalances.' },
  { step: 6, slug: 'step-6-market-structure-shift', title: '6. Market Structure Shift (MSS)', shortDesc: 'Definitive structural break with candle body close confirming orderflow change.' },
  { step: 7, slug: 'step-7-dealing-range', title: '7. Dealing Range Equilibrium', shortDesc: 'Mapping the 50% equilibrium threshold to buy only in Discount or sell in Premium.' },
  { step: 8, slug: 'step-8-pd-array-mitigation', title: '8. PD Array Mitigation', shortDesc: 'Price retraces into Fair Value Gaps or Order Blocks to rebalance and fill limit orders.' },
  { step: 9, slug: 'step-9-entry-protocol', title: '9. Institutional Entry Execution', shortDesc: 'Limit order fill at 50% CE or array threshold with mechanical stop loss placement.' },
  { step: 10, slug: 'step-10-draw-on-liquidity', title: '10. Terminal Draw on Liquidity (DOL)', shortDesc: 'Final rapid expansion leg delivering directly into opposing HTF liquidity targets.' }
];

// --- 7. COMPARE MATRIX TAXONOMY ---
export function getComparisonSlug(comparisonId: string): string {
  return comparisonId.replace(/_/g, '-');
}

export function getComparisonUrl(comparisonId: string): string {
  const slug = getComparisonSlug(comparisonId);
  return `/tools/compare/${slug}/`;
}

// --- 8. MASTERY PROFILE & EXAMS TAXONOMY ---
export interface MasteryExamMeta {
  id: string;
  slug: string;
  title: string;
  level: string;
  description: string;
}

export const MASTERY_EXAMS: MasteryExamMeta[] = [
  {
    id: 'quiz-foundations',
    slug: 'foundations-mechanics',
    title: 'Exam 1: Market Mechanics & Liquidity Pools',
    level: 'Level 0 - 1',
    description: 'Test your understanding of order book queues, BSL, SSL, and why price moves.'
  },
  {
    id: 'quiz-imbalances',
    slug: 'imbalances-fvg-ce',
    title: 'Exam 2: Displacement, FVGs & Consequent Encroachment',
    level: 'Level 2',
    description: 'Test your precision on Fair Value Gap boundary identification, CE 50%, and structural shifts.'
  },
  {
    id: 'quiz-order-blocks',
    slug: 'order-blocks-breakers',
    title: 'Exam 3: Order Blocks, Breakers & Mitigations',
    level: 'Level 3 - 4',
    description: 'Master the difference between genuine OBs, Breakers, and Mitigation blocks.'
  },
  {
    id: 'quiz-2026-mastery',
    slug: '2026-advanced-mastery',
    title: 'Exam 4: 2026 Smart Money Concepts & Execution',
    level: 'Level 5 (2026 Master)',
    description: 'Test your precision on the 2026 curriculum: Trinity Rule, ATH Alchemy, NDOG Matrices, and CSoD.'
  },
  {
    id: 'quiz-mastery',
    slug: 'final-certification',
    title: 'Final Comprehensive Certification Exam',
    level: 'Grandmaster',
    description: 'Complete cross-curriculum evaluation covering foundations through 2026 advanced execution protocols.'
  }
];

// --- 9. ICT DELIVERY SUITE TAXONOMY ---
export interface DeliverySuiteModuleMeta {
  id: string;
  slug: string;
  name: string;
  badge: string;
  description: string;
}

export const DELIVERY_SUITE_MODULES: DeliverySuiteModuleMeta[] = [
  {
    id: 'clock',
    slug: 'macro-clock',
    name: 'Kill Zone & Macro Times Engine',
    badge: 'Timing Protocol',
    description: 'Real-time New York (EST) session clock, countdown timer to active killzones, and institutional macro delivery windows.'
  },
  {
    id: 'ote',
    slug: 'ote-calculator',
    name: 'Institutional OTE & Fibonacci Engine',
    badge: 'Mathematical Edge',
    description: 'Exact institutional Fibonacci anchor points: 0.50 Equilibrium, 0.618, 0.705 sweet spot, and symmetric expansion targets.'
  },
  {
    id: 'asian_planner',
    slug: 'judas-planner',
    name: 'Asian Range Judas Swing Planner',
    badge: 'Manipulation Matrix',
    description: 'Calculate Asian high/low deviation boundaries, Judas swing raid projections, and London open trade targets.'
  },
  {
    id: 'learning_path',
    slug: 'learning-path',
    name: '5-Phase Institutional Trader Roadmap',
    badge: 'Curriculum Architecture',
    description: 'Progressive roadmap detailing required milestones from Foundations through IPDA Algorithmic Mastery.'
  }
];

// --- 10. UNIVERSAL WORKBENCH ROUTE RESOLVER ---
export type WorkbenchToolId = 
  | 'chartlab' 
  | 'simulator' 
  | 'backtest' 
  | 'journal' 
  | 'graph' 
  | 'concepts' 
  | 'compare' 
  | 'dashboard' 
  | 'masterclass' 
  | 'ict_suite';

export interface ResolvedWorkbenchRoute {
  tool: WorkbenchToolId | 'overview';
  canonicalUrl: string;
  cleanPath: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  isCanonical: boolean;
  // Subroute parameters:
  masterclassCategory?: string;
  masterclassModuleSlug?: string;
  chartScenarioSlug?: string;
  chartStepSlug?: string;
  simulatorModelSlug?: string;
  backtestStrategySlug?: string;
  journalSectionSlug?: string;
  graphViewMode?: 'pipeline' | 'network';
  graphStep?: number;
  graphNodeId?: string;
  comparisonSlug?: string;
  profileSubTab?: 'roadmap' | 'quiz';
  profileExamSlug?: string;
  deliveryModuleSlug?: string;
}

/**
 * Universal Workbench URL Resolver
 * Resolves paths like:
 * - /tools/ (overview)
 * - /tools/masterclass/
 * - /tools/masterclass/pd-arrays/
 * - /tools/masterclass/pd-arrays/fair-value-gap/
 * - /tools/chartlab/
 * - /tools/chartlab/btc-2022-bullish-model/
 * - /tools/simulator/
 * - /tools/simulator/ict-2022-model/
 * - /tools/backtest/
 * - /tools/backtest/2022-mentorship-model/
 * - /tools/journal/
 * - /tools/journal/audit-protocol/
 * - /tools/knowledge-graph/ (or legacy /tools/graph/)
 * - /tools/knowledge-graph/pipeline/step-1/
 * - /tools/knowledge-graph/network/fair_value_gap/
 * - /tools/compare/
 * - /tools/compare/fvg-vs-ifvg/
 * - /tools/profile/ (or legacy /tools/dashboard/)
 * - /tools/profile/exams/foundations-mechanics/
 * - /tools/delivery-suite/ (or legacy /tools/ict-suite/)
 * - /tools/delivery-suite/macro-clock/
 */
export function resolveWorkbenchRoute(pathname: string): ResolvedWorkbenchRoute {
  const clean = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  const segments = clean.split('/').filter(Boolean);

  // If path is root tools or workbench
  if (segments.length === 0 || segments[0] === 'tools' && segments.length === 1 || segments[0] === 'workbench' && segments.length === 1) {
    return {
      tool: 'overview',
      canonicalUrl: '/tools/',
      cleanPath: '/tools/',
      metaTitle: 'ICT Trading Workbench & Analytical Laboratories | LearnSMC',
      metaDescription: 'Empirical institutional trading lab: interactive Chart Lab, execution simulator, backtest statistics, trading journal, masterclasses, and comparison matrix.',
      badge: 'Analytical Suite',
      isCanonical: true
    };
  }

  // Segment 1 is the tool slug (e.g. 'masterclass', 'chartlab', 'simulator', etc.)
  const toolSlug = segments[1] || segments[0];

  // 1. MASTERCLASS HUB
  if (toolSlug === 'masterclass') {
    if (segments.length <= 2) {
      return {
        tool: 'masterclass',
        canonicalUrl: '/tools/masterclass/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'ICT & SMC Masterclass Hub (34 Models & 15 PD Arrays) | LearnSMC',
        metaDescription: 'Complete institutional compendium of 34 ICT masterclasses, 15 PD Arrays in hierarchical order, 5 A+ Entry Models, and 5 opening ranges.',
        badge: 'Visual Blueprint',
        isCanonical: true,
        masterclassCategory: 'all'
      };
    }

    const sub1 = segments[2];
    const sub2 = segments[3];

    // Check if sub1 matches category slug
    const matchedCategory = MASTERCLASS_CATEGORIES.find(c => c.slug === sub1 || c.id === sub1);
    if (matchedCategory && !sub2) {
      return {
        tool: 'masterclass',
        canonicalUrl: `/tools/masterclass/${matchedCategory.slug}/`,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: `${matchedCategory.name} — Masterclass Hub | LearnSMC`,
        metaDescription: matchedCategory.description,
        badge: matchedCategory.name,
        isCanonical: true,
        masterclassCategory: matchedCategory.id
      };
    }

    // Module matching: either /tools/masterclass/:cat/:module or /tools/masterclass/:module
    let targetModule = masterclassCollection.find(m => {
      const slug = getMasterclassSlug(m);
      return slug === sub2 || m.id === sub2 || slug === sub1 || m.id === sub1;
    });

    if (targetModule) {
      const catSlug = getMasterclassCategorySlug(targetModule.category);
      const modSlug = getMasterclassSlug(targetModule);
      const canonical = `/tools/masterclass/${catSlug}/${modSlug}/`;
      return {
        tool: 'masterclass',
        canonicalUrl: canonical,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: `${targetModule.title} — ICT Masterclass Hub | LearnSMC`,
        metaDescription: `${targetModule.subtitle}. Core institutional rule: ${targetModule.coreRule}`,
        badge: `Masterclass #${targetModule.number}`,
        isCanonical: segments[2] === catSlug && segments[3] === modSlug,
        masterclassCategory: targetModule.category,
        masterclassModuleSlug: modSlug
      };
    }

    return {
      tool: 'masterclass',
      canonicalUrl: '/tools/masterclass/',
      cleanPath: `/${segments.join('/')}/`,
      metaTitle: 'ICT & SMC Masterclass Hub | LearnSMC',
      metaDescription: '34 institutional masterclasses and 15 PD Arrays.',
      badge: 'Visual Blueprint',
      isCanonical: false,
      masterclassCategory: 'all'
    };
  }

  // 2. CHART LAB
  if (toolSlug === 'chartlab' || toolSlug === 'chart-lab') {
    if (segments.length <= 2) {
      return {
        tool: 'chartlab',
        canonicalUrl: '/tools/chartlab/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'Interactive Chart Lab — Candlestick Auction Replay | LearnSMC',
        metaDescription: 'High-definition interactive candlestick auction training with step-by-step marking of Liquidity Sweeps, Displacement, MSS, and FVG mitigation.',
        badge: 'Trading Floor',
        isCanonical: true
      };
    }

    const scenarioSlug = segments[2];
    const stepSlug = segments[3];
    const matchedScenario = chartScenarios.find(s => getChartScenarioSlug(s.id) === scenarioSlug || s.id === scenarioSlug);

    if (matchedScenario) {
      const slug = getChartScenarioSlug(matchedScenario.id);
      const meta = CHART_SCENARIOS_META[matchedScenario.id];
      const canonical = `/tools/chartlab/${slug}/`;
      return {
        tool: 'chartlab',
        canonicalUrl: canonical,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: meta?.metaTitle || `${matchedScenario.title} — Chart Lab | LearnSMC`,
        metaDescription: meta?.metaDescription || matchedScenario.description,
        badge: `${matchedScenario.asset} • Lab`,
        isCanonical: segments[2] === slug && !stepSlug,
        chartScenarioSlug: slug,
        chartStepSlug: stepSlug
      };
    }

    return {
      tool: 'chartlab',
      canonicalUrl: '/tools/chartlab/',
      cleanPath: `/${segments.join('/')}/`,
      metaTitle: 'Interactive Chart Lab | LearnSMC',
      metaDescription: 'Interactive candlestick practice floor.',
      badge: 'Trading Floor',
      isCanonical: false
    };
  }

  // 3. TRADE SIMULATOR
  if (toolSlug === 'simulator' || toolSlug === 'trade-simulator') {
    if (segments.length <= 2) {
      return {
        tool: 'simulator',
        canonicalUrl: '/tools/simulator/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'Trade Simulator & Algorithmic Market Replay | LearnSMC',
        metaDescription: 'Test your ICT execution protocols: simulate 2022 model, Silver Bullet, and Breaker trades with mathematical confluence grading.',
        badge: 'Execution Room',
        isCanonical: true
      };
    }

    const modelSlug = segments[2];
    const matchedModel = SIMULATOR_MODELS.find(m => m.slug === modelSlug || m.id === modelSlug);

    if (matchedModel) {
      return {
        tool: 'simulator',
        canonicalUrl: `/tools/simulator/${matchedModel.slug}/`,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: `${matchedModel.name} Execution Simulator | LearnSMC`,
        metaDescription: `${matchedModel.subtitle}. ${matchedModel.description}`,
        badge: `${matchedModel.direction} • ${matchedModel.location}`,
        isCanonical: segments[2] === matchedModel.slug,
        simulatorModelSlug: matchedModel.slug
      };
    }

    return {
      tool: 'simulator',
      canonicalUrl: '/tools/simulator/',
      cleanPath: `/${segments.join('/')}/`,
      metaTitle: 'Trade Simulator | LearnSMC',
      metaDescription: 'Test your ICT setups in simulation.',
      badge: 'Execution Room',
      isCanonical: false
    };
  }

  // 4. BACKTEST LAB
  if (toolSlug === 'backtest' || toolSlug === 'backtest-lab') {
    if (segments.length <= 2) {
      return {
        tool: 'backtest',
        canonicalUrl: '/tools/backtest/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'Backtest Lab & Strategy Expectancy Matrix | LearnSMC',
        metaDescription: 'Statistical expectancy, win-rates, profit factor, and drawdown curves for ICT 2022 Model, Silver Bullet, and Charter setups.',
        badge: 'Research Lab',
        isCanonical: true
      };
    }

    const stratSlug = segments[2];
    const matchedStrat = BACKTEST_STRATEGIES.find(s => s.slug === stratSlug || s.id === stratSlug);

    if (matchedStrat) {
      return {
        tool: 'backtest',
        canonicalUrl: `/tools/backtest/${matchedStrat.slug}/`,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: `${matchedStrat.shortName} Backtest Strategy & Expectancy | LearnSMC`,
        metaDescription: `${matchedStrat.description} Expected Win Rate: ${matchedStrat.expectedWinRate}, Average RR: ${matchedStrat.avgRR}.`,
        badge: `${matchedStrat.avgRR} • Expectancy`,
        isCanonical: segments[2] === matchedStrat.slug,
        backtestStrategySlug: matchedStrat.slug
      };
    }

    return {
      tool: 'backtest',
      canonicalUrl: '/tools/backtest/',
      cleanPath: `/${segments.join('/')}/`,
      metaTitle: 'Backtest Lab | LearnSMC',
      metaDescription: 'Quantitative statistical expectancy matrix.',
      badge: 'Research Lab',
      isCanonical: false
    };
  }

  // 5. TRADING JOURNAL
  if (toolSlug === 'journal' || toolSlug === 'trading-journal') {
    if (segments.length <= 2) {
      return {
        tool: 'journal',
        canonicalUrl: '/tools/journal/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'Institutional Trading Journal & Rule Validation | LearnSMC',
        metaDescription: '7-point institutional trade audit and rule validation logger for disciplined trade execution, PnL tracking, and psychology logs.',
        badge: "Trader's Log",
        isCanonical: true,
        journalSectionSlug: 'log-book'
      };
    }

    const sectionSlug = segments[2];
    const matchedSection = JOURNAL_SECTIONS.find(s => s.slug === sectionSlug || s.id === sectionSlug);

    if (matchedSection) {
      return {
        tool: 'journal',
        canonicalUrl: `/tools/journal/${matchedSection.slug}/`,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: `${matchedSection.title} — Trading Journal | LearnSMC`,
        metaDescription: matchedSection.description,
        badge: "Trader's Log",
        isCanonical: segments[2] === matchedSection.slug,
        journalSectionSlug: matchedSection.slug
      };
    }

    return {
      tool: 'journal',
      canonicalUrl: '/tools/journal/',
      cleanPath: `/${segments.join('/')}/`,
      metaTitle: 'Trading Journal | LearnSMC',
      metaDescription: 'Institutional trade log.',
      badge: "Trader's Log",
      isCanonical: false
    };
  }

  // 6. KNOWLEDGE GRAPH
  if (toolSlug === 'knowledge-graph' || toolSlug === 'graph') {
    const isCanonicalToolSlug = toolSlug === 'knowledge-graph';
    if (segments.length <= 2) {
      return {
        tool: 'graph',
        canonicalUrl: '/tools/knowledge-graph/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'Interactive Knowledge Graph — 10-Step Execution Pipeline | LearnSMC',
        metaDescription: 'Visual node map connecting foundational market mechanics: Resting Liquidity, Liquidity Sweeps, Displacement, MSS, PD Arrays, and Terminal DOL.',
        badge: 'Concept Matrix',
        isCanonical: isCanonicalToolSlug,
        graphViewMode: 'pipeline',
        graphStep: 1
      };
    }

    const viewModeOrStep = segments[2];
    const subParam = segments[3];

    if (viewModeOrStep === 'pipeline') {
      let stepNum = 1;
      if (subParam) {
        const stepMatch = subParam.match(/step-(\d+)/i) || subParam.match(/^(\d+)$/);
        if (stepMatch) stepNum = Math.min(Math.max(parseInt(stepMatch[1], 10), 1), 10);
      }
      const matchedStepMeta = KNOWLEDGE_GRAPH_STEPS.find(s => s.step === stepNum) || KNOWLEDGE_GRAPH_STEPS[0];
      return {
        tool: 'graph',
        canonicalUrl: `/tools/knowledge-graph/pipeline/step-${stepNum}/`,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: `${matchedStepMeta.title} — Knowledge Graph | LearnSMC`,
        metaDescription: matchedStepMeta.shortDesc,
        badge: `Step ${stepNum} of 10`,
        isCanonical: isCanonicalToolSlug && segments[2] === 'pipeline' && segments[3] === `step-${stepNum}`,
        graphViewMode: 'pipeline',
        graphStep: stepNum
      };
    }

    if (viewModeOrStep === 'network') {
      const nodeId = subParam || 'fair_value_gap';
      return {
        tool: 'graph',
        canonicalUrl: `/tools/knowledge-graph/network/${nodeId}/`,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: `Knowledge Graph Network (${nodeId}) | LearnSMC`,
        metaDescription: 'Visual interconnected concept network of Smart Money and ICT trading mechanics.',
        badge: 'Network Matrix',
        isCanonical: isCanonicalToolSlug && segments[2] === 'network',
        graphViewMode: 'network',
        graphNodeId: nodeId
      };
    }

    // Direct step shorthand e.g. /tools/knowledge-graph/step-3/
    const directStepMatch = viewModeOrStep.match(/step-(\d+)/i);
    if (directStepMatch) {
      const stepNum = parseInt(directStepMatch[1], 10);
      const matchedStepMeta = KNOWLEDGE_GRAPH_STEPS.find(s => s.step === stepNum) || KNOWLEDGE_GRAPH_STEPS[0];
      return {
        tool: 'graph',
        canonicalUrl: `/tools/knowledge-graph/pipeline/step-${stepNum}/`,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: `${matchedStepMeta.title} — Knowledge Graph | LearnSMC`,
        metaDescription: matchedStepMeta.shortDesc,
        badge: `Step ${stepNum} of 10`,
        isCanonical: false,
        graphViewMode: 'pipeline',
        graphStep: stepNum
      };
    }

    return {
      tool: 'graph',
      canonicalUrl: '/tools/knowledge-graph/',
      cleanPath: `/${segments.join('/')}/`,
      metaTitle: 'Knowledge Graph | LearnSMC',
      metaDescription: 'Institutional concept matrix.',
      badge: 'Concept Matrix',
      isCanonical: false
    };
  }

  // 7. COMPARE MATRIX
  if (toolSlug === 'compare') {
    if (segments.length <= 2) {
      return {
        tool: 'compare',
        canonicalUrl: '/tools/compare/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'Concept Comparison Matrix — Side-by-Side Analysis | LearnSMC',
        metaDescription: 'Side-by-side technical breakdown of frequently confused concepts: FVG vs IFVG, Order Block vs Breaker, BOS vs MSS, and BSL vs SSL.',
        badge: 'Side-by-Side',
        isCanonical: true
      };
    }

    const comparisonSlug = segments[2];
    const matchedComp = conceptComparisons.find(c => getComparisonSlug(c.id) === comparisonSlug || c.id === comparisonSlug);

    if (matchedComp) {
      const slug = getComparisonSlug(matchedComp.id);
      return {
        tool: 'compare',
        canonicalUrl: `/tools/compare/${slug}/`,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: `${matchedComp.title} — Compare Matrix | LearnSMC`,
        metaDescription: `Key Difference: ${matchedComp.keyDifference} Side-by-side technical comparison of ${matchedComp.conceptA.name} and ${matchedComp.conceptB.name}.`,
        badge: 'Side-by-Side',
        isCanonical: segments[2] === slug,
        comparisonSlug: slug
      };
    }

    return {
      tool: 'compare',
      canonicalUrl: '/tools/compare/',
      cleanPath: `/${segments.join('/')}/`,
      metaTitle: 'Concept Comparison Matrix | LearnSMC',
      metaDescription: 'Side-by-side technical concept analysis.',
      badge: 'Side-by-Side',
      isCanonical: false
    };
  }

  // 8. MASTERY PROFILE
  if (toolSlug === 'profile' || toolSlug === 'dashboard' || toolSlug === 'mastery-profile') {
    const isCanonicalToolSlug = toolSlug === 'profile';
    if (segments.length <= 2) {
      return {
        tool: 'dashboard',
        canonicalUrl: '/tools/profile/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'Mastery Profile & Operator Credentials | LearnSMC',
        metaDescription: 'Assessments, diagnostic quizzes, and operator credentials tracking your institutional mastery across 57 curriculum chapters.',
        badge: 'Diagnostics',
        isCanonical: isCanonicalToolSlug,
        profileSubTab: 'roadmap'
      };
    }

    const sub1 = segments[2];
    const sub2 = segments[3];

    if (sub1 === 'roadmap') {
      return {
        tool: 'dashboard',
        canonicalUrl: '/tools/profile/roadmap/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'Institutional Operator Roadmap — Mastery Profile | LearnSMC',
        metaDescription: 'Track progression across Level 0 Foundations, Liquidity, Displacement, PD Arrays, and 2026 Advanced Execution Protocols.',
        badge: 'Curriculum Roadmap',
        isCanonical: isCanonicalToolSlug && segments[2] === 'roadmap',
        profileSubTab: 'roadmap'
      };
    }

    if (sub1 === 'exams' || sub1 === 'quiz') {
      if (sub2) {
        const matchedExam = MASTERY_EXAMS.find(e => e.slug === sub2 || e.id === sub2);
        if (matchedExam) {
          return {
            tool: 'dashboard',
            canonicalUrl: `/tools/profile/exams/${matchedExam.slug}/`,
            cleanPath: `/${segments.join('/')}/`,
            metaTitle: `${matchedExam.title} — Mastery Exam | LearnSMC`,
            metaDescription: `${matchedExam.description} Level: ${matchedExam.level}.`,
            badge: matchedExam.level,
            isCanonical: isCanonicalToolSlug && segments[2] === 'exams' && segments[3] === matchedExam.slug,
            profileSubTab: 'quiz',
            profileExamSlug: matchedExam.slug
          };
        }
      }

      return {
        tool: 'dashboard',
        canonicalUrl: '/tools/profile/exams/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'Institutional Diagnostic Exams — Mastery Profile | LearnSMC',
        metaDescription: 'Comprehensive examination suite covering Foundations, Imbalances, Order Blocks, and 2026 Advanced Mechanics.',
        badge: 'Diagnostic Exams',
        isCanonical: isCanonicalToolSlug && segments[2] === 'exams',
        profileSubTab: 'quiz'
      };
    }

    return {
      tool: 'dashboard',
      canonicalUrl: '/tools/profile/',
      cleanPath: `/${segments.join('/')}/`,
      metaTitle: 'Mastery Profile | LearnSMC',
      metaDescription: 'Diagnostic assessments and trader credentials.',
      badge: 'Diagnostics',
      isCanonical: false
    };
  }

  // 9. ICT DELIVERY SUITE
  if (toolSlug === 'delivery-suite' || toolSlug === 'ict-suite' || toolSlug === 'ict_suite') {
    const isCanonicalToolSlug = toolSlug === 'delivery-suite';
    if (segments.length <= 2) {
      return {
        tool: 'ict_suite',
        canonicalUrl: '/tools/delivery-suite/',
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: 'ICT Delivery Suite & Killzone Macro Clock | LearnSMC',
        metaDescription: 'Real-time New York (EST) session clock, countdown to active Killzones, 8 macro windows, OTE calculator, and Asian Judas planner.',
        badge: 'Tools & Macros',
        isCanonical: isCanonicalToolSlug,
        deliveryModuleSlug: 'macro-clock'
      };
    }

    const modSlug = segments[2];
    const matchedModule = DELIVERY_SUITE_MODULES.find(m => m.slug === modSlug || m.id === modSlug);

    if (matchedModule) {
      return {
        tool: 'ict_suite',
        canonicalUrl: `/tools/delivery-suite/${matchedModule.slug}/`,
        cleanPath: `/${segments.join('/')}/`,
        metaTitle: `${matchedModule.name} — ICT Delivery Suite | LearnSMC`,
        metaDescription: matchedModule.description,
        badge: matchedModule.badge,
        isCanonical: isCanonicalToolSlug && segments[2] === matchedModule.slug,
        deliveryModuleSlug: matchedModule.slug
      };
    }

    return {
      tool: 'ict_suite',
      canonicalUrl: '/tools/delivery-suite/',
      cleanPath: `/${segments.join('/')}/`,
      metaTitle: 'ICT Delivery Suite | LearnSMC',
      metaDescription: 'Institutional trading tools and macro clocks.',
      badge: 'Tools & Macros',
      isCanonical: false
    };
  }

  // Fallback to overview
  return {
    tool: 'overview',
    canonicalUrl: '/tools/',
    cleanPath: `/${segments.join('/')}/`,
    metaTitle: 'ICT Trading Workbench & Analytical Laboratories | LearnSMC',
    metaDescription: 'Empirical institutional trading lab with interactive tools.',
    badge: 'Analytical Suite',
    isCanonical: false
  };
}
