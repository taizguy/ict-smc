import React, { useState, useEffect } from 'react';
import { 
  Youtube, 
  ExternalLink, 
  Heart, 
  Sparkles, 
  BookOpen, 
  Target, 
  Star, 
  TrendingUp, 
  BarChart2, 
  Check, 
  Flame, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';
import { useModalScrollLock } from '../hooks/useSmoothScroll';

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
  onOpenMasoodAcademy
}) => {
  const [activeTab, setActiveTab] = useState<'tribute' | 'curriculum' | 'daily_bias_checklist'>('tribute');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useModalScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
      accent: "text-[#5865FF]",
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
      accent: "text-[#FF6B7A]",
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
      accent: "text-[#55E6D1]",
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
      accent: "text-[#F0B35B]",
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto text-[#F5F7FA]"
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-label="Mentor Tribute Spotlight"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#11141B] border border-white/[0.1] rounded-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl my-auto"
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#0C0E13] p-6 sm:p-8 border-b border-white/[0.08] relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#FF6B7A] shrink-0 flex items-center justify-center">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#55E6D1]">
                    MENTOR SPOTLIGHT
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-semibold uppercase text-[#F5F7FA] tracking-tight mt-0.5">
                  Trader Abdullah Masood
                </h1>
                <p className="text-xs text-[#9BA1AE] font-mono mt-0.5">
                  @TraderAbdullahMasood · ICT &amp; SMC Master Educator
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
                  className="btn-predikt-primary text-xs"
                >
                  <span>Open Academy (52)</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-[#9BA1AE] hover:text-[#F5F7FA] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="mt-6 pt-4 border-t border-white/[0.06]">
            <BauhausNavScroller innerClassName="gap-2" showArrowsAlways={false}>
              <button
                onClick={() => setActiveTab('tribute')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer shrink-0 ${
                  activeTab === 'tribute'
                    ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                    : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06]'
                }`}
              >
                Tribute &amp; Dedication
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer shrink-0 ${
                  activeTab === 'curriculum'
                    ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                    : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06]'
                }`}
              >
                Key Mentorship Tracks
              </button>
              <button
                onClick={() => setActiveTab('daily_bias_checklist')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer shrink-0 ${
                  activeTab === 'daily_bias_checklist'
                    ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                    : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06]'
                }`}
              >
                Pre-Market Checklist
              </button>
            </BauhausNavScroller>
          </div>
        </div>

        {/* Modal Body */}
        <div 
          className="flex-1 min-h-0 modal-scrollable p-6 sm:p-8 space-y-6 bg-[#11141B]"
          data-lenis-prevent="true"
        >
          
          {/* TAB 1: TRIBUTE & ACKNOWLEDGEMENT */}
          {activeTab === 'tribute' && (
            <div className="space-y-6">
              
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-[#55E6D1] font-mono text-xs uppercase tracking-wider">
                  <Heart className="w-4 h-4 fill-current" />
                  DEDICATED WITH SINCERE GRATITUDE &amp; RESPECT
                </div>

                <blockquote className="text-sm sm:text-base text-[#F5F7FA] font-medium leading-relaxed border-l-2 border-[#5865FF] pl-4 py-1 italic">
                  &ldquo;Everything codified in this platform regarding Smart Money Concepts, institutional algorithmic delivery, and execution is owed to the dedication, free mentorship, and masterclasses of Trader Abdullah Masood.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-[#9BA1AE] font-normal leading-relaxed">
                  His ability to distill Michael Huddleston&apos;s ICT concepts into crystal-clear, actionable, and repeatable frameworks—especially for Gold (XAUUSD), NASDAQ, and Daily Bias—has transformed how thousands understand price delivery.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-predikt-primary text-xs"
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>Subscribe on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className="btn-predikt-secondary text-xs"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Explore Curriculum</span>
                  </button>
                </div>
              </div>

              {/* 4 Pillars Learned */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-[0.16em] text-[#656B78] flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-[#F0B35B]" />
                  CORE BREAKTHROUGH LESSONS LEARNED FROM HIS CHANNEL
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151923] border border-white/[0.07] rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA]">
                      <div className="w-5 h-5 rounded bg-[#5865FF]/15 text-[#5865FF] flex items-center justify-center text-xs font-semibold">
                        1
                      </div>
                      4-PILLAR DAILY BIAS ENGINE
                    </div>
                    <p className="text-xs text-[#9BA1AE] font-normal leading-relaxed">
                      Daily Bias is rooted mechanically in Previous Day High/Low (PDH/PDL), the 00:00 NY Midnight Open, and the 20/40/60-day IPDA macro draw on liquidity.
                    </p>
                  </div>

                  <div className="bg-[#151923] border border-white/[0.07] rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA]">
                      <div className="w-5 h-5 rounded bg-[#FF6B7A]/15 text-[#FF6B7A] flex items-center justify-center text-xs font-semibold">
                        2
                      </div>
                      THE GOLD LEGACY (XAUUSD)
                    </div>
                    <p className="text-xs text-[#9BA1AE] font-normal leading-relaxed">
                      Gold has extreme volatility and intentionally sweeps the Asian Range high/low before initiating true London and New York expansion runs.
                    </p>
                  </div>

                  <div className="bg-[#151923] border border-white/[0.07] rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA]">
                      <div className="w-5 h-5 rounded bg-[#55E6D1]/15 text-[#55E6D1] flex items-center justify-center text-xs font-semibold">
                        3
                      </div>
                      INDUCEMENT (IDM) CLARITY
                    </div>
                    <p className="text-xs text-[#9BA1AE] font-normal leading-relaxed">
                      Never enter on the first internal Order Block. Wait for price to take out internal inducement (minor pullback lows/highs) before reacting to the valid POI.
                    </p>
                  </div>

                  <div className="bg-[#151923] border border-white/[0.07] rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA]">
                      <div className="w-5 h-5 rounded bg-[#F0B35B]/15 text-[#F0B35B] flex items-center justify-center text-xs font-semibold">
                        4
                      </div>
                      TIME &amp; NEWS KILLZONES
                    </div>
                    <p className="text-xs text-[#9BA1AE] font-normal leading-relaxed">
                      Timing is king. High-probability institutional setups only deliver inside designated session Killzones and around macroeconomic news release catalysts.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: KEY MENTORSHIP TRACKS */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <p className="text-xs text-[#9BA1AE]">
                Core lecture series codified from Trader Abdullah Masood&apos;s channel:
              </p>

              <div className="space-y-4">
                {keyCurriculumTracks.map((track, idx) => {
                  const Icon = track.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${track.accent}`} />
                          <h4 className="text-sm sm:text-base font-semibold text-[#F5F7FA]">
                            {track.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono uppercase bg-white/[0.04] text-[#9BA1AE] px-2.5 py-0.5 rounded border border-white/[0.06]">
                          {track.tag}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed">
                        {track.description}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono uppercase text-[#656B78] block">
                          Core Principles:
                        </span>
                        <ul className="space-y-1 text-xs text-[#F5F7FA]/90">
                          {track.coreTeachings.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <span className="text-[#5865FF] font-mono">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {onSelectConcept && (
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              onClose();
                              onSelectConcept(track.conceptLink);
                            }}
                            className="text-xs font-mono text-[#55E6D1] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Study {track.title.split('-')[0]}</span>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DAILY BIAS CHECKLIST */}
          {activeTab === 'daily_bias_checklist' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-1">
                <div className="text-xs font-mono text-[#5865FF] uppercase font-semibold">
                  TRADER ABDULLAH MASOOD PRE-MARKET BIAS CHECKLIST
                </div>
                <p className="text-xs text-[#9BA1AE]">
                  Verify each institutional checkpoint before entering the session.
                </p>
              </div>

              <div className="space-y-3">
                {dailyBiasChecklist.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div 
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                        isChecked 
                          ? 'bg-emerald-500/5 border-emerald-500/30' 
                          : 'bg-white/[0.02] border-white/[0.07] hover:border-white/[0.14]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                        isChecked 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-white/20 bg-white/[0.04]'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase text-[#656B78]">
                          {item.category}
                        </div>
                        <div className={`text-xs sm:text-sm font-medium ${isChecked ? 'text-emerald-200' : 'text-[#F5F7FA]'}`}>
                          {item.question}
                        </div>
                        <p className="text-xs text-[#9BA1AE] leading-relaxed font-light">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MentorSpotlight;
