import type { TextbookChapter, ChapterSection } from '../../types';
import corrections from './contentReview.json';
import { chapterCheckpoints } from './chapterQuizzes';

type ChapterCorrection = Partial<Omit<TextbookChapter, 'sections'>> & { sections?: Record<string, Partial<ChapterSection>> };
const reviewed = corrections as Record<string, ChapterCorrection>;

/** Preserve canonical slugs and section IDs while replacing conflicting legacy copy. */
export function applyContentReview(chapter: TextbookChapter): TextbookChapter {
  const correction = reviewed[chapter.id];
  const { sections, ...fields } = correction || {};
  return {
    ...chapter, ...fields,
    sections: chapter.sections.map((section, index) => ({ ...section, ...sections?.[index] })),
    practiceQuestions: [chapterCheckpoints[chapter.id].question],
  };
}
