import { financialDisclaimer } from '../utils/publisher';

export function FinancialDisclaimer() {
  return <aside className="ymyl-disclaimer rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 my-8 text-sm leading-relaxed" aria-label="Financial education and risk notice">
    <h2 className="font-semibold text-amber-300 mb-2">Financial education and risk notice</h2>
    <p>{financialDisclaimer}</p>
    <a className="underline text-amber-300" href="/disclaimer/">Read the full risk disclosure</a>
  </aside>;
}
