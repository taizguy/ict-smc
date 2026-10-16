import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q-ord-1',
    conceptId: 'market_mechanics_liquidity',
    type: 'reasoning',
    question: 'In a continuous limit-order book, which mechanism can move executed prices upward when aggressive buying consumes available asks?',
    options: [
      'Because the number of registered buyers exceeds the number of registered sellers.',
      'Because aggressive market buy orders exhaust the available resting limit sell orders (asks) across consecutive price queues.',
      'Because the exchange algorithm recalculates the fair asset value based on moving averages.',
      'Because market makers are required by law to mark prices higher.'
    ],
    correctIndex: 1,
    explanation: 'In every executed trade, buyers and sellers are equal in volume. Price rises because aggressive market orders consume all available limit sell orders at lower prices, forcing the next trade to execute at higher asks.',
    difficulty: 'beginner'
  },
  {
    id: 'q-liq-1',
    conceptId: 'buy_side_liquidity',
    type: 'definition',
    question: 'Why is liquidity resting above an old swing high called "Buy Side Liquidity" (BSL)?',
    options: [
      'Because it consists of limit buy orders from dip buyers.',
      'Because short sellers place buy stop-loss orders above the high, and breakout traders place buy stop-entry orders there.',
      'Because buyers have already bought that level.',
      'Because price is guaranteed to buy that area.'
    ],
    correctIndex: 1,
    explanation: 'In this framework, stops above a high are a hypothesis about potential buying interest. Stop-market orders become market orders on triggering; stop-limit orders become limit orders and may not fill. Actual order concentration cannot be established from candles alone.',
    difficulty: 'beginner'
  },
  {
    id: 'q-fvg-1',
    conceptId: 'fair_value_gap',
    type: 'recognition',
    question: 'In a Bullish Fair Value Gap, which two candle boundaries define the imbalance zone?',
    options: [
      'Candle 1 Low and Candle 2 High',
      'Candle 1 High and Candle 3 Low',
      'Candle 2 Open and Candle 3 Close',
      'Candle 1 Close and Candle 3 Open'
    ],
    correctIndex: 1,
    explanation: 'A Bullish FVG exists in the gap where Candle 1 High is lower than Candle 3 Low. The space between them is the un-overlapped imbalance created by Candle 2 displacement.',
    difficulty: 'beginner'
  },
  {
    id: 'q-fvg-2',
    conceptId: 'fair_value_gap',
    type: 'reasoning',
    question: 'Why does this curriculum study an FVG together with a sweep and structural shift rather than as an isolated pattern?',
    options: [
      'Because the algorithm only recognizes FVGs with green candles.',
      'Because these observations provide a stated location and directional thesis that can be tested and invalidated.',
      'Because FVGs in ranges are illegal on exchanges.',
      'Because range FVGs always fill to exactly 100% within 3 minutes.'
    ],
    correctIndex: 1,
    explanation: 'These are complementary observations in the study framework. Their combination does not identify institutions or establish a higher success probability without a defined dataset and test.',
    difficulty: 'intermediate'
  },
  {
    id: 'q-mss-1',
    conceptId: 'market_structure_bos_mss_choch',
    type: 'definition',
    question: 'What is the primary difference between a Break of Structure (BOS) and a Market Structure Shift (MSS)?',
    options: [
      'BOS is on 1-minute charts, while MSS is on Weekly charts.',
      'BOS confirms continuation of an existing trend; MSS confirms a directional transition supported by displacement after a liquidity event.',
      'BOS requires Fibonacci, while MSS requires Bollinger Bands.',
      'BOS occurs only on crypto, while MSS occurs on Forex.'
    ],
    correctIndex: 1,
    explanation: 'BOS extends an ongoing established trend. MSS is interpreted as a potential directional change supported by displacement. It does not verify institutional control or guarantee continuation.',
    difficulty: 'intermediate'
  },
  {
    id: 'q-ob-1',
    conceptId: 'order_block',
    type: 'invalidation',
    question: 'For a bullish trade thesis explicitly invalidated by a break of the initiating sweep low, where would the structural stop reference be?',
    options: [
      'Exactly 1 tick below the Order Block candle body.',
      'Below the extreme low of the liquidity sweep that initiated the move.',
      'At the 50% midpoint of the Order Block.',
      '10 points below current market price.'
    ],
    correctIndex: 1,
    explanation: 'The trade thesis is based on the liquidity sweep and subsequent displacement. If price breaks and accepts below the sweep low, the entire bullish thesis is invalidated.',
    difficulty: 'intermediate'
  },
  {
    id: 'q-breaker-1',
    conceptId: 'breaker_block',
    type: 'reasoning',
    question: 'What is the fundamental difference between a Breaker Block and a Mitigation Block?',
    options: [
      'A Breaker Block swept liquidity before failing; a Mitigation Block failed from a failure swing without sweeping liquidity.',
      'Breakers only occur on Bullish setups; Mitigation blocks only occur on Bearish setups.',
      'Breakers do not use candles, while Mitigation blocks use indicators.',
      'There is no difference; they are exact synonyms.'
    ],
    correctIndex: 0,
    explanation: 'A Breaker Block requires price to sweep liquidity (e.g. Higher High) before crashing through the Order Block. A Mitigation Block forms when price fails to sweep liquidity (Lower High failure swing) before breaking structure.',
    difficulty: 'advanced'
  },
  {
    id: 'q-po3-1',
    conceptId: 'power_of_three_amd',
    type: 'execution',
    question: 'In a classic Bullish Power of Three (AMD) daily profile, what is the expected relationship between the Daily Open and the manipulation phase?',
    options: [
      'Price immediately explodes upward above the Daily Open without looking back.',
      'Price trades below the Daily Open during early session (London/Asia) to sweep Sell Side Liquidity into Discount before expanding upward into New York.',
      'Price must stay within 5 ticks of the Daily Open all day.',
      'Price closes below the Daily Open.'
    ],
    correctIndex: 1,
    explanation: 'In Bullish PO3: Open -> Manipulation below Open into Discount / SSL -> Distribution expansion above Open -> Close near the High of the Day.',
    difficulty: 'intermediate'
  },
  {
    id: 'q-topdown-1',
    conceptId: 'ict_2022_model',
    type: 'execution',
    question: 'A trader opens BTC on the 1-minute chart, finds an FVG, and immediately buys. Why is this a beginner mistake according to Top-Down ICT analysis?',
    options: [
      'Because 1-minute charts do not have real candles.',
      'Because the trader skipped Higher Timeframe context, dealing range location (Premium vs Discount), and did not verify what liquidity was swept.',
      'Because you must always wait for 4 hours after an FVG forms.',
      'Because 1-minute FVGs never work.'
    ],
    correctIndex: 1,
    explanation: 'The 1M FVG is the final execution mechanism. Context comes first: Weekly Draw -> Daily Location -> 15M Liquidity Event -> 5M Displacement -> 1M FVG Entry.',
    difficulty: 'beginner'
  },
  {
    id: 'q-2026-trinity-1',
    conceptId: 'from_vision_to_execution',
    type: 'reasoning',
    question: "In this curriculum's time-price-narrative checklist, which three study components are compared?",
    options: [
      'RSI, MACD, and Bollinger Bands',
      'Time (Macro Windows), Price (PD Arrays / Liquidity), and Narrative (Draw on Liquidity)',
      'Moving Average 50, Moving Average 200, and Volume Profile',
      'Broker Spread, Account Balance, and Leverage'
    ],
    correctIndex: 1,
    explanation: 'This independent study checklist compares time, price references and a higher-timeframe narrative. It is not an exchange requirement, verified institutional procedure or validated success model.',
    difficulty: 'intermediate'
  },
  {
    id: 'q-2026-ath-fib-1',
    conceptId: 'market_alchemy_ath',
    type: 'execution',
    question: 'Which range-based projection method does this curriculum illustrate when price trades beyond historical highs?',
    options: [
      'Drawing random trendlines across highs',
      'Anchoring Fibonacci expansion ratios (1.272, 1.618, 2.0) across the preceding consolidation dealing range',
      'Shorting aggressively because the price is too high',
      'Waiting for the price to drop back to zero'
    ],
    correctIndex: 1,
    explanation: 'Fibonacci expansion multiples provide reference projections from selected anchors. They do not prove how exchanges quote prices or predict that a target will be reached.',
    difficulty: 'advanced'
  },
  {
    id: 'q-2026-ndog-1',
    conceptId: 'opening_gap_matrix_ndog_nwog',
    type: 'recognition',
    question: 'In this index-futures study convention, which session references define an NDOG and its midpoint?',
    options: [
      'The distance between the 17:00 ET daily close and 18:00 ET re-open; its 50% Consequent Encroachment (CE) serves as the primary pivot.',
      'The difference between Apple and Microsoft opening prices; the average is the pivot.',
      'Any gap between two intraday 1-minute candles.',
      'The gap between midnight and 08:30 AM.'
    ],
    correctIndex: 0,
    explanation: 'This convention compares the selected 17:00 ET session close with the 18:00 ET reopen and marks the arithmetic midpoint. Session close is not necessarily official settlement. Check the instrument calendar and holiday hours; midpoint reactions are not guaranteed.',
    difficulty: 'intermediate'
  },
  {
    id: 'q-2026-csod-1',
    conceptId: 'changing_state_of_delivery',
    type: 'execution',
    question: 'What is the technical definition of a Changing State of Delivery (CSoD) indicating an immediate shift to Sell-Side delivery?',
    options: [
      'When a candle body closes below the opening price of the lowest consecutive up-close candle in that immediate run.',
      'When the 14-period RSI crosses below 30.',
      'When price breaks a 4-hour swing low.',
      'When price wicks below an old high.'
    ],
    correctIndex: 0,
    explanation: 'Under the convention used here, a close below the relevant up-close run opening reference is treated as an early bearish hypothesis. State the exact reference candle; it is not a guaranteed regime change or direct order-flow measurement.',
    difficulty: 'advanced'
  },
  {
    id: 'q-2026-nfp-thursday-1',
    conceptId: 'nfp_thursday_hrlr_and_event_volatility',
    type: 'execution',
    question: 'Why should a study plan check the official employment and central-bank release calendar before a session?',
    options: [
      'Because brokers turn off the charts.',
      'Because scheduled releases can change volatility, spreads and execution conditions, requiring explicit risk limits.',
      'Because markets close at 10:00 AM on Thursdays.',
      'Because Fibonacci tools do not work on Thursdays.'
    ],
    correctIndex: 1,
    explanation: 'Release dates and times must be checked on official calendars; an employment report is not inherently a Thursday event. Price may consolidate or trend before releases. No universal 25% risk rule or deterministic algorithmic behavior is established here.',
    difficulty: 'intermediate'
  }
];

export interface QuizModule {
  id: string;
  title: string;
  description: string;
  level: string;
  questions: QuizQuestion[];
}

export const quizzes: QuizModule[] = [
  {
    id: 'quiz-foundations',
    title: 'Exam 1: Market Mechanics & Liquidity Pools',
    description: 'Test your understanding of order book queues, BSL, SSL, and why price moves.',
    level: 'Level 0 - 1',
    questions: quizQuestions.slice(0, 3)
  },
  {
    id: 'quiz-imbalances',
    title: 'Exam 2: Displacement, FVGs & Consequent Encroachment',
    description: 'Test your precision on Fair Value Gap boundary identification, CE 50%, and structural shifts.',
    level: 'Level 2',
    questions: quizQuestions.slice(2, 6)
  },
  {
    id: 'quiz-order-blocks',
    title: 'Exam 3: Order Blocks, Breakers & Mitigations',
    description: 'Master the difference between genuine OBs, Breakers, and Mitigation blocks.',
    level: 'Level 3 - 4',
    questions: quizQuestions.slice(5, 8)
  },
  {
    id: 'quiz-2026-mastery',
    title: 'Exam 4: 2026 Smart Money Concepts & Execution',
    description: 'Test your precision on the 2026 curriculum: Trinity Rule, ATH Alchemy, NDOG Matrices, CSoD, and Macro Continuum.',
    level: 'Level 5 (2026 Master)',
    questions: quizQuestions.slice(8)
  },
  {
    id: 'quiz-mastery',
    title: 'Comprehensive Practice Exam',
    description: 'Complete cross-curriculum evaluation covering foundations through 2026 advanced execution protocols.',
    level: 'Grandmaster',
    questions: quizQuestions
  }
];

