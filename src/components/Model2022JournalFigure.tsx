import type {JournalFigure} from '../data/masterclassJournal';
export function Model2022JournalFigure({figure,reveal=6}:{figure:JournalFigure;reveal?:number}){
 const label=(x:number,y:number,s:string,anchor:'start'|'middle'|'end'='start')=><text x={x} y={y} textAnchor={anchor}>{s}</text>;
 const priceY=(p:number)=>285-(p-99)*18;
 const candle=(x:number,o:number,h:number,l:number,c:number)=><g><line className="mj-measure" x1={x} x2={x} y1={priceY(h)} y2={priceY(l)}/><rect x={x-13} y={priceY(Math.max(o,c))} width="26" height={Math.max(2,Math.abs(c-o)*18)} fill="none" stroke="currentColor" strokeWidth="2"/></g>;
 let marks;
 if(figure.kind==='raid')marks=<><path className="mj-guide" d={`M65 ${priceY(110)}H565M65 ${priceY(106)}H565`}/>{label(70,priceY(110)-12,'Prior high 110')}{label(70,priceY(106)+24,'Selected swing low 106')}{candle(310,109,111,108,110)}<path className="mj-guide" d={`M330 ${priceY(111)}H450`}/>{label(460,priceY(111)+5,'Wick 111')}{label(310,320,'09:30 bar: O109 H111 L108 C110','middle')}</>;
 else if(figure.kind==='gap-candles')marks=<>{candle(130,109,111,108,110)}{candle(300,110,110.5,103.5,104)}{candle(470,104,105,102,103)}<path className="mj-guide" d={`M145 ${priceY(108)}H525M315 ${priceY(105)}H525M550 ${priceY(108)}V${priceY(105)}`}/>{label(560,priceY(106.5),'3 points')}{label(130,320,'1: low 108','middle')}{label(300,320,'2: closes 104','middle')}{label(470,320,'3: high 105','middle')}{label(320,30,'Bearish FVG: 105–108','middle')}</>;
 else if(figure.kind==='event-timeline')marks=<>{[['09:30','Raid 111'],['09:40','Break 106'],['09:45','Gap complete'],['09:50','Return 106.5']].map(([time,s],i)=><g key={time}><circle cx={80+i*155} cy={115+(i%2)*80} r="6"/><path className="mj-guide" d={`M${80+i*155} 75V265`}/>{label(80+i*155,55,time,'middle')}{label(80+i*155,300,s,'middle')}</g>)}<path className="mj-price" d="M80 115L235 195 390 115 545 195"/></>;
 else if(figure.kind==='risk-distance')marks=<><line className="mj-guide" x1="115" x2="540" y1="60" y2="60"/><line className="mj-guide" x1="115" x2="540" y1="150" y2="150"/><line className="mj-guide" x1="115" x2="540" y1="267" y2="267"/>{label(110,44,'Stop 111.5')}{label(110,139,'Entry 106.5')}{label(110,296,'Objective 100')}<path className="mj-measure" d="M330 60V150M320 60H340M320 150H340M470 150V267M460 150H480M460 267H480"/>{label(345,105,'5 points')}{label(485,225,'6.5 points')}{label(320,345,'Gross distance ratio: 6.5 ÷ 5 = 1.3','middle')}</>;
 else{
 const failed=figure.kind==='model-failed',vals=failed?[111,104,103,106.5,109,111.5]:[111,104,103,106.5,102,100];
 // Miniature source-bar geometry is distinct from the later event-price trace.
 marks=<><g transform="translate(-38 0) scale(.5)">{candle(130,109,111,108,110)}{candle(300,110,110.5,103.5,104)}{candle(470,104,105,102,103)}</g><path className="mj-guide" d={`M210 ${priceY(108)}H590M210 ${priceY(105)}H590M210 ${priceY(111.5)}H590`}/>{label(594,priceY(108)+4,'108')}{label(594,priceY(105)+4,'105')}{label(400,priceY(111.5)-10,'Stated stop 111.5')}{label(75,330,'3 completed bars','middle')}<polyline className={failed?'mj-price mj-failed':'mj-price'} points={vals.slice(0,reveal).map((p,i)=>`${220+i*65},${priceY(p)}`).join(' ')}/>{vals.map((p,i)=><g key={i}><circle cx={220+i*65} cy={priceY(p)} r="3"/>{label(220+i*65,priceY(p)+18,String(p),'middle')}{label(220+i*65,340,['09:32','09:40','09:45','09:50','09:55','10:00'][i],'middle')}</g>)}</>;
 }
 return <svg viewBox="0 0 660 370" width="660" height="370" role="img" aria-label={figure.alt}><title>{figure.title}</title>{marks}</svg>;
}

