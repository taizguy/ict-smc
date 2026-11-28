import React, { useEffect, useMemo, useState } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { computeEntryPlan } from '../utils/venomModelMath';

interface VenomExtendedVisualsProps {
  visualId: string;
  staticOnly?: boolean;
}

const ExtCard: React.FC<{
  visualId: string;
  kicker: string;
  title: string;
  caption: string;
  children: React.ReactNode;
}> = ({ visualId, kicker, title, caption, children }) => {
  const { t } = useTranslation();
  return (
    <figure className="vm-visual-card" data-venom-figure={visualId}>
      <div className="vm-visual-head">
        <p className="vm-visual-kicker">{t(kicker)}</p>
        <h3>{t(title)}</h3>
      </div>
      {children}
      <figcaption className="vm-visual-caption">{t(caption)}</figcaption>
    </figure>
  );
};

/* 10. Entry-Chasing & Expectancy Degradation Calculator */
const ChasingCalculatorVisual: React.FC = () => {
  const { t } = useTranslation();
  const [chasedEntry, setChasedEntry] = useState(108.0);

  const planned = useMemo(() => computeEntryPlan('bearish', 111.0, 114.0, 104.0), []);
  const chased = useMemo(() => computeEntryPlan('bearish', chasedEntry, 114.0, 104.0), [chasedEntry]);

  return (
    <ExtCard
      visualId="chasing-calculator"
      kicker="Interactive Expectancy Degradation Lab · Fixed Stop 114 / Target 104"
      title="Why Sliding a Missed Entry from 111.0 to 108.0 Breaks the Plan"
      caption="Drag the Chased Entry slider downward toward the 104.0 objective. Every point chased simultaneously widens your stop risk and shrinks remaining reward, sharply raising the break-even hit frequency required before commissions and slippage."
    >
      <div className="vm-slider-grid">
        <label>
          <span>{t('Chased Short Entry')}: <strong className="vm-num">{chasedEntry.toFixed(1)}</strong></span>
          <input
            type="range"
            min="105.5"
            max="111.0"
            step="0.5"
            value={chasedEntry}
            onChange={(e) => setChasedEntry(Number(e.target.value))}
          />
        </label>
      </div>

      <svg viewBox="0 0 740 192" className="vm-svg-stage" role="img" aria-label={t('Planned versus chased entry risk reward comparison')}>
        <rect x="0" y="0" width="740" height="192" fill="var(--vm-stage-bg)" rx="8" />

        {/* Row 1: Planned 111.0 */}
        <text x="24" y="42" className="vm-comic-head">{t('Planned Deferred Entry (111.0)')}</text>
        <rect x="24" y="52" width={planned.risk * 52} height="30" rx="4" fill="var(--vm-crimson)" />
        <text x={24 + (planned.risk * 52) / 2} y="72" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
          {t('Risk')} {planned.risk.toFixed(1)}
        </text>
        <rect x={28 + planned.risk * 52} y="52" width={planned.reward * 52} height="30" rx="4" fill="var(--vm-teal)" />
        <text x={28 + planned.risk * 52 + (planned.reward * 52) / 2} y="72" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
          {t('Reward')} {planned.reward.toFixed(1)} ({planned.rr.toFixed(2)}R)
        </text>
        <text x="716" y="72" textAnchor="end" className="vm-svg-tag-teal">
          BE: {planned.breakEvenBeforeCostsPct.toFixed(1)}%
        </text>

        {/* Row 2: Chased Entry */}
        <text x="24" y="122" className="vm-comic-head">
          {t('Chased Entry')} ({chasedEntry.toFixed(1)})
        </text>
        <rect x="24" y="132" width={chased.risk * 52} height="30" rx="4" fill="var(--vm-crimson)" />
        <text x={24 + (chased.risk * 52) / 2} y="152" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
          {t('Risk')} {chased.risk.toFixed(1)}
        </text>
        <rect x={28 + chased.risk * 52} y="132" width={chased.reward * 52} height="30" rx="4" fill="var(--vm-amber)" />
        <text x={28 + chased.risk * 52 + (chased.reward * 52) / 2} y="152" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
          {t('Reward')} {chased.reward.toFixed(1)} ({chased.rr.toFixed(2)}R)
        </text>
        <text x="716" y="152" textAnchor="end" className="vm-svg-tag-crimson">
          BE: {chased.breakEvenBeforeCostsPct.toFixed(1)}%
        </text>
      </svg>

      <div className="vm-metric-grid">
        <div className="vm-metric-cell">
          <span>{t('Planned R (111.0)')}</span>
          <strong className="vm-num">{planned.rr.toFixed(2)}R</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Chased R')}</span>
          <strong className="vm-num">{chased.rr.toFixed(2)}R</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Planned Break-Even')}</span>
          <strong className="vm-num">{planned.breakEvenBeforeCostsPct.toFixed(1)}%</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Chased Break-Even')}</span>
          <strong className="vm-num">{chased.breakEvenBeforeCostsPct.toFixed(1)}%</strong>
        </div>
      </div>
    </ExtCard>
  );
};

/* 11. Optional SMT Divergence & 1st PFVG Context */
const SmtHtfContextVisual: React.FC = () => {
  const { t } = useTranslation();
  const [hasSmt, setHasSmt] = useState(true);
  const [showPfvg, setShowPfvg] = useState(true);

  return (
    <ExtCard
      visualId="smt-htf-context"
      kicker="Optional Context Overlay · Correlated Index Filter"
      title="Bearish NQ vs. ES SMT Divergence & First Presented FVG Alignment"
      caption="SMT Divergence and the 09:30 First Presented FVG are optional contextual layers—useful when aligned, but never compulsory requirements for every valid Venom sequence."
    >
      <div className="vm-toolbar-split">
        <div className="vm-tab-row">
          <button type="button" className={`vm-tab-btn${hasSmt ? ' is-active' : ''}`} onClick={() => setHasSmt(true)}>
            {t('With Bearish SMT (NQ Sweeps / ES Fails)')}
          </button>
          <button type="button" className={`vm-tab-btn${!hasSmt ? ' is-active' : ''}`} onClick={() => setHasSmt(false)}>
            {t('No SMT (Both Sweep High)')}
          </button>
        </div>
        <button type="button" className={`vm-ctrl-btn${showPfvg ? ' is-active' : ''}`} onClick={() => setShowPfvg((v) => !v)}>
          {t(showPfvg ? 'Hide 1st PFVG Band' : 'Show 1st PFVG Band')}
        </button>
      </div>

      <svg viewBox="0 0 740 220" className="vm-svg-stage" role="img" aria-label={t('NQ versus ES SMT divergence diagram')}>
        <rect x="0" y="0" width="740" height="220" fill="var(--vm-stage-bg)" rx="8" />

        {/* Left: NQ */}
        <rect x="16" y="16" width="346" height="188" rx="8" fill="var(--vm-surface)" stroke="var(--vm-border)" />
        <text x="189" y="38" textAnchor="middle" className="vm-svg-tag">{t('Nasdaq-100 (NQ) — Sweeps 08:00–09:30 High')}</text>
        <line x1="34" y1="86" x2="342" y2="86" stroke="var(--vm-violet)" strokeWidth="1.5" strokeDasharray="5 3" />
        {showPfvg && (
          <rect x="172" y="96" width="166" height="24" fill="var(--vm-amber-soft)" stroke="var(--vm-amber)" strokeWidth="1.3" />
        )}
        <polyline points="46,154 114,86 154,114 202,54 252,132 326,174" fill="none" stroke="var(--vm-crimson)" strokeWidth="2.8" />
        <circle cx="202" cy="54" r="5" fill="var(--vm-amber)" />
        <text x="212" y="58" className="vm-svg-tag-amber">{t('Higher High Sweep')}</text>
        {showPfvg && <text x="334" y="112" textAnchor="end" className="vm-svg-tag-amber">{t('09:30 1st PFVG')}</text>}

        {/* Right: ES */}
        <rect x="378" y="16" width="346" height="188" rx="8" fill="var(--vm-surface)" stroke="var(--vm-border)" />
        <text x="551" y="38" textAnchor="middle" className="vm-svg-tag-teal">
          {hasSmt ? t('S&P 500 (ES) — Fails to Sweep High (SMT)') : t('S&P 500 (ES) — Also Sweeps High (No SMT)')}
        </text>
        <line x1="396" y1="86" x2="704" y2="86" stroke="var(--vm-violet)" strokeWidth="1.5" strokeDasharray="5 3" />
        <polyline
          points={hasSmt ? '408,154 476,86 516,118 564,102 614,144 688,180' : '408,154 476,86 516,114 564,62 614,136 688,176'}
          fill="none"
          stroke="var(--vm-teal)"
          strokeWidth="2.8"
        />
        <circle cx="564" cy={hasSmt ? 102 : 62} r="5" fill={hasSmt ? 'var(--vm-teal)' : 'var(--vm-amber)'} />
        <text x="574" y={hasSmt ? 100 : 62} className={hasSmt ? 'vm-svg-tag-teal' : 'vm-svg-tag-amber'}>
          {hasSmt ? t('Lower High = Bearish SMT') : t('Symmetrical High Sweep')}
        </text>
      </svg>
    </ExtCard>
  );
};

/* 12. 5-Model Interactive Selector */
const MODELS = [
  {
    id: 'venom',
    title: 'ICT Venom Model',
    sub: '08:00–09:30 Box · Two Fangs',
    summary: 'Freezes the 08:00–09:30 ETH high and low, requires a closing Fang 1 outside the box followed by opposing Fang 2 displacement back inside, and frames entries via BPR overlap or deferred candle open.',
    path: 'M 14 54 L 38 36 L 62 16 L 86 48 L 106 30 L 138 64',
    accent: 'var(--vm-violet)',
  },
  {
    id: 'sb',
    title: 'ICT Silver Bullet',
    sub: 'Fixed 1-Hour Window (e.g. 10–11)',
    summary: 'Strictly clock-anchored to three 1-hour windows (03–04, 10–11, 14–15 NY). Seeks the first clean FVG toward a clear liquidity draw without requiring an 08:00–09:30 range freeze.',
    path: 'M 14 58 L 52 52 L 74 26 L 94 38 L 138 14',
    accent: 'var(--vm-teal)',
  },
  {
    id: 'm2022',
    title: 'ICT 2022 Model',
    sub: 'Any Killzone Swing + MSS + FVG',
    summary: 'General multi-session reversal template: external swing liquidity sweep -> energetic Market Structure Shift (MSS) -> retracement into the displacement Fair Value Gap.',
    path: 'M 14 40 L 42 22 L 66 56 L 94 36 L 138 66',
    accent: 'var(--vm-amber)',
  },
  {
    id: 'unicorn',
    title: 'ICT Unicorn Model',
    sub: 'Breaker Block + Overlapping FVG',
    summary: 'Requires structural failure of an Order Block into a Breaker Block that strictly overlaps a Fair Value Gap on the displacement leg through the prior swing.',
    path: 'M 14 56 L 44 26 L 64 42 L 88 18 L 108 38 L 138 64',
    accent: 'var(--vm-crimson)',
  },
  {
    id: 'orb',
    title: 'Classic ORB',
    sub: 'Breakout Continuation',
    summary: 'Trades in the same direction as the post-09:30 opening range breakout, expecting trend expansion. Structurally the exact opposite thesis of a Venom fade.',
    path: 'M 14 54 L 46 46 L 78 32 L 106 24 L 138 12',
    accent: 'var(--vm-teal)',
  },
];

const ModelComparisonVisual: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('venom');
  const active = MODELS.find((m) => m.id === selected) || MODELS[0];

  return (
    <ExtCard
      visualId="model-comparison"
      kicker="Interactive Entry-Model Taxonomy"
      title="Click Any Model to Inspect Its Signature Price Geometry"
      caption="Compare Venom directly against Silver Bullet, 2022 Model, Unicorn, and Classic ORB so you never mix incompatible entry rules inside the same trade journal."
    >
      <div className="vm-taxonomy-grid">
        {MODELS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`vm-tax-card${selected === m.id ? ' is-active' : ''}`}
            onClick={() => setSelected(m.id)}
          >
            <svg viewBox="0 0 152 76" width="100%" height="58" aria-hidden="true">
              <rect x="0" y="0" width="152" height="76" rx="5" fill="var(--vm-stage-bg)" />
              <line x1="8" y1="30" x2="144" y2="30" stroke="var(--vm-grid)" strokeDasharray="3 3" />
              <path d={m.path} fill="none" stroke={m.accent} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="vm-tax-title">{t(m.title)}</span>
            <span className="vm-tax-sub">{t(m.sub)}</span>
          </button>
        ))}
      </div>

      <div className="vm-tax-detail">
        <p><strong>{t(active.title)}:</strong> {t(active.summary)}</p>
      </div>
    </ExtCard>
  );
};

/* 13. Multi-Market & Time-of-Day Decay Visualizer */
const MARKETS = [
  { id: 'nq', label: 'NQ / MNQ', fit: 95, tf: '15m Box -> 1m Execution', tick: '$2/pt (MNQ)', note: 'Primary Venom habitat: crisp 09:30 NYSE opening volatility, frequent clean Two Fangs and BPR overlaps.' },
  { id: 'es', label: 'ES / MES', fit: 92, tf: '15m Box -> 1m Execution', tick: '$5/pt (MES)', note: 'Smoother equity index benchmark; pairs naturally with NQ for optional bearish/bullish SMT Divergence context.' },
  { id: 'ym', label: 'YM / MYM', fit: 80, tf: '15m Box -> 1m Execution', tick: '$0.50/pt (MYM)', note: 'Third U.S. equity triad index; often lags NQ slightly during opening sweeps.' },
  { id: 'gc', label: 'GC / MGC Gold', fit: 68, tf: '15m Box -> 1m / 2m', tick: '$10/pt (MGC)', note: 'Active around 08:20 NY COMEX open & 08:30 macro releases; test 08:20–09:30 nuances separately.' },
  { id: 'eu', label: 'EUR/USD FX', fit: 54, tf: '15m Box -> 1m / 5m', tick: '$10/pip (Std)', note: 'Primary catalyst is 08:00–08:30 NY/London overlap rather than the 09:30 equity bell; log as a separate variant.' },
];

const MarketTimeframeVisual: React.FC = () => {
  const { t } = useTranslation();
  const [mkt, setMkt] = useState('nq');
  const active = MARKETS.find((m) => m.id === mkt) || MARKETS[0];

  return (
    <ExtCard
      visualId="market-timeframe"
      kicker="Market Habitat & Time-of-Day Decay"
      title="Select an Instrument to Inspect 09:30 Venom Compatibility"
      caption={active.note}
    >
      <div className="vm-tab-row">
        {MARKETS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`vm-tab-btn${mkt === item.id ? ' is-active' : ''}`}
            onClick={() => setMkt(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 740 165" className="vm-svg-stage" role="img" aria-label={t('Venom time of day session decay curve')}>
        <rect x="0" y="0" width="740" height="165" fill="var(--vm-stage-bg)" rx="8" />
        <text x="26" y="28" className="vm-comic-head">{t('Opening-Session Liquidity Energy Curve (NY Time)')}</text>
        <path
          d="M 44 134 C 90 130, 128 118, 174 44 C 234 42, 310 56, 396 86 C 482 114, 578 130, 696 136"
          fill="none"
          stroke="var(--vm-violet)"
          strokeWidth="3"
        />
        <rect x="164" y="38" width="234" height="102" fill="var(--vm-teal-soft)" stroke="var(--vm-teal)" strokeDasharray="4 3" rx="4" />
        <text x="281" y="56" textAnchor="middle" className="vm-svg-tag-teal">{t('Peak Venom Window (09:30–11:00)')}</text>
        <text x="104" y="152" textAnchor="middle" className="vm-svg-axis">08:00–09:29</text>
        <text x="281" y="152" textAnchor="middle" className="vm-svg-axis">09:30–11:00</text>
        <text x="546" y="152" textAnchor="middle" className="vm-svg-axis">{t('11:00+ Decay / Expiry')}</text>
      </svg>

      <div className="vm-metric-grid">
        <div className="vm-metric-cell">
          <span>{t('09:30 Catalyst Fit')}</span>
          <strong className="vm-num">{active.fit} / 100</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Recommended Stack')}</span>
          <strong>{t(active.tf)}</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Reference Contract Value')}</span>
          <strong className="vm-num">{active.tick}</strong>
        </div>
      </div>
    </ExtCard>
  );
};

/* 14. Six-Gate Interactive Setup Grader */
const GATES = [
  '1. Frozen 08:00–09:30 NY High & Low marked on Extended Hours (ETH)',
  '2. Post-09:30 Fang 1 closed decisively outside one range boundary',
  '3. Opposing Fang 2 displaced back inside the range with a clear FVG',
  '4. Concrete BPR overlap or declared Venom open reference exists',
  '5. Minimum 2.0R before costs remains to nearest opposing liquidity pool',
  '6. Current time is inside 09:30–11:00 NY and price has not left target',
];

const SetupGraderVisual: React.FC = () => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState<boolean[]>([true, true, true, true, true, false]);
  const score = checked.filter(Boolean).length;

  const tier =
    score >= 5
      ? { label: 'High-Clarity Venom Setup (5–6/6)', note: 'All primary structural and risk gates align. Execute your pre-declared entry archetype with fixed dollar risk.' }
      : score === 4
        ? { label: 'Borderline / Reduced-Clarity (4/6)', note: 'One important structural or timing condition is missing—reduce size or wait for cleaner alignment.' }
        : { label: 'Stand Aside — Observation Only (0–3/6)', note: 'Insufficient Venom structure. Do not force a trade when Two Fangs or risk geometry are incomplete.' };

  return (
    <ExtCard
      visualId="setup-grader"
      kicker="Interactive Pre-Trade Filter · 6 Binary Gates"
      title="Score Any Live or Replay Venom Candidate (0–6)"
      caption="Toggle each gate honestly. A disciplined filter keeps you out of mid-morning chop and breakout trend days."
    >
      <div className="vm-gate-list">
        {GATES.map((label, idx) => (
          <label key={idx} className={`vm-gate-item${checked[idx] ? ' is-checked' : ''}`}>
            <input
              type="checkbox"
              checked={checked[idx]}
              onChange={() => setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)))}
            />
            <span>{t(label)}</span>
          </label>
        ))}
      </div>

      <div className="vm-grader-summary">
        <div className="vm-grader-row">
          <span className="vm-grader-tier">{t(tier.label)}</span>
          <strong className="vm-num">{score} / 6</strong>
        </div>
        <div className="vm-meter-track">
          <div className="vm-meter-fill" style={{ width: `${(score / 6) * 100}%` }} />
        </div>
        <p className="vm-grader-note">{t(tier.note)}</p>
      </div>
    </ExtCard>
  );
};

/* 15. Worked Example 1: Animated Bearish MNQ 1M Replay */
const MNQ_BARS = [
  { t: '08:45', o: 21430, h: 21475, l: 21400, c: 21465, role: 'range', note: '08:00–09:29 ETH box prints Low 21,400 and High 21,500.' },
  { t: '09:15', o: 21465, h: 21500, l: 21455, c: 21482, role: 'range', note: '09:29 closes inside range; 21,500 BSL and 21,400 SSL freeze at 09:30.' },
  { t: '09:31', o: 21482, h: 21530, l: 21480, c: 21520, role: 'fang1', note: 'Fang 1 sweeps above 21,500 and closes at 21,520 (bullish FVG 21,496–21,514).' },
  { t: '09:33', o: 21510, h: 21514, l: 21474, c: 21480, role: 'fang2', note: 'Fang 2 slams back inside 21,500, closing 21,480. BPR 21,496–21,510 & Open 21,510 declared.' },
  { t: '09:36', o: 21480, h: 21512, l: 21478, c: 21494, role: 'retest', note: 'Double-pass pullback tags 21,512 -> fills short limit 21,510 (Stop 21,540, 30 pts risk).' },
  { t: '09:40', o: 21494, h: 21496, l: 21456, c: 21460, role: 'out', note: 'Sellers reject BPR cleanly and break beneath 50% opening range equilibrium (21,450).' },
  { t: '09:44', o: 21460, h: 21464, l: 21436, c: 21440, role: 'out', note: 'Internal objective 21,440 reached: +70 pts ($140/MNQ) = 2.33R before costs.' },
];

const WorkedNqBearishVisual: React.FC<{ staticOnly?: boolean }> = ({ staticOnly = false }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(MNQ_BARS.length - 1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || staticOnly) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= MNQ_BARS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1350);
    return () => window.clearInterval(id);
  }, [playing, staticOnly]);

  const mapY = (p: number) => 24 + ((21550 - p) / 160) * 195;
  const active = MNQ_BARS[step];

  return (
    <ExtCard
      visualId="worked-nq-bearish"
      kicker="Animated Case Study 1 · Synthetic MNQ 1-Minute"
      title="Bearish MNQ Venom Replay: 21,510 Deferred Fill to 21,440 (2.33R)"
      caption={active.note}
    >
      <div className="vm-toolbar-split">
        <span className="vm-hud-step vm-num">
          {active.t} NY · O:{active.o} H:{active.h} L:{active.l} C:{active.c}
        </span>
        <div className="vm-control-group">
          <button type="button" className="vm-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} aria-label={t('Previous stage')}>
            <SkipBack size={14} />
          </button>
          <button
            type="button"
            className="vm-ctrl-btn is-primary"
            onClick={() => {
              if (!playing && step >= MNQ_BARS.length - 1) setStep(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button type="button" className="vm-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => Math.min(MNQ_BARS.length - 1, s + 1)); }} aria-label={t('Next stage')}>
            <SkipForward size={14} />
          </button>
          <button type="button" className="vm-ctrl-btn" onClick={() => { setPlaying(false); setStep(0); }} aria-label={t('Reset scene')}>
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <svg viewBox="0 0 740 245" className="vm-svg-stage" role="img" aria-label={t('Animated Bearish MNQ Venom Replay')}>
        <rect x="0" y="0" width="740" height="245" fill="var(--vm-stage-bg)" rx="8" />
        {[21400, 21440, 21500, 21510, 21540].map((p) => (
          <g key={p}>
            <line x1="68" y1={mapY(p)} x2="556" y2={mapY(p)} stroke="var(--vm-grid)" strokeDasharray="3 3" />
            <text x="62" y={mapY(p) + 4} textAnchor="end" className="vm-svg-axis">{p}</text>
          </g>
        ))}

        {/* 08:00-09:30 Box */}
        <rect x="76" y={mapY(21500)} width="128" height={mapY(21400) - mapY(21500)} fill="var(--vm-violet-soft)" stroke="var(--vm-violet)" strokeWidth="1.4" />
        <line x1="204" y1={mapY(21500)} x2="556" y2={mapY(21500)} stroke="var(--vm-violet)" strokeWidth="1.5" strokeDasharray="5 3" />

        {step >= 3 && (
          <>
            <rect x="258" y={mapY(21510)} width="298" height={mapY(21496) - mapY(21510)} fill="var(--vm-amber-soft)" stroke="var(--vm-amber)" strokeWidth="1.3" />
            <line x1="258" y1={mapY(21540)} x2="556" y2={mapY(21540)} stroke="var(--vm-crimson)" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="258" y1={mapY(21440)} x2="556" y2={mapY(21440)} stroke="var(--vm-teal)" strokeWidth="1.5" strokeDasharray="4 3" />
          </>
        )}

        {MNQ_BARS.slice(0, step + 1).map((b, i) => {
          const cx = 108 + i * 68;
          const fill =
            b.role === 'range'
              ? 'var(--vm-violet)'
              : b.role === 'fang1'
                ? 'var(--vm-amber)'
                : b.c >= b.o
                  ? 'var(--vm-teal)'
                  : 'var(--vm-crimson)';
          return (
            <g key={b.t}>
              <line x1={cx} y1={mapY(b.h)} x2={cx} y2={mapY(b.l)} stroke="var(--vm-wick)" strokeWidth="2" />
              <rect x={cx - 12} y={mapY(Math.max(b.o, b.c))} width="24" height={Math.max(5, Math.abs(mapY(b.o) - mapY(b.c)))} rx="2.5" fill={fill} />
              <text x={cx} y="232" textAnchor="middle" className="vm-svg-axis">{b.t}</text>
            </g>
          );
        })}

        <rect x="568" y={mapY(21540) - 11} width="158" height="22" rx="4" fill="#be123c" />
        <text x="647" y={mapY(21540) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Stop 21,540 (-$60)')}</text>

        <rect x="568" y={mapY(21510) - 11} width="158" height="22" rx="4" fill="#b45309" />
        <text x="647" y={mapY(21510) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Short Limit 21,510')}</text>

        <rect x="568" y={mapY(21440) - 11} width="158" height="22" rx="4" fill="#0f766e" />
        <text x="647" y={mapY(21440) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Target 21,440 (+$140)')}</text>
      </svg>
    </ExtCard>
  );
};

/* 16. Worked Example 2: Bullish MES 1M Replay (BPR Fill vs Unfilled Deferred) */
const MES_BARS = [
  { t: '08:40', o: 6012, h: 6020, l: 6004, c: 6008, role: 'range' },
  { t: '09:20', o: 6008, h: 6014, l: 6000, c: 6003, role: 'range' },
  { t: '09:32', o: 6003, h: 6004, l: 5994, c: 5996, role: 'fang1' },
  { t: '09:34', o: 5998, h: 6005, l: 5997.5, c: 6004.5, role: 'fang2' },
  { t: '09:37', o: 6004.5, h: 6005, l: 5999.25, c: 6003.5, role: 'retest' },
  { t: '09:42', o: 6003.5, h: 6010.5, l: 6003, c: 6009.5, role: 'out' },
  { t: '09:47', o: 6009.5, h: 6015.0, l: 6008.5, c: 6014.0, role: 'out' },
];

const WorkedEsBullishVisual: React.FC = () => {
  const { t } = useTranslation();
  const [planType, setPlanType] = useState<'bpr' | 'deferred'>('bpr');
  const mapY = (p: number) => 22 + ((6022 - p) / 30) * 195;

  const entryPrice = planType === 'bpr' ? 6000.0 : 5998.0;
  const filled = planType === 'bpr';

  return (
    <ExtCard
      visualId="worked-es-bullish"
      kicker="Interactive Case Study 2 · Synthetic MES 1-Minute Bullish Mirror"
      title="Same Price Path, Two Outcomes: BPR Midpoint Fill vs. Unfilled Deferred Open"
      caption={
        filled
          ? 'At 09:37 MES dips to 5,999.25—tagging and filling the BPR Midpoint buy limit at 6,000.00 (Stop 5,993.00, Target 6,014.00 -> 2.0R before costs).'
          : 'At 09:37 MES bottoms at 5,999.25—missing the stricter 5,998.00 deferred buy limit by 1.25 points. Price still rallies to 6,014.00 while the order stays 0R unfilled.'
      }
    >
      <div className="vm-tab-row">
        <button type="button" className={`vm-tab-btn${planType === 'bpr' ? ' is-active' : ''}`} onClick={() => setPlanType('bpr')}>
          {t('BPR Midpoint Limit (6,000.00 -> Filled)')}
        </button>
        <button type="button" className={`vm-tab-btn${planType === 'deferred' ? ' is-active' : ''}`} onClick={() => setPlanType('deferred')}>
          {t('Deferred Open Limit (5,998.00 -> Unfilled)')}
        </button>
      </div>

      <svg viewBox="0 0 740 242" className="vm-svg-stage" role="img" aria-label={t('Bullish MES Venom comparison chart')}>
        <rect x="0" y="0" width="740" height="242" fill="var(--vm-stage-bg)" rx="8" />
        {[5993, 5998, 6000, 6014, 6020].map((p) => (
          <g key={p}>
            <line x1="68" y1={mapY(p)} x2="552" y2={mapY(p)} stroke="var(--vm-grid)" strokeDasharray="3 3" />
            <text x="62" y={mapY(p) + 4} textAnchor="end" className="vm-svg-axis">{p}</text>
          </g>
        ))}

        {/* Range Box 6000-6020 */}
        <rect x="76" y={mapY(6020)} width="128" height={mapY(6000) - mapY(6020)} fill="var(--vm-violet-soft)" stroke="var(--vm-violet)" strokeWidth="1.4" />
        <line x1="204" y1={mapY(6000)} x2="552" y2={mapY(6000)} stroke="var(--vm-violet)" strokeWidth="1.5" strokeDasharray="5 3" />

        {/* Selected limit rail */}
        <line x1="258" y1={mapY(entryPrice)} x2="552" y2={mapY(entryPrice)} stroke="var(--vm-amber)" strokeWidth="2.2" />
        <line x1="258" y1={mapY(5993)} x2="552" y2={mapY(5993)} stroke="var(--vm-crimson)" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="258" y1={mapY(6014)} x2="552" y2={mapY(6014)} stroke="var(--vm-teal)" strokeWidth="1.5" strokeDasharray="4 3" />

        {MES_BARS.map((b, i) => {
          const cx = 108 + i * 68;
          const fill =
            b.role === 'range'
              ? 'var(--vm-violet)'
              : b.role === 'fang1'
                ? 'var(--vm-amber)'
                : b.c >= b.o
                  ? 'var(--vm-teal)'
                  : 'var(--vm-crimson)';
          return (
            <g key={b.t}>
              <line x1={cx} y1={mapY(b.h)} x2={cx} y2={mapY(b.l)} stroke="var(--vm-wick)" strokeWidth="2" />
              <rect x={cx - 12} y={mapY(Math.max(b.o, b.c))} width="24" height={Math.max(5, Math.abs(mapY(b.o) - mapY(b.c)))} rx="2.5" fill={fill} />
              <text x={cx} y="230" textAnchor="middle" className="vm-svg-axis">{b.t}</text>
            </g>
          );
        })}

        {/* Highlight 09:37 pullback low (5999.25) */}
        <circle cx={108 + 4 * 68} cy={mapY(5999.25)} r="9" fill="none" stroke={filled ? 'var(--vm-teal)' : 'var(--vm-crimson)'} strokeWidth="2.4" />

        <rect x="564" y={mapY(6014) - 11} width="162" height="22" rx="4" fill="#0f766e" />
        <text x="645" y={mapY(6014) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Target 6,014.00')}</text>

        <rect x="564" y={mapY(entryPrice) - 11} width="162" height="22" rx="4" fill={filled ? '#b45309' : '#475569'} />
        <text x="645" y={mapY(entryPrice) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
          {filled ? t('Filled 6,000.00 (+2R)') : t('Unfilled 5,998.00 (0R)')}
        </text>

        <rect x="564" y={mapY(5993) - 11} width="162" height="22" rx="4" fill="#be123c" />
        <text x="645" y={mapY(5993) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Stop 5,993.00')}</text>
      </svg>
    </ExtCard>
  );
};

/* 17. Stop-Loss Tier & Target Hierarchy Planner */
const StopTargetPlannerVisual: React.FC = () => {
  const { t } = useTranslation();
  const [stopPrice, setStopPrice] = useState(114.0);
  const [targetPrice, setTargetPrice] = useState(104.0);

  const metrics = useMemo(
    () => computeEntryPlan('bearish', 111.0, stopPrice, targetPrice),
    [stopPrice, targetPrice],
  );

  return (
    <ExtCard
      visualId="stop-target-planner"
      kicker="Interactive Risk & Target Planner · Bearish Entry 111.0"
      title="Compare Three Stop Tiers & Three Objective Levels"
      caption="Select a stop tier and target objective below. Tier 2 (Protected Sweep Extreme 114.0) pairs structural validity with transparent 2.0R–2.33R internal targets."
    >
      <div className="vm-toolbar-split">
        <div className="vm-tab-row">
          <button type="button" className={`vm-ctrl-btn${stopPrice === 112.2 ? ' is-active' : ''}`} onClick={() => setStopPrice(112.2)}>
            {t('Tier 1 Tight (112.2)')}
          </button>
          <button type="button" className={`vm-ctrl-btn${stopPrice === 114.0 ? ' is-active' : ''}`} onClick={() => setStopPrice(114.0)}>
            {t('Tier 2 Sweep Extreme (114.0)')}
          </button>
          <button type="button" className={`vm-ctrl-btn${stopPrice === 115.5 ? ' is-active' : ''}`} onClick={() => setStopPrice(115.5)}>
            {t('Tier 3 Wide Buffer (115.5)')}
          </button>
        </div>
        <div className="vm-tab-row">
          <button type="button" className={`vm-ctrl-btn${targetPrice === 105.0 ? ' is-active' : ''}`} onClick={() => setTargetPrice(105.0)}>
            {t('50% Box (105.0)')}
          </button>
          <button type="button" className={`vm-ctrl-btn${targetPrice === 104.0 ? ' is-active' : ''}`} onClick={() => setTargetPrice(104.0)}>
            {t('Internal (104.0)')}
          </button>
          <button type="button" className={`vm-ctrl-btn${targetPrice === 100.0 ? ' is-active' : ''}`} onClick={() => setTargetPrice(100.0)}>
            {t('Opposite Low (100.0)')}
          </button>
        </div>
      </div>

      <div className="vm-metric-grid">
        <div className="vm-metric-cell">
          <span>{t('Hard Stop Distance')}</span>
          <strong className="vm-num">{metrics.risk.toFixed(1)} pts</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Target Distance')}</span>
          <strong className="vm-num">{metrics.reward.toFixed(1)} pts</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Planned R (pre-cost)')}</span>
          <strong className="vm-num">{metrics.rr.toFixed(2)}R</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Break-Even (pre-cost)')}</span>
          <strong className="vm-num">{metrics.breakEvenBeforeCostsPct.toFixed(1)}%</strong>
        </div>
      </div>
    </ExtCard>
  );
};

/* 18. Five-Scenario Stick-Figure Mistake Clinic */
const MISTAKES = [
  {
    id: 'early-fade',
    tab: '1. Shorting Fang 1 Early',
    title: 'Mistake 1: Blindly Selling Above 110.0 Before Fang 2 Exists',
    wrong: 'Selling the moment price crosses 110.5 on a true opening trend day, getting run over as candles keep closing at 113, 115, and 118.',
    fix: 'Wait until an opposing bearish Fang 2 closes cleanly back beneath 110.0 with visible downward displacement.',
  },
  {
    id: 'rth-chart',
    tab: '2. Using RTH Chart',
    title: 'Mistake 2: Plotting Regular Trading Hours Instead of ETH',
    wrong: 'Hiding 08:00–09:29 pre-market candles and drawing an invented box from yesterday’s close or random morning bars.',
    fix: 'Switch chart data settings to Extended Trading Hours (ETH) and verify America/New_York DST time.',
  },
  {
    id: 'chasing',
    tab: '3. Chasing at 108.0',
    title: 'Mistake 3: Chasing a Single-Pass Drop After Missing 111.0',
    wrong: 'Market-selling at 108.0 with the same 114.0 stop and 104.0 target, turning a 2.33R plan into a 0.67R gamble.',
    fix: 'Accept 0R missed fills gracefully; never repair a missed pullback by sliding the trigger lower.',
  },
  {
    id: 'no-expiry',
    tab: '4. No Time Expiry',
    title: 'Mistake 4: Leaving Morning Limit Orders Open Past 11:00 NY',
    wrong: 'Getting filled at 13:45 afternoon chop long after the 09:30 opening liquidity thesis expired.',
    fix: 'Set an automatic cancel-by timestamp (e.g., 11:00–11:30 AM NY) before the bell rings.',
  },
  {
    id: 'rigid-chain',
    tab: '5. Mandatory 5-Stage Myth',
    title: 'Mistake 5: Forcing Optional Filters Into a Rigid Template',
    wrong: 'Either skipping clean setups because SMT was absent, or squinting to hallucinate tiny non-existent FVGs.',
    fix: 'Require only the core observables (frozen box, closing Fang 1, opposing Fang 2); tag SMT & 1st PFVG as optional.',
  },
];

const MistakeClinicVisual: React.FC = () => {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  const m = MISTAKES[idx];

  return (
    <ExtCard
      visualId="mistake-clinic"
      kicker="Interactive Stick-Figure Mistake Clinic"
      title="Diagnose & Fix the Five Most Common Venom Execution Traps"
      caption="Click through all five stick-figure cases to recognize each trap before live opening volatility tests your discipline."
    >
      <div className="vm-tab-row">
        {MISTAKES.map((item, i) => (
          <button key={item.id} type="button" className={`vm-tab-btn${idx === i ? ' is-active' : ''}`} onClick={() => setIdx(i)}>
            {t(item.tab)}
          </button>
        ))}
      </div>

      <div className="vm-mistake-stage">
        <svg viewBox="0 0 260 180" className="vm-svg-stage" role="img" aria-label={t(m.title)}>
          <rect x="0" y="0" width="260" height="180" fill="var(--vm-stage-bg)" rx="8" />
          {/* Frustrated stick figure + chart trap */}
          <circle cx="58" cy="64" r="12" fill="none" stroke="var(--vm-crimson)" strokeWidth="2.4" />
          <line x1="58" y1="76" x2="58" y2="122" stroke="var(--vm-crimson)" strokeWidth="2.4" />
          <line x1="40" y1="92" x2="76" y2="82" stroke="var(--vm-crimson)" strokeWidth="2.4" />
          <line x1="58" y1="122" x2="44" y2="152" stroke="var(--vm-crimson)" strokeWidth="2.4" />
          <line x1="58" y1="122" x2="72" y2="152" stroke="var(--vm-crimson)" strokeWidth="2.4" />
          {/* X warning badge */}
          <circle cx="88" cy="46" r="11" fill="var(--vm-crimson)" />
          <text x="88" y="50" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">!</text>

          {/* Mini schematic varying by scenario */}
          <rect x="116" y="34" width="126" height="114" rx="6" fill="var(--vm-surface)" stroke="var(--vm-border)" />
          {idx === 0 && (
            <polyline points="128,128 152,102 178,76 206,52 232,42" fill="none" stroke="var(--vm-crimson)" strokeWidth="3" />
          )}
          {idx === 1 && (
            <>
              <rect x="128" y="56" width="46" height="68" fill="var(--vm-crimson-soft)" stroke="var(--vm-crimson)" strokeDasharray="4 3" />
              <text x="151" y="94" textAnchor="middle" className="vm-svg-tag-crimson">RTH?</text>
            </>
          )}
          {idx === 2 && (
            <>
              <line x1="126" y1="54" x2="232" y2="54" stroke="var(--vm-amber)" strokeDasharray="4 3" />
              <polyline points="132,76 164,104 198,124 228,136" fill="none" stroke="var(--vm-crimson)" strokeWidth="3" />
              <circle cx="198" cy="124" r="5" fill="var(--vm-crimson)" />
            </>
          )}
          {idx === 3 && (
            <>
              <circle cx="179" cy="90" r="28" fill="none" stroke="var(--vm-amber)" strokeWidth="2.4" />
              <line x1="179" y1="90" x2="179" y2="70" stroke="var(--vm-crimson)" strokeWidth="2.4" />
              <line x1="179" y1="90" x2="196" y2="98" stroke="var(--vm-crimson)" strokeWidth="2.4" />
              <text x="179" y="136" textAnchor="middle" className="vm-svg-axis">13:45 NY</text>
            </>
          )}
          {idx === 4 && (
            <>
              <text x="179" y="72" textAnchor="middle" className="vm-svg-axis">SMT? OB? BB?</text>
              <text x="179" y="96" textAnchor="middle" className="vm-svg-axis">1st PFVG? OTE?</text>
              <text x="179" y="122" textAnchor="middle" className="vm-svg-tag-crimson">{t('Over-Filtered')}</text>
            </>
          )}
        </svg>

        <div className="vm-mistake-copy">
          <p className="vm-mistake-title">{t(m.title)}</p>
          <p className="vm-mistake-wrong"><strong>{t('Trap')}:</strong> {t(m.wrong)}</p>
          <p className="vm-mistake-fix"><strong>{t('Fix')}:</strong> {t(m.fix)}</p>
        </div>
      </div>
    </ExtCard>
  );
};

/* 19. Pre-Session Execution Routine Timeline */
const ExecutionChecklistVisual: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ExtCard
      visualId="execution-checklist"
      kicker="Pre-Session Visual Protocol · America/New_York"
      title="Four-Checkpoint Morning Venom Chronometer"
      caption="Lock in your ETH feed, range boundaries, entry archetype, and hard expiry timestamp before 09:30:00 AM New York time."
    >
      <svg viewBox="0 0 740 132" className="vm-svg-stage" role="img" aria-label={t('Morning Venom execution timeline')}>
        <rect x="0" y="0" width="740" height="132" fill="var(--vm-stage-bg)" rx="8" />
        <line x1="68" y1="54" x2="672" y2="54" stroke="var(--vm-violet)" strokeWidth="3" />
        {[
          { x: 96, time: '08:00 NY', title: 'Open ETH Box', color: '#5b21b6' },
          { x: 282, time: '09:29 NY', title: 'Freeze High/Low', color: '#b45309' },
          { x: 468, time: '09:30–10:15', title: 'Wait for Two Fangs', color: '#0f766e' },
          { x: 644, time: '11:00 NY', title: 'Cancel Unfilled', color: '#be123c' },
        ].map((cp) => (
          <g key={cp.time}>
            <circle cx={cp.x} cy="54" r="11" fill={cp.color} />
            <text x={cp.x} y="30" textAnchor="middle" className="vm-comic-head">{cp.time}</text>
            <text x={cp.x} y="88" textAnchor="middle" className="vm-comic-note">{t(cp.title)}</text>
          </g>
        ))}
      </svg>
    </ExtCard>
  );
};

export const VenomExtendedVisuals: React.FC<VenomExtendedVisualsProps> = ({
  visualId,
  staticOnly = false,
}) => {
  switch (visualId) {
    case 'chasing-calculator':
      return <ChasingCalculatorVisual />;
    case 'smt-htf-context':
      return <SmtHtfContextVisual />;
    case 'model-comparison':
      return <ModelComparisonVisual />;
    case 'market-timeframe':
      return <MarketTimeframeVisual />;
    case 'setup-grader':
      return <SetupGraderVisual />;
    case 'worked-nq-bearish':
      return <WorkedNqBearishVisual staticOnly={staticOnly} />;
    case 'worked-es-bullish':
      return <WorkedEsBullishVisual />;
    case 'stop-target-planner':
      return <StopTargetPlannerVisual />;
    case 'mistake-clinic':
      return <MistakeClinicVisual />;
    case 'execution-checklist':
      return <ExecutionChecklistVisual />;
    default:
      return null;
  }
};
