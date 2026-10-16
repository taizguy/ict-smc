import { relatedChapters } from '../utils/contextualLinks';

export function LessonRelatedLinks({ chapterId }: { chapterId: number }) {
  return <nav aria-label="Related lessons" className="my-8 rounded-xl border border-ink/10 p-5">
    <h2 className="font-semibold mb-3">Continue learning</h2>
    <ul className="space-y-2">{relatedChapters(chapterId).map(c => <li key={c.id}>
      <a className="underline text-teal" href={`/learn/${c.slug}/`}>{c.title}</a>
    </li>)}</ul>
    <a className="inline-block underline mt-4" href="/curriculum/">Browse all topic clusters</a>
  </nav>;
}
