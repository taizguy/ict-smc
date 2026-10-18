import React from 'react';
import { contextualFragments } from '../utils/contextualLinks';
import { useTranslation } from '../i18n/TranslationProvider';
import { lessonParagraphs } from '../utils/lessonText';
interface Props { text: string | string[]; className?: string; maxLinks?: number; onNavigate?: (url: string) => void }
export const ContextualInternalLinker: React.FC<Props> = ({ text, className = '', maxLinks = 4 }) => {
  const { t, locale, href } = useTranslation();
  const localized = lessonParagraphs(Array.isArray(text) ? text.join('\n\n') : text).map(t).join('\n\n');
  return <span translate={locale === 'ur' ? 'no' : undefined} className={className}>{contextualFragments(localized, typeof location === 'undefined' ? '' : location.pathname, maxLinks).map((fragment, i) =>
    fragment.href ? <a key={i} href={href(fragment.href)} className="font-medium text-teal underline underline-offset-4">{fragment.text}</a> : fragment.text
  )}</span>;
};
