import type { CurriculumSource } from '../curriculumReview';
import data from './bslSslDocument.json';

export interface BslSslBlock {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface BslSslSection {
  number: number;
  icon: string;
  title: string;
  blocks: BslSslBlock[];
}

export const bslSslDocument = data as {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  quickAnswer: string;
  takeaways: string[];
  sections: BslSslSection[];
  faqs: { question: string; answer: string }[];
};

export const bslSslPath = '/learn/buyside-sellside-liquidity/';

export const bslSslDates = {
  published: { iso: '2026-11-28', label: '28 November 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export interface BslSslQuizItem {
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const bslSslQuizzes: BslSslQuizItem[] = [
  {
    question: 'Why are short sellers’ stop-losses above a swing high classified as Buyside Liquidity (BSL)?',
    context: 'Understanding order-book closing mechanics.',
    options: [
      'Closing a short position requires buying back the asset, so the stop-loss executes as a buy order.',
      'Closing a short position executes as a sell-stop order.',
      'Exchanges convert all stop-losses into limit orders below support.',
    ],
    correctIndex: 0,
    explanation: 'A short seller must buy to cover, so stop-losses above highs generate buy flow alongside breakout buy-stops.',
  },
  {
    question: 'Where does Sellside Liquidity (SSL) rest on a price chart?',
    context: 'Locating stop-loss and breakdown clusters.',
    options: [
      'Below swing lows, Equal Lows, Previous Day Low (PDL), and session lows.',
      'Above Previous Day High (PDH) and swing highs.',
      'Only at the exact midpoint of an Asian session range.',
    ],
    correctIndex: 0,
    explanation: 'Long buyers’ stop-losses (sell-to-close) and breakdown sell-stops cluster below lows.',
  },
  {
    question: 'What does an OHLC candlestick chart NOT reveal about a BSL or SSL level?',
    context: 'Separating observable structure from unobserved order depth.',
    options: [
      'The exact number of resting stop contracts or the identity of the participants behind them.',
      'Where prior swing highs and swing lows formed on the chart.',
      'Whether price closed back inside or beyond the high/low after tagging it.',
    ],
    correctIndex: 0,
    explanation: 'Candlesticks show price history and closes, never live resting order quantities in the venue book.',
  },
  {
    question: 'Does sweeping a BSL or SSL pool guarantee an immediate price reversal?',
    context: 'Distinguishing sweeps from true breakout acceptance.',
    options: [
      'No; price can either reject back inside the range or accept beyond the level and continue trending.',
      'Yes; every swing high sweep reverses 100% of the time.',
      'Yes; SSL sweeps always produce a 50-pip bounce.',
    ],
    correctIndex: 0,
    explanation: 'Candle-body closes and higher-timeframe context determine whether a tag rejects or continues.',
  },
  {
    question: 'Which liquidity tier generally carries broader intraday relevance for NY session study?',
    context: 'Prioritizing liquidity tiers cleanly.',
    options: [
      'Previous Day High/Low (PDH/PDL), Asia High/Low, London High/Low, and clean 1H–4H Equal Highs/Lows.',
      'Every single 1-minute micro-wick inside a consolidation.',
      'Random horizontal lines with no swing anchor.',
    ],
    correctIndex: 0,
    explanation: 'Session and daily boundaries attract broader participation than minor 1-minute wicks.',
  },
];

export const bslSslSources: CurriculumSource[] = [
  {
    title: 'ICT 2022 Mentorship — Episode 3 (Liquidity References)',
    url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c',
    scope: 'Consulted for buyside/sellside liquidity framing above swing highs and below swing lows. All synthetic NQ and EUR/USD diagrams in this chapter are LearnSMC educational models.',
  },
  {
    title: 'CME Group — Order Types & Stop-Order Execution',
    url: 'https://www.cmegroup.com/education/courses/introduction-to-futures/understanding-order-types.html',
    scope: 'Consulted for standard exchange mechanics: stop orders become market orders once triggered.',
  },
];
