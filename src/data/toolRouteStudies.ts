import { chartRouteStudies } from './chartRouteStudies';
import { deliveryRouteStudies } from './deliveryRouteStudies';

export type StudyPair = [string, string];
export type RouteStudy = { heading: StudyPair; instructions: StudyPair; example: StudyPair; assumptions: StudyPair; limitations: StudyPair };
export const toolRouteStudies: Record<string, Record<string, RouteStudy>> = { chartlab: chartRouteStudies, 'delivery-suite': deliveryRouteStudies };
export const routeStudyLabels = [
  ['How to use this study brief', 'اس مطالعے کی رہنمائی کیسے استعمال کریں'],
  ['Worked example and contrasting outcome', 'حل شدہ مثال اور مختلف نتیجہ'],
  ['Assumptions to record first', 'پہلے لکھنے والے مفروضے'],
  ['What this page does not test', 'یہ صفحہ کیا نہیں جانچتا'],
] as StudyPair[];
export const toolRouteStudyUrdu = Object.fromEntries([
  ...routeStudyLabels,
  ...Object.values(toolRouteStudies).flatMap(family=>Object.values(family).flatMap(study=>Object.values(study))),
]);
