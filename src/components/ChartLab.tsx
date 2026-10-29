import { GuidedMarketDesk } from "./market/GuidedMarketDesk";
import { chartScenarios } from "../data/chartScenarios";
import { getChartScenarioSlug } from "../utils/workbenchToolRoutes";
import { StudyReadingNotes } from './StudyReadingNotes';
import { ToolRouteStudy } from './ToolRouteStudy';
export interface ChartLabProps {
  initialScenarioSlug?: string;
  initialStepSlug?: string;
  onNavigateUrl?: (url: string) => void;
}
export function ChartLab({ initialScenarioSlug }: ChartLabProps) {
  return (
    <div className="space-y-6"><ToolRouteStudy family="chartlab" slug={initialScenarioSlug}/><StudyReadingNotes tool="chartlab"/><GuidedMarketDesk
      mode="chartlab"
      studyFocus={
        chartScenarios.find(
          (c) => getChartScenarioSlug(c.id) === initialScenarioSlug,
        )?.title
      }
    /></div>
  );
}
