import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowUpDown,
  Database,
  EyeOff,
  Flame,
  Gauge,
  Gavel,
  Layers,
  ListOrdered,
  Pause,
  Play,
  RotateCcw,
  Scale,
  StepForward,
} from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import {
  aggregateDepthCurve,
  computeObiAndMicroprice,
  simulateAuctionUncross,
  simulateFifoVsProRata,
  syntheticOrderBooks,
  walkOrderBook,
} from '../utils/orderBookMath';

export type OrderBookVisualKind =
  | 'anatomy'
  | 'matching-animation'
  | 'depth-dom-pair'
  | 'data-tiers'
  | 'queue-simulator'
  | 'book-walker'
  | 'obi-sandbox'
  | 'heatmap-playback'
  | 'iceberg-reload'
  | 'auction-uncross'
  | 'smc-bridge';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

export function OrderBookVisual({ kind, staticOnly = false }: { kind: OrderBookVisualKind; staticOnly?: boolean }) {
  const { t } = useTranslation();
  const reducedMotion = usePrefersReducedMotion();

  // Interactive states per widget
  const [matchStep, setMatchStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const [depthBook, setDepthBook] = useState<'deep' | 'thin'>('deep');
  const [depthFocus, setDepthFocus] = useState<'both' | 'ladder' | 'chart'>('both');

  const [dataTier, setDataTier] = useState<1 | 2 | 3>(3);

  const [queueIncoming, setQueueIncoming] = useState(120);

  const [walkBookKey, setWalkBookKey] = useState<'deep' | 'thin'>('thin');
  const [walkSide, setWalkSide] = useState<'buy' | 'sell'>('buy');
  const [walkSize, setWalkSize] = useState(300);

  const [bidSize, setBidSize] = useState(300);
  const [askSize, setAskSize] = useState(100);

  const [heatmapMode, setHeatmapMode] = useState<'absorption' | 'pulled'>('absorption');

  const [icebergExecutions, setIcebergExecutions] = useState(2);

  useEffect(() => {
    if (!playing || staticOnly || reducedMotion) return;
    const timer = window.setInterval(() => {
      setMatchStep((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 1500);
    return () => window.clearInterval(timer);
  }, [playing, staticOnly, reducedMotion]);

  const walkResult = useMemo(() => {
    const levels = syntheticOrderBooks[walkBookKey][walkSide === 'buy' ? 'asks' : 'bids'];
    return walkOrderBook(walkSide, walkSize, levels);
  }, [walkBookKey, walkSide, walkSize]);

  const obiResult = useMemo(() => computeObiAndMicroprice(99.75, bidSize, 100.0, askSize), [bidSize, askSize]);

  const queueRows = useMemo(
    () =>
      simulateFifoVsProRata(queueIncoming, [
        { id: '#A1 (09:30:00.001)', size: 50 },
        { id: '#B2 (09:30:00.018)', size: 150 },
        { id: '#C3 (09:30:00.095)', size: 200 },
      ]),
    [queueIncoming],
  );

  const depthData = useMemo(
    () => aggregateDepthCurve(syntheticOrderBooks[depthBook].bids, syntheticOrderBooks[depthBook].asks),
    [depthBook],
  );

  const auctionData = useMemo(() => simulateAuctionUncross(), []);

  if (kind === 'anatomy') {
    const asks = [
      { price: '$100.50', size: 650, w: 195 },
      { price: '$100.25', size: 420, w: 126 },
      { price: '$100.00', size: 250, w: 75, inside: true },
    ];
    const bids = [
      { price: '$99.75', size: 300, w: 90, inside: true },
      { price: '$99.50', size: 450, w: 135 },
      { price: '$99.25', size: 700, w: 210 },
    ];
    return (
      <figure className="ob-figure" data-order-book-figure="anatomy">
        <div className="ob-figure-head">
          <strong className="ob-head-title">
            <ArrowUpDown size={15} aria-hidden="true" />
            {t('Inside a Central Limit Order Book (CLOB)')}
          </strong>
          <span>{t('Synthetic snapshot · not live quotes')}</span>
        </div>
        <svg viewBox="0 0 680 350" className="ob-svg" role="img" aria-label={t('Order book anatomy showing asks above spread and bids below')}>
          <rect x="16" y="14" width="384" height="128" rx="8" className="ob-panel-ask" />
          <text x="30" y="34" fontSize="12" fontWeight="700" className="ob-txt-ask">
            {t('ASKS (Resting Sell Limits)')}
          </text>
          {asks.map((row, idx) => {
            const y = 46 + idx * 30;
            return (
              <g key={row.price}>
                <rect x="28" y={y} width={row.w} height="22" rx="4" className="ob-bar-ask" />
                <text x="36" y={y + 15} fontSize="13" fontWeight={row.inside ? '700' : '500'}>
                  {row.price}
                </text>
                <text x="234" y={y + 15} fontSize="13" textAnchor="end">
                  {row.size}
                </text>
                {row.inside && (
                  <text x="250" y={y + 15} fontSize="11.5" fontWeight="700" className="ob-txt-ask">
                    {t('Best Ask (Inside Offer)')}
                  </text>
                )}
              </g>
            );
          })}

          <rect x="16" y="150" width="384" height="44" rx="8" className="ob-panel-spread" />
          <text x="32" y="176" fontSize="12.5" fontWeight="700" className="ob-txt-amber">
            {t('SPREAD: $0.25 (1 tick)')}
          </text>
          <text x="210" y="176" fontSize="12.5" fontWeight="600">
            {t('MID-PRICE: $99.875')}
          </text>

          <rect x="16" y="202" width="384" height="128" rx="8" className="ob-panel-bid" />
          {bids.map((row, idx) => {
            const y = 216 + idx * 30;
            return (
              <g key={row.price}>
                <rect x="28" y={y} width={row.w} height="22" rx="4" className="ob-bar-bid" />
                <text x="36" y={y + 15} fontSize="13" fontWeight={row.inside ? '700' : '500'}>
                  {row.price}
                </text>
                <text x="234" y={y + 15} fontSize="13" textAnchor="end">
                  {row.size}
                </text>
                {row.inside && (
                  <text x="250" y={y + 15} fontSize="11.5" fontWeight="700" className="ob-txt-bid">
                    {t('Best Bid (Inside Bid)')}
                  </text>
                )}
              </g>
            );
          })}
          <text x="30" y="320" fontSize="12" fontWeight="700" className="ob-txt-bid">
            {t('No resting limit rests at mid')}
          </text>

          <rect x="420" y="14" width="244" height="316" rx="8" className="ob-panel-card" />
          <text x="436" y="42" fontSize="13.5" fontWeight="700">
            {t('How Prices Sort')}
          </text>
          <text x="436" y="76" fontSize="12.5">
            {t('• Asks sort lowest → highest up the ladder.')}
          </text>
          <text x="436" y="106" fontSize="12.5">
            {t('• Bids sort highest → lowest down the ladder.')}
          </text>
          <text x="436" y="136" fontSize="12.5">
            {t('• Market buys lift Best Ask first.')}
          </text>
          <text x="436" y="166" fontSize="12.5">
            {t('• Market sells hit Best Bid first.')}
          </text>
          <line x1="436" y1="210" x2="648" y2="210" className="ob-grid-line" />
          <text x="436" y="242" fontSize="12.5" fontWeight="600" className="ob-txt-amber">
            {t('Tick Increment = $0.25')}
          </text>
          <text x="436" y="272" fontSize="12">
            {t('Resting limits wait as Makers until matched.')}
          </text>
        </svg>
        <figcaption>
          {t('Resting asks stack upward from the lowest offer ($100.00), while bids stack downward from the highest bid ($99.75). The inside gap is the quoted spread.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'matching-animation') {
    const ask100Left = matchStep >= 2 ? 0 : 100;
    const ask10025Left = matchStep >= 3 ? 50 : 100;
    const stepDescriptions = [
      'Step 0: Resting quotes sit idle (Best Ask $100.00 = 100 units).',
      'Step 1: Urgent Market Buy for 150 units enters as a liquidity Taker.',
      'Step 2: First 100 units clear $100.00 completely—Best Ask disappears.',
      'Step 3: Final 50 units fill at $100.25; Best Ask shifts up with 50 left.',
    ];
    return (
      <figure className="ob-figure" data-order-book-figure="matching-animation">
        <div className="ob-figure-head">
          <strong className="ob-head-title">
            <Activity size={15} aria-hidden="true" />
            {t('Order Matching Engine: Taker Consuming Makers')}
          </strong>
          <span>{t('Animated matching sequence')}</span>
        </div>

        {!staticOnly && (
          <div className="ob-controls" role="group" aria-label={t('Matching playback controls')}>
            <button type="button" onClick={() => setPlaying((p) => !p)} aria-pressed={playing} disabled={reducedMotion}>
              {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
              <span>{t(playing ? 'Pause' : 'Play')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setMatchStep((s) => (s >= 3 ? 0 : s + 1));
              }}
            >
              <StepForward size={14} aria-hidden="true" />
              <span>{t('Step')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setMatchStep(0);
              }}
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>{t('Reset')}</span>
            </button>
          </div>
        )}

        <svg viewBox="0 0 680 230" className="ob-svg" role="img" aria-label={t('Animated market buy matching against resting asks')}>
          <rect x="20" y="40" width="200" height="130" rx="8" className="ob-panel-card" />
          <text x="34" y="68" fontSize="13" fontWeight="700" className="ob-txt-bid">
            {t('Market Buy: 150 units')}
          </text>
          <text x="34" y="98" fontSize="12">
            {t(matchStep === 0 ? 'Waiting to cross spread' : matchStep < 3 ? 'Crossing spread now →' : 'Filled 150 · Avg $100.083')}
          </text>
          <rect
            x={matchStep === 0 ? 34 : matchStep === 1 ? 150 : 250}
            y="124"
            width="130"
            height="28"
            rx="6"
            className={matchStep >= 1 ? 'ob-pill-active' : 'ob-pill-idle'}
          />
          <text x={matchStep === 0 ? 99 : matchStep === 1 ? 215 : 315} y="142" fontSize="12" fontWeight="700" textAnchor="middle">
            {matchStep >= 3 ? '0 ' + t('left') : `${matchStep === 2 ? 50 : 150} ${t('left')}`}
          </text>

          <rect x="370" y="24" width="290" height="84" rx="8" className="ob-panel-ask" />
          <text x="386" y="50" fontSize="13" fontWeight="700">
            Ask $100.25
          </text>
          <rect x="386" y="64" width={ask10025Left * 2.2} height="24" rx="4" className="ob-bar-ask" />
          <text x="640" y="81" fontSize="13" fontWeight="700" textAnchor="end">
            {ask10025Left} / 100
          </text>

          <rect x="370" y="120" width="290" height="84" rx="8" className={ask100Left === 0 ? 'ob-panel-cleared' : 'ob-panel-ask'} />
          <text x="386" y="146" fontSize="13" fontWeight="700">
            Ask $100.00
          </text>
          <rect x="386" y="160" width={ask100Left * 2.2} height="24" rx="4" className="ob-bar-ask" />
          <text x="640" y="177" fontSize="13" fontWeight="700" textAnchor="end">
            {ask100Left === 0 ? t('CLEARED') : `${ask100Left} / 100`}
          </text>

          <text x="370" y="222" fontSize="12" fontWeight="700" className="ob-txt-amber">
            {t(matchStep >= 2 ? 'New Best Ask: $100.25' : 'Current Best Ask: $100.00')}
          </text>
        </svg>
        <p className="ob-step-caption" role="status">
          {t(stepDescriptions[matchStep])}
        </p>
        <figcaption>
          {t('A 150-unit market buy empties the entire $100.00 ask queue (100 units) and walks into $100.25 (50 units), leaving $100.25 as the new Best Ask at 50 remaining units.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'depth-dom-pair') {
    const bids = syntheticOrderBooks[depthBook].bids;
    const asks = [...syntheticOrderBooks[depthBook].asks].reverse();
    const maxCum = Math.max(
      depthData.bidCurve.at(-1)?.cumulative || 1,
      depthData.askCurve.at(-1)?.cumulative || 1,
    );
    return (
      <figure className="ob-figure" data-order-book-figure="depth-dom-pair">
        <div className="ob-figure-head">
          <strong className="ob-head-title">
            <Layers size={15} aria-hidden="true" />
            {t('DOM Price Ladder vs. Cumulative Depth Chart')}
          </strong>
          <span>{t('Two views of the same book')}</span>
        </div>

        {!staticOnly && (
          <div className="ob-controls">
            <button type="button" aria-pressed={depthBook === 'deep'} onClick={() => setDepthBook('deep')}>
              {t('Deep Book (Symmetric)')}
            </button>
            <button type="button" aria-pressed={depthBook === 'thin'} onClick={() => setDepthBook('thin')}>
              {t('Thin / Gapped Book')}
            </button>
            <button
              type="button"
              onClick={() => setDepthFocus((prev) => (prev === 'both' ? 'chart' : prev === 'chart' ? 'ladder' : 'both'))}
            >
              {t(depthFocus === 'both' ? 'Showing Both Views' : depthFocus === 'chart' ? 'Focus: Depth Chart' : 'Focus: DOM Ladder')}
            </button>
          </div>
        )}

        <div className={`ob-split-grid ${depthFocus !== 'both' ? 'ob-split-single' : ''}`}>
          {depthFocus !== 'chart' && (
            <div className="ob-dom-ladder" aria-label={t('DOM vertical ladder')}>
              <div className="ob-dom-head">
                <span>{t('Bid Qty')}</span>
                <span>{t('Price')}</span>
                <span>{t('Ask Qty')}</span>
              </div>
              {asks.map((a) => (
                <div className="ob-dom-row ob-dom-ask" key={`a-${a.price}`}>
                  <span />
                  <span className="ob-num">${a.price.toFixed(2)}</span>
                  <span className="ob-num ob-txt-ask">{a.size}</span>
                </div>
              ))}
              {bids.map((b) => (
                <div className="ob-dom-row ob-dom-bid" key={`b-${b.price}`}>
                  <span className="ob-num ob-txt-bid">{b.size}</span>
                  <span className="ob-num">${b.price.toFixed(2)}</span>
                  <span />
                </div>
              ))}
            </div>
          )}

          {depthFocus !== 'ladder' && (
            <svg viewBox="0 0 360 220" className="ob-svg" role="img" aria-label={t('Cumulative bid and ask depth curve')}>
              <line x1="20" y1="190" x2="340" y2="190" className="ob-grid-line" />
              <line x1="180" y1="20" x2="180" y2="190" className="ob-grid-line" />
              {depthData.bidCurve.map((pt, i) => {
                const h = Math.max(8, (pt.cumulative / maxCum) * 140);
                const x = 160 - i * 30;
                return <rect key={`cb-${pt.price}`} x={x - 24} y={190 - h} width="26" height={h} className="ob-bar-bid" rx="2" />;
              })}
              {depthData.askCurve.map((pt, i) => {
                const h = Math.max(8, (pt.cumulative / maxCum) * 140);
                const x = 190 + i * 30;
                return <rect key={`ca-${pt.price}`} x={x} y={190 - h} width="26" height={h} className="ob-bar-ask" rx="2" />;
              })}
              <text x="95" y="210" fontSize="12" textAnchor="middle" className="ob-txt-bid">
                {t('Cumulative Bids')}
              </text>
              <text x="265" y="210" fontSize="12" textAnchor="middle" className="ob-txt-ask">
                {t('Cumulative Asks')}
              </text>
            </svg>
          )}
        </div>
        <figcaption>
          {t('Switch between the Deep and Thin presets to see how a thin book leaves empty price gaps on the DOM ladder and creates flat shelves on the cumulative depth curve.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'data-tiers') {
    const mboTickets = [
      { id: 'ID #94012', size: 1400, time: '09:30:01.004' },
      { id: 'ID #94088', size: 450, time: '09:30:01.019' },
      { id: 'ID #94112', size: 150, time: '09:30:01.087' },
    ];
    return (
      <figure className="ob-figure" data-order-book-figure="data-tiers">
        <div className="ob-figure-head">
          <strong className="ob-head-title">
            <Database size={15} aria-hidden="true" />
            {t('Level 1 vs. Level 2 vs. Level 3 (MBO) Data Inspector')}
          </strong>
          <span>{t('Same $100.00 Ask · 3 Resolutions')}</span>
        </div>

        {!staticOnly && (
          <div className="ob-controls">
            <button type="button" aria-pressed={dataTier === 1} onClick={() => setDataTier(1)}>
              {t('Level 1 (Top Quote)')}
            </button>
            <button type="button" aria-pressed={dataTier === 2} onClick={() => setDataTier(2)}>
              {t('Level 2 (Aggregated MBP)')}
            </button>
            <button type="button" aria-pressed={dataTier === 3} onClick={() => setDataTier(3)}>
              {t('Level 3 (MBO Queue)')}
            </button>
          </div>
        )}

        <div className="ob-tier-grid">
          <div className={`ob-tier-card ${dataTier === 1 ? 'ob-tier-active' : ''}`}>
            <strong>L1: {t('Best Quote Only')}</strong>
            <p>Best Ask: $100.00 × 2,000</p>
            <small>{t('Hides stacked tiers behind $100.00.')}</small>
          </div>
          <div className={`ob-tier-card ${dataTier === 2 ? 'ob-tier-active' : ''}`}>
            <strong>L2: {t('Market by Price')}</strong>
            <ul>
              <li>$100.50 → 1,200 {t('total')}</li>
              <li>$100.25 → 950 {t('total')}</li>
              <li>$100.00 → 2,000 {t('total')}</li>
            </ul>
            <small>{t('Cannot tell 1 large ticket from 20 small ones.')}</small>
          </div>
          <div className={`ob-tier-card ${dataTier === 3 ? 'ob-tier-active' : ''}`}>
            <strong>L3 MBO: {t('Individual Order IDs')}</strong>
            <ul>
              {mboTickets.map((item) => (
                <li key={item.id}>
                  <code>{item.id}</code>: {item.size} ({item.time})
                </li>
              ))}
            </ul>
            <small>{t('Reveals exact FIFO queue sequence & cancels.')}</small>
          </div>
        </div>
        <figcaption>
          {t('Level 2 compresses three separate resting sellers at $100.00 into one 2,000-unit number, while Level 3 MBO exposes individual Order IDs and timestamps.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'queue-simulator') {
    return (
      <figure className="ob-figure" data-order-book-figure="queue-simulator">
        <div className="ob-figure-head">
          <strong className="ob-head-title">
            <ListOrdered size={15} aria-hidden="true" />
            {t('FIFO (Price-Time) vs. Pro-Rata Allocation')}
          </strong>
          <span>{t('At $99.75 Best Bid (400 resting)')}</span>
        </div>

        {!staticOnly && (
          <div className="ob-fields">
            <label>
              <span>{t('Incoming Market Sell Size')}: {queueIncoming}</span>
              <input
                type="range"
                min={40}
                max={400}
                step={20}
                value={queueIncoming}
                onChange={(e) => setQueueIncoming(Number(e.target.value))}
              />
            </label>
          </div>
        )}

        <div className="ob-table-scroll">
          <table>
            <thead>
              <tr>
                <th>{t('Ticket')}</th>
                <th>{t('Posted Qty')}</th>
                <th>{t('FIFO Fill')}</th>
                <th>{t('Pro-Rata Fill')}</th>
              </tr>
            </thead>
            <tbody>
              {queueRows.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.posted}</td>
                  <td>{r.fifoFill}</td>
                  <td>{r.proRataFill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption>
          {t('Under FIFO, earliest ticket #A1 fills completely before #C3 receives a single unit. Under Pro-Rata, #C3 captures a proportional share immediately despite arriving last.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'book-walker') {
    return (
      <figure className="ob-figure" data-order-book-figure="book-walker">
        <div className="ob-figure-head">
          <strong className="ob-head-title">
            <Scale size={15} aria-hidden="true" />
            {t('Order Book Walker & Slippage Calculator')}
          </strong>
          <span>{t('Synthetic book arithmetic')}</span>
        </div>

        {!staticOnly && (
          <div className="ob-controls">
            <button type="button" aria-pressed={walkBookKey === 'deep'} onClick={() => setWalkBookKey('deep')}>
              {t('Deep Book (Symmetric)')}
            </button>
            <button type="button" aria-pressed={walkBookKey === 'thin'} onClick={() => setWalkBookKey('thin')}>
              {t('Thin / Gapped Book')}
            </button>
            <button type="button" aria-pressed={walkSide === 'buy'} onClick={() => setWalkSide('buy')}>
              {t('Market Buy')}
            </button>
            <button type="button" aria-pressed={walkSide === 'sell'} onClick={() => setWalkSide('sell')}>
              {t('Market Sell')}
            </button>
          </div>
        )}

        {!staticOnly && (
          <div className="ob-fields">
            <label>
              <span>{t('Order Size')} ({walkSize} units)</span>
              <input
                type="number"
                min={10}
                max={600}
                step={10}
                value={walkSize}
                onChange={(e) => setWalkSize(Math.max(10, Math.min(2000, Number(e.target.value) || 10)))}
                aria-label={t('Order size')}
              />
            </label>
          </div>
        )}

        {walkResult && (
          <>
            <div className="ob-table-scroll">
              <table>
                <caption className="sr-only">{t('Order Book Walk Breakdown')}</caption>
                <thead>
                  <tr>
                    <th>{t('Price')}</th>
                    <th>{t('Available')}</th>
                    <th>{t('Filled')}</th>
                    <th>{t('Remaining')}</th>
                  </tr>
                </thead>
                <tbody>
                  {walkResult.fills.map((lvl) => (
                    <tr key={lvl.price}>
                      <td>${lvl.price.toFixed(2)}</td>
                      <td>{lvl.available}</td>
                      <td>{lvl.filled}</td>
                      <td>{lvl.remaining}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="ob-kpi-grid">
              <div>
                <dt>{t('Weighted Avg Fill')}</dt>
                <dd>{walkResult.averageFill !== null ? `$${walkResult.averageFill.toFixed(4)}` : '—'}</dd>
              </div>
              <div>
                <dt>{t('Last Print')}</dt>
                <dd>{walkResult.lastPrint !== null ? `$${walkResult.lastPrint.toFixed(2)}` : '—'}</dd>
              </div>
              <div>
                <dt>{t('Book-Walk Slippage')}</dt>
                <dd>
                  {walkResult.slippage !== null
                    ? `$${walkResult.slippage.toFixed(4)} (${walkResult.slippageTicks?.toFixed(2)} ${t('ticks')})`
                    : '—'}
                </dd>
              </div>
              <div>
                <dt>{t('Unfilled')}</dt>
                <dd>{walkResult.unfilled}</dd>
              </div>
            </dl>
          </>
        )}
        <figcaption>
          {t('Experiment with Deep vs. Thin liquidity and order size to observe how average execution deviates from the screen inside quote.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'obi-sandbox') {
    return (
      <figure className="ob-figure" data-order-book-figure="obi-sandbox">
        <div className="ob-figure-head">
          <strong className="ob-head-title">
            <Gauge size={15} aria-hidden="true" />
            {t('Order Book Imbalance (OBI) & Microprice Sandbox')}
          </strong>
          <span>{t('Top-of-Book formula')}</span>
        </div>

        {!staticOnly && (
          <div className="ob-fields">
            <label>
              <span>{t('Best Bid Size ($99.75)')}: {bidSize}</span>
              <input type="range" min={25} max={800} step={25} value={bidSize} onChange={(e) => setBidSize(Number(e.target.value))} />
            </label>
            <label>
              <span>{t('Best Ask Size ($100.00)')}: {askSize}</span>
              <input type="range" min={25} max={800} step={25} value={askSize} onChange={(e) => setAskSize(Number(e.target.value))} />
            </label>
          </div>
        )}

        {obiResult && (
          <dl className="ob-kpi-grid">
            <div>
              <dt>OBI</dt>
              <dd>{obiResult.obi >= 0 ? `+${obiResult.obi.toFixed(2)}` : obiResult.obi.toFixed(2)}</dd>
            </div>
            <div>
              <dt>{t('Mid-Price')}</dt>
              <dd>${obiResult.midPrice.toFixed(4)}</dd>
            </div>
            <div>
              <dt>{t('Weighted Microprice')}</dt>
              <dd>${obiResult.microprice.toFixed(4)}</dd>
            </div>
            <div>
              <dt>{t('Pressure Skew')}</dt>
              <dd>{obiResult.obi === 0 ? t('Neutral') : obiResult.obi > 0 ? t('Bid-heavy') : t('Ask-heavy')}</dd>
            </div>
          </dl>
        )}
        <figcaption>
          {t('OBI is normalized between −1.0 and +1.0, pulling Microprice away from Mid-Price toward the thinner side—yet displayed quotes can cancel instantly.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'heatmap-playback') {
    const isAbsorb = heatmapMode === 'absorption';
    return (
      <figure className="ob-figure" data-order-book-figure="heatmap-playback">
        <div className="ob-figure-head">
          <strong className="ob-head-title">
            <Flame size={15} aria-hidden="true" />
            {t('Order Book Heatmap: Absorption vs. Pulled Wall')}
          </strong>
          <span>{t('Liquidity over Price × Time')}</span>
        </div>

        {!staticOnly && (
          <div className="ob-controls">
            <button type="button" aria-pressed={isAbsorb} onClick={() => setHeatmapMode('absorption')}>
              {t('Scenario: Genuine Absorption')}
            </button>
            <button type="button" aria-pressed={!isAbsorb} onClick={() => setHeatmapMode('pulled')}>
              {t('Scenario: Pulled Mirage Wall')}
            </button>
          </div>
        )}

        <svg viewBox="0 0 680 210" className="ob-svg" role="img" aria-label={t('Price × time heatmap showing resting liquidity bands')}>
          <rect x="20" y="20" width="640" height="170" rx="8" className="ob-panel-card" />
          {/* Time axis guide */}
          <line x1="60" y1="168" x2="620" y2="168" className="ob-grid-line" />
          {/* Persistent or pulled horizontal resting wall at $100.00 */}
          <rect
            x="60"
            y="52"
            width={isAbsorb ? '540' : '310'}
            height="18"
            rx="4"
            className={isAbsorb ? 'ob-heat-bright' : 'ob-heat-fade'}
          />
          {!isAbsorb && <rect x="370" y="52" width="230" height="18" rx="4" className="ob-heat-gone" />}
          <text x="68" y="44" fontSize="12" fontWeight="700">
            {t(isAbsorb ? 'Resting Ask Band @ $100.00 (800 -> reloads 800)' : 'Resting Ask Band @ $100.00 (1,200 -> 0)')}
          </text>
          {/* Price curve approaching $100.00 */}
          <polyline
            fill="none"
            strokeWidth="3"
            className={isAbsorb ? 'ob-line-bid' : 'ob-line-ask'}
            points={isAbsorb ? '70,150 180,130 290,98 370,66 470,84 580,124' : '70,150 180,130 290,98 370,66 480,38 590,28'}
          />
          {isAbsorb && <circle cx="370" cy="66" r="10" className="ob-bubble-absorb" />}
          <text x="386" y="102" fontSize="12" fontWeight="600">
            {t(isAbsorb ? 'Price reaches wall -> absorbed & rejects' : 'Wall pulled -> cancels before touch')}
          </text>
        </svg>
        <figcaption>
          {t('Notice how genuine absorption retains bright intensity and prints heavy volume at $100.00, whereas a pulled wall goes dark right before touch without proving illegal intent.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'iceberg-reload') {
    const remainingTotal = Math.max(0, 1000 - icebergExecutions * 100);
    const visiblePeak = remainingTotal >= 100 ? 100 : remainingTotal;
    const hiddenReserve = Math.max(0, remainingTotal - visiblePeak);
    return (
      <figure className="ob-figure" data-order-book-figure="iceberg-reload">
        <div className="ob-figure-head">
          <strong className="ob-head-title">
            <EyeOff size={15} aria-hidden="true" />
            {t('Iceberg Reserve Order Peak-Reload Simulator')}
          </strong>
          <span>{t('1,000 total · 100 visible peak')}</span>
        </div>

        {!staticOnly && (
          <div className="ob-controls">
            <button
              type="button"
              onClick={() => setIcebergExecutions((c) => Math.min(10, c + 1))}
              disabled={remainingTotal === 0}
            >
              {t('Send 100-Unit Market Buy')}
            </button>
            <button type="button" onClick={() => setIcebergExecutions(0)}>
              {t('Reset')}
            </button>
          </div>
        )}

        <dl className="ob-kpi-grid">
          <div>
            <dt>{t('Visible Ask Peak @ $100.00')}</dt>
            <dd>{visiblePeak} units</dd>
          </div>
          <div>
            <dt>{t('Hidden Reserve Remaining')}</dt>
            <dd>{hiddenReserve} units</dd>
          </div>
          <div>
            <dt>{t('Total Executed on Tape')}</dt>
            <dd>{icebergExecutions * 100} units</dd>
          </div>
        </dl>
        <figcaption>
          {t('Displayed DOM only shows 100 units at a time, yet repeated 100-unit buys exhaust 1,000 contracts because the engine reloads from hidden reserve until reserve hits zero.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'auction-uncross') {
    return (
      <figure className="ob-figure" data-order-book-figure="auction-uncross">
        <div className="ob-figure-head">
          <strong className="ob-head-title">
            <Gavel size={15} aria-hidden="true" />
            {t('Opening / Closing Call Auction Uncross Table')}
          </strong>
          <span>{t('Max Volume Clearing Price')}: ${auctionData.clearingPrice.toFixed(2)}</span>
        </div>
        <div className="ob-table-scroll">
          <table>
            <thead>
              <tr>
                <th>{t('Price')}</th>
                <th>{t('Cum Buy')}</th>
                <th>{t('Cum Sell')}</th>
                <th>{t('Matched')}</th>
                <th>{t('Imbalance')}</th>
              </tr>
            </thead>
            <tbody>
              {auctionData.rows.map((r) => (
                <tr key={r.price} className={r.price === auctionData.clearingPrice ? 'ob-row-highlight' : ''}>
                  <td>${r.price.toFixed(2)}</td>
                  <td>{r.cumBuy}</td>
                  <td>{r.cumSell}</td>
                  <td>
                    <strong>{r.matchedVolume}</strong>
                  </td>
                  <td>{r.imbalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption>
          {t('At $100.00, cumulative buy interest (410) and cumulative sell interest (400) maximize matched volume at 400 shares with minimum remaining imbalance (10 shares).')}
        </figcaption>
      </figure>
    );
  }

  // smc-bridge
  return (
    <figure className="ob-figure" data-order-book-figure="smc-bridge">
      <div className="ob-figure-head">
        <strong className="ob-head-title">
          <Activity size={15} aria-hidden="true" />
          {t('Order Book Mechanics vs. Candlestick Chart Hypotheses')}
        </strong>
        <span>{t('Observed vs. Inferred')}</span>
      </div>
      <svg viewBox="0 0 680 230" className="ob-svg" role="img" aria-label={t('Side by side order book events and candlestick displacement')}>
        <rect x="20" y="20" width="300" height="190" rx="8" className="ob-panel-card" />
        <text x="36" y="46" fontSize="13" fontWeight="700">
          {t('1. Order Book Event (Microstructure)')}
        </text>
        <text x="36" y="76" fontSize="12">
          {t('• Asks above $100.25 thin out or cancel')}
        </text>
        <text x="36" y="104" fontSize="12">
          {t('• Stop-buys trigger above old swing high')}
        </text>
        <text x="36" y="132" fontSize="12">
          {t('• Market buys sweep thin ticks fast')}
        </text>
        <text x="36" y="168" fontSize="11.5" fontWeight="700" className="ob-txt-bid">
          {t('OBSERVED')}: {t('Price range & spread skip')}
        </text>
        <text x="36" y="192" fontSize="11.5" fontWeight="700" className="ob-txt-amber">
          {t('INFERRED')}: {t('Exact stop sizes & actor motives')}
        </text>

        <rect x="350" y="20" width="310" height="190" rx="8" className="ob-panel-card" />
        <text x="366" y="46" fontSize="13" fontWeight="700">
          {t('2. Resulting OHLC Chart Footprint')}
        </text>
        <rect x="405" y="128" width="22" height="46" rx="2" className="ob-bar-bid" />
        <rect x="455" y="72" width="24" height="84" rx="2" className="ob-bar-bid" />
        <rect x="505" y="54" width="22" height="34" rx="2" className="ob-bar-bid" />
        <rect x="405" y="88" width="122" height="40" rx="3" className="ob-fvg-box" />
        <text x="536" y="112" fontSize="11.5" fontWeight="700" className="ob-txt-amber">
          {t('3-Candle FVG')}
        </text>
        <text x="366" y="192" fontSize="12">
          {t('Candles compress fills; they never display the queue.')}
        </text>
      </svg>
      <figcaption>
        {t('Thin resting ask depth can accelerate an OHLC displacement candle, yet candlestick geometry alone cannot reconstruct cancelled quotes or prove resting stop counts.')}
      </figcaption>
    </figure>
  );
}
