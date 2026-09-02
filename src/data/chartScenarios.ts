import { ChartScenario } from '../types';

export const chartScenarios: ChartScenario[] = [
  {
    id: 'btc_2022_bullish_model',
    title: 'BTC/USDT: 2022 Model Execution After Asian Low Sweep',
    asset: 'BTC/USDT',
    timeframe: '5M',
    htfContext: 'Daily Trend: Bullish | Higher Timeframe Location: Daily Discount (below 50% EQ) | Target: Previous Day High ($102,400)',
    description: 'Clean textbook demonstration of the ICT 2022 Mentorship Model on BTC/USDT. Asian session consolidates, London executes Judas Swing below Asian Low into PDL, NY confirms bullish MSS with displacement, and price mitigates 5M FVG before launching to PDH.',
    candles: [
      // Asian Session Consolidation (Candles 0-9)
      { time: '00:00', open: 100050, high: 100200, low: 99980, close: 100120, session: 'Asia' },
      { time: '00:30', open: 100120, high: 100250, low: 100050, close: 100180, session: 'Asia' },
      { time: '01:00', open: 100180, high: 100220, low: 99950, close: 100020, session: 'Asia' },
      { time: '01:30', open: 100020, high: 100150, low: 99900, close: 99960, session: 'Asia' },
      { time: '02:00', open: 99960, high: 100100, low: 99920, close: 100080, session: 'Asia' },
      { time: '02:30', open: 100080, high: 100280, low: 100020, close: 100240, session: 'Asia' },
      { time: '03:00', open: 100240, high: 100300, low: 100100, close: 100150, session: 'Asia' },
      { time: '03:30', open: 100150, high: 100200, low: 99850, close: 99900, session: 'Asia' },
      { time: '04:00', open: 99900, high: 100050, low: 99800, close: 99850, session: 'Asia' },
      { time: '04:30', open: 99850, high: 100000, low: 99750, close: 99820, session: 'Asia' },

      // London Session - Judas Swing / Liquidity Raid (Candles 10-14)
      { time: '05:00', open: 99820, high: 99950, low: 99600, close: 99650, session: 'London' },
      { time: '05:30', open: 99650, high: 99700, low: 99350, close: 99400, session: 'London' }, // Sweeps Asian Low & PDL
      { time: '06:00', open: 99400, high: 99480, low: 99200, close: 99280, session: 'London' }, // Final opposing down candle (OB)
      { time: '06:30', open: 99280, high: 99650, low: 99250, close: 99600, session: 'London' }, // Strong bullish reversal wick
      { time: '07:00', open: 99600, high: 99850, low: 99550, close: 99800, session: 'London' },

      // New York AM - Displacement & MSS (Candles 15-18)
      { time: '07:30', open: 99800, high: 100150, low: 99750, close: 100100, session: 'New York AM' }, // Candle 1 of FVG
      { time: '08:00', open: 100100, high: 100950, low: 100080, close: 100900, session: 'New York AM' }, // Massive Displacement (Candle 2)
      { time: '08:30', open: 100900, high: 101350, low: 100550, close: 101250, session: 'New York AM' }, // Candle 3 - Breaks swing high (MSS) & leaves FVG between 100150 and 100550!
      { time: '09:00', open: 101250, high: 101400, low: 101100, close: 101150, session: 'New York AM' },

      // Retracement / Mitigation into FVG (Candles 19-21)
      { time: '09:30', open: 101150, high: 101200, low: 100650, close: 100700, session: 'New York AM' }, // 9:30 Equities Open Pullback
      { time: '10:00', open: 100700, high: 100750, low: 100350, close: 100450, session: 'New York AM' }, // Deep retracement into FVG / 50% CE ($100,350) -> ENTRY ZONE!
      { time: '10:30', open: 100450, high: 100950, low: 100380, close: 100900, session: 'New York AM' }, // Sharp rejection from FVG

      // True Distribution toward BSL Target (Candles 22-26)
      { time: '11:00', open: 100900, high: 101600, low: 100850, close: 101550, session: 'New York AM' },
      { time: '11:30', open: 101550, high: 102100, low: 101450, close: 102050, session: 'New York AM' },
      { time: '12:00', open: 102050, high: 102550, low: 101950, close: 102450, session: 'London Close' }, // BSL & PDH Smashed at $102,400!
      { time: '12:30', open: 102450, high: 102600, low: 102200, close: 102350, session: 'New York PM' },
      { time: '13:00', open: 102350, high: 102500, low: 102150, close: 102400, session: 'New York PM' }
    ],
    annotations: [
      {
        id: 'ann-asia-range',
        type: 'EQ',
        label: 'Asian Range ($99,750 - $100,300)',
        priceTop: 100300,
        priceBottom: 99750,
        candleIndexStart: 0,
        candleIndexEnd: 9,
        description: 'Asian session consolidation establishing initial intraday liquidity boundaries.'
      },
      {
        id: 'ann-ssl-sweep',
        type: 'SWEEP',
        label: 'SSL Raid / Judas Swing ($99,200)',
        priceLevel: 99200,
        candleIndexStart: 11,
        candleIndexEnd: 13,
        description: 'London Open drives below Asian Low and Previous Day Low, collecting sell stops into Daily Discount.',
        isBullish: true
      },
      {
        id: 'ann-bullish-ob',
        type: 'OB',
        label: 'Bullish Order Block ($99,200 - $99,480)',
        priceTop: 99480,
        priceBottom: 99200,
        candleIndexStart: 12,
        candleIndexEnd: 12,
        description: 'The final bearish candle before explosive upward displacement.',
        isBullish: true
      },
      {
        id: 'ann-mss',
        type: 'MSS',
        label: 'Bullish MSS ($100,300 Broken)',
        priceLevel: 100300,
        candleIndexStart: 16,
        candleIndexEnd: 17,
        description: 'Strong displacement candle closes decisively above Asian High / intermediate swing peak.',
        isBullish: true
      },
      {
        id: 'ann-fvg',
        type: 'FVG',
        label: '5M Bullish FVG ($100,150 - $100,550 | CE: $100,350)',
        priceTop: 100550,
        priceBottom: 100150,
        candleIndexStart: 15,
        candleIndexEnd: 17,
        description: '3-candle price imbalance created by displacement. Consequent Encroachment (50%) sits at $100,350.',
        isBullish: true
      },
      {
        id: 'ann-entry',
        type: 'OTE',
        label: 'Optimal Entry ($100,350 - $100,450)',
        priceLevel: 100350,
        candleIndexStart: 20,
        candleIndexEnd: 20,
        description: 'Price retraces into FVG CE at 10:00 AM NY Silver Bullet hour. Stop at $99,150, Target PDH $102,400 (3.2R).',
        isBullish: true
      },
      {
        id: 'ann-target-bsl',
        type: 'BSL',
        label: 'Target: PDH & External BSL ($102,400)',
        priceLevel: 102400,
        candleIndexStart: 24,
        candleIndexEnd: 25,
        description: 'Target reached during London Close expansion with full take profit execution.',
        isBullish: true
      }
    ],
    replaySteps: [
      {
        candleIndex: 9,
        title: 'Phase 1: Accumulation (Asian Range)',
        narrative: 'Asian session has completed between $99,750 and $100,300. As a trader, you mark Asian High as Buy Side Liquidity (BSL) and Asian Low / PDL as Sell Side Liquidity (SSL). You do not trade inside this chop.',
        activeLayers: ['EQ'],
        question: {
          prompt: 'Given the Daily Bullish bias and price sitting below Daily Open, what is the expected next phase according to Power of Three?',
          options: [
            'Instantly buy at market inside Asian range',
            'Wait for a manipulation move (Judas Swing) below Asian Low / PDL into Discount',
            'Place a breakout buy order above Asian High',
            'Short because price broke down during Asia'
          ],
          correctIndex: 1,
          explanation: 'In a bullish Daily profile, the ideal PO3 sequence is Accumulation -> Manipulation below Open / Asian Low into Discount -> Bullish Distribution.'
        }
      },
      {
        candleIndex: 13,
        title: 'Phase 2: Manipulation (London Judas Raid)',
        narrative: 'London opens and drives price down to $99,200, cleanly sweeping both Asian Low and Previous Day Low. Price has reached Deep Discount. Do you buy immediately? No! A sweep is an event, not an entry trigger. We need displacement proof.',
        activeLayers: ['EQ', 'SWEEP', 'OB'],
        question: {
          prompt: 'What must happen next on the 5-minute chart to prove that this sweep was institutional manipulation rather than a genuine trend breakdown?',
          options: [
            'Wait for an indicator crossover',
            'Wait for aggressive bullish displacement that breaks structure (MSS) and leaves an FVG',
            'Buy immediately with a 10-pip stop',
            'Short because the Previous Day Low broke'
          ],
          correctIndex: 1,
          explanation: 'Displacement with an MSS confirms that aggressive buyers have taken control and validates the sweep as a manipulation event.'
        }
      },
      {
        candleIndex: 17,
        title: 'Phase 3: Confirmation (Displacement & MSS)',
        narrative: 'New York session enters with violent $1,500 green candles. Price smashes above the Asian High at $100,300 (MSS) and leaves behind a pristine 5M Fair Value Gap between $100,150 and $100,550 with 50% Consequent Encroachment at $100,350.',
        activeLayers: ['EQ', 'SWEEP', 'OB', 'MSS', 'FVG'],
        question: {
          prompt: 'Where should your limit order, stop loss, and target be placed for this 2022 setup?',
          options: [
            'Buy market at $101,250, stop at $101,000, target 100 points',
            'Limit inside FVG / CE at $100,350, Stop below sweep low ($99,150), Target PDH ($102,400)',
            'Short the FVG because price is too high',
            'Wait for price to reach $102,400 before buying'
          ],
          correctIndex: 1,
          explanation: 'The ICT 2022 rules dictate entering on the retracement into the FVG (or 50% CE) with structural invalidation below the sweep low and targeting opposing liquidity.'
        }
      },
      {
        candleIndex: 20,
        title: 'Phase 4: Execution (FVG Mitigation at 10:00 AM)',
        narrative: 'At the 10:00 AM Silver Bullet window, price retraces into the FVG, tests the 50% Consequent Encroachment level at $100,350, and prints a 1M rejection wick. Your long position is filled with pristine precision.',
        activeLayers: ['EQ', 'SWEEP', 'OB', 'MSS', 'FVG', 'OTE'],
        question: {
          prompt: 'What would invalidate this trade thesis after entry?',
          options: [
            'Price spending 5 minutes inside the FVG',
            'Price closing candles below the sweep low ($99,200)',
            'Price failing to rally within 60 seconds',
            'The 1-minute chart showing a small red candle'
          ],
          correctIndex: 1,
          explanation: 'A structural stop loss placed beyond the liquidity sweep low represents the true thesis invalidation point.'
        }
      },
      {
        candleIndex: 25,
        title: 'Phase 5: Distribution (Target BSL & PDH Smashed)',
        narrative: 'Price launches relentlessly into London Close, sweeping Previous Day High and external Buy Side Liquidity at $102,400. Full Take Profit hit for +3.2R. The complete narrative (Context -> Liquidity -> Sweep -> Displacement -> MSS -> FVG -> Entry -> Target) was fulfilled.',
        activeLayers: ['EQ', 'SWEEP', 'OB', 'MSS', 'FVG', 'OTE', 'BSL']
      }
    ]
  },
  {
    id: 'nq_silver_bullet_short',
    title: 'NQ Futures: 10:00 AM Silver Bullet Short',
    asset: 'NQ1! Futures',
    timeframe: '1M',
    htfContext: 'Daily Trend: Bearish | HTF Location: 4H Bearish FVG Premium | Draw on Liquidity: 10:00 AM Low & PDL',
    description: 'Classic algorithmic Silver Bullet execution during the 10:00 AM - 11:00 AM New York window on NASDAQ Futures. Price raids morning BSL into HTF resistance, displaces lower, forms 1M FVG, and delivers 30 points to the morning low.',
    candles: [
      { time: '09:45', open: 21100, high: 21125, low: 21090, close: 21120, session: 'New York AM' },
      { time: '09:50', open: 21120, high: 21140, low: 21110, close: 21135, session: 'New York AM' },
      { time: '09:55', open: 21135, high: 21155, low: 21130, close: 21150, session: 'New York AM' },
      { time: '10:00', open: 21150, high: 21185, low: 21145, close: 21180, session: 'New York AM' }, // 10:00 AM News Sweep into 4H FVG
      { time: '10:03', open: 21180, high: 21190, low: 21160, close: 21165, session: 'New York AM' }, // Rejection
      { time: '10:06', open: 21165, high: 21170, low: 21115, close: 21120, session: 'New York AM' }, // Displacement Down (Candle 2)
      { time: '10:09', open: 21120, high: 21130, low: 21080, close: 21085, session: 'New York AM' }, // 1M MSS - Leaves FVG at 21130-21160
      { time: '10:12', open: 21085, high: 21145, low: 21080, close: 21140, session: 'New York AM' }, // Retracement into FVG -> SHORT ENTRY
      { time: '10:15', open: 21140, high: 21145, low: 21070, close: 21075, session: 'New York AM' }, // Rejection
      { time: '10:18', open: 21075, high: 21080, low: 21030, close: 21035, session: 'New York AM' }, // Target Reached
      { time: '10:21', open: 21035, high: 21050, low: 21020, close: 21030, session: 'New York AM' }
    ],
    annotations: [
      {
        id: 'nq-bsl-sweep',
        type: 'SWEEP',
        label: '10:00 AM BSL Sweep (21,190)',
        priceLevel: 21190,
        candleIndexStart: 3,
        candleIndexEnd: 4,
        description: '10:00 AM macro window sweeps morning highs directly into 4H Bearish FVG.'
      },
      {
        id: 'nq-mss',
        type: 'MSS',
        label: '1M Bearish MSS (21,130 Broken)',
        priceLevel: 21130,
        candleIndexStart: 5,
        candleIndexEnd: 6,
        description: 'Aggressive selling closes below protected 1M low with large real bodies.'
      },
      {
        id: 'nq-fvg',
        type: 'FVG',
        label: '1M Bearish FVG (21,130 - 21,160)',
        priceTop: 21160,
        priceBottom: 21130,
        candleIndexStart: 5,
        candleIndexEnd: 7,
        description: 'Silver Bullet entry imbalance.'
      },
      {
        id: 'nq-target',
        type: 'SSL',
        label: 'Target: Morning Low SSL (21,030)',
        priceLevel: 21030,
        candleIndexStart: 9,
        candleIndexEnd: 10,
        description: '+30 handles captured in 15 minutes.'
      }
    ],
    replaySteps: [
      {
        candleIndex: 4,
        title: 'Step 1: The 10:00 AM Liquidity Sweep',
        narrative: 'At 10:00 AM New York time, NQ shoots up to 21,190, sweeping the pre-market highs and tapping into higher timeframe 4H resistance.',
        activeLayers: ['SWEEP']
      },
      {
        candleIndex: 6,
        title: 'Step 2: Displacement & 1M MSS',
        narrative: 'A violent 65-point red candle smashes through 21,130, shifting market structure bearish and leaving an open 1M Fair Value Gap.',
        activeLayers: ['SWEEP', 'MSS', 'FVG']
      },
      {
        candleIndex: 7,
        title: 'Step 3: Silver Bullet Retracement & Entry',
        narrative: 'Price retraces to 21,145 inside the FVG. Limit short executed. Stop at 21,195 (above sweep high), Target 21,030.',
        activeLayers: ['SWEEP', 'MSS', 'FVG']
      },
      {
        candleIndex: 9,
        title: 'Step 4: Swift Delivery to SSL',
        narrative: 'NQ collapses directly into the morning low SSL at 21,030. Perfect 3.5R Silver Bullet execution.',
        activeLayers: ['SWEEP', 'MSS', 'FVG', 'SSL']
      }
    ]
  },
  {
    id: 'eurusd_failed_ob_breaker',
    title: 'EUR/USD: Failed Bullish OB Transformed Into Bearish Breaker',
    asset: 'EUR/USD',
    timeframe: '15M',
    htfContext: 'Weekly Bias: Bearish | Daily Structure: Approaching Weekly Resistance | Target: Previous Week Low (1.0720)',
    description: 'Demonstrating the transformation of a failed Order Block into a high-probability Bearish Breaker. Buyers step in at support, rally to sweep BSL, but get trapped as price collapses through the OB.',
    candles: [
      { time: '08:00', open: 1.0820, high: 1.0835, low: 1.0815, close: 1.0830, session: 'London' },
      { time: '08:15', open: 1.0830, high: 1.0832, low: 1.0810, close: 1.0812, session: 'London' }, // Bullish OB origin candle
      { time: '08:30', open: 1.0812, high: 1.0865, low: 1.0810, close: 1.0860, session: 'London' }, // Rally to sweep BSL
      { time: '08:45', open: 1.0860, high: 1.0872, low: 1.0850, close: 1.0855, session: 'London' }, // Peak sweep at 1.0872
      { time: '09:00', open: 1.0855, high: 1.0858, low: 1.0805, close: 1.0808, session: 'London' }, // Smashes through Bullish OB!
      { time: '09:15', open: 1.0808, high: 1.0810, low: 1.0775, close: 1.0780, session: 'London' }, // Acceptance below -> OB becomes Breaker!
      { time: '09:30', open: 1.0780, high: 1.0818, low: 1.0778, close: 1.0815, session: 'New York AM' }, // Retracement into Breaker Block
      { time: '09:45', open: 1.0815, high: 1.0820, low: 1.0760, close: 1.0765, session: 'New York AM' }, // Violent rejection
      { time: '10:00', open: 1.0765, high: 1.0770, low: 1.0720, close: 1.0725, session: 'New York AM' }  // Target SSL hit!
    ],
    annotations: [
      {
        id: 'eur-ob-orig',
        type: 'OB',
        label: 'Original Bullish OB (1.0810 - 1.0832)',
        priceTop: 1.0832,
        priceBottom: 1.0810,
        candleIndexStart: 1,
        candleIndexEnd: 1,
        description: 'The last down-candle before the rally that swept BSL.'
      },
      {
        id: 'eur-bsl-sweep',
        type: 'SWEEP',
        label: 'BSL Sweep (1.0872)',
        priceLevel: 1.0872,
        candleIndexStart: 3,
        candleIndexEnd: 3,
        description: 'Price raids BSL at 1.0872 before institutional selling overwhelms the market.'
      },
      {
        id: 'eur-breaker',
        type: 'BREAKER',
        label: 'Bearish Breaker Block (1.0810 - 1.0832)',
        priceTop: 1.0832,
        priceBottom: 1.0810,
        candleIndexStart: 4,
        candleIndexEnd: 6,
        description: 'The failed Bullish OB now acts as powerful Bearish Resistance upon retest.'
      },
      {
        id: 'eur-ssl-target',
        type: 'SSL',
        label: 'Target: Sell Side Liquidity (1.0720)',
        priceLevel: 1.0720,
        candleIndexStart: 7,
        candleIndexEnd: 8,
        description: 'Target reached for +4.2R.'
      }
    ],
    replaySteps: [
      {
        candleIndex: 2,
        title: 'Step 1: The Bullish Order Block forms',
        narrative: 'Price forms a down candle at 1.0810 and rallies 50 pips, sweeping BSL. Retail traders consider 1.0810 solid support.',
        activeLayers: ['OB']
      },
      {
        candleIndex: 4,
        title: 'Step 2: The Order Block Fails Decisively',
        narrative: 'Instead of bouncing at 1.0810, a huge red displacement candle smashes straight through it and closes at 1.0808. Buyers who bought the OB are now trapped.',
        activeLayers: ['OB', 'SWEEP', 'BREAKER']
      },
      {
        candleIndex: 6,
        title: 'Step 3: Retest of the Bearish Breaker',
        narrative: 'Price retraces to 1.0815, testing the Breaker Block. Trapped buyers dump at breakeven while new institutional shorts enter. Short entry taken.',
        activeLayers: ['BREAKER']
      },
      {
        candleIndex: 8,
        title: 'Step 4: Expansion to Sell Side Liquidity',
        narrative: 'Price accelerates downward to 1.0720, reaching external Sell Side Liquidity.',
        activeLayers: ['BREAKER', 'SSL']
      }
    ]
  },
  {
    id: 'xauusd_gold_legacy_model',
    title: 'XAUUSD (Gold): The Gold Legacy Session Sweep & 50% FVG Invalidation Model',
    asset: 'XAUUSD (Gold)',
    timeframe: '5M',
    htfContext: 'Daily Bias: Bullish | Higher Timeframe Draw: Previous Day High ($2,385.00) | Benchmark: 00:00 NY Midnight Open ($2,350.00)',
    description: 'Textbook execution of Trader Abdullah Masood\'s Gold Legacy Model on XAUUSD. Asian session establishes range, London Judas Swing executes a violent 25-pip stop-run below Asian Low and PDL, followed by rapid 5M displacement, MSS, and a limit entry at the 50% Consequent Encroachment of the FVG.',
    candles: [
      // Asian Session Consolidation (Candles 0-7)
      { time: '00:00', open: 2350.0, high: 2354.0, low: 2348.0, close: 2352.0, session: 'Asia' },
      { time: '00:30', open: 2352.0, high: 2356.5, low: 2350.5, close: 2355.0, session: 'Asia' },
      { time: '01:00', open: 2355.0, high: 2358.0, low: 2351.0, close: 2353.0, session: 'Asia' },
      { time: '01:30', open: 2353.0, high: 2355.0, low: 2349.0, close: 2350.5, session: 'Asia' },
      { time: '02:00', open: 2350.5, high: 2354.0, low: 2347.5, close: 2349.0, session: 'Asia' },
      { time: '02:30', open: 2349.0, high: 2352.0, low: 2346.0, close: 2348.0, session: 'Asia' },
      { time: '03:00', open: 2348.0, high: 2350.0, low: 2344.0, close: 2345.5, session: 'Asia' },
      { time: '03:30', open: 2345.5, high: 2347.0, low: 2342.0, close: 2343.0, session: 'Asia' },

      // London Killzone - Judas Sweep of Asian Low & PDL (Candles 8-11)
      { time: '04:00', open: 2343.0, high: 2344.5, low: 2338.0, close: 2339.5, session: 'London' }, // Sweeps Asian Low ($2342)
      { time: '04:30', open: 2339.5, high: 2340.5, low: 2334.0, close: 2336.0, session: 'London' }, // Deep Raid into PDL ($2335)
      { time: '05:00', open: 2336.0, high: 2337.0, low: 2331.5, close: 2333.0, session: 'London' }, // Final Institutional Down-Candle (OB)
      { time: '05:30', open: 2333.0, high: 2342.0, low: 2332.0, close: 2341.0, session: 'London' }, // Massive Rejection Wick

      // Displacement & MSS (Candles 12-14)
      { time: '06:00', open: 2341.0, high: 2349.0, low: 2340.5, close: 2348.5, session: 'London' }, // Candle 1 of FVG
      { time: '06:30', open: 2348.5, high: 2362.0, low: 2348.0, close: 2360.5, session: 'London' }, // Energetic Displacement (Candle 2)
      { time: '07:00', open: 2360.5, high: 2368.0, low: 2356.5, close: 2366.0, session: 'London' }, // Candle 3 breaks swing high (MSS) -> FVG between 2349.0 & 2356.5!

      // Retracement & Mitigation (Candles 15-17)
      { time: '07:30', open: 2366.0, high: 2367.0, low: 2358.0, close: 2359.0, session: 'New York AM' },
      { time: '08:00', open: 2359.0, high: 2360.0, low: 2352.5, close: 2353.0, session: 'New York AM' }, // Pullback into 50% CE ($2352.75) -> Limit Entry Triggered!
      { time: '08:30', open: 2353.0, high: 2364.0, low: 2352.0, close: 2363.0, session: 'New York AM' }, // 08:30 USD News Surge

      // True Directional Expansion (Candles 18-22)
      { time: '09:00', open: 2363.0, high: 2372.0, low: 2362.0, close: 2371.0, session: 'New York AM' },
      { time: '09:30', open: 2371.0, high: 2378.0, low: 2369.5, close: 2377.0, session: 'New York AM' },
      { time: '10:00', open: 2377.0, high: 2383.5, low: 2375.0, close: 2382.0, session: 'New York AM' },
      { time: '10:30', open: 2382.0, high: 2388.0, low: 2380.0, close: 2386.5, session: 'New York AM' }, // Smashes PDH & Target at $2,385.00!
      { time: '11:00', open: 2386.5, high: 2390.0, low: 2384.0, close: 2388.0, session: 'New York AM' }
    ],
    annotations: [
      {
        id: 'gold-asia-range',
        type: 'EQ',
        label: 'Asian Range ($2,342.00 - $2,358.00)',
        priceTop: 2358.0,
        priceBottom: 2342.0,
        candleIndexStart: 0,
        candleIndexEnd: 7,
        description: 'Asian consolidation establishing the high and low boundaries for the London Judas Swing.'
      },
      {
        id: 'gold-judas-sweep',
        type: 'SWEEP',
        label: 'Judas Sweep: Asian Low & PDL ($2,331.50)',
        priceLevel: 2331.5,
        candleIndexStart: 8,
        candleIndexEnd: 11,
        description: 'London sweeps 10.5 points below the Asian Low, purging retail stops into institutional buy limits.'
      },
      {
        id: 'gold-mss',
        type: 'MSS',
        label: 'Market Structure Shift (MSS)',
        priceLevel: 2354.0,
        candleIndexStart: 13,
        candleIndexEnd: 14,
        description: 'Full candle body closure above the previous 15M swing high confirming institutional buying sponsorship.'
      },
      {
        id: 'gold-fvg',
        type: 'FVG',
        label: 'Gold 5M Bullish FVG ($2,349.00 - $2,356.50)',
        priceTop: 2356.5,
        priceBottom: 2349.0,
        candleIndexStart: 12,
        candleIndexEnd: 14,
        description: 'Pristine 3-candle imbalance left by aggressive displacement. 50% Consequent Encroachment sits at $2,352.75.',
        isBullish: true
      },
      {
        id: 'gold-target-pdh',
        type: 'BSL',
        label: 'Terminal Target: Previous Day High ($2,385.00)',
        priceLevel: 2385.0,
        candleIndexStart: 20,
        candleIndexEnd: 21,
        description: 'Draw on Liquidity successfully delivered for a massive +5.2R setup.'
      }
    ],
    replaySteps: [
      {
        candleIndex: 7,
        title: 'Stage 1: Asian Session Range Defined',
        narrative: 'Gold consolidates between $2,342 and $2,358 during the Asian session. With our 4-Pillar Daily Bias established as Bullish, we expect a London Judas sweep below the Asian Low.',
        activeLayers: ['EQ']
      },
      {
        candleIndex: 11,
        title: 'Stage 2: The London Judas Sweep Raid',
        narrative: 'At 04:30 - 05:00 London time, price aggressively dives to $2,331.50, sweeping the Asian Low and the Previous Day Low (PDL). Notice the heavy rejection wick.',
        activeLayers: ['EQ', 'SWEEP']
      },
      {
        candleIndex: 14,
        title: 'Stage 3: Bullish Displacement & FVG Creation',
        narrative: 'A series of massive green candle bodies explode upward, shifting market structure (MSS) above $2,354.00 and printing a clean 5M Fair Value Gap between $2,349.00 and $2,356.50.',
        activeLayers: ['MSS', 'FVG']
      },
      {
        candleIndex: 17,
        title: 'Stage 4: 50% Consequent Encroachment Limit Entry',
        narrative: 'Price pulls back into the 5M FVG, tapping the 50% midpoint ($2,352.75) precisely. Limit long order fills with stop placed below the sweep low at $2,330.00.',
        activeLayers: ['FVG']
      },
      {
        candleIndex: 21,
        title: 'Stage 5: Terminal Target (PDH) Smashed',
        narrative: 'Gold accelerates through the New York session, blasting through the 00:00 Midnight Open and smashing the Previous Day High ($2,385.00) for an extraordinary +5.2R gain.',
        activeLayers: ['BSL']
      }
    ]
  }
];
