import type { CurriculumSource } from '../curriculumReview';
import data from './trendRangeDocument.json';

export interface TrendRangeBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  rows?: string[][];
}

export interface TrendRangeSection {
  number: number;
  icon: string;
  title: string;
  blocks: TrendRangeBlock[];
}

export const trendRangeDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: TrendRangeSection[];
  faqs: { question: string; answer: string }[];
};

export const trendRangePath = '/learn/trend-range-transition/';

export const trendRangeDates = {
  published: { iso: '2026-11-28', label: '28 November 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export interface TrendRangeQuizItem {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const trendRangeQuizzes: TrendRangeQuizItem[] = [
  {
    question: 'Which swing sequence defines a bullish trend?',
    context: 'Classifying market phases objectively.',
    options: [
      'Higher Highs (HH) and Higher Lows (HL).',
      'Lower Highs (LH) and Lower Lows (LL).',
      'Equal Highs (EQH) and Equal Lows (EQL).',
    ],
    correctIndex: 0,
    explanation: 'Rising peaks and rising troughs define an intact bullish trend.',
  },
  {
    question: 'Why do trend-continuation setups often fail inside a tight consolidation range?',
    context: 'Matching strategy to market phase.',
    options: [
      'Price oscillates between ceiling and floor rather than expanding smoothly.',
      'Consolidations have no candle wicks.',
      'Exchanges disable limit orders in ranges.',
    ],
    correctIndex: 0,
    explanation: 'Inside a range, breakouts frequently revert back toward equilibrium.',
  },
  {
    question: 'What marks the transition from a sideways range into a potential new trend?',
    context: 'Identifying structural shifts cleanly.',
    options: [
      'A decisive close beyond the range boundary followed by a holding retest.',
      'Touching the midpoint of the range.',
      'Two doji candles in a row.',
    ],
    correctIndex: 0,
    explanation: 'Acceptance outside the boundary separates a real transition from a range sweep.',
  },
];

export const trendRangeSources: CurriculumSource[] = [
  {
    title: 'ICT 2022 Mentorship — Episode 3 (Market Structure States)',
    url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c',
    scope: 'Consulted for trend, range, and structural transition context. All synthetic classifiers and diagrams are original LearnSMC study aids.',
  },
];
