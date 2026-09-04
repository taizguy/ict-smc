import { MasoodPlaylist } from '../types';
import { masoodAdditionalPlaylists } from './masoodNewPlaylists';

const basePlaylists: MasoodPlaylist[] = [
  {
    id: 'beginners',
    title: "1) Beginner's Trading Guide (SMC-ICT)",
    subtitle: 'Foundations, Platform Setup, Candlestick Anatomy & Market Mechanics',
    badge: 'Beginner Foundations',
    description: 'The definitive zero-to-hero onboarding curriculum by Trader Abdullah Masood. Master TradingView, understand order execution (Market, Limit, Stop), decode candlestick bodies vs. wicks, navigate high-impact economic calendar events, align multi-timeframe fractality, master global trading sessions and ICT killzones, map mechanical swing highs/lows, and understand how pips and index handles work.',
    targetAudience: 'Aspiring traders starting from scratch or retail traders transitioning away from lagging indicators into pure price action and algorithmic market mechanics.',
    prerequisites: ['Basic computer literacy', 'A free TradingView account', 'Commitment to study without gambling'],
    lecturesCount: 8,
    lectures: [
      {
        id: 'masood-beg-1',
        lectureNumber: 1,
        title: 'LEC 1: What is TradingView? How to Use it for Free for SMC & ICT Trading',
        youtubeId: '2PLZIXZsl74',
        playlistType: 'beginners',
        shortSummary: 'Comprehensive tutorial on setting up TradingView for Smart Money Concepts and ICT analysis without needing expensive subscriptions.',
        keyTakeaways: [
          'TradingView is the global industry standard for charting, used by institutional and retail traders alike.',
          'Setting your chart timezone strictly to UTC-4 / UTC-5 (New York Local Time) is non-negotiable for algorithmic trading.',
          'Remove all lagging retail indicators (RSI, Stochastics, Bollinger Bands, Moving Average ribbons) to keep your canvas pristine.',
          'Configure essential drawing shortcuts: Fibonacci Retracement, Long/Short Position Tool, Rectangle (for FVGs/Order Blocks), and Horizontal Rays (for Liquidity Pools).'
        ],
        coreRules: [
          'Chart Background must be clean and distraction-free (neutral dark or warm off-white).',
          'Always set timezone to New York (EDT/EST) because institutional algorithms operate on New York exchange time.',
          'Save layout templates for Daily, 15-Minute, and 1-Minute charts.'
        ],
        tradingChecklist: [
          'TradingView timezone set to New York?',
          'Candlestick colors set to high contrast (e.g. green/red or black/white)?',
          'Watchlist organized with key assets: US100 (NQ), US500 (ES), US30, DXY, EURUSD?',
          'Favorite toolbar pinned with Fibonacci, Horizontal Ray, Rectangle, and Path tools?'
        ],
        commonMistakes: [
          'Using broker charts or MT4/MT5 default timezones that distort daily candle opens.',
          'Cluttering the chart with 10 different colorful indicators that provide conflicting signals.',
          'Paying for expensive premium indicators that merely repackage basic moving averages.'
        ],
        practicalExercise: 'Open TradingView, switch your time zone to New York, clear all indicators, add US100 (NQ1!) and EURUSD to your watchlist, and practice drawing 5 Fair Value Gaps using the rectangle tool.',
        bilingualNotes: 'TradingView setup bilkul free mein kaise karein aur indicators ke baghair pure chart analysis kaise seekhein.',
        animationType: 'timeframe_fractal'
      },
      {
        id: 'masood-beg-2',
        lectureNumber: 2,
        title: 'LEC 2: What is Buy/Long & Sell Short in Trading? Complete Order Execution Guide',
        youtubeId: 'rwDUBjXssBI',
        playlistType: 'beginners',
        shortSummary: 'Mastering the operational mechanics of going Long (buying low to sell high) vs. Short (selling high to buy low), and when to use Market vs. Limit vs. Stop orders.',
        keyTakeaways: [
          'Going Long (Buy) means you profit when the asset price increases.',
          'Going Short (Sell) means you borrow the asset at a high price, sell it to the market, and buy it back lower to pocket the difference.',
          'Smart Money trades almost exclusively using Limit Orders placed at institutional PD Arrays (FVGs, Order Blocks) to get optimal pricing.',
          'Retail traders fail because they use Market Orders during explosive green/red candles driven by FOMO, buying at the absolute top of expansions.'
        ],
        coreRules: [
          'Never use Market Orders to chase fast-moving green or red candles.',
          'Every single trade MUST have a predetermined Stop Loss placed before order execution.',
          'Stop Loss must be anchored to institutional market structure invalidation points, never to an arbitrary dollar amount.'
        ],
        tradingChecklist: [
          'Is the trade direction aligned with Higher Timeframe narrative?',
          'Is an entry Limit Order set at a valid discount or premium PD Array?',
          'Is the Stop Loss mathematically calculated to risk no more than 1% of total equity?',
          'Is the Take Profit set at an objective resting liquidity pool?'
        ],
        commonMistakes: [
          'Believing you can only make money when markets go up (ignoring the massive power of Short Selling).',
          'Market-buying at the apex of a green breakout candle just before smart money dumps the price.',
          'Moving your stop loss further away when a trade is going against you (hoping it turns around).'
        ],
        practicalExercise: 'Use TradingView Paper Trading to place 3 limit buy orders at discount Fair Value Gaps and 3 limit sell orders at premium Fair Value Gaps with exact 1:2 risk-to-reward ratios.',
        bilingualNotes: 'Buy/Long aur Sell/Short ka complete concept: Market mein girte hue price se profit kaise banate hain.',
        animationType: 'po3_expansion'
      },
      {
        id: 'masood-beg-3',
        lectureNumber: 3,
        title: 'LEC 3: What are Trading Candlesticks? Anatomy, OHLC & Buying/Selling Pressure',
        youtubeId: 'gMHkVmIIqM4',
        playlistType: 'beginners',
        shortSummary: 'Deconstructing the candlestick: Open, High, Low, Close (OHLC), the institutional truth behind candle bodies vs. wicks, and how to read displacement.',
        keyTakeaways: [
          'Every candlestick represents price action over a specific duration (1 minute, 15 minutes, 1 day).',
          'The 4 critical data points: Open (starting price), High (highest price reached), Low (lowest price reached), Close (final price).',
          'Abdullah Masood Core Axiom: "Candle bodies tell the true story of institutional volume; candle wicks do the damage by sweeping liquidity."',
          'A long wick indicates aggressive rejection and liquidity absorption; an energetic wide-spread body indicates institutional displacement.'
        ],
        coreRules: [
          'A Market Structure Shift (MSS) or Break of Structure (BOS) is ONLY confirmed if the candle BODY closes beyond the swing level—a wick is just a liquidity sweep.',
          'Observe where the candle body closes relative to its total range (top 20% = extreme bullishness; bottom 20% = extreme bearishness).',
          'Small, alternating red/green candles signal consolidation; long directional candle bodies signal algorithmic delivery.'
        ],
        tradingChecklist: [
          'Did the candle body close beyond the key level or only wick?',
          'Are consecutive candle bodies expanding in size (displacement) or shrinking (exhaustion)?',
          'Did the wick retest an unmitigated Fair Value Gap or Order Block?'
        ],
        commonMistakes: [
          'Assuming a wick breaking a high means the market is bullish (it is often a Judas swing stop hunt).',
          'Judging a candle before it has officially closed on your chart timeframe.',
          'Ignoring the opening price of the candle (especially Midnight and 08:30 NY opens).'
        ],
        practicalExercise: 'Inspect the last 10 daily candles on US100. Identify the Open, High, Low, and Close for each. Mark whether the candle opened near its low and expanded to close near its high (bullish PO3).'
      },
      {
        id: 'masood-beg-4',
        lectureNumber: 4,
        title: 'LEC 4: What is an Economic Calendar in Trading? Navigating Red Folders & High-Impact Events',
        youtubeId: 'omqxKZ3Pmc8',
        playlistType: 'beginners',
        shortSummary: 'Mastering the economic calendar (ForexFactory / Investing.com), decoding high-impact news releases, and protecting your capital from news volatility traps.',
        keyTakeaways: [
          'Algorithmic quotation does not move randomly; economic calendar events provide the fundamental injection for IPDA volatility runs.',
          'The 3 impact categories: Yellow (Low impact), Orange (Medium impact), Red (High impact / Market Shaker).',
          'The Big 3 Market Movers: CPI (Inflation), NFP (Non-Farm Payrolls - first Friday of month), and FOMC (Federal Reserve Interest Rate decisions).',
          'Never gamble on news numbers! Smart money does not guess numbers; they use the volatility to sweep pre-engineered liquidity pools.'
        ],
        coreRules: [
          'Check the economic calendar every single morning at 07:00 AM NY time before opening any charts.',
          'Abdullah Golden Rule: Never be in an active position 5 minutes before or 5 minutes after a Red Folder release.',
          'Let the news candle sweep liquidity, create displacement, leave a clean Fair Value Gap, and trade the subsequent retest.'
        ],
        tradingChecklist: [
          'ForexFactory checked for today’s economic releases?',
          'Are there Red Folders scheduled at 08:30 AM, 10:00 AM, or 14:00 PM EST?',
          'All open scalp positions closed 5 minutes prior to release?',
          'Ready to observe the liquidity sweep without emotional FOMO?'
        ],
        commonMistakes: [
          'Holding high-leverage trades into an 08:30 CPI release and getting slippage of 50+ points.',
          'Trying to trade both sides with pending straddle orders (algorithms sweep both sides in milliseconds).',
          'Assuming a "positive" economic number automatically means the asset will go up (ignoring technical liquidity draw).'
        ],
        practicalExercise: 'Visit ForexFactory.com. Filter for USD, EUR, and GBP high-impact events for the current week. Note down exact release times in New York EDT.',
        bilingualNotes: 'Economic Calendar aur Red Folders ko kaise check karein taake account blow hone se bacha sakein.'
      },
      {
        id: 'masood-beg-5',
        lectureNumber: 5,
        title: 'LEC 5: What is Trading Timeframe? Top-Down Multi-Timeframe Alignment & Fractality',
        youtubeId: 'ri9Wi9cebbQ',
        playlistType: 'beginners',
        shortSummary: 'Understanding the fractal nature of markets and building a systematic top-down routine from Monthly and Daily bias down to 5-minute and 1-minute entries.',
        keyTakeaways: [
          'Markets are fractal: algorithmic patterns on a 1-minute chart repeat the exact same mechanics found on Daily and Monthly charts.',
          'Higher timeframes dictate DIRECTION; lower timeframes dictate EXECUTION.',
          'The Top-Down Hierarchy: Monthly/Weekly (Macro Narrative) -> Daily (Session Bias & Draw on Liquidity) -> 4H/1H (Structural Framing & Key PD Arrays) -> 15M/5M (Setup Confirmation & MSS) -> 1M (Sniper Entry).',
          'Trading solely on the 1-minute or 5-minute chart without knowing the Daily Draw on Liquidity is the #1 reason beginner traders blow accounts.'
        ],
        coreRules: [
          'Always mark your key liquidity levels (Previous Day High/Low, Weekly High/Low) on the Daily chart before dropping to lower timeframes.',
          'Only take 1-minute or 5-minute buy setups when the higher timeframe is seeking Buy-Side Liquidity (and vice versa for sells).',
          'When higher timeframe and lower timeframe disagree, Higher Timeframe ALWAYS wins.'
        ],
        tradingChecklist: [
          'Daily chart inspected and Draw on Liquidity identified?',
          '4H and 1H market structure determined (Bullish / Bearish)?',
          '15M structural shift confirmed with displacement?',
          '1M or 5M entry triggered inside an unmitigated FVG aligned with the Daily trend?'
        ],
        commonMistakes: [
          'Zooming straight into the 1-minute chart at 09:30 AM without ever glancing at the Daily or 1H context.',
          'Shorting on a 1-minute breakdown when the market has just bounced off a Daily Bullish Order Block.',
          'Over-analyzing 10 different timeframes at once and suffering from analysis paralysis.'
        ],
        practicalExercise: 'Take a screenshot of the Daily chart of NQ. Identify the nearest unmitigated Daily FVG. Then switch to the 15M and 1M chart to see how price interacted with that level.',
        animationType: 'timeframe_fractal'
      },
      {
        id: 'masood-beg-6',
        lectureNumber: 6,
        title: 'LEC 6: Master Trading Sessions: Forex, Stock Market, Crypto & ICT Killzones',
        youtubeId: '1PEMKRqn1h8',
        playlistType: 'beginners',
        shortSummary: 'The 24-hour algorithmic cycle: Asian Accumulation, London Manipulation (Judas Swing), New York AM Trend Expansion, Midday Graveyard, and New York PM Run.',
        keyTakeaways: [
          'Market volatility is not continuous; it operates in precise chronological windows called Killzones.',
          'Asian Session (20:00 - 00:00 NY): Consolidation phase. Range is mapped to establish high and low boundaries for the day.',
          'London Killzone (02:00 - 05:00 NY): The classic Judas Swing sweeps the Asian high or low, creating the high/low of the London session.',
          'New York AM Killzone (08:00 - 11:30 NY): The highest volume session of the day. 08:30 economic releases, 09:30 equities cash open, and the 10:00 AM Silver Bullet window.',
          'Midday Lunch Graveyard (12:00 - 13:15 NY): Low volume, algorithm rebalancing; avoid taking new positions.',
          'New York PM Session (13:30 - 16:00 NY): Second wave of expansion or reversal into cash close.'
        ],
        coreRules: [
          'Trade only during established Killzone hours; shut down your terminal outside of institutional sessions.',
          'Mark the Asian High and Asian Low at 00:00 NY time every single trading day.',
          'In a bullish day, London or New York AM will sweep the Asian Low (Judas Swing) before launching the true expansion.'
        ],
        tradingChecklist: [
          'Current time matches an active Killzone (02:00-05:00 or 08:00-11:30 NY)?',
          'Asian High and Low clearly marked on chart?',
          'Has the Judas Swing already swept pre-market liquidity?',
          'Are we outside the 12:00 - 13:15 PM lunch hour dead zone?'
        ],
        commonMistakes: [
          'Trading during the late afternoon or early evening when spreads widen and algorithms are inactive.',
          'Getting caught in the 12:00 PM chop and giving back all morning profits.',
          'Ignoring the London session high/low when trading the New York AM open.'
        ],
        practicalExercise: 'Use a session indicator or vertical lines on TradingView to box out the Asian Range, London Killzone, and New York AM Killzone for the last 5 days. Note how often London or NY sweeps the Asian boundaries.',
        bilingualNotes: 'Forex aur Stock Market ke sessions aur ICT Killzones ka mukammal nizam (Urdu/Hindi).',
        animationType: 'session_clock'
      },
      {
        id: 'masood-beg-7',
        lectureNumber: 7,
        title: 'LEC 7: What is Swing High & Swing Low? Fractal Structure, BOS & Market Structure Shifts',
        youtubeId: 'dp8aVm82Dx4',
        playlistType: 'beginners',
        shortSummary: 'The exact mechanical definition of institutional swing highs and lows, identifying genuine structural breaks vs. liquidity sweeps, and avoiding fakeouts.',
        keyTakeaways: [
          'A valid Swing High is a 3-candle fractal: a central candle with a higher high, flanked by a candle with a lower high on the left and a lower high on the right.',
          'A valid Swing Low is a central candle with a lower low, flanked by a higher low on the left and a higher low on the right.',
          'Break of Structure (BOS): Price breaks a swing point in the direction of the existing trend, signaling continuation.',
          'Market Structure Shift (MSS): Price breaks a key swing point against the existing trend with energetic displacement, signaling a potential trend reversal.',
          'Retail support/resistance lines are simply clusters of resting stop losses resting above swing highs and below swing lows.'
        ],
        coreRules: [
          'Never eyeball random highs and lows; enforce the strict 3-candle rule.',
          'An MSS requires aggressive candle displacement with an associated Fair Value Gap.',
          'If price breaks a swing high with a wick only and instantly closes back below, it is a Liquidity Sweep, NOT a structure break!'
        ],
        tradingChecklist: [
          'Is the swing point formed by at least 3 distinct candles?',
          'Did the break occur with a clean, wide-range displacement candle body?',
          'Is there an unmitigated Fair Value Gap created during the break?'
        ],
        commonMistakes: [
          'Calling every minor 1-minute wiggle a swing high or swing low.',
          'Treating a wick through a swing high as a bullish breakout (getting caught in turtle soups).',
          'Failing to anchor swings to the higher timeframe structure.'
        ],
        practicalExercise: 'On a 15-minute chart of US100, label the last 5 Swing Highs and Swing Lows using the 3-candle rule. Mark which ones resulted in a true BOS and which ones were liquidity sweeps.'
      },
      {
        id: 'masood-beg-8',
        lectureNumber: 8,
        title: 'LEC 8: What are Pips in Forex vs. Handles/Points in the Stock Market? Quantifying Risk & Rewards',
        youtubeId: '-oymWWNbrQI',
        playlistType: 'beginners',
        shortSummary: 'Demystifying pip calculations in currency markets and point/handle measurements in index futures (US100 / NQ, US500 / ES, US30 / Dow).',
        keyTakeaways: [
          'PIP stands for "Percentage in Point" and represents the 4th decimal place (0.0001) in most Forex pairs (e.g. EURUSD moving from 1.0850 to 1.0860 = 10 pips).',
          'In US Stock Indices (US100/NQ, US500/ES), price is measured in POINTS or HANDLES, not pips.',
          '1 Point on NASDAQ (NQ) contains 4 Ticks (0.25 per tick). 1 Point move = $20 on a standard contract, or $2 on a Micro contract (MNQ).',
          'Why Abdullah Masood strongly favors US100 (NASDAQ): A typical daily move of 100 to 250 points on US100 provides immense, clean profit potential with minimal spread costs compared to Forex pairs.'
        ],
        coreRules: [
          'Always calculate your position size based on point distance to stop loss, not arbitrary contract counts.',
          'Risk strictly 0.5% to 1.0% of your account equity per trade.',
          'If your stop loss on NQ is 20 points, on 1 Micro contract (MNQ) your risk is exactly $40. Size your contracts accordingly.'
        ],
        tradingChecklist: [
          'Know whether your instrument measures in pips (Forex) or points/handles (Indices)?',
          'Point value and tick size verified before pressing buy or sell?',
          'Stop loss distance measured in points and position size adjusted to risk 1% max?'
        ],
        commonMistakes: [
          'Confusing Forex pip calculations with Stock Index handle calculations.',
          'Trading 1 full contract of NQ ($20/point) on a $2,000 account, risking 50% of the account on a normal 25-point retracement.',
          'Not utilizing Micro contracts (MNQ / MES) to scale risk safely during the learning phase.'
        ],
        practicalExercise: 'Calculate the dollar risk for a 30-point stop loss on US100 using: a) 1 Mini NQ contract, b) 1 Micro MNQ contract, c) 3 Micro MNQ contracts. Verify which fits a $5,000 account risking 1% ($50).'
      }
    ]
  },
  {
    id: 'advanced',
    title: "2) Advanced Trading Guide (SMC-ICT)",
    subtitle: 'Institutional Market Making, Volatility Cycles, Seek & Destroy & Algorithmic Execution',
    badge: 'Advanced SMC Protocol',
    description: 'The advanced master series by Trader Abdullah Masood. Discover why US Stock Indices outshine Forex and Crypto, how to predict daily candle OHLC with 100% mechanical accuracy, how to avoid consolidation traps after big moves, master Average Daily Range (ADR) and Inside Day profiling, understand why retail support/resistance and supply/demand fail, execute the 3-phase FOMC news strategy, read 1-minute algorithmic order flow, navigate Seek & Destroy chop profiles, distinguish High Resistance from Low Resistance Liquidity Runs, and trade the live P/D Array Matrix.',
    targetAudience: 'Intermediate and advanced traders who know the basics but struggle with consistency, over-trading in chop, getting whipsawed by news, or understanding why their order blocks fail.',
    prerequisites: ["Completion of Beginner's Trading Guide", 'Solid understanding of OHLC and Fair Value Gaps', 'Commitment to strict risk management'],
    lecturesCount: 23,
    lectures: [
      {
        id: 'masood-adv-1',
        lectureNumber: 1,
        title: 'LEC 1: Why I Trade US Stock Market (US100/NQ/ES) Instead of Forex or Crypto',
        youtubeId: 'D6NDUnQaCDg',
        playlistType: 'advanced',
        shortSummary: 'The institutional reasons why US Stock Indices offer cleaner algorithmic quotation, regulated exchange transparency (CME), and superior technical respect compared to decentralized Forex and unregulated Crypto.',
        keyTakeaways: [
          'US Stock Indices (US100/NQ, US500/ES) trade on regulated centralized exchanges (Chicago Mercantile Exchange - CME).',
          'Unlike offshore Forex bucket-shop brokers who manipulate spreads and hunt stops during news, futures price feeds are uniform worldwide.',
          'Tech dominance: NASDAQ reflects the earnings, cash flow, and institutional order flow of the world’s top technology titans (Apple, Microsoft, Nvidia, Amazon).',
          'Predictable session rhythm: The 09:30 AM New York cash open provides reliable daily volatility and clean directional runs.'
        ],
        coreRules: [
          'Focus your study on 1 or 2 key index assets (e.g. US100 and US500) rather than scanning 30 random forex pairs.',
          'Use official futures data feeds (NQ1! or ES1!) on TradingView for accurate volume and gap analysis.',
          'Respect the opening cash bell at 09:30 AM EST as the start of genuine institutional quotation.'
        ],
        tradingChecklist: [
          'Charting official CME futures contract (NQ1! or ES1!)?',
          'Trading during high-liquidity New York cash session (09:30 - 11:30 AM)?',
          'Eliminated low-volume altcoin and exotic forex distractions?'
        ],
        commonMistakes: [
          'Strategy hopping across 25 different forex currency pairs simultaneously.',
          'Trading unregulated crypto exchanges with hidden funding fees and predatory liquidation wicks.',
          'Believing that forex news spreads are identical to regulated index futures execution.'
        ],
        practicalExercise: 'Compare a 15-minute chart of US100 with a 15-minute chart of a minor Forex cross (e.g. EUR/NZD). Observe the clean displacement and precision of Fair Value Gaps on US100 compared to choppy forex wicks.'
      },
      {
        id: 'masood-adv-2',
        lectureNumber: 2,
        title: 'LEC 2: How I Predicted the Daily Candle with 100% Accuracy: The 4 Daily Phases',
        youtubeId: 'Bh7PoCpFuVg',
        playlistType: 'advanced',
        shortSummary: 'Decoding the institutional Daily Candle profile: Open, Judas Swing Low/High, Expansion Run, and Cash Close using the ICT Power of 3 (PO3) algorithm.',
        keyTakeaways: [
          'Every daily candle goes through 4 distinct chronological phases: 1) Open, 2) Manipulation (Judas Swing), 3) Distribution (Expansion), 4) Rebalancing/Close.',
          'In a Bullish Daily Bias, price opens near Midnight NY, dips down below the open between 02:00 and 09:30 AM to engineer the Low of the Day (Judas Swing), then launches into a multi-hour expansion, closing near the High of the Day.',
          'In a Bearish Daily Bias, price opens, pumps up above the open to trap breakout buyers and establish the High of the Day, then dumps to close near the Low.',
          'The Midnight New York (00:00 EST) Open and 08:30 AM Open act as institutional dividing lines: in a bullish day, only look to buy BELOW the open.'
        ],
        coreRules: [
          'If your daily bias is Bullish, NEVER buy above the Midnight or 08:30 open—wait for the Judas swing dip into Discount.',
          'If your daily bias is Bearish, NEVER sell below the open—wait for the Judas swing rally into Premium.',
          'Look for the Low of the Day to form between 02:00 AM (London) and 09:45 AM (New York Cash Open).'
        ],
        tradingChecklist: [
          'Is current price trading at a Discount relative to the 00:00 Midnight Open for a long setup?',
          'Has the Judas Swing already swept the Asian Low or Pre-market Low?',
          'Did a lower timeframe displacement candle confirm rejection of the low?'
        ],
        commonMistakes: [
          'Buying at the very top of the daily expansion when price is already 80 points above the Midnight open.',
          'Panicking during the morning Judas dump and selling right at the Low of the Day.',
          'Ignoring the daily candle bias and taking random scalp trades in both directions.'
        ],
        practicalExercise: 'Pull up the last 5 Daily candles on US100. Drop to the 15-minute chart and identify the exact time of day when the High and Low of each day formed. Note how often it happened between 08:30 and 10:30 AM NY time.',
        animationType: 'po3_expansion'
      },
      {
        id: 'masood-adv-3',
        lectureNumber: 3,
        title: 'LEC 3: Full Trading Roadmap: Moving from Confused Beginner to Consistent Trader',
        youtubeId: 'FbtJEnOsKxo',
        playlistType: 'advanced',
        shortSummary: 'The three progressive pillars of trader mastery: Technical Literacy -> Risk Capital Preservation -> Psychological Detachment & Mechanical Execution.',
        keyTakeaways: [
          'Trading profitability is not about knowing 100 indicators; it is about mastering ONE mechanical model and executing it with military discipline.',
          'The 95% retail failure rate is caused by 3 fatal sins: Over-leveraging, Strategy Hopping after 2 losses, and Revenge Trading.',
          'Treat trading as a business: maintain a daily journal, track win-rate, average risk-to-reward, and adhere to a strict daily loss cap (e.g. maximum 2 losses per day, then walk away).'
        ],
        coreRules: [
          'Max 2 losses per day: if you lose 2 trades, shut down your platform until tomorrow.',
          'Risk strictly 1% per setup; never increase position size after a loss.',
          'Backtest any model on at least 100 historical setups before putting real capital at risk.'
        ],
        tradingChecklist: [
          'Pre-market checklist completed before turning on charts?',
          'Trading journal open and ready to log screenshots of entry, exit, and management?',
          'Daily maximum loss limit established and respected?'
        ],
        commonMistakes: [
          'Doubling lot size after a loss to "win back" lost money.',
          'Changing trading strategies every week after seeing someone post a green PnL on Twitter or Instagram.',
          'Trading with money you cannot afford to lose, creating intense emotional anxiety.'
        ],
        practicalExercise: 'Write down your personal 5-point mechanical trading rulebook on a sheet of paper. Sign it, tape it next to your trading monitor, and commit to following it for 30 consecutive days.'
      },
      {
        id: 'masood-adv-4',
        lectureNumber: 4,
        title: 'LEC 4: Never Trade After Big Moves! What is Consolidation in Trading? The Expansion-Consolidation Cycle',
        youtubeId: '2OQPMejXRic',
        playlistType: 'advanced',
        shortSummary: 'Why huge 200+ point trend days are almost always followed by choppy, non-directional consolidation, and how to protect your profits from the inevitable post-expansion trap.',
        keyTakeaways: [
          'Market delivery alternates between two primary states: **Expansion** (high volume, fast directional movement) and **Consolidation** (low volume, sideways accumulation/rebalancing).',
          'After an outsized, multi-hundred point trend day, the institutional algorithm has fulfilled its delivery quota; the next day will almost always be an **Inside Day** or choppy consolidation.',
          'Retail traders make money on the trend day, then give it all back plus extra on the subsequent day by forcing trades in sideways chop.'
        ],
        coreRules: [
          'If yesterday was a massive 200+ point expansion day, expect today to be a consolidation day.',
          'On expected consolidation days, either take the day completely off or cut your normal position size by 75% and target small 10-15 point scalps.',
          'Wait for price to break out of the consolidation range and displace before seeking trend continuations.'
        ],
        tradingChecklist: [
          'Was yesterday’s daily candle range more than 1.5x the 20-day Average Daily Range?',
          'Is the morning session opening inside yesterday’s middle range?',
          'Are 5-minute candles overlapping with long wicks on both sides?'
        ],
        commonMistakes: [
          'Expecting back-to-back 250-point explosive runs every single day.',
          'Getting chopped up trying to buy and sell inside a 30-point tight range on NQ.',
          'Over-trading out of boredom when the market is clearly consolidating.'
        ],
        practicalExercise: 'Look back over the last 30 days of NQ. Find the 3 largest daily expansion candles. Check the very next daily candle after each—notice how each one was an inside day or small consolidation bar.'
      },
      {
        id: 'masood-adv-5',
        lectureNumber: 5,
        title: 'LEC 5: How I Predict the Market? Average Daily Range (ADR) & Inside Day Profiling',
        youtubeId: 'LNeM3UoNeDU',
        playlistType: 'advanced',
        shortSummary: 'Calculating 5-day and 20-day Average Daily Range (ADR) to identify market exhaustion points and predicting explosive expansion from Inside Day setups.',
        keyTakeaways: [
          'Average Daily Range (ADR) measures the typical high-to-low distance an asset travels in a single day.',
          'If NASDAQ has an average daily range of 180 points, and by 10:15 AM it has already moved 190 points from low to high, the expansion is mathematically exhausted; buying high is chasing a top.',
          'An **Inside Day** forms when the entire daily high and low range sits completely inside the prior day’s range. Inside Days represent coiled algorithmic spring energy, typically leading to explosive breakouts within 24 to 48 hours.'
        ],
        coreRules: [
          'Always know today’s 5-day ADR before trading.',
          'When current daily range reaches 90%–110% of ADR, cease entering new trend-continuation trades and look to take profit.',
          'When an Inside Day prints, mark its high and low as prime breakout liquidity targets for the subsequent session.'
        ],
        tradingChecklist: [
          'Calculated 5-day and 20-day ADR for US100?',
          'How many points has price already traveled from today’s extreme low/high?',
          'Did yesterday print as an Inside Day?'
        ],
        commonMistakes: [
          'Entering long when the market is already 150% past its Average Daily Range.',
          'Failing to take profits at the ADR target and watching a 100-point gain retrace back to breakeven.',
          'Ignoring the explosive expansion potential of post-Inside Day sessions.'
        ],
        practicalExercise: 'Calculate the 5-day ADR of US100 by adding the high-to-low range of the last 5 days and dividing by 5. Check if today’s price action respected that range.'
      },
      {
        id: 'masood-adv-6',
        lectureNumber: 6,
        title: 'LEC 6: Why Retail Support and Resistance Fails: Algorithmic Market Makers Explained',
        youtubeId: 'JaF7Tkf8i3A',
        playlistType: 'advanced',
        shortSummary: 'Exposing the retail myth of support and resistance lines, how institutional algorithms engineer double tops and bottoms, and why liquidity resting above resistance is the real target.',
        keyTakeaways: [
          'Retail technical analysis teaches that the more times a level is touched, the stronger it becomes. The institutional reality is the EXACT OPPOSITE: the more times a level is touched, the more stop losses accumulate behind it, making it a massive magnet for algorithms.',
          'Double Tops and Double Bottoms (Equal Highs and Equal Lows) are engineered liquidity pools. Smart Money uses them to trigger retail buy/sell stops so they can fill large institutional orders.',
          'Support does not hold because "buyers like the price"; it holds only when institutional algorithms have no liquidity incentive to reach lower.'
        ],
        coreRules: [
          'Never place your stop loss right below an obvious retail support level or double bottom.',
          'When you see a clean "triple top" or "double bottom," do not trade the bounce—anticipate the SWEEP of that level.',
          'Wait for price to aggressively puncture the support/resistance level, absorb the stops, and show displacement in the opposite direction before entering.'
        ],
        tradingChecklist: [
          'Are there obvious equal highs or equal lows on the chart?',
          'Has the algorithm already swept the retail stop pool?',
          'Did the sweep reject with long wicks and strong opposing candle bodies?'
        ],
        commonMistakes: [
          'Blindly buying the 3rd or 4th touch of a horizontal trendline.',
          'Placing stop losses right below obvious swing lows where every retail trader in the world has their stop.',
          'Thinking market makers "target" individual retail accounts rather than programmatic stop clusters.'
        ],
        practicalExercise: 'Find 3 instances of clean "Double Tops" on a 15-minute chart of US100. Observe how the market pierced above the double top before initiating the real downward move.'
      },
      {
        id: 'masood-adv-7',
        lectureNumber: 7,
        title: 'LEC 7: Why Supply/Demand & Retail Order Blocks Don’t Work? Algorithmic Truths',
        youtubeId: 'ZUbMHzohNVg',
        playlistType: 'advanced',
        shortSummary: 'The critical distinctions between retail supply/demand boxes and true institutional Order Blocks validated by displacement and Fair Value Gaps.',
        keyTakeaways: [
          'Retail traders draw supply and demand boxes around every random candle on the chart and wonder why 70% of them get sliced through without pausing.',
          'A genuine Institutional Order Block has 3 strict validation criteria: 1) It must have swept prior liquidity, 2) It must have created an energetic Market Structure Shift, 3) It must leave behind a clean Fair Value Gap (FVG).',
          'If a zone does not have displacement and an FVG, it is merely retail noise, NOT an institutional footprint.'
        ],
        coreRules: [
          'An Order Block without an associated Fair Value Gap is INVALID.',
          'Order Blocks are only valid for ONE clean retest (first mitigation); subsequent touches have exponentially lower win rates.',
          'Candle bodies must respect the Mean Threshold (50%) of the Order Block—if a candle body closes through the 50% line, the Order Block is invalidated.'
        ],
        tradingChecklist: [
          'Did this Order Block sweep prior session liquidity before moving?',
          'Did it cause an energetic Market Structure Shift (MSS)?',
          'Is there an unmitigated Fair Value Gap directly in front of the Order Block?',
          'Are candle bodies respecting the 50% Mean Threshold?'
        ],
        commonMistakes: [
          'Coloring every red candle before an up-move as an order block.',
          'Re-trading an order block for the 3rd or 4th time after it has already been completely mitigated.',
          'Ignoring higher timeframe narrative and trying to trade 1-minute order blocks in the middle of nowhere.'
        ],
        practicalExercise: 'Mark 5 order blocks on a 5-minute chart. Filter out any that did not cause an MSS and did not leave an FVG. Verify how the filtered ones performed compared to the unfiltered ones.'
      },
      {
        id: 'masood-adv-8',
        lectureNumber: 8,
        title: 'LEC 8: FOMC News Trading Strategy: How to Predict the FOMC with 100% Accuracy (Parts 1, 2, 3)',
        youtubeId: 'mV4wqIgHNW8',
        playlistType: 'advanced',
        shortSummary: 'The definitive 3-phase institutional roadmap for trading Federal Reserve FOMC interest rate announcements and Chairman Jerome Powell press conferences.',
        keyTakeaways: [
          'FOMC days have a unique, highly choreographed algorithmic blueprint consisting of 3 distinct phases.',
          'Phase 1 (14:00 EST Rate Statement): The initial knee-jerk reaction. Volatility spikes 50-80 points in both directions to sweep short-term liquidity. NEVER trade Phase 1!',
          'Phase 2 (14:00 - 14:30 EST Rebalancing): Price retraces into a deep premium or discount Fair Value Gap / Order Block while the market waits for the press conference.',
          'Phase 3 (14:30 EST Press Conference): Chairman Powell speaks. The real institutional trend begins. Algorithms release massive directional liquidity runs targeting the Higher Timeframe Draw on Liquidity.'
        ],
        coreRules: [
          'Remain 100% flat at 13:55 EST before the 14:00 rate release.',
          'Do not touch your mouse between 14:00 and 14:15 EST; let the algorithm sweep both sides.',
          'At 14:30 EST, identify the 5-minute Market Structure Shift and enter on the first clean FVG retest in alignment with the Daily Bias.'
        ],
        tradingChecklist: [
          'All open positions closed prior to 14:00 EST?',
          'Phase 1 liquidity sweep observed and mapped?',
          'Did price retrace into a 50% equilibrium discount/premium PD Array between 14:15 and 14:30?',
          'Is the entry triggered during the 14:30 press conference with defined 25-point stop loss?'
        ],
        commonMistakes: [
          'Gambling on the 14:00:00 exact second release with massive leverage.',
          'Getting stopped out by the initial Judas whip and revenge-trading while emotional.',
          'Failing to recognize that the real move happens between 14:30 and 15:30 EST.'
        ],
        practicalExercise: 'Pull up the 1-minute chart of US100 during the most recent FOMC statement day. Annotate the 14:00 rate release whip, the 14:15 pullback, and the 14:30 press conference directional expansion.'
      },
      {
        id: 'masood-adv-10',
        lectureNumber: 10,
        title: 'LEC 10: I Predicted Every 1-Minute Candle Live! Learn How to Use Algorithm in Trading',
        youtubeId: 'hmr3zLK-inw',
        playlistType: 'advanced',
        shortSummary: 'Reading the 1-minute tape in real time: tracking candle body closures, observing liquidity delivery from fair value gaps, and executing with surgical precision.',
        keyTakeaways: [
          'The 1-minute chart is not random noise; it is the micro-delivery of the exact same IPDA rules governing the Daily chart.',
          'Predicting 1-minute candles requires monitoring whether the previous candle closed above or below its midpoint, whether it respected the nearest FVG, and where the immediate next 1-minute swing high/low sits.',
          'Scalping US100 on the 1-minute timeframe allows for tight 10 to 15-point stops with 30 to 60-point returns when aligned with the 15-minute structural shift.'
        ],
        coreRules: [
          'Only trade 1-minute candles during high-volume macro windows (09:50-10:10 AM, 10:50-11:10 AM EST).',
          'Enter on the 1-minute FVG retest immediately after a 1-minute displacement candle closes.',
          'If a 1-minute candle body closes through your entry FVG, exit immediately—do not wait for full stop loss.'
        ],
        tradingChecklist: [
          '15-minute narrative is clearly defined (Bullish or Bearish)?',
          'Time is within the 09:30 - 11:00 AM New York AM Killzone?',
          '1-minute displacement candle created a fresh FVG?',
          'Limit order placed at the upper/lower boundary of the 1-minute gap?'
        ],
        commonMistakes: [
          'Staring at the 1-minute chart during the 12:30 PM lunch graveyard and trying to scalp random noise.',
          'Over-trading: taking 20 trades an hour on the 1-minute chart instead of waiting for the 1 prime setup.',
          'Ignoring spread and commission costs on hyper-scalps.'
        ],
        practicalExercise: 'Replay the 09:30 to 10:30 AM New York session candle by candle on a 1-minute chart. Predict whether each subsequent candle will expand or retrace based on the nearest FVG.'
      },
      {
        id: 'masood-adv-11',
        lectureNumber: 11,
        title: 'LEC 11: Algorithmic Trading Course: Everything You Need to Know About IPDA',
        youtubeId: 'n9Ozaklpzy8',
        playlistType: 'advanced',
        shortSummary: 'Comprehensive deep dive into the Interbank Price Delivery Algorithm (IPDA): the deterministic mathematics of modern institutional price quotation.',
        keyTakeaways: [
          'Markets are NOT driven by retail buying and selling pressure. Central bank computers and high-frequency algorithms quote price programmatically.',
          'IPDA operates on two mandates: 1) Offer fair value by rebalancing imbalances (FVGs and Volume Imbalances), 2) Hunt resting liquidity (stop loss pools above old highs and below old lows).',
          'Once you understand what IPDA is seeking (the Draw on Liquidity), trading shifts from gambling on probability to tracking an algorithmic delivery schedule.'
        ],
        coreRules: [
          'Always identify whether the market is currently in a state of Seeking Liquidity or Seeking Rebalancing.',
          'Price moves from Discount to Premium, and from Premium to Discount.',
          'Never fight the algorithmic delivery cycle: trade only in the direction of the dominant Draw on Liquidity.'
        ],
        tradingChecklist: [
          'Identified the current Draw on Liquidity on the 1H or Daily chart?',
          'Is the algorithm delivering price into an imbalance or a liquidity pool?',
          'Are institutional order flow signatures present (displacement, energy)?'
        ],
        commonMistakes: [
          'Believing that a few retail traders with $10,000 accounts can "move" the market.',
          'Using retail volume indicators (OBV, Volume Profile) to predict institutional quotation.',
          'Ignoring the algorithmic calendar and session timing constraints.'
        ],
        practicalExercise: 'Select any active trading day on US100. Identify the opening price at 09:30 AM and track how IPDA systematically targeted the unmitigated 1H FVG before reversing to sweep the Asian Low.'
      },
      {
        id: 'masood-adv-12',
        lectureNumber: 12,
        title: 'LEC 12: ICT “Seek and Destroy Profile” Live Prediction and Explanation',
        youtubeId: 'VpIWPUH4-4I',
        playlistType: 'advanced',
        shortSummary: 'Recognizing and avoiding the most lethal retail market maker profile: the Seek & Destroy condition where both highs and lows are ruthlessly swept without directional follow-through.',
        keyTakeaways: [
          'Seek and Destroy is a specialized algorithmic profile where IPDA expands above the high to take buy stops, then immediately dumps below the low to take sell stops, trapping both sides.',
          'It typically occurs ahead of major high-impact macroeconomic events (FOMC, NFP, Jackson Hole) or during holiday trading weeks.',
          'The hallmark of Seek & Destroy: small, overlapping candle bodies, long aggressive wicks in both directions, and total lack of displacement follow-through.',
          'Abdullah Masood Rule: The best trade in a Seek & Destroy profile is NO TRADE. Stepping aside preserves 100% of your capital while retail accounts blow up.'
        ],
        coreRules: [
          'If the market sweeps the Asian High, then sweeps the Asian Low, and immediately reverses back into the middle of the range, declare SEEK AND DESTROY.',
          'In Seek and Destroy conditions, close your charts immediately—do not attempt to scalp.',
          'Wait for the following trading day when normal directional delivery resumes.'
        ],
        tradingChecklist: [
          'Has price swept both the high AND the low of the session without expanding?',
          'Are candle bodies overlapping and trapped inside the opening range?',
          'Is there major high-impact news scheduled for later today or tomorrow?'
        ],
        commonMistakes: [
          'Assuming every breakout is a trend, buying the top, getting stopped, then shorting the breakdown, and getting stopped again.',
          'Revenge trading to make back morning losses on a day designed specifically to harvest stops.',
          'Refusing to accept that some market conditions are mathematically untradeable.'
        ],
        practicalExercise: 'Find an NFP Thursday or pre-FOMC morning on US100. Count how many times price swept a swing high only to instantly dump through the previous swing low. Note how an indicator-based trader would have lost on every trade.',
        animationType: 'seek_and_destroy'
      },
      {
        id: 'masood-adv-13',
        lectureNumber: 13,
        title: 'LEC 13: Live Trading US100 with 100% Accuracy: Complete Execution Breakdown',
        youtubeId: 'iCnnmcIHjXE',
        playlistType: 'advanced',
        shortSummary: 'Real-time live execution breakdown on NASDAQ (US100): pre-market level marking, waiting for the 09:30 cash open sweep, entering at the 1M FVG, and executing partial profits.',
        keyTakeaways: [
          'Pre-market routine: at 08:30 AM, mark the Previous Day High, Previous Day Low, Asian Range High/Low, and London Session High/Low.',
          'At 09:30 AM, sit on your hands for the first 5 to 15 minutes to let the opening volatility sweep one of the pre-marked liquidity pools.',
          'Look for the energetic displacement candle leaving a pristine 1M/5M Fair Value Gap.',
          'Place limit order at the FVG boundary, anchor stop loss safely beyond the sweep extreme, and target the opposite liquidity pool.'
        ],
        coreRules: [
          'Never enter during the first 2 minutes of the 09:30 open (the 09:30:00 to 09:32:00 candle is pure whip).',
          'First take-profit target is 50% of the position at 1:2 Risk-to-Reward, move stop to breakeven.',
          'Let the remaining 50% runner ride to the Higher Timeframe Draw on Liquidity.'
        ],
        tradingChecklist: [
          'Pre-market liquidity pools clearly identified?',
          'Opening 09:30 whip completed and liquidity swept?',
          'Clear displacement with FVG confirmed on 1M/5M chart?',
          'Risk strictly 1% with scale-out targets pre-set in order ticket?'
        ],
        commonMistakes: [
          'Entering within 10 seconds of the 09:30 cash open.',
          'Failing to take partial profits at 1:2 R:R and watching the entire position turn into a loss.',
          'Moving stop loss to breakeven prematurely before price has formed a new structural swing.'
        ],
        practicalExercise: 'Simulate the live trade execution using TradingView Bar Replay on US100 at 09:30 AM. Execute the exact limit order entry on the first FVG following the opening sweep.'
      },
      {
        id: 'masood-adv-14',
        lectureNumber: 14,
        title: 'LEC 14: ICT Daily Bias Trading Strategy: Complete Course (Part 1)',
        youtubeId: 'q9RjXlfCGcg',
        playlistType: 'advanced',
        shortSummary: 'The systematic, objective framework for determining the correct Daily Bias before the market opens: the 3-step filter of HTF Draw, Liquidity Sweeps, and Session Alignment.',
        keyTakeaways: [
          'Daily Bias is NOT a prediction of every wiggle; it is knowing which side of the daily candle will expand (High of Day vs. Low of Day).',
          'Step 1: Determine the Higher Timeframe Draw on Liquidity (Where does IPDA want to deliver price on the Daily/4H chart? E.g. unmitigated Daily FVG or old swing high).',
          'Step 2: Assess whether price has already swept opposing liquidity (e.g. if the draw is bullish, has price swept a recent low to accumulate buy orders?).',
          'Step 3: Wait for lower timeframe structural alignment (15M MSS) during the New York morning session to validate the bias.'
        ],
        coreRules: [
          'If the Daily chart is expanding toward Buy-Side Liquidity, your bias is strictly BULLISH—prohibit all short trades.',
          'If the Daily chart is expanding toward Sell-Side Liquidity, your bias is strictly BEARISH—prohibit all long trades.',
          'If the higher timeframe is trapped in the middle of a consolidation range without a clear draw, your bias is NEUTRAL—stand aside.'
        ],
        tradingChecklist: [
          'Daily Draw on Liquidity identified and annotated?',
          'Is the daily candle expected to be an expansion up-close or down-close candle?',
          'Are lower timeframe entries strictly filtered in the direction of the Daily Bias?'
        ],
        commonMistakes: [
          'Trying to trade both long and short on the same morning, getting stopped out on both sides.',
          'Changing your daily bias every 5 minutes because a lower timeframe 1-minute candle is red.',
          'Trading without a clear higher timeframe Draw on Liquidity.'
        ],
        practicalExercise: 'Open the Daily chart of US100. Identify the current Draw on Liquidity. Write down whether today’s bias is Bullish, Bearish, or Neutral, and note why.'
      },
      {
        id: 'masood-adv-15',
        lectureNumber: 15,
        title: 'LEC 15: How to Trade ICT High Resistance Liquidity Run (HRLR) vs Low Resistance Liquidity Run (LRLR)',
        youtubeId: 'l1WiOUUuB74',
        playlistType: 'advanced',
        shortSummary: 'Differentiating between Low Resistance Liquidity Runs (explosive, one-way trending days) and High Resistance Liquidity Runs (choppy, difficult grinding days) to protect capital.',
        keyTakeaways: [
          'Low Resistance Liquidity Run (LRLR): Occurs when price is moving toward clean, uncontested liquidity (e.g. clean double highs or a wide-open void) with no opposing institutional PD Arrays in the way. Price rockets smoothly in one direction.',
          'High Resistance Liquidity Run (HRLR): Occurs when price attempts to run in a direction where every few points is blocked by opposing order blocks, old swing points, and dense trading history. Price grinds slowly with severe, painful retracements.',
          'Recognizing the difference is the secret to sizing: allocate full risk on LRLR days; cut risk by 75% or sit out completely on HRLR days.'
        ],
        coreRules: [
          'LRLR = Full position size (1% risk), wide targets, hold runners.',
          'HRLR = 0.25% risk, take quick 10-15 point scalps, or do not trade at all.',
          'Look for LRLR conditions immediately following a major HTF liquidity sweep and displacement.'
        ],
        tradingChecklist: [
          'Is the path toward the Draw on Liquidity clear of opposing PD Arrays (LRLR)?',
          'Or is the path cluttered with overlapping consolidation blocks (HRLR)?',
          'Position size adjusted according to the liquidity regime?'
        ],
        commonMistakes: [
          'Expecting a 100-point smooth runner on a High Resistance day and watching your trade get whipped.',
          'Taking small 5-point profits on a Low Resistance day and leaving 80 points on the table.',
          'Failing to analyze the left side of the chart to spot opposing historical blocks.'
        ],
        practicalExercise: 'Review the last 10 trading days on US100. Classify each day as either LRLR or HRLR. Note how much cleaner the LRLR days were to trade.'
      },
      {
        id: 'masood-adv-16',
        lectureNumber: 16,
        title: 'LEC 16: How to Avoid LOSSES in Trading? ICT Seek and Destroy Profile & Smart Money Traps',
        youtubeId: 'duRfPXgprlo',
        playlistType: 'advanced',
        shortSummary: 'Tactical survival manual: identifying the early-warning signatures of a chop day within the first 20 minutes of the session and executing capital protection protocols.',
        keyTakeaways: [
          'Loss avoidance is more important than profit generation: a trader who avoids bad days compounds capital exponentially faster than a trader who gives back 50% of their profits in chop.',
          'Early warning sign #1: The 09:30 open sweeps pre-market high, displaces down, sweeps pre-market low, and immediately wicks back into the opening price.',
          'Early warning sign #2: Consecutive 5-minute candles have long wicks exceeding their body lengths.',
          'Protocol: When these signs appear by 09:50 AM, declare a Trap Day, close TradingView, and do not place a single trade.'
        ],
        coreRules: [
          'Never trade more than 2 setups in a single session.',
          'If your first trade gets stopped out in chop, step back and re-evaluate whether the market is in Seek & Destroy.',
          'A zero-trade day is a WINNING day when the market is distributing losses to retail.'
        ],
        tradingChecklist: [
          'Are morning candles showing clean body displacement or dual-sided wicks?',
          'Has the market failed to produce follow-through on structural breaks?',
          'Am I feeling emotional urge to trade out of boredom?'
        ],
        commonMistakes: [
          'Thinking you "must" trade every single day.',
          'Believing that your technical strategy is "broken" just because you traded it in an untradeable chop regime.',
          'Refusing to close the computer screen when conditions are hostile.'
        ],
        practicalExercise: 'Track your trading journal over the past 3 months. Identify your 5 worst loss days. Verify if at least 3 of those days were Seek & Destroy chop days where you should have stayed in cash.'
      },
      {
        id: 'masood-adv-17',
        lectureNumber: 17,
        title: 'LEC 17: Learn How I Predicted the Seek-and-Destroy Day Live with 100% Accuracy',
        youtubeId: 'OObNYp-Xq9I',
        playlistType: 'advanced',
        shortSummary: 'Live case study dissecting how Abdullah Masood warned his community ahead of time about an impending Seek & Destroy day, saving students thousands in capital.',
        keyTakeaways: [
          'Forecasting a Seek & Destroy day is done before the market opens by examining calendar context, HTF range compression, and lack of clear Draw on Liquidity.',
          'When both US100 and US500 are compressed inside tight multi-day ranges ahead of a Friday NFP release, Thursday is guaranteed to be a liquidity-harvesting Seek & Destroy session.',
          'Real trader edge: knowing when NOT to click buy or sell.'
        ],
        coreRules: [
          'Examine the Daily chart for multi-day compression inside an old range.',
          'Check if tomorrow has a Tier-1 economic release (NFP, CPI, FOMC).',
          'If compression + imminent news align, expect Seek & Destroy and preserve capital.'
        ],
        tradingChecklist: [
          'Is the market coiled inside an unexpanded daily range?',
          'Is tomorrow the first Friday of the month (NFP)?',
          'Did morning price action confirm dual-sided stop runs?'
        ],
        commonMistakes: [
          'Ignoring the calendar context and assuming every Thursday is a trend day.',
          'Listening to retail Twitter commentators predicting massive breakouts inside compression.',
          'Trading full position size on event-eve sessions.'
        ],
        practicalExercise: 'Locate the Thursday before the last 3 NFP releases on US100. Note the price range and candlestick anatomy of each Thursday session.'
      },
      {
        id: 'masood-adv-19',
        lectureNumber: 19,
        title: 'LEC 19: ICT SMC Daily Bias Trading Strategy Full Course (Part 2)',
        youtubeId: 'F5c6A33G7zA',
        playlistType: 'advanced',
        shortSummary: 'Advanced daily bias mechanics: timing the session transitions, validating candle body closures, and identifying bias invalidation levels.',
        keyTakeaways: [
          'Daily Bias is only confirmed when lower timeframe candle bodies respect the narrative.',
          'If your bias was Bullish, but price closes a 15-minute candle body below the key discount Fair Value Gap during New York AM, the bias is invalidated for the day; switch to Neutral.',
          'Never force a bias: if the market does not show clean displacement in your anticipated direction, accept that the algorithm is pausing or re-accumulating.'
        ],
        coreRules: [
          'A Daily Bias is a working hypothesis that requires lower timeframe validation.',
          'If key structural support closes with a full candle body, immediately abandon the bullish bias—do NOT hold and hope.',
          'Re-assess bias at the 13:30 PM New York afternoon session open.'
        ],
        tradingChecklist: [
          'Has the 15-minute chart confirmed the bias with a displacement candle body?',
          'Is the invalidation price level clearly defined on the chart?',
          'Are you prepared to stand aside if the invalidation level is breached?'
        ],
        commonMistakes: [
          'Marrying a bias and refusing to change your mind when the chart proves you wrong.',
          'Treating a minor 1-minute pullback as a full bias invalidation.',
          'Trading against the invalidated level out of stubborn pride.'
        ],
        practicalExercise: 'Pick 5 historical trading days. Track the initial morning bias, and note whether lower timeframe candle bodies validated or invalidated the bias by 10:30 AM.'
      },
      {
        id: 'masood-adv-20',
        lectureNumber: 20,
        title: 'LEC 20: ICT P/D Array Matrix Live Teaching / Trading in Hindi / Urdu',
        youtubeId: 'BI77I22GZMU',
        playlistType: 'advanced',
        shortSummary: 'Mastering the institutional Premium / Discount (P/D) Array hierarchy: Order Blocks, Fair Value Gaps, Breakers, and Mitigation Blocks mapped to the 50% Equilibrium rule.',
        keyTakeaways: [
          'Every price range has an exact 50% midpoint called **Equilibrium**.',
          'Above 50% = **Premium** (Smart money sells to retail buyers).',
          'Below 50% = **Discount** (Smart money buys from retail sellers).',
          'The P/D Array Matrix ranks institutional levels in order of priority: Old High/Low -> Rejection Block -> Order Block -> Fair Value Gap -> Liquidity Void -> Breaker Block -> Mitigation Block.',
          'Golden Rule: NEVER buy in Premium; NEVER sell in Discount.'
        ],
        coreRules: [
          'Anchor your Fibonacci tool from the lowest swing low to the highest swing high of the current dealing range to find the 50% Equilibrium line.',
          'Look for Long setups ONLY in Discount (below 50%) at a Bullish FVG or Bullish Order Block.',
          'Look for Short setups ONLY in Premium (above 50%) at a Bearish FVG or Bearish Order Block.'
        ],
        tradingChecklist: [
          'Dealing range swing high and swing low identified?',
          '50% Equilibrium line marked on chart?',
          'Is current price in Discount (<50%) for longs or Premium (>50%) for shorts?',
          'Is there an unmitigated PD Array present in the respective zone?'
        ],
        commonMistakes: [
          'Buying at an Order Block that is sitting high up in Premium territory (extremely low probability).',
          'Selling at an FVG that is already deep down in Discount territory.',
          'Not drawing the dealing range from the true structural swing points.'
        ],
        practicalExercise: 'Take the current 4H dealing range on US100. Mark the 50% Equilibrium level. Label every PD Array above 50% as Premium and every PD Array below 50% as Discount.',
        bilingualNotes: 'P/D Array Matrix ka complete live training: Premium aur Discount zone mein sahi array kaise select karein.'
      },
      {
        id: 'masood-adv-21',
        lectureNumber: 21,
        title: 'LEC 21: ICT SMC Trading Strategy Full Course: The Complete Institutional Blueprint',
        youtubeId: '9Zxfq0As4tU',
        playlistType: 'advanced',
        shortSummary: 'Synthesizing the entire advanced curriculum into a unified, step-by-step mechanical trading strategy from pre-market analysis to trade execution and exit.',
        keyTakeaways: [
          'The complete execution algorithm: 1) Daily HTF Draw on Liquidity, 2) Session pre-market range sweep, 3) 5M/15M Market Structure Shift with Displacement, 4) Entry at FVG / Inversion FVG, 5) Fixed 1% risk with predefined R:R targets.',
          'Trading success comes from ruthless repetition of this single A+ setup over hundreds of executions.',
          'Eliminate discretion: if any single step of the checklist is missing, do not take the trade.'
        ],
        coreRules: [
          'Checklist compliance must be 100% before order placement.',
          'Risk strictly 1% per trade; maximum 2 trades per day.',
          'Target the objective Draw on Liquidity; take partial profits at 1:2 R:R.'
        ],
        tradingChecklist: [
          'Higher timeframe Draw on Liquidity defined?',
          'Pre-market liquidity sweep occurred during session open?',
          'Market Structure Shift with displacement confirmed?',
          'Entry placed at valid PD Array in Discount (for long) or Premium (for short)?',
          'Risk calculated to exactly 1%?'
        ],
        commonMistakes: [
          'Skipping steps because a candle is moving fast and FOMO takes over.',
          'Over-complicating the strategy by adding retail indicators or external opinions.',
          'Giving up on the strategy after 2 normal statistical losses.'
        ],
        practicalExercise: 'Backtest this complete 5-step blueprint across 20 historical sessions on US100. Record your win-rate, average risk-to-reward, and max drawdown in your journal.'
      }
    ]
  },
  {
    id: 'daily_bias',
    title: '3) 2025 ICT Daily Bias Mentorship',
    subtitle: 'Intermarket Relationships, SMT Divergence, MMXM Tape Reading & Scout Sniper Precision',
    badge: 'Mastery Mentorship',
    description: 'The premier 2025 mentorship curriculum by Trader Abdullah Masood. Master the weekly and daily bias determination engine, uncover live multi-index correlation (US100 vs US500 vs US30), navigate FOMC Day 2025 bias, anchor Optimal Trade Entry (OTE 62%–79%) for daily targets, harness Volume Imbalances and seasonal tendencies, deploy IPDA 20/40/60-day lookback data ranges, master the US Dollar Index (DXY) as the master market compass, detect SMT Divergence to spot smart money accumulation, dismantle market traps, decode Market Maker Buy & Sell Models (MMBM/MMSM), read the tape like institutional Wall Street desks, and execute Scout Sniper precision trades.',
    targetAudience: 'Serious traders aiming for professional-grade consistency, algorithmic precision, institutional tape reading skills, and funded account mastery.',
    prerequisites: ['Full mastery of Beginners and Advanced Guides', 'Deep understanding of PD Arrays and Liquidity Pools', 'Experience trading live or demo futures/indices'],
    lecturesCount: 21,
    lectures: [
      {
        id: 'masood-db-1',
        lectureNumber: 1,
        title: 'LEC 1: Deep Dive Into ICT SMC Weekly / Daily Bias Part 3',
        youtubeId: '5XJ56kqGMiE',
        playlistType: 'daily_bias',
        shortSummary: 'Mastering the Weekly Candle Profile: how the weekly candle’s Open, Low, High, and Close shape individual daily bias from Monday through Friday.',
        keyTakeaways: [
          'Individual daily candles do not exist in isolation; they are building blocks of the Weekly Candle.',
          'In a Bullish Weekly Bias, the Low of the Week typically forms on Tuesday morning (or occasionally Monday/Wednesday) during the London or New York AM session.',
          'Once the Low of the Week forms, Wednesday and Thursday become aggressive expansion days (the easiest days to trade). Friday typically forms the High of the Week and rebalances into close.',
          'Understanding where we are in the Weekly Profile prevents you from fighting multi-day institutional momentum.'
        ],
        coreRules: [
          'On Monday, observe the initial weekly range establishment; do not force aggressive trades.',
          'Look for the classic Tuesday Low of the Week sweep into a Weekly/Daily Bullish FVG.',
          'Ride the Wednesday and Thursday expansion wave in the direction of the weekly trend.'
        ],
        tradingChecklist: [
          'Weekly candle bias established (Bullish or Bearish)?',
          'Has the Low of the Week (for bullish) or High of the Week (for bearish) already formed?',
          'What day of the week is it (Monday accumulation, Tue manipulation, Wed/Thu expansion, Fri close)?'
        ],
        commonMistakes: [
          'Expecting Friday afternoon to print a massive 150-point expansion when the weekly range is already fulfilled.',
          'Shorting on Wednesday when Tuesday just confirmed the Low of the Week with massive displacement.',
          'Treating Monday as a full-size trend day when it is usually range-setting.'
        ],
        practicalExercise: 'Open the Weekly chart of US100. Inspect the last 8 weekly candles. Drop down to the Daily chart and identify which day of the week printed the extreme high and extreme low of each weekly candle.'
      },
      {
        id: 'masood-db-3',
        lectureNumber: 3,
        title: 'LEC 3: How to Find Daily Bias ICT/SMC: Live Analysis of US Stock Indices',
        youtubeId: '6TRoiMxR_gU',
        playlistType: 'daily_bias',
        shortSummary: 'Real-time multi-index bias synchronization: cross-examining US100 (NQ), US500 (ES), and US30 (Dow Jones) to identify leading vs. lagging market signatures.',
        keyTakeaways: [
          'The three major US Indices (US100, US500, US30) move together in macroeconomic regimes, but institutional algorithms rotate liquidity between them.',
          'When US100 shows aggressive bullish displacement while US500 lags, US100 is the leading asset—trade the leader for maximum point expansion.',
          'When all three indices align in the same direction, your daily bias has the highest statistical confidence.'
        ],
        coreRules: [
          'Always have charts of US100, US500, and US30 open side-by-side during your pre-market routine.',
          'Identify which index is leading (clearing levels first) and which is lagging.',
          'Trade the strongest index for Long setups and the weakest index for Short setups.'
        ],
        tradingChecklist: [
          'Are US100, US500, and US30 agreeing on direction?',
          'Which index has displaced the cleanest away from its morning open?',
          'Is there any inter-index divergence present?'
        ],
        commonMistakes: [
          'Trading an asset that is chopping sideways while its sister index is running 100 points.',
          'Ignoring the broader index correlation and trading US100 in complete isolation.',
          'Attempting to short the strongest index while buying the weakest index simultaneously.'
        ],
        practicalExercise: 'Set up a 3-chart layout on TradingView with US100, US500, and US30 on 15-minute timeframes. Observe how their morning opens interact.'
      },
      {
        id: 'masood-db-4',
        lectureNumber: 4,
        title: 'LEC 4: FOMC-Day 2025 ICT Daily Bias Mentorship',
        youtubeId: 'kZKW2zIJSds',
        playlistType: 'daily_bias',
        shortSummary: 'The updated 2025 institutional playbook for navigating FOMC rate decision days: pre-market freeze, 14:00 algorithmic trap, and 14:30 press conference execution.',
        keyTakeaways: [
          'FOMC morning sessions (09:30 - 11:30 AM) are strictly for observation or minor 10-point micro-scalps; institutional liquidity is held back until 14:00 EST.',
          'The 14:00 EST rate decision candle is designed to trap retail break-out orders and purge stops in both directions.',
          'The true Daily Bias on FOMC day reveals itself only during Jerome Powell’s 14:30 EST press conference.'
        ],
        coreRules: [
          'Do not hold morning positions into the 12:00 PM session on FOMC days.',
          'Zero execution between 13:50 and 14:15 EST.',
          'Execute only at 14:30 EST following a verified 5-minute Market Structure Shift.'
        ],
        tradingChecklist: [
          'FOMC day recognized and marked on calendar?',
          'Morning session risk reduced or avoided?',
          'Ready to execute post-14:30 press conference setup?'
        ],
        commonMistakes: [
          'Treating FOMC morning as a normal trend session.',
          'Trying to trade the 14:00:00 exact second spike with high leverage.',
          'Becoming emotionally exhausted before the real 14:30 move even starts.'
        ],
        practicalExercise: 'Review the 2025 FOMC meeting dates. Mark the 14:00 and 14:30 candles on US100 for each meeting and document the post-14:30 trend direction.'
      },
      {
        id: 'masood-db-5',
        lectureNumber: 5,
        title: 'LEC 5: ICT Optimal Trade Entry (OTE) for Daily Bias',
        youtubeId: 'zmxfSqk7AAg',
        playlistType: 'daily_bias',
        shortSummary: 'Anchoring the Fibonacci Optimal Trade Entry (OTE) ratios (0.62, 0.705, 0.79) to frame sniper entries aligned with the Daily Bias.',
        keyTakeaways: [
          'Optimal Trade Entry (OTE) is the institutional sweet spot where risk is minimized and reward is maximized.',
          'The exact Fibonacci levels: 0.50 (Equilibrium), 0.62 (Entry zone start), 0.705 (The Institutional Sweet Spot), 0.79 (Deep discount/premium threshold).',
          'Anchor the Fibonacci tool from the impulse swing low to swing high: when price retraces into the 0.62 - 0.79 zone and overlaps with an FVG or Order Block, you have an A+ institutional setup.'
        ],
        coreRules: [
          'OTE is ONLY valid if anchored across a true displacement swing that created a Market Structure Shift.',
          'Place your limit order at 0.62 or 0.705; stop loss rests safely beyond the 1.0 anchor point.',
          'Targets: Take profit 1 at 0.0 (old high), Take profit 2 at -0.272 extension, Take profit 3 at -0.618 extension.'
        ],
        tradingChecklist: [
          'Is Fibonacci anchored from the swing low to swing high of the displacement move?',
          'Does the 0.62 - 0.79 OTE zone align with an unmitigated FVG or Order Block?',
          'Is stop loss anchored behind the 1.0 swing extreme?'
        ],
        commonMistakes: [
          'Drawing Fibonacci over choppy consolidation wicks with no displacement.',
          'Entering at 0.382 or 0.50 without waiting for the true discount OTE zone.',
          'Taking OTE setups against the higher timeframe Daily Bias.'
        ],
        practicalExercise: 'Configure your TradingView Fibonacci tool with 0, 0.5, 0.62, 0.705, 0.79, 1.0, -0.272, and -0.618. Find 5 textbook OTE setups on the 5-minute chart of US100.'
      },
      {
        id: 'masood-db-6',
        lectureNumber: 6,
        title: 'LEC 6: ICT Volume Imbalance, Seasonal Tendencies & Daily Bias Shift',
        youtubeId: 'sOxSpBvdw_w',
        playlistType: 'daily_bias',
        shortSummary: 'The subtle but powerful mechanics of Volume Imbalances (body-to-body gaps), seasonal institutional tendencies, and identifying when the daily bias formally shifts.',
        keyTakeaways: [
          'A **Volume Imbalance** occurs when the wicks of two consecutive candles overlap, but their real candle BODIES do not overlap, leaving a clean open space between Candle 1 Close and Candle 2 Open.',
          'Volume Imbalances are high-priority institutional magnets: price will return to surgically retest the gap before continuing the trend.',
          'Seasonal tendencies: institutional asset managers deploy capital in predictable quarterly cycles (e.g. Q1 early year rebalancing, summer doldrums, Q4 Santa Claus rally).',
          'A Daily Bias Shift occurs when a Daily candle body closes through the invalidation level of the previous dealing range.'
        ],
        coreRules: [
          'Mark every Volume Imbalance on your chart with a shaded box; treat it with the same respect as a Fair Value Gap.',
          'When price retests a Volume Imbalance in the direction of bias, expect rapid, energetic rejection.',
          'Do not anticipate a bias shift until the candle body officially closes through the swing extreme.'
        ],
        tradingChecklist: [
          'Any unmitigated Volume Imbalances present on the 1H or 15M chart?',
          'Is current seasonal tendency aligned with the technical bias?',
          'Has a genuine Daily Bias Shift occurred with a candle body close?'
        ],
        commonMistakes: [
          'Confusing a Volume Imbalance with a normal 3-candle Fair Value Gap.',
          'Ignoring Volume Imbalances and wondering why price bounced at an apparently "empty" price level.',
          'Calling a bias shift on an intraday wick when the daily body has not closed.'
        ],
        practicalExercise: 'Scan the 1H chart of US100 for the last 2 weeks. Identify and box out 3 Volume Imbalances. Notice how price reacted when returning to touch the open-close gap.'
      },
      {
        id: 'masood-db-7',
        lectureNumber: 7,
        title: 'LEC 7: ICT IPDA Data Ranges (20, 40, 60 Day Lookback) & Liquidity Voids',
        youtubeId: 'YfeZYf1fe5M',
        playlistType: 'daily_bias',
        shortSummary: 'How the Interbank Price Delivery Algorithm references historical 20, 40, and 60-day institutional lookback windows to find liquidity voids and key price targets.',
        keyTakeaways: [
          'Institutional algorithms do not look back 5 years; they operate on 20-day, 40-day, and 60-day institutional lookback cycles (approx. 1, 2, and 3 calendar months).',
          'Mark the 20-day, 40-day, and 60-day high and low on your Daily chart to find major institutional inflection points.',
          'A **Liquidity Void** is a violent one-way price run where price moved in consecutive green or red candles without two-sided auction; IPDA will systematically return to fill the void like water filling a hole.'
        ],
        coreRules: [
          'Count back 20, 40, and 60 daily candles from the current day and mark the highest high and lowest low.',
          'When price approaches a 20-day or 40-day high/low, anticipate major institutional profit-taking or reversal.',
          'Liquidity voids must be filled before the market can establish sustainable new trends.'
        ],
        tradingChecklist: [
          '20-day and 40-day extreme highs and lows plotted on Daily chart?',
          'Is price currently trading into an unfilled liquidity void?',
          'Is the target aligned with an IPDA lookback milestone?'
        ],
        commonMistakes: [
          'Looking at arbitrary 200-period moving averages instead of real 20/40/60-day calendar high/low levels.',
          'Ignoring wide liquidity voids and trying to short into a vacuum.',
          'Assuming old highs from 3 years ago have more relevance than the 40-day institutional high.'
        ],
        practicalExercise: 'On the Daily chart of US100, count back 20 trading days and mark the 20-day high and low. Observe how price respects those levels when tested.'
      },
      {
        id: 'masood-db-8',
        lectureNumber: 8,
        title: 'LEC 8: Algorithmic Trading Bias Complete Course: The Rule-Based Blueprint',
        youtubeId: 'wTBudqCF9eU',
        playlistType: 'daily_bias',
        shortSummary: 'Transforming subjective guesswork into a deterministic, algorithmic decision tree for daily bias determination before the morning cash open.',
        keyTakeaways: [
          'Algorithmic trading is not about automated black-box robots; it is about human traders thinking and executing like a rule-based algorithm.',
          'The 4-gate daily filter: 1) HTF Weekly/Daily Draw, 2) Midnight Open Discount/Premium location, 3) Pre-market Asian/London sweep status, 4) Economic Calendar risk status.',
          'When all 4 gates pass, trade execution has an 80%+ historical edge.'
        ],
        coreRules: [
          'Execute trades ONLY when all 4 gates of the algorithmic filter are green.',
          'If any gate is red or ambiguous, reduce risk or stay in cash.',
          'Never trade on gut feeling, social media chatter, or hope.'
        ],
        tradingChecklist: [
          'Gate 1: Clear HTF Draw on Liquidity identified?',
          'Gate 2: Price at favorable discount/premium relative to Midnight Open?',
          'Gate 3: Pre-market liquidity sweep confirmed?',
          'Gate 4: No imminent high-impact Red Folder news conflict?'
        ],
        commonMistakes: [
          'Taking trades when only 1 or 2 gates are satisfied.',
          'Modifying rules mid-trade to justify staying in a losing position.',
          'Failing to record rule compliance in your trading journal.'
        ],
        practicalExercise: 'Print the 4-gate checklist. Grade your last 5 trades against the 4 gates. Note how the trades that complied with all 4 performed compared to those that broke rules.'
      },
      {
        id: 'masood-db-9',
        lectureNumber: 9,
        title: 'LEC 9: How to Trade with 100% Accuracy? ICT SMC Master Risk & Execution Guidelines',
        youtubeId: 'bun7bn2tdzE',
        playlistType: 'daily_bias',
        shortSummary: 'The institutional definition of "100% Accuracy": zero deviation from trading rules, complete emotional detachment, and disciplined risk execution.',
        keyTakeaways: [
          'In professional trading, "100% Accuracy" does not mean you never have a losing trade; it means your PROCESS is 100% accurate and error-free.',
          'A losing trade that followed every single rule of your plan is a SUCCESSFUL trade.',
          'A winning trade that broke rules, over-leveraged, or had no stop loss is a CATASTROPHIC FAILURE that will eventually blow your account.',
          'Long-term profitability is the mathematical result of: Edge x Risk Management x Emotional Discipline.'
        ],
        coreRules: [
          'Judge your performance by Rule Execution, NOT by dollar PnL at the end of the day.',
          'Never risk more than 1% of account equity on any single trade setup.',
          'Never take a trade without a mechanical entry trigger, defined stop, and objective target.'
        ],
        tradingChecklist: [
          'Did I follow all pre-trade rules without rushing?',
          'Is my stop loss hard-set in the broker ticket?',
          'Am I emotionally calm, detached, and prepared for either win or loss?'
        ],
        commonMistakes: [
          'Equating making money with trading well (reinforcing bad gambling habits).',
          'Feeling devastated after a standard 1% loss that followed all rules.',
          'Searching for a "holy grail" that never has a loss.'
        ],
        practicalExercise: 'Track your next 10 trades purely on "Execution Score" (0 to 10 points per trade based on rule compliance). Aim for a 10/10 execution score regardless of whether individual trades win or lose.'
      },
      {
        id: 'masood-db-11',
        lectureNumber: 11,
        title: 'LEC 11: Intermarket Relationship: DXY vs US Indices vs EUR/USD',
        youtubeId: '_426gIgKraI',
        playlistType: 'daily_bias',
        shortSummary: 'Using the US Dollar Index (DXY) as the ultimate macro compass: the inverse correlation between the Dollar, Equity Indices, and Foreign Currencies.',
        keyTakeaways: [
          'The US Dollar Index (DXY) is the puppet master of global financial markets.',
          'Inverse relationship: When DXY expands aggressively BULLISH, US Stock Indices (US100, US500) and EUR/USD typically face severe downward BEARISH gravity.',
          'When DXY expands BEARISH, Equities and EUR/USD are unleashed for massive BULLISH expansion runs.',
          'Divergence alert: If DXY is dropping but US100 refuses to rally, institutional smart money is secretly distributing equities—prepare for a sharp reversal.'
        ],
        coreRules: [
          'Always check the DXY 1H and Daily chart before taking any trade on US100 or EURUSD.',
          'Do NOT buy US100 if DXY is bouncing off a Daily Bullish Order Block with aggressive upward displacement.',
          'Align your trade: Long Equities / Long EURUSD when DXY is targeting Sell-Side Liquidity.'
        ],
        tradingChecklist: [
          'DXY Daily and 1H bias determined?',
          'Is DXY moving inversely to US100 as expected?',
          'Are there any non-correlated divergences between DXY and Indices?'
        ],
        commonMistakes: [
          'Trading indices or forex currencies without even having DXY open on your watchlist.',
          'Buying US100 right as DXY hits a massive discount FVG and launches an explosive rally.',
          'Ignoring intermarket divergence signals that precede major market crashes.'
        ],
        practicalExercise: 'Open DXY and US100 side-by-side on 15-minute charts. Observe how an 08:30 displacement on DXY produces an immediate mirror-opposite displacement on US100.'
      },
      {
        id: 'masood-db-12',
        lectureNumber: 12,
        title: 'LEC 12: ICT Algorithmic Price Delivery Continuum: The Perpetual Market Loop',
        youtubeId: 'xQ1XqVlcxPg',
        playlistType: 'daily_bias',
        shortSummary: 'Understanding the perpetual 4-stage algorithmic cycle: Consolidation -> Expansion -> Retracement -> Reversal, and positioning yourself on the right stage of delivery.',
        keyTakeaways: [
          'The market is trapped in a perpetual 4-phase algorithmic loop: **Consolidation** (range) -> **Expansion** (breakout displacement) -> **Retracement** (pullback to FVG/OB) -> **Reversal** (liquidity sweep and directional change) -> return to Consolidation.',
          'Retail traders buy at the end of Expansions; Smart Money buys during Retracements into Discount PD Arrays.',
          'Identify exactly which phase of the continuum the market is currently occupying before choosing your execution model.'
        ],
        coreRules: [
          'Never buy during an Expansion—wait for the Retracement phase.',
          'Enter on the Retracement into the 50% equilibrium discount of the expansion leg.',
          'Exit your trade during the subsequent Expansion into resting Buy-Side Liquidity.'
        ],
        tradingChecklist: [
          'What phase is the market in right now (Consolidation, Expansion, Retracement, Reversal)?',
          'Am I entering during a healthy retracement or chasing a late expansion?',
          'Is the target aligned with the next expansion objective?'
        ],
        commonMistakes: [
          'Entering trades in the middle of Consolidation and getting stopped by random wicks.',
          'Buying the top of an Expansion leg right before the Retracement begins.',
          'Failing to recognize when a Retracement turns into a full Reversal.'
        ],
        practicalExercise: 'Label the 4 phases (Consolidation, Expansion, Retracement, Reversal) across a 1-day price sequence on a 5-minute chart of US100.'
      },
      {
        id: 'masood-db-13',
        lectureNumber: 13,
        title: 'LEC 13: Deep Dive Into ICT Liquidity & Inefficiency: BSL, SSL & Imbalances',
        youtubeId: '2xeQI7C4GbQ',
        playlistType: 'daily_bias',
        shortSummary: 'Comprehensive forensic study of Buy-Side Liquidity (BSL), Sell-Side Liquidity (SSL), and market inefficiencies (FVGs): the dual engines of institutional order flow.',
        keyTakeaways: [
          'Liquidity is the fuel that powers financial markets: institutional orders are too large to fill at market prices without massive slippage, so algorithms drive price toward stop loss clusters.',
          'Buy-Side Liquidity (BSL): Sits above swing highs, equal highs, and trendline resistance. Consists of buy stop losses of short sellers and breakout buy orders of retail traders.',
          'Sell-Side Liquidity (SSL): Sits below swing lows, equal lows, and trendline support. Consists of sell stop losses of buyers and breakdown sell orders of retail traders.',
          'Smart money pairs their massive orders with these retail stops: they sell into BSL and buy into SSL.'
        ],
        coreRules: [
          'Always identify whether the nearest resting liquidity pool is BSL or SSL before looking for entries.',
          'When BSL is swept, watch for displacement downward (reversal) or continuation into higher BSL pools.',
          'Combine liquidity sweeps with Fair Value Gap inefficiencies for highest-probability setups.'
        ],
        tradingChecklist: [
          'Where is the resting BSL on the chart? Where is the resting SSL?',
          'Has price just swept a major liquidity pool?',
          'Is an unmitigated FVG present to absorb the reversal?'
        ],
        commonMistakes: [
          'Placing orders in the middle of nowhere where there is no liquidity or imbalance.',
          'Buying into Buy-Side Liquidity (buying where institutions are selling).',
          'Selling into Sell-Side Liquidity (selling where institutions are accumulating).'
        ],
        practicalExercise: 'Mark all prominent BSL pools (above highs) and SSL pools (below lows) on a 1H chart of US100. Track how price moves from one pool directly to the next.'
      },
      {
        id: 'masood-db-14',
        lectureNumber: 14,
        title: 'LEC 14: ICT Lower Timeframe Entry Technique With Daily Bias',
        youtubeId: 'k3rhc8Ya37w',
        playlistType: 'daily_bias',
        shortSummary: 'The exact multi-timeframe stepping stone: transitioning from Daily Bias to 15-minute structural framing down to 5-minute/1-minute execution within New York macro windows.',
        keyTakeaways: [
          'The 4-step execution ladder: 1) Daily chart sets Direction & Draw on Liquidity, 2) 15-minute chart establishes session structure and confirms Judas sweep, 3) 5-minute chart prints displacement and Fair Value Gap, 4) 1-minute chart executes limit order with minimal drawdown.',
          'Timing is everything: execution MUST occur within an institutional Macro Window (09:50 - 10:10 AM, 10:50 - 11:10 AM EST).',
          'This nested technique allows you to capture 50 to 100-point moves on US100 with only 10 to 15 points of risk (1:4+ R:R).'
        ],
        coreRules: [
          'Never execute a 1-minute trade without 15-minute displacement confirmation.',
          'Entry must be inside an unmitigated FVG or at its 50% Consequent Encroachment.',
          'Time of entry must align with an active New York AM Macro window.'
        ],
        tradingChecklist: [
          'Daily Bias is active and unambiguous?',
          '15-minute MSS confirmed with energetic displacement?',
          '5M or 1M FVG identified and limit order placed?',
          'Clock reads between 09:50 and 11:10 AM New York time?'
        ],
        commonMistakes: [
          'Executing at 09:31 AM before the 15-minute structure has had time to form.',
          'Using a 1-minute entry to trade against the 15-minute trend.',
          'Entering during the 11:30 AM to 13:00 PM dead zone.'
        ],
        practicalExercise: 'Follow the 4-step execution ladder during tomorrow’s New York AM session. Record screenshots of the Daily, 15M, 5M, and 1M charts at the moment of entry.'
      },
      {
        id: 'masood-db-15',
        lectureNumber: 15,
        title: 'LEC 15: SMT Divergence: Smart Money Technique Masterclass',
        youtubeId: 'w4rbWfSJVuA',
        playlistType: 'daily_bias',
        shortSummary: 'Unmasking institutional accumulation and distribution via intermarket correlation cracks between US100 (NASDAQ) and US500 (ES) or EURUSD and DXY.',
        keyTakeaways: [
          'Smart Money Technique (SMT) Divergence is the #1 institutional order flow fingerprint taught by ICT and Abdullah Masood.',
          'Correlated assets like NASDAQ and S&P 500 should move together. When one asset sweeps a swing high/low but the other FAILS to sweep it, a crack in correlation (SMT Divergence) has occurred.',
          'Bullish SMT: US100 makes a Lower Low (sweeping sell stops), but US500 makes a Higher Low (refusing to make a new low) -> Smart Money is aggressively buying US500; expect explosive upward reversal on both assets!',
          'Bearish SMT: US100 makes a Higher High (sweeping buy stops), but US500 makes a Lower High -> Smart Money is distributing; expect severe downward collapse.'
        ],
        coreRules: [
          'Always compare US100 and US500 at key session liquidity sweeps (Asian High/Low, Previous Day High/Low).',
          'When SMT Divergence appears at a key PD Array, trade in the direction of the non-sweeping asset (the stronger asset).',
          'SMT Divergence on a 15-minute chart carries higher institutional validity than a 1-minute divergence.'
        ],
        tradingChecklist: [
          'US100 and US500 charts synchronized on the same timeframe?',
          'Did one asset sweep a swing point while the sister asset failed?',
          'Does the SMT occur at an unmitigated higher timeframe PD Array?'
        ],
        commonMistakes: [
          'Looking for SMT divergence between non-correlated random assets.',
          'Trading SMT divergence in the middle of a choppy range without HTF PD Array confluence.',
          'Shorting the asset that failed to make a new low (short the weaker one that made a higher high, or buy the stronger one).'
        ],
        practicalExercise: 'Open US100 and US500 side-by-side on 5-minute charts. Find 3 historical session opens where an SMT Divergence signaled a major trend reversal.',
        animationType: 'smt_divergence'
      },
      {
        id: 'masood-db-16',
        lectureNumber: 16,
        title: 'LEC 16: Mastering Market Traps: Engineered Liquidity & Fake MSS',
        youtubeId: 'UFepbVftz04',
        playlistType: 'daily_bias',
        shortSummary: 'Exposing institutional trap mechanics: engineered retail inducement, fake market structure shifts, and turtle soups designed to liquidate early breakout traders.',
        keyTakeaways: [
          'Institutions deliberately engineer textbook chart patterns (head & shoulders, trendlines, flags) to induce retail traders into taking positions and placing predictable stops.',
          'Fake Market Structure Shift (Fake MSS): Price pierces a swing high with a long wick, triggering retail breakout buyers, but the candle body closes back below the level. This is an inducement trap, NOT an MSS!',
          'A true MSS requires a decisive candle BODY close through the swing level, accompanied by displacement leaving a Fair Value Gap.'
        ],
        coreRules: [
          'Always wait for the candle to officially CLOSE before confirming an MSS.',
          'If a swing level is broken by a wick only, treat it as a Liquidity Sweep (Turtle Soup) and look for a reversal.',
          'Never enter on the first breakout of a tight consolidation range; wait for the fakeout sweep, then trade the real move.'
        ],
        tradingChecklist: [
          'Did the candle body close beyond the swing high/low or only wick?',
          'Is there an FVG left behind by the move?',
          'Was the breakout an obvious retail pattern designed to induce liquidity?'
        ],
        commonMistakes: [
          'Entering immediately when price crosses a swing line before the candle has closed.',
          'Falling for obvious retail trendline bounces.',
          'Getting caught on the wrong side of a Turtle Soup sweep.'
        ],
        practicalExercise: 'Find 5 instances on a 5-minute chart where price wicked above a swing high and immediately reversed. Document why retail traders who bought the breakout got trapped.'
      },
      {
        id: 'masood-db-17',
        lectureNumber: 17,
        title: 'LEC 17: Master Tape Reading: Learn How to Read Order Flow (ICT MMXM)',
        youtubeId: 'wfj4Cx64GIU',
        playlistType: 'daily_bias',
        shortSummary: 'Decoding Market Maker Models: the Market Maker Buy Model (MMBM) and Market Maker Sell Model (MMSM), tracking the curve from original consolidation to smart money reversal and distribution.',
        keyTakeaways: [
          'The Market Maker Model is the master architectural blueprint of institutional price delivery.',
          'Market Maker Buy Model (MMBM): 1) Original Consolidation, 2) Accumulation / Sell-side curve (lower lows into discount), 3) Smart Money Reversal (SMT / Liquidity Sweep), 4) Buy-side curve / Low Risk Buy, 5) Re-accumulation, 6) Expansion into Original Consolidation.',
          'Market Maker Sell Model (MMSM): The mirror opposite—rallying up to take buy stops, reversing at institutional premium, and dumping back into the original consolidation floor.',
          'Once you identify which side of the curve the market is currently delivering, you know exactly where price must travel.'
        ],
        coreRules: [
          'Identify the Original Consolidation level—this is the final profit target of the entire model.',
          'Enter on the first re-accumulation/redistribution FVG after the Smart Money Reversal has formed.',
          'Do not fight the curve: if the market is on the Buy-Side curve, only take long positions.'
        ],
        tradingChecklist: [
          'Original Consolidation identified on chart?',
          'Has the Smart Money Reversal occurred at a key HTF PD Array?',
          'Is price currently navigating the buy-side or sell-side curve of the model?'
        ],
        commonMistakes: [
          'Trying to pick the exact bottom of the sell-side curve before the Smart Money Reversal confirms.',
          'Exiting too early before price reaches the Original Consolidation target.',
          'Confusing normal consolidation with a full Market Maker Model.'
        ],
        practicalExercise: 'Draw a complete Market Maker Buy Model curve on a blank chart. Label: Original Consolidation, Sell-Side Delivery, Smart Money Reversal, Low Risk Buy, Re-accumulation, and Target Liquidation.',
        animationType: 'mmxm_curve'
      },
      {
        id: 'masood-db-18',
        lectureNumber: 18,
        title: 'LEC 18: Learn How to Predict the Market with 100% Accuracy: Advanced Order Flow Confluence',
        youtubeId: 'OR2VwN3pp9M',
        playlistType: 'daily_bias',
        shortSummary: 'Synthesizing time, price, and institutional order book imbalances into a predictive confluence engine that anticipates upcoming 15-minute and 1-hour candles.',
        keyTakeaways: [
          'Market prediction is the mathematical intersection of **Time** (Macro Windows), **Price** (PD Arrays & Liquidity Pools), and **Narrative** (Daily Bias & Economic Catalyst).',
          'When Time + Price + Narrative achieve 100% unanimous agreement, market direction becomes almost completely deterministic.',
          'Monitor the speed of quotation (pace of tape): rapid displacement through resistance proves institutions are aggressively filling buy orders.'
        ],
        coreRules: [
          'Never execute based on Price alone (e.g. just because price hit an FVG) if Time is incorrect.',
          'Never execute based on Time alone if Price has not reached a valid PD Array.',
          'Only trade when Time, Price, and Narrative align simultaneously.'
        ],
        tradingChecklist: [
          'Is the current time within an active Macro window (09:50-10:10, 10:50-11:10)?',
          'Is price reacting to an unmitigated institutional PD Array?',
          'Does the narrative support the move toward resting liquidity?'
        ],
        commonMistakes: [
          'Taking trades at 11:45 AM just because an FVG formed (violating the Time rule).',
          'Ignoring the Higher Timeframe narrative and trading lower timeframe noise.',
          'Failing to wait for all 3 components of the trinity to align.'
        ],
        practicalExercise: 'Log your next 5 trades against the Trinity Rule: 1) Time, 2) Price, 3) Narrative. Note how trades with all 3 aligned performed compared to trades with only 1 or 2.'
      },
      {
        id: 'masood-db-19',
        lectureNumber: 19,
        title: 'LEC 19: Read the Tape Like Wall Street Traders: Real-Time Order Flow & Tape Reading Discipline',
        youtubeId: '4SfT_Yep23Y',
        playlistType: 'daily_bias',
        shortSummary: 'Wall Street institutional tape reading: decoding candlestick speed, displacement signatures, volume absorption, and recognizing when smart money steps on the gas.',
        keyTakeaways: [
          'Tape reading is the art of evaluating real-time order flow without relying on lagging indicators.',
          'Key tape reading signatures: 1) Candle body expansion (institutions taking control), 2) Wicks instantly absorbed at key PD Arrays, 3) Inability of opposing candles to close past consecutive candle opens.',
          'When reading the tape, watch how the market behaves when it reaches a Fair Value Gap: does it reject instantly in 1 candle, or does it hesitate and grind? Instant rejection proves algorithmic defense.'
        ],
        coreRules: [
          'In a healthy bullish tape, up-close candles have large bodies and small wicks; down-close candles are small, hesitant, and immediately bought up.',
          'If price hits an FVG and prints 3 consecutive indecision candles, the tape is weakening—tighten stop or exit.',
          'Follow the closing prices of candles rather than the high/low wicks.'
        ],
        tradingChecklist: [
          'Are displacement candles expanding with authority?',
          'Is price respecting the 50% Consequent Encroachment of FVGs on the tape?',
          'Are pullbacks shallow and brief?'
        ],
        commonMistakes: [
          'Staring at profit/loss numbers instead of watching the live candlestick order flow tape.',
          'Holding a trade when the tape clearly shows consecutive bearish displacement candles violating support.',
          'Over-analyzing every single tick instead of reading the broader candle delivery pace.'
        ],
        practicalExercise: 'Turn off your PnL display during a live session. Spend 30 minutes reading only the 1-minute tape on US100. Write down observations about candle speed and rejection strength.'
      },
      {
        id: 'masood-db-20',
        lectureNumber: 20,
        title: 'LEC 20: Learn ICT Scout Sniper Precision Trading: 100% Accuracy & Asymmetric Risk:Reward',
        youtubeId: 'dQh0AS7-EFY',
        playlistType: 'daily_bias',
        shortSummary: 'The Scout Sniper protocol: executing with pinpoint accuracy, tight sub-10 point drawdowns, and scaling out at 1:3 to 1:10 asymmetric risk-to-reward ratios.',
        keyTakeaways: [
          'A "Scout Sniper" trader does not spray and pray; they wait patiently in the bushes for hours, identify the one single high-conviction target, and fire one shot with maximum precision.',
          'The Scout Sniper entry: waiting for a 15M sweep, 5M displacement, and placing a limit order at the exact tick of the 1M FVG boundary or 50% Consequent Encroachment.',
          'Risk is kept extremely tight (e.g. 10 to 15 points on US100), while targets are set at the Higher Timeframe Draw on Liquidity (60 to 120 points), delivering 1:5+ R:R.',
          'With a 1:5 R:R model, you only need a 25% win rate to be highly profitable.'
        ],
        coreRules: [
          'Max 1 or 2 high-conviction trades per day—no over-trading.',
          'Stop loss must be placed right behind the invalidation candle (tight, defined risk).',
          'Target must be an objective Higher Timeframe Draw on Liquidity.'
        ],
        tradingChecklist: [
          'Is this setup an A+ Scout Sniper setup meeting all criteria?',
          'Is risk:reward ratio at least 1:3 or higher?',
          'Is stop loss anchored to a structural invalidation point?'
        ],
        commonMistakes: [
          'Taking 10 mediocre "B" and "C" setups instead of waiting for the 1 "A+" setup.',
          'Accepting 1:1 risk-to-reward trades that require an unsustainable 70%+ win rate.',
          'Moving stops further away when the sniper entry thesis has failed.'
        ],
        practicalExercise: 'Review your last 20 trades. Calculate your average Risk-to-Reward ratio. Identify what your profitability would be if you only took setups with a minimum 1:3 R:R.'
      },
      {
        id: 'masood-db-fomc-special',
        lectureNumber: 21,
        title: 'Bonus Masterclass: How I Predicted the FOMC Crash? ICT SMC Live Case Study',
        youtubeId: 'kuSRdXk_6Rs',
        playlistType: 'daily_bias',
        shortSummary: 'Forensic case study breakdown: how Trader Abdullah Masood predicted the historic FOMC market collapse live on stream using pure Smart Money Concepts without indicators.',
        keyTakeaways: [
          'Pre-market setup: US100 was trading into a massive 4H Bearish Order Block and Weekly Fair Value Gap ahead of the 14:00 FOMC announcement.',
          'At 14:00 EST, the rate statement caused a sharp 60-point spike upward, sweeping Asian and London highs into the unmitigated 4H Bearish FVG.',
          'At 14:30 EST, Jerome Powell spoke. Price failed to close above the 4H FVG and printed an energetic 5-minute Market Structure Shift downward.',
          'Short execution triggered at the 5M FVG at the 14:30 press conference open, riding the violent 250-point crash down into the Weekly Sell-Side Liquidity pool.'
        ],
        coreRules: [
          'Never fight a Higher Timeframe Bearish FVG on an FOMC day.',
          'The 14:00 pump was an institutional Judas Swing engineering discount sell-side inventory for institutions.',
          'The real move occurred at 14:30 PM with the press conference.'
        ],
        tradingChecklist: [
          'HTF Bearish PD Array identified before the event?',
          '14:00 fake pump swept liquidity directly into the HTF PD Array?',
          '14:30 5M displacement candle body closed below swing low with FVG?',
          'Short limit order executed targeting HTF Sell-Side Liquidity?'
        ],
        commonMistakes: [
          'Buying the 14:00 fake pump and getting caught holding the bag into the 14:30 collapse.',
          'Believing that "good news" will save an overextended market trading at an HTF Bearish PD Array.',
          'Closing shorts too early out of fear instead of letting the runner hit the Weekly target.'
        ],
        practicalExercise: 'Load the exact FOMC crash day chart on TradingView. Replay the session from 13:55 to 16:00 EST candle by candle. Annotate the exact entry, stop loss, and exit points.'
      }
    ]
  }
];

export const masoodPlaylistsData: MasoodPlaylist[] = [...basePlaylists, ...masoodAdditionalPlaylists];
