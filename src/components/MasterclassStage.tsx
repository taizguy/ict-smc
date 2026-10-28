import {useEffect,useRef,useState} from 'react';
import {ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react';
import {masterclassHubLessons as lessons,masterclassHubCategories as categories} from '../data/masterclassHub';
import {masterclassStageArt} from '../data/masterclassStageArt';
import {useTranslation} from '../i18n/TranslationProvider';

/** Decorative motion preview; the complete crawlable library remains below it. */
export function MasterclassStage(){
 const {t,message,locale}=useTranslation();
 const [index,setIndex]=useState(Math.max(0,lessons.findIndex(l=>l.number===7)));
 const [paused,setPaused]=useState(false),[reduced,setReduced]=useState(false),[visible,setVisible]=useState(true);
 const stage=useRef<HTMLDivElement>(null);
 useEffect(()=>{const preference=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(preference.matches);update();preference.addEventListener('change',update);const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting));if(stage.current)observer.observe(stage.current);return()=>{preference.removeEventListener('change',update);observer.disconnect();};},[]);
 const move=(direction:number)=>setIndex(i=>(i+direction+lessons.length)%lessons.length);
 const current=lessons[index];const back=[lessons[(index+2)%lessons.length],lessons[(index+1)%lessons.length]];
 return <div ref={stage} className="mc-motion-stage" data-paused={paused||reduced||!visible} role="group" aria-label={t('Lesson animation stage')} tabIndex={0} onKeyDown={event=>{if(event.target!==event.currentTarget||!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();move((event.key==='ArrowRight'?1:-1)*(locale==='ur'?-1:1));}}>
  <div className="mc-stage-floor" aria-hidden="true"/>
  <div className="mc-stage-stack">
   {back.map((lesson,i)=><div key={lesson.id} className={`mc-stage-back mc-stage-back-${i}`} aria-hidden="true"><span>{t(lesson.title)}</span><img src={`/images/masterclass/${lesson.thumbnail.file}.svg`} alt="" width="640" height="360" loading="lazy"/></div>)}
   <figure className="mc-stage-front" key={current.id}>
    <div className="mc-stage-meta"><span>{t(categories.find(c=>c.id===current.collection)?.label||'Core frameworks')}</span><span>{message('Unit {number}',{number:String(current.number).padStart(2,'0')})}</span></div>
    <div className={`mc-stage-art mc-tint-${current.collection}`} role="img" aria-label={t(current.thumbnail.alt)} dangerouslySetInnerHTML={{__html:masterclassStageArt[current.thumbnail.file]||masterclassStageArt['neutral-study']}}/>
    <figcaption><p className="mc-stage-title">{t(current.title)}</p><div className="mc-stage-caption"><span>{t('Illustrative concept animation')}</span><button type="button" onClick={()=>setPaused(p=>!p)} disabled={reduced} aria-label={t(reduced?'Reduced motion enabled':paused?'Play scene animation':'Pause scene animation')} aria-pressed={paused||reduced}>{paused||reduced?<Play size={17} aria-hidden="true"/>:<Pause size={17} aria-hidden="true"/>}</button></div></figcaption>
   </figure>
  </div>
  <div className="mc-stage-controls"><button type="button" onClick={()=>move(-1)} aria-label={t('Previous lesson')}><ChevronLeft size={19} aria-hidden="true"/></button><span><bdi>{String(index+1).padStart(2,'0')}</bdi><i aria-hidden="true">/</i><bdi>{lessons.length}</bdi></span><button type="button" onClick={()=>move(1)} aria-label={t('Next lesson')}><ChevronRight size={19} aria-hidden="true"/></button></div>
 </div>;
}
