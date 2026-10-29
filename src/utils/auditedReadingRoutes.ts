import { withoutLocale } from '../i18n/locale';

/** Only routes whose actual reading/view components are shared with prerendering. */
export function auditedReadingRoute(pathname: string) {
  const path = withoutLocale(pathname).replace(/\/?$/, '/');
  if (/^\/tools\/chartlab\/(?:[^/]+\/)?$/.test(path)) return 'chartlab';
  if (path === '/tools/glossary/imbalances/fair-value-gap/') return 'fvg-glossary';
  if (path === '/tools/delivery-suite/ote-calculator/') return 'ote';
  if (/^\/masood\/lectures\/[^/]+\/$/.test(path)) return 'masood';
  return null;
}
