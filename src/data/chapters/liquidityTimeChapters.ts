import { TextbookChapter } from '../../types';

export const liquidityTimeChapters: TextbookChapter[] = [
  // CHAPTER 18: Liquidity Engineering & Liquidity Runs
  {
    id: 18,
    slug: 'liquidity-engineering-and-liquidity-runs',
    part: 'Part IV - Liquidity and Time',
    title: 'Liquidity Engineering & Liquidity Runs — Inducement, Traps, and Low Resistance Runs',
    quote: "A visible high or low is a reference. Hidden order quantity and a participant’s intent require evidence beyond the candle chart.",
    level: 3,
    summary: ["Prior highs and lows as hypotheses about possible liquidity.","Observed price paths versus inferred participant intent.","Predefined reference selection and resistance classifications."],
    keyTerms: [{"term":"Liquidity Engineering","definition":"An ICT interpretive label for how visible patterns may relate to potential orders; candle data alone does not prove deliberate engineering."},{"term":"Equal Highs (EQH) / Relative Equal Highs","definition":"Selected highs grouped using a stated tolerance; possible stop interest is inferred, not directly measured."},{"term":"Equal Lows (EQL) / Relative Equal Lows","definition":"Selected lows grouped using a stated tolerance and timeframe."}],
    practiceQuestions: ["What is visible, and what would require actual order data?","How are similar highs or lows grouped before the later move?","How would failed sweeps change your interpretation?"],
    sections: [
      {
        id: '18.1',
        title: '18.1 The Architecture of Liquidity Engineering',
        content: "In ICT terminology, similar highs and lows can be treated as possible liquidity references. Define the price tolerance and timeframe before grouping them. A later move beyond that group is observable; the quantity and owners of stops are not visible in OHLC candles.\n\nThe framework may interpret a failed breakout as inducement or a liquidity sweep. That interpretation does not prove deliberate construction by a single algorithm, a required five-to-fifteen-tick stop hunt or a necessary reversal. Record both continued breakouts and reversals under the same prior reference rule.",
        keyTakeaway: "Separate a visible break of a reference from an inferred explanation of who caused it."
      },
      {
        id: '18.2',
        title: '18.2 Trendline Phantom Liquidity',
        content: "A trendline is drawn using selected anchors. Traders may place stops near it, but the line does not reveal a staircase of actual resting orders or prove that institutions created it.\n\nWhen price crosses the line, new orders, triggered stops, cancellations and changing quotes may all matter. A candle alone cannot identify the dominant cause. Choose the anchors before replay and compare breaks that continue with breaks that fail.",
        keyTakeaway: "A drawn line is not a direct measurement of stop inventory or the cause of a price move."
      },
      {
        id: '18.3',
        title: '18.3 Low Resistance vs. High Resistance Liquidity Runs',
        content: "Low- and high-resistance liquidity runs are framework descriptions of relatively direct or obstructed price delivery. The classification depends on selected reference levels, timeframe and how overlap is measured.\n\nDefine that classification before judging the later move. Neither label establishes a fixed retracement percentage, permission to pyramid aggressively or a tested win probability. A direct historical path can still be difficult to execute, and multiple entries increase combined exposure. Include costs and failures when comparing the two groups.",
        keyTakeaway: "Define the profile before replay and evaluate exposure separately from how clean the completed chart looks."
      }
    ]
  },

  // CHAPTER 19: Time & Session Liquidity: The Global Clock
  {
    id: 19,
    slug: 'time-and-session-liquidity-the-global-clock',
    part: 'Part IV - Liquidity and Time',
    title: 'Time & Session Liquidity: The Global Clock — Killzones, Macros, and Algorithmic Schedules',
    quote: "Time windows define when a study observes the market. They do not make every pattern inside valid or every pattern outside random.",
    level: 3,
    summary: ["Distinct Forex and index session examples from the 2022 recordings.","Date-aware New York time and actual product calendars.","Observation windows rather than guaranteed algorithmic schedules."],
    keyTerms: [{"term":"Killzone","definition":"A selected observation window for a stated product and model; it does not guarantee an edge."},{"term":"Forex New York example","definition":"07:00–10:00 New York local time in Episodes 8 and 17; keep this distinct from index-futures references."},{"term":"London example","definition":"02:00–05:00 New York local time in Episode 20; convert by date rather than fixed UTC offset."},{"term":"Macro Window","definition":"A stated timing reference in a particular lesson; a clock interval does not prove a predetermined price move."}],
    practiceQuestions: ["Which product and original episode define your selected window?","Does the chart use New York local time for the actual date?","How would you compare the same setup inside and outside the window?"],
    sections: [
      {
        id: '19.1',
        title: "19.1 Session Times and New York Local Time",
        content: "State the clock used for every session window. For ICT-style New York references, use the IANA timezone America/New_York rather than a fixed UTC offset. New York uses standard time in winter and daylight time in summer; dates matter when converting to Pakistan time.\n\nThe London and New York daylight-saving changes do not always occur in the same week. A New York-based study window and the actual London exchange opening time are therefore different references. Check the instrument, exchange calendar and holiday schedule.\n\nA time window is a filter for observation, not proof that one algorithm controls every market. Record activity and failed setups outside and inside the chosen window before claiming that one period performs better.",
        keyTakeaway: "Use date-aware New York local time and confirm the product calendar; session windows do not guarantee an edge."
      },
      {
        id: '19.2',
        title: "19.2 Choosing Session Observation Windows",
        content: "Session labels vary by lesson and instrument. In these notes, an Asian-range study may use 20:00 to 00:00, a London-open study 02:00 to 05:00, and a New York morning study 08:00 to 11:00, all in New York local time. Treat these as stated study windows, not verified universal definitions from every ICT lesson.\n\nThe U.S. equity core opening reference is 09:30 New York time on a normal trading day. Futures, spot FX and individual exchanges have different sessions. Do not call every chosen window an exchange opening or assume every day has the same calendar.\n\nCompare spread, activity, qualifying patterns and failures in the selected sample. A session label alone does not establish a win rate, a fixed retracement percentage or which daily extreme will form there.",
        keyTakeaway: "Document the session convention and actual market calendar; evaluate the chosen window instead of assuming superiority."
      },
      {
        id: '19.3',
        title: '19.3 The 20-Minute Algorithmic Macro Windows',
        content: "Macro windows are timing references used in ICT-style study. For example, a researcher may observe 09:50 to 10:10 New York local time. A clock interval is not evidence that a particular program executes a predetermined price move.\n\nKeep the chosen window, entry definition and evaluation horizon fixed before replay. Compare the same setup inside and outside the window, including days with no entry and losing examples. A gap forming near a window boundary does not guarantee immediate delivery to a target.\n\nUse the exact original lesson when attributing a list of macro times to ICT. This page does not verify every previously listed interval as an official twenty-minute window; some earlier intervals were longer than twenty minutes.",
        keyTakeaway: "A time filter is a hypothesis to measure, not a promise of immediate price expansion."
      },
{
  "id": "19.4-source-reading",
  "title": "19.4 Keep Forex and Index Windows Distinct",
  "content": "Episodes 8 and 17 use 07:00–10:00 New York local time for the Forex New York study window. Episode 20 uses 02:00–05:00 for London. Episode 5 discusses index reference swings before 08:30 and an afternoon focus around 13:30. These references serve different products and examples; do not merge them into one universal killzone.\n\nRecord the instrument, feed and date alongside the window. New York midnight, 08:30 economic releases, the 09:30 equity core open and an electronic futures session open are different events. Check the actual calendar, including holidays and daylight saving changes."
}
    ]
  },

  // CHAPTER 20: The Weekly Profile & Five-Day Delivery Model
  {
    id: 20,
    slug: 'the-weekly-profile-and-five-day-delivery-model',
    part: 'Part IV - Liquidity and Time',
    title: 'The Weekly Profile & Five-Day Delivery Model — Decoding the Intraworking Weekly Template',
    quote: "A weekly candle summarizes the selected week. Its high and low can form on any trading day; weekday scenarios are hypotheses, not a known future sequence.",
    level: 3,
    summary: [
      'The weekly candlestick delivery anatomy (Open, High, Low, Close).',
      'The Classic Tuesday Low of Week (LOW) / High of Week (HOW) profile.',
      'The Midweek Wednesday Reversal profile: Navigating midweek economic releases.',
      'Thursday consolidation and Friday profit-taking reversals.',
      'The 12 institutional weekly profiles and their macroeconomic drivers.'
    ],
    keyTerms: [
      { term: 'Weekly Profile', definition: 'The characteristic day-by-day structural behavior of price delivery across the Monday-through-Friday trading week.' },
      { term: 'Low of Week (LOW)', definition: "The lowest observed price of the selected trading week. Its final location is known only after the week ends; no weekday probability is established here." },
      { term: 'High of Week (HOW)', definition: 'The absolute highest price level printed during the five-day trading week, which in a bearish week forms on Tuesday or Wednesday.' },
      { term: 'Midweek Reversal', definition: 'A weekly profile where Monday and Tuesday expand in one direction, followed by a violent reversal on Wednesday or Thursday morning fueled by high-impact news.' },
      { term: 'Consolidation Thursday', definition: 'A weekly profile variant where the market pauses ahead of Friday Non-Farm Payrolls (NFP) or heavy central bank announcements.' }
    ],
    practiceQuestions: [
      'In a classic bullish weekly profile, on which days and during which session does the Low of the Week (LOW) statistically form?',
      'Why is trading aggressively on Monday morning often a trap for retail traders?',
      'How does high-impact economic news scheduled for Wednesday morning (such as FOMC) alter the expected weekly profile?',
      'What is the typical behavioral pattern of price on Friday afternoon after a massive four-day trend?',
      'How does aligning your daily bias with the expected weekly profile keep you on the right side of the macro trend?'
    ],
    sections: [
      {
        id: '20.1',
        title: '20.1 The Anatomy of the Weekly Candlestick',
        content: "A completed weekly candle shows its open, high, low and close. It does not show which weekday formed each extreme unless lower-timeframe data is inspected. During the week, the final high, low and closing direction remain unknown.\n\nAn early decline followed by expansion can be used as an illustrative bullish profile. It is not a required sequence: a week can trend immediately, reverse late, or remain range-bound. Label examples as scenarios rather than a timetable the market must follow.",
        keyTakeaway: "A weekly profile is a scenario; the completed weekly extremes are known only afterward."
      },
      {
        id: '20.2',
        title: '20.2 The Classic Tuesday LOW/HOW Template',
        content: "Use the Tuesday high-or-low idea as a hypothesis for a specified market and sample. The earlier claim of approximately 70% probability had no documented dataset or reproducible calculation here and has been removed.\n\nBefore measuring, define the trading week, timezone, instrument and treatment of holidays. Count every week in the sample, including weeks whose extreme forms on another day. A bullish-week filter selected after the close uses future information and must not be confused with a tradable forecast.\n\nDuring replay, mark Monday’s range and observe Tuesday without assuming a reversal. Keep later weeks separate for evaluation. Report counts and uncertainty rather than presenting a weekday tendency as a promise.",
        keyTakeaway: "No weekday probability is established here. Define the sample and avoid using the final weekly outcome to select examples."
      }
    ]
  },

  // CHAPTER 21: Daily Profiles & Intraday Power of Three (PO3)
  {
    id: 21,
    slug: 'daily-profiles-and-intraday-power-of-three-po3',
    part: 'Part IV - Liquidity and Time',
    title: 'Daily Profiles & Intraday Power of Three (PO3 / AMD) — Accumulation, Manipulation, Distribution',
    quote: "A finished daily candle is an outcome. Write the opening reference and possible paths before deciding which PO3 interpretation fits.",
    level: 3,
    summary: ["PO3 as a contextual interpretation rather than a compulsory candle lifecycle.","Opening references and the possibility of no return.","Uncertain daily bias and competing scenarios.","Observation versus inferred participant intent."],
    keyTerms: [{"term":"Power of Three (PO3)","definition":"An ICT interpretive framework using accumulation, manipulation and distribution; the stages are not guaranteed for every candle."},{"term":"New York midnight reference","definition":"The selected feed’s first available price at or after 00:00 New York local time; it is not every product’s exchange opening."}],
    practiceQuestions: ["What was your opening reference before the later candles appeared?","What if price never revisits the preferred side of the open?","Which observations would make the daily bias uncertain?"],
    sections: [
      {
        id: '21.1',
        title: '21.1 The Mechanics of Power of Three (PO3 / AMD)',
        content: "Power of Three (PO3), also called accumulation, manipulation and distribution, is an ICT framework for interpreting a range, an initial move against an expected direction and a later directional expansion. Episode 9 applies that reasoning to daily context and New York afternoon opportunities. It does not establish that every candle must follow a fixed Asian–London–New York sequence.\n\nFirst record the opening reference, expected direction and observation window. A completed candle can look like a neat three-stage story even when the direction was unclear beforehand. Consolidation, an immediate trend and repeated two-sided moves must remain possible outcomes.\n\nDescribe the visible price path separately from inferred accumulation or manipulation. Candle data does not identify who accumulated inventory or prove a coordinated intent. Use the framework as a hypothesis to investigate, not a guarantee about the final daily candle.",
        keyTakeaway: "PO3 is a contextual interpretation; record the scenario before the finished candle supplies an attractive story."
      },
      {
        id: '21.2',
        title: "21.2 Using the New York Midnight Open as a Reference",
        content: "The midnight open is the first available price at or after 00:00 America/New_York under the selected feed and session convention. It is a chart reference, not a universal exchange opening or a directly observable institutional cost basis.\n\nOne study model may filter bullish entries to prices below this reference and bearish entries to prices above it. That is a chosen constraint. A bullish day can trade above the open without offering the desired retracement, and a move below the open can keep falling.\n\nDo not treat above or below the daily open as equivalent to premium or discount of every dealing range. Record the range endpoints, date and timezone separately. Compare the filter with an alternative on later data rather than presenting never-buy or never-sell rules as universal facts.",
        keyTakeaway: "The midnight open is a reference; any entry restriction around it is a model choice."
      },
{
  "id": "21.3-source-reading",
  "title": "21.3 When Price Does Not Return to the Open",
  "content": "In Episode 7, consolidation around equilibrium makes the daily bias difficult to read. Uncertainty is a valid state; a learner need not force a bullish or bearish prediction every morning.\n\nEpisode 21 shows a bearish case that does not rally above either the New York midnight open or the 08:30 opening reference. Those prices are useful context, not mandatory destinations. Waiting for a particular return can mean no trade. Do not chase a missed move or silently remove a filter after seeing how far price travelled."
}
    ]
  },

  // CHAPTER 22: The Complete ICT Top-Down Model & Execution Blueprint
  {
    id: 22,
    slug: 'the-complete-ict-top-down-model-and-execution-blueprint',
    part: 'Part IV - Time Based Delivery',
    title: 'The Complete ICT Top-Down Model & Execution Blueprint — From Monthly Narrative to 1-Minute Execution',
    quote: "Context narrows a research question. It does not make every lower-timeframe signal valid or every higher-timeframe forecast correct.",
    level: 3,
    summary: ["Select the instrument, feed, range and session before replay.","Separate an initial crossing from displacement, FVG completion and entry.","Record uncertainty, alternative entry variants and no-trade conditions.","Evaluate outcomes after execution costs and retain failures."],
    keyTerms: [{"term":"Context timeframe","definition":"The chart scale used to select the research range and possible objective."},{"term":"Dealing Range Equilibrium (50%)","definition":"The arithmetic midpoint of the explicitly selected range boundaries; it does not force a reversal."},{"term":"Entry variant","definition":"The specified order type, trigger and invalidation tested without switching rules after the outcome."}],
    practiceQuestions: ["Which reference and timeframe were selected before the move?","What would make this a no-entry observation?","Are you testing a retracement entry or a stop-entry variant?"],
    sections: [
      {
        id: '22.1',
        title: '22.1 The Interbank Multi-Timeframe Hierarchy',
        content: "Use higher-timeframe context to select the range and possible objective, then inspect smaller-timeframe structure for the particular model being studied. Episode 5 uses a 15-minute chart for reference highs, lows and imbalances. Episode 16 shows several possible setups within a wider context; it does not require taking all of them.\n\nThere is no single verified monthly-to-one-minute ladder that every student must follow. State which timeframes you use and why. A lower-timeframe reversal can be a retracement within a larger trend; an opposing higher-timeframe label does not make every countertrend trade impossible.\n\nPremium and discount describe location relative to selected boundaries. They do not measure fundamental value or force a reversal. Episode 22 explicitly discusses how a market can remain in a premium and go higher, or remain in a discount and go lower.",
        keyTakeaway: "Separate context, reference selection and execution; range location is not a reversal signal by itself."
      },
      {
        id: '22.2',
        title: "22.2 A Research Checklist, Not a Universal Trade Prescription",
        content: "Before replay, record the product, contract, feed, date-aware New York session window and actual event calendar. Select an already visible liquidity reference and write both the expected scenario and what would make you stand aside.\n\nObserve the initial reference crossing, displacement and later FVG completion separately. Episode 4 includes moves without a qualifying FVG; Episode 5 explains that order blocks are not essential to every model. Neither a universal candle-body close nor waiting until 09:45 should be imposed on every 2022 example.\n\nSpecify the entry variant, invalidation, target and order expiry before entry. Episode 2 mentions both retracement and sell-stop entry approaches. Do not combine the best fill from one variant with the stop and outcome of another. No fixed risk percentage or mandatory partial-profit fraction is established by this checklist.\n\nAccount for total exposure, spread, commission, slippage and unfilled orders. Retain failures and no-trade observations in the journal. The checklist organizes LearnSMC research; it does not reproduce a single compulsory ICT trade plan or establish a profitable strategy.",
        keyTakeaway: "Write the model variant and risk assumptions before replay, including the possibility of no entry."
      }
    ]
  }
];
