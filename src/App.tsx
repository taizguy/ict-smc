import { currentDocumentHref } from './i18n/navigation';
import { useTranslation } from './i18n/TranslationProvider';
import { withoutLocale } from './i18n/locale';
import { mentorshipTracks } from './data/mentorshipTracks';
import './styles/articles.css';
import { articleCatalog } from './data/catalog.generated';
import { PageReady } from './components/PageReady';
import { chapterCount, lectureCount } from './utils/catalogCounts';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AdsenseLoader } from './components/AdsenseLoader';
import { Header, MainTabType } from './components/Header';

import { TradingToolId } from './components/TradingToolsWorkbench';
import { chapterCatalog as textbookChapters, lectureCatalog as allMasoodLectures, playlistCatalog as masoodPlaylistsData } from './data/catalog.generated';

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
import {
  normalizeCanonicalUrl,
  normalizePath,
  getLessonCanonicalUrl,
  getLessonPath,
  resolveLegacyChapter
} from './utils/url';
import {
  resolveGlossaryUrl,
  getConceptBySlugOrId,
  getGlossaryConceptPath,
  getGlossaryRootPath
} from './utils/glossaryRoutes';
import {
  type WorkbenchToolId
} from './utils/workbenchToolRoutes';

// Code-split heavy interactive sub-modules for fast initial paint & Core Web Vitals
const ArticlesView = lazy(() => import('./components/articles/ArticlesView').then(m => ({ default: m.ArticlesView })));
const CheatSheetPage = lazy(() => import('./components/CheatSheetPage').then(m => ({ default: m.CheatSheetPage })));
const CurriculumView = lazy(() => import('./components/CurriculumView').then(m => ({ default: m.CurriculumView })));
const WelcomeScreen = lazy(() => import('./components/WelcomeScreen').then(m => ({ default: m.WelcomeScreen })));
const ChapterRoom = lazy(() => import('./components/ChapterRoom').then(m => ({ default: m.ChapterRoom })));
const TradingToolsWorkbench = lazy(() => import('./components/TradingToolsWorkbench').then(m => ({ default: m.TradingToolsWorkbench })));
const MasoodAcademyView = lazy(() => import('./components/masood/MasoodAcademyView').then(m => ({ default: m.MasoodAcademyView })));
const SearchModal = lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));
const MentorSpotlight = lazy(() => import('./components/MentorSpotlight').then(m => ({ default: m.MentorSpotlight })));
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));
const LegalPageView = lazy(() => import('./components/LegalPageView').then(m => ({ default: m.LegalPageView })));
const NotFoundView = lazy(() => import('./components/NotFoundView').then(m => ({ default: m.NotFoundView })));



// Keep this page's published article readable while its interactive module downloads.
const initialArticleHtml = typeof document === 'undefined' ? '' : document.querySelector('#static-content article')?.innerHTML || '';
const ViewLoadingFallback: React.FC = () => initialArticleHtml ? (
  <div id="static-content" className="prose max-w-none" dangerouslySetInnerHTML={{ __html: initialArticleHtml }} />
) : (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 py-24 text-center">
    <div className="w-12 h-12 rounded-2xl bg-ink/[0.03] border border-ink/[0.08] flex items-center justify-center">
      <Loader2 className="w-5 h-5 text-teal animate-spin" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-sans tabular-nums uppercase tracking-[0.18em] text-ink-secondary">Loading Institutional Module...</p>
      <p className="text-[0.8125rem] text-ink-muted">Streaming codified market microstructure</p>
    </div>
  </div>
);

// Map human-friendly tool slugs
const toolSlugMap: Record<string, TradingToolId> = {
  'chartlab': 'chartlab',
  'chart-lab': 'chartlab',
  'simulator': 'simulator',
  'trade-simulator': 'simulator',
  'backtest': 'backtest',
  'backtest-lab': 'backtest',
  'journal': 'journal',
  'trading-journal': 'journal',
  'graph': 'graph',
  'knowledge-graph': 'graph',
  'concepts': 'concepts',
  'glossary': 'concepts',
  'compare': 'compare',
  'dashboard': 'dashboard',
  'profile': 'dashboard',
  'mastery-profile': 'dashboard',
  'masterclass': 'masterclass',
  'ict-suite': 'ict_suite',
  'ict_suite': 'ict_suite',
  'delivery-suite': 'ict_suite',
  'delivery_suite': 'ict_suite'
};

export const App: React.FC = () => {
  const { t, href, message, preview } = useTranslation();
  // Initialize buttery smooth momentum mouse scrolling
  useSmoothScroll();

  // Resolve the requested route before mounting any page module.
  const [routeResolved, setRouteResolved] = useState(false);
  // Route state
  const [activeTab, setActiveTab] = useState<MainTabType>('welcome');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [initialTool, setInitialTool] = useState<TradingToolId | 'overview'>('overview');
  const [glossaryCategory, setGlossaryCategory] = useState<string | undefined>(undefined);
  const [glossaryConceptId, setGlossaryConceptId] = useState<string | undefined>(undefined);
  const [glossarySubConceptId, setGlossarySubConceptId] = useState<string | undefined>(undefined);

  // Workbench sub-route states
  const [masterclassCategory, setMasterclassCategory] = useState<string | undefined>(undefined);
  const [masterclassModuleSlug, setMasterclassModuleSlug] = useState<string | undefined>(undefined);
  const [chartScenarioSlug, setChartScenarioSlug] = useState<string | undefined>(undefined);
  const [chartStepSlug, setChartStepSlug] = useState<string | undefined>(undefined);
  const [simulatorModelSlug, setSimulatorModelSlug] = useState<string | undefined>(undefined);
  const [backtestStrategySlug, setBacktestStrategySlug] = useState<string | undefined>(undefined);
  const [journalSectionSlug, setJournalSectionSlug] = useState<string | undefined>(undefined);
  const [graphViewMode, setGraphViewMode] = useState<'pipeline' | 'network' | undefined>(undefined);
  const [graphStep, setGraphStep] = useState<number | undefined>(undefined);
  const [graphNodeId, setGraphNodeId] = useState<string | undefined>(undefined);
  const [comparisonSlug, setComparisonSlug] = useState<string | undefined>(undefined);
  const [profileSubTab, setProfileSubTab] = useState<'roadmap' | 'quiz' | undefined>(undefined);
  const [profileExamSlug, setProfileExamSlug] = useState<string | undefined>(undefined);
  const [deliveryModuleSlug, setDeliveryModuleSlug] = useState<string | undefined>(undefined);
  const [masoodSubTab, setMasoodSubTab] = useState<'lectures' | 'animations' | 'bias_calc' | 'rules'>('lectures');
  const [masoodLectureId, setMasoodLectureId] = useState<string | null>(null);
  const [attemptedInvalidPath, setAttemptedInvalidPath] = useState<string>('');
  const [selectedConceptId, setSelectedConceptId] = useState<string>('fair_value_gap');

  // Modals & UI states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMentorSpotlightOpen, setIsMentorSpotlightOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalModalTab>('disclaimer');

  // Chapter completion
  const [completedChapterIds, setCompletedChapterIds] = useState<number[]>(() => {
    return getStoredProgress().completedChapterIds;
  });

  // Centralized URL Parser for Deep Linking, Direct Access & Browser History
  const parseCurrentUrl = async () => {
    if (typeof window === 'undefined') return;
    setRouteResolved(false);

    try {
      if (document.querySelector('meta[name="learnsmc-status"]')?.getAttribute('content') === '404') {
        setActiveTab('not_found'); setAttemptedInvalidPath(window.location.pathname); return;
      }
      const path = withoutLocale(window.location.pathname).toLowerCase().replace(/\/$/, '') || '/';
      if (path === '/resources/ict-smc-cheat-sheet') { setActiveTab('resources'); return; }
      const params = new URLSearchParams(window.location.search);
      const chapterParam = params.get('chapter');
      const tabParam = params.get('tab') as MainTabType | null;
      const toolParam = params.get('tool') as TradingToolId | null;
      const conceptParam = params.get('concept');

      // 1. Backward compatibility: /chapter/:id or /chapter-:id or ?chapter=:id
      const legacyChapterMatch = path.match(/^\/chapter[-/](\d+)/i);
      const rawLegacyChapter = legacyChapterMatch ? legacyChapterMatch[1] : chapterParam;
      if (rawLegacyChapter) {
        const resolved = resolveLegacyChapter(rawLegacyChapter, textbookChapters);
        if (resolved) {
          setSelectedChapterId(resolved.id);
          setActiveTab('chapter_room');
          return;
        } else {
          // Graceful fallback to curriculum for unknown/invalid chapter identifiers per SEO specs
          setActiveTab('curriculum');
          return;
        }
      }

      // 2. Modern Canonical Lesson URLs: /learn/:slug/ (or numeric ID fallback)
      const learnMatch = path.match(/^\/learn\/([^/]+)$/i);
      if (learnMatch) {
        const slugOrId = learnMatch[1];
        const match = textbookChapters.find(c => c.slug === slugOrId || String(c.id) === slugOrId);
        if (match) {
          setSelectedChapterId(match.id);
          setActiveTab('chapter_room');
          return;
        } else {
          setActiveTab('not_found');
          setAttemptedInvalidPath(window.location.pathname);
          return;
        }
      }

      if (path === '/articles' || articleCatalog.some(a => path === `/articles/${a.slug}`)) {
        setActiveTab('articles');
        return;
      }

      // 3. Curriculum hub: /curriculum
      if (path === '/curriculum' || path.startsWith('/curriculum/') || tabParam === 'curriculum') {
        if (path.startsWith('/curriculum/mentorships/') && !mentorshipTracks.some(t => path === `/curriculum/mentorships/${t.slug}`)) {
          setActiveTab('not_found'); setAttemptedInvalidPath(window.location.pathname); return;
        }
        setActiveTab('curriculum');
        return;
      }

      // 4. Masood Academy deep routing: /masood, /masood/lectures/:id, /masood/animations, etc.
      if (path === '/masood' || path.startsWith('/masood/')) {
        setActiveTab('masood');
        if (path === '/masood' || path === '/masood/lectures') {
          setMasoodSubTab('lectures');
          setMasoodLectureId(null);
          return;
        }
        const playlistMatch = path.match(/^\/masood\/playlists\/([^/]+)$/);
        if (playlistMatch && masoodPlaylistsData.some(p => p.id === playlistMatch[1])) {
          setMasoodSubTab('lectures'); setMasoodLectureId(null); return;
        }
        const lectureMatch = path.match(/^\/masood\/lectures\/([^/]+)$/i);
        if (lectureMatch) {
          const lecParam = lectureMatch[1];
          const matchedLec = allMasoodLectures.find(l =>
            l.id.toLowerCase() === lecParam.toLowerCase() ||
            String(l.lectureNumber) === lecParam
          );
          if (matchedLec) {
            setMasoodSubTab('lectures');
            setMasoodLectureId(matchedLec.id);
            return;
          } else {
            setActiveTab('not_found');
            setAttemptedInvalidPath(window.location.pathname);
            return;
          }
        }
        if (path === '/masood/animations' || path.startsWith('/masood/animations/')) {
          setMasoodSubTab('animations');
          setMasoodLectureId(null);
          return;
        }
        if (path === '/masood/bias-calculator' || path === '/masood/bias_calc') {
          setMasoodSubTab('bias_calc');
          setMasoodLectureId(null);
          return;
        }
        if (path === '/masood/golden-rules' || path === '/masood/rules') {
          setMasoodSubTab('rules');
          setMasoodLectureId(null);
          return;
        }
        // Unknown masood subpath
        setActiveTab('not_found');
        setAttemptedInvalidPath(window.location.pathname);
        return;
      }

      // 5. Workbench Tools deep routing: /workbench, /tools, /tools/glossary/..., /tools/:toolId/...
      if (path === '/workbench' || path.startsWith('/workbench/') || path === '/tools' || path.startsWith('/tools/')) {
        setActiveTab('tools');
        if (path === '/tools' || path === '/workbench') {
          if (toolParam && toolSlugMap[toolParam]) {
            setInitialTool(toolSlugMap[toolParam]);
          } else {
            setInitialTool('overview');
          }
          return;
        }

        // Check glossary routes (/tools/glossary/ or legacy /tools/concepts/)
        if (path === '/tools/glossary' || path.startsWith('/tools/glossary/') || path === '/tools/concepts' || path.startsWith('/tools/concepts/')) {
          setInitialTool('concepts');
          const resolved = resolveGlossaryUrl(path);
          setGlossaryCategory(resolved.categorySlug);
          setGlossaryConceptId(resolved.conceptId);
          setGlossarySubConceptId(resolved.subConceptInfo?.slug);
          if (resolved.conceptId) {
            setSelectedConceptId(resolved.conceptId);
          }
          return;
        }

        // Check all remaining Workbench tools & hierarchical sub-routes
        const { resolveWorkbenchRoute } = await import('./utils/workbenchToolRoutes');
        const resolvedWb = resolveWorkbenchRoute(path);
        if (resolvedWb && resolvedWb.tool !== 'overview') {
          setInitialTool(resolvedWb.tool);
          setMasterclassCategory(resolvedWb.masterclassCategory);
          setMasterclassModuleSlug(resolvedWb.masterclassModuleSlug);
          setChartScenarioSlug(resolvedWb.chartScenarioSlug);
          setChartStepSlug(resolvedWb.chartStepSlug);
          setSimulatorModelSlug(resolvedWb.simulatorModelSlug);
          setBacktestStrategySlug(resolvedWb.backtestStrategySlug);
          setJournalSectionSlug(resolvedWb.journalSectionSlug);
          setGraphViewMode(resolvedWb.graphViewMode);
          setGraphStep(resolvedWb.graphStep);
          setGraphNodeId(resolvedWb.graphNodeId);
          setComparisonSlug(resolvedWb.comparisonSlug);
          setProfileSubTab(resolvedWb.profileSubTab);
          setProfileExamSlug(resolvedWb.profileExamSlug);
          setDeliveryModuleSlug(resolvedWb.deliveryModuleSlug);

          // If the visited path was an alias or non-canonical (e.g. /tools/graph/ or /tools/ict-suite/), update URL seamlessly without reload
          if (!resolvedWb.isCanonical && typeof window !== 'undefined' && window.location.pathname !== resolvedWb.canonicalUrl) {
            window.location.replace(currentDocumentHref(resolvedWb.canonicalUrl));
          }
          return;
        }

        const subTool = path.replace(/^\/(tools|workbench)\//, '').split('/')[0];
        if (toolSlugMap[subTool]) {
          const resolvedTool = toolSlugMap[subTool];
          setInitialTool(resolvedTool);
          return;
        } else {
          setActiveTab('not_found');
          setAttemptedInvalidPath(window.location.pathname);
          return;
        }
      }

      // 6. Standalone Legal & Policy Pages
      const legalPaths: LegalTabType[] = ['disclaimer', 'privacy', 'terms', 'about', 'contact', 'adsense'];
      for (const lp of legalPaths) {
        if (path === `/${lp}` || tabParam === lp) {
          setActiveTab(lp);
          return;
        }
      }

      // 7. Home screen: /
      if (path === '/' || path === '' || tabParam === 'welcome') {
        setActiveTab('welcome');
        return;
      }

      // 8. Unknown route: 404
      setActiveTab('not_found');
      setAttemptedInvalidPath(window.location.pathname);
    } catch {
      document.documentElement.dataset.appStartup = 'fallback';
      window.dispatchEvent(new Event('learnsmc:startup-timeout'));
    } finally {
      setRouteResolved(true);
    }
  };

  // Run on mount and attach popstate listener
  useEffect(() => {
    parseCurrentUrl();
    window.addEventListener('popstate', parseCurrentUrl);
    return () => window.removeEventListener('popstate', parseCurrentUrl);
  }, []);

  // Metadata comes from the generated document. Cross-page navigation loads a fresh document,
  // so hydration must not replace deep-route metadata with parent-route information.
  const totalChapters = textbookChapters.length;
  const progressPercent = Math.round((completedChapterIds.length / totalChapters) * 100);

  // Let a document navigation finish before changing the outgoing page's state.
  const openDocument = (targetPath: string) => {
    targetPath = href(targetPath);
    if (window.location.pathname !== targetPath || window.location.search) {
      window.location.assign(currentDocumentHref(targetPath));
      return true;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  };

  const navigateToTab = (tab: MainTabType) => {
    let targetPath = '/';
    if (tab === 'curriculum') targetPath = '/curriculum/';
    else if (tab === 'articles') targetPath = '/articles/';
    else if (tab === 'masood') targetPath = '/masood/';
    else if (tab === 'tools') targetPath = '/tools/';
    else if (['disclaimer', 'privacy', 'terms', 'about', 'contact', 'adsense'].includes(tab)) targetPath = `/${tab}/`;
    if (openDocument(targetPath)) return;
    setActiveTab(tab);
    if (tab === 'tools') setInitialTool('overview');
  };

  const handleSelectChapter = (chapterId: number, slug?: string) => {
    const ch = textbookChapters.find(c => c.id === chapterId) || textbookChapters[0];
    const targetPath = getLessonPath(slug || ch?.slug || String(chapterId));
    if (openDocument(targetPath)) return;
    setSelectedChapterId(chapterId);
    setActiveTab('chapter_room');
  };

  const handleSelectConcept = (conceptId: string, slug?: string) => {
    const mapping = getConceptBySlugOrId(conceptId);
    const catSlug = mapping?.categorySlug || 'foundations';
    const cSlug = slug || mapping?.slug || conceptId.replace(/_/g, '-');
    if (openDocument(getGlossaryConceptPath(cSlug, catSlug))) return;
    setSelectedConceptId(conceptId);
    setInitialTool('concepts');
    setActiveTab('tools');
    setGlossaryCategory(catSlug);
    setGlossaryConceptId(conceptId);
    setGlossarySubConceptId(undefined);
  };

  const handleCompleteChapter = (chapterId: number) => {
    const updated = saveCompletedChapter(chapterId);
    setCompletedChapterIds(updated);
  };

  const handleWorkbenchToolChange = (toolId: TradingToolId | 'overview', customUrl?: string) => {
    const toolPaths: Partial<Record<TradingToolId | 'overview', string>> = {
      overview: '/tools/', concepts: '/tools/glossary/', graph: '/tools/knowledge-graph/',
      dashboard: '/tools/profile/', ict_suite: '/tools/delivery-suite/',
    };
    if (openDocument(customUrl || toolPaths[toolId] || `/tools/${toolId}/`)) return;
    setInitialTool(toolId);
    setActiveTab('tools');
  };

  const handleMasoodSubTabChange = (subTab: 'lectures' | 'animations' | 'bias_calc' | 'rules') => {
    const paths = { lectures: '/masood/', animations: '/masood/animations/', bias_calc: '/masood/bias-calculator/', rules: '/masood/golden-rules/' };
    if (openDocument(paths[subTab])) return;
    setMasoodSubTab(subTab);
    setMasoodLectureId(null);
  };

  const handleMasoodLectureSelect = (lectureId: string | null) => {
    if (openDocument(lectureId ? `/masood/lectures/${lectureId}/` : '/masood/')) return;
    setMasoodLectureId(lectureId);
  };

  if (!routeResolved) return <ViewLoadingFallback />;

  const isShowingWelcome = activeTab === 'welcome';

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-sans selection:bg-brand selection:text-on-brand relative overflow-x-clip">
      <a href="#main-content" className="skip-link">{t("Skip to main content")}</a>
      <div className="site-wash fixed inset-0 pointer-events-none z-0" aria-hidden="true" />

      {preview && <aside className="p-4 text-center border-b border-amber-700/20 bg-white text-sm" role="note">{t("This Urdu edition is being translated and reviewed. It is not the published website. Links to unfinished sections open the English edition.")}</aside>}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (['chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard', 'masterclass', 'ict_suite'].includes(tab)) {
            handleWorkbenchToolChange(tab as TradingToolId);
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
      <main id="main-content" data-home={isShowingWelcome ? "true" : undefined} tabIndex={-1} className="flex-1 max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 space-y-10 sm:space-y-14">

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
          <PageReady /></Suspense>
        )}

        {activeTab === 'articles' && <Suspense fallback={<ViewLoadingFallback />}><ArticlesView slug={withoutLocale(window.location.pathname).split('/').filter(Boolean)[1]} /><PageReady /></Suspense>}
        {activeTab === 'resources' && <Suspense fallback={<ViewLoadingFallback />}><CheatSheetPage/><PageReady/></Suspense>}

        {/* PILLAR 1: OPEN SYLLABUS & CURRICULUM VIEW (All 57 Chapters Unlocked) */}
        {!isShowingWelcome && (activeTab === 'curriculum' || activeTab === 'world_map' || activeTab === 'textbook') && (
          <Suspense fallback={<ViewLoadingFallback />}><CurriculumView
            onSelectChapter={handleSelectChapter}
            onOpenSearch={() => setIsSearchOpen(true)}
          /><PageReady /></Suspense>
        )}

        {/* PILLAR 1 DETAIL: DEDICATED CHAPTER ROOM */}
        {!isShowingWelcome && activeTab === 'chapter_room' && (
          <Suspense fallback={<ViewLoadingFallback />}>
            <ChapterRoom
              chapterId={selectedChapterId}
              onSelectChapter={handleSelectChapter}
              onReturnToMap={() => {
                navigateToTab('curriculum');
              }}
              onCompleteChapter={handleCompleteChapter}
              isCompleted={completedChapterIds.includes(selectedChapterId)}
            />
          <PageReady /></Suspense>
        )}

        {/* PILLAR 2: TRADER ABDULLAH MASOOD ACADEMY (52 MASTERCLASSES & TOOLS) */}
        {!isShowingWelcome && activeTab === 'masood' && (
          <Suspense fallback={<ViewLoadingFallback />}>
            <MasoodAcademyView
              initialSubTab={masoodSubTab}
              initialLectureId={masoodLectureId || undefined}
              onSubTabChange={handleMasoodSubTabChange}
              onLectureSelect={handleMasoodLectureSelect}
            />
          <PageReady /></Suspense>
        )}

        {/* PILLAR 3: TRADING TOOLS WORKBENCH */}
        {!isShowingWelcome && (activeTab === 'tools' || [
          'chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard', 'masterclass', 'ict_suite'
        ].includes(activeTab)) && (
          <Suspense fallback={<ViewLoadingFallback />}>
            <TradingToolsWorkbench
              initialTool={initialTool}
              onToolChange={handleWorkbenchToolChange}
              onSelectConcept={handleSelectConcept}
              glossaryCategory={glossaryCategory}
              glossaryConceptId={glossaryConceptId}
              glossarySubConceptId={glossarySubConceptId}
              masterclassCategory={masterclassCategory}
              masterclassModuleSlug={masterclassModuleSlug}
              chartScenarioSlug={chartScenarioSlug}
              chartStepSlug={chartStepSlug}
              simulatorModelSlug={simulatorModelSlug}
              backtestStrategySlug={backtestStrategySlug}
              journalSectionSlug={journalSectionSlug}
              graphViewMode={graphViewMode}
              graphStep={graphStep}
              graphNodeId={graphNodeId}
              comparisonSlug={comparisonSlug}
              profileSubTab={profileSubTab}
              profileExamSlug={profileExamSlug}
              deliveryModuleSlug={deliveryModuleSlug}
            />
          <PageReady /></Suspense>
        )}

        {/* PILLAR 4: STANDALONE CRAWLABLE LEGAL & POLICY PAGES */}
        {!isShowingWelcome && ['disclaimer', 'privacy', 'terms', 'about', 'contact', 'adsense'].includes(activeTab) && (
          <Suspense fallback={<ViewLoadingFallback />}>
            <LegalPageView
              currentTab={activeTab as LegalTabType}
              onTabChange={navigateToTab}
              onBackToCurriculum={() => navigateToTab('curriculum')}
            />
          <PageReady /></Suspense>
        )}

        {/* 404 NOT FOUND STATE */}
        {!isShowingWelcome && activeTab === 'not_found' && (
          <Suspense fallback={<ViewLoadingFallback />}>
            <NotFoundView
              attemptedPath={attemptedInvalidPath}
              onNavigate={navigateToTab}
              onSelectChapter={handleSelectChapter}
            />
          <PageReady /></Suspense>
        )}

      </main>

      {/* Global Search Modal */}
      {isSearchOpen && <Suspense fallback={null}>
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectConcept={handleSelectConcept}
          onSelectChapter={handleSelectChapter}
        />
      </Suspense>}

      {/* Mentor Tribute Spotlight Modal */}
      {isMentorSpotlightOpen && <Suspense fallback={null}>
        <MentorSpotlight
          isOpen={isMentorSpotlightOpen}
          onClose={() => setIsMentorSpotlightOpen(false)}
          onOpenMasoodAcademy={() => {
            setIsMentorSpotlightOpen(false);
            navigateToTab('masood');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </Suspense>}

      {/* Predikt Editorial Footer */}
      <footer className="studio-footer border-t border-ink/[0.07] bg-canvas/80 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8 mt-auto relative z-10">
        <div className="max-w-[1560px] w-full mx-auto space-y-8">

          {/* Tribute Banner - Sleek Dark Card */}
          <ScrollReveal y={30} duration={0.6}>
            <div className="p-6 sm:p-7 bg-surface border border-ink/[0.08] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 transition-colors hover:border-ink/[0.14]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-ink/[0.04] border border-ink/[0.08] flex items-center justify-center shrink-0 text-negative">
                  <Youtube className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[0.8125rem] font-sans tabular-nums tracking-[0.16em] uppercase text-ink-secondary flex items-center gap-2">
                    <span className="text-teal">{t("MENTORSHIP TRIBUTE")}</span>
                    <span className="text-ink">/</span>
                    <span>{t("TRADER ABDULLAH MASOOD")}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink/90 mt-1 leading-relaxed font-normal">
                    {message('Master educator of ICT & Smart Money Concepts algorithmic delivery. {lectures} independent study guides with original video source links.', { lectures: lectureCount })}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto justify-start md:justify-end">
                <button
                  onClick={() => {
                    navigateToTab('masood');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-predikt-primary text-xs"
                >
                  <Youtube className="w-4 h-4 text-red-700" />
                  <span>{message('Masood Academy ({lectures})', { lectures: lectureCount })}</span>
                </button>
                <button
                  onClick={() => setIsMentorSpotlightOpen(true)}
                  className="btn-predikt-secondary text-xs"
                >{t("View Tribute")}</button>
                <a
                  href="https://www.youtube.com/@TraderAbdullahMasood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-predikt-secondary text-xs"
                >
                  <Youtube className="w-4 h-4 text-red-700" />
                  <span>{t("YouTube Channel")}</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Regulatory Risk Notice Banner */}
          <ScrollReveal y={20} delay={0.05}>
            <div className="p-4 sm:p-5 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 text-ink-secondary text-xs leading-relaxed flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-[0.8125rem] sm:text-xs text-ink-secondary">
                  <strong className="text-amber-700 font-semibold uppercase tracking-wider">{t("Regulatory Risk Disclosure:")}</strong> {t(" Trading foreign exchange, futures, indices, and financial derivatives carries high risk and may not be suitable for all investors. All materials on ")}<strong className="text-ink">learnsmc.xyz</strong>{t(" are strictly for educational and research purposes. Past performance is not indicative of future results.")}
                </p>
              </div>
              <a
                href={href("/disclaimer/")}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('disclaimer');
                }}
                className="text-[0.8125rem] font-sans tabular-nums text-amber-700 hover:text-amber-700 underline shrink-0 whitespace-nowrap self-end md:self-center"
              >{t("Read Full Risk Disclosure →")}</a>
            </div>
          </ScrollReveal>

          {/* Legal Pages & Policy Navigation Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink/[0.06] text-xs font-sans tabular-nums text-ink-muted">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={href("/disclaimer/")}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('disclaimer');
                }}
                className="hover:text-amber-700 transition-colors flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>{t("Risk Disclaimer")}</span>
              </a>

              <a
                href={href("/privacy/")}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('privacy');
                }}
                className="hover:text-teal transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-teal" />
                <span>{t("Privacy Policy")}</span>
              </a>

              <a
                href={href("/terms/")}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('terms');
                }}
                className="hover:text-violet transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-violet" />
                <span>{t("Terms of Service")}</span>
              </a>

              <a
                href={href("/about/")}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('about');
                }}
                className="hover:text-ink transition-colors flex items-center gap-1.5"
              >
                <Building className="w-3.5 h-3.5 text-ink" />
                <span>{t("About & Editorial")}</span>
              </a>

              <a
                href={href("/contact/")}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('contact');
                }}
                className="hover:text-teal transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-teal" />
                <span>{t("Contact")}</span>
              </a>

              <a
                href={href("/adsense/")}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab('adsense');
                }}
                className="text-teal/90 hover:text-teal transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                <span>{t("Advertising information")}</span>
              </a>
            </div>

            <div className="text-[0.8125rem] text-ink-muted flex items-center gap-2">
              <span>{t("Domain:")}</span>
              <a
                href="https://learnsmc.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-secondary hover:text-teal underline"
              >
                learnsmc.xyz
              </a>
            </div>
          </div>

          <ScrollReveal y={15} delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans tabular-nums text-ink-secondary pt-4 border-t border-ink/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <span className="font-medium text-ink">{t("ICT & SMC ACADEMY")}</span>
                <span className="text-ink">|</span>
                <span>{t("OPEN INSTITUTIONAL CURRICULUM")}</span>
              </div>
              <div className="text-ink-muted flex items-center gap-3">
                <span>{chapterCount} {t("CHAPTERS")}</span>
                <span>·</span>
                <span>{lectureCount} {t("LECTURES")}</span>
                <span>·</span>
                <span>{t("LABORATORY")}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>

      {/* Regulatory & Legal Modal (Quick preview or deep study) */}
      {isLegalModalOpen && <Suspense fallback={null}>
        <LegalModal
          isOpen={isLegalModalOpen}
          onClose={() => setIsLegalModalOpen(false)}
          initialTab={legalModalTab}
        />
      </Suspense>}

      <AdsenseLoader />

      {/* Cookie & Privacy Consent Banner (GDPR, UK & AdSense Ready) */}
      <CookieConsentBanner
        onOpenPrivacyPolicy={() => {
          navigateToTab('privacy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default App;
