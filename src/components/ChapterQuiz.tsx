import { useState, type Dispatch, type SetStateAction } from 'react';
import type { TextbookChapter } from '../types';
import { chapterQuiz } from '../data/chapters/chapterQuizzes';
import { useTranslation } from '../i18n/TranslationProvider';

/** A fresh attempt belongs to one chapter. Answers never mark a chapter completed. */
export function ChapterQuiz({ chapter, staticOnly = false, heading = true, attempt, onAttemptChange }: { chapter: TextbookChapter; staticOnly?: boolean; heading?: boolean; attempt?: Record<string, number>; onAttemptChange?: Dispatch<SetStateAction<Record<string, number>>> }) {
  const { t, message } = useTranslation();
  const questions = chapterQuiz(chapter);
  const [localAnswers, setLocalAnswers] = useState<Record<string, number>>({});
  const answers = attempt ?? localAnswers;
  const setAnswers = onAttemptChange ?? setLocalAnswers;
  const answered = questions.filter(q => answers[q.id] !== undefined).length;
  const correct = questions.filter(q => answers[q.id] === q.correctIndex).length;
  if (staticOnly) return <section className="chapter-quiz" id={`chapter-quiz-${chapter.id}`} data-chapter-quiz={chapter.id}>
    {heading && <h2>{t('Practice & Quiz')}</h2>}
    {questions.map((q,index) => <fieldset key={q.id} className="chapter-quiz-question">
      <legend><span dir="ltr">{index + 1}. </span>{t(q.question)}</legend>{q.context && <p>{t(q.context)}</p>}
      <ol>{q.options.map(option => <li key={option}>{t(option)}</li>)}</ol>
      <details><summary>{t('Show answer and explanation')}</summary><p><strong>{t(q.options[q.correctIndex])}</strong></p><p>{t(q.explanation)}</p></details>
    </fieldset>)}
  </section>;
  return <div className="chapter-quiz" id={`chapter-quiz-${chapter.id}`} data-chapter-quiz={chapter.id}>
    <div className="chapter-quiz-status">
      <p aria-live="polite">{message('Answered {answered} of {total} · Correct: {correct}', { answered, total: questions.length, correct })}</p>
      <button type="button" className="btn-predikt-secondary" disabled={!answered} onClick={() => setAnswers({})}>{t('Start a new attempt')}</button>
    </div>
    <p>{t('Choose one answer for each question. Feedback explains the answer; your score is a learning check, not evidence of trading readiness.')}</p>
    {questions.map((q, index) => {
      const selected = answers[q.id];
      const done = selected !== undefined;
      return <fieldset key={q.id} className="chapter-quiz-question">
        <legend><span dir="ltr">{index + 1}. </span>{t(q.question)}</legend>
        {q.context && <p className="chapter-quiz-context">{t(q.context)}</p>}
        <div className="chapter-quiz-options" role="group" aria-label={t(q.question)}>
          {q.options.map((option, i) => <button type="button" key={option} disabled={done}
            aria-pressed={selected === i}
            className={`chapter-quiz-option ${done && i === q.correctIndex ? 'is-correct' : done && i === selected ? 'is-incorrect' : ''}`}
            onClick={() => setAnswers(previous => previous[q.id] === undefined ? { ...previous, [q.id]: i } : previous)}>
            <span>{t(option)}</span>
            {done && i === q.correctIndex && <strong>{t('Correct answer')}</strong>}
            {done && selected === i && i !== q.correctIndex && <strong>{t('Your answer')}</strong>}
          </button>)}
        </div>
        {done && <div className="chapter-quiz-feedback" role="status"><strong>{t(selected === q.correctIndex ? 'Correct.' : 'Review this idea.')}</strong> {t(q.explanation)}</div>}
      </fieldset>;
    })}
  </div>;
}
