import { useTranslation } from '../i18n/TranslationProvider';

export type AccentTone = 'sage' | 'coral' | 'violet';

/** Translate a sentence as a whole, then emphasize a phrase without changing its word order. */
export function AccentText({ text, focus, urduFocus, tone = 'sage' }: { text: string; focus: string; urduFocus?: string; tone?: AccentTone }) {
  const { t, locale } = useTranslation();
  const sentence = t(text);
  const phrase = locale === 'ur' ? urduFocus || t(focus) : focus;
  const index = sentence.toLowerCase().indexOf(phrase.toLowerCase());
  return <span data-accent-source={text} data-accent-focus={focus} data-accent-focus-ur={urduFocus} data-accent-tone={tone} translate="no">
    {index < 0 || !phrase ? sentence : <>{sentence.slice(0, index)}<span className={`ink-accent ink-accent--${tone}`}>{sentence.slice(index, index + phrase.length)}</span>{sentence.slice(index + phrase.length)}</>}
  </span>;
}
