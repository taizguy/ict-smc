import { useTranslation } from '../i18n/TranslationProvider';
import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemePicker } from './ThemePicker';

export type MainTabType =
  | 'welcome'
  | 'articles'
  | 'resources'
  | 'curriculum'
  | 'chapter_room'
  | 'masood'
  | 'tools'
  | 'world_map'
  | 'textbook'
  | 'concepts'
  | 'chartlab'
  | 'graph'
  | 'compare'
  | 'simulator'
  | 'journal'
  | 'backtest'
  | 'dashboard'
  | 'masterclass'
  | 'ict_suite'
  | 'disclaimer'
  | 'privacy'
  | 'terms'
  | 'about'
  | 'contact'
  | 'adsense'
  | 'not_found';

interface HeaderProps {
  activeTab: MainTabType;
  setActiveTab: (tab: any) => void;
  onOpenSearch: () => void;
  onOpenMentorSpotlight?: () => void;
  onOpenWelcomeIntro?: () => void;
  progressPercent?: number;
}

type Panel = 'curriculum' | 'tools' | 'resources';

export const Header: React.FC<HeaderProps> = ({activeTab, onOpenSearch, onOpenWelcomeIntro}) => {
  const {t,href,locale}=useTranslation();
  const [panel,setPanel]=useState<Panel|null>(null);
  const header=useRef<HTMLElement>(null);
  const triggers=useRef<Partial<Record<Panel,HTMLButtonElement>>>({});
  useEffect(()=>{
    const close=(event:PointerEvent|KeyboardEvent)=>{
      if(event instanceof KeyboardEvent){
        if(event.key!=='Escape')return;
        if(panel)triggers.current[panel]?.focus();
      }else if(header.current?.contains(event.target as Node))return;
      setPanel(null);
      header.current?.querySelectorAll<HTMLDetailsElement>('.playground-library[open]').forEach(menu=>{menu.open=false;});
    };
    document.addEventListener('pointerdown',close);document.addEventListener('keydown',close);
    return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',close);};
  },[panel]);
  const isCurriculum=['curriculum','chapter_room','world_map','textbook'].includes(activeTab);
  const isTools=['tools','chartlab','simulator','backtest','journal','graph','concepts','compare','dashboard','masterclass','ict_suite'].includes(activeTab);
  const groups={
    curriculum:{title:'Explore the curriculum',main:[['/curriculum/','All lessons'],['/curriculum/mentorships/','Mentorships'],['/learn/fair-value-gaps-fvg-and-consequent-encroachment/','Fair value gaps']],aside:[['/learn/what-actually-moves-price/','Start with the foundations'],['/resources/ict-smc-cheat-sheet/','Free cheat sheet']]},
    tools:{title:'Explore the workbench',main:[['/tools/','All study tools'],['/tools/chartlab/','Chart Laboratory'],['/tools/simulator/','Trade Simulator'],['/tools/backtest/','Backtest Lab']],aside:[['/tools/glossary/','Glossary'],['/tools/compare/','Compare concepts'],['/tools/journal/','Trading journal']]},
    resources:{title:'Keep learning',main:[['/resources/ict-smc-cheat-sheet/','Free cheat sheet'],['/articles/','Illustrated articles']],aside:[['/about/','About LearnSMC'],['/contact/','Contact & corrections']]},
  } as const;
  const disclosure=(id:Panel,label:string,active:boolean)=><button type="button" ref={node=>{triggers.current[id]=node||undefined;}}
    className={active?'is-current':''} aria-expanded={panel===id} aria-controls="desktop-learning-panel"
    onMouseEnter={()=>setPanel(id)} onFocus={()=>setPanel(id)} onClick={()=>setPanel(id)}>{t(label)}</button>;
  const selected=panel?groups[panel]:null;
  return <header ref={header} className="site-header" onMouseLeave={()=>setPanel(null)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setPanel(null);}}>
    <div className="site-nav-bar">
      <a className="site-brand" href={href('/')} aria-label={t('LearnSMC home')} onClick={event=>{if(onOpenWelcomeIntro&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey){event.preventDefault();onOpenWelcomeIntro();}}}>
        <span className="site-brand-symbol" aria-hidden="true"><svg viewBox="0 0 40 40" width="30" height="30"><path d="M10 22v12m10-23v19M30 6v14"/><path d="M6 25h8v5H6zM16 16h8v9h-8zM26 10h8v6h-8z"/></svg></span>
        <span translate="no">LearnSMC<span className="brand-period">.</span></span>
      </a>
      <nav className="desktop-navigation" aria-label={t('Main navigation')}>
        {disclosure('curriculum','Curriculum',isCurriculum)}
        <a href={href('/articles/')} aria-current={activeTab==='articles'?'page':undefined} onMouseEnter={()=>setPanel(null)} onFocus={()=>setPanel(null)}>{t('Articles')}</a>
        <a href={href('/masood/')} aria-current={activeTab==='masood'?'page':undefined} onMouseEnter={()=>setPanel(null)} onFocus={()=>setPanel(null)}>{t('Masood Academy')}</a>
        {disclosure('tools','Workbench & Lab',isTools)}
        {disclosure('resources','Resources',activeTab==='resources')}
      </nav>
      <details className="playground-library mobile-library">
        <summary>{locale==='ur'?'لائبریری':'The library'} <span aria-hidden="true">＋</span></summary>
        <nav aria-label={locale==='ur'?'تعلیمی لائبریری':'Learning library'}>
          <p>{locale==='ur'?'آج کیا سیکھنا چاہتے ہیں؟':'Where does your curiosity go next?'}</p>
          {([
            ['/curriculum/','Curriculum','نصاب','01'],
            ['/curriculum/mentorships/','Mentorships','مینٹورشپس','02'],
            ['/tools/','Workbench & Lab','ورک بینچ اور لیب','03'],
            ['/articles/','Articles','مضامین','04'],
            ['/masood/','Masood Academy','مسعود اکیڈمی','05'],
            ['/resources/ict-smc-cheat-sheet/','Free cheat sheet','مفت چیٹ شیٹ','06'],
          ] as const).map(([path,en,ur,n])=><a key={path} href={href(path)}><small>{n}</small><span>{locale==='ur'?ur:en}</span><span aria-hidden="true">↗</span></a>)}
        </nav>
      </details>
      <div className="site-nav-utilities">
        <LanguageSwitcher/>
        <span className="nav-utility-divider" aria-hidden="true"/>
        <ThemePicker/>
        <button type="button" className="nav-icon-button" onClick={()=>{setPanel(null);onOpenSearch();}} aria-label={t('Search')} title={t('Search (⌘K)')}><Search size={19} strokeWidth={1.6}/></button>
      </div>
    </div>
    <div id="desktop-learning-panel" className={`desktop-learning-panel ${selected?'is-open':''}`} hidden={!selected}>
      {selected&&<div className="desktop-panel-inner">
        <div className="desktop-panel-primary"><p>{t(selected.title)}</p>{selected.main.map(([path,label])=><a href={href(path)} key={path}>{t(label)}</a>)}</div>
        <div className="desktop-panel-secondary"><p>{t('A useful next step')}</p>{selected.aside.map(([path,label])=><a href={href(path)} key={path}>{t(label)}</a>)}</div>
      </div>}
    </div>
  </header>;
};
export default Header;
