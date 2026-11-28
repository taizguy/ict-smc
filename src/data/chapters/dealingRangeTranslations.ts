import enDoc from './dealingRangeDocument.json';
import urDoc from './dealingRangeDocumentUrdu.json';
import { dealingRangeDates, type DealingRangeSection } from './dealingRangeLesson';

const pairs: Array<[string, string]> = [
  [enDoc.h1, urDoc.h1],
  [enDoc.seoTitle, urDoc.seoTitle],
  [enDoc.metaDescription, urDoc.metaDescription],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [dealingRangeDates.published.label, '28 نومبر 2026'],
  [dealingRangeDates.updated.label, '28 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['Dealing Range Equilibrium Rule', 'ڈیلنگ رینج توازن اصول'],
  ['50% Equilibrium = (Range High + Range Low) ÷ 2 · Below 50% = Discount · Above 50% = Premium', '50% توازن = (رینج ہائی + رینج لو) ÷ 2 · 50% سے نیچے = ڈسکاؤنٹ · 50% سے اوپر = پریمیم'],
  ['Chapter Contents', 'باب کے مندرجات'],
  ['On this page', 'اس صفحے پر'],
  ['Continue Studying', 'مزید مطالعہ جاری رکھیں'],
  ['Study Internal vs. External Structure', 'اندرونی بمقابلہ بیرونی اسٹرکچر کا مطالعہ کریں'],
  ['Study Trends, Ranges & Transitions', 'ٹرینڈ، رینج اور تبدیلیوں کا مطالعہ کریں'],
  ['Study Optimal Trade Entry (OTE)', 'آپٹیمل ٹریڈ انٹری (OTE) کا مطالعہ کریں'],
  ['Study Premium & Discount PD Arrays', 'پریمیم اور ڈسکاؤنٹ PD Arrays کا مطالعہ کریں'],
  ['Practice in the Guided Chart Lab', 'گائیڈڈ چارٹ لیب میں مشق کریں'],
  ['Synthetic illustration — not live quotes.', 'مصنوعی تعلیمی خاکہ — لائیو قیمتیں نہیں۔'],
  // Visual strings
  ['Stick-Figure Story: Anchoring the Right Ruler', 'اسٹک فگر کہانی: درست پیمانہ مقرر کرنا'],
  ['Concept Comic', 'تصوراتی کامک'],
  ['1. Sweep Origin (0%)', '1. سویپ کی ابتدا (0%)'],
  ['2. Displacement High (100%)', '2. ڈسپلیسمنٹ ہائی (100%)'],
  ['3. 50% Equilibrium Divider', '3. 50% توازن کی تقسیم'],
  ['Anchor the range start at the completed liquidity sweep extreme.', 'رینج کا آغاز مکمل لیکویڈیٹی سویپ کی انتہا پر رکھیں۔'],
  ['Anchor the opposite end at the confirmed swing created by displacement.', 'دوسرا سرا ڈسپلیسمنٹ سے بننے والے تصدیق شدہ سوئنگ پر رکھیں۔'],
  ['50% EQ cleanly splits Discount (longs) from Premium (shorts).', '50% توازن ڈسکاؤنٹ (لانگز) کو پریمیم (شارٹس) سے صاف الگ کرتا ہے۔'],
  ['Dealing Range Quadrant Map (0% / 25% / 50% / 75% / 100%)', 'ڈیلنگ رینج کواڈرنٹ نقشہ (0% / 25% / 50% / 75% / 100%)'],
  ['3D Dealing-Range Equilibrium Cube', '3D ڈیلنگ رینج ایکوئلبریم کیوب'],
  ['External Bullish Range', 'بیرونی صعودی رینج'],
  ['Internal Sub-Range', 'اندرونی ذیلی رینج'],
  ['Range Expansion Break', 'رینج توسیع بریک'],
  ['Cube Orbit', 'کیوب آربٹ'],
  ['Side Profile', 'سائیڈ پروفائل'],
  ['Play', 'چلائیں'],
  ['Pause', 'روکیں'],
  ['Reset', 'ری سیٹ'],
  ['Price displaces from 0% SSL to 100% BSL, pulls back below 50% EQ, and expands.', 'قیمت 0% SSL سے 100% BSL تک بڑھتی ہے، 50% توازن سے نیچے آتی ہے اور پھر پھیلتی ہے۔'],
  ['A smaller internal dealing range rotates inside the larger 4H external range.', 'ایک چھوٹی اندرونی ڈیلنگ رینج بڑی 4H بیرونی رینج کے اندر گردش کرتی ہے۔'],
  ['Candle bodies close above 100%, requiring a fresh dealing-range anchor.', 'کینڈل باڈیز 100% سے اوپر بند ہوتی ہیں، جس سے نئی ڈیلنگ رینج درکار ہوتی ہے۔'],
  ['Animated Sequence: Anchor → 50% Retrace → Target', 'اینیمیٹڈ سلسلہ: اینکر ← 50% ری ٹریس ← ہدف'],
  ['Auto-Play', 'آٹو پلے'],
  ['Next Step', 'اگلا مرحلہ'],
  ['Interactive Dealing-Range Quadrant & Equilibrium Calculator', 'انٹرایکٹو ڈیلنگ رینج کواڈرنٹ اور توازن کیلکولیٹر'],
  ['Range Low (0%)', 'رینج لو (0%)'],
  ['Range High (100%)', 'رینج ہائی (100%)'],
  ['Current Price', 'موجودہ قیمت'],
  ['Zone Status', 'زون کی حالت'],
  ['50% Equilibrium', '50% توازن'],
  ['25% / 75% Quadrants', '25% / 75% حصے'],
  ['Discount', 'ڈسکاؤنٹ'],
  ['Premium', 'پریمیم'],
  ['Equilibrium (50%)', 'توازن (50%)'],
  ['Outside Range', 'رینج سے باہر'],
  ['External Dealing Range vs. Internal Sub-Range', 'بیرونی ڈیلنگ رینج بمقابلہ اندرونی ذیلی رینج'],
  ['Worked Blueprints: NQ 4H vs. EUR/USD Daily', 'عملی بلیو پرنٹس: NQ 4H بمقابلہ EUR/USD ڈیلی'],
  ['NQ 4H Discount', 'NQ 4H ڈسکاؤنٹ'],
  ['EUR/USD Daily Premium', 'EUR/USD ڈیلی پریمیم'],
  ['Common Mistakes Marking Dealing Ranges', 'ڈیلنگ رینجز نشان زد کرنے میں عام غلطیاں'],
  ['Mistake 1: 1m Wick Anchors', 'غلطی 1: 1m وک اینکرز'],
  ['Mistake 2: Stale Range Anchors', 'غلطی 2: پرانی رینج پر قائم رہنا'],
  ['Mistake 3: Buying Upper Premium', 'غلطی 3: اوپری پریمیم میں خریداری'],
  ['Anchor on 1H/4H/Daily displacement swings before checking 5m.', '5m دیکھنے سے پہلے 1H/4H/ڈیلی ڈسپلیسمنٹ سوئنگز پر رینج بنائیں۔'],
  ['Re-anchor once candle bodies close beyond the old Range High or Low.', 'جب کینڈل باڈیز پرانے ہائی یا لو سے باہر بند ہوں تو رینج اپ ڈیٹ کریں۔'],
  ['Wait for price to enter Discount (<50% EQ) for bullish continuation.', 'صعودی تسلسل کے لیے قیمت کے ڈسکاؤنٹ (<50% EQ) میں آنے کا انتظار کریں۔'],
  ['Pre-Replay Dealing Range 6-Gate Checklist', 'ری پلے سے پہلے ڈیلنگ رینج 6-گیٹ چیک لسٹ'],
  ['Confirm all 6 gates before logging a dealing-range study.', 'ڈیلنگ رینج مطالعہ درج کرنے سے پہلے تمام 6 شرائط کی تصدیق کریں۔'],
  ['Anchored 0% and 100% on confirmed sweep and displacement swings', '0% اور 100% کو تصدیق شدہ سویپ اور ڈسپلیسمنٹ سوئنگز پر رکھا'],
  ['Marked higher-timeframe (4H/Daily) dealing range before 15m/5m', '15m/5m سے پہلے ہائر ٹائم فریم (4H/ڈیلی) ڈیلنگ رینج نشان زد کی'],
  ['Divided range cleanly at 50% Equilibrium (Discount vs. Premium)', 'رینج کو 50% توازن (ڈسکاؤنٹ بمقابلہ پریمیم) پر تقسیم کیا'],
  ['Checked 25% and 75% quadrant alignment with nearby PD arrays', 'قریبی PD Arrays کے ساتھ 25% اور 75% حصوں کی مطابقت جانچی'],
  ['Verified price has not closed outside and invalidated the anchors', 'تصدیق کی کہ قیمت باہر بند ہو کر پرانی رینج کو باطل نہیں کر چکی'],
  ['Logged target opposing extreme (BSL or SSL) prior to replay', 'ری پلے سے پہلے مخالف ہدف (BSL یا SSL) درج کیا'],
  // Quizzes & sources
  ['Which two anchors properly define an active Dealing Range?', 'کون سے دو اینکرز فعال ڈیلنگ رینج کی درست تعریف کرتے ہیں؟'],
  ['Anchoring Premium and Discount objectively.', 'پریمیم اور ڈسکاؤنٹ کو غیر جانبدار مقرر کرنا۔'],
  ['A completed sweep/swing origin and the opposing swing extreme created by displacement.', 'مکمل سویپ/سوئنگ کی ابتدا اور ڈسپلیسمنٹ سے بننے والی مخالف سوئنگ انتہا۔'],
  ['Any two random 1-minute candle wicks.', 'کوئی بھی دو بے ترتیب 1 منٹ کینڈل وکس۔'],
  ['The highest and lowest price of the past 10 years.', 'گزشتہ 10 سالوں کی بلند ترین اور کم ترین قیمت۔'],
  ['A dealing range spans from the sweep origin to the opposing displacement extreme.', 'ڈیلنگ رینج سویپ کی ابتدا سے مخالف ڈسپلیسمنٹ انتہا تک پھیلی ہوتی ہے۔'],
  ['What does the 50% Equilibrium line separate?', '50% توازن کی لکیر کن دو حصوں کو الگ کرتی ہے؟'],
  ['Dividing a Dealing Range cleanly.', 'ڈیلنگ رینج کو صاف تقسیم کرنا۔'],
  ['Discount (below 50%) from Premium (above 50%).', 'ڈسکاؤنٹ (50% سے نیچے) کو پریمیم (50% سے اوپر) سے۔'],
  ['London session from Asian session.', 'لندن سیشن کو ایشیائی سیشن سے۔'],
  ['Bullish trends from bearish trends.', 'صعودی ٹرینڈز کو نزولی ٹرینڈز سے۔'],
  ['Prices below 50% are in Discount; prices above 50% are in Premium.', '50% سے نیچے قیمتیں ڈسکاؤنٹ اور 50% سے اوپر پریمیم میں ہوتی ہیں۔'],
  ['When should you re-anchor your Dealing Range?', 'آپ کو اپنی ڈیلنگ رینج کب دوبارہ مقرر کرنی چاہیے؟'],
  ['Avoiding stale range references.', 'پرانے رینج حوالوں سے بچنا۔'],
  ['When candle bodies close decisively beyond the current Range High or Range Low.', 'جب کینڈل باڈیز موجودہ رینج ہائی یا رینج لو سے باہر فیصلہ کن کلوز دیں۔'],
  ['Every 5 minutes regardless of price.', 'قیمت سے قطع نظر ہر 5 منٹ بعد۔'],
  ['Never; keep the same anchors forever.', 'کبھی نہیں؛ ہمیشہ وہی پرانے اینکرز رکھیں۔'],
  ['Decisive closes beyond the boundary shift the active dealing range.', 'حد سے باہر فیصلہ کن کلوز فعال ڈیلنگ رینج کو تبدیل کر دیتا ہے۔'],
  ['ICT Core Month 6 — Dealing Ranges & PD Array Matrix', 'ICT کور ماہ 6 — ڈیلنگ رینجز اور PD Array میٹرکس'],
  ['Consulted for anchoring dealing ranges and separating Premium from Discount at 50% Equilibrium.', 'ڈیلنگ رینجز مقرر کرنے اور 50% توازن پر پریمیم کو ڈسکاؤنٹ سے الگ کرنے کے لیے مشاورت کی گئی۔'],
  ['All synthetic dealing-range cubes, quadrant calculators, and NQ/EURUSD blueprints are educational chart-reference studies, not live quotes or trade recommendations.', 'اس باب میں تمام مصنوعی ڈیلنگ رینج کیوبز، کواڈرنٹ کیلکولیٹرز اور NQ/EURUSD بلیو پرنٹس تعلیمی چارٹ حوالہ جاتی مطالعات ہیں، لائیو قیمتیں یا تجارتی سفارشات نہیں۔'],
];

for (const item of enDoc.takeaways) {
  const idx = enDoc.takeaways.indexOf(item);
  if (urDoc.takeaways[idx]) pairs.push([item, urDoc.takeaways[idx]]);
}
(enDoc.sections as DealingRangeSection[]).forEach((sec, si) => {
  const urSec = (urDoc.sections as DealingRangeSection[])[si];
  if (!urSec) return;
  pairs.push([sec.title, urSec.title]);
  sec.blocks.forEach((blk, bi) => {
    const urBlk = urSec.blocks[bi];
    if (!urBlk) return;
    if (blk.text && urBlk.text) pairs.push([blk.text, urBlk.text]);
    blk.rows?.forEach((row, ri) =>
      row.forEach((cell, ci) => {
        if (urBlk.rows?.[ri]?.[ci]) pairs.push([cell, urBlk.rows[ri][ci]]);
      }),
    );
  });
});
enDoc.faqs.forEach((faq, fi) => {
  if (urDoc.faqs[fi]) {
    pairs.push([faq.question, urDoc.faqs[fi].question]);
    pairs.push([faq.answer, urDoc.faqs[fi].answer]);
  }
});

export const dealingRangeTranslations: Record<string, string> = Object.fromEntries(pairs);
