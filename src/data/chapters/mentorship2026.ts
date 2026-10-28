import edition from './mentorship2026Edition.json';
import type {TextbookChapter} from '../../types';
export const mentorship2026Ids = [47,48,65,50,66,67,68,69,49,52,51,70];
export const hasMentorship2026Edition = (id:number) => mentorship2026Ids.includes(id);
export const mentorship2026Chapters = edition as TextbookChapter[];
export const mentorship2026Hub = '/curriculum/the-2026-ict-smart-money-concepts-master-lectures-tape-reading-series/';
export const mentorship2026Related:Record<number,number[]> = {
  47:[48,3,64],48:[65,24,53],65:[50,24,20],50:[66,58,13],
  66:[67,59,15],67:[68,59,14],68:[69,13,14,16],69:[49,48,15],
  49:[52,66,14],52:[51,62,22],51:[70,61,20],70:[64,22,47],
};
