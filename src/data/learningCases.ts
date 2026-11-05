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
export const learningCases:LearningCase[]=(import.meta.env?.SSR ?? typeof window==='undefined')?(await import('./learningCaseSource')).learningCases:[];
export const GUIDED_KEY = "learnsmc-guided-desk-v1";
export const caseSource = (c: Pick<LearningCase,"id">) => "Learning case: " + c.id;
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
