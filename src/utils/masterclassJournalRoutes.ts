import {withoutLocale} from '../i18n/locale';
import {journalEditions} from '../data/masterclassJournal';
import {masterclassCollection} from '../data/masterclassData';
import {getMasterclassUrl} from './workbenchToolRoutes';
export function masterclassJournalForPath(path:string,allowDraft=false){
 const item=masterclassCollection.find(m=>getMasterclassUrl(m)===withoutLocale(path));
 const edition=item&&journalEditions[item.number];
 return edition&&(allowDraft||edition.release==='approved')?edition:undefined;
}
