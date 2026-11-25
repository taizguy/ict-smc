export interface BookLevel {
  price: number;
  size: number;
}

export interface BookWalkFill {
  price: number;
  available: number;
  filled: number;
  remaining: number;
  cost: number;
}

export interface BookWalkResult {
  side: 'buy' | 'sell';
  requested: number;
  filled: number;
  unfilled: number;
  totalCost: number;
  averageFill: number | null;
  topPrice: number | null;
  lastPrint: number | null;
  slippage: number | null;
  slippageTicks: number | null;
  fills: BookWalkFill[];
}

export interface QueueTicket {
  id: string;
  size: number;
}

export interface QueueAllocationRow {
  id: string;
  posted: number;
  fifoFill: number;
  proRataFill: number;
}

export interface AuctionLevelRow {
  price: number;
  buyInterest: number;
  sellInterest: number;
  cumBuy: number;
  cumSell: number;
  matchedVolume: number;
  imbalance: number;
}

export const TICK_SIZE = 0.25;

export const syntheticOrderBooks: Record<'deep' | 'thin', { bids: BookLevel[]; asks: BookLevel[] }> = {
  deep: {
    bids: [
      { price: 99.75, size: 500 },
      { price: 99.5, size: 650 },
      { price: 99.25, size: 800 },
      { price: 99.0, size: 950 },
      { price: 98.75, size: 1100 },
    ],
    asks: [
      { price: 100.0, size: 500 },
      { price: 100.25, size: 600 },
      { price: 100.5, size: 800 },
      { price: 100.75, size: 900 },
      { price: 101.0, size: 1000 },
    ],
  },
  thin: {
    bids: [
      { price: 99.25, size: 25 },
      { price: 98.75, size: 40 },
      { price: 98.25, size: 60 },
      { price: 97.5, size: 100 },
      { price: 97.0, size: 150 },
    ],
    asks: [
      { price: 100.0, size: 20 },
      { price: 100.25, size: 30 },
      { price: 100.5, size: 50 },
      { price: 101.0, size: 100 },
      { price: 101.5, size: 100 },
    ],
  },
};

export function computeSpreadAndMid(bestBid: number, bestAsk: number, tickSize = TICK_SIZE) {
  if (!Number.isFinite(bestBid) || !Number.isFinite(bestAsk) || bestAsk < bestBid || tickSize <= 0) {
    return null;
  }
  const spread = +(bestAsk - bestBid).toFixed(6);
  const midPrice = +((bestBid + bestAsk) / 2).toFixed(6);
  const spreadTicks = +(spread / tickSize).toFixed(4);
  return { spread, midPrice, spreadTicks };
}

export function computeObiAndMicroprice(
  bestBid: number,
  bidSize: number,
  bestAsk: number,
  askSize: number,
) {
  if (
    !Number.isFinite(bestBid) ||
    !Number.isFinite(bestAsk) ||
    !Number.isFinite(bidSize) ||
    !Number.isFinite(askSize) ||
    bestAsk < bestBid ||
    bidSize < 0 ||
    askSize < 0
  ) {
    return null;
  }
  const totalTop = bidSize + askSize;
  const midPrice = (bestBid + bestAsk) / 2;
  if (totalTop === 0) {
    return { obi: 0, microprice: midPrice, midPrice, tilt: 0 };
  }
  const obi = (bidSize - askSize) / totalTop;
  const microprice = (bestAsk * bidSize + bestBid * askSize) / totalTop;
  return {
    obi: +obi.toFixed(6),
    microprice: +microprice.toFixed(6),
    midPrice: +midPrice.toFixed(6),
    tilt: +(microprice - midPrice).toFixed(6),
  };
}

export function walkOrderBook(
  side: 'buy' | 'sell',
  requestedSize: number,
  levels: readonly BookLevel[],
  tickSize = TICK_SIZE,
): BookWalkResult | null {
  if (!Number.isFinite(requestedSize) || requestedSize <= 0 || tickSize <= 0) return null;
  if (levels.some((l) => !Number.isFinite(l.price) || !Number.isFinite(l.size) || l.size < 0)) {
    return null;
  }
  const sorted = [...levels].sort((a, b) => (side === 'buy' ? a.price - b.price : b.price - a.price));
  let left = requestedSize;
  let filled = 0;
  let totalCost = 0;
  let lastPrint: number | null = null;
  const topPrice = sorted[0]?.price ?? null;

  const fills: BookWalkFill[] = sorted.map((lvl) => {
    const take = Math.min(left, lvl.size);
    left = +(left - take).toFixed(8);
    filled = +(filled + take).toFixed(8);
    const cost = +(take * lvl.price).toFixed(8);
    totalCost = +(totalCost + cost).toFixed(8);
    if (take > 0) lastPrint = lvl.price;
    return {
      price: lvl.price,
      available: lvl.size,
      filled: take,
      remaining: +(lvl.size - take).toFixed(8),
      cost,
    };
  });

  const averageFill = filled > 0 ? +(totalCost / filled).toFixed(6) : null;
  const slippage =
    averageFill !== null && topPrice !== null
      ? +(side === 'buy' ? averageFill - topPrice : topPrice - averageFill).toFixed(6)
      : null;
  const slippageTicks = slippage !== null ? +(slippage / tickSize).toFixed(4) : null;

  return {
    side,
    requested: requestedSize,
    filled,
    unfilled: +(requestedSize - filled).toFixed(8),
    totalCost: +totalCost.toFixed(4),
    averageFill,
    topPrice,
    lastPrint,
    slippage,
    slippageTicks,
    fills,
  };
}

export function aggregateDepthCurve(bids: readonly BookLevel[], asks: readonly BookLevel[]) {
  const sortedBids = [...bids].sort((a, b) => b.price - a.price);
  const sortedAsks = [...asks].sort((a, b) => a.price - b.price);
  let bidCum = 0;
  const bidCurve = sortedBids.map((b) => {
    bidCum += b.size;
    return { price: b.price, size: b.size, cumulative: bidCum };
  });
  let askCum = 0;
  const askCurve = sortedAsks.map((a) => {
    askCum += a.size;
    return { price: a.price, size: a.size, cumulative: askCum };
  });
  return { bidCurve, askCurve };
}

export function simulateFifoVsProRata(
  incomingSize: number,
  tickets: readonly QueueTicket[],
): QueueAllocationRow[] {
  const totalPosted = tickets.reduce((acc, t) => acc + Math.max(0, t.size), 0);
  const capped = Math.max(0, Math.min(incomingSize, totalPosted));

  let fifoLeft = capped;
  const fifoMap = new Map<string, number>();
  for (const t of tickets) {
    const take = Math.min(fifoLeft, t.size);
    fifoMap.set(t.id, take);
    fifoLeft -= take;
  }

  const proRataMap = new Map<string, number>();
  let allocated = 0;
  for (const t of tickets) {
    const share = totalPosted > 0 ? Math.floor((t.size / totalPosted) * capped) : 0;
    proRataMap.set(t.id, share);
    allocated += share;
  }
  let remainder = capped - allocated;
  for (const t of tickets) {
    if (remainder <= 0) break;
    const current = proRataMap.get(t.id) || 0;
    const room = Math.max(0, t.size - current);
    if (room > 0) {
      const add = Math.min(remainder, room);
      proRataMap.set(t.id, current + add);
      remainder -= add;
    }
  }

  return tickets.map((t) => ({
    id: t.id,
    posted: t.size,
    fifoFill: fifoMap.get(t.id) || 0,
    proRataFill: proRataMap.get(t.id) || 0,
  }));
}

export const defaultAuctionLevels = [
  { price: 100.5, buyInterest: 90, sellInterest: 240 },
  { price: 100.25, buyInterest: 120, sellInterest: 180 },
  { price: 100.0, buyInterest: 200, sellInterest: 160 },
  { price: 99.75, buyInterest: 220, sellInterest: 140 },
  { price: 99.5, buyInterest: 260, sellInterest: 100 },
];

export function simulateAuctionUncross(
  levels: ReadonlyArray<{ price: number; buyInterest: number; sellInterest: number }> = defaultAuctionLevels,
): { rows: AuctionLevelRow[]; clearingPrice: number; maxMatched: number } {
  const descending = [...levels].sort((a, b) => b.price - a.price);
  const cumBuys: number[] = [];
  let runBuy = 0;
  for (const l of descending) {
    runBuy += l.buyInterest;
    cumBuys.push(runBuy);
  }

  const cumSells = new Array<number>(descending.length).fill(0);
  let runSell = 0;
  for (let i = descending.length - 1; i >= 0; i--) {
    runSell += descending[i].sellInterest;
    cumSells[i] = runSell;
  }

  const rows: AuctionLevelRow[] = descending.map((l, idx) => {
    const matchedVolume = Math.min(cumBuys[idx], cumSells[idx]);
    const imbalance = Math.abs(cumBuys[idx] - cumSells[idx]);
    return {
      price: l.price,
      buyInterest: l.buyInterest,
      sellInterest: l.sellInterest,
      cumBuy: cumBuys[idx],
      cumSell: cumSells[idx],
      matchedVolume,
      imbalance,
    };
  });

  const best = [...rows].sort((a, b) => b.matchedVolume - a.matchedVolume || a.imbalance - b.imbalance)[0];
  return {
    rows,
    clearingPrice: best?.price ?? 100.0,
    maxMatched: best?.matchedVolume ?? 0,
  };
}
