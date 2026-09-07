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
  ChevronDown
} from 'lucide-react';
import { textbookChapters } from '../data/chaptersData';
import { quizQuestions } from '../data/quizzesData';
import { InteractiveDiagram } from './InteractiveDiagram';
import { ChapterSection, KeyTerm } from '../types';
import { saveQuestionAnswer } from '../utils/academyProgress';
import { BauhausNavScroller } from './BauhausNavScroller';

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

  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    setSelectedQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
    saveQuestionAnswer(questionId, optionIdx);
  };

  const scenes = [
    { id: 'text', label: '1. Curriculum Sections', icon: BookOpen },
    { id: 'visual', label: '2. Interactive Diagram', icon: Eye },
    { id: 'terms', label: '3. Key Terms', icon: Layers },
    { id: 'checkpoint', label: '4. Practice & Quiz', icon: Award },
    { id: 'briefing', label: '5. Summary Briefing', icon: Compass },
  ] as const;

  return (
    <div className="space-y-8 pb-24">
      
      {/* Top Bauhaus Navigation & Jump Bar */}
      <div className="bg-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] rounded-none p-4 flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToMap}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-[#121212] hover:bg-[#D02020] text-white text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
            <span>ALL CHAPTERS</span>
          </button>

          {/* Quick jump dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#121212] hidden sm:inline">JUMP:</span>
            <select
              value={chapter.id}
              onChange={(e) => onSelectChapter(Number(e.target.value))}
              className="px-3 py-2 bg-[#F0F0F0] border-2 border-[#121212] rounded-none text-xs font-black uppercase text-[#121212] focus:outline-none focus:bg-white cursor-pointer"
            >
              {textbookChapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  CH {ch.id < 10 ? `0${ch.id}` : ch.id}: {ch.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Prev / Next chapter buttons in Bauhaus buttons */}
        <div className="flex items-center gap-2">
          {prevChapter && (
            <button
              onClick={() => onSelectChapter(prevChapter.id)}
              className="px-3 py-2 rounded-none bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-center gap-1.5 text-xs font-black uppercase tracking-wider active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              title={`Previous: ${prevChapter.title}`}
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">PREV</span>
            </button>
          )}

          <div className="px-3 py-2 rounded-none bg-[#F0C020] border-2 border-[#121212] text-[#121212] text-xs font-mono font-black shadow-[3px_3px_0px_0px_#121212]">
            {chapter.id} / {textbookChapters.length}
          </div>

          {nextChapter && (
            <button
              onClick={() => onSelectChapter(nextChapter.id)}
              className="px-3 py-2 rounded-none bg-[#1040C0] hover:bg-blue-700 text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-center gap-1.5 text-xs font-black uppercase tracking-wider active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              title={`Next: ${nextChapter.title}`}
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>
      </div>

      {/* Main Chapter Header Card - Bauhaus Color Blocking */}
      <section className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] rounded-none p-6 sm:p-10 space-y-6 relative overflow-hidden">
        
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-none text-xs font-mono font-black uppercase tracking-widest bg-[#D02020] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212]">
              CHAPTER {chapter.id < 10 ? `0${chapter.id}` : chapter.id}
            </span>
            <span className="px-3 py-1 rounded-none text-xs font-mono font-bold uppercase tracking-wider bg-[#F0F0F0] text-[#121212] border-2 border-[#121212]">
              {chapter.part}
            </span>
            <span className="px-3 py-1 rounded-none text-xs font-mono font-bold uppercase bg-[#F0C020] text-[#121212] border-2 border-[#121212]">
              LEVEL {chapter.level}
            </span>
          </div>
        </div>

        {/* Chapter Title & Inscription */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212] leading-tight">
            {chapter.title}
          </h1>

          {/* Principle callout */}
          <div className="p-5 rounded-none bg-[#FFF9C4] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212]">
            <div className="text-[10px] font-mono text-[#D02020] uppercase tracking-widest font-black mb-1">
              // INSTITUTIONAL PRINCIPLE
            </div>
            <p className="text-sm sm:text-base text-[#121212] font-bold italic leading-relaxed">
              "{chapter.quote}"
            </p>
          </div>
        </div>

        {/* Scene Tabs Selector - Bauhaus Pills with Nav Scroller */}
        <div className="pt-4 border-t-4 border-[#121212]">
          <BauhausNavScroller innerClassName="gap-2 pb-1" showArrowsAlways={false}>
            {scenes.map((scene) => {
              const Icon = scene.icon;
              const isActive = activeScene === scene.id;
              return (
                <button
                  key={scene.id}
                  onClick={() => setActiveScene(scene.id)}
                  className={`px-4 py-2.5 rounded-none text-xs font-black uppercase tracking-wider flex items-center gap-2 shrink-0 border-2 border-[#121212] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    isActive
                      ? 'bg-[#D02020] text-white shadow-[4px_4px_0px_0px_#121212] -translate-y-0.5'
                      : 'bg-white text-[#121212] shadow-[2px_2px_0px_0px_#121212] hover:bg-[#F0C020]'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                  <span>{scene.label}</span>
                </button>
              );
            })}
          </BauhausNavScroller>
        </div>
      </section>

      {/* DYNAMIC SCENE CONTENT */}

      {/* SCENE 1: FULL CODIFIED CURRICULUM SECTIONS */}
      {activeScene === 'text' && (
        <section className="space-y-6">
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] rounded-none p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b-4 border-[#121212]">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 bg-[#D02020] rounded-none border border-black inline-block" />
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#121212]">
                  TEXTBOOK SECTIONS ({chapter.sections.length} PARTS)
                </h2>
              </div>
              <span className="text-xs font-mono font-bold uppercase text-[#121212]/60">AUTHENTIC MATERIAL</span>
            </div>

            {/* Sections List */}
            <div className="space-y-6">
              {chapter.sections.map((sec: ChapterSection, sIdx: number) => (
                <article 
                  key={sec.id || sIdx}
                  className="p-6 rounded-none bg-[#F0F0F0] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-none bg-[#1040C0] text-white border-2 border-[#121212] flex items-center justify-center font-mono text-xs font-black">
                      0{sIdx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#121212]">
                      {sec.title}
                    </h3>
                  </div>

                  {/* Section Content */}
                  <div className="text-sm sm:text-base text-[#121212] leading-relaxed font-medium whitespace-pre-line space-y-3">
                    {sec.content}
                  </div>

                  {/* Key Takeaway Banner */}
                  {sec.keyTakeaway && (
                    <div className="p-4 rounded-none bg-[#FFF9C4] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-start gap-3 mt-4">
                      <Zap className="w-5 h-5 text-[#D02020] shrink-0 mt-0.5 stroke-[2.5]" />
                      <div>
                        <div className="text-[10px] font-mono text-[#D02020] uppercase font-black tracking-widest">
                          // INSTITUTIONAL KEY TAKEAWAY
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-[#121212] mt-1 leading-relaxed">
                          {sec.keyTakeaway}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Navigation Footer */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t-4 border-[#121212]">
              <button
                onClick={() => setActiveScene('visual')}
                className="px-5 py-3 rounded-none bg-[#D02020] text-white hover:bg-red-700 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <span>VIEW INTERACTIVE DIAGRAM</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => setActiveScene('terms')}
                className="px-5 py-3 rounded-none bg-white hover:bg-[#F0C020] text-[#121212] text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <span>STUDY KEY TERMS ({chapter.keyTerms.length})</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SCENE 2: INTERACTIVE VISUAL STAGE */}
      {activeScene === 'visual' && (
        <section className="space-y-6">
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] rounded-none p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b-4 border-[#121212]">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#1040C0] border border-black inline-block" />
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#121212]">
                  INTERACTIVE DIAGRAM SIMULATOR
                </h2>
              </div>
              <span className="text-xs font-mono font-black uppercase bg-[#F0C020] text-[#121212] px-3 py-1 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
                {primaryDiagramType.replace(/_/g, ' ')}
              </span>
            </div>

            <p className="text-sm font-medium text-[#121212]">
              Step through the stages of algorithmic delivery, observe liquidity consumption, and study how institutional order flow imprints onto price candles.
            </p>

            {/* Bespoke Interactive Diagram */}
            <div className="border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] p-4 bg-[#121212]">
              <InteractiveDiagram 
                type={primaryDiagramType} 
                title={chapter.title} 
                isInteractive={true} 
              />
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t-4 border-[#121212]">
              <button
                onClick={() => setActiveScene('text')}
                className="px-5 py-3 rounded-none bg-white hover:bg-[#E0E0E0] text-[#121212] text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                ← BACK TO SECTIONS
              </button>

              <button
                onClick={() => setActiveScene('terms')}
                className="px-5 py-3 rounded-none bg-[#D02020] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <span>STUDY KEY TERMS</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SCENE 3: KEY TERMS & GLOSSARY */}
      {activeScene === 'terms' && (
        <section className="space-y-6">
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] rounded-none p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b-4 border-[#121212]">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 bg-[#F0C020] clip-triangle inline-block" />
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#121212]">
                  KEY INSTITUTIONAL TERMS ({chapter.keyTerms.length} DEFINITIONS)
                </h2>
              </div>
              <span className="text-xs font-mono font-bold uppercase text-[#121212]/60">CORE VOCABULARY</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {chapter.keyTerms.map((item, tIdx) => (
                <div 
                  key={tIdx}
                  className="p-5 rounded-none bg-[#F0F0F0] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] space-y-2 hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black uppercase text-white bg-[#1040C0] px-3 py-1 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
                      {item.term}
                    </span>
                    <span className="text-xs font-mono font-black text-[#121212]">#{tIdx + 1}</span>
                  </div>

                  <p className="text-sm text-[#121212] font-medium leading-relaxed pt-2">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t-4 border-[#121212]">
              <button
                onClick={() => setActiveScene('text')}
                className="px-5 py-3 rounded-none bg-white hover:bg-[#E0E0E0] text-[#121212] text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                ← BACK TO TEXTBOOK
              </button>

              <button
                onClick={() => setActiveScene('checkpoint')}
                className="px-5 py-3 rounded-none bg-[#D02020] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <span>PRACTICE CHECKPOINT</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SCENE 4: PRACTICE CHECKPOINT & QUESTIONS */}
      {activeScene === 'checkpoint' && (
        <section className="space-y-6">
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] rounded-none p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b-4 border-[#121212]">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 bg-[#D02020] rounded-none border border-black inline-block" />
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#121212]">
                  UNDERSTANDING CHECKPOINT &amp; PRACTICE
                </h2>
              </div>
              <span className="text-xs font-mono font-bold uppercase text-[#121212]/60">ACTIVE RECALL</span>
            </div>

            {/* Diagnostic Multiple Choice Check */}
            {matchingQuizQuestions.length > 0 && (
              <div className="space-y-6">
                <div className="text-xs font-mono font-black uppercase tracking-widest text-[#121212] pb-1 border-b-2 border-[#121212]">
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
                        className="p-6 rounded-none bg-[#F0F0F0] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] space-y-4"
                      >
                        <div className="text-sm sm:text-base font-black uppercase text-[#121212]">
                          0{qIdx + 1}. {quiz.question}
                        </div>

                        <div className="space-y-2.5 pt-1">
                          {quiz.options.map((opt, oIdx) => {
                            const isThisSelected = selectedOpt === oIdx;
                            const isThisCorrect = quiz.correctIndex === oIdx;

                            let optClass = 'bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212]';
                            if (isAnswered) {
                              if (isThisCorrect) {
                                optClass = 'bg-[#1040C0] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] font-black';
                              } else if (isThisSelected && !isCorrect) {
                                optClass = 'bg-[#D02020] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] font-black';
                              } else {
                                optClass = 'bg-white opacity-50 border-2 border-[#121212] text-[#121212]/50';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectQuizOption(quiz.id, oIdx)}
                                className={`w-full p-3 rounded-none text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-3 cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${optClass}`}
                              >
                                <span>{opt}</span>
                                {isAnswered && isThisCorrect && (
                                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 stroke-[3]" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        {isAnswered && (
                          <div className={`p-4 rounded-none text-xs sm:text-sm font-medium leading-relaxed border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] ${
                            isCorrect 
                              ? 'bg-[#1040C0] text-white' 
                              : 'bg-[#FFF9C4] text-[#121212]'
                          }`}>
                            <strong>INSTITUTIONAL ANALYSIS:</strong> {quiz.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Codified Practice Questions - Bauhaus Accordion */}
            <div className="space-y-4 pt-4 border-t-4 border-[#121212]">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono font-black uppercase tracking-widest text-[#121212]">
                  CODIFIED PRACTICE QUESTIONS ({chapter.practiceQuestions.length})
                </div>
                <span className="text-xs font-mono font-bold uppercase text-[#121212]/60">CLICK TO REVEAL</span>
              </div>

              <div className="space-y-4">
                {chapter.practiceQuestions.map((question, qIdx) => {
                  const isRevealed = revealedQuestions[qIdx];
                  return (
                    <div 
                      key={qIdx}
                      className="rounded-none border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] overflow-hidden"
                    >
                      {/* Accordion Header */}
                      <button
                        onClick={() => handleToggleRevealQuestion(qIdx)}
                        className={`w-full p-5 text-left flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                          isRevealed ? 'bg-[#D02020] text-white' : 'bg-white text-[#121212] hover:bg-[#F0F0F0]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-7 h-7 rounded-none border-2 border-[#121212] flex items-center justify-center font-mono text-xs font-black shrink-0 mt-0.5 ${
                            isRevealed ? 'bg-white text-[#D02020]' : 'bg-[#F0C020] text-[#121212]'
                          }`}>
                            Q{qIdx + 1}
                          </span>
                          <p className="text-sm font-black uppercase tracking-tight">
                            {question}
                          </p>
                        </div>

                        <ChevronDown className={`w-5 h-5 shrink-0 stroke-[3] transition-transform duration-200 ${
                          isRevealed ? 'rotate-180' : ''
                        }`} />
                      </button>

                      {/* Accordion Expanded Content: Bauhaus Light Yellow */}
                      {isRevealed && (
                        <div className="p-5 bg-[#FFF9C4] border-t-4 border-[#121212] text-xs sm:text-sm font-medium text-[#121212] space-y-2">
                          <div className="font-mono text-[10px] uppercase font-black text-[#D02020] tracking-widest">
                            // INSTITUTIONAL ANALYSIS &amp; MECHANICS:
                          </div>
                          <p className="leading-relaxed">
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
            <div className="pt-6 border-t-4 border-[#121212] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono font-black uppercase text-[#121212]">
                CHAPTER COMPLETED // READY TO ADVANCE?
              </div>

              {nextChapter ? (
                <button
                  onClick={() => onSelectChapter(nextChapter.id)}
                  className="px-6 py-3 rounded-none bg-[#1040C0] hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                >
                  <span>ADVANCE TO CH {nextChapter.id}: {nextChapter.title}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              ) : (
                <button
                  onClick={onReturnToMap}
                  className="px-6 py-3 rounded-none bg-[#D02020] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] cursor-pointer"
                >
                  <span>RETURN TO FULL SYLLABUS</span>
                </button>
              )}
            </div>

          </div>
        </section>
      )}

      {/* SCENE 5: SUMMARY BRIEFING */}
      {activeScene === 'briefing' && (
        <section className="space-y-6">
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] rounded-none p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-4 border-[#121212]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#1040C0] border border-black inline-block" />
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#121212]">
                EXECUTIVE CHAPTER SUMMARY
              </h2>
            </div>

            <div className="space-y-3">
              {chapter.summary.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-3 p-4 rounded-none bg-[#F0F0F0] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212]">
                  <span className="w-6 h-6 rounded-none bg-[#F0C020] text-[#121212] border border-[#121212] font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    0{pIdx + 1}
                  </span>
                  <p className="text-sm font-bold text-[#121212] leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between border-t-4 border-[#121212]">
              <button
                onClick={() => setActiveScene('text')}
                className="px-6 py-3 rounded-none bg-[#D02020] text-white hover:bg-red-700 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <span>READ FULL CHAPTER</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Sticky Action Bar in Bauhaus style */}
      <div className="p-4 rounded-none bg-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#121212]/60 font-mono font-bold uppercase">CURRENT:</span>
          <span className="font-black text-[#121212] uppercase tracking-tight text-sm">
            CH {chapter.id}: {chapter.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToMap}
            className="px-4 py-2 rounded-none bg-[#F0F0F0] hover:bg-[#E0E0E0] text-[#121212] font-black uppercase tracking-wider border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            ALL CHAPTERS
          </button>

          {nextChapter && (
            <button
              onClick={() => onSelectChapter(nextChapter.id)}
              className="px-4 py-2 rounded-none bg-[#1040C0] hover:bg-blue-700 text-white font-black uppercase tracking-wider flex items-center gap-1.5 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              <span>NEXT (CH {nextChapter.id})</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default ChapterRoom;
