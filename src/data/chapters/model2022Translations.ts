import enDoc from './model2022Document.json';
import urDoc from './model2022DocumentUrdu.json';
import { model2022Sources, model2022Quizzes } from './model2022Lesson';
import { killzoneTimelineSpecs, mtf2022Tiers } from '../../utils/model2022Math';

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
    'Investor.gov (SEC) — Stop Order',
    'Investor.gov (SEC) — اسٹاپ آرڈر',
  ],
  [
    'Stock stop-market orders become market orders when triggered and may execute away from the stop price. Other products and order types have their own rules.',
    'اسٹاک اسٹاپ مارکیٹ آرڈرز ٹرگر ہونے پر مارکیٹ آرڈر بن جاتے ہیں اور اسٹاپ قیمت سے ہٹ کر فِل ہو سکتے ہیں۔ دیگر مصنوعات اور آرڈر اقسام کے اپنے اصول ہیں۔',
  ],
  [
    'Investor.gov (SEC) — Types of Orders & Execution Priority',
    'Investor.gov (SEC) — آرڈر اقسام اور تکمیل کی ترجیح',
  ],
  [
    'Explains limit-price ceilings, marketable orders, and why fast sweeps near swing extremes cannot assure exact fill prices.',
    'لِمٹ قیمت کی حدود، قابلِ تکمیل آرڈرز اور اس بات کی وضاحت کہ سوئنگ انتہاؤں کے قریب تیز سویپس پر عین فِل قیمت کا یقین کیوں نہیں دلایا جا سکتا۔',
  ],
  [
    'CME Group — Micro E-mini Nasdaq-100 Specifications',
    'CME Group — مائیکرو ای منی نیسڈیک 100 کی تفصیلات',
  ],
  [
    'MNQ uses $2 per index point and a 0.25-point minimum tick ($0.50 tick value), distinct from full NQ ($20 per point) and broker CFDs.',
    'MNQ فی انڈیکس پوائنٹ $2 اور 0.25 کم از کم ٹِک ($0.50 ٹِک ویلیو) استعمال کرتا ہے، جو مکمل NQ ($20 فی پوائنٹ) اور بروکر CFDs سے مختلف ہے۔',
  ],
  [
    'CME Group — Exchange Matching & Market Microstructure',
    'CME Group — ایکسچینج میچنگ اور مارکیٹ مائیکرو اسٹرکچر',
  ],
  [
    'Exchange explanation of central limit order book matching, FIFO and pro-rata allocation, and queue consumption.',
    'سینٹرل لِمٹ آرڈر بک میچنگ، FIFO اور پرو راٹا تقسیم، اور قطار کے استعمال کی ایکسچینج وضاحت۔',
  ],
  [
    'NYSE — Trading Hours and Market Holidays Calendar',
    'NYSE — ٹریڈنگ کے اوقات اور مارکیٹ تعطیلات کا کیلنڈر',
  ],
  [
    'Primary reference for the regular U.S. equities cash session open (09:30 ET), holidays, and early-close schedules.',
    'باقاعدہ امریکی ایکویٹیز کیش سیشن اوپن (09:30 ET)، تعطیلات اور قبل از وقت بندش کا بنیادی حوالہ۔',
  ],
  [
    'NIST — Daylight Saving Time Rules',
    'NIST — ڈے لائٹ سیونگ ٹائم کے قواعد',
  ],
  [
    'Authoritative reference for U.S. clock changes so New York local Killzones remain synchronized with America/New_York.',
    'امریکی گھڑی کی تبدیلیوں کا مستند حوالہ تاکہ نیویارک کے مقامی کِل زونز America/New_York کے ساتھ ہم آہنگ رہیں۔',
  ],
  [
    'BLS — Employment Situation Release Schedule',
    'BLS — روزگار صورتحال کے اعداد و شمار کا شیڈول',
  ],
  [
    'Official schedule for 08:30 ET Non-Farm Payrolls and macro employment releases that trigger sharp session sweeps.',
    'صبح 08:30 ET نان فارم پے رولز اور روزگار کے سرکاری اعلانات کا شیڈول جو تیز سیشن سویپس پیدا کرتے ہیں۔',
  ],
  [
    'Federal Reserve — FOMC Calendars',
    'فیڈرل ریزرو — FOMC کیلنڈرز',
  ],
  [
    'Official FOMC meeting and rate-decision schedule distinguishing announcement spikes from regular afternoon sessions.',
    'FOMC اجلاسوں اور شرح سود فیصلوں کا سرکاری شیڈول جو اعلان کے جھٹکوں کو عام سہ پہر کے سیشنز سے الگ کرتا ہے۔',
  ],
  [
    'All synthetic sequence diagrams, session time grids, OTE metrics, and checklist examples are original educational illustrations, not live quotes or historical executions.',
    'اس باب میں تمام فرضی سلسلہ وار خاکے، سیشن ٹائم جدول، OTE پیمائشیں اور چیک لسٹ مثالیں اصل تعلیمی تصاویر ہیں، یہ لائیو مارکیٹ نرخ یا تاریخی سودے نہیں۔',
  ],
  [
    'All synthetic NQ-style 2022 sequences, Killzone clocks, OTE calculations, and stick-figure illustrations in this chapter are educational diagrams, not live market quotes, historical fills, or guaranteed setups. Completing every condition filters chart study; it never predicts profits.',
    'اس باب میں تمام فرضی NQ طرز کے 2022 سلسلے، کِل زون گھڑیاں، OTE حسابات اور اسٹک فِگر خاکے تعلیمی تصاویر ہیں، لائیو مارکیٹ نرخ، تاریخی فِلز یا یقینی سیٹ اپس نہیں۔ ہر شرط مکمل ہونا چارٹ مطالعے کا فلٹر ہے؛ یہ کبھی منافع کی پیش گوئی نہیں کرتا۔',
  ],
  [
    'ICT 2022 Model: A Time-Based Entry Framework',
    'ICT 2022 ماڈل: وقت پر مبنی انٹری فریم ورک',
  ],
  [
    'ICT 2022 Model Explained: Time, Sweep, MSS & FVG',
    'ICT 2022 ماڈل کی مکمل وضاحت: وقت، سویپ، MSS اور FVG',
  ],
  [
    '25 November 2026',
    '25 نومبر 2026',
  ],
];

const quizUr: Array<[string, string]> = [
  [
    model2022Quizzes[0].question,
    'بُلش ICT 2022 ماڈل سیٹ اپ کی تصدیق سے پہلے لازمی زمانی ترتیب کیا ہے؟',
  ],
  [
    model2022Quizzes[0].context!,
    'سیشن فلٹر سے لے کر FVG ریٹریسمنٹ تک وقت اور قیمت کی زمانی مشاہداتی زنجیر۔',
  ],
  [
    model2022Quizzes[0].options[0],
    'ہائر ٹائم فریم ڈرا ← فعال NY ٹائم ونڈو ← لیکویڈیٹی سویپ ← ڈسپلیسمنٹ MSS ← FVG میں واپسی',
  ],
  [
    model2022Quizzes[0].options[1],
    '1 منٹ FVG بریک ← بے ترتیب دوپہر کی انٹری ← بعد میں سویپ کی امید ← HTF نیریٹو',
  ],
  [
    model2022Quizzes[0].options[2],
    'برابر لو کا اچھال ← کینڈل 2 کے اندر تنگ اسٹاپ ← انٹری کے بعد ہدف اوپر بڑھانا',
  ],
  [
    model2022Quizzes[0].explanation,
    '2022 ماڈل میں زمانی ترتیب ناقابلِ تبدیل ہے: HTF سیاق اور فعال NY سیشن وقت سویپ سے پہلے چارٹ فلٹر کرتے ہیں، جس کے بعد تیز ڈسپلیسمنٹ MSS اور پیچھے رہنے والے فیئر ویلیو گیپ میں واپسی آتی ہے۔',
  ],
  [
    model2022Quizzes[1].question,
    '20,986 سویپ لو سے 21,060 MSS ہائی تک بُلش فرضی NQ 2022 ٹانگ میں 21,012–21,032 FVG کے ساتھ درست کنسیکوئنٹ انکروچمنٹ (CE) وسط اور اسٹاپ اصول کیا ہے؟',
  ],
  [
    model2022Quizzes[1].options[0],
    '21,022.00 CE وسط، اور حفاظتی اسٹاپ 20,986 سویپ کی انتہا سے باہر رکھا جائے۔',
  ],
  [
    model2022Quizzes[1].options[1],
    '21,032.00 قریبی اوپری کنارہ، اور اسٹاپ کینڈل 2 کے اندر 21,020 پر تنگ رکھا جائے۔',
  ],
  [
    model2022Quizzes[1].options[2],
    '21,060.00 MSS بریک آؤٹ ہائی، پل بیک کا انتظار کیے بغیر مارکیٹ آرڈر پر انٹری۔',
  ],
  [
    model2022Quizzes[1].explanation,
    'کنسیکوئنٹ انکروچمنٹ = (21,012 + 21,032) ÷ 2 = 21,022.00، جبکہ اسٹرکچرل منسوخی FVG باڈی کے اندر نہیں بلکہ سختی سے 20,986 سویپ وِک کے نیچے ہوتی ہے۔',
  ],
  [
    model2022Quizzes[2].question,
    'صبح 09:40 NY وقت پر قیمت ایشین سیشن لو کے نیچے ڈبکی لگا کر مخالف قلیل مدتی ہائی صاف توڑ دیتی ہے، مگر امپلس ٹانگ پر کوئی غیر پامال 3 کینڈل FVG نہیں بنتا۔ 2022 ماڈل اصولوں کے تحت آپ کو کیا کرنا چاہیے؟',
  ],
  [
    model2022Quizzes[2].options[0],
    'الگ رہیں یا صبر سے انتظار کریں—صاف FVG کے بغیر اسٹرکچر کراس 2022 انٹری مکمل نہیں کرتا۔',
  ],
  [
    model2022Quizzes[2].options[1],
    'ہائی پر زبردستی مارکیٹ بائے لیں کیونکہ سیشن لو کے پار ہر سویپ تسلسل کی ضمانت دیتا ہے۔',
  ],
  [
    model2022Quizzes[2].options[2],
    'اپنی چارٹ گھڑی UTC+0 پر بدل دیں جب تک کہیں اور کوئی الجھا گیپ نظر نہ آ جائے۔',
  ],
  [
    model2022Quizzes[2].explanation,
    '2022 ماڈل تقاضا کرتا ہے کہ صاف 3 کینڈل فیئر ویلیو گیپ کے بغیر ابتدائی ٹوٹاؤ کو نامکمل سمجھا جائے؛ انتظار کرنا اور ٹریڈ چھوڑ دینا ماڈل کے لازمی اصول ہیں۔',
  ],
  [
    model2022Quizzes[3].question,
    'مارچ اور نومبر کے درمیان امریکی ڈے لائٹ سیونگ تبدیلی کے دوران آپ کو 09:30 ایکویٹیز اوپن اور 07:00–10:00 NY AM فاریکس جیسے ICT 2022 کِل زونز کیسے پڑھنے چاہئیں؟',
  ],
  [
    model2022Quizzes[3].options[0],
    'ہر ونڈو کو سختی سے America/New_York مقامی وقت سے جوڑیں تاکہ DST تبدیلی UTC/مقامی فرق خود اپ ڈیٹ کرے۔',
  ],
  [
    model2022Quizzes[3].options[1],
    'مہینے سے قطع نظر اپنا چارٹ مستقل طور پر UTC−5 پر منجمد رکھیں تاکہ گھڑی کبھی نہ بدلے۔',
  ],
  [
    model2022Quizzes[3].options[2],
    'صرف نیویارک لنچ (12:00–13:00 NY) کے دوران ٹریڈ کریں جب والیم کم ہو جائے۔',
  ],
  [
    model2022Quizzes[3].explanation,
    'سیشن لیکویڈیٹی حقیقی نیویارک مارکیٹ اوپنز کے گرد جمع ہوتی ہے؛ چارٹ کو جامد UTC فرق پر جکڑنا EDT گرما کے مہینوں میں آپ کی ونڈو کو ایک پورا گھنٹہ سرکا دیتا ہے۔',
  ],
  [
    model2022Quizzes[4].question,
    'صبح 09:30 اوپن پر ES اور NQ کے مطالعے کے دوران NQ پچھلا لو سویپ کرتا ہے جبکہ ES اوپر رکا رہتا ہے (SMT ڈائیورجنس)۔ 2022 انٹری کے ساتھ SMT منسوخی کی احتیاط کو کیسے برتنا چاہیے؟',
  ],
  [
    model2022Quizzes[4].options[0],
    'تنہا SMT پر خریدنے کے بجائے ڈسپلیسمنٹ + MSS + FVG کا انتظار کریں، یہ جانتے ہوئے کہ ES بعد میں نیچے آ کر ابتدائی SMT ختم کر سکتا ہے۔',
  ],
  [
    model2022Quizzes[4].options[1],
    'فرض کریں SMT عین آخری نچلی ٹِک کی ضمانت دیتا ہے اور فوراً بغیر اسٹاپ دگنا رسک خرید لیں۔',
  ],
  [
    model2022Quizzes[4].options[2],
    'ہائر ٹائم فریم لیکویڈیٹی سیاق چھوڑ دیں کیونکہ SMT ہر ٹائم فریم پر غالب آ جاتا ہے۔',
  ],
  [
    model2022Quizzes[4].explanation,
    'منظم چارٹ مطالعہ خبردار کرتا ہے کہ بظاہر SMT ڈائیورجنس ختم ہو سکتی ہے اگر مضبوط مارکیٹ بعد میں اپنا لو بھی سویپ کر لے؛ SMT صرف مکمل 2022 MSS اور FVG تصدیق کے ساتھ سیاق نکھارتا ہے۔',
  ],
];

const uiAndVisualUr: Array<[string, string]> = [
  ['Key Takeaways', 'اہم نکات'],
  ['On this page', 'اس صفحے پر'],
  ['Continue Studying', 'مطالعہ جاری رکھیں'],
  ['ICT 2022 Model FVG, CE & OTE Rule', 'ICT 2022 ماڈل FVG، CE اور OTE اصول'],
  [
    'Bullish FVG = C1 High to C3 Low | Consequent Encroachment (CE) = (FVG Low + FVG High) ÷ 2 | OTE Zone = 62%–79% (70.5%) of Sweep-to-MSS Leg',
    'بُلش FVG = C1 ہائی تا C3 لو | کنسیکوئنٹ انکروچمنٹ (CE) = (FVG لو + FVG ہائی) ÷ 2 | OTE زون = سویپ تا MSS ٹانگ کا 62%–79% (70.5%)',
  ],
  [
    'Mapped Higher-Timeframe Draw on Liquidity (PDH/PDL, session extreme, or HTF FVG) before dropping to LTF',
    'لوئر ٹائم فریم پر جانے سے پہلے ہائر ٹائم فریم ڈرا آن لیکویڈیٹی (PDH/PDL، سیشن انتہا یا HTF FVG) نشان زد کیا',
  ],
  [
    'Confirmed chart clock uses America/New_York local time inside an active Killzone or Macro window',
    'تصدیق کی کہ چارٹ گھڑی فعال کِل زون یا میکرو ونڈو کے اندر America/New_York مقامی وقت پر ہے',
  ],
  [
    'Observed a real price sweep beyond a prior high/low (not guessing mid-range reversals)',
    'پچھلے ہائی/لو سے آگے حقیقی قیمت سویپ کا مشاہدہ کیا (درمیانِ رینج پلٹاؤ کا اندازہ نہیں لگایا)',
  ],
  [
    'Verified energetic displacement + Market Structure Shift (MSS) with a clean trailing 3-candle FVG (No-FVG check)',
    'صاف پیچھے بننے والے 3 کینڈل FVG کے ساتھ تیز ڈسپلیسمنٹ + مارکیٹ اسٹرکچر شفٹ (MSS) کی تصدیق کی (FVG جانچ)',
  ],
  [
    'Aligned FVG / 50% CE entry with Discount (< 50%) for longs or Premium (> 50%) for shorts (OTE confluence optional)',
    'لانگز کے لیے ڈسکاؤنٹ (<50%) یا شارٹس کے لیے پریمیم (>50%) کے ساتھ FVG / 50% CE انٹری ہم آہنگ کی',
  ],
  [
    'Fixed stop beyond the sweep extreme wick with exact contract value, commissions, slippage, and expiry time',
    'درست کنٹریکٹ ویلیو، کمیشن، سلپیج اور وقتِ میعاد کے ساتھ سویپ انتہائی وِک کے باہر اسٹاپ طے کیا',
  ],
  ['Checklist items confirmed', 'تصدیق شدہ نکات'],
  [
    'All six 2022 Model gates verified — log setup cleanly with stop & costs.',
    '2022 ماڈل کے چھوں دروازے مصدقہ — اسٹاپ اور اخراجات سمیت سیٹ اپ صاف نوٹ کریں۔',
  ],
  [
    'Finish verifying the remaining gates before recording a qualified setup.',
    'موزوں سیٹ اپ درج کرنے سے پہلے باقی شرائط کی تصدیق مکمل کریں۔',
  ],
  ['Technical market references', 'تکنیکی مارکیٹ حوالے'],
  ['Read the ICT Silver Bullet Time-Window Guide', 'ICT سلور بُلٹ ٹائم ونڈو رہنما پڑھیں'],
  ['Study Market Maker Models (MMBM & MMSM)', 'مارکیٹ میکر ماڈلز (MMBM اور MMSM) پڑھیں'],
  ['Master Market Structure Shift (MSS)', 'مارکیٹ اسٹرکچر شفٹ (MSS) سمجھیں'],
  ['Deep Dive Into Fair Value Gaps (FVG & CE)', 'فیئر ویلیو گیپس (FVG اور CE) گہرائی سے سمجھیں'],
  ['Explore Daily Profiles & Power of Three (PO3)', 'ڈیلی پروفائلز اور پاور آف تھری (PO3) دیکھیں'],
  ['Order Book & Market Microstructure', 'آرڈر بک اور مارکیٹ مائیکرو اسٹرکچر'],
  ['Practice 2022 Setups in the Chart Laboratory', 'چارٹ لیبارٹری میں 2022 سیٹ اپس کی مشق کریں'],

  // Visual 1: Stick-Figure Story
  ['Chaser vs. Planner: Animated 2022 Stick-Figure Story', 'جلد باز بمقابلہ منصوبہ ساز: متحرک 2022 اسٹک فِگر کہانی'],
  ['Synthetic 09:30 AM scene · Click steps to trace why MSS precedes entry', 'فرضی 09:30 صبح کا منظر · دیکھیں MSS انٹری سے پہلے کیوں لازم ہے'],
  ['1. 09:30 Open', '1. 09:30 اوپن'],
  ['2. Sweep Trap', '2. سویپ جال'],
  ['3. MSS + FVG', '3. MSS + FVG'],
  ['4. Target Hit', '4. ہدف مکمل'],
  [
    'Stage 1: At 09:30 AM NY Open, price consolidates inside a tight morning box while the Planner marks resting SSL below.',
    'مرحلہ 1: صبح 09:30 نیویارک اوپن پر قیمت تنگ صبح کے باکس میں یکجا ہوتی ہے جبکہ منصوبہ ساز نیچے SSL نشان زد کرتا ہے۔',
  ],
  [
    'Stage 2: Price plunges below the morning low sweeping Sell-Side stops; the Impulsive Chaser sells right into the trap.',
    'مرحلہ 2: قیمت صبح کے لو سے نیچے سیل سائیڈ اسٹاپس سویپ کرتی ہے؛ جلد باز عین جال میں بیچ بیٹھتا ہے۔',
  ],
  [
    'Stage 3: Strong upward displacement snaps past the prior high (MSS) and leaves a clean Bullish FVG; the Planner awaits retest.',
    'مرحلہ 3: مضبوط اوپری ڈسپلیسمنٹ پچھلا ہائی توڑ کر (MSS) صاف بُلش FVG چھوڑتی ہے؛ منصوبہ ساز واپسی کا انتظار کرتا ہے۔',
  ],
  [
    'Stage 4: Returning calmly to the FVG launches price straight into Buy-Side Liquidity while chasing shorts are unwound.',
    'مرحلہ 4: پُرسکون طور پر FVG پر لوٹ کر قیمت سیدھی بائے سائیڈ لیکویڈیٹی تک جاتی ہے جبکہ جلد باز شارٹس کٹ جاتے ہیں۔',
  ],
  ['Chaser: Watching every bar!', 'جلد باز: ہر بار دیکھ رہا ہے!'],
  ['Chaser: Selling the breakdown!', 'جلد باز: بریک ڈاؤن بیچ رہا ہے!'],
  ['Chaser trapped short!', 'جلد باز شارٹ میں پھنس گیا!'],
  ['Chaser stopped out', 'جلد باز کا اسٹاپ ہٹ'],
  ['Planner: Awaiting 09:30 sweep', 'منصوبہ ساز: 09:30 سویپ کا انتظار'],
  ['Planner: Sweep — awaiting MSS', 'منصوبہ ساز: سویپ — MSS کا انتظار'],
  ['Planner marks trailing FVG', 'منصوبہ ساز FVG نشان زد کرتا ہے'],
  ['BSL Target Delivered!', 'BSL ہدف پورا ہو گیا!'],
  ['Morning Range (09:30)', 'صبح کی رینج (09:30)'],
  ['Sell-Side Liquidity (SSL)', 'سیل سائیڈ لیکویڈیٹی (SSL)'],
  ['BSL Objective', 'BSL ہدف'],
  ['Displacement MSS', 'ڈسپلیسمنٹ MSS'],
  ['Bullish FVG Entry', 'بُلش FVG انٹری'],

  // Visual 2: Animated Lifecycle
  ['Animated 5-Stage ICT 2022 Model Lifecycle & Failure Branch', 'متحرک 5 مرحلہ ICT 2022 ماڈل سلسلہ اور ناکامی کی شاخ'],
  ['Synthetic NQ-style 5m candles · Step through sequence or inspect invalidation', 'فرضی NQ طرز 5m کینڈلز · مراحل چلائیں یا منسوخی دیکھیں'],
  ['Play', 'چلائیں'],
  ['Pause', 'روکیں'],
  ['Step', 'اگلا مرحلہ'],
  ['Reset', 'دوبارہ'],
  ['Valid 2022 Setup', 'درست 2022 سیٹ اپ'],
  ['Failure Branch', 'ناکامی کی شاخ'],
  ['Target BSL 21,085', 'ہدف BSL 21,085'],
  ['MSS Level 21,020', 'MSS سطح 21,020'],
  ['Prior SSL 21,000', 'پچھلا SSL 21,000'],
  ['Sweep 20,986', 'سویپ 20,986'],
  ['FVG 21,012–21,032 (50% CE)', 'FVG 21,012–21,032 (50% CE)'],
  ['No Displacement / Breaks 20,986 Low', 'ڈسپلیسمنٹ نہیں / 20,986 لو ٹوٹ گیا'],
  ['Active Step', 'موجودہ مرحلہ'],
  ['1. HTF Context & Asian SSL Pool marked at 21,000', '1. HTF سیاق اور 21,000 پر ایشین SSL تالاب نشان زد'],
  ['2. 09:40 NY Sweep drops below 21,000 to 20,986 wick', '2. 09:40 NY سویپ 21,000 سے نیچے 20,986 وِک تک گرتا ہے'],
  ['3. Displacement MSS breaks 21,020 & prints FVG 21,012–21,032', '3. ڈسپلیسمنٹ MSS نے 21,020 توڑا اور 21,012–21,032 FVG بنا'],
  ['4. Calm Retracement fills limit entry inside FVG / 21,022 CE', '4. پُرسکون واپسی پر FVG / 21,022 CE میں لِمٹ انٹری فِل'],
  ['5. Delivery reaches opposing 21,085 PDH Buy-Side Liquidity', '5. حرکت مخالف 21,085 PDH بائے سائیڈ لیکویڈیٹی تک پہنچی'],
  [
    'Failure Branch: weak push stalls below 21,020 MSS and sweeps down through 20,986.',
    'ناکامی کی شاخ: کمزور دھکا 21,020 MSS سے نیچے رک کر 20,986 کے نیچے گر گیا۔',
  ],

  // Visual 3: Killzone Clock Explorer
  ['NY Local Time Window Explorer (DST-Aware Killzones)', 'نیویارک مقامی ٹائم ونڈو ایکسپلورر (DST ہم آہنگ کِل زونز)'],
  ['America/New_York clock · Click any session to view UTC & Karachi equivalents', 'America/New_York گھڑی · UTC اور کراچی اوقات دیکھنے کے لیے کسی سیشن پر کلک کریں'],
  ['Lunch Chop', 'لنچ شور'],
  ['NY Local Window', 'NY مقامی ونڈو'],
  ['UTC (EST / EDT)', 'UTC (EST / EDT)'],
  ['Karachi (EST / EDT)', 'کراچی (EST / EDT)'],
  ['Primary Markets', 'بنیادی مارکیٹس'],
  ['2022 Model Role', '2022 ماڈل میں کردار'],
  ...killzoneTimelineSpecs.flatMap((w): Array<[string, string]> => {
    const map: Record<string, [string, string, string, string, string, string]> = {
      midnight: [
        'مڈنائٹ اوپن',
        '00:00 NY مقامی',
        '05:00 / 04:00 UTC',
        '10:00 / 09:00 PKT',
        'فاریکس اور انڈیکس فیوچرز',
        'پاور آف تھری کے لیے انٹراڈے پریمیم (اوپر) اور ڈسکاؤنٹ (نیچے) تقسیم کرنے والا اوپننگ حوالہ۔',
      ],
      london: [
        'لندن کِل زون',
        '02:00–05:00 NY مقامی',
        '07:00–10:00 / 06:00–09:00',
        '12:00–15:00 / 11:00–14:00',
        'EUR/USD، GBP/USD، لندن انڈیکس',
        'اکثر ایشین رینج ہائی/لو سویپ کر کے روزانہ جوڈاس سوئنگ اور پہلی MSS/FVG تبدیلی بناتا ہے۔',
      ],
      'ny-am-fx': [
        'NY AM فاریکس',
        '07:00–10:00 NY مقامی',
        '12:00–15:00 / 11:00–14:00',
        '17:00–20:00 / 16:00–19:00',
        'اسپاٹ FX میجرز اور DXY',
        'NY مڈنائٹ اوپن حوالے کو 08:30 خبروں کے سویپس سے جوڑنے والی اہم ونڈو۔',
      ],
      'macro-830': [
        '08:30 نیوز میکرو',
        '08:30 NY مقامی',
        '13:30 / 12:30 UTC',
        '18:30 / 17:30 PKT',
        'NQ، ES، ٹریژری ییلڈز، FX',
        'CPI/NFP/GDP اعلان کا وقت؛ اکثر 09:30 ایکویٹیز اوپن سے پہلے ابتدائی اسٹاپ رن بناتا ہے۔',
      ],
      'equity-930': [
        '09:30 ایکویٹیز اوپن',
        '09:30–11:00 NY مقامی',
        '14:30–16:00 / 13:30–15:00',
        '19:30–21:00 / 18:30–20:00',
        'NQ، ES، YM انڈیکس فیوچرز',
        'مرکزی انڈیکس حرکت کی ونڈو: 09:30 اکثر 5m/1m MSS سے پہلے 08:30 یا لندن انتہا سویپ کرتا ہے۔',
      ],
      'sb-1000': [
        '10:00–11:00 اشتراک',
        '10:00–11:00 NY مقامی',
        '15:00–16:00 / 14:00–15:00',
        '20:00–21:00 / 19:00–20:00',
        'NQ، ES، EUR/USD',
        '09:30 مینیپولیشن مکمل ہونے کے بعد ثانوی تسلسل FVGs پکڑتا ہے (سلور بُلٹ گھنٹے کے مطابق)۔',
      ],
      'ny-pm': [
        'NY PM سیشن',
        '13:30–16:00 NY مقامی',
        '18:30–21:00 / 17:30–20:00',
        '23:30–02:00 / 22:30–01:00',
        'NQ، ES، اختتامی گھنٹہ',
        'دوپہر کے لو/ہائی سویپ کے بعد کلوز تک سہ پہر کی رجحانی توسیع۔',
      ],
    };
    const [lbl, ny, utc, pkt, mkts, role] = map[w.id];
    return [
      [w.label, lbl],
      [w.nyWindow, ny],
      [w.utcEstEdt, utc],
      [w.karachiEstEdt, pkt],
      [w.primaryMarkets, mkts],
      [w.roleIn2022, role],
    ];
  }),

  // Visual 4: Displacement & MSS Inspector
  ['2022 Model Gate Inspector: Time -> Sweep -> MSS -> FVG', '2022 ماڈل گیٹ انسپکٹر: وقت ← سویپ ← MSS ← FVG'],
  ['Toggle conditions to enforce strict chronological confirmation', 'سخت زمانی تصدیق پرکھنے کے لیے شرائط آن یا آف کریں'],
  ['1. Active America/New_York Killzone or Macro Window', '1. فعال America/New_York کِل زون یا میکرو ونڈو'],
  ['2. Visible Prior High/Low Swept (BSL or SSL)', '2. نمایاں پچھلا ہائی/لو سویپ ہوا (BSL یا SSL)'],
  ['3. Energetic Full-Bodied Displacement Candles', '3. تیز اور بھرپور باڈی والی ڈسپلیسمنٹ کینڈلز'],
  ['4. Confirmed Opposing Swing Break (MSS)', '4. مخالف سوئنگ کا مصدقہ بریک (MSS)'],
  ['5. Clean Unmitigated 3-Candle FVG Left Behind', '5. پیچھے صاف غیر پامال 3 کینڈل FVG موجود'],
  ['Grade: Qualified ICT 2022 Setup — Await Limit Retest Into FVG', 'درجہ: موزوں ICT 2022 سیٹ اپ — FVG میں لِمٹ واپسی کا انتظار کریں'],
  ['Grade: No-FVG Rule — MSS Without Clean FVG; Stand Aside / Wait', 'درجہ: FVG عدم موجودگی اصول — صاف FVG کے بغیر MSS؛ الگ رہیں / انتظار کریں'],
  ['Grade: Unconfirmed Sweep — Do Not Buy or Sell Prior to MSS', 'درجہ: غیر مصدقہ سویپ — MSS سے پہلے خرید و فروخت نہ کریں'],
  ['Grade: Incomplete — No Liquidity Sweep Recorded Yet', 'درجہ: نامکمل — ابھی کوئی لیکویڈیٹی سویپ درج نہیں ہوا'],
  ['Grade: Out of Time Window — Avoid Low-Liquidity Chop', 'درجہ: ٹائم ونڈو سے باہر — کم لیکویڈیٹی شور سے بچیں'],

  // Visual 5: FVG + OTE Sandbox
  ['FVG Consequent Encroachment (50% CE) & OTE Confluence Sandbox', 'FVG کنسیکوئنٹ انکروچمنٹ (50% CE) اور OTE اشتراک سینڈ باکس'],
  ['Slide entry depth from FVG proximal top to deep FVG low across 21,012–21,032', '21,012–21,032 میں FVG کے اوپری کنارے سے نچلے کنارے تک انٹری گہرائی کھسکائیں'],
  ['FVG Entry Depth', 'FVG انٹری گہرائی'],
  ['Target BSL: 21,085', 'ہدف BSL: 21,085'],
  ['Impulse High: 21,060', 'امپلس ہائی: 21,060'],
  ['OTE 62%–79% Band (70.5% = 21,007.8)', 'OTE 62%–79% پٹی (70.5% = 21,007.8)'],
  ['FVG 21,012–21,032 (50% CE = 21,022)', 'FVG 21,012–21,032 (50% CE = 21,022)'],
  ['Stop Beyond Sweep: 20,984', 'سویپ سے باہر اسٹاپ: 20,984'],
  ['Planned Entry Price', 'منصوبہ بند انٹری قیمت'],
  ['Discount / OTE Alignment', 'ڈسکاؤنٹ / OTE مطابقت'],
  ['Inside Discount & OTE Band', 'ڈسکاؤنٹ اور OTE پٹی کے اندر'],
  ['Inside Discount (< 50% Leg)', 'ڈسکاؤنٹ کے اندر (< 50% ٹانگ)'],
  ['Stop Risk (1 MNQ = $2/pt)', 'اسٹاپ رسک (1 MNQ = $2/پوائنٹ)'],
  ['Reward-to-Risk (Before Costs)', 'انعام بمقابلہ رسک (اخراجات قبل)'],
  ['pts', 'پوائنٹس'],

  // Visual 6: Midnight Open & PO3 Lab
  ['Power of Three (AMD), NY Midnight Open & Judas Swing Lab', 'پاور آف تھری (AMD)، NY مڈنائٹ اوپن اور جوڈاس سوئنگ لیب'],
  ['See where the 2022 Model sits inside a bullish daily expansion profile', 'دیکھیں بُلش روزانہ توسیع پروفائل میں 2022 ماڈل کہاں بیٹھتا ہے'],
  ['1. Accumulation', '1. اکیومولیشن'],
  ['2. Judas Swing', '2. جوڈاس سوئنگ'],
  ['3. Distribution (2022 Entry)', '3. ڈسٹری بیوشن (2022 انٹری)'],
  ['Above Midnight Open (Intraday Premium)', 'مڈنائٹ اوپن سے اوپر (انٹراڈے پریمیم)'],
  ['Below Midnight Open (Ideal Long Discount)', 'مڈنائٹ اوپن سے نیچے (مثالی لانگ ڈسکاؤنٹ)'],
  ['00:00 NY Midnight Open', '00:00 NY مڈنائٹ اوپن'],
  ['Asian Accumulation', 'ایشین اکیومولیشن'],
  ['Judas Swing Sweeps Low (08:30 / 09:30)', 'جوڈاس سوئنگ لو سویپ (08:30 / 09:30)'],
  ['2022 FVG Entry', '2022 FVG انٹری'],
  ['Distribution Toward PDH', 'PDH کی طرف ڈسٹری بیوشن'],

  // Visual 7: MTF Matrix
  ['Multi-Timeframe Hierarchy Selector (HTF -> MSS -> FVG)', 'ملٹی ٹائم فریم درجہ بندی منتخب کنندہ (HTF ← MSS ← FVG)'],
  ['Scale chart roles proportionally rather than mixing distant horizons', 'بعید ادوار گڈمڈ کرنے کے بجائے چارٹ کردار متناسب رکھیں'],
  ['1. HTF Draw Chart', '1. HTF ڈرا چارٹ'],
  ['2. MSS Confirmation Chart', '2. MSS تصدیق چارٹ'],
  ['3. FVG Execution Chart', '3. FVG انٹری چارٹ'],
  ['4. Protective Stop Anchor', '4. حفاظتی اسٹاپ اینکر'],
  ['Session Guidance', 'سیشن رہنمائی'],
  [mtf2022Tiers[0].label, 'سوئنگ مطابقت (D1 / 4H / 15m)'],
  [mtf2022Tiers[0].htfDrawChart, 'ڈیلی / 4 گھنٹے PD اَرے اور PDH/PDL'],
  [mtf2022Tiers[0].mssConfirmChart, '1 گھنٹہ یا 15 منٹ سوئنگ بریک'],
  [mtf2022Tiers[0].entryFvgChart, 'OTE کے اندر 15 منٹ یا 5 منٹ FVG'],
  [mtf2022Tiers[0].typicalRiskStop, '1H–15m سویپ وِک کے اوپر/نیچے'],
  [mtf2022Tiers[0].guidanceNote, 'جزوقتی طلبہ کے لیے بہترین جو 1 منٹ اسکرین تھکان کے بغیر کثیر سیشن توسیع دیکھتے ہیں۔'],
  [mtf2022Tiers[1].label, 'معیاری انٹراڈے (15m / 5m / 1m)'],
  [mtf2022Tiers[1].htfDrawChart, '1 گھنٹہ / 15 منٹ لیکویڈیٹی تالاب'],
  [mtf2022Tiers[1].mssConfirmChart, '5 منٹ یا 3 منٹ ڈسپلیسمنٹ'],
  [mtf2022Tiers[1].entryFvgChart, '1 منٹ یا 2 منٹ FVG واپسی'],
  [mtf2022Tiers[1].typicalRiskStop, '5m/1m سویپ انتہا کے پار'],
  [mtf2022Tiers[1].guidanceNote, 'NQ، ES اور بڑے فاریکس سیشن مثالوں میں لاگو معیاری انٹراڈے جوڑی۔'],
  [mtf2022Tiers[2].label, 'مائیکرو سیشن (5m / 1m / 15s)'],
  [mtf2022Tiers[2].htfDrawChart, '15 منٹ / 5 منٹ سیشن انتہا'],
  [mtf2022Tiers[2].mssConfirmChart, '1 منٹ ڈسپلیسمنٹ MSS'],
  [mtf2022Tiers[2].entryFvgChart, '1 منٹ یا 15 سیکنڈ اندرونی FVG'],
  [mtf2022Tiers[2].typicalRiskStop, 'تنگ اسٹرکچرل انتہا + بفر'],
  [mtf2022Tiers[2].guidanceNote, 'زیادہ شور کا شکار؛ انتہائی نچلے ٹائم فریمز پر اسپریڈ اور سلپیج تنگ اسٹاپس کو متاثر کرتے ہیں۔'],

  // Visual 8: Stick-Figure Mistake Gallery
  ['Four Common Mistakes That Break 2022 Model Setups', 'چار عام غلطیاں جو 2022 ماڈل سیٹ اپس ناکام بناتی ہیں'],
  ['Animated stick-figure mistake cards · Click a trap to inspect the structural fix', 'متحرک اسٹک فِگر غلطی کارڈز · حل دیکھنے کے لیے جال پر کلک کریں'],
  ['1. Dead-Hour Chop', '1. سست اوقات کا شور'],
  ['2. Buying Pre-MSS', '2. MSS سے پہلے خرید'],
  ['3. Weak Drift FVG', '3. کمزور سرکتا FVG'],
  ['4. Tight Inside Stop', '4. اندر تنگ اسٹاپ'],
  ['Entering pretty 1m FVGs during 12:30 PM lunch chop', '12:30 دوپہر لنچ شور میں خوبصورت 1m FVGs پر انٹری'],
  ['Fix: Only trigger 2022 entries inside active NY Killzones.', 'حل: 2022 انٹریز صرف فعال NY کِل زونز کے اندر لیں۔'],
  ['Buying immediately at a swept low before MSS confirms', 'MSS تصدیق سے پہلے سویپ لو پر فوراً خرید لینا'],
  ['Fix: Wait for full displacement closing past the opposing swing.', 'حل: مخالف سوئنگ کے پار مکمّل ڈسپلیسمنٹ کلوز کا انتظار کریں۔'],
  ['Confusing tiny overlapping grind gaps for displacement', 'باہم جڑے چھوٹے گھسٹتے گیپس کو ڈسپلیسمنٹ سمجھنا'],
  ['Fix: Require energetic Candle 2 body expansion and wide gap displacement.', 'حل: کینڈل 2 کی تیز باڈی توسیع اور واضح خلائی ڈسپلیسمنٹ لازم رکھیں۔'],
  ['Hiding stops inside Candle 2 to force artificial 10R ratios', 'مصنوعی 10R کے لیے کینڈل 2 کے اندر تنگ اسٹاپ چھپانا'],
  ['Fix: Place structural stops beyond the sweep extreme wick.', 'حل: اسٹرکچرل اسٹاپ سویپ کی انتہائی وِک کے باہر رکھیں۔'],
];

export const model2022Translations: Record<string, string> = Object.fromEntries([
  ...pairs,
  ...sourceUr,
  ...quizUr,
  ...uiAndVisualUr,
]);

void model2022Sources;
