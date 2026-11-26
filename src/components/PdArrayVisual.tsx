import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Compass,
  GitCompare,
  Layers,
  Pause,
  Play,
  SlidersHorizontal,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  computeDealingRange,
  evaluatePdConfluence,
  pdArrayHierarchyList,
  pdMtfProfiles,
  type PdMtfTier,
} from '../utils/pdArrayMath';
import { PdArrayScene } from './PdArrayScene';
import { useTranslation } from '../i18n/TranslationProvider';

export type PdArrayVisualKind =
  | 'pd-comic-intro'
  | 'pd-matrix-3d-cinema'
  | 'pd-dealing-range-calculator'
  | 'pd-hierarchy-stack'
  | 'pd-gap-variants-dissection'
  | 'pd-continuum-flow'
  | 'pd-confluence-grader'
  | 'pd-mtf-nesting'
  | 'pd-mistakes-comic';

function StickFigure({
  x,
  y,
  color,
  pose = 'stand',
  scale = 1,
}: {
  x: number;
  y: number;
  color: string;
  pose?: 'stand' | 'panic' | 'wait' | 'cheer' | 'point' | 'slump';
  scale?: number;
}) {
  const arms =
    pose === 'panic'
      ? 'M -12 -16 L 0 -8 L 12 -19'
      : pose === 'cheer'
        ? 'M -13 -22 L 0 -10 L 13 -22'
        : pose === 'point'
          ? 'M -10 -8 L 0 -11 L 15 -14'
          : pose === 'slump'
            ? 'M -10 -4 L 0 -10 L 10 -3'
            : pose === 'wait'
              ? 'M -9 -6 L 0 -10 L 9 -6'
              : 'M -10 -10 L 0 -12 L 10 -10';

  const legs =
    pose === 'slump'
      ? 'M -9 17 L -2 5 L 9 17'
      : pose === 'panic'
        ? 'M -11 17 L 0 4 L 11 17'
        : 'M -8 18 L 0 4 L 8 18';

  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} aria-hidden="true">
      <circle cx={0} cy={-24} r={7} fill="none" stroke={color} strokeWidth={2.4} />
      <path d="M 0 -17 L 0 4" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <path d={arms} fill="none" stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" />
      <path d={legs} fill="none" stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** 1. 4-Panel Interactive Stick-Figure Comic */
function PdComicIntro() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const steps = [
    {
      label: '1. Impulse Rally',
      leftLine: 'Green candles! Buy now at $1,360!',
      rightLine: 'Wait—that is 90% Premium shelf.',
    },
    {
      label: '2. 50% Eq Check',
      leftLine: 'Why did it stall right after I entered?',
      rightLine: 'Equilibrium is $1,200. Patience.',
    },
    {
      label: '3. Discount Return',
      leftLine: 'Ouch! Stopped out inside Discount.',
      rightLine: 'Price tapped $1,110 Discount OB + FVG.',
    },
    {
      label: '4. Target Reached',
      leftLine: 'Lesson learned: map the range first.',
      rightLine: 'Bought Discount shelf -> exited at High.',
    },
  ];

  const active = steps[step];

  return (
    <figure className="pd-figure" data-pd-array-figure="pd-comic-intro">
      <div className="pd-figure-head">
        <span className="pd-head-title">
          <Users size={16} aria-hidden="true" />
          <span>{t('Auction Comic: Impulse Premium Buyer vs. Patient PD Matrix Planner')}</span>
        </span>
        <div className="pd-controls">
          {steps.map((s, idx) => (
            <button
              key={s.label}
              type="button"
              className={`pd-btn ${step === idx ? 'is-active' : ''}`}
              onClick={() => setStep(idx)}
            >
              {t(s.label)}
            </button>
          ))}
        </div>
      </div>

      <div className="pd-figure-body">
        <svg viewBox="0 0 760 278" className="pd-svg" role="img" aria-label={t('Auction floor Premium vs Discount comic')}>
          {/* Left Panel: Impulse Buyer */}
          <rect x={8} y={10} width={364} height={258} rx={10} fill="var(--pd-prem-soft)" stroke="var(--pd-prem)" strokeOpacity={0.45} />
          <text x={24} y={34} fontSize={12.5} fontWeight={700} fill="var(--pd-prem)">
            {t('Impulse Chaser (Buys 90% Premium)')}
          </text>
          <rect x={24} y={48} width={332} height={44} rx={4} fill="var(--pd-prem)" fillOpacity={0.14} stroke="var(--pd-prem)" strokeDasharray="3 3" />
          <text x={33} y={66} fontSize={10} fontWeight={700} fill="var(--pd-prem)">{t('Q4 PREMIUM ($1,300–$1,400)')}</text>
          <line x1={24} y1={108} x2={356} y2={108} stroke="var(--pd-indigo)" strokeDasharray="4 4" />
          <text x={248} y={103} fontSize={9.5} fontWeight={600} fill="var(--pd-indigo)">{t('50% Eq ($1,200)')}</text>

          <path d="M 38 152 L 105 148 L 165 66 L 240 138 L 325 146" fill="none" stroke="var(--pd-prem)" strokeWidth={2.6} />
          {step >= 0 && <circle cx={165} cy={66} r={5.5} fill="var(--pd-prem)" />}
          {step >= 2 && <circle cx={240} cy={138} r={5.5} fill="var(--pd-danger)" />}

          <StickFigure
            x={70}
            y={222}
            color="var(--pd-prem)"
            pose={step === 1 ? 'panic' : step >= 2 ? 'slump' : 'point'}
          />
          <rect x={106} y={184} width={246} height={38} rx={8} fill="var(--pd-paper)" stroke="var(--pd-prem)" />
          <text x={229} y={207} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--pd-ink)">
            {t(active.leftLine)}
          </text>
          <text x={108} y={248} fontSize={10.5} fontWeight={700} fill="var(--pd-danger)">
            {t('Entry in Q4 Premium · Tight upside room')}
          </text>

          {/* Right Panel: Patient Planner */}
          <rect x={388} y={10} width={364} height={258} rx={10} fill="var(--pd-disc-soft)" stroke="var(--pd-disc)" strokeOpacity={0.45} />
          <text x={404} y={34} fontSize={12.5} fontWeight={700} fill="var(--pd-disc)">
            {t('PD Matrix Planner (Waits for Discount)')}
          </text>
          <line x1={404} y1={108} x2={736} y2={108} stroke="var(--pd-indigo)" strokeDasharray="4 4" />
          <text x={628} y={103} fontSize={9.5} fontWeight={600} fill="var(--pd-indigo)">{t('50% Eq ($1,200)')}</text>
          <rect x={404} y={118} width={332} height={42} rx={4} fill="var(--pd-disc)" fillOpacity={0.16} stroke="var(--pd-disc)" strokeDasharray="3 3" />
          <text x={412} y={135} fontSize={10} fontWeight={700} fill="var(--pd-disc)">{t('DISCOUNT OB + FVG ($1,100–$1,140)')}</text>

          <path d="M 418 152 L 480 66 L 560 138 L 620 138 L 718 54" fill="none" stroke="var(--pd-disc)" strokeWidth={2.6} />
          {step >= 2 && <circle cx={590} cy={138} r={5.5} fill="var(--pd-disc)" />}
          {step === 3 && <circle cx={718} cy={54} r={5.5} fill="var(--pd-indigo)" />}

          <StickFigure
            x={450}
            y={222}
            color="var(--pd-disc)"
            pose={step === 3 ? 'cheer' : step === 2 ? 'point' : 'wait'}
          />
          <rect x={486} y={184} width={246} height={38} rx={8} fill="var(--pd-paper)" stroke="var(--pd-disc)" />
          <text x={609} y={207} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--pd-ink)">
            {t(active.rightLine)}
          </text>
          <text x={488} y={248} fontSize={10.5} fontWeight={700} fill="var(--pd-disc)">
            {t('Patient Discount Entry · Targets $1,400 High')}
          </text>
        </svg>
      </div>
      <figcaption className="pd-figcaption">
        {t('Original auction comic showing why location inside a declared range separates disciplined entries from emotional Premium chasing.')}
      </figcaption>
    </figure>
  );
}

/** 3. Interactive Dealing Range & Quadrant Calculator */
function PdDealingRangeCalculator() {
  const { t } = useTranslation();
  const [low, setLow] = useState<number>(100);
  const [high, setHigh] = useState<number>(140);
  const [price, setPrice] = useState<number>(132);
  const [decimals, setDecimals] = useState<number>(2);

  const loadPreset = (l: number, h: number, p: number, d: number) => {
    setLow(l);
    setHigh(h);
    setPrice(p);
    setDecimals(d);
  };

  const res = computeDealingRange(low, high, price, decimals);
  const clampedDepth = Math.max(0, Math.min(100, res.depthFromLowPct));
  const pointerX = 95 + (clampedDepth / 100) * 570;

  return (
    <figure className="pd-figure" data-pd-array-figure="pd-dealing-range-calculator">
      <div className="pd-figure-head">
        <span className="pd-head-title">
          <SlidersHorizontal size={16} aria-hidden="true" />
          <span>{t('Interactive Dealing Range & Quadrant Ledger')}</span>
        </span>
        <div className="pd-controls">
          <button type="button" className="pd-btn" onClick={() => loadPreset(100, 140, 132, 2)}>
            {t('100–140 (Price 132 = Premium)')}
          </button>
          <button type="button" className="pd-btn" onClick={() => loadPreset(100, 180, 132, 2)}>
            {t('100–180 (Price 132 = Discount)')}
          </button>
          <button type="button" className="pd-btn" onClick={() => loadPreset(20200, 20600, 20280, 2)}>
            {t('NQ 20,200–20,600')}
          </button>
          <button type="button" className="pd-btn" onClick={() => loadPreset(1.08, 1.09, 1.0875, 4)}>
            {t('EUR/USD 1.08–1.09')}
          </button>
        </div>
      </div>

      <div className="pd-sandbox-inputs">
        <label className="pd-input-chip">
          <span>{t('Range Low (0%)')}</span>
          <input
            type="number"
            step={decimals === 4 ? 0.0005 : 1}
            value={low}
            onChange={(e) => setLow(Number(e.target.value))}
          />
        </label>
        <label className="pd-input-chip">
          <span>{t('Range High (100%)')}</span>
          <input
            type="number"
            step={decimals === 4 ? 0.0005 : 1}
            value={high}
            onChange={(e) => setHigh(Number(e.target.value))}
          />
        </label>
        <label className="pd-input-chip">
          <span>{t('Test Price')}</span>
          <input
            type="number"
            step={decimals === 4 ? 0.0005 : 1}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="pd-figure-body">
        <svg viewBox="0 0 760 220" className="pd-svg" role="img" aria-label={t('Horizontal dealing range quadrant ledger')}>
          {/* 4 Quarter Bands horizontally left-to-right (0% Low -> 100% High) */}
          <rect x={95} y={66} width={142.5} height={64} fill="var(--pd-disc)" fillOpacity={0.22} stroke="var(--pd-disc)" />
          <text x={166} y={92} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--pd-disc)">Q1 (0–25%)</text>
          <text x={166} y={109} textAnchor="middle" fontSize={9.5} fill="var(--pd-ink)">{t('Deep Discount')}</text>

          <rect x={237.5} y={66} width={142.5} height={64} fill="var(--pd-disc-soft)" stroke="var(--pd-disc)" />
          <text x={308} y={92} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--pd-disc)">Q2 (25–50%)</text>
          <text x={308} y={109} textAnchor="middle" fontSize={9.5} fill="var(--pd-ink)">{t('Upper Discount')}</text>

          <rect x={380} y={66} width={142.5} height={64} fill="var(--pd-prem-soft)" stroke="var(--pd-prem)" />
          <text x={451} y={92} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--pd-prem)">Q3 (50–75%)</text>
          <text x={451} y={109} textAnchor="middle" fontSize={9.5} fill="var(--pd-ink)">{t('Lower Premium')}</text>

          <rect x={522.5} y={66} width={142.5} height={64} fill="var(--pd-prem)" fillOpacity={0.22} stroke="var(--pd-prem)" />
          <text x={593} y={92} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--pd-prem)">Q4 (75–100%)</text>
          <text x={593} y={109} textAnchor="middle" fontSize={9.5} fill="var(--pd-ink)">{t('Upper Premium')}</text>

          {/* 50% Equilibrium Marker */}
          <line x1={380} y1={42} x2={380} y2={150} stroke="var(--pd-indigo)" strokeWidth={2.5} />
          <text x={380} y={32} textAnchor="middle" fontSize={11} fontWeight={800} fill="var(--pd-indigo)">
            {t('50% Eq')} = {res.equilibrium.toFixed(decimals)}
          </text>

          {/* Scale ticks below */}
          <text x={95} y={152} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--pd-disc)">
            0%: {low.toFixed(decimals)}
          </text>
          <text x={237.5} y={152} textAnchor="middle" fontSize={10} fill="var(--pd-muted)">
            25%: {res.q25.toFixed(decimals)}
          </text>
          <text x={522.5} y={152} textAnchor="middle" fontSize={10} fill="var(--pd-muted)">
            75%: {res.q75.toFixed(decimals)}
          </text>
          <text x={665} y={152} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--pd-prem)">
            100%: {high.toFixed(decimals)}
          </text>

          {/* Current Price Marker */}
          {res.validRange && (
            <g>
              <line x1={pointerX} y1={56} x2={pointerX} y2={176} stroke="var(--pd-ink)" strokeWidth={2.4} />
              <circle cx={pointerX} cy={98} r={6.5} fill={res.half === 'discount' ? 'var(--pd-disc)' : res.half === 'premium' ? 'var(--pd-prem)' : 'var(--pd-indigo)'} stroke="var(--pd-paper)" strokeWidth={2} />
              <rect x={Math.max(30, Math.min(540, pointerX - 95))} y={180} width={190} height={28} rx={6} fill="var(--pd-ink)" />
              <text x={Math.max(125, Math.min(635, pointerX))} y={198} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--pd-paper)">
                {price.toFixed(decimals)} · {res.depthFromLowPct}% ({t(res.quadrant)})
              </text>
            </g>
          )}
        </svg>
      </div>

      <figcaption className="pd-figcaption">
        {res.validRange ? (
          <>
            <strong>{t('Live Verdict')}:</strong> {price.toFixed(decimals)} {t('sits at')}{' '}
            <bdi>{res.depthFromLowPct}%</bdi> ({t(res.quadrant)}) ·{' '}
            {t('Bullish OTE Band')}: <bdi>{res.ote79Bullish.toFixed(decimals)}–{res.ote62Bullish.toFixed(decimals)}</bdi> ·{' '}
            {t('Bearish OTE Band')}: <bdi>{res.ote62Bearish.toFixed(decimals)}–{res.ote79Bearish.toFixed(decimals)}</bdi>.
          </>
        ) : (
          t('Range High must be strictly greater than Range Low.')
        )}
      </figcaption>
    </figure>
  );
}

/** 4. Interactive 9-Array Matrix Hierarchy Explorer */
function PdHierarchyStack() {
  const { t } = useTranslation();
  const [side, setSide] = useState<'discount' | 'premium'>('discount');
  const [selectedRank, setSelectedRank] = useState<number>(7);
  const current = pdArrayHierarchyList.find((x) => x.rank === selectedRank) || pdArrayHierarchyList[0];

  return (
    <figure className="pd-figure" data-pd-array-figure="pd-hierarchy-stack">
      <div className="pd-figure-head">
        <span className="pd-head-title">
          <Layers size={16} aria-hidden="true" />
          <span>{t('Interactive 9-Array PD Matrix Hierarchy Explorer')}</span>
        </span>
        <div className="pd-controls">
          <button
            type="button"
            className={`pd-btn ${side === 'discount' ? 'is-active' : ''}`}
            onClick={() => setSide('discount')}
          >
            {t('Discount Stack (Buys <50%)')}
          </button>
          <button
            type="button"
            className={`pd-btn ${side === 'premium' ? 'is-active' : ''}`}
            onClick={() => setSide('premium')}
          >
            {t('Premium Stack (Sells >50%)')}
          </button>
        </div>
      </div>

      <div className="pd-hierarchy-grid">
        <div className="pd-hierarchy-list" role="tablist" aria-label={t('PD Array ranks')}>
          {pdArrayHierarchyList.map((item) => (
            <button
              key={item.rank}
              type="button"
              role="tab"
              aria-selected={selectedRank === item.rank}
              className={`pd-rank-row ${selectedRank === item.rank ? 'is-selected' : ''} ${side === 'premium' ? 'is-prem' : 'is-disc'}`}
              onClick={() => setSelectedRank(item.rank)}
            >
              <span className="pd-rank-num">{item.rank}</span>
              <span className="pd-rank-code">{item.code}</span>
              <span className="pd-rank-name">{t(item.name)}</span>
            </button>
          ))}
        </div>

        <div className="pd-hierarchy-detail">
          <div className="pd-detail-badge">
            {side === 'discount' ? t('Discount Polarity (<50%)') : t('Premium Polarity (>50%)')} · #{current.rank}
          </div>
          <h3>{t(current.name)}</h3>
          <p>
            <strong>{t('Active Shelf Role')}:</strong>{' '}
            {t(side === 'discount' ? current.discountRole : current.premiumRole)}
          </p>
          <p>
            <strong>{t('Precision Anchor')}:</strong> {t(current.refinementLine)}
          </p>
          <p>
            <strong>{t('Structural Rule')}:</strong> {t(current.keyRule)}
          </p>
        </div>
      </div>
      <figcaption className="pd-figcaption">
        {t('Select Discount or Premium and inspect each of the nine PD Array categories with exact refinement boundaries.')}
      </figcaption>
    </figure>
  );
}

/** 5. Classic FVG vs Suspension Block vs IFVG vs Reclaimed Anatomy */
function PdGapVariantsDissection() {
  const { t } = useTranslation();
  const [variant, setVariant] = useState<'fvg' | 'suspension' | 'ifvg' | 'reclaimed'>('suspension');

  const meta = {
    fvg: {
      title: 'Classic Outer-Wick FVG (100–108)',
      note: 'Candle 1 upper wick (100) and Candle 3 lower wick (108) never overlap, leaving an open 8-point outer-wick gap across Candle 2 (CE = 104).',
    },
    suspension: {
      title: 'Suspension Block Body-Gaps (100–102 & 106–108)',
      note: 'Previous close = 100, central candle body = 102–106, next open = 108 while wicks overlap! Keep 100–102 and 106–108 separate—never relabel as a 100–108 wick FVG.',
    },
    ifvg: {
      title: 'Inverse Fair Value Gap (IFVG Role Flip)',
      note: 'After a clean closing candle breaks fully beneath a bullish FVG, the prior support gap converts into overhead bearish resistance on retest.',
    },
    reclaimed: {
      title: 'Reclaimed Reference (Double Role Shift)',
      note: 'A reference holds Direction A, shifts temporarily, then swiftly reclaims Direction A—preserving full historical context rather than deleting earlier zones.',
    },
  }[variant];

  return (
    <figure className="pd-figure" data-pd-array-figure="pd-gap-variants-dissection">
      <div className="pd-figure-head">
        <span className="pd-head-title">
          <GitCompare size={16} aria-hidden="true" />
          <span>{t('Gap & Block Anatomy: Classic FVG vs. Suspension vs. IFVG vs. Reclaimed')}</span>
        </span>
        <div className="pd-controls">
          {(['fvg', 'suspension', 'ifvg', 'reclaimed'] as const).map((k) => (
            <button
              key={k}
              type="button"
              className={`pd-btn ${variant === k ? 'is-active' : ''}`}
              onClick={() => setVariant(k)}
            >
              {t(k === 'fvg' ? 'Classic FVG' : k === 'suspension' ? 'Suspension Block' : k === 'ifvg' ? 'Inverse FVG' : 'Reclaimed')}
            </button>
          ))}
        </div>
      </div>

      <div className="pd-figure-body">
        <svg viewBox="0 0 760 230" className="pd-svg" role="img" aria-label={t(meta.title)}>
          {variant === 'fvg' && (
            <g>
              <rect x={230} y={76} width={340} height={84} fill="var(--pd-disc-soft)" stroke="var(--pd-disc)" strokeDasharray="4 3" />
              <text x={582} y={84} fontSize={10.5} fontWeight={700} fill="var(--pd-disc)">{t('C3 Wick Low: 108')}</text>
              <line x1={230} y1={118} x2={570} y2={118} stroke="var(--pd-indigo)" strokeDasharray="3 3" />
              <text x={582} y={122} fontSize={10.5} fontWeight={700} fill="var(--pd-indigo)">{t('50% CE: 104')}</text>
              <text x={582} y={162} fontSize={10.5} fontWeight={700} fill="var(--pd-disc)">{t('C1 Wick High: 100')}</text>
              {/* C1 */}
              <line x1={180} y1={160} x2={180} y2={208} stroke="var(--pd-disc)" strokeWidth={2} />
              <rect x={164} y={172} width={32} height={28} fill="var(--pd-disc)" rx={2} />
              {/* C2 */}
              <line x1={320} y1={60} x2={320} y2={182} stroke="var(--pd-disc)" strokeWidth={2} />
              <rect x={304} y={72} width={32} height={96} fill="var(--pd-disc)" rx={2} />
              {/* C3 */}
              <line x1={460} y1={32} x2={460} y2={76} stroke="var(--pd-disc)" strokeWidth={2} />
              <rect x={444} y={40} width={32} height={30} fill="var(--pd-disc)" rx={2} />
            </g>
          )}

          {variant === 'suspension' && (
            <g>
              {/* Overlapping wicks across 102 and 106! */}
              <rect x={230} y={56} width={310} height={30} fill="var(--pd-prem-soft)" stroke="var(--pd-prem)" strokeDasharray="3 3" />
              <text x={552} y={75} fontSize={10.5} fontWeight={700} fill="var(--pd-prem)">{t('Upper Body Gap: 106–108')}</text>
              <rect x={230} y={142} width={310} height={30} fill="var(--pd-indigo-soft)" stroke="var(--pd-indigo)" strokeDasharray="3 3" />
              <text x={552} y={161} fontSize={10.5} fontWeight={700} fill="var(--pd-indigo)">{t('Lower Body Gap: 100–102')}</text>
              {/* C1 close 100, upper wick 104 */}
              <line x1={180} y1={110} x2={180} y2={205} stroke="var(--pd-disc)" strokeWidth={2} />
              <rect x={164} y={172} width={32} height={26} fill="var(--pd-disc)" rx={2} />
              <text x={180} y={220} textAnchor="middle" fontSize={10} fill="var(--pd-muted)">{t('Close 100')}</text>
              {/* Central C2 body 102–106 */}
              <line x1={320} y1={76} x2={320} y2={155} stroke="var(--pd-disc)" strokeWidth={2} />
              <rect x={304} y={86} width={32} height={56} fill="var(--pd-disc)" rx={2} />
              <text x={320} y={220} textAnchor="middle" fontSize={10} fill="var(--pd-muted)">{t('Body 102–106')}</text>
              {/* C3 open 108, lower wick 103 */}
              <line x1={460} y1={28} x2={460} y2={125} stroke="var(--pd-disc)" strokeWidth={2} />
              <rect x={444} y={34} width={32} height={22} fill="var(--pd-disc)" rx={2} />
              <text x={460} y={220} textAnchor="middle" fontSize={10} fill="var(--pd-muted)">{t('Open 108')}</text>
            </g>
          )}

          {variant === 'ifvg' && (
            <g>
              <rect x={95} y={96} width={570} height={46} fill="var(--pd-prem-soft)" stroke="var(--pd-prem)" strokeDasharray="4 3" />
              <text x={380} y={86} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--pd-prem)">
                {t('Broken Bullish FVG Flips to Bearish Inverse FVG Resistance')}
              </text>
              <path d="M 110 175 L 220 62 L 350 165 L 485 118 L 635 198" fill="none" stroke="var(--pd-prem)" strokeWidth={2.8} />
              <circle cx={350} cy={165} r={5.5} fill="var(--pd-danger)" />
              <circle cx={485} cy={118} r={5.5} fill="var(--pd-prem)" />
              <text x={350} y={185} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--pd-danger)">{t('Clean Close Below')}</text>
              <text x={485} y={108} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--pd-prem)">{t('IFVG Resistance Test')}</text>
            </g>
          )}

          {variant === 'reclaimed' && (
            <g>
              <rect x={95} y={102} width={570} height={42} fill="var(--pd-disc-soft)" stroke="var(--pd-disc)" strokeDasharray="4 3" />
              <text x={380} y={88} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--pd-disc)">
                {t('Role A (Support) -> Temporary Shift -> Swiftly Reclaimed Back to Direction A')}
              </text>
              <path d="M 110 64 L 220 122 L 295 162 L 420 82 L 515 122 L 650 48" fill="none" stroke="var(--pd-disc)" strokeWidth={2.8} />
              <circle cx={220} cy={122} r={5} fill="var(--pd-indigo)" />
              <circle cx={295} cy={162} r={5} fill="var(--pd-prem)" />
              <circle cx={515} cy={122} r={6} fill="var(--pd-disc)" />
              <text x={220} y={150} textAnchor="middle" fontSize={9.5} fill="var(--pd-indigo)">{t('1. Initial Support')}</text>
              <text x={295} y={182} textAnchor="middle" fontSize={9.5} fill="var(--pd-prem)">{t('2. Brief Dip')}</text>
              <text x={515} y={158} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--pd-disc)">{t('3. Reclaimed Support')}</text>
            </g>
          )}
        </svg>
      </div>
      <figcaption className="pd-figcaption">
        <strong>{t(meta.title)}:</strong> {t(meta.note)}
      </figcaption>
    </figure>
  );
}

/** 6. Animated Price Delivery Continuum (IRL <-> ERL Cycle) */
function PdContinuumFlow() {
  const { t } = useTranslation();
  const [stage, setStage] = useState(3);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStage((s) => (s >= 4 ? 1 : s + 1));
    }, 1100);
    return () => window.clearInterval(id);
  }, [playing]);

  const stageCaptions = [
    '1. Sweep SSL (ERL Low) at bottom range boundary',
    '2. Displace upward past 50% Eq, leaving Discount IRL FVG',
    '3. Pull back into Discount IRL (FVG/OB) below 50% Equilibrium',
    '4. Expand cleanly across Equilibrium to purge BSL (ERL High)',
  ];

  return (
    <figure className="pd-figure" data-pd-array-figure="pd-continuum-flow">
      <div className="pd-figure-head">
        <span className="pd-head-title">
          <Activity size={16} aria-hidden="true" />
          <span>{t('Animated Price Delivery Continuum (IRL <-> ERL Cycle)')}</span>
        </span>
        <div className="pd-controls">
          <button type="button" className="pd-btn is-primary" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{t(playing ? 'Pause' : 'Animate Cycle')}</span>
          </button>
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              type="button"
              className={`pd-btn ${stage === num ? 'is-active' : ''}`}
              onClick={() => {
                setPlaying(false);
                setStage(num);
              }}
            >
              {t(`Step ${num}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="pd-figure-body">
        <svg viewBox="0 0 760 230" className="pd-svg" role="img" aria-label={t('Internal to External liquidity continuum cycle')}>
          <line x1={65} y1={42} x2={695} y2={42} stroke="var(--pd-prem)" strokeWidth={1.6} strokeDasharray="5 3" />
          <text x={72} y={33} fontSize={10.5} fontWeight={700} fill="var(--pd-prem)">{t('ERL HIGH (BSL Target Terminus)')}</text>

          <line x1={65} y1={115} x2={695} y2={115} stroke="var(--pd-indigo)" strokeWidth={1.8} strokeDasharray="4 4" />
          <text x={590} y={108} fontSize={10.5} fontWeight={700} fill="var(--pd-indigo)">{t('50% Equilibrium')}</text>

          <rect x={280} y={134} width={220} height={36} rx={4} fill="var(--pd-disc-soft)" stroke="var(--pd-disc)" strokeDasharray="3 3" />
          <text x={390} y={156} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--pd-disc)">
            {t('Discount IRL (FVG / Order Block)')}
          </text>

          <line x1={65} y1={194} x2={695} y2={194} stroke="var(--pd-disc)" strokeWidth={1.6} strokeDasharray="5 3" />
          <text x={72} y={212} fontSize={10.5} fontWeight={700} fill="var(--pd-disc)">{t('ERL LOW (SSL Purge Boundary)')}</text>

          <path
            d={
              stage === 1
                ? 'M 95 162 L 160 202 L 195 178'
                : stage === 2
                  ? 'M 95 162 L 160 202 L 290 78'
                  : stage === 3
                    ? 'M 95 162 L 160 202 L 290 78 L 415 152'
                    : 'M 95 162 L 160 202 L 290 78 L 415 152 L 620 34'
            }
            fill="none"
            stroke="var(--pd-ink)"
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <circle cx={160} cy={202} r={5.5} fill="var(--pd-disc)" />
          {stage >= 3 && <circle cx={415} cy={152} r={6} fill="var(--pd-indigo)" />}
          {stage >= 4 && <circle cx={620} cy={34} r={6} fill="var(--pd-prem)" />}
        </svg>
      </div>
      <figcaption className="pd-figcaption">
        <strong>{t(stageCaptions[stage - 1])}</strong>
      </figcaption>
    </figure>
  );
}

/** 7. Interactive 6-Gate PD Array Qualification Grader */
function PdConfluenceGrader() {
  const { t } = useTranslation();
  const [gates, setGates] = useState({
    anchorsFrozen: true,
    correctHalf: true,
    opposingDrawClear: true,
    unmitigatedArray: true,
    activeSession: true,
    ltfConfirmation: true,
  });

  const result = evaluatePdConfluence(gates);

  const toggle = (k: keyof typeof gates) =>
    setGates((prev) => ({ ...prev, [k]: !prev[k] }));

  const items: Array<{ key: keyof typeof gates; label: string }> = [
    { key: 'anchorsFrozen', label: 'Completed Dealing Range Anchors Frozen Upfront' },
    { key: 'correctHalf', label: 'Aligned Range Half (Buy <50% Discount / Sell >50% Premium)' },
    { key: 'opposingDrawClear', label: 'Clear Opposing External Draw on Liquidity (BSL/SSL)' },
    { key: 'unmitigatedArray', label: 'Unmitigated PD Array With Defined CE or MT Anchor' },
    { key: 'activeSession', label: 'Active London or New York Session (America/New_York)' },
    { key: 'ltfConfirmation', label: 'Confirmed Lower-Timeframe MSS / CISD Trigger' },
  ];

  return (
    <figure className="pd-figure" data-pd-array-figure="pd-confluence-grader">
      <div className="pd-figure-head">
        <span className="pd-head-title">
          <Sparkles size={16} aria-hidden="true" />
          <span>{t('Interactive 6-Gate PD Array Qualification Lab')}</span>
        </span>
      </div>

      <div className="pd-gate-grid">
        <div className="pd-gate-toggles">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`pd-gate-btn ${gates[item.key] ? 'is-on' : 'is-off'}`}
              onClick={() => toggle(item.key)}
            >
              <span>{gates[item.key] ? '✓' : '✕'}</span>
              <span>{t(item.label)}</span>
            </button>
          ))}
        </div>

        <div className={`pd-gate-verdict is-${result.grade}`}>
          <strong>{t(result.label)}</strong>
          <p>{t(result.note)}</p>
        </div>
      </div>
      <figcaption className="pd-figcaption">
        {t('Toggle individual structural gates to see why unconfirmed locations or shifting anchors fail setup qualification.')}
      </figcaption>
    </figure>
  );
}

/** 8. Interactive Multi-Timeframe Nested Quadrant Map */
function PdMtfNesting() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<PdMtfTier['id']>('intraday');
  const current = pdMtfProfiles.find((p) => p.id === activeId) || pdMtfProfiles[0];

  return (
    <figure className="pd-figure" data-pd-array-figure="pd-mtf-nesting">
      <div className="pd-figure-head">
        <span className="pd-head-title">
          <Compass size={16} aria-hidden="true" />
          <span>{t('Interactive Multi-Timeframe Fractal Nesting Map (Price = 20,180)')}</span>
        </span>
        <div className="pd-controls">
          {pdMtfProfiles.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`pd-btn ${activeId === p.id ? 'is-active' : ''}`}
              onClick={() => setActiveId(p.id)}
            >
              {t(p.timeframe)}
            </button>
          ))}
        </div>
      </div>

      <div className="pd-mtf-grid">
        {pdMtfProfiles.map((tier) => (
          <button
            key={tier.id}
            type="button"
            className={`pd-mtf-card ${activeId === tier.id ? 'is-active' : ''}`}
            onClick={() => setActiveId(tier.id)}
          >
            <div className="pd-mtf-tf">{t(tier.timeframe)}</div>
            <div className="pd-mtf-range">{t(tier.rangeLabel)}</div>
            <div className="pd-mtf-zone">{t(tier.currentZone)}</div>
          </button>
        ))}
      </div>

      <div className="pd-mtf-detail">
        <strong>{t(current.timeframe)} — {t(current.role)}:</strong> {t(current.nestedTruth)}
      </div>

      <figcaption className="pd-figcaption">
        {t('The exact same price (20,180) reads as Discount on Weekly/4H charts yet Premium inside a tiny 15M swing—wait for 15M Discount inside 4H Discount.')}
      </figcaption>
    </figure>
  );
}

/** 9. 4-Panel Common Mistakes Stick-Figure Gallery */
function PdMistakesComic() {
  const { t } = useTranslation();
  const [mistakeIdx, setMistakeIdx] = useState(0);
  const mistakes = [
    {
      tab: '1. 80% Premium Long',
      badTitle: 'Trap: Buying Clean 1M FVG at 80% Premium',
      badMsg: 'It is a 1M FVG! Who cares about Eq?',
      fixTitle: 'Fix: Respect 50% Equilibrium Ceiling',
      fixMsg: 'Too close to Range High. Wait for Discount.',
    },
    {
      tab: '2. Anchor Shifting',
      badTitle: 'Trap: Sliding Range to 60 Days Post-Loss',
      badMsg: 'Actually let me drag Low lower... fixed!',
      fixTitle: 'Fix: Freeze Declared Anchors Before Entry',
      fixMsg: 'Keep 20-day loss honest for true data.',
    },
    {
      tab: '3. Counter-HTF Short',
      badTitle: 'Trap: Shorting Into Weekly Discount OB',
      badMsg: '5M looks weak, full size short here!',
      fixTitle: 'Fix: Nest HTF Narrative First',
      fixMsg: 'Weekly Discount favors reversals upward.',
    },
    {
      tab: '4. Blind Touch Fill',
      badTitle: 'Trap: Front-Running Knife Without LTF MSS',
      badMsg: 'Limit order placed! Price will bounce!',
      fixTitle: 'Fix: Require LTF Displacement Shift',
      fixMsg: 'Let 1M/5M MSS prove buyers stepped in.',
    },
  ];
  const m = mistakes[mistakeIdx];

  return (
    <figure className="pd-figure" data-pd-array-figure="pd-mistakes-comic">
      <div className="pd-figure-head">
        <span className="pd-head-title">
          <AlertTriangle size={16} aria-hidden="true" />
          <span>{t('Stick-Figure Mistakes Gallery: Four Traps to Eliminate')}</span>
        </span>
        <div className="pd-controls">
          {mistakes.map((item, idx) => (
            <button
              key={item.tab}
              type="button"
              className={`pd-btn ${mistakeIdx === idx ? 'is-active' : ''}`}
              onClick={() => setMistakeIdx(idx)}
            >
              {t(item.tab)}
            </button>
          ))}
        </div>
      </div>

      <div className="pd-figure-body">
        <svg viewBox="0 0 760 220" className="pd-svg" role="img" aria-label={t(m.badTitle)}>
          <rect x={10} y={14} width={360} height={192} rx={10} fill="var(--pd-danger-soft)" stroke="var(--pd-danger)" strokeOpacity={0.45} />
          <text x={28} y={40} fontSize={12} fontWeight={700} fill="var(--pd-danger)">{t(m.badTitle)}</text>
          <StickFigure x={68} y={154} color="var(--pd-danger)" pose="panic" />
          <rect x={108} y={102} width={242} height={42} rx={8} fill="var(--pd-paper)" stroke="var(--pd-danger)" />
          <text x={229} y={127} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--pd-ink)">
            {t(m.badMsg)}
          </text>

          <rect x={390} y={14} width={360} height={192} rx={10} fill="var(--pd-disc-soft)" stroke="var(--pd-disc)" strokeOpacity={0.45} />
          <text x={408} y={40} fontSize={12} fontWeight={700} fill="var(--pd-disc)">{t(m.fixTitle)}</text>
          <StickFigure x={448} y={154} color="var(--pd-disc)" pose="cheer" />
          <rect x={488} y={102} width={242} height={42} rx={8} fill="var(--pd-paper)" stroke="var(--pd-disc)" />
          <text x={609} y={127} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--pd-ink)">
            {t(m.fixMsg)}
          </text>
        </svg>
      </div>
      <figcaption className="pd-figcaption">
        {t('Click any tab above to compare common Premium/Discount errors against clean matrix discipline.')}
      </figcaption>
    </figure>
  );
}

export function PdArrayVisual({
  kind,
  staticOnly = false,
}: {
  kind: PdArrayVisualKind;
  staticOnly?: boolean;
}) {
  switch (kind) {
    case 'pd-comic-intro':
      return <PdComicIntro />;
    case 'pd-matrix-3d-cinema':
      return <PdArrayScene staticOnly={staticOnly} />;
    case 'pd-dealing-range-calculator':
      return <PdDealingRangeCalculator />;
    case 'pd-hierarchy-stack':
      return <PdHierarchyStack />;
    case 'pd-gap-variants-dissection':
      return <PdGapVariantsDissection />;
    case 'pd-continuum-flow':
      return <PdContinuumFlow />;
    case 'pd-confluence-grader':
      return <PdConfluenceGrader />;
    case 'pd-mtf-nesting':
      return <PdMtfNesting />;
    case 'pd-mistakes-comic':
      return <PdMistakesComic />;
    default:
      return null;
  }
}
