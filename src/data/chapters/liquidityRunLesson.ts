import type { CurriculumSource } from '../curriculumReview';
import data from './liquidityRunDocument.json';

export interface LiquidityRunBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface LiquidityRunSection {
  number: number;
  icon: string;
  title: string;
  blocks: LiquidityRunBlock[];
}

export const liquidityRunDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: LiquidityRunSection[];
  faqs: { question: string; answer: string }[];
};

export const liquidityRunPath = '/learn/liquidity-engineering-and-liquidity-runs/';

export const liquidityRunDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export interface LiquidityRunQuizItem {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const liquidityRunQuizzes: LiquidityRunQuizItem[] = [
  {
    question: 'A trendline connects three rising lows on a 15-minute chart. What does that line NOT reveal?',
    context: 'Separating drawn chart anchors from hidden order-book data.',
    options: [
      'The exact quantity of resting stop orders or proof that institutions engineered the line.',
      'The three selected price points used to anchor the line.',
      'The timeframe of the chart being viewed.',
    ],
    correctIndex: 0,
    explanation: 'A drawn line is a visual reference; OHLC candles never reveal hidden stop inventory or participant intent.',
  },
  {
    question: 'What distinguishes a Low-Resistance Liquidity Run (LRLR) from a High-Resistance Liquidity Run (HRLR)?',
    context: 'Classifying corridor resistance before evaluating a move.',
    options: [
      'LRLR travels through an unobstructed path with clean FVGs, whereas HRLR fights through dense opposing swings and overlap.',
      'LRLR guarantees a 100% win rate on every session.',
      'HRLR never has wicks on any candle.',
    ],
    correctIndex: 0,
    explanation: 'LRLR and HRLR describe relative path clarity vs. structural obstruction along the corridor.',
  },
  {
    question: 'When grouping Equal Highs (EQH), why must you define your tolerance and timeframe before replay?',
    context: 'Preventing hindsight bias when marking liquidity references.',
    options: [
      'So you evaluate both continued breakouts and failed-breakout reversals under the same objective rule.',
      'Because exchanges ban equal highs after 10:00 AM.',
      'To force every high break to look like a five-to-fifteen-tick stop hunt.',
    ],
    correctIndex: 0,
    explanation: 'Predefined tolerance rules prevent cherry-picking and allow fair comparison of reversals vs. continuations.',
  },
  {
    question: 'Does classifying a path as LRLR permit aggressive pyramiding with multiple entries?',
    context: 'Managing combined exposure and transaction costs.',
    options: [
      'No; multiple entries increase combined exposure, and neither LRLR nor HRLR guarantees a fixed retracement or win probability.',
      'Yes; LRLR proves zero drawdown will occur on add-on entries.',
      'Yes; stop-losses are optional during LRLR expansions.',
    ],
    correctIndex: 0,
    explanation: 'Adding positions multiplies combined risk exposure and must be bounded by total account risk rules.',
  },
  {
    question: 'Under HRLR conditions (dense opposing swings and overlapping wicks), what happens more frequently when price reaches an extreme?',
    context: 'Understanding sweep vs. continuation behavior in cluttered corridors.',
    options: [
      'Exhaustion, choppy stalls, or sweep-and-reversal behavior rather than smooth momentum.',
      'Zero-friction straight-line expansion with no pullbacks.',
      'Guaranteed trendline bounces forever.',
    ],
    correctIndex: 0,
    explanation: 'Cluttered opposing structure creates friction and increases fakeout/reversal risk.',
  },
];

export const liquidityRunSources: CurriculumSource[] = [
  {
    title: 'Investor.gov (SEC) — Stop Order Mechanics & Execution',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope: 'Explains how stop orders convert to market orders when reference highs/lows are crossed.',
  },
  {
    title: 'CFTC — Futures & Options Market Basics',
    url: 'https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/index.htm',
    scope: 'Official education on order execution, leverage, and market-risk limits.',
  },
];
