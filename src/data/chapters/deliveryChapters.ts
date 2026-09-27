import { TextbookChapter } from '../../types';

export const deliveryChapters: TextbookChapter[] = [
  // CHAPTER 13: Fair Value Gaps (FVG) & Consequent Encroachment
  {
    id: 13,
    slug: 'fair-value-gaps-fvg-and-consequent-encroachment',
    part: 'Part III - Price Delivery',
    title: 'Fair Value Gaps (FVG) & Consequent Encroachment — The Core Institutional Imbalance',
    quote: 'A Fair Value Gap is not a missing bar; it is an area where the algorithm delivered only one side of the market with extreme urgency, leaving an inefficiency that must mathematically be rebalanced to establish true fair value.',
    level: 2,
    summary: [
      'The exact 3-candle anatomical formation of Bullish (BISI) and Bearish (SIBI) FVGs.',
      'The mathematical mechanics of Consequent Encroachment (50% CE) and why candle bodies matter.',
      'Premium vs. Discount FVGs: Aligning execution with higher-timeframe dealing ranges.',
      'The life cycle of an FVG: Virgin, Mitigated, Fully Rebalanced, and Inverted.',
      'Execution blueprint: Limit order placement, stop loss rules, and targeting external liquidity.'
    ],
    keyTerms: [
      { term: 'Fair Value Gap (FVG)', definition: 'A three-candle price pattern where a large middle candle expands so aggressively that the wick of Candle 1 and the wick of Candle 3 do not overlap, leaving an unfilled price imbalance.' },
      { term: 'BISI (Buyside Imbalance Sellside Inefficiency)', definition: 'A bullish FVG created when an aggressive up-close candle delivers only buyside liquidity, leaving an inefficiency where no sellside liquidity was offered.' },
      { term: 'SIBI (Sellside Imbalance Buyside Inefficiency)', definition: 'A bearish FVG created when an aggressive down-close candle delivers only sellside liquidity, leaving an inefficiency where no buyside liquidity was offered.' },
      { term: 'Consequent Encroachment (CE)', definition: 'The exact 50% midpoint of a Fair Value Gap, serving as the critical mathematical balance point where institutional algorithms typically react.' },
      { term: 'Virgin FVG', definition: 'A newly printed Fair Value Gap that has not experienced any subsequent price interaction or mitigation.' }
    ],
    practiceQuestions: [
      'What are the exact three candles that compose a Fair Value Gap, and where are the upper and lower boundaries measured?',
      'Why is the 50% Consequent Encroachment (CE) considered the most vital level within an FVG?',
      'What does it indicate about institutional order flow if a candle body closes completely beyond the 50% CE of an FVG?',
      'How does the concept of Premium vs. Discount dictate which FVGs you are permitted to trade?',
      'What is the structural difference between a Fair Value Gap, a Volume Imbalance, and a Liquidity Void?'
    ],
    sections: [
      {
        id: '13.1',
        title: '13.1 The Three-Candle Anatomical Structure of an FVG',
        content: `A Fair Value Gap (FVG) is the foundational PD array of modern ICT and SMC trading. It represents a physical price zone where the Interbank Price Delivery Algorithm (IPDA) delivered price so rapidly that it offered liquidity to only one side of the order book.

An FVG is strictly formed across three consecutive candlesticks:

1. The Bullish FVG (BISI — Buyside Imbalance Sellside Inefficiency):
- Candle 1: A baseline candle that establishes a high (mark the extreme High of Candle 1's wick).
- Candle 2 (The Displacement Candle): A large, explosive green candle that expands vertically upward.
- Candle 3: The candle immediately following Candle 2, which establishes a low (mark the extreme Low of Candle 3's wick).
- The Imbalance Zone: If the Low of Candle 3 does NOT overlap the High of Candle 1, the open space between them is the BISI!
- Lower Boundary: High of Candle 1.
- Upper Boundary: Low of Candle 3.

2. The Bearish FVG (SIBI — Sellside Imbalance Buyside Inefficiency):
- Candle 1: A baseline candle establishing a low (mark the extreme Low of Candle 1's wick).
- Candle 2 (The Displacement Candle): A massive red candle that plunges vertically downward.
- Candle 3: The subsequent candle establishing a high (mark the extreme High of Candle 3's wick).
- The Imbalance Zone: If the High of Candle 3 does NOT overlap the Low of Candle 1, the space between them is the SIBI!
- Upper Boundary: Low of Candle 1.
- Lower Boundary: High of Candle 3.

Inside this gap, the market moved too fast for normal two-sided auctioning to take place. The algorithm has an inherent mathematical imperative to return to this zone to offer the missing side of liquidity before continuing its macro journey.`,
        keyTakeaway: 'An FVG is a 3-candle imbalance. The gap exists between the wick of Candle 1 and the wick of Candle 3, representing one-sided liquidity delivery.'
      },
      {
        id: '13.2',
        title: '13.2 The Sacred 50% Consequent Encroachment (CE)',
        content: `Within every Fair Value Gap lies its most critical mathematical level: Consequent Encroachment (CE).

Consequent Encroachment is the exact 50% midpoint of the gap:
CE = (Upper Boundary + Lower Boundary) / 2

Why is the 50% CE level so vital to institutional tape reading?
Because an imbalance does not need to be 100% closed to achieve institutional equilibrium. When price returns into an FVG, tapping the 50% CE level satisfies the algorithm's requirement for fair value rebalancing!

The Golden Rules of Consequent Encroachment Defense:
1. Wicks Can Penetrate, Bodies Must Respect:
During a retest of an FVG, price wicks may frequently probe through the 50% CE level to sweep micro-stops or test liquidity depth. However, in a healthy, high-probability setup, candle bodies must close above the 50% CE (for a bullish BISI) or below the 50% CE (for a bearish SIBI).
2. The Invalidation Signature:
If a candle body closes fully beyond the 50% CE level, the institutional algorithm is no longer defending the gap. This is a severe warning signal that the imbalance is failing and is likely to convert into an Inverse Fair Value Gap (IFVG).
3. Execution Advantage:
Entering at the 50% CE with a limit order significantly improves your average fill price, reduces your required stop loss size, and substantially expands your final Risk-to-Reward ratio.`,
        keyTakeaway: 'The 50% CE is the mathematical equilibrium of an FVG. Candle bodies closing beyond the 50% CE signal that the imbalance is failing.'
      },
      {
        id: '13.3',
        title: '13.3 The Life Cycle of an FVG and Execution Protocols',
        content: `To trade Fair Value Gaps with elite consistency, you must track their four evolutionary states:

1. State 1: Virgin FVG
The gap has just formed during displacement. It is fresh, untouched, and holds the highest probability of an energetic, immediate reaction upon first contact.

2. State 2: Mitigated FVG (Partial Rebalance)
Price retraces into the gap, touches the proximal boundary or 50% CE, and rejects. The gap is now "partially mitigated." While it can still be traded on a second touch, its reaction potency is diminished.

3. State 3: Fully Rebalanced (Closed)
Price completely fills the entire open space from upper boundary to lower boundary. The auction is now fully balanced. The gap ceases to exist as an active PD array.

4. State 4: Inverted (IFVG)
Price blows straight through the gap with a full candle body close, disrespecting the zone entirely. The gap now flips its polarity from support to resistance or vice versa.

The Mechanical Execution Blueprint:
- Context First: In an overall bullish market, only buy in Discount FVGs (located below the 50% equilibrium of the dealing range). Never buy an FVG sitting in extreme Premium!
- Order Placement: Place your limit buy order at the upper edge or 50% CE of the BISI.
- Stop Loss Placement: Place your stop loss 2 to 5 ticks below the low of Candle 1 (or the origin swing low).
- Target: The opposing External Range Liquidity pool (old swing high or Equal Highs).`,
        keyTakeaway: 'Only trade Virgin FVGs aligned with dealing range discount/premium. Enter at proximal edge or 50% CE; place stops safely behind Candle 1.'
      }
    ]
  },

  // CHAPTER 14: Inverse Fair Value Gaps (IFVG): Role Reversal Imbalances
  {
    id: 14,
    slug: 'inverse-fair-value-gaps-ifvg-role-reversal-imbalances',
    part: 'Part III - Price Delivery',
    title: 'Inverse Fair Value Gaps (IFVG): Role Reversal Imbalances — Exploiting Failed Market Inefficiencies',
    quote: 'When an imbalance fails to hold price, it does not die; it transforms. An Inverse Fair Value Gap is the algorithmic flip where broken support becomes impenetrable resistance.',
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
    title: 'Order Blocks (OB) & Mitigation — Institutional Volume Absorption and Mean Threshold',
    quote: 'An Order Block is not simply the last opposite candle before a move. It is the specific price footprint where an institution absorbed retail liquidity to build a massive directional inventory.',
    level: 2,
    summary: [
      'The strict institutional definition of an Order Block (OB).',
      'Bullish OB vs. Bearish OB: The anatomy of the manipulation candle.',
      'The Mean Threshold (50% MT): The mathematical line of institutional defense.',
      'The Mitigation Cycle: Why price returns to the Order Block to release smart money hedges.',
      'Order Block qualification rules: Filtering high-probability OBs from random chart candles.'
    ],
    keyTerms: [
      { term: 'Order Block (OB)', definition: 'The final candlestick of the opposite color immediately preceding an aggressive displacement wave that sweeps liquidity and breaks market structure.' },
      { term: 'Bullish Order Block (+OB)', definition: 'The lowest down-close candle (or consecutive series of down candles) prior to a violent upward displacement that breaks a swing high.' },
      { term: 'Bearish Order Block (-OB)', definition: 'The highest up-close candle (or series of up candles) prior to a violent downward displacement that breaks a swing low.' },
      { term: 'Mean Threshold (MT)', definition: 'The exact 50% midpoint of the entire Order Block candle body; a close beyond MT signals institutional failure.' },
      { term: 'Mitigation', definition: 'The algorithmic return of price to an Order Block allowing institutional dealers to neutralize, absorb, or close residual counter-trend exposure at break-even.' }
    ],
    practiceQuestions: [
      'Why must an authentic Order Block be accompanied by displacement and a Market Structure Shift to be considered valid?',
      'What is the difference between measuring the 50% Mean Threshold of an Order Block versus the 50% Consequent Encroachment of an FVG?',
      'If price penetrates deep into an Order Block but the candle body closes above the Mean Threshold, is the Order Block still structurally intact?',
      'Why does an institution need to "mitigate" an Order Block after initiating an aggressive move?',
      'How does an Order Block that swept a major liquidity pool compare in reliability to an Order Block that formed in open consolidation?'
    ],
    sections: [
      {
        id: '15.1',
        title: '15.1 The True Institutional Nature of an Order Block',
        content: `In the retail trading space, an Order Block (OB) is often casually described as "the last down candle before an up move, or the last up candle before a down move."
If this simplistic definition were true, every single chart would be covered in dozens of order blocks, and none of them would work.

To understand an Order Block, you must understand institutional inventory management:

When an institutional bank wants to buy 10,000 contracts of E-mini S&P futures, they cannot simply buy. They must engineer liquidity.
To engineer liquidity, they deliberately sell into the market to push price below a key support level. This artificial selling triggers retail stop-loss orders (stop sells) and induces breakout sellers to short.

Now, look at the last down candle that printed before price took off:
- In that down candle, the institution accumulated their massive long position by buying all the panic sells.
- BUT, to push price down, the institution also had to open some short positions!
- Then, the institution unleashes aggressive market buy orders, generating violent Displacement upward, leaving a Fair Value Gap, and causing a Market Structure Shift (MSS).

Now the institution has a problem:
Their long positions are in massive profit, but their initial short positions (opened during that down candle) are underwater!
Therefore, the algorithm later guides price back down into that exact origin candle.
This return is called Mitigation: it allows the institution to close out their underwater short positions at break-even and inject fresh long limit orders into the market!`,
        keyTakeaway: 'An Order Block is the physical zone where an institution accumulated inventory and held temporary counter-trend risk. Mitigation allows them to close that risk at break-even.'
      },
      {
        id: '15.2',
        title: '15.2 The Three Validation Filters of an Authentic Order Block',
        content: `Never mark an Order Block unless it passes all three of these institutional filters:

1. Filter 1: Prior Liquidity Purge
The Order Block must have actively swept liquidity. A bullish OB must have probed below an old swing low, equal lows, or session low. A bearish OB must have probed above an old swing high. If it did not sweep liquidity, it is not an institutional accumulation block.

2. Filter 2: Explosive Displacement Wave
The candle (or series of candles) leaving the Order Block must be explosive. It cannot be slow or hesitant. It must produce a rapid displacement wave with large bodies.

3. Filter 3: Creation of an Unfilled Fair Value Gap (FVG)
This is the ultimate litmus test: the displacement wave leaving the Order Block MUST leave behind a valid 3-candle Fair Value Gap.
If the move away from the candle does not create an FVG, the move lacked institutional urgency, and the candle should be discarded!

When all three filters align, you have identified a Grade-A Institutional Order Block.`,
        keyTakeaway: 'A valid Order Block must: (1) Sweep liquidity, (2) Produce violent displacement, and (3) Leave behind an unfilled Fair Value Gap.'
      },
      {
        id: '15.3',
        title: '15.3 The Sacred Mean Threshold (50% MT) Execution Rule',
        content: `Just as an FVG has its 50% Consequent Encroachment, an Order Block has its mathematical core: Mean Threshold (MT).

Mean Threshold Calculation:
- Take the total body of the Order Block candle (from Open to Close).
- The exact 50% midpoint of the body is the Mean Threshold (MT).

The Golden Execution and Invalidation Rules:
1. The Entry Trigger:
- Aggressive Entry: Placed at the open of the Order Block candle (proximal edge).
- Precision Entry: Placed at the 50% Mean Threshold of the Order Block candle body. This gives you maximum R:R and minimal drawdown.
2. The Invalidation Rule:
Price is permitted to wick into the Order Block, and wicks can probe past the Mean Threshold.
However: NO CANDLE BODY IS PERMITTED TO CLOSE BEYOND THE 50% MEAN THRESHOLD!
If a candle body closes beyond the Mean Threshold of the Order Block body, the institutional order flow has failed. The setup is dead. Close the position immediately.
3. Stop Loss Placement:
Place your stop loss safely 2 to 5 ticks beyond the extreme wick of the Order Block candle.`,
        keyTakeaway: 'The 50% Mean Threshold of the Order Block body is the line of institutional defense. Candle bodies closing beyond MT invalidate the block.'
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
