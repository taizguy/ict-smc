/** Original synthetic examples, not a new review of source recordings or a strategy test. */
type Copy = { en: string; ur: string };
const c = (en: string, ur: string): Copy => ({ en, ur });
export type FvgBar = { open: number; high: number; low: number; close: number };
const bar = (open: number, high: number, low: number, close: number): FvgBar => ({ open, high, low, close });
const formation = [bar(99,100,98,99.5),bar(99.5,104,99,103),bar(103,105,102,104)];
export const fvgLessonRevision = { iso: '2026-10-24', label: '24 October 2026' };
export const fvgCopy = {
  heading: c('One definition. Different outcomes.', 'ایک تعریف۔ مختلف نتائج۔'),
  intro: c('Compare the same three-candle rule with a bearish version, an overlapping non-example and two later outcomes. All prices are invented for learning.', 'اسی تین کینڈل قاعدے کا Bearish شکل، اوورلیپ والی غیر مثال اور دو بعد کے نتائج سے موازنہ کریں۔ تمام قیمتیں سیکھنے کے لیے فرضی ہیں۔'),
  choose: c('Choose an FVG scene', 'FVG کی مثال منتخب کریں'),
  step: c('Reveal the sequence', 'ترتیب دیکھیں'),
  before: c('1. First two candles', '1۔ پہلی دو کینڈلز'),
  formed: c('2. Candle 3 closes', '2۔ تیسری کینڈل بند ہوتی ہے'),
  later: c('3. Outcome', '3۔ نتیجہ'),
  beforeNote: c('The third candle has not closed yet. No completed three-candle FVG can be marked at this point.', 'تیسری کینڈل ابھی بند نہیں ہوئی۔ اس وقت مکمل تین کینڈل FVG نشان زد نہیں کیا جا سکتا۔'),
  formedNote: c('Only candles 1–3 are known at this point. The later outcome is still hidden.', 'اس وقت صرف پہلی تین کینڈلز معلوم ہیں۔ بعد کا نتیجہ ابھی پوشیدہ ہے۔'),
  prices: c('Inspect the invented OHLC values', 'فرضی OHLC اعداد دیکھیں'),
  candle: c('Candle', 'کینڈل'),
  caption: c('Synthetic teaching chart. Candle numbers are sequence positions, not timestamps. The labels describe observations, not trade instructions.', 'فرضی تعلیمی چارٹ۔ کینڈل نمبر ترتیب بتاتے ہیں، وقت نہیں۔ لیبل مشاہدات ہیں، ٹریڈ کی ہدایات نہیں۔'),
  distinction: c('Formation and outcome are different questions', 'تشکیل اور نتیجہ الگ سوالات ہیں'),
  distinctionText: c('A gap can exist at candle 3 and fail later. A definition does not specify an entry, stop, target or profitable strategy. The failure convention below is a close beyond the far boundary, used only for this illustration.', 'تیسری کینڈل پر گیپ بن سکتا ہے اور بعد میں ناکام ہو سکتا ہے۔ تعریف انٹری، اسٹاپ، ٹارگٹ یا منافع بخش حکمت عملی طے نہیں کرتی۔ نیچے ناکامی کی شرط دور والی حد سے آگے کلوز ہے، جو صرف اس مثال کا طریقہ ہے۔'),
  context: c('Read the context before choosing an entry', 'انٹری منتخب کرنے سے پہلے سیاق سمجھیں'),
  contextText: c('Use the source-reading section to separate a prior liquidity reference, the response at that reference, a completed formation and a later result. An order block or sweep is not a universal requirement for every three-candle FVG. Model-specific conditions must be stated separately.', 'ماخذ پڑھنے والے حصے میں پہلے Liquidity کے حوالے، اس پر ردعمل، مکمل تشکیل اور بعد کے نتیجے کو الگ کریں۔ ہر تین کینڈل FVG کے لیے Order Block یا Sweep لازمی عالمی شرط نہیں۔ مخصوص ماڈل کی شرائط الگ لکھی جائیں۔'),
  quiz: c('Check this in Practice & Quiz', 'Practice & Quiz میں اپنی سمجھ جانچیں'),
  lab: c('Follow a complete guided chart case', 'مکمل رہنمائی والی چارٹ مثال دیکھیں'),
  labScope: c('Chart Laboratory adds context and confirmation to fictional teaching cases. It is not a historical performance study.', 'Chart Laboratory فرضی تعلیمی مثالوں میں سیاق اور تصدیق شامل کرتی ہے۔ یہ تاریخی کارکردگی کی تحقیق نہیں۔'),
  download: c('Download this illustration (SVG)', 'یہ خاکہ ڈاؤن لوڈ کریں (SVG)'),
  sheet: c('Keep the bilingual glossary and cheat sheet', 'دو زبانوں والی Glossary اور Cheat Sheet محفوظ کریں'),
  source: c('Review the original sources and context', 'اصل ماخذ اور سیاق کا جائزہ لیں'),
  completed: c('Completed formation', 'مکمل تشکیل'),
  overlapping: c('No positive-width gap', 'مثبت چوڑائی والا گیپ نہیں'),
  originals: c('Original illustrations for study', 'مطالعے کے لیے اصل خاکے'),
};
export const fvgScenes = [
  {
    id: 'bullish', label: c('Bullish', 'صعودی (Bullish)'), title: c('Bullish FVG: a later revisit', 'Bullish FVG: بعد کی واپسی'),
    bars: [...formation,bar(104,104.5,101,102.8),bar(102.8,105,102,104.5)],
    zone: { low:100, high:102 },
    rule: c('Candle 1 high = 100; candle 3 low = 102. The zone is 100–102 and CE is 101.', 'پہلی کینڈل کا ہائی 100 اور تیسری کا لو 102 ہے۔ زون 100–102 اور CE 101 ہے۔'),
    outcome: c('Candle 4 revisits the interval and candle 5 closes higher. This chosen ending illustrates a response; it does not establish its frequency or profitability.', 'چوتھی کینڈل زون میں واپس آتی ہے اور پانچویں اوپر بند ہوتی ہے۔ یہ منتخب نتیجہ ردعمل سمجھاتا ہے؛ اس کی شرح یا منافع ثابت نہیں کرتا۔'),
  },
  {
    id:'bearish', label:c('Bearish','نزولی (Bearish)'), title:c('Bearish FVG: mirror the boundaries','Bearish FVG: حدود کا الٹ موازنہ'),
    bars:[...formation,bar(104,104.5,101,102.8),bar(102.8,105,102,104.5)].map(b=>bar(202-b.open,202-b.low,202-b.high,202-b.close)),
    zone:{low:100,high:102},
    rule:c('Candle 1 low = 102; candle 3 high = 100. The zone is 100–102 and CE is 101. Measure the wicks, not the middle body.', 'پہلی کینڈل کا لو 102 اور تیسری کا ہائی 100 ہے۔ زون 100–102 اور CE 101 ہے۔ وِکس ناپیں، درمیانی باڈی نہیں۔'),
    outcome:c('The later candles revisit the interval and close lower. Direction is mirrored; uncertainty remains the same.', 'بعد کی کینڈلز زون میں واپس آ کر نیچے بند ہوتی ہیں۔ سمت الٹ ہے؛ غیر یقینی نتیجہ برقرار ہے۔'),
  },
  {
    id:'overlap',label:c('Not an FVG','FVG نہیں'),title:c('Overlapping outer candles: no bullish FVG','بیرونی کینڈلز کا اوورلیپ: Bullish FVG نہیں'),
    bars:[formation[0],formation[1],bar(103,105,99.5,104)],zone:null,
    rule:c('Candle 1 high = 100; candle 3 low = 99.5. Their ranges overlap by 0.5. A large middle candle cannot create a positive gap between overlapping boundaries.', 'پہلی کینڈل کا ہائی 100 اور تیسری کا لو 99.5 ہے۔ رینجز 0.5 اوورلیپ کرتی ہیں۔ بڑی درمیانی کینڈل اوورلیپ والی حدود میں مثبت گیپ نہیں بنا سکتی۔'),
    outcome:c('This illustration ends at candle 3. If the boundaries only touch, the interval has zero width and also fails this positive-width definition.', 'یہ مثال تیسری کینڈل پر ختم ہوتی ہے۔ حدود صرف چھوئیں تو چوڑائی صفر ہے اور یہ مثبت چوڑائی کی تعریف بھی پوری نہیں ہوتی۔'),
  },
  {
    id:'failed-retest',label:c('Failed retest','ناکام ری ٹیسٹ'),title:c('A valid formation can fail on a later test','درست تشکیل بعد کے ٹیسٹ پر ناکام ہو سکتی ہے'),
    bars:[...formation,bar(104,104.5,101,101.5),bar(101.5,102,98,99.2)],zone:{low:100,high:102},
    rule:c('The original zone is still 100–102. Before seeing later candles, this study chooses a close below 100 as its failure condition.', 'اصل زون اب بھی 100–102 ہے۔ بعد کی کینڈلز دیکھنے سے پہلے اس مثال میں 100 سے نیچے کلوز ناکامی کی شرط ہے۔'),
    outcome:c('Candle 5 closes at 99.2, below 100, so this stated bullish-support hypothesis fails. The original three-candle formation still existed. Failure alone does not confirm an IFVG trade.', 'پانچویں کینڈل 99.2 پر، یعنی 100 سے نیچے بند ہوتی ہے، اس لیے منتخب Bullish Support مفروضہ ناکام ہے۔ اصل تین کینڈل تشکیل موجود تھی۔ صرف ناکامی IFVG ٹریڈ کی تصدیق نہیں۔'),
  },
  {
    id:'no-revisit',label:c('No revisit','واپسی نہیں'),title:c('No revisit in the displayed window','دکھائی گئی مدت میں واپسی نہیں'),
    bars:[...formation,bar(104,107,103,106),bar(106,109,105,108)],zone:{low:100,high:102},
    rule:c('The zone forms at 100–102. Imagine a paper limit entry at CE 101 that expires after candle 5; no position exists before a fill.', 'زون 100–102 پر بنتا ہے۔ CE 101 پر فرضی Limit Entry فرض کریں جو پانچویں کینڈل کے بعد ختم ہوتی ہے؛ Fill سے پہلے پوزیشن موجود نہیں۔'),
    outcome:c('Candles 4 and 5 stay above the zone. The imagined entry remains unfilled during this window. This says nothing about what price might do after the last displayed candle.', 'چوتھی اور پانچویں کینڈلز زون سے اوپر رہتی ہیں۔ اس مدت میں فرضی انٹری Fill نہیں ہوتی۔ آخری دکھائی گئی کینڈل کے بعد کی حرکت کے بارے میں یہ کچھ نہیں بتاتا۔'),
  },
];
export type FvgScene = typeof fvgScenes[number];
export const fvgUrdu: Record<string,string> = {};
function collect(value:unknown):void {
  if (!value || typeof value!=='object') return;
  if ('en' in value && 'ur' in value) {const pair=value as Copy; fvgUrdu[pair.en]=pair.ur; return;}
  Object.values(value).forEach(collect);
}
collect(fvgCopy); collect(fvgScenes);
