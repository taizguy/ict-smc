import fs from 'node:fs';
import {pageSnapshots,applySitemapDates} from './sitemap-dates';
const file='src/data/page-revisions.json',ledger=JSON.parse(fs.readFileSync(file,'utf8')),pages=pageSnapshots('dist');
const changed:string[]=[];
for(const slug of ['macro-clock','ote-calculator','judas-planner','learning-path'])for(const prefix of ['','/ur']){
 const pathname=prefix+'/tools/delivery-suite/'+slug+'/',page=pages[pathname];
 if(!page)throw Error('Missing delivery module '+pathname);
 if(ledger.pages[pathname]?.fingerprint===page.fingerprint)continue;
 ledger.pages[pathname]={...page,lastmod:'2026-11-05',evidence:'Shared practice-loop module interface and native bilingual reading; docs/delivery-interface-followup.md.'};changed.push(pathname);
}
fs.writeFileSync(file,JSON.stringify(ledger,null,2)+'\n');applySitemapDates('dist');
fs.writeFileSync('outputs/practice-performance/delivery-ui-revisions.json',JSON.stringify({changed},null,2));console.log('Updated changed delivery module fingerprints only: '+changed.length);
