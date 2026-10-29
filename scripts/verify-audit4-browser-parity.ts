import fs from 'node:fs';
import assert from 'node:assert/strict';
import { essentialReading } from './audit-parity-content';
const samples=JSON.parse(fs.readFileSync('outputs/audit-batch-4/browser-parity.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8'));
assert.ok(samples.length>=8);
for(const sample of samples) {
 const route=manifest.find((r:any)=>r.path===new URL(sample.url).pathname);assert.ok(route);
 const expected=essentialReading(fs.readFileSync('dist/'+route.outputPath,'utf8'));
 const present=new Set(sample.essential.map((entry:any)=>entry.normalized));
 const missing=expected.filter(entry=>!present.has(entry.normalized));
 assert.deepEqual(missing,[],`${sample.url}: missing essential reading`);
 assert.ok(sample.visible&&!sample.overflow);
 if(sample.mode.endsWith('ready'))assert.equal(sample.startup,'ready');
}
fs.writeFileSync('outputs/audit-batch-4/browser-parity-result.json',JSON.stringify({samples:samples.length,passed:true},null,2));
console.log(`Fresh production static/runtime essential heading/paragraph parity passed: ${samples.length} EN/UR browser snapshots.`);
