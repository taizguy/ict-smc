import fs from 'node:fs';
import {pageSnapshots,applySitemapDates} from './sitemap-dates';
import {legacyPracticeMetadata} from '../src/data/legacyPracticeMetadata';
const file='src/data/page-revisions.json',history=JSON.parse(fs.readFileSync(file,'utf8')),current=pageSnapshots('dist');
const allowed=new Set([...Object.keys(legacyPracticeMetadata),'/tools/chartlab/','/tools/delivery-suite/','/tools/simulator/','/tools/backtest/'].flatMap(p=>[p,'/ur'+p]));
const changed=[];
for(const pathname of allowed){const page=current[pathname];if(!page)throw Error('Absent revision route '+pathname);if(history.pages[pathname]?.fingerprint===page.fingerprint)continue;history.pages[pathname]={...page,lastmod:'2026-11-05',evidence:'Practice claims/metadata and native reading parity revision; see docs/practice-performance-report.md and outputs/practice-performance/final-build.log.'};changed.push(pathname);}
fs.writeFileSync(file,JSON.stringify(history,null,2)+'\n');const record='outputs/practice-performance/revisions.json',previous=fs.existsSync(record)?JSON.parse(fs.readFileSync(record,'utf8')):{changed:[]};fs.writeFileSync(record,JSON.stringify({date:'2026-11-05',changed:[...new Set([...previous.changed,...changed])],lastRunChanged:changed},null,2));applySitemapDates('dist');console.log('Recorded only changed practice fingerprints: '+changed.length);
