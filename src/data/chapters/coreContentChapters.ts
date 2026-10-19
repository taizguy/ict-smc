import { TextbookChapter } from "../../types";

export const coreContentChapters: TextbookChapter[] = [
  {
    id: 37,
    slug: 'core-content-month-1-elements-of-trade-setup',
    title: 'ICT Core Content Month 1: Elements of a Trade Setup & Market Conditions',
    part: 'Part XI - ICT Mentorship Core Content Master Curriculum',
    level: 3,
    quote: 'Before you look at a single setup, you must know what condition the market is in. Is it expanding, retracing, reversing, or consolidating? Context precedes execution.',
    summary: [
      'The foundational division between Smart Money (liquidity providers) and Uninformed Money (speculators).',
      'The 4 Interbank Market Conditions: Expansion, Retracement, Reversal, and Consolidation.',
      'Equilibrium versus Discount and Premium valuation models in dealing ranges.',
      'How liquidity runs and stop hunts engineer the fuel necessary for institutional order fulfillment.'
    ],
    keyTerms: [
      { term: 'Smart Money', definition: 'Central banks, sovereign wealth funds, and mega-institutions that act as net liquidity providers and drive algorithmic delivery.' },
      { term: 'Uninformed Money', definition: 'Retail and speculative market participants whose resting stops provide liquidity for smart money.' },
      { term: 'Expansion', definition: 'Rapid, directional price movement leaving imbalance, moving toward a liquidity objective.' },
      { term: 'Retracement', definition: 'A temporary counter-trend pullback within an established impulse leg to rebalance price into discount or premium.' },
      { term: 'Reversal', definition: 'Price sweeping a key liquidity pool and forcefully changing direction via a Market Structure Shift.' },
      { term: 'Consolidation', definition: 'Horizontal price action where institutional orders are accumulated or distributed before an expansion.' }
    ],
    practiceQuestions: [
      'What are the 4 fundamental market conditions identified in Month 1 of ICT Mentorship?',
      'Why is the 50% Equilibrium line critical when deciding whether to buy or sell an asset?',
      'How do market makers use stop hunts to condition retail traders into holding losing positions?'
    ],
    sections: [
      {
        id: '37.1',
        title: '37.1 Smart Money vs. Uninformed Money: Liquidity Providers vs. Speculators',
        content: `In ICT Core Content Month 1, Michael Huddleston lays down the foundational premise of Smart Money Concepts: financial markets do not operate on textbook retail supply and demand. They are managed by algorithmic systems (the Interbank Price Delivery Algorithm, or IPDA) designed to provide liquidity to large banking institutions.

Smart Money entities (central banks, sovereign wealth funds, Tier-1 interbank dealing desks) operate at volumes so vast that they cannot simply click 'market buy' or 'market sell'. They must engineer counterparty liquidity:
- When Smart Money wants to buy hundreds of millions in currency, they must find willing sellers—meaning they drive price below old swing lows to trigger retail sell stop losses.
- When Smart Money wants to sell, they drive price above old swing highs to trigger retail buy stop losses.
Retail traders are uninformed speculators who trade reactionary chart patterns, while Smart Money acts as the counterparty absorbing those emotional transactions.`
      },
      {
        id: '37.2',
        title: '37.2 The 4 Interbank Market Conditions',
        content: `Every tick of price delivery falls into one of four distinct states:

1. Expansion: Price accelerates away from an equilibrium price point with high velocity, leaving Fair Value Gaps and displaced candles. This signals active institutional sponsorship seeking the next liquidity pool.
2. Retracement: Price eases back into the range of recent expansion, rebalancing inefficiencies into a Fair Value Gap, Order Block, or Optimal Trade Entry (OTE 62%-79%) level.
3. Reversal: Price reaches an external liquidity target or Higher Timeframe PD Array, rejects violently, and shifts internal market structure (MSS).
4. Consolidation: Price moves sideways inside a well-defined boundary. This is where market makers accumulate positions and build equal highs (Buy-Side Liquidity) and equal lows (Sell-Side Liquidity) on both sides of the market.`
      },
      {
        id: '37.3',
        title: '37.3 Equilibrium vs. Discount/Premium & Fair Valuation',
        content: `Never buy in Premium; never sell in Discount.

To evaluate any market setup:
1. Define the current Dealing Range from the absolute major swing low to swing high.
2. Calculate the 50% midpoint (Equilibrium).
3. The upper 50% is Premium: where institutional entities seek to distribute long positions and initiate short sales.
4. The lower 50% is Discount: where institutional entities accumulate long positions and cover short trades.

If a trade setup presents a bullish buy signal but sits deep inside Premium, ICT rules strictly forbid execution. You must wait for price to retrace into Discount before deploying risk.`
      },
      {
        id: '37.4',
        title: '37.4 Liquidity Runs & The Impulse Dealing Range',
        content: `A liquidity run is an intentional raid on resting orders:
- Buy Stop Run: Pushing above an established high to trigger breakout buys and short stop-losses, providing the sell liquidity for smart money shorts.
- Sell Stop Run: Pushing below an established low to trigger breakout sellers and long stop-losses, providing the buy liquidity for smart money longs.

Once a liquidity run completes and is met with a sharp displacement, an 'Impulse Price Swing' is born. This impulse swing becomes the new benchmark dealing range used to frame entries.`
      }
    ]
  },
  {
    id: 38,
    slug: 'core-content-month-2-growing-small-accounts',
    title: 'ICT Core Content Month 2: Growing Small Accounts & High-Reward Setups',
    part: 'Part XI - ICT Mentorship Core Content Master Curriculum',
    level: 3,
    quote: "Account growth is an uncertain result of realized wins, losses, costs and sizing. A weekly pip goal is not an income promise.",
    summary: ["Compounding arithmetic versus uncertain realized returns.","Planned reward-to-risk versus expectancy after costs.","Drawdown, contract increments and emotional risk.","Distinguishing retrospective study from real-time execution."],
    keyTerms: [{"term":"Planned reward-to-risk","definition":"The ratio of a proposed profit target to a proposed loss; actual outcomes can differ."},{"term":"Drawdown","definition":"A decline from a prior account-equity peak, measured using a stated balance or equity convention."},{"term":"Contract increment","definition":"The permitted position-size step for a product; it can prevent a small account from matching a chosen risk budget."}],
    practiceQuestions: ["Which assumptions are missing from a smooth compounding projection?","How do costs and realized outcomes change planned reward-to-risk?","What would make the minimum contract size too large for your study budget?"],
    sections: [
      {
        id: '38.1',
        title: "38.1 Compounding Arithmetic Is Not a Return Forecast",
        content: "Compounding changes the base used for later position sizing. It does not supply a positive return. A fixed pip objective cannot determine account growth without the instrument’s pip value, position size, realized losses and costs.\n\nRemove the assumption that a few weeks of pip targets can double or triple equity without catastrophic drawdown risk. Leverage and concentrated exposure can produce severe losses even when each planned stop looks small. A displayed account run-up is not a representative distribution of outcomes.\n\nThe 2022 examples are related study material here; they do not authenticate every earlier Month 2 course label or weekly target. Compare flat and changing position sizes using the same recorded sequence rather than projecting a smooth growth curve."
      },
      {
        id: '38.2',
        title: '38.2 Asymmetric Risk: Framing 3:1 to 5:1+ Reward-to-Risk',
        content: "Reward-to-risk compares a planned target with a planned loss. It does not by itself establish expectancy. In a purely hypothetical ten-trade sequence with four wins of 3R and six losses of 1R, the gross result is +6R before costs. This arithmetic does not establish a 40% win rate or prove that every win realizes its target.\n\nRecord actual average wins, losses, execution costs and unfilled orders. Tightening a stop changes which trades survive and may increase loss frequency. No minimum ratio makes every trade safe, and the 2022 review does not verify a compulsory 3:1 rule for all models."
      },
      {
        id: '38.3',
        title: '38.3 Managing Drawdown as the Operational Cost of Business',
        content: "Episode 41 discusses reducing planned risk after losses rather than doubling exposure to recover quickly. Its percentage sequence is an illustrative teaching rule, not a universally safe allocation or a promise that drawdown stays below a fixed amount.\n\nTranslate a risk budget into the product’s actual contract or lot increment. If the smallest permitted size exceeds the budget, the arithmetic does not justify taking the trade anyway. Gaps, slippage and correlated positions can make realized loss exceed the planned amount.\n\nKeep financial losses visible in the journal; calling a loss an operating cost does not make it harmless. Define a stopping condition for emotional trading and review the strategy rather than assuming recovery must follow."
      },
      {
        id: '38.4',
        title: '38.4 The Anti-FOMO Execution Checklist & Trading Plan Discipline',
        content: "Episode 11 discusses the urge to trade again after a large win and describes using a paper account instead of immediately risking more live capital. Episode 24 discusses accepting a missed move. Neither establishes one compulsory daily trade count or a guaranteed recovery timetable.\n\nFor an original LearnSMC exercise, write your session limit, maximum planned exposure and reasons to stop before replay. Keep learning screenshots separate from actual execution records. Episode 27’s retrospective annotation exercise must not turn a hindsight description into a claimed real-time forecast.\n\nRecord what was known at entry, what was learned afterward and whether the rule was followed. A profitable rule violation is still a violation; a losing compliant example remains part of the evidence."
      }
    ]
  },
  {
    id: 39,
    slug: 'core-content-month-3-institutional-sponsorship-and-traps',
    title: 'ICT Core Content Month 3: Timeframe Selection, Institutional Sponsorship & Traps',
    part: 'Part XI - ICT Mentorship Core Content Master Curriculum',
    level: 3,
    quote: 'Retail chart patterns are not edges—they are roadmaps showing where liquidity is resting. The moment you see a textbook Head & Shoulders or trendline, you are looking at institutional bait.',
    summary: [
      'Top-down timeframe selection across Monthly, Weekly, Daily, and 4-Hour charts.',
      'How to verify genuine Institutional Sponsorship versus retail noise.',
      'The Trendline Phantom: Why retail trendlines create the most vulnerable liquidity pools.',
      'Classical retail traps: Head & Shoulders, Double Tops, and Double Bottoms engineered for stop runs.'
    ],
    keyTerms: [
      { term: 'Institutional Sponsorship', definition: 'Clear evidence of large bank participation manifested by large, energetic displacement candles leaving unmitigated Fair Value Gaps.' },
      { term: 'Trendline Phantom', definition: 'A clean retail trendline where traders stack trailing stop losses, creating a dense line of stop-run liquidity.' },
      { term: 'Engineered Liquidity', definition: 'Price action intentionally formatted to look like textbook technical patterns to attract retail capital.' },
      { term: 'Equal Highs/Lows (EQH/EQL)', definition: 'Symmetrical double or triple highs/lows that retail traders call support/resistance, but institutional algorithms target as liquidity pools.' }
    ],
    practiceQuestions: [
      'Why do retail trendlines create such ideal targets for institutional liquidity runs?',
      'How does an institutional trader trade the classical Head and Shoulders pattern differently from a retail textbook?',
      'What visual evidence confirms that institutional sponsorship is present in a price move?'
    ],
    sections: [
      {
        id: '39.1',
        title: '39.1 Top-Down Timeframe Selection: The Interbank Hierarchy',
        content: `ICT Core Content Month 3 establishes the top-down perspective necessary to avoid getting lost in lower timeframe noise:
- Monthly Chart: Provides macro direction, quarterly shift boundaries, and long-term liquidity targets.
- Weekly Chart: Identifies the weekly range profile, whether Monday/Tuesday will form the high or low of the week, and primary PD Arrays.
- Daily Chart: The workhorse timeframe. Defines the active Dealing Range, daily bias, and key Fair Value Gaps.
- 4-Hour & 1-Hour Charts: Refines internal liquidity runs, Market Structure Shifts, and intermediate order blocks.
- 15-Minute down to 1-Minute: Execution timeframes used strictly for entry timing during killzones.`
      },
      {
        id: '39.2',
        title: '39.2 Determining Institutional Sponsorship',
        content: `Price moves every second, but not all movement is sponsored by institutions. Genuine institutional sponsorship displays distinct signatures:
1. Energetic Displacement: Candlesticks with large full bodies and tiny wicks that violently expand across multiple price levels.
2. Fresh Fair Value Gaps: The displacement moves so quickly that the market cannot pair orders, leaving 3-candle price imbalances.
3. Immediate Invalidation of Opposing PD Arrays: If price is bullishly sponsored, it will slice through retail resistance and bearish order blocks without hesitation.
If candles are choppy, overlapping, and filled with long wicks on both ends, institutional sponsorship is absent. Stay out of the market.`
      },
      {
        id: '39.3',
        title: '39.3 The Trendline Phantom: Engineering Retail Liquidity',
        content: `Retail technical analysis books teach traders to connect three swing lows with a diagonal line and buy every touch. 

ICT calls this the 'Trendline Phantom':
- Every time price bounces off a trendline, retail traders place their stop losses just underneath it.
- As the trendline extends, a massive cluster of resting sell stop orders builds directly below the diagonal line.
- The interbank algorithm recognizes this resting liquidity pool. At the designated killzone, price drops violently through the trendline, harvesting all stop losses in a single sweep before reversing and launching into the true trend.`
      },
      {
        id: '39.4',
        title: '39.4 Classical Retail Traps: Head & Shoulders & Double Tops',
        content: `Retail traders are taught that a Head and Shoulders pattern signifies a reversal and a Double Top represents strong resistance. 

In ICT Core Content Month 3, these patterns are exposed as algorithmic traps:
- In a Head and Shoulders pattern, the 'Head' is simply a liquidity raid on old highs. The 'Right Shoulder' is an accumulation point. Retail traders short the neckline breakdown; Smart Money uses those retail market sells to accumulate long positions at Discount.
- Double Tops and Double Bottoms are the single easiest liquidity pool for algorithms to target. When retail sees 'clean resistance' with two identical peaks, Smart Money sees a giant sign reading: 'Resting Buy Stops Above Here'. The algorithm will run those highs before any real downward move begins.`
      }
    ]
  },
  {
    id: 40,
    slug: 'core-content-month-4-advanced-pd-arrays-and-yields',
    title: 'ICT Core Content Month 4: The 10-Tier PD Array Matrix & The Interest Rate Triad',
    part: 'Part XI - ICT Mentorship Core Content Master Curriculum',
    level: 3,
    quote: 'The PD Array Matrix is an orderly institutional hierarchy. From Mitigation Blocks to Propulsion Blocks and Vacuum Blocks, price delivers through these arrays like train stops on an algorithmic track.',
    summary: [
      'The Interest Rate Triad: US 10-Year, 30-Year Treasury Yields and sovereign bond spreads driving global FX.',
      'Advanced Order Block taxonomy: Order Blocks, Mitigation Blocks, and Breaker Blocks.',
      'Propulsion Blocks and Reclaimed Order Blocks: Identifying momentum acceleration points.',
      'Rejection Blocks, Vacuum Blocks, and Liquidity Void full rebalancing mechanics.'
    ],
    keyTerms: [
      { term: 'Propulsion Block', definition: 'A candle that trades down into an established bullish Order Block and then rejects aggressively. Its body acts as a hyper-sensitive launchpad for rapid expansion.' },
      { term: 'Reclaimed Order Block', definition: 'An old Order Block that was breached, then reclaimed by price from the opposite side, continuing its original sponsorship.' },
      { term: 'Rejection Block', definition: 'Price action where long wicks sweep high/low liquidity while candle bodies respect a key level, indicating extreme directional rejection.' },
      { term: 'Vacuum Block', definition: 'An extreme gap created during unexpected high-impact volatility (news/macro event) that the algorithm later revisits to rebalance.' },
      { term: 'Interest Rate Triad', definition: 'Intermarket analysis of 10-Year Yields, 30-Year Yields, and foreign sovereign yield spreads that reveal macro institutional flow.' }
    ],
    practiceQuestions: [
      'What makes a Propulsion Block significantly more explosive than a standard Order Block?',
      'How does a Rejection Block differ from an Order Block in terms of wick vs body analysis?',
      'Why do Treasury Yields (10Y/30Y) lead currency movements in foreign exchange markets?'
    ],
    sections: [
      {
        id: '40.1',
        title: '40.1 The Interest Rate Triad: The Macro Engine Behind Currencies',
        content: `In Month 4, ICT introduces the institutional macro driver: The Interest Rate Triad. Currencies do not move in a vacuum—they follow sovereign yield differentials.

The Triad consists of:
1. US 10-Year Treasury Yield (TNX / US10Y)
2. US 30-Year Treasury Yield (TYX / US30Y)
3. Foreign Sovereign Yields (e.g., German Bunds for EUR, UK Gilts for GBP)

When US 10-Year Yields rise relative to German Bunds, capital flows into the US Dollar for higher risk-free yield. By tracking whether yields are breaking swing highs or making SMT divergence, an ICT trader knows the true fundamental bias for EUR/USD and GBP/USD days in advance.`
      },
      {
        id: '40.2',
        title: '40.2 The Advanced Order Block Suite: Mitigations & Breakers',
        content: `Month 4 codifies the precise distinctions between Order Blocks, Mitigation Blocks, and Breaker Blocks:
- Bullish Order Block (OB): The lowest down-close candle prior to an upward displacement that breaks market structure.
- Mitigation Block: An order block formed when price fails to make a higher high (a lower high) before breaking market structure. When price returns, trapped institutional orders unwind at breakeven.
- Breaker Block: An order block formed during a liquidity raid. Price makes a higher high (sweeping BSL) and then violently crashes through the swing low. The up-close candle that formed between the swing low and swing high becomes the Bearish Breaker.`
      },
      {
        id: '40.3',
        title: '40.3 Propulsion Blocks & Reclaimed Order Blocks',
        content: `Two of the most powerful and lesser-known arrays taught in Month 4:

1. Propulsion Block:
- Suppose a Bullish Order Block forms at Level A. Price moves up, then retraces down into that Order Block.
- The candle that dips into the Order Block and bounces is the Propulsion Block.
- Because it has already absorbed the liquidity of the underlying Order Block, price will NOT retrace all the way through it. The top of the Propulsion Block's body acts as an immediate springboard for explosive expansion.

2. Reclaimed Order Block:
- A previously established Order Block is breached by price due to short-term volatility.
- Later, price aggressively pushes back above it, reclaiming the level with full candle bodies.
- That Order Block is now 'reclaimed' and acts with renewed institutional support.`
      },
      {
        id: '40.4',
        title: '40.4 Rejection Blocks, Vacuum Blocks & Liquidity Voids',
        content: "A rejection-block study can mark a selected candle-body region near a long wick. Define the boundaries and the candle-completion rule before testing a later return. The wick is a record of price movement, not identification of the traders responsible.\n\nSeparate a discontinuity between adjacent bars from an FVG between outer candles around a traded middle candle. A data gap, session closure and a rapid continuous move are not interchangeable. The feed and session settings affect the appearance.\n\nA rapid low-overlap move may be labelled a liquidity void in chart study. Neither that label nor a true session gap requires a later full fill. Test any revisit hypothesis with failures, elapsed time and costs included."
      }
    ]
  },
  {
  "id": 41,
  "slug": "core-content-month-5-quarterly-shifts-and-position-trading",
  "title": "ICT Core Month 5: Quarterly Shifts, IPDA Lookbacks & Position Risk",
  "part": "Part XI - ICT Mentorship Core Content Master Curriculum",
  "level": 3,
  "quote": "A rolling lookback is a chart-study convention, not proof of a hidden controller or a scheduled reversal.",
  "summary": [
    "A rolling lookback is a chart-study convention, not proof of a hidden controller or a scheduled reversal.",
    "The 20-, 40- and 60-trading-day lookbacks are nested research windows used in this teaching framework. They are not six calendar months. State the anchor date, trading calendar and treatment of the current incomplete session.",
    "Match the invalidation and holding period to the chosen research model. A one-tick buffer outside a monthly swing is not a universal stop rule. Wider stops, correlated positions, contract increments, gaps and financing costs change exposure."
  ],
  "keyTerms": [
    {
      "term": "IPDA lookback",
      "definition": "The 20-, 40- and 60-trading-day lookbacks are nested research windows used in this teaching framework. They are not six calendar months. State the anchor date, trading calendar and treatment of the current incomplete session."
    },
    {
      "term": "Allocation denominator",
      "definition": "The Month 5 money-management example discusses an allocation within capital. A percentage applied to an allocated portion is not the same as that percentage of the whole account. State the denominator, combine simultaneous risk and calculate the potential cash loss before sizing. A stop order does not guarantee the planned exit price."
    }
  ],
  "practiceQuestions": [
    "How do 60 trading days differ from six calendar months?",
    "Which evidence would distinguish an observed range break from inferred institutional intent?"
  ],
  "sections": [
    {
      "id": "41.1",
      "title": "41.1 Quarterly shifts are not a fixed calendar",
      "content": "ICT’s quarterly-shift discussion is a framework for studying changes in delivery over time. The reviewed IPDA lesson explicitly notes that shifts do not always coincide with March, June, September or December. Calendar quarters and a selected rolling observation window are different references.\n\nMark a candidate shift using information available on that date. Record the chosen swing, displacement and invalidation before revealing later prices. Include continuation, delayed and failed examples. Neither the name nor a selected historical chart establishes a reversal every 90–120 days or a 500–1,000 pip outcome."
    },
    {
      "id": "41.2",
      "title": "41.2 Define the rolling lookback precisely",
      "content": "The 20-, 40- and 60-trading-day lookbacks are nested research windows used in this teaching framework. They are not six calendar months. State the anchor date, trading calendar and treatment of the current incomplete session.\n\nFor a selected window, record the highest high, lowest low and midpoint. Premium and discount describe price relative to that selected range; a different anchor can produce a different classification. Being below a midpoint alone does not prove accumulation or supply a long entry. Compare the same rule across unseen data rather than choosing the best-looking window afterward."
    },
    {
      "id": "41.3",
      "title": "41.3 Observed prices versus inferred orders",
      "content": "Open float is used in these lessons to discuss potential resting interest around selected highs and lows. The chart shows traded prices; it does not reveal every pending order, trader identity or a measurable threshold at which institutions must launch a move.\n\nKeep the observation separate from the interpretation: a range boundary and its breach can be measured. Calling that sequence institutional accumulation or a deliberate stop hunt is a model interpretation. Identify what additional order-book or execution data would be needed to test a stronger claim."
    },
    {
      "id": "41.4",
      "title": "41.4 Allocation, position sizing and exit uncertainty",
      "content": "Match the invalidation and holding period to the chosen research model. A one-tick buffer outside a monthly swing is not a universal stop rule. Wider stops, correlated positions, contract increments, gaps and financing costs change exposure.\n\nThe Month 5 money-management example discusses an allocation within capital. A percentage applied to an allocated portion is not the same as that percentage of the whole account. State the denominator, combine simultaneous risk and calculate the potential cash loss before sizing. A stop order does not guarantee the planned exit price."
    }
  ]
},
  {
    id: 42,
    slug: 'core-content-month-6-swing-trading-mastery',
    title: 'ICT Core Content Month 6: Swing Trading Mastery & Commercial COT Hedging',
    part: 'Part XI - ICT Mentorship Core Content Master Curriculum',
    level: 3,
    quote: 'Swing trading is the sweet spot for serious traders. By aligning with Commercial COT Hedging extremes on the Weekly chart, you ride 100 to 300-pip trends over 3 to 10 days with minimal screen time.',
    summary: [
      'Identifying ideal swing trading conditions and explosive market expansion candidates.',
      'High-probability bullish and bearish swing trade setups across Weekly and Daily charts.',
      'Utilizing the Commitment of Traders (COT) Commercial Hedging program to confirm institutional intent.',
      'Managing risk and staged scale-outs across multi-day swing holding periods.'
    ],
    keyTerms: [
      { term: 'Swing Trading', definition: 'Capturing multi-day market price runs (typically 100 to 300 pips) lasting from 3 to 10 trading sessions.' },
      { term: 'COT Commercials', definition: 'The producers, merchants, and multinational banks whose hedging positions reflect true smart money valuation.' },
      { term: 'Open Interest', definition: 'The total number of outstanding derivative contracts; rising open interest during a trend confirms fresh institutional capital.' },
      { term: 'Staged Scale-Out', definition: 'Taking partial profits at 50% Equilibrium, recent session liquidity, and final HTF PD Array targets.' }
    ],
    practiceQuestions: [
      'Why are Commercial Hedgers considered the ultimate Smart Money proxy in COT report analysis?',
      'What is the ideal holding period and pip objective for an ICT swing trade setup?',
      'How does open interest confirm whether a price breakout is genuine or an institutional trap?'
    ],
    sections: [
      {
        id: '42.1',
        title: '42.1 Ideal Swing Trading Conditions: The Sweet Spot',
        content: `ICT Core Content Month 6 focuses on Swing Trading: capturing 100 to 300 pips over 3 to 10 days. 

Swing trading eliminates the stress and execution friction of scalping while offering far higher frequency than position trading:
- Ideal conditions occur when the Weekly chart has reached an HTF Discount or Premium PD Array, and the Daily chart produces a clear Market Structure Shift with displacement.
- A swing trader does not care about 1-minute noise. They identify the directional draw for the week and ride the expansion of the Weekly candle.`
      },
      {
        id: '42.2',
        title: '42.2 High-Probability Bullish & Bearish Swing Setups',
        content: `The Anatomy of a High-Probability Swing Setup:
1. Higher Timeframe Context: Weekly chart is in an institutional order flow uptrend.
2. Liquidity Sweep: Daily chart sweeps previous week's low or a significant swing low into a Daily Bullish Order Block or Fair Value Gap.
3. Market Structure Shift (MSS): Daily or 4-Hour chart forms a strong displacement candle closing above the last swing high.
4. Entry Execution: Place a limit order at the 50% Consequent Encroachment of the Fair Value Gap created by the displacement.
5. Invalidation: Stop loss placed 10 to 20 pips below the swing low formed during the liquidity sweep.`
      },
      {
        id: '42.3',
        title: '42.3 Commercial COT Hedging Programs & Open Interest',
        content: `To filter the most explosive swing markets, Month 6 integrates the CFTC Commitment of Traders (COT) report:
- Commercial Hedgers (smart money) take the opposite side of retail speculators. When Commercials reach historic net long positions, a massive multi-week rally is imminent.
- When Commercials reach historic net short positions, the market is primed for distribution.
- Open Interest: If price breaks out to new highs and Open Interest spikes dramatically, commercial money is aggressively buying contracts. If price hits new highs but Open Interest collapses, the move is driven by short-covering, signaling an imminent reversal.`
      },
      {
        id: '42.4',
        title: '42.4 Multi-Day Risk Reduction & Staged Scale-Out Protocols',
        content: `Managing a multi-day swing trade requires systematic profit extraction:
1. Target 1 (First Scale-Out): At the 50% Equilibrium of the current dealing range or the first intermediate swing high, take off 50% of the position and move the stop loss to breakeven.
2. Target 2 (Major Scale-Out): Take another 25% off at the Previous Week's High or prominent Buy-Side Liquidity pool.
3. Target 3 (Runner): Leave the remaining 25% to capture the complete HTF Weekly PD Array target, trailing the stop behind each daily swing low.`
      }
    ]
  },
  {
    id: 43,
    slug: 'core-content-month-7-short-term-trading-and-market-maker-templates',
    title: 'ICT Core Content Month 7: Short-Term Trading & Market Maker Manipulation Templates',
    part: 'Part XI - ICT Mentorship Core Content Master Curriculum',
    level: 3,
    quote: 'The Market Maker Buy and Sell Models are universal geometric templates. Once you recognize the Smart Money Reversal, every stage of the expansion curve unfolds with mathematical predictability.',
    summary: [
      'Blending IPDA Data Ranges with Weekly Range Profiles for short-term trading.',
      'The Market Maker Buy Model (MMBM) and Market Maker Sell Model (MMSM) architecture.',
      'Low Resistance Liquidity Runs (LRLR) versus High Resistance Liquidity Runs (HRLR).',
      'Midweek reversals: Capitalizing on Wednesday London and New York turning points.'
    ],
    keyTerms: [
      { term: 'Market Maker Buy Model (MMBM)', definition: 'A complete institutional delivery cycle: Original Consolidation -> Sell-Side Curve -> Smart Money Reversal -> Buy-Side Curve back to original consolidation.' },
      { term: 'Smart Money Reversal (SMR)', definition: 'The apex turning point of a Market Maker Model where an HTF PD Array is tagged, followed by an aggressive MSS.' },
      { term: 'Low Resistance Liquidity Run (LRLR)', definition: 'A clean, frictionless price expansion targeting unviolated equal highs/lows with no significant opposing PD arrays.' },
      { term: 'High Resistance Liquidity Run (HRLR)', definition: 'A difficult, choppy price delivery where price must fight through multiple established order blocks and swing points.' },
      { term: 'Midweek Reversal', definition: 'The tendency for the high or low of the week to form during Wednesday London or New York sessions.' }
    ],
    practiceQuestions: [
      'What are the key stages of the Buy-Side Curve in a Market Maker Buy Model?',
      'Why is an LRLR far more lucrative and safe to trade than an HRLR?',
      'Why does Wednesday frequently produce the ultimate turning point of the weekly candle?'
    ],
    sections: [
      {
        id: '43.1',
        title: '43.1 Blending IPDA Ranges with Short-Term Trading',
        content: `ICT Core Content Month 7 transitions into Short-Term Trading (holding for 1 to 3 days, targeting 40 to 80 pips). 

By blending the 20-day IPDA lookback with the weekly profile:
- You determine whether the current week is expected to expand an existing trend or execute an intraweek reversal.
- If the 20-day IPDA range shows that price has reached extreme Premium, the upcoming week is primed for a Market Maker Sell Model.`
      },
      {
        id: '43.2',
        title: '43.2 The Market Maker Buy & Sell Models (MMBM / MMSM)',
        content: `The crown jewel of Month 7 is the Market Maker Model:

Anatomy of a Market Maker Buy Model (MMBM):
1. Original Consolidation: Price establishes an initial range at a higher level.
2. Sell-Side Curve: Price distributes downward in multiple stages (Accumulation 1, Accumulation 2) as retail traders short the downtrend.
3. Smart Money Reversal (SMR): Price sweeps sell-side liquidity into an HTF Key Discount PD Array. Price rejects with violent displacement and creates an MSS.
4. Buy-Side Curve: Price reverses and expands upward. The stages of the buy-side curve mirror the sell-side curve:
   - Re-accumulation 1
   - Re-accumulation 2
   - Final Expansion targeting the Original Consolidation highs.`
      },
      {
        id: '43.3',
        title: '43.3 Low Resistance Liquidity Runs (LRLR) vs. High Resistance (HRLR)',
        content: `Not all liquidity runs are created equal:

Low Resistance Liquidity Run (LRLR):
- Occurs when the target liquidity consists of clean, unviolated equal highs or lows.
- Between the entry point and the target, there are NO significant opposing Order Blocks or Breakers to impede price.
- Price sprints through this space with effortless velocity. This is where the easiest and fastest profits are made.

High Resistance Liquidity Run (HRLR):
- Occurs when price attempts to move in a direction that has already formed complex structural highs and lows with heavy opposing order flow.
- Every advance is met with deep pullbacks and choppy candles.
- Rule: Only risk capital on Low Resistance Liquidity Runs.`
      },
      {
        id: '43.4',
        title: '43.4 Midweek Reversals: Exploiting Wednesday Turning Points',
        content: `While Tuesday frequently forms the high or low of the week in standard trending weeks, Wednesday is the king of Midweek Reversals:
- If Monday and Tuesday expand aggressively in one direction without taking out HTF liquidity, Wednesday London or New York Open will frequently sweep an HTF PD Array and trigger a complete intraweek reversal.
- The remainder of Wednesday, Thursday, and Friday morning will expand in the opposite direction back toward Monday's opening price.`
      }
    ]
  },
  {
    id: 44,
    slug: 'core-content-month-8-daily-range-and-intraday-profiles',
    title: 'ICT Core Content Month 8: Anatomy of the Daily Range & Intraday Profiles',
    part: 'Part XI - ICT Mentorship Core Content Master Curriculum',
    level: 3,
    quote: 'The daily candlestick has a heartbeat. The opening price is the anchor. If you know whether the daily bias is bullish, you look for the low of the day to form below the open between 02:00 and 05:00 AM EST.',
    summary: [
      'The anatomical breakdown of the Daily Candle: Classic OHLC / OLHC mechanics.',
      'Translating weekly directional bias into precise daily expansion expectations.',
      'The London Open Judas Swing versus London Close Reversal dynamics.',
      'Day-of-week tendencies: Monday traps, Tuesday expansion, Wednesday turning points.'
    ],
    keyTerms: [
      { term: 'Classic OHLC / OLHC', definition: 'The open-high-low-close structure of a daily candle where the low forms below the open in a bullish day (Open -> Low -> High -> Close).' },
      { term: 'Judas Swing', definition: 'The false morning price run during London Open engineered to trap retail traders on the wrong side before the true daily expansion.' },
      { term: 'London Close Reversal', definition: 'The counter-trend pullback occurring between 10:30 AM and 12:00 PM EST as London desks square books.' },
      { term: 'Daily Bias', definition: 'The high-conviction expectation of whether the upcoming daily candle will close higher (green) or lower (red).' }
    ],
    practiceQuestions: [
      'Why must a bullish daily candle almost always print its low below the daily opening price?',
      'How does the London Judas Swing engineer liquidity for the true New York session expansion?',
      'What trading opportunities arise during the London Close session window (10:30 AM - 12:00 PM EST)?'
    ],
    sections: [
      {
        id: '44.1',
        title: '44.1 The Anatomical Daily Candle: Classic OHLC Dynamics',
        content: `ICT Core Content Month 8 breaks down the daily candle into an exact algorithmic science:

In a Bullish Day (Open - Low - High - Close / OLHC):
1. Open: The day opens at 00:00 EST.
2. Low Formation (Manipulation): Between 02:00 AM and 05:00 AM EST (London Killzone), price drops BELOW the opening price to form the low of the day.
3. High Formation (Expansion): Between 08:30 AM and 11:00 AM EST (New York Killzone), price expands aggressively upward, creating the high of the day.
4. Close: Price pulls back slightly into London Close (11:00 AM - 12:00 PM) and settles near the highs at 17:00 EST.

If you are bullish, you NEVER buy above the daily open. You wait for price to drop below the open during London or NY Open to buy at a Discount.`
      },
      {
        id: '44.2',
        title: '44.2 Framing Daily Setups from Weekly Direction',
        content: `A daily setup is only as reliable as the weekly context supporting it:
- If the weekly candle is expanding upward toward a Buy-Side Liquidity target, every daily pullback into a Discount PD Array is a high-probability buy.
- If the weekly target has already been tagged on Wednesday, Thursday and Friday daily setups carry significantly lower probability and often result in consolidation or deep retracement.`
      },
      {
        id: '44.3',
        title: '44.3 London Open Judas Swing vs. London Close Reversals',
        content: `The two daily turning points:

1. London Judas Swing:
- The Asian session forms a tight consolidation range.
- At 02:00 - 03:00 AM EST, London market open sparks an aggressive run in the OPPOSITE direction of the true daily bias.
- It sweeps the Asian range high (if bearish) or low (if bullish), tags an HTF PD Array, and immediately produces an MSS.
- This creates the absolute High or Low of the day.

2. London Close Reversal:
- Between 10:30 AM and 12:00 PM EST, London banks square their books and close daily positions.
- This sudden withdrawal of liquidity causes price to retrace 20% to 38.2% of the daily range, offering an intraday counter-trend scalp or profit-taking exit.`
      },
      {
        id: '44.4',
        title: '44.4 Day-of-Week Tendencies & The Weekly Cycle',
        content: `Month 8 establishes the day-of-week probability matrix:
- Monday: Frequently creates a false breakout or tight consolidation. It sets up the parameters of the weekly range.
- Tuesday: High-probability day for the High or Low of the Week to print (70%+ probability during trending weeks).
- Wednesday: The mid-week momentum expansion day or sharp midweek reversal.
- Thursday: The continuation of Wednesday's expansion, often capturing the weekly target.
- Friday: Profit-taking day. Early session expansion often followed by a late-session retracement back into the middle of the weekly range.`
      }
    ]
  },
  {
  "id": 45,
  "slug": "core-content-month-9-consolidations-and-bread-and-butter",
  "title": "ICT Core Content Month 9: Range Consolidations, Institutional Pricing & Bread and Butter Setups",
  "part": "Part XI - ICT Mentorship Core Content Master Curriculum",
  "level": 3,
  "quote": "A recurring study objective is not guaranteed daily income. Preserve days with no qualifying setup.",
  "summary": [
    "Study consolidation boundaries and failures without assuming an institutional inventory threshold.",
    "Round-number references and pip objectives depend on the instrument and quote convention.",
    "A recurring study objective is not guaranteed daily income. Preserve days with no qualifying setup."
  ],
  "keyTerms": [
    {
      "term": "Bread and Butter Setup",
      "definition": "A recurring setup studied within a defined model. The reviewed 20-pip lesson explicitly does not promise 20 pips every day."
    },
    {
      "term": "Round-number reference",
      "definition": "A selected quoted-price level, not proof that an institution must execute there."
    }
  ],
  "practiceQuestions": [
    "How will you record a day with no qualifying setup or a missed fill?",
    "Why does a sweep of an old high not guarantee a reversal?"
  ],
  "sections": [
    {
      "id": "45.1",
      "title": "45.1 Define a consolidation before the breakout",
      "content": "Select the instrument, session and range boundaries before looking at the subsequent move. Record both false breakouts and successful continuations. A candle chart cannot show that an order inventory reached critical mass or that every breakout trader was trapped."
    },
    {
      "id": "45.2",
      "title": "45.2 A price reference is not a forecast",
      "content": "The reviewed Market Reversals lesson notes that not every old high creates a reversal. Some price runs continue. Round numbers, sentiment measures and a selected swing can form research inputs, but none alone proves the next direction. Do not use an unsupported 85% sentiment threshold as an automatic reversal rule."
    },
    {
      "id": "45.3",
      "title": "45.3 Twenty pips is an example objective",
      "content": "The official lesson titled 20 Pips Per Day explicitly separates its title from a promise to earn that amount every day. It is not a daily income schedule. Another Month 9 routine discussion distinguishes day trading from trading every day, and scalping from acting on every fluctuation.\n\nA source objective measured in Forex pips is not mechanically interchangeable with Nasdaq handles or futures ticks. State the contract, tick value, spread and costs. Record days without trades, losses, partial exits and unfilled orders. A chosen objective does not establish expectancy."
    },
    {
      "id": "45.4",
      "title": "45.4 Evaluate the whole sample",
      "content": "Choose the setup and invalidation before replay. Keep later data separate from the examples used to select the rules. Compare results after costs and disclose every excluded session. An attractive historical example is useful for explanation; it is not an independently verified performance record."
    }
  ]
},
  {
  "id": 46,
  "slug": "core-content-months-10-11-12-multi-asset-mega-trades-top-down",
  "title": "ICT Core Content: Multi-Asset Study & Top-Down Planning",
  "part": "Part XI - ICT Mentorship Core Content Master Curriculum",
  "level": 3,
  "quote": "Compare markets with a question and a defined observation period; correlation is not a promise about the next move.",
  "summary": [
    "Locate the supplied Month 10 lessons on bonds, index futures, commodities and stocks.",
    "Separate a related-market observation from a directional prediction.",
    "Write a top-down research plan without inventing missing course attribution."
  ],
  "keyTerms": [
    {
      "term": "Cross-market comparison",
      "definition": "Comparing specified instruments over aligned periods, with different contract specifications and trading hours recorded."
    },
    {
      "term": "Top-down study plan",
      "definition": "An explicit sequence from broader context to a narrower observation. It is a study method, not proof that a higher timeframe predicts a lower one."
    }
  ],
  "practiceQuestions": [
    "Which Month 10 original lesson supports the claim you are investigating?",
    "Are your instruments aligned by date, trading session and contract?",
    "What evidence would contradict your proposed relationship?"
  ],
  "sections": [
    {
      "id": "46.1",
      "title": "46.1 What the supplied Month 10 collection contains",
      "content": "The supplied catalogue contains 19 Month 10 recordings. Their original titles cover bond opening ranges, consolidation and trending days, split sessions, index-futures AM and PM trends, projected ranges, commodity seasonals, Commitment of Traders, open interest, relative strength and stock watchlists. Use the original-recording directory to choose a specific lesson. A catalogue title establishes the topic, not that every rule in the recording has been independently verified."
    },
    {
      "id": "46.2",
      "title": "46.2 Availability is not evidence for Months 11–12",
      "content": "The supplied core files cover month groups 1–10. We have not established Months 11–12 from this collection. Earlier wording attributed mega-trade targets and a mandatory four-tier protocol to those missing months; that attribution has been withdrawn. This does not establish whether those recordings exist elsewhere. The existing page address remains available so saved links continue to work."
    },
    {
      "id": "46.3",
      "title": "46.3 A repeatable multi-asset research exercise",
      "content": "Choose one question, such as whether corresponding highs in two specified contracts diverge during the same session. Record the data feed, contract month, timezone, observation interval and rule for selecting each high. Keep a separate column for what happened afterward. Include cases where the divergence disappears or the expected move fails. Bonds do not mechanically force an immediate opposite move in equities, and a seasonal tendency does not establish this year’s outcome."
    },
    {
      "id": "46.4",
      "title": "46.4 Turn context into a written study specification",
      "content": "Write the higher-timeframe reference, the lower-timeframe event you will observe, the invalidation condition and the point at which the idea expires. Distinguish a source rule from your own research variation. A narrower stop can increase sensitivity to noise and execution costs; several overlapping labels do not establish a higher win rate. Compare variants with the same assumptions and keep later data separate from the examples used to choose the rules."
    }
  ]
}
];
