import {useEffect,useRef,useState} from 'react';
import {masterclassStageArt} from '../data/masterclassStageArt';
import {masterclassThumbnailSpecs} from '../data/masterclassHub';

/** Same topic-specific geometry as the hub, with controllable local motion. */
export function MasterclassLessonArt({number}:{number:number}){
 const spec=masterclassThumbnailSpecs[number],ref=useRef<HTMLElement>(null);
 const [paused,setPaused]=useState(false),[reduced,setReduced]=useState(false),[visible,setVisible]=useState(true);
 useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(query.matches);update();query.addEventListener('change',update);const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting));if(ref.current)observer.observe(ref.current);return()=>{query.removeEventListener('change',update);observer.disconnect();};},[]);
 return <figure ref={ref} className="mj-lesson-art" data-paused={paused||reduced||!visible}>
  <div className="mj-hub-art" role="img" aria-label={spec.alt} dangerouslySetInnerHTML={{__html:masterclassStageArt[spec.file]}}/>
  <div className="mj-controls"><button type="button" onClick={()=>setPaused(p=>!p)} disabled={reduced} aria-pressed={paused||reduced}>{reduced?'Reduced motion enabled':paused?'Play animation':'Pause animation'}</button></div>
  <figcaption>{spec.alt} Illustrative reference geometry, not a historical chart or trade signal.</figcaption>
 </figure>;
}
