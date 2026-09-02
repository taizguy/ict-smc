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
    id: 'quiz-mastery',
    title: 'Final Certification Exam: Top-Down Execution Models',
    description: 'Comprehensive evaluation covering the entire ICT sequence from HTF bias to execution triggers.',
    level: 'Level 5 (Elite)',
    questions: quizQuestions
  }
];

