import {hasMentorship2025Edition} from '../data/chapters/mentorship2025Visuals';
import type { TextbookChapter } from '../types';
import { marketCaseScope } from '../data/chapters/deliveryMarketCases';
import { curriculumReview, curriculumReviewCopy as copy, chapterReviewRevision, ictOfficialAccounts } from '../data/curriculumReview';

export function CurriculumReview({ chapter }: { chapter: TextbookChapter }) {
  const review = curriculumReview(chapter);
  const revision = chapterReviewRevision(chapter.id);
  return <aside className="curriculum-review" aria-labelledby="curriculum-review-heading">
    <h2 id="curriculum-review-heading">{copy.heading}</h2>
    <p className="curriculum-review-date"><span>{copy.date}</span>: <time dateTime={revision.iso}>{revision.label}</time></p>
    <p>{hasMentorship2025Edition(chapter.id)?'Standalone explanations and invented worked prices are accompanied by separately labelled historical market replays. Each replay identifies its feed, dates, timeframe and limits; none is a verified trade execution.':chapter.id===13?marketCaseScope:((chapter.id>=14&&chapter.id<=16)||hasMentorship2025Edition(chapter.id))?'These standalone lessons use original explanations, invented worked prices and LearnSMC illustrations. References below document the source context; the examples are not transcripts or verified executions.':copy.scope}</p>
    <h3>{copy.subjectivity}</h3>
    <p>{review.interpretation}</p>
    <p>{copy.exercise}</p>
    {review.sources.length > 0 && <><h3>{copy.primary}</h3><ul>{review.sources.map(source => <li key={source.url}><a href={source.url}>{source.title}</a><p>{source.scope}</p>{source.passages && <ul>{source.passages.map(passage => <li key={passage.url}><a href={passage.url}>{passage.label}</a><p>{passage.note}</p></li>)}</ul>}</li>)}</ul></>}
    <h3>{copy.accounts}</h3>
    <p><a href={ictOfficialAccounts.youtube}>{copy.youtube}</a> · <a href={ictOfficialAccounts.x}>{copy.x}</a></p>
    <p>{copy.access}</p>
    <a href="/contact/">{copy.corrections}</a>
  </aside>;
}
