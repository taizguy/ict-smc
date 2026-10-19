import { TextbookChapter } from "../../types";

export const charterModelsChapters: TextbookChapter[] = [
  {
    id: 28,
    slug: 'ict-charter-model-1-intraday-scalping',
    title: 'ICT Charter Model 1: Intraday Scalping & The 20-Day IPDA Data Range',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    "quote": "Study the model’s prior references and its own trade plan. A scalping label does not require trading every day.",
    "summary": [
  "Model 1 foundations, an amplified explanation and a separate trade plan serve different purposes.",
  "A 20-day lookback supplies candidate prior references, not proof of hidden orders.",
  "Multiple orders share the total setup risk budget rather than multiply it."
],
    "keyTerms": [
  {
    "term": "20-Day IPDA Range",
    "definition": "A source lookback convention for selecting prior references. It is an analytical framework, not independently established access to a central market algorithm."
  },
  {
    "term": "Total setup risk",
    "definition": "The combined planned loss across all orders expressing the same idea, before allowing for execution costs and slippage."
  }
],
    "practiceQuestions": [
  "Which prior reference was selected before the later move was visible?",
  "How is the total risk budget divided if the idea uses three orders?",
  "Which conditions would leave you with no qualifying setup this week?"
],
    sections: [
      {
        id: '28.1',
        title: '28.1 Model 1 Trade Plan & Strategic Objective',
        content: "The original Model 1 lecture presents intraday scalping using prior-day references within a defined lookback. The separate trade-plan introduction describes a 15–20-pip teaching objective and assumes prior study of the underlying lessons. Keep its currency example separate from an index-futures variation; pips do not convert into one fixed number of ES or NQ points.\n\nThe amplified discussion explicitly distinguishes looking for one particular setup from scalping every day. A weekly opportunity is not guaranteed, and neither an objective nor a model label establishes a live fill or return.\n\nAround 26 minutes in the trade-plan lecture, multiple orders divide a single idea’s total risk allowance. In a hypothetical three-order example with a total planned loss budget of 90 units, allocating 30 units to each order preserves that budget before costs. Risking 90 on each instead triples it. Use actual pip or tick value, correlated exposure and execution costs when researching a variation."
      },
      {
        id: '28.2',
        title: '28.2 The 20-Day IPDA Data Range Framework',
        content: `Before placing an order under Model 1, the trader must establish the 20-Day Interbank Price Delivery Algorithm (IPDA) data range.

Steps to Map the 20-Day IPDA Matrix:
1. Count back exactly 20 daily candles from the current trading day.
2. Mark the absolute highest high and lowest low within that 20-day window.
3. Calculate the 50% Equilibrium level of this 20-day dealing range.

Algorithmic Interpretation:
- If current market price is trading above the 50% Equilibrium line, the asset is in an IPDA Premium. The algorithm will prioritize looking for sell-side liquidity pools (SSL) or discount Fair Value Gaps.
- If current market price is trading below the 50% Equilibrium line, the asset is in an IPDA Discount. The algorithm will prioritize looking for buy-side liquidity pools (BSL) or premium Fair Value Gaps.

This directional compass prevents traders from buying into premium liquidity or selling into discount exhaustion.`
      },
      {
        id: '28.3',
        title: '28.3 Amplified Lecture: OTE Execution & Stop Discipline',
        content: `In the Amplified Lecture for Model 1, Michael Huddleston details the exact execution trigger:

1. The Liquidity Raid:
Price must trade through the Previous Day High or Low during the active session. This raid triggers retail stop orders and traps breakout traders.

2. Market Structure Shift with Displacement:
Wait for an aggressive candle body close on the 5-minute or 1-minute chart that violates an opposing swing point, leaving behind an open Fair Value Gap.

3. The Optimal Trade Entry (OTE):
Anchor the Fibonacci tool from the raid swing low/high to the displacement high/low.
- 62% Retracement: First entry scale.
- 70.5% Sweet Spot: Core institutional limit order level.
- 79% Extreme Retracement: Final acceptable boundary for entry.

4. Stop Loss Rules:
The stop loss is anchored 1 to 2 ticks beyond the extreme raid high or low. Never move the stop loss to breakeven until the first partial profit target (minimum 10 to 15 pips) has been physically booked.`
      },
      {
        id: '28.4',
        title: '28.4 Profit Target Metrics & Rebalancing Outcomes',
        content: `Model 1 adheres to fixed target objectives to enforce mathematical expectancy:

- Objective 1 (First Scale): 10 to 15 pips or the 50% Consequent Encroachment of the intraday range. Take off 50% of position size and move stop loss to entry.
- Objective 2 (Full Target): 20 to 30 pips expansion beyond the initial raid point, targeting opposing session liquidity (such as the Asian High/Low or opposing Fair Value Gap).
- Daily Discipline: Once a single Model 1 scalp achieves its target, trading for that session is concluded. Overtrading after a winning Model 1 execution degrades psychological clarity and invites algorithmic churn.`
      }
    ]
  },
  {
    id: 29,
    slug: 'ict-charter-model-2-weekly-range-expansion',
    title: 'ICT Charter Model 2: Short-Term Weekly Range Expansion & Reversal Profiles',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 2 captures the true heartbeat of the weekly candle. When you understand the Tuesday high or low of the week formation, you hold until Thursday with complete algorithmic peace.',
    summary: [
      'The mechanics of capturing 50 to 100+ pips through weekly range expansions.',
      'The significance of the weekly open and the Tuesday 04:00 AM London / 06:00 AM European open extremes.',
      'The Advanced Reversal Market Profile when Higher Timeframe PD arrays are tagged.',
      'Amplified Lecture principles: Aligning the daily delivery cycle with Thursday New York liquidation objectives.'
    ],
    keyTerms: [
      { term: 'Weekly Range Expansion', definition: 'The multi-day impulsive delivery of the 5-day weekly candle from its opening extreme to its closing objective.' },
      { term: 'Tuesday High/Low of the Week', definition: 'The statistical tendency for trending weeks to establish their absolute high or low during Tuesday London or early NY session.' },
      { term: 'Reversal Market Profile', definition: 'An intra-week reversal pattern initiated when price taps a major higher timeframe Premium or Discount PD Array.' }
    ],
    practiceQuestions: [
      'Why does Tuesday print the High or Low of the Week in approximately 70% of trending market conditions?',
      'How does the Tuesday 04:00 AM London open differ in function from the 06:00 AM European open in Model 2?',
      'What is the minimum holding horizon for a Model 2 position, and why is Thursday New York session critical?'
    ],
    sections: [
      {
        id: '29.1',
        title: '29.1 Model 2 Trade Plan & Weekly Horizon',
        content: `ICT Charter Price Action Model 2 is engineered for short-term swing traders who desire substantial multi-day expansions without being glued to 1-minute tick charts all day.

Core Operational Parameters:
- Target Expectancy: 50 to 100+ pips (or 100 to 250 index points).
- Holding Period: Multi-day holding, typically initiated on Tuesday and closed on Thursday or Friday morning.
- Higher Timeframe Anchor: Daily and 4-Hour charts defining the primary Draw on Liquidity.
- Execution Timeframe: 1-Hour and 15-Minute charts for entry refinement.`
      },
      {
        id: '29.2',
        title: '29.2 The Tuesday High or Low of the Week Formation',
        content: `The cornerstone of Model 2 is the institutional rhythm of the five-day trading week:

- Monday: The Accumulation / Range Definition Day. Monday price action often establishes a reference range without delivering true directional expansion.
- Tuesday (The Delivery Pivot):
  - In a bullish week: Algorithms will manipulate price downward below the Monday low or Sunday opening print during the Tuesday London session (between 02:00 AM and 05:00 AM NY time).
  - This downmove purges retail sell stops and fills institutional buy orders at a deep discount.
  - The absolute Low of the Week is established.
  - Price then begins its sustained expansion upward across Wednesday and Thursday.`
      },
      {
        id: '29.3',
        title: '29.3 Advanced Reversal Market Profile at 06:00 European Open',
        content: `When Higher Timeframe analysis indicates an impending major reversal, Model 2 shifts from simple trend continuation into the Advanced Reversal Market Profile:

1. Price rallies or drops into an opposing HTF PD Array (Daily Fair Value Gap, Weekly Bearish Breaker, or Old High/Low).
2. Look at the 06:00 AM London / European Open window.
3. If price rejects the HTF array and forms an hourly Market Structure Shift with an energetic displacement candle, enter on the subsequent retracement into the newly formed Fair Value Gap.
4. This entry captures the turning point of the entire week, yielding exceptional risk-to-reward ratios exceeding 1:4.`
      },
      {
        id: '29.4',
        title: '29.4 Amplified Lecture: Thursday Liquidation & Target Matrix',
        content: `In the Amplified Lecture for Model 2, ICT emphasizes the trade management lifecycle:

- Wednesday is typically the fastest expansion day of the week, running through internal liquidity with conviction.
- The Primary Target must be reached by Thursday's New York session open (08:30 AM to 10:00 AM NY).
- Why Thursday? Institutional trading desks begin balancing books, squaring delta positions, and mitigating exposure ahead of the weekend.
- Friday frequently features consolidation or minor retracement. Therefore, holding past Thursday afternoon without securing 80% or more of position profits exposes the trader to algorithmic profit decay.`
      }
    ]
  },
  {
    id: 30,
    slug: 'ict-charter-model-3-swing-trading-cot',
    title: 'ICT Charter Model 3: Swing Trading & Commercial COT Hedging Programs',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 3 aligns individual retail accounts with multi-billion dollar commercial hedging programs. When the commercial smart money takes a stand, monthly ranges expand for hundreds of pips.',
    summary: [
      'The multi-week swing trading architecture delivering 100 to 300+ pips per setup.',
      'How to analyze the CFTC Commitment of Traders (COT) report for commercial net position extremes.',
      'Combining 40-day and 60-day IPDA data ranges with monthly order flow direction.',
      'Amplified Lecture: 4-Hour and Daily Order Block entry execution with structural invalidation stops.'
    ],
    keyTerms: [
      { term: 'Commercial Hedging Program', definition: 'The non-speculative buying and selling activities of multinational corporations and central institutions reported on the CFTC COT report.' },
      { term: 'Model 3 Swing Framework', definition: 'The ICT Charter swing model targeting 100 to 300+ pips with an execution frequency of 1 to 2 setups per month.' },
      { term: '40/60-Day IPDA Cycle', definition: 'The medium-term algorithmic cycle used to gauge institutional inventory re-accumulation and quarterly trend legs.' }
    ],
    practiceQuestions: [
      'Why are Commercial traders on the COT report considered the true smart money rather than Large Speculators?',
      'What timeframes are required to identify and execute an ICT Charter Model 3 swing trade?',
      'How does trailing the stop loss behind intermediate term swing points protect capital during multi-week swings?'
    ],
    sections: [
      {
        id: '30.1',
        title: '30.1 Model 3 Trade Plan & Strategic Horizon',
        content: `ICT Charter Price Action Model 3 represents the highest echelon of calm, low-frequency swing trading.

Strategic Specifications:
- Target Expectancy: 100 to 300+ pips per trade.
- Frequency: 1 to 2 setups per month per instrument.
- Primary Charts: Monthly, Weekly, and Daily charts for directional bias; 4-Hour chart for entry trigger.
- Trading Psychology: Low screen time, immunity to intraday noise, and strict patience for institutional alignment.`
      },
      {
        id: '30.2',
        title: '30.2 The CFTC Commitment of Traders (COT) Engine',
        content: `Model 3 incorporates the weekly CFTC Commitment of Traders data:

1. Identify Commercial Net Position:
Commercial entities (producers, merchants, and sovereign hedging banks) trade against prevailing speculative trends because they use the futures market to hedge physical inventory.

2. Look for Commercial Net Position Extremes:
When Commercials flip from net short to historic net long, or hit 12-month or multi-year buying extremes, it signals that smart money has absorbed speculative selling.

3. Corroborate with 40-Day and 60-Day IPDA Ranges:
If the market has been pushed down into a 60-day IPDA Discount array while Commercials are aggressively net long, a massive multi-week rally is imminent.`
      },
      {
        id: '30.3',
        title: '30.3 Amplified Lecture: 4-Hour Entry Refinement',
        content: `In the Model 3 Amplified Lecture, execution precision is brought to the 4-Hour chart:

1. Wait for the Daily Market Structure Shift:
Do not buy simply because Commercials are net long. Wait until daily price action delivers an energetic displacement candle closing above an established swing high.

2. Identify the 4-Hour Nested Order Block or FVG:
Drop to the 4-Hour chart. Identify the last down-close candle prior to the displacement leg (Bullish Order Block) or the 4-Hour Fair Value Gap resting within the discount half of the daily dealing range.

3. Limit Order Placement:
Place a limit buy order at the Open or 50% Mean Threshold of the 4-Hour Order Block.

4. Wide Invalidation Stop:
Place the stop loss safely below the swing low created during the displacement origin. This ensures intermediate volatility will not prematurely shake out the position.`
      },
      {
        id: '30.4',
        title: '30.4 Position Management & Trailing Architecture',
        content: `Because Model 3 trades unfold over several weeks, trade management differs from intraday scalps:

- Scale 1 (100 Pips): When price expands 100 pips into the first weekly liquidity pool, book 30% to 40% of the trade and move stop loss to breakeven.
- Scale 2 (200 Pips): Book an additional 30% at the monthly Equilibrium line or major opposing Daily FVG.
- Runner (300+ Pips): Trail the stop loss behind newly printed 4-Hour intermediate swing lows as the weekly trend accelerates toward the ultimate Draw on Liquidity.`
      }
    ]
  },
  {
    id: 31,
    slug: 'ict-charter-model-4-position-trading',
    title: 'ICT Charter Model 4: Position Trading, Quarterly Shifts & Seasonal Tendencies',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 4 navigates the macro tides of financial markets. When quarterly shifts align with 30-year seasonal tendencies and a 6-month IPDA lookback, trends deliver generational moves.',
    summary: [
      'The architecture of capturing 300 to 1,000+ pips across multi-month institutional position trades.',
      'Understanding the 90-day Quarterly Shift cycle and the 6-month IPDA data range lookback.',
      'The Stage, Setup, and Pattern triad connecting macro fundamentals with daily entry execution.',
      'Amplified Lecture: Utilizing 15-year and 30-year historical seasonal tendencies for market turning points.'
    ],
    keyTerms: [
      { term: 'Quarterly Shift', definition: 'The recurring 90-day institutional capital reallocation cycle that drives macroeconomic trends and quarterly market turns.' },
      { term: '6-Month IPDA Lookback', definition: 'The long-term institutional reference period used to identify macro discount and premium dealing ranges.' },
      { term: 'Stage-Setup-Pattern Triad', definition: 'The ICT top-down framework: Stage (Monthly/Weekly cycle), Setup (Daily PD Array), Pattern (Intraday execution).' }
    ],
    practiceQuestions: [
      'What calendar months typically define the boundaries of the four quarterly algorithmic shifts?',
      'How do 15-year and 30-year seasonal tendencies provide predictive confluence for Model 4 setups?',
      'Why is pyramid positioning on intermediate swing breaks superior to single-bullet entry in position trading?'
    ],
    sections: [
      {
        id: '31.1',
        title: '31.1 Model 4 Trade Plan: Macro Position Trading',
        content: `ICT Charter Price Action Model 4 is designed for institutional fund managers, family offices, and patient individual traders who target 300 to 1,000+ pips per trade over multi-month holding periods.

Operational Parameters:
- Target Expectancy: 300 to 1,000+ pips.
- Holding Duration: 1 to 4 months per position leg.
- Primary Anchor: Monthly and Weekly charts supported by seasonal tendencies and macroeconomic data.
- Execution Trigger: Daily and 4-Hour structural confirmations.`
      },
      {
        id: '31.2',
        title: '31.2 The 90-Day Quarterly Shift & 6-Month IPDA Engine',
        content: `Financial markets do not move randomly over the calendar year; they are programmed by institutional algorithms into 90-day delivery cycles:

1. The Quarterly Shift Rhythm:
Every quarter (approximately 90 days or 3 calendar months), major central banking networks and sovereign wealth funds adjust their portfolio allocations.
- Quarter 1 (January - March): Initial macro direction or accumulation.
- Quarter 2 (April - June): Volatility expansion or seasonal spring trends.
- Quarter 3 (July - September): Summer lull transition into major autumn trend reversals.
- Quarter 4 (October - December): Year-end institutional markup or liquidation into historical targets.

2. The 6-Month IPDA Lookback:
Mark the extreme 6-month high and low. Identify whether current price is deep in a 6-month discount or premium. When price reaches a 6-month extreme near a quarterly transition date, expect a major trend reversal.`
      },
      {
        id: '31.3',
        title: '31.3 Amplified Lecture: The Stage, Setup, and Pattern Triad',
        content: `In the Model 4 Amplified Lecture, ICT establishes the three-tier framework required for position trading:

1. Stage (The Macro Environment):
- Determined on the Monthly and Weekly charts.
- Identifies whether the asset is in an Accumulation, Manipulation, or Distribution phase within the 90-day cycle.

2. Setup (The Institutional Condition):
- Determined on the Daily chart.
- A clean PD Array interaction: price tagging a Daily Bullish Order Block, rebalancing a Weekly Fair Value Gap, or sweeping a major yearly liquidity pool.

3. Pattern (The Exact Entry Signature):
- Refined on the 4-Hour or 1-Hour chart.
- A clean Market Structure Shift (MSS) with energetic displacement that validates the institutional turn. Enter via limit order on the first retest of the Fair Value Gap.`
      },
      {
        id: '31.4',
        title: '31.4 Seasonal Tendencies & Pyramid Scaling',
        content: `Model 4 incorporates 15-year and 30-year seasonal tendencies:

- Certain commodities and currencies exhibit strong historical patterns based on agricultural harvesting, tax deadlines, fiscal budgeting, and heating oil demand cycles.
- When price reaches a 6-month discount array right as the 30-year seasonal tendency turns bullish, conviction reaches institutional certainty.
- Pyramiding: Rather than entering the full position at once, Model 4 scales in across consecutive intermediate swing high/low breaks, locking in profits while exponentially expanding overall return on equity.`
      }
    ]
  },
  {
    id: 32,
    slug: 'ict-charter-model-5-session-day-trading',
    title: 'ICT Charter Model 5: Session Day Trading & Intraday Volatility Expansions',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 5 extracts 40 to 60 pips from the daily volatility injection. When the London Judas swing sweeps the Asian range, the true New York expansion becomes mechanical.',
    summary: [
      'The complete Trade Plan for session day trading capturing 40 to 60 pips per trade.',
      'The Asian Session range as the universal reference benchmark for manipulation runs.',
      'Executing the London Open Judas Swing and New York Open continuation injections.',
      'Amplified Lecture: Average Daily Range (ADR) exhaustion targets and high-impact news handling.'
    ],
    keyTerms: [
      { term: 'Session Day Trading', definition: 'The ICT Charter model focused on capturing the core daily expansion leg within a single operational session window.' },
      { term: 'Judas Swing', definition: 'An engineered false run during London Open that tricks retail traders into the wrong direction before reversing violently.' },
      { term: 'ADR Exhaustion', definition: 'The statistical daily limit of price movement calculated via the 5-day or 10-day Average Daily Range.' }
    ],
    practiceQuestions: [
      'Why is the Asian Session range (20:00 - 00:00 NY) considered the reference benchmark for the entire day?',
      'How does the London Judas Swing exploit the stops resting above and below the Asian session extremes?',
      'At what point should a Model 5 day trade be closed if the Average Daily Range (ADR) has been 100% fulfilled?'
    ],
    sections: [
      {
        id: '32.1',
        title: '32.1 Model 5 Trade Plan & Intraday Horizon',
        content: `ICT Charter Price Action Model 5 is built for active day traders who want larger gains than pure 10-pip scalps while completing all business before the market closes.

Operational Specifications:
- Target Expectancy: 40 to 60 pips (or 60 to 120 index points).
- Holding Time: 2 to 6 hours within the London or New York session.
- Primary Anchor: 60-minute and 15-minute charts.
- Execution Trigger: 5-minute and 1-minute displacement setups.`
      },
      {
        id: '32.2',
        title: '32.2 The Asian Range Reference & London Judas Swing',
        content: `Model 5 begins with the Asian Session consolidation:

1. Define the Asian Range:
Mark the high and low established between 20:00 PM and 00:00 AM New York Midnight. This defines the baseline liquidity pool.

2. The London Open Manipulation (Judas Swing):
Between 02:00 AM and 04:00 AM New York time, the London market opens.
- If daily bias is bullish, algorithms will drop price sharply below the Asian low, often driving down 20 to 30 pips to sweep sell stops and tap a Higher Timeframe discount PD array.
- This is the Judas Swing. It creates the illusion of a downward breakdown.

3. The Structural Reversal:
Once stops are cleared, price aggressively rallies back above the Asian low, shifting 5-minute market structure and leaving behind a pristine Fair Value Gap.`
      },
      {
        id: '32.3',
        title: '32.3 Amplified Lecture: NY Open Continuation & ADR Targets',
        content: `In the Amplified Lecture for Model 5, ICT explains the relationship between London and New York:

- If London established the true Low of the Day, the New York Open (07:00 AM to 09:00 AM NY) will provide a continuation entry.
- Look for a shallow retracement into a 15-minute Bullish FVG or Order Block during the New York Kill Zone.
- Enter with a target set at the 5-day Average Daily Range (ADR) exhaustion point.
- When price reaches 90% to 100% of the Average Daily Range and tags the Previous Day High, institutional algorithms exhaust their delivery cycle. Take full profits immediately.`
      },
      {
        id: '32.4',
        title: '32.4 High-Impact News Execution Protocol',
        content: `Model 5 provides strict rules for macroeconomic news releases (CPI, NFP, FOMC):

- Never enter directly ahead of a red-folder news release.
- Allow the news release to deliver its initial whip and volatility spike.
- Wait for the post-news candle to sweep resting liquidity and produce a clear 5-minute displacement candle.
- Enter on the first retracement into the newly printed imbalance with a defined invalidation stop.`
      }
    ]
  },
  {
    id: 33,
    slug: 'ict-charter-models-6-and-7-universal-models',
    title: 'ICT Charter Models 6 & 7: Universal Models, Buyside Expansion & Market Maker Curves',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Models 6 and 7 unlock the complete geometric architecture of price delivery. The Market Maker Buy and Sell Models mirror each other with mathematical perfection across the Smart Money Reversal.',
    summary: [
      'The Universal Trading Model 6: Systematic buyside range expansions from Discount PD arrays.',
      'The Universal Trading Model 7: The Sell-Side Curve and the complete Market Maker Sell Model (MMSM).',
      'The symmetry of the Market Maker Model: Original Consolidation to Smart Money Reversal (SMR).',
      'Amplified Lecture: Executing low-risk entries on the redistribution curve toward terminal liquidity.'
    ],
    keyTerms: [
      { term: 'Universal Trading Model', definition: 'The standardized ICT algorithmic model that applies seamlessly across any liquid asset class and timeframe.' },
      { term: 'Market Maker Sell Model (MMSM)', definition: 'The complete institutional delivery cycle from buying accumulation through Smart Money Reversal to selling distribution.' },
      { term: 'Smart Money Reversal (SMR)', definition: 'The critical HTF turning point where institutional algorithms transition from net buying to net selling.' }
    ],
    practiceQuestions: [
      'What are the distinct developmental stages of the Buy-Side Curve in a Market Maker Sell Model?',
      'How does the Smart Money Reversal (SMR) differ from a regular intraday pullback?',
      'Why does the redistribution curve on the right side of the model mirror the consolidation blocks on the left side?'
    ],
    sections: [
      {
        id: '33.1',
        title: '33.1 Model 6: Universal Buyside Range Expansion',
        content: `ICT Charter Price Action Model 6 is classified as the Universal Trading Model for buyside delivery.

Core Principles of Model 6:
1. The Hierarchical PD Array Matrix:
Price delivered in a bullish trend respects a strict sequence of discount arrays:
- Mitigation Block
- Breaker Block
- Liquidity Void
- Fair Value Gap
- Order Block
- Rejection Block

2. The Dealing Range Equilibrium Rule:
Model 6 strictly forbids buying above the 50% Equilibrium level of the active dealing range. All valid entries must be anchored at a Discount PD array located below Equilibrium.`
      },
      {
        id: '33.2',
        title: '33.2 Model 7: The Sell-Side Curve & Market Maker Models',
        content: `ICT Charter Price Action Model 7 introduces the complete Market Maker Sell Model (MMSM) and Market Maker Buy Model (MMBM):

The Geometry of the Model:
1. Left Side (The Buy-Side Curve):
- Original Consolidation: Initial base where institutional smart money builds inventory.
- Accumulation Stage 1: First impulsive run breaking minor structure.
- Re-Accumulation Stage 2: Secondary consolidation and upward continuation.
- Smart Money Reversal (SMR): Price tags a major Higher Timeframe Premium Array (such as a Weekly Bearish Order Block or Monthly FVG).

2. Right Side (The Sell-Side Curve):
- Low-Risk Sell Setup: The first Market Structure Shift lower following the SMR.
- Distribution Stage: Price begins systematically clearing the low of Re-Accumulation Stage 2.
- Re-Distribution Stage: Price breaks through Accumulation Stage 1 lows.
- Terminal Objective: Complete liquidation into the original consolidation origin.`
      },
      {
        id: '33.3',
        title: '33.3 The Smart Money Reversal (SMR) Mechanics',
        content: `The Smart Money Reversal is the most critical inflection point in Model 7:

- It must occur at a pre-determined Higher Timeframe Point of Interest.
- Look for Intermarket SMT Divergence at the SMR: if ES prints a higher high but NQ fails to make a higher high, institutional accumulation has ceased.
- The entry is taken immediately after the first low-timeframe displacement breaks below the internal swing low.`
      },
      {
        id: '33.4',
        title: '33.4 Amplified Lecture: Trading the Redistribution Curve',
        content: `In the Amplified Lecture for Models 6 and 7, ICT explains how to trade the right-side curve:

- Traders who miss the initial Smart Money Reversal do not chase price.
- Instead, wait for price to reach the level of the previous accumulation block on the left side of the chart.
- The previous accumulation block now flips into an Inversion FVG or Bearish Breaker on the right side.
- Enter on the retest of this flipped level with a limit order, targeting the Original Consolidation with exceptional confidence.`
      }
    ]
  },
  {
    id: 34,
    slug: 'ict-charter-models-8-and-9-precision-and-osok',
    title: 'ICT Charter Models 8 & 9: Advanced Precision (25 Pips/Wk) & One Shot One Kill (OSOK)',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    "quote": "A planning objective is not a promised return. Compare the original setup and management rules before combining models.",
    "summary": [
  "Model 8: distinguish a weekly objective, locked-in position and realised profit.",
  "Model 9: study weekly context without expecting a successful trade every week.",
  "Keep illustrative percentage growth separate from verified returns."
],
    "keyTerms": [
  {
    "term": "25 Pips Per Week Model",
    "definition": "A source model with a weekly planning objective. Its name does not establish a consistent return or a direct index-point equivalent."
  },
  {
    "term": "One Shot One Kill (OSOK)",
    "definition": "The name of Model 9. Read the source’s setup and management conditions rather than inferring a mandatory number of orders from the name."
  }
],
    "practiceQuestions": [
  "What is the difference between locking in a position and closing it?",
  "Which losing and no-setup weeks have you included in the evaluation?",
  "Why does compounding arithmetic fail to prove achievable trading returns?"
],
    sections: [
  {
    "id": "34.1",
    "title": "34.1 Model 8: An objective is not a return forecast",
    "content": "The Model 8 source presents a 25-pip weekly objective and an aspiration of 6% monthly growth. These describe the teaching model’s goal, not a verified return series or a promise of doubling an account. The original discussion distinguishes locking in a 25-pip position from immediately taking all profit at 25 pips. It considers later partial exits if the move extends.\n\nDo not convert those Forex pips into a fixed number of index points. Contract values, spreads, stops, costs and the distribution of losses matter. Compounding arithmetic assumes a sequence of returns; it does not establish that the sequence can be achieved."
  },
  {
    "id": "34.2",
    "title": "34.2 Keep Model 8 entry and management distinct",
    "content": "Study the original framework and its separate trade plan together. The plan contains a historical risk and stop-management example. Its numerical assumptions belong to that example; they do not establish a universally suitable stop distance or safe account percentage.\n\nThe reviewed source does not support replacing its management discussion with a universal rule to close the platform immediately after booking exactly 25 pips. Before replay, state when the position would be opened, when its stop would change, which portion would be closed and when the remaining idea expires."
  },
  {
    "id": "34.3",
    "title": "34.3 Model 9: Weekly context without a weekly promise",
    "content": "The One Shot One Kill introduction discusses a 50–75-pip weekly objective but explicitly warns learners not to expect it every week and to expect losses. The separate trade-plan lecture describes an example with a first objective and possible remaining exposure.\n\nThe name is not evidence that only one order may ever be placed, that a particular weekday must supply a setup, or that the weekly high or low can be known in advance. Read the actual setup and management conditions rather than turning the name into a trading rule."
  },
  {
    "id": "34.4",
    "title": "34.4 Compare the two plans in replay",
    "content": "Keep a separate record for each model: source, selected range, entry condition, risk budget, stop changes, partial exits and final outcome after costs. Record weeks with no qualifying entry and distinguish an unfilled order from a losing trade.\n\nA later chart can make the target appear obvious. Preserve what was visible before entry, and evaluate a later period that was not used to select the rules. Neither a liquidity label nor a model number establishes a mechanical reversal, a minimum profit or an independently verified advantage."
  }
]
  },
  {
  "id": 35,
  "slug": "ict-charter-models-10-11-and-12",
  "title": "ICT Charter Models 10, 11 & 12: Swing, Day Trading & Scalping",
  "part": "Part X - ICT Charter Price Action Models Curriculum",
  "level": 3,
  "quote": "The models have different planning objectives. Keep each model’s entry, management and risk assumptions together.",
  "summary": [
    "Model 10: a swing-trading source framework with illustrative 50–75-pip objectives.",
    "Model 11: a day-trading plan discussing a 30-pip objective.",
    "Model 12: an order-block and FVG sequence with a 20-pip source objective.",
    "Objectives are study conventions, not guaranteed captured returns or zero-drawdown entries."
  ],
  "keyTerms": [
    {
      "term": "Model objective",
      "definition": "The range or management goal used in the original plan, distinct from an expected or guaranteed result."
    },
    {
      "term": "Execution variation",
      "definition": "A change in entry, stop, partial exit or order type that must be recorded separately from the original source plan."
    }
  ],
  "practiceQuestions": [
    "Which source plan are you following, and which rule have you changed?",
    "How does taking a partial exit differ from moving a protective stop?",
    "Does your position-size calculation include the actual pip or tick value and costs?"
  ],
  "sections": [
    {
      "id": "35.1",
      "title": "35.1 Model 10: Follow the swing and its management plan",
      "content": "The original Model 10 introduction identifies a swing-trading approach with 50–75-pip objectives, while explaining that the framework can be adapted. Selected chart discussion follows weekly context, later swing lows and possible partial exits on a four-hour example. It does not reduce the model to automatically fading any dealing-range boundary toward its midpoint.\n\nRead the separate trade-plan lecture for preparation, opportunity discovery, planning, execution and management. A change in holding period, target or partial-exit schedule creates a variation; record it rather than merging it invisibly with the original model."
    },
    {
      "id": "35.2",
      "title": "35.2 Model 11: A different day-trading objective",
      "content": "Model 11’s introduction describes a potential 30-pip day-trading objective in the context of weekly range expansion. Its trade-plan lecture supplies a particular stop-management sequence. The presence of an objective is not evidence that every session offers it or that a learner will capture it.\n\nDo not add a compulsory sixty-minute FVG or an exact 62% entry merely because another lesson uses those tools. Specify the actual source rule and the candle information available when it could have been recognized. A stop modification and a realised partial exit have different effects on remaining exposure."
    },
    {
      "id": "35.3",
      "title": "35.3 Model 12: Sequence before confluence",
      "content": "The original Model 12 opening describes daily range expansion, an order block followed by an expansion swing, and a subsequent FVG opportunity. The source later discusses differences between broker feeds and the depth of retracement. This is more specific than simply finding two overlapping rectangles.\n\nThe separate plan uses a 20-pip objective and discusses protective-stop reductions as the example progresses. Treat those numbers as that source variant’s conventions. Neither an order block nor an adjacent FVG proves immediate profit, a fill at the desired price or absence of adverse movement."
    },
    {
      "id": "35.4",
      "title": "35.4 Compare the models without mixing their rules",
      "content": "Create separate journal columns for the model, source lecture, context, qualifying event, entry convention, initial stop, partial exits and final exit. Use actual contract or pip value when sizing: account risk budget divided by loss per unit at the planned stop gives units before costs and slippage. A currency-pair example cannot be converted directly into index points.\n\nReview losing and unfilled examples as well as successful ones. A smaller stop increases position sensitivity and may increase cost relative to the intended move. The reviewed material does not establish a universal zero-drawdown technique or independently verified win rate."
    }
  ]
},
  {
    id: 36,
    slug: 'ict-charter-model-13-2022-youtube-model',
    title: "2022 ICT Mentorship Model — A Source-Based Study Guide",
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: "Study the liquidity reference, displacement, structure shift and possible FVG retracement as separate observations. A completed example does not establish a live fill or a win rate.",
    summary: ["Selected-passage review across the introduction and Episodes 2–41.","Context, liquidity references, displacement and FVG completion as separate observations.","Conditional bias, source-specific variants and no-entry cases.","Risk and performance limitations without promised returns."],
    keyTerms: [{"term":"Liquidity reference","definition":"A previously visible high, low or group of comparable levels selected before the later move. The chart does not reveal all orders resting there."},{"term":"Confirmation convention","definition":"The stated displacement and candle-completion rule used to recognize a particular example; it is not a guarantee about the next candle."},{"term":"Replay information boundary","definition":"The last completed candle available when an observation is recorded. Later candles must not be used to choose an earlier reference."}],
    practiceQuestions: ["Which references were visible before the move, and which annotations only become clear afterward?","Which event marks the initial structure crossing in the chosen example, and which later event confirms the FVG?","How would unfilled orders, failed returns and execution costs affect the interpretation of the same chart?"],
    sections: [
      {
        id: '36.1',
        title: "36.1 Read the Original Context",
        content: "The supplied 2022 collection contains an introduction and Episodes 2–41. Our review uses selected timestamped caption passages and chart frames across that collection, with local transcription checks for important wording. It is not an independent audit of the instructor’s results or a claim that every spoken assertion has been verified.\n\nThe introduction emphasizes a simpler learning model. Episodes 2–6 separate context, a prior liquidity reference, displacement, a local structure crossing and an FVG. Later episodes add applications, uncertainty, intermarket comparisons and risk discussion. LearnSMC organizes those ideas into original study notes.\n\nThe original Charter Model 13 lecture identifies its subject as the public 2022 model at the opening and assumes prior study of the public series. Treat that lecture as a follow-up, not a substitute for the 2022 foundation. This verifies the relationship between those sources; it does not authenticate every numbered model or every later curriculum claim."
      },
      {
        id: '36.2',
        title: "36.2 Keep the Observations Separate",
        content: "First select the prior liquidity reference. Then observe whether price moves beyond it. Assess displacement using the specific lesson’s convention, recording the initial structure crossing separately from later candle completion for an FVG. Finally record whether a return occurs.\n\nThese are separate observations, not proof of hidden institutional positions. A missing return, a continuation beyond the swept level or a failed reaction is a result to record, not a reason to redraw the setup afterward."
      },
      {
        id: '36.3',
        title: "36.3 An Original Replay Exercise",
        content: "Hide future candles, write the observation window and mark a reference that already exists. Advance one candle at a time and record the first moment each condition becomes visible. Specify whether the entry is a limit or market order and when an unfilled order expires.\n\nChoose invalidation before entry and calculate position size using the actual product increment and contract value. Include spread, commission and possible slippage. This exercise supplies no universal risk percentage, fixed tick stop or required reward-to-risk ratio, and it is not a claim that ICT prescribed these exact research steps."
      },
      {
        id: '36.4',
        title: "36.4 Applications and Limits Across the Later Recordings",
        content: "Episodes 7 and 21 show why daily bias and opening-price references are conditional. Episode 26 deliberately illustrates a countertrend idea; an opposing daily label is not proof that no intraday opportunity can exist. These examples must not be combined into an unrestricted permission to trade every direction.\n\nEpisodes 14, 15 and the silent Episode 28 are execution demonstrations. Their entries, contract counts and exits do not establish a student return target, representative win rate or achievable live fill. Episode 29 explicitly distinguishes the paper-trading display from a promise that students can replicate it.\n\nEpisode 35 compares corresponding lows in ES and NQ for SMT and warns that an apparent divergence can disappear. Episode 41 finishes with risk and drawdown management. Choose one clearly specified study variant; collecting more model names does not validate it."
      }
    ]
  }
];
