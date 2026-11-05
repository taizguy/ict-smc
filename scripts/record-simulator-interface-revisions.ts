import fs from 'node:fs';
import {pageSnapshots,applySitemapDates} from './sitemap-dates';
import references from '../src/data/practiceToolReferences.generated.json';
const file='src/data/page-revisions.json',ledger=JSON.parse(fs.readFileSync(file,'utf8')),pages=pageSnapshots('dist'),changed:string[]=[];
for(const item of references.simulator)for(const prefix of ['','/ur']){const pathname=prefix+'/tools/simulator/'+item.slug+'/',page=pages[pathname];if(!page)throw Error('Missing '+pathname);if(ledger.pages[pathname]?.fingerprint===page.fingerprint)continue;ledger.pages[pathname]={...page,lastmod:'2026-11-05',evidence:'Simulator brief interface, topic-specific applications and explicit shared-dataset separation; docs/simulator-interface-followup.md.'};changed.push(pathname);}
fs.writeFileSync(file,JSON.stringify(ledger,null,2)+'\n');applySitemapDates('dist');fs.writeFileSync('outputs/practice-performance/simulator-ui-revisions.json',JSON.stringify({changed},null,2));console.log('Recorded changed simulator brief fingerprints: '+changed.length);
