import fs from 'node:fs';
import path from 'node:path';
import { textbookChapters } from '../src/data/chaptersData';

type Page = { path: string; title: string; description: string; indexable: boolean };
// Suggested editorial clusters, not measured Google queries or proof of cannibalization.
const owners: [number, string, RegExp][] = [
  [2, 'order matching', /exchange.*match|matching.*order|order.types|market.limit.stop/],
  [3, 'order book', /order.book|\bdom\b|spoof/],
  [1, 'price formation', /what.actually.moves.price|what.moves.price|electronic.auction/],
  [7, 'swing highs and lows', /swing.high|swing.low|fractals|atom.of.structure/],
  [10, 'change of character', /choch|change.of.character/],
  [11, 'market structure shift', /\bmss\b|market.structure.shift/],
  [9, 'break of structure', /\bbos\b|break.of.structure/],
  [13, 'fair value gap', /fair.value.gap|\bfvg\b|\bifvg\b|imbalance|consequent.encroachment/],
  [15, 'order blocks', /order.block|mitigation|breaker.block|mean.threshold/],
  [19, 'sessions and killzones', /killzone|session|opening.range|0930|9:30/],
  [18, 'liquidity sweeps', /sweep|liquidity.run|inducement|liquidity.engineering/],
  [4, 'liquidity', /liquidity/],
];
function intent(url: string) {
  if (url.startsWith('/learn/')) return 'Full curriculum lesson: explanation, examples and source context';
  if (url.startsWith('/tools/glossary/')) return 'Concise definition and terminology reference';
  if (url.startsWith('/tools/compare/')) return 'Compare definitions and conditions';
  if (url.startsWith('/tools/masterclass/')) return 'Model-specific study and prerequisites';
  if (/^\/tools\/(chartlab|simulator|backtest)\//.test(url)) return 'Interactive practice or research workflow';
  if (url.startsWith('/tools/')) return 'Tool, reference or tool-category navigation';
  if (url.startsWith('/masood/lectures/')) return 'Independent notes for a specific third-party video';
  if (url.startsWith('/articles/')) return url === '/articles/' ? 'Article discovery' : 'Editorial explanation or historical narrative';
  if (/^\/(curriculum|mentorships|masood)\//.test(url)) return 'Learning-path or collection navigation';
  if (url.startsWith('/resources/')) return 'Downloadable educational reference';
  return 'Homepage, publisher information or site navigation';
}
const pages: Page[] = JSON.parse(fs.readFileSync('dist/seo-manifest.json', 'utf8'));
const rows = pages.filter(page => page.indexable && !/^\/ur(?:\/|$)/.test(page.path)).map(page => {
  const matches = owners.filter(([, , regex]) => regex.test(`${page.path} ${page.title}`.toLowerCase()));
  const cluster = matches[0];
  const chapter = cluster && textbookChapters.find(item => item.id === cluster[0]);
  const primary = chapter ? `/learn/${chapter.slug}/` : '';
  return {
    path: page.path, title: page.title, description: page.description,
    suggestedTopic: cluster?.[1] || 'Other: manual topic assignment needed',
    otherMatchingTopics: matches.slice(1).map(item => item[1]).join('; '),
    pagePurpose: intent(page.path), proposedLessonOwner: primary,
    reviewStatus: primary === page.path ? 'Editorial lesson owner selected' : 'Suggested classification; semantic review pending',
    nextAction: primary === page.path ? 'Maintain detailed lesson and source context'
      : primary ? 'Review distinct purpose; link to lesson where relevant. Do not auto-merge or canonicalize.'
      : 'Review search intent manually; retain current URL and indexing rules',
  };
});
const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
const columns = Object.keys(rows[0]) as (keyof typeof rows[number])[];
const csv = '\uFEFF' + [columns.join(','), ...rows.map(row => columns.map(key => escape(row[key])).join(','))].join('\n') + '\n';
const destination = path.resolve('docs/seo/search-intent-map.csv');
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, csv);
console.log(`Mapped ${rows.length} indexable English routes. Urdu equivalents share intent, not English search demand. Output: ${destination}`);
