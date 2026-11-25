import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpDown,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  CheckSquare,
  Clock,
  Compass,
  Database,
  EyeOff,
  Flame,
  Gauge,
  Gavel,
  Globe,
  HelpCircle,
  Info,
  Layers,
  ListOrdered,
  Scale,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  orderBookDocument as lesson,
  orderBookPath,
  orderBookSources,
  type OrderBookBlock,
} from '../data/chapters/orderBookLesson';
import { useTranslation } from '../i18n/TranslationProvider';
import { LessonExtract } from './LessonExtract';
import { LessonFaq } from './LessonFaq';
import { OrderBookVisual, type OrderBookVisualKind } from './OrderBookVisual';

const iconMap: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  'book-open': BookOpen,
  'arrow-up-down': ArrowUpDown,
  zap: Zap,
  layers: Layers,
  database: Database,
  'list-ordered': ListOrdered,
  scale: Scale,
  gauge: Gauge,
  flame: Flame,
  activity: Activity,
  'eye-off': EyeOff,
  clock: Clock,
  'shield-alert': ShieldAlert,
  gavel: Gavel,
  globe: Globe,
  'candlestick-chart': Activity,
  'alert-triangle': AlertTriangle,
  'check-square': CheckSquare,
  bookmark: Bookmark,
  'help-circle': HelpCircle,
  compass: Compass,
};

const sectionVisuals: Record<number, OrderBookVisualKind[]> = {
  1: ['anatomy'],
  3: ['matching-animation'],
  4: ['depth-dom-pair'],
  5: ['data-tiers'],
  6: ['queue-simulator'],
  7: ['book-walker'],
  8: ['obi-sandbox'],
  9: ['heatmap-playback'],
  11: ['iceberg-reload'],
  14: ['auction-uncross'],
  16: ['smc-bridge'],
};

const sectionAnchors: Record<number, string> = {
  1: 'definition',
  4: 'dom-and-depth',
  5: 'market-data-tiers',
  7: 'slippage-math',
  8: 'obi-microprice',
  13: 'spoofing-layering',
  15: 'market-comparison',
  19: 'glossary',
  20: 'faq',
};

const contextTerms: Array<[string[], string]> = [
  [['matching engine', 'matches orders', 'میچنگ انجن'], '/learn/how-an-exchange-matches-orders/'],
  [['What Moves Price', 'moves price', 'price moves', 'قیمت کی حرکت'], '/learn/what-actually-moves-price/'],
  [['Market liquidity', 'resting liquidity', 'liquidity provider', 'لیکویڈیٹی فراہم کنندگان'], '/learn/liquidity-the-most-misunderstood-word-in-trading/'],
  [['liquidity sweep', 'liquidity sweeps', 'stop runs', 'لیکویڈیٹی سویپ'], '/learn/liquidity-engineering-and-liquidity-runs/'],
  [['Buy-Side Liquidity', 'BSL', 'buy stops', 'بائے اسٹاپس'], '/tools/glossary/liquidity/buy-side-liquidity/'],
  [['Sell-Side Liquidity', 'SSL', 'sell stops', 'سیل اسٹاپس'], '/tools/glossary/liquidity/sell-side-liquidity/'],
  [['displacement', 'ڈسپلیسمنٹ'], '/learn/why-candles-form-and-how-displacement-arises/'],
  [['Fair Value Gaps', 'Fair Value Gap', 'FVGs', 'FVG'], '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
  [['Order Block', 'Order Blocks', 'آرڈر بلاک'], '/learn/order-blocks-ob-and-mitigation/'],
  [['Breaker Block', 'Breaker Blocks', 'بریکر بلاک'], '/learn/breaker-blocks-trading-failed-order-blocks/'],
  [['Market Structure Shift', 'MSS'], '/learn/market-structure-shift-mss-verified-directional-shift/'],
  [['Session Liquidity', 'New York session', 'London', 'سیشن'], '/learn/time-and-session-liquidity-the-global-clock/'],
  [['slippage', 'news spikes', 'سلپیج'], '/learn/ict-news-volatility-no-trade-framework/'],
  [['Market Maker', 'MMBM', 'MMSM'], '/learn/ict-charter-models-6-and-7-universal-models/'],
  [['2022 Model', '2022 ماڈل'], '/learn/ict-charter-model-13-2022-youtube-model/'],
  [['Silver Bullet', 'سلور بُلٹ'], '/learn/silver-bullet-model/'],
  [['Bid-Ask Spread', 'Depth of Market', 'DOM', 'Order Book Imbalance', 'بِڈ آسک اسپریڈ'], '/tools/glossary/foundations/order-book-market-liquidity/'],
  [['Chart Lab', 'Chart Laboratory', 'چارٹ لیب'], '/tools/chartlab/'],
  [['Backtest Lab', 'replay', 'ری پلے'], '/tools/backtest/'],
  [['Trade Simulator', 'paper trading'], '/tools/simulator/'],
];

const interactiveChecklistItems = [
  'Confirmed venue scope (single futures CLOB, fragmented equity/crypto book, or OTC dealer feed)',
  'Checked current bid-ask spread in ticks relative to average session spread',
  'Compared planned position size against displayed size in the top 3 price ticks',
  'Verified whether resting depth held or cancelled when price approached',
  'Separated passive resting walls from actual executed prints on Time & Sales',
  'Pre-selected limit vs. stop-market exit rules before opening any replay position',
];

export function OrderBookContent({ staticOnly = false }: { staticOnly?: boolean }) {
  const { t, href } = useTranslation();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const linkedCounts = new Map<string, number>();
  const marked = new Set<string>();

  const highlightPhrases = [
    'Central Limit Order Book (CLOB)',
    'Price-Time Priority',
    'Volume-Weighted Average Fill',
    'Cancellation alone never proves unlawful intent',
    'Order Book Imbalance',
  ];

  const prose = (source: string): React.ReactNode => {
    const text = t(source);
    const candidates = contextTerms
      .flatMap(([names, url]) => {
        if (url === orderBookPath || (linkedCounts.get(url) ?? 0) >= 2) return [];
        return names.flatMap((name) => {
          const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const match = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'iu').exec(text);
          return match ? [{ start: match.index, end: match.index + match[0].length, url }] : [];
        });
      })
      .sort((a, b) => a.start - b.start || b.end - a.end);

    const selected: typeof candidates = [];
    const seenInBlock = new Set<string>();
    for (const item of candidates) {
      if (selected.length >= 3) break;
      if (seenInBlock.has(item.url) || selected.some((r) => r.end > item.start)) continue;
      selected.push(item);
      seenInBlock.add(item.url);
    }

    const applyMark = (val: string) => {
      const m = highlightPhrases.find((p) => !marked.has(p) && val.includes(p));
      if (!m) return val;
      marked.add(m);
      const idx = val.indexOf(m);
      return (
        <>
          {val.slice(0, idx)}
          <mark className={`fvg-mark fvg-mark-${marked.size % 3}`}>{m}</mark>
          {val.slice(idx + m.length)}
        </>
      );
    };

    if (selected.length === 0) return applyMark(text);
    const out: React.ReactNode[] = [];
    let cursor = 0;
    selected.forEach((hit, idx) => {
      linkedCounts.set(hit.url, (linkedCounts.get(hit.url) ?? 0) + 1);
      if (hit.start > cursor) {
        out.push(<React.Fragment key={`t-${idx}`}>{applyMark(text.slice(cursor, hit.start))}</React.Fragment>);
      }
      out.push(
        <a key={`l-${idx}`} className="fvg-context-link" href={href(hit.url)}>
          {text.slice(hit.start, hit.end)}
        </a>,
      );
      cursor = hit.end;
    });
    if (cursor < text.length) {
      out.push(<React.Fragment key="t-end">{applyMark(text.slice(cursor))}</React.Fragment>);
    }
    return <>{out}</>;
  };

  const renderBlock = (block: OrderBookBlock, idx: number) => {
    if (block.type === 'callout') {
      const WarnIcon = block.tone === 'warn' ? AlertTriangle : Info;
      return (
        <aside key={idx} className={`ob-callout ${block.tone === 'warn' ? 'ob-callout-warn' : ''}`}>
          <div className="ob-callout-head">
            <WarnIcon size={16} aria-hidden="true" />
            <strong>{t(block.title || '')}</strong>
          </div>
          <p>{prose(block.text || '')}</p>
        </aside>
      );
    }

    if (block.type === 'table') {
      const rows = block.rows || [];
      return (
        <div
          className="fvg-table-scroll ob-table-wrap"
          tabIndex={0}
          role="region"
          aria-label={rows[0]?.filter(Boolean).map((c) => t(c)).join(' / ')}
          key={idx}
        >
          <table>
            <thead>
              <tr>
                {rows[0]?.map((cell, cIdx) => (
                  <th key={cIdx} scope="col">
                    {t(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) =>
                    cIdx === 0 ? (
                      <th key={cIdx} scope="row">
                        {t(cell)}
                      </th>
                    ) : (
                      <td key={cIdx}>{prose(cell)}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (block.type === 'list') {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag key={idx} className="ob-styled-list">
          {(block.items || []).map((item, iIdx) => (
            <li key={iIdx}>{prose(item)}</li>
          ))}
        </Tag>
      );
    }

    return (
      <p data-lesson-content="" key={idx}>
        {prose(block.text || '')}
      </p>
    );
  };

  return (
    <div className="fvg-document order-book-document">
      <section className="fvg-takeaways ob-takeaways">
        <h2>
          <Sparkles size={17} aria-hidden="true" />
          {t('Key Takeaways')}
        </h2>
        <ul>
          {lesson.takeaways.map((point) => (
            <li key={point}>{prose(point)}</li>
          ))}
        </ul>
      </section>

      <nav className="liquidity-toc ob-toc" aria-label={t('Table of Contents')}>
        <details>
          <summary>{t('Table of Contents')}</summary>
          <ol>
            {lesson.sections.map((sec, idx) => (
              <li key={sec.number}>
                <a href={`#rr-section-${idx}`}>{t(sec.title.replace(/^\d+\.\s*/, ''))}</a>
              </li>
            ))}
          </ol>
        </details>
      </nav>

      {lesson.sections.map((sec, idx) => {
        const Icon = iconMap[sec.icon] || BookOpen;
        return (
          <section className="rr-text-section fvg-document-section" id={`rr-section-${idx}`} key={sec.number}>
            {sectionAnchors[sec.number] && <span id={sectionAnchors[sec.number]} className="liquidity-anchor" />}
            <h2 className="ob-sec-head">
              <span className="ob-sec-icon" aria-hidden="true">
                <Icon size={16} />
              </span>
              <span>{t(sec.title)}</span>
            </h2>

            {sec.blocks.map((block, bIdx) => {
              if (sec.number === 1 && bIdx === 1) {
                return (
                  <LessonExtract key={bIdx} name="Central Limit Order Book" kind="definition">
                    <div itemProp="description">{renderBlock(block, bIdx)}</div>
                  </LessonExtract>
                );
              }
              if (sec.number === 7 && bIdx === 2) {
                return (
                  <LessonExtract key={bIdx} name="Volume-Weighted Average Fill" kind="formula">
                    <div itemProp="description">{renderBlock(block, bIdx)}</div>
                  </LessonExtract>
                );
              }
              if (sec.number === 8 && bIdx === 1) {
                return (
                  <LessonExtract key={bIdx} name="Order Book Imbalance & Microprice" kind="formula">
                    <div itemProp="description">{renderBlock(block, bIdx)}</div>
                  </LessonExtract>
                );
              }
              return renderBlock(block, bIdx);
            })}

            {sectionVisuals[sec.number]?.map((kind) => (
              <OrderBookVisual key={kind} kind={kind} staticOnly={staticOnly} />
            ))}

            {sec.number === 18 && !staticOnly && (
              <div className="ob-interactive-check" role="group" aria-label={t('Interactive Study Checklist')}>
                {interactiveChecklistItems.map((label, cIdx) => (
                  <label key={label}>
                    <input
                      type="checkbox"
                      checked={Boolean(checkedItems[cIdx])}
                      onChange={(e) => setCheckedItems((prev) => ({ ...prev, [cIdx]: e.target.checked }))}
                    />
                    <span>{t(label)}</span>
                  </label>
                ))}
                <p className="ob-check-status" role="status">
                  {Object.values(checkedItems).filter(Boolean).length} / {interactiveChecklistItems.length}{' '}
                  {t('checks completed')}
                </p>
              </div>
            )}

            {sec.number === 20 && (
              <div className="fvg-faq" id="order-book-faq">
                {lesson.faqs.map((faq, fIdx) => (
                  <LessonFaq
                    key={fIdx}
                    id={`order-book-faq-${fIdx}`}
                    group="order-book-faq"
                    className="fvg-faq-card"
                    question={t(faq.question)}
                  >
                    <p>{prose(faq.answer)}</p>
                  </LessonFaq>
                ))}
              </div>
            )}

            {sec.number === 21 && (
              <aside className="liquidity-section-sources" aria-label={t('Technical exchange references')}>
                <strong>{t('Verified exchange and regulatory references')}</strong>
                <ul>
                  {orderBookSources.map((src) => (
                    <li key={src.url}>
                      <a href={src.url} rel="noopener noreferrer">
                        {t(src.title)}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function OrderBookRelatedLinks() {
  const { t, href } = useTranslation();
  return (
    <nav className="rr-related-reading" aria-label={t('Continue Studying')}>
      <h2>{t('Continue Studying')}</h2>
      <ul>
        {[
          ['What Actually Moves Price?', '/learn/what-actually-moves-price/'],
          ['How an Exchange Matches Orders', '/learn/how-an-exchange-matches-orders/'],
          ['What Is Liquidity in Trading?', '/learn/liquidity-the-most-misunderstood-word-in-trading/'],
          ['Fair Value Gaps (FVG) & Consequent Encroachment', '/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
          ['Order Book & Liquidity Glossary', '/tools/glossary/foundations/order-book-market-liquidity/'],
          ['Chart Lab Practice', '/tools/chartlab/'],
          ['Explore All Market Foundations Lessons', '/curriculum/market-foundations/'],
        ].map(([label, path]) => (
          <li key={path}>
            <a className="fvg-context-link" href={href(path)}>
              <span>{t(label)}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
