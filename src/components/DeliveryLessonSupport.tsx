import { deliverySupport, deliverySupportLabels, deliveryLinkReasons } from '../data/chapters/deliverySupport';
import { textbookChapters } from '../data/chaptersData';
import { useTranslation } from '../i18n/TranslationProvider';
import { currentDocumentHref } from '../i18n/navigation';

export function DeliveryLessonSupport({ chapterId, section }: { chapterId: number; section: 'comparison' | 'faq' | 'links' }) {
  const { t } = useTranslation();
  const content = deliverySupport[chapterId];
  if (!content) return null;
  if (section === 'comparison') return <section className="delivery-reference" id="delivery-comparison">
    <h2>{t(content.heading)}</h2>
    <div className="delivery-table-scroll" role="region" aria-label={t(content.heading)} tabIndex={0}>
      <table><caption>{t(content.heading)}</caption><thead><tr>{content.columns.map(label => <th scope="col" key={label}>{t(label)}</th>)}</tr></thead>
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
    <a href={currentDocumentHref('/curriculum/price-delivery/')}>{t(deliverySupportLabels.hub)}</a>
    <ol>{[13, 14, 15, 16].filter(id => id !== chapterId).map(id => {
      const chapter = textbookChapters.find(c => c.id === id)!;
      return <li key={id}><a href={currentDocumentHref(`/learn/${chapter.slug}/`)}>{t(chapter.title)}</a><small>{t(deliveryLinkReasons[id])}</small></li>;
    })}</ol>
    <a href={currentDocumentHref('/tools/chartlab/')}>{t(deliverySupportLabels.practice)}</a>
  </nav>;
}
