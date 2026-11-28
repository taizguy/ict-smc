import assert from 'node:assert/strict';
import {
  breakerBlockDocument,
  breakerBlockQuizzes,
  breakerBlockSources,
} from '../src/data/chapters/breakerBlockLesson';
import { breakerBlockTranslations } from '../src/data/chapters/breakerBlockTranslations';
import { urdu } from '../src/i18n/urdu';
import {
  computeBreakerZoneMetrics,
  computeUnicornOverlap,
  evaluateBreakerConfluence,
} from '../src/utils/breakerBlockMath';

assert.equal(breakerBlockDocument.sections.length, 23, 'Expected 23 sections in Chapter 30');
const visuals = breakerBlockDocument.sections.filter((s) => Boolean(s.visualId));
assert.equal(visuals.length, 19, 'Expected 19 bespoke visual figures');
const faqSection = breakerBlockDocument.sections.find((s) => s.faqs && s.faqs.length > 0);
assert.equal(faqSection?.faqs?.length, 12, 'Expected 12 native FAQs');
const glossarySection = breakerBlockDocument.sections.find((s) => s.glossaryTerms && s.glossaryTerms.length > 0);
assert.equal(glossarySection?.glossaryTerms?.length, 22, 'Expected 22 glossary terms');
const baselineSection = breakerBlockDocument.sections.find((s) => s.baselineSections);
const baselineCount = (baselineSection?.baselineSections || []).reduce(
  (sum, g) => sum + g.paragraphs.length,
  0,
);
assert.equal(baselineCount, 22, 'Expected all 22 baseline paragraphs retained verbatim');
assert.equal(breakerBlockQuizzes.length, 6, 'Expected 6 quizzes');
assert.ok(breakerBlockSources.length >= 6, 'Expected at least 6 primary sources');

// Verify math helpers
const bearUnicorn = computeUnicornOverlap(100, 104, 102, 106);
assert.equal(bearUnicorn.status, 'positive-overlap');
assert.equal(bearUnicorn.lower, 102);
assert.equal(bearUnicorn.upper, 104);
assert.equal(bearUnicorn.width, 2);

const touchUnicorn = computeUnicornOverlap(100, 104, 104, 106);
assert.equal(touchUnicorn.status, 'touching-only');
assert.equal(touchUnicorn.width, 0);

const bullMetrics = computeBreakerZoneMetrics([{ open: 106.5, high: 110, low: 106, close: 109.5 }], 'bullish');
assert.equal(bullMetrics.fullMidpoint, 108);

const gradeA = evaluateBreakerConfluence({
  htfBias: true,
  externalSweep: true,
  bodyCloseMss: true,
  fvgUnicornOverlap: true,
  activeKillzone: true,
  predefinedInvalidation: true,
});
assert.equal(gradeA.score, 10);
assert.equal(gradeA.tier, 'High-Probability Grade A');

const noSweep = evaluateBreakerConfluence({
  htfBias: true,
  externalSweep: false,
  bodyCloseMss: true,
  fvgUnicornOverlap: true,
  activeKillzone: true,
  predefinedInvalidation: true,
});
assert.equal(noSweep.tier, 'Incomplete / No-Trade');

// Verify translation coverage across every document string
const catalog = { ...breakerBlockTranslations, ...urdu };
const missing: string[] = [];
const check = (s: string) => {
  if (!s || !catalog[s]) missing.push(s);
};

check(breakerBlockDocument.title);
check(breakerBlockDocument.quickAnswer);
check(breakerBlockDocument.tocLabel);
for (const sec of breakerBlockDocument.sections) {
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
breakerBlockQuizzes.forEach((q) => {
  check(q.question);
  if (q.context) check(q.context);
  q.options.forEach(check);
  check(q.explanation);
});
breakerBlockSources.forEach((s) => {
  check(s.title);
  check(s.scope);
});

assert.equal(missing.length, 0, `Missing Urdu translations (${missing.length}):\n${missing.slice(0, 15).join('\n')}`);
console.log('Chapter 30 Breaker Block document verification passed: 23 sections, 19 visuals, 12 FAQs, 22 glossary terms, 22 baseline paragraphs, 6 quizzes, math checks, and 100% Urdu coverage.');
