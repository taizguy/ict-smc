import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  CheckCircle2,
  CheckSquare,
  Clock,
  Compass,
  Crosshair,
  GitCompare,
  Layers,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { evaluateEqhEqlCluster } from '../utils/eqhEqlMath';
import { EqhEqlScene } from './EqhEqlScene';

export type EqhEqlVisualKind =
  | 'eq-comic-intro'
  | 'eq-tolerance-band'
  | 'eq-3d-shelf'
  | 'eq-marking-steps'
  | 'eq-sequence-sim'
  | 'eq-calculator'
  | 'eq-shelf-vs-swing'
  | 'eq-session-windows'
  | 'eq-blueprints'
  | 'eq-mistakes-comic'
  | 'eq-checklist-meter';

const checklistGates = [
  'Defined fixed tick/pip tolerance before inspecting chart outcomes',
  'Anchored pool on 15m–4H timeframe rather than 1m micro-noise',
  'Verified two or more distinct swings separated by a clear pullback',
  'Waited for price excursion beyond the EQH/EQL shelf',
  'Checked candle-body close (reclaim inside vs. acceptance beyond)',
  'Logged both sweep reversals and trend breakouts without bias',
];

export function EqhEqlVisual({
  kind,
  staticOnly = false,
}: {
  kind: EqhEqlVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();
  const [bandMode, setBandMode] = useState<'exact-eqh' | 'rel-eqh' | 'rel-eql'>('exact-eqh');
  const [simStep, setSimStep] = useState(0);
  const [simPlaying, setSimPlaying] = useState(false);

  const [swingA, setSwingA] = useState(20150);
  const [swingB, setSwingB] = useState(20148.75);
  const [tolerance, setTolerance] = useState(3);
  const [touchCount, setTouchCount] = useState(2);
  const [timeframe, setTimeframe] = useState<'15m' | '1H' | '4H' | 'Daily'>('1H');

  const [blueprint, setBlueprint] = useState<'nq' | 'xau'>('nq');
  const [checked, setChecked] = useState<boolean[]>([true, true, false, false, false, false]);

  useEffect(() => {
    if (!simPlaying || staticOnly) return;
    const id = window.setInterval(() => setSimStep((s) => (s + 1) % 4), 1700);
    return () => window.clearInterval(id);
  }, [simPlaying, staticOnly]);

  if (kind === 'eq-3d-shelf') {
    return <EqhEqlScene staticOnly={staticOnly} />;
  }

  if (kind === 'eq-comic-intro') {
    return (
      <figure className="eq-figure" data-eq-figure="eq-comic-intro">
        <div className="eq-figure-head">
          <span className="eq-head-title">
            <Compass size={16} aria-hidden="true" />
            <span>{t('Stick-Figure Story: Double Top Trap vs. EQH Pool')}</span>
          </span>
          <span className="eq-badge">{t('Concept Comic')}</span>
        </div>
        <div className="eq-comic-grid">
          <div className="eq-comic-panel">
            <strong>{t('1. Retail Double Top')}</strong>
            <svg viewBox="0 0 210 100" className="eq-svg" role="img" aria-label={t('1. Retail Double Top')}>
              <rect x="6" y="6" width="198" height="88" rx="8" fill="var(--eq-surface)" />
              <line x1="18" y1="36" x2="192" y2="36" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M22 82 L68 38 L104 68 L142 38 L184 74" fill="none" stroke="var(--eq-ink)" strokeWidth="2.4" />
            </svg>
            <p>{t('Textbook double top attracts aggressive early shorts.')}</p>
          </div>
          <div className="eq-comic-panel">
            <strong>{t('2. Stop & Breakout Cluster')}</strong>
            <svg viewBox="0 0 210 100" className="eq-svg" role="img" aria-label={t('2. Stop & Breakout Cluster')}>
              <rect x="6" y="6" width="198" height="88" rx="8" fill="var(--eq-surface)" />
              <rect x="24" y="22" width="162" height="18" rx="4" fill="#7c3aed" opacity="0.2" stroke="#7c3aed" />
              <path d="M22 82 L68 42 L104 70 L142 42 L184 70" fill="none" stroke="var(--eq-ink)" strokeWidth="2.4" />
            </svg>
            <p>{t('Short stops and breakout buy-stops stack just above EQH.')}</p>
          </div>
          <div className="eq-comic-panel">
            <strong>{t('3. Sweep & Reclaim')}</strong>
            <svg viewBox="0 0 210 100" className="eq-svg" role="img" aria-label={t('3. Sweep & Reclaim')}>
              <rect x="6" y="6" width="198" height="88" rx="8" fill="var(--eq-surface)" />
              <line x1="18" y1="42" x2="192" y2="42" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M22 76 L92 44 L134 20 L182 82" fill="none" stroke="#e11d48" strokeWidth="2.6" />
            </svg>
            <p>{t('Price pierces the shelf, tags stops, and closes back inside.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  if (kind === 'eq-tolerance-band') {
    return (
      <figure className="eq-figure" data-eq-figure="eq-tolerance-band">
        <div className="eq-figure-head">
          <span className="eq-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('Exact vs. Relative EQH/EQL Band Dissector')}</span>
          </span>
        </div>
        <div className="eq-controls-row">
          <button type="button" className={`eq-btn ${bandMode === 'exact-eqh' ? 'is-active' : ''}`} onClick={() => setBandMode('exact-eqh')}>
            {t('Exact EQH')}
          </button>
          <button type="button" className={`eq-btn ${bandMode === 'rel-eqh' ? 'is-active' : ''}`} onClick={() => setBandMode('rel-eqh')}>
            {t('Relative EQH')}
          </button>
          <button type="button" className={`eq-btn ${bandMode === 'rel-eql' ? 'is-active' : ''}`} onClick={() => setBandMode('rel-eql')}>
            {t('Relative EQL')}
          </button>
        </div>
        <svg viewBox="0 0 720 185" className="eq-svg" role="img" aria-label={t('Exact vs. Relative EQH/EQL Band Dissector')}>
          <rect x="12" y="12" width="696" height="161" rx="10" fill="var(--rr-paper)" stroke="var(--eq-border)" />
          {bandMode === 'exact-eqh' && (
            <>
              <rect x="60" y="54" width="600" height="12" rx="3" fill="#7c3aed" opacity="0.2" stroke="#7c3aed" />
              <path d="M75 144 L210 60 L335 120 L465 60 L600 132" fill="none" stroke="#7c3aed" strokeWidth="2.8" />
              <text x="72" y="44" fontSize="11" fontWeight="700" fill="#7c3aed">Exact EQH: Peaks aligned within 0–2 ticks</text>
            </>
          )}
          {bandMode === 'rel-eqh' && (
            <>
              <rect x="60" y="48" width="600" height="24" rx="4" fill="#7c3aed" opacity="0.16" stroke="#7c3aed" strokeDasharray="5 3" />
              <path d="M75 144 L210 52 L335 120 L465 66 L600 32" fill="none" stroke="#059669" strokeWidth="2.8" />
              <text x="72" y="40" fontSize="11" fontWeight="700" fill="#7c3aed">Relative EQH Tolerance Band (Second Peak Slightly Lower)</text>
            </>
          )}
          {bandMode === 'rel-eql' && (
            <>
              <rect x="60" y="114" width="600" height="24" rx="4" fill="#e11d48" opacity="0.16" stroke="#e11d48" strokeDasharray="5 3" />
              <path d="M75 48 L210 132 L335 66 L465 118 L600 156" fill="none" stroke="#e11d48" strokeWidth="2.8" />
              <text x="72" y="156" fontSize="11" fontWeight="700" fill="#e11d48">Relative EQL Tolerance Band (Second Low Slightly Higher)</text>
            </>
          )}
        </svg>
      </figure>
    );
  }

  if (kind === 'eq-marking-steps') {
    return (
      <figure className="eq-figure" data-eq-figure="eq-marking-steps">
        <div className="eq-figure-head">
          <span className="eq-head-title">
            <Crosshair size={16} aria-hidden="true" />
            <span>{t('4-Step Chart Marking Blueprint')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 155" className="eq-svg" role="img" aria-label={t('4-Step Chart Marking Blueprint')}>
          <rect x="12" y="12" width="696" height="131" rx="10" fill="var(--rr-paper)" stroke="var(--eq-border)" />
          <text x="36" y="48" fontSize="11.5" fontWeight="700" fill="#7c3aed">1. Open 1H / 4H Chart → 2. Find 2+ Swings → 3. Check Tolerance → 4. Draw Ray &amp; Wait</text>
          <path d="M48 112 L160 72 L245 104 L350 74 L445 106 L580 56" fill="none" stroke="#7c3aed" strokeWidth="2.6" />
          <line x1="160" y1="72" x2="660" y2="72" stroke="#059669" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      </figure>
    );
  }

  if (kind === 'eq-sequence-sim') {
    const steps = [
      'Step 1: Swing 1 prints a clear high.',
      'Step 2: Swing 2 stalls inside tolerance → EQH shelf formed.',
      'Step 3: Fast expansion pierces above the EQH shelf.',
      'Step 4: Candle closes back inside → Sweep & Reclaim confirmed.',
    ];
    return (
      <figure className="eq-figure" data-eq-figure="eq-sequence-sim">
        <div className="eq-figure-head">
          <span className="eq-head-title">
            <Play size={16} aria-hidden="true" />
            <span>{t('Animated Sequence: EQH Build → Sweep → Reclaim')}</span>
          </span>
          <span className="eq-badge">{`Step ${simStep + 1} / 4`}</span>
        </div>
        <div className="eq-controls-row">
          <button type="button" className="eq-btn is-primary" onClick={() => setSimPlaying((p) => !p)}>
            {simPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{simPlaying ? t('Pause') : t('Auto-Play')}</span>
          </button>
          <button type="button" className="eq-btn" onClick={() => setSimStep((s) => (s + 1) % 4)}>
            {t('Next Step')}
          </button>
          <button type="button" className="eq-btn" onClick={() => { setSimPlaying(false); setSimStep(0); }}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 180" className="eq-svg" role="img" aria-label={t('Animated Sequence: EQH Build → Sweep → Reclaim')}>
          <rect x="12" y="12" width="696" height="156" rx="10" fill="var(--rr-paper)" stroke="var(--eq-border)" />
          <line x1="48" y1="68" x2="672" y2="68" stroke="#7c3aed" strokeWidth="2" strokeDasharray="6 4" />
          <path
            d={
              simStep === 0
                ? 'M75 132 L175 68 L245 106'
                : simStep === 1
                  ? 'M75 132 L175 68 L245 106 L345 70 L415 108'
                  : simStep === 2
                    ? 'M75 132 L175 68 L245 106 L345 70 L415 108 L515 36'
                    : 'M75 132 L175 68 L245 106 L345 70 L415 108 L515 36 L620 128'
            }
            fill="none"
            stroke="#7c3aed"
            strokeWidth="3"
          />
          <text x="56" y="154" fontSize="11.5" fontWeight="700" fill="var(--eq-ink)">{steps[simStep]}</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'eq-calculator') {
    const res = evaluateEqhEqlCluster({ swingA, swingB, tolerance, touchCount, timeframe });
    return (
      <figure className="eq-figure" data-eq-figure="eq-calculator">
        <div className="eq-figure-head">
          <span className="eq-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('EQH / EQL Tolerance & Cluster Priority Calculator')}</span>
          </span>
          <span className="eq-badge">{t(res.label)}</span>
        </div>
        <div className="eq-calc-grid">
          <label className="eq-field">
            <span>{t('Swing A')}</span>
            <input type="number" step="0.25" value={swingA} onChange={(e) => setSwingA(Number(e.target.value) || 0)} />
          </label>
          <label className="eq-field">
            <span>{t('Swing B')}</span>
            <input type="number" step="0.25" value={swingB} onChange={(e) => setSwingB(Number(e.target.value) || 0)} />
          </label>
          <label className="eq-field">
            <span>{t('Max Tolerance')}</span>
            <input type="number" step="0.25" min={0.0001} value={tolerance} onChange={(e) => setTolerance(Math.max(0.0001, Number(e.target.value) || 1))} />
          </label>
          <label className="eq-field">
            <span>{t('Touches')}</span>
            <input type="number" min={2} max={6} value={touchCount} onChange={(e) => setTouchCount(Math.max(2, Math.min(6, Number(e.target.value) || 2)))} />
          </label>
          <label className="eq-field">
            <span>{t('Timeframe')}</span>
            <select value={timeframe} onChange={(e) => setTimeframe(e.target.value as '15m' | '1H' | '4H' | 'Daily')}>
              <option value="15m">15m</option>
              <option value="1H">1H</option>
              <option value="4H">4H</option>
              <option value="Daily">Daily</option>
            </select>
          </label>
        </div>
        <div className="eq-metrics-row">
          <div className="eq-metric">
            <div className="eq-metric-label">{t('Measured Spread')}</div>
            <div className="eq-metric-val">{String(res.spread)}</div>
          </div>
          <div className="eq-metric">
            <div className="eq-metric-label">{t('Classification')}</div>
            <div className="eq-metric-val">{t(res.label)}</div>
          </div>
          <div className="eq-metric">
            <div className="eq-metric-label">{t('Priority Score')}</div>
            <div className="eq-metric-val">{`${res.priorityScore} / 100`}</div>
          </div>
        </div>
        <figcaption className="eq-caption">{res.guidance}</figcaption>
      </figure>
    );
  }

  if (kind === 'eq-shelf-vs-swing') {
    return (
      <figure className="eq-figure" data-eq-figure="eq-shelf-vs-swing">
        <div className="eq-figure-head">
          <span className="eq-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('EQH/EQL Shelf vs. Single Swing & Trendline')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 155" className="eq-svg" role="img" aria-label={t('EQH/EQL Shelf vs. Single Swing & Trendline')}>
          <rect x="12" y="12" width="696" height="131" rx="10" fill="var(--rr-paper)" stroke="var(--eq-border)" />
          <line x1="48" y1="60" x2="320" y2="60" stroke="#7c3aed" strokeWidth="2.4" strokeDasharray="6 4" />
          <text x="48" y="48" fontSize="11" fontWeight="700" fill="#7c3aed">Horizontal EQH Shelf (Zoom-Invariant)</text>
          <line x1="390" y1="112" x2="660" y2="48" stroke="#d97706" strokeWidth="2.4" strokeDasharray="6 4" />
          <text x="390" y="128" fontSize="11" fontWeight="700" fill="#d97706">Diagonal Trendline (Scale-Sensitive)</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'eq-session-windows') {
    return (
      <figure className="eq-figure" data-eq-figure="eq-session-windows">
        <div className="eq-figure-head">
          <span className="eq-head-title">
            <Clock size={16} aria-hidden="true" />
            <span>{t('Intraday EQH/EQL Formation Windows (ET)')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 150" className="eq-svg" role="img" aria-label={t('Intraday EQH/EQL Formation Windows (ET)')}>
          <rect x="12" y="12" width="696" height="126" rx="10" fill="var(--rr-paper)" stroke="var(--eq-border)" />
          <rect x="38" y="36" width="190" height="78" rx="8" fill="#7c3aed" opacity="0.1" stroke="#7c3aed" />
          <text x="52" y="64" fontSize="11" fontWeight="700" fill="#7c3aed">Asia (20:00–00:00 ET)</text>
          <rect x="264" y="36" width="190" height="78" rx="8" fill="#059669" opacity="0.1" stroke="#059669" />
          <text x="278" y="64" fontSize="11" fontWeight="700" fill="#059669">NY Pre (07:00–08:30 ET)</text>
          <rect x="490" y="36" width="190" height="78" rx="8" fill="#d97706" opacity="0.1" stroke="#d97706" />
          <text x="504" y="64" fontSize="11" fontWeight="700" fill="#d97706">Lunch (12:00–13:30 ET)</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'eq-blueprints') {
    return (
      <figure className="eq-figure" data-eq-figure="eq-blueprints">
        <div className="eq-figure-head">
          <span className="eq-head-title">
            <BookOpen size={16} aria-hidden="true" />
            <span>{t('Worked Blueprints: NQ EQH vs. XAU/USD EQL')}</span>
          </span>
        </div>
        <div className="eq-controls-row">
          <button type="button" className={`eq-btn ${blueprint === 'nq' ? 'is-active' : ''}`} onClick={() => setBlueprint('nq')}>
            {t('NQ 15m EQH')}
          </button>
          <button type="button" className={`eq-btn ${blueprint === 'xau' ? 'is-active' : ''}`} onClick={() => setBlueprint('xau')}>
            {t('XAU/USD 1H EQL')}
          </button>
        </div>
        <svg viewBox="0 0 720 170" className="eq-svg" role="img" aria-label={t('Worked Blueprints: NQ EQH vs. XAU/USD EQL')}>
          <rect x="12" y="12" width="696" height="146" rx="10" fill="var(--rr-paper)" stroke="var(--eq-border)" />
          {blueprint === 'nq' ? (
            <>
              <line x1="48" y1="60" x2="672" y2="60" stroke="#7c3aed" strokeWidth="2" strokeDasharray="6 4" />
              <path d="M75 130 L190 62 L285 104 L385 62 L495 36 L615 126" fill="none" stroke="#7c3aed" strokeWidth="2.8" />
            </>
          ) : (
            <>
              <line x1="48" y1="120" x2="672" y2="120" stroke="#e11d48" strokeWidth="2" strokeDasharray="6 4" />
              <path d="M75 48 L190 118 L285 78 L385 114 L495 144 L615 54" fill="none" stroke="#059669" strokeWidth="2.8" />
            </>
          )}
        </svg>
      </figure>
    );
  }

  if (kind === 'eq-mistakes-comic') {
    return (
      <figure className="eq-figure" data-eq-figure="eq-mistakes-comic">
        <div className="eq-figure-head">
          <span className="eq-head-title">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{t('Common Mistakes with Equal Highs & Lows')}</span>
          </span>
        </div>
        <div className="eq-comic-grid">
          <div className="eq-comic-panel">
            <strong>{t('Mistake 1: Bending Tolerance')}</strong>
            <p>{t('Widening tick tolerance after seeing the move creates hindsight bias.')}</p>
          </div>
          <div className="eq-comic-panel">
            <strong>{t('Mistake 2: Pre-Close Entry')}</strong>
            <p>{t('Selling a touch of EQH before the candle closes back inside risks getting run over.')}</p>
          </div>
          <div className="eq-comic-panel">
            <strong>{t('Mistake 3: Fighting Strong Trend')}</strong>
            <p>{t('In strong expansion, EQH often serves as fuel for continuation.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  const passed = checked.filter(Boolean).length;
  const pct = Math.round((passed / checklistGates.length) * 100);
  return (
    <figure className="eq-figure" data-eq-figure="eq-checklist-meter">
      <div className="eq-figure-head">
        <span className="eq-head-title">
          <CheckSquare size={16} aria-hidden="true" />
          <span>{t('Pre-Replay EQH / EQL 6-Gate Checklist')}</span>
        </span>
        <span className="eq-badge">{`${passed} / ${checklistGates.length} (${pct}%)`}</span>
      </div>
      <div className="eq-checklist">
        {checklistGates.map((gate, i) => (
          <label key={gate} className="eq-check-item">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
            />
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>{t(gate)}</span>
          </label>
        ))}
      </div>
      <div className="eq-meter-track" aria-hidden="true">
        <div className="eq-meter-fill" style={{ width: `${pct}%` }} />
      </div>
      <figcaption className="eq-caption">
        {t('Verify every gate before logging an EQH or EQL study in replay.')}
      </figcaption>
    </figure>
  );
}
