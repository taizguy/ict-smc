/**
 * LearnSMC URL Normalization and Canonical URL Module
 * Single Source of Truth for URL formatting, trailing slash normalization,
 * canonical links, and legacy chapter mapping.
 */

export const BASE_URL = 'https://learnsmc.xyz';

/**
 * Normalizes any path or full URL to the canonical URL format with trailing slash.
 * Preserves root '/' as 'https://learnsmc.xyz/'.
 * Does not add trailing slashes to files with extensions (e.g., .xml, .txt, .html).
 */
export function normalizeCanonicalUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return `${BASE_URL}/`;

  let cleaned = pathOrUrl.trim();

  // Strip origin if present
  if (cleaned.startsWith(BASE_URL)) {
    cleaned = cleaned.substring(BASE_URL.length);
  } else if (/^https?:\/\/[^/]+/i.test(cleaned)) {
    cleaned = cleaned.replace(/^https?:\/\/[^/]+/i, '');
  }

  // Strip query params and hashes for canonical generation
  const queryIndex = cleaned.indexOf('?');
  if (queryIndex !== -1) {
    cleaned = cleaned.substring(0, queryIndex);
  }
  const hashIndex = cleaned.indexOf('#');
  if (hashIndex !== -1) {
    cleaned = cleaned.substring(0, hashIndex);
  }

  // Ensure leading slash
  if (!cleaned.startsWith('/')) {
    cleaned = `/${cleaned}`;
  }

  // Root path
  if (cleaned === '/' || cleaned === '') {
    return `${BASE_URL}/`;
  }

  // Check if it's a file with extension (.xml, .txt, .html, .png, etc.)
  const lastSegment = cleaned.substring(cleaned.lastIndexOf('/') + 1);
  const hasFileExtension = /\.[a-z0-9]{2,5}$/i.test(lastSegment);

  if (hasFileExtension) {
    return `${BASE_URL}${cleaned}`;
  }

  // Ensure trailing slash for content directories and lessons
  if (!cleaned.endsWith('/')) {
    cleaned = `${cleaned}/`;
  }

  return `${BASE_URL}${cleaned}`;
}

/**
 * Returns the preferred internal path with trailing slash (e.g., '/learn/what-actually-moves-price/')
 */
export function normalizePath(path: string): string {
  const canonical = normalizeCanonicalUrl(path);
  return canonical.substring(BASE_URL.length);
}

/**
 * Lesson Canonical URL generator
 */
export function getLessonCanonicalUrl(slug: string): string {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  return `${BASE_URL}/learn/${cleanSlug}/`;
}

/**
 * Lesson internal path generator
 */
export function getLessonPath(slug: string): string {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  return `/learn/${cleanSlug}/`;
}

/**
 * Legacy chapter mapping helper
 */
export interface LegacyChapterRedirect {
  id: number;
  slug: string;
  targetPath: string;
  targetCanonical: string;
}

export function resolveLegacyChapter(
  chapterIdOrSlug: string | number,
  allChapters: Array<{ id: number; slug: string }>
): LegacyChapterRedirect | null {
  const query = String(chapterIdOrSlug).trim().toLowerCase();
  const matched = allChapters.find(
    c => String(c.id) === query || c.slug.toLowerCase() === query
  );

  if (!matched) return null;

  return {
    id: matched.id,
    slug: matched.slug,
    targetPath: getLessonPath(matched.slug),
    targetCanonical: getLessonCanonicalUrl(matched.slug),
  };
}
