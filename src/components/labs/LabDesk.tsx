import { ScanLine, GitBranch, FlaskConical } from 'lucide-react';
import { useTranslation } from '../../i18n/TranslationProvider';

/** Shared wayfinding; the active lab retains its own task and execution model. */
export function LabDesk({mode}:{mode:'chartlab'|'simulator'|'backtest'}) {
 const {t,href}=useTranslation();
 return <nav className="lab-desk-nav" aria-label={t('Practice workspace')}>
  {([{id:'chartlab',label:'Recognize',detail:'Chart Laboratory',Icon:ScanLine},{id:'simulator',label:'Decide',detail:'Trade Simulator',Icon:GitBranch},{id:'backtest',label:'Investigate',detail:'Backtest Lab',Icon:FlaskConical}] as const).map(({id,label,detail,Icon})=><a key={id} href={href(`/tools/${id}/`)} aria-current={mode===id?'page':undefined}><Icon size={18} strokeWidth={1.5}/><span><strong>{t(label)}</strong><small>{t(detail)}</small></span></a>)}
 </nav>;
}

export function downloadLabFile(name:string,value:unknown) {
 const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json;charset=utf-8'}));
 const link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
