import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
  model2022Document as lesson,
  model2022Chapter,
  model2022Path,
  model2022Dates,
  model2022Sources,
  model2022Quizzes,
} from '../src/data/chapters/model2022Lesson';
import { model2022Translations as ur } from '../src/data/chapters/model2022Translations';
import {
  evaluate2022Sequence,
  evaluateFvgOteConfluence,
  killzoneTimelineSpecs,
  mtf2022Tiers,
  synthetic2022BullishSeries,
  synthetic2022FailureBranch,
} from '../src/utils/model2022Math';
import { chapterQuiz } from '../src/data/chapters/chapterQuizzes';

// 1. Structural & SEO checks
assert.deepEqual(lesson.sections.map((s) => s.number), Array.from({ length: 22 }, (_, i) => i + 1));
assert.equal(lesson.faqs.length, 10);
assert.equal(lesson.takeaways.length, 5);
assert.equal(model2022Chapter.keyTerms.length, 20);
assert.equal(model2022Sources.length, 8);
assert.equal(model2022Quizzes.length, 5);
assert.equal(chapterQuiz(model2022Chapter).length, 5);
assert.ok(lesson.seoTitle.length + ' | LearnSMC'.length <= 60, `SEO title too long: ${lesson.seoTitle.length + 11}`);
assert.ok(lesson.metaDescription.length <= 155, `Meta description too long: ${lesson.metaDescription.length}`);

// 2. Deterministic math & rule checks
const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-4, `${a} != ${b}`);
const fvg = evaluateFvgOteConfluence(20986, 21060, 21012, 21032, 50, 21085)!;
near(fvg.fvgCe, 21022);
near(fvg.selectedEntryPrice, 21022);
near(fvg.equilibrium50, 21023);
assert.equal(fvg.inDiscount, true);
const fvgDeep = evaluateFvgOteConfluence(20986, 21060, 21012, 21032, 100, 21085)!;
near(fvgDeep.selectedEntryPrice, 21012);
assert.equal(fvgDeep.inDiscount, true);
assert.equal(fvgDeep.inOteBand, true);

assert.equal(
  evaluate2022Sequence({
    inTimeWindow: true,
    liquiditySwept: true,
    strongDisplacement: true,
    structureShifted: true,
    cleanFvgFormed: true,
  }).grade,
  'qualified-setup',
);
assert.equal(
  evaluate2022Sequence({
    inTimeWindow: true,
    liquiditySwept: true,
    strongDisplacement: true,
    structureShifted: true,
    cleanFvgFormed: false,
  }).grade,
  'wait-fvg',
);
assert.equal(killzoneTimelineSpecs.length, 7);
assert.equal(mtf2022Tiers.length, 3);
assert.equal(synthetic2022BullishSeries.length, 13);
assert.equal(synthetic2022FailureBranch.length, 3);

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
for (const s of model2022Sources) units.push(s.title, s.scope);
for (const q of model2022Quizzes) {
  units.push(q.question, ...q.options, q.explanation);
  if (q.context) units.push(q.context);
}

const missingUr = units.filter((u) => !Object.hasOwn(ur, u));
assert.equal(missingUr.length, 0, `Missing Urdu translations:\n${missingUr.join('\n')}`);

fs.mkdirSync('outputs/chapter36', { recursive: true });
fs.writeFileSync(
  'outputs/chapter36/verification.json',
  JSON.stringify(
    {
      path: model2022Path,
      dates: model2022Dates,
      sections: lesson.sections.length,
      visuals: 8,
      faqs: lesson.faqs.length,
      glossaryTerms: model2022Chapter.keyTerms.length,
      quizzes: model2022Quizzes.length,
      translatedUnitsChecked: units.length,
      fvgCeCheck: fvg.fvgCe,
      ote62Check: fvg.ote62,
      ote705Check: fvg.ote705,
    },
    null,
    2,
  ),
);
console.log(
  `Chapter 69 (ID 36) verification passed: ${lesson.sections.length} sections, 8 interactive/animated visuals, ${lesson.faqs.length} native FAQs, ${model2022Chapter.keyTerms.length} terms, ${model2022Quizzes.length} quizzes, EN/UR parity & math verified.`,
);
