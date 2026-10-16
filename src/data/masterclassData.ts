import { ICTConcept, DiagramType } from '../types';
import { theinnercircletradersNewMasterclasses } from './theinnercircletradersMasterclasses';

export interface MasterclassItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: 'masterclass_34' | 'pd_array_15' | 'entry_model_5' | 'opening_range_5' | 'mentorship_2026' | 'algorithmic_signatures';
  diagramType: DiagramType;
  coreRule: string;
  orderOfOperations: string[];
  keyMistakes: string[];
  invalidationChecklist: string[];
  riskRules: string[];
  stepByStepBreakdown: { step: number; title: string; detail: string; rule?: string }[];
  visualAnatomy: string;
  relatedPdArrays: string[];
  quote: string;
}

export const masterclassCollection: MasterclassItem[] = [
  // 1. Weekly Move
  {
    id: 'mc_01_weekly_move',
    number: 1,
    title: 'How Smart Money Engineers a Weekly Move',
    subtitle: 'Interbank Orderflow, Weekly Opening Price Filter & TGIF Profiles',
    category: 'masterclass_34',
    diagramType: 'po3_amd',
    coreRule: 'The weekly candle follows classic Power of Three (PO3): Sunday/Monday accumulation, Tuesday/Wednesday London/NY Judas swing establishing the High or Low of the Week, Thursday expansion to the Draw on Liquidity, and Friday TGIF retracement.',
    orderOfOperations: [
      'Sunday 18:00 ET: Mark the Sunday/Weekly Opening Price.',
      'Monday: Range-bound consolidation or false expansion. Mark the Monday High and Low.',
      'Tuesday or Wednesday (London 02:00-05:00 ET / NY 08:30-10:00 ET): Watch for the Judas Swing above/below the Weekly Open to form the High/Low of the Week (HOW/LOW).',
      'Wednesday PM & Thursday: Aggressive directional expansion leg delivering directly into the weekly Draw on Liquidity (DOL).',
      'Friday (10:00-11:00 AM ET): TGIF profit-taking profile. Institutions square books; 20-30% retracement of the weekly expansion leg.'
    ],
    keyMistakes: [
      'Buying above the Weekly Open on Monday or Tuesday before the Judas Swing has occurred.',
      'Holding full position size through Friday afternoon expecting continuation when institutional books are being squared (TGIF).',
      'Treating Monday moves as true directional commitment rather than liquidity engineering.'
    ],
    invalidationChecklist: [
      'If price expands on Monday without manipulating the Weekly Open, expect mid-week reversal or protracted consolidation.',
      'If the High of the Week is violated on Thursday, the weekly profile has failed or inverted.'
    ],
    riskRules: [
      'Risk max 1% per setup during Wednesday/Thursday expansion legs.',
      'Cut risk to 0.25% or completely flat on Friday after 11:00 AM ET.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Weekly Open Anchor', detail: 'Mark Sunday 18:00 ET opening price. Bullish weeks seek price below open (Discount); bearish weeks seek price above open (Premium).' },
      { step: 2, title: 'Judas Swing Window', detail: 'This weekly-profile framework studies Tuesday/Wednesday extremes and London/New York windows. Their frequency is not established by a dataset here.' },
      { step: 3, title: 'True Expansion Leg', detail: 'Price accelerates violently away from the weekly open toward the HTF PD Array or major liquidity pool.' },
      { step: 4, title: 'TGIF Profiling', detail: 'Friday 10:00 AM macro triggers reversal/retracement as market makers hedge weekend risk.' }
    ],
    visualAnatomy: 'A standard OHLC weekly bar divided into its 5 component days, showing the Judas swing low formed on Tuesday London session below the open line.',
    relatedPdArrays: ['Weekly Fair Value Gap', 'Weekly Order Block', 'Previous Weekly High/Low'],
    quote: 'The weekly opening price is the filter through which all true institutional delivery must pass.'
  },

  // 2. Draw on Liquidity
  {
    id: 'mc_02_draw_on_liquidity',
    number: 2,
    title: 'The Draw on Liquidity (DOL) Masterclass',
    subtitle: 'The 2 Algorithmic Objectives & The 4 Diagnostic Questions',
    category: 'masterclass_34',
    diagramType: 'top_down_matrix',
    coreRule: 'The Interbank Price Delivery Algorithm operates on only two mandates: (1) Rebalance price imbalances (FVGs/BISI/SIBI), and (2) Reprice above old highs or below old lows to consume resting stop liquidity.',
    orderOfOperations: [
      'Question 1: Where did price just come from? (Identifies the originating liquidity pool or HTF PD Array).',
      'Question 2: Where is price right now? (Premium vs Discount relative to the 20-day dealing range).',
      'Question 3: Where is price algorithmically compelled to go? (Target pool: Relative Equal Highs/Lows, Previous Daily High/Low, or Unbalanced FVG).',
      'Question 4: What is the framework-selected path of least resistance? (Low Resistance Liquidity Run vs High Resistance Liquidity Run).'
    ],
    keyMistakes: [
      'Executing on a lower timeframe FVG without knowing what HTF liquidity pool or imbalance the market is drawing toward.',
      'Treating every swing point as a Draw on Liquidity instead of prioritizing engineered liquidity pools (Relative Equal Highs/Lows).'
    ],
    invalidationChecklist: [
      'If price reaches the Draw on Liquidity and displaces violently away, the delivery cycle is completed. Do not re-enter in the old direction.'
    ],
    riskRules: [
      'Never enter against the HTF Draw on Liquidity regardless of 1-minute chart patterns.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Locate Originating Array', detail: 'Pinpoint the HTF PD Array (Daily/4H FVG or Old High/Low) that initiated the current move.' },
      { step: 2, title: 'Scan for Engineered Pools', detail: 'Look for clean double tops (EQHs), double bottoms (EQLs), or multi-day highs/lows.' },
      { step: 3, title: 'Determine Inefficiency Target', detail: 'Find untraded FVGs, NWOGs, or NDOGs that sit between current price and external liquidity.' },
      { step: 4, title: 'Monitor Delivery State', detail: 'Once the Draw on Liquidity is tapped, look for immediate reaction (CISD) or expansion to secondary target.' }
    ],
    visualAnatomy: 'A top-down flowchart from Daily narrative down to 5M execution, highlighting the magnetic pull of Buy-side Liquidity sitting above relative equal highs.',
    relatedPdArrays: ['Relative Equal Highs (BSL)', 'Relative Equal Lows (SSL)', 'NWOG', 'NDOG'],
    quote: 'If you do not know where the algorithm is taking price, you are the liquidity being taken.'
  },

  // 3. ICT 2022 Model
  {
    id: 'mc_03_2022_model',
    number: 3,
    title: 'ICT 2022 Mentorship Model Framework',
    subtitle: 'Time-Framed Intraday Execution Engine: Liquidity Sweep, Displacement & FVG Retrace',
    category: 'masterclass_34',
    diagramType: 'first_presentation_fvg',
    coreRule: 'Wait for a liquidity sweep of a session or pre-market high/low during a defined killzone (08:30-11:00 AM ET), followed by aggressive displacement creating a Market Structure Shift (MSS) with an energetic Fair Value Gap, and execute limit entry at the FVG retest.',
    orderOfOperations: [
      'Wait for 08:30 AM or 09:30 AM NY cash open.',
      'Observe a liquidity raid on Previous Session High/Low or Pre-Market High/Low.',
      'Wait for violent displacement candle(s) that break structural swing points (MSS) and leave a clean, uncontested Fair Value Gap (FVG).',
      'Place a limit order at the near boundary or 50% Consequent Encroachment (CE) of the FVG.',
      'Place Stop Loss 1 tick beyond the displacement swing extreme.',
      'Target opposing session liquidity (Relative Equal Highs/Lows or PDL/PDH).'
    ],
    keyMistakes: [
      'Entering before the liquidity sweep has occurred (front-running the setup).',
      'Accepting slow, overlapping candles as displacement (displacement requires large full bodies and small wicks).',
      'Placing the stop loss inside the FVG instead of beyond the swing extreme.'
    ],
    invalidationChecklist: [
      'If candle body closes completely through the FVG in the opposite direction, the setup is invalidated (inversion underway).'
    ],
    riskRules: [
      'Maximum 1-2% risk per execution.',
      'Maximum 1 loss per day rule on this model.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Liquidity Purge', detail: 'Price spikes into pre-market or session liquidity during 08:30-10:00 AM.' },
      { step: 2, title: 'Displacement & MSS', detail: 'Aggressive institutional candles print with heavy body volume, breaking opposing swing.' },
      { step: 3, title: 'FVG Consequent Encroachment', detail: 'Retracement taps into 50% CE of the displacement FVG.' },
      { step: 4, title: 'Target Delivery', detail: 'Expansion directly to opposing liquidity pool.' }
    ],
    visualAnatomy: 'Clear 3-candle sequence: Candle 1 high, Candle 2 long displacement down, Candle 3 low leaving open gap between Candle 1 low and Candle 3 high.',
    relatedPdArrays: ['Fair Value Gap (SIBI/BISI)', 'Market Structure Shift (MSS)', 'Consequent Encroachment (CE)'],
    quote: 'The 2022 model is not an indicator; it is the visual signature of institutional repricing.'
  },

  // 4. CISD Masterclass
  {
    id: 'mc_04_cisd_masterclass',
    number: 4,
    title: 'Change In State of Delivery (C.I.S.D) Masterclass',
    subtitle: 'An Order Block is a Change in the State of Delivery: The Definitive Candle Close Rule',
    category: 'masterclass_34',
    diagramType: 'cisd_masterclass',
    coreRule: 'An Order Block is not merely the last up/down candle; it represents a Change in the State of Delivery. A CISD is confirmed when price produces a definitive candle body close through the delivery candle(s) that tapped the HTF key level. The open price of that candle series becomes a sensitive reference line.',
    orderOfOperations: [
      'Identify the candle (or consecutive series of candles) that delivered price into the HTF Key Level / Liquidity Pool.',
      'Note the opening price of the very first candle in that delivering series—this is the CISD Reference Benchmark.',
      'Wait for opposing displacement to produce a candle body close below (for bearish) or above (for bullish) the delivering candle body.',
      'A wick through does NOT count; only a solid candle body close confirms that delivery state has inverted.',
      'On the subsequent retest, execute as price tags the CISD Open Price Reference / +OB.'
    ],
    keyMistakes: [
      'Confusing a wick break with a body close. A wick is a liquidity probe; a candle body close is institutional commitment.',
      'Marking the CISD on a random 1-minute noise swing without an HTF key level catalyst.'
    ],
    invalidationChecklist: [
      'If price closes back inside the delivering candle body, the CISD has failed.'
    ],
    riskRules: [
      'Risk is strictly anchored beyond the HTF swing high/low that triggered the CISD.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Delivery Tap', detail: 'Bullish candles deliver price up into Daily/4H FVG or Old High.' },
      { step: 2, title: 'Anchor the Open Price', detail: 'Draw a horizontal ray from the opening price of the delivery candle.' },
      { step: 3, title: 'Confirm Body Close', detail: 'Wait for next candle(s) to close decisively below the body of the delivery candle.' },
      { step: 4, title: 'Execute on Revisit', detail: 'Enter on retest of the CISD ray with tight invalidation.' }
    ],
    visualAnatomy: 'Green candle tapping blue HTF resistance line; red candle body decisively closing below green candle body; retest of green candle open price.',
    relatedPdArrays: ['Order Block (OB)', 'Mean Threshold (MT)', 'HTF PD Array'],
    quote: 'An Order Block is not just a pattern. It is literally a Change in the State of Delivery.'
  },

  // 5. IFVG Masterclass
  {
    id: 'mc_05_ifvg_masterclass',
    number: 5,
    title: 'Inversion Fair Value Gap (I.F.V.G) Masterclass',
    subtitle: 'Failed Auction Signature & The Ultimate Institutional Role-Reversal Level',
    category: 'masterclass_34',
    diagramType: 'ifvg_inversion',
    coreRule: 'An Inversion FVG is not an anticipation setup—it is confirmation that an auction has already failed. When price decisively closes with a candle body through an established FVG, its internal polarity inverts: support flips to resistance, or resistance flips to support.',
    orderOfOperations: [
      'Locate an existing Fair Value Gap (BISI or SIBI) created during earlier price action.',
      'Observe price aggressively drive through the FVG rather than respecting it as support/resistance.',
      'Verify that a candle body closes outside the opposite boundary of the FVG.',
      'Extend the boundaries of the violated FVG into the future—it is now an Inversion FVG.',
      'Wait for price to retrace back into the IFVG and execute in the direction of the inversion breakout.'
    ],
    keyMistakes: [
      'Trying to predict that an FVG will fail before a candle body has actually closed beyond it.',
      'Using IFVGs during low-volume lunchtime chop (12:00-13:00 ET) when prices drift aimlessly.'
    ],
    invalidationChecklist: [
      'If price re-enters the IFVG and candle body closes completely back through it, the inversion has failed.'
    ],
    riskRules: [
      'Place stop loss beyond the displacement candle that caused the inversion.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Original Gap Creation', detail: 'Market creates a bullish BISI on the upward leg.' },
      { step: 2, title: 'Liquidity Purge at High', detail: 'Market takes out Buy-side liquidity, creating a Turtle Soup or SMT.' },
      { step: 3, title: 'Body Violation (Inversion)', detail: 'Large bearish candle slices cleanly through the BISI and closes below its bottom wick.' },
      { step: 4, title: 'Retest & Execution', detail: 'Price pulls back to the underside of the former BISI (now bearish IFVG) and rejects.' }
    ],
    visualAnatomy: 'A shaded rectangle representing an earlier bullish gap, penetrated by a large bearish displacement candle, followed by an upside retest that acts like a ceiling.',
    relatedPdArrays: ['BISI', 'SIBI', 'Balanced Price Range (BPR)', 'Breaker Block'],
    quote: 'When an algorithm refuses to respect an inefficiency, it is telling you it has urgent business in the other direction.'
  },

  // 6. Silver Bullet Model
  {
    id: 'mc_06_silver_bullet',
    number: 6,
    title: 'ICT Silver Bullet Model Masterclass',
    subtitle: 'The 60-Minute Precision Windows: 10-15 Handles Daily Delivery Target',
    category: 'masterclass_34',
    diagramType: 'session_timeline',
    coreRule: 'The Silver Bullet operates inside three strict 60-minute windows: London 03:00-04:00 AM ET, NY AM 10:00-11:00 AM ET, and NY PM 14:00-15:00 PM ET. It requires a liquidity sweep, an MSS with displacement leaving an FVG, targeting 10 to 15 handles on NQ or 15 pips on Forex.',
    orderOfOperations: [
      'Synchronize clock to New York local time (ET).',
      'Step 1: London Window (03:00-04:00 AM ET) OR NY AM Window (10:00-11:00 AM ET) OR NY PM Window (14:00-15:00 PM ET).',
      'Step 2: Identify liquidity swept immediately prior to or inside the window.',
      'Step 3: Spot 1M/5M Market Structure Shift with an energetic FVG.',
      'Step 4: Execute on limit at FVG with a realistic target of 10-15 index points (NQ) or 20-30 ticks (ES).',
      'Step 5: Once target is reached, close platform. Do not trade outside the 60-minute window.'
    ],
    keyMistakes: [
      'Greedily trying to hold a Silver Bullet trade for 100 handles when it is designed as a model-based fixed-target model.',
      'Taking trades at 10:55 AM right as the window closes.'
    ],
    invalidationChecklist: [
      'If the 60-minute window expires without an entry trigger, cancel all orders immediately.'
    ],
    riskRules: [
      'Risk fixed 1% per trade. Target 2R or 10-15 handles on Nasdaq.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Window Activation', detail: 'At exactly 10:00:00 AM ET, check which liquidity was swept in the 09:30-10:00 AM open.' },
      { step: 2, title: 'Displacement FVG', detail: 'Look for the first clean FVG formed after the 10:00 AM macro.' },
      { step: 3, title: 'Execution at 50% CE', detail: 'Enter on retracement into the FVG.' },
      { step: 4, title: 'Fixed Target Extraction', detail: 'Take profit mechanically at 10-15 handles without waiting for home runs.' }
    ],
    visualAnatomy: 'Clock diagram highlighting 03:00-04:00, 10:00-11:00, and 14:00-15:00 ET with immediate 1-minute execution setups.',
    relatedPdArrays: ['Fair Value Gap', 'Consequent Encroachment', 'Session High/Low'],
    quote: 'You do not need to trade all day. Give the algorithm 60 minutes, take your 15 handles, and live your life.'
  },

  // 7. Unicorn Model
  {
    id: 'mc_07_unicorn_model',
    number: 7,
    title: 'The ICT Unicorn Model (Breaker and FVG Confluence)',
    subtitle: 'The Powerful Convergence of a Breaker Block Overlapping a Fair Value Gap',
    category: 'masterclass_34',
    diagramType: 'unicorn_model',
    coreRule: 'The Unicorn Model is formed when a Breaker Block and a Fair Value Gap inhabit the exact same horizontal price zone following a liquidity raid. This confluence provides the highest statistical win-rate in the entire ICT methodology.',
    orderOfOperations: [
      'Step 1: Identify a Swing Low that preceded a higher high that swept Buy-side Liquidity (creating the future Breaker Block).',
      'Step 2: Price violently displaces down through that Swing Low, violating market structure.',
      'Step 3: Inside that violent displacement leg, observe a Fair Value Gap (SIBI) that overlaps horizontally with the Breaker Block body.',
      'Step 4: The overlapping intersection of Breaker + FVG is the UNICORN ZONE.',
      'Step 5: Place limit short entry at the confluence zone with stop loss placed 1 tick above the Breaker Block high.',
      'Step 6: Target Sell-side Liquidity (Relative Equal Lows or Standard Deviation -2.0).'
    ],
    keyMistakes: [
      'Calling an Order Block a Breaker when no liquidity sweep occurred before the structural break.',
      'Entering when the FVG does not overlap with the Breaker candle body.'
    ],
    invalidationChecklist: [
      'If price prints a full body candle close above the Breaker Block high, the Unicorn setup is invalidated.'
    ],
    riskRules: [
      'Full A+ setup size (1-2%). High-conviction entry model.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Liquidity Purge', detail: 'Market sweeps Previous Daily High or Session High.' },
      { step: 2, title: 'Breaker + FVG Creation', detail: 'Price smashes through the prior swing low, printing a displacement FVG right across the breaker level.' },
      { step: 3, title: 'Convergence Retest', detail: 'Price pulls back into the dual-layer barrier (Breaker ceiling + FVG resistance).' },
      { step: 4, title: 'Explosive Selloff', detail: 'Price accelerates violently into the Draw on Liquidity.' }
    ],
    visualAnatomy: 'Purple Breaker Block corridor overlapping yellow Fair Value Gap corridor, with an entry pin right at the intersection and target at clean equal lows.',
    relatedPdArrays: ['Breaker Block', 'Fair Value Gap', 'Stop Hunt / Liquidity Sweep'],
    quote: 'When an institutional Breaker Block lines up with a Fair Value Gap, the market is presenting its framework-selected signature: the Unicorn.'
  },

  // 8. Opening Range Gap (ORG) Octant Grid (2026 Mentorship)
  {
    id: 'mc_08_org_octant_grid',
    number: 8,
    title: 'The Opening Range Gap (ORG) & Octant Grid',
    subtitle: 'ICT 2026 Mentorship: 09:30 cash open versus selected prior-session reference close Mathematical Grid',
    category: 'masterclass_34',
    diagramType: 'org_octant_grid',
    coreRule: 'For this study, define the ORG between the 09:30 New York cash open and an explicitly selected prior-session reference close. Exchange settlement and session-close conventions vary by instrument. An octant grid divides the selected range into eight equal parts; it does not predict a hit probability.',
    orderOfOperations: [
      'At 9:30 AM ET, note the opening print of the cash session.',
      'Select a prior-session reference close and record the instrument, venue and close convention.',
      'Calculate the difference: ORG = |9:30 Open - selected prior-session reference close|.',
      'Divide the ORG into 8 mathematical octants: 0.125, 0.25 (Lower Quad), 0.375, 0.50 (Consequent Encroachment), 0.625, 0.75 (Upper Quad), 0.875, 1.0 (Full Range).',
      'Observe the 0.50 midpoint without assuming it must be reached or assigning a probability.',
      'Use 0.5 and 1.0 Standard Deviation extensions below 0.0 or above 1.0 for extended trend day targets.'
    ],
    keyMistakes: [
      'Confusing an exchange settlement price with a chart session-close reference; verify the convention for the selected instrument.',
      'Ignoring the 50% CE level when trading the 9:30-10:00 AM morning open.'
    ],
    invalidationChecklist: [
      'If price opens with zero gap (flat ORG), default to the First Hour Dealing Range (9:30-10:30 AM).'
    ],
    riskRules: [
      'Risk 0.5% when trading early ORG fills before 10:00 AM; scale up to 1% on confirmed post-10:00 AM expansion.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Calculate Gap Dimensions', detail: 'Example: NQ 9:30 Open at 28,576.75, selected prior-session reference close at 28,324.75 = 252.00 point ORG.' },
      { step: 2, title: 'Plot Octants', detail: 'Divide 252 by 8 = 31.50 points per octant. Plot 0.25, 0.50 (CE), 0.75.' },
      { step: 3, title: 'Track 10:00 AM CE Hit', detail: 'Observe whether the selected range midpoint is revisited; no hit probability is established here.' },
      { step: 4, title: 'Standard Deviation Target', detail: 'If CE breaks with displacement, project -0.5 and -1.0 SD extensions for afternoon targets.' }
    ],
    visualAnatomy: 'Horizontal octant grid with 8 parallel lines, highlighting the bold 0.50 Consequent Encroachment line and downward standard deviation projections.',
    relatedPdArrays: ['Consequent Encroachment', 'Standard Deviations', 'New Day Opening Gap (NDOG)'],
    quote: 'The ORG midpoint is a study reference. A midpoint visit before 10:00 is not guaranteed or statistically established here.'
  },

  // 9. Second Stage Distribution / Re-accumulation (MMXM)
  {
    id: 'mc_09_mmxm_stage2',
    number: 9,
    title: 'MMXM Second Stage Distribution / Reaccumulation',
    subtitle: 'The Named Framework of Market Maker Models: 50% Distance Rule & Violent Acceleration',
    category: 'masterclass_34',
    diagramType: 'mmxm_stage2',
    coreRule: 'In Market Maker Buy/Sell Models (MMBM/MMSM), the Smart Money Reversal (SMR) leg must reach at least 50% of the total distance to the original consolidation. Once verified, the Stage-2 Re-accumulation/Re-distribution setup offers the cleanest, most explosive acceleration leg in the entire model.',
    orderOfOperations: [
      'Identify the Original Consolidation (where institutional positions were initially built).',
      'Track the accumulation/distribution stages leading to the Smart Money Reversal (SMR) at an HTF key level.',
      'Measure the distance from SMR to the Original Consolidation.',
      'Verify: Has the first leg out of SMR covered at least 50% of this distance? If yes, the model is fully activated.',
      'Wait for the Stage-2 consolidation / pullback into an internal FVG or Order Block.',
      'Execute Stage-2 entry with stop loss behind the Stage-2 swing point.',
      'Target: Violent delivery into the stops resting above/below the Original Consolidation.'
    ],
    keyMistakes: [
      'Trying to catch the exact SMR peak/trough (very high risk) instead of waiting for Stage 2 confirmation.',
      'Entering Stage 2 when the SMR leg failed to cover 50% of the distance to the target.'
    ],
    invalidationChecklist: [
      'If price breaches the SMR extreme, the entire MMXM model is invalidated.'
    ],
    riskRules: [
      'Stage 2 allows standard 1.5-2% risk because risk-to-reward frequently exceeds 1:5.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Original Consolidation', detail: 'Mark high and low of the initial Asian or multi-day range.' },
      { step: 2, title: 'Smart Money Reversal', detail: 'Price sweeps HTF liquidity and prints CISD/MSS.' },
      { step: 3, title: '50% Rule Validation', detail: 'Confirm the impulse leg has cleared half the distance back to the original range.' },
      { step: 4, title: 'Stage-2 Entry', detail: 'Buy/Sell the retracement into the Stage-2 PD Array for the explosive terminal run.' }
    ],
    visualAnatomy: 'Curve diagram showing Original Consolidation on left, stages of sell-side curve down to SMR, and the Stage-2 re-accumulation box on right launching straight to the target.',
    relatedPdArrays: ['Original Consolidation', 'Smart Money Reversal (SMR)', 'Fair Value Gap'],
    quote: 'Amateurs try to guess the bottom at SMR. Professionals wait for Stage-2 re-accumulation and ride the institutional freight train.'
  },

  // 10. The 5 Algorithmic Opening Ranges
  {
    id: 'mc_10_five_opening_ranges',
    number: 10,
    title: 'The 5 Algorithmic Opening Ranges',
    subtitle: 'Midnight, London, NY Killzone, AM Session & PM Session Delivery Anchors',
    category: 'opening_range_5',
    diagramType: 'five_opening_ranges',
    coreRule: 'Every trading day is governed by five specific 30-minute opening ranges (all New York local time): Midnight (12:00-12:30 AM), London (1:30-2:00 AM), NY Killzone (7:00-7:30 AM), AM Session (9:30-10:00 AM - The Master Range), and PM Session (1:30-2:00 PM).',
    orderOfOperations: [
      'Range 1: Midnight (12:00 - 12:30 AM ET) -> Anchors the Daily PO3 bias; standard deviations project day limits.',
      'Range 2: London (1:30 - 2:00 AM ET) -> First directional impulse; 3:30 AM delivery sweet spot.',
      'Range 3: NY Killzone (7:00 - 7:30 AM ET) -> Universal range for Forex, Commodities, and pre-market indices.',
      'Range 4: AM Session (9:30 - 10:00 AM ET) -> THE MASTER RANGE for Equities/Indices. Determines AM trend direction.',
      'Range 5: PM Session (1:30 - 2:00 PM ET) -> Post-lunch restart; initiates 2:50 PM macro and 3:50 PM settlement push.'
    ],
    keyMistakes: [
      'Confusing standard market open times with the algorithmic 30-minute opening ranges.',
      'Trading during the 12:00-1:15 PM lunch dead zone between AM and PM ranges.'
    ],
    invalidationChecklist: [
      'If the 9:30-10:00 AM AM range is smaller than 20 index points, anticipate high-resistance chop or expansion deferred to 10:30 AM.'
    ],
    riskRules: [
      'Focus 80% of risk allocation on Ranges 3 and 4 (NY Killzone & AM Session).'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Midnight Calibration', detail: 'Mark 12:00-12:30 AM range. Price above = Premium; Price below = Discount.' },
      { step: 2, title: 'London Impulse Check', detail: 'See if London took Midnight range high/low.' },
      { step: 3, title: 'NY Cash Open Execution', detail: 'Trade the Judas swing out of the 9:30-10:00 AM AM range.' },
      { step: 4, title: 'PM Settlement Extraction', detail: 'Capture the afternoon trend out of the 1:30-2:00 PM range.' }
    ],
    visualAnatomy: 'A 5-column dashboard comparing each opening range with its local NY time, purpose, and standard deviation projection targets.',
    relatedPdArrays: ['Opening Range Gap (ORG)', 'Standard Deviations', 'Killzones'],
    quote: 'Time is the supreme ruler of market delivery. Price is merely the passenger.'
  },

  // 11. Propulsion Block
  {
    id: 'mc_11_propulsion_block',
    number: 11,
    title: 'ICT Propulsion Block Masterclass',
    subtitle: 'High-Velocity Execution: The Order Block that Retests a Pre-Existing Order Block',
    category: 'pd_array_15',
    diagramType: 'propulsion_block',
    coreRule: 'A Propulsion Block occurs when an existing Order Block displaces price, and a subsequent candle pulls back into that Order Block, respects its 50% Mean Threshold, and violently drives price forward. The candle that retested the OB becomes the Propulsion Block and must not be breached.',
    orderOfOperations: [
      'Identify an established, valid Order Block that produced displacement.',
      'Observe price pull back into the Order Block.',
      'A candle enters the OB but respects its 50% Mean Threshold (candle body stays in upper/lower half).',
      'Price violently launches out of the OB.',
      'That retesting candle is designated as the PROPULSION BLOCK.',
      'Future pullbacks can be bought/sold directly at the top of the Propulsion Block with extreme confidence and razor-thin stops.'
    ],
    keyMistakes: [
      'Looking for Propulsion Blocks in consolidating markets (they only occur in rapid trend expansions).',
      'Allowing the candle body to close beyond the 50% Mean Threshold of the underlying Order Block.'
    ],
    invalidationChecklist: [
      'If price body closes below the 50% Mean Threshold of the Propulsion Block itself, the setup is dead.'
    ],
    riskRules: [
      'Stops can be set extremely tight (just behind the Propulsion Block body), allowing higher position sizing.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Initial Order Block', detail: 'Bullish OB forms and price moves up.' },
      { step: 2, title: 'Retest Candle', detail: 'Retest candle taps into OB and respects Mean Threshold.' },
      { step: 3, title: 'Propulsion Ignition', detail: 'Market launches violently upward.' },
      { step: 4, title: 'Precision Entry', detail: 'Buy immediate retest of the Propulsion Block high.' }
    ],
    visualAnatomy: 'Two sequential order blocks showing the second block tapping into the first, respecting the 50% dashed Mean Threshold line and rocketing higher.',
    relatedPdArrays: ['Order Block', 'Mean Threshold (MT)', 'Rejection Block'],
    quote: 'The Propulsion Block is not an analytical tool—it is a weapon of high-velocity execution.'
  },

  // 12. Implied FVG
  {
    id: 'mc_12_implied_fvg',
    number: 12,
    title: 'ICT Implied Fair Value Gap Masterclass',
    subtitle: 'Hidden Inefficiencies: Consequent Encroachment of Overlapping Wicks',
    category: 'pd_array_15',
    diagramType: 'implied_fvg',
    coreRule: 'When two consecutive candles have overlapping long wicks that prevent the formation of a traditional Fair Value Gap, an Implied FVG exists across the Consequent Encroachment (50%) of both wicks. This hidden corridor acts as institutional support/resistance.',
    orderOfOperations: [
      'Observe a price leg with heavy wicking where no standard 3-candle FVG is visible.',
      'Identify Candle 1 with a long lower/upper wick.',
      'Identify Candle 3 with a long opposing wick that overlaps the space.',
      'Mark the Consequent Encroachment (50%) of Candle 1 wick and Candle 3 wick.',
      'The zone between these two midpoints is the IMPLIED FAIR VALUE GAP.',
      'Watch price react to this zone with exact precision as if a traditional FVG existed.'
    ],
    keyMistakes: [
      'Assuming that because there is no traditional void, the market is fully balanced.',
      'Drawing the Implied FVG from candle bodies instead of the 50% midpoint of the wicks.'
    ],
    invalidationChecklist: [
      'Candle body close through the Implied FVG inverts it into an Implied Inversion FVG.'
    ],
    riskRules: [
      'Risk 1% with stop loss placed at the extreme of the wicks.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Identify Wick Density', detail: 'Locate aggressive moves characterized by unusually long wicks.' },
      { step: 2, title: 'Calculate CE of Wicks', detail: 'Find the 50% midpoint of both overlapping wicks.' },
      { step: 3, title: 'Shade Corridor', detail: 'Project the Implied FVG box horizontally.' },
      { step: 4, title: 'Execute on Tap', detail: 'Enter on limit as price re-enters the implied zone.' }
    ],
    visualAnatomy: 'Three candles where Candle 1 and Candle 3 wicks overlap, with red circles at their 50% wick midpoints framing a blue Implied FVG box.',
    relatedPdArrays: ['Fair Value Gap', 'Consequent Encroachment', 'Volume Imbalance'],
    quote: 'The algorithm does not trade candle bodies alone; it balances the space between wick extremities.'
  },

  // 13. Rejection Block
  {
    id: 'mc_13_rejection_block',
    number: 13,
    title: 'ICT Rejection Block Masterclass',
    subtitle: 'Algorithmic Price Delimiter: The Space Between Wick Extremity & Highest Body Close',
    category: 'pd_array_15',
    diagramType: 'rejection_block',
    coreRule: 'A Rejection Block is formed at swing highs/lows where long wicks reject a level. It is defined as the price corridor from the highest (or lowest) candle body close to the extreme tip of the wick. It serves as an algorithmic price delimiter and model-based deferred entry zone.',
    orderOfOperations: [
      'Locate a key swing high or swing low characterized by multiple long rejection wicks.',
      'Draw a horizontal line at the HIGHEST CANDLE BODY CLOSE in that swing high formation.',
      'Draw a second line at the HIGHEST WICK TIP of that swing.',
      'The space between the highest body close and the wick tip is the BEARISH REJECTION BLOCK.',
      'When price revisits this area, enter as price enters the Rejection Block.',
      'Stop Loss is placed just above the wick extreme.'
    ],
    keyMistakes: [
      'Placing the stop loss inside the Rejection Block instead of beyond the wick extreme.',
      'Confusing an Order Block (which uses the whole candle body) with a Rejection Block (which focuses on the wick excess above the body close).'
    ],
    invalidationChecklist: [
      'A candle body close above the Rejection Block wick extreme invalidates the block and signals continuation.'
    ],
    riskRules: [
      'Tight stop above wick tip allows exceptional risk-to-reward (often 1:4+).'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Identify Long Wicks', detail: 'Locate a swing high with prominent upper wicks.' },
      { step: 2, title: 'Mark Body Close', detail: 'Anchor lower boundary at the highest candle body close.' },
      { step: 3, title: 'Mark Wick Tip', detail: 'Anchor upper boundary at the highest wick price.' },
      { step: 4, title: 'Trade the Return', detail: 'Sell into the Rejection Block on subsequent retests.' }
    ],
    visualAnatomy: 'Candles at a peak with long wicks; a red highlighted corridor extending from the top body line to the highest wick wick tip.',
    relatedPdArrays: ['Order Block', 'Breaker Block', 'Turtle Soup'],
    quote: 'The wick tells you where the auction was rejected; the body tells you where the transaction was settled.'
  },

  // 14. Mitigation Block
  {
    id: 'mc_14_mitigation_block',
    number: 14,
    title: 'ICT Mitigation Block Masterclass',
    subtitle: 'The Failed Breaker: Institutional Break-Even Mitigation on Failure Swings',
    category: 'pd_array_15',
    diagramType: 'mitigation_block',
    coreRule: 'A Mitigation Block is structurally identical to a Breaker Block, EXCEPT it forms after a Failure Swing (the market failed to take out the prior high/low). Institutions that bought the failure swing are trapped offside when structure breaks; they mitigate their loss at break-even when price returns to that swing point.',
    orderOfOperations: [
      'Observe Swing High A.',
      'Price pulls back to Swing Low B.',
      'Price rallies but FAILS to reach Swing High A (Failure Swing C - no liquidity sweep).',
      'Price violently breaks below Swing Low B with displacement (MSS).',
      'The down-close candle(s) at Swing Low B become a BEARISH MITIGATION BLOCK.',
      'When price retraces back up to Swing Low B, enter short as institutions mitigate trapped longs at break-even.'
    ],
    keyMistakes: [
      'Calling a Breaker a Mitigation Block (Breakers MUST take liquidity; Mitigation Blocks form after failure to take liquidity).',
      'Expecting as aggressive an expansion from a Mitigation Block as from a Breaker Block (Breakers have higher velocity).'
    ],
    invalidationChecklist: [
      'If price body closes above the Mitigation Block swing high, the setup is invalidated.'
    ],
    riskRules: [
      'Risk 1% with stop loss above the failure swing high.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Failure Swing Prints', detail: 'Market fails to make higher high, signaling underlying weakness.' },
      { step: 2, title: 'Structural Break', detail: 'Price breaks down-close candle at intervening swing low.' },
      { step: 3, title: 'Mitigation Retest', detail: 'Price pulls back to the level where trapped longs sit at break-even.' },
      { step: 4, title: 'Breakdown Expansion', detail: 'Price continues sell-off to Sell-side targets.' }
    ],
    visualAnatomy: 'Diagram comparing a Breaker (with high sweep) vs Mitigation Block (lower high failure swing), highlighting the break-even return.',
    relatedPdArrays: ['Breaker Block', 'Market Structure Shift (MSS)', 'Failure Swing'],
    quote: 'Institutions do not take unnecessary losses. When trapped in a failure swing, they push price back to their cost basis to mitigate.'
  },

  // 15. Standard Deviations Masterclass
  {
    id: 'mc_15_standard_deviations',
    number: 15,
    title: 'ICT Standard Deviations for Algorithmic Projections',
    subtitle: 'Predicting Exact Highs, Lows & Target Terminus Using -1.5, -2.0, -2.5 and -4.0 SDs',
    category: 'masterclass_34',
    diagramType: 'standard_deviations',
    coreRule: 'Standard Deviations (STDV) are anchored across the manipulation swing or dealing range (0.0 to -1.0). The algorithm targets extension levels with mathematical precision: -1.5 (first reaction), -2.0 to -2.5 (model-based session high/low target), and -4.0 (macro trend terminus).',
    orderOfOperations: [
      'Identify the manipulation swing (the Judas swing or initial dealing range).',
      'Place Fibonacci tool anchor: 0.0 at the manipulation high and 1.0 (or -1.0) at the dealing range low.',
      'Observe standard deviation extensions: -1.5, -2.0, -2.5, -4.0.',
      'Confluence Check: Does the -2.0 or -2.5 SD line up with a Previous Daily Low or HTF FVG?',
      'Use -2.0 SD as primary take-profit objective for day trades.',
      'Use -4.0 SD as macro terminus target for multi-day swing expansions.'
    ],
    keyMistakes: [
      'Anchoring the Fibonacci tool to arbitrary minor wicks instead of the true manipulation impulse swing.',
      'Leaving positions open past -4.0 SD expecting infinite continuation (exhaustion profile).'
    ],
    invalidationChecklist: [
      'If price breaks above the 0.0 manipulation anchor with a candle body close, the projection is void.'
    ],
    riskRules: [
      'Scale out 50% at -1.5 SD, 40% at -2.0/-2.5 SD, leave 10% runner for -4.0 SD.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Anchor the Range', detail: '0.0 at swing peak, -1.0 at dealing range base.' },
      { step: 2, title: 'Calculate Extensions', detail: 'Plot -1.5, -2.0, -2.5, and -4.0 levels.' },
      { step: 3, title: 'Align with Liquidity', detail: 'Verify alignment with prior daily highs or session lows.' },
      { step: 4, title: 'Extract Profits Mechanically', detail: 'Lock in gains as each mathematical standard deviation is tagged.' }
    ],
    visualAnatomy: 'Horizontal projection lines extending downward from anchor 0.0 down to -4.0 SD with price hitting each milestone.',
    relatedPdArrays: ['Dealing Range', 'Consequent Encroachment', 'Draw on Liquidity'],
    quote: 'The algorithm does not guess where to stop. It operates on strict mathematical standard deviations of the manipulation leg.'
  },

  // 16. New York Continuation vs Reversal
  {
    id: 'mc_16_ny_continuation_reversal',
    number: 16,
    title: 'The New York Session: Continuation vs Reversal Framework',
    subtitle: 'Did London Tap a Higher Timeframe PD Array? The Decisive Diagnostic Decision Tree',
    category: 'masterclass_34',
    diagramType: 'ny_continuation_reversal',
    coreRule: 'The entire New York session hinges on one fundamental question: Did London tap a Higher Timeframe PD Array? If NO: London generated the directional engine, and New York will provide a CONTINUATION (retracing into a London OB/PB at 8:30/9:30 before expanding). If YES: London overextended into HTF resistance, and New York will print a REVERSAL with a 9:30 Judas sweep.',
    orderOfOperations: [
      'At 7:00 AM ET, examine London session price action (02:00-05:00 ET).',
      'Diagnostic Question: Did London tag a Daily or 4H FVG, OB, or major liquidity pool?',
      'Branch A (Continuation): London did NOT hit HTF array. Expect NY 08:30 or 09:30 to retrace into London Order Block/FVG and expand in London direction.',
      'Branch B (Reversal): London DID hit HTF array. Expect NY 09:30 to engineer a Judas Sweep above London high, print CISD/MSS, and reverse the entire day.'
    ],
    keyMistakes: [
      'Trying to fade a strong London trend in New York when London has not touched any HTF PD Array.',
      'Buying New York open when London already completed the entire daily ADR (Average Daily Range) into HTF resistance.'
    ],
    invalidationChecklist: [
      'If New York fails to produce MSS following a suspected reversal Judas swing, default back to London continuation.'
    ],
    riskRules: [
      'Continuation setups: 1.5% risk. Reversal setups: 1% risk due to higher volatility.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Analyze London Leg', detail: 'Assess London range and distance traveled relative to daily ADR.' },
      { step: 2, title: 'Inspect HTF Context', detail: 'Determine if London touched a key 4H/Daily level.' },
      { step: 3, title: 'Select Profile', detail: 'Choose Continuation (retrace to London OB) or Reversal (Judas sweep).' },
      { step: 4, title: 'Execute Post-9:31 AM', detail: 'Enter on first confirmed FVG in accordance with chosen profile.' }
    ],
    visualAnatomy: 'A clean decision tree branching into Branch A (Green Continuation) and Branch B (Red Reversal) with London high/low markers.',
    relatedPdArrays: ['London High/Low', 'Asian Range', 'Judas Swing'],
    quote: 'New York never moves in a vacuum. It is either the continuation of London engine or the retribution for London overextension.'
  },

  // 17. 1st Presentation FVG
  {
    id: 'mc_17_first_presentation_fvg',
    number: 17,
    title: 'The 1st Presentation FVG Model',
    subtitle: 'Post-9:31 AM Execution Rule: Real Displacement Away from Balance After a Raid',
    category: 'entry_model_5',
    diagramType: 'first_presentation_fvg',
    coreRule: 'Never trade the first 60 seconds of the 9:30 AM open. The 1st Presentation FVG is the very first Fair Value Gap formed AFTER 9:31 AM that occurs following a liquidity raid and breaks away from equilibrium with real displacement. It represents the algorithm showing its hand.',
    orderOfOperations: [
      'Sit on hands from 9:30:00 to 9:31:00 AM ET (the opening minute is institutional clearing).',
      'Watch for a raid on pre-market high/low or engineered session liquidity.',
      'Identify the very first clean Fair Value Gap (1M or 2M chart) created by a large displacement candle that closes away from the opening range balance.',
      'This is the 1ST PRESENTATION FVG.',
      'Enter limit order as price retraces into the gap (boundary or 50% CE).',
      'Target opposing session liquidity.'
    ],
    keyMistakes: [
      'Entering on gaps formed inside the opening range consolidation before a stop raid occurs.',
      'Chasing the market instead of placing a limit order at the FVG retest.'
    ],
    invalidationChecklist: [
      'If price closes completely through the 1st Presentation FVG, the move was a fakeout. Exit immediately.'
    ],
    riskRules: [
      'Risk 1% with stop loss 1 tick beyond the raid swing point.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: '9:30 Open Filter', detail: 'Observe 9:30 AM opening prints without clicking buy or sell.' },
      { step: 2, title: 'Raid Confirmation', detail: 'Wait for stops to be swept above/below pre-market levels.' },
      { step: 3, title: 'Identify 1st Gap', detail: 'Spot the first displacement candle printing an FVG after 9:31 AM.' },
      { step: 4, title: 'Execute on Pullback', detail: 'Enter on retracement with mechanical take profit.' }
    ],
    visualAnatomy: 'Chart showing the 9:30 open line, Judas raid down to 9:31, violent up-candle creating the highlighted 1st Presentation FVG, and retest entry.',
    relatedPdArrays: ['Fair Value Gap', 'Opening Range', 'Pre-Market High/Low'],
    quote: 'The first presentation FVG is the algorithm handwriting its intentions on the chart in ink.'
  },

  // 18. Optimal Trade Entry (OTE)
  {
    id: 'mc_18_ote_model',
    number: 18,
    title: 'ICT Optimal Trade Entry (OTE) Model',
    subtitle: 'Fibonacci Precision: 62%, 70.5% Sweet Spot & 79% Deep Discount Levels',
    category: 'entry_model_5',
    diagramType: 'ote_model',
    coreRule: 'Optimal Trade Entry (OTE) measures a clean displacement impulse from Swing Low to Swing High. The model-based institutional entry zone sits between the 62% and 79% Fibonacci retracement levels, with 70.5% being the institutional sweet spot, aligned with an overlapping FVG or Order Block.',
    orderOfOperations: [
      'Identify a clear displacement price leg (Swing Low to Swing High for bullish, or High to Low for bearish).',
      'Draw Fibonacci tool from the exact origin of the impulse to the terminus of the impulse.',
      'Mark the OTE Zone: 0.62, 0.705 (Sweet Spot), and 0.79.',
      'Check for confluence: Is there an unmitigated FVG or Order Block sitting inside the 62%-79% corridor?',
      'Place limit entry at 0.62 or 0.705.',
      'Place Stop Loss beyond 1.0 (the swing origin).',
      'Target -0.27 and -0.62 Fibonacci extension targets (or HTF liquidity pool).'
    ],
    keyMistakes: [
      'Applying OTE to choppy, overlapping ranges without prior displacement or MSS.',
      'Using the 50% equilibrium level as an entry point instead of waiting for true discount (62%-79%).'
    ],
    invalidationChecklist: [
      'If price prints a candle body close beyond the 1.0 swing origin, the OTE leg is dead.'
    ],
    riskRules: [
      'Risk 1% per setup; target minimum 1:3 risk-to-reward using the -0.62 extension.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Impulse Leg Identification', detail: 'Confirm clean displacement breaking a prior structural high.' },
      { step: 2, title: 'Apply Fib Tool', detail: 'Anchor from low (0.0) to high (1.0).' },
      { step: 3, title: 'Highlight 70.5% Confluence', detail: 'Identify the FVG sitting directly on the 0.705 sweet spot.' },
      { step: 4, title: 'Target Extensions', detail: 'Take partials at 1.0 high, final offload at -0.62 extension.' }
    ],
    visualAnatomy: 'Impulse swing with shaded green OTE zone between 62% and 79%, with a bold red line at 70.5% sweet spot and target at -0.62 extension.',
    relatedPdArrays: ['Fibonacci Retracement', 'Fair Value Gap', 'Order Block'],
    quote: 'The 70.5% level is not arbitrary math; it is the statistical center of institutional re-pricing in discount.'
  },

  // 19. The 3-Day Rule (2026 Mentorship)
  {
    id: 'mc_19_three_day_rule',
    number: 19,
    title: 'The ICT 3-Day Rule Masterclass',
    subtitle: '2026 Mentorship: "Your Entire Universe of Liquidity and Inefficiencies Exists in the Last 3 Days"',
    category: 'mentorship_2026',
    diagramType: 'three_day_rule',
    coreRule: 'Michael J. Huddleston teaches that you do not need 6 months of historical data for intraday index trading. Your entire relevant universe of liquidity and inefficiencies can be summed up in the last 3 days: Day -2 (Wick Grade Reference), Day -1 (Previous Daily Range Octants), and Day 0 (Today\'s projected High or Low of Day).',
    orderOfOperations: [
      'Day -2 (Wednesday for Friday trading): Grade the wicks of the daily candle into quadrants/octants. Mark premium/discount wick extremes.',
      'Day -1 (Thursday for Friday trading): Take the entire previous daily range (High to Low). Divide it into octants (0.125 increments).',
      'Day 0 (Friday / Today): Cluster the Day -2 wick grades with the Day -1 range octants.',
      'Where these mathematical levels intersect marks the PREDICTED HIGH OR LOW OF TODAY with astonishing precision.',
      'Use this cluster as your ultimate Draw on Liquidity or reversal anchor.'
    ],
    keyMistakes: [
      'Overcomplicating charts with ancient monthly levels when the market is responding directly to the 3-day lookback cluster.',
      'Ignoring the previous day range octants when setting intraday profit targets.'
    ],
    invalidationChecklist: [
      'On extreme macro news shocks (NFP/CPI), expansion may exceed the 3-day envelope into 20-day IPDA targets.'
    ],
    riskRules: [
      'When price reaches a 3-Day Rule clustered level, tighten stops to breakeven or lock in 75% profits.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Day -2 Wick Grade', detail: 'Measure the upper and lower wicks of the candle 2 days ago.' },
      { step: 2, title: 'Day -1 Octants', detail: 'Divide yesterday range into 8 equal octants.' },
      { step: 3, title: 'Find Node Confluence', detail: 'Identify where Day -2 wick CE aligns with Day -1 octant line.' },
      { step: 4, title: 'Anticipate LOD/HOD', detail: 'Trade into that confluence node as the projected turning point of today.' }
    ],
    visualAnatomy: 'A 3-day schematic showing Day -2 wick lines projecting forward to intersect Day -1 octants, forming a crosshair target for Day 0.',
    relatedPdArrays: ['Previous Daily Range', 'Wick Grades', 'Consequent Encroachment'],
    quote: 'Stop looking at 5-year charts. Your entire universe of liquidity and inefficiencies can be summed up in the last 3 days.'
  },

  // 20. Smart Money Technique (SMT) Masterclass
  {
    id: 'mc_20_smt_masterclass',
    number: 20,
    title: 'Smart Money Technique (SMT) Masterclass',
    subtitle: 'Cracks in Correlation: NQ vs ES & EURUSD vs DXY Divergence Signatures',
    category: 'algorithmic_signatures',
    diagramType: 'nested_structure',
    coreRule: 'SMT Divergence occurs when two fundamentally correlated assets decouple: one asset makes a higher high (or lower low), while the other fails to do so. This crack in correlation reveals institutional accumulation or distribution. SMT is an observation event, not an entry trigger; you must wait for a CISD to confirm.',
    orderOfOperations: [
      'Display correlated pairs side by side: NQ vs ES, or EURUSD vs DXY (inverted).',
      'At an HTF key level or session open, observe the swing extremes.',
      'Scenario: NQ sweeps its session high to make a new higher high, but ES FAILS to make a new high (prints a lower high).',
      'This is BEARISH SMT DIVERGENCE: ES is showing underlying weakness; NQ move was a manufactured stop raid.',
      'Wait for the leading asset to print a Market Structure Shift (MSS) with displacement and FVG.',
      'Enter short on the asset that showed relative weakness (ES) or short the asset with the cleaner FVG (NQ).'
    ],
    keyMistakes: [
      'Entering immediately when SMT appears without waiting for displacement or CISD confirmation.',
      'Comparing assets that have no fundamental correlation.'
    ],
    invalidationChecklist: [
      'If the lagging asset subsequently breaks out and catches up to make the new high, the SMT has failed.'
    ],
    riskRules: [
      'Risk 1% with stop loss above the swing high of the asset that made the higher high.'
    ],
    stepByStepBreakdown: [
      { step: 1, title: 'Side-by-Side Monitoring', detail: 'Keep ES and NQ open during key killzones (9:30-11:00 AM ET).' },
      { step: 2, title: 'Spot the Divergence', detail: 'Notice NQ making a higher high while ES prints a lower high.' },
      { step: 3, title: 'Wait for CISD', detail: 'Look for the 1M candle body close confirming the shift in delivery.' },
      { step: 4, title: 'Execute with Precision', detail: 'Short the retest of the displacement FVG.' }
    ],
    visualAnatomy: 'Dual chart pane comparing Asset A (higher high) and Asset B (lower high) with a vertical line marking the exact moment of institutional divergence.',
    relatedPdArrays: ['Relative Strength/Weakness', 'Change in State of Delivery', 'Stop Raid'],
    quote: 'When the algorithm cannot move correlated markets in harmony, the crack in the mirror reveals the institutional hand.'
  },
  ...theinnercircletradersNewMasterclasses
];
