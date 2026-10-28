import {alchemyRisk} from '../src/data/chapters/marketAlchemyPilot';
import { retiredGraphPaths } from '../src/utils/knowledgeGraphRoutes';
import fs from 'node:fs';
import { verify2025Search } from './verify-2025-search';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { textbookChapters } from '../src/data/chaptersData';
import { masoodPlaylistsData } from '../src/data/masoodData';
import { chapterCatalog, lectureCatalog } from '../src/data/catalog.generated';
import { contextualFragments } from '../src/utils/contextualLinks';

const dist = path.resolve('dist');
const routes: Array<{path: string; outputPath: string; title: string; description: string; indexable: boolean}> =
  JSON.parse(fs.readFileSync(path.join(dist, 'seo-manifest.json'), 'utf8'));
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const redirectSources = fs.readFileSync(path.join(dist, '_redirects'), 'utf8').split('\n')
  .map(line => line.trim().split(/\s+/)).filter(parts => parts.length === 3 && parts[0].startsWith('/')).map(parts => parts[0]);
assert.equal(new Set(redirectSources).size, redirectSources.length, 'Cloudflare rejects duplicate redirect source paths, even with different whitespace');
const aliases = new Map(fs.readFileSync(path.join(dist, '_redirects'), 'utf8').split('\n')
  .map(line => line.trim().split(/\s+/)).filter(parts => parts.length === 3 && parts[0].startsWith('/')).map(parts => [parts[0], parts[1]]));
for (const old of retiredGraphPaths) for (const locale of ['', '/ur']) {
  const source = locale + old, target = locale + '/tools/knowledge-graph/';
  assert.equal(aliases.get(source), target, `Retired graph redirect: ${source}`);
  assert.ok(!sitemap.includes(`<loc>https://learnsmc.xyz${source}</loc>`), `Retired graph URL in sitemap: ${source}`);
  assert.ok(!routes.some(r => r.path === source), `Retired graph URL in canonical manifest: ${source}`);
}
const titles = new Set<string>(), descriptions = new Set<string>(), visited = new Set<string>();
const edges = new Map<string, string[]>();
const routePaths = new Set(routes.map(r => r.path));
const failures: string[] = [];
function check(condition: unknown, message: string) { if (!condition) failures.push(message); }
function repeatedHeadings(source: string) {
  const seen = new Set<string>(), duplicates: string[] = [];
  function text(node: any): string { return node.value || (node.childNodes || []).map(text).join(''); }
  function visit(node: any) {
    if (/^h[1-6]$/.test(node.tagName || '')) {
      const label = text(node).replace(/\s+/g, ' ').trim();
      const key = label.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
      if (key && seen.has(key)) duplicates.push(label);
      if (key) seen.add(key);
    }
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parse(source));
  return duplicates;
}
function hasContentDisclaimer(source: string) {
  function text(node: any): string { return node.value || (node.childNodes || []).map(text).join(''); }
  function hasDisclosureLink(node: any): boolean {
    return (node.tagName === 'a' && node.attrs?.some((a: any) => a.name === 'href' && a.value === '/disclaimer/'))
      || (node.childNodes || []).some(hasDisclosureLink);
  }
  function visit(node: any, insideMain = false): boolean {
    const main = insideMain || node.tagName === 'main';
    const classes = node.attrs?.find((a: any) => a.name === 'class')?.value.split(/\s+/) || [];
    if (main && classes.includes('ymyl-disclaimer')) {
      return (text(node).includes('Financial education and risk notice') || text(node).includes(alchemyRisk)) && hasDisclosureLink(node);
    }
    return (node.childNodes || []).some((child: any) => visit(child, main));
  }
  return visit(parse(source));
}
const disclaimerFixture = '<aside class="ymyl-disclaimer rounded-xl"><h2>Financial education and risk notice</h2><a href="/disclaimer/">Read disclosure</a></aside>';
assert.ok(hasContentDisclaimer(`<main>${disclaimerFixture}</main>`), 'Styled in-content disclaimers are recognized');
assert.ok(!hasContentDisclaimer(disclaimerFixture), 'A footer-only disclaimer cannot satisfy the in-content requirement');
assert.ok(!hasContentDisclaimer(`<main>${disclaimerFixture.replace('href="/disclaimer/"', 'href="/about/"')}</main>`), 'Disclaimer must link to the disclosure');
assert.ok(!hasContentDisclaimer(`<main>${disclaimerFixture.replace('ymyl-disclaimer', 'not-ymyl-disclaimer')}</main>`), 'Disclaimer class must match a complete token');
const futuresDisclaimerFixture = `<aside class="ymyl-disclaimer alchemy-risk"><strong>${alchemyRisk}</strong><a href="/disclaimer/">Read disclosure</a></aside>`;
assert.ok(hasContentDisclaimer(`<main>${futuresDisclaimerFixture}</main>`), 'Specific futures disclosure is recognized');
assert.ok(!hasContentDisclaimer(futuresDisclaimerFixture), 'Specific disclosure must be inside main');
assert.ok(!hasContentDisclaimer(`<main>${futuresDisclaimerFixture.replace('href="/disclaimer/"','href="/about/"')}</main>`), 'Specific disclosure must link to full policy');
for (const route of routes) {
  const html = fs.readFileSync(path.join(dist, route.outputPath), 'utf8');
  check(!titles.has(route.title), `Duplicate title: ${route.path}`); titles.add(route.title);
  check(!descriptions.has(route.description), `Duplicate description: ${route.path}`); descriptions.add(route.description);
  check((html.match(/<h1\b/g) || []).length === 1, `Expected one h1: ${route.path}`);
  if (route.indexable) {
    const duplicates = repeatedHeadings(html);
    check(duplicates.length === 0, `Repeated heading text: ${route.path}: ${duplicates.join('; ')}`);
  }
  // Project snippet budgets, not indexing requirements imposed by Google.
  const isUrdu = route.path.startsWith('/ur/');
  // Urdu uses different word lengths and shaping; these remain editorial budgets, not Google rules.
  check(route.title.length <= (isUrdu ? 90 : 60), `Title exceeds editorial budget: ${route.path}`);
  check(route.description.length >= 40 && route.description.length <= (isUrdu ? 220 : 155), `Description length: ${route.path}`);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
  const levels = [...main.matchAll(/<h([1-6])\b/g)].map(m => Number(m[1]));
  check(levels.every((level, i) => !i || level <= levels[i - 1] + 1), `Skipped heading level: ${route.path}`);
  for (const image of main.matchAll(/<img\b[^>]*src="\/images\/articles\/[^"]+"[^>]*>/g)) {
    check(/alt="[^"]+"/.test(image[0]), `Article illustration alternative missing: ${route.path}`);
  }
  check(html.includes(`href="https://learnsmc.xyz${route.path}"`), `Canonical: ${route.path}`);
  check(sitemap.includes(`<loc>https://learnsmc.xyz${route.path}</loc>`) === route.indexable, `Sitemap indexability: ${route.path}`);
  check(html.includes('content="noindex, follow"') === !route.indexable, `Robots directive: ${route.path}`);
  const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  check(graph.length === 1, `Expected one consistent schema graph: ${route.path}`);
  const nodes = graph.flatMap(g => g['@graph'] || [g]);
  if (route.path.startsWith('/learn/') || route.path.startsWith('/masood/lectures/')) {
    const resource = nodes.find(n => n['@type'] === 'LearningResource');
    check(resource?.author?.name === 'Muhammad Umer Ijaz', `Actual author missing: ${route.path}`);
    check(hasContentDisclaimer(html), `In-content disclaimer missing or incomplete: ${route.path}`);
    if (route.path.startsWith('/learn/')) check((html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '').includes('<a href="/learn/'), `Context links missing: ${route.path}`);
    if (route.path.startsWith('/masood/lectures/')) check(html.includes('https://www.youtube.com/watch?v='), `Original source missing: ${route.path}`);
  }
  const links: string[] = [];
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const url = new URL(match[1].replace(/&amp;/g, '&'), `https://learnsmc.xyz${route.path}`);
    if (url.origin !== 'https://learnsmc.xyz') continue;
    let target = url.pathname;
    check(!aliases.has(target), `Internal link takes a redirect hop: ${route.path} -> ${target}`);
    target = aliases.get(target) || target;
    const file = path.join(dist, target.replace(/^\//, ''), target.endsWith('/') ? 'index.html' : '');
    check(fs.existsSync(file), `Broken internal link ${route.path} -> ${target}`);
    if (routePaths.has(target)) links.push(target);
  }
  edges.set(route.path, links);
}
const queue = ['/'];
while (queue.length) {
  const current = queue.shift()!;
  if (visited.has(current)) continue;
  visited.add(current); queue.push(...(edges.get(current) || []).filter(p => !visited.has(p)));
}
for (const route of routes.filter(r => r.indexable)) check(visited.has(route.path), `Orphan page: ${route.path}`);
check(new Set(routes.map(r => r.path)).size === routes.length, 'Duplicate route output');
check(!fs.existsSync(path.join(dist, '200.html')), 'A success-status SPA fallback must not be generated');
check(JSON.parse(fs.readFileSync('wrangler.jsonc', 'utf8')).assets.not_found_handling === '404-page', 'Cloudflare must return a real 404');
check(!JSON.parse(fs.readFileSync('vercel.json', 'utf8')).rewrites?.some((r: any) => r.destination === '/index.html'), 'Vercel must not rewrite missing routes to home');
assert.deepEqual(chapterCatalog.map(c => c.slug), textbookChapters.map(c => c.slug), 'Stale chapter catalog');
assert.deepEqual(lectureCatalog.map(l => l.id), masoodPlaylistsData.flatMap(p => p.lectures.map(l => l.id)), 'Stale lecture catalog');
const fragments = contextualFragments('Order Blocks, liquidity sweeps and fair value gaps work together.', '/learn/example/');
check(fragments.filter(f => f.href?.startsWith('/learn/')).length === 3, 'Plural contextual lesson links must work');
check(contextualFragments('<script>test</script>', '').map(f => f.text).join('') === '<script>test</script>', 'Linking must preserve text without interpreting HTML');
if (failures.length) {
  console.error(failures.join('\n')); throw new Error(`${failures.length} crawl checks failed`);
}
console.log(`Crawl checks passed: ${routes.length} unique pages, valid schemas and links, all indexable pages reachable from home.`);

// Findings from the supplied reports: guard confirmed fixes and avoid schema regressions.
const homeHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
assert.ok(homeHtml.includes('What are ICT and Smart Money Concepts?'));
assert.ok(homeHtml.includes('href="#main-content"'));
assert.ok(!/<meta[^>]+content="[^"]*(?:nosnippet|max-snippet:0)/.test(homeHtml));
for (const p of ['about', 'contact']) {
  const html = fs.readFileSync(path.join(dist, p, 'index.html'), 'utf8');
  assert.ok(html.includes('tel:+923424009627'));
  assert.ok(html.includes('Gullistan Villas near Pasrur bypass'));
  assert.ok(html.includes('mailto:itsmuhammadumerijaz@gmail.com'));
}
assert.ok(fs.readFileSync(path.join(dist, 'tools/compare/index.html'), 'utf8').includes('<table>'));
for (const name of ['llms.txt', 'llms-full.txt']) {
  const text = fs.readFileSync(path.join(dist, name), 'utf8');
  assert.ok(text.startsWith('# LearnSMC'));
  assert.ok(text.includes('https://learnsmc.xyz/curriculum/'));
}
console.log('Report regression checks passed: author contacts, reading guides, comparison tables and snippet eligibility.');
verify2025Search(dist);
