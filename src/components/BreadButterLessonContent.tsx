import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  BookMarked,
  Box,
  Calculator,
  CheckSquare,
  ChevronDown,
  Clock,
  Compass,
  GitBranch,
  HelpCircle,
  Layers,
  LayoutGrid,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  breadButterDocument as lesson,
  breadButterPath,
} from '../data/chapters/breadButterLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { BreadButterVisual } from './BreadButterVisual';

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>
> = {
  Compass,
  Box,
  Activity,
  Layers,
  TrendingUp,
  TrendingDown,
  GitBranch,
  SlidersHorizontal,
  Target,
  Calculator,
  Clock,
  Grid: LayoutGrid,
  CheckSquare,
  BarChart3,
  AlertTriangle,
  ShieldCheck,
  BookMarked,
  HelpCircle,
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'فیئر ویلیو گیپ'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Order Block', 'Order Blocks', 'آرڈر بلاک'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Breaker Block', 'Breaker Blocks', 'بریکر بلاک'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Optimal Trade Entry', 'OTE', 'آپٹیمل ٹریڈ انٹری'], '/learn/optimal-trade-entry-ote-fibonacci-62-79-retracement/'],
  [['Power of 3', 'پاور آف تھری'], '/learn/power-of-3-amd-accumulation-manipulation-distribution/'],
  [['Silver Bullet', 'سلور بلٹ'], '/learn/ict-silver-bullet-time-anchored-fvg-entry-model/'],
  [['2022 Model', '2022 ماڈل'], '/learn/the-ict-2022-mentorship-model-step-by-step/'],
  [['Venom Model', 'وینم ماڈل'], '/learn/the-ict-venom-model-five-stage-delivery/'],
  [['Average Daily Range', 'ADR', 'اوسط یومیہ رینج'], '/learn/daily-range-projection-adr-and-stdv-targets/'],
  [['Trade Simulator', 'ٹریڈ سمیولیٹر'], '/tools/simulator/'],
];

function renderRichParagraph(
  raw: string,
  linkedUrls: Set<string>,
  href: (path: string) => string,
): React.ReactNode {
  let parts: Array<string | React.ReactNode> = [raw];

  for (const [terms, targetUrl] of contextTerms) {
    if (linkedUrls.has(targetUrl) || targetUrl === breadButterPath) continue;
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
        <a
          key={`${targetUrl}-${idx}`}
          href={href(targetUrl)}
          style={{ color: 'var(--bb70-cerulean)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          {term}
        </a>,
      );
      if (idx + term.length < part.length) nextParts.push(part.slice(idx + term.length));
      linkedUrls.add(targetUrl);
      matched = true;
    }
    parts = nextParts;
  }

  return parts.map((part, idx) => <React.Fragment key={idx}>{part}</React.Fragment>);
}

export const BreadButterLessonContent: React.FC<{ staticOnly?: boolean }> = ({ staticOnly = false }) => {
  const { t, href } = useTranslation();
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const linkedUrls = new Set<string>();

  return (
    <div className="bb70-document">
      <nav className="bb70-extract" aria-label={t('Chapter sections')}>
        <details>
          <summary
            style={{
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              listStyle: 'none',
            }}
          >
            <span>{t(lesson.tocLabel)}</span>
            <ChevronDown size={16} aria-hidden="true" />
          </summary>
          <ol className="bb70-numbered-list" style={{ marginTop: '0.85rem', marginBottom: 0 }}>
            {lesson.sections.map((sec, idx) => {
              const isFaq = Boolean(sec.faqs && sec.faqs.length > 0);
              return (
                <li key={sec.anchor}>
                  <span className="bb70-list-marker">{String(sec.number).padStart(2, '0')}.</span>
                  <a
                    href={isFaq ? '#bread-butter-faq' : `#rr-section-${idx}`}
                    style={{ color: 'var(--bb70-cerulean)', textDecoration: 'none' }}
                  >
                    {t(sec.title)}
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
            id={isFaqSection ? 'bread-butter-faq' : `rr-section-${idx}`}
            className="bb70-section"
          >
            {!isFaqSection && <span id={sec.anchor} className="sr-only" />}
            <div className="bb70-section-header">
              <span className="bb70-section-icon" aria-hidden="true">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div>
                <span className="bb70-section-kicker">
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
                <div className="bb70-extract">
                  <div className="bb70-extract-name">{t(sec.extract.name)}</div>
                  {sec.extract.formula && (
                    <div className="bb70-extract-formula">{sec.extract.formula}</div>
                  )}
                  <p itemProp="description">{t(sec.extract.text)}</p>
                </div>
              </LessonExtract>
            )}

            <div>
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} data-lesson-content="">
                  {renderRichParagraph(t(para), linkedUrls, href)}
                </p>
              ))}
            </div>

            {sec.numberedPoints && (
              <ol className="bb70-numbered-list">
                {sec.numberedPoints.map((point, nIdx) => (
                  <li key={nIdx}>
                    <span className="bb70-list-marker" aria-hidden="true">
                      {nIdx + 1}.
                    </span>
                    <span>{renderRichParagraph(t(point), linkedUrls, href)}</span>
                  </li>
                ))}
              </ol>
            )}

            {sec.bullets && (
              <ul className="bb70-bullet-list">
                {sec.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>
                    <span className="bb70-bullet-marker" aria-hidden="true">
                      -
                    </span>
                    <span>{renderRichParagraph(t(bullet), linkedUrls, href)}</span>
                  </li>
                ))}
              </ul>
            )}

            {sec.visualId && (
              <BreadButterVisual visualId={sec.visualId} staticOnly={staticOnly} />
            )}

            {sec.callout && (
              <aside className="bb70-callout" data-tone={sec.callout.tone}>
                <span className="bb70-callout-label">{t(sec.callout.label)}</span>
                <p>{t(sec.callout.text)}</p>
              </aside>
            )}

            {sec.table && (
              <div className="bb70-table-wrap">
                <table className="bb70-table">
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
              <div className="bb70-check-list">
                {sec.checklist.map((item) => {
                  const checked = Boolean(checkedMap[item.id]);
                  return (
                    <label key={item.id} className="bb70-check-item">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          setCheckedMap((prev) => ({ ...prev, [item.id]: e.target.checked }))
                        }
                      />
                      <div>
                        <strong style={{ display: 'block', marginBottom: '0.15rem' }}>{t(item.label)}</strong>
                        <span>{t(item.detail)}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {sec.glossaryTerms && (
              <div className="bb70-glossary-grid">
                {sec.glossaryTerms.map((item) => (
                  <div key={item.term} className="bb70-glossary-item">
                    <h3 className="bb70-glossary-term">{t(item.term)}</h3>
                    <p className="bb70-glossary-def">{t(item.definition)}</p>
                  </div>
                ))}
              </div>
            )}

            {sec.baselineSections && (
              <div className="bb70-baseline-grid">
                {sec.baselineSections.map((group) => (
                  <div key={group.code} className="bb70-baseline-card">
                    <h3>
                      <span>{group.code}</span> · {t(group.heading)}
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
              <div className="bb70-faq-list">
                {sec.faqs.map((item, fIdx) => (
                  <LessonFaq
                    key={item.q}
                    id={`bb70-faq-${fIdx + 1}`}
                    group="bread-butter-faq"
                    question={t(item.q)}
                    className="bb70-faq-item"
                  >
                    <div className="bb70-faq-answer">
                      <p>{t(item.a)}</p>
                    </div>
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

export const BreadButterRelatedLinks: React.FC = () => {
  const { t, href } = useTranslation();
  const links = [
    {
      title: 'Study Power of 3 (AMD: Accumulation, Manipulation & Distribution)',
      path: '/learn/power-of-3-amd-accumulation-manipulation-distribution/',
    },
    {
      title: 'Master Daily Range Projection, ADR & Standard Deviation Targets',
      path: '/learn/daily-range-projection-adr-and-stdv-targets/',
    },
    {
      title: 'Compare ICT Silver Bullet (Time-Anchored 1-Hour FVG Model)',
      path: '/learn/ict-silver-bullet-time-anchored-fvg-entry-model/',
    },
    {
      title: 'Study Venom Model (08:00–09:30 Opening Range & Two Fangs)',
      path: '/learn/the-ict-venom-model-five-stage-delivery/',
    },
    {
      title: 'Review Order Blocks: Selection, Boundaries & Mitigation',
      path: '/learn/order-blocks-ob-and-mitigation/',
    },
    {
      title: 'Practice Consolidation Sweeps & Bracket Orders in Trade Simulator',
      path: '/tools/simulator/',
    },
  ];

  return (
    <nav className="rr-related-reading" aria-label={t('Continue Studying Bread-and-Butter Setups & Related Tools')}>
      <h2>{t('Continue Studying Bread-and-Butter Setups & Related Tools')}</h2>
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
