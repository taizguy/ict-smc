import {useEffect,useRef} from 'react';
import {ChevronDown} from 'lucide-react';
import {useTranslation} from '../i18n/TranslationProvider';
import {workbenchNavigation} from '../data/workbenchNavigation';
import {RoleLine,LoopStrip} from './practice/PracticeLoop';
export function WorkbenchHeader({activeTool,heading}:{activeTool:string;heading:string}){
 const {t,href}=useTranslation(),switcher=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{
  const dismiss=(event:PointerEvent)=>{if(switcher.current?.open&&!switcher.current.contains(event.target as Node))switcher.current.open=false;};
  const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'&&switcher.current?.open){switcher.current.open=false;switcher.current.querySelector('summary')?.focus();}};
  document.addEventListener('pointerdown',dismiss);document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',dismiss);document.removeEventListener('keydown',escape);};
 },[]);
 return <header className="workbench-header rounded-2xl border border-ink/10 bg-surface p-4 sm:p-5 space-y-3">
  <div className="flex items-center justify-between gap-4 text-sm"><a href={href('/tools/')} className="underline text-teal">{t('All tools')}</a>
   <details ref={switcher} className="workbench-switcher relative"><summary className="cursor-pointer rounded-lg border border-ink/20 px-3 py-2">{t('Switch tool')}<ChevronDown size={16} strokeWidth={1.5} aria-hidden="true"/></summary>
    <nav aria-label={t('Switch tool')} className="absolute end-0 top-full mt-2 z-30 flex flex-col gap-2 w-64 max-w-[80vw] max-h-[65vh] overflow-y-auto rounded-xl border border-ink/20 bg-surface p-3 shadow-2xl">{workbenchNavigation.map(tool=><a key={tool.id} href={href('/tools/'+tool.slug+'/')} aria-current={activeTool===tool.id?'page':undefined} className="rounded-lg border border-ink/15 px-3 py-2 text-sm hover:bg-ink/10">{t(tool.name)}</a>)}</nav>
   </details></div>
  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{heading}</h1>
  {activeTool==='chartlab'&&<><RoleLine tool="chartlab"/><LoopStrip tool="chartlab"/></>}
 </header>;
}
