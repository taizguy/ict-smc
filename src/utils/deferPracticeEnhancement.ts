import {auditedReadingRoute} from './auditedReadingRoutes';

const normalized=(s:string|null)=>s?.replace(/\s+/g,' ').trim()||'';
type Control={label:string;id:string;tag:string;type:string;value:string;checked:boolean};
function describe(e:HTMLElement):Control{
 const input=e as HTMLInputElement;
 return {label:normalized(e.getAttribute('aria-label')||input.labels?.[0]?.textContent||e.textContent),id:e.id,tag:e.tagName,type:input.type,value:input.value,checked:input.checked};
}
function find(c:Control):HTMLElement|undefined{
 return Array.from(document.querySelectorAll<HTMLElement>(c.tag)).find(e=>{
  const d=describe(e);return e.getClientRects().length>0&&(c.id&&d.id===c.id||d.label===c.label&&d.type===c.type);
 });
}
/** Progressive reading remains the original production DOM. No hydration swap,
 * loader replacement, content hiding, or startup-gate change is introduced. */
export function deferPracticeEnhancement(load:()=>Promise<unknown>):boolean{
 const kind=auditedReadingRoute(location.pathname);
 if(!['practice','chartlab','legacy-practice'].includes(kind||'')||document.documentElement.dataset.readingEnhancement!=='true')return false;
 const html=document.documentElement;html.dataset.practiceEnhancement='waiting';
 let loading=false,pendingClick:Control|undefined,focused:Control|undefined;
 const edited=new Map<string,Control>();
 const fields=new Set(['INPUT','SELECT','TEXTAREA']);
 const activate=()=>{
  if(loading)return;loading=true;html.dataset.practiceEnhancement='loading';
  // The existing reading charts reserve geometry while their controls download.
  document.querySelector('#practice-workspace')?.setAttribute('aria-busy','true');
  void load().catch(()=>{loading=false;html.dataset.practiceEnhancement='failed';document.querySelector('#practice-workspace')?.removeAttribute('aria-busy');});
 };
 const click=(event:MouseEvent)=>{
  const button=(event.target as Element)?.closest<HTMLButtonElement>('button');
  if(!button||button.disabled)return;
  pendingClick=describe(button);event.preventDefault();event.stopImmediatePropagation();activate();
 };
 const focus=(event:FocusEvent)=>{
  const e=event.target as HTMLElement;if(e?.matches('button,input,select,textarea')){focused=describe(e);activate();}
 };
 const edit=(event:Event)=>{const e=event.target as HTMLElement;if(e&&fields.has(e.tagName)){const c=describe(e);edited.set(c.id||c.label,c);activate();}};
 let shortcut:KeyboardEventInit|undefined;
 const key=(event:KeyboardEvent)=>{
  const e=event.target as HTMLElement;
  if(!e?.isContentEditable&&!fields.has(e?.tagName)&&((event.key.toLowerCase()==='k'&&(event.ctrlKey||event.metaKey))||event.key==='/')){
   shortcut={key:event.key,ctrlKey:event.ctrlKey,metaKey:event.metaKey,bubbles:true};event.preventDefault();event.stopImmediatePropagation();activate();
  }
 };
 const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))activate();},{rootMargin:'300px 0px'});
 document.querySelectorAll('#practice-workspace,.guided-workspace').forEach(e=>observer?.observe(e));
 const ready=()=>queueMicrotask(()=>{
  // startApp's existing page-ready listener promotes the staged root first.
  cleanup();html.dataset.practiceEnhancement='ready';
  const button=pendingClick&&find(pendingClick);button?.focus({preventScroll:true});button?.click();
  queueMicrotask(()=>{
   for(const c of edited.values()){
    const e=find(c) as HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|undefined;if(!e)continue;
    if(e instanceof HTMLInputElement&&['checkbox','radio'].includes(e.type)){if(e.checked!==c.checked)e.click();}
    else{const proto=e instanceof HTMLSelectElement?HTMLSelectElement.prototype:e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value')?.set?.call(e,c.value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}
   }
   if(focused&&!pendingClick)find(focused)?.focus({preventScroll:true});
   if(shortcut)window.dispatchEvent(new KeyboardEvent('keydown',shortcut));
  });
 });
 function cleanup(){observer?.disconnect();document.removeEventListener('click',click,true);document.removeEventListener('focusin',focus,true);document.removeEventListener('input',edit,true);document.removeEventListener('change',edit,true);document.removeEventListener('keydown',key,true);window.removeEventListener('learnsmc:page-ready',ready);}
 document.addEventListener('click',click,true);document.addEventListener('focusin',focus,true);document.addEventListener('input',edit,true);document.addEventListener('change',edit,true);document.addEventListener('keydown',key,true);window.addEventListener('learnsmc:page-ready',ready);
 window.addEventListener('pagehide',cleanup,{once:true});
 if(!observer)activate();
 return true;
}
