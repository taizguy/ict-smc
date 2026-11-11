import { chapterCatalog, lectureCatalog } from '../data/catalog.generated';
export const chapterCount = chapterCatalog.filter(c=>c.status==='published').length;
export const lectureCount = lectureCatalog.length;
