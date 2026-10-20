import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
type Theme='light'|'dark'|'system';
export function ThemePicker(){
 const {t}=useTranslation();const [choice,setChoice]=useState<Theme>(()=>{try{const saved=localStorage.getItem('learnsmc-theme');return saved==='dark'||saved==='system'?saved:'light';}catch{return 'light';}});
 useEffect(()=>{const media=matchMedia('(prefers-color-scheme: dark)');const apply=()=>{const dark=choice==='dark'||choice==='system'&&media.matches;document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light';document.querySelectorAll('meta[name="theme-color"]').forEach(m=>m.setAttribute('content',dark?'#101625':'#ffffff'));};apply();try{localStorage.setItem('learnsmc-theme',choice);}catch{}media.addEventListener('change',apply);return()=>media.removeEventListener('change',apply);},[choice]);
 return <select className="theme-picker" aria-label={t('Color theme')} value={choice} onChange={e=>setChoice(e.target.value as Theme)}><option value="light">{t('Light')}</option><option value="dark">{t('Dark')}</option><option value="system">{t('Device')}</option></select>;
}
