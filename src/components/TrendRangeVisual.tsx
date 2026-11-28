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
import { evaluateMarketPhase } from '../utils/trendRangeMath';
import { TrendRangeScene } from './TrendRangeScene';

export type TrendRangeVisualKind =
  | 'tr-comic-intro'
  | 'tr-three-states'
  | 'tr-3d-state'
  | 'tr-sequence-sim'
  | 'tr-classifier'
  | 'tr-retrace-vs-trans'
  | 'tr-blueprints'
  | 'tr-mistakes-comic'
  | 'tr-checklist-meter';

const checklistGates = [
  'Identified higher-timeframe phase (4H/Daily) before zooming in',
  'Verified 3-candle swing highs and lows objectively',
  'Checked whether price is inside a range or expanding cleanly',
  'Confirmed close beyond boundary for any labeled transition',
  'Matched playbook (continuation vs. boundary sweep) to active phase',
  'Logged protected external swing invalidation prior to replay',
];

export function TrendRangeVisual({
  kind,
  staticOnly = false,
}: {
  kind: TrendRangeVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();
  const [simStep, setSimStep] = useState(0);
  const [simPlaying, setSimPlaying] = useState(false);

  const [swingHighs, setSwingHighs] = useState<'rising' | 'flat' | 'falling'>('rising');
  const [swingLows, setSwingLows] = useState<'rising' | 'flat' | 'falling'>('rising');
  const [closeBeyond, setCloseBeyond] = useState(false);

  const [blueprint, setBlueprint] = useState<'nq' | 'asia'>('nq');
  const [checked, setChecked] = useState<boolean[]>([true, true, false, false, false, false]);

  useEffect(() => {
    if (!simPlaying || staticOnly) return;
    const id = window.setInterval(() => setSimStep((s) => (s + 1) % 4), 1700);
    return () => window.clearInterval(id);
  }, [simPlaying, staticOnly]);

  if (kind === 'tr-3d-state') {
    return <TrendRangeScene staticOnly={staticOnly} />;
  }

  if (kind === 'tr-comic-intro') {
    return (
      <figure className="tr-figure" data-tr-figure="tr-comic-intro">
        <div className="tr-figure-head">
          <span className="tr-head-title">
            <Compass size={16} aria-hidden="true" />
            <span>{t('Stick-Figure Story: Matching Playbook to Phase')}</span>
          </span>
          <span className="tr-badge">{t('Concept Comic')}</span>
        </div>
        <div className="tr-comic-grid">
          <div className="tr-comic-panel">
            <strong>{t('1. Trend Staircase')}</strong>
            <p>{t('HH and HL pullbacks reward continuation studies.')}</p>
          </div>
          <div className="tr-comic-panel">
            <strong>{t('2. Sideways Box')}</strong>
            <p>{t('Contained highs and lows reward boundary sweep studies.')}</p>
          </div>
          <div className="tr-comic-panel">
            <strong>{t('3. Boundary Break')}</strong>
            <p>{t('A decisive close beyond the box marks a transition.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  if (kind === 'tr-three-states') {
    return (
      <figure className="tr-figure" data-tr-figure="tr-three-states">
        <div className="tr-figure-head">
          <span className="tr-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('Three Core Structural States')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 170" className="tr-svg" role="img" aria-label={t('Three Core Structural States')}>
          <rect x="12" y="12" width="696" height="146" rx="10" fill="var(--rr-paper)" stroke="var(--tr-border)" />
          <path d="M40 132 L95 92 L125 110 L185 60 L215 76 L245 40" fill="none" stroke="#059669" strokeWidth="2.8" />
          <text x="54" y="146" fontSize="10.5" fontWeight="700" fill="#059669">Bullish (HH/HL)</text>
          <path d="M275 44 L325 84 L355 68 L410 116 L440 98 L475 132" fill="none" stroke="#e11d48" strokeWidth="2.8" />
          <text x="295" y="146" fontSize="10.5" fontWeight="700" fill="#e11d48">Bearish (LH/LL)</text>
          <path d="M510 118 L545 58 L585 118 L625 58 L665 118" fill="none" stroke="#d97706" strokeWidth="2.8" />
          <text x="530" y="146" fontSize="10.5" fontWeight="700" fill="#d97706">Range (EQH/EQL)</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'tr-sequence-sim') {
    const steps = [
      'Step 1: Price compresses inside fixed highs and lows.',
      'Step 2: Displacement candle closes decisively above range ceiling.',
      'Step 3: Pullback retests the broken boundary cleanly.',
      'Step 4: New Higher High confirms bullish trend phase.',
    ];
    return (
      <figure className="tr-figure" data-tr-figure="tr-sequence-sim">
        <div className="tr-figure-head">
          <span className="tr-head-title">
            <Play size={16} aria-hidden="true" />
            <span>{t('Animated Sequence: Range → Transition → New Trend')}</span>
          </span>
          <span className="tr-badge">{`Step ${simStep + 1} / 4`}</span>
        </div>
        <div className="tr-controls-row">
          <button type="button" className="tr-btn is-primary" onClick={() => setSimPlaying((p) => !p)}>
            {simPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{simPlaying ? t('Pause') : t('Auto-Play')}</span>
          </button>
          <button type="button" className="tr-btn" onClick={() => setSimStep((s) => (s + 1) % 4)}>
            {t('Next Step')}
          </button>
          <button type="button" className="tr-btn" onClick={() => { setSimPlaying(false); setSimStep(0); }}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 175" className="tr-svg" role="img" aria-label={t('Animated Sequence: Range → Transition → New Trend')}>
          <rect x="12" y="12" width="696" height="151" rx="10" fill="var(--rr-paper)" stroke="var(--tr-border)" />
          <line x1="48" y1="84" x2="460" y2="84" stroke="#d97706" strokeWidth="2" strokeDasharray="5 4" />
          <path
            d={
              simStep === 0
                ? 'M65 126 L140 86 L210 124 L290 88'
                : simStep === 1
                  ? 'M65 126 L140 86 L210 124 L290 88 L400 50'
                  : simStep === 2
                    ? 'M65 126 L140 86 L210 124 L290 88 L400 50 L470 80'
                    : 'M65 126 L140 86 L210 124 L290 88 L400 50 L470 80 L615 32'
            }
            fill="none"
            stroke="#0f766e"
            strokeWidth="3"
          />
          <text x="56" y="150" fontSize="11.5" fontWeight="700" fill="var(--tr-ink)">{steps[simStep]}</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'tr-classifier') {
    const res = evaluateMarketPhase({ swingHighs, swingLows, closeBeyondBoundary: closeBeyond });
    return (
      <figure className="tr-figure" data-tr-figure="tr-classifier">
        <div className="tr-figure-head">
          <span className="tr-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('Interactive Market-Phase Classifier')}</span>
          </span>
          <span className="tr-badge">{t(res.phase)}</span>
        </div>
        <div className="tr-calc-grid">
          <label className="tr-field">
            <span>{t('Swing Highs')}</span>
            <select value={swingHighs} onChange={(e) => setSwingHighs(e.target.value as 'rising' | 'flat' | 'falling')}>
              <option value="rising">{t('Rising')}</option>
              <option value="flat">{t('Flat')}</option>
              <option value="falling">{t('Falling')}</option>
            </select>
          </label>
          <label className="tr-field">
            <span>{t('Swing Lows')}</span>
            <select value={swingLows} onChange={(e) => setSwingLows(e.target.value as 'rising' | 'flat' | 'falling')}>
              <option value="rising">{t('Rising')}</option>
              <option value="flat">{t('Flat')}</option>
              <option value="falling">{t('Falling')}</option>
            </select>
          </label>
          <label className="tr-field">
            <span>{t('Boundary Close?')}</span>
            <select value={closeBeyond ? 'yes' : 'no'} onChange={(e) => setCloseBeyond(e.target.value === 'yes')}>
              <option value="no">{t('No — Inside Range')}</option>
              <option value="yes">{t('Yes — Closed Beyond')}</option>
            </select>
          </label>
        </div>
        <figcaption className="tr-caption">{res.expectation}</figcaption>
      </figure>
    );
  }

  if (kind === 'tr-retrace-vs-trans') {
    return (
      <figure className="tr-figure" data-tr-figure="tr-retrace-vs-trans">
        <div className="tr-figure-head">
          <span className="tr-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('Retracement vs. Transition Comparison')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 165" className="tr-svg" role="img" aria-label={t('Retracement vs. Transition Comparison')}>
          <rect x="12" y="12" width="696" height="141" rx="10" fill="var(--rr-paper)" stroke="var(--tr-border)" />
          <line x1="48" y1="116" x2="672" y2="116" stroke="#059669" strokeWidth="2" strokeDasharray="6 4" />
          <text x="56" y="136" fontSize="11" fontWeight="700" fill="#059669">Protected External HL (Intact = Retracement · Closed Below = Transition)</text>
          <path d="M75 116 L210 42 L310 92 L430 34" fill="none" stroke="#0f766e" strokeWidth="2.8" />
        </svg>
      </figure>
    );
  }

  if (kind === 'tr-blueprints') {
    return (
      <figure className="tr-figure" data-tr-figure="tr-blueprints">
        <div className="tr-figure-head">
          <span className="tr-head-title">
            <BookOpen size={16} aria-hidden="true" />
            <span>{t('Worked Blueprints: NQ Trend vs. Asia Range')}</span>
          </span>
        </div>
        <div className="tr-controls-row">
          <button type="button" className={`tr-btn ${blueprint === 'nq' ? 'is-active' : ''}`} onClick={() => setBlueprint('nq')}>
            {t('NQ Trend')}
          </button>
          <button type="button" className={`tr-btn ${blueprint === 'asia' ? 'is-active' : ''}`} onClick={() => setBlueprint('asia')}>
            {t('Asia Range')}
          </button>
        </div>
        <svg viewBox="0 0 720 160" className="tr-svg" role="img" aria-label={t('Worked Blueprints: NQ Trend vs. Asia Range')}>
          <rect x="12" y="12" width="696" height="136" rx="10" fill="var(--rr-paper)" stroke="var(--tr-border)" />
          {blueprint === 'nq' ? (
            <path d="M75 130 L185 88 L255 106 L375 62 L445 80 L595 32" fill="none" stroke="#059669" strokeWidth="3" />
          ) : (
            <path d="M75 112 L165 56 L265 112 L365 56 L465 112 L585 56" fill="none" stroke="#d97706" strokeWidth="3" />
          )}
        </svg>
      </figure>
    );
  }

  if (kind === 'tr-mistakes-comic') {
    return (
      <figure className="tr-figure" data-tr-figure="tr-mistakes-comic">
        <div className="tr-figure-head">
          <span className="tr-head-title">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{t('Common Mistakes Reading Market Phases')}</span>
          </span>
        </div>
        <div className="tr-comic-grid">
          <div className="tr-comic-panel">
            <strong>{t('Mistake 1: Mid-Range Chasing')}</strong>
            <p>{t('Entering trend setups inside the middle of a tight box invites chop.')}</p>
          </div>
          <div className="tr-comic-panel">
            <strong>{t('Mistake 2: Early Reversal Call')}</strong>
            <p>{t('Wait for a candle close beyond the protected swing before calling a transition.')}</p>
          </div>
          <div className="tr-comic-panel">
            <strong>{t('Mistake 3: Single-Timeframe Tunnel')}</strong>
            <p>{t('Always check whether the 4H chart is trending or ranging first.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  const passed = checked.filter(Boolean).length;
  const pct = Math.round((passed / checklistGates.length) * 100);
  return (
    <figure className="tr-figure" data-tr-figure="tr-checklist-meter">
      <div className="tr-figure-head">
        <span className="tr-head-title">
          <CheckSquare size={16} aria-hidden="true" />
          <span>{t('Pre-Replay Phase Classification 6-Gate Checklist')}</span>
        </span>
        <span className="tr-badge">{`${passed} / ${checklistGates.length} (${pct}%)`}</span>
      </div>
      <div className="tr-checklist">
        {checklistGates.map((gate, i) => (
          <label key={gate} className="tr-check-item">
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
      <div className="tr-meter-track" aria-hidden="true">
        <div className="tr-meter-fill" style={{ width: `${pct}%` }} />
      </div>
      <figcaption className="tr-caption">
        {t('Confirm all 6 structural phase gates before selecting a setup.')}
      </figcaption>
    </figure>
  );
}
