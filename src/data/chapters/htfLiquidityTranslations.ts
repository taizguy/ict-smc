import enDoc from './htfLiquidityDocument.json';
import urDoc from './htfLiquidityDocumentUrdu.json';
import {
  htfLiquiditySources,
  htfLiquidityQuizzes,
  htfLiquidityDates,
  type HtfLiquiditySection,
} from './htfLiquidityLesson';

const pairs: Array<[string, string]> = [
  [enDoc.h1, urDoc.h1],
  [enDoc.seoTitle, urDoc.seoTitle],
  [enDoc.metaDescription, urDoc.metaDescription],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [htfLiquidityDates.published.label, '15 اکتوبر 2026'],
  [htfLiquidityDates.updated.label, '28 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['HTF Equilibrium Formula', 'HTF ایکوئلبریم فارمولا'],
  ['On this page', 'اس صفحے پر'],
  ['sections', 'ابواب'],
  ['Show section links', 'سیکشن لنکس دکھائیں'],
  ['Pre-Session HTF Mapping Checklist', 'سیشن سے پہلے HTF نقشہ سازی چیک لسٹ'],
  ['Checklist items confirmed', 'تصدیق شدہ نکات'],
  ['All six HTF mapping, killzone, and invalidation gates verified.', 'HTF نقشہ سازی، کِل زون اور باطل ہونے کے تمام چھ اصول تصدیق شدہ ہیں۔'],
  ['Confirm all 6 gates before relying on an HTF liquidity target.', 'کسی بھی HTF لیکویڈیٹی ہدف پر انحصار کرنے سے پہلے تمام 6 شرائط کی تصدیق کریں۔'],
  ['Sources & Institutional References', 'ماخذ اور ادارہ جاتی حوالہ جات'],
  ['Continue Studying', 'مزید مطالعہ جاری رکھیں'],
  ['Equilibrium (50%) = Range Low + 0.50 × (Range High − Range Low)', 'ایکوئلبریم (50%) = Range Low + 0.50 × (Range High − Range Low)'],
  ['Discount (< 50%) → Seek SSL Sweep / IRL to ERL Buy', 'ڈسکاؤنٹ (< 50%) → SSL سویپ / IRL تا ERL خریداری کا مطالعہ'],
  ['Premium (> 50%) → Seek BSL Sweep / IRL to ERL Sell', 'پریمیم (> 50%) → BSL سویپ / IRL تا ERL فروخت کا مطالعہ'],
  ['Study Liquidity Sweeps & Engineering', 'لیکویڈیٹی سویپس اور انجینئرنگ کا مطالعہ کریں'],
  ['Master Fair Value Gaps (IRL Rebalance)', 'فیئر ویلیو گیپس (IRL ری بیلنس) سیکھیں'],
  ['Explore Draw on Liquidity (DOL)', 'Draw on Liquidity (DOL) کی وضاحت دیکھیں'],
  ['Master Premium & Discount (PD Array Matrix)', 'پریمیم اور ڈسکاؤنٹ (PD اَرے میٹرکس) سیکھیں'],
  ['Study Time & Session Killzones', 'وقت اور سیشن کِل زونز کا مطالعہ کریں'],
  ['Practice in the Guided Chart Lab', 'گائیڈڈ چارٹ لیب میں مشق کریں'],
  // Checklist items
  ['Marked Monthly (PMH/PML) and Weekly (PWH/PWL) Macro Boundaries', 'ماہانہ (PMH/PML) اور ہفتہ وار (PWH/PWL) بڑی حدود نشان زد کر لی گئیں'],
  ['Plotted Daily (PDH/PDL) and Active 4H Swing Dealing Range', 'روزانہ (PDH/PDL) اور فعال 4H سوئنگ ڈیلنگ رینج بنا لی گئی'],
  ['Highlighted Equal Highs/Lows (EQH/EQL) and Stacked Confluences', 'برابر ہائیز/لوز (EQH/EQL) اور اسٹیکڈ ہم آہنگی نمایاں کر لی گئی'],
  ['Identified Current IRL ↔ ERL Phase & 50% Equilibrium Zone', 'موجودہ IRL ↔ ERL مرحلہ اور 50% ایکوئلبریم زون کی شناخت کر لی گئی'],
  ['Aligned Target Window with London Open or NY AM/PM Killzone', 'ہدف کو لندن اوپن یا نیویارک AM/PM کِل زون ونڈو سے منسلک کر لیا گیا'],
  ['Defined Close-Based Invalidation & Exact Tick/Pip Risk Before Entry', 'انٹری سے پہلے کلوز کی بنیاد پر باطل ہونے کی حد اور درست ٹِک/پِپ رسک طے کر لیا گیا'],
  // Interactive visual labels
  ['Visual Story: Why 1-Minute Traders Get Swept Without an HTF Map', 'تصویری کہانی: 1 منٹ کے ٹریڈرز HTF نقشے کے بغیر کیوں سویپ ہوتے ہیں'],
  ['Blindfolded 1M Trader (No HTF Map)', 'بغیر HTF نقشے کے 1M ٹریڈر'],
  ['HTF Cartographer (PWH / PDL Mapped)', 'HTF نقشہ ساز (PWH / PDL واضح)'],
  ['"Clean 1M support! Buying right here!"', '"صاف 1M سپورٹ! یہیں خریدتے ہیں!"'],
  ['Swept right at unmapped PDL!', 'ان دیکھے PDL پر فوراً اسٹاپ ہٹ!'],
  ['"PDL swept + 5M MSS! Target PWH."', '"PDL سویپ + 5M MSS! ہدف PWH۔"'],
  ['Synthetic illustration — not live quotes.', 'مصنوعی تعلیمی خاکہ — حقیقی لائیو کوٹس نہیں۔'],
  ['3D Topographic Multi-Timeframe Liquidity Atlas', '3D ٹوپوگرافک ملٹی ٹائم فریم لیکویڈیٹی اٹلس'],
  ['Sweep & Reversal', 'سویپ اور الٹاؤ'],
  ['LRLR Continuation', 'LRLR تسلسل'],
  ['Mid-Range Chop', 'درمیانی رینج اتار چڑھاؤ'],
  ['3D Atlas View', '3D اٹلس منظر'],
  ['Straight-On Map', 'سیدھا نقشہ منظر'],
  ['Pause', 'روکیں'],
  ['Play', 'چلائیں'],
  ['Reset', 'دوبارہ ترتیب'],
  ['Interactive 6-Tier HTF Liquidity Hierarchy Explorer', 'انٹرایکٹو 6-درجاتی HTF لیکویڈیٹی درجہ بندی ایکسپلورر'],
  ['Interactive IRL ↔ ERL & Premium/Discount Mapper', 'انٹرایکٹو IRL ↔ ERL اور پریمیم/ڈسکاؤنٹ میپر'],
  ['Bullish DOL (Discount → PWH)', 'بلش DOL (ڈسکاؤنٹ → PWH)'],
  ['Bearish DOL (Premium → PDL)', 'بیئرش DOL (پریمیم → PDL)'],
  ['Animated Sequence: Sweep Reversal vs. LRLR vs. HRLR', 'اینیمیٹڈ ترتیب: سویپ الٹاؤ بمقابلہ LRLR بمقابلہ HRLR'],
  ['Interactive HTF Target, Equilibrium & Tick/Pip Calculator', 'انٹرایکٹو HTF ہدف، ایکوئلبریم اور ٹِک/پِپ کیلکولیٹر'],
  ['Stick-Figure Mistakes: 3 HTF Liquidity Mapping Traps', 'اسٹک فگر غلطیاں: HTF لیکویڈیٹی نقشہ سازی کے 3 جال'],
  ['Trap 1: Fading an LRLR', 'جال 1: LRLR کے خلاف ٹریڈ لینا'],
  ['Trap 2: Ignoring Stacked PWH+PDH', 'جال 2: اسٹیکڈ PWH+PDH نظر انداز کرنا'],
  ['Trap 3: Mid-Range 50% Chop', 'جال 3: 50% درمیانی رینج میں الجھنا'],
  // Interpretation & Glossary term labels
  [
    'All synthetic NQ, EUR/USD, and XAU/USD HTF liquidity maps, dealing-range calculations, and stick-figure stories are educational chart-reference illustrations, not live quotes or trade recommendations.',
    'اس باب میں موجود تمام مصنوعی NQ، EUR/USD اور XAU/USD ہائر ٹائم فریم لیکویڈیٹی نقشے، ڈیلنگ رینج حسابات اور اسٹک فگر کہانیاں تعلیمی چارٹ حوالہ جات ہیں، حقیقی لائیو کوٹس یا تجارتی مشورہ نہیں۔',
  ],
  ['HTF Liquidity Map', 'HTF لیکویڈیٹی میپ (HTF Liquidity Map)'],
  ['Draw on Liquidity (DOL)', 'لیکویڈیٹی کا ہدف (Draw on Liquidity / DOL)'],
  ['Buy-Side Liquidity (BSL)', 'بائی سائیڈ لیکویڈیٹی (BSL)'],
  ['Sell-Side Liquidity (SSL)', 'سیل سائیڈ لیکویڈیٹی (SSL)'],
  ['PMH / PML', 'گزشتہ ماہ کا ہائی اور لو (PMH / PML)'],
  ['PWH / PWL', 'گزشتہ ہفتے کا ہائی اور لو (PWH / PWL)'],
  ['PDH / PDL', 'گزشتہ دن کا ہائی اور لو (PDH / PDL)'],
  ['Equal Highs (EQH)', 'برابر ہائیز (Equal Highs / EQH)'],
  ['Equal Lows (EQL)', 'برابر لوز (Equal Lows / EQL)'],
  ['External Range Liquidity (ERL)', 'بیرونی رینج لیکویڈیٹی (ERL)'],
  ['Internal Range Liquidity (IRL)', 'اندرونی رینج لیکویڈیٹی (IRL)'],
  ['Dealing Range', 'ڈیلنگ رینج (Dealing Range)'],
  ['Equilibrium (50%)', 'ایکوئلبریم (Equilibrium 50%)'],
  ['Liquidity Sweep', 'لیکویڈیٹی سویپ (Liquidity Sweep)'],
  ['Low-Resistance Liquidity Run (LRLR)', 'کم مزاحمتی لیکویڈیٹی دوڑ (LRLR)'],
  ['High-Resistance Liquidity Run (HRLR)', 'زیادہ مزاحمتی لیکویڈیٹی دوڑ (HRLR)'],
  ['Stacked Liquidity', 'اسٹیکڈ لیکویڈیٹی (Stacked Liquidity)'],
  ['Market Structure Shift (MSS)', 'مارکیٹ اسٹرکچر شفٹ (MSS)'],
  ['SMT Divergence', 'SMT ڈائیورجنس (SMT Divergence)'],
  ['Close-Based Invalidation', 'کلوز کی بنیاد پر باطل ہونا (Close-Based Invalidation)'],
];

enDoc.takeaways.forEach((item, i) => {
  if (urDoc.takeaways[i]) pairs.push([item, urDoc.takeaways[i]]);
});

(enDoc.sections as HtfLiquiditySection[]).forEach((sec, sIdx) => {
  const urSec = (urDoc.sections as HtfLiquiditySection[])[sIdx];
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

const sourceTranslations: Array<[string, string]> = [
  [
    htfLiquiditySources[0].title,
    'Investor.gov (SEC) — اسٹاپ آرڈر میکانکس اور عمل درآمد',
  ],
  [
    htfLiquiditySources[0].scope,
    'وضاحت کرتا ہے کہ حوالہ جاتی ہائیز/لوز پر ٹریگر ہونے والے اسٹاپ آرڈرز کیسے مارکیٹ آرڈر بن جاتے ہیں اور سلپیج پیدا کر سکتے ہیں۔',
  ],
  [
    htfLiquiditySources[1].title,
    'CFTC — فیوچرز اور آپشنز مارکیٹ کی بنیادی باتیں',
  ],
  [
    htfLiquiditySources[1].scope,
    'فیوچرز کنٹریکٹ میکانکس، لیوریج اور آرڈر بک رسک پر سرکاری ریگولیٹری تعلیم۔',
  ],
  [
    htfLiquiditySources[2].title,
    'CME Group — E-mini اور Micro E-mini Nasdaq-100 قواعد',
  ],
  [
    htfLiquiditySources[2].scope,
    'NQ/MNQ ٹِک سائز، فرنٹ منتھ ڈیلیوری کیلنڈر اور سیٹلمنٹ قواعد کی تفصیل۔',
  ],
];
pairs.push(...sourceTranslations);

const quizTranslations: Array<[string, string]> = [
  [
    htfLiquidityQuizzes[0].question,
    'کون سا HTF لیکویڈیٹی درجہ کئی دنوں تا کئی ہفتوں کے رخ کی سب سے مضبوط بنیاد بنتا ہے؟',
  ],
  [
    htfLiquidityQuizzes[0].context,
    'درجہ 1/2 کیلنڈر اینکرز کا انٹرا ڈے سیشن انتہاؤں سے موازنہ۔',
  ],
  [
    htfLiquidityQuizzes[0].options[0],
    'گزشتہ ماہ کا ہائی/لو (PMH/PML) اور گزشتہ ہفتے کا ہائی/لو (PWH/PWL)۔',
  ],
  [
    htfLiquidityQuizzes[0].options[1],
    'ایشیائی دوپہر کا ایک 1 منٹ کا سوئنگ ہائی۔',
  ],
  [
    htfLiquidityQuizzes[0].options[2],
    '50% ایکوئلبریم کے اندر ایک غیر مصدقہ درمیانی وِک۔',
  ],
  [
    htfLiquidityQuizzes[0].explanation,
    'بڑے ٹائم فریم کے کیلنڈر کنارے (PMH/PML اور PWH/PWL) زیادہ ریسٹنگ آرڈرز جمع کرتے ہیں اور کئی دنوں کی سمت متعین کرتے ہیں۔',
  ],
  [
    htfLiquidityQuizzes[1].question,
    'IRL ↔ ERL چکر میں جب قیمت بیرونی رینج لیکویڈیٹی (مثلاً PDH) سویپ کر کے نیچے کی طرف ساخت بدلتی ہے تو عموماً کیا ہوتا ہے؟',
  ],
  [
    htfLiquidityQuizzes[1].context,
    'بیرونی سے اندرونی رینج ڈیلیوری کا جائزہ۔',
  ],
  [
    htfLiquidityQuizzes[1].options[0],
    'قیمت ری بیلنس کے لیے اندرونی رینج لیکویڈیٹی (جیسے 4H یا 1H FVG) کی طرف واپس آتی ہے۔',
  ],
  [
    htfLiquidityQuizzes[1].options[1],
    'قیمت پچھلی روزانہ رینج کے اندر واپس آنے سے ہمیشہ کے لیے رک جاتی ہے۔',
  ],
  [
    htfLiquidityQuizzes[1].options[2],
    'ہر 1 منٹ کی کینڈل خودکار طور پر ماہانہ آرڈر بلاک بن جاتی ہے۔',
  ],
  [
    htfLiquidityQuizzes[1].explanation,
    'ERL سویپ کرنے کے بعد قیمت اکثر اگلی مخالف سمت کی حرکت سے پہلے اندرونی عدم توازن (IRL) کو ری بیلنس کرتی ہے۔',
  ],
  [
    htfLiquidityQuizzes[2].question,
    'صاف برابر ہائیز (EQH) یا برابر لوز (EQL) مضبوط دیواروں کے بجائے مقناطیس کا کام کیوں کرتے ہیں؟',
  ],
  [
    htfLiquidityQuizzes[2].context,
    'ریٹیل ڈبل ٹاپ/ڈبل باٹم اسٹاپ پلیسمنٹ کو سمجھنا۔',
  ],
  [
    htfLiquidityQuizzes[2].options[0],
    'ڈبل ٹاپ فروخت کنندگان یا ڈبل باٹم خریداروں کے اسٹاپ لاس ان برابر سطحوں کے بالکل پیچھے جمع ہو کر گھنی لیکویڈیٹی بناتے ہیں۔',
  ],
  [
    htfLiquidityQuizzes[2].options[1],
    'ایکسچینجز برابر ہائیز کے قریب لِمٹ آرڈرز پر خودکار پابندی لگا دیتی ہیں۔',
  ],
  [
    htfLiquidityQuizzes[2].options[2],
    'برابر ہائیز ریاضیاتی طور پر بغیر سویپ کیے 100% الٹاؤ کی ضمانت دیتے ہیں۔',
  ],
  [
    htfLiquidityQuizzes[2].explanation,
    'EQH/EQL کے بالکل پیچھے جمع شدہ اسٹاپس قیمت کے پھیلاؤ کے وقت بائی سائیڈ یا سیل سائیڈ لیکویڈیٹی فراہم کرتے ہیں۔',
  ],
  [
    htfLiquidityQuizzes[3].question,
    'زیادہ مزاحمتی دوڑ (HRLR) کے مقابلے میں کم مزاحمتی لیکویڈیٹی دوڑ (LRLR) کی کیا پہچان ہے؟',
  ],
  [
    htfLiquidityQuizzes[3].context,
    'HTF لیکویڈیٹی ہدف کی طرف راستے کی مزاحمت کا جائزہ۔',
  ],
  [
    htfLiquidityQuizzes[3].options[0],
    'LRLR کم رکاوٹ والے صاف راستے اور واضح FVGs کے ساتھ تیزی سے ہدف کی طرف بڑھتی ہے، جبکہ HRLR گھنے مخالف سوئنگز سے الجھتی ہے۔',
  ],
  [
    htfLiquidityQuizzes[3].options[1],
    'LRLR صرف ہفتہ اور اتوار کو ہوتا ہے جب فیوچرز مارکیٹ بند ہو۔',
  ],
  [
    htfLiquidityQuizzes[3].options[2],
    'HRLR ہمیشہ بغیر وِکس کے LRLR سے تیز چلتی ہے۔',
  ],
  [
    htfLiquidityQuizzes[3].explanation,
    'LRLR سے مراد لیکویڈیٹی پول تک صاف اور کم رکاوٹ والا راستہ ہے جو الٹاؤ کے بجائے تسلسل کی حمایت کرتا ہے۔',
  ],
  [
    htfLiquidityQuizzes[4].question,
    'HTF نقشے پر اسٹیکڈ لیکویڈیٹی (Stacked Liquidity) کسے کہتے ہیں؟',
  ],
  [
    htfLiquidityQuizzes[4].context,
    'ملٹی ٹائم فریم ہم آہنگی کی پہچان۔',
  ],
  [
    htfLiquidityQuizzes[4].options[0],
    'دو یا زیادہ آزاد ٹائم فریم سطحوں (جیسے PDH، PWH اور 4H برابر ہائی) کا تقریباً ایک ہی قیمت پر جمع ہونا۔',
  ],
  [
    htfLiquidityQuizzes[4].options[1],
    '1 منٹ کے چارٹ پر دس ایک جیسے موونگ ایوریج لگانا۔',
  ],
  [
    htfLiquidityQuizzes[4].options[2],
    'کسی الجھی رینج کے عین 50% ایکوئلبریم پر اسٹاپ لاس رکھنا۔',
  ],
  [
    htfLiquidityQuizzes[4].explanation,
    'اسٹیکڈ لیکویڈیٹی مختلف ٹائم فریم شرکاء کے اسٹاپس کو ایک ہی تنگ قیمت کی پٹی میں جمع کر دیتی ہے۔',
  ],
  [
    htfLiquidityQuizzes[5].question,
    'کیا HTF لیکویڈیٹی ہدف پہلی چھو پر فوری الٹاؤ کی ضمانت دیتا ہے؟',
  ],
  [
    htfLiquidityQuizzes[5].context,
    'رسک نظم اور کلوز کی بنیاد پر باطل ہونے کے اصول۔',
  ],
  [
    htfLiquidityQuizzes[5].options[0],
    'نہیں؛ HTF سطح ایک حوالہ جاتی نقطہ ہے جہاں آرڈرز جمع ہوتے ہیں، جس کے لیے LTF تصدیق اور کلوز کی بنیاد پر باطل ہونے کے اصول ضروری ہیں۔',
  ],
  [
    htfLiquidityQuizzes[5].options[1],
    'جی ہاں؛ PDH یا PWH کی ہر چھو صفر نقصان کے ساتھ الٹاؤ کی ضمانت دیتی ہے۔',
  ],
  [
    htfLiquidityQuizzes[5].options[2],
    'جی ہاں؛ ہفتہ وار ہائیز پر ٹریڈ کرتے وقت اسٹاپ لاس کی ضرورت نہیں ہوتی۔',
  ],
  [
    htfLiquidityQuizzes[5].explanation,
    'کوئی بھی لیکویڈیٹی سطح الٹاؤ کی ضمانت نہیں دیتی؛ قیمت سویپ کر کے مڑ سکتی ہے، رک سکتی ہے یا سیدھی پار نکل سکتی ہے۔',
  ],
];
pairs.push(...quizTranslations);

export const htfLiquidityTranslations: Record<string, string> = Object.fromEntries(pairs);
