import { ICTConcept } from '../types';

export const theinnercircletradersNewConcepts: ICTConcept[] = [
  // 1. ICT VENOM MODEL (2025 Institutional Delivery Framework)
  {
    id: 'ict_venom_model',
    name: 'ICT Venom Model (2025 Framework)',
    category: 'models',
    shortDefinition: 'A five-stage institutional delivery framework combining Higher Timeframe MMXM phases, Candle Range Theory (CRT) reference candle boundaries, SMT divergence confirmation at manipulation extremes, and First Presented FVG execution.',
    source: {
      mentorship: '2024–2025 Mentorship Master Lectures',
      seriesOrMonth: 'Advanced Multi-Model Delivery Pipelines',
      approximateDate: '2025',
      originalTerminology: 'Venom Model & Five-Stage Confluence Chain',
      conceptStatus: 'Advanced Execution',
      lectureReference: 'The Inner Circle Traders 2025 Model Architecture'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that genuine institutional moves do not fire on a single isolated trigger. The algorithm operates through multi-model confluence: HTF curve direction (MMXM), reference candle boundary manipulation (CRT), intermarket non-confirmation (SMT), and immediate displacement execution (First Presented FVG).',
      observableMarketBehavior: 'At key session turning points, one asset breaches a prior session extreme while a sister asset fails to reach it (SMT). Immediately following this non-confirmation, aggressive selling/buying creates an imbalance that acts as the sole valid entry.',
      derivedInterpretation: 'A multi-factor statistical filter chain that requires HTF directional alignment, an algorithmic liquidity sweep, intermarket order flow decoupling, and local momentum displacement before placing risk.'
    },
    explanationLadder: {
      level1Child: 'Think of a bank vault that requires 5 different keys turned at the exact same time before opening. The Venom Model waits for all 5 keys to turn before taking a trade.',
      level2Beginner: 'Instead of taking every Fair Value Gap you see, the Venom Model forces you to wait until price sweeps a specific candle high or low, shows SMT divergence, and then enters on the very first FVG.',
      level3Trader: 'Execute inside London or NY Silver Bullet windows. Wait for price to sweep the CRT Reference Candle High/Low. Confirm SMT divergence with a correlated pair. Enter on the First Presented FVG with stop above the manipulation high. Target the opposite CRT extreme for 1:3+ R:R.',
      level4Advanced: 'Synthesizes Market Maker Buy/Sell Models with intraday Candle Range Theory. The SMT divergence at the CRT extreme proves that one market is being accumulated while the other is being used as liquidity bait.',
      level5ICTFramework: 'Interbank Price Delivery Algorithm (IPDA) repricing sequence: Phase 1 HTF DOL alignment -> Phase 2 Reference Candle boundary sweep -> Phase 3 Intermarket SMT absorption -> Phase 4 Displacement into First Presented FVG -> Phase 5 Delivery to opposing dealing range liquidity.',
      whenItMatters: 'During London Open (02:00-05:00 EST) and New York AM (09:30-11:00 EST) when correlated index futures (NQ/ES/YM) or FX pairs (EUR/GBP) approach prior session extremes.',
      whenToIgnore: 'During mid-day consolidation (12:00-13:00 EST), bank holidays, or when correlated assets are moving in identical lockstep without any SMT divergence.'
    },
    whyItExists: 'Institutional algorithms require massive counterparty liquidity before executing major curve distributions. They engineer sweeps at obvious reference candles and use correlated pairs to absorb retail stops.',
    problemItSolves: 'Stops traders from entering early on false displacements or trading into high-resistance chop without intermarket confirmation.',
    howItForms: [
      'Stage 1: Establish Higher Timeframe Daily Bias and identify current MMXM phase (Accumulation, Manipulation, or Distribution).',
      'Stage 2: Select the CRT Reference Candle (e.g., Asian Session Candle for London Open, or London Session Candle for NY Open). Mark its High and Low.',
      'Stage 3: Watch price manipulate beyond the Reference Candle extreme. Require SMT Divergence between correlated pairs (e.g., NQ sweeps high while ES fails to sweep high).',
      'Stage 4: Wait for Change in State of Delivery (CISD) and identify the First Presented FVG formed during displacement.',
      'Stage 5: Enter at the First Presented FVG (or its 50% Consequent Encroachment) and target the opposite Reference Candle extreme or HTF Draw on Liquidity.'
    ],
    chartAnatomy: 'Chart shows a Reference Candle with High and Low marked. An aggressive wick sweeps the High into SMT divergence with ES. A sharp bearish displacement candle slices down, leaving a crisp Fair Value Gap labeled "First Presented FVG (Venom Entry)". Price retraces into the FVG and dumps toward the Reference Candle Low.',
    identificationRules: [
      'The sweep must occur at a designated CRT Reference Candle extreme.',
      'Correlated asset (NQ vs ES, or EURUSD vs GBPUSD) MUST exhibit clear SMT divergence at the extreme.',
      'Displacement candle must close decisively through the opposing candle bodies (CISD).',
      'Entry is strictly placed at the First Presented FVG—do not wait for 2nd or 3rd secondary gaps.'
    ],
    validCharacteristics: [
      'Clean SMT divergence where one asset sweeps and the other leaves an obvious failure swing.',
      'Heavy body displacement leaving a clean 3-candle imbalance with no immediate wick overlap.',
      'Target provides at least 2.5x the distance of the required stop loss.'
    ],
    invalidCharacteristics: [
      'Both correlated assets make new highs simultaneously (no SMT divergence).',
      'The FVG is immediately filled and breached by counter-displacement candles.',
      'Entry taken during off-hours outside institutional killzones.'
    ],
    howICTUsesIt: 'ICT teaches the Venom Model to advanced students as the gold standard for high-stakes prop firm evaluation trading, where high win-rate and low drawdown are mandatory.',
    commonMistakes: [
      'Entering before SMT divergence confirms—jumping into the sweep while price is still expanding.',
      'Skipping the First Presented FVG and chasing price as it runs toward the target.'
    ],
    advancedNuances: 'If the First Presented FVG aligns directly with an old Breaker Block (the Unicorn confluence), the Venom Model reaches its highest statistical expectancy.',
    prerequisites: ['power_of_three_amd', 'smt_divergence', 'fair_value_gap', 'breaker_block'],
    relatedConcepts: ['Unicorn Model', 'Candle Range Theory', 'SMT Divergence', 'First Presented FVG', 'MMXM'],
    bullishScenario: 'London Open CRT: Asian Low is swept at 02:45 EST. GBPUSD breaks Asian low, but EURUSD forms a higher low (Bullish SMT). A 5-minute displacement candle rallies, printing a clean BISI. Trader enters on 50% CE of the First Presented FVG, stop below the manipulation low, targeting Asian High for a +45 pip run.',
    bearishScenario: 'NY AM Session: NQ sweeps London High at 09:55 EST, but ES fails to reach its London High (Bearish SMT). NQ prints a rapid bearish displacement candle closing below the opening price of the upward leg (CISD). Trader limits into the First Presented FVG at 10:02 EST, targeting the London Low for +85 points.',
    counterexample: 'Taking an FVG entry when NQ and ES both broke the high cleanly with no divergence, resulting in getting stopped out as institutional buying continued higher.',
    invalidationCriteria: 'A candle body close beyond the extreme manipulation high/low or failure of the First Presented FVG.',
    diagramType: 'fvg_formation',
    simplifiedExplanation: 'Wait for price to fake out beyond an important session high or low. Check if sister markets disagree (SMT). When price snaps back like a venomous strike, enter on the very first gap and ride it to the other side.'
  },

  // 2. ICT REAPER IFVG (2025 Inversion FVG Variant)
  {
    id: 'ict_reaper_ifvg',
    name: 'ICT Reaper IFVG (Predatory Inversion Trap)',
    category: 'imbalances',
    shortDefinition: 'An advanced 2025 Inversion Fair Value Gap variant: an apparent IFVG that baits retail breakout traders into entering an inversion, only to immediately re-invert violently and harvest their stop orders.',
    source: {
      mentorship: '2024–2025 Advanced Inversion Research',
      seriesOrMonth: 'Predatory Orderflow & Retest Traps',
      approximateDate: '2025',
      originalTerminology: 'Reaper IFVG & Liquidity Harvesting',
      conceptStatus: 'Advanced Execution',
      lectureReference: 'The Inner Circle Traders 2025 Inversion Mechanics'
    },
    tripartiteView: {
      ictTeaching: 'Institutions know retail smart money traders buy broken FVGs (IFVGs). To harvest liquidity, the algorithm deliberately allows price to pierce an IFVG, print a shallow confirmation to trap late retail buyers, and then immediately cuts back through it with ferocious institutional displacement.',
      observableMarketBehavior: 'Price breaches a bearish FVG upward, tempting breakout buyers. It hovers briefly at the top of the zone, then an enormous bearish candle engulfs the entire zone in a single print, trapping all long breakout participants.',
      derivedInterpretation: 'A dual-liquidity trap pattern where an established technical level is temporarily validated to induce resting stop orders behind it before being liquidated by dominant order flow.'
    },
    explanationLadder: {
      level1Child: 'Imagine a trapdoor disguised as a solid wooden bridge. When everyone steps onto it thinking it is safe, the trapdoor drops them through.',
      level2Beginner: 'Standard IFVG traders buy as soon as a gap is breached. The Reaper IFVG punishes them by faking a bounce and then plunging straight through their stop losses.',
      level3Trader: 'Look for a bearish FVG that gets penetrated upward during a low-volume pre-macro window. When the macro hits, observe if price immediately fails to hold the IFVG and prints a strong bearish candle back through both boundaries. Enter short on the re-inversion, targeting the trapped retail stops below.',
      level4Advanced: 'The Reaper IFVG is diagnosed by checking HTF Draw on Liquidity. If the HTF bias is bearish, an upward breach of an LTF FVG is merely a liquidity inducement (IDM) engineered to sell into premium liquidity.',
      level5ICTFramework: 'Algorithmic liquidity re-harvesting: The primary market maker program remains in sell-delivery. The shallow inversion was an engineered imbalance fill to accumulate sell-side inventory against retail limit orders.',
      whenItMatters: 'During the 09:50-10:10 AM or 13:10-13:40 PM macro windows when retail traders are aggressively trading lower-timeframe IFVG flips.',
      whenToIgnore: 'When the higher-timeframe structure has already broken in the direction of the first inversion with massive daily displacement.'
    },
    whyItExists: 'As standard IFVG trading became widely adopted by retail SMC communities, institutional algorithms adjusted by engineering secondary traps at the exact inversion boundaries.',
    problemItSolves: 'Prevents traders from getting chopped up in failed IFVG entries and provides a high-velocity reversal setup when an inversion fails.',
    howItForms: [
      'Step 1: A bearish FVG forms during earlier price action.',
      'Step 2: Price moves upward and penetrates the FVG, leading retail traders to mark it as a bullish Inversion FVG (support).',
      'Step 3: Price prints a small, weak reaction off the IFVG zone to induce retail buying and trap stop orders directly below the zone.',
      'Step 4: The institutional algorithm executes aggressive sell orders, smashing through the IFVG with heavy candle bodies (The Reaper Re-Inversion).',
      'Step 5: Enter short on the underside retest of the Reaper zone, with stops above the fakeout wick, targeting the sell-side liquidity resting below the origin.'
    ],
    chartAnatomy: 'Box showing a prior Bearish FVG. Price wicks above it, looks like an IFVG flip, then a massive solid red candle cuts through it, leaving trapped long wicks. Retest of the bottom of the box rejects downward violently.',
    identificationRules: [
      'The initial inversion must lack sustained HTF displacement follow-through.',
      'The re-inversion candle body must cleanly close completely back through the opposite side of the gap.',
      'Higher timeframe Draw on Liquidity must align with the direction of the Reaper re-inversion.'
    ],
    validCharacteristics: [
      'Fast, aggressive rejection immediately following the retail inducement bounce.',
      'Clear pool of retail stop losses resting beneath the setup.'
    ],
    invalidCharacteristics: [
      'Price lingers inside the zone without clear displacement in either direction.',
      'Higher timeframe structure strongly supports the initial inversion.'
    ],
    howICTUsesIt: 'Used to punish retail SMC complacency and catch high-velocity expansion legs fueled by the liquidation of trapped breakout traders.',
    commonMistakes: [
      'Fighting the Reaper move and stubbornly re-buying a failing IFVG.',
      'Not identifying the true HTF Draw on Liquidity before trading lower-timeframe inversions.'
    ],
    advancedNuances: 'Reaper IFVGs frequently form at the 50% Consequent Encroachment of a higher-timeframe Fair Value Gap, combining multi-timeframe liquidity mechanics.',
    prerequisites: ['fair_value_gap', 'inverse_fair_value_gap', 'displacement_engine'],
    relatedConcepts: ['Standard IFVG', 'Trapdoor Liquidity', 'Consequent Encroachment', 'Draw on Liquidity'],
    bullishScenario: 'Bullish Reaper: A bullish FVG is sliced down, tempting retail bears to short the IFVG. Price bounces weakly, then an institutional green candle engulfs the entire zone upward. Enter long on the top-side retest, targeting buy stops above the range.',
    bearishScenario: 'Bearish Reaper: A 15-minute SIBI is breached upward on NQ at 09:40 AM. Retail traders buy the IFVG. At 09:50 AM macro, a 40-point red candle annihilates the IFVG. Trader enters short on the underside retest at 09:54 AM, targeting London Lows.',
    counterexample: 'Assuming an IFVG will always hold as support without checking whether the HTF bias has completed its draw on liquidity.',
    invalidationCriteria: 'Price accepting and closing back above the Reaper manipulation extreme.',
    diagramType: 'ifvg_inversion',
    simplifiedExplanation: 'When an Inversion FVG fails to hold and price aggressively reverses back through it, do not cry about the loss—flip your bias immediately and ride the Reaper move that harvests everyone who got trapped.'
  },

  // 3. ICT SUSPENSION BLOCK (2025 Order Block Variant)
  {
    id: 'ict_suspension_block',
    name: 'ICT Suspension Block (2025 Order Block Variant)',
    category: 'order_blocks',
    shortDefinition: 'An institutional order block hanging suspended between internal and external liquidity pools where price pauses during an aggressive trend expansion before launching the second leg of delivery.',
    source: {
      mentorship: '2024–2025 Advanced Order Block Series',
      seriesOrMonth: 'In-Flight Institutional Refueling Models',
      approximateDate: '2025',
      originalTerminology: 'Suspension Block & Mid-Range Accumulation',
      conceptStatus: 'Advanced Execution',
      lectureReference: 'The Inner Circle Traders 2025 Order Block Compendium'
    },
    tripartiteView: {
      ictTeaching: 'When the market is in a violent Low Resistance Liquidity Run (LRLR), the algorithm does not return all the way to origin order blocks. Instead, it creates a brief suspension block midway between dealing ranges to collect resting limit orders before expanding into external liquidity.',
      observableMarketBehavior: 'In a strong trending day, price consolidates into a single opposing candle in the middle of a price void. It taps this candle by only a few ticks and immediately surges in trend direction without deep retracement.',
      derivedInterpretation: 'A continuation order block formed during momentum acceleration that serves as an institutional re-accumulation node when volatility prevents full equilibrium pullbacks.'
    },
    explanationLadder: {
      level1Child: 'Like an airplane refueling mid-air without landing at the airport, a suspension block refuels price in mid-flight so it can keep speeding to its destination.',
      level2Beginner: 'Traders waiting for a 50% discount retracement miss the whole move on trend days. A suspension block is the shallow resting block where institutions jump back in.',
      level3Trader: 'Identify a strong trending session where internal liquidity has been cleared and price is driving toward an obvious HTF target. Mark the single opposing candle formed during the continuation pause. Enter on the first touch of the suspension block candle high/low with a tight stop behind its body.',
      level4Advanced: 'Distinguish between a Propulsion Block and a Suspension Block: A Propulsion Block re-tests an existing Order Block that previously triggered; a Suspension Block forms in open space suspended between two distinct liquidity pools.',
      level5ICTFramework: 'Algorithmic delivery mode: Low Resistance Liquidity Run (LRLR). The algorithm is running a programmatic delivery sequence to external liquidity and cannot allow deep retracements that would grant retail participants favorable discount pricing.',
      whenItMatters: 'During clean trend days (e.g., post-CPI, NFP expansion, or Wednesday/Thursday weekly expansion days) when price refuses to retrace to equilibrium.',
      whenToIgnore: 'In range-bound, choppy, or High Resistance Liquidity Run (HRLR) conditions where deep pullbacks and double sweeps are standard.'
    },
    whyItExists: 'Institutional programs cannot risk missing HTF targets during high-urgency delivery runs. They match orders at suspended continuation levels rather than giving the market a full retracement.',
    problemItSolves: 'Solves the classic trader dilemma of being left behind on the strongest trending days of the month while waiting for deep OTE retracements that never come.',
    howItForms: [
      'Step 1: Price initiates a Low Resistance Liquidity Run (LRLR) from an originating HTF PD array.',
      'Step 2: External Draw on Liquidity remains clear and distant (e.g., multi-day equal highs or weekly buy-side liquidity).',
      'Step 3: Mid-trend, price prints 1 or 2 small counter-trend candles that pause momentum without breaking any structural swing low/high.',
      'Step 4: Immediate displacement candle resumes the trend, leaving the counter-trend candle suspended in open space (The Suspension Block).',
      'Step 5: When price dips back into the high of this candle (for bullish) or low (for bearish), enter immediately with stop placed just past the suspension block body.'
    ],
    chartAnatomy: 'A steep 45-degree upward trend. In the middle of the run, two small down-candles sit isolated like a ledge. A green expansion candle launches off them. The zone is tagged as "Suspension Block Re-Entry".',
    identificationRules: [
      'Must occur between an internal liquidity clearing event and an unreached external liquidity pool.',
      'The suspension candle body must be small relative to the preceding and following expansion candles.',
      'Price must not close beyond 50% of the suspension block candle body on the retest.'
    ],
    validCharacteristics: [
      'Clear, unhindered price void between the suspension block and the external target.',
      'Fast rejection upon touch with minimal wick drawdown.'
    ],
    invalidCharacteristics: [
      'Price closes through the entire suspension block—signals delivery exhaustion or pending reversal.',
      'Formation occurs near major higher timeframe resistance/support.'
    ],
    howICTUsesIt: 'Used as an aggressive re-entry vehicle for traders who missed the morning open or need to pyramid winning trend positions safely.',
    commonMistakes: [
      'Waiting for price to reach the 0.618 OTE level when a suspension block has already initiated the next leg.',
      'Using suspension blocks in consolidating or choppy market conditions.'
    ],
    advancedNuances: 'Suspension blocks that overlap with a New Day Opening Gap (NDOG) or New Week Opening Gap (NWOG) provide unmatched continuation velocity.',
    prerequisites: ['order_block', 'displacement_engine', 'lrlr_vs_hrlr'],
    relatedConcepts: ['Propulsion Block', 'Order Block', 'LRLR', 'Pyramiding'],
    bullishScenario: 'Gold rallies from $2,620 to $2,660. At $2,642, price prints a single 5-minute red candle and then explodes to $2,652. On a quick 3-minute dip back to $2,643, trader enters long on the Suspension Block, risking 15 pips to target $2,665.',
    bearishScenario: 'NQ sells off 150 points post-cash open. At 10:15 AM, a single 1-minute green candle forms at 20,420 before another 40-point sell wave. Price retraces to 20,418. Trader shorts the Suspension Block, stop at 20,425, targeting 20,350.',
    counterexample: 'Attempting to trade a suspension block when price is only 5 points away from the daily high, buying directly into terminal resistance.',
    invalidationCriteria: 'A candle body close violating the distal boundary of the suspension block.',
    diagramType: 'propulsion_block',
    simplifiedExplanation: 'When a rocket is blasting into space, it does not fly back to earth to pick up more fuel. The Suspension Block is an in-flight refueling station where smart money hops on board mid-trend.'
  },

  // 4. ICT RDRB (Redelivered Balanced Price Range)
  {
    id: 'ict_rdrb',
    name: 'ICT RDRB (Redelivered Balanced Price Range)',
    category: 'imbalances',
    shortDefinition: 'When an existing Balanced Price Range (BPR)—formed by overlapping opposing FVGs—is revisited, respected, and defended a second time, providing an ultra-high-probability confirmation entry.',
    source: {
      mentorship: '2024–2025 Balanced Price Range Refinements',
      seriesOrMonth: 'Re-delivery Mechanics & CE Defense',
      approximateDate: '2025',
      originalTerminology: 'RDRB & Two-Sided Algorithmic Defense',
      conceptStatus: 'Advanced Execution',
      lectureReference: 'The Inner Circle Traders 2025 Imbalance Masterclass'
    },
    tripartiteView: {
      ictTeaching: 'A Balanced Price Range is the ultimate two-sided efficiency zone created when a bullish FVG and a bearish FVG completely overlap. When price re-delivers into this zone a second time (RDRB) and closes within Consequent Encroachment (50%), the level is virtually unbreakable.',
      observableMarketBehavior: 'An overlapping gap zone acts as instant resistance on the first bounce. Price pushes away, returns to test the level once more, forms a clean wick rejection without candle bodies penetrating the 50% midpoint, and then accelerates away.',
      derivedInterpretation: 'A proven equilibrium level where institutional liquidity has already traded both sides of the spread, leaving zero directional imbalance and transforming the area into an immovable algorithmic pivot.'
    },
    explanationLadder: {
      level1Child: 'Think of a bridge that was tested by an elephant once and held strong. When the elephant steps on it a second time, you know with 100% confidence it will not break.',
      level2Beginner: 'A Balanced Price Range is where buyers and sellers were matched equally. The RDRB is when price returns to that balance a second time and bounces cleanly.',
      level3Trader: 'Identify an established BPR from an earlier session or morning open. On the second visit (RDRB), wait for price to touch the BPR without candle bodies closing beyond the 50% Consequent Encroachment. Enter on the rejection candle close with stop just outside the BPR boundary.',
      level4Advanced: 'RDRB trades offer higher win rates than initial BPR touches because institutional order book commitment is empirically confirmed rather than hypothesized.',
      level5ICTFramework: 'IPDA re-delivery verification: The algorithm has successfully rebalanced both buy and sell liquidity. The second delivery tests residual resting volume; once absorbed, the market shifts directly to aggressive distribution.',
      whenItMatters: 'During London Close (10:00-12:00 EST) and NY PM sessions when morning BPR zones are re-tested before the final daily expansion.',
      whenToIgnore: 'If candle bodies close decisively beyond the 50% midpoint (Consequent Encroachment) of the BPR, which invalidates the balance.'
    },
    whyItExists: 'Algorithms must ensure that large volume tranches transferred during two-sided imbalance creation are fully settled before expanding price to new extremes.',
    problemItSolves: 'Removes the anxiety of trading unconfirmed imbalances by providing an entry that has already demonstrated active institutional defense.',
    howItForms: [
      'Step 1: Rapid up-move creates a bullish FVG; immediate rapid down-move creates a bearish FVG over the exact same price coordinates (BPR formed).',
      'Step 2: Price delivers into the BPR the first time and reacts away (First Delivery).',
      'Step 3: Price moves back toward the BPR for a second delivery (The RDRB - Redelivery Phase).',
      'Step 4: Price wicks into the BPR but candle bodies strictly respect the 50% Consequent Encroachment midpoint.',
      'Step 5: Enter upon confirmation of the wick rejection, targeting the recent structural swing high/low.'
    ],
    chartAnatomy: 'Two overlapping shaded boxes showing a bullish and bearish FVG occupying the same price band. Arrow 1 shows initial bounce. Arrow 2 shows the RDRB re-test with twin wicks rejecting the 50% dotted CE line and exploding away.',
    identificationRules: [
      'The BPR must consist of genuine opposing displacement FVGs that share common price coordinates.',
      'The re-delivery must respect the Consequent Encroachment (50% midpoint) on a candle body closing basis.',
      'Volume on the second re-delivery should contract during entry and expand violently on exit.'
    ],
    validCharacteristics: [
      'Clean wick rejection touching the outer edge or midpoint of the BPR.',
      'Candle bodies stay firmly outside the opposing boundary.'
    ],
    invalidCharacteristics: [
      'Candle bodies close completely through the BPR, destroying the balance zone.',
      'Lack of clear HTF Draw on Liquidity to pull price away from the re-delivery.'
    ],
    howICTUsesIt: 'ICT highlights the RDRB as a core weapon for conservative traders who prefer trading off established footprints rather than anticipating first-time reactions.',
    commonMistakes: [
      'Entering before the second touch candle closes, risking getting caught in an unexpected through-run.',
      'Confusing a standard single FVG retest with a genuine dual-sided BPR re-delivery.'
    ],
    advancedNuances: 'When an RDRB occurs inside an institutional Killzone while SMT divergence is active, it forms one of the rarest 90%+ hit-rate setups in the entire ICT curriculum.',
    prerequisites: ['fair_value_gap', 'consequent_encroachment', 'inverse_fair_value_gap'],
    relatedConcepts: ['Balanced Price Range (BPR)', 'Consequent Encroachment', 'Two-Sided Delivery', 'Wick Rejection'],
    bullishScenario: 'EURUSD prints overlapping 15m FVGs at 1.0820-1.0830. Initial morning rally pushes away. At 10:15 AM London Close macro, price dips back into 1.0825 (RDRB), wicks off 50% CE, and launches +50 pips to daily high.',
    bearishScenario: 'ES prints a BPR at 5,840-5,845. Afternoon dip tests 5,842. Twin wicks reject without a single 5-minute body closing above 5,843. Trader shorts the RDRB, stop at 5,847, targets 5,815.',
    counterexample: 'Taking an RDRB trade where the second touch saw an aggressive candle body close all the way through the bottom of the BPR, invalidating the setup.',
    invalidationCriteria: 'A candle body close through the distal edge of the Balanced Price Range.',
    diagramType: 'fvg_formation',
    simplifiedExplanation: 'When a fortress wall has already repelled one army, you know it is strong. The RDRB is returning to that fortress wall a second time to trade safely behind institutional shields.'
  },

  // 5. CANDLE RANGE THEORY (CRT) STRATEGY
  {
    id: 'ict_crt_candle_range_theory',
    name: 'Candle Range Theory (CRT) Framework',
    category: 'models',
    shortDefinition: 'A systematic pre-session framework where a designated Reference Candle boundary is mapped, its extremes manipulated, and price delivered across to the opposing boundary.',
    source: {
      mentorship: '2023–2025 ICT Mentorship Series',
      seriesOrMonth: 'Candle Range Theory & Boundary Manipulation',
      approximateDate: '2024',
      originalTerminology: 'CRT Reference Candle & Boundary Sweep',
      conceptStatus: 'Active Core',
      lectureReference: 'The Inner Circle Traders CRT Strategic Overview'
    },
    tripartiteView: {
      ictTeaching: 'Price delivery is fractal and candle-based. For any upcoming session, an earlier candle serves as the Reference Candle (RC). The algorithm manipulates beyond one extreme of the RC to engineer liquidity, then distributes through the range toward the opposite extreme.',
      observableMarketBehavior: 'In London session, price almost universally sweeps either the Asian session high or low before reversing. In NY session, price sweeps the London session high or low before reversing toward daily targets.',
      derivedInterpretation: 'A mean-reversion and range-expansion algorithmic model that anchors session volatility boundaries to prior time containers and targets opposing boundary stops.'
    },
    explanationLadder: {
      level1Child: 'Imagine a tennis ball bouncing between two walls. The CRT strategy marks the two walls before the game starts and waits for the ball to hit one wall before catching it as it flies to the other wall.',
      level2Beginner: 'Before every session, draw horizontal lines at the high and low of the previous session candle. Whichever line gets broken first with a fakeout is the signal to trade toward the opposite line.',
      level3Trader: 'Five-Step CRT Checklist: 1. Confirm HTF Daily Bias. 2. Mark Reference Candle High and Low. 3. Watch for manipulation sweep of one extreme. 4. Confirm CISD / MSS and enter on First Presented FVG. 5. Target the opposite Reference Candle extreme.',
      level4Advanced: 'London Open CRT uses the Asian Session Candle as the Reference Candle. New York Open CRT uses the London Session Candle as the Reference Candle. Daily CRT uses the Weekly Candle as the Reference Candle.',
      level5ICTFramework: 'Fractal PO3 within time containers: The Reference Candle represents the Accumulation phase. The sweep of its extreme is the Manipulation phase (Judas). The run through its body is the Distribution phase.',
      whenItMatters: 'Every single trading day during pre-session preparation before London Open (02:00 EST) and before NY Cash Open (09:30 EST).',
      whenToIgnore: 'When price opens directly outside the Reference Candle range on high-impact news gaps and runs without any manipulation retest.'
    },
    whyItExists: 'Price needs defined dealing boundaries. Algorithms use prior session candle extremes as standardized pools of resting stop orders to ignite momentum.',
    problemItSolves: 'Eliminates aimless chart scrolling by giving the trader an exact, mechanical 2-line framework before the session bell rings.',
    howItForms: [
      'Step 1: Identify the Reference Candle (Asian Range for London; London Range for NY).',
      'Step 2: Mark Reference Candle High (BSL) and Reference Candle Low (SSL).',
      'Step 3: Align with Daily Bias. If bias is bullish, anticipate an initial sweep of the Reference Candle Low (Manipulation).',
      'Step 4: As the Low is swept, look for SMT divergence and wait for a Change in State of Delivery (CISD) / MSS.',
      'Step 5: Enter on the displacement FVG and target the Reference Candle High for full take profit.'
    ],
    chartAnatomy: 'Box showing Asian Session (Reference Candle). Blue line at Asian High, red line at Asian Low. Price dips below the red line at 02:30 London, prints an MSS, and rallies all the way through to break the blue line at Asian High.',
    identificationRules: [
      'Reference Candle must be fully closed and settled before marking its boundaries.',
      'Manipulation must be an authentic sweep (wicks beyond with quick rejection) rather than sustained multiple-body trend continuation.',
      'Target must always be the opposing Reference Candle boundary or higher timeframe draw.'
    ],
    validCharacteristics: [
      'Direction of the trade aligns with the Higher Timeframe Daily Bias.',
      'Clear SMT divergence present at the manipulation sweep of the Reference Candle extreme.'
    ],
    invalidCharacteristics: [
      'Trading in the direction of the initial sweep without waiting for manipulation and reversal.',
      'Reference Candle range is excessively wide (>80 pips on FX, >150 pts on NQ), indicating low-probability follow-through.'
    ],
    howICTUsesIt: 'Used as the fundamental mechanical daily routine that dictates whether an ICT operator is looking for Buy-side or Sell-side delivery in the upcoming session.',
    commonMistakes: [
      'Buying the breakout of the Reference Candle High rather than anticipating the manipulation sweep.',
      'Failing to take profit at the opposite Reference Candle extreme and greedily hoping for unbounded runners.'
    ],
    advancedNuances: 'Stacked CRT: When Session 1 CRT delivers into Session 2, the Session 1 delivery candle itself becomes the Reference Candle for Session 2, creating multi-session compounding moves.',
    prerequisites: ['power_of_three_amd', 'buy_side_liquidity', 'sell_side_liquidity'],
    relatedConcepts: ['Asian Range', 'Judas Swing', 'Reference Candle', 'Stacked CRT', 'MMXM'],
    bullishScenario: 'London Open CRT: Asian High is 20,450; Asian Low is 20,400. Daily bias is Bullish. At 02:35 EST, NQ dips to 20,392 (sweeping Asian Low). At 02:45 EST, a 5m green candle closes at 20,412 (CISD). Trader enters long on the FVG at 20,405, targeting 20,450 Asian High (+45 pts).',
    bearishScenario: 'NY Open CRT: London High is 1.0880; London Low is 1.0820. Daily bias is Bearish. At 09:35 EST, EURUSD spikes to 1.0885 (sweeping London High). SMT confirms with GBPUSD. A rapid red candle prints an MSS. Trader shorts the FVG, targeting 1.0820 London Low (+60 pips).',
    counterexample: 'Buying above the Asian High thinking it is a momentum breakout, only to have London dump immediately to the Asian Low.',
    invalidationCriteria: 'Price accepting multiple candle body closes outside the Reference Candle without showing any signs of displacement in reverse.',
    diagramType: 'po3_amd',
    simplifiedExplanation: 'Mark the high and low of the previous session. Whichever side gets broken first is almost always the fakeout. Once the fakeout happens, trade back toward the other side.'
  },

  // 6. ICT SICK SISTER STRATEGY (Trading Correlated SMT Divergence)
  {
    id: 'ict_sick_sister_strategy',
    name: 'ICT Sick Sister Strategy (Correlated SMT Execution)',
    category: 'models',
    shortDefinition: 'An institutional pair-selection framework that uses SMT divergence to identify the weakest (or strongest) correlated asset and trade that specific asset for maximum velocity and profit.',
    source: {
      mentorship: '2023–2025 Mentorship Master Lectures',
      seriesOrMonth: 'Intermarket Correlation & Relative Strength',
      approximateDate: '2024',
      originalTerminology: 'Sick Sister & Relative Weakness Arbitrage',
      conceptStatus: 'Active Core',
      lectureReference: 'The Inner Circle Traders SMT Master Series'
    },
    tripartiteView: {
      ictTeaching: 'In a basket of correlated assets (such as NQ, ES, and YM in equity futures, or EURUSD, GBPUSD, and AUDUSD in forex), genuine institutional buying or selling does not distribute equally. The asset that fails to make a higher high during a bullish sweep is under heavy institutional distribution (the "sick sister" to short).',
      observableMarketBehavior: 'During an index rally, ES and YM break to new highs while NQ lags and prints a lower high. When the market reverses, NQ falls twice as fast and twice as far as ES and YM.',
      derivedInterpretation: 'Relative strength and weakness arbitrage within correlated instruments that maximizes beta and momentum capture by shorting the weakest component or buying the strongest component.'
    },
    explanationLadder: {
      level1Child: 'If three runners are racing up a hill and one of them starts stumbling and falling behind, you know that runner will be the first one to roll all the way back down when the hill gets steep.',
      level2Beginner: 'When comparing NQ and ES, if ES makes a new high but NQ fails to make a new high, NQ is the "sick sister". If you want to short, short NQ, because it has already shown it has no buyers.',
      level3Trader: 'Monitor NQ, ES, and YM side-by-side at key session macro times. When SMT divergence occurs at a key liquidity pool, identify which index shows relative weakness. Enter short on the sick sister using its First Presented FVG. Expect deeper targets and faster delivery.',
      level4Advanced: 'In Forex: If EURUSD sweeps a swing high while GBPUSD refuses to sweep its high, GBP is the sick sister. When the DXY rallies, GBPUSD will dump harder than EURUSD.',
      level5ICTFramework: 'Institutional order flow concentration: Smart money uses the liquid leader (e.g. ES) to engineer a cosmetic breakout to absorb retail stops, while quietly offloading heavy institutional inventory in the weaker asset (e.g. NQ).',
      whenItMatters: 'At major macro inflection points (09:50 AM Silver Bullet, London Open 03:00 AM) when choosing which specific contract to trade from a watchlist.',
      whenToIgnore: 'When all assets are moving in identical correlation without any divergence, or during isolated single-asset idiosyncratic news (e.g. Apple earnings affecting NQ only).'
    },
    whyItExists: 'Institutional market makers allocate order flow across multiple related exchanges and use correlated proxies to disguise their true net directional exposure.',
    problemItSolves: 'Eliminates the frustration of choosing the "wrong pair" that barely moves while a correlated peer makes a 100-point trend run.',
    howItForms: [
      'Step 1: Open synchronized charts of correlated assets (e.g. NQ and ES, or EURUSD and GBPUSD).',
      'Step 2: Observe price approaching a key liquidity pool (e.g. Previous Day High).',
      'Step 3: Instrument A pushes into the liquidity pool and prints a higher high.',
      'Step 4: Instrument B fails to reach the equivalent liquidity pool and prints an obvious lower high (SMT Divergence confirmed).',
      'Step 5: Instrument B is classified as the "Sick Sister". Execute short trades exclusively on Instrument B on its first displacement FVG.'
    ],
    chartAnatomy: 'Two stacked charts: Top chart (ES) shows a higher high sweeping liquidity. Bottom chart (NQ) shows a lower high failing to sweep. Downward arrow shows NQ plunging 120 points while ES only drops 30 points.',
    identificationRules: [
      'Both instruments must be highly correlated (historical correlation > 0.85).',
      'The divergence must occur simultaneously at the exact same minute timestamp.',
      'The sick sister must confirm with an immediate displacement candle and FVG.'
    ],
    validCharacteristics: [
      'Clear, undeniable visual difference at the swing points (one swept, one failed).',
      'Follow-through displacement in the sick sister produces clean, large-body candles.'
    ],
    invalidCharacteristics: [
      'Divergence is minor or ambiguous due to slight timing lags.',
      'Attempting to short the leader instead of the sick sister.'
    ],
    howICTUsesIt: 'ICT uses the Sick Sister strategy to maximize profit factor and trade efficiency by always holding the asset that offers the least path of resistance.',
    commonMistakes: [
      'Shorting the asset that made the higher high (the leader) because it "looks higher", while the sick sister drops without you.',
      'Ignoring the strategy on Gold/Silver or Index futures where it provides daily actionable edge.'
    ],
    advancedNuances: 'The inverse also applies: In a bullish market where ES makes a lower low but NQ prints a higher low, NQ is the "strong sister" (leader) and should be bought for explosive upside runs.',
    prerequisites: ['smt_divergence', 'market_structure_bos_mss_choch', 'fair_value_gap'],
    relatedConcepts: ['SMT Divergence', 'Relative Strength', 'Asset Selection', 'Unicorn Model'],
    bullishScenario: 'Bullish Strong Sister: ES sweeps overnight low at 09:32 AM. NQ refuses to break overnight low, holding 20 points above it (Bullish SMT). Trader buys NQ. NQ surges +140 points while ES only crawls +25 points.',
    bearishScenario: 'Bearish Sick Sister: London Open: EURUSD spikes through 1.0850 high. GBPUSD stalls at 1.2980, 15 pips below its high (Sick Sister). Trader shorts GBPUSD on the 5m FVG at 1.2975. GBPUSD drops 70 pips while EURUSD only drops 25 pips.',
    counterexample: 'Shorting ES because it made the new high, only to watch ES stay stubborn and chop while NQ collapsed 100 points.',
    invalidationCriteria: 'The sick sister suddenly prints an explosive move that breaks above the divergence high, invalidating the weakness thesis.',
    diagramType: 'nested_structure',
    simplifiedExplanation: 'When picking which horse to bet against, pick the one that is already limping. The Sick Sister Strategy finds the asset that cannot even reach the highs, so when the sell-off comes, it falls like a stone.'
  },

  // 7. ICT DOUBLE PURGE STRATEGY
  {
    id: 'ict_double_purge',
    name: 'ICT Double Purge (Dual Liquidity Clearing)',
    category: 'liquidity',
    shortDefinition: 'A high-volatility institutional pattern where both sides of the market (Sell-side and Buy-side liquidity) are systematically swept back-to-back before price commits to its genuine macro trend.',
    source: {
      mentorship: '2023–2025 Core Content Refinements',
      seriesOrMonth: 'Dual-Sided Liquidity Sweeps & Book Neutralization',
      approximateDate: '2024',
      originalTerminology: 'Double Purge & Orderbook Reset',
      conceptStatus: 'Active Core',
      lectureReference: 'The Inner Circle Traders Liquidity Masterclass'
    },
    tripartiteView: {
      ictTeaching: 'Market makers frequently encounter resting liquidity on both sides of a tight range. Before a massive trending day or major economic release, the algorithm executes a Double Purge: first sweeping Sell-side Liquidity (SSL), then rallying violently to sweep Buy-side Liquidity (BSL), and finally launching the true macro move lower (or vice-versa).',
      observableMarketBehavior: 'Price spikes down 30 points, instantly reverses and spikes up 50 points, trapping breakout traders in both directions, before decisively trending in the true direction.',
      derivedInterpretation: 'Dual-sided stop hunting that neutralizes all resting limit orders and stops in the order book, creating an empty price vacuum that allows rapid low-resistance directional expansion.'
    },
    explanationLadder: {
      level1Child: 'Imagine a vacuum cleaner that cleans the left corner of the room, then cleans the right corner of the room, and now that the floor is totally clear, walks straight down the hallway.',
      level2Beginner: 'A double purge cleans out both the buyers and the sellers. If you get stopped out on the first move, do not panic—wait for the second side to get swept and enter on the real move.',
      level3Trader: 'Diagnose the double purge sequence: Sweep 1 takes out external liquidity on side A. Price aggressively reverses and sweeps external liquidity on side B (Sweep 2). Confirm a solid displacement candle closing back within the range. Enter on the subsequent FVG, targeting the newly cleared path.',
      level4Advanced: 'The first sweep frequently traps early breakout traders. The second sweep traps early reversal traders. By the time the second sweep completes, both sides of retail volume are liquidated, leaving zero overhead resistance.',
      level5ICTFramework: 'Complete book clearing: IPDA expands through both external dealing range boundaries (ERL) to clear open interest before engaging the true dealing range trend.',
      whenItMatters: 'Frequently observed on FOMC days, NFP mornings, European rate decisions, and during the 09:30-10:00 AM NY Equities Open.',
      whenToIgnore: 'On quiet, low-volatility Asian sessions or standard low-resistance trend days that respect structural swing points without whip-sawing.'
    },
    whyItExists: 'Institutional blocks need massive liquidity. If one side of the book does not offer enough contracts, the algorithm runs both sides to fill aggregate institutional quota.',
    problemItSolves: 'Prevents traders from getting emotionally devastated by getting stopped out twice, teaching them how to capitalize on the second sweep.',
    howItForms: [
      'Step 1: Identify an established consolidation range with clean highs (BSL) and clean lows (SSL).',
      'Step 2: Sweep 1 occurs: Price drops aggressively below the lows, taking out sell stops.',
      'Step 3: Immediate V-shaped reversal: Price launches upward and breaches the range highs, taking out buy stops (Sweep 2).',
      'Step 4: Rejection at Sweep 2: Price prints an aggressive displacement candle back downward, leaving a Fair Value Gap.',
      'Step 5: Enter on the retest of the FVG following Sweep 2, targeting the deep liquidity pool or daily low.'
    ],
    chartAnatomy: 'Range box with horizontal lines at top and bottom. First arrow sweeps down through the bottom line. Second arrow shoots up through the top line. Third thick arrow dumps straight down through the entire range.',
    identificationRules: [
      'Both sweeps must occur in close temporal proximity (typically within the same session or 60-90 minutes).',
      'The second sweep must encounter immediate displacement rejection—no acceptance beyond the extreme.',
      'A clean Fair Value Gap must be created following the second sweep to confirm entry.'
    ],
    validCharacteristics: [
      'Both sides of liquidity are visibly purged with decisive wick probes.',
      'Strong institutional displacement follows the second purge.'
    ],
    invalidCharacteristics: [
      'Price continues trending indefinitely after the first sweep without reversing to purge the second side.',
      'Candle bodies close and accept well beyond both extremes, indicating chaotic news disarray.'
    ],
    howICTUsesIt: 'ICT teaches this pattern to explain why retail "breakout" and "support/resistance" traders get stopped out twice on the same morning.',
    commonMistakes: [
      'Entering full size immediately on the first sweep before checking if the opposing liquidity pool has been tested.',
      'Failing to recognize that the second sweep is the genuine high-probability trigger.'
    ],
    advancedNuances: 'A Double Purge that ends with an SMT divergence on the second sweep provides one of the highest conviction reversal setups in the entire trading year.',
    prerequisites: ['buy_side_liquidity', 'sell_side_liquidity', 'liquidity_sweep'],
    relatedConcepts: ['Turtle Soup', 'Liquidity Void', 'Seek and Destroy Profile', 'SMT Divergence'],
    bullishScenario: 'Bearish-to-Bullish Double Purge: ES sweeps session high (Sweep 1), immediately drops 40 points to sweep session low (Sweep 2). A massive green displacement candle prints a CISD. Trader enters long on the FVG, riding a 60-point trend run to ATH.',
    bearishScenario: 'Bullish-to-Bearish Double Purge: NQ sweeps London low at 09:31 AM (Sweep 1). By 09:42 AM, it rallies 80 points to sweep London high (Sweep 2). At 09:50 AM macro, a giant red candle prints an MSS. Trader shorts the FVG, targeting 150 points lower.',
    counterexample: 'Assuming every single sweep is a double purge and refusing to take a standard trend continuation trade when only one side is swept cleanly.',
    invalidationCriteria: 'A candle body close continuing beyond the second sweep extreme.',
    diagramType: 'liquidity_sweep',
    simplifiedExplanation: 'The market sweeps the bottom to take out the buyers, then sweeps the top to take out the sellers. Once everyone is dead, the market finally makes its real move.'
  },

  // 8. ICT HANGMAN PD ARRAY (Wick Rejection Confirmation Setup)
  {
    id: 'ict_hangman_pd_array',
    name: 'ICT Hangman PD Array (Wick Rejection Setup)',
    category: 'order_blocks',
    shortDefinition: 'An institutional wick-rejection signature where algorithmic price delivery probes liquidity above/below a key level and immediately closes within the range, creating a high-conviction execution reference.',
    source: {
      mentorship: '2023–2025 PD Array Hierarchy Series',
      seriesOrMonth: 'Wick Anatomy & Consequent Encroachment',
      approximateDate: '2024',
      originalTerminology: 'Hangman Rejection & Wick CE Defense',
      conceptStatus: 'Active Core',
      lectureReference: 'The Inner Circle Traders PD Array Masterclass'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that candle bodies represent institutional consensus and volume, while wicks represent liquidity probes and price rejection. The Hangman PD Array forms when a candle wick extends into a liquidity pool or HTF array, but the body refuses to accept the price, closing firmly in the opposite half.',
      observableMarketBehavior: 'A 5-minute or 15-minute candle spikes 20 points above an old high, triggering buy stop orders. Within the same candle period, aggressive selling pushes price back down so the candle closes with an upper wick comprising more than 65% of the total candle range.',
      derivedInterpretation: 'Auction book limit absorption: Resting passive limit orders absorb aggressive market breakout orders, causing a sudden lack of liquidity and forcing price to retrace immediately before the candle period closes.'
    },
    explanationLadder: {
      level1Child: 'Imagine sticking your hand into a freezing cold pool of water and yanking it right back out. The candle wick is the hand pulling back out of the cold water.',
      level2Beginner: 'A long wick with a tiny body at the bottom means buyers tried to push up, but sellers completely took over before the candle finished.',
      level3Trader: 'Look for a candle whose wick pierces a key HTF level (e.g. Daily High, NWOG, or 4H FVG). The wick must be at least 2x the size of the candle body. Enter on the subsequent candle upon the formation of an LTF FVG, using the wick extreme as your hard invalidation.',
      level4Advanced: 'The 50% midpoint of the Hangman wick functions as Consequent Encroachment (CE). If price retraces into the wick, it must respect the 50% level without candle bodies closing through it.',
      level5ICTFramework: 'Institutional absorption print: The algorithmic buy-program has terminated at the high of the wick. The resulting close marks the immediate inception of the sell-program (CISD).',
      whenItMatters: 'At the conclusion of an extended dealing range expansion, especially during London Open or New York AM session extremes.',
      whenToIgnore: 'In the middle of a consolidating range where wicks appear randomly on both sides without interacting with a significant PD array.'
    },
    whyItExists: 'Institutional market makers do not allow candle bodies to close in areas where they intend to accumulate large reversal positions.',
    problemItSolves: 'Provides a visual, objective signature that confirms a liquidity sweep is finished and a reversal is genuinely underway.',
    howItForms: [
      'Step 1: Price approaches a major Higher Timeframe PD Array or Old High/Low.',
      'Step 2: An aggressive thrust moves beyond the level, creating fear of missing out (FOMO) among retail breakout traders.',
      'Step 3: Institutional market orders absorb the liquidity and drive price backward.',
      'Step 4: The candle closes with a long wick (≥65% of candle range) and a small body seated at the opposite end.',
      'Step 5: The next candle confirms the rejection by breaking structure, providing the entry trigger.'
    ],
    chartAnatomy: 'Candle with a long top wick poking through a red horizontal line (Old Daily High). The candle body is small and closed below the line. A dotted line marks the 50% Consequent Encroachment of the wick.',
    identificationRules: [
      'Wick must comprise at least 60-70% of the entire high-to-low candle range.',
      'Candle body must close on the side opposite the wick.',
      'The wick must interact directly with an established institutional liquidity pool or PD array.'
    ],
    validCharacteristics: [
      'Immediate rejection with no subsequent candle closing beyond the wick high/low.',
      'Supported by SMT divergence on correlated instruments.'
    ],
    invalidCharacteristics: [
      'Subsequent candles close beyond the wick, turning the setup into a trend continuation run.',
      'Wick formed during low-liquidity bank holiday sessions.'
    ],
    howICTUsesIt: 'Used as an immediate visual green light that an institutional liquidity sweep has completed and execution can commence.',
    commonMistakes: [
      'Entering before the candle closes—many wicks turn into solid expansion candles before the timer runs out.',
      'Ignoring the 50% Consequent Encroachment of the wick on retests.'
    ],
    advancedNuances: 'Inside the wick of a 15-minute Hangman candle sits a complete 1-minute Market Structure Shift (MSS) and Fair Value Gap.',
    prerequisites: ['liquidity_sweep', 'order_block', 'consequent_encroachment'],
    relatedConcepts: ['Turtle Soup', 'Wick Consequent Encroachment', 'Absorption', 'CISD'],
    bullishScenario: 'Bullish Hammer/Hangman: Gold drops to $2,630 sweeping previous day low. The 15m candle spikes to $2,624 but closes at $2,629 with a $5 bottom wick. Trader enters long on the open of the next candle, stop at $2,623, targets $2,650.',
    bearishScenario: 'Bearish Hangman: NQ surges to 20,550 at 10:00 AM macro. The 5m candle spikes to 20,568 but closes down at 20,548 with an 18-point upper wick. Trader shorts the next 1m FVG, stop at 20,570, targets 20,480.',
    counterexample: 'Shorting a candle while it is still forming, only to watch it expand another 30 points and close with a massive solid green body.',
    invalidationCriteria: 'Any subsequent candle body closing beyond the tip of the Hangman wick.',
    diagramType: 'order_block',
    simplifiedExplanation: 'The wick is the institutional footprints walking into the room and immediately walking back out. When you see the long wick reject a key high, smart money has left the building—trade with them.'
  },

  // 9. ICT ENIGMA FVG (2025 Two-Candle Specialized Imbalance Variant)
  {
    id: 'ict_enigma_fvg',
    name: 'ICT Enigma FVG (Two-Candle Imbalance Variant)',
    category: 'imbalances',
    shortDefinition: 'A specialized two-candle Fair Value Gap variant formed by an ultra-aggressive momentum candle that leaves an immediate unmitigated price void, requiring rapid single-candle rebalance before explosive delivery.',
    source: {
      mentorship: '2024–2025 Advanced Execution Series',
      seriesOrMonth: 'High-Frequency Imbalance Anomalies',
      approximateDate: '2025',
      originalTerminology: 'Enigma FVG & Rapid Orderbook Skips',
      conceptStatus: 'Advanced Execution',
      lectureReference: 'The Inner Circle Traders 2025 Technical Briefing'
    },
    tripartiteView: {
      ictTeaching: 'In classical ICT, an FVG is defined by Candle 1 wick and Candle 3 wick. The Enigma variant recognizes that under modern algorithmic speed, certain imbalances are created between two adjacent momentum bars where price skips liquidity levels entirely, creating an immediate magnetic rebalance zone.',
      observableMarketBehavior: 'Price prints an immense displacement bar. The very next bar immediately wicks into the midpoint of the prior bar open, absorbs liquidity, and violently continues the trend, leaving no 3-candle gap for standard traders to see.',
      derivedInterpretation: 'A fast-orderbook gap where aggressive market orders exhaust bids/asks in a single timeframe interval, creating an instantaneous liquidity vacuum that is resolved on the immediate subsequent print.'
    },
    explanationLadder: {
      level1Child: 'Think of skipping a stair when running up the steps. You pause for half a second to steady your foot on the skipped stair and then sprint up the rest of the staircase.',
      level2Beginner: 'Standard traders wait for a 3-candle pattern and miss the fastest moves. The Enigma FVG lets you catch the immediate re-test on the very next candle.',
      level3Trader: 'Identify an explosive displacement bar that breaks a significant swing level. Notice if the spread between the opening of the bar and the preceding close leaves an unhedged volume void. Enter on the immediate pullback to the opening price with tight invalidation.',
      level4Advanced: 'The Enigma FVG is closely related to Volume Imbalances (VI) but occurs during active breakout momentum rather than between session closes.',
      level5ICTFramework: 'High-frequency IPDA liquidity skip: The algorithm accelerates past resting liquidity to reach an urgent benchmark before opposing order matching can stabilize.',
      whenItMatters: 'During high-impact news releases (CPI, PPI) or at the exact 09:30:00 AM cash open on equities.',
      whenToIgnore: 'In low-volatility Asian sessions or midday lunch periods where standard 3-candle structures are required.'
    },
    whyItExists: 'Algorithmic execution speed has increased. Modern algorithms often rebalance high-velocity imbalances in the very next candle rather than waiting multiple bars.',
    problemItSolves: 'Enables traders to participate in runaway momentum trends without waiting for a traditional 3-candle FVG that never forms.',
    howItForms: [
      'Step 1: Market experiences an aggressive news injection or open bell impulse.',
      'Step 2: Candle 1 prints an enormous body with virtually no wicks.',
      'Step 3: Candle 2 opens, dips rapidly into the upper third of Candle 1 body, and rejects immediately.',
      'Step 4: The dip in Candle 2 creates the Enigma rebalance entry.',
      'Step 5: Ride the continuation into the primary Draw on Liquidity.'
    ],
    chartAnatomy: 'Two large green candles side by side. A tiny lower wick on Candle 2 dips into the top of Candle 1. A bracket labels this single-candle touch as the "Enigma FVG Entry".',
    identificationRules: [
      'Candle 1 must exhibit exceptional displacement volume.',
      'The retest must occur on Candle 2—if Candle 2 closes without dipping, the Enigma setup is invalid.',
      'Higher Timeframe Draw on Liquidity must be uncontested and distant.'
    ],
    validCharacteristics: [
      'Instantaneous rejection within the first 30-60 seconds of Candle 2 open.',
      'Clear trend acceleration without subsequent counter-trend wicks.'
    ],
    invalidCharacteristics: [
      'Candle 2 closes as a counter-trend reversal bar.',
      'Attempting to trade the setup into an opposing HTF order block.'
    ],
    howICTUsesIt: 'ICT highlights the Enigma FVG as an elite tape-reading technique for active intraday scalpers on 1-minute and 30-second charts.',
    commonMistakes: [
      'Hesitating and waiting for a 3rd candle to confirm, by which time price has already exploded 30 points.',
      'Trading it in low-volatility regimes where standard 3-candle rules apply.'
    ],
    advancedNuances: 'Enigma FVGs that form at the 09:50 AM macro frequently produce the entire range of the morning session in less than 15 minutes.',
    prerequisites: ['displacement_engine', 'fair_value_gap', 'volume_imbalance'],
    relatedConcepts: ['Volume Imbalance', 'First Presented FVG', 'Runaway Imbalance'],
    bullishScenario: 'NQ prints a 45-point green bar at 09:31 AM. Candle 2 opens at 20,440, dips to 20,432 (Enigma touch), and launches to 20,490. Trader catches the 20,435 fill for a rapid +55 point scalp.',
    bearishScenario: 'ES dumps 15 points on CPI release. Candle 2 opens at 5,830, wicks to 5,833, and collapses to 5,805. Trader shorts 5,832, stop at 5,836, banking +25 points.',
    counterexample: 'Trying to trade an Enigma FVG at 12:30 PM lunch when volume has dried up and candles are printing chop.',
    invalidationCriteria: 'Candle 2 closing beyond the midpoint of Candle 1 body.',
    diagramType: 'fvg_formation',
    simplifiedExplanation: 'When price moves at supersonic speed, it does not wait 3 candles to leave an entry. The Enigma FVG is the quick tap on the very next candle that lets you jump onto the express train.'
  },

  // 10. CISD VS MSS (Change in State of Delivery vs Market Structure Shift)
  {
    id: 'cisd_vs_mss_breakdown',
    name: 'CISD vs. MSS: Mechanical Differences',
    category: 'structure',
    shortDefinition: 'The critical algorithmic distinction between Change in State of Delivery (CISD)—the earliest signal when candle bodies close through the opposing sequence—and Market Structure Shift (MSS), the swing point confirmation.',
    source: {
      mentorship: '2022–2025 Mentorship Core Concepts',
      seriesOrMonth: 'Order Flow Transitions & Swing Shifts',
      approximateDate: '2023',
      originalTerminology: 'CISD vs MSS Mechanics',
      conceptStatus: 'Foundational',
      lectureReference: 'The Inner Circle Traders Structural Foundations'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that an Order Block is literally a Change in State of Delivery (CISD). When the algorithm transitions from a buy program to a sell program, it demonstrates this by closing candle bodies through the opening prices of the preceding sequence. MSS occurs later, when an actual swing low or swing high is broken.',
      observableMarketBehavior: 'At a market top, the first red candle closes below the bodies of the last 3 green candles (CISD). Price is already changing direction. Only 4 candles later does price finally break below the lower swing low (MSS).',
      derivedInterpretation: 'CISD is a local momentum order flow transition (early warning); MSS is a multi-swing structural regime confirmation (late validation). Trading CISD yields superior risk-to-reward; trading MSS yields higher structural certainty.'
    },
    explanationLadder: {
      level1Child: 'CISD is the car turning on its blinker to signal a turn. MSS is the car actually making the turn through the intersection.',
      level2Beginner: 'CISD happens first: candle bodies close through the opposite candles. MSS happens second: price breaks past an old peak or valley on the chart.',
      level3Trader: 'To get the earliest, tightest entries, mark the opening price of the delivery candle sequence that swept liquidity. When a candle body closes past that opening price, CISD is confirmed. You can enter right there rather than waiting for price to fall 50 points to break the MSS swing low.',
      level4Advanced: 'Every valid MSS contains an earlier CISD at its turning point. However, not every CISD develops into a full HTF MSS—some CISDs are merely internal retracements within a dominant trend.',
      level5ICTFramework: 'IPDA state machine transition: The interbank delivery algorithm switches parameter state from Premium Distribution to Discount Accumulation. The CISD candle close is the definitive timestamp of this parameter flip.',
      whenItMatters: 'At every major liquidity sweep (Turtle Soup) when deciding whether to enter aggressively at the top/bottom or wait for structural confirmation.',
      whenToIgnore: 'In the middle of tight consolidation where candle bodies alternate green and red without any preceding directional run.'
    },
    whyItExists: 'By the time price breaks a major structural swing low (MSS), half of the move has already taken place. CISD provides a mechanical, rules-based entry at the very origin of the shift.',
    problemItSolves: 'Solves the late entry problem where traders get stopped out with wide stops trying to chase an MSS that has already traveled far from the liquidity sweep.',
    howItForms: [
      'Step 1: Price produces a directional delivery run (e.g. 3 or 4 consecutive bullish candles) into a liquidity pool.',
      'Step 2: Note the opening price of the lowest candle in the final upward leg (The Delivery Anchor).',
      'Step 3: A strong reversal candle forms and its body closes decisively below that opening price level.',
      'Step 4: This candle close confirms CISD (Change in State of Delivery).',
      'Step 5: Enter on the retest of the CISD level with a stop above the high, long before the lower structural swing low (MSS) is broken.'
    ],
    chartAnatomy: 'Bullish run of 4 green candles. A horizontal dashed line extends from the open of candle 1. A red candle drops and closes below the line, labeled "CISD Confirmed (Early Entry)". 3 candles later, price breaks a swing low labeled "MSS (Late Entry)".',
    identificationRules: [
      'Must follow a clear directional run that tapped a key liquidity pool or PD array.',
      'Confirmation requires a full candle body close—wicks do not constitute a valid CISD.',
      'CISD candle body should be relatively large compared to the preceding sequence.'
    ],
    validCharacteristics: [
      'Instant shift from small-range green candles to large-range red displacement candle.',
      'Supported by SMT divergence at the liquidity extreme.'
    ],
    invalidCharacteristics: [
      'Candle only wicks below the anchor open and closes back above.',
      'Formation occurs inside choppy equilibrium without a prior sweep.'
    ],
    howICTUsesIt: 'ICT uses CISD as the precise definition of an Order Block and the primary trigger for sniper entries at session highs and lows.',
    commonMistakes: [
      'Confusing a wick rejection with a genuine CISD candle body close.',
      'Waiting for a distant MSS swing break and taking a horrible risk-to-reward entry.'
    ],
    advancedNuances: 'When CISD and the First Presented FVG print on the exact same candle, it creates the highest-conviction entry signal in intraday price action.',
    prerequisites: ['market_structure_shift', 'order_block', 'displacement_engine'],
    relatedConcepts: ['Market Structure Shift (MSS)', 'Order Block', 'Displacement', 'Turtle Soup'],
    bullishScenario: 'Bullish CISD: ES sweeps 5,820. 3 red candles delivered price down. A green candle immediately closes above the open of the top red candle (CISD). Trader enters long at 5,823, stop at 5,819 (4-pt risk). The distant MSS low was at 5,835 (would have required 16-pt risk!).',
    bearishScenario: 'Bearish CISD: NQ sweeps London High at 20,500. Green candle open was at 20,485. Next 5m red candle closes at 20,480 (CISD). Trader shorts at 20,483, stop at 20,505. Trader catches the 100-point collapse before MSS ever triggered.',
    counterexample: 'Calling a wick that briefly probed an open price a CISD, when the candle body actually closed green and trend continued higher.',
    invalidationCriteria: 'A candle body close back above the manipulation high that initiated the CISD.',
    diagramType: 'mss_sequence',
    simplifiedExplanation: 'CISD is the earliest signal that the algorithm has flipped its switch. MSS is the later confirmation that everyone else sees. If you trade the CISD, you get the best price and the smallest stop loss.'
  }
];
