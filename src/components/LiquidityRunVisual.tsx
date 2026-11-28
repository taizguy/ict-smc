import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
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
  TrendingUp,
} from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { evaluateLiquidityCorridor } from '../utils/liquidityRunMath';
import { LiquidityRunScene } from './LiquidityRunScene';

export type LiquidityRunVisualKind =
  | 'lr-comic-intro'
  | 'lr-eqh-tolerance'
  | 'lr-3d-corridor'
  | 'lr-trendline-phantom'
  | 'lr-sequence-sim'
  | 'lr-calculator'
  | 'lr-sweep-vs-run'
  | 'lr-session-flow'
  | 'lr-blueprints'
  | 'lr-mistakes-comic'
  | 'lr-checklist-meter';

const checklistGates = [
  'Marked EQH/EQL or session high/low with predefined tick/pip tolerance',
  'Distinguished visual chart anchors from unknown resting order-book depth',
  'Counted opposing swing barriers between current price and target pool',
  'Classified corridor as LRLR (clean FVG) or HRLR (cluttered overlap)',
  'Checked candle-body closes at target (sweep-and-reclaim vs. acceptance)',
  'Bounded combined exposure across any add-on entries before replay',
];

export function LiquidityRunVisual({
  kind,
  staticOnly = false,
}: {
  kind: LiquidityRunVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();
  const [poolMode, setPoolMode] = useState<'eqh' | 'eql' | 'session'>('eqh');
  const [phantomView, setPhantomView] = useState<'chart' | 'reality'>('chart');
  const [simStep, setSimStep] = useState(0);
  const [simPlaying, setSimPlaying] = useState(false);

  const [opposingSwings, setOpposingSwings] = useState(1);
  const [hasCleanFvg, setHasCleanFvg] = useState(true);
  const [scaledEntries, setScaledEntries] = useState(2);
  const [riskPerEntryPct, setRiskPerEntryPct] = useState(0.5);

  const [sweepMode, setSweepMode] = useState<'sweep' | 'continuation'>('sweep');
  const [blueprint, setBlueprint] = useState<'nq-lrlr' | 'eur-hrlr'>('nq-lrlr');
  const [checked, setChecked] = useState<boolean[]>([true, true, false, false, false, false]);

  useEffect(() => {
    if (!simPlaying || staticOnly) return;
    const id = window.setInterval(() => {
      setSimStep((s) => (s + 1) % 4);
    }, 1700);
    return () => window.clearInterval(id);
  }, [simPlaying, staticOnly]);

  if (kind === 'lr-3d-corridor') {
    return <LiquidityRunScene staticOnly={staticOnly} />;
  }

  if (kind === 'lr-comic-intro') {
    return (
      <figure className="lr-figure" data-lr-figure="lr-comic-intro">
        <div className="lr-figure-head">
          <span className="lr-head-title">
            <Compass size={16} aria-hidden="true" />
            <span>{t('Stick-Figure Analogy: Highway vs. Traffic Jam')}</span>
          </span>
          <span className="lr-badge">{t('Mental Model')}</span>
        </div>
        <div className="lr-comic-grid">
          <div className="lr-comic-panel">
            <strong>{t('1. Open Highway (LRLR)')}</strong>
            <svg viewBox="0 0 210 120" className="lr-svg" role="img" aria-label={t('Open highway LRLR')}>
              <rect x="6" y="6" width="198" height="108" rx="8" fill="var(--lr-surface)" />
              <line x1="20" y1="88" x2="190" y2="30" stroke="#059669" strokeWidth="3" className="lr-flow-dash" />
              <circle cx="44" cy="60" r="8" fill="none" stroke="var(--lr-ink)" strokeWidth="2" />
              <line x1="44" y1="68" x2="44" y2="90" stroke="var(--lr-ink)" strokeWidth="2" />
              <line x1="34" y1="76" x2="56" y2="74" stroke="var(--lr-ink)" strokeWidth="2" />
              <text x="86" y="25" fontSize="10" fontWeight="700" fill="#059669">EQH Pool</text>
              <circle cx="176" cy="34" r="5" fill="#059669" className="lr-pulse-dot" />
            </svg>
            <p>{t('Zero opposing speed bumps allow smooth expansion toward the target pool.')}</p>
          </div>
          <div className="lr-comic-panel">
            <strong>{t('2. Traffic Jam (HRLR)')}</strong>
            <svg viewBox="0 0 210 120" className="lr-svg" role="img" aria-label={t('Traffic jam HRLR')}>
              <rect x="6" y="6" width="198" height="108" rx="8" fill="var(--lr-surface)" />
              <rect x="75" y="48" width="16" height="44" rx="3" fill="#d97706" opacity="0.35" stroke="#d97706" />
              <rect x="115" y="40" width="16" height="52" rx="3" fill="#d97706" opacity="0.35" stroke="#d97706" />
              <path d="M26 84 L62 66 L74 80 L108 58 L120 74 L156 54" fill="none" stroke="#d97706" strokeWidth="2.4" />
              <circle cx="42" cy="54" r="8" fill="none" stroke="var(--lr-ink)" strokeWidth="2" />
              <line x1="42" y1="62" x2="42" y2="84" stroke="var(--lr-ink)" strokeWidth="2" />
              <text x="72" y="25" fontSize="10" fontWeight="700" fill="#d97706">Opposing Swings</text>
            </svg>
            <p>{t('Old highs, lows, and overlapping wicks stall momentum at every step.')}</p>
          </div>
          <div className="lr-comic-panel">
            <strong>{t('3. Same Destination, Different Effort')}</strong>
            <svg viewBox="0 0 210 120" className="lr-svg" role="img" aria-label={t('Corridor effort comparison')}>
              <rect x="6" y="6" width="198" height="108" rx="8" fill="var(--lr-surface)" />
              <line x1="22" y1="44" x2="188" y2="44" stroke="#059669" strokeWidth="2.5" />
              <line x1="22" y1="78" x2="188" y2="78" stroke="#d97706" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="24" y="36" fontSize="9.5" fontWeight="700" fill="#059669">LRLR: Clean FVG Path</text>
              <text x="24" y="96" fontSize="9.5" fontWeight="700" fill="#d97706">HRLR: Choppy Grinding</text>
            </svg>
            <p>{t('Studying corridor resistance before entry explains why some runs glide and others chop.')}</p>
          </div>
        </div>
        <figcaption className="lr-caption">
          {t('Conceptual stick-figure comparison of Low-Resistance vs. High-Resistance corridors.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'lr-eqh-tolerance') {
    return (
      <figure className="lr-figure" data-lr-figure="lr-eqh-tolerance">
        <div className="lr-figure-head">
          <span className="lr-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('Liquidity Reference Architecture & Tolerance Band')}</span>
          </span>
          <span className="lr-badge">{poolMode.toUpperCase()}</span>
        </div>
        <div className="lr-controls-row">
          <button type="button" className={`lr-btn ${poolMode === 'eqh' ? 'is-active' : ''}`} onClick={() => setPoolMode('eqh')}>
            {t('Equal Highs (EQH)')}
          </button>
          <button type="button" className={`lr-btn ${poolMode === 'eql' ? 'is-active' : ''}`} onClick={() => setPoolMode('eql')}>
            {t('Equal Lows (EQL)')}
          </button>
          <button type="button" className={`lr-btn ${poolMode === 'session' ? 'is-active' : ''}`} onClick={() => setPoolMode('session')}>
            {t('PDH / PDL Band')}
          </button>
        </div>
        <svg viewBox="0 0 720 220" className="lr-svg" role="img" aria-label={t('Liquidity Reference Architecture')}>
          <rect x="12" y="12" width="696" height="196" rx="10" fill="var(--rr-paper)" stroke="var(--lr-border)" />
          {poolMode === 'eqh' && (
            <>
              <rect x="70" y="42" width="580" height="22" rx="4" fill="#4f46e5" opacity="0.14" stroke="#4f46e5" strokeDasharray="5 3" />
              <text x="82" y="34" fontSize="11" fontWeight="700" fill="#4f46e5">Predefined Tolerance Band (e.g., ±4 ticks)</text>
              <path d="M60 155 L155 54 L235 125 L345 50 L430 132 L545 56 L645 36" fill="none" stroke="#059669" strokeWidth="2.8" />
              <circle cx="155" cy="54" r="5" fill="#4f46e5" />
              <circle cx="345" cy="50" r="5" fill="#4f46e5" />
              <circle cx="545" cy="56" r="5" fill="#4f46e5" />
              <text x="560" y="34" fontSize="11" fontWeight="700" fill="#059669">BSL Run Through Band</text>
            </>
          )}
          {poolMode === 'eql' && (
            <>
              <rect x="70" y="150" width="580" height="22" rx="4" fill="#e11d48" opacity="0.14" stroke="#e11d48" strokeDasharray="5 3" />
              <text x="82" y="188" fontSize="11" fontWeight="700" fill="#e11d48">Equal Lows Tolerance Band (SSL Reference)</text>
              <path d="M60 68 L155 160 L245 96 L355 164 L445 92 L555 158 L645 184" fill="none" stroke="#e11d48" strokeWidth="2.8" />
              <circle cx="155" cy="160" r="5" fill="#e11d48" />
              <circle cx="355" cy="164" r="5" fill="#e11d48" />
              <circle cx="555" cy="158" r="5" fill="#e11d48" />
            </>
          )}
          {poolMode === 'session' && (
            <>
              <line x1="60" y1="54" x2="660" y2="54" stroke="#0284c7" strokeWidth="2.2" strokeDasharray="6 4" />
              <line x1="60" y1="166" x2="660" y2="166" stroke="#d97706" strokeWidth="2.2" strokeDasharray="6 4" />
              <text x="72" y="46" fontSize="11" fontWeight="700" fill="#0284c7">Previous Day High (PDH)</text>
              <text x="72" y="184" fontSize="11" fontWeight="700" fill="#d97706">Previous Day Low (PDL)</text>
              <path d="M75 135 L180 95 L290 155 L425 78 L560 44 L635 66" fill="none" stroke="#4f46e5" strokeWidth="2.8" />
            </>
          )}
        </svg>
        <figcaption className="lr-caption">
          {t('Predefined tolerance rules keep EQH/EQL labeling consistent across both breakouts and reversals.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'lr-trendline-phantom') {
    return (
      <figure className="lr-figure" data-lr-figure="lr-trendline-phantom">
        <div className="lr-figure-head">
          <span className="lr-head-title">
            <TrendingUp size={16} aria-hidden="true" />
            <span>{t('Trendline Phantom Liquidity: Chart Line vs. Order-Book Reality')}</span>
          </span>
          <span className="lr-badge">{phantomView === 'chart' ? t('Visible OHLC') : t('Unobserved Depth')}</span>
        </div>
        <div className="lr-controls-row">
          <button type="button" className={`lr-btn ${phantomView === 'chart' ? 'is-active' : ''}`} onClick={() => setPhantomView('chart')}>
            {t('What Chart Shows')}
          </button>
          <button type="button" className={`lr-btn ${phantomView === 'reality' ? 'is-active' : ''}`} onClick={() => setPhantomView('reality')}>
            {t('What OHLC Hides')}
          </button>
        </div>
        <svg viewBox="0 0 720 210" className="lr-svg" role="img" aria-label={t('Trendline Phantom Liquidity')}>
          <rect x="12" y="12" width="696" height="186" rx="10" fill="var(--rr-paper)" stroke="var(--lr-border)" />
          <line x1="70" y1="168" x2="495" y2="76" stroke="#4f46e5" strokeWidth="2.4" strokeDasharray="6 4" />
          <path d="M70 168 L135 110 L215 136 L285 78 L360 105 L445 48 L560 152" fill="none" stroke="var(--lr-ink)" strokeWidth="2.6" />
          <circle cx="70" cy="168" r="5" fill="#4f46e5" />
          <circle cx="215" cy="136" r="5" fill="#4f46e5" />
          <circle cx="360" cy="105" r="5" fill="#4f46e5" />
          {phantomView === 'chart' ? (
            <text x="82" y="42" fontSize="11.5" fontWeight="700" fill="#4f46e5">
              3 Rising Anchor Lows Connected Visually (No Stop Volume Visible)
            </text>
          ) : (
            <>
              <rect x="405" y="116" width="245" height="58" rx="8" fill="#e11d48" opacity="0.12" stroke="#e11d48" />
              <text x="418" y="138" fontSize="11" fontWeight="700" fill="#e11d48">
                Stop Size &amp; Intent Are Unobserved
              </text>
              <text x="418" y="156" fontSize="10" fill="var(--lr-muted)">
                Treat line as a reference anchor, not proof
              </text>
            </>
          )}
        </svg>
        <figcaption className="lr-caption">
          {t('A trendline marks visual reaction points; OHLC candles never reveal exact resting stop size or institutional intent.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'lr-sequence-sim') {
    const steps = [
      { title: 'Step 1 · Pool Anchored', desc: 'Previous session Equal Highs (BSL) sit above a clean FVG.' },
      { title: 'Step 2 · Opposing Scan', desc: 'Only 1 minor swing sits between current price and the EQH pool (LRLR).' },
      { title: 'Step 3 · Displacement', desc: 'Price expands through the gap with minimal wick overlap.' },
      { title: 'Step 4 · Pool Tag & Check', desc: 'Evaluate whether bodies accept above the pool or reject back inside.' },
    ];
    return (
      <figure className="lr-figure" data-lr-figure="lr-sequence-sim">
        <div className="lr-figure-head">
          <span className="lr-head-title">
            <Play size={16} aria-hidden="true" />
            <span>{t('Animated Sequence: LRLR Displacement vs. HRLR Grinding')}</span>
          </span>
          <span className="lr-badge">{`Step ${simStep + 1} / 4`}</span>
        </div>
        <div className="lr-controls-row">
          <button type="button" className="lr-btn is-primary" onClick={() => setSimPlaying((p) => !p)}>
            {simPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{simPlaying ? t('Pause') : t('Auto-Play')}</span>
          </button>
          <button type="button" className="lr-btn" onClick={() => setSimStep((s) => (s + 1) % 4)}>
            {t('Next Step')}
          </button>
          <button type="button" className="lr-btn" onClick={() => { setSimPlaying(false); setSimStep(0); }}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 205" className="lr-svg" role="img" aria-label={t('Animated LRLR sequence')}>
          <rect x="12" y="12" width="696" height="181" rx="10" fill="var(--rr-paper)" stroke="var(--lr-border)" />
          <line x1="48" y1="48" x2="672" y2="48" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />
          <text x="56" y="38" fontSize="11" fontWeight="700" fill="#0284c7">EQH Target Pool</text>
          <rect x="245" y="96" width="120" height="32" rx="4" fill="#059669" opacity={simStep >= 1 ? 0.18 : 0.05} stroke="#059669" />
          <text x="255" y="116" fontSize="10" fontWeight="700" fill="#059669">Clean FVG Corridor</text>
          <path
            d={
              simStep === 0
                ? 'M75 162 L160 140'
                : simStep === 1
                  ? 'M75 162 L160 140 L240 124'
                  : simStep === 2
                    ? 'M75 162 L160 140 L240 124 L420 76'
                    : 'M75 162 L160 140 L240 124 L420 76 L585 40'
            }
            fill="none"
            stroke="#059669"
            strokeWidth="3.2"
          />
          <text x="56" y="176" fontSize="11.5" fontWeight="700" fill="var(--lr-ink)">
            {`${steps[simStep].title} — ${steps[simStep].desc}`}
          </text>
        </svg>
        <figcaption className="lr-caption">
          {t('Step-by-step progression contrasting clean LRLR corridor expansion against cluttered swing overlap.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'lr-calculator') {
    const res = evaluateLiquidityCorridor({
      opposingSwings,
      hasCleanFvg,
      scaledEntries,
      riskPerEntryPct,
    });
    return (
      <figure className="lr-figure" data-lr-figure="lr-calculator">
        <div className="lr-figure-head">
          <span className="lr-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('LRLR vs. HRLR Corridor & Combined Exposure Calculator')}</span>
          </span>
          <span className="lr-badge">{res.classification}</span>
        </div>
        <div className="lr-calc-grid">
          <label className="lr-field">
            <span>{t('Opposing Swings in Corridor')}</span>
            <input
              type="number"
              min={0}
              max={10}
              value={opposingSwings}
              onChange={(e) => setOpposingSwings(Math.max(0, Math.min(10, Number(e.target.value) || 0)))}
            />
          </label>
          <label className="lr-field">
            <span>{t('Clean FVG Present?')}</span>
            <select value={hasCleanFvg ? 'yes' : 'no'} onChange={(e) => setHasCleanFvg(e.target.value === 'yes')}>
              <option value="yes">{t('Yes — Unmitigated Gap')}</option>
              <option value="no">{t('No — Overlapping Wicks')}</option>
            </select>
          </label>
          <label className="lr-field">
            <span>{t('Scaled Entries')}</span>
            <input
              type="number"
              min={1}
              max={5}
              value={scaledEntries}
              onChange={(e) => setScaledEntries(Math.max(1, Math.min(5, Number(e.target.value) || 1)))}
            />
          </label>
          <label className="lr-field">
            <span>{t('Risk Per Entry (%)')}</span>
            <input
              type="number"
              step={0.25}
              min={0.1}
              max={2}
              value={riskPerEntryPct}
              onChange={(e) => setRiskPerEntryPct(Math.max(0.1, Math.min(2, Number(e.target.value) || 0.25)))}
            />
          </label>
        </div>
        <div className="lr-metrics-row">
          <div className="lr-metric">
            <div className="lr-metric-label">{t('Corridor Class')}</div>
            <div className="lr-metric-val">{res.classification}</div>
          </div>
          <div className="lr-metric">
            <div className="lr-metric-label">{t('Clarity Score')}</div>
            <div className="lr-metric-val">{`${res.clarityScore} / 100`}</div>
          </div>
          <div className="lr-metric">
            <div className="lr-metric-label">{t('Combined Exposure')}</div>
            <div className="lr-metric-val">{`${res.combinedExposurePct}%`}</div>
          </div>
        </div>
        <figcaption className="lr-caption">{res.guidance}</figcaption>
      </figure>
    );
  }

  if (kind === 'lr-sweep-vs-run') {
    return (
      <figure className="lr-figure" data-lr-figure="lr-sweep-vs-run">
        <div className="lr-figure-head">
          <span className="lr-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('Liquidity Sweep-and-Reclaim vs. Sustained Continuation')}</span>
          </span>
          <span className="lr-badge">{sweepMode === 'sweep' ? t('Sweep & Reclaim') : t('Body Acceptance')}</span>
        </div>
        <div className="lr-controls-row">
          <button type="button" className={`lr-btn ${sweepMode === 'sweep' ? 'is-active' : ''}`} onClick={() => setSweepMode('sweep')}>
            {t('Sweep & Reclaim')}
          </button>
          <button type="button" className={`lr-btn ${sweepMode === 'continuation' ? 'is-active' : ''}`} onClick={() => setSweepMode('continuation')}>
            {t('Sustained Continuation')}
          </button>
        </div>
        <svg viewBox="0 0 720 205" className="lr-svg" role="img" aria-label={t('Sweep vs continuation')}>
          <rect x="12" y="12" width="696" height="181" rx="10" fill="var(--rr-paper)" stroke="var(--lr-border)" />
          <line x1="48" y1="82" x2="672" y2="82" stroke="#0284c7" strokeWidth="2.2" strokeDasharray="6 4" />
          <text x="56" y="72" fontSize="11" fontWeight="700" fill="#0284c7">Pool Reference Level (100.0)</text>
          {sweepMode === 'sweep' ? (
            <>
              <path d="M80 155 L210 112 L345 42 L440 128 L595 168" fill="none" stroke="#e11d48" strokeWidth="3" />
              <circle cx="345" cy="42" r="5.5" fill="#e11d48" />
              <text x="360" y="46" fontSize="11" fontWeight="700" fill="#e11d48">Wick Pierce Only — Body Closes Inside Range</text>
            </>
          ) : (
            <>
              <path d="M80 155 L220 110 L360 66 L485 52 L620 28" fill="none" stroke="#059669" strokeWidth="3" />
              <rect x="345" y="48" width="46" height="22" rx="3" fill="#059669" opacity="0.22" stroke="#059669" />
              <text x="400" y="42" fontSize="11" fontWeight="700" fill="#059669">Candle Bodies Close &amp; Hold Above Pool</text>
            </>
          )}
        </svg>
        <figcaption className="lr-caption">
          {t('Body closes beyond the pool distinguish sustained continuation from wick-only sweep-and-reclaim traps.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'lr-session-flow') {
    return (
      <figure className="lr-figure" data-lr-figure="lr-session-flow">
        <div className="lr-figure-head">
          <span className="lr-head-title">
            <Clock size={16} aria-hidden="true" />
            <span>{t('Session Engineering Flow: Asia → London → NY AM')}</span>
          </span>
          <span className="lr-badge">{t('ET Session Map')}</span>
        </div>
        <svg viewBox="0 0 720 205" className="lr-svg" role="img" aria-label={t('Session engineering flow')}>
          <rect x="12" y="12" width="696" height="181" rx="10" fill="var(--rr-paper)" stroke="var(--lr-border)" />
          <rect x="38" y="42" width="185" height="126" rx="8" fill="#4f46e5" opacity="0.08" stroke="#4f46e5" />
          <text x="52" y="64" fontSize="11" fontWeight="700" fill="#4f46e5">Asia (20:00–00:00 ET)</text>
          <path d="M55 110 L95 95 L135 120 L175 98 L205 116" fill="none" stroke="#4f46e5" strokeWidth="2.2" />
          <text x="52" y="152" fontSize="9.5" fill="var(--lr-muted)">Builds tight range EQH/EQL</text>

          <rect x="262" y="42" width="185" height="126" rx="8" fill="#d97706" opacity="0.08" stroke="#d97706" />
          <text x="276" y="64" fontSize="11" fontWeight="700" fill="#d97706">London (02:00–05:00 ET)</text>
          <path d="M276 116 L330 148 L415 88" fill="none" stroke="#d97706" strokeWidth="2.5" />
          <text x="276" y="158" fontSize="9.5" fill="var(--lr-muted)">Sweeps one side of Asia range</text>

          <rect x="486" y="42" width="194" height="126" rx="8" fill="#059669" opacity="0.08" stroke="#059669" />
          <text x="500" y="64" fontSize="11" fontWeight="700" fill="#059669">NY AM (08:30–11:00 ET)</text>
          <path d="M500 105 L565 78 L655 52" fill="none" stroke="#059669" strokeWidth="2.8" />
          <text x="500" y="152" fontSize="9.5" fill="var(--lr-muted)">Drives toward opposing HTF target</text>
        </svg>
        <figcaption className="lr-caption">
          {t('Session windows show how overnight consolidation pools feed London sweeps and New York expansions.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'lr-blueprints') {
    return (
      <figure className="lr-figure" data-lr-figure="lr-blueprints">
        <div className="lr-figure-head">
          <span className="lr-head-title">
            <Crosshair size={16} aria-hidden="true" />
            <span>{t('Worked Blueprints: NQ LRLR vs. EUR/USD HRLR Sweep')}</span>
          </span>
          <span className="lr-badge">{blueprint === 'nq-lrlr' ? 'NQ LRLR' : 'EUR/USD HRLR'}</span>
        </div>
        <div className="lr-controls-row">
          <button type="button" className={`lr-btn ${blueprint === 'nq-lrlr' ? 'is-active' : ''}`} onClick={() => setBlueprint('nq-lrlr')}>
            {t('NQ LRLR Continuation')}
          </button>
          <button type="button" className={`lr-btn ${blueprint === 'eur-hrlr' ? 'is-active' : ''}`} onClick={() => setBlueprint('eur-hrlr')}>
            {t('EUR/USD HRLR Sweep')}
          </button>
        </div>
        <svg viewBox="0 0 720 205" className="lr-svg" role="img" aria-label={t('Worked blueprints')}>
          <rect x="12" y="12" width="696" height="181" rx="10" fill="var(--rr-paper)" stroke="var(--lr-border)" />
          {blueprint === 'nq-lrlr' ? (
            <>
              <line x1="48" y1="54" x2="672" y2="54" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />
              <text x="56" y="44" fontSize="11" fontWeight="700" fill="#0284c7">NQ BSL Target: Clean 40-pt FVG Runway</text>
              <path d="M75 160 L195 126 L265 140 L415 84 L575 44" fill="none" stroke="#059669" strokeWidth="3" />
              <text x="275" y="156" fontSize="10.5" fill="var(--lr-muted)">0–1 opposing swing · clean displacement into pool</text>
            </>
          ) : (
            <>
              <line x1="48" y1="156" x2="672" y2="156" stroke="#e11d48" strokeWidth="2" strokeDasharray="6 4" />
              <text x="56" y="176" fontSize="11" fontWeight="700" fill="#e11d48">EUR/USD SSL Pool Swept After 4 Opposing Swings</text>
              <path d="M75 72 L155 124 L215 94 L290 132 L355 102 L440 168 L545 105" fill="none" stroke="#d97706" strokeWidth="2.8" />
            </>
          )}
        </svg>
        <figcaption className="lr-caption">
          {t('Synthetic study blueprints contrasting clean LRLR continuation against choppy HRLR sweep behavior.')}
        </figcaption>
      </figure>
    );
  }

  if (kind === 'lr-mistakes-comic') {
    return (
      <figure className="lr-figure" data-lr-figure="lr-mistakes-comic">
        <div className="lr-figure-head">
          <span className="lr-head-title">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>{t('Common Mistakes in Liquidity Run Studies')}</span>
          </span>
          <span className="lr-badge">{t('3 Traps')}</span>
        </div>
        <div className="lr-comic-grid">
          <div className="lr-comic-panel">
            <strong>{t('Mistake 1: Trendline = Guarantee')}</strong>
            <p>{t('Assuming a drawn trendline proves hidden institutional stop volume or forces a bounce.')}</p>
          </div>
          <div className="lr-comic-panel">
            <strong>{t('Mistake 2: Pyramiding Blindly')}</strong>
            <p>{t('Stacking 4 add-on entries in an LRLR run without capping combined account exposure.')}</p>
          </div>
          <div className="lr-comic-panel">
            <strong>{t('Mistake 3: Ignoring HRLR Friction')}</strong>
            <p>{t('Expecting smooth highway velocity when price must grind through 4+ opposing swings.')}</p>
          </div>
        </div>
        <figcaption className="lr-caption">
          {t('Stick-figure audit of the three fastest ways traders misread liquidity corridors.')}
        </figcaption>
      </figure>
    );
  }

  const passed = checked.filter(Boolean).length;
  const pct = Math.round((passed / checklistGates.length) * 100);

  return (
    <figure className="lr-figure" data-lr-figure="lr-checklist-meter">
      <div className="lr-figure-head">
        <span className="lr-head-title">
          <CheckSquare size={16} aria-hidden="true" />
          <span>{t('Pre-Replay Liquidity Run 6-Gate Checklist')}</span>
        </span>
        <span className="lr-badge">{`${passed} / ${checklistGates.length} (${pct}%)`}</span>
      </div>
      <div className="lr-checklist">
        {checklistGates.map((gate, i) => (
          <label key={gate} className="lr-check-item">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() =>
                setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
              }
            />
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>{t(gate)}</span>
          </label>
        ))}
      </div>
      <div className="lr-meter-track" aria-hidden="true">
        <div className="lr-meter-fill" style={{ width: `${pct}%` }} />
      </div>
      <figcaption className="lr-caption">
        {t('Verify every gate objectively before logging a liquidity run study in replay.')}
      </figcaption>
    </figure>
  );
}
