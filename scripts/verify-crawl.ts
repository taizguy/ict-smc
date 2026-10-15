import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
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
const titles = new Set<string>(), descriptions = new Set<string>(), visited = new Set<string>();
const edges = new Map<string, string[]>();
const routePaths = new Set(routes.map(r => r.path));
const failures: string[] = [];
function check(condition: unknown, message: string) { if (!condition) failures.push(message); }
for (const route of routes) {
  const html = fs.readFileSync(path.join(dist, route.outputPath), 'utf8');
  check(!titles.has(route.title), `Duplicate title: ${route.path}`); titles.add(route.title);
  check(!descriptions.has(route.description), `Duplicate description: ${route.path}`); descriptions.add(route.description);
  check((html.match(/<h1\b/g) || []).length === 1, `Expected one h1: ${route.path}`);
  check(route.description.length >= 40 && route.description.length <= 165, `Description length: ${route.path}`);
  check(html.includes(`href="https://learnsmc.xyz${route.path}"`), `Canonical: ${route.path}`);
  check(sitemap.includes(`<loc>https://learnsmc.xyz${route.path}</loc>`) === route.indexable, `Sitemap indexability: ${route.path}`);
  check(html.includes('content="noindex, follow"') === !route.indexable, `Robots directive: ${route.path}`);
  const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  check(graph.length === 1, `Expected one consistent schema graph: ${route.path}`);
  const nodes = graph.flatMap(g => g['@graph'] || [g]);
  if (route.path.startsWith('/learn/') || route.path.startsWith('/masood/lectures/')) {
    const resource = nodes.find(n => n['@type'] === 'LearningResource');
    check(resource?.author?.name === 'Muhammad Umer Ijaz', `Actual author missing: ${route.path}`);
    check(html.includes('class="ymyl-disclaimer"'), `In-content disclaimer missing: ${route.path}`);
    if (route.path.startsWith('/learn/')) check((html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '').includes('<a href="/learn/'), `Context links missing: ${route.path}`);
    if (route.path.startsWith('/masood/lectures/')) check(html.includes('https://www.youtube.com/watch?v='), `Original source missing: ${route.path}`);
  }
  const links: string[] = [];
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const url = new URL(match[1].replace(/&amp;/g, '&'), `https://learnsmc.xyz${route.path}`);
    if (url.origin !== 'https://learnsmc.xyz') continue;
    let target = url.pathname;
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
