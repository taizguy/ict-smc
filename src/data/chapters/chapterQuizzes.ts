import {silverLessonQuizzes} from './silverBulletLesson';
import {breakQuizzes,breakTopic} from './breakDocuments';
import {structureQuizzes} from './structureDocument';
import {swingQuizzes} from './swingDocument';
import {liquidityQuizzes} from './liquidityDocument';
import {orderBookQuizzes} from './orderBookLesson';
import {marketMakerQuizzes} from './marketMakerLesson';
import {model2022Quizzes} from './model2022Lesson';
import {oteQuizzes} from './oteLesson';
import {rdrbQuizzes} from './rdrbLesson';
import {pdArrayQuizzes} from './pdArrayLesson';
import {suspensionReaperQuizzes} from './suspensionReaperLesson';
import {mitigationQuizzes} from './mitigationDocument';
import {priceMovementQuizzes} from './priceMovementLesson';
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
  if(chapter.status==='in-progress')return [];
  if(chapter.id===1064)return silverLessonQuizzes.map((q,i)=>rotate({...q,id:`silver-1064-v1-${i}`},i+1));
  const bt=breakTopic(chapter.id);if(bt)return breakQuizzes[bt].map((q,i)=>rotate({...q,id:`${bt}-${chapter.id}-v1-${i}`},i+1));
  if(chapter.id===1010)return structureQuizzes.map((q,i)=>rotate({...q,id:`structure-1010-v1-${i}`},i+1));
  if(chapter.id===7)return swingQuizzes.map((q,i)=>rotate({...q,id:`swing-7-v1-${i}`},i+1));
  if(chapter.id===4)return liquidityQuizzes.map((q,i)=>rotate({...q,id:`liquidity-4-v1-${i}`},i+1));
  if(chapter.id===3)return orderBookQuizzes.map((q,i)=>rotate({...q,id:`order-book-3-v1-${i}`},i+1));
  if(chapter.id===33)return marketMakerQuizzes.map((q,i)=>rotate({...q,id:`market-maker-33-v1-${i}`},i+1));
  if(chapter.id===36)return model2022Quizzes.map((q,i)=>rotate({...q,id:`model-2022-36-v1-${i}`},i+1));
  if(chapter.id===55)return suspensionReaperQuizzes.map((q,i)=>rotate({...q,id:`sr-55-v1-${i}`},i+1));
  if(chapter.id===56)return rdrbQuizzes.map((q,i)=>rotate({...q,id:`rdrb-56-v1-${i}`},i+1));
  if(chapter.id===59)return pdArrayQuizzes.map((q,i)=>rotate({...q,id:`pd-array-59-v1-${i}`},i+1));
  if(chapter.id===1034)return oteQuizzes.map((q,i)=>rotate({...q,id:`ote-1034-v1-${i}`},i+1));
  if(chapter.id===1031)return mitigationQuizzes.map((q,i)=>rotate({...q,id:`mitigation-1031-v1-${i}`},i+1));
  if(chapter.id===1)return priceMovementQuizzes.map((q,i)=>rotate({...q,id:`price-movement-1-v1-${i}`},i+1));
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
