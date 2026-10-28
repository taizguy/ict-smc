import {hasMentorship2026Edition,mentorship2026Related,mentorship2026Hub} from '../data/chapters/mentorship2026';
import {hasMentorship2025Edition,mentorship2025Ids} from '../data/chapters/mentorship2025Visuals';
import { deliverySupport, deliverySupportLabels, deliveryLinkReasons } from '../data/chapters/deliverySupport';
import { textbookChapters } from '../data/chaptersData';
import { useTranslation } from '../i18n/TranslationProvider';
import { currentDocumentHref } from '../i18n/navigation';

export function DeliveryLessonSupport({ chapterId, section }: { chapterId: number; section: 'comparison' | 'faq' | 'links' }) {
  const { t } = useTranslation();
  const is2026=hasMentorship2026Edition(chapterId);
  const is2025=hasMentorship2025Edition(chapterId);
  const position=mentorship2025Ids.indexOf(chapterId);
  const related:Record<number,number[]>={24:[58,25,20],58:[24,25,50],25:[13,59,26],59:[13,14,15,55],26:[4,11,25],60:[18,16,15],53:[24,60,25],61:[20,21,24],62:[52,64,24],27:[20,21,59],63:[3,52,64],64:[22,62,25]};
  const nextIds=is2026?mentorship2026Related[chapterId]:is2025?[...new Set([mentorship2025Ids[position+1],...related[chapterId]].filter((id):id is number=>id!==undefined))]:[13,14,15,16,33];
  const workshops:Record<number,string>={24:'/tools/masterclass/opening-ranges/five-opening-ranges/',58:'/tools/masterclass/opening-ranges/five-opening-ranges/',25:'/tools/masterclass/entry-models/first-presentation-fvg/',26:'/tools/masterclass/core-masterclasses/smt-masterclass/',53:'/tools/masterclass/entry-models/venom-model/',59:'/tools/masterclass/pd-arrays/suspension-block/',60:'/tools/masterclass/pd-arrays/rejection-block/'};
  const glossary:Record<number,string>={24:'trade-models/nasdaq-session-open',58:'imbalances/opening-gap-matrix',25:'imbalances/fair-value-gap',26:'trade-models/smt-divergence',53:'trade-models/ict-venom-model',59:'order-blocks/suspension-block',60:'liquidity/buy-side-liquidity',61:'time-and-sessions/intraday-macro-continuum',62:'liquidity/event-volatility-hrlr'};
  const content = deliverySupport[chapterId];
  if (!content) return null;
  if (section === 'comparison') return <section className="delivery-reference" id="delivery-comparison">
    <h2>{t(content.heading)}</h2>
    <div className="delivery-table-scroll" role="region" aria-label={t(content.heading)} tabIndex={0}>
      <table><caption>{t(chapterId===49?'Measurements from the May 14 source chart':content.heading)}</caption><thead><tr>{content.columns.map(label => <th scope="col" key={label}>{t(label)}</th>)}</tr></thead>
        <tbody>{content.rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{t(cell)}</th> : <td key={i}>{t(cell)}</td>)}</tr>)}</tbody>
      </table>
    </div><p>{t(content.note)}</p>
  </section>;
  if (section === 'faq') return <section className="delivery-reference delivery-faq" id="delivery-faq">
    <h2>{t(deliverySupportLabels.faq)}</h2>
    {content.faqs.map(item => <details key={item.question}><summary>{t(item.question)}</summary><div><p>{t(item.answer)}</p></div></details>)}
  </section>;
  return <nav className="delivery-reference delivery-learning-path" aria-label={t(deliverySupportLabels.path)}>
    <h2>{t(deliverySupportLabels.path)}</h2>
    <a href={currentDocumentHref(is2026?mentorship2026Hub:is2025?'/curriculum/ict-2025-official-mentorship-curriculum/':'/curriculum/price-delivery/')}>{t(is2026?'ICT 2026 learning path':is2025?'ICT 2025 learning path':deliverySupportLabels.hub)}</a>
    <ol>{nextIds.filter(id => id !== chapterId).map(id => {
      const chapter = textbookChapters.find(c => c.id === id)!;
      return <li key={id}><a href={currentDocumentHref(`/learn/${chapter.slug}/`)}>{t(chapter.title)}</a>{!is2025&&!is2026&&<small>{t(deliveryLinkReasons[id])}</small>}</li>;
    })}</ol>
    {is2025&&<p>{workshops[chapterId]&&<><a href={currentDocumentHref(workshops[chapterId])}>{t('Related model workshop')}</a> · </>}{glossary[chapterId]&&<a href={currentDocumentHref('/tools/glossary/'+glossary[chapterId]+'/')}>{t('Quick topic definition')}</a>}</p>}
    {(is2025||is2026)&&<p><a href={currentDocumentHref('/tools/masterclass/')}>{t('Masterclass Hub')}</a> · <a href={currentDocumentHref('/tools/glossary/')}>{t('Glossary')}</a> · <a href={currentDocumentHref('/tools/journal/')}>{t('Trading Journal')}</a></p>}
    <a href={currentDocumentHref('/tools/chartlab/')}>{t(deliverySupportLabels.practice)}</a>
  </nav>;
}
