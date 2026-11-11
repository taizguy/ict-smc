import fs from 'node:fs';
import path from 'node:path';
import {parse} from 'parse5';
export const claimRules=[
 {id:'precision-promise',pattern:/surgical precision|exactly 25\s*[-–]\s*30 pips.{0,35}compounding|algorithmic institutional limit orders|engineer the low of the day|massive weekly range expansion|asymmetric payoff|flagship retail-to-institutional/gi},
 {id:'guarantee',pattern:/\bguaranteed\b/gi},
 {id:'win-rate',pattern:/\bwin[ -]rate\b/gi},
 {id:'unobservable-flow',pattern:/institutional order flow\s+(?:is|drives|causes|proves|reveals|determines|confirms)\b/gi},
 {id:'algorithmic-delivery',pattern:/algorithmic(?:\s+\w+){0,2}\s+(?:price delivery|delivery of price)/gi},
];
const caveat=/\b(?:no|not|never|cannot|can't|without|neither|doesn't|do not|isn't|unverified|unsourced|hypothetical|assumed|fictional|authored|illustrative|convention|teaching|framework|claims?|quoted|attributed|misleading|reject|unsupported|rather than|distinct from|separate|inaccurate)\b|نہیں|فرضی|غیر مصدقہ|اخذ نہ|ثبوت نہیں|ثابت شدہ.*نہیں/i;
const findings:{file:string;line:number;rule:string;phrase:string;context:string}[]=[],reviewed:typeof findings=[];
function check(text:string,context:string,file:string,line:number,structuralReason=''){for(const rule of claimRules){rule.pattern.lastIndex=0;for(const m of text.matchAll(rule.pattern)){const sentence=text.slice(0,m.index).split(/(?<=[.!?])\s+/).at(-1)!+text.slice(m.index).split(/(?<=[.!?])\s+/)[0];
 // A caveat must occur in the same sentence, not anywhere on a long page.
 // A bare metric label may use its containing paragraph's explicit assumed/sample context.
 const metricLabel=rule.id==='win-rate'&&text.trim().length<35&&/\b(?:calculated|sample|record|assumed|hypothetical|authored)\b/i.test(context);
 const answeredQuestion=/[?؟]$/.test(text.trim())&&caveat.test(context);
 const negative=/\b(?:no|not|never|cannot|can't|without|neither|doesn't|isn't|rather than|distinct from|inaccurate|unverified|unsupported|unsourced)\b|نہیں|غیر مصدقہ|اخذ نہ/i.test(sentence);
 const boundedLabel=text.trim().length<60&&/:$/.test(text.trim())&&caveat.test(context);
 const namedTerm=rule.id==='algorithmic-delivery'&&text.length<350&&!/\b(?:is|are|has|have|makes?|ensures?|guarantees?|guaranteed|confirms?|proves?|drives?|controls?|determines?|indication|reveals?)\b/i.test(text);
 const metricInstruction=rule.id==='win-rate'&&!/\d\s*%|highest|profitable|wealthy|proven|guarantee|statistical/i.test(text)&&/\b(?:record|track|review|calculate|report|journal|metrics?)\b/i.test(text);
 const rejectedEquivalence=/\b(?:separate|distinguish|confusing|mistake)\b.{0,150}\b(?:from|with)\b.{0,150}\bguaranteed\b/i.test(sentence);
 const metricReporting=rule.id==='win-rate'&&/\breport\b.{0,120}\b(?:sample size|unresolved|costs)\b/i.test(sentence)&&!/%|profitable|wealthy|highest|guarantee/i.test(sentence);
 const unqualifiedPerformancePromise=rule.id==='win-rate'&&/highest|consistently wealthy|highly profitable|will experience/i.test(sentence)&&!negative;
 // Algebraic break-even identity is not an observed strategy win-rate claim.
 const breakEvenIdentity=rule.id==='win-rate'&&/^Break-even win rate before costs\s*=\s*1\s*[÷/]\s*\(1\s*\+\s*(?:R|3)\)/i.test(text.trim())&&/Spreads, commissions and slippage raise/i.test(text)&&!/highest|guaranteed|wealthy|proven|achieve/i.test(text);
 const qualified=!unqualifiedPerformancePromise&&((rule.id==='guarantee'||rule.id==='precision-promise')?negative||rejectedEquivalence:caveat.test(sentence));
 const item={file,line,rule:rule.id,phrase:m[0],context:(structuralReason?`[${structuralReason}] `:'')+sentence.slice(0,500)};(breakEvenIdentity||qualified||metricReporting||metricLabel||answeredQuestion||structuralReason||boundedLabel||namedTerm||metricInstruction?reviewed:findings).push(item);
}}}
function walk(dir:string){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory()){walk(f);continue;}if(!/\.(html|json|txt|svg)$/i.test(f))continue;const source=fs.readFileSync(f,'utf8');
 if(/\.(html|svg)$/.test(f)){const doc:any=parse(source,{sourceCodeLocationInfo:true});const content=(n:any):string=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(content).join(' ');const descendants=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(descendants)];function visit(n:any,parent:any){if(n.tagName==='style')return;if(n.tagName==='script'){const type=n.attrs?.find((a:any)=>a.name==='type')?.value;if(type==='application/ld+json')json(JSON.parse(content(n)),f,n.sourceCodeLocation?.startLine||1);return;}if(n.nodeName==='#text'&&n.value.trim()){
 let context=content(parent),reason='';for(let a=parent;a;a=a.parentNode){
  const cls=a.attrs?.find((x:any)=>x.name==='class')?.value||'';
  if(a.tagName==='details'||['li','p','dd','figcaption'].includes(a.tagName)&&context===content(parent))context=content(a);
  if(a.tagName==='fieldset'&&cls.includes('chapter-quiz-question')){const answer=descendants(a).find(v=>v.tagName==='strong');if(answer&&content(answer).trim()!==n.value.trim()&&parent.tagName==='li')reason='quiz distractor; correct answer and explanation are in this fieldset';}
  if(a.tagName==='a'&&/youtube\.com|youtu\.be/.test(a.attrs?.find((x:any)=>x.name==='href')?.value||'')&&/algorithmic.*price delivery/i.test(n.value))reason='attributed source-video title, not a claim by the page';
  // A quoted metric myth is not an endorsement when its own visible answer
  // immediately limits it. Require both semantic context and a conditional reply;
  // a quotation, class name or unrelated caveat alone never exempts a promise.
  if(/^["“].*win[ -]rate.*["”]$/i.test(n.value.trim())){
   const conditional=(v:any)=>v&&/^Only if\b/i.test(content(v).trim())&&content(v).trim().length>15&&content(v).trim().length<350;
   if(a.tagName==='tr'){
    const cells=(a.childNodes||[]).filter((v:any)=>['th','td'].includes(v.tagName));let table=a.parentNode;while(table&&table.tagName!=='table')table=table.parentNode;
    const headings=table&&descendants(table).find(v=>v.tagName==='thead');const labels=headings&&descendants(headings).filter(v=>v.tagName==='th').map(content).map(v=>v.trim().toLowerCase());
    if(labels?.[0]==='myth'&&labels?.[1]==='reality'&&content(cells[0]).trim()===n.value.trim()&&conditional(cells[1]))reason='quoted metric myth paired with its own conditional reality cell';
   }
   if(a.tagName==='details'){
    const summary=descendants(a).find(v=>v.tagName==='summary'),reply=(a.childNodes||[]).find((v:any)=>v.tagName==='p');let figure=a.parentNode;while(figure&&figure.tagName!=='figure')figure=figure.parentNode;
    const caption=figure&&descendants(figure).find(v=>v.tagName==='figcaption');
    if(summary&&content(summary).trim()===n.value.trim()&&conditional(reply)&&caption&&/myth.*reality/i.test(content(caption)))reason='quoted metric myth with its conditional reply and explicit myth/reality caption';
   }
  }
 if(/[?؟]$/.test(n.value.trim())&&a.tagName==='fieldset'&&cls.includes('chapter-quiz-question')){const answer=descendants(a).find(v=>v.tagName==='strong');if(answer&&/^(?:no[. ,]|نہیں)/i.test(content(answer).trim()))reason='quiz question with an explicit negative correct answer in the same fieldset';}
  if(/win[ -]rate/i.test(n.value)&&n.value.trim().length<80&&!/highest|profit|wealthy|guarantee|\d\s*%/i.test(n.value)){
   let support:any;
   if(/^h[1-6]$/.test(a.tagName)){const siblings=a.parentNode?.childNodes||[];support=siblings.slice(siblings.indexOf(a)+1).find((v:any)=>v.tagName);}
   if(a.tagName==='a'){const href=a.attrs?.find((v:any)=>v.name==='href')?.value;if(href?.startsWith('#')){const target=descendants(doc).find(v=>v.attrs?.some((x:any)=>x.name==='id'&&x.value===href.slice(1)));support=target&&descendants(target).find(v=>v.tagName==='p');}}
   if(support&&support.tagName!=='p')support=descendants(support).find(v=>v.tagName==='p');
   if(support?.tagName==='p'&&caveat.test(content(support))&&content(support).length<2500)reason='neutral metric heading/link qualified by its own adjacent or linked explanation';
  }
 }check(n.value,context,f,n.sourceCodeLocation?.startLine||1,reason);
 }if(n.tagName==='meta'){const attrs=Object.fromEntries(n.attrs.map((a:any)=>[a.name,a.value]));if(attrs.content)check(attrs.content,attrs.content,f,n.sourceCodeLocation?.startLine||1);}for(const c of n.childNodes||[])visit(c,n);}visit(doc,doc);
 }else if(f.endsWith('.json')){try{json(JSON.parse(source),f,1);}catch(e){if(e instanceof SyntaxError)throw Error('Invalid JSON '+f);throw e;}}else source.split('\n').forEach((s,i)=>check(s,s,f,i+1));
}}
function json(value:any,file:string,line:number){
 if(typeof value==='string')check(value,value,file,line);
 else if(value&&typeof value==='object')for(const [k,v]of Object.entries(value)){
  // A structured FAQ question is evaluated with its actual accepted answer,
  // just as the visible details element is. Other strings stay sentence-local.
  if(k==='name'&&value['@type']==='Question'&&typeof v==='string'&&value.acceptedAnswer?.text){check(v,v+' '+value.acceptedAnswer.text,file,line);continue;}
  check(k,k,file,line);json(v,file,line);
 }
}
walk(process.env.PRERENDER_OUT_DIR||'dist');fs.mkdirSync('outputs/practice-performance',{recursive:true});fs.writeFileSync('outputs/practice-performance/claims-scan.json',JSON.stringify({findings,contextualCaveats:reviewed},null,2));
if(findings.length){for(const f of findings.slice(0,30))console.error(`${f.file}:${f.line} [${f.rule}] ${f.context}`);throw Error(`${findings.length} emitted claim warnings; see outputs/practice-performance/claims-scan.json`);}
console.log(`Emitted claims passed; ${reviewed.length} sentence-level caveats reviewed, no file/route allowlist.`);
