import { localeFromPath, localizedHref } from './locale';

/** Button-driven document navigation uses the same language rule as ordinary links. */
export function currentDocumentHref(target: string): string {
  if (typeof window === 'undefined') return target;
  const locale = localeFromPath(window.location.pathname);
  return localizedHref(target, locale);
}
