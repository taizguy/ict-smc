/** Chapter 09's stated strict convention; none of these comparisons predicts a trade. */
export type SwingBar={open:number;high:number;low:number;close:number;openTime:string;closeTime:string;closed:boolean};
export type SwingPoint={kind:'high'|'low';price:number;pivotIndex:number;pivotTime:string;confirmedAt:string};
export const swingNqExample:readonly SwingBar[]=[
 {open:20410,high:20445.5,low:20405,close:20440.25,openTime:'09:45',closeTime:'10:00',closed:true},
 {open:20440.25,high:20468.75,low:20432,close:20436.5,openTime:'10:00',closeTime:'10:15',closed:true},
 {open:20436.5,high:20442,low:20412.5,close:20415,openTime:'10:15',closeTime:'10:30',closed:true},
];
export function strictSwing(c1:Pick<SwingBar,'high'|'low'>,c2:Pick<SwingBar,'high'|'low'>,c3:Pick<SwingBar,'high'|'low'>,closed=true){
 if(!closed)return{high:false,low:false,confirmed:false};
 return{high:c2.high>c1.high&&c2.high>c3.high,low:c2.low<c1.low&&c2.low<c3.low,confirmed:true};
}
export function validSwingBar(b:SwingBar){return [b.open,b.high,b.low,b.close].every(Number.isFinite)&&b.low<=Math.min(b.open,b.close)&&b.high>=Math.max(b.open,b.close)&&b.low<=b.high;}
export function detectClosedSwings(bars:readonly SwingBar[]):SwingPoint[]{
 if(bars.some(b=>!validSwingBar(b)))throw new Error('Invalid OHLC bar');
 const points:SwingPoint[]=[];
 for(let i=2;i<bars.length;i++){const[c1,c2,c3]=bars.slice(i-2,i+1);if(![c1,c2,c3].every(b=>b.closed))continue;const s=strictSwing(c1,c2,c3);for(const kind of ['high','low']as const)if(s[kind])points.push({kind,price:c2[kind],pivotIndex:i-1,pivotTime:c2.openTime,confirmedAt:c3.closeTime});}
 return points;
}
export function promoteSwingLows(points:readonly{price:number;confirmedAt:string}[]){return points.flatMap((p,i)=>i>0&&i<points.length-1&&p.price<points[i-1].price&&p.price<points[i+1].price?[{...p,sourceIndex:i,confirmedAt:points[i+1].confirmedAt}]:[]);}
export const quarterTick=(price:number)=>Math.round(price*4)/4;
export const swingExampleChecks={leftPoints:20468.75-20445.5,rightPoints:20468.75-20442,leftTicks:(20468.75-20445.5)/.25,rightTicks:(20468.75-20442)/.25,protectedHold:5883.5-5880.25,stopTicks:(5880.25-5879.5)/.25};
