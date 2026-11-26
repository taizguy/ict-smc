import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpDown,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  CheckSquare,
  ChevronDown,
  Clock,
  Compass,
  Crosshair,
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
  oteDocument as lesson,
  otePath,
  oteSources,
  type OteBlock,
} from '../data/chapters/oteLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { OteVisual, type OteVisualKind } from './OteVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  users: Users,
  'book-open': BookOpen,
  layers: Layers,
  compass: Compass,
  scale: Scale,
  crosshair: Crosshair,
  'git-compare': GitCompare,
  'arrow-up-down': ArrowUpDown,
  zap: Zap,
  clock: Clock,
  'trending-up': TrendingUp,
  'shield-alert': ShieldAlert,
  sparkles: Sparkles,
  activity: Activity,
  'trending-down': TrendingDown,
  'alert-triangle': AlertTriangle,
  'check-square': CheckSquare,
  bookmark: Bookmark,
  'help-circle': HelpCircle,
};

const sectionVisuals: Record<number, OteVisualKind[]> = {
  1: ['ote-comic-intro'],
  3: ['ote-anatomy-animated'],
  5: ['ote-calculator-sandbox'],
  7: ['ote-anchor-comparison'],
  9: ['ote-pd-confluence'],
  13: ['ote-bearish-cinema'],
  14: ['ote-extension-targets'],
  18: ['ote-mtf-alignment'],
  21: ['ote-mistakes-comic'],
};

const contextTerms: Array<[string[], string]> = [
  [['Premium and Discount', 'Premium', 'Discount', 'Equilibrium', 'پریمیم', 'ڈسکاؤنٹ', 'ایکویلیبریم'], '/learn/ict-pd-array-selection-price-delivery-continuum/'],
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'FVGs', 'فیئر ویلیو گیپ', 'فیئر ویلیو گیپس'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Consequent Encroachment', '50% CE', 'کنسیکوئنٹ انکروچمنٹ'], '/tools/glossary/imbalances/consequent-encroachment/'],
  [['Order Block', 'Order Blocks', 'آرڈر بلاک', 'آرڈر بلاکس'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Breaker Block', 'Breaker Blocks', 'Breaker', 'بریکر بلاک', 'بریکر بلاکس', 'بریکر'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Break of Structure', 'BOS', 'بریک آف اسٹرکچر'], '/learn/break-of-structure-bos-trend-continuation/'],
  [['Dealing Range', 'internal swings', 'ڈیلنگ رینج'], '/learn/internal-vs-external-structure/'],
  [['Swing Low', 'Swing High', 'سوئنگ لو', 'سوئنگ ہائی'], '/learn/what-is-a-swing-the-atom-of-structure/'],
  [['Liquidity Sweep', 'Draw on Liquidity', 'Sell-Side', 'Buy-Side', 'لیکویڈیٹی سویپ', 'سیل سائیڈ لیکویڈیٹی', 'بائے سائیڈ لیکویڈیٹی'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Killzone', 'Killzones', 'London Killzone', 'NY AM Killzone', 'کِل زون', 'کِل زونز', 'لندن کِل زون'], '/learn/time-and-session-liquidity-the-global-clock/'],
  [['Silver Bullet', 'سلور بُلٹ'], '/learn/silver-bullet-model/'],
  [['2022 Model', '2022 ماڈل'], '/learn/ict-charter-model-13-2022-youtube-model/'],
  [['Market Maker Buy and Sell Models', 'Market Maker', 'MMBM', 'MMSM'], '/learn/ict-charter-models-6-and-7-universal-models/'],
  [['Displacement', 'ڈسپلیسمنٹ'], '/learn/why-candles-form-and-how-displacement-arises/'],
  [['Inverse FVG', 'IFVG', 'انورس FVG'], '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/'],
  [['CPI', 'NFP', 'FOMC', 'High-Resistance Liquidity'], '/learn/ict-news-volatility-no-trade-framework/'],
  [['order books', 'spreads', 'slippage', 'آرڈر بک', 'سلپیج'], '/learn/the-order-book-in-depth/'],
  [['OTE Calculator', 'OTE کیلکولیٹر'], '/tools/delivery-suite/ote-calculator/'],
  [['OTE Expansion Long Trade Simulator', 'OTE ایکسپینشن لانگ ٹریڈ سمیولیٹر'], '/tools/simulator/ote-expansion-long/'],
  [['Chart Laboratory', 'چارٹ لیبارٹری'], '/tools/chartlab/'],
  [['Backtest Lab', 'backtesting', 'بیک ٹیسٹنگ', 'بیک ٹیسٹ لیب'], '/tools/backtest/'],
];

const highlightPhrases = [
  '0.62 to 0.79',
  '0.62–0.79',
  '0.705 sweet spot',
  '0.50 equilibrium',
  '1.0 invalidation',
  '-0.27',
  '-0.62',
  '-1.272',
  '-1.618',
  '0.705 سویٹ اسپاٹ',
  '1.0 ان ویلیڈیشن',
];

const interactiveChecklistItems = [
  'Confirmed clean displacement impulse with a structural break (MSS or BOS) before drawing Fib',
  'Anchored 1.0 strictly at the impulse origin and 0.0 at the impulse extreme (not drawn backward)',
  'Waited for price to clear 0.50 Equilibrium into Discount (longs) or Premium (shorts) inside 0.62–0.79',
  'Verified overlapping FVG (50% CE), Order Block, or Breaker inside the OTE band (no bare-line orders)',
  'Checked active London or New York Killzone timing in America/New_York local time',
  'Defined stop invalidation beyond 1.0 with symmetrical -0.27 / -0.62 extension targets',
];

function markPhrases(text: string): React.ReactNode[] {
  let parts: Array<string | React.ReactElement> = [text];
  let keyCounter = 0;
  for (const phrase of highlightPhrases) {
    const next: Array<string | React.ReactElement> = [];
    for (const part of parts) {
      if (typeof part !== 'string') {
        next.push(part);
        continue;
      }
      const idx = part.toLowerCase().indexOf(phrase.toLowerCase());
      if (idx === -1) {
        next.push(part);
        continue;
      }
      if (idx > 0) next.push(part.slice(0, idx));
      next.push(
        <mark key={`m-${keyCounter++}`} className="fvg-mark">
          {part.slice(idx, idx + phrase.length)}
        </mark>,
      );
      if (idx + phrase.length < part.length) next.push(part.slice(idx + phrase.length));
    }
    parts = next;
  }
  return parts;
}

function linkifyText(
  text: string,
  href: (p: string) => string,
  urlCount: Map<string, number>,
  maxLinks = 3,
): React.ReactNode {
  const matches: Array<{ start: number; end: number; url: string; raw: string }> = [];
  for (const [terms, url] of contextTerms) {
    if (url === otePath) continue;
    if ((urlCount.get(url) || 0) >= 2) continue;
    for (const term of terms) {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`, 'i');
      const m = regex.exec(text);
      if (m && !matches.some((existing) => !(m.index + m[0].length <= existing.start || m.index >= existing.end))) {
        matches.push({ start: m.index, end: m.index + m[0].length, url, raw: m[0] });
        break;
      }
    }
  }
  matches.sort((a, b) => a.start - b.start);
  const selected = matches.slice(0, maxLinks);
  if (!selected.length) return markPhrases(text);

  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  selected.forEach((m, idx) => {
    urlCount.set(m.url, (urlCount.get(m.url) || 0) + 1);
    if (m.start > cursor) nodes.push(...markPhrases(text.slice(cursor, m.start)));
    nodes.push(
      <a key={`ctx-${idx}-${m.url}`} className="fvg-context-link" href={href(m.url)}>
        {m.raw}
      </a>,
    );
    cursor = m.end;
  });
  if (cursor < text.length) nodes.push(...markPhrases(text.slice(cursor)));
  return nodes;
}

function SectionHeading({
  iconName,
  title,
}: {
  iconName: string;
  title: string;
}) {
  const Icon = iconMap[iconName] || BookOpen;
  return (
    <h2 className="ote-sec-head">
      <span className="ote-sec-icon" aria-hidden="true">
        <Icon size={17} />
      </span>
      <span>{title}</span>
    </h2>
  );
}

export function OteContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const [checked, setChecked] = useState<boolean[]>(interactiveChecklistItems.map(() => false));
  const urlCount = new Map<string, number>();

  const renderBlock = (block: OteBlock, key: string, secTitle: string) => {
    if (block.type === 'paragraph' && block.text) {
      return <p key={key}>{linkifyText(t(block.text), href, urlCount)}</p>;
    }
    if (block.type === 'callout' && block.text) {
      return (
        <div
          key={key}
          className={`ote-callout ${block.tone === 'warn' ? 'ote-callout-warn' : ''}`}
        >
          {block.title && (
            <div className="ote-callout-head">
              {block.tone === 'warn' ? (
                <AlertTriangle size={16} aria-hidden="true" />
              ) : (
                <Info size={16} aria-hidden="true" />
              )}
              <strong>{t(block.title)}</strong>
            </div>
          )}
          <p>{linkifyText(t(block.text), href, urlCount)}</p>
        </div>
      );
    }
    if (block.type === 'list' && block.items) {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag key={key} className="ote-styled-list">
          {block.items.map((item, idx) => (
            <li key={`${key}-${idx}`}>{linkifyText(t(item), href, urlCount)}</li>
          ))}
        </Tag>
      );
    }
    if (block.type === 'table' && block.rows) {
      const [header, ...rows] = block.rows;
      return (
        <div className="ote-table-scroll" role="region" tabIndex={0} aria-label={t(secTitle)} key={key}>
          <table>
            <thead>
              <tr>
                {header.map((cell, ci) => (
                  <th key={ci} scope="col">
                    {t(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) =>
                    ci === 0 ? (
                      <th key={ci} scope="row">
                        {t(cell)}
                      </th>
                    ) : (
                      <td key={ci}>{ci === 1 ? linkifyText(t(cell), href, urlCount, 2) : t(cell)}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  const completedCount = checked.filter(Boolean).length;

  return (
    <div className="fvg-document ote-document">
      <section className="fvg-takeaways" aria-labelledby="ote-takeaways-heading">
        <h2 id="ote-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="ote-styled-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('Mathematical Formula')}`} kind="formula">
        <div className="ote-formula-box">
          <strong>{t('Mathematical Formula')}:</strong>
          <code itemProp="description">
            {t('Bullish Retracement: Price(r) = High − (High − Low) × r')} ·{' '}
            {t('Bearish Retracement: Price(r) = Low + (High − Low) × r')}
          </code>
        </div>
      </LessonExtract>

      <nav className="ote-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <span className="ote-toc-summary-left">
              <Bookmark size={16} aria-hidden="true" />
              <span>{t('On this page')}</span>
            </span>
            <span className="ote-toc-badge">
              <span>
                <bdi>{lesson.sections.length}</bdi> {t('sections')} · {t('Show section links')}
              </span>
              <ChevronDown size={15} className="ote-toc-chevron" aria-hidden="true" />
            </span>
          </summary>
          <ol>
            {lesson.sections.map((sec, idx) => (
              <li key={sec.number}>
                <a href={`#rr-section-${idx}`}>{t(sec.title)}</a>
              </li>
            ))}
          </ol>
        </details>
      </nav>

      {lesson.sections.map((sec, idx) => {
        const visuals = sectionVisuals[sec.number] || [];
        return (
          <section
            key={sec.number}
            id={`rr-section-${idx}`}
            className="rr-text-section fvg-document-section ote-section"
          >
            <SectionHeading iconName={sec.icon} title={t(sec.title)} />
            {sec.blocks.map((block, bIdx) => renderBlock(block, `s${sec.number}-b${bIdx}`, sec.title))}

            {visuals.map((kind) => (
              <OteVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}

            {sec.number === 22 && (
              <div className="ote-interactive-check" role="group" aria-label={t('Pre-Execution Checklist')}>
                {interactiveChecklistItems.map((item, cIdx) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={checked[cIdx]}
                      onChange={() =>
                        setChecked((prev) => prev.map((v, i) => (i === cIdx ? !v : v)))
                      }
                    />
                    <span>{t(item)}</span>
                  </label>
                ))}
                <p className="ote-check-status">
                  {t('Checklist items confirmed')}: <span className="ote-num">{completedCount}/6</span>{' '}
                  {completedCount === 6
                    ? `— ${t('Checklist complete — range anchors, confluence, session timing, and 1.0 invalidation are documented.')}`
                    : `— ${t('Check all 6 criteria to confirm whether a studied range meets full OTE discipline.')}`}
                </p>
              </div>
            )}

            {sec.number === 25 && (
              <>
                <aside className="ote-sources-box" aria-label={t('Sources & Institutional References')}>
                  <h3>{t('Sources & Institutional References')}</h3>
                  <ul>
                    {oteSources.map((src) => (
                      <li key={src.url}>
                        <a href={src.url} rel="noopener noreferrer" target="_blank">
                          {t(src.title)}
                        </a>
                        <span> — {t(src.scope)}</span>
                      </li>
                    ))}
                  </ul>
                </aside>

                <div className="fvg-faq" id="ote-faq">
                  {lesson.faqs.map((faq, fi) => (
                    <LessonFaq
                      key={fi}
                      id={`ote-faq-${fi}`}
                      group="ote-faq"
                      className="fvg-faq-card"
                      question={t(faq.question)}
                    >
                      <p>{linkifyText(t(faq.answer), href, urlCount, 1)}</p>
                    </LessonFaq>
                  ))}
                </div>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function OteRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    {
      label: 'Study Premium & Discount: The PD Array Matrix',
      url: '/learn/ict-pd-array-selection-price-delivery-continuum/',
    },
    {
      label: 'Deep Dive Into Fair Value Gaps (FVG & CE)',
      url: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/',
    },
    {
      label: 'Master Order Blocks (OB) & Mitigation',
      url: '/learn/order-blocks-ob-and-mitigation/',
    },
    {
      label: 'Study Breaker Blocks (Failed Order Blocks)',
      url: '/learn/breaker-blocks-trading-failed-order-blocks/',
    },
    {
      label: 'Connect OTE With the ICT 2022 Model',
      url: '/learn/ict-charter-model-13-2022-youtube-model/',
    },
    {
      label: 'Explore Session Liquidity & Killzones',
      url: '/learn/time-and-session-liquidity-the-global-clock/',
    },
    {
      label: 'Compute Live Levels in the OTE Calculator',
      url: '/tools/delivery-suite/ote-calculator/',
    },
    {
      label: 'Practice in the OTE Expansion Simulator',
      url: '/tools/simulator/ote-expansion-long/',
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
