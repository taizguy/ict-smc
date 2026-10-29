import { GuidedMarketDesk } from "./market/GuidedMarketDesk";
import { ToolRouteStudy } from './ToolRouteStudy';
import { BACKTEST_STRATEGIES } from "../utils/workbenchToolRoutes";
export interface BacktestLabProps {
  initialStrategySlug?: string;
  onNavigateUrl?: (url: string) => void;
}
export function BacktestLab({ initialStrategySlug }: BacktestLabProps) {
  return (
    <div className="space-y-6"><ToolRouteStudy family="backtest" slug={initialStrategySlug}/><GuidedMarketDesk
      mode="backtest"
      studyFocus={
        BACKTEST_STRATEGIES.find((c) => c.slug === initialStrategySlug)
          ?.shortName
      }
    /></div>
  );
}
