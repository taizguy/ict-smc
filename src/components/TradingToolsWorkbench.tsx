import {withoutLocale} from '../i18n/locale';
import {PracticeLoopPage} from './practice/PracticeLoopPage';
import {WorkbenchHeader} from './WorkbenchHeader';
import {GlossaryReference} from './GlossaryReference';
import {primaryGlossaryRoute} from '../utils/glossaryReference';
import {chartLabHubMeta} from '../data/chartLabHub';
import {studyForSlug} from '../data/chartLabRemainingContent';
import {masterclassCollectionPage} from '../data/masterclassCategoryPages';
import {MasterclassHub} from './MasterclassHub';
import {MasterclassJournal} from './MasterclassJournal';
import {masterclassJournalForPath} from '../utils/masterclassJournalRoutes';
import { useTranslation } from "../i18n/TranslationProvider";
import { currentDocumentHref } from '../i18n/navigation';
import { masterclassCollection } from '../data/masterclassData';
import { toolStudyGuide } from '../utils/toolStudyGuides';
import { FinancialDisclaimer } from './FinancialDisclaimer';
import { ContextualInternalLinker } from './ContextualInternalLinker';
import {breakerMeta} from '../data/breakerStudy';
import {silverMeta} from '../data/silverBulletStudy';
import React, { useState, useEffect } from 'react';
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
  const { t,locale,href } = useTranslation();
  const [activeTool, setActiveTool] = useState<TradingToolId | 'overview'>(initialTool);
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

  const toolOrder=['masterclass','chartlab','ict_suite','simulator','backtest','journal','graph','concepts','compare','dashboard'];
  tools.sort((a,b)=>toolOrder.indexOf(a.id)-toolOrder.indexOf(b.id));
  // If in Overview mode, render the full Hub Overview
  if (activeTool === 'overview') {
    return (
      <TradingToolsOverview
        onSelectTool={(toolId, customUrl) => handleSelectTool(toolId, customUrl)}
      />
    );
  }

  const collectionPath=documentPath||(typeof window!=='undefined'?window.location.pathname:'/tools/masterclass/');
  if(activeTool==='masterclass'&&!masterclassModuleSlug){const collection=masterclassCollectionPage(collectionPath);if(collection)return <MasterclassHub key={collection.path} path={collection.path}/>;}

  // Drafts are available only in the local editorial preview. Production waits
  // for each edition's source/content/language release checks.
  const journalPath=typeof window==='undefined'?'':window.location.pathname;
  const draftPreview=typeof window!=='undefined'&&!!import.meta.env?.DEV;
  const journal=activeTool==='masterclass'?masterclassJournalForPath(journalPath,draftPreview):undefined;
  if(journal)return <MasterclassJournal lesson={journal}/>;

  const glossaryPath=documentPath || (typeof window!=='undefined'?window.location.pathname:'/tools/glossary/');
  if(activeTool==='concepts'&&primaryGlossaryRoute(glossaryPath))return <GlossaryReference pathname={glossaryPath}/>;

  if(activeTool==='simulator'&&!simulatorModelSlug)return <PracticeLoopPage tool="simulator"/>;
  if(activeTool==='backtest'&&!backtestStrategySlug)return <PracticeLoopPage tool="backtest"/>;
  if(activeTool==='ict_suite'&&withoutLocale(collectionPath)==='/tools/delivery-suite/')return <PracticeLoopPage tool="delivery"/>;
  const currentToolMeta = tools.find(t => t.id === activeTool) || tools[0];

  return (
    <div data-workbench-tool={activeTool} className="wb-suite workbench-pages academy-surface space-y-8 sm:space-y-12 pb-20 text-ink">

      <WorkbenchHeader activeTool={activeTool} heading={activeTool==='chartlab'&&!chartScenarioSlug?chartLabHubMeta.h1[locale==='ur'?1:0]:activeTool==='chartlab'&&studyForSlug(chartScenarioSlug) ? studyForSlug(chartScenarioSlug)!.h1[locale==='ur'?1:0] : activeTool==='chartlab'&&chartScenarioSlug==='nq-silver-bullet-short' ? silverMeta.h1[locale==='ur'?1:0] : activeTool==='chartlab'&&chartScenarioSlug==='eurusd-failed-ob-breaker' ? breakerMeta.h1[locale==='ur'?1:0] : documentHeading || (typeof document === 'undefined' ? undefined : document.querySelector('meta[name="learnsmc-heading"]')?.getAttribute('content')) || t(currentToolMeta.name)}/>

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

      {(() => { if(activeTool==='chartlab')return null; const guide = toolStudyGuide(documentPath || (typeof window === 'undefined' ? '' : window.location.pathname)); return guide ? <details className="workbench-reading-guide space-y-3 text-sm leading-relaxed"><summary className="cursor-pointer py-3">{t(guide.title)}</summary>{guide.paragraphs.map(p => <p key={p}>{t(p)}</p>)}<p><a href="/curriculum/" className="underline">Study the curriculum</a> and <a href="/about/#editorial-policy" className="underline">editorial policy</a>.</p><FinancialDisclaimer /></details> : null; })()}
    </div>
  );
};

export default TradingToolsWorkbench;
