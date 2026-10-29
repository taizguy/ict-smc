import fs from 'node:fs';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {MasterclassJournal,journalSchema} from '../src/components/MasterclassJournal';
import {journalEditions} from '../src/data/masterclassJournal';
import {masterclassCollection} from '../src/data/masterclassData';
import {getMasterclassUrl} from '../src/utils/workbenchToolRoutes';
const e=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
fs.mkdirSync('outputs/masterclass-journal',{recursive:true});
const css=fs.readFileSync('src/styles/masterclass-journal.css','utf8');
for(const lesson of Object.values(journalEditions)){
 const path=getMasterclassUrl(masterclassCollection.find(m=>m.number===lesson.number)!);
 const canonical='https://learnsmc.xyz'+path,image='https://learnsmc.xyz'+lesson.socialImage;
 const body=renderToStaticMarkup(createElement(MasterclassJournal,{lesson}));
 const meta=[['name','description',lesson.description],['property','og:title',lesson.title],['property','og:description',lesson.description],['property','og:type','article'],['property','og:url',canonical],['property','og:image',image],['property','og:image:alt',lesson.h1+' — original LearnSMC teaching illustration'],['name','twitter:card','summary_large_image'],['name','twitter:title',lesson.title],['name','twitter:description',lesson.description],['name','twitter:image',image],['name','twitter:image:alt',lesson.h1+' — original LearnSMC teaching illustration']].map(([attr,key,value])=>`<meta ${attr}="${key}" content="${e(value)}">`).join('');
 fs.writeFileSync(`outputs/masterclass-journal/${lesson.number}.html`,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${e(lesson.title)}</title><link rel="canonical" href="${canonical}">${meta}<script type="application/ld+json">${JSON.stringify(journalSchema(lesson,path)).replace(/</g,'\\u003c')}</script><style>@font-face{font-family:SourceSans;src:url('/fonts/source-sans-3.woff2')}@font-face{font-family:Lora;src:url('/fonts/lora.woff2')}*{box-sizing:border-box}body{margin:0;padding:25px;background:white;color:#202a32;--font-sans:SourceSans,sans-serif;--font-editorial:Lora,Georgia,serif}a{color:#285caa}.mj-controls{display:none!important}${css}</style></head><body>${body}</body></html>`);
 console.log(`Static review document: outputs/masterclass-journal/${lesson.number}.html (no JavaScript required).`);
}
