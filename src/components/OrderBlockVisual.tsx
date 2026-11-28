import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { computeOrderBlockBoundaries } from '../utils/orderBlockMath';
import { OrderBlockScene } from './OrderBlockScene';
import { OrderBlockExtendedVisual } from './OrderBlockExtendedVisuals';

interface OrderBlockVisualProps {
  visualId: string;
  staticOnly?: boolean;
}

/* 1. Stick-Figure Comic: Warehouse Loading Dock vs. OHLC Reality */
const StickFigureComicVisual: React.FC = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'story' | 'facts'>('story');

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Visual Comic · Plain-English Intuition')}</p>
        <h3>{t('The Warehouse Loading Dock Analogy vs. Verifiable OHLC Facts')}</h3>
      </div>

      <div className="ob-tab-row" role="tablist" aria-label={t('Comic mode')}>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'story'}
          className={`ob-tab-btn${mode === 'story' ? ' is-active' : ''}`}
          onClick={() => setMode('story')}
        >
          {t('Story Analogy (3 Panels)')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'facts'}
          className={`ob-tab-btn${mode === 'facts' ? ' is-active' : ''}`}
          onClick={() => setMode('facts')}
        >
          {t('What Candles Actually Prove')}
        </button>
      </div>

      <svg
        viewBox="0 0 690 250"
        className="ob-svg-stage"
        role="img"
        aria-label={t('Three-panel stick-figure comic explaining Order Block origin, departure, and mitigation')}
      >
        <rect x="0" y="0" width="690" height="250" fill="var(--ob-stage-bg)" rx="8" />

        {/* Panel 1 */}
        <rect x="14" y="16" width="210" height="218" fill="var(--ob-surface)" stroke="var(--ob-border)" rx="8" />
        <text x="119" y="36" textAnchor="middle" className="ob-comic-head">
          {t('1. Last Down Run (Origin)')}
        </text>
        {/* Warehouse Dock Box */}
        <rect x="34" y="128" width="94" height="44" fill="var(--ob-ochre-soft)" stroke="var(--ob-ochre)" strokeWidth="1.6" rx="4" />
        <text x="81" y="153" textAnchor="middle" className="ob-svg-tag-ochre">
          {mode === 'story' ? t('Loading Dock') : t('Run 106->101')}
        </text>
        {/* Stick Figure Foreman */}
        <circle cx="164" cy="112" r="10" fill="none" stroke="var(--ob-ink)" strokeWidth="2.2" />
        <line x1="164" y1="122" x2="164" y2="152" stroke="var(--ob-ink)" strokeWidth="2.2" />
        <line x1="164" y1="132" x2="142" y2="142" stroke="var(--ob-ink)" strokeWidth="2.2" />
        <line x1="164" y1="132" x2="184" y2="124" stroke="var(--ob-ink)" strokeWidth="2.2" />
        <line x1="164" y1="152" x2="150" y2="174" stroke="var(--ob-ink)" strokeWidth="2.2" />
        <line x1="164" y1="152" x2="178" y2="174" stroke="var(--ob-ink)" strokeWidth="2.2" />
        {/* Speech Bubble */}
        <rect x="28" y="50" width="182" height="44" fill="var(--ob-surface-alt)" stroke="var(--ob-border)" rx="6" />
        <text x="119" y="69" textAnchor="middle" className="ob-comic-note">
          {mode === 'story' ? t('"Boxes staged at 101–106!"') : t('Three down-close candles')}
        </text>
        <text x="119" y="84" textAnchor="middle" className="ob-comic-note">
          {mode === 'story' ? t('Before the fast launch') : t('Sweep low 99.0 first')}
        </text>
        <text x="119" y="216" textAnchor="middle" className="ob-comic-note">
          {mode === 'story' ? t('Mark Open 106 & Low 99') : t('Observable OHLC only')}
        </text>

        {/* Panel 2 */}
        <rect x="240" y="16" width="210" height="218" fill="var(--ob-surface)" stroke="var(--ob-border)" rx="8" />
        <text x="345" y="36" textAnchor="middle" className="ob-comic-head">
          {t('2. Fast Departure + MSS')}
        </text>
        {/* Ascending emerald bars */}
        <rect x="264" y="138" width="22" height="36" fill="var(--ob-ochre)" rx="2" />
        <rect x="296" y="102" width="22" height="62" fill="var(--ob-emerald-bright)" rx="2" />
        <rect x="328" y="72" width="22" height="48" fill="var(--ob-emerald-bright)" rx="2" />
        <line x1="254" y1="98" x2="436" y2="98" stroke="var(--ob-indigo)" strokeWidth="1.4" strokeDasharray="4 3" />
        <text x="392" y="92" textAnchor="middle" className="ob-svg-tag-indigo">
          {t('Swing 109')}
        </text>
        {/* Excited Stick Figure */}
        <circle cx="398" cy="126" r="10" fill="none" stroke="var(--ob-emerald)" strokeWidth="2.2" />
        <line x1="398" y1="136" x2="398" y2="162" stroke="var(--ob-emerald)" strokeWidth="2.2" />
        <line x1="398" y1="146" x2="378" y2="128" stroke="var(--ob-emerald)" strokeWidth="2.2" />
        <line x1="398" y1="146" x2="418" y2="128" stroke="var(--ob-emerald)" strokeWidth="2.2" />
        <line x1="398" y1="162" x2="386" y2="180" stroke="var(--ob-emerald)" strokeWidth="2.2" />
        <line x1="398" y1="162" x2="410" y2="180" stroke="var(--ob-emerald)" strokeWidth="2.2" />
        <text x="345" y="200" textAnchor="middle" className="ob-comic-note">
          {mode === 'story' ? t('Truck speeds out past 109!') : t('Close 108 (CISD) -> 111 (MSS)')}
        </text>
        <text x="345" y="216" textAnchor="middle" className="ob-comic-note">
          {mode === 'story' ? t('No displacement = No OB') : t('Verified only after departure')}
        </text>

        {/* Panel 3 */}
        <rect x="466" y="16" width="210" height="218" fill="var(--ob-surface)" stroke="var(--ob-border)" rx="8" />
        <text x="571" y="36" textAnchor="middle" className="ob-comic-head">
          {t('3. Return & Mitigation')}
        </text>
        {/* Zone Band */}
        <rect x="480" y="128" width="182" height="36" fill="var(--ob-emerald-soft)" stroke="var(--ob-emerald)" strokeWidth="1.4" rx="3" />
        <line x1="480" y1="146" x2="662" y2="146" stroke="var(--ob-ochre)" strokeWidth="1.4" strokeDasharray="4 3" />
        <text x="571" y="142" textAnchor="middle" className="ob-svg-tag-ochre">
          {t('50% MT 103.5')}
        </text>
        {/* Return & Bounce path */}
        <polyline
          points="496,74 532,102 566,144 606,96 644,64"
          fill="none"
          stroke="var(--ob-emerald)"
          strokeWidth="2.6"
        />
        <circle cx="566" cy="144" r="5" fill="var(--ob-ochre)" />
        {/* Calm Stick Figure with Clipboard */}
        <circle cx="628" cy="148" r="8.5" fill="none" stroke="var(--ob-ink)" strokeWidth="2" />
        <line x1="628" y1="157" x2="628" y2="178" stroke="var(--ob-ink)" strokeWidth="2" />
        <line x1="628" y1="164" x2="612" y2="160" stroke="var(--ob-ink)" strokeWidth="2" />
        <line x1="628" y1="164" x2="642" y2="170" stroke="var(--ob-ink)" strokeWidth="2" />
        <line x1="628" y1="178" x2="618" y2="194" stroke="var(--ob-ink)" strokeWidth="2" />
        <line x1="628" y1="178" x2="638" y2="194" stroke="var(--ob-ink)" strokeWidth="2" />
        <text x="571" y="208" textAnchor="middle" className="ob-comic-note">
          {mode === 'story' ? t('Price revisits dock -> Measure reaction') : t('Hold = Bounce · Close < 99 = Fail')}
        </text>
        <text x="571" y="222" textAnchor="middle" className="ob-comic-note">
          {mode === 'story' ? t('Analogy only, not order-book proof') : t('No hidden book data assumed')}
        </text>
      </svg>

      <figcaption className="ob-visual-caption">
        {t('Toggle between the Warehouse Loading Dock memory aid and strictly observable OHLC facts. Charts display executed price candles, not live resting order-book queues.')}
      </figcaption>
    </figure>
  );
};

/* 2. Animated 5-Step Departure Sequence */
const DEPARTURE_CANDLES = [
  { id: 'T1', open: 108.0, high: 109.0, low: 105.6, close: 106.0, role: 'approach' },
  { id: 'T2', open: 106.0, high: 107.0, low: 103.6, close: 104.0, role: 'ob' },
  { id: 'T3', open: 104.0, high: 104.6, low: 101.6, close: 102.0, role: 'ob' },
  { id: 'T4', open: 102.0, high: 102.5, low: 99.0, close: 101.0, role: 'ob' },
  { id: 'T5', open: 101.0, high: 108.6, low: 100.8, close: 108.0, role: 'cisd' },
  { id: 'T6', open: 108.0, high: 112.0, low: 107.5, close: 111.0, role: 'mss' },
  { id: 'T7', open: 111.0, high: 111.4, low: 105.6, close: 107.8, role: 'mit' },
  { id: 'T8', open: 107.8, high: 114.2, low: 107.4, close: 113.6, role: 'exp' },
];

const DEPARTURE_STAGES = [
  { count: 1, title: 'Step 1 · Approach into Reference Low (100.0)', note: 'Price slides down toward the resting low at 100.0. No order block exists yet.' },
  { count: 4, title: 'Step 2 · Liquidity Sweep (99.0) & Down-Close Run', note: 'Three consecutive down-close candles (T2–T4) dip to 99.0, sweeping below 100.0.' },
  { count: 5, title: 'Step 3 · Displacement Close Above 106.0 (CISD)', note: 'T5 prints a strong up-close at 108.0 above the run opening (106.0), marking CISD.' },
  { count: 6, title: 'Step 4 · External Swing Break Above 109.0 (MSS)', note: 'T6 closes at 111.0 beyond the 109.0 swing reference, verifying the Bullish OB (99–107).' },
  { count: 8, title: 'Step 5 · First Return & Mitigation Response', note: 'T7 dips into the OB opening (106.0) and closes at 107.8; T8 expands cleanly to 113.6.' },
];

const DepartureSequenceAnim: React.FC<{ staticOnly?: boolean }> = ({ staticOnly }) => {
  const { t } = useTranslation();
  const [stage, setStage] = useState<number>(4);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!playing || staticOnly) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false);
      return;
    }
    const id = window.setInterval(() => {
      setStage((prev) => {
        if (prev >= DEPARTURE_STAGES.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, staticOnly]);

  const current = DEPARTURE_STAGES[stage];
  const visible = DEPARTURE_CANDLES.slice(0, current.count);
  const w = 680;
  const h = 266;
  const padL = 56;
  const padR = 24;
  const padT = 24;
  const padB = 34;
  const mapY = (p: number) => padT + ((116 - p) / 20) * (h - padT - padB);
  const colW = (w - padL - padR) / DEPARTURE_CANDLES.length;

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Animated Sequence · Step-by-Step Formation')}</p>
        <h3>{t('The 5-Step Bullish Order Block Departure & Mitigation Player')}</h3>
      </div>

      <div className="ob-toolbar-split">
        <div className="ob-control-group">
          <button
            type="button"
            className="ob-ctrl-btn"
            onClick={() => { setPlaying(false); setStage((s) => (s + DEPARTURE_STAGES.length - 1) % DEPARTURE_STAGES.length); }}
            aria-label={t('Previous step')}
          >
            <SkipBack size={15} />
          </button>
          <button
            type="button"
            className="ob-ctrl-btn is-primary"
            onClick={() => {
              if (!playing && stage >= DEPARTURE_STAGES.length - 1) setStage(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button
            type="button"
            className="ob-ctrl-btn"
            onClick={() => { setPlaying(false); setStage((s) => (s + 1) % DEPARTURE_STAGES.length); }}
            aria-label={t('Next step')}
          >
            <SkipForward size={15} />
          </button>
          <button
            type="button"
            className="ob-ctrl-btn"
            onClick={() => { setPlaying(false); setStage(0); }}
            aria-label={t('Reset')}
          >
            <RotateCcw size={15} />
          </button>
        </div>
        <span className="ob-hud-step ob-num">{t(current.title)}</span>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="ob-svg-stage" role="img" aria-label={t('5-step Order Block formation animation')}>
        <rect x="0" y="0" width={w} height={h} fill="var(--ob-stage-bg)" rx="8" />
        {[98, 100, 103.5, 106, 109, 112, 115].map((p) => (
          <g key={p}>
            <line x1={padL} y1={mapY(p)} x2={w - padR} y2={mapY(p)} stroke="var(--ob-grid)" strokeDasharray="3 4" />
            <text x={padL - 8} y={mapY(p) + 4} textAnchor="end" className="ob-svg-axis">{p}</text>
          </g>
        ))}

        {/* Prior resting low 100.0 */}
        <line x1={padL} y1={mapY(100)} x2={w - padR} y2={mapY(100)} stroke="var(--ob-rose)" strokeWidth="1.2" strokeDasharray="4 3" />
        <text x={padL + 6} y={mapY(100) + 12} className="ob-svg-tag-rose">{t('Prior Low 100.0 (Swept at 99.0)')}</text>

        {/* OB zone after step 2 */}
        {stage >= 1 && (
          <g>
            <rect
              x={padL + colW * 1}
              y={mapY(106)}
              width={w - padR - (padL + colW * 1)}
              height={mapY(101) - mapY(106)}
              fill="var(--ob-emerald-soft)"
              stroke="var(--ob-emerald)"
              strokeWidth="1.3"
            />
            <line x1={padL + colW * 1} y1={mapY(103.5)} x2={w - padR} y2={mapY(103.5)} stroke="var(--ob-ochre)" strokeWidth="1.3" strokeDasharray="5 4" />
            <text x={w - padR - 6} y={mapY(106) - 4} textAnchor="end" className="ob-svg-tag">{t('OB Body 101–106 · Open 106')}</text>
          </g>
        )}

        {/* Swing 109 */}
        {stage >= 2 && (
          <g>
            <line x1={padL} y1={mapY(109)} x2={w - padR} y2={mapY(109)} stroke="var(--ob-indigo)" strokeWidth="1.3" strokeDasharray="5 3" />
            <text x={w - padR - 6} y={mapY(109) - 5} textAnchor="end" className="ob-svg-tag-indigo">{t('Swing Ref 109.0 (MSS)')}</text>
          </g>
        )}

        {visible.map((c, idx) => {
          const cx = padL + idx * colW + colW / 2;
          const up = c.close >= c.open;
          const fill = c.role === 'ob' ? 'var(--ob-ochre)' : up ? 'var(--ob-emerald-bright)' : 'var(--ob-rose)';
          return (
            <g key={c.id}>
              <line x1={cx} y1={mapY(c.high)} x2={cx} y2={mapY(c.low)} stroke="var(--ob-wick)" strokeWidth="1.8" />
              <rect
                x={cx - 12}
                y={mapY(Math.max(c.open, c.close))}
                width="24"
                height={Math.max(5, mapY(Math.min(c.open, c.close)) - mapY(Math.max(c.open, c.close)))}
                fill={fill}
                rx="2.5"
              />
              <text x={cx} y={h - 12} textAnchor="middle" className="ob-svg-axis">{c.id}</text>
            </g>
          );
        })}
      </svg>

      <figcaption className="ob-visual-caption">{t(current.note)}</figcaption>
    </figure>
  );
};

/* 3. Single Candle vs. Consecutive Run vs. Full Wick Explorer */
const RUN_CANDLES = [
  { id: 'A', open: 106.0, high: 107.0, low: 103.6, close: 104.0 },
  { id: 'B', open: 104.0, high: 104.6, low: 101.6, close: 102.0 },
  { id: 'C', open: 102.0, high: 102.5, low: 99.0, close: 101.0 },
];

const SingleVsRunExplorer: React.FC = () => {
  const { t } = useTranslation();
  const [rule, setRule] = useState<'run-body' | 'single-c' | 'run-full'>('run-body');

  const selected = rule === 'single-c' ? [RUN_CANDLES[2]] : RUN_CANDLES;
  const bounds = computeOrderBlockBoundaries(selected, 'bullish');

  const zoneHigh = rule === 'run-full' ? bounds.fullHigh : bounds.bodyHigh;
  const zoneLow = rule === 'run-full' ? bounds.fullLow : bounds.bodyLow;
  const activeMt = rule === 'run-full' ? bounds.fullMeanThreshold : bounds.bodyMeanThreshold;

  const w = 680;
  const h = 248;
  const mapY = (p: number) => 22 + ((109 - p) / 11.5) * (h - 54);

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Interactive Comparator · Selection Rule Impact')}</p>
        <h3>{t('Single Candle (C) vs. Consecutive 3-Candle Run (A–C) Boundaries')}</h3>
      </div>

      <div className="ob-tab-row" role="tablist" aria-label={t('Selection rule')}>
        <button type="button" role="tab" aria-selected={rule === 'run-body'} className={`ob-tab-btn${rule === 'run-body' ? ' is-active' : ''}`} onClick={() => setRule('run-body')}>
          {t('Consecutive Run Bodies (101–106)')}
        </button>
        <button type="button" role="tab" aria-selected={rule === 'single-c'} className={`ob-tab-btn${rule === 'single-c' ? ' is-active' : ''}`} onClick={() => setRule('single-c')}>
          {t('Single Last Candle C (101–102)')}
        </button>
        <button type="button" role="tab" aria-selected={rule === 'run-full'} className={`ob-tab-btn${rule === 'run-full' ? ' is-active' : ''}`} onClick={() => setRule('run-full')}>
          {t('Full Wick Envelope (99–107)')}
        </button>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="ob-svg-stage" role="img" aria-label={t('Order block selection rule comparison diagram')}>
        <rect x="0" y="0" width={w} height={h} fill="var(--ob-stage-bg)" rx="8" />
        {[99, 101, 102, 103.5, 106, 107].map((p) => (
          <g key={p}>
            <line x1="56" y1={mapY(p)} x2="656" y2={mapY(p)} stroke="var(--ob-grid)" strokeDasharray="3 4" />
            <text x="48" y={mapY(p) + 4} textAnchor="end" className="ob-svg-axis">{p}</text>
          </g>
        ))}

        {/* Active highlighted box */}
        <rect
          x={rule === 'single-c' ? 248 : 88}
          y={mapY(zoneHigh)}
          width={rule === 'single-c' ? 408 : 568}
          height={Math.max(8, mapY(zoneLow) - mapY(zoneHigh))}
          fill="var(--ob-emerald-soft)"
          stroke="var(--ob-emerald)"
          strokeWidth="1.6"
        />
        <line
          x1={rule === 'single-c' ? 248 : 88}
          y1={mapY(activeMt)}
          x2="656"
          y2={mapY(activeMt)}
          stroke="var(--ob-ochre)"
          strokeWidth="1.6"
          strokeDasharray="5 4"
        />
        <text x="648" y={mapY(zoneHigh) - 5} textAnchor="end" className="ob-svg-tag">
          {t('Active Proximal')}: {zoneHigh.toFixed(1)}
        </text>
        <text x="648" y={mapY(activeMt) - 4} textAnchor="end" className="ob-svg-tag-ochre">
          {t('50% MT')}: {activeMt.toFixed(2)}
        </text>

        {RUN_CANDLES.map((c, idx) => {
          const cx = 130 + idx * 80;
          const active = rule !== 'single-c' || c.id === 'C';
          return (
            <g key={c.id} opacity={active ? 1 : 0.42}>
              <line x1={cx} y1={mapY(c.high)} x2={cx} y2={mapY(c.low)} stroke="var(--ob-wick)" strokeWidth="2" />
              <rect
                x={cx - 16}
                y={mapY(c.open)}
                width="32"
                height={Math.max(6, mapY(c.close) - mapY(c.open))}
                fill="var(--ob-ochre)"
                rx="3"
              />
              <text x={cx} y={h - 10} textAnchor="middle" className="ob-svg-axis">{t('Candle')} {c.id}</text>
            </g>
          );
        })}

        {/* Departure bar */}
        <g>
          <line x1="390" y1={mapY(108.6)} x2="390" y2={mapY(100.8)} stroke="var(--ob-wick)" strokeWidth="2" />
          <rect x="374" y={mapY(108)} width="32" height={mapY(101) - mapY(108)} fill="var(--ob-emerald-bright)" rx="3" />
          <text x="390" y={h - 10} textAnchor="middle" className="ob-svg-axis">{t('Departure')}</text>
        </g>

        {/* Retest bar reaching 105.6 */}
        <g>
          <line x1="510" y1={mapY(108.2)} x2="510" y2={mapY(105.6)} stroke="var(--ob-wick)" strokeWidth="2" />
          <rect x="494" y={mapY(107.6)} width="32" height={mapY(106.2) - mapY(107.6)} fill="var(--ob-emerald)" rx="3" />
          <text x="510" y={h - 10} textAnchor="middle" className="ob-svg-axis">{t('Pullback 105.6')}</text>
        </g>
      </svg>

      <div className="ob-metric-grid">
        <div className="ob-metric-cell">
          <span>{t('Opening Reference')}</span>
          <strong className="ob-num">{bounds.openingRef.toFixed(1)}</strong>
        </div>
        <div className="ob-metric-cell">
          <span>{t('Active Range')}</span>
          <strong className="ob-num">{zoneLow.toFixed(1)} – {zoneHigh.toFixed(1)}</strong>
        </div>
        <div className="ob-metric-cell">
          <span>{t('Active 50% Mean Threshold')}</span>
          <strong className="ob-num">{activeMt.toFixed(2)}</strong>
        </div>
        <div className="ob-metric-cell">
          <span>{t('Dip to 105.6 Result')}</span>
          <strong>{rule === 'single-c' ? t('Missed Fill (above 102.0)') : t('Tagged Inside Zone')}</strong>
        </div>
      </div>

      <figcaption className="ob-visual-caption">
        {t('Switching from the 3-candle run (Open 106.0) to Single Candle C (Open 102.0) shrinks zone width by 4 points and turns a 105.6 pullback into a missed fill.')}
      </figcaption>
    </figure>
  );
};

/* 4. Magnified Boundary Anatomy & Mean Threshold Caliper */
const BoundaryAnatomyRuler: React.FC = () => {
  const { t } = useTranslation();
  const [focus, setFocus] = useState<'open' | 'body' | 'mt' | 'distal'>('mt');

  const descriptions: Record<typeof focus, string> = {
    open: 'Proximal Opening Reference (106.0): First edge price meets on a pullback. Highest fill probability with the widest stop distance to 99.0.',
    body: 'Body Band (101.0–106.0): Spans from the first down-close open (106.0) to the lowest body close (101.0). Width = 5.0 points.',
    mt: '50% Mean Threshold: Body MT = (101 + 106) / 2 = 103.5; Full-Range MT = (99 + 107) / 2 = 103.0. Always log which formula you use.',
    distal: 'Distal Wick Invalidation (99.0): Lowest wick of the down-close run. A decisive candle close below 99.0 invalidates the bullish OB.',
  };

  const w = 680;
  const h = 250;
  const mapY = (p: number) => 22 + ((108.5 - p) / 11) * (h - 44);

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Interactive Caliper · Exact 4-Line Blueprint')}</p>
        <h3>{t('Inspect Every Order Block Boundary & Mean Threshold Formula')}</h3>
      </div>

      <div className="ob-tab-row" role="tablist" aria-label={t('Boundary layer')}>
        <button type="button" role="tab" aria-selected={focus === 'open'} className={`ob-tab-btn${focus === 'open' ? ' is-active' : ''}`} onClick={() => setFocus('open')}>
          {t('1. Proximal Open (106.0)')}
        </button>
        <button type="button" role="tab" aria-selected={focus === 'body'} className={`ob-tab-btn${focus === 'body' ? ' is-active' : ''}`} onClick={() => setFocus('body')}>
          {t('2. Body Band (101–106)')}
        </button>
        <button type="button" role="tab" aria-selected={focus === 'mt'} className={`ob-tab-btn${focus === 'mt' ? ' is-active' : ''}`} onClick={() => setFocus('mt')}>
          {t('3. 50% Mean Threshold (103.5 / 103.0)')}
        </button>
        <button type="button" role="tab" aria-selected={focus === 'distal'} className={`ob-tab-btn${focus === 'distal' ? ' is-active' : ''}`} onClick={() => setFocus('distal')}>
          {t('4. Distal Wick (99.0)')}
        </button>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="ob-svg-stage" role="img" aria-label={t('Order block caliper boundaries')}>
        <rect x="0" y="0" width={w} height={h} fill="var(--ob-stage-bg)" rx="8" />

        {/* Full wick range box */}
        <rect
          x="190"
          y={mapY(107)}
          width="450"
          height={mapY(99) - mapY(107)}
          fill="var(--ob-surface)"
          stroke="var(--ob-border)"
          strokeDasharray="4 3"
          rx="4"
        />

        {/* Body band */}
        <rect
          x="190"
          y={mapY(106)}
          width="450"
          height={mapY(101) - mapY(106)}
          fill={focus === 'body' ? 'var(--ob-emerald-soft)' : 'rgba(6,95,70,0.05)'}
          stroke="var(--ob-emerald)"
          strokeWidth={focus === 'body' ? 2.4 : 1.1}
        />

        {/* Composite Candle Representation */}
        <line x1="120" y1={mapY(107)} x2="120" y2={mapY(99)} stroke="var(--ob-wick)" strokeWidth="3" />
        <rect x="92" y={mapY(106)} width="56" height={mapY(101) - mapY(106)} fill="var(--ob-ochre)" rx="4" />
        <text x="120" y={mapY(107) - 6} textAnchor="middle" className="ob-svg-axis">H 107.0</text>
        <text x="120" y={mapY(99) + 14} textAnchor="middle" className="ob-svg-axis">L 99.0</text>

        {/* Horizontal key lines */}
        <line x1="175" y1={mapY(106)} x2="640" y2={mapY(106)} stroke="var(--ob-emerald)" strokeWidth={focus === 'open' ? 3 : 1.4} />
        <text x="632" y={mapY(106) - 6} textAnchor="end" className="ob-svg-tag">{t('Proximal Open 106.0')}</text>

        <line x1="175" y1={mapY(103.5)} x2="640" y2={mapY(103.5)} stroke="var(--ob-ochre)" strokeWidth={focus === 'mt' ? 3 : 1.5} strokeDasharray="6 4" />
        <text x="632" y={mapY(103.5) - 5} textAnchor="end" className="ob-svg-tag-ochre">{t('Body 50% MT = 103.5')}</text>

        <line x1="175" y1={mapY(103.0)} x2="640" y2={mapY(103.0)} stroke="var(--ob-indigo)" strokeWidth={focus === 'mt' ? 2.4 : 1.1} strokeDasharray="3 3" />
        <text x="360" y={mapY(103.0) + 13} textAnchor="middle" className="ob-svg-tag-indigo">{t('Full-Range 50% MT = 103.0')}</text>

        <line x1="175" y1={mapY(99)} x2="640" y2={mapY(99)} stroke="var(--ob-rose)" strokeWidth={focus === 'distal' ? 3 : 1.4} />
        <text x="632" y={mapY(99) - 5} textAnchor="end" className="ob-svg-tag-rose">{t('Distal Low 99.0 (Close < 99 Invalidates)')}</text>
      </svg>

      <figcaption className="ob-visual-caption">{t(descriptions[focus])}</figcaption>
    </figure>
  );
};

/* 5. Bullish vs. Bearish Mirror Switcher */
const BullishBearishMirror: React.FC = () => {
  const { t } = useTranslation();
  const [side, setSide] = useState<'bullish' | 'bearish'>('bullish');

  const isBull = side === 'bullish';
  const candles = isBull
    ? [
        { id: '1', o: 106, h: 107, l: 103.5, c: 104, ob: true },
        { id: '2', o: 104, h: 104.5, l: 101.5, c: 102, ob: true },
        { id: '3', o: 102, h: 102.5, l: 99, c: 101, ob: true },
        { id: '4', o: 101, h: 108.5, l: 100.8, c: 108, ob: false },
        { id: '5', o: 108, h: 112, l: 107.6, c: 111, ob: false },
        { id: '6', o: 111, h: 111.3, l: 103.5, c: 106.8, ob: false },
        { id: '7', o: 106.8, h: 113.5, l: 106.4, c: 113, ob: false },
      ]
    : [
        { id: '1', o: 104, h: 106.5, l: 103, c: 106, ob: true },
        { id: '2', o: 106, h: 108.5, l: 105.5, c: 108, ob: true },
        { id: '3', o: 108, h: 111, l: 107.5, c: 109, ob: true },
        { id: '4', o: 109, h: 109.2, l: 101.5, c: 102, ob: false },
        { id: '5', o: 102, h: 102.4, l: 98, c: 99, ob: false },
        { id: '6', o: 99, h: 106.5, l: 98.7, c: 103.2, ob: false },
        { id: '7', o: 103.2, h: 103.6, l: 96.5, c: 97, ob: false },
      ];

  const w = 680;
  const h = 250;
  const mapY = (p: number) => 22 + ((115 - p) / 20) * (h - 52);

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Interactive Mirror · Exact Symmetry Check')}</p>
        <h3>{t('Bullish Discount Order Block vs. Bearish Premium Order Block')}</h3>
      </div>

      <div className="ob-tab-row" role="tablist" aria-label={t('Mirror direction')}>
        <button type="button" role="tab" aria-selected={isBull} className={`ob-tab-btn${isBull ? ' is-active' : ''}`} onClick={() => setSide('bullish')}>
          {t('Bullish OB (Open 106 · MT 103.5 · Low 99)')}
        </button>
        <button type="button" role="tab" aria-selected={!isBull} className={`ob-tab-btn${!isBull ? ' is-active' : ''}`} onClick={() => setSide('bearish')}>
          {t('Bearish OB (Open 104 · MT 106.5 · High 111)')}
        </button>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="ob-svg-stage" role="img" aria-label={t('Bullish and Bearish Order Block mirror')}>
        <rect x="0" y="0" width={w} height={h} fill="var(--ob-stage-bg)" rx="8" />
        {[97, 100, 103.5, 106.5, 110, 113].map((p) => (
          <g key={p}>
            <line x1="56" y1={mapY(p)} x2="656" y2={mapY(p)} stroke="var(--ob-grid)" strokeDasharray="3 4" />
            <text x="48" y={mapY(p) + 4} textAnchor="end" className="ob-svg-axis">{p}</text>
          </g>
        ))}

        {/* OB Body Band */}
        <rect
          x="74"
          y={mapY(isBull ? 106 : 109)}
          width="580"
          height={mapY(isBull ? 101 : 104) - mapY(isBull ? 106 : 109)}
          fill={isBull ? 'var(--ob-emerald-soft)' : 'var(--ob-rose-soft)'}
          stroke={isBull ? 'var(--ob-emerald)' : 'var(--ob-rose)'}
          strokeWidth="1.4"
        />
        <line
          x1="74"
          y1={mapY(isBull ? 103.5 : 106.5)}
          x2="654"
          y2={mapY(isBull ? 103.5 : 106.5)}
          stroke="var(--ob-ochre)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <text x="646" y={mapY(isBull ? 103.5 : 106.5) - 5} textAnchor="end" className="ob-svg-tag-ochre">
          {isBull ? t('Bullish Body MT 103.5') : t('Bearish Body MT 106.5')}
        </text>
        <text x="646" y={mapY(isBull ? 99 : 111) + (isBull ? 12 : -5)} textAnchor="end" className="ob-svg-tag-rose">
          {isBull ? t('Invalidation Close < 99.0') : t('Invalidation Close > 111.0')}
        </text>

        {candles.map((c, idx) => {
          const cx = 104 + idx * 82;
          const up = c.c >= c.o;
          const fill = c.ob ? 'var(--ob-ochre)' : up ? 'var(--ob-emerald-bright)' : 'var(--ob-rose)';
          return (
            <g key={c.id}>
              <line x1={cx} y1={mapY(c.h)} x2={cx} y2={mapY(c.l)} stroke="var(--ob-wick)" strokeWidth="1.9" />
              <rect
                x={cx - 13}
                y={mapY(Math.max(c.o, c.c))}
                width="26"
                height={Math.max(5, mapY(Math.min(c.o, c.c)) - mapY(Math.max(c.o, c.c)))}
                fill={fill}
                rx="2.5"
              />
              <text x={cx} y={h - 10} textAnchor="middle" className="ob-svg-axis">C{c.id}</text>
            </g>
          );
        })}
      </svg>

      <figcaption className="ob-visual-caption">
        {isBull
          ? t('Bullish OB: Last down-close run (106->101) sweeping low 99.0, displaced upward past 109.0, then retested from above.')
          : t('Bearish OB: Exact mirror — last up-close run (104->109) sweeping high 111.0, displaced downward past 101.0, then retested from below.')}
      </figcaption>
    </figure>
  );
};

/* 7. CISD vs. MSS Timing Animation */
const CISD_BARS = [
  { id: '1', o: 108, h: 109, l: 105.6, c: 106, role: 'approach' },
  { id: '2', o: 106, h: 106.8, l: 103.5, c: 104, role: 'ob' },
  { id: '3', o: 104, h: 104.5, l: 101.6, c: 102, role: 'ob' },
  { id: '4', o: 102, h: 102.4, l: 99.0, c: 101, role: 'ob' },
  { id: '5', o: 101, h: 108.4, l: 100.8, c: 108, role: 'cisd' },
  { id: '6', o: 108, h: 111.8, l: 107.6, c: 111, role: 'mss' },
];

const CisdVsMssAnim: React.FC<{ staticOnly?: boolean }> = ({ staticOnly }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(2);
  const [playing, setPlaying] = useState<boolean>(false);

  const stages = [
    { count: 4, label: 'Stage 1: Down-Close Run (Open 106.0)', note: 'Candles 2–4 establish the consecutive down-close run opening at 106.0 while Candle 1 sets the external swing high at 109.0.' },
    { count: 5, label: 'Stage 2: CISD Confirmed (Close 108.0 > 106.0)', note: 'Candle 5 closes at 108.0, slicing back above the down-close run opening (106.0). Early delivery shift is confirmed before 109.0 breaks.' },
    { count: 6, label: 'Stage 3: Full MSS Confirmed (Close 111.0 > 109.0)', note: 'Candle 6 closes at 111.0 above the 109.0 external swing high, delivering full structural confirmation.' },
  ];

  useEffect(() => {
    if (!playing || staticOnly) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false);
      return;
    }
    const id = window.setInterval(() => {
      setStep((prev) => {
        if (prev >= stages.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, stages.length]);

  const current = stages[step];
  const visible = CISD_BARS.slice(0, current.count);
  const w = 680;
  const h = 250;
  const mapY = (p: number) => 22 + ((114 - p) / 17) * (h - 52);

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Animated Comparison · Early vs. Full Confirmation')}</p>
        <h3>{t('CISD (Close > 106.0) vs. Market Structure Shift (Close > 109.0)')}</h3>
      </div>

      <div className="ob-toolbar-split">
        <div className="ob-control-group">
          <button type="button" className="ob-ctrl-btn is-primary" onClick={() => { if (!playing && step >= 2) setStep(0); setPlaying((p) => !p); }}>
            {playing ? <Pause size={15} /> : <Play size={15} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button type="button" className={`ob-tab-btn${step === 0 ? ' is-active' : ''}`} onClick={() => { setPlaying(false); setStep(0); }}>{t('1. Origin')}</button>
          <button type="button" className={`ob-tab-btn${step === 1 ? ' is-active' : ''}`} onClick={() => { setPlaying(false); setStep(1); }}>{t('2. CISD')}</button>
          <button type="button" className={`ob-tab-btn${step === 2 ? ' is-active' : ''}`} onClick={() => { setPlaying(false); setStep(2); }}>{t('3. MSS')}</button>
        </div>
        <span className="ob-hud-step ob-num">{t(current.label)}</span>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="ob-svg-stage" role="img" aria-label={t('CISD versus MSS timing animation')}>
        <rect x="0" y="0" width={w} height={h} fill="var(--ob-stage-bg)" rx="8" />
        {[99, 102, 106, 109, 112].map((p) => (
          <g key={p}>
            <line x1="56" y1={mapY(p)} x2="656" y2={mapY(p)} stroke="var(--ob-grid)" strokeDasharray="3 4" />
            <text x="48" y={mapY(p) + 4} textAnchor="end" className="ob-svg-axis">{p}</text>
          </g>
        ))}

        {/* CISD Line 106 */}
        <line x1="150" y1={mapY(106)} x2="654" y2={mapY(106)} stroke="var(--ob-ochre)" strokeWidth="2" strokeDasharray="5 3" />
        <text x="646" y={mapY(106) - 6} textAnchor="end" className="ob-svg-tag-ochre">{t('CISD Trigger: Open 106.0 (Earlier)')}</text>

        {/* MSS Line 109 */}
        <line x1="80" y1={mapY(109)} x2="654" y2={mapY(109)} stroke="var(--ob-indigo)" strokeWidth="2" strokeDasharray="6 3" />
        <text x="646" y={mapY(109) - 6} textAnchor="end" className="ob-svg-tag-indigo">{t('MSS Trigger: Swing High 109.0 (Full Structure)')}</text>

        {visible.map((c, idx) => {
          const cx = 110 + idx * 96;
          const fill = c.role === 'ob' ? 'var(--ob-ochre)' : c.c >= c.o ? 'var(--ob-emerald-bright)' : 'var(--ob-rose)';
          return (
            <g key={c.id}>
              <line x1={cx} y1={mapY(c.h)} x2={cx} y2={mapY(c.l)} stroke="var(--ob-wick)" strokeWidth="2" />
              <rect
                x={cx - 15}
                y={mapY(Math.max(c.o, c.c))}
                width="30"
                height={Math.max(5, mapY(Math.min(c.o, c.c)) - mapY(Math.max(c.o, c.c)))}
                fill={fill}
                rx="3"
              />
              <text x={cx} y={h - 10} textAnchor="middle" className="ob-svg-axis">B{c.id}</text>
            </g>
          );
        })}
      </svg>

      <figcaption className="ob-visual-caption">{t(current.note)}</figcaption>
    </figure>
  );
};

/* 8. Mitigation Depth & 3-Candle Response Window Simulator */
const MitigationDepthAnim: React.FC = () => {
  const { t } = useTranslation();
  const [depth, setDepth] = useState<'unmitigated' | 'opening' | 'mt' | 'failure'>('mt');

  const scenarios: Record<typeof depth, { label: string; bars: Array<{ o: number; h: number; l: number; c: number }>; note: string }> = {
    unmitigated: {
      label: 'Unmitigated (Dip Stops at 107.2)',
      bars: [
        { o: 111, h: 111.4, l: 107.2, c: 108.4 },
        { o: 108.4, h: 112.2, l: 108.0, c: 111.8 },
        { o: 111.8, h: 114.8, l: 111.2, c: 114.2 },
      ],
      note: 'Price never touches 106.0. The OB stays unmitigated (fresh) and any resting limit order at 106.0 remains unfilled.',
    },
    opening: {
      label: 'Shallow Opening Touch (106.0)',
      bars: [
        { o: 111, h: 111.2, l: 105.8, c: 107.4 },
        { o: 107.4, h: 112.4, l: 107.0, c: 112.0 },
        { o: 112.0, h: 115.2, l: 111.6, c: 114.8 },
      ],
      note: 'Bar 1 touches 106.0 and closes back at 107.4; Bar 2 expands strongly within the 3-candle response window.',
    },
    mt: {
      label: '50% Mean Threshold Tag (103.5)',
      bars: [
        { o: 111, h: 111.1, l: 103.5, c: 105.6 },
        { o: 105.6, h: 111.2, l: 105.1, c: 110.6 },
        { o: 110.6, h: 114.8, l: 110.2, c: 114.4 },
      ],
      note: 'Bar 1 wicks precisely to the 50% Body Mean Threshold (103.5) and closes above it at 105.6; Bars 2–3 expand cleanly.',
    },
    failure: {
      label: 'Closing Failure (< 99.0 -> Breaker)',
      bars: [
        { o: 111, h: 111.1, l: 102.2, c: 102.8 },
        { o: 102.8, h: 103.2, l: 97.8, c: 98.4 },
        { o: 98.4, h: 100.4, l: 95.8, c: 96.2 },
      ],
      note: 'No bullish response inside 3 candles: Bar 2 closes decisively at 98.4 (< 99.0), invalidating the Bullish OB into a Bearish Breaker candidate.',
    },
  };

  const active = scenarios[depth];
  const w = 680;
  const h = 250;
  const mapY = (p: number) => 22 + ((116.5 - p) / 22.5) * (h - 52);

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Interactive Simulator · Mitigation Depth & 3-Candle Window')}</p>
        <h3>{t('Compare All 4 Mitigation Outcomes Inside the Same Bullish Order Block')}</h3>
      </div>

      <div className="ob-tab-row" role="tablist" aria-label={t('Mitigation outcome')}>
        <button type="button" role="tab" aria-selected={depth === 'unmitigated'} className={`ob-tab-btn${depth === 'unmitigated' ? ' is-active' : ''}`} onClick={() => setDepth('unmitigated')}>{t('1. Unmitigated')}</button>
        <button type="button" role="tab" aria-selected={depth === 'opening'} className={`ob-tab-btn${depth === 'opening' ? ' is-active' : ''}`} onClick={() => setDepth('opening')}>{t('2. Opening (106)')}</button>
        <button type="button" role="tab" aria-selected={depth === 'mt'} className={`ob-tab-btn${depth === 'mt' ? ' is-active' : ''}`} onClick={() => setDepth('mt')}>{t('3. 50% MT (103.5)')}</button>
        <button type="button" role="tab" aria-selected={depth === 'failure'} className={`ob-tab-btn${depth === 'failure' ? ' is-active' : ''}`} onClick={() => setDepth('failure')}>{t('4. Close Fail (<99)')}</button>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="ob-svg-stage" role="img" aria-label={t('Mitigation depth outcome simulator')}>
        <rect x="0" y="0" width={w} height={h} fill="var(--ob-stage-bg)" rx="8" />
        {[96, 99, 103.5, 106, 110, 115].map((p) => (
          <g key={p}>
            <line x1="56" y1={mapY(p)} x2="656" y2={mapY(p)} stroke="var(--ob-grid)" strokeDasharray="3 4" />
            <text x="48" y={mapY(p) + 4} textAnchor="end" className="ob-svg-axis">{p}</text>
          </g>
        ))}

        {/* OB Body Band */}
        <rect
          x="74"
          y={mapY(106)}
          width="580"
          height={mapY(101) - mapY(106)}
          fill={depth === 'failure' ? 'var(--ob-rose-soft)' : 'var(--ob-emerald-soft)'}
          stroke={depth === 'failure' ? 'var(--ob-rose)' : 'var(--ob-emerald)'}
          strokeWidth="1.4"
        />
        <line x1="74" y1={mapY(103.5)} x2="654" y2={mapY(103.5)} stroke="var(--ob-ochre)" strokeWidth="1.4" strokeDasharray="5 4" />
        <line x1="74" y1={mapY(99)} x2="654" y2={mapY(99)} stroke="var(--ob-rose)" strokeWidth="1.3" strokeDasharray="4 3" />

        {/* Origin + Departure candles */}
        {[
          { x: 115, o: 106, h: 107, l: 99, c: 101, fill: 'var(--ob-ochre)', lbl: 'OB' },
          { x: 205, o: 101, h: 108.5, l: 100.8, c: 108, fill: 'var(--ob-emerald-bright)', lbl: 'CISD' },
          { x: 295, o: 108, h: 112, l: 107.6, c: 111, fill: 'var(--ob-emerald-bright)', lbl: 'MSS' },
        ].map((b) => (
          <g key={b.lbl}>
            <line x1={b.x} y1={mapY(b.h)} x2={b.x} y2={mapY(b.l)} stroke="var(--ob-wick)" strokeWidth="2" />
            <rect x={b.x - 14} y={mapY(Math.max(b.o, b.c))} width="28" height={Math.max(5, mapY(Math.min(b.o, b.c)) - mapY(Math.max(b.o, b.c)))} fill={b.fill} rx="3" />
            <text x={b.x} y={h - 10} textAnchor="middle" className="ob-svg-axis">{b.lbl}</text>
          </g>
        ))}

        {/* 3-Candle Response Window Box */}
        <rect x="355" y="20" width="275" height={h - 46} fill="none" stroke="var(--ob-indigo)" strokeWidth="1.2" strokeDasharray="4 4" rx="6" />
        <text x="492" y="34" textAnchor="middle" className="ob-svg-tag-indigo">{t('3-Candle Response Window')}</text>

        {active.bars.map((b, idx) => {
          const cx = 402 + idx * 90;
          const fill = b.c >= b.o ? 'var(--ob-emerald-bright)' : 'var(--ob-rose)';
          return (
            <g key={idx}>
              <line x1={cx} y1={mapY(b.h)} x2={cx} y2={mapY(b.l)} stroke="var(--ob-wick)" strokeWidth="2" />
              <rect x={cx - 14} y={mapY(Math.max(b.o, b.c))} width="28" height={Math.max(5, mapY(Math.min(b.o, b.c)) - mapY(Math.max(b.o, b.c)))} fill={fill} rx="3" />
              <text x={cx} y={h - 10} textAnchor="middle" className="ob-svg-axis">R{idx + 1}</text>
            </g>
          );
        })}
      </svg>

      <figcaption className="ob-visual-caption">
        <strong>{t(active.label)}:</strong> {t(active.note)}
      </figcaption>
    </figure>
  );
};

/* 9. High-Probability Discount OB vs. Inducement (IDM) Trap Comic */
const HighProbVsTrapVisual: React.FC = () => {
  const { t } = useTranslation();

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Visual Contrast · Avoiding the #1 Beginner Trap')}</p>
        <h3>{t('Inducement (IDM) Mid-Leg Trap vs. True Extreme Discount Order Block')}</h3>
      </div>

      <svg
        viewBox="0 0 690 258"
        className="ob-svg-stage"
        role="img"
        aria-label={t('Side by side diagram comparing an Inducement mid-leg trap order block with a true extreme discount order block')}
      >
        <rect x="0" y="0" width="690" height="258" fill="var(--ob-stage-bg)" rx="8" />

        {/* Left Panel: IDM Trap */}
        <rect x="14" y="14" width="322" height="230" fill="var(--ob-surface)" stroke="var(--ob-border)" rx="8" />
        <text x="175" y="34" textAnchor="middle" className="ob-svg-tag-rose">
          {t('TRAP: Mid-Leg OB Acting as Inducement (IDM)')}
        </text>
        {/* Mid-leg trap zone */}
        <rect x="34" y="88" width="282" height="28" fill="var(--ob-rose-soft)" stroke="var(--ob-rose)" strokeWidth="1.3" />
        <text x="175" y="106" textAnchor="middle" className="ob-svg-tag-rose">{t('Mid-Leg OB (No Prior Sweep -> IDM)')}</text>
        {/* True extreme OB below */}
        <rect x="34" y="168" width="282" height="28" fill="var(--ob-emerald-soft)" stroke="var(--ob-emerald)" strokeWidth="1.3" />
        <text x="175" y="186" textAnchor="middle" className="ob-svg-tag">{t('Real Extreme Discount OB Below')}</text>
        {/* Price path slicing through IDM then bouncing at extreme */}
        <polyline points="42,182 94,102 140,62 184,104 218,176 268,120 308,68" fill="none" stroke="var(--ob-ink)" strokeWidth="2.4" />
        <circle cx="184" cy="116" r="5" fill="var(--ob-rose)" />
        <circle cx="218" cy="176" r="5" fill="var(--ob-emerald)" />
        {/* Surprised stick figure at trap */}
        <circle cx="148" cy="138" r="7" fill="none" stroke="var(--ob-rose)" strokeWidth="1.9" />
        <line x1="148" y1="145" x2="148" y2="160" stroke="var(--ob-rose)" strokeWidth="1.9" />
        <line x1="148" y1="150" x2="136" y2="140" stroke="var(--ob-rose)" strokeWidth="1.9" />
        <line x1="148" y1="150" x2="160" y2="140" stroke="var(--ob-rose)" strokeWidth="1.9" />
        <text x="175" y="216" textAnchor="middle" className="ob-comic-note">{t('Early stops under Mid-Leg OB get swept first!')}</text>
        <text x="175" y="232" textAnchor="middle" className="ob-comic-note">{t('Wait for IDM sweep before grading the extreme OB')}</text>

        {/* Right Panel: Valid Extreme OB */}
        <rect x="354" y="14" width="322" height="230" fill="var(--ob-surface)" stroke="var(--ob-border)" rx="8" />
        <text x="515" y="34" textAnchor="middle" className="ob-svg-tag">
          {t('VALID: Post-Sweep Extreme Discount OB')}
        </text>
        {/* 50% Equilibrium line */}
        <line x1="370" y1="118" x2="660" y2="118" stroke="var(--ob-ochre)" strokeWidth="1.3" strokeDasharray="5 4" />
        <text x="652" y="112" textAnchor="end" className="ob-svg-tag-ochre">{t('50% Range Equilibrium')}</text>
        {/* Extreme OB in Discount */}
        <rect x="370" y="156" width="290" height="34" fill="var(--ob-emerald-soft)" stroke="var(--ob-emerald)" strokeWidth="1.5" />
        <text x="515" y="177" textAnchor="middle" className="ob-svg-tag">{t('Discount OB (Swept IDM + MSS + FVG)')}</text>
        {/* Price sweep + departure + mitigation + expansion */}
        <polyline points="382,146 416,184 452,194 504,76 558,166 610,110 652,58" fill="none" stroke="var(--ob-emerald)" strokeWidth="2.6" />
        <circle cx="452" cy="194" r="5" fill="var(--ob-ochre)" />
        <circle cx="558" cy="166" r="5" fill="var(--ob-emerald)" />
        {/* Calm stick figure checking boxes */}
        <circle cx="622" cy="144" r="7" fill="none" stroke="var(--ob-emerald)" strokeWidth="1.9" />
        <line x1="622" y1="151" x2="622" y2="168" stroke="var(--ob-emerald)" strokeWidth="1.9" />
        <line x1="622" y1="156" x2="610" y2="160" stroke="var(--ob-emerald)" strokeWidth="1.9" />
        <line x1="622" y1="156" x2="634" y2="148" stroke="var(--ob-emerald)" strokeWidth="1.9" />
        <text x="515" y="216" textAnchor="middle" className="ob-comic-note">{t('Liquidity swept -> Discount location -> Clean reaction')}</text>
        <text x="515" y="232" textAnchor="middle" className="ob-comic-note">{t('Higher structural context, clear distal invalidation')}</text>
      </svg>

      <figcaption className="ob-visual-caption">
        {t('When two bullish order blocks stack in the same leg, the upper un-swept block often serves as Inducement (IDM) whose stop run delivers price into the deeper extreme discount block.')}
      </figcaption>
    </figure>
  );
};

export const OrderBlockVisual: React.FC<OrderBlockVisualProps> = ({ visualId, staticOnly = false }) => {
  const { t } = useTranslation();

  switch (visualId) {
    case 'ob-stick-figure-comic':
      return <StickFigureComicVisual />;
    case 'ob-departure-sequence-anim':
      return <DepartureSequenceAnim staticOnly={staticOnly} />;
    case 'ob-single-vs-run-explorer':
      return <SingleVsRunExplorer />;
    case 'ob-boundary-anatomy-ruler':
      return <BoundaryAnatomyRuler />;
    case 'ob-bullish-bearish-mirror':
      return <BullishBearishMirror />;
    case 'ob-3d-cinema-studio':
      return (
        <figure className="ob-visual-card" data-ob-figure="">
          <div className="ob-visual-head">
            <p className="ob-visual-kicker">{t('Motion Study 02 · Interactive 3D & Ruler View')}</p>
            <h3>{t('Explore Physical 3D Candles, 50% Mean Threshold Rail & 3 Authored Mitigation Branches')}</h3>
          </div>
          <OrderBlockScene staticOnly={staticOnly} />
        </figure>
      );
    case 'ob-cisd-vs-mss-anim':
      return <CisdVsMssAnim staticOnly={staticOnly} />;
    case 'ob-mitigation-depth-anim':
      return <MitigationDepthAnim />;
    case 'ob-high-prob-vs-trap':
      return <HighProbVsTrapVisual />;
    default:
      return <OrderBlockExtendedVisual visualId={visualId} staticOnly={staticOnly} />;
  }
};
