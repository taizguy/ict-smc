import {loopTools} from '../components/practice/PracticeLoop';
import {practicePages} from '../data/practiceLoopContent';
import type {PracticeTool} from '../data/practiceCases';
import {publisher,lessonAuthor} from './publisher';
export function practiceSchema(tool:Exclude<PracticeTool,'chartlab'>,locale:'en'|'ur'='en'){
 const n=locale==='ur'?1:0,prefix=n?'/ur':'',stage=loopTools.find(s=>s.id===tool)!,url='https://learnsmc.xyz'+prefix+stage.path,page=practicePages[tool];
 return {'@context':'https://schema.org','@graph':[lessonAuthor,{'@type':'WebPage','@id':url,url,name:page.h1[n],description:page.description[n],inLanguage:locale,author:{'@id':lessonAuthor['@id']},publisher,dateModified:'2026-11-04'}, {'@type':'BreadcrumbList',itemListElement:[[n?'ابتدا':'Home','/'],[n?'ورک بینچ اور لیب':'Workbench & Lab','/tools/'],[stage.name[n],stage.path]].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:'https://learnsmc.xyz'+prefix+path}))}]};
}
