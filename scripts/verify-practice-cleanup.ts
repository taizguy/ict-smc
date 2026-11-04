import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
import {legacyPracticeMetadata} from '../src/data/legacyPracticeMetadata';
import {practicePages} from '../src/data/practiceLoopContent';
import tables from '../src/data/practiceReadingTables.generated.json';
import {sessionRows} from '../src/utils/practiceSessionTime';
import {learningCases,evaluateCase} from '../src/data/learningCases';
import {practiceCaseFiles} from '../src/data/practiceCases';
import {practiceCaseSummaries} from '../src/data/practiceCaseCatalog';
import artwork from '../src/data/chartHubArtwork.generated.json';
import {ChartHubArtwork} from '../src/data/chartHubArtwork';
import {chartLabStudies} from '../src/data/chartLabHub';
import {toolRouteStudies} from '../src/data/toolRouteStudies';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const all=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(all)],text=(n:any):string=>n?.value||(n?.childNodes||[]).map(text).join(''),attr=(n:any,k:string)=>n?.attrs?.find((a:any)=>a.name===k)?.value;
for(const [route,meta]of Object.entries(legacyPracticeMetadata))for(const n of [0,1]){
 const path=(n?'/ur':'')+route,html=fs.readFileSync('dist'+path+'index.html','utf8'),nodes=all(parse(html)),head=all(nodes.find(v=>v.tagName==='head'));
 assert.equal(text(head.find(v=>v.tagName==='title')),meta.title[n],path);
 assert.equal(text(nodes.find(v=>v.tagName==='h1')),meta.h1[n],path);
 for(const property of ['og:title','twitter:title'])assert.equal(attr(head.find(v=>attr(v,'property')===property||attr(v,'name')===property),'content'),meta.title[n]);
 assert.ok(!/25 Pips|Scalping|OSOK Swing|OTE 70\.5%|Engine/.test(meta.h1[0]));
}
assert.equal(practicePages.delivery.title[0],'ICT Delivery Suite: Risk Plan, Killzones & OTE | LearnSMC');assert.ok(practicePages.delivery.title[0].length<=60);
for(const [language,locale]of [['en','en-GB'],['ur','ur-PK']] as const)assert.deepEqual(tables.sessions[language],JSON.parse(JSON.stringify(sessionRows(locale))));
assert.deepEqual(tables.backtest,learningCases.map(c=>{const r=evaluateCase(c,1.5,.05),o=r.order;return {id:c.id,reason:r.reason||null,order:o?{status:o.status,filledAt:o.filledAt??null,r:o.r??null}:null};}));
for(const summary of practiceCaseSummaries){const source=practiceCaseFiles.find(c=>c.id===summary.id)!;assert.ok(source);for(const key of Object.keys(summary))assert.deepEqual(summary[key as keyof typeof summary],JSON.parse(JSON.stringify(source[key as keyof typeof source])));assert.ok(!('candles'in summary)&&!('variants'in summary));}
for(const study of chartLabStudies)for(const language of ['en','ur']as const)assert.equal(artwork[study.slug as keyof typeof artwork][language],renderToStaticMarkup(createElement(ChartHubArtwork,{study,ur:language==='ur',playing:true})));
for(const [family,studies]of Object.entries(toolRouteStudies))for(const [slug,study]of Object.entries(studies))assert.deepEqual(JSON.parse(fs.readFileSync('src/data/runtime/tool-briefs/'+family+'/'+slug+'.json','utf8')),study,'Exact per-route brief projection');
const manifest=JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8'));
// Existing native Urdu editorial budget is 90 Unicode characters. It is a
// documented language exception, not an indexing rule or an English exemption.
for(const r of manifest)assert.ok(r.title.length<=(r.path.startsWith('/ur/')?90:60),r.path+' title budget');
console.log('Legacy practice cleanup: 24 native titles/H1s/social titles, Delivery title and documented EN/UR title budgets passed.');
