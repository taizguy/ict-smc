import React, { useState } from 'react';
import { 
  Youtube, 
  ExternalLink, 
  Heart, 
  Sparkles, 
  Award, 
  BookOpen, 
  Target, 
  Star, 
  GraduationCap,
  TrendingUp,
  BarChart2,
  Check,
  ArrowRight,
  Flame,
  CheckCircle2,
  Lightbulb,
  X
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';

interface MentorSpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept?: (conceptId: string) => void;
  onSelectChapter?: (chapterId: number) => void;
  onOpenMasoodAcademy?: () => void;
}

export const MentorSpotlight: React.FC<MentorSpotlightProps> = ({
  isOpen,
  onClose,
  onSelectConcept,
  onSelectChapter,
  onOpenMasoodAcademy
}) => {
  const [activeTab, setActiveTab] = useState<'tribute' | 'curriculum' | 'daily_bias_checklist'>('tribute');
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
      accent: "bg-[#1040C0] text-white",
      description: "Mastering mechanical 4-pillar daily bias determination using Previous Day High/Low (PDH/PDL), Midnight Open (00:00 NY), and IPDA 20/40/60-day macro draw on liquidity.",
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
      accent: "bg-[#D02020] text-white",
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
      accent: "bg-[#F0C020] text-[#121212]",
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
      accent: "bg-[#121212] text-white",
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
      category: '1. HIGHER TIMEFRAME CONTEXT',
      question: 'Is the Weekly / Daily Draw on Liquidity (DOL) clearly identified?',
      detail: 'Identify whether price is reaching for an old HTF High/Low, Weekly FVG, or Daily Imbalance.'
    },
    {
      id: 'pdh_pdl',
      category: '2. PREVIOUS DAY BOUNDARIES',
      question: 'Have you marked the Previous Day High (PDH) and Previous Day Low (PDL)?',
      detail: 'Price frequently sweeps the PDH/PDL in London/NY before reversing or using it as a springboard.'
    },
    {
      id: 'midnight',
      category: '3. MIDNIGHT OPEN BENCHMARK',
      question: 'Where is price trading relative to 00:00 NY Midnight Open?',
      detail: 'For bullish days, the best buy opportunities occur BELOW Midnight Open (Discount). For bearish days, look for sells ABOVE Midnight Open (Premium).'
    },
    {
      id: 'asian_range',
      category: '4. ASIAN SESSION RANGE (20:00 - 00:00 NY)',
      question: 'Has the Asian Session High or Low been swept by a Judas Swing?',
      detail: 'London session often manipulates price past the Asian range extremes before expanding in the true daily direction.'
    },
    {
      id: 'inducement',
      category: '5. INDUCEMENT & POI CHECK',
      question: 'Has internal inducement (IDM) been purged before entering the POI?',
      detail: 'Ensure you are not taking the first internal Order Block; wait for the liquidity sweep of internal stops.'
    },
    {
      id: 'time_window',
      category: '6. TIME & PRICE (KILLZONE RULE)',
      question: 'Are you trading strictly inside a designated Killzone?',
      detail: 'London Killzone (02:00 - 05:00 NY), NY AM Killzone (07:00 - 10:00 NY), or NY PM Silver Bullet (14:00 - 15:00 NY).'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border-4 border-[#121212] shadow-[12px_12px_0px_0px_#121212] rounded-none overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Bauhaus Poster Header */}
        <div className="bg-[#F0F0F0] p-6 sm:p-8 border-b-4 border-[#121212] relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#D02020] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] shrink-0 flex items-center justify-center">
                <Youtube className="w-8 h-8 fill-current stroke-[2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-none text-[10px] font-mono font-black uppercase tracking-widest bg-[#F0C020] text-[#121212] border border-[#121212]">
                    MENTOR SPOTLIGHT
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#121212] tracking-tight mt-1">
                  TRADER ABDULLAH MASOOD
                </h1>
                <p className="text-xs text-[#121212]/70 font-mono font-bold uppercase mt-0.5">
                  @TraderAbdullahMasood // ICT &amp; SMC Master Educator
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              {onOpenMasoodAcademy && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenMasoodAcademy();
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-none bg-[#1040C0] hover:bg-blue-700 text-white font-mono text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                >
                  <span>OPEN ACADEMY (52 LESSONS)</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-none bg-white text-[#121212] hover:bg-[#D02020] hover:text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="mt-6 pt-4 border-t-2 border-[#121212]">
            <BauhausNavScroller innerClassName="gap-2" showArrowsAlways={false}>
              <button
                onClick={() => setActiveTab('tribute')}
                className={`px-4 py-2 rounded-none text-xs font-mono font-black uppercase tracking-wider transition-all border-2 border-[#121212] cursor-pointer shrink-0 ${
                  activeTab === 'tribute'
                    ? 'bg-[#D02020] text-white shadow-[3px_3px_0px_0px_#121212]'
                    : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                }`}
              >
                TRIBUTE &amp; DEDICATION
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`px-4 py-2 rounded-none text-xs font-mono font-black uppercase tracking-wider transition-all border-2 border-[#121212] cursor-pointer shrink-0 ${
                  activeTab === 'curriculum'
                    ? 'bg-[#1040C0] text-white shadow-[3px_3px_0px_0px_#121212]'
                    : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                }`}
              >
                KEY MENTORSHIP TRACKS
              </button>
              <button
                onClick={() => setActiveTab('daily_bias_checklist')}
                className={`px-4 py-2 rounded-none text-xs font-mono font-black uppercase tracking-wider transition-all border-2 border-[#121212] cursor-pointer shrink-0 ${
                  activeTab === 'daily_bias_checklist'
                    ? 'bg-[#F0C020] text-[#121212] shadow-[3px_3px_0px_0px_#121212]'
                    : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                }`}
              >
                PRE-MARKET CHECKLIST
              </button>
            </BauhausNavScroller>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white">
          
          {/* TAB 1: TRIBUTE & ACKNOWLEDGEMENT */}
          {activeTab === 'tribute' && (
            <div className="space-y-6">
              
              {/* Personal Dedication Message */}
              <div className="bg-[#FFF9C4] border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] rounded-none p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-[#D02020] font-mono text-xs font-black uppercase tracking-wider">
                  <Heart className="w-4 h-4 fill-current stroke-[2.5]" />
                  DEDICATED WITH SINCERE GRATITUDE &amp; RESPECT
                </div>

                <blockquote className="text-base sm:text-lg text-[#121212] font-black uppercase tracking-tight leading-relaxed border-l-4 border-[#D02020] pl-4 py-1">
                  &ldquo;Everything codified in this platform regarding Smart Money Concepts, institutional algorithmic delivery, and execution is owed to the dedication, free mentorship, and masterclasses of Trader Abdullah Masood.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-[#121212] font-medium leading-relaxed">
                  His ability to distill Michael Huddleston&apos;s ICT concepts into crystal-clear, actionable, and repeatable frameworks—especially for Gold (XAUUSD), NASDAQ, and Daily Bias—has transformed how thousands understand price delivery.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-none bg-[#D02020] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>SUBSCRIBE ON YOUTUBE</span>
                    <ExternalLink className="w-3.5 h-3.5 stroke-[3]" />
                  </a>
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className="px-5 py-2.5 rounded-none bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>EXPLORE CURRICULUM</span>
                  </button>
                </div>
              </div>

              {/* 4 Pillars Learned From Trader Abdullah Masood */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-black uppercase tracking-widest text-[#121212] flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#F0C020] fill-[#F0C020] stroke-[#121212]" />
                  CORE BREAKTHROUGH LESSONS LEARNED FROM HIS CHANNEL
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#F0F0F0] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] rounded-none p-5 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#121212]">
                      <div className="w-6 h-6 rounded-none bg-[#1040C0] text-white border border-[#121212] flex items-center justify-center text-xs font-black">
                        1
                      </div>
                      4-PILLAR DAILY BIAS ENGINE
                    </div>
                    <p className="text-xs text-[#121212] font-medium leading-relaxed">
                      Daily Bias is rooted mechanically in Previous Day High/Low (PDH/PDL), the 00:00 NY Midnight Open, and the 20/40/60-day IPDA macro draw on liquidity.
                    </p>
                  </div>

                  <div className="bg-[#F0F0F0] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] rounded-none p-5 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#121212]">
                      <div className="w-6 h-6 rounded-none bg-[#D02020] text-white border border-[#121212] flex items-center justify-center text-xs font-black">
                        2
                      </div>
                      THE GOLD LEGACY (XAUUSD)
                    </div>
                    <p className="text-xs text-[#121212] font-medium leading-relaxed">
                      Gold has extreme volatility and intentionally sweeps the Asian Range high/low before initiating true London and New York expansion runs.
                    </p>
                  </div>

                  <div className="bg-[#F0F0F0] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] rounded-none p-5 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#121212]">
                      <div className="w-6 h-6 rounded-none bg-[#F0C020] text-[#121212] border border-[#121212] flex items-center justify-center text-xs font-black">
                        3
                      </div>
                      INDUCEMENT (IDM) VS LIQUIDITY
                    </div>
                    <p className="text-xs text-[#121212] font-medium leading-relaxed">
                      Retail SMC traders fail because they mark the very first internal Order Block. Wait for the internal inducement (IDM) to be swept before entering.
                    </p>
                  </div>

                  <div className="bg-[#F0F0F0] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] rounded-none p-5 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#121212]">
                      <div className="w-6 h-6 rounded-none bg-[#121212] text-white border border-[#121212] flex items-center justify-center text-xs font-black">
                        4
                      </div>
                      TIME &amp; PRICE DISCIPLINE
                    </div>
                    <p className="text-xs text-[#121212] font-medium leading-relaxed">
                      Price without Time is meaningless. Only execute during precision Killzone windows (London, NY AM, NY PM Silver Bullet) with strict 1% risk rules.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Jump CTA */}
              <div className="bg-[#F0F0F0] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] rounded-none p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-[#F0C020] border-2 border-[#121212] flex items-center justify-center text-[#121212] shrink-0">
                    <BookOpen className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-black uppercase text-[#121212]">
                      STUDY CHAPTER 23 IN DIGITAL BIBLE
                    </div>
                    <div className="text-xs text-[#121212]/70 font-medium">
                      Complete breakdown of Abdullah Masood&apos;s Daily Bias &amp; Gold SMC Playbook
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    if (onSelectChapter) onSelectChapter(23);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-none bg-[#1040C0] hover:bg-blue-700 text-white font-mono text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                >
                  <span>OPEN CHAPTER 23</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: CURRICULUM BREAKDOWN */}
          {activeTab === 'curriculum' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b-2 border-[#121212] pb-2">
                <div>
                  <h3 className="text-xs font-mono font-black uppercase tracking-widest text-[#D02020]">
                    CHANNEL PLAYLISTS &amp; MENTORSHIP TRACKS
                  </h3>
                  <p className="text-xs text-[#121212]/70 font-medium">
                    Curriculum structure taught across comprehensive lectures on @TraderAbdullahMasood
                  </p>
                </div>
                <a
                  href={`${channelUrl}/playlists`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#1040C0] hover:text-[#D02020] font-black uppercase flex items-center gap-1.5 underline"
                >
                  YOUTUBE PLAYLISTS <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                </a>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {keyCurriculumTracks.map((track, idx) => {
                  const Icon = track.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-[#F0F0F0] border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] rounded-none p-6 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-none border-2 border-[#121212] flex items-center justify-center shrink-0 ${track.accent}`}>
                            <Icon className="w-5 h-5 stroke-[2.5]" />
                          </div>
                          <div>
                            <span className="px-2 py-0.5 rounded-none text-[9px] font-mono font-black tracking-wider bg-white border border-[#121212] text-[#121212]">
                              {track.tag}
                            </span>
                            <h4 className="text-base font-black text-[#121212] uppercase tracking-tight mt-0.5">
                              {track.title}
                            </h4>
                          </div>
                        </div>

                        {onSelectConcept && (
                          <button
                            onClick={() => {
                              onClose();
                              onSelectConcept(track.conceptLink);
                            }}
                            className="px-4 py-2 rounded-none bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>STUDY CONCEPT</span>
                            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-[#121212] leading-relaxed font-medium">
                        {track.description}
                      </p>

                      <div className="bg-white rounded-none p-4 border-2 border-[#121212] space-y-2">
                        <div className="text-[10px] font-mono font-black uppercase tracking-widest text-[#121212]/60">
                          CORE MASTERIES TAUGHT:
                        </div>
                        {track.coreTeachings.map((teaching, tIdx) => (
                          <div key={tIdx} className="text-xs text-[#121212] font-medium flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#D02020] stroke-[3] mt-0.5 shrink-0" />
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
            <div className="space-y-6">
              <div className="bg-[#FFF9C4] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] rounded-none p-5">
                <div className="flex items-center gap-2 text-[#D02020] font-mono text-xs font-black uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 stroke-[3]" />
                  PRE-MARKET EXECUTION FILTER (ABDULLAH MASOOD MODEL)
                </div>
                <p className="text-xs text-[#121212] font-medium mt-1">
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
                      className={`p-4 sm:p-5 rounded-none border-4 cursor-pointer transition-all flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-[#F0C020] border-[#121212] shadow-[4px_4px_0px_0px_#121212]'
                          : 'bg-[#F0F0F0] border-[#121212] shadow-[2px_2px_0px_0px_#121212] hover:bg-white'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-none border-2 border-[#121212] flex items-center justify-center mt-0.5 shrink-0 ${
                        isChecked ? 'bg-[#121212] text-white' : 'bg-white'
                      }`}>
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <div className="text-[10px] font-mono font-black text-[#121212]/70 uppercase tracking-widest">
                          {item.category}
                        </div>
                        <div className="text-xs sm:text-sm font-black text-[#121212] uppercase tracking-tight mt-0.5">
                          {item.question}
                        </div>
                        <div className="text-xs text-[#121212]/80 mt-1 font-medium leading-relaxed">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress feedback */}
              <div className="bg-[#F0F0F0] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] rounded-none p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-mono font-black uppercase text-[#121212]">
                    CHECKLIST COMPLETION: {Object.values(checkedItems).filter(Boolean).length} / {dailyBiasChecklist.length}
                  </div>
                  <div className="text-xs text-[#121212]/70 font-medium">
                    {Object.values(checkedItems).filter(Boolean).length === dailyBiasChecklist.length
                      ? '✓ HIGH-PROBABILITY INSTITUTIONAL SETUP CONFIRMED.'
                      : 'Complete all steps before placing capital at risk.'}
                  </div>
                </div>

                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-none bg-[#D02020] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-center gap-2"
                >
                  <Youtube className="w-4 h-4" />
                  <span>WATCH DAILY BIAS LECTURES</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F0F0F0] px-6 py-4 border-t-4 border-[#121212] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#121212] font-mono font-bold">
            <Heart className="w-4 h-4 text-[#D02020] fill-[#D02020]" />
            <span>Honoring <strong>@TraderAbdullahMasood</strong> for educating the global community.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-none bg-[#121212] hover:bg-[#D02020] text-white font-mono text-xs font-black uppercase tracking-wider border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MentorSpotlight;
