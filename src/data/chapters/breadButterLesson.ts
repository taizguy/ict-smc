import rawDoc from './breadButterDocument.json';
import type { ChapterQuizQuestion } from './chapterQuizzes';
import type { CurriculumSource } from '../curriculumReview';

export interface BreadButterCallout {
  tone: 'cerulean' | 'pine' | 'terra' | 'ochre';
  label: string;
  text: string;
}

export interface BreadButterExtract {
  name: string;
  kind: 'DefinedTerm' | 'CreativeWork';
  formula?: string;
  text: string;
}

export interface BreadButterTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface BreadButterBaselineGroup {
  code: string;
  heading: string;
  paragraphs: string[];
}

export interface BreadButterDocumentSection {
  number: number;
  anchor: string;
  icon: string;
  title: string;
  extract?: BreadButterExtract;
  paragraphs: string[];
  numberedPoints?: string[];
  bullets?: string[];
  visualId?: string;
  callout?: BreadButterCallout;
  table?: BreadButterTable;
  checklist?: { id: string; label: string; detail: string }[];
  glossaryTerms?: { term: string; definition: string }[];
  baselineSections?: BreadButterBaselineGroup[];
  faqs?: { q: string; a: string }[];
}

export interface BreadButterDocument {
  title: string;
  quickAnswer: string;
  tocLabel: string;
  sections: BreadButterDocumentSection[];
}

export const breadButterDocument = rawDoc as BreadButterDocument;

export const breadButterPath = '/learn/core-content-month-9-consolidations-and-bread-and-butter/';

export const breadButterChapter = {
  id: 45,
  position: 70,
  slug: 'core-content-month-9-consolidations-and-bread-and-butter',
  title: 'Bread-and-Butter Setups: Ranges & Consolidations',
  seoTitle: 'Bread-and-Butter Setups: Ranges & Consolidations',
  description:
    'Learn ICT Bread-and-Butter setups in ranges and consolidations: pre-breakout boxes, liquidity sweeps, 20-pip math, stop tiers, and sample journaling.',
};

export const breadButterDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export const breadButterSources: CurriculumSource[] = [
  {
    title: 'ICT Core Content Month 9 — Bread & Butter Buy/Sell Setups, 20 Pips Per Day & Day Trade Routine',
    url: 'https://www.youtube.com/@InnerCircleTrader',
    scope:
      'Primary curriculum series introducing intraday consolidation boxes, Bread-and-Butter Buy and Sell workflows, the illustrative 20-pip slice objective, Market Reversals context, and selective day-trade routine discipline. All diagrams, 3D models, calculators, and worked trades in this chapter are original synthetic LearnSMC teaching examples.',
  },
  {
    title: 'CME Group — Micro E-mini Nasdaq-100 & S&P 500 Contract Specifications',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.contractSpecs.html',
    scope:
      'Primary exchange reference illustrating why Forex pip objectives (EUR/USD) cannot be transferred mechanically onto futures handles and tick values (MNQ $2/pt, MES $5/pt) without rescaling for volatility and fees.',
  },
  {
    title: 'NIST — Daylight Saving Time Rules (America/New_York)',
    url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst',
    scope:
      'Authoritative U.S. timekeeping reference for anchoring Asian consolidation (20:00–00:00 NY), London Open (02:00–05:00 NY), and New York Open (07:00–10:00 NY) cleanly across EST and EDT transitions.',
  },
  {
    title: 'SEC Investor.gov — Limit Orders, Stop Orders & Execution Costs',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/limit-order',
    scope:
      'Primary regulatory education reference distinguishing resting retracement limit orders (which may remain unfilled on fast moves) from market/stop executions subject to spread and slippage.',
  },
];

export const breadButterQuizzes: Omit<ChapterQuizQuestion, 'id'>[] = [
  {
    question:
      'Why must you lock a consolidation range high, low, and 50% equilibrium before the London or New York expansion begins?',
    context: 'Review Section 2 (Range Anatomy) and Baseline Note 45.1.',
    options: [
      'To prevent hindsight bias from redrawing the box around winning moves and to avoid initiating trades inside dead 50% equilibrium chop.',
      'Because candle charts display exact institutional stop-loss order books once a box is drawn.',
      'So you can place simultaneous market buy and sell orders right at the 50% midpoint.',
      'To force every breakout trader into a trap before the daily candle closes.',
    ],
    correctIndex: 0,
    explanation:
      'Defining the instrument, session, and range edges before expansion enforces objective out-of-sample discipline and highlights where 50% equilibrium risk-reward deteriorates.',
  },
  {
    question:
      'EUR/USD has a 5-day Average Daily Range (ADR) of 80 pips. On Session A the Asian range is 24 pips (30% ADR); on Session B overnight news pushes the Asian range to 64 pips (80% ADR). Which session offers cleaner expansion context?',
    options: [
      'Session A (24 pips / 30% ADR), because substantial daily range capacity still remains for a London or New York expansion leg.',
      'Session B (64 pips / 80% ADR), because a wider Asian box always produces a 150-pip follow-through.',
      'Both sessions are identical because ADR never affects intraday range expansion.',
      'Neither session can be traded unless the Asian range is exactly 20 pips.',
    ],
    correctIndex: 0,
    explanation:
      'Compact pre-open boxes below roughly 35%–40% of 5-day ADR leave healthy room for intraday expansion, whereas an 80%-ADR Asian box signals that most typical daily travel is already exhausted.',
  },
  {
    question:
      'How does the Month 9 "20 Pips Per Day" concept treat a 20-pip objective across trading days and different markets?',
    options: [
      'As an illustrative modest intraday slice on qualified Forex sessions—not a daily income schedule and not mechanically interchangeable with MNQ or MES futures handles.',
      'As a strict daily quota requiring you to keep trading until you collect 20 pips every calendar day.',
      'As a universal fixed 20-point stop and 20-point target template across Forex, Nasdaq, Gold, and Crypto.',
      'As proof that any 20-pip target produces positive expectancy before checking transaction costs.',
    ],
    correctIndex: 0,
    explanation:
      'Baseline Note 45.3 explicitly separates the 20-pip example from a daily income promise and requires stating contract specs, tick values, spread, costs, and no-trade days.',
  },
  {
    question:
      'A bullish EUR/USD Bread-and-Butter Buy Setup risks 20 pips for a 30-pip gross objective, with 1.0 pip round-trip spread/commission cost. What is the exact cost-adjusted Net R?',
    context: 'Use Net R = (Target − Cost) / (Risk + Cost).',
    options: [
      '1.38 Net R (29.0 net pips reward divided by 21.0 net pips risk).',
      '1.50 Net R (transaction costs cancel out because they apply to both wins and losses).',
      '1.60 Net R (cost subtracts from risk and adds to reward).',
      '0.67 Net R (20 divided by 30).',
    ],
    correctIndex: 0,
    explanation:
      'Round-trip cost reduces net profit on wins (30 − 1 = 29 pips) and increases net loss on stops (20 + 1 = 21 pips), lowering reward-to-risk from 1.50R gross to 29 / 21 = 1.38 Net R.',
  },
  {
    question:
      'In a bearish GBP/USD Bread-and-Butter Sell Setup, price sweeps above 1.2710, displaces down leaving an FVG at 1.2704, and then drops straight to the 1.2674 target without pulling back to 1.2704. How should you journal it?',
    options: [
      'Log it as an Unfilled Deferred Limit (0R scratch) and avoid chasing at the bottom of the move.',
      'Log a +1.5R winner because the bearish directional thesis reached 1.2674.',
      'Enter a late market short at 1.2684 with a 38-pip stop for the remaining 10 pips.',
      'Delete the session from your sample so it does not clutter your chart history.',
    ],
    correctIndex: 0,
    explanation:
      'Single-pass runaways legitimately leave resting retracement limits unfilled. Logging 0R unfilled preserves honest whole-sample metrics and avoids destructive late chases.',
  },
  {
    question:
      'During pre-session prep, you notice price approaching an old Daily high at the 1.0900 big figure while a third-party gauge shows 85% retail long sentiment. What is the disciplined Bread-and-Butter response?',
    options: [
      'Treat 1.0900 and sentiment as background context only; wait for an actual sweep, displacement, and structural confirmation rather than auto-fading an 85% threshold.',
      'Place a blind market short immediately because 85% sentiment automatically forces a reversal.',
      'Remove your stop-loss because big figures never break cleanly during London session.',
      'Double position size because combining a round number with 85% sentiment removes continuation risk.',
    ],
    correctIndex: 0,
    explanation:
      'Baseline Note 45.2 emphasizes that a price reference is not a forecast: old highs and round numbers can continue cleanly, and an unsupported 85% sentiment reading must never be used as an automatic reversal rule.',
  },
];
