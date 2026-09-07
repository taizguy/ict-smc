import React, { useState } from 'react';
import { quizzes } from '../data/quizzesData';
import { Award, CheckCircle2, XCircle, ShieldCheck, Flame, BookOpen, BarChart2, Star, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BauhausNavScroller } from './BauhausNavScroller';

interface MasteryDashboardProps {
  onSelectTab: (tab: any) => void;
}

export const MasteryDashboard: React.FC<MasteryDashboardProps> = ({ onSelectTab }) => {
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'quiz' | 'certificate'>('roadmap');

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
    <div className="space-y-6">
      {/* Top Banner - Bauhaus Constructivist Card */}
      <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-4 text-[#121212]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 bg-[#D02020] border border-black inline-block" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
                ICT Trader Mastery &amp; Certification
              </h2>
            </div>
            <p className="text-[#121212]/80 text-xs sm:text-sm font-medium">
              Track your journey through the 6 levels of algorithmic institutional competence.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-[#F0F0F0] border-2 border-[#121212]">
            <button
              type="button"
              onClick={() => setActiveTab('roadmap')}
              className={`px-5 py-2 text-xs font-mono font-black uppercase transition-all border-2 border-[#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                activeTab === 'roadmap'
                  ? 'bg-[#D02020] text-white shadow-[2px_2px_0px_0px_#121212]'
                  : 'bg-white text-[#121212] hover:bg-[#F0C020]'
              }`}
            >
              Curriculum Roadmap
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('quiz')}
              className={`px-5 py-2 text-xs font-mono font-black uppercase transition-all border-2 border-[#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                activeTab === 'quiz'
                  ? 'bg-[#D02020] text-white shadow-[2px_2px_0px_0px_#121212]'
                  : 'bg-white text-[#121212] hover:bg-[#F0C020]'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {levels.map((lvl) => (
              <div
                key={lvl.level}
                className="p-6 bg-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] space-y-4 font-mono text-xs text-[#121212]"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#121212] text-white font-black uppercase text-[11px]">
                    LEVEL {lvl.level}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 border border-[#121212] ${
                      lvl.status === 'Completed'
                        ? 'bg-[#DCFCE7] text-[#166534]'
                        : lvl.status === 'In Progress'
                        ? 'bg-[#FFF9C4] text-[#121212]'
                        : 'bg-[#F0F0F0] text-[#121212]/60'
                    }`}
                  >
                    {lvl.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-[#121212] uppercase tracking-tight">{lvl.title}</h4>
                  <span className="text-[#121212]/70 text-[11px] font-bold block mt-0.5">{lvl.chapters}</span>
                </div>

                <div className="pt-3 border-t-2 border-[#121212] flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => onSelectTab('textbook')}
                    className="text-[#1040C0] hover:underline font-black uppercase flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
                    Read Modules
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('quiz')}
                    className="text-[#D02020] hover:underline transition-colors font-black uppercase cursor-pointer"
                  >
                    Take Exam →
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
          {/* Quiz Selector with BauhausNavScroller */}
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-4">
            <div className="text-[10px] font-mono font-black uppercase tracking-widest text-[#121212]/60 mb-2">
              EXAM CATEGORIES (SCROLL WITH ARROWS):
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
                  className={`px-4 py-2 text-xs font-mono font-black uppercase whitespace-nowrap transition-all border-2 border-[#121212] cursor-pointer shrink-0 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                    selectedQuizIndex === idx
                      ? 'bg-[#D02020] text-white shadow-[3px_3px_0px_0px_#121212]'
                      : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                  }`}
                >
                  {q.title}
                </button>
              ))}
            </BauhausNavScroller>
          </div>

          {/* Active Quiz Card */}
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-6 font-mono text-xs text-[#121212]">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-4 border-[#121212]">
              <div>
                <h3 className="text-xl font-black text-[#121212] uppercase tracking-tight">{activeQuiz.title}</h3>
                <p className="text-[#121212]/80 text-xs mt-0.5 font-medium">{activeQuiz.description}</p>
              </div>

              <button
                type="button"
                onClick={handleResetQuiz}
                className="px-4 py-2 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] font-black uppercase flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
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
                    className="bg-[#FAF9F5] p-5 sm:p-6 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] space-y-3"
                  >
                    <div className="flex items-start gap-2.5 text-[#121212] font-black text-sm">
                      <span className="text-[#D02020]">Q{qIndex + 1}.</span>
                      <span className="leading-relaxed">{q.question}</span>
                    </div>

                    {/* Options */}
                    <div className="space-y-2 mt-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswer === optIdx;
                        let optionStyle = 'bg-white border-2 border-[#121212] text-[#121212] hover:bg-[#F0C020]';

                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'bg-[#DCFCE7] border-2 border-[#166534] text-[#166534] font-black shadow-[2px_2px_0px_0px_#121212]';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'bg-rose-100 border-2 border-[#D02020] text-[#D02020] font-black';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-[#FFF9C4] border-2 border-[#121212] text-[#121212] font-black shadow-[2px_2px_0px_0px_#121212]';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-3.5 text-xs cursor-pointer transition-all flex items-center gap-3 active:translate-x-[1px] active:translate-y-[1px] ${optionStyle}`}
                          >
                            <span className="w-6 h-6 border-2 border-[#121212] bg-white text-[#121212] flex items-center justify-center font-black text-[10px] shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-normal font-bold">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Reveal */}
                    {quizSubmitted && (
                      <div className="pt-3 mt-2 border-t-2 border-[#121212] text-[11px] space-y-1">
                        <div className="flex items-center gap-1.5 font-black uppercase">
                          {isCorrect ? (
                            <span className="text-[#166534] flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> Correct
                            </span>
                          ) : (
                            <span className="text-[#D02020] flex items-center gap-1">
                              <XCircle className="w-4 h-4 stroke-[2.5]" /> Incorrect
                            </span>
                          )}
                        </div>
                        <p className="text-[#121212] font-medium leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Bar */}
            <div className="flex justify-end pt-4 border-t-4 border-[#121212]">
              <button
                type="button"
                disabled={quizSubmitted || Object.keys(selectedAnswers).length === 0}
                onClick={handleGradeQuiz}
                className={`px-7 py-3 font-mono text-xs font-black uppercase transition-all border-2 border-[#121212] ${
                  quizSubmitted || Object.keys(selectedAnswers).length === 0
                    ? 'bg-[#F0F0F0] text-[#121212]/40 cursor-not-allowed'
                    : 'bg-[#D02020] hover:bg-red-700 text-white shadow-[3px_3px_0px_0px_#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
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
