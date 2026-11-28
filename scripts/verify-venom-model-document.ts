import assert from 'node:assert/strict';
import {
  venomModelDocument,
  venomModelQuizzes,
  venomModelSources,
} from '../src/data/chapters/venomModelLesson';
import { venomModelTranslations } from '../src/data/chapters/venomModelTranslations';
import { urdu } from '../src/i18n/urdu';
import {
  computeBprOverlap,
  computeEntryPlan,
  getVenomSceneCandles,
} from '../src/utils/venomModelMath';

assert.equal(venomModelDocument.sections.length, 21, 'Expected 21 sections in Chapter 67');
const visuals = venomModelDocument.sections.filter((s) => Boolean(s.visualId));
assert.equal(visuals.length, 19, 'Expected 19 interactive visuals in Chapter 67');
const faqSection = venomModelDocument.sections.find((s) => s.faqs && s.faqs.length > 0);
assert.equal(faqSection?.faqs?.length, 14, 'Expected 14 FAQs in Chapter 67');
const glossarySection = venomModelDocument.sections.find((s) => s.glossaryTerms && s.glossaryTerms.length > 0);
assert.equal(glossarySection?.glossaryTerms?.length, 24, 'Expected 24 glossary terms');
const baselineSection = venomModelDocument.sections.find((s) => s.baselineSections);
assert.equal(baselineSection?.baselineSections?.length, 5, 'Expected 5 verbatim baseline notes (53.1-53.5)');
const baselineParagraphs = (baselineSection?.baselineSections || []).flatMap((g) => g.paragraphs);
assert.equal(baselineParagraphs.length, 6, 'Expected 6 verbatim baseline paragraphs across 53.1-53.5');
assert.equal(venomModelQuizzes.length, 6, 'Expected 6 quizzes');
assert.ok(venomModelSources.length >= 5, 'Expected at least 5 primary sources');

// Verify verbatim baseline sentences
assert.ok(
  baselineParagraphs[0].startsWith('This opening-session variant freezes the 08:00–09:30 New York high and low'),
  '53.1 verbatim start mismatch',
);
assert.ok(
  baselineParagraphs[1].includes('An inefficient upward departure is followed by an opposing inefficient move down: the two fangs.'),
  '53.2 verbatim text mismatch',
);
assert.ok(
  baselineParagraphs[2].includes('Do not award the deferred entry at 111 unless a later price actually returns there after the reference is known.'),
  '53.3 verbatim text mismatch',
);
assert.ok(
  baselineParagraphs[3].includes('SMT, a breaker or an FVG may add context, but do not invent a mandatory five-stage chain'),
  '53.4 verbatim text mismatch',
);
assert.ok(
  baselineParagraphs[4].includes('Moving the entry down to 108 after the decline would leave six points to the same protective level'),
  '53.5 para 1 verbatim text mismatch',
);
assert.ok(
  baselineParagraphs[5].includes('Practise a separately defined entry sequence in Trade Simulator.'),
  '53.5 para 2 verbatim text mismatch',
);

// Verify deterministic math helpers
const bpr = computeBprOverlap(109.6, 111.4, 108.6, 111.0);
assert.equal(bpr.hasOverlap, true);
assert.equal(bpr.overlapLow, 109.6);
assert.equal(bpr.overlapHigh, 111.0);
assert.equal(bpr.width, 1.4);
assert.equal(bpr.midpoint, 110.3);

const noBpr = computeBprOverlap(111.5, 113.0, 108.0, 110.0);
assert.equal(noBpr.hasOverlap, false);
assert.equal(noBpr.width, 0);

const planned = computeEntryPlan('bearish', 111.0, 114.0, 104.0);
assert.equal(planned.risk, 3);
assert.equal(planned.reward, 7);
assert.equal(planned.rr, 2.33);
assert.equal(planned.breakEvenBeforeCostsPct, 30.0);

const chased = computeEntryPlan('bearish', 108.0, 114.0, 104.0);
assert.equal(chased.risk, 6);
assert.equal(chased.reward, 4);
assert.equal(chased.rr, 0.67);
assert.equal(chased.breakEvenBeforeCostsPct, 60.0);

assert.equal(getVenomSceneCandles('deferred-fill').length, 10);
assert.equal(getVenomSceneCandles('unfilled-runaway').length, 10);
assert.equal(getVenomSceneCandles('closing-failure').length, 10);

// Verify 100% Urdu translation coverage for document, quizzes, and sources
const catalog = { ...venomModelTranslations, ...urdu };
const missing: string[] = [];
const check = (value?: string) => {
  if (!value) return;
  const key = value.replace(/\s+/g, ' ').trim();
  if (!key || /^[\d.,%+\-$:–—/\sA-Z()ptsR]+$/.test(key)) return;
  if (!catalog[key]) missing.push(key);
};

check(venomModelDocument.title);
check(venomModelDocument.quickAnswer);
check(venomModelDocument.tocLabel);
for (const sec of venomModelDocument.sections) {
  check(sec.title);
  if (sec.extract) {
    check(sec.extract.name);
    check(sec.extract.text);
  }
  sec.paragraphs.forEach(check);
  sec.numberedPoints?.forEach(check);
  sec.bullets?.forEach(check);
  if (sec.callout) {
    check(sec.callout.label);
    check(sec.callout.text);
  }
  if (sec.table) {
    check(sec.table.caption);
    sec.table.headers.forEach(check);
    sec.table.rows.forEach((row) => row.forEach(check));
  }
  sec.checklist?.forEach((c) => {
    check(c.label);
    check(c.detail);
  });
  sec.glossaryTerms?.forEach((g) => {
    check(g.term);
    check(g.definition);
  });
  sec.baselineSections?.forEach((b) => {
    check(b.heading);
    b.paragraphs.forEach(check);
  });
  sec.faqs?.forEach((f) => {
    check(f.q);
    check(f.a);
  });
}
venomModelQuizzes.forEach((q) => {
  check(q.question);
  check(q.context);
  q.options.forEach(check);
  check(q.explanation);
});
venomModelSources.forEach((s) => {
  check(s.title);
  check(s.scope);
});

assert.deepEqual(missing, [], `Missing Urdu translations in Chapter 67: ${JSON.stringify(missing, null, 2)}`);

console.log(
  'Chapter 67 (ID 53) Venom Model document verified: 21 sections, 19 visuals, 14 FAQs, 24 glossary terms, 5 verbatim baseline notes (6 paragraphs), 6 quizzes, math & 100% Urdu coverage.',
);
