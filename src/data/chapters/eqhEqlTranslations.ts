import enDoc from './eqhEqlDocument.json';
import urDoc from './eqhEqlDocumentUrdu.json';
import { eqhEqlDates, eqhEqlQuizzes, eqhEqlSources, type EqhEqlSection } from './eqhEqlLesson';

const pairs: Array<[string, string]> = [
  [enDoc.h1, urDoc.h1],
  [enDoc.seoTitle, urDoc.seoTitle],
  [enDoc.metaDescription, urDoc.metaDescription],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [eqhEqlDates.published.label, '28 نومبر 2026'],
  [eqhEqlDates.updated.label, '28 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['EQH / EQL Tolerance Rule', 'EQH / EQL گنجائش اصول'],
  ['Equal Level = |Swing A − Swing B| ≤ Predefined Tolerance (Close Confirms Sweep vs. Breakout)', 'برابر سطح = |سوئنگ A − سوئنگ B| ≤ طے شدہ گنجائش (کلوز سویپ یا بریک آؤٹ کی تصدیق کرتا ہے)'],
  ['Chapter Contents', 'باب کے مندرجات'],
  ['On this page', 'اس صفحے پر'],
  ['Continue Studying', 'مزید مطالعہ جاری رکھیں'],
  ['Study Buyside & Sellside Liquidity', 'بائے سائیڈ اور سیل سائیڈ لیکویڈیٹی کا مطالعہ کریں'],
  ['Study Liquidity Sweep vs. Stop Hunt', 'لیکویڈیٹی سویپ بمقابلہ اسٹاپ ہنٹ کا مطالعہ کریں'],
  ['Study Liquidity Engineering & Runs', 'لیکویڈیٹی انجینئرنگ اور رنز کا مطالعہ کریں'],
  ['Explore Draw on Liquidity (DOL)', 'Draw on Liquidity (DOL) کا مطالعہ کریں'],
  ['Practice in the Guided Chart Lab', 'گائیڈڈ چارٹ لیب میں مشق کریں'],
  ['Synthetic illustration — not live quotes.', 'مصنوعی تعلیمی خاکہ — لائیو قیمتیں نہیں۔'],
  // Visual strings
  ['Stick-Figure Story: Double Top Trap vs. EQH Pool', 'اسٹک فگر کہانی: ڈبل ٹاپ جال بمقابلہ EQH پول'],
  ['Concept Comic', 'تصوراتی کامک'],
  ['1. Retail Double Top', '1. ریٹیل ڈبل ٹاپ'],
  ['2. Stop & Breakout Cluster', '2. اسٹاپ اور بریک آؤٹ اجتماع'],
  ['3. Sweep & Reclaim', '3. سویپ اور واپسی'],
  ['Textbook double top attracts aggressive early shorts.', 'روایتی ڈبل ٹاپ جلد باز شارٹ سیلرز کو متوجہ کرتا ہے۔'],
  ['Short stops and breakout buy-stops stack just above EQH.', 'شارٹ اسٹاپس اور بریک آؤٹ بائے اسٹاپس EQH کے اوپر جمع ہوتے ہیں۔'],
  ['Price pierces the shelf, tags stops, and closes back inside.', 'قیمت شیلف کو چھوتی ہے، اسٹاپس ٹرگر کرتی ہے اور اندر واپس بند ہوتی ہے۔'],
  ['Exact vs. Relative EQH/EQL Band Dissector', 'عین برابر بمقابلہ نسبتاً برابر EQH/EQL بینڈ تجزیہ'],
  ['Exact EQH', 'عین برابر EQH'],
  ['Relative EQH', 'نسبتاً برابر EQH'],
  ['Relative EQL', 'نسبتاً برابر EQL'],
  ['3D Equal-Level Liquidity Shelf', '3D برابر سطح لیکویڈیٹی شیلف'],
  ['Exact EQH Sweep', 'عین برابر EQH سویپ'],
  ['Relative EQL Sweep', 'نسبتاً برابر EQL سویپ'],
  ['True Breakout Acceptance', 'حقیقی بریک آؤٹ قبولیت'],
  ['Shelf Orbit', 'شیلف آربٹ'],
  ['Side Profile', 'سائیڈ پروفائل'],
  ['Play', 'چلائیں'],
  ['Pause', 'روکیں'],
  ['Reset', 'ری سیٹ'],
  ['Price builds an exact double-top EQH shelf, sweeps above it, and closes back below.', 'قیمت عین ڈبل ٹاپ EQH شیلف بناتی ہے، اس کے اوپر سویپ کرتی ہے اور واپس نیچے بند ہوتی ہے۔'],
  ['Price forms a relative EQL cluster, dips below both lows, and reclaims upward.', 'قیمت نسبتاً برابر EQL کلسٹر بناتی ہے، دونوں لوز سے نیچے جا کر اوپر لوٹتی ہے۔'],
  ['Candle bodies close and hold above the EQH shelf—confirming acceptance, not a sweep.', 'کینڈل باڈیز EQH شیلف کے اوپر بند ہو کر برقرار رہتی ہیں—جو سویپ نہیں بلکہ قبولیت ہے۔'],
  ['4-Step Chart Marking Blueprint', 'چارٹ پر نشان دہی کا 4 مرحلہ بلیو پرنٹ'],
  ['Animated Sequence: EQH Build → Sweep → Reclaim', 'اینیمیٹڈ سلسلہ: EQH تشکیل ← سویپ ← واپسی'],
  ['Auto-Play', 'آٹو پلے'],
  ['Next Step', 'اگلا مرحلہ'],
  ['EQH / EQL Tolerance & Cluster Priority Calculator', 'EQH / EQL گنجائش اور کلسٹر ترجیح کیلکولیٹر'],
  ['Swing A', 'سوئنگ A'],
  ['Swing B', 'سوئنگ B'],
  ['Max Tolerance', 'زیادہ سے زیادہ گنجائش'],
  ['Touches', 'ٹچز'],
  ['Timeframe', 'ٹائم فریم'],
  ['Measured Spread', 'ناپا گیا فاصلہ'],
  ['Classification', 'درجہ بندی'],
  ['Priority Score', 'ترجیح اسکور'],
  ['Exact Equal Level', 'عین برابر سطح'],
  ['Relative Equal Cluster', 'نسبتاً برابر کلسٹر'],
  ['Outside Tolerance', 'گنجائش سے باہر'],
  ['EQH/EQL Shelf vs. Single Swing & Trendline', 'EQH/EQL شیلف بمقابلہ ایک سوئنگ اور ٹرینڈ لائن'],
  ['Intraday EQH/EQL Formation Windows (ET)', 'انٹرا ڈے EQH/EQL بننے کے اوقات (ET)'],
  ['Worked Blueprints: NQ EQH vs. XAU/USD EQL', 'عملی بلیو پرنٹس: NQ EQH بمقابلہ XAU/USD EQL'],
  ['NQ 15m EQH', 'NQ 15m EQH'],
  ['XAU/USD 1H EQL', 'XAU/USD 1H EQL'],
  ['Common Mistakes with Equal Highs & Lows', 'برابر ہائیز اور لوز میں عام غلطیاں'],
  ['Mistake 1: Bending Tolerance', 'غلطی 1: گنجائش بدلنا'],
  ['Mistake 2: Pre-Close Entry', 'غلطی 2: کلوز سے پہلے انٹری'],
  ['Mistake 3: Fighting Strong Trend', 'غلطی 3: مضبوط ٹرینڈ کے خلاف جانا'],
  ['Widening tick tolerance after seeing the move creates hindsight bias.', 'حرکت دیکھنے کے بعد ٹک گنجائش بڑھانا بعد از وقت تعصب پیدا کرتا ہے۔'],
  ['Selling a touch of EQH before the candle closes back inside risks getting run over.', 'کینڈل کے اندر واپس بند ہونے سے پہلے EQH پر بیچنا خطرناک ہو سکتا ہے۔'],
  ['In strong expansion, EQH often serves as fuel for continuation.', 'مضبوط توسیع میں EQH اکثر تسلسل کے ایندھن کا کام کرتا ہے۔'],
  ['Pre-Replay EQH / EQL 6-Gate Checklist', 'ری پلے سے پہلے EQH / EQL 6-گیٹ چیک لسٹ'],
  ['Verify every gate before logging an EQH or EQL study in replay.', 'ری پلے میں EQH یا EQL مطالعہ درج کرنے سے پہلے ہر شرط کی تصدیق کریں۔'],
  ['Defined fixed tick/pip tolerance before inspecting chart outcomes', 'چارٹ نتائج دیکھنے سے پہلے مقررہ ٹک/پپ گنجائش طے کی'],
  ['Anchored pool on 15m–4H timeframe rather than 1m micro-noise', '1m شور کے بجائے 15m–4H ٹائم فریم پر پول نشان زد کیا'],
  ['Verified two or more distinct swings separated by a clear pullback', 'واضح پل بیک سے الگ دو یا زیادہ سوئنگز کی تصدیق کی'],
  ['Waited for price excursion beyond the EQH/EQL shelf', 'EQH/EQL شیلف سے باہر قیمت نکلنے کا انتظار کیا'],
  ['Checked candle-body close (reclaim inside vs. acceptance beyond)', 'کینڈل باڈی کلوز (اندر واپسی بمقابلہ باہر قبولیت) جانچا'],
  ['Logged both sweep reversals and trend breakouts without bias', 'سویپ الٹاؤ اور ٹرینڈ بریک آؤٹ دونوں بغیر تعصب درج کیے'],
  ['All synthetic EQH/EQL tolerance bands, cluster scores, and NQ/XAUUSD diagrams are educational chart-reference studies, not live quotes or trade recommendations.', 'اس باب میں تمام مصنوعی EQH/EQL گنجائش بینڈز، کلسٹر اسکورز اور NQ/XAUUSD خاکے تعلیمی چارٹ حوالہ جاتی مطالعات ہیں، لائیو قیمتیں یا تجارتی سفارشات نہیں۔'],
];

const quizUr: Array<[string, string]> = [
  ['Why must you define a tick or pip tolerance before marking Equal Highs (EQH) in replay?', 'ری پلے میں برابر ہائیز (EQH) نشان زد کرنے سے پہلے ٹک یا پپ گنجائش طے کرنا کیوں ضروری ہے؟'],
  ['Preventing hindsight bias in pool labeling.', 'پول کی درجہ بندی میں بعد از وقت تعصب سے بچاؤ۔'],
  ['Real swings rarely match to the exact tick, so a fixed tolerance prevents cherry-picking.', 'حقیقی سوئنگز شاذ و نادر ہی ایک ٹک تک ملتے ہیں، اس لیے مقررہ گنجائش جانبداری روکتی ہے۔'],
  ['Exchanges forbid horizontal highs within 10 ticks.', 'ایکسچینجز 10 ٹکس کے اندر افقی ہائیز پر پابندی لگاتی ہیں۔'],
  ['Tolerance forces every double top to reverse.', 'گنجائش ہر ڈبل ٹاپ کو پلٹنے پر مجبور کرتی ہے۔'],
  ['A predefined tolerance keeps EQH/EQL labeling objective across both sweeps and breakouts.', 'پہلے سے طے شدہ گنجائش سویپس اور بریک آؤٹ دونوں میں EQH/EQL کی درجہ بندی غیر جانبدار رکھتی ہے۔'],
  ['How does SMC view a textbook double top differently from retail pattern trading?', 'SMC روایتی پیٹرن ٹریڈنگ کے مقابلے میں ڈبل ٹاپ کو کس طرح دیکھتا ہے؟'],
  ['Double top vs. Buyside Liquidity pool.', 'ڈبل ٹاپ بمقابلہ بائے سائیڈ لیکویڈیٹی پول۔'],
  ['SMC treats it as an EQH Buyside Liquidity reference where short stops and buy-stops cluster.', 'SMC اسے EQH بائے سائیڈ لیکویڈیٹی حوالہ مانتا ہے جہاں شارٹ اسٹاپس اور بائے اسٹاپس جمع ہوتے ہیں۔'],
  ['SMC guarantees a double top can never be broken.', 'SMC ضمانت دیتا ہے کہ ڈبل ٹاپ کبھی نہیں ٹوٹ سکتا۔'],
  ['SMC ignores swing highs completely.', 'SMC سوئنگ ہائیز کو مکمل طور پر نظر انداز کرتا ہے۔'],
  ['Visible double tops attract both short stop-losses and breakout buy-stops just above the peaks.', 'واضح ڈبل ٹاپس چوٹیوں کے بالکل اوپر شارٹ اسٹاپ لاس اور بریک آؤٹ بائے اسٹاپس دونوں کو متوجہ کرتے ہیں۔'],
  ['What distinguishes a Relative Equal High from an Exact Equal High?', 'نسبتاً برابر ہائی کو عین برابر ہائی سے کیا چیز الگ کرتی ہے؟'],
  ['Classifying real-world swing clusters.', 'حقیقی سوئنگ اجتماعات کی درجہ بندی۔'],
  ['The second peak sits slightly lower (within tolerance) rather than at the exact same tick.', 'دوسری چوٹی بالکل اسی ٹک کے بجائے گنجائش کے اندر ہلکی سی نیچے ہوتی ہے۔'],
  ['Relative Equal Highs only exist on monthly charts.', 'نسبتاً برابر ہائیز صرف ماہانہ چارٹس پر ہوتے ہیں۔'],
  ['Relative Equal Highs have zero stops above them.', 'نسبتاً برابر ہائیز کے اوپر کوئی اسٹاپس نہیں ہوتے۔'],
  ['Relative EQH has a modest spread inside your tolerance rule and still clusters stops overhead.', 'نسبتاً برابر EQH میں گنجائش کے اندر ہلکا سا فرق ہوتا ہے اور پھر بھی اوپر اسٹاپس جمع ہوتے ہیں۔'],
  ['What price action confirms an EQH sweep rather than a breakout continuation?', 'بریک آؤٹ تسلسل کے بجائے EQH سویپ کی تصدیق کون سا پرائس ایکشن کرتا ہے؟'],
  ['Close-based verification.', 'کلوز پر مبنی تصدیق۔'],
  ['Price pierces above the EQH shelf and closes candle bodies back inside the prior range.', 'قیمت EQH شیلف سے اوپر نکلتی ہے اور کینڈل باڈیز پچھلی رینج کے اندر واپس بند کرتی ہے۔'],
  ['Every candle closes above the EQH shelf with expanding volume.', 'ہر کینڈل بڑھتے والیوم کے ساتھ EQH شیلف کے اوپر بند ہوتی ہے۔'],
  ['Touching the EQH level without crossing it.', 'EQH سطح کو عبور کیے بغیر صرف چھونا۔'],
  ['Closing back inside the range shows failed acceptance above the EQH shelf.', 'رینج کے اندر واپس بند ہونا EQH شیلف کے اوپر قبولیت کی ناکامی دکھاتا ہے۔'],
  ['Why do horizontal EQH/EQL shelves hold up better across chart zoom levels than trendlines?', 'ٹرینڈ لائنز کے مقابلے میں افقی EQH/EQL شیلفز چارٹ کے مختلف زوم لیولز پر بہتر کیوں رہتی ہیں؟'],
  ['Comparing pool geometry.', 'پول جیومیٹری کا موازنہ۔'],
  ['Horizontal prices do not shift with screen aspect ratio or candle spacing.', 'افقی قیمتیں اسکرین کے تناسب یا کینڈل کے فاصلے سے نہیں بدلتیں۔'],
  ['Diagonal trendlines are invisible on 1H charts.', 'ترچھی ٹرینڈ لائنز 1H چارٹس پر نظر نہیں آتیں۔'],
  ['Horizontal shelves reveal exact order-book depth.', 'افقی شیلفز آرڈر بک کی اصل گہرائی ظاہر کرتی ہیں۔'],
  ['A horizontal price level is invariant to zoom and aspect ratio.', 'افقی قیمت کی سطح زوم اور اسکرین تناسب سے متاثر نہیں ہوتی۔'],
  ['ICT 2022 Mentorship — Episode 3 (Relative Equal Highs)', 'ICT 2022 مینٹورشپ — قسط 3 (نسبتاً برابر ہائیز)'],
  ['Consulted for preference toward clean equal-high clusters over isolated minor peaks. Synthetic tolerance calculators and blueprints are original LearnSMC study aids.', 'الگ تھلگ معمولی چوٹیوں کے مقابلے میں صاف برابر ہائی اجتماعات کی ترجیح کے لیے مشاورت کی گئی۔ مصنوعی گنجائش کیلکولیٹرز اور بلیو پرنٹس LearnSMC کے اصل تعلیمی ذرائع ہیں۔'],
];
pairs.push(...quizUr);

for (const item of enDoc.takeaways) {
  const idx = enDoc.takeaways.indexOf(item);
  if (urDoc.takeaways[idx]) pairs.push([item, urDoc.takeaways[idx]]);
}
(enDoc.sections as EqhEqlSection[]).forEach((sec, si) => {
  const urSec = (urDoc.sections as EqhEqlSection[])[si];
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

export const eqhEqlTranslations: Record<string, string> = Object.fromEntries(pairs);
