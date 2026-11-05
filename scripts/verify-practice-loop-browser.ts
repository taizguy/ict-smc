import fs from 'node:fs';
import assert from 'node:assert/strict';
import {essentialReading} from './audit-parity-content';
import {parse} from 'parse5';
const directory='outputs/practice-loop',samples=JSON.parse(fs.readFileSync(directory+'/browser-reading.json','utf8'));
assert.equal(new Set(samples.map((s:any)=>s.path)).size,8);
const attr=(n:any,k:string)=>n?.attrs?.find((a:any)=>a.name===k)?.value;
const all=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(all)];
const failures=[];
for(const s of samples){const html=fs.readFileSync('dist'+s.path+'index.html','utf8'),expected=essentialReading(html),present=new Set(s.essential.map((v:any)=>v.normalized));const missing=expected.filter(v=>!present.has(v.normalized));if(missing.length)failures.push({path:s.path,missing});assert.ok(s.scrollWidth<=s.width+1,s.path+' overflow');const doc=all(parse(html)),main=doc.find(n=>n.tagName==='main');for(const a of all(main).filter(n=>n.tagName==='a')){const href=attr(a,'href');if(href?.startsWith('/')&&!s.links.includes(href))failures.push({path:s.path,missingLink:href});}}
fs.writeFileSync(directory+'/browser-parity-result.json',JSON.stringify({samples:samples.length,passed:!failures.length,failures},null,2));assert.deepEqual(failures,[]);
console.log('Eight native EN/UR hubs: normalized essential paragraphs/headings and internal links present at runtime, with no blanket exemptions.');
