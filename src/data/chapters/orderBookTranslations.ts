import documentUrdu from './orderBookDocumentUrdu.json';

export const orderBookTranslations: Record<string, string> = {
  ...documentUrdu,
  '15 October 2026': '15 اکتوبر 2026',
  '24 November 2026': '24 نومبر 2026',
  'Key Takeaways': 'اہم نکات',
  'Table of Contents': 'فہرستِ مضامین',
  'Continue learning': 'مطالعہ جاری رکھیں',
  'Continue Studying': 'مطالعہ جاری رکھیں',
  'Technical exchange references': 'ایکسچینج اور ضابطہ کار حوالے',
  'Verified exchange and regulatory references': 'مصدقہ ایکسچینج اور ضابطہ کار حوالے',
  'All example prices, book snapshots, OBI scores, and auction sizes are illustrative synthetic teaching figures, not historical trades or live venue quotes.':
    'اس باب کی تمام مثالی قیمتیں، آرڈر بک کے مناظر، OBI اسکور اور نیلامی کے حجم صرف تعلیمی و فرضی اعدادوشمار ہیں، نہ کہ تاریخی سودے یا لائیو وینیو کوٹس۔',
  'Interactive Study Checklist': 'انٹرایکٹو مطالعہ چیک لسٹ',
  'checks completed': 'نکات مکمل ہوئے',
  'Confirmed venue scope (single futures CLOB, fragmented equity/crypto book, or OTC dealer feed)':
    'وینیو کا دائرہ تصدیق کریں (واحد فیوچرز CLOB، منقسم حصص/کرپٹو بک یا OTC ڈیلر فیڈ)',
  'Checked current bid-ask spread in ticks relative to average session spread':
    'موجودہ بِڈ آسک اسپریڈ کو سیشن کے اوسط اسپریڈ کے مقابل ٹِکس میں جانچا',
  'Compared planned position size against displayed size in the top 3 price ticks':
    'اپنی مجوزہ پوزیشن کا حجم اوپری 3 ٹِکس کی نظر آنے والی مقدار سے جانچا',
  'Verified whether resting depth held or cancelled when price approached':
    'تصدیق کی کہ قیمت قریب آنے پر موجود ڈیپتھ قائم رہی یا منسوخ ہوئی',
  'Separated passive resting walls from actual executed prints on Time & Sales':
    'غیر فعال دیواروں کو ٹائم اینڈ سیلز پر حقیقی سودوں سے الگ پرکھا',
  'Pre-selected limit vs. stop-market exit rules before opening any replay position':
    'ری پلے میں کسی پوزیشن سے پہلے لمٹ بمقابلہ اسٹاپ مارکیٹ اخراج کے اصول طے کیے',

  // Related reading links
  'What Actually Moves Price?': 'قیمت واقعی کیوں بدلتی ہے؟',
  'How an Exchange Matches Orders': 'ایکسچینج آرڈرز کیسے میچ کرتی ہے',
  'What Is Liquidity in Trading?': 'ٹریڈنگ میں لیکویڈیٹی کیا ہے؟',
  'Fair Value Gaps (FVG) & Consequent Encroachment': 'فیئر ویلیو گیپس (FVG) اور کانسیکوئنٹ انکروچمنٹ',
  'Order Book & Liquidity Glossary': 'آرڈر بک اور لیکویڈیٹی کی لغت',
  'Chart Lab Practice': 'چارٹ لیب مشق',
  'Explore All Market Foundations Lessons': 'مارکیٹ فاؤنڈیشنز کے تمام اسباق دیکھیں',

  // Interactive visual headings & controls
  'Inside a Central Limit Order Book (CLOB)': 'سینٹرل لمٹ آرڈر بک (CLOB) کے اندر',
  'Synthetic snapshot · not live quotes': 'فرضی منظر · لائیو کوٹس نہیں',
  'Order book anatomy showing asks above spread and bids below': 'آرڈر بک کی ساخت: اسپریڈ کے اوپر آسکس اور نیچے بِڈز',
  'ASKS (Resting Sell Limits)': 'آسکس (موجود فروخت لمٹس)',
  'Best Ask (Inside Offer)': 'بہترین آسک (اندرونی آفر)',
  'SPREAD: $0.25 (1 tick)': 'اسپریڈ: $0.25 (1 ٹِک)',
  'MID-PRICE: $99.875': 'درمیانی قیمت: $99.875',
  'No resting limit rests at mid': 'وسط میں کوئی لمٹ موجود نہیں',
  'Best Bid (Inside Bid)': 'بہترین بِڈ (اندرونی بِڈ)',
  'How Prices Sort': 'قیمتوں کی ترتیب',
  '• Asks sort lowest → highest up the ladder.': '• آسکس کم سے زیادہ قیمت اوپر ترتیب پاتی ہیں۔',
  '• Bids sort highest → lowest down the ladder.': '• بِڈز زیادہ سے کم قیمت نیچے ترتیب پاتی ہیں۔',
  '• Market buys lift Best Ask first.': '• مارکیٹ بائے پہلے بہترین آسک لیتی ہے۔',
  '• Market sells hit Best Bid first.': '• مارکیٹ سیل پہلے بہترین بِڈ لیتی ہے۔',
  'Tick Increment = $0.25': 'ٹِک کا فرق = $0.25',
  'Resting limits wait as Makers until matched.': 'موجود لمٹس میچ ہونے تک میکر رہتی ہیں۔',
  'Resting asks stack upward from the lowest offer ($100.00), while bids stack downward from the highest bid ($99.75). The inside gap is the quoted spread.':
    'موجود آسکس کم ترین آفر ($100.00) سے اوپر اور بِڈز بلند ترین بِڈ ($99.75) سے نیچے ترتیب پاتی ہیں۔ درمیانی خلا اسپریڈ کہلاتا ہے۔',

  'Order Matching Engine: Taker Consuming Makers': 'آرڈر میچنگ انجن: ٹیکر میکرز کو استعمال کرتے ہوئے',
  'Animated matching sequence': 'متحرک میچنگ ترتیب',
  'Matching playback controls': 'میچنگ پلے بیک کنٹرولز',
  'Play': 'چلائیں',
  'Pause': 'روکیں',
  'Step': 'مرحلہ',
  'Reset': 'دوبارہ سیٹ',
  'Animated market buy matching against resting asks': 'موجود آسکس کے مقابل متحرک مارکیٹ بائے میچنگ',
  'Market Buy: 150 units': 'مارکیٹ بائے: 150 اکائیاں',
  'Waiting to cross spread': 'اسپریڈ پار کرنے کا انتظار',
  'Crossing spread now →': 'اب اسپریڈ پار ہو رہا ہے →',
  'Filled 150 · Avg $100.083': '150 فِل · اوسط $100.083',
  'left': 'باقی',
  'CLEARED': 'صاف',
  'New Best Ask: $100.25': 'نئی بہترین آسک: $100.25',
  'Current Best Ask: $100.00': 'موجودہ بہترین آسک: $100.00',
  'Step 0: Resting quotes sit idle (Best Ask $100.00 = 100 units).': 'مرحلہ 0: موجود کوٹس پرسکون ہیں (بہترین آسک $100.00 = 100 اکائیاں)۔',
  'Step 1: Urgent Market Buy for 150 units enters as a liquidity Taker.': 'مرحلہ 1: 150 اکائیوں کا فوری مارکیٹ بائے آرڈر ٹیکر بن کر داخل ہوتا ہے۔',
  'Step 2: First 100 units clear $100.00 completely—Best Ask disappears.': 'مرحلہ 2: پہلی 100 اکائیاں $100.00 مکمل صاف کرتی ہیں—بہترین آسک ختم۔',
  'Step 3: Final 50 units fill at $100.25; Best Ask shifts up with 50 left.': 'مرحلہ 3: آخری 50 اکائیاں $100.25 پر فِل ہوتی ہیں؛ نئی بہترین آسک $100.25 ہے۔',
  'A 150-unit market buy empties the entire $100.00 ask queue (100 units) and walks into $100.25 (50 units), leaving $100.25 as the new Best Ask at 50 remaining units.':
    '150 اکائیوں کی مارکیٹ بائے $100.00 کی پوری قطار (100) صاف کر کے $100.25 (50) تک جاتی ہے اور $100.25 کو نئی بہترین آسک بناتی ہے۔',

  'DOM Price Ladder vs. Cumulative Depth Chart': 'DOM قیمت لیڈر بمقابلہ مجموعی ڈیپتھ چارٹ',
  'Two views of the same book': 'ایک ہی بک کے دو مناظر',
  'Deep Book (Symmetric)': 'گہری بک (متوازن)',
  'Thin / Gapped Book': 'کم گہری / خلا والی بک',
  'Showing Both Views': 'دونوں مناظر دکھائے جا رہے ہیں',
  'Focus: Depth Chart': 'فوکس: ڈیپتھ چارٹ',
  'Focus: DOM Ladder': 'فوکس: DOM لیڈر',
  'DOM vertical ladder': 'DOM عمودی لیڈر',
  'Bid Qty': 'بِڈ مقدار',
  'Price': 'قیمت',
  'Ask Qty': 'آسک مقدار',
  'Cumulative bid and ask depth curve': 'مجموعی بِڈ اور آسک ڈیپتھ گراف',
  'Cumulative Bids': 'مجموعی بِڈز',
  'Cumulative Asks': 'مجموعی آسکس',
  'Switch between the Deep and Thin presets to see how a thin book leaves empty price gaps on the DOM ladder and creates flat shelves on the cumulative depth curve.':
    'گہری اور کم گہری بک کے درمیان بدل کر دیکھیں کہ کم ڈیپتھ DOM لیڈر پر خالی قیمتیں اور ڈیپتھ چارٹ پر چپٹی سطحیں کیسے بناتی ہے۔',

  'Level 1 vs. Level 2 vs. Level 3 (MBO) Data Inspector': 'لیول 1 بمقابلہ لیول 2 بمقابلہ لیول 3 (MBO) ڈیٹا معائنہ کار',
  'Same $100.00 Ask · 3 Resolutions': 'وہی $100.00 آسک · 3 درجات',
  'Level 1 (Top Quote)': 'لیول 1 (اوپری کوٹ)',
  'Level 2 (Aggregated MBP)': 'لیول 2 (مجموعی MBP)',
  'Level 3 (MBO Queue)': 'لیول 3 (MBO قطار)',
  'Best Quote Only': 'صرف بہترین کوٹ',
  'Hides stacked tiers behind $100.00.': '$100.00 کے پیچھے موجود سطحیں چھپی رہتی ہیں۔',
  'Market by Price': 'قیمت کے لحاظ سے (MBP)',
  'total': 'کل',
  'Cannot tell 1 large ticket from 20 small ones.': '1 بڑے آرڈر اور 20 چھوٹے آرڈرز میں فرق ممکن نہیں۔',
  'Individual Order IDs': 'انفرادی آرڈر IDs',
  'Reveals exact FIFO queue sequence & cancels.': 'درست FIFO قطار ترتیب اور منسوخیاں ظاہر کرتا ہے۔',
  'Level 2 compresses three separate resting sellers at $100.00 into one 2,000-unit number, while Level 3 MBO exposes individual Order IDs and timestamps.':
    'لیول 2 تین الگ فروخت کنندگان کو $100.00 پر 2,000 کے ایک عدد میں سموتا ہے جبکہ لیول 3 MBO ہر آرڈر کی شناخت اور وقت دکھاتا ہے۔',

  'FIFO (Price-Time) vs. Pro-Rata Allocation': 'FIFO (پرائس ٹائم) بمقابلہ پرو راٹا تقسیم',
  'At $99.75 Best Bid (400 resting)': '$99.75 بہترین بِڈ پر (400 موجود)',
  'Incoming Market Sell Size': 'آنے والی مارکیٹ سیل کا حجم',
  'Ticket': 'آرڈر ٹکٹ',
  'Posted Qty': 'درج مقدار',
  'FIFO Fill': 'FIFO فِل',
  'Pro-Rata Fill': 'پرو راٹا فِل',
  'Under FIFO, earliest ticket #A1 fills completely before #C3 receives a single unit. Under Pro-Rata, #C3 captures a proportional share immediately despite arriving last.':
    'FIFO میں سب سے پرانا آرڈر #A1 پہلے پورا فِل ہوتا ہے۔ پرو راٹا میں #C3 آخر میں آنے کے باوجود فوراً متناسب حصہ پاتا ہے۔',

  'Order Book Walker & Slippage Calculator': 'آرڈر بک واکر اور سلپیج کیلکولیٹر',
  'Synthetic book arithmetic': 'فرضی بک حساب',
  'Market Buy': 'مارکیٹ بائے',
  'Market Sell': 'مارکیٹ سیل',
  'Order Size': 'آرڈر حجم',
  'Order size': 'آرڈر حجم',
  'Order Book Walk Breakdown': 'آرڈر بک واک کی تفصیل',
  'Available': 'دستیاب',
  'Filled': 'فِل شدہ',
  'Remaining': 'باقی',
  'Weighted Avg Fill': 'وزنی اوسط فِل',
  'Last Print': 'آخری پرنٹ',
  'Book-Walk Slippage': 'سلپیج',
  'ticks': 'ٹِکس',
  'Unfilled': 'غیر فِل شدہ',
  'Experiment with Deep vs. Thin liquidity and order size to observe how average execution deviates from the screen inside quote.':
    'گہری اور کم گہری بک میں مختلف حجم آزما کر دیکھیں کہ اوسط فِل قیمت اسکرین کوٹ سے کیسے ہٹتی ہے۔',

  'Order Book Imbalance (OBI) & Microprice Sandbox': 'آرڈر بک عدم توازن (OBI) اور مائیکرو پرائس تجربہ گاہ',
  'Top-of-Book formula': 'اوپری بک فارمولا',
  'Best Bid Size ($99.75)': 'بہترین بِڈ حجم ($99.75)',
  'Best Ask Size ($100.00)': 'بہترین آسک حجم ($100.00)',
  'Mid-Price': 'درمیانی قیمت',
  'Weighted Microprice': 'وزنی مائیکرو پرائس',
  'Neutral': 'متوازن',
  'Bid-heavy': 'بِڈ بھاری',
  'Ask-heavy': 'آسک بھاری',
  'OBI is normalized between −1.0 and +1.0, pulling Microprice away from Mid-Price toward the thinner side—yet displayed quotes can cancel instantly.':
    'OBI −1.0 سے +1.0 کے درمیان رہتا ہے اور مائیکرو پرائس کو کمزور جانب جھکاتا ہے—تاہم کوٹس فوراً منسوخ بھی ہو سکتے ہیں۔',

  'Order Book Heatmap: Absorption vs. Pulled Wall': 'آرڈر بک ہیٹ میپ: ابزارپشن بمقابلہ ہٹائی گئی دیوار',
  'Liquidity over Price × Time': 'قیمت اور وقت کے ساتھ لیکویڈیٹی',
  'Scenario: Genuine Absorption': 'منظرنامہ: حقیقی ابزارپشن',
  'Scenario: Pulled Mirage Wall': 'منظرنامہ: ہٹائی گئی عارضی دیوار',
  'Price × time heatmap showing resting liquidity bands': 'قیمت × وقت ہیٹ میپ جو ریسٹنگ لیکویڈیٹی پٹیاں دکھا رہا ہے',
  'Resting Ask Band @ $100.00 (800 -> reloads 800)': '$100.00 پر آسک پٹی (800 -> ری لوڈ 800)',
  'Price reaches wall -> absorbed & rejects': 'قیمت دیوار تک پہنچ کر جذب و پلٹتی ہے',
  'Resting Ask Band @ $100.00 (1,200 -> 0)': '$100.00 پر آسک پٹی (1,200 -> 0)',
  'Wall pulled -> cancels before touch': 'دیوار ٹکرانے سے پہلے منسوخ',
  'Notice how genuine absorption retains bright intensity and prints heavy volume at $100.00, whereas a pulled wall goes dark right before touch without proving illegal intent.':
    'حقیقی ابزارپشن میں پٹی روشن رہ کر بھاری والیوم جذب کرتی ہے، جبکہ ہٹائی گئی دیوار ٹکرانے سے پہلے غائب ہو جاتی ہے۔',

  'Iceberg Reserve Order Peak-Reload Simulator': 'آئس برگ ریزرو آرڈر ری لوڈ سمیولیٹر',
  '1,000 total · 100 visible peak': '1,000 کل · 100 ظاہری چوٹی',
  'Send 100-Unit Market Buy': '100 اکائی مارکیٹ بائے بھیجیں',
  'Visible Ask Peak @ $100.00': '$100.00 پر ظاہری آسک چوٹی',
  'Hidden Reserve Remaining': 'باقی مخفی ریزرو',
  'Total Executed on Tape': 'ٹیپ پر کل فِل',
  'Displayed DOM only shows 100 units at a time, yet repeated 100-unit buys exhaust 1,000 contracts because the engine reloads from hidden reserve until reserve hits zero.':
    'DOM ہر بار صرف 100 اکائیاں دکھاتی ہے، مگر بار بار خریداری سے 1,000 کنٹریکٹس فِل ہوتے ہیں کیونکہ انجن ریزرو سے چوٹی بھرتا رہتا ہے۔',

  'Opening / Closing Call Auction Uncross Table': 'افتتاحی / اختتامی کال نیلامی ان کراس جدول',
  'Max Volume Clearing Price': 'زیادہ سے زیادہ والیوم کلیئرنگ قیمت',
  'Cum Buy': 'مجموعی خرید',
  'Cum Sell': 'مجموعی فروخت',
  'Matched': 'میچ شدہ',
  'Imbalance': 'عدم توازن',
  'At $100.00, cumulative buy interest (410) and cumulative sell interest (400) maximize matched volume at 400 shares with minimum remaining imbalance (10 shares).':
    '$100.00 پر مجموعی خرید (410) اور مجموعی فروخت (400) کم سے کم بقایا (10 حصص) کے ساتھ سب سے زیادہ 400 حصص میچ کرتی ہے۔',

  'Order Book Mechanics vs. Candlestick Chart Hypotheses': 'آرڈر بک میکانکس بمقابلہ کینڈل چارٹ مفروضے',
  'Observed vs. Inferred': 'مشاہدہ بمقابلہ قیاس',
  'Side by side order book events and candlestick displacement': 'آرڈر بک واقعات اور کینڈل ڈسپلیسمنٹ کا تقابلی خاکہ',
  '1. Order Book Event (Microstructure)': '1. آرڈر بک واقعہ (مائیکرو اسٹرکچر)',
  '• Asks above $100.25 thin out or cancel': '• $100.25 سے اوپر آسکس کم یا منسوخ ہوتی ہیں',
  '• Stop-buys trigger above old swing high': '• پرانے ہائی کے اوپر اسٹاپ بائے فعال ہوتے ہیں',
  '• Market buys sweep thin ticks fast': '• مارکیٹ بائے پتلے ٹِکس تیزی سے صاف کرتی ہے',
  'OBSERVED': 'مشاہدہ',
  'Price range & spread skip': 'قیمت کی حد اور تیز حرکت',
  'INFERRED': 'قیاس',
  'Exact stop sizes & actor motives': 'درست اسٹاپ حجم اور شرکاء کی نیت',
  '2. Resulting OHLC Chart Footprint': '2. نتیجے میں بننے والا OHLC چارٹ',
  '3-Candle FVG': '3 کینڈل FVG',
  'Candles compress fills; they never display the queue.': 'کینڈلز سودوں کو سمیٹتی ہیں؛ قطار نہیں دکھاتیں۔',
  'Thin resting ask depth can accelerate an OHLC displacement candle, yet candlestick geometry alone cannot reconstruct cancelled quotes or prove resting stop counts.':
    'کمزور آسک ڈیپتھ ڈسپلیسمنٹ کینڈل کو تیز کر سکتی ہے، مگر صرف کینڈل منسوخ کوٹس یا اسٹاپ آرڈرز کی تعداد ثابت نہیں کر سکتی۔',

  // Technical Exchange References & Scope Notes
  'CME Group — Market by Order (MBO) and Globex Matching Rules': 'CME Group — مارکیٹ بائے آرڈر (MBO) اور گلوبیکس میچنگ قواعد',
  'Exchange explanation of matching engines, FIFO and pro-rata allocation, and how order-book feeds distribute queue updates. Check individual contract specifications for product-specific rules.':
    'میچنگ انجن، FIFO اور پرو راٹا تقسیم، اور آرڈر بک فیڈز کے ذریعے قطار کی تازہ کاریوں کی ایکسچینج وضاحت۔ مخصوص قواعد کے لیے متعلقہ کنٹریکٹ کی تفصیلات دیکھیں۔',
  'Investor.gov (SEC) — Market, Limit, and Stop Orders': 'Investor.gov (SEC) — مارکیٹ، لمٹ اور اسٹاپ آرڈرز',
  'SEC glossary defining limit price controls, marketable execution, and why stop orders convert into market orders upon trigger with execution-price uncertainty.':
    'SEC لغت جو لمٹ قیمت کے کنٹرول، قابلِ تکمیل اجرا، اور ٹریگر ہونے پر اسٹاپ آرڈرز کے مارکیٹ آرڈر میں بدلنے اور قیمت کے عدم یقین کی وضاحت کرتی ہے۔',
  'Nasdaq — TotalView-ITCH and Equities Auction Mechanics': 'Nasdaq — TotalView-ITCH اور حصص نیلامی نظام',
  'Primary exchange overview of Level 3 full-depth equities order flow, non-displayed/midpoint liquidity, and opening/closing cross auctions.':
    'لیول 3 مکمل ڈیپتھ حصص آرڈر فلو، غیر مرئی یا مڈ پوائنٹ لیکویڈیٹی، اور افتتاحی و اختتامی کراس نیلامیوں کا بنیادی ایکسچینج جائزہ۔',
  'CFTC — Anti-Spoofing and Disruptive Trading Practices Guidance': 'CFTC — اسپورفنگ مخالف ضابطے اور رہنمائی',
  'Regulatory guidance distinguishing bona fide quote adjustments from unlawful bidding or offering with intent to cancel before execution.':
    'ضابطہ کار رہنمائی جو حقیقی کوٹ تبدیلیوں اور اجرا سے پہلے منسوخ کرنے کی نیت سے دی جانے والی غیر قانونی بولی یا پیشکش کے درمیان فرق واضح کرتی ہے۔',
  'Bank for International Settlements — FX Execution Fragmentation': 'بینک فار انٹرنیشنل سیٹلمنٹس — فاریکس تکمیل کی تقسیم',
  'Explains why spot FX operates across decentralized dealer streams and electronic ECNs rather than a single consolidated exchange order book.':
    'واضح کرتا ہے کہ اسپاٹ فاریکس کسی ایک مرکزی ایکسچینج آرڈر بک کے بجائے غیر مرکزی ڈیلر اسٹریمز اور الیکٹرانک ECNs پر کیوں کام کرتا ہے۔',
  'All example prices, book snapshots, OBI scores, and auction sizes in this chapter are illustrative synthetic teaching figures, not historical trades or live venue quotes. Cancellation of resting liquidity never establishes unlawful intent by itself.':
    'اس باب کی تمام مثالی قیمتیں، آرڈر بک کے مناظر، OBI اسکور اور نیلامی کے حجم صرف تعلیمی و فرضی اعدادوشمار ہیں، نہ کہ تاریخی سودے یا لائیو مارکیٹ کوٹس۔ موجود لیکویڈیٹی کی منسوخی بذاتِ خود کسی غیر قانونی نیت کو ثابت نہیں کرتی۔',

  // Quizzes
  'A 300-unit market buy hits our synthetic Thin Book (Asks: 20 @ 100.00, 30 @ 100.25, 50 @ 100.50, 100 @ 101.00, 100 @ 101.50). What separates the last print from the average fill?':
    '300 اکائیوں کی مارکیٹ بائے فرضی کم گہری بک (آسکس: 20@100.00، 30@100.25، 50@100.50، 100@101.00، 100@101.50) سے ٹکراتی ہے۔ آخری پرنٹ اور اوسط فِل میں کیا فرق ہے؟',
  'Illustrative synthetic order book without hidden size, fees, or cancellations during matching.':
    'فرضی مثال جس میں میچنگ کے دوران پوشیدہ مقدار، فیس یا منسوخی شامل نہیں۔',
  'The last print is $101.50 while the volume-weighted average fill is $100.94.':
    'آخری پرنٹ $101.50 ہے جبکہ حجم کے لحاظ سے اوسط فِل $100.94 ہے۔',
  'All 300 units fill at the $100.00 Best Ask because top-of-book protects buyers.':
    'تمام 300 اکائیاں $100.00 کی بہترین آسک پر فِل ہوتی ہیں کیونکہ اوپری بک خریدار کو تحفظ دیتی ہے۔',
  'Only 20 units execute and the matching engine deletes the rest.':
    'صرف 20 اکائیاں فِل ہوتی ہیں اور انجن باقی حذف کر دیتا ہے۔',
  'A market buy walks ascending ask tiers until all 300 units match: (20×100.00 + 30×100.25 + 50×100.50 + 100×101.00 + 100×101.50) ÷ 300 = $100.9417, whereas the candlestick chart highlights $101.50 as the highest print.':
    'مارکیٹ بائے اوپر کی آسک سطحیں چلتی ہے: مجموعی اوسط $100.9417 بنتا ہے جبکہ کینڈل چارٹ سب سے اونچا پرنٹ $101.50 دکھاتا ہے۔',

  'In a strict Price-Time (FIFO) queue at $99.75, you sit behind 100 units with your own 100-unit limit bid. What happens if you increase your bid to 200 units?':
    '$99.75 پر سخت FIFO قطار میں آپ 100 اکائیوں کے پیچھے 100 کا لمٹ بِڈ لگائے بیٹھے ہیں۔ اگر آپ اسے 200 کر دیں تو کیا ہو گا؟',
  'The added size (or entire amended order on strict venues) moves to the back of the $99.75 queue.':
    'اضافی مقدار (یا سخت وینیوز پر پورا ترمیم شدہ آرڈر) $99.75 کی قطار کے آخر میں چلا جاتا ہے۔',
  'Your original timestamp pulls the new 100 units to the front of the queue.':
    'آپ کا پرانا وقت نئی 100 اکائیوں کو بھی قطار کے آگے کھینچ لاتا ہے۔',
  'Price-Time exchanges convert your limit order into Pro-Rata automatically.':
    'پرائس ٹائم ایکسچینج آپ کے لمٹ کو خودکار پرو راٹا میں بدل دیتی ہے۔',
  'Reducing resting size preserves your timestamp rank at a price level, whereas increasing quantity or changing price creates new priority loss so traders cannot hold front-of-line slots with 1-lot placeholders.':
    'مقدار گھٹانے سے قطار کی ترجیح برقرار رہتی ہے، لیکن مقدار بڑھانے یا قیمت بدلنے پر نیا ٹائم اسٹیمپ لگتا ہے تاکہ کوئی 1 لاٹ سے قطار روک کر نہ رکھ سکے۔',

  'Best Bid ($99.75) holds 300 units and Best Ask ($100.00) holds 100 units. Where does the weighted Microprice sit relative to the $99.875 Mid-Price?':
    'بہترین بِڈ ($99.75) پر 300 اور بہترین آسک ($100.00) پر 100 اکائیاں ہیں۔ $99.875 کی درمیانی قیمت کے مقابل وزنی مائیکرو پرائس کہاں ہو گی؟',
  'Higher, at $99.9375, because heavier resting bid volume tilts pressure toward the ask.':
    'اوپر، $99.9375 پر، کیونکہ بھاری بِڈ والیوم دباؤ کو آسک کی طرف جھکاتا ہے۔',
  'Lower, at $99.8125, because buyers always pull the market downward.':
    'نیچے، $99.8125 پر، کیونکہ خریدار ہمیشہ مارکیٹ نیچے کھینچتے ہیں۔',
  'Unchanged at $99.875 regardless of queue sizes.':
    'قطار کے حجم سے قطع نظر $99.875 پر ہی برقرار۔',
  'OBI = (300 − 100) ÷ 400 = +0.50. Microprice = ($100.00 × 300 + $99.75 × 100) ÷ 400 = $99.9375. Still, microprice reflects only current displayed quotes, which can cancel rapidly.':
    'OBI = +0.50 اور Microprice = $99.9375 بنتی ہے۔ تاہم مائیکرو پرائس صرف موجودہ کوٹس دکھاتی ہے جو تیزی سے منسوخ ہو سکتی ہیں۔',

  'Why does a sudden disappearance of a large 2,000-unit resting bid on a Level 2 DOM not automatically prove illegal spoofing?':
    'لیول 2 DOM پر 2,000 اکائیوں کی بڑی بِڈ کا اچانک غائب ہونا خودکار طور پر غیر قانونی اسپورفنگ کیوں ثابت نہیں کرتا؟',
  'Market makers routinely cancel or amend resting quotes to avoid adverse selection; spoofing requires proving deceptive intent to cancel.':
    'مارکیٹ میکرز خطرے سے بچنے کے لیے معمول کے مطابق کوٹس منسوخ یا تبدیل کرتے ہیں؛ اسپورفنگ کے لیے دھوکہ دہی کی نیت ثابت کرنا ضروری ہے۔',
  'Because Level 2 feeds hide all cancellations inside dark pools.':
    'کیونکہ لیول 2 فیڈز تمام منسوخیاں ڈارک پولز میں چھپا دیتی ہیں۔',
  'Because exchanges ban any resting bid above 500 contracts.':
    'کیونکہ ایکسچینجز 500 کنٹریکٹس سے بڑی بِڈ پر پابندی لگاتی ہیں۔',
  'Liquidity providers constantly pull and re-price orders as news, correlated markets, or inventory risk shift. Observing a pulled wall on a heatmap is never standalone proof of unlawful intent.':
    'خبروں یا خطرے میں تبدیلی پر لیکویڈیٹی فراہم کنندگان آرڈرز ہٹاتے اور بدلتے رہتے ہیں۔ ہیٹ میپ پر دیوار کا ہٹنا غیر قانونی نیت کا اکیلا ثبوت نہیں۔',

  'You open an MT4/MT5 spot Forex chart showing a DOM window and tick volume. What are you actually observing?':
    'آپ MT4/MT5 اسپاٹ فاریکس چارٹ پر DOM ونڈو اور ٹِک والیوم دیکھ رہے ہیں۔ آپ اصل میں کیا دیکھ رہے ہیں؟',
  'Your broker or liquidity bridge feed—not a single unified global exchange order book.':
    'اپنے بروکر یا لیکویڈیٹی برج کی فیڈ—کوئی واحد عالمی ایکسچینج آرڈر بک نہیں۔',
  'The consolidated worldwide central limit order book for all interbank FX.':
    'تمام انٹربینک فاریکس کی مشترکہ عالمی سینٹرل لمٹ آرڈر بک۔',
  'Every retail and central bank stop-loss resting across the market.':
    'پوری مارکیٹ میں موجود ہر ریٹیل اور مرکزی بینک کا اسٹاپ لاس۔',
  'Spot Forex trades over-the-counter across fragmented dealers and ECNs (such as EBS or LSEG). Retail broker feeds reflect localized quote depth and update counts rather than unified exchange MBO depth.':
    'اسپاٹ فاریکس مختلف ڈیلرز اور ECNs میں OTC ٹریڈ ہوتا ہے۔ ریٹیل بروکر فیڈز صرف مقامی کوٹس اور ٹِک گنتی دکھاتی ہیں، عالمی MBO ڈیپتھ نہیں۔',
};
