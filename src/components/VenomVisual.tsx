import React, { useEffect, useMemo, useState } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { computeBprOverlap, computeEntryPlan } from '../utils/venomModelMath';
import { VenomScene } from './VenomScene';
import { VenomExtendedVisuals } from './VenomExtendedVisuals';

interface VenomVisualProps {
  visualId: string;
  staticOnly?: boolean;
}

const VisualCard: React.FC<{
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

/* 1. Stick-Figure Trapdoor Analogy */
const StickFigureAnalogy: React.FC = () => {
  const { t } = useTranslation();
  return (
    <VisualCard
      visualId="stick-figure-analogy"
      kicker="Visual Intuition · Stick-Figure Comic"
      title="The 09:30 Two-Fang Trapdoor: Breakout Rush vs. Opposing Slam"
      caption="Synthetic teaching illustration: Fang 1 lures breakout buyers above the frozen 08:00–09:30 ceiling (110.0), while Fang 2 slams back inside the doorway with opposing displacement."
    >
      <svg viewBox="0 0 740 245" className="vm-svg-stage" role="img" aria-label={t('Two-Fang trapdoor stick figure analogy')}>
        <rect x="0" y="0" width="740" height="245" fill="var(--vm-stage-bg)" rx="8" />

        {/* Panel 1: Frozen Room 08:00-09:30 */}
        <rect x="14" y="16" width="224" height="212" rx="8" fill="var(--vm-surface)" stroke="var(--vm-border)" />
        <text x="126" y="38" textAnchor="middle" className="vm-comic-head">{t('1. Freeze Box (08:00–09:30)')}</text>
        <rect x="34" y="72" width="184" height="106" fill="var(--vm-violet-soft)" stroke="var(--vm-violet)" strokeWidth="1.6" strokeDasharray="5 3" rx="4" />
        <text x="126" y="64" textAnchor="middle" className="vm-svg-tag">{t('Ceiling High 110.0 (BSL)')}</text>
        <text x="126" y="194" textAnchor="middle" className="vm-svg-tag">{t('Floor Low 100.0 (SSL)')}</text>
        {/* Calm stick figure waiting inside box */}
        <circle cx="94" cy="112" r="9" fill="none" stroke="var(--vm-ink)" strokeWidth="2.2" />
        <line x1="94" y1="121" x2="94" y2="148" stroke="var(--vm-ink)" strokeWidth="2.2" />
        <line x1="80" y1="132" x2="108" y2="132" stroke="var(--vm-ink)" strokeWidth="2.2" />
        <line x1="94" y1="148" x2="84" y2="168" stroke="var(--vm-ink)" strokeWidth="2.2" />
        <line x1="94" y1="148" x2="104" y2="168" stroke="var(--vm-ink)" strokeWidth="2.2" />
        {/* Mini clock */}
        <circle cx="164" cy="128" r="20" fill="var(--vm-surface)" stroke="var(--vm-violet)" strokeWidth="2" />
        <line x1="164" y1="128" x2="164" y2="115" stroke="var(--vm-violet)" strokeWidth="2" />
        <line x1="164" y1="128" x2="174" y2="134" stroke="var(--vm-amber)" strokeWidth="2" />
        <text x="164" y="162" textAnchor="middle" className="vm-svg-axis">09:30 NY</text>
        <text x="126" y="216" textAnchor="middle" className="vm-comic-note">{t('Mark both walls; do not guess yet')}</text>

        {/* Panel 2: Fang 1 Breakout Rush */}
        <rect x="258" y="16" width="224" height="212" rx="8" fill="var(--vm-surface)" stroke="var(--vm-border)" />
        <text x="370" y="38" textAnchor="middle" className="vm-comic-head">{t('2. Fang 1: Close Above 110')}</text>
        <line x1="276" y1="124" x2="464" y2="124" stroke="var(--vm-violet)" strokeWidth="1.6" strokeDasharray="5 3" />
        <text x="458" y="118" textAnchor="end" className="vm-svg-axis">110.0</text>
        {/* Upward surge candle */}
        <line x1="336" y1="62" x2="336" y2="152" stroke="var(--vm-wick)" strokeWidth="2" />
        <rect x="322" y="74" width="28" height="62" rx="3" fill="var(--vm-amber)" />
        <text x="336" y="56" textAnchor="middle" className="vm-svg-tag-amber">{t('Close 112.0')}</text>
        {/* Excited breakout stick figure rushing upward */}
        <circle cx="406" cy="80" r="9" fill="none" stroke="var(--vm-amber)" strokeWidth="2.2" />
        <line x1="406" y1="89" x2="406" y2="112" stroke="var(--vm-amber)" strokeWidth="2.2" />
        <line x1="392" y1="86" x2="420" y2="76" stroke="var(--vm-amber)" strokeWidth="2.2" />
        <line x1="406" y1="112" x2="394" y2="124" stroke="var(--vm-amber)" strokeWidth="2.2" />
        <line x1="406" y1="112" x2="420" y2="122" stroke="var(--vm-amber)" strokeWidth="2.2" />
        <rect x="368" y="138" width="96" height="26" rx="5" fill="var(--vm-amber-soft)" stroke="var(--vm-amber)" />
        <text x="416" y="155" textAnchor="middle" className="vm-svg-tag-amber">{t('Breakout!')}</text>
        <text x="370" y="216" textAnchor="middle" className="vm-comic-note">{t('Upward FVG invites chase buys')}</text>

        {/* Panel 3: Fang 2 Trapdoor Slam */}
        <rect x="502" y="16" width="224" height="212" rx="8" fill="var(--vm-surface)" stroke="var(--vm-border)" />
        <text x="614" y="38" textAnchor="middle" className="vm-comic-head">{t('3. Fang 2: Opposing Slam')}</text>
        <line x1="520" y1="110" x2="708" y2="110" stroke="var(--vm-violet)" strokeWidth="1.6" strokeDasharray="5 3" />
        {/* Fang 1 faint ghost + Fang 2 crimson drop */}
        <rect x="546" y="72" width="22" height="50" rx="2.5" fill="var(--vm-amber)" opacity="0.45" />
        <line x1="594" y1="74" x2="594" y2="178" stroke="var(--vm-wick)" strokeWidth="2" />
        <rect x="580" y="84" width="28" height="82" rx="3" fill="var(--vm-crimson)" />
        <text x="594" y="192" textAnchor="middle" className="vm-svg-tag-crimson">{t('Close 108.0')}</text>
        {/* BPR overlap box */}
        <rect x="542" y="92" width="76" height="24" fill="var(--vm-teal-soft)" stroke="var(--vm-teal)" strokeWidth="1.4" />
        <text x="668" y="108" textAnchor="middle" className="vm-svg-tag-teal">{t('BPR Overlap')}</text>
        {/* Disciplined stick figure holding ruler */}
        <circle cx="670" cy="134" r="9" fill="none" stroke="var(--vm-teal)" strokeWidth="2.2" />
        <line x1="670" y1="143" x2="670" y2="168" stroke="var(--vm-teal)" strokeWidth="2.2" />
        <line x1="654" y1="152" x2="684" y2="152" stroke="var(--vm-teal)" strokeWidth="2.2" />
        <line x1="670" y1="168" x2="660" y2="186" stroke="var(--vm-teal)" strokeWidth="2.2" />
        <line x1="670" y1="168" x2="680" y2="186" stroke="var(--vm-teal)" strokeWidth="2.2" />
        <text x="614" y="216" textAnchor="middle" className="vm-comic-note">{t('Now frame stop 114 & entry 111')}</text>
      </svg>
    </VisualCard>
  );
};

/* 2. Interactive NY Clock & ETH vs RTH Box Visualizer */
const NyClockBoxVisual: React.FC = () => {
  const { t } = useTranslation();
  const [season, setSeason] = useState<'edt' | 'est'>('edt');
  const [chartFeed, setChartFeed] = useState<'eth' | 'rth'>('eth');

  const utcOffset = season === 'edt' ? 4 : 5;
  const fmtUtc = (h: number, m: number) => `${String(h + utcOffset).padStart(2, '0')}:${String(m).padStart(2, '0')} UTC`;

  return (
    <VisualCard
      visualId="ny-clock-box"
      kicker="Interactive Session Clock · ETH vs. RTH"
      title="08:00–09:30 Frozen Box & Why Extended Hours (ETH) Is Mandatory"
      caption="Toggle EDT/EST daylight saving offset and compare Extended Trading Hours (ETH) against Regular Trading Hours (RTH). RTH hides the entire 08:00–09:29 pre-open liquidity box."
    >
      <div className="vm-toolbar-split">
        <div className="vm-tab-row">
          <button
            type="button"
            className={`vm-tab-btn${chartFeed === 'eth' ? ' is-active' : ''}`}
            onClick={() => setChartFeed('eth')}
          >
            {t('ETH Chart (Correct)')}
          </button>
          <button
            type="button"
            className={`vm-tab-btn${chartFeed === 'rth' ? ' is-active' : ''}`}
            onClick={() => setChartFeed('rth')}
          >
            {t('RTH Chart (Missing Box)')}
          </button>
        </div>
        <div className="vm-tab-row">
          <button
            type="button"
            className={`vm-ctrl-btn${season === 'edt' ? ' is-active' : ''}`}
            onClick={() => setSeason('edt')}
          >
            {t('EDT Summer (UTC-4)')}
          </button>
          <button
            type="button"
            className={`vm-ctrl-btn${season === 'est' ? ' is-active' : ''}`}
            onClick={() => setSeason('est')}
          >
            {t('EST Winter (UTC-5)')}
          </button>
        </div>
      </div>

      <svg viewBox="0 0 740 245" className="vm-svg-stage" role="img" aria-label={t('Venom session timeline and ETH vs RTH comparison')}>
        <rect x="0" y="0" width="740" height="245" fill="var(--vm-stage-bg)" rx="8" />

        {/* Phase 1: 08:00-09:30 Pre-open Box */}
        <rect
          x="36"
          y="40"
          width="250"
          height="146"
          rx="6"
          fill={chartFeed === 'eth' ? 'var(--vm-violet-soft)' : 'var(--vm-crimson-soft)'}
          stroke={chartFeed === 'eth' ? 'var(--vm-violet)' : 'var(--vm-crimson)'}
          strokeWidth="1.6"
          strokeDasharray={chartFeed === 'eth' ? 'none' : '6 4'}
        />
        <text x="161" y="28" textAnchor="middle" className={chartFeed === 'eth' ? 'vm-svg-tag' : 'vm-svg-tag-crimson'}>
          {chartFeed === 'eth' ? t('08:00–09:30 NY Frozen Range') : t('HIDDEN ON RTH CHART!')}
        </text>

        {chartFeed === 'eth' ? (
          <>
            {/* Pre-open ETH candles carving 100-110 */}
            {[
              { x: 64, o: 128, c: 112, h: 102, l: 158 },
              { x: 108, o: 112, c: 96, h: 78, l: 120 },
              { x: 152, o: 96, c: 136, h: 88, l: 162 },
              { x: 196, o: 136, c: 82, h: 66, l: 142 },
              { x: 240, o: 82, c: 106, h: 74, l: 118 },
            ].map((bar, i) => (
              <g key={i}>
                <line x1={bar.x} y1={bar.h} x2={bar.x} y2={bar.l} stroke="var(--vm-wick)" strokeWidth="1.8" />
                <rect
                  x={bar.x - 10}
                  y={Math.min(bar.o, bar.c)}
                  width="20"
                  height={Math.max(6, Math.abs(bar.c - bar.o))}
                  rx="2"
                  fill="var(--vm-violet)"
                />
              </g>
            ))}
            <line x1="36" y1="66" x2="704" y2="66" stroke="var(--vm-violet)" strokeWidth="1.6" strokeDasharray="5 3" />
            <line x1="36" y1="162" x2="704" y2="162" stroke="var(--vm-violet)" strokeWidth="1.6" strokeDasharray="5 3" />
            <text x="698" y="60" textAnchor="end" className="vm-svg-tag">{t('Frozen High 110.0')}</text>
            <text x="698" y="178" textAnchor="end" className="vm-svg-tag">{t('Frozen Low 100.0')}</text>
          </>
        ) : (
          <g>
            <text x="161" y="108" textAnchor="middle" className="vm-svg-tag-crimson">
              {t('No 08:00–09:29 Candles Visible')}
            </text>
            <text x="161" y="130" textAnchor="middle" className="vm-comic-note">
              {t('Switch feed to Extended Trading Hours (ETH)')}
            </text>
          </g>
        )}

        {/* 09:30 Bell Vertical Divider */}
        <line x1="286" y1="30" x2="286" y2="196" stroke="var(--vm-amber)" strokeWidth="2.2" />
        <rect x="242" y="196" width="88" height="22" rx="4" fill="var(--vm-amber)" />
        <text x="286" y="211" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
          09:30 NY
        </text>

        {/* Phase 2: 09:30-11:00 Active Window */}
        <rect x="292" y="40" width="268" height="146" rx="6" fill="var(--vm-teal-soft)" stroke="var(--vm-teal)" strokeWidth="1.3" />
        <text x="426" y="28" textAnchor="middle" className="vm-svg-tag-teal">{t('09:30–11:00 Active Venom Window')}</text>

        {/* Post-09:30 Fang 1 + Fang 2 + Retest sketch */}
        <line x1="336" y1="44" x2="336" y2="112" stroke="var(--vm-wick)" strokeWidth="1.8" />
        <rect x="326" y="50" width="20" height="52" rx="2" fill="var(--vm-amber)" />
        <line x1="382" y1="54" x2="382" y2="132" stroke="var(--vm-wick)" strokeWidth="1.8" />
        <rect x="372" y="60" width="20" height="62" rx="2" fill="var(--vm-crimson)" />
        <line x1="428" y1="62" x2="428" y2="116" stroke="var(--vm-wick)" strokeWidth="1.8" />
        <rect x="418" y="70" width="20" height="36" rx="2" fill="var(--vm-teal)" />
        <line x1="474" y1="88" x2="474" y2="152" stroke="var(--vm-wick)" strokeWidth="1.8" />
        <rect x="464" y="96" width="20" height="48" rx="2" fill="var(--vm-crimson)" />

        {/* Phase 3: Post-11:00 Expiry Zone */}
        <rect x="566" y="40" width="138" height="146" rx="6" fill="var(--vm-surface)" stroke="var(--vm-border)" strokeDasharray="4 4" />
        <text x="635" y="106" textAnchor="middle" className="vm-comic-head">{t('After 11:00 NY')}</text>
        <text x="635" y="126" textAnchor="middle" className="vm-comic-note">{t('Cancel Unfilled')}</text>
        <text x="635" y="142" textAnchor="middle" className="vm-comic-note">{t('Limit Orders')}</text>

        {/* UTC Axis Readouts */}
        <text x="36" y="234" className="vm-svg-axis">08:00 NY = {fmtUtc(8, 0)}</text>
        <text x="286" y="234" textAnchor="middle" className="vm-svg-axis">09:30 NY = {fmtUtc(9, 30)}</text>
        <text x="560" y="234" textAnchor="middle" className="vm-svg-axis">11:00 NY = {fmtUtc(11, 0)}</text>
      </svg>
    </VisualCard>
  );
};

/* 3. Animated 5-Stage Two-Fang Stepper */
const TWO_FANG_STEPS = [
  {
    title: 'Stage 1 — Freeze 08:00–09:30 Box (100–110)',
    note: 'Extended-hours candles build a 10-point box. At 09:30, 110.0 is Buy-Side Liquidity and 100.0 is Sell-Side Liquidity.',
    visible: 3,
  },
  {
    title: 'Stage 2 — Fang 1 Sweeps & Closes Above 110 (113 High / 112 Close)',
    note: 'A strong upward expansion closes outside the range at 112.0, printing an upward FVG (109.6–111.4). Do NOT short yet.',
    visible: 5,
  },
  {
    title: 'Stage 3 — Fang 2 Slams Back Inside (Open 111 / Close 108)',
    note: 'Opposing bearish displacement slices back under 110.0 and closes at 108.0, leaving a downward FVG (108.6–111.0). Two Fangs confirmed.',
    visible: 7,
  },
  {
    title: 'Stage 4 — BPR Overlap (109.6–111.0) & Deferred Open (111.0) Active',
    note: 'Only now are entry references observable. A resting limit sits at 111.0 (or BPR 110.3) with protective stop above Fang 1 at 114.0.',
    visible: 8,
  },
  {
    title: 'Stage 5 — Delivery Into Objective (104.0)',
    note: 'After tagging 111.2 and holding below 114.0, sellers expand price down to 104.0 (3.0 risk / 7.0 reward = 2.33R pre-cost).',
    visible: 10,
  },
];

const TwoFangStepper: React.FC<{ staticOnly?: boolean }> = ({ staticOnly = false }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(4);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || staticOnly) return;
    const id = window.setInterval(() => {
      setStep((prev) => {
        if (prev >= TWO_FANG_STEPS.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [playing, staticOnly]);

  const bars = [
    { x: 0, o: 103, h: 106.5, l: 100, c: 105, role: 'range' },
    { x: 1, o: 105, h: 110, l: 104.2, c: 108.5, role: 'range' },
    { x: 2, o: 108.5, h: 109.6, l: 105.8, c: 107.2, role: 'range' },
    { x: 3, o: 107.2, h: 113.0, l: 107.0, c: 112.0, role: 'fang1' },
    { x: 4, o: 112.0, h: 112.6, l: 110.2, c: 111.0, role: 'fang1' },
    { x: 5, o: 111.0, h: 111.3, l: 107.4, c: 108.0, role: 'fang2' },
    { x: 6, o: 108.0, h: 108.6, l: 106.8, c: 107.5, role: 'fang2' },
    { x: 7, o: 107.5, h: 111.2, l: 107.2, c: 109.4, role: 'retest' },
    { x: 8, o: 109.4, h: 109.8, l: 105.4, c: 105.8, role: 'out' },
    { x: 9, o: 105.8, h: 106.2, l: 103.6, c: 104.0, role: 'out' },
  ];

  const active = TWO_FANG_STEPS[step];
  const mapY = (p: number) => 24 + ((115 - p) / 16) * 195;

  return (
    <VisualCard
      visualId="two-fang-stepper"
      kicker="Animated Sequence Player · Synthetic 100–110 Range"
      title="Step-by-Step Anatomy of the Two Fangs"
      caption={active.note}
    >
      <div className="vm-toolbar-split">
        <span className="vm-hud-step vm-num">{t(active.title)}</span>
        <div className="vm-control-group">
          <button type="button" className="vm-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} aria-label={t('Previous stage')}>
            <SkipBack size={14} />
          </button>
          <button
            type="button"
            className="vm-ctrl-btn is-primary"
            onClick={() => {
              if (!playing && step >= TWO_FANG_STEPS.length - 1) setStep(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span>{t(playing ? 'Pause' : 'Play')}</span>
          </button>
          <button type="button" className="vm-ctrl-btn" onClick={() => { setPlaying(false); setStep((s) => Math.min(TWO_FANG_STEPS.length - 1, s + 1)); }} aria-label={t('Next stage')}>
            <SkipForward size={14} />
          </button>
          <button type="button" className="vm-ctrl-btn" onClick={() => { setPlaying(false); setStep(0); }} aria-label={t('Reset scene')}>
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <svg viewBox="0 0 740 245" className="vm-svg-stage" role="img" aria-label={t('Step by step Two Fangs sequence chart')}>
        <rect x="0" y="0" width="740" height="245" fill="var(--vm-stage-bg)" rx="8" />
        {[100, 104, 108, 110, 111, 114].map((p) => (
          <g key={p}>
            <line x1="56" y1={mapY(p)} x2="560" y2={mapY(p)} stroke="var(--vm-grid)" strokeDasharray="3 3" />
            <text x="48" y={mapY(p) + 4} textAnchor="end" className="vm-svg-axis">{p.toFixed(1)}</text>
          </g>
        ))}

        {/* Range Box */}
        <rect x="64" y={mapY(110)} width="142" height={mapY(100) - mapY(110)} fill="var(--vm-violet-soft)" stroke="var(--vm-violet)" strokeWidth="1.4" />
        <line x1="206" y1={mapY(110)} x2="560" y2={mapY(110)} stroke="var(--vm-violet)" strokeWidth="1.5" strokeDasharray="5 3" />
        <line x1="206" y1={mapY(100)} x2="560" y2={mapY(100)} stroke="var(--vm-violet)" strokeWidth="1.2" strokeDasharray="5 3" />

        {/* BPR Overlap band visible from Stage 3 onward */}
        {step >= 2 && (
          <rect x="218" y={mapY(111)} width="342" height={mapY(109.6) - mapY(111)} fill="var(--vm-teal-soft)" stroke="var(--vm-teal)" strokeWidth="1.3" />
        )}
        {step >= 3 && (
          <>
            <line x1="300" y1={mapY(114)} x2="560" y2={mapY(114)} stroke="var(--vm-crimson)" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="300" y1={mapY(104)} x2="560" y2={mapY(104)} stroke="var(--vm-teal)" strokeWidth="1.5" strokeDasharray="4 3" />
          </>
        )}

        {bars.slice(0, active.visible).map((b) => {
          const cx = 86 + b.x * 48;
          const fill =
            b.role === 'range'
              ? 'var(--vm-violet)'
              : b.role === 'fang1'
                ? 'var(--vm-amber)'
                : b.c >= b.o
                  ? 'var(--vm-teal)'
                  : 'var(--vm-crimson)';
          return (
            <g key={b.x}>
              <line x1={cx} y1={mapY(b.h)} x2={cx} y2={mapY(b.l)} stroke="var(--vm-wick)" strokeWidth="1.8" />
              <rect
                x={cx - 10}
                y={mapY(Math.max(b.o, b.c))}
                width="20"
                height={Math.max(5, Math.abs(mapY(b.o) - mapY(b.c)))}
                rx="2.5"
                fill={fill}
              />
            </g>
          );
        })}

        {/* Crisp right-margin tags */}
        <rect x="572" y={mapY(114) - 11} width="154" height="22" rx="4" fill="#be123c" />
        <text x="649" y={mapY(114) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Stop 114.0')}</text>

        <rect x="572" y={mapY(111) - 11} width="154" height="22" rx="4" fill="#b45309" />
        <text x="649" y={mapY(111) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('BPR / Open 111.0')}</text>

        <rect x="572" y={mapY(108.8) - 11} width="154" height="22" rx="4" fill="#5b21b6" />
        <text x="649" y={mapY(108.8) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Box High 110.0')}</text>

        <rect x="572" y={mapY(104) - 11} width="154" height="22" rx="4" fill="#0f766e" />
        <text x="649" y={mapY(104) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Objective 104.0')}</text>
      </svg>
    </VisualCard>
  );
};

/* 4. Wick-Only Probe vs. Closing Fang vs. Breakout Continuation */
const WickVsCloseVisual: React.FC = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'wick' | 'venom' | 'breakout'>('venom');

  const meta = {
    wick: {
      heading: 'Wick-Only Probe (High 111.6, Close 109.4)',
      verdict: 'Separate Wick-Sweep / Turtle Soup Variant — Not Closing-Fang Venom',
      bars: [
        { o: 107.5, h: 109.4, l: 107.0, c: 109.0, fill: 'var(--vm-violet)' },
        { o: 109.0, h: 111.8, l: 108.8, c: 109.4, fill: 'var(--vm-amber)' },
        { o: 109.4, h: 109.6, l: 106.8, c: 107.2, fill: 'var(--vm-crimson)' },
        { o: 107.2, h: 107.8, l: 105.4, c: 105.8, fill: 'var(--vm-crimson)' },
      ],
    },
    venom: {
      heading: 'Confirmed Closing Fang (Close 112.0 -> Fang 2 Close 108.0)',
      verdict: 'Valid Closing-Fang Bearish Venom — Traps Breakout Closes Above 110.0',
      bars: [
        { o: 107.2, h: 109.6, l: 106.8, c: 108.8, fill: 'var(--vm-violet)' },
        { o: 108.8, h: 113.0, l: 108.6, c: 112.0, fill: 'var(--vm-amber)' },
        { o: 112.0, h: 112.4, l: 107.4, c: 108.0, fill: 'var(--vm-crimson)' },
        { o: 108.0, h: 111.0, l: 107.6, c: 109.2, fill: 'var(--vm-teal)' },
      ],
    },
    breakout: {
      heading: 'Trend Acceptance Continuation (Close 112.0 -> Close 114.6)',
      verdict: 'No Venom Trigger — Never Fade Fang 1 Without Fang 2 Returning Inside',
      bars: [
        { o: 107.2, h: 109.6, l: 106.8, c: 108.8, fill: 'var(--vm-violet)' },
        { o: 108.8, h: 113.0, l: 108.6, c: 112.0, fill: 'var(--vm-amber)' },
        { o: 112.0, h: 114.8, l: 111.4, c: 114.4, fill: 'var(--vm-teal)' },
        { o: 114.4, h: 115.6, l: 113.8, c: 115.2, fill: 'var(--vm-teal)' },
      ],
    },
  }[mode];

  const mapY = (p: number) => 26 + ((116.5 - p) / 12.5) * 180;

  return (
    <VisualCard
      visualId="wick-vs-close"
      kicker="Interactive Validation Filter · Synthetic OHLC"
      title="Wick-Only Sweep vs. Closing Fang vs. Breakout Continuation"
      caption={meta.verdict}
    >
      <div className="vm-tab-row">
        <button type="button" className={`vm-tab-btn${mode === 'wick' ? ' is-active' : ''}`} onClick={() => setMode('wick')}>
          {t('Wick-Only Probe')}
        </button>
        <button type="button" className={`vm-tab-btn${mode === 'venom' ? ' is-active' : ''}`} onClick={() => setMode('venom')}>
          {t('Confirmed Closing Fang')}
        </button>
        <button type="button" className={`vm-tab-btn${mode === 'breakout' ? ' is-active' : ''}`} onClick={() => setMode('breakout')}>
          {t('Trend Continuation (No Setup)')}
        </button>
      </div>

      <svg viewBox="0 0 740 230" className="vm-svg-stage" role="img" aria-label={t(meta.heading)}>
        <rect x="0" y="0" width="740" height="230" fill="var(--vm-stage-bg)" rx="8" />
        <line x1="60" y1={mapY(110)} x2="680" y2={mapY(110)} stroke="var(--vm-violet)" strokeWidth="2" strokeDasharray="6 3" />
        <text x="676" y={mapY(110) - 7} textAnchor="end" className="vm-svg-tag">{t('Frozen 08:00–09:30 High (110.0)')}</text>
        <text x="52" y={mapY(110) + 4} textAnchor="end" className="vm-svg-axis">110.0</text>
        <text x="52" y={mapY(114) + 4} textAnchor="end" className="vm-svg-axis">114.0</text>
        <text x="52" y={mapY(106) + 4} textAnchor="end" className="vm-svg-axis">106.0</text>

        {meta.bars.map((b, idx) => {
          const cx = 140 + idx * 120;
          return (
            <g key={idx}>
              <line x1={cx} y1={mapY(b.h)} x2={cx} y2={mapY(b.l)} stroke="var(--vm-wick)" strokeWidth="2.2" />
              <rect
                x={cx - 18}
                y={mapY(Math.max(b.o, b.c))}
                width="36"
                height={Math.max(6, Math.abs(mapY(b.o) - mapY(b.c)))}
                rx="3"
                fill={b.fill}
              />
              <text x={cx} y={mapY(b.h) - 6} textAnchor="middle" className="vm-svg-axis">
                C: {b.c.toFixed(1)}
              </text>
            </g>
          );
        })}

        <rect x="380" y="182" width="336" height="32" rx="6" fill="var(--vm-surface)" stroke="var(--vm-border)" />
        <text x="548" y="202" textAnchor="middle" className="vm-comic-head">{t(meta.heading)}</text>
      </svg>
    </VisualCard>
  );
};

/* 5. Bearish vs Bullish Exact Mirror Blueprint */
const BearishVsBullishVisual: React.FC = () => {
  const { t } = useTranslation();
  return (
    <VisualCard
      visualId="bearish-vs-bullish"
      kicker="Symmetrical Playbook · Side-by-Side Blueprint"
      title="Bearish High Raid (Reviewed) vs. Bullish Low Raid (Teaching Mirror)"
      caption="Both structures obey identical rules in reverse: freeze 100–110, observe a closing sweep beyond one boundary (Fang 1), and require opposing displacement back inside (Fang 2)."
    >
      <svg viewBox="0 0 740 250" className="vm-svg-stage" role="img" aria-label={t('Bearish and Bullish Venom Mirror Diagram')}>
        <rect x="0" y="0" width="740" height="250" fill="var(--vm-stage-bg)" rx="8" />

        {/* Left: Bearish Venom */}
        <rect x="16" y="16" width="346" height="218" rx="8" fill="var(--vm-surface)" stroke="var(--vm-border)" />
        <text x="189" y="38" textAnchor="middle" className="vm-svg-tag-crimson">{t('Bearish Venom (Sweeps 110.0 High)')}</text>
        <rect x="36" y="96" width="84" height="92" fill="var(--vm-violet-soft)" stroke="var(--vm-violet)" strokeWidth="1.4" />
        <line x1="36" y1="96" x2="342" y2="96" stroke="var(--vm-violet)" strokeWidth="1.5" strokeDasharray="5 3" />
        <line x1="36" y1="188" x2="342" y2="188" stroke="var(--vm-violet)" strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="42" y="90" className="vm-svg-axis">110.0 BSL</text>
        <text x="42" y="203" className="vm-svg-axis">100.0 SSL</text>
        {/* Bearish path */}
        <polyline
          points="78,154 106,120 156,58 206,136 244,90 318,166"
          fill="none"
          stroke="var(--vm-crimson)"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <circle cx="156" cy="58" r="4.5" fill="var(--vm-amber)" />
        <text x="168" y="60" className="vm-svg-tag-amber">{t('Fang 1 (113/112)')}</text>
        <circle cx="244" cy="90" r="4.5" fill="var(--vm-crimson)" />
        <text x="252" y="86" className="vm-svg-tag-crimson">{t('Short 111')}</text>
        <text x="318" y="182" textAnchor="end" className="vm-svg-tag-teal">{t('Target 104')}</text>

        {/* Right: Bullish Venom */}
        <rect x="378" y="16" width="346" height="218" rx="8" fill="var(--vm-surface)" stroke="var(--vm-border)" />
        <text x="551" y="38" textAnchor="middle" className="vm-svg-tag-teal">{t('Bullish Venom (Sweeps 100.0 Low)')}</text>
        <rect x="398" y="62" width="84" height="92" fill="var(--vm-violet-soft)" stroke="var(--vm-violet)" strokeWidth="1.4" />
        <line x1="398" y1="62" x2="704" y2="62" stroke="var(--vm-violet)" strokeWidth="1.2" strokeDasharray="5 3" />
        <line x1="398" y1="154" x2="704" y2="154" stroke="var(--vm-violet)" strokeWidth="1.5" strokeDasharray="5 3" />
        <text x="404" y="56" className="vm-svg-axis">110.0 BSL</text>
        <text x="404" y="170" className="vm-svg-axis">100.0 SSL</text>
        {/* Bullish mirror path */}
        <polyline
          points="440,96 468,132 518,196 568,118 606,162 680,84"
          fill="none"
          stroke="var(--vm-teal)"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <circle cx="518" cy="196" r="4.5" fill="var(--vm-amber)" />
        <text x="530" y="200" className="vm-svg-tag-amber">{t('Fang 1 (97/98)')}</text>
        <circle cx="606" cy="162" r="4.5" fill="var(--vm-teal)" />
        <text x="614" y="176" className="vm-svg-tag-teal">{t('Long 99')}</text>
        <text x="680" y="78" textAnchor="end" className="vm-svg-tag">{t('Target 106')}</text>
      </svg>
    </VisualCard>
  );
};

/* 6. Interactive BPR Overlap Calculator */
const BprCalculatorVisual: React.FC = () => {
  const { t } = useTranslation();
  const [f1Low, setF1Low] = useState(109.6);
  const [f1High, setF1High] = useState(111.4);
  const [f2Low, setF2Low] = useState(108.6);
  const [f2High, setF2High] = useState(111.0);

  const bpr = useMemo(
    () => computeBprOverlap(f1Low, f1High, f2Low, f2High),
    [f1Low, f1High, f2Low, f2High],
  );

  const mapY = (p: number) => 22 + ((113.5 - p) / 6.5) * 165;

  return (
    <VisualCard
      visualId="bpr-calculator"
      kicker="Interactive Formula Calculator · Exact Intersection"
      title="Balanced Price Range (BPR) Overlap Explorer"
      caption="Adjust the upward Fang 1 FVG and downward Fang 2 FVG edges. A true BPR exists only across the exact intersecting ticks where both opposing gaps overlap."
    >
      <div className="vm-slider-grid">
        <label>
          <span>{t('Fang 1 FVG Low')}: <strong className="vm-num">{f1Low.toFixed(1)}</strong></span>
          <input type="range" min="107.5" max="111.0" step="0.2" value={f1Low} onChange={(e) => setF1Low(Math.min(Number(e.target.value), f1High - 0.4))} />
        </label>
        <label>
          <span>{t('Fang 1 FVG High')}: <strong className="vm-num">{f1High.toFixed(1)}</strong></span>
          <input type="range" min="109.0" max="113.0" step="0.2" value={f1High} onChange={(e) => setF1High(Math.max(Number(e.target.value), f1Low + 0.4))} />
        </label>
        <label>
          <span>{t('Fang 2 FVG Low')}: <strong className="vm-num">{f2Low.toFixed(1)}</strong></span>
          <input type="range" min="107.5" max="111.2" step="0.2" value={f2Low} onChange={(e) => setF2Low(Math.min(Number(e.target.value), f2High - 0.4))} />
        </label>
        <label>
          <span>{t('Fang 2 FVG High')}: <strong className="vm-num">{f2High.toFixed(1)}</strong></span>
          <input type="range" min="108.5" max="113.0" step="0.2" value={f2High} onChange={(e) => setF2High(Math.max(Number(e.target.value), f2Low + 0.4))} />
        </label>
      </div>

      <svg viewBox="0 0 740 212" className="vm-svg-stage" role="img" aria-label={t('Interactive BPR Overlap Diagram')}>
        <rect x="0" y="0" width="740" height="212" fill="var(--vm-stage-bg)" rx="8" />
        {[108, 109, 110, 111, 112, 113].map((p) => (
          <g key={p}>
            <line x1="56" y1={mapY(p)} x2="704" y2={mapY(p)} stroke="var(--vm-grid)" strokeDasharray="3 3" />
            <text x="48" y={mapY(p) + 4} textAnchor="end" className="vm-svg-axis">{p.toFixed(1)}</text>
          </g>
        ))}

        {/* Fang 1 FVG */}
        <rect x="82" y={mapY(f1High)} width="170" height={Math.max(6, mapY(f1Low) - mapY(f1High))} fill="var(--vm-amber-soft)" stroke="var(--vm-amber)" strokeWidth="1.8" rx="4" />
        <text x="167" y={mapY(f1High) - 6} textAnchor="middle" className="vm-svg-tag-amber">{t('Fang 1 Up FVG')}</text>

        {/* Fang 2 FVG */}
        <rect x="284" y={mapY(f2High)} width="170" height={Math.max(6, mapY(f2Low) - mapY(f2High))} fill="var(--vm-crimson-soft)" stroke="var(--vm-crimson)" strokeWidth="1.8" rx="4" />
        <text x="369" y={mapY(f2High) - 6} textAnchor="middle" className="vm-svg-tag-crimson">{t('Fang 2 Down FVG')}</text>

        {/* Intersection BPR */}
        {bpr.hasOverlap ? (
          <g>
            <rect x="492" y={mapY(bpr.overlapHigh)} width="194" height={Math.max(6, mapY(bpr.overlapLow) - mapY(bpr.overlapHigh))} fill="var(--vm-teal-soft)" stroke="var(--vm-teal)" strokeWidth="2.2" rx="4" />
            <line x1="492" y1={mapY(bpr.midpoint)} x2="686" y2={mapY(bpr.midpoint)} stroke="var(--vm-teal)" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="589" y={mapY(bpr.overlapHigh) - 6} textAnchor="middle" className="vm-svg-tag-teal">
              {t('Valid BPR')}: {bpr.overlapLow.toFixed(1)}–{bpr.overlapHigh.toFixed(1)}
            </text>
          </g>
        ) : (
          <g>
            <rect x="492" y="78" width="194" height="54" rx="6" fill="var(--vm-surface)" stroke="var(--vm-crimson)" strokeDasharray="4 3" />
            <text x="589" y="109" textAnchor="middle" className="vm-svg-tag-crimson">{t('No Overlap (No BPR)')}</text>
          </g>
        )}
      </svg>

      <div className="vm-metric-grid">
        <div className="vm-metric-cell">
          <span>{t('BPR Band')}</span>
          <strong className="vm-num">{bpr.hasOverlap ? `${bpr.overlapLow.toFixed(1)} – ${bpr.overlapHigh.toFixed(1)}` : t('None')}</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Overlap Width')}</span>
          <strong className="vm-num">{bpr.width.toFixed(1)} pts</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('BPR 50% Midpoint')}</span>
          <strong className="vm-num">{bpr.hasOverlap ? bpr.midpoint.toFixed(2) : '—'}</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Status')}</span>
          <strong>{bpr.hasOverlap ? t('Dual-Sided BPR Confirmed') : t('Use Standalone FVG / IFVG')}</strong>
        </div>
      </div>
    </VisualCard>
  );
};

/* 7. Three Entry Archetypes Comparator */
const EntryArchetypesVisual: React.FC = () => {
  const { t } = useTranslation();
  const [choice, setChoice] = useState<'aggressive' | 'bpr' | 'deferred'>('deferred');

  const specs = {
    aggressive: { label: 'Aggressive Fang 2 Close', entry: 109.5, note: 'Participates immediately on Fang 2 close; catches single-pass runs with a wider 4.5-point stop.' },
    bpr: { label: 'BPR Overlap Midpoint', entry: 110.5, note: 'Resting limit at the center of the overlapping FVG corridor; balances fill probability and 1.86R payoff.' },
    deferred: { label: 'Deferred Venom Open', entry: 111.0, note: 'Resting limit at Fang 2 opening price; tightest 3.0-point stop (2.33R) but goes unfilled on straight drops.' },
  }[choice];

  const plan = computeEntryPlan('bearish', specs.entry, 114.0, 104.0);
  const mapY = (p: number) => 22 + ((115.5 - p) / 13) * 184;

  return (
    <VisualCard
      visualId="entry-archetypes"
      kicker="Interactive Risk-Geometry Comparator · Stop 114.0 / Target 104.0"
      title="Compare Aggressive Close vs. BPR Midpoint vs. Deferred Open"
      caption={specs.note}
    >
      <div className="vm-tab-row">
        <button type="button" className={`vm-tab-btn${choice === 'aggressive' ? ' is-active' : ''}`} onClick={() => setChoice('aggressive')}>
          {t('Aggressive Close (109.5)')}
        </button>
        <button type="button" className={`vm-tab-btn${choice === 'bpr' ? ' is-active' : ''}`} onClick={() => setChoice('bpr')}>
          {t('BPR Midpoint (110.5)')}
        </button>
        <button type="button" className={`vm-tab-btn${choice === 'deferred' ? ' is-active' : ''}`} onClick={() => setChoice('deferred')}>
          {t('Deferred Open (111.0)')}
        </button>
      </div>

      <svg viewBox="0 0 740 225" className="vm-svg-stage" role="img" aria-label={t('Three Venom Entry Archetypes Geometry')}>
        <rect x="0" y="0" width="740" height="225" fill="var(--vm-stage-bg)" rx="8" />
        {[104, 109.5, 110.5, 111, 114].map((p) => (
          <line key={p} x1="64" y1={mapY(p)} x2="680" y2={mapY(p)} stroke="var(--vm-grid)" strokeDasharray="3 3" />
        ))}
        {/* Risk zone (Entry -> 114) */}
        <rect x="190" y={mapY(114)} width="280" height={mapY(specs.entry) - mapY(114)} fill="var(--vm-crimson-soft)" stroke="var(--vm-crimson)" strokeWidth="1.6" />
        {/* Reward zone (104 -> Entry) */}
        <rect x="190" y={mapY(specs.entry)} width="280" height={mapY(104) - mapY(specs.entry)} fill="var(--vm-teal-soft)" stroke="var(--vm-teal)" strokeWidth="1.6" />

        <line x1="160" y1={mapY(specs.entry)} x2="500" y2={mapY(specs.entry)} stroke="var(--vm-amber)" strokeWidth="2.4" />
        <text x="330" y={(mapY(114) + mapY(specs.entry)) / 2 + 4} textAnchor="middle" className="vm-svg-tag-crimson">
          {t('Risk')}: {plan.risk.toFixed(1)} pts
        </text>
        <text x="330" y={(mapY(specs.entry) + mapY(104)) / 2 + 4} textAnchor="middle" className="vm-svg-tag-teal">
          {t('Reward')}: {plan.reward.toFixed(1)} pts ({plan.rr.toFixed(2)}R)
        </text>

        <rect x="514" y={mapY(114) - 11} width="194" height="22" rx="4" fill="#be123c" />
        <text x="611" y={mapY(114) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Invalidation Stop 114.0')}</text>

        <rect x="514" y={mapY(specs.entry) - 11} width="194" height="22" rx="4" fill="#b45309" />
        <text x="611" y={mapY(specs.entry) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
          {t('Entry')} {specs.entry.toFixed(1)}
        </text>

        <rect x="514" y={mapY(104) - 11} width="194" height="22" rx="4" fill="#0f766e" />
        <text x="611" y={mapY(104) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Objective 104.0')}</text>
      </svg>

      <div className="vm-metric-grid">
        <div className="vm-metric-cell">
          <span>{t('Risk Distance')}</span>
          <strong className="vm-num">{plan.risk.toFixed(1)} pts</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Reward Distance')}</span>
          <strong className="vm-num">{plan.reward.toFixed(1)} pts</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Planned R (pre-cost)')}</span>
          <strong className="vm-num">{plan.rr.toFixed(2)}R</strong>
        </div>
        <div className="vm-metric-cell">
          <span>{t('Break-Even (pre-cost)')}</span>
          <strong className="vm-num">{plan.breakEvenBeforeCostsPct.toFixed(1)}%</strong>
        </div>
      </div>
    </VisualCard>
  );
};

/* 9. CISD vs Micro-MSS Timing Visualizer */
const CisdVsMssVisual: React.FC = () => {
  const { t } = useTranslation();
  const [focus, setFocus] = useState<'cisd' | 'mss'>('cisd');
  const mapY = (p: number) => 22 + ((114.5 - p) / 9.5) * 185;

  return (
    <VisualCard
      visualId="cisd-vs-mss"
      kicker="Interactive Delivery Shift Comparator"
      title="CISD (Early Delivery Shift) vs. Micro-MSS (Swing Confirmation)"
      caption="CISD fires when Fang 2 closes beneath the opening price of the upward Fang 1 run (110.5). Micro-MSS waits for a body close beneath the prior swing low (107.0)."
    >
      <div className="vm-tab-row">
        <button type="button" className={`vm-tab-btn${focus === 'cisd' ? ' is-active' : ''}`} onClick={() => setFocus('cisd')}>
          {t('Highlight CISD (110.5)')}
        </button>
        <button type="button" className={`vm-tab-btn${focus === 'mss' ? ' is-active' : ''}`} onClick={() => setFocus('mss')}>
          {t('Highlight Micro-MSS (107.0)')}
        </button>
      </div>

      <svg viewBox="0 0 740 228" className="vm-svg-stage" role="img" aria-label={t('CISD versus Micro MSS trigger diagram')}>
        <rect x="0" y="0" width="740" height="228" fill="var(--vm-stage-bg)" rx="8" />
        {/* CISD line at 110.5 */}
        <line
          x1="60"
          y1={mapY(110.5)}
          x2="560"
          y2={mapY(110.5)}
          stroke="var(--vm-amber)"
          strokeWidth={focus === 'cisd' ? 2.6 : 1.3}
          strokeDasharray={focus === 'cisd' ? 'none' : '4 4'}
        />
        {/* MSS line at 107.0 */}
        <line
          x1="60"
          y1={mapY(107.0)}
          x2="560"
          y2={mapY(107.0)}
          stroke="var(--vm-violet)"
          strokeWidth={focus === 'mss' ? 2.6 : 1.3}
          strokeDasharray={focus === 'mss' ? 'none' : '4 4'}
        />

        {[
          { x: 100, o: 108.5, h: 109.0, l: 107.0, c: 107.8, fill: 'var(--vm-violet)' },
          { x: 165, o: 107.8, h: 111.0, l: 107.6, c: 110.5, fill: 'var(--vm-teal)' },
          { x: 230, o: 110.5, h: 113.2, l: 110.2, c: 112.4, fill: 'var(--vm-amber)' },
          { x: 295, o: 112.4, h: 112.6, l: 108.8, c: 109.2, fill: 'var(--vm-crimson)' },
          { x: 360, o: 109.2, h: 110.2, l: 107.4, c: 107.8, fill: 'var(--vm-crimson)' },
          { x: 425, o: 107.8, h: 108.2, l: 105.6, c: 106.0, fill: 'var(--vm-crimson)' },
          { x: 490, o: 106.0, h: 109.2, l: 105.8, c: 107.4, fill: 'var(--vm-teal)' },
        ].map((b, i) => (
          <g key={i}>
            <line x1={b.x} y1={mapY(b.h)} x2={b.x} y2={mapY(b.l)} stroke="var(--vm-wick)" strokeWidth="2" />
            <rect x={b.x - 14} y={mapY(Math.max(b.o, b.c))} width="28" height={Math.max(5, Math.abs(mapY(b.o) - mapY(b.c)))} rx="2.5" fill={b.fill} />
          </g>
        ))}

        {/* Trigger callout circle */}
        {focus === 'cisd' ? (
          <circle cx="295" cy={mapY(109.2)} r="10" fill="none" stroke="var(--vm-amber)" strokeWidth="2.6" />
        ) : (
          <circle cx="425" cy={mapY(106.0)} r="10" fill="none" stroke="var(--vm-violet)" strokeWidth="2.6" />
        )}

        <rect x="572" y={mapY(110.5) - 11} width="154" height="22" rx="4" fill="#b45309" />
        <text x="649" y={mapY(110.5) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('CISD Open 110.5')}</text>

        <rect x="572" y={mapY(107.0) - 11} width="154" height="22" rx="4" fill="#5b21b6" />
        <text x="649" y={mapY(107.0) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">{t('Swing Low 107.0 (MSS)')}</text>
      </svg>
    </VisualCard>
  );
};

export const VenomVisual: React.FC<VenomVisualProps> = ({ visualId, staticOnly = false }) => {
  switch (visualId) {
    case 'stick-figure-analogy':
      return <StickFigureAnalogy />;
    case 'ny-clock-box':
      return <NyClockBoxVisual />;
    case 'two-fang-stepper':
      return <TwoFangStepper staticOnly={staticOnly} />;
    case 'wick-vs-close':
      return <WickVsCloseVisual />;
    case 'bearish-vs-bullish':
      return <BearishVsBullishVisual />;
    case 'bpr-calculator':
      return <BprCalculatorVisual />;
    case 'entry-archetypes':
      return <EntryArchetypesVisual />;
    case 'cinema-3d':
      return (
        <VisualCard
          visualId="cinema-3d"
          kicker="Motion Study 02 · Interactive 3D & Ruler View"
          title="Three Authored Venom Outcome Branches in 3D Space"
          caption="Inspect how the exact same 100–110 frozen range and Two Fangs diverge into a Deferred Fill (Branch A), an Unfilled Single-Pass Runaway (Branch B), or a Closing Failure above 114.0 (Branch C)."
        >
          <VenomScene staticOnly={staticOnly} />
        </VisualCard>
      );
    case 'cisd-vs-mss':
      return <CisdVsMssVisual />;
    default:
      return <VenomExtendedVisuals visualId={visualId} staticOnly={staticOnly} />;
  }
};
