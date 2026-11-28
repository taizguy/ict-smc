import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { BreakerBlockContent } from '../src/components/BreakerBlockContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { breakerBlockTranslations } from '../src/data/chapters/breakerBlockTranslations';
import { breakerBlockPath } from '../src/data/chapters/breakerBlockLesson';

/** Translate Chapter 30 (ID 16) Breaker Block document body while preserving baseline delivery-edition Urdu verbatim. */
export function localizeBreakerBlockDocument(html: string, pathname: string) {
  if (pathname !== breakerBlockPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('bb-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 30 (ID 16) Breaker Block article body missing');
  const mergedCatalog = { ...breakerBlockTranslations, ...urdu };
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: mergedCatalog,
      children: createElement(BreakerBlockContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
