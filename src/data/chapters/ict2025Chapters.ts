import { TextbookChapter } from '../../types';

export const ict2025Chapters: TextbookChapter[] = [
  // CHAPTER 24: 09:30 AM Opening Range Theory
  {
    id: 24,
    slug: '0930-am-opening-range-theory',
    part: 'Part IX - ICT 2025 Official Mentorship Curriculum',
    title: '24.1 The 09:30 AM Opening Range Theory — Cash Open Volatility & Initial Balance',
    quote: 'The 09:30 AM Equities Cash Open is not a gamble; it is the scheduled release of institutional order flow. When the opening bell rings, the algorithm executes the initial 15-minute Judas Swing to trap premature retail breakout traders before releasing true trend delivery.',
    level: 2,
    summary: [
      'The institutional mechanics of the 09:30 AM New York Equities Cash Open (NYSE/Nasdaq).',
      'The 09:30 - 09:45 AM Judas Swing: Why early breakouts fail 80% of the time.',
      'The Initial Balance (IB) concept: High and Low of the first 15 or 30 minutes.',
      'Intermarket alignment: Comparing NQ, ES, and YM opening prints.',
      'The 09:50 AM Macro handoff: Transitioning from opening chaos to high-probability execution.'
    ],
    keyTerms: [
      { term: 'Cash Open (09:30 EST)', definition: 'The exact moment physical equity stock exchanges open in New York, triggering massive volume, index arbitrage, and institutional portfolio rebalancing.' },
      { term: 'Opening Judas Swing', definition: 'A rapid, stop-purging manipulation spike occurring between 09:30 and 09:45 AM designed to sweep pre-market highs or lows before establishing the authentic session trend.' },
      { term: 'Initial Balance (IB)', definition: 'The price range established during the first 30 or 60 minutes of cash trading, used by institutional desks to determine day type and range expansion potential.' },
      { term: 'Index Arbitrage Program', definition: 'High-frequency algorithmic systems that trade futures against underlying constituent baskets of stocks to eliminate synthetic price discrepancies at the open.' }
    ],
    practiceQuestions: [
      'Why is executing a market order at 09:30:05 AM considered an amateur gambling behavior?',
      'What specific technical event confirms that the 09:30 AM opening manipulation has concluded?',
      'How does comparing the pre-market high/low (06:00 - 08:30 EST) with the 09:30 open reveal the target of the Judas Swing?',
      'What is the role of the 09:50 - 10:10 AM Macro window in validating the cash open direction?',
      'How do you handle days when 08:30 AM high-impact economic news has already delivered a 200-point expansion prior to 09:30?'
    ],
    sections: [
      {
        id: '24.1',
        title: '24.1 The Volatility Crucible of 09:30 AM EST',
        content: `At exactly 09:30:00 AM Eastern Standard Time, the physical opening bell rings at the New York Stock Exchange (NYSE) and Nasdaq. Within microseconds, billions of dollars of institutional capital flood through the electronic gateways.

Retail traders view 09:30 AM as a race. They see a giant green candle at 09:30:15 AM and smash the "Buy" button, terrified of missing the move.
Nine times out of ten, that initial surge is the Opening Judas Swing!

The Mechanical Reality of the Cash Open:
1. Overnight futures trading (Globex) is relatively thin compared to the cash market.
2. Market-making algorithms use the immense liquidity surge at 09:30 AM to execute a violent, rapid probe outside the pre-market consolidation range.
3. This probe purges resting buy stops above the Pre-Market High (06:00 - 08:30 AM) or sell stops below the Pre-Market Low.
4. Once those retail orders are harvested, the algorithm immediately reverses price and embarks on the true directional move of the morning.

As an institutional tape reader, your rule for 09:30 AM is simple and absolute:
DO NOT TOUCH THE KEYBOARD BETWEEN 09:30 AND 09:45 AM!
Allow the algorithm to complete its manipulation. Let the retail herd get chopped to pieces. Your job is to observe which side of the market is swept, identify the subsequent Market Structure Shift, and prepare for execution during the 09:50 AM Macro window.`,
        keyTakeaway: 'The 09:30 AM cash open is designed to manipulate and trap retail traders. Sit on your hands until 09:45 AM, allowing the opening manipulation to reveal institutional intent.'
      },
      {
        id: '24.2',
        title: '24.2 The 09:50 AM Macro Handoff and Morning Delivery',
        content: `Once the opening 15-minute storm has passed (09:45 AM), the market enters the Opening Range Consolidation.

At 09:50:00 AM EST, the primary morning Algorithmic Macro Window (09:50 - 10:10 AM EST) opens.
This is where professional traders strike!

During this 20-minute macro window:
- The algorithm evaluates the high and low established during the 09:30 - 09:45 AM opening phase.
- If the open swept the pre-market low into a higher-timeframe discount FVG, the 09:50 macro will produce a crisp 1-minute or 5-minute Market Structure Shift upward.
- The displacement candle prints the First Presented FVG (or Inversion FVG).
- The institutional trader enters at the 50% Consequent Encroachment of that gap, with their invalidation stop safely anchored behind the 09:30 manipulation low.
- Price accelerates smoothly toward the morning target during the New York Silver Bullet hour (10:00 - 11:00 AM EST).`,
        keyTakeaway: 'The 09:50 - 10:10 AM Macro window is the bridge between opening manipulation and directional delivery. Look for your displacement entry right here.'
      }
    ]
  },

  // CHAPTER 25: The 1st Presented FVG (The 09:31 Rule)
  {
    id: 25,
    slug: 'the-1st-presented-fvg-the-0931-rule',
    part: 'Part IX - ICT 2025 Official Mentorship Curriculum',
    title: '25.1 The 1st Presented FVG (The 09:31 Rule) — Immediate Execution Advantage',
    quote: 'The first Fair Value Gap presented following a verified market structure shift is the purest institutional signal of the session. It holds the lowest drawdowns, the tightest stops, and the highest statistical delivery expectancy.',
    level: 2,
    summary: [
      'The foundational definition of the "First Presented FVG".',
      'The 09:31 Rule in high-velocity open tape reading.',
      'Why secondary and tertiary pullbacks have declining win rates.',
      'Consequent Encroachment (50% CE) execution parameters.',
      'Discipline: Knowing when an FVG has been over-mitigated and must be abandoned.'
    ],
    keyTerms: [
      { term: 'First Presented FVG', definition: 'The very first 3-candle imbalance created during the initial displacement wave following a liquidity sweep or Market Structure Shift.' },
      { term: '09:31 Rule', definition: 'The institutional observation that the first FVG printed immediately after the cash open bell contains the primary algorithmic orderflow footprint for the session.' },
      { term: 'Secondary Retracement Risk', definition: 'The progressive decay in trade win-rate and increase in stop-out risk that occurs when entering on the 2nd, 3rd, or 4th pullback of an established trend.' },
      { term: 'Wick Invalidation', definition: 'The immediate cancellation of a trade setup when an execution candle fails to respect the proximal boundary of the First Presented FVG.' }
    ],
    practiceQuestions: [
      'Why does the First Presented FVG carry a significantly higher win rate than the second or third FVG formed later in the trend?',
      'If price penetrates more than 50% through the First Presented FVG, what should you do with your limit order?',
      'How does the 09:31 rule differentiate between a genuine trend initiation and opening noise?',
      'Where is your invalidation stop loss placed when entering strictly on the First Presented FVG?',
      'What should you do if the first presented FVG is over 50 index points wide on Nasdaq?'
    ],
    sections: [
      {
        id: '25.1',
        title: '25.1 The Primacy of the First Presented Imbalance',
        content: `In the 2025/2026 ICT Mentorship lectures, Michael J. Huddleston introduced a foundational refinement to entry timing: The Rule of the First Presented FVG.

When a Market Structure Shift occurs, the algorithm creates an initial impulse leg. In that initial wave, the very first 3-candle imbalance that prints is the First Presented FVG.

Why is this first gap superior to every other gap that forms later?
1. Fresh Institutional Urgency: Smart money has just cleared the order book. Their market orders have just ripped through resting liquidity. The imbalance is fresh, pure, and undefended by counter-trend capital.
2. Lowest Adverse Excursion (Drawdown): When price retraces to the First Presented FVG, it typically taps the 50% Consequent Encroachment with a sharp wick and launches immediately. You spend almost zero time sitting in agonizing drawdown.
3. Maximum Risk-to-Reward: Because you are entering at the absolute inception of the new trend, your stop loss is tight, and the entire remaining distance to the external liquidity target is open profit potential.

By contrast, when traders miss the first gap and try to enter on the 3rd or 4th FVG formed 45 minutes later, they are buying into an extended, late-stage market where institutional dealers are already preparing to take profits!`,
        keyTakeaway: 'The First Presented FVG offers the highest probability and lowest drawdown. Avoid chasing secondary and tertiary gaps late in the session.'
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
    quote: 'Smart Money Technique (SMT) Divergence is the ultimate institutional lie detector. When correlated assets decouple at a major swing point, the market maker is actively revealing which side of the book they are accumulating.',
    level: 3,
    summary: [
      'The foundational logic of SMT Divergence: Non-confirmation between correlated assets.',
      'Correlated pairs matrix: NQ vs. ES vs. YM, and EUR/USD vs. GBP/USD vs. DXY.',
      'Bullish SMT Divergence: Higher low vs. Lower low at structural support.',
      'Bearish SMT Divergence: Lower high vs. Higher high at structural resistance.',
      'The "Sick Sister" principle: Selecting the premier instrument for maximum velocity.'
    ],
    keyTerms: [
      { term: 'SMT Divergence (Smart Money Technique)', definition: 'An intermarket non-confirmation between two historically correlated assets (or an inverse correlation with the US Dollar Index) where one asset sweeps a key high/low while the other fails to do so.' },
      { term: 'Correlated Asset Matrix', definition: 'Baskets of financial instruments driven by identical macroeconomic forces that should theoretically mirror each other’s swing highs and lows.' },
      { term: 'The Crack in the Armor', definition: 'The visual manifestation of institutional accumulation or distribution where a stronger asset refuses to print a new extreme.' },
      { term: 'Sick Sister', definition: 'The correlated instrument exhibiting extreme relative weakness that offers the highest statistical velocity and cleanest delivery for short positions.' }
    ],
    practiceQuestions: [
      'If ES makes a new lower low below yesterday’s low, but NQ prints a higher low at the same time, what is this divergence signaling?',
      'Why does SMT Divergence between EUR/USD and GBP/USD provide a more reliable signal than standard RSI or MACD momentum indicators?',
      'How does the US Dollar Index (DXY) inverse correlation confirm SMT divergence in foreign exchange majors?',
      'When an SMT divergence occurs between NQ and ES, which instrument should you buy for a long trade, and which should you short for a bearish trade?',
      'Why is an SMT divergence occurring at an unmitigated Higher Timeframe Key PD Array considered an A+ setup?'
    ],
    sections: [
      {
        id: '26.1',
        title: '26.1 The Mathematical Principle of Intermarket Non-Confirmation',
        content: `In orthodox technical analysis, traders look for indicators like the Relative Strength Index (RSI) or MACD to spot divergence. These indicators are lagging mathematical derivatives of price.

In institutional tape reading, we do not look at indicator derivatives; we compare Raw Price Action across Correlated Intermarket Assets. This is SMT (Smart Money Technique) Divergence.

Financial assets do not trade in isolation. They are driven by massive institutional baskets and index arbitrage algorithms:
- US Equities: E-mini S&P (ES), E-mini Nasdaq (NQ), and E-mini Dow (YM) should theoretically move together.
- Currencies: EUR/USD and GBP/USD should move together, mirroring the inverse behavior of the US Dollar Index (DXY).

Under normal, balanced market conditions, if ES makes a new Higher High, NQ will also make a new Higher High.
However, when smart money is preparing a major reversal, The Crack in the Armor appears!

The Bearish SMT Divergence Signature:
- Asset A (e.g., ES) expands and sweeps its previous swing high, printing a HIGHER HIGH.
- Asset B (e.g., NQ) rallies but stalls, failing to reach its previous high and printing a LOWER HIGH!

What does this prove?
It proves that institutional dealers are NOT buying NQ! They have already turned off their buying algorithms on NQ and are actively distributing inventory. The breakout on ES is an engineered bull trap designed to harvest liquidity before both indices collapse together!`,
        keyTakeaway: 'SMT Divergence is the ultimate institutional lie detector. When correlated pairs decouple at key swing points, smart money is revealing their true directional bias.'
      },
      {
        id: '26.2',
        title: '26.2 How to Select the Winning Asset: The "Sick Sister" Protocol',
        content: `Once SMT Divergence confirms a reversal, an elite trader asks: "Which specific asset should I execute my trade on?"

Many beginner traders make the fatal mistake of trading the asset that made the higher high because "it looks stronger."
In institutional trading, we apply The Sick Sister Rule:

For Short Trades (Bearish Reversal):
- You short the WEAKEST asset—the one that failed to make a new high (the Sick Sister)!
- Why? Because institutional buyers have already abandoned this asset. It has zero bid support in the order book.
- When the broader market begins to sell off, the Sick Sister will plunge with double the velocity and distance of the other instruments, providing effortless profit delivery!

For Long Trades (Bullish Reversal):
- You buy the STRONGEST asset—the one that refused to make a new lower low!
- If ES plunged to a new low while NQ held a clean higher low, you BUY NQ!
- NQ has demonstrated that institutional buyers were actively absorbing supply at higher prices. When the market turns, NQ will explode upward like a coiled spring.`,
        keyTakeaway: 'For shorts, sell the Sick Sister that failed to make a high. For longs, buy the resilient leader that refused to make a new low.'
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
        content: `While ICT codifies 12 specific weekly profiles in advanced mentorship, they all emerge from four master institutional archetypes:

1. Archetype 1: Classic Tuesday Low/High of Week (The Trending Week)
- Economic Calendar: Normal week with moderate news scattered across Tuesday and Thursday.
- Behavior: Monday consolidates or drifts. Tuesday London Open creates the extreme Low/High of the week. Wednesday and Thursday expand with relentless one-directional trend momentum. Friday takes partial profit.
- Frequency: ~45% of all trading weeks.

2. Archetype 2: Midweek Reversal (The Macro Pivot Week)
- Economic Calendar: High-impact news scheduled for Wednesday morning (CPI) or Wednesday 14:00 EST (FOMC Rate Decision).
- Behavior: Monday and Tuesday engineer a convincing false trend. Wednesday news sweeps external liquidity, prints an explosive SMT divergence, and reverses the entire weekly trend, delivering in the opposite direction through Thursday and Friday.
- Frequency: ~25% of all trading weeks.

3. Archetype 3: Seek & Destroy / Range Consolidation (The Trap Week)
- Economic Calendar: Major holiday week or zero high-impact news until Friday Non-Farm Payrolls (NFP).
- Behavior: The algorithm expands neither up nor down. It sweeps Monday’s high, then sweeps Monday’s low, then sweeps Tuesday’s high. Price chops inside a tight range, harvesting retail stop losses on both sides.
- Frequency: ~15% of trading weeks.

4. Archetype 4: The One-Way Runaway Train (Extreme Expansion)
- Economic Calendar: Unexpected geopolitical shock, central bank emergency, or surprise inflation data.
- Behavior: Opens Sunday night and never looks back. Prints higher highs and higher lows every single day with almost zero retracement.
- Frequency: ~15% of trading weeks.`,
        keyTakeaway: 'Always open Forex Factory on Sunday evening. The placement of high-impact red-folder news events dictates which weekly profile the algorithm will execute.'
      },
      {
        id: '27.2',
        title: '27.2 Practical Application: Building Your Weekly Bias',
        content: `How do you operationalize the 12 Weekly Profiles into your trading routine?

The Sunday Preparation Protocol:
1. Open Forex Factory / Economic Calendar:
   - Is Wednesday empty, but Thursday has heavy data? Expect Tuesday to set the trend and Thursday to expand or reverse.
   - Is Wednesday 14:00 FOMC? Mark Monday and Tuesday as low-conviction manipulation days, and preserve your capital for the post-FOMC delivery!
2. Mark the Weekly Open Price (Sunday 18:00 EST):
   - In a bullish weekly profile, your highest-probability buy setups will ALWAYS occur below the Weekly Open price!
3. Establish the Weekly Draw on Liquidity (DOL):
   - Identify the unpurged Previous Week High (PWH) or Previous Week Low (PWL).
   - Once Tuesday confirms the Low of the Week, your sole objective is to ride the daily candles until the weekly DOL is achieved.`,
        keyTakeaway: 'Use Sunday calendar analysis to identify the likely weekly profile. Anchor your bias around the Weekly Open and target the Previous Week High or Low.'
      }
    ]
  }
];
