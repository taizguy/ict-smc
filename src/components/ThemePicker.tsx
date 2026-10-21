import { useEffect, useId, useRef, useState } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslation } from '../i18n/TranslationProvider';

type Theme='light'|'dark'|'system';
export function ThemePicker(){
 const {t}=useTranslation();
 const reduceMotion=useReducedMotion();
 const [open,setOpen]=useState(false), [choice,setChoice]=useState<Theme>(()=>{try{const saved=localStorage.getItem('learnsmc-theme');return saved==='dark'||saved==='system'?saved:'light';}catch{return 'light';}});
 const root=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null),id=useId();
 useEffect(()=>{
   const close=(event:PointerEvent|KeyboardEvent)=>{
     if(event instanceof KeyboardEvent){if(event.key!=='Escape')return;if(open)trigger.current?.focus();}
     else if(root.current?.contains(event.target as Node))return;
     setOpen(false);
   };
   document.addEventListener('pointerdown',close);document.addEventListener('keydown',close);
   return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',close);};
 },[open]);
 useEffect(()=>{const media=matchMedia('(prefers-color-scheme: dark)');const apply=()=>{const dark=choice==='dark'||choice==='system'&&media.matches;document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light';document.querySelectorAll('meta[name="theme-color"]').forEach(m=>m.setAttribute('content',dark?'#101625':'#ffffff'));};apply();try{localStorage.setItem('learnsmc-theme',choice);}catch{}media.addEventListener('change',apply);return()=>media.removeEventListener('change',apply);},[choice]);
 const Icon=choice==='dark'?Moon:choice==='system'?Monitor:Sun;
 return <div className="theme-control" ref={root} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setOpen(false);}}>
   <button type="button" ref={trigger} className="nav-icon-button theme-trigger" aria-label={t('Color theme')} title={t('Color theme')} aria-expanded={open} aria-controls={id} onClick={()=>setOpen(value=>!value)}><span className="theme-icon-stack" aria-hidden="true"><AnimatePresence initial={false}><motion.span key={choice} initial={{opacity:0,scale:0.25,filter:'blur(4px)'}} animate={{opacity:1,scale:1,filter:'blur(0px)'}} exit={{opacity:0,scale:0.25,filter:'blur(4px)'}} transition={reduceMotion?{duration:0}:{type:'spring',duration:0.3,bounce:0}}><Icon size={20} strokeWidth={1.5}/></motion.span></AnimatePresence></span></button>
   <div className="theme-panel" id={id} hidden={!open} role="group" aria-label={t('Appearance')}>
     <p>{t('Appearance')}</p>
     {([['light','Light',Sun],['dark','Dark',Moon],['system','Device',Monitor]] as const).map(([value,label,OptionIcon])=><button type="button" key={value} aria-pressed={choice===value} onClick={()=>{setChoice(value);setOpen(false);trigger.current?.focus();}}><OptionIcon size={17} strokeWidth={1.7}/><span>{t(label)}</span>{choice===value&&<Check size={15} className="theme-check"/>}</button>)}
   </div>
 </div>;
}
