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
import { evaluateDealingRange } from '../utils/dealingRangeMath';
import { DealingRangeScene } from './DealingRangeScene';

export type DealingRangeVisualKind =
  | 'dr-comic-intro'
  | 'dr-quadrant-map'
  | 'dr-3d-cube'
  | 'dr-sequence-sim'
  | 'dr-calculator'
  | 'dr-ext-vs-int'
  | 'dr-blueprints'
  | 'dr-mistakes-comic'
  | 'dr-checklist-meter';

const checklistGates = [
  'Anchored 0% and 100% on confirmed sweep and displacement swings',
  'Marked higher-timeframe (4H/Daily) dealing range before 15m/5m',
  'Divided range cleanly at 50% Equilibrium (Discount vs. Premium)',
  'Checked 25% and 75% quadrant alignment with nearby PD arrays',
  'Verified price has not closed outside and invalidated the anchors',
  'Logged target opposing extreme (BSL or SSL) prior to replay',
];

export function DealingRangeVisual({
  kind,
  staticOnly = false,
}: {
  kind: DealingRangeVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();
  const [simStep, setSimStep] = useState(0);
  const [simPlaying, setSimPlaying] = useState(false);

  const [rangeLow, setRangeLow] = useState(20000);
  const [rangeHigh, setRangeHigh] = useState(20200);
  const [currentPrice, setCurrentPrice] = useState(20070);

  const [blueprint, setBlueprint] = useState<'nq' | 'eur'>('nq');
  const [checked, setChecked] = useState<boolean[]>([true, true, false, false, false, false]);

  useEffect(() => {
    if (!simPlaying || staticOnly) return;
    const id = window.setInterval(() => setSimStep((s) => (s + 1) % 4), 1700);
    return () => window.clearInterval(id);
  }, [simPlaying, staticOnly]);

  if (kind === 'dr-3d-cube') {
    return <DealingRangeScene staticOnly={staticOnly} />;
  }

  if (kind === 'dr-comic-intro') {
    return (
      <figure className="dr-figure" data-dr-figure="dr-comic-intro">
        <div className="dr-figure-head">
          <span className="dr-head-title">
            <Compass size={16} aria-hidden="true" />
            <span>{t('Stick-Figure Story: Anchoring the Right Ruler')}</span>
          </span>
          <span className="dr-badge">{t('Concept Comic')}</span>
        </div>
        <div className="dr-comic-grid">
          <div className="dr-comic-panel">
            <strong>{t('1. Sweep Origin (0%)')}</strong>
            <p>{t('Anchor the range start at the completed liquidity sweep extreme.')}</p>
          </div>
          <div className="dr-comic-panel">
            <strong>{t('2. Displacement High (100%)')}</strong>
            <p>{t('Anchor the opposite end at the confirmed swing created by displacement.')}</p>
          </div>
          <div className="dr-comic-panel">
            <strong>{t('3. 50% Equilibrium Divider')}</strong>
            <p>{t('50% EQ cleanly splits Discount (longs) from Premium (shorts).')}</p>
          </div>
        </div>
      </figure>
    );
  }

  if (kind === 'dr-quadrant-map') {
    return (
      <figure className="dr-figure" data-dr-figure="dr-quadrant-map">
        <div className="dr-figure-head">
          <span className="dr-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('Dealing Range Quadrant Map (0% / 25% / 50% / 75% / 100%)')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 185" className="dr-svg" role="img" aria-label={t('Dealing Range Quadrant Map (0% / 25% / 50% / 75% / 100%)')}>
          <rect x="12" y="12" width="696" height="161" rx="10" fill="var(--rr-paper)" stroke="var(--dr-border)" />
          <rect x="48" y="30" width="624" height="62" fill="#e11d48" opacity="0.08" />
          <rect x="48" y="92" width="624" height="62" fill="#059669" opacity="0.08" />
          <line x1="48" y1="30" x2="672" y2="30" stroke="#e11d48" strokeWidth="2" />
          <line x1="48" y1="92" x2="672" y2="92" stroke="#0891b2" strokeWidth="2.2" strokeDasharray="6 4" />
          <line x1="48" y1="154" x2="672" y2="154" stroke="#059669" strokeWidth="2" />
          <text x="58" y="48" fontSize="11" fontWeight="700" fill="#e11d48">100% High · Upper Premium (75%–100%)</text>
          <text x="58" y="86" fontSize="11" fontWeight="700" fill="#0891b2">50% Equilibrium (EQ)</text>
          <text x="58" y="146" fontSize="11" fontWeight="700" fill="#059669">0% Low · Deep Discount (0%–25%)</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'dr-sequence-sim') {
    const steps = [
      'Step 1: Sweep low sets 0% anchor.',
      'Step 2: Displacement rallies to set 100% Range High.',
      'Step 3: Pullback dips below 50% Equilibrium into Discount.',
      'Step 4: Price expands back toward 100% external BSL.',
    ];
    return (
      <figure className="dr-figure" data-dr-figure="dr-sequence-sim">
        <div className="dr-figure-head">
          <span className="dr-head-title">
            <Play size={16} aria-hidden="true" />
            <span>{t('Animated Sequence: Anchor → 50% Retrace → Target')}</span>
          </span>
          <span className="dr-badge">{`Step ${simStep + 1} / 4`}</span>
        </div>
        <div className="dr-controls-row">
          <button type="button" className="dr-btn is-primary" onClick={() => setSimPlaying((p) => !p)}>
            {simPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{simPlaying ? t('Pause') : t('Auto-Play')}</span>
          </button>
          <button type="button" className="dr-btn" onClick={() => setSimStep((s) => (s + 1) % 4)}>
            {t('Next Step')}
          </button>
          <button type="button" className="dr-btn" onClick={() => { setSimPlaying(false); setSimStep(0); }}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 170" className="dr-svg" role="img" aria-label={t('Animated Sequence: Anchor → 50% Retrace → Target')}>
          <rect x="12" y="12" width="696" height="146" rx="10" fill="var(--rr-paper)" stroke="var(--dr-border)" />
          <line x1="48" y1="86" x2="672" y2="86" stroke="#0891b2" strokeWidth="2" strokeDasharray="6 4" />
          <path
            d={
              simStep === 0
                ? 'M75 132 L150 132'
                : simStep === 1
                  ? 'M75 132 L285 40'
                  : simStep === 2
                    ? 'M75 132 L285 40 L435 108'
                    : 'M75 132 L285 40 L435 108 L615 32'
            }
            fill="none"
            stroke="#059669"
            strokeWidth="3"
          />
          <text x="56" y="148" fontSize="11.5" fontWeight="700" fill="var(--dr-ink)">{steps[simStep]}</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'dr-calculator') {
    const res = evaluateDealingRange({ rangeLow, rangeHigh, currentPrice });
    return (
      <figure className="dr-figure" data-dr-figure="dr-calculator">
        <div className="dr-figure-head">
          <span className="dr-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('Interactive Dealing-Range Quadrant & Equilibrium Calculator')}</span>
          </span>
          <span className="dr-badge">{t(res.zone)}</span>
        </div>
        <div className="dr-calc-grid">
          <label className="dr-field">
            <span>{t('Range Low (0%)')}</span>
            <input type="number" step="0.25" value={rangeLow} onChange={(e) => setRangeLow(Number(e.target.value) || 0)} />
          </label>
          <label className="dr-field">
            <span>{t('Range High (100%)')}</span>
            <input type="number" step="0.25" value={rangeHigh} onChange={(e) => setRangeHigh(Number(e.target.value) || 0)} />
          </label>
          <label className="dr-field">
            <span>{t('Current Price')}</span>
            <input type="number" step="0.25" value={currentPrice} onChange={(e) => setCurrentPrice(Number(e.target.value) || 0)} />
          </label>
        </div>
        <div className="dr-metrics-row">
          <div className="dr-metric">
            <div className="dr-metric-label">{t('Zone Status')}</div>
            <div className="dr-metric-val">{t(res.zone)}</div>
          </div>
          <div className="dr-metric">
            <div className="dr-metric-label">{t('50% Equilibrium')}</div>
            <div className="dr-metric-val">{String(res.equilibrium)}</div>
          </div>
          <div className="dr-metric">
            <div className="dr-metric-label">{t('25% / 75% Quadrants')}</div>
            <div className="dr-metric-val">{`${res.q25} / ${res.q75}`}</div>
          </div>
        </div>
        <figcaption className="dr-caption">{res.guidance}</figcaption>
      </figure>
    );
  }

  if (kind === 'dr-ext-vs-int') {
    return (
      <figure className="dr-figure" data-dr-figure="dr-ext-vs-int">
        <div className="dr-figure-head">
          <span className="dr-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('External Dealing Range vs. Internal Sub-Range')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 155" className="dr-svg" role="img" aria-label={t('External Dealing Range vs. Internal Sub-Range')}>
          <rect x="12" y="12" width="696" height="131" rx="10" fill="var(--rr-paper)" stroke="var(--dr-border)" />
          <rect x="44" y="28" width="632" height="98" rx="8" fill="#0891b2" opacity="0.08" stroke="#0891b2" />
          <rect x="330" y="54" width="210" height="48" rx="6" fill="#059669" opacity="0.16" stroke="#059669" />
          <text x="58" y="48" fontSize="11" fontWeight="700" fill="#0891b2">4H External Dealing Range</text>
          <text x="342" y="82" fontSize="10.5" fontWeight="700" fill="#059669">15m Internal Sub-Range</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'dr-blueprints') {
    return (
      <figure className="dr-figure" data-dr-figure="dr-blueprints">
        <div className="dr-figure-head">
          <span className="dr-head-title">
            <BookOpen size={16} aria-hidden="true" />
            <span>{t('Worked Blueprints: NQ 4H vs. EUR/USD Daily')}</span>
          </span>
        </div>
        <div className="dr-controls-row">
          <button type="button" className={`dr-btn ${blueprint === 'nq' ? 'is-active' : ''}`} onClick={() => setBlueprint('nq')}>
            {t('NQ 4H Discount')}
          </button>
          <button type="button" className={`dr-btn ${blueprint === 'eur' ? 'is-active' : ''}`} onClick={() => setBlueprint('eur')}>
            {t('EUR/USD Daily Premium')}
          </button>
        </div>
        <svg viewBox="0 0 720 160" className="dr-svg" role="img" aria-label={t('Worked Blueprints: NQ 4H vs. EUR/USD Daily')}>
          <rect x="12" y="12" width="696" height="136" rx="10" fill="var(--rr-paper)" stroke="var(--dr-border)" />
          <line x1="48" y1="80" x2="672" y2="80" stroke="#0891b2" strokeWidth="2" strokeDasharray="6 4" />
          {blueprint === 'nq' ? (
            <path d="M75 130 L265 40 L415 104 L605 32" fill="none" stroke="#059669" strokeWidth="3" />
          ) : (
            <path d="M75 34 L265 128 L415 56 L605 136" fill="none" stroke="#e11d48" strokeWidth="3" />
          )}
        </svg>
      </figure>
    );
  }

  if (kind === 'dr-mistakes-comic') {
    return (
      <figure className="dr-figure" data-dr-figure="dr-mistakes-comic">
        <div className="dr-figure-head">
          <span className="dr-head-title">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{t('Common Mistakes Marking Dealing Ranges')}</span>
          </span>
        </div>
        <div className="dr-comic-grid">
          <div className="dr-comic-panel">
            <strong>{t('Mistake 1: 1m Wick Anchors')}</strong>
            <p>{t('Anchor on 1H/4H/Daily displacement swings before checking 5m.')}</p>
          </div>
          <div className="dr-comic-panel">
            <strong>{t('Mistake 2: Stale Range Anchors')}</strong>
            <p>{t('Re-anchor once candle bodies close beyond the old Range High or Low.')}</p>
          </div>
          <div className="dr-comic-panel">
            <strong>{t('Mistake 3: Buying Upper Premium')}</strong>
            <p>{t('Wait for price to enter Discount (<50% EQ) for bullish continuation.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  const passed = checked.filter(Boolean).length;
  const pct = Math.round((passed / checklistGates.length) * 100);
  return (
    <figure className="dr-figure" data-dr-figure="dr-checklist-meter">
      <div className="dr-figure-head">
        <span className="dr-head-title">
          <CheckSquare size={16} aria-hidden="true" />
          <span>{t('Pre-Replay Dealing Range 6-Gate Checklist')}</span>
        </span>
        <span className="dr-badge">{`${passed} / ${checklistGates.length} (${pct}%)`}</span>
      </div>
      <div className="dr-checklist">
        {checklistGates.map((gate, i) => (
          <label key={gate} className="dr-check-item">
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
      <div className="dr-meter-track" aria-hidden="true">
        <div className="dr-meter-fill" style={{ width: `${pct}%` }} />
      </div>
      <figcaption className="dr-caption">
        {t('Confirm all 6 gates before logging a dealing-range study.')}
      </figcaption>
    </figure>
  );
}
