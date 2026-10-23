import type { LabBar } from "../utils/backtestEngine";
import { advanceOrder, type Order, type Plan } from "../utils/marketExecution";

/** Authored teaching cases, not historical observations or validated strategies.
 * Separate earlier hourly candles supply the selected higher-timeframe
 * interpretation. They are not inferred from the intraday candles. Case IDs/names deliberately do not reveal future outcomes. */
export type LearningCase = {
  id: string;
  name: string;
  side: "long" | "short";
  bias: "long" | "short";
  bars: LabBar[];
  htfBars: LabBar[];
  contextTarget: number;
  contextSwing: number;
  entry: number;
  stop: number;
  target: number;
};
const opening = [
  [103, 104, 102, 103.4],
  [103.4, 105, 103, 104.5],
  [104.5, 106, 104, 105.5],
  [105.5, 105.8, 103.5, 104],
  [104, 104.4, 101.5, 102],
  [102, 103, 100, 101],
  [101, 103.5, 100.8, 103],
  [103, 104.2, 102.2, 103.7],
  [103.7, 104, 101.7, 102.2],
  [102.2, 102.7, 100.8, 101.3],
  [101.3, 101.7, 98.4, 100.7],
  [100.7, 101.2, 99.4, 100.2],
  [100.2, 104.8, 100.1, 104.6],
  [104.6, 105.6, 103.3, 105],
];
const follow = [
  [105, 105.4, 102.1, 103],
  [103, 103.4, 101.8, 102.7],
  [102.7, 104.9, 102.4, 104.6],
  [104.6, 106.5, 104.3, 106.1],
  [106.1, 107.4, 105.7, 106.8],
  [106.8, 108.4, 106.3, 107.7],
  [107.7, 109.1, 107, 108.5],
  [108.5, 110.4, 108.1, 110.1],
];
const losing = [
  ...follow.slice(0, 2),
  [102.7, 103, 100.9, 101.2],
  [101.2, 101.6, 99.3, 99.7],
  [99.7, 100.2, 97.7, 98.1],
  [98.1, 99, 97.5, 98.4],
];
const noReturn = [
  [105, 106.5, 104.5, 106],
  [106, 107.5, 105.5, 107],
  [107, 108.5, 106.5, 108],
  [108, 109.5, 107.5, 109],
  [109, 110.5, 108.5, 110],
];
function make(
  id: string,
  name: string,
  tail = follow,
  side: "long" | "short" = "long",
  complete = true,
  bias = side,
): LearningCase {
  const rows = complete
    ? [...opening, ...tail]
    : [
        ...opening.slice(0, 12),
        [100.2, 102.2, 99.8, 101.4],
        [101.4, 102, 100.5, 101],
        [101, 101.5, 99, 99.5],
        [99.5, 100, 97.8, 98.5],
      ];
  const bars = rows.map(([open, high, low, close], i) => ({
    time: new Date(Date.UTC(2026, 0, 6, 14, i * 5)).toISOString(),
    ...(side === "long"
      ? { open, high, low, close }
      : {
          open: 210 - open,
          high: 210 - low,
          low: 210 - high,
          close: 210 - close,
        }),
  }));
  const htfRows = [
    [94, 100, 93, 99],
    [99, 100, 95, 96],
    [96, 104, 95.5, 103],
    [103, 104, 98, 99],
    [99, 110, 98.5, 108],
    [108, 109, 101, 103],
  ];
  const mirror = bias === "short" ? (side === "short" ? 210 : 206) : null;
  const htfBars = htfRows.map(([open, high, low, close], i) => ({
    time: new Date(Date.UTC(2026, 0, 6, 8 + i)).toISOString(),
    ...(mirror === null
      ? { open, high, low, close }
      : {
          open: mirror - open,
          high: mirror - low,
          low: mirror - high,
          close: mirror - close,
        }),
  }));
  return {
    id,
    name,
    side,
    bias,
    bars,
    htfBars,
    contextTarget: mirror === null ? 110 : mirror - 110,
    contextSwing: mirror === null ? 98 : mirror - 98,
    entry: side === "long" ? 102 : 108,
    stop: side === "long" ? 98 : 112,
    target: side === "long" ? 110 : 100,
  };
}
export const learningCases: LearningCase[] = [
  make("a", "Case A"),
  make("b", "Case B", losing),
  make("c", "Case C", follow, "long", false),
  make("d", "Case D", follow, "short"),
  make("e", "Case E", noReturn),
  make("f", "Case F", follow, "long", true, "short"),
];
export const GUIDED_KEY = "learnsmc-guided-desk-v1";
export const caseSource = (c: LearningCase) => "Learning case: " + c.id;
export function casePlan(c: LearningCase, cost = 0.05): Plan {
  return {
    side: c.side,
    entry: c.entry,
    stop: c.stop,
    target: c.target,
    cost,
    account: 10000,
    risk: 1,
    value: 1,
  };
}
export function caseEvidence(c: LearningCase) {
  const prior = c.bars.slice(0, 10),
    rangeLow = Math.min(...prior.map((b) => b.low)),
    rangeHigh = Math.max(...prior.map((b) => b.high)),
    sweep = c.bars[10];
  const long = c.side === "long",
    structure = long ? c.bars[7].high : c.bars[7].low;
  const swept = long
    ? sweep.low < rangeLow && sweep.close > rangeLow
    : sweep.high > rangeHigh && sweep.close < rangeHigh;
  const average =
    c.bars
      .slice(4, 12)
      .reduce((sum, b) => sum + Math.abs(b.close - b.open), 0) / 8;
  const displaced =
    Math.abs(c.bars[12].close - c.bars[12].open) > average * 1.5;
  const shifted = long
    ? c.bars[12].close > structure
    : c.bars[12].close < structure;
  const gap = long
    ? { low: c.bars[11].high, high: c.bars[13].low }
    : { low: c.bars[13].high, high: c.bars[11].low };
  const hasGap = gap.high > gap.low;
  const aligned = c.side === c.bias;
  return {
    rangeLow,
    rangeHigh,
    structure,
    swept,
    displaced,
    shifted,
    gap,
    hasGap,
    aligned,
    qualified: aligned && swept && displaced && shifted && hasGap,
  };
}
export function evaluateCase(c: LearningCase, minimumR: number, cost: number) {
  const evidence = caseEvidence(c),
    plan = casePlan(c, cost),
    reward =
      Math.abs(plan.target - plan.entry) / Math.abs(plan.entry - plan.stop);
  const reason = !evidence.aligned
    ? "Context does not agree"
    : !evidence.shifted || !evidence.displaced
      ? "Confirmation is missing"
      : !evidence.swept
        ? "No qualifying sweep"
        : !evidence.hasGap
          ? "No completed gap"
          : reward < minimumR
            ? "Below the stated reward requirement"
            : null;
  if (reason) return { case: c, order: null, reason };
  let order: Order = {
    id: "case-" + c.id,
    created: 13,
    riskDistance: Math.abs(plan.entry - plan.stop),
    plan,
    status: "pending",
    decisions: [],
  };
  for (let i = 14; i < c.bars.length; i++) {
    order = advanceOrder(order, c.bars[i], i, i === c.bars.length - 1);
    if (!["pending", "open"].includes(order.status)) break;
  }
  return { case: c, order, reason: null };
}
