import {useEffect,useId,useRef,useState} from 'react';
import {Play,Pause,RotateCcw,ChevronRight} from 'lucide-react';
import type {IChartApi,ISeriesApi,IPriceLine,UTCTimestamp,Time} from 'lightweight-charts';
import catalog from '../data/chapters/mentorship2025Replays.json';
import {useTranslation} from '../i18n/TranslationProvider';

type Candle={time:number;open:number;high:number;low:number;close:number};
type Level={price:number;label:string;after:number;tone:string};
type Area={start:number;end:number;low:number;high:number;label:string;after:number};
type Replay={dataSha256:string;markers?:{index:number;label:string}[];id:string;chapter:number;title:string;definition:string;url:string;symbol:string;interval:number;steps:{count:number;lastTime:number;title:string;explanation:string}[];levels:Level[];areas:Area[];preview:Candle[];barCount:number;first:number;last:number;source:string;window?:{start:number;end:number;label:string}|null;comparisonSymbol?:string;comparisonLevels?:Level[]};
type Payload={bars:Candle[];comparison?:Candle[]};
const cases=catalog as Replay[];
const price=(n:number)=>n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:4});
const clock=(time:number,daily=false)=>daily?date(time):new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(time*1000));
const date=(time:number)=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(time*1000));return ['year','month','day'].map(type=>p.find(v=>v.type===type)!.value).join('-');};
const tones={blue:'#2864d7',orange:'#aa4e12',violet:'#8053bd',teal:'#127565'};
const paint=(tone:string,dark:boolean)=>dark?({blue:'#95bdff',orange:'#ffc28c',violet:'#d2b2ff',teal:'#8cdac4'}[tone]||'#95bdff'):(tones[tone as keyof typeof tones]||tones.blue);
function validPayload(data:Payload,example:Replay){return data&&Array.isArray(data.bars)&&data.bars.length===example.barCount&&data.bars.every((b,i)=>[b.time,b.open,b.high,b.low,b.close].every(Number.isFinite)&&b.low<=Math.min(b.open,b.close)&&b.high>=Math.max(b.open,b.close)&&(i===0||b.time>data.bars[i-1].time))&&(!example.comparisonSymbol||(data.comparison?.length===data.bars.length&&data.comparison.every((b,i)=>b.time===data.bars[i].time)));}

export function Mentorship2025Replay({chapterId,caseId,staticOnly=false}:{chapterId:number;caseId?:string;staticOnly?:boolean}){
 const {t}=useTranslation();
 const options=cases.filter(c=>c.chapter===chapterId&&(!caseId||c.id===caseId));
 const [selected,setSelected]=useState(options[0]?.id);
 if(!options.length)return null;
 const active=options.find(c=>c.id===selected)||options[0];
 if(staticOnly)return <div className="m25-replay-library">{options.map(example=><ReplayExample key={example.id} example={example} staticOnly/>)}</div>;
 return <div className="m25-replay-library">
  {options.length>1&&<div className="m25-replay-tabs" role="group" aria-label={t('Choose one concept at a time')}>{options.map((c,i)=><button type="button" key={c.id} aria-pressed={active.id===c.id} onClick={()=>setSelected(c.id)}><span>{i+1}</span>{t(c.title)}</button>)}</div>}
  <ReplayExample key={active.id} example={active}/>
 </div>;
}
function ReplayExample({example,staticOnly=false}:{example:Replay;staticOnly?:boolean}){
 const {t}=useTranslation();const uid=useId().replace(/:/g,'');
 const root=useRef<HTMLElement>(null);
 const [enabled,setEnabled]=useState(false),[payload,setPayload]=useState<Payload|null>(null),[failed,setFailed]=useState(false);
 const [count,setCount]=useState(example.steps[0].count),[playing,setPlaying]=useState(false);
 const visible=staticOnly?example.barCount:count;
 const phase=example.steps.reduce((last,s,i)=>s.count<=visible?i:last,0);
 const step=example.steps[phase];
 useEffect(()=>{
  if(staticOnly||!root.current)return;
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setEnabled(true);observer.disconnect();}},{rootMargin:'300px'});
  observer.observe(root.current);return()=>observer.disconnect();
 },[staticOnly]);
 useEffect(()=>{
  if(!enabled||staticOnly)return;
  const abort=new AbortController();
  fetch(example.url,{signal:abort.signal}).then(r=>{if(!r.ok)throw Error('data unavailable');return r.json();}).then(data=>{if(!validPayload(data,example))throw Error('invalid candles');setPayload(data);}).catch(error=>{if(error.name!=='AbortError')setFailed(true);});
  return()=>abort.abort();
 },[enabled,example,staticOnly]);
 useEffect(()=>{
  if(!playing)return;
  const timer=window.setTimeout(()=>{if(count>=example.barCount)setPlaying(false);else setCount(n=>n+1);},420);
  return()=>window.clearTimeout(timer);
 },[count,playing,example.barCount]);
 useEffect(()=>{const stop=()=>{if(document.hidden)setPlaying(false);};document.addEventListener('visibilitychange',stop);return()=>document.removeEventListener('visibilitychange',stop);},[]);
 const select=(n:number)=>{setPlaying(false);setCount(n);};
 return <figure className="m25-study m25-replay" data-market-data-hash={example.dataSha256} ref={root} aria-labelledby={`${uid}-title`}>
  <header className="m25-replay-heading"><span className="delivery-kicker">{t('Historical market candles · guided replay')}</span><h3 id={`${uid}-title`}>{t(example.title)}</h3><p>{t(example.definition)}</p></header>
  <div className="m25-replay-meta" dir="ltr"><strong translate="no">{example.symbol}</strong><span>{example.interval===1440?'1D':`${example.interval}m`}</span><span>{date(example.first)} — {date(example.last)}</span><span>{t('New York time')}</span></div>
  {example.window&&<p className="m25-window-caption"><span className="m25-window-key"/>{t('Observation window')}: <bdi>{example.window.label}</bdi></p>}
  {staticOnly?<CandlePreview example={example}/>:payload?<>
   <ChartPanel example={example} bars={payload.bars} count={count} levels={example.levels} areas={example.areas} symbol={example.symbol}/>
   {payload.comparison&&<ChartPanel example={example} bars={payload.comparison} count={count} levels={example.comparisonLevels||[]} areas={[]} symbol={example.comparisonSymbol!} compact/>}
  </>:<div className={`m25-chart-loading ${example.comparisonSymbol?'m25-pair-loading':''}`}><CandlePreview example={example} until={step.lastTime} revealed={count}/><p role="status">{t(failed?'Chart data could not load. The static preview and source remain available.':'Loading the historical candlestick chart…')}</p></div>}
  {example.levels.length>0&&<div className="m25-replay-levels" aria-label={t('Match the values to the coloured chart lines')}>{example.levels.filter(l=>l.after<=visible).map(l=><div className={`m25-value m25-value-${l.tone}`} key={l.label}><span>{t(l.label)}</span><strong dir="ltr">{price(l.price)}</strong></div>)}{!example.levels.some(l=>l.after<=visible)&&<p>{t('Final boundaries stay hidden until the measurement is complete.')}</p>}</div>}
  {!staticOnly&&<div className="m25-replay-controls">
   <div className="m25-replay-actions"><button type="button" disabled={!payload||failed} onClick={()=>{if(count>=example.barCount)setCount(example.steps[0].count);setPlaying(!playing);}}>{playing?<Pause size={16}/>:<Play size={16}/>} {t(playing?'Pause replay':'Play candles')}</button><button type="button" disabled={!payload||count>=example.barCount} onClick={()=>select(Math.min(count+1,example.barCount))}>{t('Next candle')}<ChevronRight size={16}/></button><button type="button" onClick={()=>select(example.steps[0].count)} aria-label={t('Restart this example')}><RotateCcw size={16}/></button></div>
   <label className="m25-scrubber">{t('Completed candles revealed')} <output dir="ltr">{count} / {example.barCount}</output><input type="range" disabled={!payload} min={example.steps[0].count} max={example.barCount} step="1" value={count} aria-label={t('Completed candles revealed')} onChange={e=>select(Number(e.target.value))}/></label>
   <p className="m25-chart-help">{t('Drag to pan · scroll or pinch to zoom · point at a candle to inspect its prices.')}</p>
  </div>}
  <div className="m25-replay-steps" aria-label={t('Guided observations')}>{example.steps.map((s,i)=>staticOnly?<section key={i}><h4>{t(s.title)}</h4><p>{t(s.explanation)}</p></section>:<button key={i} type="button" disabled={!payload} aria-pressed={phase===i} onClick={()=>select(s.count)}><span>{i+1}</span>{t(s.title.replace(/^\d · /,''))}</button>)}</div>
  {!staticOnly&&<figcaption className="m25-replay-explanation" aria-live="polite"><strong>{t(step.title)}</strong><p>{t(step.explanation)}</p></figcaption>}
  <footer className="m25-replay-source">{example.symbol==='NQ=F'&&example.levels.some(l=>Math.abs(l.price*4-Math.round(l.price*4))>.00001)&&<p>{t('A calculated midpoint can fall between valid futures ticks. A reference is not automatically an executable order price.')}</p>}<p>{t(example.interval===1440?'Selected historical example, not a verified trade or a representative performance sample. Daily bars use the provider’s trading-date labels; they do not establish an intraday opening time or sequence.':'Selected historical example, not a verified trade or a representative performance sample. Bar times mark their start; a completed bar becomes known after its interval ends.')}</p><p>{t('Data source')}: <a href={example.source} translate="no">Yahoo Finance · {example.symbol}</a> · {t('Chart engine')}: <a href="https://www.tradingview.com/lightweight-charts/" translate="no">TradingView Lightweight Charts™</a></p>{example.id==='fomc-stages'&&<p><a href="https://www.federalreserve.gov/monetarypolicy/fomcpresconf20260916.htm">{t('Federal Reserve event reference')}</a></p>}</footer>
 </figure>;
}
function CandlePreview({example,until,revealed}:{example:Replay;until?:number;revealed?:number}){
 const {t}=useTranslation();const bars=example.preview.filter(b=>until===undefined||b.time<=until);
 const refs=example.levels.filter(l=>revealed===undefined||l.after<=revealed);
 const lo=Math.min(...bars.map(b=>b.low),...refs.map(l=>l.price)),hi=Math.max(...bars.map(b=>b.high),...refs.map(l=>l.price));const range=hi-lo||1;
 const y=(p:number)=>210-(p-lo)/range*170,x=(i:number)=>35+i*560/Math.max(1,bars.length-1);
 return <div className="m25-static-chart"><svg className="m25-replay-preview" viewBox="0 0 680 255" role="img" aria-label={t(example.title)}><title>{t(example.title)}</title><desc>{t('Static overview of selected original candles. The interactive replay contains the complete sequence.')}</desc>{[0,.5,1].map(f=><g key={f}><line x1="24" x2="600" y1={y(lo+range*f)} y2={y(lo+range*f)} stroke="var(--rr-line)"/><text x="610" y={y(lo+range*f)+4}>{price(lo+range*f)}</text></g>)}{bars.map((b,i)=><g key={b.time} className={b.close>=b.open?'m25-candle-up':'m25-candle-down'}><line x1={x(i)} x2={x(i)} y1={y(b.high)} y2={y(b.low)}/><rect x={x(i)-3} y={y(Math.max(b.open,b.close))} width="6" height={Math.max(1,Math.abs(y(b.open)-y(b.close)))}/></g>)}<text x="24" y="244">{date(example.first)}</text><text x="490" y="244">{date(example.last)}</text></svg><p>{t('Static overview of selected original candles. The interactive replay contains the complete sequence.')}</p></div>;
}

function ChartPanel({example,bars,count,levels,areas,symbol,compact=false}:{example:Replay;bars:Candle[];count:number;levels:Level[];areas:Area[];symbol:string;compact?:boolean}){
 const {t,locale}=useTranslation();const host=useRef<HTMLDivElement>(null),api=useRef<IChartApi|null>(null),series=useRef<ISeriesApi<'Candlestick'>|null>(null);
 const latest=useRef({bars,count,levels,areas,t});latest.current={bars,count,levels,areas,t};
 const [ready,setReady]=useState(0),[failed,setFailed]=useState(false),[hover,setHover]=useState<Candle|null>(null),[boxes,setBoxes]=useState<{left:number;top:number;width:number;height:number;label:string}[]>([]),[band,setBand]=useState<{left:number;width:number}|null>(null);
 const markerApi=useRef<ReturnType<typeof import('lightweight-charts')['createSeriesMarkers']>|null>(null);
 const lines=useRef<IPriceLine[]>([]),layout=useRef<()=>void>(()=>{});
 useEffect(()=>{
  if(!host.current)return;let cancelled=false,cleanup=()=>{};
  import('lightweight-charts').then(lib=>{
   if(cancelled||!host.current)return;
   try{
    const colors=()=>{const styles=getComputedStyle(host.current!.closest('.reading-room')||host.current!);const dark=document.documentElement.dataset.theme==='dark';return {dark,paper:styles.getPropertyValue('--rr-paper').trim()||(dark?'#24231f':'#faf7ef'),ink:styles.getPropertyValue('--rr-ink').trim()||(dark?'#e8e0d0':'#292720'),line:styles.getPropertyValue('--rr-line').trim()||(dark?'#454137':'#dcd5c6')};};
    const theme=()=>{const c=colors();return {layout:{background:{type:lib.ColorType.Solid,color:c.paper},textColor:c.ink,fontFamily:'system-ui, sans-serif',fontSize:12,attributionLogo:true},grid:{vertLines:{color:c.line},horzLines:{color:c.line}},rightPriceScale:{borderColor:c.line},timeScale:{borderColor:c.line,timeVisible:example.interval<1440,secondsVisible:false,tickMarkFormatter:(time:Time,kind:number)=>typeof time==='number'?clock(time,example.interval===1440||kind===lib.TickMarkType.DayOfMonth||kind===lib.TickMarkType.Month||kind===lib.TickMarkType.Year):String(time)},localization:{timeFormatter:(time:Time)=>typeof time==='number'?`${date(time)} ${example.interval===1440?'':clock(time)+' NY'}`:String(time)}};};
    const chart=lib.createChart(host.current,{...theme(),autoSize:true,height:compact?240:360});api.current=chart;host.current.querySelector('table')?.setAttribute('role','presentation');
    const candle=chart.addSeries(lib.CandlestickSeries,{upColor:'#168767',downColor:'#d4535b',wickUpColor:'#168767',wickDownColor:'#d4535b',borderVisible:false,priceFormat:{type:'custom',formatter:price,minMove:.0001},autoscaleInfoProvider:base=>{const info=base();if(!info)return null;const refs=latest.current.levels.filter(l=>l.after<=latest.current.count).map(l=>l.price);return {...info,priceRange:{minValue:Math.min(info.priceRange.minValue,...refs),maxValue:Math.max(info.priceRange.maxValue,...refs)}};}});series.current=candle;markerApi.current=lib.createSeriesMarkers(candle,[]);
    layout.current=()=>{
     if(!api.current||!series.current)return;
     const state=latest.current,h=host.current?.clientHeight||360,w=host.current?.clientWidth||680;
     setBoxes(state.areas.filter(a=>a.after<=state.count).flatMap(a=>{const left=chart.timeScale().logicalToCoordinate(a.start as never),right=chart.timeScale().logicalToCoordinate(Math.min(a.end,state.count-1) as never),top=candle.priceToCoordinate(a.high),bottom=candle.priceToCoordinate(a.low);return left===null||right===null||top===null||bottom===null?[]:[{left:Math.max(0,left),top:Math.max(0,top),width:Math.max(0,Math.min(w-64,right)-Math.max(0,left)),height:Math.min(h,Math.max(3,bottom-top)),label:state.t(a.label)}];}));
     if(example.window){const a=chart.timeScale().logicalToCoordinate(example.window.start as never),b=chart.timeScale().logicalToCoordinate(example.window.end as never);setBand(a!==null&&b!==null?{left:Math.max(0,a),width:Math.max(0,Math.min(w-64,b)-Math.max(0,a))}:null);}
    };
    chart.timeScale().subscribeVisibleLogicalRangeChange(layout.current);
    chart.subscribeCrosshairMove(p=>{if(typeof p.time!=='number'){setHover(null);return;}setHover(latest.current.bars.find(b=>b.time===p.time)||null);});
    const resize=new ResizeObserver(()=>layout.current());resize.observe(host.current);
    const observer=new MutationObserver(()=>{chart.applyOptions(theme());setReady(n=>n+1);});observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
    setReady(n=>n+1);
    cleanup=()=>{resize.disconnect();observer.disconnect();chart.remove();api.current=null;series.current=null;lines.current=[];markerApi.current=null;};
   }catch{setFailed(true);}
  }).catch(()=>setFailed(true));
  return()=>{cancelled=true;cleanup();};
 },[example.id,locale,compact]);
 useEffect(()=>{
  const chart=api.current,s=series.current;if(!chart||!s)return;
  const visible=bars.slice(0,count);s.setData(visible.map(b=>({...b,time:b.time as UTCTimestamp})));
  lines.current.forEach(line=>s.removePriceLine(line));const dark=document.documentElement.dataset.theme==='dark';
  markerApi.current?.setMarkers((example.markers||example.steps.map((step,i)=>({index:step.count-1,label:String(i+1)}))).filter(m=>m.index<count).map(m=>({time:bars[m.index].time as UTCTimestamp,position:'aboveBar' as const,color:paint('blue',dark),shape:'arrowDown' as const,text:t(m.label)})));
  lines.current=levels.filter(l=>l.after<=count).map(l=>s.createPriceLine({price:l.price,color:paint(l.tone,dark),lineWidth:2,lineStyle:2,axisLabelVisible:true,title:t(l.label)}));
  chart.timeScale().setVisibleLogicalRange({from:-1,to:Math.max(12,bars.length+1)});layout.current();
 },[bars,count,levels,ready,locale]);
 const b=hover||bars[Math.max(0,count-1)];
 return <section className={`m25-live-panel ${compact?'m25-live-panel-compact':''}`} aria-label={`${symbol} ${t('Historical candlestick chart')}`}>
  <div className="m25-ohlc" dir="ltr"><strong>{symbol}</strong><span>{clock(b.time,example.interval===1440)}{example.interval<1440?' NY':''}</span>{(['open','high','low','close'] as const).map((k,i)=><span key={k}>{['O','H','L','C'][i]} <b>{price(b[k])}</b></span>)}</div>
  {failed?<><p role="status">{t('Chart data could not load. The static preview and source remain available.')}</p><CandlePreview example={example} until={bars[Math.max(0,count-1)].time} revealed={count}/></>:<div className="m25-chart-frame" dir="ltr"><div ref={host} className="m25-live-chart"/>
   <div className="m25-chart-overlays" aria-hidden="true">{band&&<div className="m25-time-band" style={{left:band.left,width:band.width}}/>}{boxes.map((box,i)=><div key={i} className="m25-price-area" style={{left:box.left,top:box.top,width:box.width,height:box.height}}/>)}</div>
  </div>}
  <details className="m25-candle-table"><summary>{t('Inspect the revealed candle values')}</summary><div className="delivery-table-scroll"><table><caption>{t('Revealed historical candles')}</caption><thead><tr>{['New York time','Open','High','Low','Close'].map(h=><th key={h} scope="col">{t(h)}</th>)}</tr></thead><tbody>{bars.slice(0,count).map(b=><tr key={b.time}><th scope="row" dir="ltr">{date(b.time)} {example.interval<1440?clock(b.time):''}</th>{[b.open,b.high,b.low,b.close].map((p,i)=><td dir="ltr" key={i}>{price(p)}</td>)}</tr>)}</tbody></table></div></details>
 </section>;
}
