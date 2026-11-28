import React from 'react';
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
  TrendingUp,
} from 'lucide-react';
import {
  liquidityRunDocument as lesson,
  liquidityRunPath,
  type LiquidityRunBlock,
} from '../data/chapters/liquidityRunLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { LiquidityRunVisual, type LiquidityRunVisualKind } from './LiquidityRunVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  compass: Compass,
  'book-open': BookOpen,
  sparkles: Sparkles,
  layers: Layers,
  'trending-up': TrendingUp,
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

const sectionVisuals: Record<number, LiquidityRunVisualKind[]> = {
  1: ['lr-comic-intro'],
  2: ['lr-eqh-tolerance'],
  3: ['lr-3d-corridor'],
  4: ['lr-trendline-phantom'],
  5: ['lr-sequence-sim'],
  6: ['lr-calculator'],
  7: ['lr-sweep-vs-run'],
  8: ['lr-session-flow'],
  9: ['lr-blueprints'],
  10: ['lr-mistakes-comic'],
  11: ['lr-checklist-meter'],
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'FVGs', 'فیئر ویلیو گیپ'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Order Block', 'Order Blocks', 'آرڈر بلاک', 'آرڈر بلاکس'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Turtle Soup', 'Rejection Block', 'Rejection Blocks'], '/learn/ict-liquidity-turtle-soup-rejection-blocks/'],
  [['Draw on Liquidity', 'DOL'], '/learn/draw-on-liquidity/'],
  [['Higher-Timeframe Liquidity Maps', 'HTF Liquidity'], '/learn/htf-liquidity-maps/'],
  [['Chart Lab', 'چارٹ لیب'], '/tools/chartlab/'],
];

function linkifyText(
  text: string,
  href: (p: string) => string,
  urlCount: Map<string, number>,
  maxLinks = 2,
): React.ReactNode {
  const matches: Array<{ start: number; end: number; url: string; raw: string }> = [];
  for (const [terms, url] of contextTerms) {
    if (url === liquidityRunPath) continue;
    if ((urlCount.get(url) || 0) >= 2) continue;
    for (const term of terms) {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const rx = new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`);
      const m = rx.exec(text);
      if (m && m.index !== undefined) {
        matches.push({ start: m.index, end: m.index + m[0].length, url, raw: m[0] });
        break;
      }
    }
  }
  matches.sort((a, b) => a.start - b.start);
  const picked: typeof matches = [];
  let cursor = 0;
  for (const m of matches) {
    if (picked.length >= maxLinks) break;
    if (m.start >= cursor && (urlCount.get(m.url) || 0) < 2) {
      picked.push(m);
      urlCount.set(m.url, (urlCount.get(m.url) || 0) + 1);
      cursor = m.end;
    }
  }
  if (!picked.length) return text;
  const parts: React.ReactNode[] = [];
  let pos = 0;
  picked.forEach((m, i) => {
    if (m.start > pos) parts.push(text.slice(pos, m.start));
    parts.push(
      <a key={`${m.url}-${i}`} className="fvg-context-link" href={href(m.url)}>
        {m.raw}
      </a>,
    );
    pos = m.end;
  });
  if (pos < text.length) parts.push(text.slice(pos));
  return <>{parts}</>;
}

export function LiquidityRunContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const urlCount = new Map<string, number>();

  const renderBlock = (block: LiquidityRunBlock, key: string, allowLinks: boolean) => {
    if (block.type === 'paragraph' && block.text) {
      const txt = t(block.text);
      return <p key={key}>{allowLinks ? linkifyText(txt, href, urlCount, 2) : txt}</p>;
    }
    if (block.type === 'list' && block.items) {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag key={key} className="lr-list">
          {block.items.map((item, idx) => {
            const txt = t(item);
            return <li key={idx}>{allowLinks ? linkifyText(txt, href, urlCount, 1) : txt}</li>;
          })}
        </Tag>
      );
    }
    if (block.type === 'table' && block.rows && block.rows.length > 0) {
      const [header, ...body] = block.rows;
      return (
        <div key={key} className="lr-table-wrap">
          <table className="lr-table">
            <thead>
              <tr>
                {header.map((cell, ci) => (
                  <th key={ci}>{t(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{t(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (block.type === 'callout' && block.text) {
      const isWarn = block.tone === 'warn';
      return (
        <aside key={key} className={`lr-callout ${isWarn ? 'is-warn' : ''}`}>
          {block.title && (
            <div className="lr-callout-title">
              {isWarn ? <AlertTriangle size={16} aria-hidden="true" /> : <Info size={16} aria-hidden="true" />}
              <span>{t(block.title)}</span>
            </div>
          )}
          <p>{allowLinks ? linkifyText(t(block.text), href, urlCount, 1) : t(block.text)}</p>
        </aside>
      );
    }
    return null;
  };

  return (
    <div className="fvg-document lr-document">
      <section className="fvg-takeaways" aria-labelledby="lr-takeaways-heading">
        <h2 id="lr-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="lr-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('Liquidity Run Classification Rule')}`} kind="formula">
        <div className="lr-formula-box">
          <strong>{t('Liquidity Run Classification Rule')}:</strong>
          <code itemProp="description">
            {t('LRLR = Unobstructed FVG Corridor (Continuation Context) · HRLR = Dense Opposing Swings (Sweep/Chop Risk)')}
          </code>
        </div>
      </LessonExtract>

      <nav className="lr-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <Bookmark size={16} aria-hidden="true" />
            <span>{t('Chapter Contents')}</span>
            <ChevronDown size={16} aria-hidden="true" style={{ marginInlineStart: 'auto' }} />
          </summary>
          <ol className="lr-toc-list">
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
            className="rr-text-section fvg-document-section lr-section"
          >
            <h2 className="lr-sec-head">
              <span className="lr-sec-icon" aria-hidden="true">
                <Icon size={17} />
              </span>
              <span>{t(sec.title)}</span>
            </h2>
            {sec.blocks.map((block, bIdx) =>
              renderBlock(block, `s${sec.number}-b${bIdx}`, sec.number >= 2 && sec.number <= 9),
            )}
            {visuals.map((kind) => (
              <LiquidityRunVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}
            {sec.number === 12 && (
              <div className="fvg-faq" id="liquidity-run-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`lr-faq-${fi}`}
                    group="lr-faq"
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

export function LiquidityRunRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    { label: 'Study Turtle Soup & Rejection Blocks', url: '/learn/ict-liquidity-turtle-soup-rejection-blocks/' },
    { label: 'Explore Draw on Liquidity (DOL)', url: '/learn/draw-on-liquidity/' },
    { label: 'Study Higher-Timeframe Liquidity Maps', url: '/learn/htf-liquidity-maps/' },
    { label: 'Study Fair Value Gaps (FVG)', url: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/' },
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
