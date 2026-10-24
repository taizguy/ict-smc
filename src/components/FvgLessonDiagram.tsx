import { useState } from 'react';
import { fvgCopy as copy, fvgScenes, type FvgScene } from '../data/fvgLesson';
import { useTranslation } from '../i18n/TranslationProvider';

import { FvgStory } from './FvgStory';

const illustrationPath = (scene: FvgScene) => `/images/lessons/fvg-${scene.id}.svg`;

/** The same original drawing is used by the interactive view and downloadable SVGs. */
export function FvgIllustration({ scene, phase = 2 }: { scene: FvgScene; phase?: number }) {
  const { t } = useTranslation();
  const y = (price: number) => 30 + (110-price)*14;
  const visible = phase === 0 ? 2 : phase === 1 ? 3 : scene.bars.length;
  const ink = 'var(--fvg-ink,#162033)', up = 'var(--fvg-up,#127651)', down = 'var(--fvg-down,#c14239)', accent = 'var(--fvg-accent,#2453df)';
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" width="560" height="300" role="img" aria-label={t(scene.title.en)} className="chapter-diagram-canvas fvg-chart" style={{fontFamily:'system-ui,sans-serif'}}>
    <title>{t(scene.title.en)}</title><desc>{t(copy.caption.en)}</desc>
    <rect width="560" height="300" fill="var(--fvg-paper,#fff)"/>
    {[98,102,106,110].map(price=><g key={price} stroke="none"><line x1="45" x2="425" y1={y(price)} y2={y(price)} stroke={ink} opacity="0.1"/><text x="38" y={y(price)+5} fill={ink} fontSize="15" textAnchor="end">{price}</text></g>)}
    {phase>0 && scene.zone && <g>
      <rect x="72" y={y(scene.zone.high)} width="353" height={y(scene.zone.low)-y(scene.zone.high)} fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
      <line x1="72" x2="425" y1={y(101)} y2={y(101)} stroke={accent} strokeWidth="1" strokeDasharray="4 4"/>
      <text x="438" y={y(102)-4} fontSize="18" fill={accent}>102</text><text x="438" y={y(100)+17} fontSize="18" fill={accent}>100</text>
      <text x="438" y={y(101)+5} fontSize="16" fill={ink}>CE 101</text>
    </g>}
    {phase>0 && !scene.zone && [100,99.5].map(price=><line key={price} x1="72" x2="260" y1={y(price)} y2={y(price)} stroke={accent} strokeDasharray="4 4"/>)}
    {scene.bars.slice(0,visible).map((bar,index)=>{
      const x=72+index*72, color=bar.close>=bar.open?up:down;
      return <g key={index} stroke={color} strokeWidth="2">
        <line x1={x} x2={x} y1={y(bar.high)} y2={y(bar.low)}/>
        <rect x={x-11} y={y(Math.max(bar.open,bar.close))} width="22" height={Math.max(2,Math.abs(y(bar.open)-y(bar.close)))} rx="2" fill={color} stroke="none"/>
        <text x={x} y="268" textAnchor="middle" fill={ink} stroke="none" fontSize="18">{index+1}</text>
      </g>;
    })}
    {phase>0 && <line x1="296" x2="296" y1="24" y2="239" stroke={ink} opacity="0.35" strokeDasharray="3 5"/>}
  </svg>;
}

function PriceTable({scene, phase=2, count}:{scene:FvgScene;phase?:number;count?:number}) {
  const {t}=useTranslation();
  const visible=count ?? (phase===0?2:phase===1?3:scene.bars.length);
  return <details className="fvg-price-table"><summary>{t(copy.prices.en)}</summary><div className="fvg-table-scroll"><table>
    <caption>{t(scene.title.en)}</caption><thead><tr>{[copy.candle.en,'Open','High','Low','Close'].map(label=><th scope="col" key={label}>{t(label)}</th>)}</tr></thead>
    <tbody>{scene.bars.slice(0,visible).map((bar,i)=><tr key={i}><th scope="row">{i+1}</th>{[bar.open,bar.high,bar.low,bar.close].map((price,j)=><td key={j}><bdi>{price}</bdi></td>)}</tr>)}</tbody>
  </table></div></details>;
}

export function FvgLessonDiagram({staticOnly=false,onPractice}:{staticOnly?:boolean;onPractice?:()=>void}) {
  const {t,href}=useTranslation();
  const [selected,setSelected]=useState(0), [phase,setPhase]=useState(0), [count,setCount]=useState(0);
  const scene=fvgScenes[selected];
  return <section className="fvg-lesson" data-chapter-diagram="13" aria-labelledby="fvg-scenes-heading">
    <header className={staticOnly?undefined:"sr-only"}><h2 id="fvg-scenes-heading">{t(copy.heading.en)}</h2><p>{t(copy.intro.en)}</p></header>
    {staticOnly ? <div className="fvg-static-scenes">{fvgScenes.map(item=><figure key={item.id}>
      <h3>{t(item.title.en)}</h3><img src={illustrationPath(item)} alt={t(item.title.en)} width="560" height="300" loading="lazy"/>
      <figcaption><p>{t(item.rule.en)}</p><p>{t(item.outcome.en)}</p><p>{t(copy.caption.en)}</p></figcaption>
      <PriceTable scene={item}/><a href={illustrationPath(item)} download>{t(copy.download.en)}</a>
    </figure>)}</div> : <>
      <FvgStory onFrame={(index,nextPhase,known)=>{setSelected(index);setPhase(nextPhase);setCount(known);}}/>
      <PriceTable key={scene.id} scene={scene} phase={phase} count={count}/>
      <a className="fvg-download" href={illustrationPath(scene)} download>{t(copy.download.en)}</a>
      <p className="fvg-caption">{t(copy.caption.en)}</p>
    </>}
    <aside className="fvg-callout"><h3>{t(copy.distinction.en)}</h3><p>{t(copy.distinctionText.en)}</p></aside>
    <h3>{t(copy.context.en)}</h3><p>{t(copy.contextText.en)}</p>
    <p><a href="#curriculum-review-heading">{t(copy.source.en)}</a></p>
    <nav className="fvg-next" aria-label={t(copy.quiz.en)}>
      {onPractice ? <button type="button" onClick={onPractice}>{t(copy.quiz.en)}</button> : <a href="#chapter-quiz-13">{t(copy.quiz.en)}</a>}
      <a href={href('/tools/chartlab/btc-2022-bullish-model/')}>{t(copy.lab.en)}</a>
      <a href={href('/resources/ict-smc-cheat-sheet/')}>{t(copy.sheet.en)}</a>
    </nav><p className="fvg-caption">{t(copy.labScope.en)}</p>
  </section>;
}
