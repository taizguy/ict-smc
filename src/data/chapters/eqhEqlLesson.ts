import type { CurriculumSource } from '../curriculumReview';
import data from './eqhEqlDocument.json';

export interface EqhEqlBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface EqhEqlSection {
  number: number;
  icon: string;
  title: string;
  blocks: EqhEqlBlock[];
}

export const eqhEqlDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: EqhEqlSection[];
  faqs: { question: string; answer: string }[];
};

export const eqhEqlPath = '/learn/equal-highs-equal-lows/';

export const eqhEqlDates = {
  published: { iso: '2026-11-28', label: '28 November 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export interface EqhEqlQuizItem {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const eqhEqlQuizzes: EqhEqlQuizItem[] = [
  {
    question: 'Why must you define a tick or pip tolerance before marking Equal Highs (EQH) in replay?',
    context: 'Preventing hindsight bias in pool labeling.',
    options: [
      'Real swings rarely match to the exact tick, so a fixed tolerance prevents cherry-picking.',
      'Exchanges forbid horizontal highs within 10 ticks.',
      'Tolerance forces every double top to reverse.',
    ],
    correctIndex: 0,
    explanation: 'A predefined tolerance keeps EQH/EQL labeling objective across both sweeps and breakouts.',
  },
  {
    question: 'How does SMC view a textbook double top differently from retail pattern trading?',
    context: 'Double top vs. Buyside Liquidity pool.',
    options: [
      'SMC treats it as an EQH Buyside Liquidity reference where short stops and buy-stops cluster.',
      'SMC guarantees a double top can never be broken.',
      'SMC ignores swing highs completely.',
    ],
    correctIndex: 0,
    explanation: 'Visible double tops attract both short stop-losses and breakout buy-stops just above the peaks.',
  },
  {
    question: 'What distinguishes a Relative Equal High from an Exact Equal High?',
    context: 'Classifying real-world swing clusters.',
    options: [
      'The second peak sits slightly lower (within tolerance) rather than at the exact same tick.',
      'Relative Equal Highs only exist on monthly charts.',
      'Relative Equal Highs have zero stops above them.',
    ],
    correctIndex: 0,
    explanation: 'Relative EQH has a modest spread inside your tolerance rule and still clusters stops overhead.',
  },
  {
    question: 'What price action confirms an EQH sweep rather than a breakout continuation?',
    context: 'Close-based verification.',
    options: [
      'Price pierces above the EQH shelf and closes candle bodies back inside the prior range.',
      'Every candle closes above the EQH shelf with expanding volume.',
      'Touching the EQH level without crossing it.',
    ],
    correctIndex: 0,
    explanation: 'Closing back inside the range shows failed acceptance above the EQH shelf.',
  },
  {
    question: 'Why do horizontal EQH/EQL shelves hold up better across chart zoom levels than trendlines?',
    context: 'Comparing pool geometry.',
    options: [
      'Horizontal prices do not shift with screen aspect ratio or candle spacing.',
      'Diagonal trendlines are invisible on 1H charts.',
      'Horizontal shelves reveal exact order-book depth.',
    ],
    correctIndex: 0,
    explanation: 'A horizontal price level is invariant to zoom and aspect ratio.',
  },
];

export const eqhEqlSources: CurriculumSource[] = [
  {
    title: 'ICT 2022 Mentorship — Episode 3 (Relative Equal Highs)',
    url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c&t=84s',
    scope: 'Consulted for preference toward clean equal-high clusters over isolated minor peaks. Synthetic tolerance calculators and blueprints are original LearnSMC study aids.',
  },
];
