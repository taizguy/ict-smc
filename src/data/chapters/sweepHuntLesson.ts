import type { CurriculumSource } from '../curriculumReview';
import data from './sweepHuntDocument.json';

export interface SweepHuntBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface SweepHuntSection {
  number: number;
  icon: string;
  title: string;
  blocks: SweepHuntBlock[];
}

export const sweepHuntDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: SweepHuntSection[];
  faqs: { question: string; answer: string }[];
};

export const sweepHuntPath = '/learn/liquidity-sweep-vs-stop-hunt/';

export const sweepHuntDates = {
  published: { iso: '2026-11-28', label: '28 November 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export interface SweepHuntQuizItem {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const sweepHuntQuizzes: SweepHuntQuizItem[] = [
  {
    question: 'What can an OHLC candlestick chart actually prove during a sharp wick past support?',
    context: 'Separating observable tape evidence from inferred intent.',
    options: [
      'That price traded beyond the level and closed back inside; it never proves deliberate manipulation.',
      'The exact identity of the institution that triggered the stops.',
      'The exact number of retail stop contracts sitting below support.',
    ],
    correctIndex: 0,
    explanation: 'Candlesticks show price excursion and close location, never participant identity or intent.',
  },
  {
    question: 'Why do triggered stop-losses often experience slippage during a fast sweep?',
    context: 'Stop-market conversion in thin order books.',
    options: [
      'Stop-loss orders become market orders upon trigger and fill across thin opposing limit depth.',
      'Exchanges pause limit orders for 60 seconds during every wick.',
      'Stop orders always convert into passive limit orders.',
    ],
    correctIndex: 0,
    explanation: 'Cascading market orders consume nearby limit orders quickly, stretching fill prices.',
  },
  {
    question: 'How does the term "liquidity sweep" differ from "stop hunt"?',
    context: 'Framing market mechanics vs. intent.',
    options: [
      'Liquidity sweep focuses on mechanical order absorption; stop hunt implies deliberate targeting.',
      'Liquidity sweep only happens in crypto, while stop hunt only happens in forex.',
      'Stop hunts never leave wicks on candles.',
    ],
    correctIndex: 0,
    explanation: 'Both describe the same observable excursion, viewed through mechanical vs. intent lenses.',
  },
  {
    question: 'Why should traders be cautious calling a CPI or NFP spike a clean liquidity sweep setup?',
    context: 'Distinguishing sweeps from spread-widening news whipsaws.',
    options: [
      'Liquidity providers widen spreads and pull depth around major releases, creating two-sided erratic wicks.',
      'News spikes never cross Equal Highs.',
      'Exchanges ban stop-losses during CPI.',
    ],
    correctIndex: 0,
    explanation: 'Spread widening and pulled depth during macro releases create unreliable two-sided spikes.',
  },
  {
    question: 'What helps reduce vulnerability to routine liquidity sweeps?',
    context: 'Practical stop-placement and buffer hygiene.',
    options: [
      'Avoiding obvious EQH/EQL edges, adding slippage buffers, or using close-based invalidation rules.',
      'Removing stop-losses completely.',
      'Placing every stop 1 tick above a double top.',
    ],
    correctIndex: 0,
    explanation: 'Placing stops away from obvious retail edges with realistic buffers reduces routine noise exits.',
  },
];

export const sweepHuntSources: CurriculumSource[] = [
  {
    title: 'CME Group — Stop Orders and Market Order Execution',
    url: 'https://www.cmegroup.com/education/courses/introduction-to-futures/understanding-order-types.html',
    scope: 'Consulted for stop-market conversion and slippage mechanics in electronic order books.',
  },
  {
    title: 'ICT 2022 Mentorship — Episode 3 (Liquidity Sweeps)',
    url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c',
    scope: 'Consulted for sweep-and-reclaim structural study conventions. Synthetic slippage calculators and blueprints are original LearnSMC study aids.',
  },
];
