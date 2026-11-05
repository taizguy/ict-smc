import {useTranslation} from '../../i18n/TranslationProvider';
import {chartLabHubMeta} from '../../data/chartLabHub';
import {WorkbenchHeader} from '../WorkbenchHeader';
import {ChartLabHub} from './ChartLabHub';
/** Same published hub anatomy without importing the other Workbench tools. */
export function ChartLabHubPage(){const {locale}=useTranslation();return <div data-workbench-tool="chartlab" className="wb-suite workbench-pages academy-surface space-y-8 sm:space-y-12 pb-20 text-ink"><WorkbenchHeader activeTool="chartlab" heading={chartLabHubMeta.h1[locale==='ur'?1:0]}/><div className="workbench-content"><div className="predikt-workbench-body"><div className="chartlab-analysis"><ChartLabHub/></div></div></div></div>;}
