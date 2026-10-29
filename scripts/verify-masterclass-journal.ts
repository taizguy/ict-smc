import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse} from 'parse5';
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
for(const lesson of Object.values(journalEditions)){
 const item=masterclassCollection.find(m=>m.number===lesson.number)!;const path=getMasterclassUrl(item);
 const html=renderToStaticMarkup(createElement(MasterclassJournal,{lesson}));
 const nodes=walk(parse(html));
 assert.equal(nodes.filter(n=>n.tagName==='h1').length,1);
 const figures=nodes.filter(n=>n.tagName==='figure');assert.equal(figures.length,lesson.steps.length+2);
 for(const figure of figures){const children=walk(figure);assert.ok(children.some(n=>n.tagName==='figcaption'));assert.ok(children.some(n=>n.tagName==='svg'&&attr(n,'aria-label')));}
 const targets=new Set(nodes.map(n=>attr(n,'id')).filter(Boolean));
 for(const link of nodes.filter(n=>n.tagName==='a'&&attr(n,'href')?.startsWith('#')))assert.ok(targets.has(attr(link,'href').slice(1)));
 assert.ok(html.includes(lesson.worked.prices.map(p=>p.price).at(-1)!.toString()));
 for(const f of lesson.faq){assert.ok(html.includes(f.question));assert.ok(html.includes(f.answer));}
 assert.ok(!/Source verification pending|Last reviewed: not recorded|shown for layout review|astonishing precision|lock in 75%/i.test(html));
 for(const step of lesson.steps)assert.ok(step.paragraphs.some(p=>/\d/.test(p)));
 const schema=journalSchema(lesson,path);assert.equal(schema['@graph'][0].datePublished,'2026-10-24');
 if(lesson.release==='draft')assert.equal(masterclassJournalForPath(path),undefined,'Draft must not silently publish');
 fs.writeFileSync(`outputs/masterclass-journal/${lesson.number}-body.html`,html);
 fs.writeFileSync(`outputs/masterclass-journal/${lesson.number}-schema.json`,JSON.stringify(schema,null,2));
 console.log(`Unit ${lesson.number}: one H1, ${figures.length} captioned SVGs, ${lesson.faq.length} visible FAQs, exact prices, fragment targets and draft release guard passed.`);
}
