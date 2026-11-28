import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { SweepHuntContent } from '../src/components/SweepHuntContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { sweepHuntTranslations } from '../src/data/chapters/sweepHuntTranslations';
import { sweepHuntPath } from '../src/data/chapters/sweepHuntLesson';

/** Translate Chapter 19 (ID 1019) Sweep vs Stop Hunt document body before inserting contextual links. */
export function localizeSweepHuntDocument(html: string, pathname: string) {
  if (pathname !== sweepHuntPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('sh-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 19 (ID 1019) Sweep vs Stop Hunt article body missing');
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: { ...sweepHuntTranslations, ...urdu },
      children: createElement(SweepHuntContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
