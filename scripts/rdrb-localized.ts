import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { RdrbContent } from '../src/components/RdrbContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { rdrbTranslations } from '../src/data/chapters/rdrbTranslations';
import { rdrbPath } from '../src/data/chapters/rdrbLesson';

/** Translate Chapter 35 (ID 56) RDRB / BPR / Enigma document body before inserting contextual links. */
export function localizeRdrbDocument(html: string, pathname: string) {
  if (pathname !== rdrbPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('rdrb-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 35 (ID 56) RDRB article body missing');
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: { ...urdu, ...rdrbTranslations },
      children: createElement(RdrbContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
