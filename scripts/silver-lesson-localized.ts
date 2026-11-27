import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse,parseFragment,serialize} from 'parse5';
import {SilverLessonContent} from '../src/components/SilverLessonContent';
import {TranslationProvider} from '../src/i18n/TranslationProvider';
import {urdu} from '../src/i18n/urdu';
import {silverLessonTranslations} from '../src/data/chapters/silverLessonTranslations';
import {silverLessonPath} from '../src/data/chapters/silverBulletLesson';
/** Translate whole sentences before inserting links: no fragment-by-fragment Urdu. */
export function localizeSilverLessonDocument(html:string,pathname:string){
 if(pathname!==silverLessonPath)return html;
 const doc=parse(html) as any;
 const find=(n:any):any=>n.attrs?.some((a:any)=>a.name==='class'&&a.value.split(' ').includes('silver-lesson-document'))?n:(n.childNodes||[]).map(find).find(Boolean);
 const old=find(doc);if(!old)throw new Error('Chapter 64 article body missing');
 const markup=renderToStaticMarkup(createElement(TranslationProvider,{locale:'ur',catalog:{...urdu,...silverLessonTranslations},children:createElement(SilverLessonContent,{staticOnly:true})}));
 const replacement=(parseFragment(markup) as any).childNodes[0];replacement.attrs.push({name:'data-native-locale',value:'ur'});
 const parent=old.parentNode;replacement.parentNode=parent;parent.childNodes[parent.childNodes.indexOf(old)]=replacement;
 return serialize(doc);
}
