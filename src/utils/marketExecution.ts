import type { LabBar } from "./backtestEngine";
export type Plan = {
  side: "long" | "short";
  entry: number;
  stop: number;
  target: number;
  cost: number;
  account: number;
  risk: number;
  value: number;
};
export type Order = {
  id: string;
  plan: Plan;
  created: number;
  riskDistance: number;
  status: "pending" | "open" | "target" | "stop" | "ambiguous" | "end";
  fill?: number;
  filledAt?: number;
  exit?: number;
  exitAt?: number;
  r?: number | null;
  decisions: string[];
};
export function validPlan(p: Plan) {
  return (
    ["long", "short"].includes(p.side) &&
    [p.entry, p.stop, p.target, p.cost, p.account, p.risk, p.value].every(
      Number.isFinite,
    ) &&
    p.entry > 0 &&
    p.stop > 0 &&
    p.target > 0 &&
    p.cost >= 0 &&
    p.cost <= 10 &&
    p.account > 0 &&
    p.value > 0 &&
    p.risk > 0 &&
    p.risk <= 100 &&
    (p.side === "long"
      ? p.stop < p.entry && p.entry < p.target
      : p.target < p.entry && p.entry < p.stop)
  );
}
/** OHLC cannot establish intrabar ordering. Pending limit fills and exits in the
 * same non-opening candle are unresolved, not an invented favorable tick path. */
export function advanceOrder(
  order: Order,
  b: LabBar,
  index: number,
  last = false,
): Order {
  if (!["pending", "open"].includes(order.status) || index <= order.created)
    return order;
  let o = { ...order },
    p = o.plan,
    s = p.side === "long" ? 1 : -1;
  if (o.status === "pending") {
    const openFill = s === 1 ? b.open <= p.entry : b.open >= p.entry;
    const touched = s === 1 ? b.low <= p.entry : b.high >= p.entry;
    if (!touched)
      return last ? { ...o, status: "end", exitAt: index, r: null } : o;
    o = {
      ...o,
      status: "open",
      fill: openFill
        ? s === 1
          ? Math.min(b.open, p.entry)
          : Math.max(b.open, p.entry)
        : p.entry,
      filledAt: index,
    };
    // A protective stop beyond a touched limit necessarily follows that entry
    // under this continuous-touch model. A target may have happened before it.
    if (!openFill && (s === 1 ? b.high >= p.target : b.low <= p.target))
      return { ...o, status: "ambiguous", exitAt: index, r: null };
  }
  const fill = o.fill!,
    risk = o.riskDistance,
    finish = (status: Order["status"], price: number | null): Order => ({
      ...o,
      status,
      exit: price ?? undefined,
      exitAt: index,
      r: price === null ? null : ((price - fill) * s) / risk - p.cost,
    });
  if (s === 1 ? b.open <= p.stop : b.open >= p.stop)
    return finish("stop", b.open);
  if (s === 1 ? b.open >= p.target : b.open <= p.target)
    return finish("target", p.target);
  const stopped = s === 1 ? b.low <= p.stop : b.high >= p.stop,
    won = s === 1 ? b.high >= p.target : b.low <= p.target;
  if (stopped && won) return finish("ambiguous", null);
  if (stopped || won)
    return finish(stopped ? "stop" : "target", stopped ? p.stop : p.target);
  return last ? finish("end", b.close) : o;
}
