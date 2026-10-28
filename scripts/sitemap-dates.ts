import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { parse } from 'parse5';

type Revision = { fingerprint: string; lastmod?: string; evidence?: string };
type History = { version: 1; pages: Record<string, Revision> };
const historyPath = path.resolve('src/data/page-revisions.json');
const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();

// Track meaningful page content, links, media and search metadata. CSS classes,
// layout, asset bundle hashes and the build clock must not make content fresh.
export function contentFingerprint(html: string): string {
  const values: string[] = [];
  function visit(node: any, insideMain = false, insideDiagram = false) {
    const attrs = Object.fromEntries((node.attrs || []).map((a: any) => [a.name, a.value]));
    const main = insideMain || node.tagName === 'main';
    const diagram = insideDiagram || (node.tagName === 'svg' && attrs.class?.split(' ').some((name:string)=>['chapter-diagram-canvas','m25-replay-preview','m26-alchemy-art'].includes(name)));
    if (['style', 'nav', 'footer'].includes(node.tagName)) return;
    if (node.tagName === 'script') {
      if (attrs.type === 'application/ld+json') {
        const json = (node.childNodes || []).map((n: any) => n.value || '').join('');
        values.push(JSON.stringify(JSON.parse(json)));
      }
      return;
    }
    if (main && node.nodeName === '#text' && normalize(node.value)) values.push(normalize(node.value));
    if (main) for (const key of ['href', 'src', 'alt', 'datetime', 'data-market-data-hash']) if (attrs[key]) values.push(`${key}:${attrs[key]}`);
    if (main && diagram) {
      values.push(node.tagName || node.nodeName);
      for (const key of ['viewBox', 'd', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'width', 'height', 'cx', 'cy', 'r', 'stroke-dasharray']) {
        if (attrs[key]) values.push(`${key}:${attrs[key]}`);
      }
      if (attrs.class?.startsWith('diagram-tone-')) values.push(attrs.class);
    }
    if (node.tagName === 'title') values.push((node.childNodes || []).map((n: any) => n.value || '').join(''));
    if (node.tagName === 'meta' && ['description', 'robots'].includes(attrs.name)) values.push(`${attrs.name}:${attrs.content}`);
    if (node.tagName === 'link' && ['canonical', 'alternate'].includes(attrs.rel)) values.push(JSON.stringify(attrs));
    for (const child of node.childNodes || []) visit(child, main, diagram);
  }
  visit(parse(html));
  return createHash('sha256').update(JSON.stringify(values)).digest('hex');
}

export function pageSnapshots(dist: string): Record<string, Revision> {
  const manifest = JSON.parse(fs.readFileSync(path.join(dist, 'seo-manifest.json'), 'utf8'));
  return Object.fromEntries(manifest.filter((r: any) => r.indexable).map((r: any) => [r.path,
    { fingerprint: contentFingerprint(fs.readFileSync(path.join(dist, r.outputPath), 'utf8')) }]));
}

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value))
    && new Date(value).toISOString().slice(0, 10) === value
    && value <= new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' });
}

export function applySitemapDates(dist: string) {
  const history: History = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  if (history.version !== 1) throw new Error('Unsupported page revision history');
  const current = pageSnapshots(dist);
  let dated = 0;
  const pending: string[] = [];
  const sitemapPath = path.join(dist, 'sitemap.xml');
  const xml = fs.readFileSync(sitemapPath, 'utf8').replace(/<url>[\s\S]*?<\/url>/g, entry => {
    entry = entry.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, '');
    const pathname = new URL(entry.match(/<loc>([^<]+)<\/loc>/)![1]).pathname;
    const saved = history.pages[pathname];
    if (!current[pathname]) throw new Error(`Sitemap route absent from indexable manifest: ${pathname}`);
    if (!saved || saved.fingerprint !== current[pathname].fingerprint) { pending.push(pathname); return entry; }
    if (!saved.lastmod) return entry; // Unknown historical date: omit rather than invent one.
    if (!validDate(saved.lastmod)) throw new Error(`Invalid/future lastmod for ${pathname}`);
    dated++;
    return entry.replace('</loc>', `</loc>\n    <lastmod>${saved.lastmod}</lastmod>`);
  });
  fs.writeFileSync(sitemapPath, xml);
  fs.mkdirSync('outputs/seo', { recursive: true });
  fs.writeFileSync('outputs/seo/pending-page-revisions.json', JSON.stringify(pending, null, 2));
  console.log(`Sitemap dates: ${dated} evidenced dates; ${pending.length} changed/new pages awaiting editorial recording.`);
}

// Explicit editorial operation; normal builds never rewrite dates or the ledger.
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const date = process.argv.find(a => a.startsWith('--date='))?.slice(7);
  if (!date || !validDate(date)) throw new Error('Supply a real editorial date: --date=YYYY-MM-DD (not in the future).');
  const dist = path.resolve(process.env.PRERENDER_OUT_DIR || 'dist');
  const history: History = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  const current = pageSnapshots(dist);
  let changed = 0;
  for (const [pathname, page] of Object.entries(current)) {
    const previous = history.pages[pathname];
    if (previous?.fingerprint === page.fingerprint) continue;
    if (previous?.lastmod && previous.lastmod > date) throw new Error(`Cannot move ${pathname} backwards`);
    history.pages[pathname] = { ...page, lastmod: date, evidence: 'Editorial content revision; rendered content fingerprint changed.' };
    changed++;
  }
  history.pages = Object.fromEntries(Object.entries(history.pages).filter(([pathname]) => current[pathname]).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2) + '\n');
  console.log(`Recorded ${changed} changed pages for ${date}; unchanged dates preserved.`);
  applySitemapDates(dist);
}
