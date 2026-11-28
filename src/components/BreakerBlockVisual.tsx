import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  Gauge,
  AlertTriangle,
  Network,
} from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { BreakerBlockScene } from './BreakerBlockScene';
import { BreakerBlockExtendedVisual } from './BreakerBlockExtendedVisuals';
import {
  computeBreakerZoneMetrics,
  computeUnicornOverlap,
  evaluateBreakerConfluence,
  MTF_FRACTAL_PROFILES,
  type BreakerGateInput,
} from '../utils/breakerBlockMath';

interface BreakerBlockVisualProps {
  visualId: string;
  staticOnly?: boolean;
}

const ComicPolarityVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [panel, setPanel] = useState<number>(0);
  const panels = [
    {
      title: 'Panel 1 · The Glass Floor (Order Block)',
      subtitle: 'Breakout traders stand on Point B expecting support to hold forever while price runs past Point A.',
      badge: 'Stage A -> B -> C',
    },
    {
      title: 'Panel 2 · The Floor Cracks (Body-Close MSS)',
      subtitle: 'Price reverses sharply from the sweep at C and closes cleanly below Point B—cracking the old floor.',
      badge: 'Stage D · Displacement',
    },
    {
      title: 'Panel 3 · Floor Becomes Ceiling (Breaker Retest)',
      subtitle: 'When price climbs back up toward Point B, the exact same shattered glass pane now acts as an overhead ceiling.',
      badge: 'Stage E · Polarity Flip',
    },
  ];
  const active = panels[panel];

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">{t('Illustrated Mental Model · Stick-Figure Story')}</p>
        <h3>{t('The Trapped Breakout & The Floor-to-Ceiling Flip')}</h3>
      </div>

      <div className="bb-pill-row" role="tablist" aria-label={t('Comic panels')}>
        {panels.map((p, idx) => (
          <button
            key={p.title}
            type="button"
            role="tab"
            aria-selected={panel === idx}
            className={`bb-tab-btn${panel === idx ? ' is-active' : ''}`}
            onClick={() => setPanel(idx)}
          >
            {idx + 1}. {t(p.badge)}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 680 210" className="bb-comic-svg" role="img" aria-label={t(active.title)}>
        <rect x="0" y="0" width="680" height="210" rx="10" fill="var(--bb-stage-bg)" />

        {/* Panel 1 box */}
        <g opacity={panel === 0 ? 1 : 0.48}>
          <rect x="16" y="16" width="204" height="178" rx="8" fill="var(--bb-surface)" stroke={panel === 0 ? 'var(--bb-cobalt)' : 'var(--bb-border)'} strokeWidth={panel === 0 ? 2 : 1} />
          <text x="28" y="36" className="bb-comic-head">{t('1. Old Support (B)')}</text>
          <rect x="34" y="114" width="168" height="14" rx="3" fill="var(--bb-cobalt-soft)" stroke="var(--bb-cobalt)" strokeWidth="1.5" />
          {/* Stick figure standing happily on floor */}
          <circle cx="94" cy="70" r="10" fill="none" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="94" y1="80" x2="94" y2="100" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="94" y1="86" x2="78" y2="94" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="94" y1="86" x2="112" y2="76" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="94" y1="100" x2="84" y2="114" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="94" y1="100" x2="104" y2="114" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <path d="M132 110 L160 66 L186 52" fill="none" stroke="var(--bb-emerald)" strokeWidth="2.4" />
          <text x="162" y="48" className="bb-svg-tag-emerald">{t('Sweep C!')}</text>
          <text x="28" y="156" className="bb-comic-note">{t('Buyers celebrate above A.')}</text>
          <text x="28" y="172" className="bb-comic-note">{t('Point B looks solid.')}</text>
        </g>

        {/* Panel 2 box */}
        <g opacity={panel === 1 ? 1 : 0.48}>
          <rect x="238" y="16" width="204" height="178" rx="8" fill="var(--bb-surface)" stroke={panel === 1 ? 'var(--bb-rose)' : 'var(--bb-border)'} strokeWidth={panel === 1 ? 2 : 1} />
          <text x="250" y="36" className="bb-comic-head">{t('2. Floor Breaks (D)')}</text>
          <rect x="256" y="88" width="70" height="12" rx="3" fill="var(--bb-rose-soft)" stroke="var(--bb-rose)" strokeWidth="1.5" />
          <rect x="352" y="88" width="70" height="12" rx="3" fill="var(--bb-rose-soft)" stroke="var(--bb-rose)" strokeWidth="1.5" />
          <path d="M332 62 L340 132" stroke="var(--bb-rose)" strokeWidth="3" strokeDasharray="4 2" />
          {/* Surprised stick figure falling through */}
          <circle cx="340" cy="112" r="9" fill="none" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="340" y1="121" x2="340" y2="138" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="340" y1="126" x2="324" y2="116" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="340" y1="126" x2="356" y2="116" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="340" y1="138" x2="331" y2="152" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="340" y1="138" x2="349" y2="152" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <text x="250" y="172" className="bb-comic-note">{t('Body closes decisively below B.')}</text>
        </g>

        {/* Panel 3 box */}
        <g opacity={panel === 2 ? 1 : 0.48}>
          <rect x="460" y="16" width="204" height="178" rx="8" fill="var(--bb-surface)" stroke={panel === 2 ? 'var(--bb-amber)' : 'var(--bb-border)'} strokeWidth={panel === 2 ? 2 : 1} />
          <text x="472" y="36" className="bb-comic-head">{t('3. New Ceiling (E)')}</text>
          <rect x="478" y="76" width="168" height="16" rx="3" fill="var(--bb-amber-soft)" stroke="var(--bb-amber)" strokeWidth="1.6" />
          <text x="562" y="88" textAnchor="middle" className="bb-svg-tag-amber">{t('Bearish Breaker')}</text>
          {/* Stick figure bumping head on ceiling */}
          <circle cx="546" cy="108" r="9" fill="none" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="546" y1="117" x2="546" y2="136" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="546" y1="122" x2="532" y2="110" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="546" y1="122" x2="560" y2="110" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="546" y1="136" x2="537" y2="150" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <line x1="546" y1="136" x2="555" y2="150" stroke="var(--bb-ink)" strokeWidth="2.2" />
          <path d="M582 142 L606 96 L638 148" fill="none" stroke="var(--bb-rose)" strokeWidth="2.4" />
          <text x="472" y="172" className="bb-comic-note">{t('Old floor now resists from above.')}</text>
        </g>
      </svg>

      <figcaption className="bb-visual-caption">
        <strong>{t(active.title)}:</strong> {t(active.subtitle)}
      </figcaption>
    </figure>
  );
};

const AbcdMirrorStepper: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [dir, setDir] = useState<'bullish' | 'bearish'>('bullish');
  const [stage, setStage] = useState<number>(3);

  const metrics = useMemo(() => {
    if (dir === 'bullish') {
      return computeBreakerZoneMetrics(
        [{ open: 106.5, high: 110, low: 106, close: 109.5 }],
        'bullish',
      );
    }
    return computeBreakerZoneMetrics(
      [{ open: 103.5, high: 104, low: 100, close: 100.8 }],
      'bearish',
    );
  }, [dir]);

  const points =
    dir === 'bullish'
      ? [
          { x: 64, y: 158, tag: 'A (100)', note: 'Initial Swing Low' },
          { x: 184, y: 74, tag: 'B (110)', note: 'Up-Close Origin (106–110)' },
          { x: 312, y: 182, tag: 'C (98)', note: 'Sweep Below A' },
          { x: 454, y: 42, tag: 'D (112)', note: 'Body Close > B (MSS)' },
          { x: 562, y: 92, tag: 'E (108)', note: 'Retest from Above' },
          { x: 636, y: 26, tag: 'Target', note: 'Expansion' },
        ]
      : [
          { x: 64, y: 58, tag: 'A (110)', note: 'Initial Swing High' },
          { x: 184, y: 142, tag: 'B (100)', note: 'Down-Close Origin (100–104)' },
          { x: 312, y: 34, tag: 'C (112)', note: 'Sweep Above A' },
          { x: 454, y: 174, tag: 'D (98)', note: 'Body Close < B (MSS)' },
          { x: 562, y: 124, tag: 'E (102)', note: 'Retest from Below' },
          { x: 636, y: 192, tag: 'Target', note: 'Expansion' },
        ];

  const visibleCount = Math.min(points.length, stage + 3);
  const polyline = points
    .slice(0, visibleCount)
    .map((p) => `${p.x},${p.y}`)
    .join(' ');
  const zoneY = dir === 'bullish' ? 74 : 114;

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">{t('Interactive Mirror Lab · Chronological A–B–C–D')}</p>
        <h3>{t('Bullish vs. Bearish Breaker Geometry Stepper')}</h3>
      </div>

      <div className="bb-toolbar-split">
        <div className="bb-pill-row">
          <button
            type="button"
            className={`bb-tab-btn${dir === 'bullish' ? ' is-active' : ''}`}
            onClick={() => setDir('bullish')}
          >
            <ArrowUpRight size={14} /> {t('Bullish Breaker')}
          </button>
          <button
            type="button"
            className={`bb-tab-btn${dir === 'bearish' ? ' is-active' : ''}`}
            onClick={() => setDir('bearish')}
          >
            <ArrowDownRight size={14} /> {t('Bearish Breaker')}
          </button>
        </div>

        <div className="bb-pill-row">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              type="button"
              className={`bb-tab-btn bb-num${stage === idx ? ' is-active' : ''}`}
              onClick={() => setStage(idx)}
            >
              {t('Step')} {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 680 218" className="bb-svg-stage" role="img" aria-label={t('Bullish and Bearish Breaker sequence')}>
        <rect x="0" y="0" width="680" height="218" rx="8" fill="var(--bb-stage-bg)" />
        <rect
          x="160"
          y={zoneY}
          width="486"
          height="28"
          fill={dir === 'bullish' ? 'var(--bb-cobalt-soft)' : 'var(--bb-rose-soft)'}
          stroke={dir === 'bullish' ? 'var(--bb-cobalt)' : 'var(--bb-rose)'}
          strokeWidth="1.4"
        />
        <line x1="160" y1={zoneY + 14} x2="646" y2={zoneY + 14} stroke="var(--bb-amber)" strokeDasharray="5 4" strokeWidth="1.2" />
        <line
          x1="46"
          y1={points[0].y}
          x2="356"
          y2={points[0].y}
          stroke="var(--bb-emerald)"
          strokeDasharray="4 3"
          strokeWidth="1.2"
        />
        <polyline
          points={polyline}
          fill="none"
          stroke={dir === 'bullish' ? 'var(--bb-cobalt)' : 'var(--bb-rose)'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.slice(0, visibleCount).map((p) => (
          <g key={p.tag}>
            <circle cx={p.x} cy={p.y} r="5.5" fill="var(--bb-surface)" stroke={dir === 'bullish' ? 'var(--bb-cobalt)' : 'var(--bb-rose)'} strokeWidth="2.5" />
            <text x={p.x} y={p.y - 11} textAnchor="middle" className="bb-svg-tag">
              {t(p.tag)}
            </text>
          </g>
        ))}
      </svg>

      <div className="bb-metric-grid bb-num">
        <div className="bb-metric-cell">
          <span>{t('Opening Price')}</span>
          <strong>{metrics.openingPrice.toFixed(2)}</strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('Body Range')}</span>
          <strong>
            {metrics.bodyLow.toFixed(1)}–{metrics.bodyHigh.toFixed(1)}
          </strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('Full Range')}</span>
          <strong>
            {metrics.fullLow.toFixed(1)}–{metrics.fullHigh.toFixed(1)}
          </strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('50% Mean Threshold')}</span>
          <strong>{metrics.fullMidpoint.toFixed(2)}</strong>
        </div>
      </div>

      <figcaption className="bb-visual-caption">
        {dir === 'bullish'
          ? t('Bullish mirror: sweep below Low A (100) to C (98), body close above High B (110) at D (112), then retest 106–110 from above.')
          : t('Bearish mirror: sweep above High A (110) to C (112), body close below Low B (100) at D (98), then retest 100–104 from below.')}
      </figcaption>
    </figure>
  );
};

const WickVsBodyLab: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [selectionMode, setSelectionMode] = useState<'single' | 'run'>('run');
  const [breakMode, setBreakMode] = useState<'body' | 'wick'>('body');

  const zone = useMemo(() => {
    const candles =
      selectionMode === 'single'
        ? [{ open: 107.6, high: 110.0, low: 107.2, close: 109.6 }]
        : [
            { open: 105.2, high: 107.8, low: 104.8, close: 107.6 },
            { open: 107.6, high: 110.0, low: 107.2, close: 109.6 },
          ];
    return computeBreakerZoneMetrics(candles, 'bullish');
  }, [selectionMode]);

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">{t('Interactive Boundary & Confirmation Lab')}</p>
        <h3>{t('Single Candle vs. Consecutive Run & Wick vs. Body Close')}</h3>
      </div>

      <div className="bb-toolbar-split">
        <div className="bb-pill-row">
          <button
            type="button"
            className={`bb-tab-btn${selectionMode === 'run' ? ' is-active' : ''}`}
            onClick={() => setSelectionMode('run')}
          >
            {t('Consecutive 2-Candle Run')}
          </button>
          <button
            type="button"
            className={`bb-tab-btn${selectionMode === 'single' ? ' is-active' : ''}`}
            onClick={() => setSelectionMode('single')}
          >
            {t('Single Last Candle')}
          </button>
        </div>
        <div className="bb-pill-row">
          <button
            type="button"
            className={`bb-tab-btn${breakMode === 'body' ? ' is-active' : ''}`}
            onClick={() => setBreakMode('body')}
          >
            <CheckCircle2 size={14} /> {t('Body-Close MSS')}
          </button>
          <button
            type="button"
            className={`bb-tab-btn${breakMode === 'wick' ? ' is-active' : ''}`}
            onClick={() => setBreakMode('wick')}
          >
            <XCircle size={14} /> {t('Wick-Only Probe')}
          </button>
        </div>
      </div>

      <svg viewBox="0 0 680 198" className="bb-svg-stage" role="img" aria-label={t('Candle run and wick versus body close comparison')}>
        <rect x="0" y="0" width="680" height="198" rx="8" fill="var(--bb-stage-bg)" />

        {/* Left: Candle selection box */}
        <text x="24" y="26" className="bb-comic-head">{t('A. Origin Candle Selection at B')}</text>
        <rect
          x={selectionMode === 'run' ? 66 : 126}
          y="46"
          width={selectionMode === 'run' ? 116 : 56}
          height={selectionMode === 'run' ? 112 : 66}
          fill="var(--bb-cobalt-soft)"
          stroke="var(--bb-cobalt)"
          strokeWidth="1.6"
          rx="4"
        />
        {/* Candle 1 of run */}
        <line x1="94" y1="96" x2="94" y2="156" stroke="var(--bb-wick)" strokeWidth="2" />
        <rect x="82" y="102" width="24" height="48" fill="var(--bb-cobalt)" rx="2" />
        <text x="94" y="174" textAnchor="middle" className="bb-svg-axis">B1</text>

        {/* Candle 2 of run */}
        <line x1="154" y1="48" x2="154" y2="112" stroke="var(--bb-wick)" strokeWidth="2" />
        <rect x="142" y="54" width="24" height="48" fill="var(--bb-amber)" rx="2" />
        <text x="154" y="174" textAnchor="middle" className="bb-svg-axis">B2</text>

        <text x="202" y="68" className="bb-svg-tag">{t('Open')}: {zone.openingPrice.toFixed(1)}</text>
        <text x="202" y="92" className="bb-svg-tag">{t('Body')}: {zone.bodyLow.toFixed(1)}–{zone.bodyHigh.toFixed(1)}</text>
        <text x="202" y="116" className="bb-svg-tag-amber">{t('50% MT')}: {zone.bodyMidpoint.toFixed(2)}</text>

        {/* Divider */}
        <line x1="350" y1="20" x2="350" y2="180" stroke="var(--bb-border)" strokeDasharray="4 4" />

        {/* Right: Break confirmation */}
        <text x="372" y="26" className="bb-comic-head">{t('B. Point B Break Verdict (110.0)')}</text>
        <line x1="376" y1="84" x2="652" y2="84" stroke="var(--bb-cobalt)" strokeDasharray="5 3" strokeWidth="1.5" />
        <text x="650" y="78" textAnchor="end" className="bb-svg-tag">{t('Point B High (110.0)')}</text>

        {breakMode === 'body' ? (
          <g>
            <line x1="468" y1="42" x2="468" y2="144" stroke="var(--bb-wick)" strokeWidth="2" />
            <rect x="454" y="52" width="28" height="82" fill="var(--bb-emerald)" rx="3" />
            <text x="504" y="68" className="bb-svg-tag-emerald">{t('Close 112.0 > 110.0')}</text>
            <text x="504" y="106" className="bb-comic-note">{t('Confirmed MSS — Breaker Active')}</text>
          </g>
        ) : (
          <g>
            <line x1="468" y1="48" x2="468" y2="146" stroke="var(--bb-rose)" strokeWidth="2.4" />
            <rect x="454" y="96" width="28" height="42" fill="var(--bb-rose)" rx="3" />
            <text x="504" y="68" className="bb-svg-tag-rose">{t('Wick 111.2 / Close 109.1')}</text>
            <text x="504" y="106" className="bb-comic-note">{t('Rejected — Still Unconfirmed')}</text>
          </g>
        )}
      </svg>

      <figcaption className="bb-visual-caption">
        {breakMode === 'body'
          ? t('Valid confirmation: a completed body close above Point B activates the saved origin block without changing boundaries in hindsight.')
          : t('Invalid wick probe: price briefly poked above 110.0 but closed back inside at 109.1—no polarity flip has been confirmed yet.')}
      </figcaption>
    </figure>
  );
};

const TaxonomyMatrixVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [selected, setSelected] = useState<'ob' | 'bb' | 'mb' | 'pb'>('bb');
  const cards = [
    {
      id: 'ob' as const,
      name: 'Order Block (OB)',
      tag: 'Unbroken Continuation',
      sweep: 'Optional',
      brokeB: 'No — Holds',
      path: 'M14 78 L46 68 L74 22 L106 54 L138 14',
      zone: { x: 26, y: 54, w: 112, h: 18 },
      detail: 'Price leaves an origin candle, pulls back into the original side without breaking it, and continues in the same trend.',
    },
    {
      id: 'bb' as const,
      name: 'Breaker Block (BB)',
      tag: 'Sweep + Polarity Flip',
      sweep: 'Yes (C > A)',
      brokeB: 'Yes — Body Close',
      path: 'M14 58 L46 28 L72 78 L108 16 L138 42',
      zone: { x: 26, y: 24, w: 112, h: 18 },
      detail: 'Price sweeps past Point A (C), reverses sharply to close beyond Point B, and flips Point B to opposite-side support/resistance.',
    },
    {
      id: 'mb' as const,
      name: 'Mitigation Block (MB)',
      tag: 'Failure Swing (No Sweep)',
      sweep: 'No (C < A)',
      brokeB: 'Yes — Body Close',
      path: 'M14 76 L46 28 L72 58 L108 16 L138 42',
      zone: { x: 26, y: 24, w: 112, h: 18 },
      detail: 'Price fails to sweep Point A (forming a higher low / lower high failure swing) before breaking Point B and retesting from the new side.',
    },
    {
      id: 'pb' as const,
      name: 'Propulsion Block (PB)',
      tag: 'Nested Accelerator',
      sweep: 'No — Inside OB',
      brokeB: 'No — Accelerates',
      path: 'M14 82 L44 64 L66 72 L96 34 L112 52 L140 12',
      zone: { x: 54, y: 56, w: 84, h: 16 },
      detail: 'A secondary candle dips into an established parent Order Block and triggers an even faster continuation leg in the parent direction.',
    },
  ];
  const active = cards.find((c) => c.id === selected) || cards[1];

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <Layers size={14} className="bb-inline-icon" /> {t('4-Way Structural Taxonomy')}
        </p>
        <h3>{t('Order Block vs. Breaker vs. Mitigation vs. Propulsion')}</h3>
      </div>

      <div className="bb-taxonomy-grid">
        {cards.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`bb-tax-card${selected === item.id ? ' is-active' : ''}`}
            onClick={() => setSelected(item.id)}
          >
            <span className="bb-tax-title">{t(item.name)}</span>
            <svg viewBox="0 0 152 94" className="bb-mini-svg" aria-hidden="true">
              <rect
                x={item.zone.x}
                y={item.zone.y}
                width={item.zone.w}
                height={item.zone.h}
                fill={item.id === 'bb' ? 'var(--bb-amber-soft)' : 'var(--bb-cobalt-soft)'}
                stroke={item.id === 'bb' ? 'var(--bb-amber)' : 'var(--bb-cobalt)'}
                strokeWidth="1.2"
                rx="2"
              />
              <path
                d={item.path}
                fill="none"
                stroke={item.id === 'bb' ? 'var(--bb-amber)' : 'var(--bb-cobalt)'}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="bb-tax-sub">{t(item.tag)}</span>
          </button>
        ))}
      </div>

      <div className="bb-tax-detail">
        <div className="bb-metric-grid">
          <div className="bb-metric-cell">
            <span>{t('Selected Block')}</span>
            <strong>{t(active.name)}</strong>
          </div>
          <div className="bb-metric-cell">
            <span>{t('Sweeps Point A?')}</span>
            <strong>{t(active.sweep)}</strong>
          </div>
          <div className="bb-metric-cell">
            <span>{t('Breaks Point B?')}</span>
            <strong>{t(active.brokeB)}</strong>
          </div>
        </div>
        <p>{t(active.detail)}</p>
      </div>
    </figure>
  );
};

const UnicornCalculatorVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [bbLow, setBbLow] = useState<number>(100);
  const [bbHigh, setBbHigh] = useState<number>(104);
  const [fvgLow, setFvgLow] = useState<number>(102);
  const [fvgHigh, setFvgHigh] = useState<number>(106);

  const result = useMemo(
    () => computeUnicornOverlap(bbLow, bbHigh, fvgLow, fvgHigh),
    [bbLow, bbHigh, fvgLow, fvgHigh],
  );

  const scaleMin = 96;
  const scaleMax = 112;
  const mapX = (val: number) => 40 + ((val - scaleMin) / (scaleMax - scaleMin)) * 600;

  const statusLabel =
    result.status === 'positive-overlap'
      ? 'Positive-Width Unicorn Overlap'
      : result.status === 'touching-only'
        ? 'Touching Edge Only (Zero Width — Not a Unicorn)'
        : 'Disjoint Zones (No Intersection)';

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <Sparkles size={14} className="bb-inline-icon" /> {t('Interactive Unicorn Interval Math')}
        </p>
        <h3>{t('Breaker Block + Fair Value Gap Intersection Calculator')}</h3>
      </div>

      <div className="bb-pill-row">
        <button
          type="button"
          className="bb-tab-btn"
          onClick={() => {
            setBbLow(100);
            setBbHigh(104);
            setFvgLow(102);
            setFvgHigh(106);
          }}
        >
          {t('Preset: Bearish Overlap (102–104)')}
        </button>
        <button
          type="button"
          className="bb-tab-btn"
          onClick={() => {
            setBbLow(100);
            setBbHigh(104);
            setFvgLow(104);
            setFvgHigh(106);
          }}
        >
          {t('Preset: Zero-Width Touch (104)')}
        </button>
        <button
          type="button"
          className="bb-tab-btn"
          onClick={() => {
            setBbLow(106);
            setBbHigh(110);
            setFvgLow(104);
            setFvgHigh(108);
          }}
        >
          {t('Preset: Bullish Overlap (106–108)')}
        </button>
      </div>

      <div className="bb-slider-grid bb-num">
        <label>
          <span>{t('Breaker Low')}: {bbLow.toFixed(1)}</span>
          <input type="range" min={96} max={109} step={0.5} value={bbLow} onChange={(e) => setBbLow(Math.min(Number(e.target.value), bbHigh - 0.5))} />
        </label>
        <label>
          <span>{t('Breaker High')}: {bbHigh.toFixed(1)}</span>
          <input type="range" min={97} max={112} step={0.5} value={bbHigh} onChange={(e) => setBbHigh(Math.max(Number(e.target.value), bbLow + 0.5))} />
        </label>
        <label>
          <span>{t('FVG Low')}: {fvgLow.toFixed(1)}</span>
          <input type="range" min={96} max={109} step={0.5} value={fvgLow} onChange={(e) => setFvgLow(Math.min(Number(e.target.value), fvgHigh - 0.5))} />
        </label>
        <label>
          <span>{t('FVG High')}: {fvgHigh.toFixed(1)}</span>
          <input type="range" min={97} max={112} step={0.5} value={fvgHigh} onChange={(e) => setFvgHigh(Math.max(Number(e.target.value), fvgLow + 0.5))} />
        </label>
      </div>

      <svg viewBox="0 0 680 144" className="bb-svg-stage" role="img" aria-label={t('Unicorn interval overlap diagram')}>
        <rect x="0" y="0" width="680" height="144" rx="8" fill="var(--bb-stage-bg)" />
        {[96, 100, 104, 108, 112].map((tick) => (
          <g key={tick}>
            <line x1={mapX(tick)} y1="18" x2={mapX(tick)} y2="120" stroke="var(--bb-grid)" strokeDasharray="3 3" />
            <text x={mapX(tick)} y="136" textAnchor="middle" className="bb-svg-axis">{tick}</text>
          </g>
        ))}

        {/* Breaker bar */}
        <rect x={mapX(bbLow)} y="26" width={Math.max(4, mapX(bbHigh) - mapX(bbLow))} height="22" rx="4" fill="var(--bb-cobalt-soft)" stroke="var(--bb-cobalt)" strokeWidth="1.6" />
        <text x={mapX(bbLow) + 6} y="41" className="bb-svg-tag">{t('Breaker')} {bbLow}–{bbHigh}</text>

        {/* FVG bar */}
        <rect x={mapX(fvgLow)} y="58" width={Math.max(4, mapX(fvgHigh) - mapX(fvgLow))} height="22" rx="4" fill="var(--bb-emerald-soft)" stroke="var(--bb-emerald)" strokeWidth="1.6" />
        <text x={mapX(fvgLow) + 6} y="73" className="bb-svg-tag-emerald">{t('FVG')} {fvgLow}–{fvgHigh}</text>

        {/* Overlap bar */}
        {result.status === 'positive-overlap' ? (
          <g>
            <rect x={mapX(result.lower)} y="92" width={Math.max(4, mapX(result.upper) - mapX(result.lower))} height="22" rx="4" fill="var(--bb-amber-soft)" stroke="var(--bb-amber)" strokeWidth="2" />
            <text x={mapX(result.lower) + 6} y="107" className="bb-svg-tag-amber">{t('Unicorn')} {result.lower}–{result.upper}</text>
          </g>
        ) : (
          <text x="340" y="108" textAnchor="middle" className="bb-svg-tag-rose">
            {t(statusLabel)}
          </text>
        )}
      </svg>

      <div className="bb-metric-grid bb-num">
        <div className="bb-metric-cell">
          <span>{t('Overlap Status')}</span>
          <strong>{t(statusLabel)}</strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('Shared Interval')}</span>
          <strong>{result.status === 'positive-overlap' ? `${result.lower.toFixed(1)} – ${result.upper.toFixed(1)}` : t('None')}</strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('Overlap Width')}</span>
          <strong>{result.width.toFixed(2)}</strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('FVG 50% CE')}</span>
          <strong>
            {result.fvgMidpoint.toFixed(2)} ({t(result.fvgCeInsideOverlap ? 'Inside Overlap' : 'Outside / Edge')})
          </strong>
        </div>
      </div>
    </figure>
  );
};

const ConfluenceGraderVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [gates, setGates] = useState<BreakerGateInput>({
    htfBias: true,
    externalSweep: true,
    bodyCloseMss: true,
    fvgUnicornOverlap: true,
    activeKillzone: true,
    predefinedInvalidation: true,
  });

  const evaluation = useMemo(() => evaluateBreakerConfluence(gates), [gates]);
  const items: { key: keyof BreakerGateInput; label: string; weight: string }[] = [
    { key: 'htfBias', label: 'HTF Bias & Opposing Draw Aligned', weight: '+2' },
    { key: 'externalSweep', label: 'External Liquidity Sweep Beyond A', weight: '+2' },
    { key: 'bodyCloseMss', label: 'Completed Body-Close MSS Through B', weight: '+2' },
    { key: 'fvgUnicornOverlap', label: 'Positive-Width FVG Overlap (Unicorn)', weight: '+1' },
    { key: 'activeKillzone', label: 'Active London / NY Killzone Window', weight: '+1' },
    { key: 'predefinedInvalidation', label: 'Fixed Closing Invalidation & Risk Cap', weight: '+2' },
  ];

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <Gauge size={14} className="bb-inline-icon" /> {t('Interactive Quality Filter')}
        </p>
        <h3>{t('6-Gate High-Probability Breaker Confluence Grader')}</h3>
      </div>

      <div className="bb-gate-list">
        {items.map((item) => (
          <label key={item.key} className={`bb-gate-item${gates[item.key] ? ' is-checked' : ''}`}>
            <input
              type="checkbox"
              checked={gates[item.key]}
              onChange={(e) => setGates((prev) => ({ ...prev, [item.key]: e.target.checked }))}
            />
            <span>{t(item.label)}</span>
            <strong className="bb-num">{item.weight}</strong>
          </label>
        ))}
      </div>

      <div className="bb-grader-summary">
        <div className="bb-grader-row">
          <span className="bb-grader-tier">{t(evaluation.tier)}</span>
          <strong className="bb-num">
            {evaluation.score} / {evaluation.maxScore}
          </strong>
        </div>
        <div className="bb-meter-track" aria-hidden="true">
          <div className="bb-meter-fill" style={{ width: `${(evaluation.score / evaluation.maxScore) * 100}%` }} />
        </div>
        <p className="bb-grader-note">
          <strong>{t('Diagnostic')}:</strong> {t(evaluation.weakestLink)}
        </p>
      </div>
    </figure>
  );
};

const MtfFractalVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [profileId, setProfileId] = useState<'swing' | 'day' | 'scalp'>('day');
  const active = MTF_FRACTAL_PROFILES.find((p) => p.id === profileId) || MTF_FRACTAL_PROFILES[1];

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <Network size={14} className="bb-inline-icon" /> {t('Top-Down Fractal Alignment')}
        </p>
        <h3>{t('Multi-Timeframe Breaker Execution Stack')}</h3>
      </div>

      <div className="bb-pill-row">
        {MTF_FRACTAL_PROFILES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`bb-tab-btn${profileId === p.id ? ' is-active' : ''}`}
            onClick={() => setProfileId(p.id)}
          >
            {t(p.label)}
          </button>
        ))}
      </div>

      <div className="bb-mtf-grid">
        <div className="bb-mtf-tier">
          <span className="bb-mtf-step">01 · {t('Higher Timeframe Bias')}</span>
          <strong>{t(active.htfBias)}</strong>
          <p>{t('Identifies external liquidity draws and prevents counter-trend traps.')}</p>
        </div>
        <div className="bb-mtf-tier is-accent">
          <span className="bb-mtf-step">02 · {t('Structural Breaker Frame')}</span>
          <strong>{t(active.breakerTf)}</strong>
          <p>{t('Confirms Point C sweep and completed body-close MSS through Point B.')}</p>
        </div>
        <div className="bb-mtf-tier">
          <span className="bb-mtf-step">03 · {t('Entry & Invalidation Frame')}</span>
          <strong>{t(active.entryTf)}</strong>
          <p>{t('Refines Unicorn FVG overlap and logs fixed closing invalidation.')}</p>
        </div>
      </div>

      <div className="bb-metric-grid">
        <div className="bb-metric-cell">
          <span>{t('Primary Session Focus')}</span>
          <strong>{t(active.sessionFocus)}</strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('Typical Study Horizon')}</span>
          <strong>{t(active.typicalHold)}</strong>
        </div>
      </div>

      <figcaption className="bb-visual-caption">{t(active.summary)}</figcaption>
    </figure>
  );
};

const MistakesComicVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [tab, setTab] = useState<number>(0);
  const mistakes = [
    {
      label: '1. No Sweep',
      title: 'Calling Any Broken Box a Breaker Without a Sweep',
      wrong: 'Marks a failed Order Block even though Point C stopped short of Point A.',
      fix: 'Verify Point C strictly exceeded Point A first; otherwise classify it accurately as a Mitigation Block.',
      cue: 'C < A != Sweep',
    },
    {
      label: '2. Wick Trigger',
      title: 'Counting a Wick Probe as a Confirmed MSS',
      wrong: 'Jumps into a retest right after a volatile wick pokes past Point B and snaps back.',
      fix: 'Wait for a completed candle body close strictly beyond Point B before activating the breaker.',
      cue: 'Wick != Body Close',
    },
    {
      label: '3. Hindsight Edit',
      title: 'Redrawing the Candle Selection After Seeing the Bounce',
      wrong: 'Switches from body-only to a wider wick candle after watching where price reversed.',
      fix: 'Freeze your OHLC boundary rule (body or full range) and 50% Mean Threshold before advancing the chart.',
      cue: 'Lock Box Pre-Retest',
    },
    {
      label: '4. Auto-Reversal Myth',
      title: 'Treating a Breaker Retest as an Automatic Reversal',
      wrong: 'Skips protective stops because the Unicorn overlap looks textbook on a 1-minute chart.',
      fix: 'Respect all three empirical endings (hold, closing failure, no retest) and predefine fixed risk.',
      cue: 'Plan Failure & Expiry',
    },
  ];
  const active = mistakes[tab];

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <AlertTriangle size={14} className="bb-inline-icon" /> {t('Stick-Figure Field Guide · Error Prevention')}
        </p>
        <h3>{t('Four Costly Breaker Block Mistakes & Practical Fixes')}</h3>
      </div>

      <div className="bb-pill-row" role="tablist" aria-label={t('Common breaker mistakes')}>
        {mistakes.map((m, idx) => (
          <button
            key={m.label}
            type="button"
            role="tab"
            aria-selected={tab === idx}
            className={`bb-tab-btn${tab === idx ? ' is-active' : ''}`}
            onClick={() => setTab(idx)}
          >
            {t(m.label)}
          </button>
        ))}
      </div>

      <div className="bb-mistake-stage">
        <svg viewBox="0 0 280 156" className="bb-mistake-svg" role="img" aria-label={t(active.title)}>
          <rect x="0" y="0" width="280" height="156" rx="8" fill="var(--bb-stage-bg)" />
          {/* Left side: confused stick figure */}
          <circle cx="64" cy="48" r="11" fill="none" stroke="var(--bb-rose)" strokeWidth="2.3" />
          <line x1="64" y1="59" x2="64" y2="96" stroke="var(--bb-rose)" strokeWidth="2.3" />
          <line x1="64" y1="68" x2="46" y2="56" stroke="var(--bb-rose)" strokeWidth="2.3" />
          <line x1="64" y1="68" x2="82" y2="56" stroke="var(--bb-rose)" strokeWidth="2.3" />
          <line x1="64" y1="96" x2="52" y2="122" stroke="var(--bb-rose)" strokeWidth="2.3" />
          <line x1="64" y1="96" x2="76" y2="122" stroke="var(--bb-rose)" strokeWidth="2.3" />
          <text x="64" y="142" textAnchor="middle" className="bb-svg-tag-rose">{t('Trap')}</text>

          {/* Center rule badge */}
          <rect x="102" y="54" width="160" height="44" rx="6" fill="var(--bb-surface)" stroke="var(--bb-amber)" strokeWidth="1.6" />
          <text x="182" y="80" textAnchor="middle" className="bb-svg-tag-amber">{t(active.cue)}</text>
        </svg>

        <div className="bb-mistake-copy">
          <p className="bb-mistake-title">{t(active.title)}</p>
          <p className="bb-mistake-wrong">
            <strong>{t('What goes wrong')}:</strong> {t(active.wrong)}
          </p>
          <p className="bb-mistake-fix">
            <strong>{t('Disciplined fix')}:</strong> {t(active.fix)}
          </p>
        </div>
      </div>
    </figure>
  );
};

export const BreakerBlockVisual: React.FC<BreakerBlockVisualProps> = ({
  visualId,
  staticOnly = false,
}) => {
  const { t } = useTranslation();

  switch (visualId) {
    case 'bb-comic-polarity':
      return <ComicPolarityVisual t={t} />;
    case 'bb-3d-cinema':
      return (
        <figure className="bb-visual-card" data-bb-figure="">
          <div className="bb-visual-head">
            <p className="bb-visual-kicker">{t('Motion Study 02 · Interactive 3D & Ruler View')}</p>
            <h3>{t('Breaker Block Polarity, Unicorn Overlap & Wick-Trap Studio')}</h3>
          </div>
          <BreakerBlockScene staticOnly={staticOnly} />
        </figure>
      );
    case 'bb-abcd-stepper':
      return <AbcdMirrorStepper t={t} />;
    case 'bb-wick-vs-body-lab':
      return <WickVsBodyLab t={t} />;
    case 'bb-taxonomy-matrix':
      return <TaxonomyMatrixVisual t={t} />;
    case 'bb-unicorn-calculator':
      return <UnicornCalculatorVisual t={t} />;
    case 'bb-confluence-grader':
      return <ConfluenceGraderVisual t={t} />;
    case 'bb-mtf-fractal':
      return <MtfFractalVisual t={t} />;
    case 'bb-mistakes-comic':
      return <MistakesComicVisual t={t} />;
    default:
      return <BreakerBlockExtendedVisual visualId={visualId} t={t} staticOnly={staticOnly} />;
  }
};
