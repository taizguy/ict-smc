/** Context-specific terminology corrections; never applied to user notes or numerical values. */
export function refineTradingLanguage(source: string, translation: string): string {
  let text = translation;
  if (/\bcandles?\b/i.test(source)) text = text.replace(/موم بتیوں|موم بتیاں/g, 'کینڈلز').replace(/موم بتی/g, 'کینڈل');
  if (/\bswings?\b/i.test(source)) text = text.replace(/جھولوں|جھولے/g, 'سوئنگز').replace(/جھولا/g, 'سوئنگ');
  if (/\bConsequent Encroachment\b/i.test(source)) text = text.replace(/اس کے نتیجے میں تجاوزات|اس کے نتیجے میں تجاوز|نتیجے میں تجاوزات|نتیجتاً تجاوزات/g, 'کانسیکوئنٹ اِنکروچمنٹ (CE)');
  if (/\bmitigation block\b|\bmitigated\b/i.test(source)) text = text.replace(/تخفیف/g, 'مِٹیگیشن');
  if (/\bunicorn\b/i.test(source)) text = text.replace(/ایک تنگاوالا|ایک تنگا والا/g, 'یونیکورن');
  return text;
}
