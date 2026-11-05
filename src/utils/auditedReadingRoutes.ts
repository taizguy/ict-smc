import {glossaryPrimaryPaths} from './glossaryPrimaryPaths';
import { withoutLocale } from '../i18n/locale';
import {legacyPracticeMetadata} from '../data/legacyPracticeMetadata';

/** Only routes whose actual reading/view components are shared with prerendering. */
export function auditedReadingRoute(pathname: string) {
  const path = withoutLocale(pathname).replace(/\/?$/, '/');
  if(legacyPracticeMetadata[path])return 'legacy-practice';
  if (/^\/tools\/chartlab\/(?:[^/]+\/)?$/.test(path)) return 'chartlab';
  if (glossaryPrimaryPaths.has(path)) return 'glossary';
  if (['/tools/delivery-suite/','/tools/simulator/','/tools/backtest/'].includes(path)) return 'practice';
  if (path === '/tools/delivery-suite/ote-calculator/') return 'ote';
  if (/^\/tools\/delivery-suite\/(macro-clock|judas-planner|learning-path)\/$/.test(path)) return 'delivery-module';
  if (/^\/masood\/lectures\/[^/]+\/$/.test(path)) return 'masood';
  return null;
}
