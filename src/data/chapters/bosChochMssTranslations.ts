import enDoc from './bosChochMssDocument.json';
import urDoc from './bosChochMssDocumentUrdu.json';
import { bosChochMssDates, bosChochMssQuizzes, bosChochMssSources, type BosChochMssSection } from './bosChochMssLesson';

const pairs: Array<[string, string]> = [
  [enDoc.h1, urDoc.h1],
  [enDoc.seoTitle, urDoc.seoTitle],
  [enDoc.metaDescription, urDoc.metaDescription],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [bosChochMssDates.published.label, '28 نومبر 2026'],
  [bosChochMssDates.updated.label, '28 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['Break Classification Rule', 'بریک درجہ بندی اصول'],
  ['BOS = With-Trend Continuation · CHoCH = First Counter-Trend Warning · MSS = Sweep + Displacement Shift', 'BOS = ٹرینڈ کے ساتھ تسلسل · CHoCH = ٹرینڈ کے خلاف پہلا انتباہ · MSS = سویپ + ڈسپلیسمنٹ شفٹ'],
  ['Chapter Contents', 'باب کے مندرجات'],
  ['On this page', 'اس صفحے پر'],
  ['Continue Studying', 'مزید مطالعہ جاری رکھیں'],
  ['Study Break of Structure (BOS)', 'بریک آف اسٹرکچر (BOS) کا مطالعہ کریں'],
  ['Study Change of Character (CHoCH)', 'چینج آف کریکٹر (CHoCH) کا مطالعہ کریں'],
  ['Study Market Structure Shift (MSS)', 'مارکیٹ اسٹرکچر شفٹ (MSS) کا مطالعہ کریں'],
  ['Study Dealing Ranges', 'ڈیلنگ رینجز کا مطالعہ کریں'],
  ['Practice in the Guided Chart Lab', 'گائیڈڈ چارٹ لیب میں مشق کریں'],
  ['Synthetic illustration — not live quotes.', 'مصنوعی تعلیمی خاکہ — لائیو قیمتیں نہیں۔'],
  // Visual strings
  ['Stick-Figure Story: Three Breaks, Three Meanings', 'اسٹک فگر کہانی: تین بریکس، تین مفہوم'],
  ['Concept Comic', 'تصوراتی کامک'],
  ['1. BOS (Continuation)', '1. BOS (تسلسل)'],
  ['2. CHoCH (First Warning)', '2. CHoCH (پہلا انتباہ)'],
  ['3. MSS (Shift + Context)', '3. MSS (شفٹ + سیاق)'],
  ['Breaks with the existing trend to confirm ongoing momentum.', 'جاری رفتار کی تصدیق کے لیے موجودہ ٹرینڈ کے ساتھ ٹوٹتا ہے۔'],
  ['First counter-trend break signaling caution on the current leg.', 'پہلا مخالف بریک جو موجودہ حرکت پر احتیاط کی علامت ہے۔'],
  ['Counter-trend break paired with prior sweep and displacement.', 'مخالف بریک جو پچھلے سویپ اور تیز ڈسپلیسمنٹ کے ساتھ ہو۔'],
  ['Side-by-Side Geometry: BOS vs. CHoCH vs. MSS', 'ساتھ رکھ کر جیومیٹری: BOS بمقابلہ CHoCH بمقابلہ MSS'],
  ['3D Structural Break Comparator', '3D اسٹرکچرل بریک کمپیریٹر'],
  ['BOS Continuation', 'BOS تسلسل'],
  ['CHoCH Early Warning', 'CHoCH ابتدائی انتباہ'],
  ['MSS Sweep + Displacement', 'MSS سویپ + ڈسپلیسمنٹ'],
  ['Comparator Orbit', 'کمپیریٹر آربٹ'],
  ['Side Profile', 'سائیڈ پروفائل'],
  ['Play', 'چلائیں'],
  ['Pause', 'روکیں'],
  ['Reset', 'ری سیٹ'],
  ['Price breaks above the prior swing high in the direction of the trend.', 'قیمت ٹرینڈ کی سمت میں پچھلے سوئنگ ہائی سے اوپر ٹوٹتی ہے۔'],
  ['Price closes below the most recent internal Higher Low—flashing an early warning.', 'قیمت حالیہ اندرونی ہائر لو کے نیچے بند ہو کر ابتدائی انتباہ دیتی ہے۔'],
  ['Price sweeps BSL, then displaces sharply below the opposing swing low.', 'قیمت BSL سویپ کر کے مخالف سوئنگ لو کے نیچے تیزی سے ڈسپلیس ہوتی ہے۔'],
  ['Animated Sequence: BOS → CHoCH → MSS', 'اینیمیٹڈ سلسلہ: BOS ← CHoCH ← MSS'],
  ['Auto-Play', 'آٹو پلے'],
  ['Next Step', 'اگلا مرحلہ'],
  ['Interactive Break Classifier (BOS vs. CHoCH vs. MSS)', 'انٹرایکٹو بریک کلاسیفائر (BOS بمقابلہ CHoCH بمقابلہ MSS)'],
  ['Break Direction', 'بریک کی سمت'],
  ['Prior Liquidity Sweep?', 'پچھلا لیکویڈیٹی سویپ؟'],
  ['Displacement?', 'ڈسپلیسمنٹ؟'],
  ['Candle Close Beyond?', 'باہر کینڈل کلوز؟'],
  ['With-Trend', 'ٹرینڈ کے ساتھ'],
  ['Counter-Trend', 'ٹرینڈ کے خلاف'],
  ['Yes', 'جی ہاں'],
  ['No', 'نہیں'],
  ['Break of Structure (BOS)', 'بریک آف اسٹرکچر (BOS)'],
  ['Change of Character (CHoCH)', 'چینج آف کریکٹر (CHoCH)'],
  ['Market Structure Shift (MSS)', 'مارکیٹ اسٹرکچر شفٹ (MSS)'],
  ['Unconfirmed Wick Test', 'غیر تصدیق شدہ وک ٹیسٹ'],
  ['5m CHoCH Inside 4H BOS Alignment', '4H BOS کے اندر 5m CHoCH کی ہم آہنگی'],
  ['Worked Blueprints: NQ BOS vs. NY AM MSS', 'عملی بلیو پرنٹس: NQ BOS بمقابلہ NY AM MSS'],
  ['NQ Bullish BOS', 'NQ صعودی BOS'],
  ['NY AM Bearish MSS', 'NY AM نزولی MSS'],
  ['Common Mistakes Labeling Breaks', 'بریکس کی درجہ بندی میں عام غلطیاں'],
  ['Mistake 1: Swapping Acronyms', 'غلطی 1: اصطلاحات گڈمڈ کرنا'],
  ['Mistake 2: Wick-Only BOS', 'غلطی 2: صرف وک کو BOS ماننا'],
  ['Mistake 3: Scale Blindness', 'غلطی 3: ٹائم فریم بھول جانا'],
  ['Keep BOS strictly with-trend and CHoCH/MSS strictly counter-trend.', 'BOS کو ٹرینڈ کے ساتھ اور CHoCH/MSS کو ٹرینڈ کے خلاف رکھیں۔'],
  ['A wick poke without a close does not pass strict close-based rules.', 'بغیر کلوز کے محض وک سخت کلوز اصول پر پورا نہیں اترتی۔'],
  ['Always note whether the break belongs to 5m, 1H, or 4H structure.', 'ہمیشہ لکھیں کہ بریک 5m، 1H یا 4H اسٹرکچر کا حصہ ہے۔'],
  ['Pre-Replay Break Classification 6-Gate Checklist', 'ری پلے سے پہلے بریک درجہ بندی 6-گیٹ چیک لسٹ'],
  ['Confirm all 6 gates before labeling any BOS, CHoCH, or MSS.', 'کسی بھی BOS، CHoCH یا MSS کا لیبل لگانے سے پہلے تمام 6 شرائط کی تصدیق کریں۔'],
  ['Identified active trend direction prior to the break candle', 'بریک کینڈل سے پہلے فعال ٹرینڈ کی سمت کی شناخت کی'],
  ['Labeled whether the break is with-trend (BOS) or counter-trend', 'نشان زد کیا کہ بریک ٹرینڈ کے ساتھ (BOS) ہے یا خلاف'],
  ['Verified candle-body close beyond the pre-marked swing', 'پہلے سے طے شدہ سوئنگ سے باہر کینڈل باڈی کلوز کی تصدیق کی'],
  ['Checked prior BSL/SSL sweep and displacement for MSS calls', 'MSS کے لیے پچھلے BSL/SSL سویپ اور ڈسپلیسمنٹ کو جانچا'],
  ['Noted timeframe scale (5m vs. 1H vs. 4H) beside the label', 'لیبل کے ساتھ ٹائم فریم کا پیمانہ (5m بمقابلہ 1H بمقابلہ 4H) لکھا'],
  ['Recorded follow-through or reclaim failure without hindsight', 'بغیر تعصب فالو تھرو یا واپسی کی ناکامی درج کی'],
];

for (const item of enDoc.takeaways) {
  const idx = enDoc.takeaways.indexOf(item);
  if (urDoc.takeaways[idx]) pairs.push([item, urDoc.takeaways[idx]]);
}
(enDoc.sections as BosChochMssSection[]).forEach((sec, si) => {
  const urSec = (urDoc.sections as BosChochMssSection[])[si];
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
// Translate quizzes & sources cleanly
pairs.push(
  ['Which structural break confirms continuation in the direction of the existing trend?', 'کون سا ساختی بریک موجودہ ٹرینڈ کی سمت میں تسلسل کی تصدیق کرتا ہے؟'],
  ['Separating continuation from reversal labels.', 'تسلسل اور الٹاؤ کے لیبلز کو الگ رکھنا۔'],
  ['Break of Structure (BOS).', 'بریک آف اسٹرکچر (BOS)۔'],
  ['Change of Character (CHoCH).', 'چینج آف کریکٹر (CHoCH)۔'],
  ['Market Structure Shift (MSS).', 'مارکیٹ اسٹرکچر شفٹ (MSS)۔'],
  ['BOS breaks with the active trend sequence, whereas CHoCH and MSS break counter-trend.', 'BOS فعال ٹرینڈ کے ساتھ ٹوٹتا ہے، جبکہ CHoCH اور MSS ٹرینڈ کے خلاف ٹوٹتے ہیں۔'],
  ['What typically distinguishes an MSS from an early CHoCH warning?', 'عموماً MSS کو ابتدائی CHoCH انتباہ سے کیا چیز الگ کرتی ہے؟'],
  ['Comparing counter-trend break conditions.', 'ٹرینڈ کے خلاف بریک کی شرائط کا موازنہ۔'],
  ['MSS commonly follows a prior liquidity sweep and shows energetic displacement.', 'MSS عموماً پچھلے لیکویڈیٹی سویپ کے بعد آتا ہے اور تیز ڈسپلیسمنٹ دکھاتا ہے۔'],
  ['MSS only appears on weekly charts.', 'MSS صرف ہفتہ وار چارٹس پر ظاہر ہوتا ہے۔'],
  ['CHoCH always ignores candle closes.', 'CHoCH ہمیشہ کینڈل کلوز کو نظر انداز کرتا ہے۔'],
  ['MSS pairs a counter-trend break with liquidity-sweep and displacement filters.', 'MSS ٹرینڈ کے خلاف بریک کو لیکویڈیٹی سویپ اور ڈسپلیسمنٹ فلٹرز کے ساتھ جوڑتا ہے۔'],
  ['How should you interpret a 5-minute CHoCH inside a bullish 4-hour BOS sequence?', 'صعودی 4 گھنٹے کے BOS سلسلے کے اندر 5 منٹ کے CHoCH کی تشریح کیسے کرنی چاہیے؟'],
  ['Keeping timeframe scale clear.', 'ٹائم فریم پیمانے کو واضح رکھنا۔'],
  ['As a local warning that may simply initiate a 4-hour pullback.', 'ایک مقامی انتباہ کے طور پر جو محض 4 گھنٹے کے پل بیک کا آغاز ہو سکتا ہے۔'],
  ['As proof that the 4-hour uptrend has permanently ended.', 'اس ثبوت کے طور پر کہ 4 گھنٹے کا اپ ٹرینڈ مستقل ختم ہو گیا ہے۔'],
  ['As an invalid 5-minute candle.', 'ایک غلط 5 منٹ کی کینڈل کے طور پر۔'],
  ['Lower-timeframe shifts often occur as pullbacks within intact higher-timeframe trends.', 'چھوٹے ٹائم فریم کے شفٹ اکثر برقرار ہائر ٹائم فریم ٹرینڈز کے اندر پل بیک کے طور پر آتے ہیں۔'],
  ['ICT 2022 Mentorship — Episode 3 & Episode 6', 'ICT 2022 مینٹورشپ — قسط 3 اور قسط 6'],
  ['Consulted for distinguishing continuation breaks from intraday and displacement-backed structure shifts.', 'تسلسل کے بریکس کو انٹرا ڈے اور ڈسپلیسمنٹ والے اسٹرکچر شفٹس سے الگ کرنے کے لیے مشاورت کی گئی۔'],
  ['All synthetic BOS/CHoCH/MSS comparators and NQ/NY blueprints are educational chart-reference studies, not live quotes or trade recommendations.', 'اس باب میں تمام مصنوعی BOS/CHoCH/MSS کمپیریٹرز اور NQ/NY بلیو پرنٹس تعلیمی چارٹ حوالہ جاتی مطالعات ہیں، لائیو قیمتیں یا تجارتی سفارشات نہیں۔'],
);

export const bosChochMssTranslations: Record<string, string> = Object.fromEntries(pairs);
