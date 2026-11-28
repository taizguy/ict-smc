import React, { useEffect, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Clock,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Sparkles,
  Ruler,
  Eye,
  AlertTriangle,
  GitBranch,
} from 'lucide-react';

interface ExtendedProps {
  visualId: string;
  t: (s: string) => string;
  staticOnly?: boolean;
}

interface ReplayCandle {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  role?: 'a' | 'origin' | 'sweep' | 'mss' | 'retest' | 'target' | 'spike';
}

const AbcdTimelineAnimVisual: React.FC<{ t: (s: string) => string; staticOnly?: boolean }> = ({
  t,
  staticOnly = false,
}) => {
  const [stage, setStage] = useState<number>(4);
  const [playing, setPlaying] = useState<boolean>(false);

  const stages = [
    {
      badge: '1. Event A',
      title: 'Initial External Reference Swing (Low A = 100)',
      note: 'Sell-side stops begin accumulating beneath the clean swing low at 100.',
      visible: 2,
    },
    {
      badge: '2. Event B',
      title: 'Intervening Origin Swing Saved (High B = 110)',
      note: 'The last up-close candle at High B (106–110) is frozen as the potential order block.',
      visible: 4,
    },
    {
      badge: '3. Event C',
      title: 'External Liquidity Sweep Below A (Low C = 98)',
      note: 'Price drops strictly below 100 to 98, sweeping resting sell-side stops.',
      visible: 6,
    },
    {
      badge: '4. Event D',
      title: 'Confirmed Body-Close MSS Above B (Close D = 112)',
      note: 'A completed candle body closes decisively above 110—officially promoting B into a Bullish Breaker.',
      visible: 8,
    },
    {
      badge: '5. Event E',
      title: 'Polarity Flip Retest Into B From Above (108)',
      note: 'Price returns into 106–110 from above; old resistance is now studied as support.',
      visible: 10,
    },
  ];

  const bars: ReplayCandle[] = [
    { label: '1', open: 105, high: 106, low: 101, close: 102 },
    { label: 'A', open: 102, high: 104, low: 100, close: 103.5, role: 'a' },
    { label: '3', open: 103.5, high: 107.2, low: 103, close: 106.5 },
    { label: 'B', open: 106.5, high: 110, low: 106, close: 109.5, role: 'origin' },
    { label: '5', open: 109.5, high: 109.6, low: 102.5, close: 103 },
    { label: 'C', open: 103, high: 103.5, low: 98, close: 101.2, role: 'sweep' },
    { label: '7', open: 101.2, high: 107.8, low: 101, close: 107.2 },
    { label: 'D', open: 107.2, high: 113, low: 106.8, close: 112, role: 'mss' },
    { label: 'E', open: 112, high: 112.2, low: 107.4, close: 108.6, role: 'retest' },
    { label: '10', open: 108.6, high: 116.4, low: 108.2, close: 115.6, role: 'target' },
  ];

  useEffect(() => {
    if (!playing || staticOnly) return;
    const id = window.setInterval(() => {
      setStage((prev) => {
        if (prev >= stages.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, stages.length]);

  const active = stages[stage];
  const mapY = (p: number) => 24 + ((118 - p) / 22) * 168;

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <GitBranch size={14} className="bb-inline-icon" /> {t('Animated Sequence Player · Chronological Order')}
        </p>
        <h3>{t('Watch A -> B -> C -> D -> E Unfold Bar by Bar')}</h3>
      </div>

      <div className="bb-toolbar-split">
        <div className="bb-control-group">
          <button
            type="button"
            className="bb-ctrl-btn is-primary"
            onClick={() => {
              if (!playing && stage >= stages.length - 1) setStage(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button
            type="button"
            className="bb-ctrl-btn"
            aria-label={t('Previous stage')}
            onClick={() => {
              setPlaying(false);
              setStage((s) => Math.max(0, s - 1));
            }}
          >
            <SkipBack size={14} />
          </button>
          <button
            type="button"
            className="bb-ctrl-btn"
            aria-label={t('Next stage')}
            onClick={() => {
              setPlaying(false);
              setStage((s) => Math.min(stages.length - 1, s + 1));
            }}
          >
            <SkipForward size={14} />
          </button>
          <button
            type="button"
            className="bb-ctrl-btn"
            aria-label={t('Reset scene')}
            onClick={() => {
              setPlaying(false);
              setStage(0);
            }}
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="bb-pill-row">
          {stages.map((s, idx) => (
            <button
              key={s.badge}
              type="button"
              className={`bb-tab-btn bb-num${stage === idx ? ' is-active' : ''}`}
              onClick={() => {
                setPlaying(false);
                setStage(idx);
              }}
            >
              {t(s.badge)}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 680 226" className="bb-svg-stage" role="img" aria-label={t(active.title)}>
        <rect x="0" y="0" width="680" height="226" rx="8" fill="var(--bb-stage-bg)" />
        {[100, 106, 110, 114].map((p) => (
          <g key={p}>
            <line x1="54" y1={mapY(p)} x2="654" y2={mapY(p)} stroke="var(--bb-grid)" strokeDasharray="3 4" />
            <text x="46" y={mapY(p) + 4} textAnchor="end" className="bb-svg-axis">{p}</text>
          </g>
        ))}

        {stage >= 1 && (
          <g>
            <rect
              x="210"
              y={mapY(110)}
              width="444"
              height={mapY(106) - mapY(110)}
              fill={stage >= 3 ? 'var(--bb-cobalt-soft)' : 'var(--bb-amber-soft)'}
              stroke={stage >= 3 ? 'var(--bb-cobalt)' : 'var(--bb-amber)'}
              strokeWidth="1.4"
            />
            <text x="648" y={mapY(110) + 12} textAnchor="end" className={stage >= 3 ? 'bb-svg-tag' : 'bb-svg-tag-amber'}>
              {stage >= 3 ? t('Active Bullish Breaker (106–110)') : t('Saved Origin B (Unbroken)')}
            </text>
          </g>
        )}

        {stage >= 2 && (
          <g>
            <line x1="88" y1={mapY(100)} x2="430" y2={mapY(100)} stroke="var(--bb-emerald)" strokeDasharray="4 3" strokeWidth="1.4" />
            <text x="92" y={mapY(100) + 13} className="bb-svg-tag-emerald">{t('SSL Sweep Below A (98)')}</text>
          </g>
        )}

        {stage >= 3 && (
          <g>
            <line x1="210" y1={mapY(110)} x2="540" y2={mapY(110)} stroke="var(--bb-cobalt)" strokeDasharray="6 3" strokeWidth="1.5" />
            <text x="496" y={mapY(113.5)} textAnchor="middle" className="bb-svg-tag">{t('Body-Close MSS (D)')}</text>
          </g>
        )}

        {bars.slice(0, active.visible).map((c, idx) => {
          const cx = 86 + idx * 58;
          const bull = c.close >= c.open;
          const top = mapY(Math.max(c.open, c.close));
          const bot = mapY(Math.min(c.open, c.close));
          const fill =
            c.role === 'origin'
              ? 'var(--bb-amber)'
              : c.role === 'sweep'
                ? 'var(--bb-rose)'
                : c.role === 'mss' || c.role === 'target'
                  ? 'var(--bb-emerald)'
                  : bull
                    ? 'var(--bb-cobalt)'
                    : 'var(--bb-rose)';
          return (
            <g key={c.label}>
              <line x1={cx} y1={mapY(c.high)} x2={cx} y2={mapY(c.low)} stroke="var(--bb-wick)" strokeWidth="1.9" />
              <rect x={cx - 10} y={top} width="20" height={Math.max(5, bot - top)} fill={fill} rx="2.5" />
              <text x={cx} y="214" textAnchor="middle" className="bb-svg-axis">{c.label}</text>
            </g>
          );
        })}
      </svg>

      <figcaption className="bb-visual-caption">
        <strong>{t(active.title)}:</strong> {t(active.note)}
      </figcaption>
    </figure>
  );
};

const OhlcAnatomyDiagramVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [focus, setFocus] = useState<'open' | 'body' | 'full' | 'mt'>('mt');

  const specs = {
    open: {
      title: '1. Opening Price (Proximal Edge = 20,126.00)',
      fillRate: 'Highest Fill Rate',
      riskNote: 'Widest stop distance if stop sits below 20,124 wick.',
      desc: 'Earliest limit-entry reference on the first opposing candle of the Point B leg.',
    },
    body: {
      title: '2. Body Range (Open-to-Close = 20,126.00–20,138.00)',
      fillRate: 'Balanced Fill Rate',
      riskNote: 'Filters extreme news wicks; focuses on real closing acceptance.',
      desc: 'Spans strictly from candle Open to candle Close, excluding upper and lower wick tails.',
    },
    full: {
      title: '3. Full Range (High-to-Low = 20,124.00–20,140.00)',
      fillRate: 'Broadest Zone Envelope',
      riskNote: 'Defines the cleanest outer structural invalidation boundary at 20,124.00.',
      desc: 'Captures the entire excursion from absolute wick low to absolute wick high.',
    },
    mt: {
      title: '4. 50% Mean Threshold (Midpoint = 20,132.00)',
      fillRate: 'Strictest R:R Refinement',
      riskNote: 'A candle body closing past 20,132.00 signals structural weakening early.',
      desc: 'Exact arithmetic midpoint dividing the selected breaker range in half.',
    },
  };
  const active = specs[focus];

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <Ruler size={14} className="bb-inline-icon" /> {t('Magnified OHLC Blueprint · Precision Measurement')}
        </p>
        <h3>{t('Click Each Breaker Coordinate to Inspect Its Exact Measurement')}</h3>
      </div>

      <div className="bb-pill-row">
        {(
          [
            ['open', '1. Opening Price'],
            ['body', '2. Body Range'],
            ['full', '3. Full Range'],
            ['mt', '4. 50% Mean Threshold'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`bb-tab-btn${focus === id ? ' is-active' : ''}`}
            onClick={() => setFocus(id)}
          >
            {t(label)}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 680 210" className="bb-svg-stage" role="img" aria-label={t(active.title)}>
        <rect x="0" y="0" width="680" height="210" rx="8" fill="var(--bb-stage-bg)" />

        {/* Full range highlight */}
        <rect
          x="110"
          y="26"
          width="480"
          height="156"
          fill={focus === 'full' ? 'var(--bb-cobalt-soft)' : 'transparent'}
          stroke={focus === 'full' ? 'var(--bb-cobalt)' : 'var(--bb-border)'}
          strokeDasharray={focus === 'full' ? undefined : '4 4'}
          strokeWidth={focus === 'full' ? 2 : 1}
          rx="4"
        />

        {/* Body range highlight */}
        <rect
          x="110"
          y="48"
          width="480"
          height="112"
          fill={focus === 'body' ? 'var(--bb-emerald-soft)' : 'transparent'}
          stroke={focus === 'body' ? 'var(--bb-emerald)' : 'transparent'}
          strokeWidth="2"
          rx="3"
        />

        {/* Magnified Bullish Origin Candle */}
        <line x1="176" y1="26" x2="176" y2="182" stroke="var(--bb-wick)" strokeWidth="4" />
        <rect x="148" y="48" width="56" height="112" fill="var(--bb-amber)" stroke="var(--bb-ink)" strokeWidth="1.4" rx="4" />

        {/* High line */}
        <line x1="176" y1="26" x2="590" y2="26" stroke="var(--bb-muted)" strokeDasharray="3 3" />
        <text x="600" y="30" className="bb-svg-axis">High 20,140</text>

        {/* Close line */}
        <line x1="204" y1="48" x2="590" y2="48" stroke={focus === 'body' ? 'var(--bb-emerald)' : 'var(--bb-grid)'} strokeWidth={focus === 'body' ? 2 : 1} />
        <text x="600" y="52" className="bb-svg-axis">Close 20,138</text>

        {/* 50% Mean Threshold line */}
        <line
          x1="126"
          y1="104"
          x2="590"
          y2="104"
          stroke="var(--bb-amber)"
          strokeWidth={focus === 'mt' ? 3 : 1.4}
          strokeDasharray="6 4"
        />
        <text x="360" y="96" textAnchor="middle" className="bb-svg-tag-amber">
          {t('50% Mean Threshold = 20,132.00')}
        </text>

        {/* Open line */}
        <line
          x1="126"
          y1="160"
          x2="590"
          y2="160"
          stroke={focus === 'open' ? 'var(--bb-cobalt)' : 'var(--bb-grid)'}
          strokeWidth={focus === 'open' ? 3 : 1.2}
        />
        <text x="600" y="164" className={focus === 'open' ? 'bb-svg-tag' : 'bb-svg-axis'}>Open 20,126</text>

        {/* Low line */}
        <line x1="176" y1="182" x2="590" y2="182" stroke={focus === 'full' ? 'var(--bb-rose)' : 'var(--bb-muted)'} strokeWidth={focus === 'full' ? 2.4 : 1} strokeDasharray="3 3" />
        <text x="600" y="186" className={focus === 'full' ? 'bb-svg-tag-rose' : 'bb-svg-axis'}>Low 20,124</text>

        <text x="176" y="200" textAnchor="middle" className="bb-comic-head">{t('Point B Candle')}</text>
      </svg>

      <div className="bb-metric-grid">
        <div className="bb-metric-cell">
          <span>{t('Active Coordinate')}</span>
          <strong>{t(active.title)}</strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('Fill Profile')}</span>
          <strong>{t(active.fillRate)}</strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('Structural Trade-Off')}</span>
          <strong>{t(active.riskNote)}</strong>
        </div>
      </div>
    </figure>
  );
};

const NarrativeVsOhlcVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <Eye size={14} className="bb-inline-icon" /> {t('Evidence Filter · Story vs. Chart Proof')}
        </p>
        <h3>{t('What the Trapped-Trader Story Assumes vs. What OHLC Actually Proves')}</h3>
      </div>

      <svg viewBox="0 0 680 196" className="bb-comic-svg" role="img" aria-label={t('Narrative hypothesis versus observable OHLC evidence')}>
        <rect x="0" y="0" width="680" height="196" rx="8" fill="var(--bb-stage-bg)" />

        {/* Left panel: Story / Hypothesis */}
        <rect x="16" y="16" width="312" height="164" rx="8" fill="var(--bb-surface)" stroke="var(--bb-amber)" strokeWidth="1.5" />
        <text x="30" y="38" className="bb-svg-tag-amber">{t('1. Market Story (Unverified Hypothesis)')}</text>
        {/* Stick figure thinking */}
        <circle cx="62" cy="86" r="10" fill="none" stroke="var(--bb-ink)" strokeWidth="2.2" />
        <line x1="62" y1="96" x2="62" y2="128" stroke="var(--bb-ink)" strokeWidth="2.2" />
        <line x1="62" y1="104" x2="46" y2="116" stroke="var(--bb-ink)" strokeWidth="2.2" />
        <line x1="62" y1="104" x2="78" y2="96" stroke="var(--bb-ink)" strokeWidth="2.2" />
        <line x1="62" y1="128" x2="52" y2="150" stroke="var(--bb-ink)" strokeWidth="2.2" />
        <line x1="62" y1="128" x2="72" y2="150" stroke="var(--bb-ink)" strokeWidth="2.2" />
        {/* Thought bubble */}
        <rect x="96" y="54" width="218" height="96" rx="8" fill="var(--bb-amber-soft)" stroke="var(--bb-amber)" strokeDasharray="4 3" />
        <text x="108" y="76" className="bb-comic-head">{t('"A bank is exiting its')}</text>
        <text x="108" y="94" className="bb-comic-head">{t('underwater hedge at 103!"')}</text>
        <text x="108" y="118" className="bb-comic-note">{t('- Order tickets are invisible on OHLC')}</text>
        <text x="108" y="135" className="bb-comic-note">{t('- Useful memory aid, not chart proof')}</text>

        {/* Right panel: Observable OHLC Facts */}
        <rect x="352" y="16" width="312" height="164" rx="8" fill="var(--bb-surface)" stroke="var(--bb-emerald)" strokeWidth="1.8" />
        <text x="366" y="38" className="bb-svg-tag-emerald">{t('2. Observable OHLC Evidence (Verifiable)')}</text>
        <rect x="366" y="54" width="284" height="24" rx="4" fill="var(--bb-emerald-soft)" />
        <text x="376" y="70" className="bb-comic-head">{t('1. Sweep Verified: C (112) > A (110)')}</text>
        <rect x="366" y="86" width="284" height="24" rx="4" fill="var(--bb-cobalt-soft)" />
        <text x="376" y="102" className="bb-comic-head">{t('2. Close Verified: D (98) < B (100)')}</text>
        <rect x="366" y="118" width="284" height="24" rx="4" fill="var(--bb-stage-bg)" stroke="var(--bb-border)" />
        <text x="376" y="134" className="bb-comic-head">{t('3. Fixed Box: 100–104 | Mid: 102.0')}</text>
        <text x="366" y="164" className="bb-comic-note">{t('Two independent analysts measure the exact same numbers.')}</text>
      </svg>
    </figure>
  );
};

const UnicornFormationAnimVisual: React.FC<{ t: (s: string) => string; staticOnly?: boolean }> = ({
  t,
  staticOnly = false,
}) => {
  const [step, setStep] = useState<number>(3);
  const [playing, setPlaying] = useState<boolean>(false);

  const phases = [
    { label: '1. Save B', note: 'Up-close origin candle at B (106–110) is frozen before the break.' },
    { label: '2. Sweep C', note: 'Price sweeps below Swing Low A (100) down to 98.' },
    { label: '3. Displacement + FVG', note: 'One fast impulse breaks above 110 AND leaves a 3-candle FVG (104–108).' },
    { label: '4. Unicorn Overlap', note: 'Shared positive-width overlap 106–108 lights up—narrowing the retest target.' },
  ];

  useEffect(() => {
    if (!playing || staticOnly) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= phases.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, phases.length]);

  const mapY = (p: number) => 22 + ((116 - p) / 20) * 164;

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <Sparkles size={14} className="bb-inline-icon" /> {t('Animated Unicorn Birth · Single-Impulse Confluence')}
        </p>
        <h3>{t('How One Displacement Leg Creates Both the Breaker Flip and the Overlapping FVG')}</h3>
      </div>

      <div className="bb-toolbar-split">
        <div className="bb-control-group">
          <button
            type="button"
            className="bb-ctrl-btn is-primary"
            onClick={() => {
              if (!playing && step >= phases.length - 1) setStep(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button type="button" className="bb-ctrl-btn" onClick={() => { setPlaying(false); setStep(0); }} aria-label={t('Reset scene')}>
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="bb-pill-row">
          {phases.map((p, i) => (
            <button
              key={p.label}
              type="button"
              className={`bb-tab-btn${step === i ? ' is-active' : ''}`}
              onClick={() => { setPlaying(false); setStep(i); }}
            >
              {t(p.label)}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 680 214" className="bb-svg-stage" role="img" aria-label={t('ICT Unicorn formation animation')}>
        <rect x="0" y="0" width="680" height="214" rx="8" fill="var(--bb-stage-bg)" />

        {/* Breaker zone 106-110 */}
        <rect x="130" y={mapY(110)} width="520" height={mapY(106) - mapY(110)} fill="var(--bb-cobalt-soft)" stroke="var(--bb-cobalt)" strokeWidth="1.3" />
        <text x="642" y={mapY(110) + 12} textAnchor="end" className="bb-svg-tag">{t('Breaker 106–110')}</text>

        {/* FVG 104-108 */}
        {step >= 2 && (
          <g>
            <rect x="330" y={mapY(108)} width="320" height={mapY(104) - mapY(108)} fill="var(--bb-emerald-soft)" stroke="var(--bb-emerald)" strokeWidth="1.3" />
            <text x="642" y={mapY(104) - 4} textAnchor="end" className="bb-svg-tag-emerald">{t('FVG 104–108')}</text>
          </g>
        )}

        {/* Unicorn Overlap 106-108 */}
        {step >= 3 && (
          <g>
            <rect x="330" y={mapY(108)} width="320" height={mapY(106) - mapY(108)} fill="var(--bb-amber-soft)" stroke="var(--bb-amber)" strokeWidth="2.2" />
            <text x="490" y={mapY(107) + 4} textAnchor="middle" className="bb-svg-tag-amber">
              {t('UNICORN OVERLAP 106–108')}
            </text>
          </g>
        )}

        {/* Candles */}
        {/* A */}
        <line x1="84" y1={mapY(104)} x2="84" y2={mapY(100)} stroke="var(--bb-wick)" strokeWidth="2" />
        <rect x="74" y={mapY(103.5)} width="20" height={mapY(100.8) - mapY(103.5)} fill="var(--bb-rose)" rx="2" />
        <text x="84" y="204" textAnchor="middle" className="bb-svg-axis">A</text>

        {/* B Origin */}
        <line x1="158" y1={mapY(110)} x2="158" y2={mapY(106)} stroke="var(--bb-wick)" strokeWidth="2" />
        <rect x="148" y={mapY(109.5)} width="20" height={mapY(106.5) - mapY(109.5)} fill="var(--bb-amber)" rx="2" />
        <text x="158" y="204" textAnchor="middle" className="bb-svg-axis">B</text>

        {/* C Sweep */}
        {step >= 1 && (
          <g>
            <line x1="252" y1={mapY(104)} x2="252" y2={mapY(98)} stroke="var(--bb-wick)" strokeWidth="2" />
            <rect x="242" y={mapY(103.2)} width="20" height={mapY(99.5) - mapY(103.2)} fill="var(--bb-rose)" rx="2" />
            <text x="252" y="204" textAnchor="middle" className="bb-svg-axis">C (98)</text>
          </g>
        )}

        {/* Displacement 3-candle FVG leg */}
        {step >= 2 && (
          <g>
            {/* C1 high 104 */}
            <line x1="334" y1={mapY(104)} x2="334" y2={mapY(99)} stroke="var(--bb-wick)" strokeWidth="2" />
            <rect x="324" y={mapY(103.5)} width="20" height={mapY(100) - mapY(103.5)} fill="var(--bb-cobalt)" rx="2" />
            {/* C2 impulse breaking B */}
            <line x1="406" y1={mapY(113)} x2="406" y2={mapY(103)} stroke="var(--bb-wick)" strokeWidth="2" />
            <rect x="396" y={mapY(112.2)} width="20" height={mapY(103.5) - mapY(112.2)} fill="var(--bb-emerald)" rx="2" />
            <text x="406" y="204" textAnchor="middle" className="bb-svg-axis">D (MSS)</text>
            {/* C3 low 108 */}
            <line x1="478" y1={mapY(114)} x2="478" y2={mapY(108)} stroke="var(--bb-wick)" strokeWidth="2" />
            <rect x="468" y={mapY(113.2)} width="20" height={mapY(109) - mapY(113.2)} fill="var(--bb-cobalt)" rx="2" />
          </g>
        )}

        {/* Retest into Unicorn */}
        {step >= 3 && (
          <g>
            <line x1="556" y1={mapY(113)} x2="556" y2={mapY(106.8)} stroke="var(--bb-wick)" strokeWidth="2" />
            <rect x="546" y={mapY(111.5)} width="20" height={mapY(107.6) - mapY(111.5)} fill="var(--bb-amber)" rx="2" />
            <text x="556" y="204" textAnchor="middle" className="bb-svg-axis">E</text>
            <line x1="618" y1={mapY(115.6)} x2="618" y2={mapY(108)} stroke="var(--bb-wick)" strokeWidth="2" />
            <rect x="608" y={mapY(115)} width="20" height={mapY(108.6) - mapY(115)} fill="var(--bb-emerald)" rx="2" />
          </g>
        )}
      </svg>

      <figcaption className="bb-visual-caption">
        <strong>{t(phases[step].label)}:</strong> {t(phases[step].note)}
      </figcaption>
    </figure>
  );
};

const InverseBreakerAnimVisual: React.FC<{ t: (s: string) => string; staticOnly?: boolean }> = ({
  t,
  staticOnly = false,
}) => {
  const [phase, setPhase] = useState<number>(3);
  const [playing, setPlaying] = useState<boolean>(false);

  const steps = [
    { tag: '1. Support', text: 'Origin candle at 100–104 initially launches buyers upward.' },
    { tag: '2. Bearish Breaker', text: 'Sellers close below 100—flipping 100–104 into Bearish Breaker resistance.' },
    { tag: '3. Closing Failure', text: 'Strong buyers drive straight through 104 and close at 107—invalidating the short thesis!' },
    { tag: '4. Reclaimed Support', text: 'Polarity flips a SECOND time: pullback to 103 now acts as Bullish Support.' },
  ];

  useEffect(() => {
    if (!playing || staticOnly) return;
    const id = window.setInterval(() => {
      setPhase((p) => {
        if (p >= steps.length - 1) {
          setPlaying(false);
          return p;
        }
        return p + 1;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, steps.length]);

  const points = [
    '60,118 140,112 200,56',
    '60,118 140,112 200,56 290,162',
    '60,118 140,112 200,56 290,162 418,62',
    '60,118 140,112 200,56 290,162 418,62 512,102 624,30',
  ];

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <RefreshCw size={14} className="bb-inline-icon" /> {t('Double Polarity Flip · Inverse Breaker Animation')}
        </p>
        <h3>{t('Support -> Bearish Breaker -> Closing Failure -> Reclaimed Bullish Support')}</h3>
      </div>

      <div className="bb-toolbar-split">
        <div className="bb-control-group">
          <button
            type="button"
            className="bb-ctrl-btn is-primary"
            onClick={() => {
              if (!playing && phase >= steps.length - 1) setPhase(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button type="button" className="bb-ctrl-btn" onClick={() => { setPlaying(false); setPhase(0); }} aria-label={t('Reset scene')}>
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="bb-pill-row">
          {steps.map((s, idx) => (
            <button
              key={s.tag}
              type="button"
              className={`bb-tab-btn${phase === idx ? ' is-active' : ''}`}
              onClick={() => { setPlaying(false); setPhase(idx); }}
            >
              {t(s.tag)}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 680 198" className="bb-svg-stage" role="img" aria-label={t('Inverse reclaimed breaker animation')}>
        <rect x="0" y="0" width="680" height="198" rx="8" fill="var(--bb-stage-bg)" />

        {/* Polarity band 100-104 */}
        <rect
          x="100"
          y="92"
          width="552"
          height="32"
          fill={phase === 1 ? 'var(--bb-rose-soft)' : 'var(--bb-emerald-soft)'}
          stroke={phase === 1 ? 'var(--bb-rose)' : 'var(--bb-emerald)'}
          strokeWidth="1.6"
        />
        <text x="642" y="112" textAnchor="end" className={phase === 1 ? 'bb-svg-tag-rose' : 'bb-svg-tag-emerald'}>
          {phase === 0
            ? t('Initial Support (100–104)')
            : phase === 1
              ? t('1st Flip: Bearish Breaker (100–104)')
              : t('2nd Flip: Reclaimed Bullish Support (100–104)')}
        </text>

        <polyline
          points={points[phase]}
          fill="none"
          stroke={phase >= 2 ? 'var(--bb-emerald)' : phase === 1 ? 'var(--bb-rose)' : 'var(--bb-cobalt)'}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {phase >= 2 && (
          <g>
            <circle cx="418" cy="62" r="6" fill="var(--bb-emerald)" />
            <text x="418" y="48" textAnchor="middle" className="bb-svg-tag-emerald">{t('Close > 104 (Invalidates Short)')}</text>
          </g>
        )}
        {phase >= 3 && (
          <g>
            <circle cx="512" cy="102" r="6" fill="var(--bb-amber)" />
            <text x="512" y="142" textAnchor="middle" className="bb-svg-tag-amber">{t('Reclaimed Retest')}</text>
          </g>
        )}
      </svg>

      <figcaption className="bb-visual-caption">
        <strong>{t(steps[phase].tag)}:</strong> {t(steps[phase].text)}
      </figcaption>
    </figure>
  );
};

const QualityComparisonVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <ShieldCheck size={14} className="bb-inline-icon" /> {t('Visual Quality Filter · Side-by-Side Comparison')}
        </p>
        <h3>{t('High-Probability Killzone-Session Breaker vs. Low-Probability Chop Trap')}</h3>
      </div>

      <svg viewBox="0 0 680 202" className="bb-svg-stage" role="img" aria-label={t('High probability versus low probability breaker block comparison')}>
        <rect x="0" y="0" width="680" height="202" rx="8" fill="var(--bb-stage-bg)" />

        {/* Left: High Probability */}
        <rect x="16" y="14" width="314" height="174" rx="8" fill="var(--bb-surface)" stroke="var(--bb-emerald)" strokeWidth="1.8" />
        <text x="28" y="34" className="bb-svg-tag-emerald">{t('A. High-Probability Breaker (Pass)')}</text>
        <line x1="28" y1="128" x2="210" y2="128" stroke="var(--bb-emerald)" strokeDasharray="4 3" />
        <text x="30" y="123" className="bb-comic-note">{t('London Low / PDL Sweep')}</text>
        <rect x="78" y="76" width="234" height="22" fill="var(--bb-cobalt-soft)" stroke="var(--bb-cobalt)" strokeWidth="1.3" />
        <polyline points="40,126 98,78 144,148 214,48 258,86 312,34" fill="none" stroke="var(--bb-emerald)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="28" y="172" className="bb-comic-note">{t('1. Major Sweep  2. Fast FVG Break  3. Fresh 1st Touch')}</text>

        {/* Right: Low Probability Trap */}
        <rect x="350" y="14" width="314" height="174" rx="8" fill="var(--bb-surface)" stroke="var(--bb-rose)" strokeWidth="1.8" />
        <text x="362" y="34" className="bb-svg-tag-rose">{t('B. Low-Probability Chop Trap (Skip)')}</text>
        <rect x="394" y="80" width="248" height="24" fill="var(--bb-rose-soft)" stroke="var(--bb-rose)" strokeDasharray="3 3" />
        <polyline points="370,112 406,86 436,118 468,78 502,114 534,84 568,120 604,76 642,134" fill="none" stroke="var(--bb-rose)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="362" y="172" className="bb-comic-note">{t('1. Lunch Chop  2. Tiny Wicks  3. 4th Choppy Pass')}</text>
      </svg>
    </figure>
  );
};

const KillzoneClockVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [activeId, setActiveId] = useState<'london' | 'nyam' | 'silver' | 'lunch' | 'nypm'>('nyam');

  const sessions = [
    {
      id: 'london' as const,
      label: 'London (02:00–05:00)',
      x: 78,
      w: 112,
      tone: 'var(--bb-cobalt)',
      sweep: 'Asia Session High / Low',
      quality: 'High Liquidity Expansion',
      caution: 'Avoid thin pre-02:00 fake spikes before London cash opens.',
    },
    {
      id: 'nyam' as const,
      label: 'NY AM (08:30–10:00)',
      x: 266,
      w: 110,
      tone: 'var(--bb-emerald)',
      sweep: 'London High/Low or PDH/PDL',
      quality: 'Peak NQ / ES / FX Volume',
      caution: '08:30 CPI/NFP prints widen spreads—wait for post-news body close.',
    },
    {
      id: 'silver' as const,
      label: 'Silver Bullet (10:00–11:00)',
      x: 378,
      w: 74,
      tone: 'var(--bb-amber)',
      sweep: '09:30 Opening Range Extreme',
      quality: 'Focused Unicorn Hour',
      caution: 'Demand clean 5M/1M body close; reject single-candle wick snaps.',
    },
    {
      id: 'lunch' as const,
      label: 'NY Lunch (12:00–13:30)',
      x: 472,
      w: 70,
      tone: 'var(--bb-rose)',
      sweep: 'Random Internal Chop',
      quality: 'Low Probability — Stand Aside',
      caution: 'Frequent fakeouts and multi-pass breaker violations.',
    },
    {
      id: 'nypm' as const,
      label: 'NY PM (13:30–16:00)',
      x: 546,
      w: 108,
      tone: 'var(--bb-cobalt)',
      sweep: 'NY Lunch High or Low',
      quality: 'Afternoon Trend Continuation',
      caution: 'Retire untouched setups 15 minutes before the 16:00 close.',
    },
  ];

  const active = sessions.find((s) => s.id === activeId) || sessions[1];

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <Clock size={14} className="bb-inline-icon" /> {t('Interactive Session Clock · America/New_York')}
        </p>
        <h3>{t('Click a New York Session Window to Inspect Sweep Pools & Volatility')}</h3>
      </div>

      <div className="bb-pill-row">
        {sessions.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`bb-tab-btn${activeId === s.id ? ' is-active' : ''}`}
            onClick={() => setActiveId(s.id)}
          >
            {t(s.label)}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 680 128" className="bb-svg-stage" role="img" aria-label={t('New York Killzone session timeline')}>
        <rect x="0" y="0" width="680" height="128" rx="8" fill="var(--bb-stage-bg)" />
        <line x1="28" y1="84" x2="654" y2="84" stroke="var(--bb-border)" strokeWidth="2" />

        {['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '17:00'].map((tm, i) => {
          const x = 36 + i * 102;
          return (
            <g key={tm}>
              <line x1={x} y1="78" x2={x} y2="90" stroke="var(--bb-muted)" strokeWidth="1.5" />
              <text x={x} y="108" textAnchor="middle" className="bb-svg-axis">{tm}</text>
            </g>
          );
        })}

        {sessions.map((s) => {
          const isSel = s.id === activeId;
          return (
            <g key={s.id} style={{ cursor: 'pointer' }} onClick={() => setActiveId(s.id)}>
              <rect
                x={s.x}
                y={isSel ? 24 : 36}
                width={s.w}
                height={isSel ? 44 : 32}
                rx="6"
                fill={s.tone}
                opacity={isSel ? 0.92 : 0.35}
              />
              <text
                x={s.x + s.w / 2}
                y={isSel ? 50 : 56}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="700"
                fill={isSel ? '#ffffff' : 'var(--bb-ink)'}
              >
                {s.id === 'london' ? 'LDN' : s.id === 'nyam' ? 'NY AM' : s.id === 'silver' ? 'SB' : s.id === 'lunch' ? 'LUNCH' : 'NY PM'}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="bb-metric-grid">
        <div className="bb-metric-cell">
          <span>{t('Typical Sweep Pool (Point C)')}</span>
          <strong>{t(active.sweep)}</strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('Session Character')}</span>
          <strong>{t(active.quality)}</strong>
        </div>
        <div className="bb-metric-cell">
          <span>{t('Key Risk Caution')}</span>
          <strong>{t(active.caution)}</strong>
        </div>
      </div>
    </figure>
  );
};

const NqBullishReplayVisual: React.FC<{ t: (s: string) => string; staticOnly?: boolean }> = ({
  t,
  staticOnly = false,
}) => {
  const [step, setStep] = useState<number>(4);
  const [playing, setPlaying] = useState<boolean>(false);

  const stages = [
    { badge: '09:10 · A', count: 2, caption: 'London Low sets Point A = 20,100.00 (resting sell-side pool).' },
    { badge: '09:20 · B', count: 4, caption: 'Origin up-close candle prints at B (20,124–20,140; Mid 20,132).' },
    { badge: '09:30 · C', count: 6, caption: 'NY Open sweeps strictly below 20,100 down to Point C = 20,084.' },
    { badge: '09:40 · D+FVG', count: 8, caption: 'Close 20,152 confirms MSS + leaves FVG 20,118–20,134 -> Unicorn 20,124–20,134.' },
    { badge: '10:15 · 3.0R', count: 10, caption: 'Pullback fills 20,130 (Stop 20,116 / -14 pts) and expands to 08:30 High 20,172 (+42 pts).' },
  ];

  const bars: ReplayCandle[] = [
    { label: '09:05', open: 20118, high: 20122, low: 20105, close: 20108 },
    { label: '09:10 A', open: 20108, high: 20116, low: 20100, close: 20114, role: 'a' },
    { label: '09:15', open: 20114, high: 20128, low: 20112, close: 20126 },
    { label: '09:20 B', open: 20126, high: 20140, low: 20124, close: 20138, role: 'origin' },
    { label: '09:25', open: 20138, high: 20139, low: 20106, close: 20109 },
    { label: '09:30 C', open: 20109, high: 20112, low: 20084, close: 20096, role: 'sweep' },
    { label: '09:35', open: 20096, high: 20118, low: 20094, close: 20117 },
    { label: '09:40 D', open: 20117, high: 20156, low: 20116, close: 20152, role: 'mss' },
    { label: '09:50 E', open: 20152, high: 20153, low: 20128, close: 20136, role: 'retest' },
    { label: '10:15 TP', open: 20136, high: 20174, low: 20134, close: 20172, role: 'target' },
  ];

  useEffect(() => {
    if (!playing || staticOnly) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= stages.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1550);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, stages.length]);

  const mapY = (p: number) => 22 + ((20182 - p) / 106) * 188;
  const active = stages[step];

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <TrendingUp size={14} className="bb-inline-icon" /> {t('Animated Worked Example · Section 16 (NQ 5M)')}
        </p>
        <h3>{t('NQ Morning Sweep (20,084) -> Bullish Breaker (20,124–20,140) -> 3.0R Unicorn Replay')}</h3>
      </div>

      <div className="bb-toolbar-split">
        <div className="bb-control-group">
          <button
            type="button"
            className="bb-ctrl-btn is-primary"
            onClick={() => {
              if (!playing && step >= stages.length - 1) setStep(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button type="button" className="bb-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} aria-label={t('Previous stage')}>
            <SkipBack size={14} />
          </button>
          <button type="button" className="bb-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => Math.min(stages.length - 1, s + 1)); }} aria-label={t('Next stage')}>
            <SkipForward size={14} />
          </button>
          <button type="button" className="bb-ctrl-btn" onClick={() => { setPlaying(false); setStep(0); }} aria-label={t('Reset scene')}>
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="bb-pill-row">
          {stages.map((s, idx) => (
            <button
              key={s.badge}
              type="button"
              className={`bb-tab-btn bb-num${step === idx ? ' is-active' : ''}`}
              onClick={() => { setPlaying(false); setStep(idx); }}
            >
              {t(s.badge)}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 680 242" className="bb-svg-stage" role="img" aria-label={t('Animated NQ bullish breaker worked example')}>
        <rect x="0" y="0" width="680" height="242" rx="8" fill="var(--bb-stage-bg)" />
        {[20084, 20100, 20124, 20140, 20172].map((p) => (
          <g key={p}>
            <line x1="68" y1={mapY(p)} x2="658" y2={mapY(p)} stroke="var(--bb-grid)" strokeDasharray="3 4" />
            <text x="60" y={mapY(p) + 4} textAnchor="end" className="bb-svg-axis">{p.toLocaleString('en-US')}</text>
          </g>
        ))}

        {/* Breaker zone */}
        {step >= 1 && (
          <rect x="242" y={mapY(20140)} width="416" height={mapY(20124) - mapY(20140)} fill="var(--bb-cobalt-soft)" stroke="var(--bb-cobalt)" strokeWidth="1.2" />
        )}

        {/* Unicorn overlap 20,124 - 20,134 */}
        {step >= 3 && (
          <g>
            <rect x="442" y={mapY(20134)} width="216" height={mapY(20124) - mapY(20134)} fill="var(--bb-amber-soft)" stroke="var(--bb-amber)" strokeWidth="1.8" />
            <text x="652" y={mapY(20134) - 4} textAnchor="end" className="bb-svg-tag-amber">{t('Unicorn 20,124–20,134')}</text>
          </g>
        )}

        {/* Sweep line A */}
        {step >= 2 && (
          <line x1="126" y1={mapY(20100)} x2="430" y2={mapY(20100)} stroke="var(--bb-emerald)" strokeDasharray="4 3" strokeWidth="1.3" />
        )}

        {/* Entry / Stop / Target risk bracket */}
        {step >= 4 && (
          <g>
            <rect x="556" y={mapY(20172)} width="98" height={mapY(20130) - mapY(20172)} fill="var(--bb-emerald-soft)" stroke="var(--bb-emerald)" strokeWidth="1.2" />
            <rect x="556" y={mapY(20130)} width="98" height={mapY(20116) - mapY(20130)} fill="var(--bb-rose-soft)" stroke="var(--bb-rose)" strokeWidth="1.2" />
            <text x="605" y={mapY(20172) + 14} textAnchor="middle" className="bb-svg-tag-emerald">TP 20,172 (3R)</text>
            <text x="605" y={mapY(20116) + 12} textAnchor="middle" className="bb-svg-tag-rose">SL 20,116</text>
          </g>
        )}

        {bars.slice(0, active.count).map((c, idx) => {
          const cx = 98 + idx * 56;
          const bull = c.close >= c.open;
          const top = mapY(Math.max(c.open, c.close));
          const bot = mapY(Math.min(c.open, c.close));
          const fill =
            c.role === 'origin'
              ? 'var(--bb-amber)'
              : c.role === 'sweep'
                ? 'var(--bb-rose)'
                : c.role === 'mss' || c.role === 'target'
                  ? 'var(--bb-emerald)'
                  : bull
                    ? 'var(--bb-cobalt)'
                    : 'var(--bb-rose)';
          return (
            <g key={c.label}>
              <line x1={cx} y1={mapY(c.high)} x2={cx} y2={mapY(c.low)} stroke="var(--bb-wick)" strokeWidth="1.9" />
              <rect x={cx - 9} y={top} width="18" height={Math.max(5, bot - top)} fill={fill} rx="2" />
              <text x={cx} y="229" textAnchor="middle" className="bb-svg-axis">{c.label}</text>
            </g>
          );
        })}
      </svg>

      <figcaption className="bb-visual-caption">
        <strong>{t(active.badge)}:</strong> {t(active.caption)} · {t('Synthetic illustrative study data — not live exchange quotes.')}
      </figcaption>
    </figure>
  );
};

const EurUsdBearishReplayVisual: React.FC<{ t: (s: string) => string; staticOnly?: boolean }> = ({
  t,
  staticOnly = false,
}) => {
  const [step, setStep] = useState<number>(4);
  const [playing, setPlaying] = useState<boolean>(false);
  const [simulateSpike, setSimulateSpike] = useState<boolean>(false);

  const stages = [
    { badge: '07:45 · A', count: 2, caption: 'Asian Session High rests at Point A = 1.0900 (buy-side pool).' },
    { badge: '08:00 · B', count: 4, caption: 'Down-close origin candle at B spans 1.0870–1.0882 (Body Mid 1.0876).' },
    { badge: '08:30 · C', count: 6, caption: 'NY pre-open sweeps +14 pips strictly above Asia High to 1.0914.' },
    { badge: '09:00 · D+FVG', count: 8, caption: 'Close 1.0862 confirms MSS + Bearish FVG 1.0874–1.0888 -> Unicorn 1.0874–1.0882.' },
    { badge: '10:30 · 2.0R', count: 10, caption: 'Rally taps 1.0876 (Stop 1.0890 / -14p) before expanding to Asia Low 1.0848 (+28p).' },
  ];

  const bars: ReplayCandle[] = [
    { label: '07:30', open: 1.0884, high: 1.0894, low: 1.0880, close: 1.0892 },
    { label: '07:45 A', open: 1.0892, high: 1.0900, low: 1.0886, close: 1.0889, role: 'a' },
    { label: '07:55', open: 1.0889, high: 1.0891, low: 1.0878, close: 1.0880 },
    { label: '08:00 B', open: 1.0880, high: 1.0882, low: 1.0870, close: 1.0872, role: 'origin' },
    { label: '08:15', open: 1.0872, high: 1.0896, low: 1.0872, close: 1.0894 },
    { label: '08:30 C', open: 1.0894, high: 1.0914, low: 1.0888, close: 1.0892, role: 'sweep' },
    { label: '08:45', open: 1.0892, high: 1.0893, low: 1.0876, close: 1.0878 },
    { label: '09:00 D', open: 1.0878, high: 1.0880, low: 1.0860, close: 1.0862, role: 'mss' },
    {
      label: '09:30 E',
      open: 1.0862,
      high: simulateSpike ? 1.0891 : 1.0880,
      low: 1.0861,
      close: simulateSpike ? 1.0880 : 1.0874,
      role: simulateSpike ? 'spike' : 'retest',
    },
    { label: '10:30 TP', open: 1.0874, high: 1.0875, low: 1.0846, close: 1.0848, role: 'target' },
  ];

  useEffect(() => {
    if (!playing || staticOnly) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= stages.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1550);
    return () => window.clearInterval(id);
  }, [playing, staticOnly, stages.length]);

  const mapY = (p: number) => 22 + ((1.0920 - p) / 0.0080) * 188;
  const active = stages[step];

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <TrendingDown size={14} className="bb-inline-icon" /> {t('Animated Worked Example · Section 17 (EUR/USD 15M)')}
        </p>
        <h3>{t('EUR/USD High Sweep (1.0914) -> Bearish Breaker (1.0870–1.0882) -> 2.0R Replay')}</h3>
      </div>

      <div className="bb-toolbar-split">
        <div className="bb-control-group">
          <button
            type="button"
            className="bb-ctrl-btn is-primary"
            onClick={() => {
              if (!playing && step >= stages.length - 1) setStep(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button type="button" className="bb-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} aria-label={t('Previous stage')}>
            <SkipBack size={14} />
          </button>
          <button type="button" className="bb-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => Math.min(stages.length - 1, s + 1)); }} aria-label={t('Next stage')}>
            <SkipForward size={14} />
          </button>
          <button type="button" className="bb-ctrl-btn" onClick={() => { setPlaying(false); setStep(0); }} aria-label={t('Reset scene')}>
            <RotateCcw size={14} />
          </button>
        </div>

        <button
          type="button"
          className={`bb-tab-btn${simulateSpike ? ' is-active' : ''}`}
          onClick={() => {
            setSimulateSpike((v) => !v);
            setStep(4);
          }}
        >
          <AlertTriangle size={14} />
          <span>{t(simulateSpike ? 'Intrabar Spike 1.0891 ON' : 'Simulate Intrabar Spike (1.0891)')}</span>
        </button>
      </div>

      <div className="bb-pill-row">
        {stages.map((s, idx) => (
          <button
            key={s.badge}
            type="button"
            className={`bb-tab-btn bb-num${step === idx ? ' is-active' : ''}`}
            onClick={() => { setPlaying(false); setStep(idx); }}
          >
            {t(s.badge)}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 680 242" className="bb-svg-stage" role="img" aria-label={t('Animated EUR/USD bearish breaker worked example')}>
        <rect x="0" y="0" width="680" height="242" rx="8" fill="var(--bb-stage-bg)" />
        {[1.0914, 1.0900, 1.0890, 1.0876, 1.0848].map((p) => (
          <g key={p}>
            <line x1="68" y1={mapY(p)} x2="658" y2={mapY(p)} stroke="var(--bb-grid)" strokeDasharray="3 4" />
            <text x="60" y={mapY(p) + 4} textAnchor="end" className="bb-svg-axis">{p.toFixed(4)}</text>
          </g>
        ))}

        {/* Bearish Breaker 1.0870 - 1.0882 */}
        {step >= 1 && (
          <rect x="242" y={mapY(1.0882)} width="416" height={mapY(1.0870) - mapY(1.0882)} fill="var(--bb-rose-soft)" stroke="var(--bb-rose)" strokeWidth="1.2" />
        )}

        {/* Unicorn Overlap 1.0874 - 1.0882 */}
        {step >= 3 && (
          <g>
            <rect x="442" y={mapY(1.0882)} width="216" height={mapY(1.0874) - mapY(1.0882)} fill="var(--bb-amber-soft)" stroke="var(--bb-amber)" strokeWidth="1.8" />
            <text x="652" y={mapY(1.0882) - 4} textAnchor="end" className="bb-svg-tag-amber">{t('Unicorn 1.0874–1.0882')}</text>
          </g>
        )}

        {/* Sweep line A */}
        {step >= 2 && (
          <line x1="126" y1={mapY(1.0900)} x2="430" y2={mapY(1.0900)} stroke="var(--bb-emerald)" strokeDasharray="4 3" strokeWidth="1.3" />
        )}

        {/* Stop & Target bracket */}
        {step >= 4 && (
          <g>
            <rect x="556" y={mapY(1.0890)} width="98" height={mapY(1.0876) - mapY(1.0890)} fill="var(--bb-rose-soft)" stroke="var(--bb-rose)" strokeWidth="1.2" />
            <rect x="556" y={mapY(1.0876)} width="98" height={mapY(1.0848) - mapY(1.0876)} fill="var(--bb-emerald-soft)" stroke="var(--bb-emerald)" strokeWidth="1.2" />
            <text x="605" y={mapY(1.0890) - 4} textAnchor="middle" className="bb-svg-tag-rose">SL 1.0890</text>
            <text x="605" y={mapY(1.0848) - 4} textAnchor="middle" className="bb-svg-tag-emerald">TP 1.0848 (2R)</text>
          </g>
        )}

        {bars.slice(0, active.count).map((c, idx) => {
          const cx = 98 + idx * 56;
          const bull = c.close >= c.open;
          const top = mapY(Math.max(c.open, c.close));
          const bot = mapY(Math.min(c.open, c.close));
          const fill =
            c.role === 'origin'
              ? 'var(--bb-amber)'
              : c.role === 'spike'
                ? 'var(--bb-rose)'
                : c.role === 'mss' || c.role === 'target'
                  ? 'var(--bb-rose)'
                  : bull
                    ? 'var(--bb-cobalt)'
                    : 'var(--bb-rose)';
          return (
            <g key={c.label}>
              <line x1={cx} y1={mapY(c.high)} x2={cx} y2={mapY(c.low)} stroke={c.role === 'spike' ? 'var(--bb-rose)' : 'var(--bb-wick)'} strokeWidth={c.role === 'spike' ? 2.6 : 1.9} />
              <rect x={cx - 9} y={top} width="18" height={Math.max(5, bot - top)} fill={fill} rx="2" />
              <text x={cx} y="229" textAnchor="middle" className="bb-svg-axis">{c.label}</text>
            </g>
          );
        })}

        {simulateSpike && step >= 4 && (
          <text x="530" y={mapY(1.0894)} textAnchor="end" className="bb-svg-tag-rose">
            {t('Wick 1.0891 fills SL even though close is 1.0880!')}
          </text>
        )}
      </svg>

      <figcaption className="bb-visual-caption">
        {simulateSpike
          ? t('Intrabar Risk Demonstration: The 09:30 wick touches 1.0891 and triggers the 1.0890 stop-market order for a loss even though the candle closes inside the breaker at 1.0880.')
          : `${t(active.badge)}: ${t(active.caption)}`}
      </figcaption>
    </figure>
  );
};

const ThreeEndingsVisual: React.FC<{ t: (s: string) => string }> = ({ t }) => {
  const [ending, setEnding] = useState<'hold' | 'fail' | 'runaway'>('hold');
  const [stopTier, setStopTier] = useState<'aggressive' | 'structural' | 'wide'>('structural');

  const stopY = stopTier === 'aggressive' ? 110 : stopTier === 'structural' ? 128 : 164;
  const stopLabel =
    stopTier === 'aggressive'
      ? 'Aggressive Stop (50% MT / FVG Edge)'
      : stopTier === 'structural'
        ? 'Structural Stop (Distal Breaker Wick)'
        : 'Wide Swing Stop (Beyond Point C Sweep)';

  const path =
    ending === 'hold'
      ? 'M52,144 L132,88 L206,160 L328,50 L438,104 L624,28'
      : ending === 'fail'
        ? 'M52,144 L132,88 L206,160 L328,50 L438,104 L554,154 L636,174'
        : 'M52,144 L132,88 L206,160 L328,50 L488,36 L632,22';

  const summary =
    ending === 'hold'
      ? 'Ending 1 (Retest & Hold): Price dips into the Bullish Breaker, respects closing boundaries, and expands toward opposing buy-side liquidity.'
      : ending === 'fail'
        ? 'Ending 2 (Closing Failure): Price closes decisively below the distal edge of the breaker, invalidating the long flip and warning of a potential Inverse Breaker.'
        : 'Ending 3 (No Retest / Runaway): Price races straight to the opposing liquidity draw without ever pulling back before the session window expires.';

  return (
    <figure className="bb-visual-card" data-bb-figure="">
      <div className="bb-visual-head">
        <p className="bb-visual-kicker">
          <AlertTriangle size={14} className="bb-inline-icon" /> {t('Outcome & Risk Simulator · 3 Endings + 3 Stop Tiers')}
        </p>
        <h3>{t('Compare All Three Empirical Breaker Endings & Stop-Placement Tiers')}</h3>
      </div>

      <div className="bb-toolbar-split">
        <div className="bb-pill-row">
          {(
            [
              ['hold', '1. Retest & Hold'],
              ['fail', '2. Closing Failure'],
              ['runaway', '3. No Retest'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`bb-tab-btn${ending === id ? ' is-active' : ''}`}
              onClick={() => setEnding(id)}
            >
              {t(label)}
            </button>
          ))}
        </div>

        <div className="bb-pill-row">
          {(
            [
              ['aggressive', 'Aggressive SL'],
              ['structural', 'Structural SL'],
              ['wide', 'Wide Swing SL'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`bb-tab-btn${stopTier === id ? ' is-active' : ''}`}
              onClick={() => setStopTier(id)}
            >
              {t(label)}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 680 198" className="bb-svg-stage" role="img" aria-label={t('Three empirical breaker endings and stop placement tiers')}>
        <rect x="0" y="0" width="680" height="198" rx="8" fill="var(--bb-stage-bg)" />

        {/* Bullish Breaker Box */}
        <rect x="116" y="88" width="538" height="32" fill="var(--bb-cobalt-soft)" stroke="var(--bb-cobalt)" strokeWidth="1.4" />
        <line x1="116" y1="104" x2="654" y2="104" stroke="var(--bb-amber)" strokeDasharray="5 4" />
        <text x="646" y="100" textAnchor="end" className="bb-svg-tag">{t('Bullish Breaker Zone')}</text>

        {/* Active Stop Tier Line */}
        <line x1="340" y1={stopY} x2="654" y2={stopY} stroke="var(--bb-rose)" strokeWidth="2" strokeDasharray="6 3" />
        <text x="648" y={stopY - 5} textAnchor="end" className="bb-svg-tag-rose">{t(stopLabel)}</text>

        {/* Price trajectory */}
        <path
          d={path}
          fill="none"
          stroke={ending === 'fail' ? 'var(--bb-rose)' : ending === 'runaway' ? 'var(--bb-amber)' : 'var(--bb-emerald)'}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text x="52" y="160" textAnchor="middle" className="bb-svg-axis">A</text>
        <text x="132" y="80" textAnchor="middle" className="bb-svg-axis">B</text>
        <text x="206" y="176" textAnchor="middle" className="bb-svg-axis">C (Sweep)</text>
        <text x="328" y="42" textAnchor="middle" className="bb-svg-axis">D (MSS)</text>
      </svg>

      <figcaption className="bb-visual-caption">{t(summary)}</figcaption>
    </figure>
  );
};

export const BreakerBlockExtendedVisual: React.FC<ExtendedProps> = ({
  visualId,
  t,
  staticOnly = false,
}) => {
  switch (visualId) {
    case 'bb-abcd-timeline-anim':
      return <AbcdTimelineAnimVisual t={t} staticOnly={staticOnly} />;
    case 'bb-ohlc-anatomy-diagram':
      return <OhlcAnatomyDiagramVisual t={t} />;
    case 'bb-narrative-vs-ohlc-visual':
      return <NarrativeVsOhlcVisual t={t} />;
    case 'bb-unicorn-formation-anim':
      return <UnicornFormationAnimVisual t={t} staticOnly={staticOnly} />;
    case 'bb-inverse-breaker-anim':
      return <InverseBreakerAnimVisual t={t} staticOnly={staticOnly} />;
    case 'bb-quality-comparison-visual':
      return <QualityComparisonVisual t={t} />;
    case 'bb-killzone-clock-visual':
      return <KillzoneClockVisual t={t} />;
    case 'bb-nq-bullish-replay':
      return <NqBullishReplayVisual t={t} staticOnly={staticOnly} />;
    case 'bb-eurusd-bearish-replay':
      return <EurUsdBearishReplayVisual t={t} staticOnly={staticOnly} />;
    case 'bb-three-endings-visual':
      return <ThreeEndingsVisual t={t} />;
    default:
      return null;
  }
};
