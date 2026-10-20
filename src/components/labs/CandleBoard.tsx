import { useTranslation } from '../../i18n/TranslationProvider';
import type { LabBar } from '../../utils/backtestEngine';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
export interface BoardZone { low:number; high:number; label:string; tone?:string }
export function CandleBoard({bars,selected=[],onSelect,zones=[],levels=[],firstCandleNumber=1}:{firstCandleNumber?:number;bars:LabBar[];selected?:number[];onSelect?:(index:number)=>void;zones?:BoardZone[];levels?:{price:number;label:string;tone?:string}[]}){
  const {t}=useTranslation();
  const container=useRef<HTMLDivElement>(null),[width,setWidth]=useState(800),[zoom,setZoom]=useState(false),[offset,setOffset]=useState(0);
  useEffect(()=>{const update=()=>setWidth(Math.max(350,Math.min(800,container.current?.clientWidth||800)));update();const observer=typeof ResizeObserver==='undefined'?null:new ResizeObserver(update);if(container.current)observer?.observe(container.current);window.addEventListener('resize',update);return()=>{observer?.disconnect();window.removeEventListener('resize',update);};},[]);
  const selection=selected.join(',');
  useEffect(()=>{if(zoom&&selected.length)setOffset(Math.min(Math.max(0,selected[0]-4),Math.max(0,bars.length-12)));},[selection,zoom]);
  useEffect(()=>{if(zoom&&!onSelect)setOffset(Math.max(0,bars.length-12));},[bars.length,zoom,onSelect]);
  if(!bars.length)return null;
  const start=zoom?Math.min(offset,Math.max(0,bars.length-12)):0,shown=zoom?bars.slice(start,start+12):bars;
  const right=width-67,plot=width-125;
  const values=[...shown.flatMap(b=>[b.high,b.low]),...zones.flatMap(z=>[z.low,z.high]),...levels.map(l=>l.price)];
  const lo=Math.min(...values),hi=Math.max(...values),pad=(hi-lo)*.15||1,min=lo-pad,max=hi+pad;
  const decimals=hi-lo<.1?5:hi-lo<1?4:2;
  const y=(p:number)=>280-(p-min)/(max-min)*245,dx=plot/Math.max(12,shown.length),x=(i:number)=>60+(i+.5)*dx;
  return <div className="lab-board" ref={container}>
    <svg viewBox={`0 0 ${width} 325`} width={width} height="325" role="img" aria-label={t('Practice candlestick chart')}>
      <title>{t('Practice candlestick chart')}</title>
      {[0,.25,.5,.75,1].map(f=><g key={f}><line x1="55" x2={right} y1={y(min+(max-min)*f)} y2={y(min+(max-min)*f)} className="lab-grid"/><text x="48" y={y(min+(max-min)*f)+4} textAnchor="end" className="lab-axis">{(min+(max-min)*f).toFixed(decimals)}</text></g>)}
      {zones.map((z,i)=><g key={i} className={`lab-zone ${z.tone||''}`}><rect x="55" y={y(z.high)} width={right-55} height={Math.max(2,y(z.low)-y(z.high))}/><text x={right-5} y={y(z.high)-6} textAnchor="end">{t(z.label)}</text></g>)}
      {shown.map((b,i)=><g key={i+start} style={{'--bar-index':i} as CSSProperties} className={`lab-candle ${b.close>=b.open?'up':'down'} ${selected.includes(i+start)?'selected':''}`} onClick={()=>onSelect?.(i+start)}>
        <title>{`${i+start+firstCandleNumber}: O ${b.open.toFixed(decimals)}, H ${b.high.toFixed(decimals)}, L ${b.low.toFixed(decimals)}, C ${b.close.toFixed(decimals)}`}</title>
        {selected.includes(i+start)&&<rect className="lab-selection" x={x(i)-dx*.45} y="28" width={dx*.9} height="255" rx="5"/>}
        <line x1={x(i)} x2={x(i)} y1={y(b.high)} y2={y(b.low)}/><rect x={x(i)-dx*.28} y={Math.min(y(b.open),y(b.close))} width={dx*.56} height={Math.max(2,Math.abs(y(b.open)-y(b.close)))}/>
        {(shown.length<=20||i%5===0)&&<text x={x(i)} y="309" textAnchor="middle" className="lab-axis">{i+start+firstCandleNumber}</text>}
      </g>)}
      {levels.map((l,i)=><g key={i} className={`lab-level ${l.tone||''}`}><line x1="55" x2={right} y1={y(l.price)} y2={y(l.price)}/><text x={right+5} y={y(l.price)+4}>{t(({Entry:'Entry level',Stop:'Stop level',Target:'Target level'} as Record<string,string>)[l.label]||l.label)}</text></g>)}
    </svg>
    {onSelect&&<><div className="lab-actions"><button onClick={()=>setZoom(z=>!z)}>{t(zoom?'Show all candles':'Zoom to 12 candles')}</button>{zoom&&<><button disabled={start===0} onClick={()=>setOffset(Math.max(0,start-6))}>{t('Earlier candles')}</button><button disabled={start+12>=bars.length} onClick={()=>setOffset(Math.min(bars.length-12,start+6))}>{t('Later candles')}</button></>}</div><div className="lab-candle-picker" aria-label={t('Choose a candle')}>{bars.map((_,i)=><button type="button" key={i} aria-pressed={selected.includes(i)} onClick={()=>onSelect(i)}>{i+1}</button>)}</div></>}
  </div>;
}
