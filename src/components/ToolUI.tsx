import React, { useId } from 'react';
import { useTranslation } from '../i18n/TranslationProvider';
export const panel = 'rounded-2xl border border-ink/10 bg-surface p-5 sm:p-7 space-y-5 min-w-0';
export const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ink/20 px-4 py-2 text-sm hover:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal disabled:opacity-40 disabled:cursor-not-allowed';
export const input = 'w-full min-w-0 rounded-lg border border-ink/20 bg-surface-muted p-3 text-base text-ink';
export function Field({ label, children, hint }: { label: string; children: React.ReactElement<any>; hint?: string }) {
  const id = useId();
  return <div className="space-y-2 min-w-0"><label className="block text-sm text-ink-secondary" htmlFor={id}>{label}</label>{React.cloneElement(children, { id, 'aria-describedby': hint ? `${id}-hint` : undefined })}{hint && <p className="text-sm text-ink-secondary" id={`${id}-hint`}>{hint}</p>}</div>;
}
export function Notice({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  // Translate the complete warning before splitting it into a lead and expandable details.
  const text=typeof children==='string'?t(children):'';
  const first=text.match(/^.*?[.!?۔؟](?:\s|$)/)?.[0].trim();
  const style='rounded-lg border border-teal/25 bg-teal/5 p-4 text-sm leading-relaxed text-ink-secondary';
  return text.length>230&&first?<aside className={style}><p>{first}</p><details className="mt-2"><summary className="cursor-pointer underline">Method, assumptions and limits</summary><p className="pt-3">{text.slice(first.length).trim()}</p></details></aside>:<p className={style}>{text || children}</p>;
}
