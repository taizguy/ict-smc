import { ICTConcept } from '../types';

export const ictConcepts: ICTConcept[] = [
  {
    id: 'market_mechanics_liquidity',
    name: 'Order Book & Market Liquidity',
    category: 'foundations',
    shortDefinition: 'The availability of resting limit orders (bids/asks) in the exchange matching engine that allows aggressive market orders to execute with controlled slippage.',
    source: {
      mentorship: '2016-2017 Core Content & Scout Sniper Series',
      seriesOrMonth: 'Month 1: Elements of a Trade Setup & Orderflow Mechanics',
      approximateDate: '2016',
      originalTerminology: 'Interbank Price Delivery Engine & Depth of Market Queues',
      conceptStatus: 'Foundational',
      lectureReference: 'Core Content Month 1 - Video 1 & 2'
    },
    tripartiteView: {
      ictTeaching: 'Michael J. Huddleston teaches that markets are delivered by an automated central bank/interbank algorithm (IPDA) designed to seek out liquidity pools and rebalance price imbalances.',
      observableMarketBehavior: 'Central limit order book (CLOB) auction mechanics: every market order requires a resting limit order. When aggressive buying exceeds passive offers at the best ask, the queue is cleared and the price prints higher.',
      derivedInterpretation: 'Quantitative Smart Money Concept (SMC): price moves between pockets of resting order density (stop clusters & limit books). Market makers manage inventory risk by providing liquidity into high-volume clusters.'
    },
    explanationLadder: {
      level1Child: 'Think of an auction at a crowded market. If 50 buyers rush in and grab every $1 apple, the next seller will demand $1.50. Price rises because the cheap apples are gone, not by magic.',
      level2Beginner: 'Price only changes when someone places an immediate market buy or sell order that eats up all the resting limit orders at the current price level.',
      level3Trader: 'Stop orders become market orders when triggered. When clusters of stops are hit, they create sudden surges of aggressive volume that large players use to fill institutional sizes without moving price against themselves.',
      level4Advanced: 'In fragmented liquidity environments (CFDs, decentralized crypto, multi-venue equities), smart routing and arbitrage algorithms constantly align price across electronic communication networks (ECNs).',
      level5ICTFramework: 'The Interbank Price Delivery Algorithm (IPDA) delivers price to either: (1) Rebalance an inefficiently delivered price range (Fair Value Gap), or (2) Run resting liquidity above old highs or below old lows.',
      whenItMatters: 'Always relevant as the foundational law of electronic auction markets.',
      whenToIgnore: 'Never ignore, but avoid obsessing over level-2 DOM microstructure if your timeframe is 4H/Daily swing trading.'
    },
    whyItExists: 'Every single transaction requires exactly one buyer and one seller. When aggressive market orders demand immediate execution, they consume the available resting limit orders at the best available prices.',
    problemItSolves: 'Explains why price moves: price does NOT move because "there are more buyers than sellers" (every trade has 1 buyer and 1 seller), but because aggressive market orders exhaust resting liquidity across price queues.',
    howItForms: 'Formed continuously by the auction process where passive participants place limit orders (providing liquidity) and aggressive traders cross the spread with market orders (consuming liquidity).',
    chartAnatomy: 'Observable in the Depth of Market (DOM) as bids below current price and asks above current price. On candlestick charts, rapid exhaustion manifests as tall candle bodies (displacement).',
    identificationRules: [
      'Market orders consume resting liquidity and move the price.',
      'Limit orders provide liquidity and sit in the queue.',
      'Spread = Best Ask - Best Bid; no execution occurs inside the spread without an aggressive order crossing it.',
      'Last executed trade price becomes the displayed chart price.'
    ],
    validCharacteristics: [
      'High liquidity markets have tight spreads and deep order books.',
      'Large orders utilize TWAP/VWAP execution algorithms to minimize market impact.',
      'Iceberg orders hide true order volume to prevent premature front-running.'
    ],
    invalidCharacteristics: [
      'Assuming the exchange "chooses" the price arbitrarily.',
      'Believing price moves because "buyers outnumber sellers" in headcount.'
    ],
    howICTUsesIt: 'ICT builds upon this foundation by recognizing that large participants require significant pools of counterparties (stops and pending orders) to enter and exit large institutional volume.',
    commonMistakes: [
      'Confusing visible order book liquidity with total liquidity (ignoring hidden & iceberg orders).',
      'Thinking every large displayed limit order is genuine (ignoring spoofing).'
    ],
    advancedNuances: 'In decentralized or fragmented markets like crypto, liquidity is distributed across multiple exchanges (Binance, Coinbase, Bybit), tied together by arbitrage algorithms.',
    prerequisites: ['Candlesticks', 'OHLC Containers'],
    relatedConcepts: ['Displacement', 'Buy Side Liquidity', 'Sell Side Liquidity', 'Liquidity Sweeps'],
    bullishScenario: 'Aggressive buyers demand immediate execution, consuming all asks at 100.01, 100.02, 100.03, driving the last executed price upward into higher queues.',
    bearishScenario: 'Aggressive sellers flood market orders, exhausting available bid limits at 99.99, 99.98, 99.97, driving the transaction print lower.',
    counterexample: 'Heavy buying volume hitting a massive passive iceberg seller where price fails to advance despite huge volume—known as Absorption.',
    counterexamples: [
      {
        title: 'The "Buyer Headcount" Fallacy',
        trapDescription: 'Believing 1,000 retail buyers can overpower 1 institutional seller placing a 10,000-lot limit sell order.',
        whyItFails: 'Volume and contract size dictate execution; headcount is completely irrelevant.',
        ruleOfThumb: 'Watch price displacement and wick rejections, not retail sentiment percentages.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'buy_side_liquidity',
        targetLabel: 'Buy Side Liquidity (BSL)',
        whyThisFollows: 'Because market orders seek resting liquidity, stops resting above prior highs become the prime target for price delivery.',
        institutionalMechanic: 'Large traders need to offload long inventory by selling to eager buy-stop market orders triggered above peaks.',
        riskOfSkipping: 'Failing to identify where liquidity rests leads to buying at the exact highs where institutions are distributing.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Macro liquidity pools (Weekly/Monthly highs/lows) dictate multi-week trends and macro draws on liquidity.',
      ltfApplication: '1M-5M liquidity runs inside Killzones provide intra-day execution triggers.',
      sessionAndTiming: 'Order book depth thins out during the Asian session and expands dramatically during London & NY crossovers.'
    },
    tradeRules: {
      entryModels: ['Targeting stop clusters during Killzone open windows'],
      targetingLogic: ['Opposing liquidity pools resting above swing highs or below swing lows'],
      invalidationCriteria: 'When orderflow fails to reach the target and reverses with opposing structural displacement.'
    },
    invalidationCriteria: 'When aggressive orders exhaust and opposing passive resting orders halt further progression.',
    diagramType: 'top_down_matrix',
    simplifiedExplanation: 'Think of a grocery store where 100 people rush to buy apples. When the $1.00 apples sell out, the next person must pay $1.10. Price went up because cheap supply was consumed, not because apples magically changed.'
  },
  {
    id: 'buy_side_liquidity',
    name: 'Buy Side Liquidity (BSL)',
    category: 'liquidity',
    shortDefinition: 'A concentration of executable buy orders resting above significant highs, consisting of short traders\' stop losses and breakout buyers\' stop orders.',
    source: {
      mentorship: '2016-2017 Core Content & 2022 YouTube Mentorship',
      seriesOrMonth: 'Core Content Month 4: Liquidity Pools & Stop Runs',
      approximateDate: '2016 / 2022',
      originalTerminology: 'Buy Stops / Buy Side Liquidity Pool',
      conceptStatus: 'Active Core',
      lectureReference: '2022 Mentorship Episode 1 & 2'
    },
    tripartiteView: {
      ictTeaching: 'Institutions do not buy when price is low and sell when price is high by chance; they engineer liquidity above old highs to trigger buy stops, allowing them to pair their large short orders or close their longs.',
      observableMarketBehavior: 'Clustered buy-stop orders above distinct resistance levels act as resting liquidity. When price penetrates the level, these stops convert to aggressive market buy orders, creating sudden volume spikes.',
      derivedInterpretation: 'Liquidity sweep and distribution: Retail and technical breakout traders buy at new highs with market orders, giving institutional sellers the counterparty depth required to sell large size with minimal negative slippage.'
    },
    explanationLadder: {
      level1Child: 'Imagine a game where everyone who hid their treasure on top of a hill has to surrender it if the king touches the peak. The king climbs up, grabs the treasure, and immediately leaves.',
      level2Beginner: 'Traders who shorted the market put their stop loss above the highest point. When price touches that point, their stops trigger as automatic buy orders.',
      level3Trader: 'Never buy into a clean high that has just been breached without seeing price accept above it with displacement; expect a sweep (turtle soup) followed by a sharp drop.',
      level4Advanced: 'Combine HTF BSL with session timing: an Asian High swept during London Open (Judas Swing) provides high-probability short setups.',
      level5ICTFramework: 'BSL is an active Draw on Liquidity (DOL) for the IPDA. Once BSL is purged, the algorithm re-prices downward toward internal Sell Side Liquidity or Discount PD arrays.',
      whenItMatters: 'When price approaches obvious equal highs (EQH), Previous Day High (PDH), or Session Highs during active Killzones.',
      whenToIgnore: 'When price is in a runaway HTF parabolic expansion and continually accepts above every high with massive displacement (trend continuation, not a sweep).'
    },
    whyItExists: 'Traders who are short place buy stop-loss orders above swing highs to protect their capital. Breakout traders place buy stop-entry orders above resistance.',
    problemItSolves: 'Provides a concrete, observable target (Draw on Liquidity) where institutions can find the counterparties needed to exit longs or establish large short positions.',
    howItForms: 'Created when price forms a recognizable swing high, equal highs, previous day high (PDH), or session high, attracting orders above the level.',
    chartAnatomy: 'Marked as a horizontal line or shaded zone above old highs, swing peaks, double tops, or session peaks with upward directional arrows.',
    identificationRules: [
      'Look for prominent swing highs, double/triple tops, PDH, PWH, or Session Highs (Asian High, London High).',
      'The more obvious and repeated the high, the denser the liquidity pool.',
      'Label as BSL with the respective timeframe (e.g., Daily BSL, 15M BSL).'
    ],
    validCharacteristics: [
      'Clean equal highs (EQH) with minimal wick dispersion.',
      'Highs that have been respected multiple times without violation.',
      'Highs residing in Premium territory of the dealing range.'
    ],
    invalidCharacteristics: [
      'Marking every minor 1-minute wick as major BSL.',
      'Assuming price MUST reverse immediately upon touching BSL.'
    ],
    howICTUsesIt: 'ICT uses BSL as a primary Draw on Liquidity for bullish trends, or as a manipulation/sweep zone prior to a bearish Market Structure Shift (MSS).',
    commonMistakes: [
      'Instantly shorting the exact moment BSL is breached without waiting for displacement or MSS.',
      'Treating BSL as a permanent line even after price has thoroughly traded through it.'
    ],
    advancedNuances: 'When price sweeps BSL and fails to accept above it, triggering immediate aggressive downward displacement, it indicates liquidity was extracted to fuel a reversal.',
    prerequisites: ['Swing Highs', 'Order Book & Market Liquidity'],
    relatedConcepts: ['Sell Side Liquidity', 'Liquidity Sweeps', 'Judas Swing', 'Draw on Liquidity'],
    bullishScenario: 'During a strong uptrend, price uses internal liquidity to fuel expansion directly toward external BSL at the Previous Week High.',
    bearishScenario: 'Price manipulates upward during the London open, sweeps Asian High BSL, triggers short stops, and immediately rejects downward with strong displacement.',
    counterexample: 'Price breaks through BSL, closes strongly with expanding volume, retests the level from above and continues higher—this is a genuine Breakout with Acceptance, NOT a reversal sweep.',
    counterexamples: [
      {
        title: 'The Breakout Continuation Trap',
        trapDescription: 'Blindly shorting a BSL breach during high-impact news when HTF orderflow is strongly bullish.',
        whyItFails: 'Price accepts above the high, using the buy stops as fuel for trend expansion rather than reversal.',
        ruleOfThumb: 'Never short a BSL sweep unless you see a distinct Market Structure Shift (MSS) with displacement and an FVG formed on the LTF.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'displacement_engine',
        targetLabel: 'Displacement (The Engine)',
        whyThisFollows: 'Once liquidity is swept above BSL, smart money executes large counter-trend market orders, creating energetic displacement candles in the opposite direction.',
        institutionalMechanic: 'Filling institutional sell orders into buy stops causes sudden one-sided downward velocity.',
        riskOfSkipping: 'Entering before displacement appears means you might get run over by a continuing breakout.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily and Weekly BSL act as major macro magnetic targets that guide multi-day bias.',
      ltfApplication: '5M and 1M BSL provide intraday liquidity targets for scalps and day trades.',
      sessionAndTiming: 'London Open typically sweeps Asian BSL; NY AM session often targets London High BSL.'
    },
    tradeRules: {
      entryModels: ['Turtle Soup Short on BSL raid', '2022 Short Model after BSL sweep + MSS'],
      targetingLogic: ['Previous Day Low (PDL) SSL', 'Internal Discount FVGs'],
      invalidationCriteria: 'Candle body closes above the highest sweep wick on the execution timeframe.'
    },
    invalidationCriteria: 'Decisive candle closes and subsequent higher structure forming above the BSL level (acceptance).',
    diagramType: 'liquidity_sweep',
    simplifiedExplanation: 'When people bet against Bitcoin, they put safety stops above the highest peak. If price jumps above that peak, those safety stops turn into mandatory buy orders, creating a pool of cash for big players.'
  },
  {
    id: 'sell_side_liquidity',
    name: 'Sell Side Liquidity (SSL)',
    category: 'liquidity',
    shortDefinition: 'A concentration of executable sell orders resting below meaningful lows, composed of long traders\' stop losses and breakout sellers\' sell stop orders.',
    source: {
      mentorship: '2016-2017 Core Content & 2022 YouTube Mentorship',
      seriesOrMonth: 'Core Content Month 4: Liquidity Pools & Stop Runs',
      approximateDate: '2016 / 2022',
      originalTerminology: 'Sell Stops / Sell Side Liquidity Pool',
      conceptStatus: 'Active Core',
      lectureReference: '2022 Mentorship Episode 1 & 2'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that institutional sponsors engineer price drops into old lows to absorb sell stops at wholesale (discount) prices, initiating rapid markups.',
      observableMarketBehavior: 'Resting stop-loss sell orders beneath established swing lows or equal lows. Once triggered, market sell orders flood the book, offering immediate liquidity for institutional buyers.',
      derivedInterpretation: 'Liquidity absorption at support: Smart money steps in as the buyer of last resort beneath key support levels, filling large buy limits while retail stops panic-sell.'
    },
    explanationLadder: {
      level1Child: 'Imagine a bargain bin at a department store where everything is dumped at 90% off for 5 minutes. Smart shoppers wait until the bin is dumped, buy everything, and prices go back to normal.',
      level2Beginner: 'Everyone who buys a coin sets a protective stop-loss below the recent bottom. When price dips below that bottom, all those stops execute as sell orders.',
      level3Trader: 'Watch for SSL sweeps in Discount territory. Do not panic and sell when price breaks a major support level; look for sharp displacement back above the level.',
      level4Advanced: 'Equal Lows (EQL) create the cleanest SSL pools. When EQL sits beneath a 4H Bullish FVG or Order Block, it is a prime target for a stop run before a massive rally.',
      level5ICTFramework: 'SSL is the target of the Manipulation phase in Power of Three (AMD). During London Open, price drops below Asian Low to accumulate longs before NY distribution.',
      whenItMatters: 'When price trades into clean Equal Lows, Previous Day Low (PDL), or Session Lows within a Higher Timeframe Bullish context.',
      whenToIgnore: 'During severe macroeconomic breakdowns where HTF price accepts below lows with heavy selling momentum (genuine markdown phase).'
    },
    whyItExists: 'Long traders place protective sell stop-loss orders below prominent lows, and momentum sellers place stop-sell orders to capture breakdowns.',
    problemItSolves: 'Explains why prices often drop sharply below obvious support before violently rallying—large players utilize the sell volume to absorb long positions.',
    howItForms: 'Constructed when price forms swing lows, equal lows (EQL), previous day lows (PDL), previous week lows (PWL), or Asian session lows.',
    chartAnatomy: 'Marked as a horizontal level or band below key structural lows with downward directional arrows indicating resting sell stops.',
    identificationRules: [
      'Identify distinct swing lows, double/triple bottoms, PDL, PWL, or session lows.',
      'Prioritize Higher Timeframe SSL (Daily/4H) over lower timeframe noise.',
      'Verify whether the low sits in Discount territory of the broader dealing range.'
    ],
    validCharacteristics: [
      'Equal lows (EQL) that look like "strong support" to retail traders.',
      'Lows that have never been tested since their initial formation (fresh liquidity).',
      'Lows positioned just beneath an unmitigated Fair Value Gap or Order Block.'
    ],
    invalidCharacteristics: [
      'Every 1-minute dip labeled as institutional SSL.',
      'Assuming that taking SSL guarantees an automatic bounce.'
    ],
    howICTUsesIt: 'Used as an objective downside target (Draw on Liquidity) in bearish order flow, or as the liquidity fuel for bullish institutional accumulation (Turtle Soup / 2022 model).',
    commonMistakes: [
      'Buying immediately when price touches SSL without waiting for displacement and MSS.',
      'Panicking and selling at the very bottom right when SSL is swept.'
    ],
    advancedNuances: 'If price sweeps SSL in a higher timeframe Discount area and prints strong bullish displacement leaving an FVG, the probability of an intraday reversal reaches its peak.',
    prerequisites: ['Swing Lows', 'Order Book & Market Liquidity'],
    relatedConcepts: ['Buy Side Liquidity', 'Liquidity Sweeps', 'Power of Three', 'Turtle Soup'],
    bullishScenario: 'London session opens, dumps price 30 pips below the Asian Low SSL, collects stops, and immediately prints a 5-minute bullish displacement breaking previous structural highs.',
    bearishScenario: 'In a weekly downtrend, price cleanly targets and runs through successive internal SSL levels on its way to the Previous Month Low.',
    counterexample: 'Price crashes through SSL, consolidates beneath it, retests from below and accelerates downward—acceptance below support confirming trend continuation.',
    counterexamples: [
      {
        title: 'The "Catching the Falling Knife" Trap',
        trapDescription: 'Buying the exact moment SSL is touched without any displacement or shift in market structure.',
        whyItFails: 'If institutional selling is genuine, price will continue downward without bouncing.',
        ruleOfThumb: 'Wait for the sweep wick, followed by a strong bullish candle closing above previous swing highs with an FVG.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'displacement_engine',
        targetLabel: 'Displacement (The Engine)',
        whyThisFollows: 'After absorbing sell stops at discount, smart money aggressively bids price up, creating strong bullish displacement.',
        institutionalMechanic: 'Aggressive buying consumes all available offers, creating large green candles with minimal upper wicks.',
        riskOfSkipping: 'Without displacement, the low may simply be the beginning of a sustained trend breakdown.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily/Weekly SSL represents major macro turning points or long-term targets in bear markets.',
      ltfApplication: '1M-15M SSL provides intraday bounce setups and scalping targets.',
      sessionAndTiming: 'Asian Low SSL swept during 02:00-05:00 NY time (London Open) forms the classic London low of the day.'
    },
    tradeRules: {
      entryModels: ['Turtle Soup Long on SSL sweep', '2022 Long Model after SSL raid + MSS'],
      targetingLogic: ['Previous Day High (PDH) BSL', 'Internal Premium FVGs / Order Blocks'],
      invalidationCriteria: 'Candle body closes beneath the lowest point of the sweep candle.'
    },
    invalidationCriteria: 'Price establishing acceptance and closing candles beneath the swept level without rejection.',
    diagramType: 'liquidity_sweep',
    simplifiedExplanation: 'Everyone who bought Bitcoin puts their emergency exit button right below the nearest bottom. When price dips under that bottom, all those emergency sells trigger, creating a massive bargain sale for smart money.'
  },
  {
    id: 'market_structure_bos_mss_choch',
    name: 'Market Structure: BOS vs MSS vs CHoCH',
    category: 'structure',
    shortDefinition: 'The framework of swings organizing price progression: BOS confirms trend continuation, CHoCH signals the first structural interruption, and MSS confirms a high-quality directional shift supported by displacement.',
    source: {
      mentorship: '2016 Core Content Month 2 & 2022 YouTube Mentorship',
      seriesOrMonth: '2022 Mentorship: Episode 2 - Market Structure & Institutional Orderflow',
      approximateDate: '2016 / 2022',
      originalTerminology: 'Market Structure Shift (MSS) / Break of Market Structure (BMS)',
      conceptStatus: 'Active Core',
      lectureReference: '2022 Mentorship Episode 2 & 3'
    },
    tripartiteView: {
      ictTeaching: 'Michael distinguishes between a standard trend continuation (BOS) and a genuine Market Structure Shift (MSS). An MSS requires a prior liquidity raid followed by energetic displacement that violently closes past a protected swing high/low.',
      observableMarketBehavior: 'Transition from series of higher-highs/higher-lows to lower-lows. When a structural swing breaks with wide range candles and high volume, resting stops inside the old structure are cleared.',
      derivedInterpretation: 'Structural trend regime change: A Break of Structure (BOS) represents trend continuation in the same regime; a Market Structure Shift (MSS) signals a valid transition into an opposing regime.'
    },
    explanationLadder: {
      level1Child: 'BOS is continuing straight along the highway. CHoCH is tapping the brakes when seeing a speed bump. MSS is taking the exit ramp onto a brand new road with full acceleration.',
      level2Beginner: 'When price is going up, it makes higher highs and higher lows. When it suddenly crashes below a recent low, the uptrend is broken (MSS).',
      level3Trader: 'Do not confuse a wick through a minor swing for an MSS. Look for a full candle body close beyond the swing with an obvious Fair Value Gap created inside the displacement leg.',
      level4Advanced: 'Understand the concept of Protected Swings vs Target Swings: the low that swept liquidity is protected; the previous high is the target.',
      level5ICTFramework: 'MSS is the algorithmic confirmation that IPDA has switched orderflow from Discount accumulation to Premium distribution (or vice versa).',
      whenItMatters: 'After a higher timeframe liquidity pool (BSL/SSL) or HTF PD Array has been thoroughly tested.',
      whenToIgnore: 'In the middle of a consolidating range with no prior liquidity sweep (choppy noise).'
    },
    whyItExists: 'Markets do not move randomly; they progress in continuous directional auctions of advances and pullbacks across multiple fractal timeframes.',
    problemItSolves: 'Eliminates confusion between a normal trend pullback and an actual trend reversal, stopping traders from trying to catch every random top and bottom.',
    howItForms: 'BOS forms when price breaks a protected high/low in the direction of the trend. CHoCH forms when the first opposing swing breaks. MSS forms when the break is accompanied by aggressive displacement and institutional footprints.',
    chartAnatomy: 'BOS: Higher High broken in uptrend; Lower Low broken in downtrend. CHoCH: First Higher Low broken in uptrend. MSS: Decisive displacement candle closing beyond a structural swing with an FVG left behind.',
    identificationRules: [
      'BOS = Continuation of the existing established trend.',
      'CHoCH = First warning/interruption of the existing rhythm.',
      'MSS = Structural transition backed by displacement and liquidity sweep.',
      'Always evaluate across 5 dimensions: Scale, Strength, Acceptance, Context, and Purpose.'
    ],
    validCharacteristics: [
      'Displacement candle body closing decisively beyond the swing point (not just a wick).',
      'The broken swing was structurally significant (responsible for creating the previous leg).',
      'Occurs after a meaningful liquidity event (BSL or SSL swept first).'
    ],
    invalidCharacteristics: [
      'A single wick poking 1 tick past a minor swing and immediately reversing.',
      'Labeling every 1-minute internal zig-zag as a trend reversal.'
    ],
    howICTUsesIt: 'ICT uses MSS as the primary confirmation trigger before looking for an entry into a Fair Value Gap or Order Block.',
    commonMistakes: [
      'Treating every CHoCH as a guaranteed reversal (most lower-timeframe CHoCHs are just pullbacks).',
      'Forgetting that structure is fractal (a 5M bearish MSS inside a Daily bullish trend is just a discount retracement).'
    ],
    advancedNuances: 'A Protected Low is the swing low from which price successfully broke the previous high. If price stays above this protected low, the bullish auction is structurally intact.',
    prerequisites: ['Swing Points', 'Protected Highs/Lows', 'Displacement'],
    relatedConcepts: ['Fair Value Gaps', 'Order Blocks', 'Liquidity Sweeps', '2022 Model'],
    bullishScenario: 'After sweeping SSL, price produces 3 large green candles that close above the previous lower high, creating a bullish MSS and leaving a pristine 5M FVG.',
    bearishScenario: 'Price sweeps previous day high BSL, fails to accept higher, and violently crashes through the protected higher low with displacement, confirming a bearish MSS.',
    counterexample: 'Price wicks 2 pips below a higher low during a quiet session and immediately closes back inside the range—this is a liquidity probe/sweep, NOT an MSS.',
    counterexamples: [
      {
        title: 'The "Wick Only" Fake MSS Trap',
        trapDescription: 'Seeing a long upper wick poke slightly above a swing high and immediately shorting on the belief that structure broke.',
        whyItFails: 'Wicks only raid liquidity; bodies tell the story of acceptance and intention.',
        ruleOfThumb: 'Require at least one full candle body close beyond the swing point to confirm an authentic MSS.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'fair_value_gap',
        targetLabel: 'Fair Value Gap (FVG)',
        whyThisFollows: 'The displacement candle that creates the MSS inevitably leaves behind an unbalance/FVG because of one-sided order velocity.',
        institutionalMechanic: 'Rapid execution exhausts opposing bids/offers, creating a price imbalance corridor that needs to be revisited.',
        riskOfSkipping: 'Trying to enter on the breakout candle of the MSS instead of waiting for the retest of the FVG results in wide stops and poor R:R.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily/4H MSS establishes the structural directional bias for the upcoming weeks.',
      ltfApplication: '1M-5M MSS acts as the precise execution trigger within an HTF point of interest.',
      sessionAndTiming: 'Best MSS confirmations occur 15-45 minutes into the London (02:00-05:00 NY) or NY (08:30-11:00 NY) sessions.'
    },
    tradeRules: {
      entryModels: ['Wait for MSS, then set limit order at the FVG or Order Block created within the displacement leg.'],
      targetingLogic: ['The origin of the prior trend leg or opposing HTF liquidity pool.'],
      invalidationCriteria: 'Price breaks back beyond the swing point that generated the MSS (Protected Swing failure).'
    },
    invalidationCriteria: 'When price fails to follow through and immediately violates the displacement origin.',
    diagramType: 'mss_sequence',
    simplifiedExplanation: 'BOS means "we are still driving down the same highway." CHoCH means "we just saw a detour sign." MSS means "we have turned onto a brand new road with full acceleration."'
  },
  {
    id: 'displacement_engine',
    name: 'Displacement (The Engine)',
    category: 'imbalances',
    shortDefinition: 'An aggressive, sudden, one-sided price expansion characterized by large candle bodies, small wicks, and substantial volume, signaling institutional sponsorship.',
    source: {
      mentorship: '2022 YouTube Mentorship',
      seriesOrMonth: 'Episode 2 & 4: Identifying Institutional Sponsorship',
      approximateDate: '2022',
      originalTerminology: 'Energetic Delivery & Liquidity Imbalance Run',
      conceptStatus: 'Active Core',
      lectureReference: '2022 Mentorship Episode 2 (Timestamp 14:20)'
    },
    tripartiteView: {
      ictTeaching: 'Michael calls displacement the signature of Smart Money. Retail cannot create large-bodied candles that cut through multiple price levels in seconds; only algorithmic institutional capital deployment does.',
      observableMarketBehavior: 'Extreme buy/sell order imbalance in the order flow tape. The rate of order arrival outstrips resting limit depth, creating rapid slippage through multiple ticks and leaving low-volume nodes on volume profiles.',
      derivedInterpretation: 'Momentum expansion and price discovery: When institutional participants execute large market orders, price moves quickly to find the next zone of deep resting liquidity.'
    },
    explanationLadder: {
      level1Child: 'Imagine a bowling ball thrown down a ramp. It rolls so fast and with so much power that it clears everything in its path without slowing down.',
      level2Beginner: 'Displacement looks like a series of long, strong candles of the same color that have almost no shadows (wicks) on the ends.',
      level3Trader: 'Do not trade during the displacement candle itself (fear of missing out). Wait for the displacement to finish, mark the Fair Value Gap it leaves behind, and wait for price to retrace.',
      level4Advanced: 'Displacement must have purpose: displacement starting from a liquidity sweep or HTF PD Array is high probability; random displacement inside consolidation is low probability.',
      level5ICTFramework: 'Displacement represents the IPDA re-pricing price from one fair value quadrant to the next, leaving Fair Value Gaps that must subsequently be mitigated.',
      whenItMatters: 'Immediately following a liquidity sweep or at the retest of a major HTF Order Block.',
      whenToIgnore: 'During low-volume bank holidays or late NY PM session (after 15:30 NY time).'
    },
    whyItExists: 'Institutional market participants cannot accumulate or distribute massive positions gradually without moving the market; when they execute, they clear the order book immediately.',
    problemItSolves: 'Provides definitive proof that smart money is actively involved in the move, differentiating genuine reversals from choppy retail noise.',
    howItForms: 'Formed when large institutional volume enters the market, consuming multiple levels of resting limit orders within seconds and creating tall candle bodies.',
    chartAnatomy: 'Candles with long bodies, short or non-existent wicks, closing near their highs (bullish) or lows (bearish), usually spanning 3-5 standard ATR ranges.',
    identificationRules: [
      'Candle body constitutes at least 70-80% of the total candle range (minimal wicks).',
      'Noticeably larger than the preceding 5-10 consolidation candles.',
      'Leaves behind a 3-candle Fair Value Gap (FVG).',
      'Breaks through a previous structural high or low with conviction.'
    ],
    validCharacteristics: [
      'Velocity and magnitude: swift movement across multiple price levels.',
      'Originates from a clear liquidity sweep (BSL/SSL) or HTF PD Array.',
      'Creates structural shift (MSS).'
    ],
    invalidCharacteristics: [
      'Gradual grinding candles with large overlapping wicks on both sides.',
      'Slow movement that takes 20 candles to travel 10 pips.'
    ],
    howICTUsesIt: 'ICT views displacement as the non-negotiable prerequisite for any valid 2022 Model or Silver Bullet setup.',
    commonMistakes: [
      'Chasing the displacement candle and buying at the very top of the move.',
      'Mistaking news spike wicks (with 90% wick and 10% body) for genuine displacement.'
    ],
    advancedNuances: 'If price shows displacement but immediately retraces 100% and breaks the origin candle, the displacement was an institutional trap/spoof.',
    prerequisites: ['Order Book Mechanics', 'Candlestick Anatomy'],
    relatedConcepts: ['Fair Value Gaps', 'Market Structure Shift', 'Order Blocks', '2022 Model'],
    bullishScenario: 'Price taps Daily Discount FVG, prints a 5-minute candle that moves 25 pips in 3 minutes, closes at its high, and leaves a 12-pip FVG behind.',
    bearishScenario: 'After London sweeps Asian High, a 15-minute black candle drops 40 pips, breaking the Asian low and creating a massive imbalance.',
    counterexample: 'A 50-pip wick created in 1 second during CPI news that immediately pulls back to the open, closing as a doji—this is a volatility spike, NOT displacement.',
    counterexamples: [
      {
        title: 'The News Spike Doji Trap',
        trapDescription: 'Interpreting a high-impact news candle with giant 50-pip wicks on both sides as directional displacement.',
        whyItFails: 'High wicks represent dual-sided liquidity liquidation without institutional directional commitment.',
        ruleOfThumb: 'Only recognize displacement when candle bodies are solid and close near the extreme high or low.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'fair_value_gap',
        targetLabel: 'Fair Value Gap (FVG)',
        whyThisFollows: 'Because displacement moves so quickly, the middle candle in the 3-candle sequence has no opposing transactions, creating an FVG.',
        institutionalMechanic: 'One-sided pricing leaves buy-only or sell-only imbalances.',
        riskOfSkipping: 'Entering without locating the FVG means you lack an objective limit entry price and risk definition.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily displacement defines the weekly bias and sets up multi-day expansion candles.',
      ltfApplication: '1M-5M displacement confirms intraday execution triggers inside Killzones.',
      sessionAndTiming: 'Displacement is most powerful at 03:00-04:00 (London Killzone) and 08:30-10:00 (NY AM Killzone).'
    },
    tradeRules: {
      entryModels: ['Never enter during displacement. Wait for retracement into the FVG created by displacement.'],
      targetingLogic: ['External liquidity pools or opposing PD arrays.'],
      invalidationCriteria: 'Price trading through and closing beyond the origin candle that initiated displacement.'
    },
    invalidationCriteria: 'Price completely re-trading through the displacement origin without finding support/resistance.',
    diagramType: 'fvg_formation',
    simplifiedExplanation: 'Displacement is like a jet plane firing up its afterburners. You do not try to jump onto the jet while it is speeding down the runway; you wait for it to land at the next terminal.'
  },
  {
    id: 'fair_value_gap',
    name: 'Fair Value Gap (FVG)',
    category: 'imbalances',
    shortDefinition: 'A 3-candlestick price imbalance where candle 1 wick and candle 3 wick do not overlap, leaving an unfilled single-sided price delivery zone in candle 2.',
    source: {
      mentorship: '2016 Core Content & 2022 YouTube Mentorship',
      seriesOrMonth: '2022 Mentorship: Episode 1, 2, 3',
      approximateDate: '2016 / 2022',
      originalTerminology: 'Liquidity Imbalance / Single Price Delivery / Fair Value Gap',
      conceptStatus: 'Active Core',
      lectureReference: '2022 Mentorship Episode 1 (Timestamp 08:45)'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that the algorithm delivers price in two ways: balanced (buys and sells offered at every tick) and imbalanced (only buys or only sells offered). An FVG is an incomplete delivery that IPDA will return to re-balance.',
      observableMarketBehavior: 'Low Volume Node / Single prints on Market Profile. Rapid price moves create a price gap where few limit orders had the opportunity to transact. The market frequently re-tests this zone to fill latent liquidity.',
      derivedInterpretation: 'Inefficient price discovery: When an asset reprices rapidly, liquidity providers widen their spreads. When price retraces into the FVG, liquidity providers normalize spreads and institutional limit orders are filled.'
    },
    explanationLadder: {
      level1Child: 'Imagine a painter who rushed across a wall with a paint roller and left a dry, unpainted patch in the middle. Later, the painter comes back to brush over the empty patch so the wall looks smooth.',
      level2Beginner: 'Look at three candles in a row. If there is empty space between the tip of the first candle and the tip of the third candle, that empty window is a Fair Value Gap.',
      level3Trader: 'Mark the 50% midpoint of the FVG (called Consequent Encroachment or CE). Use CE as your primary limit order entry, with your stop safely below the first candle.',
      level4Advanced: 'An FVG in Discount territory aligned with a Higher Timeframe Bullish Order Block has the highest statistical win rate.',
      level5ICTFramework: 'FVG is a primary PD Array. IPDA uses FVGs to draw price back into fair value before launching the next expansion wave toward external liquidity.',
      whenItMatters: 'When the FVG is created by energetic displacement that successfully creates a Market Structure Shift (MSS).',
      whenToIgnore: 'When the FVG forms against higher timeframe orderflow or inside a tight, choppy consolidation range.'
    },
    whyItExists: 'When violent buying or selling occurs, price moves too quickly for both sides of the market to be offered fairly. Only buyers or only sellers were serviced during candle 2.',
    problemItSolves: 'Provides an exact, high-precision entry price zone and risk boundary rather than guessing where to enter on a moving market.',
    howItForms: 'Occurs in a 3-candle sequence: In a bullish FVG, Candle 1 High is lower than Candle 3 Low, creating a gap between them. In a bearish FVG, Candle 1 Low is higher than Candle 3 High.',
    chartAnatomy: 'Bullish FVG: Zone between Candle 1 High (bottom of FVG) and Candle 3 Low (top of FVG). Bearish FVG: Zone between Candle 1 Low (top of FVG) and Candle 3 High (bottom of FVG).',
    identificationRules: [
      'Look for a 3-candle sequence where the middle candle (Candle 2) is a large displacement candle.',
      'Check that Candle 1 wick and Candle 3 wick DO NOT overlap.',
      'Calculate the 50% midpoint = (Top of Gap + Bottom of Gap) / 2 = Consequent Encroachment (CE).',
      'The FVG is fresh and active until price trades completely through it.'
    ],
    validCharacteristics: [
      'Formed during a confirmed Market Structure Shift (MSS).',
      'Displacement candle has high volume and clean body.',
      'Resides in Discount for bullish setups or Premium for bearish setups.'
    ],
    invalidCharacteristics: [
      'Wicks of Candle 1 and Candle 3 overlap (no gap exists).',
      'Small tiny gap inside a sideways consolidating range without displacement.'
    ],
    howICTUsesIt: 'The primary entry trigger in the ICT 2022 Mentorship Model and Silver Bullet Model.',
    commonMistakes: [
      'Marking every tiny 1-pip gap across all candles and treating them all as trading zones.',
      'Placing stop loss inside the FVG instead of beyond the swing low or Candle 1 origin.'
    ],
    advancedNuances: 'If candle bodies respect the 50% Consequent Encroachment (CE) and only wicks penetrate below it, the FVG is considered exceptionally strong.',
    prerequisites: ['Displacement (The Engine)', 'Candlestick Anatomy', 'Market Structure'],
    relatedConcepts: ['Consequent Encroachment', 'Inverse Fair Value Gap', '2022 Model', 'Silver Bullet'],
    bullishScenario: 'Price sweeps Asian Low, displaces up on 5M chart, creates a 10-pip FVG between 1.0820 and 1.0830. Price retraces to 1.0825 (50% CE), fills limit buy, and rallies 40 pips to PDH.',
    bearishScenario: 'Price sweeps PDH, crashes down through 15M structure, leaves a bearish FVG. Price retraces into the gap, rejects the top boundary, and targets Asian Low.',
    counterexample: 'Price retraces to an FVG, but candle bodies close completely through the entire gap without pausing—this is an FVG violation, turning it into an Inverse FVG (IFVG).',
    counterexamples: [
      {
        title: 'The Counter-Trend FVG Trap',
        trapDescription: 'Buying a 5M bullish FVG formed during a massive Daily/4H bearish trend without an HTF liquidity sweep.',
        whyItFails: 'Higher timeframe orderflow overrides lower timeframe imbalances. Price slices through the FVG without pausing.',
        ruleOfThumb: 'Only trade FVGs that align with the Higher Timeframe Draw on Liquidity (DOL).'
      },
      {
        title: 'The Consolidated FVG Trap',
        trapDescription: 'Trading an FVG that formed in the middle of a 1-hour consolidation range with equal highs above and equal lows below.',
        whyItFails: 'Price will oscillate through the gap repeatedly until liquidity on either side of the range is swept.',
        ruleOfThumb: 'Never trade an FVG unless it originated from a clear liquidity sweep.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'consequent_encroachment',
        targetLabel: 'Consequent Encroachment (CE 50%)',
        whyThisFollows: 'Once an FVG is identified, the trader must calculate the mathematical 50% level of the gap.',
        institutionalMechanic: 'The 50% level represents the equilibrium fair value of the imbalance where algorithms offer optimal rebalancing.',
        riskOfSkipping: 'Entering at the edge of the gap gives a wider stop loss and worse risk-reward ratio.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily and 4H FVGs act as massive magnet zones (Draws on Liquidity) and structural support/resistance.',
      ltfApplication: '1M-5M FVGs provide the precision execution entry triggers within HTF POIs.',
      sessionAndTiming: 'FVGs formed during 10:00-11:00 AM NY time (Silver Bullet) have the highest execution reliability.'
    },
    tradeRules: {
      entryModels: ['Limit order at FVG boundary or 50% Consequent Encroachment (CE)'],
      targetingLogic: ['Opposing Liquidity Pool (BSL/SSL) or unmitigated opposing FVG'],
      invalidationCriteria: 'Candle body closes beyond the opposing boundary of the FVG (Candle 1 level).'
    },
    invalidationCriteria: 'Full candle body closing through the outer boundary (Candle 1 level) of the Fair Value Gap.',
    diagramType: 'fvg_formation',
    simplifiedExplanation: 'An FVG is like an elevator that skipped 5 floors on the way up. Eventually, the elevator has to go back down to pick up the passengers who were left behind before continuing to the penthouse.'
  },
  {
    id: 'consequent_encroachment',
    name: 'Consequent Encroachment (CE 50%)',
    category: 'imbalances',
    shortDefinition: 'The exact 50% mathematical midpoint of a Fair Value Gap, Liquidity Void, or Volume Imbalance, serving as the algorithmic equilibrium of the imbalance.',
    source: {
      mentorship: '2016-2017 Core Content',
      seriesOrMonth: 'Core Content Month 4: Precision Elements of Price Imbalances',
      approximateDate: '2016',
      originalTerminology: 'Consequent Encroachment (CE) & Mean Threshold (MT)',
      conceptStatus: 'Active Core',
      lectureReference: 'Core Content Month 4 - Imbalance Mitigation Rules'
    },
    tripartiteView: {
      ictTeaching: 'Michael defines CE as the true fair value midpoint of any price void or FVG. In order blocks, the 50% midpoint is called Mean Threshold (MT); in FVGs and gaps, it is called Consequent Encroachment (CE).',
      observableMarketBehavior: 'Statistical mean reversion: retracements frequently terminate at the 50% Fibonacci level of an impulsive imbalance range where limit orders accumulate.',
      derivedInterpretation: 'Optimal liquidity re-pricing: Institutional limit orders are often staged at the 50% depth of the imbalance to achieve balanced inventory fills.'
    },
    explanationLadder: {
      level1Child: 'If you buy a half-empty bottle of juice, the halfway line is where the balance sits. If the liquid stays above the halfway mark, the bottle is still mostly full.',
      level2Beginner: 'Take the highest price and lowest price of the empty gap, add them together and divide by 2. That exact halfway line is Consequent Encroachment.',
      level3Trader: 'Candle wicks can pierce through CE, but healthy orderflow requires candle BODIES to close on or above the CE line for bullish setups.',
      level4Advanced: 'If a candle body closes past CE, it warns that the FVG is weak and price may fully violate the gap or invert into an IFVG.',
      level5ICTFramework: 'CE represents the algorithmic pricing threshold. When IPDA touches CE, the gap is mathematically balanced and ready for expansion.',
      whenItMatters: 'Every time price retraces into a confirmed FVG on any timeframe.',
      whenToIgnore: 'On microscopic 1-pip gaps on 1-second charts where spread slippage exceeds the gap width.'
    },
    whyItExists: 'Price does not always need to fill 100% of an imbalance to be considered rebalanced; testing 50% (CE) is mathematically sufficient for institutional algorithms.',
    problemItSolves: 'Provides a single, objective mathematical price tick for limit order placement instead of guessing where inside a large 20-pip gap price will reverse.',
    howItForms: 'Calculated directly from the coordinates of the Fair Value Gap: CE = (Top of Gap + Bottom of Gap) / 2.',
    chartAnatomy: 'Drawn as a dashed horizontal line directly across the exact center of the shaded FVG box.',
    identificationRules: [
      'Locate the upper and lower boundaries of the FVG.',
      'Use the Fibonacci tool set from 0 to 1 with the 0.5 level enabled, or compute mathematically.',
      'Monitor how candle bodies interact with the CE line.'
    ],
    validCharacteristics: [
      'Candle wicks dip below CE but bodies close above CE (bullish).',
      'Price reacts immediately upon touching the CE tick.'
    ],
    invalidCharacteristics: [
      'Full candle bodies closing deep below CE and through the bottom of the gap.'
    ],
    howICTUsesIt: 'Used as the primary limit order execution price and as a dynamic health-check on the strength of the trend.',
    commonMistakes: [
      'Panicking when a wick pierces CE even though the candle body closes cleanly above it.',
      'Confusing CE (for gaps/FVGs) with Mean Threshold / MT (for Order Block candle bodies).'
    ],
    advancedNuances: 'If price sweeps liquidity and taps CE of a Higher Timeframe FVG simultaneously, the confluence creates a 90%+ probability trade execution.',
    prerequisites: ['Fair Value Gap (FVG)', 'Displacement (The Engine)'],
    relatedConcepts: ['Fair Value Gap', 'Mean Threshold', 'Inverse FVG', '2022 Model'],
    bullishScenario: '15M FVG spans 1.1000 to 1.1020 (CE is 1.1010). Price retraces, wicks down to 1.1008, but the 15M candle closes at 1.1014. Strong bullish expansion follows.',
    bearishScenario: '1H Bearish FVG has CE at 15,250. Price rallies to 15,248, taps CE, and violently rolls over into new lows.',
    counterexample: 'Price enters a bullish FVG and prints a solid candle body closing below the CE line at the bottom of the gap—the FVG is compromised.',
    counterexamples: [
      {
        title: 'The CE Body Close Violation Trap',
        trapDescription: 'Continuing to hold a long position after a candle body closes cleanly beneath the CE 50% line.',
        whyItFails: 'Body closure beyond CE signals lack of institutional buying interest and impending gap failure.',
        ruleOfThumb: 'If a candle body closes beyond CE, move stop to breakeven or close the trade immediately.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'ict_2022_model',
        targetLabel: 'ICT 2022 Mentorship Model',
        whyThisFollows: 'In the complete 2022 execution sequence, entering at CE provides the highest reward-to-risk ratio.',
        institutionalMechanic: 'Execution at equilibrium minimizes drawdown while maximizing R-multiple.',
        riskOfSkipping: 'Entering prematurely at the edge of the gap increases risk by 30-50%.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily CE levels are respected for days and serve as major turning points.',
      ltfApplication: '1M/5M CE levels are used for precise limit order entry.',
      sessionAndTiming: 'CE fills during London or NY Killzones provide immediate explosive delivery.'
    },
    tradeRules: {
      entryModels: ['Limit buy/sell order placed directly on the CE line.'],
      targetingLogic: ['Opposing swing highs/lows or liquidity pools.'],
      invalidationCriteria: 'Candle body closes beyond the outer FVG boundary.'
    },
    invalidationCriteria: 'Candle body closing beyond the 50% CE level in the opposite direction of the trade.',
    diagramType: 'fvg_formation',
    simplifiedExplanation: 'CE is the bullseye on a target. Hitting the bullseye is all the algorithm needs to confirm the price is rebalanced.'
  },
  {
    id: 'order_block',
    name: 'Order Block (OB)',
    category: 'order_blocks',
    shortDefinition: 'The last opposing candlestick (or consolidation block) prior to a violent displacement that sweeps liquidity and creates a Market Structure Shift.',
    source: {
      mentorship: '2016-2017 Core Content & Scout Sniper Series',
      seriesOrMonth: 'Core Content Month 4: Order Block Anatomy & Validation',
      approximateDate: '2016',
      originalTerminology: 'Bullish / Bearish Order Block',
      conceptStatus: 'Active Core',
      lectureReference: 'Core Content Month 4 - Video 2'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that an Order Block is where smart money accumulated their positions. The last down candle before an up move is an institutional buy block; when price returns, institutions defend the position by adding volume.',
      observableMarketBehavior: 'High volume accumulation node prior to trend breakout. The origin candle represents the point where large institutional limit orders absorbed opposing flow.',
      derivedInterpretation: 'Supply and Demand zone with structural prerequisites: Unlike generic supply/demand, an authentic Order Block must have swept liquidity and created a structural break with displacement.'
    },
    explanationLadder: {
      level1Child: 'Think of a spring being pressed down into the floor before jumping 10 feet into the air. The spot where the spring was pressed down is the Order Block.',
      level2Beginner: 'The last red candle before a massive green rocket is a Bullish Order Block. The last green candle before a red crash is a Bearish Order Block.',
      level3Trader: 'Do not mark the wicks as the main zone; focus on the candle BODY. The 50% midpoint of the candle body is called the Mean Threshold (MT). Candle bodies must respect MT.',
      level4Advanced: 'An Order Block that forms AFTER sweeping a liquidity pool (BSL/SSL) has 10x higher probability than an Order Block formed inside a continuation trend.',
      level5ICTFramework: 'Order Blocks represent institutional sponsorship. IPDA re-visits the OB to allow smart money to mitigate any remaining hedge orders before expanding.',
      whenItMatters: 'When the OB swept prior liquidity, caused clean displacement, and broke market structure (MSS).',
      whenToIgnore: 'When the candle is just a random pullback inside a consolidation range without any liquidity sweep or displacement.'
    },
    whyItExists: 'Institutions cannot enter all their size at once; they build positions in blocks. When price returns to this origin, they defend their inventory.',
    problemItSolves: 'Identifies the exact origin of institutional buying or selling power on the chart.',
    howItForms: 'Bullish OB: The lowest down-close candle (or consecutive down candles) prior to an aggressive upward displacement that breaks swing highs. Bearish OB: The highest up-close candle prior to downward displacement.',
    chartAnatomy: 'Bullish OB: Highlighted from the Open of the down candle down to its Low. The Mean Threshold (MT) is the 50% line between the Open and Close/Low.',
    identificationRules: [
      'Identify the last opposing candle before a violent displacement.',
      'Verify that the displacement created an MSS and left an FVG.',
      'Check that the OB took out prior liquidity (swept an old high/low).',
      'Calculate Mean Threshold (MT) = 50% of the candle body.'
    ],
    validCharacteristics: [
      'Prior liquidity sweep (Turtle Soup / Stop run).',
      'Subsequent displacement candle is large with heavy volume.',
      'Creates a fresh Market Structure Shift (MSS).'
    ],
    invalidCharacteristics: [
      'Random opposing candle that did not cause any structural break.',
      'Candle with no displacement following it.'
    ],
    howICTUsesIt: 'Used as an institutional anchor for entries, stop-loss protection, and trend direction confirmation.',
    commonMistakes: [
      'Labeling every single red candle in an uptrend as an Order Block.',
      'Ignoring Mean Threshold (MT) and allowing candle bodies to close deep below the OB.'
    ],
    advancedNuances: 'If an Order Block fails and price closes completely through it, that failed Order Block immediately converts into a Breaker Block or Mitigation Block.',
    prerequisites: ['Displacement', 'Market Structure', 'Liquidity Sweeps'],
    relatedConcepts: ['Breaker Block', 'Mitigation Block', 'Mean Threshold', '2022 Model'],
    bullishScenario: 'Price sweeps Asian Low, prints a down candle at 1.0800, then explodes upward with 3 giant green candles breaking 1.0840. Price retraces to 1.0805 (OB Open), holds, and rallies to 1.0900.',
    bearishScenario: 'Price sweeps PDH, prints an up candle, then crashes down breaking structure. Retracement into the up candle body provides a pristine short entry.',
    counterexample: 'Price returns to an "Order Block", but slices straight through it without any rejection wicks—this was an invalid block with no institutional sponsorship.',
    counterexamples: [
      {
        title: 'The "Random Candle" Trap',
        trapDescription: 'Marking a red candle in the middle of a sideways chop and expecting it to act as an institutional Order Block.',
        whyItFails: 'Without a prior liquidity sweep and subsequent displacement, the candle represents retail churn, not institutional positioning.',
        ruleOfThumb: 'No liquidity sweep + No displacement = NOT an Order Block.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'breaker_block',
        targetLabel: 'Breaker Block',
        whyThisFollows: 'If market orderflow shifts and an Order Block is decisively broken after a liquidity sweep, the Order Block inverts into a Breaker Block.',
        institutionalMechanic: 'Trapped institutional positions in the failed OB must be mitigated on the retest.',
        riskOfSkipping: 'Failing to recognize an OB failure causes traders to keep buying a falling market instead of switching to short on the breaker.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily/Weekly OBs represent major institutional support/resistance levels.',
      ltfApplication: '1M-5M OBs provide tight-stop execution inside HTF zones.',
      sessionAndTiming: 'OBs formed during London Open or 09:30 NY Open are the most reliable.'
    },
    tradeRules: {
      entryModels: ['Limit order at OB Open or Mean Threshold (MT 50%)'],
      targetingLogic: ['Opposing Liquidity Pool or opposing HTF PD Array'],
      invalidationCriteria: 'Candle body closing past the Mean Threshold (MT 50%) or beyond the OB Low/High.'
    },
    invalidationCriteria: 'Candle body closing beyond the 50% Mean Threshold (MT) or breaching the extreme low/high of the Order Block.',
    diagramType: 'order_block',
    simplifiedExplanation: 'An Order Block is the footprints left in wet cement by a giant. When price walks back to that footprint, it steps right into the same solid ground.'
  },
  {
    id: 'breaker_block',
    name: 'Breaker Block',
    category: 'order_blocks',
    shortDefinition: 'A failed Order Block that swept liquidity (formed a higher high or lower low) before being violently broken by displacement, inverting its support/resistance role.',
    source: {
      mentorship: '2016-2017 Core Content & Scout Sniper Series',
      seriesOrMonth: 'Core Content Month 5: Order Blocks & Breakers',
      approximateDate: '2016',
      originalTerminology: 'Bearish / Bullish Breaker Block',
      conceptStatus: 'Active Core',
      lectureReference: 'Core Content Month 5 - Video 1 & 2'
    },
    tripartiteView: {
      ictTeaching: 'Michael emphasizes that Breaker Blocks are among the highest probability setups in the entire ICT universe because they involve trapped institutional orderflow and a complete liquidity purge.',
      observableMarketBehavior: 'Failed breakout retest: Traders who bought the breakout high are trapped when price crashes. When price returns to their entry, they sell to break even, creating strong resistance.',
      derivedInterpretation: 'Trapped liquidity mitigation: Market participants who accumulated positions at the swing failure point exit at breakeven during the pullback, fueling the reversal.'
    },
    explanationLadder: {
      level1Child: 'Imagine a wooden trapdoor. You stand on it, jump high to touch the ceiling, but when you land, the trapdoor breaks open. When you try to climb back up from below, the broken door hits your head and blocks you.',
      level2Beginner: 'A Bullish Breaker is a down candle that took out a low, then price skyrocketed past the previous high. When price comes back down to that down candle, it bounces upward.',
      level3Trader: 'The key distinction between a Breaker and a Mitigation block is the LIQUIDITY SWEEP: A Breaker MUST sweep liquidity (make a Higher High in bearish or Lower Low in bullish).',
      level4Advanced: 'Because a Breaker swept liquidity, it carries much higher institutional conviction than a simple Order Block.',
      level5ICTFramework: 'Breakers represent IPDA resetting directional intent. The algorithm uses the Breaker to purge stale orders before launching the true trend.',
      whenItMatters: 'After a confirmed sweep of major BSL/SSL followed by an immediate aggressive MSS.',
      whenToIgnore: 'When price broke the swing without sweeping any prior liquidity (this is a Mitigation block, not a Breaker).'
    },
    whyItExists: 'When price sweeps liquidity and aggressively reverses, traders who entered during the sweep are trapped in underwater positions. When price returns to this zone, their breakeven mitigation orders create powerful rejection.',
    problemItSolves: 'Provides high-probability reversal entries with built-in trapped liquidity confirmation.',
    howItForms: 'Bearish Breaker: Low -> High -> Lower Low (SSL Swept) -> Price shoots up breaking the High. The down candle at the initial Low is the Bullish Breaker. Bearish is inverted: High -> Low -> Higher High (BSL swept) -> price crashes below Low.',
    chartAnatomy: 'Marked on the extreme opposing candle of the initial swing that was subsequently violated by displacement.',
    identificationRules: [
      'In a Bearish Breaker: Identify Low (1) -> Higher High (2, BSL swept) -> Lower Low (3, displacement break).',
      'The up candle at Low (1) is the Bearish Breaker.',
      'When price pulls back up to Low (1), look for a short entry.',
      'Verify that High (2) took out prior liquidity.'
    ],
    validCharacteristics: [
      'Must have a distinct liquidity raid (Higher High in bearish, Lower Low in bullish).',
      'Violent displacement breaking the intermediate swing.',
      'Clean retest with rejection wicks.'
    ],
    invalidCharacteristics: [
      'Did not sweep liquidity (made a failure swing / lower high instead).',
      'Slow drifting price action without displacement.'
    ],
    howICTUsesIt: 'One of ICT\'s favorite high-probability execution PD Arrays, often combined with OTE (Optimal Trade Entry) Fibonacci levels.',
    commonMistakes: [
      'Confusing a Breaker Block with a Mitigation Block (Mitigation does NOT sweep liquidity).',
      'Placing entry on the wrong candle (must be the opposing candle at the swing pivot).'
    ],
    advancedNuances: 'A Breaker Block overlapping with an unmitigated Fair Value Gap creates an ultra-high-probability confluence known as a "Breaker + FVG Matrix".',
    prerequisites: ['Order Block', 'Liquidity Sweeps', 'Market Structure Shift'],
    relatedConcepts: ['Mitigation Block', 'Order Block', 'Fair Value Gap', '2022 Model'],
    bullishScenario: 'Price makes a High at 100, drops to 90 (sweeping SSL), then violently blasts through 100 to 110. The down candle at 90 is the Bullish Breaker. Price pulls back to 95-100 and rockets to 130.',
    bearishScenario: 'Price makes a Low at 50, rallies to 65 (sweeping BSL), then crashes down through 50 to 35. The up candle at 50 is the Bearish Breaker. Retest of 50 offers prime short entry.',
    counterexample: 'Price makes a Lower High (failed to sweep BSL) and breaks structure—the retested block is a Mitigation Block, NOT a Breaker.',
    counterexamples: [
      {
        title: 'The "No Liquidity Sweep" Mitigation Mistake',
        trapDescription: 'Calling a swing a Breaker Block when the swing failed to sweep prior highs/lows.',
        whyItFails: 'Without a liquidity sweep, there are no trapped breakout traders to fuel the reversal.',
        ruleOfThumb: 'If High (2) did NOT take out prior BSL, it is a Mitigation Block with lower probability.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'optimal_trade_entry_ote',
        targetLabel: 'Optimal Trade Entry (OTE)',
        whyThisFollows: 'Breaker Blocks frequently line up precisely with the 62% - 79% Fibonacci retracement of the displacement leg.',
        institutionalMechanic: 'Algorithmic confluence of trapped orderflow mitigation and discount/premium pricing.',
        riskOfSkipping: 'Entering without checking OTE levels can lead to getting stopped out by deeper retracements.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily Breakers produce multi-hundred pip trends across major FX pairs and indices.',
      ltfApplication: '1M-5M Breakers provide explosive scalp entries during NY AM session.',
      sessionAndTiming: 'Most effective during London Open (03:00-04:00 NY) and NY Open (09:30-10:30 NY).'
    },
    tradeRules: {
      entryModels: ['Limit order at the Breaker Block boundary or overlap with FVG'],
      targetingLogic: ['Opposing liquidity pool or swing extreme'],
      invalidationCriteria: 'Candle body closing completely beyond the extreme sweep wick of the setup.'
    },
    invalidationCriteria: 'Price accepting and closing candles beyond the origin swing point of the breaker.',
    diagramType: 'breaker_block',
    simplifiedExplanation: 'A Breaker is like a broken lock. Once thieves smash through it from the outside, the door swings the other way and locks them inside.'
  },
  {
    id: 'inverse_fair_value_gap',
    name: 'Inverse Fair Value Gap (IFVG)',
    category: 'imbalances',
    shortDefinition: 'A Fair Value Gap that was violated and closed through by opposing price action, flipping its role from support to resistance (or vice versa).',
    source: {
      mentorship: '2022-2023 YouTube Mentorship & Twitter Spaces',
      seriesOrMonth: '2023 Mentorship: Inversion Models & PD Array Flips',
      approximateDate: '2023',
      originalTerminology: 'Inversion Fair Value Gap (IFVG)',
      conceptStatus: 'Active Core',
      lectureReference: '2023 Mentorship Series - Inversion Delivery'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that when an FVG fails to hold price, it does not disappear. The algorithm inverts the imbalance into an opposing PD array, providing immediate continuation entries.',
      observableMarketBehavior: 'Support-resistance flip across an orderflow void: When aggressive flow overpowers resting limit orders in a gap, the failed zone acts as a natural ceiling/floor upon retest.',
      derivedInterpretation: 'Regime shift confirmation: The failure of an expected support imbalance confirms that dominant orderflow has transitioned to aggressive selling.'
    },
    explanationLadder: {
      level1Child: 'Imagine a glass bridge. If someone stomps on it and shatters it, you can no longer walk across the top, but you can now stand under it and use the metal frame as a ceiling.',
      level2Beginner: 'A green buy gap that got smashed by a big red candle turns into a red sell gap when price tests it from below.',
      level3Trader: 'When a bullish FVG fails, do not stay in your long trade. Flip your bias to short and enter when price re-tests the underside of the violated FVG.',
      level4Advanced: 'IFVGs are especially potent when they occur after a liquidity sweep and coincide with an MSS.',
      level5ICTFramework: 'An IFVG proves that IPDA has shifted its delivery algorithm from buying dips to selling rallies.',
      whenItMatters: 'When an FVG gets completely run through by a displacement candle closing beyond it.',
      whenToIgnore: 'When price merely wicks into the gap and respects the boundaries (this is a normal FVG mitigation, not an inversion).'
    },
    whyItExists: 'When order flow aggressively shifts, previously created imbalances are blown through. These violated gaps become the new reference level for algorithmic repricing.',
    problemItSolves: 'Gives traders an immediate, objective entry framework when their original FVG idea is invalidated, turning a failed trade into a winning reversal.',
    howItForms: 'A bullish FVG forms. Instead of price bouncing, an aggressive bearish candle slices through the gap and closes below Candle 1 Low. The zone now acts as resistance.',
    chartAnatomy: 'Drawn using the exact same coordinates as the original FVG, but with the color and label flipped (e.g., Bullish FVG -> Bearish IFVG).',
    identificationRules: [
      'Identify an existing valid Fair Value Gap.',
      'Observe price violating the gap with a full candle body close beyond the outer boundary.',
      'Wait for price to retrace into the violated gap from the opposite side.',
      'Enter on the retest with stop loss placed beyond the invalidation swing.'
    ],
    validCharacteristics: [
      'Displacement candle slicing cleanly through the gap with conviction.',
      'Candle body closing fully outside the gap.',
      'Clean retest from the opposite side with rejection wicks.'
    ],
    invalidCharacteristics: [
      'Price merely wick-penetrating the gap without closing beyond it.',
      'Messy chop through the gap without directional displacement.'
    ],
    howICTUsesIt: 'Popularized heavily in ICT\'s 2023 teachings as an indispensable continuation and reversal tool.',
    commonMistakes: [
      'Assuming an FVG has inverted before a candle body actually closes beyond it.',
      'Trading IFVGs against higher timeframe orderflow.'
    ],
    advancedNuances: 'If an IFVG lines up with a Breaker Block, the confluence is considered an A+ Institutional Setup.',
    prerequisites: ['Fair Value Gap (FVG)', 'Displacement (The Engine)'],
    relatedConcepts: ['Fair Value Gap', 'Breaker Block', '2022 Model', 'Silver Bullet'],
    bullishScenario: 'A bearish FVG is blown through by a massive 5M green candle that closes above the top of the gap. Price retraces to test the top of the gap from above and launches a 50-pip rally.',
    bearishScenario: 'A bullish FVG is pierced by a red displacement candle closing below the bottom of the gap. Price bounces back up into the gap, gets rejected, and dumps to sell-side liquidity.',
    counterexample: 'Price wicks through a bullish FVG by 2 ticks, but the candle closes inside the gap—this is a normal deep mitigation, NOT an IFVG.',
    counterexamples: [
      {
        title: 'The "Wick Only" Fake Inversion Trap',
        trapDescription: 'Treating an FVG as inverted because a long wick stabbed through it, even though the body closed inside the gap.',
        whyItFails: 'Wicks represent price testing; only body closes confirm an authentic structural inversion.',
        ruleOfThumb: 'Require a full candle body close outside the FVG before declaring an Inversion.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'ict_2022_model',
        targetLabel: 'ICT 2022 Mentorship Model',
        whyThisFollows: 'When standard 2022 model FVGs fail, IFVGs provide the immediate counter-trend execution trigger.',
        institutionalMechanic: 'Capitalizing on failed orderflow and forced retail stop liquidations.',
        riskOfSkipping: 'Holding onto losing biases instead of adapting to algorithmic inversion.'
      }
    ],
    timeframeMatrix: {
      htfApplication: '1H and 4H IFVGs dictate strong multi-day trend continuations.',
      ltfApplication: '1M-5M IFVGs provide rapid intraday scalping entries.',
      sessionAndTiming: 'Highly effective during the New York PM session (13:30-15:00 NY).'
    },
    tradeRules: {
      entryModels: ['Limit order at the retested boundary of the inverted gap'],
      targetingLogic: ['Opposing liquidity pool (BSL or SSL)'],
      invalidationCriteria: 'Candle body closing back inside and through the inverted gap.'
    },
    invalidationCriteria: 'Price trading back through and closing beyond the opposite side of the inverted gap.',
    diagramType: 'fvg_formation',
    simplifiedExplanation: 'An IFVG is a turnstile that used to only let people in. Once it gets kicked open in the opposite direction, it now only lets people out.'
  },
  {
    id: 'ict_2022_model',
    name: 'ICT 2022 Mentorship Model',
    category: 'models',
    shortDefinition: 'The canonical 5-step retail mentorship framework: 1. Higher Timeframe Liquidity Sweep, 2. Lower Timeframe Displacement, 3. Market Structure Shift, 4. FVG Retracement Entry, 5. Target Opposing Liquidity.',
    source: {
      mentorship: '2022 YouTube Mentorship',
      seriesOrMonth: '2022 YouTube Mentorship Series (Episodes 1-41)',
      approximateDate: '2022',
      originalTerminology: 'The 2022 Model / Core Execution Framework',
      conceptStatus: 'Active Core',
      lectureReference: '2022 Mentorship Episode 1-5'
    },
    tripartiteView: {
      ictTeaching: 'Michael released the 2022 model as a complete, self-contained index and forex trading system that anyone can execute mechanically without complex indicators.',
      observableMarketBehavior: 'Complete institutional orderflow delivery cycle: Liquidity capture -> Momentum impulse -> Structural break -> Imbalance rebalance -> Target expansion.',
      derivedInterpretation: 'Systematic statistical trading edge: The model combines high-probability liquidity triggers with positive skew reward-to-risk (typically 1:2.5 to 1:4).'
    },
    explanationLadder: {
      level1Child: '1. Wait for someone to touch the electric fence (Liquidity Sweep). 2. Watch everyone run away in fear (Displacement). 3. See the exit door open (MSS). 4. Step through the doorway calmly (FVG Entry). 5. Collect the prize at the finish line (Target).',
      level2Beginner: 'Step 1: Old high or low swept. Step 2: Strong fast candles. Step 3: Breaks previous swing. Step 4: Buy at the empty gap. Step 5: Take profit at the next old low.',
      level3Trader: 'Execute exclusively during Killzones (02:00-05:00 or 08:30-11:00 NY time). If there is no liquidity sweep prior to displacement, DO NOT TAKE THE TRADE.',
      level4Advanced: 'Ensure the sweep occurs at a Higher Timeframe (HTF) level like Daily High/Low or 1H PD Array to maximize win rate.',
      level5ICTFramework: 'The 2022 model captures the complete algorithmic delivery sequence of IPDA from liquidity extraction to repricing.',
      whenItMatters: 'During London and NY Killzones when HTF liquidity has just been swept.',
      whenToIgnore: 'During mid-day lunch consolidation (12:00-13:00 NY) or ahead of major FOMC / CPI announcements.'
    },
    whyItExists: 'Synthesizes all core ICT concepts into a repeatable, rule-based algorithmic checklist with clear entry, stop, and target rules.',
    problemItSolves: 'Prevents over-trading and guessing by giving the trader an unambiguous 5-step checklist.',
    howItForms: '1. Price sweeps BSL or SSL. 2. Price produces aggressive displacement. 3. Displacement breaks a structural swing (MSS). 4. A clean 3-candle FVG forms. 5. Price retraces into the FVG for entry.',
    chartAnatomy: 'Clearly marked with: (1) Liquidity Sweep line, (2) Displacement leg with MSS label, (3) Shaded FVG box with 50% CE line, (4) Entry limit order, (5) Stop loss beyond swing, (6) Target at opposing liquidity.',
    identificationRules: [
      'Rule 1: Must sweep HTF Liquidity (BSL or SSL) or tap HTF PD Array.',
      'Rule 2: Lower timeframe (1M-5M) must produce clean displacement with large candle bodies.',
      'Rule 3: Must create a confirmed Market Structure Shift (MSS) with candle body close.',
      'Rule 4: Must leave a clean, unfilled Fair Value Gap (FVG).',
      'Rule 5: Entry on FVG or 50% CE with stop beyond the displacement origin swing.'
    ],
    validCharacteristics: [
      'All 5 steps occur in strict chronological order.',
      'Trade takes place inside the designated session Killzone.',
      'Minimum Reward-to-Risk ratio of 1:2 to the objective target.'
    ],
    invalidCharacteristics: [
      'Skipping the liquidity sweep and entering on random FVGs.',
      'Entering before the MSS is confirmed by a candle body close.'
    ],
    howICTUsesIt: 'The flagship teaching model for intraday Index (NQ, ES) and Forex (EUR/USD, GBP/USD) trading.',
    commonMistakes: [
      'Taking trades when displacement didn\'t break any structural swing (no MSS).',
      'Chasing the market order instead of patiently waiting for the limit fill in the FVG.'
    ],
    advancedNuances: 'If SMT Divergence is present at the liquidity sweep point (e.g. ES sweeps high but NQ fails to sweep high), the setup is considered an A+ Tier 1 execution.',
    prerequisites: ['Buy/Sell Side Liquidity', 'Displacement', 'Market Structure Shift', 'Fair Value Gap'],
    relatedConcepts: ['Silver Bullet Model', 'Optimal Trade Entry', 'SMT Divergence', 'Power of Three'],
    bullishScenario: '1. 15M SSL swept at 09:35 NY. 2. 5M chart explodes upward with 3 large green candles. 3. Breaks 09:30 swing high (MSS). 4. Leaves a 5M FVG at 18,250. 5. Limit buy fills at 18,252; stops at 18,238; targets BSL at 18,300 (+3.5R win).',
    bearishScenario: '1. Daily BSL swept at London open. 2. 1M chart crashes downward with displacement. 3. 1M MSS confirmed. 4. Retrace into 1M FVG. 5. Target Asian Low SSL.',
    counterexample: 'A trader spots an FVG and enters long, but forgets that NO liquidity was swept and structure never shifted—price dumps and stops them out.',
    counterexamples: [
      {
        title: 'The "Premature FVG" Trap',
        trapDescription: 'Entering an FVG formed during a move that did not sweep any liquidity.',
        whyItFails: 'Without a liquidity purge, the move lacks institutional backing and is prone to immediate failure.',
        ruleOfThumb: 'No Sweep = No Trade. Always verify Step 1 before looking for Step 4.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'silver_bullet_model',
        targetLabel: 'ICT Silver Bullet Model',
        whyThisFollows: 'The Silver Bullet compresses the 2022 model rules into a precise 60-minute algorithmic time window.',
        institutionalMechanic: 'Algorithmic time-based delivery executes the 2022 model within strict hourly windows.',
        riskOfSkipping: 'Trading outside algorithmic time windows increases chop and decreases hit rate.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'HTF (Daily/1H) provides the Draw on Liquidity (DOL) and sweep target.',
      ltfApplication: '1M-5M provides the displacement, MSS, and FVG entry.',
      sessionAndTiming: 'Best executed between 09:50 and 11:15 AM NY time.'
    },
    tradeRules: {
      entryModels: ['Limit order placed at the FVG boundary or 50% Consequent Encroachment (CE)'],
      targetingLogic: ['Opposing session liquidity (Asian High/Low, London High/Low, or PDH/PDL)'],
      invalidationCriteria: 'Price breaking and closing beyond the swing extreme that initiated the displacement leg.'
    },
    invalidationCriteria: 'Price violating the swing high/low that generated the displacement leg.',
    diagramType: 'top_down_matrix',
    simplifiedExplanation: 'The 2022 Model is a 5-step recipe. If you bake a cake and forget the flour (liquidity sweep) or forget the sugar (displacement), the cake fails.'
  },
  {
    id: 'silver_bullet_model',
    name: 'ICT Silver Bullet Model',
    category: 'models',
    shortDefinition: 'A time-based execution model focused on a 1-hour algorithmic window (10:00 - 11:00 AM NY time) targeting a minimum of 10-15 handles on indices or 15-20 pips on forex.',
    source: {
      mentorship: '2023 YouTube Mentorship & Live Streams',
      seriesOrMonth: '2023 YouTube Mentorship: The Silver Bullet Hour',
      approximateDate: '2023',
      originalTerminology: 'The ICT Silver Bullet Hour',
      conceptStatus: 'Active Core',
      lectureReference: '2023 Silver Bullet Series - Video 1 & 2'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that the algorithm runs a dedicated repricing cycle between 10:00 AM and 11:00 AM NY time every single trading day. An FVG formed during this hour will reliably deliver toward the day\'s draw on liquidity.',
      observableMarketBehavior: 'Post-NYSE open liquidity expansion: After the initial 09:30-10:00 open volatility subsides, institutional asset managers deploy systematic algorithmic volume for the remainder of the morning session.',
      derivedInterpretation: 'Time-window edge: Constraining execution to the highest-liquidity 60-minute interval eliminates middle-of-the-day chop and provides consistent volatility.'
    },
    explanationLadder: {
      level1Child: 'Imagine a commuter train that leaves the station at exactly 10:00 AM every single morning. You just need to be on the platform with your ticket when the train pulls in.',
      level2Beginner: 'Between 10:00 AM and 11:00 AM New York time, look for the first clean Fair Value Gap on a 1-minute or 5-minute chart and enter in the direction of the daily trend.',
      level3Trader: 'Aim for a fixed target: 10 to 15 points on E-mini S&P (ES) or 15 to 20 pips on EUR/USD. Once your target is hit, close the platform for the day.',
      level4Advanced: 'Check if the 10:00 AM macro swept London High/Low or Asian High/Low during the 09:30-10:00 open; if so, the 10:00-11:00 move will be a clean expansion.',
      level5ICTFramework: 'The Silver Bullet exploits the morning algorithmic re-pricing window where IPDA distributes positions to external liquidity.',
      whenItMatters: 'Strictly between 10:00:00 AM and 10:59:59 AM Eastern Time (New York).',
      whenToIgnore: 'Any time before 10:00 AM or after 11:00 AM.'
    },
    whyItExists: 'Removes the fatigue of staring at charts all day by restricting trading to one ultra-precise 60-minute institutional window.',
    problemItSolves: 'Solves over-trading, analysis paralysis, and getting chopped up in non-algorithmic time windows.',
    howItForms: 'At 10:00 AM NY, identify the Draw on Liquidity. When price creates an FVG on the 1M or 5M chart, enter immediately on the FVG and target the opposing pool.',
    chartAnatomy: 'Highlighted 1-hour shaded vertical band on the chart between 10:00 and 11:00 AM NY with the active FVG marked inside the window.',
    identificationRules: [
      'Clock must be strictly between 10:00 AM and 11:00 AM NY Time (London window is 03:00-04:00 AM NY, PM window is 02:00-03:00 PM NY).',
      'Identify the obvious Draw on Liquidity (BSL or SSL).',
      'Look for the first clean FVG formed inside the hour.',
      'Enter on the FVG with stop placed at the swing invalidation.',
      'Target 10-15 handles on ES/NQ or 15 pips on Forex.'
    ],
    validCharacteristics: [
      'Clear draw on liquidity visible on the 15M/1H chart.',
      'Clean FVG formed after 10:00 AM.',
      'Quick delivery to target within the 1-hour window.'
    ],
    invalidCharacteristics: [
      'Taking trades at 11:15 AM after the window has expired.',
      'Trading when the market is stuck in a 5-point consolidation range with no clear draw.'
    ],
    howICTUsesIt: 'The ultimate streamlined model for busy traders with limited screen time.',
    commonMistakes: [
      'Forcing a trade at 10:50 AM when no clean FVG formed during the hour.',
      'Greedily trying to hold for 100 points instead of taking the mechanical 15 handles.'
    ],
    advancedNuances: 'The 10:00 AM Economic News releases (like ISM, Consumer Confidence, Existing Home Sales) often provide the exact displacement needed to create the Silver Bullet FVG.',
    prerequisites: ['Fair Value Gap', 'Sessions & Killzones', 'Draw on Liquidity'],
    relatedConcepts: ['2022 Model', 'Sessions & Killzones', 'Power of Three'],
    bullishScenario: '10:03 AM NY: NQ sweeps London Low, prints a 1M bullish displacement, leaves a 5-point FVG at 18,320. Enter long at 18,322; stop at 18,312; target 18,340 (+18 points hit by 10:24 AM).',
    bearishScenario: '10:05 AM NY: EUR/USD sweeps PDH, prints 5M bearish FVG. Enter short; target PDL; 20 pips banked by 10:45 AM.',
    counterexample: 'A trader enters a "Silver Bullet" at 11:30 AM during lunch chop and gets stopped out by sideways drift.',
    counterexamples: [
      {
        title: 'The "Outside the Window" Trap',
        trapDescription: 'Entering an FVG at 11:15 AM and calling it a Silver Bullet.',
        whyItFails: 'Institutional morning order routing concludes at 11:00 AM, entering the low-volume NY lunch lull.',
        ruleOfThumb: 'If it\'s 11:01 AM, cancel all resting limit orders.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'sessions_killzones_timing',
        targetLabel: 'Sessions & Killzones Timing',
        whyThisFollows: 'Understanding macro session delivery makes the 10:00-11:00 AM Silver Bullet window predictable.',
        institutionalMechanic: 'Session orderflow synchronizes multi-asset liquidity distribution.',
        riskOfSkipping: 'Trading blindly without knowing whether London or NY created the high of the day.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily chart determines the draw on liquidity (Bullish or Bearish DOL).',
      ltfApplication: '1M-5M chart provides the exact FVG entry inside the 1-hour window.',
      sessionAndTiming: 'Strictly 10:00 AM - 11:00 AM NY (Morning), 02:00 PM - 03:00 PM NY (Afternoon), or 03:00 AM - 04:00 AM NY (London).'
    },
    tradeRules: {
      entryModels: ['Limit entry on the first clean FVG formed inside the 60-minute window'],
      targetingLogic: ['Fixed 10-15 handles on ES/NQ or opposing session liquidity'],
      invalidationCriteria: 'Candle body closing beyond the swing low/high of the displacement candle.'
    },
    invalidationCriteria: 'Price failing to reach target before 11:00 AM or violating the displacement swing.',
    diagramType: 'session_timeline',
    simplifiedExplanation: 'The Silver Bullet is like a happy hour discount. It is only valid from 10:00 to 11:00. Once the clock strikes 11:00, the special deal is gone.'
  },
  {
    id: 'power_of_three_amd',
    name: 'Power of Three (AMD): Accumulation, Manipulation, Distribution',
    category: 'time_sessions',
    shortDefinition: 'The universal 3-phase delivery cycle of every candlestick or session: Accumulation (consolidation near Open), Manipulation (false move opposite to true direction / Judas Swing), and Distribution (expansion toward true target).',
    source: {
      mentorship: '2016-2017 Core Content & Scout Sniper Series',
      seriesOrMonth: 'Core Content Month 3: Time & Price Theory / Power of 3',
      approximateDate: '2016',
      originalTerminology: 'Power of Three (PO3) / Open-High-Low-Close (OHLC) Anatomy',
      conceptStatus: 'Foundational',
      lectureReference: 'Core Content Month 3 - Video 1 & 2'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that every daily candle follows the Open, High, Low, Close (OHLC) algorithmic template. In a bullish day: Open near the low -> Manipulation drops below the Open -> Expansion drives up to the high -> Close near the high.',
      observableMarketBehavior: 'Opening range auction: Price consolidates at the open, fakes out retail breakout traders by stabbing through range support, absorbs sell stops, and then trends aggressively in the true intended direction.',
      derivedInterpretation: 'Auction Market Theory (AMT) value area testing: Price probes outside the initial balance to test for responsive activity before initiating one-sided trend expansion.'
    },
    explanationLadder: {
      level1Child: 'Imagine a soccer player who looks to the left, fakes a kick to the left to fool the goalie, and then kicks the ball hard into the right corner of the goal.',
      level2Beginner: 'A bullish day starts flat, dips downward to trick people into selling, and then shoots up all day long to finish at the very top.',
      level3Trader: 'Buy BELOW the opening price (in Discount manipulation) on bullish days. Sell ABOVE the opening price (in Premium manipulation) on bearish days.',
      level4Advanced: 'Asian Session = Accumulation. London Session Open = Manipulation (Judas Swing). New York Session = Distribution (Main trend).',
      level5ICTFramework: 'PO3 is the core DNA of IPDA. Understanding PO3 prevents buying at the top of the manipulation phase.',
      whenItMatters: 'Every single trading day at London Open (02:00 NY) and NY Open (08:30 NY).',
      whenToIgnore: 'On consolidation days preceding massive central bank rate announcements.'
    },
    whyItExists: 'Smart money cannot accumulate a large position at the open without running stops below the open to create the required counterparty liquidity.',
    problemItSolves: 'Stops traders from buying the fake breakout and gives them the confidence to buy when the chart looks temporarily bearish.',
    howItForms: 'Phase 1: Accumulation (Asian Range). Phase 2: Manipulation / Judas Swing (London pushes below Asian low). Phase 3: Distribution (Price reverses and rallies all day into NY session).',
    chartAnatomy: 'Annotated with Midnight Open line (00:00 NY) or 08:30 Open line, with shaded boxes for Accumulation, Manipulation wick below open, and Distribution body.',
    identificationRules: [
      'Mark the 00:00 NY (Midnight Open) and 08:30 NY Open prices.',
      'If Daily Bias is Bullish: Look for manipulation BELOW the Midnight Open.',
      'If Daily Bias is Bearish: Look for manipulation ABOVE the Midnight Open.',
      'Enter during the manipulation phase when price sweeps session liquidity.'
    ],
    validCharacteristics: [
      'Manipulation phase creates a swift liquidity sweep.',
      'Distribution phase shows steady, strong displacement candles.',
      'Close occurs near the extreme high (bullish) or low (bearish).'
    ],
    invalidCharacteristics: [
      'Sideways chop that never expands out of the opening range.',
      'Price continues in the direction of the manipulation without reversing (true trend day, not manipulation).'
    ],
    howICTUsesIt: 'The foundational architectural concept for daily candle forecasting and intraday directional bias.',
    commonMistakes: [
      'Buying above the Midnight Open on a bullish day (buying in Premium).',
      'Selling the Judas Swing breakdown at the very bottom.'
    ],
    advancedNuances: 'If the manipulation phase extends beyond 04:00 AM NY time in London without reversing, London is establishing a true trend day rather than a Judas Swing.',
    prerequisites: ['Candlestick OHLC Anatomy', 'Sessions & Killzones', 'Liquidity Pools'],
    relatedConcepts: ['Sessions & Killzones', 'Judas Swing', '2022 Model', 'Silver Bullet'],
    bullishScenario: 'Midnight Open is 1.0850. Asian session ranges between 1.0840 and 1.0860. London opens, plunges price to 1.0820 (sweeping Asian Low below Open). Price prints bullish MSS and rallies to 1.0920 at NY close.',
    bearishScenario: 'Midnight Open is 15,400. London rallies to 15,460 (above Open), taps 4H Bearish FVG, and dumps to 15,200 by NY PM session.',
    counterexample: 'Price opens, moves straight up without any downward manipulation below open, and never retraces—this is a runaway expansion day.',
    counterexamples: [
      {
        title: 'The "Buying Above the Open" Trap',
        trapDescription: 'Entering long on a bullish day when price is already trading 50 pips above the Midnight Open.',
        whyItFails: 'You are buying in deep Premium during the late distribution phase, making you vulnerable to pullbacks.',
        ruleOfThumb: 'Only enter longs BELOW the Midnight Open during the manipulation phase.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'sessions_killzones_timing',
        targetLabel: 'Sessions & Killzones Timing',
        whyThisFollows: 'PO3 phases map directly onto the three major trading sessions (Asia = Accumulation, London = Manipulation, NY = Distribution).',
        institutionalMechanic: 'Interbank clearing houses operate on strict international timezone schedules.',
        riskOfSkipping: 'Trading PO3 without session context leads to misidentifying manipulation timing.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Weekly candle PO3: Monday/Tuesday creates the low of the week; Wednesday/Thursday expands; Friday distributes.',
      ltfApplication: 'Daily candle PO3: London creates the low of the day; NY distributes to the high of the day.',
      sessionAndTiming: 'London Judas Swing occurs between 02:00 and 04:00 AM NY; NY Judas occurs between 08:30 and 09:30 AM NY.'
    },
    tradeRules: {
      entryModels: ['Buy in the manipulation dip below the Midnight Open after an SSL sweep + MSS'],
      targetingLogic: ['External BSL above the Asian High or Previous Day High'],
      invalidationCriteria: 'Price accepting below the daily manipulation low with continued bearish orderflow.'
    },
    invalidationCriteria: 'Price failing to reverse after the manipulation and continuing to break through HTF invalidation levels.',
    diagramType: 'po3_amd',
    simplifiedExplanation: 'AMD is a 3-act magic trick: Act 1 (Accumulation): Show the empty hat. Act 2 (Manipulation): Distract the audience with your left hand. Act 3 (Distribution): Pull the rabbit out with your right hand.'
  },
  {
    id: 'sessions_killzones_timing',
    name: 'Sessions & Killzones Timing',
    category: 'time_sessions',
    shortDefinition: 'The algorithmic time windows where institutional interbank liquidity injection peaks: Asian Session (19:00 - 00:00), London Killzone (02:00 - 05:00), New York AM Killzone (08:30 - 11:00), and London Close (10:00 - 12:00 NY).',
    source: {
      mentorship: '2016-2017 Core Content & Scout Sniper Series',
      seriesOrMonth: 'Core Content Month 3: Time & Price Theory',
      approximateDate: '2016',
      originalTerminology: 'The ICT Killzones & Central Bank Dealer Range (CBDR)',
      conceptStatus: 'Active Core',
      lectureReference: 'Core Content Month 3 - Killzone Mechanics'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that time is more important than price. The algorithm operates on specific clock-based macros. A setup that appears outside a Killzone is low probability and should be completely ignored.',
      observableMarketBehavior: 'Global banking settlement and market open schedules: London and New York banking desks process the overwhelming majority of global foreign exchange and futures volume, causing predictable volatility spikes.',
      derivedInterpretation: 'Time-of-day liquidity filtering: Systematic trading models filter out 80% of false signals simply by restricting trade execution to high-volume market open windows.'
    },
    explanationLadder: {
      level1Child: 'You wouldn\'t go to a supermarket at 3:00 AM when the lights are off and the doors are locked. You go when the store is open, the shelves are stocked, and everyone is shopping.',
      level2Beginner: 'Only trade during the major financial center opens: London (02:00 - 05:00 AM NY) and New York (08:30 - 11:00 AM NY). Stay away during the quiet lunch hours.',
      level3Trader: 'Mark the high and low of the Asian session. Watch for London to sweep one side of the Asian range to form the high or low of the day.',
      level4Advanced: 'Understand the New York Open (09:30 equities open) and 10:00 AM macro liquidity injection. London Close (10:30-11:30 NY) often causes intraday retracements.',
      level5ICTFramework: 'IPDA releases programmatic liquidity runs during Killzone macros to engineer the daily high or low.',
      whenItMatters: 'Every day during 02:00-05:00 AM NY and 08:30-11:00 AM NY.',
      whenToIgnore: 'During Asian consolidation (unless trading AUD/NZD/JPY pairs) and NY Lunch (12:00-13:00 NY).'
    },
    whyItExists: 'Financial institutions only execute heavy order flow during their official operating desk hours.',
    problemItSolves: 'Prevents traders from getting chopped to pieces during low-liquidity drift periods.',
    howItForms: 'Synchronized with the opening of London and New York financial exchanges and economic data releases (08:30 AM / 10:00 AM NY).',
    chartAnatomy: 'Vertical shaded bands highlighting Asian (19:00-00:00), London (02:00-05:00), and NY AM (08:30-11:00) with key highs/lows marked.',
    identificationRules: [
      'Convert all charts strictly to UTC-5 (New York / Eastern Time).',
      'Asian Session: 19:00 - 00:00 NY (sets the initial benchmark range).',
      'London Killzone: 02:00 - 05:00 AM NY (frequently forms Low/High of the day).',
      'New York AM Killzone: 08:30 - 11:00 AM NY (highest volume and index volatility).',
      'London Close: 10:00 AM - 12:00 PM NY (profit taking & reversals).'
    ],
    validCharacteristics: [
      'Execution occurs strictly inside the Killzone window.',
      'Economic news releases (08:30 / 10:00 AM) act as catalysts for displacement.',
      'Clear session liquidity sweep precedes the trade.'
    ],
    invalidCharacteristics: [
      'Entering setups at 12:30 PM (lunch dead zone) or 16:30 PM (after-market close).'
    ],
    howICTUsesIt: 'The absolute temporal filter for all trade ideas: "Time first, then Price."',
    commonMistakes: [
      'Trading on local computer time instead of synchronizing to New York time.',
      'Holding intraday scalp trades through the 12:00 PM NY lunch transition.'
    ],
    advancedNuances: 'If London expands in one direction without retracing, New York will often provide a continuation setup at 09:30-10:00 AM after a brief pullback into a 15M FVG.',
    prerequisites: ['Market Mechanics', 'Candlestick Anatomy'],
    relatedConcepts: ['Power of Three', 'Silver Bullet Model', '2022 Model', 'Judas Swing'],
    bullishScenario: 'Asian Session creates a 20-pip range. London opens at 02:30 AM, dives 15 pips below Asian Low, sweeps SSL, creates 5M MSS, and rallies 60 pips.',
    bearishScenario: 'NY AM opens at 08:30, rallies above London High at 09:30, traps breakout buyers, sweeps BSL, and dumps 100 handles into the 11:00 AM London Close.',
    counterexample: 'A trader sees a beautiful 1M FVG at 12:45 PM NY time, enters, and gets chopped out in a 4-point range for 2 hours.',
    counterexamples: [
      {
        title: 'The "NY Lunch Chop" Trap',
        trapDescription: 'Entering setups between 12:00 PM and 01:00 PM Eastern Time when algorithms reduce quote frequency.',
        whyItFails: 'Desk traders are at lunch, volume dries up, and price oscillates in random noise.',
        ruleOfThumb: 'Never enter new positions between 12:00 and 01:00 PM NY.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'ict_2022_model',
        targetLabel: 'ICT 2022 Mentorship Model',
        whyThisFollows: 'The 2022 model is designed to be executed specifically within the London and New York AM Killzones.',
        institutionalMechanic: 'Aligning model rules with peak interbank orderflow maximizes follow-through velocity.',
        riskOfSkipping: 'Executing the model during off-hours leads to frustrating false breakouts and slow stop-outs.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily high/low is formed during London (70% probability) or New York (30% probability).',
      ltfApplication: '1M-5M execution timing is aligned with session macro windows (e.g. 09:50-10:10 AM macro).',
      sessionAndTiming: 'All timing must strictly use New York Eastern Time (UTC-5 / UTC-4 DST).'
    },
    tradeRules: {
      entryModels: ['Limit orders placed only when time is within active Killzone boundaries'],
      targetingLogic: ['Opposing session high/low (e.g., Target Asian Low during London)'],
      invalidationCriteria: 'If trade has not delivered by the end of the Killzone, close or move to breakeven.'
    },
    invalidationCriteria: 'Session window expiring without price reaching the target.',
    diagramType: 'session_timeline',
    simplifiedExplanation: 'Killzones are like the rush hour on a subway. If you want a train every 2 minutes, you go during rush hour. If you go at midnight, you wait for an hour.'
  },
  {
    id: 'smt_divergence',
    name: 'SMT Divergence (Smart Money Technique)',
    category: 'models',
    shortDefinition: 'An intermarket divergence between closely correlated assets (e.g. ES vs NQ, EUR/USD vs GBP/USD, DXY vs Pairs) where one asset sweeps a key high/low while the other fails to do so, signaling institutional accumulation or distribution.',
    source: {
      mentorship: '2016-2017 Core Content & Scout Sniper Series',
      seriesOrMonth: 'Core Content Month 8: Intermarket Analysis & SMT Divergence',
      approximateDate: '2016',
      originalTerminology: 'Smart Money Technique (SMT) Divergence',
      conceptStatus: 'Advanced Execution',
      lectureReference: 'Core Content Month 8 - SMT Divergence Mechanics'
    },
    tripartiteView: {
      ictTeaching: 'Michael teaches that correlated assets must move in harmony. When one asset makes a higher high but a sister asset makes a lower high, it proves that smart money is actively distributing the weaker asset while spoofing the stronger one.',
      observableMarketBehavior: 'Relative strength divergence between correlated index futures or currency pairs due to asymmetrical institutional order flow distribution.',
      derivedInterpretation: 'Intermarket lead-lag relationship: When institutional capital unloads long positions, the asset with greater fundamental or liquidity weakness fails to make a new high, telegraphing a market-wide reversal.'
    },
    explanationLadder: {
      level1Child: 'Imagine twin brothers running a race. Usually they finish together. If Twin A crosses the finish line but Twin B trips and stops 10 feet early, you know Twin B is exhausted and both will stop running soon.',
      level2Beginner: 'Compare S&P 500 (ES) and Nasdaq (NQ). If NQ makes a new highest peak today, but ES fails to make a new peak (makes a lower peak), an SMT divergence has occurred. Expect a drop.',
      level3Trader: 'Always trade the asset that showed WEAKNESS if you want to go SHORT (it will fall faster). Trade the asset that showed STRENGTH if you want to go LONG (it will rally faster).',
      level4Advanced: 'Combine SMT with DXY (US Dollar Index). If DXY makes a lower low, but EUR/USD fails to make a higher high, EUR/USD is harboring hidden institutional selling.',
      level5ICTFramework: 'SMT Divergence is the ultimate institutional confirmation tool for IPDA manipulation phases.',
      whenItMatters: 'At major HTF turning points when price sweeps key BSL or SSL.',
      whenToIgnore: 'Inside choppy sideways ranges when neither asset is at a key liquidity level.'
    },
    whyItExists: 'Institutional market makers cannot hide their footprints across multiple correlated markets simultaneously; divergence reveals their true intent.',
    problemItSolves: 'Confirms whether a liquidity sweep is genuine or a trap with near-certainty.',
    howItForms: 'Occurs at swing points: In a bearish setup, Asset A makes a Higher High while Asset B makes a Lower High. In a bullish setup, Asset A makes a Lower Low while Asset B makes a Higher Low.',
    chartAnatomy: 'Two side-by-side or stacked charts with horizontal dotted lines showing the swing high on Asset A (breached) and Asset B (unbreached).',
    identificationRules: [
      'Compare correlated pairs: ES vs NQ, EUR/USD vs GBP/USD, or DXY vs EUR/USD.',
      'Bullish SMT: Asset A makes Lower Low (sweeps SSL), Asset B makes Higher Low (fails to sweep).',
      'Bearish SMT: Asset A makes Higher High (sweeps BSL), Asset B makes Lower High (fails to sweep).',
      'Must occur at a key HTF point of interest (PD Array) during a Killzone.'
    ],
    validCharacteristics: [
      'Clean divergence visible across identical timeframes.',
      'Occurs during London Open or NY Open Killzones.',
      'Immediate displacement follows on both assets.'
    ],
    invalidCharacteristics: [
      'Minor wick discrepancies on 5-second charts.',
      'Divergence between completely uncorrelated assets (e.g. Gold vs Crude Oil).'
    ],
    howICTUsesIt: 'The definitive confirmation filter to upgrade a standard setup into a Tier-1 high-probability trade.',
    commonMistakes: [
      'Shorting the strong asset that made the higher high instead of the weak asset that failed to make the high.',
      'Searching for SMT in the middle of a trend without any HTF liquidity context.'
    ],
    advancedNuances: 'Triple SMT: Comparing ES, NQ, and YM (Dow Jones) simultaneously. If two make higher highs and one fails, the failure points to an explosive institutional reversal.',
    prerequisites: ['Market Structure', 'Liquidity Pools', 'Intermarket Analysis'],
    relatedConcepts: ['2022 Model', 'Buy/Sell Side Liquidity', 'Sessions & Killzones'],
    bullishScenario: 'NQ sweeps the Asian Low and makes a new low of the day at 09:35 AM. At the exact same minute, ES refuses to break its Asian Low and forms a higher low. Both explode upward (+4R win).',
    bearishScenario: 'EUR/USD sweeps yesterday\'s high, but GBP/USD fails to reach yesterday\'s high. Both pairs print massive bearish displacement candles 5 minutes later.',
    counterexample: 'Both ES and NQ make clean higher highs together and continue expanding—this is correlated trend continuation, NOT SMT.',
    counterexamples: [
      {
        title: 'The "Uncorrelated Pair" SMT Trap',
        trapDescription: 'Looking for SMT divergence between assets that have low correlation coefficients (e.g. Bitcoin vs Natural Gas).',
        whyItFails: 'SMT relies on shared liquidity pools and interbank arbitrage algorithms between tightly correlated instruments.',
        ruleOfThumb: 'Only use ES/NQ/YM, EUR/GBP/DXY, or US10Y/US30Y.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'ict_2022_model',
        targetLabel: 'ICT 2022 Mentorship Model',
        whyThisFollows: 'Adding SMT divergence confirmation to Step 1 (Liquidity Sweep) elevates the 2022 model to maximum statistical probability.',
        institutionalMechanic: 'Intermarket divergence confirms genuine institutional sponsorship before entering.',
        riskOfSkipping: 'Trading sweeps without SMT risks entering into strong trend continuation breakouts.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily SMT Divergence flags macro market cycle tops and bottoms.',
      ltfApplication: '1M-5M SMT provides precision entry timing during the 09:30-10:00 AM NY open.',
      sessionAndTiming: 'Most potent between 03:00-04:00 AM NY (London) and 09:30-10:30 AM NY.'
    },
    tradeRules: {
      entryModels: ['Enter on the weaker asset for shorts or stronger asset for longs after MSS confirms.'],
      targetingLogic: ['Opposing liquidity pool on the target asset.'],
      invalidationCriteria: 'Price breaking through the divergence high/low with strong acceptance.'
    },
    invalidationCriteria: 'Price breaking and accepting beyond the divergence swing extreme.',
    diagramType: 'top_down_matrix',
    simplifiedExplanation: 'SMT is like a tandem bicycle. If one rider pedals forward while the other stops pedaling, the bicycle slows down and wobbles before stopping.'
  },
  {
    id: 'daily_bias_masood',
    name: '4-Pillar Daily Bias Engine (Abdullah Masood Model)',
    category: 'time_sessions',
    shortDefinition: 'A mechanical, high-probability daily bias determination model utilizing Previous Day High/Low, the 00:00 NY Midnight Open, and HTF Draw on Liquidity.',
    source: {
      mentorship: 'Trader Abdullah Masood Daily Bias Mentorship',
      seriesOrMonth: '2025/2026 ICT Daily Bias Mentorship Series',
      approximateDate: '2025 - 2026',
      originalTerminology: 'Mechanical Daily Bias & Directional Delivery Protocol',
      conceptStatus: 'Active Core',
      lectureReference: 'Daily Bias Mentorship & Live Analysis Masterclasses (@TraderAbdullahMasood)'
    },
    tripartiteView: {
      ictTeaching: 'Michael J. Huddleston teaches that every daily candle follows the Power of Three (PO3) sequence: Open, Manipulation (Low/High), Distribution (Expansion), and Close.',
      observableMarketBehavior: 'Central bank and institutional order flow benchmarks execute relative to the 00:00 NY Midnight Open. Aggressive liquidity sweeps occur at the Previous Day High/Low (PDH/PDL) before intraday expansion.',
      derivedInterpretation: 'Abdullah Masood\'s 4-Pillar framework synthesizes HTF Draw on Liquidity (DOL), PDH/PDL sweeps, the Midnight Open discount/premium boundary, and session Judas swings into an actionable pre-market protocol.'
    },
    explanationLadder: {
      level1Child: 'Imagine deciding if it will rain today before walking outside. You look at big weather clouds (daily direction), the morning temperature (midnight open), and check if the puddles dried up (swept lows).',
      level2Beginner: 'Never flip your directional bias on every 1-minute candle. If the Daily chart is heading toward a Weekly high, only look for buy setups when price dips below the Midnight Open.',
      level3Trader: 'Identify whether today is an Expansion Day (clean run to PDH/PDL) or a Consolidation/Retracement Day. Look for early session sweeps of PDL in London to trigger long entries toward PDH.',
      level4Advanced: 'Combine IPDA 20/40/60-day lookback data with the Previous Day range. If the previous day closed as a massive expansion candle, expect a smaller consolidation or retest of the daily FVG before continuation.',
      level5ICTFramework: 'Directional conviction is established when: (1) HTF DOL is unfilled, (2) Price trades below Midnight Open on a bullish day, (3) London sweeps the Asian Low/PDL, and (4) Lower timeframe MSS forms with displacement.',
      whenItMatters: 'Mandatory pre-market analysis before taking any intraday trades in London or New York Killzones.',
      whenToIgnore: 'Ignore low-timeframe structure shifts that occur in the opposite direction of the established 4-Pillar Daily Bias.'
    },
    whyItExists: 'Retail traders lose money by changing bias continuously. Establishing a mechanical daily bias aligns intraday execution with macro institutional capital flow.',
    problemItSolves: 'Eliminates directional confusion, revenge trading, and buying at the top of daily expansion moves.',
    howItForms: 'Formed through the sequential interaction of: HTF Draw on Liquidity -> Previous Day High/Low boundaries -> 00:00 NY Midnight Open -> Asian Session Range -> London Judas Swing.',
    chartAnatomy: 'Mark PDH and PDL as horizontal ray lines. Draw a horizontal line at 00:00 NY Open. Mark Asian session high and low. Observe how London probes below 00:00 Open into PDL before exploding upward.',
    identificationRules: [
      '1. Identify the Weekly / Daily Draw on Liquidity (DOL).',
      '2. Mark Previous Day High (PDH) and Previous Day Low (PDL).',
      '3. Anchor the 00:00 NY Midnight Open price level.',
      '4. Bullish Day Rule: Buy entries MUST occur BELOW Midnight Open (Discount).',
      '5. Bearish Day Rule: Sell entries MUST occur ABOVE Midnight Open (Premium).'
    ],
    validCharacteristics: [
      'Clean sweep of PDL/PDH followed by immediate aggressive displacement.',
      'Price respecting the 00:00 NY Open as dynamic support/resistance after the Judas swing.',
      'Clear unmitigated target (Draw on Liquidity) with ample room to run (minimum 2R-3R).'
    ],
    invalidCharacteristics: [
      'Trading when price is trapped in the middle of a multi-day HTF consolidation without clear DOL.',
      'Buying above the Midnight Open on a bullish day (chasing expensive prices).'
    ],
    howICTUsesIt: 'Used to filter out 90% of lower-timeframe counter-trend noise and focus execution strictly on high-probability expansion days.',
    commonMistakes: [
      'Changing daily bias because a 1-minute candle dumped for 5 minutes.',
      'Ignoring high-impact economic news releases (CPI, NFP, FOMC) that override normal session timing.'
    ],
    advancedNuances: 'When yesterday\'s candle is an inside bar or doji, the probability of an explosive expansion day sweeping BOTH PDH and PDL increases exponentially.',
    prerequisites: ['Power of Three (PO3)', 'Draw on Liquidity', 'Sessions & Killzones'],
    relatedConcepts: ['Gold Legacy SMC', 'Inducement vs Liquidity', '2022 Mentorship Model'],
    bullishScenario: 'Daily DOL is a Weekly Buy-Side Liquidity pool at 1.1050. Price opens at 00:00 NY at 1.0950. London sweeps PDL down to 1.0920 (Discount below Midnight Open), prints a 5M MSS with displacement, and mitigates a 5M FVG at 1.0935. Price rallies straight to PDH at 1.1000 (+4.5R).',
    bearishScenario: 'Daily DOL is a Daily FVG low at 2,380. Price trades above 00:00 NY Open in London to sweep PDH at 2,415, forms a bearish breaker block, and dumps to PDL at 2,385 (+3R).',
    counterexample: 'Price opens, immediately chops sideways around the Midnight Open with no displacement and no sweep of Asian extremes—a low-probability consolidation day.',
    counterexamples: [
      {
        title: 'The "Mid-Range Chop" Bias Trap',
        trapDescription: 'Forcing a daily bias when price is trading dead in the center of a 5-day range without reaching any HTF POI or sweeping PDH/PDL.',
        whyItFails: 'Institutions are building liquidity, not expanding.',
        ruleOfThumb: 'If price has not swept PDH/PDL or reached an HTF FVG, stand aside.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'gold_legacy_smc',
        targetLabel: 'The Gold Legacy SMC Playbook',
        whyThisFollows: 'Applying the 4-Pillar Daily Bias to Gold unlocks the highest win-rate execution setups in XAUUSD.',
        institutionalMechanic: 'Gold algorithms strictly adhere to Midnight Open discount/premium boundaries.',
        riskOfSkipping: 'Trading Gold without daily bias results in severe whipsaws and stopouts.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily and Weekly charts establish the directional target (DOL).',
      ltfApplication: '15M and 5M charts provide the Judas swing sweep and FVG entry.',
      sessionAndTiming: '00:00 NY Midnight Open benchmark, London Killzone (02:00-05:00 NY), and NY AM (07:00-10:00 NY).'
    },
    tradeRules: {
      entryModels: ['Enter on 5M FVG mitigation following a Judas sweep of PDL/PDH below/above Midnight Open.'],
      targetingLogic: ['Opposing Previous Day High (PDH) or Next HTF Draw on Liquidity.'],
      invalidationCriteria: 'Loss of the displacement swing low/high formed during the London/NY Judas sweep.'
    },
    invalidationCriteria: 'Price trading back below the Judas swing origin or violating the HTF dealing range low.',
    diagramType: 'session_timeline',
    simplifiedExplanation: 'Think of Daily Bias like catching a train. The Daily chart tells you which city the train is heading to. The Midnight Open tells you whether tickets are on discount. The London session is the boarding call.'
  },
  {
    id: 'gold_legacy_smc',
    name: 'The Gold Legacy (XAUUSD Precision SMC Execution)',
    category: 'models',
    shortDefinition: 'Specialized institutional Smart Money Concepts model tailored for the extreme volatility, Asian range sweeps, and precision 50% FVG mitigations of Gold (XAUUSD).',
    source: {
      mentorship: 'Trader Abdullah Masood Gold Legacy Mentorship',
      seriesOrMonth: 'The Gold Legacy - SMC Mentorship Playlist',
      approximateDate: '2024 - 2026',
      originalTerminology: 'XAUUSD Institutional Delivery & Session Sweep Model',
      conceptStatus: 'Active Core',
      lectureReference: 'The Gold Legacy Series (@TraderAbdullahMasood)'
    },
    tripartiteView: {
      ictTeaching: 'Michael J. Huddleston teaches that precious metals are delivered by the same central bank algorithms as currencies, but exhibit heightened sensitivity to geopolitical liquidity and USD flows.',
      observableMarketBehavior: 'Gold (XAUUSD) possesses massive intraday volatility and deep liquidity pools. Market makers frequently overshoot Asian session extremes by 15-30 pips to trap breakout traders before reversing.',
      derivedInterpretation: 'Abdullah Masood\'s Gold Legacy methodology establishes that Gold requires wider tolerance for initial session sweeps, mandatory alignment with DXY inverse strength, and strict limit orders at 50% Consequent Encroachment of 5M/15M FVGs.'
    },
    explanationLadder: {
      level1Child: 'Gold is like a spirited horse: if you try to jump on while it is bucking wild in the morning (Asian session), you get thrown off. You wait until it calms down and faces the right direction (London open) before riding.',
      level2Beginner: 'Never place market buy orders on Gold just because it breaks an Asian high. Gold almost always fakes out first (Judas Swing) before making the real move.',
      level3Trader: 'Mark the Asian High and Low (20:00 - 00:00 NY). In London (02:00 - 05:00 NY), wait for a deep sweep of one side. Once a 5M Market Structure Shift with displacement forms, place a limit order at the 50% FVG level.',
      level4Advanced: 'Monitor the US Dollar Index (DXY). If DXY sweeps Buy-Side Liquidity and rejects at 08:30 AM NY, Gold will produce an explosive upward expansion. Execute with a stop loss resting just beyond the sweep wick.',
      level5ICTFramework: 'XAUUSD institutional delivery requires: (1) Daily Bias alignment, (2) Asian liquidity sweep, (3) London or NY Judas reversal, (4) 15M/5M SIBI/BISI mitigation, and (5) Targeting previous session liquidity or HTF equal highs.',
      whenItMatters: 'Essential for day trading or scalping Gold (XAUUSD) during London and New York Killzones.',
      whenToIgnore: 'Avoid holding tight-stop intraday positions during high-impact news releases (CPI, Non-Farm Payrolls, FOMC interest rate announcements).'
    },
    whyItExists: 'Gold has high retail participation, making it a prime playground for institutional stop runs and aggressive liquidity purges.',
    problemItSolves: 'Prevents getting stopped out on Gold\'s notorious "wicks" and allows traders to enter with tight, defined risk (10-20 pips) for 50-100+ pip targets.',
    howItForms: 'Formed when Asian session builds double highs/lows -> London session violently sweeps the extreme into an unmitigated 4H/Daily POI -> Explosive displacement forms leaving a pristine 5M FVG -> Price retraces to 50% CE and expands.',
    chartAnatomy: 'Asian Range marked in purple box (20:00-00:00 NY). A sharp 20-pip wick pierces the Asian Low at 03:15 NY. Three consecutive bullish 5M candles break the swing high. A clean cyan FVG box appears. Price wicks into the midpoint and launches 80 pips higher.',
    identificationRules: [
      '1. Define the Asian Range High and Low (20:00 - 00:00 NY).',
      '2. Wait for London (02:00-05:00 NY) or NY Open (07:00-09:30 NY) to sweep one side.',
      '3. Confirm a clear Market Structure Shift with displacement (tall candle body, not just a wick).',
      '4. Identify the Fair Value Gap (FVG) and calculate its 50% Consequent Encroachment.',
      '5. Place a limit entry at 50% CE with stop loss 2 pips past the sweep low.'
    ],
    validCharacteristics: [
      'Deep sweep that immediately closes back inside the previous range (liquidity raid).',
      'Displacement candle with significant body size relative to average true range.',
      'Clean unmitigated FVG created on the 5-minute or 15-minute chart.'
    ],
    invalidCharacteristics: [
      'Entering before the Asian range has been swept.',
      'Chasing price at the high of the displacement candle with a market order.'
    ],
    howICTUsesIt: 'Precision execution model for high-beta commodities, delivering asymmetric Reward-to-Risk ratios (1:3 to 1:6+).',
    commonMistakes: [
      'Overleveraging on Gold due to pip-value excitement.',
      'Failing to account for spread widening during market open or session rollovers.'
    ],
    advancedNuances: 'Gold often prints a secondary retest during the New York session (08:30 - 09:30 AM) that mitigates the original London breaker block before the final expansion.',
    prerequisites: ['Daily Bias', 'Fair Value Gaps', 'Sessions & Killzones'],
    relatedConcepts: ['Daily Bias Engine', 'Inducement vs Liquidity', 'Liquidity Sweeps'],
    bullishScenario: 'Gold sweeps Asian Low at $2,340 during London Open at 03:30 NY. Displaces violently to $2,352 breaking 15M swing high. 5M FVG forms between $2,344 and $2,348. Limit order placed at 50% CE ($2,346) with stop at $2,338. Price taps $2,346 and rallies straight to Asian High at $2,368 (+4.4R).',
    bearishScenario: 'Gold sweeps Asian High at $2,420 at NY Open 08:30, prints a massive bearish displacement candle to $2,408. 5M SIBI mitigated at $2,414, price collapses to $2,385 (+4.8R).',
    counterexample: 'Price breaks Asian High with 5 massive green daily candles without looking back due to an emergency geopolitical event—pure macro trending breakout, not a mean-reverting sweep.',
    counterexamples: [
      {
        title: 'The "Immediate Breakout Chase" on Gold',
        trapDescription: 'Buying Gold the second it crosses the Asian High with a market order.',
        whyItFails: 'Gold sweeps highs specifically to trigger retail buy-stops and provide liquidity for institutional short orders.',
        ruleOfThumb: 'Wait for the sweep and reversal MSS before ever considering a trade.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'inducement_vs_external_liquidity',
        targetLabel: 'Inducement (IDM) Mechanics',
        whyThisFollows: 'Gold frequently manufactures internal inducements after the initial sweep to shake out weak hands.',
        institutionalMechanic: 'Algorithms build minor internal swings to gather fuel for the real expansion move.',
        riskOfSkipping: 'Entering on minor internal pullbacks will get stopped out by the inducement purge.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily and 4H charts establish the major dealing range and overarching draw on liquidity.',
      ltfApplication: '15M identifies session structure; 5M and 1M provide precision entry and stop placement.',
      sessionAndTiming: 'London Killzone (02:00 - 05:00 NY) and New York AM (07:00 - 10:00 NY).'
    },
    tradeRules: {
      entryModels: ['Limit entry at 50% Consequent Encroachment of 5M FVG after an Asian/Session sweep.'],
      targetingLogic: ['Opposing session liquidity or HTF Equal Highs/Lows.'],
      invalidationCriteria: 'Candle body close beyond the sweep extreme low/high.'
    },
    invalidationCriteria: 'A full candle body close beyond the sweep swing low/high.',
    diagramType: 'liquidity_sweep',
    simplifiedExplanation: 'Gold is like a coiled spring. You wait for it to be pushed down past the Asian low, wait for the release (displacement), and step on the spring right at the 50% mark as it bounces upward.'
  },
  {
    id: 'inducement_vs_external_liquidity',
    name: 'Inducement (IDM) Mechanics vs External Liquidity',
    category: 'liquidity',
    shortDefinition: 'The algorithmic distinction between internal engineered pullbacks (Inducement) designed to trap retail SMC traders versus true external swing liquidity.',
    source: {
      mentorship: 'Trader Abdullah Masood SMC Clarification Series',
      seriesOrMonth: 'Advanced SMC Trading Guide & Mentorship',
      approximateDate: '2024 - 2026',
      originalTerminology: 'Inducement Liquidity (IDM) vs Extreme POI Selection',
      conceptStatus: 'Active Core',
      lectureReference: 'Why 90% of SMC Order Blocks Fail - Inducement Masterclass (@TraderAbdullahMasood)'
    },
    tripartiteView: {
      ictTeaching: 'Michael J. Huddleston teaches that algorithms engineer liquidity pools within dealing ranges to induce counterparties before reaching the true higher timeframe PD Array.',
      observableMarketBehavior: 'In electronic order books, market makers generate small counter-trend swings to entice early retail participation, creating localized stop clusters directly in front of the actual institutional order block.',
      derivedInterpretation: 'Abdullah Masood explains that the very first internal pullback after a structure shift is an Inducement (IDM), NOT a valid Order Block. Genuine institutional entries occur only AFTER the Inducement has been swept into an Extreme Order Block or Decisional FVG.'
    },
    explanationLadder: {
      level1Child: 'Imagine a fisherman tossing a small piece of bread near the surface (the trap). When all the little fish gather around the bread, he drops his big net and catches them all.',
      level2Beginner: 'When price makes a new high, do not buy the first little dip you see. That dip is bait (inducement). Wait for price to drop lower, take the bait, and hit the real foundation at the bottom.',
      level3Trader: 'Identify the recent swing high and low. The first internal swing low after a bullish break of structure is the Inducement (IDM). Mark it with a dashed line. Only look for buys BELOW the IDM in the Extreme Order Block or Decisional FVG.',
      level4Advanced: 'Once the IDM is swept by a wick or candle, the previous swing high is officially confirmed as a valid swing point. If IDM is not taken, any higher high is tentative and vulnerable to deep liquidation.',
      level5ICTFramework: 'Institutional order flow requires liquidity fuel. By engineering IDM, algorithms create buy/sell stop liquidity clusters that provide the exact volume needed to fill large positions at the true Discount/Premium POI.',
      whenItMatters: 'Every time you are looking to mark Order Blocks or Fair Value Gaps on 15M, 5M, or 1M charts.',
      whenToIgnore: 'During ultra-aggressive parabolic runaway trends where price does not pull back at all (Runaway FVGs).'
    },
    whyItExists: 'Institutional participants cannot fill hundreds of millions in orders without counterparties. Inducement engineers those counterparties directly in front of their entry zones.',
    problemItSolves: 'Explains why beginners experience "my order block got breached, stopped me out, and then immediately went in my direction!"',
    howItForms: 'Price breaks structure -> retraces slightly (creating IDM) -> pushes higher without momentum -> reverses down to sweep the IDM stops -> taps the Extreme Order Block -> explodes upward.',
    chartAnatomy: 'Mark the first minor swing low as "IDM (Inducement)". Mark the lowest down-candle before the original rally as "Extreme OB". Note how price cuts straight through the first fake OB, sweeps IDM, hits Extreme OB to the tick, and flies.',
    identificationRules: [
      '1. Identify a clean Break of Structure (BOS) or Market Structure Shift (MSS).',
      '2. Locate the first internal pullback after the structural break—this is the Inducement (IDM).',
      '3. NEVER place a limit order on the Order Block directly above the IDM (this is a Trap/Decisional Bait).',
      '4. Wait for price to sweep the IDM.',
      '5. Enter when price sweeps IDM into the Extreme Order Block or deep Discount FVG.'
    ],
    validCharacteristics: [
      'Clean sweep of the IDM low followed by immediate rejection wicks.',
      'Price tapping an Extreme POI that has unmitigated Fair Value Gap imbalance.',
      'Displacement confirming resumption of the macro trend.'
    ],
    invalidCharacteristics: [
      'Entering at the first internal mini-order block before IDM has been touched.',
      'Assuming every minor wick is an institutional order block.'
    ],
    howICTUsesIt: 'Filters out low-probability "retail SMC" setups and ensures entries are placed at institutional wholesale prices.',
    commonMistakes: [
      'Marking 10 different Order Blocks on a single chart and wondering why most get blown through.',
      'Confusing an Inducement sweep with a full trend reversal.'
    ],
    advancedNuances: 'If the Inducement is swept with a full candle body close on the 15M chart, price often targets the Extreme POI at the absolute origin of the swing.',
    prerequisites: ['Market Structure Shift (MSS)', 'Order Blocks', 'Liquidity Pools'],
    relatedConcepts: ['Daily Bias Engine', 'Gold Legacy SMC', 'Breaker Blocks'],
    bullishScenario: 'EUR/USD breaks 15M high at 1.0850. Creates a minor pullback at 1.0820 (IDM) and pushes to 1.0860. Price retraces, smashes through 1.0820 IDM to take retail stop losses, taps the Extreme OB at 1.0795, and launches straight to 1.0900 (+5R).',
    bearishScenario: 'NASDAQ sweeps 15M low, pushes up to 18,200 creating IDM high at 18,150. Price sweeps 18,150 IDM, tags Extreme Bearish OB at 18,180, and dumps 200 points.',
    counterexample: 'Price breaks structure and aggressively expands without creating any internal pullback—a runaway delivery where only IFVGs/FVGs are respected.',
    counterexamples: [
      {
        title: 'The "First OB After BOS" Retail Trap',
        trapDescription: 'Placing a buy limit on the very first 5M order block directly after a break of structure.',
        whyItFails: 'This first OB is the inducement itself; algorithms sweep it to fill true institutional orders at the extreme.',
        ruleOfThumb: 'Always ask: "Has the inducement low been swept yet?" If no, do not enter.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'nasdaq_session_open',
        targetLabel: 'NASDAQ 09:30 AM Open & SMT Delivery',
        whyThisFollows: 'Inducement sweeps at the 09:30 AM NY Open provide the cleanest index day trading entries.',
        institutionalMechanic: 'Equities open volatility clears morning inducements before directional expansion.',
        riskOfSkipping: 'Entering equities at 09:30 without waiting for IDM sweep leads to instant stopouts.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily/4H IDM sweeps trigger multi-day swing rallies.',
      ltfApplication: '15M and 5M IDM identification provides daily intraday setups.',
      sessionAndTiming: 'Most powerful when IDM is swept inside the London or NY Killzone window.'
    },
    tradeRules: {
      entryModels: ['Limit entry on Extreme OB / FVG after price has completely swept the IDM low/high.'],
      targetingLogic: ['The high/low that created the structural break.'],
      invalidationCriteria: 'Loss of the Extreme swing origin low/high.'
    },
    invalidationCriteria: 'Price closing with a strong body beyond the extreme swing low/high origin.',
    diagramType: 'nested_structure',
    simplifiedExplanation: 'Think of Inducement as a speed bump. The market bumps over the first little hill to shake out loose luggage (retail stops) before stepping on the accelerator on the real open highway.'
  },
  {
    id: 'nasdaq_session_open',
    name: 'NASDAQ (NQ) 09:30 AM Open & SMT Correlated Delivery',
    category: 'models',
    shortDefinition: 'Precision index trading model utilizing the 09:30 AM New York Equities Opening Bell, SMT divergence with ES/YM, and the 10:00 AM Silver Bullet window.',
    source: {
      mentorship: 'Trader Abdullah Masood Index Execution Mentorship',
      seriesOrMonth: 'ICT Gold & NASDAQ Precision Analysis',
      approximateDate: '2024 - 2026',
      originalTerminology: '09:30 AM Opening Bell Judas & Index SMT Divergence',
      conceptStatus: 'Active Core',
      lectureReference: 'NASDAQ Live Execution & SMT Mastery (@TraderAbdullahMasood)'
    },
    tripartiteView: {
      ictTeaching: 'Michael J. Huddleston teaches that index futures (NQ, ES, YM) algorithmically synchronize price delivery at the 09:30 AM New York cash open.',
      observableMarketBehavior: 'At 09:30 AM NY, institutional equity trading desks flood market orders into NYSE and NASDAQ member stocks. Imbalances across correlated index futures create instant SMT divergence.',
      derivedInterpretation: 'Abdullah Masood teaches waiting through the initial 09:30 - 09:45 AM opening turbulence, identifying whether NQ or ES is leading the move, spotting the SMT crack, and executing on the first clean 5M/1M FVG during the 10:00 - 11:00 AM Silver Bullet window.'
    },
    explanationLadder: {
      level1Child: 'When the school bell rings at 09:30, all the kids rush out through the door at once. You don\'t stand in the doorway; you wait 15 minutes for the crowd to clear, see where the game is being played, and join in.',
      level2Beginner: 'Do not click buy or sell at 09:30:00. The opening 15 minutes are designed to sweep both sides of morning liquidity. Wait for 09:45 - 10:00 AM.',
      level3Trader: 'Open two charts side-by-side: NQ (NASDAQ) and ES (S&P 500). At 09:35 AM, if NQ makes a new low of the day but ES refuses to make a new low (forming a higher low), this is Bullish SMT Divergence.',
      level4Advanced: 'Once Bullish SMT is confirmed, look for NQ to print a strong 5-minute Market Structure Shift with an energetic Fair Value Gap. Enter at the FVG with stop below the divergence low.',
      level5ICTFramework: 'Index execution combines: (1) Daily Bias & Pre-Market High/Low (08:30 - 09:30), (2) 09:30 Opening Judas Sweep, (3) Cross-index SMT divergence, (4) 10:00 AM Silver Bullet macro injection, (5) Targeting overnight liquidity.',
      whenItMatters: 'Every trading day between 09:30 AM and 11:00 AM New York time.',
      whenToIgnore: 'Do not trade 5 minutes before or after major Federal Reserve FOMC rate announcements or Chair press conferences.'
    },
    whyItExists: 'Index futures represent weighted baskets of corporate equities. When big funds rebalance at the open, algorithmic pricing discrepancies between NQ and ES create highly reliable setups.',
    problemItSolves: 'Prevents getting whipsawed during the opening 15-minute chaos and gives traders a clear, systematic ruleset for trading US indices.',
    howItForms: 'Formed at 09:30 AM NY when cash market opens -> Judas swing sweeps Pre-Market High/Low -> SMT divergence appears between NQ and ES -> 5M MSS triggers -> 10:00 AM macro algorithm delivers price to the session target.',
    chartAnatomy: 'Side-by-side chart: Left (NQ 1M), Right (ES 1M). NQ sweeps 08:30 low at 09:38 AM. ES holds 20 points above its 08:30 low. NQ breaks 1M swing high at 09:42 leaving a 15-point FVG. Price taps FVG and expands 120 points higher.',
    identificationRules: [
      '1. Mark the Pre-Market High (PMH) and Pre-Market Low (PML) between 08:30 and 09:30 AM NY.',
      '2. Do NOT enter trades between 09:30:00 and 09:35:00 AM.',
      '3. Watch for a sweep of PMH or PML.',
      '4. Compare NQ vs ES for SMT Divergence (one sweeps while the other fails to sweep).',
      '5. Enter on the first clean 5M or 1M FVG after Market Structure Shift occurs.',
      '6. Target the opposing Pre-Market extreme or Previous Day High/Low.'
    ],
    validCharacteristics: [
      'Clear, undeniable SMT divergence across index futures at key session times.',
      'Energetic displacement candle leaving a 3-candle imbalance (FVG).',
      'Execution occurring between 09:45 AM and 10:45 AM NY.'
    ],
    invalidCharacteristics: [
      'Both NQ and ES breaking levels simultaneously without any divergence (take standard trend setup, not SMT).',
      'Trading after 11:30 AM NY during the midday lunch stagnation.'
    ],
    howICTUsesIt: 'The premier intraday setup for index futures traders seeking 20-50+ points on NQ with minimal drawdown.',
    commonMistakes: [
      'Gambling at 09:30:00 on the opening second.',
      'Trading NQ without looking at ES or DXY.'
    ],
    advancedNuances: 'If NQ is significantly stronger than ES and YM at the open, always take long setups on NQ (the leader) and avoid shorting until all three show SMT.',
    prerequisites: ['SMT Divergence', 'Sessions & Killzones', 'Fair Value Gaps'],
    relatedConcepts: ['Daily Bias Engine', 'Inducement vs Liquidity', '2022 Mentorship Model'],
    bullishScenario: 'NQ sweeps Pre-Market Low at 19,800 at 09:36 AM. ES holds well above its low. At 09:42 AM, NQ prints a 1M MSS breaking 19,830 with an FVG at 19,815. Limit buy filled at 19,815 with stop at 19,795. NQ rallies 140 points to Pre-Market High at 19,955 (+7R).',
    bearishScenario: 'NQ sweeps Pre-Market High at 20,100 at 09:33 AM. ES fails to make a higher high. NQ displaces downward breaking 20,060, retests 5M FVG at 20,080, and drops 180 points to PML (+6R).',
    counterexample: 'Market opens with no sweep, low volume chop inside a 15-point range ahead of a 2:00 PM FOMC meeting—stand aside until FOMC.',
    counterexamples: [
      {
        title: 'The "09:30:00 Market Order" Gamble',
        trapDescription: 'Entering at the exact second the bell rings based on a pre-market bias.',
        whyItFails: 'Opening algorithmic spreads widen and the initial 5 minutes are almost always a Judas fakeout.',
        ruleOfThumb: 'Let the opening 10-15 minutes paint the liquidity map before entering.'
      }
    ],
    causalConnections: [
      {
        targetConceptId: 'ict_2022_model',
        targetLabel: 'ICT 2022 Mentorship Model',
        whyThisFollows: 'Combining 09:30 SMT divergence with the 2022 model creates the highest statistical edge in index trading.',
        institutionalMechanic: 'Intermarket index arbitrage confirms institutional sponsorship.',
        riskOfSkipping: 'Trading without cross-asset alignment increases false breakout risk.'
      }
    ],
    timeframeMatrix: {
      htfApplication: 'Daily and 1H charts identify the macro draw on liquidity.',
      ltfApplication: '5M and 1M charts provide the SMT divergence confirmation and FVG entry.',
      sessionAndTiming: '09:30 AM to 11:00 AM NY Equities Open & Silver Bullet window.'
    },
    tradeRules: {
      entryModels: ['Limit entry at 5M/1M FVG following an 09:30 AM Judas sweep and SMT divergence.'],
      targetingLogic: ['Opposing Pre-Market High/Low or Previous Day High/Low.'],
      invalidationCriteria: 'Price accepting beyond the divergence swing low/high.'
    },
    invalidationCriteria: 'Loss and full candle body close beyond the divergence swing extreme.',
    diagramType: 'session_timeline',
    simplifiedExplanation: 'Trading NASDAQ at 09:30 is like surfing. You don\'t jump into the turbulent wave when it crashes; you wait for the wave to form cleanly at 09:45 and ride the smooth momentum into the shore.'
  }
];
