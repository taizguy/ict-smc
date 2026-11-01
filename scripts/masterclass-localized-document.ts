import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse,parseFragment,serialize} from 'parse5';
import {MasterclassJournal} from '../src/components/MasterclassJournal';
import {TranslationProvider} from '../src/i18n/TranslationProvider';
import {urdu} from '../src/i18n/urdu';
import {masterclassJournalForPath} from '../src/utils/masterclassJournalRoutes';

/** Translate complete sentences before inserting contextual anchors, as runtime does. */
export function localizeMasterclassDocument(source:string,pathname:string){
 const lesson=masterclassJournalForPath(pathname);
 if(!lesson)return source;
 const doc=parse(source) as any;
 const find=(node:any):any=>node.attrs?.some((a:any)=>a.name==='class'&&a.value.split(' ').includes('mc-journal'))?node:(node.childNodes||[]).map(find).find(Boolean);
 const target=find(doc);
 if(!target)throw new Error(`Masterclass document missing: ${pathname}`);
 const markup=renderToStaticMarkup(createElement(TranslationProvider,{locale:'ur',catalog:urdu,children:createElement(MasterclassJournal,{lesson})}));
 const replacement=parseFragment(markup).childNodes[0] as any;
 replacement.attrs.push({name:'data-native-locale',value:'ur'});
 const parent=target.parentNode,index=parent.childNodes.indexOf(target);
 parent.childNodes[index]=replacement;replacement.parentNode=parent;
 return serialize(doc);
}
