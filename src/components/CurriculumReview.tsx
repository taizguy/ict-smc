import {silverLessonScope} from '../data/chapters/silverBulletLesson';
import {breakTopic,breakReviewScope} from '../data/chapters/breakDocuments';
import {structureReviewScope} from '../data/chapters/structureDocument';
import {AlchemyVerification} from './Mentorship2026AlchemyContext';
import {useTranslation} from '../i18n/TranslationProvider';
import {hasMentorship2026Edition} from '../data/chapters/mentorship2026';
import {hasMentorship2025Edition} from '../data/chapters/mentorship2025Visuals';
import type { TextbookChapter } from '../types';
import { marketCaseScope } from '../data/chapters/deliveryMarketCases';
import { curriculumReview, curriculumReviewCopy as copy, chapterReviewRevision } from '../data/curriculumReview';

export function CurriculumReview({ chapter }: { chapter: TextbookChapter }) {
  const {t,href}=useTranslation();
  const review = curriculumReview(chapter);
  const revision = chapterReviewRevision(chapter.id);
  return <aside className="curriculum-review" aria-labelledby="curriculum-review-heading">
    <h2 id="curriculum-review-heading">{t(chapter.id===49?'Sources':copy.heading)}</h2>
    <p className="curriculum-review-date"><span>{t(copy.date)}</span>: <time dateTime={revision.iso}>{t(revision.label)}</time></p>
    <p>{t(chapter.id===1064?silverLessonScope:breakTopic(chapter.id)?breakReviewScope:chapter.id===1010?structureReviewScope:chapter.id===7?'All swing examples are illustrative, with invented prices. Sources establish contract details and indicator conventions, not hidden orders or expected trading outcomes.':chapter.id===4?'All example prices and quantities are invented. The displayed books are teaching snapshots, not live market data.':chapter.id===3?'All example prices, book snapshots, OBI scores, and auction sizes are illustrative synthetic teaching figures, not historical trades or live venue quotes.':chapter.id===33?'All synthetic EUR/USD and index curves, Equilibrium thresholds, and teaching illustrations are original educational diagrams, not live quotes, verified returns, or proof of dealer positioning.':chapter.id===36?'All synthetic sequence diagrams, session time grids, OTE metrics, and checklist examples are original educational illustrations, not live quotes or historical executions.':chapter.id===56?'All synthetic NQ and EUR/USD BPR examples, RDRB revisit diagrams, and Enigma 1.25x anchor studies are original educational illustrations, not live quotes or execution records.':chapter.id===59?'All synthetic NQ, EUR/USD, and index Dealing Range examples, PD Array matrices, Suspension gap comparisons, and stick-figure comics are original educational illustrations, not live quotes or execution records.':chapter.id===1034?'All synthetic NQ and EUR/USD OTE examples, Fibonacci grids, and extension charts are original educational illustrations, not live quotes or execution records.':chapter.id===1031?'All prices are invented to show arithmetic. They are not market data.':chapter.id===1?'Original explanations and invented numerical examples describe mechanisms and possible drivers. Sources support the definitions and limits; none of these examples is presented as a historical execution.':chapter.id===49?'Historical prices below were checked against the source chart. Hypothetical contrasts are labelled; drawings simplify events and do not establish verified executions.':hasMentorship2025Edition(chapter.id)?'Standalone explanations and invented worked prices are accompanied by separately labelled historical market replays. Each replay identifies its feed, dates, timeframe and limits; none is a verified trade execution.':chapter.id===13?'The numerical examples in this chapter are illustrative teaching data, not historical trades. Existing ICT references below document selected source passages; they do not verify the chapter’s invented prices or establish expected results.':((chapter.id>=14&&chapter.id<=16)||hasMentorship2025Edition(chapter.id)||hasMentorship2026Edition(chapter.id))?'These standalone lessons use original explanations, invented worked prices and LearnSMC illustrations. References below document the source context; the examples are not transcripts or verified executions.':copy.scope)}</p>
    {chapter.id===49&&<AlchemyVerification/>}
    <h3>{t(copy.subjectivity)}</h3>
    <p>{t(review.interpretation)}</p>
    <p>{t(chapter.id===1?'Write the feed, date, timezone, time window and observed change. Record alternative explanations and missing information before deciding how confident the account should be.':copy.exercise)}</p>
    {review.sources.length > 0 && ![3,33,36,56,59,1034].includes(chapter.id) && <><h3>{t(copy.primary)}</h3><ul>{review.sources.map(source => <li key={source.url}><a href={source.url}>{t(source.title)}</a><p>{t(source.scope)}</p>{source.passages && <ul>{source.passages.map(passage => <li key={passage.url}><a href={passage.url}>{t(passage.label)}</a><p>{t(passage.note)}</p></li>)}</ul>}</li>)}</ul></>}
    <a href={href('/contact/')}>{t(copy.corrections)}</a>
  </aside>;
}
