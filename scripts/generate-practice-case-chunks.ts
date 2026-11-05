import fs from 'node:fs';
import {remainingCases} from '../src/data/chartLabRemaining';import {silverCases} from '../src/data/silverBulletStudy';import {breakerCases} from '../src/data/breakerStudy';import {learningCases} from '../src/data/learningCases';
const families={remaining:remainingCases,silver:silverCases,breaker:breakerCases,guided:learningCases},index:Record<string,unknown[]>={};let total=0;
for(const [family,cases]of Object.entries(families)){const dir='src/data/runtime/practice-cases/'+family;fs.mkdirSync(dir,{recursive:true});index[family]=cases.map(c=>{if(!/^[a-z0-9-]+$/i.test(c.id))throw Error('Unsafe case id');fs.writeFileSync(dir+'/'+c.id+'.json',JSON.stringify(c)+'\n');total++;return {id:c.id,name:c.name};});}
if(total!==35)throw Error('Expected 29 spine and six generic cases');fs.writeFileSync('src/data/practiceCaseIndex.generated.json',JSON.stringify(index,null,2)+'\n');console.log('35 exact per-case chunks; candle-free chooser metadata.');

const {chartScenarios}=await import('../src/data/chartScenarios');fs.writeFileSync('src/data/chartScenarioCatalog.generated.json',JSON.stringify(chartScenarios.map(({id,title,asset,description})=>({id,title,asset,description})),null,2)+'\n');
