import {use,useEffect,useLayoutEffect,useRef,useState} from 'react';
import index from '../../data/practiceCaseIndex.generated.json';
import {loadPracticeCase,type CaseFamily} from '../../data/loadPracticeCase';
import {casesFor,type StudyCase,type StudyDefinition} from '../../data/chartLabRemaining';
import {silverCases,type SilverCase} from '../../data/silverBulletStudy';
import {breakerCases,type BreakerCase} from '../../data/breakerStudy';
import {RouteChartStudy} from './RouteChartStudy';
import {SilverBulletStudy} from './SilverBulletStudy';
import {BreakerStudy} from './BreakerStudy';
import {useTranslation} from '../../i18n/TranslationProvider';
export type StudyChoice={id:string;name:readonly string[]};
type Family=Exclude<CaseFamily,'guided'>;
type Case=StudyCase|SilverCase|BreakerCase;
type Props={family:Family;study?:StudyDefinition};
function view({family,study}:Props,cases:Case[],choices:StudyChoice[],onChoose?:(id:string)=>void){
 if(family==='remaining')return <RouteChartStudy study={study!} cases={cases as StudyCase[]} choices={choices} onChoose={onChoose}/>;
 if(family==='silver')return <SilverBulletStudy cases={cases as SilverCase[]} choices={choices} onChoose={onChoose}/>;
 return <BreakerStudy cases={cases as BreakerCase[]} choices={choices} onChoose={onChoose}/>;
}
export function CaseStudyResource(props:Props){
 const choices=(index[props.family] as StudyChoice[]).filter(c=>props.family!=='remaining'||c.id.startsWith(props.study!.prefix));
 if(typeof window==='undefined')return view(props,props.family==='remaining'?casesFor(props.study!):props.family==='silver'?silverCases:breakerCases,choices);
 return <LoadedStudy key={props.family+':'+(props.study?.slug||'')} {...props} choices={choices}/>;
}
function LoadedStudy(props:Props&{choices:StudyChoice[]}){
 const initial=use(loadPracticeCase<Case>(props.family,props.choices[0].id));
 const [selected,setSelected]=useState(initial),[busy,setBusy]=useState(false),[error,setError]=useState(false);
 const revision=useRef(0),root=useRef<HTMLDivElement>(null),{locale}=useTranslation(),ur=locale==='ur';
 useEffect(()=>()=>{revision.current++;},[]);
 const choose=async(id:string)=>{
  const request=++revision.current;setBusy(true);setError(false);
  try{const c=await loadPracticeCase<Case>(props.family,id);if(request===revision.current)setSelected(c);}
  catch{if(request===revision.current)setError(true);}
  finally{if(request===revision.current)setBusy(false);}
 };
 useLayoutEffect(()=>{if(revision.current)root.current?.querySelector<HTMLButtonElement>('[data-case-choice="'+selected.id+'"]')?.focus({preventScroll:true});},[selected]);
 return <div ref={root} style={{display:'contents'}} aria-busy={busy}>
  {busy&&<p className="sr-only" role="status">{ur?'منتخب مشقی کیس لوڈ ہو رہا ہے۔':'Loading the selected teaching case.'}</p>}
  {error&&<p role="alert">{ur?'کیس لوڈ نہیں ہو سکا۔ دوبارہ منتخب کریں؛ موجودہ مثال برقرار ہے۔':'The case could not load. Select it again to retry; the current example remains available.'}</p>}
  {view(props,[selected],props.choices,choose)}
 </div>;
}
