import type { CurriculumSource } from '../curriculumReview';
import data from './dealingRangeDocument.json';

export interface DealingRangeBlock {
  type: 'paragraph' | 'table';
  text?: string;
  rows?: string[][];
}

export interface DealingRangeSection {
  number: number;
  icon: string;
  title: string;
  blocks: DealingRangeBlock[];
}

export const dealingRangeDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: DealingRangeSection[];
  faqs: { question: string; answer: string }[];
};

export const dealingRangePath = '/learn/dealing-range-marking/';

export const dealingRangeDates = {
  published: { iso: '2026-11-28', label: '28 November 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export interface DealingRangeQuizItem {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const dealingRangeQuizzes: DealingRangeQuizItem[] = [
  {
    question: 'Which two anchors properly define an active Dealing Range?',
    context: 'Anchoring Premium and Discount objectively.',
    options: [
      'A completed sweep/swing origin and the opposing swing extreme created by displacement.',
      'Any two random 1-minute candle wicks.',
      'The highest and lowest price of the past 10 years.',
    ],
    correctIndex: 0,
    explanation: 'A dealing range spans from the sweep origin to the opposing displacement extreme.',
  },
  {
    question: 'What does the 50% Equilibrium line separate?',
    context: 'Dividing a Dealing Range cleanly.',
    options: [
      'Discount (below 50%) from Premium (above 50%).',
      'London session from Asian session.',
      'Bullish trends from bearish trends.',
    ],
    correctIndex: 0,
    explanation: 'Prices below 50% are in Discount; prices above 50% are in Premium.',
  },
  {
    question: 'When should you re-anchor your Dealing Range?',
    context: 'Avoiding stale range references.',
    options: [
      'When candle bodies close decisively beyond the current Range High or Range Low.',
      'Every 5 minutes regardless of price.',
      'Never; keep the same anchors forever.',
    ],
    correctIndex: 0,
    explanation: 'Decisive closes beyond the boundary shift the active dealing range.',
  },
];

export const dealingRangeSources: CurriculumSource[] = [
  {
    title: 'ICT Core Month 6 — Dealing Ranges & PD Array Matrix',
    url: 'https://www.youtube.com/watch?v=g--tikwaupk&t=39s',
    scope: 'Consulted for anchoring dealing ranges and separating Premium from Discount at 50% Equilibrium.',
  },
];
