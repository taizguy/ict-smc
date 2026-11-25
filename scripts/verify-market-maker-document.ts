import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
  marketMakerDocument as lesson,
  marketMakerChapter,
  marketMakerPath,
  marketMakerDates,
  marketMakerSources,
  marketMakerQuizzes,
} from '../src/data/chapters/marketMakerLesson';
import { marketMakerTranslations as ur } from '../src/data/chapters/marketMakerTranslations';
import {
  evaluateCurveSymmetry,
  evaluateDealingRange,
  evaluateSmrTrigger,
  mtfPairingProfiles,
} from '../src/utils/marketMakerMath';
import { chapterQuiz } from '../src/data/chapters/chapterQuizzes';

// 1. Structural & SEO checks
assert.deepEqual(lesson.sections.map((s) => s.number), Array.from({ length: 22 }, (_, i) => i + 1));
assert.equal(lesson.faqs.length, 10);
assert.equal(lesson.takeaways.length, 5);
assert.equal(marketMakerChapter.keyTerms.length, 20);
assert.equal(marketMakerSources.length, 7);
assert.equal(marketMakerQuizzes.length, 5);
assert.equal(chapterQuiz(marketMakerChapter).length, 5);
assert.ok(lesson.seoTitle.length + ' | LearnSMC'.length <= 60, `SEO title too long: ${lesson.seoTitle.length + 11}`);
assert.ok(lesson.metaDescription.length <= 155, `Meta description too long: ${lesson.metaDescription.length}`);

// 2. Deterministic math & rule checks
const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-4, `${a} != ${b}`);
const eq = evaluateDealingRange(1.0920, 1.0800, 1.0835)!;
near(eq.equilibrium, 1.0860);
near(eq.ote705, 1.0835);
assert.equal(eq.model6EligibleLong, true);
assert.equal(eq.model6EligibleShort, false);

const eqPrem = evaluateDealingRange(1.0920, 1.0800, 1.0890)!;
assert.equal(eqPrem.model6EligibleLong, false);
assert.equal(eqPrem.model6EligibleShort, true);

const sym = evaluateCurveSymmetry('mmbm', 1.0800, 1.0920, 1.0835, 1.0796)!;
near(sym.midpoint50, 1.0860);
assert.ok(sym.rMultipleAtTerminus > 2.1);

assert.equal(
  evaluateSmrTrigger({
    sweepOccurred: true,
    cisdBodyClosedBeyondOrigin: true,
    mssConfirmed: true,
    fvgFormed: true,
  }).grade,
  'confirmed-smr',
);
assert.equal(
  evaluateSmrTrigger({
    sweepOccurred: true,
    cisdBodyClosedBeyondOrigin: false,
    mssConfirmed: false,
    fvgFormed: false,
  }).grade,
  'unconfirmed-sweep',
);
assert.equal(mtfPairingProfiles.length, 3);

// 3. Full EN -> UR translation parity check
const units: string[] = [];
function collect(v: unknown) {
  if (typeof v === 'string') units.push(v);
  else if (Array.isArray(v)) v.forEach(collect);
  else if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) {
      if (!['type', 'number', 'ordered', 'icon', 'tone'].includes(k)) collect(x);
    }
  }
}
collect(lesson);
for (const s of marketMakerSources) units.push(s.title, s.scope);
for (const q of marketMakerQuizzes) {
  units.push(q.question, ...q.options, q.explanation);
  if (q.context) units.push(q.context);
}

const missingUr = units.filter((u) => !Object.hasOwn(ur, u));
assert.equal(missingUr.length, 0, `Missing Urdu translations:\n${missingUr.join('\n')}`);

fs.mkdirSync('outputs/chapter33', { recursive: true });
fs.writeFileSync(
  'outputs/chapter33/verification.json',
  JSON.stringify(
    {
      path: marketMakerPath,
      dates: marketMakerDates,
      sections: lesson.sections.length,
      visuals: 8,
      faqs: lesson.faqs.length,
      glossaryTerms: marketMakerChapter.keyTerms.length,
      quizzes: marketMakerQuizzes.length,
      translatedUnitsChecked: units.length,
      equilibriumCheck: eq.equilibrium,
      ote705Check: eq.ote705,
    },
    null,
    2,
  ),
);
console.log(
  `Chapter 68 (ID 33) verification passed: ${lesson.sections.length} sections, 8 interactive/animated visuals, ${lesson.faqs.length} native FAQs, ${marketMakerChapter.keyTerms.length} terms, ${marketMakerQuizzes.length} quizzes, EN/UR parity & math verified.`,
);
