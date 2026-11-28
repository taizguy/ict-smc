import React, { useState } from 'react';
import {
  AlertTriangle,
  Archive,
  ArrowLeftRight,
  ArrowUpRight,
  Ban,
  BookMarked,
  Box,
  Calculator,
  CheckSquare,
  ChevronDown,
  Clock,
  Compass,
  Eye,
  Gauge,
  GitBranch,
  HelpCircle,
  Layers,
  Network,
  RefreshCw,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  breakerBlockDocument as lesson,
  breakerBlockPath,
} from '../data/chapters/breakerBlockLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { BreakerBlockVisual } from './BreakerBlockVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>> = {
  Compass,
  GitBranch,
  Box,
  ArrowLeftRight,
  Ruler,
  SlidersHorizontal,
  Eye,
  Layers,
  Sparkles,
  Calculator,
  RefreshCw,
  ShieldCheck,
  Gauge,
  Clock,
  Network,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Ban,
  CheckSquare,
  BookMarked,
  Archive,
  HelpCircle,
};

const contextTerms: Array<[string[], string]> = [
  [['Order Block', 'Order Blocks', 'آرڈر بلاک', 'آرڈر بلاکس'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Mitigation Block', 'Mitigation Blocks', 'مٹیگیشن بلاک', 'مٹیگیشن بلاکس'], '/learn/mitigation-and-rejection-blocks/'],
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'Consequent Encroachment', 'فیئر ویلیو گیپ'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Inverse Fair Value Gap', 'IFVG', 'انورس فیئر ویلیو گیپ'], '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Liquidity Sweep', 'Draw on Liquidity', 'لیکویڈیٹی سویپ'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Killzone', 'Killzones', 'London Killzone', 'NY AM Killzone', 'کِل زون'], '/learn/time-and-session-liquidity-the-global-clock/'],
  [['Suspension Block', 'Reaper FVG', 'سسپنشن بلاک'], '/learn/reaper-ifvg-and-suspension-block-advancements/'],
  [['PD Array', 'PD arrays', 'پی ڈی ایرے'], '/learn/ict-pd-array-selection-price-delivery-continuum/'],
  [['ICT Unicorn Model', 'Unicorn Model', 'یونیکارن ماڈل'], '/tools/masterclass/core-masterclasses/unicorn-model/'],
  [['Displacement', 'ڈسپلیسمنٹ'], '/learn/why-candles-form-and-how-displacement-arises/'],
];

const highlightPhrases = [
  'Mean Threshold',
  'Unicorn_High > Unicorn_Low',
  'Body-Close MSS',
  'Inverse Breaker',
  'Positive-Width',
];

function renderRichParagraph(
  raw: string,
  linkedUrls: Set<string>,
  href: (path: string) => string,
): React.ReactNode {
  let parts: Array<string | React.ReactNode> = [raw];

  for (const [terms, targetUrl] of contextTerms) {
    if (linkedUrls.has(targetUrl) || targetUrl === breakerBlockPath) continue;
    let matched = false;
    const nextParts: Array<string | React.ReactNode> = [];
    for (const part of parts) {
      if (typeof part !== 'string' || matched) {
        nextParts.push(part);
        continue;
      }
      const term = terms.find((candidate) => part.includes(candidate));
      if (!term) {
        nextParts.push(part);
        continue;
      }
      const idx = part.indexOf(term);
      if (idx > 0) nextParts.push(part.slice(0, idx));
      nextParts.push(
        <a key={`${targetUrl}-${idx}`} href={href(targetUrl)} className="bb-link">
          {term}
        </a>,
      );
      if (idx + term.length < part.length) nextParts.push(part.slice(idx + term.length));
      linkedUrls.add(targetUrl);
      matched = true;
    }
    parts = nextParts;
  }

  return parts.map((part, idx) => {
    if (typeof part !== 'string') return <React.Fragment key={idx}>{part}</React.Fragment>;
    for (const phrase of highlightPhrases) {
      const pIdx = part.indexOf(phrase);
      if (pIdx !== -1) {
        return (
          <React.Fragment key={idx}>
            {part.slice(0, pIdx)}
            <mark className="bb-mark">{phrase}</mark>
            {part.slice(pIdx + phrase.length)}
          </React.Fragment>
        );
      }
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const BreakerBlockContent: React.FC<{ staticOnly?: boolean }> = ({ staticOnly = false }) => {
  const { t, href } = useTranslation();
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const linkedUrls = new Set<string>();

  return (
    <div className="bb-document">
      <nav className="bb-toc" aria-label={t('Chapter sections')}>
        <details>
          <summary>
            <span>{t(lesson.tocLabel)}</span>
            <ChevronDown size={16} aria-hidden="true" />
          </summary>
          <ol className="bb-toc-grid">
            {lesson.sections.map((sec, idx) => (
              <li key={sec.anchor}>
                <a href={`#rr-section-${idx}`}>
                  <span className="bb-toc-index bb-num">{String(sec.number).padStart(2, '0')}</span>
                  <span>{t(sec.title)}</span>
                </a>
              </li>
            ))}
          </ol>
        </details>
      </nav>

      {lesson.sections.map((sec, idx) => {
        const Icon = iconMap[sec.icon] || Compass;
        const isFaqSection = Boolean(sec.faqs && sec.faqs.length > 0);
        return (
          <section
            key={sec.anchor}
            id={isFaqSection ? 'breaker-block-faq' : `rr-section-${idx}`}
            className="bb-section"
          >
            {!isFaqSection && <span id={sec.anchor} className="sr-only" />}
            <div className="bb-section-head">
              <span className="bb-section-icon" aria-hidden="true">
                <Icon size={17} aria-hidden="true" />
              </span>
              <div>
                <span className="bb-section-num bb-num">
                  {String(sec.number).padStart(2, '0')} / {String(lesson.sections.length).padStart(2, '0')}
                </span>
                <h2>{t(sec.title)}</h2>
              </div>
            </div>

            {sec.extract && (
              <LessonExtract
                name={sec.extract.name}
                kind={sec.extract.formula ? 'formula' : 'definition'}
              >
                <div className="bb-extract-box">
                  <span className="bb-extract-title">{t(sec.extract.name)}</span>
                  {sec.extract.formula && (
                    <code className="bb-formula-code bb-num">{sec.extract.formula}</code>
                  )}
                  <p itemProp="description">{t(sec.extract.text)}</p>
                </div>
              </LessonExtract>
            )}

            <div className="bb-prose">
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} data-lesson-content="">
                  {renderRichParagraph(t(para), linkedUrls, href)}
                </p>
              ))}
            </div>

            {sec.numberedPoints && (
              <ol className="bb-steps">
                {sec.numberedPoints.map((point, nIdx) => (
                  <li key={nIdx}>
                    <span className="bb-list-marker bb-num" aria-hidden="true">
                      {nIdx + 1}.
                    </span>
                    <span>{renderRichParagraph(t(point), linkedUrls, href)}</span>
                  </li>
                ))}
              </ol>
            )}

            {sec.bullets && (
              <ul className="bb-bullets">
                {sec.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>
                    <span className="bb-list-marker" aria-hidden="true">
                      -
                    </span>
                    <span>{renderRichParagraph(t(bullet), linkedUrls, href)}</span>
                  </li>
                ))}
              </ul>
            )}

            {sec.visualId && (
              <BreakerBlockVisual visualId={sec.visualId} staticOnly={staticOnly} />
            )}

            {sec.callout && (
              <aside className={`bb-callout tone-${sec.callout.tone}`}>
                <span className="bb-callout-label">{t(sec.callout.label)}</span>
                <p>{t(sec.callout.text)}</p>
              </aside>
            )}

            {sec.table && (
              <div className="bb-table-wrap">
                <table className="bb-table">
                  <caption>{t(sec.table.caption)}</caption>
                  <thead>
                    <tr>
                      {sec.table.headers.map((header) => (
                        <th key={header} scope="col">
                          {t(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.table.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className={cIdx === 0 ? 'font-semibold' : undefined}>
                            {t(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {sec.checklist && (
              <div className="bb-checklist">
                {sec.checklist.map((item) => {
                  const checked = Boolean(checkedMap[item.id]);
                  return (
                    <label
                      key={item.id}
                      className={`bb-check-row${checked ? ' is-checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          setCheckedMap((prev) => ({ ...prev, [item.id]: e.target.checked }))
                        }
                      />
                      <div className="bb-check-body">
                        <strong>{t(item.label)}</strong>
                        <span>{t(item.detail)}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {sec.glossaryTerms && (
              <div className="bb-table-wrap">
                <table className="bb-table">
                  <caption>{t('22 Breaker Block & Polarity Flip Definitions')}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{t('Term')}</th>
                      <th scope="col">{t('Observable Definition')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.glossaryTerms.map((item) => (
                      <tr key={item.term}>
                        <td className="font-semibold">{t(item.term)}</td>
                        <td>{t(item.definition)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {sec.baselineSections && (
              <div className="bb-baseline-stack">
                {sec.baselineSections.map((group) => (
                  <div key={group.code} className="bb-baseline-group">
                    <h3>
                      <span className="bb-num">{group.code}</span> · {t(group.heading)}
                    </h3>
                    {group.paragraphs.map((bp, bpIdx) => (
                      <p key={bpIdx} data-lesson-content="" data-delivery-content="">
                        {t(bp)}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {sec.faqs && (
              <div className="bb-faq-stack">
                {sec.faqs.map((item, fIdx) => (
                  <LessonFaq
                    key={item.q}
                    id={`bb-faq-${fIdx + 1}`}
                    group="breaker-block-faq"
                    question={t(item.q)}
                    className="bb-faq-item"
                  >
                    <p>{t(item.a)}</p>
                  </LessonFaq>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export const BreakerBlockRelatedLinks: React.FC = () => {
  const { t, href } = useTranslation();
  const links = [
    {
      title: 'Practice EUR/USD Failed Order Block -> Breaker Cases (Chart Lab)',
      path: '/tools/chartlab/eurusd-failed-ob-breaker/',
    },
    {
      title: 'ICT Unicorn Model: Breaker Block + Fair Value Gap Masterclass',
      path: '/tools/masterclass/core-masterclasses/unicorn-model/',
    },
    {
      title: 'Study Order Blocks: Selection, Boundaries & Mitigation',
      path: '/learn/order-blocks-ob-and-mitigation/',
    },
    {
      title: 'Compare Mitigation & Rejection Blocks (Failure Swings)',
      path: '/learn/mitigation-and-rejection-blocks/',
    },
    {
      title: 'Explore Suspension Blocks & Reaper FVG Advancements',
      path: '/learn/reaper-ifvg-and-suspension-block-advancements/',
    },
    {
      title: 'Review Breaker Block Glossary Entry & Anatomy Card',
      path: '/tools/glossary/order-blocks/breaker-block/',
    },
  ];

  return (
    <nav className="rr-related-reading" aria-label={t('Continue Studying Breaker Blocks & Related Tools')}>
      <h2>{t('Continue Studying Breaker Blocks & Related Tools')}</h2>
      <ul>
        {links.map((item) => (
          <li key={item.path}>
            <a href={href(item.path)} className="fvg-context-link">
              <span>{t(item.title)}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
