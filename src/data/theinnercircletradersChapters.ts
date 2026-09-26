import { TextbookChapter } from '../types';

export const theinnercircletradersNewChapters: TextbookChapter[] = [
  // CHAPTER 53: The ICT Venom Model
  {
    id: 53,
    slug: 'the-ict-venom-model-five-stage-delivery',
    title: 'The ICT Venom Model — 2025/2026 Five-Stage Institutional Delivery Framework',
    part: 'Part XIII - Advanced 2025/2026 Institutional Delivery Systems & Tape Reading',
    level: 3,
    quote: 'The Venom Model does not give price a second chance. It waits for the exact intersection of higher timeframe MMXM alignment, pre-session Reference Candle boundary manipulation, intermarket SMT divergence, and immediate First Presented FVG displacement.',
    summary: [
      'The multi-factor filter chain: Why isolated single-trigger entries fail in modern algorithmic markets.',
      'Stage 1 (MMXM) & Stage 2 (CRT): Anchoring execution to Market Maker models and session Reference Candles.',
      'Stage 3 (SMT Divergence at Extreme): Validating that the manipulation sweep is an authentic trap.',
      'Stage 4 (CISD & First Presented FVG): Executing strictly on the first imbalance to achieve maximum R:R and minimum drawdown.'
    ],
    keyTerms: [
      { term: 'Venom Model', definition: 'A five-stage institutional confluence framework combining HTF MMXM, CRT reference boundaries, intermarket SMT, CISD, and First Presented FVG execution.' },
      { term: 'Reference Candle Boundary', definition: 'The established high or low of the designated pre-session candle (Asian Range for London, London Range for NY) that the algorithm manipulates.' },
      { term: 'First Presented FVG', definition: 'The very first three-candle price imbalance printed during the initial displacement wave; provides the highest probability and lowest drawdown entry.' }
    ],
    practiceQuestions: [
      'Why is SMT divergence mandatory at the CRT Reference Candle extreme in the Venom Model?',
      'How does entering on the First Presented FVG prevent the trader from chasing price into low-probability secondary pullbacks?',
      'In a Bullish Venom setup, what serves as the primary and ultimate take-profit targets?'
    ],
    sections: [
      {
        id: 'sec-53-1',
        title: 'Deconstructing the Five-Stage Institutional Confluence',
        content: `In 2025 and 2026, retail smart money concepts (SMC) became widely publicized, leading algorithmic market makers to introduce deeper multi-layered manipulation before releasing directional trends. The Venom Model was developed by advanced ICT tape readers as a rigorous filter chain that eliminates false breakouts.

The model is built upon five non-negotiable stages:
1. **Stage 1 — Higher Timeframe MMXM Phase**: Establish whether the market is currently in an accumulation, manipulation, or distribution phase of a Market Maker Buy Model (MMBM) or Market Maker Sell Model (MMSM).
2. **Stage 2 — CRT Reference Candle Mapping**: Identify the session-specific Reference Candle and mark its high and low boundaries with horizontal rays.
3. **Stage 3 — SMT Divergence at Boundary Extreme**: As price sweeps the boundary, confirm non-confirmation with a correlated asset (e.g., NQ sweeps while ES fails).
4. **Stage 4 — CISD & First Presented FVG**: Wait for a 1-minute or 5-minute candle body close through the anchor open (CISD), and outline the First Presented FVG.
5. **Stage 5 — Execution and Delivery**: Enter at Consequent Encroachment (50%) of the FVG, placing stops outside the manipulation wick and targeting the opposing Reference Candle extreme.`,
        keyTakeaway: 'Never enter on an FVG alone; wait for the complete 5-stage chain to align before risking capital.'
      },
      {
        id: 'sec-53-2',
        title: 'Tape Reading the Venom Strike in Real-Time',
        content: `The power of the Venom Model lies in its timing. When SMT divergence forms at the sweep of a Reference Candle, it proves that institutional dealers are actively absorbing orders on one side of the book while refusing to participate on the other.

When the displacement candle prints, it leaves the **First Presented FVG**. This gap is not a random pause; it represents an institutional liquidity vacuum. Price typically returns to the 50% Consequent Encroachment within 2 to 4 candles, taps it with a wick, and accelerates aggressively toward the opposing boundary.

Because the invalidation stop is anchored tightly beyond the manipulation wick, the risk-to-reward ratio frequently exceeds 1:3 to 1:5, making it an ideal vehicle for funded trader evaluation accounts.`,
        keyTakeaway: 'The First Presented FVG offers the tightest invalidation and cleanest delivery path of the entire session.'
      }
    ]
  },

  // CHAPTER 54: Candle Range Theory (CRT)
  {
    id: 54,
    slug: 'candle-range-theory-crt-strategy',
    title: 'Candle Range Theory (CRT) & Advanced Multi-Session Confluence',
    part: 'Part XIII - Advanced 2025/2026 Institutional Delivery Systems & Tape Reading',
    level: 3,
    quote: 'Candle Range Theory demystifies intraday delivery. Every session expands out of a prior Reference Candle. Mark the high, mark the low, identify which side the algorithm manipulates first, and ride the delivery to the other side.',
    summary: [
      'The Reference Candle principle: How time containers anchor intraday volatility boundaries.',
      'London Open CRT: Exploiting the Asian Range candle boundary manipulation.',
      'New York Open CRT: Navigating London session high/low liquidity traps.',
      'Stacked CRT: Compounding moves as Session 1 delivery becomes the Reference Candle for Session 2.'
    ],
    keyTerms: [
      { term: 'Reference Candle (RC)', definition: 'The completed time-container candle from the prior session whose high and low define the manipulation and delivery boundaries.' },
      { term: 'Stacked CRT', definition: 'The multi-session phenomenon where the delivery expansion of Session 1 establishes the Reference Candle boundaries for Session 2.' },
      { term: 'Boundary Manipulation', definition: 'An intentional false breakout beyond the Reference Candle extreme designed to absorb retail stops before reversing.' }
    ],
    practiceQuestions: [
      'Which candle serves as the Reference Candle for the London Open, and which for the New York Cash Open?',
      'What is the difference between a genuine CRT reversal and a trend-continuation breakout?',
      'How does 50% equilibrium of the Reference Candle function during session delivery?'
    ],
    sections: [
      {
        id: 'sec-54-1',
        title: 'The Mechanical Logic of Candle Range Theory',
        content: `Traditional technical analysis relies on lagging indicators or diagonal trendlines. Candle Range Theory operates purely on time containers. Every trading session is fundamentally an expansion from an earlier reference price container.

For the London session (02:00-05:00 EST), the Asian session (20:00-00:00 EST) acts as the Reference Candle. The algorithm manipulates price below the Asian Low (or above the Asian High) during the 02:00-03:00 window, engineers a Judas swing, and then delivers across the range toward the opposite extreme during the 03:00-04:00 London Silver Bullet.

For the New York session (09:30-16:00 EST), the entire London session acts as the Reference Candle. The 09:30 equities cash open routinely sweeps either the London High or London Low, forms an MSS/CISD, and distributes toward the opposite London extreme or the daily Draw on Liquidity.`,
        keyTakeaway: 'Always plot the High and Low of the Reference Candle before the opening bell of each major session.'
      },
      {
        id: 'sec-54-2',
        title: 'Multi-Session Stacking and Equilibrium Targets',
        content: `Advanced tape readers utilize **Stacked CRT**. When London delivers from the Asian Low all the way to the Asian High, the London candle itself forms a large, clean range. When New York opens at 09:30, traders don't discard the prior range—they use the high and low of the London candle as the new Reference Candle!

Furthermore, the exact 50% midpoint of the Reference Candle acts as session equilibrium. On consolidating or trending days, price will often pause at 50% equilibrium to form a secondary PD array (such as an Inversion FVG or Suspension Block) before completing delivery to the distal boundary.`,
        keyTakeaway: 'Use the 50% midpoint of the Reference Candle for partial profit taking or secondary trend continuation re-entries.'
      }
    ]
  },

  // CHAPTER 55: Reaper IFVG & Suspension Block
  {
    id: 55,
    slug: 'reaper-ifvg-and-suspension-block-advancements',
    title: 'The ICT Reaper IFVG & Suspension Block — Next-Generation PD Array Variants',
    part: 'Part XIII - Advanced 2025/2026 Institutional Delivery Systems & Tape Reading',
    level: 3,
    quote: 'A standard IFVG flips support to resistance. A Reaper IFVG is the inversion of an inversion—a predatory trap harvesting retail stops. Meanwhile, the Suspension Block refuels price mid-flight between internal and external liquidity.',
    summary: [
      'The anatomy of the Reaper IFVG: How algorithmic dealers trap retail SMC traders at inversion levels.',
      'Executing the Reaper re-inversion: Finding the true direction when an IFVG fails violently.',
      'The Suspension Block: Why strong trend days never pull back to origin order blocks.',
      'Trading mid-flight continuation: Spotting isolated counter-trend pauses in Low Resistance Liquidity Runs.'
    ],
    keyTerms: [
      { term: 'Reaper IFVG', definition: 'An inversion-of-inversion trap where an apparent IFVG breach induces retail traders before an aggressive macro candle engulfs the zone in the opposite direction.' },
      { term: 'Suspension Block', definition: 'A single counter-trend candle formed mid-air in open space between dealing ranges that serves as an institutional in-flight refueling station.' },
      { term: 'In-Flight Refueling', definition: 'The algorithmic process of absorbing resting limit orders without allowing price to retrace to a deep 50% discount.' }
    ],
    practiceQuestions: [
      'How do you distinguish between a standard IFVG that holds and a Reaper IFVG trap?',
      'Why does a Suspension Block only appear during Low Resistance Liquidity Runs (LRLR)?',
      'Where is the invalidation point placed when trading an entry off a Suspension Block?'
    ],
    sections: [
      {
        id: 'sec-55-1',
        title: 'The Predatory Mechanics of the Reaper IFVG',
        content: `When retail traders learned that broken Fair Value Gaps (IFVGs) often act as support/resistance, market makers incorporated this knowledge into their stop-harvesting algorithms.

A **Reaper IFVG** begins when a bearish FVG is penetrated upward. Retail traders immediately place buy limit orders on the retest. Price produces a small, weak bounce, enticing retail participants to tighten their stop losses directly underneath the box.

Suddenly, an algorithmic macro window arrives (such as 09:50 AM EST). A large-bodied displacement candle slashes downward, completely engulfing the IFVG and trapping all the long participants. The tape reader does not mourn the broken IFVG; instead, they immediately place a short order on the underside retest of the Reaper zone, riding the momentum fueled by the liquidation of the trapped retail buyers.`,
        keyTakeaway: 'When an IFVG fails aggressively during a macro, flip your bias immediately: the Reaper is liquidating the retail herd.'
      },
      {
        id: 'sec-55-2',
        title: 'The Suspension Block: In-Flight Refueling',
        content: `On explosive trend days (such as post-economic announcements or central bank rate decisions), traders who wait for standard 50% OTE retracements get left behind on the sidelines. The algorithm is in a Low Resistance Liquidity Run (LRLR) and has an urgent delivery quota to hit.

Instead of retreating to origin order blocks, price forms an isolated counter-trend candle in mid-air—suspended between internal range liquidity and the external target. This is the **Suspension Block**.

Institutions use this suspended pause to absorb remaining passive orders. When price touches the outer boundary of this candle, it rejects almost instantly. By entering on the touch with a stop just beyond the candle body, traders can safely participate in runaway trends with exceptional risk-to-reward efficiency.`,
        keyTakeaway: 'On runaway trend days, do not wait for equilibrium; look for the single suspended opposing candle that refuels the trend.'
      }
    ]
  },

  // CHAPTER 56: RDRB & The Enigma FVG
  {
    id: 56,
    slug: 'rdrb-balanced-price-range-and-enigma-fvg',
    title: 'RDRB (Redelivered Balanced Price Range) & The Enigma FVG',
    part: 'Part XIII - Advanced 2025/2026 Institutional Delivery Systems & Tape Reading',
    level: 3,
    quote: 'The first delivery into a Balanced Price Range is entered on anticipation. The RDRB is entered on confirmation: the institutional algorithm has already proven it defends this exact two-sided balance.',
    summary: [
      'The evolution of Balanced Price Ranges: How two-sided liquidity balance creates impenetrable barriers.',
      'The RDRB signature: Second-touch confirmation with Consequent Encroachment (50%) wick defense.',
      'The Enigma FVG: Modern two-candle high-velocity imbalance structures.',
      'Single-candle rebalances during cash open and high-impact economic releases.'
    ],
    keyTerms: [
      { term: 'RDRB (Redelivered BPR)', definition: 'When a Balanced Price Range is revisited and respected a second time without candle bodies violating the 50% Consequent Encroachment.' },
      { term: 'Enigma FVG', definition: 'A specialized two-candle imbalance variant formed during extreme momentum where rebalance occurs on the immediate subsequent bar.' },
      { term: 'Two-Sided Efficiency', definition: 'A price state where both buyers and sellers have been matched, leaving zero directional liquidity imbalance.' }
    ],
    practiceQuestions: [
      'Why does an RDRB provide higher statistical win-rate expectancy than a first-time BPR touch?',
      'What specific rule governs candle bodies when testing the Consequent Encroachment of an RDRB?',
      'How does an Enigma FVG differ from a classical 3-candle Fair Value Gap?'
    ],
    sections: [
      {
        id: 'sec-56-1',
        title: 'Mastering the Redelivered Balanced Price Range (RDRB)',
        content: `A Balanced Price Range (BPR) represents an area where an aggressive rally and an immediate aggressive sell-off overlap across the exact same price levels. This structure proves that the market maker has delivered both buy-side and sell-side liquidity, leaving the zone completely balanced.

While trading the initial return to a BPR is effective, the **RDRB (Redelivered Balanced Price Range)** offers superior consistency. When price returns to the BPR a second time, the tape reader inspects the **50% Consequent Encroachment (CE)** line.

If price probes the zone with wicks but all candle bodies close firmly outside the 50% CE, the institutional algorithm has confirmed active defense. Entering on this second-touch rejection allows traders to position behind institutional capital with minimal drawdown.`,
        keyTakeaway: 'The RDRB turns theoretical balance into proven execution confirmation.'
      },
      {
        id: 'sec-56-2',
        title: 'The Enigma FVG: High-Speed Orderbook Gaps',
        content: `With the advent of microsecond electronic execution, certain high-velocity momentum events (such as the 09:30:00 AM cash open or CPI release) move too rapidly to form traditional 3-candle Fair Value Gaps.

The **Enigma FVG** is formed across two adjacent bars. Candle 1 expands with immense volume. Candle 2 opens and immediately produces a sharp, shallow wick into the opening price of Candle 1, rebalancing the fast order book before launching into vertical trend delivery.

Traders who understand the Enigma FVG do not wait for a non-existent 3rd candle; they execute on the quick tap of Candle 2, capturing rapid scalps with precision timing.`,
        keyTakeaway: 'During violent open bells, watch for single-candle rebalances on the Enigma FVG rather than waiting for 3-candle formations.'
      }
    ]
  },

  // CHAPTER 57: Sick Sister Strategy & Double Purge
  {
    id: 57,
    slug: 'sick-sister-strategy-and-double-purge-framework',
    title: 'The Sick Sister Strategy & Double Purge Framework',
    part: 'Part XIII - Advanced 2025/2026 Institutional Delivery Systems & Tape Reading',
    level: 3,
    quote: 'Always trade the path of least resistance. The Sick Sister has already shown that buyers have abandoned it. Meanwhile, the Double Purge clears both sides of the street before the institutional train rolls through.',
    summary: [
      'Intermarket pair selection: Using SMT divergence to identify the weakest or strongest asset.',
      'Why shorting the leader is a mistake: Capitalizing on the "Sick Sister" for maximum velocity.',
      'The Double Purge sequence: How algorithms wipe out both sides of retail orders prior to major expansions.',
      'Navigating dual-sided stop hunts: Executing post-Sweep 2 with high statistical conviction.'
    ],
    keyTerms: [
      { term: 'Sick Sister', definition: 'The correlated instrument that exhibits clear relative weakness by failing to reach prior swing highs during an intermarket sweep.' },
      { term: 'Double Purge', definition: 'A dual-sided liquidity sweep sequence where price sweeps sell-stops and buy-stops back-to-back before initiating genuine macro delivery.' },
      { term: 'Sweep 2 Reversal', definition: 'The high-probability execution window occurring immediately after the second side of resting liquidity has been swept.' }
    ],
    practiceQuestions: [
      'In a bearish setup where ES sweeps its high but NQ prints a lower high, which asset should you short and why?',
      'Why do retail breakout and trend-following traders consistently lose money during a Double Purge?',
      'What confirmation must you wait for after Sweep 2 before entering a Double Purge trade?'
    ],
    sections: [
      {
        id: 'sec-57-1',
        title: 'The Sick Sister: Institutional Relative Weakness',
        content: `One of the most common mistakes amateur traders make is attempting to pick the "top" by shorting the asset that looks the most extended. In institutional trading, strength begets strength and weakness begets weakness.

When SMT divergence occurs between correlated assets (such as NQ and ES in equity futures, or EURUSD and GBPUSD in currencies), the asset that fails to reach the previous swing high is under heavy institutional distribution. This asset is the **Sick Sister**.

Because buyers have already abandoned the Sick Sister, it offers virtually zero bid support. When the broader market begins to sell off, the Sick Sister drops with double the velocity and distance of the leader. By executing your short trades exclusively on the Sick Sister, you maximize your profit factor and minimize adverse excursion.`,
        keyTakeaway: 'Do not short the strongest horse; short the sick horse that is already stumbling.'
      },
      {
        id: 'sec-57-2',
        title: 'The Double Purge: The Complete Liquidity Reset',
        content: `Ahead of major macroeconomic moves, institutional books require immense liquidity that cannot be satisfied by sweeping a single swing point. The algorithm executes a **Double Purge**.

In a classic Double Purge, price first sweeps below a consolidation range to trigger sell-stops (Sweep 1). Inexperienced traders who try to catch the bottom get stopped out, while breakout sellers jump in. Immediately, price reverses and rallies with extreme violence, punching through the top of the range to sweep buy-stops (Sweep 2).

Now, both breakout buyers and breakout sellers have been liquidated. The order book is completely cleared of resting limit orders. The moment Sweep 2 rejects and prints a Change in State of Delivery (CISD) back inside the range, the tape reader enters with high confidence, knowing that the track is clear for genuine macro delivery.`,
        keyTakeaway: 'When both sides of the market have been swept, the traps are sprung—trade the subsequent displacement with full conviction.'
      }
    ]
  }
];
