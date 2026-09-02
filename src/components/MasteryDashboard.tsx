import React, { useState } from 'react';
import { quizzes } from '../data/quizzesData';
import { Award, CheckCircle2, XCircle, ShieldCheck, Flame, BookOpen, BarChart2, Star, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

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
    { level: 0, title: 'Foundations & Architecture', chapters: 'Ch 1 - 3', status: 'Completed', color: 'from-slate-700 to-slate-800' },
    { level: 1, title: 'Structure & Liquidity', chapters: 'Ch 4 - 8', status: 'Completed', color: 'from-amber-900/60 to-slate-900' },
    { level: 2, title: 'Displacement, FVGs & Range', chapters: 'Ch 9 - 14', status: 'In Progress', color: 'from-cyan-950 to-slate-900' },
    { level: 3, title: 'Institutional PD Arrays', chapters: 'Ch 15 - 18', status: 'Locked', color: 'from-indigo-950 to-slate-900' },
    { level: 4, title: 'Time, Sessions & Profiles', chapters: 'Ch 19 - 21', status: 'Locked', color: 'from-purple-950 to-slate-900' },
    { level: 5, title: 'Top-Down Execution Mastery', chapters: 'Ch 22 - 31', status: 'Locked', color: 'from-emerald-950 to-slate-900' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white font-mono tracking-wide">ICT Trader Mastery & Certification</h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Track your journey through the 6 levels of algorithmic institutional competence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              Curriculum Roadmap
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300'
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
                className={`p-5 rounded-xl border border-slate-800 bg-gradient-to-br ${lvl.color} shadow-lg space-y-3 font-mono text-xs relative overflow-hidden`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 font-bold border border-slate-800">
                    LEVEL {lvl.level}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      lvl.status === 'Completed'
                        ? 'text-emerald-400'
                        : lvl.status === 'In Progress'
                        ? 'text-amber-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {lvl.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white tracking-wide">{lvl.title}</h4>
                  <span className="text-slate-400 text-[11px] block mt-0.5">{lvl.chapters}</span>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => onSelectTab('textbook')}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Modules
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="text-slate-300 hover:text-white"
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
          {/* Quiz Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
            {quizzes.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuizIndex(idx);
                  handleResetQuiz();
                }}
                className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedQuizIndex === idx
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {q.title}
              </button>
            ))}
          </div>

          {/* Active Quiz Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">{activeQuiz.title}</h3>
                <p className="text-slate-400 text-xs mt-0.5 font-sans">{activeQuiz.description}</p>
              </div>

              <button
                onClick={handleResetQuiz}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5"
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
                    className="bg-slate-950 p-5 rounded-xl border border-slate-800/90 space-y-3"
                  >
                    <div className="flex items-start gap-2 text-white font-bold text-sm">
                      <span className="text-cyan-400">Q{qIndex + 1}.</span>
                      <span className="font-sans leading-relaxed">{q.question}</span>
                    </div>

                    {/* Options */}
                    <div className="space-y-2 mt-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswer === optIdx;
                        let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold shadow-sm';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-3 ${optionStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="font-sans leading-normal">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Reveal */}
                    {quizSubmitted && (
                      <div className="pt-2 mt-2 border-t border-slate-800 text-[11px] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          {isCorrect ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Correct
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> Incorrect
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 font-sans leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Bar */}
            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                disabled={quizSubmitted || Object.keys(selectedAnswers).length === 0}
                onClick={handleGradeQuiz}
                className={`px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg text-xs ${
                  quizSubmitted || Object.keys(selectedAnswers).length === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white cursor-pointer'
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
