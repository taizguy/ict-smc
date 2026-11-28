import type { CurriculumSource } from '../curriculumReview';
import data from './turtleSoupDocument.json';

export interface TurtleSoupBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface TurtleSoupSection {
  number: number;
  icon: string;
  title: string;
  blocks: TurtleSoupBlock[];
}

export const turtleSoupDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: TurtleSoupSection[];
  faqs: { question: string; answer: string }[];
};

export const turtleSoupPath = '/learn/ict-liquidity-turtle-soup-rejection-blocks/';

export const turtleSoupDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export interface TurtleSoupQuizItem {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const turtleSoupQuizzes: TurtleSoupQuizItem[] = [
  {
    question: 'An old high is 110. Price trades to 112 and closes multiple candles holding above 110. What does this support?',
    context: 'Distinguishing sustained acceptance from a Turtle Soup failed breakout.',
    options: [
      'Sustained acceptance above 110 rather than a confirmed Turtle Soup rejection.',
      'An automatic short entry at 110 with zero stop-loss.',
      'Proof that all retail stops have been permanently exhausted.',
    ],
    correctIndex: 0,
    explanation: 'A Turtle Soup requires rejection back inside the prior range; holding above 110 indicates acceptance.',
  },
  {
    question: 'In a bearish example with a 110–111 body and a 112 wick high, what is the Rejection Block body midpoint vs. full-span midpoint?',
    context: 'Comparing body boundary arithmetic against full-wick arithmetic.',
    options: [
      'Body midpoint is 110.5 and full-span midpoint is 111.0; they are not interchangeable.',
      'Both midpoints equal 112.0.',
      'Body midpoint is 107.0 and full-span midpoint is 106.0.',
    ],
    correctIndex: 0,
    explanation: 'The 110–111 body averages to 110.5, whereas the full 110–112 excursion averages to 111.0.',
  },
  {
    question: 'What separates a deferred Rejection Block entry from selling blindly at 110?',
    context: 'Waiting for observable rejection and departure before framing an entry.',
    options: [
      'Deferred entry waits for the excursion, rejection, departure, and a later return to the declared body reference.',
      'Selling blindly at 110 guarantees a higher win rate.',
      'Deferred entry enters before price ever touches 110.',
    ],
    correctIndex: 0,
    explanation: 'Selling at 110 before rejection exists is guessing; deferred entry requires observable rejection and departure first.',
  },
  {
    question: 'What should you do if price sweeps 110 to 112, departs to 107, and never returns to the 110.5 Rejection Block before your declared expiry?',
    context: 'Managing missed deferred returns without chasing.',
    options: [
      'Skip the setup or treat any late return after expiry as a separate study.',
      'Chase price at 107 with a random stop.',
      'Delete your stop-loss and hope for a bounce.',
    ],
    correctIndex: 0,
    explanation: 'Do not force a deferred entry when no return occurs within the declared sequence window.',
  },
  {
    question: 'Why must you label whether an old high comes from ETH (overnight) or RTH (regular trading hours)?',
    context: 'Maintaining session-specific reference hygiene.',
    options: [
      'A new RTH high is not identical to the full ETH high, so mixing them misplaces sweep references.',
      'ETH and RTH charts always print identical highs and lows.',
      'Only weekly closes matter in futures markets.',
    ],
    correctIndex: 0,
    explanation: 'Overnight/ETH extremes and RTH extremes are distinct liquidity references.',
  },
  {
    question: 'Is every old-high break automatically a manipulation sweep that guarantees a reversal?',
    context: 'Applying evidence and claims discipline to breakout studies.',
    options: [
      'No; an excursion alone is not a setup and never guarantees a reversal without observable rejection and invalidation rules.',
      'Yes; every break of an old high guarantees an immediate 1:4 reversal.',
      'Yes; Linda Raschke proved 100% of 20-day breakouts fail.',
    ],
    correctIndex: 0,
    explanation: 'Never assume every high break is manipulation or a guaranteed reversal.',
  },
];

export const turtleSoupSources: CurriculumSource[] = [
  {
    title: 'Investor.gov (SEC) — Stop Order Mechanics & Execution',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope: 'Explains how stop orders triggered past reference highs/lows convert into market orders and can create rapid excursions.',
  },
  {
    title: 'CFTC — Futures & Options Market Basics',
    url: 'https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/index.htm',
    scope: 'Official regulatory overview of futures leverage, volatility, and execution risk.',
  },
  {
    title: 'CME Group — E-mini & Micro E-mini Nasdaq-100 Specifications',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/e-mini-nasdaq-100.contractSpecs.html',
    scope: 'Defines RTH vs. ETH Globex session calendars and tick increments for index futures.',
  },
];
