import enDoc from './trendRangeDocument.json';
import urDoc from './trendRangeDocumentUrdu.json';
import { trendRangeDates, type TrendRangeSection } from './trendRangeLesson';

const pairs: Array<[string, string]> = [
  [enDoc.h1, urDoc.h1],
  [enDoc.seoTitle, urDoc.seoTitle],
  [enDoc.metaDescription, urDoc.metaDescription],
  [enDoc.quickAnswer, urDoc.quickAnswer],
  [trendRangeDates.published.label, '28 نومبر 2026'],
  [trendRangeDates.updated.label, '28 نومبر 2026'],
  ['Key Takeaways', 'اہم نکات'],
  ['Market-Phase Identification Rule', 'مارکیٹ فیز شناخت اصول'],
  ['Bullish = HH + HL · Bearish = LH + LL · Range = Contained Highs & Lows', 'صعودی = HH + HL · نزولی = LH + LL · رینج = محدود ہائیز اور لوز'],
  ['Chapter Contents', 'باب کے مندرجات'],
  ['On this page', 'اس صفحے پر'],
  ['Continue Studying', 'مزید مطالعہ جاری رکھیں'],
  ['Study What Is a Swing', 'سوئنگ کیا ہے کا مطالعہ کریں'],
  ['Study Internal vs. External Structure', 'اندرونی بمقابلہ بیرونی اسٹرکچر کا مطالعہ کریں'],
  ['Study Break of Structure (BOS)', 'بریک آف اسٹرکچر (BOS) کا مطالعہ کریں'],
  ['Study Dealing Ranges', 'ڈیلنگ رینجز کا مطالعہ کریں'],
  ['Practice in the Guided Chart Lab', 'گائیڈڈ چارٹ لیب میں مشق کریں'],
  ['Synthetic illustration — not live quotes.', 'مصنوعی تعلیمی خاکہ — لائیو قیمتیں نہیں۔'],
  // Visual strings
  ['Stick-Figure Story: Matching Playbook to Phase', 'اسٹک فگر کہانی: مرحلے کے مطابق طریقہ'],
  ['Concept Comic', 'تصوراتی کامک'],
  ['1. Trend Staircase', '1. ٹرینڈ کی سیڑھی'],
  ['2. Sideways Box', '2. سائیڈ ویز باکس'],
  ['3. Boundary Break', '3. حد کا بریک'],
  ['HH and HL pullbacks reward continuation studies.', 'HH اور HL پل بیکس تسلسل کے مطالعے میں مدد دیتے ہیں۔'],
  ['Contained highs and lows reward boundary sweep studies.', 'محدود ہائیز اور لوز باؤنڈری سویپ کے مطالعے میں مدد دیتے ہیں۔'],
  ['A decisive close beyond the box marks a transition.', 'باکس سے باہر فیصلہ کن کلوز تبدیلی کی علامت ہے۔'],
  ['Three Core Structural States', 'تین بنیادی ساختی حالتیں'],
  ['3D Market-Phase State Machine', '3D مارکیٹ فیز اسٹیٹ مشین'],
  ['Bullish Trend Staircase', 'صعودی ٹرینڈ سیڑھی'],
  ['Consolidation Box', 'کنسولیڈیشن باکس'],
  ['Transition Break', 'تبدیلی بریک'],
  ['State Orbit', 'اسٹیٹ آربٹ'],
  ['Side Profile', 'سائیڈ پروفائل'],
  ['Play', 'چلائیں'],
  ['Pause', 'روکیں'],
  ['Reset', 'ری سیٹ'],
  ['Higher highs and higher lows step upward cleanly along the trend channel.', 'ہائر ہائیز اور ہائر لوز ٹرینڈ چینل کے ساتھ صاف اوپر بڑھتے ہیں۔'],
  ['Price rotates horizontally between fixed resistance and support shelves.', 'قیمت مقررہ مزاحمت اور سپورٹ شیلفز کے درمیان افقی گھومتی ہے۔'],
  ['Price compresses inside a box, breaks above the ceiling, and retests it.', 'قیمت باکس میں سکڑتی ہے، چھت توڑتی ہے اور ری ٹیسٹ کرتی ہے۔'],
  ['Animated Sequence: Range → Transition → New Trend', 'اینیمیٹڈ سلسلہ: رینج ← تبدیلی ← نیا ٹرینڈ'],
  ['Auto-Play', 'آٹو پلے'],
  ['Next Step', 'اگلا مرحلہ'],
  ['Interactive Market-Phase Classifier', 'انٹرایکٹو مارکیٹ فیز کلاسیفائر'],
  ['Swing Highs', 'سوئنگ ہائیز'],
  ['Swing Lows', 'سوئنگ لوز'],
  ['Boundary Close?', 'باؤنڈری کلوز؟'],
  ['Rising', 'بڑھتے ہوئے'],
  ['Flat', 'ہموار'],
  ['Falling', 'گرتے ہوئے'],
  ['Yes — Closed Beyond', 'جی ہاں — باہر کلوز ہوا'],
  ['No — Inside Range', 'نہیں — رینج کے اندر'],
  ['Bullish Trend', 'صعودی ٹرینڈ'],
  ['Bearish Trend', 'نزولی ٹرینڈ'],
  ['Consolidation Range', 'کنسولیڈیشن رینج'],
  ['Transition Phase', 'تبدیلی کا مرحلہ'],
  ['Retracement vs. Transition Comparison', 'پل بیک بمقابلہ تبدیلی موازنہ'],
  ['Worked Blueprints: NQ Trend vs. Asia Range', 'عملی بلیو پرنٹس: NQ ٹرینڈ بمقابلہ ایشیا رینج'],
  ['NQ Trend', 'NQ ٹرینڈ'],
  ['Asia Range', 'ایشیا رینج'],
  ['Common Mistakes Reading Market Phases', 'مارکیٹ کے مراحل پڑھنے میں عام غلطیاں'],
  ['Mistake 1: Mid-Range Chasing', 'غلطی 1: رینج کے درمیان پیچھا کرنا'],
  ['Mistake 2: Early Reversal Call', 'غلطی 2: قبل از وقت الٹاؤ'],
  ['Mistake 3: Single-Timeframe Tunnel', 'غلطی 3: صرف ایک ٹائم فریم دیکھنا'],
  ['Entering trend setups inside the middle of a tight box invites chop.', 'تنگ باکس کے درمیان ٹرینڈ سیٹ اپس لینا نقصان کا باعث بنتا ہے۔'],
  ['Wait for a candle close beyond the protected swing before calling a transition.', 'تبدیلی کہنے سے پہلے محفوظ سوئنگ سے باہر کلوز کا انتظار کریں۔'],
  ['Always check whether the 4H chart is trending or ranging first.', 'پہلے ہمیشہ دیکھیں کہ 4H چارٹ ٹرینڈ میں ہے یا رینج میں۔'],
  ['Pre-Replay Phase Classification 6-Gate Checklist', 'ری پلے سے پہلے فیز درجہ بندی 6-گیٹ چیک لسٹ'],
  ['Confirm all 6 structural phase gates before selecting a setup.', 'کوئی سیٹ اپ منتخب کرنے سے پہلے تمام 6 ساختی شرائط کی تصدیق کریں۔'],
  ['Identified higher-timeframe phase (4H/Daily) before zooming in', 'چھوٹے ٹائم فریم پر جانے سے پہلے 4H/ڈیلی مرحلے کی شناخت کی'],
  ['Verified 3-candle swing highs and lows objectively', '3-کینڈل سوئنگ ہائیز اور لوز کی غیر جانبدار تصدیق کی'],
  ['Checked whether price is inside a range or expanding cleanly', 'جانچا کہ قیمت رینج کے اندر ہے یا صاف توسیع کر رہی ہے'],
  ['Confirmed close beyond boundary for any labeled transition', 'کسی بھی تبدیلی کے لیے حد سے باہر کلوز کی تصدیق کی'],
  ['Matched playbook (continuation vs. boundary sweep) to active phase', 'فعال مرحلے کے مطابق طریقہ کار (تسلسل بمقابلہ سویپ) منتخب کیا'],
  ['Logged protected external swing invalidation prior to replay', 'ری پلے سے پہلے محفوظ بیرونی سوئنگ باطل حد درج کی'],
  // Quizzes & sources
  ['Which swing sequence defines a bullish trend?', 'کون سا سوئنگ سلسلہ صعودی ٹرینڈ کی تعریف کرتا ہے؟'],
  ['Classifying market phases objectively.', 'مارکیٹ کے مراحل کی غیر جانبدار درجہ بندی۔'],
  ['Higher Highs (HH) and Higher Lows (HL).', 'ہائر ہائیز (HH) اور ہائر لوز (HL)۔'],
  ['Lower Highs (LH) and Lower Lows (LL).', 'لوئر ہائیز (LH) اور لوئر لوز (LL)۔'],
  ['Equal Highs (EQH) and Equal Lows (EQL).', 'برابر ہائیز (EQH) اور برابر لوز (EQL)۔'],
  ['Rising peaks and rising troughs define an intact bullish trend.', 'بڑھتی ہوئی چوٹیاں اور بڑھتے ہوئے نچلے نقاط برقرار صعودی ٹرینڈ بناتے ہیں۔'],
  ['Why do trend-continuation setups often fail inside a tight consolidation range?', 'تنگ کنسولیڈیشن رینج میں ٹرینڈ تسلسل کے سیٹ اپس اکثر کیوں ناکام ہوتے ہیں؟'],
  ['Matching strategy to market phase.', 'حکمت عملی کو مارکیٹ کے مرحلے سے ہم آہنگ کرنا۔'],
  ['Price oscillates between ceiling and floor rather than expanding smoothly.', 'قیمت ہموار توسیع کے بجائے چھت اور فرش کے درمیان گھومتی ہے۔'],
  ['Consolidations have no candle wicks.', 'کنسولیڈیشن میں کینڈل وکس نہیں ہوتیں۔'],
  ['Exchanges disable limit orders in ranges.', 'ایکسچینجز رینجز میں لمٹ آرڈرز بند کر دیتی ہیں۔'],
  ['Inside a range, breakouts frequently revert back toward equilibrium.', 'رینج کے اندر بریک آؤٹس اکثر توازن کی طرف واپس آ جاتے ہیں۔'],
  ['What marks the transition from a sideways range into a potential new trend?', 'سائیڈ ویز رینج سے ممکنہ نئے ٹرینڈ میں تبدیلی کی علامت کیا ہے؟'],
  ['Identifying structural shifts cleanly.', 'ساختی تبدیلیوں کی صاف شناخت۔'],
  ['A decisive close beyond the range boundary followed by a holding retest.', 'رینج کی حد سے باہر فیصلہ کن کلوز اور اس کے بعد کامیاب ری ٹیسٹ۔'],
  ['Touching the midpoint of the range.', 'رینج کے درمیانی نقطے کو چھونا۔'],
  ['Two doji candles in a row.', 'مسلسل دو ڈوجی کینڈلز۔'],
  ['Acceptance outside the boundary separates a real transition from a range sweep.', 'حد سے باہر قبولیت حقیقی تبدیلی کو محض سویپ سے الگ کرتی ہے۔'],
  ['ICT 2022 Mentorship — Episode 3 (Market Structure States)', 'ICT 2022 مینٹورشپ — قسط 3 (مارکیٹ اسٹرکچر کی حالتیں)'],
  ['Consulted for trend, range, and structural transition context. All synthetic classifiers and diagrams are original LearnSMC study aids.', 'ٹرینڈ، رینج اور ساختی تبدیلی کے سیاق کے لیے مشاورت کی گئی۔ تمام مصنوعی کلاسیفائرز اور خاکے LearnSMC کے اصل تعلیمی ذرائع ہیں۔'],
  ['All synthetic trend/range state machines and NQ/Asia blueprints are educational chart-reference studies, not live quotes or trade recommendations.', 'اس باب میں تمام مصنوعی ٹرینڈ/رینج اسٹیٹ مشینز اور NQ/ایشیا بلیو پرنٹس تعلیمی چارٹ حوالہ جاتی مطالعات ہیں، لائیو قیمتیں یا تجارتی سفارشات نہیں۔'],
];

for (const item of enDoc.takeaways) {
  const idx = enDoc.takeaways.indexOf(item);
  if (urDoc.takeaways[idx]) pairs.push([item, urDoc.takeaways[idx]]);
}
(enDoc.sections as TrendRangeSection[]).forEach((sec, si) => {
  const urSec = (urDoc.sections as TrendRangeSection[])[si];
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

export const trendRangeTranslations: Record<string, string> = Object.fromEntries(pairs);
