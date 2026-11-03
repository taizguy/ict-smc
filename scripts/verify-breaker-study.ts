import assert from 'node:assert/strict';
import fs from 'node:fs';
import {breakerCases,breakerBars,breakerEvidence,breakerMeta,BREAKER_PATH} from '../src/data/breakerStudy';
import {chartScenarios} from '../src/data/chartScenarios';
import {breakerSchema} from '../src/data/breakerSchema';
const opening=new Set<string>();
for(const c of breakerCases){
 const bars=breakerBars(c),e=breakerEvidence(c);opening.add(JSON.stringify(c.rows.slice(0,5)));
 for(const [i,b] of bars.entries()){
  assert.ok(b.high>=Math.max(b.open,b.close)&&b.low<=Math.min(b.open,b.close),`${c.id} candle ${i+1} OHLC invalid`);
  if(i)assert.equal(Date.parse(b.time)-Date.parse(bars[i-1].time),900000);
 }
 assert.ok(bars[3].close<bars[3].open);assert.equal(bars[3].low,c.zone[0]);assert.equal(bars[3].high,c.zone[1]);
 assert.ok(bars[4].close>c.zone[1]);assert.ok(e.swept);
 assert.equal(e.failed,c.kind!=='wick-only');
 assert.equal(e.retest>=0,['rejection','reclaim'].includes(c.kind));
 assert.equal(e.reclaim>=0,c.kind==='reclaim');assert.equal(e.rejection>=0,c.kind==='rejection');
 assert.equal(c.counts.at(-1),bars.length);assert.ok(c.counts.every((n,i)=>n<=bars.length&&(!i||n>=c.counts[i-1])));
 if(e.retest>=0)assert.ok(c.counts[3]>e.retest);
 if(c.kind==='wick-only')assert.ok(bars[6].low<c.zone[0]&&bars[6].close>c.zone[0]);
}
assert.equal(opening.size,4,'Cases must not share identical opening candles');
const a=breakerCases[0],s=chartScenarios.find(s=>s.id==='eurusd_failed_ob_breaker')!;
assert.equal(s.candles.length,a.rows.length);assert.deepEqual(s.candles.map(({open,high,low,close})=>[open,high,low,close]),a.rows);
for(const locale of ['en','ur'] as const){const schema=breakerSchema(locale);assert.equal(schema['@graph'].find(n=>n['@type']==='WebPage')!.url,'https://learnsmc.xyz'+(locale==='ur'?'/ur':'')+BREAKER_PATH);const nodes=schema['@graph'];assert.ok(nodes.every(n=>n['@type']));assert.ok(!JSON.stringify(schema).includes('datePublished'));
 const image=fs.readFileSync('public/images/social/eurusd-bearish-breaker-'+locale+'.png');assert.equal(image.readUInt32BE(16),1200);assert.equal(image.readUInt32BE(20),630);
}
const csv=fs.readFileSync('public/resources/eurusd-bearish-breaker-practice.csv','utf8').trim().split('\n');assert.equal(csv.length,1+breakerCases.reduce((sum,c)=>sum+c.rows.length,0));
for(const c of breakerCases){const rows=csv.slice(1).filter(r=>r.startsWith(c.id+','));assert.deepEqual(rows.map(r=>r.split(',').slice(6,10).map(Number)),c.rows);}
assert.ok(breakerMeta.title[0].length<60);assert.ok(breakerMeta.description[0].length>=120&&breakerMeta.description[0].length<=160);
console.log('Breaker model passed: 4 distinct openings, valid OHLC/time/zone/stage geometry, all 4 outcome branches, source scenario parity, exact CSV, localized schema and 1200×630 images.');
