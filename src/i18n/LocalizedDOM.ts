import { createElement, useContext, Fragment, isValidElement, type ReactNode } from 'react';
import { LanguageContext } from './context';
import { localizedHref } from './locale';
import { t } from './translate';

function localizedChildren(value: ReactNode, translate: (text: string) => string): ReactNode {
  if (Array.isArray(value)) return value.map(child => localizedChildren(child, translate));
  if (typeof value === 'string') return translate(value);
  if (isValidElement<{ children?: ReactNode }>(value) && value.type === Fragment) return createElement(Fragment, { key: value.key }, localizedChildren(value.props.children, translate));
  return value;
}

export function LocalizedFragment({ children }: { children?: ReactNode }) {
  const language = useContext(LanguageContext);
  return createElement(Fragment, null, language.locale === 'ur' ? localizedChildren(children, text => t(text, 'ur', language.catalog)) : children);
}

/** Render translated strings through React; never rewrite the live DOM or stored/user input values. */
export function LocalizedDOM({ tag, originalProps, children: _jsxChildren, ...forwardedProps }: { tag: string; originalProps: Record<string, any>; [key: string]: any }) {
  const language = useContext(LanguageContext);
  // Preserve attributes supplied by cloneElement (for example Field's label/input IDs).
  if (Object.keys(forwardedProps).length) originalProps = { ...originalProps, ...forwardedProps };
  if (language.locale !== 'ur') return createElement(tag, originalProps);
  if (originalProps.translate === 'no') return createElement(LanguageContext.Provider, { value: { ...language, locale: 'en' } }, createElement(tag, originalProps));
  const translate = (value: unknown) => typeof value === 'string' ? t(value, 'ur', language.catalog) : value;
  const props = { ...originalProps };
  if ((tag === 'textarea' || (tag === 'input' && ['text', 'search', undefined].includes(props.type))) && !props.dir) props.dir = 'auto';
  if (tag === 'input' && props.type === 'number' && !props.inputMode) props.inputMode = 'decimal';
  // Form values, option values, IDs, event handlers, prices, URLs and data attributes remain source values.
  for (const attribute of ['title', 'alt', 'aria-label', 'aria-description', 'placeholder']) {
    if (typeof props[attribute] === 'string') props[attribute] = translate(props[attribute]);
  }
  if (tag === 'a' && typeof props.href === 'string' && !props.hrefLang && !/\b(?:canonical|alternate)\b/.test(props.rel || '')) {
    const english = localizedHref(props.href, 'en');
    let available = true;
    try { available = !language.translatedPaths || language.translatedPaths.includes(new URL(english, 'https://learnsmc.xyz').pathname); } catch { /* Preserve malformed/outbound links. */ }
    props.href = available ? localizedHref(props.href, 'ur') : english;
    if (props.href === '/articles/feed.xml') props.href = '/ur/articles/feed.xml';
  }
  if (tag === 'img' && /^\/images\/articles\/[^/]+\.svg$/.test(props.src || '') && !/-ur\.svg$/.test(props.src)) props.src = props.src.replace(/\.svg$/, '-ur.svg');
  if (!['script', 'style', 'pre', 'code', 'textarea'].includes(tag)) props.children = localizedChildren(props.children, value => translate(value) as string);
  return createElement(tag, props);
}
