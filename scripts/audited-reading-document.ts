import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { AuditedRouteDocument } from '../src/components/AuditedRouteDocument';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { localeFromPath } from '../src/i18n/locale';
import { urdu } from '../src/i18n/urdu';
import { t } from '../src/i18n/translate';
import { auditedReadingRoute } from '../src/utils/auditedReadingRoutes';

export function renderAuditedReading(pathname: string, heading: string) {
  const locale = localeFromPath(pathname);
  return renderToStaticMarkup(createElement(TranslationProvider, {locale, catalog:locale === 'ur' ? urdu : {}, children:createElement(AuditedRouteDocument,{pathname,heading:t(heading,locale,urdu)})}));
}

/** Localize the head normally, but render the reading body in its actual language.
 * Translating serialized English can split warnings at different sentence boundaries.
 */
export function replaceAuditedReadingRoot(html: string, pathname: string, heading: string) {
  if (!auditedReadingRoute(pathname)) return html;
  const document = parse(html) as any;
  const find = (n:any):any => n.attrs?.some((a:any)=>a.name==='id'&&a.value==='root') ? n : (n.childNodes || []).map(find).find(Boolean);
  const root = find(document);
  if (!root) throw new Error(`Reading root missing: ${pathname}`);
  root.childNodes = parseFragment(renderAuditedReading(pathname,heading)).childNodes;
  root.childNodes.forEach((node:any)=>node.parentNode=root);
  return serialize(document);
}
