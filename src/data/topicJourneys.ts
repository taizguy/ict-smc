import type { LabBar } from '../utils/backtestEngine';

type Copy = { en: string; ur: string };
const c = (en: string, ur: string): Copy => ({ en, ur });
const bars = (values: number[][]): LabBar[] => values.map(([open, high, low, close], i) => ({ time: String(i + 1), open, high, low, close }));
export interface RecognitionCase {
  question: Copy; bars: LabBar[]; options: { label: Copy; explanation: Copy }[];
  answer: number; selected: number[]; zone?: { low: number; high: number; label: string }; takeaway: Copy;
}
export interface TopicJourney {
  chapterId: number; path: string; title: Copy; purpose: Copy; method: Copy; example: Copy;
  limitation: Copy; cases: RecognitionCase[]; links: { path: string; label: Copy; purpose: Copy }[];
}
export const topicJourneyRevision = '2026-10-21'; // Editorial examples, not a new recording review.
export const journeyCopy = {
  heading: c('From definition to observation', 'تعریف سے مشاہدے تک'),
  method: c('State the rule first', 'پہلے قاعدہ واضح کریں'),
  example: c('A worked example', 'حل شدہ مثال'),
  limits: c('What this cannot tell you', 'اس سے کیا معلوم نہیں ہوتا'),
  practice: c('Try it before revealing the answer', 'جواب کھولنے سے پہلے خود کوشش کریں'),
  synthetic: c('Invented teaching candles. These exercises test recognition, not profitability. All displayed candles have closed.', 'یہ فرضی تعلیمی کینڈلز ہیں۔ مشق پیٹرن کی پہچان کے لیے ہے، منافع ثابت کرنے کے لیے نہیں۔ دکھائی گئی تمام کینڈلز بند ہو چکی ہیں۔'),
  numbers: c('Inspect exact candle prices', 'کینڈلز کی درست قیمتیں دیکھیں'),
  candle: c('Candle', 'کینڈل'),
  choose: c('Choose an observation', 'ایک مشاہدہ منتخب کریں'),
  reveal: c('Reveal the annotated explanation', 'نشان زدہ وضاحت دیکھیں'),
  next: c('Next example', 'اگلی مثال'),
  restart: c('Try these examples again', 'یہ مثالیں دوبارہ آزمائیں'),
  correct: c('That matches the stated rule.', 'یہ دیے گئے قاعدے کے مطابق ہے۔'),
  retry: c('Check the reference and try again.', 'حوالہ دوبارہ دیکھیں اور کوشش کریں۔'),
  onward: c('Choose your next step', 'اپنا اگلا قدم منتخب کریں'),
  paths: c('Three concepts, three learning paths', 'تین تصورات، سیکھنے کے تین راستے'),
  reference: c('Keep the free English or Urdu cheat sheet', 'مفت انگریزی یا اردو Cheat Sheet محفوظ کریں'),
  review: c('Examples and learning links updated', 'مثالیں اور تعلیمی روابط اپ ڈیٹ ہوئے'),
  scope: c('Source review coverage is documented in the lesson’s Sources and interpretation section. These synthetic examples do not add a new claim of source-video review.', 'ماخذ کے جائزے کی حدود سبق کے Sources and interpretation حصے میں درج ہیں۔ یہ فرضی مثالیں ماخذ ویڈیو کے کسی نئے جائزے کا دعویٰ نہیں کرتیں۔'),
};

export const topicJourneys: TopicJourney[] = [
  {
    chapterId: 13, path: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/',
    title: c('Fair value gaps: measure the outer candles', 'Fair Value Gaps: بیرونی کینڈلز ناپیں'),
    purpose: c('Learn the range relationship here; use the comparison essay to distinguish gaps from blocks and inversions.', 'یہاں کینڈلز کی رینجز کا تعلق سمجھیں؛ گیپس، بلاکس اور Inversions کا فرق تقابلی مضمون میں پڑھیں۔'),
    method: c('For the wick-based bullish definition, compare candle 1 high with candle 3 low after candle 3 closes. For a bearish gap, compare candle 1 low with candle 3 high. Keep formation separate from any later retest.', 'وِک پر مبنی Bullish تعریف میں کینڈل 3 بند ہونے کے بعد کینڈل 1 کے ہائی کا کینڈل 3 کے لو سے موازنہ کریں۔ Bearish گیپ کے لیے کینڈل 1 کا لو اور کینڈل 3 کا ہائی دیکھیں۔ تشکیل کو بعد کے ری ٹیسٹ سے الگ رکھیں۔'),
    example: c('If candle 1 high is 100 and candle 3 low is 102, the bullish interval is 100–102 and its CE is 101. If candle 3 low is 99 instead, the outer ranges overlap: the large middle candle cannot create the missing interval.', 'اگر کینڈل 1 کا ہائی 100 اور کینڈل 3 کا لو 102 ہو تو Bullish زون 100–102 اور CE برابر 101 ہے۔ کینڈل 3 کا لو 99 ہو تو بیرونی رینجز اوورلیپ کرتی ہیں؛ بڑی درمیانی کینڈل اس غیر موجود گیپ کو نہیں بنا سکتی۔'),
    limitation: c('An FVG does not show unexecuted institutional orders. A valid formation can remain unvisited or fail on a return. Midpoint arithmetic supplies neither a signal nor a measured edge.', 'FVG اداروں کے غیر مکمل آرڈرز نہیں دکھاتا۔ درست تشکیل کو قیمت دوبارہ نہ بھی چھوئے یا واپسی پر زون ناکام ہو جائے۔ مڈ پوائنٹ کا حساب سگنل یا ثابت شدہ برتری نہیں۔'),
    cases: [
      { question: c('Do candles 1–3 form a bullish FVG, and which boundaries define it?', 'کیا کینڈلز 1–3 Bullish FVG بناتی ہیں، اور اس کی حدود کیا ہیں؟'),
        bars: bars([[98,100,97,99],[99,104,98.5,103],[103,105,102,104]]), answer: 0, selected: [0,1,2], zone: {low:100,high:102,label:'FVG'},
        options: [
          {label:c('Yes: 100–102', 'ہاں: 100–102'), explanation:c('Candle 1 high is 100, below candle 3 low at 102. The positive-width interval is between those wicks.', 'کینڈل 1 کا ہائی 100، کینڈل 3 کے لو 102 سے کم ہے۔ مثبت چوڑائی والا زون انہی وِکس کے درمیان ہے۔')},
          {label:c('Yes: the middle body, 99–103', 'ہاں: درمیانی باڈی، 99–103'), explanation:c('That is candle 2’s body. This definition uses the outer wicks: candle 1 high and candle 3 low.', 'یہ کینڈل 2 کی باڈی ہے۔ اس تعریف میں بیرونی وِکس یعنی کینڈل 1 کا ہائی اور کینڈل 3 کا لو استعمال ہوتے ہیں۔')},
        ], takeaway:c('The middle candle traded through the interval; “gap” does not mean no transactions occurred there.', 'درمیانی کینڈل اس زون سے گزری ہے؛ ”گیپ“ کا مطلب وہاں لین دین نہ ہونا نہیں۔') },
      { question:c('The middle body is large. Does that make this a bullish FVG?', 'درمیانی باڈی بڑی ہے۔ کیا اسی وجہ سے یہ Bullish FVG ہے؟'),
        bars:bars([[98,100,97,99],[99,104,98,103],[103,105,99,104]]),answer:1,selected:[0,2],
        options:[
          {label:c('Yes, because candle 2 is large', 'ہاں، کیونکہ کینڈل 2 بڑی ہے'),explanation:c('Body size cannot replace non-overlap. Candle 3 low is 99, below candle 1 high at 100.', 'باڈی کا سائز Non-overlap کی شرط کا متبادل نہیں۔ کینڈل 3 کا لو 99 ہے، جو کینڈل 1 کے ہائی 100 سے کم ہے۔')},
          {label:c('No: the outer ranges overlap', 'نہیں: بیرونی رینجز اوورلیپ کرتی ہیں'),explanation:c('Correct: the outer ranges overlap from 99 to 100. There is no positive-width bullish gap between them.', 'درست: بیرونی رینجز 99 سے 100 تک اوورلیپ کرتی ہیں۔ ان کے درمیان مثبت چوڑائی والا Bullish گیپ نہیں۔')},
        ],takeaway:c('A strong-looking candle is not a substitute for a precise definition. Touching boundaries also give zero width.', 'طاقتور نظر آنے والی کینڈل واضح تعریف کا متبادل نہیں۔ صرف چھوتی ہوئی حدود بھی صفر چوڑائی دیتی ہیں۔') },
    ],
    links: [
      {path:'/articles/pd-arrays-fvg-order-blocks-and-inversions/',label:c('Compare FVGs, blocks and inversions', 'FVGs، Blocks اور Inversions کا موازنہ کریں'),purpose:c('An illustrated essay about why similar boxes represent different rules.', 'تصویری مضمون: ملتے جلتے زونز کے قواعد مختلف کیوں ہیں۔')},
      {path:'/tools/glossary/imbalances/fair-value-gap/',label:c('Quick FVG definition', 'FVG کی مختصر تعریف'),purpose:c('Use the glossary for a short reference, then return here for examples.', 'مختصر حوالہ Glossary میں دیکھیں، پھر مثالوں کے لیے یہاں واپس آئیں۔')},
      {path:'/learn/order-blocks-ob-and-mitigation/',label:c('Next: order blocks and mitigation', 'اگلا سبق: Order Blocks اور Mitigation'),purpose:c('Compare a selected candle run with a three-candle interval.', 'منتخب کینڈل رن کا تین کینڈلز کے زون سے موازنہ کریں۔')},
    ],
  },
  {
    chapterId:15,path:'/learn/order-blocks-ob-and-mitigation/',
    title:c('Order blocks: define the candle run before the retest', 'Order Blocks: ری ٹیسٹ سے پہلے کینڈل رن طے کریں'),
    purpose:c('This lesson studies reference selection and mitigation. It does not identify a bank’s inventory or promise an entry that will hold.', 'یہ سبق حوالہ منتخب کرنے اور Mitigation کے مطالعے کے لیے ہے۔ یہ بینک کی پوزیشن نہیں دکھاتا اور نہ انٹری کے قائم رہنے کی ضمانت ہے۔'),
    method:c('In the candle-run convention discussed in the linked Episode 3 source notes, retain the selected consecutive opposing closes and the first opening reference. State whether the zone uses bodies or full ranges. Do not change that choice after seeing the return.', 'منسلک Episode 3 کے ماخذ نوٹس میں بیان کردہ Candle-run طریقے میں منتخب مسلسل مخالف کلوز اور پہلے اوپن کا حوالہ برقرار رکھیں۔ واضح کریں کہ زون باڈیز سے بنتا ہے یا مکمل رینجز سے۔ واپسی دیکھنے کے بعد انتخاب نہ بدلیں۔'),
    example:c('Suppose the selected down-close run opens at 105, then the next down-close candle opens at 103. Its first opening reference remains 105. Selecting only the second candle would give 103: a different convention. If the chosen full-range bounds are 100–106, MT is 103; a body-based midpoint may differ.', 'فرض کریں منتخب Down-close رن کا پہلا اوپن 105 اور اگلی Down-close کینڈل کا اوپن 103 ہے۔ رن کا پہلا حوالہ 105 ہی رہے گا۔ صرف دوسری کینڈل منتخب کرنے سے 103 ملے گا، جو الگ طریقہ ہے۔ مکمل منتخب رینج 100–106 ہو تو MT برابر 103 ہے؛ باڈی کا مڈ پوائنٹ مختلف ہو سکتا ہے۔'),
    limitation:c('A revisit is observable; “mitigation” is a framework interpretation. Neither a reaction nor a failure reveals who held orders. Predefine invalidation and record unsuccessful examples as well as reactions.', 'واپسی نظر آنے والا مشاہدہ ہے؛ ”Mitigation“ فریم ورک کی تشریح ہے۔ ردعمل یا ناکامی کسی آرڈر کے مالک کو ظاہر نہیں کرتی۔ Invalidation پہلے لکھیں اور کامیاب ردعمل کے ساتھ ناکام مثالیں بھی درج کریں۔'),
    cases:[
      {question:c('Candles 1–2 are the selected down-close run. Which price is its first opening reference?', 'کینڈلز 1–2 منتخب Down-close رن ہیں۔ اس کا پہلا اوپن حوالہ کون سا ہے؟'),
        bars:bars([[105,106,102,103],[103,104,100,101],[101,108,100.5,107]]),answer:1,selected:[0,1],
        options:[
          {label:c('103, the last down-close candle’s open', '103، آخری Down-close کینڈل کا اوپن'),explanation:c('That selects only candle 2. The stated exercise keeps both candles, so its first open is candle 1’s 105.', 'یہ صرف کینڈل 2 کا انتخاب ہے۔ اس مشق میں دونوں کینڈلز برقرار ہیں، اس لیے پہلا اوپن کینڈل 1 کا 105 ہے۔')},
          {label:c('105, the first candle’s open', '105، پہلی کینڈل کا اوپن'),explanation:c('The selected run starts at candle 1. Its open is 105; keep that reference rather than choosing a narrower candle afterward.', 'منتخب رن کینڈل 1 سے شروع ہوتا ہے۔ اس کا اوپن 105 ہے؛ بعد میں چھوٹی کینڈل چننے کے بجائے یہی حوالہ رکھیں۔')},
        ],takeaway:c('The answer follows the supplied run convention. It is not a universal rule for every educator’s single-candle model.', 'جواب دیے گئے رن کے طریقے کے مطابق ہے۔ یہ ہر استاد کے Single-candle ماڈل کا عالمی قاعدہ نہیں۔')},
      {question:c('Using the same run, what is MT if we explicitly use full-range bounds 100–106?', 'اسی رن کی مکمل رینج واضح طور پر 100–106 ہو تو MT کیا ہے؟'),
        bars:bars([[105,106,102,103],[103,104,100,101],[101,108,100.5,107]]),answer:0,selected:[0,1],zone:{low:100,high:106,label:'Full range'},
        options:[
          {label:c('103: (100 + 106) / 2', '103: (100 + 106) / 2'),explanation:c('The midpoint of the chosen full range is 103. This does not turn that price into guaranteed support.', 'منتخب مکمل رینج کا مڈ پوائنٹ 103 ہے۔ اس سے اس قیمت پر یقینی سپورٹ ثابت نہیں ہوتی۔')},
          {label:c('105: the opening reference', '105: اوپن کا حوالہ'),explanation:c('105 is the run’s first open, not this range’s midpoint. Opening reference and MT are different measurements.', '105 رن کا پہلا اوپن ہے، اس رینج کا مڈ پوائنٹ نہیں۔ اوپن کا حوالہ اور MT الگ پیمائشیں ہیں۔')},
        ],takeaway:c('A body-based range would use different boundaries. Label the convention before comparing results.', 'باڈی پر مبنی رینج کی حدود مختلف ہوں گی۔ نتائج کے موازنے سے پہلے طریقہ واضح لکھیں۔')},
    ],
    links:[
      {path:'/articles/pd-arrays-fvg-order-blocks-and-inversions/',label:c('Read the PD-array comparison', 'PD Arrays کا تقابلی مضمون پڑھیں'),purpose:c('Explore why an order-block reference differs from an FVG and an inversion.', 'سمجھیں کہ Order Block کا حوالہ FVG اور Inversion سے مختلف کیوں ہے۔')},
      {path:'/tools/glossary/order-blocks/order-block/',label:c('Quick order-block definition', 'Order Block کی مختصر تعریف'),purpose:c('Use a short reference alongside this lesson’s source-specific explanation.', 'اس سبق کی ماخذ سے متعلق وضاحت کے ساتھ مختصر حوالہ استعمال کریں۔')},
      {path:'/learn/liquidity-engineering-and-liquidity-runs/',label:c('Next: liquidity references and sweeps', 'اگلا سبق: Liquidity کے حوالے اور Sweeps'),purpose:c('Separate a move beyond a level from a forecast of what happens next.', 'لیول سے آگے حرکت کو اگلی سمت کی پیش گوئی سے الگ کریں۔')},
    ],
  },
  {
    chapterId:18,path:'/learn/liquidity-engineering-and-liquidity-runs/',
    title:c('Liquidity sweeps: observe the break, then the response', 'Liquidity Sweeps: پہلے بریک، پھر ردعمل دیکھیں'),
    purpose:c('Learn to describe a price excursion without assuming a reversal or hidden intent. The linked essay explains the difference between visible references and actual orders.', 'ریورسل یا پوشیدہ نیت فرض کیے بغیر قیمت کی حرکت بیان کرنا سیکھیں۔ منسلک مضمون نظر آنے والے حوالوں اور حقیقی آرڈرز کا فرق واضح کرتا ہے۔'),
    method:c('Select a prior high or low before the next candle. In these exercises, a sweep means trading beyond that reference; a close back inside is a separate observation. Other models reserve “sweep” for a rejection, so always state the convention.', 'اگلی کینڈل سے پہلے سابقہ ہائی یا لو منتخب کریں۔ ان مشقوں میں Sweep سے مراد اس حوالے سے آگے ٹریڈ ہونا ہے؛ اندر واپس کلوز الگ مشاہدہ ہے۔ بعض ماڈلز صرف Rejection کو Sweep کہتے ہیں، اس لیے طریقہ ہمیشہ واضح کریں۔'),
    example:c('A prior high is 105. A later candle reaches 106 and closes at 104: price exceeded the reference and closed back below it. If it instead closes at 105.8, it still exceeded the reference, but has not closed back inside. Neither observation determines the next candle.', 'سابقہ ہائی 105 ہے۔ اگلی کینڈل 106 تک جا کر 104 پر بند ہو تو قیمت حوالے سے آگے گئی اور اس کے نیچے واپس کلوز ہوئی۔ 105.8 پر بند ہو تو بھی حوالہ عبور ہوا، مگر اندر واپسی کا کلوز نہیں۔ دونوں میں سے کوئی مشاہدہ اگلی کینڈل طے نہیں کرتا۔'),
    limitation:c('Stops near a high or low are a hypothesis without order data. A chart cannot establish deliberate stop hunting. Compare continuation and rejection using the same preselected level, timeframe and observation window.', 'آرڈر ڈیٹا کے بغیر ہائی یا لو کے قریب Stops ایک مفروضہ ہیں۔ چارٹ دانستہ Stop hunting ثابت نہیں کرتا۔ ایک ہی پہلے سے منتخب لیول، ٹائم فریم اور مشاہدے کی مدت کے ساتھ Continuation اور Rejection کا موازنہ کریں۔'),
    cases:[
      {question:c('Candle 1 sets a high of 105. Candle 3 reaches 106 and closes at 104. What can we observe?', 'کینڈل 1 کا ہائی 105 ہے۔ کینڈل 3 کا ہائی 106 اور کلوز 104 ہے۔ کیا مشاہدہ کیا جا سکتا ہے؟'),
        bars:bars([[102,105,101,104],[104,104.5,102,103],[103,106,102.5,104]]),answer:0,selected:[2],
        options:[
          {label:c('The high was exceeded; the close returned below it', 'ہائی عبور ہوا؛ کلوز اس کے نیچے واپس آیا'),explanation:c('106 is above 105 and 104 is below 105. That describes this completed candle, not the next move.', '106، 105 سے اوپر اور 104، 105 سے نیچے ہے۔ یہ بند کینڈل کا مشاہدہ ہے، اگلی حرکت کی پیش گوئی نہیں۔')},
          {label:c('A bearish reversal is now certain', 'اب Bearish ریورسل یقینی ہے'),explanation:c('A return below a high does not guarantee a sustained reversal. A later candle can move above it again.', 'ہائی کے نیچے واپسی مستقل ریورسل کی ضمانت نہیں۔ اگلی کینڈل دوبارہ اس کے اوپر جا سکتی ہے۔')},
        ],takeaway:c('The chart shows an excursion and a return. It does not measure stop quantities or identify participants.', 'چارٹ حوالے سے آگے حرکت اور واپسی دکھاتا ہے۔ یہ Stops کی مقدار یا شرکا کی شناخت نہیں بتاتا۔')},
      {question:c('The same prior high is 105, but candle 3 closes at 105.8 after reaching 106. Has it closed back inside?', 'وہی سابقہ ہائی 105 ہے، مگر کینڈل 3، 106 تک جا کر 105.8 پر بند ہوئی۔ کیا کلوز اندر واپس آیا؟'),
        bars:bars([[102,105,101,104],[104,104.5,102,103],[103,106,102.5,105.8]]),answer:1,selected:[2],
        options:[
          {label:c('Yes: every break of a high is a rejection', 'ہاں: ہائی کا ہر بریک Rejection ہے'),explanation:c('The close is still above 105. Exceeding a level and rejecting it are different observations.', 'کلوز اب بھی 105 سے اوپر ہے۔ لیول عبور کرنا اور اسے Reject کرنا الگ مشاہدے ہیں۔')},
          {label:c('No: the close remains above 105', 'نہیں: کلوز اب بھی 105 سے اوپر ہے'),explanation:c('The high was exceeded, but the supplied close has not returned below the reference. Future continuation is still uncertain.', 'ہائی عبور ہوا مگر دیا گیا کلوز حوالے کے نیچے واپس نہیں آیا۔ مستقبل کی Continuation اب بھی غیر یقینی ہے۔')},
        ],takeaway:c('Do not relabel the reference after seeing the outcome. Keep continued breaks in your study sample.', 'نتیجہ دیکھ کر حوالہ نہ بدلیں۔ جاری رہنے والے بریک بھی اپنے مطالعے کے نمونے میں رکھیں۔')},
    ],
    links:[
      {path:'/articles/liquidity-is-not-a-magnet/',label:c('Read: liquidity is not a magnet', 'پڑھیں: Liquidity مقناطیس نہیں'),purpose:c('An illustrated explanation of order mechanics and two possible endings after a high breaks.', 'آرڈر کے طریقۂ کار اور ہائی عبور ہونے کے بعد دو ممکنہ نتائج کی تصویری وضاحت۔')},
      {path:'/tools/glossary/liquidity/buy-side-liquidity/',label:c('Quick buy-side liquidity reference', 'Buy-side Liquidity کا مختصر حوالہ'),purpose:c('Distinguish a chart reference above highs from directly observed order quantities.', 'ہائی کے اوپر چارٹ کے حوالے کو براہِ راست معلوم آرڈر مقدار سے الگ کریں۔')},
      {path:'/learn/fair-value-gaps-fvg-and-consequent-encroachment/',label:c('Next: identify a gap without assuming an entry', 'اگلا سبق: انٹری فرض کیے بغیر گیپ پہچانیں'),purpose:c('Examine the next component separately rather than treating a sweep as a complete trade.', 'Sweep کو مکمل ٹریڈ سمجھنے کے بجائے اگلے جز کو الگ جانچیں۔')},
    ],
  },
];

export const topicReferenceCopy = {
  fvg: {
    definition:c('A three-candle wick-range relationship, measured after candle 3 closes. Bullish: candle 1 high is below candle 3 low. Bearish: candle 3 high is below candle 1 low.', 'تین کینڈلز کی وِک رینجز کا تعلق، جو کینڈل 3 بند ہونے کے بعد ناپا جاتا ہے۔ Bullish: کینڈل 1 کا ہائی کینڈل 3 کے لو سے کم۔ Bearish: کینڈل 3 کا ہائی کینڈل 1 کے لو سے کم۔'),
    bearish:c('Synthetic bearish example: candle 1 low is 100 and candle 3 high is 98. The interval is 98–100 and CE is 99. No later reaction or executable fill is supplied.', 'فرضی Bearish مثال: کینڈل 1 کا لو 100 اور کینڈل 3 کا ہائی 98 ہے۔ زون 98–100 اور CE برابر 99 ہے۔ بعد کا ردعمل یا قابلِ عمل Fill فراہم نہیں کیا گیا۔'),
    invalidation:c('Distinguish formation from a later failure. State in advance whether a wick or a close beyond the selected outer boundary invalidates your paper-study setup. Crossing CE alone is not a universal failure rule.', 'تشکیل کو بعد کی ناکامی سے الگ رکھیں۔ کاغذی مطالعے سے پہلے لکھیں کہ منتخب بیرونی حد سے آگے وِک یا کلوز میں سے کیا سیٹ اپ کو غلط ثابت کرے گا۔ صرف CE عبور کرنا عالمی ناکامی کا قاعدہ نہیں۔'),
  },
  ob:{
    definition:c('A selected reference candle or candle run in an ICT study model. Record the run, first opening reference and body or full-range boundaries before evaluating a retest.', 'ICT مطالعاتی ماڈل میں منتخب حوالہ جاتی کینڈل یا کینڈل رن۔ ری ٹیسٹ جانچنے سے پہلے رن، پہلا اوپن اور باڈی یا مکمل رینج کی حدود درج کریں۔'),
    bearish:c('Synthetic bearish run: two selected up-close candles open at 100 and 102 before a downward move. The run’s first opening reference is 100. Selecting only the final candle would instead use 102; these conventions are not identical.', 'فرضی Bearish رن: نیچے کی حرکت سے پہلے دو منتخب Up-close کینڈلز 100 اور 102 پر کھلتی ہیں۔ رن کا پہلا اوپن حوالہ 100 ہے۔ صرف آخری کینڈل لینے سے 102 استعمال ہوگا؛ دونوں طریقے یکساں نہیں۔'),
    invalidation:c('Select body or full-range boundaries first. A chosen midpoint stop is a trade-specific rule; a later move through the complete zone is a different observation. A failure does not prove there were no institutional orders, and a reaction does not prove there were.', 'پہلے باڈی یا مکمل رینج کی حدود منتخب کریں۔ مڈ پوائنٹ کا منتخب Stop مخصوص ٹریڈ کا قاعدہ ہے؛ پورے زون سے گزرنا الگ مشاہدہ ہے۔ ناکامی اداروں کے آرڈرز کی غیر موجودگی ثابت نہیں کرتی، نہ ردعمل ان کی موجودگی ثابت کرتا ہے۔'),
  },
};
// Paired editorial translations feed both static HTML and the section runtime catalog.
export const topicJourneyUrdu: Record<string,string> = {};
function collect(value: unknown) {
  if (!value || typeof value !== 'object') return;
  if ('en' in value && 'ur' in value) { const pair = value as Copy; topicJourneyUrdu[pair.en] = pair.ur; return; }
  Object.values(value).forEach(collect);
}
collect(topicJourneys); collect(journeyCopy); collect(topicReferenceCopy);
topicJourneyUrdu['Full range'] = 'مکمل رینج';
topicJourneyUrdu['OHLC'] = 'اوپن، ہائی، لو، کلوز';
topicJourneyUrdu['Open'] = 'اوپن';
topicJourneyUrdu['High'] = 'ہائی';
topicJourneyUrdu['Low'] = 'لو';
topicJourneyUrdu['Close'] = 'کلوز';
topicJourneyUrdu['Study FVG wick boundaries, midpoint arithmetic, overlapping non-examples and uncertainty. Follow the full lesson for sources and visual practice.'] = 'FVG کی وِک حدود، مڈ پوائنٹ کا حساب، اوورلیپ والی غیر مثالیں اور غیر یقینی نتائج سمجھیں۔ ماخذ اور تصویری مشق کے لیے مکمل سبق پڑھیں۔';
topicJourneyUrdu['Study order-block candle runs, opening references, mitigation and midpoint conventions. Candles do not reveal institutional inventory.'] = 'Order Block کے کینڈل رنز، اوپن کے حوالے، Mitigation اور مڈ پوائنٹ کے طریقے سمجھیں۔ کینڈلز اداروں کی پوزیشن ظاہر نہیں کرتیں۔';
topicJourneyUrdu['Fair Value Gap (FVG): Study FVG wick boundaries, midpoint arithmetic, overlapping non-examples and uncertainty.'] = 'Fair Value Gap (FVG): وِک حدود، مڈ پوائنٹ کا حساب، اوورلیپ والی غیر مثالیں اور غیر یقینی نتائج سمجھیں۔';
topicJourneyUrdu['Fair Value Gap (FVG): Study FVG wick boundaries, midpoint arithmetic, overlapping non-examples and uncertainty. Follow the full lesson for sources and visual practice.'] = 'Fair Value Gap (FVG): وِک حدود، مڈ پوائنٹ، اوورلیپ اور غیر یقینی نتائج سمجھیں۔ ماخذ اور تصویری مشق کے لیے مکمل سبق پڑھیں۔';
topicJourneyUrdu['Order Block (OB): Study order-block candle runs, opening references, mitigation and midpoint conventions.'] = 'Order Block (OB): کینڈل رنز، اوپن کے حوالے، Mitigation اور مڈ پوائنٹ کے طریقے سمجھیں۔';
topicJourneyUrdu['Order Block (OB): Study order-block candle runs, opening references, mitigation and midpoint conventions. Candles do not reveal institutional inventory.'] = 'Order Block (OB): کینڈل رنز، اوپن کے حوالے، Mitigation اور مڈ پوائنٹ کے طریقے سمجھیں۔ کینڈلز اداروں کی پوزیشن ظاہر نہیں کرتیں۔';
