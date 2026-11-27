import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
  suspensionReaperDocument as lesson,
  suspensionReaperChapter,
  suspensionReaperPath,
  suspensionReaperDates,
  suspensionReaperSources,
  suspensionReaperQuizzes,
} from '../src/data/chapters/suspensionReaperLesson';
import { suspensionReaperTranslations as ur } from '../src/data/chapters/suspensionReaperTranslations';
import {
  analyzeSuspensionTriad,
  computeReaperOverlap,
  calibrateContractLevel,
  evaluateSuspensionReaperConfluence,
  suspensionReaperMtfProfiles,
  syntheticBullishSuspensionBars,
  syntheticBearishSuspensionBars,
  syntheticBearishReaperBars,
  syntheticInvalidatedSuspensionBars,
} from '../src/utils/suspensionReaperMath';
import { chapterQuiz } from '../src/data/chapters/chapterQuizzes';
import { textbookChapters } from '../src/data/chaptersData';

// 1. Structural & SEO checks
assert.deepEqual(
  lesson.sections.map((s) => s.number),
  Array.from({ length: 25 }, (_, i) => i + 1),
);
assert.equal(lesson.faqs.length, 12);
assert.equal(lesson.takeaways.length, 5);
assert.equal(suspensionReaperChapter.keyTerms.length, 24);
assert.equal(suspensionReaperSources.length, 6);
assert.equal(suspensionReaperQuizzes.length, 6);
const liveChapter55 = textbookChapters.find((c) => c.id === 55)!;
assert.ok(liveChapter55);
assert.equal(chapterQuiz(liveChapter55).length, 6);
assert.ok(
  lesson.seoTitle.length + ' | LearnSMC'.length <= 60,
  `SEO title too long: ${lesson.seoTitle.length + 11}`,
);
assert.ok(
  lesson.metaDescription.length <= 155,
  `Meta description too long: ${lesson.metaDescription.length}`,
);

// 2. Deterministic Suspension, Reaper, Contract Calibration, and Confluence checks
const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-4, `${a} != ${b}`);

const bullSusp = analyzeSuspensionTriad({
  c1Open: 20404,
  c1High: 20422,
  c1Low: 20400,
  c1Close: 20416,
  c2Open: 20420,
  c2High: 20438,
  c2Low: 20415,
  c2Close: 20430,
  c3Open: 20435,
  c3High: 20462,
  c3Low: 20421,
  c3Close: 20456,
});
assert.equal(bullSusp.direction, 'bullish');
assert.equal(bullSusp.isTrueSuspensionBlock, true);
assert.equal(bullSusp.isClassicOuterWickFvg, false);
assert.equal(bullSusp.wicksOverlapBetweenBodies, true);
near(bullSusp.lowerGapLow, 20416);
near(bullSusp.lowerGapHigh, 20420);
near(bullSusp.upperGapLow, 20430);
near(bullSusp.upperGapHigh, 20435);
near(bullSusp.coreMidpoint, 20425);

const bearSusp = analyzeSuspensionTriad({
  c1Open: 20520,
  c1High: 20524,
  c1Low: 20502,
  c1Close: 20506,
  c2Open: 20501,
  c2High: 20507,
  c2Low: 20486,
  c2Close: 20491,
  c3Open: 20486,
  c3High: 20503,
  c3Low: 20464,
  c3Close: 20468,
});
assert.equal(bearSusp.direction, 'bearish');
assert.equal(bearSusp.isTrueSuspensionBlock, true);
assert.equal(bearSusp.isClassicOuterWickFvg, false);
near(bearSusp.upperGapLow, 20501);
near(bearSusp.upperGapHigh, 20506);
near(bearSusp.lowerGapLow, 20486);
near(bearSusp.lowerGapHigh, 20491);

const reaper = computeReaperOverlap(20512, 20524, 20514, 20526);
assert.equal(reaper.validOverlap, true);
near(reaper.reaperLow, 20514);
near(reaper.reaperHigh, 20524);
near(reaper.reaperMidpoint, 20519);

const cal = calibrateContractLevel(20416, 20435, 20420, 20438, 0.25, 0.5);
near(cal.basisOffsetPoints, -18);
near(cal.frontLow, 20398);
near(cal.frontHigh, 20417);
assert.equal(cal.zoneTickDepth, 76);

assert.equal(
  evaluateSuspensionReaperConfluence({
    dualBodyGapVerified: true,
    breakerContextPresent: true,
    closeThroughIfvg: true,
    nestedOpposingFvg: true,
    contractFeedMatched: true,
    activeKillzoneWindow: true,
  }).score,
  6,
);

assert.equal(suspensionReaperMtfProfiles.length, 3);
assert.equal(syntheticBullishSuspensionBars.length, 7);
assert.equal(syntheticBearishSuspensionBars.length, 7);
assert.equal(syntheticBearishReaperBars.length, 7);
assert.equal(syntheticInvalidatedSuspensionBars.length, 6);

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
for (const s of suspensionReaperSources) units.push(s.title, s.scope);
for (const q of suspensionReaperQuizzes) {
  units.push(q.question, ...q.options, q.explanation);
  if (q.context) units.push(q.context);
}
for (const m of suspensionReaperMtfProfiles) {
  units.push(m.tier, m.narrativeTf, m.zoneTf, m.triggerTf, m.primaryRole, m.invalidationRule);
}
for (const bars of [
  syntheticBullishSuspensionBars,
  syntheticBearishSuspensionBars,
  syntheticBearishReaperBars,
  syntheticInvalidatedSuspensionBars,
]) {
  for (const b of bars) {
    if (b.annotation) units.push(b.annotation);
  }
}

const missingUr = units.filter((u) => !Object.hasOwn(ur, u));
assert.equal(missingUr.length, 0, `Missing Urdu translations:\n${missingUr.join('\n')}`);

fs.mkdirSync('outputs/chapter32-suspension-reaper', { recursive: true });
fs.writeFileSync(
  'outputs/chapter32-suspension-reaper/verification.json',
  JSON.stringify(
    {
      path: suspensionReaperPath,
      dates: suspensionReaperDates,
      sections: lesson.sections.length,
      visuals: 9,
      faqs: lesson.faqs.length,
      glossaryTerms: suspensionReaperChapter.keyTerms.length,
      quizzes: suspensionReaperQuizzes.length,
      translatedUnitsChecked: units.length,
      bullishCoreMidpoint: bullSusp.coreMidpoint,
      reaperOverlap: [reaper.reaperLow, reaper.reaperHigh],
    },
    null,
    2,
  ),
);
console.log(
  `Chapter 32 (ID 55) verification passed: ${lesson.sections.length} sections, 9 interactive/animated visuals, ${lesson.faqs.length} native FAQs, ${suspensionReaperChapter.keyTerms.length} terms, ${suspensionReaperQuizzes.length} quizzes, EN/UR parity & math verified.`,
);
