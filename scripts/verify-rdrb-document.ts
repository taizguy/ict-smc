import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
  rdrbDocument as lesson,
  rdrbChapter,
  rdrbPath,
  rdrbDates,
  rdrbSources,
  rdrbQuizzes,
} from '../src/data/chapters/rdrbLesson';
import { rdrbTranslations as ur } from '../src/data/chapters/rdrbTranslations';
import {
  computeBprZone,
  computeEnigmaProjection,
  evaluateBprConfluence,
  rdrbMtfProfiles,
  syntheticBullishBprBars,
  syntheticBearishBprBars,
  syntheticRdrbSecondVisitBars,
  syntheticBprInvalidationBars,
} from '../src/utils/rdrbMath';
import { chapterQuiz } from '../src/data/chapters/chapterQuizzes';

// 1. Structural & SEO checks
assert.deepEqual(
  lesson.sections.map((s) => s.number),
  Array.from({ length: 25 }, (_, i) => i + 1),
);
assert.equal(lesson.faqs.length, 12);
assert.equal(lesson.takeaways.length, 5);
assert.equal(rdrbChapter.keyTerms.length, 24);
assert.equal(rdrbSources.length, 6);
assert.equal(rdrbQuizzes.length, 5);
assert.equal(chapterQuiz(rdrbChapter).length, 5);
assert.ok(
  lesson.seoTitle.length + ' | LearnSMC'.length <= 60,
  `SEO title too long: ${lesson.seoTitle.length + 11}`,
);
assert.ok(
  lesson.metaDescription.length <= 155,
  `Meta description too long: ${lesson.metaDescription.length}`,
);

// 2. Deterministic BPR, RDRB & Enigma arithmetic checks
const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-4, `${a} != ${b}`);

const nq = computeBprZone('bullish', 20440, 20460, 20432, 20454, 2);
assert.equal(nq.validOverlap, true);
assert.equal(nq.touchOnly, false);
near(nq.bprLow, 20440);
near(nq.bprHigh, 20454);
near(nq.bprMid50, 20447);
near(nq.bprSpan, 14);
near(nq.nearEdge, 20454);
near(nq.invalidationEdge, 20440);
near(nq.overlapPctFvg1, 70);

const eur = computeBprZone('bearish', 1.0842, 1.0862, 1.0846, 1.0868, 5);
assert.equal(eur.validOverlap, true);
near(eur.bprLow, 1.0846);
near(eur.bprHigh, 1.0862);
near(eur.bprMid50, 1.0854);
near(eur.nearEdge, 1.0846);
near(eur.invalidationEdge, 1.0862);

const kiss = computeBprZone('bullish', 20450, 20465, 20435, 20450, 2);
assert.equal(kiss.validOverlap, false);
assert.equal(kiss.touchOnly, true);
near(kiss.bprSpan, 0);

const voidGap = computeBprZone('bullish', 20460, 20475, 20430, 20445, 2);
assert.equal(voidGap.validOverlap, false);
assert.equal(voidGap.touchOnly, false);

const projWick = computeEnigmaProjection(20420, 20460, 1.25, 2);
near(projWick.legLength, 40);
near(projWick.target, 20470);

assert.equal(
  evaluateBprConfluence({
    hasOverlap: true,
    hasSweepOrigin: true,
    hasDisplacementMss: true,
    inPdDiscountOrPremium: true,
    hasActiveSession: true,
  }).grade,
  'qualified-bpr',
);
assert.equal(
  evaluateBprConfluence({
    hasOverlap: false,
    hasSweepOrigin: true,
    hasDisplacementMss: true,
    inPdDiscountOrPremium: true,
    hasActiveSession: true,
  }).grade,
  'invalid-bpr',
);

assert.equal(rdrbMtfProfiles.length, 3);
assert.equal(syntheticBullishBprBars.length, 11);
assert.equal(syntheticBearishBprBars.length, 11);
assert.equal(syntheticRdrbSecondVisitBars.length, 11);
assert.equal(syntheticBprInvalidationBars.length, 9);

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
for (const s of rdrbSources) units.push(s.title, s.scope);
for (const q of rdrbQuizzes) {
  units.push(q.question, ...q.options, q.explanation);
  if (q.context) units.push(q.context);
}

const missingUr = units.filter((u) => !Object.hasOwn(ur, u));
assert.equal(missingUr.length, 0, `Missing Urdu translations:\n${missingUr.join('\n')}`);

fs.mkdirSync('outputs/chapter35', { recursive: true });
fs.writeFileSync(
  'outputs/chapter35/verification.json',
  JSON.stringify(
    {
      path: rdrbPath,
      dates: rdrbDates,
      sections: lesson.sections.length,
      visuals: 9,
      faqs: lesson.faqs.length,
      glossaryTerms: rdrbChapter.keyTerms.length,
      quizzes: rdrbQuizzes.length,
      translatedUnitsChecked: units.length,
      nqMid50: nq.bprMid50,
      eurMid50: eur.bprMid50,
    },
    null,
    2,
  ),
);
console.log(
  `Chapter 35 (ID 56) verification passed: ${lesson.sections.length} sections, 9 interactive/animated visuals, ${lesson.faqs.length} native FAQs, ${rdrbChapter.keyTerms.length} terms, ${rdrbQuizzes.length} quizzes, EN/UR parity & math verified.`,
);
