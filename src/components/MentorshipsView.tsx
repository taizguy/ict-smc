import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import { ChapterDiagram } from './ChapterDiagram';
import { mentorshipTracks, mentorshipPath, mentorshipLessonPath } from '../data/mentorshipTracks';
import { mentorshipRecordings } from '../data/mentorshipRecordings.generated';
import { textbookChapters } from '../data/chaptersData';
import { getStoredProgress } from '../utils/academyProgress';
import { FinancialDisclaimer } from './FinancialDisclaimer';

const checklistKey = 'learnsmc_recording_review_v1';
const chaptersFor = (ids: number[]) => ids.map(id => textbookChapters.find(c => c.id === id)).filter(Boolean);
const searchText = (text: string) => text.toLocaleLowerCase().trim().replace(/[۰-۹٠-٩]/g, digit => String(digit.charCodeAt(0) - (digit >= '۰' ? 0x6f0 : 0x660)));

export function MentorshipsTeaser() {
  return <section className="mentorship-teaser" aria-labelledby="mentorship-teaser-title">
    <div><p className="mentorship-eyebrow">One library. Different ways to learn.</p>
      <h2 id="mentorship-teaser-title">Follow a mentorship, or explore a concept.</h2>
      <p>Choose a series with its own context and study order. Your existing lesson progress stays with you.</p></div>
    <a className="mentorship-action" href="/curriculum/mentorships/">Compare mentorships →</a>
  </section>;
}

export function MentorshipsView({ slug, embedded = false }: { slug?: string; embedded?: boolean }) {
  const {message}=useTranslation();
  const [visibleCount,setVisibleCount]=useState(24);
  const track = mentorshipTracks.find(t => t.slug === slug);
  const [completed, setCompleted] = useState<number[]>([]);
  const [reviewed, setReviewed] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState('');
  useEffect(()=>setVisibleCount(24),[slug,query]);
  const [saveError, setSaveError] = useState(false);
  useEffect(() => {
    setCompleted(getStoredProgress().completedChapterIds);
    try { const value = JSON.parse(localStorage.getItem(checklistKey) || '{}'); if (value && typeof value === 'object' && !Array.isArray(value)) setReviewed(value); } catch { /* A fresh checklist is safe when storage is unavailable. */ }
  }, []);
  const recordings = useMemo(() => mentorshipRecordings.filter(r => r.track === track?.inventoryKey), [track]);
  const notes = track ? chaptersFor(track.chapterIds) : [];
  const nextNote = notes.find(c => !completed.includes(c.id)) || notes[0];
  const filtered = recordings.filter(r => searchText(r.title).includes(searchText(query)));
  const checked = recordings.filter(r => r.status === 'selected-passages').length;
  const hours = Math.round(recordings.reduce((sum, r) => sum + r.minutes, 0) / 60);
  function toggle(id: string) {
    const next = { ...reviewed, [id]: !reviewed[id] };
    setReviewed(next);
    try { localStorage.setItem(checklistKey, JSON.stringify(next)); setSaveError(false); } catch { setSaveError(true); }
  }

  return <div className="mentorship-page">
    <nav className="mentorship-breadcrumbs" aria-label="Mentorship navigation">
      <a href="/curriculum/">Learn by concept</a><span aria-hidden="true">/</span>
      <a href="/curriculum/mentorships/">Choose a mentorship</a>
      {track && <><span aria-hidden="true">/</span><span aria-current="page">{track.title}</span></>}
    </nav>
    {!embedded && <header className="mentorship-hero">
      <p className="mentorship-eyebrow">A study path, with the source in view</p>
      <h1>{track?.title || 'Which ICT mentorship should I study?'}</h1>
      <p>{track?.focus || 'Start with your learning goal. Compare the series, follow a clear reading order and return to the original recordings.'}</p>
    </header>}
    {!track ? <>
      <section className="mentorship-intro"><h2>Choose the question before the year.</h2>
        <p>The series overlap. A later year does not automatically replace an earlier explanation or make a model more suitable for you. Begin with foundations, then select one question and one study path.</p>
        <p>New to market mechanics? Start with the foundation lessons before evaluating entry patterns.</p>
        <a href="/learn/what-actually-moves-price/">Start with market foundations →</a>
      </section>
      <section aria-label="Mentorship collections" className="mentorship-grid">{mentorshipTracks.map(t => <article key={t.slug} className={`mentorship-card mentorship-tone-${t.color}`}>
        <p className="mentorship-eyebrow">{t.eyebrow}</p><h2><a href={mentorshipPath(t.slug)}>{t.title}</a></h2>
        <p>{t.focus}</p><p className="mentorship-small">{t.audience}</p>
        <a className="mentorship-action" href={mentorshipPath(t.slug)}>Explore this mentorship →</a>
      </article>)}</section>
      <section className="mentorship-intro"><h2>What makes Charter content different?</h2>
        <p>The Charter collection organizes named price-action models with trade plans, theory, amplified explanations and supplementary lessons. Compare the objective, holding period and execution assumptions within each model.</p>
        <p>In the Model 13 introduction, ICT identifies it with his public 2022 model and assumes the learner has already studied that series. The amplified lecture adds a model-specific perspective; use both sources when comparing details.</p>
        <a href="https://www.youtube.com/watch?v=kNlySn81dmo&t=0s">Original Model 13 introduction</a>
      </section>
      <section><h2>Compare the learning paths</h2><div className="mentorship-table-scroll" tabIndex={0} role="region" aria-label="Mentorship comparison"><table className="mentorship-table">
        <caption>Focus and preparation for each mentorship</caption>
        <thead><tr><th scope="col">Mentorship</th><th scope="col">Study focus</th><th scope="col">Before you start</th></tr></thead>
        <tbody>{mentorshipTracks.map(t => <tr key={t.slug}><th scope="row"><a href={mentorshipPath(t.slug)}>{t.title}</a></th><td>{t.focus}</td><td>{t.prerequisite}</td></tr>)}</tbody>
      </table></div></section>
      <section className="mentorship-intro"><h2>How these paths work</h2>
        <p>LearnSMC provides independent explanations and suggested reading orders. Original recordings retain their source titles. Shared concept notes can appear in more than one path; a series page does not imply that every statement in every recording has been verified.</p>
        <p>Each source entry distinguishes a catalogue reference, checked passages or visual-only study. Reading notes and checking a recording are separate activities, and neither certifies trading competence.</p>
      </section>
    </> : <>
      <section className="mentorship-track-intro">
        <div className="mentorship-intro"><h2>What is different here?</h2><p>{track.difference}</p><h3>Who is this for?</h3><p>{track.audience}</p><h3>Before you start</h3><p>{track.prerequisite}</p></div>
        <aside className="mentorship-study-card"><p className="mentorship-eyebrow">Your next study step</p>
          <p><bdi dir="ltr"><strong>{notes.filter(c => completed.includes(c.id)).length}</strong> / {notes.length}</bdi>{' '}<span>related notes completed</span></p>
          {nextNote && <a className="mentorship-action" href={mentorshipLessonPath(nextNote.slug, track.slug)}>Continue the reading path →</a>}
          <p className="mentorship-small">Shared notes retain your existing chapter progress. The recording checklist is separate and saved on this device.</p>
          <a href="#source-recordings">Browse original recordings ↓</a>
        </aside>
      </section>
      <section className="mentorship-intro"><h2>Keep this distinction in mind</h2><p>{track.caution}</p></section>
      <section><h2>Suggested reading order</h2><p>These are related LearnSMC study notes. Follow their source links when checking the precise rule in the original series.</p>
        <ol className="mentorship-note-list">{notes.map((chapter, index) => <li key={chapter.id}>
          <span className="mentorship-step" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <ChapterDiagram chapterId={chapter.id} thumbnail />
          <div><a href={mentorshipLessonPath(chapter.slug, track.slug)}>{chapter.title}</a><p>{chapter.summary[0]}</p></div>
          {completed.includes(chapter.id) && <span className="mentorship-status">Completed</span>}
        </li>)}</ol>
      </section>
      <section id="source-recordings" className="mentorship-sources">
        <h2>Original recordings and review coverage</h2>
        <div className="mentorship-source-stats"><span><strong>{recordings.length}</strong> <span>catalogued recordings</span></span><span><strong>{hours}</strong> <span>hours in this collection</span></span><span><strong>{checked}</strong> <span>recordings with checked passages</span></span></div>
        <p>Coverage records the evidence used for these notes. Checked passages are selected excerpts, not certification of every assertion or the instructor’s trading results. Visual-only entries have no spoken review. The catalogue may be incomplete.</p>
        <p className="mentorship-small">Original source titles are preserved in English for attribution. The study guidance and controls are available in both languages.</p>
        {!embedded && <label className="mentorship-search">Find an original recording<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search original titles, models or months" /></label>}
        {saveError && <p role="status">Progress could not be saved on this device. Your current checklist remains visible until this page closes.</p>}
        {!filtered.length && <p role="status">No recordings match this search. Try a model number or an English trading term.</p>}
        <ol className="mentorship-recordings">{filtered.slice(0,typeof window==='undefined'?filtered.length:visibleCount).map(r => <li key={r.id}>
          <div className="mentorship-recording-main"><span id={`recording-${r.id}`} className="mentorship-source-title" lang="en" dir="ltr" translate="no">{r.url ? <a href={r.url}>{r.title}</a> : r.title}</span>
            <div className="mentorship-recording-meta"><span>{r.minutes} <span>min</span></span><span>{r.status === 'selected-passages' ? 'Selected passages checked' : r.status === 'visual-only' ? 'Visual-only source' : 'Catalogue reference'}</span></div>
          </div>
          {!embedded && <label className="mentorship-recording-check"><input type="checkbox" aria-describedby={`recording-${r.id}`} checked={!!reviewed[r.id]} onChange={() => toggle(r.id)} /><span>I reviewed this recording</span></label>}
        </li>)}</ol>
        {typeof window!=='undefined'&&filtered.length>visibleCount&&<div className="mentorship-intro"><p role="status">{message('Showing {shown} of {total} recordings',{shown:Math.min(visibleCount,filtered.length),total:filtered.length})}</p><button className="mentorship-action" type="button" onClick={()=>setVisibleCount(n=>n+24)}>Show more recordings</button></div>}
      </section>
      <section><h2>Explore another mentorship</h2><nav className="mentorship-other-paths" aria-label="Other mentorships">{mentorshipTracks.filter(t => t.slug !== track.slug).map(t => <a key={t.slug} href={mentorshipPath(t.slug)}>{t.title} →</a>)}</nav></section>
    </>}
    <p className="mentorship-small"><span>Independent study guidance by</span>{' '}<a href="/about/#author">Muhammad Umer Ijaz</a>. <span>Catalogue updated 19 October 2026.</span></p>
    <FinancialDisclaimer />
  </div>;
}
