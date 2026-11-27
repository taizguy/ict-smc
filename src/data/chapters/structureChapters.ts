import { TextbookChapter } from '../../types';

export const structureChapters: TextbookChapter[] = [
  // CHAPTER 7: What Is a Swing? The Atom of Structure
  {
    id: 7,
    slug: 'what-is-a-swing-the-atom-of-structure',
    part: 'Part II - Price Structure',
    title: 'What Is a Swing? The Atom of Structure — 3-Candle Fractals & Multi-Timeframe Anchors',
    quote: '',
    level: 1,
    summary: [],
    keyTerms: [],
    practiceQuestions: [],
    sections: []
  },

  // CHAPTER 9: Break of Structure (BOS): Trend Continuation
  {
    id: 9,
    slug: 'break-of-structure-bos-trend-continuation',
    part: 'Part II - Price Structure',
    title: 'Break of Structure (BOS): Trend Continuation — Validating Institutional Order Flow',
    quote: '',
    level: 1,
    summary: [],
    keyTerms: [],
    practiceQuestions: [],
    sections: []
  },

  // CHAPTER 10: Change of Character (CHoCH): The First Warning
  {
    id: 10,
    slug: 'change-of-character-choch-the-first-warning',
    part: 'Part II - Price Structure',
    title: 'Change of Character (CHoCH): The First Warning — Early Signals of Structural Exhaustion',
    quote: '',
    level: 1,
    summary: [],
    keyTerms: [],
    practiceQuestions: [],
    sections: []
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
