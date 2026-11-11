import {ArrowLeft,ArrowRight} from 'lucide-react';
import type {TextbookChapter} from '../types';
import {displayChapterNumber,phase1Parts} from '../data/curriculumPhase1';
import {ReadingRoomLayout,ReadingTitle,readingPartTitle} from './ReadingRoomLayout';
import {useTranslation} from '../i18n/TranslationProvider';

/** Deliberately no lesson widgets, completion control, citations or lesson schema. */
export function CurriculumPlaceholder({chapter,previous,next}:{chapter:TextbookChapter;previous?:TextbookChapter;next?:TextbookChapter}){
 const {t,href}=useTranslation();
 const part=phase1Parts.find(p=>p.part===chapter.part)!;
 return <ReadingRoomLayout path={`/learn/${chapter.slug}/`}><div className="rr-chapter-layout rr-placeholder-layout"><div className="rr-chapter-body chapter-room" data-chapter-status="in-progress">
  <header className="rr-chapter-header"><p className="rr-eyebrow"><a href={href(`/curriculum/${part.slug}/`)}>{t(readingPartTitle(chapter.part))}</a> / <bdi>{String(displayChapterNumber(chapter.id)).padStart(2,'0')}</bdi></p><h1>{t(chapter.title)}</h1><span className="rr-progress-label">{t('In progress')}</span></header>
  <div className="rr-text-content rr-placeholder-notice"><p>{t("We're working on this chapter.")}</p></div>
  <nav className="rr-chapter-navigation" aria-label={t('Chapter navigation')}>{previous?<a href={href(`/learn/${previous.slug}/`)}><ArrowLeft size={17} aria-hidden="true"/><span>{t('Previous')}<strong><ReadingTitle text={previous.title}/></strong></span></a>:<a href={href('/curriculum/')}>{t('All Chapters')}</a>}{next&&<a href={href(`/learn/${next.slug}/`)}><span>{t('Next')}<strong><ReadingTitle text={next.title}/></strong></span><ArrowRight size={17} aria-hidden="true"/></a>}</nav>
 </div></div></ReadingRoomLayout>;
}
