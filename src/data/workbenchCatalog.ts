import { chapterCatalog } from './catalog.generated';
import { masterclassCollection } from './masterclassData';
import type { WorkbenchToolId } from '../utils/workbenchToolRoutes';

/** Shared facts for the interactive directory and its prerendered reading HTML. */
export interface WorkbenchToolData {
  id: WorkbenchToolId;
  slug: string;
  url: string;
  name: string;
  category: 'execution' | 'reference' | 'performance';
  categoryLabel: string;
  badge: string;
  number: string;
  desc: string;
  features: string[];
  icon: 'Flame' | 'BarChart2' | 'PlayCircle' | 'Cpu' | 'BookMarked' | 'GitFork' | 'Layers' | 'GitCompare' | 'Award' | 'Compass';
  accentColor: string;
}

export const workbenchToolCatalog: WorkbenchToolData[] = [
  {
    id: 'masterclass',
    slug: 'masterclass',
    url: '/tools/masterclass/',
    name: 'Masterclass Hub',
    category: 'reference',
    categoryLabel: 'Curriculum & Models',
    badge: `${masterclassCollection.length} Lessons`,
    number: '01',
    desc: 'Independent study lessons covering PD arrays, entry frameworks, opening ranges, invalidation and risk assumptions.',
    features: ['PD array study lessons', '5 opening range setups', 'Turtle soup & unicorn execution models'],
    icon: 'Flame',
    accentColor: 'var(--wb-ink)'
  },
  {
    id: 'chartlab',
    slug: 'chartlab',
    url: '/tools/chartlab/',
    name: 'Chart Laboratory',
    category: 'execution',
    categoryLabel: 'Chart Recognition',
    badge: 'Visual Practice',
    number: '02',
    desc: 'Identify sweeps, displacement and three-candle gaps with selectable candles and visual hints.',
    features: ['Selectable candles and visual hints', 'Three observation drills', 'Six authored illustrative examples'],
    icon: 'BarChart2',
    accentColor: 'var(--wb-ink)'
  },
  {
    id: 'simulator',
    slug: 'simulator',
    url: '/tools/simulator/',
    name: 'Trade Simulator',
    category: 'execution',
    categoryLabel: 'Execution Engine',
    badge: 'Blind Testing',
    number: '03',
    desc: 'Lock a plan before revealing future candles. Explore stops, targets, gaps and the choice not to trade.',
    features: ['Authored illustrative scenarios', 'Transparent price and R arithmetic', 'No historical fills or outcome prediction'],
    icon: 'PlayCircle',
    accentColor: 'var(--wb-ink)'
  },
  {
    id: 'backtest',
    slug: 'backtest',
    url: '/tools/backtest/',
    name: 'Backtest Lab',
    category: 'execution',
    categoryLabel: 'Quantitative Testing',
    badge: 'Rule Research',
    number: '04',
    desc: 'Scan a transparent FVG teaching rule on synthetic demo candles or your local CSV, with training and hold-out samples.',
    features: ['Local OHLC CSV import', 'Chronological training and hold-out', 'Individual trade charts and CSV ledger'],
    icon: 'Cpu',
    accentColor: 'var(--wb-ink)'
  },
  {
    id: 'journal',
    slug: 'journal',
    url: '/tools/journal/',
    name: 'Trading Journal',
    category: 'performance',
    categoryLabel: 'Auditing & Log',
    badge: "Trader's Audit",
    number: '05',
    desc: 'Institutional 7-point trade audit and rule validation logger. Keep track of setups, session timing, emotional adherence, and mistake patterns.',
    features: ['7-point execution audit', 'Local storage persistence', 'Editable execution notes'],
    icon: 'BookMarked',
    accentColor: 'var(--wb-ink)'
  },
  {
    id: 'graph',
    slug: 'knowledge-graph',
    url: '/tools/knowledge-graph/',
    name: 'Knowledge Graph',
    category: 'reference',
    categoryLabel: 'Concept Map',
    badge: '3D Concept Tree',
    number: '06',
    desc: 'Explore an interactive 3D tree of ICT and smart money concepts. Expand topic branches, find related concepts, and open their explanations.',
    features: ['Interactive 3D concept tree', 'Expand topic branches', 'Accessible text tree and concept links'],
    icon: 'GitFork',
    accentColor: 'var(--wb-ink)'
  },
  {
    id: 'concepts',
    slug: 'glossary',
    url: '/tools/glossary/',
    name: 'Glossary & Encyclopedia',
    category: 'reference',
    categoryLabel: 'Institutional Glossary',
    badge: '41 Concepts',
    number: '07',
    desc: 'Comprehensive multi-tier dictionary of Fair Value Gaps, Order Blocks, Liquidity Pools, Time Sessions, and Algorithmic Mechanics.',
    features: ['Multi-tier hierarchy with deep sub-concepts', 'Tripartite explanations & chart anatomy', 'Algorithmic invalidation rules'],
    icon: 'Layers',
    accentColor: 'var(--wb-ink)'
  },
  {
    id: 'compare',
    slug: 'compare',
    url: '/tools/compare/',
    name: 'Compare Matrix',
    category: 'reference',
    categoryLabel: 'Side-by-Side Analysis',
    badge: 'Distinction Rules',
    number: '08',
    desc: 'Rigorous side-by-side contrast of commonly confused concepts: Order Block vs Breaker Block, FVG vs IFVG, MSS vs BOS, and Liquidity Sweeps.',
    features: ['Direct criteria comparison table', 'The decisive separation rule', 'Common retail trap scenarios'],
    icon: 'GitCompare',
    accentColor: 'var(--wb-ink)'
  },
  {
    id: 'dashboard',
    slug: 'profile',
    url: '/tools/profile/',
    name: 'Mastery Profile',
    category: 'performance',
    categoryLabel: 'Diagnostics & Badges',
    badge: 'Practice',
    number: '09',
    desc: 'View your saved lesson completion and take fixed practice quizzes with explanations. No professional credentials are awarded.',
    features: [`${chapterCatalog.length}-lesson completion overview`, 'Knowledge quizzes & score diagnostics', 'Device-local practice results'],
    icon: 'Award',
    accentColor: 'var(--wb-ink)'
  },
  {
    id: 'ict_suite',
    slug: 'delivery-suite',
    url: '/tools/delivery-suite/',
    name: 'ICT Delivery Suite',
    category: 'performance',
    categoryLabel: 'Calculators & Clock',
    badge: 'Macro Suite',
    number: '10',
    desc: 'Independent retracement calculator with instrument-aware sizing, range-multiple projections, New York study clock and saved checklist.',
    features: ['Optimal Trade Entry (OTE) levels', 'Asian Judas swing projection tool', '8 intraday macro execution windows'],
    icon: 'Compass',
    accentColor: 'var(--wb-ink)'
  }
];
