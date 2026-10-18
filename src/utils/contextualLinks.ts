import { textbookChapters } from '../data/chaptersData';
import { withoutLocale } from '../i18n/locale';
import { KEYWORD_CROSS_LINKS } from './glossaryRoutes';

export interface TextFragment { text: string; href?: string }
const chapterTerms: Array<[string[], number]> = [
  [['fair value gap', 'fair value gaps', 'FVG'], 13],
  [['inverse fair value gap', 'inverse fair value gaps', 'IFVG'], 14],
  [['order block', 'order blocks'], 15],
  [['breaker block', 'breaker blocks'], 16],
  [['liquidity sweep', 'liquidity sweeps', 'liquidity runs'], 18],
  [['market structure shift', 'MSS'], 11],
  [['break of structure', 'BOS'], 9],
  [['change of character', 'CHoCH'], 10],
];
const keywords = [
  ...chapterTerms.flatMap(([terms, id]) => {
    const chapter = textbookChapters.find(c => c.id === id);
    return chapter ? terms.map(term => ({ term, url: `/learn/${chapter.slug}/` })) : [];
  }),
  ...KEYWORD_CROSS_LINKS,
].sort((a, b) => b.term.length - a.term.length);

/** Shared by React and static HTML: escape output in the HTML renderer, never scan markup. */
export function contextualFragments(text: string | string[], currentPath = '', maxLinks = 4): TextFragment[] {
  currentPath = withoutLocale(currentPath);
  const value = Array.isArray(text) ? text.join('\n\n') : text;
  const ranges: Array<{ start: number; end: number; href: string }> = [];
  const linkedUrls = new Set<string>();
  for (const { term, url } of keywords) {
    if (ranges.length >= maxLinks) break;
    if (url === currentPath || linkedUrls.has(url)) continue;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    let match: RegExpExecArray | null;
    while ((match = regex.exec(value))) {
      const start = match.index, end = start + match[0].length;
      if (ranges.some(r => start < r.end && end > r.start)) continue;
      ranges.push({ start, end, href: url });
      linkedUrls.add(url);
      break;
    }
  }
  ranges.sort((a, b) => a.start - b.start);
  const fragments: TextFragment[] = [];
  let cursor = 0;
  for (const range of ranges) {
    if (range.start > cursor) fragments.push({ text: value.slice(cursor, range.start) });
    fragments.push({ text: value.slice(range.start, range.end), href: range.href });
    cursor = range.end;
  }
  if (cursor < value.length) fragments.push({ text: value.slice(cursor) });
  return fragments;
}

export function relatedChapters(chapterId: number, limit = 4) {
  const current = textbookChapters.find(c => c.id === chapterId);
  if (!current) return [];
  const terms = new Set((current.title + ' ' + current.keyTerms.map(t => t.term).join(' '))
    .toLowerCase().match(/[a-z]{4,}/g) || []);
  return textbookChapters.filter(c => c.id !== chapterId).map(c => ({ chapter: c,
    score: (c.part === current.part ? 4 : 0) + (c.title.toLowerCase().match(/[a-z]{4,}/g) || [])
      .filter(term => terms.has(term)).length,
  })).sort((a, b) => b.score - a.score || a.chapter.id - b.chapter.id)
    .slice(0, limit).map(r => r.chapter);
}
