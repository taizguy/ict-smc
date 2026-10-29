import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { searchDescription } from '../src/utils/searchMetadata';
import priority from '../src/data/audit4Descriptions.json';
import numbered from '../src/data/audit4NumberedDescriptions.json';
import lectureDescriptions from '../src/data/audit4LectureDescriptions.json';
import takeaways from '../src/data/audit4LectureTakeaways.json';
import lectureEvidence from '../docs/audit-batch-4-lecture-evidence.json';
import { masoodPlaylistsData } from '../src/data/masoodData';
import { MasoodLecturePage } from '../src/components/MasoodLecturePage';
import { normalizeReading } from './audit-parity-content';
import { parse } from 'parse5';
import { audit4Headings } from '../src/data/audit4Headings';
import { urdu } from '../src/i18n/urdu';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { LearningFirstHome } from '../src/components/LearningFirstHome';
import { CurriculumView } from '../src/components/CurriculumView';

const descriptions={...priority,...numbered,...lectureDescriptions};
assert.equal(Object.keys(lectureDescriptions).length,118);
assert.equal(new Set(Object.values(takeaways).map(pair=>pair[0])).size,118,'Unique English lecture suffixes');
assert.equal(new Set(Object.values(takeaways).map(pair=>pair[1])).size,118,'Unique Urdu lecture suffixes');
const text=(node:any):string=>node.nodeName==='#text'?node.value:(node.childNodes||[]).map(text).join(' ');
for(const lecture of masoodPlaylistsData.flatMap(p=>p.lectures)) {
 const path=`/masood/lectures/${lecture.id}/`,pair=lectureDescriptions[path],evidence=lectureEvidence[path],ending=takeaways[lecture.id];
 assert.ok(pair.en.startsWith(evidence.preservedPrefix+' '),'Existing lecture prefix retained');
 assert.ok(pair.en.endsWith(ending[0])&&pair.ur.endsWith(ending[1]));
 assert.ok(!/guarantee|100%|90%|highest.probability|profit promise/i.test(ending[0]));
 assert.equal(evidence.sourceTitle,lecture.title);
 assert.equal(evidence.sourceSummary,lecture.shortSummary);
 assert.deepEqual(evidence.coreRules,lecture.coreRules);
 const visible=normalizeReading(text(parse(renderToStaticMarkup(createElement(MasoodLecturePage,{lecture})))));
 assert.ok(visible.includes(normalizeReading(lecture.shortSummary)),`${path}: source summary visible`);
 for(const rule of lecture.coreRules) assert.ok(visible.includes(normalizeReading(rule)),`${path}: source rule visible`);
}
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
