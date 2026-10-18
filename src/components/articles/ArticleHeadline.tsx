import { AccentText, type AccentTone } from '../AccentText';
import type { Article } from '../../data/articles';

const emphasis: Record<string, { focus: string; urduFocus: string; tone: AccentTone }> = {
  'how-to-study-ict-without-collecting-setups': { focus: '37 labels', urduFocus: '37 لیبل', tone: 'coral' },
  'higher-timeframe-bias-to-lower-timeframe-execution': { focus: 'exit door', urduFocus: 'باہر نکلنے کا راستہ', tone: 'sage' },
  'pd-arrays-fvg-order-blocks-and-inversions': { focus: 'price boxes', urduFocus: 'قیمت کے ڈبوں', tone: 'violet' },
  'opening-range-vs-opening-gap-new-york': { focus: 'opening bell', urduFocus: 'مارکیٹ کھلنے کی گھنٹی', tone: 'coral' },
  'compare-ict-entry-models-without-hindsight': { focus: 'the rules', urduFocus: 'واضح اصولوں', tone: 'sage' },
  'a-good-trade-can-lose': { focus: 'lose', urduFocus: 'نقصان', tone: 'violet' },
  'drawdown-math-is-not-symmetric': { focus: 'hole', urduFocus: 'گڑھا', tone: 'coral' },
  'liquidity-is-not-a-magnet': { focus: 'magnet', urduFocus: 'مقناطیس', tone: 'sage' },
  'bitcoin-dashboard-is-not-a-crystal-ball': { focus: 'crystal ball', urduFocus: 'غیب کا حال', tone: 'violet' },
};

export function ArticleHeadline({ article }: { article: Article }) {
  const accent = emphasis[article.slug];
  return accent ? <AccentText text={article.title} {...accent}/> : <>{article.title}</>;
}
