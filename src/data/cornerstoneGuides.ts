/** Original teaching examples. Existing lesson source-review claims are not extended. */
type Copy = { en: string; ur: string };
const c = (en: string, ur: string): Copy => ({ en, ur });
export const cornerstoneRevision = '2026-10-24';
export const cornerstoneGlossaryRoutes = [
  { path: '/tools/glossary/foundations/order-book-market-liquidity/', conceptId: 'market_mechanics_liquidity', chapterId: 3, lesson: '/learn/the-order-book-in-depth/' },
  { path: '/tools/glossary/liquidity/buy-side-liquidity/', conceptId: 'buy_side_liquidity', chapterId: 4, lesson: '/learn/liquidity-the-most-misunderstood-word-in-trading/' },
  { path: '/tools/glossary/liquidity/sell-side-liquidity/', conceptId: 'sell_side_liquidity', chapterId: 4, lesson: '/learn/liquidity-the-most-misunderstood-word-in-trading/' },
  { path: '/tools/glossary/structure/market-structure-bos-mss-choch/', conceptId: 'market_structure_bos_mss_choch', chapterId: 11, lesson: '/learn/market-structure-shift-mss-verified-directional-shift/' },
  { path: '/tools/glossary/time-and-sessions/sessions-killzones/', conceptId: 'sessions_killzones_timing', chapterId: 19, lesson: '/learn/time-and-session-liquidity-the-global-clock/' },
];
export const cornerstoneCopy = {
  heading: c('Make the idea concrete', 'تصور کو مثال سے سمجھیں'),
  example: c('Work through an invented example', 'ایک فرضی مثال سمجھیں'),
  counter: c('Compare a counterexample', 'مخالف مثال سے موازنہ کریں'),
  question: c('Pause and check your reasoning', 'رک کر اپنی دلیل جانچیں'),
  reveal: c('Read the explanation', 'وضاحت پڑھیں'),
  limit: c('Where judgment enters', 'فیصلے میں ذاتی تشریح کہاں آتی ہے'),
  next: c('Continue with the related lesson', 'متعلقہ سبق جاری رکھیں'),
  sources: c('Read this lesson’s sources and interpretation notes', 'اس سبق کے ماخذ اور تشریح کے نوٹس پڑھیں'),
  scope: c('Original examples updated', 'اصل تعلیمی مثالیں اپ ڈیٹ ہوئیں'),
  notice: c('These invented examples explain a definition; they are not historical market evidence, trade recommendations or a new review of the source recordings.', 'یہ فرضی مثالیں تعریف سمجھاتی ہیں؛ تاریخی مارکیٹ شواہد، ٹریڈ کی سفارش یا ماخذ ریکارڈنگ کے نئے جائزے کا دعویٰ نہیں۔'),
};
export const cornerstoneGuides = [
  {
    chapterId: 1,
    title: c('Price changes: separate trades from quotes', 'قیمت کی تبدیلی: ٹریڈ اور کوٹ میں فرق کریں'),
    example: c('Imagine an exchange book offering two contracts at 100 and three at 101. A marketable buy for four contracts, with no competing changes, fills two at each price. Its average is 100.5 and its last execution is 101. The quoted offer and the average fill are different numbers.', 'فرض کریں ایکسچینج بک میں دو کنٹریکٹ 100 اور تین 101 پر دستیاب ہیں۔ دوسرے آرڈرز نہ بدلیں تو چار کنٹریکٹ کا Marketable Buy دو ہر قیمت پر خریدتا ہے۔ اوسط 100.5 اور آخری ٹریڈ 101 ہے۔ کوٹ کردہ آفر اور اوسط Fill مختلف اعداد ہیں۔'),
    counter: c('An offer can also disappear because its owner cancels it. The best ask can move without a trade at the old ask. A price display moving upward therefore does not, by itself, establish aggressive buying or identify an institution.', 'آفر اس لیے بھی ختم ہو سکتی ہے کہ مالک اسے منسوخ کرے۔ پرانی Ask پر ٹریڈ ہوئے بغیر بہترین Ask بدل سکتی ہے۔ اس لیے صرف اوپر جاتی قیمت جارحانہ خریداری یا کسی ادارے کی شناخت ثابت نہیں کرتی۔'),
    question: c('Does an upward candle prove there were more contracts bought than sold?', 'کیا اوپر کی کینڈل ثابت کرتی ہے کہ فروخت سے زیادہ کنٹریکٹ خریدے گئے؟'),
    answer: c('No. Each executed contract has a buyer and a seller. The example concerns which resting prices an incoming order can reach, not an imbalance in the number of contracts bought versus sold.', 'نہیں۔ ہر ٹریڈ شدہ کنٹریکٹ کا خریدار اور فروخت کنندہ ہوتا ہے۔ مثال اس بارے میں ہے کہ آنے والا آرڈر کن موجودہ قیمتوں تک پہنچتا ہے، خریدے اور بیچے گئے کنٹریکٹس کی تعداد کے فرق کے بارے میں نہیں۔'),
    limit: c('This is a simplified exchange-book illustration. It excludes fees, latency, hidden liquidity and competing orders. A candle alone cannot reconstruct that book; spot FX does not have one consolidated exchange book.', 'یہ ایکسچینج بک کی سادہ مثال ہے۔ فیس، تاخیر، پوشیدہ لیکویڈیٹی اور دوسرے آرڈرز شامل نہیں۔ صرف کینڈل سے وہ بک دوبارہ نہیں بن سکتی؛ Spot FX کی ایک مشترکہ ایکسچینج بک نہیں ہوتی۔'),
    next: '/learn/how-an-exchange-matches-orders/', nextLabel: c('How exchanges match orders', 'ایکسچینج آرڈرز کیسے میچ کرتی ہے'),
  },
  {
    chapterId: 2,
    title: c('Order matching: price, queue and execution', 'آرڈر میچنگ: قیمت، قطار اور عمل درآمد'),
    example: c('In a simplified price-time queue, seller A offers three units at 50 before seller B offers two at 50. An incoming marketable buy for four takes A’s three, then one from B. This result depends on the stated allocation method.', 'سادہ Price-time قطار میں فروخت کنندہ A پہلے تین یونٹ 50 پر اور B بعد میں دو یونٹ 50 پر رکھتا ہے۔ چار کا Marketable Buy پہلے A کے تین، پھر B کا ایک لیتا ہے۔ یہ نتیجہ بیان کردہ Allocation طریقے پر منحصر ہے۔'),
    counter: c('Other products use pro-rata or hybrid allocation. Do not transfer a FIFO queue example to every contract or assume a limit order fills merely because a candle touches its price.', 'دوسرے پراڈکٹس Pro-rata یا مشترکہ Allocation استعمال کرتے ہیں۔ FIFO کی مثال ہر کنٹریکٹ پر لاگو نہ کریں، اور صرف کینڈل کے قیمت چھونے سے Limit Order کا Fill فرض نہ کریں۔'),
    question: c('Does a limit order guarantee both the requested price and a fill?', 'کیا Limit Order مطلوبہ قیمت اور Fill دونوں کی ضمانت دیتا ہے؟'),
    answer: c('No. A limit constrains the acceptable execution price; it can remain unfilled. A marketable limit can execute immediately against available orders, so “limit” does not always mean passive.', 'نہیں۔ Limit قابل قبول عمل درآمد کی قیمت محدود کرتا ہے؛ آرڈر نامکمل رہ سکتا ہے۔ Marketable Limit موجودہ آرڈرز کے مقابل فوراً عمل میں آ سکتا ہے، اس لیے Limit ہمیشہ Passive نہیں ہوتا۔'),
    limit: c('Check the exchange, product and order-type rules before interpreting queue priority. This arithmetic ignores partial cancellations and changes arriving during execution.', 'قطار کی ترجیح سمجھنے سے پہلے ایکسچینج، پراڈکٹ اور آرڈر کی قسم کے قواعد دیکھیں۔ اس حساب میں جزوی منسوخی اور عمل کے دوران آنے والی تبدیلیاں شامل نہیں۔'),
    next: '/learn/the-order-book-in-depth/', nextLabel: c('Read the order book and its limits', 'Order Book اور اس کی حدود سمجھیں'),
  },
  {
    chapterId: 3,
    title: c('Order-book depth is a snapshot, not a promise', 'Order Book کی گہرائی لمحاتی تصویر ہے، وعدہ نہیں'),
    example: c('Suppose the best bid is 99.75 and the best ask is 100. The displayed spread is 0.25. If 20 units are visible at the ask, that is the displayed quantity at that moment, not a promise that your later order will receive all 20.', 'فرض کریں بہترین Bid 99.75 اور بہترین Ask 100 ہے۔ ظاہر کردہ Spread 0.25 ہے۔ Ask پر 20 یونٹ دکھائی دیں تو یہ اس لمحے کی ظاہر کردہ مقدار ہے، اس بات کا وعدہ نہیں کہ بعد کا آرڈر تمام 20 حاصل کرے گا۔'),
    counter: c('A large displayed order may execute, be amended or be cancelled. Cancellation alone does not establish spoofing; a screenshot cannot establish the trader’s intent.', 'بڑا ظاہر کردہ آرڈر Fill، تبدیل یا منسوخ ہو سکتا ہے۔ صرف منسوخی Spoofing ثابت نہیں کرتی؛ اسکرین شاٹ ٹریڈر کی نیت ثابت نہیں کر سکتا۔'),
    question: c('Can yesterday’s candle show the exact queue available at its high?', 'کیا کل کی کینڈل اپنے ہائی پر دستیاب درست قطار دکھا سکتی ہے؟'),
    answer: c('No. OHLC compresses trades over a period. It does not preserve every displayed order, cancellation or queue position. Use appropriate depth data when the research question depends on those events.', 'نہیں۔ OHLC ایک مدت کی ٹریڈز کا خلاصہ ہے۔ یہ ہر ظاہر کردہ آرڈر، منسوخی یا قطار کی جگہ محفوظ نہیں کرتا۔ ایسے واقعات کی تحقیق کے لیے مناسب Depth Data استعمال کریں۔'),
    limit: c('Displayed depth is venue-specific and may exclude hidden quantity or other venues. Avoid treating one book as a complete picture of global liquidity.', 'ظاہر کردہ Depth مخصوص Venue کی ہوتی ہے؛ پوشیدہ مقدار یا دوسرے Venues شامل نہ ہوں۔ ایک بک کو عالمی لیکویڈیٹی کی مکمل تصویر نہ سمجھیں۔'),
    next: '/learn/liquidity-the-most-misunderstood-word-in-trading/', nextLabel: c('Liquidity: execution conditions and chart references', 'Liquidity: عمل درآمد کی شرائط اور چارٹ کے حوالے'),
  },
  {
    chapterId: 4,
    title: c('Liquidity: distinguish a reference from measured orders', 'Liquidity: حوالہ جاتی لیول اور ناپے گئے آرڈرز الگ کریں'),
    example: c('Mark two earlier highs near 105 as a possible buy-side reference. Then write two separate observations: “price traded above 105” and “price later closed below 105.” Neither observation measures how many stops were present.', '105 کے قریب پہلے کے دو ہائی ممکنہ Buy-side حوالے کے طور پر نشان زد کریں۔ پھر دو الگ مشاہدے لکھیں: قیمت 105 سے اوپر ٹریڈ ہوئی، اور بعد میں 105 سے نیچے بند ہوئی۔ کوئی بھی مشاہدہ موجود Stop Orders کی تعداد نہیں ناپتا۔'),
    counter: c('Price can break the same highs and continue higher. Calling the area liquidity does not require a reversal, establish the identity of buyers, or prove that a particular group was trapped.', 'قیمت انہی ہائیز کو عبور کر کے مزید اوپر جا سکتی ہے۔ علاقے کو Liquidity کہنا ریورسل لازم نہیں کرتا، خریداروں کی شناخت نہیں بتاتا اور کسی خاص گروہ کے پھنسنے کا ثبوت نہیں۔'),
    question: c('Are the size of a chart’s presumed stop pool and the displayed depth the same measurement?', 'کیا چارٹ کے مفروضہ Stop Pool کی مقدار اور ظاہر کردہ Depth ایک ہی پیمائش ہیں؟'),
    answer: c('No. One is an inference from a chart reference; the other is a venue’s displayed orders at a moment. Neither alone describes every executable order in the market.', 'نہیں۔ ایک چارٹ کے حوالے سے اخذ کیا گیا اندازہ ہے؛ دوسرا کسی لمحے Venue پر ظاہر کردہ آرڈرز ہیں۔ دونوں میں سے کوئی اکیلا مارکیٹ کے تمام قابل عمل آرڈرز نہیں بتاتا۔'),
    limit: c('Choose the reference highs, tolerance and observation window before replay. Otherwise it is easy to rename whichever level price eventually crosses.', 'Replay سے پہلے حوالہ جاتی ہائیز، قابل قبول فرق اور مشاہدے کی مدت طے کریں۔ ورنہ بعد میں عبور ہونے والے ہر لیول کو نیا نام دینا آسان ہے۔'),
    next: '/learn/liquidity-engineering-and-liquidity-runs/', nextLabel: c('Compare sweeps with continuation outcomes', 'Sweep اور جاری رہنے والی حرکت کا موازنہ کریں'),
  },
  {
    chapterId: 7,
    title: c('Swing highs: confirmation takes another candle', 'Swing High: تصدیق کے لیے اگلی کینڈل ضروری ہے'),
    example: c('Using a strict three-candle rule, highs of 100, 103 and 101 confirm the middle candle as a local swing high only after candle 3 closes. The middle candle’s high was visible earlier; its confirmed swing status was not.', 'سخت تین کینڈل قاعدے میں 100، 103 اور 101 کے ہائیز درمیانی کینڈل کو مقامی Swing High صرف تیسری کینڈل بند ہونے کے بعد بناتے ہیں۔ درمیان کا ہائی پہلے نظر آتا تھا؛ تصدیق شدہ Swing کی حیثیت نہیں۔'),
    counter: c('Highs of 100, 103 and 103 do not meet this strict greater-than rule. A method that accepts equal highs is a different convention and should be recorded separately.', '100، 103 اور 103 کے ہائیز سخت Greater-than قاعدہ پورا نہیں کرتے۔ برابر ہائیز قبول کرنے کا طریقہ مختلف Convention ہے، اسے الگ لکھنا چاہیے۔'),
    question: c('Can you place a confirmed swing label on candle 2 while candle 3 is still developing?', 'کیا تیسری کینڈل بنتے ہوئے دوسری کینڈل کو تصدیق شدہ Swing کہہ سکتے ہیں؟'),
    answer: c('Not under this closed-candle rule. Candle 3 could still trade above the middle high. In replay, record the confirmation time rather than treating the later label as information available earlier.', 'اس بند کینڈل قاعدے میں نہیں۔ تیسری کینڈل اب بھی درمیانی ہائی سے اوپر جا سکتی ہے۔ Replay میں تصدیق کا وقت لکھیں؛ بعد کا لیبل پہلے سے معلوم معلومات نہ سمجھیں۔'),
    limit: c('A local three-candle swing is not automatically a major structural high. Timeframe, equal-high handling and the selection of larger swings are separate choices.', 'مقامی تین کینڈل Swing خود بخود بڑا Structural High نہیں ہوتا۔ ٹائم فریم، برابر ہائیز کا طریقہ اور بڑے Swings کا انتخاب الگ فیصلے ہیں۔'),
    next: '/learn/break-of-structure-bos-trend-continuation/', nextLabel: c('Define a break of structure', 'Break of Structure کی تعریف طے کریں'),
  },
  {
    chapterId: 9,
    title: c('BOS: identify the swing and the break rule', 'BOS: پہلے Swing اور بریک کا قاعدہ طے کریں'),
    example: c('Suppose your selected continuation high is 110 and your rule requires a candle close above it. A wick to 110.5 with a close at 109.8 is not a qualifying close. A later close at 110.2 satisfies that price condition.', 'فرض کریں منتخب Continuation High 110 ہے اور قاعدہ اس سے اوپر بند ہونے والی کینڈل مانگتا ہے۔ 110.5 کی وِک مگر 109.8 کا کلوز اہل نہیں۔ بعد کا 110.2 کا کلوز قیمت کی وہ شرط پورا کرتا ہے۔'),
    counter: c('If your rule counts any trade above the level, the wick would qualify. These are different definitions; switching between them after seeing the outcome makes comparisons unreliable.', 'اگر قاعدہ لیول کے اوپر کسی بھی ٹریڈ کو شمار کرتا ہے تو وِک اہل ہو گی۔ یہ مختلف تعریفیں ہیں؛ نتیجہ دیکھ کر ان کے درمیان بدلنا موازنے کو ناقابل اعتماد بناتا ہے۔'),
    question: c('Does a qualifying break prove the trend will keep going?', 'کیا اہل بریک ثابت کرتا ہے کہ رجحان جاری رہے گا؟'),
    answer: c('No. It labels an observed condition. Price may reverse immediately afterward. Keep the original label and record the failed continuation instead of deleting the example.', 'نہیں۔ یہ دیکھی گئی شرط کا نام ہے۔ اس کے فوراً بعد قیمت پلٹ سکتی ہے۔ اصل لیبل برقرار رکھیں اور ناکام Continuation لکھیں، مثال حذف نہ کریں۔'),
    limit: c('Educators differ on which swings matter and whether a wick or close counts. State the convention and timeframe; a label is not an execution plan.', 'اساتذہ اس بات پر مختلف رائے رکھتے ہیں کہ کون سے Swings اہم ہیں اور وِک یا کلوز شمار ہو گا۔ Convention اور ٹائم فریم لکھیں؛ لیبل عمل درآمد کا منصوبہ نہیں۔'),
    next: '/learn/change-of-character-choch-the-first-warning/', nextLabel: c('Compare CHoCH with a continuation break', 'CHoCH اور Continuation Break کا موازنہ کریں'),
  },
  {
    chapterId: 10,
    title: c('CHoCH: a warning needs a defined reference', 'CHoCH: وارننگ کے لیے واضح حوالہ ضروری ہے'),
    example: c('In a sequence of higher highs and higher lows, choose the higher low at 104 before replaying further. Under a close-below convention, a close at 103.8 changes that local sequence. Describe the broken reference before adding a reversal story.', 'Higher Highs اور Higher Lows کی ترتیب میں Replay آگے بڑھانے سے پہلے 104 کا Higher Low منتخب کریں۔ Close-below Convention میں 103.8 کا کلوز مقامی ترتیب بدلتا ہے۔ ریورسل کی کہانی سے پہلے ٹوٹا ہوا حوالہ بیان کریں۔'),
    counter: c('The next candles may reclaim 104 and continue upward. A change in the local sequence is not proof of a lasting change in the larger timeframe trend.', 'اگلی کینڈلز 104 واپس حاصل کر کے اوپر جا سکتی ہیں۔ مقامی ترتیب کی تبدیلی بڑے ٹائم فریم کے مستقل رجحان کی تبدیلی ثابت نہیں کرتی۔'),
    question: c('Can two readers label the same chart differently without either price feed being wrong?', 'کیا قیمت کا ڈیٹا درست ہوتے ہوئے دو قارئین ایک ہی چارٹ کو مختلف لیبل دے سکتے ہیں؟'),
    answer: c('Yes. They may select different swings, timeframes or break conventions. Compare those choices first. Agreement on a label still does not establish predictive value.', 'ہاں۔ وہ مختلف Swings، ٹائم فریم یا Break Conventions منتخب کر سکتے ہیں۔ پہلے ان فیصلوں کا موازنہ کریں۔ لیبل پر اتفاق بھی پیش گوئی کی افادیت ثابت نہیں کرتا۔'),
    limit: c('CHoCH is not standardized across all trading education. Keep its local definition separate from MSS requirements and from a complete trading strategy.', 'CHoCH کی تعریف تمام ٹریڈنگ تعلیم میں یکساں نہیں۔ اس کی مقامی تعریف کو MSS کی شرائط اور مکمل ٹریڈنگ حکمت عملی سے الگ رکھیں۔'),
    next: '/learn/market-structure-shift-mss-verified-directional-shift/', nextLabel: c('Study MSS conditions and uncertainty', 'MSS کی شرائط اور غیر یقینی نتائج پڑھیں'),
  },
  {
    chapterId: 11,
    title: c('MSS: keep the condition and the outcome separate', 'MSS: شرط اور نتیجے کو الگ رکھیں'),
    example: c('Write the selected short-term swing, the break convention and your measurable displacement criterion before revealing later candles. Then ask whether the completed candles meet those conditions. If your chosen model also requires an FVG, check its outer-candle boundaries separately.', 'بعد کی کینڈلز کھولنے سے پہلے منتخب Short-term Swing، Break Convention اور Displacement کی قابل پیمائش شرط لکھیں۔ پھر دیکھیں بند کینڈلز شرائط پوری کرتی ہیں یا نہیں۔ منتخب ماڈل FVG بھی مانگے تو بیرونی کینڈلز کی حدود الگ جانچیں۔'),
    counter: c('A sharp move that never crosses the selected swing does not satisfy the break condition. A break without your required displacement also falls short, even if price later moves in the hoped-for direction.', 'تیز حرکت منتخب Swing عبور نہ کرے تو بریک کی شرط پوری نہیں۔ ضروری Displacement کے بغیر بریک بھی ناکافی ہے، چاہے بعد میں قیمت مطلوبہ سمت چلی جائے۔'),
    question: c('If all written conditions appear, is a profitable reversal confirmed?', 'تمام لکھی ہوئی شرائط آ جائیں تو کیا منافع بخش ریورسل تصدیق شدہ ہے؟'),
    answer: c('No. Only the observation rule has been met. Entry, cancellation, exit, fill assumptions and costs are separate questions, and the resulting trade can lose.', 'نہیں۔ صرف مشاہدے کا قاعدہ پورا ہوا ہے۔ انٹری، منسوخی، اخراج، Fill کے مفروضے اور اخراجات الگ سوالات ہیں، اور نتیجے کی ٹریڈ نقصان دے سکتی ہے۔'),
    limit: c('Swing selection and displacement thresholds involve judgment unless you make them explicit. Do not use “confirmed” to imply certainty about future direction.', 'Swing کا انتخاب اور Displacement کی حد ذاتی تشریح رکھتے ہیں جب تک انہیں واضح نہ کیا جائے۔ Confirmed کا لفظ مستقبل کی سمت کے یقین کے لیے استعمال نہ کریں۔'),
    next: '/learn/fair-value-gaps-fvg-and-consequent-encroachment/', nextLabel: c('Measure FVGs and their counterexamples', 'FVG اور اس کی مخالف مثالیں ناپیں'),
  },
  {
    chapterId: 19,
    title: c('Session windows: anchor the date and timezone', 'سیشن کے اوقات: تاریخ اور ٹائم زون واضح کریں'),
    example: c('A reference window starting at 09:30 in America/New_York is 13:30 UTC when New York is on UTC−4, and 14:30 UTC when it is on UTC−5. The New York clock time stays the same; the UTC conversion changes with the date.', 'America/New_York میں 09:30 سے شروع ہونے والی کھڑکی، New York کے UTC−4 ہونے پر 13:30 UTC اور UTC−5 ہونے پر 14:30 UTC ہے۔ New York کی گھڑی کا وقت وہی رہتا ہے؛ تاریخ کے ساتھ UTC تبدیلی بدلتی ہے۔'),
    counter: c('A fixed UTC offset copied across the whole year can shift the intended window by an hour. Futures, equities and FX also have different session conventions; an equity cash open does not mean every market opens then.', 'پورے سال ایک ہی UTC Offset نقل کرنا مطلوبہ کھڑکی کو ایک گھنٹہ بدل سکتا ہے۔ Futures، Equities اور FX کے سیشن مختلف ہیں؛ Equity Cash Open کا مطلب ہر مارکیٹ کا اسی وقت کھلنا نہیں۔'),
    question: c('Can you mark a session’s final high before that session ends?', 'کیا سیشن ختم ہونے سے پہلے اس کا آخری ہائی نشان زد کر سکتے ہیں؟'),
    answer: c('You can mark the high so far, not the final high. In replay, keep the developing boundary distinct from the completed range to avoid using future information.', 'اب تک کا ہائی نشان زد کر سکتے ہیں، آخری ہائی نہیں۔ Replay میں بنتی ہوئی حد اور مکمل رینج الگ رکھیں تاکہ مستقبل کی معلومات استعمال نہ ہوں۔'),
    limit: c('A killzone is an analysis convention, not an exchange guarantee or a prediction of direction. Check the instrument’s official calendar, holidays and actual session rules.', 'Killzone تجزیے کا Convention ہے، ایکسچینج کی ضمانت یا سمت کی پیش گوئی نہیں۔ پراڈکٹ کا آفیشل کیلنڈر، تعطیلات اور اصل سیشن قواعد دیکھیں۔'),
    next: '/learn/daily-profiles-and-intraday-power-of-three-po3/', nextLabel: c('Compare session references with daily profiles', 'سیشن کے حوالوں اور Daily Profiles کا موازنہ کریں'),
  },
];
export const cornerstoneUrdu: Record<string, string> = {};
function collect(value: unknown): void {
  if (!value || typeof value !== 'object') return;
  if ('en' in value && 'ur' in value) {
    const pair = value as Copy; cornerstoneUrdu[pair.en] = pair.ur; return;
  }
  Object.values(value).forEach(collect);
}
collect(cornerstoneGuides); collect(cornerstoneCopy);
