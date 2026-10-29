import searchDescriptions from '../src/data/searchDescriptions.json';
import mentorship2026Urdu from '../src/i18n/mentorship2026-urdu.json';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { urdu } from '../src/i18n/urdu';
import { lessonParagraphs } from '../src/utils/lessonText';
import { editorialUrdu } from '../src/i18n/editorial-urdu';
import { toolsUrdu } from '../src/i18n/tools-urdu';
import { terminology } from '../src/i18n/terminology';
import learningUpdate from '../src/i18n/learning-update-urdu.json';

// Keep the complete editorial catalog for HTML generation, but send visitors only
// interface/search labels and the long copy belonging to their current section.
type Group = 'shared' | 'chapters' | 'masood' | 'articles' | 'tools' | 'publisher';
const groups: Group[] = ['shared', 'chapters', 'masood', 'articles', 'tools', 'publisher'];
const keys = Object.fromEntries(groups.map(group => [group, new Set<string>()])) as Record<Group, Set<string>>;
const searchKeys = new Set<string>();
const searchableFields = new Set(['title', 'name', 'subtitle', 'shortTitle', 'excerpt', 'description', 'shortDefinition', 'summary', 'quote', 'term', 'categoryLabel']);
const normalize = (text: string) => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&rarr;/g, '→').replace(/&larr;/g, '←').replace(/\s+/g, ' ').trim();
function groupFor(file: string): Group {
  if (/RouteStud(?:y|ies)/.test(file)) return 'tools';
  if (/articles/.test(file)) return 'articles';
  if (/data\/chapters|DeliveryLesson|Mentorship2025|Mentorship2026|Chapters|ChapterRoom|cornerstoneGuides|CornerstoneGuide|fvgLesson|FvgLessonDiagram|fvgStory|FvgStory|chapterStories|ChapterStory/.test(file)) return 'chapters';
  if (/masood/i.test(file)) return 'masood';
  if (/Legal|publisherPageCopy/.test(file)) return 'publisher';
  if (/data\/(?:deliverySuiteReading|workbenchCatalog|learningCases|labGuides|concepts|masterclass|comparisons|quizzes|chartScenarios|theinnercircletraders)|(?:StudyReadingNotes|DeliveryReferenceNotes|GuidedMarketDesk|MarketWorkspace|MarketChart|ChartLab|CompareView|ConceptExplorer|Masterclass|MasteryDashboard|InstitutionalTools|KnowledgeGraph|BacktestLab|TradeSimulator|TradingJournal|TradingTools)/.test(file)) return 'tools';
  return 'shared';
}
function add(text: string, group: Group) {
  for (const value of [text, ...lessonParagraphs(text), text.replace(/^\d+\.\s+/, ''), text.replace(/^Part\s+[IVXLCDM]+\s*-\s*/, ''), text.replace(/^(?:Chapter|LEC)\s*\d+\s*:\s*/i, '')]) {
    const key = normalize(value);
    if (urdu[key]) keys[group].add(key);
  }
}
function walk(folder: string) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const file = path.join(folder, entry.name).replace(/\\/g, '/');
    if (entry.isDirectory()) { if (entry.name !== 'i18n') walk(file); continue; }
    if (/data\/chapters\/(?:contentReview|checkpoints|deliveryEdition|deliveryQuizzes|deliveryFigures|mentorship2025Edition|mentorship2025Support|mentorship2025Quizzes|mentorship2025Sources|mentorship2025Replays|mentorship2026Edition|mentorship2026Support|mentorship2026Quizzes|mentorship2026Sources|mentorship2026Visuals)\.json$/.test(file)) {
      const collect = (value: unknown) => {
        if (typeof value === 'string') add(value, 'chapters');
        else if (Array.isArray(value)) value.forEach(collect);
        else if (value && typeof value === 'object') Object.values(value).forEach(collect);
      };
      collect(JSON.parse(fs.readFileSync(file, 'utf8')));
      continue;
    }
    if (!/\.tsx?$/.test(file) || /(?:AcademyWorldMap|TextbookReader|SheryiansHome|OpeningScreen)\.tsx$/.test(file)) continue;
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const group = groupFor(file);
    function visit(node: ts.Node) {
      if (ts.isJsxText(node) || ts.isStringLiteralLike(node)) {
        add(node.text, group);
        const parent = ts.isArrayLiteralExpression(node.parent) ? node.parent.parent : node.parent;
        if (ts.isStringLiteralLike(node) && ts.isPropertyAssignment(parent) && searchableFields.has(parent.name.getText(source).replace(/^['"]|['"]$/g, ''))) searchKeys.add(normalize(node.text));
      }
      else if (ts.isTemplateExpression(node)) add(node.head.text + node.templateSpans.map((span, index) => `{${index}}${span.literal.text}`).join(''), group);
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
walk('src');
// These derived descriptions must resolve identically in static and client metadata.
for (const path of ['/tools/masterclass/pd-arrays/rejection-block/', '/tools/masterclass/pd-arrays/hangman-pd-array/'] as const) add(searchDescriptions[path].en, 'tools');
// Search spans the whole library; titles and result descriptions must be available everywhere.
const sourceKeys = new Set(groups.flatMap(group => [...keys[group]]));
for (const key of sourceKeys) if (key.length <= 35 || searchKeys.has(key)) keys.shared.add(key);
// Handwritten overrides also include derived labels assembled at runtime.
for (const key of Object.keys({ ...editorialUrdu, ...toolsUrdu, ...terminology, ...learningUpdate })) if (!sourceKeys.has(key)) keys.shared.add(key);
for (const key of Object.keys(mentorship2026Urdu)) if (!sourceKeys.has(key) && (/^Chapter \d+:|\| LearnSMC$/.test(key) || key.includes('66-'))) keys.shared.add(key);
const output = 'src/i18n/runtime';
fs.mkdirSync(output, { recursive: true });
for (const group of groups) {
  const catalog = Object.fromEntries([...keys[group]].filter(key => group === 'shared' || !keys.shared.has(key)).sort().map(key => [key, urdu[key]]));
  fs.writeFileSync(path.join(output, `${group}.json`), JSON.stringify(catalog) + '\n');
  console.log(`Urdu ${group}: ${Object.keys(catalog).length} entries / ${Math.round(Buffer.byteLength(JSON.stringify(catalog)) / 1024)} KB`);
}
