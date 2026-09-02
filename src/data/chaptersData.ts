import { TextbookChapter } from '../types';

export const textbookChapters: TextbookChapter[] = [
  {
    id: 1,
    slug: 'what-actually-moves-price',
    part: 'Part I - Market Foundations',
    title: 'What Actually Moves Price?',
    quote: 'In every trade there is always one buyer and one seller. Always. Price moves because incoming orders cannot be matched at the current price.',
    level: 0,
    summary: [
      'Every transaction requires both a buyer and a seller in equal quantity.',
      'Price does not move simply because there are "more buyers than sellers".',
      'Markets operate through an order book where bids and asks wait in price-time queues.',
      'Market orders cross the spread and consume liquidity; limit orders provide liquidity.',
      'Price changes when aggressive market orders exhaust the available limit orders at the best prices.',
      'Liquidity is the foundation upon which nearly all SMC and ICT concepts are built.'
    ],
    keyTerms: [
      { term: 'Order Book', definition: 'A live list of outstanding buy and sell limit orders on an exchange.' },
      { term: 'Bid', definition: 'The highest price a buyer is currently willing to pay.' },
      { term: 'Ask', definition: 'The lowest price a seller is currently willing to accept.' },
      { term: 'Spread', definition: 'The gap between the best bid and the best ask.' },
      { term: 'Market Order', definition: 'An aggressive order that executes immediately against resting liquidity.' },
      { term: 'Limit Order', definition: 'A passive order that waits in the order book until price reaches it.' },
      { term: 'Market Impact', definition: 'The price change caused by executing a large order through available liquidity.' }
    ],
    practiceQuestions: [
      'If every trade has both a buyer and a seller, why can price still rise or fall?',
      'What is the difference between an aggressive market order and a passive limit order?',
      'Why do large market orders tend to cause slippage and move price more than small ones?',
      'In what sense do limit orders "provide liquidity"?',
      'Why is saying "price went up because there were more buyers than sellers" an oversimplification?'
    ],
    sections: [
      {
        id: '1.1',
        title: '1.1 The Biggest Lie Most Beginners Learn',
        content: `Ask almost any beginner: *"Why did Bitcoin go up?"*

The answer is usually: *"Because there were more buyers than sellers."*

This sounds logical, but it is fundamentally incomplete. In every single trade in financial history, there is always:
- **One buyer.**
- **One seller.**
- **Always. Not sometimes. Always.**

If someone buys 10 BTC, someone else sold 10 BTC. So if buyers always equal sellers in volume, why does price move? This question is the foundation of everything you will learn.`
      },
      {
        id: '1.2',
        title: '1.2 The Marketplace and the Order Book',
        content: `Imagine a fruit market. There are 100 apples. Different sellers offer different prices:
- Seller A: 10 apples at $1.00
- Seller B: 20 apples at $1.10
- Seller C: 30 apples at $1.20
- Seller D: 40 apples at $1.30

Suppose 100 buyers rush in demanding apples immediately. Seller A sells out. Seller B sells out. Seller C sells out. Buyers must now buy from Seller D at $1.30.

Did apples become 30% more valuable in one minute? **No. The cheapest available supply disappeared.**

Financial markets work the exact same way. The exchange maintains an **Order Book** with two sides:
1. **Asks (Sellers):** Waiting at progressively higher prices.
2. **Bids (Buyers):** Waiting at progressively lower prices.`
      },
      {
        id: '1.3',
        title: '1.3 Aggression Moves Price',
        content: `Everything in every market begins with two basic order types:

- **Market Order (Aggressive):** *"I don't care about price, fill my order immediately."* Market orders consume liquidity.
- **Limit Order (Passive):** *"I will buy only at this price or better."* Limit orders provide liquidity.

When an institutional fund wants to buy 5,000 BTC, they cannot simply click "Buy Market" without driving the execution price drastically higher (known as **Market Impact** or **Slippage**).

This explains why large institutions require concentrated pools of resting orders—which ICT refers to as **Liquidity Pools**—to enter and exit their positions.`
      }
    ]
  },
  {
    id: 2,
    slug: 'how-an-exchange-matches-orders',
    part: 'Part I - Market Foundations',
    title: 'How an Exchange Matches Orders',
    quote: 'Before you can understand why price moves toward liquidity, you must understand how price moves at all.',
    level: 0,
    summary: [
      'An exchange is a referee, not a player; it matches orders by price-time priority.',
      'Better prices execute first; among equal prices, the earliest order executes first.',
      'The chart displays the last executed transaction print, not an intrinsic value.',
      'Price can "jump" or displace when there are voids of resting limit orders.',
      'The exchange engine has no concept of "support" or "order blocks"—it only knows orders, price, quantity, and time.'
    ],
    keyTerms: [
      { term: 'Price-Time Priority', definition: 'The universal matching rule where best prices and earliest timestamps get filled first.' },
      { term: 'Crossing the Spread', definition: 'When a market participant pays the ask or sells into the bid to get immediate execution.' },
      { term: 'Execution Engine', definition: 'The software within an exchange that pairs opposing orders.' }
    ],
    practiceQuestions: [
      'Why is the exchange best described as a matching engine rather than a market participant?',
      'If two traders place identical sell orders at $100,000, which one fills first and why?',
      'Why can price appear to jump rapidly even when only one large order is submitted?',
      'Why is it useful to distinguish between exchange mechanics and chart analysis models?'
    ],
    sections: [
      {
        id: '2.1',
        title: '2.1 The Exchange Is a Referee',
        content: `One of the biggest misconceptions beginners have is: *"The exchange decides the price."*

It doesn't. The exchange has one job: match buyers and sellers according to predefined rules. It doesn't buy, sell, or predict the future. It simply executes:
- A buyer wants to buy at X.
- A seller is willing to sell at X.
- Their prices match -> Execute trade.`
      },
      {
        id: '2.2',
        title: '2.2 Price-Time Priority and Crossing the Spread',
        content: `Exchanges match orders according to two strict rules:
1. **Rule 1 (Price Priority):** Better prices get executed first. The cheapest seller and highest buyer always take precedence.
2. **Rule 2 (Time Priority):** If two traders offer the same price, the earlier order gets filled first.

Between the Best Bid and Best Ask exists a gap called **The Spread**. Passive traders wait on either side of the spread. Aggressive traders **cross the spread** and demand execution now. It is this urgency that creates price velocity.`
      },
      {
        id: '2.3',
        title: '2.3 Why Price Can Jump (Displacement Origins)',
        content: `Suppose the sell orders are:
- 1 BTC at $100,001
- 20 BTC at $100,010

Notice there are zero sell orders between $100,002 and $100,009. If a buyer submits a market order for 5 BTC:
- 1 BTC fills at $100,001
- The remaining 4 BTC fill at $100,010

To someone watching the chart, price appears to have "jumped" $9 in a millisecond. In reality, it simply cleared a liquidity vacuum. This mechanical reality is the exact engine behind **Fair Value Gaps** and **Displacement**.`
      }
    ]
  },
  {
    id: 3,
    slug: 'the-order-book-in-depth',
    part: 'Part I - Market Foundations',
    title: 'The Order Book in Depth',
    quote: 'Price is the visible result. The order book is the invisible battlefield.',
    level: 0,
    summary: [
      'Candlesticks are the scoreboard; the order book is watching the match live.',
      'Visible liquidity in Depth of Market (DOM) is only a fraction of total market intent.',
      'Iceberg orders and execution algorithms (TWAP/VWAP) hide large institutional footprints.',
      'Absorption occurs when passive limit orders soak up aggressive market orders.',
      'Exhaustion occurs when aggressive market orders run out of steam.',
      'SMC analyzes the footprints left behind on the chart by these order book interactions.'
    ],
    keyTerms: [
      { term: 'Depth of Market (DOM)', definition: 'A live display of resting buy and sell limit orders at multiple price levels.' },
      { term: 'Iceberg Order', definition: 'A large order that only displays a small visible fraction while keeping the rest hidden.' },
      { term: 'Absorption', definition: 'When one side of the market absorbs aggressive pressure without letting price advance.' },
      { term: 'Exhaustion', definition: 'A decline in aggressive market orders causing momentum to stall.' },
      { term: 'Spoofing', definition: 'Placing fake limit orders with the intention of canceling them before execution.' }
    ],
    practiceQuestions: [
      'Why might a large institution prefer an iceberg order instead of displaying its full size?',
      'What is the fundamental difference between absorption and exhaustion?',
      'Why should traders never blindly trust every large order visible in the DOM?',
      'Why does ICT focus on candlestick footprints rather than staring at the live DOM?'
    ],
    sections: [
      {
        id: '3.1',
        title: '3.1 Behind the Candlesticks',
        content: `A single candlestick tells you four historical facts: Open, High, Low, and Close. It does not tell you *how* it happened.

Think of a soccer scoreboard: Team A 3, Team B 1. You know the score, but not who dominated possession or how the goals were scored. Candlesticks are the scoreboard; the order book is the game.`
      },
      {
        id: '3.2',
        title: '3.2 Icebergs, Algorithms, and Absorption',
        content: `Large institutions use execution algorithms to enter positions over hours or days without moving the market against themselves:
- **TWAP (Time-Weighted Average Price):** Slices large orders into small fractions executed at regular time intervals.
- **VWAP (Volume-Weighted Average Price):** Adjusts execution speed based on market trading volume.
- **Iceberg Orders:** Displays only 10 BTC visible while 1,000 BTC sits behind it. Every time 10 BTC is bought, another 10 BTC instantly refills.

When aggressive buyers hit an iceberg seller, volume spikes but price refuses to rise. This is **Absorption**—the precursor to failed breakouts and Order Blocks.`
      }
    ]
  },
  {
    id: 4,
    slug: 'liquidity-the-most-misunderstood-word',
    part: 'Part I - Market Foundations',
    title: 'Liquidity: The Most Misunderstood Word in Trading',
    quote: 'Liquidity is not a line on a chart. It is the ability to transact without causing large price impact. Everything else is built on top of that.',
    level: 1,
    summary: [
      'Financial liquidity is the ease of converting an asset into cash with minimal price change.',
      'Order book liquidity is the resting limit depth near current price.',
      'ICT liquidity refers to clusters of conditional orders (stop losses and breakout entries) resting at obvious chart levels.',
      'Buy Side Liquidity (BSL) sits above swing highs; Sell Side Liquidity (SSL) sits below swing lows.',
      'Liquidity identifies an area of interest, NOT a guaranteed turning point.',
      'A Liquidity Sweep is a brief raid followed by rejection; a Liquidity Run is sustained acceptance through the level.'
    ],
    keyTerms: [
      { term: 'Buy Side Liquidity (BSL)', definition: 'Buy stop-loss orders from short sellers and buy stop-entry orders from breakout traders above highs.' },
      { term: 'Sell Side Liquidity (SSL)', definition: 'Sell stop-loss orders from long buyers and sell stop-entry orders from breakout traders below lows.' },
      { term: 'Liquidity Sweep', definition: 'Price briefly trades through a key level, triggers clustered stops, and sharply rejects back inside.' },
      { term: 'Liquidity Run', definition: 'Price drives through a liquidity pool and continues expanding, gaining acceptance beyond it.' },
      { term: 'External Liquidity', definition: 'Major swing highs/lows and range boundaries defining the macro dealing range.' },
      { term: 'Internal Liquidity', definition: 'Minor swing points and imbalances residing inside the broader range.' }
    ],
    practiceQuestions: [
      'Why do finance textbooks and ICT use the word "liquidity" differently?',
      'Why are equal highs (EQH) considered premier liquidity pools in the ICT framework?',
      'Does the presence of liquidity guarantee a reversal? Why or why not?',
      'What separates a liquidity sweep from a genuine breakout with acceptance?'
    ],
    sections: [
      {
        id: '4.1',
        title: '4.1 The Three Meanings of Liquidity',
        content: `The word "liquidity" is used in three distinct ways:
1. **Economics / Finance:** How easily an asset can be converted to cash (Cash > Bitcoin > Real Estate).
2. **Market Microstructure:** How many resting limit orders exist in the order book right now.
3. **ICT / SMC Framework:** Concentrations of future conditional orders (stop-losses, breakout stops) clustered around visible swing highs, swing lows, and session extremes.

Understanding this distinction eliminates 90% of useless online arguments.`
      },
      {
        id: '4.2',
        title: '4.2 Why Equal Highs and Obvious Lows Attract Price',
        content: `When thousands of traders look at the same chart and see a double top ("resistance"), retail traders short and place stop losses directly above it. Breakout traders place buy stop-entry orders above it.

Now think: what happens when price touches that level?
- Short stop-losses trigger -> **BUY orders**
- Breakout entries trigger -> **BUY orders**

Both order types are **BUY orders**! This pool of buying volume provides the exact counterparty volume required for large institutions to fill massive sell orders or exit long positions.`
      },
      {
        id: '4.3',
        title: '4.3 Liquidity Sweep vs Liquidity Run',
        content: `When price pierces a liquidity level, two distinct behaviors can occur:
- **Liquidity Sweep:** Price breaches the level, consumes the stop orders, and immediately reverses with displacement, closing back inside the range.
- **Liquidity Run:** Price trades through the level, closes beyond it, and continues expanding toward a higher-timeframe objective.

**The Golden Rule:** A sweep is an event, not an automatic entry signal. The reaction and market structure shift *after* the sweep give it meaning.`
      }
    ]
  },
  {
    id: 5,
    slug: 'why-candles-form-and-displacement',
    part: 'Part I - Market Foundations',
    title: 'Why Candles Form & How Displacement Arises',
    quote: 'A candlestick is not a prediction. It is the historical record of a battle between buyers and sellers during a fixed time container.',
    level: 1,
    summary: [
      'Candles are time containers (1m, 5m, 1h, 1D) compressing thousands of trades into OHLC.',
      'Real bodies represent price consensus and directional commitment.',
      'Wicks represent price exploration that was rejected before the candle closed.',
      'Displacement is an abnormal expansion in one direction showing sustained aggression.',
      'Displacement is the foundational engine behind Fair Value Gaps and Order Blocks.'
    ],
    keyTerms: [
      { term: 'Time Container', definition: 'The fixed temporal window represented by a single candlestick.' },
      { term: 'Real Body', definition: 'The range between Open and Close representing where the market accepted price.' },
      { term: 'Wick / Shadow', definition: 'The extreme prices reached during the period but rejected before the close.' },
      { term: 'Displacement', definition: 'A rapid, decisive repricing with large real bodies, minimal wicks, and structural consequences.' }
    ],
    practiceQuestions: [
      'Why is it incorrect to assume a green candle proves buyers were stronger throughout the entire period?',
      'What information does a wick provide that a close cannot?',
      'How does displacement differ from ordinary candlestick volatility?'
    ],
    sections: [
      {
        id: '5.1',
        title: '5.1 Candles as Time Containers',
        content: `A candlestick does not represent a fixed number of trades; it represents a fixed window of time. When the clock expires, the candle closes and a new one immediately begins.

The real body shows where the market accepted price between open and close. The wicks record where price was tested but rejected before time expired.`
      },
      {
        id: '5.2',
        title: '5.2 The True Meaning of Displacement',
        content: `Displacement is not just a "big candle". It is evidence of **abnormal expansion** where aggressive market orders completely overwhelm resting liquidity across multiple price tiers.

Key characteristics of high-quality displacement:
1. Large real body dominating the candle range (>75% body).
2. Minimal opposing wicks showing relentless urgency.
3. Little to no overlap with adjacent candles.
4. Breaks a meaningful structural swing (BOS or MSS).
5. Leaves behind a Fair Value Gap (FVG).`
      }
    ]
  },
  {
    id: 7,
    slug: 'what-is-a-swing',
    part: 'Part II - Price Structure',
    title: 'What Is a Swing? The Atom of Structure',
    quote: 'Market structure is built from swings. If you cannot identify a swing correctly, nothing built on top of it can be trusted.',
    level: 1,
    summary: [
      'A swing is not a mechanical 3-candle fractal; it is a turning point where market control changes.',
      'A swing is confirmed ONLY after price demonstrates that it has moved away from that level.',
      'Major swings contain hundreds of minor internal swings (fractal self-similarity).',
      'Protected highs and lows are the specific swings that created structural breaks.',
      'Top-down analysis is the continuous reconciliation between internal and external structure.'
    ],
    keyTerms: [
      { term: 'Swing High', definition: 'A meaningful turning point where an upward auction ends and price moves lower.' },
      { term: 'Swing Low', definition: 'A meaningful turning point where a downward auction ends and price moves higher.' },
      { term: 'Protected Swing', definition: 'The structural high or low responsible for creating the latest break of structure.' },
      { term: 'Internal Swings', definition: 'Smaller fluctuations occurring within a broader dealing range.' }
    ],
    practiceQuestions: [
      'Why is counting candles alone insufficient for identifying meaningful swings?',
      'Why can a swing only be confirmed in hindsight after price moves away?',
      'What is the difference between an internal swing and an external structural swing?'
    ],
    sections: [
      {
        id: '7.1',
        title: '7.1 Swings as Turning Points',
        content: `Imagine throwing a ball into the air: it rises, decelerates, stops, and falls. The peak is the turning point.

A swing high is evidence that buyers ran out of aggressive initiative and sellers gained enough momentum to turn the auction. Not every minor tick is a swing; we only care about swings that produced meaningful displacement.`
      },
      {
        id: '7.2',
        title: '7.2 The Principle of Significance',
        content: `Before marking any high or low on your chart, ask:
1. Did price travel a significant distance away from this level?
2. Did this move break a previous structural point?
3. Did it create displacement and leave an FVG?
4. Would other market participants independently identify this level?

If the answer is yes, the swing carries high structural significance.`
      }
    ]
  },
  {
    id: 9,
    slug: 'break-of-structure-bos',
    part: 'Part II - Price Structure',
    title: 'Break of Structure (BOS): Trend Continuation',
    quote: 'A Break of Structure is not simply price crossing a line. It is the market demonstrating that the existing directional auction is still intact.',
    level: 1,
    summary: [
      'BOS occurs when price breaks a meaningful swing in the direction of the existing trend.',
      'BOS confirms continuation; it NEVER creates a new trend.',
      'A decisive candle close beyond structure is a much more reliable confirmation than a brief wick.',
      'Displacement through the swing separates a valid BOS from a liquidity sweep trap.',
      'Every BOS must specify its timeframe (e.g. 5M BOS vs Daily BOS).'
    ],
    keyTerms: [
      { term: 'Break of Structure (BOS)', definition: 'The continuation event where price breaks a prior structural swing in the prevailing trend direction.' },
      { term: 'Bullish BOS', definition: 'Price closes above a prior meaningful swing high during an established uptrend.' },
      { term: 'Bearish BOS', definition: 'Price closes below a prior meaningful swing low during an established downtrend.' }
    ],
    practiceQuestions: [
      'Why is BOS strictly a continuation signal and not a reversal signal?',
      'Why does candle close matter more than a temporary wick when confirming a BOS?',
      'How does displacement differentiate a true BOS from a liquidity sweep?'
    ],
    sections: [
      {
        id: '9.1',
        title: '9.1 The Continuation Rhythm',
        content: `An uptrend is a sequence: Higher Low -> Higher High -> Higher Low -> Higher High.

When price surpasses the previous Higher High with decisive momentum, it produces a **Bullish BOS**. The existing auction has proven that buyers remain in structural control.`
      },
      {
        id: '9.2',
        title: '9.2 The Five-Dimension Evaluation Framework',
        content: `Evaluate every structural break across five dimensions:
1. **Scale:** Which timeframe and which level of structure broke?
2. **Strength:** Was there real displacement or only a hesitant 1-tick breach?
3. **Acceptance:** Did price close and hold beyond the level?
4. **Context:** Where did this occur relative to the higher-timeframe dealing range?
5. **Purpose:** Was the move continuing a trend or sweeping liquidity?`
      }
    ]
  },
  {
    id: 10,
    slug: 'change-of-character-choch',
    part: 'Part II - Price Structure',
    title: 'Change of Character (CHoCH): The First Warning',
    quote: 'A Change of Character is the market asking a question. It is not yet the market giving an answer.',
    level: 1,
    summary: [
      'CHoCH is the first structural event where the existing trend fails to maintain its rhythm.',
      'CHoCH indicates potential trend weakness, NOT a guaranteed trend reversal.',
      'Most lower-timeframe CHoCHs fail because they are simply internal pullbacks inside a higher-timeframe trend.',
      'High-quality CHoCHs occur after a major liquidity sweep and are backed by displacement.'
    ],
    keyTerms: [
      { term: 'Change of Character (CHoCH)', definition: 'The first structural break against the prevailing trend rhythm.' },
      { term: 'Bullish CHoCH', definition: 'In a downtrend, price breaks above the most recent lower high.' },
      { term: 'Bearish CHoCH', definition: 'In an uptrend, price breaks below the most recent higher low.' }
    ],
    practiceQuestions: [
      'Why is CHoCH better viewed as evidence of change rather than proof of reversal?',
      'Why do most 1-minute and 5-minute CHoCHs fail to reverse the Daily trend?',
      'What sequence of events elevates a CHoCH into a high-probability reversal?'
    ],
    sections: [
      {
        id: '10.1',
        title: '10.1 The Broken Rhythm',
        content: `Imagine listening to music: beat, beat, beat, beat... Suddenly the rhythm stutters. Has the song ended? No, but something changed.

In an uptrend, when price falls below the previous Higher Low for the first time, it creates a **Bearish CHoCH**. The market has stopped behaving like a healthy uptrend, alerting traders to a potential transition.`
      }
    ]
  },
  {
    id: 11,
    slug: 'market-structure-shift-mss',
    part: 'Part II - Price Structure',
    title: 'Market Structure Shift (MSS): Verified Directional Shift',
    quote: 'A Change of Character tells you something may have changed. A Market Structure Shift tells you the market has begun proving it.',
    level: 2,
    summary: [
      'MSS describes a confirmed structural transition supported by displacement and context.',
      'The classic reversal sequence: Liquidity Sweep -> Displacement -> MSS -> FVG -> Retracement -> Continuation.',
      'An MSS is a multi-step sequence, not a single candle.',
      'Scale matters: an internal 5M MSS provides an entry trigger into a 1H pullback, while a Daily MSS shifts macro bias.'
    ],
    keyTerms: [
      { term: 'Market Structure Shift (MSS)', definition: 'A decisive structural break accompanied by displacement that confirms directional control has transferred.' },
      { term: 'Structural Transition', definition: 'The process where one directional auction exhausts and yields to another.' },
      { term: 'Displacement Origin', definition: 'The base from which the aggressive momentum move launched.' }
    ],
    practiceQuestions: [
      'How does displacement elevate a structural break from a simple CHoCH to an MSS?',
      'Why is MSS best viewed as a sequence rather than an isolated candle?',
      'How do you handle an internal 5M MSS that opposes the Daily trend?'
    ],
    sections: [
      {
        id: '11.1',
        title: '11.1 The Complete MSS Sequence',
        content: `A high-quality MSS unfolds in a strict chronological sequence:
1. **Liquidity Taken:** Price sweeps an obvious BSL or SSL pool.
2. **Displacement Appears:** Large, energetic candles launch in the opposite direction.
3. **Structure Breaks:** Price decisively closes beyond a protected swing point.
4. **Inefficiency Created:** The displacement leaves behind an FVG or Order Block.
5. **Acceptance:** Price holds beyond the broken swing and begins retracing toward the newly formed imbalance.`
      }
    ]
  },
  {
    id: 13,
    slug: 'fair-value-gaps-and-ce',
    part: 'Part III - Price Delivery',
    title: 'Fair Value Gaps (FVG) & Consequent Encroachment',
    quote: 'A Fair Value Gap is not a magical zone. It is the footprint left behind when price moved faster than the auction could efficiently facilitate two-way trade.',
    level: 2,
    summary: [
      'An FVG is a 3-candle imbalance where Candle 1 and Candle 3 wicks do not overlap.',
      'Consequent Encroachment (CE) is the 50% midpoint of the gap, acting as a key balance reference.',
      'Unfilled FVGs in runaway trends indicate extreme directional strength, not a failure.',
      'Nested FVGs (5M inside 1H inside Daily) provide high-conviction multi-timeframe confluence.',
      'An FVG in Discount favors longs; an FVG in Premium favors shorts.'
    ],
    keyTerms: [
      { term: 'Fair Value Gap (FVG)', definition: 'The price zone between Candle 1 wick and Candle 3 wick left open by aggressive Candle 2 displacement.' },
      { term: 'Consequent Encroachment (CE)', definition: 'The 50% midpoint of a Fair Value Gap.' },
      { term: 'Partial Mitigation', definition: 'Price entering an FVG without reaching the 50% CE level.' },
      { term: 'Full Fill', definition: 'Price traversing the entire FVG from boundary to boundary.' }
    ],
    practiceQuestions: [
      'Why is an FVG better understood as a footprint of displacement rather than a standalone cause?',
      'Why do some FVGs fill immediately while others remain open for months?',
      'How does Consequent Encroachment (50%) help define precise entry limits?'
    ],
    sections: [
      {
        id: '13.1',
        title: '13.1 Anatomy of a Three-Candle Imbalance',
        content: `An FVG is identified using three adjacent candles:
- **Bullish FVG:** Candle 3 Low > Candle 1 High. (Gap = space between Candle 1 High and Candle 3 Low).
- **Bearish FVG:** Candle 3 High < Candle 1 Low. (Gap = space between Candle 1 Low and Candle 3 High).

The middle candle is the displacement candle that pushed price so rapidly that resting orders were bypassed.`
      },
      {
        id: '13.2',
        title: '13.2 Consequent Encroachment (50%) and Entry Depth',
        content: `Traders categorize FVG entries into three styles:
1. **Aggressive (First Touch):** Enter at the nearest boundary. Highest fill rate, slightly larger stop.
2. **Balanced (50% CE):** Enter at the exact midpoint. Optimal balance between fill rate and R:R.
3. **Deep (Far Edge):** Enter near the complete fill. Highest R:R, but many high-momentum trades will leave without filling.`
      }
    ]
  },
  {
    id: 14,
    slug: 'inverse-fair-value-gaps-ifvg',
    part: 'Part III - Price Delivery',
    title: 'Inverse Fair Value Gaps (IFVG): Role Reversal Imbalances',
    quote: 'An Inverse Fair Value Gap is not a new imbalance. It is an old imbalance whose role has changed.',
    level: 2,
    summary: [
      'An IFVG forms when a valid FVG fails to hold as support/resistance and is decisively traversed by displacement.',
      'A failed bullish FVG becomes a bearish resistance IFVG; a failed bearish FVG becomes a bullish support IFVG.',
      'The first retest of the violated FVG offers the highest probability IFVG setup.',
      'An IFVG is the imbalance equivalent of a Breaker Block.'
    ],
    keyTerms: [
      { term: 'Inverse Fair Value Gap (IFVG)', definition: 'A previously violated FVG that flips from support to resistance or resistance to support.' },
      { term: 'Failed Imbalance', definition: 'An FVG where price closes with full candle bodies through the opposing boundary.' },
      { term: 'Role Reversal', definition: 'The market phenomenon where broken support becomes resistance or broken resistance becomes support.' }
    ],
    practiceQuestions: [
      'What transforms a normal FVG into an IFVG?',
      'Why is a decisive candle body close through the FVG required before declaring an IFVG?',
      'How does an IFVG provide valuable information extracted from failed trades?'
    ],
    sections: [
      {
        id: '14.1',
        title: '14.1 The Role Reversal of Imbalance',
        content: `When buyers fail to defend an existing bullish FVG and price slices cleanly through it with strong bearish displacement, the market demonstrates that bullish demand has evaporated.

When price retraces back upward, that same box now serves as a **Bearish IFVG**, offering resistance for short trades targeting Sell Side Liquidity.`
      }
    ]
  },
  {
    id: 15,
    slug: 'order-blocks-and-mitigation',
    part: 'Part III - Price Delivery',
    title: 'Order Blocks (OB) & Mitigation',
    quote: 'An Order Block is not simply a candle. Its significance comes from what price does after that candle.',
    level: 2,
    summary: [
      'An Order Block is the last opposing candle before significant displacement that breaks structure.',
      'The subsequent move gives the candle its significance; without displacement, it is just a candle.',
      'Mitigation is the retracement of price back to the Order Block origin before continuation.',
      'Fresh, unmitigated Order Blocks carry significantly higher probability than repeatedly tested zones.',
      'Stops must go beyond the structural invalidation point (the sweep low/high), not just 1 tick outside the candle.'
    ],
    keyTerms: [
      { term: 'Bullish Order Block', definition: 'The last bearish candle before aggressive bullish displacement that breaks structure.' },
      { term: 'Bearish Order Block', definition: 'The last bullish candle before aggressive bearish displacement that breaks structure.' },
      { term: 'Mitigation', definition: 'Price revisiting an Order Block origin to manage positioning before continuing.' },
      { term: 'Fresh vs Mitigated', definition: 'Fresh = never revisited post-creation; Mitigated = price has already touched the zone.' }
    ],
    practiceQuestions: [
      'Why isn\'t every red candle before a green candle an Order Block?',
      'Why does displacement matter when identifying a genuine Order Block?',
      'What is the difference between marking the full candle range vs just the candle body?'
    ],
    sections: [
      {
        id: '15.1',
        title: '15.1 The True Definition of an Order Block',
        content: `In ICT methodology, an Order Block is identified by the **consequence of the move** that followed it:
1. **Before:** Liquidity is swept from an obvious high/low.
2. **During:** The final opposing candle forms.
3. **After:** Violent displacement erupts away from the candle.
4. **Result:** A meaningful market structure shift (MSS) occurs and an FVG is left behind.

The candle becomes a reference point for the origin of that institutional repricing.`
      }
    ]
  },
  {
    id: 16,
    slug: 'breaker-blocks',
    part: 'Part III - Price Delivery',
    title: 'Breaker Blocks: Trading Failed Order Blocks',
    quote: 'A Breaker is the market proving that a previous area of control has failed, then using that same area in the opposite direction.',
    level: 2,
    summary: [
      'A Breaker Block is a failed Order Block that led to a liquidity sweep before being violated.',
      'Bearish Breaker: A bullish Order Block that made a higher high (sweeping BSL) before failing and breaking lower.',
      'Bullish Breaker: A bearish Order Block that made a lower low (sweeping SSL) before failing and breaking higher.',
      'Breakers capitalize on trapped participants forced to exit at breakeven.'
    ],
    keyTerms: [
      { term: 'Breaker Block', definition: 'A failed Order Block that resulted in a liquidity sweep prior to structural failure.' },
      { term: 'Bearish Breaker', definition: 'A former support Order Block that fails and becomes resistance on retest.' },
      { term: 'Bullish Breaker', definition: 'A former resistance Order Block that fails and becomes support on retest.' },
      { term: 'Unicorn Model', definition: 'The high-probability confluence of an overlapping Breaker Block and Fair Value Gap.' }
    ],
    practiceQuestions: [
      'What separates a Breaker Block from a simple failed Order Block?',
      'Why is a liquidity sweep before the failure mandatory for a true Breaker?',
      'How does the concept of trapped traders explain the reaction at a Breaker?'
    ],
    sections: [
      {
        id: '16.1',
        title: '16.1 The Classic Breaker Sequence',
        content: `The complete Bearish Breaker sequence:
1. Market is bullish, making higher highs and higher lows.
2. A bullish Order Block forms at the higher low.
3. Price rallies from the OB and **sweeps Buy Side Liquidity (BSL)** at the peak.
4. Massive bearish displacement erupts, smashing straight through the bullish Order Block.
5. Bearish MSS is confirmed.
6. Price retraces back up to test the failed Order Block from underneath.
7. The old support zone acts as **Bearish Breaker resistance**.`
      }
    ]
  },
  {
    id: 18,
    slug: 'liquidity-engineering-and-runs',
    part: 'Part IV - Liquidity and Time',
    title: 'Liquidity Engineering & Liquidity Runs',
    quote: 'Price does not simply move from support to resistance. A major part of the ICT framework is understanding where liquidity is resting and what happens after it is taken.',
    level: 3,
    summary: [
      'Liquidity Engineering describes how market structure naturally encourages predictable order clustering.',
      'Equal Highs (EQH) and Equal Lows (EQL) create the most obvious liquidity pools.',
      'Previous Day High (PDH) and Previous Day Low (PDL) provide objective daily liquidity targets.',
      'A Liquidity Sweep is an event, not an entry signal; wait for displacement and MSS confirmation.'
    ],
    keyTerms: [
      { term: 'Liquidity Engineering', definition: 'The creation of visible support/resistance structures that induce clustered order placement.' },
      { term: 'Internal Range Liquidity (IRL)', definition: 'Liquidity pools residing inside the active dealing range.' },
      { term: 'External Range Liquidity (ERL)', definition: 'Liquidity pools residing beyond the major highs and lows of the dealing range.' },
      { term: 'Draw on Liquidity', definition: 'The primary destination liquidity pool price is hypothesized to seek.' }
    ],
    practiceQuestions: [
      'Why are equal highs stronger liquidity references than a random single high?',
      'What is the difference between Internal Range Liquidity and External Range Liquidity?',
      'Why shouldn\'t a trader mark every high and low as a major liquidity pool?'
    ],
    sections: [
      {
        id: '18.1',
        title: '18.1 The Intraday Liquidity Matrix',
        content: `Before each trading day, map your liquidity hierarchy:
- **Tier 1 (External):** Previous Week High (PWH) & Low (PWL), Monthly Highs/Lows.
- **Tier 2 (Daily):** Previous Day High (PDH), Previous Day Low (PDL), Daily Open.
- **Tier 3 (Session):** Asian High & Low, London High & Low.
- **Tier 4 (Internal):** 15M/5M Equal Highs, Equal Lows, and dealing range midpoints.`
      }
    ]
  },
  {
    id: 19,
    slug: 'time-and-session-liquidity',
    part: 'Part IV - Liquidity and Time',
    title: 'Time & Session Liquidity: The Global Clock',
    quote: 'Price is not only about where. It is also about when.',
    level: 3,
    summary: [
      'Time is an algorithmic filter; identical setups perform differently inside vs outside killzones.',
      'All ICT timing is synchronized to New York Local Time (Eastern Time).',
      'The Judas Swing is an intentional early session manipulation move into liquidity before true expansion.',
      '8:30 AM economic releases and 9:30 AM US Cash Equity Open are major volatility catalysts.'
    ],
    keyTerms: [
      { term: 'Killzone', definition: 'Specific high-probability algorithmic trading windows (London, NY AM, NY PM).' },
      { term: 'Judas Swing', definition: 'A false directional move at session open that raids liquidity before reversing.' },
      { term: 'Asian Range', definition: 'The initial consolidation range formed during Asian trading hours (8 PM - midnight NY).' }
    ],
    practiceQuestions: [
      'Why is New York time the universal reference for ICT session timing?',
      'How does the London session interact with the Asian range?',
      'Why should you never treat an 8:30 AM news release setup as if it exists in a vacuum?'
    ],
    sections: [
      {
        id: '19.1',
        title: '19.1 The Session Trilogy',
        content: `The 24-hour market operates as a continuous conversation:
- **Asia (Consolidation):** Builds the base range and establishes initial liquidity boundaries.
- **London (Manipulation / Expansion):** Sweeps Asian high/low (Judas Swing) or establishes the Low/High of the Day.
- **New York (Distribution / Reversal / Continuation):** Ingests US economic data, re-prices at 9:30 AM Equity Open, and delivers toward HTF Draw.`
      }
    ]
  },
  {
    id: 20,
    slug: 'weekly-profiles-and-five-day-delivery',
    part: 'Part IV - Liquidity and Time',
    title: 'The Weekly Profile & Five-Day Delivery Model',
    quote: 'A trader who only understands today\'s chart is missing half the story. Before you ask where price is going today, ask what the week is trying to accomplish.',
    level: 3,
    summary: [
      'A Weekly Profile describes recurring ways a 5-day trading week develops.',
      'Tuesday Low/High of the Week is the most common weekly profile template.',
      'Wednesday frequently provides midweek reversals or explosive trend continuation.',
      'Seek and Destroy is a hostile environment of alternating whipsaws occurring ahead of major news.'
    ],
    keyTerms: [
      { term: 'Weekly Profile', definition: 'The multi-day price delivery shape connecting Monday through Friday.' },
      { term: 'Tuesday Low of the Week', definition: 'A bullish weekly template where Monday consolidates, Tuesday raids Monday low, and the rest of the week expands higher.' },
      { term: 'Seek and Destroy', definition: 'A market condition where price repeatedly sweeps both highs and lows without directional follow-through.' }
    ],
    practiceQuestions: [
      'Why is Tuesday frequently the day that forms the high or low of the week?',
      'How do you identify a Seek and Destroy environment early to protect capital?',
      'Why should weekly profiles be treated conditionally rather than as rigid forecasts?'
    ],
    sections: [
      {
        id: '20.1',
        title: '20.1 The Five-Day Story',
        content: `Think of the trading week as one cohesive delivery cycle:
- **Monday:** Establishes initial range and tests Weekly Open.
- **Tuesday:** Creates manipulation raid (Classic Tuesday Low/High).
- **Wednesday:** Midweek expansion or major structural reversal.
- **Thursday:** Trend continuation or Thursday reversal into HTF array.
- **Friday:** Final weekly delivery into external liquidity or NFP volatility.`
      }
    ]
  },
  {
    id: 21,
    slug: 'daily-profiles-and-power-of-three',
    part: 'Part IV - Liquidity and Time',
    title: 'Daily Profiles & Intraday Power of Three (PO3)',
    quote: 'Markets frequently transition from a period of range formation into a liquidity event and then into directional expansion.',
    level: 4,
    summary: [
      'Power of Three (AMD) describes Accumulation, Manipulation, and Distribution.',
      'The Daily Open is the crucial benchmark for identifying manipulation above or below open.',
      'In a Bullish Day: Price opens, moves below open (manipulation), expands higher (distribution), closes high.',
      'In a Bearish Day: Price opens, moves above open (manipulation), expands lower (distribution), closes low.'
    ],
    keyTerms: [
      { term: 'Accumulation (Phase 1)', definition: 'The initial range or consolidation where liquidity builds.' },
      { term: 'Manipulation (Phase 2)', definition: 'The deceptive move across the Daily Open into liquidity pools.' },
      { term: 'Distribution (Phase 3)', definition: 'The sustained directional expansion toward the target objective.' }
    ],
    practiceQuestions: [
      'How does the Daily Open act as a contextual anchor for AMD?',
      'Why does buying below the Daily Open offer superior discount pricing for bullish days?',
      'What separates a failed AMD attempt from a genuine PO3 expansion?'
    ],
    sections: [
      {
        id: '21.1',
        title: '21.1 Intraday Power of Three',
        content: `Every single daily candlestick tells a Power of Three story:
- **Open:** The day begins.
- **Low:** Formed during the manipulation phase below the open (London Open / Judas Swing).
- **High:** Formed at the climax of the distribution phase (New York Session).
- **Close:** The final settlement near the high of the day.`
      }
    ]
  },
  {
    id: 22,
    slug: 'the-complete-top-down-model',
    part: 'Part IV - Time Based Delivery',
    title: 'The Complete ICT Top-Down Model & Execution Blueprint',
    quote: 'Don\'t think Weekly + Daily + 1H + 15M + 5M = more confirmation. Think: each timeframe has a different job.',
    level: 5,
    summary: [
      'Higher timeframes (Monthly/Weekly) provide context and the primary Draw on Liquidity.',
      'Middle timeframes (Daily/4H/1H) provide location and dealing range Premium/Discount.',
      'Lower timeframes (15M/5M/1M) provide execution triggers: Sweep -> Displacement -> MSS -> FVG.',
      'Never enter an FVG without knowing what liquidity was swept beforehand and what the target is.'
    ],
    keyTerms: [
      { term: 'Top-Down Analysis', definition: 'The hierarchical workflow of cascading context from Monthly down to 1-minute execution.' },
      { term: 'Narrative Alignment', definition: 'When multiple timeframes tell a compatible story (e.g. 5M pullback into 1H FVG inside Daily discount).' },
      { term: 'Execution Funnel', definition: 'Filtering out 95% of market noise to take only high-probability aligned setups.' }
    ],
    practiceQuestions: [
      'Which timeframe controls which part of a trade?',
      'What should you do when 5-minute structure conflicts with the Daily trend?',
      'Why is "no trade" one of the most profitable decisions in top-down analysis?'
    ],
    sections: [
      {
        id: '22.1',
        title: '22.1 The Master 9-Question Checklist',
        content: `Before executing any trade, answer these 9 questions:
1. **Weekly:** Where is the larger draw on liquidity?
2. **Daily:** Are we in Premium or Discount of the active dealing range?
3. **Daily:** Where is the Daily Open, PDH, and PDL?
4. **Session:** Which session is active and what liquidity is nearby?
5. **Liquidity Event:** Did price sweep a meaningful high or low?
6. **Displacement:** Did aggressive repricing occur with strong candle bodies?
7. **Structure:** Did price produce a clean Market Structure Shift (MSS)?
8. **Entry:** Is there a fresh FVG or Order Block with defined structural invalidation?
9. **Target:** Does the target liquidity offer at least 2:1 to 3:1 Reward-to-Risk?`
      }
    ]
  },
  {
    id: 23,
    slug: 'trader-abdullah-masood-masterclass',
    part: 'Special Mentorship Track - Practical Field Guide',
    title: 'Trader Abdullah Masood: The Gold Legacy & Daily Bias Masterclass',
    quote: 'Trade what you see, not what you think. Daily Bias is not a guess—it is a mechanical sequence of Previous Day High/Low sweeps, Midnight Open benchmarks, and high-timeframe liquidity draws.',
    level: 5,
    summary: [
      'Special tribute chapter dedicated to the deep teachings of Trader Abdullah Masood (@TraderAbdullahMasood).',
      'The 4-Pillar Daily Bias Engine: PDH/PDL, 00:00 NY Midnight Open, London Open price, and IPDA 20/40/60-day Draw on Liquidity.',
      'The Gold Legacy (XAUUSD): Gold is algorithmic, highly volatile, and purposefully sweeps the Asian Range to trap retail breakout traders.',
      'Inducement (IDM) Mechanics: Why 80% of retail SMC order blocks fail due to entering before internal liquidity is purged.',
      'NASDAQ (NQ) 09:30 AM Opening Bell Execution & SMT Divergence across indices.',
      'Psychological and Execution Discipline: Trade only inside high-probability Killzones with a fixed 1% risk rule.'
    ],
    keyTerms: [
      { term: 'Trader Abdullah Masood', definition: 'Global educator and founder of The Godfather\'s Sanctum, recognized for mastering and teaching ICT/SMC, Gold Legacy, and Daily Bias.' },
      { term: 'The Gold Legacy', definition: 'The specialized SMC execution methodology for XAUUSD emphasizing Asian range sweeps, Judas swings, and 50% FVG mitigation.' },
      { term: '4-Pillar Daily Bias', definition: 'Abdullah Masood\'s mechanical model combining PDH/PDL, Midnight Open (00:00 NY), London Open, and HTF Draw on Liquidity.' },
      { term: 'Inducement (IDM)', definition: 'The first minor internal pullback designed by the algorithm to induce early retail orders before sweeping into the true institutional POI.' },
      { term: 'Midnight Open Benchmark', definition: 'The price at 00:00 NY time; serves as the true baseline for determining intraday Premium (expensive) vs Discount (cheap).' }
    ],
    practiceQuestions: [
      'Why is buying below the 00:00 NY Midnight Open mathematically advantageous on a bullish daily bias day?',
      'How does Gold (XAUUSD) differ in liquidity sweep characteristics compared to major forex pairs like EUR/USD?',
      'What is an Inducement (IDM) trap, and why should you avoid the first order block created after a structure shift until IDM is taken?',
      'How do you confirm whether a Daily Candle is likely to be an Expansion Day versus a Consolidation Day?'
    ],
    sections: [
      {
        id: '23.1',
        title: '23.1 The 4-Pillar Daily Bias Engine',
        content: `Many traders struggle with Daily Bias because they change their bias on every 1-minute or 5-minute candle. In the teachings of **Trader Abdullah Masood**, Daily Bias is framed through a strict 4-pillar institutional structure:

### 1. High Timeframe Draw on Liquidity (DOL)
Always establish where the Daily / 4-Hour chart is reaching. Is price magnetically drawn to an old Weekly High (Buy Side Liquidity) or a Daily Fair Value Gap (Imbalance)? Until this target is filled, your higher-timeframe directional bias remains intact.

### 2. Previous Day High (PDH) & Previous Day Low (PDL)
The extremes of yesterday's candle hold the highest density of resting stop orders. An expansion day typically:
- Sweeps the **PDL** early in the London/NY session, rejects sharply, and then accelerates upward to target the **PDH** (Bullish Day).
- Sweeps the **PDH** early in London/NY, rejects, and accelerates downward toward the **PDL** (Bearish Day).

### 3. The 00:00 NY Midnight Open Benchmark
The Midnight Open is the true institutional line in the sand:
- **Bullish Bias:** Look to execute buy setups when price trades **BELOW** the Midnight Open (accumulating at a Discount).
- **Bearish Bias:** Look to execute sell setups when price trades **ABOVE** the Midnight Open (distributing at a Premium).

### 4. Asian Range Expansion (20:00 - 00:00 NY)
The Asian session builds liquidity on both sides. A classic London Judas swing will break out of the Asian Range in the *opposite* direction of the true daily bias to trigger stop runs before reversing.`
      },
      {
        id: '23.2',
        title: '23.2 The Gold Legacy: XAUUSD Precision SMC',
        content: `Gold (XAUUSD) is one of the most profitable yet aggressive instruments in global financial markets. As taught in **The Gold Legacy Mentorship** by Abdullah Masood, Gold has unique characteristics that every SMC trader must respect:

- **Deep Asian Sweeps:** Unlike EUR/USD which may respect tight ranges, Gold routinely sweeps both Asian High and Asian Low by 15-30 pips before establishing the true London trend.
- **The Judas Swing:** Between 02:00 AM and 04:00 AM NY (London Killzone), expect an aggressive fake breakout against the daily bias.
- **The 50% Consequent Encroachment Rule:** When Gold prints a 5-minute or 15-minute Fair Value Gap, limit entries at the 50% CE (midpoint) offer the tightest invalidation and highest Reward-to-Risk ratio.
- **News Delivery (CPI, FOMC, NFP):** Never gamble ahead of high-impact releases. Wait for the initial 15-minute liquidity injection to sweep both sides, mark the newly formed Displacement and FVG, and trade the retracement into the structural POI.`
      },
      {
        id: '23.3',
        title: '23.3 Inducement (IDM) vs Genuine Structural POIs',
        content: `The single biggest reason retail SMC traders lose money is failing to understand **Inducement (IDM)**. 

### What is Inducement?
When a Market Structure Shift occurs, price creates a series of minor internal swings. The very first internal pullback is engineered by algorithms to entice impatient traders into buying the "first order block" they see. 

### The Golden Rule of Inducement:
1. **Never buy at the first internal Order Block.**
2. Wait for price to sweep the **Inducement Low (IDM)** where retail stop losses have gathered.
3. Once the Inducement is swept into an **Extreme Order Block** or **Decisional FVG**, that is where institutional Smart Money enters.`
      },
      {
        id: '23.4',
        title: '23.4 Appreciation & YouTube Mentorship Resources',
        content: `Every trader seeking to advance from theoretical drawings to live-market precision should study the complete library of over 800+ educational videos, daily live analyses, and mentorship series on **Trader Abdullah Masood's YouTube channel**:

- **Official Channel:** [https://www.youtube.com/@TraderAbdullahMasood](https://www.youtube.com/@TraderAbdullahMasood)
- **Recommended Playlists to Study:**
  - *2025 / 2026 ICT Daily Bias Mentorship*
  - *The Gold Legacy - SMC Mentorship*
  - *Daily Live Gold & NASDAQ Analysis*
  - *Beginner to Advanced ICT Trading Roadmap*

*Special thanks and highest appreciation to Trader Abdullah Masood for his tireless work, clarity, and generosity in elevating traders worldwide.*`
      }
    ]
  }
];

