import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { LiquidityRunContent } from '../src/components/LiquidityRunContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { liquidityRunTranslations } from '../src/data/chapters/liquidityRunTranslations';
import { liquidityRunPath } from '../src/data/chapters/liquidityRunLesson';

/** Translate Chapter 20 (ID 18) Liquidity Engineering & Runs document body before inserting contextual links. */
export function localizeLiquidityRunDocument(html: string, pathname: string) {
  if (pathname !== liquidityRunPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('lr-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 20 (ID 18) Liquidity Run article body missing');
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: { ...liquidityRunTranslations, ...urdu },
      children: createElement(LiquidityRunContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
