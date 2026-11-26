import { rdrbDocument as data } from './rdrbLesson';

export const rdrbTranslations: Record<string, string> = {
  // Document metadata & summary
  [data.h1]: 'بیلنسڈ پرائس رینج (BPR)، RDRB اور انیگما FVG',
  [data.seoTitle]: data.seoTitleUr,
  [`${data.seoTitle} | LearnSMC`]: `${data.seoTitleUr} | LearnSMC`,
  [data.metaDescription]: data.metaDescriptionUr,
  [data.quickAnswer]:
    'بیلنسڈ پرائس رینج (BPR) قیمت کا وہ مشترکہ حصہ ہے جو دو مخالف تین کینڈل فیئر ویلیو گیپس کے باہمی اوورلیپ سے بنتا ہے—جس کی حد max(FVG1_Low, FVG2_Low) سے min(FVG1_High, FVG2_High) تک اور 50% مڈپوائنٹ ہوتا ہے۔ RDRB ابتدائی علیحدگی کے بعد دوسری واپسی بیان کرتا ہے، جبکہ انیگما وِک، باڈی گیپس اور 1.25 پروجیکشن اصولوں کا موازنہ کرتا ہے۔',
  '15 October 2026': '15 اکتوبر 2026',
  '26 November 2026': '26 نومبر 2026',

  // Takeaways
  [data.takeaways[0]]:
    'حقیقی BPR صرف وہیں بنتا ہے جہاں دو مخالف فیئر ویلیو گیپس واضح طور پر اوورلیپ ہوں: max(FVG1_Low, FVG2_Low) < min(FVG1_High, FVG2_High)۔',
  [data.takeaways[1]]:
    'سمت کا تعین حالیہ ڈسپلیسمنٹ لیگ سے ہوتا ہے: Bearish FVG پر Bullish FVG اوورلیپ ہو تو Bullish BPR بنتا ہے، اور اس کے برعکس۔',
  [data.takeaways[2]]:
    '50% BPR مڈپوائنٹ صرف اوورلیپنگ حصے کا حسابی وسط ہے — پورے دو لیگ والے سوئنگ کا نہیں۔',
  [data.takeaways[3]]:
    'RDRB ابتدائی BPR ردعمل اور علیحدگی کے بعد دوسری واپسی کو بیان کرتا ہے، جس کے لیے واضح ٹچ گنتی اور ان ویلیڈیشن اصول درکار ہیں۔',
  [data.takeaways[4]]:
    'انیگما پیمائش کے اصول وِک کناروں، ملحقہ باڈی گیپس اور 1.25 رینج پروجیکشنز میں اینکر حساسیت واضح کرتے ہیں — جانچ سے پہلے اصول منجمد رکھیں۔',

  // UI Chrome, Formulas, TOC, Checklist, Related Links
  'Mathematical Formula': 'ریاضیاتی فارمولا',
  'Overlap Window: BPR_Low = max(FVG1_Low, FVG2_Low) · BPR_High = min(FVG1_High, FVG2_High)':
    'اوورلیپ ونڈو: BPR_Low = max(FVG1_Low, FVG2_Low) · BPR_High = min(FVG1_High, FVG2_High)',
  'Midpoint: BPR_50% = (BPR_Low + BPR_High) ÷ 2 (valid when BPR_Low < BPR_High)':
    'وسط: BPR_50% = (BPR_Low + BPR_High) ÷ 2 (درست جب BPR_Low < BPR_High ہو)',
  'Show section links': 'ابواب کے لنکس دکھائیں',
  'Pre-Execution Checklist': 'عملدرآمد سے پہلے کی چیک لسٹ',
  'Checklist items confirmed': 'تصدیق شدہ چیک لسٹ نکات',
  'Checklist complete — BPR overlap, sweep origin, MSS, PD context, session timing, and far-edge invalidation are documented.':
    'چیک لسٹ مکمل — BPR اوورلیپ، سویپ بنیاد، MSS، PD تناظر، سیشن وقت اور دور کنارے کی ان ویلیڈیشن درج ہو چکیں۔',
  'Confirm all 6 criteria before classifying a studied overlap as a qualified BPR or RDRB setup.':
    'کسی اوورلیپ کو مکمل BPR یا RDRB سیٹ اپ ماننے سے پہلے تمام 6 شرائط کی تصدیق کریں۔',
  'Verified True BPR Intersection: max(FVG1_Low, FVG2_Low) < min(FVG1_High, FVG2_High) with clear opposing displacement':
    'حقیقی BPR اوورلیپ کی تصدیق: max(FVG1_Low, FVG2_Low) < min(FVG1_High, FVG2_High) اور واضح مخالف ڈسپلیسمنٹ',
  'Identified Liquidity Sweep Origin (BSL/SSL purged before Leg 2 counter-impulse launched)':
    'لیکویڈیٹی سویپ بنیاد کی شناخت (لیگ 2 مخالف حرکت سے پہلے BSL یا SSL کا اخراج)',
  'Confirmed Market Structure Shift (MSS) breaking the intervening swing with wide displacement bodies':
    'مارکیٹ اسٹرکچر شفٹ (MSS) کی تصدیق اور درمیانی سوئنگ کا واضح ڈسپلیسمنٹ کے ساتھ ٹوٹنا',
  'Verified Higher-Timeframe alignment and Discount (<50%) or Premium (>50%) context':
    'بڑے ٹائم فریم سے ہم آہنگی اور ڈسکاؤنٹ (<50%) یا پریمیم (>50%) تناظر کی تصدیق',
  'Confirmed active London or New York window in America/New_York local time (no midday chop)':
    'America/New_York وقت میں فعال لندن یا نیویارک سیشن کی تصدیق (دوپہر کے سناٹے سے گریز)',
  'Fixed invalidation stop beyond BPR far edge (or Leg 2 swing extreme) before price reaches entry':
    'انٹری سے پہلے BPR کے دور کنارے (یا لیگ 2 سوئنگ انتہا) کے پار ان ویلیڈیشن اسٹاپ مقرر کیا',
  'Sources & Institutional References': 'حوالہ جات اور ادارہ جاتی ذرائع',
  'Continue Studying': 'مطالعہ جاری رکھیں',
  'Study Fair Value Gaps (FVG & 50% CE)': 'فیئر ویلیو گیپس (FVG اور 50% CE) کا مطالعہ',
  'Compare Inverse Fair Value Gaps (IFVG)': 'انورس فیئر ویلیو گیپس (IFVG) کا موازنہ',
  'Master Premium & Discount (PD Array Matrix)': 'پریمیم اور ڈسکاؤنٹ (PD اَرے میٹرکس) سیکھیں',
  'Connect Optimal Trade Entry (OTE) 0.62–0.79': 'آپٹیمل ٹریڈ انٹری (OTE) 0.62–0.79 سے جوڑیں',
  'Explore Order Blocks (OB) & Mitigation': 'آرڈر بلاکس (OB) اور مٹیگیشن کا مطالعہ',
  'Study Breaker Blocks & Unicorn Structure': 'بریکر بلاکس اور یونیکارن اسٹرکچر سمجھیں',
  'Compare BPR vs. RDRB Side-by-Side': 'BPR بمقابلہ RDRB کا براہِ راست موازنہ',
  'Practice in the RDRB Chart Lab Module': 'RDRB چارٹ لیب ماڈیول میں مشق کریں',

  // Section 1
  [data.sections[0].title]: '1. ابتدائی کہانی: ایک گیپ کا اندازہ دو طرفہ ری بیلنسنگ سے کیوں ٹکراتا ہے',
  [data.sections[0].blocks[0].text!]:
    'تصور کریں دو ٹریڈرز نیویارک وقت کے مطابق صبح 09:35 پر نیسڈیک فیوچرز کا چارٹ دیکھ رہے ہیں۔ قیمت تیزی سے 20,470 سے گر کر 20,426 تک آتی ہے اور 20,440 سے 20,460 کے درمیان ایک صاف Bearish Fair Value Gap چھوڑ دیتی ہے۔ ٹریڈر A فوراً خوش ہو جاتا ہے: "ہر گیپ مزاحمت کی طرح کام کرتا ہے — میں 20,450 پر آنکھ بند کر کے سیل لِمٹ لگا کر کافی بنانے جا رہا ہوں۔"',
  [data.sections[0].blocks[1].text!]:
    'چار منٹ بعد قیمت ایک قریبی لو سے نیچے 20,418 تک جھک کر فوراً اوپر پلٹتی ہے اور 20,432 سے 20,468 تک ایک طاقتور Bullish Fair Value Gap (20,432 تا 20,454) بنا دیتی ہے۔ ٹریڈر A کا اسٹاپ لگ جاتا ہے جبکہ ٹریڈر B پیمانہ اٹھا کر دیکھتا ہے۔ الٹ حرکت سے لڑنے کے بجائے ٹریڈر B صرف دونوں گیپس کے مشترکہ حصے — 20,440 سے 20,454 — کو نشان زد کرتا ہے اور اس کا 50% وسط 20,447 پر لگاتا ہے۔',
  [data.sections[0].blocks[2].title!]: 'بنیادی سوچ کی تبدیلی',
  [data.sections[0].blocks[2].text!]:
    'ٹریڈر A نے فرض کیا کہ پہلا عدم توازن کبھی مغلوب نہیں ہو سکتا۔ ٹریڈر B نے انتظار کیا کہ مارکیٹ اسی عین قیمت کے ٹکڑے پر دونوں سمتوں میں تیز ڈیلیوری مکمل کرے، جس نے پرانے ایک گیپ کو اوورلیپنگ بیلنسڈ پرائس رینج (BPR) میں بدل دیا۔',

  // Section 2
  [data.sections[1].title]: '2. آسان الفاظ میں بیلنسڈ پرائس رینج (BPR) کیا ہے؟',
  [data.sections[1].blocks[0].text!]:
    'اسمارٹ منی کانسیپٹس میں ایک عام Fair Value Gap (FVG) یک طرفہ عجلت کو ریکارڈ کرتا ہے: خریدار یا فروخت کنندہ تین کینڈلز میں اتنی تیزی سے گزرے کہ بیرونی وِکس آپس میں نہ مل سکیں۔ اکیلے طور پر یہ FVG ایک عدم توازن یا یک سمتی گزرگاہ ہے۔',
  [data.sections[1].blocks[1].text!]:
    'بیلنسڈ پرائس رینج (BPR) اس وقت بنتی ہے جب مارکیٹ فوراً مخالف سمت میں اسی عین قیمت کے مقام سے تیزی سے گزرتی ہے اور دوسرا مخالف Fair Value Gap بناتی ہے جو پہلے گیپ کے اوپر آ جاتا ہے۔ یوں سمجھیں جیسے نیلامی کرنے والا ایک گلیارے میں بڈز چھوڑتا ہوا نیچے بھاگا اور فوراً اسی گلیارے میں آفرز صاف کرتا ہوا واپس اوپر دوڑا: اوورلیپنگ حصے میں دونوں سمتوں کی تیز حرکت گزر چکی ہے۔',
  [data.sections[1].blocks[2].text!]:
    'اہم اصطلاحی انتباہ: پرائس ایکشن میں کسی زون کو "بیلنسڈ" کہنا چارٹ کی جیومیٹری بیان کرتا ہے — یعنی دو مخالف تین کینڈل گیپس کا اوورلیپ۔ یہ اس بات کا ثبوت نہیں کہ ایکسچینج آرڈر بک کے تمام آرڈرز ختم ہو گئے یا مڈپوائنٹ سے قیمت کا اچھال یقینی ہے۔',

  // Section 3
  [data.sections[2].title]: '3. BPR اوورلیپ کی عین ساخت اور 50% ایکویلیبریم فارمولا',
  [data.sections[2].blocks[0].text!]:
    'نئے سیکھنے والے اکثر دونوں ڈسپلیسمنٹ لیگز کی بیرونی انتہاؤں کو باکس بنا دیتے ہیں۔ حقیقت میں BPR صرف وہ ریاضیاتی مشترکہ حصہ ہے جو لیگ 1 اور لیگ 2 دونوں میں مشترک ہو۔',
  [data.sections[2].blocks[1].items![0]]:
    'لیگ 1 FVG حدود ناپیں: اس کی تینوں کینڈلز کی یکساں وِک حدوں سے FVG1_Low اور FVG1_High طے کریں۔',
  [data.sections[2].blocks[1].items![1]]:
    'لیگ 2 مخالف FVG حدود ناپیں: تیز جوابی لیگ پر FVG2_Low اور FVG2_High کی نشان دہی کریں۔',
  [data.sections[2].blocks[1].items![2]]:
    'مشترکہ نچلی حد نکالیں: BPR_Low = max(FVG1_Low, FVG2_Low)۔',
  [data.sections[2].blocks[1].items![3]]:
    'مشترکہ بالائی حد نکالیں: BPR_High = min(FVG1_High, FVG2_High)۔',
  [data.sections[2].blocks[1].items![4]]:
    'حقیقی اوورلیپ کی تصدیق کریں: درست BPR صرف تب موجود ہے جب BPR_Low < BPR_High ہو۔',
  [data.sections[2].blocks[1].items![5]]:
    '50% BPR ایکویلیبریم لگائیں: BPR_50% = (BPR_Low + BPR_High) ÷ 2۔',
  [data.sections[2].blocks[2].text!]:
    'اندرونی مشترکہ حصہ بیرونی باکسز سے زیادہ اہم کیوں ہے؟ کیونکہ اوورلیپ سے باہر کی قیمت صرف ایک سمت میں تیزی سے چلی، جبکہ اندرونی کور میں دونوں سمتوں کی تیز حرکت واقع ہوئی۔',

  // Section 4
  [data.sections[3].title]: '4. Bullish بمقابلہ Bearish BPR سمت کے اصول',
  [data.sections[3].blocks[0].text!]:
    'یہ کیسے پتا چلتا ہے کہ اوورلیپ ہونے والے گیپس سپورٹ (Bullish BPR) بنیں گے یا مزاحمت (Bearish BPR)؟ ترتیب سمت کا فیصلہ کرتی ہے: حالیہ ترین تیز ڈسپلیسمنٹ لیگ غالب سمتی بائس متعین کرتی ہے۔',
  [data.sections[3].blocks[1].rows![0][0]]: 'خصوصیت',
  [data.sections[3].blocks[1].rows![0][1]]: 'Bullish BPR (سپورٹ حوالہ)',
  [data.sections[3].blocks[1].rows![0][2]]: 'Bearish BPR (مزاحمتی حوالہ)',
  [data.sections[3].blocks[1].rows![1][0]]: 'لیگ 1 عدم توازن',
  [data.sections[3].blocks[1].rows![1][1]]: 'ابتدائی گراوٹ میں Bearish FVG (SIBI) بنتا ہے',
  [data.sections[3].blocks[1].rows![1][2]]: 'ابتدائی تیزی میں Bullish FVG (BISI) بنتا ہے',
  [data.sections[3].blocks[1].rows![2][0]]: 'لیگ 2 مخالف حرکت',
  [data.sections[3].blocks[1].rows![2][1]]: 'Bullish FVG (BISI) اوپر جا کر لیگ 1 کو اوورلیپ کرتا ہے',
  [data.sections[3].blocks[1].rows![2][2]]: 'Bearish FVG (SIBI) نیچے آ کر لیگ 1 کو اوورلیپ کرتا ہے',
  [data.sections[3].blocks[1].rows![3][0]]: 'قریبی کنارہ (فوری انٹری)',
  [data.sections[3].blocks[1].rows![3][1]]: 'BPR_High (اوپر سے پہلی واپسی پر چھونے والی حد)',
  [data.sections[3].blocks[1].rows![3][2]]: 'BPR_Low (نیچے سے پہلی واپسی پر چھونے والی حد)',
  [data.sections[3].blocks[1].rows![4][0]]: 'دور کنارہ (ان ویلیڈیشن لائن)',
  [data.sections[3].blocks[1].rows![4][1]]: 'BPR_Low (اس سے نیچے صاف کلوز زون باطل کر دیتا ہے)',
  [data.sections[3].blocks[1].rows![4][2]]: 'BPR_High (اس سے اوپر صاف کلوز زون باطل کر دیتا ہے)',
  [data.sections[3].blocks[1].rows![5][0]]: 'متوقع سیاقی کردار',
  [data.sections[3].blocks[1].rows![5][1]]: 'ری ٹیسٹ کے بعد بالائی BSL ہدف کی جانب ہائر لو',
  [data.sections[3].blocks[1].rows![5][2]]: 'ری ٹیسٹ کے بعد نچلے SSL ہدف کی جانب لوئر ہائی',
  [data.sections[3].blocks[2].title!]: 'سمت کو الٹا نہ پڑھیں',
  [data.sections[3].blocks[2].text!]:
    'اگر قیمت پہلے اوپر گیپ بنائے (Bullish FVG) اور پھر نیچے آ کر اوورلیپنگ Bearish FVG بنا دے تو یہ زون Bearish ہے — چاہے پہلا گیپ سبز تھا۔ ہمیشہ دوسری اوورلیپنگ ڈسپلیسمنٹ کی سمت کا احترام کریں۔',

  // Section 5
  [data.sections[4].title]: '5. انٹرایکٹو BPR اوورلیپ اور 50% مڈپوائنٹ کیلکولیٹر',
  [data.sections[4].blocks[0].text!]:
    'نیچے افقی کیلکولیٹر میں FVG 1 اور FVG 2 کی حدود بدل کر دیکھیں کہ دو مخالف گیپس کیسے ملتے ہیں۔ غور کریں کہ جب دوسرا گیپ جزوی اوورلیپ کرے، مکمل اندر سما جائے یا چند پوائنٹس سے چوک جائے تو کیا ہوتا ہے۔',
  [data.sections[4].blocks[1].text!]:
    'جب BPR_Low برابر یا زیادہ ہو BPR_High سے تو حسابی اوورلیپ فوراً ختم ہو جاتا ہے۔ بغیر اوورلیپ والے گیپس کے درمیان زبردستی مستطیل کھینچنے کے بجائے انہیں الگ PD اَریز سمجھیں۔',

  // Section 6
  [data.sections[5].title]: '6. حقیقی BPR اوورلیپ بمقابلہ ٹچ پوائنٹ کِس بمقابلہ سادہ ری بیلنس',
  [data.sections[5].blocks[0].text!]:
    'نئے طلبہ اکثر تین ملتے جلتے چارٹ واقعات کو ایک سمجھ لیتے ہیں۔ انہیں الگ رکھنا کنسولیڈیشن شور کو BPR سمجھنے کی غلطی سے بچاتا ہے:',
  [data.sections[5].blocks[1].rows![0][0]]: 'اسٹرکچر کی قسم',
  [data.sections[5].blocks[1].rows![0][1]]: 'حدود کا تعلق',
  [data.sections[5].blocks[1].rows![0][2]]: 'چارٹ کی تشریح',
  [data.sections[5].blocks[1].rows![1][0]]: 'حقیقی BPR اوورلیپ',
  [data.sections[5].blocks[1].rows![1][1]]: 'max(L1, L2) < min(H1, H2)',
  [data.sections[5].blocks[1].rows![1][2]]: 'دونوں مخالف گیپس کا مشترکہ موٹائی والا حصہ؛ درست 50% BPR مڈپوائنٹ۔',
  [data.sections[5].blocks[1].rows![2][0]]: 'صرف نقطہ ٹکراؤ (Touch-Point Kiss)',
  [data.sections[5].blocks[1].rows![2][1]]: 'max(L1, L2) = min(H1, H2)',
  [data.sections[5].blocks[1].rows![2][2]]: 'گیپس صرف ایک ٹِک پر ملتے ہیں اور موٹائی صفر ہے؛ انہیں الگ ترتیب وار گیپس سمجھیں۔',
  [data.sections[5].blocks[1].rows![3][0]]: 'بغیر اوورلیپ ترتیب وار ری بیلنس',
  [data.sections[5].blocks[1].rows![3][1]]: 'max(L1, L2) > min(H1, H2)',
  [data.sections[5].blocks[1].rows![3][2]]: 'ایک سست کینڈل نے گیپ 1 بھرا اور گیپ 2 اوپر یا نیچے شروع ہوا؛ کوئی BPR اوورلیپ نہیں۔',
  [data.sections[5].blocks[1].rows![4][0]]: 'مکمل اندرونی اوورلیپ (Nested Overlap)',
  [data.sections[5].blocks[1].rows![4][1]]: 'FVG2 مکمل طور پر FVG1 کے اندر ہے (یا برعکس)',
  [data.sections[5].blocks[1].rows![4][2]]: 'چھوٹا گیپ 100% BPR زون بناتا ہے اور ری ٹیسٹ کی حد مزید صاف اور تنگ کر دیتا ہے۔',

  // Section 7
  [data.sections[6].title]: '7. BPR بمقابلہ انورس FVG (IFVG) بمقابلہ آرڈر بلاک بمقابلہ بریکر بلاک',
  [data.sections[6].blocks[0].text!]:
    'سب سے عام الجھن بیلنسڈ پرائس رینج (BPR) کو انورس فیئر ویلیو گیپ (IFVG) سے ملا دینا ہے۔ اگرچہ یہ قریبی ہیں، لیکن مختلف شرائط ناپتے ہیں۔',
  [data.sections[6].blocks[1].text!]:
    'تکنیکی طور پر جب لیگ 2، لیگ 1 کے اندر سے مخالف FVG بناتی ہے تو لیگ 1 ٹوٹ کر الٹ بھی جاتا ہے۔ یوں ہر حقیقی BPR میں انورژن کا عنصر شامل ہوتا ہے — مگر ہر IFVG خودکار BPR نہیں بناتا۔ IFVG کے لیے صرف ایک FVG کے پار کینڈل باڈی کلوز کافی ہے، چاہے توڑنے والی حرکت پانچ عام کینڈلز میں بغیر کسی دوسرے گیپ کے گزری ہو۔',
  [data.sections[6].blocks[2].rows![0][0]]: 'PD اَرے حوالہ',
  [data.sections[6].blocks[2].rows![0][1]]: 'تشکیل کی شرط',
  [data.sections[6].blocks[2].rows![0][2]]: 'مڈپوائنٹ اصول',
  [data.sections[6].blocks[2].rows![0][3]]: 'عام مارکیٹ تناظر',
  [data.sections[6].blocks[2].rows![1][0]]: 'سنگل FVG',
  [data.sections[6].blocks[2].rows![1][1]]: 'ایک سمت میں 3 کینڈل گیپ',
  [data.sections[6].blocks[2].rows![1][2]]: '50% Consequent Encroachment (CE)',
  [data.sections[6].blocks[2].rows![1][3]]: 'ایک ٹرینڈ لیگ کے اندر پُل بیک تسلسل',
  [data.sections[6].blocks[2].rows![2][0]]: 'انورس FVG (IFVG)',
  [data.sections[6].blocks[2].rows![2][1]]: 'موجودہ FVG کے پار باڈی کلوز',
  [data.sections[6].blocks[2].rows![2][2]]: 'ٹوٹے ہوئے گیپ کا 50% CE',
  [data.sections[6].blocks[2].rows![2][3]]: 'سپورٹ سے مزاحمت یا مزاحمت سے سپورٹ کردار کی تبدیلی',
  [data.sections[6].blocks[2].rows![3][0]]: 'بیلنسڈ پرائس رینج (BPR)',
  [data.sections[6].blocks[2].rows![3][1]]: '2 مخالف 3 کینڈل FVGs کا باہمی اوورلیپ',
  [data.sections[6].blocks[2].rows![3][2]]: 'صرف اوورلیپنگ حصے کا 50%',
  [data.sections[6].blocks[2].rows![3][3]]: 'تیز V شکل سویپ اور ریورسل ایکویلیبریم',
  [data.sections[6].blocks[2].rows![4][0]]: 'آرڈر بلاک (OB)',
  [data.sections[6].blocks[2].rows![4][1]]: 'ڈسپلیسمنٹ سے پہلے آخری مخالف کینڈل/رن',
  [data.sections[6].blocks[2].rows![4][2]]: 'باڈی یا رینج کا 50% مین تھریشولڈ (MT)',
  [data.sections[6].blocks[2].rows![4][3]]: 'بڑے سوئنگ کی ابتدائی بنیاد',
  [data.sections[6].blocks[2].rows![5][0]]: 'بریکر بلاک',
  [data.sections[6].blocks[2].rows![5][1]]: 'لیکویڈیٹی سویپ کے بعد ٹوٹا ہوا ناکام سوئنگ OB',
  [data.sections[6].blocks[2].rows![5][2]]: 'ٹوٹے ہوئے رن کا 50% مین تھریشولڈ',
  [data.sections[6].blocks[2].rows![5][3]]: 'اسٹرکچرل اسٹاپ رن ریورسل زون',

  // Section 8
  [data.sections[7].title]: '8. RDRB (Redelivered Rebalanced) کیا ہے؟ پہلے ٹچ سے آگے کی کہانی',
  [data.sections[7].blocks[0].text!]:
    'جب ٹریڈر BPR کی پہچان پر عبور حاصل کر لیں تو اگلی اہم سطح RDRB ہے — جسے عام طور پر Redelivered Rebalanced (یا Redelivered Balanced Price Range) کہا جاتا ہے۔',
  [data.sections[7].blocks[1].text!]:
    'عام BPR مطالعہ اوورلیپنگ گیپس بننے کے فوراً بعد پہلے ری ٹیسٹ کو دیکھتا ہے، جبکہ RDRB اسی عین بیلنسڈ زون میں بعد کی دوسری واپسی کو بیان کرتا ہے۔ پہلے BPR بنتا ہے؛ دوم قیمت اسے ایک بار چھو کر اندرونی سوئنگ یا عبوری ہدف تک دور جاتی ہے؛ سوم قیمت بعد میں دوبارہ اسی BPR حصے میں واپس آتی ہے — یعنی ری بیلنسڈ زون میں دوسری ڈیلیوری۔',
  [data.sections[7].blocks[2].title!]: 'بعض ماہرین دوسری واپسی کا مطالعہ کیوں کرتے ہیں',
  [data.sections[7].blocks[2].text!]:
    'پہلا ٹچ جانچتا ہے کہ آیا اوورلیپ میں خریدار یا فروخت کنندہ ردعمل دیتے ہیں۔ جب پہلے ٹچ کے بعد قیمت واضح طور پر دور نکل جائے اور فعال سیشن میں صاف واپس آئے تو RDRB کے ناظرین پہلے ٹچ کو تصدیقی ثبوت سمجھتے ہیں — تاہم تھکاوٹ اور ٹوٹنا پھر بھی ممکن ہے۔',

  // Section 9
  [data.sections[8].title]: '9. RDRB ٹچ گنتی کے اصول اور مارکیٹ میکر کرو سے مطابقت',
  [data.sections[8].blocks[0].text!]:
    'اگر آپ چارٹ کھولنے سے پہلے ٹچ گننے کا اصول منجمد نہ کریں تو BPR کے اندر ہچکولے کھاتی چار کینڈلز بھی "دوسرا یا تیسرا ٹچ" لگنے لگتی ہیں۔ سخت علیحدگی شور کو روکتی ہے:',
  [data.sections[8].blocks[1].items![0]]:
    'وزٹ 0 (تشکیل): لیگ 1 اور لیگ 2 مل کر اوورلیپنگ BPR زون مکمل کرتی ہیں۔',
  [data.sections[8].blocks[1].items![1]]:
    'وزٹ 1 (ابتدائی ٹیسٹ): قیمت BPR میں واپس آتی ہے، ردعمل دیتی ہے، اور قریبی کنارے سے باہر نکل کر ایک واضح عبوری سوئنگ ہائی (لانگز کے لیے) یا سوئنگ لو (شارٹس کے لیے) توڑتی ہے۔',
  [data.sections[8].blocks[1].items![2]]:
    'علیحدگی کی شرط: قریبی کنارے سے باہر نکل کر نیا سوئنگ بنائے بغیر مستطیل کے اندر لرزتی مسلسل کینڈلز ایک ہی ٹیسٹ گنی جائیں گی — دو واپسیاں نہیں۔',
  [data.sections[8].blocks[1].items![3]]:
    'وزٹ 2 (RDRB ری ڈیلیوری): قیمت اس نئے ہائی (یا لو) سے پُل بیک کر کے دوبارہ سلامت BPR میں آتی ہے اور درمیان میں دور والی ان ویلیڈیشن حد کے پار کلوز نہیں کرتی۔',
  [data.sections[8].blocks[2].text!]:
    'غور کریں کہ RDRB قدرتی طور پر مارکیٹ میکر بائے اینڈ سیل ماڈلز (MMBM / MMSM) سے کیسے جڑتا ہے: BPR اکثر اسمارٹ منی ریورسل یا پہلی جمع کاری پر بنتا ہے، جبکہ RDRB واپسی کرو کے دوسرے حصے میں ری اکیومولیشن یا ری ڈسٹری بیوشن مرحلے جیسی ہوتی ہے۔',

  // Section 10
  [data.sections[9].title]: '10. انیگما FVG: پوشیدہ ڈیلیوری، والیوم امبیلنس اور حدوں کی حساسیت',
  [data.sections[9].blocks[0].text!]:
    '2025–2026 کے جدید فیوچرز تبصروں میں BPR اور FVG پروجیکشنز کے ساتھ انیگما (Enigma) کی اصطلاح آتی ہے۔ کسی جادوئی انڈیکیٹر کے بجائے، انیگما اس طریقے پر بحث کرتا ہے کہ جب ملحقہ کینڈل باڈیز، والیوم امبیلنس یا تنگ وِک اوورلیپس عام تین کینڈل باکس کو پیچیدہ بنا دیں تو پیمائش کیسے کی جائے۔',
  [data.sections[9].blocks[1].text!]:
    'عام FVG کینڈل 1 اور کینڈل 3 کی وِکس کے درمیان خالی جگہ چھوڑتا ہے۔ بعض اوقات وِکس معمولی مل جاتی ہیں جبکہ متصل کینڈل باڈیز کے درمیان اوپن ٹو کلوز خلا (والیوم امبیلنس) باقی رہتا ہے، یا تیز دو طرفہ گھماؤ درمیانی کینڈل کو دوبارہ برابر کر دیتا ہے۔ صرف وِک دیکھنے والے ٹریڈرز یہ اندرونی باڈی درزیں کھو دیتے ہیں۔',
  [data.sections[9].blocks[2].text!]:
    'انیگما طرز کی پیمائش پروجیکشن نکالنے سے پہلے بیرونی وِک کنارے کا موازنہ متصل باڈی گیپ حدوں سے کرتی ہے۔ دونوں پیمائشیں عین OHLC قیمتیں لیتی ہیں، مگر سرے کو چند ٹِکس سرکانے سے بھی آگے کے ہر تناسب کی قیمت بدل جاتی ہے۔',

  // Section 11
  [data.sections[10].title]: '11. انیگما پروجیکشن حساب اور پچھلے نتیجے پر فٹنگ سے بچاؤ',
  [data.sections[10].blocks[0].text!]:
    'کسی بھی مشق سے پہلے اینکر کی حساسیت کی ایک واضح عددی مثال دیکھیں۔ فرض کریں ایک Bullish FVG 104.00 سے 108.00 تک ہے (CE = 106.00) اور ڈسپلیسمنٹ کینڈل کی باڈی 100.00 پر کھلی:',
  [data.sections[10].blocks[1].items![0]]:
    'وِک پر مبنی اینکر (100.00 تا 108.00): ناپی گئی رینج 8.00 پوائنٹس ہے۔ 1.25 رینج ملٹی پلائیر لگانے سے 100.00 + (8.00 × 1.25) = 110.00 نکلتا ہے۔',
  [data.sections[10].blocks[1].items![1]]:
    'باڈی سے ایڈجسٹ اینکر (100.00 تا 107.75): متصل باڈی یا والیوم امبیلنس کی وجہ سے اوپری حد 107.75 لینے پر لمبائی 7.75 پوائنٹس رہتی ہے۔ وہی 1.25 ملٹی پلائیر اب 100.00 + (7.75 × 1.25) = 109.6875 دیتا ہے (0.25 فیوچرز ٹِک راؤنڈنگ کے بعد 109.75)۔',
  [data.sections[10].blocks[2].title!]: 'نتیجہ دیکھ کر سرے نہ بدلیں',
  [data.sections[10].blocks[2].text!]:
    'متصل والیوم امبیلنس اینکر بدلتا ہے یا نہیں اس کا فیصلہ ہدف پر قیمت پہنچنے سے پہلے ہونا چاہیے۔ 109.75 پر ریورسل دیکھنے کے بعد وِک اور باڈی میں تبدیلی دھوکہ دہ Hindsight درستگی پیدا کرتی ہے۔',

  // Section 12
  [data.sections[11].title]: '12. رینج کی موزونیت: مضبوط BPR کو درمیانی شور سے الگ کرنا',
  [data.sections[11].blocks[0].text!]:
    'سست دوپہر کی رینج میں اوپر نیچے جھولتی کینڈلز بھی تکنیکی طور پر اوورلیپنگ گیپس بنا سکتی ہیں۔ تجربہ کار قاری تین بنیادی شرائط مانگ کر 80% فضول اوورلیپس مسترد کر دیتے ہیں:',
  [data.sections[11].blocks[1].items![0]]:
    'سویپ بنیاد: لیگ 2 کسی واضح لیکویڈیٹی حوالے — جیسے گزشتہ سیشن ہائی/لو، ایکول ہائیز/لوز یا HTF PD اَرے — کے سویپ کے فوراً بعد شروع ہو۔',
  [data.sections[11].blocks[1].items![1]]:
    'طاقتور ڈسپلیسمنٹ + MSS: لیگ 2 رینگتی ہوئی واپس نہ آئے بلکہ کشادہ باڈیز کے ساتھ لیگ 1 اور لیگ 2 کے درمیانی سوئنگ کے پار کلوز کرے (واضح مارکیٹ اسٹرکچر شفٹ)۔',
  [data.sections[11].blocks[1].items![2]]:
    'پریمیم / ڈسکاؤنٹ تناظر: Bullish BPR ڈسکاؤنٹ (<50%) میں زیادہ منطقی ہے اور Bearish BPR پریمیم (>50%) میں۔',

  // Section 13
  [data.sections[12].title]: '13. PD اَرے ہم آہنگی: BPR + OTE + آرڈر بلاک + بریکر',
  [data.sections[12].blocks[0].text!]:
    'سب سے واضح چارٹ مقامات تب بنتے ہیں جب بیلنسڈ پرائس رینج اکیلا نہ ہو بلکہ بیک وقت دیگر PD اَریز کے اندر بیٹھا ہو:',
  [data.sections[12].blocks[1].rows![0][0]]: 'ہم آہنگی کی جوڑی',
  [data.sections[12].blocks[1].rows![0][1]]: 'زونز آپس میں کیسے ملتے ہیں',
  [data.sections[12].blocks[1].rows![0][2]]: 'ٹریڈرز اس اوورلیپ کو ترجیح کیوں دیتے ہیں',
  [data.sections[12].blocks[1].rows![1][0]]: 'BPR + OTE (0.62–0.79)',
  [data.sections[12].blocks[1].rows![1][1]]: 'BPR مڈپوائنٹ عین لیگ 2 سوئنگ کے 0.705 فبوناکی سویٹ اسپاٹ کے پاس ہوتا ہے',
  [data.sections[12].blocks[1].rows![1][2]]: 'سطحی اوورلیپس چھانٹ کر انٹری کو گہرے ڈسکاؤنٹ یا پریمیم میں رکھتا ہے',
  [data.sections[12].blocks[1].rows![2][0]]: 'BPR + آرڈر بلاک (OB)',
  [data.sections[12].blocks[1].rows![2][1]]: 'اوورلیپنگ گیپس مخالف OB کینڈل کے 50% مین تھریشولڈ کو گھیرتے ہیں',
  [data.sections[12].blocks[1].rows![2][2]]: 'کینڈل رن کی بنیاد کو دو طرفہ امبیلنس کے اوورلیپ سے جوڑتا ہے',
  [data.sections[12].blocks[1].rows![3][0]]: 'BPR + بریکر بلاک',
  [data.sections[12].blocks[1].rows![3][1]]: 'سویپ اور MSS والی لیگ ایک بریکر اور BPR کو ایک ہی پٹی میں بنا دیتی ہے',
  [data.sections[12].blocks[1].rows![3][2]]: 'ناکام بریک آؤٹ اسٹرکچر کو دو طرفہ گیپ ری بیلنسنگ سے ہم آہنگ کرتا ہے',

  // Section 14
  [data.sections[13].title]: '14. تین انٹری ٹرگرز: قریبی کنارہ، 50% مڈپوائنٹ لِمٹ اور LTF تصدیق',
  [data.sections[13].blocks[0].text!]:
    'اہل BPR یا RDRB بننے کے بعد ٹریڈرز اسپریڈ اور رسک برداشت کے مطابق تین میں سے ایک مکینیکل طریقہ استعمال کرتے ہیں:',
  [data.sections[13].blocks[1].rows![0][0]]: 'ٹرگر طریقہ',
  [data.sections[13].blocks[1].rows![0][1]]: 'عین انٹری قیمت',
  [data.sections[13].blocks[1].rows![0][2]]: 'خوبی',
  [data.sections[13].blocks[1].rows![0][3]]: 'سمجھوتہ / رسک',
  [data.sections[13].blocks[1].rows![1][0]]: '1. قریبی کنارے پر پَیسیو لِمٹ',
  [data.sections[13].blocks[1].rows![1][1]]: 'BPR_High (بلش) یا BPR_Low (بیئرش)',
  [data.sections[13].blocks[1].rows![1][2]]: 'ہلکے تیز ٹچز پر انٹری چھوٹنے نہیں دیتی',
  [data.sections[13].blocks[1].rows![1][3]]: 'دور کنارے تک وسیع اسٹاپ سے R-ملٹی پل کم ہوتا ہے',
  [data.sections[13].blocks[1].rows![2][0]]: '2. 50% BPR مڈپوائنٹ لِمٹ',
  [data.sections[13].blocks[1].rows![2][1]]: '(BPR_Low + BPR_High) ÷ 2',
  [data.sections[13].blocks[1].rows![2][2]]: 'متوازن فِل ریٹ اور تنگ ان ویلیڈیشن اسٹاپ',
  [data.sections[13].blocks[1].rows![2][3]]: 'بعض اوقات قیمت 50% تک آئے بغیر قریبی کنارے سے ہی پلٹ جاتی ہے',
  [data.sections[13].blocks[1].rows![3][0]]: '3. LTF MSS تصدیق',
  [data.sections[13].blocks[1].rows![3][1]]: 'BPR ٹچ کے بعد 1M/5M پر نئے LTF FVG کا انتظار',
  [data.sections[13].blocks[1].rows![3][2]]: 'سرمایہ لگانے سے پہلے براہِ راست ردعمل کی تصدیق',
  [data.sections[13].blocks[1].rows![3][3]]: 'دیر سے تصدیق تیز رفتار حرکت یا زیادہ سلپیج دے سکتی ہے',
  [data.sections[13].blocks[2].text!]:
    'اوپر انٹرایکٹو ہم آہنگی لیب میں دیکھیں کہ سویپ، MSS، PD مقام اور سیشن وقت کیسے عام اوورلیپس کو منظم سیٹ اپس سے الگ کرتے ہیں۔',

  // Section 15
  [data.sections[14].title]: '15. اسٹاپ پلیسمنٹ، دور کنارے کی ان ویلیڈیشن اور منافع کے اہداف',
  [data.sections[14].blocks[0].text!]:
    'یہ جاننا کہ BPR کب ناکام ہوا، انٹری ڈھونڈنے سے بھی زیادہ قیمتی ہے۔ BPR ایک محدود موٹائی کا زون ہے — خسارے والے خیال میں بنے رہنے کے لیے اسٹاپ کو مسلسل نہ سرکائیں۔',
  [data.sections[14].blocks[1].items![0]]:
    'محتاط اسٹرکچرل اسٹاپ: لیگ 2 شروع کرنے والی سوئنگ انتہا کے پار حفاظتی حد رکھیں (بلش کے لیے SSL سویپ لو کے نیچے، بیئرش کے لیے BSL سویپ ہائی کے اوپر)۔ یہ گہری وِک کو برداشت کر لیتا ہے۔',
  [data.sections[14].blocks[1].items![1]]:
    'تنگ BPR دور کنارے کا اسٹاپ: ان ویلیڈیشن BPR کے دور کنارے سے ذرا باہر رکھیں (بلش کے لیے BPR_Low سے نیچے، بیئرش کے لیے BPR_High سے اوپر) جمع واضح انسٹرومنٹ بفر۔ دور کنارے کے پار مکمل کینڈل کلوز BPR خیال باطل کر دیتا ہے۔',
  [data.sections[14].blocks[1].items![2]]:
    'منافع کے اہداف: مخالف بیرونی لیکویڈیٹی (PDH/PDL، سیشن ہائی/لو)، مخالف HTF FVGs یا لیگ 2 پر ناپی گئی -0.27 اور -0.62 رینج ایکسٹینشنز پر مرحلہ وار بکنگ کریں۔',
  [data.sections[14].blocks[2].title!]: 'آرڈر عملدرآمد کی یاد دہانی',
  [data.sections[14].blocks[2].text!]:
    'BPR_Low سے باہر رکھا Stop-Market آرڈر متحرک ہوتے ہی مارکیٹ آرڈر بن جاتا ہے اور تیز حرکت میں سلپیج دے سکتا ہے؛ Stop-Limit آرڈر تیز خلا میں اَن فِل رہنے کا خطرہ رکھتا ہے۔',

  // Section 16
  [data.sections[15].title]: '16. ملٹی ٹائم فریم نیسٹڈ BPR: Daily/4H کو 15M/5M سے جوڑنا',
  [data.sections[15].blocks[0].text!]:
    'BPR ہر ٹائم فریم پر بنتے ہیں مگر سب کا وزن برابر نہیں۔ 4 گھنٹے کے عدم توازن کے خلاف 1 منٹ کا BPR محض ایک لمحاتی رکاوٹ بن کر ٹوٹ جاتا ہے۔',
  [data.sections[15].blocks[1].text!]:
    'ٹاپ ڈاؤن تجزیہ کار پہلے غالب Daily یا 4H BPR (یا HTF لیکویڈیٹی ہدف) نشان زد کرتے ہیں، پھر قیمت کے اس HTF زون میں داخل ہونے پر 15M یا 5M پر آتے ہیں۔ جب لندن یا نیویارک صبح میں 4H Bullish BPR کے اندر 5M Bullish BPR یا RDRB بنے تو بڑا تناظر اور چھوٹا ٹرگر ایک صف میں ہوتے ہیں۔',

  // Section 17
  [data.sections[16].title]: '17. سیشن اوقات، کِل زونز اور ہائی ریزسٹنس چوپ فلٹرز',
  [data.sections[16].blocks[0].text!]:
    'وقت قیمت کی جیومیٹری کی تصدیق کرتا ہے۔ ہمیشہ تاریخ کے مطابق America/New_York مقامی وقت استعمال کریں تاکہ Daylight Saving کی تبدیلیاں سیشن غلط نہ کریں:',
  [data.sections[16].blocks[1].items![0]]:
    'لندن اوپن (02:00–05:00 NY) اور نیویارک AM (08:30–11:00 NY): سب سے زیادہ فعال والیوم اوقات جہاں سویپ اور MSS والے BPR صاف بیرونی لیکویڈیٹی تک پہنچتے ہیں۔',
  [data.sections[16].blocks[1].items![1]]:
    'سست لنچ / دیر ایشیا کھڑکیاں: 12:00–13:00 NY لنچ یا سست ایشیا میں بننے والے چھوٹے اوورلیپس عموماً سمتی عزم کے بجائے عام بے سمت شور ہوتے ہیں۔',
  [data.sections[16].blocks[1].items![2]]:
    'بڑی خبروں کی اتار چڑھاؤ (CPI، NFP، FOMC): طے شدہ معاشی رپورٹس ملی سیکنڈز میں BPR کے دونوں کنارے چیر دیتی ہیں؛ خبر کے وقت الگ رہیں یا بعد کے استحکام کا انتظار کریں۔',

  // Section 18
  [data.sections[17].title]: '18. انسٹرومنٹ کیلیبریشن: NQ/ES فیوچرز بمقابلہ EUR/USD بمقابلہ XAU/USD',
  [data.sections[17].blocks[0].text!]:
    'ایک مارکیٹ کا ٹِک بفر دوسری مارکیٹ پر آنکھ بند کر کے نقل نہ کریں۔ ہر انسٹرومنٹ میں اسپریڈ، ٹِک سائز اور وِک رویہ الگ ہوتا ہے:',
  [data.sections[17].blocks[1].rows![0][0]]: 'انسٹرومنٹ',
  [data.sections[17].blocks[1].rows![0][1]]: 'کم از کم ٹِک اور قیمت',
  [data.sections[17].blocks[1].rows![0][2]]: 'عام BPR رویہ',
  [data.sections[17].blocks[1].rows![0][3]]: 'عملی بفر نوٹ',
  [data.sections[17].blocks[1].rows![1][0]]: 'MNQ / NQ فیوچرز',
  [data.sections[17].blocks[1].rows![1][1]]: '0.25 انڈیکس پوائنٹ ($0.50 MNQ / $5.00 NQ)',
  [data.sections[17].blocks[1].rows![1][2]]: '09:30 کے تیز سویپس اور باریک 50% مڈپوائنٹ ٹچ',
  [data.sections[17].blocks[1].rows![1][3]]: 'BPR_50% کو قریبی 0.25 ٹِک پر راؤنڈ کریں اور دور کنارے سے 2–4 پوائنٹ بفر رکھیں',
  [data.sections[17].blocks[1].rows![2][0]]: 'ES / MES فیوچرز',
  [data.sections[17].blocks[1].rows![2][1]]: '0.25 انڈیکس پوائنٹ ($1.25 MES / $12.50 ES)',
  [data.sections[17].blocks[1].rows![2][2]]: 'باقاعدہ اوقات میں قریبی کنارے کا سخت احترام',
  [data.sections[17].blocks[1].rows![2][3]]: 'ES BPR پر بھروسے سے پہلے NQ کے ساتھ SMT ڈائیورجنس چیک کریں',
  [data.sections[17].blocks[1].rows![3][0]]: 'EUR/USD اسپاٹ FX',
  [data.sections[17].blocks[1].rows![3][1]]: '0.00001 پپِٹ (0.0001 پپ)',
  [data.sections[17].blocks[1].rows![3][2]]: 'لندن اور نیویارک میں صاف 50% وسط کی درستگی',
  [data.sections[17].blocks[1].rows![3][3]]: '17:00 NY رول اوور پر بروکر اسپریڈ پھیلاؤ کا حساب رکھیں',
  [data.sections[17].blocks[1].rows![4][0]]: 'XAU/USD (گولڈ)',
  [data.sections[17].blocks[1].rows![4][1]]: 'CFD بروکر بمقابلہ COMEX GC فیوچرز ($0.10 ٹِک) مختلف',
  [data.sections[17].blocks[1].rows![4][2]]: 'لمبی وِکس اکثر BPR کے دور کنارے چیر دیتی ہیں',
  [data.sections[17].blocks[1].rows![4][3]]: 'باڈی کلوز ان ویلیڈیشن یا وسیع سویپ اسٹاپ کو ترجیح دیں',

  // Section 19
  [data.sections[18].title]: '19. حل شدہ بلش مثال: فرضی NQ فیوچرز BPR + RDRB مرحلہ وار نقشہ',
  [data.sections[18].blocks[0].text!]:
    'آئیے نیویارک AM کھڑکی میں ایک مکمل فرضی NQ بلش مطالعہ قدم بہ قدم دیکھتے ہیں (تمام قیمتیں تدریسی مثالیں ہیں):',
  [data.sections[18].blocks[1].items![0]]:
    '09:32 NY (لیگ 1 SIBI): قیمت 20,470 سے تیزی سے گر کر 20,426 تک آتی ہے اور 20,440.00 تا 20,460.00 میں Bearish FVG چھوڑتی ہے (چوڑائی 20.00 پوائنٹس)۔',
  [data.sections[18].blocks[1].items![1]]:
    '09:38 NY (لیکویڈیٹی سویپ): قیمت صبح کے سوئنگ لو کے نیچے 20,418.00 تک اتر کر سیل سائیڈ اسٹاپس نکالتی ہے۔',
  [data.sections[18].blocks[1].items![2]]:
    '09:42 NY (لیگ 2 BISI + MSS): طاقتور بلش ڈسپلیسمنٹ 20,464.00 سوئنگ ہائی کے اوپر کلوز کرتے ہوئے 20,432.00 تا 20,454.00 کا Bullish FVG بناتی ہے۔',
  [data.sections[18].blocks[1].items![3]]:
    'BPR اوورلیپ حساب: BPR_Low = max(20440, 20432) = 20,440.00؛ BPR_High = min(20460, 20454) = 20,454.00؛ 50% مڈپوائنٹ = 20,447.00 (لیگ 1 کا 70% اوورلیپ)۔',
  [data.sections[18].blocks[1].items![4]]:
    'وزٹ 1 اور RDRB وزٹ 2: قیمت 20,449.00 پر پہلا ٹچ کرتی ہے، 20,476.00 تک نکل کر عبوری ہائی توڑتی ہے، اور پھر 10:08 NY پر پرسکون واپس آ کر 20,446.50 پر 50% BPR مڈپوائنٹ چھو کر 20,489.00 کی جانب بڑھتی ہے۔',

  // Section 20
  [data.sections[19].title]: '20. حل شدہ بیئرش مثال: فرضی EUR/USD BPR اور عام غلطیوں کی گیلری',
  [data.sections[19].blocks[0].text!]:
    'اب لندن سے نیویارک سیشن کے ایک فرضی EUR/USD کیس میں سمت کو الٹا کر کے دیکھتے ہیں:',
  [data.sections[19].blocks[1].items![0]]:
    'لیگ 1 Bullish FVG (BISI): EUR/USD تیزی سے 1.08420 اور 1.08620 کے درمیان اوپر جاتا ہے (20.0 پپس)۔',
  [data.sections[19].blocks[1].items![1]]:
    'بائے سائیڈ سویپ: قیمت ایشین ہائیز کے اوپر 1.08840 تک پہنچ کر تھم جاتی ہے۔',
  [data.sections[19].blocks[1].items![2]]:
    'لیگ 2 Bearish FVG (SIBI + MSS): قیمت تیزی سے گر کر 1.08450 اسٹرکچر توڑتی ہے اور 1.08460 تا 1.08680 میں Bearish FVG بناتی ہے۔',
  [data.sections[19].blocks[1].items![3]]:
    'بیئرش BPR حساب: BPR_Low = max(1.08420, 1.08460) = 1.08460؛ BPR_High = min(1.08620, 1.08680) = 1.08620؛ 50% BPR مڈپوائنٹ = 1.08540 (16.0 پپ بینڈ)۔',
  [data.sections[19].blocks[1].items![4]]:
    'عملدرآمد اور ان ویلیڈیشن: قیمت پریمیم کے اندر 1.08545 (50% BPR مڈپوائنٹ) تک پلٹ کر 1.08150 سیل سائیڈ لیکویڈیٹی کی طرف گرتی ہے۔ 1.08620 کے اوپر کوئی بھی 5M کینڈل کلوز اس بیئرش خیال کو فوری باطل کر دے گا۔',

  // Section 21
  [data.sections[20].title]: '21. بیلنسڈ پرائس رینج اور RDRB کی چھ عام غلطیاں جن سے بچنا ہے',
  [data.sections[20].blocks[0].items![0]]:
    'بغیر اوورلیپ والے گیپس کو BPR بنانا: خالی فاصلے سے جدا دو گیپس کو جوڑنا max(L1, L2) < min(H1, H2) کے اصول کی خلاف ورزی ہے۔',
  [data.sections[20].blocks[0].items![1]]:
    'پوری دو لیگ والی رینج پر باکس کھینچنا: صرف 20,440–20,454 مشترک حصے کے بجائے پورا 20,432–20,460 باکس بنانا اسٹاپ فاصلہ بڑھاتا اور مڈپوائنٹ بگاڑتا ہے۔',
  [data.sections[20].blocks[0].items![2]]:
    'کم والیوم لنچ شور میں اوورلیپس پر ٹریڈ کرنا: 12:30 NY کی کنسولیڈیشن کے 3 ٹِک والے اوورلیپس میں سویپ بنیاد اور ڈسپلیسمنٹ نہیں ہوتی۔',
  [data.sections[20].blocks[0].items![3]]:
    'غالب بڑے ٹائم فریم کو نظرانداز کرنا: تازہ 4H Bearish BPR کے عین نیچے بننے والا 5M Bullish BPR خریدنا۔',
  [data.sections[20].blocks[0].items![4]]:
    'ایک ہی ہلچل کو RDRB دوسرا وزٹ گننا: درمیانی سوئنگ توڑے بغیر BPR میں لرزتی چار کینڈلز کو دوسرا ٹچ مان لینا۔',
  [data.sections[20].blocks[0].items![5]]:
    'دور کنارے کے پار کلوز کے بعد بھی ضد پر اڑے رہنا: BPR_Low سے نیچے فیصلہ کن کلوز کے بعد بھی لانگ پکڑے رکھنا۔',

  // Section 22
  [data.sections[21].title]: '22. انٹرایکٹو BPR اور RDRB موزونیت چیک لسٹ',
  [data.sections[21].blocks[0].text!]:
    'ری پلے میں کسی بھی بیلنسڈ پرائس رینج یا RDRB سیٹ اپ کو ریکارڈ کرنے سے پہلے نیچے تمام چھ اسٹرکچرل شرائط کی تصدیق کریں:',

  // Section 23 (Glossary)
  [data.sections[22].title]: '23. مکمل BPR، RDRB اور انیگما لغت (24 اصطلاحات)',
  [data.sections[22].blocks[0].text!]:
    'تمام بنیادی اور جدید اصطلاحات کو ساتھ ساتھ دیکھیں تاکہ چارٹ لیبلز، جیومیٹری کے اصول اور حدود واضح رہیں۔',
  [data.sections[22].blocks[1].rows![0][0]]: 'اصطلاح',
  [data.sections[22].blocks[1].rows![0][1]]: 'تعریف',
  'Balanced Price Range (BPR)': 'بیلنسڈ پرائس رینج (BPR)',
  'The overlapping price interval formed when two opposing three-candle Fair Value Gaps intersect.':
    'قیمت کا وہ مشترکہ حصہ جو دو مخالف تین کینڈل فیئر ویلیو گیپس کے باہمی اوورلیپ پر بنتا ہے۔',
  'Bullish BPR': 'بلش BPR',
  'A Bearish FVG overlapped upward by a Bullish FVG; studied as potential support toward higher draws.':
    'Bearish FVG جس پر اوپر کی جانب Bullish FVG اوورلیپ ہو؛ بالائی اہداف کے لیے ممکنہ سپورٹ۔',
  'Bearish BPR': 'بیئرش BPR',
  'A Bullish FVG overlapped downward by a Bearish FVG; studied as potential resistance toward lower draws.':
    'Bullish FVG جس پر نیچے کی جانب Bearish FVG اوورلیپ ہو؛ نچلے اہداف کے لیے ممکنہ مزاحمت۔',
  '50% BPR Midpoint': '50% BPR مڈپوائنٹ',
  'The arithmetic average (BPR_Low + BPR_High) ÷ 2 marking equilibrium of the overlapping core.':
    'اوورلیپنگ کور کے وسط کو ظاہر کرنے والا حسابی اوسط (BPR_Low + BPR_High) ÷ 2۔',
  'BPR_Low / BPR_High': 'BPR_Low / BPR_High حدود',
  'Respectively max(FVG1_Low, FVG2_Low) and min(FVG1_High, FVG2_High) defining the exact intersection.':
    'بالترتیب max(FVG1_Low, FVG2_Low) اور min(FVG1_High, FVG2_High) جو عین اوورلیپ طے کرتے ہیں۔',
  'RDRB (Redelivered Rebalanced)': 'RDRB (ری ڈیلیورڈ ری بیلنسڈ)',
  'Descriptive label for a second clean revisit into a BPR after an initial reaction and swing separation.':
    'پہلے ردعمل اور سوئنگ کی علیحدگی کے بعد BPR میں دوسری صاف واپسی کے لیے وضاحتی نام۔',
  'Enigma FVG': 'انیگما FVG',
  'Study label addressing wick vs. adjacent body-gap boundaries and anchored projections (such as 1.25x).':
    'وِک بمقابلہ متصل باڈی گیپ حدوں اور اینکر شدہ پروجیکشنز (جیسے 1.25x) سے متعلق مطالعاتی اصطلاح۔',
  'Fair Value Gap (FVG)': 'فیئر ویلیو گیپ (FVG)',
  'A three-candle price imbalance where Candle 1 and Candle 3 wicks leave an untraded span across Candle 2.':
    'تین کینڈلز کا قیمت عدم توازن جہاں کینڈل 1 اور 3 کی وِکس کینڈل 2 پر خالی حصہ چھوڑیں۔',
  'BISI (Buyside Imbalance Sellside Inefficiency)': 'BISI (بائے سائیڈ امبیلنس سیل سائیڈ اِن ایفیشنسی)',
  'A bullish three-candle FVG formed during energetic upward displacement.':
    'تیز رفتار اوپر کی ڈسپلیسمنٹ میں بننے والا بلش تین کینڈل FVG۔',
  'SIBI (Sellside Imbalance Buyside Inefficiency)': 'SIBI (سیل سائیڈ امبیلنس بائے سائیڈ اِن ایفیشنسی)',
  'A bearish three-candle FVG formed during energetic downward displacement.':
    'تیز رفتار نیچے کی ڈسپلیسمنٹ میں بننے والا بیئرش تین کینڈل FVG۔',
  'Inverse Fair Value Gap (IFVG)': 'انورس فیئر ویلیو گیپ (IFVG)',
  'A single FVG breached on a closing basis and monitored as an opposite-role support/resistance reference.':
    'ایک FVG جو کلوزنگ کی بنیاد پر ٹوٹ کر مخالف کردار کا سپورٹ یا مزاحمت حوالہ بن جائے۔',
  'Volume Imbalance (VI)': 'والیوم امبیلنس (VI)',
  'An open-to-close gap between two adjacent candle bodies where wicks still overlap.':
    'دو متصل کینڈل باڈیز کے درمیان اوپن ٹو کلوز خلا جہاں وِکس اب بھی ملتی ہوں۔',
  'Consequent Encroachment (CE)': 'کنسیکوئنٹ انکروچمنٹ (CE)',
  'The exact 50% midpoint of a single Fair Value Gap, wick, or opening gap.':
    'کسی ایک فیئر ویلیو گیپ، وِک یا اوپننگ گیپ کا عین 50% وسط۔',
  'Sequential Rebalance': 'ترتیب وار ری بیلنس',
  'Non-overlapping opposite moves that fill one gap before opening another; produces no BPR intersection.':
    'بغیر اوورلیپ والی مخالف حرکتیں جو ایک گیپ بھر کر نیا گیپ کھولیں؛ ان سے BPR نہیں بنتا۔',
  'Contained Nested Overlap': 'مکمل اندرونی اوورلیپ',
  'When the second opposing FVG falls completely within the vertical boundaries of the first FVG.':
    'جب دوسرا مخالف FVG مکمل طور پر پہلے FVG کی عمودی حدود کے اندر سما جائے۔',
  'Touch-Point Kiss': 'نقطہ ٹکراؤ (Touch-Point Kiss)',
  'Boundary case where max(L1, L2) equals min(H1, H2), leaving zero zone thickness.':
    'وہ سرحدی صورت جہاں max(L1, L2) برابر ہو min(H1, H2) کے اور زون کی موٹائی صفر ہو۔',
  'Liquidity Sweep': 'لیکویڈیٹی سویپ',
  'Price excursion beyond a resting swing high/low prior to the opposing displacement leg.':
    'مخالف ڈسپلیسمنٹ لیگ سے پہلے قریبی سوئنگ ہائی یا لو کے پار قیمت کا اخراج۔',
  'Market Structure Shift (MSS)': 'مارکیٹ اسٹرکچر شفٹ (MSS)',
  'Energetic break beyond a prior swing high or low separating Leg 1 from Leg 2.':
    'لیگ 1 کو لیگ 2 سے الگ کرنے والے سابق سوئنگ ہائی یا لو کے پار طاقتور بریک۔',
  'Near Edge': 'قریبی کنارہ',
  'The boundary of the BPR touched first on pullback (BPR_High for longs, BPR_Low for shorts).':
    'پُل بیک پر BPR کی وہ حد جو سب سے پہلے چھوئی جائے (لانگز میں BPR_High، شارٹس میں BPR_Low)۔',
  'Far Edge Invalidation': 'دور کنارے کی ان ویلیڈیشن',
  'The outer exit edge of the BPR (BPR_Low for longs, BPR_High for shorts) whose clean breach negates the zone.':
    'BPR کا بیرونی کنارہ (لانگز میں BPR_Low، شارٹس میں BPR_High) جس کا صاف ٹوٹنا زون کو باطل کر دے۔',
  'Visit Separation Rule': 'وزٹ علیحدگی کا اصول',
  'Requirement that Visit 1 exit the BPR and break an interim swing before counting a Visit 2 RDRB.':
    'یہ شرط کہ وزٹ 2 RDRB گننے سے پہلے وزٹ 1، BPR سے نکل کر ایک عبوری سوئنگ توڑے۔',
  'Anchored Projection': 'اینکر شدہ پروجیکشن',
  'Forward range multiple frozen using pre-outcome open/wick/body boundaries to test targets without hindsight.':
    'نتیجے سے پہلے اوپن/وِک/باڈی حدود پر منجمد کیا گیا رینج ملٹی پلائیر تاکہ تعصب کے بغیر ہدف جانچا جا سکے۔',
  'Hindsight Anchor Drift': 'نتیجے کے بعد اینکر بدلنا',
  'Error of switching between wick and body endpoints after seeing where price later stopped.':
    'قیمت کے رکنے کا مقام دیکھ کر بعد میں وِک اور باڈی کے سرے بدل دینے کی غلطی۔',
  'Nested MTF BPR': 'نیسٹڈ ملٹی ٹائم فریم BPR',
  'A lower-timeframe (5M/15M) BPR aligned inside an active higher-timeframe (4H/Daily) BPR or PD array.':
    'بڑے ٹائم فریم (4H/Daily) کے فعال BPR یا PD اَرے کے اندر بیٹھا ہوا چھوٹے ٹائم فریم (5M/15M) کا BPR۔',

  // Section 24 (Preserved verbatim baseline + Urdu matches mentorships-urdu.json)
  [data.sections[23].title]: '24. محفوظ مطالعاتی حدود، اینکر کی تصدیق اور ادارہ جاتی حوالہ جات',
  'These notes use RDRB descriptively for a later revisit to a selected balanced-price reference. A precise originating explanation for the previous named second-touch model has not been verified. Keep this limitation visible instead of attributing a universal second-touch rule to ICT.':
    'یہ نوٹس RDRB کو منتخب بیلنسڈ پرائس حوالے تک بعد کی واپسی کا وضاحتی نام استعمال کرتے ہیں۔ پچھلے مخصوص دوسرے ٹچ ماڈل کی اصل ابتدائی وضاحت تصدیق شدہ نہیں۔ ICT سے ہر صورت دوسرے ٹچ کا اصول منسوب کرنے کے بجائے یہ حد واضح رکھیں۔',
  'An overlap of selected opposing FVG price intervals is chart geometry. It does not prove that every order was matched, that the order book is empty or that an institution will defend the midpoint. Number the revisits with a stated rule: consecutive candles inside one visit are not automatically separate touches.':
    'منتخب مخالف FVG قیمت کے حصوں کا ایک دوسرے پر آنا چارٹ کی ساخت ہے۔ یہ ہر آرڈر کے میچ ہونے، خالی آرڈر بک یا ادارے کے وسط کا دفاع کرنے کا ثبوت نہیں۔ واضح اصول سے واپسیوں کو نمبر دیں: ایک ہی واپسی کے اندر مسلسل کینڈلز خودکار الگ ٹچ نہیں۔',
  'The reviewed June 2026 Enigma lecture discusses FVG measurements, volume imbalances and projections into a price range that has not yet traded. It identifies the middle candle of a three-candle FVG and distinguishes wick-based and body-based measurements. It does not establish the previous two-candle FVG definition on this page.':
    'زیر جائزہ جون 2026 کا اینگما لیکچر FVG کی پیمائش، والیوم امبیلنس اور ابھی ٹریڈ نہ ہونے والی قیمت کی رینج میں پروجیکشن پر گفتگو کرتا ہے۔ یہ تین کینڈلز والے FVG کی درمیانی کینڈل پہچانتا اور وِکس اور باڈیز کی پیمائش الگ کرتا ہے۔ یہ اس صفحے کی پچھلی دو کینڈلز والے FVG کی تعریف ثابت نہیں کرتا۔',
  'An implied or unrealized dealing range is a proposed future interval, not an interval price has already traversed. Freeze the anchor prices and target before exposing later candles. The source illustrates different measurement boundaries and a 1.25 projection in a particular example; this is not a compulsory ratio for all instruments or proof of a target’s likelihood.':
    'امپلائیڈ یا اَن ریئلائزڈ ڈیلنگ رینج مستقبل کا تجویز کردہ دورانیہ ہے، ایسا حصہ نہیں جس سے قیمت گزر چکی ہو۔ بعد کی کینڈلز دکھانے سے پہلے اینکر قیمتیں اور ہدف مقرر کریں۔ ماخذ ایک مخصوص مثال میں پیمائش کی مختلف حدود اور 1.25 پروجیکشن دکھاتا ہے؛ یہ تمام آلات کا لازمی تناسب یا ہدف کے امکان کا ثبوت نہیں۔',
  'Compare first and later visits using the same entry, expiry, invalidation and costs. Preserve zones that failed on their first test instead of excluding them after the fact. A second reaction does not by itself establish lower drawdown, a higher win rate or permission to increase risk.':
    'پہلی اور بعد کی واپسیوں کا ایک ہی انٹری، مدت، غلط ہونے کی شرط اور اخراجات سے موازنہ کریں۔ پہلے ٹیسٹ پر ناکام زونز بعد میں خارج کرنے کے بجائے محفوظ رکھیں۔ دوسرا ردعمل خود کم ڈرا ڈاؤن، زیادہ کامیابی کی شرح یا رسک بڑھانے کی اجازت ثابت نہیں کرتا۔',
  'The lecture’s examples and the instructor’s claims are not an independently verified statistical sample. State which candle information existed at the decision time: a completed FVG, a wick and a projected future boundary become available at different moments. Test missed targets, changed anchors and losses as well as successful examples.':
    'لیکچر کی مثالیں اور استاد کے دعوے آزادانہ تصدیق شدہ شماریاتی نمونہ نہیں۔ واضح کریں فیصلے کے وقت کینڈل کی کون سی معلومات موجود تھیں: مکمل FVG، وِک اور مستقبل کی تجویز کردہ حد مختلف اوقات میں دستیاب ہوتی ہیں۔ کامیاب مثالوں کے ساتھ ہدف تک نہ پہنچنا، اینکر کی تبدیلی اور نقصانات بھی جانچیں۔',

  // Section 25 & FAQs
  [data.sections[24].title]: '25. بیلنسڈ پرائس رینج (BPR)، RDRB اور انیگما سے متعلق عام سوالات',
  [data.sections[24].blocks[0].text!]:
    'اوورلیپنگ FVGs، RDRB واپسی اور انیگما اینکر اصولوں پر ابتدائی، درمیانی اور جدید طلبہ کے بارہ سب سے عام سوالات کے جامع جوابات پڑھیں۔',
  [data.faqs[0].question]: 'آسان الفاظ میں بیلنسڈ پرائس رینج (BPR) کیا ہے؟',
  [data.faqs[0].answer]:
    'بیلنسڈ پرائس رینج (BPR) قیمت کا وہ عین اوورلیپنگ بینڈ ہے جو دو مخالف تین کینڈل فیئر ویلیو گیپس کے باہمی ٹکراؤ سے بنتا ہے، جب قیمت ایک سمت میں تیز حرکت کے فوراً بعد مخالف سمت میں اسی حصے سے گزر کر دوسرا گیپ بنا دے۔',
  [data.faqs[1].question]: 'BPR اور اس کا 50% مڈپوائنٹ درست طریقے سے کیسے ناپیں؟',
  [data.faqs[1].answer]:
    'نچلی حد max(FVG1_Low, FVG2_Low) اور بالائی حد min(FVG1_High, FVG2_High) لیں۔ باکس صرف تب بنائیں جب BPR_Low < BPR_High ہو، پھر 50% وسط (BPR_Low + BPR_High) ÷ 2 پر لگائیں۔',
  [data.faqs[2].question]: 'یہ کیسے پتا چلے کہ BPR بلش ہے یا بیئرش؟',
  [data.faqs[2].answer]:
    'ترتیب دیکھیں: دوسری، زیادہ حالیہ ڈسپلیسمنٹ لیگ سمت طے کرتی ہے۔ Bearish FVG پر اوپر جاتا ہوا Bullish FVG ملے تو Bullish BPR بنتا ہے، اور Bullish FVG پر نیچے آتا ہوا Bearish FVG ملے تو Bearish BPR۔',
  [data.faqs[3].question]: 'BPR اور انورس FVG (IFVG) میں بنیادی فرق کیا ہے؟',
  [data.faqs[3].answer]:
    'IFVG تب بنتا ہے جب ایک FVG کلوزنگ سے ٹوٹ کر کردار بدل لے، خواہ توڑنے والی حرکت نے دوسرا گیپ نہ بنایا ہو۔ BPR کے لیے لازمی ہے کہ دو مخالف تین کینڈل FVGs آپس میں جسمانی طور پر اوورلیپ ہوں۔',
  [data.faqs[4].question]: 'RDRB کا کیا مطلب ہے اور یہ عام BPR سے کیسے مختلف ہے؟',
  [data.faqs[4].answer]:
    'RDRB سے مراد Redelivered Rebalanced ہے۔ عام BPR پہلے ٹچ پر ردعمل دیکھتا ہے جبکہ RDRB پہلے ٹچ اور عبوری سوئنگ کے بعد اسی BPR زون میں دوسری صاف واپسی کو بیان کرتا ہے۔',
  [data.faqs[5].question]: 'کیا RDRB پہلے ٹچ سے کم ڈرا ڈاؤن یا زیادہ ون ریٹ کی ضمانت دیتا ہے؟',
  [data.faqs[5].answer]:
    'نہیں۔ دوسرا ردعمل کم ڈرا ڈاؤن، زیادہ ون ریٹ یا یقینی ہولڈ ثابت نہیں کرتا۔ ہر مطالعے میں یکساں اخراجات اور ان ویلیڈیشن کے ساتھ پہلے یا دوسرے ٹیسٹ پر ناکام زونز کو برقرار رکھنا ضروری ہے۔',
  [data.faqs[6].question]: 'انیگما FVG کیا ہے اور اس کا والیوم امبیلنس سے کیا تعلق ہے؟',
  [data.faqs[6].answer]:
    'انیگما پیمائش کی باریک حدود — خاص طور پر عام وِک کناروں اور متصل باڈی گیپس (والیوم امبیلنس) میں فرق اور 1.25x جیسی اینکر پروجیکشنز کو بعد از واقعہ تبدیلی کے بغیر جانچنے پر توجہ دیتا ہے۔',
  [data.faqs[7].question]: 'BPR ٹریڈ پر حفاظتی اسٹاپ لاس کہاں رکھنا چاہیے؟',
  [data.faqs[7].answer]:
    'دو بنیادی طریقے ہیں: تنگ ان ویلیڈیشن BPR کے دور کنارے کے پار (لانگز کے لیے BPR_Low سے نیچے یا شارٹس کے لیے BPR_High سے اوپر بفر سمیت)، یا لیگ 2 شروع کرنے والی سوئنگ انتہا کے پار اسٹرکچرل اسٹاپ۔',
  [data.faqs[8].question]: 'کون سی چیز بیلنسڈ پرائس رینج کو مکمل طور پر باطل کر دیتی ہے؟',
  [data.faqs[8].answer]:
    'کلوزنگ اصولوں کے تحت، اوورلیپنگ بینڈ کے دور کنارے سے پار مکمل کینڈل باڈی کا کلوز (Bullish BPR میں BPR_Low سے نیچے یا Bearish BPR میں BPR_High سے اوپر) فعال BPR مفروضے کو ختم کر دیتا ہے۔',
  [data.faqs[9].question]: 'کیا صرف ایک ٹِک پر ملنے والے دو FVGs مل کر BPR بنا سکتے ہیں؟',
  [data.faqs[9].answer]:
    'نہیں۔ اگر max(FVG1_Low, FVG2_Low) برابر ہو min(FVG1_High, FVG2_High) کے تو عمودی موٹائی صفر رہتی ہے۔ ایسے گیپس کو ترتیب وار الگ حوالے سمجھیں، اوورلیپنگ BPR نہیں۔',
  [data.faqs[10].question]: 'کیا BPR یہ ثابت کرتا ہے کہ اداروں نے تمام باقی آرڈرز صاف کر دیے؟',
  [data.faqs[10].answer]:
    'نہیں۔ مخالف اوورلیپنگ FVGs تیز دو طرفہ حرکت کی چارٹ جیومیٹری ہیں۔ کینڈل چارٹ آرڈر بک کی گہرائی، شرکاء کی شناخت یا مستقبل کے دفاع کی ضمانت نہیں دکھاتا۔',
  [data.faqs[11].question]: 'BPR اور RDRB کے مطالعے کے لیے کون سے اوقات اور ٹائم فریم بہتر ہیں؟',
  [data.faqs[11].answer]:
    'پہلے Daily/4H یا 1H پر بڑا تناظر دیکھیں، پھر فعال لندن اوپن (02:00–05:00 NY) یا نیویارک AM (08:30–11:00 NY) میں 15M/5M BPR اوورلیپس کا مطالعہ کریں اور سست دوپہر سے گریز کریں۔',

  // Institutional Sources
  'Investor.gov (SEC) — Stop Order': 'Investor.gov (SEC) — اسٹاپ آرڈر',
  'Explains why stock stop-market orders become market orders upon trigger and may execute away from planned invalidation levels outside BPR boundaries.':
    'وضاحت کرتا ہے کہ اسٹاپ مارکیٹ آرڈر متحرک ہونے پر مارکیٹ آرڈر کیوں بنتے ہیں اور BPR حدود کے باہر طے شدہ سطح سے ہٹ کر فِل ہو سکتے ہیں۔',
  'Investor.gov (SEC) — Types of Orders & Limit Mechanics': 'Investor.gov (SEC) — آرڈرز کی اقسام اور لِمٹ میکانزم',
  'Details limit-order price ceilings vs. execution risk when passive orders sit at a BPR near edge or 50% equilibrium midpoint.':
    'BPR کے قریبی کنارے یا 50% مڈپوائنٹ پر پَیسیو لِمٹ آرڈرز کی قیمت کی حد اور فِل نہ ہونے کے خطرے کی تفصیل۔',
  'CME Group — Micro E-mini Nasdaq-100 Contract Specs': 'CME Group — مائیکرو E-mini نیسڈیک 100 کنٹریکٹ تفصیلات',
  'MNQ trades in 0.25-point ticks ($0.50 per tick; $2.00 per index point), dictating how 50% BPR midpoints and 1.25 projection prices round to valid ticks.':
    'MNQ فیوچرز 0.25 پوائنٹ ٹِک ($0.50 فی ٹِک؛ $2.00 فی پوائنٹ) میں چلتے ہیں، جو 50% BPR اور 1.25 پروجیکشن راؤنڈنگ طے کرتا ہے۔',
  'CME Group — Central Limit Order Book & Matching': 'CME Group — سینٹرل لِمٹ آرڈر بک اور میچنگ',
  'Exchange explanation of FIFO and pro-rata queue matching showing why chart rectangles never disclose total resting order depth.':
    'FIFO اور پرو راٹا میچنگ کی ایکسچینج وضاحت جو دکھاتی ہے کہ چارٹ مستطیل آرڈر بک کی کل گہرائی ظاہر نہیں کرتے۔',
  'NYSE — Trading Hours and Market Holidays Calendar': 'NYSE — ٹریڈنگ اوقات اور تعطیلات کا کیلنڈر',
  'Official U.S. equities core session hours (09:30–16:00 ET) used when filtering BPR reactions during active morning liquidity.':
    'امریکی ایکویٹی کے سرکاری اوقات (09:30–16:00 ET) جو صبح کی فعال لیکویڈیٹی میں BPR ردعمل چھانٹنے کے کام آتے ہیں۔',
  'NIST — Daylight Saving Time Rules': 'NIST — ڈے لائٹ سیونگ ٹائم قواعد',
  'Official U.S. clock calendar ensuring America/New_York session windows remain accurate across seasonal EST/EDT shifts.':
    'سرکاری امریکی گھڑی کیلنڈر تاکہ EST/EDT تبدیلیوں میں America/New_York اوقات درست رہیں۔',

  // Quizzes
  'A projection points into an unrealized range. What has price already done?':
    'ایک پروجیکشن غیر حقیقی (Unrealized) رینج کی طرف اشارہ کرتی ہے۔ قیمت پہلے کیا کر چکی ہے؟',
  'Boundary between observed two-sided gap overlaps and projected forward multiples.':
    'مشاہدہ شدہ دو طرفہ گیپ اوورلیپس اور آگے کی پروجیکشن ملٹی پلز کے درمیان حد۔',
  'It has not necessarily traded through that proposed interval.':
    'ضروری نہیں کہ قیمت اس مجوزہ وقفے سے گزر چکی ہو۔',
  'It has already filled every target.': 'اس نے تمام اہداف پہلے ہی بھر دیے ہیں۔',
  'It has verified a compulsory two-candle FVG.': 'اس نے ایک لازمی دو کینڈل FVG کی تصدیق کی ہے۔',
  'A projected future boundary and a completed price interval are different observations.':
    'آگے کی تجویز کردہ حد اور مکمل شدہ قیمت رینج دو الگ مشاہدات ہیں۔',

  'Leg 1 Bearish FVG spans 20,440–20,460 and Leg 2 Bullish FVG spans 20,432–20,454. What is the exact Bullish BPR range and 50% midpoint?':
    'لیگ 1 Bearish FVG 20,440–20,460 اور لیگ 2 Bullish FVG 20,432–20,454 پر ہے۔ عین Bullish BPR رینج اور 50% مڈپوائنٹ کیا ہے؟',
  '20,440.00 to 20,454.00 with a 50% midpoint of 20,447.00.':
    '20,440.00 تا 20,454.00 اور 50% مڈپوائنٹ 20,447.00۔',
  '20,432.00 to 20,460.00 with a 50% midpoint of 20,446.00.':
    '20,432.00 تا 20,460.00 اور 50% مڈپوائنٹ 20,446.00۔',
  '20,454.00 to 20,460.00 with a 50% midpoint of 20,457.00.':
    '20,454.00 تا 20,460.00 اور 50% مڈپوائنٹ 20,457.00۔',
  'BPR_Low = max(20440, 20432) = 20,440.00 and BPR_High = min(20460, 20454) = 20,454.00; averaging both bounds gives 20,447.00.':
    'BPR_Low = max(20440, 20432) = 20,440.00 اور BPR_High = min(20460, 20454) = 20,454.00؛ دونوں کا اوسط 20,447.00 ہے۔',

  'What determines whether an overlapping pair of opposing Fair Value Gaps is a Bullish BPR or Bearish BPR?':
    'یہ کیسے طے ہوتا ہے کہ مخالف فیئر ویلیو گیپس کا اوورلیپ Bullish BPR ہے یا Bearish BPR؟',
  'The most recent (second) aggressive displacement leg sets polarity—a Bullish FVG overlapping a prior Bearish FVG creates a Bullish BPR.':
    'سب سے حالیہ (دوسری) تیز ڈسپلیسمنٹ لیگ سمت طے کرتی ہے — پچھلے Bearish FVG پر Bullish FVG اوورلیپ ہو تو Bullish BPR بنتا ہے۔',
  'The first FVG always dictates bias forever regardless of later price action.':
    'پہلا FVG ہمیشہ کے لیے سمت طے کر دیتا ہے چاہے بعد میں کچھ بھی ہو۔',
  'Whichever gap happens to be wider in tick count controls direction.':
    'ٹِکس میں جو گیپ زیادہ چوڑا ہو وہ سمت طے کرتا ہے۔',
  'Sequence controls polarity: the counter-leg that overlaps and supersedes the initial imbalance determines directional reference.':
    'ترتیب سمت طے کرتی ہے: جوابی لیگ جو پہلے عدم توازن پر چڑھ کر غالب آئے وہی سمتی حوالہ بناتی ہے۔',

  'How does a true Balanced Price Range (BPR) differ from a single Inverse Fair Value Gap (IFVG)?':
    'حقیقی بیلنسڈ پرائس رینج (BPR) اور ایک انورس فیئر ویلیو گیپ (IFVG) میں کیا فرق ہے؟',
  'A BPR requires two opposing three-candle FVGs whose price intervals physically intersect; an IFVG only needs a closing breach of one existing FVG.':
    'BPR کے لیے دو مخالف تین کینڈل FVGs کا باہمی اوورلیپ لازمی ہے؛ IFVG کے لیے صرف ایک FVG کے پار کلوزنگ بریک کافی ہے۔',
  'An IFVG always contains two overlapping gaps whereas a BPR uses only one candle.':
    'IFVG میں ہمیشہ دو اوورلیپنگ گیپس ہوتے ہیں جبکہ BPR صرف ایک کینڈل استعمال کرتا ہے۔',
  'There is no difference; BPR and IFVG are identical labels for every closed gap.':
    'کوئی فرق نہیں؛ BPR اور IFVG ہر بند گیپ کے ایک جیسے نام ہیں۔',
  'While a BPR contains an inverted prior gap, an IFVG can form from a slow multi-candle close without creating an opposing FVG overlap.':
    'اگرچہ BPR میں ایک ٹوٹا ہوا پچھلا گیپ شامل ہوتا ہے، مگر IFVG سست کینڈل کلوز سے بغیر کسی دوسرے مخالف گیپ کے بھی بن سکتا ہے۔',

  'Under disciplined RDRB touch-counting, when does a second revisit qualify rather than counting noise?':
    'منظم RDRB ٹچ گنتی کے تحت دوسری واپسی شور گنے بغیر کب اہل قرار پاتی ہے؟',
  'After Visit 1 reacts inside the BPR, departs beyond the near edge, clears an interim swing, and later returns cleanly without closing beyond the far edge.':
    'جب وزٹ 1، BPR میں ردعمل دے کر قریبی کنارے سے باہر نکلے، عبوری سوئنگ توڑے اور دور کنارے سے باہر کلوز کیے بغیر صاف واپس آئے۔',
  'Whenever three consecutive candles wiggle inside the same BPR box during consolidation.':
    'جب بھی کنسولیڈیشن میں تین مسلسل کینڈلز ایک ہی BPR باکس میں ہلیں۔',
  'Any time price closes below BPR_Low first and then bounces back weeks later.':
    'جب بھی قیمت پہلے BPR_Low سے نیچے کلوز ہو اور ہفتوں بعد واپس اچھلے۔',
  'Clear swing separation after Visit 1 separates a true second redelivery from consecutive candles inside one continuous visit, while keeping far-edge invalidation intact.':
    'وزٹ 1 کے بعد واضح سوئنگ علیحدگی حقیقی دوسری ری ڈیلیوری کو ایک ہی مسلسل وزٹ کی کینڈلز سے الگ کرتی ہے، جبکہ دور کنارے کی ان ویلیڈیشن برقرار رہتی ہے۔',

  // Visual Labels & Controls (RdrbVisual.tsx & RdrbScene.tsx)
  'Impatient Single-Gap Seller vs. Patient BPR Planner': 'بے صبرا سنگل گیپ سیلر بمقابلہ صبر والا BPR منصوبہ ساز',
  'Story Comic · Synthetic NQ Illustration': 'کہانی کامک · فرضی NQ مثال',
  '1. Leg 1 SIBI Drop': '1. لیگ 1 SIBI گراوٹ',
  '2. Blind Short vs. Sweep': '2. اندھا شارٹ بمقابلہ سویپ',
  '3. Overlapping BPR Core': '3. اوورلیپنگ BPR کور',
  '4. 50% BPR Hold': '4. 50% BPR ہولڈ',
  'Previous Step': 'پچھلا مرحلہ',
  'Next Step': 'اگلا مرحلہ',
  '3D Three.js BPR, RDRB & Invalidation Cinema': 'تھری ڈی Three.js BPR، RDRB اور ان ویلیڈیشن سنیما',
  'Motion Study 02 · Interactive WebGL': 'موشن اسٹڈی 02 · انٹرایکٹو WebGL',
  'Scenario:': 'منظرنامہ:',
  'Bullish BPR (NQ)': 'بلش BPR (NQ)',
  'Bearish BPR (EUR/USD)': 'بیئرش BPR (EUR/USD)',
  'RDRB 2nd Visit': 'RDRB دوسرا وزٹ',
  'Far-Edge Invalidation': 'دور کنارے کی ان ویلیڈیشن',
  'Play': 'چلائیں',
  'Pause': 'روکیں',
  'Step Forward': 'آگے قدم',
  'Reset': 'ری سیٹ',
  'Speed:': 'رفتار:',
  'Animation Progress': 'اینیمیشن پیشرفت',
  'Interactive BPR Overlap & 50% Equilibrium Calculator': 'انٹرایکٹو BPR اوورلیپ اور 50% مڈپوائنٹ کیلکولیٹر',
  'Horizontal Price Geometry': 'افقی قیمت جیومیٹری',
  'Preset:': 'پری سیٹ:',
  'Partial Bullish Overlap': 'جزوی بلش اوورلیپ',
  'Contained Nested Overlap Preset': 'مکمل اندرونی اوورلیپ',
  'Touch-Point Kiss (Zero Span)': 'صرف نقطہ ٹکراؤ (زیرو اسپین)',
  'Non-Overlapping Void': 'بغیر اوورلیپ خلا',
  'FVG 1 Low': 'FVG 1 نچلی حد',
  'FVG 1 High': 'FVG 1 بالائی حد',
  'FVG 2 Low': 'FVG 2 نچلی حد',
  'FVG 2 High': 'FVG 2 بالائی حد',
  'BPR Span': 'BPR چوڑائی',
  '50% Midpoint': '50% مڈپوائنٹ',
  'Overlap % (Leg 1 / Leg 2)': 'اوورلیپ % (لیگ 1 / لیگ 2)',
  'Invalidation Edge': 'ان ویلیڈیشن کنارہ',
  'True BPR vs. Sequential Rebalance vs. Single IFVG': 'حقیقی BPR بمقابلہ سادہ ری بیلنس بمقابلہ سنگل IFVG',
  '3-Structure Visual Comparison': 'تین ساختی اشکال کا موازنہ',
  'RDRB Multi-Visit Redelivery Explorer': 'RDRB ملٹی وزٹ ری ڈیلیوری ایکسپلورر',
  'Visit 0 -> Visit 1 -> Visit 2 (RDRB)': 'وزٹ 0 -> وزٹ 1 -> وزٹ 2 (RDRB)',
  'Enigma Anchor & Boundary Sensitivity Lab': 'انیگما اینکر اور حدوں کی حساسیت لیب',
  'Wick vs. Body-Gap Comparison': 'وِک بمقابلہ باڈی گیپ موازنہ',
  'BPR Qualification & PD Confluence Evaluator': 'BPR موزونیت اور PD ہم آہنگی جانچ',
  '5-Gate Filter Matrix': '5 نکاتی فلٹر میٹرکس',
  'Multi-Timeframe Nested BPR Alignment': 'ملٹی ٹائم فریم نیسٹڈ BPR ہم آہنگی',
  'HTF -> MTF -> LTF Framework': 'HTF -> MTF -> LTF فریم ورک',
  'Four Recurring BPR & RDRB Traps': 'چار بار بار ہونے والے BPR اور RDRB جال',
  'Stick-Figure Error Gallery': 'اسٹک فگر غلطیوں کی گیلری',
  '3D Bullish BPR Cinema (NQ)': 'تھری ڈی بلش BPR سنیما (NQ)',
  '3D Bearish BPR Cinema (EUR/USD)': 'تھری ڈی بیئرش BPR سنیما (EUR/USD)',
  '3D RDRB Second-Visit Cinema (NQ)': 'تھری ڈی RDRB دوسرے وزٹ کا سنیما (NQ)',
  '3D BPR Far-Edge Invalidation Cinema (NQ)': 'تھری ڈی BPR ان ویلیڈیشن سنیما (NQ)',
  'Calm two-sided plan with fixed far-edge stop': 'دور کنارے کے طے شدہ اسٹاپ کے ساتھ پرسکون دو طرفہ منصوبہ',
  'All synthetic NQ and EUR/USD BPR examples, RDRB visit timelines, Enigma 1.25x projections, and stick-figure comics in this chapter are illustrative chart-geometry studies, not live quotes or guaranteed outcomes.':
    'اس باب میں موجود تمام فرضی NQ اور EUR/USD BPR مثالیں، RDRB وزٹ ٹائم لائنز، انیگما 1.25x پروجیکشنز اور اسٹک فگر کامکس محض تعلیمی چارٹ جیومیٹری مطالعات ہیں، نہ کہ لائیو قیمتیں یا یقینی نتائج۔',
  'All synthetic NQ and EUR/USD BPR examples, RDRB revisit diagrams, and Enigma 1.25x anchor studies are original educational illustrations, not live quotes or execution records.':
    'تمام فرضی NQ اور EUR/USD BPR مثالیں، RDRB واپسی کے خاکے اور انیگما 1.25x اینکر مطالعات اصل تعلیمی خاکے ہیں، نہ کہ لائیو قیمتیں یا عملدرآمد کا ریکارڈ۔',
};
