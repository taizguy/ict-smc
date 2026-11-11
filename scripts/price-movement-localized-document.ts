import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse,parseFragment,serialize} from 'parse5';
import {PriceMovementContent} from '../src/components/PriceMovementContent';
import {TranslationProvider} from '../src/i18n/TranslationProvider';
import {urdu} from '../src/i18n/urdu';
import {priceMovementPath} from '../src/data/chapters/priceMovementLesson';
/** Preserve native Urdu sentence boundaries around linked terms and table cells. */
export function localizePriceMovementDocument(html:string,pathname:string){
 if(pathname!==priceMovementPath)return html;
 const doc=parse(html) as any;
 const find=(n:any):any=>n.attrs?.some((a:any)=>a.name==='class'&&a.value.split(' ').includes('pm-content'))?n:(n.childNodes||[]).map(find).find(Boolean);
 const old=find(doc);if(!old)throw new Error('Chapter 01 article body missing');
 const markup=renderToStaticMarkup(createElement(TranslationProvider,{locale:'ur',catalog:urdu,children:createElement(PriceMovementContent,{staticOnly:true})}));
 const replacement=(parseFragment(markup) as any).childNodes[0];replacement.attrs.push({name:'data-native-locale',value:'ur'});
 const parent=old.parentNode;replacement.parentNode=parent;parent.childNodes[parent.childNodes.indexOf(old)]=replacement;
 return serialize(doc);
}
