import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { searchDescription } from '../src/utils/searchMetadata';
import priority from '../src/data/audit4Descriptions.json';
import numbered from '../src/data/audit4NumberedDescriptions.json';
import { audit4Headings } from '../src/data/audit4Headings';
import { urdu } from '../src/i18n/urdu';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { LearningFirstHome } from '../src/components/LearningFirstHome';
import { CurriculumView } from '../src/components/CurriculumView';

const descriptions={...priority,...numbered};
assert.equal(Object.keys(numbered).length,21);
const numberedPaths=fs.readFileSync('docs/technical-seo-audit-2026-10-28-affected-urls.csv','utf8').split(/\r?\n/).filter(line=>line.includes('Unit-prefixed snippet review')).map(line=>new URL(line.split(',')[2]).pathname);
assert.deepEqual(Object.keys(numbered).sort(),numberedPaths.sort());
for(const [path,pair] of Object.entries(descriptions)) {
  assert.equal(searchDescription('ignored','ignored',path),pair.en);
  assert.equal(searchDescription('ignored','ignored','/ur'+path),pair.ur);
  assert.equal(urdu[pair.en],pair.ur);
  assert.match(pair.ur,/[\u0600-\u06ff]/);
  assert.ok(!/^#\d+:/.test(pair.en));
}
for(const [path,pair] of Object.entries(audit4Headings)) for(const locale of ['en','ur'] as const) {
  const view=path==='/'?createElement(LearningFirstHome):createElement(CurriculumView,{path, onSelectChapter:()=>{},onOpenSearch:()=>{}});
  const html=renderToStaticMarkup(createElement(TranslationProvider,{locale,catalog:urdu,children:view}));
  assert.ok(html.includes(`<h1>${pair[locale]}</h1>`));
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.ok(html.includes(path==='/'?'home-tagline':'rr-tagline'));
}
fs.mkdirSync('outputs/audit-batch-4',{recursive:true});
console.log(`Batch 4 source checks: ${Object.keys(descriptions).length} EN/UR descriptions and two paired H1s.`);
