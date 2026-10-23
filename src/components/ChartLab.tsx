import { GuidedMarketDesk } from "./market/GuidedMarketDesk";
import { chartScenarios } from "../data/chartScenarios";
import { getChartScenarioSlug } from "../utils/workbenchToolRoutes";
export interface ChartLabProps {
  initialScenarioSlug?: string;
  initialStepSlug?: string;
  onNavigateUrl?: (url: string) => void;
}
export function ChartLab({ initialScenarioSlug }: ChartLabProps) {
  return (
    <GuidedMarketDesk
      mode="chartlab"
      studyFocus={
        chartScenarios.find(
          (c) => getChartScenarioSlug(c.id) === initialScenarioSlug,
        )?.title
      }
    />
  );
}
