import {MasterclassHub} from './MasterclassHub';
import {MasterclassJournal} from './MasterclassJournal';
import {masterclassJournalForPath} from '../utils/masterclassJournalRoutes';
import { useTranslation } from "../i18n/TranslationProvider";
import { currentDocumentHref } from '../i18n/navigation';
import { masterclassCollection } from '../data/masterclassData';
import { toolStudyGuide } from '../utils/toolStudyGuides';
import { FinancialDisclaimer } from './FinancialDisclaimer';
import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart2,
  PlayCircle,
  Cpu,
  BookMarked,
  GitFork,
  Layers,
  GitCompare,
  Award,
  Wrench,
  Flame,
  Compass,
  LayoutGrid,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import { ChartLab } from './ChartLab';
import { TradeSimulator } from './TradeSimulator';
import { BacktestLab } from './BacktestLab';
import { TradingJournal } from './TradingJournal';
import { KnowledgeGraph } from './KnowledgeGraph';
import { ConceptExplorer } from './ConceptExplorer';
import { CompareView } from './CompareView';
import { MasteryDashboard } from './MasteryDashboard';
import { MasterclassWorkbench } from './MasterclassWorkbench';
import { InstitutionalToolsSuite } from './InstitutionalToolsSuite';
import { TradingToolsOverview } from './TradingToolsOverview';
import { ScrollReveal } from './ScrollReveal';
import { SEO } from './SEO';

export type TradingToolId =
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

export interface TradingToolsWorkbenchProps {
  documentPath?: string;
  documentHeading?: string;
  initialTool?: TradingToolId | 'overview';
  onToolChange?: (tool: TradingToolId | 'overview', customUrl?: string) => void;
  onSelectConcept?: (conceptId: string, slug?: string) => void;
  // Glossary
  glossaryCategory?: string;
  glossaryConceptId?: string;
  glossarySubConceptId?: string;
  // Masterclass
  masterclassCategory?: string;
  masterclassModuleSlug?: string;
  // ChartLab
  chartScenarioSlug?: string;
  chartStepSlug?: string;
  // Simulator
  simulatorModelSlug?: string;
  // Backtest
  backtestStrategySlug?: string;
  // Journal
  journalSectionSlug?: string;
  // Knowledge Graph
  graphViewMode?: 'pipeline' | 'network';
  graphStep?: number;
  graphNodeId?: string;
  // Compare
  comparisonSlug?: string;
  // Profile
  profileSubTab?: 'roadmap' | 'quiz';
  profileExamSlug?: string;
  // Delivery Suite
  deliveryModuleSlug?: string;
}

export const TradingToolsWorkbench: React.FC<TradingToolsWorkbenchProps> = ({
  documentPath,
  documentHeading,
  initialTool = 'overview',
  onToolChange,
  onSelectConcept,
  glossaryCategory,
  glossaryConceptId,
  glossarySubConceptId,
  masterclassCategory,
  masterclassModuleSlug,
  chartScenarioSlug,
  chartStepSlug,
  simulatorModelSlug,
  backtestStrategySlug,
  journalSectionSlug,
  graphViewMode,
  graphStep,
  graphNodeId,
  comparisonSlug,
  profileSubTab,
  profileExamSlug,
  deliveryModuleSlug
}) => {
  const { t } = useTranslation();
  const [activeTool, setActiveTool] = useState<TradingToolId | 'overview'>(initialTool);
  const toolSwitcher = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (toolSwitcher.current?.open && !toolSwitcher.current.contains(event.target as Node)) toolSwitcher.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !toolSwitcher.current?.open) return;
      toolSwitcher.current.open = false;
      toolSwitcher.current.querySelector('summary')?.focus();
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, []);

  useEffect(() => {
    if (initialTool !== undefined && initialTool !== activeTool) {
      setActiveTool(initialTool);
    }
  }, [initialTool]);

  const handleSelectTool = (toolId: TradingToolId | 'overview', customUrl?: string) => {
    if (onToolChange) { onToolChange(toolId, customUrl); return; }
    window.location.assign(currentDocumentHref(customUrl || `/tools/${tools.find(t => t.id === toolId)?.slug || toolId}/`));
  };

  const tools = [
    {
      id: 'masterclass' as const,
      slug: 'masterclass',
      name: 'Masterclass Hub',
      badge: `${masterclassCollection.length} Lessons`,
      desc: 'Model definitions, PD arrays and reference lessons',
      icon: Flame
    },
    {
      id: 'chartlab' as const,
      slug: 'chartlab',
      name: 'Chart Lab',
      badge: 'Trading Floor',
      desc: 'Find sweeps, displacement and FVGs with visual hints',
      icon: BarChart2
    },
    {
      id: 'simulator' as const,
      slug: 'simulator',
      name: 'Trade Simulator',
      badge: 'Execution Room',
      desc: 'Lock a plan, reveal candles and review the outcome',
      icon: PlayCircle
    },
    {
      id: 'backtest' as const,
      slug: 'backtest',
      name: 'Backtest Lab',
      badge: 'Research Lab',
      desc: 'Scan candle data, compare samples and inspect every trade',
      icon: Cpu
    },
    {
      id: 'journal' as const,
      slug: 'journal',
      name: 'Trading Journal',
      badge: "Trader's Log",
      desc: '7-point institutional trade audit and rule validation',
      icon: BookMarked
    },
    {
      id: 'graph' as const,
      slug: 'knowledge-graph',
      name: 'Knowledge Graph',
      badge: 'Concept Matrix',
      desc: 'Interactive 3D tree connecting ICT and smart money concepts',
      icon: GitFork
    },
    {
      id: 'concepts' as const,
      slug: 'glossary',
      name: 'Glossary',
      badge: 'Encyclopedia',
      desc: 'Searchable glossary of ICT mechanics, definitions, and diagrams',
      icon: Layers
    },
    {
      id: 'compare' as const,
      slug: 'compare',
      name: 'Compare Matrix',
      badge: 'Side-by-Side',
      desc: 'Side-by-side contrast of overlapping or misunderstood concepts',
      icon: GitCompare
    },
    {
      id: 'dashboard' as const,
      slug: 'profile',
      name: 'Mastery Profile',
      badge: 'Diagnostics',
      desc: 'Device-local lesson completion and practice quizzes',
      icon: Award
    },
    {
      id: 'ict_suite' as const,
      slug: 'delivery-suite',
      name: 'ICT Delivery Suite',
      badge: 'Tools & Macros',
      desc: 'Independent retracement calculator, range extensions, New York clock and study checklist',
      icon: Compass
    }
  ];

  // If in Overview mode, render the full Hub Overview
  if (activeTool === 'overview') {
    return (
      <TradingToolsOverview
        onSelectTool={(toolId, customUrl) => handleSelectTool(toolId, customUrl)}
      />
    );
  }

  if(activeTool==='masterclass'&&!masterclassModuleSlug&&(!masterclassCategory||masterclassCategory==='all')) return <MasterclassHub/>;

  // Drafts are available only in the local editorial preview. Production waits
  // for each edition's source/content/language release checks.
  const journalPath=typeof window==='undefined'?'':window.location.pathname;
  const draftPreview=import.meta.env.DEV&&typeof window!=='undefined'&&new URLSearchParams(window.location.search).get('journal')==='1';
  const journal=activeTool==='masterclass'?masterclassJournalForPath(journalPath,draftPreview):undefined;
  if(journal)return <MasterclassJournal lesson={journal}/>;

  const currentToolMeta = tools.find(t => t.id === activeTool) || tools[0];

  return (
    <div data-workbench-tool={activeTool} className="wb-suite workbench-pages academy-surface space-y-8 sm:space-y-12 pb-20 text-ink">

      <header className="workbench-header rounded-2xl border border-ink/10 bg-surface p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between gap-4 text-sm">
          <a href="/tools/" className="underline text-teal">All tools</a>
          <details ref={toolSwitcher} className="workbench-switcher relative">
            <summary className="cursor-pointer rounded-lg border border-ink/20 px-3 py-2">{t("Switch tool")}<ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" /></summary>
            <nav aria-label={t("Switch tool")} className="absolute end-0 top-full mt-2 z-30 flex flex-col gap-2 w-64 max-w-[80vw] max-h-[65vh] overflow-y-auto rounded-xl border border-ink/20 bg-surface p-3 shadow-2xl">
              {tools.map(tool => <a key={tool.id} href={`/tools/${tool.slug}/`} aria-current={activeTool === tool.id ? 'page' : undefined} className="rounded-lg border border-ink/15 px-3 py-2 text-sm hover:bg-ink/10">{tool.name}</a>)}
            </nav>
          </details>
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{documentHeading || (typeof document === 'undefined' ? undefined : document.querySelector('meta[name="learnsmc-heading"]')?.getAttribute('content')) || t(currentToolMeta.name)}</h1>
      </header>

      {/* Render Active Tool Content */}
      <div className="workbench-content">
        <div className="predikt-workbench-body">
          {activeTool === 'masterclass' && (
            <MasterclassWorkbench
              initialCategory={masterclassCategory}
              initialModuleSlug={masterclassModuleSlug}
              onNavigateUrl={(url) => handleSelectTool('masterclass', url)}
            />
          )}
          {activeTool === 'chartlab' && (
            <ChartLab
              initialScenarioSlug={chartScenarioSlug}
              initialStepSlug={chartStepSlug}
              onNavigateUrl={(url) => handleSelectTool('chartlab', url)}
            />
          )}
          {activeTool === 'simulator' && (
            <TradeSimulator
              initialModelSlug={simulatorModelSlug}
              onNavigateUrl={(url) => handleSelectTool('simulator', url)}
            />
          )}
          {activeTool === 'backtest' && (
            <BacktestLab
              initialStrategySlug={backtestStrategySlug}
              onNavigateUrl={(url) => handleSelectTool('backtest', url)}
            />
          )}
          {activeTool === 'journal' && (
            <TradingJournal
              initialSectionSlug={journalSectionSlug}
              onNavigateUrl={(url) => handleSelectTool('journal', url)}
            />
          )}
          {activeTool === 'graph' && (
            <KnowledgeGraph
              initialViewMode={graphViewMode}
              initialStep={graphStep}
              initialNodeId={graphNodeId}
              onSelectConcept={onSelectConcept || (() => {})}
              onNavigateUrl={(url) => handleSelectTool('graph', url)}
            />
          )}
          {activeTool === 'concepts' && (
            <ConceptExplorer
              initialCategory={glossaryCategory}
              initialConceptId={glossaryConceptId}
              initialSubConceptId={glossarySubConceptId}
              onSelectConcept={onSelectConcept || (() => {})}
              onOpenSimulator={() => handleSelectTool('simulator', '/tools/simulator/')}
            />
          )}
          {activeTool === 'compare' && (
            <CompareView
              initialComparisonSlug={comparisonSlug}
              onNavigateUrl={(url) => handleSelectTool('compare', url)}
            />
          )}
          {activeTool === 'dashboard' && (
            <MasteryDashboard
              initialSubTab={profileSubTab}
              initialExamSlug={profileExamSlug}
              onSelectTab={(tab) => handleSelectTool(tab as any)}
              onNavigateUrl={(url) => handleSelectTool('dashboard', url)}
            />
          )}
          {activeTool === 'ict_suite' && (
            <InstitutionalToolsSuite
              initialModuleSlug={deliveryModuleSlug}
              onNavigateUrl={(url) => handleSelectTool('ict_suite', url)}
            />
          )}
        </div>
      </div>

      {(() => { const guide = toolStudyGuide(documentPath || (typeof window === 'undefined' ? '' : window.location.pathname)); return guide ? <details className="space-y-3 text-sm leading-relaxed"><summary className="cursor-pointer py-3">{t(guide.title)}</summary>{guide.paragraphs.map(p => <p key={p}>{t(p)}</p>)}<p><a href="/curriculum/" className="underline">Study the curriculum</a> and <a href="/about/#editorial-policy" className="underline">editorial policy</a>.</p><FinancialDisclaimer /></details> : null; })()}
    </div>
  );
};

export default TradingToolsWorkbench;
