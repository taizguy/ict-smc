import { useState } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import { SIMULATOR_MODELS } from '../utils/workbenchToolRoutes';
import type { LabBar } from '../utils/backtestEngine';
import { CandleBoard } from './labs/CandleBoard';
export interface TradeSimulatorProps {initialModelSlug?:string;onNavigateUrl?:(url:string)=>void}
const paths=[
 [100,99,101,100,102,101,100,99,101,103,105,107,104,109,112,111],
 [100,101,100,102,101,100,102,103,101,98,96,94,97,92,90,91],
 [100,99,101,100,101,100,99,100,101,98,102,99,101,100,98,101],
 [100,101,100,102,101,100,99,100,92,96,99,103,107,105,108,104],
];
type Result={r:number|null;label:string};
export function TradeSimulator({initialModelSlug}:TradeSimulatorProps){
 const {t,href}=useTranslation();const model=SIMULATOR_MODELS.find(m=>m.slug===initialModelSlug)||SIMULATOR_MODELS[0];
 const [caseIndex,setCase]=useState(0),[count,setCount]=useState(8),[direction,setDirection]=useState<'long'|'short'|'wait'>(model.direction==='LONG'?'long':'short'),[risk,setRisk]=useState(4),[reward,setReward]=useState(2),[locked,setLocked]=useState(false),[result,setResult]=useState<Result|null>(null);
 const values=paths[caseIndex%paths.length];
 const bars:LabBar[]=values.map((close,i)=>{const open=i===8&&caseIndex%4===3?94:(i?values[i-1]:close);return {time:String(i+1),open,close,high:Math.max(open,close)+.6,low:Math.min(open,close)-.6};});
 const sign=direction==='short'?-1:1,entry=bars[7].close,stop=entry-sign*risk,target=entry+sign*risk*reward;
 const advance=()=>{
  if(count>=bars.length||result)return;
  const b=bars[count];setCount(count+1);
  if(direction==='wait'){if(count+1===bars.length)setResult({r:null,label:'You waited. No trade is a valid decision.'});return;}
  const stopGap=sign===1?b.open<=stop:b.open>=stop,targetGap=sign===1?b.open>=target:b.open<=target;
  const stopped=sign===1?b.low<=stop:b.high>=stop,won=sign===1?b.high>=target:b.low<=target;
  if(stopGap)setResult({r:(b.open-entry)*sign/risk-.05,label:'The opening gap passed your stop. The modeled loss is larger than planned.'});
  else if(targetGap)setResult({r:reward-.05,label:'The target was reached. This uses an idealized target fill.'});
  else if(stopped&&won)setResult({r:null,label:'Both levels were touched in one candle. OHLC data cannot determine which came first.'});
  else if(stopped||won)setResult({r:(stopped?-1:reward)-.05,label:stopped?'The stop was reached. A planned loss is still a loss.':'The target was reached. One result does not validate a method.'});
  else if(count+1===bars.length)setResult({r:(b.close-entry)*sign/risk-.05,label:'The exercise ended. The position is closed at the final displayed close.'});
 };
 const reset=()=>{setCase(i=>i+1);setCount(8);setLocked(false);setResult(null);};
 return <div className="visual-lab"><header className="lab-intro"><span className="lab-eyebrow">{t('02 / DECIDE')}</span><h2>{t('Make the plan. Then reveal the future.')}</h2><p>{t('Choose a direction, stop distance and target. Lock your decision before the next candle appears.')}</p><details><summary>{t("More study contexts")}</summary><p>{t("These links open general execution drills. They do not reproduce each named model’s complete rules.")}</p><div className="lab-route-links">{SIMULATOR_MODELS.map(m=><a key={m.slug} aria-current={m.slug===model.slug?'page':undefined} href={href(`/tools/simulator/${m.slug}/`)}>{t(m.name)}</a>)}</div></details></header>
 <p className="lab-small">{t('1R is the planned loss from entry to stop, before costs. A 2R target is twice that distance. R is not money or a guaranteed return.')}</p><section className="lab-workspace"><div className="lab-task"><span className="lab-step-count" dir="ltr">{caseIndex+1}</span><div><h3>{t(locked?'Your decision is locked':'What would you do here?')}</h3><p>{t('Fictional price units. Future candles remain hidden until you advance.')}</p></div></div>
 <CandleBoard bars={bars.slice(0,count)} levels={direction==='wait'?[]:[{price:entry,label:'Entry'},{price:stop,label:'Stop',tone:'loss'},{price:target,label:'Target',tone:'gain'}]}/>
 {!locked?<div className="lab-plan"><fieldset><legend>{t('Your decision')}</legend><div className="lab-actions">{(['long','short','wait'] as const).map(d=><button key={d} aria-pressed={direction===d} onClick={()=>setDirection(d)}>{t(d==='long'?'Buy / long':d==='short'?'Sell / short':'Wait / no trade')}</button>)}</div></fieldset>{direction!=='wait'&&<><label>{t('Stop distance')}<input type="range" min="2" max="10" value={risk} onChange={e=>setRisk(+e.target.value)}/><output>{risk}</output></label><fieldset><legend>{t('Target distance')}</legend><div className="lab-actions">{[1,2,3].map(r=><button key={r} aria-pressed={reward===r} onClick={()=>setReward(r)}>{r}R</button>)}</div></fieldset></>}<button className="lab-primary" onClick={()=>setLocked(true)}>{t('Lock my decision')}</button></div>:<div className="lab-actions"><button className="lab-primary" disabled={!!result||count>=bars.length} onClick={advance}>{t('Reveal next candle')}</button>{direction!=='wait'&&!result&&<button onClick={()=>setResult({r:(bars[count-1].close-entry)*sign/risk-.05,label:'You closed at the latest displayed close.'})}>{t('Close practice position')}</button>}</div>}
 {result&&<div className="lab-result" role="status"><span>{t('Practice result')}</span><strong dir="ltr">{result.r===null?'—':`${result.r.toFixed(2)}R`}</strong><p>{t(result.label)}</p><button onClick={reset}>{t('Try a different sequence')}</button></div>}
 </section><p className="lab-small">{t('Synthetic exercises, not historical trades. Net results subtract a fixed 0.05R cost. Stop gaps fill at the opening price; target gaps use the target price. Real liquidity, spread and slippage can change execution.')}</p><a href={href('/tools/backtest/')}>{t('Next: test a rule across many examples')}</a></div>;
}
