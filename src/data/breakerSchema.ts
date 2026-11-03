import {breakerMeta,breakerReview,breakerSources,BREAKER_PATH} from './breakerStudy';
import {lessonAuthor,publisher} from '../utils/publisher';
export function breakerSchema(locale:'en'|'ur'='en'){
 const n=locale==='ur'?1:0,url='https://learnsmc.xyz'+(n?'/ur':'')+BREAKER_PATH;
 const labels=n?['ابتدا','ورک بینچ اور لیب','چارٹ لیب','بیئرش بریکر']:['Home','Workbench & Lab','Chart Lab','Bearish breaker'];
 const paths=['/','/tools/','/tools/chartlab/',BREAKER_PATH];
 const image='https://learnsmc.xyz/images/social/eurusd-bearish-breaker-'+locale+'.png';
 return {'@context':'https://schema.org','@graph':[
 {'@type':'WebPage','@id':url+'#webpage',url,name:breakerMeta.h1[n],description:breakerMeta.description[n],inLanguage:locale,dateModified:breakerReview,author:lessonAuthor,publisher,image,breadcrumb:{'@id':url+'#breadcrumb'},mainEntity:{'@id':url+'#exercise'}},
 {'@type':'LearningResource','@id':url+'#exercise',url,name:breakerMeta.h1[n],description:breakerMeta.description[n],inLanguage:locale,learningResourceType:n?'انٹرایکٹو چارٹ مشق':'Interactive chart exercise',educationalUse:n?'مشق':'Practice',isAccessibleForFree:true,author:lessonAuthor,publisher,dateModified:breakerReview,image,citation:breakerSources.map(s=>s.url),isPartOf:{'@type':'CollectionPage',url:'https://learnsmc.xyz'+(n?'/ur':'')+'/tools/chartlab/',name:labels[2]}},
 {'@type':'WebApplication','@id':url+'#application',name:breakerMeta.h1[n],url,inLanguage:locale,description:breakerMeta.description[n],applicationCategory:'EducationalApplication',operatingSystem:'Web browser',isAccessibleForFree:true,author:lessonAuthor},
 {'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:paths.map((path,i)=>({'@type':'ListItem',position:i+1,name:labels[i],item:'https://learnsmc.xyz'+(n?'/ur':'')+path}))}
 ]};
}
