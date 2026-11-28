import assert from 'node:assert/strict';
import {
  orderBlockDocument,
  orderBlockQuizzes,
  orderBlockSources,
} from '../src/data/chapters/orderBlockLesson';
import { orderBlockTranslations } from '../src/data/chapters/orderBlockTranslations';
import { urdu } from '../src/i18n/urdu';
import {
  classifyMitigationDepth,
  computeObFvgOverlap,
  computeOrderBlockBoundaries,
  computePaperRisk,
} from '../src/utils/orderBlockMath';

assert.equal(orderBlockDocument.sections.length, 22, 'Expected 22 sections in Chapter 29');
const visuals = orderBlockDocument.sections.filter((s) => Boolean(s.visualId));
assert.equal(visuals.length, 18, 'Expected 18 bespoke visual figures');
const faqSection = orderBlockDocument.sections.find((s) => s.faqs && s.faqs.length > 0);
assert.equal(faqSection?.faqs?.length, 14, 'Expected 14 native FAQs');
const glossarySection = orderBlockDocument.sections.find((s) => s.glossaryTerms && s.glossaryTerms.length > 0);
assert.equal(glossarySection?.glossaryTerms?.length, 24, 'Expected 24 glossary terms');
const baselineSection = orderBlockDocument.sections.find((s) => s.baselineSections);
const baselineCount = (baselineSection?.baselineSections || []).reduce(
  (sum, g) => sum + g.paragraphs.length,
  0,
);
assert.equal(baselineCount, 27, 'Expected all 27 baseline paragraphs retained verbatim');
assert.equal(orderBlockQuizzes.length, 6, 'Expected 6 quizzes');
assert.ok(orderBlockSources.length >= 6, 'Expected at least 6 primary sources');

// Verify math helpers
const bullRun = computeOrderBlockBoundaries(
  [
    { id: 'c1', open: 105, high: 105.5, low: 102, close: 102.5 },
    { id: 'c2', open: 102.5, high: 103, low: 100, close: 101 },
  ],
  'bullish',
);
assert.equal(bullRun.openingRef, 105);
assert.equal(bullRun.bodyHigh, 105);
assert.equal(bullRun.bodyLow, 101);
assert.equal(bullRun.fullHigh, 105.5);
assert.equal(bullRun.fullLow, 100);
assert.equal(bullRun.bodyMeanThreshold, 103);
assert.equal(bullRun.fullMeanThreshold, 102.75);

const overlap = computeObFvgOverlap(101, 105, 103, 107);
assert.equal(overlap.status, 'overlap');
assert.equal(overlap.low, 103);
assert.equal(overlap.high, 105);
assert.equal(overlap.width, 2);
assert.equal(overlap.midpoint, 104);

const touching = computeObFvgOverlap(101, 105, 105, 108);
assert.equal(touching.status, 'touching');
assert.equal(touching.width, 0);

const disjoint = computeObFvgOverlap(101, 105, 106, 109);
assert.equal(disjoint.status, 'disjoint');
assert.equal(disjoint.midpoint, null);

const risk = computePaperRisk(103, 100, 109);
assert.equal(risk.riskPoints, 3);
assert.equal(risk.rewardPoints, 6);
assert.equal(risk.rrRatio, 2);
assert.equal(risk.breakEvenPctBeforeCosts, 33.3333);

assert.equal(classifyMitigationDepth(105.5, 106, bullRun), 'unmitigated');
assert.equal(classifyMitigationDepth(104.2, 105.4, bullRun), 'opening-touch');
assert.equal(classifyMitigationDepth(102.8, 104.5, bullRun), 'mean-threshold');
assert.equal(classifyMitigationDepth(100.4, 102.2, bullRun), 'deep-wick');
assert.equal(classifyMitigationDepth(99.2, 99.5, bullRun), 'closing-failure');

// Verify translation coverage across every document string
const catalog = { ...orderBlockTranslations, ...urdu };
const missing: string[] = [];
const check = (s: string) => {
  if (!s || !catalog[s]) missing.push(s);
};

check(orderBlockDocument.title);
check(orderBlockDocument.quickAnswer);
check(orderBlockDocument.tocLabel);
for (const sec of orderBlockDocument.sections) {
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
    sec.table.rows.forEach((r) => r.forEach(check));
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
orderBlockQuizzes.forEach((q) => {
  check(q.question);
  if (q.context) check(q.context);
  q.options.forEach(check);
  check(q.explanation);
});
orderBlockSources.forEach((s) => {
  check(s.title);
  check(s.scope);
});

assert.equal(
  missing.length,
  0,
  `Missing Urdu translations (${missing.length}):\n${missing.slice(0, 15).join('\n')}`,
);
console.log(
  'Chapter 29 Order Block document verification passed: 22 sections, 18 visuals, 14 FAQs, 24 glossary terms, 27 baseline paragraphs, 6 quizzes, math checks, and 100% Urdu coverage.',
);
