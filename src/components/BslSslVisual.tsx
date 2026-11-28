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
import { evaluateBslSslPlan } from '../utils/bslSslMath';
import { BslSslScene } from './BslSslScene';

export type BslSslVisualKind =
  | 'bsl-comic-intro'
  | 'bsl-order-anatomy'
  | 'bsl-3d-tower'
  | 'bsl-tier-hierarchy'
  | 'bsl-sequence-sim'
  | 'bsl-calculator'
  | 'bsl-sweep-vs-accept'
  | 'bsl-session-cycle'
  | 'bsl-blueprints'
  | 'bsl-mistakes-comic'
  | 'bsl-checklist-meter';

const checklistGates = [
  'Marked Tier 1–3 highs/lows (PWH/L, PDH/L, session, EQH/EQL) cleanly',
  'Verified whether target pool is BSL (buy-stops) or SSL (sell-stops)',
  'Separated observable chart swings from unknown order-book depth',
  'Checked close location (rejection inside vs. acceptance beyond pool)',
  'Measured tick distance to target vs. stop width (>= 2R preferred)',
  'Recorded both counter-examples and successful sweeps objectively',
];

export function BslSslVisual({
  kind,
  staticOnly = false,
}: {
  kind: BslSslVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();
  const [anatomySide, setAnatomySide] = useState<'bsl' | 'ssl'>('bsl');
  const [simStep, setSimStep] = useState(0);
  const [simPlaying, setSimPlaying] = useState(false);

  const [entryPrice, setEntryPrice] = useState(20100);
  const [poolPrice, setPoolPrice] = useState(20150);
  const [stopPrice, setStopPrice] = useState(20080);
  const [tickSize, setTickSize] = useState(0.25);

  const [compareMode, setCompareMode] = useState<'reject' | 'accept'>('reject');
  const [blueprint, setBlueprint] = useState<'nq' | 'eur'>('nq');
  const [checked, setChecked] = useState<boolean[]>([true, true, false, false, false, false]);

  useEffect(() => {
    if (!simPlaying || staticOnly) return;
    const id = window.setInterval(() => setSimStep((s) => (s + 1) % 4), 1700);
    return () => window.clearInterval(id);
  }, [simPlaying, staticOnly]);

  if (kind === 'bsl-3d-tower') {
    return <BslSslScene staticOnly={staticOnly} />;
  }

  if (kind === 'bsl-comic-intro') {
    return (
      <figure className="bsl-figure" data-bsl-figure="bsl-comic-intro">
        <div className="bsl-figure-head">
          <span className="bsl-head-title">
            <Compass size={16} aria-hidden="true" />
            <span>{t('Stick-Figure Story: The Two-Sided Fuel Tank')}</span>
          </span>
          <span className="bsl-badge">{t('Concept Comic')}</span>
        </div>
        <div className="bsl-comic-grid">
          <div className="bsl-comic-panel">
            <strong>{t('1. BSL Above Swing Highs')}</strong>
            <svg viewBox="0 0 210 110" className="bsl-svg" role="img" aria-label={t('1. BSL Above Swing Highs')}>
              <rect x="6" y="6" width="198" height="98" rx="8" fill="var(--bsl-surface)" />
              <line x1="20" y1="36" x2="190" y2="36" stroke="#0284c7" strokeWidth="2.2" strokeDasharray="5 4" />
              <path d="M24 84 L95 40 L160 80" fill="none" stroke="var(--bsl-ink)" strokeWidth="2.4" />
              <circle cx="95" cy="40" r="4.5" fill="#0284c7" />
              <text x="26" y="26" fontSize="9.5" fontWeight="700" fill="#0284c7">BSL (Buy-Stops)</text>
            </svg>
            <p>{t('Short stop-losses and breakout buy-stops cluster overhead.')}</p>
          </div>
          <div className="bsl-comic-panel">
            <strong>{t('2. SSL Below Swing Lows')}</strong>
            <svg viewBox="0 0 210 110" className="bsl-svg" role="img" aria-label={t('2. SSL Below Swing Lows')}>
              <rect x="6" y="6" width="198" height="98" rx="8" fill="var(--bsl-surface)" />
              <line x1="20" y1="76" x2="190" y2="76" stroke="#e11d48" strokeWidth="2.2" strokeDasharray="5 4" />
              <path d="M24 30 L105 72 L180 34" fill="none" stroke="var(--bsl-ink)" strokeWidth="2.4" />
              <circle cx="105" cy="72" r="4.5" fill="#e11d48" />
              <text x="26" y="94" fontSize="9.5" fontWeight="700" fill="#e11d48">SSL (Sell-Stops)</text>
            </svg>
            <p>{t('Long stop-losses and breakdown sell-stops cluster underneath.')}</p>
          </div>
          <div className="bsl-comic-panel">
            <strong>{t('3. Two-Way Liquidity Map')}</strong>
            <svg viewBox="0 0 210 110" className="bsl-svg" role="img" aria-label={t('3. Two-Way Liquidity Map')}>
              <rect x="6" y="6" width="198" height="98" rx="8" fill="var(--bsl-surface)" />
              <line x1="20" y1="28" x2="190" y2="28" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="20" y1="82" x2="190" y2="82" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M28 60 L84 22 L145 86 L186 52" fill="none" stroke="#059669" strokeWidth="2.4" />
            </svg>
            <p>{t('Mapping both sides prevents tunnel vision on single swings.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  if (kind === 'bsl-order-anatomy') {
    return (
      <figure className="bsl-figure" data-bsl-figure="bsl-order-anatomy">
        <div className="bsl-figure-head">
          <span className="bsl-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('BSL vs. SSL Order-Type Anatomy')}</span>
          </span>
          <span className="bsl-badge">{t('Order Mechanics')}</span>
        </div>
        <div className="bsl-controls-row">
          <button type="button" className={`bsl-btn ${anatomySide === 'bsl' ? 'is-active' : ''}`} onClick={() => setAnatomySide('bsl')}>
            {t('BSL View')}
          </button>
          <button type="button" className={`bsl-btn ${anatomySide === 'ssl' ? 'is-active' : ''}`} onClick={() => setAnatomySide('ssl')}>
            {t('SSL View')}
          </button>
        </div>
        <svg viewBox="0 0 720 190" className="bsl-svg" role="img" aria-label={t('BSL vs. SSL Order-Type Anatomy')}>
          <rect x="12" y="12" width="696" height="166" rx="10" fill="var(--rr-paper)" stroke="var(--bsl-border)" />
          {anatomySide === 'bsl' ? (
            <>
              <line x1="48" y1="70" x2="672" y2="70" stroke="#0284c7" strokeWidth="2.4" strokeDasharray="6 4" />
              <text x="56" y="54" fontSize="11.5" fontWeight="700" fill="#0284c7">BSL: Short Stop-Losses (Buy-to-Cover) + Breakout Buy-Stops</text>
              <path d="M80 146 L230 74 L380 128 L525 46 L635 122" fill="none" stroke="var(--bsl-ink)" strokeWidth="2.8" />
            </>
          ) : (
            <>
              <line x1="48" y1="126" x2="672" y2="126" stroke="#e11d48" strokeWidth="2.4" strokeDasharray="6 4" />
              <text x="56" y="152" fontSize="11.5" fontWeight="700" fill="#e11d48">SSL: Long Stop-Losses (Sell-to-Close) + Breakdown Sell-Stops</text>
              <path d="M80 50 L230 122 L380 72 L525 148 L635 66" fill="none" stroke="var(--bsl-ink)" strokeWidth="2.8" />
            </>
          )}
        </svg>
        <figcaption className="bsl-caption">
          {anatomySide === 'bsl' ? t('BSL: Buy-to-Cover + Buy-Stops') : t('SSL: Sell-to-Close + Sell-Stops')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'bsl-tier-hierarchy') {
    return (
      <figure className="bsl-figure" data-bsl-figure="bsl-tier-hierarchy">
        <div className="bsl-figure-head">
          <span className="bsl-head-title">
            <Crosshair size={16} aria-hidden="true" />
            <span>{t('Four-Tier Liquidity Pool Hierarchy')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 190" className="bsl-svg" role="img" aria-label={t('Four-Tier Liquidity Pool Hierarchy')}>
          <rect x="12" y="12" width="696" height="166" rx="10" fill="var(--rr-paper)" stroke="var(--bsl-border)" />
          <rect x="44" y="34" width="632" height="28" rx="6" fill="#0284c7" opacity="0.14" stroke="#0284c7" />
          <text x="58" y="53" fontSize="11" fontWeight="700" fill="#0284c7">Tier 1 · PMH/PML &amp; PWH/PWL (Macro HTF)</text>
          <rect x="74" y="72" width="572" height="28" rx="6" fill="#059669" opacity="0.14" stroke="#059669" />
          <text x="88" y="91" fontSize="11" fontWeight="700" fill="#059669">Tier 2 · PDH/PDL, Asia &amp; London High/Low</text>
          <rect x="104" y="110" width="512" height="28" rx="6" fill="#d97706" opacity="0.14" stroke="#d97706" />
          <text x="118" y="129" fontSize="11" fontWeight="700" fill="#d97706">Tier 3 · Clean 15m–4H EQH / EQL Clusters</text>
          <text x="148" y="160" fontSize="10.5" fill="var(--bsl-muted)">Tier 4 · Minor 1m–5m internal swings (lowest priority)</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'bsl-sequence-sim') {
    const steps = [
      'Step 1: Swing high forms with short stops resting above.',
      'Step 2: Price rallies rapidly into the resting BSL zone.',
      'Step 3: Buy-stops trigger, absorbing clustered orders.',
      'Step 4: Candle closes back inside range or accepts above.',
    ];
    return (
      <figure className="bsl-figure" data-bsl-figure="bsl-sequence-sim">
        <div className="bsl-figure-head">
          <span className="bsl-head-title">
            <Play size={16} aria-hidden="true" />
            <span>{t('Animated Sequence: BSL Sweep & Absorption')}</span>
          </span>
          <span className="bsl-badge">{`Step ${simStep + 1} / 4`}</span>
        </div>
        <div className="bsl-controls-row">
          <button type="button" className="bsl-btn is-primary" onClick={() => setSimPlaying((p) => !p)}>
            {simPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{simPlaying ? t('Pause') : t('Auto-Play')}</span>
          </button>
          <button type="button" className="bsl-btn" onClick={() => setSimStep((s) => (s + 1) % 4)}>
            {t('Next Step')}
          </button>
          <button type="button" className="bsl-btn" onClick={() => { setSimPlaying(false); setSimStep(0); }}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 190" className="bsl-svg" role="img" aria-label={t('Animated Sequence: BSL Sweep & Absorption')}>
          <rect x="12" y="12" width="696" height="166" rx="10" fill="var(--rr-paper)" stroke="var(--bsl-border)" />
          <line x1="48" y1="68" x2="672" y2="68" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />
          <path
            d={
              simStep === 0
                ? 'M75 138 L185 72 L265 118'
                : simStep === 1
                  ? 'M75 138 L185 72 L265 118 L395 78'
                  : simStep === 2
                    ? 'M75 138 L185 72 L265 118 L395 78 L480 40'
                    : 'M75 138 L185 72 L265 118 L395 78 L480 40 L605 134'
            }
            fill="none"
            stroke="#0284c7"
            strokeWidth="3"
          />
          <text x="56" y="160" fontSize="11.5" fontWeight="700" fill="var(--bsl-ink)">{steps[simStep]}</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'bsl-calculator') {
    const res = evaluateBslSslPlan({
      entryPrice,
      poolPrice,
      stopPrice,
      tickSize,
      accountRiskPct: 0.5,
    });
    return (
      <figure className="bsl-figure" data-bsl-figure="bsl-calculator">
        <div className="bsl-figure-head">
          <span className="bsl-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('BSL / SSL Target Distance & Risk Calculator')}</span>
          </span>
          <span className="bsl-badge">{t(res.bias)}</span>
        </div>
        <div className="bsl-calc-grid">
          <label className="bsl-field">
            <span>{t('Entry Price')}</span>
            <input type="number" step="0.25" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value) || 0)} />
          </label>
          <label className="bsl-field">
            <span>{t('Target Pool Price')}</span>
            <input type="number" step="0.25" value={poolPrice} onChange={(e) => setPoolPrice(Number(e.target.value) || 0)} />
          </label>
          <label className="bsl-field">
            <span>{t('Stop Invalidation')}</span>
            <input type="number" step="0.25" value={stopPrice} onChange={(e) => setStopPrice(Number(e.target.value) || 0)} />
          </label>
          <label className="bsl-field">
            <span>{t('Tick Size')}</span>
            <input type="number" step="0.01" min={0.0001} value={tickSize} onChange={(e) => setTickSize(Math.max(0.0001, Number(e.target.value) || 0.25))} />
          </label>
        </div>
        <div className="bsl-metrics-row">
          <div className="bsl-metric">
            <div className="bsl-metric-label">{t('Direction')}</div>
            <div className="bsl-metric-val">{t(res.bias)}</div>
          </div>
          <div className="bsl-metric">
            <div className="bsl-metric-label">{t('Target Distance')}</div>
            <div className="bsl-metric-val">{`${res.distanceTicks} ticks`}</div>
          </div>
          <div className="bsl-metric">
            <div className="bsl-metric-label">{t('Planned Risk')}</div>
            <div className="bsl-metric-val">{`${res.riskTicks} ticks (${res.rewardToRisk}R)`}</div>
          </div>
        </div>
        <figcaption className="bsl-caption">{res.guidance}</figcaption>
      </figure>
    );
  }

  if (kind === 'bsl-sweep-vs-accept') {
    return (
      <figure className="bsl-figure" data-bsl-figure="bsl-sweep-vs-accept">
        <div className="bsl-figure-head">
          <span className="bsl-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('Sweep Rejection vs. Breakout Acceptance')}</span>
          </span>
        </div>
        <div className="bsl-controls-row">
          <button type="button" className={`bsl-btn ${compareMode === 'reject' ? 'is-active' : ''}`} onClick={() => setCompareMode('reject')}>
            {t('Sweep Rejection')}
          </button>
          <button type="button" className={`bsl-btn ${compareMode === 'accept' ? 'is-active' : ''}`} onClick={() => setCompareMode('accept')}>
            {t('Breakout Acceptance')}
          </button>
        </div>
        <svg viewBox="0 0 720 185" className="bsl-svg" role="img" aria-label={t('Sweep Rejection vs. Breakout Acceptance')}>
          <rect x="12" y="12" width="696" height="161" rx="10" fill="var(--rr-paper)" stroke="var(--bsl-border)" />
          <line x1="48" y1="80" x2="672" y2="80" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />
          {compareMode === 'reject' ? (
            <>
              <path d="M80 144 L240 100 L360 38 L465 118 L610 152" fill="none" stroke="#e11d48" strokeWidth="3" />
              <text x="380" y="46" fontSize="11" fontWeight="700" fill="#e11d48">Wick above BSL, body closes inside</text>
            </>
          ) : (
            <>
              <path d="M80 144 L240 96 L380 58 L510 48 L620 26" fill="none" stroke="#059669" strokeWidth="3" />
              <text x="395" y="42" fontSize="11" fontWeight="700" fill="#059669">Bodies close and hold above BSL</text>
            </>
          )}
        </svg>
      </figure>
    );
  }

  if (kind === 'bsl-session-cycle') {
    return (
      <figure className="bsl-figure" data-bsl-figure="bsl-session-cycle">
        <div className="bsl-figure-head">
          <span className="bsl-head-title">
            <Clock size={16} aria-hidden="true" />
            <span>{t('24-Hour Session Pool Cycle')}</span>
          </span>
        </div>
        <svg viewBox="0 0 720 180" className="bsl-svg" role="img" aria-label={t('24-Hour Session Pool Cycle')}>
          <rect x="12" y="12" width="696" height="156" rx="10" fill="var(--rr-paper)" stroke="var(--bsl-border)" />
          <rect x="38" y="38" width="190" height="104" rx="8" fill="#0284c7" opacity="0.09" stroke="#0284c7" />
          <text x="52" y="62" fontSize="11" fontWeight="700" fill="#0284c7">Asia Builds Range</text>
          <text x="52" y="84" fontSize="10" fill="var(--bsl-muted)">Asia High = BSL · Asia Low = SSL</text>
          <rect x="264" y="38" width="190" height="104" rx="8" fill="#d97706" opacity="0.09" stroke="#d97706" />
          <text x="278" y="62" fontSize="11" fontWeight="700" fill="#d97706">London Sweeps One Side</text>
          <text x="278" y="84" fontSize="10" fill="var(--bsl-muted)">02:00–05:00 ET Raid</text>
          <rect x="490" y="38" width="190" height="104" rx="8" fill="#059669" opacity="0.09" stroke="#059669" />
          <text x="504" y="62" fontSize="11" fontWeight="700" fill="#059669">NY AM Targets Opposite</text>
          <text x="504" y="84" fontSize="10" fill="var(--bsl-muted)">08:30–11:00 ET Draw</text>
        </svg>
      </figure>
    );
  }

  if (kind === 'bsl-blueprints') {
    return (
      <figure className="bsl-figure" data-bsl-figure="bsl-blueprints">
        <div className="bsl-figure-head">
          <span className="bsl-head-title">
            <BookOpen size={16} aria-hidden="true" />
            <span>{t('Worked Blueprints: NQ vs. EUR/USD')}</span>
          </span>
        </div>
        <div className="bsl-controls-row">
          <button type="button" className={`bsl-btn ${blueprint === 'nq' ? 'is-active' : ''}`} onClick={() => setBlueprint('nq')}>
            {t('NQ PDH Raid')}
          </button>
          <button type="button" className={`bsl-btn ${blueprint === 'eur' ? 'is-active' : ''}`} onClick={() => setBlueprint('eur')}>
            {t('EUR/USD Asia Low')}
          </button>
        </div>
        <svg viewBox="0 0 720 180" className="bsl-svg" role="img" aria-label={t('Worked Blueprints: NQ vs. EUR/USD')}>
          <rect x="12" y="12" width="696" height="156" rx="10" fill="var(--rr-paper)" stroke="var(--bsl-border)" />
          {blueprint === 'nq' ? (
            <>
              <line x1="48" y1="54" x2="672" y2="54" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />
              <path d="M80 132 L250 86 L360 36 L475 114 L615 142" fill="none" stroke="#0284c7" strokeWidth="2.8" />
              <text x="56" y="44" fontSize="11" fontWeight="700" fill="#0284c7">NQ PDH (BSL) Swept at 09:45 ET → Reclaim Inside</text>
            </>
          ) : (
            <>
              <line x1="48" y1="126" x2="672" y2="126" stroke="#e11d48" strokeWidth="2" strokeDasharray="6 4" />
              <path d="M80 60 L250 102 L360 148 L475 74 L615 44" fill="none" stroke="#059669" strokeWidth="2.8" />
              <text x="56" y="148" fontSize="11" fontWeight="700" fill="#e11d48">EUR/USD Asia Low (SSL) Swept at 03:15 ET → Shift Higher</text>
            </>
          )}
        </svg>
      </figure>
    );
  }

  if (kind === 'bsl-mistakes-comic') {
    return (
      <figure className="bsl-figure" data-bsl-figure="bsl-mistakes-comic">
        <div className="bsl-figure-head">
          <span className="bsl-head-title">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{t('Common Mistakes in BSL / SSL Mapping')}</span>
          </span>
        </div>
        <div className="bsl-comic-grid">
          <div className="bsl-comic-panel">
            <strong>{t('Mistake 1: Line Clutter')}</strong>
            <p>{t('Marking every 1m wick hides the major PDH/PDL and 4H pools.')}</p>
          </div>
          <div className="bsl-comic-panel">
            <strong>{t('Mistake 2: Auto-Fade Every High')}</strong>
            <p>{t('Treating every BSL tag as an automatic reversal ignores trend acceptance.')}</p>
          </div>
          <div className="bsl-comic-panel">
            <strong>{t('Mistake 3: Confusing Stop Side')}</strong>
            <p>{t('Remember: short stop-losses are buy orders, not sell orders.')}</p>
          </div>
        </div>
      </figure>
    );
  }

  const passed = checked.filter(Boolean).length;
  const pct = Math.round((passed / checklistGates.length) * 100);
  return (
    <figure className="bsl-figure" data-bsl-figure="bsl-checklist-meter">
      <div className="bsl-figure-head">
        <span className="bsl-head-title">
          <CheckSquare size={16} aria-hidden="true" />
          <span>{t('Pre-Replay BSL / SSL 6-Gate Checklist')}</span>
        </span>
        <span className="bsl-badge">{`${passed} / ${checklistGates.length} (${pct}%)`}</span>
      </div>
      <div className="bsl-checklist">
        {checklistGates.map((gate, i) => (
          <label key={gate} className="bsl-check-item">
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
      <div className="bsl-meter-track" aria-hidden="true">
        <div className="bsl-meter-fill" style={{ width: `${pct}%` }} />
      </div>
      <figcaption className="bsl-caption">
        {t('Verify every gate before logging a BSL or SSL study in replay.')}
      </figcaption>
    </figure>
  );
}
