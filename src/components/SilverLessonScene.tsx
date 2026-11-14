import {useEffect,useRef,useState,type ReactNode} from 'react';
import {useTranslation} from '../i18n/TranslationProvider';
import {silverUi as u,type SilverBar} from '../data/chapters/silverLessonVisuals';
import type {SilverSceneApi} from './silverSceneRenderer';

/** Canvas is progressive enhancement; the complete Atlas scene remains in initial HTML. */
export function SilverLessonScene({bars,count,bear=false,overview=false,reduced=false,staticOnly=false,children}:{bars:SilverBar[];count:number;bear?:boolean;overview?:boolean;reduced?:boolean;staticOnly?:boolean;children:ReactNode}){
 const{t,locale}=useTranslation(),host=useRef<HTMLDivElement>(null),canvas=useRef<HTMLCanvasElement>(null),labels=useRef<HTMLDivElement>(null),api=useRef<SilverSceneApi|null>(null),[ready,setReady]=useState(false);
 const state=useRef({bars,count,bear,overview,reduced});state.current={bars,count,bear,overview,reduced};
 useEffect(()=>{if(staticOnly)return;let disposed=false,active=false,pending=false,unload:(()=>void)|undefined;const observer=new IntersectionObserver(async([entry])=>{active=entry.isIntersecting;if(!active){unload?.();unload=undefined;api.current=null;setReady(false);return;}if(pending||api.current||!canvas.current||!labels.current)return;pending=true;const module=await import('./silverSceneRenderer').catch(()=>null);pending=false;if(!module||disposed||!active||!host.current||!canvas.current||!labels.current)return;try{const scene=module.createSilverScene(canvas.current,labels.current,{...state.current,labels:{gap:t(u.gap),entry:t(u.entry),target:t(u.targetLabel),stop:t(u.stopLabel),prior:t(u.prior)}});if(disposed){scene.dispose();return;}api.current=scene;unload=()=>scene.dispose();setReady(true);}catch{setReady(false);}}, {rootMargin:'160px'});if(host.current)observer.observe(host.current);return()=>{disposed=true;observer.disconnect();unload?.();api.current=null;};},[staticOnly,locale]);
 useEffect(()=>{api.current?.update({bars,count,bear,overview,reduced});},[bars,count,bear,overview,reduced]);
 return <div className="sl-cinema" ref={host} data-scene-ready={ready} data-scene-kind={overview?'overview':bear?'bearish':'bullish'}><div className="sl-cinema-fallback" aria-hidden={ready?true:undefined}>{children}</div>{!staticOnly&&<><canvas ref={canvas} role="img" aria-label={t(bear?u.bearTitle:u.title)} hidden={!ready}/><div className="sl-scene-labels" ref={labels} aria-hidden="true" hidden={!ready}/><span className="sl-cinema-mark" aria-hidden="true">{overview?'NY / FVG':bear?'ES / M1':'NQ / M1'}</span></>}</div>;
}
