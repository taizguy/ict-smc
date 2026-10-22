import { useTranslation } from '../../i18n/TranslationProvider';

/** Bullish geometry only; direction selection still controls the actual engine. */
export function FvgRulePreview() {
 const {t}=useTranslation();
 return <figure className="lab-rule-preview"><svg viewBox="0 0 420 150" role="img" aria-label={t('Bullish FVG rule illustration')}>
  <title>{t('Bullish FVG rule illustration')}</title>
  <rect x="46" y="70" width="190" height="15" fill="var(--color-brand)" opacity=".12"/>
  <path d="M46 70H236M46 85H236" fill="none" stroke="var(--color-brand)" strokeDasharray="4 3"/>
  {[[70,85,120,102,113],[145,48,112,56,104],[220,30,70,40,62]].map(([x,high,low,top,bottom])=><g key={x} stroke="var(--color-positive)" fill="var(--color-positive)"><path d={`M${x} ${high}V${low}`}/><rect x={x-10} y={top} width="20" height={bottom-top}/></g>)}
  <text x="110" y="79" className="lab-axis">FVG</text>
  <path d="M260 40H300M260 40L270 35M260 40L270 45" fill="none" stroke="var(--color-brand)" strokeWidth="1.5"/>
  <text x="307" y="44" className="lab-axis">{t('Next open')}</text>
  <path d="M46 120H300" stroke="var(--color-negative)" strokeDasharray="4 3"/>
  <text x="307" y="124" className="lab-axis">{t('Stop')}</text>
 </svg><figcaption>{t('Bullish example: the gap forms between the outer wicks. Entry follows confirmation.')}</figcaption></figure>;
}
