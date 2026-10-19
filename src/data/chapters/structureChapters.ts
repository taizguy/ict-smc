import { TextbookChapter } from '../../types';

export const structureChapters: TextbookChapter[] = [
  // CHAPTER 7: What Is a Swing? The Atom of Structure
  {
    id: 7,
    slug: 'what-is-a-swing-the-atom-of-structure',
    part: 'Part II - Price Structure',
    title: 'What Is a Swing? The Atom of Structure — 3-Candle Fractals & Multi-Timeframe Anchors',
    quote: "A stated swing convention makes chart observations reproducible. Choosing the timeframe and the relevant reference still requires context; a precise label is not a forecast.",
    level: 1,
    summary: ["A stated three-candle convention for recognizing swing highs and lows.","Candle completion and the treatment of equal prices.","Short-, intermediate- and longer-term swings as a selected study hierarchy.","Timeframe and context when choosing the reference relevant to a setup."],
    keyTerms: [{"term":"Swing High","definition":"Under the strict convention used here, a completed middle candle has a high above both neighboring highs."},{"term":"Swing Low","definition":"Under the strict convention used here, a completed middle candle has a low below both neighboring lows."},{"term":"Short-Term High / Low (STH/STL)","definition":"A local swing on the selected chart scale; identifying a swing does not measure the orders around it."},{"term":"Intermediate-Term High / Low (ITH/ITL)","definition":"A selected reference within the parent structure, interpreted using neighboring swings and the specific lesson context."},{"term":"Long-Term High / Low (LTH/LTL)","definition":"A parent structural reference relative to the scale being studied; it is not restricted to daily or higher charts."}],
    practiceQuestions: ["When can the three-candle pattern first be identified under the chosen completion rule?","Which parent range and references were selected before the later move?","How would equal highs or lows change the classification under your stated tie policy?","What would invalidate the interpretation without changing the original annotation?"],
    sections: [
      {
        id: '7.1',
        title: '7.1 The Mechanical 3-Candle Fractal Definition',
        content: "For these notes, use a strict three-candle swing convention. A swing high has a middle candle whose high is above both neighboring highs; a swing low has a middle candle whose low is below both neighboring lows. Wait for the right-hand candle to complete. Before that, its changing high or low can remove the candidate pattern.\n\nState how equal highs or lows are handled. Under this strict convention, a tie does not qualify; a different research convention may group similar prices into a zone. Keep the selected rule fixed rather than changing it after seeing the later move.\n\nThe comparison becomes mechanical once the timeframe, completion rule and tie policy are chosen. Selecting which swing or group of highs matters for a setup still involves context. Episode 3’s opening reference selection is a useful example of that distinction; it is not evidence that every visible swing forecasts a reversal.",
        keyTakeaway: "Define the three-candle and tie rules explicitly; keep mechanical pattern recognition separate from contextual reference selection."
      },
      {
        id: '7.2',
        title: '7.2 The Hierarchy of Swings: STS, ITS, and LTS',
        content: "Swing hierarchy describes relationships within the selected chart scale; short-, intermediate- and long-term are not permanent labels assigned only by timeframe. In Episode 12, ICT uses a higher-timeframe parent structure to interpret smaller swings and also considers rebalancing when classifying an intermediate reference.\n\nDo not turn this into the rule that every daily swing proves a quarterly rebalance, or that an intermediate swing must always sweep a prior high. State the parent range, the selected references and what later price would invalidate the interpretation. A smaller swing can change while the larger reference remains intact.\n\nFor practice, mark the hierarchy before revealing the next candles. If an expected reference fails, retain the original annotation and reassess. A stopped example does not justify moving the reference afterward.",
        keyTakeaway: "State the parent range and reference-selection rule; swing hierarchy is context, not evidence of institutional positions."
      },
      {
        id: '7.3',
        title: '7.3 Internal vs. External Range Swings: The Dealing Range',
        content: `One of the most common pitfalls among retail SMC traders is mistaking a minor counter-trend retracement for a trend change. This confusion arises from failing to define the active Dealing Range.

A Dealing Range is anchored between two major structural boundaries:
- The Dealing Range High (External Liquidity High).
- The Dealing Range Low (External Liquidity Low).

Everything that takes place inside these two outer extremes is Internal Structure.
- When price is retracing from the Dealing Range High downward toward a discount FVG, it will form multiple small 1-minute or 5-minute swing highs and swing lows.
- Retail traders see a 1-minute swing low break and panic, shouting: "Market structure has shifted bearish!"
- In reality, the higher-timeframe dealing range remains decisively bullish. The market is simply delivering an internal retracement to rebalance an inefficiency before launching the next impulsive leg.

To master structure, always mark your External Dealing Range boundaries on the 4-Hour or 1-Hour chart first. Only look for reversals when price interacts with the outer boundaries (External Liquidity) or when an internal retracement reaches a deep discount/premium PD array.`,
        keyTakeaway: 'Always distinguish between the external boundaries of the dealing range and the internal swing fluctuations occurring inside it.'
      }
    ]
  },

  // CHAPTER 9: Break of Structure (BOS): Trend Continuation
  {
    id: 9,
    slug: 'break-of-structure-bos-trend-continuation',
    part: 'Part II - Price Structure',
    title: 'Break of Structure (BOS): Trend Continuation — Validating Institutional Order Flow',
    quote: 'A true Break of Structure is not a mere wick touching an old high; it is an authoritative candle body close accompanied by displacement, confirming that institutional order flow remains committed to directional trend continuation.',
    level: 1,
    summary: [
      'The strict mechanical definition of a Break of Structure (BOS).',
      'BOS vs. Liquidity Sweep: The critical difference between candle bodies and wicks.',
      'Protected Highs/Lows vs. Targeted Highs/Lows in an active trend.',
      'The anatomy of a continuation cycle: Impulse, BOS, Retracement, Mitigation.',
      'Avoiding the retail trap: Chasing late BOS breakouts into premium arrays.'
    ],
    keyTerms: [
      { term: 'Break of Structure (BOS)', definition: 'The intentional breach and candle body close beyond an established swing point in the direction of the prevailing higher-timeframe trend, signaling trend continuation.' },
      { term: 'Protected Swing (Strong High/Low)', definition: 'The swing low that initiated a bullish BOS, or the swing high that initiated a bearish BOS; institutions actively defend this level from being breached.' },
      { term: 'Targeted Swing (Weak High/Low)', definition: 'A swing point formed against institutional order flow that lacks protection and serves as a natural liquidity magnet for the market to run through.' },
      { term: 'Continuation Displacement', definition: 'The rapid, large-bodied candle sequence that shatters an old swing high or low during a genuine Break of Structure.' }
    ],
    practiceQuestions: [
      'What specific requirement must be met regarding the candle body for a swing high penetration to qualify as a valid BOS?',
      'If a candle wick trades 5 ticks above an old swing high but the body closes 2 ticks below it, why is this classified as a liquidity sweep rather than a BOS?',
      'What is a "Protected Low", and why should a trader never expect a protected low to be violated during a healthy bullish trend?',
      'Why is entering a trade immediately upon the confirmation of a BOS a common retail mistake?',
      'How does higher-timeframe BOS on the 4-Hour chart provide the directional bias for 5-minute continuation setups?'
    ],
    sections: [
      {
        id: '9.1',
        title: '9.1 The Strict Anatomy of a Valid BOS',
        content: `In ICT and Smart Money Concepts, a Break of Structure (BOS) signifies trend continuation. It proves that the institutional participants who established the prevailing order flow remain in full control of the auction book.

However, the retail trading community frequently misidentifies BOS by treating any wick penetration as a break. This single error causes countless blown accounts.

The Strict Rules of a Valid Bullish BOS:
1. Identifiable Swing High: The market must have previously printed a confirmed 3-candle swing high.
2. Displacement Expansion: Price advances toward the swing high with large, healthy candle bodies.
3. The Candle Body Close: At least one candle must close its BODY completely above the extreme high of the prior swing. A wick penetrating the level while the body closes below is an invalid break—it is a Liquidity Sweep!
4. Creation of an Imbalance: An authentic BOS is almost always accompanied by a new Fair Value Gap (FVG), confirming that the break was executed with institutional urgency rather than retail exhaustion.

Once a valid bullish BOS is confirmed, the market establishes a new Protected Low (the lowest point of the swing that generated the break). As long as this protected low remains intact, the bullish order flow is structurally sound.`,
        keyTakeaway: 'A valid BOS requires a full candle body close beyond the prior swing extreme accompanied by displacement. Wicks above highs are sweeps, not breaks.'
      },
      {
        id: '9.2',
        title: '9.2 Protected Highs/Lows vs. Targeted Highs/Lows',
        content: `To navigate trending markets with confidence, you must categorize every swing on your chart into one of two categories:

1. Protected Swings (Strong Pivots):
- In a bullish trend: The swing low that originated the displacement wave breaking the prior high. This low is protected by institutional capital because breaking it would invalidate the institutional accumulation thesis.
- In a bearish trend: The swing high that generated the displacement breaking the prior low. This high is defended by institutional sell orders.
- Rule of Engagement: You never expect a protected pivot to be violated during normal trend delivery. Your stop loss is placed safely behind it.

2. Targeted Swings (Weak Pivots):
- In a bullish trend: Every swing high is considered "weak" or "targeted" because the algorithm's objective is to run through it to access the resting Buy-Side Liquidity.
- In a bearish trend: Every swing low is considered "weak" because the algorithm is actively driving price to raid the Sell-Side Liquidity below it.
- Rule of Engagement: You do not short into weak highs or buy into weak lows; you use them as your take-profit targets!`,
        keyTakeaway: 'Strong swings generate displacement and are defended by smart money; weak swings sit in the path of trend delivery and serve as liquidity targets.'
      },
      {
        id: '9.3',
        title: '9.3 The BOS Retail Trap: Why You Must Never Buy the Breakout',
        content: `Retail traders are taught classical breakout trading: "When price breaks resistance, buy immediately with a market order!"

When a valid BOS occurs, the market has just expanded into Premium territory (for an uptrend) or Discount territory (for a downtrend).
What happens the moment the BOS candle closes?
- Early breakout buyers jump in.
- The institutional algorithm, having completed the expansion leg, turns off aggressive buying and initiates the Retracement Phase.
- Price immediately pulls back into the dealing range to rebalance resting imbalances (FVGs) and mitigate discount order blocks.
- The retail breakout buyers find themselves instantly underwater, holding positions at the very top of the swing!

The Professional SMC Continuation Protocol:
1. Acknowledge the BOS as confirmation that order flow is bullish.
2. DO NOT enter at the break!
3. Pull your Fibonacci tool from the Protected Low to the newly formed Swing High to establish the 50% Equilibrium line.
4. Patiently wait for price to retrace into Discount territory (below 50%) into a newly formed bullish Fair Value Gap or Order Block.
5. Enter in discount with your stop below the protected low, targeting the next targeted high!`,
        keyTakeaway: 'The BOS is your directional compass, not your entry trigger. Wait for price to retrace into a discount PD array before joining the trend.'
      }
    ]
  },

  // CHAPTER 10: Change of Character (CHoCH): The First Warning
  {
    id: 10,
    slug: 'change-of-character-choch-the-first-warning',
    part: 'Part II - Price Structure',
    title: 'Change of Character (CHoCH): The First Warning — Early Signals of Structural Exhaustion',
    quote: 'Change of Character is the initial whisper that the trend is tired. It is the first break of internal structure occurring inside a higher-timeframe PD array, signaling an impending retracement or macro reversal.',
    level: 1,
    summary: [
      'The definition of Change of Character (CHoCH) and how it differs from BOS and MSS.',
      'Internal structure vs. external structure: Identifying CHoCH within minor pullbacks.',
      'The contextual requirement: Why a CHoCH without a higher-timeframe PD array is a trap.',
      'Using CHoCH to transition from macro analysis to micro intraday execution.',
      'Step-by-step confirmation checklist to distinguish valid CHoCH from choppy consolidations.'
    ],
    keyTerms: [
      { term: 'Change of Character (CHoCH)', definition: 'The first violation of an immediate internal swing point against the prevailing trend, providing an early alert that momentum has stalled and a retracement or reversal is beginning.' },
      { term: 'Internal Structure', definition: 'The smaller fractal swings formed within a single higher-timeframe leg or expansion wave.' },
      { term: 'Terminal Sweep', definition: 'The final liquidity sweep of a major high or low that precedes the initial Change of Character.' },
      { term: 'Early Warning System', definition: 'The conceptual role of CHoCH as an alert mechanism rather than a standalone blind entry signal.' }
    ],
    practiceQuestions: [
      'What is the fundamental difference between a Break of Structure (BOS) and a Change of Character (CHoCH)?',
      'Why does a CHoCH require interaction with a Higher Timeframe (HTF) PD array to be considered valid?',
      'If price prints a bullish CHoCH on the 1-minute chart during a 4-Hour bearish trend in the middle of nowhere, why should you ignore it?',
      'How does an aggressive trader use a 1-minute CHoCH to catch the extreme turning point of a 15-minute retracement?',
      'What should a conservative trader wait for after observing a CHoCH before risking capital?'
    ],
    sections: [
      {
        id: '10.1',
        title: '10.1 Decoding Change of Character (CHoCH)',
        content: `In modern Smart Money Concepts, few terms are used more frequently—and misunderstood more thoroughly—than Change of Character (CHoCH).

To understand CHoCH, you must understand the rhythm of a trending market.
In an established bullish trend, price creates a continuous sequence:
Higher High ➔ Higher Low ➔ Higher High ➔ Higher Low.
Every time a higher high is broken with a body close, you have a Break of Structure (BOS), signaling continuation.

Eventually, the market delivers price into a major higher-timeframe resistance zone—such as a Daily Bearish Order Block or Weekly Buy-Side Liquidity pool.
At this moment, the market prints a new high, sweeps the liquidity, and suddenly produces a sharp drop that breaches the most recent minor swing low.

This first violation of internal structure is the Change of Character (CHoCH)!

It is called "Change of Character" because the behavioral persona of the market has abruptly shifted:
- For the entire trend, prior swing lows were sacred and defended.
- Now, for the first time, a swing low has been violated with displacement.
The market is whispering: "The aggressive buyers have stepped aside; smart money is taking profits or positioning for a reversal."`,
        keyTakeaway: 'CHoCH is the first break of an internal counter-swing against the prevailing trend. It acts as an early warning that order flow dynamics have changed.'
      },
      {
        id: '10.2',
        title: '10.2 CHoCH vs. BOS vs. MSS: The Critical Distinctions',
        content: `Traders frequently confuse CHoCH, BOS, and MSS. Let us establish their exact mechanical hierarchy:

1. Break of Structure (BOS):
- Direction: In line with prevailing trend.
- Meaning: Trend continuation.
- Structural Level: Major swing extreme.

2. Change of Character (CHoCH):
- Direction: Against immediate internal trend.
- Meaning: Early warning / minor structural shift.
- Structural Level: Minor internal swing low (in an uptrend) or internal swing high (in a downtrend).
- Execution Role: Used primarily by aggressive scalpers or as an alert to stop adding to trend positions and prepare for a retracement.

3. Market Structure Shift (MSS):
- Direction: Reversal of intermediate structure.
- Meaning: Confirmed institutional regime change.
- Structural Level: Significant Intermediate-Term Swing (ITS) broken with authoritative displacement, accompanied by liquidity sweep and FVG formation.

The Golden Context Rule:
A CHoCH occurring in the middle of nowhere (in open consolidation space) has near-zero predictive value. It is merely market noise.
A valid CHoCH occurs ONLY after price has tapped a Higher-Timeframe Key PD Array or executed a major Liquidity Purge!`,
        keyTakeaway: 'BOS means continuation; CHoCH is an early warning break of internal structure; MSS is the fully verified intermediate directional reversal.'
      },
      {
        id: '10.3',
        title: '10.3 The CHoCH Execution Strategy: Aggressive vs. Conservative',
        content: `When a clean CHoCH appears on your chart, how should you trade it?

The Aggressive Approach (Scalp / Precision Entry):
1. Identify that price has just swept a major Buy-Side Liquidity pool on the 15-minute or 1-hour chart.
2. Drop to the 1-minute or 3-minute timeframe and watch the delivery into the high.
3. The moment a 1-minute swing low is broken with displacement, mark the newly formed 1-minute Bearish Fair Value Gap.
4. Place a limit sell order at the 50% Consequent Encroachment of the FVG, with a stop loss tightly placed above the high of the sweep.
5. Advantage: Massive Risk-to-Reward ratio (frequently 1:5 to 1:10).
6. Disadvantage: Higher false-alarm rate if the higher-timeframe trend decides to make one more leg higher.

The Conservative Approach (Confirmation Entry):
1. Observe the 1-minute CHoCH and do NOT enter.
2. Wait for the market to complete its initial pullback and then break a second, larger structural low on the 5-minute chart (the verified Market Structure Shift).
3. Enter on the retracement into the 5-minute FVG.
4. Advantage: Substantially higher statistical win rate.
5. Disadvantage: Slightly wider stop loss and lower absolute R:R ratio.`,
        keyTakeaway: 'Aggressive traders trade the immediate FVG created by the CHoCH; conservative traders use the CHoCH as an alert and wait for full MSS confirmation.'
      }
    ]
  },

  // CHAPTER 11: Market Structure Shift (MSS): Verified Directional Shift
  {
    id: 11,
    slug: 'market-structure-shift-mss-verified-directional-shift',
    part: 'Part II - Price Structure',
    title: 'Market Structure Shift (MSS): Verified Directional Shift — The Institutional Reversal Blueprint',
    quote: "In this study template, an MSS combines a predefined swing break with displacement and broader context. The label describes observed structure; it does not verify the next market direction.",
    level: 1,
    summary: [
      "A predefined MSS checklist and the limits of its confirmation.",
      'Differentiating authentic MSS from retail "fake-outs" and stop hunts.',
      'The role of the displacement anchor and the creation of the execution FVG.',
      'Top-down timeframe alignment: Pairing HTF narrative with LTF MSS confirmation.',
      'The complete mechanical execution template: Entry, Stop Loss, and Invalidation rules.'
    ],
    keyTerms: [
      { term: 'Market Structure Shift (MSS)', definition: "A shift through a selected prior swing, assessed with displacement and context under a stated rule. It describes observed structure and does not establish that a reversal will continue." },
      { term: 'Displacement Anchor', definition: 'The origin candle or price level from which the institutional impulse originated that broke the market structure.' },
      { term: 'Execution FVG', definition: 'The specific three-candle price imbalance created by the displacement wave during an MSS, serving as the primary entry zone on the subsequent retracement.' },
      { term: 'Structural Invalidation Level', definition: 'The extreme swing high or low formed during the liquidity sweep; a price close beyond this level completely invalidates the MSS setup.' }
    ],
    practiceQuestions: [
      "Which MSS conditions are definitions, and which are additional filters in this study template?",
      "How would you compare shifts with and without a prior sweep without assuming either has a higher win rate?",
      'Where is the exact stop loss placed when trading a retracement following an MSS?',
      'How does the concept of Consequent Encroachment (50%) apply to the execution FVG created during an MSS?',
      'What is the difference in expectancy between an MSS confirmed on a 5-minute chart versus an MSS confirmed on a 15-minute or 1-Hour chart?'
    ],
    sections: [
      {
        id: '11.1',
        title: "11.1 A Defined MSS Study Checklist",
        content: "Start with an identifiable swing and a stated timeframe. A bullish candidate breaks a selected prior swing high; a bearish candidate breaks a selected prior swing low. Record whether the rule requires a candle close. A wick-only break is a different observation, not proof of a particular participant’s intent.\n\nAssess displacement relative to recent candles rather than using words such as violent without a definition. A prior sweep, higher-timeframe reference and an FVG can be additional filters in a chosen execution model. Do not present this combined checklist as the universal definition used in every ICT lecture.\n\nThe broken swing must have been identifiable before the break. If a three-candle pivot needs a right-hand candle, wait for that candle to complete. A lower-timeframe break can occur inside a higher-timeframe continuation; neither the label nor the filter set guarantees a reversal.",
        keyTakeaway: "Choose swing, close and displacement rules in advance. Additional confluence filters are model choices, not proof of future direction."
      },
      {
        id: '11.2',
        title: '11.2 The Complete Mechanical MSS Execution Blueprint',
        content: "For a paper study of the illustrated model, select the liquidity reference and the nearby structure level before price reaches them. Record the timeframe and the candle-close condition. Observe whether the break shows displacement relative to surrounding candles; do not choose a new swing after seeing the result.\n\nIf a completed FVG follows, an edge entry and a midpoint entry are separate execution variants. Neither is automatically conservative or superior. A deeper order may improve the planned ratio but remain unfilled, while a tighter stop may be reached more often. Record the fill assumption explicitly.\n\nChoose the invalidation and target before entry. The sweep extreme can be one candidate for invalidation in this study, but the actual stop distance, size increment and costs depend on the instrument. Measure the outcome after spread, fees and slippage; do not infer an executable trade from the finished chart alone.",
        keyTakeaway: "Treat edge and midpoint entries as different testable variants; state invalidation, fill assumptions and costs before comparing outcomes."
      },
      {
        id: '11.3',
        title: "11.3 An Intraday Shift Is Not a Multi-Day Forecast",
        content: "Early in Episode 3, ICT distinguishes an intraday market structure shift from a break associated with a longer-duration move. For study, a local directional change can produce an intraday leg without establishing that the higher-timeframe trend has ended.\n\nKeep the observation scale visible. A lower-timeframe break inside a larger uptrend may be a pullback, a more lasting reversal or an unresolved transition. The selected definition tells you when to label the local event; later price action determines which path actually develops.\n\nRecord both the original local reference and the higher-timeframe context before replay. If the intraday leg later reverses, retain that result. Avoid calling every unsuccessful example a fake shift merely because the outcome became known.",
        keyTakeaway: "State the timeframe and evaluate the local event without assuming that it forecasts the final daily or weekly direction."
      },
{
  "id": "11.4-source-reading",
  "title": "11.4 The Displacement-and-Close Example in Episode 6",
  "content": "Episode 6’s bearish MSS discussion emphasizes a quick displacement lower rather than a small, hesitant move. A close below the reference is described as preferable for greater significance. Do not turn a stated preference into a universal mandatory close rule.\n\nIn Episode 3’s bullish example around 13:45, the initial move through a short-term high does not have to close above that high. The discussion then waits for a later candle to complete to assess the FVG. The initial crossing, gap confirmation and possible entry are separate events.\n\nFor replay, write which lesson and example you are studying. Mark the prior reference before the crossing and record when each later condition becomes visible. If you add a stricter close filter for research, label it as your own variation rather than attributing that extra condition to every ICT setup.",
  "keyTakeaway": "Match the rule to the specific example: the first swing crossing, FVG completion and entry are separate events."
}
    ]
  }
];
