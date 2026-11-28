import React, { useMemo, useState } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import { computeRangeQuartiles } from '../utils/breadButterMath';
import { BreadButterScene } from './BreadButterScene';
import { BreadButterExtendedVisual } from './BreadButterExtendedVisuals';

interface VisualProps {
  visualId: string;
  staticOnly?: boolean;
}

/* 1. Stick-Figure Bakery Routine vs. Mid-Range Chaser */
const StickFigureBakeryVisual: React.FC = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'baker' | 'chaser'>('baker');

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="stick-figure-bakery">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 1 · Visual Analogy · Stick-Figure Contrast')}</span>
        <h3 className="bb70-visual-title">{t('The Daily Bakery Routine vs. The Mid-Range Chaser')}</h3>
        <p className="bb70-visual-desc">
          {t('Switch between the calm Bread-and-Butter routine (mark box early, wait for sweep + retest) and impulsive mid-range clicking.')}
        </p>
      </div>

      <div className="bb70-controls">
        <button
          type="button"
          className="bb70-btn"
          aria-pressed={mode === 'baker'}
          onClick={() => setMode('baker')}
        >
          {t('Disciplined Baker (Bread-and-Butter)')}
        </button>
        <button
          type="button"
          className="bb70-btn"
          aria-pressed={mode === 'chaser'}
          onClick={() => setMode('chaser')}
        >
          {t('Mid-Range Chaser (Impulsive)')}
        </button>
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 260" className="bb70-svg" role="img" aria-label={t('Stick figure comparison of Bread-and-Butter routine versus chasing')}>
          <rect x="0" y="0" width="720" height="260" rx="10" fill="var(--bb70-surface)" />
          {/* Left Panel: Stick-Figure Character */}
          <rect x="18" y="20" width="230" height="220" rx="10" fill={mode === 'baker' ? 'var(--bb70-pine-soft)' : 'var(--bb70-terra-soft)'} stroke={mode === 'baker' ? 'var(--bb70-pine-border)' : 'var(--bb70-terra-border)'} />
          <text x="133" y="44" textAnchor="middle" fontSize="12" fontWeight="700" fill={mode === 'baker' ? 'var(--bb70-pine)' : 'var(--bb70-terra)'}>
            {mode === 'baker' ? t('Prep -> Wait -> Execute') : t('Click -> Chase -> Tilt')}
          </text>
          {/* Stick Figure */}
          <circle cx="133" cy="96" r="18" fill="none" stroke="var(--bb70-ink)" strokeWidth="2.8" />
          {mode === 'baker' ? (
            <>
              <circle cx="127" cy="93" r="2" fill="var(--bb70-ink)" />
              <circle cx="139" cy="93" r="2" fill="var(--bb70-ink)" />
              <path d="M126 102 Q133 108 140 102" fill="none" stroke="var(--bb70-pine)" strokeWidth="2.4" strokeLinecap="round" />
              {/* Chef/Routine Hat */}
              <path d="M117 81 C114 68 152 68 149 81 Z" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" strokeWidth="2" />
              {/* Calm Torso & Arms holding checklist */}
              <line x1="133" y1="114" x2="133" y2="168" stroke="var(--bb70-ink)" strokeWidth="2.8" />
              <line x1="133" y1="128" x2="104" y2="148" stroke="var(--bb70-ink)" strokeWidth="2.6" />
              <line x1="133" y1="128" x2="164" y2="142" stroke="var(--bb70-ink)" strokeWidth="2.6" />
              <rect x="158" y="128" width="28" height="34" rx="4" fill="var(--bb70-surface)" stroke="var(--bb70-cerulean)" strokeWidth="2" />
              <line x1="164" y1="138" x2="180" y2="138" stroke="var(--bb70-pine)" strokeWidth="2" />
              <line x1="164" y1="146" x2="180" y2="146" stroke="var(--bb70-pine)" strokeWidth="2" />
              <line x1="164" y1="154" x2="176" y2="154" stroke="var(--bb70-pine)" strokeWidth="2" />
            </>
          ) : (
            <>
              <line x1="124" y1="90" x2="130" y2="95" stroke="var(--bb70-terra)" strokeWidth="2" />
              <line x1="130" y1="90" x2="124" y2="95" stroke="var(--bb70-terra)" strokeWidth="2" />
              <line x1="136" y1="90" x2="142" y2="95" stroke="var(--bb70-terra)" strokeWidth="2" />
              <line x1="142" y1="90" x2="136" y2="95" stroke="var(--bb70-terra)" strokeWidth="2" />
              <path d="M126 106 Q133 99 140 106" fill="none" stroke="var(--bb70-terra)" strokeWidth="2.4" strokeLinecap="round" />
              {/* Frantic Torso & Flailing Arms */}
              <line x1="133" y1="114" x2="133" y2="168" stroke="var(--bb70-ink)" strokeWidth="2.8" />
              <line x1="133" y1="128" x2="98" y2="108" stroke="var(--bb70-ink)" strokeWidth="2.6" />
              <line x1="133" y1="128" x2="170" y2="106" stroke="var(--bb70-ink)" strokeWidth="2.6" />
              <text x="176" y="102" fontSize="14" fontWeight="700" fill="var(--bb70-terra)">?!</text>
            </>
          )}
          <line x1="133" y1="168" x2="115" y2="205" stroke="var(--bb70-ink)" strokeWidth="2.8" />
          <line x1="133" y1="168" x2="151" y2="205" stroke="var(--bb70-ink)" strokeWidth="2.8" />
          <text x="133" y="226" textAnchor="middle" fontSize="11" fill="var(--bb70-muted)">
            {mode === 'baker' ? t('1 Clean Setup · Modest Target') : t('5 Random Clicks · Chased Stop')}
          </text>

          {/* Right Panel: Mini Chart Behavior */}
          <rect x="268" y="20" width="434" height="220" rx="10" fill="var(--bb70-stage-bg)" stroke="var(--bb70-border)" />
          {/* Pre-Open Box */}
          <rect x="288" y="84" width="142" height="86" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" strokeWidth="1.5" />
          <line x1="288" y1="127" x2="682" y2="127" stroke="var(--bb70-ochre)" strokeDasharray="4 4" strokeWidth="1.2" />
          <text x="359" y="76" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-cerulean)">
            {t('Pre-Open Box')}
          </text>
          <text x="646" y="122" textAnchor="end" fontSize="10" fontWeight="600" fill="var(--bb70-ochre)">
            {t('50% Midpoint')}
          </text>

          {/* Price Path */}
          <polyline
            points="296,130 322,102 350,152 380,96 410,156 446,192 486,118 524,148 584,96 646,54"
            fill="none"
            stroke="var(--bb70-ink)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {mode === 'baker' ? (
            <>
              <circle cx="446" cy="192" r="5" fill="var(--bb70-terra)" />
              <text x="446" y="212" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-terra)">
                {t('1. Sweep')}
              </text>
              <circle cx="524" cy="148" r="6" fill="var(--bb70-pine)" />
              <text x="536" y="164" fontSize="10.5" fontWeight="700" fill="var(--bb70-pine)">
                {t('2. FVG Limit Fill')}
              </text>
              <circle cx="646" cy="54" r="6" fill="var(--bb70-cerulean)" />
              <text x="640" y="42" textAnchor="end" fontSize="10.5" fontWeight="700" fill="var(--bb70-cerulean)">
                {t('3. Modest Target')}
              </text>
            </>
          ) : (
            <>
              <circle cx="350" cy="134" r="6" fill="var(--bb70-terra)" />
              <circle cx="392" cy="118" r="6" fill="var(--bb70-terra)" />
              <circle cx="446" cy="192" r="6" fill="var(--bb70-terra)" />
              <text x="456" y="206" fontSize="10.5" fontWeight="700" fill="var(--bb70-terra)">
                {t('Stopped Out in Chop & Panic-Sold the Sweep!')}
              </text>
            </>
          )}
        </svg>
      </div>
    </figure>
  );
};

/* 2. Interactive Range Anatomy & Quartiles Explorer */
const RangeAnatomyVisual: React.FC = () => {
  const { t } = useTranslation();
  const [boxLow, setBoxLow] = useState(1.0800);
  const [boxWidthPips, setBoxWidthPips] = useState(30);

  const quartiles = useMemo(
    () => computeRangeQuartiles(boxLow, boxLow + boxWidthPips / 10000),
    [boxLow, boxWidthPips],
  );

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="range-anatomy-explorer">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 2 · Interactive Box Lab · Synthetic EUR/USD Example')}</span>
        <h3 className="bb70-visual-title">{t('Consolidation Box Anatomy & Quartile Zones')}</h3>
        <p className="bb70-visual-desc">
          {t('Adjust the pre-breakout box width to inspect how Buy-Side Liquidity (100%), Upper Quartile (75%), Equilibrium (50%), Lower Quartile (25%), and Sell-Side Liquidity (0%) align.')}
        </p>
      </div>

      <div className="bb70-slider-grid">
        <div className="bb70-slider-field">
          <label htmlFor="bb70-box-low">
            <span>{t('Consolidation Low')}</span>
            <span>{boxLow.toFixed(4)}</span>
          </label>
          <input
            id="bb70-box-low"
            type="range"
            min="1.0750"
            max="1.0850"
            step="0.0010"
            value={boxLow}
            onChange={(e) => setBoxLow(Number(e.target.value))}
          />
        </div>
        <div className="bb70-slider-field">
          <label htmlFor="bb70-box-width">
            <span>{t('Box Width (pips)')}</span>
            <span>{boxWidthPips} pips</span>
          </label>
          <input
            id="bb70-box-width"
            type="range"
            min="16"
            max="52"
            step="2"
            value={boxWidthPips}
            onChange={(e) => setBoxWidthPips(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 260" className="bb70-svg" role="img" aria-label={t('Consolidation range quartiles diagram')}>
          <rect x="0" y="0" width="720" height="260" rx="10" fill="var(--bb70-surface)" />
          {/* External BSL & SSL Zones */}
          <rect x="70" y="18" width="440" height="30" rx="5" fill="var(--bb70-terra-soft)" stroke="var(--bb70-terra-border)" />
          <text x="290" y="37" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bb70-terra)">
            {t('External Buy-Side Liquidity (Resting Buy Stops Above High)')}
          </text>

          {/* 4 Quartile Bands */}
          <rect x="70" y="54" width="440" height="38" fill="var(--bb70-cerulean-soft)" opacity="0.85" />
          <rect x="70" y="92" width="440" height="76" fill="var(--bb70-ochre-soft)" opacity="0.7" />
          <rect x="70" y="168" width="440" height="38" fill="var(--bb70-pine-soft)" opacity="0.85" />
          <rect x="70" y="54" width="440" height="152" fill="none" stroke="var(--bb70-cerulean)" strokeWidth="1.8" />

          {/* Dividing lines */}
          <line x1="70" y1="92" x2="510" y2="92" stroke="var(--bb70-border)" strokeDasharray="3 3" />
          <line x1="70" y1="130" x2="510" y2="130" stroke="var(--bb70-ochre)" strokeWidth="1.6" strokeDasharray="5 3" />
          <line x1="70" y1="168" x2="510" y2="168" stroke="var(--bb70-border)" strokeDasharray="3 3" />

          {/* Sample Oscillating Candles */}
          <polyline
            points="96,134 142,66 196,192 252,72 308,186 364,62 422,196 476,122"
            fill="none"
            stroke="var(--bb70-ink)"
            strokeWidth="2.2"
          />

          {/* Zone Labels Inside */}
          <text x="290" y="77" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--bb70-cerulean)">
            {t('Upper Quartile (75%–100%) · Premium')}
          </text>
          <text x="290" y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bb70-ochre)">
            {t('Equilibrium Chop Core (Avoid New Entries)')}
          </text>
          <text x="290" y="191" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--bb70-pine)">
            {t('Lower Quartile (0%–25%) · Discount')}
          </text>

          {/* External SSL Zone */}
          <rect x="70" y="212" width="440" height="30" rx="5" fill="var(--bb70-pine-soft)" stroke="var(--bb70-pine-border)" />
          <text x="290" y="231" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bb70-pine)">
            {t('External Sell-Side Liquidity (Resting Sell Stops Below Low)')}
          </text>

          {/* Right-Margin Price Badges */}
          {[
            { y: 54, label: `100% · ${quartiles.high.toFixed(4)}`, color: 'var(--bb70-cerulean)' },
            { y: 92, label: `75% · ${quartiles.upperQuartile.toFixed(4)}`, color: 'var(--bb70-muted)' },
            { y: 130, label: `50% · ${quartiles.equilibrium.toFixed(4)}`, color: 'var(--bb70-ochre)' },
            { y: 168, label: `25% · ${quartiles.lowerQuartile.toFixed(4)}`, color: 'var(--bb70-muted)' },
            { y: 206, label: `0% · ${quartiles.low.toFixed(4)}`, color: 'var(--bb70-cerulean)' },
          ].map((row) => (
            <g key={row.label}>
              <line x1="510" y1={row.y} x2="526" y2={row.y} stroke={row.color} strokeWidth="1.4" />
              <rect x="526" y={row.y - 11} width="176" height="22" rx="5" fill="var(--bb70-stage-bg)" stroke={row.color} />
              <text x="614" y={row.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bb70-ink)">
                {row.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </figure>
  );
};

/* 3. Interactive Four-Stage Market Delivery Cycle Stepper */
const MarketCycleStepperVisual: React.FC = () => {
  const { t } = useTranslation();
  const [stage, setStage] = useState(0);

  const stages = [
    {
      title: '1. Consolidation',
      desc: 'Candles compress horizontally around 50% equilibrium. Orders build outside the ceiling and floor; stay patient and mark boundaries.',
    },
    {
      title: '2. Expansion',
      desc: 'Energetic displacement leaves the consolidation box, breaks interior structure, and prints a clean Fair Value Gap or Order Block.',
    },
    {
      title: '3. Retracement',
      desc: 'Price pulls back partially into the displacement FVG/OB without breaking structural invalidation — the primary Bread-and-Butter entry window.',
    },
    {
      title: '4. Reversal / Target',
      desc: 'Price reaches the opposing higher-timeframe liquidity pool, where momentum either reverses or settles into a fresh consolidation.',
    },
  ];

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="market-cycle-stepper">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 3 · Four-State Descriptive Cycle · Synthetic Model')}</span>
        <h3 className="bb70-visual-title">{t('Consolidation -> Expansion -> Retracement -> Reversal')}</h3>
      </div>

      <div className="bb70-controls">
        {stages.map((s, idx) => (
          <button
            key={s.title}
            type="button"
            className="bb70-btn"
            aria-pressed={stage === idx}
            onClick={() => setStage(idx)}
          >
            {t(s.title)}
          </button>
        ))}
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 220" className="bb70-svg" role="img" aria-label={t('Four-stage market delivery cycle diagram')}>
          <rect x="0" y="0" width="720" height="220" rx="10" fill="var(--bb70-surface)" />
          {/* Stage 1 Box */}
          <rect x="26" y="106" width="150" height="72" rx="6" fill={stage === 0 ? 'var(--bb70-cerulean-soft)' : 'var(--bb70-stage-bg)'} stroke="var(--bb70-cerulean)" strokeWidth={stage === 0 ? 2.4 : 1.2} />
          <text x="101" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bb70-cerulean)">{t('1. Consolidation')}</text>
          <polyline points="38,144 64,122 92,162 122,120 154,158 176,138" fill="none" stroke="var(--bb70-ink)" strokeWidth="2.3" />

          {/* Stage 2 Expansion */}
          <rect x="196" y="42" width="144" height="136" rx="6" fill={stage === 1 ? 'var(--bb70-pine-soft)' : 'transparent'} stroke={stage === 1 ? 'var(--bb70-pine)' : 'var(--bb70-border)'} strokeDasharray={stage === 1 ? undefined : '4 4'} strokeWidth={stage === 1 ? 2.2 : 1.1} />
          <text x="268" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bb70-pine)">{t('2. Expansion')}</text>
          <polyline points="176,138 222,168 258,108 308,58" fill="none" stroke="var(--bb70-pine)" strokeWidth="3" />
          <rect x="236" y="96" width="84" height="26" fill="var(--bb70-pine-soft)" stroke="var(--bb70-pine)" strokeDasharray="3 2" />
          <text x="278" y="113" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--bb70-pine)">FVG</text>

          {/* Stage 3 Retracement */}
          <rect x="360" y="42" width="146" height="136" rx="6" fill={stage === 2 ? 'var(--bb70-ochre-soft)' : 'transparent'} stroke={stage === 2 ? 'var(--bb70-ochre)' : 'var(--bb70-border)'} strokeDasharray={stage === 2 ? undefined : '4 4'} strokeWidth={stage === 2 ? 2.2 : 1.1} />
          <text x="433" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bb70-ochre)">{t('3. Retracement')}</text>
          <polyline points="308,58 378,76 426,112 490,46" fill="none" stroke="var(--bb70-ochre)" strokeWidth="2.8" />
          <circle cx="426" cy="112" r="6" fill="var(--bb70-pine)" />
          <text x="426" y="132" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--bb70-pine)">{t('Entry Zone')}</text>

          {/* Stage 4 Reversal / Target */}
          <rect x="526" y="42" width="168" height="136" rx="6" fill={stage === 3 ? 'var(--bb70-terra-soft)' : 'transparent'} stroke={stage === 3 ? 'var(--bb70-terra)' : 'var(--bb70-border)'} strokeDasharray={stage === 3 ? undefined : '4 4'} strokeWidth={stage === 3 ? 2.2 : 1.1} />
          <text x="610" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bb70-terra)">{t('4. Reversal / Target')}</text>
          <line x1="538" y1="54" x2="682" y2="54" stroke="var(--bb70-terra)" strokeWidth="1.5" strokeDasharray="4 3" />
          <polyline points="490,46 566,40 618,96 672,148" fill="none" stroke="var(--bb70-terra)" strokeWidth="2.6" />
          <text x="610" y="196" textAnchor="middle" fontSize="10" fill="var(--bb70-muted)">{t('Opposing Liquidity Draw')}</text>
        </svg>
      </div>

      <div className="bb70-extract" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
        <p style={{ marginBottom: 0 }}>{t(stages[stage].desc)}</p>
      </div>
    </figure>
  );
};

/* 4. Interactive Power of 3 (AMD) Daily Candle-to-Intraday Projector */
const AmdPowerOfThreeVisual: React.FC = () => {
  const { t } = useTranslation();
  const [direction, setDirection] = useState<'bullish' | 'bearish'>('bullish');

  const isBull = direction === 'bullish';

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="amd-power-of-three">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 4 · Power of 3 (AMD) · Daily Bar vs. 15m Structure')}</span>
        <h3 className="bb70-visual-title">{t('How One Daily Candle Maps Onto Accumulation, Manipulation & Distribution')}</h3>
      </div>

      <div className="bb70-controls">
        <button type="button" className="bb70-btn" aria-pressed={isBull} onClick={() => setDirection('bullish')}>
          {t('Bullish AMD Day (Sweep Low -> Expand Up)')}
        </button>
        <button type="button" className="bb70-btn" aria-pressed={!isBull} onClick={() => setDirection('bearish')}>
          {t('Bearish AMD Day (Sweep High -> Expand Down)')}
        </button>
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 250" className="bb70-svg" role="img" aria-label={t('Power of 3 daily candle to intraday chart projection')}>
          <rect x="0" y="0" width="720" height="250" rx="10" fill="var(--bb70-surface)" />
          {/* Left: Single Daily Candle */}
          <rect x="20" y="20" width="150" height="210" rx="8" fill="var(--bb70-stage-bg)" stroke="var(--bb70-border)" />
          <text x="95" y="40" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bb70-ink)">
            {t('1 Daily Candle')}
          </text>
          <line x1="95" y1="58" x2="95" y2="212" stroke="var(--bb70-ink)" strokeWidth="2.5" />
          <rect
            x="71"
            y={isBull ? 76 : 86}
            width="48"
            height="94"
            rx="4"
            fill={isBull ? 'var(--bb70-pine)' : 'var(--bb70-terra)'}
          />
          <text x="95" y={isBull ? 186 : 70} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--bb70-ochre)">
            {t('Open')}
          </text>
          <text x="95" y={isBull ? 224 : 52} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--bb70-terra)">
            {t('Wick = Manipulation')}
          </text>

          {/* Projection Dashed Connector */}
          <line x1="170" y1={isBull ? 170 : 86} x2="210" y2={isBull ? 170 : 86} stroke="var(--bb70-ochre)" strokeDasharray="4 3" strokeWidth="1.5" />

          {/* Right: Intraday 15m Chart */}
          <rect x="210" y="20" width="490" height="210" rx="8" fill="var(--bb70-stage-bg)" stroke="var(--bb70-border)" />
          {/* 00:00 NY Open Line */}
          <line x1="220" y1={isBull ? 170 : 86} x2="690" y2={isBull ? 170 : 86} stroke="var(--bb70-ochre)" strokeDasharray="5 4" strokeWidth="1.4" />
          <text x="684" y={isBull ? 164 : 80} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--bb70-ochre)">
            {t('00:00 NY Midnight Open')}
          </text>

          {/* A: Accumulation Box */}
          <rect
            x="228"
            y={isBull ? 148 : 66}
            width="126"
            height="44"
            fill="var(--bb70-cerulean-soft)"
            stroke="var(--bb70-cerulean)"
            strokeWidth="1.5"
          />
          <text x="291" y={isBull ? 140 : 58} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-cerulean)">
            {t('A: Accumulation')}
          </text>

          {/* M: Manipulation Sweep Zone */}
          <rect
            x="366"
            y={isBull ? 192 : 34}
            width="84"
            height="30"
            rx="4"
            fill="var(--bb70-terra-soft)"
            stroke="var(--bb70-terra)"
            strokeDasharray="3 2"
          />
          <text x="408" y={isBull ? 211 : 53} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--bb70-terra)">
            {t('M: Judas Sweep')}
          </text>

          {/* D: Distribution Curve */}
          {isBull ? (
            <polyline
              points="236,170 264,154 294,184 324,156 354,182 396,214 438,154 472,174 548,118 648,68"
              fill="none"
              stroke="var(--bb70-pine)"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          ) : (
            <polyline
              points="236,86 264,102 294,72 324,100 354,74 396,42 438,104 472,82 548,142 648,196"
              fill="none"
              stroke="var(--bb70-terra)"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          )}
          <text x="580" y={isBull ? 62 : 214} textAnchor="middle" fontSize="11" fontWeight="700" fill={isBull ? 'var(--bb70-pine)' : 'var(--bb70-terra)'}>
            {t('D: Distribution Leg')}
          </text>
        </svg>
      </div>
    </figure>
  );
};

/* 5. Bullish Bread-and-Butter Buy Anatomy (Variant A vs. Variant B) */
const BuySetupAnatomyVisual: React.FC = () => {
  const { t } = useTranslation();
  const [variant, setVariant] = useState<'sweep' | 'continuation'>('sweep');

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="buy-setup-anatomy">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 5 · Bullish Architecture · Two Valid Buy Variations')}</span>
        <h3 className="bb70-visual-title">{t('Variant A: Offset Sweep-Reclaim vs. Variant B: Re-Accumulation Continuation')}</h3>
      </div>

      <div className="bb70-controls">
        <button type="button" className="bb70-btn" aria-pressed={variant === 'sweep'} onClick={() => setVariant('sweep')}>
          {t('Variant A: Sweep & Reclaim')}
        </button>
        <button type="button" className="bb70-btn" aria-pressed={variant === 'continuation'} onClick={() => setVariant('continuation')}>
          {t('Variant B: Re-Accumulation Continuation')}
        </button>
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 245" className="bb70-svg" role="img" aria-label={t('Bullish Bread-and-Butter setup anatomy')}>
          <rect x="0" y="0" width="720" height="245" rx="10" fill="var(--bb70-surface)" />
          {/* Box */}
          <rect x="44" y="102" width="186" height="72" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" strokeWidth="1.6" />
          <text x="137" y="94" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-cerulean)">
            {variant === 'sweep' ? t('Asian Consolidation Box') : t('Mid-Trend Re-Accumulation Box')}
          </text>

          {variant === 'sweep' ? (
            <>
              <polyline points="56,142 94,112 134,164 176,110 220,162 278,204 344,120 404,154 510,86 646,44" fill="none" stroke="var(--bb70-pine)" strokeWidth="2.8" strokeLinejoin="round" />
              {/* FVG Pocket */}
              <rect x="330" y="142" width="110" height="22" fill="var(--bb70-pine-soft)" stroke="var(--bb70-pine)" strokeDasharray="3 2" />
              <circle cx="278" cy="204" r="5" fill="var(--bb70-terra)" />
              <text x="278" y="224" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-terra)">{t('1. SSL Sweep Below Box')}</text>
              <circle cx="404" cy="154" r="6" fill="var(--bb70-pine)" />
              <text x="450" y="176" fontSize="10.5" fontWeight="700" fill="var(--bb70-pine)">{t('2. FVG / OB Limit Fill')}</text>
              <line x1="250" y1="214" x2="670" y2="214" stroke="var(--bb70-terra)" strokeDasharray="4 3" strokeWidth="1.3" />
              <text x="668" y="208" textAnchor="end" fontSize="10" fontWeight="700" fill="var(--bb70-terra)">{t('Stop Below Sweep Low')}</text>
              <line x1="44" y1="54" x2="670" y2="54" stroke="var(--bb70-cerulean)" strokeDasharray="4 3" strokeWidth="1.3" />
              <text x="668" y="46" textAnchor="end" fontSize="10.5" fontWeight="700" fill="var(--bb70-cerulean)">{t('3. Opposing BSL Objective')}</text>
            </>
          ) : (
            <>
              <polyline points="20,214 54,162 94,114 134,162 176,112 220,152 310,68 386,104 512,56 646,34" fill="none" stroke="var(--bb70-pine)" strokeWidth="2.8" strokeLinejoin="round" />
              {/* Breakout Retest OB/FVG */}
              <rect x="290" y="92" width="128" height="24" fill="var(--bb70-pine-soft)" stroke="var(--bb70-pine)" strokeDasharray="3 2" />
              <text x="310" y="56" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-cerulean)">{t('1. Clean Upward Displacement')}</text>
              <circle cx="386" cy="104" r="6" fill="var(--bb70-pine)" />
              <text x="412" y="130" fontSize="10.5" fontWeight="700" fill="var(--bb70-pine)">{t('2. Breakout FVG / Box-High Retest')}</text>
              <line x1="220" y1="178" x2="670" y2="178" stroke="var(--bb70-terra)" strokeDasharray="4 3" strokeWidth="1.3" />
              <text x="668" y="172" textAnchor="end" fontSize="10" fontWeight="700" fill="var(--bb70-terra)">{t('Stop Beneath Box Structural Low')}</text>
            </>
          )}
        </svg>
      </div>
    </figure>
  );
};

/* 6. Side-by-Side Bullish vs. Bearish Mirror Blueprint */
const SellVsBuyMirrorVisual: React.FC = () => {
  const { t } = useTranslation();

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="sell-vs-buy-mirror">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 6 · Symmetry Blueprint · Static 2D Comparison')}</span>
        <h3 className="bb70-visual-title">{t('Vertical Mirror: Bread-and-Butter Buy vs. Bearish Sell')}</h3>
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 235" className="bb70-svg" role="img" aria-label={t('Side-by-side bullish and bearish Bread-and-Butter mirror diagrams')}>
          <rect x="0" y="0" width="720" height="235" rx="10" fill="var(--bb70-surface)" />
          {/* Left: Bullish */}
          <rect x="16" y="16" width="336" height="203" rx="8" fill="var(--bb70-stage-bg)" stroke="var(--bb70-pine-border)" />
          <text x="184" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bb70-pine)">
            {t('Bullish Buy Setup (Discount Sweep)')}
          </text>
          <rect x="34" y="96" width="96" height="58" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" />
          <polyline points="42,126 68,104 96,144 126,112 162,184 202,114 236,140 318,62" fill="none" stroke="var(--bb70-pine)" strokeWidth="2.6" />
          <circle cx="162" cy="184" r="4.5" fill="var(--bb70-terra)" />
          <circle cx="236" cy="140" r="5" fill="var(--bb70-pine)" />
          <text x="162" y="202" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--bb70-terra)">{t('Sweep SSL')}</text>
          <text x="242" y="158" fontSize="10" fontWeight="700" fill="var(--bb70-pine)">{t('Buy FVG')}</text>
          <text x="312" y="54" textAnchor="end" fontSize="10" fontWeight="700" fill="var(--bb70-cerulean)">{t('BSL Target')}</text>

          {/* Right: Bearish */}
          <rect x="368" y="16" width="336" height="203" rx="8" fill="var(--bb70-stage-bg)" stroke="var(--bb70-terra-border)" />
          <text x="536" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bb70-terra)">
            {t('Bearish Sell Setup (Premium Sweep)')}
          </text>
          <rect x="386" y="96" width="96" height="58" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" />
          <polyline points="394,126 420,146 448,104 478,138 514,64 554,136 588,108 670,188" fill="none" stroke="var(--bb70-terra)" strokeWidth="2.6" />
          <circle cx="514" cy="64" r="4.5" fill="var(--bb70-terra)" />
          <circle cx="588" cy="108" r="5" fill="var(--bb70-terra)" />
          <text x="514" y="54" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--bb70-terra)">{t('Sweep BSL')}</text>
          <text x="594" y="100" fontSize="10" fontWeight="700" fill="var(--bb70-terra)">{t('Sell FVG')}</text>
          <text x="664" y="204" textAnchor="end" fontSize="10" fontWeight="700" fill="var(--bb70-cerulean)">{t('SSL Target')}</text>
        </svg>
      </div>
    </figure>
  );
};

/* 7. Interactive Four-Outcome Range Resolution Switcher */
const RangeResolutionFilterVisual: React.FC = () => {
  const { t } = useTranslation();
  const [outcome, setOutcome] = useState<'sweep' | 'breakout' | 'runaway' | 'chop'>('sweep');

  const meta = {
    sweep: {
      badge: 'Actionable · Sweep & Reclaim',
      action: 'Wait for bullish displacement back inside the box and rest limit in the FVG/OB pocket.',
      points: '60,126 106,94 152,154 200,98 250,152 310,194 374,114 432,144 540,76 648,46',
      color: 'var(--bb70-pine)',
    },
    breakout: {
      badge: 'Actionable · Trend Breakout & Retest',
      action: 'Do NOT fade consecutive closes above the ceiling; wait for a retest of the broken boundary.',
      points: '60,132 106,102 152,152 200,104 250,144 330,66 392,88 470,56 560,44 648,34',
      color: 'var(--bb70-cerulean)',
    },
    runaway: {
      badge: 'Unfilled 0R · Single-Pass Runaway',
      action: 'Direction is right, but price never returns to the FVG limit. Cancel order cleanly and log 0R.',
      points: '60,126 106,94 152,154 200,98 250,152 310,192 378,108 446,84 544,54 648,34',
      color: 'var(--bb70-ochre)',
    },
    chop: {
      badge: 'Stand Down · Seek-and-Destroy Chop',
      action: 'Price whipsaws above the high AND below the low without sustained displacement. Keep capital flat.',
      points: '60,126 112,96 168,154 236,100 296,192 368,62 444,198 522,68 594,182 648,118',
      color: 'var(--bb70-terra)',
    },
  }[outcome];

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="range-resolution-filter">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 7 · Resolution Decision Filter · 4 Possible Outcomes')}</span>
        <h3 className="bb70-visual-title">{t('How to Read All Four Ways a Consolidation Can Resolve')}</h3>
      </div>

      <div className="bb70-controls">
        <button type="button" className="bb70-btn" aria-pressed={outcome === 'sweep'} onClick={() => setOutcome('sweep')}>
          {t('1. Sweep & Reclaim')}
        </button>
        <button type="button" className="bb70-btn" aria-pressed={outcome === 'breakout'} onClick={() => setOutcome('breakout')}>
          {t('2. Breakout & Retest')}
        </button>
        <button type="button" className="bb70-btn" aria-pressed={outcome === 'runaway'} onClick={() => setOutcome('runaway')}>
          {t('3. Unfilled Runaway')}
        </button>
        <button type="button" className="bb70-btn" aria-pressed={outcome === 'chop'} onClick={() => setOutcome('chop')}>
          {t('4. Seek & Destroy Chop')}
        </button>
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 225" className="bb70-svg" role="img" aria-label={t('Four range resolution outcomes diagram')}>
          <rect x="0" y="0" width="720" height="225" rx="10" fill="var(--bb70-surface)" />
          <rect x="46" y="88" width="214" height="74" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" strokeWidth="1.5" />
          <line x1="260" y1="88" x2="676" y2="88" stroke="var(--bb70-cerulean)" strokeDasharray="4 4" opacity="0.65" />
          <line x1="260" y1="162" x2="676" y2="162" stroke="var(--bb70-cerulean)" strokeDasharray="4 4" opacity="0.65" />
          <polyline points={meta.points} fill="none" stroke={meta.color} strokeWidth="3" strokeLinejoin="round" />
          <rect x="454" y="14" width="248" height="28" rx="6" fill="var(--bb70-stage-bg)" stroke={meta.color} />
          <text x="578" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill={meta.color}>
            {t(meta.badge)}
          </text>
        </svg>
      </div>

      <div className="bb70-extract" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
        <p style={{ marginBottom: 0 }}>{t(meta.action)}</p>
      </div>
    </figure>
  );
};

/* 9. Interactive Institutional Quarter-Point Ruler (.00 / .20 / .50 / .80) */
const InstitutionalLevelsRulerVisual: React.FC = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<'context' | 'trap'>('context');

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="institutional-levels-ruler">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 9 · Quarter-Point Ruler · Reference vs. Forecast')}</span>
        <h3 className="bb70-visual-title">{t('Institutional Figure Levels (.00, .20, .50, .80) Around Range Boundaries')}</h3>
      </div>

      <div className="bb70-controls">
        <button type="button" className="bb70-btn" aria-pressed={view === 'context'} onClick={() => setView('context')}>
          {t('Valid Context: Sweep + Displacement Confirmation')}
        </button>
        <button type="button" className="bb70-btn" aria-pressed={view === 'trap'} onClick={() => setView('trap')}>
          {t('Blind Forecast Trap: Auto-Fading .00 / 85% Sentiment')}
        </button>
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 240" className="bb70-svg" role="img" aria-label={t('Institutional quarter-point price ruler diagram')}>
          <rect x="0" y="0" width="720" height="240" rx="10" fill="var(--bb70-surface)" />
          {[
            { y: 34, label: '1.0900 · Big Figure (.00)', tone: 'var(--bb70-cerulean)' },
            { y: 74, label: '1.0880 · Institutional (.80)', tone: 'var(--bb70-muted)' },
            { y: 124, label: '1.0850 · Mid-Figure (.50)', tone: 'var(--bb70-ochre)' },
            { y: 174, label: '1.0820 · Institutional (.20)', tone: 'var(--bb70-muted)' },
            { y: 214, label: '1.0800 · Big Figure (.00)', tone: 'var(--bb70-cerulean)' },
          ].map((lvl) => (
            <g key={lvl.label}>
              <line x1="28" y1={lvl.y} x2="500" y2={lvl.y} stroke={lvl.tone} strokeDasharray="4 4" opacity="0.65" />
              <rect x="508" y={lvl.y - 11} width="194" height="22" rx="5" fill="var(--bb70-stage-bg)" stroke={lvl.tone} />
              <text x="605" y={lvl.y + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-ink)">
                {t(lvl.label)}
              </text>
            </g>
          ))}

          {view === 'context' ? (
            <>
              <rect x="56" y="164" width="144" height="50" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" />
              <polyline points="68,186 112,170 156,204 200,178 256,226 318,162 368,186 456,118" fill="none" stroke="var(--bb70-pine)" strokeWidth="2.8" />
              <circle cx="256" cy="226" r="5" fill="var(--bb70-terra)" />
              <text x="272" y="232" fontSize="10.5" fontWeight="700" fill="var(--bb70-pine)">
                {t('Sweep below 1.0800 + Confirmed Reclaim')}
              </text>
            </>
          ) : (
            <>
              <polyline points="56,162 140,122 224,78 308,34 392,18 476,8" fill="none" stroke="var(--bb70-terra)" strokeWidth="2.8" />
              <circle cx="308" cy="34" r="6" fill="var(--bb70-terra)" />
              <text x="318" y="54" fontSize="10.5" fontWeight="700" fill="var(--bb70-terra)">
                {t('Blind Short at 1.0900 Run Over!')}
              </text>
            </>
          )}
        </svg>
      </div>
    </figure>
  );
};

export const BreadButterVisual: React.FC<VisualProps> = ({ visualId, staticOnly = false }) => {
  const { t } = useTranslation();

  switch (visualId) {
    case 'stick-figure-bakery':
      return <StickFigureBakeryVisual />;
    case 'range-anatomy-explorer':
      return <RangeAnatomyVisual />;
    case 'market-cycle-stepper':
      return <MarketCycleStepperVisual />;
    case 'amd-power-of-three':
      return <AmdPowerOfThreeVisual />;
    case 'buy-setup-anatomy':
      return <BuySetupAnatomyVisual />;
    case 'sell-vs-buy-mirror':
      return <SellVsBuyMirrorVisual />;
    case 'range-resolution-filter':
      return <RangeResolutionFilterVisual />;
    case 'cinema-3d':
      return (
        <figure className="bb70-visual-card" data-bread-butter-figure="cinema-3d">
          <div className="bb70-visual-head">
            <span className="bb70-visual-eyebrow">{t('Figure 8 · Motion Study 02 · Interactive 3D & Ruler View')}</span>
            <h3 className="bb70-visual-title">{t('3D Consolidation Sweep Sequence Across Three Authored Outcomes')}</h3>
            <p className="bb70-visual-desc">
              {t('Orbit the physical 3D candles, step through all four structural stages, switch to Ruler View, or compare Completed Delivery, Unfilled Runaway, and Breakdown Failure.')}
            </p>
          </div>
          <BreadButterScene staticOnly={staticOnly} />
        </figure>
      );
    case 'institutional-levels-ruler':
      return <InstitutionalLevelsRulerVisual />;
    default:
      return <BreadButterExtendedVisual visualId={visualId} />;
  }
};
