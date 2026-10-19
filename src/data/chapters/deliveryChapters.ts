import { TextbookChapter } from '../../types';

export const deliveryChapters: TextbookChapter[] = [
  // CHAPTER 13: Fair Value Gaps (FVG) & Consequent Encroachment
  {
    id: 13,
    slug: 'fair-value-gaps-fvg-and-consequent-encroachment',
    part: 'Part III - Price Delivery',
    title: 'Fair Value Gaps (FVG) & Consequent Encroachment — The Core Institutional Imbalance',
    quote: "An FVG is a three-candle range relationship used in ICT chart study. Its boundaries and midpoint are measurable; a future revisit, reaction or profitable entry is uncertain.",
    level: 2,
    summary: [
      'The exact 3-candle anatomical formation of Bullish (BISI) and Bearish (SIBI) FVGs.',
      "Calculating Consequent Encroachment (50% CE) and choosing a testable violation rule.",
      'Premium vs. Discount FVGs: Aligning execution with higher-timeframe dealing ranges.',
      'The life cycle of an FVG: Virgin, Mitigated, Fully Rebalanced, and Inverted.',
      "Paper-study design: compare entry variants, invalidation, costs and unfilled orders."
    ],
    keyTerms: [
      { term: 'Fair Value Gap (FVG)', definition: "A three-candle range pattern in which the outer candle ranges do not overlap across the middle candle. It does not imply an absence of trades inside that interval." },
      { term: 'BISI (Buyside Imbalance Sellside Inefficiency)', definition: "A bullish FVG: candle 1 high is below candle 3 low after the third candle completes. BISI is ICT terminology, not evidence that only buying occurred." },
      { term: 'SIBI (Sellside Imbalance Buyside Inefficiency)', definition: "A bearish FVG: candle 1 low is above candle 3 high after the third candle completes. SIBI is ICT terminology, not evidence that only selling occurred." },
      { term: 'Consequent Encroachment (CE)', definition: "The arithmetic midpoint of an FVG. Whether price reacts there is a separate empirical question." },
      { term: 'Virgin FVG', definition: 'A newly printed Fair Value Gap that has not experienced any subsequent price interaction or mitigation.' }
    ],
    practiceQuestions: [
      'What are the exact three candles that compose a Fair Value Gap, and where are the upper and lower boundaries measured?',
      "How is CE calculated, and why does its arithmetic not guarantee a reaction?",
      "How would you distinguish a midpoint violation from a close through the full FVG, using a rule chosen before replay?",
      "How does your chosen dealing range change whether the same FVG is labelled premium or discount?",
      'What is the structural difference between a Fair Value Gap, a Volume Imbalance, and a Liquidity Void?'
    ],
    sections: [
      {
        id: '13.1',
        title: '13.1 The Three-Candle Anatomical Structure of an FVG',
        content: "Use three completed candles on one stated timeframe. A bullish FVG exists when the high of candle 1 is below the low of candle 3. Its lower boundary is candle 1 high and its upper boundary is candle 3 low. A bearish FVG exists when candle 1 low is above candle 3 high; its boundaries are candle 3 high and candle 1 low.\n\nThe middle candle trades through the interval. Non-overlap between the outer candles does not mean that no transactions occurred there or that only one side traded. OHLC candles do not identify a particular institution or expose its inventory.\n\nMark the gap only when candle 3 has completed. Record the feed and timeframe: different aggregation or pricing can change the pattern. An FVG is a chart definition, not a standalone entry signal or a debt the market must repay.",
        keyTakeaway: "Bullish FVG: candle 1 high is below candle 3 low. Bearish FVG: candle 1 low is above candle 3 high. Wait for candle 3 to close."
      },
      {
        id: '13.2',
        title: "13.2 Measuring Consequent Encroachment (CE)",
        content: "Consequent Encroachment is the midpoint of the gap: CE = (upper boundary + lower boundary) / 2. If the boundaries are 100 and 104, CE is 102. This arithmetic does not establish market fair value or prove that an algorithm must defend 102.\n\nBefore replay, choose what counts as a test or failure: a wick through the midpoint, a close through it, or a close through the far boundary are different rules. State the timeframe and do not switch the rule after seeing the outcome. A midpoint violation alone does not automatically establish an IFVG.\n\nA deeper limit entry may improve the planned reward-to-risk ratio for the same stop and target, but it can remain unfilled. A tighter stop can increase the chance of a stop-out. Include spread, fees and slippage before comparing entry variants.",
        keyTakeaway: "CE is a midpoint, not a guaranteed reaction level. Define the failure rule before reviewing outcomes."
      },
      {
        id: '13.3',
        title: '13.3 The Life Cycle of an FVG and Execution Protocols',
        content: "Track whether a gap is untouched, partially revisited, fully traversed, or crossed and later tested from the other side. These are descriptive states. A first touch is not automatically the best trade, and a full traversal does not prove that an entire market is balanced.\n\nFor a paper study, select the dealing range before marking premium or discount. Write the required context, entry price, invalidation and target. A midpoint entry and an edge entry are separate variants; measure both instead of choosing whichever looks better afterward.\n\nDo not use a universal two-to-five-tick stop across instruments. Stop distance and position size must reflect the chosen invalidation, contract value, volatility, costs and risk budget. Stops do not guarantee a fill at the requested price. Record gaps that never retrace and setups that fail as well as attractive examples.",
        keyTakeaway: "Compare predefined entry variants on sequential examples, including failures, costs and unfilled orders."
      },
{
  "id": "13.4-source-reading",
  "title": "13.4 Reading the Original Example Without Hindsight",
  "content": "In Episode 6, the bearish FVG slide places the three-candle pattern in the context of a preceding run into buy-side liquidity. Keep two observations separate: whether a gap exists, and whether its location fits the example being taught. A correctly drawn box is not automatically a complete setup.\n\nFor an original LearnSMC exercise, pause replay before the third candle closes. Mark only the highs and lows already visible, then advance one candle at a time. Record when the pattern first becomes identifiable, whether a return occurs, and what happens under your predefined invalidation. Do not move the box or the chosen liquidity reference to fit the finished chart.",
  "keyTakeaway": "Separate pattern recognition, context and the later result; each becomes known at a different point in time."
},
{
  "id": "13.5-source-reading",
  "title": "13.5 When the Pattern Does Not Qualify",
  "content": "Episode 4 checks an initial move that does not produce the required FVG and continues waiting. Episode 24 likewise distinguishes an anticipated price area from actual displacement and a qualifying gap. A price touching your forecast area is not the same as the entry model appearing.\n\nIn your replay log, include no-setup days, qualifying gaps that never retrace, and entries that fail. Decide the observation window before replay. Lowering the timeframe after seeing the result can manufacture a pattern that was not part of the original plan."
}
    ]
  },

  // CHAPTER 14: Inverse Fair Value Gaps (IFVG): Role Reversal Imbalances
  {
    id: 14,
    slug: 'inverse-fair-value-gaps-ifvg-role-reversal-imbalances',
    part: 'Part III - Price Delivery',
    title: 'Inverse Fair Value Gaps (IFVG): Role Reversal Imbalances — Exploiting Failed Market Inefficiencies',
    quote: "An IFVG describes a proposed role reversal after price crosses a previously marked FVG. A later retest can hold or fail; support and resistance are never impenetrable.",
    level: 2,
    summary: [
      'The mechanical definition of an Inverse Fair Value Gap (IFVG).',
      'Why FVGs fail: Detecting institutional regime change when an imbalance is violated.',
      'The Polarity Flip: Turning broken BISI into resistance and broken SIBI into support.',
      'The "Reaper IFVG" trap: How market makers harvest retail SMC stops at inversion levels.',
      'Complete IFVG execution protocol: Entry timing, candle body invalidation, and profit targets.'
    ],
    keyTerms: [
      { term: 'Inverse Fair Value Gap (IFVG)', definition: 'A Fair Value Gap that was violated and closed through with displacement, which subsequently flips its role to act as the opposite support or resistance zone upon retest.' },
      { term: 'Polarity Flip', definition: 'The structural transition where a bullish imbalance (support) converts into bearish resistance, or a bearish imbalance converts into bullish support.' },
      { term: 'Violating Candle', definition: 'The authoritative displacement candle whose body closes completely beyond the distal boundary of an existing FVG, triggering the inversion.' },
      { term: 'Reaper IFVG', definition: 'An advanced trap pattern where price fakes an inversion retest to lure retail breakout traders before aggressively expanding in the authentic macro direction.' }
    ],
    practiceQuestions: [
      'What specific condition must be satisfied for a standard FVG to officially convert into an Inverse FVG?',
      'Why does an IFVG often provide a more reliable trade setup than a standard first-touch FVG?',
      'When a bullish BISI is violated by a red displacement candle, what role does that box play when price subsequently rallies back into it?',
      'Where should a trader place their stop loss when entering a trade off an IFVG retest?',
      'How does combining an IFVG with a higher-timeframe Market Structure Shift (MSS) create a high-probability institutional setup?'
    ],
    sections: [
      {
        id: '14.1',
        title: '14.1 The Mechanism of Inversion: Why Imbalances Flip',
        content: `In orthodox technical analysis, traders learn that "old support becomes new resistance."
In institutional Smart Money Concepts, this exact same market truth is codified with mathematical precision through Inverse Fair Value Gaps (IFVGs).

Consider what an FVG represents: it is a price corridor where institutional algorithms delivered one-sided liquidity. Under normal trending conditions, when price retraces to that gap, the algorithm steps in to defend it and continue the trend.

However, financial markets do not trend forever. When a market reaches a major macroeconomic Draw on Liquidity, the institutional algorithm switches from trend continuation to reversal distribution.

When this occurs, an existing FVG is approached. Instead of bouncing off the gap, an aggressive, high-velocity displacement candle plows straight through the box and closes its solid body completely beyond the outer boundary of the gap.

What just happened in the order book?
1. The buyers who were attempting to defend the bullish FVG were completely overwhelmed by institutional market sell orders.
2. The limit orders inside the gap were consumed, and the remaining order book was wiped clean.
3. The failed bullish gap is now mechanically converted into a Bearish Inverse Fair Value Gap (IFVG)!
The box does not disappear from your chart. Instead, you keep the exact same box coordinates, but you now treat it as a stone wall of institutional resistance!`,
        keyTakeaway: 'When price closes completely through an FVG with displacement, the gap flips polarity: a failed bullish gap becomes bearish resistance, and vice versa.'
      },
      {
        id: '14.2',
        title: '14.2 Step-by-Step IFVG Execution Protocol',
        content: `Trading Inverse Fair Value Gaps provides some of the highest-conviction entries in modern algorithmic trading because the inversion itself provides physical proof that the previous trend is broken.

The Mechanical Step-by-Step IFVG Execution Blueprint:

1. Step 1: Identify the Broken FVG
Mark a clear, well-defined 3-candle Fair Value Gap on your chart.
- Example: A Bearish SIBI formed on a 5-minute chart.

2. Step 2: Verify the Authoritative Close Through
Wait for price to rally through the SIBI. A candle must close its solid BODY completely above the upper boundary of the gap. If price only pokes a wick through and closes back inside, it is NOT an IFVG—it is a failed sweep!

3. Step 3: Wait for the Retracement (The Retest)
Once the candle closes above, do not chase! Price will almost always retrace back down into the inverted box to test its new role as support.

4. Step 4: Order Placement & Invalidation
- Entry: Place a Limit Buy Order at the upper boundary or 50% Consequent Encroachment of the inverted box.
- Stop Loss Placement: Place your stop loss strictly below the lower boundary of the inverted box (or below the swing low created during the retest).
- Strict Invalidation Rule: If a subsequent candle closes its body back below the lower boundary of the IFVG, the setup is invalidated immediately. Close the trade!

5. Step 5: Target the Draw on Liquidity
Target the next unpurged Buy-Side Liquidity pool (e.g., Previous Day High, Asian High, or higher-timeframe FVG).`,
        keyTakeaway: 'Wait for a full candle body close through the gap. Enter on the retest of the inverted boundary; invalidate if candle bodies close back inside the old range.'
      },
      {
        id: '14.3',
        title: '14.3 The "Reaper IFVG" Trap: Navigating False Inversions',
        content: `As retail Smart Money Concepts grew in popularity, algorithmic market makers began deploying specialized stop-hunting patterns around obvious IFVGs. The most deadly of these is the Reaper IFVG.

How the Reaper IFVG Works:
1. A bearish FVG is penetrated upward by a modest candle, leading retail traders to declare: "Bullish IFVG formed! I will buy the retest!"
2. Price pulls back into the box, produces a tiny, weak bounce, enticing retail buyers to pile in and place their tight stop losses directly underneath the box.
3. Suddenly, an algorithmic Macro Window arrives (such as 09:50 AM EST).
4. A massive, high-volume red candle appears out of nowhere, violently slicing downward through the box, triggering all the retail stop losses, and trapping the breakout buyers.
5. The tape reader does not panic. They recognize that the first "inversion" was an engineered retail trap. They immediately enter SHORT on the underside retest of the box, riding the explosive momentum generated by the liquidation of the trapped retail buyers!`,
        keyTakeaway: 'Beware of slow, sluggish inversions outside of killzones. A true IFVG displaces with authority and defends its boundaries vigorously.'
      }
    ]
  },

  // CHAPTER 15: Order Blocks (OB) & Mitigation
  {
    id: 15,
    slug: 'order-blocks-ob-and-mitigation',
    part: 'Part III - Price Delivery',
    title: "Order Blocks & Mitigation — Reference Candles and Mean Threshold",
    quote: "Mark the reference candle or candle run and its boundaries before the retest. An opening price or midpoint is a chart reference, not a view into an institution’s inventory.",
    level: 2,
    summary: ["Episode 3’s consecutive-candle example and opening reference.","Change in delivery as an interpretation within the ICT framework.","Context filters without claiming to observe bank inventory.","Mean Threshold arithmetic and the chosen body or range convention.","Retests, failed reactions, invalidation and execution costs."],
    keyTerms: [{"term":"Order Block (OB)","definition":"A reference candle or defined candle run used in an ICT study model. State which candles, boundaries and opening reference the example uses."},{"term":"Bullish Order Block (+OB)","definition":"In the Episode 3 example, a selected down-close run and its opening reference are studied around a bullish change in delivery. The run need not be reduced to one last candle."},{"term":"Bearish Order Block (-OB)","definition":"A selected up-close candle or run studied with a bearish change in delivery under the stated model. It does not establish who sold or the size of their position."},{"term":"Mean Threshold (MT)","definition":"The midpoint of the specifically selected block boundaries. State whether these use the candle body or full range; do not silently switch conventions."},{"term":"Mitigation","definition":"A framework label for a return to a selected reference zone. A retest alone does not prove that an institution closed a hedge at break-even."}],
    practiceQuestions: ["Which candles form the run in the original example, and which opening reference is used?","How would selecting only the final candle change the opening price and the zone?","What is observable on the chart, and what would require evidence of actual institutional positions?","Does your midpoint use body boundaries or full candle ranges, and how is failure defined?","How do an unfilled limit order and slippage affect your replay result?"],
    sections: [
      {
        id: '15.1',
        title: "15.1 The Candle Run in the Original Example",
        content: "In Episode 3, the bullish discussion treats a consecutive run of down-close candles as one reference and extends its opening price forward. Later, the bearish discussion uses an up-close run and a move through its opening reference to explain a change in delivery within the ICT framework.\n\nThis is more specific than marking whichever final opposite-colour candle is easiest to see afterward. Record the run, its first opening reference and the surrounding liquidity context before reviewing a return. If a study uses a single-candle variant, label it explicitly and do not present it as identical to the shown multi-candle example.\n\nThe opening price is observable; the actual owners, inventory and hedges behind the move are not visible in OHLC bars. A return does not demonstrate that a bank deliberately pushed price away and then closed a losing counter-position at break-even.",
        keyTakeaway: "Preserve the candle-run and opening-reference definition used in the example; do not infer invisible inventory from the later reaction."
      },
      {
        id: '15.2',
        title: "15.2 Context and Study Filters",
        content: "In the linked example, the candle run is considered together with the liquidity reference, a change in delivery and an FVG. These observations explain the selected illustration. They do not prove that every candle with the opposite colour is meaningful or that every marked block must produce a reaction.\n\nFor a repeatable study, state which preceding liquidity event is required, how displacement is measured and whether the model requires an FVG. Those are recorded filters. Do not assign a Grade-A win probability simply because all boxes are ticked; no tested probability is established here.\n\nInclude cases that meet the definition and later fail. Otherwise the finished chart will select attractive blocks for you and hide the cost of acting before the outcome is known.",
        keyTakeaway: "Write the filters before selecting examples, and measure results rather than assigning confidence from a label."
      },
      {
        id: '15.3',
        title: "15.3 Midpoints, Retests and Invalidation",
        content: "State the selected boundaries before calculating Mean Threshold: midpoint = (upper boundary + lower boundary) / 2. A body-based midpoint and a full-range midpoint can differ. The run’s opening reference is another distinct level and must not be silently replaced by either midpoint.\n\nChoose the retest and failure rules before replay. A midpoint touch, a wick beyond it and a close beyond the full zone are different events. A tighter trade-specific stop does not make midpoint penetration a universal failure of every order block. The arithmetic alone cannot show that an institution is defending the level.\n\nCompare entry variants using the same targets and realistic fills. A deeper limit may remain unfilled; a stop-market order may slip; a stop-limit may not execute. There is no universally safe two-to-five-tick buffer and no guarantee of minimal drawdown.",
        keyTakeaway: "Keep the run opening, chosen midpoint and full-zone boundary distinct; define execution and failure before seeing the retest."
      },
{
  "id": "15.4-source-reading",
  "title": "15.4 Why the Last Opposite Candle Is Not Enough",
  "content": "Episode 18 refines the selected order-block reference using the surrounding FVG and change in delivery, rather than simply choosing the last opposite-colour candle. Episode 19 also treats consecutive down-close candles as a run in a bullish example. These are context-specific selections, not permission to choose any candle after seeing a successful reaction.\n\nWrite which original example you are studying, which candles form the reference and which opening or midpoint you use. Compare the original chart with your feed before drawing a boundary. If the definition changes between examples, document the difference instead of claiming one candle-colour shortcut covers every case."
}
    ]
  },

  // CHAPTER 16: Breaker Blocks: Trading Failed Order Blocks
  {
    id: 16,
    slug: 'breaker-blocks-trading-failed-order-blocks',
    part: 'Part III - Price Delivery',
    title: 'Breaker Blocks: Trading Failed Order Blocks — The Ultimate High-Win-Rate Reversal Pattern',
    quote: 'An Order Block trades with the trend; a Breaker Block trades the brutal liquidation of trapped traders when an Order Block fails. Breakers offer the highest statistical win-rates in the entire ICT arsenal.',
    level: 2,
    summary: [
      'The precise 4-point structural sequence of a Breaker Block (High-Low-Higher High-Lower Low).',
      'Why Breakers outperform standard Order Blocks: The mechanics of trapped order flow.',
      'Bullish Breaker Block vs. Bearish Breaker Block anatomy.',
      'The Breaker + FVG confluence: Constructing the ICT Unicorn Model.',
      'Mechanical execution, stop loss anchoring, and multi-stage target delivery.'
    ],
    keyTerms: [
      { term: 'Breaker Block', definition: 'A failed order block that formed prior to a liquidity sweep, which has subsequently been violated with displacement and flips polarity to provide high-probability support or resistance.' },
      { term: 'Bearish Breaker Block', definition: 'The lowest down-close candle within a swing low that formed between a swing high and a subsequent higher high, which is then shattered downward with displacement.' },
      { term: 'Bullish Breaker Block', definition: 'The highest up-close candle within a swing high that formed between a swing low and a subsequent lower low, which is then shattered upward with displacement.' },
      { term: 'Trapped Volume', definition: 'The accumulated positions of traders who entered at an Order Block expecting trend continuation, only to have price violently reverse through their entries.' },
      { term: 'The Unicorn Model', definition: 'The elite institutional confluence setup formed when a Breaker Block directly overlaps with an active Fair Value Gap.' }
    ],
    practiceQuestions: [
      'What is the mandatory 4-point swing sequence that must occur to form a valid Bearish Breaker Block?',
      'Why does a Breaker Block have a statistically higher win rate than a standard Order Block?',
      'How does the concept of "trapped retail volume" explain the explosive rejection that occurs when price retests a Breaker?',
      'What is the difference between a Breaker Block and a Mitigation Block?',
      'Where is the exact stop loss placed when executing an entry on a Breaker Block retest?'
    ],
    sections: [
      {
        id: '16.1',
        title: '16.1 The 4-Point Structural Sequence of a Breaker',
        content: `Among all institutional PD arrays taught by Michael J. Huddleston, the Breaker Block consistently delivers the highest statistical expectancy and lowest drawdown.

Why? Because a Breaker Block is built upon the catastrophic liquidation of trapped traders.

To identify a Bearish Breaker Block, you must verify a strict 4-point structural sequence:

1. Point 1 (High): The market establishes a swing high.
2. Point 2 (Low): Price pulls back and establishes an intermediate swing low. In this pullback, a down-close candle prints (this is the future Breaker Block!).
3. Point 3 (Higher High / Sweep): Price rallies from Point 2 and expands to print a new Higher High, sweeping the Buy-Side Liquidity resting above Point 1. At this moment, retail trend-followers are aggressively buying, believing the bull market is strong.
4. Point 4 (Lower Low / Displacement): Suddenly, smart money unloads massive institutional sell volume. Price collapses vertically downward, blowing completely through the Point 2 swing low and closing a solid candle body below it!

Now examine what just happened:
- Point 2 was an order block that generated the rally to Point 3.
- The traders who bought at Point 2 are now severely trapped in underwater positions!
- When price retraces back up to Point 2, those trapped buyers rush to close their positions at break-even (selling to exit).
- Concurrently, institutional algorithms step in to add massive short positions at the exact same level.
The resulting confluence of trapped-buyer liquidation and institutional selling triggers a violent downward rejection!`,
        keyTakeaway: 'A Bearish Breaker is the down-close candle inside the swing low formed between a high and a higher high, which is subsequently shattered downward.'
      },
      {
        id: '16.2',
        title: '16.2 Breaker vs. Mitigation Block: The Decisive Difference',
        content: `Traders frequently confuse Breaker Blocks with Mitigation Blocks. While they look similar on a chart, their institutional mechanics are completely distinct:

1. The Breaker Block (Requires a Liquidity Sweep):
- Sequence for Bearish: High ➔ Low ➔ HIGHER HIGH (Sweep) ➔ Lower Low.
- Because price took out the old high, it successfully engineered and trapped maximum liquidity before reversing.
- Expectancy: Extremely High.

2. The Mitigation Block (Failure Swing):
- Sequence for Bearish: High ➔ Low ➔ LOWER HIGH (Failure) ➔ Lower Low.
- Notice that Point 3 failed to take out the old high. It was a failure swing showing underlying weakness, but it did NOT sweep resting liquidity.
- When price returns to the down candle of Point 2, it still acts as resistance, but because fewer trapped orders reside there, the rejection is often less explosive.
- Expectancy: Moderate to High.

Always prioritize Breakers over Mitigation Blocks. The presence of the liquidity sweep at Point 3 is the magic ingredient that fuels the explosive delivery.`,
        keyTakeaway: 'Breakers form after a liquidity sweep (Higher High or Lower Low). Mitigation blocks form after a failure swing. Breakers hold superior win-rate expectancy.'
      },
      {
        id: '16.3',
        title: '16.3 The Unicorn Model: Breaker + FVG Confluence',
        content: `What happens when you combine the two most powerful institutional price action patterns into a single price coordinate?
You get what advanced ICT students refer to as The Unicorn Model.

The Unicorn Confluence:
1. A valid Breaker Block is established through the 4-point sequence.
2. The displacement wave that shatters Point 4 leaves behind an active Fair Value Gap (FVG).
3. Crucially: The Fair Value Gap directly overlaps with the Breaker Block price corridor!

When price retraces into this shared zone, you have:
- Trapped traders desperate to exit at break-even (Breaker mechanics).
- An unfilled institutional imbalance that the algorithm must rebalance (FVG mechanics).
- Higher-timeframe market structure shift confirmation.

Execution Blueprint:
- Place a limit order at the intersection of the FVG and Breaker Block.
- Stop Loss: Placed strictly above the high of the displacement wave (or above the sweep extreme for ultra-safe positioning).
- Target: Opposing session liquidity or the daily Draw on Liquidity.
The Unicorn Model is considered an A+ institutional setup that frequently yields 1:4 to 1:8 Risk-to-Reward payouts with minimal adverse excursion.`,
        keyTakeaway: 'The Unicorn Model merges a Breaker Block with an overlapping Fair Value Gap, creating one of the highest-probability setups in professional tape reading.'
      }
    ]
  }
];
