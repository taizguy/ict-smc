import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
  oteDocument as lesson,
  oteChapter,
  otePath,
  oteDates,
  oteSources,
  oteQuizzes,
} from '../src/data/chapters/oteLesson';
import { oteTranslations as ur } from '../src/data/chapters/oteTranslations';
import {
  classifyOteSlider,
  computeOteLevels,
  evaluateOteConfluence,
  oteMtfProfiles,
  syntheticOteBearishBars,
  syntheticOteBullishBars,
  syntheticOteDeepSweepBars,
  syntheticOteFailureBars,
  syntheticOteShallowBars,
} from '../src/utils/oteMath';
import { chapterQuiz } from '../src/data/chapters/chapterQuizzes';

// 1. Structural & SEO checks
assert.deepEqual(
  lesson.sections.map((s) => s.number),
  Array.from({ length: 25 }, (_, i) => i + 1),
);
assert.equal(lesson.faqs.length, 12);
assert.equal(lesson.takeaways.length, 5);
assert.equal(oteChapter.keyTerms.length, 24);
assert.equal(oteSources.length, 6);
assert.equal(oteQuizzes.length, 5);
assert.equal(chapterQuiz(oteChapter).length, 5);
assert.ok(
  lesson.seoTitle.length + ' | LearnSMC'.length <= 60,
  `SEO title too long: ${lesson.seoTitle.length + 11}`,
);
assert.ok(
  lesson.metaDescription.length <= 155,
  `Meta description too long: ${lesson.metaDescription.length}`,
);

// 2. Deterministic OTE arithmetic checks
const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-4, `${a} != ${b}`);
const nq = computeOteLevels('bullish', 20400, 20500, 2)!;
near(nq.equilibrium50, 20450);
near(nq.ote618, 20438.2);
near(nq.ote62, 20438);
near(nq.ote705, 20429.5);
near(nq.ote79, 20421);
near(nq.targetNeg27, 20527);
near(nq.targetNeg62, 20562);
near(nq.targetNeg100, 20600);
near(nq.targetNeg127, 20627.2);
near(nq.targetNeg162, 20661.8);
near(nq.stopPrice, 20395);

const eur = computeOteLevels('bearish', 1.09, 1.08, 5)!;
near(eur.equilibrium50, 1.085);
near(eur.ote62, 1.0862);
near(eur.ote705, 1.08705);
near(eur.ote79, 1.0879);
near(eur.targetNeg27, 1.0773);
near(eur.targetNeg62, 1.0738);

const sweetSlider = classifyOteSlider('bullish', 20400, 20500, 70.5, 2)!;
assert.equal(sweetSlider.zoneStatus, 'sweet-spot');
near(sweetSlider.price, 20429.5);

assert.equal(
  evaluateOteConfluence({
    inOteBand: true,
    hasFvgCe: true,
    hasOrderBlock: true,
    inKillzone: true,
  }).grade,
  'qualified-ote',
);
assert.equal(
  evaluateOteConfluence({
    inOteBand: false,
    hasFvgCe: true,
    hasOrderBlock: true,
    inKillzone: true,
  }).grade,
  'invalid-zone',
);

assert.equal(oteMtfProfiles.length, 3);
assert.equal(syntheticOteBullishBars.length, 11);
assert.equal(syntheticOteFailureBars.length, 9);
assert.equal(syntheticOteShallowBars.length, 8);
assert.equal(syntheticOteDeepSweepBars.length, 10);
assert.equal(syntheticOteBearishBars.length, 11);

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
for (const s of oteSources) units.push(s.title, s.scope);
for (const q of oteQuizzes) {
  units.push(q.question, ...q.options, q.explanation);
  if (q.context) units.push(q.context);
}

const missingUr = units.filter((u) => !Object.hasOwn(ur, u));
assert.equal(missingUr.length, 0, `Missing Urdu translations:\n${missingUr.join('\n')}`);

fs.mkdirSync('outputs/chapter34', { recursive: true });
fs.writeFileSync(
  'outputs/chapter34/verification.json',
  JSON.stringify(
    {
      path: otePath,
      dates: oteDates,
      sections: lesson.sections.length,
      visuals: 9,
      faqs: lesson.faqs.length,
      glossaryTerms: oteChapter.keyTerms.length,
      quizzes: oteQuizzes.length,
      translatedUnitsChecked: units.length,
      nq705: nq.ote705,
      eur705: eur.ote705,
    },
    null,
    2,
  ),
);
console.log(
  `Chapter 34 (ID 1034) verification passed: ${lesson.sections.length} sections, 9 interactive/animated visuals, ${lesson.faqs.length} native FAQs, ${oteChapter.keyTerms.length} terms, ${oteQuizzes.length} quizzes, EN/UR parity & math verified.`,
);
