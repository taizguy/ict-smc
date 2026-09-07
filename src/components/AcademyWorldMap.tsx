import React, { useState, useMemo } from 'react';
import { textbookChapters } from '../data/chaptersData';
import { TextbookChapter } from '../types';
import { 
  getSectorInfo, 
  getOperatorRank, 
  isChapterUnlocked,
  saveFreeRoamMode
} from '../utils/academyProgress';
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  BarChart2, 
  PlayCircle, 
  Cpu, 
  BookMarked, 
  GitFork, 
  Award, 
  Youtube, 
  Layers, 
  Search, 
  Unlock, 
  ChevronRight,
  Flame,
  Radio,
  Eye
} from 'lucide-react';

interface AcademyWorldMapProps {
  completedChapterIds: number[];
  freeRoamMode: boolean;
  onToggleFreeRoam: (enabled: boolean) => void;
  onEnterChapter: (chapterId: number) => void;
  onNavigateFacility: (facility: 'chartlab' | 'simulator' | 'backtest' | 'journal' | 'graph' | 'concepts' | 'compare' | 'dashboard' | 'masood') => void;
  onOpenSearch: () => void;
}

export const AcademyWorldMap: React.FC<AcademyWorldMapProps> = ({
  completedChapterIds,
  freeRoamMode,
  onToggleFreeRoam,
  onEnterChapter,
  onNavigateFacility,
  onOpenSearch
}) => {
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allChapterIds = useMemo(() => textbookChapters.map(c => c.id), []);
  const totalChapters = textbookChapters.length;
  const completedCount = completedChapterIds.length;
  const progressPercent = Math.round((completedCount / totalChapters) * 100);
  const operatorRank = getOperatorRank(completedCount, totalChapters);

  // Group chapters by Part dynamically
  const groupedSectors = useMemo(() => {
    const map = new Map<string, TextbookChapter[]>();
    textbookChapters.forEach((ch) => {
      const partKey = ch.part;
      if (!map.has(partKey)) {
        map.set(partKey, []);
      }
      map.get(partKey)!.push(ch);
    });

    return Array.from(map.entries()).map(([partName, chapters]) => {
      const info = getSectorInfo(partName);
      const sectorCompleted = chapters.filter(c => completedChapterIds.includes(c.id)).length;
      return {
        partName,
        info,
        chapters,
        completedCount: sectorCompleted,
        isSectorComplete: sectorCompleted === chapters.length && chapters.length > 0
      };
    });
  }, [completedChapterIds]);

  // Find the next recommended active chapter
  const currentActiveChapter = useMemo(() => {
    for (const chapter of textbookChapters) {
      if (!completedChapterIds.includes(chapter.id)) {
        return chapter;
      }
    }
    return textbookChapters[0];
  }, [completedChapterIds]);

  // Filtered sectors if a filter is active
  const displayedSectors = useMemo(() => {
    return groupedSectors.filter(sec => {
      if (selectedSectorFilter !== 'all' && sec.info.code !== selectedSectorFilter) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesSector = sec.info.title.toLowerCase().includes(query) || sec.partName.toLowerCase().includes(query);
        const matchesChapter = sec.chapters.some(c => 
          c.title.toLowerCase().includes(query) || 
          c.summary.some(s => s.toLowerCase().includes(query)) ||
          c.keyTerms.some(kt => kt.term.toLowerCase().includes(query))
        );
        return matchesSector || matchesChapter;
      }
      return true;
    });
  }, [groupedSectors, selectedSectorFilter, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Academy Global Command HUD */}
      <div className="relative bg-[#101218] border border-[#272B35] p-6 sm:p-8">
        <div className="relative z-10 space-y-6">
          {/* Top telemetry bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#272B35] pb-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161922] border border-[#22C55E]/40 text-[#22C55E] text-xs font-mono font-bold">
                <span className="w-2 h-2 bg-[#22C55E] animate-pulse" />
                <span>ACADEMY ONLINE</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161922] border border-[#272B35] text-xs font-mono">
                <span className="text-[#9CA3AF]">OPERATOR DOSSIER:</span>
                <span className={`font-bold ${operatorRank.color}`}>{operatorRank.title} (Tier {operatorRank.level})</span>
              </div>
            </div>

            {/* Operator / Free Roam Mode Toggle */}
            <div className="flex items-center gap-3">
              <label 
                className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF] cursor-pointer hover:text-[#F5F5F5] transition-colors"
                title="Toggle Free Roam to inspect any room regardless of progression requirements"
              >
                <input 
                  type="checkbox" 
                  checked={freeRoamMode}
                  onChange={(e) => onToggleFreeRoam(e.target.checked)}
                  className="bg-[#08090C] border-[#272B35] text-[#00E5FF] focus:ring-0 cursor-pointer"
                />
                <span className="flex items-center gap-1.5">
                  {freeRoamMode ? <Unlock className="w-3.5 h-3.5 text-[#00E5FF]" /> : <Lock className="w-3.5 h-3.5 text-[#9CA3AF]" />}
                  <span>Free Roam (Unlock All Chambers)</span>
                </span>
              </label>

              <button
                onClick={onOpenSearch}
                className="px-3.5 py-1.5 bg-[#161922] hover:bg-[#272B35] text-[#F5F5F5] border border-[#272B35] text-xs font-mono flex items-center gap-2 transition-all duration-100 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span className="hidden sm:inline">Search Matrix (Ctrl+K)</span>
              </button>
            </div>
          </div>

          {/* Core HUD Header: Where am I & What is next */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#00E5FF] font-bold flex items-center gap-2">
                <span>ACADEMY WORLD MAP</span>
                <span>•</span>
                <span>48 CURRICULUM CHAMBERS</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-[#F5F5F5] font-space tracking-tight leading-tight">
                The Institutional Progression Matrix.
              </h1>
              <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans leading-relaxed max-w-xl">
                Master the curriculum chamber by chamber. Unlock orderbook mechanics, algorithmic Fair Value Gaps, liquidity sweeps, and high-probability execution protocols.
              </p>
            </div>

            {/* Next Recommended Chamber Card */}
            <div className="lg:col-span-5 p-4 sm:p-5 bg-[#161922] border border-[#272B35] space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-0.5 border border-[#00E5FF]/30 flex items-center gap-1.5">
                  <Radio className="w-3 h-3 animate-pulse text-[#00E5FF]" />
                  CURRENT OBJECTIVE
                </span>
                <span className="text-xs font-mono text-[#9CA3AF] font-semibold">Chamber {currentActiveChapter.id}</span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#F5F5F5] font-space line-clamp-1">
                  {currentActiveChapter.title}
                </h3>
                <p className="text-xs text-[#9CA3AF] line-clamp-1 mt-0.5 font-sans">
                  {currentActiveChapter.part}
                </p>
              </div>

              <button
                onClick={() => onEnterChapter(currentActiveChapter.id)}
                className="w-full py-2.5 px-4 bg-[#F5F5F5] hover:bg-[#00E5FF] text-[#08090C] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#F5F5F5] hover:border-[#00E5FF] transition-all duration-100 cursor-pointer"
              >
                <span>ENTER MISSION CHAMBER {currentActiveChapter.id}</span>
                <ArrowRight className="w-4 h-4 text-[#08090C]" />
              </button>
            </div>
          </div>

          {/* Progress Bar & Telemetry */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#9CA3AF]">Total Academy Clearance</span>
              <span className="text-[#F5F5F5] font-bold">{completedCount} of {totalChapters} Chambers Illuminated ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 bg-[#08090C] border border-[#272B35] p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#8B5CF6] transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, 2)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Training Facilities Strip (Integrated World Destinations) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF5722]" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
              ACADEMY TRAINING FACILITIES
            </h3>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">Live Simulation, Research & Tape Archives</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {/* Training Floor */}
          <button
            onClick={() => onNavigateFacility('chartlab')}
            className="p-3 bg-[#101218] hover:bg-[#161922] border border-[#272B35] hover:border-[#00E5FF] transition-all duration-100 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 bg-[#161922] border border-[#272B35] group-hover:border-[#00E5FF] flex items-center justify-center text-[#00E5FF] mb-2">
              <BarChart2 className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-[#F5F5F5] font-space tracking-tight">Training Floor</div>
            <div className="text-[10px] text-[#9CA3AF] font-mono">Chart Lab</div>
          </button>

          {/* Execution Room */}
          <button
            onClick={() => onNavigateFacility('simulator')}
            className="p-3 bg-[#101218] hover:bg-[#161922] border border-[#272B35] hover:border-[#22C55E] transition-all duration-100 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 bg-[#161922] border border-[#272B35] group-hover:border-[#22C55E] flex items-center justify-center text-[#22C55E] mb-2">
              <PlayCircle className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-[#F5F5F5] font-space tracking-tight">Execution Room</div>
            <div className="text-[10px] text-[#9CA3AF] font-mono">Simulator</div>
          </button>

          {/* Research Room */}
          <button
            onClick={() => onNavigateFacility('backtest')}
            className="p-3 bg-[#101218] hover:bg-[#161922] border border-[#272B35] hover:border-[#00E5FF] transition-all duration-100 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 bg-[#161922] border border-[#272B35] group-hover:border-[#00E5FF] flex items-center justify-center text-[#00E5FF] mb-2">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-[#F5F5F5] font-space tracking-tight">Research Room</div>
            <div className="text-[10px] text-[#9CA3AF] font-mono">Backtest Lab</div>
          </button>

          {/* Trader's Log */}
          <button
            onClick={() => onNavigateFacility('journal')}
            className="p-3 bg-[#101218] hover:bg-[#161922] border border-[#272B35] hover:border-[#8B5CF6] transition-all duration-100 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 bg-[#161922] border border-[#272B35] group-hover:border-[#8B5CF6] flex items-center justify-center text-[#8B5CF6] mb-2">
              <BookMarked className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-[#F5F5F5] font-space tracking-tight">Trader's Log</div>
            <div className="text-[10px] text-[#9CA3AF] font-mono">Journal</div>
          </button>

          {/* Concept Archive */}
          <button
            onClick={() => onNavigateFacility('graph')}
            className="p-3 bg-[#101218] hover:bg-[#161922] border border-[#272B35] hover:border-[#38BDF8] transition-all duration-100 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 bg-[#161922] border border-[#272B35] group-hover:border-[#38BDF8] flex items-center justify-center text-[#38BDF8] mb-2">
              <GitFork className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-[#F5F5F5] font-space tracking-tight">Concept Archive</div>
            <div className="text-[10px] text-[#9CA3AF] font-mono">Knowledge Graph</div>
          </button>

          {/* Knowledge Library */}
          <button
            onClick={() => onNavigateFacility('concepts')}
            className="p-3 bg-[#101218] hover:bg-[#161922] border border-[#272B35] hover:border-[#F59E0B] transition-all duration-100 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 bg-[#161922] border border-[#272B35] group-hover:border-[#F59E0B] flex items-center justify-center text-[#F59E0B] mb-2">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-[#F5F5F5] font-space tracking-tight">Knowledge Library</div>
            <div className="text-[10px] text-[#9CA3AF] font-mono">Encyclopedia</div>
          </button>

          {/* Training Profile */}
          <button
            onClick={() => onNavigateFacility('dashboard')}
            className="p-3 bg-[#101218] hover:bg-[#161922] border border-[#272B35] hover:border-[#22C55E] transition-all duration-100 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 bg-[#161922] border border-[#272B35] group-hover:border-[#22C55E] flex items-center justify-center text-[#22C55E] mb-2">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-[#F5F5F5] font-space tracking-tight">Training Profile</div>
            <div className="text-[10px] text-[#9CA3AF] font-mono">Mastery Dossier</div>
          </button>

          {/* Master Tape Archive */}
          <button
            onClick={() => onNavigateFacility('masood')}
            className="p-3 bg-[#101218] hover:bg-[#161922] border border-[#272B35] hover:border-[#EF4444] transition-all duration-100 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 bg-[#161922] border border-[#272B35] group-hover:border-[#EF4444] flex items-center justify-center text-[#EF4444] mb-2">
              <Youtube className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-[#F5F5F5] font-space tracking-tight">Master Tape</div>
            <div className="text-[10px] text-[#9CA3AF] font-mono">Masood 52 Tape</div>
          </button>
        </div>
      </div>

      {/* Sector Selection Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setSelectedSectorFilter('all')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
              selectedSectorFilter === 'all'
                ? 'bg-white text-black shadow-md'
                : 'bg-[#111114] text-zinc-400 hover:text-white border border-white/[0.08]'
            }`}
          >
            All Sectors (6)
          </button>

          <button
            onClick={() => setSelectedSectorFilter('FOUNDATIONS')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              selectedSectorFilter === 'FOUNDATIONS'
                ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                : 'bg-[#111114] text-zinc-400 hover:text-emerald-300 border border-white/[0.08]'
            }`}
          >
            Sector I: Foundations
          </button>

          <button
            onClick={() => setSelectedSectorFilter('STRUCTURE')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              selectedSectorFilter === 'STRUCTURE'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'bg-[#111114] text-zinc-400 hover:text-cyan-300 border border-white/[0.08]'
            }`}
          >
            Sector II: Structure
          </button>

          <button
            onClick={() => setSelectedSectorFilter('DELIVERY')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              selectedSectorFilter === 'DELIVERY'
                ? 'bg-[#FF5722] text-white font-bold shadow-md shadow-[#FF5722]/30'
                : 'bg-[#111114] text-zinc-400 hover:text-[#FF7A00] border border-white/[0.08]'
            }`}
          >
            Sector III: Delivery
          </button>

          <button
            onClick={() => setSelectedSectorFilter('TEMPORAL')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              selectedSectorFilter === 'TEMPORAL'
                ? 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/30'
                : 'bg-[#111114] text-zinc-400 hover:text-purple-300 border border-white/[0.08]'
            }`}
          >
            Sector IV: Temporal
          </button>

          <button
            onClick={() => setSelectedSectorFilter('TACTICAL')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              selectedSectorFilter === 'TACTICAL'
                ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                : 'bg-[#111114] text-zinc-400 hover:text-amber-300 border border-white/[0.08]'
            }`}
          >
            Sector V: Field Guide
          </button>

          <button
            onClick={() => setSelectedSectorFilter('INSTITUTIONAL')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              selectedSectorFilter === 'INSTITUTIONAL'
                ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/30'
                : 'bg-[#111114] text-zinc-400 hover:text-blue-300 border border-white/[0.08]'
            }`}
          >
            Sector VI: Advanced Models
          </button>
        </div>

        <div className="text-xs font-mono text-zinc-500">
          Click any illuminated or active room to enter
        </div>
      </div>

      {/* The Interactive Academy Sectors & Progression Paths */}
      <div className="space-y-12">
        {displayedSectors.map((sector, sIdx) => {
          return (
            <section 
              key={sector.partName}
              className={`rounded-3xl bg-gradient-to-b ${sector.info.gradient} to-[#0A0A0C] border ${sector.info.border} p-6 sm:p-8 shadow-2xl relative overflow-hidden`}
            >
              {/* Sector Header Block */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${sector.info.badge}`}>
                      {sector.info.sectorNumber}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                      {sector.partName}
                    </span>
                    {sector.isSectorComplete && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        SECTOR CLEARED
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                    {sector.info.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl font-sans">
                    {sector.info.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right font-mono">
                    <div className="text-xs text-zinc-400">Sector Clearance</div>
                    <div className="text-sm font-bold text-white">
                      {sector.completedCount} / {sector.chapters.length} Chambers
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0A0A0D] border border-white/[0.08] flex items-center justify-center font-mono text-xs font-bold text-white">
                    {Math.round((sector.completedCount / Math.max(sector.chapters.length, 1)) * 100)}%
                  </div>
                </div>
              </div>

              {/* Connected Chapter Rooms Grid & Progression Visualizer */}
              <div className="pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
                  
                  {sector.chapters.map((ch, chIdx) => {
                    const isCompleted = completedChapterIds.includes(ch.id);
                    const isCurrent = ch.id === currentActiveChapter.id;
                    const unlocked = isChapterUnlocked(ch.id, allChapterIds, completedChapterIds, freeRoamMode);
                    
                    return (
                      <div
                        key={ch.id}
                        className={`relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group select-none ${
                          isCurrent
                            ? 'bg-[#16161B] border-[#FF5722] shadow-[0_0_30px_rgba(255,87,34,0.25)] ring-1 ring-[#FF5722]'
                            : isCompleted
                            ? 'bg-[#0E1210] border-emerald-500/30 hover:border-emerald-400/50 hover:bg-[#111714] shadow-lg'
                            : unlocked
                            ? 'bg-[#101014] border-white/[0.08] hover:border-white/20 hover:bg-[#141418] shadow-md'
                            : 'bg-[#08080A]/80 border-white/[0.04] opacity-60 hover:opacity-75'
                        }`}
                      >
                        {/* Top Node Badge & State */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-xl font-mono text-xs font-black flex items-center justify-center border ${
                              isCurrent
                                ? 'bg-[#FF5722] text-white border-[#FF7A00] shadow-md shadow-[#FF5722]/40'
                                : isCompleted
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : unlocked
                                ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                                : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                            }`}>
                              {ch.id < 10 ? `0${ch.id}` : ch.id}
                            </div>

                            <span className="text-[11px] font-mono text-zinc-400">
                              Level {ch.level}
                            </span>
                          </div>

                          {/* State Tag */}
                          <div>
                            {isCompleted ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                                <CheckCircle2 className="w-3 h-3" />
                                ILLUMINATED
                              </span>
                            ) : isCurrent ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#FF5722] bg-[#FF5722]/15 px-2 py-0.5 rounded-full border border-[#FF5722]/40 animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                                ACTIVE
                              </span>
                            ) : unlocked ? (
                              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                                UNLOCKED
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded-full border border-zinc-800">
                                <Lock className="w-2.5 h-2.5" />
                                LOCKED
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Room Content Details */}
                        <div className="space-y-2 mb-4">
                          <h3 className={`text-sm sm:text-base font-black font-display leading-snug line-clamp-2 transition-colors ${
                            unlocked ? 'text-white group-hover:text-[#FF7A00]' : 'text-zinc-500'
                          }`}>
                            {ch.title}
                          </h3>

                          <p className="text-xs text-zinc-400 italic line-clamp-2 font-sans">
                            {ch.quote}
                          </p>
                        </div>

                        {/* Room Meta (Sections count & Key terms) */}
                        <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                          <span>{ch.sections.length} Codified Sections</span>
                          <span>{ch.keyTerms.length} Key Terms</span>
                        </div>

                        {/* Enter Room Button */}
                        <div className="pt-3">
                          {unlocked ? (
                            <button
                              onClick={() => onEnterChapter(ch.id)}
                              className={`w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-gradient-to-r from-[#FF5722] to-[#FF7A00] text-white shadow-md shadow-[#FF5722]/25 hover:brightness-110'
                                  : isCompleted
                                  ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-[#18181D] hover:bg-zinc-800 text-zinc-200 border border-white/[0.08]'
                              }`}
                            >
                              <span>{isCompleted ? 'Review Chamber' : isCurrent ? 'Enter Chamber' : 'Explore Room'}</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          ) : (
                            <button
                              onClick={() => onToggleFreeRoam(true)}
                              className="w-full py-2 px-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-zinc-500 font-mono text-[11px] flex items-center justify-center gap-1.5 hover:text-zinc-300 transition-colors cursor-pointer"
                              title="Click to enable Operator Mode and inspect this room"
                            >
                              <Lock className="w-3 h-3" />
                              <span>Complete Ch {ch.id - 1} or Unlock All</span>
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}

                </div>
              </div>

            </section>
          );
        })}
      </div>

    </div>
  );
};
