import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { SuspensionReaperContent } from '../src/components/SuspensionReaperContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { suspensionReaperTranslations } from '../src/data/chapters/suspensionReaperTranslations';
import { suspensionReaperPath } from '../src/data/chapters/suspensionReaperLesson';

/** Translate Chapter 32 (ID 55) Suspension Block & Reaper FVG document body before inserting contextual links. */
export function localizeSuspensionReaperDocument(html: string, pathname: string) {
  if (pathname !== suspensionReaperPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('sr-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 32 (ID 55) Suspension & Reaper article body missing');
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: { ...urdu, ...suspensionReaperTranslations },
      children: createElement(SuspensionReaperContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
