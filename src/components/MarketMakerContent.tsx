import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpDown,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  CheckSquare,
  Clock,
  Compass,
  Crosshair,
  EyeOff,
  GitCompare,
  HelpCircle,
  Info,
  Layers,
  Repeat,
  Scale,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import {
  marketMakerDocument as lesson,
  marketMakerPath,
  marketMakerSources,
  type MarketMakerBlock,
} from '../data/chapters/marketMakerLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { MarketMakerVisual, type MarketMakerVisualKind } from './MarketMakerVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  users: Users,
  layers: Layers,
  compass: Compass,
  'trending-up': TrendingUp,
  repeat: Repeat,
  scale: Scale,
  activity: Activity,
  crosshair: Crosshair,
  zap: Zap,
  'arrow-up-down': ArrowUpDown,
  sparkles: Sparkles,
  'candlestick-chart': Activity,
  'trending-down': TrendingDown,
  'alert-triangle': AlertTriangle,
  'git-compare': GitCompare,
  clock: Clock,
  'shield-alert': ShieldAlert,
  'eye-off': EyeOff,
  'check-square': CheckSquare,
  bookmark: Bookmark,
  'help-circle': HelpCircle,
  'book-open': BookOpen,
};

const sectionVisuals: Record<number, MarketMakerVisualKind[]> = {
  1: ['mmbm-comic-intro'],
  4: ['animated-mmbm-lifecycle'],
  5: ['mmbm-mmsm-symmetry'],
  6: ['model6-equilibrium-gauge'],
  7: ['lrlr-vs-hrlr-characters'],
  9: ['cisd-vs-smr-detector'],
  10: ['left-to-right-flip'],
  16: ['mtf-alignment-matrix'],
};

const sectionAnchors: Record<number, string> = {
  1: 'story',
  2: 'definition',
  4: 'mmbm-stages',
  6: 'equilibrium-symmetry',
  7: 'lrlr-hrlr',
  9: 'cisd-vs-mss',
  14: 'failures',
  15: 'comparisons',
  20: 'glossary',
  21: 'faq',
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'FVGs', 'فیئر ویلیو گیپ'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Inverse FVG', 'IFVG'], '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Order Block', 'Order Blocks', 'آرڈر بلاک'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Breaker Block', 'Bullish Breaker', 'Bearish Breaker', 'Bearish Breakers', 'بریکر بلاک'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Mitigation Block', 'Mitigation Blocks', 'Rejection Block'], '/learn/mitigation-and-rejection-blocks/'],
  [['Silver Bullet', 'سلور بُلٹ'], '/learn/silver-bullet-model/'],
  [['2022 Model', '2022 entry model', '2022 ماڈل'], '/learn/ict-charter-model-13-2022-youtube-model/'],
  [['Power of Three', 'پاور آف تھری'], '/learn/daily-profiles-and-intraday-power-of-three-po3/'],
  [['Weekly Profile', 'Midweek Reversal', 'مڈ ویک ریورسل'], '/learn/the-weekly-profile-and-five-day-delivery-model/'],
  [['20-day IPDA', 'IPDA Data Range', 'Dealing Range', '20 دن کی IPDA'], '/learn/ict-pd-array-selection-price-delivery-continuum/'],
  [['Low-Resistance Liquidity Run', 'LRLR', 'کم مزاحمتی لیکویڈیٹی رن'], '/tools/glossary/liquidity/low-resistance-liquidity-runs/'],
  [['High-Resistance Liquidity Run', 'HRLR'], '/tools/glossary/liquidity/event-volatility-hrlr/'],
  [['Liquidity Sweep', 'Stop Run', 'لیکویڈیٹی سویپ'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Buy-Side Liquidity', 'BSL', 'buy stops', 'بائے سائیڈ لیکویڈیٹی'], '/tools/glossary/liquidity/buy-side-liquidity/'],
  [['Sell-Side Liquidity', 'SSL', 'sell stops', 'سیل سائیڈ لیکویڈیٹی'], '/tools/glossary/liquidity/sell-side-liquidity/'],
  [['Killzone', 'Killzones', 'London Killzone', 'New York Killzone', 'کِل زون'], '/learn/time-and-session-liquidity-the-global-clock/'],
  [['SMT divergence', 'SMT'], '/learn/smt-divergence-mechanics/'],
  [['Displacement', 'ڈسپلیسمنٹ'], '/learn/why-candles-form-and-how-displacement-arises/'],
  [['Order Book', 'Central Limit Order Book', 'آرڈر بک'], '/learn/the-order-book-in-depth/'],
  [['Chart Laboratory', 'Chart Lab', 'چارٹ لیب'], '/tools/chartlab/'],
  [['Backtest Lab', 'replay', 'ری پلے'], '/tools/backtest/'],
];

const interactiveChecklistItems = [
  'Confirmed HTF narrative & 20-day IPDA Dealing Range bias before dropping to LTF',
  'Marked Original Consolidation boundaries and left-side SS/BS shelves prior to SMR',
  'Verified Equilibrium alignment: longing strictly in Discount (< 50%) or shorting in Premium (> 50%)',
  'Waited for liquidity sweep + HTF PD array tag + completed CISD/MSS body close',
  'Confirmed Low-Resistance (LRLR) path toward Terminus with no stacked opposing Breakers',
  'Divided single setup risk budget across LRB and Re-Accumulation with predefined stop placement',
];

const shortTermContinuityNotes: Array<{ title: string; summary: string }> = [
  {
    title: 'Multi-Day Range Calibration & 20-Day Lookback',
    summary:
      'Pairing the trailing 20-day Dealing Range with the weekly open classifies whether the active week is extending a trend or preparing an intraweek sweep into higher-timeframe Discount or Premium.',
  },
  {
    title: 'Two-Sided Curve Geometry (MMBM & MMSM)',
    summary:
      'Every balanced expansion links an Original Consolidation, a multi-shelf distribution or accumulation curve, an opposing HTF PD array sweep (SMR), and mirrored re-accumulation or re-distribution shelves back toward the origin.',
  },
  {
    title: 'Low-Resistance (LRLR) vs. High-Resistance (HRLR) Friction',
    summary:
      'Paths toward clean, unvisited Equal Highs or Lows with minimal opposing Breakers clear smoothly (LRLR), whereas congested return legs stacked with fresh opposing Order Blocks tend to chop and stall (HRLR).',
  },
  {
    title: 'Midweek Reversal Timing Windows',
    summary:
      'Weekly highs or lows frequently establish themselves between Tuesday London and Wednesday New York sessions when early-week expansion tags a weekly liquidity threshold and shifts structure decisively.',
  },
];

export function MarketMakerContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const linkedCounts = new Map<string, number>();
  const marked = new Set<string>();

  const highlightPhrases = [
    'Market Maker Buy Model (MMBM)',
    'Smart Money Reversal (SMR)',
    'Original Consolidation',
    'Low-Resistance Liquidity Runs',
    'Dealing Range Equilibrium',
  ];

  const prose = (source: string): React.ReactNode => {
    const text = t(source);
    const candidates = contextTerms
      .flatMap(([names, url]) => {
        if (url === marketMakerPath || (linkedCounts.get(url) ?? 0) >= 2) return [];
        return names.flatMap((name) => {
          const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const match = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'iu').exec(text);
          return match ? [{ start: match.index, end: match.index + match[0].length, url }] : [];
        });
      })
      .sort((a, b) => a.start - b.start || b.end - a.end);

    const selected: typeof candidates = [];
    const seenInBlock = new Set<string>();
    for (const item of candidates) {
      if (selected.length >= 3) break;
      if (seenInBlock.has(item.url) || selected.some((r) => r.end > item.start)) continue;
      selected.push(item);
      seenInBlock.add(item.url);
    }

    const applyMark = (val: string) => {
      const m = highlightPhrases.find((p) => !marked.has(p) && val.includes(p));
      if (!m) return val;
      marked.add(m);
      const idx = val.indexOf(m);
      return (
        <>
          {val.slice(0, idx)}
          <mark className={`fvg-mark fvg-mark-${marked.size % 3}`}>{m}</mark>
          {val.slice(idx + m.length)}
        </>
      );
    };

    if (selected.length === 0) return applyMark(text);
    const out: React.ReactNode[] = [];
    let cursor = 0;
    selected.forEach((hit, idx) => {
      linkedCounts.set(hit.url, (linkedCounts.get(hit.url) ?? 0) + 1);
      if (hit.start > cursor) {
        out.push(<React.Fragment key={`t-${idx}`}>{applyMark(text.slice(cursor, hit.start))}</React.Fragment>);
      }
      out.push(
        <a key={`l-${idx}`} className="fvg-context-link" href={href(hit.url)}>
          {text.slice(hit.start, hit.end)}
        </a>,
      );
      cursor = hit.end;
    });
    if (cursor < text.length) {
      out.push(<React.Fragment key="t-end">{applyMark(text.slice(cursor))}</React.Fragment>);
    }
    return <>{out}</>;
  };

  const renderBlock = (block: MarketMakerBlock, key: number) => {
    if (block.type === 'callout') {
      return (
        <aside
          key={key}
          className={`mm-callout ${block.tone === 'warn' ? 'mm-callout-warn' : ''}`}
        >
          <div className="mm-callout-head">
            {block.tone === 'warn' ? (
              <AlertTriangle size={16} aria-hidden="true" />
            ) : (
              <Info size={16} aria-hidden="true" />
            )}
            <strong>{t(block.title || '')}</strong>
          </div>
          <p>{prose(block.text || '')}</p>
        </aside>
      );
    }

    if (block.type === 'table') {
      const rows = block.rows || [];
      return (
        <div
          className="fvg-table-scroll mm-table-wrap"
          tabIndex={0}
          role="region"
          aria-label={rows[0]?.filter(Boolean).map((c) => t(c)).join(' / ')}
          key={key}
        >
          <table>
            <thead>
              <tr>
                {rows[0]?.map((cell, ci) => (
                  <th key={ci} scope="col">
                    {t(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) =>
                    ci === 0 ? (
                      <th key={ci} scope="row">
                        {t(cell)}
                      </th>
                    ) : (
                      <td key={ci}>{prose(cell)}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (block.type === 'list') {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag key={key} className="mm-styled-list">
          {(block.items || []).map((item, idx) => (
            <li key={idx}>{prose(item)}</li>
          ))}
        </Tag>
      );
    }

    return (
      <p data-lesson-content="" key={key}>
        {prose(block.text || '')}
      </p>
    );
  };

  const completedChecks = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="fvg-document market-maker-document">
      <section className="fvg-takeaways mm-takeaways">
        <h2>
          <Sparkles size={17} aria-hidden="true" />
          {t('Key Takeaways')}
        </h2>
        <ul>
          {lesson.takeaways.map((item) => (
            <li key={item}>{prose(item)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract kind="formula" name={t('Dealing Range Equilibrium & Symmetry Formula')}>
        <p className="mm-formula-box" itemProp="description">
          <code>
            {t(
              'Equilibrium = (Range High + Range Low) ÷ 2 | 50% SMR Symmetry = SMR + (Terminus − SMR) × 0.5',
            )}
          </code>
        </p>
      </LessonExtract>

      <nav className="liquidity-toc mm-toc" aria-label={t('On this page')}>
        <details>
          <summary>{t('On this page')}</summary>
          <ol>
            {lesson.sections.map((s, idx) => (
              <li key={s.number}>
                <a href={`#rr-section-${idx}`}>{t(s.title)}</a>
              </li>
            ))}
          </ol>
        </details>
      </nav>

      {lesson.sections.map((section, idx) => {
        const Icon = iconMap[section.icon] || BookOpen;
        const visuals = sectionVisuals[section.number] || [];

        return (
          <section
            className="rr-text-section fvg-document-section"
            id={`rr-section-${idx}`}
            key={section.number}
          >
            {sectionAnchors[section.number] && (
              <span id={sectionAnchors[section.number]} className="liquidity-anchor" />
            )}
            <h2 className="mm-sec-head">
              <span className="mm-sec-icon" aria-hidden="true">
                <Icon size={16} />
              </span>
              <span>
                {section.number}. {t(section.title)}
              </span>
            </h2>

            {section.blocks.map((block, bi) => {
              if (section.number === 2 && bi === 0) {
                return (
                  <LessonExtract key={bi} kind="definition" name="Market Maker Buy Model (MMBM)">
                    <p data-lesson-content="" itemProp="description">
                      {prose(block.text || '')}
                    </p>
                  </LessonExtract>
                );
              }
              return renderBlock(block, bi);
            })}

            {visuals.map((kind) => (
              <MarketMakerVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}

            {section.number === 19 && (
              <div className="mm-interactive-check">
                {interactiveChecklistItems.map((item, cIdx) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={!!checkedItems[cIdx]}
                      disabled={staticOnly}
                      onChange={() =>
                        setCheckedItems((prev) => ({ ...prev, [cIdx]: !prev[cIdx] }))
                      }
                    />
                    <span>{t(item)}</span>
                  </label>
                ))}
                {!staticOnly && (
                  <p className="mm-check-status" role="status">
                    {t('Checklist items confirmed')}:{' '}
                    <bdi className="mm-num">
                      {completedChecks} / {interactiveChecklistItems.length}
                    </bdi>{' '}
                    —{' '}
                    {completedChecks >= 5
                      ? t('Ready to log replay setup (still verify session timing and costs).')
                      : t('Complete the remaining checks before treating this curve as qualified.')}
                  </p>
                )}
              </div>
            )}

            {section.number === 21 && (
              <div className="fvg-faq" id="market-maker-faq">
                {lesson.faqs.map((item, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`market-maker-faq-${fi}`}
                    group="market-maker-faq"
                    className="fvg-faq-card"
                    question={t(item.question)}
                  >
                    <p>{prose(item.answer)}</p>
                  </LessonFaq>
                ))}
              </div>
            )}

            {section.number === 22 && (
              <>
                <aside className="liquidity-section-sources" aria-label={t('Technical market references')}>
                  <ul>
                    {marketMakerSources.map((src) => (
                      <li key={src.url}>
                        <a href={src.url} rel="noopener noreferrer" target="_blank">
                          {t(src.title)}
                        </a>
                        <span> — {t(src.scope)}</span>
                      </li>
                    ))}
                  </ul>
                </aside>

                <section id="merged-43" className="mm-merged-archive">
                  <h3>{t('Short-Term Swing Execution & Midweek Reversal Summary')}</h3>
                  <p className="mm-archive-note">
                    {t('Key operational rules linking multi-day Dealing Ranges, LRLR paths, and midweek reversal windows.')}
                  </p>
                  {shortTermContinuityNotes.map((sec, mIdx) => (
                    <div
                      key={sec.title}
                      id={mIdx === 0 ? 'merged-43-sec-0' : `merged-43-section-${mIdx}`}
                      className="mm-archive-card"
                    >
                      <h4>{t(sec.title)}</h4>
                      <p>{prose(sec.summary)}</p>
                    </div>
                  ))}
                </section>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function MarketMakerRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    {
      label: 'Test Market Maker Propulsion in Chart Lab',
      url: '/tools/chartlab/eur-mmbm-propulsion-model/',
    },
    {
      label: 'Read the Silver Bullet Time-Window Guide',
      url: '/learn/silver-bullet-model/',
    },
    {
      label: 'Study the 2022 Time-Based Entry Framework',
      url: '/learn/ict-charter-model-13-2022-youtube-model/',
    },
    {
      label: 'Explore Daily Profiles & Power of Three (PO3)',
      url: '/learn/daily-profiles-and-intraday-power-of-three-po3/',
    },
    {
      label: 'Weekly Profile & Five-Day Delivery Model',
      url: '/learn/the-weekly-profile-and-five-day-delivery-model/',
    },
    {
      label: 'Master Market Structure Shift (MSS)',
      url: '/learn/market-structure-shift-mss-verified-directional-shift/',
    },
    {
      label: 'Fair Value Gaps (FVG) & Consequent Encroachment',
      url: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/',
    },
  ];
  return (
    <nav className="rr-related-reading" aria-label={t('Continue Studying')}>
      <h2>{t('Continue Studying')}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.url}>
            <a className="fvg-context-link" href={href(l.url)}>
              <span>{t(l.label)}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
