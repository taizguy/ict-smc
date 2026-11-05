import { chartRouteStudies } from './chartRouteStudies';
import { deliveryRouteStudies } from './deliveryRouteStudies';
import { backtestRouteStudies } from './backtestRouteStudies';
import { simulatorRouteStudies } from './simulatorRouteStudies';

export type StudyPair = [string, string];
export type RouteStudy = { heading: StudyPair; instructions: StudyPair; example: StudyPair; assumptions: StudyPair; limitations: StudyPair };
export const toolRouteStudies: Record<string, Record<string, RouteStudy>> = { chartlab: chartRouteStudies, 'delivery-suite': deliveryRouteStudies, backtest: backtestRouteStudies, simulator: simulatorRouteStudies };
export {routeStudyLabels} from './routeStudyLabels';
import {routeStudyLabels} from './routeStudyLabels';
export const toolRouteStudyUrdu = Object.fromEntries([
  ...routeStudyLabels,
  ...Object.values(toolRouteStudies).flatMap(family=>Object.values(family).flatMap(study=>Object.values(study))),
]);
