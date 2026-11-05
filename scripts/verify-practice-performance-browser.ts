import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
import {essentialReading} from './audit-parity-content';
const dir='outputs/practice-performance/runtime';
const all=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(all)];
const attr=(n:any,k:string)=>n.attrs?.find((a:any)=>a.name===k)?.value;
const results=[];
for(const file of fs.readdirSync(dir).filter(f=>f.endsWith('.json'))){
 const sample=JSON.parse(fs.readFileSync(dir+'/'+file,'utf8'));
 assert.ok(!sample.html.includes('[Truncated]'),'Browser capture truncated: '+sample.path);
 const expected=fs.readFileSync('dist'+sample.path+'index.html','utf8');
 const actual=new Set(essentialReading(sample.html).map(v=>v.normalized));
 const missing=essentialReading(expected).filter(v=>!actual.has(v.normalized));
 const links=(html:string)=>all(parse(html)).filter(n=>n.tagName==='main').flatMap(all).filter(n=>n.tagName==='a').map(n=>attr(n,'href')).filter(h=>h?.startsWith('/'));
 const runtimeLinks=new Set(links(sample.html)),missingLinks=[...new Set(links(expected))].filter(h=>!runtimeLinks.has(h));
 results.push({path:sample.path,missing,missingLinks,overflow:sample.scrollWidth>sample.width,ready:sample.enhancement==='ready'});
}
fs.writeFileSync('outputs/practice-performance/runtime-parity.json',JSON.stringify(results,null,2));
assert.equal(new Set(results.map(r=>r.path)).size,44);
assert.deepEqual(results.filter(r=>r.missing.length||r.missingLinks.length||r.overflow||!r.ready),[]);
console.log('44 native EN/UR hubs, legacy routes and Chart Lab studies: headings, paragraphs and internal links match; no overflow or broad exemptions.');

const freeResults=[];
for(const file of fs.readdirSync('outputs/practice-performance/script-free').filter(f=>f.endsWith('.json'))){const sample=JSON.parse(fs.readFileSync('outputs/practice-performance/script-free/'+file,'utf8'));const source=fs.readFileSync('dist'+sample.path+'index.html','utf8');const actual=new Set(sample.essential),missing=essentialReading(source).filter(v=>!actual.has(v.normalized));const ns=all(parse(source)),main=ns.find(n=>n.tagName==='main');const missingLinks=[...new Set(all(main).filter(n=>n.tagName==='a').map(n=>attr(n,'href')).filter(h=>h?.startsWith('/')))].filter(h=>!sample.links.includes(h));freeResults.push({path:sample.path,missing,missingLinks,visible:sample.visible,h1s:sample.h1s,scripts:sample.scripts});}
fs.writeFileSync('outputs/practice-performance/script-free-parity.json',JSON.stringify(freeResults,null,2));assert.equal(freeResults.length,44);assert.deepEqual(freeResults.filter(r=>r.missing.length||r.missingLinks.length||!r.visible||r.scripts||r.h1s!==1),[]);console.log('All 44 script-blocked native documents retain their essential text, links and one visible H1.');
