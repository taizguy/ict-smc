import { useTranslation } from '../i18n/TranslationProvider';
import { cornerstoneCopy as copy, cornerstoneGuides, cornerstoneRevision } from '../data/cornerstoneGuides';

export function CornerstoneGuide({ chapterId }: { chapterId: number }) {
  const { t, href } = useTranslation();
  const guide = cornerstoneGuides.find(item => item.chapterId === chapterId);
  if (!guide) return null;
  return <section className="topic-learning" id="study-checkpoint" aria-labelledby="study-checkpoint-heading">
    <header><p className="topic-kicker">{t(copy.heading.en)}</p><h2 id="study-checkpoint-heading">{t(guide.title.en)}</h2><p>{t(copy.notice.en)}</p></header>
    <h3>{t(copy.example.en)}</h3><p>{t(guide.example.en)}</p>
    <h3>{t(copy.counter.en)}</h3><p>{t(guide.counter.en)}</p>
    <h3>{t(copy.question.en)}</h3>
    <details className="topic-exercise"><summary>{t(guide.question.en)}</summary><p>{t(guide.answer.en)}</p></details>
    <aside className="topic-insight"><h3>{t(copy.limit.en)}</h3><p>{t(guide.limit.en)}</p></aside>
    <nav className="topic-next" aria-label={t(copy.next.en)}><h3>{t(copy.next.en)}</h3>
      <p><a href={href(guide.next)}>{t(guide.nextLabel.en)}</a></p>
      <p><a href="#curriculum-review-heading">{t(copy.sources.en)}</a></p>
    </nav>
    <p className="topic-review"><span>{t(copy.scope.en)}</span>: <time dateTime={cornerstoneRevision}>{cornerstoneRevision}</time></p>
  </section>;
}
