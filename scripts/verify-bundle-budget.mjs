import fs from 'node:fs';
import {gzipSync,brotliCompressSync,constants} from 'node:zlib';
const policy=JSON.parse(fs.readFileSync('scripts/performance-budgets.json','utf8'));
const chunks=JSON.parse(fs.readFileSync('outputs/practice-performance/latest/bundle.json','utf8')),byFile=new Map(chunks.map(c=>[c.file,c])),seen=new Set();
function visit(c){if(!c||seen.has(c.file))return;seen.add(c.file);c.imports.forEach(f=>visit(byFile.get(f)));}
chunks.filter(c=>c.entry).forEach(visit);
const initial=[...seen].map(f=>fs.readFileSync('dist/'+f)),css=fs.readdirSync('dist/assets').filter(f=>/^index-.*\.css$/.test(f)).map(f=>fs.readFileSync('dist/assets/'+f)),sum=(a,fn)=>a.reduce((n,v)=>n+fn(v),0);
const measured={initialJsRaw:sum(initial,v=>v.length),initialJsGzip:sum(initial,v=>gzipSync(v).length),initialJsBrotli:sum(initial,v=>brotliCompressSync(v,{params:{[constants.BROTLI_PARAM_QUALITY]:5}}).length),allJsRaw:sum(chunks,c=>c.bytes),largestJsRaw:Math.max(...chunks.map(c=>c.bytes)),initialCssRaw:sum(css,v=>v.length),initialCssGzip:sum(css,v=>gzipSync(v).length)};
const failures=Object.entries(policy.limits).filter(([k,limit])=>measured[k]>limit).map(([k,limit])=>`${k}: ${measured[k]} bytes > ${limit} bytes`);
fs.writeFileSync('outputs/practice-performance/bundle-budget.json',JSON.stringify({measured,limits:policy.limits,staticEntryFiles:[...seen],failures,override:process.argv.includes('--override')},null,2));
if(failures.length){console.error(failures.join('\n'));if(!process.argv.includes('--override'))throw Error('Bundle budget regression. Review the evidence; --override is an explicit local diagnostic override, not a new baseline.');console.warn('EXPLICIT --override: regression remains recorded.');}else console.log('Bundle budgets passed: '+JSON.stringify(measured));
