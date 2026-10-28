import type { TextbookChapter } from '../../types';
import checkpoints from './checkpoints.json';
import quizzes2026 from './mentorship2026Quizzes.json';
import mentorshipQuizzes from './mentorship2025Quizzes.json';
import deliveryQuizzes from './deliveryQuizzes.json';

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
  const reviewed2026 = (quizzes2026 as Record<string,Omit<ChapterQuizQuestion,'id'>[]>)[chapter.id];
  if(reviewed2026) return reviewed2026.map((q,i)=>rotate({...q,id:`mentorship2026-${chapter.id}-v1-${i}`},chapter.id+i));
  const reviewed2025 = (mentorshipQuizzes as Record<string, Omit<ChapterQuizQuestion,'id'>[]>)[chapter.id];
  if (reviewed2025) return reviewed2025.map((question,index)=>rotate({...question,id:`mentorship2025-${chapter.id}-v1-${index}`},chapter.id+index));
  const delivery = (deliveryQuizzes as Record<string, Omit<ChapterQuizQuestion,'id'>[]>)[chapter.id];
  if (delivery) return delivery.map((question,index)=>rotate({...question,id:`delivery-${chapter.id}-edition-1-${index}`},chapter.id+index));
  const applied = chapterCheckpoints[chapter.id];
  if (!applied || chapter.keyTerms.length < 2) throw new Error(`Missing reviewed quiz for chapter ${chapter.id}`);
  const vocabulary = chapter.keyTerms.slice(0, 2).map((term, index) => {
    const candidates = [term, ...chapter.keyTerms.filter(item => item.term !== term.term)].slice(0, 4);
    return rotate({ id: `chapter-${chapter.id}-v2-term-${index}`, question: 'Which term matches this definition?', context: term.definition, options: candidates.map(item => item.term), correctIndex: 0, explanation: term.definition }, chapter.id + index);
  });
  return [...vocabulary, rotate({ ...applied, id: `chapter-${chapter.id}-v2-applied` }, chapter.id + 2)];
}
