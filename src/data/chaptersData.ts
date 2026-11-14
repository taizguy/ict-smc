import {structureChapter} from './chapters/structureDocument';
import {mitigationChapter} from './chapters/mitigationDocument';
import {organiseCurriculum,phase1Entries} from './curriculumPhase1';
import { TextbookChapter } from '../types';
import { applyContentReview } from './chapters/applyContentReview';
import { foundationsChapters } from './chapters/foundationsChapters';
import { structureChapters } from './chapters/structureChapters';
import { deliveryChapters } from './chapters/deliveryChapters';
import { liquidityTimeChapters } from './chapters/liquidityTimeChapters';
import { masoodChapters } from './chapters/masoodChapters';
import { ict2025Chapters } from './chapters/ict2025Chapters';
import { charterModelsChapters } from './chapters/charterModelsChapters';
import { coreContentChapters } from './chapters/coreContentChapters';
import { ict2026Chapters } from './chapters/ict2026Chapters';
import { theinnercircletradersNewChapters } from './theinnercircletradersChapters';

export const originalTextbookChapters: TextbookChapter[] = [
  ...foundationsChapters,
  ...structureChapters,
  ...deliveryChapters,
  ...liquidityTimeChapters,
  ...masoodChapters,
  ...ict2025Chapters,
  ...charterModelsChapters,
  ...coreContentChapters,
  ...ict2026Chapters,
  ...theinnercircletradersNewChapters
].map(applyContentReview);

export const textbookChapters=organiseCurriculum([...originalTextbookChapters,mitigationChapter,structureChapter]);
export const activeCurriculumChapters=phase1Entries.map(r=>textbookChapters.find(c=>c.id===r.id)!);
export const publishedCurriculumChapters=activeCurriculumChapters.filter(c=>c.status==='published');
export default textbookChapters;
