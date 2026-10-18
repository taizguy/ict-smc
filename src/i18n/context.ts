import { createContext } from 'react';
import type { Locale } from './locale';
import type { TranslationCatalog } from './translate';

export const LanguageContext = createContext<{
  locale: Locale;
  preview: boolean;
  catalog: TranslationCatalog;
  translatedPaths?: readonly string[];
}>({ locale: 'en', preview: false, catalog: {} });
