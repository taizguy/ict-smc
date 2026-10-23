import { useId } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
import type { MotionConcept } from './ConceptMotion';

// Invented geometry for explaining chart features, never live data or a signal.
const candles = [
 [260,302,242,318],[286,259,244,300],[261,280,250,303],[278,311,269,324],
 [307,278,263,320],[279,293,271,311],[294,341,280,367],[339,300,291,350],
 [301,236,224,315],[237,159,145,249],[162,184,150,201],[185,142,128,197],
 [144,121,107,165],[124,145,116,162],[143,108,91,154],[111,84,70,123],
];

export function PlaygroundChart({ active }: { active: MotionConcept }) {
 const { t } = useTranslation();
 const grid = `playground-grid-${useId().replace(/:/g, '')}`;
 return <svg className="playground-chart" viewBox="0 0 680 410" role="img" aria-label={t('Synthetic teaching chart. Illustrative prices, not live market data.')}>
  <defs><pattern id={grid} width="70" height="70" patternUnits="userSpaceOnUse"><path d="M70 0H0V70" className="playground-chart-grid"/></pattern></defs>
  <rect width="680" height="410" fill={`url(#${grid})`}/>
  <path d="M30 329H390" className="playground-chart-reference"/>
  <g className="playground-chart-zone" data-visible={active==='fvg'}>
   <rect x="335" y="201" width="247" height="23"/>
   <path d="M335 201H582M335 224H582"/>
   <text x="455" y="218">FVG</text>
  </g>
  <g className="playground-chart-zone" data-visible={active==='ob'}>
   <rect x="257" y="294" width="295" height="47"/>
   <text x="420" y="320">{t('Reference candle')}</text>
  </g>
  {candles.map(([open,close,high,low],i)=><g key={i} className={close<open?'playground-candle-up':'playground-candle-down'}><path d={`M${55+i*35} ${high}V${low}`}/><rect x={47+i*35} y={Math.min(open,close)} width="16" height={Math.max(3,Math.abs(open-close))} rx="1"/></g>)}
  <g className="playground-chart-zone playground-chart-sweep" data-visible={active==='sweep'}>
   <circle cx="265" cy="365" r="19"/><path d="M285 365h90"/>
   <text x="384" y="370">{t('Beyond the prior low')}</text>
  </g>
  <g className="playground-chart-axis" aria-hidden="true"><text x="620" y="80">110</text><text x="620" y="150">108</text><text x="620" y="220">106</text><text x="620" y="290">104</text><text x="620" y="360">102</text><text x="30" y="401">{t('Context')}</text><text x="280" y="401">{t('Liquidity event')}</text><text x="490" y="401">{t('Displacement')}</text></g>
 </svg>;
}
