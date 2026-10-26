import { TextbookChapter } from '../types';

export const theinnercircletradersNewChapters: TextbookChapter[] = [
  // CHAPTER 54: Candle Range Theory (CRT)
  {
    id: 54,
    slug: 'candle-range-theory-crt-strategy',
    part: 'Part XIII - Advanced 2025/2026 Institutional Delivery Systems & Tape Reading',
    title: 'Candle Range Theory (CRT) & Advanced Multi-Session Confluence',
    quote: 'Candle Range Theory demystifies intraday delivery. Every session expands out of a prior Reference Candle. Mark the high, mark the low, identify which side the algorithm manipulates first, and ride the delivery to the other side.',
    level: 3,
    summary: [
      'The Reference Candle principle: How time containers anchor intraday volatility boundaries.',
      'London Open CRT: Exploiting the Asian Range candle boundary manipulation.',
      'New York Open CRT: Navigating London session high/low liquidity traps.',
      'Stacked CRT: Compounding moves as Session 1 delivery becomes the Reference Candle for Session 2.',
      'The 50% Equilibrium rejection protocol in trending sessions.'
    ],
    keyTerms: [
      { term: 'Reference Candle (RC)', definition: 'The completed time-container candle from the prior session whose high and low define the manipulation and delivery boundaries.' },
      { term: 'Stacked CRT', definition: 'The multi-session phenomenon where the delivery expansion of Session 1 establishes the Reference Candle boundaries for Session 2.' },
      { term: 'Boundary Manipulation', definition: 'An intentional false breakout beyond the Reference Candle extreme designed to absorb retail stops before reversing.' }
    ],
    practiceQuestions: [
      'Which candle serves as the Reference Candle for the London Open, and which for the New York Cash Open?',
      'What is the difference between a genuine CRT reversal and a trend-continuation breakout?',
      'How does 50% equilibrium of the Reference Candle function during session delivery?',
      'What confirmation must you wait for after a Reference Candle high is breached?',
      'How does Stacked CRT prevent a trader from entering against the prevailing higher-timeframe trend?'
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
        content: `Advanced tape readers utilize Stacked CRT. When London delivers from the Asian Low all the way to the Asian High, the London candle itself forms a large, clean range. When New York opens at 09:30, traders don't discard the prior range—they use the high and low of the London candle as the new Reference Candle!

Furthermore, the exact 50% midpoint of the Reference Candle acts as session equilibrium. On consolidating or trending days, price will often pause at 50% equilibrium to form a secondary PD array (such as an Inversion FVG or Suspension Block) before completing delivery to the distal boundary.`,
        keyTakeaway: 'Use the 50% midpoint of the Reference Candle for partial profit taking or secondary trend continuation re-entries.'
      },
      {
        id: 'sec-54-3',
        title: 'Step-by-Step CRT Operational Checklist',
        content: `1. 08:30 AM EST: Box the High and Low of the completed London session.
2. Mark the 50% Equilibrium line.
3. 09:30 - 09:45 AM: Watch price probe beyond the London High or Low.
4. Confirm rejection with a 5-minute candle body closing back inside the Reference Candle boundary.
5. Enter on the first 1-minute or 5-minute FVG retracement, targeting the opposite Reference Candle extreme!`,
        keyTakeaway: 'Trade from one boundary of the Reference Candle across to the opposite boundary after manipulation is confirmed.'
      }
    ]
  },

  // CHAPTER 55: Reaper IFVG & Suspension Block
  {
  "id": 55,
  "slug": "reaper-ifvg-and-suspension-block-advancements",
  "part": "Part XIII - Advanced 2025/2026 Institutional Delivery Systems & Tape Reading",
  "title": "Suspension Blocks & Reaper FVG: Source Context and Limits",
  "quote": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay.",
  "level": 3,
  "summary": [
    "In the reviewed April 2026 explanation, ICT examines separations between adjacent candle bodies while their wicks touch or overlap.",
    "The source compares the nearby/front-month futures contract with a continuous chart.",
    "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
  ],
  "keyTerms": [
    {
      "term": "Suspension Block",
      "definition": "In the reviewed April 2026 explanation, ICT examines separations between adjacent candle bodies while their wicks touch or overlap. These are volume imbalances in his terminology. Mark the actual close/open prices around the selected candle; an isolated counter-trend pause alone is not the definition illustrated here."
    },
    {
      "term": "Reaper FVG",
      "definition": "An official June 2026 execution is titled Reaper FVG. Its reviewed passages show trade management, but they do not authenticate the previous definition of Reaper as every inversion-of-inversion, a mandatory 09:50 trap or an immediate instruction to reverse position. A source title alone cannot supply those rules."
    }
  ],
  "practiceQuestions": [
    "Why can a continuous-chart level differ from the current delivery contract?",
    "Does a failed inversion automatically justify reversing the position?"
  ],
  "sections": [
    {
      "id": "sec-55-1",
      "title": "Suspension: start with body-price separations",
      "content": "In the reviewed April 2026 explanation, ICT examines separations between adjacent candle bodies while their wicks touch or overlap. These are volume imbalances in his terminology. Mark the actual close/open prices around the selected candle; an isolated counter-trend pause alone is not the definition illustrated here.\n\nBody-price separation is observable. Concluding that an institution refuelled a trend, that no deep retracement can occur, or that the first touch is safe requires additional evidence. The reviewed passage does not establish a universal first-touch entry, one-percent risk rule or midpoint stop. Keep the chosen invalidation and the contract’s tick value explicit."
    },
    {
      "id": "sec-55-2",
      "title": "Compare the actual contract and chart settings",
      "content": "The source compares the nearby/front-month futures contract with a continuous chart. Their candle shapes and absolute prices differ. ICT prefers a candidate agreeing with a selected breaker reference in this example and discusses comparing other candidate levels. Record the symbol, delivery month, adjustment setting and timeframe. Do not transplant a continuous-chart price directly into a different contract."
    },
    {
      "id": "sec-55-3",
      "title": "Reaper: distinguish a source title from verified rules",
      "content": "In the 9 June 2026 review, ICT explicitly describes a Reaper variant with two nested gaps in a breaker context. In the bearish example, a previously bullish gap is validated as an inversion after a close below it, while a bearish FVG supplies a first-utilization reference. The lesson examines their overlap, wick excursions and body placement together; it does not define every failed inversion as a Reaper.\n\nAn official June 2026 execution is titled Reaper FVG. Its reviewed passages show trade management, but they do not authenticate the previous definition of Reaper as every inversion-of-inversion, a mandatory 09:50 trap or an immediate instruction to reverse position. A source title alone cannot supply those rules.\n\nStudy a failed IFVG as a failed IFVG unless the precise named variation is supported by an original explanation. Save the initial gap boundaries, the break criterion, the retest and the later failure separately. Neither the price sequence nor its label identifies every participant or proves that all retail stops were harvested."
    }
  ]
},

  // CHAPTER 56: RDRB & The Enigma FVG
  {
  "id": 56,
  "slug": "rdrb-balanced-price-range-and-enigma-fvg",
  "part": "Part XIII - Advanced 2025/2026 Institutional Delivery Systems & Tape Reading",
  "title": "Balanced-Range Revisits & Enigma: Measurements, Not Guarantees",
  "quote": "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay.",
  "level": 3,
  "summary": [
    "These notes use RDRB descriptively for a later revisit to a selected balanced-price reference.",
    "The reviewed June 2026 Enigma lecture discusses FVG measurements, volume imbalances and projections into a price range that has not yet traded.",
    "A chart label is not an entry instruction or proof of institutional intent. Define the rule, invalidation and costs before replay."
  ],
  "keyTerms": [
    {
      "term": "RDRB",
      "definition": "These notes use RDRB descriptively for a later revisit to a selected balanced-price reference. A precise originating explanation for the previous named second-touch model has not been verified. Keep this limitation visible instead of attributing a universal second-touch rule to ICT."
    },
    {
      "term": "Enigma",
      "definition": "The reviewed June 2026 Enigma lecture discusses FVG measurements, volume imbalances and projections into a price range that has not yet traded. It identifies the middle candle of a three-candle FVG and distinguishes wick-based and body-based measurements. It does not establish the previous two-candle FVG definition on this page."
    }
  ],
  "practiceQuestions": [
    "Which later candle information would make a projection hindsight-dependent?",
    "How will you count a revisit and retain failed zones in the sample?"
  ],
  "sections": [
    {
      "id": "sec-56-1",
      "title": "A later balanced-range visit is a separate observation",
      "content": "These notes use RDRB descriptively for a later revisit to a selected balanced-price reference. A precise originating explanation for the previous named second-touch model has not been verified. Keep this limitation visible instead of attributing a universal second-touch rule to ICT.\n\nAn overlap of selected opposing FVG price intervals is chart geometry. It does not prove that every order was matched, that the order book is empty or that an institution will defend the midpoint. Number the revisits with a stated rule: consecutive candles inside one visit are not automatically separate touches."
    },
    {
      "id": "sec-56-2",
      "title": "Enigma: what the reviewed lecture actually measures",
      "content": "The reviewed June 2026 Enigma lecture discusses FVG measurements, volume imbalances and projections into a price range that has not yet traded. It identifies the middle candle of a three-candle FVG and distinguishes wick-based and body-based measurements. It does not establish the previous two-candle FVG definition on this page.\n\nAn implied or unrealized dealing range is a proposed future interval, not an interval price has already traversed. Freeze the anchor prices and target before exposing later candles. The source illustrates different measurement boundaries and a 1.25 projection in a particular example; this is not a compulsory ratio for all instruments or proof of a target’s likelihood."
    },
    {
      "id": "sec-56-3",
      "title": "Keep projection anchors and failures visible",
      "content": "Compare first and later visits using the same entry, expiry, invalidation and costs. Preserve zones that failed on their first test instead of excluding them after the fact. A second reaction does not by itself establish lower drawdown, a higher win rate or permission to increase risk.\n\nThe lecture’s examples and the instructor’s claims are not an independently verified statistical sample. State which candle information existed at the decision time: a completed FVG, a wick and a projected future boundary become available at different moments. Test missed targets, changed anchors and losses as well as successful examples."
    }
  ]
},

  // CHAPTER 57: Sick Sister Strategy & Double Purge
  {
  "id": 57,
  "slug": "sick-sister-strategy-and-double-purge-framework",
  "part": "Part XIII - Advanced 2025/2026 Institutional Delivery Systems & Tape Reading",
  "title": "Sick Sister: Contextual Market Selection & Two-Sided Sweep Studies",
  "level": 3,
  "quote": "Relative weakness is an observation. It does not prove that buyers have disappeared or that the weaker market must be sold.",
  "summary": [
    "The official Sick Sister consolidation example was published on 8 May 2023, before the later course material.",
    "The weaker index can be studied for a conditional catch-up long in a consolidation example.",
    "Two-sided sweeps do not prove an empty order book or guarantee the next direction."
  ],
  "keyTerms": [
    {
      "term": "Sick Sister",
      "definition": "A contextual relative-performance concept. In the reviewed consolidation example, the lagging index is considered for a later catch-up move after a discount reference; it is not an automatic short signal."
    },
    {
      "term": "Two-sided sweep",
      "definition": "Price exceeds both selected boundaries of a range. This describes a price sequence, not the identity of traders or the state of every outstanding order."
    }
  ],
  "practiceQuestions": [
    "Why does the reviewed example study a long in the weaker index rather than automatically short it?",
    "Which highs, contract months and observation times are being compared?",
    "What evidence would invalidate the catch-up idea before entry?",
    "Can a chart prove that two sweeps removed every resting limit order?"
  ],
  "sections": [
    {
      "id": "sec-57-1",
      "title": "Sick Sister has an earlier official source",
      "content": "ICT’s official consolidation-model review was published on 8 May 2023. The concept should not be presented as a new 2026 invention merely because these notes sit alongside later material. The source compares corresponding highs in Dow, ES and Nasdaq and distinguishes Sick Sister from treating every SMT observation as the same trade.\n\nUse aligned sessions and actual contract references. A failure to exceed a selected high is a measurable comparison; concluding that institutions abandoned an instrument or that it has no bid support requires evidence a candle chart does not supply."
    },
    {
      "id": "sec-57-2",
      "title": "The consolidation example: a catch-up possibility",
      "content": "In the reviewed example, Dow takes both selected highs, ES takes one, and Nasdaq takes neither. Rather than automatically selling the weakest index, ICT studies Nasdaq after it trades into a selected discount area containing an order-block/FVG reference. The example then seeks nearer buy-side references; it does not require catching the highest possible target.\n\nThe lesson discusses market condition, time and entry location together. It explicitly does not mean buying immediately just because another index has moved higher. A later catch-up can fail, and a divergence can disappear. Keep the range, comparison points, entry condition and invalidation fixed before replay. Do not claim twice the velocity, zero adverse movement or a guaranteed improvement in profit factor."
    },
    {
      "id": "sec-57-3",
      "title": "Two-sided sweeps: a separate research specification",
      "content": "Double Purge is a descriptive label used in these notes for movement beyond both sides of a selected range. A precise official originating lecture for that label and the previous five-minute execution sequence has not been verified. Keep it separate from the sourced Sick Sister example.\n\nMark the range before revealing the next candles. Record which boundary is crossed first, whether a wick or close counts, the time between crossings and what happens after the second crossing. Preserve cases that continue, consolidate or reverse. Two sweeps cannot establish that all breakout traders were liquidated or that the entire order book was cleared.\n\nIf you test a displacement/FVG entry afterward, identify it as your selected research variation. Specify order expiry, invalidation, transaction costs and unfilled orders before evaluating the result. The second sweep alone is not confirmation of a profitable reversal."
    }
  ]
}
];
