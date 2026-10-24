import {useEffect,useRef,useState,type ReactNode} from 'react';
import {Search,Library,X,ChevronDown,ArrowUpRight,PanelLeftClose,PanelLeft,SlidersHorizontal} from 'lucide-react';
import {textbookChapters} from '../data/chaptersData';
import {topicClusters} from '../utils/topicClusters';
import {useTranslation} from '../i18n/TranslationProvider';
import {withoutLocale} from '../i18n/locale';
import {matchesSearch} from '../i18n/search';
import {conciseHeading} from '../utils/searchMetadata';

export const readingPartTitle=(part:string)=>part.replace(/^Part\s+[IVXLCDM]+\s*[-–—:]\s*/i,'');
export function ReadingTitle({text,display}:{text:string;display?:string}){const {t}=useTranslation();const translated=t(text);return <span data-reading-source={text}>{translated===text?(display||conciseHeading(text)):translated.replace(/^\d+\.\d+\s*/,'')}</span>;}
export function ReadingRoomLayout({children,path:providedPath}:{children:ReactNode;path?:string}){
 const {t,href,locale}=useTranslation();
 const path=withoutLocale(providedPath||(typeof window==='undefined'?'/curriculum/':window.location.pathname));
 const chapter=textbookChapters.find(c=>path===`/learn/${c.slug}/`);
 const [query,setQuery]=useState(''),[open,setOpen]=useState(false),[focus,setFocus]=useState(false),[settings,setSettings]=useState(false),[size,setSize]=useState(21),[wide,setWide]=useState(false);
 const drawer=useRef<HTMLElement>(null),opener=useRef<HTMLButtonElement>(null);
 const found=textbookChapters.filter(c=>matchesSearch(query,[c.title,c.part,...c.keyTerms.map(k=>k.term)],t));
 useEffect(()=>{setQuery('');setOpen(false);setFocus(false);},[path]);
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('learnsmc_reading_preferences')||'{}');if(Number.isFinite(saved.size))setSize(Math.max(18,Math.min(26,saved.size)));if(typeof saved.wide==='boolean')setWide(saved.wide);}catch{}},[]);
 const saveSettings=(nextSize:number,nextWide:boolean)=>{setSize(nextSize);setWide(nextWide);try{localStorage.setItem('learnsmc_reading_preferences',JSON.stringify({size:nextSize,wide:nextWide}));}catch{}};
 useEffect(()=>{if(!open)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';drawer.current?.querySelector<HTMLButtonElement>('button')?.focus();const keyboard=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);if(e.key!=='Tab')return;const elements=Array.from(drawer.current?.querySelectorAll<HTMLElement>('a[href],button,input,summary')||[]).filter(el=>el.getClientRects().length>0);const first=elements[0],last=elements[elements.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}};document.addEventListener('keydown',keyboard);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',keyboard);opener.current?.focus();};},[open]);
 useEffect(()=>{const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')setSettings(false);};document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape);},[]);
 const search=(id:string)=><label className="rr-search" htmlFor={id}><Search size={17}/><input id={id} type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('Search lessons')} aria-label={t('Search lessons')}/>{query&&<button aria-label={t('Clear search')} onClick={()=>setQuery('')}><X size={15}/></button>}</label>;
 return <div className={`reading-room ${focus?'rr-focus':''} ${wide?'rr-wide':''}`} lang={locale} style={{'--rr-size':`${size}px`} as React.CSSProperties}>
  <div className="rr-mobile"><button ref={opener} onClick={()=>setOpen(true)} aria-expanded={open} aria-controls="rr-library"><Library size={18}/>{t('Chapter index')}<ChevronDown size={15}/></button>{search('rr-mobile-search')}</div>
  {open&&<button className="rr-backdrop" onClick={()=>setOpen(false)} aria-label={t('Close')}/>}
  <aside ref={drawer} id="rr-library" className={`rr-library ${open?'is-open':''}`} aria-label={t('Learning library')}><button className="rr-drawer-close" onClick={()=>setOpen(false)} aria-label={t('Close')}><X size={19}/></button><div className="rr-library-title"><Library size={19}/><span>{t('Learning library')}</span></div>{search('rr-library-search')}
   <nav className="rr-root-links" aria-label={t('Curriculum navigation')}><a href={href('/curriculum/')} aria-current={path==='/curriculum/'?'page':undefined}>{t('Overview')}</a><a href={href('/curriculum/mentorships/')} aria-current={path.includes('/mentorships/')?'page':undefined}>{t('Mentorships')}</a></nav>
   <p className="rr-eyebrow">{t('Chapter index')}</p>
   <nav className="rr-chapter-index" aria-label={t('All chapters')}>{topicClusters.filter(p=>!query||p.chapters.some(c=>found.includes(c))).map(p=><details key={`${p.slug}-${path}-${!!query}`} open={!!query||p.part===chapter?.part||path===`/curriculum/${p.slug}/`||undefined}><summary>{t(readingPartTitle(p.part))}<ChevronDown size={14}/></summary><a className="rr-part-link" href={href(`/curriculum/${p.slug}/`)}>{t('Topic overview')} <ArrowUpRight size={12}/></a>{p.chapters.filter(c=>!query||found.includes(c)).map(c=><a className="rr-index-lesson" key={c.id} href={href(`/learn/${c.slug}/`)} aria-current={c.id===chapter?.id?'page':undefined}><span>{String(c.id).padStart(2,'0')}</span><ReadingTitle text={c.title}/></a>)}</details>)}</nav>
   {query&&!found.length&&<p className="rr-empty" role="status">{t('No chapters match your search.')}</p>}
   <p className="rr-library-note">{t('Keep the context. Question the pattern.')}</p>
  </aside>
  <div className="rr-page"><div className="rr-toolbar"><nav aria-label={t('Breadcrumb')}><a href={href('/curriculum/')}>{t('Curriculum')}</a>{chapter&&<><span>/</span><a href={href(`/curriculum/${topicClusters.find(p=>p.part===chapter.part)?.slug}/`)}>{t(readingPartTitle(chapter.part))}</a><span>/</span><bdi>{String(chapter.id).padStart(2,'0')}</bdi></>}</nav><div className="rr-controls"><button onClick={()=>setFocus(!focus)} aria-pressed={focus} aria-label={t(focus?'Leave focus mode':'Focus mode')}>{focus?<PanelLeft size={17}/>:<PanelLeftClose size={17}/>}<span>{t('Focus mode')}</span></button><button onClick={()=>setSettings(!settings)} aria-expanded={settings} aria-label={t('Reading settings')}><SlidersHorizontal size={17}/></button>{settings&&<div className="rr-settings"><strong>{t('Reading settings')}</strong><label>{t('Text size')}<output>{size}px</output><input aria-label={t('Text size')} type="range" min="18" max="26" value={size} onChange={e=>saveSettings(Number(e.target.value),wide)}/></label><div><button onClick={()=>saveSettings(size,false)} aria-pressed={!wide}>{t('Comfort')}</button><button onClick={()=>saveSettings(size,true)} aria-pressed={wide}>{t('Wide')}</button></div></div>}</div></div>{children}</div>
 </div>;
}
