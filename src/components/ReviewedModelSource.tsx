import { reviewedModelSources } from '../data/reviewedModelSources';
import { curriculumReviewLabel } from '../data/curriculumReview';
export function ReviewedModelSource({ modelId }: { modelId: string }) {
  const review = reviewedModelSources(modelId);
  if (!review) return null;
  return <aside className="rounded-xl border border-ink/10 bg-surface p-5 my-5 space-y-3">
    <h3 className="font-semibold">Reviewed source context</h3>
    <p className="text-sm">Editorial clarification updated: {curriculumReviewLabel}</p>
    <p className="text-sm">These references identify the passages checked. They do not authenticate every named variation or establish trading performance.</p>
    {review.key === 'rdrb' && <p className="text-sm">A precise originating explanation for this named second-touch model has not been verified. The revisit exercise is an independent research variation.</p>}
    <ul className="space-y-3">{review.sources.map(source => <li key={source.url}>
      <a className="underline underline-offset-4" href={source.url}>{source.title}</a>
      <p className="text-sm mt-1">{source.scope}</p>
    </li>)}</ul>
  </aside>;
}
