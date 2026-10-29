import type { LabBar } from '../../utils/backtestEngine';
import { useTranslation } from '../../i18n/TranslationProvider';

/** Honest no-JS/loading preview from the same revealed candles, never future bars. */
export function ReadingChart({ bars }: { bars: LabBar[] }) {
  const { t } = useTranslation();
  const min = Math.min(...bars.map(bar => bar.low)), max = Math.max(...bars.map(bar => bar.high));
  const span = Math.max(max - min, .01), y = (price: number) => 385 - (price - min) / span * 350;
  const current = bars.at(-1), step = 620 / Math.max(bars.length, 1);
  return <div className="market-chart" dir="ltr" data-reading-chart="true">
    <div className="market-ohlc">{current && <><span>{new Date(current.time).toISOString().slice(11, 16)} UTC</span>{(['open','high','low','close'] as const).map((key,i)=><span key={key}>{['O','H','L','C'][i]} <b>{Number(current[key].toFixed(5))}</b></span>)}</>}</div>
    <div className="market-plot"><svg viewBox="0 0 720 420" width="100%" height="420" role="img" aria-label={t('Reading preview of the revealed illustrative candles')} style={{background:'var(--wb-chart-paper)',color:'var(--wb-chart-ink)'}}>
      {[0,1,2,3,4].map(i => <g key={i}><path d={`M12 ${35+i*87.5}H652`} stroke="var(--wb-chart-grid)"/><text x="660" y={39+i*87.5} fill="currentColor" fontSize="12">{(max-i*span/4).toFixed(2)}</text></g>)}
      {bars.map((bar,i) => { const x=25+(i+.5)*step, color=bar.close>=bar.open?'#178667':'#cf4b59';return <g key={bar.time}><title>{`${i+1}: O ${bar.open}, H ${bar.high}, L ${bar.low}, C ${bar.close}`}</title><path d={`M${x} ${y(bar.high)}V${y(bar.low)}`} stroke={color} strokeWidth="2"/><rect x={x-Math.min(10,step*.3)} y={Math.min(y(bar.open),y(bar.close))} width={Math.min(20,step*.6)} height={Math.max(2,Math.abs(y(bar.open)-y(bar.close)))} fill={color}/></g>;})}
    </svg></div>
    <p className="market-credit">{t('Reading preview. Interactive chart controls load separately.')}</p>
  </div>;
}
