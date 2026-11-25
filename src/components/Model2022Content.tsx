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
  Scale,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import {
  model2022Document as lesson,
  model2022Path,
  model2022Sources,
  type Model2022Block,
} from '../data/chapters/model2022Lesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { Model2022Visual, type Model2022VisualKind } from './Model2022Visual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  users: Users,
  layers: Layers,
  'book-open': BookOpen,
  activity: Activity,
  compass: Compass,
  clock: Clock,
  crosshair: Crosshair,
  zap: Zap,
  scale: Scale,
  'trending-up': TrendingUp,
  sparkles: Sparkles,
  'candlestick-chart': Activity,
  'trending-down': TrendingDown,
  'git-compare': GitCompare,
  'arrow-up-down': ArrowUpDown,
  'alert-triangle': AlertTriangle,
  'shield-alert': ShieldAlert,
  'eye-off': EyeOff,
  'check-square': CheckSquare,
  bookmark: Bookmark,
  'help-circle': HelpCircle,
};

const sectionVisuals: Record<number, Model2022VisualKind[]> = {
  1: ['model2022-comic-intro'],
  4: ['animated-2022-lifecycle'],
  6: ['killzone-clock-timeline'],
  8: ['displacement-mss-inspector'],
  9: ['fvg-ote-confluence-sandbox'],
  11: ['midnight-open-po3-lab'],
  14: ['mtf-2022-matrix'],
  16: ['mistakes-stick-comic'],
};

const sectionAnchors: Record<number, string> = {
  1: 'story',
  2: 'definition',
  4: 'sequence',
  6: 'killzones',
  7: 'sweeps-smt',
  8: 'cisd-mss',
  9: 'fvg-ote',
  11: 'midnight-open-po3',
  14: 'mtf-matrix',
  15: 'comparisons',
  16: 'mistakes',
  20: 'glossary',
  21: 'faq',
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'FVGs', 'فیئر ویلیو گیپ'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Consequent Encroachment', '50% CE', 'کنسیکوئنٹ انکروچمنٹ'], '/tools/glossary/imbalances/consequent-encroachment/'],
  [['Inverse FVG', 'IFVG', 'انورس FVG'], '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Order Block', 'Order Blocks', 'آرڈر بلاک'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Breaker Block', 'Bullish Breaker', 'Bearish Breaker', 'بریکر بلاک'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Silver Bullet', 'سلور بُلٹ'], '/learn/silver-bullet-model/'],
  [['Market Maker Model', 'MMBM', 'MMSM', 'مارکیٹ میکر ماڈل'], '/learn/ict-charter-models-6-and-7-universal-models/'],
  [['Power of Three', 'پاور آف تھری'], '/learn/daily-profiles-and-intraday-power-of-three-po3/'],
  [['Killzone', 'Killzones', 'London Killzone', 'NY PM Session', 'کِل زون'], '/learn/time-and-session-liquidity-the-global-clock/'],
  [['09:30 AM', 'Opening Range', '09:30 Equities Open'], '/learn/0930-am-opening-range-theory/'],
  [['1st Presented FVG', '09:31'], '/learn/the-1st-presented-fvg-the-0931-rule/'],
  [['Liquidity Sweep', 'Stop Run', 'لیکویڈیٹی سویپ'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Buy-Side Liquidity', 'BSL', 'buy-stops', 'بائے سائیڈ لیکویڈیٹی'], '/tools/glossary/liquidity/buy-side-liquidity/'],
  [['Sell-Side Liquidity', 'SSL', 'sell-stops', 'سیل سائیڈ لیکویڈیٹی'], '/tools/glossary/liquidity/sell-side-liquidity/'],
  [['External Range Liquidity', 'ERL', 'Internal Range Liquidity', 'IRL'], '/learn/internal-vs-external-structure/'],
  [['SMT Divergence', 'SMT', 'ایس ایم ٹی ڈائیورجنس'], '/learn/smt-divergence-mechanics/'],
  [['Displacement', 'ڈسپلیسمنٹ'], '/learn/why-candles-form-and-how-displacement-arises/'],
  [['CPI', 'NFP', 'FOMC', 'High-Impact News'], '/learn/ict-news-volatility-no-trade-framework/'],
  [['Order Book', 'spreads', 'slippage', 'آرڈر بک'], '/learn/the-order-book-in-depth/'],
  [['Chart Laboratory', 'Chart Lab', 'چارٹ لیبارٹری'], '/tools/chartlab/'],
  [['Backtest Lab', 'backtest', 'replay', 'ری پلے'], '/tools/backtest/'],
  [['paper trading', 'Trade Simulator'], '/tools/simulator/'],
];

const interactiveChecklistItems = [
  'Mapped Higher-Timeframe Draw on Liquidity (PDH/PDL, session extreme, or HTF FVG) before dropping to LTF',
  'Confirmed chart clock uses America/New_York local time inside an active Killzone or Macro window',
  'Observed a real price sweep beyond a prior high/low (not guessing mid-range reversals)',
  'Verified energetic displacement + Market Structure Shift (MSS) with a clean trailing 3-candle FVG (No-FVG check)',
  'Aligned FVG / 50% CE entry with Discount (< 50%) for longs or Premium (> 50%) for shorts (OTE confluence optional)',
  'Fixed stop beyond the sweep extreme wick with exact contract value, commissions, slippage, and expiry time',
];

export function Model2022Content({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const linkedCounts = new Map<string, number>();
  const marked = new Set<string>();

  const highlightPhrases = [
    'ICT 2022 Model',
    'Market Structure Shift (MSS)',
    'Fair Value Gap',
    'Consequent Encroachment (CE)',
    'Optimal Trade Entry (OTE)',
  ];

  const prose = (source: string): React.ReactNode => {
    const text = t(source);
    const candidates = contextTerms
      .flatMap(([names, url]) => {
        if (url === model2022Path || (linkedCounts.get(url) ?? 0) >= 2) return [];
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

  const renderBlock = (block: Model2022Block, key: number) => {
    if (block.type === 'callout') {
      return (
        <aside
          key={key}
          className={`m22-callout ${block.tone === 'warn' ? 'm22-callout-warn' : ''}`}
        >
          <div className="m22-callout-head">
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
          className="fvg-table-scroll m22-table-wrap"
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
        <Tag key={key} className="m22-styled-list">
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
    <div className="fvg-document model-2022-document">
      <section className="fvg-takeaways m22-takeaways">
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

      <LessonExtract kind="formula" name={t('ICT 2022 Model FVG, CE & OTE Rule')}>
        <p className="m22-formula-box" itemProp="description">
          <code>
            {t(
              'Bullish FVG = C1 High to C3 Low | Consequent Encroachment (CE) = (FVG Low + FVG High) ÷ 2 | OTE Zone = 62%–79% (70.5%) of Sweep-to-MSS Leg',
            )}
          </code>
        </p>
      </LessonExtract>

      <nav className="liquidity-toc m22-toc" aria-label={t('On this page')}>
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
            <h2 className="m22-sec-head">
              <span className="m22-sec-icon" aria-hidden="true">
                <Icon size={16} />
              </span>
              <span>
                {section.number}. {t(section.title)}
              </span>
            </h2>

            {section.blocks.map((block, bi) => {
              if (section.number === 2 && bi === 0) {
                return (
                  <LessonExtract key={bi} kind="definition" name="ICT 2022 Model">
                    <p data-lesson-content="" itemProp="description">
                      {prose(block.text || '')}
                    </p>
                  </LessonExtract>
                );
              }
              return renderBlock(block, bi);
            })}

            {visuals.map((kind) => (
              <Model2022Visual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}

            {section.number === 19 && (
              <div className="m22-interactive-check">
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
                  <p className="m22-check-status" role="status">
                    {t('Checklist items confirmed')}:{' '}
                    <bdi className="m22-num">
                      {completedChecks} / {interactiveChecklistItems.length}
                    </bdi>{' '}
                    —{' '}
                    {completedChecks >= 6
                      ? t('All six 2022 Model gates verified — log setup cleanly with stop & costs.')
                      : t('Finish verifying the remaining gates before recording a qualified setup.')}
                  </p>
                )}
              </div>
            )}

            {section.number === 21 && (
              <div className="fvg-faq" id="model-2022-faq">
                {lesson.faqs.map((item, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`model-2022-faq-${fi}`}
                    group="model-2022-faq"
                    className="fvg-faq-card"
                    question={t(item.question)}
                  >
                    <p>{prose(item.answer)}</p>
                  </LessonFaq>
                ))}
              </div>
            )}

            {section.number === 22 && (
              <aside
                className="liquidity-section-sources"
                aria-label={t('Technical market references')}
              >
                <ul>
                  {model2022Sources.map((src) => (
                    <li key={src.url}>
                      <a href={src.url} rel="noopener noreferrer" target="_blank">
                        {t(src.title)}
                      </a>
                      <span> — {t(src.scope)}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function Model2022RelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    {
      label: 'Read the ICT Silver Bullet Time-Window Guide',
      url: '/learn/silver-bullet-model/',
    },
    {
      label: 'Study Market Maker Models (MMBM & MMSM)',
      url: '/learn/ict-charter-models-6-and-7-universal-models/',
    },
    {
      label: 'Master Market Structure Shift (MSS)',
      url: '/learn/market-structure-shift-mss-verified-directional-shift/',
    },
    {
      label: 'Deep Dive Into Fair Value Gaps (FVG & CE)',
      url: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/',
    },
    {
      label: 'Explore Daily Profiles & Power of Three (PO3)',
      url: '/learn/daily-profiles-and-intraday-power-of-three-po3/',
    },
    {
      label: 'Order Book & Market Microstructure',
      url: '/learn/the-order-book-in-depth/',
    },
    {
      label: 'Practice 2022 Setups in the Chart Laboratory',
      url: '/tools/chartlab/',
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
