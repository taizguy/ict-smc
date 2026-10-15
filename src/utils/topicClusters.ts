import { textbookChapters } from '../data/chaptersData';
export function topicSlug(part: string) {
  return part.replace(/^Part\s+[IVXLCDM]+\s*[-–—:]\s*/i, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
export const topicClusters = [...new Set(textbookChapters.map(c => c.part))].map(part => ({
  part, slug: topicSlug(part), chapters: textbookChapters.filter(c => c.part === part),
}));
