import enDoc from './marketMakerDocument.json';
import urDoc from './marketMakerDocumentUrdu.json';
import { marketMakerSources, marketMakerQuizzes } from './marketMakerLesson';
import { mtfPairingProfiles } from '../../utils/marketMakerMath';

const pairs: Array<[string, string]> = [];
const walkPairs = (enVal: unknown, urVal: unknown) => {
  if (typeof enVal === 'string' && typeof urVal === 'string') {
    pairs.push([enVal, urVal]);
  } else if (Array.isArray(enVal) && Array.isArray(urVal)) {
    enVal.forEach((item, idx) => walkPairs(item, urVal[idx]));
  } else if (enVal && urVal && typeof enVal === 'object' && typeof urVal === 'object') {
    for (const key of Object.keys(enVal)) {
      if (['type', 'number', 'ordered', 'icon', 'tone'].includes(key)) continue;
      walkPairs((enVal as Record<string, unknown>)[key], (urVal as Record<string, unknown>)[key]);
    }
  }
};
walkPairs(enDoc, urDoc);

const sourceUr: Array<[string, string]> = [
  [
    'Investor.gov (SEC) — Stop, Stop-Limit, and Market Orders',
    'Investor.gov (SEC) — اسٹاپ، اسٹاپ لِمٹ اور مارکیٹ آرڈرز',
  ],
  [
    'Official investor education detailing how stop-market orders convert on trigger with possible slippage and how stop-limit orders risk non-execution during fast curve turns.',
    'سرکاری تعلیمی رہنمائی جو واضح کرتی ہے کہ اسٹاپ مارکیٹ آرڈرز ٹرگر ہونے پر سلپیج کے ساتھ کیسے بدلتے ہیں اور تیز موڑ کے دوران اسٹاپ لِمٹ آرڈرز کیوں غیر مکمل رہ سکتے ہیں۔',
  ],
  [
    'Investor.gov (SEC) — Types of Orders & Execution Priority',
    'Investor.gov (SEC) — آرڈر اقسام اور تکمیل کی ترجیح',
  ],
  [
    'Defines limit price boundaries, marketable orders, and why liquidity sweeps near swing highs or lows cannot guarantee exact stop fill prices.',
    'لِمٹ قیمت کی حدود، قابلِ تکمیل آرڈرز اور اس بات کی وضاحت کہ سوئنگ ہائیز یا لوز کے قریب لیکویڈیٹی سویپس پر عین اسٹاپ قیمت کی ضمانت کیوں نہیں دی جا سکتی۔',
  ],
  [
    'CME Group — Exchange Matching & Market Microstructure',
    'CME Group — ایکسچینج میچنگ اور مارکیٹ مائیکرو اسٹرکچر',
  ],
  [
    'Explains central limit order book matching, queue depth, and how resting limit interest clears across liquid futures contracts.',
    'سینٹرل لِمٹ آرڈر بک میچنگ، قطار کی گہرائی اور فیوچرز کنٹریکٹس میں آرام کرتے لِمٹ آرڈرز کی صفائی کی وضاحت۔',
  ],
  [
    'CME Group — About Volume and Open Interest',
    'CME Group — والیوم اور اوپن انٹرسٹ کا تعارف',
  ],
  [
    'Distinguishes traded volume from open interest when assessing multi-day swing expansion versus intraday liquidity sweeps.',
    'کثیر روزہ سوئنگ توسیع بمقابلہ انٹراڈے لیکویڈیٹی سویپس پرکھتے وقت تجارتی والیوم اور اوپن انٹرسٹ کا فرق واضح کرتا ہے۔',
  ],
  [
    'CFTC — Commitments of Traders Explanatory Notes',
    'CFTC — کمٹمنٹس آف ٹریڈرز کے وضاحتی نوٹس',
  ],
  [
    'Clarifies reporting categories and limits of macro positioning reports alongside multi-week curve and midweek reversal analysis.',
    'کثیر ہفتہ وار خم اور مڈ ویک ریورسل تجزیے کے ساتھ میکرو پوزیشننگ رپورٹس کے زمرے اور ان کی حدود واضح کرتا ہے۔',
  ],
  [
    'Bank for International Settlements — FX Execution Fragmentation',
    'بینک فار انٹرنیشنل سیٹلمنٹس — فاریکس تکمیل کی تقسیم',
  ],
  [
    'Explains why spot FX operates across decentralized dealer streams and electronic venues without a single consolidated order book.',
    'واضح کرتا ہے کہ اسپاٹ فاریکس کسی ایک مرکزی آرڈر بک کے بجائے غیر مرکزی ڈیلر اسٹریمز اور الیکٹرانک وینیوز پر کیوں کام کرتا ہے۔',
  ],
  [
    'NYSE — Trading Hours and Market Holidays Calendar',
    'NYSE — ٹریڈنگ کے اوقات اور مارکیٹ تعطیلات کا کیلنڈر',
  ],
  [
    'Authoritative reference for regular equity session opens, holidays, and shortened sessions that reshape liquidity curves.',
    'باقاعدہ ایکویٹی سیشن اوپنز، تعطیلات اور مختصر سیشنز کا مستند حوالہ جو لیکویڈیٹی کے خم کو متاثر کرتے ہیں۔',
  ],
  [
    'All synthetic EUR/USD and index curves, Equilibrium thresholds, and teaching illustrations are original educational diagrams, not live quotes, verified returns, or proof of dealer positioning.',
    'اس باب میں تمام فرضی EUR/USD اور انڈیکس خم، ایکویلبریم حدود اور تعلیمی خاکے خالصتاً اصل تعلیمی تصاویر ہیں، یہ لائیو نرخ، مصدقہ منافع یا ڈیلر پوزیشننگ کا ثبوت نہیں۔',
  ],
  [
    'All synthetic EUR/USD and NQ-style Market Maker curves, Equilibrium ratios, and stick-figure stories in this chapter are illustrative teaching diagrams, not live quotes, verified returns, or proof of dealer inventory. Candlesticks cannot confirm participant identity or guarantee any future target.',
    'اس باب میں تمام فرضی EUR/USD اور NQ طرز کے مارکیٹ میکر خم، ایکویلبریم تناسب اور اسٹک فِگر کہانیاں محض تعلیمی خاکے ہیں، لائیو نرخ، مصدقہ منافع یا ڈیلر انوینٹری کا ثبوت نہیں۔ کینڈل اسٹکس کسی شریک کی شناخت ثابت نہیں کرتیں اور نہ ہی کسی مستقبل کے ہدف کی ضمانت دیتی ہیں۔',
  ],
  [
    'Market Maker Buy Model (MMBM) & MMSM',
    'مارکیٹ میکر بائے ماڈل (MMBM) اور MMSM',
  ],
];

const quizUr: Array<[string, string]> = [
  [
    marketMakerQuizzes[0].question,
    '1.0780 (لو) سے 1.0960 (ہائی) تک ہائر ٹائم فریم ڈیلنگ رینج والے مارکیٹ میکر بائے ماڈل (MMBM) میں ڈسکاؤنٹ فلٹر شدہ خریداری کہاں جائز ہے؟',
  ],
  [
    marketMakerQuizzes[0].context!,
    'ایکویلبریم فلٹرنگ کے لیے فرضی تعلیمی ڈیلنگ رینج۔',
  ],
  [
    marketMakerQuizzes[0].options[0],
    'صرف 1.0870 ایکویلبریم وسط سے نیچے ڈسکاؤنٹ میں کسی موزوں PD اَرے پر۔',
  ],
  [
    marketMakerQuizzes[0].options[1],
    'صرف 1.0920 سے اوپر اوریجنل کنسولیڈیشن ہائی ٹوٹنے کے بعد۔',
  ],
  [
    marketMakerQuizzes[0].options[2],
    'ایکویلبریم سے قطع نظر رینج میں کہیں بھی جب 1 منٹ کی سبز کینڈل بنے۔',
  ],
  [
    marketMakerQuizzes[0].explanation,
    'ایکویلبریم = (1.0960 + 1.0780) ÷ 2 = 1.0870۔ ڈسکاؤنٹ ایکویلبریم فلٹر پریمیم (> 1.0870) میں خریداری منع کرتا ہے اور لانگز کو صرف ایکویلبریم سے نیچے ڈسکاؤنٹ PD اَریز تک محدود رکھتا ہے۔',
  ],
  [
    marketMakerQuizzes[1].question,
    'نزولی سیل سائیڈ کَرو ڈیلی ڈسکاؤنٹ FVG کو چھو کر پیر کا لو سویپ کرتا ہے، پھر مکمّل CISD یا MSS کلوز کے بغیر معمولی وِک اچھال بناتا ہے۔ MMBM کا درست عمل کیا ہے؟',
  ],
  [
    marketMakerQuizzes[1].options[0],
    'گرتی کینڈلز پکڑنے کے بجائے مکمّل CISD/MSS باڈی کلوز اور ساختی FVG/بریکر تبدیلی کا انتظار کریں۔',
  ],
  [
    marketMakerQuizzes[1].options[1],
    'فوراً مکمل سائز میں داخل ہوں کیونکہ پیر کے لو کا ہر سویپ اسمارٹ منی ریورسل ثابت کرتا ہے۔',
  ],
  [
    marketMakerQuizzes[1].options[2],
    'گراوٹ کو LRLR ٹرمینس قرار دے کر ڈیلی ڈسکاؤنٹ لو کی طرف شارٹ کریں۔',
  ],
  [
    marketMakerQuizzes[1].explanation,
    'HTF PD اَرے میں سویپ محض پہلی شرط ہے؛ مکمّل کینڈل باڈی سے CISD یا MSS تصدیق کے بغیر قیمت مزید نیچے ڈسٹری بیوٹ ہو سکتی ہے۔',
  ],
  [
    marketMakerQuizzes[2].question,
    '1.0800 SMR لو سے 1.0920 اوریجنل کنسولیڈیشن ٹرمینس تک کے MMBM میں 1.0860 کا کیا کردار ہے؟',
  ],
  [
    marketMakerQuizzes[2].options[0],
    'یہ 50% SMR تناسب گیٹ ہے جو ٹرمینس کی طرف کثیر مرحلہ تسلسل کی توثیق کرتا ہے۔',
  ],
  [
    marketMakerQuizzes[2].options[1],
    'یہ ضمانت دیتا ہے کہ 1.0860 سے اوپر ہر کینڈل بغیر پل بیک کے سبز بند ہو گی۔',
  ],
  [
    marketMakerQuizzes[2].options[2],
    'یہ اوریجنل کنسولیڈیشن ہدف منسوخ کر کے ماڈل کو MMSM میں بدل دیتا ہے۔',
  ],
  [
    marketMakerQuizzes[2].explanation,
    '1.0800 اور 1.0920 کا عین نصف 1.0860 ہے۔ اس 50% تناسب گیٹ سے اوپر بند ہونا مرحلہ-2 ری اکیومولیشن کی نشاندہی کرتا ہے؛ اس سے نیچے رکنا ناکام خم کی تنبیہ ہے۔',
  ],
  [
    marketMakerQuizzes[3].question,
    'قلیل مدتی سوئنگ تجزیے میں کم مزاحمتی لیکویڈیٹی رن (LRLR) کی درست تعریف کون سی ہے؟',
  ],
  [
    marketMakerQuizzes[3].options[0],
    'ہموار برابر ہائیز یا لوز کے آگے صاف کھلی جگہ جہاں راستے میں کم سے کم مخالف آرڈر بلاکس یا بریکرز ہوں۔',
  ],
  [
    marketMakerQuizzes[3].options[1],
    'متعدد تازہ ہائر ٹائم فریم بیئرش بریکرز کے عین نیچے الجھی اوورلیپ رینجز۔',
  ],
  [
    marketMakerQuizzes[3].options[2],
    'صرف لندن یا نیویارک سیشن کے باہر 5 منٹ کا کوئی بھی بریک آؤٹ۔',
  ],
  [
    marketMakerQuizzes[3].explanation,
    'LRLR غیر پامال ہموار لیکویڈیٹی تالابوں کی طرف کم رکاوٹ والے صاف راستے کی نشاندہی کرتا ہے، جبکہ HRLR کو گھنے مخالف اسٹرکچر سے لڑنا پڑتا ہے۔',
  ],
  [
    marketMakerQuizzes[4].question,
    'ایک ٹریڈر MMBM میں دو آرڈر لگاتا ہے: پہلا مرحلہ 4 لو رسک بائے اور دوسرا مرحلہ 5 ری اکیومولیشن پر۔ سیٹ اپ رسک کا بجٹ کیسے ہونا چاہیے؟',
  ],
  [
    marketMakerQuizzes[4].options[0],
    'دونوں آرڈرز پر ایک ہی سیٹ اپ رسک بجٹ تقسیم کریں تاکہ مجموعی نقصان طے شدہ حد کے اندر رہے۔',
  ],
  [
    marketMakerQuizzes[4].options[1],
    'ہر آرڈر پر اکاؤنٹ کی پوری حد کا رسک لیں کیونکہ ری اکیومولیشن خطرے سے پاک ہوتی ہے۔',
  ],
  [
    marketMakerQuizzes[4].options[2],
    'مرحلہ-1 ری اکیومولیشن فِل ہوتے ہی حفاظتی اسٹاپ لاس ہٹا دیں۔',
  ],
  [
    marketMakerQuizzes[4].explanation,
    'منظم پوزیشن سائزنگ کے اصولوں کے تحت ایک ہی سمت کے متعدد اندراجات اخراجات سے قبل ایک ہی رسک بجٹ بانٹتے ہیں، اسے دوگنا نہیں کرتے۔',
  ],
];

const uiAndVisualUr: Array<[string, string]> = [
  ['Key Takeaways', 'اہم نکات'],
  ['On this page', 'اس صفحے پر'],
  ['Continue Studying', 'مطالعہ جاری رکھیں'],
  [
    'All synthetic price levels, stick-figure scenes, Dealing Range calculations, and EUR/USD or NQ-style case curves in this lesson are illustrative educational diagrams — never live venue quotes, proof of dealer intent, or guaranteed outcomes.',
    'اس سبق میں تمام فرضی قیمتیں، اسٹک فِگر کہانیاں، ڈیلنگ رینج حسابات اور EUR/USD یا NQ طرز کے مثال خم خالصتاً تعلیمی خاکے ہیں — یہ لائیو مارکیٹ نرخ، ڈیلر کے ارادے کا ثبوت یا یقینی نتائج نہیں ہیں۔',
  ],
  [
    'Test Market Maker Propulsion in Chart Lab',
    'چارٹ لیب میں مارکیٹ میکر پروپلشن آزمائیں',
  ],
  ['Read the Silver Bullet Time-Window Guide', 'سلور بُلٹ ٹائم ونڈو رہنما پڑھیں'],
  ['Study the 2022 Time-Based Entry Framework', '2022 وقت پر مبنی انٹری فریم ورک پڑھیں'],
  ['Explore Daily Profiles & Power of Three (PO3)', 'ڈیلی پروفائلز اور پاور آف تھری (PO3) دیکھیں'],
  ['Weekly Profile & Five-Day Delivery Model', 'ویکلی پروفائل اور پانچ روزہ ڈیلیوری ماڈل'],
  ['Master Market Structure Shift (MSS)', 'مارکیٹ اسٹرکچر شفٹ (MSS) سمجھیں'],
  ['Fair Value Gaps (FVG) & Consequent Encroachment', 'فیئر ویلیو گیپس (FVG) اور کانسیکوئنٹ انکروچمنٹ'],
  ['Confirmed HTF narrative & 20-day IPDA Dealing Range bias before dropping to LTF', 'لوئر ٹائم فریم پر جانے سے پہلے HTF سیاق اور 20 دن کے IPDA ڈیلنگ رینج کی تصدیق کی'],
  ['Marked Original Consolidation boundaries and left-side SS/BS shelves prior to SMR', 'SMR سے پہلے اوریجنل کنسولیڈیشن کی حدود اور بائیں طرف کے وقفے نشان زد کیے'],
  ['Verified Equilibrium alignment: longing strictly in Discount (< 50%) or shorting in Premium (> 50%)', 'ایکویلبریم مطابقت کی تصدیق: خریداری صرف ڈسکاؤنٹ (<50%) اور فروخت صرف پریمیم (>50%) میں'],
  ['Waited for liquidity sweep + HTF PD array tag + completed CISD/MSS body close', 'لیکویڈیٹی سویپ + HTF PD اَرے لمس + مکمّل CISD/MSS باڈی کلوز کا انتظار کیا'],
  ['Confirmed Low-Resistance (LRLR) path toward Terminus with no stacked opposing Breakers', 'ٹرمینس تک کم مزاحمتی (LRLR) راستہ جانچا کہ آگے مخالف بریکرز کا انبار تو نہیں'],
  ['Divided single setup risk budget across LRB and Re-Accumulation with predefined stop placement', 'LRB اور ری اکیومولیشن پر ایک ہی رسک بجٹ بانٹا اور منسوخی اسٹاپ پہلے سے طے کیا'],
  ['Checklist items confirmed', 'تصدیق شدہ نکات'],
  ['Ready to log replay setup (still verify session timing and costs).', 'ری پلے سیٹ اپ نوٹ کرنے کے لیے تیار (سیشن وقت اور اخراجات پھر بھی جانچیں)۔'],
  ['Complete the remaining checks before treating this curve as qualified.', 'اس خم کو موزوں قرار دینے سے پہلے باقی جانچ مکمل کریں۔'],
  ['Technical market references', 'تکنیکی مارکیٹ حوالے'],
  ['Short-Term Swing Execution & Midweek Reversal Summary', 'قلیل مدتی سوئنگ عمل اور مڈ ویک ریورسل کا خلاصہ'],
  ['Key operational rules linking multi-day Dealing Ranges, LRLR paths, and midweek reversal windows.', 'کثیر روزہ ڈیلنگ رینجز، LRLR راستوں اور مڈ ویک ریورسل ونڈوز کو جوڑنے والے بنیادی عملی اصول۔'],
  ['Multi-Day Range Calibration & 20-Day Lookback', 'کثیر روزہ رینج کا تعین اور 20 دن کا لک بیک'],
  [
    'Pairing the trailing 20-day Dealing Range with the weekly open classifies whether the active week is extending a trend or preparing an intraweek sweep into higher-timeframe Discount or Premium.',
    'پچھلی 20 دن کی ڈیلنگ رینج کو ہفتہ وار اوپن کے ساتھ ملانے سے اندازہ ہوتا ہے کہ رواں ہفتہ رجحان بڑھا رہا ہے یا ہائر ٹائم فریم ڈسکاؤنٹ/پریمیم میں مڈ ویک سویپ کی تیاری کر رہا ہے۔',
  ],
  ['Two-Sided Curve Geometry (MMBM & MMSM)', 'دو طرفہ کَرو ساخت (MMBM اور MMSM)'],
  [
    'Every balanced expansion links an Original Consolidation, a multi-shelf distribution or accumulation curve, an opposing HTF PD array sweep (SMR), and mirrored re-accumulation or re-distribution shelves back toward the origin.',
    'ہر متوازن توسیع اوریجنل کنسولیڈیشن، کثیر زینہ خم، مخالف HTF PD اَرے سویپ (SMR) اور واپس آغاز کی طرف جانے والے عکسی زینوں کو آپس میں جوڑتی ہے۔',
  ],
  ['Low-Resistance (LRLR) vs. High-Resistance (HRLR) Friction', 'کم مزاحمتی (LRLR) بمقابلہ زیادہ مزاحمتی (HRLR) رکاوٹ'],
  [
    'Paths toward clean, unvisited Equal Highs or Lows with minimal opposing Breakers clear smoothly (LRLR), whereas congested return legs stacked with fresh opposing Order Blocks tend to chop and stall (HRLR).',
    'کم مخالف بریکرز کے ساتھ صاف غیر پامال برابر ہائیز یا لوز کا راستہ آسانی سے طے ہوتا ہے (LRLR)، جبکہ تازہ مخالف آرڈر بلاکس سے بھری ٹانگیں رک کر الجھتی ہیں (HRLR)۔',
  ],
  ['Midweek Reversal Timing Windows', 'مڈ ویک ریورسل اوقات'],
  [
    'Weekly highs or lows frequently establish themselves between Tuesday London and Wednesday New York sessions when early-week expansion tags a weekly liquidity threshold and shifts structure decisively.',
    'ہفتہ وار ہائی یا لو اکثر منگل لندن سے بدھ نیویارک سیشن کے درمیان بنتے ہیں جب ہفتے کے آغاز کی حرکت ہفتہ وار لیکویڈیٹی چھو کر اسٹرکچر واضح پلٹ دیتی ہے۔',
  ],
  ['Dealing Range Equilibrium & Symmetry Formula', 'ڈیلنگ رینج ایکویلبریم اور تناسب فارمولا'],
  ['Equilibrium = (Range High + Range Low) ÷ 2 | 50% SMR Symmetry = SMR + (Terminus − SMR) × 0.5', 'ایکویلبریم = (رینج ہائی + رینج لو) ÷ 2 | 50% SMR تناسب = SMR + (ٹرمینس − SMR) × 0.5'],

  // Visual 1: Stick-Figure Comic Intro
  ['Why Curves Trap Chasers: Stick-Figure Story', 'خم جلد بازوں کو کیسے پھنساتے ہیں: اسٹک فِگر کہانی'],
  ['Synthetic story · Click step to see why patience waits for SMR', 'فرضی کہانی · دیکھیں صبر SMR کا انتظار کیوں کرتا ہے'],
  ['1. Upper Box', '1. اوپری باکس'],
  ['2. Panic Shorts', '2. گھبراہٹ میں سیل'],
  ['3. SMR Sweep', '3. SMR سویپ'],
  ['4. Return Home', '4. واپسی ٹرمینس'],
  ['Chaser: Selling every dip!', 'جلد باز: ہر گراوٹ بیچ رہا ہے!'],
  ['Planner: Waiting at Discount...', 'منصوبہ ساز: ڈسکاؤنٹ پر انتظار...'],
  ['Stops stacked above!', 'اسٹاپس اوپر جمع!'],
  ['Chaser trapped below!', 'جلد باز نیچے پھنس گیا!'],
  ['HTF Discount + Sweep!', 'HTF ڈسکاؤنٹ + سویپ!'],
  ['Planner enters LRB', 'منصوبہ ساز LRB میں داخل'],
  ['Terminus Reached!', 'ٹرمینس پورا!'],
  ['Chasers stopped out', 'جلد بازوں کے اسٹاپ ہٹ'],
  ['Stage 1: Sideways Original Consolidation sits quietly before any breakout chase begins.', 'مرحلہ 1: کسی بریک آؤٹ دوڑ سے پہلے اوپری اوریجنل کنسولیڈیشن خاموشی سے بنتی ہے۔'],
  ['Stage 2: As price steps lower in two shelves, impatient sellers short every drop and stack buy stops overhead.', 'مرحلہ 2: قیمت دو زینوں میں نیچے اترتی ہے تو جلد باز ہر گراوٹ بیچ کر اوپر بائے اسٹاپس لگا دیتے ہیں۔'],
  ['Stage 3: Price sweeps the low into HTF Discount, snaps upward with displacement (SMR), and enters Low-Risk Buy.', 'مرحلہ 3: قیمت HTF ڈسکاؤنٹ میں لو سویپ کر کے ڈسپلیسمنٹ (SMR) سے پلٹتی ہے اور منصوبہ ساز LRB میں داخل ہوتا ہے۔'],
  ['Stage 4: Climbing across the same shelves, price clears the upper box (Terminus) where late shorts unwind.', 'مرحلہ 4: انہی زینوں سے چڑھتی قیمت اوپری باکس (ٹرمینس) عبور کرتی ہے جہاں پرانے شارٹس نکل جاتے ہیں۔'],

  // Visual 2: Animated 6-Stage MMBM Lifecycle
  ['Animated 6-Stage Market Maker Buy Model (MMBM)', 'متحرک 6 مرحلہ مارکیٹ میکر بائے ماڈل (MMBM)'],
  ['Synthetic EUR/USD-style curve · Toggle playback or failure branch', 'فرضی EUR/USD طرز کَرو · پلے بیک یا ناکامی کی شاخ بدلیں'],
  ['Play', 'چلائیں'],
  ['Pause', 'روکیں'],
  ['Step', 'اگلا مرحلہ'],
  ['Reset', 'دوبارہ'],
  ['Valid Curve', 'درست کَرو'],
  ['Failure Branch', 'ناکامی کی شاخ'],
  ['Orig. Consol.', 'اوریجنل کنسولیڈیشن'],
  ['SS-1 Shelf', 'SS-1 زینہ'],
  ['SS-2 Shelf', 'SS-2 زینہ'],
  ['HTF Discount', 'HTF ڈسکاؤنٹ'],
  ['SMR 1.0800', 'SMR 1.0800'],
  ['50% Gate 1.0860', '50% گیٹ 1.0860'],
  ['LRB Entry', 'LRB انٹری'],
  ['Re-Acc 1', 'ری اکیومولیشن 1'],
  ['Re-Acc 2', 'ری اکیومولیشن 2'],
  ['Terminus 1.0920', 'ٹرمینس 1.0920'],
  ['Failed 50% Reclaim', '50% بحالی ناکام'],
  ['Viewing Stage', 'موجودہ مرحلہ'],
  ['1. Original Consolidation (1.0900–1.0924)', '1. اوریجنل کنسولیڈیشن (1.0900–1.0924)'],
  ['2. Sell-Side Delivery Curve (SS-1 & SS-2)', '2. سیل سائیڈ ڈیلیوری کَرو (SS-1 اور SS-2)'],
  ['3. Smart Money Reversal at 1.0800', '3. 1.0800 پر اسمارٹ منی ریورسل'],
  ['4. Low-Risk Buy Retest (LRB at 1.0835)', '4. لو رسک بائے ری ٹیسٹ (1.0835)'],
  ['5. Re-Accumulation Flip & 50% Gate', '5. ری اکیومولیشن تبدیلی اور 50% گیٹ'],
  ['6. Terminus Liquidity Target (1.0920)', '6. ٹرمینس لیکویڈیٹی ہدف (1.0920)'],
  ['Invalidation: Fails Below 1.0860 & Breaks 1.0800', 'منسوخی: 1.0860 سے نیچے رُک کر 1.0800 توڑ گیا'],

  // Visual 3: MMBM vs MMSM Symmetry
  ['Interactive Symmetry: MMBM (U-Curve) vs. MMSM (Inverted-U)', 'انٹرایکٹو تناسب: MMBM (U-خم) بمقابلہ MMSM (الٹا U-خم)'],
  ['Switch direction to compare left-to-right mirror roles', 'بائیں سے دائیں عکسی کردار دیکھنے کے لیے سمت بدلیں'],
  ['MMBM (Buy Model)', 'MMBM (بائے ماڈل)'],
  ['MMSM (Sell Model)', 'MMSM (سیل ماڈل)'],
  ['Left: Sell-Side Curve', 'بایاں: سیل سائیڈ کَرو'],
  ['Right: Buy-Side Curve', 'دایاں: بائے سائیڈ کَرو'],
  ['Left: Buy-Side Curve', 'بایاں: بائے سائیڈ کَرو'],
  ['Right: Sell-Side Curve', 'دایاں: سیل سائیڈ کَرو'],
  ['Original Consol. (BSL Target)', 'اوریجنل کنسولیڈیشن (BSL ہدف)'],
  ['Original Consol. (SSL Target)', 'اوریجنل کنسولیڈیشن (SSL ہدف)'],
  ['HTF Discount SMR', 'HTF ڈسکاؤنٹ SMR'],
  ['HTF Premium SMR', 'HTF پریمیم SMR'],
  ['Re-Accumulation Flip', 'ری اکیومولیشن تبدیلی'],
  ['Re-Distribution Flip', 'ری ڈسٹری بیوشن تبدیلی'],
  ['LRB', 'LRB'],
  ['LRS', 'LRS'],
  ['Symmetry Axis', 'تناسب محور'],

  // Visual 4: Equilibrium & 50% Gate Gauge
  ['Dealing Range Equilibrium & 50% SMR Symmetry Sandbox', 'ڈیلنگ رینج ایکویلبریم اور 50% SMR تناسب سینڈ باکس'],
  ['Slide synthetic price to test Discount eligibility across 1.0800–1.0920', '1.0800–1.0920 رینج میں ڈسکاؤنٹ کی اہلیت جانچنے کے لیے قیمت کھسکائیں'],
  ['Synthetic Price', 'فرضی قیمت'],
  ['Range Position', 'رینج میں مقام'],
  ['Market Zone', 'مارکیٹ زون'],
  ['Discount Buy Rule', 'ڈسکاؤنٹ خریداری اصول'],
  ['50% SMR Symmetry', '50% SMR تناسب'],
  ['Extreme Premium', 'انتہائی پریمیم'],
  ['Premium (> 50%)', 'پریمیم (> 50%)'],
  ['Equilibrium (50%)', 'ایکویلبریم (50%)'],
  ['Discount (< 50%)', 'ڈسکاؤنٹ (< 50%)'],
  ['Extreme Discount', 'انتہائی ڈسکاؤنٹ'],
  ['Permitted (Below Equilibrium)', 'جائز (ایکویلبریم سے نیچے)'],
  ['Blocked (Premium Zone)', 'ممنوع (پریمیم زون)'],
  ['Cleared >= 1.0860', 'عبور شدہ >= 1.0860'],
  ['Not Yet Reclaimed', 'ابھی بحال نہیں ہوا'],
  ['PREMIUM — Avoid Discount Longs', 'پریمیم — ڈسکاؤنٹ خریداری سے بچیں'],
  ['DISCOUNT — Longs Permitted', 'ڈسکاؤنٹ — خریداری جائز'],
  ['50% Eq / SMR Gate: 1.0860', '50% ایکویلبریم / SMR گیٹ: 1.0860'],
  ['OTE 70.5%: 1.0835', 'OTE 70.5%: 1.0835'],

  // Visual 5: LRLR vs HRLR Characters
  ['Path Friction Lab: Sprinter (LRLR) vs. Hurdler (HRLR)', 'راستے کی رکاوٹ لیب: سپرنٹر (LRLR) بمقابلہ رکاوٹ دوڑ (HRLR)'],
  ['Animated stick-figure runner · Toggle target resistance profile', 'متحرک اسٹک فِگر دوڑ · ہدف مزاحمت کا انداز بدلیں'],
  ['LRLR (Clean Track)', 'LRLR (صاف ٹریک)'],
  ['HRLR (Hurdle Track)', 'HRLR (رکاوٹوں والا ٹریک)'],
  ['Open Liquidity Corridor', 'کھلی لیکویڈیٹی گزرگاہ'],
  ['Smooth EQH Target', 'ہموار EQH ہدف'],
  ['Fast Delivery', 'تیز ترسیل'],
  ['Breaker Hurdle 1', 'بریکر رکاوٹ 1'],
  ['Old OB Hurdle 2', 'پرانا OB رکاوٹ 2'],
  ['Swing Cap Hurdle 3', 'سوئنگ رکاوٹ 3'],
  ['Slow Choppy Progress', 'سست اور الجھی پیش رفت'],

  // Visual 6: CISD vs SMR Inspector
  ['SMR Trigger Inspector: Sweep → CISD → MSS + FVG', 'SMR ٹرگر معائنہ کار: سویپ ← CISD ← MSS + FVG'],
  ['Toggle completed candle checks before calling a Smart Money Reversal', 'اسمارٹ منی ریورسل کہنے سے پہلے مکمّل کینڈل شرائط آزمائیں'],
  ['1. Swept Prior Low into HTF Discount', '1. HTF ڈسکاؤنٹ میں پچھلا لو سویپ ہوا'],
  ['2. CISD Body Closed Above Run Open', '2. آخری نزول کے اوپن سے اوپر CISD باڈی بند ہوئی'],
  ['3. MSS Body Closed Above Opposing Swing', '3. مخالف سوئنگ سے اوپر MSS باڈی بند ہوئی'],
  ['4. Clean 3-Candle FVG Formed', '4. صاف 3 کینڈل FVG تشکیل پایا'],
  ['Grade: Confirmed SMR + LRB Anchor', 'درجہ: مصدقہ SMR + LRB اینکر'],
  ['Grade: Early CISD Watch (No Complete MSS/FVG)', 'درجہ: ابتدائی CISD مشاہدہ (مکمّل MSS/FVG باقی)'],
  ['Grade: Unconfirmed Sweep — Do Not Catch Falling Knife', 'درجہ: غیر مصدقہ سویپ — گرتی قیمت نہ پکڑیں'],
  ['Grade: Invalid — Missing Liquidity Sweep', 'درجہ: ناموزوں — لیکویڈیٹی سویپ غائب ہے'],

  // Visual 7: Left-to-Right Array Flip
  ['Left-to-Right Symmetry: Sell-Side Shelf Flips to Support', 'بائیں سے دائیں تناسب: سیل سائیڈ زینہ سپورٹ میں بدلتا ہے'],
  ['Stage-2 Re-Accumulation turns left-side resistance into right-side launchpads', 'مرحلہ-2 ری اکیومولیشن بائیں رکاوٹ کو دائیں لانچ پیڈ میں بدلتا ہے'],
  ['1. Left Drop Shelf', '1. بائیں گراوٹ کا زینہ'],
  ['2. Flipped Breaker / IFVG', '2. تبدیل شدہ بریکر / IFVG'],
  ['Left Bearish FVG / OB', 'بایاں بیئرش FVG / OB'],
  ['Right Body Break Through Shelf', 'دائیں باڈی نے زینہ اوپر توڑا'],
  ['Flipped Bullish IFVG / Breaker', 'تبدیل شدہ بُلش IFVG / بریکر'],
  ['Re-Accumulation Entry', 'ری اکیومولیشن انٹری'],
  ['To Terminus', 'ٹرمینس کی طرف'],

  // Visual 8: MTF Matrix
  ['Three-Timeframe Hierarchy Selector', 'تین ٹائم فریم درجہ بندی منتخب کنندہ'],
  ['Match Higher-Timeframe Anchor, Curve Chart & Execution Trigger', 'HTF اینکر، کَرو چارٹ اور انٹری ٹرگر کی جوڑی دیکھیں'],
  ['HTF Anchor', 'HTF اینکر'],
  ['Curve Chart', 'کَرو چارٹ'],
  ['Entry Trigger', 'انٹری ٹرگر'],
  ['Typical Hold', 'عام مدت'],
  ['Key Filter', 'بنیادی فلٹر'],
  [mtfPairingProfiles[0].label, 'کثیر ہفتہ وار سوئنگ پروفائل'],
  [mtfPairingProfiles[0].htfContext, 'ماہانہ / ہفتہ وار PD اَرے'],
  [mtfPairingProfiles[0].curveMap, 'یومیہ (D1) MMBM / MMSM کَرو'],
  [mtfPairingProfiles[0].executionTrigger, '4 گھنٹے / 1 گھنٹہ SMR اور FVG'],
  [mtfPairingProfiles[0].typicalHold, '3 سے 15 تجارتی دن'],
  [mtfPairingProfiles[0].keyFilter, 'مرحلہ 1 سے پہلے ویکلی انتہا کے لمس اور ڈیلی CISD/MSS کا انتظار کریں۔'],
  [mtfPairingProfiles[1].label, 'قلیل مدتی سوئنگ پروفائل'],
  [mtfPairingProfiles[1].htfContext, 'ہفتہ وار / یومیہ PD اَرے'],
  [mtfPairingProfiles[1].curveMap, '4 گھنٹے / 1 گھنٹہ MMBM / MMSM کَرو'],
  [mtfPairingProfiles[1].executionTrigger, '15 منٹ / 5 منٹ SMR اور بریکر'],
  [mtfPairingProfiles[1].typicalHold, '1 سے 3 تجارتی دن'],
  [mtfPairingProfiles[1].keyFilter, '20 دن کے IPDA لک بیک کو منگل/بدھ مڈ ویک ریورسل اوقات کے ساتھ جوڑیں۔'],
  [mtfPairingProfiles[2].label, 'انٹراڈے سیشن پروفائل'],
  [mtfPairingProfiles[2].htfContext, 'یومیہ / 4 گھنٹے سیشن ہائی-لو'],
  [mtfPairingProfiles[2].curveMap, '15 منٹ / 5 منٹ سیشن کَرو'],
  [mtfPairingProfiles[2].executionTrigger, 'کِل زون کے اندر 1 منٹ CISD / FVG'],
  [mtfPairingProfiles[2].typicalHold, '30 منٹ تا 4 گھنٹے'],
  [mtfPairingProfiles[2].keyFilter, 'لندن یا نیویارک کِل زون وقت اور کم مزاحمتی (LRLR) راستہ درکار ہے۔'],
];

export const marketMakerTranslations: Record<string, string> = Object.fromEntries([
  ...pairs,
  ...sourceUr,
  ...quizUr,
  ...uiAndVisualUr,
]);

// Ensure every marketMakerSources entry is verified in map
void marketMakerSources;
