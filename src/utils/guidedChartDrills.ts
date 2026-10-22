import type { ChartScenario } from '../types';
import { chartExercise } from './chartTraining';

export const guidedChartRevision = '2026-10-22';
/** Recognition windows stop at their observation, never at the final target/outcome. */
export function guidedChartDrills(scenario: ChartScenario) {
  const e = chartExercise(scenario);
  const before = scenario.candles.slice(0,e.sweep.candleIndexStart);
  const reference = e.bullish ? Math.min(...before.map(c=>c.low)) : Math.max(...before.map(c=>c.high));
  const sweepIndices = scenario.candles.flatMap((c,i)=>i>=e.sweep.candleIndexStart&&i<=e.sweep.candleIndexEnd&&(e.bullish?c.low<reference:c.high>reference)?[i]:[]);
  const from = Math.min(e.sweep.candleIndexEnd+1,e.structure.candleIndexEnd);
  const through = Math.max(from,e.structure.candleIndexEnd);
  const candidates = scenario.candles.slice(from,through+1);
  const largest = Math.max(...candidates.map(c=>Math.abs(c.close-c.open)));
  const displacementIndices = candidates.flatMap((c,i)=>Math.abs(Math.abs(c.close-c.open)-largest)<1e-10?[i+from]:[]);
  const end = Math.max(e.zone.candleIndexEnd,e.structure.candleIndexEnd);
  const gap = scenario.candles.flatMap((c,i)=>{
    if(i<2||i<=e.sweep.candleIndexEnd||i>end)return [];
    const first=scenario.candles[i-2];
    if(first.high<c.low)return [{middle:i-1,low:first.high,high:c.low}];
    if(first.low>c.high)return [{middle:i-1,low:c.high,high:first.low}];
    return [];
  })[0];
  const zoneIndices=Array.from({length:e.zone.candleIndexEnd-e.zone.candleIndexStart+1},(_,i)=>e.zone.candleIndexStart+i);
  return {e,reference,from,through,gap,tasks:[
    {title:'Spot the sweep',copy:'Select a candle that trades beyond the marked reference during the supplied sweep window.',learn:'A sweep describes price trading beyond a reference. It does not guarantee a reversal.',indices:sweepIndices,visible:e.sweep.candleIndexEnd+1,chapter:18},
    {title:'Find the displacement',copy:'Compare only the stated post-sweep window. Select its largest open-to-close body; wick length does not count.',learn:'Displacement describes a large directional body in context. It does not identify who traded.',indices:displacementIndices,visible:through+1,chapter:5},
    gap?{title:'Find the three-candle gap',copy:'Select the middle candle of the first completed FVG after the sweep in this study window. Compare the outer wicks.',learn:'The shaded interval is between candle 1 and candle 3. The middle candle traded through it; a revisit is uncertain.',indices:[gap.middle],visible:Math.max(through+1,gap.middle+2),chapter:13}:
    {title:'Find the reference area',copy:'No completed FVG qualifies within this study window. Select a candle in the authored reference area instead.',learn:'An annotated area is an exercise convention, not evidence of institutional orders.',indices:zoneIndices,visible:end+1,chapter:15},
  ]};
}
