import { chapterCount, lectureCount } from '../utils/catalogCounts';
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
      accent: "text-brand",
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
      accent: "text-negative",
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
      accent: "text-teal",
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
      accent: "text-amber",
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/35 backdrop-blur-md overflow-y-auto text-ink"
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-label="Mentor Tribute Spotlight"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl bg-surface border border-ink/[0.1] rounded-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl my-auto"
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-surface-muted p-6 sm:p-8 border-b border-ink/[0.08] relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-ink/[0.04] border border-ink/[0.08] text-negative shrink-0 flex items-center justify-center">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[0.8125rem] font-sans tabular-nums uppercase tracking-[0.18em] text-teal">
                    MENTOR SPOTLIGHT
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-semibold uppercase text-ink tracking-tight mt-0.5">
                  Trader Abdullah Masood
                </h1>
                <p className="text-xs text-ink-secondary font-sans tabular-nums mt-0.5">
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
                  <span>Open Academy ({lectureCount})</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-ink/[0.04] hover:bg-ink/[0.1] text-ink-secondary hover:text-ink transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="mt-6 pt-4 border-t border-ink/[0.06]">
            <BauhausNavScroller innerClassName="gap-2" showArrowsAlways={false}>
              <button
                onClick={() => setActiveTab('tribute')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tabular-nums uppercase tracking-wider transition-all border cursor-pointer shrink-0 ${
                  activeTab === 'tribute'
                    ? 'bg-ink/[0.12] text-ink border-ink/20'
                    : 'bg-ink/[0.02] text-ink-secondary hover:text-ink border-ink/[0.06]'
                }`}
              >
                Tribute &amp; Dedication
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tabular-nums uppercase tracking-wider transition-all border cursor-pointer shrink-0 ${
                  activeTab === 'curriculum'
                    ? 'bg-ink/[0.12] text-ink border-ink/20'
                    : 'bg-ink/[0.02] text-ink-secondary hover:text-ink border-ink/[0.06]'
                }`}
              >
                Key Mentorship Tracks
              </button>
              <button
                onClick={() => setActiveTab('daily_bias_checklist')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tabular-nums uppercase tracking-wider transition-all border cursor-pointer shrink-0 ${
                  activeTab === 'daily_bias_checklist'
                    ? 'bg-ink/[0.12] text-ink border-ink/20'
                    : 'bg-ink/[0.02] text-ink-secondary hover:text-ink border-ink/[0.06]'
                }`}
              >
                Pre-Market Checklist
              </button>
            </BauhausNavScroller>
          </div>
        </div>

        {/* Modal Body */}
        <div 
          className="flex-1 min-h-0 modal-scrollable p-6 sm:p-8 space-y-6 bg-surface"
          data-lenis-prevent="true"
        >
          
          {/* TAB 1: TRIBUTE & ACKNOWLEDGEMENT */}
          {activeTab === 'tribute' && (
            <div className="space-y-6">
              
              <div className="bg-ink/[0.02] border border-ink/[0.08] rounded-xl p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-teal font-sans tabular-nums text-xs uppercase tracking-wider">
                  <Heart className="w-4 h-4 fill-current" />
                  DEDICATED WITH SINCERE GRATITUDE &amp; RESPECT
                </div>

                <blockquote className="text-sm sm:text-base text-ink font-medium leading-relaxed border-l-2 border-brand pl-4 py-1 italic">
                  &ldquo;Everything codified in this platform regarding Smart Money Concepts, institutional algorithmic delivery, and execution is owed to the dedication, free mentorship, and masterclasses of Trader Abdullah Masood.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-ink-secondary font-normal leading-relaxed">
                  His ability to distill Michael Huddleston&apos;s ICT concepts into crystal-clear, actionable, and repeatable frameworks—especially for Gold (XAUUSD), NASDAQ, and Daily Bias—has transformed how thousands understand price delivery.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-predikt-primary text-xs"
                  >
                    <Youtube className="w-4 h-4 text-red-700" />
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
                <h3 className="text-xs font-sans tabular-nums uppercase tracking-[0.16em] text-ink-muted flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber" />
                  CORE BREAKTHROUGH LESSONS LEARNED FROM HIS CHANNEL
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-raised border border-ink/[0.07] rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink">
                      <div className="w-5 h-5 rounded bg-brand/15 text-brand flex items-center justify-center text-xs font-semibold">
                        1
                      </div>
                      4-PILLAR DAILY BIAS ENGINE
                    </div>
                    <p className="text-xs text-ink-secondary font-normal leading-relaxed">
                      Daily Bias is rooted mechanically in Previous Day High/Low (PDH/PDL), the 00:00 NY Midnight Open, and the 20/40/60-day IPDA macro draw on liquidity.
                    </p>
                  </div>

                  <div className="bg-surface-raised border border-ink/[0.07] rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink">
                      <div className="w-5 h-5 rounded bg-negative/15 text-negative flex items-center justify-center text-xs font-semibold">
                        2
                      </div>
                      THE GOLD LEGACY (XAUUSD)
                    </div>
                    <p className="text-xs text-ink-secondary font-normal leading-relaxed">
                      Gold has extreme volatility and intentionally sweeps the Asian Range high/low before initiating true London and New York expansion runs.
                    </p>
                  </div>

                  <div className="bg-surface-raised border border-ink/[0.07] rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink">
                      <div className="w-5 h-5 rounded bg-teal/15 text-teal flex items-center justify-center text-xs font-semibold">
                        3
                      </div>
                      INDUCEMENT (IDM) CLARITY
                    </div>
                    <p className="text-xs text-ink-secondary font-normal leading-relaxed">
                      Never enter on the first internal Order Block. Wait for price to take out internal inducement (minor pullback lows/highs) before reacting to the valid POI.
                    </p>
                  </div>

                  <div className="bg-surface-raised border border-ink/[0.07] rounded-xl p-5 space-y-2">
                    <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink">
                      <div className="w-5 h-5 rounded bg-amber/15 text-amber flex items-center justify-center text-xs font-semibold">
                        4
                      </div>
                      TIME &amp; NEWS KILLZONES
                    </div>
                    <p className="text-xs text-ink-secondary font-normal leading-relaxed">
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
              <p className="text-xs text-ink-secondary">
                Core lecture series codified from Trader Abdullah Masood&apos;s channel:
              </p>

              <div className="space-y-4">
                {keyCurriculumTracks.map((track, idx) => {
                  const Icon = track.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-5 sm:p-6 rounded-xl bg-ink/[0.02] border border-ink/[0.07] space-y-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${track.accent}`} />
                          <h4 className="text-sm sm:text-base font-semibold text-ink">
                            {track.title}
                          </h4>
                        </div>
                        <span className="text-[0.8125rem] font-sans tabular-nums uppercase bg-ink/[0.04] text-ink-secondary px-2.5 py-0.5 rounded border border-ink/[0.06]">
                          {track.tag}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                        {track.description}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[0.8125rem] font-sans tabular-nums uppercase text-ink-muted block">
                          Core Principles:
                        </span>
                        <ul className="space-y-1 text-xs text-ink/90">
                          {track.coreTeachings.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <span className="text-brand font-sans tabular-nums">•</span>
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
                            className="text-xs font-sans tabular-nums text-teal hover:underline flex items-center gap-1 cursor-pointer"
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
              <div className="p-4 rounded-xl bg-ink/[0.02] border border-ink/[0.07] space-y-1">
                <div className="text-xs font-sans tabular-nums text-brand uppercase font-semibold">
                  TRADER ABDULLAH MASOOD PRE-MARKET BIAS CHECKLIST
                </div>
                <p className="text-xs text-ink-secondary">
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
                          : 'bg-ink/[0.02] border-ink/[0.07] hover:border-ink/[0.14]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                        isChecked 
                          ? 'bg-emerald-500 border-emerald-500 text-on-brand on-accent'
                          : 'border-ink/20 bg-ink/[0.04]'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-1">
                        <div className="text-[0.8125rem] font-sans tabular-nums uppercase text-ink-muted">
                          {item.category}
                        </div>
                        <div className={`text-xs sm:text-sm font-medium ${isChecked ? 'text-emerald-700' : 'text-ink'}`}>
                          {item.question}
                        </div>
                        <p className="text-xs text-ink-secondary leading-relaxed font-normal">
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
