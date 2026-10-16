import { useState } from 'react';
import { MasoodLecture } from '../types';
import { masoodPlaylistsData } from '../data/masoodData';
import { ContextualInternalLinker } from './ContextualInternalLinker';
import { FinancialDisclaimer } from './FinancialDisclaimer';

export function MasoodLecturePage({ lecture }: { lecture: MasoodLecture }) {
  const [play, setPlay] = useState(false);
  const playlist = masoodPlaylistsData.find(p => p.id === lecture.playlistType)!;
  const sections = [
    ['Key takeaways', lecture.keyTakeaways],
    ['Rules discussed in the lecture', lecture.coreRules],
    ['Practice checklist', lecture.tradingChecklist],
    ['Common mistakes to examine', lecture.commonMistakes],
  ] as const;
  return <article className="max-w-4xl mx-auto space-y-8 text-ink-secondary">
    <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm underline">
      <a href="/">Home</a><span>/</span><a href="/masood/">Abdullah Masood</a><span>/</span>
      <a href={`/masood/playlists/${playlist.id}/`}>{playlist.badge}</a>
    </nav>
    <header className="space-y-4">
      <h1 className="text-3xl font-semibold text-ink">{lecture.title}</h1>
      <p>{lecture.shortSummary}</p>
      <p className="text-sm">Written study notes by <a className="underline" href="/about/#author">Muhammad Umer Ijaz</a>. Video source: Trader Abdullah Masood. These notes are independently published by LearnSMC.</p>
    </header>
    <div className="aspect-video bg-surface rounded-xl overflow-hidden">
      {play ? <iframe className="w-full h-full" src={`https://www.youtube-nocookie.com/embed/${lecture.youtubeId}`} title={lecture.title} width="1280" height="720" allow="encrypted-media; picture-in-picture" allowFullScreen />
        : <button className="w-full h-full p-8 underline" onClick={() => setPlay(true)}>Load the source video from YouTube</button>}
    </div>
    <p className="text-sm">Loading the video connects to YouTube. You can also <a className="underline text-teal" href={`https://www.youtube.com/watch?v=${lecture.youtubeId}`} target="_blank" rel="noopener noreferrer">watch the original lecture on YouTube</a>.</p>
    {sections.map(([title, points]) => points?.length ? <section key={title} className="space-y-3">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <ul className="list-disc pl-6 space-y-3">{points.map((p, i) => <li key={i}><ContextualInternalLinker text={p} /></li>)}</ul>
    </section> : null)}
    {lecture.practicalExercise && <section className="space-y-3"><h2 className="text-xl font-semibold text-ink">Demo account exercise</h2><p><ContextualInternalLinker text={lecture.practicalExercise} /></p></section>}
    {lecture.bilingualNotes && <section><h2 className="text-xl font-semibold text-ink">Additional study notes</h2><p>{lecture.bilingualNotes}</p></section>}
    <nav aria-label="Related Abdullah Masood lectures" className="space-y-3"><h2 className="text-xl font-semibold text-ink">Continue this series</h2>
      <ul className="space-y-2">{playlist.lectures.filter(l => l.id !== lecture.id).slice(0, 5).map(l => <li key={l.id}><a className="underline text-teal" href={`/masood/lectures/${l.id}/`}>{l.title}</a></li>)}</ul>
      <a className="underline" href={`/masood/playlists/${playlist.id}/`}>View the complete {playlist.badge} series</a>
    </nav>
    <FinancialDisclaimer />
  </article>;
}
