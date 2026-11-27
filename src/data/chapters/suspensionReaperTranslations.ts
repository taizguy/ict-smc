export const suspensionReaperTranslations: Record<string, string> = {
  // Core titles & SEO metadata
  'Suspension Blocks and Reaper FVG': 'سسپنشن بلاکس اور ریپر FVG',
  'Suspension Blocks & Reaper FVG Explained': 'سسپنشن بلاکس اور ریپر FVG کی مکمل وضاحت',
  'Suspension Blocks & Reaper FVG Explained | LearnSMC': 'سسپنشن بلاکس اور ریپر FVG کی مکمل وضاحت | LearnSMC',
  'Master Suspension Blocks (dual body-gap Volume Imbalances) and Reaper FVGs (nested IFVG-Breaker setups) with 3D charts, rules, and futures contract guides.':
    'سسپنشن بلاکس (ڈبل باڈی گیپ والیوم امبیلنس) اور ریپر FVG (بریکر کے اندر نیسٹڈ IFVG) کو 3D چارٹس، اصولوں اور فیوچرز کنٹریکٹ گائیڈ کے ساتھ سیکھیں۔',
  'A Suspension Block is a candle whose real body hangs isolated between two adjacent candle body-to-body Volume Imbalances while wicks overlap. A Reaper FVG is a nested Breaker-context setup pairing a validated Inverse FVG and an overlapping opposing FVG—not every failed IFVG—requiring explicit invalidation rules and matched futures contract feeds.':
    'سسپنشن بلاک ایسی کینڈل ہے جس کی اصل باڈی دو قریبی کینڈلز کے باڈی-ٹو-باڈی والیوم امبیلنسز کے درمیان معلق رہتی ہے چاہے وِکس اوورلیپ کر رہی ہوں۔ ریپر FVG بریکر کے سیاق میں ایک تصدیق شدہ اِنورس FVG اور مخالف FVG کا مشترکہ اوورلیپ ہے—ہر ناکام IFVG ریپر نہیں ہوتا—جس کے لیے واضح غلط ہونے کی شرط اور درست فیوچرز کنٹریکٹ فیڈ ضروری ہے۔',

  // Dates & Headings
  '15 October 2026': '15 اکتوبر 2026',
  '26 November 2026': '26 نومبر 2026',
  'Key Takeaways': 'اہم نکات',
  'Mathematical Formula': 'ریاضیاتی فارمولا',
  'On this page': 'اس صفحے پر',
  'sections': 'ابواب',
  'Show section links': 'سیکشن لنکس دکھائیں',
  'Pre-Execution Checklist': 'عمل درآمد سے پہلے چیک لسٹ',
  'Checklist items confirmed': 'تصدیق شدہ نکات',
  'All six structural, delivery-contract, session-window, and stop-invalidation rules verified.':
    'ساختی، ڈیلیوری کنٹریکٹ، سیشن ونڈو اور اسٹاپ غلط ہونے کے تمام چھ اصول تصدیق شدہ ہیں۔',
  'Confirm all 6 gates before classifying any chart sequence as a qualified Suspension Block or Reaper FVG study.':
    'کسی بھی چارٹ ترتیب کو سسپنشن بلاک یا ریپر FVG مطالعہ قرار دینے سے پہلے تمام 6 شرائط کی تصدیق کریں۔',
  'Sources & Institutional References': 'ماخذ اور ادارہ جاتی حوالہ جات',
  'Continue Studying': 'مزید مطالعہ جاری رکھیں',

  // Formula line
  'Bullish Suspension: bodyLow(C2) > bodyHigh(C1) AND bodyLow(C3) > bodyHigh(C2)':
    'بلش سسپنشن: bodyLow(C2) > bodyHigh(C1) اور bodyLow(C3) > bodyHigh(C2)',
  'Bearish Suspension: bodyHigh(C2) < bodyLow(C1) AND bodyHigh(C3) < bodyLow(C2)':
    'بیئرش سسپنشن: bodyHigh(C2) < bodyLow(C1) اور bodyHigh(C3) < bodyLow(C2)',
  'Reaper Overlap: [max(IFVG_Low, FVG2_Low), min(IFVG_High, FVG2_High)]':
    'ریپر اوورلیپ: [max(IFVG_Low, FVG2_Low), min(IFVG_High, FVG2_High)]',

  // Takeaways
  "True Suspension Geometry: Candle 2's open-to-close body sits completely separated from both Candle 1 and Candle 3 bodies, creating Lower and Upper Volume Imbalances even when outer wicks overlap.":
    'اصل سسپنشن ساخت: کینڈل 2 کی اوپن-ٹو-کلوز باڈی کینڈل 1 اور کینڈل 3 دونوں کی باڈیز سے مکمل الگ رہتی ہے، جس سے نچلا اور بالائی والیوم امبیلنس بنتا ہے چاہے بیرونی وِکس اوورلیپ کریں۔',
  'Not a Generic Pause Candle: An isolated single counter-trend candle without both body-to-body separations is an Order Block or Propulsion candidate, not a Suspension Block.':
    'صرف وقفی کینڈل نہیں: دونوں طرف باڈی-ٹو-باڈی فاصلے کے بغیر ایک مخالف کینڈل آرڈر بلاک یا پروپلشن بلاک ہو سکتی ہے، سسپنشن بلاک نہیں۔',
  'Reaper FVG Requires Context: In the sourced Breaker model, a prior gap flips via body close into an Inverse FVG (IFVG) and overlaps an opposing active FVG inside a swept swing.':
    'ریپر FVG کے لیے سیاق ضروری ہے: ماخذ والے بریکر ماڈل میں پہلا گیپ باڈی کلوز سے اِنورس FVG بنتا ہے اور سویپ شدہ سوئنگ کے اندر مخالف فعال FVG سے اوورلیپ کرتا ہے۔',
  'Contract Feed Calibration: Continuous futures charts (e.g., back-adjusted continuous feeds) can distort body separations relative to the active front-month delivery contract.':
    'کنٹریکٹ فیڈ کی ہم آہنگی: کنٹینیوس فیوچرز چارٹس (مثلاً بیک-ایڈجسٹڈ فیڈز) فعال فرنٹ منتھ ڈیلیوری کنٹریکٹ کے مقابلے میں باڈی کے فاصلے بدل سکتے ہیں۔',
  'Strict Risk & Claims Discipline: Neither a Suspension Block nor a Reaper label confirms participant intent or guarantees a first-touch reaction; define tick depth and close-based invalidation beforehand.':
    'سخت رسک اور شواہد کا نظم: نہ سسپنشن بلاک اور نہ ریپر کا نام کسی شریک کی نیت ثابت کرتا ہے اور نہ پہلی چھو پر ردعمل کی ضمانت دیتا ہے؛ ٹِک گہرائی اور کلوز کی بنیاد پر غلط ہونے کی شرط پہلے طے کریں۔',

  // Checklist & Related links
  'Verified Dual Body-to-Body Separation (VI-1 and VI-2 around Candle 2) or Confirmed Nested IFVG + Opposing FVG Overlap':
    'کینڈل 2 کے گرد دو طرفہ باڈی-ٹو-باڈی فاصلہ (VI-1 اور VI-2) یا تصدیق شدہ نیسٹڈ IFVG + مخالف FVG اوورلیپ کی جانچ کر لی گئی',
  'Distinguished True Suspension Geometry from a Plain Single-Candle Order Block or Ordinary Failed IFVG':
    'اصل سسپنشن ساخت کو عام سنگل کینڈل آرڈر بلاک یا معمولی ناکام IFVG سے الگ پہچان لیا گیا',
  'Calibrated All Gap Coordinates Directly on the Active Front-Month Delivery Contract (Zero Unadjusted Continuous Copy)':
    'تمام گیپ قیمتیں براہ راست فعال فرنٹ منتھ ڈیلیوری کنٹریکٹ پر جانچی گئیں (بغیر ایڈجسٹمنٹ کنٹینیوس نقل کے بغیر)',
  'Anchored Study to Stated America/New_York Active Session Window (London Open or NY AM/PM)':
    'مطالعہ کو واضح America/New_York فعال سیشن ونڈو (لندن اوپن یا نیویارک AM/PM) سے منسلک کیا گیا',
  'Defined Structural Close-Based Invalidation Past Outer VI-1 Edge or Swept Breaker Extreme Before Entry':
    'انٹری سے پہلے بیرونی VI-1 کنارے یا سویپ شدہ بریکر انتہا سے باہر کلوز کی بنیاد پر باطل ہونے کی حد طے کر لی گئی',
  'Calculated Exact Tick Depth, Commission/Spread Impact, and Account-Size Risk Limit Prior to Order Placement':
    'آرڈر لگانے سے پہلے درست ٹِک گہرائی، کمیشن/اسپریڈ کا اثر اور اکاؤنٹ رسک کی حد کا حساب لگا لیا گیا',

  'Study Fair Value Gaps (FVG & 50% CE)': 'فیئر ویلیو گیپس (FVG اور 50% CE) کا مطالعہ کریں',
  'Master Inverse Fair Value Gaps (IFVG)': 'اِنورس فیئر ویلیو گیپس (IFVG) سیکھیں',
  'Compare Balanced Price Ranges (RDRB & Enigma)': 'بیلنسڈ پرائس رینج (RDRB اور اینگما) کا موازنہ کریں',
  'Master Premium & Discount (PD Array Matrix)': 'پریمیم اور ڈسکاؤنٹ (PD اَرے میٹرکس) سیکھیں',
  'Study Breaker Blocks & Unicorn Structure': 'بریکر بلاکس اور یونیکارن ساخت کا مطالعہ کریں',
  'Explore Order Blocks & Propulsion Mitigation': 'آرڈر بلاکس اور پروپلشن میٹیگیشن دیکھیں',
  'Compare Optimal Trade Entry (OTE) 0.62–0.79': 'آپٹیمل ٹریڈ انٹری (OTE 0.62–0.79) سے موازنہ کریں',
  'Practice in the Guided Chart Lab': 'گائیڈڈ چارٹ لیب میں مشق کریں',

  // Section titles (1..25)
  '1. Why Body Gaps Suspend Price: The Beginner Mental Model':
    '1. باڈی گیپس قیمت کو کیسے معلق کرتے ہیں: بنیادی ذہنی ماڈل',
  '2. Suspension Block Exact OHLC Anatomy (Lower & Upper Body VIs)':
    '2. سسپنشن بلاک کی درست OHLC ساخت (نچلا اور بالائی باڈی VI)',
  '3. Interactive 3D Motion Study: Suspension Blocks & Reaper Sequences':
    '3. انٹرایکٹو 3D موشن اسٹڈی: سسپنشن بلاکس اور ریپر کی ترتیب',
  '4. Bullish vs. Bearish Suspension Blocks: Reading the Isolated Core':
    '4. بلش بمقابلہ بیئرش سسپنشن بلاکس: الگ تھلگ باڈی کور کی پہچان',
  '5. Interactive Suspension Dual-VI Calculator & FVG Comparator':
    '5. انٹرایکٹو سسپنشن ڈبل-VI کیلکولیٹر اور FVG موازنہ',
  '6. Classic 3-Candle FVG vs. Single Volume Imbalance vs. Suspension Block':
    '6. کلاسک 3-کینڈل FVG بمقابلہ سنگل والیوم امبیلنس بمقابلہ سسپنشن بلاک',
  '7. Suspension Block vs. Order Block vs. Propulsion Block vs. Breaker':
    '7. سسپنشن بلاک بمقابلہ آرڈر بلاک بمقابلہ پروپلشن بلاک بمقابلہ بریکر',
  '8. Introducing the Reaper FVG: Beyond Simple Inversion':
    '8. ریپر FVG کا تعارف: محض اِنورژن سے آگے کی ساخت',
  '9. Interactive Breaker-to-Reaper Sequence Dissector':
    '9. انٹرایکٹو بریکر تا ریپر سیکوئنس تجزیہ کار',
  '10. Anatomy of a Sourced Bearish & Bullish Reaper Variant':
    '10. ماخذ شدہ بیئرش اور بلش ریپر صورت کی مکمل ساخت',
  '11. Reaper FVG vs. Standard IFVG vs. Failed IFVG vs. Unicorn':
    '11. ریپر FVG بمقابلہ معیاری IFVG بمقابلہ ناکام IFVG بمقابلہ یونیکارن',
  '12. Separating Source Titles from Verified Chart Rules':
    '12. ماخذ کے عنوانات کو تصدیق شدہ چارٹ اصولوں سے الگ رکھنا',
  '13. Continuous vs. Front-Month Futures Contract Calibration':
    '13. کنٹینیوس بمقابلہ فرنٹ منتھ فیوچرز کنٹریکٹ ہم آہنگی',
  '14. Interactive 6-Gate Suspension & Reaper Confluence Grader':
    '14. انٹرایکٹو 6-شرطی سسپنشن اور ریپر ہم آہنگی اسکورر',
  '15. Multi-Timeframe Fractal Nesting (HTF Suspension to LTF Reaper)':
    '15. ملٹی ٹائم فریم نیسٹنگ (HTF سسپنشن تا LTF ریپر)',
  '16. Session Killzones & Time-of-Day Filtering (America/New_York)':
    '16. سیشن کِل زونز اور وقت کی چھان بین (America/New_York)',
  '17. Worked Bullish Blueprint: NQ Morning Suspension + LTF Reaper Confirmation':
    '17. عملی بلش مثال: NQ مارننگ سسپنشن + LTF ریپر تصدیق',
  '18. Worked Bearish Blueprint: EUR/USD & Index Breaker + Nested Reaper':
    '18. عملی بیئرش مثال: EUR/USD اور انڈیکس بریکر + نیسٹڈ ریپر',
  '19. Invalidation Geometry, Stop Placement & Futures Tick Precision':
    '19. باطل ہونے کی ساخت، اسٹاپ پلیسمنٹ اور فیوچرز ٹِک درستگی',
  '20. Common Beginner & Intermediate Mistakes (Illustrated)':
    '20. عام ابتدائی اور درمیانی غلطیاں (تصویری وضاحت)',
  '21. High-Probability vs. Low-Probability Tape Conditions':
    '21. زیادہ واضح بمقابلہ کم واضح مارکیٹ حالات',
  '22. Pre-Execution 6-Gate Checklist (Interactive)':
    '22. عمل درآمد سے پہلے 6-نکاتی انٹرایکٹو چیک لسٹ',
  '23. Comprehensive Glossary & Reference Matrix (24 Terms)':
    '23. جامع لغت اور حوالہ میٹرکس (24 اصطلاحات)',
  '24. Baseline Reference Retention & Institutional Market Sources':
    '24. بنیادی حوالہ جات کی برقراری اور ادارہ جاتی مارکیٹ ماخذ',
  '25. Frequently Asked Questions (Suspension Blocks & Reaper FVG)':
    '25. اکثر پوچھے جانے والے سوالات (سسپنشن بلاکس اور ریپر FVG)',

  // Section 1 prose & callouts
  "When new traders learn Fair Value Gaps (FVGs), they train their eyes to measure only outer wicks: Candle 1's high to Candle 3's low. Whenever those wicks overlap, they assume price action is completely balanced and move on. A Suspension Block exposes the blind spot in that habit. Even when Candle 1, Candle 2, and Candle 3 share overlapping wick shadows, the open-to-close bodies can still break apart into two clean voids—one immediately beneath Candle 2's body and another immediately above it.":
    'جب نئے ٹریڈرز فیئر ویلیو گیپس (FVGs) سیکھتے ہیں تو ان کی نظریں صرف بیرونی وِکس—یعنی کینڈل 1 کے ہائی سے کینڈل 3 کے لو تک—ناپنے کی عادی ہو جاتی ہیں۔ جب وہ وِکس آپس میں مل جائیں تو وہ سمجھتے ہیں کہ قیمت متوازن ہے اور آگے بڑھ جاتے ہیں۔ سسپنشن بلاک اس عادت کا پوشیدہ پہلو آشکار کرتا ہے۔ چاہے کینڈل 1، کینڈل 2 اور کینڈل 3 کی وِکس اوورلیپ کر رہی ہوں، ان کی اوپن-ٹو-کلوز باڈیز پھر بھی دو واضح خلا بنا سکتی ہیں—ایک کینڈل 2 کی باڈی کے عین نیچے اور دوسرا عین اوپر۔',
  'Imagine three wooden stepping stones across a fast stream connected only by narrow submerged planks (the wicks). Because the main stones (the bodies) never touch, the middle stone looks suspended mid-air over two separate gaps. In ICT terminology, each body-to-body separation is a Volume Imbalance (VI)—meaning the majority of body-level price expansion stepped vertically without adjacent opening/closing overlap.':
    'تیز ندی پر تین پتھروں کا تصور کریں جو صرف پانی کے اندر باریک تختوں (وِکس) سے جڑے ہوں۔ چونکہ بڑے پتھر (باڈیز) آپس میں نہیں ملتے، درمیانی پتھر دو الگ خلاؤں کے اوپر ہوا میں معلق نظر آتا ہے۔ ICT کی اصطلاح میں باڈی سے باڈی کی یہ دوری والیوم امبیلنس (VI) کہلاتی ہے—یعنی کینڈل کے کھلنے اور بند ہونے کی اصل قیمتیں متصل اوورلیپ کے بغیر آگے بڑھیں۔',
  'Plain-Language Core Rule': 'سادہ زبان میں بنیادی اصول',
  'Think of a Suspension Block as a central candle body bookended by two consecutive Volume Imbalances: one body gap just before the candle opens, and a second body gap right after that candle closes.':
    'سسپنشن بلاک کو ایک درمیانی کینڈل باڈی سمجھیں جس کے دونوں طرف دو مسلسل والیوم امبیلنسز ہوں: ایک باڈی گیپ کینڈل کے کھلنے سے فوراً پہلے، اور دوسرا باڈی گیپ کینڈل کے بند ہونے کے فوراً بعد۔',

  // Section 2 prose, list, table
  'Every Suspension Block is defined on three consecutive completed candles (C1, C2, C3) on the exact same timeframe and data feed. Instead of scanning High/Low wicks, inspect the Open and Close coordinates of each body using bodyLow = min(Open, Close) and bodyHigh = max(Open, Close).':
    'ہر سسپنشن بلاک ایک ہی ٹائم فریم اور ڈیٹا فیڈ پر تین مسلسل مکمل کینڈلز (C1، C2، C3) سے متعین ہوتا ہے۔ ہائی/لو وِکس کے بجائے ہر باڈی کے اوپن اور کلوز کو دیکھیں جہاں bodyLow = min(Open, Close) اور bodyHigh = max(Open, Close) ہو۔',
  'Bullish Suspension Inequality: bodyLow(C2) > bodyHigh(C1) AND bodyLow(C3) > bodyHigh(C2). Lower VI spans [bodyHigh(C1), bodyLow(C2)], and Upper VI spans [bodyHigh(C2), bodyLow(C3)].':
    'بلش سسپنشن شرط: bodyLow(C2) > bodyHigh(C1) اور bodyLow(C3) > bodyHigh(C2)۔ نچلا VI [bodyHigh(C1), bodyLow(C2)] پر اور بالائی VI [bodyHigh(C2), bodyLow(C3)] پر پھیلا ہوتا ہے۔',
  'Bearish Suspension Inequality: bodyHigh(C2) < bodyLow(C1) AND bodyHigh(C3) < bodyLow(C2). Upper VI spans [bodyHigh(C2), bodyLow(C1)], and Lower VI spans [bodyHigh(C3), bodyLow(C2)].':
    'بیئرش سسپنشن شرط: bodyHigh(C2) < bodyLow(C1) اور bodyHigh(C3) < bodyLow(C2)۔ بالائی VI [bodyHigh(C2), bodyLow(C1)] پر اور نچلا VI [bodyHigh(C3), bodyLow(C2)] پر محیط ہوتا ہے۔',
  "Total Suspension Envelope: The combined vertical corridor running from the outer boundary of the first Volume Imbalance to the far edge of the second Volume Imbalance, with C2's isolated body sitting strictly in the middle.":
    'مکمل سسپنشن انویلوپ: پہلے والیوم امبیلنس کی بیرونی حد سے دوسرے والیوم امبیلنس کے آخری کنارے تک کا پورا عمودی زون، جس کے عین وسط میں C2 کی الگ باڈی واقع ہوتی ہے۔',
  'Structural Element': 'ساختی عنصر',
  'Bullish Suspension Block': 'بلش سسپنشن بلاک',
  'Bearish Suspension Block': 'بیئرش سسپنشن بلاک',
  'Analytical Role': 'تجزیاتی کردار',
  'First Body Gap (VI-1)': 'پہلا باڈی گیپ (VI-1)',
  'C1 Body High to C2 Body Low': 'C1 باڈی ہائی سے C2 باڈی لو تک',
  'C2 Body High to C1 Body Low': 'C2 باڈی ہائی سے C1 باڈی لو تک',
  'Initiation jump separating Candle 1 and Candle 2 bodies': 'کینڈل 1 اور کینڈل 2 کی باڈیز کو الگ کرنے والا ابتدائی فاصلہ',
  'Isolated Core Body': 'معلق مرکزی باڈی',
  'C2 [min(O,C) to max(O,C)]': 'C2 [min(O,C) تا max(O,C)]',
  'Central suspended shelf framed between the two VIs': 'دونوں VIs کے درمیان معلق درمیانی سطح',
  'Second Body Gap (VI-2)': 'دوسرا باڈی گیپ (VI-2)',
  'C2 Body High to C3 Body Low': 'C2 باڈی ہائی سے C3 باڈی لو تک',
  'C3 Body High to C2 Body Low': 'C3 باڈی ہائی سے C2 باڈی لو تک',
  'Continuation jump leaving Candle 2 hanging behind C3': 'کینڈل 2 کو کینڈل 3 سے پیچھے معلق چھوڑنے والا تسلسل کا فاصلہ',
  'Wick Overlap Condition': 'وِک اوورلیپ کی شرط',
  'C2 Low <= C1 High or C3 Low <= C2 High': 'C2 لو <= C1 ہائی یا C3 لو <= C2 ہائی',
  'C2 High >= C1 Low or C3 High >= C2 Low': 'C2 ہائی >= C1 لو یا C3 ہائی >= C2 لو',
  'Explains why classic outer-wick scanners stay blind to the block': 'واضح کرتا ہے کہ کلاسک بیرونی وِک اسکینر اس بلاک کو کیوں نہیں دیکھ پاتے',
  'Invalidation Reference': 'باطل ہونے کا حوالہ',
  'Full body close below VI-1 bottom': 'VI-1 کے نچلے کنارے سے نیچے مکمل باڈی کلوز',
  'Full body close above VI-1 top': 'VI-1 کے بالائی کنارے سے اوپر مکمل باڈی کلوز',
  'Neutralizes the suspended continuation structure': 'معلق تسلسل کی ساخت کو غیر مؤثر قرار دیتا ہے',

  // Section 3 prose
  'Two-dimensional flat rectangles often flatten the relationship between overlapping wicks, suspended bodies, and nested Breaker-Reaper zones. Use the interactive 3D Motion Study cinema below to step candle-by-candle through four explicit synthetic scenarios: Bullish Suspension, Bearish Suspension, Nested Bearish Reaper IFVG, and Contract-Drift Failure.':
    'دو جہتی چپٹے ڈبے اکثر اوورلیپ کرتی وِکس، معلق باڈیز اور نیسٹڈ بریکر-ریپر زونز کا تعلق چھپا دیتے ہیں۔ ذیل میں دیے گئے 3D موشن اسٹڈی سنیما کے ذریعے چار مصنوعی منظرناموں—بلش سسپنشن، بیئرش سسپنشن، نیسٹڈ بیئرش ریپر IFVG اور کنٹریکٹ فرق کی ناکامی—کو کینڈل بہ کینڈل دیکھیں۔',
  'Toggle between the 3D Isometric perspective and the Straight-On Ruler view to measure exact close/open separations, inspect where overlapping wicks bridge across gap corridors, and verify how closing prices validate or invalidate each zone.':
    'کلوز اور اوپن کے درست فاصلے ناپنے، گیپ کے آر پار گزرتی وِکس کا معائنہ کرنے، اور کلوزنگ قیمتوں کے ذریعے زون کی تصدیق یا ناکامی دیکھنے کے لیے 3D آئیسومیٹرک اور سیدھے رولر منظر کے درمیان سوئچ کریں۔',

  // Section 4 prose & callout
  "In a Bullish Suspension Block, C1 closes higher, C2 gaps upward on the open (forming VI-1 beneath it) and closes strong, and C3 gaps upward again on its open (forming VI-2 above C2). Note carefully: C2 can be a small up-close candle, a doji-like pause, or even a small down-close pause candle—so long as its entire body range remains strictly above C1's body top and strictly below C3's body bottom.":
    'بلش سسپنشن بلاک میں C1 اوپر بند ہوتی ہے، C2 اوپر گیپ کے ساتھ کھل کر (اپنے نیچے VI-1 بناتے ہوئے) بند ہوتی ہے، اور C3 دوبارہ اوپر گیپ سے کھل کر (C2 کے اوپر VI-2 بناتے ہوئے) آگے بڑھتی ہے۔ یاد رکھیں: C2 ایک چھوٹی سبز کینڈل، ڈوجی جیسا وقفہ، یا چھوٹی سرخ کینڈل بھی ہو سکتی ہے—بشرطیکہ اس کی پوری باڈی C1 کی باڈی کے اوپر اور C3 کی باڈی کے نیچے رہے۔',
  "In a Bearish Suspension Block, the sequence mirrors downward. C1 closes lower, C2 opens below C1's body top-to-bottom boundary, and C3 opens strictly beneath C2's body bottom. When price later retraces upward into the Bearish Suspension Envelope, traders observe three sub-references in order: the nearer Lower VI (VI-2), the 50% midpoint of the C2 Core Body, and the Upper VI (VI-1) ceiling.":
    'بیئرش سسپنشن بلاک میں یہی ترتیب نیچے کی جانب ہوتی ہے۔ C1 نیچے کلوز ہوتی ہے، C2 کی باڈی C1 کی باڈی کے نیچے کھلتی ہے، اور C3 کی باڈی C2 کی باڈی کے عین نیچے کھلتی ہے۔ بعد میں جب قیمت اوپر ریٹریس کرے تو ٹریڈرز ترتیب سے تین سطحیں دیکھتے ہیں: قریبی نچلا VI (VI-2)، C2 باڈی کا 50% وسطی نقطہ، اور بالائی VI (VI-1) کی حد۔',
  'Avoiding the Single Counter-Candle Trap': 'اکیلی مخالف کینڈل کے دھوکے سے بچاؤ',
  'A solitary red candle inside an uptrend whose open and close match the prior and next candle bodies has zero body-to-body Volume Imbalances. That pattern is a standard Order Block candidate, never a Suspension Block.':
    'اپ ٹرینڈ میں ایک اکیلی سرخ کینڈل جس کا اوپن اور کلوز پچھلی اور اگلی کینڈل کی باڈیز سے ملتا ہو، اس میں کوئی باڈی-ٹو-باڈی والیوم امبیلنس نہیں ہوتا۔ وہ محض ایک معیاری آرڈر بلاک ہو سکتا ہے، سسپنشن بلاک ہرگز نہیں۔',

  // Section 5 prose
  'Before labeling any three-candle impulse on a live chart, test the exact Open/Close and High/Low coordinates. Load a preset or adjust the OHLC inputs below to inspect how tiny 2-to-5-point shifts in candle opens transform a plain overlapping triad into a Dual-VI Suspension Block, a Single VI, or an Open Outer-Wick FVG.':
    'لائیو چارٹ پر کسی بھی تین-کینڈل حرکت کو نام دینے سے پہلے اوپن/کلوز اور ہائی/لو قیمتوں کو جانچیں۔ نیچے دیے گئے پری سیٹس لوڈ کریں یا OHLC تبدیل کر کے دیکھیں کہ 2 سے 5 پوائنٹس کا فرق کیسے ایک سادہ سلسلے کو ڈبل-VI سسپنشن بلاک، سنگل VI یا کلاسک بیرونی وِک FVG میں بدل دیتا ہے۔',

  // Section 6 prose & table
  'Beginners frequently conflate every gap term into one generic box. Yet Fair Value Gaps (FVG / BISI / SIBI), single Volume Imbalances (VI), Opening Gaps (NWOG / NDOG), and Suspension Blocks measure distinctly different OHLC price relationships.':
    'مبتدی اکثر ہر گیپ اصطلاح کو ایک ہی عام ڈبے میں ملا دیتے ہیں۔ حالانکہ فیئر ویلیو گیپ (FVG / BISI / SIBI)، سنگل والیوم امبیلنس (VI)، اوپننگ گیپس (NWOG / NDOG) اور سسپنشن بلاکس بالکل مختلف OHLC قیمتوں کے تعلق ناپتے ہیں۔',
  'Gap Type': 'گیپ کی قسم',
  'Candle Count': 'کینڈلز کی تعداد',
  'Measured Coordinates': 'ناپے جانے والے نقاط',
  'Outer Wick Condition': 'بیرونی وِک کی شرط',
  'Core Diagnostic Question': 'بنیادی تشخیصی سوال',
  'Classic 3-Candle FVG': 'کلاسک 3-کینڈل FVG',
  '3 candles': '3 کینڈلز',
  'C1 Wick to C3 Wick': 'C1 وِک سے C3 وِک تک',
  'C1 and C3 wicks must NOT overlap': 'C1 اور C3 کی وِکس اوورلیپ نہ کریں',
  'Did price leave raw untested wick space across Candle 2?':
    'کیا قیمت نے کینڈل 2 کے آر پار وِکس کے درمیان خالی جگہ چھوڑی؟',
  'Single Volume Imbalance (VI)': 'سنگل والیوم امبیلنس (VI)',
  '2 adjacent candles': '2 قریبی کینڈلز',
  'C1 Close/Open to C2 Open/Close': 'C1 کلوز/اوپن سے C2 اوپن/کلوز تک',
  'Wicks typically overlap across the gap': 'وِکس عموماً گیپ کے اوپر اوورلیپ کرتی ہیں',
  'Did adjacent bodies jump apart once with wick overlap?':
    'کیا وِکس کے ملاپ کے باوجود متصل باڈیز ایک بار الگ ہوئیں؟',
  'Suspension Block': 'سسپنشن بلاک',
  '3 consecutive candles': '3 مسلسل کینڈلز',
  'Two Body VIs flanking C2 body': 'C2 باڈی کے دونوں جانب دو باڈی VIs',
  'Wicks overlap so classic FVG may be absent': 'وِکس اوورلیپ کرتی ہیں اس لیے کلاسک FVG غائب ہو سکتا ہے',
  "Is C2's full body suspended between VI-1 AND VI-2?":
    'کیا C2 کی پوری باڈی VI-1 اور VI-2 کے درمیان معلق ہے؟',
  'NWOG / NDOG Opening Gap': 'NWOG / NDOG اوپننگ گیپ',
  'Session close to open': 'سیشن کلوز سے اوپن تک',
  'Prior session Close to new Open': 'پچھلے سیشن کے کلوز سے نئے اوپن تک',
  'Weekend or daily maintenance jump': 'ہفتہ وار یا روزانہ وقفے کا فاصلہ',
  'Did an external session break separate the open from prior close?':
    'کیا سیشن کے وقفے نے نئے اوپن کو پچھلے کلوز سے الگ کیا؟',

  // Section 7 prose
  'In the PD Array Matrix, Order Blocks, Propulsion Blocks, Breaker Blocks, and Suspension Blocks often cluster in the same expansion leg. Mixing their definitions blurs stop placement because each block invalidates at a different threshold.':
    'PD اَرے میٹرکس میں آرڈر بلاکس، پروپلشن بلاکس، بریکر بلاکس اور سسپنشن بلاکس اکثر ایک ہی تیز حرکت میں ساتھ جمع ہو جاتے ہیں۔ ان کی تعریفیں ملانے سے اسٹاپ لاس کا اصول بگڑ جاتا ہے کیونکہ ہر بلاک الگ حد پر باطل ہوتا ہے۔',
  'An Order Block emphasizes the last opposing-color candle (or consecutive run) prior to a structural displacement. A Propulsion Block is a secondary opposing candle that dipped directly into a prior Order Block\'s 50% mean threshold before launching the next impulse. A Breaker Block is a failed Order Block situated after a liquidity sweep and Market Structure Shift. A Suspension Block cares strictly about body-to-body air pockets on both sides of Candle 2—even when all three candles share the exact same bullish or bearish color.':
    'آرڈر بلاک اسٹرکچرل بریک سے پہلے آخری مخالف رنگ کی کینڈل پر توجہ دیتا ہے۔ پروپلشن بلاک ایک ثانوی مخالف کینڈل ہے جو پہلے آرڈر بلاک کے 50% وسط کو چھو کر نئی حرکت شروع کرے۔ بریکر بلاک لیکویڈیٹی سویپ اور MSS کے بعد ناکام ہونے والا آرڈر بلاک ہے۔ جبکہ سسپنشن بلاک صرف کینڈل 2 کے دونوں طرف باڈی-ٹو-باڈی خلا کو دیکھتا ہے—چاہے تینوں کینڈلز کا رنگ ایک ہی کیوں نہ ہو۔',

  // Section 8 prose & callout
  "In standard ICT market structure, an Inverse Fair Value Gap (IFVG) occurs whenever price closes decisively through an opposing FVG, flipping old support into resistance (or old resistance into support). Early online commentary loosely applied the label 'Reaper' to almost any failed IFVG or morning reversal.":
    'معیاری ICT اسٹرکچر میں اِنورس فیئر ویلیو گیپ (IFVG) تب بنتا ہے جب قیمت کسی مخالف FVG کے آر پار فیصلہ کن کلوز کر کے پرانی سپورٹ کو مزاحمت (یا مزاحمت کو سپورٹ) میں بدل دے۔ ابتدائی آن لائن تبصروں میں تقریباً ہر ناکام IFVG یا صبح کے الٹاؤ کو غیر محتاط طور پر "ریپر" کہا جاتا تھا۔',
  'However, rigorous study requires separating internet folklore from documented chart geometry. In the reviewed June 2026 variant, a Reaper FVG is specifically examined as a two-gap nested structure inside a Breaker context: a newly validated Inverse FVG overlaps an opposing Fair Value Gap right alongside the swept swing leg.':
    'تاہم سنجیدہ مطالعہ انٹرنیٹ کی مفروضاتی باتوں اور دستاویزی چارٹ ساخت میں فرق مانگتا ہے۔ جون 2026 کے زیر جائزہ ماڈل میں ریپر FVG خاص طور پر بریکر کے سیاق میں دو ایک دوسرے میں شامل گیپس کی ساخت ہے: جہاں ایک تازہ تصدیق شدہ اِنورس FVG سویپ شدہ سوئنگ کے ساتھ مخالف فعال FVG سے براہ راست اوورلیپ کرتا ہے۔',
  'Key Terminology Boundary': 'اہم اصطلاحی حد',
  'Treat an ordinary violated Inverse FVG simply as a failed IFVG unless the chart actually displays the nested two-gap Breaker overlap or the documented execution context matches the named study.':
    'جب تک چارٹ پر بریکر کے اندر دو گیپس کا حقیقی اوورلیپ یا واضح اصل سیاق موجود نہ ہو، عام ٹوٹے ہوئے اِنورس FVG کو محض ایک ناکام IFVG ہی سمجھیں۔',

  // Section 9 prose
  'Explore each chronological step of a Bearish or Bullish Reaper FVG formation below. Click through the stages from initial Leg 1 impulse through sweep, closing IFVG validation, nested opposing FVG overlap, and retest invalidation boundaries.':
    'ذیل میں بیئرش یا بلش ریپر FVG بننے کے ہر مرحلے کو ترتیب سے دیکھیں۔ ابتدائی حرکت سے لے کر سویپ، کلوز کے ذریعے IFVG کی تصدیق، مخالف FVG اوورلیپ اور ری ٹیسٹ کی باطل ہونے والی حدود تک کلک کریں۔',

  // Section 10 prose & list
  'To qualify a chart as a nested Reaper FVG study rather than a random reversal, trace five sequential observations across the swing:':
    'کسی چارٹ کو محض اتفاقی الٹاؤ کے بجائے نیسٹڈ ریپر FVG مطالعہ قرار دینے کے لیے سوئنگ میں ان پانچ مراحل کی ترتیب جانچیں:',
  'Stage 1 — Initial Impulse Gap (FVG-1): Price drives into a prior high (bearish setup) or low (bullish setup), printing a visible three-candle FVG inside the pre-sweep swing leg.':
    'مرحلہ 1 — ابتدائی حرکت کا گیپ (FVG-1): قیمت پچھلے ہائی (بیئرش سیٹ اپ) یا لو (بلش سیٹ اپ) کی طرف بڑھتے ہوئے سویپ سے پہلے واضح تین-کینڈل FVG بناتی ہے۔',
  'Stage 2 — Swing Sweep Extreme: Price pushes briefly beyond the reference high/low, forming the structural apex of the upcoming Breaker Block.':
    'مرحلہ 2 — سوئنگ سویپ انتہا: قیمت مختصر وقت کے لیے حوالہ ہائی یا لو سے آگے نکل کر آنے والے بریکر بلاک کی چوٹی بناتی ہے۔',
  'Stage 3 — Decisive Closing Inversion (IFVG): A strong opposing impulse closes completely across FVG-1, converting the trapped gap into a validated Inverse FVG.':
    'مرحلہ 3 — کلوز کے ساتھ اِنورژن (IFVG): ایک تیز مخالف حرکت FVG-1 کے آر پار مکمل کلوز دے کر پھنسے ہوئے گیپ کو تصدیق شدہ اِنورس FVG میں بدل دیتی ہے۔',
  'Stage 4 — Nested Opposing Gap (FVG-2 Overlap): The same breaking displacement leaves behind a fresh opposing FVG-2 whose vertical span overlaps the flipped IFVG-1 zone, computed cleanly as Reaper_Low = max(IFVG_Low, FVG2_Low) and Reaper_High = min(IFVG_High, FVG2_High).':
    'مرحلہ 4 — نیسٹڈ مخالف گیپ (FVG-2 اوورلیپ): بریک کرنے والی یہی حرکت ایک نیا مخالف FVG-2 چھوڑتی ہے جو الٹے ہوئے IFVG-1 سے اوورلیپ کرتا ہے؛ اس کی حد Reaper_Low = max(IFVG_Low, FVG2_Low) اور Reaper_High = min(IFVG_High, FVG2_High) سے نکلتی ہے۔',
  'Stage 5 — First-Utilization Retest: Price retraces into that tight nested overlap zone (often aligned with the Breaker Block boundary) while bodies stay contained on the active side of the overlap.':
    'مرحلہ 5 — پہلا ری ٹیسٹ: قیمت اس تنگ نیسٹڈ اوورلیپ زون (جو اکثر بریکر بلاک کی حد سے ملتا ہے) میں واپس آتی ہے جبکہ کینڈل باڈیز فعال جانب محدود رہتی ہیں۔',

  // Section 11 prose & table
  'Because Reaper FVG, Unicorn Model, BPR, and Failed IFVG all involve overlapping boxes inside a reversal swing, students routinely misclassify them. Compare their exact structural checklists:':
    'چونکہ ریپر FVG، یونیکارن ماڈل، BPR اور ناکام IFVG سبھی ریورسل سوئنگ میں ڈبوں کے ملاپ سے تعلق رکھتے ہیں، طلبہ اکثر انہیں آپس میں گڈمڈ کر دیتے ہیں۔ ان کی درست شرائط کا موازنہ دیکھیں:',
  'Model Name': 'ماڈل کا نام',
  'Sweep + Breaker Required?': 'سویپ + بریکر لازمی؟',
  'Two Overlapping FVGs?': 'دو اوورلیپ کرتے FVGs؟',
  'Distinguishing Structural Requirement': 'امتیازی ساختی شرط',
  'Standard IFVG': 'معیاری IFVG',
  'Optional': 'اختیاری',
  'No (single flipped FVG)': 'نہیں (صرف ایک الٹا ہوا FVG)',
  'Candle body closes through one FVG; retest occurs on the flipped range':
    'کینڈل باڈی ایک FVG کے آر پار کلوز ہوتی ہے؛ ری ٹیسٹ اسی الٹی ہوئی رینج پر ہوتا ہے',
  'Failed IFVG': 'ناکام IFVG',
  'No': 'نہیں',
  'Price validates an IFVG, retests, then closes back through it, restoring prior trend':
    'قیمت IFVG بنا کر ری ٹیسٹ کرتی ہے اور پھر واپس اس کے آر پار کلوز ہو کر پچھلا رجحان بحال کر دیتی ہے',
  'Classic Unicorn': 'کلاسک یونیکارن',
  'Yes (Breaker Block)': 'ہاں (بریکر بلاک)',
  'Usually single FVG inside Breaker': 'عموماً بریکر کے اندر ایک ہی FVG',
  'Overlaps a completed Breaker Block with a regular active FVG on the breaking leg':
    'مکمل بریکر بلاک کو توڑنے والی حرکت کے ایک عام فعال FVG کے ساتھ جوڑتا ہے',
  'Balanced Price Range (BPR)': 'بیلنسڈ پرائس رینج (BPR)',
  'Recommended': 'مفید / ترجیحی',
  'Yes (opposing FVGs overlap)': 'ہاں (مخالف FVGs کا ملاپ)',
  'Direct overlap of FVG-1 and FVG-2, with or without a formal Breaker candle':
    'باقاعدہ بریکر کینڈل کے ساتھ یا اس کے بغیر FVG-1 اور FVG-2 کا براہ راست اوورلیپ',
  'Sourced Reaper FVG': 'ماخذ شدہ ریپر FVG',
  'Yes (Breaker context)': 'ہاں (بریکر کا سیاق)',
  'Yes (validated IFVG + FVG-2 overlap)': 'ہاں (تصدیق شدہ IFVG + FVG-2 اوورلیپ)',
  'Examines inverted FVG-1 nested inside FVG-2 plus wick/body placement around the Breaker':
    'بریکر کے گرد وِکس اور باڈیز کی جگہ کے ساتھ FVG-2 کے اندر شامل الٹے ہوئے IFVG-1 کا مطالعہ کرتا ہے',

  // Section 12 prose
  "One of the most damaging habits in modern trading education is reverse-engineering universal laws from a single video title or timestamp. Seeing an execution titled 'Reaper FVG' or '09:50 Stop Hunt' does not authenticate unstated rules—such as forcing every 09:50 AM move to reverse, treating every failed inversion as a mandatory flip signal, or claiming a first touch of any Suspension Block is risk-free.":
    'جدید ٹریڈنگ تعلیم میں سب سے نقصان دہ عادت کسی ایک ویڈیو کے عنوان یا وقت سے آفاقی قوانین گھڑ لینا ہے۔ "Reaper FVG" یا "09:50 Stop Hunt" جیسا عنوان دیکھنے سے غیر بیان شدہ اصول ثابت نہیں ہو جاتے—جیسے ہر 09:50 حرکت کو لازمی الٹاؤ سمجھنا، ہر ناکام اِنورژن پر فوراً ٹریڈ پلٹنا یا کسی سسپنشن بلاک کی پہلی چھو کو بے خطر قرار دینا۔',
  'A chart annotation is a study hypothesis, not a statement about who placed resting orders or proof that every retail stop was swept. Always record the original gap boundaries, exact closing criterion, wick behavior, and invalidation point independently before backtesting.':
    'چارٹ پر لکھی علامت صرف ایک مطالعاتی مفروضہ ہے، نہ کہ اس بات کا ثبوت کہ کس نے آرڈر لگائے یا تمام ریٹیل اسٹاپس نکال لیے گئے۔ بیک ٹیسٹنگ سے پہلے ہمیشہ اصل گیپ کی حدود، کلوز کا واضح معیار، وِکس کا برتاؤ اور باطل ہونے کا نقطہ الگ درج کریں۔',

  // Section 13 prose
  'Suspension Blocks depend on tiny 1-to-8-tick separations between Candle Close and next Candle Open. In equity index futures like E-mini Nasdaq (NQ) or Micro E-mini Nasdaq (MNQ), traders often discover a sharp difference between the Continuous Back-Adjusted Chart (e.g., NQ1!) and the active Front-Month Delivery Contract (e.g., NQH, NQM, NQU, or NQZ).':
    'سسپنشن بلاکس کینڈل کلوز اور اگلے اوپن کے درمیان 1 سے 8 ٹِک کے باریک فاصلے پر مبنی ہوتے ہیں۔ ای-منی نیسڈیک (NQ) یا مائیکرو (MNQ) جیسے انڈیکس فیوچرز میں ٹریڈرز کو کنٹینیوس بیک-ایڈجسٹڈ چارٹ (NQ1!) اور فعال فرنٹ منتھ کنٹریکٹ (مثلاً NQH یا NQZ) میں واضح فرق ملتا ہے۔',
  'Because roll adjustments and overnight liquidity pricing shift continuous prices relative to the live contract, a clean Suspension Block on a continuous chart may disappear on the delivery contract—or vice versa. Never execute live orders using uncalibrated continuous-chart coordinates. Use the futures basis calibration tool below to convert continuous Suspension levels accurately onto your active trading contract.':
    'چونکہ رول ایڈجسٹمنٹ اور قیمتوں کا فرق کنٹینیوس چارٹ کی قیمتوں کو لائیو کنٹریکٹ سے بدل دیتا ہے، ایک صاف سسپنشن بلاک کنٹینیوس پر نظر آ کر اصل ڈیلیوری کنٹریکٹ پر غائب ہو سکتا ہے۔ کبھی بھی غیر ہم آہنگ کنٹینیوس قیمتوں پر لائیو آرڈر نہ لگائیں؛ نیچے دیے گئے کیلکولیٹر سے فرق کی تصحیح کریں۔',

  // Section 14 prose
  'Not every dual body-gap or nested IFVG merits equal confidence. Toggle the six structural filters below—dual body separation, Breaker origin sweep, closing IFVG validation, opposing FVG overlap, matched contract feed, and session Killzone alignment—to see when context supports study versus standing aside.':
    'ہر ڈبل باڈی گیپ یا نیسٹڈ IFVG یکساں اعتماد کا مستحق نہیں ہوتا۔ ذیل میں دیے گئے چھ ساختی فلٹرز آزمائیں تاکہ جان سکیں کہ کب شواہد مطالعے کی حمایت کرتے ہیں اور کب کنارہ کش رہنا بہتر ہے۔',

  // Section 15 prose & table
  'Institutional-grade chart studies rarely use a 1-minute Suspension Block in isolation against a higher-timeframe freight train. Instead, Suspension Blocks act powerfully as Higher-Timeframe (1H, 4H, Daily) directional shelves, while a nested Breaker + Reaper FVG on the 5M or 1M chart supplies the precise lower-timeframe entry trigger when price arrives inside the HTF Suspension core.':
    'سنجیدہ چارٹ مطالعے شاذ و نادر ہی بڑے ٹائم فریم کی تیز لہر کے خلاف تنہا 1 منٹ کے سسپنشن بلاک پر انحصار کرتے ہیں۔ اس کے برعکس 1H، 4H یا ڈیلی سسپنشن بلاکس مضبوط سمت کی سطح کے طور پر کام کرتے ہیں جبکہ قیمت کے وہاں پہنچنے پر 5M یا 1M پر بریکر + ریپر FVG باریک انٹری ٹرگر فراہم کرتا ہے۔',
  'Trading Style': 'ٹریڈنگ انداز',
  'Higher-TF Context': 'بڑے ٹائم فریم کا سیاق',
  'Active Delivery Shelf': 'فعال ڈیلیوری سطح',
  'LTF Entry Trigger': 'چھوٹے ٹائم فریم کا ٹرگر',
  'Structural Invalidation': 'ساختی باطل ہونے کی حد',
  'Intraday Scalping': 'انٹراڈے اسکیلپنگ',
  '1H / 15M Draw on Liquidity': '1H / 15M لیکویڈیٹی ہدف',
  '15M or 5M Suspension Core': '15M یا 5M سسپنشن کور',
  '1M Breaker + Reaper IFVG': '1M بریکر + ریپر IFVG',
  'Close beyond 5M Suspension outer VI': '5M سسپنشن کے بیرونی VI سے باہر کلوز',
  'Session Day Trading': 'سیشن ڈے ٹریڈنگ',
  '4H / Daily Dealing Range': '4H / ڈیلی ڈیلنگ رینج',
  '15M Suspension or Breaker': '15M سسپنشن یا بریکر',
  '5M Nested Reaper FVG': '5M نیسٹڈ ریپر FVG',
  'Close beyond 15M envelope edge': '15M انویلوپ کے کنارے سے باہر کلوز',
  'Multi-Day Swing': 'ملٹی ڈے سوئنگ',
  'Weekly / Daily Narrative': 'ہفتہ وار / روزانہ تناظر',
  'Daily / 4H Suspension Block': 'ڈیلی / 4H سسپنشن بلاک',
  '1H Breaker + Nested IFVG': '1H بریکر + نیسٹڈ IFVG',
  'Daily close outside VI-1 boundary': 'VI-1 حد سے باہر ڈیلی کلوز',

  // Section 16 prose & list
  'Body-to-body gaps formed during illiquid Asian lunch hours or pre-holiday rollovers often reflect thin quote spacing rather than high-participation displacement. Anchor all intraday Suspension Block and Reaper FVG studies to standardized America/New_York clock windows (accounting for U.S. EST/EDT Daylight Saving transitions per NIST calendars).':
    'کم لیکویڈیٹی والے ایشین لنچ اوقات یا تعطیلات سے پہلے بننے والے باڈی گیپس اکثر کم کوٹس کی وجہ سے ہوتے ہیں، مضبوط حرکت کی وجہ سے نہیں۔ تمام انٹراڈے مطالعے NIST کیلنڈر کے مطابق مستند America/New_York اوقات سے جوڑیں۔',
  'London Open Window (02:00–05:00 NY): Useful for observing EUR/USD and GBP/USD early Breaker-to-Reaper sequences after Asian range sweeps.':
    'لندن اوپن ونڈو (02:00–05:00 NY): ایشین رینج کے سویپ کے بعد EUR/USD اور GBP/USD میں ابتدائی بریکر تا ریپر ترتیب دیکھنے کے لیے موزوں۔',
  'New York Equities Pre-Market & Open (08:30–11:00 NY): Highest futures index participation around 08:30 macro releases and the 09:30 NYSE cash equity open—prime window for clean Suspension Blocks.':
    'نیویارک پری مارکیٹ اور اوپن (08:30–11:00 NY): 08:30 معاشی خبروں اور 09:30 NYSE اوپن کے گرد انڈیکس فیوچرز میں سب سے زیادہ شرکت—صاف سسپنشن بلاکس کا اہم وقت۔',
  'New York Midday Lunch (12:00–13:30 NY): Frequently prints overlapping body gaps inside tight chop; avoid treating isolated lunch micro-gaps as primary anchors.':
    'نیویارک دوپہر لنچ (12:00–13:30 NY): تنگ رینج میں بار بار الجھے ہوئے باڈی گیپس بناتا ہے؛ ان معمولی خلاؤں کو بنیادی حوالہ نہ بنائیں۔',
  'New York PM Session (13:30–16:00 NY): Often yields secondary Breaker + Reaper continuations toward unresolved Daily High/Low liquidity.':
    'نیویارک دوپہر کے بعد سیشن (13:30–16:00 NY): اکثر باقی ماندہ یومیہ ہائی یا لو کی طرف ثانوی بریکر + ریپر تسلسل فراہم کرتا ہے۔',

  // Section 17 prose & list
  'All prices below are illustrative synthetic teaching figures on an active MNQ/NQ delivery contract, not historical trades or live quotes. Suppose 1H bias targets an unresolved prior-day high (BSL) at 20,520.00 during the 09:30–10:30 America/New_York window.':
    'نیچے دی گئی تمام قیمتیں فعال MNQ/NQ کنٹریکٹ پر وضاحتی مصنوعی تعلیمی اعداد ہیں، حقیقی ٹریڈز یا لائیو کوٹس نہیں۔ فرض کریں 09:30–10:30 نیویارک وقت میں 1H رخ پچھلے دن کے باقی ماندہ ہائی (BSL) 20,520.00 کی جانب ہے۔',
  'Sweep & HTF Suspension (09:35 NY): After dipping below a 15M internal sell-side low, price rallies across three 15M candles: C1 closes at 20,416.00; C2 opens at 20,420.00 and closes at 20,430.00; C3 opens at 20,435.00 and closes at 20,456.00—creating Lower VI (20,416–20,420) and Upper VI (20,430–20,435).':
    'سویپ اور HTF سسپنشن (09:35 NY): 15M کے اندرونی لو سے نیچے ڈپ کے بعد قیمت تین 15M کینڈلز میں اٹھتی ہے: C1 کا کلوز 20,416.00؛ C2 کا اوپن 20,420.00 اور کلوز 20,430.00؛ C3 کا اوپن 20,435.00 اور کلوز 20,456.00—جس سے نچلا VI (20,416–20,420) اور بالائی VI (20,430–20,435) بنتا ہے۔',
  'Pullback Entry Wait (09:50 NY): Instead of chasing the top at 20,456, mark the 15M Suspension Core (20,420–20,430) and wait for price to revisit Upper VI / Core.':
    'واپسی کا انتظار (09:50 NY): 20,456 کے اوپر پیچھا کرنے کے بجائے 15M سسپنشن کور (20,420–20,430) نشان زد کریں اور بالائی VI یا کور پر واپسی کا انتظار کریں۔',
  'LTF 1M Reaper Confirmation (09:58 NY): Inside the 15M Suspension Core, a minor 1M drop forms a small bearish FVG (20,426–20,429). Price sweeps 20,421, then closes bullishly through 20,429—inverting it into a Bullish IFVG—while leaving an overlapping Bullish FVG (20,424–20,428). The nested Reaper window is 20,426.00–20,428.00.':
    'LTF 1M ریپر تصدیق (09:58 NY): 15M سسپنشن کور کے اندر 1M پر ایک چھوٹا بیئرش FVG (20,426–20,429) بنتا ہے۔ قیمت 20,421 سویپ کر کے 20,429 کے اوپر بلش کلوز دیتی ہے اور ساتھ ہی اوورلیپ کرتا بلش FVG (20,424–20,428) چھوڑتی ہے—جس سے 20,426.00–20,428.00 کی نیسٹڈ ریپر ونڈو بنتی ہے۔',
  'Defined Invalidation: Place protective stop below the 15M Lower VI bottom (e.g., 20,414.50, 11.50 points = 46 MNQ ticks at $0.50/tick = $23.00 risk per micro contract), sizing position strictly within pre-set account rules.':
    'واضح باطل ہونے کی حد: حفاظتی اسٹاپ 15M نچلے VI کے نیچے (مثلاً 20,414.50 پر، 11.50 پوائنٹس = $0.50/ٹِک پر 46 MNQ ٹِکس = $23.00 فی مائیکرو کنٹریکٹ رسک) طے شدہ اکاؤنٹ اصولوں کے مطابق رکھیں۔',

  // Section 18 prose & list
  'Consider a synthetic EUR/USD London-to-NY setup where price sweeps an Asian High at 1.08850 (Buy-Side Liquidity), printing an initial Bullish FVG1 (1.08720–1.08790) right below the high.':
    'ایک مصنوعی EUR/USD لندن تا نیویارک مثال دیکھیں جہاں قیمت ایشین ہائی 1.08850 (BSL) سویپ کرتی ہے اور اس سے عین نیچے ابتدائی بلش FVG1 (1.08720–1.08790) بناتی ہے۔',
  'Rejection & Breaker Flip: Following the sweep at 1.08850, aggressive selling breaks downward and closes a 5M candle at 1.08660—cleanly below Bullish FVG1 (1.08720). FVG1 is now validated as a Bearish Inverse FVG.':
    'مسترد ہونے اور بریکر تبدیلی: 1.08850 سویپ کے بعد تیز فروخت 5M کینڈل کو 1.08660 پر—بلش FVG1 (1.08720) کے نیچے—بند کر کے FVG1 کو بیئرش اِنورس FVG میں بدل دیتی ہے۔',
  'Nested Bearish SIBI Formation: That same breakdown leg prints a Bearish FVG2 between 1.08740 and 1.08820. Intersecting [1.08720, 1.08790] and [1.08740, 1.08820] isolates a tight 5-pip nested Reaper FVG zone: 1.08740–1.08790.':
    'نیسٹڈ بیئرش SIBI تشکیل: یہی نیچے آنے والی حرکت 1.08740 اور 1.08820 کے درمیان بیئرش FVG2 بناتی ہے۔ دونوں کے ملاپ سے 5 پِپ کا نیسٹڈ ریپر FVG زون 1.08740–1.08790 حاصل ہوتا ہے۔',
  'Breaker Alignment Check: Verify that the last up-close candle before the drop (the Bearish Breaker) sits over the exact same 1.08740–1.08800 shelf on the stated feed.':
    'بریکر ہم آہنگی کی جانچ: تصدیق کریں کہ گراوٹ سے پہلے کی آخری سبز کینڈل (بیئرش بریکر) اسی فیڈ پر 1.08740–1.08800 سطح کے ساتھ ہم آہنگ ہو۔',
  'Execution Discipline: Monitor whether retracement wicks pierce into 1.08740–1.08790 while 5M candle bodies remain capped below 1.08800; exit or stand down if a 5M body closes cleanly above 1.08820.':
    'نظم و ضبط: دیکھیں کہ آیا ریٹریسمنٹ کی وِکس 1.08740–1.08790 کو چھو کر 5M باڈیز کو 1.08800 کے نیچے رکھتی ہیں؛ اگر 5M باڈی 1.08820 کے اوپر بند ہو تو باہر نکل جائیں۔',

  // Section 19 prose & list
  "The reviewed passages never claim a universal 'midpoint stop' or 'fixed 1% risk rule' inside every Suspension Block. Because Candle 2's core sits between two distinct Volume Imbalances, placing a tight stop strictly at C2's open or midpoint exposes a trade to routine fills of the deeper VI-1 gap.":
    'زیر جائزہ تحریروں میں ہر سسپنشن بلاک کے لیے کوئی آفاقی "مڈپوائنٹ اسٹاپ" یا "لازمی 1% رسک اصول" بیان نہیں کیا گیا۔ چونکہ کینڈل 2 کا کور دو الگ والیوم امبیلنسز کے درمیان ہوتا ہے، C2 کے اوپن یا وسط پر تنگ اسٹاپ رکھنا گہرے VI-1 گیپ کی معمولی واپسی میں بھی ہٹ ہو سکتا ہے۔',
  'Suspension Envelope Stop Reference: Structural invalidation lies outside the outer edge of VI-1 (the initiation body gap), plus a measured spread/tick buffer on the traded delivery month.':
    'سسپنشن انویلوپ اسٹاپ حوالہ: ساختی باطل ہونے کی حد ابتدائی باڈی گیپ (VI-1) کے بیرونی کنارے سے باہر اسپریڈ اور ٹِک بفر کے ساتھ رکھی جاتی ہے۔',
  'Reaper Overlap Stop Reference: Structural invalidation sits beyond the swept Breaker extreme or outside the far boundary of the nested IFVG/FVG overlap—whichever aligns with the declared timeframe.':
    'ریپر اوورلیپ اسٹاپ حوالہ: ساختی باطل ہونے کی حد سویپ شدہ بریکر انتہا یا نیسٹڈ IFVG/FVG اوورلیپ کی بیرونی حد سے باہر مقرر کی جاتی ہے۔',
  'Order Type & Slippage Reality: Per SEC Investor.gov guidance, stop-market orders become market orders upon trigger and can experience slippage through thin body-gap corridors during volatile 08:30 or 09:30 releases; limit orders cap fill price but risk non-execution.':
    'آرڈر کی قسم اور سلپیج کی حقیقت: SEC رہنمائی کے مطابق اسٹاپ مارکیٹ آرڈر متحرک ہونے پر مارکیٹ آرڈر بن جاتے ہیں اور تیز خبروں میں پتلے گیپس پر سلپیج دے سکتے ہیں؛ لِمٹ آرڈر قیمت محدود رکھتا ہے مگر فِل نہ ہونے کا خطرہ رکھتا ہے۔',

  // Section 20 prose
  'Inspect the four illustrated stick-figure comic tabs below to spot and eliminate the four recurring errors traders make with Suspension Blocks and Reaper FVGs: mistaking a plain Order Block for a Suspension Block, calling every failed IFVG a Reaper, copying unadjusted continuous-chart coordinates onto front-month futures, and placing blind stops at the middle of a double-VI zone.':
    'سسپنشن بلاکس اور ریپر FVGs میں بار بار ہونے والی چار بڑی غلطیوں کو پہچاننے اور دور کرنے کے لیے نیچے دی گئی چار تصویری کامک ٹیبز دیکھیں۔',

  // Section 21 table
  'Market Environment': 'مارکیٹ کا ماحول',
  'Suspension Block Behavior': 'سسپنشن بلاک کا برتاؤ',
  'Reaper FVG Behavior': 'ریپر FVG کا برتاؤ',
  'Recommended Study Stance': 'تجویز کردہ مطالعاتی موقف',
  'Clean Trend Expansion (NY AM / London)': 'صاف ٹرینڈ پھیلاؤ (NY AM / لندن)',
  'Shallow taps into Upper VI or C2 Core often resume cleanly':
    'بالائی VI یا C2 کور کی ہلکی چھو اکثر صاف تسلسل دیتی ہے',
  'Breaker + nested IFVG aligns with HTF draw':
    'بریکر + نیسٹڈ IFVG بڑے ٹائم فریم کے ہدف سے ہم آہنگ ہوتا ہے',
  'Priority focus window with predefined invalidation':
    'پہلے سے طے شدہ باطل ہونے کی حد کے ساتھ ترجیحی مطالعاتی وقت',
  'Pre-CPI / FOMC Compression': 'CPI / FOMC سے پہلے سکیڑ',
  'Small drifting body gaps lack genuine displacement':
    'چھوٹے سرکتے باڈی گیپس میں حقیقی رفتار نہیں ہوتی',
  'Repeated overlapping inversions whip-saw both sides':
    'بار بار الٹنے والے گیپس دونوں طرف اسٹاپس کاٹتے ہیں',
  'Stand aside; avoid labeling thin drift as Suspension':
    'الگ رہیں؛ کمزور حرکت کو سسپنشن بلاک نہ کہیں',
  'Immediate Shock-Spike News Candle': 'خبر کے وقت اچانک بڑی اسپائیک کینڈل',
  'Spread widening leaves giant illiquid air pockets':
    'اسپریڈ کھلنے سے بڑے غیر لیکویڈ خلا بنتے ہیں',
  'Wick spikes sweep stops far past structural bounds':
    'لمبی وِکس ساختی حدود سے دور اسٹاپس نکال دیتی ہیں',
  'Wait for post-release settling or skip session':
    'خبر کے بعد استحکام کا انتظار کریں یا سیشن چھوڑ دیں',
  'Contract Rollover Week': 'کنٹریکٹ رول اوور ہفتہ',
  'Continuous vs. front-month candle bodies diverge':
    'کنٹینیوس اور فرنٹ منتھ کی باڈیز میں فرق آ جاتا ہے',
  'Breaker and IFVG prices shift across feeds':
    'مختلف فیڈز میں بریکر اور IFVG کی قیمتیں ہل جاتی ہیں',
  'Audit active delivery month exclusively':
    'صرف فعال ڈیلیوری مہینے کا چارٹ استعمال کریں',

  // Section 22 prose
  'Before logging a Suspension Block or Reaper FVG case study in your replay journal, confirm all six verification gates below:':
    'اپنے ری پلے جرنل میں سسپنشن بلاک یا ریپر FVG کا کیس درج کرنے سے پہلے نیچے دی گئی تمام چھ تصدیقی شرائط مکمل کریں:',

  // Section 23 glossary table
  'Term': 'اصطلاح',
  'Exact Definition & Analytical Scope': 'درست تعریف اور تجزیاتی دائرہ کار',
  'A central candle whose open-to-close body is completely separated from both the prior candle\'s body and the next candle\'s body, creating dual Volume Imbalances while wicks touch or overlap.':
    'ایک درمیانی کینڈل جس کی اوپن-ٹو-کلوز باڈی پچھلی اور اگلی دونوں کینڈلز کی باڈیز سے مکمل الگ ہو، جس سے دو طرفہ والیوم امبیلنس بنتے ہیں چاہے وِکس آپس میں ملیں۔',
  'Reaper FVG (Reaper IFVG)': 'ریپر FVG (ریپر IFVG)',
  'A documented Breaker-context pattern combining a body-close validated Inverse FVG (IFVG) nested directly inside an overlapping opposing Fair Value Gap.':
    'بریکر کے سیاق میں ایک دستاویزی پیٹرن جو باڈی کلوز سے تصدیق شدہ اِنورس FVG کو مخالف اوورلیپ کرتے فیئر ویلیو گیپ کے ساتھ جوڑتا ہے۔',
  'Volume Imbalance (VI)': 'والیوم امبیلنس (VI)',
  'An adjacent two-candle separation between one candle\'s Close/Open body boundary and the next candle\'s Open/Close boundary while wicks overlap.':
    'دو قریبی کینڈلز میں ایک کینڈل کے کلوز/اوپن اور اگلی کے اوپن/کلوز کے درمیان فاصلہ جبکہ وِکس اوورلیپ کر رہی ہوں۔',
  'Lower Volume Imbalance (VI-1)': 'نچلا والیوم امبیلنس (VI-1)',
  'In a bullish Suspension Block, the body gap sitting beneath Candle 2 between C1 Body High and C2 Body Low.':
    'بلش سسپنشن بلاک میں کینڈل 2 کے نیچے C1 باڈی ہائی اور C2 باڈی لو کے درمیان باڈی گیپ۔',
  'Upper Volume Imbalance (VI-2)': 'بالائی والیوم امبیلنس (VI-2)',
  'In a bullish Suspension Block, the body gap sitting above Candle 2 between C2 Body High and C3 Body Low.':
    'بلش سسپنشن بلاک میں کینڈل 2 کے اوپر C2 باڈی ہائی اور C3 باڈی لو کے درمیان باڈی گیپ۔',
  'Core Suspended Body': 'معلق مرکزی باڈی',
  'The isolated Open-to-Close body of Candle 2 positioned strictly between the Lower and Upper Volume Imbalances.':
    'کینڈل 2 کی الگ تھلگ اوپن-ٹو-کلوز باڈی جو نچلے اور بالائی والیوم امبیلنس کے عین درمیان واقع ہو۔',
  'Total Suspension Envelope': 'مکمل سسپنشن انویلوپ',
  'The full vertical span from the far edge of VI-1 through the Core Body to the far edge of VI-2.':
    'VI-1 کے بیرونی کنارے سے مرکزی باڈی کے ذریعے VI-2 کے بیرونی کنارے تک کا پورا عمودی زون۔',
  'Inverse Fair Value Gap (IFVG)': 'اِنورس فیئر ویلیو گیپ (IFVG)',
  'A previously established Fair Value Gap that price has closed decisively through, reversing its analytical role from support to resistance or vice versa.':
    'پہلے سے موجود ایسا فیئر ویلیو گیپ جس کے آر پار قیمت کلوز ہو کر اس کا تجزیاتی کردار سپورٹ سے مزاحمت یا برعکس بدل دے۔',
  'Nested Two-Gap Overlap': 'دو گیپس کا نیسٹڈ اوورلیپ',
  'The price interval where an inverted FVG and a newly printed opposing FVG share overlapping price coordinates.':
    'وہ قیمتی زون جہاں ایک الٹا ہوا FVG اور ایک نیا مخالف FVG آپس میں مشترک قیمتیں رکھتے ہوں۔',
  'Breaker Block': 'بریکر بلاک',
  'An Order Block that failed following a liquidity sweep and Market Structure Shift, converting trapped momentum into a directional barrier.':
    'لیکویڈیٹی سویپ اور مارکیٹ اسٹرکچر شفٹ کے بعد ناکام ہونے والا آرڈر بلاک جو سمت کی رکاوٹ بن جاتا ہے۔',
  'Classic Outer-Wick FVG': 'کلاسک بیرونی وِک FVG',
  'A three-candle price gap measured between Candle 1\'s High/Low wick extreme and Candle 3\'s Low/High wick extreme without overlap.':
    'تین کینڈلز کا ایسا گیپ جو بغیر اوورلیپ کے کینڈل 1 اور کینڈل 3 کی بیرونی وِکس کے درمیان ناپا جاتا ہے۔',
  'Order Block (OB)': 'آرڈر بلاک (OB)',
  'The final opposing-color candle (or consecutive run) preceding an impulsive structural break, distinct from body-separated Suspension Blocks.':
    'تیز اسٹرکچرل بریک سے پہلے آخری مخالف رنگ کی کینڈل، جو باڈی-گیپ سسپنشن بلاکس سے مختلف ہے۔',
  'Propulsion Block': 'پروپلشن بلاک',
  'A secondary opposing candle that dips into the 50% mean threshold of a prior Order Block before launching trend continuation.':
    'دوسری مخالف کینڈل جو پچھلے آرڈر بلاک کے 50% وسط کو چھو کر تسلسل شروع کرے۔',
  'An Inverse FVG that fails to hold on retest and closes back in the original direction; study as a failed IFVG rather than assuming a Reaper label.':
    'ایسا اِنورس FVG جو ری ٹیسٹ پر برقرار نہ رہ سکے اور واپس پرانی سمت میں کلوز ہو جائے؛ اسے خودکار ریپر نہ سمجھیں۔',
  'Continuous Futures Chart': 'کنٹینیوس فیوچرز چارٹ',
  'A stitched multi-contract data series (such as NQ1!) that adjusts historical prices across quarterly expirations and can differ from live delivery candles.':
    'سہ ماہی ایکسپائری کے حساب سے جوڑا گیا تاریخی چارٹ (جیسے NQ1!) جو لائیو ڈیلیوری کینڈلز سے مختلف قیمت دکھا سکتا ہے۔',
  'Front-Month Delivery Contract': 'فرنٹ منتھ ڈیلیوری کنٹریکٹ',
  'The currently active quarterly futures contract (e.g., MNQ/NQ delivery month) whose actual bid/ask executions govern real order fills.':
    'موجودہ فعال سہ ماہی فیوچرز کنٹریکٹ جس کے حقیقی بڈ/آسک پر اصل آرڈر فِل ہوتے ہیں۔',
  'Basis / Roll Offset': 'بیسز / رول فرق',
  'The numerical price difference between a continuous back-adjusted chart and the live front-month futures contract.':
    'کنٹینیوس ایڈجسٹڈ چارٹ اور لائیو فرنٹ منتھ کنٹریکٹ کے درمیان عددی قیمت کا فرق۔',
  'First-Utilization Reference': 'پہلی بار استعمال کا حوالہ',
  'The initial opposing FVG or Suspension gap encountered on the first counter-move retracement after displacement.':
    'تیز حرکت کے بعد پہلی واپسی پر سامنے آنے والا ابتدائی مخالف FVG یا سسپنشن گیپ۔',
  'Wick Excursion Tolerance': 'وِک کی حرکت کی گنجائش',
  'Allowing temporary wick probes through a gap edge while requiring candle bodies to close inside the valid structural side.':
    'گیپ کے کنارے کے آر پار عارضی وِک کی اجازت جبکہ باڈی کا درست سمت میں کلوز لازمی ہو۔',
  'Mean Threshold (50% Core)': 'مِین تھریش ہولڈ (50% کور)',
  'The arithmetic midpoint of either Candle 2\'s suspended body or the full Suspension Envelope.':
    'کینڈل 2 کی معلق باڈی یا پورے سسپنشن انویلوپ کا حسابی وسطی نقطہ۔',
  'Displacement Filter': 'ڈسپلیسمنٹ فلٹر',
  'An explicit measure comparing candle body expansion against prior bars to distinguish high-conviction jumps from illiquid noise.':
    'پچھلی کینڈلز کے مقابلے میں کینڈل باڈی کے پھیلاؤ کو ناپنے کا واضح پیمانہ۔',
  'Liquidity Sweep Context': 'لیکویڈیٹی سویپ کا سیاق',
  'Price briefly trading beyond an identified Swing High or Swing Low prior to reversing through an FVG to create a Breaker and potential Reaper.':
    'FVG کے آر پار مڑ کر بریکر اور ممکنہ ریپر بنانے سے پہلے طے شدہ سوئنگ ہائی یا لو سے آگے عارضی حرکت۔',
  'Tick Increment & Value': 'ٹِک کا درجہ اور مالیت',
  'The minimum price step of a futures contract (e.g., 0.25 points = $0.50 on MNQ) used to convert structural distance into dollar risk.':
    'فیوچرز کنٹریکٹ کی کم از کم قیمت کی اکائی (مثلاً MNQ پر 0.25 پوائنٹ = $0.50)۔',
  'The pre-committed candle close beyond the opposite outer boundary that disproves the setup hypothesis and ends further hold rationale.':
    'مخالف بیرونی حد سے باہر پہلے سے طے شدہ کینڈل کلوز جو سیٹ اپ کے مفروضے کو باطل کر دے۔',

  // Section 24 intro + 6 exact baseline paragraphs (matched with existing Urdu runtime!)
  'The audited chapter notes below are preserved alongside independent regulatory and exchange references so learners can compare source-specific geometry against venue order mechanics and futures contract specifications.':
    'ذیل میں اس باب کے مصدقہ مطالعاتی نوٹس آزاد ریگولیٹری اور ایکسچینج حوالہ جات کے ساتھ محفوظ ہیں تاکہ طلبہ ماخذی ساخت کا حقیقی آرڈر میکانکس اور فیوچرز کنٹریکٹ قواعد سے موازنہ کر سکیں۔',
  'In the reviewed April 2026 explanation, ICT examines separations between adjacent candle bodies while their wicks touch or overlap. These are volume imbalances in his terminology. Mark the actual close/open prices around the selected candle; an isolated counter-trend pause alone is not the definition illustrated here.':
    'اپریل 2026 کی زیر جائزہ وضاحت میں ICT متصل کینڈل باڈیز کے درمیان فاصلوں کا جائزہ لیتے ہیں جبکہ ان کی وِکس آپس میں چھوتی یا اوورلیپ کرتی ہیں۔ ان کی اصطلاح میں یہ والیوم امبیلنس ہیں۔ منتخب کینڈل کے گرد اصل کلوز/اوپن قیمتیں نشان زد کریں؛ محض ایک اکیلی کاؤنٹر ٹرینڈ وقفی کینڈل یہاں دکھائی گئی تعریف نہیں ہے۔',
  'Body-price separation is observable. Concluding that an institution refuelled a trend, that no deep retracement can occur, or that the first touch is safe requires additional evidence. The reviewed passage does not establish a universal first-touch entry, one-percent risk rule or midpoint stop. Keep the chosen invalidation and the contract’s tick value explicit.':
    'باڈیز کی قیمتوں کا فرق مشاہدہ کیا جا سکتا ہے۔ یہ نتیجہ کہ ادارے نے رجحان کو دوبارہ طاقت دی، گہری واپسی نہیں ہو سکتی یا پہلی چھو محفوظ ہے، مزید ثبوت چاہتا ہے۔ زیر جائزہ حصہ ہر صورت پہلی چھو کی انٹری، ایک فیصد رسک یا وسط پر اسٹاپ ثابت نہیں کرتا۔ منتخب غلط ہونے کی شرط اور کنٹریکٹ کی ٹِک ویلیو واضح رکھیں۔',
  'The source compares the nearby/front-month futures contract with a continuous chart. Their candle shapes and absolute prices differ. ICT prefers a candidate agreeing with a selected breaker reference in this example and discusses comparing other candidate levels. Record the symbol, delivery month, adjustment setting and timeframe. Do not transplant a continuous-chart price directly into a different contract.':
    'ماخذ قریبی یا فرنٹ منتھ فیوچرز کنٹریکٹ اور کنٹینیوس چارٹ کا موازنہ کرتا ہے۔ ان کی کینڈلز اور اصل قیمتیں مختلف ہیں۔ اس مثال میں ICT منتخب بریکر حوالے سے موافق امیدوار کو ترجیح دیتے اور دوسری ممکنہ سطحوں کے موازنے پر گفتگو کرتے ہیں۔ سمبل، ڈیلیوری مہینہ، ایڈجسٹمنٹ ترتیب اور ٹائم فریم لکھیں۔ کنٹینیوس چارٹ کی قیمت براہ راست دوسرے کنٹریکٹ پر لاگو نہ کریں۔',
  'In the 9 June 2026 review, ICT explicitly describes a Reaper variant with two nested gaps in a breaker context. In the bearish example, a previously bullish gap is validated as an inversion after a close below it, while a bearish FVG supplies a first-utilization reference. The lesson examines their overlap, wick excursions and body placement together; it does not define every failed inversion as a Reaper.':
    '9 جون 2026 کے جائزے میں ICT واضح طور پر بریکر کے سیاق میں دو ایک دوسرے میں شامل گیپس والی ریپر کی ایک صورت بیان کرتے ہیں۔ بیئرش مثال میں پہلے بلش گیپ کے نیچے کلوز اسے اِنورژن کے طور پر جانچتا ہے، جبکہ بیئرش FVG پہلی بار استعمال کا حوالہ دیتا ہے۔ سبق ان کے اوورلیپ، وِکس کی حرکت اور باڈیز کی جگہ ساتھ دیکھتا ہے؛ ہر ناکام اِنورژن کو ریپر نہیں کہتا۔',
  'An official June 2026 execution is titled Reaper FVG. Its reviewed passages show trade management, but they do not authenticate the previous definition of Reaper as every inversion-of-inversion, a mandatory 09:50 trap or an immediate instruction to reverse position. A source title alone cannot supply those rules.':
    'جون 2026 کی ایک اصل عمل درآمد مثال کا عنوان ریپر FVG ہے۔ زیر جائزہ حصے ٹریڈ مینجمنٹ دکھاتے ہیں، مگر ریپر کی پچھلی تعریف یعنی ہر اِنورژن کا دوبارہ اِنورژن، لازمی 09:50 ٹریپ یا فوراً پوزیشن الٹنے کی ہدایت ثابت نہیں کرتے۔ صرف ماخذ کا عنوان یہ اصول فراہم نہیں کر سکتا۔',
  'Study a failed IFVG as a failed IFVG unless the precise named variation is supported by an original explanation. Save the initial gap boundaries, the break criterion, the retest and the later failure separately. Neither the price sequence nor its label identifies every participant or proves that all retail stops were harvested.':
    'ناکام IFVG کو ناکام IFVG ہی سمجھیں، جب تک مخصوص نام والی صورت کی اصل وضاحت موجود نہ ہو۔ ابتدائی گیپ کی حدود، بریک کا اصول، ری ٹیسٹ اور بعد کی ناکامی الگ محفوظ کریں۔ قیمت کی ترتیب یا نام ہر شریک کی شناخت یا تمام ریٹیل اسٹاپس ختم ہونا ثابت نہیں کرتا۔',

  // Section 25 intro + 12 FAQs
  'Review these twelve structured answers covering geometry, differences from Order Blocks and FVGs, futures contract discrepancies, and strict risk rules.':
    'ساخت، آرڈر بلاکس و FVGs سے فرق، فیوچرز کنٹریکٹس کے فرق اور سخت رسک اصولوں پر مشتمل یہ بارہ منظم جوابات پڑھیں۔',
  'What is a Suspension Block in simple terms?': 'سادہ الفاظ میں سسپنشن بلاک کیا ہے؟',
  "A Suspension Block is a three-candle formation where the middle candle's open-to-close body hangs completely separated from both the candle before it and the candle after it—leaving two adjacent body-to-body Volume Imbalances even when their wicks overlap.":
    'سسپنشن بلاک تین کینڈلز کی ایسی تشکیل ہے جہاں درمیانی کینڈل کی اوپن-ٹو-کلوز باڈی اپنے سے پہلے اور بعد والی دونوں کینڈلز کی باڈیز سے مکمل الگ معلق رہتی ہے—جس سے دو متصل باڈی-ٹو-باڈی والیوم امبیلنس بنتے ہیں چاہے وِکس اوورلیپ کر رہی ہوں۔',
  'How is a Suspension Block different from a Classic Fair Value Gap (FVG)?':
    'سسپنشن بلاک کلاسک فیئر ویلیو گیپ (FVG) سے کیسے مختلف ہے؟',
  "A Classic Fair Value Gap requires zero overlap between Candle 1's outer wick and Candle 3's outer wick. A Suspension Block focuses strictly on Open and Close body separations around Candle 2, so it remains valid even when wicks touch or overlap completely.":
    'کلاسک فیئر ویلیو گیپ کے لیے کینڈل 1 اور کینڈل 3 کی بیرونی وِکس میں صفر اوورلیپ ضروری ہے۔ سسپنشن بلاک صرف کینڈل 2 کے گرد اوپن اور کلوز باڈی کے فاصلے دیکھتا ہے، اس لیے وِکس ملنے پر بھی یہ درست رہتا ہے۔',
  'What makes a Suspension Block different from an Order Block or Propulsion Block?':
    'سسپنشن بلاک آرڈر بلاک یا پروپلشن بلاک سے کیسے مختلف ہے؟',
  "Order Blocks require an opposing-color candle before displacement, and Propulsion Blocks dip into an existing Order Block's mean threshold. A Suspension Block ignores candle color and requires dual body-to-body Volume Imbalances immediately above and below Candle 2.":
    'آرڈر بلاک کے لیے تیز حرکت سے پہلے مخالف رنگ کی کینڈل ضروری ہے، اور پروپلشن بلاک پہلے آرڈر بلاک کے وسط میں اترتا ہے۔ سسپنشن بلاک رنگ نظر انداز کر کے کینڈل 2 کے اوپر اور نیچے دو باڈی-ٹو-باڈی والیوم امبیلنسز مانگتا ہے۔',
  'Can a Suspension Block form if all three candles are the same color?':
    'کیا تینوں کینڈلز کا رنگ ایک ہونے پر بھی سسپنشن بلاک بن سکتا ہے؟',
  "Yes. Three consecutive bullish or bearish candles form a valid Suspension Block whenever Candle 2 opens separated from Candle 1's close and Candle 3 opens separated from Candle 2's close, leaving two Volume Imbalances.":
    'جی ہاں۔ جب کینڈل 2 کا اوپن کینڈل 1 کے کلوز سے الگ ہو اور کینڈل 3 کا اوپن کینڈل 2 کے کلوز سے الگ ہو تو ایک ہی رنگ کی تین مسلسل کینڈلز بھی سسپنشن بلاک بناتی ہیں۔',
  'What is a Reaper FVG (Reaper IFVG)?': 'ریپر FVG (ریپر IFVG) کیا ہے؟',
  'In the reviewed 9 June 2026 variant, a Reaper FVG is a Breaker-context structure where price closes decisively through an initial FVG to validate an Inverse FVG (IFVG), and that inverted gap overlaps directly with a newly formed opposing FVG on the breaking leg.':
    '9 جون 2026 کے زیر جائزہ ماڈل میں ریپر FVG بریکر کے سیاق کی ایسی ساخت ہے جہاں قیمت ابتدائی FVG کے آر پار کلوز ہو کر اِنورس FVG بناتی ہے اور وہ الٹا ہوا گیپ توڑنے والی حرکت کے نئے مخالف FVG سے براہ راست اوورلیپ کرتا ہے۔',
  'Is every failed Inverse FVG automatically a Reaper FVG?':
    'کیا ہر ناکام اِنورس FVG خودکار طور پر ریپر FVG ہوتا ہے؟',
  'No. Calling every failed IFVG or inversion-of-inversion a Reaper FVG conflates unverified online labels with sourced chart structure. If the nested two-gap Breaker overlap is absent, record the pattern simply as a failed IFVG.':
    'نہیں۔ ہر ناکام IFVG کو ریپر کہنا غیر مصدقہ آن لائن باتوں کو اصل چارٹ ساخت سے ملا دینا ہے۔ اگر دو گیپس کا نیسٹڈ بریکر اوورلیپ موجود نہ ہو تو اسے صرف ناکام IFVG درج کریں۔',
  'How does a Reaper FVG differ from a Balanced Price Range (BPR) or Unicorn?':
    'ریپر FVG بیلنسڈ پرائس رینج (BPR) یا یونیکارن سے کیسے مختلف ہے؟',
  'A BPR measures any opposing FVG overlap, and a Unicorn overlaps a Breaker with a single FVG. The sourced Reaper variant pairs a completed Breaker sweep with a validated IFVG that nests inside an opposing active FVG simultaneously.':
    'BPR کسی بھی مخالف FVG اوورلیپ کو ناپتا ہے اور یونیکارن بریکر کو ایک FVG سے جوڑتا ہے۔ ریپر صورت میں مکمل بریکر سویپ کے ساتھ ایک تصدیق شدہ IFVG اور مخالف فعال FVG بیک وقت اوورلیپ کرتے ہیں۔',
  'Why do continuous futures charts and front-month contracts show different Suspension Blocks?':
    'کنٹینیوس فیوچرز چارٹس اور فرنٹ منتھ کنٹریکٹس مختلف سسپنشن بلاکس کیوں دکھاتے ہیں؟',
  'Back-adjusted continuous charts (like NQ1!) shift historical prices across quarterly expirations, altering absolute body gaps and overlapping wicks compared with the live delivery month (such as NQZ). Always calibrate execution anchors directly on the contract you actually trade.':
    'بیک-ایڈجسٹڈ کنٹینیوس چارٹس (جیسے NQ1!) سہ ماہی ایکسپائری پر تاریخی قیمتیں بدل دیتے ہیں، جس سے لائیو ڈیلیوری کنٹریکٹ (مثلاً NQZ) کے مقابلے میں باڈی گیپس مختلف ہو جاتے ہیں۔ ہمیشہ اپنے اصل ٹریڈنگ کنٹریکٹ پر پیمائش کریں۔',
  'Does a Suspension Block guarantee that price will bounce on the first touch?':
    'کیا سسپنشن بلاک پہلی چھو پر قیمت کے پلٹنے کی ضمانت دیتا ہے؟',
  'No. Body-to-body separation is an observable chart pattern, never a guarantee of institutional resting orders or first-touch support. Price can easily trade through Upper VI, tap Lower VI, or invalidate the entire corridor.':
    'نہیں۔ باڈی-ٹو-باڈی فاصلہ صرف ایک قابل مشاہدہ چارٹ پیٹرن ہے، ادارہ جاتی آرڈرز یا پہلی چھو پر سپورٹ کی ضمانت نہیں۔ قیمت بالائی VI سے گزر کر نچلے VI تک آ سکتی ہے یا پورا زون توڑ سکتی ہے۔',
  'Where should a protective stop be placed on a Suspension Block or Reaper FVG?':
    'سسپنشن بلاک یا ریپر FVG پر حفاظتی اسٹاپ کہاں رکھا جائے؟',
  'Place structural invalidation beyond the outer edge of the initiation Volume Imbalance (VI-1) for a Suspension Block, or beyond the swept Breaker / far nested IFVG boundary for a Reaper setup, accounting for futures tick increments and potential stop-order slippage.':
    'سسپنشن بلاک کے لیے ابتدائی والیوم امبیلنس (VI-1) کے بیرونی کنارے سے باہر، یا ریپر کے لیے سویپ شدہ بریکر اور نیسٹڈ IFVG کی بیرونی حد سے باہر ٹِک فاصلے اور سلپیج کو مدنظر رکھتے ہوئے اسٹاپ رکھیں۔',
  'Which session times produce the most reliable Suspension Block and Reaper FVG studies?':
    'کون سے سیشن اوقات سسپنشن بلاک اور ریپر FVG کے سب سے واضح مطالعے دیتے ہیں؟',
  'Active London Open (02:00–05:00 NY) and New York AM/PM windows (08:30–11:00 and 13:30–16:00 NY) generate the cleanest displacement. Avoid treating thin Asian or NY Lunch micro-gaps as primary high-conviction anchors.':
    'لندن اوپن (02:00–05:00 NY) اور نیویارک AM/PM (08:30–11:00 اور 13:30–16:00 NY) صاف تیز حرکت پیدا کرتے ہیں۔ کم لیکویڈیٹی والے ایشین یا لنچ گیپس کو بنیادی حوالہ نہ بنائیں۔',
  'Can beginners practice identifying Suspension Blocks before risking live capital?':
    'کیا مبتدی حقیقی سرمایہ لگانے سے پہلے سسپنشن بلاکس پہچاننے کی مشق کر سکتے ہیں؟',
  'Yes. Beginners should disable future candle visibility during historical replay, verify both Close-to-Open inequalities numerically, cross-check continuous versus front-month charts, and log invalidations before considering demo or micro-contract sizing.':
    'جی ہاں۔ مبتدی تاریخی ری پلے میں اگلی کینڈلز چھپا کر دونوں کلوز/اوپن شرائط کا حساب لگائیں، کنٹینیوس اور فرنٹ منتھ چارٹس کا موازنہ کریں اور ڈیمو یا مائیکرو سائز سے پہلے باطل ہونے کے نتائج درج کریں۔',

  // Institutional Sources
  'Investor.gov (SEC) — Stop Order Mechanics & Slippage':
    'Investor.gov (SEC) — اسٹاپ آرڈر میکانکس اور سلپیج',
  'Explains why triggered stop-market orders convert into market orders and can slip across thin Volume Imbalance corridors during fast macro releases.':
    'وضاحت کرتا ہے کہ متحرک اسٹاپ مارکیٹ آرڈر کیوں مارکیٹ آرڈر بن جاتے ہیں اور تیز خبروں میں والیوم امبیلنس زونز میں سلپیج دے سکتے ہیں۔',
  'Investor.gov (SEC) — Limit vs. Market Order Execution':
    'Investor.gov (SEC) — لِمٹ بمقابلہ مارکیٹ آرڈر عمل درآمد',
  'Contrasts limit-order fill-price protection at Suspension or Reaper boundaries against non-execution risk when price turns shy of a level.':
    'سسپنشن یا ریپر حدود پر لِمٹ آرڈر کی قیمتی تحفظ اور فِل نہ ہونے کے خطرے کا موازنہ کرتا ہے۔',
  'CME Group — Micro E-mini Nasdaq-100 Contract Specs (MNQ)':
    'CME گروپ — مائیکرو ای-منی نیسڈیک 100 کنٹریکٹ قواعد (MNQ)',
  'Specifies MNQ 0.25-point minimum tick size ($0.50 per tick; $2.00 per index point) and quarterly delivery months needed when calibrating front-month vs. continuous feeds.':
    'MNQ کی 0.25 پوائنٹ کم از کم ٹِک ($0.50 فی ٹِک) اور فرنٹ منتھ بمقابلہ کنٹینیوس فیڈز ہم آہنگ کرنے کے لیے سہ ماہی ڈیلیوری مہینے واضح کرتا ہے۔',
  'CME Group — Order Book Priority & Liquidity Matching':
    'CME گروپ — آرڈر بک ترجیح اور لیکویڈیٹی میچنگ',
  'Clarifies why OHLC body gaps and FVG rectangles cannot disclose resting limit depth or prove institutional sponsorship.':
    'واضح کرتا ہے کہ OHLC باڈی گیپس اور FVG ڈبے آرڈر بک میں موجود لِمٹ آرڈرز کی گہرائی یا ادارہ جاتی سرپرستی ثابت نہیں کر سکتے۔',
  'NYSE — Core Trading Hours & Holiday Calendar':
    'NYSE — بنیادی تجارتی اوقات اور تعطیلات کیلنڈر',
  'Establishes official 09:30–16:00 ET regular U.S. equity hours used to anchor New York session Volume Imbalance studies.':
    'نیویارک سیشن والیوم امبیلنس مطالعوں کے لیے باقاعدہ 09:30–16:00 ET امریکی ایکویٹی اوقات متعین کرتا ہے۔',
  'NIST — U.S. Daylight Saving Time Transitions':
    'NIST — امریکی ڈے لائٹ سیونگ ٹائم تبدیلیاں',
  'Maintains accurate America/New_York EST/EDT session alignment across seasonal clock changes.':
    'موسمی گھڑی کی تبدیلیوں میں درست America/New_York EST/EDT سیشن اوقات برقرار رکھتا ہے۔',

  // Quizzes (exact 6)
  'Which geometry matches the reviewed suspension illustration?':
    'Reviewed suspension illustration کی geometry کون سی ہے؟',
  'Exact distinction between a Suspension Block and other three-candle formations.':
    'سسپنشن بلاک اور دیگر تین-کینڈل اشکال میں عین فرق۔',
  'Separated adjacent bodies with touching or overlapping wicks.':
    'متصل bodies میں فاصلہ، wicks کا touch یا overlap۔',
  'Any isolated counter-trend candle.':
    'کوئی بھی اکیلی کاؤنٹر ٹرینڈ کینڈل۔',
  'Every failed inversion FVG.':
    'ہر ناکام اِنورژن FVG۔',
  'Body-price separation differs from a standard three-candle outer-wick FVG because Open/Close bodies detach around Candle 2 even while wicks overlap.':
    'باڈی قیمتوں کا فرق عام تین-کینڈل بیرونی وِک FVG سے مختلف ہے کیونکہ وِکس کے ملاپ کے باوجود کینڈل 2 کے گرد اوپن/کلوز باڈیز الگ ہو جاتی ہیں۔',

  'If C1 closes at 20,416, C2 opens at 20,420 and closes at 20,430, and C3 opens at 20,435, what are the two Volume Imbalances?':
    'اگر C1 20,416 پر بند ہو، C2 20,420 پر کھل کر 20,430 پر بند ہو اور C3 20,435 پر کھلے تو دو والیوم امبیلنس کون سے ہوں گے؟',
  'Calculating dual body-to-body boundaries on synthetic NQ candles.':
    'مصنوعی NQ کینڈلز پر دوہری باڈی-ٹو-باڈی حدود کا حساب۔',
  'Lower VI spans 20,416–20,420 and Upper VI spans 20,430–20,435, suspending C2 body.':
    'نچلا VI 20,416–20,420 اور بالائی VI 20,430–20,435 پر پھیلا ہے، جو C2 باڈی کو معلق کرتا ہے۔',
  'Only one classic FVG exists at 20,420–20,435.':
    'صرف ایک کلاسک FVG 20,420–20,435 پر موجود ہے۔',
  'No imbalance exists because C2 is a bullish candle.':
    'کوئی امبیلنس موجود نہیں کیونکہ C2 بلش کینڈل ہے۔',
  'Candle 2 sits completely separated above C1 close (4-point VI-1) and below C3 open (5-point VI-2), suspending its 20,420–20,430 body.':
    'کینڈل 2 کی باڈی C1 کے کلوز سے 4 پوائنٹ اوپر (VI-1) اور C3 کے اوپن سے 5 پوائنٹ نیچے (VI-2) مکمل الگ ہو کر معلق ہے۔',

  'Does the reviewed 9 June 2026 variant define every failed Inverse FVG as a Reaper FVG?':
    'کیا 9 جون 2026 کی زیر جائزہ صورت ہر ناکام اِنورس FVG کو ریپر FVG قرار دیتی ہے؟',
  'Separating online folklore from the sourced two-gap Breaker overlap model.':
    'غیر مصدقہ آن لائن باتوں کو ماخذ شدہ دو-گیپ بریکر اوورلیپ ماڈل سے الگ رکھنا۔',
  'No; study an ordinary failed inversion as a failed IFVG unless the nested two-gap Breaker context is present.':
    'نہیں؛ عام ناکام اِنورژن کو ناکام IFVG سمجھیں جب تک دو گیپس کا نیسٹڈ بریکر سیاق موجود نہ ہو۔',
  'Yes; every failed IFVG is automatically a compulsory 09:50 Reaper trap.':
    'جی ہاں؛ ہر ناکام IFVG خودکار طور پر 09:50 کا لازمی ریپر ٹریپ ہے۔',
  'Yes; a chart label alone guarantees an immediate reversal.':
    'جی ہاں؛ صرف چارٹ کا نام فوراً الٹاؤ کی ضمانت دیتا ہے۔',
  'The documented Reaper FVG variant examines a validated IFVG nested directly with an opposing active FVG inside a Breaker leg.':
    'دستاویزی ریپر FVG ماڈل بریکر حرکت کے اندر تصدیق شدہ IFVG اور مخالف فعال FVG کے براہ راست اوورلیپ کا مطالعہ کرتا ہے۔',

  'Why must continuous futures coordinates (e.g., NQ1!) not be copied blindly onto an active delivery contract?':
    'کنٹینیوس فیوچرز کی قیمتیں (مثلاً NQ1!) بغیر تحقیق فعال ڈیلیوری کنٹریکٹ پر کیوں لاگو نہیں کرنی چاہئیں؟',
  'Contract feed parity across back-adjusted continuous and front-month futures.':
    'بیک-ایڈجسٹڈ کنٹینیوس اور فرنٹ منتھ فیوچرز فیڈز میں مطابقت۔',
  'Back-adjustments and roll basis shift candle shapes and absolute prices between the continuous chart and front-month executions.':
    'بیک-ایڈجسٹمنٹ اور رول فرق کنٹینیوس چارٹ اور فرنٹ منتھ عمل درآمد کے درمیان کینڈل کی شکل اور اصل قیمتیں بدل دیتے ہیں۔',
  'Continuous charts only update once per quarter after options expiration.':
    'کنٹینیوس چارٹس صرف سہ ماہی ایکسپائری کے بعد اپڈیٹ ہوتے ہیں۔',
  'Front-month futures automatically erase all Volume Imbalances.':
    'فرنٹ منتھ فیوچرز خودکار طور پر تمام والیوم امبیلنس مٹا دیتے ہیں۔',
  'Record symbol, delivery month, adjustment mode, and basis offset before transferring any gap level onto an execution chart.':
    'کسی بھی گیپ سطح کو عمل درآمد چارٹ پر منتقل کرنے سے پہلے سمبل، ڈیلیوری مہینہ، ایڈجسٹمنٹ اور بیسز فرق درج کریں۔',

  'In a Bearish Reaper setup, Bullish FVG1 sits at 1.08720–1.08790 and new Bearish FVG2 spans 1.08740–1.08820. What is the nested overlap?':
    'بیئرش ریپر سیٹ اپ میں بلش FVG1 1.08720–1.08790 اور نیا بیئرش FVG2 1.08740–1.08820 پر ہے؛ نیسٹڈ اوورلیپ کیا ہوگا؟',
  'Computing max(L1, L2) to min(H1, H2) for two nested Reaper gaps.':
    'دو نیسٹڈ ریپر گیپس کے لیے max(L1, L2) سے min(H1, H2) کا حساب۔',
  '1.08740 to 1.08790 (5-pip overlap inside the Breaker context).':
    '1.08740 سے 1.08790 تک (بریکر سیاق کے اندر 5 پِپ کا اوورلیپ)۔',
  '1.08720 to 1.08820 (the full combined union).':
    '1.08720 سے 1.08820 تک (مکمل مجموعی پھیلاؤ)۔',
  'There is no overlap because the two gaps point in opposite directions.':
    'کوئی اوورلیپ نہیں کیونکہ دونوں گیپس مخالف سمت میں ہیں۔',
  'The intersection runs from max(1.08720, 1.08740) = 1.08740 up to min(1.08790, 1.08820) = 1.08790.':
    'مشترکہ حصہ max(1.08720, 1.08740) = 1.08740 سے min(1.08790, 1.08820) = 1.08790 تک بنتا ہے۔',

  'Does a Suspension Block establish a universal 1% risk rule or guaranteed first-touch bounce?':
    'کیا سسپنشن بلاک کوئی آفاقی 1% رسک اصول یا پہلی چھو پر یقینی اچھال ثابت کرتا ہے؟',
  'Capital preservation, stop mechanics, and evidentiary limits.':
    'سرمایہ کا تحفظ، اسٹاپ میکانکس اور شواہد کی حدود۔',
  'No; body gaps are observable chart references requiring explicit closing invalidation, tick sizing, and slippage awareness.':
    'نہیں؛ باڈی گیپس قابل مشاہدہ چارٹ حوالے ہیں جن کے لیے کلوز باطل حد، ٹِک سائزنگ اور سلپیج کا ادراک ضروری ہے۔',
  'Yes; the upper Volume Imbalance edge guarantees zero drawdown on first touch.':
    'جی ہاں؛ بالائی والیوم امبیلنس کنارہ پہلی چھو پر صفر نقصان یقینی بناتا ہے۔',
  'Yes; midpoint stops inside Candle 2 are never swept during NY Open.':
    'جی ہاں؛ کینڈل 2 کے وسطی اسٹاپس نیویارک اوپن میں کبھی ہٹ نہیں ہوتے۔',
  'Price can retrace past Upper VI into Lower VI or close straight through the entire block; pre-set close invalidation and micro/mini tick risk are essential.':
    'قیمت بالائی VI سے نچلے VI تک واپس آ سکتی ہے یا پورا بلاک توڑ کر کلوز کر سکتی ہے؛ اس لیے پیشگی کلوز حد اور ٹِک رسک لازمی ہے۔',

  // 3D Scene & Visual Controls + Labels
  'Interactive 3D Suspension & Reaper Cinema (Motion Study)':
    'انٹرایکٹو 3D سسپنشن اور ریپر سنیما (موشن اسٹڈی)',
  'Select 3D Motion Study scenario': '3D موشن اسٹڈی منظر منتخب کریں',
  'Bearish Reaper IFVG + Breaker': 'بیئرش ریپر IFVG + بریکر',
  'Contract Drift & Invalidation': 'کنٹریکٹ فرق اور باطل ہونا',
  'VI-1 (20,416–20,420) · C2 Core (20,420–20,430) · VI-2 (20,430–20,435)':
    'VI-1 (20,416–20,420) · C2 کور (20,420–20,430) · VI-2 (20,430–20,435)',
  'VI-1 (20,501–20,506) · C2 Core (20,491–20,501) · VI-2 (20,486–20,491)':
    'VI-1 (20,501–20,506) · C2 کور (20,491–20,501) · VI-2 (20,486–20,491)',
  'IFVG1 (20,512–20,524) + Bearish FVG2 (20,514–20,526) -> Overlap 20,514–20,524':
    'IFVG1 (20,512–20,524) + بیئرش FVG2 (20,514–20,526) -> اوورلیپ 20,514–20,524',
  'Close below VI-1 bottom (20,415) invalidates continuous Suspension thesis':
    'VI-1 کے نچلے کنارے (20,415) سے نیچے کلوز کنٹینیوس سسپنشن مفروضہ باطل کر دیتا ہے',
  'Validated IFVG-1': 'تصدیق شدہ IFVG-1',
  'Initiation VI-1': 'ابتدائی VI-1',
  'Nested Bearish FVG-2': 'نیسٹڈ بیئرش FVG-2',
  'Upper / Second VI-2': 'بالائی / دوسرا VI-2',
  'Reaper Overlap Zone': 'ریپر اوورلیپ زون',
  'Suspended C2 Core': 'معلق C2 کور',
  'Pause': 'روکیں',
  'Play': 'چلائیں',
  'Previous candle': 'پچھلی کینڈل',
  'Next candle': 'اگلی کینڈل',
  'Reset': 'دوبارہ ترتیب',
  '3D Iso View': '3D آئیسو منظر',
  'Straight-On Ruler': 'سیدھا رولر منظر',
  'Bar': 'کینڈل',
  'Original synthetic study candles (Close:': 'اصلی مصنوعی مطالعاتی کینڈلز (کلوز:',
  ') — not live quotes.': ') — لائیو کوٹس نہیں۔',

  // Synthetic bars annotations
  'Candle 1 closes bullish at 20,416; upper wick reaches 20,422.':
    'کینڈل 1 20,416 پر بلش کلوز ہوتی ہے؛ بالائی وِک 20,422 تک جاتی ہے۔',
  'Candle 2 gaps open at 20,420 (4 pts above C1 close), lower wick 20,415 overlaps C1 wick.':
    'کینڈل 2 20,420 پر کھلتی ہے (C1 کلوز سے 4 پوائنٹ اوپر)، نچلی وِک 20,415 C1 وِک سے ملتی ہے۔',
  'Candle 3 gaps open at 20,435 (5 pts above C2 close); wicks overlap, suspending C2 body.':
    'کینڈل 3 20,435 پر کھلتی ہے (C2 کلوز سے 5 پوائنٹ اوپر)؛ وِکس اوورلیپ کرتی ہیں اور C2 باڈی معلق رہتی ہے۔',
  'Pullback begins downward toward Upper VI (20,430–20,435).':
    'واپسی بالائی VI (20,430–20,435) کی طرف نیچے شروع ہوتی ہے۔',
  'Price dips into Suspension Core (20,420–20,430) and tests Lower VI top.':
    'قیمت سسپنشن کور (20,420–20,430) میں اتر کر نچلے VI کے اوپر ٹیسٹ کرتی ہے۔',
  'Bullish expansion exits the Suspension Block after respecting body-gap boundaries.':
    'باڈی گیپ حدود کا احترام کرنے کے بعد بلش توسیع سسپنشن بلاک سے باہر نکلتی ہے۔',
  'Follow-through candle pushes toward upper buy-side objective at 20,476.':
    'تسلسل کی کینڈل 20,476 پر بالائی بائے سائیڈ ہدف کی طرف بڑھتی ہے۔',
  'Candle 1 closes bearish at 20,506 with lower wick dipping to 20,502.':
    'کینڈل 1 20,506 پر بیئرش کلوز ہوتی ہے اور نچلی وِک 20,502 تک جاتی ہے۔',
  'Candle 2 opens at 20,501 (5 pts below C1 close); upper wick 20,507 overlaps C1.':
    'کینڈل 2 20,501 پر کھلتی ہے (C1 کلوز سے 5 پوائنٹ نیچے)؛ بالائی وِک 20,507 C1 سے ملتی ہے۔',
  'Candle 3 opens at 20,486 (5 pts below C2 close); lower/upper wicks overlap, suspending C2.':
    'کینڈل 3 20,486 پر کھلتی ہے (C2 کلوز سے 5 پوائنٹ نیچے)؛ وِکس اوورلیپ ہو کر C2 کو معلق کرتی ہیں۔',
  'Counter-trend rally retests Lower VI pocket (20,486–20,491).':
    'واپسی کا اچھال نچلے VI زون (20,486–20,491) کو ری ٹیسٹ کرتا ہے۔',
  'Wick probes into Suspension Core midpoint (20,496) beneath Upper VI ceiling 20,506.':
    'وِک بالائی VI حد 20,506 کے نیچے سسپنشن کور کے وسط (20,496) تک جاتی ہے۔',
  'Bearish displacement rejects the Suspension shelf below C2 body.':
    'بیئرش ڈسپلیسمنٹ C2 باڈی کے نیچے سسپنشن سطح سے قیمت کو مسترد کرتی ہے۔',
  'Continuation sweeps prior low toward 20,442 objective.':
    'تسلسل پچھلا لو نکال کر 20,442 ہدف کی طرف بڑھتا ہے۔',
  'Up-close Leg 1 pushes above prior high, forming bullish FVG1 (20,512–20,524).':
    'اوپر کلوز لیگ 1 پچھلے ہائی کے اوپر بڑھ کر بلش FVG1 (20,512–20,524) بناتی ہے۔',
  'Impulse candle establishes wide bullish FVG1 interior.':
    'تیز کینڈل کشادہ بلش FVG1 کا اندرونی حصہ بناتی ہے۔',
  'Sweep candle tags BSL at 20,546 and fails back into FVG1 top (20,524).':
    'سویپ کینڈل 20,546 پر BSL چھو کر واپس FVG1 کے اوپر (20,524) گر جاتی ہے۔',
  'Closing break beneath bullish FVG1 (20,512) validates Bearish IFVG + Breaker.':
    'بلش FVG1 (20,512) کے نیچے کلوز بریک بیئرش IFVG اور بریکر کی تصدیق کرتا ہے۔',
  'Leg 2 displacement prints bearish FVG2 (20,514–20,526) overlapping inverted FVG1 (20,512–20,524).':
    'لیگ 2 ڈسپلیسمنٹ الٹے ہوئے FVG1 (20,512–20,524) پر اوورلیپ کرتا بیئرش FVG2 (20,514–20,526) بناتی ہے۔',
  'Retracement tags nested Reaper FVG overlap (20,514–20,524) without closing above 20,528.':
    'ریٹریسمنٹ 20,528 سے اوپر کلوز ہوئے بغیر نیسٹڈ ریپر FVG اوورلیپ (20,514–20,524) کو چھوتی ہے۔',
  'Reaper reaction drives downward out of the Breaker-nested overlap zone.':
    'ریپر ردعمل بریکر کے نیسٹڈ اوورلیپ زون سے قیمت کو نیچے دھکیلتا ہے۔',
  'Initial Candle 1 closes at 20,415.':
    'ابتدائی کینڈل 1 20,415 پر کلوز ہوتی ہے۔',
  'Candle 2 forms apparent Suspension Core (20,419–20,429) on continuous feed.':
    'کینڈل 2 کنٹینیوس فیڈ پر بظاہر سسپنشن کور (20,419–20,429) بناتی ہے۔',
  'Candle 3 closes higher at 20,450; continuous vs. front-month offset shifts real fill level.':
    'کینڈل 3 20,450 پر اوپر کلوز ہوتی ہے؛ کنٹینیوس اور فرنٹ منتھ کا فرق اصل فِل سطح بدل دیتا ہے۔',
  'First touch taps core without LTF confirmation.':
    'پہلی چھو بغیر LTF تصدیق کے کور کو چھوتی ہے۔',
  'Full body close below Lower VI (20,415) invalidates bullish Suspension thesis.':
    'نچلے VI (20,415) سے نیچے مکمل باڈی کلوز بلش سسپنشن مفروضہ باطل کر دیتا ہے۔',
  'Former Lower VI flips into overhead resistance during continued breakdown.':
    'مسلسل گراوٹ کے دوران سابقہ نچلا VI بالائی مزاحمت میں بدل جاتا ہے۔',

  // Visuals 1..9 strings
  'Illustrated Comparison: Why Overlapping Wicks Hide Dual Body Gaps':
    'تصویری موازنہ: اوورلیپ کرتی وِکس دو باڈی گیپس کو کیسے چھپاتی ہیں',
  'Comic comparing overlapping wick perception with dual body Volume Imbalances':
    'اوورلیپ وِکس اور ڈبل باڈی والیوم امبیلنس کے فرق کی کامک',
  'Wick-Only Scanner (Misses the Suspension)': 'صرف وِک دیکھنے والا (سسپنشن سے چوک جاتا ہے)',
  'Body-Gap Reader (Spots Dual Volume Imbalances)': 'باڈی گیپ پڑھنے والا (دونوں والیوم امبیلنس پکڑتا ہے)',
  'Wicks touch here!': 'وِکس یہاں مل رہی ہیں!',
  'No classic FVG -> Ignore.': 'کلاسک FVG نہیں -> نظر انداز۔',
  'VI-1 + VI-2 visible!': 'VI-1 اور VI-2 نمایاں!',
  'C2 body sits suspended.': 'C2 باڈی معلق ہے۔',
  'Synthetic illustration: overlapping shadows mask classic outer-wick FVGs while leaving two separated body-to-body Volume Imbalances intact.':
    'مصنوعی وضاحت: اوورلیپ کرتی وِکس کلاسک بیرونی FVG کو چھپا دیتی ہیں مگر دو الگ باڈی والیوم امبیلنس برقرار رہتے ہیں۔',

  'Interactive Suspension Dual-VI Lab & Classic FVG Comparator':
    'انٹرایکٹو سسپنشن ڈبل-VI لیب اور کلاسک FVG موازنہ',
  'Choose candle preset': 'کینڈل پری سیٹ منتخب کریں',
  'Bullish Suspension (Overlapping Wicks)': 'بلش سسپنشن (اوورلیپ کرتی وِکس)',
  'Bearish Suspension (Dual Body Gaps)': 'بیئرش سسپنشن (ڈبل باڈی گیپس)',
  'Single Volume Imbalance (Not Suspended)': 'سنگل والیوم امبیلنس (معلق نہیں)',
  'Classic Outer-Wick FVG + Dual VI': 'کلاسک بیرونی وِک FVG + ڈبل VI',
  'Suspension Block OHLC coordinate inspection chart': 'سسپنشن بلاک OHLC جانچ چارٹ',
  'Dual VIs:': 'دو VIs:',
  'Yes': 'جی ہاں',
  'Classic FVG:': 'کلاسک FVG:',
  'Open': 'کھلا',
  'Wick Overlap': 'وِک اوورلیپ',
  'Lower VI:': 'نچلا VI:',
  'Upper VI:': 'بالائی VI:',
  'Core 50%:': 'کور 50%:',
  'Shift Candle 2 Open Price (pts):': 'کینڈل 2 کی اوپن قیمت بدلیں (پوائنٹس):',
  'Classification Verdict': 'درجہ بندی کا فیصلہ',
  'True Suspension Block (Dual Body VIs with Overlapping Wicks)':
    'حقیقی سسپنشن بلاک (اوورلیپ وِکس کے ساتھ ڈبل باڈی VIs)',
  'Dual Body-Gap Suspension + Open Outer-Wick FVG':
    'ڈبل باڈی-گیپ سسپنشن + کھلا بیرونی وِک FVG',
  'Single Volume Imbalance Only (Missing Opposite Body Separation)':
    'صرف سنگل والیوم امبیلنس (مخالف باڈی فاصلہ غائب)',
  'No dual body-to-body gap detected around Candle 2':
    'کینڈل 2 کے گرد دو باڈی-ٹو-باڈی گیپ نہیں ملے',
  'Core C2 Body Range': 'مرکزی C2 باڈی رینج',
  'Total Envelope Midpoint': 'مکمل انویلوپ کا وسط',
  'Wicks Overlap?': 'کیا وِکس اوورلیپ کرتی ہیں؟',
  'Yes (Classic FVG Hidden)': 'ہاں (کلاسک FVG چھپا ہوا)',
  'Open Space Across Wicks': 'وِکس کے درمیان کھلا فاصلہ',
  'Synthetic NQ-style triad: shifting Candle 2 open shows how tiny body-gap adjustments change a Single VI into a True Suspension Block.':
    'مصنوعی NQ طرز مثال: کینڈل 2 کا اوپن ہلانے سے ظاہر ہوتا ہے کہ معمولی فرق سنگل VI کو کیسے حقیقی سسپنشن بلاک بنا دیتا ہے۔',

  'Interactive Breaker-to-Reaper Sequence Dissector': 'انٹرایکٹو بریکر تا ریپر سیکوئنس تجزیہ کار',
  'Select Reaper formation step': 'ریپر تشکیل کا مرحلہ منتخب کریں',
  'Stage 1': 'مرحلہ 1',
  'Stage 2': 'مرحلہ 2',
  'Stage 3': 'مرحلہ 3',
  'Stage 4': 'مرحلہ 4',
  'Stage 5': 'مرحلہ 5',
  'Step-by-step Reaper FVG nested overlap sequence': 'مرحلہ وار ریپر FVG نیسٹڈ اوورلیپ ترتیب',
  'Initial Leg 1 Bullish FVG': 'ابتدائی لیگ 1 بلش FVG',
  'A pre-sweep up-move creates Bullish FVG1 (20,512–20,524) directly beneath resistance.':
    'سویپ سے پہلے اوپر کی حرکت مزاحمت کے عین نیچے بلش FVG1 (20,512–20,524) بناتی ہے۔',
  'Learners record the exact FVG1 Low (20,512) and High (20,524) prior to any reversal claim.':
    'طلبہ کسی الٹاؤ کے دعوے سے پہلے FVG1 لو (20,512) اور ہائی (20,524) درست درج کرتے ہیں۔',
  'Sweep Extreme & Breaker Pivot': 'سویپ انتہا اور بریکر موڑ',
  'Price sweeps above prior Buy-Side Liquidity to 20,546 and fails sharply downward.':
    'قیمت پچھلی بائے سائیڈ لیکویڈیٹی 20,546 سے اوپر سویپ کر کے تیزی سے نیچے گرتی ہے۔',
  'The up-close sweep cluster forms the structural origin of the upcoming Bearish Breaker Block.':
    'اوپر بند ہونے والا سویپ مجموعہ آنے والے بیئرش بریکر بلاک کی بنیاد بنتا ہے۔',
  'Decisive Close Validates Bearish IFVG': 'فیصلہ کن کلوز سے بیئرش IFVG کی تصدیق',
  'A displacement candle closes cleanly at 20,506—below the entire FVG1 bottom (20,512).':
    'ڈسپلیسمنٹ کینڈل پورے FVG1 کے نچلے کنارے (20,512) سے نیچے 20,506 پر کلوز ہوتی ہے۔',
  'By closing beneath FVG1, old support flips into a Bearish Inverse Fair Value Gap (IFVG1).':
    'FVG1 کے نیچے کلوز ہونے سے پرانی سپورٹ بیئرش اِنورس FVG (IFVG1) بن جاتی ہے۔',
  'Opposing FVG2 Nests Inside IFVG1': 'مخالف FVG2 کا IFVG1 کے اندر اوورلیپ',
  'The breaking impulse leaves Bearish FVG2 (20,514–20,526) overlapping IFVG1 (20,512–20,524).':
    'توڑنے والی حرکت IFVG1 (20,512–20,524) پر اوورلیپ کرتا بیئرش FVG2 (20,514–20,526) چھوڑتی ہے۔',
  'Intersecting both intervals isolates the tight 10-point Bearish Reaper FVG overlap (20,514–20,524).':
    'دونوں زونز کے ملاپ سے 10 پوائنٹ کا بیئرش ریپر FVG اوورلیپ (20,514–20,524) الگ ہوتا ہے۔',
  'First-Utilization Retest & Rejection': 'پہلا ری ٹیسٹ اور مسترد ہونا',
  'Retracement wick taps 20,521 inside the nested overlap while bodies stay capped below 20,526.':
    'واپسی کی وِک نیسٹڈ اوورلیپ میں 20,521 چھوتی ہے جبکہ باڈیز 20,526 سے نیچے رہتی ہیں۔',
  'Closing above 20,526 invalidates the nested Reaper hypothesis; holding below supports downward continuation.':
    '20,526 سے اوپر کلوز نیسٹڈ ریپر مفروضے کو باطل کر دیتا ہے؛ نیچے برقرار رہنا مزید کمی کی حمایت کرتا ہے۔',
  'IFVG1': 'IFVG1',
  'FVG2': 'FVG2',
  'Nested Window': 'نیسٹڈ ونڈو',
  'Reaper Overlap Interval': 'ریپر اوورلیپ دائرہ',
  '50% Nested Midpoint': '50% نیسٹڈ وسطی نقطہ',
  'Chronological Reaper construction: notice how Bearish FVG2 only becomes a Reaper overlap after FVG1 suffers a closing breach inside the Breaker leg.':
    'ترتیب وار ریپر تشکیل: نوٹ کریں کہ بیئرش FVG2 صرف اس وقت ریپر اوورلیپ بنتا ہے جب بریکر حرکت کے اندر FVG1 کلوز کے ساتھ ٹوٹ جائے۔',

  'Continuous (NQ1!) vs. Front-Month Delivery Contract Calibrator':
    'کنٹینیوس (NQ1!) بمقابلہ فرنٹ منتھ ڈیلیوری کنٹریکٹ کیلیبریٹر',
  'Continuous Roll Premium Offset (pts):': 'کنٹینیوس رول پریمیم فرق (پوائنٹس):',
  'Continuous Suspension Low (pts):': 'کنٹینیوس سسپنشن لو (پوائنٹس):',
  'Continuous Suspension High (pts):': 'کنٹینیوس سسپنشن ہائی (پوائنٹس):',
  'Continuous Reference Span': 'کنٹینیوس حوالہ پھیلاؤ',
  'Active Front-Month Target Span': 'فعال فرنٹ منتھ ہدف پھیلاؤ',
  'MNQ Tick-Aligned Midpoint (0.25)': 'MNQ ٹِک ہم آہنگ وسط (0.25)',
  'MNQ Zone Depth (Ticks / USD per Contract)': 'MNQ زون گہرائی (ٹِکس / ڈالر فی کنٹریکٹ)',
  'ticks': 'ٹِکس',
  'Always chart, measure, and trigger directly from the active delivery month rather than copying unadjusted continuous coordinates.':
    'غیر ایڈجسٹ شدہ کنٹینیوس قیمتیں نقل کرنے کے بجائے ہمیشہ فعال ڈیلیوری مہینے سے چارٹ، پیمائش اور انٹری طے کریں۔',
  'Synthetic MNQ calibration: a continuous roll basis shifts identical structural levels away from live execution ticks.':
    'مصنوعی MNQ مطابقت: کنٹینیوس رول فرق یکساں ساختی سطحوں کو لائیو عمل درآمد ٹِکس سے ہٹا دیتا ہے۔',

  'Structural Taxonomy Explorer: Suspension vs. Reaper vs. Standard Blocks':
    'ساختی درجہ بندی: سسپنشن بمقابلہ ریپر بمقابلہ معیاری بلاکس',
  'Select block concept': 'بلاک تصور منتخب کریں',
  'Dual Body VIs': 'ڈبل باڈی VIs',
  'Nested Breaker + 2 Gaps': 'نیسٹڈ بریکر + 2 گیپس',
  'Outer-Wick Gap': 'بیرونی وِک گیپ',
  'Opposing Candle': 'مخالف کینڈل',
  'Secondary Re-Test OB': 'ثانوی ری ٹیسٹ OB',
  'Ordinary Failed IFVG': 'عام ناکام IFVG',
  'Separate Outcome': 'الگ نتیجہ',
  'Mandatory OHLC Prerequisite': 'لازمی OHLC شرط',
  'Wick Overlap Rule': 'وِک اوورلیپ اصول',
  'Invalidation / Stop Reference': 'باطل / اسٹاپ حوالہ',
  'BodyLow(C2) > BodyHigh(C1) AND BodyLow(C3) > BodyHigh(C2) (or bearish mirror).':
    'BodyLow(C2) > BodyHigh(C1) اور BodyLow(C3) > BodyHigh(C2) (یا بیئرش عکس)۔',
  'Wicks can touch or overlap completely; focus strictly on Open/Close body voids.':
    'وِکس مکمل چھو یا اوورلیپ کر سکتی ہیں؛ توجہ صرف اوپن/کلوز باڈی خلا پر رکھیں۔',
  'Outside outer edge of Initiation VI-1 plus tick buffer.':
    'ابتدائی VI-1 کے بیرونی کنارے سے باہر ٹِک بفر کے ساتھ۔',
  'Sweep + closing flip of FVG-1 into IFVG overlapped directly by opposing FVG-2.':
    'سویپ + کلوز کے ذریعے FVG-1 کا IFVG بننا جس پر مخالف FVG-2 براہ راست اوورلیپ کرے۔',
  'Evaluates IFVG/FVG-2 overlap alongside wick excursions around Breaker body.':
    'بریکر باڈی کے گرد وِک کی حرکت کے ساتھ IFVG/FVG-2 اوورلیپ جانچتا ہے۔',
  'Above/below swept Breaker extreme or outer edge of nested overlap.':
    'سویپ شدہ بریکر انتہا یا نیسٹڈ اوورلیپ کے بیرونی کنارے سے آگے۔',
  'Strict vertical space between C1 outer wick and C3 outer wick across C2.':
    'کینڈل 2 کے آر پار C1 اور C3 کی بیرونی وِکس کے درمیان واضح عمودی فاصلہ۔',
  'Zero overlap allowed between C1 High and C3 Low (bullish).':
    'C1 ہائی اور C3 لو (بلش) کے درمیان کوئی اوورلیپ نہ ہو۔',
  'Beyond C1 wick extreme or 50% CE depending on timeframe.':
    'ٹائم فریم کے مطابق C1 وِک انتہا یا 50% CE سے باہر۔',
  'Last down-close (bullish) or up-close (bearish) candle before structural displacement.':
    'اسٹرکچرل بریک سے پہلے آخری مخالف کلوز والی کینڈل۔',
  'Can overlap seamlessly with adjacent bodies—no body separation needed.':
    'قریبی باڈیز سے مکمل مل سکتی ہے—باڈی فاصلہ ضروری نہیں۔',
  'Beyond OB full High/Low extreme or 50% Mean Threshold.':
    'آرڈر بلاک کے مکمل ہائی/لو یا 50% وسط سے باہر۔',
  'Secondary opposing candle dipping into 50% Mean Threshold of an active prior OB.':
    'پہلے سے موجود فعال آرڈر بلاک کے 50% وسط میں اترنے والی ثانوی مخالف کینڈل۔',
  'Does not require dual Volume Imbalances; depends on prior OB mitigation.':
    'دو والیوم امبیلنس ضروری نہیں؛ پچھلے OB کی میٹیگیشن پر منحصر ہے۔',
  'Immediate invalidation close beneath parent OB 50% Mean Threshold.':
    'بنیادی OB کے 50% وسط سے نیچے کلوز پر فوری باطل ہونا۔',
  'An IFVG that breaks back through on retest without Breaker + opposing FVG nesting.':
    'ایسا IFVG جو بریکر اور مخالف FVG نیسٹنگ کے بغیر ری ٹیسٹ پر واپس ٹوٹ جائے۔',
  'Tracks single gap break, test, and invalidation—do not auto-label as Reaper.':
    'صرف ایک گیپ کے بریک اور ناکامی کو دیکھتا ہے—خودکار ریپر نہ کہیں۔',
  'Exit upon closing invalidation; do not assume automatic reversal entry.':
    'کلوز باطل ہونے پر نکلیں؛ خودکار ریورسل انٹری فرض نہ کریں۔',
  'Comparing prerequisites prevents mislabeling plain Order Blocks as Suspension Blocks or ordinary failed IFVGs as Reapers.':
    'شرائط کا موازنہ سادہ آرڈر بلاک کو سسپنشن بلاک یا عام ناکام IFVG کو ریپر کہنے سے بچاتا ہے۔',

  // Confluence Grader
  'Interactive 6-Gate Suspension & Reaper Confluence Grader':
    'انٹرایکٹو 6-شرطی سسپنشن اور ریپر ہم آہنگی اسکورر',
  '1. Dual Body-Gap Suspension or Verified Nested Overlap':
    '1. دو طرفہ باڈی گیپ سسپنشن یا تصدیق شدہ نیسٹڈ اوورلیپ',
  '2. Prior Swing Sweep & Opposing Breaker Context':
    '2. پچھلے سوئنگ کا سویپ اور مخالف بریکر سیاق',
  '3. Explicit Closing Breach Validating IFVG':
    '3. IFVG کی تصدیق کے لیے واضح باڈی کلوز بریک',
  '4. Opposing FVG Aligns Inside Inverted Zone':
    '4. مخالف FVG کا الٹے ہوئے زون کے اندر ہم آہنگ ہونا',
  '5. Active Delivery Contract Matched (No Basis Drift)':
    '5. فعال ڈیلیوری کنٹریکٹ سے مطابقت (کوئی بیسز فرق نہیں)',
  '6. Inside Active NY or London Session Window':
    '6. فعال نیویارک یا لندن سیشن ونڈو کے اندر',
  'Confluence Score': 'ہم آہنگی اسکور',
  'High-Discipline Setup': 'اعلیٰ نظم والا سیٹ اپ',
  'Conditional — Needs Further Confirmation': 'مشروط — مزید تصدیق درکار ہے',
  'Stand Aside — Missing Prerequisites': 'کنارہ کش رہیں — لازمی شرائط غائب ہیں',
  'Two separated adjacent body gaps (Close/Open) or verified nested IFVG bounds':
    'دو الگ باڈی گیپس یا تصدیق شدہ نیسٹڈ IFVG حدود',
  'Prior swing sweep + opposing structural break (Breaker context)':
    'پچھلے سوئنگ کا سویپ + مخالف اسٹرکچرل بریک (بریکر سیاق)',
  'Explicit candle body close beyond prior gap to validate IFVG':
    'IFVG کی تصدیق کے لیے پچھلے گیپ سے آگے کینڈل باڈی کلوز',
  'Overlapping opposing FVG or clean Volume Imbalance confluence zone':
    'اوورلیپ کرتا مخالف FVG یا صاف والیوم امبیلنس زون',
  'Front-month active delivery chart matched against any continuous reference':
    'کنٹینیوس حوالے کے بجائے فعال فرنٹ منتھ ڈیلیوری چارٹ سے مطابقت',
  'Observed inside stated America/New_York active session window':
    'طے شدہ America/New_York فعال سیشن ونڈو میں مشاہدہ',
  'All six structural, feed, and session gates satisfied for controlled replay study.':
    'منظم ری پلے مطالعے کے لیے تمام چھ ساختی، فیڈ اور سیشن شرائط پوری ہیں۔',
  'A scoring rubric helps filter weak Asian micro-gaps from high-conviction London/NY Breaker + Suspension setups.':
    'اسکورنگ پیمانہ کمزور ایشین گیپس کو مضبوط لندن/نیویارک بریکر اور سسپنشن سیٹ اپس سے الگ کرتا ہے۔',

  // MTF Nesting Explorer
  'Multi-Timeframe Fractal Nesting (HTF Suspension -> LTF Reaper Trigger)':
    'ملٹی ٹائم فریم نیسٹنگ (HTF سسپنشن -> LTF ریپر ٹرگر)',
  'Choose trading horizon': 'ٹریڈنگ مدت منتخب کریں',
  '15M / 1H': '15M / 1H',
  '5M Suspension or Breaker': '5M سسپنشن یا بریکر',
  '1M Reaper IFVG': '1M ریپر IFVG',
  '4H / 1H': '4H / 1H',
  '15M Suspension Core': '15M سسپنشن کور',
  '5M Reaper IFVG Overlap': '5M ریپر IFVG اوورلیپ',
  'Weekly / Daily': 'ہفتہ وار / روزانہ',
  '4H Suspension Block': '4H سسپنشن بلاک',
  '1H / 15M Breaker + Reaper': '1H / 15M بریکر + ریپر',
  'Narrative Bias TF': 'سمت کا بڑا ٹائم فریم',
  'Suspension / Breaker Shelf': 'سسپنشن / بریکر سطح',
  'Nested Reaper LTF Trigger': 'نیسٹڈ ریپر LTF ٹرگر',
  'Operational Flow': 'عملی ترتیب',
  'Align NY AM/PM Sweep + 5M Suspension Core with 1M nested IFVG trigger.':
    'نیویارک AM/PM سویپ + 5M سسپنشن کور کو 1M نیسٹڈ IFVG ٹرگر سے جوڑیں۔',
  'Candle body close through opposite edge of 5M Suspension envelope or Breaker extreme.':
    '5M سسپنشن انویلوپ کے مخالف کنارے یا بریکر انتہا کے پار کینڈل باڈی کلوز۔',
  'Track Daily/4H draw toward ERL while framing pullbacks inside 15M body-gap pockets.':
    'ERL کی جانب ڈیلی/4H ہدف کو دیکھتے ہوئے 15M باڈی گیپس میں واپسی کا جائزہ لیں۔',
  'Confirmed 15M body close beyond Suspension total envelope or opposing Reaper boundary.':
    'سسپنشن انویلوپ یا مخالف ریپر حد سے باہر تصدیق شدہ 15M باڈی کلوز۔',
  'Use Daily/4H Suspension cores as mid-swing continuation shelves across active sessions.':
    'فعال سیشنز میں ڈیلی/4H سسپنشن کورز کو درمیانی سوئنگ تسلسل کی سطحوں کے طور پر استعمال کریں۔',
  'Daily or 4H closing break outside the full Suspension envelope on stated delivery contract.':
    'مقررہ ڈیلیوری کنٹریکٹ پر پورے سسپنشن انویلوپ سے باہر ڈیلی یا 4H کلوز بریک۔',
  'Nesting prevents stepping blindly in front of higher-timeframe momentum with isolated 1M candles.':
    'نیسٹنگ بڑے ٹائم فریم کی تیز حرکت کے سامنے اکیلی 1M کینڈلز پر اندھا انحصار روکتی ہے۔',

  // Mistakes Comic
  'Common Mistakes Comic: 4 Recurring Errors & Corrections':
    'عام غلطیوں کی کامک: 4 بار بار ہونے والی غلطیاں اور ان کی اصلاح',
  'Select mistake scenario': 'غلطی کی مثال منتخب کریں',
  'Impulsive Trap': 'جلد بازی کا جال',
  'Disciplined Correction': 'اصولی اصلاح',
  'Fix': 'اصلاح',
  '1. Plain OB Mistaken for Suspension': '1. سادہ OB کو سسپنشن سمجھنا',
  'A red candle before an up-move! That must be a Suspension Block!':
    'اوپر جانے سے پہلے ایک سرخ کینڈل! یہ ضرور سسپنشن بلاک ہے!',
  'Zero body gaps exist here. Both Open and Close touch neighbors—this is just an Order Block.':
    'یہاں کوئی باڈی گیپ نہیں۔ اوپن اور کلوز پڑوسیوں سے جڑے ہیں—یہ صرف ایک آرڈر بلاک ہے۔',
  'Always verify both VI-1 and VI-2 body separations numerically before marking a Suspension Block.':
    'سسپنشن بلاک نشان زد کرنے سے پہلے ہمیشہ VI-1 اور VI-2 دونوں کے عددی فاصلے چیک کریں۔',
  '2. Every Failed IFVG Called Reaper': '2. ہر ناکام IFVG کو ریپر کہنا',
  'My 1M IFVG broke! It is automatically a Reaper FVG—flip short at market!':
    'میرا 1M IFVG ٹوٹ گیا! یہ خودکار ریپر FVG ہے—فوراً سیل کر دو!',
  'No Breaker sweep and no nested opposing FVG overlap exist here—log it simply as a failed IFVG.':
    'یہاں نہ بریکر سویپ ہے نہ مخالف FVG اوورلیپ—اسے صرف ناکام IFVG درج کریں۔',
  'Separate failed inversions from documented two-gap Breaker Reaper geometry.':
    'ناکام اِنورژن کو دستاویزی دو-گیپ بریکر ریپر ساخت سے الگ رکھیں۔',
  '3. Unadjusted Continuous Feed Copy': '3. کنٹینیوس فیڈ کی اندھی نقل',
  'NQ1! shows a Suspension gap at 20,420, so I placed my NQZ limit order right at 20,420.':
    'NQ1! پر 20,420 پر سسپنشن گیپ ہے، اس لیے میں نے NQZ آرڈر بھی 20,420 پر لگا دیا۔',
  'Roll basis shifted NQ1! by +18 points—your active contract never even traded that number!':
    'رول فرق نے NQ1! کو +18 پوائنٹ ہٹا دیا—آپ کے فعال کنٹریکٹ نے وہ قیمت چھوئی ہی نہیں!',
  'Calibrate every execution boundary directly on the active front-month delivery contract.':
    'ہر عمل درآمد حد براہ راست فعال فرنٹ منتھ ڈیلیوری کنٹریکٹ پر ترتیب دیں۔',
  '4. Blind Midpoint Stop Inside Dual VIs': '4. ڈبل VIs کے بیچ اندھا مڈپوائنٹ اسٹاپ',
  'I set a tiny 3-point stop right inside C2 Core so my first touch wins huge!':
    'میں نے C2 کور کے بیچ صرف 3 پوائنٹ کا اسٹاپ رکھا تاکہ پہلی چھو پر بڑا نفع ملے!',
  'Price routinely fills Upper VI-2 and dips to test Lower VI-1 before deciding direction.':
    'قیمت اکثر بالائی VI-2 بھر کر سمت طے کرنے سے پہلے نچلے VI-1 کو بھی ٹیسٹ کرتی ہے۔',
  'Anchor invalidation past the outer edge of VI-1 or await lower-timeframe Reaper confirmation.':
    'باطل ہونے کی حد VI-1 کے بیرونی کنارے سے باہر رکھیں یا چھوٹے ٹائم فریم پر ریپر تصدیق کا انتظار کریں۔',

  // Additional UI, MTF Tiers & CurriculumReview scope/interpretation keys
  'Intraday Index Scalping': 'انٹراڈے انڈیکس اسکیلپنگ',
  'Multi-Day Swing Study': 'ملٹی ڈے سوئنگ مطالعہ',
  'All synthetic NQ and EUR/USD Suspension Block candles, Reaper IFVG overlaps, futures contract basis offsets, and comic panels are original educational illustrations, not live quotes or execution records.':
    'تمام مصنوعی NQ اور EUR/USD سسپنشن بلاک کینڈلز، ریپر IFVG اوورلیپس، فیوچرز کنٹریکٹ بیسز فرق اور کامک خاکے اصل تعلیمی وضاحتیں ہیں، لائیو کوٹس یا حقیقی عمل درآمد ریکارڈ نہیں۔',
  'All synthetic NQ and EUR/USD Suspension Block candles, Reaper IFVG overlaps, futures contract drift examples, and stick-figure comics in this chapter are illustrative chart-geometry studies, not live quotes or trading promises. Body gaps never guarantee a bounce or disclose participant intent.':
    'اس باب میں موجود تمام مصنوعی NQ اور EUR/USD سسپنشن بلاک کینڈلز، ریپر IFVG اوورلیپس، فیوچرز کنٹریکٹ فرق کی مثالیں اور اسٹک فگر کامکس صرف چارٹ ساخت کے وضاحتی مطالعے ہیں، لائیو کوٹس یا منافع کے وعدے نہیں۔ باڈی گیپس کبھی ردعمل کی ضمانت نہیں دیتے اور نہ شرکاء کی نیت ظاہر کرتے ہیں۔',
};
