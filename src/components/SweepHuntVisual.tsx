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
import { evaluateSweepExcursion } from '../utils/sweepHuntMath';
import { SweepHuntScene } from './SweepHuntScene';

export type SweepHuntVisualKind =
  | 'sh-comic-intro'
  | 'sh-evidence-matrix'
  | 'sh-3d-engine'
  | 'sh-cascade-slippage'
  | 'sh-sequence-sim'
  | 'sh-calculator'
  | 'sh-sweep-vs-news'
  | 'sh-session-windows'
  | 'sh-blueprints'
  | 'sh-mistakes-comic'
  | 'sh-checklist-meter';

const checklistGates = [
  'Marked exact reference swing high/low prior to sweep',
  'Measured wick excursion in ticks/pips beyond the reference',
  'Verified candle-body close back inside (not acceptance beyond)',
  'Checked economic calendar for CPI/NFP/FOMC spread-widening events',
  'Added realistic stop-market slippage buffer in replay notes',
  'Separated observable price action from unverified intent claims',
];

export function SweepHuntVisual({
  kind,
  staticOnly = false,
}: {
  kind: SweepHuntVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();
  const [matrixTab, setMatrixTab] = useState<'shows' | 'hides'>('shows');
  const [simStep, setSimStep] = useState(0);
  const [simPlaying, setSimPlaying] = useState(false);

  const [referenceLevel, setReferenceLevel] = useState(5950);
  const [wickExtreme, setWickExtreme] = useState(5946.5);
  const [candleClose, setCandleClose] = useState(5952);
  const [tickSize, setTickSize] = useState(0.25);
  const [slippageTicks, setSlippageTicks] = useState(4);

  const [newsTab, setNewsTab] = useState<'clean' | 'news'>('clean');
  const [blueprint, setBlueprint] = useState<'es' | 'cpi'>('es');
  const [checked, setChecked] = useState<boolean[]>([true, true, false, false, false, false]);

  useEffect(() => {
    if (!simPlaying || staticOnly) return;
    const id = window.setInterval(() => setSimStep((s) => (s + 1) % 4), 1700);
    return () => window.clearInterval(id);
  }, [simPlaying, staticOnly]);

  if (kind === 'sh-3d-engine') {
    return <SweepHuntScene staticOnly={staticOnly} />;
  }

  if (kind === 'sh-comic-intro') {
    return (
      <figure className="sh-figure" data-sh-figure="sh-comic-intro">
        <div className="sh-figure-head">
          <span className="sh-head-title">
            <Compass size={16} aria-hidden="true" />
            <span>{t('Stick-Figure Story: Mind-Reading vs. Tape Evidence')}</span>
          </span>
          <span className="sh-badge">{t('Concept Comic')}</span>
        </div>
        <div className="sh-comic-grid">
          <div className="sh-comic-panel">
            <strong>{t('1. Emotional Reaction')}</strong>
            <p>{t('Calling every spike a predatory hunt explains nothing for the next trade.')}</p>
          </div>
          <div className="sh-comic-panel">
            <strong>{t('2. Order-Book Reality')}</strong>
            <p>{t('Triggered stops become market orders into thin opposing limit depth.')}</p>
          </div>
          <div className="sh-comic-panel">
            <strong>{t('3. Objective Measurement')}</strong>
            <p>{t('Measure tick excursion, candle close, and structure shift cleanly.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  if (kind === 'sh-evidence-matrix') {
    return (
      <figure className="sh-figure" data-sh-figure="sh-evidence-matrix">
        <div className="sh-figure-head">
          <span className="sh-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('Observable Evidence vs. Unobserved Intent Matrix')}</span>
          </span>
        </div>
        <div className="sh-controls-row">
          <button type="button" className={`sh-btn ${matrixTab === 'shows' ? 'is-active' : ''}`} onClick={() => setMatrixTab('shows')}>
            {t('What OHLC Shows')}
          </button>
          <button type="button" className={`sh-btn ${matrixTab === 'hides' ? 'is-active' : ''}`} onClick={() => setMatrixTab('hides')}>
            {t('What OHLC Hides')}
          </button>
        </div>
        <svg viewBox="0 0 720 155" className="sh-svg" role="img" aria-label={t('Observable Evidence vs. Unobserved Intent Matrix')}>
          <rect x="12" y="12" width="696" height="131" rx="10" fill="var(--rr-paper)" stroke="var(--sh-border)" />
          {matrixTab === 'shows' ? (
            <text x="36" y="82" fontSize="12" fontWeight="700" fill="#059669">
              Observable: Prior Swing High/Low · Exact Wick Excursion · Body Close Inside or Beyond
            </text>
          ) : (
            <text x="36" y="82" fontSize="12" fontWeight="700" fill="#e11d48">
              Unobserved: Exact Resting Stop Size · Participant Identity · Deliberate Manipulation Proof
            </text>
          )}
        </svg>
      </figure>
    );
  }

  if (kind === 'sh-cascade-slippage') {
    return (
      <figure className="sh-figure" data-sh-figure="sh-cascade-slippage">
        <div className="sh-figure-head">
          <span className="sh-head-title">
            <Crosshair size={16} aria-hidden="true" />
            <span>{t('Stop-Market Cascade & Slippage Diagram')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 175" className="sh-svg" role="img" aria-label={t('Stop-Market Cascade & Slippage Diagram')}>
          <rect x="12" y="12" width="696" height="151" rx="10" fill="var(--rr-paper)" stroke="var(--sh-border)" />
          <line x1="48" y1="68" x2="672" y2="68" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />
          <text x="56" y="56" fontSize="11" fontWeight="700" fill="#0284c7">Trigger Level → Stops Convert to Market Orders → Thin Depth Slippage</text>
          <path d="M80 132 L220 74 L350 32 L465 110 L615 138" fill="none" stroke="#e11d48" strokeWidth="3" />
        </svg>
      </figure>
    );
  }

  if (kind === 'sh-sequence-sim') {
    const steps = [
      'Step 1: Stops cluster just past an obvious swing reference.',
      'Step 2: Price triggers the boundary; stops convert to market orders.',
      'Step 3: Thin book depth stretches the spike (slippage wick).',
      'Step 4: Resting absorption completes and price closes back inside.',
    ];
    return (
      <figure className="sh-figure" data-sh-figure="sh-sequence-sim">
        <div className="sh-figure-head">
          <span className="sh-head-title">
            <Play size={16} aria-hidden="true" />
            <span>{t('Animated Sequence: Stop Cascade → Absorption → Reclaim')}</span>
          </span>
          <span className="sh-badge">{`Step ${simStep + 1} / 4`}</span>
        </div>
        <div className="sh-controls-row">
          <button type="button" className="sh-btn is-primary" onClick={() => setSimPlaying((p) => !p)}>
            {simPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{simPlaying ? t('Pause') : t('Auto-Play')}</span>
          </button>
          <button type="button" className="sh-btn" onClick={() => setSimStep((s) => (s + 1) % 4)}>
            {t('Next Step')}
          </button>
          <button type="button" className="sh-btn" onClick={() => { setSimPlaying(false); setSimStep(0); }}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 175" className="sh-svg" role="img" aria-label={t('Animated Sequence: Stop Cascade → Absorption → Reclaim')}>
          <rect x="12" y="12" width="696" height="151" rx="10" fill="var(--rr-paper)" stroke="var(--sh-border)" />
          <line x1="48" y1="68" x2="672" y2="68" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />
          <path
            d={
              simStep === 0
                ? 'M75 130 L185 88'
                : simStep === 1
                  ? 'M75 130 L185 88 L280 68'
                  : simStep === 2
                    ? 'M75 130 L185 88 L280 68 L395 30'
                    : 'M75 130 L185 88 L280 68 L395 30 L565 128'
            }
            fill="none"
            stroke="#e11d48"
            strokeWidth="3"
          />
          <text x="56" y="150" fontSize="11.5" fontWeight="700" fill="var(--sh-ink)">{steps[simStep]}</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'sh-calculator') {
    const res = evaluateSweepExcursion({
      referenceLevel,
      wickExtreme,
      candleClose,
      tickSize,
      slippageTicks,
    });
    return (
      <figure className="sh-figure" data-sh-figure="sh-calculator">
        <div className="sh-figure-head">
          <span className="sh-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('Wick Excursion & Slippage Buffer Calculator')}</span>
          </span>
          <span className="sh-badge">{t(res.classification)}</span>
        </div>
        <div className="sh-calc-grid">
          <label className="sh-field">
            <span>{t('Reference Level')}</span>
            <input type="number" step="0.25" value={referenceLevel} onChange={(e) => setReferenceLevel(Number(e.target.value) || 0)} />
          </label>
          <label className="sh-field">
            <span>{t('Wick Extreme')}</span>
            <input type="number" step="0.25" value={wickExtreme} onChange={(e) => setWickExtreme(Number(e.target.value) || 0)} />
          </label>
          <label className="sh-field">
            <span>{t('Candle Close')}</span>
            <input type="number" step="0.25" value={candleClose} onChange={(e) => setCandleClose(Number(e.target.value) || 0)} />
          </label>
          <label className="sh-field">
            <span>{t('Tick Size')}</span>
            <input type="number" step="0.01" min={0.0001} value={tickSize} onChange={(e) => setTickSize(Math.max(0.0001, Number(e.target.value) || 0.25))} />
          </label>
          <label className="sh-field">
            <span>{t('Planned Slippage (Ticks)')}</span>
            <input type="number" min={1} max={30} value={slippageTicks} onChange={(e) => setSlippageTicks(Math.max(1, Number(e.target.value) || 1))} />
          </label>
        </div>
        <div className="sh-metrics-row">
          <div className="sh-metric">
            <div className="sh-metric-label">{t('Classification')}</div>
            <div className="sh-metric-val">{t(res.classification)}</div>
          </div>
          <div className="sh-metric">
            <div className="sh-metric-label">{t('Excursion')}</div>
            <div className="sh-metric-val">{`${res.excursionTicks} ticks`}</div>
          </div>
          <div className="sh-metric">
            <div className="sh-metric-label">{t('Slippage Buffer')}</div>
            <div className="sh-metric-val">{`${res.slippageBufferTicks} ticks`}</div>
          </div>
        </div>
        <figcaption className="sh-caption">{res.guidance}</figcaption>
      </figure>
    );
  }

  if (kind === 'sh-sweep-vs-news') {
    return (
      <figure className="sh-figure" data-sh-figure="sh-sweep-vs-news">
        <div className="sh-figure-head">
          <span className="sh-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('Clean Liquidity Sweep vs. News Whipsaw')}</span>
          </span>
        </div>
        <div className="sh-controls-row">
          <button type="button" className={`sh-btn ${newsTab === 'clean' ? 'is-active' : ''}`} onClick={() => setNewsTab('clean')}>
            {t('Clean Sweep')}
          </button>
          <button type="button" className={`sh-btn ${newsTab === 'news' ? 'is-active' : ''}`} onClick={() => setNewsTab('news')}>
            {t('News Whipsaw')}
          </button>
        </div>
        <svg viewBox="0 0 720 165" className="sh-svg" role="img" aria-label={t('Clean Liquidity Sweep vs. News Whipsaw')}>
          <rect x="12" y="12" width="696" height="141" rx="10" fill="var(--rr-paper)" stroke="var(--sh-border)" />
          {newsTab === 'clean' ? (
            <path d="M75 118 L240 84 L360 36 L475 104 L615 132" fill="none" stroke="#059669" strokeWidth="3" />
          ) : (
            <path d="M75 84 L210 26 L310 142 L430 30 L560 138 L630 82" fill="none" stroke="#e11d48" strokeWidth="3" />
          )}
        </svg>
      </figure>
    );
  }

  if (kind === 'sh-session-windows') {
    return (
      <figure className="sh-figure" data-sh-figure="sh-session-windows">
        <div className="sh-figure-head">
          <span className="sh-head-title">
            <Clock size={16} aria-hidden="true" />
            <span>{t('Session Transition Sweep Windows (ET)')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 145" className="sh-svg" role="img" aria-label={t('Session Transition Sweep Windows (ET)')}>
          <rect x="12" y="12" width="696" height="121" rx="10" fill="var(--rr-paper)" stroke="var(--sh-border)" />
          <rect x="38" y="34" width="190" height="76" rx="8" fill="#0284c7" opacity="0.1" stroke="#0284c7" />
          <text x="52" y="62" fontSize="11" fontWeight="700" fill="#0284c7">London (02:00–05:00 ET)</text>
          <rect x="264" y="34" width="190" height="76" rx="8" fill="#d97706" opacity="0.1" stroke="#d97706" />
          <text x="278" y="62" fontSize="11" fontWeight="700" fill="#d97706">NY Macro (08:30 ET)</text>
          <rect x="490" y="34" width="190" height="76" rx="8" fill="#e11d48" opacity="0.1" stroke="#e11d48" />
          <text x="504" y="62" fontSize="11" fontWeight="700" fill="#e11d48">Equity Open (09:30 ET)</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'sh-blueprints') {
    return (
      <figure className="sh-figure" data-sh-figure="sh-blueprints">
        <div className="sh-figure-head">
          <span className="sh-head-title">
            <BookOpen size={16} aria-hidden="true" />
            <span>{t('Worked Blueprints: ES Open vs. CPI Spike')}</span>
          </span>
        </div>
        <div className="sh-controls-row">
          <button type="button" className={`sh-btn ${blueprint === 'es' ? 'is-active' : ''}`} onClick={() => setBlueprint('es')}>
            {t('ES 09:32 Sweep')}
          </button>
          <button type="button" className={`sh-btn ${blueprint === 'cpi' ? 'is-active' : ''}`} onClick={() => setBlueprint('cpi')}>
            {t('CPI Two-Sided Spike')}
          </button>
        </div>
        <svg viewBox="0 0 720 165" className="sh-svg" role="img" aria-label={t('Worked Blueprints: ES Open vs. CPI Spike')}>
          <rect x="12" y="12" width="696" height="141" rx="10" fill="var(--rr-paper)" stroke="var(--sh-border)" />
          {blueprint === 'es' ? (
            <path d="M75 56 L220 108 L345 140 L485 72 L615 44" fill="none" stroke="#059669" strokeWidth="2.8" />
          ) : (
            <path d="M75 84 L220 26 L340 144 L475 34 L615 128" fill="none" stroke="#e11d48" strokeWidth="2.8" />
          )}
        </svg>
      </figure>
    );
  }

  if (kind === 'sh-mistakes-comic') {
    return (
      <figure className="sh-figure" data-sh-figure="sh-mistakes-comic">
        <div className="sh-figure-head">
          <span className="sh-head-title">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{t('Common Mistakes Calling Moves Stop Hunts')}</span>
          </span>
        </div>
        <div className="sh-comic-grid">
          <div className="sh-comic-panel">
            <strong>{t('Mistake 1: Stop on EQH/EQL Edge')}</strong>
            <p>{t('Placing stops right at obvious double tops invites normal noise sweeps.')}</p>
          </div>
          <div className="sh-comic-panel">
            <strong>{t('Mistake 2: Ignoring News Spreads')}</strong>
            <p>{t('Wide CPI/NFP spreads are liquidity pullbacks, not clean directional sweeps.')}</p>
          </div>
          <div className="sh-comic-panel">
            <strong>{t('Mistake 3: Skipping Close Check')}</strong>
            <p>{t('Always verify whether the candle body closed inside or outside the pool.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  const passed = checked.filter(Boolean).length;
  const pct = Math.round((passed / checklistGates.length) * 100);
  return (
    <figure className="sh-figure" data-sh-figure="sh-checklist-meter">
      <div className="sh-figure-head">
        <span className="sh-head-title">
          <CheckSquare size={16} aria-hidden="true" />
          <span>{t('Pre-Replay Sweep Observation 6-Gate Checklist')}</span>
        </span>
        <span className="sh-badge">{`${passed} / ${checklistGates.length} (${pct}%)`}</span>
      </div>
      <div className="sh-checklist">
        {checklistGates.map((gate, i) => (
          <label key={gate} className="sh-check-item">
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
      <div className="sh-meter-track" aria-hidden="true">
        <div className="sh-meter-fill" style={{ width: `${pct}%` }} />
      </div>
      <figcaption className="sh-caption">
        {t('Verify every observable gate before recording a sweep study.')}
      </figcaption>
    </figure>
  );
}
