import rawDoc from './venomModelDocument.json';
import type { ChapterQuizQuestion } from './chapterQuizzes';
import type { CurriculumSource } from '../curriculumReview';

export interface VenomCallout {
  tone: 'violet' | 'teal' | 'amber' | 'crimson';
  label: string;
  text: string;
}

export interface VenomExtract {
  name: string;
  kind: 'DefinedTerm' | 'CreativeWork';
  formula?: string;
  text: string;
}

export interface VenomTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface VenomBaselineGroup {
  code: string;
  heading: string;
  paragraphs: string[];
}

export interface VenomDocumentSection {
  number: number;
  anchor: string;
  icon: string;
  title: string;
  extract?: VenomExtract;
  paragraphs: string[];
  numberedPoints?: string[];
  bullets?: string[];
  visualId?: string;
  callout?: VenomCallout;
  table?: VenomTable;
  checklist?: { id: string; label: string; detail: string }[];
  glossaryTerms?: { term: string; definition: string }[];
  baselineSections?: VenomBaselineGroup[];
  faqs?: { q: string; a: string }[];
}

export interface VenomDocument {
  title: string;
  quickAnswer: string;
  tocLabel: string;
  sections: VenomDocumentSection[];
}

export const venomModelDocument = rawDoc as VenomDocument;

export const venomModelPath = '/learn/the-ict-venom-model-five-stage-delivery/';

export const venomModelChapter = {
  id: 53,
  position: 67,
  slug: 'the-ict-venom-model-five-stage-delivery',
  title: 'Venom Model: Opening Range, Sweep & Two Fangs',
  seoTitle: 'Venom Model: Opening Range, Sweep & Two Fangs',
  description:
    'Learn the ICT Venom Model: freeze the 08:00–09:30 NY range, spot the Two Fangs sweep and displacement, compare BPR and deferred entries, and map risk.',
};

export const venomModelDates = {
  published: { iso: '2026-10-15', label: '15 October 2026' },
  updated: { iso: '2026-11-28', label: '28 November 2026' },
};

export const venomModelSources: CurriculumSource[] = [
  {
    title: 'ICT 2025 Mentorship — Venom Model Opening Range & Two Fangs Study',
    url: 'https://www.youtube.com/@InnerCircleTrader',
    scope:
      'Primary source context defining the 08:00–09:30 New York extended-hours reference range, closing-candle sweep, and opposing two-fang displacement. All price charts, 3D animations, calculators, and worked examples in this chapter are original synthetic LearnSMC teaching models.',
  },
  {
    title: 'NYSE — Core Trading Hours & Market Holidays',
    url: 'https://www.nyse.com/trade/hours-calendars',
    scope:
      'Primary exchange reference establishing the 09:30 AM Eastern U.S. equity cash open that ends the frozen 08:00–09:30 Venom reference window.',
  },
  {
    title: 'NIST — Daylight Saving Time Rules (America/New_York)',
    url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst',
    scope:
      'Authoritative U.S. timekeeping reference for converting 08:00–09:30 and 09:30–11:00 New York windows cleanly across EDT (UTC-4) and EST (UTC-5).',
  },
  {
    title: 'CME Group — Micro E-mini Nasdaq-100 & S&P 500 Contract Specifications',
    url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.contractSpecs.html',
    scope:
      'Primary exchange reference for centralized futures matching, Extended Trading Hours availability, and tick/point dollar sizing (MNQ $2/pt, MES $5/pt).',
  },
  {
    title: 'SEC Investor.gov — Stop Order & Limit Order Execution Mechanics',
    url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',
    scope:
      'Primary regulatory reference distinguishing intrabar stop-market triggers and slippage risk from resting limit orders that may remain unfilled on single-pass moves.',
  },
];

export const venomModelQuizzes: Omit<ChapterQuizQuestion, 'id'>[] = [
  {
    question:
      'Which chart setting and exact time interval define the standard opening-session Venom reference range?',
    context: 'Check both session data visibility and the 09:30 freeze boundary.',
    options: [
      '08:00–09:30 America/New_York high and low marked on an Extended Trading Hours (ETH) chart and frozen at 09:30.',
      '09:30–10:30 Regular Trading Hours (RTH) high and low, continuously dragged higher after 10:30.',
      '12:00–13:30 UTC lunch consolidation on a daily bar chart.',
      'Only the single 09:30 1-minute candle wick without prior pre-market bars.',
    ],
    correctIndex: 0,
    explanation:
      'The opening-session Venom variant freezes the 08:00–09:29 New York high and low on an Extended Trading Hours chart once 09:30 opens; RTH charts hide those pre-market candles.',
  },
  {
    question:
      'In the reviewed bearish Venom example (range 100–110), what distinguishes a confirmed Two Fangs sequence from a wick-only sweep or breakout continuation?',
    options: [
      'A post-09:30 candle closes above 110 with upward imbalance (Fang 1), followed by an opposing inefficient downward leg closing back below 110 (Fang 2).',
      'Any single 1-tick wick above 110 that closes at 109.9 without displacement.',
      'Three consecutive closes above 112, 114, and 116 with no downward return.',
      'Price staying trapped between 104 and 106 all morning without touching 110.',
    ],
    correctIndex: 0,
    explanation:
      'The closing-fang bearish Venom specifically pairs an inefficient outward close above the buy-side edge (Fang 1) with an opposing inefficient displacement back inside the range (Fang 2).',
  },
  {
    question:
      'Fang 1 prints an upward Fair Value Gap from 109.6 to 111.4, and Fang 2 prints a downward Fair Value Gap from 108.6 to 111.0. What is the exact Balanced Price Range (BPR) overlap?',
    context: 'Apply BPR = [max(Low1, Low2), min(High1, High2)].',
    options: [
      '109.6 to 111.0 (width 1.4 points, midpoint 110.3).',
      '108.6 to 111.4 (the combined 2.8-point span of both gaps).',
      '108.6 to 109.6 (only the lower non-overlapping slice).',
      'There is no BPR because opposing Fair Value Gaps cannot overlap.',
    ],
    correctIndex: 0,
    explanation:
      'max(109.6, 108.6) = 109.6 and min(111.4, 111.0) = 111.0. Only the shared 109.6–111.0 corridor was delivered inefficiently in both directions.',
  },
  {
    question:
      'A bearish Venom plan sets a deferred short limit at 111.0, stop at 114.0, and target at 104.0. After Fang 2 closes at 108.0, price drops straight to 104.0 without returning above 108.9. How should this be recorded?',
    options: [
      'Unfilled deferred limit order (0R scratch — Single-Pass delivery); do not credit a hypothetical fill at 111.0.',
      'Full 2.33R winning trade because the bearish directional idea reached 104.0.',
      'Retroactively adjust the journal entry to 108.0 and log a win.',
      'Count it as a full stop-out loss at 114.0.',
    ],
    correctIndex: 0,
    explanation:
      'A resting sell limit at 111.0 cannot fill unless price actually trades back up to 111.0 after the reference exists. Single-pass drops validate direction while legitimately leaving deferred orders unfilled.',
  },
  {
    question:
      'Using the same bearish plan (Stop 114.0, Target 104.0), how does chasing the entry down from 111.0 to 108.0 alter risk-to-reward and break-even hit frequency before costs?',
    options: [
      'Reward-to-risk drops from 2.33R (3 risk / 7 reward) to 0.67R (6 risk / 4 reward), doubling break-even hit frequency from 30.0% to 60.0% before costs.',
      'Reward-to-risk stays identical at 2.33R because the stop and target did not move.',
      'Risk shrinks from 3 points to 1 point while reward grows to 10 points.',
      'Break-even hit frequency falls from 30.0% to 15.0% because price is already moving down.',
    ],
    correctIndex: 0,
    explanation:
      'At 111.0, risk is 3 and reward is 7 (2.33R; 1/(1+2.33) = 30.0%). Sliding entry to 108.0 makes risk 6 and reward 4 (0.67R; 1/(1+0.67) = 60.0% before costs)—a completely different, inferior plan.',
  },
  {
    question:
      'How should SMT Divergence and the 09:30 First Presented FVG be treated inside a disciplined Venom Model playbook?',
    options: [
      'As optional contextual filters logged separately, not as a mandatory five-stage chain required on every valid Venom instance.',
      'As strictly compulsory rules that guarantee a full opposite-range target whenever present.',
      'As indicators that replace the need for a stop-loss order.',
      'As tools usable only on weekly cryptocurrency charts.',
    ],
    correctIndex: 0,
    explanation:
      'The core Venom observable components are the frozen range, closing sweep, and opposing displacement. SMT and the 1st Presented FVG can add useful context, but they are optional observations rather than universal mandates.',
  },
];
