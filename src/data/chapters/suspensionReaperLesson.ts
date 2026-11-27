import type { CurriculumSource } from '../curriculumReview';
import type { TextbookChapter } from '../../types';
import data from './suspensionReaperDocument.json';

export interface SuspensionReaperBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface SuspensionReaperSection {
  number: number;
  icon: string;
  title: string;
  blocks: SuspensionReaperBlock[];
}

export const suspensionReaperDocument = data as {
  h1: string;
  seoTitle: string;
  seoTitleUr: string;
  metaDescription: string;
  metaDescriptionUr: string;
  quickAnswer: string;
  takeaways: string[];
  sections: SuspensionReaperSection[];
  faqs: { question: string; answer: string }[];
};

export const suspensionReaperPath = '/learn/reaper-ifvg-and-suspension-block-advancements/';

export const suspensionReaperDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-26', label: '26 November 2026' },
};

const glossaryRows = suspensionReaperDocument.sections[22].blocks
  .find((b) => b.type === 'table')!
  .rows!.slice(1);

export const suspensionReaperChapter: TextbookChapter = {
  id: 55,
  slug: 'reaper-ifvg-and-suspension-block-advancements',
  title: suspensionReaperDocument.h1,
  part: 'Part IV - Price Delivery',
  status: 'published',
  level: 3,
  quote: suspensionReaperDocument.quickAnswer,
  summary: [
    ...suspensionReaperDocument.takeaways,
    'Bullish Suspension requires bodyLow(C2) > bodyHigh(C1) AND bodyLow(C3) > bodyHigh(C2) on stated feeds.',
    'Bearish Suspension requires bodyHigh(C2) < bodyLow(C1) AND bodyHigh(C3) < bodyLow(C2) with explicit close invalidation.',
    'Reaper FVG requires a nested IFVG + opposing FVG overlap inside a Breaker sweep context; study ordinary failed inversions separately.',
  ],
  keyTerms: glossaryRows.map((row) => ({ term: row[0], definition: row[1] })),
  practiceQuestions: suspensionReaperDocument.faqs.slice(0, 5).map((item) => item.question),
  sections: suspensionReaperDocument.sections.map((section) => ({
    id: `55.document.${section.number}`,
    title: section.title,
    content: section.blocks
      .filter((b) => b.type === 'paragraph' || b.type === 'callout')
      .map((b) => b.text || '')
      .filter(Boolean)
      .join('\n\n'),
  })),
};

export const suspensionReaperSources: CurriculumSource[] = [
  {
    title: 'Investor.gov (SEC) — Stop Order Mechanics & Slippage',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope:
      'Explains why triggered stop-market orders convert into market orders and can slip across thin Volume Imbalance corridors during fast macro releases.',
  },
  {
    title: 'Investor.gov (SEC) — Limit vs. Market Order Execution',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders',
    scope:
      'Contrasts limit-order fill-price protection at Suspension or Reaper boundaries against non-execution risk when price turns shy of a level.',
  },
  {
    title: 'CME Group — Micro E-mini Nasdaq-100 Contract Specs (MNQ)',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.contractSpecs.html',
    scope:
      'Specifies MNQ 0.25-point minimum tick size ($0.50 per tick; $2.00 per index point) and quarterly delivery months needed when calibrating front-month vs. continuous feeds.',
  },
  {
    title: 'CME Group — Order Book Priority & Liquidity Matching',
    url: 'https://www.cmegroup.com/education/articles-and-reports/overview-what-makes-ags-markets-work',
    scope:
      'Clarifies why OHLC body gaps and FVG rectangles cannot disclose resting limit depth or prove institutional sponsorship.',
  },
  {
    title: 'NYSE — Core Trading Hours & Holiday Calendar',
    url: 'https://www.nyse.com/trade/hours-calendars',
    scope:
      'Establishes official 09:30–16:00 ET regular U.S. equity hours used to anchor New York session Volume Imbalance studies.',
  },
  {
    title: 'NIST — U.S. Daylight Saving Time Transitions',
    url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst',
    scope:
      'Maintains accurate America/New_York EST/EDT session alignment across seasonal clock changes.',
  },
];

export const suspensionReaperQuizzes = [
  {
    question: 'Which geometry matches the reviewed suspension illustration?',
    context: 'Exact distinction between a Suspension Block and other three-candle formations.',
    options: [
      'Separated adjacent bodies with touching or overlapping wicks.',
      'Any isolated counter-trend candle.',
      'Every failed inversion FVG.',
    ],
    correctIndex: 0,
    explanation:
      'Body-price separation differs from a standard three-candle outer-wick FVG because Open/Close bodies detach around Candle 2 even while wicks overlap.',
  },
  {
    question: 'If C1 closes at 20,416, C2 opens at 20,420 and closes at 20,430, and C3 opens at 20,435, what are the two Volume Imbalances?',
    context: 'Calculating dual body-to-body boundaries on synthetic NQ candles.',
    options: [
      'Lower VI spans 20,416–20,420 and Upper VI spans 20,430–20,435, suspending C2 body.',
      'Only one classic FVG exists at 20,420–20,435.',
      'No imbalance exists because C2 is a bullish candle.',
    ],
    correctIndex: 0,
    explanation:
      'Candle 2 sits completely separated above C1 close (4-point VI-1) and below C3 open (5-point VI-2), suspending its 20,420–20,430 body.',
  },
  {
    question: 'Does the reviewed 9 June 2026 variant define every failed Inverse FVG as a Reaper FVG?',
    context: 'Separating online folklore from the sourced two-gap Breaker overlap model.',
    options: [
      'No; study an ordinary failed inversion as a failed IFVG unless the nested two-gap Breaker context is present.',
      'Yes; every failed IFVG is automatically a compulsory 09:50 Reaper trap.',
      'Yes; a chart label alone guarantees an immediate reversal.',
    ],
    correctIndex: 0,
    explanation:
      'The documented Reaper FVG variant examines a validated IFVG nested directly with an opposing active FVG inside a Breaker leg.',
  },
  {
    question: 'Why must continuous futures coordinates (e.g., NQ1!) not be copied blindly onto an active delivery contract?',
    context: 'Contract feed parity across back-adjusted continuous and front-month futures.',
    options: [
      'Back-adjustments and roll basis shift candle shapes and absolute prices between the continuous chart and front-month executions.',
      'Continuous charts only update once per quarter after options expiration.',
      'Front-month futures automatically erase all Volume Imbalances.',
    ],
    correctIndex: 0,
    explanation:
      'Record symbol, delivery month, adjustment mode, and basis offset before transferring any gap level onto an execution chart.',
  },
  {
    question: 'In a Bearish Reaper setup, Bullish FVG1 sits at 1.08720–1.08790 and new Bearish FVG2 spans 1.08740–1.08820. What is the nested overlap?',
    context: 'Computing max(L1, L2) to min(H1, H2) for two nested Reaper gaps.',
    options: [
      '1.08740 to 1.08790 (5-pip overlap inside the Breaker context).',
      '1.08720 to 1.08820 (the full combined union).',
      'There is no overlap because the two gaps point in opposite directions.',
    ],
    correctIndex: 0,
    explanation:
      'The intersection runs from max(1.08720, 1.08740) = 1.08740 up to min(1.08790, 1.08820) = 1.08790.',
  },
  {
    question: 'Does a Suspension Block establish a universal 1% risk rule or guaranteed first-touch bounce?',
    context: 'Capital preservation, stop mechanics, and evidentiary limits.',
    options: [
      'No; body gaps are observable chart references requiring explicit closing invalidation, tick sizing, and slippage awareness.',
      'Yes; the upper Volume Imbalance edge guarantees zero drawdown on first touch.',
      'Yes; midpoint stops inside Candle 2 are never swept during NY Open.',
    ],
    correctIndex: 0,
    explanation:
      'Price can retrace past Upper VI into Lower VI or close straight through the entire block; pre-set close invalidation and micro/mini tick risk are essential.',
  },
];
