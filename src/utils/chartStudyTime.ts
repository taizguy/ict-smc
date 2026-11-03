/** Dataset timestamps are bar OPENS in UTC. Never persist a second local clock. */
export const NY_ZONE='America/New_York';
export function utcMillis(value:string){if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.000Z$/.test(value)||!Number.isFinite(Date.parse(value))||new Date(value).toISOString()!==value)throw new Error('Expected an ISO UTC bar-open timestamp: '+value);return Date.parse(value);}
export const closeTime=(open:string,minutes:number)=>{if(!Number.isInteger(minutes)||minutes<=0)throw new Error('Invalid bar duration');return new Date(utcMillis(open)+minutes*60000).toISOString();};
export function nyClock(utc:string){utcMillis(utc);const parts=new Intl.DateTimeFormat('en-CA',{timeZone:NY_ZONE,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date(utc));const get=(key:string)=>parts.find(p=>p.type===key)!.value;return {date:`${get('year')}-${get('month')}-${get('day')}`,minute:Number(get('hour'))*60+Number(get('minute')),label:`${get('hour')}:${get('minute')}`};}
export const nyTime=(utc:string)=>nyClock(utc).label;
export function amFormationWindow(opens:string[],minutes=1){if(opens.length!==3)return false;const first=nyClock(opens[0]),last=nyClock(closeTime(opens[2],minutes));return opens.every(o=>nyClock(o).date===first.date&&nyClock(o).minute>=600)&&first.date===last.date&&last.minute<660;}
/** Conservative rule: the full retest bar must complete before expiry. */
export const beforeAmExpiry=(open:string,minutes=1)=>{const a=nyClock(open),b=nyClock(closeTime(open,minutes));return a.date===b.date&&a.minute>=600&&b.minute<660;};
