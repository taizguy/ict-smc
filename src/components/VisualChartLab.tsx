import { useMemo, useState } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import { chartScenarios } from '../data/chartScenarios';
import { chartExercise } from '../utils/chartTraining';
import { getChartScenarioSlug } from '../utils/workbenchToolRoutes';
import { CandleBoard } from './labs/CandleBoard';
export interface ChartLabProps {initialScenarioSlug?:string;initialStepSlug?:string;onNavigateUrl?:(url:string)=>void}
export function ChartLab({initialScenarioSlug,initialStepSlug}:ChartLabProps){
  const {t,href}=useTranslation();
  const scenario=chartScenarios.find(s=>getChartScenarioSlug(s.id)===initialScenarioSlug)||chartScenarios[0];
  const e=useMemo(()=>chartExercise(scenario),[scenario]);
  const [stage,setStage]=useState(initialStepSlug==='displacement'?1:initialStepSlug==='fvg-ob'?2:0),[chosen,setChosen]=useState<number|null>(null),[hint,setHint]=useState(false),[solved,setSolved]=useState(false),[feedback,setFeedback]=useState('');
  const gap=useMemo(()=>scenario.candles.map((c,i)=>i>=2&&i>e.sweep.candleIndexEnd?(scenario.candles[i-2].high<c.low?{middle:i-1,low:scenario.candles[i-2].high,high:c.low}:scenario.candles[i-2].low>c.high?{middle:i-1,low:c.high,high:scenario.candles[i-2].low}:null):null).find(Boolean),[scenario,e.sweep.candleIndexEnd]);
  const tasks=[
    {title:'Spot the sweep',copy:'Choose a candle inside the exercise’s sweep. Look for the excursion beyond an earlier high or low.',learn:'A sweep describes price trading beyond a reference. It does not guarantee a reversal.',indices:Array.from({length:e.sweep.candleIndexEnd-e.sweep.candleIndexStart+1},(_,i)=>i+e.sweep.candleIndexStart)},
    {title:'Find the displacement',copy:'Choose the largest candle body in the post-sweep move used by this exercise. Compare open-to-close distance, not wick length.',learn:'Displacement describes a large directional body in context. It does not identify who traded.',indices:[e.displacement]},
    gap?{title:'Find the three-candle gap',copy:'Choose the middle candle of the first FVG after the sweep. The outer candles’ wicks must not overlap.',learn:'The shaded interval is between candle 1 and candle 3. The middle candle traded through it; a revisit is uncertain.',indices:[gap.middle]}:
      {title:'Find the reference area',copy:'Choose a candle in the annotated entry reference. This example uses its own reference instead of inventing a three-candle FVG.',learn:'An annotated area is an exercise convention, not evidence of institutional orders.',indices:Array.from({length:e.zone.candleIndexEnd-e.zone.candleIndexStart+1},(_,i)=>e.zone.candleIndexStart+i)},
  ];
  const task=tasks[Math.min(stage,2)];
  const choose=(i:number)=>{setChosen(i);const ok=task.indices.includes(i);setSolved(ok);setFeedback(ok?'Yes. Now explain what you observed before continuing.':'Not this candle. Compare its body and wicks with the task, or reveal a hint.');};
  const next=()=>{setStage(s=>s+1);setChosen(null);setHint(false);setSolved(false);setFeedback('');};
  return <div className="visual-lab">
    <header className="lab-intro"><span className="lab-eyebrow">{t('01 / RECOGNIZE')}</span><h2>{t('Learn to see the chart.')}</h2><p>{t('Three short observation drills. Click a candle, get a visual hint, and explain what changed.')}</p><div className="lab-route-links">{chartScenarios.map(s=><a key={s.id} aria-current={s.id===scenario.id?'page':undefined} href={href(`/tools/chartlab/${getChartScenarioSlug(s.id)}/`)}>{t(s.asset)} · {chartScenarios.indexOf(s)+1}</a>)}</div></header>
    <section className="lab-workspace">
      <div className="lab-task"><span className="lab-step-count" dir="ltr">{Math.min(stage+1,3)} / 3</span><div><h3>{t(stage===3?'Observation complete':task.title)}</h3><p>{t(stage===3?'You practiced recognition. Next, make a decision without seeing the future.':task.copy)}</p></div></div>
      <CandleBoard bars={scenario.candles} selected={hint||solved?stage===2&&gap?[gap.middle-1,gap.middle,gap.middle+1]:task.indices:chosen===null?[]:[chosen]} onSelect={stage<3?choose:undefined} zones={stage===2&&gap&&(hint||solved)?[{low:gap.low,high:gap.high,label:'FVG'}]:[]} levels={[{price:e.bullish?Math.min(...scenario.candles.slice(0,Math.max(1,e.sweep.candleIndexStart)).map(c=>c.low)):Math.max(...scenario.candles.slice(0,Math.max(1,e.sweep.candleIndexStart)).map(c=>c.high)),label:e.bullish?'Prior low':'Prior high'}]}/>
      {stage<3?<><div className="lab-actions"><button onClick={()=>setHint(true)}>{t('Show a visual hint')}</button><button className="lab-primary" disabled={!solved} onClick={next}>{t(stage===2?'Finish observation':'Next observation')}</button></div><p className="lab-feedback" role="status">{t(feedback)}</p>{(solved||hint)&&<aside className="lab-insight">{t(task.learn)}</aside>}</>:<div className="lab-actions"><a className="lab-primary" href={href('/tools/simulator/')}>{t('Try the Trade Simulator')}</a><button onClick={()=>{setStage(0);setSolved(false);setHint(false);setChosen(null);}}>{t('Start again')}</button></div>}
    </section>
    <p className="lab-small">{t('Authored illustrative candles, not historical or live market data. Numbers below the chart are keyboard-accessible candle selectors.')}</p>
  </div>;
}
