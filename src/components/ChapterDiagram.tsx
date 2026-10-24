import { useEffect, useState } from 'react';
import { chapterDiagrams, type DiagramMark } from '../data/chapters/diagrams';
import { useTranslation } from '../i18n/TranslationProvider';
import { FvgLessonDiagram } from './FvgLessonDiagram';
import { ChapterStory } from './ChapterStory';
import { chapterStoryHeadings } from '../data/chapterStories';

function Mark({ mark, translate }: { mark: DiagramMark; translate: (text: string) => string }) {
  const m = mark;
  switch (m.kind) {
    case 'line': return <line x1={m.x} y1={m.y} x2={m.x2} y2={m.y2} strokeDasharray={m.dashed ? '5 6' : undefined} />;
    case 'path': return <path d={m.d} fill="none" strokeDasharray={m.dashed ? '5 6' : undefined} className={m.dashed ? '' : 'diagram-trace'} pathLength={100} />;
    case 'zone': return <rect x={m.x} y={m.y} width={m.w} height={m.h} rx={5} className="diagram-zone" />;
    case 'dot': return <circle cx={m.x} cy={m.y} r={5} fill="currentColor" />;
    case 'label': return <text x={m.x} y={m.y} textAnchor="middle" stroke="none" fill="currentColor" direction={/^[\d\s:–/%+−?≠]+$/.test(m.text || '') ? 'ltr' : undefined}>{translate(m.text || '')}</text>;
    case 'candle': return <>
      <line x1={m.x} y1={m.high} x2={m.x} y2={m.low} />
      <rect x={m.x! - 9} y={Math.min(m.open!, m.close!)} width={18} height={Math.max(2, Math.abs(m.close! - m.open!))} rx={2} fill="currentColor" stroke="none" />
    </>;
  }
}

/** Static schematics serve thumbnails and prerendered HTML; full lessons use the story players. */
export function ChapterDiagram({ chapterId, thumbnail = false, staticOnly = false, onPractice }: { chapterId: number; thumbnail?: boolean; staticOnly?: boolean; onPractice?:()=>void }) {
  const { t, locale } = useTranslation();
  const spec = chapterDiagrams[chapterId];
  const [step, setStep] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (thumbnail || staticOnly) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(query.matches); if (query.matches) setPlaying(false); };
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [thumbnail, staticOnly]);
  useEffect(() => { setPlaying(false); setStep(null); }, [chapterId]);
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      if (step === 2) { setPlaying(false); return; }
      setStep((step ?? -1) + 1);
    }, 2800);
    return () => window.clearTimeout(timer);
  }, [playing, reduced, step]);
  useEffect(() => {
    if (!playing) return;
    const stopWhenHidden = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener('visibilitychange', stopWhenHidden);
    return () => document.removeEventListener('visibilitychange', stopWhenHidden);
  }, [playing]);
  if (!spec) return null;
  if (chapterId === 13 && !thumbnail) return <FvgLessonDiagram staticOnly={staticOnly} onPractice={onPractice}/>;
  if (!thumbnail && !staticOnly) return <ChapterStory chapterId={chapterId} onPractice={onPractice}/>;
  const choose = (value: number) => { setPlaying(false); setStep(value); };
  return <figure className={`chapter-diagram ${thumbnail ? 'chapter-diagram--thumbnail' : 'chapter-diagram--lesson'} ${playing ? 'chapter-diagram--playing' : ''}`} data-chapter-diagram={chapterId}>
    <div className="chapter-diagram-heading"><span>{t('Chapter illustration')}</span><strong>{t(spec.title)}</strong></div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width={400} height={220} role="img" aria-label={t(spec.title)} className="chapter-diagram-canvas" lang={locale}>
      <title>{t(spec.title)}</title>
      <desc>{t('Schematic example, not a trading signal.')}</desc>
      <g className="diagram-grid" aria-hidden="true">{[55, 105, 155].map(y => <line key={y} x1="24" x2="376" y1={y} y2={y} />)}</g>
      {[0, 1, 2].map(phase => <g key={phase} className={`diagram-stage diagram-stage-${phase} ${step !== null && phase > step ? 'diagram-stage--future' : ''}`} style={{ animationDelay: `${phase * 0.75}s` }}>
        {spec.marks.filter(m => m.stage === phase).map((mark, i) => <g key={i} className={`diagram-tone-${mark.tone || 'ink'}`}><Mark mark={mark} translate={t} /></g>)}
      </g>)}
    </svg>
    {!thumbnail && <figcaption>
      {!staticOnly && <div className="diagram-controls">
        {!reduced && <button type="button" onClick={() => { if (playing) setPlaying(false); else { if (step === null || step === 2) setStep(0); setPlaying(true); } }}>{t(playing ? 'Pause explanation' : step === 2 ? 'Replay explanation' : 'Play explanation')}</button>}
        {reduced && <p>{t('Reduced motion: use the numbered steps.')}</p>}
        {step !== null && <button type="button" onClick={() => { setPlaying(false); setStep(null); }}>{t('Show complete diagram')}</button>}
      </div>}
      <ol className="diagram-steps" aria-label={t('Illustrated steps')}>
        {spec.steps.map((copy, index) => <li key={index} className={step === index ? 'diagram-step--active' : ''}>
          {staticOnly ? <span><b dir="ltr">{index + 1}</b><span>{chapterStoryHeadings[chapterId]&&<strong className="static-story-heading">{t(chapterStoryHeadings[chapterId][index].en)}</strong>}{t(copy)}</span></span> : <button type="button" aria-pressed={step === index} onClick={() => choose(index)}><b dir="ltr">{index + 1}</b><span>{t(copy)}</span></button>}
        </li>)}
      </ol>
      <p className="diagram-note">{t('Schematic example, not a trading signal.')}</p>
    </figcaption>}
  </figure>;
}
