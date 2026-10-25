import type { TextbookChapter } from '../types';
import { topicClusters } from './topicClusters';

/** Shared names and destinations for the visible trail and BreadcrumbList. */
export function lessonBreadcrumbs(chapter: TextbookChapter) {
  const topic = topicClusters.find(item => item.part === chapter.part)!;
  return [
    { name: 'Home', path: '/' },
    { name: 'Curriculum', path: '/curriculum/' },
    { name: chapter.part.replace(/^Part\s+[IVXLCDM]+\s*[-–—:]\s*/i, ''), path: `/curriculum/${topic.slug}/` },
    { name: chapter.title, path: `/learn/${chapter.slug}/` },
  ];
}
