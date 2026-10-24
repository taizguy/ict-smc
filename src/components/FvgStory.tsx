import {useEffect,useRef,useState} from 'react';
import {Play,Pause,RotateCcw,ArrowLeft,ArrowRight} from 'lucide-react';
import {AnimatePresence,motion} from 'motion/react';
import {useTranslation} from '../i18n/TranslationProvider';
import {fvgScenes,type FvgScene,type FvgBar} from '../data/fvgLesson';
import {fvgStoryCopy as copy,fvgStoryBeats as beats} from '../data/fvgStory';

const duration=48;
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const ease=(n:number)=>1-Math.pow(1-clamp(n),3);
const context:FvgBar[]=[{open:97,high:99,low:96,close:98},{open:98,high:100,low:97.5,close:99.5},{open:99.5,high:100,low:98.3,close:99}];

/** Each displayed value is derived from the same synthetic OHLC used by the static export. */
function StoryChart({scene,time,compact}:{scene:FvgScene;time:number;compact:boolean}){
  const {t}=useTranslation();
  const bearish=scene.id==='bearish';
  const prior=bearish?context.map(b=>({open:202-b.open,close:202-b.close,high:202-b.low,low:202-b.high})):context;
  const bars=[...prior,...scene.bars];
  const y=(price:number)=>(compact?30:34)+(110-price)*(compact?12:15);
  const right=compact?360:628, labels=right+14, bottom=compact?240:292;
  const x=(i:number)=>(compact?40:76)+i*(compact?42:70);
  const gap=ease((time-24)/3),middle=ease((time-30)/3);
  const visible=(i:number)=>i<3?1:i<6?clamp((time-(6+(i-3)*6))/3.8):clamp((time-(36+(i-6)*4.5))/3.5);
  const firstBoundary=bearish?scene.bars[0].low:scene.bars[0].high;
  const thirdBoundary=bearish?scene.bars[2].high:scene.bars[2].low;
  return <svg className="fvg-story-chart" viewBox={compact?"0 0 440 290":"0 0 720 360"} width={compact?440:720} height={compact?290:360} role="img" aria-label={t(beats[Math.min(6,Math.floor(time/6))].title.en)}>
    <title>{t(scene.title.en)}</title><desc>{t(copy.synthetic.en)}</desc>
    <g className="fvg-draft-grid">{[95,100,105,110].map(p=><g key={p}><line x1={compact?24:48} x2={right} y1={y(p)} y2={y(p)}/><text x={compact?20:34} y={y(p)+4} textAnchor="end">{p}</text></g>)}{[0,1,2,3,4,5,6,7,8].filter(i=>!compact||i<8).map(i=><line key={i} x1={x(i)} x2={x(i)} y1="26" y2={bottom}/>)}</g>
    <path className="fvg-frame-corners" d={`M${compact?24:48} 42V26h16 M${right-16} 26h16v16 M${compact?24:48} ${bottom-16}v16h16 M${right-16} ${bottom}h16v-16`}/>
    <g opacity={gap}>
      {scene.zone?<>
        <rect className="fvg-story-zone" x={x(3)} y={y(102)} width={(right-x(3))*gap} height={y(100)-y(102)}/>
        <line className="fvg-boundary-line" x1={x(3)} x2={x(3)+(right-x(3))*gap} y1={y(firstBoundary)} y2={y(firstBoundary)}/>
        <line className="fvg-boundary-line" x1={x(5)} x2={x(5)+(right-x(5))*gap} y1={y(thirdBoundary)} y2={y(thirdBoundary)}/>
        <text className="fvg-boundary-number" x={labels} y={y(102)+5}>102</text><text className="fvg-boundary-number" x={labels} y={y(100)+5}>100</text>
        <path className="fvg-measure-brace" d={`M${right-6} ${y(102)}h6v${y(100)-y(102)}h-6`}/>
      </>:<><line className="fvg-overlap-line" x1={x(3)} x2={right} y1={y(100)} y2={y(100)}/><line className="fvg-overlap-line" x1={x(5)} x2={right} y1={y(99.5)} y2={y(99.5)}/><text className="fvg-boundary-number" x={labels} y={y(100)-6}>100</text><text className="fvg-boundary-number" x={labels} y={y(99.5)+19}>99.5</text></>}
    </g>
    {scene.zone&&<g opacity={middle}><line className="fvg-story-ce" x1={x(3)} x2={x(3)+(right-x(3))*middle} y1={y(101)} y2={y(101)}/><circle className="fvg-ce-dot" cx={x(3)+(right-x(3))*middle} cy={y(101)} r="3"/><text className="fvg-ce-number" x={labels} y={y(101)+5}>CE 101</text></g>}
    {bars.map((b,i)=>{
      const amount=visible(i);if(amount<=0)return null;
      const p=ease(amount),close=b.open+(b.close-b.open)*p,high=Math.max(b.open,close)+(b.high-Math.max(b.open,b.close))*p,low=Math.min(b.open,close)-(Math.min(b.open,b.close)-b.low)*p;
      return <g key={i} className={`fvg-story-candle ${i<3?'fvg-story-candle--history':b.close>=b.open?'fvg-story-candle--up':'fvg-story-candle--down'}`} opacity={i<3?.35+.35*p:.45+.55*p}>
        <line x1={x(i)} x2={x(i)} y1={y(high)} y2={y(low)}/><rect x={x(i)-8} y={y(Math.max(b.open,close))} width="16" height={Math.max(2,Math.abs(y(b.open)-y(close)))} rx="2"/>
        {i>=3&&<text x={x(i)} y={compact?263:315} textAnchor="middle">{i-2}</text>}
        {amount<1&&<circle className="fvg-live-tip" cx={x(i)} cy={y(close)} r="4"/>}
      </g>;
    })}
    {time>=9.8&&<g opacity={ease((time-9.8)/1.5)}><circle className="fvg-reference-dot" cx={x(3)} cy={y(firstBoundary)} r="4"/><path className="fvg-reference-leader" pathLength="1" strokeDasharray="1" strokeDashoffset={1-ease((time-9.8)/1.5)} d={`M${x(3)} ${y(firstBoundary)}h-28v-33h-35`}/><text className="fvg-reference-label" x={x(3)-32} y={y(firstBoundary)-40} textAnchor="end">C1 · {firstBoundary}</text></g>}
    {time>=21.8&&<g opacity={ease((time-21.8)/1.5)}><circle className="fvg-reference-dot" cx={x(5)} cy={y(thirdBoundary)} r="4"/><path className="fvg-reference-leader" d={`M${x(5)} ${y(thirdBoundary)}v-40h30`}/><text className="fvg-reference-label" x={x(5)+35} y={y(thirdBoundary)-35}>C3 · {thirdBoundary}</text></g>}
    {time>=36&&<line className="fvg-observation-divider" x1={x(5)+(compact?21:35)} x2={x(5)+(compact?21:35)} y1="26" y2={bottom} opacity={ease((time-36)/1.2)}/>}
    <g className="fvg-chart-periods"><text x="146" y="345" textAnchor="middle">{t(copy.before.en)}</text><text x="356" y="345" textAnchor="middle">{t(copy.core.en)}</text>{time>=36&&<text x="567" y="345" textAnchor="middle">{t(copy.after.en)}</text>}</g>
  </svg>;
}

export function FvgStory({onFrame}:{onFrame:(scene:number,phase:number,known:number)=>void}){
  const {t}=useTranslation();
  const [compact,setCompact]=useState(()=>typeof window!=='undefined'&&window.matchMedia('(max-width:600px)').matches);
  const [selected,setSelected]=useState(0),[time,setTime]=useState(0),[playing,setPlaying]=useState(false),[reduced,setReduced]=useState(false),[speed,setSpeed]=useState(1);
  const clock=useRef(0),callback=useRef(onFrame);callback.current=onFrame;
  const scene=fvgScenes[selected],beat=Math.min(6,Math.floor(time/6));
  const known=Math.min(scene.bars.length,time<9.8?0:time<15.8?1:time<21.8?2:time<39.5?3:time<44?4:5);
  useEffect(()=>{const size=matchMedia('(max-width:600px)');const resize=()=>setCompact(size.matches);resize();size.addEventListener('change',resize);return()=>size.removeEventListener('change',resize);},[]);
  useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{setReduced(media.matches);if(media.matches)setPlaying(false);};update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
  useEffect(()=>{callback.current(selected,time<21.8?0:time<36?1:2,known);},[selected,known]);
  useEffect(()=>{
    if(!playing||reduced)return;
    let frame=0,last=performance.now(),paint=last;
    const tick=(now:number)=>{clock.current=Math.min(duration,clock.current+(now-last)/1000*speed);last=now;if(now-paint>=40||clock.current===duration){setTime(clock.current);paint=now;}if(clock.current<duration)frame=requestAnimationFrame(tick);else setPlaying(false);};
    frame=requestAnimationFrame(tick);const hide=()=>{if(document.hidden)setPlaying(false);};document.addEventListener('visibilitychange',hide);
    return()=>{cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',hide);};
  },[playing,reduced,speed]);
  const seek=(value:number)=>{setPlaying(false);clock.current=value;setTime(value);};
  const stage=(index:number)=>seek(index===6?duration:beats[index].at+5.8);
  const choose=(index:number)=>{setSelected(index);seek(0);};
  const start=()=>{if(time>=duration){clock.current=0;setTime(0);}setPlaying(!playing);};
  return <div className="fvg-story">
    <span className="sr-only" role="status">{t(beats[beat].title.en)}</span>
    <header className="fvg-story-intro"><span className="fvg-story-eyebrow"><i/>{t(copy.eyebrow.en)}</span><h2>{t(copy.title.en)}</h2><p>{t(copy.intro.en)}</p></header>
    <div className="fvg-film">
      <div className="fvg-film-top"><span>{t(copy.synthetic.en)}</span><span className="fvg-film-count"><i className={playing?'is-playing':''}/>{String(beat+1).padStart(2,'0')} / 07</span></div>
      <div className="fvg-film-layout"><div className="fvg-film-visual"><div className="fvg-film-scene-label"><span>{t(scene.label.en)}</span><span>{t(time<21.8?copy.pending.en:scene.zone?copy.reading.en:copy.noZone.en)}</span></div><StoryChart scene={scene} time={time} compact={compact}/>
        <div className="fvg-film-metrics" aria-hidden="true">{time>=27&&scene.zone?<><span>{t(copy.low.en)} <b>100</b></span><span className={time>=33?'is-revealed':''}>{t(copy.midpoint.en)} <b>{time>=33?'101':'—'}</b></span><span>{t(copy.high.en)} <b>102</b></span></>:<span>{t(time<21.8?copy.pending.en:scene.zone?copy.reading.en:copy.noZone.en)}</span>}</div>
      </div><div className="fvg-film-narrative"><span className="fvg-story-eyebrow">{t(copy.stage.en)} {beat+1}</span><AnimatePresence initial={false} mode="wait"><motion.div key={`${selected}-${beat}-${beat===6&&time>=44}`} initial={reduced?false:{opacity:0,y:9}} animate={{opacity:1,y:0}} exit={reduced?{opacity:1}:{opacity:0,y:-4}} transition={{duration:reduced?0:.22,ease:'easeOut'}}><h3>{t(!scene.zone&&beat>=4?copy.noZone.en:beats[beat].title.en)}</h3><p>{t(!scene.zone&&beat>=4?scene.rule.en:beat===6&&time>=44?scene.outcome.en:beats[beat].line.en)}</p><div className="fvg-film-cue"><span>{t(copy.observe.en)}</span><strong><bdi dir={beat===5&&scene.zone?'ltr':undefined}>{t(scene.zone||beat<4?beats[beat].cue.en:copy.noZone.en)}</bdi></strong></div></motion.div></AnimatePresence></div></div>
      <div className="fvg-film-controls">
        <div className="fvg-film-timeline" dir="ltr"><input type="range" min="0" max={duration} step="0.1" value={time} aria-label={t(copy.timeline.en)} aria-valuetext={`${Math.round(time)} / ${duration}`} onChange={e=>seek(Number(e.target.value))} style={{'--fvg-progress':`${time/duration*100}%`} as React.CSSProperties}/><span>{String(Math.floor(time)).padStart(2,'0')}s / 48s</span></div>
        <div className="fvg-film-transport">{!reduced&&<button className="fvg-story-play" type="button" onClick={start}>{playing?<Pause size={17}/>:<Play size={17}/>}<span>{t(playing?copy.pause.en:copy.play.en)}</span></button>}<button type="button" onClick={()=>{seek(0);if(!reduced)setPlaying(true);}} aria-label={t(copy.restart.en)} title={t(copy.restart.en)}><RotateCcw size={17}/></button><button type="button" disabled={beat===0} onClick={()=>stage(beat-1)} aria-label={t(copy.previous.en)}><ArrowLeft size={17}/></button><button type="button" disabled={time===duration} onClick={()=>stage(Math.min(6,beat+1))} aria-label={t(copy.next.en)}><ArrowRight size={17}/></button><label className="fvg-film-speed"><span>{t(copy.speed.en)}</span><select value={speed} onChange={e=>setSpeed(Number(e.target.value))}><option value={1}>1×</option><option value={1.5}>1.5×</option><option value={.75}>0.75×</option></select></label></div>
      </div>
      <div className="fvg-film-chapters" role="group" aria-label={t(copy.stage.en)}>{beats.map((b,i)=><button key={i} type="button" aria-pressed={beat===i} onClick={()=>stage(i)}><span>{String(i+1).padStart(2,'0')}</span>{t(b.short.en)}</button>)}</div>
    </div>
    {reduced&&<p>{t(copy.reduced.en)}</p>}
    <div className="fvg-story-compare"><div><h3>{t(copy.compare.en)}</h3><p>{t(copy.compareText.en)}</p></div><div className="fvg-story-variants" role="group" aria-label={t(copy.compare.en)}>{fvgScenes.map((s,i)=><button type="button" key={s.id} aria-pressed={selected===i} onClick={()=>choose(i)}><svg viewBox="0 0 80 24" aria-hidden="true"><path d={i===1?'M2 3L20 15L35 10L49 19L63 12L78 22':i===2?'M2 20L20 15L35 8L49 17L63 10L78 14':i===3?'M2 20L20 15L35 4L49 8L63 15L78 22':i===4?'M2 22L20 18L35 9L49 11L63 5L78 2':'M2 22L20 18L35 6L49 11L63 7L78 3'}/></svg>{t(s.label.en)}</button>)}</div></div>
    <aside className="fvg-story-takeaway"><span>↳</span><div><h3>{t(copy.takeaway.en)}</h3><p>{t(copy.takeawayText.en)}</p></div></aside>
  </div>;
}
