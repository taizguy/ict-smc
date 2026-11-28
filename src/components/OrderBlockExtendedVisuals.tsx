import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { computeObFvgOverlap, computePaperRisk } from '../utils/orderBlockMath';

interface OrderBlockExtendedVisualProps {
  visualId: string;
  staticOnly?: boolean;
}

/* 10. 6-Card Order Block Taxonomy Mini-Chart Explorer */
const TAXONOMY_ITEMS = [
  {
    id: 'ob',
    title: 'Order Block (OB)',
    sub: 'Sweep + Displacement',
    detail: 'Last consecutive opposite-close candle run preceding a sweep and decisive displacement break. Tested as continuation support (bullish) or resistance (bearish).',
    path: 'M12,48 L26,64 L40,56 L58,20 L74,44 L98,16',
    zoneY: 46,
    zoneH: 18,
    color: 'var(--ob-emerald)',
  },
  {
    id: 'snd',
    title: 'Supply & Demand',
    sub: 'Broad Base Range',
    detail: 'Generic accumulation/distribution base (Rally-Base-Rally or Drop-Base-Drop) often spanning many candles without requiring an explicit liquidity sweep or CISD rule.',
    path: 'M12,56 L30,44 L44,48 L56,42 L76,18 L96,24',
    zoneY: 38,
    zoneH: 22,
    color: 'var(--ob-indigo)',
  },
  {
    id: 'breaker',
    title: 'Breaker Block',
    sub: 'Failed OB + Polarity Flip',
    detail: 'An order block that sweeps an extreme, fails by closing decisively through its distal boundary, and then flips polarity from support to resistance (or vice versa).',
    path: 'M12,32 L28,16 L46,42 L62,62 L78,34 L98,64',
    zoneY: 28,
    zoneH: 16,
    color: 'var(--ob-rose)',
  },
  {
    id: 'mitigation',
    title: 'Mitigation Block',
    sub: 'Failure Swing (No Sweep)',
    detail: 'Similar to a Breaker Block but formed after a failure swing that does NOT sweep the prior extreme high or low before breaking structure.',
    path: 'M12,24 L32,46 L48,30 L68,62 L82,36 L98,60',
    zoneY: 30,
    zoneH: 15,
    color: 'var(--ob-ochre)',
  },
  {
    id: 'propulsion',
    title: 'Propulsion Block',
    sub: 'Secondary OB Off Parent OB',
    detail: 'A fresh secondary down-close (bullish) candle printed directly as price bounces off an existing higher-timeframe parent Order Block.',
    path: 'M12,54 L28,60 L44,34 L56,44 L74,18 L98,12',
    zoneY: 36,
    zoneH: 14,
    color: 'var(--ob-emerald-bright)',
  },
  {
    id: 'rejection',
    title: 'Rejection Block',
    sub: 'Long Wick Extreme Band',
    detail: 'Marked solely across the long upper or lower wick extreme (between body edge and wick tip) when price aggressively rejects a liquidity extreme.',
    path: 'M12,38 L34,66 L48,32 L68,20 L82,58 L98,24',
    zoneY: 52,
    zoneH: 14,
    color: 'var(--ob-ochre)',
  },
];

const TaxonomyMatrixVisual: React.FC = () => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string>('ob');
  const active = TAXONOMY_ITEMS.find((i) => i.id === activeId) || TAXONOMY_ITEMS[0];

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Interactive Taxonomy · 6 Distinct Block Families')}</p>
        <h3>{t('Click Any Concept to Compare Geometry, Sweep Requirement & Polarity')}</h3>
      </div>

      <div className="ob-taxonomy-grid">
        {TAXONOMY_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`ob-tax-card${activeId === item.id ? ' is-active' : ''}`}
            onClick={() => setActiveId(item.id)}
          >
            <svg viewBox="0 0 110 74" className="ob-mini-svg" aria-hidden="true">
              <rect x="6" y={item.zoneY} width="98" height={item.zoneH} fill="var(--ob-emerald-soft)" stroke={item.color} strokeWidth="1.2" rx="2" />
              <path d={item.path} fill="none" stroke={item.color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="ob-tax-title">{t(item.title)}</span>
            <span className="ob-tax-sub">{t(item.sub)}</span>
          </button>
        ))}
      </div>

      <div className="ob-tax-detail">
        <p>
          <strong>{t(active.title)} ({t(active.sub)}):</strong> {t(active.detail)}
        </p>
      </div>
    </figure>
  );
};

/* 11. Interactive OB-FVG Overlap Arithmetic Calculator */
const ObFvgOverlapCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [obLow, setObLow] = useState<number>(99);
  const [obHigh, setObHigh] = useState<number>(107);
  const [fvgLow, setFvgLow] = useState<number>(105);
  const [fvgHigh, setFvgHigh] = useState<number>(108);

  const res = computeObFvgOverlap(obLow, obHigh, fvgLow, fvgHigh);
  const w = 680;
  const h = 220;
  const pMin = 95;
  const pMax = 113;
  const mapY = (p: number) => 20 + ((pMax - p) / (pMax - pMin)) * (h - 40);

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Interactive Arithmetic Lab · Interval Intersection')}</p>
        <h3>{t('Calculate Exact Order Block + Fair Value Gap Overlap Zone')}</h3>
      </div>

      <div className="ob-slider-grid">
        <label>
          <span>{t('OB Low')}: <strong className="ob-num">{obLow}</strong></span>
          <input type="range" min={96} max={106} step={0.5} value={obLow} onChange={(e) => setObLow(Number(e.target.value))} />
        </label>
        <label>
          <span>{t('OB High')}: <strong className="ob-num">{obHigh}</strong></span>
          <input type="range" min={101} max={111} step={0.5} value={obHigh} onChange={(e) => setObHigh(Number(e.target.value))} />
        </label>
        <label>
          <span>{t('FVG Low')}: <strong className="ob-num">{fvgLow}</strong></span>
          <input type="range" min={97} max={110} step={0.5} value={fvgLow} onChange={(e) => setFvgLow(Number(e.target.value))} />
        </label>
        <label>
          <span>{t('FVG High')}: <strong className="ob-num">{fvgHigh}</strong></span>
          <input type="range" min={100} max={112} step={0.5} value={fvgHigh} onChange={(e) => setFvgHigh(Number(e.target.value))} />
        </label>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="ob-svg-stage" role="img" aria-label={t('Order block and FVG overlap visualization')}>
        <rect x="0" y="0" width={w} height={h} fill="var(--ob-stage-bg)" rx="8" />
        {[96, 100, 104, 108, 112].map((p) => (
          <g key={p}>
            <line x1="56" y1={mapY(p)} x2="656" y2={mapY(p)} stroke="var(--ob-grid)" strokeDasharray="3 4" />
            <text x="48" y={mapY(p) + 4} textAnchor="end" className="ob-svg-axis">{p}</text>
          </g>
        ))}

        {/* OB Band */}
        <rect
          x="84"
          y={mapY(Math.max(obLow, obHigh))}
          width="250"
          height={Math.max(6, mapY(Math.min(obLow, obHigh)) - mapY(Math.max(obLow, obHigh)))}
          fill="var(--ob-emerald-soft)"
          stroke="var(--ob-emerald)"
          strokeWidth="1.5"
          rx="4"
        />
        <text x="209" y={mapY(Math.max(obLow, obHigh)) + 16} textAnchor="middle" className="ob-svg-tag">
          {t('Order Block')} ({Math.min(obLow, obHigh)}–{Math.max(obLow, obHigh)})
        </text>

        {/* FVG Band */}
        <rect
          x="366"
          y={mapY(Math.max(fvgLow, fvgHigh))}
          width="260"
          height={Math.max(6, mapY(Math.min(fvgLow, fvgHigh)) - mapY(Math.max(fvgLow, fvgHigh)))}
          fill="var(--ob-indigo-soft)"
          stroke="var(--ob-indigo)"
          strokeWidth="1.5"
          rx="4"
        />
        <text x="496" y={mapY(Math.max(fvgLow, fvgHigh)) + 16} textAnchor="middle" className="ob-svg-tag-indigo">
          {t('Fair Value Gap')} ({Math.min(fvgLow, fvgHigh)}–{Math.max(fvgLow, fvgHigh)})
        </text>

        {/* Shared Overlap Slice */}
        {res.status === 'overlap' && (
          <g>
            <rect
              x="74"
              y={mapY(res.high)}
              width="572"
              height={Math.max(6, mapY(res.low) - mapY(res.high))}
              fill="var(--ob-ochre-soft)"
              stroke="var(--ob-ochre)"
              strokeWidth="2"
              strokeDasharray="6 3"
              rx="3"
            />
            <text x="350" y={(mapY(res.high) + mapY(res.low)) / 2 + 4} textAnchor="middle" className="ob-svg-tag-ochre">
              {t('TRUE OVERLAP')}: {res.low}–{res.high} ({t('Width')} {res.width})
            </text>
          </g>
        )}
      </svg>

      <div className="ob-metric-grid">
        <div className="ob-metric-cell">
          <span>{t('Overlap Status')}</span>
          <strong>
            {res.status === 'overlap'
              ? t('Positive-Width Overlap')
              : res.status === 'touching'
                ? t('Boundary Touch Only (0 Width)')
                : t('Disjoint (Separate Zones)')}
          </strong>
        </div>
        <div className="ob-metric-cell">
          <span>{t('Shared Interval')}</span>
          <strong className="ob-num">{res.status === 'disjoint' ? t('None') : `${res.low} – ${res.high}`}</strong>
        </div>
        <div className="ob-metric-cell">
          <span>{t('Overlap Width')}</span>
          <strong className="ob-num">{res.width} {t('pts')}</strong>
        </div>
        <div className="ob-metric-cell">
          <span>{t('Overlap Midpoint')}</span>
          <strong className="ob-num">{res.midpoint !== null ? res.midpoint : '—'}</strong>
        </div>
      </div>

      <figcaption className="ob-visual-caption">
        {t('Default teaching case: OB 99–107 intersected with FVG 105–108 produces an exact 2.0-point shared zone at 105–107 (midpoint 106.0).')}
      </figcaption>
    </figure>
  );
};

/* 12. Advanced Variants: Propulsion Block vs. Reclaimed Order Block Animation */
const PropulsionReclaimedAnim: React.FC<{ staticOnly?: boolean }> = ({ staticOnly }) => {
  const { t } = useTranslation();
  const [variant, setVariant] = useState<'propulsion' | 'reclaimed'>('propulsion');
  const [step, setStep] = useState<number>(2);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!playing || staticOnly) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false);
      return;
    }
    const id = window.setInterval(() => {
      setStep((prev) => {
        if (prev >= 2) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, staticOnly]);

  const bars = variant === 'propulsion'
    ? [
        { id: 'P1', o: 103, h: 103.4, l: 99, c: 100, fill: 'var(--ob-ochre)' },
        { id: 'P2', o: 100, h: 107.6, l: 99.8, c: 107, fill: 'var(--ob-emerald-bright)' },
        { id: 'P3', o: 107, h: 107.2, l: 102.2, c: 103.4, fill: 'var(--ob-indigo)' },
        { id: 'P4', o: 103.4, h: 111.5, l: 103.1, c: 111, fill: 'var(--ob-emerald-bright)' },
        { id: 'P5', o: 111, h: 111.2, l: 105.4, c: 107.6, fill: 'var(--ob-emerald)' },
        { id: 'P6', o: 107.6, h: 115.0, l: 107.2, c: 114.5, fill: 'var(--ob-emerald-bright)' },
      ]
    : [
        { id: 'R1', o: 106, h: 106.4, l: 102.4, c: 103, fill: 'var(--ob-ochre)' },
        { id: 'R2', o: 103, h: 108.5, l: 102.8, c: 108, fill: 'var(--ob-emerald-bright)' },
        { id: 'R3', o: 108, h: 108.4, l: 101.6, c: 102, fill: 'var(--ob-rose)' },
        { id: 'R4', o: 102, h: 102.5, l: 98.2, c: 99.4, fill: 'var(--ob-rose)' },
        { id: 'R5', o: 99.4, h: 110.2, l: 99.0, c: 109.6, fill: 'var(--ob-emerald-bright)' },
        { id: 'R6', o: 109.6, h: 110.0, l: 104.2, c: 113.8, fill: 'var(--ob-emerald)' },
      ];

  const visibleCount = [2, 4, 6][step] ?? 6;
  const notes = variant === 'propulsion'
    ? [
        'Stage 1: Parent Bullish OB (99–103) launches price to 107.',
        'Stage 2: Candle P3 dips into the Parent OB and forms a secondary down-close Propulsion Block (102.2–107.0) before P4 launches to 111.',
        'Stage 3: Pullback P5 respects the Propulsion Block 50% Mean Threshold (105.2) and accelerates cleanly to 114.5.',
      ]
    : [
        'Stage 1: Initial down-close OB (103–106) prints on the left side of a developing liquidity sweep.',
        'Stage 2: Price breaks below the block to sweep deeper sell-side liquidity (98.2) during the sell curve.',
        'Stage 3: Strong upward displacement (R5) reclaims the prior OB band (103–106), which acts as a Reclaimed Order Block springboard on R6.',
      ];

  const w = 680;
  const h = 248;
  const mapY = (p: number) => 22 + ((116 - p) / 19) * (h - 52);

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Animated Variants · Secondary Order Block Family')}</p>
        <h3>{t('Propulsion Block (Springboard) vs. Reclaimed Order Block (Buy-Curve Re-Use)')}</h3>
      </div>

      <div className="ob-toolbar-split">
        <div className="ob-tab-row" role="tablist">
          <button type="button" role="tab" aria-selected={variant === 'propulsion'} className={`ob-tab-btn${variant === 'propulsion' ? ' is-active' : ''}`} onClick={() => { setVariant('propulsion'); setStep(2); setPlaying(false); }}>
            {t('Propulsion Block')}
          </button>
          <button type="button" role="tab" aria-selected={variant === 'reclaimed'} className={`ob-tab-btn${variant === 'reclaimed' ? ' is-active' : ''}`} onClick={() => { setVariant('reclaimed'); setStep(2); setPlaying(false); }}>
            {t('Reclaimed Order Block')}
          </button>
        </div>
        <div className="ob-control-group">
          <button type="button" className="ob-ctrl-btn is-primary" onClick={() => { if (!playing && step >= 2) setStep(0); setPlaying((p) => !p); }}>
            {playing ? <Pause size={15} /> : <Play size={15} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button type="button" className="ob-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => (s + 1) % 3); }} aria-label={t('Next stage')}>
            <SkipForward size={15} />
          </button>
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="ob-svg-stage" role="img" aria-label={t('Propulsion and Reclaimed Order Block comparison')}>
        <rect x="0" y="0" width={w} height={h} fill="var(--ob-stage-bg)" rx="8" />
        {[98, 102, 106, 110, 114].map((p) => (
          <g key={p}>
            <line x1="56" y1={mapY(p)} x2="656" y2={mapY(p)} stroke="var(--ob-grid)" strokeDasharray="3 4" />
            <text x="48" y={mapY(p) + 4} textAnchor="end" className="ob-svg-axis">{p}</text>
          </g>
        ))}

        {variant === 'propulsion' ? (
          <>
            <rect x="74" y={mapY(103)} width="580" height={mapY(99) - mapY(103)} fill="var(--ob-ochre-soft)" stroke="var(--ob-ochre)" strokeWidth="1.2" />
            <text x="646" y={mapY(100.5)} textAnchor="end" className="ob-svg-tag-ochre">{t('Parent OB (99–103)')}</text>
            {step >= 1 && (
              <>
                <rect x="270" y={mapY(107)} width="384" height={mapY(103.4) - mapY(107)} fill="var(--ob-indigo-soft)" stroke="var(--ob-indigo)" strokeWidth="1.5" />
                <line x1="270" y1={mapY(105.2)} x2="654" y2={mapY(105.2)} stroke="var(--ob-indigo)" strokeDasharray="4 3" />
                <text x="646" y={mapY(107) - 5} textAnchor="end" className="ob-svg-tag-indigo">{t('Propulsion Block (MT 105.2)')}</text>
              </>
            )}
          </>
        ) : (
          <>
            <rect x="74" y={mapY(106)} width="580" height={mapY(103) - mapY(106)} fill="var(--ob-emerald-soft)" stroke="var(--ob-emerald)" strokeWidth="1.5" />
            <text x="646" y={mapY(106) - 5} textAnchor="end" className="ob-svg-tag">{t('Reclaimed OB Band (103–106)')}</text>
          </>
        )}

        {bars.slice(0, visibleCount).map((b, idx) => {
          const cx = 114 + idx * 96;
          return (
            <g key={b.id}>
              <line x1={cx} y1={mapY(b.h)} x2={cx} y2={mapY(b.l)} stroke="var(--ob-wick)" strokeWidth="2" />
              <rect x={cx - 15} y={mapY(Math.max(b.o, b.c))} width="30" height={Math.max(5, mapY(Math.min(b.o, b.c)) - mapY(Math.max(b.o, b.c)))} fill={b.fill} rx="3" />
              <text x={cx} y={h - 10} textAnchor="middle" className="ob-svg-axis">{b.id}</text>
            </g>
          );
        })}
      </svg>

      <figcaption className="ob-visual-caption">{t(notes[step])}</figcaption>
    </figure>
  );
};

/* 13. Multi-Timeframe Refinement Magnification Lens (4H -> 15M -> 1M) */
const MtfRefinementZoom: React.FC = () => {
  const { t } = useTranslation();
  const [tf, setTf] = useState<'4H' | '15M' | '1M'>('15M');

  const specs = {
    '4H': { zone: '100.0 – 140.0', width: '40.0 pts', rr: '1.8R', fill: 'Highest Fill Rate', miss: 'Low Missed-Fill Risk', top: 44, height: 152, note: 'Broad 4H HTF Order Block captures almost every valid pullback, but requires a wide 40-point stop buffer.' },
    '15M': { zone: '104.0 – 118.0', width: '14.0 pts', rr: '3.6R', fill: 'Balanced Fill Rate', miss: 'Moderate Missed-Fill Risk', top: 108, height: 64, note: 'Balanced 15M nested Order Block inside the 4H zone cuts stop width by 65% while preserving structural clarity.' },
    '1M': { zone: '104.5 – 108.5', width: '4.0 pts', rr: '7.5R', fill: 'Strictest Fill Rate', miss: 'High Missed-Fill Risk', top: 146, height: 24, note: 'Ultra-tight 1M refinement creates impressive paper R-multiples, yet price often turns inside the 15M band and leaves 1M limit orders unfilled.' },
  }[tf];

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Interactive Magnification · HTF to LTF Nesting')}</p>
        <h3>{t('Nested Multi-Timeframe Refinement (4H -> 15M -> 1M) Trade-Off Lens')}</h3>
      </div>

      <div className="ob-tab-row" role="tablist" aria-label={t('Refinement timeframe')}>
        {(['4H', '15M', '1M'] as const).map((item) => (
          <button key={item} type="button" role="tab" aria-selected={tf === item} className={`ob-tab-btn${tf === item ? ' is-active' : ''}`} onClick={() => setTf(item)}>
            {t(`${item} Order Block`)}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 680 226" className="ob-svg-stage" role="img" aria-label={t('Nested multi-timeframe Order Block refinement')}>
        <rect x="0" y="0" width="680" height="226" fill="var(--ob-stage-bg)" rx="8" />
        {/* 4H outer box */}
        <rect x="34" y="44" width="612" height="152" fill={tf === '4H' ? 'var(--ob-emerald-soft)' : 'var(--ob-surface)'} stroke="var(--ob-emerald)" strokeWidth={tf === '4H' ? 2.4 : 1.1} rx="6" />
        <text x="48" y="64" className="ob-svg-tag">{t('4H HTF Order Block (100–140 · 40 pts)')}</text>

        {/* 15M middle nested box */}
        <rect x="110" y="108" width="510" height="64" fill={tf === '15M' ? 'var(--ob-ochre-soft)' : 'var(--ob-surface-alt)'} stroke="var(--ob-ochre)" strokeWidth={tf === '15M' ? 2.4 : 1.1} rx="5" />
        <text x="124" y="128" className="ob-svg-tag-ochre">{t('15M Nested OB (104–118 · 14 pts)')}</text>

        {/* 1M inner micro box */}
        <rect x="210" y="146" width="380" height="24" fill={tf === '1M' ? 'var(--ob-indigo-soft)' : 'var(--ob-surface)'} stroke="var(--ob-indigo)" strokeWidth={tf === '1M' ? 2.4 : 1.2} rx="4" />
        <text x="224" y="162" className="ob-svg-tag-indigo">{t('1M Micro OB (104.5–108.5 · 4 pts)')}</text>

        {/* Active caliper arrow */}
        <line x1="636" y1={specs.top} x2="636" y2={specs.top + specs.height} stroke="var(--ob-ink)" strokeWidth="2.5" />
        <line x1="628" y1={specs.top} x2="644" y2={specs.top} stroke="var(--ob-ink)" strokeWidth="2.5" />
        <line x1="628" y1={specs.top + specs.height} x2="644" y2={specs.top + specs.height} stroke="var(--ob-ink)" strokeWidth="2.5" />
      </svg>

      <div className="ob-metric-grid">
        <div className="ob-metric-cell"><span>{t('Active Band')}</span><strong className="ob-num">{specs.zone}</strong></div>
        <div className="ob-metric-cell"><span>{t('Stop Width')}</span><strong className="ob-num">{specs.width}</strong></div>
        <div className="ob-metric-cell"><span>{t('Sample R:R')}</span><strong className="ob-num">{specs.rr}</strong></div>
        <div className="ob-metric-cell"><span>{t('Fill Trade-Off')}</span><strong>{t(specs.miss)}</strong></div>
      </div>

      <figcaption className="ob-visual-caption">{t(specs.note)}</figcaption>
    </figure>
  );
};

/* 14. Interactive 7-Gate Quality Grader */
const GRADER_GATES = [
  '1. Higher-Timeframe Narrative & Dealing-Range Alignment (Discount for Bullish / Premium for Bearish)',
  '2. Explicit Prior Liquidity Sweep or Inducement (IDM) Cleared Before Origin',
  '3. Strong Multi-Candle Displacement Away From the Origin Run',
  '4. Confirmed Body-Close CISD and/or External Market Structure Shift (MSS)',
  '5. Positive-Width Fair Value Gap (FVG) Created Inside the Departure Leg',
  '6. First-Touch Unmitigated Status (Zero Prior Mitigations)',
  '7. Active Liquid Session Window (London Open or NY AM Killzone)',
];

const QualityScorecard: React.FC = () => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState<boolean[]>([true, true, true, true, true, false, false]);
  const score = checked.filter(Boolean).length;
  const pct = Math.round((score / GRADER_GATES.length) * 100);
  const tier =
    score >= 6
      ? 'A-Tier Study Candidate (High Confluence)'
      : score >= 4
        ? 'B-Tier Conditional (Needs Confirmation Entry)'
        : 'Skip / Low-Context Zone (Avoid Blind Limits)';

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Interactive Rubric · 7-Gate Confluence Filter')}</p>
        <h3>{t('Grade Any Order Block Before Committing Paper Risk')}</h3>
      </div>

      <div className="ob-gate-list">
        {GRADER_GATES.map((label, idx) => (
          <label key={label} className={`ob-gate-item${checked[idx] ? ' is-checked' : ''}`}>
            <input
              type="checkbox"
              checked={checked[idx]}
              onChange={(e) => {
                const next = [...checked];
                next[idx] = e.target.checked;
                setChecked(next);
              }}
            />
            <span>{t(label)}</span>
          </label>
        ))}
      </div>

      <div className="ob-grader-summary">
        <div className="ob-grader-row">
          <span className="ob-grader-tier">{t(tier)}</span>
          <strong className="ob-num">{score} / {GRADER_GATES.length} ({pct}%)</strong>
        </div>
        <div className="ob-meter-track" aria-hidden="true">
          <div className="ob-meter-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="ob-grader-note">
          {t('A high score enforces consistent journaling criteria; it does not predict or promise any trade outcome.')}
        </p>
      </div>
    </figure>
  );
};

/* 15. Worked Bullish Example: NQ 5M Animated Replay (09:15–10:20 NY) */
const NQ_CANDLES = [
  { t: '09:15', o: 20084, h: 20092, l: 20070, c: 20072, role: 'approach' },
  { t: '09:25', o: 20072, h: 20074, l: 20056, c: 20058, role: 'ob' },
  { t: '09:30', o: 20058, h: 20060, l: 20042, c: 20048, role: 'ob' },
  { t: '09:35', o: 20048, h: 20096, l: 20047, c: 20094, role: 'dep' },
  { t: '09:40', o: 20094, h: 20116, l: 20092, c: 20112, role: 'mss' },
  { t: '09:50', o: 20112, h: 20114, l: 20082, c: 20086, role: 'ret' },
  { t: '09:55', o: 20086, h: 20088, l: 20059, c: 20078, role: 'mit' },
  { t: '10:05', o: 20078, h: 20122, l: 20076, c: 20118, role: 'exp' },
  { t: '10:20', o: 20118, h: 20148, l: 20114, c: 20144, role: 'tgt' },
];

const NqBullishReplay: React.FC<{ staticOnly?: boolean }> = ({ staticOnly }) => {
  const { t } = useTranslation();
  const [entryMode, setEntryMode] = useState<'open' | 'mt'>('open');
  const [step, setStep] = useState<number>(3);
  const [playing, setPlaying] = useState<boolean>(false);

  const stages = [
    { count: 3, note: '09:25–09:30 NY: Two consecutive down-close candles sweep 20,045 low down to 20,042 (OB Open 20,072, Body MT 20,060, Low 20,042).' },
    { count: 5, note: '09:35–09:40 NY: Displacement closes above 20,072 (CISD) and 20,092 swing (MSS), leaving an FVG at 20,060–20,092.' },
    { count: 7, note: '09:55 NY: Pullback tags both OB Opening (20,072) and 50% Body Mean Threshold (20,060), closing back strongly at 20,078.' },
    { count: 9, note: '10:05–10:20 NY: Expansion reaches the opposing buy-side target at 20,144 (2.0R from Open entry; 3.5R from MT entry before costs).' },
  ];

  useEffect(() => {
    if (!playing || staticOnly) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false);
      return;
    }
    const id = window.setInterval(() => {
      setStep((prev) => {
        if (prev >= stages.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, stages.length]);

  const entryPrice = entryMode === 'open' ? 20072 : 20060;
  const metrics = computePaperRisk(entryPrice, 20036, 20144);
  const visible = NQ_CANDLES.slice(0, stages[step].count);
  const w = 680;
  const h = 264;
  const mapY = (p: number) => 22 + ((20156 - p) / 130) * (h - 54);
  const colW = (w - 94) / NQ_CANDLES.length;

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Animated Worked Example · Synthetic NQ 5M Replay')}</p>
        <h3>{t('NQ 5M Bullish Discount Order Block (09:15–10:20 NY)')}</h3>
      </div>

      <div className="ob-toolbar-split">
        <div className="ob-tab-row">
          <button type="button" className={`ob-tab-btn${entryMode === 'open' ? ' is-active' : ''}`} onClick={() => setEntryMode('open')}>
            {t('Opening Limit (20,072 -> 2.0R)')}
          </button>
          <button type="button" className={`ob-tab-btn${entryMode === 'mt' ? ' is-active' : ''}`} onClick={() => setEntryMode('mt')}>
            {t('50% MT Limit (20,060 -> 3.5R)')}
          </button>
        </div>
        <div className="ob-control-group">
          <button type="button" className="ob-ctrl-btn is-primary" onClick={() => { if (!playing && step >= 3) setStep(0); setPlaying((p) => !p); }}>
            {playing ? <Pause size={15} /> : <Play size={15} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button type="button" className="ob-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => (s + 3) % 4); }} aria-label={t('Previous stage')}><SkipBack size={15} /></button>
          <button type="button" className="ob-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => (s + 1) % 4); }} aria-label={t('Next stage')}><SkipForward size={15} /></button>
          <button type="button" className="ob-ctrl-btn" onClick={() => { setPlaying(false); setStep(0); }} aria-label={t('Reset')}><RotateCcw size={15} /></button>
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="ob-svg-stage" role="img" aria-label={t('Synthetic NQ 5-minute bullish order block replay')}>
        <rect x="0" y="0" width={w} height={h} fill="var(--ob-stage-bg)" rx="8" />
        {[20036, 20060, 20072, 20100, 20144].map((p) => (
          <g key={p}>
            <line x1="70" y1={mapY(p)} x2="656" y2={mapY(p)} stroke="var(--ob-grid)" strokeDasharray="3 4" />
            <text x="64" y={mapY(p) + 4} textAnchor="end" className="ob-svg-axis">{p.toLocaleString()}</text>
          </g>
        ))}

        {/* OB Zone 20048-20072 */}
        <rect x={70 + colW} y={mapY(20072)} width={w - 94 - colW} height={mapY(20048) - mapY(20072)} fill="var(--ob-emerald-soft)" stroke="var(--ob-emerald)" strokeWidth="1.3" />
        <line x1={70 + colW} y1={mapY(20060)} x2="656" y2={mapY(20060)} stroke="var(--ob-ochre)" strokeWidth="1.4" strokeDasharray="5 4" />
        <line x1="70" y1={mapY(20036)} x2="656" y2={mapY(20036)} stroke="var(--ob-rose)" strokeWidth="1.3" strokeDasharray="4 3" />
        <line x1="70" y1={mapY(20144)} x2="656" y2={mapY(20144)} stroke="var(--ob-indigo)" strokeWidth="1.3" strokeDasharray="5 3" />

        <text x="648" y={mapY(20144) - 4} textAnchor="end" className="ob-svg-tag-indigo">{t('Target 20,144')}</text>
        <text x="648" y={mapY(entryPrice) - 4} textAnchor="end" className="ob-svg-tag">{t('Entry')} {entryPrice.toLocaleString()}</text>
        <text x="648" y={mapY(20036) + 12} textAnchor="end" className="ob-svg-tag-rose">{t('Stop 20,036')}</text>

        {visible.map((c, idx) => {
          const cx = 70 + idx * colW + colW / 2;
          const fill = c.role === 'ob' ? 'var(--ob-ochre)' : c.c >= c.o ? 'var(--ob-emerald-bright)' : 'var(--ob-rose)';
          return (
            <g key={c.t}>
              <line x1={cx} y1={mapY(c.h)} x2={cx} y2={mapY(c.l)} stroke="var(--ob-wick)" strokeWidth="1.8" />
              <rect x={cx - 11} y={mapY(Math.max(c.o, c.c))} width="22" height={Math.max(5, mapY(Math.min(c.o, c.c)) - mapY(Math.max(c.o, c.c)))} fill={fill} rx="2.5" />
              <text x={cx} y={h - 10} textAnchor="middle" className="ob-svg-axis">{c.t}</text>
            </g>
          );
        })}
      </svg>

      <div className="ob-metric-grid">
        <div className="ob-metric-cell"><span>{t('Entry Price')}</span><strong className="ob-num">{entryPrice.toLocaleString()}</strong></div>
        <div className="ob-metric-cell"><span>{t('Risk Distance')}</span><strong className="ob-num">{metrics.riskPoints} {t('pts')}</strong></div>
        <div className="ob-metric-cell"><span>{t('Reward Distance')}</span><strong className="ob-num">{metrics.rewardPoints} {t('pts')}</strong></div>
        <div className="ob-metric-cell"><span>{t('Planned R-Multiple')}</span><strong className="ob-num">{metrics.rrRatio.toFixed(1)}R</strong></div>
      </div>

      <figcaption className="ob-visual-caption">{t(stages[step].note)}</figcaption>
    </figure>
  );
};

/* 16. Worked Bearish Example: EUR/USD 15M Replay + Intrabar Spike Simulator */
const EUR_CANDLES_BASE = [
  { t: '07:30', o: 1.0892, h: 1.0902, l: 1.0884, c: 1.0900, role: 'approach' },
  { t: '07:45', o: 1.0900, h: 1.0914, l: 1.0898, c: 1.0910, role: 'ob' },
  { t: '08:00', o: 1.0910, h: 1.0924, l: 1.0908, c: 1.0918, role: 'ob' },
  { t: '08:15', o: 1.0918, h: 1.0919, l: 1.0882, c: 1.0886, role: 'dep' },
  { t: '08:30', o: 1.0886, h: 1.0888, l: 1.0868, c: 1.0872, role: 'mss' },
  { t: '08:45', o: 1.0872, h: 1.0896, l: 1.0870, c: 1.0892, role: 'ret' },
  { t: '09:00', o: 1.0892, h: 1.0910, l: 1.0884, c: 1.0886, role: 'mit' },
  { t: '09:30', o: 1.0886, h: 1.0888, l: 1.0858, c: 1.0862, role: 'exp' },
  { t: '10:15', o: 1.0862, h: 1.0865, l: 1.0842, c: 1.0844, role: 'tgt' },
];

const EurUsdBearishReplay: React.FC<{ staticOnly?: boolean }> = ({ staticOnly }) => {
  const { t } = useTranslation();
  const [spikeMode, setSpikeMode] = useState<boolean>(false);
  const [step, setStep] = useState<number>(3);
  const [playing, setPlaying] = useState<boolean>(false);

  const candles = EUR_CANDLES_BASE.map((c, idx) =>
    spikeMode && idx === 6 ? { ...c, h: 1.0929, c: 1.0890 } : c,
  );

  const stages = [
    { count: 3, note: '07:45–08:00 NY: Two up-close candles sweep London high at 1.0920 up to 1.0924 (Bearish OB Open 1.0900, Body MT 1.0909, High 1.0924).' },
    { count: 5, note: '08:15–08:30 NY: Strong bearish displacement closes below 1.0900 (CISD) and breaks 1.0884 swing low (MSS).' },
    {
      count: 7,
      note: spikeMode
        ? '09:00 NY (Intrabar Spike Mode): Wick spikes to 1.0929 before closing at 1.0890. Even though the candle closed inside the OB, a live stop-market order at 1.0928 ALREADY filled at -1.0R!'
        : '09:00 NY: Retest wicks into Bearish OB Open (1.0900) and 50% Body MT (1.0909), rejecting cleanly to close at 1.0886.',
    },
    {
      count: 9,
      note: spikeMode
        ? '10:15 NY (Intrabar Spike Lesson): Price still dropped to 1.0844 afterward, proving why stop-market triggers and candle-close invalidation are separate mechanics.'
        : '10:15 NY: Bearish expansion reaches the 1.0844 target (56 pips reward / 28 pips risk = 2.0R before spread).',
    },
  ];

  useEffect(() => {
    if (!playing || staticOnly) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false);
      return;
    }
    const id = window.setInterval(() => {
      setStep((prev) => {
        if (prev >= stages.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, stages.length]);

  const visible = candles.slice(0, stages[step].count);
  const w = 680;
  const h = 264;
  const mapY = (p: number) => 22 + ((1.0938 - p) / 0.0104) * (h - 54);
  const colW = (w - 98) / candles.length;

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Animated Worked Example · Synthetic EUR/USD 15M Replay')}</p>
        <h3>{t('EUR/USD 15M Bearish Premium Order Block & Intrabar Stop-Spike Test')}</h3>
      </div>

      <div className="ob-toolbar-split">
        <div className="ob-tab-row">
          <button type="button" className={`ob-tab-btn${!spikeMode ? ' is-active' : ''}`} onClick={() => setSpikeMode(false)}>
            {t('Clean Retest (1.0910 High -> 2.0R)')}
          </button>
          <button type="button" className={`ob-tab-btn${spikeMode ? ' is-active' : ''}`} onClick={() => setSpikeMode(true)}>
            {t('Simulate Intrabar Spike (1.0929 -> Stopped -1.0R)')}
          </button>
        </div>
        <div className="ob-control-group">
          <button type="button" className="ob-ctrl-btn is-primary" onClick={() => { if (!playing && step >= 3) setStep(0); setPlaying((p) => !p); }}>
            {playing ? <Pause size={15} /> : <Play size={15} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button type="button" className="ob-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => (s + 3) % 4); }} aria-label={t('Previous stage')}><SkipBack size={15} /></button>
          <button type="button" className="ob-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => (s + 1) % 4); }} aria-label={t('Next stage')}><SkipForward size={15} /></button>
          <button type="button" className="ob-ctrl-btn" onClick={() => { setPlaying(false); setStep(0); }} aria-label={t('Reset')}><RotateCcw size={15} /></button>
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="ob-svg-stage" role="img" aria-label={t('Synthetic EUR/USD 15-minute bearish order block replay')}>
        <rect x="0" y="0" width={w} height={h} fill="var(--ob-stage-bg)" rx="8" />
        {[1.0844, 1.0875, 1.0900, 1.0909, 1.0928].map((p) => (
          <g key={p}>
            <line x1="74" y1={mapY(p)} x2="656" y2={mapY(p)} stroke="var(--ob-grid)" strokeDasharray="3 4" />
            <text x="68" y={mapY(p) + 4} textAnchor="end" className="ob-svg-axis">{p.toFixed(4)}</text>
          </g>
        ))}

        {/* Bearish OB Band 1.0900-1.0918 */}
        <rect x={74 + colW} y={mapY(1.0918)} width={w - 98 - colW} height={mapY(1.0900) - mapY(1.0918)} fill="var(--ob-rose-soft)" stroke="var(--ob-rose)" strokeWidth="1.3" />
        <line x1={74 + colW} y1={mapY(1.0909)} x2="656" y2={mapY(1.0909)} stroke="var(--ob-ochre)" strokeWidth="1.4" strokeDasharray="5 4" />
        <line x1="74" y1={mapY(1.0928)} x2="656" y2={mapY(1.0928)} stroke="var(--ob-rose)" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="74" y1={mapY(1.0844)} x2="656" y2={mapY(1.0844)} stroke="var(--ob-indigo)" strokeWidth="1.3" strokeDasharray="5 3" />

        <text x="648" y={mapY(1.0928) - 4} textAnchor="end" className="ob-svg-tag-rose">
          {spikeMode ? t('Stop 1.0928 HIT INTRABAR at 1.0929!') : t('Stop 1.0928 (4 pips above 1.0924)')}
        </text>
        <text x="648" y={mapY(1.0844) - 4} textAnchor="end" className="ob-svg-tag-indigo">{t('Target 1.0844')}</text>

        {visible.map((c, idx) => {
          const cx = 74 + idx * colW + colW / 2;
          const fill = c.role === 'ob' ? 'var(--ob-ochre)' : c.c >= c.o ? 'var(--ob-emerald-bright)' : 'var(--ob-rose)';
          return (
            <g key={c.t}>
              <line x1={cx} y1={mapY(c.h)} x2={cx} y2={mapY(c.l)} stroke="var(--ob-wick)" strokeWidth="1.8" />
              <rect x={cx - 11} y={mapY(Math.max(c.o, c.c))} width="22" height={Math.max(5, mapY(Math.min(c.o, c.c)) - mapY(Math.max(c.o, c.c)))} fill={fill} rx="2.5" />
              <text x={cx} y={h - 10} textAnchor="middle" className="ob-svg-axis">{c.t}</text>
            </g>
          );
        })}
      </svg>

      <figcaption className="ob-visual-caption">{t(stages[step].note)}</figcaption>
    </figure>
  );
};

/* 17. Paper-Trade Execution, Order Type & Stop Tier Simulator */
const RiskOrderSimulator: React.FC = () => {
  const { t } = useTranslation();
  const [entryType, setEntryType] = useState<'open' | 'mt' | 'confirm'>('open');
  const [stopTier, setStopTier] = useState<'mt' | 'distal' | 'buffered'>('buffered');

  const entryVal = entryType === 'open' ? 106.0 : entryType === 'mt' ? 103.5 : 107.4;
  const stopVal = stopTier === 'mt' ? 103.0 : stopTier === 'distal' ? 99.0 : 98.5;
  const targetVal = 121.0;
  const validPlan = entryVal > stopVal;
  const metrics = validPlan
    ? computePaperRisk(entryVal, stopVal, targetVal)
    : { riskPoints: 0, rewardPoints: 0, rrRatio: 0, breakEvenPctBeforeCosts: 0 };

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Interactive Risk Lab · Entry & Stop Geometry')}</p>
        <h3>{t('Compare Opening Limit, 50% MT Limit & Confirmation Entry Across 3 Stop Tiers')}</h3>
      </div>

      <div className="ob-toolbar-split">
        <div className="ob-tab-row" aria-label={t('Entry order type')}>
          <button type="button" className={`ob-tab-btn${entryType === 'open' ? ' is-active' : ''}`} onClick={() => setEntryType('open')}>{t('Entry: OB Open (106.0)')}</button>
          <button type="button" className={`ob-tab-btn${entryType === 'mt' ? ' is-active' : ''}`} onClick={() => setEntryType('mt')}>{t('Entry: 50% MT (103.5)')}</button>
          <button type="button" className={`ob-tab-btn${entryType === 'confirm' ? ' is-active' : ''}`} onClick={() => setEntryType('confirm')}>{t('Entry: LTF CISD (107.4)')}</button>
        </div>
        <div className="ob-tab-row" aria-label={t('Stop placement tier')}>
          <button type="button" className={`ob-tab-btn${stopTier === 'mt' ? ' is-active' : ''}`} onClick={() => setStopTier('mt')}>{t('Stop: Below MT (103.0)')}</button>
          <button type="button" className={`ob-tab-btn${stopTier === 'distal' ? ' is-active' : ''}`} onClick={() => setStopTier('distal')}>{t('Stop: Exact Low (99.0)')}</button>
          <button type="button" className={`ob-tab-btn${stopTier === 'buffered' ? ' is-active' : ''}`} onClick={() => setStopTier('buffered')}>{t('Stop: Buffered (98.5)')}</button>
        </div>
      </div>

      <div className="ob-metric-grid">
        <div className="ob-metric-cell"><span>{t('Entry / Stop / Target')}</span><strong className="ob-num">{entryVal.toFixed(1)} / {stopVal.toFixed(1)} / {targetVal.toFixed(1)}</strong></div>
        <div className="ob-metric-cell"><span>{t('Risk / Reward (pts)')}</span><strong className="ob-num">{metrics.riskPoints.toFixed(1)} / {metrics.rewardPoints.toFixed(1)}</strong></div>
        <div className="ob-metric-cell"><span>{t('Planned R-Multiple')}</span><strong className="ob-num">{metrics.rrRatio.toFixed(2)}R</strong></div>
        <div className="ob-metric-cell"><span>{t('Arithmetic Break-Even')}</span><strong className="ob-num">{metrics.breakEvenPctBeforeCosts.toFixed(1)}%</strong></div>
      </div>

      <figcaption className="ob-visual-caption">
        {t('Tighter entries or tighter stops raise the paper R-multiple while increasing missed-fill frequency or stop-out sensitivity. Real execution also incurs spread, commissions, and slippage.')}
      </figcaption>
    </figure>
  );
};

/* 18. Common Mistakes Stick-Figure Clinic (4 Tabs) */
const MISTAKES = [
  {
    id: 'no-disp',
    tab: '1. No Displacement',
    title: 'Drawing Every Opposite Candle Without Displacement',
    wrong: 'Marking any ordinary down-close candle inside choppy sideways ranges and expecting an immediate bounce.',
    fix: 'Require decisive multi-candle displacement plus CISD or MSS before labeling any origin candle an Order Block.',
    sketch: 'chop',
  },
  {
    id: 'idm',
    tab: '2. Ignoring IDM',
    title: 'Buying the Mid-Leg Inducement Block Above Discount',
    wrong: 'Placing blind limit orders on the first mid-leg pullback block when an un-swept extreme discount OB sits just beneath it.',
    fix: 'Map the full dealing range (50% equilibrium) and watch whether the upper block acts as Inducement fuel.',
    sketch: 'idm',
  },
  {
    id: 'redraw',
    tab: '3. Hindsight Redraw',
    title: 'Switching From Single Candle to Run After Seeing the Reaction',
    wrong: 'Using candle C when price tags low, then switching to candles A–C in review when price bounces early.',
    fix: 'Freeze one written boundary rule (body run vs. single candle) across your entire sample before backtesting.',
    sketch: 'redraw',
  },
  {
    id: 'wick-stop',
    tab: '4. Wick vs. Stop',
    title: 'Confusing Candle-Close Invalidation With Live Stop Triggers',
    wrong: 'Assuming a wick sweep past 99.0 that closes at 101.5 saved a live stop-market order placed at 98.8.',
    fix: 'Remember that live stop-market orders execute intrabar on price touch; log intrabar stops honestly in journals.',
    sketch: 'wick',
  },
];

const MistakesComicClinic: React.FC = () => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string>('no-disp');
  const active = MISTAKES.find((m) => m.id === activeId) || MISTAKES[0];

  return (
    <figure className="ob-visual-card" data-ob-figure="">
      <div className="ob-visual-head">
        <p className="ob-visual-kicker">{t('Stick-Figure Mistake Clinic · 4 Preventable Errors')}</p>
        <h3>{t('Spot & Fix the 4 Most Frequent Order Block Journaling Errors')}</h3>
      </div>

      <div className="ob-tab-row" role="tablist" aria-label={t('Order block mistakes')}>
        {MISTAKES.map((m) => (
          <button key={m.id} type="button" role="tab" aria-selected={activeId === m.id} className={`ob-tab-btn${activeId === m.id ? ' is-active' : ''}`} onClick={() => setActiveId(m.id)}>
            {t(m.tab)}
          </button>
        ))}
      </div>

      <div className="ob-mistake-stage">
        <svg viewBox="0 0 260 170" className="ob-svg-stage" role="img" aria-label={t(active.title)}>
          <rect x="0" y="0" width="260" height="170" fill="var(--ob-stage-bg)" rx="8" />
          {/* Stick Figure Trader */}
          <circle cx="52" cy="54" r="12" fill="none" stroke="var(--ob-rose)" strokeWidth="2.2" />
          <line x1="52" y1="66" x2="52" y2="106" stroke="var(--ob-rose)" strokeWidth="2.2" />
          <line x1="52" y1="78" x2="32" y2="62" stroke="var(--ob-rose)" strokeWidth="2.2" />
          <line x1="52" y1="78" x2="72" y2="62" stroke="var(--ob-rose)" strokeWidth="2.2" />
          <line x1="52" y1="106" x2="38" y2="136" stroke="var(--ob-rose)" strokeWidth="2.2" />
          <line x1="52" y1="106" x2="66" y2="136" stroke="var(--ob-rose)" strokeWidth="2.2" />
          <text x="52" y="156" textAnchor="middle" className="ob-svg-tag-rose">{t('Trap!')}</text>

          {/* Mini Chart Sketch */}
          <rect x="96" y="20" width="148" height="128" fill="var(--ob-surface)" stroke="var(--ob-border)" rx="6" />
          {active.sketch === 'chop' && (
            <>
              <rect x="110" y="66" width="120" height="36" fill="var(--ob-rose-soft)" stroke="var(--ob-rose)" />
              <polyline points="112,84 132,74 150,94 170,76 190,92 214,82 232,126" fill="none" stroke="var(--ob-ink)" strokeWidth="2.2" />
              <text x="170" y="46" textAnchor="middle" className="ob-svg-tag-rose">{t('Sideways Chop')}</text>
            </>
          )}
          {active.sketch === 'idm' && (
            <>
              <rect x="110" y="54" width="120" height="20" fill="var(--ob-rose-soft)" stroke="var(--ob-rose)" />
              <rect x="110" y="106" width="120" height="22" fill="var(--ob-emerald-soft)" stroke="var(--ob-emerald)" />
              <polyline points="112,118 142,40 170,66 190,114 230,44" fill="none" stroke="var(--ob-ink)" strokeWidth="2.2" />
              <text x="170" y="44" textAnchor="middle" className="ob-svg-tag-rose">{t('IDM Swept First')}</text>
            </>
          )}
          {active.sketch === 'redraw' && (
            <>
              <rect x="112" y="50" width="116" height="58" fill="var(--ob-ochre-soft)" stroke="var(--ob-ochre)" strokeDasharray="4 3" />
              <rect x="148" y="80" width="80" height="28" fill="var(--ob-emerald-soft)" stroke="var(--ob-emerald)" />
              <text x="170" y="40" textAnchor="middle" className="ob-svg-tag-ochre">{t('Moving Goalposts')}</text>
            </>
          )}
          {active.sketch === 'wick' && (
            <>
              <line x1="108" y1="104" x2="234" y2="104" stroke="var(--ob-rose)" strokeWidth="1.6" strokeDasharray="4 3" />
              <line x1="170" y1="54" x2="170" y2="128" stroke="var(--ob-rose)" strokeWidth="2.4" />
              <rect x="158" y="64" width="24" height="28" fill="var(--ob-emerald-bright)" rx="2" />
              <text x="170" y="42" textAnchor="middle" className="ob-svg-tag-rose">{t('Stop Hit Intrabar')}</text>
            </>
          )}
        </svg>

        <div className="ob-mistake-copy">
          <p className="ob-mistake-title">{t(active.title)}</p>
          <p className="ob-mistake-wrong">
            <strong>{t('What Goes Wrong')}:</strong> {t(active.wrong)}
          </p>
          <p className="ob-mistake-fix">
            <strong>{t('How to Fix It')}:</strong> {t(active.fix)}
          </p>
        </div>
      </div>
    </figure>
  );
};

export const OrderBlockExtendedVisual: React.FC<OrderBlockExtendedVisualProps> = ({ visualId, staticOnly = false }) => {
  switch (visualId) {
    case 'ob-taxonomy-matrix-visual':
      return <TaxonomyMatrixVisual />;
    case 'ob-fvg-overlap-calculator':
      return <ObFvgOverlapCalculator />;
    case 'ob-propulsion-reclaimed-anim':
      return <PropulsionReclaimedAnim staticOnly={staticOnly} />;
    case 'ob-mtf-refinement-zoom':
      return <MtfRefinementZoom />;
    case 'ob-quality-scorecard':
      return <QualityScorecard />;
    case 'ob-nq-bullish-replay':
      return <NqBullishReplay staticOnly={staticOnly} />;
    case 'ob-eurusd-bearish-replay':
      return <EurUsdBearishReplay staticOnly={staticOnly} />;
    case 'ob-risk-order-simulator':
      return <RiskOrderSimulator />;
    case 'ob-mistakes-comic':
      return <MistakesComicClinic />;
    default:
      return null;
  }
};
