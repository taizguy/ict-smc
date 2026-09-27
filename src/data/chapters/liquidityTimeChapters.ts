import { TextbookChapter } from '../../types';

export const liquidityTimeChapters: TextbookChapter[] = [
  // CHAPTER 18: Liquidity Engineering & Liquidity Runs
  {
    id: 18,
    slug: 'liquidity-engineering-and-liquidity-runs',
    part: 'Part IV - Liquidity and Time',
    title: 'Liquidity Engineering & Liquidity Runs — Inducement, Traps, and Low Resistance Runs',
    quote: 'Smart money does not wait for liquidity to appear by chance; they deliberately engineer it. They paint familiar chart patterns to lure retail capital into specific price corridors, only to harvest those positions when the algorithmic trap is sprung.',
    level: 3,
    summary: [
      'The reality of Liquidity Engineering: How algorithms manipulate retail psychology.',
      'Equal Highs (EQH) and Equal Lows (EQL): The most potent retail liquidity magnets on the chart.',
      'Trendline phantom liquidity: How retail diagonal support/resistance lines become highways for stops.',
      'Low Resistance Liquidity Runs (LRLR) vs. High Resistance Liquidity Runs (HRLR).',
      'The Inducement Phase: Recognizing traps before committing capital.'
    ],
    keyTerms: [
      { term: 'Liquidity Engineering', definition: 'The deliberate creation of obvious chart patterns (double tops, triple bottoms, trendlines) by algorithmic market makers to induce retail traders into clustering their stop losses at predictable levels.' },
      { term: 'Equal Highs (EQH) / Relative Equal Highs', definition: 'Two or more swing highs peaking at nearly identical price levels, creating a massive pool of resting Buy-Side Liquidity (buy stops).' },
      { term: 'Equal Lows (EQL) / Relative Equal Lows', definition: 'Two or more swing lows bottoming at nearly identical price levels, creating a massive pool of resting Sell-Side Liquidity (sell stops).' },
      { term: 'Low Resistance Liquidity Run (LRLR)', definition: 'An explosive, one-directional price movement where the path ahead contains only clean imbalances and unmitigated stop pools, allowing price to slice through like a hot knife through butter.' },
      { term: 'High Resistance Liquidity Run (HRLR)', definition: 'A choppy, difficult price delivery where the market must fight through multiple prior swing points and consolidated order blocks, resulting in deep, agonizing pullbacks.' }
    ],
    practiceQuestions: [
      'Why do retail traders celebrate a clean "triple bottom" as strong support, while an ICT trader views it as an irresistible target for a sell-side liquidity raid?',
      'How does an institution use diagonal trendlines to accumulate retail stops along a directional slope?',
      'What are the key technical conditions that produce a Low Resistance Liquidity Run (LRLR)?',
      'If price forms Equal Highs directly beneath a higher-timeframe Bearish Fair Value Gap, what is the algorithmic delivery sequence you should anticipate?',
      'How does identifying an "Inducement" swing prevent you from entering an early, invalid Market Structure Shift?'
    ],
    sections: [
      {
        id: '18.1',
        title: '18.1 The Architecture of Liquidity Engineering',
        content: `To become an elite tape reader, you must adopt a predatory mindset. You must stop viewing chart patterns as "natural supply and demand" and start viewing them as engineered liquidity traps.

When retail traders see a clean double top or triple bottom, they rejoice:
"Look at that support! It has held three times! It is impenetrable!"

To the Interbank Price Delivery Algorithm, that level is something entirely different:
Every time price bounces off that level, more retail traders buy.
Where do those buyers place their stops?
Directly below the triple bottom!
With every passing hour, the concentration of resting Sell-Stop Orders underneath that line grows denser and denser.

The algorithm does not build double tops to respect them. The algorithm deliberately engineers double tops to attract and cluster retail orders into a tight, easily exploitable price coordinate.

Once the stop density reaches the institution's required threshold:
1. The algorithm releases an aggressive manipulation wave that punches 5 to 15 ticks below the triple bottom.
2. The entire pool of sell stops is triggered in milliseconds.
3. The institution fills their massive buy orders against those panic sells.
4. Price reverses violently, leaving the retail crowd wondering why "support broke and then immediately skyrocketed."`,
        keyTakeaway: 'Clean chart patterns are deliberate traps. Double tops and bottoms are engineered by algorithms to cluster retail stops into high-density liquidity pools.'
      },
      {
        id: '18.2',
        title: '18.2 Trendline Phantom Liquidity',
        content: `Orthodox technical analysis dedicates hundreds of pages to drawing diagonal trendlines. Retail traders connect three higher lows and assume that the fourth touch is a guaranteed buying opportunity.

Let us deconstruct the structural reality of a Retail Trendline:
As price trends upward making higher lows along a diagonal trendline:
- Retail traders buy at Touch 1, Touch 2, and Touch 3.
- Each time they buy, they tuck their stop losses just beneath the diagonal line.
- This creates an escalating diagonal staircase of resting Sell-Side Liquidity!

This staircase is known in institutional trading as Trendline Phantom Liquidity.
Because these stop losses are stacked like dominoes along the slope, the moment the algorithm pushes price through the trendline:
- Stop 1 is triggered.
- The market sell volume from Stop 1 pushes price into Stop 2.
- Stop 2 triggers Stop 3.
- A cascading chain reaction of automatic liquidation unfolds!

This is why trendline breaks are often exceptionally violent: they are not driven by "new sellers entering the market"—they are driven by the mechanical liquidation of resting retail stop orders being executed by the exchange matching engine.`,
        keyTakeaway: 'Diagonal trendlines engineer staircases of resting stop losses. When the trendline breaks, a domino cascade of stop-outs produces explosive momentum.'
      },
      {
        id: '18.3',
        title: '18.3 Low Resistance vs. High Resistance Liquidity Runs',
        content: `Not all market environments offer equal trading opportunity. ICT categorizes market conditions into two distinct liquidity run profiles:

1. Low Resistance Liquidity Run (LRLR) — The Ideal Trading Condition:
- Profile: Price has just swept a major liquidity pool and is now targeting a clean, obvious pool on the opposite side of the range (such as clean Equal Highs or a major session high).
- Order Flow Characteristics: The path toward the target contains no fresh higher-timeframe order blocks or conflicting structure. It is open highway.
- Price Delivery: Price moves with relentless speed, printing tall, one-directional candles with tiny pullbacks that barely retrace to the 20% or 30% mark.
- Trader Action: Be aggressive! Pyramiding positions, entering at the first presented 1-minute or 5-minute FVG, and trailing stops tightly behind previous candle lows yield phenomenal returns.

2. High Resistance Liquidity Run (HRLR) — The Grind / Chop:
- Profile: Price is attempting to move in a direction that is choked with previous swing points, unmitigated order blocks, and old consolidated ranges.
- Order Flow Characteristics: Every single tick of progress is contested. Every 5 ticks higher, price slams into an old order block, resulting in a deep 70% or 80% retracement.
- Price Delivery: Overlapping candles, long wicks on both sides, false breakouts, and sluggish momentum.
- Trader Action: Reduce risk, tighten targets, or step aside completely! HRLR conditions are designed to harvest retail fees through chop.`,
        keyTakeaway: 'Focus your capital on Low Resistance Liquidity Runs where the path to the target is unobstructed by old structure. Avoid High Resistance chop.'
      }
    ]
  },

  // CHAPTER 19: Time & Session Liquidity: The Global Clock
  {
    id: 19,
    slug: 'time-and-session-liquidity-the-global-clock',
    part: 'Part IV - Liquidity and Time',
    title: 'Time & Session Liquidity: The Global Clock — Killzones, Macros, and Algorithmic Schedules',
    quote: 'Price is only half the equation; Time is the master key. The Interbank Price Delivery Algorithm operates on strict, programmatic time windows. If a technical setup appears outside of a designated Killzone or Macro, it is merely random noise.',
    level: 3,
    summary: [
      'The 24-hour interbank currency and index cycle: Asia, London, and New York.',
      'The four official ICT Killzones: Exact hours, characteristics, and volatility mandates.',
      'The 20-minute algorithmic Macro Windows: High-probability micro execution cycles.',
      'The London Open Judas Swing: Exploiting the Asian Range manipulation.',
      'The New York AM Silver Bullet (10:00 - 11:00 AM EST): The institutional bread-and-butter model.'
    ],
    keyTerms: [
      { term: 'Killzone', definition: 'A designated intraday time window where institutional volume, volatility, and algorithmic price delivery peak, providing the highest statistical probability for trade execution.' },
      { term: 'Asian Session (20:00 - 00:00 EST)', definition: 'The initial session that establishes the baseline consolidation range and reference boundaries for the subsequent European trading day.' },
      { term: 'London Open Killzone (02:00 - 05:00 EST)', definition: 'The European session window that typically engineers the Judas Swing, sweeps the Asian Range, and establishes the High or Low of the Day.' },
      { term: 'New York AM Killzone (08:00 - 11:00 EST)', definition: 'The primary high-volume session where US economic announcements and the 09:30 cash open create explosive expansions and continuation setups.' },
      { term: 'London Close Killzone (10:00 - 12:00 EST)', definition: 'The window where European trading desks square off daily positions, often triggering intraday profit-taking pullbacks or counter-trend reversals.' },
      { term: 'Macro Window', definition: 'A recurring 20-minute programmatic algorithmic cycle where price is injected with liquidity to reprice to a specific PD array or sweep a local extreme.' }
    ],
    practiceQuestions: [
      'Why is trading price action at 06:30 AM EST or 12:30 PM EST statistically inferior to trading inside an official ICT Killzone?',
      'What is the structural role of the Asian Range in setting up the London Open Judas Swing?',
      'What specific algorithmic event takes place during the 09:50 - 10:10 AM EST Macro window in US equities?',
      'Why does the London Close Killzone often produce a sharp retracement against the prevailing New York morning trend?',
      'How does anchoring your trading strictly to New York Local Time (EST/EDT) synchronize your analysis with interbank algorithms?'
    ],
    sections: [
      {
        id: '19.1',
        title: '19.1 The Universal Rule of Time: Synchronizing to New York (EST)',
        content: `In traditional technical analysis, traders look for chart patterns at any hour of the day or night. They will trade a head-and-shoulders pattern at 7:00 PM just as eagerly as at 9:30 AM.

This is a fatal error.
The Interbank Price Delivery Algorithm does NOT deliver price randomly throughout the 24-hour cycle. It is programmed around the Global Banking Calendar and operates on strict, deterministic time schedules.

The Golden Law of ICT Timing:
All market analysis must be conducted in New York Local Time (Eastern Standard / Daylight Time - EST/EDT)!
Regardless of where you physically live on the planet—whether London, Dubai, Tokyo, or Sydney—your charting platform MUST be set to New York time (UTC-5 or UTC-4).
Why? Because the major central banks, the Federal Reserve, the New York Federal Reserve, the Chicago Mercantile Exchange (CME), and the global interbank liquidity providers synchronize their electronic clearing engines to the New York clock.

If you are looking at charts in your local time zone, you are blind to the algorithmic schedule. Synchronize your clock to New York, and the market’s behavior instantly transforms from chaos into order.`,
        keyTakeaway: 'Always set your chart clock to New York Local Time (EST/EDT). Algorithmic delivery schedules and banking cycles are anchored to this clock.'
      },
      {
        id: '19.2',
        title: '19.2 The Four Official ICT Killzones',
        content: `During the 24-hour trading day, there are four designated institutional trading windows known as Killzones:

1. The Asian Killzone (20:00 - 00:00 EST / 8:00 PM - Midnight EST):
- Role: Establishes the Asian Dealing Range (the Asian High and Asian Low).
- Characteristics: Typically low volatility and consolidated range-bound delivery. This consolidation is intentional: it builds up Buy-Side Liquidity above the Asian High and Sell-Side Liquidity below the Asian Low to be harvested by London!

2. The London Open Killzone (02:00 - 05:00 EST / 2:00 AM - 5:00 AM EST):
- Role: The King of Session Reversals.
- Characteristics: Generates the Judas Swing—an aggressive false move that sweeps the Asian High or Asian Low. In classic bullish daily profiles, the London Open creates the absolute Low of the Day (LOD) between 02:00 and 03:30 AM EST, before embarking on a massive expansion rally.

3. The New York AM Killzone (08:00 - 11:00 EST / 8:00 AM - 11:00 AM EST):
- Role: The Highest Volume Session on Earth.
- Characteristics: Captures the 08:30 AM high-impact economic releases (CPI, NFP, PPI) and the 09:30 AM Equities Cash Open. It either expands the London trend or stages a violent morning reversal. Houses the famous New York Silver Bullet (10:00 - 11:00 AM EST).

4. The London Close Killzone (10:00 - 12:00 EST / 10:00 AM - 12:00 PM EST):
- Role: European Desk Settlement and Profit Taking.
- Characteristics: London traders close out intraday books, leading to a sharp 20% to 30% counter-trend retracement of the morning move.`,
        keyTakeaway: 'Confine your trading exclusively to the official Killzones. Outside of these hours, volume thins, spreads widen, and algorithmic delivery becomes erratic.'
      },
      {
        id: '19.3',
        title: '19.3 The 20-Minute Algorithmic Macro Windows',
        content: `Within the broader Killzones reside ultra-precise 20-minute operational cycles known as Algorithmic Macros.

During these specific windows, the algorithm executes programmatic liquidity runs:

1. 08:50 - 09:10 AM EST Macro: Pre-market positioning ahead of the cash open.
2. 09:50 - 10:10 AM EST Macro: The primary morning execution macro. Resolves the opening 09:30 cash volatility and establishes the primary morning delivery leg.
3. 10:50 - 11:10 AM EST Macro: Culmination of the morning trend; sets up the transition into the London Close.
4. 11:50 - 12:10 PM EST Macro: The Lunch Macro; often provides a brief scalp before entering the dead New York lunch consolidation.
5. 13:10 - 13:30 PM EST Macro: Post-lunch breakout initiation.
6. 15:15 - 15:45 PM EST Macro: Market On Close (MOC) and institutional settlement rebalancing.

When you observe an FVG forming right as an Algorithmic Macro opens, the probability of an energetic, immediate expansion toward your target reaches its absolute zenith.`,
        keyTakeaway: 'Algorithmic Macros are 20-minute execution windows where smart money injects volume. Aligning your entries with macro windows provides instant directional delivery.'
      }
    ]
  },

  // CHAPTER 20: The Weekly Profile & Five-Day Delivery Model
  {
    id: 20,
    slug: 'the-weekly-profile-and-five-day-delivery-model',
    part: 'Part IV - Liquidity and Time',
    title: 'The Weekly Profile & Five-Day Delivery Model — Decoding the Intraworking Weekly Template',
    quote: 'The weekly candlestick is an open-high-low-close delivery container. In a bullish week, the low of the week will form on Tuesday or Wednesday London Open. When you understand the weekly template, you never get caught on the wrong side of the daily trend.',
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
      { term: 'Low of Week (LOW)', definition: 'The absolute lowest price level printed during the five-day trading week, which in a bullish week forms with 70%+ statistical probability on Tuesday or Wednesday.' },
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
        content: `Just as a daily candle has an Open, High, Low, and Close, the entire five-day trading week forms a single, cohesive Weekly Candlestick.

Consider a Bullish Weekly Candle:
- Sunday 18:00 EST: The weekly candle opens.
- Monday / Tuesday: The weekly candle pushes downward, creating the Lower Wick of the weekly bar (the manipulation / accumulation phase).
- Tuesday / Wednesday: The weekly candle prints the absolute Low of the Week (LOW).
- Wednesday / Thursday: The weekly candle expands vertically upward, forming the tall, green Body of the weekly bar (the distribution phase).
- Friday: The weekly candle prints its extreme high, pulls back slightly, and closes near the top of its range, leaving a tiny upper wick.

If you understand this weekly architecture, your entire perspective changes:
When you sit down at your trading desk on Tuesday morning and the market is selling off sharply, retail traders panic and shout: "The market is crashing!"
The ICT student smiles and observes: "The weekly candle is simply engineering its lower shadow. I am waiting for the London Open or New York Open to confirm the Low of the Week, and then I will ride the weekly expansion all the way through Thursday!"`,
        keyTakeaway: 'The weekly candle follows the Power of Three: early week manipulation creates the wick, midweek expands the body, and late week closes the range.'
      },
      {
        id: '20.2',
        title: '20.2 The Classic Tuesday LOW/HOW Template',
        content: `Across decades of interbank foreign exchange and futures data, Michael J. Huddleston documented that in a standard trending market:

The Low of the Week (LOW) or High of the Week (HOW) forms between Tuesday London Open (02:00 EST) and Tuesday New York Open (09:30 EST) with approximately 70% statistical probability!

The Day-by-Day Roadmap of the Classic Bullish Weekly Profile:

- Monday: 
Often a range-bound consolidation or a gentle decline. Monday’s primary job is to establish initial reference ranges and build up retail liquidity above and below the market. Smart traders treat Monday as an observation day.

- Tuesday: 
The trap is sprung! During London Open (02:00 - 05:00 EST), price plunges aggressively, sweeps the Monday Low and the Asian Low, taps into a higher-timeframe Discount FVG or Order Block, and prints an explosive Market Structure Shift. This pivot becomes the Low of the Week (LOW).

- Wednesday: 
Pure trend expansion. Price continues accelerating upward, breaking Monday’s highs with clean BOS and leaving fresh Fair Value Gaps.

- Thursday: 
The culmination of the weekly move. Price reaches the primary Weekly Draw on Liquidity (e.g., Previous Week’s High). Often the largest range day of the entire week.

- Friday: 
Morning continuation into the final target, followed by late-morning profit-taking during the London Close (10:00 - 12:00 EST). Price pulls back to settle the weekly bar.`,
        keyTakeaway: 'Tuesday London Open is the premier window for capturing the absolute extreme of the weekly trend. Expect Tuesday to engineer the Low or High of the Week.'
      }
    ]
  },

  // CHAPTER 21: Daily Profiles & Intraday Power of Three (PO3)
  {
    id: 21,
    slug: 'daily-profiles-and-intraday-power-of-three-po3',
    part: 'Part IV - Liquidity and Time',
    title: 'Daily Profiles & Intraday Power of Three (PO3 / AMD) — Accumulation, Manipulation, Distribution',
    quote: 'Every daily candlestick tells an algorithmic story: Accumulation at the open, Manipulation to create the false wick, and Distribution to deliver genuine institutional volume. Master the Power of Three, and you master the daily candle.',
    level: 3,
    summary: [
      'The Power of Three (PO3) / AMD framework: Accumulation, Manipulation, Distribution.',
      'The anatomy of a bullish daily candle: Open, Low (Manipulation), High (Distribution), Close.',
      'The anatomy of a bearish daily candle: Open, High (Manipulation), Low (Distribution), Close.',
      'The Midnight Open (00:00 EST) and 08:30 AM EST reference anchors.',
      'The Judas Swing: Identifying the false morning breakout before it reverses.'
    ],
    keyTerms: [
      { term: 'Power of Three (PO3)', definition: 'The algorithmic three-stage lifecycle of any price delivery bar: Accumulation of orders, Manipulation to trap liquidity, and Distribution of directional volume.' },
      { term: 'AMD (Accumulation, Manipulation, Distribution)', definition: 'The practical application of PO3 where the Asian session accumulates, the London session manipulates, and the New York session distributes.' },
      { term: 'Judas Swing', definition: 'The deliberate stop-running false breakout engineered during London or New York open that sweeps retail stops before launching in the true daily direction.' },
      { term: 'Midnight Open (00:00 EST)', definition: 'The true institutional day open price; in a bullish day, smart money buys below the Midnight Open; in a bearish day, they sell above it.' },
      { term: 'True Day Delivery', definition: 'The directional expansion phase of the daily candle that delivers price toward the primary Draw on Liquidity.' }
    ],
    practiceQuestions: [
      'In a bullish daily candle, what is the role of the Midnight Open (00:00 EST), and where should you look to buy relative to that price?',
      'How does the concept of AMD explain why the London Open often moves in the exact opposite direction of the daily bias?',
      'What specific technical confirmation tells you that the "Manipulation" phase of PO3 has completed and the "Distribution" phase has begun?',
      'Why is buying above the Midnight Open on a bullish day considered an institutional mistake?',
      'How does the 08:30 AM EST New York open interact with the daily Power of Three cycle?'
    ],
    sections: [
      {
        id: '21.1',
        title: '21.1 The Mechanics of Power of Three (PO3 / AMD)',
        content: `Every completed candlestick on your chart—whether a 1-minute candle, a 4-hour candle, or a Daily candle—is governed by the Power of Three (PO3), also known as AMD (Accumulation, Manipulation, Distribution).

To trade with smart money, you must understand the three stages of the daily candle lifecycle:

1. Stage 1: Accumulation (The Asian Range)
- Time Window: 20:00 - 00:00 EST.
- Mechanics: Price consolidates in a relatively tight range. Smart money is quietly accumulating small positions while allowing retail traders to establish obvious support and resistance levels.

2. Stage 2: Manipulation (The London Judas Swing)
- Time Window: 02:00 - 04:00 EST.
- Mechanics: The algorithm aggressively pushes price in the OPPOSITE direction of the true daily trend!
  - If the daily bias is Bullish: The algorithm drives price DOWN below the Midnight Open, sweeping the Asian Low to trigger retail sell stops and trap breakout sellers.
  - If the daily bias is Bearish: The algorithm drives price UP above the Midnight Open, sweeping the Asian High.
- This false manipulation move creates the Wick of the daily candlestick!

3. Stage 3: Distribution (The New York Expansion)
- Time Window: 08:00 - 15:00 EST.
- Mechanics: Once retail traders are trapped and stop liquidity has been harvested, the market reverses with violent displacement, expanding relentlessly toward the true daily target. This expansion forms the tall Body of the daily candle.`,
        keyTakeaway: 'PO3 governs every candle: Accumulation builds the range, Manipulation creates the false wick, and Distribution delivers the true directional body.'
      },
      {
        id: '21.2',
        title: '21.2 The Sacred Rule of the Midnight Open (00:00 EST)',
        content: `One of the most powerful institutional trading rules taught by ICT revolves around the New York Midnight Open (00:00 EST).

The Midnight Open price represents the true baseline anchor of the algorithmic day.

The Golden Institutional Buying Rule:
If your higher-timeframe daily bias is BULLISH:
- You must NEVER BUY ABOVE THE MIDNIGHT OPEN!
- Buying above the Midnight Open means you are buying in Premium territory after the daily expansion has already begun.
- You patiently wait for the London Open or New York Open to push price BELOW the Midnight Open (into Discount territory).
- When price is below Midnight Open, sweeping an Asian low or tapping a discount FVG, that is where smart money is buying. That is where you buy!

The Golden Institutional Selling Rule:
If your higher-timeframe daily bias is BEARISH:
- You must NEVER SELL BELOW THE MIDNIGHT OPEN!
- You wait for the morning manipulation to drive price ABOVE the Midnight Open into a premium PD array.
- You sell short above the Midnight Open, catching the high of the day and riding the distribution downward.`,
        keyTakeaway: 'In a bullish market, smart money buys below the Midnight Open (Discount). In a bearish market, smart money sells above the Midnight Open (Premium).'
      }
    ]
  },

  // CHAPTER 22: The Complete ICT Top-Down Model & Execution Blueprint
  {
    id: 22,
    slug: 'the-complete-ict-top-down-model-and-execution-blueprint',
    part: 'Part IV - Time Based Delivery',
    title: 'The Complete ICT Top-Down Model & Execution Blueprint — From Monthly Narrative to 1-Minute Execution',
    quote: 'Top-down analysis is not looking at multiple charts hoping for agreement. It is a strict interbank hierarchy: the Monthly and Weekly establish the macro narrative, the Daily and 4-Hour define the dealing range and Draw on Liquidity, and the 15-Minute down to 1-Minute provide the precision execution trigger.',
    level: 3,
    summary: [
      'The multi-timeframe interbank hierarchy: Monthly, Weekly, Daily, 4H, 15m, 1m.',
      'Step 1: Identifying the higher-timeframe Draw on Liquidity (DOL).',
      'Step 2: Defining the active Dealing Range and 50% Equilibrium.',
      'Step 3: Session preparation and key reference price level marking.',
      'Step 4: Intraday execution checklist during Killzones and Macros.',
      'Trade management: Invalidation, partial profit extraction, and runner preservation.'
    ],
    keyTerms: [
      { term: 'Draw on Liquidity (DOL)', definition: 'The primary external liquidity pool or unfilled higher-timeframe imbalance toward which the algorithm is magnetically attracted.' },
      { term: 'Interbank Hierarchy', definition: 'The rule that higher-timeframe PD arrays and order flow always supersede and override lower-timeframe signals.' },
      { term: 'Dealing Range Equilibrium (50%)', definition: 'The exact mathematical midpoint between the major swing high and major swing low of the active trading range.' },
      { term: 'Execution Matrix', definition: 'The systematic filter chain connecting macro bias, intraday session timing, structural shift, and PD array entry.' }
    ],
    practiceQuestions: [
      'Why does trading a 1-minute bullish MSS that opposes a 4-Hour Bearish Draw on Liquidity result in a low win-rate?',
      'What are the mandatory overnight reference levels that every ICT trader must plot before the 09:30 AM open?',
      'How does the 50% Equilibrium line determine whether an FVG is eligible for trade execution?',
      'What specific criteria trigger an immediate, manual exit before price hits your full stop loss?',
      'Describe the complete step-by-step checklist from waking up to logging a trade in your journal.'
    ],
    sections: [
      {
        id: '22.1',
        title: '22.1 The Interbank Multi-Timeframe Hierarchy',
        content: `A novice trader opens a 1-minute chart, spots a tiny Fair Value Gap, and takes a trade with zero awareness of what the 4-Hour or Daily chart is doing. This is financial suicide.

The Interbank Price Delivery Algorithm operates on a strict Top-Down Hierarchy:

1. Monthly & Weekly Charts (The Macro Narrative):
- Identifies the secular quarterly trend and long-term liquidity targets.
- Answers the fundamental question: "Where is smart money taking this market over the next 30 to 90 days?"

2. Daily & 4-Hour Charts (The Dealing Range & DOL):
- Defines the current operational Dealing Range.
- Identifies the active Draw on Liquidity (DOL): What specific swing high, swing low, or unmitigated FVG is price magnetically attracted to this week?
- Establishes the daily Bias: Are we seeking Buyside Delivery or Sellside Delivery?

3. 15-Minute & 5-Minute Charts (The Session Framework):
- Outlines session structures: Asian Range boundaries, London High/Low, Pre-Market highs/lows.
- Verifies Market Structure Shifts occurring within Killzone hours.

4. 1-Minute Chart (The Precision Scalpel):
- Used exclusively for fine-tuning entry timing, locating the execution FVG, and setting micro invalidation stop losses.
- NEVER used to determine trend or bias!`,
        keyTakeaway: 'Always align from the top down: Monthly/Weekly sets the narrative, Daily/4H sets the Draw on Liquidity, 15m/5m maps structure, and 1m executes.'
      },
      {
        id: '22.2',
        title: '22.2 The Complete 6-Step Daily Execution Blueprint',
        content: `Synthesizing the entire curriculum into a repeatable, institutional trading checklist:

Step 1: Pre-Market Context (07:00 - 08:30 AM EST)
- Check the economic calendar (Forex Factory). Are there 08:30 or 10:00 AM red-folder events?
- Mark the 4H/Daily Draw on Liquidity (DOL).
- Mark overnight reference levels:
   Previous Day High (PDH) & Previous Day Low (PDL)
   Asian High & Asian Low
   London High & London Low
   New York Midnight Open (00:00 EST)

Step 2: Session Timing
- Sit on your hands until an official Killzone or Macro Window arrives.
- For US Equities (NQ/ES): Wait for 09:30 AM cash open. Observe the initial 15-minute Judas Swing.

Step 3: The Liquidity Raid
- Watch price interact with an overnight reference level or HTF PD array.
- Confirm a clean liquidity sweep (wicks penetrating the level, wicks rejecting).

Step 4: The Market Structure Shift (MSS)
- Drop to 1m or 5m chart.
- Look for violent displacement in the opposite direction.
- Verify candle body close through an intermediate swing point.
- Verify creation of a fresh Fair Value Gap (FVG).

Step 5: Execution & Invalidation
- Place limit order at proximal boundary or 50% Consequent Encroachment of the FVG.
- Place Stop Loss strictly beyond the sweep extreme.
- Calculate position size so total risk equals exactly 1% (or 0.5% for funded accounts).

Step 6: Trade Management
- Take 50% partial profits at the 50% equilibrium of the intraday range. Move stop to break-even.
- Let the remaining runner deliver into the primary Draw on Liquidity. Close platform and journal!`,
        keyTakeaway: 'Follow the 6-step blueprint without deviation: Pre-market preparation, session timing, liquidity sweep, displacement MSS, FVG limit entry, and disciplined profit extraction.'
      }
    ]
  }
];
