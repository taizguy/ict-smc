import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q-ord-1',
    conceptId: 'market_mechanics_liquidity',
    type: 'reasoning',
    question: 'Why does Bitcoin price rise when a large institutional buy order is submitted?',
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
    explanation: 'Both short stop-losses and breakout entries above a resistance high convert into BUY market orders when triggered, creating a dense pool of Buy Side Liquidity.',
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
    question: 'Why does a Fair Value Gap created after a Liquidity Sweep and Market Structure Shift have higher probability than one in the middle of a range?',
    options: [
      'Because the algorithm only recognizes FVGs with green candles.',
      'Because the sweep provided the liquidity event, displacement confirmed institutional aggression, and structure confirmed directional intent.',
      'Because FVGs in ranges are illegal on exchanges.',
      'Because range FVGs always fill to exactly 100% within 3 minutes.'
    ],
    correctIndex: 1,
    explanation: 'An FVG is not a standalone magic pattern. It is the footprint of displacement. When accompanied by a liquidity sweep and MSS, it is part of a complete institutional narrative.',
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
    explanation: 'BOS extends an ongoing established trend. MSS marks the verified transfer of control to the opposite side, backed by displacement after liquidity collection.',
    difficulty: 'intermediate'
  },
  {
    id: 'q-ob-1',
    conceptId: 'order_block',
    type: 'invalidation',
    question: 'Where is the true structural invalidation point (stop loss) for a Bullish Order Block setup formed after a Sell Side Liquidity sweep?',
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
    question: "Under the 2026 ICT 'Trinity Rule', an institutional trade execution is only permitted when which three components align unanimously?",
    options: [
      'RSI, MACD, and Bollinger Bands',
      'Time (Macro Windows), Price (PD Arrays / Liquidity), and Narrative (Draw on Liquidity)',
      'Moving Average 50, Moving Average 200, and Volume Profile',
      'Broker Spread, Account Balance, and Leverage'
    ],
    correctIndex: 1,
    explanation: 'The 2026 Trinity Rule dictates that Time (specific algorithmic macro windows), Price (unmitigated institutional PD Arrays), and Narrative (HTF Draw on Liquidity) must achieve unanimous alignment before executing.',
    difficulty: 'intermediate'
  },
  {
    id: 'q-2026-ath-fib-1',
    conceptId: 'market_alchemy_ath',
    type: 'execution',
    question: 'When an asset trades into uncharted All-Time Highs (ATH) with no historical resistance, how does ICT derive institutional profit targets?',
    options: [
      'Drawing random trendlines across highs',
      'Anchoring Fibonacci expansion ratios (1.272, 1.618, 2.0) across the preceding consolidation dealing range',
      'Shorting aggressively because the price is too high',
      'Waiting for the price to drop back to zero'
    ],
    correctIndex: 1,
    explanation: 'In blue-sky ATH conditions, IPDA quotes price algorithmically based on Fibonacci expansion multiples (1.272, 1.618, 2.0, 2.618) anchored from the high to low of the dealing range that preceded the breakout.',
    difficulty: 'advanced'
  },
  {
    id: 'q-2026-ndog-1',
    conceptId: 'opening_gap_matrix_ndog_nwog',
    type: 'recognition',
    question: 'What creates the New Day Opening Gap (NDOG) in index futures, and which level within it is the highest-priority algorithmic pivot?',
    options: [
      'The distance between the 17:00 EST daily close and 18:00 EST re-open; its 50% Consequent Encroachment (CE) serves as the primary pivot.',
      'The difference between Apple and Microsoft opening prices; the average is the pivot.',
      'Any gap between two intraday 1-minute candles.',
      'The gap between midnight and 08:30 AM.'
    ],
    correctIndex: 0,
    explanation: 'The NDOG is the CME settlement gap between 17:00 EST close and 18:00 EST open. Even if traded through overnight, the 50% Consequent Encroachment remains an active algorithmic magnetic benchmark.',
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
    explanation: 'CSoD is the earliest order flow regime shift: a down-close candle body closing below the opening price of the prior expansion candle, flipping algorithmic delivery from BISI to SIBI before an MSS forms.',
    difficulty: 'advanced'
  },
  {
    id: 'q-2026-nfp-thursday-1',
    conceptId: 'nfp_thursday_hrlr_and_event_volatility',
    type: 'execution',
    question: 'Why does ICT recommend stepping aside or cutting risk to 25% on NFP Thursdays and FOMC release mornings?',
    options: [
      'Because brokers turn off the charts.',
      'Because the algorithm engages High Resistance Liquidity Runs (HRLR) and Seek & Destroy conditions ahead of binary event shocks.',
      'Because markets close at 10:00 AM on Thursdays.',
      'Because Fibonacci tools do not work on Thursdays.'
    ],
    correctIndex: 1,
    explanation: 'Prior to major macroeconomic releases, IPDA holds price in tight, choppy clearing corridors with overlapping swings (HRLR) to avoid directional inventory imbalances, resulting in whipsaws for retail traders.',
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
    title: 'Final Comprehensive Certification Exam',
    description: 'Complete cross-curriculum evaluation covering foundations through 2026 advanced execution protocols.',
    level: 'Grandmaster',
    questions: quizQuestions
  }
];

