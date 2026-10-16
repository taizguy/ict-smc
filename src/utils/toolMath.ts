export const finite = (...values: number[]) => values.every(Number.isFinite);
export function tickPrice(price: number, tick: number, mode: 'nearest' | 'up' | 'down' = 'nearest') {
  const operation = mode === 'up' ? Math.ceil : mode === 'down' ? Math.floor : Math.round;
  return Number((operation(Number((price / tick).toFixed(8))) * tick).toFixed(8));
}
export function realizedR(entry: number, stop: number, exit: number, direction: 'LONG' | 'SHORT') {
  const risk = Math.abs(entry - stop);
  if (!finite(entry, stop, exit) || risk <= 0) throw new Error('Entry and stop must define positive risk.');
  return (exit - entry) * (direction === 'LONG' ? 1 : -1) / risk;
}
export const instrumentSpecs = {
  NQ: { label: 'E-mini Nasdaq-100', high: 20500, low: 20400, tick: .25, value: 20, step: 1, unit: 'contracts', decimals: 2 },
  ES: { label: 'E-mini S&P 500', high: 5850, low: 5820, tick: .25, value: 50, step: 1, unit: 'contracts', decimals: 2 },
  MNQ: { label: 'Micro E-mini Nasdaq-100', high: 20500, low: 20400, tick: .25, value: 2, step: 1, unit: 'contracts', decimals: 2 },
  MES: { label: 'Micro E-mini S&P 500', high: 5850, low: 5820, tick: .25, value: 5, step: 1, unit: 'contracts', decimals: 2 },
  EURUSD: { label: 'EUR/USD (100,000 EUR per lot)', high: 1.085, low: 1.078, tick: .00001, value: 100000, step: .01, unit: 'standard lots', decimals: 5 },
  XAUUSD: { label: 'Gold CFD example (100 oz per lot)', high: 2650, low: 2630, tick: .01, value: 100, step: .01, unit: 'example lots', decimals: 2 },
  BTC: { label: 'BTC/USD spot example', high: 68000, low: 66000, tick: .01, value: 1, step: .00001, unit: 'BTC', decimals: 2 },
};
export type ToolInstrument = keyof typeof instrumentSpecs;
export function calculateOte(asset: ToolInstrument, high: number, low: number, balance: number, riskPercent: number, bullish: boolean) {
  if (!finite(high, low, balance, riskPercent) || high <= low || low <= 0 || balance <= 0 || riskPercent <= 0 || riskPercent > 100) return null;
  const spec = instrumentSpecs[asset], range = high - low;
  const level = (ratio: number) => bullish ? high - range * ratio : low + range * ratio;
  const theoretical = [.5, .618, .705, .79].map(level);
  const entry = tickPrice(level(.705), spec.tick);
  const stop = tickPrice(bullish ? low - range * .05 : high + range * .05, spec.tick, bullish ? 'down' : 'up');
  const target = tickPrice(bullish ? high + range * .27 : low - range * .27, spec.tick);
  const target2 = tickPrice(bullish ? high + range * .62 : low - range * .62, spec.tick);
  const distance = Math.abs(entry - stop), budget = balance * riskPercent / 100;
  if (stop <= 0 || target <= 0 || target2 <= 0 || distance <= 0 || (bullish ? !(stop < entry && entry < target) : !(target < entry && entry < stop))) return null;
  const size = Number((Math.floor((budget / (distance * spec.value)) / spec.step + 1e-9) * spec.step).toFixed(5));
  return { theoretical, entry, stop, target, target2, budget, distance, size, actualRisk: size * distance * spec.value, rr: Math.abs(target - entry) / distance };
}

/** Seeded Mulberry32 generator for reproducible hypothetical paths. */
export function randomGenerator(seed: number) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export function equityPath(random: () => number, trades: number, probability: number, reward: number, risk: number, costR: number) {
  let equity = 10000, peak = equity, drawdown = 0, profits = 0, losses = 0, wins = 0;
  const points = [equity], ledger: { trade: number; r: number; equity: number }[] = [];
  for (let i = 0; i < trades; i++) {
    const win = random() < probability, r = (win ? reward : -1) - costR;
    const pnl = equity * risk / 100 * r;
    equity = Math.max(0, equity + pnl); peak = Math.max(peak, equity);
    drawdown = Math.max(drawdown, (peak - equity) / peak * 100);
    if (pnl >= 0) profits += pnl; else losses -= pnl;
    if (pnl > 0) wins++;
    points.push(equity); ledger.push({ trade: i + 1, r, equity });
  }
  return { points, ledger, ending: equity, drawdown, winRate: wins / trades * 100, profitFactor: losses ? profits / losses : null, netReturn: (equity / 10000 - 1) * 100 };
}
export function newYorkParts(instant: Date) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hourCycle: 'h23', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' }).formatToParts(instant);
  const part = (type: string) => parts.find(p => p.type === type)?.value || '';
  return { hour: Number(part('hour')), minute: Number(part('minute')), time: `${part('hour')}:${part('minute')}:${part('second')}`, zone: part('timeZoneName') };
}
