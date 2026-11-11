import translations from './fvgDocumentUrdu.json';
import {fvgNextReads} from './fvgDocument';
export const fvgDocumentTranslations:Record<string,string>={...translations};
for(const [en,ur] of fvgNextReads)fvgDocumentTranslations[en]=ur;
Object.assign(fvgDocumentTranslations,{
 'Key Takeaways':'اہم نکات','Next reads':'اگلا مطالعہ',
 'Fair Value Gap (FVG): Formation, CE and Examples | LearnSMC':'فیئر ویلیو گیپس (FVG): تشکیل، CE اور مثالیں | LearnSMC',
 'Learn what a fair value gap is, how FVGs form, how to use CE and inversion, plus bullish and bearish examples, rules and mistakes.':'فیئر ویلیو گیپ کی تعریف، FVG کی تشکیل، CE اور اِنورژن سمجھیں؛ بلش و بیئرش مثالیں، اصول اور عام غلطیاں بھی دیکھیں۔',
 'The numerical examples in this chapter are illustrative teaching data, not historical trades. Existing ICT references below document selected source passages; they do not verify the chapter’s invented prices or establish expected results.':'اس باب کی عددی مثالیں فرضی تدریسی اعداد ہیں، تاریخی ٹریڈز نہیں۔ نیچے ICT کے حوالے منتخب ماخذی حصوں کا تناظر بتاتے ہیں؛ ان سے فرضی قیمتوں یا متوقع نتائج کی تصدیق نہیں ہوتی۔'
});
