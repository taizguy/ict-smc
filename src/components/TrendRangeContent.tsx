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
import { trendRangeDocument as lesson, trendRangePath, type TrendRangeBlock } from '../data/chapters/trendRangeLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { TrendRangeVisual, type TrendRangeVisualKind } from './TrendRangeVisual';

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

const sectionVisuals: Record<number, TrendRangeVisualKind[]> = {
  1: ['tr-comic-intro'],
  2: ['tr-three-states'],
  3: ['tr-3d-state'],
  4: ['tr-sequence-sim'],
  5: ['tr-classifier'],
  6: ['tr-retrace-vs-trans'],
  7: ['tr-blueprints'],
  8: ['tr-mistakes-comic'],
  9: ['tr-checklist-meter'],
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Order Block', 'Order Blocks'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Internal vs External Structure'], '/learn/internal-vs-external-structure/'],
  [['Break of Structure', 'BOS'], '/learn/break-of-structure-bos-trend-continuation/'],
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
    if (url === trendRangePath) continue;
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

export function TrendRangeContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const urlCount = new Map<string, number>();

  const renderBlock = (block: TrendRangeBlock, key: string, allowLinks: boolean) => {
    if (block.type === 'paragraph' && block.text) {
      const txt = t(block.text);
      return <p key={key}>{allowLinks ? linkifyText(txt, href, urlCount, 2) : txt}</p>;
    }
    if (block.type === 'table' && block.rows && block.rows.length > 0) {
      const [header, ...body] = block.rows;
      return (
        <div key={key} className="tr-table-wrap">
          <table className="tr-table">
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
    <div className="fvg-document tr-document">
      <section className="fvg-takeaways" aria-labelledby="tr-takeaways-heading">
        <h2 id="tr-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="tr-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('Market-Phase Identification Rule')}`} kind="formula">
        <div className="tr-formula-box">
          <strong>{t('Market-Phase Identification Rule')}:</strong>
          <code itemProp="description">
            {t('Bullish = HH + HL · Bearish = LH + LL · Range = Contained Highs & Lows')}
          </code>
        </div>
      </LessonExtract>

      <nav className="tr-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <Bookmark size={16} aria-hidden="true" />
            <span>{t('Chapter Contents')}</span>
            <ChevronDown size={16} aria-hidden="true" style={{ marginInlineStart: 'auto' }} />
          </summary>
          <ol className="tr-toc-list">
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
            className="rr-text-section fvg-document-section tr-section"
          >
            <h2 className="tr-sec-head">
              <span className="tr-sec-icon" aria-hidden="true">
                <Icon size={17} />
              </span>
              <span>{t(sec.title)}</span>
            </h2>
            {sec.blocks.map((block, bIdx) =>
              renderBlock(block, `s${sec.number}-b${bIdx}`, sec.number >= 2 && sec.number <= 8),
            )}
            {visuals.map((kind) => (
              <TrendRangeVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}
            {sec.number === 10 && (
              <div className="fvg-faq" id="trend-range-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`tr-faq-${fi}`}
                    group="tr-faq"
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

export function TrendRangeRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    { label: 'Study What Is a Swing', url: '/learn/what-is-a-swing-the-atom-of-structure/' },
    { label: 'Study Internal vs. External Structure', url: '/learn/internal-vs-external-structure/' },
    { label: 'Study Break of Structure (BOS)', url: '/learn/break-of-structure-bos-trend-continuation/' },
    { label: 'Study Dealing Ranges', url: '/learn/dealing-range-marking/' },
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
