export const labGuides: Record<
  string,
  { title: string; description: string; paragraphs: string[] }
> = {
  chartlab: {
    title: "A guided setup, one condition at a time",
    description:
      "Learn context, liquidity, confirmation, entry area and invalidation through a guided chart case, with clickable candles and no-trade examples.",
    paragraphs: [
      "Start with separate, earlier hourly candles and the selected swing references. Then move into the later five-minute execution window. Both are authored illustrations, not historical market records.",
      "Answer one question at a time: identify the range sweep, check the confirmation close and displacement, locate the completed gap, and explain the invalidation. Select a candle or use its numbered button; precise freehand drawing is not required.",
      "The case only qualifies when its stated context and confirmation conditions agree. A gap or order block alone does not supply a trade. Some cases deliberately stop at a no-trade decision; qualifying cases can also lose.",
      "The sequence is one explicitly stated teaching convention, not a universal ICT model or evidence about hidden institutional orders. The selected higher-timeframe interpretation can be questioned.",
    ],
  },
  simulator: {
    title: "Practise waiting, participating or standing aside",
    description:
      "Assess a full stated checklist, wait for a paper entry or skip, and reveal candles before reviewing a simulated fill, loss, target or no-fill outcome.",
    paragraphs: [
      "Read the supplied context and completed evidence before deciding. Wait for the planned limit entry or deliberately skip the case. Missing conditions prevent an order; a qualified checklist does not require participation.",
      "The paper plan places entry inside the demonstrated gap, invalidation beyond the sweep, and a target at the supplied external reference. Those are this example’s conventions, not recommendations. Optional adjustments must still satisfy the stated conditions.",
      "Reveal one candle at a time or play the sequence. An entry must fill before a position exists. Unknown OHLC ordering remains unresolved. The original execution engine models stop gaps and an assumed fixed R cost, without margin, partial fills or a real order book.",
      "Previously reviewed candles are labeled when the case is repeated. The learner can export a decision review. These small authored cases do not establish strategy performance.",
    ],
  },
  backtest: {
    title: "Test the same checklist across different cases",
    description:
      "Apply context, sweep, displacement, structure, gap and risk conditions to six teaching cases. Inspect qualified, skipped, invalidated and unfilled examples.",
    paragraphs: [
      "The first exercise applies a complete stated checklist to six authored cases. Its purpose is to explain qualification and execution, not to report historical expectancy or a strategy win rate.",
      "State a minimum planned reward relative to risk and an assumed round-trip R cost before applying the checklist. All cases use the same conditions. Skipped cases and orders that never fill remain visible in the record.",
      "Select a case and inspect its chart before the order, at the fill and at the outcome. The same shared execution function evaluates both paper simulation and case review. Changes to the settings mark old results as out of date.",
      "The optional CSV sandbox is separate, advanced gap-geometry research. It does not implement the full context checklist and must not be represented as a complete ICT strategy backtest.",
    ],
  },
  "delivery-suite": {
    title: "Prepare a risk plan you can explain",
    description:
      "Use a fictional chart plan to understand stop distance, cash risk and whole-unit sizing before continuing to paper decision practice.",
    paragraphs: [
      "The guided risk exercise uses an explicitly fictional instrument worth one US dollar per price point per unit. It does not silently substitute this multiplier for a real futures, forex or cryptocurrency instrument.",
      "Move the stop or edit its price. A wider stop increases loss per unit, so a fixed cash risk budget allows fewer whole units. The example with a 100-dollar planned budget and four-point stop distance permits 25 units before costs.",
      "A missing setup condition or invalid edited plan withholds sizing. Entry remains inside the example’s gap, invalidation is beyond the sweep, and the target is the supplied reference. Sizing does not validate the underlying setup.",
      "Before adapting the exercise to real research, review separate higher-timeframe evidence, session and news information, and instrument details. Costs and gaps can exceed planned risk. Existing delivery reference calculators remain available below.",
    ],
  },
};
