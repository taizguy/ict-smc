import { ConceptComparison } from '../types';

export const theinnercircletradersNewComparisons: ConceptComparison[] = [
  // 1. CISD vs MSS
  {
    id: 'cisd_vs_mss',
    title: 'CISD (Change in State of Delivery) vs. MSS (Market Structure Shift)',
    conceptA: {
      name: 'Change in State of Delivery (CISD)',
      summary: 'The earliest algorithmic indication that price delivery has shifted from buy-program to sell-program, defined by candle bodies closing through the opening price of the delivery sequence.',
      keyPoints: [
        'Confirmed by candle bodies closing through the opposing sequence open, not swing points',
        'Occurs immediately at or near the liquidity sweep extreme',
        'Offers the tightest possible stop-loss invalidation and highest risk-to-reward ratio (often 1:4 to 1:6)',
        'Technically represents the creation of an institutional Order Block'
      ],
      idealCondition: 'A candle body closes below the opening price of the lowest green candle that swept previous day high.'
    },
    conceptB: {
      name: 'Market Structure Shift (MSS)',
      summary: 'The confirmation that a multi-swing trend regime has reversed, requiring a decisive displacement break through a prior significant structural swing low or high.',
      keyPoints: [
        'Confirmed by a displacement break through a recognized structural swing point',
        'Occurs later in the reversal cycle, after price has already traveled a significant distance',
        'Provides higher structural certainty but requires a wider stop loss and yields lower risk-to-reward',
        'Traditional SMC confirmation signal that most retail traders wait for'
      ],
      idealCondition: 'A strong displacement candle punches through a major 15-minute swing low with an obvious FVG.'
    },
    keyDifference: 'CISD is the algorithmic engine shifting gears at the candle level; MSS is the structural confirmation on the swing chart. CISD gives sniper entries with small stops; MSS gives conservative confirmation with larger stops.',
    commonConfusion: 'Thinking an MSS is required before entering. Waiting for the MSS often means entering after half the expansion move has already completed.',
    decisionRule: 'Enter aggressively on CISD at session extremes with SMT divergence; use MSS when trading higher timeframe daily swings or when liquidity was not decisively swept.',
    diagramSnippet: 'Liquidity Sweep ──> [CISD: Candle Body Closes Through Open] ──(Price Drops 20 pts)──> [MSS: Swing Low Breaks]'
  },

  // 2. Standard IFVG vs Reaper IFVG
  {
    id: 'standard_ifvg_vs_reaper_ifvg',
    title: 'Standard IFVG vs. ICT Reaper IFVG (The Predatory Inversion Trap)',
    conceptA: {
      name: 'Standard Inversion FVG (IFVG)',
      summary: 'A Fair Value Gap that is breached with displacement, cleanly flipping its institutional role from support to resistance (or vice-versa).',
      keyPoints: [
        'Functions as a classic support-becomes-resistance flip',
        'Supported by HTF directional alignment in the direction of the inversion',
        'Candle bodies respect the outer edge or 50% Consequent Encroachment of the broken gap',
        'Provides high-probability trend-continuation entries during active macros'
      ],
      idealCondition: 'A bearish FVG is sliced upward during a bullish morning trend; price retests the top of the box and launches upward.'
    },
    conceptB: {
      name: 'ICT Reaper IFVG',
      summary: 'A predatory trap where an apparent IFVG breach lures retail SMC breakout traders into long/short positions, only to immediately re-invert violently and harvest their stop losses.',
      keyPoints: [
        'Engineered against retail SMC traders who blindly buy every broken FVG',
        'Occurs against the true Higher Timeframe Draw on Liquidity',
        'Price produces a shallow, weak reaction before a massive displacement candle cuts back through',
        'The true trade is shorting the re-inversion to feast on trapped retail stop orders'
      ],
      idealCondition: 'An apparent bullish IFVG bounce fails as a 09:50 AM macro candle engulfs the zone downward, liquidating all trapped longs.'
    },
    keyDifference: 'A standard IFVG holds as new support/resistance because the HTF program supports it; a Reaper IFVG fails aggressively because the initial inversion was a manufactured retail trap.',
    commonConfusion: 'Re-buying a failing IFVG multiple times. If the IFVG candle bodies close completely back through the zone, it is a Reaper setup—flip your position.',
    decisionRule: 'Always verify HTF Draw on Liquidity: if the HTF draw is downward, treat upward IFVG breaches as potential Reaper traps and look to short the re-inversion.',
    diagramSnippet: 'FVG ──[Breached Up]──> Retail Buys IFVG ──[Reaper Macro Candle Slices Down]──> Trapped Longs Liquidated'
  },

  // 3. Suspension Block vs Propulsion Block vs Order Block
  {
    id: 'suspension_vs_propulsion_vs_ob',
    title: 'ICT Suspension Block vs. Propulsion Block vs. Standard Order Block',
    conceptA: {
      name: 'ICT Suspension Block (2025)',
      summary: 'A single counter-trend continuation candle formed mid-air in open space between internal and external liquidity pools during an aggressive trend run.',
      keyPoints: [
        'Suspended in open space without interacting with prior swing structure',
        'Forms when algorithmic momentum is too high to allow deep 50% discount pullbacks',
        'Acts as an in-flight refueling station during Low Resistance Liquidity Runs (LRLR)',
        'Requires entry on the very first touch with extremely tight stops behind the body'
      ],
      idealCondition: 'A 5-minute red candle sits isolated mid-trend between 20,400 and 20,500 on NQ; price wicks it and surges to ATH.'
    },
    conceptB: {
      name: 'Propulsion Block',
      summary: 'A candle that trades into and rejects an already active Order Block, creating a secondary springboard that propels price into rapid expansion.',
      keyPoints: [
        'Must physically retest and overlap with a pre-existing validated Order Block',
        'Acts as a secondary accelerator candle rather than an isolated mid-trend pause',
        'Demonstrates institutional defense of an already established level',
        'Invalidated if price trades below the 50% midpoint of the underlying Order Block'
      ],
      idealCondition: 'Price pulls back into an existing Bullish Order Block, forms a green rejection candle, and then retests that specific rejection candle.'
    },
    keyDifference: 'A Propulsion Block sits directly on top of an existing Order Block; a Suspension Block hangs isolated in open air mid-trend between dealing ranges.',
    commonConfusion: 'Waiting for an Order Block or Propulsion Block during an runaway trend day. Suspension blocks are the only entries the algorithm offers on maximum-velocity trend days.',
    decisionRule: 'Use standard Order Blocks at dealing range origins, Propulsion Blocks on initial breakout retests, and Suspension Blocks mid-trend during Low Resistance Liquidity Runs.',
    diagramSnippet: 'Origin OB [Ground Level] ──> Propulsion Block [First Launchpad] ──> Suspension Block [Mid-Air Refuel] ──> Target [Space]'
  },

  // 4. Candle Range Theory (CRT) vs Power of 3 (AMD)
  {
    id: 'crt_vs_amd',
    title: 'Candle Range Theory (CRT) vs. Power of 3 (Accumulation, Manipulation, Distribution)',
    conceptA: {
      name: 'Candle Range Theory (CRT)',
      summary: 'A systematic session-execution framework that uses a specific prior time-container candle (e.g. Asian session or London session) as a mechanical Reference Candle.',
      keyPoints: [
        'Anchored to specific candle boundaries (Asian session high/low for London; London high/low for NY)',
        'Directly dictates the two price coordinates that must be monitored before session open',
        'Provides mechanical entry, stop, and take-profit targets across the reference range',
        'Operationalizes PO3 into concrete, objective horizontal lines on the chart'
      ],
      idealCondition: 'Drawing lines at Asian High and Low at 01:55 EST, watching 02:30 EST sweep the Low, and targeting the High.'
    },
    conceptB: {
      name: 'Power of Three (PO3 / AMD)',
      summary: 'The foundational macroeconomic cycle describing how algorithmic market makers engineer Open, High, Low, and Close (OHLC) delivery across all timeframes.',
      keyPoints: [
        'Universal theoretical concept: Accumulation -> Manipulation -> Distribution',
        'Applies to daily candles, weekly bars, 4-hour blocks, and 1-minute waves',
        'Explains WHY price fakes out in the opposite direction of the daily trend after the open',
        'Broad conceptual template rather than a specific session-line tool'
      ],
      idealCondition: 'Daily open at 00:00 EST, morning Judas manipulation lower to form Low of Day, afternoon expansion to High of Day.'
    },
    keyDifference: 'PO3 is the universal algorithmic philosophy (AMD cycle); CRT is the specific session-by-session tactical execution framework that puts exact price levels on the PO3 manipulation and distribution phases.',
    commonConfusion: 'Trying to trade PO3 without reference boundaries. CRT provides the exact lines where PO3 manipulation begins and ends.',
    decisionRule: 'Understand PO3 to know what the algorithm is doing in principle; use CRT to mark the exact Reference Candle lines on your chart for daily execution.',
    diagramSnippet: 'PO3 Principle: [Accumulate ──> Manipulate ──> Distribute] ===> CRT Tactical Lines: [Asian Low Sweep ──> Ride to Asian High]'
  },

  // 5. Balanced Price Range (BPR) vs. RDRB (Redelivered BPR)
  {
    id: 'bpr_vs_rdrb',
    title: 'Balanced Price Range (BPR) vs. ICT RDRB (Redelivered BPR)',
    conceptA: {
      name: 'Balanced Price Range (BPR)',
      summary: 'A price zone formed by overlapping bullish and bearish Fair Value Gaps, representing instantaneous two-sided institutional rebalancing.',
      keyPoints: [
        'Created when an aggressive up-move is immediately followed by an aggressive down-move (or vice-versa)',
        'Both sides of the book (buy-side and sell-side) have been delivered efficiently',
        'Acts as an immediate magnet and barrier on its first test',
        'Traded on anticipation of initial reaction'
      ],
      idealCondition: 'A 15-minute BISI and subsequent SIBI overlap perfectly between 5,830 and 5,840.'
    },
    conceptB: {
      name: 'ICT RDRB (Redelivered BPR)',
      summary: 'The second delivery into an established BPR where institutional algorithms defend the zone with Consequent Encroachment wick rejections.',
      keyPoints: [
        'Requires that the BPR has already produced a successful first reaction',
        'Enters on confirmation: order book defense has already been empirically verified',
        'Candle bodies must strictly respect the 50% Consequent Encroachment (CE) midpoint',
        'Offers significantly lower drawdown and higher win-rate expectancy than first touches'
      ],
      idealCondition: 'Price returns to the 5,830-5,840 BPR at 14:50 MOC macro; twin wicks kiss 5,835 CE and reject sharply.'
    },
    keyDifference: 'BPR is the initial formation and first test; RDRB is the second institutional re-delivery that provides confirmation that smart money continues to defend the balance.',
    commonConfusion: 'Assuming every BPR test will hold. The RDRB requires checking that candle bodies do not close beyond the 50% CE on the second test.',
    decisionRule: 'Take lighter risk on first BPR touches (anticipation); take standard or aggressive risk on RDRB touches with confirmed wick rejections (confirmation).',
    diagramSnippet: 'Overlapping FVGs ──[Touch 1: BPR Reaction]──> [Touch 2: RDRB 50% CE Rejection & Rocket]'
  },

  // 6. Silver Bullet 60-Minute Precision Window vs 3 AM London Open
  {
    id: 'silver_bullet_vs_3am_london',
    title: 'Silver Bullet 60-Minute Window vs. 3 AM London Open Execution',
    conceptA: {
      name: 'ICT Silver Bullet Strategy',
      summary: 'A strictly mechanical 60-minute execution window (03:00-04:00, 10:00-11:00, 14:00-15:00 EST) designed to harvest a fixed 10-15 handle delivery off the First Presented FVG.',
      keyPoints: [
        'Strict 60-minute time constraint: trade must set up and trigger within the hour',
        'Rules-based targeting: 10-15 handles on NQ/ES, 15-20 pips on EUR/GBP',
        'Executes exclusively on the First Presented FVG following liquidity interaction',
        'Designed for prop firm traders needing repeatable, mechanical daily expectancy'
      ],
      idealCondition: '10:05 AM EST prints a 5-minute MSS and FVG on NQ; trader enters, hits +15 handles, and closes terminal by 10:30 AM.'
    },
    conceptB: {
      name: 'Classical 3 AM London Open Execution',
      summary: 'A multi-hour session profile targeting the creation of the High or Low of the Day through the London Judas Swing.',
      keyPoints: [
        'Broad 3-hour window (02:00-05:00 EST) capturing the full European expansion leg',
        'Targets multi-session liquidity: Asian High/Low, Previous Day High/Low, or HTF targets',
        'Captures 40 to 100+ pips by holding through minor intraday pullbacks',
        'Requires endurance and flexibility across multiple algorithmic macro windows'
      ],
      idealCondition: 'London open sweeps Asian low at 02:40 EST; trader holds long through 05:00 EST London close for a +65 pip day.'
    },
    keyDifference: 'Silver Bullet is a surgical 60-minute, fixed-target scalp (10-15 handles); Classical London Open is a full session swing targeting the daily high/low formation (40-100 pips).',
    commonConfusion: 'Holding a Silver Bullet trade for 4 hours hoping for a massive runner, or conversely closing a London Open swing after only 10 handles.',
    decisionRule: 'Trade the London Silver Bullet (03:00-04:00 EST) for quick, stress-free morning profits; trade the full London Open session when HTF bias offers massive expansion potential.',
    diagramSnippet: 'Silver Bullet: [03:00 ──> 04:00 EST: 10-15 Handles Banked] | London Open: [02:00 ──> 05:00 EST: High/Low of Day Captured]'
  }
];
