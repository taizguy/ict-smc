import {useEffect,useRef,useState} from 'react';
import {AnimatePresence,motion} from 'motion/react';
import {Play,Pause,RotateCcw,ArrowLeft,ArrowRight,Maximize2} from 'lucide-react';
import {useTranslation} from '../i18n/TranslationProvider';
import {chapterDiagrams,type DiagramMark} from '../data/chapters/diagrams';
import {chapterStoryCopy as copy,chapterStoryHeadings} from '../data/chapterStories';
import {fvgStoryCopy as controls} from '../data/fvgStory';

const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const ease=(n:number)=>1-Math.pow(1-clamp(n),3);
const total=30;
// All source paths are straight M/L polylines. Reveal their actual route, including dashed hypotheses.
function trace(d:string,p:number){
  const values=(d.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number),points=Array.from({length:values.length/2},(_,i)=>({x:values[i*2],y:values[i*2+1]}));
  if(points.length<2)return {d,tip:points[0]};
  const lengths=points.slice(1).map((point,i)=>Math.hypot(point.x-points[i].x,point.y-points[i].y));
  let left=lengths.reduce((a,b)=>a+b,0)*p,path=`M${points[0].x},${points[0].y}`,tip=points[0];
  for(let i=0;i<lengths.length;i++){const fraction=lengths[i]?Math.min(1,left/lengths[i]):1;tip={x:points[i].x+(points[i+1].x-points[i].x)*fraction,y:points[i].y+(points[i+1].y-points[i].y)*fraction};path+=` L${tip.x},${tip.y}`;if(left<=lengths[i])break;left-=lengths[i];}
  return {d:path,tip};
}

function MovingMark({mark,p,translate}:{mark:DiagramMark;p:number;translate:(text:string)=>string}){
  if(p<=0)return null;
  const m=mark,progress=ease(p),dash=m.dashed?'4 5':undefined;
  switch(m.kind){
    case 'line':return <line x1={m.x} y1={m.y} x2={m.x!+(m.x2!-m.x!)*progress} y2={m.y!+(m.y2!-m.y!)*progress} strokeDasharray={dash}/>;
    case 'path':{const line=trace(m.d!,progress);return <><path d={line.d} fill="none" strokeDasharray={dash}/>{p<1&&line.tip&&<circle className="chapter-story-trace-tip" cx={line.tip.x} cy={line.tip.y} r="2.8"/>}</>;}
    case 'zone':return <rect className="chapter-story-zone" x={m.x} y={m.y} width={m.w!*progress} height={m.h} rx="3"/>;
    case 'candle':{const close=m.open!+(m.close!-m.open!)*progress;return <><line x1={m.x} x2={m.x} y1={m.open!+(m.high!-m.open!)*progress} y2={m.open!+(m.low!-m.open!)*progress}/><rect x={m.x!-8} y={Math.min(m.open!,close)} width="16" height={Math.max(2,Math.abs(close-m.open!))} rx="2" fill="currentColor" stroke="none"/></>;}
    case 'label':{const label=translate(m.text||'');return <text x={m.x} y={m.y} textAnchor="middle" stroke="none" fill="currentColor" opacity={progress} style={{transform:`translateY(${(1-progress)*4}px)`}} direction={/^[\d\s:–/%+−?≠]+$/.test(label)?'ltr':undefined} textLength={label.length>13?100:undefined} lengthAdjust="spacingAndGlyphs">{label}</text>;}
    case 'dot':return <circle cx={m.x} cy={m.y} r={4*progress} fill="currentColor" stroke="none"/>;
  }
}

export function ChapterStory({chapterId,onPractice}:{chapterId:number;onPractice?:()=>void}){
  const {t,locale}=useTranslation();
  const spec=chapterDiagrams[chapterId],headings=chapterStoryHeadings[chapterId];
  const [time,setTime]=useState(0),[playing,setPlaying]=useState(false),[reduced,setReduced]=useState(false),[speed,setSpeed]=useState(1),[started,setStarted]=useState(false),[branch,setBranch]=useState<'both'|'recovery'|'continuation'>('both');
  const clock=useRef(0),stage=Math.min(2,Math.floor(time/10));
  useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{setReduced(query.matches);if(query.matches)setPlaying(false);};update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);
  useEffect(()=>{setTime(0);clock.current=0;setPlaying(false);setStarted(false);setBranch('both');},[chapterId]);
  useEffect(()=>{
    if(!playing||reduced)return;
    let frame=0,last=performance.now(),paint=last;
    const tick=(now:number)=>{clock.current=Math.min(total,clock.current+(now-last)/1000*speed);last=now;if(now-paint>=40||clock.current===total){setTime(clock.current);paint=now;}if(clock.current<total)frame=requestAnimationFrame(tick);else setPlaying(false);};
    frame=requestAnimationFrame(tick);const hide=()=>{if(document.hidden)setPlaying(false);};document.addEventListener('visibilitychange',hide);
    return()=>{cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',hide);};
  },[playing,reduced,speed]);
  const seek=(value:number)=>{setPlaying(false);setStarted(true);clock.current=value;setTime(value);};
  const choose=(index:number)=>seek(index===2?total:index*10+9.8);
  const play=()=>{if(!started||time===total){clock.current=0;setTime(0);setStarted(true);}setPlaying(!playing);};
  const replay=()=>{seek(0);if(!reduced)setPlaying(true);};
  if(!spec||!headings)return null;
  const family=[1,2,3].includes(chapterId)?'orders':[19,20,24,28,30,31,32,41,47,48,51,53].includes(chapterId)?'time':[22,23,34,35,38,39,42,46].includes(chapterId)?'framework':'price';
  const displayTime=!started?9.8:time;
  return <section className={`chapter-story fvg-story fvg-lesson chapter-story--${family}`} data-chapter-diagram={chapterId} aria-label={t(spec.title)}>
    <span role="status" className="sr-only">{t(headings[stage].en)}</span>
    <header className="fvg-story-intro"><span className="fvg-story-eyebrow"><i/>{t(copy.chapter.en)} <bdi>{chapterId}</bdi></span><h2>{t(spec.title)}</h2><p>{t(copy.intro.en)}</p></header>
    <div className="fvg-film">
      <div className="fvg-film-top"><span>{t(copy.schematic.en)}</span><span className="fvg-film-count"><i className={playing?'is-playing':''}/>{String(stage+1).padStart(2,'0')} / 03</span></div>
      <div className="fvg-film-layout"><div className="fvg-film-visual">
        <div className="chapter-story-visual-label"><span>{t(headings[stage].en)}</span><span><bdi>{String(stage+1).padStart(2,'0')}</bdi></span></div>
        <svg className="chapter-story-canvas" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="400" height="220" role="img" aria-label={t(spec.title)} lang={locale}>
          <title>{t(spec.title)}</title><desc>{t('Schematic example, not a trading signal.')}</desc>
          <g className="chapter-story-grid" aria-hidden="true">{[30,70,110,150,190].map(y=><line key={y} x1="18" x2="382" y1={y} y2={y}/>)}{[30,85,140,195,250,305,360].map(x=><line key={x} x1={x} x2={x} y1="18" y2="202"/>)}</g>
          {spec.marks.map((mark,index)=>{
            if(chapterId===43&&mark.kind==='path'&&mark.stage===2&&branch!=='both'&&((branch==='recovery'&&mark.tone==='coral')||(branch==='continuation'&&mark.tone==='teal')))return null;
            const within=spec.marks.slice(0,index).filter(m=>m.stage===mark.stage).length;
            const p=reduced?(mark.stage<=stage?1:0):clamp((displayTime-mark.stage*10-within*.22)/2.7);
            if(!p)return null;
            const displayedMark=chapterId===43&&branch==='continuation'&&mark.kind==='label'&&mark.text==='3'?{...mark,y:209}:mark;
            return <g key={index} data-mark-stage={mark.stage} data-mark-kind={mark.kind} className={`chapter-story-mark chapter-story-tone-${mark.tone||'ink'} ${mark.stage===stage?'is-current':''}`}><MovingMark mark={displayedMark} p={p} translate={t}/></g>;
          })}
        </svg>
        <div className="chapter-story-observation"><span className="chapter-story-observation-dot"/><span>{t(copy.focus.en)}</span></div>
      </div><div className="fvg-film-narrative"><span className="fvg-story-eyebrow">{t(controls.stage.en)} {stage+1}</span><AnimatePresence initial={false} mode="wait"><motion.div key={`${chapterId}-${stage}`} initial={reduced?false:{opacity:0,y:9}} animate={{opacity:1,y:0}} exit={reduced?{opacity:1}:{opacity:0,y:-4}} transition={{duration:reduced?0:.22,ease:'easeOut'}}><h3>{t(headings[stage].en)}</h3><p>{t(spec.steps[stage])}</p><div className="fvg-film-cue"><span>{t(controls.observe.en)}</span><strong>{t(copy.past.en)}</strong></div></motion.div></AnimatePresence></div></div>
      <div className="fvg-film-controls"><div className="fvg-film-timeline" dir="ltr"><input type="range" min="0" max={total} step="0.1" value={time} aria-label={t(copy.scrub.en)} aria-valuetext={`${Math.round(time)} / ${total}`} onChange={e=>seek(Number(e.target.value))} style={{'--fvg-progress':`${time/total*100}%`} as React.CSSProperties}/><span>{String(Math.floor(time)).padStart(2,'0')}s / 30s</span></div>
        <div className="fvg-film-transport">{!reduced&&<button className="fvg-story-play" type="button" onClick={play}>{playing?<Pause size={17}/>:<Play size={17}/>}<span>{t(playing?controls.pause.en:controls.play.en)}</span></button>}<button type="button" onClick={replay} aria-label={t(controls.restart.en)}><RotateCcw size={17}/></button><button type="button" disabled={stage===0} onClick={()=>choose(stage-1)} aria-label={t(controls.previous.en)}><ArrowLeft size={17}/></button><button type="button" disabled={time===total} onClick={()=>choose(Math.min(2,stage+1))} aria-label={t(controls.next.en)}><ArrowRight size={17}/></button><label className="fvg-film-speed"><span>{t(controls.speed.en)}</span><select value={speed} onChange={e=>setSpeed(Number(e.target.value))}><option value={1}>1×</option><option value={1.5}>1.5×</option><option value={.75}>0.75×</option></select></label></div>
      </div>
      <div className="fvg-film-chapters chapter-story-acts" role="group" aria-label={t(controls.stage.en)}>{headings.map((heading,i)=><button type="button" key={i} aria-pressed={stage===i} onClick={()=>choose(i)}><span>{String(i+1).padStart(2,'0')}</span>{t(heading.en)}</button>)}</div>
    </div>
    {reduced&&<p className="chapter-story-note">{t(controls.reduced.en)}</p>}
    {chapterId===43&&<section className="chapter-story-branches"><h3>{t(copy.compare.en)}</h3><p>{t(copy.branchNote.en)}</p><div role="group" aria-label={t(copy.compare.en)}>{(['both','recovery','continuation'] as const).map(value=><button type="button" key={value} aria-pressed={branch===value} onClick={()=>{setBranch(value);choose(2);}}>{t(copy[value].en)}</button>)}</div></section>}
    <footer className="chapter-story-footer"><button type="button" onClick={()=>seek(total)}><Maximize2 size={16}/>{t(copy.complete.en)}</button>{onPractice&&<button type="button" onClick={onPractice}>{t(copy.practice.en)}<ArrowRight size={16}/></button>}<a href="#curriculum-review-heading">{t(copy.source.en)}</a></footer>
    <p className="chapter-story-note">{t('Schematic example, not a trading signal.')}</p>
  </section>;
}
