import {use,type HTMLAttributes} from 'react';

const snapshots=new Map<string,Promise<string>>();
function snapshot(name:string){
 const key=location.pathname+'#'+name;
 if(!snapshots.has(key)){
  const selector='section[data-preserved-study="'+name+'"]';
  const existing=document.querySelector<HTMLElement>('#root '+selector);
  const result=existing?Promise.resolve(existing.innerHTML):fetch(location.pathname,{credentials:'same-origin'})
   .then(response=>{if(!response.ok)throw Error('Study reading unavailable');return response.text();})
   .then(html=>{const section=new DOMParser().parseFromString(html,'text/html').querySelector(selector);if(!section)throw Error('Missing native study section '+name);return section.innerHTML;});
  snapshots.set(key,result.catch(error=>{snapshots.delete(key);throw error;}));
 }
 return snapshots.get(key)!;
}
/** Native evidence remains complete without shipping all OHLC datasets again.
 * These sections contain only our own static figures, tables, links and native
 * details controls. The active workspace stays React-owned and interactive.
 * A native document is also used for client navigation without a reading root.
 */
export function StaticStudySection({name,children,...props}:HTMLAttributes<HTMLElement>&{name:string}){
 if(typeof window==='undefined')return <section {...props} data-preserved-study={name}>{children}</section>;
 const html=use(snapshot(name));
 return <section {...props} data-preserved-study={name} dangerouslySetInnerHTML={{__html:html}}/>;
}
