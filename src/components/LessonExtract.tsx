import type {ReactNode} from 'react';
import {useTranslation} from '../i18n/TranslationProvider';

/** Explicitly scoped microdata; visible prose remains the source of truth. */
export function LessonExtract({name,kind='definition',children}:{name:string;kind?:'definition'|'formula'|'heuristic';children:ReactNode}){
 const {t}=useTranslation();
 return <div className={`lesson-extract lesson-extract-${kind}`} data-lesson-extract={kind} itemScope itemType={`https://schema.org/${kind==='heuristic'?'CreativeWork':'DefinedTerm'}`}><meta itemProp="name" content={t(name)}/>{children}</div>;
}
