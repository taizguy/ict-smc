// Academy Progression & Persistence Engine
// Tracks completed rooms, current unlocked path, and operator modes

const STORAGE_KEY_COMPLETED = 'ict_academy_completed_chapters';
const STORAGE_KEY_FREE_ROAM = 'ict_academy_free_roam_mode';
const STORAGE_KEY_ANSWERS = 'ict_academy_chapter_answers';

export interface AcademyProgressState {
  completedChapterIds: number[];
  freeRoamMode: boolean;
  chapterAnswers: Record<string, number>;
}

export const getStoredProgress = (): AcademyProgressState => {
  try {
    const completedRaw = localStorage.getItem(STORAGE_KEY_COMPLETED);
    const freeRoamRaw = localStorage.getItem(STORAGE_KEY_FREE_ROAM);
    const answersRaw = localStorage.getItem(STORAGE_KEY_ANSWERS);

    const completedChapterIds: number[] = completedRaw ? JSON.parse(completedRaw) : [1]; // Chapter 1 always unlocked & in progress
    const freeRoamMode: boolean = freeRoamRaw ? JSON.parse(freeRoamRaw) : false;
    const chapterAnswers: Record<string, number> = answersRaw ? JSON.parse(answersRaw) : {};

    return {
      completedChapterIds,
      freeRoamMode,
      chapterAnswers
    };
  } catch (e) {
    console.warn('Failed to load academy progress from localStorage:', e);
    return {
      completedChapterIds: [1],
      freeRoamMode: false,
      chapterAnswers: {}
    };
  }
};

export const saveCompletedChapter = (chapterId: number): number[] => {
  try {
    const { completedChapterIds } = getStoredProgress();
    if (!completedChapterIds.includes(chapterId)) {
      const updated = [...completedChapterIds, chapterId];
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(updated));
      return updated;
    }
    return completedChapterIds;
  } catch (e) {
    console.warn('Failed to save completed chapter:', e);
    return [chapterId];
  }
};

export const saveFreeRoamMode = (enabled: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEY_FREE_ROAM, JSON.stringify(enabled));
  } catch (e) {
    console.warn('Failed to save free roam mode:', e);
  }
};

export const saveQuestionAnswer = (questionKey: string, optionIndex: number): void => {
  try {
    const { chapterAnswers } = getStoredProgress();
    chapterAnswers[questionKey] = optionIndex;
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(chapterAnswers));
  } catch (e) {
    console.warn('Failed to save answer:', e);
  }
};

export const isChapterUnlocked = (
  chapterId: number, 
  allChapterIds: number[], 
  completedIds: number[], 
  freeRoam: boolean
): boolean => {
  if (freeRoam) return true;
  // Chapter 1 is always unlocked
  if (chapterId === 1 || chapterId === allChapterIds[0]) return true;

  const currentIndex = allChapterIds.indexOf(chapterId);
  if (currentIndex <= 0) return true;

  // Unlocked if previous chapter is completed
  const prevChapterId = allChapterIds[currentIndex - 1];
  return completedIds.includes(prevChapterId);
};

export const getSectorInfo = (partName: string) => {
  if (partName.includes('Part I') || partName.includes('Foundations')) {
    return {
      sectorNumber: 'SECTOR I',
      code: 'FOUNDATIONS',
      title: 'Market Foundations & Orderflow Mechanics',
      description: 'The physical architecture of exchanges, order book depth, limit vs market consumption, and the origin of price displacement.',
      accent: '#22C55E', // emerald
      gradient: 'from-emerald-500/20 via-emerald-900/10 to-transparent',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
    };
  }
  if (partName.includes('Part II') || partName.includes('Structure')) {
    return {
      sectorNumber: 'SECTOR II',
      code: 'STRUCTURE',
      title: 'Price Structure & Order Book Shifts',
      description: 'Fractal swing points, Market Structure Shifts (MSS), Break of Structure (BOS), Breaker blocks, and liquidity voids.',
      accent: '#06B6D4', // cyan
      gradient: 'from-cyan-500/20 via-cyan-900/10 to-transparent',
      border: 'border-cyan-500/30',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30'
    };
  }
  if (partName.includes('Part III') || partName.includes('Delivery')) {
    return {
      sectorNumber: 'SECTOR III',
      code: 'DELIVERY',
      title: 'Price Delivery & Institutional PD Arrays',
      description: 'Algorithmic Fair Value Gaps (FVG), Inversion FVGs, Balanced Price Ranges, Order Blocks, and premium/discount dealing arrays.',
      accent: '#FF5722', // signature amber/orange
      gradient: 'from-[#FF5722]/20 via-[#FF5722]/5 to-transparent',
      border: 'border-[#FF5722]/30',
      badge: 'bg-[#FF5722]/15 text-[#FF7A00] border-[#FF5722]/30'
    };
  }
  if (partName.includes('Part IV') || partName.includes('Time') || partName.includes('Liquidity')) {
    return {
      sectorNumber: 'SECTOR IV',
      code: 'TEMPORAL',
      title: 'Liquidity Pools & Temporal Killzones',
      description: 'Buy Side (BSL) and Sell Side (SSL) pools, New York & London algorithmic killzones, Power of 3 (PO3 / AMD), and dealing ranges.',
      accent: '#A855F7', // purple
      gradient: 'from-purple-500/20 via-purple-900/10 to-transparent',
      border: 'border-purple-500/30',
      badge: 'bg-purple-950/80 text-purple-300 border-purple-500/30'
    };
  }
  if (partName.includes('Special') || partName.includes('Field Guide')) {
    return {
      sectorNumber: 'SECTOR V',
      code: 'TACTICAL',
      title: 'Practical Field Execution Guide',
      description: 'Real-world tape reading, execution risk rules, dealing range math, and psychological safeguards for funded accounts.',
      accent: '#F59E0B', // amber
      gradient: 'from-amber-500/20 via-amber-900/10 to-transparent',
      border: 'border-amber-500/30',
      badge: 'bg-amber-950/80 text-amber-300 border-amber-500/30'
    };
  }
  // Advanced Part IX, X, XI, XII
  return {
    sectorNumber: 'SECTOR VI',
    code: 'INSTITUTIONAL',
    title: 'Advanced Charter Models & Tape Reading Series',
    description: 'ICT Charter price action models, Intermarket SMT divergences, and the 2025/2026 Core Content master lectures.',
    accent: '#3B82F6', // blue
    gradient: 'from-blue-500/20 via-blue-900/10 to-transparent',
    border: 'border-blue-500/30',
    badge: 'bg-blue-950/80 text-blue-300 border-blue-500/30'
  };
};

export const getOperatorRank = (completedCount: number, totalCount: number) => {
  const percentage = (completedCount / totalCount) * 100;
  if (percentage >= 90) return { title: 'Master Tape Reader (Charter)', level: 5, color: 'text-amber-400', badge: 'bg-amber-500/15 border-amber-500/40 text-amber-300' };
  if (percentage >= 70) return { title: 'Institutional Executioner', level: 4, color: 'text-[#FF5722]', badge: 'bg-[#FF5722]/15 border-[#FF5722]/40 text-[#FF7A00]' };
  if (percentage >= 45) return { title: 'PD Array Engineer', level: 3, color: 'text-purple-400', badge: 'bg-purple-500/15 border-purple-500/40 text-purple-300' };
  if (percentage >= 25) return { title: 'Market Structure Specialist', level: 2, color: 'text-cyan-400', badge: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' };
  if (percentage >= 10) return { title: 'Order Book Apprentice', level: 1, color: 'text-emerald-400', badge: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' };
  return { title: 'Novice Recruit', level: 0, color: 'text-zinc-400', badge: 'bg-zinc-800/80 border-zinc-700 text-zinc-300' };
};
