import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { BreadButterLessonContent } from '../src/components/BreadButterLessonContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { breadButterTranslations } from '../src/data/chapters/breadButterTranslations';
import { breadButterPath } from '../src/data/chapters/breadButterLesson';

/** Translate Chapter 70 (ID 45) Bread-and-Butter Setups document body into native Urdu. */
export function localizeBreadButterDocument(html: string, pathname: string) {
  if (pathname !== breadButterPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('bb70-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 70 (ID 45) Bread-and-Butter article body missing');
  const mergedCatalog = { ...breadButterTranslations, ...urdu };
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: mergedCatalog,
      children: createElement(BreadButterLessonContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
