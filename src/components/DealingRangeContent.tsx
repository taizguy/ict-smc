import React from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Calculator,
  CheckSquare,
  ChevronDown,
  Compass,
  GitCompare,
  HelpCircle,
  Layers,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { dealingRangeDocument as lesson, dealingRangePath, type DealingRangeBlock } from '../data/chapters/dealingRangeLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { DealingRangeVisual, type DealingRangeVisualKind } from './DealingRangeVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  compass: Compass,
  'book-open': BookOpen,
  sparkles: Sparkles,
  layers: Layers,
  'play-circle': PlayCircle,
  calculator: Calculator,
  'git-compare': GitCompare,
  'alert-triangle': AlertTriangle,
  'check-square': CheckSquare,
  'help-circle': HelpCircle,
};

const sectionVisuals: Record<number, DealingRangeVisualKind[]> = {
  1: ['dr-comic-intro'],
  2: ['dr-quadrant-map'],
  3: ['dr-3d-cube'],
  4: ['dr-sequence-sim'],
  5: ['dr-calculator'],
  6: ['dr-ext-vs-int'],
  7: ['dr-blueprints'],
  8: ['dr-mistakes-comic'],
  9: ['dr-checklist-meter'],
};

const contextTerms: Array<[string[], string]> = [
  [['Internal vs External Structure'], '/learn/internal-vs-external-structure/'],
  [['Optimal Trade Entry', 'OTE'], '/learn/optimal-trade-entry-ote/'],
  [['Premium', 'Discount'], '/learn/ict-pd-array-selection-price-delivery-continuum/'],
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
    if (url === dealingRangePath) continue;
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

export function DealingRangeContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const urlCount = new Map<string, number>();

  const renderBlock = (block: DealingRangeBlock, key: string, allowLinks: boolean) => {
    if (block.type === 'paragraph' && block.text) {
      const txt = t(block.text);
      return <p key={key}>{allowLinks ? linkifyText(txt, href, urlCount, 2) : txt}</p>;
    }
    if (block.type === 'table' && block.rows && block.rows.length > 0) {
      const [header, ...body] = block.rows;
      return (
        <div key={key} className="dr-table-wrap">
          <table className="dr-table">
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
    <div className="fvg-document dr-document">
      <section className="fvg-takeaways" aria-labelledby="dr-takeaways-heading">
        <h2 id="dr-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="dr-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('Dealing Range Equilibrium Rule')}`} kind="formula">
        <div className="dr-formula-box">
          <strong>{t('Dealing Range Equilibrium Rule')}:</strong>
          <code itemProp="description">
            {t('50% Equilibrium = (Range High + Range Low) ÷ 2 · Below 50% = Discount · Above 50% = Premium')}
          </code>
        </div>
      </LessonExtract>

      <nav className="dr-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <Bookmark size={16} aria-hidden="true" />
            <span>{t('Chapter Contents')}</span>
            <ChevronDown size={16} aria-hidden="true" style={{ marginInlineStart: 'auto' }} />
          </summary>
          <ol className="dr-toc-list">
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
            className="rr-text-section fvg-document-section dr-section"
          >
            <h2 className="dr-sec-head">
              <span className="dr-sec-icon" aria-hidden="true">
                <Icon size={17} />
              </span>
              <span>{t(sec.title)}</span>
            </h2>
            {sec.blocks.map((block, bIdx) =>
              renderBlock(block, `s${sec.number}-b${bIdx}`, sec.number >= 2 && sec.number <= 8),
            )}
            {visuals.map((kind) => (
              <DealingRangeVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}
            {sec.number === 10 && (
              <div className="fvg-faq" id="dealing-range-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`dr-faq-${fi}`}
                    group="dr-faq"
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

export function DealingRangeRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    { label: 'Study Internal vs. External Structure', url: '/learn/internal-vs-external-structure/' },
    { label: 'Study Trends, Ranges & Transitions', url: '/learn/trend-range-transition/' },
    { label: 'Study Optimal Trade Entry (OTE)', url: '/learn/optimal-trade-entry-ote/' },
    { label: 'Study Premium & Discount PD Arrays', url: '/learn/ict-pd-array-selection-price-delivery-continuum/' },
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
