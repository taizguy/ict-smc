import type { TextbookChapter } from '../types';
import { reviewed2022Sources as r } from './ict2022Sources';
import { charterReviewSources } from './mentorshipReviewSources';
import { cornerstoneGuides, cornerstoneRevision } from './cornerstoneGuides';

// This date records our editorial clarification, not a full video/transcript review.
export const curriculumReviewDate = '2026-10-19';
export const curriculumReviewLabel = '19 October 2026';
// Chapter-wide editorial/diagram/quiz consistency review; not a new full-recording review.
export const chapterReviewRevision = (id: number) => [13,14,15,16].includes(id)
  ? { iso: '2026-10-25', label: '25 October 2026' } : [13, 15].includes(id) || cornerstoneGuides.some(guide => guide.chapterId === id)
  ? { iso: cornerstoneRevision, label: '24 October 2026' }
  : { iso: '2026-10-21', label: '21 October 2026' };
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
  breaker2022: {title:'ICT 2022 Mentorship — Episode 39',url:'https://www.youtube.com/watch?v=yFpHbBnsK_c&t=1220s',scope:'Selected automatic-caption passages at approximately 20:20–22:30 and 70:37–70:56 were consulted for the sweep, reversal, return and wider-target context. The invented prices and boundary conventions in this lesson are LearnSMC teaching examples, not transcribed executions.',passages:[{label:'20:20 — Breaker sequence and context',url:'https://www.youtube.com/watch?v=yFpHbBnsK_c&t=1220s',note:'The source relates a buy-side excursion, reversal and swing-low reference to a wider target. The pattern alone is not presented as a complete trading model.'}]},
  swingElementsCore: {"title": "ICT Core Month 6 — Elements To Successful Swing Trading", "url": "https://www.youtube.com/watch?v=Xs1i0aIeTME&t=24s", "scope": "Selected original-caption passages at 00:24–06:20 were reviewed. At approximately 01:17–01:45, COT and seasonal confirmation are optional in this framework; accuracy claims are not independently verified."},
  swingClassicCore: {"title": "ICT Core Month 6 — Classic Swing Trading Approach", "url": "https://www.youtube.com/watch?v=g--tikwaupk&t=39s", "scope": "Selected original-caption passages at 00:39–06:10 were reviewed. Higher-timeframe PD-array mapping is described; no universal holding period or pip target is established by this selected passage."},
  cotCore: {"title": "ICT Core Month 10 — Commitment Of Traders", "url": "https://www.youtube.com/watch?v=9H4iaaQXV5Y&t=48s", "scope": "Selected original-caption passages at 00:48–06:40 were reviewed. Futures-only net positioning is explained, and a net figure alone is insufficient. This is a Month 10 source, included as related reading for the swing chapter."},
  openInterestCore: {"title": "ICT Core Month 10 — Open Interest & Smart Money Footprints", "url": "https://www.youtube.com/watch?v=qRYkTWePXF0&t=138s", "scope": "Selected original-caption passages at 02:18–05:00 were reviewed. Outstanding contracts and the source’s price/open-interest interpretation are distinguished from verified trader identity."},
  cotDefinitions: {"title": "CFTC — About the COT Reports and release schedule", "url": "https://www.cftc.gov/MarketReports/CommitmentsofTraders/AbouttheCOTReports/index.htm", "scope": "Reviewed 20 October 2026: report coverage, Tuesday snapshots and usual Friday 15:30 Eastern publication. Consult the release schedule for holiday exceptions."},
  cotCategories: {"title": "CFTC — COT Explanatory Notes", "url": "https://www.cftc.gov/MarketReports/CommitmentsofTraders/ExplanatoryNotes/index.htm", "scope": "Reviewed 20 October 2026: commercial classification and the limits of nonreportable-position categories. Category labels do not reveal every trader’s intent."},
  openInterestDefinition: {"title": "CME Group — About Volume", "url": "https://www.cmegroup.com/trading/about-volume.html", "scope": "Reviewed 20 October 2026: each open contract has a buyer and seller, but open interest counts one side. The aggregate does not identify which category bought."},
  reaperVariant2026: { title: 'Futures Commentary — 9 June 2026: Reaper Variant', url: 'https://www.youtube.com/watch?v=18vX-vv2bsg&t=1010s', scope: 'Original-caption passages at approximately 14:40–19:40 and chart frames at 17:17 and 19:10 were reviewed. ICT identifies nested first-utilization and inversion-gap references within a breaker context as a Reaper variant; this does not authenticate every failed-inversion rule.' },
  suspension2026: { title: 'ICT 2026 Futures Weekend Review — 11 April 2026', url: 'https://www.youtube.com/watch?v=RY67bW2UhxY&t=650s', scope: 'Original-caption passages at approximately 08:20–15:00 and chart frames at 11:45, 12:45 and 14:10 were reviewed. The source compares body-price gaps, a breaker reference and front-month versus continuous contracts.' },
  enigma2026: { title: 'Enigma FVG Projections & Protractions — 27 June 2026', url: 'https://www.youtube.com/watch?v=rbNhlJSXDaA&t=660s', scope: 'Selected original-caption passages at 03:00–09:00 and 10:00–22:00 were reviewed. The source discusses FVG measurement boundaries and projections; the previous two-candle definition is not established by these passages.' },
  reaperExample2026: { title: 'ICT Reaper FVG — Long NQ Terminus Daily V.I., 8 June 2026', url: 'https://www.youtube.com/watch?v=kzeFqGK9gCQ', scope: 'Selected original-caption execution and management passages were reviewed. The title does not authenticate the previous inversion-of-inversion definition or a universal reversal-entry rule.' },
  premarket2026: { title: 'Midnight ET Principles in Relationship to Pre-Market Session', url: 'https://www.youtube.com/watch?v=KHkUPAsdyfk', scope: 'The original-caption opening through approximately 03:10 was reviewed. This example defines a roughly 07:00–09:00 New York pre-market observation period and distinguishes earlier preparation.' },
  firstHour2026: { title: 'Friday Review on NQ — Pre-Market Session Rules Revisited', url: 'https://www.youtube.com/watch?v=4KW2acdPi-M&t=1050s', scope: 'Original-caption passages at approximately 17:30–21:00 were reviewed. This example studies a 09:30–10:30 first-hour range; it does not make every course’s opening range one hour long.' },
  quarterlyCore: { title: 'ICT Core Month 5 — Using IPDA Data Ranges', url: 'https://www.youtube.com/watch?v=LRKtiysz4nA&t=996s', scope: 'Selected original-caption passages were reviewed. The discussion distinguishes quarterly shifts from a compulsory March/June/September/December calendar.' },
  allocationCore: { title: 'ICT Core Month 5 — Money Management', url: 'https://www.youtube.com/watch?v=crPpMwgwa7k&t=382s', scope: 'Selected original-caption passages were reviewed. A percentage of allocated capital must be distinguished from the same percentage of the entire account.' },
  twentyPipsCore: { title: 'ICT Core Month 9 — 20 Pips Per Day', url: 'https://www.youtube.com/watch?v=km0haQkTalc', scope: 'The opening original-caption passage was reviewed. The title is explicitly not a promise of 20 pips every day.' },
  routineCore: { title: 'ICT Core Month 9 — Day Trade Routine', url: 'https://www.youtube.com/watch?v=cqf8nH54bb8&t=2576s', scope: 'Selected original-caption passages were reviewed. Day trading does not require trading every day or acting on every fluctuation.' },
  reversalsCore: { title: 'ICT Core Month 9 — Market Reversals', url: 'https://www.youtube.com/watch?v=KrGTimL3YRQ&t=483s', scope: 'Selected original-caption passages were reviewed. Not every old high produces a reversal; some price runs continue.' },
  venom2025: { title: '2025 ICT Lecture — Venom Model Tutorial, 3 April 2025', url: 'https://www.youtube.com/watch?v=7wL2oyebbvU', scope: 'Selected original-caption passages and two chart frames were reviewed. Entry variations are distinguished; performance claims are not independently verified.', passages: [
    { label: '13:55 — Reference window and chart context', url: 'https://www.youtube.com/watch?v=7wL2oyebbvU&t=835s', note: 'The lesson marks the preceding 08:00–09:30 New York window. Its raid and deferred-entry examples do not establish the previous mandatory five-stage CRT/SMT/FVG definition.' },
  ] },
  sickSister2023: { title: '2023 ICT — Sick Sister Consolidation Example, 8 May 2023', url: 'https://www.youtube.com/watch?v=VSSwM6rDIg0', scope: 'Selected original-caption passages from approximately 01:00–10:50 were reviewed. The weaker index is considered for a contextual catch-up long, contradicting an always-short-the-weakest rule.' },
  onboarding2026: { title: '2026 ICT — How New Students Should Start, Part 1', url: 'https://www.youtube.com/watch?v=BWEPtHZ1Y2Y', scope: 'Selected original-caption passages were reviewed, including preparation and the distinction between timing and direction. A full-course review is not claimed.', passages: [
    { label: '64:00 — A macro is not directional information', url: 'https://www.youtube.com/watch?v=BWEPtHZ1Y2Y&t=3840s', note: 'The explanation uses a time window to observe an existing analysis, and explicitly says that the macro does not supply directional information.' },
  ] },
  nfp2026: { title: '2026 ICT — NFP Nasdaq Study Example', url: 'https://www.youtube.com/watch?v=hIusATccCcM', scope: 'The opening original-caption passage was reviewed. The source warns against inexperienced participation; displayed results are not independently verified.' },
  firstGap2025: { title: '2025 ICT Lecture — How to Disqualify First Presented FVGs', url: 'https://www.youtube.com/watch?v=y63zsrLCcCw&t=480s', scope: 'Selected original-caption passages and chart frames were reviewed. The filter belongs to this example, not every possible FVG definition.', passages: [
    { label: '08:00 — Check the preceding balanced range', url: 'https://www.youtube.com/watch?v=y63zsrLCcCw&t=480s', note: 'The apparent first gap is compared with previous bodies and wick delivery. The explanation rejects the overlapping candidate and distinguishes a later gap that leaves that area.' },
  ] },
  coreMultiAsset: { title: 'ICT Core Month 10 — Importance of Multi-Asset Analysis', url: 'https://www.youtube.com/watch?v=gs3KMgz84yc', scope: 'The opening original-caption passage was reviewed. The supplied Month 10 titles were catalogued; later month groups are not established by these files.', passages: [
    { label: '00:00 — Why compare asset classes?', url: 'https://www.youtube.com/watch?v=gs3KMgz84yc&t=0s', note: 'The introduction connects bonds, currencies, commodities and stocks as a study of relationships, and distinguishes the mentorship from a trade-signal service. This does not prove a fixed predictive correlation.' },
  ] },
  charter13: { title: 'ICT Charter Price Action Model 13 — 2022 Model Follow-up', url: 'https://www.youtube.com/watch?v=kNlySn81dmo', scope: 'Selected original-caption passages were reviewed. This is not continuous viewing or verification of trading results.', passages: [
    { label: '00:00 — Relationship to the public series', url: 'https://www.youtube.com/watch?v=kNlySn81dmo&t=0s', note: 'The introduction explicitly identifies Model 13 with the public 2022 model and assumes prior study of that series. Keep the public foundation and amplified follow-up distinguishable.' },
    { label: '14:00 — Partial exits involve judgment', url: 'https://www.youtube.com/watch?v=kNlySn81dmo&t=840s', note: 'The discussion does not prescribe one partial-exit fraction for every learner. Record a chosen management rule before replay rather than selecting it after the outcome.' },
  ] },
  silverBullet2023: { title: '2023 ICT Mentorship — Silver Bullet Time Based Trading Model', url: 'https://www.youtube.com/watch?v=tRq1hyGGtl4', scope: 'Selected original-caption passages were reviewed. Example ranges and timing conventions do not establish expected returns.', passages: [
    { label: '00:00 — Framework versus captured range', url: 'https://www.youtube.com/watch?v=tRq1hyGGtl4&t=0s', note: 'The introduction distinguishes the potential price framework from the portion captured between entry and exit. The numerical framework is not a guaranteed profit target.' },
    { label: '09:00 — Entry window and exit timing', url: 'https://www.youtube.com/watch?v=tRq1hyGGtl4&t=540s', note: 'Use New York local time with daylight saving by date. In the London example, entry occurs inside the hour; the source explicitly allows the position to continue beyond that hour.' },
  ] },
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
    ...charterReviewSources,
    7: [curriculumSources.structure, r[12]],
    13: [curriculumSources.gaps, r[4], r[24], curriculumSources.stops],
    15: [curriculumSources.orderBlocks2022, r[18], curriculumSources.stops],
    16: [curriculumSources.breaker2022, curriculumSources.blocks, curriculumSources.gaps, curriculumSources.stops],
    18: [curriculumSources.structure, curriculumSources.stops, r[41]],
    19: [r[17], r[20], curriculumSources.hours, curriculumSources.clock],
    21: [r[7], r[9], r[21]],
    22: [r[5], r[22], r[26], r[41]],
    24: [r[24], curriculumSources.hours, curriculumSources.clock],
    25: [curriculumSources.firstGap2025, curriculumSources.gaps, curriculumSources.stops],
    26: [r[35], r[38]],
    36: [curriculumSources.charter13, r[2], curriculumSources.structure, curriculumSources.gaps, r[29], r[41]],
    38: [r[11], r[27], r[41], curriculumSources.stops],
    42: [curriculumSources.swingElementsCore, curriculumSources.swingClassicCore, curriculumSources.cotCore, curriculumSources.openInterestCore, curriculumSources.cotDefinitions, curriculumSources.cotCategories, curriculumSources.openInterestDefinition],
    41: [curriculumSources.quarterlyCore, curriculumSources.allocationCore, curriculumSources.stops],
    45: [curriculumSources.twentyPipsCore, curriculumSources.routineCore, curriculumSources.reversalsCore],
    46: [curriculumSources.coreMultiAsset],
    47: [curriculumSources.onboarding2026, curriculumSources.nfp2026, curriculumSources.clock, curriculumSources.employment, curriculumSources.fed, curriculumSources.stops],
    48: [curriculumSources.premarket2026, curriculumSources.firstHour2026, curriculumSources.venom2025, curriculumSources.onboarding2026, curriculumSources.clock],
    50: [r[34], curriculumSources.orderBlocks2022, r[18]],
    51: [r[9], r[32], r[37], curriculumSources.hours],
    53: [curriculumSources.venom2025, curriculumSources.clock, curriculumSources.stops],
    14: [curriculumSources.reaperVariant2026, curriculumSources.gaps, curriculumSources.stops],
    55: [curriculumSources.suspension2026, curriculumSources.reaperVariant2026, curriculumSources.reaperExample2026, curriculumSources.stops],
    56: [curriculumSources.enigma2026, curriculumSources.gaps, curriculumSources.stops],
    57: [curriculumSources.sickSister2023, curriculumSources.stops],
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
  const deliveryInterpretations:Record<number,string>={
    13:'Wick boundaries and CE can be calculated. Range anchors, displacement filters, observation windows and the definition of a successful reaction require stated choices. Geometry alone does not establish a trading edge.',
    14:'This lesson uses explicit closing conditions for role reversal. A wick-only test and a whole-body test are different conventions. Retest timing, expiry and trade execution remain separate from that classification.',
    15:'Selecting one candle or a consecutive run changes the reference. Opening, body and full-wick boundaries must be labelled before calculating mean threshold. OHLC does not identify institutional inventory.',
    16:'The examples state a swing sequence and candle-selection convention. Mitigation-block terminology varies, and a Unicorn overlap is a geometric relationship rather than a verified probability advantage.',
  };
  return { interpretation: deliveryInterpretations[chapter.id]||interpretation[kind], sources };
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
