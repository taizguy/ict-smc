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
    title: "First Presented FVG: Qualification & Balanced-Range Context",
    quote: "The first qualifying FVG is a time-ordered observation. Its risk, fill rate and subsequent outcome depend on context and execution rules, not on being first alone.",
    level: 2,
    summary: ["Check the preceding balanced range before selecting the first qualifying gap.", "Distinguish the source example from a universal clock-based trigger.", "Record rejected candidates, failed setups and unfilled orders alongside successes."],
    "keyTerms": [
  {
    "term": "First Presented FVG",
    "definition": "The first qualifying gap under a stated source and observation rule. Being first in clock order is insufficient if the candidate lies within already balanced price action."
  },
  {
    "term": "Balanced-range context",
    "definition": "Prior overlapping delivery that can disqualify a candidate in the reviewed example. State how you identify the range before choosing a gap."
  }
],
    "practiceQuestions": [
  "Which preceding candle ranges make the apparent gap questionable?",
  "Does the candidate break away from the prior balanced range, or sit within it?",
  "Which entry and invalidation rules belong to this particular source example?"
],
    "sections": [
  {
    "id": "25.1",
    "title": "25.1 First must also mean qualifying",
    "content": "A three-candle shape and an early timestamp do not settle whether a candidate qualifies in a particular model. In the reviewed 2025 disqualification lesson, ICT compares an apparent first gap with the preceding candle bodies and wick ranges. He rejects the candidate because it sits within a previously balanced area rather than breaking away from it. A later candidate is then distinguished from that overlapping area. This is a source-specific contextual filter, not a claim that every conventional FVG definition uses the same exclusion.",
    "keyTakeaway": "Check the preceding range before labelling a candidate the first qualifying gap."
  },
  {
    "id": "25.2",
    "title": "25.2 A source-led replay checklist",
    "content": "Pause before the later move is visible. Mark the preceding range, the candidate gap boundaries and why the candidate does or does not escape that range. Save both rejected and accepted candidates. Then compare the result using the same feed, session and contract.\n\nThe original example enters at consequent encroachment of the selected gap, but it does not establish a universal 09:31 trigger, a mandatory two-to-three-tick stop, or guaranteed rejection within three candles. Specify those decisions separately if you research a variation. The first qualifying gap can fail, never retrace or be too wide for a chosen risk budget. No trade is a valid study outcome.",
    "keyTakeaway": "Keep the example’s contextual filter separate from execution rules you add yourself."
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
