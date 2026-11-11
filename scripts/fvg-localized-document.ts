import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse,parseFragment,serialize} from 'parse5';
import {FvgDocumentContent} from '../src/components/FvgDocumentContent';
import {TranslationProvider} from '../src/i18n/TranslationProvider';
import {urdu} from '../src/i18n/urdu';
import {fvgDocumentPath} from '../src/data/chapters/fvgDocument';
/** Translate whole sentences before inserting links: no fragment-by-fragment Urdu. */
export function localizeFvgDocument(html:string,pathname:string){
 if(pathname!==fvgDocumentPath)return html;
 const doc=parse(html) as any;
 const find=(n:any):any=>n.attrs?.some((a:any)=>a.name==='class'&&a.value.split(' ').includes('fvg-document'))?n:(n.childNodes||[]).map(find).find(Boolean);
 const old=find(doc);if(!old)throw new Error('Chapter 26 FVG article body missing');
 const markup=renderToStaticMarkup(createElement(TranslationProvider,{locale:'ur',catalog:urdu,children:createElement(FvgDocumentContent,{staticOnly:true})}));
 const replacement=(parseFragment(markup) as any).childNodes[0];replacement.attrs.push({name:'data-native-locale',value:'ur'});
 const parent=old.parentNode;replacement.parentNode=parent;parent.childNodes[parent.childNodes.indexOf(old)]=replacement;
 return serialize(doc);
}
