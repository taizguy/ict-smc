import { isEnglishOnlyHistory } from '../data/history-paths';
/** URL-derived language is deterministic for visitors and search engines. */
export type Locale = 'en' | 'ur';
export const SITE_ORIGIN = 'https://learnsmc.xyz';

export function localeFromPath(pathname: string): Locale {
  return /^\/ur(?:\/|$)/i.test(pathname) ? 'ur' : 'en';
}

export function withoutLocale(pathname: string): string {
  const path = pathname.replace(/^\/ur(?=\/|$)/i, '') || '/';
  return path.startsWith('/') ? path : `/${path}`;
}

/** Localize only same-origin documents. Fragments, downloads and external URLs stay intact. */
export function localizedHref(href: string, locale: Locale): string {
  if (!href || href.startsWith('#') || !/^(?:\/|https?:\/\/)/i.test(href) || href.startsWith('//')) return href;
  let url: URL;
  try { url = new URL(href, SITE_ORIGIN); } catch { return href; }
  if (url.origin !== SITE_ORIGIN || /\.[a-z0-9]{2,8}$/i.test(url.pathname)) return href;
  let path = withoutLocale(url.pathname).replace(/\/{2,}/g, '/');
  if (!path.endsWith('/')) path += '/';
  return `${locale === 'ur' && !isEnglishOnlyHistory(path) ? '/ur' : ''}${path}${url.search}${url.hash}`;
}

export function languageAlternates(pathname: string) {
  const cleanPath = withoutLocale(new URL(pathname, SITE_ORIGIN).pathname);
  const en = SITE_ORIGIN + localizedHref(cleanPath, 'en');
  const ur = SITE_ORIGIN + localizedHref(cleanPath, 'ur');
  if(isEnglishOnlyHistory(cleanPath)) return [{language:'en',href:en},{language:'x-default',href:en}];
  return [{ language: 'en', href: en }, { language: 'ur', href: ur }, { language: 'x-default', href: en }];
}
