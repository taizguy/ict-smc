import React, { useEffect, useState } from 'react';
import { DrawingZoom, EditorialDrawing } from './EditorialDrawing';
import type { SketchKind } from '../../data/articles';

const stories: Record<SketchKind, { title: string; frames: string[] }> = {
  decision: { title: 'Two report cards for one trade', frames: [
    'Before entry: write the conditions, invalidation and risk. These are the things the trader can specify.',
    'After exit: record the actual result. A planned loss and a lucky escape can look very different from their decision quality.',
    'At review: compare the plan with the action, then inspect the outcome. Keep both report cards.'
  ] },
  drawdown: { title: 'The same percentage, a different starting point', frames: [
    'Start with 100 imaginary tokens. This is the original reference balance.',
    'Lose 20 tokens: 80 remain. A 20% gain now adds only 16 tokens, reaching 96.',
    'Returning from 80 to 100 requires a 25% gain. This illustrates recovery arithmetic, not a forecast.'
  ] },
  auction: { title: 'A tiny fictional auction', frames: [
    'Sellers offer three units at 100 and four at 101. The drawing is a simplified order book, not live data.',
    'An incoming buy seeks five units: three trade at 100, then two at 101, assuming the offers remain available.',
    'The last execution is 101. A later move can continue or reverse; these fills do not determine its next direction.'
  ] },
  onchain: { title: 'Three imaginary coins, two price tags', frames: [
    'Three fictional coins last moved at prices 10, 20 and 30. Their movement-based values sum to 60.',
    'At a current price of 40 each, the three coins have a market value of 120. This is an invented example.',
    'MVRV = 120 / 60 = 2. NUPL = (120 − 60) / 120 = 0.5, using matching inputs. Neither calculation predicts the next price.'
  ] }
};

export function SketchSvg({ kind, step = 0, cover = false }: { kind: SketchKind; step?: number; cover?: boolean }) {
  const story = stories[kind];
  return <EditorialDrawing series={kind} index={cover ? 0 : 1} step={step} title={story.title} description={story.frames[step]} />;
}

export function SketchStory({ kind, staticMode = false }: { kind: SketchKind; staticMode?: boolean }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPlaying(false); return; }
    if (step >= 2) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setStep(s => s + 1), 2200);
    return () => window.clearTimeout(timer);
  }, [playing, step]);
  const story = stories[kind];
  return <figure className="article-sketch">
    <SketchSvg kind={kind} step={step} />
    <figcaption><strong>{story.title}</strong><p aria-live={playing ? 'off' : 'polite'}>{story.frames[step]}</p></figcaption>
    {!staticMode && <div className="sketch-controls" aria-label="Illustration story controls">
      {story.frames.map((_, i) => <button key={i} type="button" aria-label={`Show illustration step ${i + 1}`} aria-pressed={step === i} onClick={() => { setPlaying(false); setStep(i); }}>{i + 1}</button>)}
      <button type="button" onClick={() => { if (playing) setPlaying(false); else { setStep(0); setPlaying(true); } }}>{playing ? 'Pause sketch' : 'Play sketch'}</button>
      <DrawingZoom series={kind} index={1} step={step} title={story.title} description={story.frames[step]} />
    </div>}
    <details><summary>Read all three steps</summary><ol>{story.frames.map(frame => <li key={frame}>{frame}</li>)}</ol></details>
  </figure>;
}
