import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
import {masterclassCollection} from '../src/data/masterclassData';
import {journalEditions} from '../src/data/masterclassJournal';
import {getMasterclassUrl} from '../src/utils/workbenchToolRoutes';
import {t} from '../src/i18n/translate';
import {urdu} from '../src/i18n/urdu';
import questions from '../src/data/masterclassLearnerQuestions.json';
import reviewedMetadata from '../src/data/masterclassSearchMetadata.json';

type Node={tagName?:string;value?:string;attrs?:{name:string;value:string}[];childNodes?:Node[]};
const attr=(n:Node,k:string)=>n.attrs?.find(a=>a.name===k)?.value;
const all=(n:Node,p:(n:Node)=>boolean):Node[]=>[...(p(n)?[n]:[]),...(n.childNodes||[]).flatMap(c=>all(c,p))];
const text=(n:Node):string=>(n.value||'')+(n.childNodes||[]).map(text).join('');
const has=(n:Node,c:string)=>(attr(n,'class')||'').split(/\s+/).includes(c);
const normalize=(s:string)=>s.replace(/\s+/g,' ').trim();
let checked=0;
const seenTitles=new Set<string>(),seenDescriptions=new Set<string>();
assert.equal(masterclassCollection.length,29);
assert.equal(Object.keys(questions).length,29);
for(const locale of ['en','ur'] as const)for(const item of masterclassCollection){
 const pathname=(locale==='ur'?'/ur':'')+getMasterclassUrl(item);
 const edition=journalEditions[item.number],translate=(s:string)=>t(s,locale,urdu);
 const doc=parse(fs.readFileSync(`dist${pathname}index.html`,'utf8')) as Node;
 const body=all(doc,n=>n.tagName==='body')[0],head=all(doc,n=>n.tagName==='head')[0];
 const cards=all(body,n=>has(n,'mj-faq-card'));
 assert.equal(cards.length,edition.faq.length,pathname+' FAQ count');
 assert.ok(all(body,n=>has(n,'mj-outcomes')).length,pathname+' outcome card');
 assert.equal(all(body,n=>has(n,'mj-step')).length,item.stepByStepBreakdown.length,pathname+' step cards');
 const sequence=all(body,n=>attr(n,'id')==='sequence')[0];
 assert.equal(attr(sequence,'data-pinned'),'false',pathname+' static sequence must be readable');
 assert.equal(all(sequence,n=>n.tagName==='li').length,item.orderOfOperations.length);
 for(const step of item.orderOfOperations)assert.ok(normalize(text(sequence)).includes(normalize(translate(step))),pathname+' sequence text');
 assert.equal(all(body,n=>attr(n,'id')==='related-concepts').length,0);
 assert.equal(all(body,n=>has(n,'mj-review-cards')).length,1);
 assert.equal(all(body,n=>n.tagName==='h1').length,1);
 for(const f of edition.faq){
  assert.ok(normalize(text(body)).includes(normalize(translate(f.question))),pathname+' visible question');
  assert.ok(normalize(text(body)).includes(normalize(translate(f.answer))),pathname+' raw HTML answer');
 }
 const custom=questions[String(item.number) as keyof typeof questions];
 if(locale==='ur'){
  assert.equal(translate(custom.question),custom.urQuestion);
  assert.equal(translate(custom.answer),custom.urAnswer);
 }
 const canonical=all(head,n=>n.tagName==='link'&&attr(n,'rel')==='canonical')[0];
 assert.equal(attr(canonical,'href'),'https://learnsmc.xyz'+pathname);
 const meta=(key:string)=>attr(all(head,n=>n.tagName==='meta'&&(attr(n,'name')===key||attr(n,'property')===key))[0]||{},'content');
 const reviewed=reviewedMetadata[String(item.number) as keyof typeof reviewedMetadata];
 const expectedTitle=locale==='ur'?reviewed.urTitle:reviewed.title;
 const expectedDescription=locale==='ur'?reviewed.urDescription:reviewed.description;
 assert.equal(text(all(head,n=>n.tagName==='title')[0]),expectedTitle,pathname+' reviewed title');
 assert.equal(normalize(text(all(body,n=>n.tagName==='h1')[0])),locale==='ur'?reviewed.urH1:reviewed.h1,pathname+' reviewed H1');
 assert.equal(meta('description'),expectedDescription,pathname+' reviewed description');
 assert.equal(meta('og:title'),expectedTitle);assert.equal(meta('twitter:title'),expectedTitle);
 assert.ok(!seenTitles.has(expectedTitle),'Duplicate lesson title: '+pathname);seenTitles.add(expectedTitle);
 assert.ok(!seenDescriptions.has(expectedDescription),'Duplicate lesson description: '+pathname);seenDescriptions.add(expectedDescription);
 assert.equal(meta('description'),meta('og:description'));assert.equal(meta('description'),meta('twitter:description'));
 for(const [language,prefix]of [['en',''],['ur','/ur'],['x-default','']])assert.ok(all(head,n=>n.tagName==='link'&&attr(n,'hreflang')===language&&attr(n,'href')==='https://learnsmc.xyz'+prefix+getMasterclassUrl(item)).length,pathname+' hreflang '+language);
 const scripts=all(doc,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json');
 const schemas=scripts.map(s=>JSON.parse(text(s)));
 const entities=schemas.flatMap(s=>s['@graph']||[s]);
 const article=entities.find(n=>n['@type']==='Article');assert.ok(article,pathname+' Article schema');
 assert.equal(article.headline,locale==='ur'?reviewed.urH1:reviewed.h1,pathname+' Article headline');
 assert.equal(article.description,expectedDescription,pathname+' Article description');
 const faq=entities.find(n=>n['@type']==='FAQPage');assert.ok(faq,pathname+' FAQ schema');
 assert.equal(faq.mainEntity.length,edition.faq.length);
 for(const f of edition.faq)assert.ok(faq.mainEntity.some((q:{name:string;acceptedAnswer:{text:string}})=>q.name===translate(f.question)&&q.acceptedAnswer.text===translate(f.answer)),pathname+' schema/content parity');
 checked++;
}
console.log(`Masterclass UI: ${checked} EN/UR lesson documents passed; all steps and FAQ answers in raw HTML; canonical/hreflang/meta/schema parity passed.`);
