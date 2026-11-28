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
import { sweepHuntDocument as lesson, sweepHuntPath, type SweepHuntBlock } from '../data/chapters/sweepHuntLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { SweepHuntVisual, type SweepHuntVisualKind } from './SweepHuntVisual';

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

const sectionVisuals: Record<number, SweepHuntVisualKind[]> = {
  1: ['sh-comic-intro'],
  2: ['sh-evidence-matrix'],
  3: ['sh-3d-engine'],
  4: ['sh-cascade-slippage'],
  5: ['sh-sequence-sim'],
  6: ['sh-calculator'],
  7: ['sh-sweep-vs-news'],
  8: ['sh-session-windows'],
  9: ['sh-blueprints'],
  10: ['sh-mistakes-comic'],
  11: ['sh-checklist-meter'],
};

const contextTerms: Array<[string[], string]> = [
  [['Buyside Liquidity', 'Sellside Liquidity', 'BSL', 'SSL'], '/learn/buyside-sellside-liquidity/'],
  [['Equal Highs', 'Equal Lows', 'Equal High', 'Equal Low', 'EQH', 'EQL'], '/learn/equal-highs-equal-lows/'],
  [['Turtle Soup'], '/learn/ict-liquidity-turtle-soup-rejection-blocks/'],
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
    if (url === sweepHuntPath) continue;
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

export function SweepHuntContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const urlCount = new Map<string, number>();

  const renderBlock = (block: SweepHuntBlock, key: string, allowLinks: boolean) => {
    if (block.type === 'paragraph' && block.text) {
      const txt = t(block.text);
      return <p key={key}>{allowLinks ? linkifyText(txt, href, urlCount, 2) : txt}</p>;
    }
    if (block.type === 'table' && block.rows && block.rows.length > 0) {
      const [header, ...body] = block.rows;
      return (
        <div key={key} className="sh-table-wrap">
          <table className="sh-table">
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
    <div className="fvg-document sh-document">
      <section className="fvg-takeaways" aria-labelledby="sh-takeaways-heading">
        <h2 id="sh-takeaways-heading">
          <Sparkles size={18} aria-hidden="true" />
          <span>{t('Key Takeaways')}</span>
        </h2>
        <ul className="sh-list">
          {lesson.takeaways.map((item, idx) => (
            <li key={idx}>{linkifyText(t(item), href, urlCount, 2)}</li>
          ))}
        </ul>
      </section>

      <LessonExtract name={`${lesson.h1} — ${t('Observable Sweep Evidence Rule')}`} kind="formula">
        <div className="sh-formula-box">
          <strong>{t('Observable Sweep Evidence Rule')}:</strong>
          <code itemProp="description">
            {t('Observable = Wick Excursion + Body Close Location · Unobserved = Participant Identity & Motive')}
          </code>
        </div>
      </LessonExtract>

      <nav className="sh-toc" aria-label={t('On this page')}>
        <details>
          <summary>
            <Bookmark size={16} aria-hidden="true" />
            <span>{t('Chapter Contents')}</span>
            <ChevronDown size={16} aria-hidden="true" style={{ marginInlineStart: 'auto' }} />
          </summary>
          <ol className="sh-toc-list">
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
            className="rr-text-section fvg-document-section sh-section"
          >
            <h2 className="sh-sec-head">
              <span className="sh-sec-icon" aria-hidden="true">
                <Icon size={17} />
              </span>
              <span>{t(sec.title)}</span>
            </h2>
            {sec.blocks.map((block, bIdx) =>
              renderBlock(block, `s${sec.number}-b${bIdx}`, sec.number >= 2 && sec.number <= 9),
            )}
            {visuals.map((kind) => (
              <SweepHuntVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}
            {sec.number === 12 && (
              <div className="fvg-faq" id="sweep-hunt-faq">
                {lesson.faqs.map((faq, fi) => (
                  <LessonFaq
                    key={fi}
                    id={`sh-faq-${fi}`}
                    group="sh-faq"
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

export function SweepHuntRelatedLinks() {
  const { t, href } = useTranslation();
  const links = [
    { label: 'Study Buyside & Sellside Liquidity', url: '/learn/buyside-sellside-liquidity/' },
    { label: 'Study Equal Highs & Equal Lows', url: '/learn/equal-highs-equal-lows/' },
    { label: 'Study Liquidity Engineering & Runs', url: '/learn/liquidity-engineering-and-liquidity-runs/' },
    { label: 'Study Turtle Soup & Rejection Blocks', url: '/learn/ict-liquidity-turtle-soup-rejection-blocks/' },
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
