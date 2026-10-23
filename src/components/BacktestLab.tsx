import { GuidedMarketDesk } from "./market/GuidedMarketDesk";
import { BACKTEST_STRATEGIES } from "../utils/workbenchToolRoutes";
export interface BacktestLabProps {
  initialStrategySlug?: string;
  onNavigateUrl?: (url: string) => void;
}
export function BacktestLab({ initialStrategySlug }: BacktestLabProps) {
  return (
    <GuidedMarketDesk
      mode="backtest"
      studyFocus={
        BACKTEST_STRATEGIES.find((c) => c.slug === initialStrategySlug)
          ?.shortName
      }
    />
  );
}
