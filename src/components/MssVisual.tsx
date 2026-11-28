import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Calculator,
  CheckCircle2,
  CheckSquare,
  Compass,
  Crosshair,
  GitCompare,
  Layers,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { evaluateMssStudy } from '../utils/mssMath';
import { MssScene } from './MssScene';

export type MssVisualKind =
  | 'mss-comic-intro'
  | 'mss-swing-rule'
  | 'mss-3d-engine'
  | 'mss-fvg-variants'
  | 'mss-sequence-sim'
  | 'mss-calculator'
  | 'mss-intraday-scale'
  | 'mss-ep6-vs-ep3'
  | 'mss-checklist-meter';

const checklistGates = [
  'Selected liquidity reference & target swing before price arrived',
  'Confirmed 3-candle swing completion (right-hand bar closed)',
  'Measured displacement relative to recent candles objectively',
  'Stated exact close rule (preferable close vs. initial crossing)',
  'Recorded FVG fill variant (edge vs. midpoint) and costs',
  'Separated intraday leg from multi-day HTF trend forecast',
];

export function MssVisual({
  kind,
  staticOnly = false,
}: {
  kind: MssVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();
  const [simStep, setSimStep] = useState(0);
  const [simPlaying, setSimPlaying] = useState(false);

  const [hadPriorSweep, setHadPriorSweep] = useState(true);
  const [displacementMultiple, setDisplacementMultiple] = useState(1.8);
  const [closedBeyondSwing, setClosedBeyondSwing] = useState(true);
  const [hasCleanFvg, setHasCleanFvg] = useState(true);

  const [checked, setChecked] = useState<boolean[]>([true, true, false, false, false, false]);

  useEffect(() => {
    if (!simPlaying || staticOnly) return;
    const id = window.setInterval(() => setSimStep((s) => (s + 1) % 4), 1700);
    return () => window.clearInterval(id);
  }, [simPlaying, staticOnly]);

  if (kind === 'mss-3d-engine') {
    return <MssScene staticOnly={staticOnly} />;
  }

  if (kind === 'mss-comic-intro') {
    return (
      <figure className="mss-figure" data-mss-figure="mss-comic-intro">
        <div className="mss-figure-head">
          <span className="mss-head-title">
            <Compass size={16} aria-hidden="true" />
            <span>{t('Stick-Figure Story: Sweep + MSS vs. Hesitant Drift')}</span>
          </span>
          <span className="mss-badge">{t('Concept Comic')}</span>
        </div>
        <div className="mss-comic-grid">
          <div className="mss-comic-panel">
            <strong>{t('1. Prior Liquidity Sweep')}</strong>
            <p>{t('Price raids SSL/BSL before reversing through the opposing swing.')}</p>
          </div>
          <div className="mss-comic-panel">
            <strong>{t('2. Displacement Break')}</strong>
            <p>{t('Measure displacement relative to recent candles, never by guesswork.')}</p>
          </div>
          <div className="mss-comic-panel">
            <strong>{t('3. FVG Retest Option')}</strong>
            <p>{t('Edge vs. midpoint FVG entries carry different fill and stop tradeoffs.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  if (kind === 'mss-swing-rule') {
    return (
      <figure className="mss-figure" data-mss-figure="mss-swing-rule">
        <div className="mss-figure-head">
          <span className="mss-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('Identifiable Swing + Close Convention Map')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 160" className="mss-svg" role="img" aria-label={t('Identifiable Swing + Close Convention Map')}>
          <rect x="12" y="12" width="696" height="136" rx="10" fill="var(--rr-paper)" stroke="var(--mss-border)" />
          <line x1="48" y1="74" x2="672" y2="74" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M75 112 L185 74 L285 130 L420 52 L560 36" fill="none" stroke="#059669" strokeWidth="3" />
          <text x="56" y="64" fontSize="11" fontWeight="700" fill="#2563eb">Pre-Selected Swing High → Displaced Break Beyond</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'mss-fvg-variants') {
    return (
      <figure className="mss-figure" data-mss-figure="mss-fvg-variants">
        <div className="mss-figure-head">
          <span className="mss-head-title">
            <Crosshair size={16} aria-hidden="true" />
            <span>{t('Mechanical MSS Execution Variants (Edge vs. Midpoint)')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 160" className="mss-svg" role="img" aria-label={t('Mechanical MSS Execution Variants (Edge vs. Midpoint)')}>
          <rect x="12" y="12" width="696" height="136" rx="10" fill="var(--rr-paper)" stroke="var(--mss-border)" />
          <rect x="180" y="54" width="360" height="52" rx="6" fill="#2563eb" opacity="0.14" stroke="#2563eb" />
          <line x1="180" y1="80" x2="540" y2="80" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" />
          <text x="195" y="46" fontSize="11" fontWeight="700" fill="#2563eb">FVG Edge Entry (Higher Fill Chance)</text>
          <text x="195" y="124" fontSize="11" fontWeight="700" fill="#059669">50% CE Midpoint (Tighter Stop · May Stay Unfilled)</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'mss-sequence-sim') {
    const steps = [
      'Step 1: Price sweeps resting SSL below the prior low.',
      'Step 2: Energetic displacement breaks the pre-marked swing high.',
      'Step 3: Completed 3-candle Fair Value Gap forms inside the leg.',
      'Step 4: Price returns to test the FVG edge/midpoint.',
    ];
    return (
      <figure className="mss-figure" data-mss-figure="mss-sequence-sim">
        <div className="mss-figure-head">
          <span className="mss-head-title">
            <Play size={16} aria-hidden="true" />
            <span>{t('Animated Sequence: Sweep → MSS → FVG Return')}</span>
          </span>
          <span className="mss-badge">{`Step ${simStep + 1} / 4`}</span>
        </div>
        <div className="mss-controls-row">
          <button type="button" className="mss-btn is-primary" onClick={() => setSimPlaying((p) => !p)}>
            {simPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{simPlaying ? t('Pause') : t('Auto-Play')}</span>
          </button>
          <button type="button" className="mss-btn" onClick={() => setSimStep((s) => (s + 1) % 4)}>
            {t('Next Step')}
          </button>
          <button type="button" className="mss-btn" onClick={() => { setSimPlaying(false); setSimStep(0); }}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 170" className="mss-svg" role="img" aria-label={t('Animated Sequence: Sweep → MSS → FVG Return')}>
          <rect x="12" y="12" width="696" height="146" rx="10" fill="var(--rr-paper)" stroke="var(--mss-border)" />
          <path
            d={
              simStep === 0
                ? 'M75 100 L185 138'
                : simStep === 1
                  ? 'M75 100 L185 138 L345 48'
                  : simStep === 2
                    ? 'M75 100 L185 138 L345 48 L435 84'
                    : 'M75 100 L185 138 L345 48 L435 84 L595 32'
            }
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
          />
          <text x="56" y="146" fontSize="11.5" fontWeight="700" fill="var(--mss-ink)">{steps[simStep]}</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'mss-calculator') {
    const res = evaluateMssStudy({ hadPriorSweep, displacementMultiple, closedBeyondSwing, hasCleanFvg });
    return (
      <figure className="mss-figure" data-mss-figure="mss-calculator">
        <div className="mss-figure-head">
          <span className="mss-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('Interactive MSS Rule & Displacement Calculator')}</span>
          </span>
          <span className="mss-badge">{t(res.status)}</span>
        </div>
        <div className="mss-calc-grid">
          <label className="mss-field">
            <span>{t('Prior Sweep?')}</span>
            <select value={hadPriorSweep ? 'yes' : 'no'} onChange={(e) => setHadPriorSweep(e.target.value === 'yes')}>
              <option value="yes">{t('Yes')}</option>
              <option value="no">{t('No')}</option>
            </select>
          </label>
          <label className="mss-field">
            <span>{t('Displacement Multiple')}</span>
            <input type="number" step="0.1" min={0.5} max={4} value={displacementMultiple} onChange={(e) => setDisplacementMultiple(Number(e.target.value) || 1)} />
          </label>
          <label className="mss-field">
            <span>{t('Close Beyond Swing?')}</span>
            <select value={closedBeyondSwing ? 'yes' : 'no'} onChange={(e) => setClosedBeyondSwing(e.target.value === 'yes')}>
              <option value="yes">{t('Yes')}</option>
              <option value="no">{t('No')}</option>
            </select>
          </label>
          <label className="mss-field">
            <span>{t('Clean FVG?')}</span>
            <select value={hasCleanFvg ? 'yes' : 'no'} onChange={(e) => setHasCleanFvg(e.target.value === 'yes')}>
              <option value="yes">{t('Yes')}</option>
              <option value="no">{t('No')}</option>
            </select>
          </label>
        </div>
        <figcaption className="mss-caption">{res.guidance}</figcaption>
      </figure>
    );
  }

  if (kind === 'mss-intraday-scale') {
    return (
      <figure className="mss-figure" data-mss-figure="mss-intraday-scale">
        <div className="mss-figure-head">
          <span className="mss-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('Intraday Leg vs. Higher-Timeframe Trend')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 155" className="mss-svg" role="img" aria-label={t('Intraday Leg vs. Higher-Timeframe Trend')}>
          <rect x="12" y="12" width="696" height="131" rx="10" fill="var(--rr-paper)" stroke="var(--mss-border)" />
          <path d="M50 124 L260 56 L360 88 L620 26" fill="none" stroke="#059669" strokeWidth="3" />
          <text x="56" y="42" fontSize="11" fontWeight="700" fill="#059669">4H Bullish Trend Intact (5m Bearish MSS = Pullback Leg)</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'mss-ep6-vs-ep3') {
    return (
      <figure className="mss-figure" data-mss-figure="mss-ep6-vs-ep3">
        <div className="mss-figure-head">
          <span className="mss-head-title">
            <BookOpen size={16} aria-hidden="true" />
            <span>{t('Episode 6 Close Preference vs. Episode 3 Crossing')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 150" className="mss-svg" role="img" aria-label={t('Episode 6 Close Preference vs. Episode 3 Crossing')}>
          <rect x="12" y="12" width="696" height="126" rx="10" fill="var(--rr-paper)" stroke="var(--mss-border)" />
          <text x="40" y="64" fontSize="11.5" fontWeight="700" fill="#2563eb">Ep 6: Prefers clear close beyond reference with quick displacement</text>
          <text x="40" y="102" fontSize="11.5" fontWeight="700" fill="#059669">Ep 3: Initial crossing need not close above; waits for FVG completion</text>
        </svg>
      </figure>
    );
  }

  const passed = checked.filter(Boolean).length;
  const pct = Math.round((passed / checklistGates.length) * 100);
  return (
    <figure className="mss-figure" data-mss-figure="mss-checklist-meter">
      <div className="mss-figure-head">
        <span className="mss-head-title">
          <CheckSquare size={16} aria-hidden="true" />
          <span>{t('Pre-Replay MSS 6-Gate Checklist')}</span>
        </span>
        <span className="mss-badge">{`${passed} / ${checklistGates.length} (${pct}%)`}</span>
      </div>
      <div className="mss-checklist">
        {checklistGates.map((gate, i) => (
          <label key={gate} className="mss-check-item">
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
      <div className="mss-meter-track" aria-hidden="true">
        <div className="mss-meter-fill" style={{ width: `${pct}%` }} />
      </div>
      <figcaption className="mss-caption">
        {t('Verify all six gates before logging an MSS study.')}
      </figcaption>
    </figure>
  );
}
