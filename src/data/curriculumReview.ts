import type { TextbookChapter } from '../types';
import { reviewed2022Sources as r } from './ict2022Sources';

// This date records our editorial clarification, not a full video/transcript review.
export const curriculumReviewDate = '2026-10-19';
export const curriculumReviewLabel = '19 October 2026';
export const ictOfficialAccounts = {
  youtube: 'https://www.youtube.com/innercircletrader',
  x: 'https://x.com/I_Am_The_ICT',
};
export interface CurriculumSource {
  title: string;
  url: string;
  scope: string;
  passages?: { label: string; url: string; note: string }[];
}
export const curriculumSources = {
  structure: { title: 'ICT 2022 Mentorship — Episode 3', url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c', scope: 'Selected chart frames and local machine-transcript passages were reviewed. Transcript positions are approximate; consult the original recording. The annotated example is not a verified statistical study.', passages: [
    { label: '01:24 — Choosing the reference', url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c&t=84s', note: 'The opening discussion considers an alternative prior high and a preference for a higher group of similar highs. State which reference you selected before judging the later move.' },
    { label: '02:25 — Intraday shift versus longer-duration break', url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c&t=145s', note: 'The discussion distinguishes an intraday directional leg from a structural break associated with a longer-duration move. An intraday shift need not establish a multi-day reversal.' },
    { label: '11:20 — Look for contrary examples', url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c&t=680s', note: 'The study assignment asks learners to investigate the idea in charts and look for cases that contradict it. Our sequential-replay checklist is an original way to organize that investigation.' },
    { label: '13:45 — Initial crossing and FVG completion', url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c&t=825s', note: 'In this bullish example, the initial crossing of the short-term high is not required to close above that high. The discussion then waits for a later candle to complete to assess the FVG. Keep these two events separate.' },
    { label: '15:00 — Liquidity references and structure shifts', url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c&t=900s', note: 'The same chart marks sell-side and buy-side references, a move beyond each reference, and subsequent bullish or bearish shifts. Separate the annotated example from a claim that every sweep reverses.' },
  ] },
  gaps: { title: 'ICT 2022 Mentorship — Episode 6', url: 'https://www.youtube.com/watch?v=Bkt8B3kLATQ', scope: 'Selected slides and local machine-transcript passages were reviewed. Transcript positions are approximate; consult the original recording. The examples distinguish pattern, context and displacement without establishing guaranteed outcomes.', passages: [
    { label: '06:00 — Context before patterns', url: 'https://www.youtube.com/watch?v=Bkt8B3kLATQ&t=360s', note: 'The slide emphasizes context, opposing liquidity and time of day rather than taking a pattern simply because it appears.' },
    { label: '10:00 — Bearish FVG diagram', url: 'https://www.youtube.com/watch?v=Bkt8B3kLATQ&t=600s', note: 'The diagram presents a three-candle formation with a preferred preceding run into buy-side liquidity. Pattern geometry and the preferred setup context are different observations.' },
    { label: '18:30 — Displacement and the close preference', url: 'https://www.youtube.com/watch?v=Bkt8B3kLATQ&t=1110s', note: 'The discussion emphasizes energetic displacement and describes a close below the reference as preferable for greater significance. Keep that preference separate from a universal mandatory close rule or the later completion of an FVG.' },
  ] },
  orderBlocks2022: { title: 'ICT 2022 Episode 3 — Order Block Discussion', url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c', scope: 'Selected local chart frames and machine-transcript passages were reviewed. The example discusses a consecutive candle run and its opening reference; it does not reveal actual institutional inventory.', passages: [
    { label: '15:00 — A run of candles and its opening reference', url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c&t=900s', note: 'The bullish example treats consecutive down-close candles as a run and refers to its opening price. Do not silently reduce this example to whichever single last candle looks best afterward.' },
    { label: '24:30 — Change in delivery around the opening reference', url: 'https://www.youtube.com/watch?v=nQfHZ2DEJ8c&t=1470s', note: 'The bearish discussion connects a move through the opening reference of the up-close run with a change in delivery in the ICT framework. That is an interpretation of a chart reference, not a record of a bank’s positions.' },
  ] },
  blocks: { title: 'ICT Order Blocks & Tape Reading — 18 April 2024', url: 'https://www.youtube.com/watch?v=BxR3tVRS_FI', scope: 'Related official lecture. Its description warns about hindsight in simulated results and limitations of stop orders; our examples are not verified live executions.' },
  ote: { title: 'OTE Primer — Intro To ICT Optimal Trade Entry', url: 'https://www.youtube.com/watch?v=Cg0-CFJOJvg', scope: 'Related official introduction to OTE. Fibonacci arithmetic alone does not establish an edge or select the correct swing anchors.' },
  matching: { title: 'CME Group — How Agricultural Markets Operate', url: 'https://www.cmegroup.com/education/articles-and-reports/overview-what-makes-ags-markets-work', scope: 'Exchange explanation of matching and allocation, including FIFO and pro-rata. Check the rules for the particular product and venue.' },
  stops: { title: 'Investor.gov — Stop Order', url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order', scope: 'Stock stop-market orders become market orders when triggered and may execute away from the stop price. Other products and order types have their own rules.' },
  hours: { title: 'NYSE — Holidays and Trading Hours', url: 'https://www.nyse.com/trade/hours-calendars', scope: 'Primary reference for the normal U.S. equity core session and calendar exceptions; it does not define every futures or FX session.' },
  clock: { title: 'NIST — Daylight Saving Time Rules', url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst', scope: 'Primary reference for U.S. clock changes. Convert New York session references using the date rather than a fixed UTC offset.' },
  mnq: { title: 'CME Group — Micro E-mini Nasdaq-100 Specifications', url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.contractSpecs.html', scope: 'MNQ uses $2 per index point and a 0.25-point minimum tick. Distinguish the $0.50 tick value from the point value.' },
  employment: { title: 'BLS — Employment Situation Release Schedule', url: 'https://www.bls.gov/schedule/news_release/empsit.htm', scope: 'Check the actual release date and time; do not replace the official schedule with an unchanging first-Friday assumption.' },
  fed: { title: 'Federal Reserve — FOMC Calendars', url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm', scope: 'Primary meeting and release calendar. A decision statement and a press conference are separate events.' },
};

const interpretation = {
  foundations: 'Distinguish transactions from quotes: a trade has equal bought and sold quantity, while quotes can change when orders are added, amended or cancelled. A marketable limit order can also take liquidity. A candle cannot identify a participant or prove manipulation; spot FX has no single consolidated exchange order book.',
  structure: 'Swing selection, timeframe and the size of displacement involve judgment. State the swing rule and whether a wick or close counts before replaying the chart. BOS, CHoCH and MSS labels are not interchangeable across all educators; confirmation of a label does not confirm a future reversal.',
  delivery: 'An FVG is a relationship between candle ranges, not proof that no trades occurred inside the middle candle. A gap need not be revisited, filled or respected at its midpoint. Selecting the relevant range, order block or invalidation rule involves judgment; record the rule before observing the outcome.',
  time: 'Session windows and opens are reference conventions. Use America/New_York for New York clock times so daylight saving is handled by date. A sweep, session open or correlated-market divergence can fail to produce a reversal; none reveals hidden orders or institutional intent from candles alone.',
  advanced: 'These model names and step sequences are independent LearnSMC study notes. A specific originating lecture and timestamp have not been verified for every label or numbered model. Do not treat the naming, year or sequence as an authenticated ICT syllabus; verify the relevant original lesson before attributing an exact rule to ICT.',
  masood: 'This chapter summarizes a separate educator. Preserve Abdullah Masood’s authorship of his linked videos. ICT’s official accounts are primary references for ICT terminology, not evidence that ICT authored or endorsed this chapter or its exercises.',
};

export function curriculumReview(chapter: TextbookChapter) {
  const kind = chapter.id === 23 ? 'masood' : chapter.id <= 6 ? 'foundations' : chapter.id <= 11 ? 'structure' : chapter.id <= 17 ? 'delivery' : chapter.id <= 22 ? 'time' : 'advanced';
  const checked: Record<number, CurriculumSource[]> = {
    7: [curriculumSources.structure, r[12]],
    13: [curriculumSources.gaps, r[4], r[24], curriculumSources.stops],
    15: [curriculumSources.orderBlocks2022, r[18], curriculumSources.stops],
    18: [curriculumSources.structure, curriculumSources.stops, r[41]],
    19: [r[17], r[20], curriculumSources.hours, curriculumSources.clock],
    21: [r[7], r[9], r[21]],
    22: [r[5], r[22], r[26], r[41]],
    24: [r[24], curriculumSources.hours, curriculumSources.clock],
    26: [r[35], r[38]],
    36: [r[2], curriculumSources.structure, curriculumSources.gaps, r[29], r[41]],
    38: [r[11], r[27], r[41], curriculumSources.stops],
    50: [r[34], curriculumSources.orderBlocks2022, r[18]],
    51: [r[9], r[32], r[37], curriculumSources.hours],
    52: [r[23], r[40], curriculumSources.mnq, curriculumSources.employment, curriculumSources.fed, curriculumSources.stops],
  };
  // Specific sources are related reading, never fabricated line-level verification.
  const sources: CurriculumSource[] = checked[chapter.id] ?? (kind === 'foundations' ? [curriculumSources.matching, curriculumSources.stops]
    : kind === 'structure' ? (chapter.id === 11 ? [curriculumSources.structure, curriculumSources.gaps] : [curriculumSources.structure])
    : chapter.id === 13 || chapter.id === 14 ? [curriculumSources.gaps, curriculumSources.stops]
    : chapter.id === 15 ? [curriculumSources.orderBlocks2022, curriculumSources.blocks, curriculumSources.stops]
    : kind === 'delivery' ? [curriculumSources.blocks, curriculumSources.stops]
    : chapter.slug.includes('optimal') || chapter.slug.includes('fibonacci') ? [curriculumSources.ote]
    : chapter.id === 36 ? [curriculumSources.structure, curriculumSources.gaps]
    : kind === 'time' || [24, 25, 27, 47, 48].includes(chapter.id) ? [curriculumSources.hours, curriculumSources.clock]
    : []);
  return { interpretation: interpretation[kind], sources };
}

export const curriculumReviewCopy = {
  heading: 'Sources and interpretation',
  date: 'Editorial clarification updated',
  scope: 'LearnSMC explanations and checklists are original study notes, not quotations from ICT. Each reference states whether descriptions or specific video passages were checked. A complete course review and independent verification of trading performance are not claimed.',
  subjectivity: 'Where judgment is involved',
  exercise: 'Before chart replay, write the instrument, timeframe, session, entry condition, invalidation and costs. Record qualifying failures as well as successes, and keep later data separate from the examples used to choose your rules.',
  primary: 'Related primary sources',
  accounts: 'Official ICT accounts',
  youtube: 'ICT YouTube channel',
  x: 'ICT on X',
  access: 'The X profile could not be read during this review. No post-specific claims or quotations have been added.',
  corrections: 'Report a content correction',
};
