import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowLeftRight,
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
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  venomModelDocument as lesson,
  venomModelPath,
} from '../data/chapters/venomModelLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { VenomVisual } from './VenomVisual';

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>
> = {
  Compass,
  Clock,
  Layers,
  ShieldCheck,
  ArrowLeftRight,
  Calculator,
  Target,
  Box,
  GitBranch,
  Activity,
  SlidersHorizontal,
  Grid: LayoutGrid,
  BarChart3,
  CheckSquare,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  AlertTriangle,
  BookMarked,
  Archive,
  HelpCircle,
};

const contextTerms: Array<[string[], string]> = [
  [['Fair Value Gap', 'Fair Value Gaps', 'FVG', 'فیئر ویلیو گیپ'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Inverse Fair Value Gap', 'IFVG', 'انورس فیئر ویلیو گیپ'], '/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/'],
  [['Balanced Price Range', 'BPR', 'بیلنسڈ پرائس رینج'], '/learn/pd-array-matrix-bpr-nwog-ndog-and-volume-imbalances/'],
  [['Breaker Block', 'Breaker Blocks', 'بریکر بلاک'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Order Block', 'Order Blocks', 'آرڈر بلاک'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Market Structure Shift', 'MSS', 'مارکیٹ اسٹرکچر شفٹ'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['SMT Divergence', 'ایس ایم ٹی ڈائیورجنس'], '/learn/smart-money-technique-smt-divergence/'],
  [['Silver Bullet', 'سلور بلٹ'], '/learn/ict-silver-bullet-time-anchored-fvg-entry-model/'],
  [['2022 Model', '2022 ماڈل'], '/learn/the-ict-2022-mentorship-model-step-by-step/'],
  [['Unicorn Model', 'یونیکورن ماڈل'], '/learn/the-unicorn-model-breaker-fvg-high-confluence-setup/'],
  [['First Presented Fair Value Gap', 'First Presented FVG', '1st PFVG', 'فرسٹ پریزنٹڈ فیئر ویلیو گیپ'], '/learn/first-presented-fvg-opening-session-reference/'],
  [['Draw on Liquidity', 'لیکویڈیٹی ڈرا'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Trade Simulator', 'ٹریڈ سمیولیٹر'], '/tools/simulator/'],
];

const highlightPhrases = [
  'Two Fangs',
  'Balanced Price Range (BPR)',
  'Extended Trading Hours (ETH)',
  'Single-Pass delivery',
  'Double-Pass delivery',
  'Change in State of Delivery (CISD)',
];

function renderRichParagraph(
  raw: string,
  linkedUrls: Set<string>,
  href: (path: string) => string,
): React.ReactNode {
  let parts: Array<string | React.ReactNode> = [raw];

  for (const [terms, targetUrl] of contextTerms) {
    if (linkedUrls.has(targetUrl) || targetUrl === venomModelPath) continue;
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
        <a key={`${targetUrl}-${idx}`} href={href(targetUrl)} className="vm-link">
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
            <mark className="vm-mark">{phrase}</mark>
            {part.slice(pIdx + phrase.length)}
          </React.Fragment>
        );
      }
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const VenomLessonContent: React.FC<{ staticOnly?: boolean }> = ({ staticOnly = false }) => {
  const { t, href } = useTranslation();
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const linkedUrls = new Set<string>();

  return (
    <div className="vm-document">
      <nav className="vm-toc" aria-label={t('Chapter sections')}>
        <details>
          <summary>
            <span>{t(lesson.tocLabel)}</span>
            <ChevronDown size={16} aria-hidden="true" />
          </summary>
          <ol className="vm-toc-grid">
            {lesson.sections.map((sec, idx) => {
              const isFaq = Boolean(sec.faqs && sec.faqs.length > 0);
              return (
                <li key={sec.anchor}>
                  <a href={isFaq ? '#venom-model-faq' : `#rr-section-${idx}`}>
                    <span className="vm-toc-index vm-num">{String(sec.number).padStart(2, '0')}</span>
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
            id={isFaqSection ? 'venom-model-faq' : `rr-section-${idx}`}
            className="vm-section"
          >
            {!isFaqSection && <span id={sec.anchor} className="sr-only" />}
            <div className="vm-section-head">
              <span className="vm-section-icon" aria-hidden="true">
                <Icon size={17} aria-hidden="true" />
              </span>
              <div>
                <span className="vm-section-num vm-num">
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
                <div className="vm-extract-box">
                  <span className="vm-extract-title">{t(sec.extract.name)}</span>
                  {sec.extract.formula && (
                    <code className="vm-formula-code vm-num">{sec.extract.formula}</code>
                  )}
                  <p itemProp="description">{t(sec.extract.text)}</p>
                </div>
              </LessonExtract>
            )}

            <div className="vm-prose">
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} data-lesson-content="">
                  {renderRichParagraph(t(para), linkedUrls, href)}
                </p>
              ))}
            </div>

            {sec.numberedPoints && (
              <ol className="vm-steps">
                {sec.numberedPoints.map((point, nIdx) => (
                  <li key={nIdx}>
                    <span className="vm-list-marker vm-num" aria-hidden="true">
                      {nIdx + 1}.
                    </span>
                    <span>{renderRichParagraph(t(point), linkedUrls, href)}</span>
                  </li>
                ))}
              </ol>
            )}

            {sec.bullets && (
              <ul className="vm-bullets">
                {sec.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>
                    <span className="vm-list-marker" aria-hidden="true">
                      -
                    </span>
                    <span>{renderRichParagraph(t(bullet), linkedUrls, href)}</span>
                  </li>
                ))}
              </ul>
            )}

            {sec.visualId && (
              <VenomVisual visualId={sec.visualId} staticOnly={staticOnly} />
            )}

            {sec.callout && (
              <aside className={`vm-callout tone-${sec.callout.tone}`}>
                <span className="vm-callout-label">{t(sec.callout.label)}</span>
                <p>{t(sec.callout.text)}</p>
              </aside>
            )}

            {sec.table && (
              <div className="vm-table-wrap">
                <table className="vm-table">
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
              <div className="vm-checklist">
                {sec.checklist.map((item) => {
                  const checked = Boolean(checkedMap[item.id]);
                  return (
                    <label
                      key={item.id}
                      className={`vm-check-row${checked ? ' is-checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          setCheckedMap((prev) => ({ ...prev, [item.id]: e.target.checked }))
                        }
                      />
                      <div className="vm-check-body">
                        <strong>{t(item.label)}</strong>
                        <span>{t(item.detail)}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {sec.glossaryTerms && (
              <div className="vm-table-wrap">
                <table className="vm-table">
                  <caption>{t('24 Venom Model, Opening Range & BPR Definitions')}</caption>
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
              <div className="vm-baseline-stack">
                {sec.baselineSections.map((group) => (
                  <div key={group.code} className="vm-baseline-group">
                    <h3>
                      <span className="vm-num">{group.code}</span> · {t(group.heading)}
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
              <div className="vm-faq-stack">
                {sec.faqs.map((item, fIdx) => (
                  <LessonFaq
                    key={item.q}
                    id={`vm-faq-${fIdx + 1}`}
                    group="venom-model-faq"
                    question={t(item.q)}
                    className="vm-faq-item"
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

export const VenomRelatedLinks: React.FC = () => {
  const { t, href } = useTranslation();
  const links = [
    {
      title: 'Study First Presented FVG (09:30 Opening Session Reference)',
      path: '/learn/first-presented-fvg-opening-session-reference/',
    },
    {
      title: 'Compare ICT Silver Bullet (Time-Anchored 1-Hour FVG Model)',
      path: '/learn/ict-silver-bullet-time-anchored-fvg-entry-model/',
    },
    {
      title: 'Master the ICT 2022 Mentorship Model Step-by-Step',
      path: '/learn/the-ict-2022-mentorship-model-step-by-step/',
    },
    {
      title: 'Study The Unicorn Model (Breaker Block + Overlapping FVG)',
      path: '/learn/the-unicorn-model-breaker-fvg-high-confluence-setup/',
    },
    {
      title: 'Explore Smart Money Technique (SMT) Divergence Across NQ & ES',
      path: '/learn/smart-money-technique-smt-divergence/',
    },
    {
      title: 'Practice Opening-Session Entry Sequences in Trade Simulator',
      path: '/tools/simulator/',
    },
  ];

  return (
    <nav className="rr-related-reading" aria-label={t('Continue Studying Venom Model & Related Tools')}>
      <h2>{t('Continue Studying Venom Model & Related Tools')}</h2>
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
