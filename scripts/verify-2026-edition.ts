import fs from 'node:fs';
import path from 'node:path';
import {parse} from 'parse5';
import edition from '../src/data/chapters/mentorship2026Edition.json';
import support from '../src/data/chapters/mentorship2026Support.json';
import descriptions from '../src/data/searchDescriptions.json';
import {chapterCatalog} from '../src/data/catalog.generated';
import reviewedSearch from '../src/data/chapters/mentorship2026Search.json';
import {urdu} from '../src/i18n/urdu';

const dist=process.env.PRERENDER_OUT_DIR||'dist';
const origin='https://learnsmc.xyz';
type Node={tagName?:string;value?:string;attrs?:{name:string;value:string}[];childNodes?:Node[]};
const attr=(n:Node,key:string)=>n.attrs?.find(a=>a.name===key)?.value;
const text=(n:Node):string=>(n.value||'')+(n.childNodes||[]).map(text).join('');
function all(n:Node,predicate:(n:Node)=>boolean):Node[]{return [...(predicate(n)?[n]:[]),...(n.childNodes||[]).flatMap(c=>all(c,predicate))];}
function check(ok:unknown,message:string){if(!ok)throw new Error(message);}
const sitemap=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');
for(const prefix of ['','ur/']){
 const home=parse(fs.readFileSync(path.join(dist,prefix,'index.html'),'utf8')) as Node;
 const meta=all(home,n=>n.tagName==='meta'&&attr(n,'name')==='description')[0];
 check(attr(meta,'content')?.includes(String(chapterCatalog.length)),`${prefix||'en/'}: homepage chapter count is stale`);
}
let checked=0;
for(const chapter of edition)for(const locale of ['en','ur']){
 const english=`/learn/${chapter.slug}/`,route=(locale==='ur'?'/ur':'')+english;
 const html=fs.readFileSync(path.join(dist,route,'index.html'),'utf8');
 const doc=parse(html) as Node;
 const head=all(doc,n=>n.tagName==='head')[0],body=all(doc,n=>n.tagName==='body')[0];
 const h1=all(body,n=>n.tagName==='h1');
 check(h1.length===1,`${route}: expected one H1`);
 check(text(h1[0])===(locale==='en'?chapter.title:urdu[chapter.title]),`${route}: H1 language/content mismatch`);
 const title=all(head,n=>n.tagName==='title');
 check(title.length===1&&text(title[0]).includes('ICT'),`${route}: document title absent or missing ICT`);
 if(locale==='en')for(const term of reviewedSearch.find(row=>row.id===chapter.id)!.requiredTerms)check(text(title[0]).toLowerCase().includes(term.toLowerCase()),`${route}: title lost reviewed query term ${term}`);
 check(locale==='en'?!/[\u0600-\u06ff]/.test(text(title[0])):true,`${route}: Urdu leaked into English title`);
 const description=all(head,n=>n.tagName==='meta'&&attr(n,'name')==='description')[0];
 check(description&&attr(description,'content')?.includes('ICT'),`${route}: topic description absent`);
 const reviewed=(descriptions as Record<string,{en:string;ur:string}>)[english];
 check(attr(description,'content')===(locale==='en'?reviewed.en:reviewed.ur),`${route}: reviewed description overridden`);
 for(const section of chapter.sections){
  const expectedHeading=locale==='en'?section.title:urdu[section.title];
  check(all(body,n=>n.tagName==='h2').some(n=>text(n)===expectedHeading),`${route}: section heading missing or overridden`);
  const expectedText=locale==='en'?section.content:urdu[section.content];
  const normalizedBody=text(body).replace(/\s+/g,' ');
  check(expectedText&&expectedText.split(/\n\n+/).every(paragraph=>normalizedBody.includes(paragraph.replace(/\s+/g,' '))),`${route}: complete lesson text missing from static HTML`);
 }
 const links=all(head,n=>n.tagName==='link');
 check(links.some(n=>attr(n,'rel')==='canonical'&&attr(n,'href')===origin+route),`${route}: canonical mismatch`);
 for(const [language,target] of [['en',english],['ur','/ur'+english],['x-default',english]])check(links.some(n=>attr(n,'hreflang')===language&&attr(n,'href')===origin+target),`${route}: missing ${language} alternate`);
 check(all(body,n=>n.tagName==='table').length>=1,`${route}: comparison missing from static HTML`);
 const graph=all(head,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').flatMap(n=>{const value=JSON.parse(text(n));return value['@graph']||[value];});
 const faq=graph.find(n=>n['@type']==='FAQPage');
 check(faq?.mainEntity?.length===5,`${route}: five FAQ graph questions required`);
 const expected=(support as Record<string,{faqs:{question:string;answer:string}[]}>)[chapter.id].faqs;
 for(const item of expected){
  const q=locale==='en'?item.question:urdu[item.question];
  check(q&&text(body).includes(q)&&faq.mainEntity.some((n:{name:string})=>n.name===q),`${route}: visible/schema FAQ mismatch`);
 }
 const resource=graph.find(n=>n['@type']==='LearningResource');
 check(resource?.author&&resource?.dateModified,`${route}: author/date provenance missing`);
 check(resource?.citation?.length,`${route}: primary citations absent`);
 const breadcrumb=graph.find(n=>n['@type']==='BreadcrumbList');
 check(breadcrumb?.itemListElement?.length>=3,`${route}: breadcrumb graph absent`);
 const visibleLinks=all(body,n=>n.tagName==='a');
 for(const item of breadcrumb.itemListElement.slice(0,-1))check(visibleLinks.some(n=>attr(n,'href')===new URL(item.item).pathname),`${route}: breadcrumb link absent`);
 check(all(body,n=>n.tagName==='svg').some(n=>text(n).length>0),`${route}: static illustration missing`);
 check(sitemap.includes(`<loc>${origin+route}</loc>`),`${route}: sitemap URL absent`);
 checked++;
}
console.log(`ICT 2026: ${checked} EN/UR lesson documents verified for static content, metadata, reciprocal alternates, tables, illustrations, FAQs and provenance.`);
