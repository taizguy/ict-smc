import { useTranslation } from '../i18n/TranslationProvider';
import { financialDisclaimer } from '../utils/publisher';

export function FinancialDisclaimer() {
  const { t, href } = useTranslation();
  return <aside className="ymyl-disclaimer rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 my-8 text-sm leading-relaxed" aria-label={t("Financial education and risk notice")}>
    <h2 className="font-semibold text-amber-700 mb-2">{t("Financial education and risk notice")}</h2>
    <p>{t(financialDisclaimer)}</p>
    <a className="underline text-amber-700" href={href("/disclaimer/")}>{t("Read the full risk disclosure")}</a>
  </aside>;
}
