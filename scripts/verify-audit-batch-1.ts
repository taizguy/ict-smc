import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';
import { correctToolDocument } from './tools-content';
import { enrichRoute } from './seo-content';
import { localizeHtml } from './localized-html';
import { searchDescription } from '../src/utils/searchMetadata';
import descriptions from '../src/data/searchDescriptions.json';
import { urdu } from '../src/i18n/urdu';
import { t } from '../src/i18n/translate';
import shared from '../src/i18n/runtime/shared.json';
import tools from '../src/i18n/runtime/tools.json';
import { chapterCatalog } from '../src/data/catalog.generated';
import { workbenchToolCatalog } from '../src/data/workbenchCatalog';
import type { RouteMeta } from './prerender';

// Targeted checks only: no full prerender, production build, crawl or sitemap writes.
const output = 'outputs/audit-batch-1';
fs.mkdirSync(output, { recursive: true });
const nodes = (n: any): any[] => [n, ...(n.childNodes || []).flatMap(nodes)];
const attr = (n: any, key: string) => n.attrs?.find((a: any) => a.name === key)?.value;
const text = (n: any): string => n.value || (n.childNodes || []).map(text).join('');
const doc = (html: string) => nodes(parse(html));
const metadata = (html: string) => {
  const head = doc(html).find(n => n.tagName === 'head');
  const items = nodes(head);
  const meta = (key: string) => items.filter(n => n.tagName === 'meta' && (attr(n, 'name') === key || attr(n, 'property') === key)).map(n => attr(n, 'content'));
  return { meta, head };
};
const paths = ['/tools/masterclass/pd-arrays/rejection-block/', '/tools/masterclass/pd-arrays/hangman-pd-array/'] as const;
for (const route of paths) {
  const pair = descriptions[route];
  assert.ok((pair.ur.match(/[\u0620-\u064a]/g) || []).length > 40, 'Genuine Urdu prose, not translated punctuation');
  assert.equal(searchDescription('', '', '/ur' + route), pair.ur);
  const english = fs.readFileSync(path.join('dist', route, 'index.html'), 'utf8');
  const localized = localizeHtml(english, route, urdu, { indexable: true });
  for (const key of ['description', 'og:description', 'twitter:description']) {
    assert.deepEqual(metadata(english).meta(key), [pair.en], `English unchanged: ${route} ${key}`);
    assert.deepEqual(metadata(localized).meta(key), [pair.ur], `Urdu parity: ${route} ${key}`);
  }
  assert.equal(t(pair.en, 'ur', { ...shared, ...tools }), pair.ur, `Client catalog parity: ${route}`);
  fs.writeFileSync(path.join(output, route.includes('rejection') ? 'rejection-block-ur.html' : 'hangman-pd-array-ur.html'), localized);
}

const makeRoute = (route: string): RouteMeta => ({ url: 'https://learnsmc.xyz' + route, canonical: 'https://learnsmc.xyz' + route, outputPath: route.slice(1) + 'index.html', title: 'Study | LearnSMC', heading: 'Study', description: 'Study', subheading: '', badge: '', bodyHtml: '' });
const workbench = makeRoute('/tools/');
correctToolDocument(workbench, '/tools/');
assert.equal(chapterCatalog.length, 66, 'Current catalog baseline');
assert.equal(workbenchToolCatalog.length, 10);
assert.ok(workbench.bodyHtml.includes(`${chapterCatalog.length}-lesson completion overview`));
assert.ok(!/60-lesson|10-step institutional pipeline|10-Step Pipeline/.test(workbench.bodyHtml));
for (const item of workbenchToolCatalog) {
  assert.ok(doc(workbench.bodyHtml).some(n => n.tagName === 'a' && attr(n, 'href') === item.url), item.url);
  const allText = text(parse(workbench.bodyHtml));
  for (const feature of item.features) assert.ok(allText.includes(feature), `Shared feature: ${feature}`);
}
const graph = workbenchToolCatalog.find(tool => tool.id === 'graph')!;
assert.ok(graph.features.includes('Interactive 3D concept tree'));
assert.ok(graph.features.includes('Accessible text tree and concept links'));
assert.ok(fs.readFileSync('src/components/TradingToolsOverview.tsx', 'utf8').includes('workbenchToolCatalog.map'));
const workbenchUrdu = localizeHtml(`<html><head><title>Workbench</title></head><body><main>${workbench.bodyHtml}</main></body></html>`, '/tools/', urdu, { indexable: true });
assert.ok(workbenchUrdu.includes(t('Interactive 3D concept tree', 'ur', urdu)));
assert.notEqual(t('66-lesson completion overview', 'ur', { ...shared, ...tools }), '66-lesson completion overview');
fs.writeFileSync(path.join(output, 'workbench-reading-en.html'), workbench.bodyHtml);
fs.writeFileSync(path.join(output, 'workbench-reading-ur.html'), workbenchUrdu);

const alchemyPath = '/learn/market-alchemy-trading-all-time-highs-ath/';
const alchemy = makeRoute(alchemyPath);
enrichRoute(alchemy, [alchemy]);
const graphNodes = alchemy.schemaJson['@graph'];
const article = graphNodes.find((n: any) => n['@type'] === 'Article');
assert.ok(article?.image, 'Article representative image');
const imagePath = new URL(article.image).pathname;
assert.ok(fs.existsSync('public' + imagePath));
const englishLesson = fs.readFileSync('dist' + alchemyPath + 'index.html', 'utf8');
assert.ok(doc(englishLesson).some(n => n.tagName === 'img' && attr(n, 'src') === imagePath), 'Schema image is visible lesson media');
const urduArticle = localizeHtml(`<html lang="en"><head><title>Market Alchemy</title><script type="application/ld+json">${JSON.stringify(alchemy.schemaJson)}</script></head><body>${alchemy.bodyHtml}</body></html>`, alchemyPath, urdu, { indexable: true });
const urduSchema = doc(urduArticle).find(n => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json');
const localizedArticle = JSON.parse(text(urduSchema))['@graph'].find((n: any) => n['@type'] === 'Article');
assert.equal(localizedArticle.image, article.image, 'Same representative image for both language editions');
assert.equal(localizedArticle.inLanguage, 'ur');
assert.equal(localizedArticle.url, 'https://learnsmc.xyz/ur' + alchemyPath);
fs.writeFileSync(path.join(output, 'article-images.json'), JSON.stringify({ en: article, ur: localizedArticle }, null, 2));
console.log('Batch 1 targeted checks passed: two unchanged EN descriptions; genuine Urdu static/client/OG/Twitter parity; 10 shared tool links/features; 66-chapter count; current graph; visible Article image EN/UR.');
