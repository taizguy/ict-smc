import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpDown,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Calculator,
  CheckSquare,
  ChevronDown,
  Clock,
  Compass,
  Crosshair,
  Equal,
  GitCompare,
  HelpCircle,
  Info,
  Layers,
  Map as MapIcon,
  Palette,
  PlayCircle,
  Repeat,
  Scale,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  htfLiquidityDocument as lesson,
  htfLiquidityPath,
  htfLiquiditySources,
  type HtfLiquidityBlock,
} from '../data/chapters/htfLiquidityLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { HtfLiquidityVisual, type HtfLiquidityVisualKind } from './HtfLiquidityVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  compass: Compass,
  layers: Layers,
  sparkles: Sparkles,
  'bar-chart-3': Activity,
  map: MapIcon,
  target: Target,
  equal: Equal,
  repeat: Repeat,
  'git-compare': GitCompare,
  activity: Activity,
  'play-circle': PlayCircle,
  crosshair: Crosshair,
  calculator: Calculator,
  clock: Clock,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  scale: Scale,
  'shield-alert': ShieldAlert,
  'alert-triangle': AlertTriangle,
  palette: Palette,
  'arrow-up-down': ArrowUpDown,
  'check-square': CheckSquare,
  'book-open': BookOpen,
  info: Info,
  'help-circle': HelpCircle,
};

const sectionVisuals: Record<number, HtfLiquidityVisualKind[]> = {
  1: ['hlm-comic-intro'],
  3: ['hlm-3d-atlas'],
  5: ['hlm-hierarchy-atlas'],
  9: ['hlm-irl-erl-cycle'],
  11: ['hlm-sequence-simulator'],
  13: ['hlm-target-calculator'],
  19: ['hlm-mistakes-comic'],
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'FVGs', 'فیئر ویلیو گیپ', 'فیئر ویلیو گیپس'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Liquidity Sweep', 'Buy-Side Liquidity', 'Sell-Side Liquidity', 'BSL', 'SSL'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['PD Array', 'Premium', 'Discount', 'Equilibrium'], '/learn/ict-pd-array-selection-price-delivery-continuum/'],
  [['Killzone', 'Killzones', 'London Open', 'New York AM'], '/learn/time-and-session-liquidity-the-global-clock/'],
  [['Chart Lab', 'چارٹ لیب'], '/tools/chartlab/'],
];

const interactiveChecklistItems = [
  'Marked Monthly (PMH/PML) and Weekly (PWH/PWL) Macro Boundaries',
  'Plotted Daily (PDH/PDL) and Active 4H Swing Dealing Range',
  'Highlighted Equal Highs/Lows (EQH/EQL) and Stacked Confluences',
  'Identified Current IRL ↔ ERL Phase & 50% Equilibrium Zone',
  'Aligned Target Window with London Open or NY AM/PM Killzone',
  'Defined Close-Based Invalidation & Exact Tick/Pip Risk Before Entry',
];

function linkifyText(
  text: string,
  href: (p: string) => string,
  urlCount: Map<string, number>,
  maxLinks = 2,
): React.ReactNode {
  const matches: Array<{ start: number; end: number; url: string; raw: string }> = [];
  for (const [terms, url] of contextTerms) {
    if (url === htfLiquidityPath) continue;
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

export function HtfLiquidityContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const [checked, setChecked] = useState<boolean[]>(interactiveChecklistItems.map(() => false));
  const urlCount = new Map<string, number>();

  const renderBlock = (block: HtfLiquidityBlock, key: string) => {
    if (block.type === 'paragraph' && block.text) {
      return <p key={key}>{linkifyText(t(block.text), href, urlCount)}</p>;
    }
    if (block.type === 'callout' && block.text) {
      return (
        <div key={key} className={`hlm-callout ${block.tone === 'warn' ? 'hlm-callout-warn' : ''}`}>
          {block.title && (
            <div className="hlm-callout-head">
              {block.tone === 'warn' ? <AlertTriangle size={16} aria-hidden="true" /> : <Info size={16} aria-hidden="true" />}
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
        <Tag key={key} className="hlm-styled-list">
          {block.items.map((item, idx) => (
            <li key={`${key}-${idx}`}>{linkifyText(t(item), href, urlCount)}</li>
          ))}
        </Tag>
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
                    cIdx === 0 ? (
                      <th key={cIdx} scope="row">{t(cell)}</th>
                    ) : (
                      <td key={cIdx}>{t(cell)}</td>
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
    <div className="fvg-document hlm-document">
      <section className="fvg-takeaways" aria-labelledby="hlm-takeaways-heading">
        <h2 id="hlm-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="hlm-styled-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('HTF Equilibrium Formula')}`} kind="formula">
        <div className="hlm-formula-box">
          <strong>{t('HTF Equilibrium Formula')}:</strong>
          <code itemProp="description">
            {t('Equilibrium (50%) = Range Low + 0.50 × (Range High − Range Low)')} ·{' '}
            {t('Discount (< 50%) → Seek SSL Sweep / IRL to ERL Buy')} ·{' '}
            {t('Premium (> 50%) → Seek BSL Sweep / IRL to ERL Sell')}
          </code>
        </div>
      </LessonExtract>

      <nav className="hlm-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <span className="hlm-toc-summary-left">
              <Bookmark size={16} aria-hidden="true" />
              <span>{t('On this page')}</span>
            </span>
            <span className="hlm-toc-badge">
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
            className="rr-text-section fvg-document-section hlm-section"
          >
            <h2 className="hlm-sec-head">
              <span className="hlm-sec-icon" aria-hidden="true">
                <Icon size={17} />
              </span>
              <span>{t(sec.title)}</span>
            </h2>
            {sec.blocks.map((block, bIdx) => renderBlock(block, `s${sec.number}-b${bIdx}`))}
            {visuals.map((kind) => (
              <HtfLiquidityVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}
            {sec.number === 22 && (
              <div className="hlm-interactive-check" role="group" aria-label={t('Pre-Session HTF Mapping Checklist')}>
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
                <p className="hlm-check-status">
                  {t('Checklist items confirmed')}: {completedCount}/6{' '}
                  {completedCount === 6
                    ? `— ${t('All six HTF mapping, killzone, and invalidation gates verified.')}`
                    : `— ${t('Confirm all 6 gates before relying on an HTF liquidity target.')}`}
                </p>
              </div>
            )}
            {sec.number === 23 && (
              <div className="fvg-faq" id="htf-liquidity-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`hlm-faq-${fi}`}
                    group="hlm-faq"
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

export function HtfLiquidityRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    { label: 'Study Liquidity Sweeps & Engineering', url: '/learn/liquidity-engineering-and-liquidity-runs/' },
    { label: 'Master Fair Value Gaps (IRL Rebalance)', url: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/' },
    { label: 'Master Premium & Discount (PD Array Matrix)', url: '/learn/ict-pd-array-selection-price-delivery-continuum/' },
    { label: 'Study Time & Session Killzones', url: '/learn/time-and-session-liquidity-the-global-clock/' },
    { label: 'Practice in the Guided Chart Lab', url: '/tools/chartlab/' },
  ];
  return (
    <nav className="rr-related-reading" aria-label={t('Continue Studying')}>
      <h2>{t('Continue Studying')}</h2>
      <ul>
        {links.map((item) => (
          <li key={item.url}>
            <a className="fvg-context-link" href={href(item.url)}>
              <span>{t(item.label)}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
