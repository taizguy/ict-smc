import {routeStudyLabels} from '../data/routeStudyLabels';
import type {RouteStudy} from '../data/toolRouteStudies';
import {use,lazy,Suspense} from 'react';
const source:Record<string,Record<string,RouteStudy>>=typeof window==='undefined'?(await import('../data/toolRouteStudies')).toolRouteStudies:{};
const modules=typeof window==='undefined'?{}:import.meta.glob<{default:RouteStudy}>('../data/runtime/tool-briefs/*/*.json');
const briefs=new Map<string,Promise<RouteStudy>>();
function brief(key:string){if(!briefs.has(key)){const load=modules[key];if(!load)throw Error('Unknown study brief '+key);briefs.set(key,load().then(m=>m.default).catch(e=>{briefs.delete(key);throw e;}));}return briefs.get(key)!;}
const ContextualInternalLinker=typeof window==='undefined'?(await import('./ContextualInternalLinker')).ContextualInternalLinker:lazy(()=>import('./ContextualInternalLinker').then(m=>({default:m.ContextualInternalLinker})));
import { useTranslation } from '../i18n/TranslationProvider';


/** Route-specific explanations use the same bilingual model in reading HTML and runtime. */
export function ToolRouteStudy({family,slug}:{family:string;slug?:string}) {
  const key='../data/runtime/tool-briefs/'+family+'/'+slug+'.json';
  const study=slug?(typeof window==='undefined'?source[family]?.[slug]:modules[key]?use(brief(key)):undefined):undefined;
  const {locale}=useTranslation();
  if(!study) return null;
  const language=locale==='ur'?1:0;
  return <section className="rounded-xl border border-ink/15 bg-surface p-4 sm:p-6 space-y-5" data-route-study={`${family}/${slug}`}>
    <h2 className="text-xl font-semibold text-ink">{study.heading[language]}</h2>
    {(['instructions','example','assumptions','limitations'] as const).map((key,i)=><div key={key} className="space-y-2">
      <h3 className="text-base font-semibold text-ink">{routeStudyLabels[i][language]}</h3>
      <p className="text-sm leading-relaxed text-ink-secondary">{family==='chartlab' ? <Suspense fallback={study[key][language]}><ContextualInternalLinker text={study[key][language]} maxLinks={3}/></Suspense> : study[key][language]}</p>
    </div>)}
  </section>;
}
