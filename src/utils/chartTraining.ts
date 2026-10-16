import { ChartScenario } from '../types';
export function chartExercise(s:ChartScenario) {
 const sweep=s.annotations.find(a=>a.type==='SWEEP')!;
 const zone=s.annotations.find(a=>['FVG','IFVG'].includes(a.type))||s.annotations.find(a=>a.type==='BREAKER')||s.annotations.find(a=>a.type==='OB')!;
 const bullish=zone.isBullish??(s.candles.at(-1)!.close>s.candles[0].close);
 const structure=s.annotations.find(a=>['MSS','BOS'].includes(a.type))||s.annotations.find(a=>a.type==='BREAKER')||zone;
 const target=s.annotations.filter(a=>a.type===(bullish?'BSL':'SSL')).at(-1)||s.annotations.filter(a=>['BSL','SSL','PDH','PDL'].includes(a.type)).at(-1)!;
 const before=s.candles.slice(0,Math.max(1,sweep.candleIndexStart));
 const poolValue=bullish?Math.min(...before.map(c=>c.low)):Math.max(...before.map(c=>c.high));
 const pool=before.findIndex(c=>(bullish?c.low:c.high)===poolValue);
 const from=Math.min(sweep.candleIndexEnd+1,structure.candleIndexEnd),to=Math.max(from,structure.candleIndexEnd);
 let displacement=from;
 for(let i=from;i<=to;i++)if(Math.abs(s.candles[i].close-s.candles[i].open)>Math.abs(s.candles[displacement].close-s.candles[displacement].open))displacement=i;
 const swept=s.candles.slice(sweep.candleIndexStart,sweep.candleIndexEnd+1);
 const extreme=bullish?Math.min(...swept.map(c=>c.low)):Math.max(...swept.map(c=>c.high));
 return {sweep,zone,structure,target,bullish,pool,displacement,extreme};
}
export function acceptsCandle(s:ChartScenario,stage:number,index:number) {
 const e=chartExercise(s);
 if(stage===0)return index===e.pool;
 if(stage===1)return index>=e.sweep.candleIndexStart&&index<=e.sweep.candleIndexEnd;
 if(stage===2)return index===e.displacement;
 if(stage===3)return index>=e.structure.candleIndexStart&&index<=e.structure.candleIndexEnd;
 if(stage===4)return index>=e.zone.candleIndexStart&&index<=e.zone.candleIndexEnd;
 return false;
}
export function acceptsPrice(s:ChartScenario,stage:number,price:number,entry?:number,stop?:number) {
 if(!Number.isFinite(price)||price<=0)return false;
 const e=chartExercise(s),lower=e.zone.priceBottom??e.zone.priceLevel!,upper=e.zone.priceTop??e.zone.priceLevel!;
 if(stage===5)return price>=Math.min(lower,upper)&&price<=Math.max(lower,upper);
 if(stage===6)return entry!==undefined&&(e.bullish?price<Math.min(e.extreme,entry):price>Math.max(e.extreme,entry));
 const target=e.target.priceLevel;
 const tolerance=Math.max((Math.max(...s.candles.map(c=>c.high))-Math.min(...s.candles.map(c=>c.low)))*.005,s.asset.includes('EUR')?.00001:.01);
 return stage===7&&target!==undefined&&entry!==undefined&&stop!==undefined&&(e.bullish?stop<entry&&entry<price:price<entry&&entry<stop)&&Math.abs(price-target)<=tolerance;
}
