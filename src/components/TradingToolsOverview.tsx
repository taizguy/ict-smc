import { masterclassCollection } from '../data/masterclassData';
import { StudioSketch } from './StudioSketch';
import { AccentText } from './AccentText';
import { textbookChapters } from '../data/chaptersData';
import React, { useState } from 'react';
import { 
  BarChart2, 
  PlayCircle, 
  Cpu, 
  BookMarked, 
  GitFork, 
  Layers, 
  GitCompare, 
  Award, 
  Flame, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  BookOpen, 
  Activity 
} from 'lucide-react';
import { SEO } from './SEO';
import { ScrollReveal } from './ScrollReveal';
import { TradingToolId } from './TradingToolsWorkbench';

interface ToolCardData {
  id: TradingToolId;
  slug: string;
  url: string;
  name: string;
  category: 'execution' | 'reference' | 'performance';
  categoryLabel: string;
  badge: string;
  number: string;
  desc: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const WORKBENCH_TOOL_CATALOG: ToolCardData[] = [
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
    icon: Flame,
    accentColor: '#b34e30'
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
    icon: BarChart2,
    accentColor: '#23796d'
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
    icon: PlayCircle,
    accentColor: '#256552'
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
    icon: Cpu,
    accentColor: '#25734f'
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
    icon: BookMarked,
    accentColor: '#94631f'
  },
  {
    id: 'graph',
    slug: 'knowledge-graph',
    url: '/tools/knowledge-graph/',
    name: 'Knowledge Graph',
    category: 'reference',
    categoryLabel: 'Concept Map',
    badge: '10-Step Pipeline',
    number: '06',
    desc: 'Interactive node network mapping foundational market mechanics to intermediate structural shifts and advanced execution models.',
    features: ['10-step institutional pipeline', 'Concept study relationships', 'Direct jump to concept definitions'],
    icon: GitFork,
    accentColor: '#705692'
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
    icon: Layers,
    accentColor: '#23796d'
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
    icon: GitCompare,
    accentColor: '#E040FB'
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
    features: [`${textbookChapters.length}-lesson completion overview`, 'Knowledge quizzes & score diagnostics', 'Device-local practice results'],
    icon: Award,
    accentColor: '#FFD700'
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
    icon: Compass,
    accentColor: '#1DE9B6'
  }
];

interface TradingToolsOverviewProps {
  onSelectTool: (toolId: TradingToolId, customUrl?: string) => void;
}

export const TradingToolsOverview: React.FC<TradingToolsOverviewProps> = ({ onSelectTool }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'execution' | 'reference' | 'performance'>('all');

  const filteredTools = filterCategory === 'all'
    ? WORKBENCH_TOOL_CATALOG
    : WORKBENCH_TOOL_CATALOG.filter(t => t.category === filterCategory);

  return (
    <div className="studio-tools space-y-10 sm:space-y-12 pb-20 text-ink">
      <SEO 
        title="ICT Trading Workbench & Analytical Laboratories | LearnSMC"
        description="Explore 10 empirical trading facilities: interactive Chart Lab, trade simulator, backtester, multi-tier concepts glossary, and ICT Delivery Suite."
        canonicalPath="/tools/"
        type="website"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          'name': 'ICT Trading Workbench & Laboratory Suite',
          'description': '10 interactive trading software tools for deliberate practice and orderflow study.',
          'url': 'https://learnsmc.xyz/tools/'
        }}
      />

      {/* Hero Overview Banner */}
      <ScrollReveal y={20}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-surface-raised to-surface border border-ink/[0.08] p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-teal/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-teal/10 text-teal border border-teal/20 text-[0.8125rem] font-sans tabular-nums uppercase tracking-wider font-semibold">
                Workbench &amp; Laboratory
              </span>
              <span className="text-ink">/</span>
              <span className="text-xs font-sans tabular-nums text-ink-secondary">
                10 Free Institutional Software Modules
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
                <AccentText text="Trading Study Workbench" focus="Study" urduFocus="مشق" tone="violet"/> <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-brand to-violet">
                  Reference, Practice and Review
                </span>
              </h1>
              <p className="text-base sm:text-lg text-ink-secondary max-w-2xl leading-relaxed">
                Study definitions, work through illustrative chart exercises, and inspect hypothetical risk calculations. Each tool states its assumptions and limitations.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-ink/[0.03] border border-ink/[0.06]">
                <div className="text-xs font-sans tabular-nums uppercase text-ink-muted">Observation Drills</div>
                <div className="text-xl font-bold text-teal font-sans tabular-nums mt-0.5">3 Drills</div>
              </div>
              <div className="p-3.5 rounded-xl bg-ink/[0.03] border border-ink/[0.06]">
                <div className="text-xs font-sans tabular-nums uppercase text-ink-muted">Glossary Concepts</div>
                <div className="text-xl font-bold text-brand font-sans tabular-nums mt-0.5">41 Topics</div>
              </div>
              <div className="p-3.5 rounded-xl bg-ink/[0.03] border border-ink/[0.06]">
                <div className="text-xs font-sans tabular-nums uppercase text-ink-muted">PD Arrays</div>
                <div className="text-xl font-bold text-rust font-sans tabular-nums mt-0.5">Reference studies</div>
              </div>
              <div className="p-3.5 rounded-xl bg-ink/[0.03] border border-ink/[0.06]">
                <div className="text-xs font-sans tabular-nums uppercase text-ink-muted">Macro Windows</div>
                <div className="text-xl font-bold text-positive font-sans tabular-nums mt-0.5">8 Daily</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/[0.08] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Modules (10)' },
            { id: 'execution', label: 'Execution & Replay (3)' },
            { id: 'reference', label: 'Reference & Structure (4)' },
            { id: 'performance', label: 'Timing & Performance (3)' }
          ].map((tab) => (
            <button
              key={tab.id}
              aria-pressed={filterCategory === tab.id}
              onClick={() => setFilterCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-sans tabular-nums uppercase tracking-wider transition-[color,background-color,border-color,box-shadow,opacity,transform] whitespace-nowrap cursor-pointer ${
                filterCategory === tab.id
                  ? 'bg-ink/[0.12] text-ink border border-ink/20 shadow-sm'
                  : 'text-ink-secondary hover:text-ink hover:bg-ink/[0.04]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="text-xs font-sans tabular-nums text-ink-muted">
          Showing {filteredTools.length} of {WORKBENCH_TOOL_CATALOG.length} facilities
        </div>
      </div>

      {/* Grid of Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="tool-surface group flex flex-col justify-between rounded-2xl bg-surface border border-ink/[0.08] hover:border-ink/20 p-6 sm:p-7 transition-colors duration-300"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div 
                    className="tactile-icon w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${tool.accentColor}15`, color: tool.accentColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 font-sans tabular-nums text-xs">
                    <span className="text-[0.8125rem] uppercase px-2 py-0.5 rounded bg-ink/[0.04] text-ink-secondary border border-ink/[0.06]">
                      {tool.badge}
                    </span>
                    <span className="text-ink-muted">{tool.number}</span>
                  </div>
                </div>

                {(['chartlab','simulator','backtest'].includes(tool.id)) && <StudioSketch kind={tool.id === 'chartlab' ? 'recognize' : tool.id === 'simulator' ? 'decide' : 'evaluate'}/>}
                {/* Title & Desc */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-ink group-hover:text-ink tracking-tight flex items-center justify-between">
                    <span>{tool.name}</span>
                  </h3>
                  <div className="text-[0.8125rem] font-sans tabular-nums text-teal uppercase tracking-wider">
                    {tool.categoryLabel}
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed line-clamp-3">
                    {tool.desc}
                  </p>
                </div>

                {/* Feature Chips */}
                <ul className="space-y-1.5 pt-2 border-t border-ink/[0.06]">
                  {tool.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-[0.8125rem] font-sans tabular-nums text-ink-muted flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-teal" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-ink/[0.06]">
                <a

                  href={tool.url}
                  className="w-full py-2.5 px-4 rounded-xl bg-ink/[0.04] hover:bg-ink/[0.10] border border-ink/[0.08] hover:border-ink/20 text-xs font-sans tabular-nums uppercase tracking-wider text-ink hover:text-ink flex items-center justify-center gap-2 transition-[color,background-color,border-color,box-shadow,opacity,transform] cursor-pointer group/btn"
                >
                  <span>Launch Module</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Static Semantic HTML for Search Engines & Technical Documentation */}
      <article className="mt-16 rounded-2xl bg-surface-muted border border-ink/[0.08] p-6 sm:p-10 space-y-6 text-ink-secondary text-sm leading-relaxed">
        <div className="flex items-center gap-2 text-xs font-sans tabular-nums uppercase tracking-wider text-teal">
          <Terminal className="w-4 h-4" />
          <span>Institutional Infrastructure Specification</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
          Deliberate Practice Architecture: Why Simulation Precedes Live Capital Risk
        </h2>
        <p>
          Exchange-traded products and fragmented OTC markets use different execution structures. The LearnSMC Workbench and Laboratory Suite provides independent educational tools so traders can isolate and test individual components of the delivery cycle without financial friction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-4 rounded-xl bg-ink/[0.02] border border-ink/[0.06] space-y-2">
            <h4 className="font-semibold text-ink font-sans tabular-nums text-xs uppercase text-teal">1. Execution &amp; Replay</h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Identify chart features in Chart Laboratory, lock a fictional decision in Trade Simulator, and scan a defined rule on synthetic or local CSV candles in Backtest Lab.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-ink/[0.02] border border-ink/[0.06] space-y-2">
            <h4 className="font-semibold text-ink font-sans tabular-nums text-xs uppercase text-brand">2. Reference &amp; Structure</h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Query 41+ concepts in the multi-tier Glossary, cross-examine definitions in the Compare Matrix, and traverse the 10-step institutional pipeline in the Knowledge Graph.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-ink/[0.02] border border-ink/[0.06] space-y-2">
            <h4 className="font-semibold text-ink font-sans tabular-nums text-xs uppercase text-positive">3. Timing &amp; Mastery</h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Track session killzones and macro execution windows in the ICT Delivery Suite, audit your execution psychology in the Trading Journal, and benchmark diagnostics in the Mastery Profile.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};
