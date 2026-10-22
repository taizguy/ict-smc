import { isEnglishOnlyHistory } from '../data/history-paths';
import { useTranslation } from '../i18n/TranslationProvider';
import { localizedHref } from '../i18n/locale';
import { URDU_PUBLISHED } from '../i18n/release';
import { useState, type MouseEvent } from 'react';

/** Switch the current document while retaining its query and section anchor. */
export function LanguageSwitcher() {
  const { locale, preview } = useTranslation();
  const [destination,setDestination] = useState(locale);
  if (!preview && !URDU_PUBLISHED) return null;
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const path = typeof window === 'undefined' ? '/' : `${pathname}${window.location.search}${window.location.hash}`;
  const switchLanguage=(event:MouseEvent<HTMLAnchorElement>,next:'en'|'ur')=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
    event.preventDefault();
    if(next===locale)return;
    setDestination(next);
    const target=event.currentTarget.href;
    window.setTimeout(()=>window.location.assign(target),window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:160);
  };
  return <nav aria-label={locale === 'ur' ? 'زبان منتخب کریں' : 'Choose language'} className="language-switcher language-toggle" data-language={destination} dir="ltr">
    <span className="language-toggle-thumb" aria-hidden="true"/>
    <a onClick={event=>switchLanguage(event,'en')} href={localizedHref(path, 'en')} hrefLang="en" lang="en" translate="no" aria-label="English" aria-current={locale === 'en' ? 'page' : undefined}>EN</a>
    <a onClick={event=>switchLanguage(event,'ur')} href={localizedHref(isEnglishOnlyHistory(pathname)?'/articles/':path, 'ur')} title={isEnglishOnlyHistory(pathname)?'Urdu articles — this series is currently in English':undefined} hrefLang="ur" lang="ur" translate="no" aria-current={locale === 'ur' ? 'page' : undefined}>اردو</a>
  </nav>;
}
