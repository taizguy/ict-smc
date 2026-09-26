import { MasterclassItem } from './masterclassData';

export const theinnercircletradersNewMasterclasses: MasterclassItem[] = [
  // 21. ICT Venom Model
  {
    id: 'mc_21_venom_model',
    number: 21,
    title: 'The ICT Venom Model Masterclass (2025 Framework)',
    subtitle: 'Five-Stage Institutional Confluence: MMXM, CRT Boundary, SMT At Extremes & First Presented FVG',
    category: 'entry_model_5',
    diagramType: 'unicorn_model',
    coreRule: 'The Venom Model requires that price sweeps a pre-session CRT Reference Candle boundary while printing clear SMT divergence against a correlated asset, followed by an immediate CISD candle close and execution on the First Presented FVG targeting the opposing CRT extreme.',
    orderOfOperations: [
      'Stage 1 (MMXM Alignment): Confirm Higher Timeframe Daily Bias and current curve phase (Accumulation/Distribution).',
      'Stage 2 (CRT Boundary): Mark the High and Low of the CRT Reference Candle (Asian Session for London, London Session for NY).',
      'Stage 3 (SMT at Extreme): Watch for manipulation beyond the Reference Candle extreme. Require SMT divergence between correlated pairs (NQ vs ES, or EURUSD vs GBPUSD).',
      'Stage 4 (CISD & First FVG): Wait for a Change in State of Delivery candle body close and mark the First Presented FVG formed during the displacement.',
      'Stage 5 (Execution & Delivery): Limit order at 50% Consequent Encroachment of the First Presented FVG, stop loss beyond the manipulation wick, targeting the opposing Reference Candle boundary.'
    ],
    keyMistakes: [
      'Taking the FVG before SMT divergence confirms at the manipulation sweep.',
      'Entering on a 2nd or 3rd FVG rather than the First Presented FVG, which offers the lowest drawdown.',
      'Forgetting to take full profit at the opposing Reference Candle boundary.'
    ],
    invalidationChecklist: [
      'Both correlated assets make new highs simultaneously without any SMT divergence.',
      'The First Presented FVG candle closes completely beyond its distal boundary, indicating a runaway expansion rather than a rebalance.'
    ],
    riskRules: [
      'Maximum 1% account risk per execution.',
      'Stop loss strictly anchored beyond the manipulation swing high/low.',
      'Target must offer at least a 1:2.5 risk-to-reward ratio to the opposing CRT boundary.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Map Reference Candle', detail: 'Before the session starts, draw horizontal rays at the High and Low of the preceding session candle.' },
      { step: 2, title: 'Monitor the Manipulation Sweep', detail: 'Observe price piercing the boundary during the first 30-45 minutes of the session.' },
      { step: 3, title: 'Verify SMT Divergence', detail: 'Verify that the sister asset failed to sweep the equivalent level, indicating institutional non-confirmation.' },
      { step: 4, title: 'Spot the First Presented FVG', detail: 'Identify the very first three-candle imbalance created by the displacement candle.' },
      { step: 5, title: 'Execute and Manage', detail: 'Set limit order at Consequent Encroachment. Take 70% off at equilibrium and 30% at the opposing boundary.' }
    ],
    visualAnatomy: 'Dual-chart layout: Reference Candle boundaries marked. Arrow sweeps high on Asset A with SMT failure on Asset B. Displacement candle creates a highlighted First Presented FVG box. Retest wick tags the box and runs to opposing low.',
    relatedPdArrays: ['Candle Range Theory', 'First Presented FVG', 'SMT Divergence', 'CISD', 'Breaker Block'],
    quote: 'The Venom Model does not give price a second chance. It waits for the exact intersection of time, intermarket failure, and algorithmic delivery before striking.'
  },

  // 22. ICT Reaper IFVG
  {
    id: 'mc_22_reaper_ifvg',
    number: 22,
    title: 'The ICT Reaper IFVG Masterclass',
    subtitle: 'The Inversion-of-Inversion Trap That Liquidates Retail SMC Breakout Traders',
    category: 'pd_array_15',
    diagramType: 'ifvg_inversion',
    coreRule: 'When an Inversion Fair Value Gap (IFVG) is breached by price to induce retail breakout buyers, and immediately engulfed back through in the opposite direction during an algorithmic macro, the setup transforms into a Reaper IFVG targeting the trapped retail stop losses.',
    orderOfOperations: [
      'Identify an existing FVG that gets penetrated upward/downward by price outside an active macro window.',
      'Observe retail traders treating the level as an Inversion FVG (anticipating support/resistance flip).',
      'Watch for a shallow, weak bounce designed to induce retail stop placement behind the level.',
      'As the macro activates (e.g. 09:50 AM or 14:50 PM), look for a heavy displacement candle that cuts completely back through the IFVG.',
      'Enter on the re-inversion retest, targeting the resting liquidity pools beneath the induced swing points.'
    ],
    keyMistakes: [
      'Stubbornly holding onto an IFVG long position while massive institutional selling engulfs the entire zone.',
      'Failing to verify whether the higher timeframe trend agrees with the re-inversion direction.'
    ],
    invalidationChecklist: [
      'If price reclaims the outer boundary of the Reaper zone with a full candle body close, the setup is invalidated.'
    ],
    riskRules: [
      'Risk 0.75% to 1.0% per setup.',
      'Stop loss placed just beyond the fakeout manipulation high/low.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Identify Retail Inducement', detail: 'Notice price forming a shallow bounce on an apparent IFVG during low-volume hours.' },
      { step: 2, title: 'Observe the Reaper Strike', detail: 'A macro candle violently slices back through the IFVG, closing below both boundaries.' },
      { step: 3, title: 'Mark the Reaper Retest', detail: 'Place a limit order at the bottom of the newly re-inverted gap.' },
      { step: 4, title: 'Target Trapped Liquidity', detail: 'Target the obvious cluster of retail stop orders resting beneath the inducement bounce.' }
    ],
    visualAnatomy: 'Box showing broken FVG. Small wick bounce creates a fake IFVG support line. Giant red candle slices down through the box. Arrow points to the underside retest marked "Reaper Short Entry".',
    relatedPdArrays: ['Inversion Fair Value Gap', 'Consequent Encroachment', 'Inducement', 'Draw on Liquidity'],
    quote: 'The market maker knows where retail smart money puts their stop losses. The Reaper IFVG is designed specifically to harvest those stops.'
  },

  // 23. ICT Suspension Block
  {
    id: 'mc_23_suspension_block',
    number: 23,
    title: 'The ICT Suspension Block Masterclass',
    subtitle: 'The Continuation Order Block Hanging Mid-Air Between Internal & External Liquidity',
    category: 'pd_array_15',
    diagramType: 'propulsion_block',
    coreRule: 'In an urgent Low Resistance Liquidity Run (LRLR), price does not pull back to origin order blocks. The Suspension Block is a single counter-trend candle formed in open space midway between dealing ranges that serves as an institutional in-flight refueling station.',
    orderOfOperations: [
      'Confirm a high-urgency trending environment (e.g. post-CPI, NFP trend day, or major daily breakout).',
      'Verify that the external Draw on Liquidity is distant and untouched.',
      'Identify the single counter-trend candle (or two small paused candles) formed mid-trend without breaking structure.',
      'Mark the High and Low of this suspended candle body.',
      'Enter on the very first touch of the suspension block boundary, risking a tight stop below the block body, targeting the external liquidity pool.'
    ],
    keyMistakes: [
      'Waiting for a 50% discount equilibrium retracement on a day driven by urgent algorithmic momentum.',
      'Using suspension blocks during choppy, range-bound sessions where deep pullbacks are expected.'
    ],
    invalidationChecklist: [
      'A candle body close violating more than 50% of the suspension block candle body invalidates the continuation thesis.'
    ],
    riskRules: [
      'Risk 1% with extremely tight stops placed just beyond the suspension candle body.',
      'Take partial profits as price reaches intermediate liquidity pools, letting runners target the external draw.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Confirm Trending Regime', detail: 'Verify market is in Low Resistance Liquidity Run mode with clear HTF bias.' },
      { step: 2, title: 'Spot the Suspended Candle', detail: 'Identify the isolated opposing candle that pauses the trend without breaking previous swing points.' },
      { step: 3, title: 'Execute on Touch', detail: 'Enter on limit as price taps the outer boundary of the suspension block.' },
      { step: 4, title: 'Ride to External Target', detail: 'Hold position through minor pauses as the algorithm sprints to the external liquidity pool.' }
    ],
    visualAnatomy: 'Steep upward trend. Mid-way up the chart, an isolated small red candle sits between two green expansion bars. Retest arrow tags the high of the red candle and resumes the vertical ascent.',
    relatedPdArrays: ['Order Block', 'Propulsion Block', 'Low Resistance Liquidity Run', 'Draw on Liquidity'],
    quote: 'When the algorithm is in a hurry, it does not walk all the way back home to get fuel. It refuels in mid-air at the Suspension Block.'
  },

  // 24. ICT RDRB (Redelivered Balanced Price Range)
  {
    id: 'mc_24_rdrb_balanced_price_range',
    number: 24,
    title: 'The ICT RDRB Masterclass',
    subtitle: 'When the Balanced Price Range (BPR) Delivers and Defends a Second Time',
    category: 'pd_array_15',
    diagramType: 'fvg_formation',
    coreRule: 'An RDRB (Redelivered Balanced Price Range) occurs when an established two-sided Balanced Price Range is revisited a second time and defended with Consequent Encroachment (50%) wick rejections, offering institutional confirmation with near-zero drawdown.',
    orderOfOperations: [
      'Locate an established Balanced Price Range (BPR) where a bullish and bearish FVG share identical price coordinates.',
      'Verify that price delivered into the BPR once before and produced a clean reaction (First Delivery).',
      'Monitor price returning to the BPR for a second test (The RDRB phase).',
      'Check the 50% Consequent Encroachment (CE) line of the BPR: candle bodies MUST NOT close beyond this midpoint.',
      'Enter upon the close of the wick rejection candle, setting stop just outside the distal edge of the BPR.'
    ],
    keyMistakes: [
      'Entering before the second-test candle closes, risking getting run over by an unexpected expansion.',
      'Confusing a standard single-sided FVG retest with a genuine two-sided BPR redelivery.'
    ],
    invalidationChecklist: [
      'A full candle body close through the 50% Consequent Encroachment or distal boundary of the BPR.'
    ],
    riskRules: [
      'Risk 1% with high win-rate expectancy.',
      'Stop loss positioned strictly behind the BPR outer boundary.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Map the Overlapping BPR', detail: 'Highlight the overlapping price zone between the bullish and bearish imbalance candles.' },
      { step: 2, title: 'Observe the First Reaction', detail: 'Ensure the market has already reacted off this zone at least once.' },
      { step: 3, title: 'Validate 50% CE Respect', detail: 'Watch the second approach wick into the level without bodies penetrating the midpoint.' },
      { step: 4, title: 'Execute with High Conviction', detail: 'Enter on the close of the rejection candle targeting the opposing session high/low.' }
    ],
    visualAnatomy: 'Shaded horizontal band representing the BPR. Dotted line down the middle for Consequent Encroachment. Two distinct touches: Touch 1 shows initial bounce; Touch 2 shows twin wicks kissing the CE line and rocketing away.',
    relatedPdArrays: ['Balanced Price Range (BPR)', 'Consequent Encroachment', 'Fair Value Gap', 'Mitigation'],
    quote: 'The first delivery into a BPR is anticipation. The RDRB is algorithmic confirmation: the order book has demonstrated it will not allow price through.'
  },

  // 25. Candle Range Theory (CRT) Strategy
  {
    id: 'mc_25_crt_candle_range_theory',
    number: 25,
    title: 'Candle Range Theory (CRT) Strategy Masterclass',
    subtitle: 'Pre-Session Preparation & Session-Specific Boundary Delivery Setups',
    category: 'masterclass_34',
    diagramType: 'po3_amd',
    coreRule: 'Before every session, mark the High and Low of the designated Reference Candle. Anticipate an initial manipulation sweep of one extreme, confirm with CISD/MSS, and ride the algorithmic delivery across to the opposite Reference Candle boundary.',
    orderOfOperations: [
      'Step 1 (Reference Candle Selection): For London Open, mark Asian session candle (20:00-00:00 EST). For NY Open, mark London session candle (02:00-05:00 EST).',
      'Step 2 (HTF Bias Check): Check the 4-Hour and Daily bias to determine which boundary is likely the manipulation target vs the delivery target.',
      'Step 3 (Manipulation Sweep): Wait for the session open to drive price beyond one extreme of the Reference Candle.',
      'Step 4 (CISD & FVG Trigger): Wait for a Change in State of Delivery candle body close and enter on the First Presented FVG.',
      'Step 5 (Delivery to Opposing Boundary): Take partial profit at 50% of the Reference Candle and full profit at the opposing boundary.'
    ],
    keyMistakes: [
      'Chasing the initial breakout of the Reference Candle instead of recognizing it as the Judas manipulation.',
      'Holding past the opposing Reference Candle boundary when the daily profile is consolidating.'
    ],
    invalidationChecklist: [
      'Price closes multiple consecutive candle bodies outside the Reference Candle without showing any signs of displacement reversal.'
    ],
    riskRules: [
      'Risk 1% per CRT setup.',
      'Stop loss placed beyond the manipulation wick extreme.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Draw Reference Rays', detail: 'Before 02:00 EST or 09:30 EST, draw horizontal lines on the Reference Candle High and Low.' },
      { step: 2, title: 'Wait for the Judas Sweep', detail: 'Do not touch the keyboard until price interacts with one of the two boundaries.' },
      { step: 3, title: 'Confirm the Shift', detail: 'Look for an LTF displacement candle closing back inside the Reference Candle boundary.' },
      { step: 4, title: 'Ride the Range', detail: 'Execute on the FVG and target the opposite boundary for a clean 1:2 to 1:3 delivery.' }
    ],
    visualAnatomy: 'Box bounding the Asian session candle. Blue line at High, red line at Low. 02:30 AM manipulation dips below the red line. 03:00 AM Silver Bullet shoots upward, slicing through the range to tag the blue line.',
    relatedPdArrays: ['Asian Range', 'Judas Swing', 'Reference Candle', 'First Presented FVG', 'CISD'],
    quote: 'Trading without Candle Range Theory is like sailing without a map. Once you map the Reference Candle, the entire session becomes an orderly trip from one shore to the other.'
  },

  // 26. ICT Sick Sister Strategy
  {
    id: 'mc_26_sick_sister_strategy',
    number: 26,
    title: 'The ICT Sick Sister Strategy Masterclass',
    subtitle: 'Pair Selection via SMT Divergence: Trading the Weakest or Strongest Correlated Asset',
    category: 'algorithmic_signatures',
    diagramType: 'nested_structure',
    coreRule: 'When SMT divergence occurs across a basket of correlated assets, identify the "Sick Sister"—the asset showing relative weakness by failing to reach new highs—and execute short positions exclusively on that asset for maximum speed and downside expansion.',
    orderOfOperations: [
      'Display correlated assets side by side: NQ, ES, and YM (or EURUSD and GBPUSD).',
      'As the market approaches a major liquidity pool, watch the swing points at the exact same minute timestamp.',
      'Identify the leader (the asset that breaches the liquidity pool to make a higher high).',
      'Identify the Sick Sister (the asset that fails to reach the high, printing a clear lower high).',
      'Execute short trades exclusively on the Sick Sister upon the appearance of its first displacement FVG, targeting its deeper liquidity pools.'
    ],
    keyMistakes: [
      'Shorting the leader because it "looks more overbought"—the leader will often fight back and chop.',
      'Ignoring the strategy on Index futures where it provides daily actionable separation between NQ and ES.'
    ],
    invalidationChecklist: [
      'The Sick Sister unexpectedly prints a massive green displacement bar that takes out the divergence high.'
    ],
    riskRules: [
      'Risk 1% with stop loss above the swing high of the Sick Sister.',
      'Target previous day lows or major sell-side liquidity pools.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Multi-Chart Layout', detail: 'Keep synchronized 1-minute and 5-minute charts of NQ and ES open side by side.' },
      { step: 2, title: 'Spot the Divergence', detail: 'Notice ES taking out the session high at 09:55 AM while NQ stalls 25 points below its high.' },
      { step: 3, title: 'Pick the Sick Sister', detail: 'Select NQ as the execution vehicle because institutional sellers are already active in its book.' },
      { step: 4, title: 'Execute on Displacement', detail: 'Enter on the 1m NQ FVG and target the session low.' }
    ],
    visualAnatomy: 'Side-by-side chart. Left pane shows ES making a higher high. Right pane shows NQ making a lower high. Red execution arrow on NQ shows an aggressive downward plunge while ES slowly drifts down.',
    relatedPdArrays: ['SMT Divergence', 'Relative Strength', 'First Presented FVG', 'Order Book Absorption'],
    quote: 'Always trade the path of least resistance. The Sick Sister has already shown that buyers have abandoned it; when the dam breaks, it floods first.'
  },

  // 27. ICT Double Purge Model
  {
    id: 'mc_27_double_purge',
    number: 27,
    title: 'The ICT Double Purge Masterclass',
    subtitle: 'What a Dual-Sided Liquidity Sweep Means and How to Trade the Genuine Trend',
    category: 'entry_model_5',
    diagramType: 'liquidity_sweep',
    coreRule: 'When institutional order matching requires massive volume, the algorithm executes a Double Purge: first sweeping one side of the range (Sweep 1), then aggressively running to sweep the opposite side (Sweep 2), before committing to the true multi-hour macro trend.',
    orderOfOperations: [
      'Identify a clear consolidation range with resting Buy-side Liquidity (BSL) and Sell-side Liquidity (SSL).',
      'Observe Sweep 1: Price punches through one side and immediately rejects (do NOT enter heavy here).',
      'Watch Sweep 2: Price traverses the entire range and punches through the opposite extreme, triggering the opposing stop cluster.',
      'Wait for the Sweep 2 rejection candle to print a decisive Change in State of Delivery (CISD) back inside the range.',
      'Enter on the subsequent Fair Value Gap, riding the newly cleared path toward HTF objectives.'
    ],
    keyMistakes: [
      'Taking maximum position size on Sweep 1 and getting wiped out by Sweep 2.',
      'Becoming frustrated by the dual-sided volatility instead of recognizing the classic institutional clearing signature.'
    ],
    invalidationChecklist: [
      'Price continues expanding indefinitely after Sweep 2 without printing a displacement reversal.'
    ],
    riskRules: [
      'Risk 0.75% on the confirmed Sweep 2 reversal.',
      'Stop loss positioned just beyond the Sweep 2 extreme wick.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Recognize the Setup', detail: 'Notice a consolidation preceding high-impact news or the equities cash open.' },
      { step: 2, title: 'Let Sweep 1 Occur', detail: 'Allow the first liquidity sweep to take out retail breakout traders without getting involved.' },
      { step: 3, title: 'Anticipate Sweep 2', detail: 'When price rapidly reverses to attack the opposite boundary, prepare your order template.' },
      { step: 4, title: 'Execute Post-Sweep 2', detail: 'Enter on the FVG created as price rejects Sweep 2, targeting the true daily trend.' }
    ],
    visualAnatomy: 'Box with upper and lower boundaries. Arrow 1 wicks below the bottom line. Arrow 2 shoots up and wicks above the top line. Arrow 3 prints a thick trend arrow accelerating down through the center of the chart.',
    relatedPdArrays: ['Liquidity Sweep', 'Turtle Soup', 'Seek & Destroy', 'Fair Value Gap'],
    quote: 'The double purge clears both sides of the street. Once all the parked cars have been towed away, the institutional train has a completely clear track.'
  },

  // 28. ICT Hangman PD Array
  {
    id: 'mc_28_hangman_pd_array',
    number: 28,
    title: 'The ICT Hangman PD Array Masterclass',
    subtitle: 'Wick Rejection Confirmation & Consequent Encroachment Defense',
    category: 'pd_array_15',
    diagramType: 'order_block',
    coreRule: 'When a candle wick sweeps an institutional liquidity pool or PD array and the candle body closes firmly in the opposite half (leaving a wick comprising ≥65% of the total range), it forms a Hangman signature. The 50% Consequent Encroachment of that wick acts as an unbreakable institutional rejection level.',
    orderOfOperations: [
      'Identify an approaching Higher Timeframe PD Array, session high/low, or opening gap (NDOG/NWOG).',
      'Watch price aggressively probe into the level during an active session.',
      'Ensure the candle closes with a long rejection wick (at least 2x the height of the candle body) and the body closes back within the prior range.',
      'Calculate the 50% Consequent Encroachment (CE) midpoint of the wick.',
      'Enter on the retest of the wick (up to 50% CE) with stop loss placed at the tip of the wick, targeting the opposite dealing range.'
    ],
    keyMistakes: [
      'Entering while the candle is still printing—many long wicks fill in and close as full-body expansion bars.',
      'Placing stop loss inside the wick instead of giving the tip of the wick proper invalidation clearance.'
    ],
    invalidationChecklist: [
      'Any subsequent candle body closing beyond the 50% Consequent Encroachment or tip of the Hangman wick.'
    ],
    riskRules: [
      'Risk 1% with stop loss placed 2 ticks beyond the wick extreme.',
      'Partial profits taken at 1:2 R:R and remainder trailed behind newly formed order blocks.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Identify the Interaction', detail: 'Wait for price to pierce a significant daily or 4-hour resistance level.' },
      { step: 2, title: 'Check the Wick Ratio', detail: 'Confirm that the candle closed and the wick represents at least 65% of the total candle length.' },
      { step: 3, title: 'Mark the 50% CE', detail: 'Draw a horizontal ray at the exact 50% midpoint between the wick tip and candle body.' },
      { step: 4, title: 'Enter on Retest', detail: 'Place limit order at the 50% CE or enter upon an LTF displacement confirmation.' }
    ],
    visualAnatomy: 'Large candlestick with a tiny body at the bottom and an elongated upper wick piercing a red horizontal resistance ray. A dotted horizontal line marks the 50% midpoint of the wick with an arrow labeled "CE Retest Entry".',
    relatedPdArrays: ['Consequent Encroachment', 'Order Block', 'Rejection Block', 'Turtle Soup'],
    quote: 'Wicks do the dirty work of the algorithm: they sweep liquidity, trigger stops, and absorb passive limit orders. The candle body shows where smart money agreed to do business.'
  },

  // 29. Algorithmic Macro Windows Delivery Schedule
  {
    id: 'mc_29_algorithmic_macros_schedule',
    number: 29,
    title: 'The 8 Institutional Macro Windows Masterclass',
    subtitle: 'The Exact Intraday Times When Algorithmic Order Injection Reprices the Market',
    category: 'mentorship_2026',
    diagramType: 'session_timeline',
    coreRule: 'Algorithmic market makers do not run continuous random price movement. Price delivery is concentrated into 8 precise 20-minute macro windows throughout the New York trading day, where the Interbank Price Delivery Algorithm (IPDA) injects liquidity to reprice to the nearest PD array or liquidity pool.',
    orderOfOperations: [
      '02:33 - 03:00 EST (London Pre-Open Macro): Prepares London Open by engineering Judas swing sweeps of Asian range.',
      '08:50 - 09:10 EST (Pre-Market Equities Macro): Balances overnight futures inventory and tests NDOG/NWOG opening gaps.',
      '09:50 - 10:10 EST (Morning Silver Bullet Macro): The premier morning macro; sweeps opening 09:30 range and creates the primary 2022 FVG.',
      '10:50 - 11:10 EST (Late Morning Expansion Macro): Concludes morning trend leg or sets the morning session extreme.',
      '11:50 - 12:10 EST (London Fix & Midday Macro): Executes European fixes and enters the midday lunch consolidation.',
      '13:10 - 13:40 EST (Afternoon Resumption Macro): Re-activates institutional order flow for the afternoon expansion leg.',
      '14:50 - 15:10 EST (Market on Close / MOC Macro): Executes massive mutual fund and institutional rebalancing orders.',
      '15:50 - 16:00 EST (Closing Auction Cross Macro): Determines official equities closing settlement prices (do not enter new positions).'
    ],
    keyMistakes: [
      'Entering positions at 12:30 PM EST during the dead lunch hour when algorithms are dormant.',
      'Trading outside the macro windows and wondering why price is moving with low volatility and chopping.'
    ],
    invalidationChecklist: [
      'If a macro window passes without any displacement or interaction with a PD array, the market is in low-conviction consolidation.'
    ],
    riskRules: [
      'Strictly schedule trade setups to execute within the active macro windows.',
      'Shut down trading by 11:15 AM EST if morning targets are achieved.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Set Alarm Clocks', detail: 'Set alerts at 5 minutes prior to each major macro window.' },
      { step: 2, title: 'Identify Pending Draw', detail: 'Before the macro starts, identify which PD array or liquidity pool is within striking distance.' },
      { step: 3, title: 'Observe Injection', detail: 'Watch for rapid, decisive displacement bars printing as the clock strikes the macro minute.' },
      { step: 4, title: 'Exit or Trail', detail: 'Take profits as the macro window concludes, protecting against counter-macro pullbacks.' }
    ],
    visualAnatomy: 'Timeline bar across a 24-hour day with 8 highlighted color blocks marking the exact EST start and end minutes, each paired with its specific algorithmic function.',
    relatedPdArrays: ['Silver Bullet', 'IPDA Lookback', 'Killzones', 'Market on Close (MOC)'],
    quote: 'Price is not random; it is on a clock. If you know the exact minute the algorithm switches on, you never have to sit at your desk staring at empty candles.'
  }
];
