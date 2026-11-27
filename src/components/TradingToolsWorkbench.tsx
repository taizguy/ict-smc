import {withoutLocale} from '../i18n/locale';
import {WorkbenchHeader} from './WorkbenchHeader';
import { useTranslation } from "../i18n/TranslationProvider";
import { currentDocumentHref } from '../i18n/navigation';
import { toolStudyGuide } from '../utils/toolStudyGuides';
import { FinancialDisclaimer } from './FinancialDisclaimer';
import React, { useState, useEffect } from 'react';
import {
  type TradingToolId,
  resolveWorkbenchRegistryKey,
  getRegisteredWorkbenchTool,
  loadWorkbenchTool,
} from './workbenchToolRegistry';

export type { TradingToolId };

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

const TOOL_META: Record<TradingToolId, { slug: string; name: string }> = {
  masterclass: { slug: 'masterclass', name: 'Masterclass Hub' },
  chartlab: { slug: 'chartlab', name: 'Chart Lab' },
  simulator: { slug: 'simulator', name: 'Trade Simulator' },
  backtest: { slug: 'backtest', name: 'Backtest Lab' },
  journal: { slug: 'journal', name: 'Trading Journal' },
  graph: { slug: 'knowledge-graph', name: 'Knowledge Graph' },
  concepts: { slug: 'glossary', name: 'Glossary' },
  compare: { slug: 'compare', name: 'Compare Matrix' },
  dashboard: { slug: 'profile', name: 'Mastery Profile' },
  ict_suite: { slug: 'delivery-suite', name: 'ICT Delivery Suite' },
};

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
  const { t, locale } = useTranslation();
  const [activeTool, setActiveTool] = useState<TradingToolId | 'overview'>(initialTool);
  const [, setLoadTick] = useState(0);

  useEffect(() => {
    if (initialTool !== undefined && initialTool !== activeTool) {
      setActiveTool(initialTool);
    }
  }, [initialTool]);

  const currentWindowPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const collectionPath = documentPath || currentWindowPath || '/tools/masterclass/';
  const glossaryPath = documentPath || currentWindowPath || '/tools/glossary/';
  const registryKey = resolveWorkbenchRegistryKey({
    activeTool,
    collectionPath,
    glossaryPath,
    masterclassModuleSlug,
    simulatorModelSlug,
    backtestStrategySlug,
  });

  useEffect(() => {
    if (getRegisteredWorkbenchTool(registryKey)) return;
    let cancelled = false;
    loadWorkbenchTool(registryKey).then(() => {
      if (!cancelled) setLoadTick(n => n + 1);
    });
    return () => { cancelled = true; };
  }, [registryKey]);

  const handleSelectTool = (toolId: TradingToolId | 'overview', customUrl?: string) => {
    if (onToolChange) { onToolChange(toolId, customUrl); return; }
    const slug = toolId === 'overview' ? '' : (TOOL_META[toolId]?.slug || toolId);
    window.location.assign(currentDocumentHref(customUrl || (slug ? `/tools/${slug}/` : '/tools/')));
  };

  if (registryKey === 'overview') {
    const Overview = getRegisteredWorkbenchTool('overview');
    if (!Overview) return null;
    return <Overview onSelectTool={(toolId, customUrl) => handleSelectTool(toolId, customUrl)} />;
  }

  if (registryKey === 'masterclass-hub') {
    const MasterclassHub = getRegisteredWorkbenchTool('masterclass-hub');
    if (!MasterclassHub) return null;
    const cleanCollection = withoutLocale(collectionPath).replace(/\/?$/, '/');
    return <MasterclassHub key={cleanCollection} path={cleanCollection} />;
  }

  if (registryKey === 'masterclass') {
    const mcMod = getRegisteredWorkbenchTool('masterclass');
    if (!mcMod) return null;
    // Drafts are available only in the local editorial preview. Production waits
    // for each edition's source/content/language release checks.
    const draftPreview = typeof window !== 'undefined' && !!import.meta.env?.DEV;
    const journal = mcMod.masterclassJournalForPath(currentWindowPath, draftPreview);
    if (journal) return <mcMod.MasterclassJournal lesson={journal} />;
  }

  if (registryKey === 'glossary-ref') {
    const GlossaryReference = getRegisteredWorkbenchTool('glossary-ref');
    if (!GlossaryReference) return null;
    return <GlossaryReference pathname={glossaryPath} />;
  }

  if (registryKey === 'practice-loop') {
    const PracticeLoopPage = getRegisteredWorkbenchTool('practice-loop');
    if (!PracticeLoopPage) return null;
    if (activeTool === 'simulator' && !simulatorModelSlug) return <PracticeLoopPage tool="simulator" />;
    if (activeTool === 'backtest' && !backtestStrategySlug) return <PracticeLoopPage tool="backtest" />;
    if (activeTool === 'ict_suite' && withoutLocale(collectionPath) === '/tools/delivery-suite/') return <PracticeLoopPage tool="delivery" />;
  }

  if (activeTool === 'simulator' && simulatorModelSlug) {
    const TradeSimulator = getRegisteredWorkbenchTool('simulator');
    if (!TradeSimulator) return null;
    return <TradeSimulator key={simulatorModelSlug} initialModelSlug={simulatorModelSlug} />;
  }

  if (activeTool === 'ict_suite' && deliveryModuleSlug) {
    const InstitutionalToolsSuite = getRegisteredWorkbenchTool('ict_suite');
    if (!InstitutionalToolsSuite) return null;
    return (
      <InstitutionalToolsSuite
        initialModuleSlug={deliveryModuleSlug}
        heading={documentHeading || (typeof document !== 'undefined' ? document.querySelector('meta[name="learnsmc-heading"]')?.getAttribute('content') || undefined : undefined)}
      />
    );
  }

  const currentToolMeta = TOOL_META[activeTool as TradingToolId] || TOOL_META.masterclass;
  const chartLabMod = activeTool === 'chartlab' ? getRegisteredWorkbenchTool('chartlab') : undefined;
  const resolvedHeading =
    chartLabMod?.resolveHeading(chartScenarioSlug, locale) ||
    documentHeading ||
    (typeof document === 'undefined' ? undefined : document.querySelector('meta[name="learnsmc-heading"]')?.getAttribute('content')) ||
    t(currentToolMeta.name);

  const masterclassMod = activeTool === 'masterclass' ? getRegisteredWorkbenchTool('masterclass') : undefined;
  const TradeSimulatorComp = activeTool === 'simulator' ? getRegisteredWorkbenchTool('simulator') : undefined;
  const BacktestLabComp = activeTool === 'backtest' ? getRegisteredWorkbenchTool('backtest') : undefined;
  const TradingJournalComp = activeTool === 'journal' ? getRegisteredWorkbenchTool('journal') : undefined;
  const KnowledgeGraphComp = activeTool === 'graph' ? getRegisteredWorkbenchTool('graph') : undefined;
  const ConceptExplorerComp = activeTool === 'concepts' ? getRegisteredWorkbenchTool('concepts') : undefined;
  const CompareViewComp = activeTool === 'compare' ? getRegisteredWorkbenchTool('compare') : undefined;
  const MasteryDashboardComp = activeTool === 'dashboard' ? getRegisteredWorkbenchTool('dashboard') : undefined;
  const InstitutionalToolsSuiteComp = activeTool === 'ict_suite' ? getRegisteredWorkbenchTool('ict_suite') : undefined;

  return (
    <div data-workbench-tool={activeTool} className="wb-suite workbench-pages academy-surface space-y-8 sm:space-y-12 pb-20 text-ink">

      <WorkbenchHeader activeTool={activeTool} heading={resolvedHeading} />

      {/* Render Active Tool Content */}
      <div className="workbench-content">
        <div className="predikt-workbench-body">
          {activeTool === 'masterclass' && masterclassMod && (
            <masterclassMod.MasterclassWorkbench
              initialCategory={masterclassCategory}
              initialModuleSlug={masterclassModuleSlug}
              onNavigateUrl={(url) => handleSelectTool('masterclass', url)}
            />
          )}
          {activeTool === 'chartlab' && chartLabMod && (
            <chartLabMod.ChartLab
              initialScenarioSlug={chartScenarioSlug}
              initialStepSlug={chartStepSlug}
              onNavigateUrl={(url) => handleSelectTool('chartlab', url)}
            />
          )}
          {activeTool === 'simulator' && TradeSimulatorComp && (
            <TradeSimulatorComp
              initialModelSlug={simulatorModelSlug}
              onNavigateUrl={(url) => handleSelectTool('simulator', url)}
            />
          )}
          {activeTool === 'backtest' && BacktestLabComp && (
            <BacktestLabComp
              initialStrategySlug={backtestStrategySlug}
              onNavigateUrl={(url) => handleSelectTool('backtest', url)}
            />
          )}
          {activeTool === 'journal' && TradingJournalComp && (
            <TradingJournalComp
              initialSectionSlug={journalSectionSlug}
              onNavigateUrl={(url) => handleSelectTool('journal', url)}
            />
          )}
          {activeTool === 'graph' && KnowledgeGraphComp && (
            <KnowledgeGraphComp
              initialViewMode={graphViewMode}
              initialStep={graphStep}
              initialNodeId={graphNodeId}
              onSelectConcept={onSelectConcept || (() => {})}
              onNavigateUrl={(url) => handleSelectTool('graph', url)}
            />
          )}
          {activeTool === 'concepts' && ConceptExplorerComp && (
            <ConceptExplorerComp
              initialCategory={glossaryCategory}
              initialConceptId={glossaryConceptId}
              initialSubConceptId={glossarySubConceptId}
              onSelectConcept={onSelectConcept || (() => {})}
              onOpenSimulator={() => handleSelectTool('simulator', '/tools/simulator/')}
            />
          )}
          {activeTool === 'compare' && CompareViewComp && (
            <CompareViewComp
              initialComparisonSlug={comparisonSlug}
              onNavigateUrl={(url) => handleSelectTool('compare', url)}
            />
          )}
          {activeTool === 'dashboard' && MasteryDashboardComp && (
            <MasteryDashboardComp
              initialSubTab={profileSubTab}
              initialExamSlug={profileExamSlug}
              onSelectTab={(tab) => handleSelectTool(tab as any)}
              onNavigateUrl={(url) => handleSelectTool('dashboard', url)}
            />
          )}
          {activeTool === 'ict_suite' && InstitutionalToolsSuiteComp && (
            <InstitutionalToolsSuiteComp
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
