import { useTranslation } from '../i18n/TranslationProvider';
import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Clock
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';
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

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenMentorSpotlight,
  onOpenWelcomeIntro,
  progressPercent = 0
}) => {
  const { t, href } = useTranslation();
  const [nyTime, setNyTime] = useState<string>('');
  const [activeSession, setActiveSession] = useState<string>('Asian');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Scroll detection for backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clock in NY time (IPDA benchmark)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const nyTimeString = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setNyTime(nyTimeString);

      const nyHour = parseInt(nyTimeString.split(':')[0], 10);
      if (nyHour >= 20 || nyHour < 2) {
        setActiveSession('Asia');
      } else if (nyHour >= 2 && nyHour < 7) {
        setActiveSession('London KZ');
      } else if (nyHour >= 7 && nyHour < 12) {
        setActiveSession('NY AM Killzone');
      } else if (nyHour >= 12 && nyHour < 16) {
        setActiveSession('NY PM Session');
      } else {
        setActiveSession('Post-Market');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine which macro section is active
  const isCurriculumActive = activeTab === 'curriculum' || activeTab === 'chapter_room' || activeTab === 'world_map' || activeTab === 'textbook';
  const isMasoodActive = activeTab === 'masood';
  const isToolsActive = activeTab === 'tools' || [
    'chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard', 'masterclass', 'ict_suite'
  ].includes(activeTab);

  return (
    <header className={`studio-header sticky top-0 z-50 transition-all duration-300 border-b ${
      isScrolled
        ? 'bg-canvas/90 backdrop-blur-xl border-ink/[0.08] shadow-[0_4px_30px_rgba(34,59,53,0.06)]'
        : 'bg-canvas/60 backdrop-blur-md border-ink/[0.05]'
    }`}>
      {/* Top Main Navigation Bar */}
      <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 min-h-16 h-auto sm:h-18 py-2 sm:py-0 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">

        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenWelcomeIntro) {
                onOpenWelcomeIntro();
              } else {
                setActiveTab('welcome');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="studio-brand flex items-center gap-3 text-left cursor-pointer group select-none"
            title={t("Return to Welcome Screen")}
            aria-label={t("Return to Welcome Screen")}
          >
            <span className="studio-brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40" width="40" height="40"><path d="M10 22v12m10-23v19M30 6v14"/><path d="M6 25h8v5H6zM16 16h8v9h-8zM26 10h8v6h-8z"/></svg></span>
            <span><span className="studio-brand-name">LearnSMC<span aria-hidden="true">↗</span></span><span className="studio-brand-subtitle">ICT / SMC {t('ACADEMY')}</span></span>
          </button>
        </div>

        {/* Center: Minimal Segmented Navigation */}
        <nav aria-label={t("Main navigation")} className="hidden xl:flex items-center gap-1 p-1 bg-ink/[0.03] border border-ink/[0.07] rounded-xl">
          {/* Pillar 1: Curriculum */}
          <a href={href("/curriculum/")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all cursor-pointer ${
              isCurriculumActive
                ? 'bg-ink/[0.08] text-ink shadow-sm'
                : 'text-ink-secondary hover:text-ink hover:bg-ink/[0.03]'
            }`}
          >
            <span>{t("Curriculum")}</span>
          </a>

          <a href={href("/articles/")} aria-current={activeTab === 'articles' ? 'page' : undefined}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'articles' ? 'bg-ink/[0.08] text-ink' : 'text-ink-secondary hover:text-ink'}`}>{t("Articles")}</a>

          {/* Pillar 2: Masood's Academy */}
          <a href={href("/masood/")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all cursor-pointer ${
              isMasoodActive
                ? 'bg-ink/[0.08] text-ink shadow-sm'
                : 'text-ink-secondary hover:text-ink hover:bg-ink/[0.03]'
            }`}
          >
            <span>{t("Masood Academy")}</span>
          </a>

          {/* Pillar 3: Trading Tools */}
          <a href={href("/tools/")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all cursor-pointer ${
              isToolsActive
                ? 'bg-ink/[0.08] text-ink shadow-sm'
                : 'text-ink-secondary hover:text-ink hover:bg-ink/[0.03]'
            }`}
          >
            <span>{t("Workbench & Lab")}</span>
          </a>
        </nav>

        {/* Right: Search, Market Clock, Tribute */}
        <div className="flex items-center gap-2 sm:gap-3 ms-auto">
          <LanguageSwitcher />
          <ThemePicker />
          {/* NY Market Session Clock */}
          <div className="studio-clock hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink/[0.02] border border-ink/[0.07] text-xs font-sans tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
            <span className="text-ink-secondary uppercase">{t(activeSession)}</span>
            <span className="text-ink">|</span>
            <span className="text-ink font-medium" dir="ltr">{nyTime || t('Loading time…')} ET</span>
          </div>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-ink/[0.03] hover:bg-ink/[0.07] border border-ink/[0.07] hover:border-ink/15 text-xs text-ink-secondary hover:text-ink transition-all cursor-pointer"
            title={t("Search (⌘K)")}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-sans">{t("Search")}</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[0.8125rem] font-sans tabular-nums bg-ink/[0.06] border border-ink/[0.08] rounded text-ink-secondary">
              ⌘K
            </kbd>
          </button>

          {/* Mentor Tribute */}
          {onOpenMentorSpotlight && (
            <button
              onClick={onOpenMentorSpotlight}
              className="studio-tribute p-2 rounded-lg bg-ink/[0.03] hover:bg-ink/[0.08] border border-ink/[0.07] text-ink-secondary hover:text-ink transition-all cursor-pointer"
              title={t("Trader Abdullah Masood Tribute")}
              aria-label={t("Trader Abdullah Masood Tribute")}
            >
              <Sparkles className="w-4 h-4 text-teal" />
            </button>
          )}
        </div>

      </div>

      {/* Mobile Macro Navigation Bar */}
      <div role="navigation" aria-label={t("Main navigation")} className="flex xl:hidden border-t border-ink/[0.06] px-3 py-2 bg-surface-muted/70">
        <BauhausNavScroller innerClassName="gap-1.5">
          <a href={href("/curriculum/")}
            className={`py-1.5 px-3 rounded-lg text-sm font-semibold tracking-tight whitespace-nowrap transition-all shrink-0 ${
              isCurriculumActive ? 'bg-ink/[0.10] text-ink' : 'text-ink-secondary'
            }`}
          >{t("Curriculum")}</a>
          <a href={href("/articles/")} aria-current={activeTab === 'articles' ? 'page' : undefined}
            className={`min-h-11 inline-flex items-center px-3 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 ${activeTab === 'articles' ? 'bg-ink/[0.10] text-ink' : 'text-ink-secondary'}`}>{t("Articles")}</a>
          <a href={href("/masood/")}
            className={`py-1.5 px-3 rounded-lg text-sm font-semibold tracking-tight whitespace-nowrap transition-all shrink-0 ${
              isMasoodActive ? 'bg-ink/[0.10] text-ink' : 'text-ink-secondary'
            }`}
          >{t("Masood Academy")}</a>
          <a href={href("/tools/")}
            className={`py-1.5 px-3 rounded-lg text-sm font-semibold tracking-tight whitespace-nowrap transition-all shrink-0 ${
              isToolsActive ? 'bg-ink/[0.10] text-ink' : 'text-ink-secondary'
            }`}
          >{t("Workbench & Lab")}</a>
        </BauhausNavScroller>
      </div>
    </header>
  );
};

export default Header;
