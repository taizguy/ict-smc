export interface LabBar { time: string; open: number; high: number; low: number; close: number }
export interface TestRule { reward: number; hold: number; cost: number; side: 'both' | 'long' | 'short' }
export interface TestTrade { signal: number; entryBar: number; exitBar: number; direction: 'long' | 'short'; entry: number; stop: number; target: number; result: number | null; reason: 'target' | 'stop' | 'ambiguous' | 'time' | 'boundary' }

export function demoBars(): LabBar[] {
  let previous = 100, seed = 73;
  return Array.from({length:180},(_,i)=>{
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const open=previous+(i%13===0?(i%26===0?2.5:-2.5):0);
    const close=open+Math.sin(i*.7)*1.7+(seed/4294967296-.5)*3;
    previous=close;
    return {time:new Date(Date.UTC(2026,0,1,0,i*5)).toISOString(),open,close,high:Math.max(open,close)+.3,low:Math.min(open,close)-.3};
  });
}

/** Local CSV only. Quoted fields and CRLF are supported; no network requests. */
export function readBars(csv:string):LabBar[] {
  const rows:string[][]=[];let row:string[]=[],cell='',quoted=false;
  for(let i=0;i<csv.length;i++){
    const c=csv[i];
    if(c==='"'){if(quoted&&csv[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}
    else if(c===','&&!quoted){row.push(cell.trim());cell='';}
    else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&csv[i+1]==='\n')i++;row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell='';}
    else cell+=c;
  }
  if(quoted)throw new Error('Invalid CSV: an unfinished quoted field.');
  row.push(cell.trim());if(row.some(Boolean))rows.push(row);
  const head=(rows.shift()||[]).map(x=>x.replace(/^\uFEFF/,'').toLowerCase());
  const indices=['time','open','high','low','close'].map(k=>head.indexOf(k==='time'&&!head.includes('time')?'timestamp':k));
  if(indices.some(i=>i<0))throw new Error('CSV needs time, open, high, low and close columns.');
  if(rows.length<30||rows.length>20000)throw new Error('Use between 30 and 20,000 candles.');
  let last=-Infinity;
  return rows.map(r=>{
    const values=indices.slice(1).map(i=>r[i]===undefined||r[i]===''?NaN:Number(r[i]));
    const [open,high,low,close]=values, stamp=Date.parse(r[indices[0]]);
    if(!Number.isFinite(stamp)||stamp<=last)throw new Error('Times must be valid, unique and oldest first. Use ISO timestamps.');
    if(values.some(v=>!Number.isFinite(v)||v<=0)||low>Math.min(open,close)||high<Math.max(open,close)||low>high)throw new Error('Every candle needs positive OHLC values and valid high/low boundaries.');
    last=stamp;return {time:new Date(stamp).toISOString(),open,high,low,close};
  });
}

/** A transparent teaching rule, not an authenticated ICT strategy or fill engine.
 * Signal uses completed candles only. Entry is the following bar's open.
 * One position at a time; both barriers touched => unknown sequence, excluded R.
 */
export function runFvgTest(bars:LabBar[], rule:TestRule):TestTrade[]{
  const trades:TestTrade[]=[];
  for(let i=2;i<bars.length-1;i++){
    const bullish=bars[i-2].high<bars[i].low, bearish=bars[i-2].low>bars[i].high;
    if((!bullish&&!bearish)||(bullish&&rule.side==='short')||(bearish&&rule.side==='long'))continue;
    const sign=bullish?1:-1,entry=bars[i+1].open;
    const stop=bullish?Math.min(...bars.slice(i-2,i+1).map(b=>b.low)):Math.max(...bars.slice(i-2,i+1).map(b=>b.high));
    const risk=(entry-stop)*sign;
    if(risk<=0||!Number.isFinite(risk))continue;
    const target=entry+sign*risk*rule.reward;
    if(!Number.isFinite(target)||target<=0)continue;
    let exitBar=Math.min(i+rule.hold,bars.length-1),reason:TestTrade['reason']=i+rule.hold>=bars.length?'boundary':'time';
    let result=((bars[exitBar].close-entry)*sign/risk)-rule.cost;
    for(let j=i+1;j<=exitBar;j++){
      const b=bars[j];
      if(j>i+1&&(bullish?b.open<=stop:b.open>=stop)){exitBar=j;reason='stop';result=(b.open-entry)*sign/risk-rule.cost;break;}
      if(j>i+1&&(bullish?b.open>=target:b.open<=target)){exitBar=j;reason='target';result=rule.reward-rule.cost;break;}
      const stopped=bullish?b.low<=stop:b.high>=stop,won=bullish?b.high>=target:b.low<=target;
      if(stopped&&won){exitBar=j;reason='ambiguous';result=NaN;break;}
      if(stopped||won){exitBar=j;reason=stopped?'stop':'target';result=(stopped?-1:rule.reward)-rule.cost;break;}
    }
    trades.push({signal:i,entryBar:i+1,exitBar,direction:bullish?'long':'short',entry,stop,target,result:Number.isFinite(result)?result:null,reason});
    i=exitBar-1;
  }
  return trades;
}

export function testSummary(trades:TestTrade[]){
  const known=trades.filter(t=>t.result!==null);let sum=0,peak=0,drawdown=0;
  const curve=[0,...known.map(t=>{sum+=t.result!;peak=Math.max(peak,sum);drawdown=Math.max(drawdown,peak-sum);return sum;})];
  return {known,curve,net:sum,drawdown,wins:known.filter(t=>t.result!>0).length,ambiguous:trades.length-known.length};
}
