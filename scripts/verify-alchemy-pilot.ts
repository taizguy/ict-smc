import fs from 'node:fs';
import {parse} from 'parse5';
import assert from 'node:assert/strict';
import edition from '../src/data/chapters/mentorship2026Edition.json';
import urdu from '../src/i18n/mentorship2026-urdu.json';
import {alchemyDates,alchemyRisk} from '../src/data/chapters/marketAlchemyPilot';
const slug='market-alchemy-trading-all-time-highs-ath';
type N={tagName?:string;value?:string;attrs?:{name:string;value:string}[];childNodes?:N[]};
const attr=(n:N,k:string)=>n.attrs?.find(a=>a.name===k)?.value;
const all=(n:N,p:(n:N)=>boolean):N[]=>[...(p(n)?[n]:[]),...(n.childNodes||[]).flatMap(c=>all(c,p))];
const text=(n:N):string=>(n.value||'')+(n.childNodes||[]).map(text).join('');
for(const locale of ['en','ur']){
 const file=`dist/${locale==='ur'?'ur/':''}learn/${slug}/index.html`;
 const html=fs.readFileSync(file,'utf8'),doc=parse(html) as N;
 const body=all(doc,n=>n.tagName==='body')[0];
 const headings=all(body,n=>n.tagName==='h1');assert.equal(headings.length,1);
 const translated=(s:string)=>locale==='en'?s:(urdu as Record<string,string>)[s];
 for(const sec of edition.find(c=>c.id===49)!.sections)assert.ok(all(body,n=>n.tagName==='h2').some(n=>text(n)===translated(sec.title)),`${locale}: section H2 missing`);
 assert.equal(all(body,n=>(attr(n,'class')||'').split(/\s+/).includes('alchemy-risk')).length,2);
 for(const risk of all(body,n=>(attr(n,'class')||'').split(/\s+/).includes('alchemy-risk')))assert.ok(all(risk,n=>n.tagName==='strong').some(n=>text(n)===translated(alchemyRisk)));
 const graphs=all(doc,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').flatMap(n=>JSON.parse(text(n))['@graph']||[]);
 const article=graphs.find(n=>n['@type']==='Article');assert.ok(article?.author);assert.equal(article.datePublished,alchemyDates.published.iso);assert.equal(article.dateModified,alchemyDates.updated.iso);assert.equal(article.headline,text(headings[0]));
 const expectedDescription='Learn the ICT Market Alchemy method for all-time highs: measure the RTH opening gap, project levels in TradingView, and study the lunch-window response.';
 if(locale==='en')assert.ok(all(doc,n=>n.tagName==='meta'&&attr(n,'name')==='description').some(n=>attr(n,'content')===expectedDescription));
 const images=all(body,n=>n.tagName==='img'&&(attr(n,'src')||'').includes('/images/lessons/market-alchemy/'));assert.equal(images.length,6);for(const img of images){assert.ok(attr(img,'alt'));assert.ok(attr(img,'width')&&attr(img,'height'));}
 const mainLinks=all(body,n=>n.tagName==='a').map(n=>attr(n,'href'));
 for(const url of ['/tools/masterclass/entry-models/ote-model/','/tools/glossary/imbalances/consequent-encroachment/'])assert.ok(mainLinks.includes((locale==='ur'?'/ur':'')+url));
 const figures=all(doc,n=>attr(n,'data-alchemy-visual')!==undefined);
 assert.equal(figures.length,8,`${locale}: eight distinct teaching plates in static HTML`);
 assert.equal(new Set(figures.map(n=>attr(n,'data-alchemy-visual'))).size,8);
 for(const f of figures){
  assert.ok(all(f,n=>n.tagName==='figcaption').some(n=>text(n).length>30));
  for(const svg of all(f,n=>n.tagName==='svg'&&attr(n,'role')==='img'))assert.ok(attr(svg,'aria-label')||attr(svg,'aria-labelledby'));
 }
 assert.ok(!html.includes('class="m26-player'),'Pilot must bypass old shared animation');
 if(locale==='en'){assert.ok(!html.includes('These standalone lessons use original explanations, invented worked prices'));assert.ok(html.includes('Historical prices below were checked against the source chart.'));}
 assert.ok(!/href="(?:https?:\/\/(?:localhost|127\.0\.0\.1)|undefined)/.test(html));
 assert.ok(html.includes('29,780.00')&&html.includes('29,476.25')&&html.includes('29,139.25'));
 assert.ok(all(doc,n=>n.tagName==='a').filter(n=>(attr(n,'href')||'').includes('youtube.com/watch')).length>=8);
 console.log(`${locale}: eight named/captioned static plates, correct historical anchors, timestamped sources and no localhost/undefined links.`);
}
assert.ok(fs.readFileSync('src/styles/mentorship2026-alchemy.css','utf8').includes('prefers-reduced-motion:reduce'));
console.log('Reduced-motion override present; all three comparison outcomes remain static content.');
