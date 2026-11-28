import type { CurriculumSource } from '../curriculumReview';
import data from './bosChochMssDocument.json';

export interface BosChochMssBlock {
  type: 'paragraph' | 'table';
  text?: string;
  rows?: string[][];
}

export interface BosChochMssSection {
  number: number;
  icon: string;
  title: string;
  blocks: BosChochMssBlock[];
}

export const bosChochMssDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: BosChochMssSection[];
  faqs: { question: string; answer: string }[];
};

export const bosChochMssPath = '/learn/bos-vs-choch-vs-mss/';

export const bosChochMssDates = {
  published: { iso: '2026-11-28', label: '28 November 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export interface BosChochMssQuizItem {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const bosChochMssQuizzes: BosChochMssQuizItem[] = [
  {
    question: 'Which structural break confirms continuation in the direction of the existing trend?',
    context: 'Separating continuation from reversal labels.',
    options: [
      'Break of Structure (BOS).',
      'Change of Character (CHoCH).',
      'Market Structure Shift (MSS).',
    ],
    correctIndex: 0,
    explanation: 'BOS breaks with the active trend sequence, whereas CHoCH and MSS break counter-trend.',
  },
  {
    question: 'What typically distinguishes an MSS from an early CHoCH warning?',
    context: 'Comparing counter-trend break conditions.',
    options: [
      'MSS commonly follows a prior liquidity sweep and shows energetic displacement.',
      'MSS only appears on weekly charts.',
      'CHoCH always ignores candle closes.',
    ],
    correctIndex: 0,
    explanation: 'MSS pairs a counter-trend break with liquidity-sweep and displacement filters.',
  },
  {
    question: 'How should you interpret a 5-minute CHoCH inside a bullish 4-hour BOS sequence?',
    context: 'Keeping timeframe scale clear.',
    options: [
      'As a local warning that may simply initiate a 4-hour pullback.',
      'As proof that the 4-hour uptrend has permanently ended.',
      'As an invalid 5-minute candle.',
    ],
    correctIndex: 0,
    explanation: 'Lower-timeframe shifts often occur as pullbacks within intact higher-timeframe trends.',
  },
];

export const bosChochMssSources: CurriculumSource[] = [
  {
    title: 'ICT 2022 Mentorship — Episode 3 & Episode 6',
    url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c',
    scope: 'Consulted for distinguishing continuation breaks from intraday and displacement-backed structure shifts.',
  },
];
