import {silverMeta,silverReview,silverSources,SILVER_PATH} from './silverBulletStudy';
import {lessonAuthor,publisher} from '../utils/publisher';
export function silverSchema(locale:'en'|'ur'='en'){
 const n=locale==='ur'?1:0,root='https://learnsmc.xyz'+(n?'/ur':''),url=root+SILVER_PATH,image=`https://learnsmc.xyz/images/social/nq-silver-bullet-${locale}.png`;
 const description=silverMeta.description[n]+(n?' تمام قیمتیں فرضی ہیں؛ حقیقی مارکیٹ ڈیٹا یا تصدیق شدہ ٹریڈ نہیں۔':' All OHLC prices are synthetic; no historical trade or verified fill is claimed.');
 return {'@context':'https://schema.org','@graph':[
 {'@type':'WebPage','@id':url+'#webpage',url,name:silverMeta.h1[n],description,inLanguage:locale,dateModified:silverReview,author:lessonAuthor,publisher,image,breadcrumb:{'@id':url+'#breadcrumb'},mainEntity:{'@id':url+'#exercise'}},
 {'@type':'LearningResource','@id':url+'#exercise',url,name:silverMeta.h1[n],description,inLanguage:locale,learningResourceType:n?'انٹرایکٹو چارٹ مشق':'Interactive chart exercise',educationalUse:n?'مشق':'Practice',isAccessibleForFree:true,author:lessonAuthor,publisher,dateModified:silverReview,image,citation:silverSources.map(s=>s.url),isPartOf:{'@type':'CollectionPage',url:root+'/tools/chartlab/',name:n?'چارٹ لیب':'Chart Lab'}},
 {'@type':'WebApplication','@id':url+'#application',url,name:silverMeta.h1[n],description,inLanguage:locale,applicationCategory:'EducationalApplication',operatingSystem:'Web browser',author:lessonAuthor,isAccessibleForFree:true},
 {'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:['/','/tools/','/tools/chartlab/',SILVER_PATH].map((p,i)=>({'@type':'ListItem',position:i+1,name:(n?['ابتدا','ورک بینچ اور لیب','چارٹ لیب','سلور بُلٹ']:['Home','Workbench & Lab','Chart Lab','Silver Bullet'])[i],item:root+p}))}
 ]};
}
