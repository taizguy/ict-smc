import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  CheckCircle2,
  CheckSquare,
  Compass,
  GitCompare,
  Layers,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { classifyStructuralBreak } from '../utils/bosChochMssMath';
import { BosChochMssScene } from './BosChochMssScene';

export type BosChochMssVisualKind =
  | 'bcm-comic-intro'
  | 'bcm-geometry'
  | 'bcm-3d-compare'
  | 'bcm-sequence-sim'
  | 'bcm-classifier'
  | 'bcm-mtf-align'
  | 'bcm-blueprints'
  | 'bcm-mistakes-comic'
  | 'bcm-checklist-meter';

const checklistGates = [
  'Identified active trend direction prior to the break candle',
  'Labeled whether the break is with-trend (BOS) or counter-trend',
  'Verified candle-body close beyond the pre-marked swing',
  'Checked prior BSL/SSL sweep and displacement for MSS calls',
  'Noted timeframe scale (5m vs. 1H vs. 4H) beside the label',
  'Recorded follow-through or reclaim failure without hindsight',
];

export function BosChochMssVisual({
  kind,
  staticOnly = false,
}: {
  kind: BosChochMssVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();
  const [simStep, setSimStep] = useState(0);
  const [simPlaying, setSimPlaying] = useState(false);

  const [direction, setDirection] = useState<'with-trend' | 'counter-trend'>('counter-trend');
  const [priorSweep, setPriorSweep] = useState(true);
  const [displacement, setDisplacement] = useState(true);
  const [closedBeyond, setClosedBeyond] = useState(true);

  const [blueprint, setBlueprint] = useState<'nq' | 'ny'>('nq');
  const [checked, setChecked] = useState<boolean[]>([true, true, false, false, false, false]);

  useEffect(() => {
    if (!simPlaying || staticOnly) return;
    const id = window.setInterval(() => setSimStep((s) => (s + 1) % 4), 1700);
    return () => window.clearInterval(id);
  }, [simPlaying, staticOnly]);

  if (kind === 'bcm-3d-compare') {
    return <BosChochMssScene staticOnly={staticOnly} />;
  }

  if (kind === 'bcm-comic-intro') {
    return (
      <figure className="bcm-figure" data-bcm-figure="bcm-comic-intro">
        <div className="bcm-figure-head">
          <span className="bcm-head-title">
            <Compass size={16} aria-hidden="true" />
            <span>{t('Stick-Figure Story: Three Breaks, Three Meanings')}</span>
          </span>
          <span className="bcm-badge">{t('Concept Comic')}</span>
        </div>
        <div className="bcm-comic-grid">
          <div className="bcm-comic-panel">
            <strong>{t('1. BOS (Continuation)')}</strong>
            <p>{t('Breaks with the existing trend to confirm ongoing momentum.')}</p>
          </div>
          <div className="bcm-comic-panel">
            <strong>{t('2. CHoCH (First Warning)')}</strong>
            <p>{t('First counter-trend break signaling caution on the current leg.')}</p>
          </div>
          <div className="bcm-comic-panel">
            <strong>{t('3. MSS (Shift + Context)')}</strong>
            <p>{t('Counter-trend break paired with prior sweep and displacement.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  if (kind === 'bcm-geometry') {
    return (
      <figure className="bcm-figure" data-bcm-figure="bcm-geometry">
        <div className="bcm-figure-head">
          <span className="bcm-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('Side-by-Side Geometry: BOS vs. CHoCH vs. MSS')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 165" className="bcm-svg" role="img" aria-label={t('Side-by-Side Geometry: BOS vs. CHoCH vs. MSS')}>
          <rect x="12" y="12" width="696" height="141" rx="10" fill="var(--rr-paper)" stroke="var(--bcm-border)" />
          <path d="M40 126 L105 74 L145 96 L215 44" fill="none" stroke="#059669" strokeWidth="2.8" />
          <text x="64" y="142" fontSize="10.5" fontWeight="700" fill="#059669">BOS (With Trend)</text>
          <path d="M270 116 L345 48 L395 88 L450 126" fill="none" stroke="#d97706" strokeWidth="2.8" />
          <text x="295" y="142" fontSize="10.5" fontWeight="700" fill="#d97706">CHoCH (Warning)</text>
          <path d="M510 104 L575 34 L630 132" fill="none" stroke="#9333ea" strokeWidth="2.8" />
          <text x="530" y="142" fontSize="10.5" fontWeight="700" fill="#9333ea">MSS (Sweep+Displace)</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'bcm-sequence-sim') {
    const steps = [
      'Step 1: Bullish trend prints a clean BOS continuation.',
      'Step 2: Price tags overhead BSL and stalls.',
      'Step 3: First counter-trend break flashes CHoCH warning.',
      'Step 4: Energetic displacement confirms full MSS.',
    ];
    return (
      <figure className="bcm-figure" data-bcm-figure="bcm-sequence-sim">
        <div className="bcm-figure-head">
          <span className="bcm-head-title">
            <Play size={16} aria-hidden="true" />
            <span>{t('Animated Sequence: BOS → CHoCH → MSS')}</span>
          </span>
          <span className="bcm-badge">{`Step ${simStep + 1} / 4`}</span>
        </div>
        <div className="bcm-controls-row">
          <button type="button" className="bcm-btn is-primary" onClick={() => setSimPlaying((p) => !p)}>
            {simPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{simPlaying ? t('Pause') : t('Auto-Play')}</span>
          </button>
          <button type="button" className="bcm-btn" onClick={() => setSimStep((s) => (s + 1) % 4)}>
            {t('Next Step')}
          </button>
          <button type="button" className="bcm-btn" onClick={() => { setSimPlaying(false); setSimStep(0); }}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 170" className="bcm-svg" role="img" aria-label={t('Animated Sequence: BOS → CHoCH → MSS')}>
          <rect x="12" y="12" width="696" height="146" rx="10" fill="var(--rr-paper)" stroke="var(--bcm-border)" />
          <path
            d={
              simStep === 0
                ? 'M65 130 L175 72 L245 94 L350 42'
                : simStep === 1
                  ? 'M65 130 L175 72 L245 94 L350 42 L430 32'
                  : simStep === 2
                    ? 'M65 130 L175 72 L245 94 L350 42 L430 32 L505 104'
                    : 'M65 130 L175 72 L245 94 L350 42 L430 32 L505 104 L625 136'
            }
            fill="none"
            stroke="#9333ea"
            strokeWidth="3"
          />
          <text x="56" y="148" fontSize="11.5" fontWeight="700" fill="var(--bcm-ink)">{steps[simStep]}</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'bcm-classifier') {
    const res = classifyStructuralBreak({ direction, priorSweep, displacement, closedBeyond });
    return (
      <figure className="bcm-figure" data-bcm-figure="bcm-classifier">
        <div className="bcm-figure-head">
          <span className="bcm-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('Interactive Break Classifier (BOS vs. CHoCH vs. MSS)')}</span>
          </span>
          <span className="bcm-badge">{t(res.label)}</span>
        </div>
        <div className="bcm-calc-grid">
          <label className="bcm-field">
            <span>{t('Break Direction')}</span>
            <select value={direction} onChange={(e) => setDirection(e.target.value as 'with-trend' | 'counter-trend')}>
              <option value="with-trend">{t('With-Trend')}</option>
              <option value="counter-trend">{t('Counter-Trend')}</option>
            </select>
          </label>
          <label className="bcm-field">
            <span>{t('Prior Liquidity Sweep?')}</span>
            <select value={priorSweep ? 'yes' : 'no'} onChange={(e) => setPriorSweep(e.target.value === 'yes')}>
              <option value="yes">{t('Yes')}</option>
              <option value="no">{t('No')}</option>
            </select>
          </label>
          <label className="bcm-field">
            <span>{t('Displacement?')}</span>
            <select value={displacement ? 'yes' : 'no'} onChange={(e) => setDisplacement(e.target.value === 'yes')}>
              <option value="yes">{t('Yes')}</option>
              <option value="no">{t('No')}</option>
            </select>
          </label>
          <label className="bcm-field">
            <span>{t('Candle Close Beyond?')}</span>
            <select value={closedBeyond ? 'yes' : 'no'} onChange={(e) => setClosedBeyond(e.target.value === 'yes')}>
              <option value="yes">{t('Yes')}</option>
              <option value="no">{t('No')}</option>
            </select>
          </label>
        </div>
        <figcaption className="bcm-caption">{res.role}</figcaption>
      </figure>
    );
  }

  if (kind === 'bcm-mtf-align') {
    return (
      <figure className="bcm-figure" data-bcm-figure="bcm-mtf-align">
        <div className="bcm-figure-head">
          <span className="bcm-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('5m CHoCH Inside 4H BOS Alignment')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 155" className="bcm-svg" role="img" aria-label={t('5m CHoCH Inside 4H BOS Alignment')}>
          <rect x="12" y="12" width="696" height="131" rx="10" fill="var(--rr-paper)" stroke="var(--bcm-border)" />
          <path d="M50 124 L250 56 L360 92 L620 26" fill="none" stroke="#059669" strokeWidth="3" />
          <text x="56" y="42" fontSize="11" fontWeight="700" fill="#059669">4H Bullish BOS Sequence (5m CHoCH = Local Pullback)</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'bcm-blueprints') {
    return (
      <figure className="bcm-figure" data-bcm-figure="bcm-blueprints">
        <div className="bcm-figure-head">
          <span className="bcm-head-title">
            <BookOpen size={16} aria-hidden="true" />
            <span>{t('Worked Blueprints: NQ BOS vs. NY AM MSS')}</span>
          </span>
        </div>
        <div className="bcm-controls-row">
          <button type="button" className={`bcm-btn ${blueprint === 'nq' ? 'is-active' : ''}`} onClick={() => setBlueprint('nq')}>
            {t('NQ Bullish BOS')}
          </button>
          <button type="button" className={`bcm-btn ${blueprint === 'ny' ? 'is-active' : ''}`} onClick={() => setBlueprint('ny')}>
            {t('NY AM Bearish MSS')}
          </button>
        </div>
        <svg viewBox="0 0 720 160" className="bcm-svg" role="img" aria-label={t('Worked Blueprints: NQ BOS vs. NY AM MSS')}>
          <rect x="12" y="12" width="696" height="136" rx="10" fill="var(--rr-paper)" stroke="var(--bcm-border)" />
          {blueprint === 'nq' ? (
            <path d="M75 128 L190 78 L260 98 L410 46 L595 28" fill="none" stroke="#059669" strokeWidth="3" />
          ) : (
            <path d="M75 100 L215 34 L340 124 L475 82 L615 138" fill="none" stroke="#9333ea" strokeWidth="3" />
          )}
        </svg>
      </figure>
    );
  }

  if (kind === 'bcm-mistakes-comic') {
    return (
      <figure className="bcm-figure" data-bcm-figure="bcm-mistakes-comic">
        <div className="bcm-figure-head">
          <span className="bcm-head-title">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{t('Common Mistakes Labeling Breaks')}</span>
          </span>
        </div>
        <div className="bcm-comic-grid">
          <div className="bcm-comic-panel">
            <strong>{t('Mistake 1: Swapping Acronyms')}</strong>
            <p>{t('Keep BOS strictly with-trend and CHoCH/MSS strictly counter-trend.')}</p>
          </div>
          <div className="bcm-comic-panel">
            <strong>{t('Mistake 2: Wick-Only BOS')}</strong>
            <p>{t('A wick poke without a close does not pass strict close-based rules.')}</p>
          </div>
          <div className="bcm-comic-panel">
            <strong>{t('Mistake 3: Scale Blindness')}</strong>
            <p>{t('Always note whether the break belongs to 5m, 1H, or 4H structure.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  const passed = checked.filter(Boolean).length;
  const pct = Math.round((passed / checklistGates.length) * 100);
  return (
    <figure className="bcm-figure" data-bcm-figure="bcm-checklist-meter">
      <div className="bcm-figure-head">
        <span className="bcm-head-title">
          <CheckSquare size={16} aria-hidden="true" />
          <span>{t('Pre-Replay Break Classification 6-Gate Checklist')}</span>
        </span>
        <span className="bcm-badge">{`${passed} / ${checklistGates.length} (${pct}%)`}</span>
      </div>
      <div className="bcm-checklist">
        {checklistGates.map((gate, i) => (
          <label key={gate} className="bcm-check-item">
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
      <div className="bcm-meter-track" aria-hidden="true">
        <div className="bcm-meter-fill" style={{ width: `${pct}%` }} />
      </div>
      <figcaption className="bcm-caption">
        {t('Confirm all 6 gates before labeling any BOS, CHoCH, or MSS.')}
      </figcaption>
    </figure>
  );
}
