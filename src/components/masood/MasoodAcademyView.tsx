import React, { useState, useMemo } from 'react';
import { 
  masoodPlaylistsData 
} from '../../data/masoodData';
import { MasoodLecture, MasoodPlaylist, MasoodPlaylistId } from '../../types';
import { MasoodAnimatedExplainer, AnimationKind } from './MasoodAnimatedExplainer';
import { 
  Youtube, BookOpen, Sparkles, CheckCircle2, AlertTriangle, 
  ExternalLink, Search, Filter, Play, Award, Zap, Compass, 
  Clock, Shield, ArrowRight, X, HelpCircle, Layers, CheckSquare, Flame, Target
} from 'lucide-react';

export const MasoodAcademyView: React.FC = () => {
  const [activePlaylistId, setActivePlaylistId] = useState<'all' | MasoodPlaylistId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLecture, setSelectedLecture] = useState<MasoodLecture | null>(null);
  const [activeAnimation, setActiveAnimation] = useState<AnimationKind>('po3_expansion');
  const [showBiasCalculator, setShowBiasCalculator] = useState<boolean>(false);
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
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Top Banner / Hero - Light Themed 2026 Glass Acrylic */}
      <div className="rounded-3xl glass-acrylic text-slate-900 p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-red-50 text-red-700 border border-red-200 shadow-xs">
              <Youtube className="w-4 h-4 fill-red-600 text-red-600" />
              EXCLUSIVE MENTORSHIP SERIES
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-xs">
              Trader Abdullah Masood
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
              {allLectures.length} Master Lectures • 6 Dedicated Playlists
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 font-display">
            Trader Abdullah Masood <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-600 to-sky-600">Academy</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl font-sans">
            A comprehensive, structured implementation of Trader Abdullah Masood’s viral trading education curricula. 
            Kept strictly separated from ICT’s primary curriculum, this suite organizes all lectures in chronological order across 
            <strong> 1) Beginner's Guide</strong>, <strong>2) Advanced Guide</strong>, <strong>3) 2025 ICT Daily Bias</strong>, 
            <strong> 4) The Godfather's Sanctum</strong>, <strong>5) Psychology & Prop Risk</strong>, and <strong>6) The SMC Syndicate (44 Live Sessions)</strong>, 
            complete with dynamic animated visual demonstrators, mechanical rulebooks, and interactive bias calculators.
          </p>

          {/* Quick stats and action buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://www.youtube.com/@TraderAbdullahMasood"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold shadow-md shadow-red-600/20 transition-all hover:scale-105"
            >
              <Youtube className="w-4 h-4" />
              <span>Official YouTube Channel</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <button
              onClick={() => setActiveTab('animations')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 text-xs font-mono font-bold border border-slate-200 shadow-xs transition-colors hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Interactive Animated Demonstrators</span>
            </button>

            <button
              onClick={() => setActiveTab('bias_calc')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 text-xs font-mono font-bold border border-slate-200 shadow-xs transition-colors hover:scale-105"
            >
              <Zap className="w-4 h-4 text-sky-600" />
              <span>Daily Bias Decision Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 text-xs font-mono font-bold border border-slate-200 shadow-xs transition-colors hover:scale-105"
            >
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Masood's Golden Rulebook</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Sub-Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        {/* Navigation Mode */}
        <div 
          onWheel={(e) => { 
            if (e.deltaY !== 0) {
              e.currentTarget.scrollLeft += e.deltaY;
            }
          }}
          className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {[
            { id: 'lectures', label: 'Lecture Library (52 Videos)', icon: BookOpen },
            { id: 'animations', label: 'Animated Demonstrators', icon: Sparkles },
            { id: 'bias_calc', label: 'Bias Calculator', icon: Zap },
            { id: 'rules', label: 'Golden Rules', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white stroke-[2.5]' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Masood lectures, topics, rules..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: LECTURE LIBRARY WITH PLAYLIST SECTIONS */}
      {activeTab === 'lectures' && (
        <div className="space-y-8">
          {/* Playlist filter pills with smooth scroll and mouse wheel support */}
          <div 
            onWheel={(e) => { 
              if (e.deltaY !== 0) {
                e.currentTarget.scrollLeft += e.deltaY;
              }
            }}
            className="flex items-center gap-2 p-2 glass-acrylic rounded-2xl border border-slate-200/80 overflow-x-auto scrollbar-thin scroll-smooth shadow-xs"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <button
              onClick={() => setActivePlaylistId('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap shrink-0 transition-all ${
                activePlaylistId === 'all'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white font-extrabold shadow-md shadow-sky-600/25 scale-[1.02]'
                  : 'bg-white/80 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white shadow-xs'
              }`}
            >
              <span>All Playlists</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activePlaylistId === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {allLectures.length}
              </span>
            </button>

            {masoodPlaylistsData.map((pl) => (
              <button
                key={pl.id}
                onClick={() => setActivePlaylistId(pl.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap shrink-0 transition-all ${
                  activePlaylistId === pl.id
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white font-extrabold shadow-md shadow-sky-600/25 scale-[1.02]'
                    : 'bg-white/80 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white shadow-xs'
                }`}
              >
                <span>{pl.title.split(' - ')[0]}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activePlaylistId === pl.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {pl.lectures.length}
                </span>
              </button>
            ))}
          </div>

          {/* Active Playlist Header Card */}
          {currentPlaylists.map((playlist) => (
            <div key={playlist.id} className="space-y-4">
              <div className="p-6 sm:p-7 card-2026 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 text-xs font-mono font-black border border-sky-200 shadow-xs">
                      {playlist.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                      {playlist.title}
                    </h2>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {playlist.lectures.length} Total Curated Master Lectures
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-sans">
                  {playlist.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
                  <span><strong>Target:</strong> {playlist.targetAudience}</span>
                </div>
              </div>

              {/* Lecture Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {playlist.lectures
                  .filter((lec) => filteredLectures.some((fl) => fl.id === lec.id))
                  .map((lecture) => (
                    <div
                      key={lecture.id}
                      className="card-2026 flex flex-col justify-between overflow-hidden group hover:border-sky-400 transition-all"
                    >
                      {/* Thumbnail Header with Play overlay */}
                      <div className="relative aspect-video bg-slate-900 overflow-hidden">
                        <img
                          src={`https://i.ytimg.com/vi/${lecture.youtubeId}/hqdefault.jpg`}
                          alt={lecture.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        
                        {/* Lecture Badge */}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-black/75 text-amber-300 backdrop-blur-sm border border-amber-400/30">
                          LEC #{lecture.lectureNumber}
                        </span>

                        {/* YouTube direct icon */}
                        <a
                          href={`https://www.youtube.com/watch?v=${lecture.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white transition-all hover:scale-110 shadow-md"
                          title="Watch on YouTube"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Youtube className="w-4 h-4" />
                        </a>

                        {/* Center Play Button to inspect */}
                        <button
                          onClick={() => setSelectedLecture(lecture)}
                          className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                        >
                          <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg group-hover:bg-sky-500 group-hover:text-white transition-colors">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </button>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-sky-600 transition-colors">
                            {lecture.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            {lecture.shortSummary}
                          </p>
                        </div>

                        {/* Core takeaway bullet */}
                        <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Core Institutional Takeaway</span>
                          </div>
                          <p className="line-clamp-2 text-slate-600">
                            {lecture.keyTakeaways[0]}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 text-xs">
                          <button
                            onClick={() => setSelectedLecture(lecture)}
                            className="text-sky-600 font-semibold hover:text-sky-800 flex items-center gap-1 transition-colors"
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
                              className="text-amber-700 font-mono text-[11px] flex items-center gap-1 hover:text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                            >
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              <span>View Animation</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: ANIMATED DEMONSTRATORS */}
      {activeTab === 'animations' && (
        <div className="space-y-6">
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl text-xs text-sky-900 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-bold text-sky-950">Dynamic Visual Learning Engine</strong>
              Animated simulations illustrating Trader Abdullah Masood’s core teachings: Power of 3 (PO3), Seek & Destroy stop runs, SMT Divergences, Market Maker Models (MMXM), Volume Imbalances, and the 24-Hour Killzone clock.
            </div>
          </div>

          <MasoodAnimatedExplainer initialType={activeAnimation} />
        </div>
      )}

      {/* VIEW 3: DAILY BIAS CALCULATOR */}
      {activeTab === 'bias_calc' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-sky-100 text-sky-800">
                MECHANICAL CHECKLIST ENGINE
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">
              Abdullah Masood 4-Step Daily Bias Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select today's market conditions across the 4 institutional gates to calculate objective daily directional bias.
            </p>
          </div>

          <div className="space-y-5 text-sm">
            {/* Gate 1 */}
            <div className="space-y-2">
              <label className="font-bold text-slate-900 block">
                Gate 1: Higher Timeframe (Daily/4H) Draw on Liquidity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bullish', label: 'Bullish (Targeting BSL / Daily FVG)', desc: 'Seeking Old Highs' },
                  { id: 'bearish', label: 'Bearish (Targeting SSL / Daily FVG)', desc: 'Seeking Old Lows' },
                  { id: 'unclear', label: 'Unclear / Middle of Range', desc: 'High Risk Chop' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcStep1(opt.id as any)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      calcStep1 === opt.id
                        ? 'border-sky-500 bg-sky-50 font-bold text-sky-900 ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold">{opt.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gate 2 */}
            <div className="space-y-2">
              <label className="font-bold text-slate-900 block">
                Gate 2: Location Relative to 00:00 Midnight NY Open
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'discount', label: 'In Discount (Below Midnight Open)', desc: 'Ideal for Bullish Entries' },
                  { id: 'premium', label: 'In Premium (Above Midnight Open)', desc: 'Ideal for Bearish Entries' },
                  { id: 'at_open', label: 'At Midnight Open', desc: 'Awaiting Judas Swing' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcStep2(opt.id as any)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      calcStep2 === opt.id
                        ? 'border-sky-500 bg-sky-50 font-bold text-sky-900 ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold">{opt.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gate 3 */}
            <div className="space-y-2">
              <label className="font-bold text-slate-900 block">
                Gate 3: Pre-Market & Session Liquidity Sweep Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'swept_low', label: 'Swept Asian / London Low', desc: 'Accumulation Complete' },
                  { id: 'swept_high', label: 'Swept Asian / London High', desc: 'Distribution Complete' },
                  { id: 'no_sweep', label: 'No Sweep Yet', desc: 'Patience Required' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcStep3(opt.id as any)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      calcStep3 === opt.id
                        ? 'border-sky-500 bg-sky-50 font-bold text-sky-900 ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold">{opt.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gate 4 */}
            <div className="space-y-2">
              <label className="font-bold text-slate-900 block">
                Gate 4: High-Impact Red Folder Economic Calendar
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'clear', label: 'Calendar Clear (Or >15 mins away)', desc: 'Safe for Algorithmic Execution' },
                  { id: 'red_folder_now', label: 'Red Folder within 5 mins (CPI/NFP/FOMC)', desc: 'STAND ASIDE & PRESERVE CAPITAL' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcStep4(opt.id as any)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      calcStep4 === opt.id
                        ? 'border-sky-500 bg-sky-50 font-bold text-sky-900 ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold">{opt.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Output Card */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400">Calculated Institutional Output</span>
              <span className="text-xs font-mono font-bold text-sky-400">
                Confidence Score: {Math.abs(biasScore)}%
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
              {calcStep4 === 'red_folder_now' ? (
                <span className="text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  STAND ASIDE — High-Impact News Trap Zone
                </span>
              ) : biasScore >= 60 ? (
                <span className="text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  STRONG BULLISH BIAS (Seek Longs in Discount)
                </span>
              ) : biasScore <= -60 ? (
                <span className="text-red-400 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  STRONG BEARISH BIAS (Seek Shorts in Premium)
                </span>
              ) : (
                <span className="text-slate-300 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  NEUTRAL / AMBIGUOUS (Wait for 15M Displacement)
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
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
      )}

      {/* VIEW 4: ABDULLAH MASOOD GOLDEN RULES */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Trader Abdullah Masood: The 10 Ironclad Trading Rules
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
                <div key={item.num} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                      {item.num}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{item.rule}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LECTURE STUDY MODAL */}
      {selectedLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scaleUp">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-100 text-amber-900">
                  LEC #{selectedLecture.lectureNumber}
                </span>
                <span className="text-xs font-mono text-slate-500 uppercase">
                  {selectedLecture.playlistType.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={() => setSelectedLecture(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Video Embed / Watch on YouTube banner */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedLecture.youtubeId}`}
                  title={selectedLecture.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {selectedLecture.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedLecture.shortSummary}
                </p>
                {selectedLecture.bilingualNotes && (
                  <div className="mt-2 text-xs font-medium text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                    Urdu/Hindi Note: {selectedLecture.bilingualNotes}
                  </div>
                )}
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Key Institutional Takeaways
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedLecture.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Rules */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sky-600" />
                  Abdullah Masood Execution Rules
                </h4>
                <div className="space-y-1.5 text-xs">
                  {selectedLecture.coreRules.map((rule, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100 text-sky-950 font-medium">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trading Checklist */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-indigo-600" />
                  Pre-Trade Checklist
                </h4>
                <div className="space-y-1 text-xs">
                  {selectedLecture.tradingChecklist.map((item, i) => (
                    <label key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
                      <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Common Retail Pitfalls
                </h4>
                <ul className="space-y-1.5 text-xs text-red-950">
                  {selectedLecture.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2 bg-red-50/70 p-2.5 rounded-xl border border-red-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Exercise */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-900 uppercase font-mono text-[11px] block">
                  Practical Homework Assignment
                </span>
                <p className="text-amber-900 leading-relaxed">
                  {selectedLecture.practicalExercise}
                </p>
              </div>

              {/* Open in YouTube external */}
              <div className="flex justify-end gap-3 pt-2">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedLecture.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Open Video in YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
