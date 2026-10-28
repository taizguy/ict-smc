import {useEffect,useId,useRef,useState} from 'react';
import {Play,Pause,RotateCcw,ArrowRight} from 'lucide-react';
import scenes from '../data/chapters/mentorship2026Visuals.json';
import {useTranslation} from '../i18n/TranslationProvider';
import {Mentorship2026AlchemyFigure} from './Mentorship2026AlchemyFigure';

interface Scene {prices:number[];levels:number[];labels:string[];notes:string[]}
const alternatives:Record<number,number[]>={47:[107,98,96],48:[118,121,124],49:[109,107,104],50:[111,108,106],51:[118,115,112],52:[116,118,120],65:[118,114,108],66:[118,121,124],67:[135,133,130],68:[108,111,114],69:[125,128,130],70:[101,99,97.75]};
const levelNames:Record<number,Record<number,string>>={
 47:{100:'Previous low',120:'Previous high'},48:{100:'Range low',108:'Midpoint',114:'Upper octant',116:'Range high'},
 49:{108:'Gap low',110:'CE',112:'Gap high',120:'Previous record'},50:{108:'Opening price',114:'Half-gap',120:'Selected prior close'},
 51:{116:'Lunch low',119:'Lunch high',120:'Morning objective'},52:{110:'Opposing reference',120:'Proposed destination'},
 65:{100:'Range low',108:'Midpoint',116:'Range high',124:'Half-range projection'},66:{112:'Body edge',116:'Wick midpoint',120:'Wick extreme'},
 67:{100:'Range low',120:'Full-range midpoint',134:'Wick midpoint',140:'Range high'},68:{100:'Body-open anchor',104:'FVG low',106:'CE',108:'FVG high'},
 69:{100:'Pre-market low',116:'Pre-market high',120:'First post-open high',124:'Daily CE / later high'},70:{98:'Planned stop',102:'Entry',106:'Half exit',110:'Remaining exit'},
};
// Each caption becomes available only at the price observation it describes.
const phaseStarts:Record<number,number[]>={47:[0,5,6],48:[0,5,6],49:[0,5,6],50:[0,3,7],51:[0,6,7],52:[0,3,6],65:[0,5,6],66:[0,4,6],67:[0,3,5],68:[0,3,6],69:[0,4,6],70:[0,4,7]};
const otherNotes:Record<number,string>={
 47:'The reclaim fails: price returns below 99. The earlier sweep was real; the reversal expectation failed.',
 48:'The pre-market trend continues. A completed morning range does not require a reversal.',
 49:'A close below 108 contradicts this example’s bullish gap use.',
 50:'Price rejects before the far edge. Reaching CE did not produce a full gap traversal.',
 51:'Price breaks below 116 instead of continuing higher. The same lunch balance allowed both outcomes.',
 52:'The same references are crossed in a more direct expansion. The earlier HRLR expectation was conditional.',
 65:'The break to 118 fails and price returns to 108. The completed 100–116 range stays fixed.',
 66:'Price returns above 116 and continues above 120. The bearish interpretation is not sustained.',
 67:'The final price is 130; its classification still depends on the declared range.',
 68:'Price remains above the selected gap instead of rejecting. The variant name did not determine direction.',
 69:'Price continues above 124. This conflicts with the bearish thesis rather than confirming a short.',
 70:'The stop fills at 97.75: a 4.25-point loss from 102 before costs, not exactly 1R.',
};

/** Original schematic: one progressive price path drives both the intraday trace and developing candle.
 * No historical feed, claimed fill, or inferred intrabar OHLC is introduced here. */
export function Mentorship2026Diagram(props:{chapterId:number;staticOnly?:boolean;thumbnail?:boolean}){
 if(props.chapterId===49)return <Mentorship2026AlchemyFigure index={6} staticOnly={props.staticOnly} thumbnail={props.thumbnail}/>;
 return <SharedMentorship2026Diagram {...props}/>;
}
function SharedMentorship2026Diagram({chapterId,staticOnly=false,thumbnail=false}:{chapterId:number;staticOnly?:boolean;thumbnail?:boolean}){
 const {t}=useTranslation();
 const scene=(scenes as Record<string,Scene>)[chapterId];
 const [progress,setProgress]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [alternate,setAlternate]=useState(false);
 const [wide,setWide]=useState(false);
 const root=useRef<HTMLElement>(null);
 const uid=useId().replace(/:/g,'');
 useEffect(()=>{
  if(!playing||staticOnly||thumbnail)return;
  const query=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(query.matches){setPlaying(false);return;}
  const stop=()=>setPlaying(false);
  const visibility=()=>{if(document.hidden)stop();};
  document.addEventListener('visibilitychange',visibility);
  query.addEventListener('change',stop);
  const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();});
  if(root.current)observer.observe(root.current);
  let previous=performance.now(),cursor=progress,frame=0;
  const advance=(now:number)=>{
   cursor=Math.min(8,cursor+Math.min(now-previous,50)/2000);previous=now;
   setProgress(cursor);
   if(cursor>=8)setPlaying(false);else frame=requestAnimationFrame(advance);
  };
  frame=requestAnimationFrame(advance);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',visibility);query.removeEventListener('change',stop);};
 },[playing,staticOnly,thumbnail]);
 if(!scene)return null;
 const p=staticOnly||thumbnail?8:progress;
 const prices=alternate?(chapterId===70?[104,103,102,101,100,99,98.5,98,97.75]:[...scene.prices.slice(0,6),...alternatives[chapterId]]):scene.prices;
 const index=Math.floor(p),fraction=p-index;
 const current=prices[index]+((prices[Math.min(index+1,8)]-prices[index])*fraction);
 const known=[...prices.slice(0,index+1),current];
 const bounds=[...scene.prices,...alternatives[chapterId],...scene.levels,...(wide?[180]:[])];
 const low=Math.min(...bounds)-3,high=Math.max(...bounds)+3;
 const y=(v:number)=>272-(v-low)/(high-low)*220;
 const x=(i:number)=>220+i*55;
 const points=[...prices.slice(0,index+1).map((v,i)=>`${x(i)},${y(v)}`),`${x(p)},${y(current)}`].join(' ');
 const stops=phaseStarts[chapterId];
 const stage=p<stops[1]?0:p<stops[2]?1:2;
 const open=prices[0],h=Math.max(...known),l=Math.min(...known);
 const bullish=current>=open;
 const seek=(next:number)=>{setPlaying(false);setProgress(next);};
 const visibleLevels=chapterId===67&&wide?[100,134,140,180]:scene.levels.filter(level=>chapterId!==65||p>=5||level===100);
 const selectedMid=wide?140:120;
 const labels=chapterId===67&&wide?['Choose 100–180',...scene.labels.slice(1)]:scene.labels;
 const note=alternate&&p>=8?otherNotes[chapterId]:chapterId===67&&wide&&stage===0?'For the selected 100–180 range, the midpoint is 140. Price 132 is below it.':scene.notes[stage];
 const levelName=(level:number)=>chapterId===67&&wide?(level===140?'Selected midpoint':level===180?'Range high':levelNames[chapterId][level]):levelNames[chapterId][level];
 return <figure ref={root} className={`m26-player${thumbnail?' m26-thumbnail':''}`}>
  {!thumbnail&&<figcaption><strong>{t('Follow the price, one observation at a time')}</strong><span>{t('Original schematic · invented prices · not a historical trade')}</span></figcaption>}
  <div className="m26-chart">
   <svg viewBox="0 0 780 338" role="img" aria-labelledby={`${uid}-title ${uid}-description`}>
    <title id={`${uid}-title`}>{t(labels[stage])}</title><desc id={`${uid}-description`}>{t(note)}</desc>
    <defs><linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="currentColor" stopOpacity=".14"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
    <text x="90" y="24" textAnchor="middle" className="m26-small">{t(chapterId===66?'Daily wick reference':chapterId===68?'FVG boundaries':'Developing candle')}</text>
    <text x="220" y="24" className="m26-small">{t('Price sequence →')}</text>
    {[0,1,2].map(i=><g key={i}><rect x={220+i*165} y="40" width="165" height="246" className={`m26-band m26-band-${i}`}/><text x={302+i*165} y="315" textAnchor="middle" className="m26-small">{t(labels[i])}</text></g>)}
    {visibleLevels.map(level=><g key={level} className="m26-reference"><line x1="182" x2="706" y1={y(level)} y2={y(level)}/><text x="718" y={y(level)+4}>{level}</text>{levelName(level)&&<text x="188" y={y(level)-6} className="m26-level-name">{t(levelName(level))}</text>}</g>)}
    {chapterId===65&&p>=5&&<rect x="220" y={y(116)} width="275" height={y(100)-y(116)} className="m26-zone"/>}
    {chapterId===50&&<rect x="182" y={y(120)} width="524" height={y(108)-y(120)} className="m26-zone"/>}
    {chapterId===68&&p>=2&&<rect x="330" y={y(108)} width="330" height={y(104)-y(108)} className="m26-zone"/>}
    {chapterId===66&&<g className="m26-daily-reference"><rect x="66" y={y(112)} width="46" height={Math.max(3,y(108)-y(112))}/><line x1="89" x2="89" y1={y(120)} y2={y(112)}/><text x="89" y="296" textAnchor="middle">{t('Fixed daily reference')}</text></g>}
    {chapterId===67&&<g className="m26-emphasis"><line x1="182" x2="706" y1={y(selectedMid)} y2={y(selectedMid)}/><text x="190" y={y(selectedMid)-8}>{t('Selected midpoint')}: {selectedMid}</text></g>}
    {chapterId===68&&<g><rect x="18" y={y(108)} width="142" height={y(104)-y(108)} className="m26-zone"/>{[[100,104,99,103],[103,111,102,110],[109,112,108,111]].map(([o,hi,lo,cl],i)=><g key={i} className="m26-up"><line x1={36+i*52} x2={36+i*52} y1={y(hi)} y2={y(lo)}/><rect x={24+i*52} width="24" y={y(cl)} height={y(o)-y(cl)}/></g>)}<text x="90" y="296" textAnchor="middle">104–108 · CE 106</text></g>}
    {chapterId!==66&&chapterId!==68&&<g className={bullish?'m26-up':'m26-down'}><line x1="90" x2="90" y1={y(h)} y2={y(l)}/><rect x="70" y={Math.min(y(open),y(current))} width="40" height={Math.max(2,Math.abs(y(open)-y(current)))}/><text x="90" y="296" textAnchor="middle" className="m26-small">{current.toFixed(2)}</text></g>}
    <polygon points={`${x(0)},286 ${points} ${x(p)},286`} fill={`url(#${uid}-fill)`}/>
    <polyline points={points} className="m26-price"/>
    <line x1={x(p)} x2={x(p)} y1="40" y2="286" className="m26-playhead"/>
    <circle cx={x(p)} cy={y(current)} r="5" className="m26-dot"/>
    <text x="718" y="24" textAnchor="end" className="m26-small">{t('Schematic price')}</text>
   </svg>
  </div>
  {!thumbnail&&<>
   {!staticOnly&&<div className="m26-controls">
    <button type="button" onClick={()=>{if(p>=8)setProgress(0);setPlaying(!playing);}} aria-label={t(playing?'Pause animation':'Play animation')}>{playing?<Pause size={16}/>:<Play size={16}/>}</button>
    <button type="button" onClick={()=>seek(0)} aria-label={t('Restart this example')}><RotateCcw size={16}/></button>
    <input type="range" min="0" max="8" step=".01" value={p} onChange={e=>seek(Number(e.target.value))} aria-label={t('Reveal the price sequence')}/>
    <button type="button" onClick={()=>seek([...stops,8].find(stop=>stop>p+.01)??8)} disabled={p>=8}>{t('Next observation')}<ArrowRight size={16}/></button>
   </div>}
   <div className="m26-explanation" aria-live={playing?'off':'polite'}><span>{t(labels[stage])}</span><p>{t(note)}</p></div>
   {!staticOnly&&<div className="m26-options"><button type="button" aria-pressed={alternate} onClick={()=>{setAlternate(!alternate);seek(8);}}>{t(alternate?'Show the first outcome':'Compare the other outcome')}</button>{chapterId===67&&<button type="button" aria-pressed={wide} onClick={()=>setWide(!wide)}>{wide?'100–140':'100–180'} · {t('Change the selected range')}</button>}</div>}
   <details className="m26-reading"><summary>{t('Read the sequence without animation')}</summary><ol>{scene.labels.map((label,i)=><li key={label}><strong>{t(label)}</strong><p>{t(scene.notes[i])}</p></li>)}</ol><p>{t(otherNotes[chapterId])}</p><p>{t('Read all prices as a teaching schematic, not an executable signal.')}</p></details>
  </>}
 </figure>;
}
