import {useState} from 'react';
import {Mentorship2025Replay} from './Mentorship2025Replay';
import {useTranslation} from '../i18n/TranslationProvider';
export {hasMentorship2025Edition} from '../data/chapters/mentorship2025Visuals';

/** Real historical candles teach the chart context; option arithmetic remains explicitly hypothetical. */
export function Mentorship2025Diagram({chapterId,caseId,staticOnly=false}:{chapterId:number;caseId?:string;staticOnly?:boolean}){
 return <><Mentorship2025Replay key={chapterId} chapterId={chapterId} caseId={caseId} staticOnly={staticOnly}/>{chapterId===63&&<OptionsPayoff/>}</>;
}
function OptionsPayoff(){
 const {t}=useTranslation();const [settlement,setSettlement]=useState(102);
 const call=(2.5-Math.max(settlement-100,0))*100,spread=(1.2-Math.min(Math.max(settlement-100,0),5))*100;
 return <details className="m25-option-math"><summary>{t('Separate exercise: hypothetical option payoff')}</summary><div><p>{t('Invented scale: short call strike 100, premium 2.5; call credit spread 100/105, credit 1.2; multiplier 100. These are not historical option quotes. Figures are expiry payoffs before costs, not a full margin or execution model.')}</p><label>{t('Hypothetical settlement price')} <output dir="ltr">{settlement}</output><input aria-label={t('Hypothetical settlement price')} type="range" min="98" max="112" step=".5" value={settlement} onChange={e=>setSettlement(Number(e.target.value))}/></label><div className="m25-payoffs"><span>{t('Uncovered short call')}<strong dir="ltr">{call.toFixed(2)}</strong></span><span>{t('100/105 call credit spread')}<strong dir="ltr">{spread.toFixed(2)}</strong></span></div></div></details>;
}
