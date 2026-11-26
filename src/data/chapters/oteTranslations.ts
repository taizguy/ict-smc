import enDoc from './oteDocument.json';
import urDoc from './oteDocumentUrdu.json';
import { oteSources, oteQuizzes, oteDates, oteChapter, type OteSection } from './oteLesson';
import { oteMtfProfiles } from '../../utils/oteMath';

const pairs: [string, string][] = [
  [enDoc.h1, urDoc.h1],
  [`${enDoc.h1} | LearnSMC`, `${urDoc.h1} | LearnSMC`],
  [enDoc.seoTitle, urDoc.seoTitleUr],
  [`${enDoc.seoTitle} | LearnSMC`, `${urDoc.seoTitleUr} | LearnSMC`],
  [enDoc.metaDescription, urDoc.metaDescriptionUr],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [oteDates.published.label, '15 اکتوبر 2026'],
  [oteDates.updated.label, '26 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['On this page', 'اس صفحے پر'],
  ['sections', 'حصے'],
  ['Show section links', 'مضامین کی فہرست کھولیں'],
  ['Continue Studying', 'مطالعہ جاری رکھیں'],
  ['Pre-Execution Checklist', 'انٹری سے پہلے چیک لسٹ'],
  ['Checklist items confirmed', 'تصدیق شدہ شرائط'],
  ['Sources & Institutional References', 'مستند ادارہ جاتی حوالہ جات'],
  ['Mathematical Formula', 'حسابی فارمولا'],
  ['Bullish Retracement: Price(r) = High − (High − Low) × r', 'صعودی ریٹریسمنٹ: Price(r) = High − (High − Low) × r'],
  ['Bearish Retracement: Price(r) = Low + (High − Low) × r', 'نزولی ریٹریسمنٹ: Price(r) = Low + (High − Low) × r'],
  [
    'All synthetic NQ and EUR/USD OTE examples, Fibonacci grids, and stick-figure stories are educational range-arithmetic illustrations, not live quotes or trade recommendations.',
    'تمام فرضی NQ اور EUR/USD مثالیں، فبوناکی گرڈز اور اسٹک فگر کہانیاں رینج کے حساب کو سمجھانے کے لیے تعلیمی خاکے ہیں، لائیو قیمتیں یا ٹریڈنگ مشورہ نہیں۔',
  ],
  [
    'All synthetic NQ and EUR/USD OTE examples, Fibonacci grids, and extension charts are original educational illustrations, not live quotes or execution records.',
    'تمام فرضی NQ اور EUR/USD OTE مثالیں، فبوناکی گرڈز اور ایکسٹینشن چارٹس اصل تعلیمی خاکے ہیں، لائیو قیمتیں یا تجارتی عملدرآمد کا ریکارڈ نہیں۔',
  ],

  // Lesson summary extensions
  [
    'Anchor 1.0 at the displacement origin and 0.0 at the extreme termination before measuring retracement depth.',
    'ریٹریسمنٹ کی گہرائی ناپنے سے پہلے 1.0 کو ڈسپلیسمنٹ کے آغاز اور 0.0 کو انتہائی اختتام پر لگائیں۔',
  ],
  [
    'Require Premium/Discount alignment plus FVG, Order Block, or Breaker confluence inside active New York or London windows.',
    'فعال نیویارک یا لندن ونڈوز میں پریمیم/ڈسکاؤنٹ کی مطابقت کے ساتھ FVG، آرڈر بلاک یا بریکر کی ہم آہنگی دیکھیں۔',
  ],
  [
    'Treat closes beyond 1.0 as decisive range invalidation rather than moving protective stops blindly.',
    'اسٹاپ کو اندھا پیچھے ہٹانے کے بجائے 1.0 سے باہر بندش کو رینج کی فیصلہ کن منسوخی سمجھیں۔',
  ],

  // Checklist strings in OteContent
  [
    'Confirmed clean displacement impulse with a structural break (MSS or BOS) before drawing Fib',
    'فبوناکی کھینچنے سے پہلے واضح ڈسپلیسمنٹ اور اسٹرکچر بریک (MSS یا BOS) کی تصدیق کی',
  ],
  [
    'Anchored 1.0 strictly at the impulse origin and 0.0 at the impulse extreme (not drawn backward)',
    '1.0 کو عین آغاز اور 0.0 کو انتہا پر لگایا (الٹا نہیں کھینچا)',
  ],
  [
    'Waited for price to clear 0.50 Equilibrium into Discount (longs) or Premium (shorts) inside 0.62–0.79',
    'قیمت کے 0.50 ایکویلیبریم پار کر کے 0.62–0.79 ڈسکاؤنٹ (لانگ) یا پریمیم (شارٹ) میں آنے کا انتظار کیا',
  ],
  [
    'Verified overlapping FVG (50% CE), Order Block, or Breaker inside the OTE band (no bare-line orders)',
    'OTE پٹی کے اندر FVG (50% CE)، آرڈر بلاک یا بریکر کی ہم آہنگی چیک کی (خالی لائن آرڈر نہیں)',
  ],
  [
    'Checked active London or New York Killzone timing in America/New_York local time',
    'نیویارک مقامی وقت کے مطابق فعال لندن یا نیویارک کِل زون کی تصدیق کی',
  ],
  [
    'Defined stop invalidation beyond 1.0 with symmetrical -0.27 / -0.62 extension targets',
    '1.0 کے باہر اسٹاپ ان ویلیڈیشن اور -0.27 / -0.62 متناسب اہداف طے کیے',
  ],
  [
    'Checklist complete — range anchors, confluence, session timing, and 1.0 invalidation are documented.',
    'چیک لسٹ مکمل — رینج اینکرز، ہم آہنگی، سیشن کا وقت اور 1.0 ان ویلیڈیشن درج ہو چکے ہیں۔',
  ],
  [
    'Check all 6 criteria to confirm whether a studied range meets full OTE discipline.',
    'یہ جانچنے کے لیے تمام 6 شرائط چیک کریں کہ آیا مطالعہ شدہ رینج مکمل OTE اصولوں پر پوری اترتی ہے۔',
  ],

  // Continue Studying links
  ['Study Premium & Discount: The PD Array Matrix', 'پریمیم اور ڈسکاؤنٹ: PD اَرے میٹرکس پڑھیں'],
  ['Deep Dive Into Fair Value Gaps (FVG & CE)', 'فیئر ویلیو گیپس (FVG اور CE) کی مکمل وضاحت'],
  ['Master Order Blocks (OB) & Mitigation', 'آرڈر بلاکس (OB) اور میٹیگیشن سیکھیں'],
  ['Study Breaker Blocks (Failed Order Blocks)', 'بریکر بلاکس (ناکام آرڈر بلاکس) سمجھیں'],
  ['Connect OTE With the ICT 2022 Model', 'OTE کو 2022 ماڈل کے ساتھ جوڑیں'],
  ['Explore Session Liquidity & Killzones', 'سیشن لیکویڈیٹی اور کِل زونز کا مطالعہ'],
  ['Compute Live Levels in the OTE Calculator', 'OTE کیلکولیٹر میں لائیو لیولز نکالیں'],
  ['Practice in the OTE Expansion Simulator', 'OTE ایکسپینشن سمیولیٹر میں مشق کریں'],

  // OTE Math MTF + Confluence verdicts + Slider zones
  [oteMtfProfiles[0].timeframe, 'ڈیلی / 4 گھنٹے نیریٹو رینج'],
  [oteMtfProfiles[0].role, 'دنوں یا سیشنز پر محیط بڑے سوئنگ کا آغاز (1.0) اور بیرونی ہدف (0.0) طے کرتا ہے۔'],
  [oteMtfProfiles[0].rangeExample, 'ڈیلی رینج 20,100 -> 20,600 (OTE زون 20,205 – 20,290)'],
  [oteMtfProfiles[0].focus, 'سمتی جھکاؤ متعین کرتا ہے اور گہرے پل بیک کے اہم مقامات دکھاتا ہے۔'],
  [oteMtfProfiles[1].timeframe, '1 گھنٹہ / 15 منٹ سیشن ڈیلنگ رینج'],
  [oteMtfProfiles[1].role, 'سیشن سویپ کے بعد بننے والی موجودہ لندن یا نیویارک امپلس لہر کو ناپتا ہے۔'],
  [oteMtfProfiles[1].rangeExample, '15M لہر 20,400 -> 20,500 (0.705 سویٹ اسپاٹ = 20,429.50)'],
  [oteMtfProfiles[1].focus, '0.62–0.79 کے اندر آنے والے 15M فیئر ویلیو گیپس اور آرڈر بلاکس کی نشاندہی کرتا ہے۔'],
  [oteMtfProfiles[2].timeframe, '5 منٹ / 1 منٹ ایگزیکیوشن ٹرگر'],
  [oteMtfProfiles[2].role, 'بڑے OTE زون کے اندر مائیکرو MSS اور چھوٹی OTE کے ذریعے احترام کی تصدیق کرتا ہے۔'],
  [oteMtfProfiles[2].rangeExample, '15M کے 0.705 زون کے اندر 1M ردِ عمل 20,426 -> 20,456'],
  [oteMtfProfiles[2].focus, 'تیز گرتی کینڈلز میں اندازے لگانے کے بجائے رسک سائز اور ان ویلیڈیشن کو بہتر بناتا ہے۔'],

  ['Invalidated beyond 1.0 origin', '1.0 آغاز سے باہر منسوخ'],
  ['0.705 Sweet Spot Core', '0.705 مرکزی سویٹ اسپاٹ'],
  ['Inside Discount OTE (0.62–0.79)', 'ڈسکاؤنٹ OTE (0.62–0.79) کے اندر'],
  ['Inside Premium OTE (0.62–0.79)', 'پریمیم OTE (0.62–0.79) کے اندر'],
  ['Shallow Discount (0.50–0.618)', 'کم گہرا ڈسکاؤنٹ (0.50–0.618)'],
  ['Shallow Premium (0.50–0.618)', 'کم گہرا پریمیم (0.50–0.618)'],
  ['Premium Warning (< 0.50)', 'پریمیم انتباہ (< 0.50)'],
  ['Discount Warning (< 0.50)', 'ڈسکاؤنٹ انتباہ (< 0.50)'],

  ['Outside OTE Band — Stand Aside', 'OTE زون سے باہر — انتظار کریں'],
  [
    'Price has not reached the 0.62–0.79 zone; entering before 0.50 invites stop pressure and compresses potential R.',
    'قیمت ابھی 0.62–0.79 زون تک نہیں پہنچی؛ 0.50 سے پہلے انٹری اسٹاپ کا دباؤ بڑھاتی اور R کم کرتی ہے۔',
  ],
  ['High-Confluence OTE Study', 'اعلیٰ ہم آہنگی والا OTE مطالعہ'],
  [
    '0.62–0.79 aligns with a clean PD array inside an active session window, anchored by a clear 1.0 invalidation line.',
    'فعال سیشن ونڈو میں 0.62–0.79 زون واضح PD اَرے اور متعین 1.0 ان ویلیڈیشن سے جڑا ہوا ہے۔',
  ],
  ['Moderate Confluence — Confirm Timing or Structure', 'درمیانی ہم آہنگی — وقت یا اسٹرکچر چیک کریں'],
  [
    'A PD array sits inside the 0.62–0.79 window, but checking Killzone timing or lower-timeframe structure improves clarity.',
    '0.62–0.79 میں ایک PD اَرے موجود ہے، مگر کِل زون کا وقت یا چھوٹے اسٹرکچر کی تصدیق وضاحت بڑھاتی ہے۔',
  ],
  ['Bare Fibonacci Line Only — Low Filter', 'صرف خالی فبوناکی لائن — کمزور فلٹر'],
  [
    'Retracement numbers alone do not confirm participation; look for an overlapping FVG, Order Block, or Breaker first.',
    'صرف ریٹریسمنٹ کے نمبر شرکت ثابت نہیں کرتے؛ پہلے FVG، آرڈر بلاک یا بریکر کی تائید دیکھیں۔',
  ],

  // OteVisual 9 Figures, OteScene & Interactive UI Labels
  ['3D Bearish Premium OTE Cinema (EUR/USD)', '3D نزولی پریمیم OTE سینما (EUR/USD)'],
  ['3D Bullish Discount OTE Cinema (NQ)', '3D صعودی ڈسکاؤنٹ OTE سینما (NQ)'],
  ['Story Comic · Synthetic NQ Illustration', 'اسٹک فگر کہانی · فرضی NQ مثال'],
  ['Retail Chaser vs. Patient OTE Planner', 'جلد باز خریدار بمقابلہ صبر کرنے والا OTE منصوبہ ساز'],
  ['1. Impulse Breakout', '1. تیز بریک آؤٹ'],
  ['2. Chasing 0.0 Top', '2. 0.0 چوٹی کا پیچھا'],
  ['3. 0.705 Sweet Spot', '3. 0.705 سویٹ اسپاٹ'],
  ['4. Outcome Contrast', '4. نتائج کا موازنہ'],
  ['Buy 0.0! FOMO!', '0.0 پر خریدو! جلدی!'],
  ['Wait for 0.705', '0.705 کا انتظار'],
  ['Ouch! Stopped!', 'اف! اسٹاپ لگ گیا!'],
  ['Calm 2.83R plan', 'پُرسکون 2.83R منصوبہ'],
  ['Retail Chaser: buys 20,500 top (0.0) -> huge risk, tight drawdown panic.', 'جلد باز ٹریڈر: 20,500 چوٹی (0.0) پر خریدتا ہے -> بڑا رسک اور گھبراہٹ۔'],
  ['OTE Planner: skips 0.50 Premium, waits inside 0.62–0.79 + FVG at 20,429.50.', 'OTE منصوبہ ساز: 0.50 پریمیم چھوڑ کر 20,429.50 (0.62–0.79 + FVG) کا انتظار کرتا ہے۔'],

  ['3D OTE Range Lifecycle & Outcome Branches', '3D OTE رینج کا مکمل دورانیہ اور نتائج کی شاخیں'],
  ['3D Motion Study · Synthetic NQ', '3D موشن اسٹڈی · فرضی NQ'],
  ['Outcome Branch Selector', 'نتائج کی شاخ منتخب کریں'],
  ['Target (-0.62 Expansion)', 'ہدف (-0.62 توسیع)'],
  ['Invalidation (1.0 Break)', 'ان ویلیڈیشن (1.0 بریک)'],
  ['Shallow Miss (0.50 Bounce)', 'کم گہرا اچھال (0.50 باؤنس)'],
  ['Deep Sweep (0.87 Wick)', 'گہرا سویپ (0.87 وِک)'],
  ['Impulse leg forming from 1.0 (20,400.00) toward 0.0 (20,500.00).', '1.0 (20,400.00) سے 0.0 (20,500.00) کی طرف امپلس لہر بن رہی ہے۔'],
  ['Shallow Miss: Rebounds at 0.50 (20,450) without entering 0.62–0.79 — setup skipped cleanly.', 'کم گہرا اچھال: قیمت 0.62–0.79 میں آئے بغیر 0.50 (20,450) سے پلٹ گئی — سیٹ اپ چھوڑ دیا گیا۔'],
  ['Deep Sweep: Wicks to 20,413 (0.87) past 0.79 while holding 1.0 (20,400) — shows why stops belong outside 1.0.', 'گہرا سویپ: قیمت 1.0 (20,400) برقرار رکھتے ہوئے 0.79 سے نیچے 20,413 (0.87) تک وِک کرتی ہے — یہی وجہ ہے کہ اسٹاپ 1.0 سے باہر رکھا جاتا ہے۔'],
  ['Retracement inside 0.62–0.79 Discount OTE & FVG 50% CE.', '0.62–0.79 ڈسکاؤنٹ OTE اور FVG 50% CE کے اندر واپسی۔'],
  ['NY Session Bar', 'نیویارک سیشن کینڈل'],
  ['1.0 Origin', '1.0 آغاز'],
  ['0.0 Extreme', '0.0 انتہا'],
  ['0.705 Sweet Spot', '0.705 سویٹ اسپاٹ'],
  ['Outcome', 'نتیجہ'],
  ['Restart', 'دوبارہ شروع'],
  ['Back', 'پیچھے'],
  ['Play', 'چلائیں'],
  ['Pause', 'روکیں'],
  ['Step Forward', 'اگلا مرحلہ'],
  ['Reveal All', 'مکمل دکھائیں'],
  ['Speed', 'رفتار'],
  ['Animation Progress', 'اینیمیشن کی پیش رفت'],
  ['Success Path: Hold above 1.0 -> Expand to -0.27 & -0.62', 'کامیاب راستہ: 1.0 برقرار -> -0.27 اور -0.62 تک توسیع'],
  ['Failure Branch: Clean break below 1.0 (20,400) -> Thesis Invalidated', 'ناکامی کی شاخ: 1.0 (20,400) کے نیچے بریک -> مفروضہ منسوخ'],

  ['Interactive OTE Range & Polarity Calculator', 'انٹرایکٹو OTE رینج اور سمت کیلکولیٹر'],
  ['Horizontal Price Grid · Switch Bullish / Bearish', 'افقی قیمت گرڈ · صعودی / نزولی بدلیں'],
  ['Bullish Discount (NQ 20,400 -> 20,500)', 'صعودی ڈسکاؤنٹ (NQ 20,400 -> 20,500)'],
  ['Bearish Premium (EUR/USD 1.0900 -> 1.0800)', 'نزولی پریمیم (EUR/USD 1.0900 -> 1.0800)'],
  ['Retracement Depth', 'ریٹریسمنٹ گہرائی'],
  ['Calculated Price', 'حساب شدہ قیمت'],
  ['Zone Reading', 'زون کی کیفیت'],
  ['Reward to -0.27 / -0.62', '-0.27 / -0.62 تک انعام (R)'],

  ['OTE + PD Array Confluence Inspector', 'OTE + PD اَرے ہم آہنگی انسپکٹر'],
  ['Toggle structural filters inside 0.62–0.79', '0.62–0.79 کے اندر ساختی فلٹرز آن یا آف کریں'],
  ['Price inside 0.62–0.79 OTE Band', 'قیمت 0.62–0.79 OTE پٹی میں ہے'],
  ['Overlapping Fair Value Gap (50% CE)', 'اوورلیپنگ فیئر ویلیو گیپ (50% CE)'],
  ['Overlapping Order Block / Breaker', 'اوورلیپنگ آرڈر بلاک / بریکر'],
  ['Active Killzone Window (NY Time)', 'فعال کِل زون ونڈو (نیویارک وقت)'],
  ['Active Filters', 'فعال فلٹرز'],

  ['Anchor Selection & Wick vs. Body Lab', 'اینکر انتخاب اور وِک بمقابلہ باڈی لیب'],
  ['Compare valid ranges vs. micro-chop', 'درست رینجز بمقابلہ مائیکرو چوپ موازنہ'],
  ['Valid Displacement (Wick-to-Wick)', 'درست ڈسپلیسمنٹ (وِک ٹو وِک)'],
  ['Body-to-Body Anchor', 'باڈی ٹو باڈی اینکر'],
  ['Invalid Micro-Swing Chop', 'غلط مائیکرو سوئنگ چوپ'],
  ['Wick-to-wick snaps 1.0 and 0.0 to extreme highs/lows—protecting exact sweep invalidation at 20,400.00.', 'وِک ٹو وِک میں 1.0 اور 0.0 انتہائی چوٹیوں پر لگتے ہیں، جس سے 20,400.00 پر سویپ ان ویلیڈیشن واضح رہتی ہے۔'],
  ['Body-to-body trims extreme news spike wicks, shifting 0.705 slightly inward while keeping open/close bulk intact.', 'باڈی ٹو باڈی خبر کی غیر معمولی وِکس کو کم کر کے 0.705 کو قدرے اندر منتقل کرتا ہے۔'],
  ['Anchoring tiny pause candles mid-chop creates false 0.705 triggers inside expensive Premium territory.', 'سائیڈ ویز چوپ کی معمولی کینڈلز پر گرڈ لگانے سے مہنگے پریمیم میں غلط 0.705 سگنل بنتے ہیں۔'],

  ['3D Bearish Premium OTE Cinema (EUR/USD 1.0900 -> 1.0800)', '3D نزولی پریمیم OTE سینما (EUR/USD 1.0900 -> 1.0800)'],
  ['3D Motion Study · Synthetic EUR/USD', '3D موشن اسٹڈی · فرضی EUR/USD'],
  ['Valid Bearish Expansion (-0.62)', 'درست نزولی توسیع (-0.62)'],
  ['Bearish Invalidation (1.0900 Break)', 'نزولی ان ویلیڈیشن (1.0900 بریک)'],
  ['Bearish Invalidation: Price closes decisively above 1.0 (1.0900), voiding the downward displacement range.', 'نزولی ان ویلیڈیشن: قیمت 1.0 (1.0900) سے اوپر فیصلہ کن بند ہو کر نیچے کی ڈسپلیسمنٹ رینج منسوخ کرتی ہے۔'],
  ['Bearish Premium OTE pulls up past 1.0850 (0.50) into 1.0862–1.0879 before continuing to 1.0773 (-0.27) and 1.0738 (-0.62).', 'نزولی پریمیم OTE 1.0850 (0.50) سے اوپر 1.0862–1.0879 میں جا کر 1.0773 (-0.27) اور 1.0738 (-0.62) تک نیچے آتا ہے۔'],

  ['Symmetrical Target Ladder (-0.27 to -1.62)', 'متناسب اہداف کی سیڑھی (-0.27 تا -1.62)'],
  ['Inspect scaling levels past 0.0', '0.0 سے آگے اہداف کی پیمائش دیکھیں'],
  ['TP1: -0.27 (20,527.00)', 'ہدف 1: -0.27 (20,527.00)'],
  ['TP2: -0.62 (20,562.00)', 'ہدف 2: -0.62 (20,562.00)'],
  ['TP3: -1.00 (20,600.00)', 'ہدف 3: -1.00 (20,600.00)'],
  ['TP4: -1.62 (20,661.80)', 'ہدف 4: -1.62 (20,661.80)'],
  ['From 0.705 Entry (20,429.50)', '0.705 انٹری (20,429.50) سے'],
  ['Points Gain', 'پوائنٹس کا فاصلہ'],
  ['Multiple vs. 5% Stop', '5% اسٹاپ کے مقابلے میں تناسب'],

  ['Multi-Timeframe Nested OTE Matrix', 'ملٹی ٹائم فریم نیسٹڈ OTE میٹرکس'],
  ['HTF Narrative -> MTF Zone -> LTF Entry', 'بڑا تناظر -> درمیانی زون -> چھوٹی انٹری'],
  ['Primary Role', 'بنیادی کردار'],
  ['Sample Range', 'نمونہ رینج'],
  ['Verification Focus', 'تصدیقی توجہ'],

  ['6 Recurring OTE Mistakes (Stick-Figure Gallery)', 'OTE کی 6 عام غلطیاں (اسٹک فگر گیلری)'],
  ['Click a trap to see why it fails', 'ناکامی کی وجہ دیکھنے کے لیے غلطی منتخب کریں'],
  ['Trap 1: Bare Fib Limit', 'غلطی 1: خالی فِب لمٹ'],
  ['Trap 2: Buying Above 0.50', 'غلطی 2: 0.50 سے اوپر خرید'],
  ['Trap 3: Micro Stop at 0.79', 'غلطی 3: 0.79 پر تنگ اسٹاپ'],
  ['Trap 4: Drawn 0.0 -> 1.0 Backward', 'غلطی 4: 0.0 سے 1.0 الٹا کھینچا'],
  ['Trap 5: Micro Chop Anchor', 'غلطی 5: مائیکرو چوپ اینکر'],
  ['Trap 6: News Spread Trap', 'غلطی 6: خبر کے اسپریڈ کا جال'],
  ['No FVG or MSS! Price slices right through.', 'نہ FVG نہ MSS! قیمت سیدھی نیچے گزر گئی۔'],
  ['Paying retail markup inside Premium.', 'پریمیم میں مہنگی خریداری پر پھنس گئے۔'],
  ['Wicked out at 0.85 right before reversal.', 'پلٹنے سے ٹھیک پہلے 0.85 پر اسٹاپ ہٹ۔'],
  ['0.62 plotted near top! Completely inverted.', '0.62 اوپر لگ گیا! پورا گرڈ الٹا ہو گیا۔'],
  ['Pulled on tiny 2-candle chop mid-range.', 'درمیان میں 2 چھوٹی کینڈلز پر گرڈ کھینچا گیا۔'],
  ['Static limit filled during CPI spike slippage.', 'CPI اسپائک کی سلپیج میں لمٹ آرڈر فِل ہو گیا۔'],
  ['Fix: Require overlapping FVG CE or Order Block + LTF structure.', 'حل: 0.62–0.79 میں FVG CE یا آرڈر بلاک + چھوٹے اسٹرکچر کی تصدیق لیں۔'],
  ['Fix: Never buy above 0.50; let price cross into Discount.', 'حل: 0.50 سے اوپر نہ خریدیں؛ قیمت کو ڈسکاؤنٹ میں آنے دیں۔'],
  ['Fix: Place structural stop beyond 1.0 origin (not 0.79).', 'حل: اسٹاپ کو 0.79 کے بجائے 1.0 آغاز سے باہر رکھیں۔'],
  ['Fix: Anchor 1.0 at start of impulse, 0.0 at termination.', 'حل: امپلس کے آغاز پر 1.0 اور اختتام پر 0.0 لگائیں۔'],
  ['Fix: Only anchor after liquidity sweep + displacement FVG.', 'حل: صرف لیکویڈیٹی سویپ اور ڈسپلیسمنٹ FVG کے بعد اینکر لگائیں۔'],
  ['Fix: Cancel resting limits ahead of CPI, NFP, and FOMC.', 'حل: CPI، NFP اور FOMC سے پہلے لمٹ آرڈرز منسوخ کر دیں۔'],
];

for (let i = 0; i < enDoc.takeaways.length; i++) {
  pairs.push([enDoc.takeaways[i], urDoc.takeaways[i]]);
}

const enSections = enDoc.sections as OteSection[];
const urSections = urDoc.sections as OteSection[];

for (let sIdx = 0; sIdx < enSections.length; sIdx++) {
  const enSec = enSections[sIdx];
  const urSec = urSections[sIdx];
  pairs.push([enSec.title, urSec.title]);
  for (let bIdx = 0; bIdx < enSec.blocks.length; bIdx++) {
    const eb = enSec.blocks[bIdx];
    const ub = urSec.blocks[bIdx];
    if (eb.text && ub.text) pairs.push([eb.text, ub.text]);
    if (eb.title && ub.title) pairs.push([eb.title, ub.title]);
    if (eb.items && ub.items) {
      for (let i = 0; i < eb.items.length; i++) {
        pairs.push([eb.items[i], ub.items[i]]);
      }
    }
    if (eb.rows && ub.rows) {
      for (let r = 0; r < eb.rows.length; r++) {
        for (let c = 0; c < eb.rows[r].length; c++) {
          pairs.push([eb.rows[r][c], ub.rows[r][c]]);
        }
      }
    }
  }
}

for (let f = 0; f < enDoc.faqs.length; f++) {
  pairs.push([enDoc.faqs[f].question, urDoc.faqs[f].question]);
  pairs.push([enDoc.faqs[f].answer, urDoc.faqs[f].answer]);
}

const sourceUrdu: Array<[string, string]> = [
  [
    'Investor.gov (SEC) — Stop Order',
    'Investor.gov (SEC) — اسٹاپ آرڈر کی وضاحت',
  ],
  [
    'Stock stop-market orders become market orders when triggered and may execute away from the stop price beyond 1.0 invalidation.',
    'اسٹاک اسٹاپ مارکیٹ آرڈرز ٹرگر ہونے پر مارکیٹ آرڈر بن جاتے ہیں اور 1.0 ان ویلیڈیشن سے باہر مقررہ قیمت سے ہٹ کر فِل ہو سکتے ہیں۔',
  ],
  [
    'Investor.gov (SEC) — Types of Orders & Limit Mechanics',
    'Investor.gov (SEC) — آرڈرز کی اقسام اور لمٹ اصول',
  ],
  [
    'Explains limit-price ceilings vs. marketable orders when resting entry orders sit inside a 0.62–0.79 retracement band.',
    '0.62–0.79 زون میں رکھے گئے لمٹ آرڈرز بمقابلہ مارکیٹ ایبل آرڈرز کی قیمت کی حد واضح کرتا ہے۔',
  ],
  [
    'CME Group — Micro E-mini Nasdaq-100 Contract Specs',
    'CME Group — مائیکرو ای منی نیسڈیک 100 کی تفصیلات',
  ],
  [
    'MNQ uses $2 per index point and a 0.25-point minimum tick ($0.50 tick value), guiding how 0.618 vs. 0.62 round to exchange ticks.',
    'MNQ میں فی انڈیکس پوائنٹ $2 اور کم از کم ٹِک 0.25 پوائنٹس ($0.50) ہے، جو 0.618 اور 0.62 کی ٹِک راؤنڈنگ واضح کرتا ہے۔',
  ],
  [
    'CME Group — Central Limit Order Book & Matching',
    'CME Group — سینٹرل لمٹ آرڈر بک اور میچنگ',
  ],
  [
    'Exchange explanation of FIFO and pro-rata queue priority showing why Fibonacci numbers themselves never guarantee order fills.',
    'FIFO اور پرو راٹا قطار کی ترجیح کی وضاحت جو دکھاتی ہے کہ صرف فبوناکی نمبر آرڈر فِل کی ضمانت نہیں دیتے۔',
  ],
  [
    'NYSE — Trading Hours and Market Holidays Calendar',
    'NYSE — ٹریڈنگ اوقات اور مارکیٹ تعطیلات کا کیلنڈر',
  ],
  [
    'Official schedule for the regular U.S. equities open (09:30 ET) used when pairing OTE pullbacks with active morning volume.',
    'امریکی اسٹاک مارکیٹ کے 09:30 ET اوپن کا سرکاری شیڈول جب صبح کے حجم میں OTE پل بیک کا مطالعہ کیا جاتا ہے۔',
  ],
  [
    'NIST — Daylight Saving Time Rules',
    'NIST — ڈے لائٹ سیونگ ٹائم (DST) کے اصول',
  ],
  [
    'Authoritative U.S. DST calendar keeping America/New_York session filters accurate across winter EST and summer EDT transitions.',
    'امریکی DST کا مستند کیلنڈر جو سردیوں اور گرمیوں میں America/New_York سیشن ونڈوز کو درست رکھتا ہے۔',
  ],
];
pairs.push(...sourceUrdu);

const quizUrdu: Array<[string, string]> = [
  [
    oteQuizzes[0].question,
    '0.705 کو آپٹیمل ٹریڈ انٹری (OTE) کا سویٹ اسپاٹ کیوں کہا جاتا ہے؟',
  ],
  [
    oteQuizzes[0].context!,
    'OTE پاکٹ کی کم گہری اور گہری حد کے درمیان حسابی تعلق۔',
  ],
  [
    oteQuizzes[0].options[0],
    '0.705 عین 0.62 اور 0.79 کا حسابی وسط ہے: (0.62 + 0.79) ÷ 2 = 0.705۔',
  ],
  [
    oteQuizzes[0].options[1],
    '0.705 فیوچرز کلیئرنگ ہاؤس کی جانب سے نافذ کردہ خاص سیٹلمنٹ ریشو ہے۔',
  ],
  [
    oteQuizzes[0].options[2],
    '0.705 بغیر کسی FVG کے ہر پل بیک کو عین ٹِک پر روکنے کی ضمانت دیتا ہے۔',
  ],
  [
    oteQuizzes[0].explanation,
    '0.705 کے پیچھے کوئی پراسرار راز نہیں: 0.62 اور 0.79 کی اوسط نکالنے سے عین 0.705 حاصل ہوتا ہے۔',
  ],
  [
    oteQuizzes[1].question,
    '20,400.00 سوئنگ لو سے 20,500.00 سوئنگ ہائی تک صعودی ڈسپلیسمنٹ میں فبوناکی کیسے لگائیں اور 0.705 کی قیمت کیا ہو گی؟',
  ],
  [
    oteQuizzes[1].options[0],
    '1.0 کو 20,400.00 پر اور 0.0 کو 20,500.00 پر لگائیں؛ 0.705 کی قیمت 20,429.50 ہو گی۔',
  ],
  [
    oteQuizzes[1].options[1],
    '0.0 کو 20,400.00 پر اور 1.0 کو 20,500.00 پر لگائیں؛ 0.705 کی قیمت 20,470.50 ہو گی۔',
  ],
  [
    oteQuizzes[1].options[2],
    '1.0 کو 20,450.00 پر اور 0.0 کو 20,500.00 پر لگائیں؛ 0.705 کی قیمت 20,464.75 ہو گی۔',
  ],
  [
    oteQuizzes[1].explanation,
    'آغاز 1.0 (20,400.00) سے اختتام 0.0 (20,500.00) تک کھینچنے سے 0.705 گہرے ڈسکاؤنٹ میں 20,429.50 پر آتا ہے۔',
  ],
  [
    oteQuizzes[2].question,
    'نزولی EUR/USD OTE سیٹ اپ (1.0900 ہائی تا 1.0800 لو) میں کون سی شرط پریمیم اور PD اَرے ہم آہنگی پوری کرتی ہے؟',
  ],
  [
    oteQuizzes[2].options[0],
    'قیمت 1.0850 ایکویلیبریم سے اوپر 1.0862–1.0879 میں جا کر فعال کِل زون میں نزولی آرڈر بلاک یا FVG کو چھوئے۔',
  ],
  [
    oteQuizzes[2].options[1],
    'قیمت ہلکے ایشیائی سیشن میں FVG کے بغیر صرف 1.0835 (ڈسکاؤنٹ) تک اچھلے۔',
  ],
  [
    oteQuizzes[2].options[2],
    'قیمت 1.0900 (1.0) سے واضح اوپر بند ہو اور آپ شارٹ پوزیشنز میں اضافہ کرتے رہیں۔',
  ],
  [
    oteQuizzes[2].explanation,
    'نزولی OTE میں قیمت کا 0.50 سے اوپر پریمیم (1.0862–1.0879) میں جا کر فعال اوقات میں نزولی PD اَرے سے ملنا ضروری ہے۔',
  ],
  [
    oteQuizzes[3].question,
    'OTE سیٹ اپ میں حفاظتی اسٹاپ لاس کہاں رکھنا چاہیے اور 0.79 پر اسٹاپ چھپانے سے کیوں گریز کریں؟',
  ],
  [
    oteQuizzes[3].options[0],
    'ان ویلیڈیشن 1.0 آغاز سے باہر (مثلاً 5% بفر کے ساتھ) رکھیں کیونکہ پل بیک اکثر پلٹنے سے پہلے 0.79 سے 0.85 تک سویپ کرتے ہیں۔',
  ],
  [
    oteQuizzes[3].options[1],
    'کاغذ پر بڑا R دکھانے کے لیے اسٹاپ رینج کے اندر 0.795 پر رکھ دیں۔',
  ],
  [
    oteQuizzes[3].options[2],
    'اسٹاپ لاس بالکل ہٹا دیں کیونکہ 0.705 ہمیشہ فوراً پلٹ جاتا ہے۔',
  ],
  [
    oteQuizzes[3].explanation,
    '1.0 آغاز پوری امپلس لہر کی بنیاد ہے؛ 1.0 کے باہر اسٹاپ رکھنا عام سویپس اور اصل ناکامی میں فرق واضح رکھتا ہے۔',
  ],
  [
    oteQuizzes[4].question,
    'فرضی NQ صعودی لہر میں 0.705 (20,429.50) کے بعد قیمت 20,500.00 (0.0) عبور کرتی ہے۔ -0.27 اور -0.62 کے اہداف کیا ہوں گے؟',
  ],
  [
    oteQuizzes[4].options[0],
    '-0.27 ہدف 20,527.00 اور -0.62 ہدف 20,562.00 ہے۔',
  ],
  [
    oteQuizzes[4].options[1],
    '-0.27 ہدف 20,473.00 اور -0.62 ہدف 20,438.00 ہے۔',
  ],
  [
    oteQuizzes[4].options[2],
    '-0.27 ہدف 20,550.00 اور -0.62 ہدف 20,620.00 ہے۔',
  ],
  [
    oteQuizzes[4].explanation,
    'Price(r) = 20,500 − 100 × r کے مطابق -0.27 پر 20,527.00 اور -0.62 پر 20,562.00 بنتے ہیں۔',
  ],
];
pairs.push(...quizUrdu);

export const oteTranslations: Record<string, string> = Object.fromEntries(pairs);
void oteChapter;
void oteSources;
