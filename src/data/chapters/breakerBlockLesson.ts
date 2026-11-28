import rawDoc from './breakerBlockDocument.json';
import type { ChapterQuizQuestion } from './chapterQuizzes';
import type { CurriculumSource } from '../curriculumReview';

export interface BreakerSectionCallout {
  tone: 'cobalt' | 'amber' | 'emerald' | 'rose';
  label: string;
  text: string;
}

export interface BreakerSectionExtract {
  name: string;
  kind: 'DefinedTerm' | 'CreativeWork';
  formula?: string;
  text: string;
}

export interface BreakerSectionTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface BreakerBaselineGroup {
  code: string;
  heading: string;
  paragraphs: string[];
}

export interface BreakerDocumentSection {
  number: number;
  anchor: string;
  icon: string;
  title: string;
  extract?: BreakerSectionExtract;
  paragraphs: string[];
  numberedPoints?: string[];
  bullets?: string[];
  visualId?: string;
  callout?: BreakerSectionCallout;
  table?: BreakerSectionTable;
  checklist?: { id: string; label: string; detail: string }[];
  glossaryTerms?: { term: string; definition: string }[];
  baselineSections?: BreakerBaselineGroup[];
  faqs?: { q: string; a: string }[];
}

export interface BreakerBlockDocument {
  title: string;
  quickAnswer: string;
  tocLabel: string;
  sections: BreakerDocumentSection[];
}

export const breakerBlockDocument = rawDoc as BreakerBlockDocument;

export const breakerBlockPath = '/learn/breaker-blocks-trading-failed-order-blocks/';

export const breakerBlockChapter = {
  id: 16,
  position: 30,
  slug: 'breaker-blocks-trading-failed-order-blocks',
  title: 'Breaker Blocks: Trading Failed Order Blocks',
  seoTitle: 'Breaker Blocks: Trading Failed Order Blocks',
  description:
    'Learn bullish & bearish breaker blocks, A-B-C-D sweep flips, mitigation vs. order blocks, Unicorn FVG overlaps, OHLC rules, and invalidation.',
};

export const breakerBlockDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export const breakerBlockSources: CurriculumSource[] = [
  {
    title: 'ICT 2022 Mentorship — Episode 39 (Breaker Sequence & Context)',
    url: 'https://www.youtube.com/watch?v=yFpHbBnsK_c&t=1220s',
    scope:
      'Reviewed selected passages covering the external liquidity sweep, reversal, intervening swing-reference return, and wider target context. All numerical OHLC charts, Unicorn calculators, and diagrams in this chapter are original LearnSMC educational examples.',
  },
  {
    title: 'SEC Investor.gov — Types of Orders (Market, Limit & Stop Orders)',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders',
    scope:
      'Primary regulatory reference for stop-market slippage risk, stop-limit non-execution risk, and intrabar stop triggers versus candle-close pattern rules.',
  },
  {
    title: 'CME Group — Introduction to Futures & Central Limit Order Book',
    url: 'https://www.cmegroup.com/education/courses/introduction-to-futures.html',
    scope:
      'Primary exchange reference for index futures contract mechanics (NQ, ES), centralized order matching, and transparent session liquidity profiles.',
  },
  {
    title: 'NYSE — Core Trading Hours & Market Holidays',
    url: 'https://www.nyse.com/markets/hours-calendars',
    scope:
      'Primary exchange reference for the 09:30 AM Eastern equity cash open window driving New York AM volatility and Killzone sweeps.',
  },
  {
    title: 'NIST — Daylight Saving Time Rules (America/New_York)',
    url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst',
    scope:
      'Authoritative US timekeeping reference for aligning London and New York Killzone clocks across seasonal EST/EDT shifts.',
  },
  {
    title: 'CFTC — Retail Forex & Futures Trading Risk Advisories',
    url: 'https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/index.htm',
    scope:
      'Primary US derivatives regulator risk framework clarifying leveraged trading risks and why historical chart patterns carry no automatic outcome.',
  },
];

export const breakerBlockQuizzes: Omit<ChapterQuizQuestion, 'id'>[] = [
  {
    question: 'Which chronological event separates a Breaker Block from a Mitigation Block?',
    context: 'Compare Point C relative to the prior external swing at Point A before price breaks Point B.',
    options: [
      'Point C strictly sweeps beyond Point A before price reverses and closes past Point B.',
      'Point C stops short of Point A, forming a failure swing before breaking Point B.',
      'Point B must print during the Asian lunch consolidation without any volume increase.',
      'The candle at Point B must be a doji with zero body height.',
    ],
    correctIndex: 0,
    explanation:
      'A Breaker Block requires an external liquidity sweep where Point C trades strictly beyond Point A before the opposing structural break through Point B. Without that sweep, the failed-swing sequence is classified as a Mitigation Block.',
  },
  {
    question: 'In a Bearish Breaker sequence (High A = 110, Low B = 100, Sweep C = 112), when does the Point B candle officially qualify as a Bearish Breaker?',
    context: 'Focus on the difference between an intrabar wick probe and completed structural confirmation.',
    options: [
      'Only after a completed candle body closes strictly below Low B (100.00).',
      'Immediately when price touches 112.00 at Point C, before dropping to 100.00.',
      'As soon as a lower wick touches 99.50 even if the candle closes back at 101.20.',
      'Before Point C even reaches High A at 110.00.',
    ],
    correctIndex: 0,
    explanation:
      'Point C alone is only the sweep, and a wick-only poke below 100.00 is merely a liquidity probe. Waiting for a completed candle body close below Low B (Point D) confirms the Market Structure Shift and activates the Bearish Breaker.',
  },
  {
    question: 'A Bullish Breaker spans 106.00–110.00 and a displacement Bullish FVG spans 104.00–106.00. Does this qualify as an ICT Unicorn overlap?',
    context: 'Apply the interval intersection rule: [max(BB_Low, FVG_Low), min(BB_High, FVG_High)].',
    options: [
      'No — the two ranges only touch at the single boundary 106.00, giving zero positive width (width = 0.00).',
      'Yes — any FVG sitting below a Bullish Breaker automatically forms a Unicorn setup.',
      'Yes — the Unicorn overlap spans the combined range from 104.00 to 110.00.',
      'Yes — touching edges count as a double-strength Unicorn overlap.',
    ],
    correctIndex: 0,
    explanation:
      'Unicorn overlap requires Unicorn_High > Unicorn_Low (strictly positive width). Here max(106, 104) = 106 and min(110, 106) = 106, leaving 0.00 width—a touching boundary rather than an overlapping intersection.',
  },
  {
    question: 'In a Bullish Breaker Block, which candle(s) at Point B form the breaker reference and from which side does price retest it?',
    options: [
      'The last up-close candle (or consecutive up-close run) at High B, retested on a pullback from above.',
      'The last down-close candle at Low A, retested on a rally from below.',
      'Whichever single candle near Point C shows the longest lower wick after hindsight.',
      'The first candle that touches the final take-profit target.',
    ],
    correctIndex: 0,
    explanation:
      'In the bullish mirror, the up-close origin at High B originally acted as potential resistance before the sweep to C. After price closes above B, that saved range flips polarity and is approached on a decline from above as potential support.',
  },
  {
    question: 'A trader sets a closing invalidation rule for a Bearish Breaker (100–104) at a close above 104, and places a protective stop-market order at 105. Price spikes intrabar to 105.20 and then closes at 103.50. What happens?',
    options: [
      'The protective stop at 105 is triggered intrabar for a realized loss even though the closing-based pattern rule was not broken.',
      'The broker waits for the candle to close at 103.50 and cancels the stop order automatically.',
      'The pattern invalidation overrides exchange order matching so no fill occurs.',
      'The trade converts automatically into a risk-free Inverse Breaker long.',
    ],
    correctIndex: 0,
    explanation:
      'Exchange stop-market orders execute immediately upon reaching the trigger price intrabar (potentially with slippage). Closing-based structural rules and live protective stop mechanics are separate decisions.',
  },
  {
    question: 'What does a decisive candle body close straight through the far edge of a qualified Bearish Breaker indicate?',
    options: [
      'Closing invalidation of the bearish flip—warning of a potential Inverse (Reclaimed) Breaker favoring the bullish trend.',
      'That the trader should widen the stop loss and double the short position.',
      'That the breaker has become an unbroken Order Block for immediate shorting.',
      'Nothing meaningful, because breaker blocks remain valid indefinitely regardless of candle closes.',
    ],
    correctIndex: 0,
    explanation:
      'A decisive closing break above a Bearish Breaker invalidates the bearish thesis. When polarity flips a second time, the failed breaker often acts as a Reclaimed (Inverse) Bullish Breaker aligned with dominant buyers.',
  },
];
