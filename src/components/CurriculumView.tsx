import {textbookChapters} from '../data/chaptersData';
import {topicClusters} from '../utils/topicClusters';
import {chapterIllustrationRevision} from '../data/chapters/diagrams';
import {ArrowRight,ArrowUpRight} from 'lucide-react';
import {withoutLocale} from '../i18n/locale';
import {useTranslation} from '../i18n/TranslationProvider';
import {ChapterDiagram} from './ChapterDiagram';
import {MentorshipsView,MentorshipsTeaser} from './MentorshipsView';
import {TopicJourneyLinks} from './TopicLearningGuide';
import {SearchFocusGuide} from './SearchFocusGuide';
import {ReadingRoomLayout,ReadingTitle,readingPartTitle} from './ReadingRoomLayout';
import {conciseHeading} from '../utils/searchMetadata';
import {AccentText} from './AccentText';
interface CurriculumViewProps{onSelectChapter:(id:number,slug?:string)=>void;onOpenSearch:()=>void;path?:string;}
export function CurriculumView({onSelectChapter,onOpenSearch,path:providedPath}:CurriculumViewProps){
 const {t,href}=useTranslation();
 const path=withoutLocale(providedPath||(typeof window==='undefined'?'/curriculum/':window.location.pathname));
 const mentorship=path.match(/^\/curriculum\/mentorships(?:\/([^/]+))?\/?$/);
 const topic=topicClusters.find(p=>path===`/curriculum/${p.slug}/`);
 const is2026=topic?.slug==='the-2026-ict-smart-money-concepts-master-lectures-tape-reading-series';
 const groups=topic?[topic]:topicClusters;
 const lesson=(c:typeof textbookChapters[number])=><a key={c.id} className="rr-lesson-row" href={href(`/learn/${c.slug}/`)} onClick={e=>{if(!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&e.button===0){e.preventDefault();onSelectChapter(c.id,c.slug);}}}><span className="rr-number">{String(c.id).padStart(2,'0')}</span><ReadingTitle text={c.title}/><ArrowUpRight size={16}/></a>;
 return <ReadingRoomLayout path={path}>{mentorship?<MentorshipsView slug={mentorship[1]}/>:<div className="rr-curriculum">
  <div className="rr-masthead"><span><span translate="no">LearnSMC</span> / <span>{t('The open textbook')}</span></span><span><bdi>{topic?topic.chapters.length:textbookChapters.length}</bdi> <span>{t('Chapters')}</span> · <bdi>{topic?1:topicClusters.length}</bdi> <span>{t('Parts')}</span></span></div>
  {topic?<header className="rr-topic-hero"><p className="rr-eyebrow">{t('Learning paths')}</p><h1>{t(is2026?'ICT 2026 Mentorship: From Preparation to Replay':readingPartTitle(topic.part))}</h1><p>{t(is2026?"Follow the ICT 2026 mentorship through twelve standalone lessons: preparation, pre-market and first-hour ranges, opening gaps, daily-to-intraday context, advanced FVG studies, Obsidian and replay management.":'Study ICT and Smart Money Concepts with free lessons, original diagrams and chart exercises. Start with market foundations, then learn structure, liquidity and price patterns at your own pace.')}</p>{topic.guidance.map((p,i)=><p key={i}>{t(p)}</p>)}{is2026&&<p><a href={href('/curriculum/mentorships/2026/')}>{t('Explore the original 2026 source library')}</a> · <span>{t('Editorial review')}</span>: <time dateTime="2026-10-27">{t('27 October 2026')}</time></p>}{topic.slug==='ict-2025-official-mentorship-curriculum'&&<p><a href={href('/curriculum/mentorships/2025/')}>{t('Explore all 83 original recordings')}</a> · <span>{t('Editorial review')}</span>: <time dateTime="2026-10-26">{t('26 October 2026')}</time></p>}</header>:<header className="rr-hub-hero"><div><p className="rr-eyebrow">{t('Curriculum')}</p><h1><AccentText text='A quieter place to understand price.' focus='price.' urduFocus='قیمت' tone='coral'/></h1><p>{t('A textbook to read slowly. A set of ideas to question. Begin with the basics, then follow the parts in order or find the concept you need.')}</p><a className="rr-primary" href={href(`/learn/${textbookChapters[0].slug}/`)}>{t('Start with the foundations')}<ArrowRight size={18}/></a></div><a className="rr-book" href={href('/learn/fair-value-gaps-fvg-and-consequent-encroachment/')} aria-label={t('Open chapter')}><small translate="no">LearnSMC / III</small><strong>{t('See the space between.')}</strong><ChapterDiagram chapterId={13} thumbnail/><span><span>{t('Price Delivery')}</span> · <span translate="no">FVG</span> <ArrowUpRight size={20}/></span></a></header>}
  <div className="rr-contents-heading"><h2>{t('Table of contents')}</h2><button onClick={onOpenSearch}>{t('Search')} <span aria-hidden="true">⌘K</span></button></div>
  <div className="rr-parts">{groups.map(p=><section className="rr-part" key={p.slug}><div><a href={href(`/curriculum/${p.slug}/`)}><span className="rr-number">{String(topicClusters.indexOf(p)+1).padStart(2,'0')}</span><h2>{topic?t('Chapters'):t(readingPartTitle(p.part))}</h2></a><p><bdi>{p.chapters.length}</bdi> <span>{t('Chapters')}</span></p></div><div>{p.chapters.map(lesson)}</div></section>)}</div>
  <div className="rr-support"><MentorshipsTeaser/><TopicJourneyLinks/><SearchFocusGuide kind="curriculum"/><section><h2>{t('How to study a chapter')}</h2><p>{t('Read the definition, identify its conditions on a historical chart, and record an example where the pattern fails. Hide future candles to reduce hindsight bias. Keep observations separate from assumptions about institutional intent.')}</p><p>{t('Page updated')}: <time dateTime={is2026?'2026-10-27':chapterIllustrationRevision.iso}>{t(is2026?'27 October 2026':chapterIllustrationRevision.label)}</time>. <a href={href('/about/#editorial-policy')}>{t('Editorial policy')}</a>.</p></section></div>
 </div>}</ReadingRoomLayout>;
}
export default CurriculumView;
