import type {LabBar} from './backtestEngine';
/** Remove translation, positive scale and candle count. Preserve OHLC geometry.
 * 64 uniformly resampled observations make padded/slow copies comparable. */
export function normalisedShape(bars:LabBar[]){if(bars.length<3)throw new Error('Shape needs at least 3 candles');const low=Math.min(...bars.map(b=>b.low)),span=Math.max(...bars.map(b=>b.high))-low;if(span<=0)throw new Error('Flat price range');return Array.from({length:64},(_,i)=>{const at=i*(bars.length-1)/63,l=Math.floor(at),r=Math.min(bars.length-1,l+1),f=at-l;return (['open','high','low','close'] as const).map(k=>((bars[l][k]*(1-f)+bars[r][k]*f)-low)/span);});}
export function shapeDistance(a:LabBar[],b:LabBar[]){const x=normalisedShape(a),y=normalisedShape(b);const rmse=(mirror:boolean)=>Math.sqrt(x.reduce((total,row,i)=>total+row.reduce((sum,v,k)=>sum+(v-(mirror?1-y[i][[0,2,1,3][k]]:y[i][k]))**2,0),0)/(64*4));return Math.min(rmse(false),rmse(true));}
/** <=5.5% of the complete price span on four OHLC channels is too close.
 * Conservative clone detector, not a semantic test or proof of originality.
 * Calibrated by translated/scaled/mirrored/resampled and 1%-noise controls. */
export const MIN_SHAPE_DISTANCE=.055;
