import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import { chapterCount } from '../utils/catalogCounts';
import { CandleBoard } from './labs/CandleBoard';

const prices = [99,100,99.5,100.2,100,98,99.4,101.5,102.6,101.9,103,104];
const bars = prices.map((close,i) => {
  const open = i ? prices[i-1] : close;
  return {time:String(i+1),open,close,high:Math.max(open,close)+.25,low:Math.min(open,close)-.25};
});
const observations = [
  {label:'Liquidity sweep',description:'Price moved below an earlier low. A reversal is not guaranteed.',selected:[5]},
  {label:'Displacement',description:'A larger directional body. Observe the move before interpreting its cause.',selected:[7]},
  {label:'FVG',description:'The outer candles leave a range gap. A future revisit is uncertain.',selected:[6,7,8]},
];

export function LearningHero({staticOnly=false}:{staticOnly?:boolean}) {
  const Heading = staticOnly ? 'h2' : 'h1';
  const {t,href} = useTranslation();
  const [running,setRunning] = useState(!staticOnly);
  const [observation,setObservation] = useState(2);
  useEffect(() => {
    if (!running) return;
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) {setRunning(false);return;}
    const stop = () => {if(query.matches || document.hidden) setRunning(false);};
    query.addEventListener('change',stop);
    document.addEventListener('visibilitychange',stop);
    const timer = setTimeout(()=>setRunning(false),4500);
    return () => {clearTimeout(timer);query.removeEventListener('change',stop);document.removeEventListener('visibilitychange',stop);};
  },[running]);

  return <section className="learning-hero studio-hero">
    <div className="hero-copy">
      <p className="studio-kicker"><span className="studio-spark" aria-hidden="true">✳</span>{t('A place to study price.')}</p>
      <Heading>{t('Understand the chart.')}<br/><span>{t('Practice the decision.')}</span></Heading>
      <p className="hero-description">{t('Learn ICT and Smart Money Concepts through clear lessons, original diagrams and practical chart exercises. Build understanding one observation at a time.')}</p>
      <div className="lab-actions"><a className="lab-primary" href={href('/learn/what-actually-moves-price/')}>{t('Start with lesson 1')} <span className="studio-arrow" aria-hidden="true">↗</span></a><a className="studio-secondary" href={href('/tools/chartlab/')}>{t('Try a visual exercise')} <span aria-hidden="true">→</span></a></div>
      <div className="hero-proof"><span><b>{chapterCount}</b> {t('lessons')}</span><span><b>3</b> {t('visual practice labs')}</span><span>{t('Free. No signup.')}</span></div>
      <a className="hero-download" href={href('/resources/ict-smc-cheat-sheet/')}>{t('Get the free ICT/SMC cheat sheet')} <span aria-hidden="true">↓</span></a>
    </div>
    <div className="studio-chart-stage">
      <span className="studio-floating-label" aria-hidden="true">{t('Small observations. Better questions.')}<svg viewBox="0 0 90 45" width="90" height="45"><path d="M3 7q69-15 73 26m-12-6 13 9 7-13"/></svg></span>
      <div className={`hero-market ${running?'is-running':''}`}>
        <div className="hero-chart-heading"><span><i/>{t('One chart. Three observations.')}</span><span className="hero-example-tag">{t('ILLUSTRATION')}</span></div>
        <CandleBoard bars={bars} selected={observations[observation].selected} zones={observation===2?[{low:bars[6].high,high:bars[8].low,label:'Bullish FVG'}]:[]} levels={observation===0?[{price:bars[0].low,label:'Prior low'}]:[]}/>
        {!staticOnly ? <div className="studio-chart-controls" role="group" aria-label={t('One chart. Three observations.')}>{observations.map((o,i)=><button key={o.label} aria-pressed={observation===i} onClick={()=>setObservation(i)}><span aria-hidden="true">0{i+1}</span>{t(o.label)}</button>)}</div> : <div className="hero-chart-legend"><span>01 {t('Reference')}</span><span>02 {t('Displacement')}</span><span>03 {t('Imbalance')}</span></div>}
        <p className="studio-observation" role="status">{t(observations[observation].description)}</p>
        <div className="hero-chart-footer"><small>{t('An explanation, not a live market feed.')}</small>{!staticOnly&&<button onClick={()=>setRunning(s=>!s)}>{t(running?'Pause chart':'Replay chart')}</button>}</div>
      </div>
      <span className="studio-chart-stamp" aria-hidden="true"><b translate="no" dir="ltr">ICT / SMC</b><span>{t('Observe. Question. Repeat.')}</span></span>
    </div>
  </section>;
}
