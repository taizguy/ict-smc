import React, { useState } from 'react';
import { 
  Youtube, 
  ExternalLink, 
  Heart, 
  Sparkles, 
  Award, 
  Play, 
  CheckCircle2, 
  Shield, 
  Flame, 
  BookOpen, 
  Clock, 
  Target, 
  Compass, 
  ChevronRight, 
  Star, 
  GraduationCap,
  TrendingUp,
  BarChart2,
  Check,
  Zap,
  ArrowRight,
  Layers,
  Lightbulb
} from 'lucide-react';

interface MentorSpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept?: (conceptId: string) => void;
  onSelectChapter?: (chapterId: number) => void;
}

export const MentorSpotlight: React.FC<MentorSpotlightProps> = ({
  isOpen,
  onClose,
  onSelectConcept,
  onSelectChapter
}) => {
  const [activeTab, setActiveTab] = useState<'tribute' | 'curriculum' | 'daily_bias_checklist' | 'gold_legacy'>('tribute');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const channelUrl = "https://www.youtube.com/@TraderAbdullahMasood";

  const keyCurriculumTracks = [
    {
      title: "2025 / 2026 ICT Daily Bias Mentorship",
      tag: "FLAGSHIP SERIES",
      icon: TrendingUp,
      color: "from-amber-500/20 to-amber-950/40 border-amber-500/40 text-amber-300",
      description: "Mastering the mechanical 4-pillar daily bias determination using Previous Day High/Low (PDH/PDL), Midnight Open (00:00 NY), and IPDA 20/40/60-day macro draw on liquidity.",
      coreTeachings: [
        "How to determine if today is an Expansion Day vs Consolidation/Retracement Day",
        "Using 00:00 NY Midnight Open as the true institutional benchmark for fair price",
        "Preventing direction flipping by grounding your bias on the 4H/Daily Liquidity Draw"
      ],
      conceptLink: "daily_bias_masood"
    },
    {
      title: "The Gold Legacy - SMC Mentorship (XAUUSD)",
      tag: "PRECISION EXECUTION",
      icon: Flame,
      color: "from-yellow-500/20 to-amber-950/40 border-yellow-500/40 text-yellow-300",
      description: "In-depth specialization in Gold's unique algorithmic personality: aggressive Asian range manipulation, deep Judas Swings, and explosive Fair Value Gap expansions.",
      coreTeachings: [
        "Why Gold sweeps Asian Highs/Lows deeper than major FX pairs",
        "The 15M/5M London & New York Open entry models for XAUUSD",
        "Identifying fake volume spikes vs genuine institutional algorithmic repricing"
      ],
      conceptLink: "gold_legacy_smc"
    },
    {
      title: "Inducement (IDM) vs True Structural Liquidity",
      tag: "SMC CLARITY",
      icon: Target,
      color: "from-cyan-500/20 to-cyan-950/40 border-cyan-500/40 text-cyan-300",
      description: "Unmasking internal liquidity engineering that tricks retail traders into marking premature Order Blocks and taking stopouts before the real move.",
      coreTeachings: [
        "Distinguishing internal structural pullbacks (Inducements) from true swing points",
        "The reason 80% of retail SMC order blocks fail: buying before inducement is taken",
        "Waiting for external liquidity runs before triggering lower timeframe execution"
      ],
      conceptLink: "inducement_vs_external_liquidity"
    },
    {
      title: "NASDAQ (NQ) & Cross-Asset SMT Divergence",
      tag: "INDEX MASTERY",
      icon: BarChart2,
      color: "from-emerald-500/20 to-emerald-950/40 border-emerald-500/40 text-emerald-300",
      description: "Algorithmic index execution combining 09:30 AM New York Equities Open with SMT divergence across NQ, ES (S&P 500), and the US Dollar Index (DXY).",
      coreTeachings: [
        "The 09:30 AM Opening Bell Judas swing protocol",
        "SMT Divergence: When NQ breaks highs but ES fails to make a higher high",
        "The 10:00 - 11:00 AM NY Silver Bullet high-probability window"
      ],
      conceptLink: "nasdaq_session_open"
    }
  ];

  const dailyBiasChecklist = [
    {
      id: 'dol',
      category: '1. Higher Timeframe Context',
      question: 'Is the Weekly / Daily Draw on Liquidity (DOL) clearly identified?',
      detail: 'Identify whether price is reaching for an old HTF High/Low, Weekly FVG, or Daily Imbalance.'
    },
    {
      id: 'pdh_pdl',
      category: '2. Previous Day Boundaries',
      question: 'Have you marked the Previous Day High (PDH) and Previous Day Low (PDL)?',
      detail: 'Price frequently sweeps the PDH/PDL in London/NY before reversing or using it as a springboard.'
    },
    {
      id: 'midnight',
      category: '3. Midnight Open Benchmark',
      question: 'Where is price trading relative to 00:00 NY Midnight Open?',
      detail: 'For bullish days, the best buy opportunities occur BELOW Midnight Open (Discount). For bearish days, look for sells ABOVE Midnight Open (Premium).'
    },
    {
      id: 'asian_range',
      category: '4. Asian Session Range (20:00 - 00:00 NY)',
      question: 'Has the Asian Session High or Low been swept by a Judas Swing?',
      detail: 'London session often manipulates price past the Asian range extremes before expanding in the true daily direction.'
    },
    {
      id: 'inducement',
      category: '5. Inducement & POI Check',
      question: 'Has internal inducement (IDM) been purged before entering the POI?',
      detail: 'Ensure you are not taking the first internal Order Block; wait for the liquidity sweep of internal stops.'
    },
    {
      id: 'time_window',
      category: '6. Time & Price (Killzone Rule)',
      question: 'Are you trading strictly inside a designated Killzone?',
      detail: 'London Killzone (02:00 - 05:00 NY), NY AM Killzone (07:00 - 10:00 NY), or NY PM Silver Bullet (14:00 - 15:00 NY).'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border-2 border-amber-300 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Glowing Gold / Amber Banner Header */}
        <div className="relative bg-gradient-to-r from-amber-100/70 via-white to-amber-100/50 p-6 border-b border-amber-200 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Youtube className="w-7 h-7 text-red-600 fill-red-600" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Special Appreciation & Mentor Spotlight
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-1 flex items-center gap-2">
                  Trader Abdullah Masood
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300">
                    @TraderAbdullahMasood
                  </span>
                </h1>
                <p className="text-xs text-slate-600 font-sans mt-0.5">
                  The Master Educator of Inner Circle Trader (ICT) & Smart Money Concepts (SMC)
                </p>
              </div>
            </div>

            {/* Direct Channel Link Button */}
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-red-500/20 transition-all shrink-0 hover:scale-105 active:scale-95 group"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Visit & Learn on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-amber-200/80 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('tribute')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'tribute'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/60'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              Heartfelt Tribute & Acknowledgement
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'curriculum'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/60'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Key Mentorship Tracks & Masteries
            </button>
            <button
              onClick={() => setActiveTab('daily_bias_checklist')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'daily_bias_checklist'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/60'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Interactive Daily Bias Pre-Market Checklist
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          
          {/* TAB 1: TRIBUTE & ACKNOWLEDGEMENT */}
          {activeTab === 'tribute' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Personal Dedication Message */}
              <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/60 border-2 border-amber-300 rounded-2xl p-6 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Award className="w-32 h-32 text-amber-600" />
                </div>
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 text-amber-800 font-mono text-xs font-bold uppercase tracking-wider">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    Dedicated with Sincere Gratitude & Respect
                  </div>

                  <blockquote className="text-sm sm:text-base text-slate-800 font-sans leading-relaxed italic border-l-4 border-amber-400 pl-4 py-1">
                    &ldquo;Everything I have learned about Smart Money Concepts, institutional algorithmic delivery, and real-market execution is owed to the dedication, free mentorship, and masterclasses of <strong>Trader Abdullah Masood</strong>. His ability to distill Michael Huddleston&apos;s ICT concepts into crystal-clear, actionable, and repeatable frameworks—especially for Gold (XAUUSD), NASDAQ, and Daily Bias—has transformed the way thousands of traders around the world understand price delivery.&rdquo;
                  </blockquote>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    This entire digital academy, interactive chart laboratory, and textbook engine is built in tribute to the foundational clarity and high-probability principles taught on his channel. If you are serious about advancing your trading journey, we encourage every student to study his full catalog of lectures, live trading sessions, and mentorship series.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:scale-105"
                    >
                      <Youtube className="w-4 h-4 fill-current" />
                      Subscribe to @TraderAbdullahMasood on YouTube
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setActiveTab('curriculum')}
                      className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-mono text-xs font-bold flex items-center gap-2 transition-all"
                    >
                      <BookOpen className="w-4 h-4" />
                      Explore His Core Curriculum Breakdown
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 Pillars Learned From Trader Abdullah Masood */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  Core Breakthrough Lessons & Paradigms Learned from His Channel
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-amber-400 transition-colors space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-800">
                      <div className="w-6 h-6 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      The 4-Pillar Daily Bias Engine
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      Never guess direction on lower timeframes. Daily Bias is rooted mechanically in <strong>Previous Day High/Low (PDH/PDL)</strong>, the <strong>00:00 NY Midnight Open</strong>, and the <strong>20/40/60-day IPDA macro draw on liquidity</strong>.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-amber-400 transition-colors space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-800">
                      <div className="w-6 h-6 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      The Gold Legacy (XAUUSD Precision)
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      Gold has extreme volatility and will intentionally sweep the Asian Range high/low before initiating true London and New York expansion runs. Patience for the Judas Swing is mandatory.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-amber-400 transition-colors space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-sky-800">
                      <div className="w-6 h-6 rounded-lg bg-sky-200 text-sky-900 flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      Inducement (IDM) vs Genuine Liquidity
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      Retail SMC traders fail because they mark the very first internal Order Block. Abdullah Masood teaches waiting for the internal inducement (IDM) to be swept before taking high-probability POI entries.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-amber-400 transition-colors space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-800">
                      <div className="w-6 h-6 rounded-lg bg-emerald-200 text-emerald-900 flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      Time & Price Discipline
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      Price without Time is meaningless. Only execute during the precision Killzone windows (London 02:00-05:00 NY, NY AM 07:00-10:00 NY, NY PM Silver Bullet 14:00-15:00 NY) with strict 1% risk discipline.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Jump CTA */}
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-200 flex items-center justify-center text-amber-900 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-900">Study Chapter 23 in the Digital Bible</div>
                    <div className="text-[11px] text-slate-600">Complete breakdown of Abdullah Masood&apos;s Daily Bias & Gold SMC Playbook</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    if (onSelectChapter) onSelectChapter(23);
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 shadow-sm"
                >
                  <span>Open Chapter 23</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: CURRICULUM BREAKDOWN */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                    Channel Playlists & Mentorship Tracks
                  </h3>
                  <p className="text-xs text-slate-600">
                    Curriculum structure taught across comprehensive lectures on @TraderAbdullahMasood
                  </p>
                </div>
                <a
                  href={`${channelUrl}/playlists`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1.5 underline"
                >
                  View All Playlists on YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {keyCurriculumTracks.map((track, idx) => {
                  const Icon = track.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-amber-400 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider bg-white border border-slate-200 text-slate-700">
                              {track.tag}
                            </span>
                            <h4 className="text-sm font-bold font-display text-slate-900 mt-0.5">{track.title}</h4>
                          </div>
                        </div>

                        {onSelectConcept && (
                          <button
                            onClick={() => {
                              onClose();
                              onSelectConcept(track.conceptLink);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <span>Study Concept</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {track.description}
                      </p>

                      <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-1.5">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          Core Masteries Taught:
                        </div>
                        {track.coreTeachings.map((teaching, tIdx) => (
                          <div key={tIdx} className="text-xs text-slate-700 flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                            <span>{teaching}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DAILY BIAS INTERACTIVE CHECKLIST */}
          {activeTab === 'daily_bias_checklist' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  Pre-Market Execution Filter (Abdullah Masood Model)
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Run through this 6-step checklist before opening any trade. If you cannot check all 6 criteria, institutional conditions are not met.
                </p>
              </div>

              <div className="space-y-3">
                {dailyBiasChecklist.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-amber-50/80 border-amber-400 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 transition-colors shrink-0 ${
                        isChecked ? 'bg-amber-500 text-white' : 'border border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <div className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider">
                          {item.category}
                        </div>
                        <div className={`text-xs font-bold font-mono mt-0.5 transition-colors ${
                          isChecked ? 'text-slate-900' : 'text-slate-700'
                        }`}>
                          {item.question}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 font-sans leading-relaxed">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress feedback */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-800">
                    Checklist Completion: {Object.values(checkedItems).filter(Boolean).length} / {dailyBiasChecklist.length}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {Object.values(checkedItems).filter(Boolean).length === dailyBiasChecklist.length
                      ? '✓ High-probability institutional setup confirmed.'
                      : 'Complete all steps before placing capital at risk.'}
                  </div>
                </div>

                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Youtube className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Daily Bias Lectures</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-mono">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Honoring <strong>@TraderAbdullahMasood</strong> for educating the global trading community.</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 hover:text-amber-900 font-mono font-bold flex items-center gap-1"
            >
              <span>youtube.com/@TraderAbdullahMasood</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-mono font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
