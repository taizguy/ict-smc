import fs from 'node:fs';import assert from 'node:assert/strict';import {parse} from 'parse5';
import {fvgDocument as lesson,fvgDocumentPath,fvgDocumentChapter} from '../src/data/chapters/fvgDocument';
import {fvgDocumentTranslations} from '../src/data/chapters/fvgDocumentTranslations';
import {positionSize} from '../src/components/FvgBlueprint';import {urdu} from '../src/i18n/urdu';import {curriculumReview} from '../src/data/curriculumReview';
const result=positionSize(10000,1,101,99.6,106.5)!;assert.equal(result.amount,100);assert.equal(result.units,71);assert.ok(Math.abs(result.r-5.5/1.4)<1e-10);for(const args of [[0,1,101,99.6,106.5],[10000,1,101,101,106.5],[10000,1,101,99.6,100],[10000,101,101,99,106],[Infinity,1,101,99,106]])assert.equal(positionSize(...args as [number,number,number,number,number]),null);
const all=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(all)],a=(n:any,k:string)=>n.attrs?.find((x:any)=>x.name===k)?.value,txt=(n:any):string=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(txt).join(''),norm=(s:string)=>s.replace(/\s+/g,' ').trim();
const source=JSON.parse(fs.readFileSync('docs/chapter26-source-copy.json','utf8')),manifest=JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8')),evidence=[];
assert.equal(lesson.sections.length,25);assert.equal(lesson.faqs.length,21);assert.equal(fvgDocumentChapter.keyTerms.length,14);
for(const prefix of ['','/ur']){
 const route=prefix+fvgDocumentPath,row=manifest.find((r:any)=>r.path===route);assert.ok(row?.indexable);const html=fs.readFileSync('dist/'+row.outputPath,'utf8'),doc=all(parse(html)),head=all(doc.find(n=>n.tagName==='head')),main=all(doc.find(n=>n.tagName==='main')),content=norm(txt(main[0])),translated=(s:string)=>prefix?(fvgDocumentTranslations[s]||urdu[s]||s):s;
 assert.equal(main.filter(n=>n.tagName==='h1').length,1);assert.equal(txt(main.find(n=>n.tagName==='h1')),translated(lesson.h1));
 for(const unit of source.units)assert.ok(content.includes(norm(translated(unit))),route+' missing supplied copy: '+unit);
 for(const code of source.code)assert.ok(content.includes(norm(code)),route+' missing code');
 for(const section of lesson.sections)assert.ok(main.some(n=>n.tagName==='h2'&&txt(n)===translated(section.title)),route+' section heading');
 assert.equal(main.filter(n=>n.tagName==='table').length,22);assert.equal(main.filter(n=>a(n,'data-fvg-figure')!==undefined).length,11);assert.ok(!main.some(n=>a(n,'data-fvg-figure')==='myths'));assert.ok(!main.some(n=>a(n,'class')==='fvg-next'));assert.equal(main.filter(n=>a(n,'class')?.split(' ').includes('fvg-faq-card')).length,21);
 assert.equal(doc.filter(n=>a(n,'class')?.split(' ').includes('ymyl-disclaimer')).length,1);assert.ok(!main.some(n=>n.tagName==='a'&&/innercircletrader$|I_Am_The_ICT/.test(a(n,'href')||'')));
 const desc=head.find(n=>a(n,'name')==='description');for(const [key,value]of [['property','og:description'],['name','twitter:description']])assert.equal(a(head.find(n=>a(n,key)===value),'content'),a(desc,'content'));
 assert.ok(head.some(n=>a(n,'rel')==='canonical'&&a(n,'href')==='https://learnsmc.xyz'+route));for(const lang of ['en','ur','x-default'])assert.ok(head.some(n=>a(n,'hreflang')===lang));
 const graph=head.filter(n=>a(n,'type')==='application/ld+json').flatMap(n=>JSON.parse(txt(n))['@graph']||[]),article=graph.find(n=>n['@type']==='Article');assert.equal(article.author.name,'Muhammad Umer Ijaz');assert.equal(article.datePublished,'2026-10-15');assert.equal(article.dateModified,'2026-11-11');assert.equal(graph.find(n=>n['@type']==='FAQPage').mainEntity.length,21);assert.equal(graph.find(n=>n['@type']==='DefinedTermSet').hasDefinedTerm.length,14);assert.ok(graph.some(n=>n['@type']==='BreadcrumbList'));
 for(const ref of curriculumReview(fvgDocumentChapter).sources)assert.ok(main.some(n=>a(n,'href')===ref.url));
 assert.ok(!content.includes('Opening your page...'));evidence.push({route,title:row.title,description:row.description,sourceUnits:source.units.length,tables:22,figures:11,faqs:21,riskNotices:1,article,glossaryTerms:14});
}
fs.mkdirSync('outputs/fvg-document-review',{recursive:true});fs.writeFileSync('outputs/fvg-document-review/static-verification.json',JSON.stringify(evidence,null,2));console.log('Chapter 26 FVG: supplied English/Urdu copy, 25 sections, 22 tables, 11 figures, 21 FAQs, 14 terms, one risk notice, arithmetic and metadata/schema/language checks passed.');
