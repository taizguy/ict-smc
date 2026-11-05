import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const retired=JSON.parse(fs.readFileSync('src/i18n/retired-practice-strings.json','utf8')).filter(s=>s.length>80),matches=[];let checked=0;
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,e.name);if(e.isDirectory())walk(file);else if(/\.(html|js|json|txt|svg|xml)$/.test(file)){checked++;const source=fs.readFileSync(file,'utf8');for(const value of retired)if(source.includes(value)||source.includes(JSON.stringify(value).slice(1,-1)))matches.push({file,value});}}}
walk('dist');fs.mkdirSync('outputs/practice-performance',{recursive:true});
fs.writeFileSync('outputs/practice-performance/retired-taxonomy-proof.json',JSON.stringify({retiredDescriptions:retired.length,emittedFilesScanned:checked,matches,coverage:'HTML/JSON-LD, JS, JSON/catalogues/search, TXT/llms, SVG/social source text and XML/sitemaps. PNG card text is generated from verified current metadata; not OCR.'},null,2));
assert.ok(retired.length>=12,'Retired taxonomy description guard lost entries');assert.deepEqual(matches,[],'Retired marketing descriptions must never be emitted');console.log(retired.length+' retired taxonomy descriptions absent from '+checked+' emitted text assets.');
