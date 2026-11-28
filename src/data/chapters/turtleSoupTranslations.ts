import enDoc from './turtleSoupDocument.json';
import urDoc from './turtleSoupDocumentUrdu.json';
import {
  turtleSoupSources,
  turtleSoupQuizzes,
  turtleSoupDates,
  type TurtleSoupSection,
} from './turtleSoupLesson';

const pairs: Array<[string, string]> = [
  [enDoc.h1, urDoc.h1],
  [enDoc.seoTitle, urDoc.seoTitle],
  [enDoc.metaDescription, urDoc.metaDescription],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [turtleSoupDates.published.label, '15 اکتوبر 2026'],
  [turtleSoupDates.updated.label, '28 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['Rejection Block Arithmetic Formula', 'ریجیکشن بلاک حسابی فارمولا'],
  ['On this page', 'اس صفحے پر'],
  ['sections', 'ابواب'],
  ['Show section links', 'سیکشن لنکس دکھائیں'],
  ['Pre-Execution Turtle Soup Checklist', 'عمل درآمد سے پہلے ٹرٹل سوپ چیک لسٹ'],
  ['Checklist items confirmed', 'تصدیق شدہ نکات'],
  ['All six sweep, rejection-block, ETH/RTH, and invalidation gates verified.', 'سویپ، ریجیکشن بلاک، ETH/RTH اور باطل ہونے کے تمام چھ اصول تصدیق شدہ ہیں۔'],
  ['Confirm all 6 gates before classifying a sweep as a Turtle Soup study.', 'کسی بھی سویپ کو ٹرٹل سوپ مطالعہ قرار دینے سے پہلے تمام 6 شرائط کی تصدیق کریں۔'],
  ['Sources & Institutional References', 'ماخذ اور ادارہ جاتی حوالہ جات'],
  ['Continue Studying', 'مزید مطالعہ جاری رکھیں'],
  ['Body Midpoint = (Open/Close Boundary + Reference Extreme) ÷ 2 (e.g., 110.5)', 'باڈی وسط = (اوپن/کلوز حد + حوالہ انتہا) ÷ 2 (مثلاً 110.5)'],
  ['Full-Wick Midpoint = (Wick Extreme + Reference Extreme) ÷ 2 (e.g., 111.0)', 'مکمل وِک وسط = (وِک انتہا + حوالہ انتہا) ÷ 2 (مثلاً 111.0)'],
  ['Study Higher-Timeframe Liquidity Maps', 'ہائر ٹائم فریم لیکویڈیٹی نقشوں کا مطالعہ کریں'],
  ['Explore Draw on Liquidity (DOL)', 'Draw on Liquidity (DOL) کا مطالعہ کریں'],
  ['Study Order Blocks & Mitigation', 'آرڈر بلاکس اور میٹیگیشن کا مطالعہ کریں'],
  ['Study Breaker Blocks & Unicorn Structure', 'بریکر بلاکس اور یونیکارن ساخت کا مطالعہ کریں'],
  ['Practice in the Guided Chart Lab', 'گائیڈڈ چارٹ لیب میں مشق کریں'],
  // Checklist items
  ['Labeled Reference Session Origin (ETH Overnight vs. RTH vs. HTF)', 'حوالہ جاتی سیشن کی اصل (ETH اوور نائٹ بمقابلہ RTH بمقابلہ HTF) درج کر لی گئی'],
  ['Waited for Excursion Beyond Reference Extreme AND Rejection Back Inside', 'حوالہ انتہا سے آگے حرکت اور رینج میں واپسی دونوں کا انتظار کیا گیا'],
  ['Separated Rejection Block Body Midpoint from Full-Wick Midpoint', 'ریجیکشن بلاک باڈی وسط کو مکمل وِک وسط سے الگ رکھا گیا'],
  ['Confirmed Departure & LTF Structure Shift Before Framing Deferred Return', 'موخر واپسی سے پہلے روانگی اور LTF ساختی تبدیلی کی تصدیق کر لی گئی'],
  ['Evaluated Return Path Resistance (LRLR vs. HRLR) & Opposing Targets', 'واپسی کے راستے کی مزاحمت (LRLR بمقابلہ HRLR) اور مخالف اہداف جانچ لیے گئے'],
  ['Defined Close-Based Invalidation Past Sweep Wick & Exact Tick/Pip Risk', 'سویپ وِک سے باہر کلوز کی بنیاد پر باطل ہونے کی حد اور درست ٹِک/پِپ رسک طے کر لیا گیا'],
  // Visual titles & labels
  ['Visual Story: Breakout Traders Trapped as "Turtle Soup"', 'تصویری کہانی: بریک آؤٹ ٹریڈرز "ٹرٹل سوپ" کیسے بنتے ہیں'],
  ['Breakout Buyer (Trapped Above 110)', 'بریک آؤٹ خریدار (110 سے اوپر پھنسا ہوا)'],
  ['Turtle Soup Trader (Waits for Snap-Back)', 'ٹرٹل سوپ ٹریڈر (واپسی کا منتظر)'],
  ['"110 broke! Buying the breakout!"', '"110 ٹوٹ گیا! بریک آؤٹ خرید رہا ہوں!"'],
  ['"112 swept & closed < 110. Soup!"', '"112 سویپ + 110 کے نیچے کلوز۔ سوپ!"'],
  ['Raschke (1995) vs. ICT Rejection Block Architecture', 'راشکے (1995) بمقابلہ ICT ریجیکشن بلاک ساخت'],
  ['3D Rejection-Wick & Trap Cage', '3D ریجیکشن وِک اور ٹریپ کیج'],
  ['Bearish Sweep + Rejection Block', 'بیئرش سویپ + ریجیکشن بلاک'],
  ['Bullish SSL Turtle Soup', 'بلش SSL ٹرٹل سوپ'],
  ['Sustained Acceptance (No Soup)', 'مستقل قبولیت (سوپ نہیں)'],
  ['Straight-On Ruler', 'سیدھا رولر منظر'],
  ['3D Trap View', '3D ٹریپ منظر'],
  ['Pause', 'روکیں'],
  ['Play', 'چلائیں'],
  ['Reset', 'دوبارہ ترتیب'],
  ['Interactive Rejection Block Dissector (110.5 vs. 111.0)', 'انٹرایکٹو ریجیکشن بلاک تجزیہ کار (110.5 بمقابلہ 111.0)'],
  ['Animated Sequence: Aggressive Reclaim vs. Deferred Return', 'اینیمیٹڈ ترتیب: فوری واپسی بمقابلہ موخر انٹری'],
  ['Interactive Rejection Block & Turtle Soup Calculator', 'انٹرایکٹو ریجیکشن بلاک اور ٹرٹل سوپ کیلکولیٹر'],
  ['24-Hour New York Session Killzone & ETH/RTH Map', '24 گھنٹے نیویارک سیشن کِل زون اور ETH/RTH نقشہ'],
  ['LRLR vs. HRLR Return Paths & Gauntlet Boundary', 'LRLR بمقابلہ HRLR واپسی کے راستے اور گونٹلیٹ حد'],
  ['Worked Blueprints: Bearish PDH & Bullish PDL Turtle Soup', 'عملی خاکے: بیئرش PDH اور بلش PDL ٹرٹل سوپ'],
  ['Stick-Figure Mistakes: 3 Turtle Soup Traps', 'اسٹک فگر غلطیاں: ٹرٹل سوپ کے 3 جال'],
  ['Visual Gate Readiness Meter', 'شرائط کی تیاری کا بصری میٹر'],
  ['Synthetic illustration — not live quotes.', 'مصنوعی تعلیمی خاکہ — حقیقی لائیو کوٹس نہیں۔'],
  [
    'All synthetic 110–112 Rejection Block examples, NQ/EURUSD Turtle Soup presets, and stick-figure stories are educational chart-geometry studies, not live quotes or trade recommendations.',
    'اس باب میں موجود تمام مصنوعی 110–112 ریجیکشن بلاک مثالیں، NQ/EURUSD ٹرٹل سوپ پری سیٹس اور اسٹک فگر کہانیاں تعلیمی چارٹ مطالعے ہیں، حقیقی لائیو کوٹس یا تجارتی مشورہ نہیں۔',
  ],
];

enDoc.takeaways.forEach((item, i) => {
  if (urDoc.takeaways[i]) pairs.push([item, urDoc.takeaways[i]]);
});

(enDoc.sections as TurtleSoupSection[]).forEach((sec, sIdx) => {
  const urSec = (urDoc.sections as TurtleSoupSection[])[sIdx];
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
  [turtleSoupSources[0].title, 'Investor.gov (SEC) — اسٹاپ آرڈر میکانکس اور عمل درآمد'],
  [turtleSoupSources[0].scope, 'وضاحت کرتا ہے کہ حوالہ جاتی ہائیز/لوز کے پار ٹریگر ہونے والے اسٹاپ آرڈرز کیسے مارکیٹ آرڈر بن کر تیز حرکت پیدا کرتے ہیں۔'],
  [turtleSoupSources[1].title, 'CFTC — فیوچرز اور آپشنز مارکیٹ کی بنیادی باتیں'],
  [turtleSoupSources[1].scope, 'فیوچرز لیوریج، اتار چڑھاؤ اور عمل درآمد کے خطرات کا سرکاری ریگولیٹری جائزہ۔'],
  [turtleSoupSources[2].title, 'CME Group — E-mini اور Micro E-mini Nasdaq-100 قواعد'],
  [turtleSoupSources[2].scope, 'انڈیکس فیوچرز کے لیے RTH بمقابلہ ETH Globex سیشن اوقات اور ٹِک کی تفصیل۔'],
);

const quizTranslations: Array<[string, string]> = [
  [turtleSoupQuizzes[0].question, 'ایک پرانا ہائی 110 ہے۔ قیمت 112 تک جاتی ہے اور 110 سے اوپر کئی کینڈلز بند کر کے برقرار رہتی ہے۔ اس سے کیا ثابت ہوتا ہے؟'],
  [turtleSoupQuizzes[0].context, 'مستقل قبولیت کو ناکام بریک آؤٹ ٹرٹل سوپ سے الگ کرنا۔'],
  [turtleSoupQuizzes[0].options[0], 'تصدیق شدہ ٹرٹل سوپ ریجیکشن کے بجائے 110 سے اوپر مستقل قبولیت۔'],
  [turtleSoupQuizzes[0].options[1], 'بغیر اسٹاپ لاس کے 110 پر خودکار شارٹ انٹری۔'],
  [turtleSoupQuizzes[0].options[2], 'ثبوت کہ تمام ریٹیل اسٹاپس ہمیشہ کے لیے ختم ہو چکے ہیں۔'],
  [turtleSoupQuizzes[0].explanation, 'ٹرٹل سوپ کے لیے پچھلی رینج کے اندر واپسی ضروری ہے؛ 110 سے اوپر برقرار رہنا قبولیت کو ظاہر کرتا ہے۔'],
  [turtleSoupQuizzes[1].question, '110–111 باڈی اور 112 وِک ہائی والی بیئرش مثال میں ریجیکشن بلاک باڈی وسط بمقابلہ مکمل وِک وسط کیا ہے؟'],
  [turtleSoupQuizzes[1].context, 'باڈی حد کے حساب کا مکمل وِک کے حساب سے موازنہ۔'],
  [turtleSoupQuizzes[1].options[0], 'باڈی وسط 110.5 اور مکمل پھیلاؤ کا وسط 111.0 ہے؛ یہ آپس میں قابل تبادلہ نہیں۔'],
  [turtleSoupQuizzes[1].options[1], 'دونوں وسط 112.0 کے برابر ہیں۔'],
  [turtleSoupQuizzes[1].options[2], 'باڈی وسط 107.0 اور مکمل پھیلاؤ وسط 106.0 ہے۔'],
  [turtleSoupQuizzes[1].explanation, '110–111 باڈی کا اوسط 110.5 ہے جبکہ مکمل 110–112 حرکت کا اوسط 111.0 ہے۔'],
  [turtleSoupQuizzes[2].question, 'موخر ریجیکشن بلاک انٹری کو 110 پر اندھی فروخت سے کیا چیز الگ کرتی ہے؟'],
  [turtleSoupQuizzes[2].context, 'انٹری سے پہلے مشاہدہ شدہ ریجیکشن اور روانگی کا انتظار۔'],
  [turtleSoupQuizzes[2].options[0], 'موخر انٹری سویپ، ریجیکشن، روانگی اور اعلان کردہ باڈی حوالے پر بعد کی واپسی کا انتظار کرتی ہے۔'],
  [turtleSoupQuizzes[2].options[1], '110 پر اندھی فروخت زیادہ جیت کی شرح کی ضمانت دیتی ہے۔'],
  [turtleSoupQuizzes[2].options[2], 'موخر انٹری قیمت کے 110 کو چھونے سے پہلے ہی داخل ہو جاتی ہے۔'],
  [turtleSoupQuizzes[2].explanation, 'ریجیکشن سے پہلے 110 پر فروخت اندازہ ہے؛ موخر انٹری کے لیے پہلے واضح ریجیکشن اور روانگی ضروری ہے۔'],
  [turtleSoupQuizzes[3].question, 'اگر قیمت 110 سے 112 سویپ کر کے 107 پر جائے اور مقررہ مدت تک 110.5 ریجیکشن بلاک پر واپس نہ آئے تو کیا کرنا چاہیے؟'],
  [turtleSoupQuizzes[3].context, 'بغیر پیچھا کیے چھوٹ جانے والی موخر واپسی کا نظم۔'],
  [turtleSoupQuizzes[3].options[0], 'سیٹ اپ چھوڑ دیں یا مدت کے بعد آنے والی واپسی کو الگ مطالعہ سمجھیں۔'],
  [turtleSoupQuizzes[3].options[1], 'بے ترتیب اسٹاپ کے ساتھ 107 پر قیمت کا پیچھا کریں۔'],
  [turtleSoupQuizzes[3].options[2], 'اپنا اسٹاپ لاس حذف کر کے باؤنس کی امید رکھیں۔'],
  [turtleSoupQuizzes[3].explanation, 'جب مقررہ ترتیب میں واپسی نہ آئے تو زبردستی موخر انٹری نہ لیں۔'],
  [turtleSoupQuizzes[4].question, 'یہ لیبل لگانا کیوں ضروری ہے کہ پرانا ہائی ETH (اوور نائٹ) سے ہے یا RTH (باقاعدہ اوقات) سے؟'],
  [turtleSoupQuizzes[4].context, 'سیشن کے لحاظ سے حوالہ جات کی صفائی برقرار رکھنا۔'],
  [turtleSoupQuizzes[4].options[0], 'نیا RTH ہائی مکمل ETH ہائی جیسا نہیں ہوتا، اس لیے انہیں ملانے سے سویپ حوالے غلط جگہ لگتے ہیں۔'],
  [turtleSoupQuizzes[4].options[1], 'ETH اور RTH چارٹس ہمیشہ ایک جیسے ہائی اور لو بناتے ہیں۔'],
  [turtleSoupQuizzes[4].options[2], 'فیوچرز مارکیٹ میں صرف ہفتہ وار کلوز اہم ہوتے ہیں۔'],
  [turtleSoupQuizzes[4].explanation, 'اوور نائٹ/ETH انتہائیں اور RTH انتہائیں دو الگ لیکویڈیٹی حوالے ہیں۔'],
  [turtleSoupQuizzes[5].question, 'کیا ہر پرانے ہائی کا ٹوٹنا خودکار طور پر مینیپولیشن سویپ ہے جو الٹاؤ کی ضمانت دیتا ہے؟'],
  [turtleSoupQuizzes[5].context, 'بریک آؤٹ مطالعے پر شواہد اور دعوؤں کا نظم۔'],
  [turtleSoupQuizzes[5].options[0], 'نہیں؛ محض آگے نکلنا سیٹ اپ نہیں اور مشاہدہ شدہ ریجیکشن و باطل ہونے کے اصول کے بغیر الٹاؤ کی ضمانت نہیں دیتا۔'],
  [turtleSoupQuizzes[5].options[1], 'جی ہاں؛ پرانے ہائی کا ہر بریک فوری 1:4 الٹاؤ کی ضمانت دیتا ہے۔'],
  [turtleSoupQuizzes[5].options[2], 'جی ہاں؛ لنڈا راشکے نے ثابت کیا کہ 100% بیس روزہ بریک آؤٹ ناکام ہوتے ہیں۔'],
  [turtleSoupQuizzes[5].explanation, 'کبھی یہ نہ سمجھیں کہ ہر ہائی بریک مینیپولیشن یا یقینی الٹاؤ ہے۔'],
];
pairs.push(...quizTranslations);

export const turtleSoupTranslations: Record<string, string> = Object.fromEntries(pairs);
