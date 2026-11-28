import enDoc from './sweepHuntDocument.json';
import urDoc from './sweepHuntDocumentUrdu.json';
import { sweepHuntDates, sweepHuntQuizzes, sweepHuntSources, type SweepHuntSection } from './sweepHuntLesson';

const pairs: Array<[string, string]> = [
  [enDoc.h1, urDoc.h1],
  [enDoc.seoTitle, urDoc.seoTitle],
  [enDoc.metaDescription, urDoc.metaDescription],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [sweepHuntDates.published.label, '28 نومبر 2026'],
  [sweepHuntDates.updated.label, '28 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['Observable Sweep Evidence Rule', 'مشاہداتی سویپ ثبوت اصول'],
  ['Observable = Wick Excursion + Body Close Location · Unobserved = Participant Identity & Motive', 'مشاہداتی = وک کا اخراج + باڈی کلوز کا مقام · غیر مرئی = شرکاء کی شناخت اور نیت'],
  ['Chapter Contents', 'باب کے مندرجات'],
  ['On this page', 'اس صفحے پر'],
  ['Continue Studying', 'مزید مطالعہ جاری رکھیں'],
  ['Study Buyside & Sellside Liquidity', 'بائے سائیڈ اور سیل سائیڈ لیکویڈیٹی کا مطالعہ کریں'],
  ['Study Equal Highs & Equal Lows', 'برابر ہائیز اور برابر لوز کا مطالعہ کریں'],
  ['Study Liquidity Engineering & Runs', 'لیکویڈیٹی انجینئرنگ اور رنز کا مطالعہ کریں'],
  ['Study Turtle Soup & Rejection Blocks', 'ٹرٹل سوپ اور ریجیکشن بلاکس کا مطالعہ کریں'],
  ['Practice in the Guided Chart Lab', 'گائیڈڈ چارٹ لیب میں مشق کریں'],
  ['Synthetic illustration — not live quotes.', 'مصنوعی تعلیمی خاکہ — لائیو قیمتیں نہیں۔'],
  // Visual strings
  ['Stick-Figure Story: Mind-Reading vs. Tape Evidence', 'اسٹک فگر کہانی: نیت کا اندازہ بمقابلہ چارٹ ثبوت'],
  ['Concept Comic', 'تصوراتی کامک'],
  ['1. Emotional Reaction', '1. جذباتی ردِعمل'],
  ['2. Order-Book Reality', '2. آرڈر بک حقیقت'],
  ['3. Objective Measurement', '3. غیر جانبدار پیمائش'],
  ['Calling every spike a predatory hunt explains nothing for the next trade.', 'ہر اسپائیک کو شکار قرار دینا اگلی ٹریڈ کے لیے کچھ واضح نہیں کرتا۔'],
  ['Triggered stops become market orders into thin opposing limit depth.', 'ٹرگر شدہ اسٹاپس کم لمٹ گہرائی میں مارکیٹ آرڈرز بن جاتے ہیں۔'],
  ['Measure tick excursion, candle close, and structure shift cleanly.', 'ٹک اخراج، کینڈل کلوز اور اسٹرکچر شفٹ کو صاف ناپیں۔'],
  ['Observable Evidence vs. Unobserved Intent Matrix', 'مشاہداتی ثبوت بمقابلہ غیر مرئی نیت میٹرکس'],
  ['What OHLC Shows', 'OHLC کیا دکھاتا ہے'],
  ['What OHLC Hides', 'OHLC کیا چھپاتا ہے'],
  ['3D Order-Book Sweep & Slippage Engine', '3D آرڈر بک سویپ اور سلپج انجن'],
  ['Clean Wick Sweep', 'صاف وک سویپ'],
  ['Thin-Book Slippage Spike', 'کم گہرائی سلپج اسپائیک'],
  ['True Breakout Acceptance', 'حقیقی بریک آؤٹ قبولیت'],
  ['Engine Orbit', 'انجن آربٹ'],
  ['Side Profile', 'سائیڈ پروفائل'],
  ['Play', 'چلائیں'],
  ['Pause', 'روکیں'],
  ['Reset', 'ری سیٹ'],
  ['Price pierces resting liquidity cleanly and closes back inside the range.', 'قیمت لیکویڈیٹی کو صاف چھوتی ہے اور واپس رینج کے اندر بند ہوتی ہے۔'],
  ['Stop-market cascade spikes sharply through thin depth before snapping back.', 'اسٹاپ مارکیٹ کاسکیڈ کم گہرائی میں تیزی سے اسپائیک کر کے واپس پلٹتا ہے۔'],
  ['Price closes and holds outside the level without snapping back inside.', 'قیمت سطح کے باہر بند ہو کر برقرار رہتی ہے اور اندر واپس نہیں پلٹتی۔'],
  ['Stop-Market Cascade & Slippage Diagram', 'اسٹاپ مارکیٹ کاسکیڈ اور سلپج خاکہ'],
  ['Animated Sequence: Stop Cascade → Absorption → Reclaim', 'اینیمیٹڈ سلسلہ: اسٹاپ کاسکیڈ ← انجذاب ← واپسی'],
  ['Auto-Play', 'آٹو پلے'],
  ['Next Step', 'اگلا مرحلہ'],
  ['Wick Excursion & Slippage Buffer Calculator', 'وک اخراج اور سلپج بفر کیلکولیٹر'],
  ['Reference Level', 'ریفرنس لیول'],
  ['Wick Extreme', 'وک کی انتہا'],
  ['Candle Close', 'کینڈل کلوز'],
  ['Tick Size', 'ٹک سائز'],
  ['Planned Slippage (Ticks)', 'متوقع سلپج (ٹکس)'],
  ['Classification', 'درجہ بندی'],
  ['Excursion', 'اخراج'],
  ['Slippage Buffer', 'سلپج بفر'],
  ['Sweep & Reclaim', 'سویپ اور واپسی'],
  ['Boundary Test', 'حد کا ٹیسٹ'],
  ['Breakout Acceptance', 'بریک آؤٹ قبولیت'],
  ['Clean Liquidity Sweep vs. News Whipsaw', 'صاف لیکویڈیٹی سویپ بمقابلہ نیوز وہپسا'],
  ['Clean Sweep', 'صاف سویپ'],
  ['News Whipsaw', 'نیوز وہپسا'],
  ['Session Transition Sweep Windows (ET)', 'سیشن تبدیلی سویپ ونڈوز (ET)'],
  ['Worked Blueprints: ES Open vs. CPI Spike', 'عملی بلیو پرنٹس: ES اوپن بمقابلہ CPI اسپائیک'],
  ['ES 09:32 Sweep', 'ES 09:32 سویپ'],
  ['CPI Two-Sided Spike', 'CPI دو طرفہ اسپائیک'],
  ['Common Mistakes Calling Moves Stop Hunts', 'حرکات کو اسٹاپ ہنٹ کہنے میں عام غلطیاں'],
  ['Mistake 1: Stop on EQH/EQL Edge', 'غلطی 1: EQH/EQL کنارے پر اسٹاپ'],
  ['Mistake 2: Ignoring News Spreads', 'غلطی 2: خبروں کا اسپریڈ نظر انداز کرنا'],
  ['Mistake 3: Skipping Close Check', 'غلطی 3: کلوز کی جانچ چھوڑنا'],
  ['Placing stops right at obvious double tops invites normal noise sweeps.', 'واضح ڈبل ٹاپ پر اسٹاپ رکھنا معمول کے شور میں ٹرگر ہونے کی دعوت ہے۔'],
  ['Wide CPI/NFP spreads are liquidity pullbacks, not clean directional sweeps.', 'CPI/NFP اسپریڈز لیکویڈیٹی کی کمی ہیں، صاف سمتی سویپس نہیں۔'],
  ['Always verify whether the candle body closed inside or outside the pool.', 'ہمیشہ جانچیں کہ کینڈل باڈی پول کے اندر بند ہوئی یا باہر۔'],
  ['Pre-Replay Sweep Observation 6-Gate Checklist', 'ری پلے سے پہلے سویپ مشاہدہ 6-گیٹ چیک لسٹ'],
  ['Verify every observable gate before recording a sweep study.', 'کوئی بھی سویپ مطالعہ درج کرنے سے پہلے ہر مشاہداتی شرط کی تصدیق کریں۔'],
  ['Marked exact reference swing high/low prior to sweep', 'سویپ سے پہلے درست ریفرنس سوئنگ ہائی/لو نشان زد کیا'],
  ['Measured wick excursion in ticks/pips beyond the reference', 'ریفرنس سے باہر وک کا اخراج ٹکس/پپس میں ناپا'],
  ['Verified candle-body close back inside (not acceptance beyond)', 'کینڈل باڈی کے اندر واپس بند ہونے کی تصدیق کی'],
  ['Checked economic calendar for CPI/NFP/FOMC spread-widening events', 'CPI/NFP/FOMC خبروں کے لیے معاشی کیلنڈر جانچا'],
  ['Added realistic stop-market slippage buffer in replay notes', 'ری پلے نوٹس میں حقیقی اسٹاپ مارکیٹ سلپج بفر شامل کیا'],
  ['Separated observable price action from unverified intent claims', 'مشاہداتی پرائس ایکشن کو غیر مصدقہ نیت کے دعوؤں سے الگ رکھا'],
  ['All synthetic sweep-vs-stop-hunt engines, slippage calculators, and ES/CPI diagrams are educational chart-reference studies, not live quotes or trade recommendations.', 'اس باب میں تمام مصنوعی سویپ بمقابلہ اسٹاپ ہنٹ انجنز، سلپج کیلکولیٹرز اور ES/CPI خاکے تعلیمی چارٹ حوالہ جاتی مطالعات ہیں، لائیو قیمتیں یا تجارتی سفارشات نہیں۔'],
];

const quizUr: Array<[string, string]> = [
  ['What can an OHLC candlestick chart actually prove during a sharp wick past support?', 'سپورٹ سے آگے تیز وک کے دوران OHLC کینڈل اسٹک چارٹ دراصل کیا ثابت کر سکتا ہے؟'],
  ['Separating observable tape evidence from inferred intent.', 'مشاہداتی چارٹ ثبوت کو مفروضہ نیت سے الگ رکھنا۔'],
  ['That price traded beyond the level and closed back inside; it never proves deliberate manipulation.', 'کہ قیمت سطح سے آگے گئی اور اندر واپس بند ہوئی؛ یہ کبھی جان بوجھ کر ہیرا پھیری ثابت نہیں کرتا۔'],
  ['The exact identity of the institution that triggered the stops.', 'اس ادارے کی اصل شناخت جس نے اسٹاپس ٹرگر کیے۔'],
  ['The exact number of retail stop contracts sitting below support.', 'سپورٹ کے نیچے موجود ریٹیل اسٹاپ کنٹریکٹس کی اصل تعداد۔'],
  ['Candlesticks show price excursion and close location, never participant identity or intent.', 'کینڈل اسٹکس قیمت کا اخراج اور کلوز کا مقام دکھاتی ہیں، شرکاء کی شناخت یا نیت نہیں۔'],
  ['Why do triggered stop-losses often experience slippage during a fast sweep?', 'تیز سویپ کے دوران ٹرگر ہونے والے اسٹاپ لاس پر اکثر سلپج کیوں ہوتا ہے؟'],
  ['Stop-market conversion in thin order books.', 'کم گہرائی والی آرڈر بکس میں اسٹاپ مارکیٹ تبدیلی۔'],
  ['Stop-loss orders become market orders upon trigger and fill across thin opposing limit depth.', 'ٹرگر ہونے پر اسٹاپ لاس آرڈرز مارکیٹ آرڈرز بن جاتے ہیں اور کم مخالف لمٹ گہرائی میں بھرتے ہیں۔'],
  ['Exchanges pause limit orders for 60 seconds during every wick.', 'ایکسچینجز ہر وک کے دوران 60 سیکنڈ کے لیے لمٹ آرڈرز روک دیتی ہیں۔'],
  ['Stop orders always convert into passive limit orders.', 'اسٹاپ آرڈرز ہمیشہ پیسیو لمٹ آرڈرز میں بدل جاتے ہیں۔'],
  ['Cascading market orders consume nearby limit orders quickly, stretching fill prices.', 'مارکیٹ آرڈرز کا سیلاب قریبی لمٹ آرڈرز کو تیزی سے ختم کر کے بھرنے کی قیمتوں کو کھینچ دیتا ہے۔'],
  ['How does the term "liquidity sweep" differ from "stop hunt"?', '"لیکویڈیٹی سویپ" کی اصطلاح "اسٹاپ ہنٹ" سے کیسے مختلف ہے؟'],
  ['Framing market mechanics vs. intent.', 'مارکیٹ میکینکس بمقابلہ نیت کا زاویہ۔'],
  ['Liquidity sweep focuses on mechanical order absorption; stop hunt implies deliberate targeting.', 'لیکویڈیٹی سویپ آرڈرز کے میکینیکل انجذاب پر مرکوز ہے؛ اسٹاپ ہنٹ جان بوجھ کر ہدف بنانے کا تاثر دیتا ہے۔'],
  ['Liquidity sweep only happens in crypto, while stop hunt only happens in forex.', 'لیکویڈیٹی سویپ صرف کرپٹو میں ہوتا ہے جبکہ اسٹاپ ہنٹ صرف فاریکس میں۔'],
  ['Stop hunts never leave wicks on candles.', 'اسٹاپ ہنٹس کبھی کینڈلز پر وکس نہیں چھوڑتے۔'],
  ['Both describe the same observable excursion, viewed through mechanical vs. intent lenses.', 'دونوں ایک ہی مشاہداتی حرکت کو میکینیکل بمقابلہ نیت کے زاویے سے بیان کرتے ہیں۔'],
  ['Why should traders be cautious calling a CPI or NFP spike a clean liquidity sweep setup?', 'CPI یا NFP اسپائیک کو صاف لیکویڈیٹی سویپ سیٹ اپ کہنے میں ٹریڈرز کو احتیاط کیوں کرنی چاہیے؟'],
  ['Distinguishing sweeps from spread-widening news whipsaws.', 'سویپس اور اسپریڈ پھیلنے والے نیوز وہپسا میں فرق کرنا۔'],
  ['Liquidity providers widen spreads and pull depth around major releases, creating two-sided erratic wicks.', 'بڑی خبروں کے وقت لیکویڈیٹی فراہم کنندگان اسپریڈ بڑھا کر گہرائی ہٹا لیتے ہیں، جس سے دو طرفہ بے ترتیب وکس بنتی ہیں۔'],
  ['News spikes never cross Equal Highs.', 'خبروں کے اسپائیکس کبھی برابر ہائیز کو عبور نہیں کرتے۔'],
  ['Exchanges ban stop-losses during CPI.', 'ایکسچینجز CPI کے دوران اسٹاپ لاس پر پابندی لگاتی ہیں۔'],
  ['Spread widening and pulled depth during macro releases create unreliable two-sided spikes.', 'میکرو خبروں کے دوران پھیلتا اسپریڈ اور کم گہرائی غیر معتبر دو طرفہ اسپائیکس بناتے ہیں۔'],
  ['What helps reduce vulnerability to routine liquidity sweeps?', 'معمول کے لیکویڈیٹی سویپس سے متاثر ہونے کے خطرے کو کم کرنے میں کیا مدد کرتا ہے؟'],
  ['Practical stop-placement and buffer hygiene.', 'عملی اسٹاپ پلیسمنٹ اور بفر اصول۔'],
  ['Avoiding obvious EQH/EQL edges, adding slippage buffers, or using close-based invalidation rules.', 'واضح EQH/EQL کناروں سے بچنا، سلپج بفر شامل کرنا، یا کلوز پر مبنی باطل حد استعمال کرنا۔'],
  ['Removing stop-losses completely.', 'اسٹاپ لاس کو مکمل طور پر ہٹا دینا۔'],
  ['Placing every stop 1 tick above a double top.', 'ہر اسٹاپ کو ڈبل ٹاپ سے 1 ٹک اوپر رکھنا۔'],
  ['Placing stops away from obvious retail edges with realistic buffers reduces routine noise exits.', 'واضح ریٹیل کناروں سے دور حقیقی بفر کے ساتھ اسٹاپ رکھنا معمول کے شور سے بچاتا ہے۔'],
  ['CME Group — Stop Orders and Market Order Execution', 'CME گروپ — اسٹاپ آرڈرز اور مارکیٹ آرڈر کی تکمیل'],
  ['ICT 2022 Mentorship — Episode 3 (Liquidity Sweeps)', 'ICT 2022 مینٹورشپ — قسط 3 (لیکویڈیٹی سویپس)'],
  ['Consulted for stop-market conversion and slippage mechanics in electronic order books.', 'الیکٹرانک آرڈر بکس میں اسٹاپ مارکیٹ تبدیلی اور سلپج میکینکس کے لیے مشاورت کی گئی۔'],
  ['Consulted for sweep-and-reclaim structural study conventions. Synthetic slippage calculators and blueprints are original LearnSMC study aids.', 'سویپ اینڈ ریکلیم ساختی مطالعے کے اصولوں کے لیے مشاورت کی گئی۔ مصنوعی سلپج کیلکولیٹرز اور بلیو پرنٹس LearnSMC کے اصل تعلیمی ذرائع ہیں۔'],
];
pairs.push(...quizUr);

for (const item of enDoc.takeaways) {
  const idx = enDoc.takeaways.indexOf(item);
  if (urDoc.takeaways[idx]) pairs.push([item, urDoc.takeaways[idx]]);
}
(enDoc.sections as SweepHuntSection[]).forEach((sec, si) => {
  const urSec = (urDoc.sections as SweepHuntSection[])[si];
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

export const sweepHuntTranslations: Record<string, string> = Object.fromEntries(pairs);
