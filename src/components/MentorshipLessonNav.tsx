import { mentorshipTracks, mentorshipLessonPath, mentorshipPath, selectedMentorship } from '../data/mentorshipTracks';
import { textbookChapters } from '../data/chaptersData';

/** Fragment-based course context keeps the lesson's existing canonical URL. */
export function MentorshipLessonNav({ chapterId }: { chapterId:number }) {
  const slug = typeof window === 'undefined' ? null : selectedMentorship(window.location);
  const track = mentorshipTracks.find(t => t.slug === slug && t.chapterIds.includes(chapterId));
  if (!track) return null;
  const index = track.chapterIds.indexOf(chapterId);
  const previous = textbookChapters.find(c => c.id === track.chapterIds[index - 1]);
  const next = textbookChapters.find(c => c.id === track.chapterIds[index + 1]);
  return <nav className="mentorship-lesson-nav" aria-label="Current mentorship path">
    <a href={mentorshipPath(track.slug)}>{track.title}</a>
    <span><span>Reading step</span>{' '}<bdi dir="ltr">{index + 1} / {track.chapterIds.length}</bdi></span>
    <div>{previous && <a href={mentorshipLessonPath(previous.slug, track.slug)}>← Previous in this path</a>}
      {next ? <a href={mentorshipLessonPath(next.slug, track.slug)}>Next in this path →</a> : <a href={mentorshipPath(track.slug) + '#source-recordings'}>Continue with source recordings →</a>}</div>
  </nav>;
}
