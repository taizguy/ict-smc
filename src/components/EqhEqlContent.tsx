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
  Layers,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { eqhEqlDocument as lesson, eqhEqlPath, type EqhEqlBlock } from '../data/chapters/eqhEqlLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { EqhEqlVisual, type EqhEqlVisualKind } from './EqhEqlVisual';

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
  'help-circle': HelpCircle,
};

const sectionVisuals: Record<number, EqhEqlVisualKind[]> = {
  1: ['eq-comic-intro'],
  2: ['eq-tolerance-band'],
  3: ['eq-3d-shelf'],
  4: ['eq-marking-steps'],
  5: ['eq-sequence-sim'],
  6: ['eq-calculator'],
  7: ['eq-shelf-vs-swing'],
  8: ['eq-session-windows'],
  9: ['eq-blueprints'],
  10: ['eq-mistakes-comic'],
  11: ['eq-checklist-meter'],
};

const contextTerms: Array<[string[], string]> = [
  [['Buyside Liquidity', 'Sellside Liquidity', 'BSL', 'SSL'], '/learn/buyside-sellside-liquidity/'],
  [['Liquidity Sweep', 'Stop Hunt'], '/learn/liquidity-sweep-vs-stop-hunt/'],
  [['Draw on Liquidity', 'DOL'], '/learn/draw-on-liquidity/'],
  [['Chart Lab'], '/tools/chartlab/'],
];

function linkifyText(
  text: string,
  href: (p: string) => string,
  urlCount: Map<string, number>,
  maxLinks = 2,
): React.ReactNode {
  const matches: Array<{ start: number; end: number; url: string; raw: string }> = [];
  for (const [terms, url] of contextTerms) {
    if (url === eqhEqlPath) continue;
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

export function EqhEqlContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const urlCount = new Map<string, number>();

  const renderBlock = (block: EqhEqlBlock, key: string, allowLinks: boolean) => {
    if (block.type === 'paragraph' && block.text) {
      const txt = t(block.text);
      return <p key={key}>{allowLinks ? linkifyText(txt, href, urlCount, 2) : txt}</p>;
    }
    if (block.type === 'list' && block.items) {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag key={key} className="eq-list">
          {block.items.map((item, idx) => (
            <li key={idx}>{allowLinks ? linkifyText(t(item), href, urlCount, 1) : t(item)}</li>
          ))}
        </Tag>
      );
    }
    if (block.type === 'table' && block.rows && block.rows.length > 0) {
      const [header, ...body] = block.rows;
      return (
        <div key={key} className="eq-table-wrap">
          <table className="eq-table">
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
    return null;
  };

  return (
    <div className="fvg-document eq-document">
      <section className="fvg-takeaways" aria-labelledby="eq-takeaways-heading">
        <h2 id="eq-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="eq-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('EQH / EQL Tolerance Rule')}`} kind="formula">
        <div className="eq-formula-box">
          <strong>{t('EQH / EQL Tolerance Rule')}:</strong>
          <code itemProp="description">
            {t('Equal Level = |Swing A − Swing B| ≤ Predefined Tolerance (Close Confirms Sweep vs. Breakout)')}
          </code>
        </div>
      </LessonExtract>

      <nav className="eq-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <Bookmark size={16} aria-hidden="true" />
            <span>{t('Chapter Contents')}</span>
            <ChevronDown size={16} aria-hidden="true" style={{ marginInlineStart: 'auto' }} />
          </summary>
          <ol className="eq-toc-list">
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
            className="rr-text-section fvg-document-section eq-section"
          >
            <h2 className="eq-sec-head">
              <span className="eq-sec-icon" aria-hidden="true">
                <Icon size={17} />
              </span>
              <span>{t(sec.title)}</span>
            </h2>
            {sec.blocks.map((block, bIdx) =>
              renderBlock(block, `s${sec.number}-b${bIdx}`, sec.number >= 2 && sec.number <= 9),
            )}
            {visuals.map((kind) => (
              <EqhEqlVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}
            {sec.number === 12 && (
              <div className="fvg-faq" id="eqh-eql-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`eq-faq-${fi}`}
                    group="eq-faq"
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

export function EqhEqlRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    { label: 'Study Buyside & Sellside Liquidity', url: '/learn/buyside-sellside-liquidity/' },
    { label: 'Study Liquidity Sweep vs. Stop Hunt', url: '/learn/liquidity-sweep-vs-stop-hunt/' },
    { label: 'Study Liquidity Engineering & Runs', url: '/learn/liquidity-engineering-and-liquidity-runs/' },
    { label: 'Explore Draw on Liquidity (DOL)', url: '/learn/draw-on-liquidity/' },
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
