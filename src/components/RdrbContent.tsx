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
  rdrbDocument as lesson,
  rdrbPath,
  rdrbSources,
  type RdrbBlock,
} from '../data/chapters/rdrbLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { RdrbVisual, type RdrbVisualKind } from './RdrbVisual';

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
  info: Info,
};

const sectionVisuals: Record<number, RdrbVisualKind[]> = {
  1: ['rdrb-comic-intro'],
  3: ['rdrb-overlap-3d-cinema'],
  5: ['rdrb-calculator-sandbox'],
  7: ['rdrb-vs-ifvg-comparison'],
  9: ['rdrb-rdrb-timeline'],
  11: ['rdrb-enigma-dissection'],
  14: ['rdrb-confluence-lab'],
  16: ['rdrb-mtf-matrix'],
  21: ['rdrb-mistakes-comic'],
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'FVGs', 'BISI', 'SIBI', 'Consequent Encroachment', 'فیئر ویلیو گیپ', 'فیئر ویلیو گیپس'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Inverse Fair Value Gap', 'Inverse Fair Value Gaps', 'Inverse FVG', 'IFVG', 'انورس فیئر ویلیو گیپ', 'انورس FVG'], '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/'],
  [['PD Array', 'PD arrays', 'Premium', 'Discount', 'Equilibrium', 'پریمیم', 'ڈسکاؤنٹ', 'ایکویلیبریم'], '/learn/ict-pd-array-selection-price-delivery-continuum/'],
  [['Optimal Trade Entry', 'OTE', 'آپٹیمل ٹریڈ انٹری'], '/learn/optimal-trade-entry-ote/'],
  [['Order Block', 'Order Blocks', 'آرڈر بلاک', 'آرڈر بلاکس'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Breaker Block', 'Breaker Blocks', 'Unicorn', 'بریکر بلاک', 'بریکر بلاکس', 'یونیکارن'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Break of Structure', 'BOS', 'بریک آف اسٹرکچر'], '/learn/break-of-structure-bos-trend-continuation/'],
  [['Liquidity Sweep', 'Draw on Liquidity', 'Buy-Side Liquidity', 'Sell-Side Liquidity', 'BSL', 'SSL', 'لیکویڈیٹی سویپ', 'سیل سائیڈ لیکویڈیٹی', 'بائے سائیڈ لیکویڈیٹی'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Killzones', 'Killzone', 'London Open', 'New York AM', 'کِل زون', 'کِل زونز', 'لندن اوپن'], '/learn/time-and-session-liquidity-the-global-clock/'],
  [['Dealing Range', 'internal structure', 'ڈیلنگ رینج'], '/learn/internal-vs-external-structure/'],
  [['Swing Low', 'Swing High', 'سوئنگ لو', 'سوئنگ ہائی'], '/learn/what-is-a-swing-the-atom-of-structure/'],
  [['Displacement', 'ڈسپلیسمنٹ'], '/learn/why-candles-form-and-how-displacement-arises/'],
  [['CPI', 'NFP', 'FOMC'], '/learn/ict-news-volatility-no-trade-framework/'],
  [['order book', 'slippage', 'آرڈر بک', 'سلپیج'], '/learn/the-order-book-in-depth/'],
  [['2022 Model', '2022 ماڈل'], '/learn/ict-charter-model-13-2022-youtube-model/'],
  [['Reaper', 'Suspension Block'], '/learn/reaper-ifvg-and-suspension-block-advancements/'],
  [['Chart Lab', 'چارٹ لیب'], '/tools/chartlab/'],
];

const highlightPhrases = [
  '50% BPR midpoint',
  'BPR_Low < BPR_High',
  'max(FVG1_Low, FVG2_Low)',
  'min(FVG1_High, FVG2_High)',
  'Redelivered Rebalanced',
  '1.25x',
  'far-edge invalidation',
  '50% BPR مڈپوائنٹ',
];

const interactiveChecklistItems = [
  'Verified True BPR Intersection: max(FVG1_Low, FVG2_Low) < min(FVG1_High, FVG2_High) with clear opposing displacement',
  'Identified Liquidity Sweep Origin (BSL/SSL purged before Leg 2 counter-impulse launched)',
  'Confirmed Market Structure Shift (MSS) breaking the intervening swing with wide displacement bodies',
  'Verified Higher-Timeframe alignment and Discount (<50%) or Premium (>50%) context',
  'Confirmed active London or New York window in America/New_York local time (no midday chop)',
  'Fixed invalidation stop beyond BPR far edge (or Leg 2 swing extreme) before price reaches entry',
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
    if (url === rdrbPath) continue;
    if ((urlCount.get(url) || 0) >= 2) continue;
    for (const term of terms) {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`, 'i');
      const m = regex.exec(text);
      if (
        m &&
        !matches.some((existing) => !(m.index + m[0].length <= existing.start || m.index >= existing.end))
      ) {
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
    <h2 className="rdrb-sec-head">
      <span className="rdrb-sec-icon" aria-hidden="true">
        <Icon size={17} />
      </span>
      <span>{title}</span>
    </h2>
  );
}

export function RdrbContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const [checked, setChecked] = useState<boolean[]>(interactiveChecklistItems.map(() => false));
  const urlCount = new Map<string, number>();

  const renderBlock = (block: RdrbBlock, key: string, secTitle: string, preserveVerbatim = false) => {
    if (block.type === 'paragraph' && block.text) {
      return (
        <p key={key}>
          {preserveVerbatim ? t(block.text) : linkifyText(t(block.text), href, urlCount)}
        </p>
      );
    }
    if (block.type === 'callout' && block.text) {
      return (
        <div
          key={key}
          className={`rdrb-callout ${block.tone === 'warn' ? 'rdrb-callout-warn' : ''}`}
        >
          {block.title && (
            <div className="rdrb-callout-head">
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
        <Tag key={key} className="rdrb-styled-list">
          {block.items.map((item, idx) => (
            <li key={`${key}-${idx}`}>{linkifyText(t(item), href, urlCount)}</li>
          ))}
        </Tag>
      );
    }
    if (block.type === 'table' && block.rows) {
      const [header, ...rows] = block.rows;
      return (
        <div className="rdrb-table-scroll" role="region" tabIndex={0} aria-label={t(secTitle)} key={key}>
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
    <div className="fvg-document rdrb-document">
      <section className="fvg-takeaways" aria-labelledby="rdrb-takeaways-heading">
        <h2 id="rdrb-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="rdrb-styled-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('Mathematical Formula')}`} kind="formula">
        <div className="rdrb-formula-box">
          <strong>{t('Mathematical Formula')}:</strong>
          <code itemProp="description">
            {t('Overlap Window: BPR_Low = max(FVG1_Low, FVG2_Low) · BPR_High = min(FVG1_High, FVG2_High)')} ·{' '}
            {t('Midpoint: BPR_50% = (BPR_Low + BPR_High) ÷ 2 (valid when BPR_Low < BPR_High)')}
          </code>
        </div>
      </LessonExtract>

      <nav className="rdrb-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <span className="rdrb-toc-summary-left">
              <Bookmark size={16} aria-hidden="true" />
              <span>{t('On this page')}</span>
            </span>
            <span className="rdrb-toc-badge">
              <span>
                <bdi>{lesson.sections.length}</bdi> {t('sections')} · {t('Show section links')}
              </span>
              <ChevronDown size={15} className="rdrb-toc-chevron" aria-hidden="true" />
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
            className="rr-text-section fvg-document-section rdrb-section"
          >
            <SectionHeading iconName={sec.icon} title={t(sec.title)} />
            {sec.blocks.map((block, bIdx) =>
              renderBlock(block, `s${sec.number}-b${bIdx}`, sec.title, sec.number === 24),
            )}

            {visuals.map((kind) => (
              <RdrbVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}

            {sec.number === 22 && (
              <div className="rdrb-interactive-check" role="group" aria-label={t('Pre-Execution Checklist')}>
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
                <p className="rdrb-check-status">
                  {t('Checklist items confirmed')}: <span className="rdrb-num">{completedCount}/6</span>{' '}
                  {completedCount === 6
                    ? `— ${t('Checklist complete — BPR overlap, sweep origin, MSS, PD context, session timing, and far-edge invalidation are documented.')}`
                    : `— ${t('Confirm all 6 criteria before classifying a studied overlap as a qualified BPR or RDRB setup.')}`}
                </p>
              </div>
            )}

            {sec.number === 24 && (
              <aside className="rdrb-sources-box" aria-label={t('Sources & Institutional References')}>
                <h3>{t('Sources & Institutional References')}</h3>
                <ul>
                  {rdrbSources.map((src) => (
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

            {sec.number === 25 && (
              <div className="fvg-faq" id="rdrb-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`rdrb-faq-${fi}`}
                    group="rdrb-faq"
                    className="fvg-faq-card"
                    question={t(faq.question)}
                  >
                    <p>{linkifyText(t(faq.answer), href, urlCount, 1)}</p>
                  </LessonFaq>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function RdrbRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    {
      label: 'Study Fair Value Gaps (FVG & 50% CE)',
      url: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/',
    },
    {
      label: 'Compare Inverse Fair Value Gaps (IFVG)',
      url: '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/',
    },
    {
      label: 'Master Premium & Discount (PD Array Matrix)',
      url: '/learn/ict-pd-array-selection-price-delivery-continuum/',
    },
    {
      label: 'Connect Optimal Trade Entry (OTE) 0.62–0.79',
      url: '/learn/optimal-trade-entry-ote/',
    },
    {
      label: 'Explore Order Blocks (OB) & Mitigation',
      url: '/learn/order-blocks-ob-and-mitigation/',
    },
    {
      label: 'Study Breaker Blocks & Unicorn Structure',
      url: '/learn/breaker-blocks-trading-failed-order-blocks/',
    },
    {
      label: 'Compare BPR vs. RDRB Side-by-Side',
      url: '/tools/compare/bpr-vs-rdrb/',
    },
    {
      label: 'Practice in the RDRB Chart Lab Module',
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
