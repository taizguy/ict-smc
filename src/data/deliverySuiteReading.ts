/** Existing calculator assumptions, shared by the reading HTML and live OTE view. */
export const deliverySuiteReading = [
  { title: 'Scope and method', paragraphs: [
    'These are independently developed LearnSMC educational tools, not official exchange or ICT products. Select a module for timing, price-range arithmetic or personal study review. Levels and windows are references, not signals or probabilities.',
    'The New York clock keeps the current instant intact and formats America/New_York once. It displays the appropriate EDT/EST abbreviation. Eight recurring study windows are shown in New York local time. Holidays, market closures and economic releases are not checked.',
  ] },
  { title: 'Price and size assumptions', paragraphs: [
    'Bullish retracement = high − (high − low) × ratio; bearish retracement = low + (high − low) × ratio. Ratios include 0.50, 0.618, 0.705 and 0.790. Invalid, zero-range or inverted anchors are rejected. Theoretical levels are distinguished from tick-rounded prices.',
    'The illustrative stop lies 5% of the anchor range beyond the extreme, rounded outward; entry and targets round to the nearest instrument tick. Position size rounds down using recomputed stop risk, point value and size increment. Futures require whole contracts; micro contracts are listed separately. A budget too small for one increment produces zero size, not a fractional futures contract. FX/gold/crypto examples state their assumed units; verify broker specifications and costs.',
  ] },
  { title: 'Projections and personal checklist', paragraphs: [
    'Asian-range projections are 1.5, 2 and 2.5 range multiples beyond the selected extremes. They are not statistical standard deviations or probabilistic forecasts.',
    'The study checklist starts empty, links to actual curriculum lessons and persists on this device. It is a personal review list, separate from lesson completion and practice quiz results. Export a copy before clearing browser data.',
  ] },
];
