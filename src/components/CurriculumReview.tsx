import {AlchemyVerification} from './Mentorship2026AlchemyContext';
import {useTranslation} from '../i18n/TranslationProvider';
import {hasMentorship2026Edition} from '../data/chapters/mentorship2026';
import {hasMentorship2025Edition} from '../data/chapters/mentorship2025Visuals';
import type { TextbookChapter } from '../types';
import { marketCaseScope } from '../data/chapters/deliveryMarketCases';
import { curriculumReview, curriculumReviewCopy as copy, chapterReviewRevision, ictOfficialAccounts } from '../data/curriculumReview';

export function CurriculumReview({ chapter }: { chapter: TextbookChapter }) {
  const {t,href}=useTranslation();
  const review = curriculumReview(chapter);
  const revision = chapterReviewRevision(chapter.id);
  return <aside className="curriculum-review" aria-labelledby="curriculum-review-heading">
    <h2 id="curriculum-review-heading">{t(chapter.id===49?'Sources':copy.heading)}</h2>
    <p className="curriculum-review-date"><span>{t(copy.date)}</span>: <time dateTime={revision.iso}>{t(revision.label)}</time></p>
    <p>{t(chapter.id===49?'Historical prices below were checked against the source chart. Hypothetical contrasts are labelled; drawings simplify events and do not establish verified executions.':hasMentorship2025Edition(chapter.id)?'Standalone explanations and invented worked prices are accompanied by separately labelled historical market replays. Each replay identifies its feed, dates, timeframe and limits; none is a verified trade execution.':chapter.id===13?marketCaseScope:((chapter.id>=14&&chapter.id<=16)||hasMentorship2025Edition(chapter.id)||hasMentorship2026Edition(chapter.id))?'These standalone lessons use original explanations, invented worked prices and LearnSMC illustrations. References below document the source context; the examples are not transcripts or verified executions.':copy.scope)}</p>
    {chapter.id===49&&<AlchemyVerification/>}
    <h3>{t(copy.subjectivity)}</h3>
    <p>{t(review.interpretation)}</p>
    <p>{t(copy.exercise)}</p>
    {review.sources.length > 0 && <><h3>{t(copy.primary)}</h3><ul>{review.sources.map(source => <li key={source.url}><a href={source.url}>{t(source.title)}</a><p>{t(source.scope)}</p>{source.passages && <ul>{source.passages.map(passage => <li key={passage.url}><a href={passage.url}>{t(passage.label)}</a><p>{t(passage.note)}</p></li>)}</ul>}</li>)}</ul></>}
    <h3>{t(copy.accounts)}</h3>
    <p><a href={ictOfficialAccounts.youtube}>{t(copy.youtube)}</a> · <a href={ictOfficialAccounts.x}>{t(copy.x)}</a></p>
    <p>{t(chapter.id===49?'Only the recordings and tool documentation listed above support this pilot; no X-post claims are used.':copy.access)}</p>
    <a href={href('/contact/')}>{t(copy.corrections)}</a>
  </aside>;
}
