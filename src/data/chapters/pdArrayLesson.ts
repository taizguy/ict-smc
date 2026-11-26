import type { CurriculumSource } from '../curriculumReview';
import type { TextbookChapter } from '../../types';
import data from './pdArrayDocument.json';

export interface PdArrayBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface PdArraySection {
  number: number;
  icon: string;
  title: string;
  blocks: PdArrayBlock[];
}

export const pdArrayDocument = data as {
  h1: string;
  seoTitle: string;
  seoTitleUr: string;
  metaDescription: string;
  metaDescriptionUr: string;
  quickAnswer: string;
  takeaways: string[];
  sections: PdArraySection[];
  faqs: { question: string; answer: string }[];
};

export const pdArrayPath = '/learn/ict-pd-array-selection-price-delivery-continuum/';

export const pdArrayDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-26', label: '26 November 2026' },
};

const glossaryRows = pdArrayDocument.sections[22].blocks
  .find((b) => b.type === 'table')!
  .rows!.slice(1);

export const pdArrayChapter: TextbookChapter = {
  id: 59,
  slug: 'ict-pd-array-selection-price-delivery-continuum',
  title: pdArrayDocument.h1,
  part: 'Part IV - Price Delivery',
  status: 'published',
  level: 3,
  quote: pdArrayDocument.quickAnswer,
  summary: [
    ...pdArrayDocument.takeaways,
    'Keep the selected range and lookback explicit.',
    'Distinguish wick geometry from body-gap conventions.',
    'A relevant reference may never offer an entry.',
  ],
  keyTerms: glossaryRows.map((row) => ({ term: row[0], definition: row[1] })),
  practiceQuestions: pdArrayDocument.faqs.slice(0, 6).map((item) => item.question),
  sections: pdArrayDocument.sections.map((section) => ({
    id: `59.document.${section.number}`,
    title: section.title,
    content: section.blocks
      .filter((b) => b.type === 'paragraph' || b.type === 'callout')
      .map((b) => b.text || '')
      .filter(Boolean)
      .join('\n\n'),
  })),
};

export const pdArraySources: CurriculumSource[] = [
  {
    title: 'Investor.gov (SEC) — Stop Order',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope:
      'Explains why stop-market orders become market orders upon trigger and may execute with slippage past declared Range High or Range Low invalidation levels.',
  },
  {
    title: 'Investor.gov (SEC) — Types of Orders & Limit Mechanics',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders',
    scope:
      'Clarifies limit-price guarantees versus fill uncertainty when passive orders sit at 50% Equilibrium, Consequent Encroachment (CE), or Mean Threshold (MT).',
  },
  {
    title: 'CME Group — Micro E-mini Nasdaq-100 Contract Specs',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.contractSpecs.html',
    scope:
      'Documents MNQ 0.25-point minimum tick increments ($0.50 per tick) used when snapping 50% Equilibrium, 25%/75% Quadrants, and Order Block boundaries.',
  },
  {
    title: 'CME Group — Central Limit Order Book & Matching',
    url: 'https://www.cmegroup.com/education/articles-and-reports/overview-what-makes-ags-markets-work',
    scope:
      'Exchange explanation of FIFO and pro-rata order matching showing why candlestick charts never disclose hidden resting order quantities.',
  },
  {
    title: 'NYSE — Trading Hours and Market Holidays Calendar',
    url: 'https://www.nyse.com/trade/hours-calendars',
    scope:
      'Authoritative U.S. equities core session calendar (09:30–16:00 ET) separating completed trading sessions from weekend/holiday closures.',
  },
  {
    title: 'NIST — Daylight Saving Time Rules',
    url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst',
    scope:
      'Official U.S. clock rules keeping America/New_York Midnight Open, NWOG, NDOG, and session filters accurate year-round.',
  },
];

export const pdArrayQuizzes = [
  {
    question: 'A completed range is 100–140. Where is 132?',
    context: 'Quadrant arithmetic inside a frozen dealing range.',
    options: [
      'Upper quarter of this range (80%, Q4 Premium)',
      'Discount in every possible range',
      'Proof of fundamental overvaluation',
    ],
    correctIndex: 0,
    explanation:
      'In a 100–140 range, Equilibrium is 120 and the 75% Q4 boundary is 130, placing 132 at 80% in the upper quarter. Changing the range to 100–180 puts Equilibrium at 140, flipping 132 to Discount.',
  },
  {
    question: 'Are twenty trading days twenty calendar days?',
    options: [
      'No. Count completed trading sessions; weekends and market closures are not additional trading days.',
      'Yes; weekends count exactly like trading sessions.',
      'Use twenty future sessions to complete the range.',
    ],
    correctIndex: 0,
    explanation:
      'Weekends and exchange holidays generate no regular session price discovery, so 20-day lookbacks count completed trading sessions only.',
  },
  {
    question: 'Can you switch dealing-range anchors whenever a setup fails?',
    options: [
      'Not in a consistent test. Declare extensions and their rules before seeing the outcome.',
      'Yes; any new lookback preserves the original test.',
      'Use whichever range makes the last trade look right.',
    ],
    correctIndex: 0,
    explanation:
      'Moving anchors post-outcome introduces hindsight bias. Freeze range boundaries upfront and log failures honestly.',
  },
  {
    question: 'How does Consequent Encroachment (CE) differ from Mean Threshold (MT) inside a PD Array Matrix?',
    options: [
      'CE measures the 50% midpoint of a gap or rejection wick (FVG/NWOG); MT measures the 50% midpoint of a solid Order Block or Breaker candle body.',
      'MT is used exclusively for Fair Value Gaps while CE is only for daily charts.',
      'Both always equal the 50% Equilibrium of the entire 20-day dealing range.',
    ],
    correctIndex: 0,
    explanation:
      'Keep gap midpoints (CE) separate from solid candle-body midpoints (MT) so Order Block and Fair Value Gap invalidation levels never blur.',
  },
  {
    question: 'Suppose a previous close is 100, central candle open/close is 102/106, and next open is 108 with overlapping wicks. What is this structure?',
    options: [
      'A Suspension Block with separate body gaps at 100–102 and 106–108, not a classic 100–108 outer-wick FVG.',
      'A guaranteed 100–108 classic Fair Value Gap regardless of overlapping wicks.',
      'An automatic 15-minute Liquidity Void requiring blind market buying.',
    ],
    correctIndex: 0,
    explanation:
      'Classic FVGs compare non-overlapping outer wicks. Suspension geometry analyzes body-price gaps flanking a central candle even when outer wicks overlap.',
  },
  {
    question: 'A 15-minute chart pulls back into 72% (15M Premium) while sitting directly inside a 4H Discount Order Block. What aligns both clocks?',
    options: [
      'Wait for the tiny 15M swing to dip back under its own 50% Equilibrium into 15M Discount while still holding inside the 4H Discount OB.',
      'Aggressively short against the 4H Discount Order Block using a 1-minute scalp.',
      'Ignore the 4H chart completely because 15M timeframes always override higher timeframes.',
    ],
    correctIndex: 0,
    explanation:
      'Fractal nesting solves timeframe conflict: waiting for LTF Discount inside HTF Discount aligns lower-timeframe entry price with higher-timeframe directional support.',
  },
];
