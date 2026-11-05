/** Convert a dated New York wall clock to UTC using IANA rules, never a fixed annual offset.
 * The displayed study windows avoid the missing/repeated hour at DST transitions. */
export function newYorkInstant(date:string,clock:string){
 const [y,m,d]=date.split('-').map(Number),[h,min]=clock.split(':').map(Number);
 const target=Date.UTC(y,m-1,d,h,min);let value=target;
 for(let i=0;i<4;i++){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(value);const n=(k:string)=>Number(parts.find(p=>p.type===k)!.value);const actual=Date.UTC(n('year'),n('month')-1,n('day'),n('hour'),n('minute'));value+=target-actual;}
 return new Date(value);
}
export const sessionWindows=[{name:['Asia reference','ایشیا کا حوالہ'],start:'20:00',end:'00:00'},{name:['London study window','لندن کی مشقی ونڈو'],start:'02:00',end:'05:00'},{name:['New York morning study','نیویارک صبح کا مطالعہ'],start:'07:00',end:'10:00'}] as const;
export function sessionRows(locale='en-GB'){return ['2026-01-06','2026-07-07'].flatMap(date=>sessionWindows.map(w=>{const start=newYorkInstant(date,w.start),endDate=w.end<w.start?new Date(Date.parse(date+'T00:00:00Z')+86400000).toISOString().slice(0,10):date,end=newYorkInstant(endDate,w.end);const format=(d:Date,zone:string)=>new Intl.DateTimeFormat(locale,{timeZone:zone,day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(d);return {date,name:w.name,ny:w.start+'–'+w.end,zone:new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',timeZoneName:'short'}).formatToParts(start).find(p=>p.type==='timeZoneName')!.value,utc:format(start,'UTC')+' → '+format(end,'UTC'),karachi:format(start,'Asia/Karachi')+' → '+format(end,'Asia/Karachi'),start,end};}));}
