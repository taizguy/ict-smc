import React, { useState } from 'react';
import {
  Activity,
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
  Compass,
  GitBranch,
  HelpCircle,
  Layers,
  LayoutGrid,
  RefreshCw,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  orderBlockDocument as lesson,
  orderBlockPath,
} from '../data/chapters/orderBlockLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { OrderBlockVisual } from './OrderBlockVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>> = {
  Compass,
  GitBranch,
  Layers,
  Ruler,
  ArrowLeftRight,
  Box,
  Activity,
  Target,
  AlertTriangle,
  Grid: LayoutGrid,
  Calculator,
  RefreshCw,
  SlidersHorizontal,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Ban,
  CheckSquare,
  BookMarked,
  Archive,
  HelpCircle,
};

const contextTerms: Array<[string[], string]> = [
  [['Breaker Block', 'Breaker Blocks', 'بریکر بلاک', 'بریکر بلاکس'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Mitigation Block', 'Mitigation Blocks', 'Rejection Block', 'مٹیگیشن بلاک', 'ریجیکشن بلاک'], '/learn/mitigation-and-rejection-blocks/'],
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'Consequent Encroachment', 'فیئر ویلیو گیپ'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Inverse Fair Value Gap', 'IFVG', 'انورس فیئر ویلیو گیپ'], '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Liquidity Sweep', 'Draw on Liquidity', 'لیکویڈیٹی سویپ'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Killzone', 'Killzones', 'London Killzone', 'NY AM Killzone', 'کِل زون'], '/learn/time-and-session-liquidity-the-global-clock/'],
  [['Suspension Block', 'Reaper FVG', 'سسپنشن بلاک'], '/learn/reaper-ifvg-and-suspension-block-advancements/'],
  [['PD Array', 'PD arrays', 'پی ڈی ایرے'], '/learn/ict-pd-array-selection-price-delivery-continuum/'],
  [['Displacement', 'ڈسپلیسمنٹ'], '/learn/why-candles-form-and-how-displacement-arises/'],
  [['Order Book', 'آرڈر بک'], '/learn/the-order-book-in-depth/'],
];

const highlightPhrases = [
  'Mean Threshold',
  'Change in State of Delivery (CISD)',
  'Inducement (IDM)',
  'Propulsion Block',
  'Reclaimed Order Block',
  '3-Candle Response Window',
];

function renderRichParagraph(
  raw: string,
  linkedUrls: Set<string>,
  href: (path: string) => string,
): React.ReactNode {
  let parts: Array<string | React.ReactNode> = [raw];

  for (const [terms, targetUrl] of contextTerms) {
    if (linkedUrls.has(targetUrl) || targetUrl === orderBlockPath) continue;
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
        <a key={`${targetUrl}-${idx}`} href={href(targetUrl)} className="ob-link">
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
            <mark className="ob-mark">{phrase}</mark>
            {part.slice(pIdx + phrase.length)}
          </React.Fragment>
        );
      }
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const OrderBlockLessonContent: React.FC<{ staticOnly?: boolean }> = ({ staticOnly = false }) => {
  const { t, href } = useTranslation();
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const linkedUrls = new Set<string>();

  return (
    <div className="ob-document">
      <nav className="ob-toc" aria-label={t('Chapter sections')}>
        <details>
          <summary>
            <span>{t(lesson.tocLabel)}</span>
            <ChevronDown size={16} aria-hidden="true" />
          </summary>
          <ol className="ob-toc-grid">
            {lesson.sections.map((sec, idx) => {
              const isFaq = Boolean(sec.faqs && sec.faqs.length > 0);
              return (
                <li key={sec.anchor}>
                  <a href={isFaq ? '#order-block-faq' : `#rr-section-${idx}`}>
                    <span className="ob-toc-index ob-num">{String(sec.number).padStart(2, '0')}</span>
                    <span>{t(sec.title)}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </details>
      </nav>

      {lesson.sections.map((sec, idx) => {
        const Icon = iconMap[sec.icon] || Compass;
        const isFaqSection = Boolean(sec.faqs && sec.faqs.length > 0);
        return (
          <section
            key={sec.anchor}
            id={isFaqSection ? 'order-block-faq' : `rr-section-${idx}`}
            className="ob-section"
          >
            {!isFaqSection && <span id={sec.anchor} className="sr-only" />}
            <div className="ob-section-head">
              <span className="ob-section-icon" aria-hidden="true">
                <Icon size={17} aria-hidden="true" />
              </span>
              <div>
                <span className="ob-section-num ob-num">
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
                <div className="ob-extract-box">
                  <span className="ob-extract-title">{t(sec.extract.name)}</span>
                  {sec.extract.formula && (
                    <code className="ob-formula-code ob-num">{sec.extract.formula}</code>
                  )}
                  <p itemProp="description">{t(sec.extract.text)}</p>
                </div>
              </LessonExtract>
            )}

            <div className="ob-prose">
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} data-lesson-content="">
                  {renderRichParagraph(t(para), linkedUrls, href)}
                </p>
              ))}
            </div>

            {sec.numberedPoints && (
              <ol className="ob-steps">
                {sec.numberedPoints.map((point, nIdx) => (
                  <li key={nIdx}>
                    <span className="ob-list-marker ob-num" aria-hidden="true">
                      {nIdx + 1}.
                    </span>
                    <span>{renderRichParagraph(t(point), linkedUrls, href)}</span>
                  </li>
                ))}
              </ol>
            )}

            {sec.bullets && (
              <ul className="ob-bullets">
                {sec.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>
                    <span className="ob-list-marker" aria-hidden="true">
                      -
                    </span>
                    <span>{renderRichParagraph(t(bullet), linkedUrls, href)}</span>
                  </li>
                ))}
              </ul>
            )}

            {sec.visualId && (
              <OrderBlockVisual visualId={sec.visualId} staticOnly={staticOnly} />
            )}

            {sec.callout && (
              <aside className={`ob-callout tone-${sec.callout.tone}`}>
                <span className="ob-callout-label">{t(sec.callout.label)}</span>
                <p>{t(sec.callout.text)}</p>
              </aside>
            )}

            {sec.table && (
              <div className="ob-table-wrap">
                <table className="ob-table">
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
              <div className="ob-checklist">
                {sec.checklist.map((item) => {
                  const checked = Boolean(checkedMap[item.id]);
                  return (
                    <label
                      key={item.id}
                      className={`ob-check-row${checked ? ' is-checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          setCheckedMap((prev) => ({ ...prev, [item.id]: e.target.checked }))
                        }
                      />
                      <div className="ob-check-body">
                        <strong>{t(item.label)}</strong>
                        <span>{t(item.detail)}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {sec.glossaryTerms && (
              <div className="ob-table-wrap">
                <table className="ob-table">
                  <caption>{t('24 Order Block, CISD & Mitigation Definitions')}</caption>
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
              <div className="ob-baseline-stack">
                {sec.baselineSections.map((group) => (
                  <div key={group.code} className="ob-baseline-group">
                    <h3>
                      <span className="ob-num">{group.code}</span> · {t(group.heading)}
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
              <div className="ob-faq-stack">
                {sec.faqs.map((item, fIdx) => (
                  <LessonFaq
                    key={item.q}
                    id={`ob-faq-${fIdx + 1}`}
                    group="order-block-faq"
                    question={t(item.q)}
                    className="ob-faq-item"
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

export const OrderBlockRelatedLinks: React.FC = () => {
  const { t, href } = useTranslation();
  const links = [
    {
      title: 'Study Breaker Blocks: Trading Failed Order Blocks (Chapter 30)',
      path: '/learn/breaker-blocks-trading-failed-order-blocks/',
    },
    {
      title: 'Compare Mitigation & Rejection Blocks (Failure Swings)',
      path: '/learn/mitigation-and-rejection-blocks/',
    },
    {
      title: 'Master Fair Value Gaps (FVG) & Consequent Encroachment',
      path: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/',
    },
    {
      title: 'Practice EUR/USD Failed Order Block -> Breaker Cases (Chart Lab)',
      path: '/tools/chartlab/eurusd-failed-ob-breaker/',
    },
    {
      title: 'Study The Order Book in Depth (Real Limit Orders vs. Chart Zones)',
      path: '/learn/the-order-book-in-depth/',
    },
    {
      title: 'Review Order Block Glossary Entry & Anatomy Card',
      path: '/tools/glossary/order-blocks/order-block/',
    },
  ];

  return (
    <nav className="rr-related-reading" aria-label={t('Continue Studying Order Blocks & Related Tools')}>
      <h2>{t('Continue Studying Order Blocks & Related Tools')}</h2>
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
