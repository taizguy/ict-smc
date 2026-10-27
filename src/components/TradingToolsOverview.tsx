import { useTranslation } from '../i18n/TranslationProvider';
import React, { useState, useEffect, useRef } from 'react';
import { Flame, BarChart2, PlayCircle, Cpu, BookMarked, GitFork, Layers, GitCompare, Award, Compass, Search, ArrowUpRight } from 'lucide-react';
import { masterclassCollection } from '../data/masterclassData';
import { textbookChapters } from '../data/chaptersData';
import { SEO } from './SEO';
import { TradingToolId } from './TradingToolsWorkbench';
import { startHero } from './workbenchHero';
import '../styles/study-workbench.css';
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



interface TradingToolsOverviewProps { onSelectTool: (toolId: TradingToolId, customUrl?: string) => void }
export const TradingToolsOverview: React.FC<TradingToolsOverviewProps> = ({onSelectTool}) => {
 const {t,href,message}=useTranslation();
 const [category,setCategory]=useState('all'); const [query,setQuery]=useState(''); const [selected,setSelected]=useState<TradingToolId>('chartlab');
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{const hero=root.current?.querySelector<HTMLElement>('.po3-visual');if(hero)return startHero(hero,t)},[]);
 const tools=WORKBENCH_TOOL_CATALOG.filter(tool=>(category==='all'||tool.category===category)&&[tool.name,tool.desc,...tool.features,...[tool.name,tool.desc,...tool.features].map(t)].join(' ').toLowerCase().includes(query.toLowerCase().trim()));
 const active=tools.find(t=>t.id===selected)||tools[0];
 function open(e:React.MouseEvent<HTMLAnchorElement>,id:TradingToolId,url:string){if(!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&e.button===0){e.preventDefault();onSelectTool(id,url)}}
 return <div className="study-workbench" ref={root}>
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

<section className="hybrid-welcome" aria-labelledby="welcome-heading"><div className="welcome-title"><h1 id="welcome-heading">{t("Workbench & Lab")}</h1></div><div className="welcome-story"><span>{t("Learn it. Observe it. Test it.")}</span><h2>{t("Understand the idea.")}<br/>{t("Put it to work.")}</h2><p>{t("Ten tools for chart practice, concept reference and honest review. New here? Start by observing a chart.")}</p><div className="welcome-actions"><a className="welcome-primary" href={href("/tools/chartlab/")}>{t("Open Chart Laboratory ")}<span aria-hidden="true">↗</span></a><a className="welcome-browse" href="#study-desk">{t("Browse all 10 tools ")}<span aria-hidden="true">↓</span></a></div></div><figure className="welcome-visual po3-visual"><div className="po3-caption"><span>{t("POWER OF THREE")}</span><button type="button" className="po3-pause" aria-label="Pause hero animation">{t("Pause")}</button></div><svg viewBox="0 0 340 192" role="img" aria-labelledby="po3-title po3-desc"><title id="po3-title">{t("Illustrative bullish Power of Three daily candle")}</title><desc id="po3-desc">{t("Price consolidates near the open, dips below it, then expands higher. The candle on the right summarizes the same price path. This is one possible scenario, not a prediction.")}</desc><path className="welcome-grid" d="M12 40H245M12 80H245M12 120H245M12 160H245"/><rect x="16" y="96" width="72" height="22" fill="#55b7ff12"/><path d="M12 108H324" stroke="#aeb5c1" strokeDasharray="3 5"/><text x="15" y="101" className="po3-svg-label">{t("Open")}</text><path className="po3-path" d="M18 108L30 102L43 112L55 104L67 109L80 105L95 124L108 147L120 138L135 114L150 90L165 96L182 64L196 72L211 37L228 49" fill="none" stroke="#55b7ff" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/><circle className="po3-dot" r="4" fill="#55b7ff"/><path d="M262 26V166" stroke="#303238"/><line className="po3-wick" x1="292" x2="292" y1="108" y2="108" stroke="#70bfa6" strokeWidth="2"/><rect className="po3-body" x="281" y="107" width="22" height="2" fill="#70bfa6"/><text x="292" y="184" textAnchor="middle" className="po3-svg-label">{t("Daily candle")}</text></svg><figcaption><span className="po3-phase">{t("01 \u00b7 Accumulation")}</span><span className="po3-note">{t("Illustrative bullish scenario")}</span></figcaption></figure></section>
<section className="terminal-shell" id="study-desk" aria-label="Study desk">
<aside className="terminal-sidebar"><h2>{t("Browse tools")}</h2><p>{t("Filter by purpose")}</p><nav className="category-controls" aria-label="Filter tools">{[['all','All tools'],['execution','Practice'],['reference','Reference'],['performance','Review']].map(([id,label])=><button key={id} onClick={()=>setCategory(id)} aria-pressed={category===id}>{t(label)}</button>)}</nav><div className="side-note"><span>{t("Working with a lesson?")}</span><a href={href("/curriculum/")}>{t("Return to curriculum")}</a></div></aside>
<section className="terminal-directory"><div className="directory-heading"><div><h2>{t("Study desk")}</h2><p>{t("Select a tool to inspect its features.")}</p></div><label className="tool-search"><Search aria-hidden="true"/><input type="search" aria-label="Find a tool" placeholder="Find a tool" value={query} onChange={e=>setQuery(e.target.value)}/></label></div><div className="directory-columns"><span>{t("Tool")}</span><span>{t("Use it for")}</span></div>
{tools.map(tool=><button key={tool.id} className="tool-row directory-item" aria-pressed={active?.id===tool.id} onClick={()=>setSelected(tool.id)}><span className="row-number">{tool.number}</span><span className="row-name"><tool.icon className="tool-icon"/>{t(tool.name)}</span><span className="row-purpose">{t(tool.categoryLabel)}</span><ArrowUpRight className="row-arrow" size={16}/></button>)}
{!tools.length&&<p className="empty">{t("No tools match that search. Try a concept such as FVG or replay.")}</p>}<p className="result-count" role="status">{message("{count} of 10 tools",{count:tools.length})}</p>
</section>
<aside className="terminal-inspector" aria-label="Selected tool">{active&&<><span className="inspector-label">{t("Selected tool")}</span><div className="inspector-symbol"><active.icon className="tool-icon"/></div><h2 aria-live="polite">{t(active.name)}</h2><p className="selected-category">{t(active.categoryLabel)}</p>{active.category==='execution'&&(<div className="preview-art" aria-hidden="true"><svg className="candles" viewBox="0 0 500 200" role="img" aria-label="Illustrative candle shapes, not market data"><path className="grid-line" d="M20 30H480M20 80H480M20 130H480M20 180H480"/><path className="down wick" d="M60 96v70M115 62v80M225 54v78"/><path className="up wick" d="M170 20v95M280 32v63M335 8v70M390 15v70M445 35v90"/><path className="down body" d="M60 112v32M115 80v40M225 72v42"/><path className="up body" d="M170 48v43M280 48v29M335 20v34M390 31v32M445 57v42"/><path className="chart-zone" d="M170 103H390v26H170Z"/><path className="chart-boundary" d="M20 102H470"/></svg></div>)}<p className="selected-description">{t(active.desc)}</p><ul>{active.features.map(f=><li key={t(f)}>{t(f)}</li>)}</ul><a className="inspector-open" href={href(active.url)} onClick={e=>open(e,active.id,active.url)}>{t("Open tool ")}<ArrowUpRight size={16}/></a><small>{t("Open the existing tool to use its exercises and controls.")}</small></>}</aside>
</section>
<nav className="study-all-links" aria-label="All workbench tools">{WORKBENCH_TOOL_CATALOG.map(tool=><a key={tool.id} href={href(tool.url)} onClick={e=>open(e,tool.id,tool.url)}>{t(tool.name)}</a>)}</nav>
</div>
};
