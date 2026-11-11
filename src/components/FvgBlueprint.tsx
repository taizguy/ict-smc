import {useEffect,useId,useState} from 'react';
import type {ReactNode} from 'react';
import {useTranslation} from '../i18n/TranslationProvider';
import {fvgDocument} from '../data/chapters/fvgDocument';

export type FvgBlueprintKind='shelf'|'builder'|'ce'|'cycle'|'comparison'|'inversion'|'timeframes'|'plan'|'sizing'|'quality'|'confluence'|'myths';
export const blueprintCopy:Record<string,string>={
 'Illustrative, invented prices; not a historical trade.':'فرضی تدریسی قیمتیں؛ تاریخی ٹریڈ نہیں۔',
 'The skipped shelf.':'چھوڑی گئی شیلف۔',
 'Interactive diagram showing when three candles create a fair value gap.':'تین کینڈلز سے فیئر ویلیو گیپ بننے یا نہ بننے کا انٹرایکٹو خاکہ۔',
 'Animation of price testing the midpoint of a fair value gap with three possible outcomes.':'قیمت کے فیئر ویلیو گیپ کے وسط کو جانچنے اور تین ممکنہ نتائج کی اینیمیشن۔',
 'Flow diagram of the stages in the life of a fair value gap.':'فیئر ویلیو گیپ کی مختلف حالتوں کا فلو خاکہ۔',
 'Four chart panels comparing a price gap, FVG, liquidity void and volume imbalance.':'پرائس گیپ، FVG، لیکویڈیٹی وائیڈ اور والیوم امبیلنس کا موازنہ کرنے والے چار چارٹ۔',
 'Animation of a bullish fair value gap turning into a bearish inverse fair value gap.':'بلش فیئر ویلیو گیپ کے بیئرش انورس فیئر ویلیو گیپ بننے کی اینیمیشن۔',
 'Three stacked timeframes showing a fair value gap nested inside a larger one.':'تین ٹائم فریمز میں بڑے فیئر ویلیو گیپ کے اندر چھوٹا گیپ دکھایا گیا ہے۔',
 'Annotated chart showing the nine steps of a fair value gap trade plan.':'فیئر ویلیو گیپ کے ٹریڈ پلان کے نو مراحل والا چارٹ۔',
 'Position size uses account risk divided by stop distance.':'پوزیشن سائز کے لیے اکاؤنٹ رسک کو اسٹاپ فاصلے سے تقسیم کریں۔',
 'Count the chosen quality conditions; a score is not a win probability.':'منتخب معیار گنیں؛ اسکور کامیابی کا امکان نہیں۔',
 'Confluence layers are separate checks, not independent proof.':'کنفلوئنس کی تہیں الگ جانچ ہیں، آزاد ثبوت نہیں۔',
 'Open a myth to compare it with the document’s reality check.':'غلط فہمی کھول کر دستاویز کی وضاحت سے موازنہ کریں۔',
 'Candle 3 low':'کینڈل 3 کی لو','Use the slider or arrow keys.':'سلائیڈر یا تیر والے بٹن استعمال کریں۔',
 'Positive-width FVG':'مثبت چوڑائی کا FVG','Zero width':'صفر چوڑائی','Overlapping ranges':'اوورلیپ ہونے والی رینجز',
 'CE holds':'CE برقرار رہتا ہے','CE gives way':'CE ٹوٹتا ہے','Full close through':'پورے زون کے پار کلوز',
 'Wicks through, closes back':'وِک پار، کلوز واپس',
 'Play':'چلائیں','Pause':'روکیں','Replay':'دوبارہ چلائیں','Step':'مرحلہ',
 'Fresh':'نیا','Tapped':'چھوا گیا','CE tested':'CE جانچا گیا','Filled':'بھر گیا','Inverted':'اِنورٹ ہو گیا','Breakaway':'بریک اوے',
 'Forms':'بنتا ہے','Closes through':'پار کلوز ہوتا ہے','Retests from below':'نیچے سے ری ٹیسٹ',
 'Price gap':'پرائس گیپ','Liquidity void':'لیکویڈیٹی وائیڈ','Volume imbalance':'والیوم امبیلنس',
 'Daily':'روزانہ','15-minute':'15 منٹ','1-minute':'1 منٹ',
 'Account':'اکاؤنٹ','Risk %':'رسک %','Entry':'انٹری','Stop':'اسٹاپ','Target':'ہدف','Units':'اکائیاں',
 'Risk amount':'رسک کی رقم','Stop distance':'اسٹاپ فاصلہ','Planned R before costs':'اخراجات سے پہلے منصوبہ شدہ R',
 'Use finite positive values, a stop below entry and a target above entry.':'محدود مثبت اعداد دیں، اسٹاپ انٹری کے نیچے اور ہدف انٹری کے اوپر رکھیں۔',
 'Floor to whole units; excludes costs, contract multipliers and execution limits.':'مکمل اکائی تک کم کیا گیا؛ اخراجات، کنٹریکٹ ملٹی پلائر اور فِل کی پابندیاں شامل نہیں۔',
 'Selected':'منتخب','Check a condition':'شرط منتخب کریں','Illustrative sequence, not a forecast.':'فرضی ترتیب، پیش گوئی نہیں۔',
 'Formation':'تشکیل','Retest':'ری ٹیسٹ','Failure':'ناکامی','C1 high':'C1 کی ہائی','C3 low':'C3 کی لو',
 'Gap bounds':'گیپ کی حدیں','CE midpoint':'CE وسط','Support fails':'سپورٹ ناکام','Possible resistance':'ممکنہ ریزسٹنس'
};
const captions:Record<FvgBlueprintKind,string>={shelf:'The skipped shelf.',builder:'Interactive diagram showing when three candles create a fair value gap.',ce:'Animation of price testing the midpoint of a fair value gap with three possible outcomes.',cycle:'Flow diagram of the stages in the life of a fair value gap.',comparison:'Four chart panels comparing a price gap, FVG, liquidity void and volume imbalance.',inversion:'Animation of a bullish fair value gap turning into a bearish inverse fair value gap.',timeframes:'Three stacked timeframes showing a fair value gap nested inside a larger one.',plan:'Annotated chart showing the nine steps of a fair value gap trade plan.',sizing:'Position size uses account risk divided by stop distance.',quality:'Count the chosen quality conditions; a score is not a win probability.',confluence:'Confluence layers are separate checks, not independent proof.',myths:'Open a myth to compare it with the document’s reality check.'};
const figureNumbers:Record<FvgBlueprintKind,number>={shelf:1,builder:2,ce:3,cycle:4,comparison:5,inversion:6,timeframes:7,plan:8,sizing:9,quality:10,confluence:11,myths:12};
export function positionSize(account:number,risk:number,entry:number,stop:number,target:number){
 if(![account,risk,entry,stop,target].every(Number.isFinite)||account<=0||risk<=0||risk>100||stop<=0||entry<=stop||target<=entry)return null;
 const amount=account*risk/100,distance=entry-stop;return {amount,distance,units:Math.floor(amount/distance),r:(target-entry)/distance};
}
function Candle({x,o,h,l,c,amber=false}:{x:number;o:number;h:number;l:number;c:number;amber?:boolean}){return <g className={`fb-candle${amber?' fb-amber':''}${c<o?' fb-up':' fb-down'}`}><line x1={x} x2={x} y1={h} y2={l}/><rect x={x-14} width={28} y={Math.min(o,c)} height={Math.max(3,Math.abs(o-c))} fill={c<o?'currentColor':'var(--fb-paper)'}/></g>;}
function Line({points,dashed=false}:{points:string;dashed?:boolean}){return <polyline className={`fb-path${dashed?' fb-dashed':''}`} points={points} fill="none"/>;}
export function FvgBlueprint({kind,staticOnly=false}:{kind:FvgBlueprintKind;staticOnly?:boolean}){
 const {t:translate,locale}=useTranslation(),t=(s:string)=>locale==='ur'?(blueprintCopy[s]||translate(s)):s,id=useId().replace(/:/g,''),[low,setLow]=useState(102),[outcome,setOutcome]=useState(0),[stage,setStage]=useState(0),[playing,setPlaying]=useState(false),[reduced,setReduced]=useState(false),[checks,setChecks]=useState<number[]>([]),[values,setValues]=useState([10000,1,101,99.6,106.5]);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>{setReduced(mq.matches);if(mq.matches)setPlaying(false);};change();mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change);},[]);
 const max=kind==='ce'?4:2;
 useEffect(()=>{if(!playing||reduced||staticOnly)return;const timer=setInterval(()=>setStage(s=>{if(s>=max){setPlaying(false);return s;}return s+1;}),850);return()=>clearInterval(timer);},[playing,reduced,staticOnly,max]);
 const priceY=(v:number)=>275-(v-98)*28;
 const label=(x:number,y:number,text:string,anchor:'start'|'middle'|'end'='start')=><text x={x} y={y} textAnchor={anchor}>{t(text)}</text>;
 const frame=(children:ReactNode,h=340)=><svg className="fb-sheet" viewBox={`0 0 660 ${h}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}><title id={`${id}-title`}>{t(captions[kind])}</title><desc id={`${id}-desc`}>{t('Illustrative, invented prices; not a historical trade.')}</desc><defs><pattern id={`${id}-grid`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="var(--fb-grid)" strokeWidth=".5"/></pattern></defs><rect width="660" height={h} fill={`url(#${id}-grid)`}/>{children}</svg>;
 const zone=(x=270,y=163,w=310,h=56)=><rect className="fb-zone" x={x} y={y} width={w} height={h}/>;
 const playControls=(names:string[])=><div className="fb-controls">{names.map((n,i)=><button type="button" key={n} aria-pressed={outcome===i} onClick={()=>{setOutcome(i);setStage(0);setPlaying(false);}}>{t(n)}</button>)}<button type="button" onClick={()=>{if(stage>=max)setStage(0);setPlaying(!playing);}} disabled={reduced}>{t(playing?'Pause':stage>=max?'Replay':'Play')}</button><button type="button" onClick={()=>{setPlaying(false);setStage((stage+1)%(max+1));}}>{t('Step')} {stage+1}/{max+1}</button></div>;
 let visual:ReactNode,controls:ReactNode=null,fallback:ReactNode=null;
 if(kind==='shelf'||kind==='builder'){
  const edge=kind==='shelf'?102:low,valid=edge>100,top=priceY(edge);visual=frame(<>
   {valid&&<>{zone(145,top,425,priceY(100)-top)}<line className="fb-reference" x1="145" x2="570" y1={(top+priceY(100))/2} y2={(top+priceY(100))/2}/></>}
   <Candle x={135} o={priceY(99)} c={priceY(99.8)} h={priceY(100)} l={priceY(98.5)}/><Candle x={275} o={priceY(99.8)} c={priceY(103.8)} h={priceY(104)} l={priceY(99.8)} amber/><Candle x={415} o={priceY(edge+.7)} c={priceY(edge+1.8)} h={priceY(edge+2)} l={top}/>
   {label(135,310,'C1','middle')}{label(275,310,'C2','middle')}{label(415,310,'C3','middle')}{label(570,priceY(100)+24,'100','end')}{label(570,top-12,edge.toFixed(2),'end')}
   <path d={`M450 ${top}h35M450 ${priceY(100)}h35M475 ${top}V${priceY(100)}`} className="fb-measure"/>
  </>);
  fallback=<p>{t('C1 high')}: <bdi>100</bdi> · {t('C3 low')}: <bdi>{edge.toFixed(2)}</bdi> · <strong>{t(valid?'Positive-width FVG':edge===100?'Zero width':'Overlapping ranges')}</strong>{valid&&<> · CE = <bdi>{((100+edge)/2).toFixed(2)}</bdi></>}</p>;
  if(kind==='builder')controls=<label className="fb-range">{t('Candle 3 low')}<input aria-label={t('Candle 3 low')} type="range" min="99" max="103" step="0.25" value={low} onChange={e=>setLow(+e.target.value)}/><output aria-live="polite">{low.toFixed(2)}</output><small>{t('Use the slider or arrow keys.')}</small></label>;
 }else if(kind==='ce'){
  const paths=['80,60 175,85 260,132 350,190 470,70 560,45','80,60 175,85 260,132 350,215 470,170 560,110','80,60 175,85 260,132 350,200 470,255 560,270'];
  visual=frame(<>{zone(60,140,540,100)}<line className="fb-reference" x1="60" x2="600" y1="190" y2="190"/>{label(605,145,'102')}{label(605,195,'101')}{label(605,245,'100')}<defs><clipPath id={`${id}-reveal`}><rect width={120+stage*120} height="340" className="fb-reveal-window"/></clipPath></defs><g clipPath={`url(#${id}-reveal)`}><Line points={paths[outcome]}/>{outcome<2?<Candle x={350} o={160} c={175} h={145} l={outcome===0?190:215} amber/>:<Candle x={470} o={200} c={255} h={185} l={270} amber/>}</g>{label(70,310,['CE holds','Wicks through, closes back','Full close through'][outcome])}</>);controls=playControls(['CE holds','Wicks through, closes back','Full close through']);
  fallback=<p><bdi>100–102 · CE 101</bdi>. {t('CE holds')} / {t('Wicks through, closes back')} / {t('Full close through')}. {t('Illustrative sequence, not a forecast.')}</p>;
 }else if(kind==='cycle'){
  const states=['Fresh','Tapped','CE tested','Filled','Inverted','Breakaway'];visual=frame(<><path className="fb-path" d="M90 150H560M380 150V270H560M90 150V50H560" fill="none"/>{states.map((s,i)=>{const xy=[[90,150],[245,150],[400,150],[560,150],[560,270],[560,50]][i];return <g key={s}><circle cx={xy[0]} cy={xy[1]} r="12" className={outcome===i?'fb-tip':'fb-node'}/>{label(xy[0],xy[1]+37,s,'middle')}</g>;})}</>);controls=<div className="fb-controls">{states.map((s,i)=><button type="button" aria-pressed={outcome===i} key={s} onClick={()=>setOutcome(i)}>{t(s)}</button>)}</div>;fallback=<ol className="fb-inline-list">{states.map(s=><li key={s}>{t(s)}</li>)}</ol>;
 }else if(kind==='comparison'){
  visual=frame(<>{['Price gap','FVG','Liquidity void','Volume imbalance'].map((name,i)=><g key={name} transform={`translate(${i%2*330},${Math.floor(i/2)*210})`}><rect x="12" y="12" width="306" height="192" className="fb-panel"/>{label(28,40,name)}{i===0?<><Candle x={75} o={150} c={130} h={120} l={175}/><Candle x={200} o={88} c={68} h={55} l={100} amber/><path d="M75 115H260M75 106H260" className="fb-reference"/></>:i===1?<><rect className="fb-zone" x="85" y="104" width="180" height="28"/><Candle x={65} o={165} c={140} h={132} l={180}/><Candle x={145} o={150} c={85} h={75} l={170} amber/><Candle x={230} o={85} c={65} h={55} l={104}/></>:i===2?<><rect className="fb-zone" x="70" y="65" width="180" height="110"/>{[0,1,2,3,4].map(n=><Candle key={n} x={60+n*45} o={185-n*23} c={145-n*23} h={140-n*23} l={190-n*23} amber={n===2}/>)}</>:<><rect className="fb-zone" x="95" y="103" width="145" height="20"/><Candle x={95} o={155} c={123} h={75} l={180}/><Candle x={225} o={103} c={70} h={50} l={150} amber/></>}</g>)}</>,430);fallback=<p>{t('Price gap')} · FVG · {t('Liquidity void')} · {t('Volume imbalance')}</p>;
 }else if(kind==='inversion'){
  visual=frame(<>{zone(45,130,560,90)}<line className="fb-reference" x1="45" x2="605" y1="175" y2="175"/>{label(45,115,'100–102')}
   <Candle x={75} o={275} c={245} h={220} l={290}/><Candle x={165} o={250} c={85} h={65} l={260} amber/><Candle x={255} o={90} c={65} h={50} l={130}/>
   {stage>=1&&<Line points={stage===1?'285,60 360,160 425,260':'285,60 360,160 425,260 500,205 565,285'}/>}
   {stage>=1&&<Candle x={425} o={160} c={260} h={150} l={275} amber/>}{stage===2&&<path className="fb-measure" d="M500 196v-40h65"/>}{label(55,320,['Formation','Support fails','Possible resistance'][stage])}
  </>);controls=playControls([]);fallback=<ol>{['Forms','Closes through','Retests from below'].map(s=><li key={s}>{t(s)}</li>)}</ol>;
 }else if(kind==='timeframes'){
  visual=frame(<>{['Daily','15-minute','1-minute'].map((n,i)=><g key={n} transform={`translate(${i*55},${i*130})`}>{label(20,30,n)}<rect x="160" y="12" width={430-i*50} height="100" className="fb-panel"/><rect x={310-i*45} y="35" width={170-i*25} height="55" className="fb-zone"/><Line points={['180,85 240,75 280,92 340,25 410,40 490,30 570,55','180,60 235,78 280,95 330,65 380,50 450,75 510,38','180,85 230,72 270,95 320,30 370,50 430,22'][i]}/>{i<2&&<path className="fb-reference" d="M340 100l-35 45M480 100l35 45"/>}</g>)}</>,410);fallback=<p>{t('Daily')} → {t('15-minute')} → {t('1-minute')}. {t('Illustrative sequence, not a forecast.')}</p>;
 }else if(kind==='plan'){
  const plan=fvgDocument.sections.find(s=>s.number===13)!.blocks.find(b=>b.type==='list'&&b.ordered)?.items||[];
  visual=frame(<>{zone(315,175,285,55)}<Line points="35,130 100,110 155,155 215,250 270,190 330,95 395,75 460,200 520,110 595,50"/><line x1="35" x2="610" y1="155" y2="155" className="fb-reference"/>{[[65,100],[215,275],[330,65],[365,200],[460,230],[500,95],[540,140],[600,30],[600,295]].map(([x,y],i)=><g key={i}><circle className="fb-number" cx={x} cy={y} r="16"/><text x={x} y={y+6} textAnchor="middle">{i+1}</text></g>)}</>);fallback=<ol>{plan.map(p=><li key={p}>{t(p)}</li>)}</ol>;
 }else if(kind==='sizing'){
  const result=positionSize(...values as [number,number,number,number,number]);visual=<><div className="fb-size-inputs">{['Account','Risk %','Entry','Stop','Target'].map((name,i)=><label key={name}>{t(name)}<input type="number" min="0" max={i===1?100:undefined} step="any" value={Number.isNaN(values[i])?'':values[i]} onChange={e=>setValues(v=>v.map((n,j)=>i===j?e.target.valueAsNumber:n))}/></label>)}</div><output className="fb-size-results" aria-live="polite">{result?<>{[['Risk amount',result.amount.toFixed(2)],['Stop distance',result.distance.toFixed(2)],['Units',result.units],['Planned R before costs',result.r.toFixed(2)]].map(([name,v])=><span key={name}><small>{t(String(name))}</small><strong><bdi>{v}</bdi></strong></span>)}</>:t('Use finite positive values, a stop below entry and a target above entry.')}</output></>;fallback=<p dir={locale==='ur'?'rtl':undefined}><bdi>10,000 × 1% = 100 · 101 − 99.60 = 1.40 · floor(100 / 1.40) = 71</bdi>. {t('Floor to whole units; excludes costs, contract multipliers and execution limits.')}</p>;
 }else if(kind==='quality'){
  const rows=fvgDocument.sections.find(s=>s.number===11)!.blocks.find(b=>b.type==='table')!.rows!.slice(1);visual=<div className="fb-scorecard">{rows.map((r,i)=><label key={i}><input type="checkbox" checked={checks.includes(i)} onChange={()=>setChecks(v=>v.includes(i)?v.filter(n=>n!==i):[...v,i])}/><span><b>{t(r[0]!)}</b><small>{t(r[1]!)}</small></span></label>)}<output aria-live="polite">{t('Selected')}: {checks.length} / {rows.length}</output></div>;fallback=<p>{t(captions.quality)}</p>;
 }else if(kind==='confluence'){
  const rows=fvgDocument.sections.find(s=>s.number===15)!.blocks.find(b=>b.type==='table')!.rows!.slice(1);visual=<ol className="fb-layers">{rows.map((r,i)=><li key={i}><span className="fb-layer-no">{String(i+1).padStart(2,'0')}</span><div><strong>{t(r[0]!)}</strong><p>{t(r[1]!)}</p></div></li>)}</ol>;fallback=<p>{t(captions.confluence)}</p>;
 }else{
  const rows=fvgDocument.sections.find(s=>s.number===21)!.blocks.find(b=>b.type==='table')!.rows!.slice(1);visual=<div className="fb-myths">{rows.map((r,i)=><details key={i}><summary>{t(r[0]!)}</summary><p>{t(r[1]!)}</p></details>)}</div>;fallback=<p>{t(captions.myths)}</p>;
 }
 return <figure id={`fvg-figure-${kind}`} className={`fvg-blueprint fb-${kind}`} data-fvg-figure={kind}><div className="fb-plate-label" aria-hidden="true"><span>FVG / {String(figureNumbers[kind]).padStart(2,'0')}</span><span>LEARNSMC</span></div>{visual}{!staticOnly&&controls}<figcaption><strong>{String(figureNumbers[kind]).padStart(2,'0')} · {t(captions[kind])}</strong><div className="fb-fallback">{fallback}</div><small>{t('Illustrative, invented prices; not a historical trade.')}</small></figcaption></figure>;
}
