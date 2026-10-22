import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

// Decorative, invented geometry: no live prices, signals or implied returns.
export function FooterMarketScene(){
 const [paused,setPaused]=useState(false);const {t}=useTranslation();
 return <div className="footer-market-scene" data-paused={paused}>
  <svg viewBox="0 0 1440 230" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
   <defs><linearGradient id="footer-market-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--color-canvas)" stopOpacity="0"/><stop offset="1" stopColor="var(--color-canvas)"/></linearGradient></defs>
   <path className="market-horizon market-horizon-back" d="M-80 180Q70 100 210 150T490 120T790 140T1090 100T1520 130V250H-80Z"/>
   <path className="market-horizon" d="M-80 210Q100 155 260 190T560 165T870 185T1190 145T1520 190V250H-80Z"/>
   <g className="market-candle-field">{Array.from({length:30},(_,i)=>{const x=i*50+8,y=104+Math.sin(i*.74)*37+Math.cos(i*.32)*20,h=18+(i*13%35),up=i%4!==1;return <g key={i} className={up?'market-candle-up':'market-candle-down'} style={{animationDelay:`${-i*.31}s`}}><path d={`M${x} ${y-15}V${y+h+17}`}/><rect x={x-6} y={y} width="12" height={h} rx="2"/></g>})}</g>
   <path className="market-trace" d="M-20 150L70 140L125 166L205 93L270 120L345 90L420 138L490 70L560 113L640 84L720 126L800 65L880 94L960 58L1040 106L1120 73L1200 115L1290 50L1370 85L1460 62"/>
  </svg>
  <button type="button" className="footer-scene-toggle" aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused?<Play size={14}/>:<Pause size={14}/>}<span>{t(paused?'Play footer animation':'Pause footer animation')}</span></button>
 </div>;
}
