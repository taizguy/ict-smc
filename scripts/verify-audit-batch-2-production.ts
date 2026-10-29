import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parse } from 'parse5';
import { auditedReadingRoute } from '../src/utils/auditedReadingRoutes';
import { essentialReading } from './audit-parity-content';
import { renderAuditedReading } from './audited-reading-document';

const manifest = JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8'));
const counts: Record<string,number> = {};
for (const route of manifest.filter((r:any)=>auditedReadingRoute(r.path))) {
  const html=fs.readFileSync('dist/'+route.outputPath,'utf8');
  const walk=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(walk)];
  const nodes=walk(parse(html));
  const attr=(n:any,k:string)=>n.attrs?.find((a:any)=>a.name===k)?.value;
  const heading=attr(nodes.find(n=>n.tagName==='meta'&&attr(n,'name')==='learnsmc-heading'),'content');
  const expected=essentialReading(renderAuditedReading(route.path,heading));
  const actual=new Set(essentialReading(html).map(t=>t.normalized));
  assert.ok(expected.length>0,route.path);
  for (const item of expected) assert.ok(actual.has(item.normalized),`${route.path}: ${item.text}`);
  assert.equal(attr(nodes.find(n=>n.tagName==='html'),'data-reading-enhancement'),'true');
  assert.equal(attr(nodes.find(n=>n.tagName==='html'),'lang'),route.path.startsWith('/ur/')?'ur':'en');
  const family=auditedReadingRoute(route.path)!;
  const key=`${route.path.startsWith('/ur/')?'ur':'en'}:${family}`;
  counts[key]=(counts[key]||0)+1;
  if (family==='chartlab') assert.ok(!html.includes('href="#chapter-quiz-13"')&&!html.includes('href="#curriculum-review-heading"'));
}
for(const locale of ['en','ur']) for(const [family,count] of Object.entries({chartlab:7,'fvg-glossary':1,ote:1,masood:118})) assert.equal(counts[`${locale}:${family}`],count);
fs.writeFileSync('outputs/audit-batch-2/production-route-checks.json',JSON.stringify(counts,null,2));
console.log('Production output passed: '+JSON.stringify(counts));
