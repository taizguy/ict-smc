import enDoc from './bslSslDocument.json';
import urDoc from './bslSslDocumentUrdu.json';
import { bslSslDates, bslSslQuizzes, bslSslSources, type BslSslSection } from './bslSslLesson';

const pairs: Array<[string, string]> = [
  [enDoc.h1, urDoc.h1],
  [enDoc.seoTitle, urDoc.seoTitle],
  [enDoc.metaDescription, urDoc.metaDescription],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [bslSslDates.published.label, '28 نومبر 2026'],
  [bslSslDates.updated.label, '28 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['BSL / SSL Mapping Rule', 'BSL / SSL نقشہ بندی اصول'],
  ['BSL Above Highs (Short Stops + Buy-Stops) · SSL Below Lows (Long Stops + Sell-Stops)', 'ہائیز کے اوپر BSL (شارٹ اسٹاپس + بائے اسٹاپس) · لوز کے نیچے SSL (لانگ اسٹاپس + سیل اسٹاپس)'],
  ['Chapter Contents', 'باب کے مندرجات'],
  ['On this page', 'اس صفحے پر'],
  ['Continue Studying', 'مزید مطالعہ جاری رکھیں'],
  ['Study Equal Highs & Equal Lows', 'برابر ہائیز اور برابر لوز کا مطالعہ کریں'],
  ['Study Liquidity Sweep vs. Stop Hunt', 'لیکویڈیٹی سویپ بمقابلہ اسٹاپ ہنٹ کا مطالعہ کریں'],
  ['Study Liquidity Engineering & Runs', 'لیکویڈیٹی انجینئرنگ اور رنز کا مطالعہ کریں'],
  ['Explore Higher-Timeframe Liquidity Maps', 'ہائر ٹائم فریم لیکویڈیٹی نقشوں کا مطالعہ کریں'],
  ['Practice in the Guided Chart Lab', 'گائیڈڈ چارٹ لیب میں مشق کریں'],
  ['Synthetic illustration — not live quotes.', 'مصنوعی تعلیمی خاکہ — لائیو قیمتیں نہیں۔'],
  // Visual strings
  ['Stick-Figure Story: The Two-Sided Fuel Tank', 'اسٹک فگر کہانی: دو طرفہ ایندھن کا ٹینک'],
  ['Concept Comic', 'تصوراتی کامک'],
  ['1. BSL Above Swing Highs', '1. سوئنگ ہائیز کے اوپر BSL'],
  ['2. SSL Below Swing Lows', '2. سوئنگ لوز کے نیچے SSL'],
  ['3. Two-Way Liquidity Map', '3. دو طرفہ لیکویڈیٹی نقشہ'],
  ['Short stop-losses and breakout buy-stops cluster overhead.', 'شارٹ اسٹاپ لاس اور بریک آؤٹ بائے اسٹاپس اوپر جمع ہوتے ہیں۔'],
  ['Long stop-losses and breakdown sell-stops cluster underneath.', 'لانگ اسٹاپ لاس اور بریک ڈاؤن سیل اسٹاپس نیچے جمع ہوتے ہیں۔'],
  ['Mapping both sides prevents tunnel vision on single swings.', 'دونوں طرف نقشہ بنانے سے ایک سوئنگ تک محدود نظر سے بچاؤ ہوتا ہے۔'],
  ['BSL vs. SSL Order-Type Anatomy', 'BSL بمقابلہ SSL آرڈر کی اقسام کی ساخت'],
  ['BSL View', 'BSL منظر'],
  ['SSL View', 'SSL منظر'],
  ['Order Mechanics', 'آرڈر میکینکس'],
  ['BSL: Buy-to-Cover + Buy-Stops', 'BSL: بائے ٹو کور + بائے اسٹاپس'],
  ['SSL: Sell-to-Close + Sell-Stops', 'SSL: سیل ٹو کلوز + سیل اسٹاپس'],
  ['3D Order-Cluster Liquidity Tower', '3D آرڈر کلسٹر لیکویڈیٹی ٹاور'],
  ['BSL Overhead Sweep', 'BSL بالائی سویپ'],
  ['SSL Underneath Sweep', 'SSL زیریں سویپ'],
  ['Balanced Range Tags', 'متوازن رینج ٹیگز'],
  ['Tower Orbit', 'ٹاور آربٹ'],
  ['Side Profile', 'سائیڈ پروفائل'],
  ['Play', 'چلائیں'],
  ['Pause', 'روکیں'],
  ['Reset', 'ری سیٹ'],
  ['Price pierces overhead BSL shelf, absorbs short stops, and reverses lower.', 'قیمت بالائی BSL شیلف کو چھوتی ہے، شارٹ اسٹاپس جذب کرتی ہے اور نیچے پلٹتی ہے۔'],
  ['Price pierces underneath SSL shelf, absorbs long stops, and reverses higher.', 'قیمت زیریں SSL شیلف کو چھوتی ہے، لانگ اسٹاپس جذب کرتی ہے اور اوپر پلٹتی ہے۔'],
  ['Price sweeps upper BSL first, then rotates down to tag lower SSL.', 'قیمت پہلے بالائی BSL کو سویپ کرتی ہے، پھر زیریں SSL تک گھومتی ہے۔'],
  ['Four-Tier Liquidity Pool Hierarchy', 'لیکویڈیٹی پولز کی چار درجاتی درجہ بندی'],
  ['Tier 1: PMH / PWH', 'درجہ 1: PMH / PWH'],
  ['Tier 2: PDH / Session', 'درجہ 2: PDH / سیشن'],
  ['Tier 3: EQH / EQL', 'درجہ 3: EQH / EQL'],
  ['Animated Sequence: BSL Sweep & Absorption', 'اینیمیٹڈ سلسلہ: BSL سویپ اور انجذاب'],
  ['Auto-Play', 'آٹو پلے'],
  ['Next Step', 'اگلا مرحلہ'],
  ['BSL / SSL Target Distance & Risk Calculator', 'BSL / SSL ہدف فاصلہ اور رسک کیلکولیٹر'],
  ['Entry Price', 'انٹری قیمت'],
  ['Target Pool Price', 'ہدف پول قیمت'],
  ['Stop Invalidation', 'اسٹاپ باطل حد'],
  ['Tick Size', 'ٹک سائز'],
  ['Direction', 'سمت'],
  ['Target Distance', 'ہدف فاصلہ'],
  ['Planned Risk', 'منصوبہ بند رسک'],
  ['BSL Target (Above)', 'BSL ہدف (اوپر)'],
  ['SSL Target (Below)', 'SSL ہدف (نیچے)'],
  ['At Pool', 'پول پر'],
  ['Sweep Rejection vs. Breakout Acceptance', 'سویپ ردِعمل بمقابلہ بریک آؤٹ قبولیت'],
  ['Sweep Rejection', 'سویپ ردِعمل'],
  ['Breakout Acceptance', 'بریک آؤٹ قبولیت'],
  ['24-Hour Session Pool Cycle', '24 گھنٹے کا سیشن پول چکر'],
  ['Worked Blueprints: NQ vs. EUR/USD', 'عملی بلیو پرنٹس: NQ بمقابلہ EUR/USD'],
  ['NQ PDH Raid', 'NQ PDH ریڈ'],
  ['EUR/USD Asia Low', 'EUR/USD ایشیا لو'],
  ['Common Mistakes in BSL / SSL Mapping', 'BSL / SSL نقشہ بندی میں عام غلطیاں'],
  ['Mistake 1: Line Clutter', 'غلطی 1: لکیروں کا ہجوم'],
  ['Mistake 2: Auto-Fade Every High', 'غلطی 2: ہر ہائی پر فوری ریورسل فرض کرنا'],
  ['Mistake 3: Confusing Stop Side', 'غلطی 3: اسٹاپ آرڈر کی سمت الجھانا'],
  ['Marking every 1m wick hides the major PDH/PDL and 4H pools.', 'ہر 1m وک کو نشان زد کرنے سے اہم PDH/PDL اور 4H پولز چھپ جاتے ہیں۔'],
  ['Treating every BSL tag as an automatic reversal ignores trend acceptance.', 'ہر BSL ٹیگ کو لازمی الٹاؤ سمجھنا ٹرینڈ قبولیت کو نظر انداز کرتا ہے۔'],
  ['Remember: short stop-losses are buy orders, not sell orders.', 'یاد رکھیں: شارٹ اسٹاپ لاس بائے آرڈرز ہوتے ہیں، سیل آرڈرز نہیں۔'],
  ['Pre-Replay BSL / SSL 6-Gate Checklist', 'ری پلے سے پہلے BSL / SSL 6-گیٹ چیک لسٹ'],
  ['Verify every gate before logging a BSL or SSL study in replay.', 'ری پلے میں BSL یا SSL مطالعہ درج کرنے سے پہلے ہر شرط کی تصدیق کریں۔'],
  ['Marked Tier 1–3 highs/lows (PWH/L, PDH/L, session, EQH/EQL) cleanly', 'درجہ 1–3 کے ہائیز/لوز (PWH/L، PDH/L، سیشن، EQH/EQL) صاف نشان زد کیے'],
  ['Verified whether target pool is BSL (buy-stops) or SSL (sell-stops)', 'تصدیق کی کہ ہدف پول BSL (بائے اسٹاپس) ہے یا SSL (سیل اسٹاپس)'],
  ['Separated observable chart swings from unknown order-book depth', 'نظر آنے والے چارٹ سوئنگز کو غیر مرئی آرڈر بک گہرائی سے الگ رکھا'],
  ['Checked close location (rejection inside vs. acceptance beyond pool)', 'کلوز کا مقام (اندر واپسی بمقابلہ باہر قبولیت) جانچا'],
  ['Measured tick distance to target vs. stop width (>= 2R preferred)', 'ہدف تک ٹک فاصلے کا اسٹاپ چوڑائی سے موازنہ کیا'],
  ['Recorded both counter-examples and successful sweeps objectively', 'ناکام اور کامیاب دونوں مثالیں غیر جانبدار طور پر درج کیں'],
  ['All synthetic BSL/SSL towers, NQ/EURUSD diagrams, and distance calculators are educational chart-reference studies, not live quotes or trade recommendations.', 'اس باب میں تمام مصنوعی BSL/SSL ٹاورز، NQ/EURUSD خاکے اور فاصلے کے کیلکولیٹرز تعلیمی چارٹ حوالہ جاتی مطالعات ہیں، لائیو قیمتیں یا تجارتی سفارشات نہیں۔'],
];

const quizUr: Array<[string, string]> = [
  ['Why are short sellers’ stop-losses above a swing high classified as Buyside Liquidity (BSL)?', 'سوئنگ ہائی کے اوپر شارٹ سیلرز کے اسٹاپ لاس کو بائے سائیڈ لیکویڈیٹی (BSL) کیوں کہا جاتا ہے؟'],
  ['Understanding order-book closing mechanics.', 'آرڈر بک کلوزنگ میکینکس کو سمجھنا۔'],
  ['Closing a short position requires buying back the asset, so the stop-loss executes as a buy order.', 'شارٹ پوزیشن بند کرنے کے لیے اثاثہ واپس خریدنا پڑتا ہے، اس لیے اسٹاپ لاس بائے آرڈر کے طور پر مکمل ہوتا ہے۔'],
  ['Closing a short position executes as a sell-stop order.', 'شارٹ پوزیشن بند کرنا سیل اسٹاپ آرڈر کے طور پر مکمل ہوتا ہے۔'],
  ['Exchanges convert all stop-losses into limit orders below support.', 'ایکسچینجز تمام اسٹاپ لاس کو سپورٹ کے نیچے لمٹ آرڈرز میں بدل دیتے ہیں۔'],
  ['A short seller must buy to cover, so stop-losses above highs generate buy flow alongside breakout buy-stops.', 'شارٹ سیلر کو پوزیشن بند کرنے کے لیے خریداری کرنی پڑتی ہے، اس لیے ہائیز کے اوپر اسٹاپس بریک آؤٹ بائے اسٹاپس کے ساتھ خریداری کا بہاؤ پیدا کرتے ہیں۔'],
  ['Where does Sellside Liquidity (SSL) rest on a price chart?', 'قیمت کے چارٹ پر سیل سائیڈ لیکویڈیٹی (SSL) کہاں موجود ہوتی ہے؟'],
  ['Locating stop-loss and breakdown clusters.', 'اسٹاپ لاس اور بریک ڈاؤن اجتماعات کی نشان دہی۔'],
  ['Below swing lows, Equal Lows, Previous Day Low (PDL), and session lows.', 'سوئنگ لوز، برابر لوز، پچھلے دن کے لو (PDL) اور سیشن لوز کے نیچے۔'],
  ['Above Previous Day High (PDH) and swing highs.', 'پچھلے دن کے ہائی (PDH) اور سوئنگ ہائیز کے اوپر۔'],
  ['Only at the exact midpoint of an Asian session range.', 'صرف ایشیائی سیشن رینج کے عین درمیانی نقطے پر۔'],
  ['Long buyers’ stop-losses (sell-to-close) and breakdown sell-stops cluster below lows.', 'لانگ خریداروں کے اسٹاپ لاس (سیل ٹو کلوز) اور بریک ڈاؤن سیل اسٹاپس لوز کے نیچے جمع ہوتے ہیں۔'],
  ['What does an OHLC candlestick chart NOT reveal about a BSL or SSL level?', 'OHLC کینڈل اسٹک چارٹ BSL یا SSL سطح کے بارے میں کیا ظاہر نہیں کرتا؟'],
  ['Separating observable structure from unobserved order depth.', 'مشاہداتی اسٹرکچر کو غیر مرئی آرڈر گہرائی سے الگ رکھنا۔'],
  ['The exact number of resting stop contracts or the identity of the participants behind them.', 'موجود اسٹاپ کنٹریکٹس کی اصل تعداد یا ان کے پیچھے شرکاء کی شناخت۔'],
  ['Where prior swing highs and swing lows formed on the chart.', 'چارٹ پر پچھلے سوئنگ ہائیز اور لوز کہاں بنے۔'],
  ['Whether price closed back inside or beyond the high/low after tagging it.', 'آیا سطح کو چھونے کے بعد قیمت اندر واپس بند ہوئی یا باہر۔'],
  ['Candlesticks show price history and closes, never live resting order quantities in the venue book.', 'کینڈل اسٹکس قیمت کی تاریخ اور کلوز دکھاتی ہیں، آرڈر بک میں موجود لائیو مقدار نہیں۔'],
  ['Does sweeping a BSL or SSL pool guarantee an immediate price reversal?', 'کیا BSL یا SSL پول کو سویپ کرنا فوری الٹاؤ کی ضمانت دیتا ہے؟'],
  ['Distinguishing sweeps from true breakout acceptance.', 'سویپس اور حقیقی بریک آؤٹ قبولیت میں فرق کرنا۔'],
  ['No; price can either reject back inside the range or accept beyond the level and continue trending.', 'نہیں؛ قیمت یا تو رینج کے اندر واپس پلٹ سکتی ہے یا سطح سے آگے قبولیت کے ساتھ ٹرینڈ جاری رکھ سکتی ہے۔'],
  ['Yes; every swing high sweep reverses 100% of the time.', 'جی ہاں؛ ہر سوئنگ ہائی سویپ 100% بار پلٹتا ہے۔'],
  ['Yes; SSL sweeps always produce a 50-pip bounce.', 'جی ہاں؛ SSL سویپ ہمیشہ 50 پپ کا باؤنس دیتا ہے۔'],
  ['Candle-body closes and higher-timeframe context determine whether a tag rejects or continues.', 'کینڈل باڈی کلوز اور ہائر ٹائم فریم سیاق طے کرتے ہیں کہ قیمت پلٹے گی یا جاری رہے گی۔'],
  ['Which liquidity tier generally carries broader intraday relevance for NY session study?', 'نیویارک سیشن کے مطالعے کے لیے کون سا لیکویڈیٹی درجہ عموماً زیادہ اہم ہوتا ہے؟'],
  ['Prioritizing liquidity tiers cleanly.', 'لیکویڈیٹی درجات کی صاف ترجیح بندی۔'],
  ['Previous Day High/Low (PDH/PDL), Asia High/Low, London High/Low, and clean 1H–4H Equal Highs/Lows.', 'پچھلے دن کا ہائی/لو (PDH/PDL)، ایشیا ہائی/لو، لندن ہائی/لو، اور 1H–4H پر صاف برابر ہائیز/لوز۔'],
  ['Every single 1-minute micro-wick inside a consolidation.', 'کنسولیڈیشن کے اندر ہر 1 منٹ کی معمولی وک۔'],
  ['Random horizontal lines with no swing anchor.', 'بغیر کسی سوئنگ اینکر کے بے ترتیب افقی لکیریں۔'],
  ['Session and daily boundaries attract broader participation than minor 1-minute wicks.', 'سیشن اور روزانہ کی حدود معمولی 1 منٹ کی وکس سے زیادہ وسیع شمولیت رکھتی ہیں۔'],
  ['ICT 2022 Mentorship — Episode 3 (Liquidity References)', 'ICT 2022 مینٹورشپ — قسط 3 (لیکویڈیٹی حوالے)'],
  ['CME Group — Order Types & Stop-Order Execution', 'CME گروپ — آرڈر کی اقسام اور اسٹاپ آرڈر کی تکمیل'],
  ['Consulted for buyside/sellside liquidity framing above swing highs and below swing lows. All synthetic NQ and EUR/USD diagrams in this chapter are LearnSMC educational models.', 'سوئنگ ہائیز کے اوپر اور سوئنگ لوز کے نیچے بائے سائیڈ/سیل سائیڈ لیکویڈیٹی کے فریم ورک کے لیے مشاورت کی گئی۔ اس باب میں تمام مصنوعی NQ اور EUR/USD خاکے LearnSMC کے تعلیمی ماڈل ہیں۔'],
  ['Consulted for standard exchange mechanics: stop orders become market orders once triggered.', 'معیاری ایکسچینج میکینکس کے لیے مشاورت کی گئی: ٹرگر ہونے پر اسٹاپ آرڈرز مارکیٹ آرڈرز بن جاتے ہیں۔'],
];
pairs.push(...quizUr);

for (const item of enDoc.takeaways) {
  const idx = enDoc.takeaways.indexOf(item);
  if (urDoc.takeaways[idx]) pairs.push([item, urDoc.takeaways[idx]]);
}
(enDoc.sections as BslSslSection[]).forEach((sec, si) => {
  const urSec = (urDoc.sections as BslSslSection[])[si];
  if (!urSec) return;
  pairs.push([sec.title, urSec.title]);
  sec.blocks.forEach((blk, bi) => {
    const urBlk = urSec.blocks[bi];
    if (!urBlk) return;
    if (blk.text && urBlk.text) pairs.push([blk.text, urBlk.text]);
    if (blk.title && urBlk.title) pairs.push([blk.title, urBlk.title]);
    blk.items?.forEach((it, ii) => {
      if (urBlk.items?.[ii]) pairs.push([it, urBlk.items[ii]]);
    });
    blk.rows?.forEach((row, ri) =>
      row.forEach((cell, ci) => {
        if (urBlk.rows?.[ri]?.[ci]) pairs.push([cell, urBlk.rows[ri][ci]]);
      }),
    );
  });
});
enDoc.faqs.forEach((faq, fi) => {
  if (urDoc.faqs[fi]) {
    pairs.push([faq.question, urDoc.faqs[fi].question]);
    pairs.push([faq.answer, urDoc.faqs[fi].answer]);
  }
});
// quizzes & sources translated above in quizUr

export const bslSslTranslations: Record<string, string> = Object.fromEntries(pairs);
