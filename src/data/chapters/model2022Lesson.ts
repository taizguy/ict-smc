import type { CurriculumSource } from '../curriculumReview';
import type { TextbookChapter } from '../../types';
import data from './model2022Document.json';

export interface Model2022Block {
  type: 'paragraph' | 'list' | 'table' | 'callout';
  text?: string;
  title?: string;
  tone?: 'note' | 'warn';
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
}

export interface Model2022Section {
  number: number;
  icon: string;
  title: string;
  blocks: Model2022Block[];
}

export const model2022Document = data as {
  h1: string;
  seoTitle: string;
  seoTitleUr: string;
  metaDescription: string;
  metaDescriptionUr: string;
  quickAnswer: string;
  takeaways: string[];
  sections: Model2022Section[];
  faqs: { question: string; answer: string }[];
};

export const model2022Path = '/learn/ict-charter-model-13-2022-youtube-model/';

export const model2022Dates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-25', label: '25 November 2026' },
};

const glossaryRows = model2022Document.sections[19].blocks
  .find((b) => b.type === 'table')!
  .rows!.slice(1);

export const model2022Chapter: TextbookChapter = {
  id: 36,
  slug: 'ict-charter-model-13-2022-youtube-model',
  title: model2022Document.h1,
  part: 'Part VII - Entry Models',
  status: 'published',
  level: 3,
  quote: model2022Document.quickAnswer,
  summary: [
    ...model2022Document.takeaways,
    'Chronological observation discipline across session Killzones, sweeps, MSS, and FVGs.',
    'Context, liquidity references, displacement and FVG completion as separate observations.',
    'Conditional bias, execution variants and no-entry cases.',
  ],
  keyTerms: glossaryRows.map((row) => ({ term: row[0], definition: row[1] })),
  practiceQuestions: model2022Document.faqs.slice(0, 5).map((item) => item.question),
  sections: model2022Document.sections.map((section) => ({
    id: `36.document.${section.number}`,
    title: section.title,
    content: section.blocks
      .filter((b) => b.type === 'paragraph' || b.type === 'callout')
      .map((b) => b.text || '')
      .filter(Boolean)
      .join('\n\n'),
  })),
};

export const model2022Sources: CurriculumSource[] = [
  {
    title: 'Investor.gov (SEC) — Stop Order',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope: 'Stock stop-market orders become market orders when triggered and may execute away from the stop price. Other products and order types have their own rules.',
  },
  {
    title: 'Investor.gov (SEC) — Types of Orders & Execution Priority',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders',
    scope: 'Explains limit-price ceilings, marketable orders, and why fast sweeps near swing extremes cannot assure exact fill prices.',
  },
  {
    title: 'CME Group — Micro E-mini Nasdaq-100 Specifications',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.contractSpecs.html',
    scope: 'MNQ uses $2 per index point and a 0.25-point minimum tick ($0.50 tick value), distinct from full NQ ($20 per point) and broker CFDs.',
  },
  {
    title: 'CME Group — Exchange Matching & Market Microstructure',
    url: 'https://www.cmegroup.com/education/articles-and-reports/overview-what-makes-ags-markets-work',
    scope: 'Exchange explanation of central limit order book matching, FIFO and pro-rata allocation, and queue consumption.',
  },
  {
    title: 'NYSE — Trading Hours and Market Holidays Calendar',
    url: 'https://www.nyse.com/trade/hours-calendars',
    scope: 'Primary reference for the regular U.S. equities cash session open (09:30 ET), holidays, and early-close schedules.',
  },
  {
    title: 'NIST — Daylight Saving Time Rules',
    url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst',
    scope: 'Authoritative reference for U.S. clock changes so New York local Killzones remain synchronized with America/New_York.',
  },
  {
    title: 'BLS — Employment Situation Release Schedule',
    url: 'https://www.bls.gov/schedule/news_release/empsit.htm',
    scope: 'Official schedule for 08:30 ET Non-Farm Payrolls and macro employment releases that trigger sharp session sweeps.',
  },
  {
    title: 'Federal Reserve — FOMC Calendars',
    url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm',
    scope: 'Official FOMC meeting and rate-decision schedule distinguishing announcement spikes from regular afternoon sessions.',
  },
];

export const model2022Quizzes = [
  {
    question:
      'What is the required chronological gate order before validating a bullish ICT 2022 Model setup?',
    context: 'Chronological time-and-price observation chain from session filter to FVG retracement.',
    options: [
      'Higher-Timeframe Draw -> Active NY Time Window -> Liquidity Sweep -> Displacement MSS -> Return into FVG',
      '1-Minute FVG Break -> Random Midday Entry -> Hope for Sweep Later -> HTF Narrative',
      'Equal Low Bounce -> Tight Stop Inside Candle 2 -> Move Target Up After Entry',
    ],
    correctIndex: 0,
    explanation:
      'Chronology is non-negotiable in the 2022 Model: HTF context and active NY session timing filter the chart before a sweep, followed by energetic displacement MSS and retracement into the trailing Fair Value Gap.',
  },
  {
    question:
      'In a bullish synthetic NQ 2022 leg from Sweep Low 20,986 to MSS High 21,060 with FVG 21,012–21,032, what is the exact Consequent Encroachment (CE) midpoint and stop rule?',
    options: [
      '21,022.00 CE midpoint, with the protective stop placed beyond the 20,986 sweep extreme.',
      '21,032.00 proximal top edge, with the stop tucked tightly inside Candle 2 at 21,020.',
      '21,060.00 MSS breakout high, entered via a market order without awaiting pullback.',
    ],
    correctIndex: 0,
    explanation:
      'Consequent Encroachment = (21,012 + 21,032) ÷ 2 = 21,022.00, while structural invalidation sits strictly below the 20,986 sweep wick rather than inside the FVG body.',
  },
  {
    question:
      'Price dips below an Asian Session low at 09:40 AM NY time and breaks the opposing short-term high cleanly, yet no unmitigated 3-candle Fair Value Gap forms on the impulse leg. Under 2022 Model rules, what should you do?',
    options: [
      'Stand aside or wait patiently—a structure crossing without a clean FVG does not complete a 2022 entry.',
      'Force a market buy at the high because any sweep beyond a session low guarantees continuation.',
      'Shift your charting clock to UTC+0 until an overlapping gap appears somewhere else.',
    ],
    correctIndex: 0,
    explanation:
      'The 2022 Model requires that an initial break lacking a clean 3-candle Fair Value Gap be treated as incomplete; waiting and skipping are integral rules of the model.',
  },
  {
    question:
      'During US Daylight Saving Time shifts between March and November, how must you read ICT 2022 Killzones such as 09:30 AM Equities Open and 07:00–10:00 AM NY AM Forex?',
    options: [
      'Anchor every window strictly to America/New_York local time so DST shifts update UTC/local offsets automatically.',
      'Freeze your chart permanently at UTC−5 regardless of month so clocks never adjust.',
      'Trade strictly during New York lunch (12:00–13:00 NY) when volume thins out.',
    ],
    correctIndex: 0,
    explanation:
      'Session liquidity clusters around real New York market opens; locking charts to a static UTC offset shifts your window by one full hour during EDT summer months.',
  },
  {
    question:
      'While studying ES and NQ at the 09:30 AM open, NQ sweeps a prior low while ES holds higher (SMT divergence). How should you treat SMT invalidation caveats alongside a 2022 entry?',
    options: [
      'Wait for Displacement + MSS + FVG rather than buying SMT alone, knowing ES can still catch up and invalidate early SMT.',
      'Assume SMT guarantees the exact bottom tick and buy double risk size immediately without a stop.',
      'Abandon Higher-Timeframe liquidity context because SMT overrides every timeframe.',
    ],
    correctIndex: 0,
    explanation:
      'Disciplined chart study warns that an apparent SMT divergence can vanish if the stronger market later sweeps its low too; SMT refines context only alongside completed 2022 MSS and FVG confirmation.',
  },
];
