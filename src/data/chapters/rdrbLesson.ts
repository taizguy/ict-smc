import type { CurriculumSource } from '../curriculumReview';
import type { TextbookChapter } from '../../types';
import data from './rdrbDocument.json';

export interface RdrbBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface RdrbSection {
  number: number;
  icon: string;
  title: string;
  blocks: RdrbBlock[];
}

export const rdrbDocument = data as {
  h1: string;
  seoTitle: string;
  seoTitleUr: string;
  metaDescription: string;
  metaDescriptionUr: string;
  quickAnswer: string;
  takeaways: string[];
  sections: RdrbSection[];
  faqs: { question: string; answer: string }[];
};

export const rdrbPath = '/learn/rdrb-balanced-price-range-and-enigma-fvg/';

export const rdrbDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-26', label: '26 November 2026' },
};

const glossaryRows = rdrbDocument.sections[22].blocks
  .find((b) => b.type === 'table')!
  .rows!.slice(1);

export const rdrbChapter: TextbookChapter = {
  id: 56,
  slug: 'rdrb-balanced-price-range-and-enigma-fvg',
  title: rdrbDocument.h1,
  part: 'Part IV - Price Delivery',
  status: 'published',
  level: 3,
  quote: rdrbDocument.quickAnswer,
  summary: [
    ...rdrbDocument.takeaways,
    'Intersection bounds BPR_Low = max(L1, L2) and BPR_High = min(H1, H2) must strictly satisfy BPR_Low < BPR_High.',
    'Keep RDRB second-revisit counting disciplined with explicit swing separation and preserve failed first tests.',
    'Freeze Enigma wick vs. adjacent body-gap anchors before calculating any forward projection multiple.',
  ],
  keyTerms: glossaryRows.map((row) => ({ term: row[0], definition: row[1] })),
  practiceQuestions: rdrbDocument.faqs.slice(0, 5).map((item) => item.question),
  sections: rdrbDocument.sections.map((section) => ({
    id: `56.document.${section.number}`,
    title: section.title,
    content: section.blocks
      .filter((b) => b.type === 'paragraph' || b.type === 'callout')
      .map((b) => b.text || '')
      .filter(Boolean)
      .join('\n\n'),
  })),
};

export const rdrbSources: CurriculumSource[] = [
  {
    title: 'Investor.gov (SEC) — Stop Order',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope:
      'Explains why stock stop-market orders become market orders upon trigger and may execute away from planned invalidation levels outside BPR boundaries.',
  },
  {
    title: 'Investor.gov (SEC) — Types of Orders & Limit Mechanics',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders',
    scope:
      'Details limit-order price ceilings vs. execution risk when passive orders sit at a BPR near edge or 50% equilibrium midpoint.',
  },
  {
    title: 'CME Group — Micro E-mini Nasdaq-100 Contract Specs',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.contractSpecs.html',
    scope:
      'MNQ trades in 0.25-point ticks ($0.50 per tick; $2.00 per index point), dictating how 50% BPR midpoints and 1.25 projection prices round to valid ticks.',
  },
  {
    title: 'CME Group — Central Limit Order Book & Matching',
    url: 'https://www.cmegroup.com/education/articles-and-reports/overview-what-makes-ags-markets-work',
    scope:
      'Exchange explanation of FIFO and pro-rata queue matching showing why chart rectangles never disclose total resting order depth.',
  },
  {
    title: 'NYSE — Trading Hours and Market Holidays Calendar',
    url: 'https://www.nyse.com/trade/hours-calendars',
    scope:
      'Official U.S. equities core session hours (09:30–16:00 ET) used when filtering BPR reactions during active morning liquidity.',
  },
  {
    title: 'NIST — Daylight Saving Time Rules',
    url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst',
    scope:
      'Official U.S. clock calendar ensuring America/New_York session windows remain accurate across seasonal EST/EDT shifts.',
  },
];

export const rdrbQuizzes = [
  {
    question: 'A projection points into an unrealized range. What has price already done?',
    context: 'Boundary between observed two-sided gap overlaps and projected forward multiples.',
    options: [
      'It has not necessarily traded through that proposed interval.',
      'It has already filled every target.',
      'It has verified a compulsory two-candle FVG.',
    ],
    correctIndex: 0,
    explanation: 'A projected future boundary and a completed price interval are different observations.',
  },
  {
    question: 'Leg 1 Bearish FVG spans 20,440–20,460 and Leg 2 Bullish FVG spans 20,432–20,454. What is the exact Bullish BPR range and 50% midpoint?',
    options: [
      '20,440.00 to 20,454.00 with a 50% midpoint of 20,447.00.',
      '20,432.00 to 20,460.00 with a 50% midpoint of 20,446.00.',
      '20,454.00 to 20,460.00 with a 50% midpoint of 20,457.00.',
    ],
    correctIndex: 0,
    explanation:
      'BPR_Low = max(20440, 20432) = 20,440.00 and BPR_High = min(20460, 20454) = 20,454.00; averaging both bounds gives 20,447.00.',
  },
  {
    question: 'What determines whether an overlapping pair of opposing Fair Value Gaps is a Bullish BPR or Bearish BPR?',
    options: [
      'The most recent (second) aggressive displacement leg sets polarity—a Bullish FVG overlapping a prior Bearish FVG creates a Bullish BPR.',
      'The first FVG always dictates bias forever regardless of later price action.',
      'Whichever gap happens to be wider in tick count controls direction.',
    ],
    correctIndex: 0,
    explanation:
      'Sequence controls polarity: the counter-leg that overlaps and supersedes the initial imbalance determines directional reference.',
  },
  {
    question: 'How does a true Balanced Price Range (BPR) differ from a single Inverse Fair Value Gap (IFVG)?',
    options: [
      'A BPR requires two opposing three-candle FVGs whose price intervals physically intersect; an IFVG only needs a closing breach of one existing FVG.',
      'An IFVG always contains two overlapping gaps whereas a BPR uses only one candle.',
      'There is no difference; BPR and IFVG are identical labels for every closed gap.',
    ],
    correctIndex: 0,
    explanation:
      'While a BPR contains an inverted prior gap, an IFVG can form from a slow multi-candle close without creating an opposing FVG overlap.',
  },
  {
    question: 'Under disciplined RDRB touch-counting, when does a second revisit qualify rather than counting noise?',
    options: [
      'After Visit 1 reacts inside the BPR, departs beyond the near edge, clears an interim swing, and later returns cleanly without closing beyond the far edge.',
      'Whenever three consecutive candles wiggle inside the same BPR box during consolidation.',
      'Any time price closes below BPR_Low first and then bounces back weeks later.',
    ],
    correctIndex: 0,
    explanation:
      'Clear swing separation after Visit 1 separates a true second redelivery from consecutive candles inside one continuous visit, while keeping far-edge invalidation intact.',
  },
];
