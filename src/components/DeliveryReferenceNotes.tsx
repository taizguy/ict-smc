import { deliverySuiteReading } from '../data/deliverySuiteReading';
import { useTranslation } from '../i18n/TranslationProvider';

export function DeliveryReferenceNotes() {
  const { t } = useTranslation();
  return <div className="space-y-6" data-essential-reading="ote-assumptions">{deliverySuiteReading.map(section => <section key={section.title} className="rounded-xl border border-ink/15 bg-surface p-4 sm:p-6 space-y-3">
    <h2 className="text-xl font-semibold text-ink">{t(section.title)}</h2>
    {section.paragraphs.map(paragraph => <p key={paragraph} className="text-sm leading-relaxed text-ink-secondary">{t(paragraph)}</p>)}
  </section>)}</div>;
}
