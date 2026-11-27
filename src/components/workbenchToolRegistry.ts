import type { ComponentType } from 'react';
import { withoutLocale } from '../i18n/locale';
import { resolveGlossaryUrl } from '../utils/glossaryRoutes';

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

export type WorkbenchRegistryKey =
  | 'overview'
  | 'masterclass-hub'
  | 'masterclass'
  | 'glossary-ref'
  | 'practice-loop'
  | 'chartlab'
  | 'simulator'
  | 'backtest'
  | 'journal'
  | 'graph'
  | 'concepts'
  | 'compare'
  | 'dashboard'
  | 'ict_suite';

export interface WorkbenchToolRegistryMap {
  overview: ComponentType<{ onSelectTool: (toolId: TradingToolId | 'overview', customUrl?: string) => void }>;
  'masterclass-hub': ComponentType<{ path?: string }>;
  masterclass: {
    MasterclassWorkbench: ComponentType<{
      initialCategory?: string;
      initialModuleSlug?: string;
      onNavigateUrl?: (url: string) => void;
    }>;
    MasterclassJournal: ComponentType<{ lesson: any }>;
    masterclassJournalForPath: (path: string, allowDraft?: boolean) => any;
  };
  'glossary-ref': ComponentType<{ pathname: string }>;
  'practice-loop': ComponentType<{ tool: 'simulator' | 'backtest' | 'delivery' }>;
  chartlab: {
    ChartLab: ComponentType<{
      initialScenarioSlug?: string;
      initialStepSlug?: string;
      onNavigateUrl?: (url: string) => void;
    }>;
    resolveHeading: (chartScenarioSlug: string | undefined, locale: string) => string | undefined;
  };
  simulator: ComponentType<{
    initialModelSlug?: string;
    onNavigateUrl?: (url: string) => void;
  }>;
  backtest: ComponentType<{
    initialStrategySlug?: string;
    onNavigateUrl?: (url: string) => void;
  }>;
  journal: ComponentType<{
    initialSectionSlug?: string;
    onNavigateUrl?: (url: string) => void;
  }>;
  graph: ComponentType<{
    initialViewMode?: 'pipeline' | 'network';
    initialStep?: number;
    initialNodeId?: string;
    onSelectConcept: (conceptId: string, slug?: string) => void;
    onNavigateUrl?: (url: string) => void;
  }>;
  concepts: ComponentType<{
    initialCategory?: string;
    initialConceptId?: string;
    initialSubConceptId?: string;
    onSelectConcept: (conceptId: string, slug?: string) => void;
    onOpenSimulator?: () => void;
  }>;
  compare: ComponentType<{
    initialComparisonSlug?: string;
    onNavigateUrl?: (url: string) => void;
  }>;
  dashboard: ComponentType<{
    initialSubTab?: 'roadmap' | 'quiz';
    initialExamSlug?: string;
    onSelectTab?: (tab: string) => void;
    onNavigateUrl?: (url: string) => void;
  }>;
  ict_suite: ComponentType<{
    initialModuleSlug?: string;
    heading?: string;
    onNavigateUrl?: (url: string) => void;
  }>;
}

const MASTERCLASS_COLLECTION_PATHS = new Set([
  '/tools/masterclass/',
  '/tools/masterclass/core-masterclasses/',
  '/tools/masterclass/pd-arrays/',
  '/tools/masterclass/entry-models/',
  '/tools/masterclass/opening-ranges/',
  '/tools/masterclass/mentorship-frameworks/',
]);

export function isMasterclassCollectionPath(path: string): boolean {
  return MASTERCLASS_COLLECTION_PATHS.has(withoutLocale(path).replace(/\/?$/, '/'));
}

export function isPrimaryGlossaryRoute(path: string): boolean {
  const p = withoutLocale(path).replace(/\/?$/, '/');
  const s = resolveGlossaryUrl(p);
  return p.startsWith('/tools/glossary/') && s.viewMode !== 'sub_concept' && ['root', 'category', 'concept'].includes(s.viewMode);
}

export function resolveWorkbenchRegistryKey(opts: {
  activeTool: TradingToolId | 'overview';
  collectionPath: string;
  glossaryPath: string;
  masterclassModuleSlug?: string;
  simulatorModelSlug?: string;
  backtestStrategySlug?: string;
}): WorkbenchRegistryKey {
  const { activeTool, collectionPath, glossaryPath, masterclassModuleSlug, simulatorModelSlug, backtestStrategySlug } = opts;
  if (activeTool === 'overview') return 'overview';
  if (activeTool === 'masterclass' && !masterclassModuleSlug && isMasterclassCollectionPath(collectionPath)) {
    return 'masterclass-hub';
  }
  if (activeTool === 'concepts' && isPrimaryGlossaryRoute(glossaryPath)) {
    return 'glossary-ref';
  }
  if (activeTool === 'simulator' && !simulatorModelSlug) return 'practice-loop';
  if (activeTool === 'backtest' && !backtestStrategySlug) return 'practice-loop';
  if (activeTool === 'ict_suite' && withoutLocale(collectionPath) === '/tools/delivery-suite/') {
    return 'practice-loop';
  }
  return activeTool;
}

const registry = new Map<WorkbenchRegistryKey, unknown>();
const inflight = new Map<WorkbenchRegistryKey, Promise<unknown>>();

export function registerWorkbenchTool<K extends WorkbenchRegistryKey>(key: K, mod: WorkbenchToolRegistryMap[K]): void {
  registry.set(key, mod);
}

export function getRegisteredWorkbenchTool<K extends WorkbenchRegistryKey>(key: K): WorkbenchToolRegistryMap[K] | undefined {
  return registry.get(key) as WorkbenchToolRegistryMap[K] | undefined;
}

export async function loadWorkbenchTool<K extends WorkbenchRegistryKey>(key: K): Promise<WorkbenchToolRegistryMap[K]> {
  const existing = registry.get(key);
  if (existing) return existing as WorkbenchToolRegistryMap[K];

  const pending = inflight.get(key);
  if (pending) return pending as Promise<WorkbenchToolRegistryMap[K]>;

  const promise = (async (): Promise<unknown> => {
    switch (key) {
      case 'overview': {
        const { TradingToolsOverview } = await import('./TradingToolsOverview');
        registry.set(key, TradingToolsOverview);
        return TradingToolsOverview;
      }
      case 'masterclass-hub': {
        const { MasterclassHub } = await import('./MasterclassHub');
        registry.set(key, MasterclassHub);
        return MasterclassHub;
      }
      case 'masterclass': {
        const [{ MasterclassWorkbench }, { MasterclassJournal }, { masterclassJournalForPath }] = await Promise.all([
          import('./MasterclassWorkbench'),
          import('./MasterclassJournal'),
          import('../utils/masterclassJournalRoutes'),
        ]);
        const mod = { MasterclassWorkbench, MasterclassJournal, masterclassJournalForPath };
        registry.set(key, mod);
        return mod;
      }
      case 'glossary-ref': {
        const { GlossaryReference } = await import('./GlossaryReference');
        registry.set(key, GlossaryReference);
        return GlossaryReference;
      }
      case 'practice-loop': {
        const { PracticeLoopPage } = await import('./practice/PracticeLoopPage');
        registry.set(key, PracticeLoopPage);
        return PracticeLoopPage;
      }
      case 'chartlab': {
        const [{ ChartLab }, { chartLabHubMeta }, { studyForSlug }, { silverMeta }, { breakerMeta }] = await Promise.all([
          import('./ChartLab'),
          import('../data/chartLabHub'),
          import('../data/chartLabRemainingContent'),
          import('../data/silverBulletStudy'),
          import('../data/breakerStudy'),
        ]);
        const mod: WorkbenchToolRegistryMap['chartlab'] = {
          ChartLab,
          resolveHeading: (slug, locale) => {
            const idx = locale === 'ur' ? 1 : 0;
            if (!slug) return chartLabHubMeta.h1[idx];
            const study = studyForSlug(slug);
            if (study) return study.h1[idx];
            if (slug === 'nq-silver-bullet-short') return silverMeta.h1[idx];
            if (slug === 'eurusd-failed-ob-breaker') return breakerMeta.h1[idx];
            return undefined;
          },
        };
        registry.set(key, mod);
        return mod;
      }
      case 'simulator': {
        const { TradeSimulator } = await import('./TradeSimulator');
        registry.set(key, TradeSimulator);
        return TradeSimulator;
      }
      case 'backtest': {
        const { BacktestLab } = await import('./BacktestLab');
        registry.set(key, BacktestLab);
        return BacktestLab;
      }
      case 'journal': {
        const { TradingJournal } = await import('./TradingJournal');
        registry.set(key, TradingJournal);
        return TradingJournal;
      }
      case 'graph': {
        const { KnowledgeGraph } = await import('./KnowledgeGraph');
        registry.set(key, KnowledgeGraph);
        return KnowledgeGraph;
      }
      case 'concepts': {
        const { ConceptExplorer } = await import('./ConceptExplorer');
        registry.set(key, ConceptExplorer);
        return ConceptExplorer;
      }
      case 'compare': {
        const { CompareView } = await import('./CompareView');
        registry.set(key, CompareView);
        return CompareView;
      }
      case 'dashboard': {
        const { MasteryDashboard } = await import('./MasteryDashboard');
        registry.set(key, MasteryDashboard);
        return MasteryDashboard;
      }
      case 'ict_suite': {
        const { InstitutionalToolsSuite } = await import('./InstitutionalToolsSuite');
        registry.set(key, InstitutionalToolsSuite);
        return InstitutionalToolsSuite;
      }
    }
  })().finally(() => {
    inflight.delete(key);
  });

  inflight.set(key, promise);
  return promise as Promise<WorkbenchToolRegistryMap[K]>;
}
