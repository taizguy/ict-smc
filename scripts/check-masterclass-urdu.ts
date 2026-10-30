import fs from 'node:fs';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {journalEditions} from '../src/data/masterclassJournal';
import {MasterclassJournal} from '../src/components/MasterclassJournal';
import {urdu} from '../src/i18n/urdu';
import {localizeHtml} from './localized-html';
import {masterclassCollection} from '../src/data/masterclassData';
import {getMasterclassUrl} from '../src/utils/workbenchToolRoutes';
const missing=new Set<string>();
for(const lesson of Object.values(journalEditions)){
 const path=getMasterclassUrl(masterclassCollection.find(m=>m.number===lesson.number)!);
 const body=renderToStaticMarkup(createElement(MasterclassJournal,{lesson}));
 const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
 const html=`<html><head><title>${esc(lesson.title)}</title><meta name="description" content="${esc(lesson.description)}"><meta property="og:image:alt" content="${esc(lesson.h1+' — original LearnSMC teaching illustration')}"></head><body>${body}</body></html>`;
 localizeHtml(html,path,urdu,{onMissing:s=>missing.add(s)});
}
fs.mkdirSync('outputs/masterclass-journal',{recursive:true});
fs.writeFileSync('outputs/masterclass-journal/missing-urdu.json',JSON.stringify([...missing],null,2));
console.log(`Masterclass missing translation segments: ${missing.size}`);
