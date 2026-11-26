import type { CurriculumSource } from '../curriculumReview';
import type { TextbookChapter } from '../../types';
import data from './oteDocument.json';

export interface OteBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface OteSection {
  number: number;
  icon: string;
  title: string;
  blocks: OteBlock[];
}

export const oteDocument = data as {
  h1: string;
  seoTitle: string;
  seoTitleUr: string;
  metaDescription: string;
  metaDescriptionUr: string;
  quickAnswer: string;
  takeaways: string[];
  sections: OteSection[];
  faqs: { question: string; answer: string }[];
};

export const otePath = '/learn/optimal-trade-entry-ote/';

export const oteDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-26', label: '26 November 2026' },
};

const glossaryRows = oteDocument.sections[23].blocks
  .find((b) => b.type === 'table')!
  .rows!.slice(1);

export const oteChapter: TextbookChapter = {
  id: 1034,
  slug: 'optimal-trade-entry-ote',
  title: oteDocument.h1,
  part: 'Part IV - Price Delivery',
  status: 'published',
  level: 2,
  quote: oteDocument.quickAnswer,
  summary: [
    ...oteDocument.takeaways,
    'Anchor 1.0 at the displacement origin and 0.0 at the extreme termination before measuring retracement depth.',
    'Require Premium/Discount alignment plus FVG, Order Block, or Breaker confluence inside active New York or London windows.',
    'Treat closes beyond 1.0 as decisive range invalidation rather than moving protective stops blindly.',
  ],
  keyTerms: glossaryRows.map((row) => ({ term: row[0], definition: row[1] })),
  practiceQuestions: oteDocument.faqs.slice(0, 5).map((item) => item.question),
  sections: oteDocument.sections.map((section) => ({
    id: `1034.document.${section.number}`,
    title: section.title,
    content: section.blocks
      .filter((b) => b.type === 'paragraph' || b.type === 'callout')
      .map((b) => b.text || '')
      .filter(Boolean)
      .join('\n\n'),
  })),
};

export const oteSources: CurriculumSource[] = [
  {
    title: 'Investor.gov (SEC) — Stop Order',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope: 'Stock stop-market orders become market orders when triggered and may execute away from the stop price beyond 1.0 invalidation.',
  },
  {
    title: 'Investor.gov (SEC) — Types of Orders & Limit Mechanics',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders',
    scope: 'Explains limit-price ceilings vs. marketable orders when resting entry orders sit inside a 0.62–0.79 retracement band.',
  },
  {
    title: 'CME Group — Micro E-mini Nasdaq-100 Contract Specs',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.contractSpecs.html',
    scope: 'MNQ uses $2 per index point and a 0.25-point minimum tick ($0.50 tick value), guiding how 0.618 vs. 0.62 round to exchange ticks.',
  },
  {
    title: 'CME Group — Central Limit Order Book & Matching',
    url: 'https://www.cmegroup.com/education/articles-and-reports/overview-what-makes-ags-markets-work',
    scope: 'Exchange explanation of FIFO and pro-rata queue priority showing why Fibonacci numbers themselves never guarantee order fills.',
  },
  {
    title: 'NYSE — Trading Hours and Market Holidays Calendar',
    url: 'https://www.nyse.com/trade/hours-calendars',
    scope: 'Official schedule for the regular U.S. equities open (09:30 ET) used when pairing OTE pullbacks with active morning volume.',
  },
  {
    title: 'NIST — Daylight Saving Time Rules',
    url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst',
    scope: 'Authoritative U.S. DST calendar keeping America/New_York session filters accurate across winter EST and summer EDT transitions.',
  },
];

export const oteQuizzes = [
  {
    question: 'Why is 0.705 highlighted as the Optimal Trade Entry (OTE) sweet spot?',
    context: 'Arithmetic relationship between the shallow and deep boundaries of the OTE pocket.',
    options: [
      '0.705 is the exact arithmetic midpoint of 0.62 and 0.79: (0.62 + 0.79) ÷ 2 = 0.705.',
      '0.705 is a special exchange settlement ratio enforced by futures clearinghouses.',
      '0.705 is guaranteed to stop every pullback tick-for-tick without a Fair Value Gap.',
    ],
    correctIndex: 0,
    explanation:
      'There is no mysticism behind 0.705: averaging the 0.62 shallow edge and 0.79 deep edge gives 0.705 directly in the middle of deep Discount or Premium.',
  },
  {
    question: 'In a bullish displacement leg from Swing Low 20,400.00 to Swing High 20,500.00, how do you anchor the Fibonacci tool and what price is 0.705?',
    options: [
      'Anchor 1.0 at 20,400.00 and 0.0 at 20,500.00; the 0.705 retracement equals 20,429.50.',
      'Anchor 0.0 at 20,400.00 and 1.0 at 20,500.00; the 0.705 retracement equals 20,470.50.',
      'Anchor 1.0 at 20,450.00 equilibrium and 0.0 at 20,500.00; 0.705 equals 20,464.75.',
    ],
    correctIndex: 0,
    explanation:
      'Dragging chronologically from origin 1.0 (20,400.00) to termination 0.0 (20,500.00) puts 0.705 at 20,500 − 100 × 0.705 = 20,429.50 inside deep Discount.',
  },
  {
    question: 'For a bearish EUR/USD OTE setup (1.0900 High to 1.0800 Low), which condition satisfies both Premium alignment and PD Array confluence?',
    options: [
      'Price rises above 1.0850 Equilibrium into 1.0862–1.0879 and taps a bearish Order Block or FVG during an active Killzone.',
      'Price bounces weakly to 1.0835 (below 0.50 Discount) in thin late-Asian chop with no FVG.',
      'Price closes decisively above 1.0900 (beyond 1.0) while you average down shorts.',
    ],
    correctIndex: 0,
    explanation:
      'Bearish OTE demands retracing above 0.50 into Premium (0.62–0.79 = 1.0862–1.0879) with an overlapping bearish PD array inside active liquidity hours.',
  },
  {
    question: 'What is the proper placement for protective stop invalidation on an OTE setup, and why avoid hiding stops at 0.79?',
    options: [
      'Place invalidation beyond the 1.0 origin (such as a 5% buffer beyond 1.0), because pullbacks frequently sweep 0.79 toward 0.85 before turning.',
      'Place the stop at 0.795 inside the range so every setup prints an inflated 10R ratio on paper.',
      'Remove the stop loss altogether because 0.705 always bounces immediately.',
    ],
    correctIndex: 0,
    explanation:
      'The 1.0 origin is the structural foundation of the anchored impulse; placing stops beyond 1.0 separates normal deep sweeps from genuine thesis invalidation.',
  },
  {
    question: 'During a synthetic NQ bullish expansion, price tags 0.705 (20,429.50) and pushes past 20,500.00 (0.0). What price marks the -0.27 and -0.62 symmetrical extension targets?',
    options: [
      '-0.27 equals 20,527.00 and -0.62 equals 20,562.00.',
      '-0.27 equals 20,473.00 and -0.62 equals 20,438.00.',
      '-0.27 equals 20,550.00 and -0.62 equals 20,620.00.',
    ],
    correctIndex: 0,
    explanation:
      'Using Price(r) = 20,500 − 100 × r with negative targets yields 20,500 + 27 = 20,527.00 at -0.27 and 20,500 + 62 = 20,562.00 at -0.62.',
  },
];
