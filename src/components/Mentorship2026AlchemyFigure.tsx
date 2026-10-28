import {useId,useState} from 'react';
import {useTranslation} from '../i18n/TranslationProvider';

// Only chapter 49 uses these compositions. No generated OHLC or presumed fills.
const plates=[
 ['A record is not a ceiling','At a record high, continuation and reversal remain possible; the sketch separates the two paths.'],
 ['Two prices make the ruler','The source’s 16:14 close of 29,510.00 and 09:30 open of 29,476.25 define a 33.75-point RTH gap.'],
 ['Build the level set, then check its origin','Check 0 and 1, enable the custom levels and verify the arithmetic from the prior-close origin.'],
 ['The same price at the wrong time is a different observation','The source passes 6.5 and 7 before 11:30, then examines 7.5 and 8 in the 11:30–12:30 setup hour.'],
 ['The line was passed before the response developed','Source-based event map: −8 at 29,780.00, high at 29,782.00 and the later short annotation at 29,773.25.'],
 ['Two midpoints, two different jobs','The nearer-lows midpoint is 29,678.375; the separate opening-gap CE is 29,493.125, both before rounding.'],
 ['Location → timing → response: keep the three tests separate','Hypothetical early touch and continued rise contrast with the source-based overshoot-and-response strip.'],
 ['A failed expectation stays a failed expectation','Separate May 13 MNQ example: planned stop reference 29,139.25 and later closing annotation 29,136.75.']
];
export function Mentorship2026AlchemyFigure({index=2,staticOnly=false,thumbnail=false}:{index?:number;staticOnly?:boolean;thumbnail?:boolean}){
 const {t}=useTranslation();const uid=useId().replace(/:/g,'');const [wrongOrigin,setWrongOrigin]=useState(false);const [active,setActive]=useState(0);const [play,setPlay]=useState(false);
 const label=(s:string)=>t(s);const [title,caption]=plates[index]||plates[2];
 const text=(x:number,y:number,s:string,cls='',anchor:'start'|'middle'|'end'='start')=><text x={x} y={y} className={cls} textAnchor={anchor}>{label(s)}</text>;
 const line=(x1:number,y1:number,x2:number,y2:number,cls='')=><line x1={x1} x2={x2} y1={y1} y2={y2} className={cls}/>;
 const svg=(children:React.ReactNode,view='0 0 720 320')=><div className="alchemy-art-scroll" tabIndex={0} role="region" aria-label={label(title)}><svg direction="ltr" className="m26-alchemy-art" viewBox={view} role="img" aria-labelledby={`${uid}-art-title ${uid}-art-desc`}><title id={`${uid}-art-title`}>{label(title)}</title><desc id={`${uid}-art-desc`}>{label(caption)}</desc>{children}</svg></div>;
 if(thumbnail)return <svg viewBox="0 0 320 180" role="img" aria-label={label('RTH gap ruler and its −8 projection')} className="alchemy-thumbnail"><title>{label('RTH gap ruler and its −8 projection')}</title><desc>{label('The 33.75-point source gap projects from 0 at 29,510.00 to −8 at 29,780.00.')}</desc><rect x="0" y="0" width="320" height="180" fill="var(--rr-paper,var(--bg))"/><path d="M55 145V35M45 40H245M45 145H245" fill="none" stroke="currentColor"/><path d="M65 122H225M65 110H225" stroke="var(--alchemy-blue,#4578db)"/><path d="M225 110V40" stroke="var(--alchemy-blue,#4578db)" strokeDasharray="4 5"/><text x="65" y="165" fill="currentColor" fontSize="12">{label('RTH 33.75')}</text><text x="250" y="44" fill="currentColor" fontSize="13">−8</text><text x="240" y="116" fill="currentColor" fontSize="11">0 / 1</text></svg>;
 return <figure className={`alchemy-plate alchemy-plate-${index} ${play?'is-playing':''}`} data-alchemy-visual={index} aria-labelledby={`${uid}-heading`}>
 <header><span className="alchemy-figure-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><h3 id={`${uid}-heading`}>{label(title)}</h3></header>
 {index===0&&svg(<>
  {line(45,138,675,138,'alchemy-dashed')}{text(48,125,'Earlier record','alchemy-muted')}
  <path d="M48 260 Q90 250 115 224 T190 218 T270 170 T350 150 T408 100" className="alchemy-ink alchemy-hand"/>
  <path d="M408 100 Q450 120 480 80 T585 38" className="alchemy-up alchemy-hand"/>
  <path d="M408 100 Q460 95 477 156 T590 244" className="alchemy-down alchemy-hand"/>
  <circle cx="408" cy="100" r="9" className="alchemy-dot"/>{text(493,40,'More highs?','alchemy-up-text')}{text(514,271,'Or a reversal?','alchemy-down-text')}
  <path d="M320 58q-9-26-27-5q-8 21 17 29m-12 1l-15 34m15-34l27 26m-27-20l-25 4" className="alchemy-ink alchemy-hand"/>{text(55,40,'“Too high” is not an entry rule.')}
 </>)}
 {index===1&&svg(<>
  <rect x="55" y="100" width="610" height="110" className="alchemy-wash"/>{line(55,100,665,100,'alchemy-blue')}{line(55,210,665,210,'alchemy-blue')}
  <circle cx="108" cy="100" r="7" className="alchemy-dot"/><circle cx="550" cy="210" r="7" className="alchemy-dot"/>
  {text(65,75,'0 · 29,510.00','alchemy-big')}{text(370,250,'1 · 29,476.25','alchemy-big')}
  {text(65,35,'Prior day · 16:14 close')}{text(420,290,'Current day · 09:30 open')}
  <path d="M308 112h-12v87h12m-6-86v87" className="alchemy-ink"/>{text(325,163,'33.75 points','alchemy-big')}
 </>)}
 {index===2&&<>
  <ol className="alchemy-build-steps">{[
   ['Place the anchors','0 · 29,510.00','1 · 29,476.25'],['Check orientation','0 above 1','Negative levels above 0'],['Enter custom levels','0 · 0.5 · 1','−6.5 · −7 · −7.5 · −8'],['Show the labels','Levels + Prices','Linear · extend right']
  ].map(([a,b,c],i)=><li key={a}><b>{i+1}</b><strong>{label(a)}</strong><div className="alchemy-mini-art"><svg direction="ltr" className="m26-alchemy-art" viewBox="0 0 140 90" role="img" aria-labelledby={`${uid}-mini-${i}-title ${uid}-mini-${i}-desc`}><title id={`${uid}-mini-${i}-title`}>{label(a)}</title><desc id={`${uid}-mini-${i}-desc`}>{`${label(b)}; ${label(c)}`}</desc>{i===0?<><path d="M15 20H120M15 72H120M35 20L100 72"/><circle cx="35" cy="20" r="4"/><circle cx="100" cy="72" r="4"/></>:i===1?<><path d="M20 70V15m-5 8 5-8 5 8M45 68H120M45 50H120M45 30H120"/><text x="30" y="85">0 → −8</text></>:i===2?<><path d="m15 22 5 5 10-13m-15 32 5 5 10-13m-15 32 5 5 10-13M48 20H125M48 44H125M48 68H125"/></>:<><path d="M12 24H90m-5-5 5 5-5 5M12 52H120m-5-5 5 5-5 5"/><text x="15" y="80">−8 · 29,780</text></>}</svg></div><span dir="ltr">{label(b)}</span><span>{label(c)}</span></li>)}</ol>
  <div className="alchemy-formula"><span>{label('Source orientation')}</span><strong dir="ltr">P(r) = 29,510 − r × 33.75</strong><p dir="ltr">{label('−7 = 29,746.25 · −8 = 29,780.00')}</p></div>
  {!staticOnly&&<button type="button" className="alchemy-control" data-nosnippet="" aria-label={label(wrongOrigin?'Restore the source’s zero anchor':'Test the wrong origin: start at the opening price')} aria-pressed={wrongOrigin} onClick={()=>setWrongOrigin(v=>!v)}>{label(wrongOrigin?'Restore the source’s zero anchor':'Test the wrong origin: start at the opening price')}</button>}
  {wrongOrigin&&<p className="alchemy-error" role="status">{label('Opening + 8 gaps = 29,746.25: that is the source’s −7, one gap below −8.')}</p>}
 </>}
 {index===3&&svg(<>
  <rect x="360" y="45" width="210" height="220" className="alchemy-wash"/>{text(125,30,'Before 11:30','', 'middle')}{text(465,30,'11:30–12:30','', 'middle')}
  {['−8 · 29,780','−7.5 · 29,763.125','−7 · 29,746.25','−6.5 · 29,729.375'].map((s,i)=><g key={s}>{line(40,75+i*54,680,75+i*54,'alchemy-grid')}{text(45,68+i*54,s)}{i<2?<><circle cx="465" cy={75+i*54} r="8" className="alchemy-dot"/>{text(490,81+i*54,'Inspect')}</>:<><path d={`M270 ${69+i*54}l6 6 12-14`} className="alchemy-up"/>{text(306,81+i*54,'Already exceeded')}</>}</g>)}
  {line(360,45,360,272,'alchemy-dashed')}{text(390,298,'Setup hour inside the lunch interval')}
 </>)}
 {index===4&&svg(<>
  <rect x="44" y="85" width="620" height="58" className="alchemy-wash"/>{line(40,143,675,143,'alchemy-blue')}{text(45,167,'−8 · 29,780.00')}
  <path d="M55 253L160 222L254 181L335 118L400 85L433 122L478 106L525 168L585 235L650 278" className="alchemy-ink"/>
  <circle cx="400" cy="85" r="7" className="alchemy-dot"/>{text(360,39,'High · 29,782.00','alchemy-big')}{text(360,63,'2-point overshoot')}
  <path d="M478 106V55H630" className="alchemy-dashed"/>{text(510,82,'No fresh extension')}
  <circle cx="525" cy="168" r="6" className="alchemy-down-dot"/>{text(45,300,'Source annotation: short 29,773.25; exact fill time unverified')}
  <path d="M510 180L475 225H340" className="alchemy-dashed"/>{text(220,250,'Bearish response + imbalance changes use')}
 </>)}
 {index===5&&svg(<>
  <path d="M90 50V277m-7-10 7 10 7-10" className="alchemy-ink"/>{text(40,28,'Exit references')}
  {[['29,692.25','Nearer low',70],['29,678.375','Midpoint of these lows',120],['29,664.50','Nearer low',170],['29,595.50','Deeper marked low',245]].map(([price,name,y])=><g key={price}>{line(115,Number(y),420,Number(y),name==='Midpoint of these lows'?'alchemy-dashed':'alchemy-grid')}{text(130,Number(y)-8,String(price),'alchemy-big')}{text(440,Number(y)+5,String(name))}</g>)}
  <rect x="128" y="275" width="550" height="34" rx="3" className="alchemy-wash"/>{text(140,297,'Later low 29,595.25 · just one tick through')}
 </>)}
 {index===6&&<>
  {!staticOnly&&<div className="alchemy-playback" data-nosnippet=""><button type="button" className="alchemy-control" aria-label={label(play?'Pause the comparison':'Animate the three outcomes')} aria-pressed={play} onClick={()=>setPlay(v=>!v)}>{label(play?'Pause the comparison':'Animate the three outcomes')}</button><span>{label('Hypothetical contrasts; no order is placed.')}</span></div>}
  <div className="alchemy-outcomes">{[
   ['Too early','Before 11:30: outside this study window.','M20 102L70 88L110 42L150 50L195 22'],['Response after overshoot','Inspect the response; a touch alone is insufficient.','M20 102L65 82L110 30L140 50L160 44L195 105'],['No bearish response','Continued expansion: no qualified short demonstrated.','M20 102L65 82L110 42L145 50L195 15']
  ].map(([a,b,path],i)=><section key={a} className={active===i?'is-selected':''}><h4>{label(a)}</h4><svg direction="ltr" className="m26-alchemy-art" viewBox="0 0 220 130" role="img" aria-labelledby={`${uid}-outcome-${i}-title ${uid}-outcome-${i}-desc`}><title id={`${uid}-outcome-${i}-title`}>{label(a)}</title><desc id={`${uid}-outcome-${i}-desc`}>{label(b)}</desc><path d="M15 48H205" className="alchemy-dashed"/><path d={path} className="alchemy-outcome-path alchemy-ink"/><text x="15" y="125">{label(i===0?'Early touch':i===1?'Overshoot → response':'Expansion continues')}</text></svg><p>{label(b)}</p>{!staticOnly&&<button type="button" className="alchemy-control" data-nosnippet="" aria-label={`${label('Focus this outcome')}: ${label(a)}`} onClick={()=>setActive(i)} aria-pressed={active===i}>{label('Focus this outcome')}</button>}</section>)}</div>
 </>}
 {index===7&&svg(<>
  <rect x="25" y="40" width="312" height="225" rx="3" className="alchemy-wash"/><rect x="375" y="40" width="320" height="225" rx="3" className="alchemy-loss-wash"/>
  {text(45,25,'Before: expected expansion')}{text(395,25,'After: expectation fails')}
  <path d="M50 190L94 158L127 165L160 110L193 120L225 95" className="alchemy-up"/>
  <path d="M403 98L440 110L478 105L515 133L552 155L597 185L659 220" className="alchemy-down"/>
  {line(45,205,315,205,'alchemy-dashed')}{text(45,245,'Stop reference · 29,139.25')}
  {line(395,205,675,205,'alchemy-dashed')}<circle cx="659" cy="220" r="6" className="alchemy-down-dot"/>{text(395,245,'Exit annotation · 29,136.75')}
  {text(35,298,'Separate May 13 AM long · not the May 14 lunch projection')}
 </>)}
 <figcaption id={`${uid}-caption`}>{label(caption)}</figcaption>
 </figure>;
}
