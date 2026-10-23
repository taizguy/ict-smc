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
    icon: BarChart2,
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
    icon: PlayCircle,
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
    icon: Cpu,
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
    icon: BookMarked,
    accentColor: 'var(--wb-ink)'
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
    icon: Layers,
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
    icon: GitCompare,
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
    features: [`${textbookChapters.length}-lesson completion overview`, 'Knowledge quizzes & score diagnostics', 'Device-local practice results'],
    icon: Award,
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
    icon: Compass,
    accentColor: 'var(--wb-ink)'
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
    <div className="wb-hub">
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
      <ScrollReveal y={0}>
        <div className="wb-hero">
          <div className="wb-decoration" />
          <div className="wb-decoration" />

          <div className="wb-hero-layout">
            <div className="wb-ribbon">
              <span className="wb-ribbon-name">
                Workbench &amp; Laboratory
              </span>
              <span className="wb-ribbon-divider">/</span>
              <span className="wb-ribbon-count">
                10 Free Institutional Software Modules
              </span>
            </div>

            <div className="wb-hero-copy">
              <h1 className="wb-heading">
                <AccentText text="Trading Study Workbench" focus="Study" urduFocus="مشق" tone="violet"/> <br className="wb-heading-break" />
                <span className="wb-heading-sub">
                  Reference, Practice and Review
                </span>
              </h1>
              <p className="wb-intro">
                Study definitions, work through illustrative chart exercises, and inspect hypothetical risk calculations. Each tool states its assumptions and limitations.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="wb-facts">
              <div className="wb-fact">
                <div className="wb-fact-label">Observation Drills</div>
                <div className="wb-fact-value">3 Drills</div>
              </div>
              <div className="wb-fact">
                <div className="wb-fact-label">Glossary Concepts</div>
                <div className="wb-fact-value">41 Topics</div>
              </div>
              <div className="wb-fact">
                <div className="wb-fact-label">PD Arrays</div>
                <div className="wb-fact-value">Reference studies</div>
              </div>
              <div className="wb-fact">
                <div className="wb-fact-label">Macro Windows</div>
                <div className="wb-fact-value">8 Daily</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter Tabs */}
      <div className="wb-filter-bar">
        <div className="wb-filters">
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
              className="wb-filter"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="wb-result-count">
          Showing {filteredTools.length} of {WORKBENCH_TOOL_CATALOG.length} facilities
        </div>
      </div>

      {/* Grid of Tool Cards */}
      <div className="wb-directory">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              data-tool={tool.id} data-category={tool.category} data-surface={tool.category==='reference'?'paper':tool.id==='journal'||tool.id==='simulator'?'ink':'gray'}
              className="wb-tool"
            >
              <div className="wb-tool-content">
                {/* Header */}
                <div className="wb-tool-top">
                  <div 
                    className="wb-tool-icon"
                    style={{ backgroundColor: "var(--wb-tint)", color: tool.accentColor }}
                  >
                    <Icon className="wb-icon" />
                  </div>
                  <div className="wb-tool-meta">
                    <span className="wb-badge">
                      {tool.badge}
                    </span>
                    <span className="wb-number">{tool.number}</span>
                  </div>
                </div>

                {(['chartlab','simulator','backtest'].includes(tool.id)) && <StudioSketch kind={tool.id === 'chartlab' ? 'recognize' : tool.id === 'simulator' ? 'decide' : 'evaluate'}/>}
                {/* Title & Desc */}
                <div className="wb-tool-copy">
                  <h3 className="wb-tool-name">
                    <span>{tool.name}</span>
                  </h3>
                  <div className="wb-category">
                    {tool.categoryLabel}
                  </div>
                  <p className="wb-description">
                    {tool.desc}
                  </p>
                </div>

                {/* Feature Chips */}
                <ul className="wb-features">
                  {tool.features.map((feat, fIdx) => (
                    <li key={fIdx} className="wb-feature">
                      <span className="wb-feature-mark" />
                      <span className="wb-feature-copy">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="wb-tool-action">
                <a

                  href={tool.url}
                  className="wb-launch"
                >
                  <span>Launch Module</span>
                  <ArrowRight className="wb-launch-icon" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Static Semantic HTML for Search Engines & Technical Documentation */}
      <article className="wb-method">
        <h2 className="wb-method-heading">
          Deliberate Practice Architecture: Why Simulation Precedes Live Capital Risk
        </h2>
        <div className="wb-method-label">
          <Terminal className="wb-icon" />
          <span>Institutional Infrastructure Specification</span>
        </div>
        <p>
          Exchange-traded products and fragmented OTC markets use different execution structures. The LearnSMC Workbench and Laboratory Suite provides independent educational tools so traders can isolate and test individual components of the delivery cycle without financial friction.
        </p>

        <div className="wb-method-grid">
          <div className="wb-method-section">
            <h4 className="wb-method-title">1. Execution &amp; Replay</h4>
            <p className="wb-method-copy">
              Identify chart features in Chart Laboratory, lock a fictional decision in Trade Simulator, and scan a defined rule on synthetic or local CSV candles in Backtest Lab.
            </p>
          </div>
          <div className="wb-method-section">
            <h4 className="wb-method-title">2. Reference &amp; Structure</h4>
            <p className="wb-method-copy">
              Query 41+ concepts in the multi-tier Glossary, cross-examine definitions in the Compare Matrix, and traverse the 10-step institutional pipeline in the Knowledge Graph.
            </p>
          </div>
          <div className="wb-method-section">
            <h4 className="wb-method-title">3. Timing &amp; Mastery</h4>
            <p className="wb-method-copy">
              Track session killzones and macro execution windows in the ICT Delivery Suite, audit your execution psychology in the Trading Journal, and benchmark diagnostics in the Mastery Profile.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};
