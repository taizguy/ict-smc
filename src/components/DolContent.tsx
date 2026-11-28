import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpDown,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Briefcase,
  Calculator,
  CheckSquare,
  ChevronDown,
  Clock,
  Compass,
  Crosshair,
  GitBranch,
  GitCompare,
  HelpCircle,
  Info,
  Layers,
  Repeat,
  Scale,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react';
import {
  drawOnLiquidityDocument as lesson,
  drawOnLiquidityPath,
  drawOnLiquiditySources,
  type DolBlock,
} from '../data/chapters/drawOnLiquidityLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { DolVisual, type DolVisualKind } from './DolVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  compass: Compass,
  target: Target,
  sparkles: Sparkles,
  layers: Layers,
  'git-branch': GitBranch,
  repeat: Repeat,
  zap: Zap,
  activity: Activity,
  scale: Scale,
  'shield-alert': ShieldAlert,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  calculator: Calculator,
  crosshair: Crosshair,
  clock: Clock,
  'git-compare': GitCompare,
  'alert-triangle': AlertTriangle,
  briefcase: Briefcase,
  'arrow-up-down': ArrowUpDown,
  'check-square': CheckSquare,
  'book-open': BookOpen,
  info: Info,
  'help-circle': HelpCircle,
};

const sectionVisuals: Record<number, DolVisualKind[]> = {
  1: ['dol-comic-intro'],
  3: ['dol-3d-compass'],
  5: ['dol-decision-tree'],
  8: ['dol-erl-vs-irl-tug'],
  12: ['dol-priority-scorer'],
  19: ['dol-mistakes-comic'],
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'FVGs', 'فیئر ویلیو گیپ', 'فیئر ویلیو گیپس'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Higher-Timeframe Liquidity', 'HTF Liquidity', 'ہائر ٹائم فریم لیکویڈیٹی'], '/learn/htf-liquidity-maps/'],
  [['Liquidity Sweep', 'Buy-Side Liquidity', 'Sell-Side Liquidity', 'BSL', 'SSL'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['PD Array', 'PD Arrays', 'Premium', 'Discount'], '/learn/ict-pd-array-selection-price-delivery-continuum/'],
  [['Chart Lab', 'چارٹ لیب'], '/tools/chartlab/'],
];

const interactiveChecklistItems = [
  'Established Weekly & Daily Bias from Higher-Timeframe Liquidity Map',
  'Identified Nearest Un-Swept External Pool (EQH/EQL, PDH/PDL, PWH/PWL)',
  'Checked for Unmitigated Internal Barriers (4H/1H FVG or OB) Along Path',
  'Confirmed Active Direction with Energetic Displacement & MSS/BOS',
  'Verified LRLR Path Clarity & London/NY Killzone Timing',
  'Set Close-Based Invalidation & Partial/Runner Plan Before Entry',
];

function linkifyText(
  text: string,
  href: (p: string) => string,
  urlCount: Map<string, number>,
  maxLinks = 2,
): React.ReactNode {
  const matches: Array<{ start: number; end: number; url: string; raw: string }> = [];
  for (const [terms, url] of contextTerms) {
    if (url === drawOnLiquidityPath) continue;
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

export function DolContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const [checked, setChecked] = useState<boolean[]>(interactiveChecklistItems.map(() => false));
  const urlCount = new Map<string, number>();

  const renderBlock = (block: DolBlock, key: string) => {
    if (block.type === 'paragraph' && block.text) {
      return <p key={key}>{linkifyText(t(block.text), href, urlCount)}</p>;
    }
    if (block.type === 'callout' && block.text) {
      return (
        <div key={key} className={`dol-callout ${block.tone === 'warn' ? 'dol-callout-warn' : ''}`}>
          {block.title && (
            <div className="dol-callout-head">
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
        <Tag key={key} className="dol-styled-list">
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
    <div className="fvg-document dol-document">
      <section className="fvg-takeaways" aria-labelledby="dol-takeaways-heading">
        <h2 id="dol-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="dol-styled-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('DOL Target Selection Formula')}`} kind="formula">
        <div className="dol-formula-box">
          <strong>{t('DOL Target Selection Formula')}:</strong>
          <code itemProp="description">
            {t('After ERL Sweep → Target Internal IRL (FVG / OB)')} ·{' '}
            {t('After IRL Bounce + Displacement → Target Opposing ERL (EQH / PDH / PWH)')}
          </code>
        </div>
      </LessonExtract>

      <nav className="dol-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <span className="dol-toc-summary-left">
              <Bookmark size={16} aria-hidden="true" />
              <span>{t('On this page')}</span>
            </span>
            <span className="dol-toc-badge">
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
            className="rr-text-section fvg-document-section dol-section"
          >
            <h2 className="dol-sec-head">
              <span className="dol-sec-icon" aria-hidden="true">
                <Icon size={17} />
              </span>
              <span>{t(sec.title)}</span>
            </h2>
            {sec.blocks.map((block, bIdx) => renderBlock(block, `s${sec.number}-b${bIdx}`))}
            {visuals.map((kind) => (
              <DolVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}
            {sec.number === 22 && (
              <div className="dol-interactive-check" role="group" aria-label={t('Pre-Trade DOL Selection Checklist')}>
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
                <p className="dol-check-status">
                  {t('Checklist items confirmed')}: {completedCount}/6{' '}
                  {completedCount === 6
                    ? `— ${t('All six DOL bias, path, and invalidation gates verified.')}`
                    : `— ${t('Confirm all 6 gates before locking your Draw on Liquidity target.')}`}
                </p>
              </div>
            )}
            {sec.number === 23 && (
              <div className="fvg-faq" id="dol-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`dol-faq-${fi}`}
                    group="dol-faq"
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

export function DolRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    { label: 'Study Higher-Timeframe Liquidity Maps', url: '/learn/htf-liquidity-maps/' },
    { label: 'Study Liquidity Sweeps & Engineering', url: '/learn/liquidity-engineering-and-liquidity-runs/' },
    { label: 'Master Fair Value Gaps (IRL Rebalance)', url: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/' },
    { label: 'Master Premium & Discount (PD Array Matrix)', url: '/learn/ict-pd-array-selection-price-delivery-continuum/' },
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
