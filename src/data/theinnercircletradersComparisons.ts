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
  "id": "standard_ifvg_vs_reaper_ifvg",
  "title": "Standard IFVG & Reaper: Definition and Source Context",
  "conceptA": {
    "name": "Standard Inversion FVG (IFVG)",
    "summary": "An IFVG study asks whether a previously defined FVG changes its role after a specified price break. Define the break and retest rules; a later failure is still possible.",
    "keyPoints": [
      "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
    ],
    "idealCondition": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
  },
  "conceptB": {
    "name": "Reaper FVG",
    "summary": "In the 9 June 2026 review, ICT explicitly describes a Reaper variant with two nested gaps in a breaker context. In the bearish example, a previously bullish gap is validated as an inversion after a close below it, while a bearish FVG supplies a first-utilization reference. The lesson examines their overlap, wick excursions and body placement together; it does not define every failed inversion as a Reaper.",
    "keyPoints": [
      "Study a failed IFVG as a failed IFVG unless the precise named variation is supported by an original explanation. Save the initial gap boundaries, the break criterion, the retest and the later failure separately. Neither the price sequence nor its label identifies every participant or proves that all retail stops were harvested."
    ],
    "idealCondition": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
  },
  "keyDifference": "A standard IFVG study concerns a role change in a selected gap. The reviewed Reaper variant combines nested gap references with a breaker context; it is not every failed inversion.",
  "commonConfusion": "A failed IFVG is not an automatic instruction to reverse a live position.",
  "decisionRule": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
},

  // 3. Suspension Block vs Propulsion Block vs Order Block
  {
  "id": "suspension_vs_propulsion_vs_ob",
  "title": "ICT Suspension Block vs. Propulsion Block vs. Standard Order Block",
  "conceptA": {
    "name": "Suspension Block",
    "summary": "In the reviewed April 2026 explanation, ICT examines separations between adjacent candle bodies while their wicks touch or overlap. These are volume imbalances in his terminology. Mark the actual close/open prices around the selected candle; an isolated counter-trend pause alone is not the definition illustrated here.",
    "keyPoints": [
      "The source compares the nearby/front-month futures contract with a continuous chart. Their candle shapes and absolute prices differ. ICT prefers a candidate agreeing with a selected breaker reference in this example and discusses comparing other candidate levels. Record the symbol, delivery month, adjustment setting and timeframe. Do not transplant a continuous-chart price directly into a different contract.",
      "Body-price separation is observable. Concluding that an institution refuelled a trend, that no deep retracement can occur, or that the first touch is safe requires additional evidence. The reviewed passage does not establish a universal first-touch entry, one-percent risk rule or midpoint stop. Keep the chosen invalidation and the contract’s tick value explicit."
    ],
    "idealCondition": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
  },
  "conceptB": {
    "name": "Propulsion Block",
    "summary": "A propulsion study compares a reaction with a previously selected order-block reference. State the candle and overlap criteria; the chart does not prove institutional defence.",
    "keyPoints": [
      "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
    ],
    "idealCondition": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
  },
  "keyDifference": "The reviewed Suspension Block example identifies body-price gaps and contract-specific context. A propulsion study refers to interaction with a selected prior order block.",
  "commonConfusion": "A candle suspended in open space alone does not establish a Suspension Block or a safe first-touch entry.",
  "decisionRule": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
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
      idealCondition: 'Drawing lines at Asian High and Low at 01:55 ET, watching 02:30 ET sweep the Low, and targeting the High.'
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
      idealCondition: 'Daily open at 00:00 ET, morning Judas manipulation lower to form Low of Day, afternoon expansion to High of Day.'
    },
    keyDifference: 'PO3 is the universal algorithmic philosophy (AMD cycle); CRT is the specific session-by-session tactical execution framework that puts exact price levels on the PO3 manipulation and distribution phases.',
    commonConfusion: 'Trying to trade PO3 without reference boundaries. CRT provides the exact lines where PO3 manipulation begins and ends.',
    decisionRule: 'Understand PO3 to know what the algorithm is doing in principle; use CRT to mark the exact Reference Candle lines on your chart for daily execution.',
    diagramSnippet: 'PO3 Principle: [Accumulate ──> Manipulate ──> Distribute] ===> CRT Tactical Lines: [Asian Low Sweep ──> Ride to Asian High]'
  },

  // 5. Balanced Price Range (BPR) vs. RDRB (Redelivered BPR)
  {
  "id": "bpr_vs_rdrb",
  "title": "Balanced Price Range (BPR) vs. ICT RDRB (Redelivered BPR)",
  "conceptA": {
    "name": "Balanced Price Range (BPR)",
    "summary": "For this exercise, a BPR is the overlap of explicitly selected opposing FVG intervals. Save the interval boundaries before counting revisits.",
    "keyPoints": [
      "An overlap of selected opposing FVG price intervals is chart geometry. It does not prove that every order was matched, that the order book is empty or that an institution will defend the midpoint. Number the revisits with a stated rule: consecutive candles inside one visit are not automatically separate touches."
    ],
    "idealCondition": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
  },
  "conceptB": {
    "name": "RDRB",
    "summary": "These notes use RDRB descriptively for a later revisit to a selected balanced-price reference. A precise originating explanation for the previous named second-touch model has not been verified. Keep this limitation visible instead of attributing a universal second-touch rule to ICT.",
    "keyPoints": [
      "Compare first and later visits using the same entry, expiry, invalidation and costs. Preserve zones that failed on their first test instead of excluding them after the fact. A second reaction does not by itself establish lower drawdown, a higher win rate or permission to increase risk."
    ],
    "idealCondition": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
  },
  "keyDifference": "A formation and a later revisit are different observations. The named second-touch rules and improved expectancy have not been authenticated here.",
  "commonConfusion": "A second reaction does not justify increasing risk or deleting failed first tests from a study.",
  "decisionRule": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
},

  // 6. Silver Bullet 60-Minute Precision Window vs 3 AM London Open
  {
  "id": "silver_bullet_vs_3am_london",
  "title": "Silver Bullet 60-Minute Window vs. 3 AM London Open Execution",
  "conceptA": {
    "name": "ICT Silver Bullet Strategy",
    "summary": "The reviewed Silver Bullet lesson uses 03:00–04:00, 10:00–11:00 and 14:00–15:00 New York local entry windows. An entry hour is not a compulsory exit deadline.",
    "keyPoints": [
      "Illustrated index-point and Forex-pip ranges describe a source framework, not guaranteed captured profit or a fixed daily return. Keep each instrument’s units distinct."
    ],
    "idealCondition": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
  },
  "conceptB": {
    "name": "London-session study",
    "summary": "A London-session study uses a broader session context. Record the source’s timezone, date and selected range; the session label does not guarantee the daily high, daily low or a fixed pip gain.",
    "keyPoints": [
      "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
    ],
    "idealCondition": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
  },
  "keyDifference": "The London Silver Bullet entry hour overlaps part of a broader London-session study. Their entry conditions and exit rules should be stated separately.",
  "commonConfusion": "Do not treat 05:00 New York time as London’s exchange close or assume every time window supplies a trade.",
  "decisionRule": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
}
];
