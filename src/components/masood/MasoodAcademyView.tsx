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
    <div className="space-y-8 pb-24">
      {/* Bauhaus Hero Poster Header */}
      <ScrollReveal y={35} duration={0.6}>
        <section className="bg-[#11141B] border border-white/[0.08] rounded-2xl text-[#F5F7FA] p-6 sm:p-10 relative overflow-hidden space-y-6">
          
          {/* Geometric Corner Element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B7A] border-l-4 border-b-4 border-white/[0.08] pointer-events-none hidden sm:flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/[0.06] text-[#F0B35B] border border-white/[0.08]" />
          </div>

          <div className="space-y-4 max-w-4xl">
            {/* Metadata badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-black uppercase tracking-widest bg-[#FF6B7A] text-white border border-white/[0.08] ">
                <Youtube className="w-4 h-4 fill-white text-white" />
                EXCLUSIVE MENTORSHIP SERIES
              </span>
              <span className="text-xs font-mono font-black uppercase tracking-wider text-[#F5F7FA] bg-white/[0.06] text-[#F0B35B] px-3 py-1 border border-white/[0.08] ">
                TRADER ABDULLAH MASOOD
              </span>
              <span className="text-xs font-mono font-bold uppercase text-white bg-[#5865FF] px-3 py-1 border border-white/[0.08] ">
                {allLectures.length} LECTURES • 6 PLAYLISTS
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5F7FA] leading-none">
              ABDULLAH MASOOD <span className="bg-[#FF6B7A] text-white px-2 py-0.5 inline-block">ACADEMY</span>
            </h1>

            <p className="text-sm sm:text-base text-[#F5F7FA] font-medium leading-relaxed max-w-3xl">
              A comprehensive, structured curriculum of Trader Abdullah Masood’s institutional ICT education. Kept completely separate from ICT’s foundational syllabus for clarity, organizing lectures into Beginner's Guide, Advanced Systems, 2025 Daily Bias, The Godfather's Sanctum, Prop Risk &amp; Psychology, and the 44-session SMC Syndicate.
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://www.youtube.com/@TraderAbdullahMasood"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B7A] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider border border-white/[0.08]  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <Youtube className="w-4 h-4" />
                <span>YOUTUBE CHANNEL</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 stroke-[3]" />
              </a>

              <button
                onClick={() => setActiveTab('animations')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-white/[0.06] text-[#F0B35B] text-[#F5F7FA] text-xs font-black uppercase tracking-wider border border-white/[0.08]  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#5865FF] stroke-[2.5]" />
                <span>ANIMATED EXPLAINERS</span>
              </button>

              <button
                onClick={() => setActiveTab('bias_calc')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-white/[0.06] text-[#F0B35B] text-[#F5F7FA] text-xs font-black uppercase tracking-wider border border-white/[0.08]  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#FF6B7A] stroke-[2.5]" />
                <span>DAILY BIAS ENGINE</span>
              </button>

              <button
                onClick={() => setActiveTab('rules')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-white/[0.06] text-[#F0B35B] text-[#F5F7FA] text-xs font-black uppercase tracking-wider border border-white/[0.08]  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <Shield className="w-4 h-4 text-[#5865FF] stroke-[2.5]" />
                <span>10 GOLDEN RULES</span>
              </button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Main Navigation Sub-Bar & Search */}
      <ScrollReveal y={25} delay={0.1}>
        <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl text-[#F5F7FA] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Navigation Mode Tabs with Arrows */}
          <div className="flex-1 min-w-0">
            <BauhausNavScroller innerClassName="gap-2" showArrowsAlways={true}>
              {[
                { id: 'lectures', label: `LECTURE LIBRARY (${allLectures.length})`, icon: BookOpen },
                { id: 'animations', label: 'ANIMATED EXPLAINERS', icon: Sparkles },
                { id: 'bias_calc', label: 'BIAS CALCULATOR', icon: Zap },
                { id: 'rules', label: 'GOLDEN RULES', icon: Shield },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border border-white/[0.08] cursor-pointer shrink-0 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                      isActive
                        ? 'bg-[#5865FF] text-white  -translate-y-0.5'
                        : 'bg-white/[0.03] text-[#F5F7FA] hover:bg-white/[0.06] text-[#F0B35B] '
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </BauhausNavScroller>
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F5F7FA] stroke-[2.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH LECTURES & RULES..."
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-[#151923] border border-white/[0.08] rounded-xl text-xs font-bold uppercase tracking-wider text-[#F5F7FA] placeholder-[#121212]/50 focus:outline-none focus:bg-white "
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#F5F7FA] hover:text-[#FF6B7A]"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* VIEW 1: LECTURE LIBRARY WITH PLAYLIST SECTIONS */}
      {activeTab === 'lectures' && (
        <div className="space-y-8">
          {/* Playlist filter pills with Forward/Backward Navigation Arrows */}
          <ScrollReveal y={20} delay={0.1}>
            <div className="p-2 bg-white rounded-xl border border-white/[0.08] ">
              <BauhausNavScroller innerClassName="gap-2" showArrowsAlways={true}>
              <button
                onClick={() => setActivePlaylistId('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider whitespace-nowrap shrink-0 border border-white/[0.08] transition-all cursor-pointer ${
                  activePlaylistId === 'all'
                    ? 'bg-[#FF6B7A] text-white '
                    : 'bg-white/[0.03] text-[#F5F7FA] hover:bg-white/[0.06] text-[#F0B35B]'
                }`}
              >
                <span>ALL PLAYLISTS</span>
                <span className={`px-2 py-0.5 text-[10px] font-mono font-black border border-white/[0.08] ${
                  activePlaylistId === 'all' ? 'bg-white text-[#F5F7FA]' : 'bg-[#121212] text-white'
                }`}>
                  {allLectures.length}
                </span>
              </button>

              {masoodPlaylistsData.map((pl) => (
                <button
                  key={pl.id}
                  onClick={() => setActivePlaylistId(pl.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider whitespace-nowrap shrink-0 border border-white/[0.08] transition-all cursor-pointer ${
                    activePlaylistId === pl.id
                      ? 'bg-[#5865FF] text-white '
                      : 'bg-white/[0.03] text-[#F5F7FA] hover:bg-white/[0.06] text-[#F0B35B]'
                  }`}
                >
                  <span>{pl.title.split(' - ')[0]}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-black border border-white/[0.08] ${
                    activePlaylistId === pl.id ? 'bg-white text-[#F5F7FA]' : 'bg-[#121212] text-white'
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
            <ScrollReveal key={playlist.id} y={30} delay={0.15}>
              <div className="space-y-6">
                <div className="p-6 sm:p-8 bg-[#11141B] border border-white/[0.08] rounded-2xl text-[#F5F7FA] rounded-xl  space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-4 border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-xl bg-white/[0.06] text-[#F0B35B] text-[#F5F7FA] text-xs font-mono font-black uppercase border border-white/[0.08] ">
                        {playlist.badge}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-[#F5F7FA] uppercase tracking-tight">
                        {playlist.title}
                      </h2>
                    </div>
                    <span className="text-xs font-mono font-black uppercase text-white bg-[#121212] px-3 py-1 border border-white/[0.08]">
                      {playlist.lectures.length} LECTURES
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F5F7FA] font-medium leading-relaxed">
                    {playlist.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-[#F5F7FA]">
                    <span>TARGET AUDIENCE: {playlist.targetAudience}</span>
                  </div>
                </div>

                {/* Lecture Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {playlist.lectures
                  .filter((lec) => filteredLectures.some((fl) => fl.id === lec.id))
                  .map((lecture) => (
                    <div
                      key={lecture.id}
                      className="bg-[#11141B] border border-white/[0.08] rounded-2xl text-[#F5F7FA] rounded-xl  flex flex-col justify-between overflow-hidden hover:-translate-y-1 transition-transform"
                    >
                      {/* Thumbnail Header */}
                      <div className="relative aspect-video bg-[#121212] overflow-hidden border-b-4 border-white/[0.08]">
                        <img
                          src={`https://i.ytimg.com/vi/${lecture.youtubeId}/hqdefault.jpg`}
                          alt={lecture.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        
                        {/* Lecture Badge */}
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xl text-[11px] font-mono font-black bg-[#121212] text-[#F0C020] border border-white/[0.08]">
                          LEC #{lecture.lectureNumber}
                        </span>

                        {/* YouTube direct link */}
                        <a
                          href={`https://www.youtube.com/watch?v=${lecture.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-3 right-3 p-1.5 rounded-xl bg-[#FF6B7A] text-white border border-white/[0.08]  hover:bg-red-700"
                          title="Watch on YouTube"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Youtube className="w-4 h-4" />
                        </a>

                        {/* Center Play Button */}
                        <button
                          onClick={() => setSelectedLecture(lecture)}
                          className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-white/[0.06] text-[#F0B35B] text-[#F5F7FA] border border-white/[0.08]  flex items-center justify-center group-hover:bg-[#FF6B7A] group-hover:text-white transition-colors">
                            <Play className="w-5 h-5 fill-current ml-0.5 stroke-[2.5]" />
                          </div>
                        </button>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="font-black text-[#F5F7FA] text-sm sm:text-base leading-snug uppercase tracking-tight">
                            {lecture.title}
                          </h3>
                          <p className="text-xs text-[#9BA1AE] mt-2 line-clamp-2 leading-relaxed font-medium">
                            {lecture.shortSummary}
                          </p>
                        </div>

                        {/* Core Takeaway Banner */}
                        <div className="text-[11px] text-[#F5F7FA] bg-white/[0.02] border border-white/[0.08] p-3 rounded-xl border border-white/[0.08]  space-y-1">
                          <div className="font-black uppercase text-[#FF6B7A] flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                            <span>CORE TAKEAWAY</span>
                          </div>
                          <p className="line-clamp-2 font-bold leading-normal">
                            {lecture.keyTakeaways[0]}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-3 flex items-center justify-between gap-2 border-t-2 border-white/[0.08] text-xs">
                          <button
                            onClick={() => setSelectedLecture(lecture)}
                            className="text-[#5865FF] font-black uppercase tracking-wider hover:text-[#FF6B7A] flex items-center gap-1 cursor-pointer"
                          >
                            <span>STUDY LESSON</span>
                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                          </button>

                          {lecture.animationType && (
                            <button
                              onClick={() => {
                                setActiveAnimation(lecture.animationType!);
                                setActiveTab('animations');
                              }}
                              className="text-[#F5F7FA] font-mono font-black text-[10px] uppercase flex items-center gap-1 bg-white/[0.06] text-[#F0B35B] px-2.5 py-1 rounded-xl border border-white/[0.08]  hover:bg-yellow-300 cursor-pointer"
                            >
                              <Sparkles className="w-3 h-3 stroke-[2.5]" />
                              <span>ANIMATION</span>
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
        <ScrollReveal y={30}>
          <div className="space-y-6">
            <div className="p-5 bg-[#5865FF] text-white border border-white/[0.08]  rounded-xl text-xs flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#F0C020] shrink-0 mt-0.5 stroke-[2.5]" />
              <div>
                <strong className="block text-sm font-black uppercase tracking-wider mb-1">
                  DYNAMIC VISUAL LEARNING ENGINE
                </strong>
                Animated simulations illustrating Trader Abdullah Masood’s core teachings: Power of 3 (PO3), Seek &amp; Destroy stop runs, SMT Divergences, Market Maker Models (MMXM), Volume Imbalances, and the 24-Hour Killzone clock.
              </div>
            </div>

            <MasoodAnimatedExplainer initialType={activeAnimation} />
          </div>
        </ScrollReveal>
      )}

      {/* VIEW 3: DAILY BIAS CALCULATOR */}
      {activeTab === 'bias_calc' && (
        <ScrollReveal y={30}>
          <div className="max-w-4xl mx-auto bg-[#11141B] border border-white/[0.08] rounded-2xl text-[#F5F7FA] p-6 sm:p-10 space-y-8">
          <div className="border-b-4 border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl text-xs font-mono font-black uppercase bg-white/[0.06] text-[#F0B35B] text-[#F5F7FA] border border-white/[0.08]">
                MECHANICAL CHECKLIST ENGINE
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#F5F7FA] uppercase tracking-tight mt-2">
              ABDULLAH MASOOD 4-STEP DAILY BIAS ENGINE
            </h3>
            <p className="text-xs sm:text-sm text-[#F5F7FA] mt-1 font-medium">
              Select today's market conditions across the 4 institutional gates to calculate objective daily directional bias.
            </p>
          </div>

          <div className="space-y-6 text-sm">
            {/* Gate 1 */}
            <div className="space-y-2">
              <label className="font-black text-[#F5F7FA] uppercase font-mono text-xs block">
                GATE 1: HIGHER TIMEFRAME (DAILY/4H) DRAW ON LIQUIDITY
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
                    className={`p-4 rounded-xl border border-white/[0.08] text-left text-xs transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                      calcStep1 === opt.id
                        ? 'bg-[#5865FF] text-white  -translate-y-0.5 font-bold'
                        : 'bg-white/[0.03] text-[#F5F7FA] hover:bg-white/[0.06] text-[#F0B35B] '
                    }`}
                  >
                    <div className="font-black uppercase tracking-tight">{opt.label}</div>
                    <div className={`text-[11px] font-mono mt-1 ${calcStep1 === opt.id ? 'text-white/80' : 'text-[#656B78]'}`}>
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gate 2 */}
            <div className="space-y-2">
              <label className="font-black text-[#F5F7FA] uppercase font-mono text-xs block">
                GATE 2: LOCATION RELATIVE TO 00:00 MIDNIGHT NY OPEN
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
                    className={`p-4 rounded-xl border border-white/[0.08] text-left text-xs transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                      calcStep2 === opt.id
                        ? 'bg-[#5865FF] text-white  -translate-y-0.5 font-bold'
                        : 'bg-white/[0.03] text-[#F5F7FA] hover:bg-white/[0.06] text-[#F0B35B] '
                    }`}
                  >
                    <div className="font-black uppercase tracking-tight">{opt.label}</div>
                    <div className={`text-[11px] font-mono mt-1 ${calcStep2 === opt.id ? 'text-white/80' : 'text-[#656B78]'}`}>
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gate 3 */}
            <div className="space-y-2">
              <label className="font-black text-[#F5F7FA] uppercase font-mono text-xs block">
                GATE 3: PRE-MARKET &amp; SESSION LIQUIDITY SWEEP STATUS
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
                    className={`p-4 rounded-xl border border-white/[0.08] text-left text-xs transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                      calcStep3 === opt.id
                        ? 'bg-[#5865FF] text-white  -translate-y-0.5 font-bold'
                        : 'bg-white/[0.03] text-[#F5F7FA] hover:bg-white/[0.06] text-[#F0B35B] '
                    }`}
                  >
                    <div className="font-black uppercase tracking-tight">{opt.label}</div>
                    <div className={`text-[11px] font-mono mt-1 ${calcStep3 === opt.id ? 'text-white/80' : 'text-[#656B78]'}`}>
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gate 4 */}
            <div className="space-y-2">
              <label className="font-black text-[#F5F7FA] uppercase font-mono text-xs block">
                GATE 4: HIGH-IMPACT RED FOLDER ECONOMIC CALENDAR
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'clear', label: 'CALENDAR CLEAR (OR >15 MINS AWAY)', desc: 'Safe for Algorithmic Execution' },
                  { id: 'red_folder_now', label: 'RED FOLDER WITHIN 5 MINS (CPI/NFP/FOMC)', desc: 'STAND ASIDE & PRESERVE CAPITAL' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcStep4(opt.id as any)}
                    className={`p-4 rounded-xl border border-white/[0.08] text-left text-xs transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                      calcStep4 === opt.id
                        ? 'bg-[#FF6B7A] text-white  -translate-y-0.5 font-bold'
                        : 'bg-white/[0.03] text-[#F5F7FA] hover:bg-white/[0.06] text-[#F0B35B] '
                    }`}
                  >
                    <div className="font-black uppercase tracking-tight">{opt.label}</div>
                    <div className={`text-[11px] font-mono mt-1 ${calcStep4 === opt.id ? 'text-white/80' : 'text-[#656B78]'}`}>
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Output Card */}
          <div className="p-6 rounded-xl bg-white/[0.03] text-[#F5F7FA] border border-white/[0.08]  space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black uppercase text-[#9BA1AE]">
                CALCULATED INSTITUTIONAL OUTPUT
              </span>
              <span className="text-xs font-mono font-black text-[#FF6B7A] bg-white px-2.5 py-1 border border-white/[0.08]">
                CONFIDENCE: {Math.abs(biasScore)}%
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              {calcStep4 === 'red_folder_now' ? (
                <span className="text-[#FF6B7A] flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 stroke-[3]" />
                  STAND ASIDE — RED FOLDER NEWS TRAP
                </span>
              ) : biasScore >= 60 ? (
                <span className="text-[#5865FF] flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                  STRONG BULLISH BIAS (DISCOUNT LONGS)
                </span>
              ) : biasScore <= -60 ? (
                <span className="text-[#FF6B7A] flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                  STRONG BEARISH BIAS (PREMIUM SHORTS)
                </span>
              ) : (
                <span className="text-[#F5F7FA] flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-[#F0C020] stroke-[3]" />
                  NEUTRAL / AMBIGUOUS (WAIT FOR 15M DISPLACEMENT)
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#F5F7FA] font-medium leading-relaxed">
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
        <ScrollReveal y={30}>
          <div className="space-y-6">
          <div className="p-6 sm:p-10 bg-[#11141B] border border-white/[0.08] rounded-2xl text-[#F5F7FA] space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-4 border-white/[0.08]">
              <span className="w-4 h-4 bg-[#FF6B7A] inline-block border border-black" />
              <h3 className="text-xl sm:text-2xl font-black text-[#F5F7FA] uppercase tracking-tight">
                TRADER ABDULLAH MASOOD: 10 IRONCLAD TRADING RULES
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#F5F7FA] font-medium leading-relaxed">
              These 10 mechanical rules form the bedrock of Trader Abdullah Masood’s personal profitability and funded account consistency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
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
                  className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]  space-y-2 hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#5865FF] text-white border border-white/[0.08] font-mono text-xs flex items-center justify-center font-black shrink-0">
                      0{item.num}
                    </span>
                    <span className="font-black text-[#F5F7FA] text-sm uppercase tracking-tight">
                      {item.rule}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed font-medium pl-11">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </ScrollReveal>
      )}

      {/* LECTURE STUDY MODAL - Bauhaus Style */}
      {selectedLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl text-[#F5F7FA]  rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b-4 border-white/[0.08] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-black bg-[#FF6B7A] text-white border border-white/[0.08]">
                  LEC #{selectedLecture.lectureNumber}
                </span>
                <span className="text-xs font-mono font-bold uppercase text-[#F5F7FA]">
                  {selectedLecture.playlistType.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={() => setSelectedLecture(null)}
                className="p-1.5 rounded-xl bg-white/[0.03] hover:bg-[#FF6B7A] hover:text-white text-[#F5F7FA] border border-white/[0.08] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[3]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Video Embed */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/[0.08] ">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedLecture.youtubeId}`}
                  title={selectedLecture.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#F5F7FA]">
                  {selectedLecture.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#F5F7FA] mt-2 leading-relaxed font-medium">
                  {selectedLecture.shortSummary}
                </p>
                {selectedLecture.bilingualNotes && (
                  <div className="mt-2 text-xs font-bold text-[#F5F7FA] bg-white/[0.02] border border-white/[0.08] px-3 py-1.5 rounded-xl border border-white/[0.08] inline-block font-mono">
                    Urdu/Hindi Note: {selectedLecture.bilingualNotes}
                  </div>
                )}
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2">
                <h4 className="font-black text-sm text-[#F5F7FA] uppercase flex items-center gap-2 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#5865FF] stroke-[3]" />
                  KEY INSTITUTIONAL TAKEAWAYS
                </h4>
                <ul className="space-y-2 text-xs text-[#F5F7FA]">
                  {selectedLecture.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/[0.03] p-3 rounded-xl border border-white/[0.08] font-medium">
                      <span className="w-2 h-2 rounded-xl bg-[#5865FF] shrink-0 mt-1.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Rules */}
              <div className="space-y-2">
                <h4 className="font-black text-sm text-[#F5F7FA] uppercase flex items-center gap-2 font-mono">
                  <Shield className="w-4 h-4 text-[#FF6B7A] stroke-[3]" />
                  ABDULLAH MASOOD EXECUTION RULES
                </h4>
                <div className="space-y-2 text-xs">
                  {selectedLecture.coreRules.map((rule, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] border border-white/[0.08] text-[#F5F7FA] font-bold">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trading Checklist */}
              <div className="space-y-2">
                <h4 className="font-black text-sm text-[#F5F7FA] uppercase flex items-center gap-2 font-mono">
                  <CheckSquare className="w-4 h-4 text-[#5865FF] stroke-[3]" />
                  PRE-TRADE CHECKLIST
                </h4>
                <div className="space-y-2 text-xs">
                  {selectedLecture.tradingChecklist.map((item, i) => (
                    <label key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA] font-medium cursor-pointer hover:bg-white/[0.06] text-[#F0B35B] transition-colors">
                      <input type="checkbox" className="rounded-xl text-[#5865FF] border border-white/[0.08] w-4 h-4" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="space-y-2">
                <h4 className="font-black text-sm text-[#F5F7FA] uppercase flex items-center gap-2 font-mono">
                  <AlertTriangle className="w-4 h-4 text-[#FF6B7A] stroke-[3]" />
                  COMMON RETAIL PITFALLS
                </h4>
                <ul className="space-y-2 text-xs text-[#F5F7FA]">
                  {selectedLecture.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/[0.03] p-3 rounded-xl border border-white/[0.08] font-medium">
                      <span className="w-2 h-2 rounded-xl bg-[#FF6B7A] shrink-0 mt-1.5" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Exercise */}
              <div className="p-4 rounded-xl bg-white/[0.06] text-[#F0B35B] border border-white/[0.08] text-xs space-y-1">
                <span className="font-black text-[#F5F7FA] uppercase font-mono text-[11px] block">
                  PRACTICAL HOMEWORK ASSIGNMENT
                </span>
                <p className="text-[#F5F7FA] font-bold leading-relaxed">
                  {selectedLecture.practicalExercise}
                </p>
              </div>

              {/* Open in YouTube external */}
              <div className="flex justify-end gap-3 pt-2">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedLecture.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6B7A] hover:bg-red-700 text-white text-xs font-mono font-black uppercase tracking-wider border border-white/[0.08]  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                >
                  <Youtube className="w-4 h-4" />
                  <span>OPEN VIDEO ON YOUTUBE</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[3]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasoodAcademyView;
