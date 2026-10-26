import {hasMentorship2025Edition} from '../data/chapters/mentorship2025Visuals';
import { contextualFragments } from '../utils/contextualLinks';
import { DeliveryLessonSupport } from './DeliveryLessonSupport';
import { DeliveryMarketWalkthrough } from './DeliveryMarketWalkthrough';
import { deliverySupportLabels } from '../data/chapters/deliverySupport';
import {lessonParagraphs} from '../utils/lessonText';
import {DeliveryLessonFigure,DeliveryLessonWorkshop,hasDeliveryEdition} from './DeliveryLessonFigure';
import {ReadingRoomLayout,ReadingTitle,readingPartTitle} from './ReadingRoomLayout';
import {useTranslation} from '../i18n/TranslationProvider';
import {chapterReviewRevision} from '../data/curriculumReview';
import { conciseHeading, studyTopics } from '../utils/searchMetadata';
import { FinancialDisclaimer } from './FinancialDisclaimer';
import { CurriculumReview } from './CurriculumReview';
import { ChapterDiagram } from './ChapterDiagram';
import { chapterDiagrams } from '../data/chapters/diagrams';
import { TopicLearningGuide } from './TopicLearningGuide';
import { MentorshipLessonNav } from './MentorshipLessonNav';
import { mentorshipTracks, mentorshipLessonPath, selectedMentorship } from '../data/mentorshipTracks';
import { currentDocumentHref } from '../i18n/navigation';
import { LessonRelatedLinks } from './LessonRelatedLinks';
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Zap, 
  Eye, 
  Compass, 
  ChevronDown,
  Sparkles,
  Share2,
  Check,
  Bookmark,
  BookmarkCheck,
  ShieldAlert,
  Edit3,
  Save,
  AlertTriangle
} from 'lucide-react';
import { textbookChapters } from '../data/chaptersData';
import { getLessonCanonicalUrl } from '../utils/url';
import { ChapterQuiz } from './ChapterQuiz';
import { ChapterSection } from '../types';
import { BauhausNavScroller } from './BauhausNavScroller';
import { ScrollReveal } from './ScrollReveal';
import { ContextualInternalLinker } from './ContextualInternalLinker';

interface ChapterRoomProps {
  chapterId: number;
  onSelectChapter: (chapterId: number, slug?: string) => void;
  onReturnToMap: () => void;
  onCompleteChapter?: (chapterId: number) => void;
  isCompleted?: boolean;
  staticOnly?: boolean;
}

export const ChapterRoom: React.FC<ChapterRoomProps> = ({
  chapterId,
  onSelectChapter: selectFromApp,
  onReturnToMap,
  onCompleteChapter,
  isCompleted = false,
  staticOnly = false
}) => {
  const {t,href,locale}=useTranslation();
  const pathSlug = typeof window === 'undefined' ? null : selectedMentorship(window.location);
  const studyTrack = mentorshipTracks.find(t => t.slug === pathSlug && t.chapterIds.includes(chapterId));
  const orderedChapters = useMemo(() => studyTrack ? studyTrack.chapterIds.map(id => textbookChapters.find(c => c.id === id)).filter(Boolean) : textbookChapters, [studyTrack]);
  const onSelectChapter = (id:number, slug?:string) => {
    const selected = textbookChapters.find(c => c.id === id);
    if (studyTrack && selected && studyTrack.chapterIds.includes(id)) window.location.assign(currentDocumentHref(mentorshipLessonPath(selected.slug, studyTrack.slug)));
    else selectFromApp(id, slug);
  };
  const [activeScene, setActiveScene] = useState<'text' | 'visual' | 'terms' | 'checkpoint' | 'briefing'>('text');
  const [quizAttempt, setQuizAttempt] = useState<Record<string, number>>({});
  const [expandedSimpler, setExpandedSimpler] = useState<Record<number, boolean>>({});
  const [hasCopiedLink, setHasCopiedLink] = useState<boolean>(false);
  
  // Personal Learning Workspace: Bookmarks & Study Notes (LocalStorage)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userNote, setUserNote] = useState<string>('');
  const [savedNoteStatus, setSavedNoteStatus] = useState<boolean>(false);

  // Instantly reset scroll to top and hydrate bookmarks/notes on chapter load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveScene('text');
    setQuizAttempt({});
    setExpandedSimpler({});
    setHasCopiedLink(false);
    try {
      const raw = localStorage.getItem('learnsmc_bookmarked_chapters');
      const bmarks = raw ? JSON.parse(raw) : [];
      setIsBookmarked(Array.isArray(bmarks) && bmarks.includes(chapterId));

      const note = localStorage.getItem(`learnsmc_note_ch_${chapterId}`) || '';
      setUserNote(note);
      setSavedNoteStatus(false);
    } catch {}
  }, [chapterId]);

  const handleToggleBookmark = () => {
    try {
      const raw = localStorage.getItem('learnsmc_bookmarked_chapters');
      let bmarks: number[] = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(bmarks)) bmarks = [];
      if (bmarks.includes(chapterId)) {
        bmarks = bmarks.filter(id => id !== chapterId);
        setIsBookmarked(false);
      } else {
        bmarks.push(chapterId);
        setIsBookmarked(true);
      }
      localStorage.setItem('learnsmc_bookmarked_chapters', JSON.stringify(bmarks));
    } catch {}
  };

  const handleSaveNote = () => {
    try {
      localStorage.setItem(`learnsmc_note_ch_${chapterId}`, userNote);
      setSavedNoteStatus(true);
      setTimeout(() => setSavedNoteStatus(false), 2200);
    } catch {}
  };

  const chapter = useMemo(() => {
    return textbookChapters.find(c => c.id === chapterId) || textbookChapters[0];
  }, [chapterId]);

  const handleCopyChapterLink = () => {
    const url = getLessonCanonicalUrl(chapter.slug);
    navigator.clipboard.writeText(url).then(() => {
      setHasCopiedLink(true);
      setTimeout(() => setHasCopiedLink(false), 2000);
    }).catch(() => {});
  };

  // Chapter boundary helpers
  const prevChapter = useMemo(() => {
    const idx = orderedChapters.findIndex(c => c.id === chapter.id);
    return idx > 0 ? orderedChapters[idx - 1] : null;
  }, [chapter, orderedChapters]);

  const nextChapter = useMemo(() => {
    const idx = orderedChapters.findIndex(c => c.id === chapter.id);
    return idx < orderedChapters.length - 1 ? orderedChapters[idx + 1] : null;
  }, [chapter, orderedChapters]);

  const handleToggleSimpler = (sIdx: number) => {
    setExpandedSimpler(prev => ({
      ...prev,
      [sIdx]: !prev[sIdx]
    }));
  };

  const scenes = [
    { id: 'text', label: '1. Textbook Sections', icon: BookOpen },
    { id: 'visual', label: '2. Interactive Diagram', icon: Eye },
    { id: 'terms', label: '3. Key Terms', icon: Layers },
    { id: 'checkpoint', label: '4. Practice & Quiz', icon: Award },
    { id: 'briefing', label: '5. Summary Briefing', icon: Compass },
  ] as const;

  const chooseScene=(scene:typeof activeScene)=>{setActiveScene(scene);requestAnimationFrame(()=>{const el=document.getElementById('rr-scenes');if(el&&el.getBoundingClientRect().top<0)el.scrollIntoView({block:'start',behavior:'instant'});});};
  const jump=(id:string)=>{setActiveScene('text');requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));};
  const revision=chapterReviewRevision(chapter.id);
  const deliveryLinkedUrls = new Set<string>();
  const deliveryParagraphLinks = hasDeliveryEdition(chapter.id) ? chapter.sections.map(section => lessonParagraphs(section.content).map(paragraph => {
    const fragments = contextualFragments(t(paragraph), `/learn/${chapter.slug}/`, hasMentorship2025Edition(chapter.id)?4:3, deliveryLinkedUrls);
    fragments.forEach(fragment => { if (fragment.href) deliveryLinkedUrls.add(fragment.href); });
    return fragments;
  })) : [];
  return <ReadingRoomLayout path={`/learn/${chapter.slug}/`}><div className="rr-chapter-layout">
    <aside className="rr-local-contents"><p className="rr-eyebrow">{t('On this page')}</p><nav aria-label={t('Chapter sections')}>{chapter.sections.map((sec,i)=><a href={`#rr-section-${i}`} key={sec.id} onClick={e=>{e.preventDefault();jump(`rr-section-${i}`);}}><ReadingTitle text={sec.title} display={sec.title.replace(/^\d+\.\d+\s*/,'')}/></a>)}{hasDeliveryEdition(chapter.id)&&<><a href="#delivery-comparison" onClick={e=>{e.preventDefault();jump('delivery-comparison');}}>{t('Comparison')}</a>{chapter.id===13&&<a href="#delivery-market-cases" onClick={e=>{e.preventDefault();jump('delivery-market-cases');}}>{t(deliverySupportLabels.market)}</a>}<a href="#delivery-faq" onClick={e=>{e.preventDefault();jump('delivery-faq');}}>{t(deliverySupportLabels.faq)}</a></>}<a href="#curriculum-review-heading" onClick={e=>{e.preventDefault();jump('curriculum-review-heading');}}>{t('Sources and interpretation')}</a></nav></aside>
    <div className="rr-chapter-body chapter-room" data-mentorship-2025={hasMentorship2025Edition(chapter.id)?'':undefined}>
      <MentorshipLessonNav chapterId={chapter.id}/>
      <nav className="rr-scenes" id="rr-scenes" aria-label={t('Chapter sections')}>{scenes.map(scene=><button key={scene.id} aria-current={activeScene===scene.id?'page':undefined} onClick={()=>chooseScene(scene.id)}>{t(scene.label)}</button>)}</nav>
      <header className="rr-chapter-header"><p className="rr-eyebrow"><span>{t(readingPartTitle(chapter.part))}</span> / <bdi>{String(chapter.id).padStart(2,'0')}</bdi></p><h1><ReadingTitle text={chapter.title} display={studyTopics[`/learn/${chapter.slug}/`]||conciseHeading(chapter.title)}/></h1><p className="rr-chapter-deck">{t(chapter.quote)}</p><div className="rr-byline"><span className="rr-author-mark" aria-hidden="true">UI</span><div><a href={href('/about/#author')}>Muhammad Umer Ijaz</a><small><span>{t('Editorial review')}</span>: <time dateTime={revision.iso}>{t(revision.label)}</time></small></div><button onClick={handleToggleBookmark} aria-pressed={isBookmarked} aria-label={t(isBookmarked?'Remove chapter from bookmarks':'Bookmark this chapter for quick study')}>{isBookmarked?<BookmarkCheck size={18}/>:<Bookmark size={18}/>}</button><button onClick={handleCopyChapterLink} aria-label={t('Copy direct permanent URL for this chapter')}>{hasCopiedLink?<Check size={18}/>:<Share2 size={18}/>}</button></div></header>
      {(staticOnly||activeScene==='text')&&<div className="rr-text-content">
        {chapter.sections.map((sec,i)=><section id={`rr-section-${i}`} key={sec.id} className="rr-text-section"><span className="rr-eyebrow">{String(i+1).padStart(2,'0')} / {String(chapter.sections.length).padStart(2,'0')}</span><h2><ReadingTitle text={sec.title} display={sec.title.replace(/^\d+\.\d+\s*/,'')}/></h2><div className="rr-prose"><>{staticOnly||hasDeliveryEdition(chapter.id)?lessonParagraphs(sec.content).map((paragraph,j)=><p data-lesson-content="" data-delivery-content={hasDeliveryEdition(chapter.id)?'':undefined} key={j}>{hasDeliveryEdition(chapter.id)?<span translate={locale==='ur'?'no':undefined}>{deliveryParagraphLinks[i][j].map((fragment,k)=>fragment.href?<a key={k} href={href(fragment.href)} className="font-medium text-teal underline underline-offset-4">{fragment.text}</a>:fragment.text)}</span>:staticOnly?paragraph:<ContextualInternalLinker text={paragraph} maxLinks={2}/>}</p>):<ContextualInternalLinker text={sec.content}/>}</></div>{hasDeliveryEdition(chapter.id)&&<DeliveryLessonFigure chapterId={chapter.id} section={i} staticOnly={staticOnly}/>} {sec.keyTakeaway&&<aside className="rr-takeaway"><span>{t('Key takeaway')}</span><p>{t(sec.keyTakeaway)}</p>{!hasDeliveryEdition(chapter.id)&&<details><summary>{t('Explain Simpler')}</summary><p><span>{t('Think of this simply:')}</span> <span>{t(sec.keyTakeaway)}</span></p></details>}</aside>}</section>)}
        {hasDeliveryEdition(chapter.id)&&<DeliveryLessonSupport chapterId={chapter.id} section="comparison"/>}
        {chapter.id===13&&<DeliveryMarketWalkthrough/>}
        {hasDeliveryEdition(chapter.id)?<section className="delivery-study-checklist"><h2>{t('Worked examples and study checklist')}</h2><p>{t('Use these checks before revealing later candles.')}</p><ol>{chapter.summary.map(point=><li key={point}>{t(point)}</li>)}</ol></section>:<>
        <TopicLearningGuide key={`topic-${chapter.id}`} chapterId={chapter.id} staticOnly={staticOnly}/>
        <div className="rr-review-grid"><section><h2>{t('Chapter Review Checklist')}</h2><p>{t('Connect the explanation to the example')}</p><ol>{chapterDiagrams[chapter.id].steps.map(step=><li key={step}>{step}</li>)}</ol><p>{t('Separate the visible example from any proposed trading application.')}</p></section><section><h2>{t('Risk Management & Sizing Protocols')}</h2><h3>{t('Capital Preservation Architecture')}</h3><ul><li><strong>{t('Strict Capital Cap:')}</strong> {t('Choose a risk limit suitable for your circumstances. Include correlated positions, contract increments and possible losses beyond a planned stop; no percentage is universally safe.')}</li><li><strong>{t('Mechanical Stop-Loss:')}</strong> {t('Connect the planned stop to a stated invalidation and instrument rules. A stop-market order may slip; a stop-limit order may remain unfilled.')}</li><li><strong>{t('Asymmetric Payoff:')}</strong> {t('Planned reward-to-risk alone does not establish positive expectancy. Evaluate win frequency, average realized wins and losses, and costs together.')}</li></ul><p>{t('PRINCIPLE: Trade management and survival precede profit. Invalidation must be predefined before entry.')}</p></section></div>
        </>}
        {!staticOnly&&<section className="rr-notes"><label htmlFor="rr-personal-notes">{t('Personal Learning Notes')} · {chapter.id}</label><textarea id="rr-personal-notes" rows={5} value={userNote} onChange={e=>setUserNote(e.target.value)} placeholder={t('Record your personal tape observations, chart invalidation takeaways, and execution reflections for this chapter...')}/><div><small>{t('Saved locally in browser storage')}</small><button className="rr-primary" onClick={handleSaveNote}><Save size={16}/>{t(savedNoteStatus?'Notes Saved!':'Save Notes')}</button></div></section>}
        <div className="rr-section-actions"><button className="rr-primary" onClick={()=>chooseScene('visual')}>{t('View Interactive Diagram')} <ArrowRight size={17}/></button><button onClick={()=>chooseScene('terms')}>{t('Study Key Terms')}</button></div>
      </div>}
      {((staticOnly&&!hasDeliveryEdition(chapter.id))||(!staticOnly&&activeScene==='visual'))&&<section className="rr-visual-section"><h2>{t('Chapter-specific interactive diagram')}</h2>{!hasDeliveryEdition(chapter.id)&&<p>{t('Use the numbered steps to explore this chapter’s example. Solid marks show the illustration; dashed paths show references or possible outcomes, not predictions.')}</p>}{hasDeliveryEdition(chapter.id)?<DeliveryLessonWorkshop chapterId={chapter.id} staticOnly={staticOnly}/>:<ChapterDiagram key={chapter.id} chapterId={chapter.id} staticOnly={staticOnly} onPractice={()=>chooseScene('checkpoint')}/>}</section>}
      {(staticOnly||activeScene==='terms')&&<section className="rr-terms"><h2>{t('Key Terms')}</h2><dl>{chapter.keyTerms.map(term=><div key={term.term}><dt>{t(term.term)}</dt><dd>{t(term.definition)}</dd></div>)}</dl></section>}
      {(staticOnly||activeScene==='checkpoint')&&<section className="rr-quiz"><h2>{t('Practice & Quiz')}</h2><ChapterQuiz key={chapter.id} chapter={chapter} staticOnly={staticOnly} heading={false} attempt={quizAttempt} onAttemptChange={setQuizAttempt}/></section>}
      {(staticOnly||activeScene==='briefing')&&<section className="rr-summary"><h2>{t('Executive Chapter Summary')}</h2><ol>{chapter.summary.map((point,i)=><li key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{t(point)}</p></li>)}</ol><button className="rr-primary" onClick={()=>chooseScene('text')}>{t('Read Full Chapter')}<ArrowRight size={17}/></button></section>}
      <div className="rr-chapter-navigation">{prevChapter?<a href={href(`/learn/${prevChapter.slug}/`)} onClick={e=>{if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey){e.preventDefault();onSelectChapter(prevChapter.id,prevChapter.slug);}}}><ArrowLeft size={17}/><span>{t('Previous')}<strong><ReadingTitle text={prevChapter.title}/></strong></span></a>:<a href={href('/curriculum/')}>{t('All Chapters')}</a>}{nextChapter&&<a href={href(`/learn/${nextChapter.slug}/`)} onClick={e=>{if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey){e.preventDefault();onSelectChapter(nextChapter.id,nextChapter.slug);}}}><span>{t('Next')}<strong><ReadingTitle text={nextChapter.title}/></strong></span><ArrowRight size={17}/></a>}</div>
      {onCompleteChapter&&<div className="mentorship-read-action"><button className="rr-primary" disabled={isCompleted} onClick={()=>onCompleteChapter(chapter.id)}>{isCompleted?'Note marked as read':'Mark this note as read'}</button><p>Reading progress is a personal checklist, not a trading qualification.</p></div>}
      <CurriculumReview chapter={chapter}/>{hasDeliveryEdition(chapter.id)?<DeliveryLessonSupport chapterId={chapter.id} section="links"/>:<LessonRelatedLinks chapterId={chapter.id}/>}<DeliveryLessonSupport chapterId={chapter.id} section="faq"/><FinancialDisclaimer/>
    </div>
  </div></ReadingRoomLayout>;
};
export default ChapterRoom;
