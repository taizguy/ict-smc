import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { TurtleSoupContent } from '../src/components/TurtleSoupContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { turtleSoupTranslations } from '../src/data/chapters/turtleSoupTranslations';
import { turtleSoupPath } from '../src/data/chapters/turtleSoupLesson';

/** Translate Chapter 22 (ID 60) Turtle Soup document body before inserting contextual links. */
export function localizeTurtleSoupDocument(html: string, pathname: string) {
  if (pathname !== turtleSoupPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('ts-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 22 (ID 60) Turtle Soup article body missing');
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: { ...turtleSoupTranslations, ...urdu },
      children: createElement(TurtleSoupContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
