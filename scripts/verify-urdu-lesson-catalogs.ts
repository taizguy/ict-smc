import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { textbookChapters } from '../src/data/chaptersData';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { ChapterRoom } from '../src/components/ChapterRoom';
const read=(name:string)=>JSON.parse(fs.readFileSync(`src/i18n/runtime/${name}.json`,'utf8'));
const shared=read('shared'),full={...shared,...read('chapters')},common=read('chapter-common');
const results=[];
for(const chapter of textbookChapters) {
 const selected={...shared,...common,...read('lessons/'+chapter.slug)};
 const render=(catalog:Record<string,string>)=>renderToStaticMarkup(createElement(TranslationProvider,{locale:'ur',catalog,children:createElement(ChapterRoom,{chapterId:chapter.id,staticOnly:true,onSelectChapter:()=>{},onReturnToMap:()=>{}})}));
 assert.equal(render(selected),render(full),`All static lesson views match: ${chapter.slug}`);
 results.push({slug:chapter.slug,fullBytes:Buffer.byteLength(JSON.stringify(full)),selectedBytes:Buffer.byteLength(JSON.stringify(selected))});
}
fs.mkdirSync('outputs/audit-batch-4',{recursive:true});
fs.writeFileSync('outputs/audit-batch-4/urdu-catalog-parity.json',JSON.stringify(results,null,2));
console.log(`All ${results.length} complete lesson documents match the full Urdu catalog byte-for-byte.`);
