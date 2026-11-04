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
 const expected=fs.readFileSync('dist'+sample.path+'index.html','utf8');
 const actual=new Set(essentialReading(sample.html).map(v=>v.normalized));
 const missing=essentialReading(expected).filter(v=>!actual.has(v.normalized));
 const links=(html:string)=>all(parse(html)).filter(n=>n.tagName==='main').flatMap(all).filter(n=>n.tagName==='a').map(n=>attr(n,'href')).filter(h=>h?.startsWith('/'));
 const runtimeLinks=new Set(links(sample.html)),missingLinks=[...new Set(links(expected))].filter(h=>!runtimeLinks.has(h));
 results.push({path:sample.path,missing,missingLinks,overflow:sample.scrollWidth>sample.width,ready:sample.enhancement==='ready'});
}
fs.writeFileSync('outputs/practice-performance/runtime-parity.json',JSON.stringify(results,null,2));
assert.equal(new Set(results.map(r=>r.path)).size,32);
assert.deepEqual(results.filter(r=>r.missing.length||r.missingLinks.length||r.overflow||!r.ready),[]);
console.log('32 native EN/UR hubs and changed legacy routes: headings, paragraphs and internal links match; no overflow or broad exemptions.');
