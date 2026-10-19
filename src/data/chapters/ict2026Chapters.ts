import { TextbookChapter } from "../../types";

export const ict2026Chapters: TextbookChapter[] = [
  {
    id: 47,
    slug: '2026-onboarding-from-vision-to-execution',
    title: 'The 2026 Onboarding Protocol & "From Vision to Execution"',
    part: 'Part XII - The 2026 ICT Smart Money Concepts Master Lectures & Tape Reading Series',
    level: 1,
    quote: 'Execution is not where profitability is born; execution is merely the closing gesture of a vision that was mathematically and narratively mapped before the order was ever conceived.',
    summary: [
      'The 2026 Roadmap for New Students: 6-12 months demo incubation, single-asset and single-session specialization.',
      'From Vision to Execution: The trinity rule—Time, Price, and Narrative must align before risking capital.',
      'Economic Calendar Triage: Filtering red-folder events, NFP weeks, and interest rate announcements.',
      'Trading Psychology & Risk Foundations: Eliminating over-trading and the illusion of intraday randomness.'
    ],
    keyTerms: [
      { term: 'From Vision to Execution', definition: 'The mental and mechanical framework where trade narrative and liquidity targets are fully projected prior to entering an order.' },
      { term: 'Single-Session Specialization', definition: 'Restricting trading execution strictly to one specific session window (e.g. 09:30 to 11:00 AM EST on NQ) to eliminate cognitive fatigue.' },
      { term: 'Red-Folder Triage', definition: 'Pre-market evaluation of high-impact macroeconomic releases (CPI, PPI, FOMC, NFP) to determine whether market delivery will be low or high resistance.' },
      { term: 'Paper Incubation Protocol', definition: "A structured period of simulated practice. No fixed duration or trade count certifies readiness for live risk." }
    ],
    practiceQuestions: [
      "What can demo practice teach, and which live financial and emotional risks does it fail to reproduce?",
      'What are the three components of the trinity rule in "From Vision to Execution"?',
      'How does economic calendar triage protect traders from algorithmic whipsaws and high resistance liquidity runs?'
    ],
    sections: [
      {
        id: '47.1',
        title: '47.1 The 2026 New Student Roadmap: Incubation, Specialization & Discipline',
        content: "A practical study routine can focus on one instrument and one session to reduce the number of changing variables. This is LearnSMC’s organizational suggestion, not a verified quotation or fixed mandate from a particular 2026 ICT lecture.\n\nUse a demo or replay environment while learning execution and record both rule adherence and outcomes after costs. A fixed number of months or twenty compliant trades cannot certify readiness for live risk. Simulation omits important financial and emotional pressures.\n\nKeep a readable chart, an actual event calendar and a written risk limit. Restricting screen time may help some learners manage attention, but trading all day does not mechanically guarantee a loss, and specialization does not guarantee success."
      },
      {
        id: '47.2',
        title: '47.2 "From Vision to Execution": The Trinity of Time, Price & Narrative',
        content: `The core philosophy driving the 2026 lectures is summarized in the master principle: "From Vision to Execution."

The Trinity Rule of Algorithmic Trading:
Never click a button unless all three pillars are in complete alignment:

1. Narrative (The Why):
- Where has price come from, and where does it need to go?
- Has price swept Higher Timeframe Sell-Side Liquidity into a Daily Discount PD Array?
- What is the current Draw on Liquidity (DOL)? If you cannot state the target liquidity pool in one sentence, you have NO trade.

2. Price (The Where):
- Price must trade into a valid, confirmed institutional PD Array (Fair Value Gap, Inversion FVG, Propulsion Block, or Breaker Block).
- Entry must never be chased in market orders; it must be patiently waited for at the boundary or 50% Consequent Encroachment / Mean Threshold.

3. Time (The When):
- Time is the master key. Even the most perfect technical chart pattern will fail if it occurs outside of algorithmic delivery windows.
- Setups must unfold inside defined Macro Windows (08:30, 09:50 - 10:10, 10:50 - 11:10, 11:50 - 12:10, 13:30 - 14:00, or 15:00 - 15:30 EST).`
      },
      {
        id: '47.3',
        title: '47.3 Macroeconomic Calendar Triage & The Weekly Profile Filter',
        content: `Before opening a chart each morning, the 2026 protocol begins with the Economic Calendar (Forex Factory / DailyFX):

1. Identifying High-Impact (Red Folder) Events:
- 08:30 AM EST releases: CPI (Consumer Price Index), PPI (Producer Price Index), Non-Farm Payroll (NFP), Core Retail Sales, and Weekly Jobless Claims.
- 10:00 AM EST releases: ISM Manufacturing/Services PMI, Consumer Sentiment, and New Home Sales.
- 14:00 PM EST releases: FOMC Statement, Fed Funds Rate Decision, and FOMC Press Conference (14:30 PM).

2. Classifying Market Delivery Types:
- Low-Impact / Clean Days: Days with 08:30 or 10:00 AM single news events that provide clean displacement into an HTF array, followed by a smooth Low Resistance Liquidity Run (LRLR).
- High-Resistance / Seek & Destroy Days: Days preceding major rate decisions or the Thursday before NFP. The algorithm intentionally engineers heavy consolidation and double-sided sweeps to trap retail orders.

3. The Weekly Narrative Map:
- Monday: Typically establishes the Accumulation or initial range; often an interior or consolidation day unless an 08:30 AM catalyst is present.
- Tuesday / Wednesday: Historically forms the Low of the Week (in bullish weeks) or High of the Week (in bearish weeks).
- Thursday: Continuation day or initial profit extraction; on NFP weeks, Thursday is notoriously high-resistance.
- Friday: Non-Farm Payroll catalyst (08:30 AM) or reversal / London close profit-taking into weekly settlement.`
      },
      {
        id: '47.4',
        title: '47.4 Risk Architecture & Psychological Mastery in Modern Markets',
        content: `In 2026, algorithmic speed and high-frequency order book matching punish emotional traders more ruthlessly than ever before. ICT lays out strict psychological and capital protection laws:

1. Maximum Daily Loss Limit:
- Never risk more than 1% of account equity on any single trade setup (0.5% recommended for beginner futures accounts).
- If two consecutive trades fail in a single morning session, TERMINATE the trading platform immediately for the rest of the day. Trading through two losses leads directly to tilt and catastrophic blowouts.

2. The Illusion of Control & Outcome Detachment:
- You cannot force the market to give you money. You can only position yourself where the algorithm has mathematical incentives to rebalance.
- Accept that a losing trade with perfect rule adherence is a successful trade; a winning trade taken out of impulsive FOMO is a poison that destroys long-term consistency.

3. Journaling Requirements for 2026:
- Screenshot 1: Higher Timeframe context (Daily / 1H) showing the Draw on Liquidity.
- Screenshot 2: Pre-market chart showing Asian/London ranges and NDOG/NWOG levels.
- Screenshot 3: Execution chart (1M / 5M) showing the displacement, FVG, entry candle, stop loss placement, and target.
- Notes: Emotional state before entry, during the trade, and at exit.`
      }
    ]
  },
  {
    id: 48,
    slug: 'nq-es-premarket-session-rules-morning-engine',
    title: 'NQ & ES Pre-Market Session Rules & The Morning Execution Engine',
    part: 'Part XII - The 2026 ICT Smart Money Concepts Master Lectures & Tape Reading Series',
    level: 2,
    quote: 'The 09:30 AM equities open is not a signal to trade; it is the bell that unleashes the Judas Swing. Only those who wait for the smoke to clear at 09:50 AM capture the true institutional expansion.',
    summary: [
      'Pre-Market Session Architecture: Mapping the 06:00 - 08:30 AM EST digestion phase and session ranges.',
      '08:30 AM News Delivery Mechanics: How CPI, PPI, and Jobless Claims reprice into existing HTF PD Arrays.',
      '09:30 AM Equities Open Dynamics: The Opening Judas Swing, initial balance discovery, and avoiding the 1-minute trap.',
      'The 09:50 - 10:10 AM Macro & 10:50 - 11:10 AM Morning Culmination Windows.'
    ],
    keyTerms: [
      { term: 'Pre-Market Range (PMR)', definition: 'The highest high and lowest low established between 06:00 AM and 08:30 AM EST in index futures.' },
      { term: '08:30 AM Macro Repricing', definition: 'The instantaneous algorithmic delivery that occurs on 08:30 AM economic releases, driving price into overnight or HTF PD Arrays.' },
      { term: '09:30 AM Judas Swing', definition: 'The initial deceptive thrust at the equities cash open designed to trigger retail breakout orders before reversing into the true morning trend.' },
      { term: '09:50 - 10:10 AM Macro', definition: 'The highest-probability morning algorithmic expansion window in NQ and ES futures, typically producing the clean morning impulse run.' }
    ],
    practiceQuestions: [
      'Why is taking an immediate market order at 09:30:00 AM considered a high-risk gamble?',
      'How does the 08:30 AM news release prepare the chart for the 09:50 AM macro entry?',
      'What specific structural evidence confirms that the 09:30 AM Judas Swing has completed its reversal?'
    ],
    sections: [
      {
        id: '48.1',
        title: '48.1 Pre-Market Session Architecture (06:00 - 08:30 AM EST)',
        content: "For a defined pre-market study, mark the high and low of 06:00 to 08:30 in America/New_York time and record the date, contract and data feed. This is a selected observation range, not the complete overnight session or a universal institutional boundary.\n\nCheck whether an economic release is actually scheduled and whether the exchange calendar has an exception. A narrow range does not guarantee expansion at 08:30 or 09:30. Expansion may arrive later, fail immediately, or not occur in the chosen window.\n\nRecord nearby higher-timeframe levels and alternative paths before the cash open. A previous directional move does not restrict the next session to only two possible outcomes. Do not infer executable fills or fixed stop distances from a completed chart."
      },
      {
        id: '48.2',
        title: '48.2 The 08:30 AM News Delivery Mechanics',
        content: `At 08:30 AM EST, major macroeconomic data reports hit the wires (CPI, PPI, Retail Sales, Unemployment Claims):

1. The Algorithmic Delivery:
- The algorithm does NOT read the news numbers or calculate economic spreadsheets. The news release is merely the time catalyst to rapidly reprice the asset to an existing PD Array.
- In the 08:30 to 08:35 AM window, price will frequently spike aggressively in one direction to sweep resting liquidity (e.g. Asian High or Pre-Market High) directly into an HTF Bearish Order Block.
- Watch how candle bodies close on the 5-minute chart: if price wicks beyond a level but closes back inside, the liquidity raid is complete.

2. The 08:30 - 09:15 AM Transition:
- If 08:30 news creates a large displacement leaving a wide Fair Value Gap, this FVG will frequently act as the magnet for the 09:30 equities cash open retracement.`
      },
      {
        id: '48.3',
        title: '48.3 The 09:30 AM Equities Open Dynamics & The Judas Swing Trap',
        content: `At 09:30 AM EST, the New York Stock Exchange (NYSE) and NASDAQ cash equities markets open for trading:

1. The Opening Bell Trap:
- Retail traders sit with their fingers on the buy/sell buttons, trying to scalp the opening 1-minute candle at 09:30:00. This is gambling.
- The 09:30 open is almost always accompanied by violent spread widening, algorithmic slippage, and a sharp deceptive move: The 09:30 Judas Swing.

2. Identifying the Judas Swing:
- If the true daily bias is BULLISH: The algorithm will frequently dump price between 09:30 and 09:40 AM, breaking overnight lows to trigger sell stops into a discount PD Array (or NDOG Consequent Encroachment).
- If the true daily bias is BEARISH: The algorithm will spike price upward between 09:30 and 09:40 AM, triggering buy stops into a premium PD Array.

3. The Confirmation Signal:
- Do not guess the reversal. Wait for the 1-minute or 5-minute Market Structure Shift (MSS) with displacement that cleanly breaks the opposing swing point and prints a fresh Fair Value Gap.`
      },
      {
        id: '48.4',
        title: '48.4 The 09:50 - 10:10 AM Macro & 10:50 - 11:10 AM Trend Culmination',
        content: `The 2026 lectures place immense focus on the algorithmic macro delivery windows that execute inside the morning session:

1. The 09:50 - 10:10 AM Macro:
- This is the premier execution window of the morning. By 09:50 AM, the 09:30 Judas Swing has concluded, the liquidity sweep is in the rearview mirror, and institutional algorithms begin the true sustained directional expansion.
- Look for price to retrace into a 1M or 5M Fair Value Gap (or an Inversion FVG) between 09:50 and 10:05 AM.
- Entry: Limit order at the FVG boundary or 50% Consequent Encroachment with stop tucked safely behind the Judas Swing low/high.
- Delivery: Price expands aggressively toward the primary Draw on Liquidity (e.g. Previous Day High or Equal Highs).

2. The 10:50 - 11:10 AM Macro:
- Between 10:50 and 11:10 AM EST, the morning trend typically reaches its climax.
- The algorithm delivers the final push into resting session liquidity or the Mean Threshold of an HTF PD Array.
- This is the signal to extract full profits or scale out 80% of position size before the market rolls into the midday lunch period.`
      }
    ]
  },
  {
    id: 49,
    slug: 'market-alchemy-trading-all-time-highs-ath',
    title: 'Market Alchemy — Trading All-Time Highs (ATH) & Blue Sky Delivery',
    part: 'Part XII - The 2026 ICT Smart Money Concepts Master Lectures & Tape Reading Series',
    level: 3,
    quote: 'When price enters All-Time Highs, retail traders panic because their resistance lines have vanished. For the algorithmic trader, this is pure Market Alchemy: price delivery is dictated entirely by mathematical dealing range expansions.',
    summary: [
      'The Algorithmic Dilemma at ATH: Operating when there is no historical resistance or prior PD Arrays.',
      'The Fibonacci Expansion Projection Framework: Deriving targets using 1.272, 1.618, 2.0, 2.618, and 3.142 extensions.',
      'Inversion Fair Value Gaps (IFVGs) & Propulsion Blocks as primary ATH launchpads.',
      'Volume Imbalance & Small Body Candle Exhaustion: Recognizing when the ATH algorithmic run is exhausted.'
    ],
    keyTerms: [
      { term: 'Market Alchemy', definition: 'The ICT methodology of mapping future algorithmic price targets in uncharted All-Time High territory using mathematical Fibonacci expansions and opening gap matrices.' },
      { term: 'Algorithmic Fibonacci Extensions', definition: 'Specific institutional multiplier ratios (1.272, 1.618, 2.0, 2.618, 3.142) anchored to the dealing range of the most recent HTF consolidation or reversal swing.' },
      { term: 'Blue Sky Delivery', definition: 'Unrestricted price expansion into new historical highs where buy-side liquidity is engineered dynamically by trailing stops and breakout algorithms.' },
      { term: 'ATH Inversion Launchpad', definition: 'A bearish FVG breached during the breakout to new ATHs that inverts into unbreakable institutional support on the first retest.' }
    ],
    practiceQuestions: [
      'How does an institutional trader determine where to take profit when an index is trading at All-Time Highs with no historical resistance?',
      'Why are Inversion Fair Value Gaps and Propulsion Blocks exceptionally powerful during ATH expansions?',
      'What candle body behavior signals that an algorithmic ATH expansion leg has reached exhaustion?'
    ],
    sections: [
      {
        id: '49.1',
        title: '49.1 The Algorithmic Dilemma at ATH: Operating in Uncharted Territory',
        content: `In multiple 2026 lectures (including "Market Alchemy - Trading ATH"), ICT tackles the dilemma traders face when major indices (such as NASDAQ 100 / NQ or S&P 500 / ES) trade at brand new All-Time Highs:

1. The Retail Dilemma:
- Retail technical analysis relies on previous support and resistance levels. When an asset trades above its highest historical price, retail traders have zero reference points.
- They repeatedly attempt to pick tops, guessing where the market "must" reverse, and get run over by continuous algorithmic short squeezes.

2. The Algorithmic Reality:
- IPDA does not need historical resistance to function. IPDA is an automated mathematical algorithm programmed to deliver price to precise mathematical multiples of previous dealing ranges.
- Furthermore, at ATH, institutional algorithms continually engineer new liquidity by offering price higher, forcing short sellers to buy back at market and enticing momentum breakout funds.`
      },
      {
        id: '49.2',
        title: '49.2 The Fibonacci Expansion Projection Framework',
        content: `To project institutional profit targets at All-Time Highs, ICT teaches the Dealing Range Fibonacci Anchor:

1. How to Anchor the Tool:
- Identify the most recent significant Higher Timeframe Dealing Range:
  - Anchor Point A (1.0 / 100%): The swing high of the consolidation or correction prior to the breakout.
  - Anchor Point B (0.0 / 0%): The absolute lowest low of that consolidation/correction (where SSL was swept).

2. The Institutional Expansion Multipliers:
- 1.272 Extension: The initial conservative algorithmic objective; common pause/consolidation zone.
- 1.618 Extension (The Golden Ratio): The primary target for high-probability morning expansions; algorithmic order books clear heavy profit-taking here.
- 2.000 Extension: Measured move completion; complete duplication of the dealing range.
- 2.618 & 3.142 Extensions: Parabolic runaway targets during multi-month macro quarterly shifts.

3. Execution Rule:
- When price breaks into new ATHs, place your limit profit-taking orders 2 to 5 ticks front-running the 1.618 or 2.0 extension levels.`
      },
      {
        id: '49.3',
        title: '49.3 Inversion Fair Value Gaps (IFVGs) & Propulsion Blocks as ATH Launchpads',
        content: `When price is printing new ATH candles, traditional Order Blocks are scarce. Instead, institutional algorithms rely on two specific continuation structures:

1. The ATH Inversion Fair Value Gap (IFVG):
- During intraday pullbacks at ATH, price will occasionally print a small bearish 1-minute or 5-minute Fair Value Gap.
- If the trend is genuinely algorithmic, the very next displacement candle will slice cleanly upward through that bearish FVG, closing with full bodies above it.
- This invalidates the bearish FVG and converts it into an Inversion FVG. The first dip back into this zone is an ultra-high-probability long entry with minimal drawdown.

2. The ATH Propulsion Block:
- Price retraces into an underlying bullish order block and prints a reaction candle.
- The body of that reaction candle is the Propulsion Block.
- At ATH, price will not violate the 50% Mean Threshold of this Propulsion Block. The next candle tests the top of the body and explodes upward into fresh highs.`
      },
      {
        id: '49.4',
        title: '49.4 Volume Imbalance & Small Body Candle Exhaustion Signposts',
        content: `How do you know when an ATH expansion is concluding? ICT highlights two specific exhaustion signposts:

1. Volume Imbalances at Swing Highs:
- A Volume Imbalance occurs where candle bodies do not overlap, but their wicks do overlap.
- If price pushes to a new ATH with a volume imbalance and the subsequent candle fails to displace higher, the algorithm has paused buy-side liquidity delivery.

2. Small Body Exhaustions (Indecision at Extensions):
- When price tags a major Fibonacci extension (e.g. 1.618 or 2.0), observe the candle bodies:
- If large energetic green candles suddenly shrink into tiny spinning tops, dojis, or candles with long upper wicks, smart money is actively offloading inventory into retail breakout orders.
- A 1-minute or 5-minute candle closing below the low of the previous up-candle signals the initiation of an intraday retracement back into discount.`
      }
    ]
  },
  {
    id: 50,
    slug: 'opening-gap-matrices-ndog-nwog-csod',
    title: 'Opening Gap Matrices (NDOG, NWOG, NSOG) & Changing State of Delivery (CSoD)',
    part: 'Part XII - The 2026 ICT Smart Money Concepts Master Lectures & Tape Reading Series',
    level: 2,
    quote: "An opening gap supplies observable price references. A later reaction does not prove institutional memory or a required return.",
    summary: ["Define the prints, feed and session used for an opening-gap comparison.","Separate trading-break close from official settlement.","Record returns, partial traversals and no-return examples.","Preserve the selected candle-opening reference for delivery interpretation."],
    keyTerms: [{"term":"Selected opening gap","definition":"The difference between explicitly selected pre-break and reopening prices on the same product and feed."},{"term":"Consequent Encroachment (CE)","definition":"The arithmetic midpoint of the chosen gap boundaries, not a guaranteed reaction price."},{"term":"Changing State of Delivery (CSoD)","definition":"A framework interpretation using selected candle opening references; distinguish its crossing rule from a swing break."}],
    practiceQuestions: ["Which two prints define the selected gap?","Is the reference a last trade or an official settlement?","What happens if price never revisits the gap?"],
    sections: [
      {
        id: '50.1',
        title: '50.1 New Day Opening Gap (NDOG) Calculation & Consequent Encroachment',
        content: "For an opening-gap study, identify the last traded price before a defined trading break and the first price after the reopening on the same contract and feed. Confirm the applicable product calendar instead of assuming every market uses identical hours.\n\nCalculate the selected gap’s lower boundary, upper boundary and midpoint. A trading-break close is not automatically the official settlement price. The observed boundaries do not establish that an algorithm remembers them or must launch price from their midpoint."
      },
      {
        id: '50.2',
        title: '50.2 New Week Opening Gap (NWOG) Long-Term Institutional Magnetism',
        content: "Episode 34 extends a Sunday opening-gap reference through the week and notes that some weeks move away without returning. It is a reference for that chart study, not proof of a permanent institutional memory or a mandatory Tuesday or Wednesday revisit.\n\nRecord the exact preceding close and reopening prints, contract, feed and session calendar. Keep the upper boundary, lower boundary and arithmetic midpoint distinct. A return, partial traversal, full traversal and no return are separate outcomes to record.\n\nDo not use the trading-break close as a synonym for the official settlement price without checking the product’s settlement procedure. The 2022 example does not authenticate every NDOG, NSOG or later-year naming claim."
      },
      {
        id: '50.3',
        title: '50.3 New Session Opening Gap (NSOG) Mechanics at 09:30 AM',
        content: "A session-opening comparison requires an explicit definition: which product, which preceding print and which new opening print? A futures chart around the cash-equity open and a gap between two equity sessions are different observations.\n\nDo not assume that 09:30 creates an untraded order-book void or that a gap must rebalance before 09:45. Keep no-return examples alongside returns and distinguish a chart reference from a verified mechanism."
      },
      {
        id: '50.4',
        title: '50.4 Changing State of Delivery (CSoD) & Change of Character (CHoCH)',
        content: "Episodes 3 and 18 discuss a change in delivery using selected candles and their opening references. Preserve the actual candle or run used by the example. A crossing of that opening reference and a later break of a swing high or low are different events.\n\nIf your research requires a body close rather than an intrabar crossing, state that additional condition. CSoD, CHoCH and MSS should not be silently substituted for one another, and the 2022 source review does not authenticate a universal later-year terminology hierarchy."
      }
    ]
  },
  {
    id: 51,
    slug: 'midday-afternoon-tape-reading-macros-final-hour',
    title: 'Midday & Afternoon Tape Reading: Lunch Macro, Afternoon Macros & The Final Hour ES',
    part: 'Part XII - The 2026 ICT Smart Money Concepts Master Lectures & Tape Reading Series',
    level: 3,
    quote: "Morning and afternoon examples are separate opportunities to study. Missing one does not create an obligation to take another.",
    summary: ["Product-specific morning, midday and afternoon observations.","Order expiry and position management as predefined decisions.","Multiple setups versus total exposure and optional participation.","Final-hour scenarios without a guaranteed closing direction."],
    keyTerms: [{"term":"Afternoon observation window","definition":"A stated local-time interval for studying a particular product; the clock does not guarantee a setup."},{"term":"Aggregate exposure","definition":"The combined risk of open positions, including positions that depend on related markets."}],
    practiceQuestions: ["What is your observation window, and which product calendar applies?","When does an unfilled order expire?","What would invalidate the afternoon scenario before entry?"],
    sections: [
      {
        id: '51.1',
        title: '51.1 Navigating the Retail Graveyard of New York Lunch (12:00 - 13:00 EST)',
        content: "Episodes 5 and 16 separate the New York morning and afternoon using a midday observation period. This is a teaching framework, not proof that all institutional desks leave or that every lunch-hour breakout is false.\n\nKeep the product and date-aware local clock visible. Record the morning range, whether the chosen objective was reached and whether another session is part of your written study plan. A missed morning move or a morning loss is not an entry condition."
      },
      {
        id: '51.2',
        title: "51.2 Midday Observation and Order Expiry",
        content: "If a research variant uses 11:50–12:10 as an observation or exit window, state that choice before replay. The supplied 2022 recordings do not establish that a specific twenty-minute program must run or that every trader must close at 12:10.\n\nDecide when an unfilled order expires and whether an existing position can continue under its original plan. Entering, taking a partial and moving a stop are different decisions; none should be credited retroactively because the next candles looked convenient."
      },
      {
        id: '51.3',
        title: '51.3 The 13:30 - 14:00 PM Post-Lunch Acceleration Macro',
        content: "Episode 5 discusses an afternoon focus around 13:30 New York local time, while Episode 9 illustrates an afternoon retracement setup. Use the already visible swing references and actual displacement in the chosen example. The clock alone does not establish a new trend.\n\nEpisode 16 shows multiple possible setups but does not require a student to take every one. Adding positions changes aggregate exposure even if individual entries look attractive. Record the combined risk and retain cases with no return or no qualifying pattern."
      },
      {
        id: '51.4',
        title: "51.4 Final-Hour Scenarios Without Predicting the Close",
        content: "Episode 32 discusses a consolidation day and a late move around the cash close. Episode 37 shows how to record the time from a reference touch to later delivery. These are case studies, not proof that the final hour must extend the daily candle or reverse it.\n\nWrite the competing scenarios before the final hour begins. Separate the cash-market close, the futures trading break and the product’s settlement procedure. Do not infer a participant’s desired candle shape from a completed chart or assume a fixed number of points is available every afternoon."
      }
    ]
  },
  {
    id: 52,
    slug: 'event-volatility-hrlr-futures-vs-cfds',
    title: 'Event Volatility, High Resistance Runs (NFP Thursdays & FOMC) & Futures vs. CFDs',
    part: 'Part XII - The 2026 ICT Smart Money Concepts Master Lectures & Tape Reading Series',
    level: 3,
    quote: "An event calendar tells you when a release is scheduled. It cannot promise the direction, size or safety of the market reaction.",
    summary: ["Actual release calendars rather than fixed weekday assumptions.","FOMC examples and their explicit risk limitations.","Futures versus broker-specific CFD contract values.","Points, ticks and product-specific execution assumptions."],
    keyTerms: [{"term":"High Resistance Liquidity Run (HRLR)","definition":"A framework description of overlapping or obstructed price delivery; it is not direct evidence of withheld institutional orders."},{"term":"Release calendar","definition":"The official schedule for the particular announcement, checked by date and local timezone."},{"term":"Micro Contract Precision (MNQ/MES)","definition":"MNQ is $2 per index point and $0.50 per 0.25-point tick. Distinguish points from ticks and verify the product specification before sizing."}],
    practiceQuestions: ["Which official calendar confirms the actual release time?","How does a point differ from a tick for the chosen contract?","What risks remain after a scheduled announcement has passed?"],
    sections: [
      {
        id: '52.1',
        title: '52.1 High Resistance Liquidity Runs (HRLR) on NFP Thursdays',
        content: "Use the Bureau of Labor Statistics Employment Situation schedule for the actual release date and time. Do not assume an unchanging first-Friday rule or a fixed EST offset. The day before a release is not mechanically required to consolidate.\n\nA high-resistance-run label describes a chosen interpretation of overlapping or difficult price delivery; it does not reveal that institutions withheld capital. There is no verified universally safe 75% size reduction or fixed 10–15-point target here. Observe, define the study conditions, or stand aside."
      },
      {
        id: '52.2',
        title: '52.2 "Seek and Destroy" Market Maker Profiles during Jackson Hole & FOMC',
        content: "Central-bank announcements and speeches can produce rapid changes, two-sided moves or a limited response. Episode 23’s FOMC case study explicitly warns beginners against treating the example as an invitation to trade the event.\n\nConfirm the actual Federal Reserve meeting and release calendar. A decision statement and a press conference are separate events. Waiting until the next day does not guarantee a smooth trend or remove execution risk. Record what happened rather than assigning every event the same three-phase path."
      },
      {
        id: '52.3',
        title: '52.3 Futures (NQ / MNQ, ES / MES) vs. CFDs (US100, US500) Execution Realities',
        content: "Point and tick values are different. CME’s MNQ contract is $2 per index point; a 0.25-point tick is $0.50 per contract. NQ is $20 per point, ES is $50 per point and MES is $5 per point. Verify the specification for the actual product before sizing.\n\nFutures contract specifications and broker-specific CFD specifications are not interchangeable. Check the quote source, size increment, spread, fees, financing and order-execution terms. Displayed exchange depth is not the entirety of available liquidity.\n\nThis comparison is independent LearnSMC reference material. The reviewed 2022 recordings do not verify the earlier claim that a named 2026 lecture recommended particular brokers or account providers."
      },
      {
        id: '52.4',
        title: "52.4 A Calendar-Aware Research Routine",
        content: "Confirm the current official calendar and product specifications. Write your observation window, references, entry variant, risk budget and order expiry before looking at later candles. A scheduled event and a chart pattern are separate observations.\n\nRetain days with no setup and record spreads, commissions, slippage and any unfilled orders. If the smallest contract does not fit the budget, do not force the calculation. Keep simulated examples separate from actual trading records.\n\nThis is an original LearnSMC research routine informed by the linked sources. It is not a verified synthesis of an entire 2026 lecture series or an instruction to trade every listed session."
      },
{
  "id": "52.5-source-reading",
  "title": "52.5 News Examples Are Not Invitations to Trade",
  "content": "Episode 23 explicitly warns that its FOMC case study is not an invitation to trade FOMC or NFP. Episode 30 examines a Fed-chair event, and Episode 40 uses the economic calendar when choosing which Forex pair to study. The volatility and price path differ between events.\n\nCheck the current official release schedule rather than treating an old video’s clock time as today’s calendar. A release can produce wider spreads, slippage or no useful setup. Waiting for a predefined observation period is a research choice, not a guarantee that the subsequent market is safe."
}
    ]
  }
];
