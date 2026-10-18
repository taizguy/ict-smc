import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';
import { parse, type DefaultTreeAdapterTypes as HTML } from 'parse5';
import { urdu } from '../src/i18n/urdu';
import { lessonParagraphs } from '../src/utils/lessonText';

const entries = new Map<string, Set<string>>();
const normalize = (s: string) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&rarr;/g, '→').replace(/&larr;/g, '←').replace(/\s+/g, ' ').trim();
function add(value: string, source: string) {
  const key = normalize(value);
  if (!/[a-z]{2}/i.test(key) || /^(?:https?:|mailto:|tel:|\/|#(?!\d+:)|data:)/i.test(key) || !key) return;
  if ((key.match(/(?:^|\s)(?:inline-flex|bg-|px-|py-|rounded-|hover:|focus:|disabled:|grid-cols-|text-(?:ink|sm|xs|base))/g) || []).length >= 2) return;
  if (/^[a-z0-9]+(?:[_-][a-z0-9]+)+$/.test(key)) return;
  if (!entries.has(key)) entries.set(key, new Set());
  entries.get(key)!.add(source);
}
const ignoredProps = new Set(['id', 'slug', 'path', 'url', 'href', 'src', 'type', 'className', 'style', 'key', 'color', 'fill', 'stroke', 'd', 'asset', 'time', 'date', 'updated', 'datePublished', 'dateModified', 'videoId', 'youtubeId', 'canonical', 'outputPath']);
function sourceWalk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { if (entry.name !== 'i18n') sourceWalk(file); continue; }
    if (!/\.tsx?$/.test(file) || /\.generated\.ts$/.test(file)) continue;
    const sf = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    function visit(node: ts.Node) {
      const location = `${file.replace(/\\/g, '/')}:${sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1}`;
      if (ts.isJsxText(node)) add(node.text, location);
      else if (ts.isStringLiteralLike(node) || ts.isTemplateExpression(node)) {
        let ancestor: ts.Node | undefined = node.parent;
        let skip = false;
        while (ancestor && !ts.isSourceFile(ancestor)) {
          if (ts.isImportDeclaration(ancestor) || ts.isExportDeclaration(ancestor) || ts.isLiteralTypeNode(ancestor)) { skip = true; break; }
          if (ts.isJsxAttribute(ancestor) && !['title', 'alt', 'aria-label', 'aria-description', 'placeholder', 'label', 'text', 'children', 'narrative', 'description'].includes(ancestor.name.getText(sf))) { skip = true; break; }
          if (ts.isPropertyAssignment(ancestor) && ignoredProps.has(ancestor.name.getText(sf).replace(/^['"]|['"]$/g, ''))) { skip = true; break; }
          ancestor = ancestor.parent;
        }
        const text = ts.isTemplateExpression(node) ? node.head.text + node.templateSpans.map((span, i) => `{${i}}${span.literal.text}`).join('') : node.text;
        const chapterParagraphs = !skip && /chapters/i.test(file) && /\n\s*\n/.test(text);
        if (chapterParagraphs) for (const paragraph of lessonParagraphs(text)) add(paragraph, location);
        if (!skip && !chapterParagraphs && (/[a-z]\s+[a-z]/i.test(text) || /^[A-Z][A-Za-z ]+$/.test(text) || /[A-Za-z]{3}.*\{\d+\}/.test(text))) add(text, location);
      }
      ts.forEachChild(node, visit);
    }
    visit(sf);
  }
}
sourceWalk('src');
const documentRoot = process.env.PRERENDER_OUT_DIR || 'dist';
const manifest = (JSON.parse(fs.readFileSync(path.join(documentRoot, 'seo-manifest.json'), 'utf8')) as { path: string; outputPath: string }[]).filter(route => !route.path.startsWith('/ur/'));
const textAttrs = new Set(['alt', 'title', 'placeholder', 'aria-label', 'aria-description']);
const schemaTextKeys = new Set(['name', 'headline', 'description', 'text', 'articleSection', 'alternativeHeadline', 'about', 'educationalLevel', 'learningResourceType']);
function schemaWalk(value: unknown, location: string, key = '') {
  if (Array.isArray(value)) value.forEach(item => schemaWalk(item, location, key));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([name, item]) => schemaWalk(item, location, name));
  else if (typeof value === 'string' && schemaTextKeys.has(key)) add(value, location);
}
function htmlWalk(node: HTML.Node, location: string, skip = false) {
  if ('tagName' in node) {
    if (node.tagName === 'script' && node.attrs.some(attr => attr.name === 'type' && attr.value === 'application/ld+json')) {
      const text = node.childNodes.find(child => child.nodeName === '#text') as HTML.TextNode | undefined;
      if (text) schemaWalk(JSON.parse(text.value), location);
    }
    if (['script', 'style', 'code', 'pre'].includes(node.tagName)) skip = true;
    for (const attr of node.attrs) if (textAttrs.has(attr.name)) add(attr.value, location);
    if (node.tagName === 'meta' && node.attrs.some(a => a.name === 'name' && a.value === 'description')) add(node.attrs.find(a => a.name === 'content')?.value || '', location);
    if (node.tagName === 'p' && /\n\s*\n/.test(node.childNodes.map(function text(child): string { return child.nodeName === '#text' ? (child as HTML.TextNode).value : 'childNodes' in child ? child.childNodes.map(text).join('') : ''; }).join(''))) {
      const content = node.childNodes.map(function text(child): string { return child.nodeName === '#text' ? (child as HTML.TextNode).value : 'childNodes' in child ? child.childNodes.map(text).join('') : ''; }).join('');
      for (const paragraph of lessonParagraphs(content)) add(paragraph, location);
      return;
    }
  }
  if (node.nodeName === '#text' && !skip) add((node as HTML.TextNode).value, location);
  if ('childNodes' in node) node.childNodes.forEach(child => htmlWalk(child, location, skip));
}
for (const route of manifest) htmlWalk(parse(fs.readFileSync(path.join(documentRoot, route.outputPath), 'utf8')), route.path);
const items = [...entries].map(([english, sources]) => ({ id: crypto.createHash('sha256').update(english).digest('hex').slice(0, 16), english, urdu: urdu[english] || '', sources: [...sources] }));
fs.mkdirSync('outputs/urdu-localization', { recursive: true });
fs.writeFileSync('outputs/urdu-localization/translation-corpus.json', JSON.stringify(items, null, 2));
console.log(JSON.stringify({ segments: items.length, translated: items.filter(i => i.urdu).length, words: items.reduce((n, i) => n + i.english.split(/\s+/).length, 0) }, null, 2));
