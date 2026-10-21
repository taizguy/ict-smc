import { useMemo, useState } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import { chartScenarios } from '../data/chartScenarios';
import { textbookChapters } from '../data/chaptersData';
import { guidedChartDrills } from '../utils/guidedChartDrills';
import { getChartScenarioSlug } from '../utils/workbenchToolRoutes';
import { CandleBoard } from './labs/CandleBoard';
export interface ChartLabProps {initialScenarioSlug?:string;initialStepSlug?:string;onNavigateUrl?:(url:string)=>void}
export function ChartLab(props:ChartLabProps){
 const scenario=chartScenarios.find(s=>getChartScenarioSlug(s.id)===props.initialScenarioSlug)||chartScenarios[0];
 return <GuidedChartLab key={scenario.id+':'+(props.initialStepSlug||'')} scenario={scenario} initialStepSlug={props.initialStepSlug}/>;
}
function GuidedChartLab({scenario,initialStepSlug}:{scenario:typeof chartScenarios[number];initialStepSlug?:string}){
 const {t,href,message}=useTranslation();
 const drill=useMemo(()=>guidedChartDrills(scenario),[scenario]);
 const initial=initialStepSlug==='displacement'?1:initialStepSlug==='fvg-ob'?2:0;
 const [stage,setStage]=useState(initial),[chosen,setChosen]=useState<number|null>(null),[hint,setHint]=useState(false),[solved,setSolved]=useState(false),[feedback,setFeedback]=useState('');
 const [review,setReview]=useState<Record<number,boolean>>({});
 const task=drill.tasks[Math.min(stage,2)],complete=stage===3;
 const price=(n:number)=>String(Number(n.toFixed(5)));
 const choose=(i:number)=>{
  const candle=scenario.candles[i];setChosen(i);const ok=task.indices.includes(i);setSolved(ok);
  if(ok){setFeedback(t('That matches the stated observation. Read the explanation, then continue.'));return;}
  if(stage===0)setFeedback(message(drill.e.bullish?'Candle {number} has a low of {price}. Compare it with the prior low {reference} and the supplied sweep window.':'Candle {number} has a high of {price}. Compare it with the prior high {reference} and the supplied sweep window.',{number:i+1,price:price(drill.e.bullish?candle.low:candle.high),reference:price(drill.reference)}));
  else if(stage===1)setFeedback(message('Candle {number} has a body of {body} price units. Compare bodies only in candles {from}–{through}; ignore the wicks.',{number:i+1,body:price(Math.abs(candle.close-candle.open)),from:drill.from+1,through:drill.through+1}));
  else if(drill.gap)setFeedback(t(Math.abs(i-drill.gap.middle)===1?'You chose an outer candle. Select the middle candle of the qualifying three-candle pattern.':'Check the outer wick ranges, then select the middle candle of the first qualifying pattern in this window.'));
  else setFeedback(t('This candle is outside the supplied reference. Use a hint to inspect the authored zone; do not invent an FVG.'));
 };
 const next=()=>{setReview(r=>({...r,[stage]:hint}));setStage(s=>s+1);setChosen(null);setHint(false);setSolved(false);setFeedback('');};
 const restart=()=>{setStage(0);setReview({});setChosen(null);setHint(false);setSolved(false);setFeedback('');};
 const lesson=(id:number)=>'/learn/'+textbookChapters.find(c=>c.id===id)!.slug+'/';
 const visible=task.visible;
 return <div className="visual-lab guided-chart-lab">
  <header className="lab-intro"><span className="lab-eyebrow">{t('01 / RECOGNIZE')}</span><h2>{t('Learn to see the chart.')}</h2><p>{t('Observe one event at a time. Later candles stay hidden while you identify the current pattern.')}</p><div className="lab-route-links">{chartScenarios.map(s=><a key={s.id} aria-current={s.id===scenario.id?'page':undefined} href={href(`/tools/chartlab/${getChartScenarioSlug(s.id)}/`)}>{t(s.asset)} · {chartScenarios.indexOf(s)+1}</a>)}</div></header>
  <ol className="lab-learning-steps" aria-label={t('Observation sequence')}>{drill.tasks.map((item,i)=><li key={item.title} aria-current={!complete&&stage===i?'step':undefined}><span aria-hidden="true">{i+1}</span><strong>{t(item.title)}</strong><small>{t(review[i]===undefined?'Not completed':review[i]?'Completed with a hint':'Completed without a hint')}</small></li>)}</ol>
  <section className="lab-workspace">
   <div className="lab-task"><span className="lab-step-count" dir="ltr">{Math.min(stage+1,3)} / 3</span><div><h3>{t(complete?'Review your observations':task.title)}</h3><p>{t(complete?'Completion records this exercise only. It is not a measure of trading skill or profitability.':task.copy)}</p></div></div>
   {!complete&&<>
    <p className="lab-small">{message('Visible candles: 1–{count}. Later candles and outcomes are hidden.',{count:visible})}</p>
    {stage===0&&<p className="lab-small">{message('Supplied sweep window: candles {from}–{through}.',{from:drill.e.sweep.candleIndexStart+1,through:drill.e.sweep.candleIndexEnd+1})}</p>}
    {stage===1&&<p className="lab-small">{message('Compare bodies in candles {from}–{through}.',{from:drill.from+1,through:drill.through+1})}</p>}
    <CandleBoard key={stage} bars={scenario.candles.slice(0,visible)} selected={hint||solved?stage===2&&drill.gap?[drill.gap.middle-1,drill.gap.middle,drill.gap.middle+1]:task.indices:chosen===null?[]:[chosen]} onSelect={choose} zones={stage===2&&drill.gap&&(hint||solved)?[{low:drill.gap.low,high:drill.gap.high,label:'FVG'}]:[]} levels={[{price:drill.reference,label:drill.e.bullish?'Prior low':'Prior high'}]}/>
    <div className="lab-actions"><button type="button" onClick={()=>setHint(true)}>{t('Show a visual hint')}</button><button type="button" className="lab-primary" disabled={!solved} onClick={next}>{t(stage===2?'Review my observations':'Next observation')}</button></div>
    <p className="lab-feedback" role="status" aria-live="polite">{feedback}</p>{(solved||hint)&&<aside className="lab-insight">{t(task.learn)}</aside>}
    <a className="lab-lesson-link" href={href(lesson(task.chapter))}>{t('Need the explanation? Revisit this lesson')} →</a>
   </>}
   {complete&&<div className="lab-review-grid">{drill.tasks.map((item,i)=><article key={item.title}><h4>{t(item.title)}</h4><p className="lab-small">{t(review[i]===undefined?'Not completed':review[i]?'Completed with a hint':'Completed without a hint')}</p><p>{t(item.learn)}</p><a href={href(lesson(item.chapter))}>{t('Revisit the lesson')} →</a></article>)}</div>}
   {complete&&<div className="lab-actions"><a className="lab-primary" href={href('/tools/simulator/')}>{t('Next: practise a decision with hidden candles')}</a><button type="button" onClick={restart}>{t('Start again')}</button></div>}
  </section>
  <details className="lab-method"><summary>{t('How this guided exercise works')}</summary><p>{t('Each task reveals only its required observation window. Sweep references come from earlier displayed candles; displacement compares open-to-close bodies in the stated window. The FVG task checks completed outer-wick non-overlap before the authored study window ends. If none qualifies, it uses the reference-area task.')}</p><p>{t('Hints are recorded only for this attempt. Nothing here is a prediction score, an independent assessment or saved account progress.')}</p></details>
  <p className="lab-small">{t('Authored illustrative candles, not historical or live market data. Numbers below the chart are keyboard-accessible candle selectors.')}</p>
 </div>;
}
