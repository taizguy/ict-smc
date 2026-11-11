import {originalTextbookChapters} from '../data/chaptersData';
import {mergedChapterIds} from '../data/curriculumPhase1';
import {deliverySupport} from '../data/chapters/deliverySupport';
import {ChapterDiagram} from './ChapterDiagram';
import {ChapterQuiz} from './ChapterQuiz';
import {DeliveryLessonFigure,DeliveryLessonWorkshop,hasDeliveryEdition} from './DeliveryLessonFigure';
import {useTranslation} from '../i18n/TranslationProvider';

/** Retain source exercises and data, not just paragraphs, during a curriculum merge. */
export function MergedCurriculumFeatures({chapterId,staticOnly=false}:{chapterId:number;staticOnly?:boolean}){
 const {t}=useTranslation();
 const absorbed=originalTextbookChapters.filter(c=>mergedChapterIds[c.id]===chapterId);
 if(!absorbed.length&&chapterId!==41)return null;
 return <section className="rr-related-reading" aria-label={t('Additional studies and exercises')}>
 <h2>{t('Additional studies and exercises')}</h2>{chapterId===41&&<ChapterDiagram chapterId={28} illustrationSourceId={28} staticOnly={staticOnly}/>}
 {absorbed.map(source=><section data-merged-study={source.id} key={source.id} id={`merged-${source.id}-practice`}>
 <h3>{t(source.title)}</h3>
 <p>{t(source.quote)}</p>
 {hasDeliveryEdition(source.id)?<>
 {!hasDeliveryEdition(chapterId)&&source.sections.map((s,i)=><DeliveryLessonFigure key={s.id} chapterId={source.id} section={i} staticOnly={staticOnly}/>)}

 </>:!(chapterId===28&&source.id===32)&&<ChapterDiagram chapterId={source.id} staticOnly={staticOnly}/>}
 <ChapterQuiz chapter={source} staticOnly={staticOnly} heading={false}/>
 {deliverySupport[source.id]&&<>
 <h3>{t(deliverySupport[source.id].heading)}</h3>
 <div className="delivery-table-scroll" role="region" tabIndex={0} aria-label={t(deliverySupport[source.id].heading)}><table><caption>{t(deliverySupport[source.id].heading)}</caption><thead><tr>{deliverySupport[source.id].columns.map(c=><th key={c} scope="col">{t(c)}</th>)}</tr></thead><tbody>{deliverySupport[source.id].rows.map((row,i)=><tr key={i}>{row.map((v,j)=>j===0?<th scope="row" key={j}>{t(v)}</th>:<td key={j}>{t(v)}</td>)}</tr>)}</tbody></table></div><p>{t(deliverySupport[source.id].note)}</p>
 {deliverySupport[source.id].faqs.map(f=><details key={f.question}><summary>{t(f.question)}</summary><p>{t(f.answer)}</p></details>)}
 </>}
 </section>)}
 </section>;
}
