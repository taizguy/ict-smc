import { GuidedMarketDesk } from "./market/GuidedMarketDesk";
import { chartScenarios } from "../data/chartScenarios";
import { getChartScenarioSlug } from "../utils/workbenchToolRoutes";
import { StudyReadingNotes } from './StudyReadingNotes';
export interface ChartLabProps {
  initialScenarioSlug?: string;
  initialStepSlug?: string;
  onNavigateUrl?: (url: string) => void;
}
export function ChartLab({ initialScenarioSlug }: ChartLabProps) {
  return (
    <div className="space-y-6"><StudyReadingNotes tool="chartlab"/><GuidedMarketDesk
      mode="chartlab"
      studyFocus={
        chartScenarios.find(
          (c) => getChartScenarioSlug(c.id) === initialScenarioSlug,
        )?.title
      }
    /></div>
  );
}
