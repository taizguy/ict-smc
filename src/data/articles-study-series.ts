import type { Article, ArticleSection } from './articles';

const section = (id: string, title: string, paragraphs: string[], takeaway: string, sources?: number[]): ArticleSection => ({ id, title, paragraphs, takeaway, sources });
const research = { title: 'CFTC: Commodity Trading Systems Sold on the Internet', url: 'https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/fraudadv_tradingsystem.html', note: 'Explains the limitations of hypothetical performance and the risks of trading-system claims. It does not validate an ICT strategy.' };
const execution = { title: 'SEC / Investor.gov: Stop, Stop-Limit, and Trailing Stop Orders', url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15', note: 'Stock order execution limitations. Futures and other products have their own rules, which must be checked separately.' };
const risk = { title: 'CME Group: Position and Risk Management', url: 'https://www.cmegroup.com/education/courses/things-to-know-before-trading-cme-futures/position-and-risk-management', note: 'Futures margin and risk-management background; not evidence for a chart-pattern edge.' };

/** Original educational essays, fictional situations and independent illustrations. */
export const studyArticles: Article[] = [
  {
    slug: 'how-to-study-ict-without-collecting-setups', title: 'Your chart has 37 labels. It needs a study plan.',
    seoTitle: 'How to Study ICT: A Practical Beginner Learning Plan | LearnSMC',
    description: 'A beginner-friendly ICT study routine: learn market mechanics, define one setup, replay without hindsight and keep an honest journal.',
    topic: 'Learning process', sketch: 'decision', visualSeries: 'expedition', date: '2026-10-17',
    intro: [
      'Meet Sam, a fictional new student. Sam has learned eleven acronyms, installed four chart layouts and found a video explaining why the previous ten videos were incomplete. The chart now resembles a railway map designed during a power cut. Sam is very busy. Whether Sam is learning is a separate investigation.',
      'ICT-style trading education offers a large vocabulary for discussing ranges, reference levels and changes in price. Vocabulary can help organize observations. It can also let a student describe almost any completed move without being able to make a decision before it happens. The difference is a study process that leaves a record.',
      'This is a practical learning plan, not a promise of trading income. The first objective is to become a reliable observer in replay or simulation. Money does not need to attend the introductory classes.'
    ],
    sections: [
      section('learn-the-market-first', '1. Learn what the candles are summarizing', [
        'Begin with the instrument rather than the acronym collection. A futures contract, a stock and an OTC currency quote are different products. Identify the venue or broker feed, the quote convention, the session, the tick size and the cash value of a price change. A beautiful chart label cannot repair an incorrect contract multiplier.',
        'Then study market and limit orders, the bid and ask, spreads and transaction costs. Candles summarize observations over a time interval. They do not identify every participant, reveal all resting orders or establish institutional motives. A historical wick is visible evidence of a price excursion on that feed; the story about who caused it requires additional evidence.',
        'Try a small exercise: explain a hypothetical one-point move without using any strategy terminology. Specify what the point is worth for the chosen product and how the spread affects a round trip. If that explanation is still fuzzy, adding a more advanced entry model is unlikely to make it clearer.'
      ], 'Understand the product before trying to interpret its footprints.', [3]),
      section('one-question-per-session', '2. Give a study session one job', [
        'Sam initially wants to study daily bias, opening ranges, five entry models and trade management before lunch. This is an ambitious curriculum for someone who has also misplaced the chart timezone. A useful session has one narrower question: can I identify a particular condition consistently before later candles are visible?',
        'Choose one instrument and one defined observation window. For example, study how a prior-session high is crossed and what follows under a written definition. State the session boundaries, the required crossing and the length of the observation period. Do not begin with an earnings target or a rule requiring a trade every day.',
        'Separate three tasks: recognizing the condition, describing a possible decision, and measuring the result. Early practice can focus entirely on recognition. A session that ends with a clearer definition and no hypothetical trade can be productive. Activity is easy to count; understanding needs a more thoughtful scoreboard.'
      ], 'One clear question beats an afternoon of collecting screenshots.'),
      section('write-the-definition', '3. Replace the label with a rule someone else could follow', [
        'Suppose the chosen concept is a bullish fair value gap. One common chart convention looks for a three-candle sequence in which the first candle’s high lies below the third candle’s low. Write those boundaries down. Add the timeframe, formation requirements and the earliest time the pattern becomes knowable. Other teaching conventions may add conditions; record the version you are studying.',
        'Words such as strong, clean and significant need operational meaning when used in a study. You might define displacement relative to the preceding bars, or require a close beyond a previously selected swing. These are research choices, not universal rules. Save the choice before examining which version produces the nicest historical results.',
        'Ask another reader to mark a few examples using only the definition. If your markings disagree, investigate the rule rather than treating your own intuition as the answer key. The point is not to abolish judgment. It is to notice where judgment is doing work that the written rule has not explained.'
      ], 'A setup name is the folder. The definition is what belongs inside.'),
      section('replay-without-the-ending', '4. Stop letting tomorrow help with today’s decision', [
        'Open replay before the proposed condition forms. Reveal bars in sequence. At each decision point, record only information already available. A three-candle pattern cannot be confirmed using a third candle that has not closed if the definition requires that close. A swing that needs later bars has a corresponding recognition delay.',
        'Keep a before image and an after image. The before record contains the level, the condition you are waiting for and what would cancel the idea. The after record contains what happened, including cases that never completed. If the record exists only after the outcome, hindsight has been appointed editor-in-chief.',
        'Do not discard awkward examples because the chart looks messy. Messiness is part of the question you are investigating. Include missed fills, incomplete sequences and conditions that appeared outside the selected window. Simulated fills are assumptions, so document how orders, spreads and costs are handled.'
      ], 'A fair replay gives the student the same information the historical decision had.', [1]),
      section('make-the-journal-useful', '5. Build a journal that can disagree with you', [
        'A useful observation log needs a date, instrument, timezone, rule version, condition, decision and result. Add a reason for skipping an example. These fields turn a memory of “I usually see this” into a record that can be inspected. Keep recognition errors separate from examples where the condition was present and the subsequent hypothesis failed.',
        'Review several comparable sessions together rather than rewriting everything after one dramatic day. If you change a definition, give it a new version and keep the old observations. Combining different definitions under the same name makes the sample look larger while making its meaning less clear.',
        'There is no magic number of examples that certifies readiness. More observations can reveal variability, but a large biased sample remains biased. Use later, previously unseen sessions to challenge the rule. A few months of careful records may teach you that an attractive idea is not useful. That is a finding, not wasted tuition.'
      ], 'The journal should preserve your mistakes, not quietly hire a publicist for them.', [1]),
      section('a-repeatable-week', '6. Finish with a routine you can actually repeat', [
        'For the next study week, choose one question, write its definition and collect a manageable set of sequential observations. Reserve a separate review session to inspect disagreements and failures. Keep a clean chart for price, a reference chart for broader context and a journal outside the chart. You do not need every annotation visible at once.',
        'Before considering live risk, learn the product’s order behavior, position-size increments and loss exposure. Practice operational tasks in simulation: entering and canceling an order, correcting a mistaken size and handling a disconnect. Simulation does not reproduce the emotional or execution conditions of real trading, but it can expose avoidable process mistakes.',
        'Sam eventually deletes nineteen drawings and learns to write one useful sentence: “This condition has not formed yet.” The chart looks less impressive in a group chat. It is considerably more useful at the desk. Keep that standard: a study plan should improve what you can explain and record, not merely how advanced the screen looks.'
      ], 'Progress is a clearer process. More labels are optional.', [1, 2])
    ],
    sources: [research, execution, risk],
    links: [{ title: 'Start with what actually moves price', href: '/learn/what-actually-moves-price/' }, { title: 'Practice sequential chart observation', href: '/tools/chartlab/' }, { title: 'Separate decisions from outcomes', href: '/articles/a-good-trade-can-lose/' }]
  },
  {
    slug: 'higher-timeframe-bias-to-lower-timeframe-execution', title: 'Your daily bias needs an exit door.',
    seoTitle: 'Higher-Timeframe Bias to Lower-Timeframe Execution | LearnSMC',
    description: 'Build a conditional higher-timeframe trading bias, distinguish it from an entry trigger, and define when to wait, revise or abandon the idea.',
    topic: 'Trading frameworks', sketch: 'decision', visualSeries: 'mission', date: '2026-10-17',
    intro: [
      'Inside our fictional trading control room, the captain announces a bullish daily bias. The intern prints BULLISH on every monitor. Then price falls. The captain calls it a retracement. Price falls again. The intern orders a larger printer. This is how an expectation becomes office furniture.',
      'A higher-timeframe bias is useful when it narrows the questions asked on lower timeframes. It becomes troublesome when it excuses every contradiction. The daily chart does not issue diplomatic immunity to a one-minute entry.',
      'Here is a way to connect context, a possible destination and an execution condition while leaving a working exit door in the analysis. All prices below are invented for explanation. Nothing in the example establishes that the framework is profitable.'
    ],
    sections: [
      section('context-is-not-an-order', '1. Give each timeframe a specific responsibility', [
        'Use a higher timeframe to describe location and broader structure. Use an intermediate timeframe to define the event being monitored. Use the execution timeframe to determine whether a written trigger exists. These are separate questions even though all three charts summarize the same underlying stream of prices.',
        'There is no universally correct ladder of daily, hourly and one-minute charts. Choose intervals that suit the instrument and the question. A student might pair a daily reference range with a fifteen-minute observation and a five-minute trigger. The precise combination is a study specification, not a mechanical recipe for better outcomes.',
        'Also distinguish a completed candle from a developing one. At 10:00, the current daily bar is not the daily close you will see afterward. If your bias depends on a daily close beyond a level, you cannot legitimately use that condition several hours before it occurs. Keep the control room’s clock visible.'
      ], 'Context describes the setting. A trigger must still occur in real time.'),
      section('choose-a-reference-range', '2. A range is a ruler with an address', [
        'Suppose a fixed historical window has a low of 100 and a high of 120. Its midpoint is 110. At 106, price is below that midpoint. ICT-style language may call this discount relative to that range. The phrase does not say the asset is fundamentally cheap or that the next move must be upward.',
        'Change the anchors to 90 and 110 and the same 106 is now above the midpoint. Both calculations can be correct because they answer different questions. Record the anchor dates, the instrument and the rule for selecting them. A twenty-session lookback is one possible convention, not proof that a market is controlled by a twenty-day schedule.',
        'Freeze the reference at a stated decision time or explain how it updates. Constantly moving the anchors until the preferred narrative fits makes the ruler remarkably agreeable. A useful reference can disagree with the analyst, which is why the analyst should not be allowed to resize it invisibly.'
      ], 'Premium and discount are relative coordinates, not automatic trading instructions.'),
      section('make-the-bias-conditional', '3. Write the bullish case and the evidence against it', [
        'In the invented example, price is 106 within the 100–120 range. The student is interested in a possible recovery toward an earlier high at 116, provided a selected support zone continues to meet a written condition. That is a conditional scenario. “Price owes us 116” is an invoice the market never signed.',
        'List what would weaken the scenario: an adverse close under a defined boundary, failure to recover within the observation period, or a conflicting event outside the model’s scope. Specify the timeframe and whether a wick or close matters. Otherwise the phrase “invalidated” can be renegotiated indefinitely.',
        'Maintain a neutral alternative as well as the opposite-direction story. If neither condition is satisfied, the answer can be “insufficient evidence.” Switching from confident long to confident short every few candles is not the only form of flexibility. Sometimes the most accurate control-panel light is the one labeled WAIT.'
      ], 'A bias becomes useful when you can describe what would change it.'),
      section('wait-for-the-local-condition', '4. Let the small chart earn its invitation', [
        'A possible higher-timeframe destination does not identify an entry. The lower-timeframe plan still needs an observable sequence. In an ICT-style study, that might involve a crossing of a chosen low, a subsequent displacement and a close beyond a previously defined swing, followed by a retracement into a measured zone.',
        'Define every part before applying it. If a model requires the sequence in that order, a chart containing all the ingredients in a different order does not qualify. Record when the trigger becomes knowable and where a hypothetical order could actually be submitted. The completed picture is not the same thing as an executable historical decision.',
        'A daily recovery can occur without the chosen lower-timeframe setup ever forming. Mark that outcome honestly: broader scenario occurred; no qualifying execution. Inventing a new entry afterward to capture a move teaches the journal to flatter the analyst and teaches the analyst very little.'
      ], 'Being right about a destination does not mean your entry model was present.', [1]),
      section('risk-is-an-independent-system', '5. Keep the risk console separate from the conviction console', [
        'Imagine a hypothetical entry at 108 with an assumed exit at 105. The planned distance is three price units before costs. Cash exposure also depends on the product’s multiplier and the position size. An analyst’s confidence in 116 does not enter that multiplication. Product specifications and valid size increments do.',
        'The boundary that changes the broader analysis may differ from the exit for a particular entry. Write both. A local execution can fail while the daily scenario remains plausible. This does not justify repeatedly entering with unbounded cumulative risk; the session-level rules need their own limit and stopping condition.',
        'An intended exit is not a guaranteed fill. Stock stop-market and stop-limit orders have different execution limitations, and other products can use other mechanisms. Check the applicable rules and include costs and stress assumptions. The control room should not have a button that silently converts conviction into larger exposure.'
      ], 'A plausible narrative cannot guarantee execution or make a loss budget optional.', [2, 3]),
      section('update-without-rewriting', '6. Review the flight log, not the captain’s memory', [
        'Keep the original scenario beside the eventual outcome. Record whether the reference stayed valid, whether the trigger appeared, whether the assumed order could fill, and whether costs changed the result. Separate a scenario failure from an execution-rule failure and a recordkeeping mistake.',
        'When revising the bias, timestamp the change and state the new evidence. Do not repaint the morning notes with the afternoon explanation. A revised view can be sensible, but a journal that retroactively held every correct view is documenting fiction. Treat that as a publishing category, not a performance statistic.',
        'A practical preparation card has five lines: reference range, conditional destination, required trigger, analytical invalidation and reasons to stand aside. Keep it short enough to use. The intern can retire the enormous bullish banner. The exit door should remain clearly marked and unlocked.'
      ], 'A flexible view changes with evidence and preserves the record of its earlier self.', [1])
    ],
    sources: [research, execution, risk],
    links: [{ title: 'Explore the top-down execution curriculum', href: '/learn/the-complete-ict-top-down-model-and-execution-blueprint/' }, { title: 'Study liquidity without the magnet metaphor', href: '/articles/liquidity-is-not-a-magnet/' }, { title: 'Practice without seeing future candles', href: '/tools/chartlab/' }]
  },
  {
    slug: 'pd-arrays-fvg-order-blocks-and-inversions', title: 'Welcome to the museum of price boxes. Please read the labels.',
    seoTitle: 'ICT PD Arrays: FVGs, Order Blocks, BPR & Inversions | LearnSMC',
    description: 'Understand ICT PD-array conventions, fair value gaps, order blocks, balanced price ranges and inversions with original diagrams and defined limits.',
    topic: 'Market mechanics', sketch: 'auction', visualSeries: 'museum', date: '2026-10-17',
    intro: [
      'The museum guide gestures toward a shaded rectangle. “An institutional footprint,” whispers a visitor. Another visitor sees an unfilled gap. A third asks whether the rectangle comes in dark mode. Nobody has yet checked which candles define its boundaries.',
      'ICT-style PD arrays are chart reference structures discussed in relation to premium and discount. The term organizes a family of observations, including gaps, candle-based zones and older highs or lows. It is a teaching vocabulary, not a standardized exchange classification.',
      'Our fictional museum contains original, simplified examples. Each exhibit gets three labels: how it is drawn, what it might help you study, and what the drawing cannot establish. The gift shop has been asked to stop selling certainty.'
    ],
    sections: [
      section('a-map-of-conventions', '1. Start with coordinates, not supernatural properties', [
        'A PD array is commonly expanded as a premium-and-discount array. In this vocabulary, an array is a reference level or zone interpreted within a selected range and scenario. The boundaries, the timeframe and the event that makes it relevant must be specified. A rectangle with no definition is simply a rectangle enjoying excellent marketing.',
        'For a range from 100 to 120, 110 is the midpoint. A zone at 104–106 is below it; a zone at 114–116 is above it. Change the range and those descriptions may change. A midpoint is a mathematical property of chosen anchors, not a valuation statement or evidence of a compulsory price destination.',
        'Some teachers use narrower definitions than others, especially for candle bodies, wicks and confirming closes. Select and document the convention for your study. When comparing examples, ask whether the same convention was applied. Identical names with different boundaries do not produce directly comparable observations.'
      ], 'Every useful box needs boundaries, a timeframe and a stated reason for being there.'),
      section('the-fair-value-gap', '2. The fair value gap did not erase every trade', [
        'One common bullish FVG convention uses three candles: the first candle’s high is below the third candle’s low, leaving a non-overlap interval between those outer candles. Suppose those values are 102 and 104. The plotted interval is 102–104, and its midpoint is 103. The middle candle may have traded through that entire interval.',
        'That last detail matters. The shape does not prove that no transactions occurred there, that orders were left unmatched, or that institutions must return. A candle-based FVG is different from a verified hole in the transaction record or a measurement of order-book depth. “Fair value” is part of the charting term, not a certified economic valuation.',
        'For a study, record the first return after formation, how a touch is defined, how long the observation remains active and what counts as failure. Some zones will be crossed; others will not be revisited during the selected period. The museum accepts both kinds of specimen, even though the souvenir postcards strongly prefer the photogenic ones.'
      ], 'An outer-candle non-overlap is an observable shape; its explanation is a separate hypothesis.'),
      section('candle-zones-and-breakers', '3. An order-block label is not a shareholder register', [
        'A simplified order-block convention marks an opposing candle or candle sequence associated with a later directional move. Additional rules may require displacement, a structure break or a particular location. Specify whether the zone uses the full candle range, its body, its opening price or another boundary. These variants can yield different markings.',
        'A breaker-style description adds a history of failure and subsequent use in the opposite directional context, often alongside a selected swing sequence. The order of events matters. You cannot confirm an event that depends on a later break while pretending it was already known at the initial candle.',
        'Neither label identifies the beneficial owners of the orders involved. It can be useful shorthand for price behavior without proving who accumulated a position or whether anyone remains trapped. If the explanation needs institutional inventory data, a candle picture is not a substitute. The museum’s detective hat is decorative.'
      ], 'Keep the observable sequence separate from claims about who traded it.'),
      section('overlap-and-inversion', '4. A failed exhibit does not need a rescue story', [
        'Take the hypothetical bullish FVG at 102–104. A study might define failure as a completed candle close below 102 on the selected timeframe. Some ICT-style descriptions then investigate the same interval as a possible bearish inversion zone. The failure is observed; future resistance is still a hypothesis, not a promised second act.',
        'A balanced price range is often described using an overlap of opposing FVG intervals. If one interval is 102–106 and the other is 104–108, their overlap is 104–106. This interval arithmetic is objective once the inputs are fixed. Its ability to predict a later reaction needs separate examination.',
        'Do not rename every failed long idea a successful short idea after the reversal. Preserve the first hypothesis, its failure and the conditions for any new one. A strategy that can relabel every outcome as confirmation has made itself difficult to disprove and therefore difficult to evaluate.'
      ], 'An inversion rule starts a new hypothesis; it does not delete the failed one.', [1]),
      section('confluence-without-double-counting', '5. Five labels may belong to one event', [
        'A single fast price leg can create a structure break, an FVG, a candle-based zone and a retracement measurement. Describing all four may clarify the geometry. Counting them as four independent pieces of evidence is a different claim. Shared inputs can make apparent confluence much less diverse than the chart legend suggests.',
        'Before adding another label, ask what new information it contributes. Does it specify timing, location, execution or a genuinely distinct dataset? Or is it another way of describing the same candles? More boxes also create more opportunities to select a successful touch after it happens.',
        'Maintain a clean view alongside the annotated one. If you cannot summarize why the chosen zone matters without reading a wall of abbreviations, reduce the task. A useful study might compare one defined zone with a simple baseline across comparable sessions, including cases where neither gives an attractive result.'
      ], 'A bigger legend is not automatically a stronger argument.'),
      section('a-specimen-card', '6. Give one array a proper specimen card', [
        'Choose one array and record its instrument, timeframe, formation time, exact boundaries, confirmation rule and expiry. Include the selected broader range, the condition for a first return and the definition of failure. The goal is to make the next observation comparable with the previous one.',
        'Before replay advances, write what would count as a relevant reaction and when you would stop observing. Include examples that fail or never return. If testing a hypothetical entry, add fill assumptions, costs and a loss exit; a zone-recognition study alone says nothing about realizable returns.',
        'At the end of the week, inspect the specimen cards before choosing the best chart. You may discover a useful descriptive habit, an ambiguous definition or no compelling result. All three are legitimate learning outcomes. The museum guide can keep the dramatic lighting. The labels should stay modest.'
      ], 'A precise description can be valuable without pretending to be a trading signal.', [1, 2])
    ],
    sources: [research, execution],
    links: [{ title: 'Study the curriculum chapter on FVGs', href: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/' }, { title: 'Read about inverse FVG conventions', href: '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/' }, { title: 'Explore the glossary', href: '/tools/glossary/' }]
  },
  {
    slug: 'opening-range-vs-opening-gap-new-york', title: 'The opening bell is not your doorbell. You do not have to answer.',
    seoTitle: 'Opening Range vs Opening Gap: New York Session Guide | LearnSMC',
    description: 'Separate an opening range from an opening gap, handle New York time correctly, calculate range extensions and avoid using future range information.',
    topic: 'Sessions & timing', sketch: 'auction', visualSeries: 'theatre', date: '2026-10-17',
    intro: [
      'The bell rings. Our fictional trader leaps toward the keyboard as if the exchange has delivered a parcel requiring an immediate signature. On the screen: a fast candle, several unfinished lines and a clock configured for the wrong season. Somewhere, a stage manager quietly begins to cry.',
      'Opening ranges can organize a study of early-session prices. Opening gaps compare two selected price observations. They are related ideas, but they are not interchangeable, and neither is an instruction to trade at the sound of a bell.',
      'Let us run the opening session as a small theatre production. The clock gets a script, the range waits until it actually exists, and the price projections are forbidden from introducing themselves as probabilities.'
    ],
    sections: [
      section('specify-the-clock', '1. Set the clock before interpreting the performance', [
        'The NYSE’s normal core equity session runs from 9:30 a.m. to 4:00 p.m. Eastern Time, with holiday and early-close exceptions. This is an exchange-session fact. A trader’s selected 9:30–10:00 study window is an analytical choice inside that session. Futures, OTC products and other venues have their own trading schedules.',
        'Use the named America/New_York timezone when matching observations to New York wall-clock time. Eastern Time changes between standard and daylight time. A fixed EST offset does not represent New York throughout the year. If you live elsewhere, check the date-specific conversion rather than keeping a permanent mental subtraction.',
        'Also record whether chart bars are labeled by their start or end, and what happens on holidays or missing-data intervals. A one-minute boundary error can select a different “first” candle. The stage manager does not need a theory of market intent; the stage manager needs the clocks to agree.'
      ], 'An exact-looking time label is useful only when its timezone and date are clear.', [1, 2]),
      section('range-versus-gap', '2. A range is a window. A gap is a comparison', [
        'For this fictional study, define the opening range as the highest and lowest prices observed from 9:30 inclusive to 10:00 exclusive on a specified feed. That is a thirty-minute window. Someone using the first five minutes or the first hour is studying a different object, even if the chart label looks similar.',
        'Define the opening gap separately. Compare a specified prior-session closing reference with the current opening reference. If those are 100 and 104, the signed difference is +4 and the interval between them is 100–104. Its midpoint is 102. That calculation does not require knowing the subsequent thirty-minute high or low.',
        'Be precise about closing reference. An equity closing auction, a final traded price and a futures settlement are not interchangeable labels. Do not borrow a timestamp from another product and assume it is a universal settlement convention. The two numbers need their product, session and source attached.'
      ], 'Write two definitions before drawing two boxes. They answer different questions.', [1]),
      section('do-not-borrow-the-future', '3. The completed range cannot arrive early', [
        'Suppose the first thirty minutes eventually have a high of 108 and a low of 100. At 9:42, those final boundaries may not yet be known. A rule that needs the completed thirty-minute range cannot honestly use its final high at 9:42. That is future information wearing a very respectable timestamp.',
        'You can study a developing range instead, but label it as developing and update it using only observations available at the time. Alternatively, wait until the defined interval ends and use the frozen range afterward. These are distinct research designs and can produce distinct results.',
        'The same rule applies to identifying the first qualifying FVG, a structure change or a closing confirmation. Write when each condition becomes knowable. A historical chart can make every annotation look simultaneous; an executable process has to respect the order in which the information appeared.'
      ], 'If the setup needs a completed window, the window must finish first.', [3]),
      section('range-arithmetic', '4. An extension is not automatically a statistical forecast', [
        'Using the completed hypothetical range from 100 to 108, width W is 8. Its midpoint is 104; quarter levels are 102 and 106. A half-width above the high is 108 + 0.5 × 8 = 112. One full width below the low is 100 − 8 = 92. These levels are straightforward arithmetic projections.',
        'Some charting discussions call range multiples “standard deviations.” A multiple of a selected high–low span is not, by itself, a statistical standard deviation calculated from a defined sample. It therefore does not supply a normal-distribution probability or justify claims such as “this level captures 95% of outcomes.”',
        'If the question is how often price reaches 112 before 100, define the population, the observation horizon, the rule, the costs where relevant and the evaluation procedure. Drawing 112 is easy. Establishing the conditional frequency is a separate project. The projection line has been asked to remove its borrowed lab coat.'
      ], 'A ruler can mark distances without knowing the odds of reaching them.'),
      section('separate-the-session-paths', '5. Let continuation, reversal and nothing happen', [
        'An opening move may continue, reverse or spend the observation period inside a range. Do not define success so loosely that every path qualifies afterward. If studying a break above 108, specify whether a wick counts, whether a completed close is required and what invalidates the proposed continuation.',
        'A reversal study needs its own definition, perhaps a return inside the range followed by a particular confirmation. Do not silently transform a failed continuation into a successful reversal. Record the first hypothesis as a failure, then record any separately defined new condition. The audience should be able to follow the script.',
        'Check scheduled events from their official calendars and identify conditions your study excludes. A calendar supplies timing, not direction. A release can change spreads, volatility and execution. There is no requirement to participate merely because the session has started or the chart has reached a named window.'
      ], 'The session can be active while your particular setup is absent.', [3, 4]),
      section('your-session-card', '6. Prepare a session card instead of a prophecy', [
        'A useful preparation card names the product and feed, date and timezone, opening-window boundaries, gap references, required confirmation, invalidation, expiry and reasons to stand aside. Keep the developing range visually distinct from the completed one. Save the card before looking at the rest of the session.',
        'For hypothetical orders, include the instrument’s increment rules, spread, fees and an execution model. A stop may fill away from its trigger price; a stop-limit order may not fill. A price touch on an aggregate bar does not establish that your entire desired quantity could transact at the plotted level.',
        'Review missed trades and no-trade sessions alongside completed examples. If a framework only looks convincing when the quiet days are removed, that matters. The bell can ring without you responding. Your job is to observe a defined condition, not to prove that you heard it.'
      ], 'Preparation creates a question you can evaluate. It cannot guarantee the answer.', [3, 4])
    ],
    sources: [{ title: 'NYSE: Holidays and Trading Hours', url: 'https://www.nyse.com/trade/hours-calendars', note: 'Normal core equity hours and calendar exceptions. The illustrative thirty-minute study window is our own convention.' }, { title: 'NIST: Daylight Saving Time Rules', url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst', note: 'Explains U.S. daylight-saving transitions; use date-aware conversions for New York time.' }, research, execution],
    links: [{ title: 'Study time and session liquidity', href: '/learn/time-and-session-liquidity-the-global-clock/' }, { title: 'Review the opening-range curriculum', href: '/learn/0930-am-opening-range-theory/' }, { title: 'Practice observing the session path', href: '/tools/chartlab/' }]
  },
  {
    slug: 'compare-ict-entry-models-without-hindsight', title: 'Five entry models enter a laboratory. Only the rules get a clipboard.',
    seoTitle: 'Compare ICT Entry Models: 2022, Unicorn, IFVG & OTE | LearnSMC',
    description: 'Compare ICT-style entry models with written rules, correct sequence, realistic fills and unseen examples instead of selecting a winner after the move.',
    topic: 'Trading frameworks', sketch: 'decision', visualSeries: 'laboratory', date: '2026-10-17',
    intro: [
      'The laboratory doors open. A Unicorn model arrives wearing a tiny horn. The inversion model immediately changes seats. OTE insists on standing exactly 70.5% of the way across the room. The technician asks whether anyone brought a written definition. There is an awkward silence.',
      'Named entry models can make a large trading vocabulary easier to organize. They can also encourage a habit of finding whichever pattern best explains a completed move. To compare models fairly, turn the names into decision rules and give every candidate the same information.',
      'This is a method for studying ICT-style models, not a ranking of which one makes money. The drawings are fictional, the examples are invented and the laboratory has no machine that converts an appealing name into an edge.'
    ],
    sections: [
      section('separate-the-components', '1. Put context, trigger and management in separate drawers', [
        'A complete study specification needs more than an entry shape. Separate the market and session, broader context, qualifying event, trigger, hypothetical order, invalidation, target and expiry. Decide whether a condition is required or merely descriptive. Otherwise the list of confluences tends to expand whenever a result needs explaining.',
        'For example, a higher-timeframe reference may filter which directions are considered, while an FVG defines a possible retracement zone. Neither specifies whether a limit order is assumed to fill or how a partial exit is handled. Keep those operational rules visible instead of hiding them inside the setup name.',
        'Freeze an initial version before examining the evaluation set. Write one example that qualifies and one that almost qualifies but fails a required condition. The near miss is useful: it shows whether the model has boundaries or just excellent manners around whatever happened next.'
      ], 'Compare complete rule sets rather than comparing logos.'),
      section('describe-the-families', '2. Give each model a working definition', [
        'A simplified 2022-style sequence studies a selected liquidity-reference crossing, displacement, a defined structure change and a subsequent FVG retracement. A Unicorn-style condition studies an overlap between a defined breaker zone and an FVG. The exact breaker boundaries and the ordering of events must still be written down.',
        'An IFVG-style condition starts with a valid FVG under the chosen convention, followed by a defined failure through its boundary and a possible retest in the other direction. A first-presented-FVG model needs a precise eligible window and formation sequence so that “first” cannot be chosen after seeing which gap worked.',
        'OTE-style descriptions usually study a retracement band within a selected swing, commonly around 62–79%. If an invented upward leg runs from 100 to 120, retracing 62–79% of its twenty-unit advance gives 107.6 down to 104.2. Those are measurements from stated anchors, not evidence that price is obliged to react there. These are working summaries, not universal definitions.'
      ], 'A shared label can conceal different rules. Document the version you mean.'),
      section('preserve-the-sequence', '3. A bag of ingredients is not a recipe', [
        'A chart can contain a reference-level crossing, an FVG and a structure break without presenting them in the order the model requires. If the FVG formed before the selected event but the rule requires one afterward, it does not qualify. Do not let the laboratory assistant rearrange timestamps to improve the presentation.',
        'List the recognition time of each component. A confirming close requires that bar to finish. A swing definition using future bars has a delay. A limit order placed only after confirmation cannot legitimately receive a fill from an earlier price touch. Replay should expose these timing constraints rather than smooth them away.',
        'Record a missed opportunity when the confirmation arrives too late or a retracement never occurs. Not filling is an outcome of some entry rules. A model that participates less often may look different from one that enters immediately; comparing only their completed trades hides this difference.'
      ], 'The rule has to work forward through time, not backward through a screenshot.', [1]),
      section('simulate-the-order-honestly', '4. A candle touch is not a receipt', [
        'In an invented long example, a proposed entry is 105, the assumed loss exit is 102 and the target is 111. Price-only planned risk is three units and planned reward is six, giving 2R before costs. That ratio describes distances under assumptions. It is not a win probability and does not guarantee that either order will execute as drawn.',
        'Include spreads, fees, quantity increments and a conservative fill convention. If both stop and target lie within the same historical bar, OHLC data alone may not reveal which occurred first. Use suitable finer data, mark the result ambiguous or apply a disclosed conservative rule. Do not automatically select the favorable ordering.',
        'Real orders have product-specific behavior. A stock stop-market order can execute away from its trigger, while a stop-limit order can remain unfilled. Futures mechanisms and broker settings can differ. Document the actual assumptions rather than borrowing the behavior of an instrument that happens to have a similar-looking chart.'
      ], 'A precise simulation needs an honest execution model.', [2, 3]),
      section('challenge-the-favorite', '5. Give the favorite model an unfamiliar exam', [
        'Separate the sessions used to develop rules from those used for a later check. When you alter the rule after looking at the check, that material has become part of development. Preserve the result and seek genuinely unseen observations rather than calling the same familiar examples a fresh test.',
        'Track net results, variability, drawdown, participation, missed fills and ambiguous cases, not only the win rate. Two models can produce different trade counts and different exposures. A small number of unusually large outcomes can dominate an average; inspect the distribution instead of letting one summary number conduct the whole meeting.',
        'Trying many combinations creates opportunities to find a historical winner by chance. Record the alternatives attempted, including rejected ones. A selected best result from extensive searching deserves a more demanding independent evaluation, not a more extravagant title on its social-media card.'
      ], 'The favorite should face the same rules and unfamiliar data as the other candidates.', [1]),
      section('choose-a-study-not-a-mascot', '6. Choose the next experiment, not the cutest mascot', [
        'Pick one model whose rules you can explain and whose operational requirements you can reproduce. Study its failure cases and no-entry cases. Complexity has a cost: more filters mean more ways to disagree about an example and more opportunities to tune a rule to its past.',
        'After reviewing the results, state what was learned, what remains uncertain and what would justify another study. “No convincing advantage under these assumptions” is a complete finding. Paper results also do not recreate live emotional pressure, liquidity or the full consequences of financial risk.',
        'The technician eventually gives the Unicorn a clipboard. It looks slightly offended but cooperates. Keep the humor and the memorable names; make the decisions answer to definitions, timing and records. A mascot can help you remember a model. It should not be allowed to grade its own exam.'
      ], 'A trading model earns attention through clear rules and evidence, not branding.', [1])
    ],
    sources: [research, execution, risk],
    links: [{ title: 'Explore the model masterclass tools', href: '/tools/masterclass/' }, { title: 'Inspect OTE measurements and sizing', href: '/tools/delivery-suite/ote-calculator/' }, { title: 'Review hypothetical outcome assumptions', href: '/tools/backtest/' }, { title: 'Build a beginner study process', href: '/articles/how-to-study-ict-without-collecting-setups/' }]
  }
];
