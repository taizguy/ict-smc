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
        content: `Ask almost any beginner: "Why did Bitcoin go up?"

The answer is usually: "Because there were more buyers than sellers."

This sounds logical, but it is fundamentally incomplete. In every single trade in financial history, there is always:
- One buyer.
- One seller.
- Always. Not sometimes. Always.

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

Did apples become 30% more valuable in one minute? No. The cheapest available supply disappeared.

Financial markets work the exact same way. The exchange maintains an Order Book with two sides:
1. Asks (Sellers): Waiting at progressively higher prices.
2. Bids (Buyers): Waiting at progressively lower prices.`
      },
      {
        id: '1.3',
        title: '1.3 Aggression Moves Price',
        content: `Everything in every market begins with two basic order types:

- Market Order (Aggressive): "I don't care about price, fill my order immediately." Market orders consume liquidity.
- Limit Order (Passive): "I will buy only at this price or better." Limit orders provide liquidity.

When an institutional fund wants to buy 5,000 BTC, they cannot simply click "Buy Market" without driving the execution price drastically higher (known as Market Impact or Slippage).

This explains why large institutions require concentrated pools of resting orders—which ICT refers to as Liquidity Pools—to enter and exit their positions.`
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
        content: `One of the biggest misconceptions beginners have is: "The exchange decides the price."

It doesn't. The exchange has one job: match buyers and sellers according to predefined rules. It doesn't buy, sell, or predict the future. It simply executes:
- A buyer wants to buy at X.
- A seller is willing to sell at X.
- Their prices match -> Execute trade.`
      },
      {
        id: '2.2',
        title: '2.2 Price-Time Priority and Crossing the Spread',
        content: `Exchanges match orders according to two strict rules:
1. Rule 1 (Price Priority): Better prices get executed first. The cheapest seller and highest buyer always take precedence.
2. Rule 2 (Time Priority): If two traders offer the same price, the earlier order gets filled first.

Between the Best Bid and Best Ask exists a gap called The Spread. Passive traders wait on either side of the spread. Aggressive traders cross the spread and demand execution now. It is this urgency that creates price velocity.`
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

To someone watching the chart, price appears to have "jumped" $9 in a millisecond. In reality, it simply cleared a liquidity vacuum. This mechanical reality is the exact engine behind Fair Value Gaps and Displacement.`
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
        content: `A single candlestick tells you four historical facts: Open, High, Low, and Close. It does not tell you how it happened.

Think of a soccer scoreboard: Team A 3, Team B 1. You know the score, but not who dominated possession or how the goals were scored. Candlesticks are the scoreboard; the order book is the game.`
      },
      {
        id: '3.2',
        title: '3.2 Icebergs, Algorithms, and Absorption',
        content: `Large institutions use execution algorithms to enter positions over hours or days without moving the market against themselves:
- TWAP (Time-Weighted Average Price): Slices large orders into small fractions executed at regular time intervals.
- VWAP (Volume-Weighted Average Price): Adjusts execution speed based on market trading volume.
- Iceberg Orders: Displays only 10 BTC visible while 1,000 BTC sits behind it. Every time 10 BTC is bought, another 10 BTC instantly refills.

When aggressive buyers hit an iceberg seller, volume spikes but price refuses to rise. This is Absorption—the precursor to failed breakouts and Order Blocks.`
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
1. Economics / Finance: How easily an asset can be converted to cash (Cash > Bitcoin > Real Estate).
2. Market Microstructure: How many resting limit orders exist in the order book right now.
3. ICT / SMC Framework: Concentrations of future conditional orders (stop-losses, breakout stops) clustered around visible swing highs, swing lows, and session extremes.

Understanding this distinction eliminates 90% of useless online arguments.`
      },
      {
        id: '4.2',
        title: '4.2 Why Equal Highs and Obvious Lows Attract Price',
        content: `When thousands of traders look at the same chart and see a double top ("resistance"), retail traders short and place stop losses directly above it. Breakout traders place buy stop-entry orders above it.

Now think: what happens when price touches that level?
- Short stop-losses trigger -> BUY orders
- Breakout entries trigger -> BUY orders

Both order types are BUY orders! This pool of buying volume provides the exact counterparty volume required for large institutions to fill massive sell orders or exit long positions.`
      },
      {
        id: '4.3',
        title: '4.3 Liquidity Sweep vs Liquidity Run',
        content: `When price pierces a liquidity level, two distinct behaviors can occur:
- Liquidity Sweep: Price breaches the level, consumes the stop orders, and immediately reverses with displacement, closing back inside the range.
- Liquidity Run: Price trades through the level, closes beyond it, and continues expanding toward a higher-timeframe objective.

The Golden Rule: A sweep is an event, not an automatic entry signal. The reaction and market structure shift after the sweep give it meaning.`
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
        content: `Displacement is not just a "big candle". It is evidence of abnormal expansion where aggressive market orders completely overwhelm resting liquidity across multiple price tiers.

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

When price surpasses the previous Higher High with decisive momentum, it produces a Bullish BOS. The existing auction has proven that buyers remain in structural control.`
      },
      {
        id: '9.2',
        title: '9.2 The Five-Dimension Evaluation Framework',
        content: `Evaluate every structural break across five dimensions:
1. Scale: Which timeframe and which level of structure broke?
2. Strength: Was there real displacement or only a hesitant 1-tick breach?
3. Acceptance: Did price close and hold beyond the level?
4. Context: Where did this occur relative to the higher-timeframe dealing range?
5. Purpose: Was the move continuing a trend or sweeping liquidity?`
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

In an uptrend, when price falls below the previous Higher Low for the first time, it creates a Bearish CHoCH. The market has stopped behaving like a healthy uptrend, alerting traders to a potential transition.`
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
1. Liquidity Taken: Price sweeps an obvious BSL or SSL pool.
2. Displacement Appears: Large, energetic candles launch in the opposite direction.
3. Structure Breaks: Price decisively closes beyond a protected swing point.
4. Inefficiency Created: The displacement leaves behind an FVG or Order Block.
5. Acceptance: Price holds beyond the broken swing and begins retracing toward the newly formed imbalance.`
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
- Bullish FVG: Candle 3 Low > Candle 1 High. (Gap = space between Candle 1 High and Candle 3 Low).
- Bearish FVG: Candle 3 High < Candle 1 Low. (Gap = space between Candle 1 Low and Candle 3 High).

The middle candle is the displacement candle that pushed price so rapidly that resting orders were bypassed.`
      },
      {
        id: '13.2',
        title: '13.2 Consequent Encroachment (50%) and Entry Depth',
        content: `Traders categorize FVG entries into three styles:
1. Aggressive (First Touch): Enter at the nearest boundary. Highest fill rate, slightly larger stop.
2. Balanced (50% CE): Enter at the exact midpoint. Optimal balance between fill rate and R:R.
3. Deep (Far Edge): Enter near the complete fill. Highest R:R, but many high-momentum trades will leave without filling.`
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

When price retraces back upward, that same box now serves as a Bearish IFVG, offering resistance for short trades targeting Sell Side Liquidity.`
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
        content: `In ICT methodology, an Order Block is identified by the consequence of the move that followed it:
1. Before: Liquidity is swept from an obvious high/low.
2. During: The final opposing candle forms.
3. After: Violent displacement erupts away from the candle.
4. Result: A meaningful market structure shift (MSS) occurs and an FVG is left behind.

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
3. Price rallies from the OB and sweeps Buy Side Liquidity (BSL) at the peak.
4. Massive bearish displacement erupts, smashing straight through the bullish Order Block.
5. Bearish MSS is confirmed.
6. Price retraces back up to test the failed Order Block from underneath.
7. The old support zone acts as Bearish Breaker resistance.`
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
- Tier 1 (External): Previous Week High (PWH) & Low (PWL), Monthly Highs/Lows.
- Tier 2 (Daily): Previous Day High (PDH), Previous Day Low (PDL), Daily Open.
- Tier 3 (Session): Asian High & Low, London High & Low.
- Tier 4 (Internal): 15M/5M Equal Highs, Equal Lows, and dealing range midpoints.`
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
- Asia (Consolidation): Builds the base range and establishes initial liquidity boundaries.
- London (Manipulation / Expansion): Sweeps Asian high/low (Judas Swing) or establishes the Low/High of the Day.
- New York (Distribution / Reversal / Continuation): Ingests US economic data, re-prices at 9:30 AM Equity Open, and delivers toward HTF Draw.`
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
- Monday: Establishes initial range and tests Weekly Open.
- Tuesday: Creates manipulation raid (Classic Tuesday Low/High).
- Wednesday: Midweek expansion or major structural reversal.
- Thursday: Trend continuation or Thursday reversal into HTF array.
- Friday: Final weekly delivery into external liquidity or NFP volatility.`
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
- Open: The day begins.
- Low: Formed during the manipulation phase below the open (London Open / Judas Swing).
- High: Formed at the climax of the distribution phase (New York Session).
- Close: The final settlement near the high of the day.`
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
1. Weekly: Where is the larger draw on liquidity?
2. Daily: Are we in Premium or Discount of the active dealing range?
3. Daily: Where is the Daily Open, PDH, and PDL?
4. Session: Which session is active and what liquidity is nearby?
5. Liquidity Event: Did price sweep a meaningful high or low?
6. Displacement: Did aggressive repricing occur with strong candle bodies?
7. Structure: Did price produce a clean Market Structure Shift (MSS)?
8. Entry: Is there a fresh FVG or Order Block with defined structural invalidation?
9. Target: Does the target liquidity offer at least 2:1 to 3:1 Reward-to-Risk?`
      },
      {
        id: '22.2',
        title: '22.2 Mapping Top-Down Analysis to the 13 ICT Charter Price Action Models',
        content: `The top-down analysis funnel is not an abstract theory—it directly selects which of the 13 ICT Charter Price Action Models should be deployed for the session or week:

1. Macro & Position Horizons (Monthly & Weekly Foundation):
- Charter Model 4 (Position Trading): Analyzes the 90-day Quarterly Shifts and 6-month IPDA range to hold for 300 to 1,000+ pips.
- Charter Model 3 (Swing Trading): Uses Commercial COT hedging and Open Interest to capture 100 to 300-pip intermediate swings.

2. Weekly Execution & Compounding (Daily Timeframe Context):
- Charter Model 2 (Weekly Range Expansion): Harnesses the classic Tuesday Low/High profile to ride the 50-100 pip weekly expansion.
- Charter Model 8 (Precision Compounding): Extracts a single high-conviction 25-pip capture per week with strict 15-pip risk.
- Charter Model 9 (One Shot One Kill - OSOK): Patiently waits for Internal Range Liquidity rebalancing to ride expansions to major External Range Liquidity.

3. Intraday & Scalping Horizons (Session Execution):
- Charter Model 5 (Session Day Trading): Trades London Judas manipulation and New York Open trend continuations (40-60 pips).
- Charter Model 1 (Intraday Scalping): Employs the 20-day IPDA lookback and Optimal Trade Entry (OTE) for 10-30 pip New York scalps.
- Charter Model 10, 11 & 12: Focuses on 50% Equilibrium Dealing Ranges, Daily 60-minute rebalances, and Order Block / FVG synergy.
- Charter Model 13 (The 2022 Mentorship Model): The universal intraday execution blueprint utilizing session liquidity sweeps, full-body displacement MSS, and 50% Consequent Encroachment FVG entries.`
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
        content: `Many traders struggle with Daily Bias because they change their bias on every 1-minute or 5-minute candle. In the teachings of Trader Abdullah Masood, Daily Bias is framed through a strict 4-pillar institutional structure:

Pillar 1: High Timeframe Draw on Liquidity (DOL)
Always establish where the Daily / 4-Hour chart is reaching. Is price magnetically drawn to an old Weekly High (Buy Side Liquidity) or a Daily Fair Value Gap (Imbalance)? Until this target is filled, your higher-timeframe directional bias remains intact.

Pillar 2: Previous Day High (PDH) & Previous Day Low (PDL)
The extremes of yesterday's candle hold the highest density of resting stop orders. An expansion day typically:
- Sweeps the PDL early in the London/NY session, rejects sharply, and then accelerates upward to target the PDH (Bullish Day).
- Sweeps the PDH early in London/NY, rejects, and accelerates downward toward the PDL (Bearish Day).

Pillar 3: The 00:00 NY Midnight Open Benchmark
The Midnight Open is the true institutional line in the sand:
- Bullish Bias: Look to execute buy setups when price trades BELOW the Midnight Open (accumulating at a Discount).
- Bearish Bias: Look to execute sell setups when price trades ABOVE the Midnight Open (distributing at a Premium).

Pillar 4: Asian Range Expansion (20:00 - 00:00 NY)
The Asian session builds liquidity on both sides. A classic London Judas swing will break out of the Asian Range in the opposite direction of the true daily bias to trigger stop runs before reversing.`
      },
      {
        id: '23.2',
        title: '23.2 The Gold Legacy: XAUUSD Precision SMC',
        content: `Gold (XAUUSD) is one of the most profitable yet aggressive instruments in global financial markets. As taught in The Gold Legacy Mentorship by Abdullah Masood, Gold has unique characteristics that every SMC trader must respect:

- Deep Asian Sweeps: Unlike EUR/USD which may respect tight ranges, Gold routinely sweeps both Asian High and Asian Low by 15-30 pips before establishing the true London trend.
- The Judas Swing: Between 02:00 AM and 04:00 AM NY (London Killzone), expect an aggressive fake breakout against the daily bias.
- The 50% Consequent Encroachment Rule: When Gold prints a 5-minute or 15-minute Fair Value Gap, limit entries at the 50% CE (midpoint) offer the tightest invalidation and highest Reward-to-Risk ratio.
- News Delivery (CPI, FOMC, NFP): Never gamble ahead of high-impact releases. Wait for the initial 15-minute liquidity injection to sweep both sides, mark the newly formed Displacement and FVG, and trade the retracement into the structural POI.`
      },
      {
        id: '23.3',
        title: '23.3 Inducement (IDM) vs Genuine Structural POIs',
        content: `The single biggest reason retail SMC traders lose money is failing to understand Inducement (IDM). 

What is Inducement?
When a Market Structure Shift occurs, price creates a series of minor internal swings. The very first internal pullback is engineered by algorithms to entice impatient traders into buying the "first order block" they see. 

The Golden Rule of Inducement:
1. Never buy at the first internal Order Block.
2. Wait for price to sweep the Inducement Low (IDM) where retail stop losses have gathered.
3. Once the Inducement is swept into an Extreme Order Block or Decisional FVG, that is where institutional Smart Money enters.`
      },
      {
        id: '23.4',
        title: '23.4 Appreciation & YouTube Mentorship Resources',
        content: `Every trader seeking to advance from theoretical drawings to live-market precision should study the complete library of over 800+ educational videos, daily live analyses, and mentorship series on Trader Abdullah Masood's YouTube channel:

- Official Channel: [https://www.youtube.com/@TraderAbdullahMasood](https://www.youtube.com/@TraderAbdullahMasood)
- Recommended Playlists to Study:
  - 2025 / 2026 ICT Daily Bias Mentorship
  - The Gold Legacy - SMC Mentorship
  - Daily Live Gold & NASDAQ Analysis
  - Beginner to Advanced ICT Trading Roadmap

Special thanks and highest appreciation to Trader Abdullah Masood for his tireless work, clarity, and generosity in elevating traders worldwide.`
      }
    ]
  },
  {
    id: 24,
    slug: 'opening-range-theory-and-gaps',
    title: 'ICT 2025 Mentorship: Opening Range Theory (ORT) & Opening Range Gaps',
    part: 'Part IX - ICT 2025 Official Mentorship Curriculum',
    level: 3,
    quote: 'The 09:30 AM New York opening bell is not an arbitrary clock tick. Over 70% of the daily high or low is established within the first 30 to 60 minutes of the session.',
    summary: [
      'The exact institutional mechanics of the Opening Range Gap (ORG) and 09:30 AM Equity Open.',
      'Why the market establishes its extreme within the opening 30 minutes in over 70% of sample trading days.',
      'The relationship between the 16:15 / 17:00 previous daily close and the 09:30 AM true delivery print.',
      'How the algorithm treats the ORG as a high-probability magnet before initiating the true session trend.'
    ],
    keyTerms: [
      { term: 'Opening Range Theory (ORT)', definition: 'The algorithmic study of how the 09:30 AM to 10:00 AM New York opening interval creates the session high or low.' },
      { term: 'Opening Range Gap (ORG)', definition: 'The physical price differential between the previous settlement close and the 09:30 AM open.' },
      { term: 'True Day Open', definition: 'The 00:00 AM NY Midnight Open and 09:30 AM NY Equity Open used to evaluate Premium vs Discount pricing.' }
    ],
    practiceQuestions: [
      'What percentage of trading days establish their high or low between 09:30 AM and 10:30 AM?',
      'How does the 50% Consequent Encroachment of the Opening Range Gap function algorithmically?',
      'What is the difference between an initial opening raid and true session displacement?'
    ],
    sections: [
      {
        id: '24.1',
        title: '24.1 The 09:30 AM Opening Range Theory',
        content: `In the 2024 and 2025 Mentorship lectures, Michael J. Huddleston established that retail traders fail at the opening bell because they react to the immediate direction of the 09:30 candle. 

Empirical research across S&P 500 (ES) and Nasdaq 100 (NQ) futures proves that the High or the Low of the entire New York session forms between 09:30 AM and 10:30 AM Eastern Time in over 70% of all trading days.

The Algorithmic Sequence of the Opening Range:
1. 09:30 AM Open: Large institutional orders and market maker adjustments inject initial volatility.
2. The Opening Raid: Price aggressively pushes into Buy Side Liquidity (BSL) or Sell Side Liquidity (SSL) resting from the Asian and London sessions.
3. The Session Extreme Formation: Once resting stops are absorbed, the algorithmic program shifts state. The extreme established during this 30-minute window becomes the protected anchor for the day.
4. The 09:50 AM Macro Window: Between 09:50 AM and 10:10 AM, price aligns with the true Draw on Liquidity (DOL) and delivers sustained expansion.`
      },
      {
        id: '24.2',
        title: '24.2 The Opening Range Gap (ORG) as a Delivery Magnet',
        content: `The Opening Range Gap (ORG) represents the un-auctioned space between the previous session close (16:15 or 17:00 Eastern) and the official 09:30 AM cash market open.

Key Principles of the ORG:
- Magnet Effect: An open gap between yesterday's settlement and today's 09:30 open is an imbalance in continuous institutional book keeping. The algorithm frequently seeks to re-auction into this gap before expanding.
- Gap Rejection vs Gap Through: If price trades into the ORG and immediately displaces away leaving a Fair Value Gap, it confirms strong institutional intent in the direction of the displacement.
- Consequent Encroachment of the ORG: The 50% midpoint of the Opening Range Gap functions as algorithmic support or resistance. A failure of candle bodies to close beyond the 50% CE confirms institutional respect.`
      }
    ]
  },
  {
    id: 25,
    slug: 'first-presented-fvg-and-algorithmic-macros',
    title: 'ICT 2025 Mentorship: The 1st Presented FVG & Algorithmic Macros',
    part: 'Part IX - ICT 2025 Official Mentorship Curriculum',
    level: 3,
    quote: 'Do not chase every gap on your chart. The 1st Presented FVG after the open or economic driver carries the algorithm’s true intention.',
    summary: [
      'The definitive 1st Presented FVG rule introduced in the 2024 and 2025 mentorship lectures.',
      'Why the initial gap formed between 09:31 AM and 09:35 AM overrides secondary, lagging imbalances.',
      'The complete institutional schedule of 20-minute ICT Macro Windows across London and New York.',
      'How to synchronize high-probability limit entries with the 09:50-10:10 AM and 10:50-11:10 AM macro cycles.'
    ],
    keyTerms: [
      { term: '1st Presented FVG', definition: 'The initial 3-candle Fair Value Gap printed following market open displacement or an economic data release.' },
      { term: 'Algorithmic Macro Window', definition: 'A recurring 20-minute timeframe during which the algorithm programmatically seeks resting liquidity or rebalances imbalances.' },
      { term: 'Silver Bullet Macro', definition: 'The 10:00 AM to 11:00 AM NY delivery cycle featuring the 09:50 to 10:10 AM macro entry window.' }
    ],
    practiceQuestions: [
      'Why does the 1st Presented FVG take precedence over later secondary imbalances?',
      'What are the key execution hours of the 09:50 AM - 10:10 AM New York macro?',
      'How should a trader handle market conditions if no FVG presents in the opening 15 minutes?'
    ],
    sections: [
      {
        id: '25.1',
        title: '25.1 The 1st Presented FVG (The 09:31 Rule)',
        content: `A cornerstone breakthrough in the ICT 2024 and 2025 Mentorship is the hierarchy of Fair Value Gaps. Beginners often complain that "there are too many FVGs on the 1-minute and 5-minute chart."

ICT answers this with the 1st Presented FVG Principle:
When the market opens at 09:30 AM NY (or immediately following an 08:30 AM high-impact news injection like CPI or NFP), the Interbank Price Delivery Algorithm creates an energetic displacement.

The very first 3-candle imbalance left behind (frequently appearing at 09:31, 09:32, or 09:35 AM) is designated as the 1st Presented FVG.

Why the 1st Presented FVG is Superior:
1. Pure Institutional Signature: It contains the freshest institutional repricing from cash open participation.
2. High-Resistance Liquidity Filter: Unlike secondary FVGs that appear late in an extended run, the 1st Presented FVG forms while retail is still disoriented.
3. Invalidation Precision: If price retraces to this 1st Presented FVG, its low (for longs) or high (for shorts) provides a mathematically crisp invalidation level.`
      },
      {
        id: '25.2',
        title: '25.2 The Master Schedule of Algorithmic Macro Windows',
        content: `The algorithm operates on strict temporal cycles known as Macros. These 20-minute windows represent programmed executions where algorithms are injected with order flow mandates.

Master Macro Schedule (All Times New York EST):
- 02:33 AM – 03:00 AM: London Pre-Open Macro. Hunts resting liquidity above Asian highs or below Asian lows prior to the London 03:00 AM open.
- 04:00 AM – 04:30 AM: London Continuation Macro. Establishes the acceleration trend into the European morning.
- 08:50 AM – 09:10 AM: Pre-Market Macro. Absorbs the 08:30 AM economic release (CPI, PPI, Jobless Claims) and rebalances early inefficiencies.
- 09:50 AM – 10:10 AM: New York Open / 10:00 AM Macro. The highest-probability macro of the day. Frequently delivers the Silver Bullet setup following the 10:00 AM economic release.
- 10:50 AM – 11:10 AM: Late Morning Macro. Often marks the climax or temporary pause of the initial New York expansion.
- 11:50 AM – 12:10 PM: London Close Macro. European desks square their books; frequently produces sharp counter-trend retracements.
- 13:10 PM – 13:40 PM: PM Session Macro. Post-lunch re-pricing initiating the afternoon trend.
- 15:15 PM – 15:45 PM: Market on Close (MOC) Macro. Large institutional equity closing imbalances are matched before the 16:00 cash close.`
      }
    ]
  },
  {
    id: 26,
    slug: 'smt-divergence-and-inversion-fvgs',
    title: 'ICT 2025 Mentorship: SMT Divergence & Inversion FVGs (IFVG)',
    part: 'Part IX - ICT 2025 Official Mentorship Curriculum',
    level: 3,
    quote: 'When two correlated assets disagree at a key liquidity pool, smart money is tipping their hand.',
    summary: [
      'Smart Money Technique (SMT) divergence across NQ, ES, YM, Gold, Silver, and Currency pairs.',
      'How institutional failure swings signal accumulation or distribution without guessing.',
      'The mechanics of Inversion Fair Value Gaps (IFVG) and Balanced Price Ranges (BPR).',
      'Using disrespected imbalances as decisive reversal and continuation entries.'
    ],
    keyTerms: [
      { term: 'SMT Divergence', definition: 'A non-confirmation between two historically correlated instruments at a major swing high or low.' },
      { term: 'Inversion FVG (IFVG)', definition: 'A Fair Value Gap that is violated by decisive candle bodies and subsequently acts as support/resistance in the opposite direction.' },
      { term: 'Balanced Price Range (BPR)', definition: 'A price area where both buy-side and sell-side imbalances have overlapped and rebalanced cleanly.' }
    ],
    practiceQuestions: [
      'How does a failure swing in ES when NQ makes a higher high reveal institutional distribution?',
      'What constitutes valid confirmation that a Fair Value Gap has become an Inversion FVG (IFVG)?',
      'What is a Balanced Price Range (BPR) and how does it differ from a standard FVG?'
    ],
    sections: [
      {
        id: '26.1',
        title: '26.1 SMT Divergence Mechanics',
        content: `SMT (Smart Money Technique) Divergence is the ultimate institutional confirmation tool.

Correlated Asset Pairs:
- Index Futures: E-mini S&P 500 (ES) vs E-mini Nasdaq 100 (NQ) vs Dow Futures (YM).
- Commodities: Gold (XAUUSD) vs Silver (XAGUSD).
- Currencies: EUR/USD vs GBP/USD, or EUR/USD vs US Dollar Index (DXY inverse).

The Mechanics of SMT Divergence:
1. Bearish SMT: NQ prints a Higher High sweeping Buy Side Liquidity, but ES fails to make a Higher High and prints a Lower High. 
   - What this means: The broader market lacks institutional buying appetite. The NQ push was a pure stop-run (manipulation). When ES refuses to confirm the high, smart money is actively distributing.
2. Bullish SMT: ES prints a Lower Low sweeping Sell Side Liquidity, but NQ holds above its previous low, forming a Higher Low.
   - What this means: Heavy institutional sponsorship is defending NQ. The sweep in ES is an exhaustion run. Expect an aggressive bullish reversal.`
      },
      {
        id: '26.2',
        title: '26.2 Inversion Fair Value Gaps (IFVG) & Balanced Price Ranges (BPR)',
        content: `In traditional ICT analysis, an FVG is expected to provide support or resistance. In the 2024/2025 Mentorship, ICT deeply emphasizes what happens when an FVG fails.

When an FVG Fails (Inversion):
- If price approaches a Bullish FVG and violently displaces downward through it, closing candle bodies beneath the gap, that FVG has been disrespected.
- Rather than discarding the box, smart money marks it as an Inversion Fair Value Gap (IFVG).
- When price pulls back up to the underside of that violated box, it now serves as high-probability Bearish Resistance.

Balanced Price Range (BPR):
When a bullish displacement gap is immediately followed by a bearish displacement gap through the exact same price window, both buyers and sellers have had opportunity to participate aggressively. This zone becomes a Balanced Price Range (BPR) and functions as an institutional pivot.`
      }
    ]
  },
  {
    id: 27,
    slug: 'weekly-profiles-and-am-pm-sessions',
    title: 'ICT 2025 Mentorship: The 12 Weekly Profiles & AM/PM Session Model',
    part: 'Part IX - ICT 2025 Official Mentorship Curriculum',
    level: 3,
    quote: 'The weekly candle has an Open, High, Low, and Close. If you understand which profile is active, you know when the high or low of the week will print.',
    summary: [
      'The 12 ICT Weekly Profiles and their day-of-week probability distributions.',
      'The classic Tuesday Low of the Week (70% frequency in bullish conditions).',
      'Wednesday Midweek Reversal vs Thursday Expansion profiles.',
      'The AM/PM Session Model: How morning traps set up afternoon institutional delivery.'
    ],
    keyTerms: [
      { term: 'Classic Tuesday Low/High', definition: 'The standard weekly profile where the weekly extreme forms during Tuesday London or NY session.' },
      { term: 'Wednesday Reversal', definition: 'A weekly profile triggered by major midweek economic releases (FOMC / CPI).' },
      { term: 'AM/PM Model', definition: 'The institutional framework where the 09:30 AM - 12:00 PM session engineers liquidity for the 13:30 - 16:00 PM delivery.' }
    ],
    practiceQuestions: [
      'In a bullish weekly profile, which day most frequently prints the absolute Low of the Week?',
      'Why is the 12:00 PM to 13:30 PM window classified as the Algorithmic Dead Zone?',
      'How does the 13:10 PM - 13:40 PM afternoon macro align with the final Draw on Liquidity?'
    ],
    sections: [
      {
        id: '27.1',
        title: '27.1 The 12 Weekly Profiles',
        content: `Just as a daily candle follows Power of 3 (Accumulation, Manipulation, Distribution), the 5-day weekly candle adheres to predictable weekly profiles.

Top High-Probability Profiles:
1. Classic Tuesday Low of the Week:
   - Monday: Consolidates and establishes initial balance.
   - Tuesday: London Judas swing drives down below Monday low to create the absolute Low of the Week.
   - Wednesday & Thursday: Strong expansion upward.
   - Friday: Targets Buy Side Liquidity and closes near the high of the week.
2. Wednesday Reversal Profile:
   - Monday & Tuesday trend in the wrong direction or chop into a high-timeframe array.
   - Wednesday: News event (FOMC or CPI) sweeps external liquidity and prints a massive structural reversal that carries through Friday.
3. Consolidation into Midweek Expansion:
   - Monday and Tuesday remain locked in a tight consolidation.
   - Wednesday breaks out, Thursday retests, Friday accelerates into external range liquidity.`
      },
      {
        id: '27.2',
        title: '27.2 The AM / PM Session Model',
        content: `In the 2024 and 2025 teachings, ICT advises traders to divide the trading day into two distinct operational chapters:

1. The AM Session (09:30 AM – 12:00 PM NY):
   - Ingests overnight order flow and opening volatility.
   - Establishes the 09:30 to 10:00 AM Opening Range.
   - Sweeps key session liquidity and tests the 1st Presented FVG during the 09:50-10:10 AM macro.
   - Often forms the High or Low of the session.

2. The Algorithmic Dead Zone (12:00 PM – 13:30 PM NY):
   - London desk closed; lunch-hour algorithmic liquidity re-balancing. Trading during this time involves choppy spreads and false breaks.

3. The PM Session (13:30 PM – 16:00 PM NY):
   - The 13:10-13:40 PM macro sets the afternoon trajectory.
   - Institutional accounts deploy capital into the final Draw on Liquidity (DOL).
   - Culminates in the 15:15-15:45 PM Market on Close (MOC) macro.`
      }
    ]
  },
  {
    id: 28,
    slug: 'ict-charter-model-1-intraday-scalping',
    title: 'ICT Charter Model 1: Intraday Scalping & The 20-Day IPDA Data Range',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 1 is engineered for precision intraday scalping. By looking back 20 days on the IPDA engine, we know precisely whether price is priced at a discount or premium before raiding previous daily levels.',
    summary: [
      'The complete Trade Plan & Algorithmic Theory of ICT Charter Price Action Model 1.',
      'How the 20-Day IPDA data range establishes institutional directional bias and dealing range boundaries.',
      'Execution mechanics within the New York Kill Zone (07:00 AM - 11:00 AM NY time).',
      'The Optimal Trade Entry (OTE 62% to 79%) retracement framework and non-negotiable stop loss placement.',
      'Target metrics: capturing 10, 20, or 30 pips beyond the previous day range with zero emotional hesitation.'
    ],
    keyTerms: [
      { term: '20-Day IPDA Range', definition: 'The algorithmic lookback window used by the Interbank Price Delivery Algorithm to determine institutional dealing ranges.' },
      { term: 'Model 1 Intraday Scalp', definition: 'The flagship Charter model targeting 10 to 30 pips following an intraday raid of previous day high or low.' },
      { term: 'Optimal Trade Entry (OTE)', definition: 'The high-probability Fibonacci retracement zone between 62% and 79%, centered at the 70.5% sweet spot.' }
    ],
    practiceQuestions: [
      'Why is the 20-day IPDA lookback period prioritized over arbitrary moving averages for determining daily premium or discount?',
      'What specific market condition must occur during the London or New York session before initiating a Model 1 entry?',
      'Where is the stop loss placed for a Model 1 long setup, and under what condition can it be moved to breakeven?'
    ],
    sections: [
      {
        id: '28.1',
        title: '28.1 Model 1 Trade Plan & Strategic Objective',
        content: `ICT Charter Price Action Model 1 is designed for intraday traders seeking high-frequency, rule-based scalping opportunities without overnight holding risk.

Key Trade Plan Specifications:
1. Operational Objective: Capture 10, 20, or 30 pips (or 20 to 50 index points on NQ/ES) per setup.
2. Execution Timeframe: 5-minute and 1-minute execution charts, anchored to the 60-minute and Daily timeframes.
3. Prime Operating Window: The New York Kill Zone between 07:00 AM and 11:00 AM New York time.
4. Risk Management Ceiling: Maximum 1% to 1.5% account equity risk per executed idea.

The core philosophy of Model 1 rejects predicting long-term trends. Instead, it capitalizes on the mechanical rebalancing that occurs immediately after institutional smart money raids liquidity resting above the Previous Day High (PDH) or below the Previous Day Low (PDL).`
      },
      {
        id: '28.2',
        title: '28.2 The 20-Day IPDA Data Range Framework',
        content: `Before placing an order under Model 1, the trader must establish the 20-Day Interbank Price Delivery Algorithm (IPDA) data range.

Steps to Map the 20-Day IPDA Matrix:
1. Count back exactly 20 daily candles from the current trading day.
2. Mark the absolute highest high and lowest low within that 20-day window.
3. Calculate the 50% Equilibrium level of this 20-day dealing range.

Algorithmic Interpretation:
- If current market price is trading above the 50% Equilibrium line, the asset is in an IPDA Premium. The algorithm will prioritize looking for sell-side liquidity pools (SSL) or discount Fair Value Gaps.
- If current market price is trading below the 50% Equilibrium line, the asset is in an IPDA Discount. The algorithm will prioritize looking for buy-side liquidity pools (BSL) or premium Fair Value Gaps.

This directional compass prevents traders from buying into premium liquidity or selling into discount exhaustion.`
      },
      {
        id: '28.3',
        title: '28.3 Amplified Lecture: OTE Execution & Stop Discipline',
        content: `In the Amplified Lecture for Model 1, Michael Huddleston details the exact execution trigger:

1. The Liquidity Raid:
Price must trade through the Previous Day High or Low during the active session. This raid triggers retail stop orders and traps breakout traders.

2. Market Structure Shift with Displacement:
Wait for an aggressive candle body close on the 5-minute or 1-minute chart that violates an opposing swing point, leaving behind an open Fair Value Gap.

3. The Optimal Trade Entry (OTE):
Anchor the Fibonacci tool from the raid swing low/high to the displacement high/low.
- 62% Retracement: First entry scale.
- 70.5% Sweet Spot: Core institutional limit order level.
- 79% Extreme Retracement: Final acceptable boundary for entry.

4. Stop Loss Rules:
The stop loss is anchored 1 to 2 ticks beyond the extreme raid high or low. Never move the stop loss to breakeven until the first partial profit target (minimum 10 to 15 pips) has been physically booked.`
      },
      {
        id: '28.4',
        title: '28.4 Profit Target Metrics & Rebalancing Outcomes',
        content: `Model 1 adheres to fixed target objectives to enforce mathematical expectancy:

- Objective 1 (First Scale): 10 to 15 pips or the 50% Consequent Encroachment of the intraday range. Take off 50% of position size and move stop loss to entry.
- Objective 2 (Full Target): 20 to 30 pips expansion beyond the initial raid point, targeting opposing session liquidity (such as the Asian High/Low or opposing Fair Value Gap).
- Daily Discipline: Once a single Model 1 scalp achieves its target, trading for that session is concluded. Overtrading after a winning Model 1 execution degrades psychological clarity and invites algorithmic churn.`
      }
    ]
  },
  {
    id: 29,
    slug: 'ict-charter-model-2-weekly-range-expansion',
    title: 'ICT Charter Model 2: Short-Term Weekly Range Expansion & Reversal Profiles',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 2 captures the true heartbeat of the weekly candle. When you understand the Tuesday high or low of the week formation, you hold until Thursday with complete algorithmic peace.',
    summary: [
      'The mechanics of capturing 50 to 100+ pips through weekly range expansions.',
      'The significance of the weekly open and the Tuesday 04:00 AM London / 06:00 AM European open extremes.',
      'The Advanced Reversal Market Profile when Higher Timeframe PD arrays are tagged.',
      'Amplified Lecture principles: Aligning the daily delivery cycle with Thursday New York liquidation objectives.'
    ],
    keyTerms: [
      { term: 'Weekly Range Expansion', definition: 'The multi-day impulsive delivery of the 5-day weekly candle from its opening extreme to its closing objective.' },
      { term: 'Tuesday High/Low of the Week', definition: 'The statistical tendency for trending weeks to establish their absolute high or low during Tuesday London or early NY session.' },
      { term: 'Reversal Market Profile', definition: 'An intra-week reversal pattern initiated when price taps a major higher timeframe Premium or Discount PD Array.' }
    ],
    practiceQuestions: [
      'Why does Tuesday print the High or Low of the Week in approximately 70% of trending market conditions?',
      'How does the Tuesday 04:00 AM London open differ in function from the 06:00 AM European open in Model 2?',
      'What is the minimum holding horizon for a Model 2 position, and why is Thursday New York session critical?'
    ],
    sections: [
      {
        id: '29.1',
        title: '29.1 Model 2 Trade Plan & Weekly Horizon',
        content: `ICT Charter Price Action Model 2 is engineered for short-term swing traders who desire substantial multi-day expansions without being glued to 1-minute tick charts all day.

Core Operational Parameters:
- Target Expectancy: 50 to 100+ pips (or 100 to 250 index points).
- Holding Period: Multi-day holding, typically initiated on Tuesday and closed on Thursday or Friday morning.
- Higher Timeframe Anchor: Daily and 4-Hour charts defining the primary Draw on Liquidity.
- Execution Timeframe: 1-Hour and 15-Minute charts for entry refinement.`
      },
      {
        id: '29.2',
        title: '29.2 The Tuesday High or Low of the Week Formation',
        content: `The cornerstone of Model 2 is the institutional rhythm of the five-day trading week:

- Monday: The Accumulation / Range Definition Day. Monday price action often establishes a reference range without delivering true directional expansion.
- Tuesday (The Delivery Pivot):
  - In a bullish week: Algorithms will manipulate price downward below the Monday low or Sunday opening print during the Tuesday London session (between 02:00 AM and 05:00 AM NY time).
  - This downmove purges retail sell stops and fills institutional buy orders at a deep discount.
  - The absolute Low of the Week is established.
  - Price then begins its sustained expansion upward across Wednesday and Thursday.`
      },
      {
        id: '29.3',
        title: '29.3 Advanced Reversal Market Profile at 06:00 European Open',
        content: `When Higher Timeframe analysis indicates an impending major reversal, Model 2 shifts from simple trend continuation into the Advanced Reversal Market Profile:

1. Price rallies or drops into an opposing HTF PD Array (Daily Fair Value Gap, Weekly Bearish Breaker, or Old High/Low).
2. Look at the 06:00 AM London / European Open window.
3. If price rejects the HTF array and forms an hourly Market Structure Shift with an energetic displacement candle, enter on the subsequent retracement into the newly formed Fair Value Gap.
4. This entry captures the turning point of the entire week, yielding exceptional risk-to-reward ratios exceeding 1:4.`
      },
      {
        id: '29.4',
        title: '29.4 Amplified Lecture: Thursday Liquidation & Target Matrix',
        content: `In the Amplified Lecture for Model 2, ICT emphasizes the trade management lifecycle:

- Wednesday is typically the fastest expansion day of the week, running through internal liquidity with conviction.
- The Primary Target must be reached by Thursday's New York session open (08:30 AM to 10:00 AM NY).
- Why Thursday? Institutional trading desks begin balancing books, squaring delta positions, and mitigating exposure ahead of the weekend.
- Friday frequently features consolidation or minor retracement. Therefore, holding past Thursday afternoon without securing 80% or more of position profits exposes the trader to algorithmic profit decay.`
      }
    ]
  },
  {
    id: 30,
    slug: 'ict-charter-model-3-swing-trading-cot',
    title: 'ICT Charter Model 3: Swing Trading & Commercial COT Hedging Programs',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 3 aligns individual retail accounts with multi-billion dollar commercial hedging programs. When the commercial smart money takes a stand, monthly ranges expand for hundreds of pips.',
    summary: [
      'The multi-week swing trading architecture delivering 100 to 300+ pips per setup.',
      'How to analyze the CFTC Commitment of Traders (COT) report for commercial net position extremes.',
      'Combining 40-day and 60-day IPDA data ranges with monthly order flow direction.',
      'Amplified Lecture: 4-Hour and Daily Order Block entry execution with structural invalidation stops.'
    ],
    keyTerms: [
      { term: 'Commercial Hedging Program', definition: 'The non-speculative buying and selling activities of multinational corporations and central institutions reported on the CFTC COT report.' },
      { term: 'Model 3 Swing Framework', definition: 'The ICT Charter swing model targeting 100 to 300+ pips with an execution frequency of 1 to 2 setups per month.' },
      { term: '40/60-Day IPDA Cycle', definition: 'The medium-term algorithmic cycle used to gauge institutional inventory re-accumulation and quarterly trend legs.' }
    ],
    practiceQuestions: [
      'Why are Commercial traders on the COT report considered the true smart money rather than Large Speculators?',
      'What timeframes are required to identify and execute an ICT Charter Model 3 swing trade?',
      'How does trailing the stop loss behind intermediate term swing points protect capital during multi-week swings?'
    ],
    sections: [
      {
        id: '30.1',
        title: '30.1 Model 3 Trade Plan & Strategic Horizon',
        content: `ICT Charter Price Action Model 3 represents the highest echelon of calm, low-frequency swing trading.

Strategic Specifications:
- Target Expectancy: 100 to 300+ pips per trade.
- Frequency: 1 to 2 setups per month per instrument.
- Primary Charts: Monthly, Weekly, and Daily charts for directional bias; 4-Hour chart for entry trigger.
- Trading Psychology: Low screen time, immunity to intraday noise, and strict patience for institutional alignment.`
      },
      {
        id: '30.2',
        title: '30.2 The CFTC Commitment of Traders (COT) Engine',
        content: `Model 3 incorporates the weekly CFTC Commitment of Traders data:

1. Identify Commercial Net Position:
Commercial entities (producers, merchants, and sovereign hedging banks) trade against prevailing speculative trends because they use the futures market to hedge physical inventory.

2. Look for Commercial Net Position Extremes:
When Commercials flip from net short to historic net long, or hit 12-month or multi-year buying extremes, it signals that smart money has absorbed speculative selling.

3. Corroborate with 40-Day and 60-Day IPDA Ranges:
If the market has been pushed down into a 60-day IPDA Discount array while Commercials are aggressively net long, a massive multi-week rally is imminent.`
      },
      {
        id: '30.3',
        title: '30.3 Amplified Lecture: 4-Hour Entry Refinement',
        content: `In the Model 3 Amplified Lecture, execution precision is brought to the 4-Hour chart:

1. Wait for the Daily Market Structure Shift:
Do not buy simply because Commercials are net long. Wait until daily price action delivers an energetic displacement candle closing above an established swing high.

2. Identify the 4-Hour Nested Order Block or FVG:
Drop to the 4-Hour chart. Identify the last down-close candle prior to the displacement leg (Bullish Order Block) or the 4-Hour Fair Value Gap resting within the discount half of the daily dealing range.

3. Limit Order Placement:
Place a limit buy order at the Open or 50% Mean Threshold of the 4-Hour Order Block.

4. Wide Invalidation Stop:
Place the stop loss safely below the swing low created during the displacement origin. This ensures intermediate volatility will not prematurely shake out the position.`
      },
      {
        id: '30.4',
        title: '30.4 Position Management & Trailing Architecture',
        content: `Because Model 3 trades unfold over several weeks, trade management differs from intraday scalps:

- Scale 1 (100 Pips): When price expands 100 pips into the first weekly liquidity pool, book 30% to 40% of the trade and move stop loss to breakeven.
- Scale 2 (200 Pips): Book an additional 30% at the monthly Equilibrium line or major opposing Daily FVG.
- Runner (300+ Pips): Trail the stop loss behind newly printed 4-Hour intermediate swing lows as the weekly trend accelerates toward the ultimate Draw on Liquidity.`
      }
    ]
  },
  {
    id: 31,
    slug: 'ict-charter-model-4-position-trading',
    title: 'ICT Charter Model 4: Position Trading, Quarterly Shifts & Seasonal Tendencies',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 4 navigates the macro tides of financial markets. When quarterly shifts align with 30-year seasonal tendencies and a 6-month IPDA lookback, trends deliver generational moves.',
    summary: [
      'The architecture of capturing 300 to 1,000+ pips across multi-month institutional position trades.',
      'Understanding the 90-day Quarterly Shift cycle and the 6-month IPDA data range lookback.',
      'The Stage, Setup, and Pattern triad connecting macro fundamentals with daily entry execution.',
      'Amplified Lecture: Utilizing 15-year and 30-year historical seasonal tendencies for market turning points.'
    ],
    keyTerms: [
      { term: 'Quarterly Shift', definition: 'The recurring 90-day institutional capital reallocation cycle that drives macroeconomic trends and quarterly market turns.' },
      { term: '6-Month IPDA Lookback', definition: 'The long-term institutional reference period used to identify macro discount and premium dealing ranges.' },
      { term: 'Stage-Setup-Pattern Triad', definition: 'The ICT top-down framework: Stage (Monthly/Weekly cycle), Setup (Daily PD Array), Pattern (Intraday execution).' }
    ],
    practiceQuestions: [
      'What calendar months typically define the boundaries of the four quarterly algorithmic shifts?',
      'How do 15-year and 30-year seasonal tendencies provide predictive confluence for Model 4 setups?',
      'Why is pyramid positioning on intermediate swing breaks superior to single-bullet entry in position trading?'
    ],
    sections: [
      {
        id: '31.1',
        title: '31.1 Model 4 Trade Plan: Macro Position Trading',
        content: `ICT Charter Price Action Model 4 is designed for institutional fund managers, family offices, and patient individual traders who target 300 to 1,000+ pips per trade over multi-month holding periods.

Operational Parameters:
- Target Expectancy: 300 to 1,000+ pips.
- Holding Duration: 1 to 4 months per position leg.
- Primary Anchor: Monthly and Weekly charts supported by seasonal tendencies and macroeconomic data.
- Execution Trigger: Daily and 4-Hour structural confirmations.`
      },
      {
        id: '31.2',
        title: '31.2 The 90-Day Quarterly Shift & 6-Month IPDA Engine',
        content: `Financial markets do not move randomly over the calendar year; they are programmed by institutional algorithms into 90-day delivery cycles:

1. The Quarterly Shift Rhythm:
Every quarter (approximately 90 days or 3 calendar months), major central banking networks and sovereign wealth funds adjust their portfolio allocations.
- Quarter 1 (January - March): Initial macro direction or accumulation.
- Quarter 2 (April - June): Volatility expansion or seasonal spring trends.
- Quarter 3 (July - September): Summer lull transition into major autumn trend reversals.
- Quarter 4 (October - December): Year-end institutional markup or liquidation into historical targets.

2. The 6-Month IPDA Lookback:
Mark the extreme 6-month high and low. Identify whether current price is deep in a 6-month discount or premium. When price reaches a 6-month extreme near a quarterly transition date, expect a major trend reversal.`
      },
      {
        id: '31.3',
        title: '31.3 Amplified Lecture: The Stage, Setup, and Pattern Triad',
        content: `In the Model 4 Amplified Lecture, ICT establishes the three-tier framework required for position trading:

1. Stage (The Macro Environment):
- Determined on the Monthly and Weekly charts.
- Identifies whether the asset is in an Accumulation, Manipulation, or Distribution phase within the 90-day cycle.

2. Setup (The Institutional Condition):
- Determined on the Daily chart.
- A clean PD Array interaction: price tagging a Daily Bullish Order Block, rebalancing a Weekly Fair Value Gap, or sweeping a major yearly liquidity pool.

3. Pattern (The Exact Entry Signature):
- Refined on the 4-Hour or 1-Hour chart.
- A clean Market Structure Shift (MSS) with energetic displacement that validates the institutional turn. Enter via limit order on the first retest of the Fair Value Gap.`
      },
      {
        id: '31.4',
        title: '31.4 Seasonal Tendencies & Pyramid Scaling',
        content: `Model 4 incorporates 15-year and 30-year seasonal tendencies:

- Certain commodities and currencies exhibit strong historical patterns based on agricultural harvesting, tax deadlines, fiscal budgeting, and heating oil demand cycles.
- When price reaches a 6-month discount array right as the 30-year seasonal tendency turns bullish, conviction reaches institutional certainty.
- Pyramiding: Rather than entering the full position at once, Model 4 scales in across consecutive intermediate swing high/low breaks, locking in profits while exponentially expanding overall return on equity.`
      }
    ]
  },
  {
    id: 32,
    slug: 'ict-charter-model-5-session-day-trading',
    title: 'ICT Charter Model 5: Session Day Trading & Intraday Volatility Expansions',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 5 extracts 40 to 60 pips from the daily volatility injection. When the London Judas swing sweeps the Asian range, the true New York expansion becomes mechanical.',
    summary: [
      'The complete Trade Plan for session day trading capturing 40 to 60 pips per trade.',
      'The Asian Session range as the universal reference benchmark for manipulation runs.',
      'Executing the London Open Judas Swing and New York Open continuation injections.',
      'Amplified Lecture: Average Daily Range (ADR) exhaustion targets and high-impact news handling.'
    ],
    keyTerms: [
      { term: 'Session Day Trading', definition: 'The ICT Charter model focused on capturing the core daily expansion leg within a single operational session window.' },
      { term: 'Judas Swing', definition: 'An engineered false run during London Open that tricks retail traders into the wrong direction before reversing violently.' },
      { term: 'ADR Exhaustion', definition: 'The statistical daily limit of price movement calculated via the 5-day or 10-day Average Daily Range.' }
    ],
    practiceQuestions: [
      'Why is the Asian Session range (20:00 - 00:00 NY) considered the reference benchmark for the entire day?',
      'How does the London Judas Swing exploit the stops resting above and below the Asian session extremes?',
      'At what point should a Model 5 day trade be closed if the Average Daily Range (ADR) has been 100% fulfilled?'
    ],
    sections: [
      {
        id: '32.1',
        title: '32.1 Model 5 Trade Plan & Intraday Horizon',
        content: `ICT Charter Price Action Model 5 is built for active day traders who want larger gains than pure 10-pip scalps while completing all business before the market closes.

Operational Specifications:
- Target Expectancy: 40 to 60 pips (or 60 to 120 index points).
- Holding Time: 2 to 6 hours within the London or New York session.
- Primary Anchor: 60-minute and 15-minute charts.
- Execution Trigger: 5-minute and 1-minute displacement setups.`
      },
      {
        id: '32.2',
        title: '32.2 The Asian Range Reference & London Judas Swing',
        content: `Model 5 begins with the Asian Session consolidation:

1. Define the Asian Range:
Mark the high and low established between 20:00 PM and 00:00 AM New York Midnight. This defines the baseline liquidity pool.

2. The London Open Manipulation (Judas Swing):
Between 02:00 AM and 04:00 AM New York time, the London market opens.
- If daily bias is bullish, algorithms will drop price sharply below the Asian low, often driving down 20 to 30 pips to sweep sell stops and tap a Higher Timeframe discount PD array.
- This is the Judas Swing. It creates the illusion of a downward breakdown.

3. The Structural Reversal:
Once stops are cleared, price aggressively rallies back above the Asian low, shifting 5-minute market structure and leaving behind a pristine Fair Value Gap.`
      },
      {
        id: '32.3',
        title: '32.3 Amplified Lecture: NY Open Continuation & ADR Targets',
        content: `In the Amplified Lecture for Model 5, ICT explains the relationship between London and New York:

- If London established the true Low of the Day, the New York Open (07:00 AM to 09:00 AM NY) will provide a continuation entry.
- Look for a shallow retracement into a 15-minute Bullish FVG or Order Block during the New York Kill Zone.
- Enter with a target set at the 5-day Average Daily Range (ADR) exhaustion point.
- When price reaches 90% to 100% of the Average Daily Range and tags the Previous Day High, institutional algorithms exhaust their delivery cycle. Take full profits immediately.`
      },
      {
        id: '32.4',
        title: '32.4 High-Impact News Execution Protocol',
        content: `Model 5 provides strict rules for macroeconomic news releases (CPI, NFP, FOMC):

- Never enter directly ahead of a red-folder news release.
- Allow the news release to deliver its initial whip and volatility spike.
- Wait for the post-news candle to sweep resting liquidity and produce a clear 5-minute displacement candle.
- Enter on the first retracement into the newly printed imbalance with a defined invalidation stop.`
      }
    ]
  },
  {
    id: 33,
    slug: 'ict-charter-models-6-and-7-universal-models',
    title: 'ICT Charter Models 6 & 7: Universal Models, Buyside Expansion & Market Maker Curves',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Models 6 and 7 unlock the complete geometric architecture of price delivery. The Market Maker Buy and Sell Models mirror each other with mathematical perfection across the Smart Money Reversal.',
    summary: [
      'The Universal Trading Model 6: Systematic buyside range expansions from Discount PD arrays.',
      'The Universal Trading Model 7: The Sell-Side Curve and the complete Market Maker Sell Model (MMSM).',
      'The symmetry of the Market Maker Model: Original Consolidation to Smart Money Reversal (SMR).',
      'Amplified Lecture: Executing low-risk entries on the redistribution curve toward terminal liquidity.'
    ],
    keyTerms: [
      { term: 'Universal Trading Model', definition: 'The standardized ICT algorithmic model that applies seamlessly across any liquid asset class and timeframe.' },
      { term: 'Market Maker Sell Model (MMSM)', definition: 'The complete institutional delivery cycle from buying accumulation through Smart Money Reversal to selling distribution.' },
      { term: 'Smart Money Reversal (SMR)', definition: 'The critical HTF turning point where institutional algorithms transition from net buying to net selling.' }
    ],
    practiceQuestions: [
      'What are the distinct developmental stages of the Buy-Side Curve in a Market Maker Sell Model?',
      'How does the Smart Money Reversal (SMR) differ from a regular intraday pullback?',
      'Why does the redistribution curve on the right side of the model mirror the consolidation blocks on the left side?'
    ],
    sections: [
      {
        id: '33.1',
        title: '33.1 Model 6: Universal Buyside Range Expansion',
        content: `ICT Charter Price Action Model 6 is classified as the Universal Trading Model for buyside delivery.

Core Principles of Model 6:
1. The Hierarchical PD Array Matrix:
Price delivered in a bullish trend respects a strict sequence of discount arrays:
- Mitigation Block
- Breaker Block
- Liquidity Void
- Fair Value Gap
- Order Block
- Rejection Block

2. The Dealing Range Equilibrium Rule:
Model 6 strictly forbids buying above the 50% Equilibrium level of the active dealing range. All valid entries must be anchored at a Discount PD array located below Equilibrium.`
      },
      {
        id: '33.2',
        title: '33.2 Model 7: The Sell-Side Curve & Market Maker Models',
        content: `ICT Charter Price Action Model 7 introduces the complete Market Maker Sell Model (MMSM) and Market Maker Buy Model (MMBM):

The Geometry of the Model:
1. Left Side (The Buy-Side Curve):
- Original Consolidation: Initial base where institutional smart money builds inventory.
- Accumulation Stage 1: First impulsive run breaking minor structure.
- Re-Accumulation Stage 2: Secondary consolidation and upward continuation.
- Smart Money Reversal (SMR): Price tags a major Higher Timeframe Premium Array (such as a Weekly Bearish Order Block or Monthly FVG).

2. Right Side (The Sell-Side Curve):
- Low-Risk Sell Setup: The first Market Structure Shift lower following the SMR.
- Distribution Stage: Price begins systematically clearing the low of Re-Accumulation Stage 2.
- Re-Distribution Stage: Price breaks through Accumulation Stage 1 lows.
- Terminal Objective: Complete liquidation into the original consolidation origin.`
      },
      {
        id: '33.3',
        title: '33.3 The Smart Money Reversal (SMR) Mechanics',
        content: `The Smart Money Reversal is the most critical inflection point in Model 7:

- It must occur at a pre-determined Higher Timeframe Point of Interest.
- Look for Intermarket SMT Divergence at the SMR: if ES prints a higher high but NQ fails to make a higher high, institutional accumulation has ceased.
- The entry is taken immediately after the first low-timeframe displacement breaks below the internal swing low.`
      },
      {
        id: '33.4',
        title: '33.4 Amplified Lecture: Trading the Redistribution Curve',
        content: `In the Amplified Lecture for Models 6 and 7, ICT explains how to trade the right-side curve:

- Traders who miss the initial Smart Money Reversal do not chase price.
- Instead, wait for price to reach the level of the previous accumulation block on the left side of the chart.
- The previous accumulation block now flips into an Inversion FVG or Bearish Breaker on the right side.
- Enter on the retest of this flipped level with a limit order, targeting the Original Consolidation with exceptional confidence.`
      }
    ]
  },
  {
    id: 34,
    slug: 'ict-charter-models-8-and-9-precision-and-osok',
    title: 'ICT Charter Models 8 & 9: Advanced Precision (25 Pips/Wk) & One Shot One Kill (OSOK)',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 8 proves that capturing just 25 pips a week with military discipline compounds into massive wealth. Model 9 teaches the sniper mindset: one shot, one kill, and walk away victorious.',
    summary: [
      'Model 8 Trade Plan: Compounding wealth through a non-negotiable 25 pips per week objective.',
      'Algorithmic time-price convergence, counter-bias manipulation, and tight 15-pip stop loss profiles.',
      'Model 9 Trade Plan: The legendary One Shot One Kill (OSOK) sniper methodology.',
      'Amplified Lecture: Mastering the interplay between Internal Range Liquidity and External Range Liquidity.'
    ],
    keyTerms: [
      { term: '25 Pips Per Week Model', definition: 'The disciplined mathematical approach targeting 25 pips weekly with 15-pip risk to generate consistent compounding returns.' },
      { term: 'One Shot One Kill (OSOK)', definition: 'The patient sniper framework executing only the single cleanest weekly setup and refusing low-conviction noise.' },
      { term: 'Internal vs External Liquidity', definition: 'The continuous oscillation of price between internal imbalances (FVGs, Order Blocks) and external swing boundaries (Old Highs/Lows).' }
    ],
    practiceQuestions: [
      'How does targeting only 25 pips per week protect traders from psychological burnout and overtrading?',
      'What is the core premise of One Shot One Kill (OSOK) regarding trade frequency?',
      'How does an entry taken at Internal Range Liquidity deliver toward External Range Liquidity?'
    ],
    sections: [
      {
        id: '34.1',
        title: '34.1 Model 8: The Compounding Power of 25 Pips/Week',
        content: `ICT Charter Price Action Model 8 was revealed to demonstrate that trading success does not require catching hundreds of pips every single day.

The Mathematical Architecture:
- Objective: Capture exactly 25 pips (or 40 index points) once per week.
- Risk Profile: Fixed 15-pip stop loss on 5-minute charts.
- Compounding Effect: A consistent 25-pip gain per week at 1.5% risk yields over 6% monthly growth. Compounded over 12 to 24 months, this outpaces virtually all retail traders who overtrade daily.`
      },
      {
        id: '34.2',
        title: '34.2 Algorithmic Time-Price Convergence in Model 8',
        content: `To achieve extreme precision with a tight 15-pip stop, Model 8 demands time-price convergence:

1. Waiting for Counter-Bias Manipulation:
If weekly bias is bullish, do not buy during green expansion candles. Wait for an intraday volatility injection that pushes price aggressively against the higher timeframe trend into an established Discount FVG.

2. Five-Minute Execution:
On the 5-minute chart, wait for the down-move to halt inside the FVG. The moment an up-close candle shifts internal structure, enter at market or limit with a 15-pip stop placed immediately below the swing low.

3. Complete Detachment:
Once 25 pips are booked, the trading platform is closed for the rest of the week. No further trades are permitted.`
      },
      {
        id: '34.3',
        title: '34.3 Model 9: One Shot One Kill (OSOK) Strategic Delivery',
        content: `ICT Charter Price Action Model 9 is known as One Shot One Kill (OSOK):

Core Tenets of OSOK:
- Mindset: Treat yourself as a military sniper. You have one bullet for the week. You do not fire at every passing target; you wait for the high-value target to walk into your crosshairs.
- Weekly Directional Anchor: Analyze institutional order flow on the Weekly chart. Establish whether the weekly candle is expanding upward or downward.
- The Weekly Cycle Timing: Wait until Tuesday London or Wednesday New York presents the definitive setup of the week. Execute with total focus.`
      },
      {
        id: '34.4',
        title: '34.4 Amplified Lecture: Internal to External Liquidity Engine',
        content: `In the Amplified Lecture for Model 9, ICT unpacks the algorithmic heartbeat:

The Cycle of Liquidity Delivery:
1. Price rests at External Range Liquidity (Old Highs or Lows).
2. Once External Liquidity is swept, algorithms reverse to seek Internal Range Liquidity (Fair Value Gaps, Liquidity Voids, Order Blocks).
3. The OSOK Entry: Enter at the Internal Range Liquidity level when price rebalances the imbalance.
4. The OSOK Target: Ride price as the algorithm expands all the way back out to the opposing External Range Liquidity pool (equal highs or old daily swing extremes).`
      }
    ]
  },
  {
    id: 35,
    slug: 'ict-charter-models-10-11-and-12',
    title: 'ICT Charter Models 10, 11 & 12: Dealing Ranges, Liquidity Runs & OB/FVG Synergy',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Models 10, 11, and 12 refine the execution engine: defining mathematical dealing ranges, hunting daily liquidity sweeps, and exploiting the instantaneous synergy of Order Blocks nested in Fair Value Gaps.',
    summary: [
      'Model 10 Trade Plan: Systematic 50 to 75 pip weekly swing captures through anchored dealing ranges.',
      'Model 11 Trade Plan: Day trading 30 pips per trade through daily high/low runs and 60-minute rebalances.',
      'Model 12 Trade Plan: Scalping 20 pips per trade via the rapid pairing of Order Blocks and Fair Value Gaps.',
      'Amplified Lecture: How nested imbalances deliver instantaneous expansion with zero drawdown.'
    ],
    keyTerms: [
      { term: 'Anchored Dealing Range', definition: 'A discrete price range anchored from a major swing high to swing low with a calculated 50% Equilibrium dividing line.' },
      { term: 'Model 11 Daily Run', definition: 'A day trading setup targeting 30 pips immediately after price sweeps the previous daily high or low.' },
      { term: 'OB/FVG Synergy', definition: 'The powerful confluence of an Order Block sitting immediately adjacent to or within a Fair Value Gap.' }
    ],
    practiceQuestions: [
      'How does Model 10 use the 50% Equilibrium level to determine when a dealing range trade has reached maturity?',
      'What specific Fibonacci retracement level is utilized on the 60-minute chart in Model 11?',
      'Why does the synergy between an Order Block and an FVG in Model 12 minimize trade drawdown?'
    ],
    sections: [
      {
        id: '35.1',
        title: '35.1 Model 10: Anchored Dealing Ranges & Equilibrium Swings',
        content: `ICT Charter Price Action Model 10 is geared toward capturing 50 to 75 pips per week by operating within anchored dealing ranges.

Operational Blueprint:
1. Anchor the Active Range: Identify the highest swing high and lowest swing low on the 4-Hour or Daily chart that has not been violated.
2. Mark Equilibrium: Draw a horizontal line at precisely 50% of this range.
3. The Setup:
- When price sweeps the external high of the dealing range, wait for a reversal back inside the range.
- Enter short targeting the 50% Equilibrium line as Target 1, and the lower extreme of the dealing range as Target 2.
- Inversely, when price sweeps the external low, buy the return into the range targeting Equilibrium and the premium ceiling.`
      },
      {
        id: '35.2',
        title: '35.2 Model 11: Daily Liquidity Runs & 60-Minute Rebalances',
        content: `ICT Charter Price Action Model 11 is a day trading framework aimed at capturing ~30 pips per trade:

Execution Sequence:
1. Daily Liquidity Sweep: Price must run above an old daily high or below an old daily low during the session.
2. 60-Minute Confirmation: Drop to the 60-minute chart. Observe whether the candle body respects the raid or closes violently back inside the prior range, forming a 60-minute Fair Value Gap (BISI or SIBI).
3. The 62% OTE Entry: Apply the Fibonacci tool across the 60-minute displacement swing. Enter at the 62% retracement on the 15-minute or 5-minute chart.
4. Target: 30 pips or the opposite session liquidity pool.`
      },
      {
        id: '35.3',
        title: '35.3 Model 12: Scalping with Order Block & FVG Synergy',
        content: `ICT Charter Price Action Model 12 is a rapid scalping model targeting 20 pips:

The Synergy Engine:
- An Order Block on its own can sometimes suffer deep retracements before holding.
- A Fair Value Gap on its own can sometimes be breached before rebalancing.
- However, when an Order Block is created and the very next candle explodes with displacement leaving an immediate Fair Value Gap, these two arrays create powerful synergy.
- Limit Order Placement: Place a limit order at the open of the Order Block nested inside the FVG body.
- When price dips into the FVG and touches the Order Block threshold, algorithms react with violent speed, launching price into immediate profit.`
      },
      {
        id: '35.4',
        title: '35.4 Amplified Lecture: Zero-Drawdown Execution',
        content: `In the Amplified Lecture for Models 10, 11, and 12, ICT highlights the mechanics of zero-drawdown entries:

- When institutional algorithms are in an active expansion program, they will not permit price to close deep into the body of an Order Block that is protected by a Fair Value Gap.
- If a candle closes through the 50% Mean Threshold of the Order Block in Model 12, the setup is invalid. Cut the position immediately without waiting for the full stop loss to be hit.
- This ruthless risk mitigation preserves capital and keeps the win-rate exceptionally high.`
      }
    ]
  },
  {
    id: 36,
    slug: 'ict-charter-model-13-2022-youtube-model',
    title: 'ICT Charter Model 13: The 2022 YouTube Mentorship Model & Master Charter Lecture',
    part: 'Part X - ICT Charter Price Action Models Curriculum',
    level: 3,
    quote: 'Model 13 is the crown jewel taught in the 2022 Mentorship and amplified for Charter members. Raid session liquidity, wait for explosive displacement and MSS, and execute on the Fair Value Gap with total conviction.',
    summary: [
      'The complete Trade Plan & Algorithmic Theory of ICT Charter Price Action Model 13.',
      'Raid mechanisms: Hunting AM Session Highs/Lows and Lunch Hour Highs/Lows.',
      'Displacement criteria and Market Structure Shift (MSS) with full candle bodies.',
      'Charter Amplified Lecture: 1-minute and 5-minute execution at the Discount/Premium FVG.',
      'The Master Taxonomy: Comparative synthesis of all 13 ICT Charter Models for any market condition.'
    ],
    keyTerms: [
      { term: 'Model 13 (2022 Model)', definition: 'The definitive ICT intraday model combining liquidity sweep, displacement, Market Structure Shift, and Fair Value Gap retest.' },
      { term: 'Session Liquidity Raid', definition: 'The deliberate algorithmic purge of resting stop clusters above AM session highs or below lunch hour lows.' },
      { term: 'PD Array Matrix Objective', definition: 'The target destination on the opposite side of the dealing range where institutional profit is extracted.' }
    ],
    practiceQuestions: [
      'What are the mandatory operating hours for Model 13 in Forex vs Index Futures?',
      'Why must the Fair Value Gap used for entry reside at or beyond the Equilibrium level of the dealing range?',
      'How does Model 13 synthesize the core principles of all prior 12 Charter Price Action Models?'
    ],
    sections: [
      {
        id: '36.1',
        title: '36.1 Model 13 Trade Plan: The Institutional 2022 Model',
        content: `ICT Charter Price Action Model 13 is the cornerstone model introduced publicly in the 2022 YouTube Mentorship and thoroughly amplified in the private Charter lectures.

Trade Plan Specifications:
1. Operational Objective: Trade intraday market structure shifts that target opposing PD Array Matrix objectives.
2. Active Trading Windows:
   - Forex Markets: 07:00 AM to 10:00 AM EST (New York Kill Zone).
   - Index Futures (NQ, ES, YM): 08:30 AM to 11:00 AM EST (Equity Open Window) and 13:30 PM to 15:30 PM EST (Afternoon PM Window).
3. Risk Management: 1% to 2% maximum equity risk per setup.`
      },
      {
        id: '36.2',
        title: '36.2 The Setup Sequence: Raids, Displacement & MSS',
        content: `Model 13 follows a rigorous four-step execution blueprint:

Step 1: The Liquidity Raid
- Bearish Setup: Price executes a rapid raid into the AM Session Highs, Lunch Hour Highs, or Previous Day High.
- Bullish Setup: Price executes a rapid raid into the AM Session Lows, Lunch Hour Lows, or Previous Day Low.
- The raid purges buy stops or sell stops, absorbing retail orders into institutional books.

Step 2: Rapid Market Structure Shift (MSS)
- Immediately following the raid, look for a sharp, energetic price movement in the opposite direction.
- On the 5-minute down to 1-minute chart, price must close with a full candle body beyond a recent swing low (for bearish) or swing high (for bullish).
- If the shift occurs with wicks only, the setup is invalid. Candle bodies validate true displacement.

Step 3: Fair Value Gap Formation at Equilibrium
- The displacement leg must leave behind a clean 3-candle Fair Value Gap.
- For a Bearish Setup: The FVG must ideally sit at or above the 50% Equilibrium of the displacement range.
- For a Bullish Setup: The FVG must ideally sit at or below the 50% Equilibrium of the displacement range.`
      },
      {
        id: '36.3',
        title: '36.3 Charter Amplified Lecture: Limit Orders & Protection',
        content: `In the Charter Lecture dedicated to Model 13, ICT details exact order placement mechanics:

Order Execution:
- Bearish Entry: Place a sell limit order at the high of the discount candle (lower boundary) of the Fair Value Gap, or at its 50% Consequent Encroachment.
- Bullish Entry: Place a buy limit order at the low of the premium candle (upper boundary) of the Fair Value Gap, or at its 50% Consequent Encroachment.

Stop Loss Protection:
- For a Bearish Setup: Place the stop loss 1 tick above the swing high established during the liquidity raid. If the FVG is exceptionally large, place the stop above the high of the first candle forming the gap.
- For a Bullish Setup: Place the stop loss 1 tick below the swing low established during the liquidity raid.

Target Extraction:
- Target opposing Discount or Premium PD Arrays at or below Equilibrium.
- Previous session lows, previous day low, or equal relative lows with resting sell-side liquidity.`
      },
      {
        id: '36.4',
        title: '36.4 The Master Taxonomy: Comparative Synthesis of All 13 Models',
        content: `With all 13 ICT Charter Price Action Models unified, the institutional trader possesses a complete algorithmic toolkit tailored for every trading horizon:

- Intraday Scalping: Model 1 (10-30 pips via 20-Day IPDA & OTE), Model 11 (30 pips via Daily High/Low runs), and Model 12 (20 pips via OB/FVG synergy).
- Session Day Trading: Model 5 (40-60 pips via London Judas & NY continuation) and Model 13 (The 2022 flagship sweep + MSS + FVG framework).
- Weekly Precision & Compounding: Model 2 (50-100 pips via Tuesday Low of the Week), Model 8 (Disciplined 25 pips/week compounding engine), and Model 9 (One Shot One Kill sniper delivery).
- Dealing Range Mastery: Model 6 (Universal Buyside Range Expansion), Model 7 (The Sell-Side Curve & Market Maker Models), and Model 10 (50% Equilibrium Dealing Range swings).
- Macro & Swing Horizons: Model 3 (100-300 pips via Commercial COT Hedging) and Model 4 (300-1,000 pips via Quarterly Shifts & Seasonal Tendencies).

Every model obeys the same universal laws of time and price: liquidity must be swept, displacement must confirm intent, and price must rebalance into institutional imbalances before launching into the true Draw on Liquidity.`
      }
    ]
  }
];

