import { demoBars, readBars, type LabBar } from "./backtestEngine";
export type PatternKind = "FVG" | "OB" | "BOS" | "Sweep";
export type Mark = {
  id: string;
  kind: PatternKind;
  index: number;
  low: number;
  high: number;
  end?: number;
  start?: number;
  user?: boolean;
};
import {
  advanceOrder,
  validPlan,
  type Order,
  type Plan,
} from "./marketExecution";
export {
  advanceOrder,
  validPlan,
  type Order,
  type Plan,
} from "./marketExecution";
export type MarketState = {
  version: 1;
  source: string;
  bars: LabBar[];
  cursor: number;
  seen: number;
  marks: Mark[];
  order: Order | null;
  draft: Plan;
  history: Order[];
  selected: number | null;
  notes: string;
};
export const SESSION_KEY = "learnsmc-market-engine-v1";
export function normalizeDraft(plan: Plan): Plan {
  const price = (value: number) =>
    Number.isFinite(value) ? Number(value.toPrecision(10)) : value;
  return {
    ...plan,
    entry: price(plan.entry),
    stop: price(plan.stop),
    target: price(plan.target),
  };
}
export function draftFor(bars: LabBar[], cursor: number): Plan {
  const visible = bars.slice(0, cursor),
    entry = visible.at(-1)!.close;
  const range =
    Math.max(...visible.map((b) => b.high)) -
    Math.min(...visible.map((b) => b.low));
  const gap = Math.min(entry * 0.9, Math.max(range * 0.12, entry * 0.001));
  return normalizeDraft({
    side: "long",
    entry,
    stop: entry - gap,
    target: entry + gap * 2,
    cost: 0.05,
    account: 10000,
    risk: 1,
    value: 1,
  });
}
export const initialMarket = (): MarketState => ({
  version: 1,
  source: "Synthetic teaching data",
  bars: demoBars(),
  cursor: 36,
  seen: 36,
  marks: [],
  order: null,
  draft: draftFor(demoBars(), 36),
  history: [],
  selected: null,
  notes: "",
});
export function patterns(bars: LabBar[]): Mark[] {
  const out: Mark[] = [];
  for (let i = 2; i < bars.length; i++) {
    const a = bars[i - 2],
      b = bars[i];
    if (a.high < b.low)
      out.push({
        id: "f" + i,
        kind: "FVG",
        index: i,
        low: a.high,
        high: b.low,
      });
    if (a.low > b.high)
      out.push({
        id: "f" + i,
        kind: "FVG",
        index: i,
        low: b.high,
        high: a.low,
      });
    if (i < 8) continue;
    const prior = bars.slice(i - 8, i),
      high = Math.max(...prior.map((x) => x.high)),
      low = Math.min(...prior.map((x) => x.low));
    if ((b.high > high && b.close < high) || (b.low < low && b.close > low))
      out.push({
        id: "s" + i,
        kind: "Sweep",
        index: i,
        low: b.low,
        high: b.high,
      });
    if (
      (b.close > high && bars[i - 1].close <= high) ||
      (b.close < low && bars[i - 1].close >= low)
    )
      out.push({
        id: "b" + i,
        kind: "BOS",
        index: i,
        low: Math.min(b.open, b.close),
        high: Math.max(b.open, b.close),
      });
    const mean = prior.reduce((n, x) => n + Math.abs(x.close - x.open), 0) / 8;
    const prev = bars[i - 1];
    if (
      Math.abs(b.close - b.open) > mean * 1.5 &&
      ((b.close > b.open && prev.close < prev.open) ||
        (b.close < b.open && prev.close > prev.open))
    )
      out.push({
        id: "o" + i,
        kind: "OB",
        index: i - 1,
        low: prev.low,
        high: prev.high,
        end: i,
      });
  }
  return out;
}
export function matchMark(mark: Mark, truth: Mark[]) {
  return truth.some(
    (x) =>
      x.kind === mark.kind &&
      Math.abs(x.index - mark.index) <= 1 &&
      Math.abs((x.low + x.high) / 2 - (mark.low + mark.high) / 2) <=
        Math.max(x.high - x.low, 0.000001),
  );
}
export type MarketAction =
  | { type: "step" }
  | { type: "draft"; plan: Plan }
  | { type: "seek"; cursor: number }
  | { type: "select"; index: number }
  | { type: "mark"; mark: Mark }
  | { type: "remove"; id: string }
  | { type: "lock"; plan: Plan }
  | { type: "decision"; decision: "breakeven" | "hold" }
  | { type: "notes"; text: string }
  | { type: "reset" }
  | { type: "load"; state: MarketState };
export function marketReducer(s: MarketState, a: MarketAction): MarketState {
  if (a.type === "load") return a.state;
  if (a.type === "draft") return { ...s, draft: normalizeDraft(a.plan) };
  if (a.type === "select")
    return { ...s, selected: Math.max(0, Math.min(s.cursor - 1, a.index)) };
  if (a.type === "mark")
    return {
      ...s,
      marks: [
        ...s.marks
          .filter((m) => m.kind !== a.mark.kind || m.index !== a.mark.index)
          .slice(-199),
        a.mark,
      ],
    };
  if (a.type === "remove")
    return { ...s, marks: s.marks.filter((m) => m.id !== a.id) };
  if (a.type === "notes") return { ...s, notes: a.text.slice(0, 3000) };
  if (a.type === "reset")
    return {
      ...s,
      cursor: Math.min(36, Math.max(3, Math.floor(s.bars.length * 0.2))),
      order: null,
      selected: null,
    };
  if (a.type === "lock")
    return !s.order && s.cursor < s.bars.length && validPlan(a.plan)
      ? {
          ...s,
          order: {
            id: crypto.randomUUID(),
            plan: { ...a.plan },
            created: s.cursor - 1,
            riskDistance: Math.abs(a.plan.entry - a.plan.stop),
            status: "pending",
            decisions: [],
          },
        }
      : s;
  if (a.type === "decision") {
    if (s.order?.status !== "open") return s;
    const o = s.order,
      close = s.bars[s.cursor - 1].close,
      p = o.plan;
    // A stop may only improve while still lying beyond the current close.
    if (
      a.decision === "breakeven" &&
      o.fill !== undefined &&
      (p.side === "long"
        ? o.fill > p.stop && o.fill < close
        : o.fill < p.stop && o.fill > close)
    )
      return {
        ...s,
        order: {
          ...o,
          plan: { ...p, stop: o.fill },
          decisions: [...o.decisions, `breakeven@${s.cursor}`],
        },
      };
    return {
      ...s,
      order: { ...o, decisions: [...o.decisions, `hold@${s.cursor}`] },
    };
  }
  const cursor =
    a.type === "step"
      ? Math.min(s.bars.length, s.cursor + 1)
      : Math.max(3, Math.min(s.bars.length, Math.round(a.cursor)));
  if (a.type === "seek" && s.order) return s;
  let order = s.order;
  if (order && cursor > s.cursor)
    for (let i = s.cursor; i < cursor; i++)
      order = advanceOrder(order, s.bars[i], i, i === s.bars.length - 1);
  const done = order && !["pending", "open"].includes(order.status),
    history =
      done && !s.history.some((x) => x.id === order!.id)
        ? [...s.history.slice(-99), order!]
        : s.history;
  return { ...s, cursor, seen: Math.max(s.seen, cursor), order, history };
}
export function restoreMarket(
  raw: string,
  preserveOrders = false,
): MarketState {
  if (raw.length > 8_000_000) throw new Error("Session file is too large.");
  const s = JSON.parse(raw);
  if (s?.version !== 1 || !Array.isArray(s.bars))
    throw new Error("Invalid session file.");
  const csv =
    "time,open,high,low,close\n" +
    s.bars
      .map((b: LabBar) => [b.time, b.open, b.high, b.low, b.close].join(","))
      .join("\n");
  const bars = readBars(csv, 3);
  if (
    !Number.isInteger(s.cursor) ||
    s.cursor < 3 ||
    s.cursor > bars.length ||
    !Number.isInteger(s.seen) ||
    s.seen < s.cursor ||
    s.seen > bars.length
  )
    throw new Error("Invalid replay position.");
  const marks = Array.isArray(s.marks)
    ? s.marks
        .filter(
          (m: Mark) =>
            m &&
            ["FVG", "OB", "BOS", "Sweep"].includes(m.kind) &&
            typeof m.id === "string" &&
            Number.isInteger(m.index) &&
            m.index >= 0 &&
            m.index < bars.length &&
            Number.isFinite(m.low) &&
            Number.isFinite(m.high) &&
            m.low > 0 &&
            m.high >= m.low &&
            (m.start === undefined ||
              (Number.isInteger(m.start) &&
                m.start >= 0 &&
                m.start <= m.index)) &&
            (m.end === undefined ||
              (Number.isInteger(m.end) &&
                m.end >= m.index &&
                m.end < bars.length)),
        )
        .slice(0, 200)
    : [];
  const isOrder = (o: Order) =>
    o &&
    typeof o.id === "string" &&
    o.id.length <= 100 &&
    o.plan &&
    [
      o.plan.entry,
      o.plan.stop,
      o.plan.target,
      o.plan.cost,
      o.plan.account,
      o.plan.risk,
      o.plan.value,
    ].every(Number.isFinite) &&
    o.plan.entry > 0 &&
    o.plan.stop > 0 &&
    o.plan.target > 0 &&
    o.plan.account > 0 &&
    o.plan.risk > 0 &&
    o.plan.risk <= 100 &&
    o.plan.value > 0 &&
    o.plan.cost >= 0 &&
    o.plan.cost <= 10 &&
    ["long", "short"].includes(o.plan.side) &&
    Number.isFinite(o.riskDistance) &&
    o.riskDistance > 0 &&
    Number.isInteger(o.created) &&
    o.created >= 0 &&
    o.created < bars.length &&
    ["pending", "open", "target", "stop", "ambiguous", "end"].includes(
      o.status,
    ) &&
    (o.fill === undefined || Number.isFinite(o.fill)) &&
    (o.r === undefined || o.r === null || Number.isFinite(o.r)) &&
    Array.isArray(o.decisions) &&
    o.decisions.length <= 20000 &&
    o.decisions.every((x) => typeof x === "string") &&
    (o.filledAt === undefined ||
      (Number.isInteger(o.filledAt) &&
        o.filledAt >= 0 &&
        o.filledAt < bars.length)) &&
    (o.exitAt === undefined ||
      (Number.isInteger(o.exitAt) && o.exitAt >= 0 && o.exitAt < bars.length));
  // Imported files restore observations; local device continuity also keeps validated orders.
  return {
    version: 1,
    draft:
      s.draft && validPlan(s.draft)
        ? normalizeDraft(s.draft)
        : draftFor(bars, s.cursor),
    bars,
    source: String(s.source || "Imported local data").slice(0, 100),
    cursor: s.cursor,
    seen: s.seen,
    marks,
    order: preserveOrders && isOrder(s.order) ? s.order : null,
    history:
      preserveOrders && Array.isArray(s.history)
        ? s.history.filter(isOrder).slice(-100)
        : [],
    selected: null,
    notes: String(s.notes || "").slice(0, 3000),
  };
}
