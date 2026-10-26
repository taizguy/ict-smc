import fs from 'node:fs';
import {createHash} from 'node:crypto';
import catalog from '../src/data/chapters/mentorship2025Replays.json';
import edition from '../src/data/chapters/mentorship2025Edition.json';
const check=(condition:unknown,message:string)=>{if(!condition)throw new Error(message);};
const clock=(time:number)=>new Intl.DateTimeFormat('en-GB',{timeZone:'America/New_York',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(time*1000));
let candles=0;
for(const c of catalog){
 const file='public'+c.url,raw=fs.readFileSync(file,'utf8').trimEnd(),payload=JSON.parse(raw),b=payload.bars;
 check(createHash('sha256').update(raw).digest('hex')===c.dataSha256,`${c.id}: source hash changed`);
 check(b.length===c.barCount,`${c.id}: candle count`);candles+=b.length;
 check(b.every((v:any,i:number)=>[v.time,v.open,v.high,v.low,v.close].every(Number.isFinite)&&v.low<=Math.min(v.open,v.close)&&v.high>=Math.max(v.open,v.close)&&(i===0||v.time>b[i-1].time)),`${c.id}: invalid OHLC or timestamps`);
 check(c.steps.every(s=>s.count>0&&s.count<=b.length&&s.lastTime===b[s.count-1].time),`${c.id}: recognition boundary`);
 check(c.steps.every(s=>c.preview.some(v=>v.time===s.lastTime)),`${c.id}: preview omits an instructional boundary`);
 check(c.levels.every(l=>l.after>0&&l.after<=b.length&&Number.isFinite(l.price)),`${c.id}: invalid reference`);
 check(c.areas.every(a=>a.start>=0&&a.start<=a.end&&a.end<b.length&&a.low<a.high&&a.after>0&&a.after<=b.length),`${c.id}: invalid interval`);
 if(c.id==='midnight-range'||c.id==='morning-range'){
  const r=b.slice(c.window!.start,c.window!.end);
  check(r.length===30&&r[29].time-r[0].time===29*60,`${c.id}: incomplete thirty-minute source`);
  check(Math.min(...r.map((v:any)=>v.low))===c.areas[0].low&&Math.max(...r.map((v:any)=>v.high))===c.areas[0].high,`${c.id}: wrong range measurement`);
  check(c.areas[0].after===c.window!.end,`${c.id}: premature final range`);
 }
 if(c.id==='smt-comparison'){
  const e=payload.comparison,nh=c.levels[0].price,eh=c.comparisonLevels![0].price;
  check(e.length===b.length&&e.every((v:any,i:number)=>v.time===b[i].time),'SMT: unaligned markets');
  check(b[15].high<nh&&e[15].high>eh&&b[22].high>nh,'SMT: claimed observations do not match prices');
 }
 if(c.id==='venom-context'){
  const end=c.steps[0].count,r=b.slice(0,end);
  check(clock(b[0].time)==='08:00'&&clock(r.at(-1).time+60)==='09:30'&&r.length===90,'Venom: wrong reference window');
  check(Math.max(...r.map((v:any)=>v.high))===c.levels[0].price&&Math.min(...r.map((v:any)=>v.low))===c.levels[1].price,'Venom: wrong boundaries');
  check(b[c.steps[1].count-1].close>c.levels[0].price&&b[c.steps[2].count-1].close<c.levels[1].price,'Venom: wrong close or opposing response');
 }
 if(c.id==='pd-matrix')check(c.steps[0].count===20&&c.levels.length===5,'PD matrix: lookback/quartiles missing');
 if(c.id==='fomc-stages')check(c.markers?.some(m=>clock(b[m.index].time)==='14:00')&&c.markers?.some(m=>clock(b[m.index].time)==='14:30'),'FOMC: wrong event timing');
}
check(new Set(catalog.map(c=>c.chapter)).size===edition.length,'A 2025 chapter lacks a replay');
const headers=fs.readFileSync('public/_headers','utf8');check(/\/data\/ict-2025-replays\/\*[\s\S]*?X-Robots-Tag: noindex/.test(headers),'Dataset response indexing directive missing');
console.log(`Historical replay checks passed: ${catalog.length} examples, ${candles} original candles, all ${edition.length} chapters; hashes, measurements, timestamps, source alignment and recognition boundaries.`);
