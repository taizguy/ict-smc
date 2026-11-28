import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { HtfLiquidityContent } from '../src/components/HtfLiquidityContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { htfLiquidityTranslations } from '../src/data/chapters/htfLiquidityTranslations';
import { htfLiquidityPath } from '../src/data/chapters/htfLiquidityLesson';

/** Translate Chapter 24 (ID 1024) Higher-Timeframe Liquidity Maps document body before inserting contextual links. */
export function localizeHtfLiquidityDocument(html: string, pathname: string) {
  if (pathname !== htfLiquidityPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('hlm-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 24 (ID 1024) HTF Liquidity Maps article body missing');
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: { ...urdu, ...htfLiquidityTranslations },
      children: createElement(HtfLiquidityContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
