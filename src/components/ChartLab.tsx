import { GuidedMarketDesk } from "./market/GuidedMarketDesk";
import { chartScenarios } from "../data/chartScenarios";
import { getChartScenarioSlug, getChartScenarioUrl } from "../utils/workbenchToolRoutes";
import { useTranslation } from '../i18n/TranslationProvider';
import { StudyReadingNotes } from './StudyReadingNotes';
import { ToolRouteStudy } from './ToolRouteStudy';
export interface ChartLabProps {
  initialScenarioSlug?: string;
  initialStepSlug?: string;
  onNavigateUrl?: (url: string) => void;
}
export function ChartLab({ initialScenarioSlug }: ChartLabProps) {
  const {t,href}=useTranslation();
  return (
    <div className="space-y-6"><ToolRouteStudy family="chartlab" slug={initialScenarioSlug}/><StudyReadingNotes tool="chartlab"/><GuidedMarketDesk
      mode="chartlab"
      studyFocus={
        chartScenarios.find(
          (c) => getChartScenarioSlug(c.id) === initialScenarioSlug,
        )?.title
      }
    /><nav className="rounded-xl border border-ink/15 p-4 sm:p-6 space-y-3" aria-label={t('Chart Lab study briefs')}><h2 className="text-xl font-semibold">{t('Chart Lab study briefs')}</h2><ul className="space-y-3">{chartScenarios.map(scenario=><li key={scenario.id}><a className="text-teal underline underline-offset-4" href={href(getChartScenarioUrl(scenario.id))} aria-current={getChartScenarioSlug(scenario.id)===initialScenarioSlug?'page':undefined}>{t(scenario.title)}</a></li>)}</ul></nav></div>
  );
}
