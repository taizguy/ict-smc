import rawDoc from './orderBlockDocument.json';
import type { ChapterQuizQuestion } from './chapterQuizzes';
import type { CurriculumSource } from '../curriculumReview';

export interface OrderBlockCallout {
  tone: 'emerald' | 'ochre' | 'rose';
  label: string;
  text: string;
}

export interface OrderBlockExtract {
  name: string;
  kind: 'DefinedTerm' | 'CreativeWork';
  formula?: string;
  text: string;
}

export interface OrderBlockTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface OrderBlockBaselineGroup {
  code: string;
  heading: string;
  paragraphs: string[];
}

export interface OrderBlockDocumentSection {
  number: number;
  anchor: string;
  icon: string;
  title: string;
  extract?: OrderBlockExtract;
  paragraphs: string[];
  numberedPoints?: string[];
  bullets?: string[];
  visualId?: string;
  callout?: OrderBlockCallout;
  table?: OrderBlockTable;
  checklist?: { id: string; label: string; detail: string }[];
  glossaryTerms?: { term: string; definition: string }[];
  baselineSections?: OrderBlockBaselineGroup[];
  faqs?: { q: string; a: string }[];
}

export interface OrderBlockDocument {
  title: string;
  quickAnswer: string;
  tocLabel: string;
  sections: OrderBlockDocumentSection[];
}

export const orderBlockDocument = rawDoc as OrderBlockDocument;

export const orderBlockPath = '/learn/order-blocks-ob-and-mitigation/';

export const orderBlockChapter = {
  id: 15,
  position: 29,
  slug: 'order-blocks-ob-and-mitigation',
  title: 'Order Blocks: Selection, Boundaries & Mitigation',
  seoTitle: 'Order Blocks: Selection, Boundaries & Mitigation',
  description:
    'Learn bullish & bearish order blocks, candle runs, body vs. wick boundaries, 50% mean threshold, mitigation, CISD, inducement & animated examples.',
};

export const orderBlockDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export const orderBlockSources: CurriculumSource[] = [
  {
    title: 'ICT 2022 Mentorship — Episode 3 (Order Block Run & Opening Reference)',
    url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c',
    scope:
      'Reviewed selected passages around 15:00 and 24:30 examining consecutive same-direction candle runs, opening-price references, and delivery shifts. All numerical charts, animations, and calculators in this chapter are original LearnSMC educational examples.',
  },
  {
    title: 'ICT Order Blocks & Tape Reading — 18 April 2024',
    url: 'https://www.youtube.com/watch?v=BxR3tVRS_FI',
    scope:
      'Related primary lecture emphasizing hindsight risk in simulated reviews and practical limitations of stop orders; chapter diagrams are synthetic educational demonstrations.',
  },
  {
    title: 'SEC Investor.gov — Stop Order & Order Execution Mechanics',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope:
      'Primary regulatory reference explaining how stop-market orders trigger intrabar and may fill with slippage, distinct from candle-close pattern invalidation.',
  },
  {
    title: 'CME Group — Micro E-mini Nasdaq-100 Contract Specifications',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.contractSpecs.html',
    scope:
      'Primary exchange reference for centralized futures matching, index tick increments ($0.50 per 0.25-point tick in MNQ), and transparent contract sizing.',
  },
  {
    title: 'NYSE — Core Trading Hours & Market Holidays',
    url: 'https://www.nyse.com/trade/hours-calendars',
    scope:
      'Primary reference for the 09:30 AM Eastern U.S. equity cash open driving New York AM volatility and Killzone order-block formation.',
  },
  {
    title: 'NIST — Daylight Saving Time Rules (America/New_York)',
    url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst',
    scope:
      'Authoritative U.S. timekeeping reference for converting session timestamps accurately across seasonal EST/EDT transitions.',
  },
];

export const orderBlockQuizzes: Omit<ChapterQuizQuestion, 'id'>[] = [
  {
    question: 'A three-candle down-close bullish order block run has candle bodies spanning 101–106 and full wicks spanning 99–107. What is the Body Mean Threshold vs. Full-Range Mean Threshold?',
    context: 'Apply Midpoint = (Low + High) / 2 to each explicitly stated boundary set.',
    options: [
      'Body Mean Threshold is 103.5 and Full-Range Mean Threshold is 103.0.',
      'Both Body and Full-Range Mean Threshold equal 106.0.',
      'Body Mean Threshold is 102.0 and Full-Range Mean Threshold is 104.5.',
      'Mean Threshold is always defined as the closing price of the first candle (104.0).',
    ],
    correctIndex: 0,
    explanation:
      'For the body band (101–106), (101 + 106) / 2 = 103.5. For the full wick range (99–107), (99 + 107) / 2 = 103.0. Always state which range your midpoint measures.',
  },
  {
    question: 'What is the observable difference between a Change in State of Delivery (CISD) and a full Market Structure Shift (MSS) after a bullish candle run?',
    context: 'Compare closing through the origin run opening (106) versus closing beyond the external swing reference (109).',
    options: [
      'CISD occurs earlier when a candle closes back above the down-close run opening (106), while MSS waits for a close beyond the external swing high (109).',
      'CISD requires waiting three full trading days after MSS completes.',
      'MSS always happens before price ever reaches the order block opening price.',
      'CISD and MSS are identical names for the exact same wick touch.',
    ],
    correctIndex: 0,
    explanation:
      'CISD measures immediate delivery change through the consecutive run opening price, offering earlier confirmation with higher whipsaw risk; MSS requires clearing the broader structural swing.',
  },
  {
    question: 'A bullish order block spans 99–107 and a separate displacement Fair Value Gap spans 105–108. Which exact price interval represents their true confluence overlap?',
    context: 'Use Intersection = [max(OB_Low, FVG_Low), min(OB_High, FVG_High)].',
    options: [
      '105–107 (width of 2.0 points where both references strictly overlap).',
      '99–108 (the entire combined span of both drawings).',
      '107–108 (only the portion of the FVG sitting outside the order block).',
      'There is no overlap because an order block and an FVG cannot intersect.',
    ],
    correctIndex: 0,
    explanation:
      'max(99, 105) = 105 and min(107, 108) = 107. Only the shared 105–107 slice belongs to both the order block and the Fair Value Gap.',
  },
  {
    question: 'Why does an un-swept mid-leg order block sitting directly above an extreme discount order block often act as Inducement (IDM)?',
    options: [
      'Early buyers place stops just below the mid-leg block, so price frequently sweeps through it before tagging the deeper discount order block.',
      'Mid-leg order blocks are mathematically banned from ever holding on any timeframe.',
      'Exchanges cancel limit orders placed inside mid-leg candles during New York hours.',
      'Inducement only occurs on weekly charts and never on intraday timeframes.',
    ],
    correctIndex: 0,
    explanation:
      'An obvious first pullback block without a preceding liquidity sweep often clusters early retail stops just beneath it, becoming the fuel sweep ahead of the deeper extreme discount block.',
  },
  {
    question: 'What defines a Propulsion Block compared to an initial parent Order Block?',
    options: [
      'A secondary order block formed directly after price taps and reacts from an existing higher-timeframe parent order block.',
      'Any order block that fails and flips polarity into resistance after a stop sweep.',
      'A broad multi-day consolidation zone containing more than twenty candles.',
      'A candle whose wick length is zero on both sides.',
    ],
    correctIndex: 0,
    explanation:
      'A Propulsion Block is born from a completed reaction inside a parent order block, acting as a secondary continuation springboard whose own 50% Mean Threshold is closely monitored.',
  },
  {
    question: 'A paper-trade plan sets a bullish OB limit entry at 106.0, a stop-market order at 98.5, and a target at 121.0. What is the planned R-multiple before costs, and what happens if price dips only to 106.5 before rallying to 121.0?',
    options: [
      'Planned reward-to-risk is 2.0R (15 / 7.5), and the limit order at 106.0 is never filled so realized result is 0R (missed fill).',
      'Planned reward-to-risk is 3.0R, and the limit order fills automatically at 106.5.',
      'The broker retroactively moves the entry to 106.5 to preserve the chart label.',
      'Planned reward-to-risk is 1.0R and the stop triggers at 106.5.',
    ],
    correctIndex: 0,
    explanation:
      'Risk = 106.0 - 98.5 = 7.5 points; Reward = 121.0 - 106.0 = 15.0 points (2.0R before costs). A resting buy limit at 106.0 requires price to trade at or through 106.0; a low of 106.5 leaves the order unfilled.',
  },
];
