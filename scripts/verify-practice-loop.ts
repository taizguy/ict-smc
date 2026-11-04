import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
import {practiceCaseFiles,spineCases,caseById,legacySpineRelations} from '../src/data/practiceCases';
import {practicePages} from '../src/data/practiceLoopContent';
import {loopTools} from '../src/components/practice/PracticeLoop';
import {remainingStudies} from '../src/data/chartLabRemainingContent';
import {casesFor} from '../src/data/chartLabRemaining';
import {silverCases} from '../src/data/silverBulletStudy';
import {breakerCases,breakerBars} from '../src/data/breakerStudy';
import {learningCases,evaluateCase} from '../src/data/learningCases';
import {CONCEPT_SLUG_MAP} from '../src/utils/glossaryRoutes';
import {newYorkInstant,sessionRows} from '../src/utils/practiceSessionTime';
import {readBars} from '../src/utils/backtestEngine';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {TradingToolsWorkbench} from '../src/components/TradingToolsWorkbench';
const out='outputs/practice-loop';fs.mkdirSync(out,{recursive:true});
// App resolves the Delivery root to its legacy default module. The canonical hub
// must win over that default, while an explicit calculator URL remains a module.
const deliveryRoot=renderToStaticMarkup(createElement(TradingToolsWorkbench,{initialTool:'ict_suite',deliveryModuleSlug:'macro-clock',documentPath:'/tools/delivery-suite/'}));
assert.ok(deliveryRoot.includes('data-practice-tool="delivery"'),'Delivery root fell back to the legacy module');
const a=(n:any,k:string)=>n?.attrs?.find((v:any)=>v.name===k)?.value;
const text=(n:any):string=>n?.value||(n?.childNodes||[]).map(text).join('');
const nodes=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(nodes)];
assert.equal(spineCases.length,6);assert.equal(new Set(practiceCaseFiles.map(c=>c.id)).size,practiceCaseFiles.length);
for(const c of practiceCaseFiles){assert.ok(c.title.every(Boolean)&&c.learningGoal.every(Boolean));assert.ok(c.estimatedMinutes>0);for(const id of c.glossaryTermIds)assert.ok(CONCEPT_SLUG_MAP[id],`${c.id}: unknown glossary ${id}`);assert.ok(c.sources.length);for(const v of c.variants)for(const b of v.candles){assert.equal(new Date(b.time).toISOString(),b.time);assert.ok(b.low<=Math.min(b.open,b.close)&&b.high>=Math.max(b.open,b.close));}for(const s of Object.values(c.toolStatus)){assert.equal(s.available,!!s.href);if(s.href){const [p,fragment]=s.href.split('#'),h=fs.readFileSync('dist'+p+'index.html','utf8');if(fragment)assert.ok(nodes(parse(h)).some(n=>a(n,'id')===fragment),s.href);}}}
for(const s of remainingStudies){const c=caseById(s.family)!;assert.deepEqual(c.conventions,s.rules);assert.deepEqual(c.variants.map(v=>v.candles),casesFor(s).map(v=>v.bars));}
assert.deepEqual(caseById('silver')!.variants.map(v=>v.candles),silverCases.map(v=>v.bars));assert.deepEqual(caseById('breaker')!.variants.map(v=>v.candles),breakerCases.map(breakerBars));
for(const c of learningCases)assert.deepEqual(caseById('guided-'+c.id)!.candles,c.bars);
for(const id of Object.values(legacySpineRelations))assert.ok(caseById(id));
assert.ok(learningCases.some(c=>evaluateCase(c,1.5,.05).reason),'There must be a legitimate skip/no-trade case');
assert.equal(newYorkInstant('2026-01-06','10:00').toISOString(),'2026-01-06T15:00:00.000Z');assert.equal(newYorkInstant('2026-07-07','10:00').toISOString(),'2026-07-07T14:00:00.000Z');
for(const r of sessionRows())assert.ok(r.end>r.start);assert.ok(sessionRows().some(r=>r.zone==='EST')&&sessionRows().some(r=>r.zone==='EDT'));
assert.equal(readBars(fs.readFileSync('public/downloads/practice-ohlc-template.csv','utf8')).length,40);
const results=[];
for(const tool of loopTools)for(const locale of ['en','ur'] as const){const n=locale==='ur'?1:0,prefix=n?'/ur':'',path=prefix+tool.path,html=fs.readFileSync('dist'+path+'index.html','utf8'),ns=nodes(parse(html)),head=ns.find(n=>n.tagName==='head'),hn=nodes(head),body=ns.find(n=>n.tagName==='body'),meta=(k:string)=>a(hn.find(n=>n.tagName==='meta'&&(a(n,'name')===k||a(n,'property')===k)),'content');
 assert.equal(ns.filter(n=>n.tagName==='h1').length,1,path);assert.ok(text(body).includes(tool.role[n]));assert.equal(ns.filter(n=>n.tagName==='nav'&&a(n,'class')==='practice-loop').length,1);assert.ok(!html.includes('Opening your page...'));assert.equal(a(hn.find(n=>n.tagName==='link'&&a(n,'rel')==='canonical'),'href'),'https://learnsmc.xyz'+path);
 for(const [lang,target]of [['en',tool.path],['ur','/ur'+tool.path],['x-default',tool.path]])assert.ok(hn.some(n=>n.tagName==='link'&&a(n,'hreflang')===lang&&a(n,'href')==='https://learnsmc.xyz'+target));
 if(tool.id!=='chartlab'){const page=practicePages[tool.id];assert.equal(text(hn.find(n=>n.tagName==='title')),page.title[n]);for(const k of ['description','og:description','twitter:description'])assert.equal(meta(k),page.description[n]);assert.equal(text(ns.find(n=>n.tagName==='h1')),page.h1[n]);if(!n)assert.ok(page.description[0].length>=150&&page.description[0].length<=160);const graph=JSON.parse(text(hn.find(n=>n.tagName==='script'&&a(n,'type')==='application/ld+json')))['@graph'];assert.ok(graph.some((n:any)=>n['@type']==='WebPage'&&n.author&&n.dateModified));assert.ok(graph.some((n:any)=>n['@type']==='BreadcrumbList'));}
 for(const node of ns.filter(n=>n.tagName==='a')){const href=a(node,'href');if(href?.startsWith('#'))assert.ok(ns.some(n=>a(n,'id')===href.slice(1)),`${path}: ${href}`);}
 const caseButtons=ns.filter(n=>a(n,'class')==='practice-open-case');caseButtons.forEach((b,i)=>assert.ok(text(b).trim().endsWith('ABCDEF'[i]),'Chooser case IDs must remain literal'));
 if(tool.id==='backtest'){const figure=ns.find(n=>a(n,'class')==='practice-illustration');assert.deepEqual(nodes(figure).filter(n=>n.tagName==='text').map(text),['A','B','C','D','E','F'],'Case IDs must not be translated into words');const reading=ns.find(n=>a(n,'class')==='practice-reading'),table=nodes(reading).find(n=>n.tagName==='table');assert.deepEqual(nodes(table).filter(n=>n.tagName==='th'&&a(n,'scope')==='row').map(text),['A','B','C','D','E','F'],'Table case IDs must remain literal');}
 assert.equal(ns.filter(n=>a(n,'data-case-id')!==undefined).length,6);assert.ok(ns.some(n=>a(n,'class')==='practice-takeaway'));assert.ok(ns.some(n=>a(n,'class')==='practice-next'));assert.ok(ns.some(n=>a(n,'class')==='practice-trust'));
 results.push({path,descriptionLength:meta('description')?.length,cards:6,passed:true});}
fs.writeFileSync(out+'/static-checks.json',JSON.stringify(results,null,2));console.log('Practice loop: eight EN/UR pages; case/rule/candle integrity; links, headings, metadata/schema, DST and CSV checks passed.');
