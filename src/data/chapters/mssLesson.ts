import type { CurriculumSource } from '../curriculumReview';
import data from './mssDocument.json';

export interface MssBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  rows?: string[][];
}

export interface MssSection {
  number: number;
  icon: string;
  title: string;
  blocks: MssBlock[];
}

export const mssDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: MssSection[];
  faqs: { question: string; answer: string }[];
};

export const mssPath = '/learn/market-structure-shift-mss-verified-directional-shift/';

export const mssDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export const mssSources: CurriculumSource[] = [
  {
    title: 'ICT 2022 Mentorship — Episode 3 (Intraday MSS vs. Longer-Duration Break)',
    url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c',
    scope: 'Consulted for intraday MSS context and separating initial crossing from FVG completion.',
  },
  {
    title: 'ICT 2022 Mentorship — Episode 6 (Displacement & Close Preference)',
    url: 'https://www.youtube.com/watch?v=Bkt8B3kLATQ&t=1110s',
    scope: 'Consulted for energetic displacement and close-preference conventions.',
  },
];
