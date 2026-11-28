import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { OrderBlockLessonContent } from '../src/components/OrderBlockLessonContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { orderBlockTranslations } from '../src/data/chapters/orderBlockTranslations';
import { orderBlockPath } from '../src/data/chapters/orderBlockLesson';

/** Translate Chapter 29 (ID 15) Order Block document body while preserving baseline delivery-edition Urdu verbatim. */
export function localizeOrderBlockDocument(html: string, pathname: string) {
  if (pathname !== orderBlockPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('ob-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 29 (ID 15) Order Block article body missing');
  const mergedCatalog = { ...orderBlockTranslations, ...urdu };
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: mergedCatalog,
      children: createElement(OrderBlockLessonContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
