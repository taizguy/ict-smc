import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse,serialize} from 'parse5';
import {journalEditions} from '../src/data/masterclassJournal';
// Component CSS imports are handled by Vite; static body renderer uses a tsx
// loader that ignores styles, see the paired execution command in the report.
import {MasterclassJournal,journalSchema} from '../src/components/MasterclassJournal';
import {masterclassCollection} from '../src/data/masterclassData';
import {getMasterclassUrl} from '../src/utils/workbenchToolRoutes';
import {masterclassJournalForPath} from '../src/utils/masterclassJournalRoutes';
const walk=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(walk)];
const attr=(n:any,k:string)=>n.attrs?.find((a:any)=>a.name===k)?.value;
fs.mkdirSync('outputs/masterclass-journal',{recursive:true});
const compositions=new Map<string,number>();
for(const lesson of Object.values(journalEditions)){
 const item=masterclassCollection.find(m=>m.number===lesson.number)!;const path=getMasterclassUrl(item);
 const html=renderToStaticMarkup(createElement(MasterclassJournal,{lesson}));
 const nodes=walk(parse(html));
 assert.equal(nodes.filter(n=>n.tagName==='h1').length,1);
 const figures=nodes.filter(n=>n.tagName==='figure');
 if(lesson.number===3){
  assert.ok(html.includes(item.coreRule));
  for(const text of [...item.orderOfOperations,...item.keyMistakes,...item.invalidationChecklist,...item.riskRules,...item.stepByStepBreakdown.map(s=>s.detail)])assert.ok(html.includes(text));
  assert.ok(!html.includes('id="worked-example"'));
  assert.ok(!html.includes('id="failed-example"'));
 }else assert.equal(figures.length,lesson.steps.length+2);
 for(const figure of figures){const children=walk(figure);assert.ok(children.some(n=>n.tagName==='figcaption'));const svg=children.find(n=>n.tagName==='svg'&&attr(n,'aria-label'));assert.ok(svg);const composition=serialize(svg).replace(/<title>[\s\S]*?<\/title>|<text\b[^>]*>[\s\S]*?<\/text>/g,'').replace(/\s+/g,' ').trim();assert.ok(!compositions.has(composition),`Repeated label-free composition: ${lesson.number} and ${compositions.get(composition)}`);compositions.set(composition,lesson.number);}
 const targets=new Set(nodes.map(n=>attr(n,'id')).filter(Boolean));
 for(const link of nodes.filter(n=>n.tagName==='a'&&attr(n,'href')?.startsWith('#')))assert.ok(targets.has(attr(link,'href').slice(1)));
 if(lesson.number!==3)assert.ok(html.includes(lesson.worked.prices.map(p=>p.price).at(-1)!.toString()));
 for(const f of lesson.faq){assert.ok(html.includes(f.question));assert.ok(html.includes(f.answer));}
 assert.ok(!/Source verification pending|Last reviewed: not recorded|shown for layout review|astonishing precision|lock in 75%/i.test(html));
 for(const step of lesson.steps)assert.ok(step.paragraphs.some(p=>/\d/.test(p)));
 const schema=journalSchema(lesson,path);assert.equal(schema['@graph'][0].datePublished,'2026-10-24');
 if(lesson.release==='draft')assert.equal(masterclassJournalForPath(path),undefined,'Draft must not silently publish');
 fs.writeFileSync(`outputs/masterclass-journal/${lesson.number}-body.html`,html);
 fs.writeFileSync(`outputs/masterclass-journal/${lesson.number}-schema.json`,JSON.stringify(schema,null,2));
 console.log(`Unit ${lesson.number}: one H1, ${figures.length} captioned SVGs, ${lesson.faq.length} visible FAQs, content, fragment targets and draft release guard passed.`);
}
console.log(`${compositions.size} distinct label-free figure compositions across authored editions.`);
