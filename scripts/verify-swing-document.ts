import{createElement}from'react';import{renderToStaticMarkup}from'react-dom/server';import{SwingDocumentContent}from'../src/components/SwingDocumentContent';import{TranslationProvider}from'../src/i18n/TranslationProvider';import{urdu}from'../src/i18n/urdu';
import fs from'node:fs';import assert from'node:assert/strict';import{parse}from'parse5';
import{swingDocument as d,swingChapter,swingPath,swingPlain,swingQuizzes,swingDates}from'../src/data/chapters/swingDocument';
import{swingTranslations as ur}from'../src/data/chapters/swingTranslations';
import{detectClosedSwings,strictSwing,promoteSwingLows,swingNqExample,swingExampleChecks}from'../src/utils/swingMath';
import{chapterQuiz}from'../src/data/chapters/chapterQuizzes';
const fixture=JSON.parse(fs.readFileSync('docs/chapter09/source-copy.json','utf8'));assert.deepEqual(d,fixture.article);
assert.equal(d.sections.length,21);assert.equal(d.faqs.length,7);assert.equal(d.takeaways.length,5);assert.equal(d.sections.flatMap(s=>s.blocks).filter(b=>b.type==='table').length,12);assert.equal(swingChapter.keyTerms.length,9);assert.equal(chapterQuiz(swingChapter).length,3);
const before=JSON.stringify(swingNqExample),points=detectClosedSwings(swingNqExample);assert.equal(points.length,1);assert.equal(points[0].price,20468.75);assert.equal(points[0].pivotTime,'10:00');assert.equal(points[0].confirmedAt,'10:30');assert.equal(JSON.stringify(swingNqExample),before);
assert.equal(detectClosedSwings(swingNqExample.map((b,i)=>({...b,closed:i!==2}))).length,0);
assert.equal(strictSwing({high:10,low:5},{high:10,low:6},{high:9,low:7}).high,false);
assert.equal(strictSwing({high:10,low:5},{high:11,low:6},{high:11,low:7}).high,false);
assert.deepEqual(strictSwing({high:10,low:5},{high:12,low:3},{high:11,low:4}),{high:true,low:true,confirmed:true});
assert.equal(strictSwing({high:10,low:5},{high:12,low:3},{high:11,low:4},false).confirmed,false);
assert.throws(()=>detectClosedSwings([{...swingNqExample[0],high:1}]));
assert.deepEqual(swingExampleChecks,{leftPoints:23.25,rightPoints:26.75,leftTicks:93,rightTicks:107,protectedHold:3.25,stopTicks:3});
const stls=[120,110,118,100,116,108,119,115,121].map((price,i)=>({price,confirmedAt:String(i)}));const itls=promoteSwingLows(stls),ltls=promoteSwingLows(itls);assert.deepEqual(itls.map(p=>p.price),[110,100,108,115]);assert.deepEqual(ltls.map(p=>p.price),[100]);assert.equal(ltls[0].confirmedAt,'6');
// Every reader sentence is translated as a whole, not by word substitution.
const strings=[d.h1,d.quickAnswer,...d.takeaways,...d.sections.flatMap(s=>[s.title,...s.blocks.flatMap(b=>b.type==='code'?[]:b.items||b.rows?.flat()||[b.text!])]),...d.faqs.flatMap(q=>[q.question,q.answer]),...swingQuizzes.flatMap(q=>[q.question,q.context,...q.options,q.explanation])];
const missing=strings.filter(s=>!ur[s]&&!/^[\d,. :><=+−×÷%$`*A-Z/_-]+$/.test(s));assert.deepEqual(missing,[],'Missing genuine Urdu chapter strings');
const all=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(all)],a=(n:any,k:string)=>n.attrs?.find((x:any)=>x.name===k)?.value,text=(n:any):string=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join(''),norm=(s:string)=>s.replace(/\s+/g,' ').trim();
const preflight=[];
for(const lang of ['en','ur']as const){const markup=renderToStaticMarkup(createElement(TranslationProvider,{locale:lang,catalog:lang==='ur'?{...urdu,...ur}:{},children:createElement(SwingDocumentContent,{staticOnly:true})}));const body=norm(text(parse(markup)));for(const value of strings.slice(2,-swingQuizzes.flatMap(q=>[q.question,q.context,...q.options,q.explanation]).length)){const expected=lang==='ur'?(ur[value]||value):value;assert.ok(body.includes(norm(swingPlain(expected))),`${lang} renderer missing ${value.slice(0,80)}`)}preflight.push({language:lang,copyParity:true});}
if(process.argv.includes('--preflight')){fs.mkdirSync('outputs/chapter09',{recursive:true});fs.writeFileSync('outputs/chapter09/preflight.json',JSON.stringify({preflight,math:'passed',translatedStrings:strings.length},null,2));console.log('Chapter 09 preflight passed: approved copy, native EN/UR renderer and swing math.');process.exit(0);}
const evidence=[];
for(const lang of['en','ur']){const path=(lang==='ur'?'/ur':'')+swingPath,file='dist'+path+'index.html',html=fs.readFileSync(file,'utf8'),nodes=all(parse(html,{sourceCodeLocationInfo:true}));
 const doc=nodes.find(n=>(a(n,'class')||'').split(' ').includes('swing-document'));assert.ok(doc,file);const body=norm(text(doc));
 assert.equal(nodes.filter(n=>n.tagName==='h1').length,1);assert.equal(nodes.filter(n=>a(n,'data-swing-figure')!==undefined).length,9);assert.equal(nodes.filter(n=>n.tagName==='details'&&a(n,'name')==='swing-faq').length,7);
 for(const s of strings.slice(2,-swingQuizzes.flatMap(q=>[q.question,q.context,...q.options,q.explanation]).length)){const value=lang==='ur'?(ur[s]||s):s;assert.ok(body.includes(norm(swingPlain(value))),`${lang} missing ${s.slice(0,90)}`)}
 const h1=nodes.find(n=>n.tagName==='h1');assert.equal(norm(text(h1)),lang==='ur'?ur[d.h1]:d.h1);
 const title=text(nodes.find(n=>n.tagName==='title'));assert.ok(title.includes('LearnSMC'));const desc=a(nodes.find(n=>a(n,'name')==='description'),'content');for(const name of ['og:description','twitter:description'])assert.equal(a(nodes.find(n=>a(n,'property')===name||a(n,'name')===name),'content'),desc);
 assert.equal(a(nodes.find(n=>a(n,'rel')==='canonical'),'href'),'https://learnsmc.xyz'+path);for(const code of['en','ur','x-default'])assert.ok(nodes.some(n=>a(n,'hreflang')===code));
 const main=nodes.find(n=>n.tagName==='main'),library=nodes.find(n=>a(n,'id')==='rr-library'),article=nodes.find(n=>n.tagName==='article');assert.equal(nodes.filter(n=>n.tagName==='main').length,1);assert.ok(main.sourceCodeLocation.startOffset<library.sourceCodeLocation.startOffset);assert.ok(article.sourceCodeLocation.endOffset<library.sourceCodeLocation.startOffset);
 assert.ok(!/Quick Answer \(Snippet|Visual \d \(|Part 3: AIO|Swing Markup Drill/.test(html));assert.ok(!all(doc).some(n=>n.tagName==='button'&&all(n).some(m=>m.tagName==='h3')));
 const schemas=nodes.filter(n=>a(n,'type')==='application/ld+json').flatMap(n=>{const j=JSON.parse(text(n));return j['@graph']||[j]});assert.ok(schemas.some(s=>s['@type']==='Article'&&s.datePublished===swingDates.published.iso&&s.dateModified===swingDates.updated.iso&&s.image));assert.ok(schemas.some(s=>s['@type']==='FAQPage'&&s.mainEntity.length===7));assert.ok(schemas.some(s=>s['@type']==='DefinedTermSet'&&s.hasDefinedTerm.length===9));assert.ok(schemas.some(s=>s['@type']==='BreadcrumbList'));
 evidence.push({language:lang,path,h1:norm(text(h1)),title,description:desc,figures:9,faq:7,articleBeforeLibrary:true,wordingParity:true});
}
fs.mkdirSync('outputs/chapter09',{recursive:true});fs.writeFileSync('outputs/chapter09/static-verification.json',JSON.stringify({routes:evidence,math:'passed',translatedStrings:strings.length,approvedCorrections:fixture.approvedCorrections.length},null,2));console.log('Chapter 09 passed: strict pivot and confirmation arithmetic, preserved approved copy, EN/UR static HTML, nine figures, seven native FAQs, schema, canonical/hreflang and content-first DOM.');
