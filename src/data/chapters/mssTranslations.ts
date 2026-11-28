import enDoc from './mssDocument.json';
import urDoc from './mssDocumentUrdu.json';
import { mssDates, mssSources, type MssSection } from './mssLesson';

const pairs: Array<[string, string]> = [
  [enDoc.h1, urDoc.h1],
  [enDoc.seoTitle, urDoc.seoTitle],
  [enDoc.metaDescription, urDoc.metaDescription],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [mssDates.published.label, '15 اکتوبر 2026'],
  [mssDates.updated.label, '28 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['MSS Verification Rule', 'MSS تصدیق اصول'],
  ['Pre-Marked Swing + Displacement + Explicit Close Rule + Timeframe Scale', 'پہلے سے طے شدہ سوئنگ + ڈسپلیسمنٹ + واضح کلوز اصول + ٹائم فریم پیمانہ'],
  ['Chapter Contents', 'باب کے مندرجات'],
  ['On this page', 'اس صفحے پر'],
  ['Continue Studying', 'مزید مطالعہ جاری رکھیں'],
  ['Study Break of Structure (BOS)', 'بریک آف اسٹرکچر (BOS) کا مطالعہ کریں'],
  ['Study Change of Character (CHoCH)', 'چینج آف کریکٹر (CHoCH) کا مطالعہ کریں'],
  ['Study BOS vs. CHoCH vs. MSS', 'BOS بمقابلہ CHoCH بمقابلہ MSS کا مطالعہ کریں'],
  ['Study Fair Value Gaps (FVG)', 'فیئر ویلیو گیپس (FVG) کا مطالعہ کریں'],
  ['Practice in the Guided Chart Lab', 'گائیڈڈ چارٹ لیب میں مشق کریں'],
  ['Synthetic illustration — not live quotes.', 'مصنوعی تعلیمی خاکہ — لائیو قیمتیں نہیں۔'],
  // Visual strings
  ['Stick-Figure Story: Sweep + MSS vs. Hesitant Drift', 'اسٹک فگر کہانی: سویپ + MSS بمقابلہ سست حرکت'],
  ['Concept Comic', 'تصوراتی کامک'],
  ['1. Prior Liquidity Sweep', '1. پچھلا لیکویڈیٹی سویپ'],
  ['2. Displacement Break', '2. ڈسپلیسمنٹ بریک'],
  ['3. FVG Retest Option', '3. FVG ری ٹیسٹ متبادل'],
  ['Price raids SSL/BSL before reversing through the opposing swing.', 'قیمت مخالف سوئنگ کے آر پار پلٹنے سے پہلے SSL/BSL سویپ کرتی ہے۔'],
  ['Measure displacement relative to recent candles, never by guesswork.', 'ڈسپلیسمنٹ کو حالیہ کینڈلز کے مقابلے میں ناپیں، اندازے سے نہیں۔'],
  ['Edge vs. midpoint FVG entries carry different fill and stop tradeoffs.', 'کنارے اور درمیانی نقطے کی FVG انٹریز کے مختلف فل اور اسٹاپ اثرات ہوتے ہیں۔'],
  ['Identifiable Swing + Close Convention Map', 'قابلِ شناخت سوئنگ اور کلوز اصول نقشہ'],
  ['3D Sweep-to-MSS Displacement Engine', '3D سویپ ٹو MSS ڈسپلیسمنٹ انجن'],
  ['Bullish Sweep + MSS + FVG', 'صعودی سویپ + MSS + FVG'],
  ['Bearish Sweep + MSS', 'نزولی سویپ + MSS'],
  ['Intraday Pullback Only', 'صرف انٹرا ڈے پل بیک'],
  ['Engine Orbit', 'انجن آربٹ'],
  ['Side Profile', 'سائیڈ پروفائل'],
  ['Play', 'چلائیں'],
  ['Pause', 'روکیں'],
  ['Reset', 'ری سیٹ'],
  ['Price sweeps SSL, displaces through the prior swing high, and leaves an FVG.', 'قیمت SSL سویپ کرتی ہے، پچھلے سوئنگ ہائی سے اوپر ڈسپلیس ہوتی ہے اور FVG بناتی ہے۔'],
  ['Price sweeps BSL, displaces lower through the prior swing low, and expands.', 'قیمت BSL سویپ کرتی ہے، پچھلے سوئنگ لو سے نیچے ڈسپلیس ہو کر بڑھتی ہے۔'],
  ['A 5m MSS can occur as a brief pullback inside an intact 4H trend.', '5m کا MSS برقرار 4H ٹرینڈ کے اندر ایک مختصر پل بیک بھی ہو سکتا ہے۔'],
  ['Mechanical MSS Execution Variants (Edge vs. Midpoint)', 'میکینیکل MSS عملی متبادلات (کنارہ بمقابلہ درمیانی نقطہ)'],
  ['Animated Sequence: Sweep → MSS → FVG Return', 'اینیمیٹڈ سلسلہ: سویپ ← MSS ← FVG واپسی'],
  ['Auto-Play', 'آٹو پلے'],
  ['Next Step', 'اگلا مرحلہ'],
  ['Interactive MSS Rule & Displacement Calculator', 'انٹرایکٹو MSS اصول اور ڈسپلیسمنٹ کیلکولیٹر'],
  ['Prior Sweep?', 'پچھلا سویپ؟'],
  ['Displacement Multiple', 'ڈسپلیسمنٹ گنا'],
  ['Close Beyond Swing?', 'سوئنگ سے باہر کلوز؟'],
  ['Clean FVG?', 'صاف FVG؟'],
  ['Yes', 'جی ہاں'],
  ['No', 'نہیں'],
  ['Verified Mechanical MSS', 'تصدیق شدہ میکینیکل MSS'],
  ['Unconfirmed / Hesitant Break', 'غیر تصدیق شدہ / سست بریک'],
  ['Wick-Only Excursion', 'صرف وک کا اخراج'],
  ['Intraday Leg vs. Higher-Timeframe Trend', 'انٹرا ڈے لیگ بمقابلہ ہائر ٹائم فریم ٹرینڈ'],
  ['Episode 6 Close Preference vs. Episode 3 Crossing', 'ایپیسوڈ 6 کلوز ترجیح بمقابلہ ایپیسوڈ 3 کراسنگ'],
  ['Pre-Replay MSS 6-Gate Checklist', 'ری پلے سے پہلے MSS 6-گیٹ چیک لسٹ'],
  ['Verify all six gates before logging an MSS study.', 'MSS مطالعہ درج کرنے سے پہلے تمام چھ شرائط کی تصدیق کریں۔'],
  ['Selected liquidity reference & target swing before price arrived', 'قیمت آنے سے پہلے لیکویڈیٹی حوالہ اور ہدف سوئنگ منتخب کیا'],
  ['Confirmed 3-candle swing completion (right-hand bar closed)', '3-کینڈل سوئنگ مکمل ہونے (دائیں کینڈل کلوز) کی تصدیق کی'],
  ['Measured displacement relative to recent candles objectively', 'حالیہ کینڈلز کے مقابلے میں ڈسپلیسمنٹ کو غیر جانبدار ناپا'],
  ['Stated exact close rule (preferable close vs. initial crossing)', 'درست کلوز اصول (ترجیحی کلوز بمقابلہ ابتدائی کراسنگ) بیان کیا'],
  ['Recorded FVG fill variant (edge vs. midpoint) and costs', 'FVG فل کی قسم (کنارہ بمقابلہ وسط) اور لاگت درج کی'],
  ['Separated intraday leg from multi-day HTF trend forecast', 'انٹرا ڈے لیگ کو کئی دن کی HTF پیش گوئی سے الگ رکھا'],
];

for (const item of enDoc.takeaways) {
  const idx = enDoc.takeaways.indexOf(item);
  if (urDoc.takeaways[idx]) pairs.push([item, urDoc.takeaways[idx]]);
}
(enDoc.sections as MssSection[]).forEach((sec, si) => {
  const urSec = (urDoc.sections as MssSection[])[si];
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
pairs.push(
  ['ICT 2022 Mentorship — Episode 3 (Intraday MSS vs. Longer-Duration Break)', 'ICT 2022 مینٹورشپ — قسط 3 (انٹرا ڈے MSS بمقابلہ طویل مدتی بریک)'],
  ['ICT 2022 Mentorship — Episode 6 (Displacement & Close Preference)', 'ICT 2022 مینٹورشپ — قسط 6 (ڈسپلیسمنٹ اور کلوز ترجیح)'],
  ['Consulted for intraday MSS context and separating initial crossing from FVG completion.', 'انٹرا ڈے MSS سیاق اور ابتدائی کراسنگ کو FVG کی تکمیل سے الگ کرنے کے لیے مشاورت کی گئی۔'],
  ['Consulted for energetic displacement and close-preference conventions.', 'تیز ڈسپلیسمنٹ اور کلوز ترجیح کے اصولوں کے لیے مشاورت کی گئی۔'],
);

export const mssTranslations: Record<string, string> = Object.fromEntries(pairs);
