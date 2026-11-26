import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { PdArrayContent } from '../src/components/PdArrayContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { pdArrayTranslations } from '../src/data/chapters/pdArrayTranslations';
import { pdArrayPath } from '../src/data/chapters/pdArrayLesson';

/** Translate Chapter 33 (ID 59) PD Array Matrix document body before inserting contextual links. */
export function localizePdArrayDocument(html: string, pathname: string) {
  if (pathname !== pdArrayPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('pd-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 33 (ID 59) PD Array article body missing');
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: { ...urdu, ...pdArrayTranslations },
      children: createElement(PdArrayContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
