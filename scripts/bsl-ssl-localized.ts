import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { BslSslContent } from '../src/components/BslSslContent';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { bslSslTranslations } from '../src/data/chapters/bslSslTranslations';
import { bslSslPath } from '../src/data/chapters/bslSslLesson';

/** Translate Chapter 17 (ID 1017) BSL/SSL document body before inserting contextual links. */
export function localizeBslSslDocument(html: string, pathname: string) {
  if (pathname !== bslSslPath) return html;
  const doc = parse(html) as any;
  const find = (n: any): any =>
    n.attrs?.some((a: any) => a.name === 'class' && a.value.split(' ').includes('bsl-document'))
      ? n
      : (n.childNodes || []).map(find).find(Boolean);
  const old = find(doc);
  if (!old) throw new Error('Chapter 17 (ID 1017) BSL/SSL article body missing');
  const markup = renderToStaticMarkup(
    createElement(TranslationProvider, {
      locale: 'ur',
      catalog: { ...bslSslTranslations, ...urdu },
      children: createElement(BslSslContent, { staticOnly: true }),
    }),
  );
  const replacement = (parseFragment(markup) as any).childNodes[0];
  replacement.attrs.push({ name: 'data-native-locale', value: 'ur' });
  const parent = old.parentNode;
  replacement.parentNode = parent;
  parent.childNodes[parent.childNodes.indexOf(old)] = replacement;
  return serialize(doc);
}
