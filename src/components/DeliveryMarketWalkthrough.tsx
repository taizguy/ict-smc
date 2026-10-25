import { marketCaseIntro, marketCases, marketSourceLabel } from '../data/chapters/deliveryMarketCases';
import { deliverySupportLabels } from '../data/chapters/deliverySupport';
import { useTranslation } from '../i18n/TranslationProvider';
export function DeliveryMarketWalkthrough() {
  const { t } = useTranslation();
  return <section className="delivery-reference delivery-market" id="delivery-market-cases">
    <h2>{t(deliverySupportLabels.market)}</h2><p>{t(marketCaseIntro)}</p>
    {marketCases.map(item => <article key={item.image}><h3>{t(item.title)}</h3>
      <figure><a href={item.image} target="_blank" rel="noopener"><img src={item.image} width={item.width} height={item.height} loading="lazy" decoding="async" alt={t(item.alt)}/></a>
        <figcaption><a href="https://www.tradingview.com/chart/zhovW8uH/" target="_blank" rel="noopener noreferrer">{t(marketSourceLabel)}</a></figcaption></figure>
      {item.paragraphs.map(p => <p key={p}>{t(p)}</p>)}
    </article>)}
  </section>;
}
