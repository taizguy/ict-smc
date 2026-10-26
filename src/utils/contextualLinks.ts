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
export function contextualFragments(text: string | string[], currentPath = '', maxLinks = 4, excludedUrls?: ReadonlySet<string>): TextFragment[] {
  currentPath = withoutLocale(currentPath);
  const value = Array.isArray(text) ? text.join('\n\n') : text;
  const ranges: Array<{ start: number; end: number; href: string }> = [];
  const linkedUrls = new Set<string>();
  const lesson = (id: number) => `/learn/${textbookChapters.find(chapter => chapter.id === id)!.slug}/`;
  // Delivery lessons keep one link per destination across the whole body. Include
  // Urdu names so the published translation has the same useful connections.
  const is2025 = textbookChapters.some(c => c.part.includes('2025 Official Mentorship') && `/learn/${c.slug}/` === currentPath);
  const mentorshipKeywords = is2025 ? [
    ...['old highs', 'old high'].map(term=>({term,url:'/tools/glossary/liquidity/buy-side-liquidity/'})),
    ...['old lows', 'old low'].map(term=>({term,url:'/tools/glossary/liquidity/sell-side-liquidity/'})),
    ...['breaker', 'breakers'].map(term=>({term,url:lesson(16)})),
    ...['stop-market order', 'stop-limit order', 'futures position', 'contract specifications'].map(term=>({term,url:lesson(52)})),
    ...['higher-timeframe ranges'].map(term=>({term,url:lesson(22)})),
    ...['market-mechanics chapter'].map(term=>({term,url:lesson(1)})),
    ...['event-risk chapter'].map(term=>({term,url:lesson(62)})),
    ...['journaling lesson'].map(term=>({term,url:lesson(64)})),
    ...['risk disclosure'].map(term=>({term,url:'/disclaimer/'})),
    ...['Chart Laboratory'].map(term=>({term,url:'/tools/chartlab/'})),
    ...['Backtest Lab'].map(term=>({term,url:'/tools/backtest/'})),
    ...['Trade Simulator'].map(term=>({term,url:'/tools/simulator/'})),
    ...['opening range', 'opening ranges', 'Opening Range'].map(term=>({term,url:lesson(24)})),
    ...['RTH opening gap', 'RTH gap', 'weekly opening gap', 'NWOG', 'Midnight Opening Range'].map(term=>({term,url:lesson(58)})),
    ...['balanced price range', 'BPR'].map(term=>({term,url:lesson(56)})),
    ...['suspension', 'Suspension', 'Suspension Body Gaps'].map(term=>({term,url:lesson(55)})),
    ...['reclaimed reference', 'reclaimed', 'Reclaimed حوالہ'].map(term=>({term,url:'/tools/glossary/order-blocks/propulsion-reclaimed-blocks/'})),
    ...['consequent encroachment', 'Consequent Encroachment', 'CE'].map(term=>({term,url:'/tools/glossary/imbalances/consequent-encroachment/'})),
    ...['swing rule', 'swing high', 'swing low', 'سوئنگ'].map(term=>({term,url:lesson(7)})),
    ...['high-resistance liquidity run', 'HRLR'].map(term=>({term,url:'/tools/glossary/liquidity/event-volatility-hrlr/'})),
    ...['low-resistance liquidity run', 'LRLR'].map(term=>({term,url:'/tools/glossary/liquidity/low-resistance-liquidity-runs/'})),
    ...['FOMC', 'news conditions', 'Slippage', 'slippage', 'سلپیج'].map(term=>({term,url:lesson(62)})),
    ...['weekly profile', 'weekly profiles', 'TGIF', 'Weekly Profile'].map(term=>({term,url:lesson(27)})),
    ...['options', 'short call', 'option premium', 'Options'].map(term=>({term,url:lesson(63)})),
    ...['journaling', 'journal', 'جرنل'].map(term=>({term,url:lesson(64)})),
    ...['lunch-retracement', 'afternoon opening range', 'post-10:00 swing'].map(term=>({term,url:lesson(61)})),
    ...['Turtle Soup', 'Rejection Block', 'Rejection-Block'].map(term=>({term,url:lesson(60)})),
    ...['SMT Divergence', 'SMT', 'عدم تصدیق'].map(term=>({term,url:lesson(26)})),
    ...['First Presented FVG', 'First-Presented FVG'].map(term=>({term,url:lesson(25)})),
    ...['PD Array', 'PD-array', 'Price Delivery Continuum'].map(term=>({term,url:lesson(59)})),
  ] : [];
  const deliveryKeywords = excludedUrls ? [
    ...['first presented FVG', 'first-presented FVG'].map(term=>({term,url:lesson(25)})),
    ...['SMT', 'SMT divergence'].map(term=>({term,url:lesson(26)})),
    ...['Venom', 'Venom model'].map(term=>({term,url:lesson(53)})),
    ...['NWOG', 'midnight opening range'].map(term=>({term,url:lesson(58)})),
    ...['PD array', 'PD arrays', 'PD-array matrix', 'price delivery continuum'].map(term=>({term,url:lesson(59)})),
    ...['Turtle Soup', 'rejection block', 'rejection blocks'].map(term=>({term,url:lesson(60)})),
    ...['lunch-retracement', 'afternoon opening range'].map(term=>({term,url:lesson(61)})),
    ...['market structure shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'].map(term => ({ term, url: lesson(11) })),
    ...['order blocks', 'order block', 'آرڈر بلاک'].map(term => ({ term, url: lesson(15) })),
    ...['inverse fair value gap', 'IFVG'].map(term => ({ term, url: lesson(14) })),
    ...['displacement', 'ڈسپلیسمنٹ'].map(term => ({ term, url: '/tools/glossary/imbalances/displacement/' })),
    ...['liquidity', 'لیکویڈیٹی'].map(term => ({ term, url: lesson(4) })),
    ...['premium', 'discount', 'پریمیم', 'ڈسکاؤنٹ'].map(term => ({ term, url: lesson(13) + '#rr-section-6' })),
  ] : [];
  for (const { term, url } of [...mentorshipKeywords, ...deliveryKeywords, ...keywords].sort((a,b) => b.term.length-a.term.length)) {
    if (ranges.length >= maxLinks) break;
    if(currentPath.includes('ict-weekly-options')&&['premium','discount','پریمیم','ڈسکاؤنٹ'].includes(term.toLowerCase()))continue;
    if (url.split('#')[0] === currentPath || linkedUrls.has(url) || excludedUrls?.has(url)) continue;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, 'giu');
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
