import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse,parseFragment,serialize} from 'parse5';
import {StructureDocumentContent} from '../src/components/StructureDocumentContent';
import {TranslationProvider} from '../src/i18n/TranslationProvider';
import {urdu} from '../src/i18n/urdu';
import {structureTranslations} from '../src/data/chapters/structureTranslations';
import {structurePath} from '../src/data/chapters/structureDocument';
/** Translate whole sentences before inserting links: no fragment-by-fragment Urdu. */
export function localizeStructureDocument(html:string,pathname:string){
 if(pathname!==structurePath)return html;
 const doc=parse(html) as any;
 const find=(n:any):any=>n.attrs?.some((a:any)=>a.name==='class'&&a.value.split(' ').includes('structure-document'))?n:(n.childNodes||[]).map(find).find(Boolean);
 const old=find(doc);if(!old)throw new Error('Chapter 10 article body missing');
 const markup=renderToStaticMarkup(createElement(TranslationProvider,{locale:'ur',catalog:{...urdu,...structureTranslations},children:createElement(StructureDocumentContent,{staticOnly:true})}));
 const replacement=(parseFragment(markup) as any).childNodes[0];replacement.attrs.push({name:'data-native-locale',value:'ur'});
 const parent=old.parentNode;replacement.parentNode=parent;parent.childNodes[parent.childNodes.indexOf(old)]=replacement;
 return serialize(doc);
}
