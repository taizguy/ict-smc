import { registerWorkbenchTool } from '../src/components/workbenchToolRegistry';
import { TradingToolsOverview } from '../src/components/TradingToolsOverview';
import { MasterclassHub } from '../src/components/MasterclassHub';
import { MasterclassWorkbench } from '../src/components/MasterclassWorkbench';
import { MasterclassJournal } from '../src/components/MasterclassJournal';
import { masterclassJournalForPath } from '../src/utils/masterclassJournalRoutes';
import { GlossaryReference } from '../src/components/GlossaryReference';
import { PracticeLoopPage } from '../src/components/practice/PracticeLoopPage';
import { ChartLab } from '../src/components/ChartLab';
import { chartLabHubMeta } from '../src/data/chartLabHub';
import { studyForSlug } from '../src/data/chartLabRemainingContent';
import { silverMeta } from '../src/data/silverBulletStudy';
import { breakerMeta } from '../src/data/breakerStudy';
import { TradeSimulator } from '../src/components/TradeSimulator';
import { BacktestLab } from '../src/components/BacktestLab';
import { TradingJournal } from '../src/components/TradingJournal';
import { KnowledgeGraph } from '../src/components/KnowledgeGraph';
import { ConceptExplorer } from '../src/components/ConceptExplorer';
import { CompareView } from '../src/components/CompareView';
import { MasteryDashboard } from '../src/components/MasteryDashboard';
import { InstitutionalToolsSuite } from '../src/components/InstitutionalToolsSuite';

registerWorkbenchTool('overview', TradingToolsOverview);
registerWorkbenchTool('masterclass-hub', MasterclassHub);
registerWorkbenchTool('masterclass', {
  MasterclassWorkbench,
  MasterclassJournal,
  masterclassJournalForPath,
});
registerWorkbenchTool('glossary-ref', GlossaryReference);
registerWorkbenchTool('practice-loop', PracticeLoopPage);
registerWorkbenchTool('chartlab', {
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
});
registerWorkbenchTool('simulator', TradeSimulator);
registerWorkbenchTool('backtest', BacktestLab);
registerWorkbenchTool('journal', TradingJournal);
registerWorkbenchTool('graph', KnowledgeGraph);
registerWorkbenchTool('concepts', ConceptExplorer);
registerWorkbenchTool('compare', CompareView);
registerWorkbenchTool('dashboard', MasteryDashboard);
registerWorkbenchTool('ict_suite', InstitutionalToolsSuite);
