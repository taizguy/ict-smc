import { TextbookChapter } from '../../types';

export const ict2025Chapters: TextbookChapter[] = [
  // CHAPTER 24: 09:30 AM Opening Range Theory
  {
    id: 24,
    slug: '0930-am-opening-range-theory',
    part: 'Part IX - ICT 2025 Official Mentorship Curriculum',
    title: '24.1 The 09:30 AM Opening Range Theory — Cash Open Volatility & Initial Balance',
    quote: "The cash open is a scheduled market event; the direction and duration of its first move are not predetermined.",
    level: 2,
    summary: ["09:30 New York local cash open and the actual exchange calendar.","An expected area versus actual qualifying displacement.","Predefined observation ranges and no-setup days."],
    keyTerms: [{"term":"Cash core open","definition":"The normal 09:30 New York local opening of the U.S. equity core session, subject to the exchange calendar."},{"term":"Selected opening range","definition":"A range measured over explicitly chosen start and end times; different durations are different study conventions."}],
    practiceQuestions: ["Which opening reference and observation range does your study use?","What happened when the expected reversal lacked displacement?","How do holidays and daylight saving affect the clock conversion?"],
    sections: [
      {
        id: '24.1',
        title: '24.1 The Volatility Crucible of 09:30 AM EST',
        content: "The normal U.S. equity core session starts at 09:30 New York local time, subject to the exchange calendar. Futures already trading before that time can react to cash-market activity. Use America/New_York rather than a fixed EST offset throughout the year.\n\nEpisode 24 discusses an anticipated opening reversal but then checks whether the required displacement actually appears. It does not. This is an important no-setup example: an expected area and a directional idea are not sufficient entry conditions.\n\nRemove the unsupported claim that nine out of ten opening surges reverse. A chosen 09:30–09:45 observation range is a study convention, not a universal ban on all earlier entries. Define its endpoints and compare breakout, reversal and unresolved days without selecting only neat examples.",
        keyTakeaway: "Observe the cash open and require the chosen setup conditions; an anticipated reversal is not a signal."
      },
      {
        id: '24.2',
        title: '24.2 The 09:50 AM Macro Handoff and Morning Delivery',
        content: "A study window such as 09:50–10:10 New York local time can organize observations. This 2022 recording review does not authenticate every macro-window claim previously attached to a 2025 lecture label.\n\nKeep the selected range, displacement rule, FVG definition and expiry fixed. The window can contain a continuation, reversal or no qualifying setup. A midpoint entry may remain unfilled, and a stop beyond an opening extreme does not make the position safe.\n\nRecord the time at which each condition becomes visible. Do not credit a completed chart with an entry that required information unavailable at that moment.",
        keyTakeaway: "A clock window organizes a study; it does not promise displacement or a successful fill."
      }
    ]
  },

  // CHAPTER 25: The 1st Presented FVG (The 09:31 Rule)
  {
    id: 25,
    slug: 'the-1st-presented-fvg-the-0931-rule',
    part: 'Part IX - ICT 2025 Official Mentorship Curriculum',
    title: '25.1 The 1st Presented FVG (The 09:31 Rule) — Immediate Execution Advantage',
    quote: "The first qualifying FVG is a time-ordered observation. Its risk, fill rate and subsequent outcome depend on context and execution rules, not on being first alone.",
    level: 2,
    summary: [
      'The foundational definition of the "First Presented FVG".',
      'The 09:31 Rule in high-velocity open tape reading.',
      "Comparing first and later pullbacks without assuming their relative win rates.",
      'Consequent Encroachment (50% CE) execution parameters.',
      'Discipline: Knowing when an FVG has been over-mitigated and must be abandoned.'
    ],
    keyTerms: [
      { term: 'First Presented FVG', definition: 'The very first 3-candle imbalance created during the initial displacement wave following a liquidity sweep or Market Structure Shift.' },
      { term: '09:31 Rule', definition: "A timing label used in these study notes. A qualifying gap requires completed candles and stated conditions, not just a clock reading." },
      { term: 'Secondary Retracement Risk', definition: "The possibility that later pullbacks behave differently; the direction and size of that difference require a defined sample." },
      { term: 'Wick Invalidation', definition: 'The immediate cancellation of a trade setup when an execution candle fails to respect the proximal boundary of the First Presented FVG.' }
    ],
    practiceQuestions: [
      "How would you compare first and later FVGs using identical execution assumptions and a separate evaluation sample?",
      'If price penetrates more than 50% through the First Presented FVG, what should you do with your limit order?',
      'How does the 09:31 rule differentiate between a genuine trend initiation and opening noise?',
      'Where is your invalidation stop loss placed when entering strictly on the First Presented FVG?',
      'What should you do if the first presented FVG is over 50 index points wide on Nasdaq?'
    ],
    sections: [
      {
        id: '25.1',
        title: '25.1 The Primacy of the First Presented Imbalance',
        content: "For this study, the first presented FVG is the first qualifying completed three-candle gap after your predefined displacement or structure-shift condition. Specify when the observation window begins; a gap appearing at 09:31 is not automatically valid simply because of its timestamp.\n\nCompare first and later qualifying gaps under the same entry, stop, target and cost assumptions. A first gap can fail, never retrace, or produce a larger drawdown than a later one. No superiority or near-zero drawdown is established by the name.\n\nThe exact claim about introduction in a particular 2025 or 2026 lecture has not been verified here. Consult the original lesson before attributing that historical claim or a fixed execution sequence to ICT.",
        keyTakeaway: "Define first before replay; measure performance instead of assuming that an earlier gap is superior."
      },
      {
        id: '25.2',
        title: '25.2 The Mechanical 09:31 Execution Protocol',
        content: `On volatile morning sessions (such as index futures or forex majors), the first presented imbalance can form almost immediately following a sweep:

The 4-Step Execution Checklist:
1. Identify the Liquidity Purge: Confirm that price has swept the Asian High/Low, Previous Day High/Low, or a Key HTF Level.
2. Watch the Displacement Bar: Look for a decisive, large-bodied candle breaking the immediate counter-trend swing point.
3. Box the First FVG: The moment Candle 3 closes, draw your horizontal box across the gap between Candle 1's wick and Candle 3's wick.
4. Deploy Limit Order at 50% CE: Place a limit order at the exact 50% midpoint of the box. Place your stop 2 to 3 ticks beyond the swing extreme that initiated the move.

If price returns to the gap, taps it, and rejects within 1 to 3 candles, the trade is on. If price begins consolidating inside the gap with heavy overlapping candle bodies, cancel your order: the algorithm has lost its urgency!`,
        keyTakeaway: 'Mark the first FVG immediately upon Candle 3 close; enter at 50% CE with stops behind the origin swing. Abandon the setup if candle bodies stall inside the gap.'
      }
    ]
  },

  // CHAPTER 26: SMT Divergence Mechanics
  {
    id: 26,
    slug: 'smt-divergence-mechanics',
    part: 'Part IX - ICT 2025 Official Mentorship Curriculum',
    title: '26.1 SMT Divergence Mechanics — The Intermarket Crack in the Armor',
    quote: "SMT compares corresponding extremes in related markets. A divergence is an observation to interpret, not a view into institutional inventory.",
    level: 3,
    summary: ["Corresponding highs or lows across related instruments.","Aligned timestamps, contract months and comparison fields.","Disappearing divergence and the role of context.","Instrument selection as a testable hypothesis."],
    keyTerms: [{"term":"SMT Divergence (Smart Money Technique)","definition":"A non-confirmation between specified extremes in related instruments at aligned times. Interpretation depends on the relationship and chosen context."},{"term":"Comparison series","definition":"The selected price field, instrument and time alignment; lows, highs and closes answer different questions."}],
    practiceQuestions: ["Are you comparing corresponding lows, highs or closes?","What would make the apparent divergence disappear?","Which evidence would be needed to claim an improvement in outcomes?"],
    sections: [
      {
        id: '26.1',
        title: '26.1 The Mathematical Principle of Intermarket Non-Confirmation',
        content: "In Episode 35, ICT compares ES with NQ at corresponding lows. NQ makes a lower low while ES does not. He changes the comparison plot to use lows, rather than the default closing-price line, because the question concerns lows.\n\nMatch the instruments, contract months, timestamps, timezone and data series. Comparing one market’s low with another market’s close can create a false non-confirmation. Positive and inverse relationships require different comparisons; do not treat every pair as moving together.\n\nThe episode also warns that an apparent divergence can disappear as the markets resume moving together. Record the observation time, context and required later confirmation. A chart mismatch alone does not establish accumulation, manipulation or a profitable reversal.",
        keyTakeaway: "Compare corresponding highs or lows at aligned times; do not substitute closing prices without changing the question."
      },
      {
        id: '26.2',
        title: "26.2 Relative Strength as a Selection Hypothesis",
        content: "A study may prefer the relatively stronger market for a bullish idea or the weaker market for a bearish idea. This is a selection hypothesis, not proof that the chosen market has the highest statistical velocity or that its next move must be larger.\n\nEpisode 35 combines its comparison with an existing directional idea and price context. Test the instrument-selection rule separately from the setup. Retain cases where divergence disappears, the selected instrument underperforms, or the trade fails.",
        keyTakeaway: "Relative strength can guide a stated research variant; it does not certify which instrument will outperform."
      }
    ]
  },

  // CHAPTER 27: The 12 Weekly Profiles
  {
    id: 27,
    slug: 'the-12-weekly-profiles',
    part: 'Part IX - ICT 2025 Official Mentorship Curriculum',
    title: '27.1 The 12 Weekly Profiles — Decoding Institutional Weekly Delivery Templates',
    quote: 'The weekly template is the master chessboard. When you know whether the week is scheduled as a Classic Tuesday Low, a Midweek Reversal, or a Consolidation Thursday, daily bias ceases to be a mystery.',
    level: 3,
    summary: [
      'The comprehensive taxonomy of the 12 ICT Weekly Profiles.',
      'Profile 1: Classic Tuesday Low of Week (Bullish Expansion).',
      'Profile 2: Wednesday Low of Week (Midweek News Reversal).',
      'Profile 3: Seek & Destroy / Consolidation Week (Choppy Range).',
      'Profile 4: Friday Reversal / Weekly Runaway Trend.',
      'How to anticipate the active weekly profile using the economic calendar.'
    ],
    keyTerms: [
      { term: '12 Weekly Profiles', definition: 'The 12 distinct programmatic templates used by the Interbank Price Delivery Algorithm to deliver price across the 5-day trading week.' },
      { term: 'Seek & Destroy Week', definition: 'A low-expectancy weekly profile where the algorithm repeatedly sweeps both the high and low of previous days without delivering directional trend expansion.' },
      { term: 'Midweek Reversal Profile', definition: 'A profile driven by Wednesday 08:30 or 14:00 EST macroeconomic releases (FOMC/CPI) that traps early-week trend traders and reverses the entire five-day trajectory.' },
      { term: 'Economic Catalyst Alignment', definition: 'The method of inspecting high-impact red folder news events across the Monday-Friday calendar to forecast the specific weekly profile in advance.' }
    ],
    practiceQuestions: [
      'How does an upcoming Wednesday FOMC rate announcement at 14:00 EST dictate which weekly profile will unfold?',
      'What are the visual and structural characteristics of a "Seek & Destroy" weekly profile, and how should a trader manage risk during such a week?',
      'In a Classic Bullish Weekly Profile, what specific price action should you look for during Monday and Tuesday morning?',
      'Why is Friday afternoon generally an unfavorable time to hold swing positions into the weekend?',
      'How does identifying the weekly profile on Wednesday morning give you high conviction for Thursday’s trading?'
    ],
    sections: [
      {
        id: '27.1',
        title: '27.1 The Four Master Weekly Archetypes',
        content: "Use four descriptive scenarios: directional expansion, midweek reversal, persistent range and an unusually strong one-way move. These are organizing labels for chart review, not an authenticated enumeration of ICT’s numbered profiles.\n\nThe previous 45%, 25%, 15% and 15% frequencies had no documented sample here and have been removed. The economic calendar can identify scheduled event risk; it does not dictate which weekly pattern will occur. Check actual release dates rather than assuming CPI or a policy decision always occurs on Wednesday.\n\nChoose one scenario before replay and state what would contradict it. Record unexpected paths and avoid changing the label solely to make the finished chart fit the story.",
        keyTakeaway: "Use scenarios and an actual event calendar; no profile frequency or predetermined weekly path is established here."
      },
      {
        id: '27.2',
        title: '27.2 Practical Application: Building Your Weekly Bias',
        content: "Before the week begins, record scheduled releases, exchange holidays, the prior week’s range and the chosen opening reference. Describe a bullish case, a bearish case and conditions that would leave you undecided.\n\nDo not assume the calendar determines the weekly low, high or direction. Tuesday cannot confirm the final weekly low before the rest of the week has occurred. If a scenario fails, record that failure rather than retroactively choosing another profile.\n\nTreat below-open entry filters and previous-week targets as model choices. Keep risk, costs and invalidation explicit. A target is a reference level, not a commitment by the market to reach it.",
        keyTakeaway: 'Use Sunday calendar analysis to identify the likely weekly profile. Anchor your bias around the Weekly Open and target the Previous Week High or Low.'
      }
    ]
  }
];
