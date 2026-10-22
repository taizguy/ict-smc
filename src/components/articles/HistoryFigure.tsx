import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { historyArt } from '../../data/history-art.generated';

const svgCache = new Map<string,string>();
/** Prerendered images remain readable without JS; inline local SVG enables motion on visible figures. */
export function HistoryFigure({slug,index,staticMode=false}:{slug:string;index:number;staticMode?:boolean}){
 const item=historyArt[`${slug}-${index}` as keyof typeof historyArt];
 const [playing,setPlaying]=useState(true),[visible,setVisible]=useState(false);
 const ref=useRef<HTMLElement>(null);
 const [svg,setSvg]=useState<string | null>(null);
 const src=`/images/articles/history/${slug}-${index}.svg`;
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));observer.observe(node);return()=>observer.disconnect();},[]);
 useEffect(()=>{
  if(!item || staticMode || !visible || svg)return;
  const cached=svgCache.get(src);if(cached){setSvg(cached);return;}
  const controller=new AbortController();
  fetch(src,{signal:controller.signal}).then(response=>{if(!response.ok)throw new Error('Illustration unavailable');return response.text();}).then(markup=>{if(!controller.signal.aborted && /^\s*<svg\b/.test(markup)){svgCache.set(src,markup);setSvg(markup);}}).catch(()=>{/* The accessible static image remains the fallback. */});
  return ()=>controller.abort();
 },[src,item,visible,staticMode,svg]);
 if(!item)return null;
 return <figure ref={ref} className="history-figure" data-playing={playing&&visible}>
  <div className="history-figure-art">{svg?<div role="img" aria-label={item.caption} dangerouslySetInnerHTML={{__html:svg}}/>:<img src={src} width="480" height="360" loading="lazy" decoding="async" alt={item.caption}/>}</div>
  <figcaption><span><strong>Figure {index+1}.</strong> {item.caption} <small>Original teaching illustration; not a historical reconstruction.</small></span>{!staticMode&&<button type="button" aria-pressed={playing} onClick={()=>setPlaying(v=>!v)} aria-label={playing?'Pause this illustration':'Animate this illustration'}>{playing?<Pause size={15}/>:<Play size={15}/>}<span>{playing?'Pause':'Animate'}</span></button>}</figcaption>
 </figure>;
}
