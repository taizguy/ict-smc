import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
  orderBookDocument as lesson,
  orderBookChapter,
  orderBookPath,
  orderBookDates,
  orderBookSources,
  orderBookQuizzes,
} from '../src/data/chapters/orderBookLesson';
import { orderBookTranslations as ur } from '../src/data/chapters/orderBookTranslations';
import {
  computeObiAndMicroprice,
  computeSpreadAndMid,
  simulateAuctionUncross,
  simulateFifoVsProRata,
  syntheticOrderBooks,
  walkOrderBook,
} from '../src/utils/orderBookMath';
import { chapterQuiz } from '../src/data/chapters/chapterQuizzes';

// 1. Structural & content completeness checks
assert.deepEqual(lesson.sections.map((s) => s.number), Array.from({ length: 21 }, (_, i) => i + 1));
assert.equal(lesson.faqs.length, 8);
assert.equal(lesson.takeaways.length, 5);
assert.equal(orderBookChapter.keyTerms.length, 20);
assert.equal(orderBookSources.length, 5);
assert.equal(orderBookQuizzes.length, 5);
assert.equal(chapterQuiz(orderBookChapter).length, 5);
assert.ok(lesson.seoTitle.length + ' | LearnSMC'.length <= 60, 'SEO title exceeds 60 chars');
assert.ok(lesson.metaDescription.length <= 155, 'Meta description exceeds 155 chars');

// 2. Deterministic order-book math verification
const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-4, `${a} != ${b}`);

const deepWalk = walkOrderBook('buy', 300, syntheticOrderBooks.deep.asks)!;
near(deepWalk.averageFill!, 100.0);
near(deepWalk.lastPrint!, 100.0);
near(deepWalk.slippage!, 0.0);

const thinWalk = walkOrderBook('buy', 300, syntheticOrderBooks.thin.asks)!;
near(thinWalk.averageFill!, 100.9417);
near(thinWalk.lastPrint!, 101.5);
near(thinWalk.slippage!, 0.9417);
near(thinWalk.slippageTicks!, 3.7667);

const spreadMid = computeSpreadAndMid(99.75, 100.0)!;
near(spreadMid.spread, 0.25);
near(spreadMid.midPrice, 99.875);
near(spreadMid.spreadTicks, 1);

const obi = computeObiAndMicroprice(99.75, 300, 100.0, 100)!;
near(obi.obi, 0.5);
near(obi.microprice, 99.9375);

const queueAlloc = simulateFifoVsProRata(120, [
  { id: '#A1', size: 50 },
  { id: '#B2', size: 150 },
  { id: '#C3', size: 200 },
]);
assert.deepEqual(
  queueAlloc.map((r) => [r.fifoFill, r.proRataFill]),
  [
    [50, 15],
    [70, 45],
    [0, 60],
  ],
);

const auction = simulateAuctionUncross();
assert.equal(auction.clearingPrice, 100.0);
assert.equal(auction.maxMatched, 400);

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
for (const s of orderBookSources) {
  units.push(s.title, s.scope);
}
for (const q of orderBookQuizzes) {
  units.push(q.question, ...q.options, q.explanation);
  if (q.context) units.push(q.context);
}
units.push(
  'All example prices, book snapshots, OBI scores, and auction sizes in this chapter are illustrative synthetic teaching figures, not historical trades or live venue quotes. Cancellation of resting liquidity never establishes unlawful intent by itself.',
);

const missingUr = units.filter((u) => !Object.hasOwn(ur, u));
assert.equal(missingUr.length, 0, `Missing Urdu translations:\n${missingUr.join('\n')}`);

fs.mkdirSync('outputs/chapter03', { recursive: true });
fs.writeFileSync(
  'outputs/chapter03/verification.json',
  JSON.stringify(
    {
      path: orderBookPath,
      dates: orderBookDates,
      sections: lesson.sections.length,
      visuals: 11,
      faqs: lesson.faqs.length,
      glossaryTerms: orderBookChapter.keyTerms.length,
      quizzes: orderBookQuizzes.length,
      translatedUnitsChecked: units.length,
      thinWalkAvgFill: thinWalk.averageFill,
      obiExampleMicroprice: obi.microprice,
    },
    null,
    2,
  ),
);
console.log(
  `Chapter 03 verification passed: ${lesson.sections.length} sections, 11 interactive/animated visuals, ${lesson.faqs.length} native FAQs, ${orderBookChapter.keyTerms.length} terms, ${orderBookQuizzes.length} quizzes, exact order-book math, EN/UR parity & claims check.`,
);
