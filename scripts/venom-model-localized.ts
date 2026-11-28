import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { VenomLessonContent } from '../src/components/VenomLessonContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { venomModelTranslations } from '../src/data/chapters/venomModelTranslations';
import { venomModelPath } from '../src/data/chapters/venomModelLesson';

/** Translate Chapter 67 (ID 53) Venom Model document body into native Urdu. */
export function localizeVenomModelDocument(html: string, pathname: string) {
  if (pathname !== venomModelPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('vm-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 67 (ID 53) Venom Model article body missing');
  const mergedCatalog = { ...venomModelTranslations, ...urdu };
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: mergedCatalog,
      children: createElement(VenomLessonContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
