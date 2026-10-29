import { GuidedMarketDesk } from "./market/GuidedMarketDesk";
import { ToolRouteStudy } from './ToolRouteStudy';
import { SIMULATOR_MODELS } from "../utils/workbenchToolRoutes";
export interface TradeSimulatorProps {
  initialModelSlug?: string;
  onNavigateUrl?: (url: string) => void;
}
export function TradeSimulator({ initialModelSlug }: TradeSimulatorProps) {
  return (
    <div className="space-y-6"><ToolRouteStudy family="simulator" slug={initialModelSlug}/><GuidedMarketDesk
      mode="simulator"
      studyFocus={
        SIMULATOR_MODELS.find((c) => c.slug === initialModelSlug)?.name
      }
    /></div>
  );
}
