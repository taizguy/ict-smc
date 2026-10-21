import assert from 'node:assert/strict';
import fs from 'node:fs';
import { textbookChapters } from '../src/data/chaptersData';
import { chapterDiagrams } from '../src/data/chapters/diagrams';
import { chapterQuiz, chapterCheckpoints } from '../src/data/chapters/chapterQuizzes';
import { curriculumReview } from '../src/data/curriculumReview';

const ids = textbookChapters.map(c => c.id);
assert.equal(ids.length, 53);
assert.equal(new Set(ids).size, ids.length);
assert.equal(new Set(textbookChapters.map(c => c.slug)).size, ids.length);
assert.deepEqual(Object.keys(chapterDiagrams).map(Number).sort((a,b) => a-b), ids);
assert.deepEqual(Object.keys(chapterCheckpoints).map(Number).sort((a,b) => a-b), ids);
const questionIds = new Set<string>();
const rows = textbookChapters.map(chapter => {
  assert(chapter.sections.length >= 2 && chapter.keyTerms.length >= 2 && chapter.summary.length >= 2);
  assert(chapter.sections.every(s => s.id && s.title.trim() && s.content.trim()));
  assert(chapter.keyTerms.every(t => t.term.trim() && t.definition.trim()));
  assert.equal(new Set(chapter.sections.map(s => s.id)).size, chapter.sections.length);
  const diagram = chapterDiagrams[chapter.id];
  assert.equal(diagram.steps.length, 3);
  assert(diagram.title.trim() && diagram.steps.every(s => s.trim()));
  for (const mark of diagram.marks) {
    assert([0, 1, 2].includes(mark.stage));
    for (const [key, value] of Object.entries(mark)) if (typeof value === 'number') assert(Number.isFinite(value), `${chapter.id}: ${key}`);
    if (mark.kind === 'candle') {
      assert(mark.high! <= Math.min(mark.open!, mark.close!), `Chapter ${chapter.id}: invalid high`);
      assert(mark.low! >= Math.max(mark.open!, mark.close!), `Chapter ${chapter.id}: invalid low`);
    }
    if (mark.kind === 'zone') assert(mark.w! > 0 && mark.h! > 0);
  }
  const quiz = chapterQuiz(chapter);
  assert.equal(quiz.length, 3);
  for (const q of quiz) {
    assert(!questionIds.has(q.id)); questionIds.add(q.id);
    assert(q.options.length >= 2 && q.options.length <= 4);
    assert.equal(new Set(q.options).size, q.options.length);
    assert(q.correctIndex >= 0 && q.correctIndex < q.options.length);
    assert(q.question.trim() && q.explanation.trim());
  }
  assert(curriculumReview(chapter).interpretation);
  return { id: chapter.id, slug: chapter.slug, sections: chapter.sections.length, terms: chapter.keyTerms.length, summary: chapter.summary.length, diagram: diagram.title, quiz: quiz.length };
});

// Geometry checks for the distinctions most likely to be confused by a generic diagram.
const fvg = chapterDiagrams[13].marks.filter(m => m.kind === 'candle');
assert(fvg[2].low! < fvg[0].high!); // SVG y decreases as price rises.
const suspension = chapterDiagrams[55].marks.filter(m => m.kind === 'candle');
assert(suspension[1].open! < suspension[0].close!); // Separated bullish bodies.
assert(suspension[1].low! >= suspension[0].high!); // Wicks overlap.
assert.equal(chapterDiagrams[15].marks.filter(m => m.kind === 'candle' && m.stage === 0).length, 2);
assert.deepEqual(chapterDiagrams[16].marks.filter(m => m.kind === 'label').map(m => m.text), ['H','L','HH','LL','Retest?']);
if (fs.existsSync('dist/seo-manifest.json')) {
  const manifest = JSON.parse(fs.readFileSync('dist/seo-manifest.json', 'utf8')) as { path: string; indexable: boolean; outputPath: string }[];
  for (const chapter of textbookChapters) for (const language of ['', '/ur']) {
    const path = `${language}/learn/${chapter.slug}/`;
    const page = manifest.find(p => p.path === path);
    assert(page?.indexable, `Missing indexable chapter: ${path}`);
    const html = fs.readFileSync(`dist/${page.outputPath}`, 'utf8');
    assert(html.includes(`data-chapter-diagram="${chapter.id}"`), `Wrong diagram: ${path}`);
    assert(html.includes(`data-chapter-quiz="${chapter.id}"`), `Missing static quiz: ${path}`);
    assert(html.includes(`https://learnsmc.xyz${path}`), `Missing canonical reference: ${path}`);
  }
}
fs.mkdirSync('outputs/chapter-review', { recursive: true });
fs.writeFileSync('outputs/chapter-review/verified.json', JSON.stringify({ chapters: rows.length, questions: questionIds.size, rows }, null, 2));
console.log(`Verified ${rows.length} chapter records, ${rows.length} explicit diagrams and ${questionIds.size} chapter-specific quiz questions.`);
