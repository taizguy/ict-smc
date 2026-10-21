import type { TextbookChapter } from '../../types';
import checkpoints from './checkpoints.json';

export interface ChapterQuizQuestion {
  id: string;
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
export const chapterCheckpoints = checkpoints as Record<string, Omit<ChapterQuizQuestion, 'id'>>;

// Stable rotation avoids making the first option the answer to every question.
function rotate(question: ChapterQuizQuestion, seed: number): ChapterQuizQuestion {
  const shift = seed % question.options.length;
  return { ...question, options: [...question.options.slice(shift), ...question.options.slice(0, shift)], correctIndex: (question.correctIndex - shift + question.options.length) % question.options.length };
}

/** Exact chapter IDs, never title matching or a generic fallback. */
export function chapterQuiz(chapter: TextbookChapter): ChapterQuizQuestion[] {
  const applied = chapterCheckpoints[chapter.id];
  if (!applied || chapter.keyTerms.length < 2) throw new Error(`Missing reviewed quiz for chapter ${chapter.id}`);
  const vocabulary = chapter.keyTerms.slice(0, 2).map((term, index) => {
    const candidates = [term, ...chapter.keyTerms.filter(item => item.term !== term.term)].slice(0, 4);
    return rotate({ id: `chapter-${chapter.id}-v2-term-${index}`, question: 'Which term matches this definition?', context: term.definition, options: candidates.map(item => item.term), correctIndex: 0, explanation: term.definition }, chapter.id + index);
  });
  return [...vocabulary, rotate({ ...applied, id: `chapter-${chapter.id}-v2-applied` }, chapter.id + 2)];
}
