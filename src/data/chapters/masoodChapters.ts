import { TextbookChapter } from '../../types';

export const masoodChapters: TextbookChapter[] = [
  // CHAPTER 23: Trader Abdullah Masood
  {
    id: 23,
    slug: 'trader-abdullah-masood-masterclass',
    part: 'Special Mentorship Track - Practical Field Guide',
    title: 'Trader Abdullah Masood: The Gold Legacy & Daily Bias Masterclass',
    quote: 'Trade what you see, not what you think. Daily Bias is not a guess—it is a mechanical sequence of Previous Day High/Low sweeps, Midnight Open benchmarks, and high-timeframe liquidity draws.',
    level: 5,
    summary: [
      'Special masterclass chapter synthesizing the core teachings of Trader Abdullah Masood (@TraderAbdullahMasood).',
      'The 4-Pillar Daily Bias Engine: High-Timeframe DOL, PDH/PDL sweeps, 00:00 NY Midnight Open, and Asian Range boundaries.',
      'The Gold Legacy (XAUUSD): Mastering Gold’s aggressive volatility, 15-30 pip Asian sweeps, and 50% CE FVG precision entries.',
      'Inducement (IDM) mechanics: Why 80% of retail SMC order blocks fail due to entering before internal liquidity is purged.',
      'NASDAQ (NQ) 09:30 AM Opening Bell Execution & SMT Divergence across indices (NQ vs ES vs US30).',
      'Prop firm risk parameters, daily loss limits, and the psychological discipline of high-probability patience.'
    ],
    keyTerms: [
      { term: 'Trader Abdullah Masood', definition: 'Globally recognized trading educator and founder of The Godfather’s Sanctum, renowned for practical live-market execution of ICT/SMC, Gold Legacy, and mechanical Daily Bias.' },
      { term: 'The Gold Legacy', definition: 'The specialized SMC execution methodology for XAUUSD emphasizing Asian range sweeps, aggressive Judas swings, and 50% Consequent Encroachment FVG mitigation.' },
      { term: '4-Pillar Daily Bias', definition: 'Abdullah Masood’s mechanical model combining HTF Draw on Liquidity, PDH/PDL sweeps, the 00:00 NY Midnight Open, and session reference boundaries.' },
      { term: 'Inducement (IDM)', definition: 'The first minor internal pullback designed by the algorithm to induce early retail orders before sweeping into the true institutional Point of Interest (POI).' },
      { term: 'Midnight Open Benchmark', definition: 'The price recorded at 00:00 NY time; serves as the absolute baseline for determining intraday Premium (expensive) vs Discount (cheap).' }
    ],
    practiceQuestions: [
      'Why is buying below the 00:00 NY Midnight Open mathematically advantageous on a bullish daily bias day?',
      'How does Gold (XAUUSD) differ in liquidity sweep characteristics compared to major forex pairs like EUR/USD?',
      'What is an Inducement (IDM) trap, and why should you avoid the first order block created after a structure shift until IDM is taken?',
      'How do you confirm whether a Daily Candle is likely to be an Expansion Day versus a Consolidation Day?',
      'How does SMT Divergence between NQ, ES, and US30 confirm institutional accumulation at the 09:30 AM cash open?'
    ],
    sections: [
      {
        id: '23.1',
        title: '23.1 The 4-Pillar Daily Bias Engine',
        content: `Many aspiring traders struggle with consistency because their directional bias shifts with every 1-minute or 5-minute candle. One green candle makes them bullish; one red candle makes them bearish.

In the teachings of Trader Abdullah Masood, Daily Bias is not an intuition or emotional forecast—it is a mechanical sequence of institutional checkpoints:

Pillar 1: Higher Timeframe Draw on Liquidity (HTF DOL)
Always begin your day on the Daily and 4-Hour charts. Ask: "What is the magnetic target for the interbank algorithm this week?" Is price reaching for an unpurged Previous Week High (Buy-Side Liquidity), an unmitigated Daily Fair Value Gap, or an opposing Order Block? Until this target has been tagged, your higher-timeframe directional bias remains firmly locked.

Pillar 2: Previous Day High (PDH) and Previous Day Low (PDL)
Yesterday’s extreme high and low contain the highest concentration of resting retail stop orders. A classic institutional expansion day follows a predictable choreography:
- Bullish Day: Early in the London (02:00-05:00 EST) or New York session, price dips downward, sweeps the Previous Day Low (PDL) to harvest sell stops, forms a sharp displacement reversal, and then accelerates upward to target the Previous Day High (PDH).
- Bearish Day: Price rallies early to sweep the Previous Day High (PDH), traps breakout buyers, and plunges downward toward the Previous Day Low (PDL).

Pillar 3: The 00:00 NY Midnight Open Benchmark
The Midnight Open is the true institutional line in the sand:
- On a Bullish Day: You hunt for buy setups strictly when price trades BELOW the Midnight Open (buying in algorithmic Discount).
- On a Bearish Day: You hunt for sell setups strictly when price trades ABOVE the Midnight Open (selling in algorithmic Premium).

Pillar 4: Asian Range Boundary Mapping (20:00 - 00:00 EST)
The Asian session consolidates to engineer resting liquidity on both sides of the market. The London Open (02:00-05:00 EST) routinely triggers an aggressive Judas Swing that sweeps one side of the Asian Range before reversing to deliver the true daily expansion.`,
        keyTakeaway: 'Daily Bias is mechanical: Align HTF Draw on Liquidity, watch PDH/PDL sweeps, execute below Midnight Open for longs or above it for shorts, and exploit Asian Range manipulation.'
      },
      {
        id: '23.2',
        title: '23.2 The Gold Legacy: XAUUSD Precision SMC',
        content: `Gold (XAUUSD) is one of the most profitable, highly liquid, and aggressive instruments in global finance. As taught in The Gold Legacy Mentorship by Abdullah Masood, Gold requires specialized tape-reading rules:

1. Deeper Asian Range Sweeps:
Unlike EUR/USD or GBP/USD which may respect tight session ranges, Gold’s high volatility means the algorithm routinely sweeps both the Asian High and Asian Low by 15 to 30 pips ($1.50 to $3.00) before initiating genuine macro delivery. Never place tight stops directly at the Asian boundaries in Gold.

2. The London Judas Swing:
Between 02:00 AM and 04:00 AM EST (London Killzone), expect an aggressive, multi-candle spike in the opposite direction of the daily bias. Wait for this sweep to interact with a 15-minute or 1-hour Fair Value Gap before seeking execution.

3. The 50% Consequent Encroachment Precision Rule:
When Gold displaces and prints a clean 5-minute or 15-minute Fair Value Gap, entering at the 50% Consequent Encroachment (CE) offers the tightest invalidation and an exceptional Reward-to-Risk ratio (frequently 1:4 to 1:8).

4. High-Impact News Delivery (CPI, FOMC, NFP):
Gold is hyper-sensitive to US interest rate expectations and inflation prints. Never gamble ahead of high-impact releases. Wait for the initial 15-minute liquidity injection to sweep both sides of the market, identify the resulting Market Structure Shift and FVG, and execute on the retest.`,
        keyTakeaway: 'In Gold (XAUUSD), anticipate deep 15-30 pip sweeps of session boundaries, avoid trading during news releases, and execute at the 50% Consequent Encroachment of displacement FVGs.'
      },
      {
        id: '23.3',
        title: '23.3 Inducement (IDM) vs. Genuine Structural POIs',
        content: `The single biggest reason retail Smart Money Concepts traders suffer consistent losses is failing to understand Inducement (IDM).

What is Inducement?
When a market structure shift occurs, price begins an impulsive expansion wave. Along the way, it forms minor internal pullbacks. Retail traders rush to mark the very first internal Order Block or Fair Value Gap they see, declaring: "This is my POI! I will place my limit order here!"

What does the institutional algorithm do?
The algorithm deliberately paints that first order block to induce early retail traders into taking positions!
Once retail traders place their buy orders and cluster their stop losses directly underneath that first block, the algorithm drives price right through it!

The Golden Inducement Rules:
1. Never buy at the first internal Order Block: That block is an inducement trap.
2. Wait for the Inducement Low (IDM) to be swept: The minor internal pullback low must be purged by price.
3. Locate the Decisional FVG or Extreme Order Block: Only after the Inducement Low is swept should you look for your entry at the Extreme Order Block (the origin of the move) or the deep Decisional FVG located in true Discount territory.`,
        keyTakeaway: 'The first order block after a structure shift is an Inducement trap. Wait for the internal Inducement low to be swept before entering at the Extreme POI.'
      },
      {
        id: '23.4',
        title: '23.4 NASDAQ (NQ) 09:30 AM Bell & SMT Across Indices',
        content: `In his live intraday sessions, Abdullah Masood demonstrates precision tape reading on the Nasdaq 100 (NQ) and S&P 500 (ES) at the 09:30 AM New York opening bell:

1. Pre-Market Range Marking:
Between 08:30 and 09:30 AM EST, mark the Pre-Market High and Low.
Identify where the overnight liquidity rests.

2. The 09:30 Open Sweep:
At the 09:30 open, NQ will frequently spike aggressively to raid the Pre-Market High or Low.
Do not chase the spike. Instead, open a split screen comparing NQ, ES, and US30.

3. SMT Divergence Confirmation:
If ES sweeps its low to print a Lower Low, while NQ holds above its low printing a Higher Low, an institutional SMT Divergence is confirmed! Smart money is aggressively accumulating tech equities.
Wait for the 1-minute or 5-minute Market Structure Shift on NQ, enter on the First Presented FVG, and target the Pre-Market High with complete mechanical confidence.`,
        keyTakeaway: 'At the 09:30 AM open, compare NQ, ES, and US30 on a split screen. SMT Divergence at the sweep of the pre-market range reveals immediate institutional intent.'
      }
    ]
  }
];
