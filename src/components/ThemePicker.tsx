import { useEffect, useId, useRef, useState } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

type Theme='light'|'dark'|'system';
export function ThemePicker(){
 const {t}=useTranslation();
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
   <button type="button" ref={trigger} className="nav-icon-button theme-trigger" aria-label={t('Color theme')} title={t('Color theme')} aria-expanded={open} aria-controls={id} onClick={()=>setOpen(value=>!value)}><Icon key={choice} size={19} strokeWidth={1.6}/></button>
   <div className="theme-panel" id={id} hidden={!open} role="group" aria-label={t('Appearance')}>
     <p>{t('Appearance')}</p>
     {([['light','Light',Sun],['dark','Dark',Moon],['system','Device',Monitor]] as const).map(([value,label,OptionIcon])=><button type="button" key={value} aria-pressed={choice===value} onClick={()=>{setChoice(value);setOpen(false);trigger.current?.focus();}}><OptionIcon size={17} strokeWidth={1.7}/><span>{t(label)}</span>{choice===value&&<Check size={15} className="theme-check"/>}</button>)}
   </div>
 </div>;
}
