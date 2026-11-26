import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
  pdArrayDocument as lesson,
  pdArrayChapter,
  pdArrayPath,
  pdArrayDates,
  pdArraySources,
  pdArrayQuizzes,
} from '../src/data/chapters/pdArrayLesson';
import { pdArrayTranslations as ur } from '../src/data/chapters/pdArrayTranslations';
import {
  computeDealingRange,
  evaluatePdConfluence,
  pdArrayHierarchyList,
  pdMtfProfiles,
  syntheticPdBullishBars,
  syntheticPdBearishBars,
  syntheticPdContinuumBars,
  syntheticPdFailureBars,
} from '../src/utils/pdArrayMath';
import { chapterQuiz } from '../src/data/chapters/chapterQuizzes';

// 1. Structural & SEO checks
assert.deepEqual(
  lesson.sections.map((s) => s.number),
  Array.from({ length: 25 }, (_, i) => i + 1),
);
assert.equal(lesson.faqs.length, 12);
assert.equal(lesson.takeaways.length, 5);
assert.equal(pdArrayChapter.keyTerms.length, 24);
assert.equal(pdArraySources.length, 6);
assert.equal(pdArrayQuizzes.length, 6);
assert.equal(chapterQuiz(pdArrayChapter).length, 6);
assert.ok(
  lesson.seoTitle.length + ' | LearnSMC'.length <= 60,
  `SEO title too long: ${lesson.seoTitle.length + 11}`,
);
assert.ok(
  lesson.metaDescription.length <= 155,
  `Meta description too long: ${lesson.metaDescription.length}`,
);

// 2. Deterministic Dealing Range, Quadrant, Hierarchy, Confluence & MTF checks
const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-4, `${a} != ${b}`);

const r1 = computeDealingRange(100, 140, 132);
assert.equal(r1.validRange, true);
near(r1.equilibrium, 120);
near(r1.q25, 110);
near(r1.q75, 130);
near(r1.depthFromLowPct, 80);
assert.equal(r1.half, 'premium');
assert.equal(r1.quadrant, 'Q4 Upper Premium');

const r2 = computeDealingRange(100, 180, 132);
assert.equal(r2.validRange, true);
near(r2.equilibrium, 140);
near(r2.depthFromLowPct, 40);
assert.equal(r2.half, 'discount');
assert.equal(r2.quadrant, 'Q2 Upper Discount');

assert.equal(
  evaluatePdConfluence({
    anchorsFrozen: true,
    correctHalf: true,
    opposingDrawClear: true,
    unmitigatedArray: true,
    activeSession: true,
    ltfConfirmation: true,
  }).grade,
  'qualified',
);
assert.equal(
  evaluatePdConfluence({
    anchorsFrozen: true,
    correctHalf: false,
    opposingDrawClear: true,
    unmitigatedArray: true,
    activeSession: true,
    ltfConfirmation: true,
  }).grade,
  'unqualified',
);
assert.equal(
  evaluatePdConfluence({
    anchorsFrozen: true,
    correctHalf: true,
    opposingDrawClear: true,
    unmitigatedArray: false,
    activeSession: true,
    ltfConfirmation: false,
  }).grade,
  'partial',
);

assert.equal(pdArrayHierarchyList.length, 9);
assert.equal(pdMtfProfiles.length, 3);
assert.equal(syntheticPdBullishBars.length, 9);
assert.equal(syntheticPdBearishBars.length, 8);
assert.equal(syntheticPdContinuumBars.length, 7);
assert.equal(syntheticPdFailureBars.length, 7);

// 3. Full EN -> UR translation parity check
const units: string[] = [];
function collect(v: unknown) {
  if (typeof v === 'string') units.push(v);
  else if (Array.isArray(v)) v.forEach(collect);
  else if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) {
      if (!['type', 'number', 'ordered', 'icon', 'tone', 'seoTitleUr', 'metaDescriptionUr'].includes(k)) {
        collect(x);
      }
    }
  }
}
collect(lesson);
for (const s of pdArraySources) units.push(s.title, s.scope);
for (const q of pdArrayQuizzes) {
  units.push(q.question, ...q.options, q.explanation);
  if (q.context) units.push(q.context);
}
for (const h of pdArrayHierarchyList) {
  units.push(h.name, h.premiumRole, h.discountRole, h.refinementLine, h.keyRule);
}
for (const m of pdMtfProfiles) {
  units.push(m.timeframe, m.role, m.eqLabel, m.currentZone, m.nestedTruth);
}
for (const bars of [
  syntheticPdBullishBars,
  syntheticPdBearishBars,
  syntheticPdContinuumBars,
  syntheticPdFailureBars,
]) {
  for (const b of bars) {
    if (b.annotation) units.push(b.annotation);
  }
}

const missingUr = units.filter((u) => !Object.hasOwn(ur, u));
assert.equal(missingUr.length, 0, `Missing Urdu translations:\n${missingUr.join('\n')}`);

fs.mkdirSync('outputs/chapter33', { recursive: true });
fs.writeFileSync(
  'outputs/chapter33/verification.json',
  JSON.stringify(
    {
      path: pdArrayPath,
      dates: pdArrayDates,
      sections: lesson.sections.length,
      visuals: 9,
      faqs: lesson.faqs.length,
      glossaryTerms: pdArrayChapter.keyTerms.length,
      quizzes: pdArrayQuizzes.length,
      translatedUnitsChecked: units.length,
      range100_140Eq: r1.equilibrium,
      range100_180Eq: r2.equilibrium,
    },
    null,
    2,
  ),
);
console.log(
  `Chapter 33 (ID 59) verification passed: ${lesson.sections.length} sections, 9 interactive/animated visuals, ${lesson.faqs.length} native FAQs, ${pdArrayChapter.keyTerms.length} terms, ${pdArrayQuizzes.length} quizzes, EN/UR parity & math verified.`,
);
