import React, { useEffect, useId, useState } from 'react';
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

function Person({ x, y, raised = false }: { x: number; y: number; raised?: boolean }) {
  return <g transform={`translate(${x} ${y})`} fill="none" stroke="#263c3a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M-16 -54 C-19 -80 16 -81 18 -57 C19 -35 -13 -33 -16 -54Z" fill="#ffffff" />
    <path d="M1 -34 L-1 23 M0 22 L-24 63 M0 22 L26 62" />
    <path d={raised ? 'M0 -18 L-29 -40 L-40 -64 M0 -18 L33 -49 L42 -72' : 'M0 -18 L-32 5 M0 -18 L32 3'} />
    <path d="M-6 -59 L-5 -57 M7 -59 L8 -57 M-4 -48 Q2 -44 7 -49" strokeWidth="2" />
  </g>;
}

/** Original LearnSMC vector artwork; no third-party characters or chart images. */
export function SketchSvg({ kind, step = 0 }: { kind: SketchKind; step?: number }) {
  const titleId = useId();
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 350" width="720" height="350" className="article-sketch-svg" role="img" aria-labelledby={titleId}>
    <title id={titleId}>{`${stories[kind].title}. ${stories[kind].frames[step]}`}</title>
    <rect width="720" height="350" rx="14" fill="#ffffff" />
    <path d="M32 306 Q330 298 686 307" stroke="#b8beac" strokeWidth="2" fill="none" />
    {kind === 'decision' && <>
      <path d="M230 73 L430 68 L435 265 L225 270Z" fill="#ffffff" stroke="#263c3a" strokeWidth="3" />
      <text x="256" y="112" fill="#263c3a" fontSize="24" fontFamily="sans-serif">THE PLAN</text>
      {[145, 180, 215].map((y, i) => <g key={y}><path d={`M256 ${y} l7 7 14 -18`} stroke="#39766c" strokeWidth="4" fill="none" /><path d={`M294 ${y} l${90 - i * 12} -2`} stroke="#a4afa0" strokeWidth="3" /></g>)}
      <Person x={137} y={231} raised={step === 0} />
      <path d="M497 94 L654 104 L647 252 L487 247Z" fill={step === 1 ? '#f5c1a9' : '#cee2d5'} stroke="#263c3a" strokeWidth="3" />
      <text x="512" y="144" fill="#263c3a" fontSize="22" fontFamily="sans-serif">RESULT</text>
      <text x="514" y="206" fill="#263c3a" fontSize="43" fontFamily="serif">{step === 1 ? '−1R' : '?'}</text>
      {step === 2 && <path d="M445 180 l25 0 m-12 -10 12 10 -12 10" stroke="#39766c" strokeWidth="4" fill="none" />}
    </>}
    {kind === 'drawdown' && <>
      <path d="M260 160 L260 305 L527 305 L527 160" stroke="#263c3a" strokeWidth="4" fill="#e7d7b8" />
      <path d="M480 302 L419 117 M503 296 L443 108 M469 268 L491 261 M458 234 L479 227 M447 200 L468 193 M437 167 L458 160 M426 134 L447 127" stroke="#39766c" strokeWidth="5" fill="none" strokeLinecap="round" />
      <Person x={step === 0 ? 163 : step === 1 ? 340 : 581} y={step === 1 ? 240 : 101} raised={step === 2} />
      <text x="76" y="237" fontSize="32" fill="#263c3a" fontFamily="serif">100</text>
      <text x="336" y="151" fontSize="32" fill="#9b4f35" fontFamily="serif">{step === 1 ? '80 → 96' : '80'}</text>
      <text x="555" y="237" fontSize="32" fill="#39766c" fontFamily="serif">{step === 2 ? '+25%' : '?'}</text>
    </>}
    {kind === 'auction' && <>
      <Person x={105} y={233} raised={step === 1} />
      <path d="M222 100 L628 104 L623 279 L219 273Z" fill="#ffffff" stroke="#263c3a" strokeWidth="3" />
      <text x="248" y="144" fontSize="22" fill="#263c3a" fontFamily="sans-serif">PRICE</text><text x="405" y="144" fontSize="22" fill="#263c3a" fontFamily="sans-serif">OFFERED UNITS</text>
      {[0, 1].map(row => <g key={row}><text x="250" y={194 + row * 55} fontSize="28" fill="#263c3a" fontFamily="serif">{row ? '101' : '100'}</text>{Array.from({ length: row ? 4 : 3 }, (_, i) => <rect key={i} x={412 + i * 43} y={171 + row * 55} width="29" height="29" rx="5" stroke="#39766c" strokeWidth="2" fill={step > 0 && (row === 0 || i < 2) ? '#e5a07d' : '#cee2d5'} />)}</g>)}
      <path d="M145 177 L202 177 m-12 -10 12 10 -12 10" stroke="#263c3a" strokeWidth="3" fill="none" />
    </>}
    {kind === 'onchain' && <>
      {[10, 20, 30].map((n, i) => <g key={n}><circle cx={140 + i * 155} cy="124" r="43" fill="#efd392" stroke="#263c3a" strokeWidth="3" /><text x={140 + i * 155} y="134" textAnchor="middle" fontSize="32" fill="#263c3a" fontFamily="serif">{step === 1 ? 40 : n}</text></g>)}
      <path d="M140 177 L142 221 L448 221 L449 177 M297 177 L297 219" stroke="#263c3a" strokeWidth="3" fill="none" />
      <text x="295" y="278" textAnchor="middle" fontSize="27" fill="#39766c" fontFamily="sans-serif">{step === 0 ? 'movement value: 60' : step === 1 ? 'market value: 120' : 'ratio: 2 ≠ a prediction'}</text>
      <Person x={603} y={232} raised={step === 2} />
    </>}
  </svg>;
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
    </div>}
    <details><summary>Read all three steps</summary><ol>{story.frames.map(frame => <li key={frame}>{frame}</li>)}</ol></details>
  </figure>;
}
