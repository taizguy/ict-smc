import mentorshipSupport from './mentorship2025Support.json';
// One source for visible answers and the corresponding FAQPage graph node.
export const deliverySupportUrdu: Record<string, string> = {};
const copy = (en: string, ur: string) => { deliverySupportUrdu[en] = ur; return en; };
export interface DeliverySupport {
  heading: string;
  columns: string[];
  rows: string[][];
  note: string;
  faqs: { question: string; answer: string }[];
}
const faq = (q: string, qu: string, a: string, au: string) => ({ question: copy(q, qu), answer: copy(a, au) });
export const deliverySupport: Record<number, DeliverySupport> = {
  13: {
    heading: copy('Bullish FVG vs. bearish FVG: what is the difference?', 'Bullish FVG اور bearish FVG میں کیا فرق ہے؟'),
    columns: [copy('Comparison', 'موازنہ'), copy('Bullish FVG', 'بلش FVG'), copy('Bearish FVG', 'بیئرش FVG')],
    rows: [
      [copy('Formation rule', 'تشکیل کا اصول'), copy('Candle 1 high < candle 3 low, after candle 3 closes.', 'تیسری کینڈل بند ہونے کے بعد پہلی کا ہائی تیسری کے لو سے کم ہو۔'), copy('Candle 3 high < candle 1 low, after candle 3 closes.', 'تیسری کینڈل بند ہونے کے بعد تیسری کا ہائی پہلی کے لو سے کم ہو۔')],
      [copy('Zone boundaries', 'زون کی حدود'), copy('Lower: candle 1 high. Upper: candle 3 low.', 'نچلی حد: پہلی کینڈل کا ہائی۔ بالائی حد: تیسری کا لو۔'), copy('Lower: candle 3 high. Upper: candle 1 low.', 'نچلی حد: تیسری کینڈل کا ہائی۔ بالائی حد: پہلی کا لو۔')],
      [copy('Directional interpretation', 'سمتی تشریح'), copy('A possible support reference on a return; wider context must support any bullish trade idea.', 'واپسی پر ممکنہ سپورٹ کا حوالہ؛ بلش ٹریڈ کے لیے وسیع تناظر بھی درکار ہے۔'), copy('A possible resistance reference on a return; wider context must support any bearish trade idea.', 'واپسی پر ممکنہ ریزسٹنس کا حوالہ؛ بیئرش ٹریڈ کے لیے وسیع تناظر بھی درکار ہے۔')],
      [copy('Example failure convention', 'ناکامی کے اصول کی مثال'), copy('A completed close below the lower edge ends bullish use under this stated rule.', 'اس مقررہ اصول میں نچلی حد سے نیچے مکمل کلوز بلش استعمال ختم کرتا ہے۔'), copy('A completed close above the upper edge ends bearish use under this stated rule.', 'اس مقررہ اصول میں بالائی حد سے اوپر مکمل کلوز بیئرش استعمال ختم کرتا ہے۔')],
    ],
    note: copy('The midpoint is (lower edge + upper edge) / 2 in either direction. A later failure does not erase the original formation. Failure rules are model choices, not universal laws.', 'دونوں سمتوں میں وسط (نچلی حد + بالائی حد) / 2 ہے۔ بعد کی ناکامی اصل تشکیل کو مٹاتی نہیں۔ ناکامی کے اصول ماڈل کے انتخاب ہیں، آفاقی قوانین نہیں۔'),
    faqs: [
      faq('What is a fair value gap in trading?', 'ٹریڈنگ میں fair value gap کیا ہے؟', 'An FVG is a positive interval between the wick ranges of candles 1 and 3 in a three-candle sequence. Confirm the boundaries after candle 3 closes. It is a measurable chart reference, not a complete trade setup.', 'تین کینڈلز کے سلسلے میں پہلی اور تیسری کی وِک حدود کے درمیان مثبت فاصلے کو FVG کہتے ہیں۔ حدود تیسری کینڈل بند ہونے پر تصدیق کریں۔ یہ قابلِ پیمائش چارٹ حوالہ ہے، مکمل ٹریڈ سیٹ اپ نہیں۔'),
      faq('Does touching an FVG edge mean the gap is filled?', 'کیا FVG کی حد چھونے سے گیپ فل ہو جاتا ہے؟', 'No. An edge test, a midpoint touch and a full traversal are different observations. For a bullish 100–102 gap, a low of 101.5 enters the zone but reaches neither its 101 midpoint nor its 100 far edge.', 'نہیں۔ حد کا ٹیسٹ، وسط کو چھونا اور پورا زون عبور کرنا مختلف مشاہدات ہیں۔ بلش 100–102 گیپ میں 101.5 کا لو زون میں داخل ہوتا ہے، مگر نہ 101 کے وسط تک پہنچتا ہے نہ 100 کی دور والی حد تک۔'),
      faq('Is a zero-width gap a valid FVG?', 'کیا صفر چوڑائی والا گیپ درست FVG ہے؟', 'No under the strict positive-width definition used here. If candle 1 high equals candle 3 low in a bullish example, the boundaries touch. If the outer ranges overlap, there is no bullish FVG either.', 'یہاں استعمال ہونے والی مثبت چوڑائی کی تعریف میں نہیں۔ بلش مثال میں پہلی کا ہائی تیسری کے لو کے برابر ہو تو حدود صرف ملتی ہیں۔ بیرونی رینجز اوورلیپ کریں تو بھی بلش FVG نہیں بنتا۔'),
      faq('Is an FVG the same as a session-opening gap?', 'کیا FVG اور سیشن کے آغاز کا گیپ ایک ہی ہیں؟', 'No. A session-opening gap compares prices across a market closure. An FVG compares the outer wick ranges within three neighbouring candles. The middle candle may have traded through the entire FVG interval.', 'نہیں۔ سیشن کے آغاز کا گیپ مارکیٹ بندش کے دونوں طرف قیمتوں کا موازنہ کرتا ہے۔ FVG تین ساتھ والی کینڈلز کی بیرونی وِکس کا موازنہ کرتا ہے۔ درمیانی کینڈل پورے FVG فاصلے میں ٹریڈ کر چکی ہو سکتی ہے۔'),
      faq('Must every FVG return to its midpoint?', 'کیا ہر FVG لازماً اپنے وسط تک واپس آتا ہے؟', 'No. Price may never return, revisit only an edge, cross the entire interval or fail the chosen directional rule. A midpoint order cannot be counted as filled unless the observed prices actually reach it; execution also depends on order and market conditions.', 'نہیں۔ قیمت واپس نہ آئے، صرف حد چھوئے، پورا زون عبور کرے یا مقررہ سمتی اصول ناکام کرے، سب ممکن ہیں۔ وسط پر آرڈر کو فل نہیں گن سکتے جب تک مشاہدہ شدہ قیمت وہاں نہ پہنچے؛ عمل درآمد آرڈر اور مارکیٹ حالات پر بھی منحصر ہے۔'),
    ],
  },
  14: {
    heading: copy('Bullish IFVG vs. bearish IFVG: how does role reversal work?', 'بلش IFVG اور بیئرش IFVG میں کردار کیسے بدلتا ہے؟'),
    columns: [copy('Comparison', 'موازنہ'), copy('Bullish inversion', 'بلش اِنورژن'), copy('Bearish inversion', 'بیئرش اِنورژن')],
    rows: [
      [copy('Original reference', 'اصل حوالہ'), copy('A bearish FVG.', 'ایک بیئرش FVG۔'), copy('A bullish FVG.', 'ایک بلش FVG۔')],
      [copy('Required breach in this example', 'اس مثال میں مطلوبہ بریک'), copy('A completed close above the old upper edge.', 'پرانی بالائی حد سے اوپر مکمل کلوز۔'), copy('A completed close below the old lower edge.', 'پرانی نچلی حد سے نیچے مکمل کلوز۔')],
      [copy('Retest direction', 'ری ٹیسٹ کی سمت'), copy('Return from above; ask whether the old zone acts as support.', 'اوپر سے واپسی؛ دیکھیں کیا پرانا زون سپورٹ بنتا ہے۔'), copy('Return from below; ask whether the old zone acts as resistance.', 'نیچے سے واپسی؛ دیکھیں کیا پرانا زون ریزسٹنس بنتا ہے۔')],
      [copy('Example failure convention', 'ناکامی کے اصول کی مثال'), copy('A completed close back below the old lower edge.', 'پرانی نچلی حد سے دوبارہ نیچے مکمل کلوز۔'), copy('A completed close back above the old upper edge.', 'پرانی بالائی حد سے دوبارہ اوپر مکمل کلوز۔')],
    ],
    note: copy('Retain the original FVG boundaries. A breach creates a role-reversal candidate; it does not guarantee a retest, a reaction or a profitable order.', 'اصل FVG کی حدود برقرار رکھیں۔ بریک کردار بدلنے کا امیدوار بناتا ہے؛ ری ٹیسٹ، ردعمل یا منافع بخش آرڈر کی ضمانت نہیں۔'),
    faqs: [
      faq('What is an inverse fair value gap?', 'Inverse fair value gap کیا ہے؟', 'An IFVG is an existing FVG considered for the opposite role after a qualifying breach. The interval stays the same; the proposed support or resistance role changes.', 'مقررہ بریک کے بعد مخالف کردار کے لیے دیکھی جانے والی موجودہ FVG کو IFVG کہتے ہیں۔ فاصلہ وہی رہتا ہے؛ ممکنہ سپورٹ یا ریزسٹنس کا کردار بدلتا ہے۔'),
      faq('Does a wick through an FVG confirm an IFVG?', 'کیا FVG کے پار وِک IFVG کی تصدیق کرتی ہے؟', 'Not under the completed-close convention used in these examples. A wick, a close beyond an edge and a displaced close describe different events. State the required breach before evaluating the chart.', 'ان مثالوں کے مکمل کلوز والے اصول میں نہیں۔ وِک، حد کے پار کلوز اور ڈسپلیسمنٹ والا کلوز مختلف واقعات ہیں۔ چارٹ جانچنے سے پہلے مطلوبہ بریک طے کریں۔'),
      faq('Do you redraw the zone when an FVG inverts?', 'کیا FVG اِنورٹ ہونے پر زون دوبارہ بناتے ہیں؟', 'No. Preserve the original wick boundaries so you can compare formation, breach and retest against the same reference. Moving the box afterwards changes the question you are testing.', 'نہیں۔ اصل وِک حدود محفوظ رکھیں تاکہ تشکیل، بریک اور ری ٹیسٹ ایک ہی حوالے سے جانچ سکیں۔ بعد میں باکس منتقل کرنا جانچے جانے والے سوال کو بدل دیتا ہے۔'),
      faq('What if price never retests an IFVG?', 'اگر قیمت IFVG کو دوبارہ ٹیسٹ نہ کرے تو؟', 'Record a no-retest case. A return-based model has no entry merely because price later travels in the expected direction. Keep these cases when reviewing the method.', 'اسے بغیر ری ٹیسٹ والا کیس درج کریں۔ واپسی پر مبنی ماڈل میں صرف بعد کی متوقع سمت سے انٹری نہیں بنتی۔ طریقہ جانچتے وقت یہ کیس بھی محفوظ رکھیں۔'),
      faq('Is every failed FVG a tradeable IFVG?', 'کیا ہر ناکام FVG قابلِ ٹریڈ IFVG ہے؟', 'No. A failed directional reference is not enough. A proposed setup still needs context, a defined breach, any required return, an entry rule and an explicit failure rule. Repeated crossings can leave an unclear reference.', 'نہیں۔ سمتی حوالے کی ناکامی کافی نہیں۔ مجوزہ سیٹ اپ کو تناظر، واضح بریک، مطلوبہ واپسی، انٹری اور ناکامی کا اصول بھی چاہیے۔ بار بار کراسنگ حوالہ غیر واضح کر سکتی ہے۔'),
    ],
  },
  15: {
    heading: copy('Bullish order block vs. bearish order block: how do you mark them?', 'بلش اور بیئرش آرڈر بلاک کیسے نشان زد کرتے ہیں؟'),
    columns: [copy('Comparison', 'موازنہ'), copy('Bullish order block', 'بلش آرڈر بلاک'), copy('Bearish order block', 'بیئرش آرڈر بلاک')],
    rows: [
      [copy('Candidate selection', 'امیدوار کا انتخاب'), copy('A selected down-close candle or consecutive run before a qualifying upward departure.', 'مقررہ اوپر کی روانگی سے پہلے منتخب ڈاؤن کلوز کینڈل یا مسلسل سلسلہ۔'), copy('A selected up-close candle or consecutive run before a qualifying downward departure.', 'مقررہ نیچے کی روانگی سے پہلے منتخب اَپ کلوز کینڈل یا مسلسل سلسلہ۔')],
      [copy('Zone boundaries', 'زون کی حدود'), copy('Record the selected opening, body range or full range before the return.', 'واپسی سے پہلے منتخب اوپننگ، باڈی رینج یا مکمل رینج درج کریں۔'), copy('Apply the same declared boundary convention in the opposite direction.', 'مخالف سمت میں بھی وہی واضح کردہ حد بندی استعمال کریں۔')],
      [copy('Directional interpretation', 'سمتی تشریح'), copy('A potential support reference within a wider bullish model.', 'وسیع بلش ماڈل میں ممکنہ سپورٹ کا حوالہ۔'), copy('A potential resistance reference within a wider bearish model.', 'وسیع بیئرش ماڈل میں ممکنہ ریزسٹنس کا حوالہ۔')],
      [copy('Example failure convention', 'ناکامی کے اصول کی مثال'), copy('A completed close below the selected full-range low.', 'منتخب مکمل رینج کے لو سے نیچے مکمل کلوز۔'), copy('A completed close above the selected full-range high.', 'منتخب مکمل رینج کے ہائی سے اوپر مکمل کلوز۔')],
    ],
    note: copy('Candle selection, departure criteria and boundary conventions must be stated. Candle colour alone does not establish an order block or reveal institutional positions.', 'کینڈل کا انتخاب، روانگی کی شرائط اور حدود کے اصول واضح ہونا ضروری ہیں۔ صرف کینڈل کا رنگ آرڈر بلاک ثابت نہیں کرتا، نہ اداروں کی پوزیشن دکھاتا ہے۔'),
    faqs: [
      faq('What is an order block in trading?', 'ٹریڈنگ میں آرڈر بلاک کیا ہے؟', 'An order block is a selected candle or candle run used as a reference before a qualifying directional departure. The selection and boundary rules belong to the model; any opposite-colour candle is not automatically an order block.', 'آرڈر بلاک منتخب کینڈل یا سلسلہ ہے جسے مقررہ سمتی روانگی سے پہلے حوالہ بنایا جاتا ہے۔ انتخاب اور حدود کے اصول ماڈل کا حصہ ہیں؛ ہر مخالف رنگ کی کینڈل خودبخود آرڈر بلاک نہیں۔'),
      faq('Should an order block include the wick or only the body?', 'آرڈر بلاک میں وِک شامل کریں یا صرف باڈی؟', 'These are different marking conventions. Record the opening, body range and full range separately, choose one for the exercise, and keep it fixed. Do not switch boundaries afterwards to rescue an example.', 'یہ نشان لگانے کے مختلف اصول ہیں۔ اوپننگ، باڈی اور مکمل رینج الگ درج کریں، مشق کے لیے ایک منتخب کریں اور برقرار رکھیں۔ مثال بچانے کے لیے بعد میں حدود نہ بدلیں۔'),
      faq('What does order block mitigation mean?', 'آرڈر بلاک مٹیگیشن کا کیا مطلب ہے؟', 'In this lesson it describes a later return to the selected reference and the observable response. A candle chart alone cannot prove that a particular institution is closing, hedging or reducing an earlier position.', 'اس سبق میں اس کا مطلب منتخب حوالے تک بعد کی واپسی اور قابلِ مشاہدہ ردعمل ہے۔ صرف کینڈل چارٹ کسی مخصوص ادارے کی پچھلی پوزیشن بند کرنے، ہیج کرنے یا کم کرنے کا ثبوت نہیں۔'),
      faq('Is an order block the same as an FVG?', 'کیا آرڈر بلاک اور FVG ایک ہی ہیں؟', 'No. An order block is a selected candle-based reference. An FVG is a measured interval between the outer wick ranges of three candles. They may overlap, but one can exist without the other.', 'نہیں۔ آرڈر بلاک منتخب کینڈل پر مبنی حوالہ ہے۔ FVG تین کینڈلز کی بیرونی وِک حدود کے درمیان ماپا ہوا فاصلہ ہے۔ دونوں اوورلیپ کر سکتے ہیں مگر ایک دوسرے کے بغیر بھی موجود ہو سکتے ہیں۔'),
      faq('Can you trade an order block on its own?', 'کیا آرڈر بلاک اکیلا ٹریڈ کر سکتے ہیں؟', 'Marking a block does not establish an edge. A complete model also specifies context, confirmation, entry, failure, position sizing and costs. Review missed returns and failed blocks alongside attractive examples.', 'بلاک نشان لگانے سے برتری ثابت نہیں ہوتی۔ مکمل ماڈل تناظر، تصدیق، انٹری، ناکامی، پوزیشن سائز اور اخراجات بھی طے کرتا ہے۔ خوبصورت مثالوں کے ساتھ نہ آنے والی واپسی اور ناکام بلاکس بھی جانچیں۔'),
    ],
  },
  16: {
    heading: copy('Breaker block vs. mitigation block vs. Unicorn: what changes?', 'بریکر بلاک، مٹیگیشن بلاک اور Unicorn میں کیا بدلتا ہے؟'),
    columns: [copy('Reference', 'حوالہ'), copy('Defining relationship', 'بنیادی تعلق'), copy('What still needs checking', 'مزید کیا جانچنا ہے')],
    rows: [
      [copy('Breaker block', 'بریکر بلاک'), copy('In the sequence taught here: a prior extreme is swept, structure changes, and an intervening candle reference is considered from the opposite side.', 'یہاں سکھائے گئے سلسلے میں سابقہ انتہا سویپ ہوتی ہے، اسٹرکچر بدلتا ہے، اور درمیان کی کینڈل کا حوالہ مخالف طرف سے دیکھا جاتا ہے۔'), copy('The sweep, the structural break, the selected boundaries and the later return.', 'سویپ، اسٹرکچرل بریک، منتخب حدود اور بعد کی واپسی۔')],
      [copy('Mitigation block', 'مٹیگیشن بلاک'), copy('The comparison sequence changes structure without the same prior-extreme sweep required for the breaker example.', 'موازنہ والے سلسلے میں بریکر کی مثال والا سابقہ انتہا کا سویپ کیے بغیر اسٹرکچر بدلتا ہے۔'), copy('The failed swing and the exact convention; terminology varies between models.', 'ناکام سوِنگ اور درست اصول؛ مختلف ماڈلز کی اصطلاحات بدل سکتی ہیں۔')],
      [copy('Unicorn overlap', 'Unicorn اوورلیپ'), copy('The shared price interval of a qualifying breaker reference and an FVG.', 'مقررہ شرائط والے بریکر حوالے اور FVG کا مشترک قیمتی فاصلہ۔'), copy('Both references must qualify independently, and their intersection must have positive width.', 'دونوں حوالے الگ الگ شرائط پوری کریں اور ان کے اشتراک کی چوڑائی مثبت ہو۔')],
    ],
    note: copy('A bullish breaker and a bearish breaker mirror the sequence. None of these labels replaces an entry rule or proves a future reaction.', 'بلش اور بیئرش بریکر میں سلسلہ الٹ سمتوں میں ہوتا ہے۔ ان میں سے کوئی نام انٹری کے اصول کی جگہ نہیں لیتا، نہ آئندہ ردعمل ثابت کرتا ہے۔'),
    faqs: [
      faq('What is a breaker block?', 'بریکر بلاک کیا ہے؟', 'In the model taught here, a breaker is a candle reference used from the opposite side after a sweep and structural change. Identify the events in order rather than calling every failed order block a breaker.', 'یہاں سکھائے گئے ماڈل میں بریکر سویپ اور اسٹرکچرل تبدیلی کے بعد مخالف طرف سے استعمال ہونے والا کینڈل حوالہ ہے۔ ہر ناکام آرڈر بلاک کو بریکر کہنے کے بجائے واقعات ترتیب سے پہچانیں۔'),
      faq('How is a bullish breaker different from a bearish breaker?', 'بلش بریکر بیئرش بریکر سے کیسے مختلف ہے؟', 'The direction is reversed across the whole sequence: the relevant sweep, structure change, approach and proposed support or resistance role all reverse. Changing only the colour of a box does not mirror the setup.', 'پورے سلسلے کی سمت الٹتی ہے: متعلقہ سویپ، اسٹرکچرل تبدیلی، آمد کی سمت اور ممکنہ سپورٹ یا ریزسٹنس کا کردار۔ صرف باکس کا رنگ بدلنا سیٹ اپ کو الٹنا نہیں۔'),
      faq('What is the difference between a breaker and a mitigation block?', 'بریکر اور مٹیگیشن بلاک میں کیا فرق ہے؟', 'In this chapter’s comparison, the breaker sequence sweeps the prior extreme before the structural change; the mitigation sequence does not make that same sweep. Apply the stated sequence because these labels are not used consistently everywhere.', 'اس باب کے موازنے میں بریکر اسٹرکچرل تبدیلی سے پہلے سابقہ انتہا سویپ کرتا ہے؛ مٹیگیشن سلسلہ وہی سویپ نہیں کرتا۔ بیان کردہ ترتیب اپنائیں کیونکہ ہر جگہ یہ نام یکساں استعمال نہیں ہوتے۔'),
      faq('How do you calculate a Unicorn overlap?', 'Unicorn اوورلیپ کیسے نکالتے ہیں؟', 'Take the higher of the two lower boundaries and the lower of the two upper boundaries. A breaker at 100–103 and an FVG at 102–105 overlap at 102–103. Equal intersection boundaries give zero width, not a usable overlap under this definition.', 'دونوں نچلی حدود میں بڑی اور دونوں بالائی حدود میں چھوٹی قیمت لیں۔ 100–103 کے بریکر اور 102–105 کے FVG کا اشتراک 102–103 ہے۔ برابر حدود صفر چوڑائی دیتی ہیں، اس تعریف میں قابلِ استعمال اوورلیپ نہیں۔'),
      faq('Does a breaker retest guarantee a reversal?', 'کیا بریکر ری ٹیسٹ ریورسل کی ضمانت ہے؟', 'No. Separate a return to the zone from the response after it. A model may fail, produce no retest or cross repeatedly. Define the failure rule and include these outcomes when reviewing examples.', 'نہیں۔ زون میں واپسی اور اس کے بعد کے ردعمل کو الگ دیکھیں۔ ماڈل ناکام ہو سکتا ہے، ری ٹیسٹ نہ آئے یا قیمت بار بار عبور کرے۔ ناکامی کا اصول طے کریں اور مثالیں جانچتے وقت یہ نتائج بھی شامل کریں۔'),
    ],
  },
};

export const deliverySupportLabels = {
  faq: copy('Frequently Asked Questions', 'اکثر پوچھے جانے والے سوالات'),
  path: copy('Connect this lesson to the wider picture', 'اس سبق کو وسیع تناظر سے جوڑیں'),
  hub: copy('Explore the Price Delivery learning hub', 'پرائس ڈیلیوری کے تعلیمی مرکز کو دیکھیں'),
  practice: copy('Test the sequence in Chart Laboratory', 'چارٹ لیبارٹری میں سلسلہ آزمائیں'),
  market: copy('Real-market FVG walkthroughs: a partial return and a failure', 'حقیقی مارکیٹ کے FVG: جزوی واپسی اور ناکامی'),
};
export const deliveryLinkReasons: Record<number, string> = {
  13: copy('Start with the three-candle geometry and separate formation from later outcomes.', 'تین کینڈلز کی ساخت سے شروع کریں اور تشکیل کو بعد کے نتائج سے الگ رکھیں۔'),
  14: copy('Keep the FVG boundaries fixed and examine what a qualifying breach changes.', 'FVG کی حدود برقرار رکھیں اور دیکھیں مقررہ بریک کیا بدلتا ہے۔'),
  15: copy('Compare a selected candle reference with an interval measured between three candles.', 'منتخب کینڈل کے حوالے کا تین کینڈلز کے درمیان ماپے فاصلے سے موازنہ کریں۔'),
  33: copy('See how the references fit into the broader Charter Models 6 & 7 framework.', 'دیکھیں یہ حوالے Charter Models 6 اور 7 کے وسیع فریم ورک میں کیسے جڑتے ہیں۔'),
  16: copy('Connect sweeps, structural change and overlapping references in their proper sequence.', 'سویپس، اسٹرکچرل تبدیلی اور اوورلیپ کرتے حوالوں کو درست ترتیب میں جوڑیں۔'),
};

Object.assign(deliverySupport, mentorshipSupport);
