import type { CurriculumSource } from '../curriculumReview';
import type { TextbookChapter } from '../../types';
import data from './orderBookDocument.json';

export interface OrderBookBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface OrderBookSection {
  number: number;
  icon: string;
  title: string;
  blocks: OrderBookBlock[];
}

export const orderBookDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: OrderBookSection[];
  faqs: { question: string; answer: string }[];
};

export const orderBookPath = '/learn/the-order-book-in-depth/';

export const orderBookDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-24', label: '24 November 2026' },
};

const glossaryRows = orderBookDocument.sections[18].blocks.find((b) => b.type === 'table')!.rows!.slice(1);

export const orderBookChapter: TextbookChapter = {
  id: 3,
  slug: 'the-order-book-in-depth',
  title: orderBookDocument.h1,
  part: 'Part I - Market Foundations',
  status: 'published',
  level: 0,
  quote: orderBookDocument.quickAnswer,
  summary: orderBookDocument.takeaways,
  keyTerms: glossaryRows.map((r) => ({ term: r[0], definition: r[1] })),
  practiceQuestions: orderBookDocument.faqs.slice(0, 5).map((q) => q.question),
  sections: orderBookDocument.sections.map((s) => ({
    id: `3.document.${s.number}`,
    title: s.title,
    content: s.blocks
      .filter((b) => b.type === 'paragraph' || b.type === 'callout')
      .map((b) => b.text || '')
      .filter(Boolean)
      .join('\n\n'),
  })),
};

export const orderBookSources: CurriculumSource[] = [
  {
    title: 'CME Group — Market by Order (MBO) and Globex Matching Rules',
    url: 'https://www.cmegroup.com/education/articles-and-reports/overview-what-makes-ags-markets-work',
    scope:
      'Exchange explanation of matching engines, FIFO and pro-rata allocation, and how order-book feeds distribute queue updates. Check individual contract specifications for product-specific rules.',
  },
  {
    title: 'Investor.gov (SEC) — Market, Limit, and Stop Orders',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders',
    scope:
      'SEC glossary defining limit price controls, marketable execution, and why stop orders convert into market orders upon trigger with execution-price uncertainty.',
  },
  {
    title: 'Nasdaq — TotalView-ITCH and Equities Auction Mechanics',
    url: 'https://www.nasdaq.com/solutions/nasdaq-totalview',
    scope:
      'Primary exchange overview of Level 3 full-depth equities order flow, non-displayed/midpoint liquidity, and opening/closing cross auctions.',
  },
  {
    title: 'CFTC — Anti-Spoofing and Disruptive Trading Practices Guidance',
    url: 'https://www.cftc.gov/LawRegulation/DoddFrankAct/Rulemakings/DF_18_DisruptivePractices/index.htm',
    scope:
      'Regulatory guidance distinguishing bona fide quote adjustments from unlawful bidding or offering with intent to cancel before execution.',
  },
  {
    title: 'Bank for International Settlements — FX Execution Fragmentation',
    url: 'https://www.bis.org/publications/qr-201912/fx-trade-execution-complex-and-highly-fragmented',
    scope:
      'Explains why spot FX operates across decentralized dealer streams and electronic ECNs rather than a single consolidated exchange order book.',
  },
];

export const orderBookQuizzes = [
  {
    question: 'A 300-unit market buy hits our synthetic Thin Book (Asks: 20 @ 100.00, 30 @ 100.25, 50 @ 100.50, 100 @ 101.00, 100 @ 101.50). What separates the last print from the average fill?',
    context: 'Illustrative synthetic order book without hidden size, fees, or cancellations during matching.',
    options: [
      'The last print is $101.50 while the volume-weighted average fill is $100.94.',
      'All 300 units fill at the $100.00 Best Ask because top-of-book protects buyers.',
      'Only 20 units execute and the matching engine deletes the rest.',
    ],
    correctIndex: 0,
    explanation:
      'A market buy walks ascending ask tiers until all 300 units match: (20×100.00 + 30×100.25 + 50×100.50 + 100×101.00 + 100×101.50) ÷ 300 = $100.9417, whereas the candlestick chart highlights $101.50 as the highest print.',
  },
  {
    question: 'In a strict Price-Time (FIFO) queue at $99.75, you sit behind 100 units with your own 100-unit limit bid. What happens if you increase your bid to 200 units?',
    options: [
      'The added size (or entire amended order on strict venues) moves to the back of the $99.75 queue.',
      'Your original timestamp pulls the new 100 units to the front of the queue.',
      'Price-Time exchanges convert your limit order into Pro-Rata automatically.',
    ],
    correctIndex: 0,
    explanation:
      'Reducing resting size preserves your timestamp rank at a price level, whereas increasing quantity or changing price creates new priority loss so traders cannot hold front-of-line slots with 1-lot placeholders.',
  },
  {
    question: 'Best Bid ($99.75) holds 300 units and Best Ask ($100.00) holds 100 units. Where does the weighted Microprice sit relative to the $99.875 Mid-Price?',
    options: [
      'Higher, at $99.9375, because heavier resting bid volume tilts pressure toward the ask.',
      'Lower, at $99.8125, because buyers always pull the market downward.',
      'Unchanged at $99.875 regardless of queue sizes.',
    ],
    correctIndex: 0,
    explanation:
      'OBI = (300 − 100) ÷ 400 = +0.50. Microprice = ($100.00 × 300 + $99.75 × 100) ÷ 400 = $99.9375. Still, microprice reflects only current displayed quotes, which can cancel rapidly.',
  },
  {
    question: 'Why does a sudden disappearance of a large 2,000-unit resting bid on a Level 2 DOM not automatically prove illegal spoofing?',
    options: [
      'Market makers routinely cancel or amend resting quotes to avoid adverse selection; spoofing requires proving deceptive intent to cancel.',
      'Because Level 2 feeds hide all cancellations inside dark pools.',
      'Because exchanges ban any resting bid above 500 contracts.',
    ],
    correctIndex: 0,
    explanation:
      'Liquidity providers constantly pull and re-price orders as news, correlated markets, or inventory risk shift. Observing a pulled wall on a heatmap is never standalone proof of unlawful intent.',
  },
  {
    question: 'You open an MT4/MT5 spot Forex chart showing a DOM window and tick volume. What are you actually observing?',
    options: [
      'Your broker or liquidity bridge feed—not a single unified global exchange order book.',
      'The consolidated worldwide central limit order book for all interbank FX.',
      'Every retail and central bank stop-loss resting across the market.',
    ],
    correctIndex: 0,
    explanation:
      'Spot Forex trades over-the-counter across fragmented dealers and ECNs (such as EBS or LSEG). Retail broker feeds reflect localized quote depth and update counts rather than unified exchange MBO depth.',
  },
];
