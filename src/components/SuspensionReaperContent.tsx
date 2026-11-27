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
  suspensionReaperDocument as lesson,
  suspensionReaperPath,
  suspensionReaperSources,
  type SuspensionReaperBlock,
} from '../data/chapters/suspensionReaperLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import {
  SuspensionReaperVisual,
  type SuspensionReaperVisualKind,
} from './SuspensionReaperVisual';

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

const sectionVisuals: Record<number, SuspensionReaperVisualKind[]> = {
  1: ['sr-comic-intro'],
  3: ['sr-3d-motion-cinema'],
  5: ['sr-dual-vi-calculator'],
  7: ['sr-taxonomy-matrix'],
  9: ['sr-reaper-sequence-lab'],
  13: ['sr-contract-calibration-lab'],
  14: ['sr-confluence-grader'],
  15: ['sr-mtf-nesting'],
  20: ['sr-mistakes-comic'],
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'FVGs', 'BISI', 'SIBI', 'Consequent Encroachment', 'فیئر ویلیو گیپ', 'فیئر ویلیو گیپس'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Inverse Fair Value Gap', 'Inverse Fair Value Gaps', 'Inverse FVG', 'IFVG', 'انورس فیئر ویلیو گیپ', 'انورس FVG'], '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/'],
  [['Balanced Price Range', 'BPR', 'RDRB'], '/learn/rdrb-balanced-price-range-and-enigma-fvg/'],
  [['PD Array Matrix', 'PD Array', 'Premium', 'Discount', 'Equilibrium'], '/learn/ict-pd-array-selection-price-delivery-continuum/'],
  [['Optimal Trade Entry', 'OTE', 'آپٹیمل ٹریڈ انٹری'], '/learn/optimal-trade-entry-ote/'],
  [['Order Block', 'Order Blocks', 'Propulsion Block', 'آرڈر بلاک', 'آرڈر بلاکس'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Breaker Block', 'Breaker Blocks', 'Unicorn', 'بریکر بلاک', 'بریکر بلاکس', 'یونیکارن'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Liquidity Sweep', 'Buy-Side Liquidity', 'Sell-Side Liquidity', 'BSL', 'SSL'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Killzone', 'Killzones', 'London Open', 'New York AM'], '/learn/time-and-session-liquidity-the-global-clock/'],
  [['NWOG', 'NDOG'], '/learn/opening-gap-matrices-ndog-nwog-csod/'],
  [['Displacement', 'ڈسپلیسمنٹ'], '/learn/why-candles-form-and-how-displacement-arises/'],
  [['CPI', 'FOMC', 'NFP'], '/learn/ict-news-volatility-no-trade-framework/'],
  [['Chart Lab', 'چارٹ لیب'], '/tools/chartlab/'],
];

const highlightPhrases = [
  'bodyLow(C2) > bodyHigh(C1)',
  'bodyLow(C3) > bodyHigh(C2)',
  'bodyHigh(C2) < bodyLow(C1)',
  'bodyHigh(C3) < bodyLow(C2)',
  'max(IFVG_Low, FVG2_Low)',
  'min(IFVG_High, FVG2_High)',
  'Volume Imbalance',
  'Suspension Block',
  'Reaper FVG',
];

const interactiveChecklistItems = [
  'Verified Dual Body-to-Body Separation (VI-1 and VI-2 around Candle 2) or Confirmed Nested IFVG + Opposing FVG Overlap',
  'Distinguished True Suspension Geometry from a Plain Single-Candle Order Block or Ordinary Failed IFVG',
  'Calibrated All Gap Coordinates Directly on the Active Front-Month Delivery Contract (Zero Unadjusted Continuous Copy)',
  'Anchored Study to Stated America/New_York Active Session Window (London Open or NY AM/PM)',
  'Defined Structural Close-Based Invalidation Past Outer VI-1 Edge or Swept Breaker Extreme Before Entry',
  'Calculated Exact Tick Depth, Commission/Spread Impact, and Account-Size Risk Limit Prior to Order Placement',
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
        <mark key={`m-${keyCounter++}`} className="fvg-mark sr-mark">
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
    if (url === suspensionReaperPath) continue;
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
    <h2 className="sr-sec-head">
      <span className="sr-sec-icon" aria-hidden="true">
        <Icon size={17} />
      </span>
      <span>{title}</span>
    </h2>
  );
}

export function SuspensionReaperContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const [checked, setChecked] = useState<boolean[]>(interactiveChecklistItems.map(() => false));
  const urlCount = new Map<string, number>();

  const renderBlock = (
    block: SuspensionReaperBlock,
    key: string,
    secTitle: string,
    preserveVerbatim = false,
  ) => {
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
          className={`sr-callout ${block.tone === 'warn' ? 'sr-callout-warn' : ''}`}
        >
          {block.title && (
            <div className="sr-callout-head">
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
        <Tag key={key} className="sr-styled-list">
          {block.items.map((item, idx) => (
            <li key={`${key}-${idx}`}>{linkifyText(t(item), href, urlCount)}</li>
          ))}
        </Tag>
      );
    }
    if (block.type === 'table' && block.rows) {
      const [header, ...rows] = block.rows;
      return (
        <div className="sr-table-scroll" role="region" tabIndex={0} aria-label={t(secTitle)} key={key}>
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
    <div className="fvg-document sr-document">
      <section className="fvg-takeaways" aria-labelledby="sr-takeaways-heading">
        <h2 id="sr-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="sr-styled-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('Mathematical Formula')}`} kind="formula">
        <div className="sr-formula-box">
          <strong>{t('Mathematical Formula')}:</strong>
          <code itemProp="description">
            {t('Bullish Suspension: bodyLow(C2) > bodyHigh(C1) AND bodyLow(C3) > bodyHigh(C2)')} ·{' '}
            {t('Bearish Suspension: bodyHigh(C2) < bodyLow(C1) AND bodyHigh(C3) < bodyLow(C2)')} ·{' '}
            {t('Reaper Overlap: [max(IFVG_Low, FVG2_Low), min(IFVG_High, FVG2_High)]')}
          </code>
        </div>
      </LessonExtract>

      <nav className="sr-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <span className="sr-toc-summary-left">
              <Bookmark size={16} aria-hidden="true" />
              <span>{t('On this page')}</span>
            </span>
            <span className="sr-toc-badge">
              <span>
                <bdi>{lesson.sections.length}</bdi> {t('sections')} · {t('Show section links')}
              </span>
              <ChevronDown size={15} className="sr-toc-chevron" aria-hidden="true" />
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
            className="rr-text-section fvg-document-section sr-section"
          >
            <SectionHeading iconName={sec.icon} title={t(sec.title)} />
            {sec.blocks.map((block, bIdx) =>
              renderBlock(block, `s${sec.number}-b${bIdx}`, sec.title, sec.number === 24),
            )}

            {visuals.map((kind) => (
              <SuspensionReaperVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}

            {sec.number === 22 && (
              <div className="sr-interactive-check" role="group" aria-label={t('Pre-Execution Checklist')}>
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
                <p className="sr-check-status">
                  {t('Checklist items confirmed')}: <span className="sr-num">{completedCount}/6</span>{' '}
                  {completedCount === 6
                    ? `— ${t('All six structural, delivery-contract, session-window, and stop-invalidation rules verified.')}`
                    : `— ${t('Confirm all 6 gates before classifying any chart sequence as a qualified Suspension Block or Reaper FVG study.')}`}
                </p>
              </div>
            )}

            {sec.number === 24 && (
              <aside className="sr-sources-box" aria-label={t('Sources & Institutional References')}>
                <h3>{t('Sources & Institutional References')}</h3>
                <ul>
                  {suspensionReaperSources.map((src) => (
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
              <div className="fvg-faq" id="suspension-reaper-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`sr-faq-${fi}`}
                    group="sr-faq"
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

export function SuspensionReaperRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    {
      label: 'Study Fair Value Gaps (FVG & 50% CE)',
      url: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/',
    },
    {
      label: 'Master Inverse Fair Value Gaps (IFVG)',
      url: '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/',
    },
    {
      label: 'Compare Balanced Price Ranges (RDRB & Enigma)',
      url: '/learn/rdrb-balanced-price-range-and-enigma-fvg/',
    },
    {
      label: 'Master Premium & Discount (PD Array Matrix)',
      url: '/learn/ict-pd-array-selection-price-delivery-continuum/',
    },
    {
      label: 'Study Breaker Blocks & Unicorn Structure',
      url: '/learn/breaker-blocks-trading-failed-order-blocks/',
    },
    {
      label: 'Explore Order Blocks & Propulsion Mitigation',
      url: '/learn/order-blocks-ob-and-mitigation/',
    },
    {
      label: 'Compare Optimal Trade Entry (OTE) 0.62–0.79',
      url: '/learn/optimal-trade-entry-ote/',
    },
    {
      label: 'Practice in the Guided Chart Lab',
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
