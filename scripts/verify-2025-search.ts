import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';
import intents from '../src/data/chapters/mentorship2025Search.json';
import descriptions from '../src/data/searchDescriptions.json';
import { urdu } from '../src/i18n/urdu';
import { languageAlternates, SITE_ORIGIN } from '../src/i18n/locale';
import { searchTitle } from '../src/utils/searchMetadata';

const text = (node: any): string => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
function elements(node: any): any[] { return [node, ...(node.childNodes || []).flatMap(elements)]; }
const attr = (node: any, name: string): string | undefined => node.attrs?.find((a: any) => a.name === name)?.value;
const clean = (value: string) => value.replace(/\s+/g, ' ').trim();

/** Editorial intent and language isolation checks, in addition to site-wide SEO checks. */
export function verify2025Search(dist: string) {
  assert.equal(intents.length, 12, 'Every 2025 lesson needs a reviewed query brief');
  for (const intent of intents) for (const language of ['en', 'ur'] as const) {
    const route = (language === 'ur' ? '/ur' : '') + intent.path;
    const source = fs.readFileSync(path.join(dist, route, 'index.html'), 'utf8');
    const nodes = elements(parse(source));
    const head = nodes.find(n => n.tagName === 'head');
    const headNodes = elements(head);
    const titles = headNodes.filter(n => n.tagName === 'title');
    const headings = nodes.filter(n => n.tagName === 'h1');
    const meta = (key: string) => headNodes.filter(n => n.tagName === 'meta' && (attr(n, 'name') === key || attr(n, 'property') === key));
    const metaValue = (key: string) => {
      const found = meta(key); assert.equal(found.length, 1, `${route}: one ${key}`);
      return attr(found[0], 'content')!;
    };
    const expectedTitle = language === 'en' ? intent.title : urdu[intent.title];
    const expectedHeading = language === 'en' ? intent.heading : urdu[intent.heading];
    assert.ok(expectedTitle && expectedHeading, `${route}: reviewed translation exists`);
    assert.equal(searchTitle('', intent.path), intent.title, `${route}: title formatter preserves the reviewed topic`);
    assert.equal(titles.length, 1, `${route}: exactly one document-head title`);
    assert.equal(clean(text(titles[0])), expectedTitle, `${route}: correct title language and query`);
    assert.equal(headings.length, 1, `${route}: exactly one H1`);
    assert.equal(clean(text(headings[0])), expectedHeading, `${route}: reviewed H1 survives static rendering`);
    const expectedDescription = descriptions[intent.path as keyof typeof descriptions][language];
    assert.equal(metaValue('description'), expectedDescription, `${route}: topic-specific description`);
    for (const key of ['og:title', 'twitter:title']) assert.equal(metaValue(key), expectedTitle, `${route}: ${key} parity`);
    for (const key of ['og:description', 'twitter:description']) assert.equal(metaValue(key), expectedDescription, `${route}: ${key} parity`);
    const html = nodes.find(n => n.tagName === 'html');
    assert.equal(attr(html, 'lang'), language, `${route}: URL-derived document language`);
    if (language === 'ur') assert.equal(attr(html, 'dir'), 'rtl', `${route}: Urdu direction`);
    for (const value of [expectedTitle, expectedHeading, expectedDescription]) {
      assert.equal(/[\u0600-\u06ff]/.test(value), language === 'ur', `${route}: metadata language isolation`);
      if (language === 'en') for (const term of intent.requiredTerms) assert.ok(value.toLowerCase().includes(term.toLowerCase()), `${route}: missing reviewed topic term ${term}`);
    }
    const canonical = headNodes.filter(n => n.tagName === 'link' && attr(n, 'rel') === 'canonical');
    assert.equal(canonical.length, 1, `${route}: one canonical`);
    assert.equal(attr(canonical[0], 'href'), SITE_ORIGIN + route, `${route}: self-canonical`);
    const alternates = headNodes.filter(n => n.tagName === 'link' && attr(n, 'rel') === 'alternate' && attr(n, 'hreflang'));
    assert.equal(alternates.length, 3, `${route}: three language alternates`);
    for (const alternate of languageAlternates(intent.path)) assert.ok(alternates.some(n => attr(n, 'hreflang') === alternate.language && attr(n, 'href') === alternate.href), `${route}: reciprocal ${alternate.language}`);
    const graph = headNodes.filter(n => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json').flatMap(n => { const value = JSON.parse(text(n)); return value['@graph'] || [value]; });
    const resource = graph.find(n => n['@type'] === 'LearningResource');
    assert.equal(resource?.inLanguage, language, `${route}: schema language`);
    assert.ok(resource?.name.includes(expectedHeading), `${route}: schema names the visible topic`);
    assert.ok(!/noindex|nosnippet/.test(metaValue('robots')), `${route}: indexable and snippet eligible`);
  }
  for (const hub of ['/curriculum/ict-2025-official-mentorship-curriculum/', '/curriculum/mentorships/2025/']) for (const language of ['en', 'ur'] as const) {
    const route = (language === 'ur' ? '/ur' : '') + hub;
    const nodes = elements(parse(fs.readFileSync(path.join(dist, route, 'index.html'), 'utf8')));
    const head = elements(nodes.find(n => n.tagName === 'head'));
    const title = searchTitle('', hub);
    const expected = language === 'en' ? title : urdu[title];
    assert.equal(text(head.find(n => n.tagName === 'title')), expected, `${route}: reviewed hub title`);
    const description = attr(head.find(n => n.tagName === 'meta' && attr(n, 'name') === 'description'), 'content');
    assert.equal(description, descriptions[hub as keyof typeof descriptions][language], `${route}: distinct hub description`);
    assert.ok(expected.includes('ICT') && expected.includes('2025') && description?.includes('ICT'), `${route}: hub names the mentorship`);
  }
  console.log('2025 search review passed: 24 bilingual lesson pages and 4 hub pages; reviewed topic terms, title/H1/description, social parity, language isolation, schema and reciprocal alternates.');
}
