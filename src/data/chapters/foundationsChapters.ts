import { TextbookChapter } from '../../types';

export const foundationsChapters: TextbookChapter[] = [
  // CHAPTER 1: What Actually Moves Price?
  {
    id: 1,
    slug: 'what-actually-moves-price',
    part: 'Part I - Market Foundations',
    title: 'What Actually Moves Price? — The Mechanics of the Electronic Auction',
    quote: "Each executed trade has equal bought and sold quantity. Transaction prices and quoted prices are different: trading, new orders and cancellations all matter when interpreting the auction.",
    level: 0,
    summary: [
      'The foundational fallacy: Why "more buyers than sellers" is mathematically and mechanically impossible.',
      'The Central Limit Order Book (CLOB): How passive bids and asks form liquidity queues.',
      'Aggressive market orders vs. passive limit orders: The true catalyst of price change.',
      'Slippage, market impact, and liquidity voids: Why large institutional participants cannot enter like retail traders.',
      "ICT-style liquidity interpretation: distinguish a visible sweep from an unverified claim about who caused it."
    ],
    keyTerms: [
      { term: 'Central Limit Order Book (CLOB)', definition: 'The centralized, deterministic electronic ledger maintained by an exchange matching engine that tracks all outstanding limit orders sorted by price and arrival time.' },
      { term: 'Passive Liquidity', definition: 'Resting limit orders (bids below price, asks above price) that wait in the book to be filled, providing the counterparty volume necessary for market orders.' },
      { term: 'Aggressive Liquidity / Market Orders', definition: 'Orders submitted with immediate execution priority that cross the bid-ask spread and consume resting passive liquidity.' },
      { term: 'Market Impact', definition: 'The degree of price movement caused by an order consuming multiple price tiers of the order book due to insufficient resting depth at the top of the book.' },
      { term: 'Liquidity Void', definition: "A chart label for rapid movement through a range with limited candle overlap; it does not establish that no two-sided trades occurred." }
    ],
    practiceQuestions: [
      'If every transaction requires exactly one buyer and one seller in equal volume, why does price move at all?',
      'What specific mechanism causes a candle to print a large displacement body on the chart?',
      'Why is an institution with $500M unable to simply click "buy at market" without destroying their own average fill price?',
      'How does the concept of resting limit orders relate to ICT liquidity pools and retail stop clusters?',
      'What is the structural difference between a deep, liquid order book and a thin, illiquid order book during high-impact news?'
    ],
    sections: [
      {
        id: '1.1',
        title: '1.1 The Great Fallacy: "More Buyers Than Sellers"',
        content: "Every executed trade matches bought and sold quantity. This does not mean there are equal numbers of interested people or equal quantities of unexecuted orders. One participant can trade with several counterparties.\n\nOn an exchange order book, an aggressive order can consume the best available quote and trade at further levels. A marketable limit order can do this too, subject to its limit. Quotes can also move when resting orders are added, amended or cancelled, even before another trade occurs.\n\nDistinguish the last transaction price from the current bid and ask. This is an introduction to an exchange auction, not a complete model of every market. Spot foreign exchange is fragmented across venues and dealers rather than one consolidated exchange order book.",
        keyTakeaway: "Matched trade quantity is equal on both sides. Quotes can change through order additions and cancellations as well as executions."
      },
      {
        id: '1.2',
        title: '1.2 Inside the Matching Engine: Bids, Asks, and the Spread',
        content: "The best bid is the highest displayed buying price; the best ask is the lowest displayed selling price. Their difference is the spread. Displayed depth is only the visible portion of liquidity on that venue.\n\nA buy market order or marketable buy limit order can execute against the ask. A sell market order or marketable sell limit order can execute against the bid. If the available quantity is insufficient, execution may continue at other prices, subject to the order type and venue rules.\n\nAdding a better-priced resting order can improve a quote without a trade. Cancelling the best quote can expose a worse one. It is therefore inaccurate to say that only market orders move price. Hidden orders, routing, auctions and dealer markets require additional explanation.",
        keyTakeaway: "Separate the visible order book, execution prices and changes in quotes; they are related but different observations."
      },
      {
        id: '1.3',
        title: '1.3 The Institutional Liquidity Dilemma',
        content: "Large orders can face market impact because the desired quantity exceeds available liquidity. Small orders can also suffer slippage during fast markets or poor liquidity; an exact screen price and fixed execution time are not guaranteed.\n\nStops may cluster near obvious highs or lows, but a candle does not reveal their quantity, owners or purpose. A triggered stop-market order can add aggressive flow. A stop-limit order behaves differently and may remain unfilled. Confirm the instrument and broker rules.\n\nIn ICT-style chart study, a move through a prior high or low followed by rejection may be labelled a liquidity sweep. Treat the inferred orders and institutional motives as a hypothesis. The same level can break and continue; the chart alone does not establish deliberate manipulation.",
        keyTakeaway: "A sweep describes price behavior. The size of hidden stops and the identity or intent of counterparties cannot be established from candles alone."
      }
    ]
  },

  // CHAPTER 2: How an Exchange Matches Orders
  {
    id: 2,
    slug: 'how-an-exchange-matches-orders',
    part: 'Part I - Market Foundations',
    title: 'How an Exchange Matches Orders — Price-Time Priority and Liquidity Dynamics',
    quote: "Matching and allocation rules depend on the exchange and product. FIFO, pro-rata and hybrid systems exist; a queue rule is not evidence of a participant’s trading intent.",
    level: 0,
    summary: [
      'The deterministic matching engine: How orders are processed on modern electronic exchanges.',
      'Price-Time Priority (FIFO) vs. Pro-Rata allocation models.',
      'Crossing the spread: Maker vs. Taker economics and fee structures.',
      'Iceberg orders and hidden liquidity: How smart money masks institutional size.',
      'Cumulative Delta and order flow imbalance: Detecting institutional absorption before price breaks out.'
    ],
    keyTerms: [
      { term: 'FIFO (First-In, First-Out)', definition: 'The dominant exchange matching rule where orders at the same price level are executed in the exact chronological order of their arrival.' },
      { term: 'Maker-Taker Model', definition: 'The exchange fee structure that pays rebates to participants who provide resting liquidity (makers) and charges higher fees to participants who consume liquidity (takers).' },
      { term: 'Iceberg Order', definition: 'A synthetic institutional order that displays only a small fraction of its total volume in the public order book, automatically replenishing as chunks are executed.' },
      { term: 'Absorption', definition: 'The process where an institutional limit order absorbs heavy incoming aggressive market orders at a single price level without allowing price to advance past it.' },
      { term: 'Cumulative Volume Delta (CVD)', definition: 'The running cumulative difference between aggressive buying volume at the ask and aggressive selling volume at the bid over time.' }
    ],
    practiceQuestions: [
      'What happens to a trader’s queue position in a FIFO matching engine if they modify the price or increase the size of their limit order?',
      'How does an institution utilize an iceberg order to accumulate a massive position without signaling their intent to retail DOM watchers?',
      'If Cumulative Volume Delta is making higher highs while price is making lower highs, what institutional phenomenon is taking place?',
      'Why do High-Frequency Trading (HFT) firms fight for microsecond latency in order book queues?',
      'How does the maker-taker rebate model incentivize market makers to continuously quote two-sided prices?'
    ],
    sections: [
      {
        id: '2.1',
        title: '2.1 The Two Fundamental Matching Engine Rules',
        content: "In a simplified continuous order book, better-priced eligible orders receive priority. Under FIFO, orders at the same price are generally matched in time order. Exchanges also use pro-rata and hybrid allocation; do not apply FIFO examples to every product.\n\nChanging an order can affect its queue priority. The result depends on the venue, product and amendment: increasing quantity or changing price may lose priority, while reducing quantity may be treated differently. Check the relevant exchange rules rather than assuming a universal reset.\n\nFor a paper exercise, place two same-price orders in a FIFO queue and allocate a smaller incoming order. Then repeat using proportional allocation. The example explains a matching rule, not how to predict a future candle.",
        keyTakeaway: "Verify product-specific allocation and amendment rules; price-time priority is one matching model, not a universal description."
      },
      {
        id: '2.2',
        title: '2.2 Maker vs. Taker Economics & Exchange Incentives',
        content: `To understand why liquidity exists in the markets, you must understand exchange economics. Exchanges earn revenue by facilitating trades. To attract high-volume participants, exchanges created the Maker-Taker Fee Model:

- Liquidity Makers (Passive Limit Orders): Participants who submit limit orders that sit in the book and provide depth are rewarded. In many equity and futures venues, makers are paid an exchange rebate per contract or share traded.
- Liquidity Takers (Aggressive Market Orders): Participants who submit market orders or marketable limit orders that cross the spread and consume liquidity are charged the highest fee rates.

Institutional market-making algorithms (such as Citadel Securities, Virtu Financial, Jump Trading) operate automated systems that continuously quote bids and asks simultaneously, capturing the bid-ask spread and collecting exchange maker rebates millions of times per day.

However, when market volatility surges—such as during high-impact macroeconomic announcements (CPI, FOMC, NFP)—these automated market makers pull their resting limit orders from the book within microseconds to avoid adverse selection. This sudden evaporation of resting limit orders causes the bid-ask spread to widen dramatically, leading to the vertical price spikes and Fair Value Gaps (FVG) that ICT traders specialize in reading.`,
        keyTakeaway: 'Market makers quote both sides of the book to harvest spreads and maker rebates; when they retract during volatility, liquidity voids and Fair Value Gaps are born.'
      },
      {
        id: '2.3',
        title: '2.3 Institutional Absorption and Cumulative Volume Delta',
        content: `One of the most powerful institutional footprints visible in electronic tape reading is Absorption.

Suppose price is declining toward a key daily support level. Aggressive retail sellers, observing the bearish momentum, flood the exchange with market sell orders. On your candlestick chart, you see heavy volume.

Yet, price abruptly stops falling and refuses to drop another tick. Why?
Behind the scenes, an institutional participant has positioned a massive passive limit buy order (or an automated Iceberg order that continuously reloads 100 contracts every time 100 contracts are hit).

Every single aggressive market sell order that retail participants throw into the market is swallowed by this institutional limit order. This is Absorption: aggressive selling is being absorbed by passive institutional buying.

Traders who monitor Cumulative Volume Delta (CVD)—the net difference between market buying and market selling volume—will observe a telltale divergence:
- CVD continues plunging to lower lows (indicating aggressive market sellers are dominating volume).
- Price forms an equal low or higher low (proving that passive limit buyers are absorbing all the selling).

Once the retail sellers exhaust their ammunition, the institutional buyer ceases their passive limit orders and submits aggressive buy orders into the thinned-out order book above. Price launches upward with vertical velocity, leaving late breakout sellers trapped at the dead bottom of the range.`,
        keyTakeaway: 'Absorption occurs when passive institutional limit orders soak up aggressive retail momentum, setting the stage for an explosive reversal.'
      }
    ]
  },

  // CHAPTER 3: The Order Book in Depth
  {
    id: 3,
    slug: 'the-order-book-in-depth',
    part: 'Part I - Market Foundations',
    title: 'The Order Book in Depth — DOM Microstructure, Spoofing, and True Liquidity',
    quote: 'The visible Depth of Market (DOM) is often a hall of mirrors designed to deceive retail chartists. True institutional liquidity hides behind algorithmic execution schedules, iceberg slices, and intermarket correlation matrices.',
    level: 0,
    summary: [
      'Level 1 (Top of Book) vs. Level 2 (Depth of Market) vs. Level 3 (Full Order Log).',
      'The anatomy of Spoofing: How algorithms flash phantom orders to manipulate retail sentiment.',
      'TWAP and VWAP algorithmic execution engines: How institutions distribute orders over time.',
      'Why candlestick charts are delayed representations of order book activity.',
      'Connecting order book microstructure to higher-timeframe ICT PD arrays.'
    ],
    keyTerms: [
      { term: 'Depth of Market (DOM)', definition: 'A visual ladder displaying the cumulative quantity of resting limit bids and asks at each price tick above and below the current market price.' },
      { term: 'Spoofing', definition: 'The illegal yet prevalent algorithmic practice of placing large, non-bona fide limit orders with the intention of canceling them right before execution to create false impression of supply/demand.' },
      { term: 'TWAP (Time-Weighted Average Price)', definition: 'An execution algorithm that breaks a large block order into micro-slices executed at regular time intervals throughout a session.' },
      { term: 'VWAP (Volume-Weighted Average Price)', definition: 'The benchmark ratio of total dollar volume traded relative to total volume over a specific time horizon, used by institutional desks to measure fill quality.' },
      { term: 'Adverse Selection', definition: 'The risk faced by limit order placers that their order will only be filled when the market is moving violently against them.' }
    ],
    practiceQuestions: [
      'Why can a trader not simply rely on large resting orders shown on the Level 2 DOM to identify support or resistance?',
      'How does an institution use a TWAP algorithm across the London and New York sessions to accumulate inventory quietly?',
      'What happens to resting limit orders on the DOM when a high-impact news release prints on the economic calendar?',
      'How does an understanding of DOM microstructure demystify the concept of an ICT "Order Block"?',
      'What is the structural relationship between a high-volume node in market profile and resting limit order queues in the DOM?'
    ],
    sections: [
      {
        id: '3.1',
        title: '3.1 The Three Levels of Market Data',
        content: `In modern financial trading, market participants subscribe to different tiers of market data provided by exchanges:

1. Level 1 (Top of Book):
Displays only the current Best Bid, Best Ask, their respective sizes, and the last traded price/volume. Most basic retail charting packages only provide Level 1 data.

2. Level 2 (Depth of Market / DOM):
Displays the Best Bid and Ask plus several tiers (typically 5, 10, or 20 ticks) of resting limit orders above and below the market. It reveals the visible liquidity waiting in the price queues.

3. Level 3 (Order-by-Order / ITCH / CME MDP 3.0):
The raw feed used by institutional algorithmic trading firms. It provides a real-time event log of every individual order submitted, modified, executed, or canceled with nanosecond timestamps.

Retail traders looking at Level 2 DOM often fall into a classic psychological trap: they see a massive 2,000-contract resting buy order 10 ticks below current price and assume: "There is strong support here; I should go long!"

In reality, smart institutional traders know that retail traders look at Level 2. That 2,000-contract order is frequently a Spoof—placed by an algorithmic dealer to manipulate retail sentiment, only to be canceled 5 milliseconds before price arrives. True institutional accumulation rarely shows its full hand on the public DOM.`,
        keyTakeaway: "Displayed depth is a partial view of liquidity. Cancellation alone does not establish spoofing; intent cannot be inferred from a large order disappearing."
      },
      {
        id: '3.2',
        title: '3.2 Algorithmic Execution: TWAP, VWAP, and Icebergs',
        content: `When an investment bank or mutual fund receives a client order to buy 20,000 contracts of crude oil or $500M worth of British Pounds, the head of the trading desk does not place a single order. Instead, they route the trade through algorithmic execution suites:

1. TWAP (Time-Weighted Average Price):
Divides the total order into equal micro-slices (e.g., 25 contracts every 90 seconds) executed continuously across a designated time window (such as the 3-hour London Open Killzone). This prevents sudden price spikes and distributes market impact smoothly across time.

2. VWAP (Volume-Weighted Average Price):
Matches the historical intraday volume curve. If 40% of daily volume occurs during the New York Open (09:30 - 11:00 AM EST), the algorithm executes 40% of its allocation during that specific window, scaling down during the low-volume New York lunch hour (12:00 - 13:00 EST).

3. Iceberg Execution:
Only shows 10 contracts on the public DOM. When an aggressive seller hits those 10 contracts, the matching engine instantly refills another 10 contracts from the hidden order reserve at the same price. To an external observer, it looks like a bottomless pit of demand that refuses to let price pass.

When you observe an ICT Order Block on a daily or 4-hour chart, you are not looking at a magic line—you are looking at the price zone where an institutional execution algorithm was actively working an iceberg order or VWAP accumulation schedule!`,
        keyTakeaway: 'Institutions use automated algorithms like TWAP, VWAP, and Icebergs to hide their true size. ICT Order Blocks mark the physical footprints where these execution schedules were anchored.'
      }
    ]
  },

  // CHAPTER 4: Liquidity: The Most Misunderstood Word in Trading
  {
    id: 4,
    slug: 'liquidity-the-most-misunderstood-word-in-trading',
    part: 'Part I - Market Foundations',
    title: 'Liquidity: The Most Misunderstood Word in Trading — Buy-Side and Sell-Side Pools',
    quote: 'Liquidity is not volume. Liquidity is the willingness of market participants to transact at a given price. Where retail traders place their stop loss orders, smart money finds the liquidity necessary to feed their institutional appetite.',
    level: 0,
    summary: [
      'Deconstructing the retail definition of liquidity vs. the institutional reality.',
      'Buy-Side Liquidity (BSL): Equal Highs, Swing Highs, and Breakout Buyer stops.',
      'Sell-Side Liquidity (SSL): Equal Lows, Swing Lows, and Breakdown Seller stops.',
      'Internal Range Liquidity (IRL) vs. External Range Liquidity (ERL) delivery cycles.',
      'The Turtle Soup pattern: Deconstructing false breakouts into institutional liquidity grabs.'
    ],
    keyTerms: [
      { term: 'Buy-Side Liquidity (BSL)', definition: 'A pool of resting buy stop orders located above an old swing high or equal highs, representing short-seller stop losses and aggressive breakout buy orders.' },
      { term: 'Sell-Side Liquidity (SSL)', definition: 'A pool of resting sell stop orders located below an old swing low or equal lows, representing long-trader stop losses and aggressive breakdown sell orders.' },
      { term: 'External Range Liquidity (ERL)', definition: 'The structural high or low boundaries of a higher-timeframe dealing range where major stop pools reside.' },
      { term: 'Internal Range Liquidity (IRL)', definition: 'Fair Value Gaps, Inversion FVGs, and Order Blocks located inside a dealing range between the structural extremes.' },
      { term: 'Turtle Soup', definition: 'An ICT price action pattern where price sweeps beyond a key high or low to purge resting stops before immediately reversing back inside the established range.' }
    ],
    practiceQuestions: [
      'Why do retail traders consistently place their stop loss orders in the exact locations where institutions look to enter?',
      'What mechanical event takes place in the order book when price trades 2 ticks above a triple-top Equal High (EQH)?',
      'Explain the permanent algorithmic oscillation between Internal Range Liquidity (IRL) and External Range Liquidity (ERL).',
      'How does an ICT trader determine whether a penetration of a key high is a genuine breakout or a liquidity raid?',
      'Why does a liquidity sweep often produce an immediate, high-velocity displacement candle in the opposite direction?'
    ],
    sections: [
      {
        id: '4.1',
        title: '4.1 Redefining Liquidity: Where the Stops Reside',
        content: `In orthodox finance textbooks, liquidity is vaguely defined as "how easily an asset can be converted into cash without affecting its price."

In ICT and Smart Money Concepts, liquidity has a precise, tactical definition:
Liquidity is the concentration of resting Stop Orders and Pending Limit Orders clustered at identifiable price levels on a chart.

Every retail trading book published over the last fifty years teaches students the exact same dogma:
- "If you buy at support, put your stop loss a few ticks below the swing low."
- "If you sell at resistance, put your stop loss a few ticks above the swing high."
- "If you trade a double top or triple top, place your stop loss right above the cluster of highs."

Consider the catastrophic consequence of this collective retail conditioning:
Millions of independent retail traders, algorithmic retail bots, and prop firm candidates around the globe look at the exact same charts and place their stop orders in the exact same microscopic price clusters!

These clusters are not invisible. They are:
1. Buy-Side Liquidity (BSL): Placed above swing highs, session highs (PDH, PWH), and Equal Highs (EQH). It consists of:
   - Buy Stop orders belonging to short sellers (protecting their trades).
   - Buy Stop orders belonging to momentum breakout traders (anticipating a rally).
2. Sell-Side Liquidity (SSL): Placed below swing lows, session lows (PDL, PWL), and Equal Lows (EQL). It consists of:
   - Sell Stop orders belonging to long buyers (protecting their trades).
   - Sell Stop orders belonging to breakdown sellers (anticipating a plunge).

To an institutional trader, these pools are the primary objective on the chart. Price is drawn to these pools like metal to a magnet.`,
        keyTakeaway: 'Liquidity is the concentration of resting retail stop orders. Retail traders cluster their stops in identical, predictable locations, creating high-density target pools for institutions.'
      },
      {
        id: '4.2',
        title: '4.2 The Mechanical Sweep: What Happens When a Pool Is Hit',
        content: `Let us trace the order book mechanics of an institutional Buy-Side Liquidity (BSL) Sweep:

Suppose the market has established a clean, obvious double top at 15,000 on the Nasdaq. Retail traders label this "Strong Resistance" and enter short positions, placing their buy stops at 15,005.

1. The Inducement Phase:
The institutional algorithm engineers price upward toward 15,000. Retail sellers feel confident and add to their short positions, increasing the density of buy stops at 15,005.

2. The Sweep / Purge Phase:
The algorithm delivers price through 15,000, reaching 15,008. The moment price hits 15,005:
- Thousands of retail buy-stop orders are triggered simultaneously.
- Mechanically, a buy-stop order becomes an aggressive Market Buy Order!
- Breakout traders who watch the level also submit market buy orders, shouting: "Resistance has broken, buy the breakout!"
- A massive tidal wave of market buy volume floods into the exchange matching engine.

3. The Institutional Absorption Phase:
Who is on the other side selling to all these eager buyers?
The smart money institutions!
The institutions use this sudden flood of incoming market buy orders as the counterparty liquidity to fill their massive institutional Short Positions without experiencing negative slippage.

4. The Displacement Reversal:
Once the retail buy stops are fully consumed, the institutional selling completely overwhelms what is left of the order book. Price violently collapses back below 15,000, leaving a long upper wick on the candlestick. The retail breakout buyers are trapped in instant drawdown, and the retail short sellers who were stopped out watch in horror as the market delivers straight toward their original target without them.`,
        keyTakeaway: 'When price sweeps an old high, retail buy stops convert into market buy orders, providing the exact counterparty volume institutions need to fill institutional short orders.'
      },
      {
        id: '4.3',
        title: '4.3 The Universal Algorithmic Loop: IRL to ERL',
        content: `One of the most profound principles revealed in ICT mentorship is that financial price delivery is not random; it operates in an endless, programmatic loop between two states:

Internal Range Liquidity (IRL) ⟷ External Range Liquidity (ERL)

1. Phase 1: Expansion to External Range Liquidity (ERL)
Price expands aggressively toward the outer boundary of the current dealing range to purge an old swing high (BSL) or old swing low (SSL).

2. Phase 2: Retracement to Internal Range Liquidity (IRL)
Once external liquidity has been raided and institutional orders have been filled, price reverses and retraces back inside the dealing range toward an internal imbalance—specifically a Fair Value Gap (FVG) or an institutional Order Block (OB).

3. Phase 3: The Next Expansion
At the internal PD array (IRL), the institutional algorithm refuels its position and initiates a new expansion wave toward the opposing External Range Liquidity boundary.

If you ever find yourself lost on a chart, ask yourself this single diagnostic question:
"Has price just raided External Liquidity, or has it just tapped Internal Liquidity?"
- If price just swept an external swing high, do not buy the breakout! Expect a retracement into an internal FVG or discount OB.
- If price just mitigated an internal discount FVG inside an overall bullish market, expect an expansion toward the external swing high.`,
        keyTakeaway: 'Price permanently oscillates in a closed loop: from External Liquidity (stops beyond highs/lows) into Internal Liquidity (imbalances and order blocks inside the range), and back again.'
      }
    ]
  },

  // CHAPTER 5: Why Candles Form & How Displacement Arises
  {
    id: 5,
    slug: 'why-candles-form-and-how-displacement-arises',
    part: 'Part I - Market Foundations',
    title: 'Why Candles Form & How Displacement Arises — Deconstructing Time and Price Containers',
    quote: 'Wicks tell you what price rejected; bodies tell you where the volume actually transacted. Displacement is the unmistakable signature of institutional capital moving with algorithmic urgency.',
    level: 0,
    summary: [
      'Deconstructing candlestick anatomy: Open, High, Low, Close (OHLC) as time containers.',
      'Candle bodies vs. candle wicks: The institutional distinction between narrative and noise.',
      'The definition and mechanics of Displacement: Recognizing true smart money participation.',
      'How displacement creates structural imbalances and Fair Value Gaps (FVG).',
      'The Three-Candle Delivery Cycle: Foundation, Expansion, and Continuation.'
    ],
    keyTerms: [
      { term: 'Displacement', definition: 'An aggressive, sudden expansion in price characterized by large-bodied candlesticks with minimal wicks, signaling that institutional algorithms have cleared one side of the order book.' },
      { term: 'Candle Body', definition: 'The rectangular area between the open and close price, representing where the overwhelming majority of transaction volume and institutional conviction took place.' },
      { term: 'Candle Wick / Shadow', definition: 'The thin line extending above or below the body representing price exploration and rapid liquidity rejection where little volume was sustained.' },
      { term: 'Imbalance Delivery', definition: 'A vertical price advance where only one side of the order book (buy-side or sell-side) was offered, leaving a void that the algorithm must later rebalance.' },
      { term: 'Relative Volume (RVOL)', definition: 'The comparative ratio of trading volume within a specific candle relative to the average historical volume for that identical time-of-day interval.' }
    ],
    practiceQuestions: [
      'Why does ICT emphasize that "the body tells the story, while the wick does the damage"?',
      'What specific characteristics differentiate an authentic institutional displacement candle from a low-volume retail spike?',
      'Why is displacement mandatory when identifying a valid Market Structure Shift (MSS)?',
      'How does an aggressive displacement candle alter the resting limit orders in the order book immediately after it prints?',
      'If a candle has a long lower wick that penetrates an old low but its body closes firmly back above the low, what does this indicate regarding institutional order flow?'
    ],
    sections: [
      {
        id: '5.1',
        title: '5.1 Candlesticks as Time Containers: Wicks vs. Bodies',
        content: `Candlestick charts are the standard visual language of traders, yet few comprehend what a candlestick actually represents.

A candlestick is an arbitrary time container. A 5-minute candle simply records four data points over a 300-second window: the first transaction (Open), the highest transaction (High), the lowest transaction (Low), and the final transaction (Close).

In ICT analysis, the distinction between Wicks and Bodies is paramount:
- The Body Represents Conviction & Volume: The open-to-close body represents where the majority of trades were accepted and cleared. If a candle body is large and closes near its extreme, it proves that one side of the market maintained relentless aggressive pressure throughout the entire time window.
- The Wick Represents Liquidity Raids & Price Rejection: A wick is a temporary excursion. It shows that price probed into a price tier, triggered resting orders (such as stops), encountered overwhelming counterparty absorption, and was rejected back before the time container closed.

As Michael J. Huddleston repeatedly states:
"The body of the candle represents the true institutional intent. The wicks are where the manipulation and stop-harvesting take place."

When analyzing key structural levels (such as swing highs or swing lows), never judge a breakout by the wick alone. If a candle's wick trades above resistance but its body closes below resistance, the market has not broken structure—it has simply executed a liquidity sweep!`,
        keyTakeaway: 'Bodies represent true institutional volume and directional commitment; wicks represent temporary liquidity probes and stop raids.'
      },
      {
        id: '5.2',
        title: '5.2 The Anatomy of Displacement',
        content: `What is Displacement?
Displacement is the unmistakable visual and mechanical signature of institutional participation.

When retail traders are trading amongst themselves during quiet market hours, candlesticks are small, choppy, and filled with overlapping wicks. Bids and asks are balanced, and volume is modest.

When an institutional algorithm receives an execution mandate—often synchronized with an interbank Killzone or economic data release—it does not gently place limit orders. It executes aggressive market orders that shred through multiple price tiers.

The Three Non-Negotiable Anatomy Rules of a True Displacement Candle:
1. Disproportionate Body Size: The body of the candle is significantly larger than the previous 5 to 10 candles. It represents an explosive departure from the preceding price consolidation.
2. Minimal Wicks: The candle opens, immediately expands, and closes near its extreme high (for bullish displacement) or extreme low (for bearish displacement), demonstrating that the opposing side was utterly unable to push price back.
3. Creation of an Imbalance (Fair Value Gap): The velocity of the move is so intense that the wicks of the candles immediately preceding and following the displacement candle do not overlap, leaving a clean three-candle price imbalance.

Displacement is the filter that protects you from false breakouts. If you see price cross an old high with small, hesitant candles, it is a low-probability move. But when price sweeps a liquidity pool and then launches in the opposite direction with an unmistakable displacement candle, you have confirmed that smart money has stepped into the arena.`,
        keyTakeaway: 'Displacement is the footprint of smart money. Large bodies, tiny wicks, and clean Fair Value Gaps prove that institutions have cleared the order book.'
      }
    ]
  }
];
