import { useTranslation } from '../i18n/TranslationProvider';
import { localizedHref } from '../i18n/locale';
import { URDU_PUBLISHED } from '../i18n/release';

/** Switch the current document while retaining its query and section anchor. */
export function LanguageSwitcher() {
  const { locale, preview } = useTranslation();
  if (!preview && !URDU_PUBLISHED) return null;
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const path = typeof window === 'undefined' ? '/' : `${pathname}${window.location.search}${window.location.hash}`;
  return <nav aria-label={locale === 'ur' ? 'زبان منتخب کریں' : 'Choose language'} className="language-switcher" dir="ltr">
    <a href={localizedHref(path, 'en')} hrefLang="en" lang="en" translate="no" aria-current={locale === 'en' ? 'page' : undefined}>English</a>
    <a href={localizedHref(path, 'ur')} hrefLang="ur" lang="ur" translate="no" aria-current={locale === 'ur' ? 'page' : undefined}>اردو</a>
  </nav>;
}
