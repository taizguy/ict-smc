import {masterclassCollectionPage} from '../data/masterclassCategoryPages';
import {masterclassHubFaqs} from '../data/masterclassHub';
import {getMasterclassUrl} from './workbenchToolRoutes';
import {localizedHref} from '../i18n/locale';
import {publisher,lessonAuthor} from './publisher';
export function masterclassCollectionSchema(path:string,locale:'en'|'ur'='en',t=(s:string)=>s){
 const page=masterclassCollectionPage(path);if(!page)throw Error('Unknown Masterclass collection '+path);
 const root='https://learnsmc.xyz',url=root+localizedHref(page.path,locale),listId=url+'#lessons';
 const crumbs=[['Home','/'],['Workbench & Lab','/tools/'],['Masterclass collection','/tools/masterclass/'],...(page.id==='all'?[]:[[page.name,page.path]])];
 return {'@context':'https://schema.org','@graph':[publisher,lessonAuthor,{'@type':'WebSite','@id':root+'/#website',name:'LearnSMC',url:root+'/'},{'@type':'CollectionPage','@id':url,name:t(page.h1),description:t(page.description),url,inLanguage:locale,isAccessibleForFree:true,publisher,mainEntity:{'@id':listId}},{'@type':'BreadcrumbList',itemListElement:crumbs.map(([name,path],i)=>({'@type':'ListItem',position:i+1,name:t(name),item:root+localizedHref(path,locale)}))},{'@type':'ItemList','@id':listId,name:t(page.name),numberOfItems:page.lessons.length,itemListElement:page.lessons.map((lesson,i)=>({'@type':'ListItem',position:i+1,name:t(lesson.title),url:root+localizedHref(getMasterclassUrl(lesson),locale)}))},...(page.id==='all'?[{'@type':'FAQPage','@id':url+'#faq',mainEntity:masterclassHubFaqs.map(f=>({'@type':'Question',name:t(f.question),acceptedAnswer:{'@type':'Answer',text:t(f.answer)}}))}]:[])]};
}
