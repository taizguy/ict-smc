import {useEffect, useId, useState} from 'react';
import {ArrowLeft, ArrowRight, Pause, Play, RotateCcw} from 'lucide-react';
import figures from '../data/chapters/deliveryFigures.json';
import {useTranslation} from '../i18n/TranslationProvider';

type Candle = number[];
interface Stage {count:number; title:string; note:string}
interface Variant {label:string; candles:Candle[]; steps:Stage[]; zone?:number[]|null; levels:(number|string)[][]; labels:string[]; intervals?:(number|string)[][]}
interface Figure {id:string;chapter:number;section:number;title:string;description:string;variants:Variant[]}
const examples=figures as Figure[];
export const hasDeliveryEdition=(id:number)=>id>=13&&id<=16;

/** One source of OHLC truth drives the picture, inspection readout and accessible table. */
function Example({example,staticOnly=false}:{example:Figure;staticOnly?:boolean}){
 const {t,message}=useTranslation();
 const uid=useId().replace(/:/g,'');
 const [version,setVersion]=useState(0);
 const [stage,setStage]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [inspect,setInspect]=useState<number|null>(null);
 const [depth,setDepth]=useState(50);
 const v=example.variants[version];
 const step=v.steps[staticOnly?v.steps.length-1:stage];
 const visible=v.candles.slice(0,step.count);
 useEffect(()=>{
  if(!playing)return;
  const timer=window.setTimeout(()=>{if(stage>=v.steps.length-1)setPlaying(false);else setStage(s=>s+1);},1800);
  return()=>window.clearTimeout(timer);
 },[playing,stage,v]);
 const change=(next:number)=>{setPlaying(false);setVersion(next);setStage(0);setInspect(null);};
 const selectStage=(next:number)=>{setPlaying(false);setStage(next);setInspect(null);};
 const vals=[...v.candles.flatMap(c=>[c[1],c[2]]),...v.levels.map(l=>Number(l[0])),...(v.zone?.slice(0,2)||[])];
 const lo=Math.min(...vals),hi=Math.max(...vals),pad=Math.max((hi-lo)*.13,1),min=lo-pad,max=hi+pad;
 const y=(p:number)=>240-(p-min)/(max-min)*202;
 const x=(i:number)=>62+i*508/Math.max(v.candles.length-1,2);
 const width=Math.min(34,300/Math.max(v.candles.length,3));
 const selected=inspect!==null&&inspect<visible.length?inspect:visible.length-1;
 const c=visible[selected];
 const showZone=v.zone&&step.count>=v.zone[2];
 const probe=example.id==='fvg-anatomy'&&showZone&&!staticOnly;
 const probePrice=v.zone?(version===0?v.zone[1]-(v.zone[1]-v.zone[0])*depth/100:v.zone[0]+(v.zone[1]-v.zone[0])*depth/100):0;
 const probeLabel=depth===0?'Edge test':depth===50?'Midpoint reached':depth===100?'Far edge reached':depth<50?'Before CE':'Beyond CE';
 const price=(n:number)=>Number(n.toFixed(2)).toString();
 const titleId=`${uid}-title`,captionId=`${uid}-caption`;
 return <figure className={`delivery-figure delivery-ch-${example.chapter}`} aria-labelledby={titleId}>
  <header className="delivery-figure-heading"><span className="delivery-kicker">{t('Invented teaching prices · not market data')}</span><h3 id={titleId}>{t(example.title)}</h3><p>{t(example.description)}</p></header>
  {!staticOnly&&example.variants.length>1&&<div className="delivery-variants" role="group" aria-label={t('Explore another version')}>{example.variants.map((item,i)=><button type="button" key={item.label} aria-pressed={version===i} onClick={()=>change(i)}>{t(item.label)}</button>)}</div>}
  {v.intervals?<IntervalDiagram intervals={v.intervals} title={t(example.title)}/>:<>
   <div className="delivery-chart-scroll" tabIndex={0} role="region" aria-label={t(example.title)}>
    <svg viewBox="0 0 680 284" className="delivery-candle-chart" role="img" aria-labelledby={`${uid}-svg-title ${uid}-svg-desc`}>
     <title id={`${uid}-svg-title`}>{`${t(example.title)} — ${t(v.label)}`}</title><desc id={`${uid}-svg-desc`}>{t(step.note)}</desc>
     <defs><linearGradient id={`${uid}-wash`} x1="0" x2="1"><stop stopColor="var(--delivery-accent)" stopOpacity=".06"/><stop offset="1" stopColor="var(--delivery-accent)" stopOpacity=".2"/></linearGradient></defs>
     {[0,1,2,3,4].map(i=>{const p=min+(max-min)*i/4;return <g key={i} className="delivery-grid"><line x1="34" x2="590" y1={y(p)} y2={y(p)}/><text x="606" y={y(p)+4}>{price(p)}</text></g>;})}
     {showZone&&<g className="delivery-zone"><rect x="34" y={y(v.zone![1])} width="556" height={y(v.zone![0])-y(v.zone![1])} fill={`url(#${uid}-wash)`}/>{v.zone!.slice(0,2).map(p=><line key={p} x1="34" x2="590" y1={y(p)} y2={y(p)}/>)}</g>}
     {v.levels.filter(()=>showZone||!v.zone).map(([p,label],i)=><g key={`${label}-${i}`} className="delivery-level"><line x1="34" x2="590" y1={y(Number(p))} y2={y(Number(p))}/><text x="36" y={y(Number(p))-7}>{t(String(label))} · {price(Number(p))}</text></g>)}
     {visible.map(([o,h,l,close],i)=><g key={`${version}-${i}`} className={`delivery-candle ${close>=o?'is-up':'is-down'} ${selected===i?'is-inspected':''}`}>
      {v.labels[i]==='Reference'&&<rect className="delivery-reference-frame" x={x(i)-width/2-5} y={y(h)-6} width={width+10} height={y(l)-y(h)+12} rx="4"/>}<line x1={x(i)} x2={x(i)} y1={y(h)} y2={y(l)}/><rect x={x(i)-width/2} y={y(Math.max(o,close))} width={width} height={Math.max(2,Math.abs(y(o)-y(close)))}/>
      <text x={x(i)} y="268" textAnchor="middle">{v.labels[i]?t(v.labels[i]):i+1}</text>
      {!staticOnly&&<rect className="delivery-hit" x={x(i)-22} y="22" width="44" height="220" onPointerEnter={()=>setInspect(i)} onPointerLeave={()=>setInspect(null)} onClick={()=>setInspect(i)}/>}
     </g>)}
     {visible.length<v.candles.length&&<g className="delivery-future"><line x1={x(visible.length)-22} x2={x(visible.length)-22} y1="20" y2="242"/><text x={x(visible.length)} y="32">···</text></g>}
     {probe&&<g className="delivery-probe-line"><line x1="34" x2="590" y1={y(probePrice)} y2={y(probePrice)}/><circle cx="584" cy={y(probePrice)} r="5"/></g>}
    </svg>
   </div>
   <p className="delivery-scroll-hint">{t('Scroll the chart horizontally on smaller screens.')}</p>
   {c&&<div className="delivery-inspector"><label>{t('Inspect a candle')} {!staticOnly&&<select value={selected} onChange={e=>setInspect(Number(e.target.value))} aria-label={t('Inspect a candle')}>{visible.map((_,i)=><option key={i} value={i}>{v.labels[i]?t(v.labels[i]):`${i+1}`}</option>)}</select>}</label><dl dir="ltr">{['Open','High','Low','Close'].map((label,i)=><div key={label}><dt>{t(label)}</dt><dd>{price(c[i])}</dd></div>)}</dl></div>}
  </>}
  {probe&&<div className="delivery-depth"><label htmlFor={`${uid}-depth`}>{t('Explore return depth')}<output htmlFor={`${uid}-depth`}><bdi>{price(probePrice)} · {depth}%</bdi></output></label><input id={`${uid}-depth`} type="range" min="0" max="100" step="5" value={depth} onChange={e=>setDepth(Number(e.target.value))} aria-valuetext={message('Probe price {price}; depth {depth} percent',{price:price(probePrice),depth})}/><p><strong>{t(probeLabel)}</strong> · {t('Move the probe; it is a measurement guide, not a future candle.')}</p></div>}
  <figcaption id={captionId} className="delivery-stage" aria-live={staticOnly?'off':'polite'}><span aria-hidden="true">{String((staticOnly?v.steps.length-1:stage)+1).padStart(2,'0')}</span><div><strong>{t(step.title)}</strong><p>{t(step.note)}</p></div></figcaption>
  {!staticOnly&&v.steps.length>1&&<div className="delivery-playback">
   <button type="button" onClick={()=>{setPlaying(false);setStage(0);setInspect(null);}} aria-label={t('Replay this example')}><RotateCcw size={17}/></button>
   <button type="button" onClick={()=>{if(stage===v.steps.length-1)setStage(0);setPlaying(p=>!p);}} aria-pressed={playing}>{playing?<Pause size={16}/>:<Play size={16}/>}<span>{t(playing?'Pause replay':'Play sequence')}</span></button>
   <div className="delivery-progress" role="group" aria-label={t('Completed candles')}>{v.steps.map((s,i)=><button type="button" key={i} aria-label={t(s.title)} aria-current={stage===i?'step':undefined} onClick={()=>selectStage(i)}><span/><b>{i+1}</b></button>)}</div>
   <button type="button" disabled={stage===0} onClick={()=>selectStage(stage-1)} aria-label={t('Previous stage')}><ArrowLeft size={17}/></button><button type="button" disabled={stage===v.steps.length-1} onClick={()=>selectStage(stage+1)} aria-label={t('Next stage')}><ArrowRight size={17}/></button>
  </div>}
  {visible.length>0&&<details className="delivery-values"><summary>{t('Visible OHLC values')}</summary><div className="delivery-table-scroll"><table><caption>{t(v.label)} · {t('Completed candles')}</caption><thead><tr>{['Candle','Open','High','Low','Close'].map(h=><th key={h} scope="col">{t(h)}</th>)}</tr></thead><tbody>{visible.map((values,i)=><tr key={i}><th scope="row">{v.labels[i]?t(v.labels[i]):i+1}</th>{values.map((p,j)=><td key={j}><bdi>{price(p)}</bdi></td>)}</tr>)}</tbody></table></div></details>}
  {staticOnly&&<div className="delivery-static-alternatives">{example.variants.slice(1).map(other=><p key={other.label}><strong>{t(other.label)}: </strong>{t(other.steps.at(-1)!.note)}</p>)}</div>}
 </figure>;
}

function IntervalDiagram({intervals,title}:{intervals:(number|string)[][];title:string}){
 const {t}=useTranslation();
 const a=intervals[0],b=intervals[1],lower=Math.max(Number(a[0]),Number(b[0])),upper=Math.min(Number(a[1]),Number(b[1]));
 const x=(n:number)=>55+(n-99)*67;
 return <div className="delivery-chart-scroll"><svg viewBox="0 0 680 254" className="delivery-candle-chart delivery-intervals" role="img" aria-label={title}>
  {Array.from({length:9},(_,i)=>99+i).map(n=><g className="delivery-grid" key={n}><line x1={x(n)} x2={x(n)} y1="35" y2="212"/><text x={x(n)} y="237" textAnchor="middle">{n}</text></g>)}
  {intervals.map(([low,high,label],i)=><g className={`delivery-interval interval-${i}`} key={i}><rect x={x(Number(low))} y={40+i*68} width={x(Number(high))-x(Number(low))} height="46" rx="7"/><text x={x(Number(low))+13} y={69+i*68}>{t(String(label))} · {low}–{high}</text></g>)}
  {upper>lower?<g className="delivery-shared"><rect x={x(lower)} y="37" width={x(upper)-x(lower)} height="120" rx="6"/><text x={(x(lower)+x(upper))/2} y="193" textAnchor="middle">{lower}–{upper}</text></g>:<text x="55" y="193" className="delivery-no-overlap">{t('No positive-width overlap')}</text>}
 </svg></div>;
}

export function DeliveryLessonFigure({chapterId,section,staticOnly=false}:{chapterId:number;section:number;staticOnly?:boolean}){
 const example=examples.find(e=>e.chapter===chapterId&&e.section===section);
 return example?<Example key={example.id} example={example} staticOnly={staticOnly}/>:null;
}

export function DeliveryLessonWorkshop({chapterId,staticOnly=false}:{chapterId:number;staticOnly?:boolean}){
 const {t}=useTranslation();
 return <div className="delivery-workshop"><p>{t('Return to the lesson explanations for the full context.')}</p>{examples.filter(e=>e.chapter===chapterId).map(example=><Example key={example.id} example={example} staticOnly={staticOnly}/>)}</div>;
}


