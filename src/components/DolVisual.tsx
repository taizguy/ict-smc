import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Calculator,
  GitBranch,
  Pause,
  Play,
  RotateCcw,
  Users,
} from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { computeDolPriority } from '../utils/drawOnLiquidityMath';
import { DolScene } from './DolScene';

export type DolVisualKind =
  | 'dol-comic-intro'
  | 'dol-3d-compass'
  | 'dol-decision-tree'
  | 'dol-erl-vs-irl-tug'
  | 'dol-priority-scorer'
  | 'dol-mistakes-comic';

const treeScenarios = [
  {
    id: 'swept-ssl',
    label: 'Just Swept Daily SSL',
    nextTarget: 'Opposing External BSL (EQH / PDH) after LTF MSS',
    invalidation: '15M/1H close back below the swept SSL low',
    phase: 'IRL Launch → ERL',
  },
  {
    id: 'swept-bsl',
    label: 'Just Swept Weekly BSL',
    nextTarget: 'Nearest Unmitigated 4H Discount FVG (IRL)',
    invalidation: '1H displacement body close holding above swept BSL',
    phase: 'ERL Sweep → IRL',
  },
  {
    id: 'mid-disp',
    label: 'Bounced from 4H FVG + MSS',
    nextTarget: '1H Premium FVG (TP1) → 4H EQH (TP2)',
    invalidation: 'Close below the 4H Discount FVG consequent encroachment',
    phase: 'IRL → Opposing ERL',
  },
  {
    id: 'no-disp',
    label: 'Choppy Range / No Displacement',
    nextTarget: 'Stand Aside — Wait for Sweep + Displacement',
    invalidation: 'Avoid guessing inside 45%–55% Equilibrium',
    phase: 'No Active Draw',
  },
];

const tugSteps = [
  { label: 'Step 1: PDL Swept', note: 'Price sweeps PDL and displaces higher.', x: 110, y: 176 },
  { label: 'Step 2: 4H FVG Pull (IRL)', note: 'Unmitigated 4H FVG pulls price for rebalance first.', x: 280, y: 124 },
  { label: 'Step 3: Launchpad', note: 'Buyers step in at Discount FVG; displacement resumes.', x: 440, y: 100 },
  { label: 'Step 4: EQH Magnet (ERL)', note: 'Stronger External Equal Highs magnet completes the draw.', x: 640, y: 46 },
];

export function DolVisual({
  kind,
  staticOnly = false,
}: {
  kind: DolVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();
  const [treeId, setTreeId] = useState<string>('swept-ssl');
  const [tugStep, setTugStep] = useState<number>(3);
  const [tugPlaying, setTugPlaying] = useState<boolean>(false);

  const [htfAligned, setHtfAligned] = useState<boolean>(true);
  const [hasDisplacement, setHasDisplacement] = useState<boolean>(true);
  const [pathType, setPathType] = useState<'lrlr' | 'hrlr'>('lrlr');
  const [inKillzone, setInKillzone] = useState<boolean>(true);
  const [entryPrice, setEntryPrice] = useState<number>(1.0840);
  const [stopPrice, setStopPrice] = useState<number>(1.0815);
  const [targetPrice, setTargetPrice] = useState<number>(1.0920);

  useEffect(() => {
    if (!tugPlaying || staticOnly) return;
    const timer = window.setInterval(() => {
      setTugStep((s) => (s + 1) % tugSteps.length);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [tugPlaying, staticOnly]);

  if (kind === 'dol-3d-compass') {
    return <DolScene staticOnly={staticOnly} />;
  }

  if (kind === 'dol-comic-intro') {
    return (
      <figure className="dol-figure" data-dol-figure="dol-comic-intro">
        <div className="dol-figure-head">
          <span className="dol-head-title">
            <Users size={16} aria-hidden="true" />
            <span>{t('Visual Story: Too Many Targets Without a DOL Compass')}</span>
          </span>
        </div>
        <svg viewBox="0 0 760 235" className="dol-svg" role="img" aria-label={t('Visual Story: Too Many Targets Without a DOL Compass')}>
          <rect x="12" y="12" width="358" height="210" rx="10" fill="var(--rr-paper)" stroke="var(--dol-border)" />
          <rect x="390" y="12" width="358" height="210" rx="10" fill="var(--rr-paper)" stroke="var(--dol-border)" />
          <text x="28" y="36" fontSize="12.5" fontWeight="700" fill="var(--dol-crimson)">{t('Confused Trader (Guessing 5 Targets)')}</text>
          <text x="406" y="36" fontSize="12.5" fontWeight="700" fill="var(--dol-emerald)">{t('DOL Compass Trader (1 Clear Target)')}</text>

          {/* Left stick figure with question marks */}
          <circle cx="80" cy="112" r="13" fill="none" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <line x1="80" y1="125" x2="80" y2="170" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <line x1="80" y1="140" x2="108" y2="124" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <line x1="80" y1="140" x2="56" y2="128" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <line x1="80" y1="170" x2="65" y2="202" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <line x1="80" y1="170" x2="95" y2="202" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <rect x="32" y="52" width="210" height="32" rx="7" fill="var(--dol-surface)" stroke="var(--dol-border)" />
          <text x="42" y="72" fontSize="11" fill="var(--dol-ink)">{t('"Target 1:3? Or FVG? Or PDH?"')}</text>
          <text x="175" y="114" fontSize="11" fill="var(--dol-crimson)">? 1:3 Fixed TP</text>
          <text x="175" y="142" fontSize="11" fill="var(--dol-crimson)">? Random Pivot</text>
          <text x="175" y="170" fontSize="11" fill="var(--dol-crimson)">? 30 Pip Rule</text>

          {/* Right stick figure with compass pointing to EQH */}
          <circle cx="458" cy="112" r="13" fill="none" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <circle cx="454" cy="109" r="1.7" fill="var(--dol-ink)" />
          <circle cx="463" cy="109" r="1.7" fill="var(--dol-ink)" />
          <path d="M453 117 Q458 122 464 117" fill="none" stroke="var(--dol-ink)" strokeWidth="1.8" />
          <line x1="458" y1="125" x2="458" y2="170" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <line x1="458" y1="140" x2="488" y2="132" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <circle cx="496" cy="130" r="9" fill="none" stroke="var(--dol-accent)" strokeWidth="2" />
          <line x1="496" y1="130" x2="502" y2="124" stroke="var(--dol-emerald)" strokeWidth="2" />
          <line x1="458" y1="170" x2="443" y2="202" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <line x1="458" y1="170" x2="473" y2="202" stroke="var(--dol-ink)" strokeWidth="2.4" />
          <rect x="410" y="52" width="225" height="32" rx="7" fill="var(--dol-surface)" stroke="var(--dol-border)" />
          <text x="420" y="72" fontSize="11" fill="var(--dol-ink)">{t('"SSL swept + MSS → Draw is EQH!"')}</text>
          <line x1="540" y1="100" x2="725" y2="100" stroke="var(--dol-emerald)" strokeWidth="2" strokeDasharray="5 4" />
          <text x="635" y="93" fontSize="10.5" fontWeight="700" fill="var(--dol-emerald)">EQH (DOL)</text>
          <path d="M545 186 L590 198 L640 144 L715 102" fill="none" stroke="var(--dol-emerald)" strokeWidth="2.8" />
          <circle cx="715" cy="102" r="5" fill="var(--dol-emerald)" />
        </svg>
        <figcaption className="dol-caption"><em>{t('Synthetic illustration — not live quotes.')}</em></figcaption>
      </figure>
    );
  }

  if (kind === 'dol-decision-tree') {
    const active = treeScenarios.find((s) => s.id === treeId) || treeScenarios[0];
    return (
      <figure className="dol-figure" data-dol-figure="dol-decision-tree">
        <div className="dol-figure-head">
          <span className="dol-head-title">
            <GitBranch size={16} aria-hidden="true" />
            <span>{t('Interactive DOL Target-Selection Decision Tree')}</span>
          </span>
          <span className="dol-badge">{active.phase}</span>
        </div>
        <div className="dol-controls-row">
          {treeScenarios.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`dol-btn ${item.id === active.id ? 'is-active' : ''}`}
              onClick={() => setTreeId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <svg viewBox="0 0 720 180" className="dol-svg" role="img" aria-label={t('Interactive DOL Target-Selection Decision Tree')}>
          <rect x="12" y="12" width="696" height="156" rx="10" fill="var(--rr-paper)" stroke="var(--dol-border)" />
          <rect x="36" y="64" width="180" height="52" rx="8" fill="var(--dol-surface)" stroke="var(--dol-accent)" strokeWidth="2" />
          <text x="50" y="94" fontSize="11.5" fontWeight="700" fill="var(--dol-ink)">{active.label}</text>
          <line x1="216" y1="90" x2="274" y2="90" stroke="var(--dol-accent)" strokeWidth="2.5" />
          <rect x="274" y="54" width="210" height="72" rx="8" fill="color-mix(in srgb, var(--dol-emerald) 10%, var(--rr-paper))" stroke="var(--dol-emerald)" strokeWidth="2" />
          <text x="288" y="80" fontSize="10.5" fontWeight="700" fill="var(--dol-emerald)">NEXT LOGICAL TARGET</text>
          <text x="288" y="102" fontSize="11" fontWeight="600" fill="var(--dol-ink)">{active.nextTarget.slice(0, 32)}</text>
          <line x1="484" y1="90" x2="526" y2="90" stroke="var(--dol-amber)" strokeWidth="2.5" />
          <rect x="526" y="54" width="162" height="72" rx="8" fill="var(--dol-surface)" stroke="var(--dol-amber)" strokeWidth="1.8" />
          <text x="538" y="80" fontSize="10.5" fontWeight="700" fill="var(--dol-amber)">INVALIDATION</text>
          <text x="538" y="102" fontSize="10.5" fill="var(--dol-muted)">{active.invalidation.slice(0, 24)}</text>
        </svg>
        <div className="dol-stat-grid">
          <div className="dol-stat"><small>Condition</small><strong>{active.label}</strong></div>
          <div className="dol-stat"><small>Selected Next Target</small><strong>{active.nextTarget}</strong></div>
          <div className="dol-stat"><small>Invalidation Gate</small><strong>{active.invalidation}</strong></div>
        </div>
      </figure>
    );
  }

  if (kind === 'dol-erl-vs-irl-tug') {
    const visiblePts = tugSteps.slice(0, tugStep + 1);
    const poly = visiblePts.map((p) => `${p.x},${p.y}`).join(' ');
    const cur = tugSteps[tugStep];
    return (
      <figure className="dol-figure" data-dol-figure="dol-erl-vs-irl-tug">
        <div className="dol-figure-head">
          <span className="dol-head-title">
            <Activity size={16} aria-hidden="true" />
            <span>{t('Animated Tug-of-War: Nearby IRL FVG vs. Distant ERL High')}</span>
          </span>
          <span className="dol-badge">{cur.label}</span>
        </div>
        <div className="dol-controls-row">
          {tugSteps.map((s, idx) => (
            <button key={s.label} type="button" className={`dol-btn ${tugStep === idx ? 'is-active' : ''}`} onClick={() => setTugStep(idx)}>
              Step {idx + 1}
            </button>
          ))}
          <button type="button" className="dol-btn is-primary" onClick={() => setTugPlaying((p) => !p)}>
            {tugPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{tugPlaying ? t('Pause') : t('Play')}</span>
          </button>
          <button type="button" className="dol-btn" onClick={() => { setTugPlaying(false); setTugStep(0); }}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 220" className="dol-svg" role="img" aria-label={t('Animated Tug-of-War: Nearby IRL FVG vs. Distant ERL High')}>
          <rect x="14" y="14" width="692" height="192" rx="10" fill="var(--rr-paper)" stroke="var(--dol-border)" />
          <line x1="36" y1="46" x2="684" y2="46" stroke="var(--dol-emerald)" strokeWidth="2.2" strokeDasharray="6 4" />
          <text x="44" y="38" fontSize="11" fontWeight="700" fill="var(--dol-emerald)">External Draw: 4H EQH (ERL)</text>
          <rect x="235" y="108" width="150" height="28" rx="4" fill="color-mix(in srgb, var(--dol-accent) 18%, transparent)" stroke="var(--dol-accent)" />
          <text x="246" y="126" fontSize="10.5" fontWeight="700" fill="var(--dol-accent)">Internal Draw: 4H FVG</text>
          <line x1="36" y1="176" x2="684" y2="176" stroke="var(--dol-crimson)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="44" y="192" fontSize="11" fontWeight="700" fill="var(--dol-crimson)">PDL Swept (SSL)</text>
          <polyline fill="none" stroke="var(--dol-sky)" strokeWidth="3" points={poly} />
          {visiblePts.map((pt, idx) => (
            <circle key={pt.label} cx={pt.x} cy={pt.y} r={idx === visiblePts.length - 1 ? 6.5 : 4} fill={idx === visiblePts.length - 1 ? 'var(--dol-amber)' : 'var(--dol-sky)'} />
          ))}
        </svg>
        <figcaption className="dol-caption"><strong>{cur.label}:</strong> {cur.note} — <em>{t('Synthetic illustration — not live quotes.')}</em></figcaption>
      </figure>
    );
  }

  if (kind === 'dol-priority-scorer') {
    const res = computeDolPriority({
      htfBiasAligned: htfAligned,
      hasDisplacement,
      pathType,
      inKillzone,
      entryPrice,
      stopPrice,
      targetPrice,
      tickSize: 0.0001,
    });
    return (
      <figure className="dol-figure" data-dol-figure="dol-priority-scorer">
        <div className="dol-figure-head">
          <span className="dol-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('Interactive 5-Factor DOL Target Priority Scorer')}</span>
          </span>
          <span className="dol-badge">{res.score}/100 — {res.grade}</span>
        </div>
        <div className="dol-controls-row">
          <button type="button" className={`dol-btn ${htfAligned ? 'is-active' : ''}`} onClick={() => setHtfAligned((v) => !v)}>
            HTF Bias Aligned: {htfAligned ? 'Yes' : 'No'}
          </button>
          <button type="button" className={`dol-btn ${hasDisplacement ? 'is-active' : ''}`} onClick={() => setHasDisplacement((v) => !v)}>
            Displacement Confirmed: {hasDisplacement ? 'Yes' : 'No'}
          </button>
          <button type="button" className={`dol-btn ${pathType === 'lrlr' ? 'is-active' : ''}`} onClick={() => setPathType((p) => (p === 'lrlr' ? 'hrlr' : 'lrlr'))}>
            Path: {pathType.toUpperCase()}
          </button>
          <button type="button" className={`dol-btn ${inKillzone ? 'is-active' : ''}`} onClick={() => setInKillzone((v) => !v)}>
            In Killzone: {inKillzone ? 'Yes' : 'No'}
          </button>
        </div>
        <div className="dol-calc-grid">
          <label className="dol-calc-field">
            <span>Entry Reference</span>
            <input type="number" step="0.0005" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value) || 0)} />
          </label>
          <label className="dol-calc-field">
            <span>Close Invalidation</span>
            <input type="number" step="0.0005" value={stopPrice} onChange={(e) => setStopPrice(Number(e.target.value) || 0)} />
          </label>
          <label className="dol-calc-field">
            <span>Selected DOL Target</span>
            <input type="number" step="0.0005" value={targetPrice} onChange={(e) => setTargetPrice(Number(e.target.value) || 0)} />
          </label>
        </div>
        <div className="dol-stat-grid">
          <div className="dol-stat"><small>Clarity Score</small><strong>{res.score} / 100</strong></div>
          <div className="dol-stat"><small>Classification</small><strong>{res.grade}</strong></div>
          <div className="dol-stat"><small>Reward / Risk</small><strong>{res.rewardToRisk.toFixed(2)}R</strong></div>
          <div className="dol-stat"><small>Target / Stop Ticks</small><strong>{res.rewardTicks} / {res.riskTicks}</strong></div>
        </div>
        <figcaption className="dol-caption"><em>{t('Synthetic illustration — not live quotes.')}</em></figcaption>
      </figure>
    );
  }

  // dol-mistakes-comic
  return (
    <figure className="dol-figure" data-dol-figure="dol-mistakes-comic">
      <div className="dol-figure-head">
        <span className="dol-head-title">
          <AlertTriangle size={16} aria-hidden="true" />
          <span>{t('Stick-Figure Mistakes: 3 Target-Selection Traps')}</span>
        </span>
      </div>
      <svg viewBox="0 0 760 215" className="dol-svg" role="img" aria-label={t('Stick-Figure Mistakes: 3 Target-Selection Traps')}>
        <rect x="10" y="12" width="236" height="190" rx="10" fill="var(--rr-paper)" stroke="var(--dol-border)" />
        <rect x="262" y="12" width="236" height="190" rx="10" fill="var(--rr-paper)" stroke="var(--dol-border)" />
        <rect x="514" y="12" width="236" height="190" rx="10" fill="var(--rr-paper)" stroke="var(--dol-border)" />

        <text x="24" y="36" fontSize="11.5" fontWeight="700" fill="var(--dol-crimson)">{t('Trap 1: Moving the Goalpost')}</text>
        <path d="M36 144 L102 82 L170 76 L216 154" fill="none" stroke="var(--dol-crimson)" strokeWidth="2.6" />
        <line x1="28" y1="74" x2="226" y2="74" stroke="var(--dol-emerald)" strokeWidth="1.8" strokeDasharray="4 3" />
        <text x="28" y="182" fontSize="10.5" fill="var(--dol-muted)">Deleting TP right at EQH</text>

        <text x="276" y="36" fontSize="11.5" fontWeight="700" fill="var(--dol-amber)">{t('Trap 2: Ignoring Nearby HTF FVG')}</text>
        <rect x="282" y="88" width="196" height="22" rx="4" fill="color-mix(in srgb, var(--dol-amber) 18%, transparent)" stroke="var(--dol-amber)" />
        <path d="M294 156 L360 98 L446 164" fill="none" stroke="var(--dol-crimson)" strokeWidth="2.6" />
        <text x="280" y="182" fontSize="10.5" fill="var(--dol-muted)">Aiming past unmitigated 4H FVG</text>

        <text x="528" y="36" fontSize="11.5" fontWeight="700" fill="var(--dol-accent)">{t('Trap 3: Fighting Displacement')}</text>
        <path d="M540 62 L600 108 L658 148 L718 176" fill="none" stroke="var(--dol-crimson)" strokeWidth="2.8" />
        <text x="530" y="182" fontSize="10.5" fill="var(--dol-muted)">Longing against bearish displacement</text>
      </svg>
      <figcaption className="dol-caption"><em>{t('Synthetic illustration — not live quotes.')}</em></figcaption>
    </figure>
  );
}
