import React, { useMemo, useState } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import { computeCostAdjustedMetrics } from '../utils/breadButterMath';

/* 10. Interactive Cost-Adjusted Cross-Asset Objective Calculator */
const PipVsFuturesCalculatorVisual: React.FC = () => {
  const { t } = useTranslation();
  const presets = {
    eurusd: { label: 'EUR/USD (pips)', unit: 'pips', risk: 20, target: 30, cost: 1.0, adr: 85 },
    mnq: { label: 'MNQ (pts)', unit: 'pts', risk: 35, target: 65, cost: 1.25, adr: 310 },
    mes: { label: 'MES (pts)', unit: 'pts', risk: 10, target: 18, cost: 0.5, adr: 65 },
    xauusd: { label: 'XAU/USD ($)', unit: '$', risk: 6, target: 11, cost: 0.45, adr: 38 },
  };
  type Key = keyof typeof presets;
  const [asset, setAsset] = useState<Key>('eurusd');
  const [risk, setRisk] = useState(20);
  const [target, setTarget] = useState(30);
  const [cost, setCost] = useState(1.0);

  const selectPreset = (key: Key) => {
    setAsset(key);
    setRisk(presets[key].risk);
    setTarget(presets[key].target);
    setCost(presets[key].cost);
  };

  const metrics = useMemo(() => computeCostAdjustedMetrics(risk, target, cost), [risk, target, cost]);
  const current = presets[asset];
  const adrShare = Number(((target / current.adr) * 100).toFixed(1));

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="pip-vs-futures-calculator">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 10 · Interactive Risk & Cost Lab · Cross-Asset Scaling')}</span>
        <h3 className="bb70-visual-title">{t('Pre-Cost vs. After-Cost Net R Across Forex, Futures & Gold')}</h3>
      </div>

      <div className="bb70-controls">
        {(Object.keys(presets) as Key[]).map((k) => (
          <button key={k} type="button" className="bb70-btn" aria-pressed={asset === k} onClick={() => selectPreset(k)}>
            {t(presets[k].label)}
          </button>
        ))}
      </div>

      <div className="bb70-slider-grid">
        <div className="bb70-slider-field">
          <label htmlFor="bb70-calc-risk">
            <span>{t('Stop Risk')} ({current.unit})</span>
            <span>{risk}</span>
          </label>
          <input id="bb70-calc-risk" type="range" min="4" max="60" step="1" value={risk} onChange={(e) => setRisk(Number(e.target.value))} />
        </div>
        <div className="bb70-slider-field">
          <label htmlFor="bb70-calc-target">
            <span>{t('Gross Objective')} ({current.unit})</span>
            <span>{target}</span>
          </label>
          <input id="bb70-calc-target" type="range" min="6" max="100" step="1" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
        </div>
        <div className="bb70-slider-field">
          <label htmlFor="bb70-calc-cost">
            <span>{t('Round-Trip Spread + Fees')}</span>
            <span>{cost.toFixed(2)}</span>
          </label>
          <input id="bb70-calc-cost" type="range" min="0" max="4" step="0.25" value={cost} onChange={(e) => setCost(Number(e.target.value))} />
        </div>
      </div>

      <div className="bb70-metrics-grid">
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Gross R (Before Costs)')}</span>
          <span className="bb70-metric-value">{metrics.grossR.toFixed(2)}R</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Net R (After Costs)')}</span>
          <span className="bb70-metric-value" style={{ color: 'var(--bb70-pine)' }}>{metrics.netR.toFixed(2)}R</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Net Break-Even Hit Freq.')}</span>
          <span className="bb70-metric-value">{metrics.netBreakEvenPct.toFixed(1)}%</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Share of Typical ADR')}</span>
          <span className="bb70-metric-value">{adrShare}% ({current.adr} {current.unit})</span>
        </div>
      </div>
    </figure>
  );
};

/* 11. Interactive Session Killzone & Asian Range % of ADR Visualizer */
const SessionAdrClockVisual: React.FC = () => {
  const { t } = useTranslation();
  const [asianPips, setAsianPips] = useState(24);
  const adr = 80;
  const pct = Math.round((asianPips / adr) * 100);
  const status =
    pct <= 35
      ? { label: 'Ideal Tight Box · Strong Expansion Room Remaining', color: 'var(--bb70-pine)' }
      : pct <= 50
        ? { label: 'Moderate Box · Require Clean HTF Draw & Tight Stop', color: 'var(--bb70-ochre)' }
        : { label: 'Exhausted Asian Range · High Risk of Dead Chop (Skip)', color: 'var(--bb70-terra)' };

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="session-adr-clock">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 11 · Session Clock & ADR Fuel Gauge · America/New_York')}</span>
        <h3 className="bb70-visual-title">{t('Killzone Timeline & Asian Range Consumption of 5-Day ADR')}</h3>
      </div>

      <div className="bb70-slider-grid">
        <div className="bb70-slider-field">
          <label htmlFor="bb70-asian-pips">
            <span>{t('Asian Consolidation Width (vs. 80-pip 5-day ADR)')}</span>
            <span>{asianPips} pips ({pct}% ADR)</span>
          </label>
          <input id="bb70-asian-pips" type="range" min="14" max="68" step="2" value={asianPips} onChange={(e) => setAsianPips(Number(e.target.value))} />
        </div>
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 175" className="bb70-svg" role="img" aria-label={t('Session killzone timeline and ADR budget meter')}>
          <rect x="0" y="0" width="720" height="175" rx="10" fill="var(--bb70-surface)" />
          {/* Session Timeline Blocks */}
          <rect x="24" y="26" width="160" height="44" rx="6" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" />
          <text x="104" y="45" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-cerulean)">{t('Asian Box')}</text>
          <text x="104" y="61" textAnchor="middle" fontSize="9.5" fill="var(--bb70-muted)">20:00–00:00 NY</text>

          <rect x="196" y="26" width="160" height="44" rx="6" fill="var(--bb70-pine-soft)" stroke="var(--bb70-pine)" />
          <text x="276" y="45" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-pine)">{t('London Killzone')}</text>
          <text x="276" y="61" textAnchor="middle" fontSize="9.5" fill="var(--bb70-muted)">02:00–05:00 NY</text>

          <rect x="368" y="26" width="160" height="44" rx="6" fill="var(--bb70-pine-soft)" stroke="var(--bb70-pine)" />
          <text x="448" y="45" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-pine)">{t('New York Killzone')}</text>
          <text x="448" y="61" textAnchor="middle" fontSize="9.5" fill="var(--bb70-muted)">07:00–10:00 NY</text>

          <rect x="540" y="26" width="156" height="44" rx="6" fill="var(--bb70-ochre-soft)" stroke="var(--bb70-ochre)" />
          <text x="618" y="45" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--bb70-ochre)">{t('London Close')}</text>
          <text x="618" y="61" textAnchor="middle" fontSize="9.5" fill="var(--bb70-muted)">10:00–12:00 NY</text>

          {/* ADR Fuel Bar */}
          <text x="24" y="102" fontSize="11" fontWeight="700" fill="var(--bb70-ink)">
            {t('5-Day ADR Capacity Used Before London Open')}
          </text>
          <rect x="24" y="112" width="672" height="24" rx="6" fill="var(--bb70-stage-bg)" stroke="var(--bb70-border)" />
          <rect x="24" y="112" width={Math.min(672, (pct / 100) * 672)} height="24" rx="6" fill={status.color} />
          <text x="360" y="158" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={status.color}>
            {t(status.label)}
          </text>
        </svg>
      </div>
    </figure>
  );
};

/* 12. Interactive Higher-Timeframe Context vs. Equilibrium Trap Map */
const HtfContextAlignmentVisual: React.FC = () => {
  const { t } = useTranslation();
  const [scenario, setScenario] = useState<'aligned' | 'ceiling'>('aligned');

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="htf-context-alignment">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 12 · Multi-Timeframe Context · Daily Draw vs. 5m Box')}</span>
        <h3 className="bb70-visual-title">{t('Why Identical 5-Minute Sweeps Behave Differently Across Daily Locations')}</h3>
      </div>

      <div className="bb70-controls">
        <button type="button" className="bb70-btn" aria-pressed={scenario === 'aligned'} onClick={() => setScenario('aligned')}>
          {t('Aligned: Discount Launch With Open Air Above')}
        </button>
        <button type="button" className="bb70-btn" aria-pressed={scenario === 'ceiling'} onClick={() => setScenario('ceiling')}>
          {t('Trap: Buying Directly Beneath Daily Resistance')}
        </button>
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 220" className="bb70-svg" role="img" aria-label={t('Higher-timeframe alignment map')}>
          <rect x="0" y="0" width="720" height="220" rx="10" fill="var(--bb70-surface)" />
          {/* Daily High / 50% / Low Rails */}
          <line x1="28" y1="32" x2="692" y2="32" stroke="var(--bb70-terra)" strokeWidth="1.8" />
          <text x="688" y="24" textAnchor="end" fontSize="10.5" fontWeight="700" fill="var(--bb70-terra)">{t('Daily Buy-Side High (HTF Obstacle)')}</text>
          <line x1="28" y1="112" x2="692" y2="112" stroke="var(--bb70-ochre)" strokeDasharray="5 4" />
          <text x="688" y="106" textAnchor="end" fontSize="10" fontWeight="600" fill="var(--bb70-ochre)">{t('Daily 50% Midpoint')}</text>
          <line x1="28" y1="192" x2="692" y2="192" stroke="var(--bb70-pine)" strokeWidth="1.8" />
          <text x="688" y="208" textAnchor="end" fontSize="10.5" fontWeight="700" fill="var(--bb70-pine)">{t('Daily Discount Support / Order Block')}</text>

          {scenario === 'aligned' ? (
            <>
              <rect x="92" y="142" width="130" height="42" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" strokeWidth="1.6" />
              <polyline points="104,162 152,150 202,174 260,196 322,148 370,164 494,96 616,42" fill="none" stroke="var(--bb70-pine)" strokeWidth="2.8" />
              <text x="440" y="76" fontSize="11" fontWeight="700" fill="var(--bb70-pine)">
                {t('Clean Room to Expand Into Daily High')}
              </text>
            </>
          ) : (
            <>
              <rect x="92" y="42" width="130" height="42" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" strokeWidth="1.6" />
              <polyline points="104,64 152,50 202,74 260,94 316,52 362,64 410,36 492,118 612,174" fill="none" stroke="var(--bb70-terra)" strokeWidth="2.8" />
              <circle cx="410" cy="36" r="6" fill="var(--bb70-terra)" />
              <text x="424" y="54" fontSize="11" fontWeight="700" fill="var(--bb70-terra)">
                {t('Blocked Immediately by Daily Resistance!')}
              </text>
            </>
          )}
        </svg>
      </div>
    </figure>
  );
};

/* 13. Interactive 5-Model Comparator */
const ModelComparisonMatrixVisual: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<'bb' | 'sb' | 'm22' | 'venom' | 'orb'>('bb');

  const items = {
    bb: {
      name: 'Bread-and-Butter (Ch. 70)',
      anchor: 'Asian or pre-open horizontal box',
      trigger: 'Sweep + displacement or breakout retest into FVG/OB/OTE',
      window: 'London (02–05 NY) or NY (07–10 NY)',
      bestFor: 'Learners wanting one repeatable modest intraday routine across FX & futures.',
    },
    sb: {
      name: 'ICT Silver Bullet (Ch. 64)',
      anchor: 'Internal sweep inside fixed 60-min slot',
      trigger: 'First clean FVG inside the hour',
      window: '03–04, 10–11, or 14–15 NY',
      bestFor: 'Traders with a strict 1-hour daily schedule.',
    },
    m22: {
      name: 'ICT 2022 Model (Ch. 63)',
      anchor: 'HTF swing liquidity (PDH/PDL/Session)',
      trigger: 'Sweep -> MSS -> Displacement FVG',
      window: 'London & NY Killzones',
      bestFor: 'Traders anchoring primarily to higher-timeframe swing highs and lows.',
    },
    venom: {
      name: 'ICT Venom Model (Ch. 67)',
      anchor: 'Frozen 08:00–09:30 NY ETH box',
      trigger: 'Closing Fang 1 sweep + opposing Fang 2 BPR/FVG',
      window: '09:30–11:00 NY Equities Open',
      bestFor: 'Index futures traders specializing in the 09:30 cash-open reversal.',
    },
    orb: {
      name: 'Classic ORB',
      anchor: 'First 5m/15m/30m RTH opening range',
      trigger: 'Raw breakout stop order beyond edge',
      window: '09:35–10:30 NY',
      bestFor: 'Momentum breakout traders who accept lower fill discipline on fakeouts.',
    },
  };
  const info = items[selected];

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="model-comparison-matrix">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 13 · Model Selector · Keep Playbook Boundaries Clean')}</span>
        <h3 className="bb70-visual-title">{t('Interactive Five-Model Blueprint Comparator')}</h3>
      </div>

      <div className="bb70-controls">
        {(Object.keys(items) as Array<keyof typeof items>).map((k) => (
          <button key={k} type="button" className="bb70-btn" aria-pressed={selected === k} onClick={() => setSelected(k)}>
            {t(items[k].name)}
          </button>
        ))}
      </div>

      <div className="bb70-metrics-grid">
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Range / Liquidity Anchor')}</span>
          <span className="bb70-metric-value">{t(info.anchor)}</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Entry Trigger')}</span>
          <span className="bb70-metric-value">{t(info.trigger)}</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Clock Window')}</span>
          <span className="bb70-metric-value">{t(info.window)}</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Best Fit')}</span>
          <span className="bb70-metric-value">{t(info.bestFor)}</span>
        </div>
      </div>
    </figure>
  );
};

/* 14. Interactive Six-Gate Binary Setup Grader */
const SetupGraderVisual: React.FC = () => {
  const { t } = useTranslation();
  const gates = [
    'Pre-breakout box high, low, and 50% midpoint locked before killzone open',
    'Pre-open box width is under 40% of the instrument 5-day ADR',
    'Daily/4H directional liquidity draw aligns with clear room to target',
    'Active London or NY killzone with no imminent high-impact macro release',
    'Clear sweep + displacement (or clean breakout retest) leaving an FVG/OB',
    'Stop tier, limit price, spread/commission cost, and Net R calculated pre-entry',
  ];
  const [checks, setChecks] = useState<boolean[]>([true, true, true, true, true, true]);
  const score = checks.filter(Boolean).length;

  const grade =
    score === 6
      ? { text: 'Grade A (6/6) · Qualified Bread-and-Butter Execution', color: 'var(--bb70-pine)' }
      : score >= 4
        ? { text: 'Grade B (4–5/6) · Borderline — Reduce Risk or Wait for Cleaner Bar', color: 'var(--bb70-ochre)' }
        : { text: 'Stand Down (0–3/6) · Log as Skipped Session', color: 'var(--bb70-terra)' };

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="setup-grader">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 14 · Pre-Trade Decision Engine · Binary Pass/Fail')}</span>
        <h3 className="bb70-visual-title">{t('Six-Gate Bread-and-Butter Setup Grader')}</h3>
      </div>

      <div className="bb70-check-list">
        {gates.map((label, idx) => (
          <label key={label} className="bb70-check-item">
            <input
              type="checkbox"
              checked={checks[idx]}
              onChange={(e) =>
                setChecks((prev) => prev.map((val, i) => (i === idx ? e.target.checked : val)))
              }
            />
            <span>{idx + 1}. {t(label)}</span>
          </label>
        ))}
      </div>

      <div className="bb70-metrics-grid">
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Binary Gate Score')}</span>
          <span className="bb70-metric-value">{score} / 6</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Execution Decision')}</span>
          <span className="bb70-metric-value" style={{ color: grade.color }}>{t(grade.text)}</span>
        </div>
      </div>
    </figure>
  );
};

/* 15. Animated 7-Step Bullish EUR/USD Worked Example Replay */
const WorkedEurusdBuyVisual: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(4);

  const steps = [
    { label: '1. Asian Box (1.0800–1.0830)', note: '00:00–02:55 NY locks a 30-pip box (35% of 85-pip ADR). Midpoint sits at 1.0815.' },
    { label: '2. London Sweep (1.0792)', note: '03:05 NY sweeps below 1.0800 SSL down to 1.0792, halting ahead of 1.0780.' },
    { label: '3. Displacement + FVG', note: '03:10 NY displaces cleanly back inside the box to 1.0816, leaving a 1.0804–1.0812 FVG.' },
    { label: '4. Limit Fill (1.0806)', note: '03:15 NY retraces to 1.0805, filling the 1.0806 buy limit with stop at 1.0786 (20 pips risk).' },
    { label: '5. Target Delivery (1.0836)', note: '03:45 NY clears 1.0830 BSL and fills 1.0836 (+30 gross pips / +1.38 Net R after 1.0 pip cost).' },
  ];

  const bars = [
    { x: 70, o: 1.0812, h: 1.0825, l: 1.0804, c: 1.0822, minStep: 0 },
    { x: 120, o: 1.0822, h: 1.0830, l: 1.0806, c: 1.0808, minStep: 0 },
    { x: 170, o: 1.0808, h: 1.0826, l: 1.0800, c: 1.0820, minStep: 0 },
    { x: 220, o: 1.0820, h: 1.0824, l: 1.0802, c: 1.0805, minStep: 0 },
    { x: 284, o: 1.0805, h: 1.0807, l: 1.0792, c: 1.0798, minStep: 1, sweep: true },
    { x: 348, o: 1.0798, h: 1.0818, l: 1.0797, c: 1.0816, minStep: 2 },
    { x: 412, o: 1.0816, h: 1.0817, l: 1.0805, c: 1.0811, minStep: 3 },
    { x: 476, o: 1.0811, h: 1.0828, l: 1.0809, c: 1.0826, minStep: 4 },
    { x: 540, o: 1.0826, h: 1.0839, l: 1.0823, c: 1.0837, minStep: 4 },
  ];

  const mapY = (p: number) => 22 + ((1.0844 - p) / (1.0844 - 1.0782)) * 184;

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="worked-eurusd-buy">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 15 · Worked Example 1 · Synthetic EUR/USD 5m Replay')}</span>
        <h3 className="bb70-visual-title">{t('Step-by-Step London Bullish Range Sweep (1.0806 -> 1.0836)')}</h3>
      </div>

      <div className="bb70-controls">
        {steps.map((s, idx) => (
          <button key={s.label} type="button" className="bb70-btn" aria-pressed={step === idx} onClick={() => setStep(idx)}>
            {t(s.label)}
          </button>
        ))}
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 232" className="bb70-svg" role="img" aria-label={t('Worked EUR/USD 5m bullish Bread-and-Butter replay')}>
          <rect x="0" y="0" width="720" height="232" rx="10" fill="var(--bb70-surface)" />
          {/* Asian Box */}
          <rect x="46" y={mapY(1.0830)} width="198" height={mapY(1.0800) - mapY(1.0830)} fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" strokeWidth="1.4" />
          <line x1="244" y1={mapY(1.0830)} x2="572" y2={mapY(1.0830)} stroke="var(--bb70-cerulean)" strokeDasharray="4 3" />
          <line x1="244" y1={mapY(1.0800)} x2="572" y2={mapY(1.0800)} stroke="var(--bb70-cerulean)" strokeDasharray="4 3" />

          {step >= 2 && (
            <>
              <rect x="332" y={mapY(1.0812)} width="240" height={mapY(1.0804) - mapY(1.0812)} fill="var(--bb70-pine-soft)" />
              <line x1="332" y1={mapY(1.0806)} x2="572" y2={mapY(1.0806)} stroke="var(--bb70-pine)" strokeWidth="1.6" />
              <line x1="332" y1={mapY(1.0786)} x2="572" y2={mapY(1.0786)} stroke="var(--bb70-terra)" strokeDasharray="4 3" strokeWidth="1.4" />
              <line x1="332" y1={mapY(1.0836)} x2="572" y2={mapY(1.0836)} stroke="var(--bb70-pine)" strokeDasharray="4 3" strokeWidth="1.4" />
            </>
          )}

          {bars.filter((b) => b.minStep <= step).map((b) => {
            const up = b.c >= b.o;
            const top = mapY(Math.max(b.o, b.c));
            const bot = mapY(Math.min(b.o, b.c));
            const fill = b.sweep ? 'var(--bb70-terra)' : up ? 'var(--bb70-pine)' : 'var(--bb70-muted)';
            return (
              <g key={b.x}>
                <line x1={b.x} y1={mapY(b.h)} x2={b.x} y2={mapY(b.l)} stroke="var(--bb70-ink)" strokeWidth="1.6" />
                <rect x={b.x - 10} y={top} width="20" height={Math.max(5, bot - top)} rx="2.5" fill={fill} />
              </g>
            );
          })}

          {/* Right Labels */}
          {[
            { p: 1.0836, text: 'Target 1.0836', color: 'var(--bb70-pine)', show: step >= 2 },
            { p: 1.0830, text: 'Box High 1.0830', color: 'var(--bb70-cerulean)', show: true },
            { p: 1.0806, text: 'Limit 1.0806', color: 'var(--bb70-pine)', show: step >= 2 },
            { p: 1.0800, text: 'Box Low 1.0800', color: 'var(--bb70-cerulean)', show: true },
            { p: 1.0786, text: 'Stop 1.0786', color: 'var(--bb70-terra)', show: step >= 2 },
          ]
            .filter((r) => r.show)
            .map((r) => (
              <g key={r.text}>
                <rect x="580" y={mapY(r.p) - 10} width="126" height="20" rx="4" fill="var(--bb70-stage-bg)" stroke={r.color} />
                <text x="643" y={mapY(r.p) + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--bb70-ink)">
                  {t(r.text)}
                </text>
              </g>
            ))}
        </svg>
      </div>

      <div className="bb70-extract" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
        <p style={{ marginBottom: 0 }}>{t(steps[step].note)}</p>
      </div>
    </figure>
  );
};

/* 16. Interactive Bearish GBP/USD Sell Example (Filled vs. Unfilled Runaway) */
const WorkedGbpusdSellVisual: React.FC = () => {
  const { t } = useTranslation();
  const [branch, setBranch] = useState<'filled' | 'unfilled'>('filled');

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="worked-gbpusd-sell">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 16 · Worked Example 2 · Synthetic GBP/USD 5m Bearish Sell')}</span>
        <h3 className="bb70-visual-title">{t('Comparing a Filled Retest (+1.47 Net R) vs. an Unfilled Runaway (0R)')}</h3>
      </div>

      <div className="bb70-controls">
        <button type="button" className="bb70-btn" aria-pressed={branch === 'filled'} onClick={() => setBranch('filled')}>
          {t('Scenario A: Filled Retest at 1.2704 (+1.47 Net R)')}
        </button>
        <button type="button" className="bb70-btn" aria-pressed={branch === 'unfilled'} onClick={() => setBranch('unfilled')}>
          {t('Scenario B: Unfilled Runaway Drop (0R Scratch)')}
        </button>
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 232" className="bb70-svg" role="img" aria-label={t('Worked GBP/USD bearish Bread-and-Butter comparison')}>
          <rect x="0" y="0" width="720" height="232" rx="10" fill="var(--bb70-surface)" />
          {/* Pre-Open Box 1.2680-1.2710 */}
          <rect x="44" y="72" width="180" height="84" fill="var(--bb70-cerulean-soft)" stroke="var(--bb70-cerulean)" strokeWidth="1.5" />
          <line x1="224" y1="72" x2="564" y2="72" stroke="var(--bb70-cerulean)" strokeDasharray="4 3" />
          <line x1="224" y1="156" x2="564" y2="156" stroke="var(--bb70-cerulean)" strokeDasharray="4 3" />
          {/* Stop 1.2722 / Limit 1.2704 / Target 1.2674 */}
          <line x1="250" y1="36" x2="564" y2="36" stroke="var(--bb70-terra)" strokeDasharray="4 3" strokeWidth="1.4" />
          <rect x="300" y="78" width="264" height="22" fill="var(--bb70-terra-soft)" />
          <line x1="300" y1="88" x2="564" y2="88" stroke="var(--bb70-terra)" strokeWidth="1.6" />
          <line x1="300" y1="184" x2="564" y2="184" stroke="var(--bb70-pine)" strokeDasharray="4 3" strokeWidth="1.5" />

          {branch === 'filled' ? (
            <>
              <polyline points="56,120 96,84 142,144 186,88 220,126 274,48 332,124 396,86 474,148 544,192" fill="none" stroke="var(--bb70-terra)" strokeWidth="2.8" />
              <circle cx="396" cy="86" r="6" fill="var(--bb70-pine)" />
              <text x="410" y="74" fontSize="10.5" fontWeight="700" fill="var(--bb70-pine)">{t('Filled Short Limit (1.2704)')}</text>
            </>
          ) : (
            <>
              <polyline points="56,120 96,84 142,144 186,88 220,126 274,48 332,124 396,112 474,162 544,198" fill="none" stroke="var(--bb70-ochre)" strokeWidth="2.8" />
              <circle cx="396" cy="112" r="6" fill="var(--bb70-ochre)" />
              <text x="408" y="114" fontSize="10.5" fontWeight="700" fill="var(--bb70-ochre)">{t('Missed Limit by 8 pips -> Log 0R')}</text>
            </>
          )}

          {[
            { y: 36, text: 'Stop 1.2722', color: 'var(--bb70-terra)' },
            { y: 72, text: 'Box High 1.2710', color: 'var(--bb70-cerulean)' },
            { y: 92, text: 'Short Limit 1.2704', color: 'var(--bb70-terra)' },
            { y: 156, text: 'Box Low 1.2680', color: 'var(--bb70-cerulean)' },
            { y: 184, text: 'Target 1.2674', color: 'var(--bb70-pine)' },
          ].map((r) => (
            <g key={r.text}>
              <rect x="572" y={r.y - 10} width="134" height="20" rx="4" fill="var(--bb70-stage-bg)" stroke={r.color} />
              <text x="639" y={r.y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--bb70-ink)">
                {t(r.text)}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </figure>
  );
};

/* 17. Interactive 10-Session Whole-Sample Ledger */
const WholeSampleLedgerVisual: React.FC = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<'honest' | 'cherry'>('honest');

  const sessions = [
    { day: 'S01', status: 'Win', netR: '+1.38R', note: 'London sweep filled -> target' },
    { day: 'S02', status: 'No-Trade', netR: '0.00R', note: 'Asian range 68% ADR (skipped)' },
    { day: 'S03', status: 'Loss', netR: '-1.05R', note: 'Filled limit -> stop + cost' },
    { day: 'S04', status: 'Unfilled', netR: '0.00R', note: 'Runaway move missed limit' },
    { day: 'S05', status: 'Win', netR: '+1.42R', note: 'NY re-accumulation retest' },
    { day: 'S06', status: 'Partial', netR: '+0.62R', note: 'Half off at BSL, rest BE' },
    { day: 'S07', status: 'No-Trade', netR: '0.00R', note: 'CPI Seek-and-Destroy stand-down' },
    { day: 'S08', status: 'Loss', netR: '-1.05R', note: 'Breakdown continuation failure' },
    { day: 'S09', status: 'Unfilled', netR: '0.00R', note: 'Single-pass drop (no chase)' },
    { day: 'S10', status: 'Win', netR: '+1.35R', note: 'Clean London sweep-reclaim' },
  ];

  const shown = view === 'honest' ? sessions : sessions.filter((s) => s.status === 'Win');

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="whole-sample-ledger">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 17 · Whole-Sample Simulator · Synthetic 10-Session Study')}</span>
        <h3 className="bb70-visual-title">{t('Honest Chronological Sample vs. Cherry-Picked Highlight Reel')}</h3>
      </div>

      <div className="bb70-controls">
        <button type="button" className="bb70-btn" aria-pressed={view === 'honest'} onClick={() => setView('honest')}>
          {t('Honest 10-Session Whole Sample')}
        </button>
        <button type="button" className="bb70-btn" aria-pressed={view === 'cherry'} onClick={() => setView('cherry')}>
          {t('Cherry-Picked Highlights Only (Distorted)')}
        </button>
      </div>

      <div className="bb70-table-wrap" style={{ marginTop: '0.5rem', marginBottom: '0.8rem' }}>
        <table className="bb70-table">
          <thead>
            <tr>
              <th scope="col">{t('Session')}</th>
              <th scope="col">{t('Outcome')}</th>
              <th scope="col">{t('After-Cost Net R')}</th>
              <th scope="col">{t('Journal Context')}</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.day}>
                <td className="font-semibold">{row.day}</td>
                <td>{t(row.status)}</td>
                <td className="font-semibold">{row.netR}</td>
                <td>{t(row.note)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bb70-metrics-grid">
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Filled Trades')}</span>
          <span className="bb70-metric-value">{view === 'honest' ? '6 of 10' : '3 of 3 (Misleading)'}</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Unfilled + Skipped Days')}</span>
          <span className="bb70-metric-value">{view === 'honest' ? '4 Sessions Logged' : 'Hidden'}</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Cumulative Net R')}</span>
          <span className="bb70-metric-value" style={{ color: view === 'honest' ? 'var(--bb70-pine)' : 'var(--bb70-terra)' }}>
            {view === 'honest' ? '+2.67R (+0.45R / fill)' : '+4.15R (False Illusion)'}
          </span>
        </div>
      </div>
    </figure>
  );
};

/* 18. Animated 5-Case Stick-Figure Mistake Clinic */
const MistakeClinicVisual: React.FC = () => {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);

  const cases = [
    {
      title: '1. Mid-Range Equilibrium',
      bad: 'Clicking right on the 50% line inside quiet chop.',
      fix: 'Wait for price to raid 0% SSL or 100% BSL before engaging.',
    },
    {
      title: '2. Fading True Breakout',
      bad: 'Shorting repeated full candle closes holding above the box high.',
      fix: 'Distinguish wick rejection from multi-candle acceptance.',
    },
    {
      title: '3. Daily Quota Forcing',
      bad: 'Forcing trades on an 80%-ADR holiday because of "20 pips/day".',
      fix: 'Day trading means selective qualified sessions, not daily clicks.',
    },
    {
      title: '4. Chasing Runaways',
      bad: 'Market-entering late and turning 1.5R math into 0.4R math.',
      fix: 'Log unfilled single-pass moves honestly as 0R scratches.',
    },
    {
      title: '5. Unscaled Cross-Asset Pips',
      bad: 'Copy-pasting a 20-pip FX stop directly onto volatile MNQ futures.',
      fix: 'Rescale stops, targets, and costs to each contract ADR and tick size.',
    },
  ];
  const current = cases[idx];

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="mistake-clinic">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 18 · Behavioral Clinic · 5 Stick-Figure Cases')}</span>
        <h3 className="bb70-visual-title">{t('Catching Five Common Consolidation Mistakes Before Clicking')}</h3>
      </div>

      <div className="bb70-controls">
        {cases.map((c, i) => (
          <button key={c.title} type="button" className="bb70-btn" aria-pressed={idx === i} onClick={() => setIdx(i)}>
            {t(c.title)}
          </button>
        ))}
      </div>

      <div className="bb70-stage">
        <svg viewBox="0 0 720 195" className="bb70-svg" role="img" aria-label={t('Stick figure mistake clinic comparison')}>
          <rect x="0" y="0" width="720" height="195" rx="10" fill="var(--bb70-surface)" />
          {/* Left: Habit Trap */}
          <rect x="18" y="18" width="334" height="159" rx="8" fill="var(--bb70-terra-soft)" stroke="var(--bb70-terra-border)" />
          <circle cx="68" cy="64" r="14" fill="none" stroke="var(--bb70-terra)" strokeWidth="2.4" />
          <line x1="68" y1="78" x2="68" y2="122" stroke="var(--bb70-terra)" strokeWidth="2.4" />
          <line x1="68" y1="90" x2="46" y2="74" stroke="var(--bb70-terra)" strokeWidth="2.2" />
          <line x1="68" y1="90" x2="90" y2="74" stroke="var(--bb70-terra)" strokeWidth="2.2" />
          <line x1="68" y1="122" x2="54" y2="150" stroke="var(--bb70-terra)" strokeWidth="2.4" />
          <line x1="68" y1="122" x2="82" y2="150" stroke="var(--bb70-terra)" strokeWidth="2.4" />
          <text x="114" y="54" fontSize="11.5" fontWeight="700" fill="var(--bb70-terra)">{t('Common Trap')}</text>
          <foreignObject x="114" y="64" width="224" height="96">
            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.45, color: 'var(--bb70-ink)' }}>{t(current.bad)}</p>
          </foreignObject>

          {/* Right: Disciplined Fix */}
          <rect x="368" y="18" width="334" height="159" rx="8" fill="var(--bb70-pine-soft)" stroke="var(--bb70-pine-border)" />
          <circle cx="418" cy="64" r="14" fill="none" stroke="var(--bb70-pine)" strokeWidth="2.4" />
          <line x1="418" y1="78" x2="418" y2="122" stroke="var(--bb70-pine)" strokeWidth="2.4" />
          <line x1="418" y1="92" x2="398" y2="108" stroke="var(--bb70-pine)" strokeWidth="2.2" />
          <line x1="418" y1="92" x2="440" y2="102" stroke="var(--bb70-pine)" strokeWidth="2.2" />
          <line x1="418" y1="122" x2="404" y2="150" stroke="var(--bb70-pine)" strokeWidth="2.4" />
          <line x1="418" y1="122" x2="432" y2="150" stroke="var(--bb70-pine)" strokeWidth="2.4" />
          <text x="464" y="54" fontSize="11.5" fontWeight="700" fill="var(--bb70-pine)">{t('Bread-and-Butter Fix')}</text>
          <foreignObject x="464" y="64" width="224" height="96">
            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.45, color: 'var(--bb70-ink)' }}>{t(current.fix)}</p>
          </foreignObject>
        </svg>
      </div>
    </figure>
  );
};

/* 19. Interactive 4-Checkpoint Day-Trade Routine Chronometer */
const RoutineChronometerVisual: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const phases = [
    {
      time: '01:45 NY',
      title: '1. Pre-Session Prep',
      detail: 'Check high-impact macro releases, measure 5-day ADR, note Daily draw, and freeze the Asian box before London opens.',
    },
    {
      time: '02:00–05:00 NY',
      title: '2. Killzone Watch',
      detail: 'Observe calmly for a sweep + displacement or clean breakout retest. Keep hands off if price stays trapped in 50% equilibrium.',
    },
    {
      time: 'Execution',
      title: '3. Bracket Order Only',
      detail: 'Submit limit, invalidation stop, and modest cost-adjusted target together. Zero stop widening and zero late chasing.',
    },
    {
      time: 'Hard Cutoff',
      title: '4. Close & Log Sample',
      detail: 'Shut down charts at session cutoff. Record wins, stops, unfilled limits, and 0-trade days identically inside your out-of-sample ledger.',
    },
  ];

  return (
    <figure className="bb70-visual-card" data-bread-butter-figure="routine-chronometer">
      <div className="bb70-visual-head">
        <span className="bb70-visual-eyebrow">{t('Figure 19 · Process Routine · 4 Daily Checkpoints')}</span>
        <h3 className="bb70-visual-title">{t('The Selective Day-Trade Routine Chronometer')}</h3>
      </div>

      <div className="bb70-controls">
        {phases.map((p, i) => (
          <button key={p.title} type="button" className="bb70-btn" aria-pressed={step === i} onClick={() => setStep(i)}>
            {t(p.title)}
          </button>
        ))}
      </div>

      <div className="bb70-metrics-grid">
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Active Checkpoint')}</span>
          <span className="bb70-metric-value" style={{ color: 'var(--bb70-cerulean)' }}>{t(phases[step].time)}</span>
        </div>
        <div className="bb70-metric">
          <span className="bb70-metric-label">{t('Routine Discipline')}</span>
          <span className="bb70-metric-value">{t(phases[step].title)}</span>
        </div>
      </div>

      <div className="bb70-extract" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
        <p style={{ marginBottom: 0 }}>{t(phases[step].detail)}</p>
      </div>
    </figure>
  );
};

export const BreadButterExtendedVisual: React.FC<{ visualId: string }> = ({ visualId }) => {
  switch (visualId) {
    case 'pip-vs-futures-calculator':
      return <PipVsFuturesCalculatorVisual />;
    case 'session-adr-clock':
      return <SessionAdrClockVisual />;
    case 'htf-context-alignment':
      return <HtfContextAlignmentVisual />;
    case 'model-comparison-matrix':
      return <ModelComparisonMatrixVisual />;
    case 'setup-grader':
      return <SetupGraderVisual />;
    case 'worked-eurusd-buy':
      return <WorkedEurusdBuyVisual />;
    case 'worked-gbpusd-sell':
      return <WorkedGbpusdSellVisual />;
    case 'whole-sample-ledger':
      return <WholeSampleLedgerVisual />;
    case 'mistake-clinic':
      return <MistakeClinicVisual />;
    case 'routine-chronometer':
      return <RoutineChronometerVisual />;
    default:
      return null;
  }
};
