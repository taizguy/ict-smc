import React, { useId } from 'react';
export const panel = 'rounded-2xl border border-white/10 bg-[#11141B] p-5 sm:p-7 space-y-5 min-w-0';
export const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#55E6D1] disabled:opacity-40 disabled:cursor-not-allowed';
export const input = 'w-full min-w-0 rounded-lg border border-white/20 bg-[#0C0E13] p-3 text-base text-[#F5F7FA]';
export function Field({ label, children, hint }: { label: string; children: React.ReactElement<any>; hint?: string }) {
  const id = useId();
  return <div className="space-y-2 min-w-0"><label className="block text-sm text-[#C5CBD8]" htmlFor={id}>{label}</label>{React.cloneElement(children, { id, 'aria-describedby': hint ? `${id}-hint` : undefined })}{hint && <p className="text-sm text-[#9BA1AE]" id={`${id}-hint`}>{hint}</p>}</div>;
}
export function Notice({ children }: { children: React.ReactNode }) {
  const text=typeof children==='string'?children:'';
  const first=text.match(/^.*?[.!?](?:\s|$)/)?.[0].trim();
  const style='rounded-lg border border-[#55E6D1]/25 bg-[#55E6D1]/5 p-4 text-sm leading-relaxed text-[#C5CBD8]';
  return text.length>230&&first?<aside className={style}><p>{first}</p><details className="mt-2"><summary className="cursor-pointer underline">Method, assumptions and limits</summary><p className="pt-3">{text.slice(first.length).trim()}</p></details></aside>:<p className={style}>{children}</p>;
}
