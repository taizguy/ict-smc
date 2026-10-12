import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header, MainTabType } from './components/Header';
import { CurriculumView } from './components/CurriculumView';
import { TradingToolId } from './components/TradingToolsWorkbench';
import { textbookChapters } from './data/chaptersData';
import { 
  getStoredProgress, 
  saveCompletedChapter 
} from './utils/academyProgress';
import { 
  Youtube, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Wrench,
  GraduationCap,
  ShieldAlert,
  Lock,
  FileText,
  Mail,
  CheckCircle2,
  Loader2,
  Building
} from 'lucide-react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ScrollReveal } from './components/ScrollReveal';
import type { LegalModalTab } from './components/LegalModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import type { LegalTabType } from './components/LegalPageView';

// Code-split heavy interactive sub-modules for fast initial paint & Core Web Vitals
const WelcomeScreen = lazy(() => import('./components/WelcomeScreen').then(m => ({ default: m.WelcomeScreen })));
const ChapterRoom = lazy(() => import('./components/ChapterRoom').then(m => ({ default: m.ChapterRoom })));
const TradingToolsWorkbench = lazy(() => import('./components/TradingToolsWorkbench').then(m => ({ default: m.TradingToolsWorkbench })));
const MasoodAcademyView = lazy(() => import('./components/masood/MasoodAcademyView').then(m => ({ default: m.MasoodAcademyView })));
const SearchModal = lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));
const MentorSpotlight = lazy(() => import('./components/MentorSpotlight').then(m => ({ default: m.MentorSpotlight })));
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));
const LegalPageView = lazy(() => import('./components/LegalPageView').then(m => ({ default: m.LegalPageView })));

const ViewLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 py-24 text-center">
    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
      <Loader2 className="w-5 h-5 text-[#55E6D1] animate-spin" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#9BA1AE]">Loading Institutional Module...</p>
      <p className="text-[11px] text-[#656B78]">Streaming codified market microstructure</p>
    </div>
  </div>
);

export const App: React.FC = () => {
  // Initialize buttery smooth momentum mouse scrolling
  useSmoothScroll();

  // Read initial route from URL path or parameters (default to clean 'welcome' home screen)
  const [activeTab, setActiveTab] = useState<MainTabType>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as MainTabType | null;
      const chapterParam = params.get('chapter');
      const chapterPathMatch = path.match(/\/chapter[-/](\d+)/i);

      if (chapterPathMatch || chapterParam) return 'chapter_room';
      if (path === '/curriculum' || tabParam === 'curriculum') return 'curriculum';
      if (path === '/masood' || tabParam === 'masood') return 'masood';
      if (path === '/tools' || tabParam === 'tools') return 'tools';

      const legalPaths: LegalTabType[] = ['disclaimer', 'privacy', 'terms', 'about', 'contact', 'adsense'];
      for (const lp of legalPaths) {
        if (path === `/${lp}` || tabParam === lp) return lp;
      }
    }
    return 'welcome';
  });

  const [initialTool, setInitialTool] = useState<TradingToolId>('chartlab');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMentorSpotlightOpen, setIsMentorSpotlightOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalModalTab>('disclaimer');
  const [selectedConceptId, setSelectedConceptId] = useState<string>('fair_value_gap');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const chapterParam = params.get('chapter');
      const chapterPathMatch = path.match(/\/chapter[-/](\d+)/i);
      const rawCid = chapterPathMatch ? chapterPathMatch[1] : chapterParam;
      if (rawCid) {
        const parsed = parseInt(rawCid, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 57) return parsed;
      }
    }
    return 1;
  });

  // Chapter completion (optional reference, non-blocking)
  const [completedChapterIds, setCompletedChapterIds] = useState<number[]>(() => {
    return getStoredProgress().completedChapterIds;
  });

  // Read URL query parameters on initial load and handle browser popstate (Back/Forward)
  useEffect(() => {
    const parseUrlState = () => {
      try {
        const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
        const params = new URLSearchParams(window.location.search);
        const chapterParam = params.get('chapter');
        const tabParam = params.get('tab') as MainTabType | null;
        const toolParam = params.get('tool') as TradingToolId | null;
        const conceptParam = params.get('concept');

        // Pathname inspection for direct clean routing (supports all 57 chapters)
        const chapterPathMatch = path.match(/\/chapter[-/](\d+)/i);
        const rawChapter = chapterPathMatch ? chapterPathMatch[1] : chapterParam;
        if (rawChapter) {
          const cid = parseInt(rawChapter, 10);
          if (!isNaN(cid) && cid >= 1 && cid <= 57) {
            setSelectedChapterId(cid);
            setActiveTab('chapter_room');
            return;
          }
        }

        const legalPaths: LegalTabType[] = ['disclaimer', 'privacy', 'terms', 'about', 'contact', 'adsense'];
        for (const lp of legalPaths) {
          if (path === `/${lp}` || path.startsWith(`/${lp}/`) || tabParam === lp) {
            setActiveTab(lp);
            return;
          }
        }

        if (path === '/masood' || path.startsWith('/masood/') || tabParam === 'masood') {
          setActiveTab('masood');
          return;
        }

        if (path === '/tools' || path.startsWith('/tools/') || tabParam === 'tools') {
          setActiveTab('tools');
          if (toolParam) setInitialTool(toolParam);
          return;
        }

        if (path === '/curriculum' || path.startsWith('/curriculum/') || tabParam === 'curriculum') {
          setActiveTab('curriculum');
          return;
        }

        if (tabParam === 'welcome' || path === '/' || path === '') {
          setActiveTab('welcome');
          return;
        }

        if (tabParam) {
          setActiveTab(tabParam);
        }

        if (toolParam) {
          setInitialTool(toolParam);
        }

        if (conceptParam) {
          setSelectedConceptId(conceptParam);
        }
      } catch {
        // Fallback safely
      }
    };

    parseUrlState();
    window.addEventListener('popstate', parseUrlState);
    return () => window.removeEventListener('popstate', parseUrlState);
  }, []);

  // Synchronize document title, meta descriptions, canonical links, and clean browser URL
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let title = 'ICT & SMC Academy - Smart Money Concepts & Institutional Trading Curriculum';
    let description = 'Master Inner Circle Trader (ICT) and Smart Money Concepts with a free 57-chapter institutional curriculum, 52 Abdullah Masood masterclasses, interactive Chart Lab, and algorithmic trade simulator.';
    let cleanPath = '/';

    if (activeTab === 'chapter_room') {
      const ch = textbookChapters.find(c => c.id === selectedChapterId) || textbookChapters[0];
      title = `Chapter ${ch.id}: ${ch.title} | ICT & SMC Academy`;
      description = `Chapter ${ch.id} (${ch.part}): ${ch.quote || ch.title}. Master institutional algorithmic price delivery, liquidity sweeps, and execution.`;
      cleanPath = `/chapter/${ch.id}`;
    } else if (activeTab === 'masood') {
      title = 'Trader Abdullah Masood Academy (52 Masterclasses) | ICT & SMC Academy';
      description = 'Study Trader Abdullah Masood complete 52-lecture institutional curriculum on ICT and Smart Money Concepts with video timestamps and notes.';
      cleanPath = '/masood';
    } else if (activeTab === 'tools') {
      title = `ICT Trading Workbench & ${initialTool.toUpperCase()} | learnsmc.xyz`;
      description = 'Interactive Chart Lab, SMC strategy simulator, backtester, trading journal, and institutional concepts reference.';
      cleanPath = '/tools';
    } else if (activeTab === 'curriculum') {
      title = 'ICT & SMC Academy - 57-Chapter Institutional Trading Curriculum';
      description = 'Explore the complete 57-chapter institutional trading curriculum covering Market Structure, Liquidity Sweeps, Fair Value Gaps, PO3, and Algorithmic Execution.';
      cleanPath = '/curriculum';
    } else if (activeTab === 'disclaimer') {
      title = 'Financial Risk Disclosure & CFTC Rule 4.41 Compliance | LearnSMC';
      description = 'Statutory risk disclosures, CFTC Rule 4.41 compliance statement, and educational non-advice declaration for LearnSMC.';
      cleanPath = '/disclaimer';
    } else if (activeTab === 'privacy') {
      title = 'Privacy Policy & Google AdSense Cookie Disclosures | LearnSMC';
      description = 'Official privacy policy, Google AdSense third-party cookie disclosures, opt-out links, and GDPR/CCPA data rights for learnsmc.xyz.';
      cleanPath = '/privacy';
    } else if (activeTab === 'terms') {
      title = 'Terms of Service & Open Educational License | LearnSMC';
      description = 'Terms of service, educational usage licenses, limitation of liability, and acceptable use guidelines for learnsmc.xyz.';
      cleanPath = '/terms';
    } else if (activeTab === 'about') {
      title = 'About LearnSMC, Editorial Methodology & Authorship | LearnSMC';
      description = 'LearnSMC institutional mission, editorial peer review standards, author bios, and Trader Abdullah Masood curriculum preservation.';
      cleanPath = '/about';
    } else if (activeTab === 'contact') {
      title = 'Contact LearnSMC & Editorial Support | LearnSMC';
      description = 'Direct contact channels, support email (support@learnsmc.xyz), and editorial inquiry form for LearnSMC.';
      cleanPath = '/contact';
    } else if (activeTab === 'adsense') {
      title = 'Google AdSense Verification & ads.txt Record | LearnSMC';
      description = 'Official Google AdSense publisher verification, ca-pub-6985025314302607 record, and ads.txt specification for learnsmc.xyz.';
      cleanPath = '/adsense';
    } else if (activeTab === 'welcome') {
      title = 'ICT & SMC Academy - Smart Money Concepts & Institutional Trading Curriculum';
      description = 'Master Inner Circle Trader (ICT) and Smart Money Concepts with a free 57-chapter institutional curriculum, 52 Abdullah Masood masterclasses, and interactive Chart Lab.';
      cleanPath = '/';
    }

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const canonicalHref = cleanPath === '/' ? 'https://learnsmc.xyz/' : `https://learnsmc.xyz${cleanPath}`;
      canonical.setAttribute('href', canonicalHref);
    }

    // Keep URL clean and synchronized with active state (avoid messy query parameters like ?tab=welcome)
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const hasSearchToClean = currentSearch.includes('tab=') || currentSearch.includes('chapter=');
    if (currentPath !== cleanPath || hasSearchToClean) {
      window.history.replaceState({ activeTab, selectedChapterId, initialTool }, '', cleanPath);
    }
  }, [activeTab, selectedChapterId, initialTool]);

  const totalChapters = textbookChapters.length;
  const progressPercent = Math.round((completedChapterIds.length / totalChapters) * 100);

  // Jump and navigation handlers
  const navigateToTab = (tab: MainTabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectConcept = (conceptId: string) => {
    setSelectedConceptId(conceptId);
    setInitialTool('concepts');
    setActiveTab('tools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChapter = (chapterId: number) => {
    setSelectedChapterId(chapterId);
    setActiveTab('chapter_room');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteChapter = (chapterId: number) => {
    const updated = saveCompletedChapter(chapterId);
    setCompletedChapterIds(updated);
  };

  // Switch to specific trading workbench tool
  const handleNavigateTool = (toolId: TradingToolId) => {
    setInitialTool(toolId);
    setActiveTab('tools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isShowingWelcome = activeTab === 'welcome';

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F7FA] flex flex-col font-sans selection:bg-[#5865FF] selection:text-white relative overflow-x-hidden">
      {/* Subtle Film Grain Texture */}
      <div className="predikt-grain" aria-hidden="true" />

      {/* Predikt Deep Atmospheric Light Fields */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Core Blue Atmosphere */}
        <div 
          className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full opacity-20 filter blur-[150px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #5865FF 0%, rgba(138, 114, 255, 0.45) 45%, transparent 75%)' }}
        />
        {/* Violet Horizon Accent */}
        <div 
          className="absolute top-[35%] -right-[15%] w-[800px] h-[800px] rounded-full opacity-12 filter blur-[170px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #8A72FF 0%, transparent 70%)' }}
        />
        {/* Cyan Liquidity Ambience */}
        <div 
          className="absolute bottom-[-10%] -left-[10%] w-[900px] h-[900px] rounded-full opacity-10 filter blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #55E6D1 0%, transparent 70%)' }}
        />
      </div>

      {/* Minimal, Dark, Translucent Predikt Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (['chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard'].includes(tab)) {
            setInitialTool(tab);
            navigateToTab('tools');
          } else {
            navigateToTab(tab);
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMentorSpotlight={() => setIsMentorSpotlightOpen(true)}
        onOpenWelcomeIntro={() => navigateToTab('welcome')}
        progressPercent={progressPercent}
      />

      {/* Main Educational Application Content */}
      <main className="flex-1 max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 space-y-10 sm:space-y-14">
        
        {/* WELCOME / HOME SCREEN (Clean root experience at /) */}
        {isShowingWelcome && (
          <Suspense fallback={<ViewLoadingFallback />}>
            <WelcomeScreen
              onEnterAcademy={(targetTab?: MainTabType) => {
                navigateToTab(targetTab || 'curriculum');
              }}
              onOpenMentorSpotlight={() => {
                setIsMentorSpotlightOpen(true);
              }}
            />
          </Suspense>
        )}

        {/* PILLAR 1: OPEN SYLLABUS & CURRICULUM VIEW (All 57 Chapters Unlocked) */}
        {!isShowingWelcome && (activeTab === 'curriculum' || activeTab === 'world_map' || activeTab === 'textbook') && (
          <CurriculumView
            onSelectChapter={handleSelectChapter}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {/* PILLAR 1 DETAIL: DEDICATED CHAPTER ROOM */}
        {!isShowingWelcome && activeTab === 'chapter_room' && (
          <Suspense fallback={<ViewLoadingFallback />}>
            <ChapterRoom
              chapterId={selectedChapterId}
              onSelectChapter={handleSelectChapter}
              onReturnToMap={() => {
                setActiveTab('curriculum');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCompleteChapter={handleCompleteChapter}
              isCompleted={completedChapterIds.includes(selectedChapterId)}
            />
          </Suspense>
        )}

        {/* PILLAR 2: TRADER ABDULLAH MASOOD ACADEMY (52 LECTURES) */}
        {!isShowingWelcome && activeTab === 'masood' && (
          <Suspense fallback={<ViewLoadingFallback />}>
            <MasoodAcademyView />
          </Suspense>
        )}

        {/* PILLAR 3: TRADING TOOLS WORKBENCH (Separated from primary learning) */}
        {!isShowingWelcome && (activeTab === 'tools' || [
          'chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard'
        ].includes(activeTab)) && (
          <Suspense fallback={<ViewLoadingFallback />}>
            <TradingToolsWorkbench
              initialTool={initialTool}
              onSelectConcept={handleSelectConcept}
            />
          </Suspense>
        )}

        {/* PILLAR 4: STANDALONE CRAWLABLE LEGAL & POLICY PAGES (AdSense, CFTC & GDPR Compliant) */}
        {!isShowingWelcome && ['disclaimer', 'privacy', 'terms', 'about', 'contact', 'adsense'].includes(activeTab) && (
          <Suspense fallback={<ViewLoadingFallback />}>
            <LegalPageView
              currentTab={activeTab as LegalTabType}
              onTabChange={navigateToTab}
              onBackToCurriculum={() => navigateToTab('curriculum')}
            />
          </Suspense>
        )}

      </main>

      {/* Global Search Modal */}
      <Suspense fallback={null}>
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectConcept={handleSelectConcept}
          onSelectChapter={handleSelectChapter}
        />
      </Suspense>

      {/* Mentor Tribute Spotlight Modal */}
      <Suspense fallback={null}>
        <MentorSpotlight
          isOpen={isMentorSpotlightOpen}
          onClose={() => setIsMentorSpotlightOpen(false)}
          onOpenMasoodAcademy={() => {
            setIsMentorSpotlightOpen(false);
            setActiveTab('masood');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </Suspense>

      {/* Predikt Editorial Footer */}
      <footer className="border-t border-white/[0.07] bg-[#08090D]/80 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8 mt-auto relative z-10">
        <div className="max-w-[1560px] w-full mx-auto space-y-8">
          
          {/* Tribute Banner - Sleek Dark Card */}
          <ScrollReveal y={30} duration={0.6}>
            <div className="p-6 sm:p-7 bg-[#11141B] border border-white/[0.08] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 transition-colors hover:border-white/[0.14]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-[#FF6B7A]">
                  <Youtube className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#9BA1AE] flex items-center gap-2">
                    <span className="text-[#55E6D1]">MENTORSHIP TRIBUTE</span>
                    <span className="text-white/20">/</span>
                    <span>TRADER ABDULLAH MASOOD</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F5F7FA]/90 mt-1 leading-relaxed font-normal">
                    Master educator of ICT &amp; Smart Money Concepts algorithmic delivery. 52 structured masterclasses preserved with complete fidelity.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto justify-start md:justify-end">
                <button
                  onClick={() => {
                    setActiveTab('masood');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-predikt-primary text-xs"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>Masood Academy (52)</span>
                </button>
                <button
                  onClick={() => setIsMentorSpotlightOpen(true)}
                  className="btn-predikt-secondary text-xs"
                >
                  View Tribute
                </button>
                <a
                  href="https://www.youtube.com/@TraderAbdullahMasood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-predikt-secondary text-xs"
                >
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span>YouTube Channel</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Regulatory Risk Notice Banner */}
          <ScrollReveal y={20} delay={0.05}>
            <div className="p-4 sm:p-5 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 text-[#C4C9D6] text-xs leading-relaxed flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs text-[#9BA1AE]">
                  <strong className="text-amber-300 font-semibold uppercase tracking-wider">Regulatory Risk Disclosure:</strong> Trading foreign exchange, futures, indices, and financial derivatives carries high risk and may not be suitable for all investors. All materials on <strong className="text-white">learnsmc.xyz</strong> are strictly for educational and research purposes. Past performance is not indicative of future results.
                </p>
              </div>
              <a
                href="/disclaimer"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('disclaimer');
                }}
                className="text-[11px] font-mono text-amber-400 hover:text-amber-300 underline shrink-0 whitespace-nowrap self-end md:self-center"
              >
                Read Full Risk Disclosure &rarr;
              </a>
            </div>
          </ScrollReveal>

          {/* Legal Pages & Policy Navigation Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06] text-xs font-mono text-[#8E95A5]">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href="/disclaimer"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('disclaimer');
                }}
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Risk Disclaimer</span>
              </a>

              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('privacy');
                }}
                className="hover:text-[#55E6D1] transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#55E6D1]" />
                <span>Privacy Policy</span>
              </a>

              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('terms');
                }}
                className="hover:text-[#8A72FF] transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#8A72FF]" />
                <span>Terms of Service</span>
              </a>

              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('about');
                }}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Building className="w-3.5 h-3.5 text-white/80" />
                <span>About &amp; Editorial</span>
              </a>

              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('contact');
                }}
                className="hover:text-[#55E6D1] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#55E6D1]" />
                <span>Contact</span>
              </a>

              <a
                href="/adsense"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('adsense');
                }}
                className="text-[#55E6D1]/90 hover:text-[#55E6D1] transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#55E6D1]" />
                <span>ads.txt Verified</span>
              </a>
            </div>

            <div className="text-[11px] text-[#656B78] flex items-center gap-2">
              <span>Domain:</span>
              <a 
                href="https://learnsmc.xyz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#9BA1AE] hover:text-[#55E6D1] underline"
              >
                learnsmc.xyz
              </a>
            </div>
          </div>

          <ScrollReveal y={15} delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9BA1AE] pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
                <span className="font-medium text-[#F5F7FA]">ICT &amp; SMC ACADEMY</span>
                <span className="text-white/20">|</span>
                <span>OPEN INSTITUTIONAL CURRICULUM</span>
              </div>
              <div className="text-[#656B78] flex items-center gap-3">
                <span>57 CHAPTERS</span>
                <span>·</span>
                <span>52 LECTURES</span>
                <span>·</span>
                <span>LABORATORY</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>

      {/* Regulatory & Legal Modal (Quick preview or deep study) */}
      <Suspense fallback={null}>
        <LegalModal
          isOpen={isLegalModalOpen}
          onClose={() => setIsLegalModalOpen(false)}
          initialTab={legalModalTab}
        />
      </Suspense>

      {/* Cookie & Privacy Consent Banner (GDPR, UK & AdSense Ready) */}
      <CookieConsentBanner
        onOpenPrivacyPolicy={() => {
          setActiveTab('privacy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default App;
