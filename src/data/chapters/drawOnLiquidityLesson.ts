import type { CurriculumSource } from '../curriculumReview';
import type { TextbookChapter } from '../../types';
import data from './drawOnLiquidityDocument.json';

export interface DolBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface DolSection {
  number: number;
  icon: string;
  title: string;
  blocks: DolBlock[];
}

export const drawOnLiquidityDocument = data as {
  h1: string;
  seoTitle: string;
  seoTitleUr: string;
  metaDescription: string;
  metaDescriptionUr: string;
  quickAnswer: string;
  takeaways: string[];
  sections: DolSection[];
  faqs: { question: string; answer: string }[];
};

export const drawOnLiquidityPath = '/learn/draw-on-liquidity/';

export const drawOnLiquidityDates = {
  published: { iso: '2026-11-28', label: '28 November 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export const drawOnLiquidityChapter: TextbookChapter = {
  id: 1023,
  slug: 'draw-on-liquidity',
  part: 'Part III - Liquidity, Time & Macro Mechanics',
  title: drawOnLiquidityDocument.h1,
  level: 3,
  status: 'published',
  quote: drawOnLiquidityDocument.quickAnswer,
  summary: [
    ...drawOnLiquidityDocument.takeaways,
  ],
  keyTerms: [
    { term: 'Draw on Liquidity (DOL)', definition: 'The primary resting liquidity pool or imbalance toward which price is currently expanding.' },
    { term: 'External Range Liquidity (ERL)', definition: 'Resting stop-losses and breakout orders sitting outside a dealing range (swing highs/lows, EQH/EQL, PDH/PDL).' },
    { term: 'Internal Range Liquidity (IRL)', definition: 'Unmitigated Fair Value Gaps, Order Blocks, and minor pivots located inside a dealing range.' },
    { term: 'Low-Resistance Liquidity Run (LRLR)', definition: 'Unobstructed, rapid price delivery toward an obvious resting liquidity pool.' },
  ],
  practiceQuestions: drawOnLiquidityDocument.faqs.slice(0, 5).map((item) => item.question),
  sections: drawOnLiquidityDocument.sections.map((section) => ({
    id: `1023.${section.number}`,
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

export interface DolQuizItem {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const drawOnLiquidityQuizzes: DolQuizItem[] = [
  {
    question: 'What is the primary purpose of identifying a Draw on Liquidity (DOL) before entering a trade?',
    context: 'Replacing arbitrary risk-to-reward targets with market geography.',
    options: [
      'To determine the most logical liquidity pool or imbalance toward which price is expanding next.',
      'To guarantee that every trade will hit a fixed 1:5 reward ratio.',
      'To avoid ever using a stop-loss on intraday charts.',
    ],
    correctIndex: 0,
    explanation: 'DOL anchors your take-profit and directional bias to real chart references (ERL pools or IRL imbalances) rather than arbitrary ratios.',
  },
  {
    question: 'After price sweeps External Range Liquidity (e.g., PDH) and shifts lower with displacement, what typically becomes the immediate Draw on Liquidity?',
    context: 'Understanding the ERL → IRL → ERL oscillation cycle.',
    options: [
      'An unmitigated Internal Range Liquidity (IRL) Fair Value Gap or Order Block inside the dealing range.',
      'An unrelated swing high 500 points above the Monthly range.',
      'A random 1-minute doji candle inside 50% Equilibrium.',
    ],
    correctIndex: 0,
    explanation: 'After sweeping ERL, price frequently draws inward to rebalance an internal inefficiency (IRL) before expanding again.',
  },
  {
    question: 'Which price-action signature best confirms which Draw on Liquidity is currently active?',
    context: 'Using order flow as a tie-breaker between competing pools.',
    options: [
      'Energetic displacement candles leaving consecutive Fair Value Gaps and breaking short-term structure.',
      'Slow, overlapping wicks drifting sideways during Asian lunch.',
      'Adding five extra oscillators to a 1-minute chart.',
    ],
    correctIndex: 0,
    explanation: 'Displacement demonstrates active directional commitment toward the next opposing pool.',
  },
  {
    question: 'If an unmitigated 4H Bearish Fair Value Gap sits directly in front of a distant Weekly High during a bullish move, what is the prudent approach?',
    context: 'Managing nearby IRL barriers vs. distant ERL targets.',
    options: [
      'Treat the nearby 4H FVG as an immediate partial target or caution zone before expecting the Weekly High.',
      'Ignore the 4H FVG completely and move your stop-loss further away.',
      'Double your position size directly inside the 4H Bearish FVG.',
    ],
    correctIndex: 0,
    explanation: 'Nearby higher-timeframe IRL imbalances often trigger reactions before price can reach more distant external highs.',
  },
  {
    question: 'Why does a Low-Resistance Liquidity Run (LRLR) favor target completion over a High-Resistance Liquidity Run (HRLR)?',
    context: 'Evaluating path resistance to the selected target.',
    options: [
      'LRLR has an unobstructed path with clean FVGs and few opposing swing barriers.',
      'HRLR has zero wicks and always moves twice as fast.',
      'LRLR only occurs when markets are closed.',
    ],
    correctIndex: 0,
    explanation: 'Clean air with minimal opposing swings allows price to reach the selected liquidity pool with less friction.',
  },
  {
    question: 'Does a Draw on Liquidity guarantee that price will reach your take-profit without invalidation?',
    context: 'Risk management and close-based invalidation discipline.',
    options: [
      'No; a Draw on Liquidity is a working directional hypothesis requiring close-based invalidation and strict tick/pip risk.',
      'Yes; once marked on a Daily chart, price must reach it before reversing.',
      'Yes; displacement guarantees 100% follow-through on every session.',
    ],
    correctIndex: 0,
    explanation: 'No chart target is guaranteed; decisive opposing closes and structural shifts invalidate the active draw.',
  },
];

export const drawOnLiquiditySources: CurriculumSource[] = [
  {
    title: 'Investor.gov (SEC) — Stop Orders & Limit Orders',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope: 'Official investor education on how stop orders trigger market execution at reference highs and lows.',
  },
  {
    title: 'CFTC — Futures & Options Market Basics',
    url: 'https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/index.htm',
    scope: 'Regulatory overview of futures contract risk, leverage, and order-book mechanics.',
  },
  {
    title: 'CME Group — E-mini & Micro E-mini Nasdaq-100 Specifications',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/e-mini-nasdaq-100.contractSpecs.html',
    scope: 'Contract tick increments and delivery specifications for index futures target and risk measurement.',
  },
];
