import fs from 'node:fs';import assert from 'node:assert/strict';
import {remainingStudies} from '../src/data/chartLabRemainingContent';
import {casesFor,studyEvidence,remainingCsv} from '../src/data/chartLabRemaining';
import {studyQuestions} from '../src/data/chartLabRemainingQuestions';
import {utcMillis,nyClock,closeTime} from '../src/utils/chartStudyTime';
const report=[];
for(const s of remainingStudies){assert.equal(s.faqs.length,5);assert.ok([...s.description[0]].length<=155);assert.ok([...s.description[1]].length<=155);const cs=casesFor(s);assert.equal(cs.length,{gold:5,btc:4,mmbm:5,ndog:6}[s.family]);
 for(const c of cs){
  const e=studyEvidence(s,c),r=c.refs,b=c.bars,q=studyQuestions(s,c);
  assert.equal(e.outcome,c.expected,`${c.id}: computed outcome does not match declared contrast`);assert.equal(q.length,s.stages.length);
  for(const [i,a] of q.entries()){assert.ok(a.reveal<=b.length);assert.ok(i===0||a.reveal>=q[i-1].reveal,`${c.id}: reveal must not go backwards`);assert.notEqual(a.answer[0],a.wrong[0]);assert.ok(/[\u0600-\u06ff]/.test(a.prompt[1]));assert.ok(!/NaN|undefined/.test(JSON.stringify(a)));}
  for(const g of [{bars:b,tf:c.tf},...c.groups])for(const [i,v] of g.bars.entries()){
   utcMillis(v.time);assert.ok(v.high>=Math.max(v.open,v.close)&&v.low<=Math.min(v.open,v.close),`${c.id}: invalid OHLC ${v.time}`);
   for(const z of [v.open,v.high,v.low,v.close])assert.ok(Math.abs(z/c.tick-Math.round(z/c.tick))<1e-6,`${c.id}: tick ${z}`);
   if(i)assert.equal(utcMillis(v.time)-utcMillis(g.bars[i-1].time),g.tf*60000,`${c.id}: missing or irregular bars`);
   assert.equal(utcMillis(closeTime(v.time,g.tf))-utcMillis(v.time),g.tf*60000);
  }
  const before=[...c.groups.filter((g,i)=>s.family!=='ndog'||i<4).flatMap(g=>g.bars),...b.slice(0,s.family==='mmbm'?r.candidate:r.gap)];
  assert.ok(before.some(v=>Math.abs(v.high-r.swing)<1e-7),`${c.id}: fixed swing has no supplied price evidence`);
  if(s.family==='mmbm'){
   assert.ok(b[r.parent+1].close>r.reversalSwing&&b[r.parent+1].close>b[r.parent+1].open,`${c.id}: initial reversal missing`);
   assert.ok(r.parent+1<r.candidate&&r.candidate<r.confirmation,'Parent / returning / confirmation order');
   assert.equal(Math.min(...b.slice(0,r.parent+1).map(v=>v.low)),r.low,'Descending low must be an actual supplied price');assert.equal(e.entry,b[r.candidate].high);assert.equal(e.ce,(b[r.candidate].open+b[r.candidate].close)/2);
  }else if(s.family==='gold'||s.family==='btc'){
   assert.ok(r.sweep<r.gap);assert.ok(e.sweep,'Sweep must actually recover');assert.equal(e.rangeLow,r.low);assert.equal(e.rangeHigh,r.high);
   if(s.family==='btc'){assert.equal(c.groups[0].bars.length,96);assert.equal(nyClock(c.groups[0].bars[0].time).minute,0);assert.equal(nyClock(closeTime(c.groups[0].bars.at(-1)!.time,15)).minute,0);}
  }else{
   assert.equal(c.groups[0].bars[0].close,r.low);assert.equal(nyClock(closeTime(c.groups[0].bars[0].time,1)).minute,1020);
   assert.equal(c.groups[1].bars[0].open,r.high);assert.equal(nyClock(c.groups[1].bars[0].time).minute,1080);
   assert.equal(c.groups[2].bars[0].close,r.rthPrevious);assert.equal(nyClock(c.groups[2].bars[0].time).minute,974);
   assert.ok(c.groups[3].bars.some(v=>v.high===r.target),'Target has no earlier price evidence');assert.ok(c.groups[3].bars.some(v=>v.high===r.highest));assert.equal(b[0].open,r.rthOpen);assert.equal(nyClock(b[0].time).minute,570);assert.ok(r.gap+2<r.inversion);
   const earlier=b.slice(r.gap+3,r.inversion).filter(v=>v.close>e.gapHigh&&v.close>r.swing);assert.equal(earlier.length,0,'Unlabelled earlier inversion');
   if(c.id==='n-e'){assert.ok(e.wholeFailure);assert.ok(e.reaction.close<r.low);assert.ok(b.filter(v=>nyClock(closeTime(v.time,1)).minute<610).slice(r.gap+3).every(v=>v.close<=e.gapHigh));}
   if(c.id==='n-d')assert.ok(e.reaction.low>e.ce);
   if(c.id==='n-f'){const first=b.findIndex((v,i)=>i>e.confirm&&v.low<=e.entry&&v.high>=e.entry);assert.equal(nyClock(closeTime(b[first].time,1)).minute,611);}
  }
  if(e.firstTouch>=0){assert.ok(e.firstTouch>e.confirm);assert.ok(nyClock(closeTime(b[e.firstTouch].time,c.tf)).minute<r.expiry);assert.ok(b[e.firstTouch].high<e.target&&b[e.firstTouch].low>e.stop,'Entry-bar order must not be inferred');}
  report.push({route:s.slug,case:c.id,bars:b.length,stages:q.length,gap:[e.gapLow,e.gapHigh],midpoint:e.ce,firstTouch:e.firstTouch,outcome:e.outcome});
 }
 assert.equal(fs.readFileSync('public/resources/'+s.slug+'-practice.csv','utf8'),remainingCsv(s),'CSV drift');
}
// Deadline arithmetic, not fixed EST strings: a 5-minute 04:55 NY bar ends at 05:00 and is excluded.
assert.equal(nyClock(closeTime('2026-01-06T09:55:00.000Z',5)).minute,300);
assert.equal(nyClock(closeTime('2026-07-07T08:55:00.000Z',5)).minute,300);
assert.equal(nyClock(closeTime('2026-07-07T14:09:00.000Z',1)).minute,610);
fs.mkdirSync('outputs/chartlab-five',{recursive:true});fs.writeFileSync('outputs/chartlab-five/remaining-data-checks.json',JSON.stringify(report,null,2));
console.log('Four route models passed: 20 cases, 142 case-specific stages, OHLC/tick/UTC/context references, computed outcomes and CSV parity.');
