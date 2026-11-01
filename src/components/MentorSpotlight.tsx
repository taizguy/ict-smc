import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {Heart,X,ExternalLink} from 'lucide-react';
import {useTranslation} from '../i18n/TranslationProvider';
import {useModalScrollLock} from '../hooks/useSmoothScroll';
import {masoodPlaylistsData} from '../data/masoodData';

interface MentorSpotlightProps {
 isOpen:boolean;
 onClose:()=>void;
 onSelectConcept?:(conceptId:string)=>void;
 onSelectChapter?:(chapterId:number)=>void;
 onOpenMasoodAcademy?:()=>void;
}
type Tab='tribute'|'curriculum'|'daily_bias_checklist';

export function MentorSpotlight({isOpen,onClose}:MentorSpotlightProps){
 const {locale,href,t}=useTranslation();
 const copy=(en:string,ur:string)=>locale==='ur'?ur:en;
 const [active,setActive]=useState<Tab>('tribute');
 const [checked,setChecked]=useState<Record<number,boolean>>({});
 const panel=useRef<HTMLDivElement>(null),body=useRef<HTMLDivElement>(null),close=useRef<HTMLButtonElement>(null);
 const onCloseRef=useRef(onClose);
 useEffect(()=>{onCloseRef.current=onClose;},[onClose]);
 useModalScrollLock(isOpen);
 useEffect(()=>{
  if(!isOpen)return;
  const previous=document.activeElement as HTMLElement|null;
  setActive('tribute');close.current?.focus();
  const key=(e:KeyboardEvent)=>{
   if(e.key==='Escape'){e.preventDefault();onCloseRef.current();}
   if(e.key!=='Tab')return;
   const elements=Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]')||[]).filter(el=>el.getClientRects().length);
   const first=elements[0],last=elements[elements.length-1];
   if(e.shiftKey&&(document.activeElement===first||!panel.current?.contains(document.activeElement))){e.preventDefault();last?.focus();}
   else if(!e.shiftKey&&(document.activeElement===last||!panel.current?.contains(document.activeElement))){e.preventDefault();first?.focus();}
  };
  document.addEventListener('keydown',key);
  return()=>{document.removeEventListener('keydown',key);previous?.focus();};
 },[isOpen]);
 useEffect(()=>{if(body.current)body.current.scrollTop=0;},[active]);
 if(!isOpen)return null;
 const tabs:{id:Tab;label:string}[]=[
  {id:'tribute',label:copy('Tribute','خراجِ تحسین')},
  {id:'curriculum',label:copy('Study series','مطالعے کی سیریز')},
  {id:'daily_bias_checklist',label:copy('Study checklist','مطالعے کی فہرست')}
 ];
 const checklist=[
  copy('Choose the instrument, date and chart feed before marking levels.','سطحیں نشان زد کرنے سے پہلے انسٹرومنٹ، تاریخ اور چارٹ فیڈ منتخب کریں۔'),
  copy('Check the session clock in New York local time, including daylight saving changes.','نیویارک کے مقامی وقت کے مطابق سیشن دیکھیں، بشمول ڈے لائٹ سیونگ کی تبدیلیوں کے۔'),
  copy('Mark the previous day’s high and low and the references relevant to the lesson.','گزشتہ دن کی ہائی اور لو اور سبق سے متعلق دوسرے حوالے نشان زد کریں۔'),
  copy('Write the directional idea and the evidence that would invalidate it.','سمت کا تصور اور اسے غلط ثابت کرنے والی شرائط پہلے لکھیں۔'),
  copy('Separate what the chart shows from assumptions about orders or institutional intent.','چارٹ پر نظر آنے والی بات کو آرڈرز یا ادارہ جاتی ارادے کے مفروضوں سے الگ رکھیں۔'),
  copy('Record the outcome, including no-entry and failed cases, without treating a pattern as a guarantee.','نتیجہ درج کریں، بشمول انٹری نہ بننے اور ناکام مثالوں کے؛ پیٹرن کو ضمانت نہ سمجھیں۔')
 ];
 return createPortal(<div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 p-3 sm:p-6" onClick={e=>{if(e.target===e.currentTarget)onClose();}} data-lenis-prevent="true">
  <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="mentor-tribute-title" dir={locale==='ur'?'rtl':'ltr'} className="isolate w-full max-w-3xl overflow-hidden rounded-2xl border border-ink/15 bg-surface text-ink shadow-2xl" style={{display:'grid',gridTemplateRows:'auto auto minmax(0,1fr)',maxHeight:'calc(100dvh - 2rem)'}}>
   <header className="relative z-20 bg-surface border-b border-ink/10 p-4 sm:p-6">
    <div className="flex items-start justify-between gap-4">
     <div><p className="flex items-center gap-2 text-sm text-teal mb-2"><Heart size={17} aria-hidden="true"/>{copy('With gratitude','تشکر کے ساتھ')}</p><h2 id="mentor-tribute-title" className="text-xl sm:text-2xl font-semibold">{copy('Trader Abdullah Masood','ٹریڈر عبداللہ مسعود')}</h2><p className="text-sm text-ink-secondary mt-2">{copy('An independent acknowledgement from LearnSMC','LearnSMC کی جانب سے آزادانہ اعترافِ خدمات')}</p></div>
     <button ref={close} type="button" onClick={onClose} aria-label={copy('Close tribute','خراجِ تحسین بند کریں')} className="shrink-0 inline-flex items-center justify-center min-h-11 min-w-11 rounded-lg border border-ink/15 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"><X size={20} aria-hidden="true"/></button>
    </div>
   </header>
   <div role="tablist" aria-label={copy('Tribute sections','خراجِ تحسین کے حصے')} className="relative z-20 grid grid-cols-3 gap-1 border-b border-ink/10 bg-surface p-2 sm:px-5">
    {tabs.map((tab,i)=><button key={tab.id} type="button" role="tab" id={'mentor-tab-'+tab.id} aria-selected={active===tab.id} aria-controls={'mentor-panel-'+tab.id} tabIndex={active===tab.id?0:-1} onClick={()=>setActive(tab.id)} onKeyDown={e=>{
     if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
     e.preventDefault();const delta=(e.key==='ArrowRight'?1:-1)*(locale==='ur'?-1:1);const index=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+delta+tabs.length)%tabs.length;setActive(tabs[index].id);document.getElementById('mentor-tab-'+tabs[index].id)?.focus();
    }} className={'min-h-11 px-2 py-2 text-sm rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal '+(active===tab.id?'bg-teal/10 border-teal/30 text-ink font-semibold':'border-transparent text-ink-secondary hover:bg-ink/5')}>{tab.label}</button>)}
   </div>
   <div ref={body} role="tabpanel" id={'mentor-panel-'+active} aria-labelledby={'mentor-tab-'+active} tabIndex={0} className="relative z-0 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-5 text-sm sm:text-base leading-relaxed" data-lenis-prevent="true">
    {active==='tribute'&&<>
     <h3 className="text-lg font-semibold">{copy('Thank you for sharing your teaching.','اپنی تعلیم بانٹنے کے لیے شکریہ۔')}</h3>
     <p>{copy('LearnSMC acknowledges Trader Abdullah Masood’s freely available teaching and its contribution to this project’s study of ICT and Smart Money Concepts. This tribute expresses gratitude for the time and effort involved in making those lessons accessible.','LearnSMC ٹریڈر عبداللہ مسعود کی مفت دستیاب تعلیم اور اس منصوبے میں ICT اور اسمارٹ منی کانسیپٹس کے مطالعے میں اس کی اہمیت کا اعتراف کرتا ہے۔ یہ خراجِ تحسین ان اسباق کو قابلِ رسائی بنانے میں صرف کیے گئے وقت اور محنت کے لیے تشکر ہے۔')}</p>
     <p>{copy('Our academy brings together independently written study notes, practice prompts and links to his original videos. Readers can follow the source lessons and use the notes as a companion, rather than a replacement for the educator’s own explanations.','ہماری اکیڈمی میں آزادانہ لکھے گئے مطالعاتی نوٹس، مشق کے سوالات اور ان کی اصل ویڈیوز کے روابط جمع کیے گئے ہیں۔ قارئین اصل اسباق کے ساتھ یہ نوٹس معاون مواد کے طور پر استعمال کر سکتے ہیں، استاد کی اپنی وضاحتوں کے متبادل کے طور پر نہیں۔')}</p>
     <p className="border-s-2 border-teal/40 ps-4 text-ink-secondary">{copy('LearnSMC is independent and does not claim affiliation with or endorsement by Abdullah Masood or Michael J. Huddleston (ICT). Each creator retains ownership of their original material. Teaching frameworks and examples do not establish trading performance.','LearnSMC آزاد ہے اور عبداللہ مسعود یا مائیکل جے ہڈلسٹن (ICT) سے وابستگی یا ان کی توثیق کا دعویٰ نہیں کرتا۔ اصل مواد کی ملکیت متعلقہ تخلیق کار کی ہے۔ تدریسی ماڈلز اور مثالیں ٹریڈنگ کی کارکردگی کا ثبوت نہیں ہیں۔')}</p>
     <a href="https://www.youtube.com/@TraderAbdullahMasood" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-11 text-teal underline underline-offset-4">{copy('Visit Abdullah Masood’s YouTube channel','عبداللہ مسعود کا یوٹیوب چینل دیکھیں')}<ExternalLink size={16} aria-hidden="true"/></a>
    </>}
    {active==='curriculum'&&<>
     <h3 className="text-lg font-semibold">{copy('Continue with a study series','مطالعے کی ایک سیریز منتخب کریں')}</h3>
     <p className="text-ink-secondary">{copy('These links lead to the existing LearnSMC series, with notes and original video references. Choose a topic that fits your current understanding.','یہ روابط LearnSMC کی موجودہ سیریز پر لے جاتے ہیں، جہاں نوٹس اور اصل ویڈیوز کے حوالے موجود ہیں۔ اپنی موجودہ سمجھ کے مطابق موضوع منتخب کریں۔')}</p>
     <div className="grid gap-3">{masoodPlaylistsData.map(p=><a key={p.id} href={href('/masood/playlists/'+p.id+'/')} className="block rounded-lg border border-ink/15 p-4 text-teal underline underline-offset-4 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-teal">{t(p.title)}</a>)}</div>
    </>}
    {active==='daily_bias_checklist'&&<>
     <h3 className="text-lg font-semibold">{copy('Prepare a chart study','چارٹ کے مطالعے کی تیاری')}</h3>
     <p className="text-ink-secondary">{copy('A study aid, not an entry signal or a validated trading strategy. Checks reset when you close this tribute.','یہ مطالعے کی معاون فہرست ہے، انٹری سگنل یا ثابت شدہ ٹریڈنگ حکمتِ عملی نہیں۔ یہ خراجِ تحسین بند کرنے پر منتخب خانے صاف ہو جاتے ہیں۔')}</p>
     <div className="space-y-3">{checklist.map((item,i)=><label key={i} className="flex items-start gap-3 rounded-lg border border-ink/15 p-4 cursor-pointer"><input type="checkbox" checked={!!checked[i]} onChange={()=>setChecked(c=>({...c,[i]:!c[i]}))} className="mt-1 size-5 shrink-0 accent-teal"/><span>{item}</span></label>)}</div>
     <a href={href('/disclaimer/')} className="inline-flex min-h-11 items-center text-teal underline underline-offset-4">{copy('Read the financial-education risk disclosure','مالی تعلیم اور رسک کی وضاحت پڑھیں')}</a>
    </>}
   </div>
  </div>
 </div>,document.body);
}
export default MentorSpotlight;
