import {useEffect,useRef,useState} from 'react';
import {useTranslation} from '../i18n/TranslationProvider';

/** Native sticky positioning: scrolling is never intercepted or disabled. */
export function MasterclassScrollSequence({steps}:{steps:string[]}){
 const {t}=useTranslation();
 const section=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null);
 const [pinned,setPinned]=useState(false),[visible,setVisible]=useState(steps.length);
 useEffect(()=>{
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  const update=()=>{frame=0;if(!section.current||!stage.current)return;
   const fits=!motion.matches&&innerWidth>700&&stage.current.offsetHeight<innerHeight-125;
   setPinned(fits);
   if(!fits){setVisible(steps.length);return;}
   const travel=Math.max(0,100-section.current.getBoundingClientRect().top);
   setVisible(Math.min(steps.length,1+Math.floor(travel/170)));
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const observer=new ResizeObserver(schedule);if(stage.current)observer.observe(stage.current);
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);motion.addEventListener('change',schedule);update();
  return()=>{removeEventListener('scroll',schedule);removeEventListener('resize',schedule);motion.removeEventListener('change',schedule);observer.disconnect();cancelAnimationFrame(frame);};
 },[steps.length]);
 return <section ref={section} id="sequence" className="mj-section mj-scroll-sequence" data-pinned={pinned} style={pinned?{height:`calc(var(--sequence-height, 600px) + ${steps.length*170}px)`}:undefined}>
  <div ref={stage} className="mj-sequence-stage"><h2>{t('Order of operations')}</h2><ol>{steps.map((text,i)=><li key={text} data-revealed={i<visible}><span className="mj-sequence-number" aria-hidden="true">{i+1}</span><span>{t(text)}</span></li>)}</ol></div>
 </section>;
}
