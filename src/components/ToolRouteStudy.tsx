import { routeStudyLabels, toolRouteStudies } from '../data/toolRouteStudies';
import { useTranslation } from '../i18n/TranslationProvider';

/** Route-specific explanations use the same bilingual model in reading HTML and runtime. */
export function ToolRouteStudy({family,slug}:{family:string;slug?:string}) {
  const study=slug?toolRouteStudies[family]?.[slug]:undefined;
  const {locale}=useTranslation();
  if(!study) return null;
  const language=locale==='ur'?1:0;
  return <section className="rounded-xl border border-ink/15 bg-surface p-4 sm:p-6 space-y-5" data-route-study={`${family}/${slug}`}>
    <h2 className="text-xl font-semibold text-ink">{study.heading[language]}</h2>
    {(['instructions','example','assumptions','limitations'] as const).map((key,i)=><div key={key} className="space-y-2">
      <h3 className="text-base font-semibold text-ink">{routeStudyLabels[i][language]}</h3>
      <p className="text-sm leading-relaxed text-ink-secondary">{study[key][language]}</p>
    </div>)}
  </section>;
}
