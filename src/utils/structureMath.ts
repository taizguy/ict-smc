export type StructureBar={openMinute:number;open:number;high:number;low:number;close:number};
const b=(openMinute:number,open:number,high:number,low:number,close:number):StructureBar=>({openMinute,open,high,low,close});
/** Invented index prices; minute-of-session labels, not historical timestamps. */
const shared=[b(595,137,138,134,134),b(600,134,134,132,133),b(605,133,136,133,133),b(610,133,133,128,129),b(615,129,130,126,127),b(620,127,127,124,126),b(625,126,132,126,131)];
export const structureCases={hold:[...shared,b(630,131,138,130,137),b(635,137,139.5,136,139)],fail:[...shared,b(630,131,133,98,99),b(635,99,101,96,97)]} as const;
export const structureReferences={externalLow:100,externalHigh:140,internalHigh:136,internalLow:124};
export const structureClock=(minute:number)=>`${Math.floor(minute/60).toString().padStart(2,'0')}:${(minute%60).toString().padStart(2,'0')}`;
export const structureCloseMinute=(bar:StructureBar)=>bar.openMinute+5;
export function structureRead(bars:readonly StructureBar[],visible:number){
 const shown=bars.slice(0,Math.max(0,Math.min(visible,bars.length))),last=shown.at(-1);
 if(!last)return{state:'waiting',last:null,internalHighConfirmed:false,internalLowConfirmed:false};
 const highConfirmed=shown.length>=4&&shown[2].high>shown[1].high&&shown[2].high>shown[3].high;
 const lowConfirmed=shown.length>=7&&shown[5].low<shown[4].low&&shown[5].low<shown[6].low;
 return{state:last.close<100?'external-down':last.close>140?'external-up':highConfirmed&&last.close>136?'internal-up':'inside',last,internalHighConfirmed:highConfirmed,internalLowConfirmed:lowConfirmed};
}
