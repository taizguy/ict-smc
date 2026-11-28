import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Calculator,
  CheckSquare,
  ChevronDown,
  Clock,
  Compass,
  Crosshair,
  GitCompare,
  HelpCircle,
  Info,
  Layers,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import {
  turtleSoupDocument as lesson,
  turtleSoupPath,
  turtleSoupSources,
  type TurtleSoupBlock,
} from '../data/chapters/turtleSoupLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { TurtleSoupVisual, type TurtleSoupVisualKind } from './TurtleSoupVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  compass: Compass,
  'book-open': BookOpen,
  sparkles: Sparkles,
  layers: Layers,
  'play-circle': PlayCircle,
  calculator: Calculator,
  clock: Clock,
  'git-compare': GitCompare,
  crosshair: Crosshair,
  'alert-triangle': AlertTriangle,
  'check-square': CheckSquare,
  info: Info,
  'help-circle': HelpCircle,
};

const sectionVisuals: Record<number, TurtleSoupVisualKind[]> = {
  1: ['ts-comic-intro'],
  2: ['ts-origin-compare'],
  3: ['ts-3d-trap'],
  4: ['ts-rejection-anatomy'],
  5: ['ts-sequence-sim'],
  6: ['ts-calculator'],
  7: ['ts-killzone-clock'],
  8: ['ts-lrlr-gauntlet'],
  9: ['ts-blueprints'],
  10: ['ts-mistakes-comic'],
  11: ['ts-checklist-meter'],
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'FVGs', 'فیئر ویلیو گیپ'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Order Block', 'Order Blocks', 'آرڈر بلاک', 'آرڈر بلاکس'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Breaker Block', 'Breaker Blocks', 'بریکر بلاک', 'بریکر بلاکس'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Draw on Liquidity', 'DOL'], '/learn/draw-on-liquidity/'],
  [['Chart Lab', 'چارٹ لیب'], '/tools/chartlab/'],
];

const interactiveChecklistItems = [
  'Labeled Reference Session Origin (ETH Overnight vs. RTH vs. HTF)',
  'Waited for Excursion Beyond Reference Extreme AND Rejection Back Inside',
  'Separated Rejection Block Body Midpoint from Full-Wick Midpoint',
  'Confirmed Departure & LTF Structure Shift Before Framing Deferred Return',
  'Evaluated Return Path Resistance (LRLR vs. HRLR) & Opposing Targets',
  'Defined Close-Based Invalidation Past Sweep Wick & Exact Tick/Pip Risk',
];

function linkifyText(
  text: string,
  href: (p: string) => string,
  urlCount: Map<string, number>,
  maxLinks = 2,
): React.ReactNode {
  const matches: Array<{ start: number; end: number; url: string; raw: string }> = [];
  for (const [terms, url] of contextTerms) {
    if (url === turtleSoupPath) continue;
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
  if (!selected.length) return text;

  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  selected.forEach((m, idx) => {
    urlCount.set(m.url, (urlCount.get(m.url) || 0) + 1);
    if (m.start > cursor) nodes.push(text.slice(cursor, m.start));
    nodes.push(
      <a key={`ctx-${idx}-${m.url}`} className="fvg-context-link" href={href(m.url)}>
        {m.raw}
      </a>,
    );
    cursor = m.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export function TurtleSoupContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const [checked, setChecked] = useState<boolean[]>(interactiveChecklistItems.map(() => false));
  const urlCount = new Map<string, number>();
  const completedCount = checked.filter(Boolean).length;

  const renderBlock = (block: TurtleSoupBlock, key: string, preserveVerbatim = false) => {
    if (block.type === 'paragraph' && block.text) {
      return <p key={key}>{preserveVerbatim ? t(block.text) : linkifyText(t(block.text), href, urlCount)}</p>;
    }
    if (block.type === 'callout' && block.text) {
      return (
        <div key={key} className="ts-callout">
          {block.title && (
            <div className="ts-callout-head">
              <Info size={16} aria-hidden="true" />
              <strong>{t(block.title)}</strong>
            </div>
          )}
          <p>{linkifyText(t(block.text), href, urlCount)}</p>
        </div>
      );
    }
    if (block.type === 'table' && block.rows) {
      const [header, ...rows] = block.rows;
      return (
        <div key={key} className="fvg-table-scroll">
          <table>
            <thead>
              <tr>
                {header.map((cell, idx) => (
                  <th key={idx} scope="col">{t(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) =>
                    cIdx === 0 ? <th key={cIdx} scope="row">{t(cell)}</th> : <td key={cIdx}>{t(cell)}</td>,
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

  return (
    <div className="fvg-document ts-document">
      <section className="fvg-takeaways" aria-labelledby="ts-takeaways-heading">
        <h2 id="ts-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="ts-styled-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('Rejection Block Arithmetic Formula')}`} kind="formula">
        <div className="ts-formula-box">
          <strong>{t('Rejection Block Arithmetic Formula')}:</strong>
          <code itemProp="description">
            {t('Body Midpoint = (Open/Close Boundary + Reference Extreme) ÷ 2 (e.g., 110.5)')} ·{' '}
            {t('Full-Wick Midpoint = (Wick Extreme + Reference Extreme) ÷ 2 (e.g., 111.0)')}
          </code>
        </div>
      </LessonExtract>

      <nav className="ts-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <span className="ts-toc-summary-left">
              <Bookmark size={16} aria-hidden="true" />
              <span>{t('On this page')}</span>
            </span>
            <span className="ts-toc-badge">
              <span>
                <bdi>{lesson.sections.length}</bdi> {t('sections')} · {t('Show section links')}
              </span>
              <ChevronDown size={15} aria-hidden="true" />
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
        const Icon = iconMap[sec.icon] || BookOpen;
        const visuals = sectionVisuals[sec.number] || [];
        return (
          <section
            key={sec.number}
            id={`rr-section-${idx}`}
            className="rr-text-section fvg-document-section ts-section"
          >
            <h2 className="ts-sec-head">
              <span className="ts-sec-icon" aria-hidden="true">
                <Icon size={17} />
              </span>
              <span>{t(sec.title)}</span>
            </h2>
            {sec.blocks.map((block, bIdx) => renderBlock(block, `s${sec.number}-b${bIdx}`, sec.number >= 2 && sec.number <= 9))}
            {visuals.map((kind) => (
              <TurtleSoupVisual key={kind} kind={kind} staticOnly={staticOnly} checkedCount={completedCount} />
            ))}
            {sec.number === 11 && (
              <div className="ts-interactive-check" role="group" aria-label={t('Pre-Execution Turtle Soup Checklist')}>
                {interactiveChecklistItems.map((item, cIdx) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={checked[cIdx]}
                      onChange={() => setChecked((prev) => prev.map((v, i) => (i === cIdx ? !v : v)))}
                    />
                    <span>{t(item)}</span>
                  </label>
                ))}
                <p className="ts-check-status">
                  {t('Checklist items confirmed')}: {completedCount}/6{' '}
                  {completedCount === 6
                    ? `— ${t('All six sweep, rejection-block, ETH/RTH, and invalidation gates verified.')}`
                    : `— ${t('Confirm all 6 gates before classifying a sweep as a Turtle Soup study.')}`}
                </p>
              </div>
            )}
            {sec.number === 12 && (
              <div className="fvg-faq" id="turtle-soup-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`ts-faq-${fi}`}
                    group="ts-faq"
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

export function TurtleSoupRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    { label: 'Study Higher-Timeframe Liquidity Maps', url: '/learn/htf-liquidity-maps/' },
    { label: 'Explore Draw on Liquidity (DOL)', url: '/learn/draw-on-liquidity/' },
    { label: 'Study Order Blocks & Mitigation', url: '/learn/order-blocks-ob-and-mitigation/' },
    { label: 'Study Breaker Blocks & Unicorn Structure', url: '/learn/breaker-blocks-trading-failed-order-blocks/' },
    { label: 'Practice in the Guided Chart Lab', url: '/tools/chartlab/' },
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
