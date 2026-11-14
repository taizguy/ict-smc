import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse,parseFragment,serialize} from 'parse5';
import {BreakDocumentContent} from '../src/components/BreakDocumentContent';
import {TranslationProvider} from '../src/i18n/TranslationProvider';
import {urdu} from '../src/i18n/urdu';
import {breakTranslations} from '../src/data/chapters/breakTranslations';
import {breakPaths} from '../src/data/chapters/breakDocuments';
export function localizeBreakDocument(html:string,pathname:string){
 const topic=pathname===breakPaths.bos?'bos':pathname===breakPaths.choch?'choch':undefined;if(!topic)return html;
 const doc=parse(html) as any,find=(n:any):any=>n.attrs?.some((a:any)=>a.name==='class'&&a.value.split(' ').includes('break-document'))?n:(n.childNodes||[]).map(find).find(Boolean),old=find(doc);if(!old)throw Error(`Missing ${topic} document`);
 const markup=renderToStaticMarkup(createElement(TranslationProvider,{locale:'ur',catalog:{...urdu,...breakTranslations},children:createElement(BreakDocumentContent,{topic,staticOnly:true})}));
 const replacement=(parseFragment(markup) as any).childNodes[0];replacement.attrs.push({name:'data-native-locale',value:'ur'});replacement.parentNode=old.parentNode;old.parentNode.childNodes[old.parentNode.childNodes.indexOf(old)]=replacement;return serialize(doc);
}
