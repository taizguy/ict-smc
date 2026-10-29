import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parse } from 'parse5';
import { languageAlternates } from '../src/i18n/locale';
import priority from '../src/data/audit4Descriptions.json';
import numbered from '../src/data/audit4NumberedDescriptions.json';
import lectures from '../src/data/audit4LectureDescriptions.json';
import { audit4Headings } from '../src/data/audit4Headings';
import worker from '../src/worker';

const manifest=JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8'));
const before=JSON.parse(fs.readFileSync('outputs/audit-batch-4/manifest-before.json','utf8'));
assert.deepEqual(manifest.map((r:any)=>r.path).sort(),before.map((r:any)=>r.path).sort(),'No route additions/deletions');
const descriptions={...priority,...numbered,...lectures};
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
const locations=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(locations.length,759);assert.equal(new Set(locations).size,759);
const titles=new Map<string,string>(),snippets=new Map<string,string>();let queryLinks=0,checked=0;
const walk=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(walk)];
const attr=(n:any,key:string)=>n.attrs?.find((a:any)=>a.name===key)?.value;
const text=(n:any):string=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join(' ');
for(const route of manifest) {
 const html=fs.readFileSync('dist/'+route.outputPath,'utf8'),nodes=walk(parse(html));
 const meta=(key:string)=>attr(nodes.find(n=>n.tagName==='meta'&&(attr(n,'name')===key||attr(n,'property')===key)),'content');
 const title=text(nodes.find(n=>n.tagName==='title'));
 assert.ok(title.trim()&&meta('description')?.trim(),`Missing metadata ${route.path}`);
 assert.equal(meta('description'),meta('og:description'),`${route.path}: OG parity`);
 assert.equal(meta('description'),meta('twitter:description'),`${route.path}: Twitter parity`);
 const old=before.find((r:any)=>r.path===route.path);assert.equal(title,old.title,`Title tag changed: ${route.path}`);
 const english=route.path.replace(/^\/ur(?=\/)/,'');
 const pair=descriptions[english];if(pair) assert.equal(meta('description'),pair[route.path.startsWith('/ur/')?'ur':'en']);
 if(audit4Headings[english]) {
  const h1=nodes.filter(n=>n.tagName==='h1');assert.equal(h1.length,1);
  assert.equal(text(h1[0]).replace(/\s+/g,' ').trim(),audit4Headings[english][route.path.startsWith('/ur/')?'ur':'en']);
 }
 for(const link of nodes.filter(n=>n.tagName==='a')) if(/[?&]mentorship=/.test(attr(link,'href')||'')) queryLinks++;
 for(const script of nodes.filter(n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json')) {
   const schema=JSON.parse(text(script));
   if(english.startsWith('/masood/lectures/')) for(const node of schema['@graph']||[schema]) if(node['@type']==='LearningResource') assert.equal(node.description,meta('description'),'Lecture schema summary agrees with metadata');
 }
 if(!route.indexable) continue;
 checked++;
 const normalized=(s:string)=>s.normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();
 for(const [map,value,label] of [[titles,title,'title'],[snippets,meta('description'),'description']] as const) {
  const key=normalized(value);assert.ok(!map.has(key),`Duplicate ${label}: ${map.get(key)} / ${route.path}`);map.set(key,route.path);
 }
 assert.ok(locations.includes('https://learnsmc.xyz'+route.path));
 assert.ok(nodes.some(n=>n.tagName==='link'&&attr(n,'rel')==='canonical'&&attr(n,'href')==='https://learnsmc.xyz'+route.path));
 const alternates=nodes.filter(n=>n.tagName==='link'&&attr(n,'rel')==='alternate'&&attr(n,'hreflang'));
 const expected=languageAlternates(route.path);assert.equal(alternates.length,expected.length);
 for(const a of expected) assert.ok(alternates.some(n=>attr(n,'hreflang')===a.language&&attr(n,'href')===a.href));
 for(const alternate of expected) if(alternate.language!=='x-default') {
   const target=manifest.find((r:any)=>r.path===new URL(alternate.href).pathname);assert.ok(target?.indexable,'Alternate target exists/indexable');
   const returns=languageAlternates(target.path);assert.ok(returns.some(a=>a.href==='https://learnsmc.xyz'+route.path),'Reciprocal alternate');
 }
}
assert.equal(queryLinks,0,'Generated internal anchors should use clean documents/fragments');
const redirects=[];
for(const locale of ['','/ur']) for(let step=1;step<=7;step++) {
 const path=`${locale}/tools/knowledge-graph/pipeline/step-${step}/`;
 const response=await worker.fetch(new Request('https://learnsmc.xyz'+path),{ASSETS:{fetch:async()=>new Response('unexpected asset lookup',{status:500})}});
 assert.equal(response.status,301);assert.equal(response.headers.get('Location'),'https://learnsmc.xyz'+locale+'/tools/knowledge-graph/');
 const target=manifest.find((r:any)=>r.path===locale+'/tools/knowledge-graph/');assert.ok(target?.indexable);
 redirects.push({source:path,destination:response.headers.get('Location'),status:response.status});
}
fs.writeFileSync('outputs/audit-batch-4/production-verification.json',JSON.stringify({documents:manifest.length,indexable:checked,sitemap:locations.length,queryLinks,redirects,missing:0,duplicateTitles:0,duplicateDescriptions:0,descriptionParity:true,titleTagsUnchanged:true},null,2));
console.log(`Metadata/canonical/hreflang/sitemap passed: ${manifest.length} documents, ${checked} indexable, 759 sitemap URLs; no missing/duplicate indexable metadata, no query anchors; 14 relevant graph redirects.`);
