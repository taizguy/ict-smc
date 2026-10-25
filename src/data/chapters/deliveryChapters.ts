import type { TextbookChapter } from '../../types';
import edition from './deliveryEdition.json';

/** Standalone Price Delivery lessons; sources live in CurriculumReview. */
export const deliveryChapters = edition as TextbookChapter[];
