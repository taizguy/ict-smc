import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
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
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import {
  pdArrayDocument as lesson,
  pdArrayPath,
  pdArraySources,
  type PdArrayBlock,
} from '../data/chapters/pdArrayLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { PdArrayVisual, type PdArrayVisualKind } from './PdArrayVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  users: Users,
  'book-open': BookOpen,
  layers: Layers,
  compass: Compass,
  'sliders-horizontal': SlidersHorizontal,
  clock: Clock,
  'trending-down': TrendingDown,
  'trending-up': TrendingUp,
  'git-compare': GitCompare,
  crosshair: Crosshair,
  activity: Activity,
  zap: Zap,
  'check-square': CheckSquare,
  'alert-triangle': AlertTriangle,
  bookmark: Bookmark,
  info: Info,
  'help-circle': HelpCircle,
  'shield-alert': ShieldAlert,
};

const sectionVisuals: Record<number, PdArrayVisualKind[]> = {
  1: ['pd-comic-intro'],
  3: ['pd-matrix-3d-cinema'],
  5: ['pd-dealing-range-calculator'],
  7: ['pd-hierarchy-stack'],
  10: ['pd-gap-variants-dissection'],
  14: ['pd-continuum-flow'],
  16: ['pd-confluence-grader'],
  17: ['pd-mtf-nesting'],
  21: ['pd-mistakes-comic'],
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'FVGs', 'BISI', 'SIBI', 'Consequent Encroachment', 'فیئر ویلیو گیپ', 'فیئر ویلیو گیپس'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Order Block', 'Order Blocks', 'Mean Threshold', 'آرڈر بلاک', 'آرڈر بلاکس'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Breaker Block', 'Breaker Blocks', 'بریکر بلاک', 'بریکر بلاکس'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Optimal Trade Entry', 'OTE', 'آپٹیمل ٹریڈ انٹری'], '/learn/optimal-trade-entry-ote/'],
  [['Balanced Price Range', 'BPR', 'RDRB'], '/learn/rdrb-balanced-price-range-and-enigma-fvg/'],
  [['Inverse Fair Value Gap', 'Inverse FVG', 'IFVG'], '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/'],
  [['Market Structure Shift', 'MSS'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Buy-Side Liquidity', 'Sell-Side Liquidity', 'Draw on Liquidity', 'BSL', 'SSL'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Dealing Range', 'External Range Liquidity', 'Internal Range Liquidity'], '/learn/internal-vs-external-structure/'],
  [['Killzone', 'Killzones', 'London', 'New York'], '/learn/time-and-session-liquidity-the-global-clock/'],
  [['NWOG', 'NDOG', 'Midnight Open'], '/learn/ict-midnight-opening-range-rth-gaps-nwog/'],
  [['Chart Lab', 'چارٹ لیب'], '/tools/chartlab/'],
];

const highlightPhrases = [
  '50% Equilibrium',
  '(Range_High + Range_Low) ÷ 2',
  'Consequent Encroachment (CE)',
  'Mean Threshold (MT)',
  'Internal Range Liquidity',
  'External Range Liquidity',
  'Suspension Block',
  '50% ایکویلیبریم',
];

const interactiveChecklistItems = [
  'Completed Dealing Range anchors (Swing Low 0% and Swing High 100%) frozen before reviewing entries',
  'Price sits strictly inside Discount (<50%) for longs or Premium (>50%) for shorts',
  'Clear opposing External Liquidity pool (BSL or SSL) stands open across the range',
  'Unmitigated PD Array identified with explicit CE (50% gap) or MT (50% body) boundary',
  'Active London or New York session liquidity verified in America/New_York time',
  'Lower-timeframe shift (MSS / CISD) observed with fixed invalidation beyond extreme anchor',
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
    if (url === pdArrayPath) continue;
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
    <h2 className="pd-sec-head">
      <span className="pd-sec-icon" aria-hidden="true">
        <Icon size={17} />
      </span>
      <span>{title}</span>
    </h2>
  );
}

export function PdArrayContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const [checked, setChecked] = useState<boolean[]>(interactiveChecklistItems.map(() => false));
  const urlCount = new Map<string, number>();

  const renderBlock = (block: PdArrayBlock, key: string, secTitle: string, preserveVerbatim = false) => {
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
          className={`pd-callout ${block.tone === 'warn' ? 'pd-callout-warn' : ''}`}
        >
          {block.title && (
            <div className="pd-callout-head">
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
        <Tag key={key} className="pd-styled-list">
          {block.items.map((item, idx) => (
            <li key={`${key}-${idx}`}>{linkifyText(t(item), href, urlCount)}</li>
          ))}
        </Tag>
      );
    }
    if (block.type === 'table' && block.rows) {
      const [header, ...rows] = block.rows;
      return (
        <div className="pd-table-scroll" role="region" tabIndex={0} aria-label={t(secTitle)} key={key}>
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
    <div className="fvg-document pd-document">
      <section className="fvg-takeaways" aria-labelledby="pd-takeaways-heading">
        <h2 id="pd-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="pd-styled-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('Mathematical Formula')}`} kind="formula">
        <div className="pd-formula-box">
          <strong>{t('Mathematical Formula')}:</strong>
          <code itemProp="description">
            {t('Equilibrium (50%) = (Range_High + Range_Low) ÷ 2 · Q1 Deep Discount = 0%–25% · Q4 Deep Premium = 75%–100%')}
          </code>
        </div>
      </LessonExtract>

      <nav className="pd-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <span className="pd-toc-summary-left">
              <Bookmark size={16} aria-hidden="true" />
              <span>{t('On this page')}</span>
            </span>
            <span className="pd-toc-badge">
              <span>
                <bdi>{lesson.sections.length}</bdi> {t('sections')} · {t('Show section links')}
              </span>
              <ChevronDown size={15} className="pd-toc-chevron" aria-hidden="true" />
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
            className="rr-text-section fvg-document-section pd-section"
          >
            <SectionHeading iconName={sec.icon} title={t(sec.title)} />
            {sec.blocks.map((block, bIdx) =>
              renderBlock(block, `s${sec.number}-b${bIdx}`, sec.title, sec.number === 24),
            )}

            {visuals.map((kind) => (
              <PdArrayVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}

            {sec.number === 22 && (
              <div className="pd-interactive-check" role="group" aria-label={t('Pre-Execution Checklist')}>
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
                <p className="pd-check-status">
                  {t('Checklist items confirmed')}: <span className="pd-num">{completedCount}/6</span>{' '}
                  {completedCount === 6
                    ? `— ${t('Checklist complete — anchors, range half, opposing draw, array refinement, session clock, and LTF trigger are documented.')}`
                    : `— ${t('Confirm all 6 gates before classifying any PD Array location as a qualified setup.')}`}
                </p>
              </div>
            )}

            {sec.number === 24 && (
              <aside className="pd-sources-box" aria-label={t('Sources & Institutional References')}>
                <h3>{t('Sources & Institutional References')}</h3>
                <ul>
                  {pdArraySources.map((src) => (
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
              <div className="fvg-faq" id="pd-array-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`pd-array-faq-${fi}`}
                    group="pd-array-faq"
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

export function PdArrayRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    {
      label: 'Connect Optimal Trade Entry (OTE) 0.62–0.79',
      url: '/learn/optimal-trade-entry-ote/',
    },
    {
      label: 'Explore Balanced Price Range (BPR & RDRB)',
      url: '/learn/rdrb-balanced-price-range-and-enigma-fvg/',
    },
    {
      label: 'Study Fair Value Gaps (FVG & 50% CE)',
      url: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/',
    },
    {
      label: 'Explore Order Blocks (OB & Mean Threshold)',
      url: '/learn/order-blocks-ob-and-mitigation/',
    },
    {
      label: 'Study Breaker Blocks & Failed OBs',
      url: '/learn/breaker-blocks-trading-failed-order-blocks/',
    },
    {
      label: 'Master Internal vs. External Structure',
      url: '/learn/internal-vs-external-structure/',
    },
    {
      label: 'Study Midnight Opening Range, RTH & NWOG',
      url: '/learn/ict-midnight-opening-range-rth-gaps-nwog/',
    },
    {
      label: 'Practice Recognition in the Chart Lab',
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
