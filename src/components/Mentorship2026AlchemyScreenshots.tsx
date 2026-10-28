import {useId,useState} from 'react';
import {useTranslation} from '../i18n/TranslationProvider';
const root='/images/lessons/market-alchemy/';
const setup=[
 {file:'fib-tool-menu.png',title:'1 · Select Fib Retracement',alt:'TradingView Gann and Fibonacci menu with the two-point Fib retracement row at the top.',caption:'Open Gann and Fibonacci tools in the left toolbar, then select Fib retracement.',spots:[[1,4.2,9.7,21.5,8]]},
 {file:'fib-coordinates.png',title:'2 · Enter the two prices',alt:'TradingView Coordinates dialog showing endpoint prices 29,476.25 and 29,510.00; the background is an interface demonstration.',caption:'Enter the two prices in Coordinates; use your own dated bar positions and confirm 0 is at 29,510.00.',spots:[[2,44.8,18.8,8.7,14]]},
 {file:'fib-style-levels.png',title:'3 · Set ratios and extension',alt:'TradingView Style settings with custom negative projection levels and the Extend lines right selection.',caption:'In Style, enable 0, 0.5, 1, −6.5, −7, −7.5 and −8; select Extend lines right.',spots:[[3,36.5,32.5,26.7,29]]},
 {file:'fib-style-labels.png',title:'4 · Show labels and check scale',alt:'TradingView Style settings with Prices and Levels checked and Fib levels based on log scale unchecked.',caption:'Enable Prices and Levels; keep log-based Fib calculation off for this linear measurement.',spots:[[4,36.5,43.8,16.5,12],[5,36.5,79.6,21.5,5.7]]}
] as const;
export function AlchemySetupScreenshots({staticOnly=false}:{staticOnly?:boolean}){
 const {t}=useTranslation();const [step,setStep]=useState(0);const uid=useId().replace(/:/g,'');
 return <section className="alchemy-screenshots" aria-labelledby={`${uid}-heading`}><h3 id={`${uid}-heading`}>{t('TradingView clicks: an annotated interface walkthrough')}</h3>
 <p>{t('These screenshots demonstrate the controls on available June data. Reproduce the dated one-minute anchors from the source, not the pictured background candles or bar indices.')}</p>
 {!staticOnly&&<div className="alchemy-shot-controls" role="group" aria-label={t('Choose a setup screenshot')} data-nosnippet="">{setup.map((item,i)=><button type="button" className="alchemy-control" key={item.file} aria-label={t(item.title)} aria-pressed={i===step} onClick={()=>setStep(i)}>{t(item.title)}</button>)}</div>}
 {setup.map((item,i)=><figure key={item.file} hidden={!staticOnly&&i!==step}>
 <div className="alchemy-annotated-shot"><img src={root+item.file} alt={t(item.alt)} width="1280" height="720" loading="lazy" decoding="async"/>{item.spots.map(([n,x,y,w,h])=><span key={n} className="alchemy-shot-target" style={{left:x+'%',top:y+'%',width:w+'%',height:h+'%'}}><b>{n}</b></span>)}</div>
 <figcaption>{t(item.caption)} <a href={root+item.file} target="_blank" rel="noreferrer" data-nosnippet="">{t('View full-size setup screenshot')}</a></figcaption>
 </figure>)}
 </section>;
}
export function AlchemySourceSnapshot(){const {t}=useTranslation();return <section className="alchemy-source-snapshots" aria-labelledby="alchemy-real-chart-heading"><h3 id="alchemy-real-chart-heading">{t('Real chart reference: the May 14 overshoot')}</h3><p>{t('These attributed frames are from ICT’s original TradingView recording. They are the source evidence behind the simplified drawings, rather than a newly reconstructed May minute feed.')}</p>
 <figure><a href={root+'ict-may14-overshoot-source.jpg'} target="_blank" rel="noreferrer"><img src={root+'ict-may14-overshoot-source.jpg'} width="1920" height="1080" loading="lazy" decoding="async" alt={t('Original ICT TradingView frame: candle header high 29,782.00 and −8 line at 29,780.00, with the source’s Fib settings visible.')}/></a><figcaption>{t('Source frame: 29,782.00 high against the 29,780.00 projection.')} <a href="https://www.youtube.com/watch?v=wprXVW1pW9Y&t=2200s">{t('ICT, May 14, 2026 · 36:40')}</a></figcaption></figure>
 <details><summary>{t('Compare the later response on the original chart')}</summary><figure><a href={root+'ict-may14-response-source.jpg'} target="_blank" rel="noreferrer"><img src={root+'ict-may14-response-source.jpg'} width="1920" height="1080" loading="lazy" decoding="async" alt={t('Original May 14 ICT chart showing the −8 projection, displayed short annotation at 29,773.25 and nearer lows at 29,692.25 and 29,664.50.')}/></a><figcaption>{t('The later source chart carries the short annotation and nearer-low references.')} <a href="https://www.youtube.com/watch?v=wprXVW1pW9Y&t=2390s">{t('ICT, May 14, 2026 · 39:50')}</a></figcaption></figure></details>
 </section>;}
