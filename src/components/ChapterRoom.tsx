import { conciseHeading, studyTopics } from '../utils/searchMetadata';
import { FinancialDisclaimer } from './FinancialDisclaimer';
import { CurriculumReview } from './CurriculumReview';
import { MentorshipLessonNav } from './MentorshipLessonNav';
import { mentorshipTracks, mentorshipLessonPath } from '../data/mentorshipTracks';
import { currentDocumentHref } from '../i18n/navigation';
import { LessonRelatedLinks } from './LessonRelatedLinks';
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Zap, 
  Eye, 
  Compass, 
  ChevronDown,
  Sparkles,
  Share2,
  Check,
  Bookmark,
  BookmarkCheck,
  ShieldAlert,
  Edit3,
  Save,
  AlertTriangle
} from 'lucide-react';
import { textbookChapters } from '../data/chaptersData';
import { getLessonCanonicalUrl } from '../utils/url';
import { quizQuestions } from '../data/quizzesData';
import { InteractiveDiagram } from './InteractiveDiagram';
import { ChapterSection } from '../types';
import { saveQuestionAnswer } from '../utils/academyProgress';
import { BauhausNavScroller } from './BauhausNavScroller';
import { ScrollReveal } from './ScrollReveal';
import { ContextualInternalLinker } from './ContextualInternalLinker';

interface ChapterRoomProps {
  chapterId: number;
  onSelectChapter: (chapterId: number, slug?: string) => void;
  onReturnToMap: () => void;
  onCompleteChapter?: (chapterId: number) => void;
  isCompleted?: boolean;
}

export const ChapterRoom: React.FC<ChapterRoomProps> = ({
  chapterId,
  onSelectChapter: selectFromApp,
  onReturnToMap,
  onCompleteChapter,
  isCompleted = false
}) => {
  const pathSlug = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('mentorship');
  const studyTrack = mentorshipTracks.find(t => t.slug === pathSlug && t.chapterIds.includes(chapterId));
  const orderedChapters = useMemo(() => studyTrack ? studyTrack.chapterIds.map(id => textbookChapters.find(c => c.id === id)).filter(Boolean) : textbookChapters, [studyTrack]);
  const onSelectChapter = (id:number, slug?:string) => {
    const selected = textbookChapters.find(c => c.id === id);
    if (studyTrack && selected && studyTrack.chapterIds.includes(id)) window.location.assign(currentDocumentHref(mentorshipLessonPath(selected.slug, studyTrack.slug)));
    else selectFromApp(id, slug);
  };
  const [activeScene, setActiveScene] = useState<'text' | 'visual' | 'terms' | 'checkpoint' | 'briefing'>('text');
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [expandedSimpler, setExpandedSimpler] = useState<Record<number, boolean>>({});
  const [hasCopiedLink, setHasCopiedLink] = useState<boolean>(false);
  
  // Personal Learning Workspace: Bookmarks & Study Notes (LocalStorage)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userNote, setUserNote] = useState<string>('');
  const [savedNoteStatus, setSavedNoteStatus] = useState<boolean>(false);

  // Instantly reset scroll to top and hydrate bookmarks/notes on chapter load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    try {
      const raw = localStorage.getItem('learnsmc_bookmarked_chapters');
      const bmarks = raw ? JSON.parse(raw) : [];
      setIsBookmarked(Array.isArray(bmarks) && bmarks.includes(chapterId));

      const note = localStorage.getItem(`learnsmc_note_ch_${chapterId}`) || '';
      setUserNote(note);
      setSavedNoteStatus(false);
    } catch {}
  }, [chapterId]);

  const handleToggleBookmark = () => {
    try {
      const raw = localStorage.getItem('learnsmc_bookmarked_chapters');
      let bmarks: number[] = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(bmarks)) bmarks = [];
      if (bmarks.includes(chapterId)) {
        bmarks = bmarks.filter(id => id !== chapterId);
        setIsBookmarked(false);
      } else {
        bmarks.push(chapterId);
        setIsBookmarked(true);
      }
      localStorage.setItem('learnsmc_bookmarked_chapters', JSON.stringify(bmarks));
    } catch {}
  };

  const handleSaveNote = () => {
    try {
      localStorage.setItem(`learnsmc_note_ch_${chapterId}`, userNote);
      setSavedNoteStatus(true);
      setTimeout(() => setSavedNoteStatus(false), 2200);
    } catch {}
  };

  const chapter = useMemo(() => {
    return textbookChapters.find(c => c.id === chapterId) || textbookChapters[0];
  }, [chapterId]);

  const handleCopyChapterLink = () => {
    const url = getLessonCanonicalUrl(chapter.slug);
    navigator.clipboard.writeText(url).then(() => {
      setHasCopiedLink(true);
      setTimeout(() => setHasCopiedLink(false), 2000);
    }).catch(() => {});
  };

  // Chapter boundary helpers
  const prevChapter = useMemo(() => {
    const idx = orderedChapters.findIndex(c => c.id === chapter.id);
    return idx > 0 ? orderedChapters[idx - 1] : null;
  }, [chapter, orderedChapters]);

  const nextChapter = useMemo(() => {
    const idx = orderedChapters.findIndex(c => c.id === chapter.id);
    return idx < orderedChapters.length - 1 ? orderedChapters[idx + 1] : null;
  }, [chapter, orderedChapters]);

  // Pick suitable diagram type
  const primaryDiagramType = useMemo((): 'liquidity_sweep' | 'fvg_formation' | 'order_block' | 'breaker_block' | 'mss_sequence' | 'po3_amd' | 'top_down_matrix' | 'session_timeline' | 'nested_structure' => {
    const title = chapter.title.toLowerCase();
    const slug = chapter.slug?.toLowerCase() || '';

    if (title.includes('fvg') || title.includes('fair value gap') || slug.includes('fair-value-gap')) {
      return 'fvg_formation';
    }
    if (title.includes('order block') || slug.includes('order-block')) {
      return 'order_block';
    }
    if (title.includes('breaker') || slug.includes('breaker')) {
      return 'breaker_block';
    }
    if (title.includes('liquidity') || slug.includes('liquidity') || title.includes('sweep')) {
      return 'liquidity_sweep';
    }
    if (title.includes('bos') || title.includes('mss') || title.includes('market structure') || title.includes('shift')) {
      return 'mss_sequence';
    }
    if (title.includes('killzone') || title.includes('session') || title.includes('time')) {
      return 'session_timeline';
    }
    if (title.includes('optimal trade entry') || title.includes('ote') || title.includes('fibonacci')) {
      return 'top_down_matrix';
    }
    if (title.includes('discount') || title.includes('premium')) {
      return 'nested_structure';
    }
    if (title.includes('po3') || title.includes('amd') || title.includes('accumulation')) {
      return 'po3_amd';
    }
    return 'liquidity_sweep';
  }, [chapter]);

  // Quiz questions matching this chapter
  const matchingQuizQuestions = useMemo(() => {
    const slug = chapter.slug?.toLowerCase() || '';
    const title = chapter.title.toLowerCase();

    return quizQuestions.filter(q => {
      const cid = q.conceptId.toLowerCase();
      if (title.includes('order block') && cid.includes('order_block')) return true;
      if (title.includes('breaker') && cid.includes('breaker')) return true;
      if (title.includes('fair value') && cid.includes('fair_value_gap')) return true;
      if (title.includes('liquidity') && (cid.includes('liquidity') || cid.includes('sweep'))) return true;
      if (title.includes('market structure') && (cid.includes('mss') || cid.includes('market_structure'))) return true;
      if (title.includes('ote') && cid.includes('optimal_trade_entry')) return true;
      if (slug.includes('fvg') && cid.includes('fair_value_gap')) return true;
      return false;
    }).slice(0, 3);
  }, [chapter]);

  const handleToggleRevealQuestion = (qIndex: number) => {
    setRevealedQuestions(prev => ({
      ...prev,
      [qIndex]: !prev[qIndex]
    }));
  };

  const handleToggleSimpler = (sIdx: number) => {
    setExpandedSimpler(prev => ({
      ...prev,
      [sIdx]: !prev[sIdx]
    }));
  };

  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    setSelectedQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
    saveQuestionAnswer(questionId, optionIdx);
  };

  const scenes = [
    { id: 'text', label: '1. Textbook Sections', icon: BookOpen },
    { id: 'visual', label: '2. Interactive Diagram', icon: Eye },
    { id: 'terms', label: '3. Key Terms', icon: Layers },
    { id: 'checkpoint', label: '4. Practice & Quiz', icon: Award },
    { id: 'briefing', label: '5. Summary Briefing', icon: Compass },
  ] as const;

  return (
    <div className="space-y-8 sm:space-y-12 pb-24 text-ink">
      <MentorshipLessonNav chapterId={chapter.id} />
      
      {/* Top Minimal Navigation Bar */}
      <ScrollReveal y={15} duration={0.4}>
        <div className="bg-surface border border-ink/[0.08] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex min-w-0 w-full xl:w-auto xl:flex-1 items-center gap-3">
            <button
              onClick={onReturnToMap}
              className="btn-predikt-secondary shrink-0 text-xs py-1.5 px-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Chapters</span>
            </button>

            {/* Quick jump dropdown */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="text-[0.8125rem] font-sans tabular-nums text-ink-muted uppercase hidden sm:inline">JUMP:</span>
              <select
                value={chapter.id}
                onChange={(e) => {
                  const targetId = Number(e.target.value);
                  const targetCh = textbookChapters.find(c => c.id === targetId);
                  onSelectChapter(targetId, targetCh?.slug);
                }}
                className="min-w-0 w-full flex-1 px-3 py-1.5 bg-surface-muted border border-ink/[0.08] rounded-lg text-xs font-sans tabular-nums text-ink focus:outline-none focus:border-brand/60 cursor-pointer"
              >
                {textbookChapters.map((ch) => (
                  <option key={ch.id} value={ch.id} className="bg-surface-muted text-ink">
                    CH {ch.id < 10 ? `0${ch.id}` : ch.id}: {ch.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prev / Next chapter controls & Share URL */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleBookmark}
              className={`btn-predikt-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 transition-colors ${
                isBookmarked 
                  ? 'text-amber-700 border-amber-400/40 bg-amber-400/10'
                  : 'text-ink-secondary hover:text-ink'
              }`}
              title={isBookmarked ? 'Remove chapter from bookmarks' : 'Bookmark this chapter for quick study'}
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-amber-700 hidden md:inline">Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Bookmark</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyChapterLink}
              className="btn-predikt-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 text-ink-secondary hover:text-teal"
              title="Copy direct permanent URL for this chapter"
            >
              {hasCopiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal" />
                  <span className="text-teal">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Share</span>
                </>
              )}
            </button>

            {prevChapter && (
              <button
                onClick={() => onSelectChapter(prevChapter.id, prevChapter.slug)}
                className="btn-predikt-secondary text-xs py-1.5 px-3"
                title={`Previous: ${prevChapter.title}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>
            )}

            <div className="px-3 py-1.5 rounded-lg bg-ink/[0.04] border border-ink/[0.08] text-xs font-sans tabular-nums text-ink-secondary">
              <bdi dir="ltr">{orderedChapters.findIndex(c => c.id === chapter.id) + 1} / {orderedChapters.length}</bdi>
            </div>

            {nextChapter && (
              <button
                onClick={() => onSelectChapter(nextChapter.id, nextChapter.slug)}
                className="btn-predikt-primary text-xs py-1.5 px-3"
                title={`Next: ${nextChapter.title}`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Main Chapter Header Card */}
      <ScrollReveal y={15} duration={0.4} immediate={true}>
        <section className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-10 space-y-6 relative overflow-hidden">
          
          {/* Top Meta Bar & Editorial Credentials (E-E-A-T & AdSense Compliance) */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans tabular-nums border-b border-ink/[0.06] pb-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-semibold text-brand tracking-wider">
                CHAPTER {chapter.id < 10 ? `0${chapter.id}` : chapter.id}
              </span>
              <span className="text-ink">·</span>
              <span className="text-ink-secondary uppercase tracking-wider">
                {chapter.part}
              </span>
              <span className="text-ink">·</span>
              <span className="text-teal uppercase tracking-wider">
                LEVEL {chapter.level}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[0.8125rem] text-ink-muted flex-wrap">
              <span>Author: Muhammad Umer Ijaz</span>
              <span className="text-ink">·</span>
              <a href="/contact/" className="underline">Suggest a correction</a>
              <span className="text-ink">·</span>
              <span className="text-positive flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <a href="/about/#author" className="underline">Author and editorial policy</a>
              </span>
              <span className="text-ink">·</span>
              <a href="#curriculum-review-heading" className="underline">Sources and interpretation</a>
            </div>
          </div>

          {/* Chapter Title & Inscription */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink leading-tight">
              {studyTopics[`/learn/${chapter.slug}/`] || conciseHeading(chapter.title)}
            </h1>

            {/* Principle callout */}
            <div className="p-4 sm:p-5 rounded-xl bg-ink/[0.02] border-l-2 border-brand space-y-1">
              <div className="text-[0.8125rem] font-sans tabular-nums text-brand uppercase tracking-[0.16em]">
                LEARNSMC STUDY NOTE
              </div>
              <p className="text-xs sm:text-sm text-ink/90 italic font-normal leading-relaxed">
                {chapter.quote}
              </p>
            </div>
          </div>

          {/* Scene Tabs Selector */}
          <div className="pt-4 border-t border-ink/[0.07]">
            <BauhausNavScroller innerClassName="gap-2 pb-1" showArrowsAlways={false}>
              {scenes.map((scene) => {
                const Icon = scene.icon;
                const isActive = activeScene === scene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => setActiveScene(scene.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-tight flex items-center gap-2 shrink-0 border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-ink/[0.12] text-ink border-ink/20'
                        : 'bg-ink/[0.02] text-ink-secondary hover:text-ink border-ink/[0.06] hover:bg-ink/[0.05]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{scene.label}</span>
                  </button>
                );
              })}
            </BauhausNavScroller>
          </div>
        </section>
      </ScrollReveal>

      {/* DYNAMIC SCENE CONTENT */}

      {/* SCENE 1: FULL CODIFIED CURRICULUM SECTIONS */}
      {activeScene === 'text' && (
        <section className="space-y-6 animate-fade-in">
          <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-10 space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-ink/[0.07]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  <h2 className="text-base sm:text-lg font-semibold uppercase tracking-tight text-ink">
                    TEXTBOOK SECTIONS ({chapter.sections.length} PARTS)
                  </h2>
                </div>
                <span className="text-xs font-sans tabular-nums text-ink-muted uppercase">INDEPENDENT STUDY NOTES</span>
              </div>

              {/* Sections List */}
              <div className="space-y-8">
                {chapter.sections.map((sec: ChapterSection, sIdx: number) => {
                  const isSimplerOpen = expandedSimpler[sIdx];

                  return (
                    <article 
                      key={sec.id || sIdx}
                      className="p-6 sm:p-7 rounded-xl bg-ink/[0.02] border border-ink/[0.06] space-y-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-ink/[0.04] border border-ink/[0.08] text-brand flex items-center justify-center font-sans tabular-nums text-xs font-semibold">
                          0{sIdx + 1}
                        </span>
                        <h3 className="text-lg sm:text-xl font-semibold text-ink tracking-tight">
                          {sec.title}
                        </h3>
                      </div>

                      {/* Section Content with Automatic Contextual Internal Link Mesh */}
                      <div className="text-base sm:text-lg text-ink-secondary leading-relaxed font-normal whitespace-pre-line space-y-4">
                        <ContextualInternalLinker text={sec.content} />
                      </div>

                      {/* "Explain Simpler" Component */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleToggleSimpler(sIdx)}
                          className="flex items-center gap-2 text-xs font-sans tabular-nums text-teal hover:text-ink transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-teal" />
                          <span className="uppercase tracking-wider">
                            {isSimplerOpen ? 'Collapse Simplified View' : 'Explain Simpler'}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isSimplerOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSimplerOpen && (
                          <div className="mt-3 p-4 rounded-xl bg-brand/10 border border-brand/20 text-xs sm:text-sm text-ink space-y-1.5 animate-fadeIn">
                            <div className="text-[0.8125rem] font-sans tabular-nums uppercase tracking-[0.16em] text-teal">
                              SIMPLIFIED EXPLANATION
                            </div>
                            <p className="leading-relaxed font-normal text-ink/90">
                              Think of this simply: {sec.keyTakeaway || 'Identify what the chart shows, state the rule you are testing, and record what would contradict your interpretation.'}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Key Takeaway Banner */}
                      {sec.keyTakeaway && (
                        <div className="p-4 rounded-xl bg-ink/[0.03] border-l-2 border-teal flex items-start gap-3 mt-4">
                          <Zap className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[0.8125rem] font-sans tabular-nums text-teal uppercase tracking-[0.16em]">
                              INSTITUTIONAL KEY TAKEAWAY
                            </div>
                            <p className="text-xs sm:text-sm font-normal text-ink mt-1 leading-relaxed">
                              {sec.keyTakeaway}
                            </p>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* INSTITUTIONAL INVALIDATION & RISK ARCHITECTURE (Curriculum Rigor) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-ink/[0.08]">
                {/* Invalidation Rules */}
                <div className="bg-ink/[0.02] border border-ink/[0.07] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-sans tabular-nums uppercase tracking-wider text-rose-700">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Explicit Invalidation &amp; Failure Rules</span>
                  </div>
                  <h4 className="text-sm font-semibold text-ink">When is This Concept Violated?</h4>
                  <ul className="text-xs text-ink-secondary space-y-2 list-disc pl-4 leading-relaxed">
                    <li><strong className="text-ink">Candle Body Violations:</strong> Define whether a wick, midpoint close or full-zone close invalidates your chosen setup. These are different rules; no single rule applies to every chapter.</li>
                    <li><strong className="text-ink">Lack of Displacement:</strong> Define displacement relative to the instrument and timeframe before replay; slow movement alone does not identify institutional intent.</li>
                    <li><strong className="text-ink">Time Window Expiration:</strong> If your study uses an expiry time, state it in advance and cancel unfilled orders under that rule. A session boundary is not universal invalidation.</li>
                  </ul>
                  <div className="text-[0.8125rem] font-sans tabular-nums text-amber-700 bg-amber-500/10 border border-amber-500/20 rounded p-2.5">
                    RULE: Follow the invalidation written before entry; a stopped trade does not by itself disprove an entire framework.
                  </div>
                </div>

                {/* Risk Management & Execution Protocol */}
                <div className="bg-ink/[0.02] border border-ink/[0.07] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-sans tabular-nums uppercase tracking-wider text-teal">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Risk Management &amp; Sizing Protocols</span>
                  </div>
                  <h4 className="text-sm font-semibold text-ink">Capital Preservation Architecture</h4>
                  <ul className="text-xs text-ink-secondary space-y-2 list-disc pl-4 leading-relaxed">
                    <li><strong className="text-ink">Strict Capital Cap:</strong> Choose a risk limit suitable for your circumstances. Include correlated positions, contract increments and possible losses beyond a planned stop; no percentage is universally safe.</li>
                    <li><strong className="text-ink">Mechanical Stop-Loss:</strong> Connect the planned stop to a stated invalidation and instrument rules. A stop-market order may slip; a stop-limit order may remain unfilled.</li>
                    <li><strong className="text-ink">Asymmetric Payoff:</strong> Planned reward-to-risk alone does not establish positive expectancy. Evaluate win frequency, average realized wins and losses, and costs together.</li>
                  </ul>
                  <div className="text-[0.8125rem] font-sans tabular-nums text-teal/90 bg-teal/10 border border-teal/20 rounded p-2.5">
                    PRINCIPLE: Trade management and survival precede profit. Invalidation must be predefined before entry.
                  </div>
                </div>
              </div>

              {/* PERSONAL STUDY NOTES & LEARNING WORKSPACE */}
              <div className="bg-surface-raised border border-ink/[0.08] rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-sans tabular-nums uppercase tracking-wider text-brand">
                    <Edit3 className="w-4 h-4" />
                    <span>Personal Learning Notes · Chapter {chapter.id}</span>
                  </div>
                  <button
                    onClick={handleSaveNote}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand hover:bg-brand-hover text-on-brand text-xs font-sans tabular-nums font-medium transition-colors shadow-sm on-accent"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savedNoteStatus ? 'Notes Saved!' : 'Save Notes'}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Record your personal tape observations, chart invalidation takeaways, and execution reflections for this chapter..."
                  className="w-full bg-surface border border-ink/[0.08] rounded-lg p-3 text-xs text-ink placeholder-[#5f7064] focus:border-brand focus:outline-none resize-none leading-relaxed"
                />
                <div className="flex items-center justify-between text-[0.8125rem] text-ink-muted font-sans tabular-nums">
                  <span>Saved locally in browser storage · 100% private</span>
                  {userNote.length > 0 && <span>{userNote.length} characters</span>}
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.07]">
                <button
                  onClick={() => setActiveScene('visual')}
                  className="btn-predikt-primary text-xs"
                >
                  <span>View Interactive Diagram</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveScene('terms')}
                  className="btn-predikt-secondary text-xs"
                >
                  <span>Study Key Terms ({chapter.keyTerms.length})</span>
                </button>
              </div>
            </div>
          </section>
      )}

      {/* SCENE 2: INTERACTIVE VISUAL STAGE */}
      {activeScene === 'visual' && (
        <section className="space-y-6 animate-fade-in">
          <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-ink/[0.07]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  <h2 className="text-base sm:text-lg font-semibold uppercase tracking-tight text-ink">
                    INTERACTIVE DIAGRAM SIMULATOR
                  </h2>
                </div>
                <span className="text-xs font-sans tabular-nums uppercase bg-ink/[0.04] text-ink-secondary px-2.5 py-1 rounded-md border border-ink/[0.08]">
                  {primaryDiagramType.replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-base text-ink-secondary leading-relaxed">
                Step through the sequence of algorithmic delivery, observe liquidity consumption, and study how institutional order flow prints onto candles.
              </p>

              {/* Embedded Diagram */}
              <div className="rounded-xl overflow-hidden border border-ink/[0.08] bg-surface-muted p-2">
                <InteractiveDiagram 
                  type={primaryDiagramType} 
                  title={chapter.title} 
                  isInteractive={true} 
                />
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.07]">
                <button
                  onClick={() => setActiveScene('text')}
                  className="btn-predikt-secondary text-xs"
                >
                  ← Back to Sections
                </button>

                <button
                  onClick={() => setActiveScene('terms')}
                  className="btn-predikt-primary text-xs"
                >
                  <span>Study Key Terms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>
      )}

      {/* SCENE 3: KEY TERMS & GLOSSARY */}
      {activeScene === 'terms' && (
        <section className="space-y-6 animate-fade-in">
          <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-ink/[0.07]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal" />
                  <h2 className="text-base sm:text-lg font-semibold uppercase tracking-tight text-ink">
                    KEY INSTITUTIONAL TERMS ({chapter.keyTerms.length} DEFINITIONS)
                  </h2>
                </div>
                <span className="text-xs font-sans tabular-nums text-ink-muted uppercase">CORE VOCABULARY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {chapter.keyTerms.map((item, tIdx) => (
                  <div 
                    key={tIdx}
                    className="p-5 rounded-xl bg-ink/[0.02] border border-ink/[0.07] space-y-2 hover:border-ink/[0.14] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-sans tabular-nums font-medium text-teal bg-teal/10 px-2.5 py-0.5 rounded border border-teal/20">
                        {item.term}
                      </span>
                      <span className="text-xs font-sans tabular-nums text-ink-muted">#{tIdx + 1}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-ink-secondary font-normal leading-relaxed pt-1">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.07]">
                <button
                  onClick={() => setActiveScene('text')}
                  className="btn-predikt-secondary text-xs"
                >
                  ← Back to Textbook
                </button>

                <button
                  onClick={() => setActiveScene('checkpoint')}
                  className="btn-predikt-primary text-xs"
                >
                  <span>Practice Checkpoint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>
      )}

      {/* SCENE 4: PRACTICE CHECKPOINT & QUESTIONS */}
      {activeScene === 'checkpoint' && (
        <section className="space-y-6 animate-fade-in">
          <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-10 space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-ink/[0.07]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  <h2 className="text-base sm:text-lg font-semibold uppercase tracking-tight text-ink">
                    UNDERSTANDING CHECKPOINT &amp; PRACTICE
                  </h2>
                </div>
                <span className="text-xs font-sans tabular-nums text-ink-muted uppercase">ACTIVE RECALL</span>
              </div>

              {/* Diagnostic Multiple Choice Check */}
              {matchingQuizQuestions.length > 0 && (
                <div className="space-y-6">
                  <div className="text-xs font-sans tabular-nums uppercase tracking-[0.16em] text-ink-secondary pb-1 border-b border-ink/[0.06]">
                    MULTIPLE-CHOICE DIAGNOSTIC QUESTIONS ({matchingQuizQuestions.length})
                  </div>

                  <div className="space-y-6">
                    {matchingQuizQuestions.map((quiz, qIdx) => {
                      const selectedOpt = selectedQuizAnswers[quiz.id];
                      const isAnswered = selectedOpt !== undefined;
                      const isCorrect = selectedOpt === quiz.correctIndex;

                      return (
                        <div 
                          key={quiz.id}
                          className="p-6 rounded-xl bg-ink/[0.02] border border-ink/[0.07] space-y-4"
                        >
                          <div className="text-sm sm:text-base font-medium text-ink">
                            0{qIdx + 1}. {quiz.question}
                          </div>

                          <div className="space-y-2 pt-1">
                            {quiz.options.map((opt, oIdx) => {
                              const isThisSelected = selectedOpt === oIdx;
                              const isThisCorrect = quiz.correctIndex === oIdx;

                              let optClass = 'bg-ink/[0.02] hover:bg-ink/[0.05] border-ink/[0.08] text-ink-secondary hover:text-ink';
                              if (isAnswered) {
                                if (isThisCorrect) {
                                  optClass = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 font-medium';
                                } else if (isThisSelected && !isCorrect) {
                                  optClass = 'bg-rose-500/10 border-rose-500/40 text-rose-700 font-medium';
                                } else {
                                  optClass = 'bg-ink/[0.01] border-ink/[0.04] text-ink-muted opacity-50';
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleSelectQuizOption(quiz.id, oIdx)}
                                  className={`w-full p-3.5 rounded-lg text-left text-xs sm:text-sm border transition-all flex items-center justify-between gap-3 cursor-pointer ${optClass}`}
                                >
                                  <span>{opt}</span>
                                  {isAnswered && isThisCorrect && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Inline Explanation */}
                          {isAnswered && (
                            <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                              isCorrect 
                                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-700'
                                : 'bg-ink/[0.03] border-ink/[0.08] text-ink-secondary'
                            }`}>
                              <strong className="text-ink">INSTITUTIONAL ANALYSIS:</strong> {quiz.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Codified Practice Questions */}
              <div className="space-y-4 pt-4 border-t border-ink/[0.07]">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-sans tabular-nums uppercase tracking-[0.16em] text-ink-secondary">
                    CODIFIED PRACTICE QUESTIONS ({chapter.practiceQuestions.length})
                  </div>
                  <span className="text-xs font-sans tabular-nums text-ink-muted uppercase">CLICK TO REVEAL</span>
                </div>

                <div className="space-y-3">
                  {chapter.practiceQuestions.map((question, qIdx) => {
                    const isRevealed = revealedQuestions[qIdx];
                    return (
                      <div 
                        key={qIdx}
                        className="rounded-xl border border-ink/[0.07] overflow-hidden bg-ink/[0.02]"
                      >
                        {/* Header */}
                        <button
                          onClick={() => handleToggleRevealQuestion(qIdx)}
                          className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 transition-colors cursor-pointer hover:bg-ink/[0.03]"
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-md bg-ink/[0.04] border border-ink/[0.08] flex items-center justify-center font-sans tabular-nums text-xs font-semibold text-brand shrink-0 mt-0.5">
                              Q{qIdx + 1}
                            </span>
                            <p className="text-xs sm:text-sm font-medium text-ink">
                              {question}
                            </p>
                          </div>

                          <ChevronDown className={`w-4 h-4 text-ink-secondary shrink-0 transition-transform duration-200 ${
                            isRevealed ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Expanded Explanation */}
                        {isRevealed && (
                          <div className="p-4 sm:p-5 bg-ink/[0.01] border-t border-ink/[0.06] text-xs sm:text-sm text-ink-secondary space-y-2">
                            <div className="font-sans tabular-nums text-[0.8125rem] uppercase text-teal tracking-[0.16em]">
                              STUDY PROMPT
                            </div>
                            <p className="leading-relaxed font-normal">
                              Write an answer using the chapter’s definitions. Separate what is visible on the chart from what you infer, state any missing evidence, and describe an example that would contradict your interpretation.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Chapter CTA */}
              <div className="pt-6 border-t border-ink/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-sans tabular-nums text-ink-secondary uppercase tracking-wider">
                  CHAPTER COMPLETED · READY TO ADVANCE?
                </div>

                {nextChapter ? (
                  <button
                    onClick={() => onSelectChapter(nextChapter.id, nextChapter.slug)}
                    className="btn-predikt-primary text-xs"
                  >
                    <span>Advance to CH {nextChapter.id}: {nextChapter.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onReturnToMap}
                    className="btn-predikt-primary text-xs"
                  >
                    <span>Return to Full Syllabus</span>
                  </button>
                )}
              </div>

            </div>
          </section>
      )}

      {/* SCENE 5: SUMMARY BRIEFING */}
      {activeScene === 'briefing' && (
        <section className="space-y-6 animate-fade-in">
          <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-10 space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-ink/[0.07]">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <h2 className="text-base sm:text-lg font-semibold uppercase tracking-tight text-ink">
                  EXECUTIVE CHAPTER SUMMARY
                </h2>
              </div>

              <div className="space-y-3">
                {chapter.summary.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3 p-4 rounded-xl bg-ink/[0.02] border border-ink/[0.06]">
                    <span className="w-6 h-6 rounded-md bg-ink/[0.04] border border-ink/[0.08] text-brand font-sans tabular-nums text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      0{pIdx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-ink/90 leading-relaxed font-normal">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-ink/[0.07]">
                <button
                  onClick={() => setActiveScene('text')}
                  className="btn-predikt-primary text-xs"
                >
                  <span>Read Full Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>
      )}

      {/* Bottom Minimal Action Bar */}
      <ScrollReveal y={15}>
        <div className="p-4 rounded-xl bg-surface border border-ink/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-ink-muted font-sans tabular-nums uppercase">CURRENT:</span>
            <span className="font-medium text-ink tracking-tight">
              CH {chapter.id}: {chapter.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToMap}
              className="btn-predikt-secondary text-xs py-1.5 px-3"
            >
              All Chapters
            </button>

            {nextChapter && (
              <button
                onClick={() => onSelectChapter(nextChapter.id, nextChapter.slug)}
                className="btn-predikt-primary text-xs py-1.5 px-3"
              >
                <span>Next (CH {nextChapter.id})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </ScrollReveal>

      {onCompleteChapter && <div className="mentorship-read-action"><button className="btn-predikt-secondary" disabled={isCompleted} onClick={() => onCompleteChapter(chapter.id)}>{isCompleted ? 'Note marked as read' : 'Mark this note as read'}</button><p>Reading progress is a personal checklist, not a trading qualification.</p></div>}
      <CurriculumReview chapter={chapter} />
      <LessonRelatedLinks chapterId={chapter.id} />
      <FinancialDisclaimer />
    </div>
  );
};

export default ChapterRoom;
