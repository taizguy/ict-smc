import type { LabBar } from '../utils/backtestEngine';
export type BreakerText = readonly [string,string];
export const BREAKER_PATH='/tools/chartlab/eurusd-failed-ob-breaker/';
export const breakerMeta={
 title:['ICT Bearish Breaker Block: EUR/USD Chart Lab | LearnSMC','ICT بیئرش بریکر بلاک: EUR/USD چارٹ لیب | LearnSMC'] as BreakerText,
 h1:['ICT bearish breaker block: EUR/USD chart practice','ICT بیئرش بریکر بلاک: EUR/USD چارٹ مشق'] as BreakerText,
 description:['Study an ICT bearish breaker block on EUR/USD: mark the failed order block, compare close-through and wick-only cases, and test retests and invalidation.','EUR/USD پر ICT بیئرش بریکر بلاک کی مشق کریں: ناکام آرڈر بلاک نشان زد کریں، بند قیمت اور صرف وِک کا فرق دیکھیں، پھر دوبارہ جانچ اور ابطال سمجھیں۔'] as BreakerText,
};
export const breakerReview='2026-11-02';
export const breakerStages:BreakerText[]=[['Mark the original block','اصل بلاک نشان زد کریں'],['Check the high sweep','اونچی سطح کا سویپ دیکھیں'],['Test the closing price','بند قیمت کی شرط جانچیں'],['Inspect the retest','دوبارہ جانچ دیکھیں'],['Judge the response','قیمت کا ردِعمل پرکھیں'],['Compare the outcome','نتیجے کا موازنہ کریں']];
export type BreakerCase={id:string;name:BreakerText;zone:[number,number];priorHigh:number;rows:number[][];counts:number[];kind:'rejection'|'reclaim'|'no-retest'|'wick-only';};
/** All OHLC values are authored, invented EUR/USD quotes, not a downloaded feed.
 * 6 January 2026 is an illustrative clock label only. 15-minute bars, UTC. */
export const breakerCases:BreakerCase[]=(import.meta.env?.SSR ?? typeof window==='undefined')?(await import('./breakerCaseSource')).breakerCases:[];
export const breakerBars=(c:BreakerCase):LabBar[]=>c.rows.map(([open,high,low,close],i)=>({time:new Date(Date.UTC(2026,0,6,8,i*15)).toISOString(),open,high,low,close}));
export const quote=(v:number)=>v.toFixed(4);
export function breakerEvidence(c:BreakerCase){
 const bars=breakerBars(c), failed=bars[6].close<c.zone[0];
 const retest=failed?bars.findIndex((b,i)=>i>6&&b.high>=c.zone[0]&&b.low<=c.zone[1]):-1;
 const reclaim=failed?bars.findIndex((b,i)=>i>6&&b.close>c.zone[1]):-1;
 const rejection=retest>=0?bars.findIndex((b,i)=>i>retest&&b.close<c.zone[0]):-1;
 return {origin:3,sweep:5,closeTest:6,swept:bars[5].high>c.priorHigh&&bars[5].close<c.priorHigh,failed,retest,reclaim,rejection};
}
export const breakerFaqs: {q:BreakerText;a:BreakerText}[]=[
 {q:['What is a bearish breaker block in ICT?','ICT میں بیئرش بریکر بلاک کیا ہے؟'],a:['In this exercise it is a previously selected bullish order-block zone that price closes below after sweeping a prior high. The same boundaries become a candidate resistance area on a return from below. The label describes a price-action interpretation, not observed institutional orders or a guaranteed reversal.','اس مشق میں یہ پہلے سے منتخب بلش آرڈر بلاک کا زون ہے جس سے قیمت سابقہ ہائی کا سویپ کرنے کے بعد نیچے بند ہوتی ہے۔ وہی حدیں نیچے سے واپسی پر ممکنہ مزاحمت بنتی ہیں۔ یہ پرائس ایکشن کی تشریح ہے، ادارہ جاتی آرڈرز کا مشاہدہ یا یقینی پلٹاؤ نہیں۔']},
 {q:['Is a breaker block the same as an order block?','کیا بریکر بلاک اور آرڈر بلاک ایک ہی ہیں؟'],a:['They refer to different stages of the same selected zone. The original bullish block is studied as potential support before failure. Only after a qualifying close through its lower boundary do we investigate bearish role reversal. Simply touching the zone does not change its role.','یہ منتخب زون کے مختلف مراحل ہیں۔ ناکامی سے پہلے اصل بلش بلاک ممکنہ سپورٹ ہے۔ اس کی نچلی حد سے نیچے شرط کے مطابق بند ہونے کے بعد ہی مندی کی رول ریورسل جانچتے ہیں۔ صرف زون چھونا اس کا کردار نہیں بدلتا۔']},
 {q:['Does a wick through an order block make it a breaker?','کیا آرڈر بلاک کے پار وِک بننے سے بریکر بن جاتا ہے؟'],a:['Not under the closing-price convention used here. In Case D the low is 1.1008, below the 1.1010 boundary, but the candle closes at 1.1014 inside the zone. A wick-based method would classify this differently; record the method before reviewing outcomes.','یہاں بند قیمت کی شرط کے تحت نہیں۔ کیس D میں لو 1.1008 ہے، یعنی 1.1010 سے نیچے، لیکن کینڈل 1.1014 پر زون کے اندر بند ہوتی ہے۔ وِک کی بنیاد پر طریقہ اسے مختلف سمجھے گا؛ نتیجہ دیکھنے سے پہلے اپنا طریقہ لکھیں۔']},
 {q:['What invalidates a bearish breaker retest?','بیئرش بریکر کی دوبارہ جانچ کب باطل ہوتی ہے؟'],a:['This study rejects the bearish hold when a later candle closes above the unchanged zone high. Case B closes at 1.0932 above 1.0930. That is a study rule, not an executable stop: a real stop order may trigger on an intrabar quote and suffer spread or slippage.','اس مطالعے میں بعد کی کینڈل کا زون کی غیر تبدیل شدہ بالائی حد سے اوپر بند ہونا مندی کی ہولڈ تشریح باطل کرتا ہے۔ کیس B میں 1.0930 کے اوپر 1.0932 پر بندش ہے۔ یہ مطالعے کی شرط ہے، حقیقی اسٹاپ آرڈر نہیں؛ اسٹاپ دورانِ کینڈل قیمت پر متحرک ہو سکتا ہے اور اسپریڈ یا سلپیج ہو سکتی ہے۔']},
 {q:['What is the difference between a breaker and a mitigation block?','بریکر اور مٹیگیشن بلاک میں کیا فرق ہے؟'],a:['A common ICT distinction is whether the reversal first takes a prior swing high or low: the breaker sequence includes that sweep; the mitigation interpretation does not require the same taken swing. Candle selection and boundary conventions still differ between teachers. This lab states a sweep-plus-close convention and does not silently treat every broken zone as equivalent.','ICT کی ایک عام تفریق یہ ہے کہ پلٹاؤ سے پہلے سابقہ سوئنگ ہائی یا لو لیا گیا یا نہیں: بریکر کی ترتیب میں سویپ شامل ہے؛ مٹیگیشن کی تشریح میں وہی سوئنگ لینا ضروری نہیں۔ کینڈل اور حدیں منتخب کرنے میں بھی اساتذہ کی روایات مختلف ہو سکتی ہیں۔ یہ لیب سویپ اور بند قیمت کی واضح شرط استعمال کرتی ہے؛ ہر ٹوٹا زون خودکار طور پر ایک جیسا نہیں۔']},
];
export const breakerSources=[
 {title:'The Inner Circle Trader · Month 04: ICT Breaker Block',url:'https://www.youtube.com/watch?v=UrS-mtGHtAA',note:['Official lesson for further study; the original concept source. Our candles and questions are independently authored.','مزید مطالعے کے لیے اصل استاد کا سبق؛ ہماری کینڈلز اور سوالات الگ تحریر کیے گئے ہیں۔'] as BreakerText},
 {title:'Flux Charts · Breaker Blocks (BB) Explained',url:'https://www.fluxcharts.com/articles/breaker-blocks-bb-explained',note:['Independent comparison of block failure and role reversal; discusses wick and close conventions.','بلاک کی ناکامی اور رول ریورسل کا آزاد موازنہ؛ وِک اور بند قیمت کی روایات کی وضاحت۔'] as BreakerText},
 {title:'Road_2_Funded · ICT Breaker & Mitigation Blocks Explained',url:'https://fr.tradingview.com/chart/GBPCAD/3M3OxgVu-ICT-Breaker-Mitigation-Blocks-EXPLAINED/',note:['Community explanation on TradingView; useful for comparing sweep and mitigation interpretations, not performance evidence.','TradingView پر کمیونٹی کی وضاحت؛ سویپ اور مٹیگیشن کی تشریحات کے موازنے کے لیے، کارکردگی کے ثبوت کے طور پر نہیں۔'] as BreakerText},
];
export const breakerTranslations={...Object.fromEntries(Object.values(breakerMeta)),
 'Bearish breaker':'بیئرش بریکر',
 'Interactive chart exercise':'انٹرایکٹو چارٹ مشق',
 'Practice':'مشق',
 'Study the definition, then test the chart':'تعریف سمجھیں، پھر چارٹ جانچیں',
 'Breaker blocks: the full lesson':'بریکر بلاکس: مکمل سبق',
 'EUR/USD: Bearish breaker block practice':'EUR/USD: بیئرش بریکر بلاک کی مشق',
 'Practise bearish breakers on four EUR/USD chart cases':'EUR/USD کے چار چارٹ کیسز پر بیئرش بریکر کی مشق کریں',
 'Four original EUR/USD price paths: rejection, reclaim, no retest and wick-only failure.':'EUR/USD کے چار اصل فرضی راستے: مسترد ہونا، زون سے اوپر واپسی، دوبارہ جانچ نہ ہونا اور صرف وِک والی ناکامی۔',
};
