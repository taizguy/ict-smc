import { useTranslation } from '../i18n/TranslationProvider';
import { labGuides } from '../data/labGuides';

/** The learning instructions are present before enhancement and remain in the runtime DOM. */
export function StudyReadingNotes({ tool }: { tool: 'chartlab' | 'delivery-suite' }) {
  const { t } = useTranslation();
  const guide = labGuides[tool];
  return <section className="rounded-xl border border-ink/15 bg-surface p-4 sm:p-6 space-y-3" data-essential-reading={tool}>
    <h2 className="text-xl font-semibold text-ink">{t(guide.title)}</h2>
    {guide.paragraphs.map(paragraph => <p key={paragraph} className="text-sm leading-relaxed text-ink-secondary">{t(paragraph)}</p>)}
  </section>;
}
