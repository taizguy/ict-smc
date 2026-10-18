import { createElement, useContext, type ReactNode } from 'react';
import { localizedHref, type Locale } from './locale';
import { t as translate, type TranslationCatalog } from './translate';

import { LanguageContext } from './context';

/** Shared by the browser and static rendering; no DOM mutation or external translation requests. */
export function TranslationProvider({ locale, preview = false, catalog = {}, translatedPaths, children }: { locale: Locale; preview?: boolean; catalog?: TranslationCatalog; translatedPaths?: readonly string[]; children: ReactNode }) {
  return createElement(LanguageContext.Provider, { value: { locale, preview, catalog, translatedPaths } }, children);
}

export function useTranslation() {
  const { locale, preview, catalog, translatedPaths } = useContext(LanguageContext);
  return {
    locale, preview,
    t: (text: string) => translate(text, locale, catalog),
    message: (text: string, values: Record<string, string | number>) => translate(text, locale, catalog).replace(/\{(\w+)\}/g, (match, key) => String(values[key] ?? match)),
    href: (path: string) => {
      const target = localizedHref(path, locale);
      // Review previews must never link to a nonexistent translated document.
      const pathname = new URL(localizedHref(path, 'en'), 'https://learnsmc.xyz').pathname;
      return locale === 'ur' && translatedPaths && !translatedPaths.includes(pathname) ? localizedHref(path, 'en') : target;
    },
  };
}
