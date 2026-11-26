import {
  pdArrayDocument as data,
  pdArraySources,
  pdArrayQuizzes,
} from './pdArrayLesson';
import {
  pdArrayHierarchyList,
  pdMtfProfiles,
  syntheticPdBullishBars,
  syntheticPdBearishBars,
  syntheticPdContinuumBars,
  syntheticPdFailureBars,
} from '../../utils/pdArrayMath';

export const pdArrayTranslations: Record<string, string> = {
  // Document metadata & summary
  [data.h1]: 'پریمیم اور ڈسکاؤنٹ: PD اَرے میٹرکس',
  [data.seoTitle]: data.seoTitleUr,
  [`${data.seoTitle} | LearnSMC`]: `${data.seoTitleUr} | LearnSMC`,
  [data.metaDescription]: data.metaDescriptionUr,
  [data.quickAnswer]:
    'SMC میں پریمیم اور ڈسکاؤنٹ کسی مکمل تجارتی رینج کو اس کے 50% ایکویلیبریم وسط پر تقسیم کرتے ہیں۔ 50% سے اوپر کی قیمت پریمیم میں ہوتی ہے (فروخت کے لیے موزوں) اور 50% سے نیچے کی قیمت ڈسکاؤنٹ میں ہوتی ہے (خریداری کے لیے موزوں)۔ PD اَرے میٹرکس ان دونوں حصوں کے اندر لیکویڈیٹی پولز، آرڈر بلاکس، فیئر ویلیو گیپس اور بریکرز کی درجہ بندی کرتا ہے۔',
  '15 October 2026': '15 اکتوبر 2026',
  '26 November 2026': '26 نومبر 2026',

  // Takeaways + summary extras
  [data.takeaways[0]]:
    'پریمیم اور ڈسکاؤنٹ کی ہر پیمائش مکمل ڈیلنگ رینج کے طے شدہ ہائی اور لو پر منحصر ہے — درمیان میں اینکر بدلنا نتائج دیکھ کر دھوکہ پیدا کرتا ہے۔',
  [data.takeaways[1]]:
    '50% ایکویلیبریم مہنگے بالائی پریمیم (>50%) کو نچلے ڈسکاؤنٹ (<50%) سے الگ کرتا ہے، جبکہ 25% اور 75% کواڈرنٹ حدود گہرے ڈسکاؤنٹ اور گہرے پریمیم کو نمایاں کرتی ہیں۔',
  [data.takeaways[2]]:
    'PD اَرے میٹرکس نو چارٹ حوالوں (لیکویڈیٹی پولز، مٹیگیشن، بریکر، لیکویڈیٹی وائڈ، FVG، سسپنشن/VI، آرڈر بلاک، ریجیکشن بلاک اور ٹائم گیپس) کو ہر مستطیل کو برابر سمجھنے کے بجائے رینج کی سمت کے مطابق منظم کرتا ہے۔',
  [data.takeaways[3]]:
    'اندرونی رینج لیکویڈیٹی (رینج کے اندر FVGs اور آرڈر بلاکس) اور بیرونی رینج لیکویڈیٹی (کناروں پر پرانے ہائی اور لو) پرائس ڈیلیوری تسلسل میں باری باری چلتے ہیں۔',
  [data.takeaways[4]]:
    'محض قیمت کا مقام کبھی ٹریڈ کا بٹن نہیں ہوتا: ہمیشہ مخالف Draw on Liquidity، فعال لندن یا نیویارک سیشن، چھوٹے ٹائم فریم کی تصدیق اور واضح ان ویلیڈیشن لازمی رکھیں۔',
  'Keep the selected range and lookback explicit.': 'منتخب رینج اور سابقہ مدت واضح رکھیں۔',
  'Distinguish wick geometry from body-gap conventions.': 'وِک کی شکل اور Body-Gap اصول الگ رکھیں۔',
  'A relevant reference may never offer an entry.': 'متعلقہ حوالہ بھی انٹری نہ دے سکتا ہے۔',

  // UI Chrome, Formulas, TOC, Checklist, Related Links
  'Mathematical Formula': 'ریاضیاتی فارمولا',
  'Equilibrium (50%) = (Range_High + Range_Low) ÷ 2 · Q1 Deep Discount = 0%–25% · Q4 Deep Premium = 75%–100%':
    'ایکویلیبریم (50%) = (Range_High + Range_Low) ÷ 2 · Q1 گہرا ڈسکاؤنٹ = 0%–25% · Q4 گہرا پریمیم = 75%–100%',
  'On this page': 'اس صفحے پر',
  sections: 'ابواب',
  'Show section links': 'ابواب کے لنکس دکھائیں',
  'Key Takeaways': 'اہم نکات',
  'Pre-Execution Checklist': 'عملدرآمد سے پہلے کی چیک لسٹ',
  'Checklist items confirmed': 'تصدیق شدہ چیک لسٹ نکات',
  'Checklist complete — anchors, range half, opposing draw, array refinement, session clock, and LTF trigger are documented.':
    'چیک لسٹ مکمل — رینج اینکرز، نصف حصہ، مخالف ہدف، اَرے ریفائنمنٹ، سیشن وقت اور LTF ٹرگر سب درج ہو چکے ہیں۔',
  'Confirm all 6 gates before classifying any PD Array location as a qualified setup.':
    'کسی بھی PD اَرے مقام کو اہل سیٹ اپ قرار دینے سے پہلے تمام 6 شرائط کی تصدیق کریں۔',
  'Completed Dealing Range anchors (Swing Low 0% and Swing High 100%) frozen before reviewing entries':
    'انٹری دیکھنے سے پہلے مکمل ڈیلنگ رینج اینکرز (سوئنگ لو 0% اور سوئنگ ہائی 100%) منجمد کیے',
  'Price sits strictly inside Discount (<50%) for longs or Premium (>50%) for shorts':
    'قیمت لانگز کے لیے واضح ڈسکاؤنٹ (<50%) یا شارٹس کے لیے واضح پریمیم (>50%) میں موجود ہے',
  'Clear opposing External Liquidity pool (BSL or SSL) stands open across the range':
    'رینج کے دوسرے کنارے پر صاف مخالف بیرونی لیکویڈیٹی پول (BSL یا SSL) کھلا موجود ہے',
  'Unmitigated PD Array identified with explicit CE (50% gap) or MT (50% body) boundary':
    'غیر مٹیگیٹڈ PD اَرے کی شناخت مع واضح CE (50% گیپ) یا MT (50% باڈی) حد کے کر لی گئی ہے',
  'Active London or New York session liquidity verified in America/New_York time':
    'America/New_York وقت کے مطابق فعال لندن یا نیویارک سیشن کی تصدیق ہو چکی ہے',
  'Lower-timeframe shift (MSS / CISD) observed with fixed invalidation beyond extreme anchor':
    'انتہائی اینکر کے پار مقررہ ان ویلیڈیشن کے ساتھ چھوٹے ٹائم فریم کا شفٹ (MSS / CISD) دیکھا گیا',
  'Sources & Institutional References': 'حوالہ جات اور ادارہ جاتی ذرائع',
  'Continue Studying': 'مطالعہ جاری رکھیں',
  'Connect Optimal Trade Entry (OTE) 0.62–0.79': 'آپٹیمل ٹریڈ انٹری (OTE) 0.62–0.79 سے جوڑیں',
  'Explore Balanced Price Range (BPR & RDRB)': 'بیلنسڈ پرائس رینج (BPR اور RDRB) کا مطالعہ',
  'Study Fair Value Gaps (FVG & 50% CE)': 'فیئر ویلیو گیپس (FVG اور 50% CE) سیکھیں',
  'Explore Order Blocks (OB & Mean Threshold)': 'آرڈر بلاکس (OB اور مین تھریشولڈ) دیکھیں',
  'Study Breaker Blocks & Failed OBs': 'بریکر بلاکس اور ناکام OBs کا مطالعہ',
  'Master Internal vs. External Structure': 'اندرونی بمقابلہ بیرونی اسٹرکچر پر عبور حاصل کریں',
  'Study Midnight Opening Range, RTH & NWOG': 'مڈنائٹ اوپننگ رینج، RTH اور NWOG سمجھیں',
  'Practice Recognition in the Chart Lab': 'چارٹ لیب میں شناخت کی مشق کریں',

  // CurriculumReview scope & interpretation
  'All synthetic NQ, EUR/USD, and index Dealing Range examples, PD Array matrices, Suspension gap comparisons, and stick-figure comics are original educational illustrations, not live quotes or execution records.':
    'تمام فرضی NQ، EUR/USD اور انڈیکس ڈیلنگ رینج مثالیں، PD اَرے میٹرکس، سسپنشن گیپ موازنے اور اسٹک فگر کامکس محض اصل تعلیمی خاکے ہیں، نہ کہ لائیو قیمتیں یا عملدرآمد کا ریکارڈ۔',
  'All synthetic Dealing Range quadrants, 9-array ladders, Suspension vs. Wick FVG dissections, and MTF fractal diagrams in this chapter are illustrative chart-geometry studies, not live quotes or trading promises. Anchoring a lookback requires judgment and never predicts future returns.':
    'اس باب کے تمام فرضی ڈیلنگ رینج کواڈرنٹس، 9 اَرے لیڈرز، سسپنشن بمقابلہ وِک FVG تجزیے اور ملٹی ٹائم فریم فریکٹل خاکے محض تعلیمی چارٹ جیومیٹری مطالعات ہیں، نہ کہ لائیو قیمتیں یا تجارتی ضمانت۔',

  // Section 1
  [data.sections[0].title]: '1. ٹریڈرز مہنگی چوٹی پر خریداری اور سستے پیندے پر فروخت کیوں کرتے ہیں؟ (ابتدائی کامک)',
  [data.sections[0].blocks[0].text!]:
    'تصور کریں آپ ایک الیکٹرانکس نیلامی میں داخل ہوتے ہیں جہاں ایک لیپ ٹاپ پورا مہینہ $1,000 سے $1,400 کے درمیان بکتا ہے۔ $1,360 پر خریدار چھوٹ جانے کے خوف سے ٹوٹ پڑتے ہیں — اور اگلی ہی صبح قیمت سیدھی $1,100 کے قریب واپس آ گرتی ہے۔',
  [data.sections[0].blocks[1].text!]:
    'کینڈل اسٹک چارٹس پر یہی جذباتی جال روز دہرایا جاتا ہے۔ جلدباز خریدار ایکویلیبریم سے بہت اوپر سبز کینڈلز کے پیچھے بھاگتے ہیں (پریمیم میں مہنگی خریداری)، جبکہ گھبرائے ہوئے فروخت کنندہ نیچے ڈسکاؤنٹ شیلف پر بیچ دیتے ہیں۔ نیچے 4 پینل نیلامی کامک میں جذباتی خریدار کا صبر کرنے والے PD میٹرکس منصوبہ ساز سے موازنہ دیکھیں۔',

  // Section 2
  [data.sections[1].title]: '2. فوری جواب: پریمیم، ڈسکاؤنٹ اور PD اَرے میٹرکس کیا ہیں؟',
  [data.sections[1].blocks[0].text!]:
    'اسمارٹ منی کانسیپٹس (SMC) میں پریمیم اور ڈسکاؤنٹ کسی مکمل ہائی سے لو پرائس سوئنگ کے اندر اضافی مقام بیان کرتے ہیں — نہ کہ کسی اثاثے کی بنیادی فیئر ویلیو۔ عین 50% وسط پر ایکویلیبریم ہوتا ہے: 50% سے اوپر کی قیمت پریمیم نصف میں آتی ہے (فروخت کے مطالعے کے لیے) اور 50% سے نیچے کی قیمت ڈسکاؤنٹ نصف میں آتی ہے (خریداری کے مطالعے کے لیے)۔',
  [data.sections[1].blocks[1].text!]:
    'PD اَرے میٹرکس (Premium/Discount Array Matrix) اس دو خانوں والے نقشے کو ایک قدم آگے بڑھاتا ہے اور چارٹ کے مخصوص حوالوں — جیسے آرڈر بلاکس، فیئر ویلیو گیپس، بریکر بلاکس، مٹیگیشن بلاکس، ریجیکشن بلاکس اور لیکویڈیٹی پولز — کو اس نصف کے اندر ایک منظم درجہ بندی دیتا ہے جو بڑے ٹائم فریم کے Draw on Liquidity کے مطابق ہو۔',
  [data.sections[1].blocks[2].title!]: 'بنیادی حد بندی کا اصول',
  [data.sections[1].blocks[2].text!]:
    'سوئنگ لو اور سوئنگ ہائی دونوں اینکرز بتائے بغیر کسی زون کو "ڈسکاؤنٹ" یا "پریمیم" کہنا بے معنی ہے۔ 132 کی قیمت 100–140 رینج میں گہرے پریمیم (80%) پر ہے، مگر وسیع 100–180 رینج میں یہی 132 ڈسکاؤنٹ (40%) بن جاتی ہے۔',

  // Section 3
  [data.sections[2].title]: '3. ڈیلنگ رینج کی ساخت: 50% ایکویلیبریم اور کواڈرنٹ حساب (3D سنیما)',
  [data.sections[2].blocks[0].text!]:
    'کسی ایک آرڈر بلاک یا فیئر ویلیو گیپ کو نشان زد کرنے سے پہلے فعال ڈیلنگ رینج (جسے پرائس لیگ یا سابقہ وقفہ بھی کہتے ہیں) متعین کریں۔ مکمل سوئنگ لو اور سوئنگ ہائی لے کر ان کے عمودی فاصلے کو چار برابر چوتھائی حصوں (25% وقفوں) میں بانٹیں:',
  [data.sections[2].blocks[1].rows![0][0]]: 'سطح / چوتھائی حصہ',
  [data.sections[2].blocks[1].rows![0][1]]: 'رینج فیصد',
  [data.sections[2].blocks[1].rows![0][2]]: 'فرضی 100–140 مثال',
  [data.sections[2].blocks[1].rows![0][3]]: 'نیلامی شیلف کی درجہ بندی اور کردار',
  [data.sections[2].blocks[1].rows![1][0]]: 'رینج ہائی (ERL / BSL)',
  [data.sections[2].blocks[1].rows![1][1]]: '100%',
  [data.sections[2].blocks[1].rows![1][2]]: '140.00',
  [data.sections[2].blocks[1].rows![1][3]]: 'بالائی بیرونی رینج لیکویڈیٹی حد؛ لانگز کا ہدف یا شارٹس کے لیے سویپ کی بنیاد',
  [data.sections[2].blocks[1].rows![2][0]]: 'بالائی پریمیم چوتھائی (Q4)',
  [data.sections[2].blocks[1].rows![2][1]]: '75% – 100%',
  [data.sections[2].blocks[1].rows![2][2]]: '130.00 – 140.00',
  [data.sections[2].blocks[1].rows![2][3]]: 'گہرا پریمیم زون؛ بیئرش OTE (0.62–0.79) اور نمایاں بیئرش PD اَریز کا گھر',
  [data.sections[2].blocks[1].rows![3][0]]: 'نچلی پریمیم چوتھائی (Q3)',
  [data.sections[2].blocks[1].rows![3][1]]: '50% – 75%',
  [data.sections[2].blocks[1].rows![3][2]]: '120.00 – 130.00',
  [data.sections[2].blocks[1].rows![3][3]]: '50% ایکویلیبریم کے عین اوپر درمیانی پریمیم زون',
  [data.sections[2].blocks[1].rows![4][0]]: 'ایکویلیبریم (وسطی نقطہ)',
  [data.sections[2].blocks[1].rows![4][1]]: '50%',
  [data.sections[2].blocks[1].rows![4][2]]: '120.00',
  [data.sections[2].blocks[1].rows![4][3]]: 'پریمیم اور ڈسکاؤنٹ کو تقسیم کرنے والا عین وسط: (Range_High + Range_Low) ÷ 2',
  [data.sections[2].blocks[1].rows![5][0]]: 'بالائی ڈسکاؤنٹ چوتھائی (Q2)',
  [data.sections[2].blocks[1].rows![5][1]]: '25% – 50%',
  [data.sections[2].blocks[1].rows![5][2]]: '110.00 – 120.00',
  [data.sections[2].blocks[1].rows![5][3]]: '50% ایکویلیبریم کے عین نیچے درمیانی ڈسکاؤنٹ زون',
  [data.sections[2].blocks[1].rows![6][0]]: 'گہری ڈسکاؤنٹ چوتھائی (Q1)',
  [data.sections[2].blocks[1].rows![6][1]]: '0% – 25%',
  [data.sections[2].blocks[1].rows![6][2]]: '100.00 – 110.00',
  [data.sections[2].blocks[1].rows![6][3]]: 'گہرا ڈسکاؤنٹ زون؛ گہرے بلش OTE اور نمایاں بلش PD اَریز کا گھر',
  [data.sections[2].blocks[1].rows![7][0]]: 'رینج لو (ERL / SSL)',
  [data.sections[2].blocks[1].rows![7][1]]: '0%',
  [data.sections[2].blocks[1].rows![7][2]]: '100.00',
  [data.sections[2].blocks[1].rows![7][3]]: 'نچلی بیرونی رینج لیکویڈیٹی حد؛ شارٹس کا ہدف یا لانگز کے لیے سویپ کی بنیاد',
  [data.sections[2].blocks[2].text!]:
    'نیچے انٹرایکٹو 3D موشن اسٹڈی چلا کر دیکھیں کہ قیمت ڈسکاؤنٹ شیلفس، 50% ایکویلیبریم سطح اور پریمیم لیکویڈیٹی پولز کے درمیان بلش، بیئرش، تسلسل اور ان ویلیڈیشن منظرناموں میں کیسے حرکت کرتی ہے۔',

  // Section 4
  [data.sections[3].title]: '4. ڈیلنگ رینج کو درست طور پر کیسے اینکر کریں؟ (نتیجے کے بعد تعصب سے بچاؤ)',
  [data.sections[3].blocks[0].text!]:
    'نئے سیکھنے والے یکسانیت اس لیے نہیں کھوتے کہ ایکویلیبریم حساب غلط ہے، بلکہ اس لیے کہ ٹریڈ چھوٹنے کے بعد وہ چپکے سے ہائی یا لو سرکا دیتے ہیں۔ اینکر لگانے کے تین سخت اصول اپنائیں:',
  [data.sections[3].blocks[1].items![0]]:
    'تصدیق شدہ انتہاؤں کا انتظار کریں: جب قیمت ابھی تیزی سے پھیل رہی ہو اور سوئنگ مکمل نہ ہو تو 0% یا 100% حد منجمد نہ کریں۔',
  [data.sections[3].blocks[1].items![1]]:
    'من پسند انتخاب کے بغیر موجودہ قیمت ناپیں: ایک بار 20 دن کی سابقہ مدت یا واضح ڈسپلیسمنٹ ہائی اور لو طے کر دے تو گہرائی صرف انہی منجمد سروں سے ناپیں۔',
  [data.sections[3].blocks[1].items![2]]:
    'توسیع کی شرائط پہلے درج کریں: اگر قیمت کلوزنگ کی بنیاد پر ہائی سے اوپر یا لو سے نیچے نکل جائے تو اسے پھیلی ہوئی ڈیلنگ رینج مانیں — ناکام انٹری کو چھپانے کے لیے پچھلے اینکر نہ بدلیں۔',

  // Section 5
  [data.sections[4].title]: '5. انٹرایکٹو ڈیلنگ رینج اور کواڈرنٹ میٹرکس کیلکولیٹر',
  [data.sections[4].blocks[0].text!]:
    'نیچے ڈیلنگ رینج لو، ہائی اور موجودہ قیمت تبدیل کریں — یا فرضی مثالیں (20 دن کا NQ، EUR/USD، یا 100–140 بمقابلہ 100–180 اینکر تبدیلی ڈیمو) لوڈ کر کے دیکھیں کہ ایکویلیبریم، کواڈرنٹس اور OTE زونز خودکار کیسے بدلتے ہیں۔',

  // Section 6
  [data.sections[5].title]: '6. سابقہ مدتیں: 20 دن کی بنیادی رینج بمقابلہ 40 اور 60 دن کی توسیعات',
  [data.sections[5].blocks[0].text!]:
    'وقتی لُک بیک ماڈلز کیلنڈر دنوں کے بجائے گزشتہ 20، 40 یا 60 مکمل تجارتی سیشن گنتے ہیں (ہفتہ وار تعطیلات اور مارکیٹ بندش نکال کر)۔ اس سے ہر سیشن میں حقیقی تجارتی پرائس ڈسکوری شامل رہتی ہے۔',
  [data.sections[5].blocks[1].rows![0][0]]: 'لُک بیک مدت',
  [data.sections[5].blocks[1].rows![0][1]]: 'PD تجزیے میں بنیادی کردار',
  [data.sections[5].blocks[1].rows![0][2]]: 'عملی احتیاط',
  [data.sections[5].blocks[1].rows![1][0]]: '20 مکمل تجارتی دن',
  [data.sections[5].blocks[1].rows![1][1]]: 'موجودہ پریمیم/ڈسکاؤنٹ کواڈرنٹس اینکر کرنے کے لیے بنیادی ماہانہ ڈیلنگ رینج (تقریباً 4 تجارتی ہفتے)',
  [data.sections[5].blocks[1].rows![1][2]]: 'مکمل ڈیلی کلوز کا انتظار کریں؛ تیز ٹرینڈ بریک آؤٹ جلد 20 دن کی رینج بدل دیتا ہے',
  [data.sections[5].blocks[1].rows![2][0]]: '40 مکمل تجارتی دن',
  [data.sections[5].blocks[1].rows![2][1]]: 'ثانوی توسیعی تناظر جب قیمت 20 دن کے ہائی یا لو سے آگے نکل جائے',
  [data.sections[5].blocks[1].rows![2][2]]: 'اسے واضح طور پر 40 دن کی توسیع لکھیں — 20 دن کے چارٹ کے ساتھ خفیہ طور پر نہ ملائیں',
  [data.sections[5].blocks[1].rows![3][0]]: '60 مکمل تجارتی دن',
  [data.sections[5].blocks[1].rows![3][1]]: 'بڑے سہ ماہی کنارے جو پرانے غیر چھوئے گئے لیکویڈیٹی پولز دکھاتے ہیں',
  [data.sections[5].blocks[1].rows![3][2]]: '5M انٹرا ڈے اسکالپ اسٹاپس کے لیے بہت وسیع جب تک Daily/4H لیگز میں نیچے نہ لایا جائے',

  // Section 7
  [data.sections[6].title]: '7. بیرونی سے اندرونی ترتیب کے مطابق مکمل PD اَرے فہرست',
  [data.sections[6].blocks[0].text!]:
    'چارٹ پر بیس اوورلیپنگ باکس بنانا الجھن پیدا کرتا ہے۔ PD اَرے میٹرکس ہر قابلِ شناخت حوالے کو نو واضح ساختی خانوں میں تقسیم کر کے اس الجھن کو ختم کرتا ہے۔ نیچے ڈسکاؤنٹ اور پریمیم اسٹیکس دیکھنے کے لیے کلک کریں۔',

  // Section 8
  [data.sections[7].title]: '8. پریمیم PD اَرے میٹرکس اسٹیک (50% ایکویلیبریم سے اوپر فروخت)',
  [data.sections[7].blocks[0].text!]:
    'جب بڑے ٹائم فریم کا رجحان بیئرش ہو اور قیمت 50% ایکویلیبریم سے اوپر پریمیم میں آئے تو تجزیہ کار ایکویلیبریم سے رینج ہائی تک منظم سیڑھی کی طرح اوپر دیکھتا ہے:',
  [data.sections[7].blocks[1].items![0]]:
    'مرحلہ 1 — فوری ایکویلیبریم اوورہینگ دیکھیں: 50% سے عین اوپر کوئی والیوم امبیلنس، سسپنشن باڈی گیپ یا بیئرش فیئر ویلیو گیپ (SIBI) چیک کریں۔',
  [data.sections[7].blocks[1].items![1]]:
    'مرحلہ 2 — درمیانے سے بالائی پریمیم اسٹرکچرز (60%–85%): غیر مٹیگیٹڈ بیئرش آرڈر بلاکس، بریکر بلاکس یا 0.62–0.79 OTE پاکٹ کے اندر مٹیگیشن بلاکس تلاش کریں۔',
  [data.sections[7].blocks[1].items![2]]:
    'مرحلہ 3 — گہری انتہائی حدود (85%–100%): رینج کے بالائی شیلف پر بیئرش ریجیکشن بلاکس (لمبی اوپری وِکس) اور بائے سائیڈ لیکویڈیٹی (BSL / پرانے ہائیز) نشان زد کریں۔',
  [data.sections[7].blocks[1].items![3]]:
    'ہم آہنگی کا اصول: نئے LTF شفٹ کے ساتھ جڑا غیر مٹیگیٹڈ پریمیم اَرے 50% سے عین اوپر پہلی ٹِک پر اندھی فروخت سے کہیں بہتر تناظر دیتا ہے۔',

  // Section 9
  [data.sections[8].title]: '9. ڈسکاؤنٹ PD اَرے میٹرکس اسٹیک (50% ایکویلیبریم سے نیچے خریداری)',
  [data.sections[8].blocks[0].text!]:
    'جب بڑے ٹائم فریم کا ڈھانچہ اوپری غیر چھوئی گئی بائے سائیڈ لیکویڈیٹی کی طرف ہو اور قیمت 50% ایکویلیبریم سے نیچے ڈسکاؤنٹ میں آئے تو سمت الٹ دیں:',
  [data.sections[8].blocks[1].items![0]]:
    'مرحلہ 1 — 50% ایکویلیبریم کے عین نیچے دیکھیں: 25%–50% بالائی ڈسکاؤنٹ چوتھائی میں موجود بلش فیئر ویلیو گیپس (BISI)، والیوم امبیلنس یا سسپنشن گیپس پہچانیں۔',
  [data.sections[8].blocks[1].items![1]]:
    'مرحلہ 2 — گہرے ڈسکاؤنٹ کی ہم آہنگی کو ترجیح دیں (0%–25% / Q1): 0.62–0.79 OTE ونڈو کے ساتھ اوورلیپ ہوتے بلش آرڈر بلاکس، بلش بریکرز یا مٹیگیشن بلاکس دیکھیں۔',
  [data.sections[8].blocks[1].items![2]]:
    'مرحلہ 3 — گہری انتہائی حدود پر نظر رکھیں (0%–10%): بلش ریجیکشن بلاکس (لمبی نچلی وِکس) اور سیل سائیڈ لیکویڈیٹی (SSL / پرانے لوز) نشان زد کریں جنہیں قیمت اوپر پلٹنے سے پہلے سویپ کر سکتی ہے۔',
  [data.sections[8].blocks[1].items![3]]:
    'گرتا ہوا چاقو پکڑنے سے بچیں: پل بیک ختم ماننے سے پہلے قیمت کا فعال ڈسکاؤنٹ اَرے کو چھونے اور LTF ساختی شفٹ دکھانے کا انتظار کریں۔',

  // Section 10
  [data.sections[9].title]: '10. کلاسک وِک FVG بمقابلہ سسپنشن باڈی گیپ بمقابلہ IFVG بمقابلہ ری کلیمڈ بلاکس',
  [data.sections[9].blocks[0].text!]:
    'گیپ جیسی ہر کینڈل ساخت ایک ہی جیومیٹری پر نہیں چلتی۔ باڈی گیپس کو کلاسک بیرونی وِک FVGs میں ملانا یا بلاک کی سمتی تبدیلی کو نظرانداز کرنا بیک ٹیسٹ ریکارڈ خراب کر دیتا ہے:',
  [data.sections[9].blocks[1].rows![0][0]]: 'اَرے کی قسم',
  [data.sections[9].blocks[1].rows![0][1]]: 'عین کینڈل / قیمت جیومیٹری',
  [data.sections[9].blocks[1].rows![0][2]]: 'سمتی تاریخ اور بنیادی اصول',
  [data.sections[9].blocks[1].rows![1][0]]: 'کلاسک فیئر ویلیو گیپ (FVG)',
  [data.sections[9].blocks[1].rows![1][1]]: 'کینڈل 2 کے آر پار کینڈل 1 کی بیرونی وِک اور کینڈل 3 کی بیرونی وِک کے درمیان عین خلا',
  [data.sections[9].blocks[1].rows![1][2]]: 'بنیادی BISI (بلش) یا SIBI (بیئرش) عدم توازن؛ وسط نقطہ Consequent Encroachment (50% CE) ہے',
  [data.sections[9].blocks[1].rows![2][0]]: 'سسپنشن بلاک (باڈی گیپ جوڑا)',
  [data.sections[9].blocks[1].rows![2][1]]: 'سابقہ کلوز = 100، مرکزی کینڈل اوپن/کلوز = 102/106، اگلا اوپن = 108 جو وِکس ملنے کے باوجود 100–102 اور 106–108 پر باڈی گیپس چھوڑتا ہے',
  [data.sections[9].blocks[1].rows![2][2]]: 'اسے ہرگز 100–108 کا کلاسک بیرونی وِک FVG نہ کہیں؛ باڈی کی قیمت کے خلا الگ ناپے جاتے ہیں',
  [data.sections[9].blocks[1].rows![3][0]]: 'انورس فیئر ویلیو گیپ (IFVG)',
  [data.sections[9].blocks[1].rows![3][1]]: 'موجودہ FVG جس کی پوری حدود کے پار مخالف کینڈل باڈی صاف کلوز ہو جائے',
  [data.sections[9].blocks[1].rows![3][2]]: 'سمتی کردار الٹ جاتا ہے: ٹوٹا ہوا بلش BISI بالائی بیئرش مزاحمت بن سکتا ہے (اور اس کے برعکس)',
  [data.sections[9].blocks[1].rows![4][0]]: 'ری کلیمڈ بلاک / اَرے',
  [data.sections[9].blocks[1].rows![4][1]]: 'وہ حوالہ جو سمت A میں کام کرے، عارضی طور پر ناکام ہو (کردار بدلے) اور پھر تیزی سے واپس سمت A حاصل کر لے',
  [data.sections[9].blocks[1].rows![4][2]]: 'پرانے زون کو ہمیشہ کے لیے مٹانے کے بجائے مکمل ترتیب کی تاریخ محفوظ رکھتا ہے',

  // Section 11
  [data.sections[10].title]: '11. کسی بھی PD اَرے کی باریکی: 50% کنسیکوئنٹ انکروچمنٹ (CE) بمقابلہ مین تھریشولڈ (MT)',
  [data.sections[10].blocks[0].text!]:
    'نئے طلبہ اکثر پوچھتے ہیں کہ آیا PD اَرے کے قریبی کنارے پر انٹری لیں یا وسط کا انتظار کریں۔ SMC میں دو الگ دقیق وسط گیپس کو ٹھوس کینڈل باڈیز سے الگ رکھتے ہیں:',
  [data.sections[10].blocks[1].rows![0][0]]: 'پیمائش کا نام',
  [data.sections[10].blocks[1].rows![0][1]]: 'کس پر لاگو ہوتا ہے',
  [data.sections[10].blocks[1].rows![0][2]]: 'عین حسابی فارمولا',
  [data.sections[10].blocks[1].rows![0][3]]: 'تصدیق / ناکامی کا اصول',
  [data.sections[10].blocks[1].rows![1][0]]: 'کنسیکوئنٹ انکروچمنٹ (CE)',
  [data.sections[10].blocks[1].rows![1][1]]: 'فیئر ویلیو گیپس، لیکویڈیٹی وائڈز، NWOG/NDOG، ریجیکشن وِکس',
  [data.sections[10].blocks[1].rows![1][2]]: '(Gap_High + Gap_Low) ÷ 2 (گیپ یا وِک کا عین 50% وسط)',
  [data.sections[10].blocks[1].rows![1][3]]: 'مثالی طور پر کینڈل باڈیز CE کا احترام کرتی ہیں؛ اس کے پار صاف کلوز گہری حرکت دکھاتا ہے',
  [data.sections[10].blocks[1].rows![2][0]]: 'مین تھریشولڈ (MT)',
  [data.sections[10].blocks[1].rows![2][1]]: 'آرڈر بلاکس، بریکر بلاکس، مٹیگیشن بلاکس',
  [data.sections[10].blocks[1].rows![2][2]]: '(OB_Body_Open + OB_Body_Close) ÷ 2 (کینڈل باڈی یا سلسلے کا عین 50% وسط)',
  [data.sections[10].blocks[1].rows![2][3]]: 'صحت مند آرڈر بلاکس اکثر اوپننگ قیمت سے پلٹتے ہیں یا باڈیز کو 50% MT کے اندر رکھتے ہیں',

  // Section 12
  [data.sections[11].title]: '12. آرڈر بلاک، بریکر، مٹیگیشن اور ریجیکشن بلاک کا براہِ راست موازنہ',
  [data.sections[11].blocks[0].text!]:
    'جب چار بلاک اصطلاحات ایک جیسی لگیں تو لائیو مارکیٹ میں درستگی ٹوٹ جاتی ہے۔ ان کی ساختی شرائط کو صاف الگ رکھیں:',
  [data.sections[11].blocks[1].rows![0][0]]: 'بلاک کی قسم',
  [data.sections[11].blocks[1].rows![0][1]]: 'پہلے لیکویڈیٹی سویپ ضروری؟',
  [data.sections[11].blocks[1].rows![0][2]]: 'مطلوبہ بریک ترتیب',
  [data.sections[11].blocks[1].rows![0][3]]: 'ترجیحی اینکر حوالہ',
  [data.sections[11].blocks[1].rows![1][0]]: 'آرڈر بلاک (OB)',
  [data.sections[11].blocks[1].rows![1][1]]: 'اختیاری (بیرونی یا اندرونی سویپ کے بعد زیادہ مضبوط)',
  [data.sections[11].blocks[1].rows![1][2]]: 'طاقتور روانگی جو ڈسپلیسمنٹ + FVG چھوڑے',
  [data.sections[11].blocks[1].rows![1][3]]: 'مخالف کینڈل سلسلے کا اوپننگ پرائس + 50% مین تھریشولڈ',
  [data.sections[11].blocks[1].rows![2][0]]: 'بریکر بلاک (BRK)',
  [data.sections[11].blocks[1].rows![2][1]]: 'ہاں — پہلے قریبی سوئنگ ہائی یا لو کا سویپ لازمی ہے',
  [data.sections[11].blocks[1].rows![2][2]]: 'تیز ریورسل جو سویپ شدہ OB سلسلے کے پار کلوز ہو',
  [data.sections[11].blocks[1].rows![2][3]]: 'ٹوٹے ہوئے OB سلسلے کا 50% مین تھریشولڈ یا اوپننگ کنارہ',
  [data.sections[11].blocks[1].rows![3][0]]: 'مٹیگیشن بلاک (MIT)',
  [data.sections[11].blocks[1].rows![3][1]]: 'نہیں — پچھلے سوئنگ ہائی یا لو کو لینے میں واضح طور پر ناکام رہتا ہے',
  [data.sections[11].blocks[1].rows![3][2]]: 'سویپ انتہا بنائے بغیر فوراً مخالف اسٹرکچر توڑ دیتا ہے',
  [data.sections[11].blocks[1].rows![3][3]]: 'ناکامی سے پہلے آخری مخالف سوئنگ کینڈل باڈی کا اوپن / MT',
  [data.sections[11].blocks[1].rows![4][0]]: 'ریجیکشن بلاک (RB)',
  [data.sections[11].blocks[1].rows![4][1]]: 'رینج کی انتہا پر لمبی ریجیکشن وِک سے بنتا ہے',
  [data.sections[11].blocks[1].rows![4][2]]: 'متعدد کینڈل باڈیز لمبی وِکس کے نیچے یا اوپر ہموار جمع ہوتی ہیں',
  [data.sections[11].blocks[1].rows![4][3]]: 'جمع شدہ کینڈل باڈیز کا بلند یا نچلا کنارہ (وِک کے سرے سے پہلے)',

  // Section 13
  [data.sections[12].title]: '13. وقت پر مبنی PD اَریز: NWOG، NDOG، مڈنائٹ اوپن اور RTH اوپننگ گیپس',
  [data.sections[12].blocks[0].text!]:
    'ہر PD اَرے صرف انٹرا ڈے کینڈل گروپ سے نہیں بنتا۔ وقت سے جڑے اوپننگ بینچ مارکس ہفتہ وار اور روزانہ گردش میں بڑا حوالہ جاتی وزن رکھتے ہیں:',
  [data.sections[12].blocks[1].items![0]]:
    'نیو ویک اوپننگ گیپ (NWOG): جمعہ 17:00 NY فیوچرز کلوز اور اتوار 18:00 NY دوبارہ کھلنے کا درمیانی خلا۔ موجودہ قیمت سے اوپر NWOG پریمیم اور نیچے ڈسکاؤنٹ میں ہوتا ہے۔',
  [data.sections[12].blocks[1].items![1]]:
    'نیو ڈے اوپننگ گیپ (NDOG): گزشتہ کاروباری دن کے 16:59 M1 کلوز (17:00 NY) اور 18:00 NY الیکٹرانک کھلنے کا خلا۔ روزانہ دیکھ بھال کے وقفوں کو RTH سیشنز سے الگ رکھتا ہے۔',
  [data.sections[12].blocks[1].items![2]]:
    'مڈنائٹ اوپن (00:00 NY): افقی یومیہ ایکویلیبریم بینچ مارک کا کام کرتا ہے — بلش یومیہ سیشن اکثر اوپر پھیلنے سے پہلے مڈنائٹ اوپن سے نیچے (ڈسکاؤنٹ) جاتے ہیں اور بیئرش اوپر (پریمیم) جا کر گرتے ہیں۔',
  [data.sections[12].blocks[1].items![3]]:
    'RTH اوپننگ گیپ (09:30 NY): گزشتہ باقاعدہ اوقات کے 16:00 NY کلوز اور آج کے 09:30 NY ایکویٹی اوپن کا درمیانی خلا۔',

  // Section 14
  [data.sections[13].title]: '14. پرائس ڈیلیوری تسلسل (Continuum): اندرونی اور بیرونی لیکویڈیٹی کا چکر',
  [data.sections[13].blocks[0].text!]:
    'مارکیٹیں من مانی لکیروں کے درمیان بے مقصد نہیں گھومتیں؛ قیمت دو تکمیلی قطبوں کے درمیان منظم گھومتی ہے: بیرونی رینج لیکویڈیٹی (ERL — رینج کناروں پر پرانے سوئنگ ہائیز اور لوز) اور اندرونی رینج لیکویڈیٹی (IRL — رینج کے اندر موجود FVGs، آرڈر بلاکس اور بریکرز)۔',
  [data.sections[13].blocks[1].text!]:
    'کسی بیرونی سوئنگ ہائی یا لو (ERL) کو سویپ کرنے کے بعد قیمت اکثر اندر کسی اندرونی FVG یا آرڈر بلاک (IRL) کی طرف ری بیلنس ہوتی ہے۔ اس اندرونی اَرے پر ردعمل کی تصدیق کے بعد قیمت مخالف بیرونی لیکویڈیٹی پول کی طرف نکلتی ہے۔ دونوں لیگز کا جڑاؤ دیکھنے کے لیے نیچے متحرک تسلسل خاکہ چلائیں۔',

  // Section 15
  [data.sections[14].title]: '15. کم مزاحمت لیکویڈیٹی رن (LRLR) بمقابلہ زیادہ مزاحمت لیکویڈیٹی رن (HRLR)',
  [data.sections[14].blocks[0].text!]:
    'آپ کی انٹری اور مخالف Draw on Liquidity کے درمیان کتنی رکاوٹ موجود ہے، اس کے مطابق ایک مثالی ڈسکاؤنٹ آرڈر بلاک بھی مختلف رویہ دکھاتا ہے:',
  [data.sections[14].blocks[1].rows![0][0]]: 'رن کی حالت',
  [data.sections[14].blocks[1].rows![0][1]]: 'رینج کے اندر چارٹ کی نشانی',
  [data.sections[14].blocks[1].rows![0][2]]: 'متوقع ڈیلیوری رویہ',
  [data.sections[14].blocks[1].rows![0][3]]: 'میٹرکس انتظام کا اثر',
  [data.sections[14].blocks[1].rows![1][0]]: 'کم مزاحمت لیکویڈیٹی رن (LRLR)',
  [data.sections[14].blocks[1].rows![1][1]]: 'صاف ڈسپلیسمنٹ لیگز مع غیر مٹیگیٹڈ FVGs اور آگے پرانے غیر چھوئے ہائیز/لوز',
  [data.sections[14].blocks[1].rows![1][2]]: 'قیمت تیزی سے ڈسکاؤنٹ IRL سے پریمیم ERL تک پھسلتی ہے؛ ہلکے پُل بیک گہرے اَریز تک نہیں آتے',
  [data.sections[14].blocks[1].rows![1][3]]: 'گہرے 0.79 کی ضد کے بجائے تصدیق شدہ قریبی IRL (FVG/VI) کا انتظار کریں',
  [data.sections[14].blocks[1].rows![2][0]]: 'زیادہ مزاحمت لیکویڈیٹی رن (HRLR)',
  [data.sections[14].blocks[1].rows![2][1]]: 'اوورلیپ کرتی شور بھری وِکس، پرانے ٹوٹے FVGs، خبروں کے اسپائکس اور گھنے سوئنگ جھرمٹ',
  [data.sections[14].blocks[1].rows![2][2]]: 'قیمت بار بار مخالف PD اَریز پر اٹکتی ہے اور جھوٹے بریک آؤٹ بناتی ہے',
  [data.sections[14].blocks[1].rows![2][3]]: 'سخت ملٹی گیٹ ہم آہنگی مانگیں یا کنسولیڈیشن کے دوران صاف کنارہ کش رہیں',

  // Section 16
  [data.sections[15].title]: '16. اہل سیٹ اپ ٹرگرز: ہم آہنگی کے درجات اور انٹری شرائط',
  [data.sections[15].blocks[0].text!]:
    'یاد رکھیں: قیمت کا ڈسکاؤنٹ (<50%) میں داخل ہونا یا آرڈر بلاک کو چھونا صرف مقام کا تناظر ہے — کوئی خودکار خریداری بٹن نہیں۔ تعلیمی سیٹ اپ درج کرنے سے پہلے چھ واضح شرائط ملائیں:',
  [data.sections[15].blocks[1].text!]:
    'نیچے انٹرایکٹو اہلیت پینل میں تمام چھ شرائط آزما کر دیکھیں کہ اینکر کی کمی، دوپہر کا شور یا LTF شفٹ کی غیر موجودگی کیسے کسی دلکش مستطیل کو محض واچ لسٹ تک محدود کر دیتی ہے۔',

  // Section 17
  [data.sections[16].title]: '17. ملٹی ٹائم فریم نیسٹنگ: 15M پریمیم روزانہ ڈسکاؤنٹ کے اندر کیسے بیٹھتا ہے؟',
  [data.sections[16].blocks[0].text!]:
    'درمیانی سطح کے ٹریڈرز کو الجھانے والا سب سے بڑا سوال: "اگر ڈیلی چارٹ ڈسکاؤنٹ دکھا رہا ہے تو میرا 15M رینج پریمیم کیوں دکھاتا ہے؟" کیونکہ ڈیلنگ رینجز فریکٹل ہوتی ہیں! ہر ٹائم فریم کی اپنی ہائی سے لو حد ہوتی ہے۔',
  [data.sections[16].blocks[1].text!]:
    'جب مارکیٹ 4H ڈسکاؤنٹ آرڈر بلاک میں اترے تو 15M پر ایک چھوٹا سا اچھال عارضی طور پر "15M پریمیم" لگ سکتا ہے۔ 4H ڈسکاؤنٹ سے لڑنے کے بجائے صبر کرنے والے ٹریڈرز اس چھوٹے 15M سوئنگ کے دوبارہ 15M ڈسکاؤنٹ میں اترنے کا انتظار کرتے ہیں تاکہ ہفتہ وار، 4H اور 15M بیک وقت ڈسکاؤنٹ میں آ جائیں۔',

  // Section 18
  [data.sections[17].title]: '18. انٹرمیڈیٹ ٹرم ہائیز/لوز اور ساختی تصدیق میں تاخیر',
  [data.sections[17].blocks[0].text!]:
    'جدید PD اَرے نقشہ بندی اکثر ساختی سوئنگز کو PD تناظر سے جوڑتی ہے — مثلاً جب کسی شارٹ ٹرم سوئنگ ہائی کے بائیں اور دائیں دونوں طرف نچلے شارٹ ٹرم ہائیز بنیں یا وہ بڑے ٹائم فریم کے پریمیم PD اَرے میں بنے تو اسے Intermediate-Term High (ITH) کہا جاتا ہے۔',
  [data.sections[17].blocks[1].title!]: 'تصدیق کے وقت کی انتباہ',
  [data.sections[17].blocks[1].text!]:
    'چونکہ دائیں جانب کا نچلا ہائی مرکزی موڑ والی کینڈل بننے کے بعد آتا ہے، اس لیے Intermediate-Term High چوٹی کی ٹِک پر کبھی مکمل تصدیق شدہ نہیں ہوتا۔ ہمیشہ شناخت کا اصل وقت بعد کی تشریحی لیبلنگ سے الگ درج کریں۔',

  // Section 19
  [data.sections[18].title]: '19. حل شدہ بلش نقشہ: فرضی NQ فیوچرز ڈسکاؤنٹ سیڑھی',
  [data.sections[18].blocks[0].text!]:
    'آئیے نیویارک صبح کی لیکویڈیٹی میں ایک مکمل فرضی Nasdaq طرز (NQ) بلش نقشہ قدم بہ قدم دیکھتے ہیں (تمام قیمتیں محض تعلیمی مثالیں ہیں):',
  [data.sections[18].blocks[1].items![0]]:
    'مکمل ڈیلنگ رینج منجمد کریں: حرکت سوئنگ لو 20,200.00 سے سوئنگ ہائی 20,600.00 تک (400 پوائنٹس) جاتی ہے۔ عین 50% ایکویلیبریم = 20,400.00؛ گہرا ڈسکاؤنٹ (Q1) 20,300.00 سے نیچے ہے۔',
  [data.sections[18].blocks[1].items![1]]:
    'مخالف ہدف (ERL) پہچانیں: غیر چھوئی گئی بائے سائیڈ لیکویڈیٹی صاف طور پر 20,600.00 سے اوپر موجود ہے۔',
  [data.sections[18].blocks[1].items![2]]:
    'ڈسکاؤنٹ PD اَرے ہم آہنگی نقشہ: 20,260.00 اور 20,305.00 کے درمیان بلش FVG (CE = 20,282.50) ہے جو 0.705 OTE (20,318.00) اور 20,255.00–20,285.00 بلش آرڈر بلاک کے قریب ہے۔',
  [data.sections[18].blocks[1].items![3]]:
    'فعال سیشن اور سویپ ٹرگر کا انتظار (09:30–10:15 NY): قیمت 20,400.00 ایکویلیبریم سے نیچے اتر کر 20,295.00 اندرونی SSL نکالتے ہوئے 20,280.00 چھوتی ہے اور تازہ 5M BISI کے ساتھ اوپر کا 5M MSS بناتی ہے۔',
  [data.sections[18].blocks[1].items![4]]:
    'اسٹاپ ان ویلیڈیشن اور ہدف منصوبہ: حفاظتی ان ویلیڈیشن 20,200.00 رینج لو (یا تنگ اصول میں 20,255.00 OB کنارے) کے نیچے، جبکہ اہداف 20,400.00 ایکویلیبریم اور 20,600.00 BSL پر رکھے جاتے ہیں۔',

  // Section 20
  [data.sections[19].title]: '20. حل شدہ بیئرش نقشہ: فرضی EUR/USD پریمیم آبشار',
  [data.sections[19].blocks[0].text!]:
    'اب لندن سے نیویارک سیشن کے ایک فرضی EUR/USD بیئرش کیس میں سمت کو الٹا کر کے دیکھتے ہیں:',
  [data.sections[19].blocks[1].items![0]]:
    'مکمل ڈیلنگ رینج منجمد کریں: نیچے کی لیگ سوئنگ ہائی 1.09000 سے سوئنگ لو 1.08000 تک گرتی ہے (100.0 پپس)۔ عین 50% ایکویلیبریم = 1.08500؛ بالائی پریمیم (Q4) 1.08750 سے اوپر ہے۔',
  [data.sections[19].blocks[1].items![1]]:
    'مخالف ہدف (ERL) تلاش کریں: صاف سیل سائیڈ لیکویڈیٹی 1.08000 سے نیچے موجود ہے۔',
  [data.sections[19].blocks[1].items![2]]:
    'پریمیم PD اَرے اسٹیک نقشہ: Q4 پریمیم کے اندر بیئرش بریکر بلاک (1.08720–1.08840) غیر مٹیگیٹڈ بیئرش FVG (1.08700–1.08820، CE = 1.08760) کے ساتھ اوورلیپ کرتا ہے۔',
  [data.sections[19].blocks[1].items![3]]:
    'ٹرگر تصدیق (08:30 NY): قیمت 1.08500 ایکویلیبریم سے اوپر بڑھ کر ایشین ہائیز کے اوپر 1.08790 سویپ کرتی ہے اور 5M Change in State of Delivery (CISD) سے نیچے مڑتی ہے۔',
  [data.sections[19].blocks[1].items![4]]:
    'رسک اور ان ویلیڈیشن: 1.09000 سے اوپر کوئی بھی فیصلہ کن بڑے ٹائم فریم کلوز بیئرش مفروضے کو فوراً باطل کر دیتا ہے — باطل ہائی بچانے کے لیے اسٹاپ نہ سرکائیں۔',

  // Section 21
  [data.sections[20].title]: '21. پریمیم، ڈسکاؤنٹ اور PD اَرے میٹرکس کی چھ غلطیاں جن سے بچنا ہے',
  [data.sections[20].blocks[0].items![0]]:
    '80% پریمیم میں پھنسے "خوبصورت FVG" پر خریداری: محض 1M FVG صاف دکھنے کی وجہ سے رینج کا نصف بھول جانا جہاں رینج ہائی تک کوئی جگہ باقی نہ ہو۔',
  [data.sections[20].blocks[0].items![1]]:
    'نقصان کے بعد اینکر بدلنا: ٹریڈ کے بعد 20 دن کی رینج کو 60 دن پر لے جانا تاکہ ناکام اسٹاپ کو درست ثابت کیا جا سکے۔',
  [data.sections[20].blocks[0].items![2]]:
    'بڑے ہفتہ وار ڈسکاؤنٹ OB کے خلاف فروخت: بڑے ٹائم فریم کا مقام دیکھے بغیر سیدھے HTF سپورٹ کے سامنے 5M بیئرش سیٹ اپس لینا۔',
  [data.sections[20].blocks[0].items![3]]:
    'ہر باکس کو اندھا لِمٹ آرڈر سمجھنا: اندرونی سویپ یا LTF MSS ردعمل کا انتظار کیے بغیر تیز حرکت کے سامنے کود پڑنا۔',
  [data.sections[20].blocks[0].items![4]]:
    'سسپنشن باڈی گیپس کو کلاسک وِک FVGs سمجھنا: جرنل آڈٹ میں وِکس ملنے والے باڈی گیپس کو خالص وِک گیپس لکھ دینا۔',
  [data.sections[20].blocks[0].items![5]]:
    'ہائی ریزسٹنس چوپ اور خبروں کے جھٹکوں کو نظرانداز کرنا: دوپہر کے سناٹے یا CPI/NFP/FOMC کے عین وقت پر کتابی اچھال کی توقع رکھنا۔',

  // Section 22
  [data.sections[21].title]: '22. انٹرایکٹو عملدرآمد سے پہلے PD اَرے اہلیت چیک لسٹ',
  [data.sections[21].blocks[0].text!]:
    'چارٹ ری پلے میں کسی بھی پریمیم یا ڈسکاؤنٹ PD اَرے سیٹ اپ کو ریکارڈ کرنے سے پہلے نیچے تمام چھ ساختی شرائط کی تصدیق کریں:',

  // Section 23 (Glossary)
  [data.sections[22].title]: '23. مکمل پریمیم، ڈسکاؤنٹ اور PD اَرے لغت (24 اصطلاحات)',
  [data.sections[22].blocks[0].text!]:
    'تمام بنیادی اور جدید PD اَرے اصطلاحات ساتھ ساتھ دیکھیں تاکہ رینج اینکرز، حدود کے فارمولے اور میٹرکس اصول واضح رہیں۔',
  [data.sections[22].blocks[1].rows![0][0]]: 'اصطلاح',
  [data.sections[22].blocks[1].rows![0][1]]: 'تعریف',
  'PD-array matrix': 'PD اَرے میٹرکس',
  'A range-relative map of selected price references across completed lookback periods.':
    'مکمل سابقہ ادوار کی منتخب قیمت سطحوں کا رینج سے متعلق نقشہ۔',
  'Price delivery continuum': 'پرائس ڈیلیوری تسلسل (Continuum)',
  'Connecting completed higher-timeframe context to finer price references without using future bars.':
    'مستقبل کی کینڈلز کے بغیر مکمل بڑے ٹائم فریم کو باریک قیمت حوالوں سے جوڑنا۔',
  'Range equilibrium': 'رینج ایکویلیبریم',
  'The midpoint of the selected high–low interval; changing the anchors changes the level.':
    'منتخب ہائی لو کا وسط؛ اینکر بدلنے سے سطح بدلتی ہے۔',
  'Premium Zone': 'پریمیم زون',
  'Upper 50% to 100% half of a declared Dealing Range above Equilibrium, studied for bearish distributions.':
    'طے شدہ ڈیلنگ رینج کا ایکویلیبریم سے اوپر 50% تا 100% بالائی نصف حصہ، جو بیئرش ڈسٹری بیوشن کے مطالعے کے لیے ہے۔',
  'Discount Zone': 'ڈسکاؤنٹ زون',
  'Lower 0% to 50% half of a declared Dealing Range below Equilibrium, studied for bullish accumulations.':
    'طے شدہ ڈیلنگ رینج کا ایکویلیبریم سے نیچے 0% تا 50% نچلا نصف حصہ، جو بلش جمع کاری کے مطالعے کے لیے ہے۔',
  'Dealing Range': 'ڈیلنگ رینج',
  'A completed Swing Low to Swing High price leg selected explicitly before measuring Premium/Discount.':
    'پریمیم اور ڈسکاؤنٹ ناپنے سے پہلے واضح طور پر منتخب کی گئی مکمل سوئنگ لو تا سوئنگ ہائی لیگ۔',
  'Quadrants (25% / 75%)': 'کواڈرنٹس (25% / 75%)',
  'Quarter subdivisions splitting Discount into Q1 (0–25%) / Q2 (25–50%) and Premium into Q3 (50–75%) / Q4 (75–100%).':
    'چوتھائی تقسیم جو ڈسکاؤنٹ کو Q1/Q2 اور پریمیم کو Q3/Q4 میں بانٹتی ہے۔',
  'External Range Liquidity (ERL)': 'بیرونی رینج لیکویڈیٹی (ERL)',
  'Old swing highs (BSL) and swing lows (SSL) resting at the outer boundary edges of a Dealing Range.':
    'ڈیلنگ رینج کے بیرونی کناروں پر موجود پرانے سوئنگ ہائیز (BSL) اور سوئنگ لوز (SSL)۔',
  'Internal Range Liquidity (IRL)': 'اندرونی رینج لیکویڈیٹی (IRL)',
  'Fair Value Gaps, Order Blocks, Breakers, and Voids situated inside the interior of a Dealing Range.':
    'ڈیلنگ رینج کے اندرونی حصے میں موجود فیئر ویلیو گیپس، آرڈر بلاکس، بریکرز اور وائڈز۔',
  'Optimal Trade Entry (OTE)': 'آپٹیمل ٹریڈ انٹری (OTE)',
  'The deep 62%–79% Fibonacci retracement zone (midpoint 70.5%) inside Discount or Premium.':
    'ڈسکاؤنٹ یا پریمیم کے اندر گہرا 62%–79% فبوناکی ریٹریسمنٹ زون (وسطی نقطہ 70.5%)۔',
  'Order Block (OB)': 'آرڈر بلاک (OB)',
  'Consecutive opposing candle run immediately preceding energetic displacement and structural break.':
    'طاقتور ڈسپلیسمنٹ اور ساختی بریک سے عین پہلے آنے والی مسلسل مخالف کینڈلز کا سلسلہ۔',
  'Mean Threshold (MT)': 'مین تھریشولڈ (MT)',
  'The exact 50% midpoint of an Order Block or Breaker candle body run: (Body_Open + Body_Close) ÷ 2.':
    'آرڈر بلاک یا بریکر کینڈل باڈی کا عین 50% وسط: (Body_Open + Body_Close) ÷ 2۔',
  'Fair Value Gap (FVG)': 'فیئر ویلیو گیپ (FVG)',
  'A three-candle outer-wick imbalance separating Candle 1 and Candle 3 extremes across Candle 2.':
    'تین کینڈلز کا بیرونی وِک عدم توازن جو کینڈل 2 کے آر پار کینڈل 1 اور کینڈل 3 کے سروں کو الگ کرتا ہے۔',
  'Consequent Encroachment (CE)': 'کنسیکوئنٹ انکروچمنٹ (CE)',
  'The exact 50% arithmetic midpoint of a Fair Value Gap, Volume Imbalance, wick, or opening gap.':
    'فیئر ویلیو گیپ، والیوم امبیلنس، وِک یا اوپننگ گیپ کا عین 50% حسابی وسط۔',
  'Suspension body gaps': 'سسپنشن باڈی گیپس',
  'Selected body-price discontinuities adjacent to a central candle; not automatically a classic wick-based FVG.':
    'مرکزی کینڈل کے ساتھ جسمانی قیمت کے منتخب گیپ؛ خودکار Classic Wick FVG نہیں۔',
  'Inverse Fair Value Gap (IFVG)': 'انورس فیئر ویلیو گیپ (IFVG)',
  'A Fair Value Gap breached cleanly on a closing basis that reverses from support to resistance or vice versa.':
    'کلوزنگ کی بنیاد پر صاف ٹوٹنے والا FVG جو سپورٹ سے مزاحمت یا مزاحمت سے سپورٹ بن جائے۔',
  'Reclaimed reference': 'ری کلیمڈ حوالہ',
  'A price reference returning to a prior directional role after an intervening role change.':
    'درمیان میں کردار بدلنے کے بعد سابقہ سمتی کردار لینے والا حوالہ۔',
  'Breaker Block': 'بریکر بلاک',
  'A failed Order Block created after sweeping a prior swing high or low and breaking aggressively the opposite way.':
    'سابقہ سوئنگ ہائی یا لو سویپ کرنے کے بعد مخالف سمت تیز بریک سے بننے والا ناکام آرڈر بلاک۔',
  'Mitigation Block': 'مٹیگیشن بلاک',
  'A failed structural swing retest that turns without sweeping the preceding swing high or low.':
    'ساختی سوئنگ کی ناکام واپسی جو پچھلا ہائی یا لو سویپ کیے بغیر ہی پلٹ جائے۔',
  'Rejection Block': 'ریجیکشن بلاک',
  'A deep extreme array defined by long wicks projecting beyond tightly clustered candle bodies.':
    'اکٹھی کینڈل باڈیز سے باہر نکلتی لمبی وِکس سے بننے والا انتہائی کنارے کا اَرے۔',
  'Liquidity Void': 'لیکویڈیٹی وائڈ',
  'A broad multi-candle corridor of rapid one-sided expansion lacking overlapping opposing candles.':
    'متعدد کینڈلز کا وسیع یک طرفہ پھیلاؤ جس میں مخالف کینڈلز کا اوورلیپ نہ ہو۔',
  'NWOG / NDOG': 'NWOG / NDOG',
  'New Week (Friday 17:00–Sunday 18:00 NY) and New Day (17:00–18:00 NY) time-anchored opening gaps.':
    'نئے ہفتے (جمعہ 17:00–اتوار 18:00 NY) اور نئے دن (17:00–18:00 NY) کے وقتی اوپننگ گیپس۔',
  'Low-Resistance Liquidity Run (LRLR)': 'کم مزاحمت لیکویڈیٹی رن (LRLR)',
  'Clean market path with sparse opposing obstacles where price travels efficiently between IRL and ERL.':
    'کم مخالف رکاوٹوں والا صاف راستہ جہاں قیمت آسانی سے IRL اور ERL کے درمیان سفر کرتی ہے۔',
  'Intermediate-Term High/Low (ITH/ITL)': 'انٹرمیڈیٹ ٹرم ہائی/لو (ITH/ITL)',
  'A confirmed short-term swing high/low flanked by lower highs (or higher lows) on both sides.':
    'تصدیق شدہ شارٹ ٹرم سوئنگ ہائی یا لو جس کے دونوں جانب نچلے ہائیز (یا اونچے لوز) موجود ہوں۔',

  // Section 24 (Verbatim preserved baseline from src/i18n/urdu.ts)
  [data.sections[23].title]: '24. محفوظ مطالعاتی حوالہ، بنیادی آڈٹس اور ادارہ جاتی ذرائع',
  [data.sections[23].blocks[0].text!]:
    'حالیہ بیس مکمل تجارتی دن لیں، بیس کیلنڈر دن نہیں۔ بلند ترین ہائی اور کم ترین لو کو چار حصوں میں بانٹیں۔ 100–140 رینج کا وسط 120 اور چوتھائی سطحیں 110، 130 ہیں۔ 132 منتخب رینج کی اوپری چوتھائی میں ہے۔ Premium وسط سے اوپر، Discount نیچے ہے؛ بنیادی مہنگا یا سستا ہونا مراد نہیں۔ اینکر نمایاں رکھیں کیونکہ دوسری جائز رینج سے درجہ بدل سکتا ہے۔',
  [data.sections[23].blocks[1].text!]:
    'چھوٹے ٹائم فریم پر PD Array چننے سے پہلے بڑے ٹائم فریم کا ہدف اور متعلقہ چوتھائی دیکھیں۔ پندرہ منٹ FVG 120–126 ہو، مگر اوپری نصف عبور ہو چکا ہو تو پورا زون Untouched نہ کہیں۔ مکمل پانچ اور ایک منٹ کینڈلز سے باقی امیدوار حصہ دیکھیں۔ نئی بڑی کینڈل مکمل ہونے پر بڑے ٹائم فریم کو دوبارہ دیکھیں۔ تیز چلتی مارکیٹ میں چالیس یا ساٹھ دن الگ نشان زد توسیع ہو سکتی ہے؛ انٹری کے مطابق اینکر بدلنا بعد کی معلومات ہے۔',
  [data.sections[23].blocks[2].text!]:
    'Classic FVG بیرونی وِکس کا موازنہ ہے۔ Suspension درمیانی کینڈل کے گرد Body-Price Imbalances دیکھتا ہے؛ اوورلیپ وِکس سے یہ جسم پر مبنی ترتیب لازماً ختم نہیں ہوتی۔ مثال: سابقہ کلوز 100، مرکزی اوپن/کلوز 102/106، اگلا اوپن 108 ہو تو Body Gaps 100–102 اور 106–108 ہیں۔ یہ Classic 100–108 FVG کا ثبوت نہیں۔ Inverse FVG مقررہ ناکامی کے بعد سمتی استعمال بدلتا ہے؛ Reclaimed حوالہ مزید تبدیلی کے بعد سابقہ کردار لیتا ہے۔ ان لیبلز کی تاریخیں الگ ہیں۔',
  [data.sections[23].blocks[3].text!]:
    'مکمل رینج 100–140 اور بیئرش مطالعہ 134 کے قریب فرض کریں۔ 132–134 کا قریبی Premium حوالہ اس جگہ سے متعلق ہے؛ 106–108 کا بلش گیپ رینج کے دوسرے حصے میں ہے۔ صاف شکل اکیلی کامیابی نہیں۔ لکھیں کون سا حوالہ پہلے معلوم تھا، پہلے کیسے ٹریڈ ہوا اور کردار کب ختم ہوگا۔ Balanced Price Range مخصوص مخالف وقفوں کا اوورلیپ ہے، سپورٹ کی ضمانت نہیں۔ Low-Resistance حرکت آپ کے Array تک واپس نہیں بھی آ سکتی؛ پیچیدہ High-Resistance راستہ کوئی انٹری نہ لینے کی وجہ ہو سکتا ہے۔',
  [data.sections[23].blocks[4].text!]:
    'پہلے رینج اور ہدف، پھر متعلقہ PD Array اور اندرونی شکل دیکھیں۔ Order Block ایک کینڈل یا مسلسل سلسلہ چنتا ہے؛ اوپن، جسم کا وسط اور پوری وِک الگ حدود ہیں۔ Breaker پہلے سوئنگ کا سلسلہ اور بدلا کردار بڑھاتا ہے۔ Rejection Block رد والی وِک سے وابستہ جسم کا حوالہ ہے۔ FVG، IFVG، BPR اور Suspension دوسری ترتیبیں ہیں۔ درجہ بندی سوال منظم کرتی ہے، کسی مستطیل کی ہمیشہ برتری ثابت نہیں۔ حوالے ملانے سے پہلے بنیادی ابواب کی درست تعریف اپنائیں۔',
  [data.sections[23].blocks[5].text!]:
    'ساختی نام تصدیق شدہ سوئنگ کے تعلق پر ہیں۔ عام Nested موازنے میں Intermediate-Term High ایسا منتخب Short-Term High ہے جس کے دونوں طرف نیچے Short-Term High ہوں؛ خاص اصول واضح چاہیے۔ دائیں طرف کا موازنہ بعد میں آتا ہے، اس لیے مرکزی ہائی بنتے ہی نام معلوم نہیں۔ بڑا PD Array تناظر دے سکتا ہے، تصدیق کی تاخیر نہیں مٹاتا۔ سوئنگ درجہ بندی رینج سے ملائیں مگر آخری ساختی نام موڑ کی کینڈل پر پہلے معلوم نہ سمجھیں۔',
  [data.sections[23].blocks[6].text!]:
    'بڑے ٹائم فریم نقشے کو چھوٹے ٹائم فریم Execution سے الگ رکھیں۔ ایک ماڈل میں ملانے سے پہلے انفرادی حوالے Chart Laboratory میں پہچانیں۔',

  // Section 25 & FAQs
  [data.sections[24].title]: '25. پریمیم، ڈسکاؤنٹ اور PD اَرے میٹرکس سے متعلق عام سوالات',
  [data.sections[24].blocks[0].text!]:
    'SMC میں پریمیم، ڈسکاؤنٹ اور PD اَرے میٹرکس کے بارے میں ابتدائی، درمیانی اور جدید طلبہ کے بارہ سب سے زیادہ تلاش کیے جانے والے سوالات کے واضح جوابات پڑھیں۔',
  [data.faqs[0].question]: 'SMC ٹریڈنگ میں پریمیم اور ڈسکاؤنٹ کا کیا مطلب ہے؟',
  [data.faqs[0].answer]:
    'اسمارٹ منی کانسیپٹس (SMC) میں پریمیم اور ڈسکاؤنٹ مکمل ہائی تا لو ڈیلنگ رینج کو 50% ایکویلیبریم پر تقسیم کرتے ہیں۔ 50% سے اوپر ہر قیمت پریمیم (فروخت کے لیے موزوں) اور 50% سے نیچے ڈسکاؤنٹ (خریداری کے لیے موزوں) کہلاتی ہے۔',
  [data.faqs[1].question]: 'PD اَرے میٹرکس میں PD سے کیا مراد ہے؟',
  [data.faqs[1].answer]:
    'PD سے مراد پریمیم اور ڈسکاؤنٹ ہے۔ PD اَرے میٹرکس ایک منظم فہرست ہے جو لیکویڈیٹی پولز، آرڈر بلاکس، فیئر ویلیو گیپس، بریکر بلاکس اور ریجیکشن بلاکس کو رینج کے پریمیم اور ڈسکاؤنٹ حصوں میں درجہ بند کرتی ہے۔',
  [data.faqs[2].question]: '50% ایکویلیبریم کا عین فارمولا کیا ہے؟',
  [data.faqs[2].answer]:
    'ایکویلیبریم منتخب مکمل سوئنگ ہائی اور سوئنگ لو کا حسابی وسط ہے: Equilibrium = (Range_High + Range_Low) ÷ 2۔ اس فاصلے کو چوتھائی حصوں میں بانٹنے سے 25% گہرا ڈسکاؤنٹ اور 75% گہرا پریمیم ملتا ہے۔',
  [data.faqs[3].question]: 'کیا پریمیم کا مطلب ہے کہ اثاثہ بنیادی طور پر مہنگا ہے؟',
  [data.faqs[3].answer]:
    'نہیں۔ SMC میں پریمیم اور ڈسکاؤنٹ صرف مقررہ چارٹ لُک بیک مدت (مثلاً 20 مکمل تجارتی دن) کے اندر اضافی قیمت کا مقام بتاتے ہیں۔ سوئنگ اینکرز بدلنے سے وہی قیمت پریمیم یا ڈسکاؤنٹ میں بدل سکتی ہے۔',
  [data.faqs[4].question]: 'اندرونی رینج لیکویڈیٹی (IRL) اور بیرونی رینج لیکویڈیٹی (ERL) میں کیا فرق ہے؟',
  [data.faqs[4].answer]:
    'بیرونی رینج لیکویڈیٹی (ERL) ڈیلنگ رینج کے بیرونی سوئنگ ہائیز اور لوز پر ہوتی ہے، جبکہ اندرونی رینج لیکویڈیٹی (IRL) رینج کے اندر FVGs، آرڈر بلاکس یا بریکرز کی صورت میں موجود ہوتی ہے۔ قیمت منظم انداز میں ان دونوں کے درمیان گردش کرتی ہے۔',
  [data.faqs[5].question]: 'PD اَرے میٹرکس کی درجہ بندی اندر سے باہر کس ترتیب میں ہوتی ہے؟',
  [data.faqs[5].answer]:
    'اندر سے باہر کی طرف ترتیب میں لیکویڈیٹی پولز (پرانے ہائیز/لوز)، مٹیگیشن بلاکس، بریکر بلاکس، لیکویڈیٹی وائڈز، فیئر ویلیو گیپس، والیوم امبیلنس / سسپنشن بلاکس، آرڈر بلاکس، ریجیکشن بلاکس اور وقتی اوپننگ گیپس (NWOG/NDOG) شامل ہیں۔',
  [data.faqs[6].question]: 'کنسیکوئنٹ انکروچمنٹ (CE) اور مین تھریشولڈ (MT) میں کیا فرق ہے؟',
  [data.faqs[6].answer]:
    'کنسیکوئنٹ انکروچمنٹ (CE) کسی گیپ یا وِک (جیسے FVG، NWOG یا NDOG) کا عین 50% وسط ہے۔ مین تھریشولڈ (MT) کسی ٹھوس کینڈل باڈی یا آرڈر/بریکر بلاک کے سلسلے کا عین 50% وسط ہے۔',
  [data.faqs[7].question]: 'سسپنشن بلاک کلاسک فیئر ویلیو گیپ سے کیسے مختلف ہے؟',
  [data.faqs[7].answer]:
    'کلاسک FVG کینڈل 1 اور کینڈل 3 کی غیر اوورلیپ بیرونی وِکس کو ناپتا ہے، جبکہ سسپنشن بلاک مرکزی کینڈل کے گرد باڈی گیپس کا جائزہ لیتا ہے چاہے وِکس آپس میں ملی ہوں — اس لیے دونوں کو الگ درجہ بند رکھا جاتا ہے۔',
  [data.faqs[8].question]: 'قیمت 15 منٹ چارٹ پر پریمیم اور ڈیلی چارٹ پر ڈسکاؤنٹ میں بیک وقت کیسے ہو سکتی ہے؟',
  [data.faqs[8].answer]:
    'ڈیلنگ رینجز تمام ٹائم فریمز میں فریکٹل ہوتی ہیں۔ بڑے ڈیلی ڈسکاؤنٹ آرڈر بلاک کے اندر 15 منٹ کا چھوٹا اچھال اپنی چھوٹی رینج کے 75% پر پہنچ سکتا ہے۔ صبر کرنے والے تجزیہ کار 15M کے دوبارہ 15M ڈسکاؤنٹ میں آنے کا انتظار کرتے ہیں۔',
  [data.faqs[9].question]: 'کیا پریمیم یا ڈسکاؤنٹ PD اَرے پر اندھے لِمٹ آرڈرز سے ٹریڈ کرنا چاہیے؟',
  [data.faqs[9].answer]:
    'نہیں۔ 25% ڈسکاؤنٹ یا 75% پریمیم پر آنا صرف مقام کا تناظر دیتا ہے۔ مضبوط نظم و ضبط کے لیے مخالف Draw on Liquidity، فعال لندن یا نیویارک سیشن، LTF تصدیق (MSS/CISD) اور واضح اسٹاپ ان ویلیڈیشن ضروری ہے۔',
  [data.faqs[10].question]: '20 کیلنڈر دن کے بجائے 20 مکمل تجارتی دن کیوں گنے جاتے ہیں؟',
  [data.faqs[10].answer]:
    'ہفتہ وار تعطیلات اور مارکیٹ کی بندش میں کوئی تجارتی والیوم ریکارڈ نہیں ہوتا۔ 20 مکمل تجارتی سیشن گننا تمام انسٹرومنٹس میں یکسانیت رکھتا ہے اور نتائج کے بعد 40 یا 60 دن پر چھلانگ لگانے سے بچاتا ہے۔',
  [data.faqs[11].question]: 'کون سی چیز پریمیم یا ڈسکاؤنٹ PD اَرے میٹرکس سیٹ اپ کو باطل کرتی ہے؟',
  [data.faqs[11].answer]:
    'جب قیمت حفاظتی اَرے کی حد یا منجمد 0% رینج لو (بلش میں) یا 100% رینج ہائی (بیئرش میں) کے پار صاف کلوز کر جائے تو سیٹ اپ باطل ہو جاتا ہے۔',

  // Institutional Sources
  [pdArraySources[0].title]: 'Investor.gov (SEC) — اسٹاپ آرڈر',
  [pdArraySources[0].scope]:
    'وضاحت کرتا ہے کہ اسٹاپ مارکیٹ آرڈر متحرک ہونے پر مارکیٹ آرڈر کیوں بنتے ہیں اور رینج ہائی یا رینج لو ان ویلیڈیشن کے پار سلپیج کے ساتھ فِل ہو سکتے ہیں۔',
  [pdArraySources[1].title]: 'Investor.gov (SEC) — آرڈرز کی اقسام اور لِمٹ میکانزم',
  [pdArraySources[1].scope]:
    '50% ایکویلیبریم، CE یا MT پر پَیسیو لِمٹ آرڈرز کی قیمت کی حد بمقابلہ فِل نہ ہونے کے خطرے کی وضاحت۔',
  [pdArraySources[2].title]: 'CME Group — مائیکرو E-mini نیسڈیک 100 کنٹریکٹ تفصیلات',
  [pdArraySources[2].scope]:
    'MNQ کے 0.25 پوائنٹ کم از کم ٹِک ($0.50 فی ٹِک) کی تفصیل جو 50% ایکویلیبریم، کواڈرنٹس اور آرڈر بلاک حدود کی راؤنڈنگ میں کام آتی ہے۔',
  [pdArraySources[3].title]: 'CME Group — سینٹرل لِمٹ آرڈر بک اور میچنگ',
  [pdArraySources[3].scope]:
    'FIFO اور پرو راٹا آرڈر میچنگ کی ایکسچینج وضاحت جو دکھاتی ہے کہ کینڈل اسٹک چارٹس پوشیدہ آرڈر کی مقدار ظاہر نہیں کرتے۔',
  [pdArraySources[4].title]: 'NYSE — ٹریڈنگ اوقات اور تعطیلات کا کیلنڈر',
  [pdArraySources[4].scope]:
    'امریکی ایکویٹی کے سرکاری بنیادی سیشن اوقات (09:30–16:00 ET) جو مکمل تجارتی سیشنز کو تعطیلات سے الگ کرتے ہیں۔',
  [pdArraySources[5].title]: 'NIST — ڈے لائٹ سیونگ ٹائم قواعد',
  [pdArraySources[5].scope]:
    'سرکاری امریکی گھڑی کے اصول جو سارا سال America/New_York مڈنائٹ اوپن، NWOG، NDOG اور سیشن فلٹرز درست رکھتے ہیں۔',

  // Quizzes (6 quizzes)
  [pdArrayQuizzes[0].question]: 'مکمل رینج 100–140 ہے۔ 132 کہاں ہے؟',
  [pdArrayQuizzes[0].context!]: 'منجمد ڈیلنگ رینج کے اندر کواڈرنٹ حساب۔',
  [pdArrayQuizzes[0].options[0]]: 'اس رینج کی بالائی چوتھائی (80%، Q4 پریمیم)',
  [pdArrayQuizzes[0].options[1]]: 'ہر ممکن رینج میں ڈسکاؤنٹ',
  [pdArrayQuizzes[0].options[2]]: 'بنیادی مہنگا ہونے کا ثبوت',
  [pdArrayQuizzes[0].explanation]:
    '100–140 رینج میں ایکویلیبریم 120 اور 75% Q4 حد 130 ہے، یوں 132 بالائی چوتھائی (80%) میں آتا ہے۔ رینج 100–180 کرنے پر ایکویلیبریم 140 ہو کر 132 کو ڈسکاؤنٹ میں لے آتا ہے۔',

  [pdArrayQuizzes[1].question]: 'کیا بیس Trading دن بیس کیلنڈر دن ہیں؟',
  [pdArrayQuizzes[1].options[0]]: 'نہیں۔ مکمل تجارتی سیشن گنیں؛ ہفتہ وار بندش اضافی Trading دن نہیں۔',
  [pdArrayQuizzes[1].options[1]]: 'جی؛ ہفتہ وار بندش بھی بالکل تجارتی سیشن کی طرح گنی جاتی ہے۔',
  [pdArrayQuizzes[1].options[2]]: 'رینج مکمل کرنے کے لیے بیس آئندہ سیشن لیں۔',
  [pdArrayQuizzes[1].explanation]:
    'ہفتہ وار تعطیلات اور ایکسچینج بندش میں باقاعدہ پرائس ڈسکوری نہیں ہوتی، اس لیے 20 دن کی لُک بیک میں صرف مکمل تجارتی سیشن گنے جاتے ہیں۔',

  [data.faqs[11].question && pdArrayQuizzes[2].question]:
    'کیا آپ سیٹ اپ ناکام ہونے پر جب چاہیں ڈیلنگ رینج کے اینکر بدل سکتے ہیں؟',
  [pdArrayQuizzes[2].options[0]]: 'یکساں ٹیسٹ میں نہیں۔ توسیع اور اس کے اصول نتیجہ دیکھنے سے پہلے درج کریں۔',
  [pdArrayQuizzes[2].options[1]]: 'ہاں؛ کوئی بھی نیا لُک بیک اصل ٹیسٹ برقرار رکھتا ہے۔',
  [pdArrayQuizzes[2].options[2]]: 'جو رینج آخری ٹریڈ کو درست دکھائے وہی استعمال کریں۔',
  [pdArrayQuizzes[2].explanation]:
    'نتیجے کے بعد اینکر سرکانا ہائنڈ سائٹ تعصب پیدا کرتا ہے۔ رینج کی حدود پہلے منجمد کریں اور ناکامیاں ایمانداری سے ریکارڈ کریں۔',

  [pdArrayQuizzes[3].question]: 'PD اَرے میٹرکس میں کنسیکوئنٹ انکروچمنٹ (CE) اور مین تھریشولڈ (MT) کیسے مختلف ہیں؟',
  [pdArrayQuizzes[3].options[0]]:
    'CE کسی گیپ یا ریجیکشن وِک (FVG/NWOG) کا 50% وسط ناپتا ہے؛ MT کسی ٹھوس آرڈر بلاک یا بریکر کینڈل باڈی کا 50% وسط ناپتا ہے۔',
  [pdArrayQuizzes[3].options[1]]: 'MT صرف فیئر ویلیو گیپس کے لیے اور CE صرف ڈیلی چارٹس کے لیے ہوتا ہے۔',
  [pdArrayQuizzes[3].options[2]]: 'دونوں ہمیشہ پوری 20 دن کی ڈیلنگ رینج کے 50% ایکویلیبریم کے برابر ہوتے ہیں۔',
  [pdArrayQuizzes[3].explanation]:
    'گیپ کے وسط (CE) کو ٹھوس کینڈل باڈی کے وسط (MT) سے الگ رکھیں تاکہ آرڈر بلاک اور FVG کی ان ویلیڈیشن حدود آپس میں نہ ملیں۔',

  [pdArrayQuizzes[4].question]:
    'فرض کریں سابقہ کلوز 100، مرکزی کینڈل اوپن/کلوز 102/106 اور اگلا اوپن 108 ہو جبکہ وِکس اوورلیپ کریں۔ یہ کیا ڈھانچہ ہے؟',
  [pdArrayQuizzes[4].options[0]]:
    '100–102 اور 106–108 پر الگ باڈی گیپس والا سسپنشن بلاک، نہ کہ 100–108 کا کلاسک بیرونی وِک FVG۔',
  [pdArrayQuizzes[4].options[1]]: 'وِکس اوورلیپ ہونے کے باوجود 100–108 کا یقینی کلاسک فیئر ویلیو گیپ۔',
  [pdArrayQuizzes[4].options[2]]: '15 منٹ کا خودکار لیکویڈیٹی وائڈ جس پر آنکھ بند کر کے خریداری کی جائے۔',
  [pdArrayQuizzes[4].explanation]:
    'کلاسک FVGs غیر اوورلیپ بیرونی وِکس ناپتے ہیں۔ سسپنشن جیومیٹری مرکزی کینڈل کے گرد باڈی گیپس دیکھتی ہے چاہے وِکس ملی ہوں۔',

  [pdArrayQuizzes[5].question]:
    'ایک 15 منٹ چارٹ 4H ڈسکاؤنٹ آرڈر بلاک کے اندر بیٹھ کر 72% (15M پریمیم) تک پل بیک کرتا ہے۔ دونوں گھڑیوں کو کیا چیز ہم آہنگ کرتی ہے؟',
  [pdArrayQuizzes[5].options[0]]:
    '4H ڈسکاؤنٹ OB کے اندر رہتے ہوئے چھوٹے 15M سوئنگ کے دوبارہ اپنے 50% ایکویلیبریم سے نیچے 15M ڈسکاؤنٹ میں آنے کا انتظار کریں۔',
  [pdArrayQuizzes[5].options[1]]: '1 منٹ اسکالپ کے ساتھ 4H ڈسکاؤنٹ آرڈر بلاک کے خلاف جارحانہ سیل کریں۔',
  [pdArrayQuizzes[5].options[2]]: '4H چارٹ کو مکمل نظرانداز کریں کیونکہ 15M ہمیشہ بڑے ٹائم فریم پر غالب رہتا ہے۔',
  [pdArrayQuizzes[5].explanation]:
    'فریکٹل نیسٹنگ ٹائم فریم تنازع حل کرتی ہے: HTF ڈسکاؤنٹ کے اندر LTF ڈسکاؤنٹ کا انتظار دونوں گھڑیوں کو ایک صف میں لے آتا ہے۔',

  // Math quadrant labels & hierarchy explorer
  'Q4 Upper Premium': 'Q4 بالائی پریمیم',
  'Q3 Lower Premium': 'Q3 نچلا پریمیم',
  'Q2 Upper Discount': 'Q2 بالائی ڈسکاؤنٹ',
  'Q1 Deep Discount': 'Q1 گہرا ڈسکاؤنٹ',
  'Disqualified: Wrong Half or Shifted Anchors': 'نااہل: غلط نصف یا سرکائے گئے اینکرز',
  'Buying above 50% Equilibrium, selling below 50%, or shifting lookbacks after the fact breaks PD Matrix discipline before pattern shapes even matter.':
    '50% ایکویلیبریم سے اوپر خریداری، 50% سے نیچے فروخت یا نتیجے کے بعد لُک بیک بدلنا پیٹرن دیکھنے سے پہلے ہی PD میٹرکس کا نظم توڑ دیتا ہے۔',
  'Qualified PD Array Matrix Setup (6/6 Gates)': 'اہل PD اَرے میٹرکس سیٹ اپ (6/6 شرائط)',
  'Range anchors, Discount/Premium polarity, opposing draw, unmitigated array refinement, active Killzone timing, and LTF confirmation are all aligned (not a profit guarantee).':
    'رینج اینکرز، ڈسکاؤنٹ/پریمیم سمت، مخالف ہدف، غیر مٹیگیٹڈ اَرے، فعال کِل زون وقت اور LTF تصدیق سب ہم آہنگ ہیں (یہ منافع کی ضمانت نہیں)۔',
  'Watchlist Only: Missing Execution Gate': 'صرف واچ لسٹ: عملدرآمد کی شرط باقی ہے',
  'Location inside the matrix is valid, yet missing session liquidity, an opposing draw, or LTF shift makes blind limit entries premature.':
    'میٹرکس میں مقام درست ہے لیکن فعال سیشن، مخالف ہدف یا LTF شفٹ کی غیر موجودگی میں اندھے لِمٹ آرڈر قبل از وقت ہیں۔',

  // Hierarchy items
  ...Object.fromEntries(
    [
      [pdArrayHierarchyList[0].name, 'بیرونی لیکویڈیٹی پولز (پرانا ہائی / پرانا لو)'],
      [pdArrayHierarchyList[0].premiumRole, 'پرانے ہائیز کے اوپر بائے سائیڈ لیکویڈیٹی (BSL) — سویپ یا ہدف کی انتہا'],
      [pdArrayHierarchyList[0].discountRole, 'پرانے لوز کے نیچے سیل سائیڈ لیکویڈیٹی (SSL) — سویپ یا ہدف کی انتہا'],
      [pdArrayHierarchyList[0].refinementLine, 'عین سوئنگ انتہائی ٹِک / قریبی ہائی-لو جھرمٹ'],
      [pdArrayHierarchyList[0].keyRule, 'قیمت کو ڈیلنگ رینج کے پار کھینچتا ہے؛ پرانی انتہا کا سویپ اکثر ریورسل شروع کرتا ہے۔'],

      [pdArrayHierarchyList[1].name, 'مٹیگیشن بلاک (MIT)'],
      [pdArrayHierarchyList[1].premiumRole, 'بیئرش اسٹرکچر ناکامی ری ٹیسٹ جہاں لوئر ہائی پچھلا ہائی نہ لے سکے'],
      [pdArrayHierarchyList[1].discountRole, 'بلش اسٹرکچر ناکامی ری ٹیسٹ جہاں ہائر لو پچھلا لو نہ توڑ سکے'],
      [pdArrayHierarchyList[1].refinementLine, 'آخری مخالف کینڈل اوپن / 50% مین تھریشولڈ'],
      [pdArrayHierarchyList[1].keyRule, 'بریکر جیسا ہے، بس فرق یہ کہ قیمت نے پہلے پچھلا سوئنگ انتہائی سرے کو سویپ نہیں کیا ہوتا۔'],

      [pdArrayHierarchyList[2].name, 'بریکر بلاک (BRK)'],
      [pdArrayHierarchyList[2].premiumRole, 'ہائی سویپ کرنے کے بعد ٹوٹنے والا بلش OB (اب بالائی مزاحمت کا کردار)'],
      [pdArrayHierarchyList[2].discountRole, 'لو سویپ کرنے کے بعد ٹوٹنے والا بیئرش OB (اب ساختی سپورٹ کا کردار)'],
      [pdArrayHierarchyList[2].refinementLine, 'ٹوٹے ہوئے OB سلسلے کا اوپن یا 50% مین تھریشولڈ'],
      [pdArrayHierarchyList[2].keyRule, 'لیکویڈیٹی سویپ + ناکام آرڈر بلاک کو جوڑتا ہے؛ FVG ("یونیکارن") کے ساتھ زیادہ مضبوط ہوتا ہے۔'],

      [pdArrayHierarchyList[3].name, 'لیکویڈیٹی وائڈ (LV)'],
      [pdArrayHierarchyList[3].premiumRole, 'ایکویلیبریم سے اوپر متعدد کینڈلز کی تیز گراوٹ کا کشادہ گلیارہ'],
      [pdArrayHierarchyList[3].discountRole, 'ایکویلیبریم سے نیچے متعدد کینڈلز کی تیز تیزی کا کشادہ گلیارہ'],
      [pdArrayHierarchyList[3].refinementLine, 'متعدد کینڈلز کے وائڈ وقفے کا 50% وسط'],
      [pdArrayHierarchyList[3].keyRule, 'صرف ایک 3 کینڈل FVG کے بجائے وسیع کثیر بار پرائس رن کی نمائندگی کرتا ہے۔'],

      [pdArrayHierarchyList[4].name, 'فیئر ویلیو گیپ (BISI / SIBI / IFVG)'],
      [pdArrayHierarchyList[4].premiumRole, '50% ایکویلیبریم سے اوپر بیئرش SIBI یا بیئرش انورس FVG'],
      [pdArrayHierarchyList[4].discountRole, '50% ایکویلیبریم سے نیچے بلش BISI یا بلش انورس FVG'],
      [pdArrayHierarchyList[4].refinementLine, 'قریبی کنارہ (پہلا ٹچ) اور 50% کنسیکوئنٹ انکروچمنٹ (CE)'],
      [pdArrayHierarchyList[4].keyRule, 'صرف کینڈل 1 اور کینڈل 3 کی بیرونی وِکس کے درمیان کینڈل 2 کے آر پار ناپا جاتا ہے۔'],

      [pdArrayHierarchyList[5].name, 'والیوم امبیلنس اور سسپنشن بلاک'],
      [pdArrayHierarchyList[5].premiumRole, 'ایکویلیبریم سے اوپر باڈی اوپن/کلوز گیپ (یا مرکزی کینڈل دوہرا باڈی گیپ)'],
      [pdArrayHierarchyList[5].discountRole, 'ایکویلیبریم سے نیچے باڈی اوپن/کلوز گیپ (یا مرکزی کینڈل دوہرا باڈی گیپ)'],
      [pdArrayHierarchyList[5].refinementLine, 'متصل باڈی گیپ کا 50% وسط (کبھی بیرونی وِک FVG نہ کہیں)'],
      [pdArrayHierarchyList[5].keyRule, 'اوورلیپ کرتی وِکس کے اندر بھی واضح باڈی قیمت کے گیپس رہ سکتے ہیں جنہیں الگ رکھنا ضروری ہے۔'],

      [pdArrayHierarchyList[6].name, 'آرڈر بلاک (اوپننگ اور مین تھریشولڈ)'],
      [pdArrayHierarchyList[6].premiumRole, 'تیز بیئرش بریک ڈاؤن سے پہلے مسلسل اوپر کلوز ہونے والی کینڈلز کا سلسلہ'],
      [pdArrayHierarchyList[6].discountRole, 'تیز بلش روانگی سے پہلے مسلسل نیچے کلوز ہونے والی کینڈلز کا سلسلہ'],
      [pdArrayHierarchyList[6].refinementLine, 'سلسلے کی اوپننگ قیمت (محتاط) یا 50% مین تھریشولڈ (باڈی وسط)'],
      [pdArrayHierarchyList[6].keyRule, 'کینڈل باڈیز کو ڈیلیوری صاف توڑنی چاہیے؛ انتہا کے پار کلوز اسے باطل کر دیتا ہے۔'],

      [pdArrayHierarchyList[7].name, 'ریجیکشن بلاک (RB)'],
      [pdArrayHierarchyList[7].premiumRole, 'گہرے پریمیم میں جمع باڈیز کے اوپر لمبی بالائی ریجیکشن وِک'],
      [pdArrayHierarchyList[7].discountRole, 'گہرے ڈسکاؤنٹ میں جمع باڈیز کے نیچے لمبی نچلی ریجیکشن وِک'],
      [pdArrayHierarchyList[7].refinementLine, 'کینڈل باڈی کا بلند ترین کلوز/اوپن (پریمیم) یا نچلا ترین اوپن/کلوز (ڈسکاؤنٹ)'],
      [pdArrayHierarchyList[7].keyRule, 'ان ٹریڈرز کے لیے جو انتہائی وِک ٹِپ کے بجائے باڈی شیلف پر انٹری دیکھتے ہیں۔'],

      [pdArrayHierarchyList[8].name, 'اوپننگ گیپس اور وقتی سطحیں (NWOG / NDOG / مڈنائٹ)'],
      [pdArrayHierarchyList[8].premiumRole, 'موجودہ ایکویلیبریم سے اوپر موجود سابقہ ہفتہ وار یا یومیہ اوپننگ گیپ'],
      [pdArrayHierarchyList[8].discountRole, 'موجودہ ایکویلیبریم سے نیچے موجود سابقہ ہفتہ وار یا یومیہ اوپننگ گیپ'],
      [pdArrayHierarchyList[8].refinementLine, 'اوپننگ خلا کے کنارے اور عین 50% CE وسطی نقطہ'],
      [pdArrayHierarchyList[8].keyRule, 'وقت سے جڑی حوالہ جاتی سطحیں کسی بھی پیٹرن کے بغیر بھی چپکنے والے انٹرا ڈے مقناطیس کا کام کرتی ہیں۔'],
    ],
  ),

  // MTF Fractal Nesting Profiles
  ...Object.fromEntries(
    [
      [pdMtfProfiles[0].timeframe, 'ہفتہ وار / 20 دن HTF'],
      [pdMtfProfiles[0].role, 'بنیادی کہانی اور بڑا ہدف'],
      [pdMtfProfiles[0].rangeLabel, '19,800 – 20,800 (1,000 پوائنٹس)'],
      [pdMtfProfiles[0].eqLabel, '20,300.00 (50% HTF)'],
      [pdMtfProfiles[0].currentZone, '20,180.00 · گہرا ڈسکاؤنٹ (38%)'],
      [pdMtfProfiles[0].nestedTruth, 'بڑا ٹائم فریم کہتا ہے: 20,800 بائے سائیڈ لیکویڈیٹی کی طرف بلش مواقع جمع کریں۔'],

      [pdMtfProfiles[1].timeframe, 'ڈیلی / 4H درمیانی'],
      [pdMtfProfiles[1].role, 'ڈیلنگ رینج اور فعال چوتھائی'],
      [pdMtfProfiles[1].rangeLabel, '20,000 – 20,400 (400 پوائنٹس)'],
      [pdMtfProfiles[1].eqLabel, '20,200.00 (50% MTF)'],
      [pdMtfProfiles[1].currentZone, '20,180.00 · بالائی ڈسکاؤنٹ (45%)'],
      [pdMtfProfiles[1].nestedTruth, 'قیمت صاف طور پر 4H ڈسکاؤنٹ FVG + آرڈر بلاک ہم آہنگی پاکٹ میں بیٹھی ہے۔'],

      [pdMtfProfiles[2].timeframe, '15M / 5M عملدرآمد لیگ'],
      [pdMtfProfiles[2].role, 'مقامی پُل بیک اور ٹرگر'],
      [pdMtfProfiles[2].rangeLabel, '20,100 – 20,210 (110 پوائنٹس)'],
      [pdMtfProfiles[2].eqLabel, '20,155.00 (50% LTF)'],
      [pdMtfProfiles[2].currentZone, '20,180.00 · 15M مقامی پریمیم (72.7%)'],
      [pdMtfProfiles[2].nestedTruth,
        'چھوٹے 15M سوئنگ کے اندر قیمت پریمیم میں ہے — تینوں گھڑیاں ملانے کے لیے 4H ڈسکاؤنٹ OB کے اندر قیمت کے 15M ڈسکاؤنٹ (20,130) میں آنے کا انتظار کریں!'],
    ],
  ),

  // Synthetic 3D bar annotations
  ...Object.fromEntries([
    [syntheticPdBullishBars[0].annotation!, 'تیز حرکت 20,200 لو مقرر کرتی ہے'],
    [syntheticPdBullishBars[1].annotation!, 'رینج ہائی 20,600 منجمد ہوا'],
    [syntheticPdBullishBars[2].annotation!, 'پُل بیک پریمیم سے نکلتا ہے'],
    [syntheticPdBullishBars[3].annotation!, '20,400 Eq عبور کر کے ڈسکاؤنٹ میں'],
    [syntheticPdBullishBars[4].annotation!, 'Q1/Q2 ڈسکاؤنٹ OB+FVG میں داخلہ'],
    [syntheticPdBullishBars[5].annotation!, 'SSL سویپ کر کے 20,280 CE چھوا'],
    [syntheticPdBullishBars[6].annotation!, 'LTF MSS + بلش FVG لانچ'],
    [syntheticPdBullishBars[7].annotation!, '50% Eq عبور کر کے پریمیم میں'],
    [syntheticPdBullishBars[8].annotation!, '20,600 BSL ہدف مکمل'],

    [syntheticPdBearishBars[0].annotation!, 'گراوٹ کی لیگ 1.0900 ہائی مقرر کرتی ہے'],
    [syntheticPdBearishBars[1].annotation!, 'رینج لو 1.0800 منجمد ہوا'],
    [syntheticPdBearishBars[2].annotation!, 'ڈسکاؤنٹ سے عارضی اچھال'],
    [syntheticPdBearishBars[3].annotation!, '1.0850 Eq توڑ کر پریمیم میں'],
    [syntheticPdBearishBars[4].annotation!, 'Q4 پریمیم بریکر/FVG کو چھوا'],
    [syntheticPdBearishBars[5].annotation!, 'LTF CISD اور بیئرش SIBI'],
    [syntheticPdBearishBars[6].annotation!, 'واپس Eq کے نیچے پھیلاؤ'],
    [syntheticPdBearishBars[7].annotation!, '1.0800 SSL ہدف پورا ہوا'],

    [syntheticPdContinuumBars[0].annotation!, 'بنیاد 100 لو اور Q1–Q2 ابتدا'],
    [syntheticPdContinuumBars[1].annotation!, 'ERL 140 ہائی قائم ہوا'],
    [syntheticPdContinuumBars[2].annotation!, 'ERL سے 120 Eq کی طرف ردعمل'],
    [syntheticPdContinuumBars[3].annotation!, 'ڈسکاؤنٹ IRL FVG (108–112) کو چھوا'],
    [syntheticPdContinuumBars[4].annotation!, '120 ایکویلیبریم دوبارہ حاصل'],
    [syntheticPdContinuumBars[5].annotation!, 'Q4 پریمیم تسلسل'],
    [syntheticPdContinuumBars[6].annotation!, 'IRL -> ERL چکر مکمل'],

    [syntheticPdFailureBars[0].annotation!, 'اعلان کردہ 20,200–20,600 رینج'],
    [syntheticPdFailureBars[1].annotation!, 'ہائی 20,600؛ Eq = 20,400'],
    [syntheticPdFailureBars[2].annotation!, 'Eq کی طرف گراوٹ'],
    [syntheticPdFailureBars[3].annotation!, '20,285 پر ڈسکاؤنٹ OB+FVG کو چھوا'],
    [syntheticPdFailureBars[4].annotation!, 'کمزور اچھال LTF MSS میں ناکام'],
    [syntheticPdFailureBars[5].annotation!, '20,200 رینج لو سے نیچے کلوز -> باطل!'],
    [syntheticPdFailureBars[6].annotation!, 'رینج باطل؛ اینکر نہ بدلیں'],
  ]),

  // Visuals & 3D Cinema Controls (PdArrayVisual.tsx & PdArrayScene.tsx)
  'Auction Comic: Impulse Premium Buyer vs. Patient PD Matrix Planner':
    'نیلامی کامک: جذباتی پریمیم خریدار بمقابلہ صبر کرنے والا PD میٹرکس منصوبہ ساز',
  'Auction floor Premium vs Discount comic': 'نیلامی فرش پر پریمیم بمقابلہ ڈسکاؤنٹ کامک',
  '1. Impulse Rally': '1. جذباتی تیزی',
  '2. 50% Eq Check': '2. 50% Eq جانچ',
  '3. Discount Return': '3. ڈسکاؤنٹ واپسی',
  '4. Target Reached': '4. ہدف مکمل',
  'Green candles! Buy now at $1,360!': 'سبز کینڈلز! فوراً $1,360 پر خریدیں!',
  'Wait—that is 90% Premium shelf.': 'رکو — یہ 90% پریمیم شیلف ہے۔',
  'Why did it stall right after I entered?': 'میری انٹری کے فوراً بعد قیمت کیوں رک گئی؟',
  'Equilibrium is $1,200. Patience.': 'ایکویلیبریم $1,200 ہے۔ صبر رکھیں۔',
  'Ouch! Stopped out inside Discount.': 'اف! ڈسکاؤنٹ کے اندر اسٹاپ لگ گیا۔',
  'Price tapped $1,110 Discount OB + FVG.': 'قیمت نے $1,110 ڈسکاؤنٹ OB + FVG چھوا۔',
  'Lesson learned: map the range first.': 'سبق مل گیا: پہلے رینج کا نقشہ بنائیں۔',
  'Bought Discount shelf -> exited at High.': 'ڈسکاؤنٹ شیلف پر خریدا -> ہائی پر نکلے۔',
  'Impulse Chaser (Buys 90% Premium)': 'جذباتی پیروکار (90% پریمیم پر خریدتا ہے)',
  'Q4 PREMIUM ($1,300–$1,400)': 'Q4 پریمیم ($1,300–$1,400)',
  '50% Eq ($1,200)': '50% Eq ($1,200)',
  'Entry in Q4 Premium · Tight upside room': 'Q4 پریمیم میں انٹری · اوپر جگہ بہت کم',
  'PD Matrix Planner (Waits for Discount)': 'PD میٹرکس منصوبہ ساز (ڈسکاؤنٹ کا انتظار)',
  'DISCOUNT OB + FVG ($1,100–$1,140)': 'ڈسکاؤنٹ OB + FVG ($1,100–$1,140)',
  'Patient Discount Entry · Targets $1,400 High': 'صبر کے ساتھ ڈسکاؤنٹ انٹری · ہدف $1,400 ہائی',
  'Original auction comic showing why location inside a declared range separates disciplined entries from emotional Premium chasing.':
    'اصل نیلامی کامک جو دکھاتا ہے کہ طے شدہ رینج کے اندر مقام منظم انٹریز کو جذباتی پریمیم خریداری سے کیوں الگ کرتا ہے۔',

  'Interactive Dealing Range & Quadrant Ledger': 'انٹرایکٹو ڈیلنگ رینج اور کواڈرنٹ لیجر',
  '100–140 (Price 132 = Premium)': '100–140 (قیمت 132 = پریمیم)',
  '100–180 (Price 132 = Discount)': '100–180 (قیمت 132 = ڈسکاؤنٹ)',
  'NQ 20,200–20,600': 'NQ 20,200–20,600',
  'EUR/USD 1.08–1.09': 'EUR/USD 1.08–1.09',
  'Range Low (0%)': 'رینج لو (0%)',
  'Range High (100%)': 'رینج ہائی (100%)',
  'Test Price': 'ٹیسٹ قیمت',
  'Horizontal dealing range quadrant ledger': 'افقی ڈیلنگ رینج کواڈرنٹ لیجر',
  'Deep Discount': 'گہرا ڈسکاؤنٹ',
  'Upper Discount': 'بالائی ڈسکاؤنٹ',
  'Lower Premium': 'نچلا پریمیم',
  'Upper Premium': 'بالائی پریمیم',
  '50% Eq': '50% Eq',
  'Live Verdict': 'براہِ راست نتیجہ',
  'sits at': 'کا مقام ہے',
  'Bullish OTE Band': 'بلش OTE بینڈ',
  'Bearish OTE Band': 'بیئرش OTE بینڈ',
  'Range High must be strictly greater than Range Low.': 'رینج ہائی کا رینج لو سے زیادہ ہونا لازمی ہے۔',

  'Interactive 9-Array PD Matrix Hierarchy Explorer': 'انٹرایکٹو 9 اَرے PD میٹرکس درجہ بندی ایکسپلورر',
  'Discount Stack (Buys <50%)': 'ڈسکاؤنٹ اسٹیک (خریداری <50%)',
  'Premium Stack (Sells >50%)': 'پریمیم اسٹیک (فروخت >50%)',
  'PD Array ranks': 'PD اَرے درجات',
  'Discount Polarity (<50%)': 'ڈسکاؤنٹ سمت (<50%)',
  'Premium Polarity (>50%)': 'پریمیم سمت (>50%)',
  'Active Shelf Role': 'فعال شیلف کردار',
  'Precision Anchor': 'عین اینکر',
  'Structural Rule': 'ساختی اصول',
  'Select Discount or Premium and inspect each of the nine PD Array categories with exact refinement boundaries.':
    'ڈسکاؤنٹ یا پریمیم منتخب کریں اور نو PD اَرے اقسام میں سے ہر ایک کو عین حدود کے ساتھ دیکھیں۔',

  'Gap & Block Anatomy: Classic FVG vs. Suspension vs. IFVG vs. Reclaimed':
    'گیپ اور بلاک ساخت: کلاسک FVG بمقابلہ سسپنشن بمقابلہ IFVG بمقابلہ ری کلیمڈ',
  'Classic FVG': 'کلاسک FVG',
  'Suspension Block': 'سسپنشن بلاک',
  'Inverse FVG': 'انورس FVG',
  Reclaimed: 'ری کلیمڈ',
  'Classic Outer-Wick FVG (100–108)': 'کلاسک بیرونی وِک FVG (100–108)',
  'Candle 1 upper wick (100) and Candle 3 lower wick (108) never overlap, leaving an open 8-point outer-wick gap across Candle 2 (CE = 104).':
    'کینڈل 1 کی بالائی وِک (100) اور کینڈل 3 کی نچلی وِک (108) آپس میں نہیں ملتیں، یوں کینڈل 2 پر 8 پوائنٹس کا بیرونی وِک گیپ (CE = 104) بنتا ہے۔',
  'Suspension Block Body-Gaps (100–102 & 106–108)': 'سسپنشن بلاک باڈی گیپس (100–102 اور 106–108)',
  'Previous close = 100, central candle body = 102–106, next open = 108 while wicks overlap! Keep 100–102 and 106–108 separate—never relabel as a 100–108 wick FVG.':
    'سابقہ کلوز = 100، مرکزی کینڈل باڈی = 102–106، اگلا اوپن = 108 جبکہ وِکس ملتی ہیں! 100–102 اور 106–108 کو الگ رکھیں — کبھی 100–108 وِک FVG نہ کہیں۔',
  'Inverse Fair Value Gap (IFVG Role Flip)': 'انورس فیئر ویلیو گیپ (IFVG کردار کی تبدیلی)',
  'After a clean closing candle breaks fully beneath a bullish FVG, the prior support gap converts into overhead bearish resistance on retest.':
    'جب ایک صاف کلوزنگ کینڈل بلش FVG سے مکمل نیچے ٹوٹ جائے تو سابقہ سپورٹ گیپ ری ٹیسٹ پر بالائی بیئرش مزاحمت بن جاتا ہے۔',
  'Reclaimed Reference (Double Role Shift)': 'ری کلیمڈ حوالہ (دوہری کردار تبدیلی)',
  'A reference holds Direction A, shifts temporarily, then swiftly reclaims Direction A—preserving full historical context rather than deleting earlier zones.':
    'ایک حوالہ سمت A برقرار رکھتا ہے، عارضی طور پر بدلتا ہے اور پھر تیزی سے واپس سمت A حاصل کر لیتا ہے۔',
  'C3 Wick Low: 108': 'C3 وِک لو: 108',
  '50% CE: 104': '50% CE: 104',
  'C1 Wick High: 100': 'C1 وِک ہائی: 100',
  'Upper Body Gap: 106–108': 'بالائی باڈی گیپ: 106–108',
  'Lower Body Gap: 100–102': 'نچلا باڈی گیپ: 100–102',
  'Close 100': 'کلوز 100',
  'Body 102–106': 'باڈی 102–106',
  'Open 108': 'اوپن 108',
  'Broken Bullish FVG Flips to Bearish Inverse FVG Resistance': 'ٹوٹا ہوا بلش FVG بیئرش انورس FVG مزاحمت میں بدل جاتا ہے',
  'Clean Close Below': 'نیچے صاف کلوز',
  'IFVG Resistance Test': 'IFVG مزاحمتی جانچ',
  'Role A (Support) -> Temporary Shift -> Swiftly Reclaimed Back to Direction A':
    'کردار A (سپورٹ) -> عارضی تبدیلی -> تیزی سے واپس سمت A کا حصول',
  '1. Initial Support': '1. ابتدائی سپورٹ',
  '2. Brief Dip': '2. مختصر گراوٹ',
  '3. Reclaimed Support': '3. ری کلیمڈ سپورٹ',

  'Animated Price Delivery Continuum (IRL <-> ERL Cycle)': 'متحرک پرائس ڈیلیوری تسلسل (IRL <-> ERL چکر)',
  Pause: 'روکیں',
  'Animate Cycle': 'چکر چلائیں',
  'Step 1': 'مرحلہ 1',
  'Step 2': 'مرحلہ 2',
  'Step 3': 'مرحلہ 3',
  'Step 4': 'مرحلہ 4',
  'Internal to External liquidity continuum cycle': 'اندرونی سے بیرونی لیکویڈیٹی تسلسل کا چکر',
  'ERL HIGH (BSL Target Terminus)': 'ERL ہائی (BSL ہدف کی انتہا)',
  '50% Equilibrium': '50% ایکویلیبریم',
  'Discount IRL (FVG / Order Block)': 'ڈسکاؤنٹ IRL (FVG / آرڈر بلاک)',
  'ERL LOW (SSL Purge Boundary)': 'ERL لو (SSL سویپ حد)',
  '1. Sweep SSL (ERL Low) at bottom range boundary': '1. نچلی رینج حد پر SSL (ERL لو) سویپ',
  '2. Displace upward past 50% Eq, leaving Discount IRL FVG': '2. ڈسکاؤنٹ IRL FVG چھوڑ کر 50% Eq سے اوپر تیز حرکت',
  '3. Pull back into Discount IRL (FVG/OB) below 50% Equilibrium': '3. 50% ایکویلیبریم سے نیچے ڈسکاؤنٹ IRL (FVG/OB) میں پُل بیک',
  '4. Expand cleanly across Equilibrium to purge BSL (ERL High)': '4. ایکویلیبریم عبور کر کے BSL (ERL ہائی) تک صاف پھیلاؤ',

  'Interactive 6-Gate PD Array Qualification Lab': 'انٹرایکٹو 6 نکاتی PD اَرے اہلیت لیب',
  'Completed Dealing Range Anchors Frozen Upfront': 'مکمل ڈیلنگ رینج اینکرز پہلے سے منجمد',
  'Aligned Range Half (Buy <50% Discount / Sell >50% Premium)': 'درست رینج نصف (خرید <50% ڈسکاؤنٹ / فروخت >50% پریمیم)',
  'Clear Opposing External Draw on Liquidity (BSL/SSL)': 'مخالف بیرونی لیکویڈیٹی ہدف (BSL/SSL) واضح',
  'Unmitigated PD Array With Defined CE or MT Anchor': 'واضح CE یا MT اینکر والا غیر مٹیگیٹڈ PD اَرے',
  'Active London or New York Session (America/New_York)': 'فعال لندن یا نیویارک سیشن (America/New_York)',
  'Confirmed Lower-Timeframe MSS / CISD Trigger': 'تصدیق شدہ چھوٹے ٹائم فریم کا MSS / CISD ٹرگر',
  'Toggle individual structural gates to see why unconfirmed locations or shifting anchors fail setup qualification.':
    'انفرادی ساختی شرائط آن/آف کر کے دیکھیں کہ غیر تصدیق شدہ مقامات یا بدلتے اینکرز سیٹ اپ اہلیت کیسے ناکام بناتے ہیں۔',

  'Interactive Multi-Timeframe Fractal Nesting Map (Price = 20,180)':
    'انٹرایکٹو ملٹی ٹائم فریم فریکٹل نیسٹنگ نقشہ (قیمت = 20,180)',
  'The exact same price (20,180) reads as Discount on Weekly/4H charts yet Premium inside a tiny 15M swing—wait for 15M Discount inside 4H Discount.':
    'عین ایک ہی قیمت (20,180) ہفتہ وار/4H چارٹ پر ڈسکاؤنٹ جبکہ 15M کے چھوٹے سوئنگ میں پریمیم دکھائی دیتی ہے — 4H ڈسکاؤنٹ کے اندر 15M ڈسکاؤنٹ کا انتظار کریں۔',

  'Stick-Figure Mistakes Gallery: Four Traps to Eliminate': 'اسٹک فگر غلطیوں کی گیلری: بچنے کے لیے چار جال',
  '1. 80% Premium Long': '1. 80% پریمیم لانگ',
  'Trap: Buying Clean 1M FVG at 80% Premium': 'جال: 80% پریمیم پر صاف 1M FVG خریدنا',
  'It is a 1M FVG! Who cares about Eq?': 'یہ 1M FVG ہے! Eq کی کسے پرواہ؟',
  'Fix: Respect 50% Equilibrium Ceiling': 'حل: 50% ایکویلیبریم چھت کا احترام کریں',
  'Too close to Range High. Wait for Discount.': 'رینج ہائی کے بہت قریب ہے۔ ڈسکاؤنٹ کا انتظار کریں۔',
  '2. Anchor Shifting': '2. اینکر سرکانا',
  'Trap: Sliding Range to 60 Days Post-Loss': 'جال: نقصان کے بعد رینج 60 دن پر لے جانا',
  'Actually let me drag Low lower... fixed!': 'چلو لو کو تھوڑا نیچے کھینچ دیتا ہوں... ٹھیک ہو گیا!',
  'Fix: Freeze Declared Anchors Before Entry': 'حل: انٹری سے پہلے مقررہ اینکرز منجمد رکھیں',
  'Keep 20-day loss honest for true data.': 'حقیقی ڈیٹا کے لیے 20 دن کا نقصان دیانت داری سے درج کریں۔',
  '3. Counter-HTF Short': '3. بڑے ٹائم فریم کے خلاف شارٹ',
  'Trap: Shorting Into Weekly Discount OB': 'جال: ہفتہ وار ڈسکاؤنٹ OB کے منہ میں شارٹ',
  '5M looks weak, full size short here!': '5M کمزور لگ رہا ہے، یہاں پورا شارٹ لگاو!',
  'Fix: Nest HTF Narrative First': 'حل: پہلے بڑے ٹائم فریم کی سمت دیکھیں',
  'Weekly Discount favors reversals upward.': 'ہفتہ وار ڈسکاؤنٹ اوپر پلٹنے کی حمایت کرتا ہے۔',
  '4. Blind Touch Fill': '4. اندھے ٹچ پر فِل',
  'Trap: Front-Running Knife Without LTF MSS': 'جال: LTF MSS کے بغیر گرتی قیمت پکڑنا',
  'Limit order placed! Price will bounce!': 'لِمٹ آرڈر لگا دیا! قیمت ضرور اچھلے گی!',
  'Fix: Require LTF Displacement Shift': 'حل: LTF ڈسپلیسمنٹ شفٹ لازمی رکھیں',
  'Let 1M/5M MSS prove buyers stepped in.': '1M/5M MSS کو ثابت کرنے دیں کہ خریدار آ گئے۔',
  'Click any tab above to compare common Premium/Discount errors against clean matrix discipline.':
    'عام پریمیم/ڈسکاؤنٹ غلطیوں کا صاف میٹرکس نظم و ضبط سے موازنہ کرنے کے لیے اوپر کسی بھی ٹیب پر کلک کریں۔',

  // 3D Cinema Scene Labels
  'Interactive 3D PD Matrix Cinema (Motion Study)': 'انٹرایکٹو 3D PD میٹرکس سنیما (موشن اسٹڈی)',
  'Select PD Array scenario': 'PD اَرے منظرنامہ منتخب کریں',
  'Bullish Discount Ladder': 'بلش ڈسکاؤنٹ سیڑھی',
  'Bearish Premium Cascade': 'بیئرش پریمیم آبشار',
  'IRL -> ERL Continuum': 'IRL -> ERL تسلسل',
  'Invalidated Range Break': 'باطل شدہ رینج بریک',
  'Discount OB + FVG (20,260–20,305)': 'ڈسکاؤنٹ OB + FVG (20,260–20,305)',
  'Premium Breaker + FVG (1.0870–1.0884)': 'پریمیم بریکر + FVG (1.0870–1.0884)',
  'Discount IRL FVG (108–112)': 'ڈسکاؤنٹ IRL FVG (108–112)',
  'Failed Discount OB (<20,200 invalid)': 'ناکام ڈسکاؤنٹ OB (<20,200 باطل)',
  Premium: 'پریمیم',
  Discount: 'ڈسکاؤنٹ',
  '100% High': '100% ہائی',
  '0% Low': '0% لو',
  'Active Array': 'فعال اَرے',
  Play: 'چلائیں',
  'Previous candle': 'پچھلی کینڈل',
  'Next candle': 'اگلی کینڈل',
  Reset: 'ری سیٹ',
  '3D Iso View': '3D آئسو منظر',
  'Straight-On Ruler': 'سیدھا پیمانہ منظر',
  Bar: 'کینڈل',
  'Original synthetic study candles (Close:': 'اصل فرضی مطالعاتی کینڈلز (کلوز:',
  ') — not live quotes.': ') — لائیو قیمتیں نہیں۔',
  'NWOG / NDOG': 'NWOG / NDOG (افتتاحی گیپس)',
};
