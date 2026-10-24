import { useTranslation } from '../i18n/TranslationProvider';
import React, { useEffect, useRef } from 'react';
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
  documentPath?: string;
  activeTab: MainTabType;
  setActiveTab: (tab: any) => void;
  onOpenSearch: () => void;
  onOpenMentorSpotlight?: () => void;
  onOpenWelcomeIntro?: () => void;
  progressPercent?: number;
}

export const Header: React.FC<HeaderProps> = ({activeTab, onOpenSearch, documentPath}) => {
  const {t,href,locale}=useTranslation();
  const header=useRef<HTMLElement>(null);
  useEffect(()=>{const close=(event:PointerEvent|KeyboardEvent)=>{if(event instanceof KeyboardEvent&&event.key!=='Escape')return;if(event instanceof PointerEvent&&header.current?.contains(event.target as Node))return;header.current?.querySelectorAll<HTMLDetailsElement>('.playground-library[open]').forEach(menu=>{menu.open=false;});};document.addEventListener('pointerdown',close);document.addEventListener('keydown',close);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',close);};},[]);
  const isCurriculum=['curriculum','chapter_room','world_map','textbook'].includes(activeTab);
  const isTools=['tools','chartlab','simulator','backtest','journal','graph','concepts','compare','dashboard','masterclass','ict_suite'].includes(activeTab);
  return <header ref={header} className="site-header">
    <div className="site-nav-bar">
      <a className="site-brand" href={href('/')} aria-label={t('LearnSMC home')}>
        <span className="site-brand-symbol" aria-hidden="true"><svg viewBox="0 0 40 40" width="30" height="30"><path d="M10 22v12m10-23v19M30 6v14"/><path d="M6 25h8v5H6zM16 16h8v9h-8zM26 10h8v6h-8z"/></svg></span>
        <span translate="no">LearnSMC<span className="brand-period">.</span></span>
      </a>
      <nav className="desktop-navigation" aria-label={t('Main navigation')}>
        <a href={href('/curriculum/')} aria-current={isCurriculum?'page':undefined}>{t('Curriculum')}</a>
        <a href={href('/articles/')} aria-current={activeTab==='articles'?'page':undefined}>{t('Articles')}</a>
        <a href={href('/masood/')} aria-current={activeTab==='masood'?'page':undefined}>{t('Masood Academy')}</a>
        <a href={href('/tools/')} aria-current={isTools?'page':undefined}>{t('Workbench & Lab')}</a>
      </nav>
      <details className="playground-library mobile-library">
        <summary>{locale==='ur'?'لائبریری':'The library'} <span aria-hidden="true">＋</span></summary>
        <nav aria-label={locale==='ur'?'تعلیمی لائبریری':'Learning library'}>
          <p>{locale==='ur'?'آج کیا سیکھنا چاہتے ہیں؟':'Where does your curiosity go next?'}</p>
          {([
            ['/curriculum/','Curriculum','نصاب','01'],
            ['/articles/','Articles','مضامین','02'],
            ['/masood/','Masood Academy','مسعود اکیڈمی','03'],
            ['/tools/','Workbench & Lab','ورک بینچ اور لیب','04'],
          ] as const).map(([path,en,ur,n])=><a key={path} href={href(path)}><small>{n}</small><span>{locale==='ur'?ur:en}</span><span aria-hidden="true">↗</span></a>)}
        </nav>
      </details>
      <div className="site-nav-utilities">
        <LanguageSwitcher path={documentPath}/>
        <span className="nav-utility-divider" aria-hidden="true"/>
        <ThemePicker/>
        <button type="button" className="nav-icon-button" onClick={onOpenSearch} aria-label={t('Search')} title={t('Search (⌘K)')}><Search size={19} strokeWidth={1.6}/></button>
      </div>
    </div>
  </header>;
};
export default Header;
