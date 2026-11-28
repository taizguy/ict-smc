import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  breadButterChapter,
  breadButterDocument,
  breadButterQuizzes,
  breadButterSources,
} from '../src/data/chapters/breadButterLesson';
import { breadButterTranslations } from '../src/data/chapters/breadButterTranslations';
import { urdu } from '../src/i18n/urdu';
import {
  computeCostAdjustedMetrics,
  computeRangeQuartiles,
  getBreadButterSceneCandles,
} from '../src/utils/breadButterMath';

const catalog: Record<string, string> = { ...urdu, ...breadButterTranslations };

// 1. Structural counts
assert.equal(breadButterDocument.sections.length, 21, 'Chapter 70 must contain 21 sections');

const visualIds = breadButterDocument.sections
  .map((s) => s.visualId)
  .filter((v): v is string => Boolean(v));
assert.equal(visualIds.length, 19, 'Chapter 70 must contain 19 interactive visuals');
assert.equal(new Set(visualIds).size, 19, 'All 19 visualIds must be unique');

const faqSec = breadButterDocument.sections.find((s) => s.faqs && s.faqs.length > 0);
assert.ok(faqSec, 'FAQ section must exist');
assert.equal(faqSec.anchor, 'bread-butter-faq', 'FAQ anchor must be bread-butter-faq');
assert.equal(faqSec.faqs?.length, 14, 'Chapter 70 must contain 14 FAQs');

const glossarySec = breadButterDocument.sections.find((s) => s.glossaryTerms && s.glossaryTerms.length > 0);
assert.ok(glossarySec, 'Glossary section must exist');
assert.equal(glossarySec.glossaryTerms?.length, 24, 'Chapter 70 must contain 24 glossary terms');

assert.equal(breadButterQuizzes.length, 6, 'Chapter 70 must contain 6 quizzes');

// 2. Verbatim baseline preservation (45.1 - 45.4, 5 paragraphs)
const baselineSec = breadButterDocument.sections.find((s) => s.baselineSections && s.baselineSections.length > 0);
assert.ok(baselineSec, 'Baseline notes section must exist');
assert.equal(baselineSec.baselineSections?.length, 4, 'Must preserve all 4 baseline sections (45.1-45.4)');

const expectedBaseline: Array<[string, string, string[]]> = [
  [
    '45.1',
    'Define a consolidation before the breakout',
    [
      'Select the instrument, session and range boundaries before looking at the subsequent move. Record both false breakouts and successful continuations. A candle chart cannot show that an order inventory reached critical mass or that every breakout trader was trapped.',
    ],
  ],
  [
    '45.2',
    'A price reference is not a forecast',
    [
      'The reviewed Market Reversals lesson notes that not every old high creates a reversal. Some price runs continue. Round numbers, sentiment measures and a selected swing can form research inputs, but none alone proves the next direction. Do not use an unsupported 85% sentiment threshold as an automatic reversal rule.',
    ],
  ],
  [
    '45.3',
    'Twenty pips is an example objective',
    [
      'The official lesson titled 20 Pips Per Day explicitly separates its title from a promise to earn that amount every day. It is not a daily income schedule. Another Month 9 routine discussion distinguishes day trading from trading every day, and scalping from acting on every fluctuation.',
      'A source objective measured in Forex pips is not mechanically interchangeable with Nasdaq handles or futures ticks. State the contract, tick value, spread and costs. Record days without trades, losses, partial exits and unfilled orders. A chosen objective does not establish expectancy.',
    ],
  ],
  [
    '45.4',
    'Evaluate the whole sample',
    [
      'Choose the setup and invalidation before replay. Keep later data separate from the examples used to select the rules. Compare results after costs and disclose every excluded session. An attractive historical example is useful for explanation; it is not an independently verified performance record.',
    ],
  ],
];

expectedBaseline.forEach(([code, heading, paras], idx) => {
  const actual = baselineSec.baselineSections![idx];
  assert.equal(actual.code, code, `Baseline code mismatch at index ${idx}`);
  assert.equal(actual.heading, heading, `Baseline heading mismatch for ${code}`);
  assert.deepEqual(actual.paragraphs, paras, `Verbatim paragraph mismatch for ${code}`);
});

// 3. Math helpers verification
const q = computeRangeQuartiles(1.0800, 1.0830);
assert.equal(q.equilibrium, 1.0815);
assert.equal(q.lowerQuartile, 1.0808);
assert.equal(q.upperQuartile, 1.0823);

const cost = computeCostAdjustedMetrics(20, 30, 1.0);
assert.equal(cost.grossR, 1.5);
assert.equal(cost.netR, 1.38);
assert.equal(cost.netBreakEvenPct, 42.0);

for (const branch of ['completed', 'unfilled', 'failure'] as const) {
  const bars = getBreadButterSceneCandles(branch);
  assert.equal(bars.length, 11, `Expected 11 bars for branch ${branch}`);
}

// 4. 100% Urdu translation coverage check
const missing: string[] = [];
const check = (str: string) => {
  if (!str || !str.trim()) return;
  if (!catalog[str]) missing.push(str);
};

check(breadButterChapter.title);
check(breadButterChapter.description);
check(breadButterDocument.quickAnswer);
check(breadButterDocument.tocLabel);

for (const sec of breadButterDocument.sections) {
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

for (const src of breadButterSources) {
  check(src.title);
  check(src.scope);
}
for (const quiz of breadButterQuizzes) {
  check(quiz.question);
  if (quiz.context) check(quiz.context);
  quiz.options.forEach(check);
  check(quiz.explanation);
}

// Also scan t('...') string literals across all 4 Chapter 70 TSX files
const tsxFiles = [
  'src/components/BreadButterScene.tsx',
  'src/components/BreadButterVisual.tsx',
  'src/components/BreadButterExtendedVisuals.tsx',
  'src/components/BreadButterLessonContent.tsx',
];
const tCallRe = /\bt\(\s*'([^']+)'\s*\)/g;
for (const rel of tsxFiles) {
  const src = fs.readFileSync(path.resolve(rel), 'utf8');
  let m: RegExpExecArray | null;
  while ((m = tCallRe.exec(src)) !== null) {
    check(m[1]);
  }
}

if (missing.length > 0) {
  console.error('Missing Urdu keys in Chapter 70:', Array.from(new Set(missing)));
  process.exit(1);
}

console.log(
  'Chapter 70 (ID 45) Bread-and-Butter document verified: 21 sections, 19 visuals, 14 FAQs, 24 glossary terms, 4 verbatim baseline notes (5 paragraphs), 6 quizzes, math & 100% Urdu coverage.',
);
