import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { DolContent } from '../src/components/DolContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { drawOnLiquidityTranslations } from '../src/data/chapters/drawOnLiquidityTranslations';
import { drawOnLiquidityPath } from '../src/data/chapters/drawOnLiquidityLesson';

/** Translate Chapter 23 (ID 1023) Draw on Liquidity document body before inserting contextual links. */
export function localizeDolDocument(html: string, pathname: string) {
  if (pathname !== drawOnLiquidityPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('dol-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 23 (ID 1023) Draw on Liquidity article body missing');
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: { ...urdu, ...drawOnLiquidityTranslations },
      children: createElement(DolContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
