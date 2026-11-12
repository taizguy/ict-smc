/** Illustrative, stationary displayed books from Chapter 04. No live feed or hidden liquidity. */
export type BookSide='buy'|'sell';
export type BookLevel={price:number;quantity:number};
export const liquidityBooks={deep:{asks:[{price:50,quantity:100},{price:50.05,quantity:100},{price:50.1,quantity:100},{price:50.2,quantity:200}],bids:[{price:49.95,quantity:200},{price:49.9,quantity:150}]},thin:{asks:[{price:50,quantity:30},{price:50.3,quantity:30},{price:50.8,quantity:100},{price:51.5,quantity:200}],bids:[{price:49.5,quantity:20},{price:49.2,quantity:20}]}};
export function walkLiquidityBook(side:BookSide,size:number,levels:readonly BookLevel[]){
 if(!Number.isFinite(size)||size<=0||!levels.length||levels.some(l=>!Number.isFinite(l.price)||l.price<=0||!Number.isFinite(l.quantity)||l.quantity<0))return null;
 const sorted=levels.map((l,sourceIndex)=>({...l,sourceIndex})).sort((a,b)=>side==='buy'?a.price-b.price:b.price-a.price);let remaining=size,cost=0;
 const fills=sorted.map(l=>{const filled=Math.min(remaining,l.quantity);remaining-=filled;cost+=filled*l.price;return {...l,filled,remaining:l.quantity-filled};});
 const filled=size-remaining;if(!filled)return {fills,filled:0,unfilled:size,cost:0,average:null,best:sorted[0].price,last:null,slippage:null,impactPercent:null};
 const best=sorted.find(l=>l.quantity>0)!.price,last=fills.filter(l=>l.filled>0).at(-1)!.price,average=cost/filled,sign=side==='buy'?1:-1;
 return {fills,filled,unfilled:remaining,cost,average,best,last,slippage:sign*(average-best)*filled,impactPercent:sign*(last-best)/best*100};
}
export function liquiditySpreadCost(bid:number,ask:number,stop:number,feePerUnitPerSide:number){
 if(![bid,ask,stop,feePerUnitPerSide].every(Number.isFinite)||bid<=0||ask<bid||stop<=0||feePerUnitPerSide<0)return null;
 const spread=ask-bid,mid=(ask+bid)/2;return {spread,mid,relativePercent:spread/mid*100,spreadR:spread/stop,roundTrip:spread+2*feePerUnitPerSide,roundTripR:(spread+2*feePerUnitPerSide)/stop};
}
