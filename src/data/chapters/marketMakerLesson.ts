import type { CurriculumSource } from '../curriculumReview';
import type { TextbookChapter } from '../../types';
import data from './marketMakerDocument.json';

export interface MarketMakerBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface MarketMakerSection {
  number: number;
  icon: string;
  title: string;
  blocks: MarketMakerBlock[];
}

export const marketMakerDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: MarketMakerSection[];
  faqs: { question: string; answer: string }[];
};

export const marketMakerPath = '/learn/ict-charter-models-6-and-7-universal-models/';

export const marketMakerDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-24', label: '24 November 2026' },
};

const glossaryRows = marketMakerDocument.sections[19].blocks
  .find((b) => b.type === 'table')!
  .rows!.slice(1);

export const marketMakerChapter: TextbookChapter = {
  id: 33,
  slug: 'ict-charter-models-6-and-7-universal-models',
  title: marketMakerDocument.h1,
  part: 'Part VII - Entry Models',
  status: 'published',
  level: 3,
  quote: marketMakerDocument.quickAnswer,
  summary: [
    ...marketMakerDocument.takeaways,
    'Buyside and sellside range expansions anchored to Discount (<50%) and Premium (>50%) Dealing Ranges.',
    'Two-sided curve symmetry linking Original Consolidation, Smart Money Reversal, and Terminus liquidity.',
    'Low-Resistance vs. High-Resistance Liquidity Runs (LRLR / HRLR) and Midweek Reversal timing.',
    'Structured scaling across Low-Risk Buy/Sell entries and Re-Accumulation/Re-Distribution stages.',
  ],
  keyTerms: glossaryRows.map((r) => ({ term: r[0], definition: r[1] })),
  practiceQuestions: marketMakerDocument.faqs.slice(0, 5).map((q) => q.question),
  sections: marketMakerDocument.sections.map((s) => ({
    id: `33.document.${s.number}`,
    title: s.title,
    content: s.blocks
      .filter((b) => b.type === 'paragraph' || b.type === 'callout')
      .map((b) => b.text || '')
      .filter(Boolean)
      .join('\n\n'),
  })),
};

export const marketMakerSources: CurriculumSource[] = [
  {
    title: 'Investor.gov (SEC) — Stop, Stop-Limit, and Market Orders',
    url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15',
    scope:
      'Official investor education detailing how stop-market orders convert on trigger with possible slippage and how stop-limit orders risk non-execution during fast curve turns.',
  },
  {
    title: 'Investor.gov (SEC) — Types of Orders & Execution Priority',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders',
    scope:
      'Defines limit price boundaries, marketable orders, and why liquidity sweeps near swing highs or lows cannot guarantee exact stop fill prices.',
  },
  {
    title: 'CME Group — Exchange Matching & Market Microstructure',
    url: 'https://www.cmegroup.com/education/articles-and-reports/overview-what-makes-ags-markets-work',
    scope:
      'Explains central limit order book matching, queue depth, and how resting limit interest clears across liquid futures contracts.',
  },
  {
    title: 'CME Group — About Volume and Open Interest',
    url: 'https://www.cmegroup.com/trading/about-volume.html',
    scope:
      'Distinguishes traded volume from open interest when assessing multi-day swing expansion versus intraday liquidity sweeps.',
  },
  {
    title: 'CFTC — Commitments of Traders Explanatory Notes',
    url: 'https://www.cftc.gov/MarketReports/CommitmentsofTraders/ExplanatoryNotes/index.htm',
    scope:
      'Clarifies reporting categories and limits of macro positioning reports alongside multi-week curve and midweek reversal analysis.',
  },
  {
    title: 'Bank for International Settlements — FX Execution Fragmentation',
    url: 'https://www.bis.org/publications/qr-201912/fx-trade-execution-complex-and-highly-fragmented',
    scope:
      'Explains why spot FX operates across decentralized dealer streams and electronic venues without a single consolidated order book.',
  },
  {
    title: 'NYSE — Trading Hours and Market Holidays Calendar',
    url: 'https://www.nyse.com/trade/hours-calendars',
    scope:
      'Authoritative reference for regular equity session opens, holidays, and shortened sessions that reshape liquidity curves.',
  },
];

export const marketMakerQuizzes = [
  {
    question:
      'In a Market Maker Buy Model (MMBM) with a Higher Timeframe Dealing Range from 1.0780 (Low) to 1.0960 (High), where is a Discount-filtered long setup strictly permitted?',
    context: 'Illustrative synthetic Dealing Range for Equilibrium filtering.',
    options: [
      'Strictly inside Discount below the 1.0870 Equilibrium midpoint at a qualified PD array.',
      'Only above 1.0920 after clearing the Original Consolidation high.',
      'Anywhere inside the range regardless of Equilibrium as long as a 1-minute green candle prints.',
    ],
    correctIndex: 0,
    explanation:
      'Equilibrium = (1.0960 + 1.0780) ÷ 2 = 1.0870. The Discount Equilibrium filter prohibits buying in Premium (> 1.0870) and anchors longs strictly at Discount PD arrays below Equilibrium.',
  },
  {
    question:
      'A downward Sell-Side Curve taps a Daily Discount Fair Value Gap and sweeps a Monday low, then prints a tiny wick bounce without any completed CISD or MSS close. What is the correct MMBM action?',
    options: [
      'Wait for a completed CISD/MSS body close and structural FVG/breaker shift rather than catching falling candles.',
      'Enter full size immediately because every sweep of a Monday low confirms a Smart Money Reversal.',
      'Re-label the drop as an LRLR Terminus and short into the Daily Discount low.',
    ],
    correctIndex: 0,
    explanation:
      'A sweep into an HTF PD array is only the first condition; without a completed body close confirming a Change in State of Delivery (CISD) or Market Structure Shift (MSS), price may simply keep distributing lower.',
  },
  {
    question:
      'Inside a Market Maker Buy Model from an SMR low of 1.0800 toward Original Consolidation Terminus at 1.0920, what role does 1.0860 play?',
    options: [
      'It is the 50% SMR Symmetry checkpoint validating multi-stage sponsorship toward Terminus.',
      'It guarantees that every candle above 1.0860 will close green without pullbacks.',
      'It cancels the Original Consolidation target and reverses the model into an MMSM.',
    ],
    correctIndex: 0,
    explanation:
      'Halfway between 1.0800 and 1.0920 is 1.0860. Reclaiming and holding above that 50% symmetry gate signals transition into Stage-2 Re-Accumulation; stalling below it warns of a failed curve.',
  },
  {
    question:
      'Which path description defines a Low-Resistance Liquidity Run (LRLR) inside short-term swing analysis?',
    options: [
      'Smooth equal highs or lows ahead with minimal opposing Order Blocks or Breakers blocking delivery.',
      'Jagged overlapping ranges stacked directly beneath multiple fresh Higher Timeframe Bearish Breakers.',
      'Any 5-minute breakout occurring strictly outside London or New York trading windows.',
    ],
    correctIndex: 0,
    explanation:
      'LRLR identifies cleaner paths toward smooth unviolated liquidity pools without dense opposing PD array friction, whereas HRLR paths must fight through stacked opposing structure.',
  },
  {
    question:
      'A trader scales into an MMBM using two orders: 1st at Low-Risk Buy (Stage 4) and 2nd at Stage-1 Re-Accumulation. How should setup risk be budgeted?',
    options: [
      'Split the single setup risk budget across both orders so combined loss stays within the pre-set limit.',
      'Risk the full account maximum on each order because Re-Accumulation is risk-free.',
      'Remove the protective stop-loss once Stage-1 Re-Accumulation fills.',
    ],
    correctIndex: 0,
    explanation:
      'Under disciplined position-sizing rules, multiple entries on the same directional idea divide a single risk budget before costs rather than multiplying total exposure.',
  },
];
