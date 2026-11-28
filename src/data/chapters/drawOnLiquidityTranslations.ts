import enDoc from './drawOnLiquidityDocument.json';
import urDoc from './drawOnLiquidityDocumentUrdu.json';
import {
  drawOnLiquiditySources,
  drawOnLiquidityQuizzes,
  drawOnLiquidityDates,
  type DolSection,
} from './drawOnLiquidityLesson';

const pairs: Array<[string, string]> = [
  [enDoc.h1, urDoc.h1],
  [enDoc.seoTitle, urDoc.seoTitle],
  [enDoc.metaDescription, urDoc.metaDescription],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [drawOnLiquidityDates.published.label, '28 نومبر 2026'],
  [drawOnLiquidityDates.updated.label, '28 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['DOL Target Selection Formula', 'DOL ہدف انتخاب فارمولا'],
  ['On this page', 'اس صفحے پر'],
  ['sections', 'ابواب'],
  ['Show section links', 'سیکشن لنکس دکھائیں'],
  ['Pre-Trade DOL Selection Checklist', 'ٹریڈ سے پہلے DOL انتخاب چیک لسٹ'],
  ['Checklist items confirmed', 'تصدیق شدہ نکات'],
  ['All six DOL bias, path, and invalidation gates verified.', 'DOL بائیس، راستے اور باطل ہونے کے تمام چھ اصول تصدیق شدہ ہیں۔'],
  ['Confirm all 6 gates before locking your Draw on Liquidity target.', 'اپنا Draw on Liquidity ہدف طے کرنے سے پہلے تمام 6 شرائط کی تصدیق کریں۔'],
  ['Sources & Institutional References', 'ماخذ اور ادارہ جاتی حوالہ جات'],
  ['Continue Studying', 'مزید مطالعہ جاری رکھیں'],
  ['After ERL Sweep → Target Internal IRL (FVG / OB)', 'ERL سویپ کے بعد → اندرونی IRL (FVG / OB) ہدف'],
  ['After IRL Bounce + Displacement → Target Opposing ERL (EQH / PDH / PWH)', 'IRL باؤنس + ڈسپلیسمنٹ کے بعد → مخالف ERL (EQH / PDH / PWH) ہدف'],
  ['Study Higher-Timeframe Liquidity Maps', 'ہائر ٹائم فریم لیکویڈیٹی نقشوں کا مطالعہ کریں'],
  ['Study Liquidity Sweeps & Engineering', 'لیکویڈیٹی سویپس اور انجینئرنگ کا مطالعہ کریں'],
  ['Master Fair Value Gaps (IRL Rebalance)', 'فیئر ویلیو گیپس (IRL ری بیلنس) سیکھیں'],
  ['Master Premium & Discount (PD Array Matrix)', 'پریمیم اور ڈسکاؤنٹ (PD اَرے میٹرکس) سیکھیں'],
  ['Practice in the Guided Chart Lab', 'گائیڈڈ چارٹ لیب میں مشق کریں'],
  // Checklist items
  ['Established Weekly & Daily Bias from Higher-Timeframe Liquidity Map', 'ہائر ٹائم فریم لیکویڈیٹی نقشے سے ہفتہ وار اور روزانہ بائیس طے کر لیا گیا'],
  ['Identified Nearest Un-Swept External Pool (EQH/EQL, PDH/PDL, PWH/PWL)', 'قریب ترین غیر سویپ شدہ بیرونی پول (EQH/EQL، PDH/PDL، PWH/PWL) شناخت کر لیا گیا'],
  ['Checked for Unmitigated Internal Barriers (4H/1H FVG or OB) Along Path', 'راستے میں غیر متوازن اندرونی رکاوٹوں (4H/1H FVG یا OB) کی جانچ کر لی گئی'],
  ['Confirmed Active Direction with Energetic Displacement & MSS/BOS', 'تیز ڈسپلیسمنٹ اور MSS/BOS کے ساتھ فعال سمت کی تصدیق کر لی گئی'],
  ['Verified LRLR Path Clarity & London/NY Killzone Timing', 'LRLR راستے کی صفائی اور لندن/نیویارک کِل زون وقت کی جانچ کر لی گئی'],
  ['Set Close-Based Invalidation & Partial/Runner Plan Before Entry', 'انٹری سے پہلے کلوز کی بنیاد پر باطل ہونے کی حد اور جزوی/رنر منصوبہ طے کر لیا گیا'],
  // Visual labels
  ['Visual Story: Too Many Targets Without a DOL Compass', 'تصویری کہانی: DOL کمپاس کے بغیر بہت سے الجھے ہوئے اہداف'],
  ['Confused Trader (Guessing 5 Targets)', 'الجھا ہوا ٹریڈر (5 اہداف کا اندازہ)'],
  ['DOL Compass Trader (1 Clear Target)', 'DOL کمپاس ٹریڈر (1 واضح ہدف)'],
  ['"Target 1:3? Or FVG? Or PDH?"', '"1:3 ہدف؟ یا FVG؟ یا PDH؟"'],
  ['"SSL swept + MSS → Draw is EQH!"', '"SSL سویپ + MSS → کشش EQH!"'],
  ['Synthetic illustration — not live quotes.', 'مصنوعی تعلیمی خاکہ — حقیقی لائیو کوٹس نہیں۔'],
  ['3D Magnetic Target-Selection Field (IRL vs. ERL)', '3D مقناطیسی ہدف انتخاب میدان (IRL بمقابلہ ERL)'],
  ['ERL Pull (IRL → EQH)', 'ERL کشش (IRL → EQH)'],
  ['IRL Rebalance (Sweep → FVG)', 'IRL ری بیلنس (سویپ → FVG)'],
  ['Conflicting Targets (Wait)', 'متصادم اہداف (انتظار)'],
  ['Top-Down Compass', 'اوپری کمپاس منظر'],
  ['3D Field View', '3D میدان منظر'],
  ['Pause', 'روکیں'],
  ['Play', 'چلائیں'],
  ['Reset', 'دوبارہ ترتیب'],
  ['Interactive DOL Target-Selection Decision Tree', 'انٹرایکٹو DOL ہدف انتخاب فیصلہ جاتی درخت'],
  ['Animated Tug-of-War: Nearby IRL FVG vs. Distant ERL High', 'اینیمیٹڈ کشمکش: قریبی IRL FVG بمقابلہ دور دراز ERL ہائی'],
  ['Interactive 5-Factor DOL Target Priority Scorer', 'انٹرایکٹو 5-نکاتی DOL ہدف ترجیحی اسکورر'],
  ['Stick-Figure Mistakes: 3 Target-Selection Traps', 'اسٹک فگر غلطیاں: ہدف چننے کے 3 جال'],
  ['Trap 1: Moving the Goalpost', 'جال 1: ٹریڈ کے بیچ ہدف آگے بڑھانا'],
  ['Trap 2: Ignoring Nearby HTF FVG', 'جال 2: قریبی HTF FVG نظر انداز کرنا'],
  ['Trap 3: Fighting Displacement', 'جال 3: ڈسپلیسمنٹ کے خلاف جانا'],
  [
    'All synthetic EUR/USD and NQ Draw on Liquidity maps, priority scores, and stick-figure stories are educational chart-reference illustrations, not live quotes or trade recommendations.',
    'اس باب میں موجود تمام مصنوعی EUR/USD اور NQ ڈرا آن لیکویڈیٹی نقشے، ترجیحی اسکور اور اسٹک فگر کہانیاں تعلیمی چارٹ حوالہ جات ہیں، حقیقی لائیو کوٹس یا تجارتی مشورہ نہیں۔',
  ],
];

enDoc.takeaways.forEach((item, i) => {
  if (urDoc.takeaways[i]) pairs.push([item, urDoc.takeaways[i]]);
});

(enDoc.sections as DolSection[]).forEach((sec, sIdx) => {
  const urSec = (urDoc.sections as DolSection[])[sIdx];
  if (!urSec) return;
  pairs.push([sec.title, urSec.title]);
  sec.blocks.forEach((blk, bIdx) => {
    const urBlk = urSec.blocks[bIdx];
    if (!urBlk) return;
    if (blk.text && urBlk.text) pairs.push([blk.text, urBlk.text]);
    if (blk.title && urBlk.title) pairs.push([blk.title, urBlk.title]);
    blk.items?.forEach((it, iIdx) => {
      if (urBlk.items?.[iIdx]) pairs.push([it, urBlk.items[iIdx]]);
    });
    blk.rows?.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        const urCell = urBlk.rows?.[rIdx]?.[cIdx];
        if (urCell) pairs.push([cell, urCell]);
      });
    });
  });
});

enDoc.faqs.forEach((faq, i) => {
  const urFaq = urDoc.faqs[i];
  if (!urFaq) return;
  pairs.push([faq.question, urFaq.question]);
  pairs.push([faq.answer, urFaq.answer]);
});

pairs.push(
  [drawOnLiquiditySources[0].title, 'Investor.gov (SEC) — اسٹاپ آرڈرز اور لِمٹ آرڈرز'],
  [drawOnLiquiditySources[0].scope, 'سرکاری تعلیمی وضاحت کہ حوالہ جاتی ہائیز اور لوز پر اسٹاپ آرڈرز مارکیٹ عمل درآمد کیسے شروع کرتے ہیں۔'],
  [drawOnLiquiditySources[1].title, 'CFTC — فیوچرز اور آپشنز مارکیٹ کی بنیادی باتیں'],
  [drawOnLiquiditySources[1].scope, 'فیوچرز کنٹریکٹ رسک، لیوریج اور آرڈر بک میکانکس کا ریگولیٹری جائزہ۔'],
  [drawOnLiquiditySources[2].title, 'CME Group — E-mini اور Micro E-mini Nasdaq-100 قواعد'],
  [drawOnLiquiditySources[2].scope, 'انڈیکس فیوچرز ہدف اور رسک ناپنے کے لیے کنٹریکٹ ٹِک اور ڈیلیوری تفصیلات۔'],
);

const quizTranslations: Array<[string, string]> = [
  [drawOnLiquidityQuizzes[0].question, 'ٹریڈ میں داخل ہونے سے پہلے Draw on Liquidity (DOL) کی شناخت کا بنیادی مقصد کیا ہے؟'],
  [drawOnLiquidityQuizzes[0].context, 'فرضی رسک ٹو ریوارڈ اہداف کو مارکیٹ جغرافیے سے بدلنا۔'],
  [drawOnLiquidityQuizzes[0].options[0], 'وہ سب سے منطقی لیکویڈیٹی پول یا عدم توازن طے کرنا جس کی طرف قیمت اگلا پھیلاؤ کر رہی ہو۔'],
  [drawOnLiquidityQuizzes[0].options[1], 'یہ ضمانت دینا کہ ہر ٹریڈ مقررہ 1:5 منافع تناسب حاصل کرے گی۔'],
  [drawOnLiquidityQuizzes[0].options[2], 'انٹرا ڈے چارٹس پر اسٹاپ لاس استعمال کرنے سے ہمیشہ کے لیے بچنا۔'],
  [drawOnLiquidityQuizzes[0].explanation, 'DOL آپ کے ٹیک پرافٹ اور سمتی بائیس کو فرضی تناسب کے بجائے حقیقی چارٹ حوالوں (ERL یا IRL) سے جوڑتا ہے۔'],
  [drawOnLiquidityQuizzes[1].question, 'جب قیمت بیرونی رینج لیکویڈیٹی (مثلاً PDH) سویپ کر کے ڈسپلیسمنٹ کے ساتھ نیچے مڑے تو عموماً فوری Draw on Liquidity کیا بنتا ہے؟'],
  [drawOnLiquidityQuizzes[1].context, 'ERL → IRL → ERL چکر کو سمجھنا۔'],
  [drawOnLiquidityQuizzes[1].options[0], 'ڈیلنگ رینج کے اندر کوئی غیر متوازن اندرونی رینج لیکویڈیٹی (IRL) FVG یا آرڈر بلاک۔'],
  [drawOnLiquidityQuizzes[1].options[1], 'ماہانہ رینج سے 500 پوائنٹس اوپر ایک غیر متعلقہ سوئنگ ہائی۔'],
  [drawOnLiquidityQuizzes[1].options[2], '50% ایکوئلبریم کے اندر ایک بے ترتیب 1 منٹ کی ڈوجی کینڈل۔'],
  [drawOnLiquidityQuizzes[1].explanation, 'ERL سویپ کرنے کے بعد قیمت اکثر دوبارہ پھیلنے سے پہلے اندرونی عدم توازن (IRL) کو ری بیلنس کرنے آتی ہے۔'],
  [drawOnLiquidityQuizzes[2].question, 'پرائس ایکشن کی کون سی علامت سب سے بہتر تصدیق کرتی ہے کہ اس وقت کون سا Draw on Liquidity فعال ہے؟'],
  [drawOnLiquidityQuizzes[2].context, 'متصادم پولز کے درمیان آرڈر فلو کو فیصلہ کن بنانا۔'],
  [drawOnLiquidityQuizzes[2].options[0], 'تیز ڈسپلیسمنٹ کینڈلز جو مسلسل FVGs چھوڑیں اور مختصر مدتی ساخت توڑیں۔'],
  [drawOnLiquidityQuizzes[2].options[1], 'ایشیائی دوپہر میں سست اور اوورلیپ کرتی وِکس۔'],
  [drawOnLiquidityQuizzes[2].options[2], '1 منٹ کے چارٹ پر پانچ اضافی انڈیکیٹرز لگانا۔'],
  [drawOnLiquidityQuizzes[2].explanation, 'ڈسپلیسمنٹ اگلے مخالف پول کی طرف فعال سمتی عزم کو ظاہر کرتی ہے۔'],
  [drawOnLiquidityQuizzes[3].question, 'اگر بلش حرکت کے دوران دور کے ہفتہ وار ہائی کے بالکل سامنے ایک غیر متوازن 4H بیئرش FVG موجود ہو تو دانشمندانہ طریقہ کیا ہے؟'],
  [drawOnLiquidityQuizzes[3].context, 'قریبی IRL رکاوٹوں بمقابلہ دور دراز ERL اہداف کا نظم۔'],
  [drawOnLiquidityQuizzes[3].options[0], 'ہفتہ وار ہائی کی توقع سے پہلے قریبی 4H FVG کو فوری جزوی ہدف یا احتیاطی زون سمجھیں۔'],
  [drawOnLiquidityQuizzes[3].options[1], '4H FVG کو مکمل نظر انداز کریں اور اسٹاپ لاس مزید دور لے جائیں۔'],
  [drawOnLiquidityQuizzes[3].options[2], 'عین 4H بیئرش FVG کے اندر پوزیشن سائز دگنا کر دیں۔'],
  [drawOnLiquidityQuizzes[3].explanation, 'قریبی ہائر ٹائم فریم IRL عدم توازن اکثر دور کے بیرونی ہائیز سے پہلے ردعمل پیدا کرتے ہیں۔'],
  [drawOnLiquidityQuizzes[4].question, 'زیادہ مزاحمتی دوڑ (HRLR) کے مقابلے میں کم مزاحمتی دوڑ (LRLR) ہدف کی تکمیل میں کیوں مددگار ہے؟'],
  [drawOnLiquidityQuizzes[4].context, 'منتخب ہدف تک راستے کی مزاحمت کا جائزہ۔'],
  [drawOnLiquidityQuizzes[4].options[0], 'LRLR میں صاف FVGs اور کم مخالف سوئنگ رکاوٹوں والا کھلا راستہ ہوتا ہے۔'],
  [drawOnLiquidityQuizzes[4].options[1], 'HRLR میں کوئی وِک نہیں ہوتی اور یہ ہمیشہ دگنی رفتار سے چلتی ہے۔'],
  [drawOnLiquidityQuizzes[4].options[2], 'LRLR صرف تب ہوتا ہے جب مارکیٹیں بند ہوں۔'],
  [drawOnLiquidityQuizzes[4].explanation, 'کم مخالف سوئنگز والا صاف راستہ قیمت کو کم رکاوٹ کے ساتھ ہدف تک پہنچنے دیتا ہے۔'],
  [drawOnLiquidityQuizzes[5].question, 'کیا Draw on Liquidity اس بات کی ضمانت دیتا ہے کہ قیمت بغیر باطل ہوئے آپ کے ٹیک پرافٹ تک پہنچے گی؟'],
  [drawOnLiquidityQuizzes[5].context, 'رسک مینجمنٹ اور کلوز کی بنیاد پر باطل ہونے کا نظم۔'],
  [drawOnLiquidityQuizzes[5].options[0], 'نہیں؛ Draw on Liquidity ایک سمتی مفروضہ ہے جس کے لیے کلوز کی بنیاد پر باطل ہونے کی حد اور سخت ٹِک/پِپ رسک ضروری ہے۔'],
  [drawOnLiquidityQuizzes[5].options[1], 'جی ہاں؛ روزانہ چارٹ پر نشان لگ جانے کے بعد قیمت کا وہاں پہنچنا لازمی ہے۔'],
  [drawOnLiquidityQuizzes[5].options[2], 'جی ہاں؛ ڈسپلیسمنٹ ہر سیشن میں 100% تکمیل کی ضمانت دیتی ہے۔'],
  [drawOnLiquidityQuizzes[5].explanation, 'کوئی بھی چارٹ ہدف یقینی نہیں ہوتا؛ مخالف کلوز اور ساختی تبدیلی فعال کشش کو باطل کر دیتی ہے۔'],
];
pairs.push(...quizTranslations);

export const drawOnLiquidityTranslations: Record<string, string> = Object.fromEntries(pairs);
