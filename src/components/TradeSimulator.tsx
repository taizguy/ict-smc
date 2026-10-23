import { GuidedMarketDesk } from "./market/GuidedMarketDesk";
import { SIMULATOR_MODELS } from "../utils/workbenchToolRoutes";
export interface TradeSimulatorProps {
  initialModelSlug?: string;
  onNavigateUrl?: (url: string) => void;
}
export function TradeSimulator({ initialModelSlug }: TradeSimulatorProps) {
  return (
    <GuidedMarketDesk
      mode="simulator"
      studyFocus={
        SIMULATOR_MODELS.find((c) => c.slug === initialModelSlug)?.name
      }
    />
  );
}
