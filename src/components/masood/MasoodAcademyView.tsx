import React, { useState, useMemo } from 'react';
import { 
  masoodPlaylistsData 
} from '../../data/masoodData';
import { MasoodLecture, MasoodPlaylist, MasoodPlaylistId } from '../../types';
import { MasoodAnimatedExplainer, AnimationKind } from './MasoodAnimatedExplainer';
import { 
  Youtube, BookOpen, Sparkles, CheckCircle2, AlertTriangle, 
  ExternalLink, Search, Play, Award, Zap, Compass, 
  Clock, Shield, ArrowRight, X, Layers, CheckSquare
} from 'lucide-react';
import { BauhausNavScroller } from '../BauhausNavScroller';
import { ScrollReveal } from '../ScrollReveal';

export const MasoodAcademyView: React.FC = () => {
  const [activePlaylistId, setActivePlaylistId] = useState<'all' | MasoodPlaylistId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLecture, setSelectedLecture] = useState<MasoodLecture | null>(null);
  const [activeAnimation, setActiveAnimation] = useState<AnimationKind>('po3_expansion');
  const [activeTab, setActiveTab] = useState<'lectures' | 'animations' | 'bias_calc' | 'rules'>('lectures');

  // Bias calculator state
  const [calcStep1, setCalcStep1] = useState<'bullish' | 'bearish' | 'unclear'>('bullish');
  const [calcStep2, setCalcStep2] = useState<'discount' | 'premium' | 'at_open'>('discount');
  const [calcStep3, setCalcStep3] = useState<'swept_low' | 'swept_high' | 'no_sweep'>('swept_low');
  const [calcStep4, setCalcStep4] = useState<'clear' | 'red_folder_now'>('clear');

  // Filtered lectures
  const currentPlaylists = useMemo(() => {
    if (activePlaylistId === 'all') return masoodPlaylistsData;
    return masoodPlaylistsData.filter((p) => p.id === activePlaylistId);
  }, [activePlaylistId]);

  const allLectures = useMemo(() => {
    return masoodPlaylistsData.flatMap((p) => p.lectures);
  }, []);

  const filteredLectures = useMemo(() => {
    return allLectures.filter((lec) => {
      const matchesPlaylist = activePlaylistId === 'all' || lec.playlistType === activePlaylistId;
      const q = searchQuery.toLowerCase();
      const matchesQuery = 
        !q ||
        lec.title.toLowerCase().includes(q) ||
        lec.shortSummary.toLowerCase().includes(q) ||
        lec.keyTakeaways.some((t) => t.toLowerCase().includes(q)) ||
        lec.coreRules.some((r) => r.toLowerCase().includes(q));
      return matchesPlaylist && matchesQuery;
    });
  }, [allLectures, activePlaylistId, searchQuery]);

  // Daily bias score logic
  const biasScore = useMemo(() => {
    let score = 0;
    if (calcStep1 === 'bullish') score += 35;
    if (calcStep1 === 'bearish') score -= 35;

    if (calcStep2 === 'discount' && calcStep1 === 'bullish') score += 25;
    if (calcStep2 === 'premium' && calcStep1 === 'bearish') score -= 25;

    if (calcStep3 === 'swept_low' && calcStep1 === 'bullish') score += 25;
    if (calcStep3 === 'swept_high' && calcStep1 === 'bearish') score -= 25;

    if (calcStep4 === 'red_folder_now') score = 0; // Red folder invalidates execution

    return score;
  }, [calcStep1, calcStep2, calcStep3, calcStep4]);

  return (
    <div className="space-y-8 pb-24 text-[#F5F7FA]">
      {/* Editorial Hero Header */}
      <ScrollReveal y={30} duration={0.6}>
        <section className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-6">
          <div className="space-y-4 max-w-4xl">
            {/* Metadata badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#FF6B7A]/10 text-[#FF6B7A] border border-[#FF6B7A]/20">
                <Youtube className="w-3.5 h-3.5 fill-current" />
                Exclusive Mentorship Series
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#F0B35B] bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.08]">
                Trader Abdullah Masood
              </span>
              <span className="text-xs font-mono uppercase text-[#55E6D1] bg-[#55E6D1]/10 px-3 py-1 rounded-full border border-[#55E6D1]/20">
                {allLectures.length} Lectures • 6 Playlists
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#F5F7FA] leading-none">
              ABDULLAH MASOOD <span className="text-[#5865FF]">ACADEMY</span>
            </h1>

            <p className="text-sm sm:text-base text-[#9BA1AE] leading-relaxed max-w-3xl">
              A comprehensive, structured curriculum of Trader Abdullah Masood’s institutional ICT education. Kept completely separate from ICT’s foundational syllabus for clarity, organizing lectures into Beginner's Guide, Advanced Systems, 2025 Daily Bias, The Godfather's Sanctum, Prop Risk &amp; Psychology, and the 44-session SMC Syndicate.
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.youtube.com/@TraderAbdullahMasood"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5865FF] hover:bg-[#4752E6] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#5865FF]/20"
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube Channel</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                onClick={() => setActiveTab('animations')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#F5F7FA] text-xs font-mono uppercase tracking-wider border border-white/[0.08] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#55E6D1]" />
                <span>Animated Explainers</span>
              </button>

              <button
                onClick={() => setActiveTab('bias_calc')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#F5F7FA] text-xs font-mono uppercase tracking-wider border border-white/[0.08] transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#F0B35B]" />
                <span>Daily Bias Engine</span>
              </button>

              <button
                onClick={() => setActiveTab('rules')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#F5F7FA] text-xs font-mono uppercase tracking-wider border border-white/[0.08] transition-all cursor-pointer"
              >
                <Shield className="w-4 h-4 text-[#5865FF]" />
                <span>10 Golden Rules</span>
              </button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Main Navigation Sub-Bar & Search */}
      <ScrollReveal y={20} delay={0.1}>
        <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Navigation Mode Tabs */}
          <div className="flex-1 min-w-0">
            <BauhausNavScroller innerClassName="gap-2" showArrowsAlways={true}>
              {[
                { id: 'lectures', label: `Lecture Library (${allLectures.length})`, icon: BookOpen },
                { id: 'animations', label: 'Animated Explainers', icon: Sparkles },
                { id: 'bias_calc', label: 'Bias Calculator', icon: Zap },
                { id: 'rules', label: 'Golden Rules', icon: Shield },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20 shadow-sm'
                        : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </BauhausNavScroller>
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#656B78]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lectures & rules..."
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-[#151923] border border-white/[0.08] text-xs font-mono text-[#F5F7FA] placeholder-[#656B78] focus:outline-none focus:border-[#5865FF]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9BA1AE] hover:text-[#F5F7FA]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* VIEW 1: LECTURE LIBRARY WITH PLAYLIST SECTIONS */}
      {activeTab === 'lectures' && (
        <div className="space-y-8">
          {/* Playlist filter pills */}
          <ScrollReveal y={15} delay={0.1}>
            <div className="p-2.5 bg-[#11141B] rounded-2xl border border-white/[0.08]">
              <BauhausNavScroller innerClassName="gap-2" showArrowsAlways={true}>
                <button
                  onClick={() => setActivePlaylistId('all')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap shrink-0 border transition-all cursor-pointer ${
                    activePlaylistId === 'all'
                      ? 'bg-[#5865FF] text-white border-[#5865FF]'
                      : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
                  }`}
                >
                  <span>All Playlists</span>
                  <span className={`px-2 py-0.5 text-[10px] font-mono rounded-md ${
                    activePlaylistId === 'all' ? 'bg-white/20 text-white' : 'bg-white/[0.04] text-[#656B78]'
                  }`}>
                    {allLectures.length}
                  </span>
                </button>

                {masoodPlaylistsData.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => setActivePlaylistId(pl.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap shrink-0 border transition-all cursor-pointer ${
                      activePlaylistId === pl.id
                        ? 'bg-[#5865FF] text-white border-[#5865FF]'
                        : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{pl.title.split(' - ')[0]}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-mono rounded-md ${
                      activePlaylistId === pl.id ? 'bg-white/20 text-white' : 'bg-white/[0.04] text-[#656B78]'
                    }`}>
                      {pl.lectures.length}
                    </span>
                  </button>
                ))}
              </BauhausNavScroller>
            </div>
          </ScrollReveal>

          {/* Active Playlist Header Card */}
          {currentPlaylists.map((playlist) => (
            <ScrollReveal key={playlist.id} y={25} delay={0.15}>
              <div className="space-y-6">
                <div className="p-6 sm:p-8 bg-[#11141B] border border-white/[0.08] rounded-2xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.07]">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#5865FF]/10 text-[#5865FF] border border-[#5865FF]/20 text-[10px] font-mono uppercase">
                        {playlist.badge}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                        {playlist.title}
                      </h2>
                    </div>
                    <span className="text-xs font-mono uppercase text-[#9BA1AE] bg-white/[0.04] px-3 py-1 rounded-lg border border-white/[0.08]">
                      {playlist.lectures.length} Lectures
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed">
                    {playlist.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#656B78]">
                    <span>TARGET AUDIENCE: {playlist.targetAudience}</span>
                  </div>
                </div>

                {/* Lecture Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {playlist.lectures
                    .filter((lec) => filteredLectures.some((fl) => fl.id === lec.id))
                    .map((lecture) => (
                      <div
                        key={lecture.id}
                        className="bg-[#11141B] border border-white/[0.08] rounded-2xl flex flex-col justify-between overflow-hidden hover:border-white/20 transition-all"
                      >
                        {/* Thumbnail Header */}
                        <div className="relative aspect-video bg-[#0C0E13] overflow-hidden border-b border-white/[0.08]">
                          <img
                            src={`https://i.ytimg.com/vi/${lecture.youtubeId}/hqdefault.jpg`}
                            alt={lecture.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          
                          {/* Lecture Badge */}
                          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-black/70 backdrop-blur-sm text-[#55E6D1] border border-white/10">
                            LEC #{lecture.lectureNumber}
                          </span>

                          {/* YouTube direct link */}
                          <a
                            href={`https://www.youtube.com/watch?v=${lecture.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white border border-white/10 hover:bg-[#FF6B7A] transition-colors"
                            title="Watch on YouTube"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Youtube className="w-3.5 h-3.5" />
                          </a>

                          {/* Center Play Button */}
                          <button
                            onClick={() => setSelectedLecture(lecture)}
                            className="absolute inset-0 flex items-center justify-center cursor-pointer group bg-black/20 hover:bg-black/40 transition-colors"
                          >
                            <div className="w-11 h-11 rounded-full bg-white/[0.1] backdrop-blur-md text-white border border-white/20 flex items-center justify-center group-hover:bg-[#5865FF] group-hover:scale-105 transition-all">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          </button>
                        </div>

                        {/* Content Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h3 className="font-semibold text-[#F5F7FA] text-sm leading-snug line-clamp-2">
                              {lecture.title}
                            </h3>
                            <p className="text-xs text-[#9BA1AE] mt-2 line-clamp-2 leading-relaxed">
                              {lecture.shortSummary}
                            </p>
                          </div>

                          {/* Core Takeaway Banner */}
                          <div className="text-[11px] text-[#9BA1AE] bg-[#151923] border border-white/[0.06] p-3 rounded-xl space-y-1">
                            <div className="font-mono text-[10px] uppercase text-[#55E6D1] flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Core Takeaway</span>
                            </div>
                            <p className="line-clamp-2 leading-normal text-[#F5F7FA]">
                              {lecture.keyTakeaways[0]}
                            </p>
                          </div>

                          {/* Action buttons */}
                          <div className="pt-3 flex items-center justify-between gap-2 border-t border-white/[0.06] text-xs">
                            <button
                              onClick={() => setSelectedLecture(lecture)}
                              className="text-[#5865FF] hover:text-[#55E6D1] font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span>Study Lesson</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            {lecture.animationType && (
                              <button
                                onClick={() => {
                                  setActiveAnimation(lecture.animationType!);
                                  setActiveTab('animations');
                                }}
                                className="text-[10px] font-mono uppercase flex items-center gap-1 bg-white/[0.04] hover:bg-white/[0.08] text-[#F0B35B] px-2.5 py-1 rounded-lg border border-white/[0.08] cursor-pointer transition-colors"
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>Animation</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* VIEW 2: ANIMATED DEMONSTRATORS */}
      {activeTab === 'animations' && (
        <ScrollReveal y={25}>
          <div className="space-y-6">
            <div className="p-5 bg-[#11141B] text-[#F5F7FA] border border-white/[0.08] rounded-2xl text-xs flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#55E6D1] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-semibold uppercase tracking-wider mb-1 text-[#F5F7FA]">
                  Dynamic Visual Learning Engine
                </strong>
                <span className="text-[#9BA1AE]">
                  Animated simulations illustrating Trader Abdullah Masood’s core teachings: Power of 3 (PO3), Seek &amp; Destroy stop runs, SMT Divergences, Market Maker Models (MMXM), Volume Imbalances, and the 24-Hour Killzone clock.
                </span>
              </div>
            </div>

            <MasoodAnimatedExplainer initialType={activeAnimation} />
          </div>
        </ScrollReveal>
      )}

      {/* VIEW 3: DAILY BIAS CALCULATOR */}
      {activeTab === 'bias_calc' && (
        <ScrollReveal y={25}>
          <div className="p-6 sm:p-10 bg-[#11141B] border border-white/[0.08] rounded-2xl space-y-8">
            <div className="border-b border-white/[0.07] pb-4">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#5865FF]/10 text-[#5865FF] border border-[#5865FF]/20">
                Gate Matrix Calculator
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA] mt-2">
                Abdullah Masood 4-Step Daily Bias Engine
              </h3>
              <p className="text-xs sm:text-sm text-[#9BA1AE] mt-1">
                Select today's market conditions across the 4 institutional gates to calculate objective daily directional bias.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              {/* Gate 1 */}
              <div className="space-y-2">
                <label className="text-[#9BA1AE] uppercase font-mono text-xs block">
                  Gate 1: Higher Timeframe (Daily/4H) Draw on Liquidity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'bullish', label: 'BULLISH (TARGETING BSL / DAILY FVG)', desc: 'Seeking Old Highs' },
                    { id: 'bearish', label: 'BEARISH (TARGETING SSL / DAILY FVG)', desc: 'Seeking Old Lows' },
                    { id: 'unclear', label: 'UNCLEAR / MIDDLE OF RANGE', desc: 'High Risk Chop' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCalcStep1(opt.id as any)}
                      className={`p-4 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        calcStep1 === opt.id
                          ? 'bg-[#5865FF]/15 border-[#5865FF] text-[#F5F7FA]'
                          : 'bg-[#151923] border-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="font-semibold uppercase tracking-tight text-xs">{opt.label}</div>
                      <div className="text-[11px] font-mono mt-1 text-[#656B78]">
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gate 2 */}
              <div className="space-y-2">
                <label className="text-[#9BA1AE] uppercase font-mono text-xs block">
                  Gate 2: Location Relative to 00:00 Midnight NY Open
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'discount', label: 'IN DISCOUNT (BELOW MIDNIGHT OPEN)', desc: 'Ideal for Bullish Entries' },
                    { id: 'premium', label: 'IN PREMIUM (ABOVE MIDNIGHT OPEN)', desc: 'Ideal for Bearish Entries' },
                    { id: 'at_open', label: 'AT MIDNIGHT OPEN', desc: 'Awaiting Judas Swing' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCalcStep2(opt.id as any)}
                      className={`p-4 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        calcStep2 === opt.id
                          ? 'bg-[#5865FF]/15 border-[#5865FF] text-[#F5F7FA]'
                          : 'bg-[#151923] border-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="font-semibold uppercase tracking-tight text-xs">{opt.label}</div>
                      <div className="text-[11px] font-mono mt-1 text-[#656B78]">
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gate 3 */}
              <div className="space-y-2">
                <label className="text-[#9BA1AE] uppercase font-mono text-xs block">
                  Gate 3: Pre-Market &amp; Session Liquidity Sweep Status
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'swept_low', label: 'SWEPT ASIAN / LONDON LOW', desc: 'Accumulation Complete' },
                    { id: 'swept_high', label: 'SWEPT ASIAN / LONDON HIGH', desc: 'Distribution Complete' },
                    { id: 'no_sweep', label: 'NO SWEEP YET', desc: 'Patience Required' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCalcStep3(opt.id as any)}
                      className={`p-4 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        calcStep3 === opt.id
                          ? 'bg-[#5865FF]/15 border-[#5865FF] text-[#F5F7FA]'
                          : 'bg-[#151923] border-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="font-semibold uppercase tracking-tight text-xs">{opt.label}</div>
                      <div className="text-[11px] font-mono mt-1 text-[#656B78]">
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gate 4 */}
              <div className="space-y-2">
                <label className="text-[#9BA1AE] uppercase font-mono text-xs block">
                  Gate 4: High-Impact Red Folder Economic Calendar
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'clear', label: 'CALENDAR CLEAR (OR >15 MINS AWAY)', desc: 'Safe for Algorithmic Execution' },
                    { id: 'red_folder_now', label: 'RED FOLDER WITHIN 5 MINS (CPI/NFP/FOMC)', desc: 'STAND ASIDE & PRESERVE CAPITAL' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCalcStep4(opt.id as any)}
                      className={`p-4 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        calcStep4 === opt.id
                          ? 'bg-[#FF6B7A]/15 border-[#FF6B7A] text-[#F5F7FA]'
                          : 'bg-[#151923] border-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="font-semibold uppercase tracking-tight text-xs">{opt.label}</div>
                      <div className="text-[11px] font-mono mt-1 text-[#656B78]">
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Output Card */}
            <div className="p-6 rounded-xl bg-[#0C0E13] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#656B78]">
                  Calculated Output
                </span>
                <span className="text-xs font-mono text-[#55E6D1] bg-[#55E6D1]/10 px-2.5 py-0.5 rounded border border-[#55E6D1]/20">
                  CONFIDENCE: {Math.abs(biasScore)}%
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-semibold tracking-tight flex items-center gap-2">
                {calcStep4 === 'red_folder_now' ? (
                  <span className="text-[#FF6B7A] flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    STAND ASIDE — RED FOLDER NEWS TRAP
                  </span>
                ) : biasScore >= 60 ? (
                  <span className="text-[#55E6D1] flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    STRONG BULLISH BIAS (DISCOUNT LONGS)
                  </span>
                ) : biasScore <= -60 ? (
                  <span className="text-[#FF6B7A] flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    STRONG BEARISH BIAS (PREMIUM SHORTS)
                  </span>
                ) : (
                  <span className="text-[#F0B35B] flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    NEUTRAL / AMBIGUOUS (WAIT FOR 15M DISPLACEMENT)
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed">
                {calcStep4 === 'red_folder_now'
                  ? "Abdullah Masood's Golden Rule: Never be in a trade 5 minutes before or after a Red Folder news event. Let the market sweep liquidity and wait for the subsequent FVG retest."
                  : biasScore >= 60
                  ? "All 4 institutional gates align for Bullish expansion. Wait for the 09:30 AM New York cash open, identify a 1M/5M Market Structure Shift with displacement, and enter on the first discount Fair Value Gap."
                  : biasScore <= -60
                  ? "All 4 institutional gates align for Bearish expansion. Look for price to rally into a premium PD Array, confirm 5M MSS downward, and target resting Sell-Side Liquidity."
                  : "Gates are conflicting. Do not force trades in ambiguous conditions; wait for lower timeframe structure to break with authority."}
              </p>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* VIEW 4: ABDULLAH MASOOD GOLDEN RULES */}
      {activeTab === 'rules' && (
        <ScrollReveal y={25}>
          <div className="space-y-6">
            <div className="p-6 sm:p-10 bg-[#11141B] border border-white/[0.08] rounded-2xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/[0.07]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5865FF]" />
                <h3 className="text-xl sm:text-2xl font-semibold text-[#F5F7FA] tracking-tight">
                  TRADER ABDULLAH MASOOD: 10 IRONCLAD TRADING RULES
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed">
                These 10 mechanical rules form the bedrock of Trader Abdullah Masood’s personal profitability and funded account consistency.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    num: 1,
                    rule: 'Max 2 Losses Per Day Rule',
                    desc: 'If you take 2 consecutive losses in a session, shut down TradingView immediately. Never attempt to "make it back" on the same day.'
                  },
                  {
                    num: 2,
                    rule: 'The Midnight New York Open Filter',
                    desc: 'If your daily bias is Bullish, NEVER buy above the 00:00 Midnight NY Open. Wait for the Judas Swing to dip into Discount.'
                  },
                  {
                    num: 3,
                    rule: 'The 5-Minute Red Folder Silence',
                    desc: 'Never enter a trade 5 minutes before or 5 minutes after a Red Folder event (CPI, NFP, FOMC). Let the whip complete, then trade the displacement.'
                  },
                  {
                    num: 4,
                    rule: 'Never Trade Consolidation After Big Moves',
                    desc: 'After an outsized 200+ point trend day, expect the next day to consolidate or form an Inside Day. Cut position size by 75% or stay flat.'
                  },
                  {
                    num: 5,
                    rule: 'The 3-Candle Institutional Swing Rule',
                    desc: 'A swing high or low is only valid if formed by 3 distinct fractal candles. Never eyeball random 1-minute chart wiggles.'
                  },
                  {
                    num: 6,
                    rule: 'Order Blocks Require Displacement & FVGs',
                    desc: 'An Order Block without an energetic Market Structure Shift and an accompanying Fair Value Gap is merely retail noise, not an institutional level.'
                  },
                  {
                    num: 7,
                    rule: 'Avoid Seek & Destroy Chop Days',
                    desc: 'When morning price action sweeps both the session high and session low with zero expansion, declare Seek & Destroy and step away.'
                  },
                  {
                    num: 8,
                    rule: 'SMT Divergence Confirmation',
                    desc: 'Always cross-check US100 (NQ) with US500 (ES). When one sweeps a swing point and the other fails, smart money is accumulating.'
                  },
                  {
                    num: 9,
                    rule: 'Candle Bodies vs. Wicks Principle',
                    desc: 'Candle bodies tell the true story of institutional volume; candle wicks do the damage by sweeping stops. A structural break requires a body close.'
                  },
                  {
                    num: 10,
                    rule: 'Fixed 0.5% - 1.0% Risk Capital Rule',
                    desc: 'Never risk more than 1% of your account per trade. Size your contracts according to the point distance to your invalidation stop loss.'
                  }
                ].map((item) => (
                  <div 
                    key={item.num} 
                    className="p-5 rounded-xl bg-[#151923] border border-white/[0.06] space-y-2 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#5865FF]/15 text-[#5865FF] border border-[#5865FF]/20 font-mono text-xs flex items-center justify-center font-semibold shrink-0">
                        0{item.num}
                      </span>
                      <span className="font-semibold text-[#F5F7FA] text-sm">
                        {item.rule}
                      </span>
                    </div>
                    <p className="text-xs text-[#9BA1AE] leading-relaxed pl-10">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* LECTURE STUDY MODAL */}
      {selectedLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#11141B] border border-white/[0.1] rounded-2xl text-[#F5F7FA] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#11141B] border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#5865FF]/10 text-[#5865FF] border border-[#5865FF]/20">
                  LEC #{selectedLecture.lectureNumber}
                </span>
                <span className="text-xs font-mono text-[#9BA1AE] uppercase">
                  {selectedLecture.playlistType.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={() => setSelectedLecture(null)}
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#9BA1AE] hover:text-[#F5F7FA] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Video Embed */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/[0.08]">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedLecture.youtubeId}`}
                  title={selectedLecture.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                  {selectedLecture.title}
                </h2>
                <div className="mt-2 text-xs text-[#55E6D1] bg-[#55E6D1]/10 border border-[#55E6D1]/20 px-3 py-1.5 rounded-lg inline-block font-mono">
                  {selectedLecture.playlistType.replace(/_/g, ' ').toUpperCase()}
                </div>
              </div>

              {/* Takeaways */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9BA1AE]">
                  Key Institutional Takeaways
                </h3>
                <ul className="space-y-2 text-xs">
                  {selectedLecture.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#151923] p-3 rounded-xl border border-white/[0.06] text-[#9BA1AE]">
                      <CheckCircle2 className="w-4 h-4 text-[#55E6D1] shrink-0 mt-0.5" />
                      <span className="text-[#F5F7FA]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Rules */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9BA1AE]">
                  Core Rules Taught in This Lecture
                </h3>
                <div className="space-y-2">
                  {selectedLecture.coreRules.map((rule, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#151923] border border-white/[0.06] text-[#F5F7FA] text-xs">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedLecture.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5865FF] hover:bg-[#4752E6] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#5865FF]/20"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  onClick={() => setSelectedLecture(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#9BA1AE] hover:text-[#F5F7FA] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasoodAcademyView;
