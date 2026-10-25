import type { TextbookChapter, ChapterSection } from '../../types';
import corrections from './contentReview.json';
import { chapterCheckpoints, chapterQuiz } from './chapterQuizzes';

type ChapterCorrection = Partial<Omit<TextbookChapter, 'sections'>> & { sections?: Record<string, Partial<ChapterSection>> };
const reviewed = corrections as Record<string, ChapterCorrection>;

/** Preserve canonical slugs and section IDs while replacing conflicting legacy copy. */
export function applyContentReview(chapter: TextbookChapter): TextbookChapter {
  const correction = reviewed[chapter.id];
  const { sections, ...fields } = correction || {};
  return {
    ...chapter, ...fields,
    sections: chapter.sections.map((section, index) => ({ ...section, ...sections?.[index] })),
    practiceQuestions: chapter.id >= 13 && chapter.id <= 16 ? chapterQuiz(chapter).map(q=>q.question) : [chapterCheckpoints[chapter.id].question],
  };
}
