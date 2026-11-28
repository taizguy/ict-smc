import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Calculator,
  CheckSquare,
  Clock,
  Crosshair,
  GitCompare,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Users,
} from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { computeRejectionMetrics, turtlePresets } from '../utils/turtleSoupMath';
import { TurtleSoupScene } from './TurtleSoupScene';

export type TurtleSoupVisualKind =
  | 'ts-comic-intro'
  | 'ts-origin-compare'
  | 'ts-3d-trap'
  | 'ts-rejection-anatomy'
  | 'ts-sequence-sim'
  | 'ts-calculator'
  | 'ts-killzone-clock'
  | 'ts-lrlr-gauntlet'
  | 'ts-blueprints'
  | 'ts-mistakes-comic'
  | 'ts-checklist-meter';

const seqPaths = {
  deferred: {
    label: 'Deferred Return (110.5)',
    steps: [
      { title: '1. Sweep Above 110', note: 'Price pokes above 110.0 to 112.0, triggering buy-stops.' },
      { title: '2. Body Close 110–111', note: 'Rejection wick forms; candle body closes back near 110.5.' },
      { title: '3. Departure to 107', note: 'Displacement drops to 107, leaving an imbalance behind.' },
      { title: '4. Return to 110.5', note: 'Price retests Rejection Block body midpoint (110.5) before expanding to 106.' },
    ],
    points: [
      [75, 118],
      [190, 40],
      [310, 96],
      [430, 176],
      [540, 82],
      [655, 194],
    ],
  },
  aggressive: {
    label: 'Aggressive Reclaim',
    steps: [
      { title: '1. Sweep Above 110', note: 'Excursion pierces 110.0 to 112.0.' },
      { title: '2. Immediate Reclaim', note: 'Candle closes sharply back below 110.0.' },
      { title: '3. Direct Continuation', note: 'Price drops straight toward 106 without retesting 110.5.' },
      { title: '4. Target Reached', note: 'No deferred return occurred; aggressive reclaim captured the move.' },
    ],
    points: [
      [75, 118],
      [190, 40],
      [310, 118],
      [430, 152],
      [540, 176],
      [655, 194],
    ],
  },
  noReturn: {
    label: 'Missed / No Return',
    steps: [
      { title: '1. Sweep & Departure', note: 'Price sweeps 112.0 and plunges straight to 106.0.' },
      { title: '2. Target Completed', note: '106.0 objective is already reached before any retest.' },
      { title: '3. Expiry Reached', note: 'Deferred sequence expires; do not force a late entry.' },
      { title: '4. Next Study', note: 'Wait for a fresh setup rather than chasing.' },
    ],
    points: [
      [75, 118],
      [190, 40],
      [310, 134],
      [430, 188],
      [540, 194],
      [655, 170],
    ],
  },
};

export function TurtleSoupVisual({
  kind,
  staticOnly = false,
  checkedCount = 0,
}: {
  kind: TurtleSoupVisualKind;
  staticOnly?: boolean;
  checkedCount?: number;
}) {
  const { t } = useTranslation();
  const [anatomyTab, setAnatomyTab] = useState<'body' | 'full' | 'stop'>('body');
  const [seqMode, setSeqMode] = useState<'deferred' | 'aggressive' | 'noReturn'>('deferred');
  const [seqStep, setSeqStep] = useState<number>(3);
  const [seqPlaying, setSeqPlaying] = useState<boolean>(false);
  const [presetId, setPresetId] = useState<string>(turtlePresets[0].id);
  const [refEx, setRefEx] = useState<number>(turtlePresets[0].input.referenceExtreme);
  const [bodyBnd, setBodyBnd] = useState<number>(turtlePresets[0].input.bodyBoundary);
  const [wickEx, setWickEx] = useState<number>(turtlePresets[0].input.wickExtreme);
  const [targetPx, setTargetPx] = useState<number>(turtlePresets[0].input.targetPrice);

  useEffect(() => {
    if (!seqPlaying || staticOnly) return;
    const timer = window.setInterval(() => {
      setSeqStep((s) => (s + 1) % 4);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [seqPlaying, staticOnly]);

  if (kind === 'ts-3d-trap') {
    return <TurtleSoupScene staticOnly={staticOnly} />;
  }

  if (kind === 'ts-comic-intro') {
    return (
      <figure className="ts-figure" data-ts-figure="ts-comic-intro">
        <div className="ts-figure-head">
          <span className="ts-head-title">
            <Users size={16} aria-hidden="true" />
            <span>{t('Visual Story: Breakout Traders Trapped as "Turtle Soup"')}</span>
          </span>
        </div>
        <svg viewBox="0 0 760 235" className="ts-svg" role="img" aria-label={t('Visual Story: Breakout Traders Trapped as "Turtle Soup"')}>
          <rect x="12" y="12" width="358" height="210" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <rect x="390" y="12" width="358" height="210" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <text x="28" y="36" fontSize="12.5" fontWeight="700" fill="var(--ts-crimson)">{t('Breakout Buyer (Trapped Above 110)')}</text>
          <text x="406" y="36" fontSize="12.5" fontWeight="700" fill="var(--ts-emerald)">{t('Turtle Soup Trader (Waits for Snap-Back)')}</text>

          {/* Left stick figure */}
          <circle cx="76" cy="112" r="13" fill="none" stroke="var(--ts-ink)" strokeWidth="2.4" />
          <line x1="76" y1="125" x2="76" y2="170" stroke="var(--ts-ink)" strokeWidth="2.4" />
          <line x1="76" y1="140" x2="104" y2="124" stroke="var(--ts-ink)" strokeWidth="2.4" />
          <line x1="76" y1="170" x2="62" y2="202" stroke="var(--ts-ink)" strokeWidth="2.4" />
          <line x1="76" y1="170" x2="90" y2="202" stroke="var(--ts-ink)" strokeWidth="2.4" />
          <rect x="30" y="52" width="215" height="32" rx="7" fill="var(--ts-surface)" stroke="var(--ts-border)" />
          <text x="40" y="72" fontSize="11" fill="var(--ts-ink)">{t('"110 broke! Buying the breakout!"')}</text>
          <line x1="150" y1="144" x2="345" y2="144" stroke="var(--ts-muted)" strokeWidth="2" strokeDasharray="5 4" />
          <text x="275" y="137" fontSize="10.5" fontWeight="700" fill="var(--ts-muted)">110.0 High</text>
          <path d="M160 172 L225 108 L268 188 L330 198" fill="none" stroke="var(--ts-crimson)" strokeWidth="2.8" />
          <circle cx="225" cy="108" r="5" fill="var(--ts-crimson)" />
          <text x="234" y="110" fontSize="10.5" fontWeight="700" fill="var(--ts-crimson)">112.0 Trap!</text>

          {/* Right stick figure */}
          <circle cx="456" cy="112" r="13" fill="none" stroke="var(--ts-ink)" strokeWidth="2.4" />
          <circle cx="452" cy="109" r="1.7" fill="var(--ts-ink)" />
          <circle cx="461" cy="109" r="1.7" fill="var(--ts-ink)" />
          <path d="M451 117 Q456 122 462 117" fill="none" stroke="var(--ts-ink)" strokeWidth="1.8" />
          <line x1="456" y1="125" x2="456" y2="170" stroke="var(--ts-ink)" strokeWidth="2.4" />
          <line x1="456" y1="140" x2="486" y2="136" stroke="var(--ts-ink)" strokeWidth="2.4" />
          <line x1="456" y1="170" x2="442" y2="202" stroke="var(--ts-ink)" strokeWidth="2.4" />
          <line x1="456" y1="170" x2="470" y2="202" stroke="var(--ts-ink)" strokeWidth="2.4" />
          <rect x="408" y="52" width="225" height="32" rx="7" fill="var(--ts-surface)" stroke="var(--ts-border)" />
          <text x="418" y="72" fontSize="11" fill="var(--ts-ink)">{t('"112 swept & closed < 110. Soup!"')}</text>
          <line x1="530" y1="138" x2="725" y2="138" stroke="var(--ts-muted)" strokeWidth="2" strokeDasharray="5 4" />
          <path d="M540 166 L602 104 L654 152 L716 196" fill="none" stroke="var(--ts-emerald)" strokeWidth="2.8" />
          <circle cx="654" cy="152" r="5" fill="var(--ts-emerald)" />
          <text x="662" y="156" fontSize="10.5" fontWeight="700" fill="var(--ts-emerald)">Reclaim &lt; 110</text>
        </svg>
        <figcaption className="ts-caption"><em>{t('Synthetic illustration — not live quotes.')}</em></figcaption>
      </figure>
    );
  }

  if (kind === 'ts-origin-compare') {
    return (
      <figure className="ts-figure" data-ts-figure="ts-origin-compare">
        <div className="ts-figure-head">
          <span className="ts-head-title">
            <BookOpen size={16} aria-hidden="true" />
            <span>{t('Raschke (1995) vs. ICT Rejection Block Architecture')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 170" className="ts-svg" role="img" aria-label={t('Raschke (1995) vs. ICT Rejection Block Architecture')}>
          <rect x="12" y="12" width="332" height="146" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <rect x="376" y="12" width="332" height="146" rx="10" fill="var(--rr-paper)" stroke="var(--ts-accent)" strokeWidth="1.8" />
          <text x="28" y="38" fontSize="12.5" fontWeight="700" fill="var(--ts-amber)">1995: Raschke &amp; Connors (Street Smarts)</text>
          <text x="28" y="64" fontSize="11.5" fill="var(--ts-ink)">1. 20-day high/low channel reference</text>
          <text x="28" y="88" fontSize="11.5" fill="var(--ts-ink)">2. Poke past channel triggers Turtle stops</text>
          <text x="28" y="112" fontSize="11.5" fill="var(--ts-ink)">3. Reclaim back inside channel = entry</text>
          <text x="28" y="136" fontSize="11.5" fill="var(--ts-muted)">Stop: 1 tick beyond new excursion</text>

          <text x="392" y="38" fontSize="12.5" fontWeight="700" fill="var(--ts-accent)">Modern ICT: Liquidity + Rejection Block</text>
          <text x="392" y="64" fontSize="11.5" fill="var(--ts-ink)">1. PDH/PDL, ETH/RTH, or 4H Swing extreme</text>
          <text x="392" y="88" fontSize="11.5" fill="var(--ts-ink)">2. Killzone sweep leaves Rejection Block wick</text>
          <text x="392" y="112" fontSize="11.5" fill="var(--ts-ink)">3. Departure + LTF MSS → deferred retest</text>
          <text x="392" y="136" fontSize="11.5" fill="var(--ts-muted)">Stop: Beyond Rejection Block extreme wick</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'ts-rejection-anatomy') {
    const info = {
      body: { label: 'Body Midpoint = 110.5', desc: 'Average of 110.0 reference and 111.0 candle body boundary.' },
      full: { label: 'Full-Wick Midpoint = 111.0', desc: 'Average of 110.0 reference and 112.0 wick extreme—NOT equal to 110.5!' },
      stop: { label: 'Wick Extreme Stop > 112.0', desc: 'Structural invalidation sits past the 112.0 rejection wick high.' },
    }[anatomyTab];

    return (
      <figure className="ts-figure" data-ts-figure="ts-rejection-anatomy">
        <div className="ts-figure-head">
          <span className="ts-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('Interactive Rejection Block Dissector (110.5 vs. 111.0)')}</span>
          </span>
          <span className="ts-badge">{info.label}</span>
        </div>
        <div className="ts-controls-row">
          <button type="button" className={`ts-btn ${anatomyTab === 'body' ? 'is-active' : ''}`} onClick={() => setAnatomyTab('body')}>
            Body Midpoint (110.5)
          </button>
          <button type="button" className={`ts-btn ${anatomyTab === 'full' ? 'is-active' : ''}`} onClick={() => setAnatomyTab('full')}>
            Full-Wick Midpoint (111.0)
          </button>
          <button type="button" className={`ts-btn ${anatomyTab === 'stop' ? 'is-active' : ''}`} onClick={() => setAnatomyTab('stop')}>
            Wick Stop (&gt; 112.0)
          </button>
        </div>
        <svg viewBox="0 0 720 215" className="ts-svg" role="img" aria-label={t('Interactive Rejection Block Dissector (110.5 vs. 111.0)')}>
          <rect x="14" y="14" width="692" height="187" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          {/* Wick 112 to 110 */}
          <line x1="210" y1="36" x2="210" y2="176" stroke="var(--ts-crimson)" strokeWidth="3.5" />
          {/* Body 110-111 */}
          <rect x="182" y="106" width="56" height="58" rx="4" fill="var(--ts-crimson)" opacity="0.85" />
          {/* Reference lines */}
          <line x1="120" y1="36" x2="540" y2="36" stroke={anatomyTab === 'stop' ? 'var(--ts-crimson)' : 'var(--ts-border)'} strokeWidth={anatomyTab === 'stop' ? 3 : 1.5} strokeDasharray="5 4" />
          <text x="550" y="40" fontSize="11.5" fontWeight="700" fill="var(--ts-crimson)">112.0 Wick High (Stop)</text>

          <line x1="120" y1="106" x2="540" y2="106" stroke={anatomyTab === 'full' ? 'var(--ts-amber)' : 'var(--ts-border)'} strokeWidth={anatomyTab === 'full' ? 3 : 1.5} strokeDasharray="5 4" />
          <text x="550" y="110" fontSize="11.5" fontWeight="700" fill="var(--ts-amber)">111.0 Full-Wick Midpoint</text>

          <line x1="120" y1="135" x2="540" y2="135" stroke={anatomyTab === 'body' ? 'var(--ts-sky)' : 'var(--ts-border)'} strokeWidth={anatomyTab === 'body' ? 3 : 1.5} />
          <text x="550" y="139" fontSize="11.5" fontWeight="700" fill="var(--ts-sky)">110.5 Body Midpoint</text>

          <line x1="120" y1="164" x2="540" y2="164" stroke="var(--ts-muted)" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="550" y="168" fontSize="11.5" fontWeight="600" fill="var(--ts-muted)">110.0 Old High Reference</text>
        </svg>
        <figcaption className="ts-caption"><strong>{info.label}:</strong> {info.desc} — <em>{t('Synthetic illustration — not live quotes.')}</em></figcaption>
      </figure>
    );
  }

  if (kind === 'ts-sequence-sim') {
    const active = seqPaths[seqMode];
    const vis = Math.min(active.points.length, seqStep + 3);
    const poly = active.points.slice(0, vis).map((p) => `${p[0]},${p[1]}`).join(' ');
    const cur = active.steps[seqStep] || active.steps[0];
    return (
      <figure className="ts-figure" data-ts-figure="ts-sequence-sim">
        <div className="ts-figure-head">
          <span className="ts-head-title">
            <Activity size={16} aria-hidden="true" />
            <span>{t('Animated Sequence: Aggressive Reclaim vs. Deferred Return')}</span>
          </span>
          <span className="ts-badge">{cur.title}</span>
        </div>
        <div className="ts-controls-row">
          {(Object.keys(seqPaths) as Array<'deferred' | 'aggressive' | 'noReturn'>).map((m) => (
            <button key={m} type="button" className={`ts-btn ${seqMode === m ? 'is-active' : ''}`} onClick={() => { setSeqMode(m); setSeqStep(3); }}>
              {seqPaths[m].label}
            </button>
          ))}
          <button type="button" className="ts-btn is-primary" onClick={() => setSeqPlaying((p) => !p)}>
            {seqPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{seqPlaying ? t('Pause') : t('Play')}</span>
          </button>
          <button type="button" className="ts-btn" onClick={() => { setSeqPlaying(false); setSeqStep(0); }}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 220" className="ts-svg" role="img" aria-label={t('Animated Sequence: Aggressive Reclaim vs. Deferred Return')}>
          <rect x="14" y="14" width="692" height="192" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <line x1="36" y1="84" x2="684" y2="84" stroke="var(--ts-sky)" strokeWidth="2" strokeDasharray="5 4" />
          <text x="44" y="76" fontSize="10.5" fontWeight="700" fill="var(--ts-sky)">110.5 Rejection Body Midpoint</text>
          <line x1="36" y1="118" x2="684" y2="118" stroke="var(--ts-muted)" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="44" y="132" fontSize="10.5" fill="var(--ts-muted)">110.0 Old High</text>
          <polyline fill="none" stroke="var(--ts-accent)" strokeWidth="3" points={poly} />
          {active.points.slice(0, vis).map((pt, i) => (
            <circle key={i} cx={pt[0]} cy={pt[1]} r={i === vis - 1 ? 6 : 4} fill={i === vis - 1 ? 'var(--ts-crimson)' : 'var(--ts-accent)'} />
          ))}
        </svg>
        <figcaption className="ts-caption"><strong>{cur.title}:</strong> {cur.note} — <em>{t('Synthetic illustration — not live quotes.')}</em></figcaption>
      </figure>
    );
  }

  if (kind === 'ts-calculator') {
    const preset = turtlePresets.find((p) => p.id === presetId) || turtlePresets[0];
    const m = computeRejectionMetrics({
      referenceExtreme: refEx,
      bodyBoundary: bodyBnd,
      wickExtreme: wickEx,
      targetPrice: targetPx,
      tickSize: preset.input.tickSize,
    });
    const dec = preset.input.tickSize < 0.01 ? 4 : 2;
    return (
      <figure className="ts-figure" data-ts-figure="ts-calculator">
        <div className="ts-figure-head">
          <span className="ts-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('Interactive Rejection Block & Turtle Soup Calculator')}</span>
          </span>
          <span className="ts-badge">{m.rewardToRisk.toFixed(2)}R</span>
        </div>
        <div className="ts-controls-row">
          {turtlePresets.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`ts-btn ${p.id === preset.id ? 'is-active' : ''}`}
              onClick={() => {
                setPresetId(p.id);
                setRefEx(p.input.referenceExtreme);
                setBodyBnd(p.input.bodyBoundary);
                setWickEx(p.input.wickExtreme);
                setTargetPx(p.input.targetPrice);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="ts-calc-grid">
          <label className="ts-calc-field"><span>Old Extreme (110)</span><input type="number" step={preset.input.tickSize} value={refEx} onChange={(e) => setRefEx(Number(e.target.value) || 0)} /></label>
          <label className="ts-calc-field"><span>Body Boundary (111)</span><input type="number" step={preset.input.tickSize} value={bodyBnd} onChange={(e) => setBodyBnd(Number(e.target.value) || 0)} /></label>
          <label className="ts-calc-field"><span>Wick Extreme (112)</span><input type="number" step={preset.input.tickSize} value={wickEx} onChange={(e) => setWickEx(Number(e.target.value) || 0)} /></label>
          <label className="ts-calc-field"><span>Target (106)</span><input type="number" step={preset.input.tickSize} value={targetPx} onChange={(e) => setTargetPx(Number(e.target.value) || 0)} /></label>
        </div>
        <div className="ts-stat-grid">
          <div className="ts-stat"><small>Body Midpoint (50%)</small><strong>{m.bodyMidpoint.toFixed(dec)}</strong></div>
          <div className="ts-stat"><small>Full-Wick Midpoint</small><strong>{m.fullSpanMidpoint.toFixed(dec)}</strong></div>
          <div className="ts-stat"><small>Stop Distance</small><strong>{m.stopTicks} ticks</strong></div>
          <div className="ts-stat"><small>Reward / Risk</small><strong>{m.rewardToRisk.toFixed(2)}R ({m.rewardTicks} ticks)</strong></div>
        </div>
      </figure>
    );
  }

  if (kind === 'ts-killzone-clock') {
    return (
      <figure className="ts-figure" data-ts-figure="ts-killzone-clock">
        <div className="ts-figure-head">
          <span className="ts-head-title">
            <Clock size={16} aria-hidden="true" />
            <span>{t('24-Hour New York Session Killzone & ETH/RTH Map')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 135" className="ts-svg" role="img" aria-label={t('24-Hour New York Session Killzone & ETH/RTH Map')}>
          <rect x="14" y="14" width="692" height="107" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <rect x="34" y="42" width="170" height="36" rx="6" fill="var(--ts-surface)" stroke="var(--ts-border)" />
          <text x="46" y="64" fontSize="11" fontWeight="600" fill="var(--ts-muted)">Asian ETH (20:00–00:00)</text>
          <rect x="216" y="42" width="150" height="36" rx="6" fill="color-mix(in srgb, var(--ts-sky) 18%, transparent)" stroke="var(--ts-sky)" />
          <text x="228" y="64" fontSize="11" fontWeight="700" fill="var(--ts-sky)">London (02:00–05:00)</text>
          <rect x="378" y="42" width="165" height="36" rx="6" fill="color-mix(in srgb, var(--ts-accent) 18%, transparent)" stroke="var(--ts-accent)" />
          <text x="390" y="64" fontSize="11" fontWeight="700" fill="var(--ts-accent)">NY AM RTH (08:30–11:00)</text>
          <rect x="555" y="42" width="130" height="36" rx="6" fill="color-mix(in srgb, var(--ts-amber) 18%, transparent)" stroke="var(--ts-amber)" />
          <text x="565" y="64" fontSize="11" fontWeight="700" fill="var(--ts-amber)">NY PM (13:30–16:00)</text>
          <text x="34" y="102" fontSize="10.5" fill="var(--ts-muted)">Always label ETH overnight highs separately from RTH cash-session highs.</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'ts-lrlr-gauntlet') {
    return (
      <figure className="ts-figure" data-ts-figure="ts-lrlr-gauntlet">
        <div className="ts-figure-head">
          <span className="ts-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('LRLR vs. HRLR Return Paths & Gauntlet Boundary')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 175" className="ts-svg" role="img" aria-label={t('LRLR vs. HRLR Return Paths & Gauntlet Boundary')}>
          <rect x="12" y="12" width="336" height="150" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <rect x="372" y="12" width="336" height="150" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <text x="28" y="36" fontSize="12" fontWeight="700" fill="var(--ts-emerald)">LRLR Return Path (Clear)</text>
          <path d="M40 58 L120 82 L200 112 L310 140" fill="none" stroke="var(--ts-emerald)" strokeWidth="3" />
          <text x="388" y="36" fontSize="12" fontWeight="700" fill="var(--ts-amber)">HRLR / Gauntlet Boundary</text>
          <path d="M398 134 L455 82 L505 118 L560 72 L620 108 L680 62" fill="none" stroke="var(--ts-amber)" strokeWidth="2.8" />
          <text x="388" y="146" fontSize="10.5" fill="var(--ts-muted)">Verify down-leg SIBI &amp; body-gap before labeling Gauntlet.</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'ts-blueprints') {
    return (
      <figure className="ts-figure" data-ts-figure="ts-blueprints">
        <div className="ts-figure-head">
          <span className="ts-head-title">
            <Crosshair size={16} aria-hidden="true" />
            <span>{t('Worked Blueprints: Bearish PDH & Bullish PDL Turtle Soup')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 185" className="ts-svg" role="img" aria-label={t('Worked Blueprints: Bearish PDH & Bullish PDL Turtle Soup')}>
          <rect x="12" y="12" width="336" height="160" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <rect x="372" y="12" width="336" height="160" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <text x="28" y="36" fontSize="12" fontWeight="700" fill="var(--ts-crimson)">Bearish PDH Turtle Soup (110→112→107→110.5)</text>
          <line x1="28" y1="68" x2="328" y2="68" stroke="var(--ts-muted)" strokeDasharray="4 4" />
          <path d="M40 100 L110 42 L185 145 L245 74 L315 152" fill="none" stroke="var(--ts-crimson)" strokeWidth="2.8" />
          <text x="388" y="36" fontSize="12" fontWeight="700" fill="var(--ts-emerald)">Bullish PDL Turtle Soup (Sweep → MSS → Up)</text>
          <line x1="388" y1="128" x2="688" y2="128" stroke="var(--ts-muted)" strokeDasharray="4 4" />
          <path d="M400 96 L470 154 L545 64 L605 120 L675 46" fill="none" stroke="var(--ts-emerald)" strokeWidth="2.8" />
        </svg>
      </figure>
    );
  }

  if (kind === 'ts-mistakes-comic') {
    return (
      <figure className="ts-figure" data-ts-figure="ts-mistakes-comic">
        <div className="ts-figure-head">
          <span className="ts-head-title">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{t('Stick-Figure Mistakes: 3 Turtle Soup Traps')}</span>
          </span>
        </div>
        <svg viewBox="0 0 760 215" className="ts-svg" role="img" aria-label={t('Stick-Figure Mistakes: 3 Turtle Soup Traps')}>
          <rect x="10" y="12" width="236" height="190" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <rect x="262" y="12" width="236" height="190" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <rect x="514" y="12" width="236" height="190" rx="10" fill="var(--rr-paper)" stroke="var(--ts-border)" />
          <text x="24" y="36" fontSize="11.5" fontWeight="700" fill="var(--ts-crimson)">Trap 1: Front-Running 110</text>
          <circle cx="58" cy="112" r="11" fill="none" stroke="var(--ts-ink)" strokeWidth="2.2" />
          <line x1="58" y1="123" x2="58" y2="158" stroke="var(--ts-ink)" strokeWidth="2.2" />
          <path d="M96 144 L154 78 L216 56" fill="none" stroke="var(--ts-crimson)" strokeWidth="2.8" />
          <text x="24" y="182" fontSize="10.5" fill="var(--ts-muted)">Shorting before sweep occurs</text>

          <text x="276" y="36" fontSize="11.5" fontWeight="700" fill="var(--ts-amber)">Trap 2: Fighting Acceptance</text>
          <line x1="278" y1="128" x2="482" y2="128" stroke="var(--ts-muted)" strokeDasharray="4 4" />
          <path d="M292 146 L350 100 L405 78 L465 56" fill="none" stroke="var(--ts-amber)" strokeWidth="2.8" />
          <text x="278" y="182" fontSize="10.5" fill="var(--ts-muted)">Bodies hold &gt; 110 (not a sweep)</text>

          <text x="528" y="36" fontSize="11.5" fontWeight="700" fill="var(--ts-sky)">Trap 3: Chasing Missed Return</text>
          <path d="M540 66 L604 148 L670 176 L724 172" fill="none" stroke="var(--ts-sky)" strokeWidth="2.8" />
          <text x="528" y="182" fontSize="10.5" fill="var(--ts-muted)">Forcing entry when 106 hit early</text>
        </svg>
      </figure>
    );
  }

  // ts-checklist-meter
  const pct = Math.round((checkedCount / 6) * 100);
  return (
    <figure className="ts-figure" data-ts-figure="ts-checklist-meter">
      <div className="ts-figure-head">
        <span className="ts-head-title">
          <CheckSquare size={16} aria-hidden="true" />
          <span>{t('Visual Gate Readiness Meter')}</span>
        </span>
        <span className="ts-badge">{checkedCount}/6 ({pct}%)</span>
      </div>
      <svg viewBox="0 0 720 48" className="ts-svg" role="img" aria-label={t('Visual Gate Readiness Meter')}>
        <rect x="8" y="10" width="704" height="24" rx="12" fill="var(--rr-paper)" stroke="var(--ts-border)" />
        <rect x="10" y="12" width={Math.max(12, Math.round((pct / 100) * 700))} height="20" rx="10" fill={pct === 100 ? 'var(--ts-emerald)' : 'var(--ts-accent)'} />
      </svg>
    </figure>
  );
}
