import React, { useState, useEffect } from 'react';
import { quizzes } from '../data/quizzesData';
import { Award, CheckCircle2, XCircle, ShieldCheck, Flame, BookOpen, BarChart2, Star, Sparkles, RefreshCw, ChevronRight, Target, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BauhausNavScroller } from './BauhausNavScroller';
import { SEO } from './SEO';
import { ContextualInternalLinker } from './ContextualInternalLinker';
import { MASTERY_EXAMS, MasteryExamMeta } from '../utils/workbenchToolRoutes';

export interface MasteryDashboardProps {
  initialSubTab?: 'roadmap' | 'quiz';
  initialExamSlug?: string;
  onSelectTab?: (tab: any) => void;
  onNavigateUrl?: (url: string) => void;
}

export const MasteryDashboard: React.FC<MasteryDashboardProps> = ({ 
  initialSubTab = 'roadmap',
  initialExamSlug,
  onSelectTab,
  onNavigateUrl
}) => {
  const resolvedExamIndex = initialExamSlug
    ? MASTERY_EXAMS.findIndex(e => e.slug === initialExamSlug || e.id === initialExamSlug)
    : 0;

  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number>(resolvedExamIndex >= 0 ? resolvedExamIndex : 0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'quiz'>(initialExamSlug ? 'quiz' : initialSubTab);

  useEffect(() => {
    if (initialExamSlug) {
      const idx = MASTERY_EXAMS.findIndex(e => e.slug === initialExamSlug || e.id === initialExamSlug);
      if (idx >= 0 && idx !== selectedQuizIndex) {
        setSelectedQuizIndex(idx);
        setActiveTab('quiz');
      }
    }
  }, [initialExamSlug]);

  const handleSelectTab = (tab: 'roadmap' | 'quiz') => {
    setActiveTab(tab);
    const targetUrl = tab === 'roadmap' ? '/tools/profile/roadmap/' : '/tools/profile/exams/';
    if (onNavigateUrl) {
      onNavigateUrl(targetUrl);
    } else if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.location.assign(targetUrl);
    }
  };

  const handleSelectQuiz = (index: number) => {
    setSelectedQuizIndex(index);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    const examMeta = MASTERY_EXAMS[index];
    const targetUrl = examMeta ? `/tools/profile/exams/${examMeta.slug}/` : '/tools/profile/exams/';
    if (onNavigateUrl) {
      onNavigateUrl(targetUrl);
    } else if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.location.assign(targetUrl);
    }
  };

  const activeQuiz = quizzes[selectedQuizIndex] || quizzes[0];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIndex });
  };

  const handleGradeQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount >= activeQuiz.questions.length * 0.75) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const levels = [
    { level: 0, title: 'Foundations & Architecture', chapters: 'Ch 1 - 3', status: 'Completed' },
    { level: 1, title: 'Structure & Liquidity', chapters: 'Ch 4 - 8', status: 'Completed' },
    { level: 2, title: 'Displacement, FVGs & Range', chapters: 'Ch 9 - 14', status: 'In Progress' },
    { level: 3, title: 'Institutional PD Arrays', chapters: 'Ch 15 - 18', status: 'Locked' },
    { level: 4, title: 'Time, Sessions & Profiles', chapters: 'Ch 19 - 21', status: 'Locked' },
    { level: 5, title: 'Top-Down Execution Mastery', chapters: 'Ch 22 - 31', status: 'Locked' }
  ];

  const currentExamMeta = MASTERY_EXAMS[selectedQuizIndex];
  const canonicalPath = activeTab === 'roadmap'
    ? '/tools/profile/roadmap/'
    : currentExamMeta ? `/tools/profile/exams/${currentExamMeta.slug}/` : '/tools/profile/exams/';

  return (
    <div className="space-y-6 text-[#F5F7FA]">
      <SEO
        title={activeTab === 'roadmap' ? 'Curriculum Roadmap & Certification Levels — Mastery Profile | LearnSMC' : `${currentExamMeta?.title || 'Certification Exams'} — Mastery Profile | LearnSMC`}
        description={activeTab === 'roadmap' ? 'Progress through the 6 institutional competence levels of ICT algorithmic mastery from foundations to live execution.' : `${currentExamMeta?.description || 'Test your understanding of smart money concepts and algorithmic market structure.'}`}
        path={canonicalPath}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Workbench', path: '/tools/' },
          { name: 'Mastery Profile', path: '/tools/profile/' },
          { name: activeTab === 'roadmap' ? 'Roadmap' : (currentExamMeta?.title || 'Exams'), path: canonicalPath }
        ]}
      />

      {/* Top Banner */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                ICT Trader Mastery &amp; Certification
              </h2>
            </div>
            <p className="text-[#9BA1AE] text-xs sm:text-sm">
              Track your journey through the 6 levels of algorithmic institutional competence.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.07] rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleSelectTab('roadmap')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'bg-white/[0.12] text-[#F5F7FA] border border-white/20'
                  : 'text-[#9BA1AE] hover:text-[#F5F7FA]'
              }`}
            >
              Curriculum Roadmap
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab('quiz')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-white/[0.12] text-[#F5F7FA] border border-white/20'
                  : 'text-[#9BA1AE] hover:text-[#F5F7FA]'
              }`}
            >
              Mastery Exams
            </button>
          </div>
        </div>
      </div>

      {/* Roadmap Tab */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levels.map((lvl) => (
              <div
                key={lvl.level}
                className="p-6 bg-[#11141B] border border-white/[0.08] rounded-2xl space-y-4 font-mono text-xs text-[#F5F7FA]"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-white/[0.04] text-[#5865FF] border border-white/[0.08] rounded-full uppercase text-[10px]">
                    LEVEL {lvl.level}
                  </span>
                  <span
                    className={`text-[10px] uppercase px-2 py-0.5 rounded-full border ${
                      lvl.status === 'Completed'
                        ? 'bg-[#55E6D1]/10 text-[#55E6D1] border-[#55E6D1]/20'
                        : lvl.status === 'In Progress'
                        ? 'bg-[#F0B35B]/10 text-[#F0B35B] border-[#F0B35B]/20'
                        : 'bg-white/[0.02] text-[#656B78] border-white/[0.06]'
                    }`}
                  >
                    {lvl.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-[#F5F7FA] tracking-tight">{lvl.title}</h4>
                  <span className="text-[#9BA1AE] text-[11px] block mt-0.5">{lvl.chapters}</span>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => onSelectTab('curriculum')}
                    className="text-[#5865FF] hover:underline uppercase flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Modules
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('quiz')}
                    className="text-[#55E6D1] hover:underline transition-colors uppercase cursor-pointer flex items-center gap-0.5"
                  >
                    Take Exam <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {/* Quiz Selector */}
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#656B78] mb-2 px-1">
              EXAM CATEGORIES:
            </div>
            <BauhausNavScroller>
              {quizzes.map((q, idx) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleSelectQuiz(idx)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase whitespace-nowrap transition-all rounded-lg border cursor-pointer shrink-0 ${
                    selectedQuizIndex === idx
                      ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                      : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
                  }`}
                >
                  {q.title}
                </button>
              ))}
            </BauhausNavScroller>
          </div>

          {/* Active Quiz Card */}
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-6 font-mono text-xs text-[#F5F7FA]">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.07]">
              <div>
                <h3 className="text-xl font-semibold text-[#F5F7FA] tracking-tight">{activeQuiz.title}</h3>
                <p className="text-[#9BA1AE] text-xs mt-0.5">{activeQuiz.description}</p>
              </div>

              <button
                type="button"
                onClick={handleResetQuiz}
                className="px-3.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-[#9BA1AE] hover:text-[#F5F7FA] border border-white/[0.08] rounded-xl uppercase flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Answers
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {activeQuiz.questions.map((q, qIndex) => {
                const userAnswer = selectedAnswers[q.id];
                const isAnswered = userAnswer !== undefined;
                const isCorrect = isAnswered && userAnswer === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="bg-[#0C0E13] p-5 sm:p-6 rounded-xl border border-white/[0.06] space-y-3 font-sans"
                  >
                    <div className="flex items-start gap-2.5 text-[#F5F7FA] font-medium text-sm">
                      <span className="text-[#5865FF] font-mono">Q{qIndex + 1}.</span>
                      <span className="leading-relaxed">{q.question}</span>
                    </div>

                    {/* Options */}
                    <div className="space-y-2 mt-2 font-mono">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswer === optIdx;
                        let optionStyle = 'bg-white/[0.02] border-white/[0.06] text-[#9BA1AE] hover:bg-white/[0.05] hover:text-[#F5F7FA]';

                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'bg-[#55E6D1]/10 border-[#55E6D1]/30 text-[#55E6D1] font-semibold';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'bg-[#FF6B7A]/10 border-[#FF6B7A]/30 text-[#FF6B7A] font-semibold';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-white/[0.10] border-white/20 text-[#F5F7FA] font-medium';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-3 text-xs rounded-xl cursor-pointer transition-all flex items-center gap-3 border ${optionStyle}`}
                          >
                            <span className="w-6 h-6 rounded-lg border border-white/[0.1] bg-white/[0.04] text-[#F5F7FA] flex items-center justify-center font-mono text-[10px] shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-normal">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Reveal */}
                    {quizSubmitted && (
                      <div className="pt-3 mt-2 border-t border-white/[0.06] text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-mono uppercase text-[11px]">
                          {isCorrect ? (
                            <span className="text-[#55E6D1] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                            </span>
                          ) : (
                            <span className="text-[#FF6B7A] flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Incorrect
                            </span>
                          )}
                        </div>
                        <p className="text-[#9BA1AE] leading-relaxed font-sans">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Bar */}
            <div className="flex justify-end pt-4 border-t border-white/[0.07]">
              <button
                type="button"
                disabled={quizSubmitted || Object.keys(selectedAnswers).length === 0}
                onClick={handleGradeQuiz}
                className={`px-6 py-2.5 font-mono text-xs uppercase tracking-wider rounded-xl transition-all ${
                  quizSubmitted || Object.keys(selectedAnswers).length === 0
                    ? 'bg-white/[0.04] text-[#656B78] cursor-not-allowed border border-white/[0.06]'
                    : 'bg-[#5865FF] hover:bg-[#4752E6] text-white cursor-pointer shadow-lg shadow-[#5865FF]/20'
                }`}
              >
                Submit Exam For Evaluation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEO Engine & Structured Data */}
      <SEO
        title="Mastery Profile & Operator Credentials | LearnSMC"
        description="Assessments, diagnostic quizzes, and operator credentials tracking your institutional mastery across 57 curriculum chapters."
        canonicalPath="/tools/dashboard/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "LearnSMC Mastery Profile & Diagnostics",
          "url": "https://learnsmc.xyz/tools/dashboard/",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "description": "Operator readiness tracking, diagnostic assessments, and certification milestones.",
          "educationalUse": "Skill assessment and curriculum progression tracking",
          "provider": {
            "@type": "Organization",
            "name": "LearnSMC",
            "url": "https://learnsmc.xyz/"
          }
        }}
      />

      {/* Static Semantic HTML Documentation Block (Indexable by Googlebot & Search Engines) */}
      <article className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6 text-[#F5F7FA]">
        <header className="border-b border-white/[0.07] pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#5865FF]">
              DOCUMENTATION // COMPETENCY STANDARDS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
            Institutional Operator Competency Standards &amp; Progression Matrix
          </h2>
          <p className="text-sm text-[#9BA1AE] mt-1">
            Codified curriculum requirements, diagnostic examination metrics, and stage-by-stage operator readiness criteria.
          </p>
        </header>

        {/* Section 1: The 4 Operator Tiers */}
        <section className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-[#55E6D1] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#55E6D1]" />
            1. The 4 Institutional Readiness Tiers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#9BA1AE]">
            <div className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">Tier 1: Foundation Operator</strong>
              Demonstrated mastery of continuous double auctions, passive limit order queues, and market structure hierarchy (Chapters 1–15).
            </div>
            <div className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">Tier 2: Precision Technician</strong>
              Ability to identify Fair Value Gaps, Order Blocks, Liquidity Sweeps, and calculate Consequent Encroachment (Chapters 16–30).
            </div>
            <div className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">Tier 3: Time &amp; Macro Specialist</strong>
              Precise execution inside London Open, New York AM/PM Killzones, and 20-minute algorithmic macro windows (Chapters 31–45).
            </div>
            <div className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">Tier 4: Certified Institutional Operator</strong>
              Complete synthesis of multi-market delivery, statistical expectancy modeling, and 100-trade journal discipline (Chapters 46–57).
            </div>
          </div>
        </section>

        {/* Section 2: Assessment Methodology */}
        <section className="space-y-3 pt-3 border-t border-white/[0.06]">
          <h3 className="text-base sm:text-lg font-semibold text-[#5865FF] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5865FF]" />
            2. Empirical Evaluation Standards
          </h3>
          <p className="text-xs sm:text-sm text-[#C5CBD8] leading-relaxed">
            Theoretical knowledge alone is insufficient. Candidates must achieve minimum 80% passing accuracy across randomized situational quizzes 
            and log a minimum of 30 verified simulation trades adhering strictly to mechanical invalidation protocols before progressing to live capital.
          </p>
        </section>
      </article>
    </div>
  );
};

export default MasteryDashboard;
