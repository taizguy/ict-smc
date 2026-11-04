import fs from 'node:fs';
import ts from 'typescript';
import {SIMULATOR_MODELS,BACKTEST_STRATEGIES} from '../src/utils/workbenchToolRoutes';
import {remainingCases} from '../src/data/chartLabRemaining';
fs.mkdirSync('outputs/practice-loop',{recursive:true});
const pairs=new Map<string,string>();
for(const file of ['src/data/practiceLoopContent.ts','src/data/practiceCases.ts','src/components/practice/PracticeLoop.tsx','src/components/practice/PracticeLoopPage.tsx','src/components/practice/PracticeReading.tsx']){
 const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 const literal=(n:ts.Node)=>ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n);
 const add=(a:ts.Node,b:ts.Node)=>{if(literal(a)&&literal(b)&&/[\u0600-\u06ff]/.test(b.text))pairs.set(a.text,b.text);};
 const visit=(n:ts.Node)=>{if(ts.isCallExpression(n)&&['p','T'].includes(n.expression.getText(source))&&n.arguments.length===2)add(n.arguments[0],n.arguments[1]);if(ts.isArrayLiteralExpression(n)&&n.elements.length===2)add(n.elements[0],n.elements[1]);if(ts.isConditionalExpression(n))add(n.whenFalse,n.whenTrue);ts.forEachChild(n,visit);};visit(source);
}
const homePairs=[['Four steps. One practice loop.','چار مرحلے۔ مشق کا ایک سلسلہ۔'],['See it. Plan it. Decide it. Test it.','دیکھیں۔ منصوبہ بنائیں۔ فیصلہ کریں۔ جانچیں۔'],['Plan the risk','رسک کا منصوبہ بنائیں'],['Turn a fictional setup into a risk plan and a session time.','فرضی سیٹ اپ سے رسک کا منصوبہ اور سیشن کا وقت طے کریں۔']];
homePairs.forEach(([en,ur])=>pairs.set(en,ur));
fs.writeFileSync('src/i18n/practice-loop-urdu.json',JSON.stringify(Object.fromEntries(pairs),null,2)+'\n');
// This contextual link-label correction is reviewed here but deliberately does
// not overwrite the global glossary catalogue or alter legacy lesson wording.
const reviewPairs=[...pairs.entries(),['Sell-side liquidity','سیل سائیڈ لیکویڈیٹی (Sell-side liquidity)']];
const csv=(s:string)=>'"'+s.replaceAll('"','""')+'"';fs.writeFileSync('docs/practice-loop-urdu-review.csv','\uFEFFEnglish,Urdu\n'+reviewPairs.map(([en,ur])=>csv(en)+','+csv(ur)).join('\n')+'\n');
// A valid downloadable template copies 40 existing authored BTC context bars; no new prices/times.
const bars=remainingCases.find(c=>c.id==='b-a')!.groups[0].bars.slice(0,40);fs.mkdirSync('public/downloads',{recursive:true});fs.writeFileSync('public/downloads/practice-ohlc-template.csv','time,open,high,low,close\n'+bars.map(b=>[b.time,b.open,b.high,b.low,b.close].join(',')).join('\n')+'\n');
console.log(`${pairs.size} bilingual pairs; ${bars.length} unchanged synthetic CSV bars exported.`);
