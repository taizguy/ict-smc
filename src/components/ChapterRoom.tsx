import React, { useState, useMemo } from 'react';
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
  Sparkles
} from 'lucide-react';
import { textbookChapters } from '../data/chaptersData';
import { quizQuestions } from '../data/quizzesData';
import { InteractiveDiagram } from './InteractiveDiagram';
import { ChapterSection } from '../types';
import { saveQuestionAnswer } from '../utils/academyProgress';
import { BauhausNavScroller } from './BauhausNavScroller';
import { ScrollReveal } from './ScrollReveal';

interface ChapterRoomProps {
  chapterId: number;
  onSelectChapter: (chapterId: number) => void;
  onReturnToMap: () => void;
  onCompleteChapter?: (chapterId: number) => void;
  isCompleted?: boolean;
}

export const ChapterRoom: React.FC<ChapterRoomProps> = ({
  chapterId,
  onSelectChapter,
  onReturnToMap
}) => {
  const [activeScene, setActiveScene] = useState<'text' | 'visual' | 'terms' | 'checkpoint' | 'briefing'>('text');
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [expandedSimpler, setExpandedSimpler] = useState<Record<number, boolean>>({});

  const chapter = useMemo(() => {
    return textbookChapters.find(c => c.id === chapterId) || textbookChapters[0];
  }, [chapterId]);

  // Chapter boundary helpers
  const prevChapter = useMemo(() => {
    const idx = textbookChapters.findIndex(c => c.id === chapter.id);
    return idx > 0 ? textbookChapters[idx - 1] : null;
  }, [chapter]);

  const nextChapter = useMemo(() => {
    const idx = textbookChapters.findIndex(c => c.id === chapter.id);
    return idx < textbookChapters.length - 1 ? textbookChapters[idx + 1] : null;
  }, [chapter]);

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
    <div className="space-y-8 sm:space-y-12 pb-24 text-[#F5F7FA]">
      
      {/* Top Minimal Navigation Bar */}
      <ScrollReveal y={15} duration={0.4}>
        <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToMap}
              className="btn-predikt-secondary text-xs py-1.5 px-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Chapters</span>
            </button>

            {/* Quick jump dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#656B78] uppercase hidden sm:inline">JUMP:</span>
              <select
                value={chapter.id}
                onChange={(e) => onSelectChapter(Number(e.target.value))}
                className="px-3 py-1.5 bg-[#0C0E13] border border-white/[0.08] rounded-lg text-xs font-mono text-[#F5F7FA] focus:outline-none focus:border-[#5865FF]/60 cursor-pointer"
              >
                {textbookChapters.map((ch) => (
                  <option key={ch.id} value={ch.id} className="bg-[#0C0E13] text-[#F5F7FA]">
                    CH {ch.id < 10 ? `0${ch.id}` : ch.id}: {ch.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prev / Next chapter controls */}
          <div className="flex items-center gap-2">
            {prevChapter && (
              <button
                onClick={() => onSelectChapter(prevChapter.id)}
                className="btn-predikt-secondary text-xs py-1.5 px-3"
                title={`Previous: ${prevChapter.title}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>
            )}

            <div className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#9BA1AE]">
              {chapter.id} / {textbookChapters.length}
            </div>

            {nextChapter && (
              <button
                onClick={() => onSelectChapter(nextChapter.id)}
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
      <ScrollReveal y={25} duration={0.6} delay={0.05}>
        <section className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-10 space-y-6 relative overflow-hidden">
          
          {/* Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-semibold text-[#5865FF] tracking-wider">
                CHAPTER {chapter.id < 10 ? `0${chapter.id}` : chapter.id}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs font-mono text-[#9BA1AE] uppercase tracking-wider">
                {chapter.part}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs font-mono text-[#55E6D1] uppercase tracking-wider">
                LEVEL {chapter.level}
              </span>
            </div>
          </div>

          {/* Chapter Title & Inscription */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F5F7FA] leading-tight">
              {chapter.title}
            </h1>

            {/* Principle callout */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border-l-2 border-[#5865FF] space-y-1">
              <div className="text-[10px] font-mono text-[#5865FF] uppercase tracking-[0.16em]">
                INSTITUTIONAL PRINCIPLE
              </div>
              <p className="text-xs sm:text-sm text-[#F5F7FA]/90 italic font-normal leading-relaxed">
                "{chapter.quote}"
              </p>
            </div>
          </div>

          {/* Scene Tabs Selector */}
          <div className="pt-4 border-t border-white/[0.07]">
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
                        ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                        : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
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
        <ScrollReveal y={25}>
          <section className="space-y-6">
            <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-10 space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.07]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
                  <h2 className="text-base sm:text-lg font-semibold uppercase tracking-tight text-[#F5F7FA]">
                    TEXTBOOK SECTIONS ({chapter.sections.length} PARTS)
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#656B78] uppercase">AUTHENTIC MATERIAL</span>
              </div>

              {/* Sections List */}
              <div className="space-y-8">
                {chapter.sections.map((sec: ChapterSection, sIdx: number) => {
                  const isSimplerOpen = expandedSimpler[sIdx];

                  return (
                    <article 
                      key={sec.id || sIdx}
                      className="p-6 sm:p-7 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#5865FF] flex items-center justify-center font-mono text-xs font-semibold">
                          0{sIdx + 1}
                        </span>
                        <h3 className="text-lg sm:text-xl font-semibold text-[#F5F7FA] tracking-tight">
                          {sec.title}
                        </h3>
                      </div>

                      {/* Section Content */}
                      <div className="text-sm sm:text-base text-[#9BA1AE] leading-relaxed font-normal whitespace-pre-line space-y-4">
                        {sec.content}
                      </div>

                      {/* "Explain Simpler" Component */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleToggleSimpler(sIdx)}
                          className="flex items-center gap-2 text-xs font-mono text-[#55E6D1] hover:text-white transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#55E6D1]" />
                          <span className="uppercase tracking-wider">
                            {isSimplerOpen ? 'Collapse Simplified View' : 'Explain Simpler'}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isSimplerOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSimplerOpen && (
                          <div className="mt-3 p-4 rounded-xl bg-[#5865FF]/10 border border-[#5865FF]/20 text-xs sm:text-sm text-[#F5F7FA] space-y-1.5 animate-fadeIn">
                            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#55E6D1]">
                              SIMPLIFIED EXPLANATION
                            </div>
                            <p className="leading-relaxed font-light text-[#F5F7FA]/90">
                              Think of this simply: {sec.keyTakeaway || "Smart money waits for the crowd's stop orders to cluster, sweeps them for execution fuel, and then triggers rapid price movement in the real intended direction."}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Key Takeaway Banner */}
                      {sec.keyTakeaway && (
                        <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-[#55E6D1] flex items-start gap-3 mt-4">
                          <Zap className="w-4 h-4 text-[#55E6D1] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[10px] font-mono text-[#55E6D1] uppercase tracking-[0.16em]">
                              INSTITUTIONAL KEY TAKEAWAY
                            </div>
                            <p className="text-xs sm:text-sm font-normal text-[#F5F7FA] mt-1 leading-relaxed">
                              {sec.keyTakeaway}
                            </p>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07]">
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
        </ScrollReveal>
      )}

      {/* SCENE 2: INTERACTIVE VISUAL STAGE */}
      {activeScene === 'visual' && (
        <ScrollReveal y={25}>
          <section className="space-y-6">
            <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.07]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
                  <h2 className="text-base sm:text-lg font-semibold uppercase tracking-tight text-[#F5F7FA]">
                    INTERACTIVE DIAGRAM SIMULATOR
                  </h2>
                </div>
                <span className="text-xs font-mono uppercase bg-white/[0.04] text-[#9BA1AE] px-2.5 py-1 rounded-md border border-white/[0.08]">
                  {primaryDiagramType.replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed">
                Step through the sequence of algorithmic delivery, observe liquidity consumption, and study how institutional order flow prints onto candles.
              </p>

              {/* Embedded Diagram */}
              <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0C0E13] p-2">
                <InteractiveDiagram 
                  type={primaryDiagramType} 
                  title={chapter.title} 
                  isInteractive={true} 
                />
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07]">
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
        </ScrollReveal>
      )}

      {/* SCENE 3: KEY TERMS & GLOSSARY */}
      {activeScene === 'terms' && (
        <ScrollReveal y={25}>
          <section className="space-y-6">
            <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.07]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#55E6D1]" />
                  <h2 className="text-base sm:text-lg font-semibold uppercase tracking-tight text-[#F5F7FA]">
                    KEY INSTITUTIONAL TERMS ({chapter.keyTerms.length} DEFINITIONS)
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#656B78] uppercase">CORE VOCABULARY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {chapter.keyTerms.map((item, tIdx) => (
                  <div 
                    key={tIdx}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-2 hover:border-white/[0.14] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-medium text-[#55E6D1] bg-[#55E6D1]/10 px-2.5 py-0.5 rounded border border-[#55E6D1]/20">
                        {item.term}
                      </span>
                      <span className="text-xs font-mono text-[#656B78]">#{tIdx + 1}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#9BA1AE] font-normal leading-relaxed pt-1">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07]">
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
        </ScrollReveal>
      )}

      {/* SCENE 4: PRACTICE CHECKPOINT & QUESTIONS */}
      {activeScene === 'checkpoint' && (
        <ScrollReveal y={25}>
          <section className="space-y-6">
            <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-10 space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.07]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
                  <h2 className="text-base sm:text-lg font-semibold uppercase tracking-tight text-[#F5F7FA]">
                    UNDERSTANDING CHECKPOINT &amp; PRACTICE
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#656B78] uppercase">ACTIVE RECALL</span>
              </div>

              {/* Diagnostic Multiple Choice Check */}
              {matchingQuizQuestions.length > 0 && (
                <div className="space-y-6">
                  <div className="text-xs font-mono uppercase tracking-[0.16em] text-[#9BA1AE] pb-1 border-b border-white/[0.06]">
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
                          className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-4"
                        >
                          <div className="text-sm sm:text-base font-medium text-[#F5F7FA]">
                            0{qIdx + 1}. {quiz.question}
                          </div>

                          <div className="space-y-2 pt-1">
                            {quiz.options.map((opt, oIdx) => {
                              const isThisSelected = selectedOpt === oIdx;
                              const isThisCorrect = quiz.correctIndex === oIdx;

                              let optClass = 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.08] text-[#9BA1AE] hover:text-[#F5F7FA]';
                              if (isAnswered) {
                                if (isThisCorrect) {
                                  optClass = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-medium';
                                } else if (isThisSelected && !isCorrect) {
                                  optClass = 'bg-rose-500/10 border-rose-500/40 text-rose-300 font-medium';
                                } else {
                                  optClass = 'bg-white/[0.01] border-white/[0.04] text-[#656B78] opacity-50';
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
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Inline Explanation */}
                          {isAnswered && (
                            <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                              isCorrect 
                                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-200' 
                                : 'bg-white/[0.03] border-white/[0.08] text-[#9BA1AE]'
                            }`}>
                              <strong className="text-[#F5F7FA]">INSTITUTIONAL ANALYSIS:</strong> {quiz.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Codified Practice Questions */}
              <div className="space-y-4 pt-4 border-t border-white/[0.07]">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase tracking-[0.16em] text-[#9BA1AE]">
                    CODIFIED PRACTICE QUESTIONS ({chapter.practiceQuestions.length})
                  </div>
                  <span className="text-xs font-mono text-[#656B78] uppercase">CLICK TO REVEAL</span>
                </div>

                <div className="space-y-3">
                  {chapter.practiceQuestions.map((question, qIdx) => {
                    const isRevealed = revealedQuestions[qIdx];
                    return (
                      <div 
                        key={qIdx}
                        className="rounded-xl border border-white/[0.07] overflow-hidden bg-white/[0.02]"
                      >
                        {/* Header */}
                        <button
                          onClick={() => handleToggleRevealQuestion(qIdx)}
                          className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 transition-colors cursor-pointer hover:bg-white/[0.03]"
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono text-xs font-semibold text-[#5865FF] shrink-0 mt-0.5">
                              Q{qIdx + 1}
                            </span>
                            <p className="text-xs sm:text-sm font-medium text-[#F5F7FA]">
                              {question}
                            </p>
                          </div>

                          <ChevronDown className={`w-4 h-4 text-[#9BA1AE] shrink-0 transition-transform duration-200 ${
                            isRevealed ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Expanded Explanation */}
                        {isRevealed && (
                          <div className="p-4 sm:p-5 bg-white/[0.01] border-t border-white/[0.06] text-xs sm:text-sm text-[#9BA1AE] space-y-2">
                            <div className="font-mono text-[10px] uppercase text-[#55E6D1] tracking-[0.16em]">
                              INSTITUTIONAL ANALYSIS &amp; MECHANICS:
                            </div>
                            <p className="leading-relaxed font-light">
                              Verify how this analytical question connects directly to liquidity pools, resting limit orders, and algorithmic delivery sequences. Always ask: <em>Whose stop-loss was targeted, and what liquidity did the algorithm seek next?</em>
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Chapter CTA */}
              <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#9BA1AE] uppercase tracking-wider">
                  CHAPTER COMPLETED · READY TO ADVANCE?
                </div>

                {nextChapter ? (
                  <button
                    onClick={() => onSelectChapter(nextChapter.id)}
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
        </ScrollReveal>
      )}

      {/* SCENE 5: SUMMARY BRIEFING */}
      {activeScene === 'briefing' && (
        <ScrollReveal y={25}>
          <section className="space-y-6">
            <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-10 space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/[0.07]">
                <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
                <h2 className="text-base sm:text-lg font-semibold uppercase tracking-tight text-[#F5F7FA]">
                  EXECUTIVE CHAPTER SUMMARY
                </h2>
              </div>

              <div className="space-y-3">
                {chapter.summary.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] text-[#5865FF] font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      0{pIdx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-[#F5F7FA]/90 leading-relaxed font-normal">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/[0.07]">
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
        </ScrollReveal>
      )}

      {/* Bottom Minimal Action Bar */}
      <ScrollReveal y={15}>
        <div className="p-4 rounded-xl bg-[#11141B] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#656B78] font-mono uppercase">CURRENT:</span>
            <span className="font-medium text-[#F5F7FA] tracking-tight">
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
                onClick={() => onSelectChapter(nextChapter.id)}
                className="btn-predikt-primary text-xs py-1.5 px-3"
              >
                <span>Next (CH {nextChapter.id})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
};

export default ChapterRoom;
