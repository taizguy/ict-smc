import type { Locale } from './locale';
export type TranslationCatalog = Readonly<Record<string, string>>;
const patterns = new WeakMap<TranslationCatalog, { regex: RegExp; slots: string[]; translation: string }[]>();
const foldedCatalogs = new WeakMap<TranslationCatalog, Map<string, string>>();
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function interpolate(source: string, catalog: TranslationCatalog): string | undefined {
  let compiled = patterns.get(catalog);
  if (!compiled) {
    compiled = Object.entries(catalog).filter(([key]) => /\{\w+\}/.test(key)).map(([key, translation]) => {
      const slots: string[] = [];
      let pattern = '', from = 0;
      for (const match of key.matchAll(/\{(\w+)\}/g)) {
        pattern += escapeRegex(key.slice(from, match.index)) + '(.*?)';
        slots.push(match[1]); from = match.index! + match[0].length;
      }
      pattern += escapeRegex(key.slice(from));
      return { regex: new RegExp(`^${pattern}$`), slots, translation };
    });
    patterns.set(catalog, compiled);
  }
  for (const item of compiled) {
    const match = source.match(item.regex);
    if (!match) continue;
    return item.translation.replace(/\{(\w+)\}/g, (placeholder, slot) => {
      const index = item.slots.indexOf(slot);
      if (index < 0) return placeholder;
      const value = match[index + 1];
      return catalog[value] || foldedCatalogs.get(catalog)?.get(value.toLowerCase()) || value;
    });
  }
}

/** Translate exact reviewed copy, preserving interpolation boundaries and surrounding spaces. */
export function t(source: string, locale: Locale = 'en', catalog: TranslationCatalog = {}): string {
  if (locale === 'en') return source;
  const key = source.replace(/\s+/g, ' ').trim();
  let folded = foldedCatalogs.get(catalog);
  if (!folded) {
    folded = new Map(Object.entries(catalog).map(([text, translation]) => [text.toLowerCase(), translation]));
    foldedCatalogs.set(catalog, folded);
  }
  const translated = catalog[key] || folded.get(key.toLowerCase()) || interpolate(key, catalog);
  if (!translated) return source;
  return `${/^\s/.test(source) ? ' ' : ''}${translated}${/\s$/.test(source) ? ' ' : ''}`;
}
