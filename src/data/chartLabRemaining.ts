import type {LabBar} from '../utils/backtestEngine';
import {nyClock,closeTime} from '../utils/chartStudyTime';
export type Pair=readonly[string,string];
export type Family='gold'|'btc'|'mmbm'|'ndog';
export type StudyCase={id:string;name:string[];tf:number;tick:number;bars:LabBar[];groups:{label:string[];tf:number;bars:LabBar[]}[];refs:Record<string,number>;expected:string;notes:string[]};
export const remainingCases:StudyCase[]=(import.meta.env?.SSR ?? typeof window==='undefined')?(await import('./chartLabRemainingCases.json')).default as StudyCase[]:[];
export type StudyDefinition={family:Family;prefix:string;slug:string;instrument:string;title:Pair;h1:Pair;description:Pair;intro:Pair;stages:Pair[];rules:Pair[];faqs:{q:Pair;a:Pair}[];links:{path:string;label:Pair}[];sources:{title:string;url:string}[]};
export const p=(en:string,ur:string):Pair=>[en,ur];
export const casesFor=(s:StudyDefinition)=>remainingCases.filter(c=>c.id.startsWith(s.prefix));
export const price=(c:StudyCase,v:number)=>v.toFixed(c.tick===.0001?4:2);
const touch=(b:LabBar,v:number)=>b.low<=v&&b.high>=v;
export function studyEvidence(s:StudyDefinition,c:StudyCase){
 const r=c.refs,b=c.bars,tf=c.tf;let gapLow=0,gapHigh=0,ce=0,entry=0,stop=0,target=r.target??r.high,confirm=0,eligible=false;
 let shift=false,overlap=false,timing=true,sweep=true,wholeFailure=false;
 const rangeLow=s.family==='gold'||s.family==='btc'?Math.min(...c.groups[0].bars.slice(s.family==='btc'?80:0).map(v=>v.low)):r.low;
 const rangeHigh=s.family==='gold'||s.family==='btc'?Math.max(...c.groups[0].bars.slice(s.family==='btc'?80:0).map(v=>v.high)):r.high;
 if(s.family==='gold'||s.family==='btc'){
  const g=r.gap;gapLow=b[g].high;gapHigh=b[g+2].low;ce=(gapLow+gapHigh)/2;entry=s.family==='gold'?gapHigh:ce;stop=b[r.sweep].low-c.tick;confirm=g+2;
  shift=b[g+1].close>r.swing&&b[g+1].close>b[g+1].open;
  sweep=b[r.sweep].low<rangeLow&&b[r.sweep].close>rangeLow;
  eligible=gapHigh>gapLow&&shift&&sweep;
  target=s.family==='gold'?rangeHigh:Math.max(...c.groups[0].bars.map(v=>v.high));
 }else if(s.family==='mmbm'){
  const a=b[r.parent],v=b[r.candidate];gapLow=v.low;gapHigh=v.high;ce=(v.open+v.close)/2;entry=v.high;stop=v.low-c.tick;confirm=r.confirmation;
  overlap=v.low<=a.high&&v.high>=a.low;shift=b[confirm].close>r.swing&&b[confirm].close>b[confirm].open;
  eligible=overlap&&v.close<v.open&&a.close<a.open&&shift;
 }else{
  const g=r.gap;gapLow=b[g+2].high;gapHigh=b[g].low;ce=(r.low+r.high)/2;entry=gapHigh;stop=b[r.reaction].low-.25;confirm=r.inversion;
  timing=nyClock(closeTime(b[confirm].time,tf)).minute>=590&&nyClock(closeTime(b[confirm].time,tf)).minute<610;
  shift=b[confirm].close>r.swing&&b[confirm].close>b[confirm].open;
  wholeFailure=b.slice(0,confirm+1).some(v=>v.close<Math.min(r.low,r.high));
  eligible=gapHigh>gapLow&&b[confirm].close>gapHigh&&shift&&timing&&!wholeFailure;
 }
 const found=b.findIndex((v,i)=>i>confirm&&nyClock(closeTime(v.time,tf)).minute<r.expiry&&touch(v,entry));
 const firstTouch=eligible?found:-1;
 let outcome=!eligible?(wholeFailure?'gap-failure':s.family==='mmbm'&&!overlap?'no-overlap':gapHigh<=gapLow?'no-gap':!timing?'outside-window':'no-shift'):firstTouch<0?'expired':'open';let exit=-1;
 if(firstTouch>=0)for(let i=firstTouch;i<b.length;i++){
  const v=b[i],st=v.low<=stop,ta=v.high>=target,mid=(s.family==='gold'||s.family==='mmbm')&&v.close<ce;
  if(st||ta||mid){outcome=(st&&ta)||(ta&&mid)?'ambiguous':st?'stop':mid?'midpoint-failure':'target';exit=i;break;}
 }
 const reaction=s.family==='ndog'?b[r.reaction]:b[r.sweep??0];
 return {gapLow,gapHigh,ce,entry,stop,target,confirm,eligible,shift,overlap,timing,sweep,wholeFailure,firstTouch,exit,outcome,rangeLow,rangeHigh,reaction};
}
export const outcomeText:Record<string,Pair>={target:p('Target reference touched after eligible entry','موزوں انٹری کے بعد ہدف چھوا گیا'),stop:p('Protective stop touched first','حفاظتی اسٹاپ پہلے چھوا گیا'),'midpoint-failure':p('Completed close below the selected midpoint','منتخب وسط سے نیچے مکمل بندش'),'no-gap':p('No positive-width FVG','مثبت چوڑائی والا FVG نہیں'),'no-shift':p('Fixed swing not broken by the required close','مطلوبہ بندش سے مقررہ سوئنگ نہیں ٹوٹی'),'no-overlap':p('Returning candle does not overlap parent','واپسی کی کینڈل اصل بلاک سے اوورلیپ نہیں کرتی'),'outside-window':p('Confirmation completes outside the window','تصدیق مقررہ وقت سے باہر مکمل ہوئی'),'gap-failure':p('Whole NDOG closes through; no eligible long','پوری NDOG سے نیچے بندش؛ موزوں لانگ نہیں'),expired:p('No timely entry; plan expires','بروقت انٹری نہیں؛ منصوبہ ختم'),ambiguous:p('Intrabar event order is unknown','کینڈل کے اندر واقعات کی ترتیب نامعلوم'),open:p('No exit established by supplied bars','دی گئی کینڈلز میں اخراج ثابت نہیں')};
export function outcomeExplanation(s:StudyDefinition,c:StudyCase):Pair{const e=studyEvidence(s,c),f=(v:number)=>price(c,v);if(e.outcome==='no-gap')return p('The outer wicks overlap. There is no positive FVG, no FVG CE and no active entry plan. A later rise cannot create the missing formation retroactively.','بیرونی وِکس اوورلیپ ہیں۔ مثبت FVG، اس کا CE یا فعال انٹری منصوبہ نہیں۔ بعد کا اضافہ پہلے کی نامکمل تشکیل درست نہیں کر سکتا۔');return p(`${outcomeText[e.outcome][0]}. ${e.eligible?'Conditional plan':'Inactive measurements only'}: entry ${f(e.entry)}; stop ${f(e.stop)}; target ${f(e.target)}. ${e.firstTouch>=0?`First eligible touch: bar ${e.firstTouch+1}, ending ${closeTime(c.bars[e.firstTouch].time,c.tf)}.`:'No eligible entry is recorded.'} ${e.exit>=0?`First resolving bar: ${e.exit+1}.`:''} These are synthetic OHLC observations, not verified fills.`,`${outcomeText[e.outcome][1]}۔ ${e.eligible?'مشروط منصوبہ':'صرف غیر فعال پیمائش'}: انٹری ${f(e.entry)}؛ اسٹاپ ${f(e.stop)}؛ ہدف ${f(e.target)}۔ ${e.firstTouch>=0?`پہلی موزوں واپسی کینڈل ${e.firstTouch+1} میں ہے؛ مکمل وقت ${closeTime(c.bars[e.firstTouch].time,c.tf)} ہے۔`:'موزوں انٹری درج نہیں۔'} ${e.exit>=0?`فیصلہ کن کینڈل ${e.exit+1} ہے۔`:''} یہ فرضی OHLC مشاہدے ہیں، تصدیق شدہ فل نہیں۔`);}
export function remainingCsv(s:StudyDefinition){return ['case,data_type,instrument,venue,timeframe_minutes,display_timezone,bar_open_utc,open,high,low,close',...casesFor(s).flatMap(c=>[...c.groups.flatMap(g=>g.bars.map(b=>({b,tf:g.tf}))),...c.bars.map(b=>({b,tf:c.tf}))].map(({b,tf})=>[c.id,'synthetic invented teaching prices',s.instrument,'none',tf,'America/New_York',b.time,...[b.open,b.high,b.low,b.close].map(v=>price(c,v))].join(',')))].join('\n')+'\n';}
