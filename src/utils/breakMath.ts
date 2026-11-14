export type BreakBar={openMinute:number;open:number;high:number;low:number;close:number};
export type BreakTopic='bos'|'choch';
export const breakClock=(m:number)=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
export const breakCloseMinute=(b:BreakBar)=>b.openMinute+5;
const bar=(openMinute:number,open:number,high:number,low:number,close:number):BreakBar=>({openMinute,open,high,low,close});
const bosStart=[bar(605,118,121,117,119),bar(610,119,123,118,122)];
const chochStart=[bar(600,112,113,107,109),bar(605,109,110,105,106)];
/** All prices are invented. These windows start AFTER the prior map is known. */
export const breakCases={
 bos:{hold:[...bosStart,bar(615,122,124,120.5,123),bar(620,123,126,122,125)],fail:[...bosStart,bar(615,122,122.5,117,118),bar(620,118,119,114,115)],range:[...bosStart,bar(615,122,123,119,121),bar(620,121,123,119.5,120.5)]},
 choch:{hold:[...chochStart,bar(610,106,106.5,103.5,104.5),bar(615,104.5,107.5,104,105.5),bar(620,105.5,106,101,102)],fail:[...chochStart,bar(610,106,111,105,110),bar(615,110,114,109,113)],range:[...chochStart,bar(610,106,108,105,107),bar(615,107,108.5,104.5,105.5),bar(620,105.5,108,105,106.5)]}
};
export const qualifiesBreak=(close:number,level:number,direction:'up'|'down')=>direction==='up'?close>level:close<level;
export function breakReadout(topic:BreakTopic,outcome:'hold'|'fail'|'range',visible:number){
 const bars=breakCases[topic][outcome],last=bars[Math.max(0,Math.min(visible,bars.length)-1)];
 const event=visible>=2;
 return {last,event,state:!event?'Wick only; no qualifying close.':visible===2?'Event qualified; later outcome not yet shown.':outcome==='fail'?'Later reclaim; the original event remains recorded.':outcome==='range'?'Overlapping later bars; outcome unresolved.':'Later follow-through; not a prediction.'};
}
