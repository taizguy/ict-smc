import React, { useState } from 'react';
import { quizzes } from '../data/quizzesData';
import { Award, CheckCircle2, XCircle, ShieldCheck, Flame, BookOpen, BarChart2, Star, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BauhausNavScroller } from './BauhausNavScroller';

interface MasteryDashboardProps {
  onSelectTab: (tab: any) => void;
}

export const MasteryDashboard: React.FC<MasteryDashboardProps> = ({ onSelectTab }) => {
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'quiz'>('roadmap');

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

  return (
    <div className="space-y-6 text-[#F5F7FA]">
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
              onClick={() => setActiveTab('roadmap')}
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
              onClick={() => setActiveTab('quiz')}
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
                  onClick={() => {
                    setSelectedQuizIndex(idx);
                    handleResetQuiz();
                  }}
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
    </div>
  );
};

export default MasteryDashboard;
