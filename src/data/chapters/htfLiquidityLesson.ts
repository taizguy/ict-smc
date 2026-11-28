import type { CurriculumSource } from '../curriculumReview';
import type { TextbookChapter } from '../../types';
import data from './htfLiquidityDocument.json';

export interface HtfLiquidityBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface HtfLiquiditySection {
  number: number;
  icon: string;
  title: string;
  blocks: HtfLiquidityBlock[];
}

export const htfLiquidityDocument = data as {
  h1: string;
  seoTitle: string;
  seoTitleUr: string;
  metaDescription: string;
  metaDescriptionUr: string;
  quickAnswer: string;
  takeaways: string[];
  sections: HtfLiquiditySection[];
  faqs: { question: string; answer: string }[];
};

export const htfLiquidityPath = '/learn/htf-liquidity-maps/';

export const htfLiquidityDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export const htfLiquidityChapter: TextbookChapter = {
  id: 1024,
  slug: 'htf-liquidity-maps',
  part: 'Part III - Liquidity, Time & Macro Mechanics',
  title: htfLiquidityDocument.h1,
  level: 3,
  status: 'published',
  quote: htfLiquidityDocument.quickAnswer,
  summary: [
    ...htfLiquidityDocument.takeaways,
  ],
  keyTerms: [
    { term: 'HTF Liquidity Map', definition: 'A top-down chart overlay of Monthly, Weekly, Daily, and 4H highs, lows, and equal-level clusters used to track Draw on Liquidity.' },
    { term: 'Draw on Liquidity (DOL)', definition: 'The primary higher-timeframe liquidity pool or imbalance toward which price is currently expanding.' },
    { term: 'External Range Liquidity (ERL)', definition: 'Swing highs and lows located outside the boundaries of the current dealing range.' },
    { term: 'Internal Range Liquidity (IRL)', definition: 'Fair Value Gaps, Order Blocks, and minor pivots located inside a dealing range.' },
  ],
  practiceQuestions: htfLiquidityDocument.faqs.slice(0, 5).map((item) => item.question),
  sections: htfLiquidityDocument.sections.map((section) => ({
    id: `1024.${section.number}`,
    title: section.title,
    content: section.blocks
      .flatMap((block) => {
        if (block.type === 'paragraph' && block.text) return [block.text];
        if (block.type === 'callout' && block.text) return [block.text];
        if (block.type === 'list' && block.items) return block.items;
        return [];
      })
      .join('\n\n'),
  })),
};

export interface HtfLiquidityQuizItem {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const htfLiquidityQuizzes: HtfLiquidityQuizItem[] = [
  {
    question: 'Which HTF liquidity tier anchors multi-day to multi-week directional bias most strongly?',
    context: 'Comparing Tier 1/2 calendar anchors against intraday session extremes.',
    options: [
      'Previous Month High/Low (PMH/PML) and Previous Week High/Low (PWH/PWL).',
      'A single 1-minute Asian lunch swing high.',
      'An unconfirmed mid-range wick inside 50% Equilibrium.',
    ],
    correctIndex: 0,
    explanation: 'Higher-timeframe calendar extremes (PMH/PML and PWH/PWL) accumulate larger resting order pools and anchor multi-day direction.',
  },
  {
    question: 'In the IRL ↔ ERL delivery cycle, what typically happens after price sweeps External Range Liquidity (e.g., PDH) and shifts structure lower?',
    context: 'Tracing External-to-Internal range delivery.',
    options: [
      'Price retraces toward Internal Range Liquidity (such as a 4H or 1H Fair Value Gap) to rebalance.',
      'Price is permanently forbidden from returning inside the prior daily range.',
      'Every 1-minute candle automatically becomes a Monthly Order Block.',
    ],
    correctIndex: 0,
    explanation: 'After sweeping ERL, price frequently rebalances an internal inefficiency (IRL) before expanding toward the next opposing target.',
  },
  {
    question: 'Why do clean Equal Highs (EQH) or Equal Lows (EQL) often act as magnets rather than impenetrable walls?',
    context: 'Understanding retail double-top/double-bottom stop placement.',
    options: [
      'Stop-losses from double-top sellers or double-bottom buyers cluster just beyond those equal levels, creating dense resting liquidity.',
      'Exchanges automatically ban limit orders near equal highs.',
      'Equal highs mathematically guarantee a 100% reversal without sweeping.',
    ],
    correctIndex: 0,
    explanation: 'Clustered protective stops just beyond EQH/EQL provide concentrated Buy-Side or Sell-Side Liquidity when price expands.',
  },
  {
    question: 'What defines a Low-Resistance Liquidity Run (LRLR) compared to High-Resistance Liquidity Run (HRLR)?',
    context: 'Evaluating path resistance toward an HTF liquidity target.',
    options: [
      'LRLR travels rapidly through an unobstructed path with clean FVGs toward the target, whereas HRLR grinds through dense opposing swings.',
      'LRLR only happens on weekends when futures markets are closed.',
      'HRLR always moves faster than LRLR with zero wicks.',
    ],
    correctIndex: 0,
    explanation: 'LRLR describes an unobstructed path into a resting liquidity pool, favoring continuation rather than counter-trend fading.',
  },
  {
    question: 'What is Stacked Liquidity on an HTF map?',
    context: 'Identifying multi-timeframe confluence.',
    options: [
      'Two or more independent timeframe levels (such as PDH, PWH, and a 4H Equal High) aligning at nearly the same price.',
      'Adding ten identical moving averages on a 1-minute chart.',
      'Placing a stop-loss at the exact 50% Equilibrium of a choppy range.',
    ],
    correctIndex: 0,
    explanation: 'Stacked Liquidity concentrates stops from multiple timeframe participants in one narrow price band.',
  },
  {
    question: 'Does an HTF liquidity target guarantee an immediate reversal on first touch?',
    context: 'Applying risk discipline and close-based invalidation.',
    options: [
      'No; an HTF level is a reference point where orders cluster, requiring LTF confirmation and close-based invalidation rules.',
      'Yes; every touch of PDH or PWH guarantees a zero-drawdown reversal.',
      'Yes; stop-losses are never needed when trading Weekly highs.',
    ],
    correctIndex: 0,
    explanation: 'No liquidity level guarantees a reversal; price can sweep and reverse, consolidate, or displace straight through into a continuation.',
  },
];

export const htfLiquiditySources: CurriculumSource[] = [
  {
    title: 'Investor.gov (SEC) — Stop Order Mechanics & Execution',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope: 'Explains how stop orders convert to market orders when triggered at reference highs/lows, creating concentrated order flow and potential slippage.',
  },
  {
    title: 'CFTC — Futures & Options Market Basics',
    url: 'https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/index.htm',
    scope: 'Official regulatory education on futures contract mechanics, leverage, and order-book execution risk.',
  },
  {
    title: 'CME Group — E-mini & Micro E-mini Nasdaq-100 Specifications',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/e-mini-nasdaq-100.contractSpecs.html',
    scope: 'Defines NQ/MNQ tick sizes, front-month delivery calendars, and settlement rules relevant to continuous vs. contract-level HTF mapping.',
  },
];
