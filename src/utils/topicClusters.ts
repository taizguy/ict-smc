import {activeCurriculumChapters} from '../data/chaptersData';
import {phase1Parts} from '../data/curriculumPhase1';
import {curriculumHubContent} from '../data/curriculumHubContent';
export function topicSlug(part: string) {
  return part.replace(/^Part\s+[IVXLCDM]+\s*[-–—:]\s*/i, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
export const topicClusters = phase1Parts.map(p=>({...p,chapters:activeCurriculumChapters.filter(c=>c.part===p.part),guidance:curriculumHubContent[p.slug]?.paragraphs.map(p=>p[0])||[],question:curriculumHubContent[p.slug]?.question[0]||''}));
