import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { EqhEqlContent } from '../src/components/EqhEqlContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { eqhEqlTranslations } from '../src/data/chapters/eqhEqlTranslations';
import { eqhEqlPath } from '../src/data/chapters/eqhEqlLesson';

/** Translate Chapter 18 (ID 1018) EQH/EQL document body before inserting contextual links. */
export function localizeEqhEqlDocument(html: string, pathname: string) {
  if (pathname !== eqhEqlPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('eq-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 18 (ID 1018) EQH/EQL article body missing');
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: { ...eqhEqlTranslations, ...urdu },
      children: createElement(EqhEqlContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
