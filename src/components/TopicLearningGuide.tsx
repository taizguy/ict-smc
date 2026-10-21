import { useState } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import { journeyCopy as copy, topicJourneys, topicJourneyRevision, type RecognitionCase } from '../data/topicJourneys';
import { CandleBoard } from './labs/CandleBoard';

function RecognitionChart({ exercise, annotated = false, sweep = false }: { exercise: RecognitionCase; annotated?: boolean; sweep?: boolean }) {
  const { t } = useTranslation();
  return <>
    <CandleBoard bars={exercise.bars} minimumVisibleCandles={3} selected={annotated ? exercise.selected : []}
      zones={annotated && exercise.zone ? [exercise.zone] : []}
      levels={sweep ? [{ price: 105, label: 'Prior high' }] : []} />
    <details className="topic-prices"><summary>{t(copy.numbers.en)}</summary>
      <div className="topic-table"><table><caption>{t('OHLC')}</caption><thead><tr>{[copy.candle.en,'Open','High','Low','Close'].map(label => <th scope="col" key={label}>{t(label)}</th>)}</tr></thead>
        <tbody>{exercise.bars.map((bar,i) => <tr key={i}><th scope="row">{i+1}</th>{[bar.open,bar.high,bar.low,bar.close].map((price,j) => <td key={j}><bdi>{price}</bdi></td>)}</tr>)}</tbody></table></div>
    </details>
  </>;
}

function RecognitionPractice({ chapterId, staticOnly }: { chapterId: number; staticOnly: boolean }) {
  const { t } = useTranslation();
  const journey = topicJourneys.find(item => item.chapterId === chapterId)!;
  const [index,setIndex] = useState(0), [choice,setChoice] = useState<number|null>(null), [revealed,setRevealed] = useState(false);
  const exercise = journey.cases[index];
  const reset = (next: number) => { setIndex(next); setChoice(null); setRevealed(false); };
  if (staticOnly) return <div>{journey.cases.map((item,i) => <section key={i} className="topic-exercise">
    <h4><span>{i+1}. </span>{t(item.question.en)}</h4><RecognitionChart exercise={item} sweep={chapterId===18}/>
    <details><summary>{t(copy.reveal.en)}</summary><p>{t(item.options[item.answer].explanation.en)}</p><p>{t(item.takeaway.en)}</p></details>
  </section>)}</div>;
  return <div className="topic-exercise">
    <p className="topic-progress" dir="ltr">{index+1} / {journey.cases.length}</p>
    <h4>{t(exercise.question.en)}</h4>
    <RecognitionChart exercise={exercise} annotated={revealed} sweep={chapterId===18}/>
    <fieldset><legend>{t(copy.choose.en)}</legend><div className="topic-options">{exercise.options.map((option,i) => <button type="button" key={i} aria-pressed={choice===i}
      onClick={() => setChoice(i)}>{t(option.label.en)}</button>)}</div></fieldset>
    <div className="topic-feedback" role="status" aria-live="polite" aria-atomic="true">{choice!==null && <><strong>{t(choice===exercise.answer ? copy.correct.en : copy.retry.en)}</strong><p>{t(exercise.options[choice].explanation.en)}</p></>}</div>
    {revealed && <aside className="topic-insight"><p>{t(exercise.options[exercise.answer].explanation.en)}</p><p>{t(exercise.takeaway.en)}</p></aside>}
    <div className="topic-controls"><button type="button" aria-expanded={revealed} onClick={() => setRevealed(value=>!value)}>{t(copy.reveal.en)}</button>
      {revealed && <button type="button" onClick={() => reset((index+1)%journey.cases.length)}>{t(index===journey.cases.length-1 ? copy.restart.en : copy.next.en)}</button>}</div>
  </div>;
}

export function TopicJourneyLinks() {
  const {t,href} = useTranslation();
  return <section className="topic-journey-index"><h2>{t(copy.paths.en)}</h2><ul>{topicJourneys.map(journey => <li key={journey.chapterId}><a href={href(journey.path)}>{t(journey.title.en)}</a><p>{t(journey.purpose.en)}</p></li>)}</ul></section>;
}

export function ArticleTopicLinks({ slug }: { slug: string }) {
  const {t,href} = useTranslation();
  const ids = slug === 'pd-arrays-fvg-order-blocks-and-inversions' ? [13,15] : slug === 'liquidity-is-not-a-magnet' ? [18] : [];
  if (!ids.length) return null;
  return <section className="topic-journey-index"><h2>{t(copy.practice.en)}</h2><ul>{topicJourneys.filter(journey=>ids.includes(journey.chapterId)).map(journey=><li key={journey.chapterId}><a href={href(journey.path+'#topic-practice')}>{t(journey.title.en)}</a><p>{t(journey.purpose.en)}</p></li>)}</ul></section>;
}

export function GlossaryTopicLink({ conceptId }: { conceptId: string }) {
  const {t,href} = useTranslation();
  const journey = topicJourneys.find(item=>item.chapterId===(conceptId==='fair_value_gap' ? 13 : conceptId==='order_block' ? 15 : 0));
  if (!journey) return null;
  return <section className="topic-journey-index"><h2>{t(copy.onward.en)}</h2><p>{t(journey.purpose.en)}</p><a href={href(journey.path+'#topic-practice')}>{t(journey.title.en)}</a><p><a href={href(journey.path+'#curriculum-review-heading')}>{t('Sources and interpretation')}</a></p></section>;
}

export function TopicLearningGuide({ chapterId, staticOnly = false }: { chapterId: number; staticOnly?: boolean }) {
  const {t,href} = useTranslation();
  const journey = topicJourneys.find(item=>item.chapterId===chapterId);
  if (!journey) return null;
  return <section id="topic-practice" className="topic-learning" aria-labelledby="topic-learning-heading">
    <header><p className="topic-kicker">{t(copy.heading.en)}</p><h2 id="topic-learning-heading">{t(journey.title.en)}</h2><p>{t(journey.purpose.en)}</p></header>
    <h3>{t(copy.method.en)}</h3><p>{t(journey.method.en)}</p>
    <h3>{t(copy.example.en)}</h3><p>{t(journey.example.en)}</p>
    <aside className="topic-insight"><h3>{t(copy.limits.en)}</h3><p>{t(journey.limitation.en)}</p></aside>
    <h3>{t(copy.practice.en)}</h3><p>{t(copy.synthetic.en)}</p>
    <RecognitionPractice key={chapterId} chapterId={chapterId} staticOnly={staticOnly}/>
    <section className="topic-next"><h3>{t(copy.onward.en)}</h3><ul>{journey.links.map(link=><li key={link.path}><a href={href(link.path)}>{t(link.label.en)}</a><p>{t(link.purpose.en)}</p></li>)}</ul>
      <a href={href('/tools/chartlab/')}>{t('Open Chart Laboratory')} <span aria-hidden="true">→</span></a><br/><a href={href('/resources/ict-smc-cheat-sheet/')}>{t(copy.reference.en)} <span aria-hidden="true">→</span></a>
    </section>
    <p className="topic-review"><span>{t(copy.review.en)}</span>: <time dateTime={topicJourneyRevision}>{topicJourneyRevision}</time>. <span>{t(copy.scope.en)}</span></p>
  </section>;
}
