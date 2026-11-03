import fs from 'node:fs';import assert from 'node:assert/strict';
import {silverCases,silverEvidence,silverQuestions,silverCsv,silverMeta} from '../src/data/silverBulletStudy';
import {utcMillis,closeTime,nyClock,amFormationWindow,beforeAmExpiry} from '../src/utils/chartStudyTime';
for(const c of silverCases){
 for(const [bars,minutes] of [[c.context,5],[c.bars,1]] as const){for(let i=0;i<bars.length;i++){const b=bars[i];utcMillis(b.time);assert.ok(b.high>=Math.max(b.open,b.close)&&b.low<=Math.min(b.open,b.close)&&b.high>=b.low,c.id+' OHLC');for(const v of [b.open,b.high,b.low,b.close])assert.ok(Number.isInteger(v*4),c.id+' tick');assert.equal(Date.parse(closeTime(b.time,minutes))-Date.parse(b.time),minutes*60000);if(i)assert.equal(Date.parse(b.time)-Date.parse(bars[i-1].time),minutes*60000,c.id+' continuity');}}
 assert.equal(closeTime(c.context.at(-1)!.time,5),c.bars[0].time,'Context ends at execution start');
 const e=silverEvidence(c);assert.equal(e.outcome,c.expected,c.id+' computed outcome');assert.ok(e.low<e.ce&&e.ce<e.stop,'Short side');assert.ok(c.swing+1<c.sweep&&c.sweep<c.gapStart,'No future swing/sweep');assert.ok(c.bars[c.swing].low<c.bars[c.swing-1].low&&c.bars[c.swing].low<c.bars[c.swing+1].low,'Confirmed swing');
 assert.equal(c.counts.length,5);assert.equal(c.counts.at(-1),c.bars.length);assert.ok(c.counts.every((v,i)=>v>=3&&v<=c.bars.length&&(!i||v>c.counts[i-1])));assert.ok(c.counts[1]>c.sweep&&c.counts[2]>c.gapStart+2,'Evidence revealed before question');
 if(c.id==='s-c'){assert.equal(e.rules.timing,false);assert.ok(e.rules.sweep&&e.rules.shift&&e.rules.gap,'Near-miss fails only time');}
 else if(c.id==='s-e'){assert.equal(e.rules.shift,false);assert.ok(e.rules.sweep&&e.rules.timing&&e.rules.gap,'Near-miss fails only swing');}
 else assert.ok(e.qualified);
 if(e.exit>=0){assert.ok(e.exit>e.touch,'Do not infer intrabar fill/exit ordering');assert.notEqual(e.outcome,'ambiguous');}
 if(c.id==='s-d'){assert.equal(e.touch,-1);assert.ok(nyClock(closeTime(c.bars.at(-1)!.time,1)).minute>=660);assert.equal(e.ce-Math.max(...c.bars.slice(c.gapStart+3).filter(b=>beforeAmExpiry(b.time)).map(b=>b.high)),.5,'Near return stays half a point short');}
 const qs=silverQuestions(c);assert.equal(qs.length,5);for(const q of qs){assert.ok(q.correct>=0&&q.correct<q.options.length);assert.ok(q.prompt[0]&&q.prompt[1]&&q.explanation[1]);}
}
assert.equal(nyClock('2026-01-06T15:00:00.000Z').minute,600);assert.equal(nyClock('2026-07-07T14:00:00.000Z').minute,600);
assert.equal(nyClock('2026-03-08T06:59:00.000Z').minute,119);assert.equal(nyClock('2026-03-08T07:00:00.000Z').minute,180);
assert.equal(nyClock('2026-11-01T05:59:00.000Z').minute,119);assert.equal(nyClock('2026-11-01T06:00:00.000Z').minute,60);
assert.throws(()=>utcMillis('2026-02-31T15:00:00.000Z'),'Invalid calendar date');
assert.equal(closeTime('2026-01-06T14:59:00.000Z',1),'2026-01-06T15:00:00.000Z');
assert.equal(amFormationWindow(['2026-01-06T14:59:00.000Z','2026-01-06T15:00:00.000Z','2026-01-06T15:01:00.000Z']),false,'First open before10 cannot round into window');
assert.equal(amFormationWindow(['2026-01-06T15:57:00.000Z','2026-01-06T15:58:00.000Z','2026-01-06T15:59:00.000Z']),false,'Third close at11 excluded');
assert.equal(amFormationWindow(['2026-01-06T15:56:00.000Z','2026-01-06T15:57:00.000Z','2026-01-06T15:58:00.000Z']),true);
assert.equal(beforeAmExpiry('2026-07-07T14:59:00.000Z'),false,'11:00 completion excluded by conservative rule');assert.equal(beforeAmExpiry('2026-07-07T14:58:00.000Z'),true);
const later={...silverCases[0],bars:silverCases[0].bars.map(b=>({...b,time:new Date(Date.parse(b.time)+50*60000).toISOString()}))};
const laterEvidence=silverEvidence(later);assert.equal(laterEvidence.outcome,'target');assert.ok(nyClock(closeTime(later.bars[laterEvidence.exit].time,1)).minute>660,'Filled study may finish after the entry hour');
assert.throws(()=>utcMillis('2026-01-06T10:00:00-05:00'));assert.throws(()=>closeTime('2026-01-06T15:00:00.000Z',0));
assert.equal(fs.readFileSync('public/resources/nq-silver-bullet-practice.csv','utf8'),silverCsv(),'CSV differs from runtime');for(const d of silverMeta.description)assert.ok([...d].length<=155);
for(const locale of ['en','ur']){const png=fs.readFileSync(`public/images/social/nq-silver-bullet-${locale}.png`);assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);}
console.log('Silver data passed: valid explicit UTC OHLC, NQ ticks, context/time continuity, five computed outcomes, near-miss isolation, CE/stop/target, DST and 10:00/11:00 off-by-one tests, exact CSV and bilingual questions.');
