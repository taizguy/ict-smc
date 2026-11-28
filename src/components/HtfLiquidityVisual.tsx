import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Calculator,
  GitCompare,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Users,
} from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { computeHtfRangeMetrics, htfPresets } from '../utils/htfLiquidityMath';
import { HtfLiquidityScene } from './HtfLiquidityScene';

export type HtfLiquidityVisualKind =
  | 'hlm-comic-intro'
  | 'hlm-3d-atlas'
  | 'hlm-hierarchy-atlas'
  | 'hlm-irl-erl-cycle'
  | 'hlm-sequence-simulator'
  | 'hlm-target-calculator'
  | 'hlm-mistakes-comic';

const tierData = [
  {
    id: 'pmh',
    name: 'Tier 1: PMH / PML (Monthly)',
    weight: 100,
    y: 44,
    color: '#6366f1',
    stops: 'Multi-month swing stops & macro fund rebalancing',
    invalidation: 'Monthly or Weekly candle close decisively beyond PMH/PML',
  },
  {
    id: 'pwh',
    name: 'Tier 2: PWH / PWL (Weekly)',
    weight: 85,
    y: 72,
    color: '#0284c7',
    stops: 'Multi-day swing stops & weekly expansion targets',
    invalidation: '4H or Daily close holding beyond swept PWH/PWL',
  },
  {
    id: 'pdh',
    name: 'Tier 3: PDH / PDL (Daily)',
    weight: 70,
    y: 102,
    color: '#d97706',
    stops: 'Intraday overnight stops & London/NY breakout entries',
    invalidation: '15M or 1H body close holding beyond PDH/PDL',
  },
  {
    id: 'h4',
    name: 'Tier 4: 4H Swing High / Low',
    weight: 55,
    y: 132,
    color: '#059669',
    stops: 'Dealing-range structural stops & IRL/ERL pivots',
    invalidation: '1H candle close beyond the 4H dealing-range extreme',
  },
  {
    id: 'eqh',
    name: 'Tier 5: EQH / EQL Clusters',
    weight: 75,
    y: 158,
    color: '#e11d48',
    stops: 'Dense retail double-top / double-bottom protective stops',
    invalidation: 'Clean displacement closing through the equal cluster',
  },
  {
    id: 'sess',
    name: 'Tier 6: Session Extremes (Asia/LDN)',
    weight: 38,
    y: 186,
    color: '#64748b',
    stops: 'Short-term intraday stops swept before NY expansion',
    invalidation: '5M/15M structure shift failing to displace away',
  },
];

const sequenceModes = {
  sweep: {
    label: 'Sweep + MSS Reversal',
    steps: [
      { title: '1. Approach PDL', note: 'Price drifts down toward Previous Day Low (SSL).' },
      { title: '2. Wick Sweep', note: 'Sharp wick pierces PDL, triggering sell-stops, then snaps back.' },
      { title: '3. 5M MSS + FVG', note: 'Displacement breaks prior 5M high, leaving a bullish FVG.' },
      { title: '4. Draw to PWH', note: 'Price expands from Discount IRL toward PWH (BSL).' },
    ],
    points: [
      [80, 120],
      [190, 155],
      [310, 206],
      [420, 130],
      [540, 82],
      [650, 48],
    ],
  },
  lrlr: {
    label: 'LRLR Continuation',
    steps: [
      [80, 185],
      [195, 148],
      [315, 114],
      [430, 86],
      [545, 58],
      [655, 36],
    ].map((_, idx) => ({
      title: ['1. Discount Launch', '2. Clean FVG Step', '3. PDH Cleared', '4. PWH Magnet'][idx] || '4. PWH Magnet',
      note: [
        'Price leaves 4H Discount FVG with strong bullish bodies.',
        'Minimal opposing swings allow rapid displacement.',
        'PDH is breached with body closes—no reversal.',
        'Unobstructed path drives straight into PWH.',
      ][idx] || 'Unobstructed path drives straight into PWH.',
    })),
    points: [
      [80, 185],
      [195, 148],
      [315, 114],
      [430, 86],
      [545, 58],
      [655, 36],
    ],
  },
  hrlr: {
    label: 'HRLR / Mid-Range Chop',
    steps: [
      { title: '1. Stuck at 50%', note: 'Price sits inside 45%–55% Equilibrium.' },
      { title: '2. Overlapping Wicks', note: 'Multiple prior swing highs/lows block momentum.' },
      { title: '3. False Breakouts', note: 'Both sides get wicked without HTF expansion.' },
      { title: '4. Patience Gate', note: 'Wait for a clean ERL sweep or Killzone displacement.' },
    ],
    points: [
      [80, 124],
      [190, 108],
      [310, 136],
      [425, 110],
      [540, 134],
      [650, 118],
    ],
  },
};

export function HtfLiquidityVisual({
  kind,
  staticOnly = false,
}: {
  kind: HtfLiquidityVisualKind;
  staticOnly?: boolean;
}) {
  const { t } = useTranslation();
  const [selectedTierId, setSelectedTierId] = useState<string>('pwh');
  const [dolDirection, setDolDirection] = useState<'bullish' | 'bearish'>('bullish');
  const [seqMode, setSeqMode] = useState<'sweep' | 'lrlr' | 'hrlr'>('sweep');
  const [seqStep, setSeqStep] = useState<number>(3);
  const [seqPlaying, setSeqPlaying] = useState<boolean>(false);
  const [presetId, setPresetId] = useState<string>(htfPresets[0].id);
  const [customHigh, setCustomHigh] = useState<number>(htfPresets[0].input.rangeHigh);
  const [customLow, setCustomLow] = useState<number>(htfPresets[0].input.rangeLow);
  const [customPrice, setCustomPrice] = useState<number>(htfPresets[0].input.currentPrice);
  const [customInvalidation, setCustomInvalidation] = useState<number>(htfPresets[0].input.invalidationPrice);

  useEffect(() => {
    if (!seqPlaying || staticOnly) return;
    const timer = window.setInterval(() => {
      setSeqStep((prev) => (prev + 1) % 4);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [seqPlaying, staticOnly]);

  if (kind === 'hlm-3d-atlas') {
    return <HtfLiquidityScene staticOnly={staticOnly} />;
  }

  if (kind === 'hlm-comic-intro') {
    return (
      <figure className="hlm-figure" data-hlm-figure="hlm-comic-intro">
        <div className="hlm-figure-head">
          <span className="hlm-head-title">
            <Users size={16} aria-hidden="true" />
            <span>{t('Visual Story: Why 1-Minute Traders Get Swept Without an HTF Map')}</span>
          </span>
        </div>
        <svg
          viewBox="0 0 760 245"
          className="hlm-svg"
          role="img"
          aria-label={t('Visual Story: Why 1-Minute Traders Get Swept Without an HTF Map')}
        >
          <rect x="12" y="12" width="358" height="220" rx="10" fill="var(--rr-paper)" stroke="var(--hlm-border)" />
          <rect x="390" y="12" width="358" height="220" rx="10" fill="var(--rr-paper)" stroke="var(--hlm-border)" />

          <text x="28" y="36" fontSize="12.5" fontWeight="700" fill="var(--hlm-crimson)">
            {t('Blindfolded 1M Trader (No HTF Map)')}
          </text>
          <text x="406" y="36" fontSize="12.5" fontWeight="700" fill="var(--hlm-emerald)">
            {t('HTF Cartographer (PWH / PDL Mapped)')}
          </text>

          {/* Left panel: Stick figure staring at 1M screen, getting swept at unmapped PDL */}
          <circle cx="82" cy="112" r="14" fill="none" stroke="var(--hlm-ink)" strokeWidth="2.5" />
          <line x1="71" y1="108" x2="93" y2="108" stroke="var(--hlm-crimson)" strokeWidth="4" />
          <line x1="82" y1="126" x2="82" y2="174" stroke="var(--hlm-ink)" strokeWidth="2.5" />
          <line x1="82" y1="142" x2="112" y2="132" stroke="var(--hlm-ink)" strokeWidth="2.5" />
          <line x1="82" y1="174" x2="66" y2="208" stroke="var(--hlm-ink)" strokeWidth="2.5" />
          <line x1="82" y1="174" x2="98" y2="208" stroke="var(--hlm-ink)" strokeWidth="2.5" />

          <rect x="32" y="54" width="215" height="34" rx="7" fill="var(--hlm-surface)" stroke="var(--hlm-border)" />
          <text x="42" y="75" fontSize="11" fill="var(--hlm-ink)">
            {t('"Clean 1M support! Buying right here!"')}
          </text>

          <line x1="150" y1="146" x2="348" y2="146" stroke="var(--hlm-crimson)" strokeWidth="2" strokeDasharray="5 4" />
          <text x="236" y="139" fontSize="10.5" fontWeight="700" fill="var(--hlm-crimson)">PDL (Unmapped SSL)</text>
          <path d="M160 120 L210 144 L255 182 L305 126" fill="none" stroke="var(--hlm-crimson)" strokeWidth="2.5" />
          <circle cx="255" cy="182" r="5" fill="var(--hlm-crimson)" />
          <text x="155" y="212" fontSize="11" fontWeight="600" fill="var(--hlm-crimson)">
            {t('Swept right at unmapped PDL!')}
          </text>

          {/* Right panel: Stick figure holding folded HTF map, waiting for sweep + MSS */}
          <circle cx="460" cy="112" r="14" fill="none" stroke="var(--hlm-ink)" strokeWidth="2.5" />
          <circle cx="456" cy="109" r="1.8" fill="var(--hlm-ink)" />
          <circle cx="465" cy="109" r="1.8" fill="var(--hlm-ink)" />
          <path d="M455 117 Q460 122 466 117" fill="none" stroke="var(--hlm-ink)" strokeWidth="1.8" />
          <line x1="460" y1="126" x2="460" y2="174" stroke="var(--hlm-ink)" strokeWidth="2.5" />
          <line x1="460" y1="142" x2="488" y2="146" stroke="var(--hlm-ink)" strokeWidth="2.5" />
          <polygon points="484,134 504,130 504,154 484,158" fill="color-mix(in srgb, var(--hlm-accent) 22%, transparent)" stroke="var(--hlm-accent)" strokeWidth="1.5" />
          <line x1="460" y1="174" x2="444" y2="208" stroke="var(--hlm-ink)" strokeWidth="2.5" />
          <line x1="460" y1="174" x2="476" y2="208" stroke="var(--hlm-ink)" strokeWidth="2.5" />

          <rect x="410" y="54" width="215" height="34" rx="7" fill="var(--hlm-surface)" stroke="var(--hlm-border)" />
          <text x="420" y="75" fontSize="11" fill="var(--hlm-ink)">
            {t('"PDL swept + 5M MSS! Target PWH."')}
          </text>

          <line x1="530" y1="96" x2="730" y2="96" stroke="var(--hlm-indigo)" strokeWidth="2" strokeDasharray="5 4" />
          <text x="646" y="90" fontSize="10.5" fontWeight="700" fill="var(--hlm-indigo)">PWH (Target)</text>
          <line x1="530" y1="172" x2="730" y2="172" stroke="var(--hlm-amber)" strokeWidth="2" strokeDasharray="5 4" />
          <text x="650" y="186" fontSize="10.5" fontWeight="700" fill="var(--hlm-amber)">PDL (Swept)</text>
          <path d="M540 144 L590 184 L645 138 L715 98" fill="none" stroke="var(--hlm-emerald)" strokeWidth="2.5" />
          <circle cx="590" cy="184" r="5" fill="var(--hlm-amber)" />
          <circle cx="715" cy="98" r="5" fill="var(--hlm-emerald)" />
        </svg>
        <figcaption className="hlm-caption">
          <em>{t('Synthetic illustration — not live quotes.')}</em>
        </figcaption>
      </figure>
    );
  }

  if (kind === 'hlm-hierarchy-atlas') {
    const activeTier = tierData.find((item) => item.id === selectedTierId) || tierData[1];
    return (
      <figure className="hlm-figure" data-hlm-figure="hlm-hierarchy-atlas">
        <div className="hlm-figure-head">
          <span className="hlm-head-title">
            <Layers size={16} aria-hidden="true" />
            <span>{t('Interactive 6-Tier HTF Liquidity Hierarchy Explorer')}</span>
          </span>
          <span className="hlm-badge">{activeTier.weight}% Weight</span>
        </div>
        <div className="hlm-controls-row">
          {tierData.map((tier) => (
            <button
              key={tier.id}
              type="button"
              className={`hlm-btn ${tier.id === activeTier.id ? 'is-active' : ''}`}
              onClick={() => setSelectedTierId(tier.id)}
            >
              {tier.name.split(':')[0]}
            </button>
          ))}
        </div>
        <svg viewBox="0 0 720 220" className="hlm-svg" role="img" aria-label={t('Interactive 6-Tier HTF Liquidity Hierarchy Explorer')}>
          <rect x="12" y="12" width="696" height="196" rx="10" fill="var(--rr-paper)" stroke="var(--hlm-border)" />
          {tierData.map((tier) => {
            const isActive = tier.id === activeTier.id;
            return (
              <g key={tier.id}>
                <line
                  x1="36"
                  y1={tier.y}
                  x2="480"
                  y2={tier.y}
                  stroke={tier.color}
                  strokeWidth={isActive ? 3.5 : 1.5}
                  strokeDasharray={isActive ? undefined : '5 5'}
                  opacity={isActive ? 1 : 0.45}
                />
                <text
                  x="496"
                  y={tier.y + 4}
                  fontSize="11.5"
                  fontWeight={isActive ? 700 : 500}
                  fill={isActive ? tier.color : 'var(--hlm-muted)'}
                >
                  {tier.name}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="hlm-stat-grid">
          <div className="hlm-stat">
            <small>Selected Tier</small>
            <strong>{activeTier.name}</strong>
          </div>
          <div className="hlm-stat">
            <small>Resting Order Composition</small>
            <strong>{activeTier.stops}</strong>
          </div>
          <div className="hlm-stat">
            <small>Invalidation Rule</small>
            <strong>{activeTier.invalidation}</strong>
          </div>
        </div>
      </figure>
    );
  }

  if (kind === 'hlm-irl-erl-cycle') {
    const isBull = dolDirection === 'bullish';
    return (
      <figure className="hlm-figure" data-hlm-figure="hlm-irl-erl-cycle">
        <div className="hlm-figure-head">
          <span className="hlm-head-title">
            <GitCompare size={16} aria-hidden="true" />
            <span>{t('Interactive IRL ↔ ERL & Premium/Discount Mapper')}</span>
          </span>
          <span className="hlm-badge">{isBull ? 'Discount IRL → Premium ERL' : 'Premium IRL → Discount ERL'}</span>
        </div>
        <div className="hlm-controls-row">
          <button
            type="button"
            className={`hlm-btn ${isBull ? 'is-active' : ''}`}
            onClick={() => setDolDirection('bullish')}
          >
            {t('Bullish DOL (Discount → PWH)')}
          </button>
          <button
            type="button"
            className={`hlm-btn ${!isBull ? 'is-active' : ''}`}
            onClick={() => setDolDirection('bearish')}
          >
            {t('Bearish DOL (Premium → PDL)')}
          </button>
        </div>
        <svg viewBox="0 0 720 220" className="hlm-svg" role="img" aria-label={t('Interactive IRL ↔ ERL & Premium/Discount Mapper')}>
          <rect x="14" y="14" width="692" height="192" rx="10" fill="var(--rr-paper)" stroke="var(--hlm-border)" />
          <rect x="28" y="28" width="664" height="78" fill="color-mix(in srgb, var(--hlm-crimson) 8%, transparent)" />
          <rect x="28" y="106" width="664" height="86" fill="color-mix(in srgb, var(--hlm-emerald) 8%, transparent)" />
          <line x1="28" y1="106" x2="692" y2="106" stroke="var(--hlm-muted)" strokeWidth="1.5" strokeDasharray="5 4" />
          <text x="40" y="46" fontSize="11.5" fontWeight="700" fill="var(--hlm-crimson)">PREMIUM (&gt; 50%) — PWH / PDH (ERL BSL)</text>
          <text x="40" y="101" fontSize="11" fontWeight="600" fill="var(--hlm-muted)">50% Dealing Range Equilibrium</text>
          <text x="40" y="182" fontSize="11.5" fontWeight="700" fill="var(--hlm-emerald)">DISCOUNT (&lt; 50%) — PDL / PWL (ERL SSL)</text>

          {isBull ? (
            <>
              <rect x="250" y="132" width="130" height="26" rx="4" fill="color-mix(in srgb, var(--hlm-emerald) 24%, transparent)" stroke="var(--hlm-emerald)" />
              <text x="262" y="149" fontSize="10.5" fontWeight="700" fill="var(--hlm-emerald)">4H Discount FVG (IRL)</text>
              <path d="M85 160 L175 190 L285 144 L445 86 L615 44" fill="none" stroke="var(--hlm-emerald)" strokeWidth="3" />
              <circle cx="175" cy="190" r="5.5" fill="var(--hlm-amber)" />
              <circle cx="615" cy="44" r="5.5" fill="var(--hlm-emerald)" />
            </>
          ) : (
            <>
              <rect x="250" y="54" width="130" height="26" rx="4" fill="color-mix(in srgb, var(--hlm-crimson) 24%, transparent)" stroke="var(--hlm-crimson)" />
              <text x="262" y="71" fontSize="10.5" fontWeight="700" fill="var(--hlm-crimson)">4H Premium FVG (IRL)</text>
              <path d="M85 58 L175 28 L285 68 L445 128 L615 174" fill="none" stroke="var(--hlm-crimson)" strokeWidth="3" />
              <circle cx="175" cy="28" r="5.5" fill="var(--hlm-amber)" />
              <circle cx="615" cy="174" r="5.5" fill="var(--hlm-crimson)" />
            </>
          )}
        </svg>
        <figcaption className="hlm-caption">
          <em>{t('Synthetic illustration — not live quotes.')}</em>
        </figcaption>
      </figure>
    );
  }

  if (kind === 'hlm-sequence-simulator') {
    const active = sequenceModes[seqMode];
    const visibleCount = Math.min(active.points.length, seqStep + 3);
    const polyPoints = active.points
      .slice(0, visibleCount)
      .map((pt) => `${pt[0]},${pt[1]}`)
      .join(' ');
    const currentStepObj = active.steps[seqStep] || active.steps[0];

    return (
      <figure className="hlm-figure" data-hlm-figure="hlm-sequence-simulator">
        <div className="hlm-figure-head">
          <span className="hlm-head-title">
            <Activity size={16} aria-hidden="true" />
            <span>{t('Animated Sequence: Sweep Reversal vs. LRLR vs. HRLR')}</span>
          </span>
          <span className="hlm-badge">{currentStepObj.title}</span>
        </div>
        <div className="hlm-controls-row">
          {(Object.keys(sequenceModes) as Array<'sweep' | 'lrlr' | 'hrlr'>).map((m) => (
            <button
              key={m}
              type="button"
              className={`hlm-btn ${seqMode === m ? 'is-active' : ''}`}
              onClick={() => {
                setSeqMode(m);
                setSeqStep(3);
              }}
            >
              {sequenceModes[m].label}
            </button>
          ))}
          <button type="button" className="hlm-btn is-primary" onClick={() => setSeqPlaying((p) => !p)}>
            {seqPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{seqPlaying ? t('Pause') : t('Play')}</span>
          </button>
          <button
            type="button"
            className="hlm-btn"
            onClick={() => {
              setSeqPlaying(false);
              setSeqStep(0);
            }}
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>{t('Reset')}</span>
          </button>
        </div>
        <svg viewBox="0 0 720 230" className="hlm-svg" role="img" aria-label={t('Animated Sequence: Sweep Reversal vs. LRLR vs. HRLR')}>
          <rect x="14" y="14" width="692" height="202" rx="10" fill="var(--rr-paper)" stroke="var(--hlm-border)" />
          <line x1="36" y1="44" x2="684" y2="44" stroke="var(--hlm-indigo)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="44" y="38" fontSize="11" fontWeight="700" fill="var(--hlm-indigo)">PWH (BSL Target)</text>
          <line x1="36" y1="120" x2="684" y2="120" stroke="var(--hlm-muted)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="36" y1="192" x2="684" y2="192" stroke="var(--hlm-crimson)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="44" y="207" fontSize="11" fontWeight="700" fill="var(--hlm-crimson)">PDL (SSL Reference)</text>

          <polyline fill="none" stroke="var(--hlm-accent)" strokeWidth="3.2" points={polyPoints} />
          {active.points.slice(0, visibleCount).map((pt, i) => (
            <circle
              key={i}
              cx={pt[0]}
              cy={pt[1]}
              r={i === visibleCount - 1 ? 6.5 : 4}
              fill={i === visibleCount - 1 ? 'var(--hlm-amber)' : 'var(--hlm-accent)'}
            />
          ))}
        </svg>
        <figcaption className="hlm-caption">
          <strong>{currentStepObj.title}:</strong> {currentStepObj.note} — <em>{t('Synthetic illustration — not live quotes.')}</em>
        </figcaption>
      </figure>
    );
  }

  if (kind === 'hlm-target-calculator') {
    const preset = htfPresets.find((p) => p.id === presetId) || htfPresets[0];
    const metrics = computeHtfRangeMetrics({
      rangeHigh: customHigh,
      rangeLow: customLow,
      currentPrice: customPrice,
      tickSize: preset.input.tickSize,
      tickValue: preset.input.tickValue,
      targetPrice: customPrice < (customHigh + customLow) / 2 ? customHigh : customLow,
      invalidationPrice: customInvalidation,
    });
    const decimals = preset.input.tickSize < 0.01 ? 4 : 2;

    return (
      <figure className="hlm-figure" data-hlm-figure="hlm-target-calculator">
        <div className="hlm-figure-head">
          <span className="hlm-head-title">
            <Calculator size={16} aria-hidden="true" />
            <span>{t('Interactive HTF Target, Equilibrium & Tick/Pip Calculator')}</span>
          </span>
          <span className="hlm-badge">{metrics.zone} ({metrics.pctInRange.toFixed(1)}%)</span>
        </div>
        <div className="hlm-controls-row">
          {htfPresets.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`hlm-btn ${item.id === preset.id ? 'is-active' : ''}`}
              onClick={() => {
                setPresetId(item.id);
                setCustomHigh(item.input.rangeHigh);
                setCustomLow(item.input.rangeLow);
                setCustomPrice(item.input.currentPrice);
                setCustomInvalidation(item.input.invalidationPrice);
              }}
            >
              {item.symbol}
            </button>
          ))}
        </div>
        <div className="hlm-calc-grid">
          <label className="hlm-calc-field">
            <span>HTF Range High</span>
            <input type="number" step={preset.input.tickSize} value={customHigh} onChange={(e) => setCustomHigh(Number(e.target.value) || 0)} />
          </label>
          <label className="hlm-calc-field">
            <span>HTF Range Low</span>
            <input type="number" step={preset.input.tickSize} value={customLow} onChange={(e) => setCustomLow(Number(e.target.value) || 0)} />
          </label>
          <label className="hlm-calc-field">
            <span>Current Price</span>
            <input type="number" step={preset.input.tickSize} value={customPrice} onChange={(e) => setCustomPrice(Number(e.target.value) || 0)} />
          </label>
          <label className="hlm-calc-field">
            <span>Close Invalidation</span>
            <input type="number" step={preset.input.tickSize} value={customInvalidation} onChange={(e) => setCustomInvalidation(Number(e.target.value) || 0)} />
          </label>
        </div>
        <div className="hlm-stat-grid">
          <div className="hlm-stat">
            <small>50% Equilibrium</small>
            <strong>{metrics.equilibrium.toFixed(decimals)}</strong>
          </div>
          <div className="hlm-stat">
            <small>Range Zone</small>
            <strong>{metrics.zone}</strong>
          </div>
          <div className="hlm-stat">
            <small>Target Distance</small>
            <strong>{metrics.targetTicks} ticks/pips</strong>
          </div>
          <div className="hlm-stat">
            <small>Risk Distance</small>
            <strong>{metrics.riskTicks} ticks/pips ({metrics.rewardToRisk.toFixed(2)}R)</strong>
          </div>
        </div>
        <figcaption className="hlm-caption">
          <em>{t('Synthetic illustration — not live quotes.')}</em>
        </figcaption>
      </figure>
    );
  }

  // hlm-mistakes-comic
  return (
    <figure className="hlm-figure" data-hlm-figure="hlm-mistakes-comic">
      <div className="hlm-figure-head">
        <span className="hlm-head-title">
          <AlertTriangle size={16} aria-hidden="true" />
          <span>{t('Stick-Figure Mistakes: 3 HTF Liquidity Mapping Traps')}</span>
        </span>
      </div>
      <svg viewBox="0 0 760 220" className="hlm-svg" role="img" aria-label={t('Stick-Figure Mistakes: 3 HTF Liquidity Mapping Traps')}>
        <rect x="10" y="12" width="236" height="196" rx="10" fill="var(--rr-paper)" stroke="var(--hlm-border)" />
        <rect x="262" y="12" width="236" height="196" rx="10" fill="var(--rr-paper)" stroke="var(--hlm-border)" />
        <rect x="514" y="12" width="236" height="196" rx="10" fill="var(--rr-paper)" stroke="var(--hlm-border)" />

        <text x="24" y="36" fontSize="11.5" fontWeight="700" fill="var(--hlm-crimson)">{t('Trap 1: Fading an LRLR')}</text>
        <circle cx="58" cy="110" r="12" fill="none" stroke="var(--hlm-ink)" strokeWidth="2.2" />
        <line x1="58" y1="122" x2="58" y2="160" stroke="var(--hlm-ink)" strokeWidth="2.2" />
        <line x1="58" y1="134" x2="80" y2="124" stroke="var(--hlm-ink)" strokeWidth="2.2" />
        <line x1="58" y1="160" x2="46" y2="188" stroke="var(--hlm-ink)" strokeWidth="2.2" />
        <line x1="58" y1="160" x2="70" y2="188" stroke="var(--hlm-ink)" strokeWidth="2.2" />
        <path d="M104 166 L146 126 L186 88 L224 52" fill="none" stroke="var(--hlm-emerald)" strokeWidth="3" />
        <text x="102" y="188" fontSize="10.5" fill="var(--hlm-muted)">Shorting strong LRLR</text>

        <text x="276" y="36" fontSize="11.5" fontWeight="700" fill="var(--hlm-amber)">{t('Trap 2: Ignoring Stacked PWH+PDH')}</text>
        <line x1="278" y1="74" x2="482" y2="74" stroke="var(--hlm-indigo)" strokeWidth="2.5" />
        <line x1="278" y1="81" x2="482" y2="81" stroke="var(--hlm-amber)" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M292 150 L360 70 L446 158" fill="none" stroke="var(--hlm-crimson)" strokeWidth="2.8" />
        <text x="278" y="188" fontSize="10.5" fill="var(--hlm-muted)">Buying right into stacked BSL</text>

        <text x="528" y="36" fontSize="11.5" fontWeight="700" fill="var(--hlm-accent)">{t('Trap 3: Mid-Range 50% Chop')}</text>
        <line x1="530" y1="112" x2="734" y2="112" stroke="var(--hlm-muted)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M540 100 L575 128 L610 96 L645 130 L680 98 L715 124" fill="none" stroke="var(--hlm-amber)" strokeWidth="2.5" />
        <text x="530" y="188" fontSize="10.5" fill="var(--hlm-muted)">Overtrading 45%–55% range</text>
      </svg>
      <figcaption className="hlm-caption">
        <em>{t('Synthetic illustration — not live quotes.')}</em>
      </figcaption>
    </figure>
  );
}
