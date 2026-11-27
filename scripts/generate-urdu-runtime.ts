import {silverLessonTranslations} from '../src/data/chapters/silverLessonTranslations';
import {breakTranslations} from '../src/data/chapters/breakTranslations';
import {structureTranslations} from '../src/data/chapters/structureTranslations';
import {swingTranslations} from '../src/data/chapters/swingTranslations';
import {liquidityTranslations} from '../src/data/chapters/liquidityTranslations';
import {orderBookTranslations} from '../src/data/chapters/orderBookTranslations';
import {marketMakerTranslations} from '../src/data/chapters/marketMakerTranslations';
import {model2022Translations} from '../src/data/chapters/model2022Translations';
import {oteTranslations} from '../src/data/chapters/oteTranslations';
import {rdrbTranslations} from '../src/data/chapters/rdrbTranslations';
import {pdArrayTranslations} from '../src/data/chapters/pdArrayTranslations';
import {suspensionReaperTranslations} from '../src/data/chapters/suspensionReaperTranslations';
import {mitigationTranslations} from '../src/data/chapters/mitigationTranslations';
import {fvgDocumentTranslations} from '../src/data/chapters/fvgDocumentTranslations';
import {priceMovementTranslations} from '../src/data/chapters/priceMovementTranslations';
import {phase1Entries,curriculumPhase1Urdu} from '../src/data/curriculumPhase1';
import {legacyPracticeUrdu} from '../src/data/legacyPracticeMetadata';
import practiceLoopUrdu from '../src/i18n/practice-loop-urdu.json';
import retiredPracticeStrings from '../src/i18n/retired-practice-strings.json';
import {practiceContentTranslations} from '../src/data/practiceLoopContent';
import masterclassWeeklyReviewUrdu from '../src/i18n/masterclass-weekly-review-urdu.json';
import {masterclassCategoryTranslations} from '../src/data/masterclassCategoryPages';
import masterclassJournalUrdu from '../src/i18n/masterclass-journal-urdu.json';
import {journalEditions} from '../src/data/masterclassJournal';
import {masterclassStageArt} from '../src/data/masterclassStageArt';
import searchDescriptions from '../src/data/searchDescriptions.json';
import audit4Priority from '../src/data/audit4Descriptions.json';
import audit4Numbered from '../src/data/audit4NumberedDescriptions.json';
import audit4Lectures from '../src/data/audit4LectureDescriptions.json';
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
import { activeCurriculumChapters, originalTextbookChapters, textbookChapters } from '../src/data/chaptersData';
import { splitUrduLessons } from './split-urdu-lessons';

// Keep the complete editorial catalog for HTML generation, but send visitors only
// interface/search labels and the long copy belonging to their current section.
type Group = 'shared' | 'chapters' | 'masood' | 'articles' | 'tools' | 'tools-masterclass' | 'tools-glossary' | 'tools-chartlab' | 'publisher';
const groups: Group[] = ['shared', 'chapters', 'masood', 'articles', 'tools', 'tools-masterclass', 'tools-glossary', 'tools-chartlab', 'publisher'];
const toolSubGroups: Group[] = ['tools-masterclass', 'tools-glossary', 'tools-chartlab'];
const keys = Object.fromEntries(groups.map(group => [group, new Set<string>()])) as Record<Group, Set<string>>;
const searchKeys = new Set<string>();
const chapterUiKeys = new Set<string>();
const normalize = (text: string) => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&rarr;/g, '→').replace(/&larr;/g, '←').replace(/\s+/g, ' ').trim();
const SINGLE_CHAPTER_COMPONENT_RE = /src\/(?:components|utils)\/(?:SilverLesson(?:Content|Visual|Scene|Atlas)|silverSceneRenderer|Break(?:DocumentContent|Visual)|Structure(?:DocumentContent|Visual)|Swing(?:DocumentContent|Visual)|Liquidity(?:DocumentContent|Visual)|OrderBook(?:Content|Visual)|MarketMaker(?:Content|Visual)|Model2022(?:Content|Visual)|Ote(?:Content|Visual|Scene)|oteSceneRenderer|Rdrb(?:Content|Visual|Scene)|rdrbSceneRenderer|PdArray(?:Content|Visual|Scene)|pdArraySceneRenderer|SuspensionReaper(?:Content|Visual|Scene)|suspensionReaperSceneRenderer|Mitigation(?:DocumentContent|Visual)|PriceMovement(?:Content|Visual)|Fvg(?:DocumentContent|Blueprint|LessonDiagram|StoryDiagram|Story))\.[jt]sx?$/;
function toolsGroupForPath(pathname: string): Group {
  if (pathname.startsWith('/tools/masterclass/')) return 'tools-masterclass';
  if (pathname.startsWith('/tools/glossary/') || pathname.startsWith('/tools/concepts/') || pathname.startsWith('/tools/compare/')) return 'tools-glossary';
  if (pathname.startsWith('/tools/chartlab/')) return 'tools-chartlab';
  return 'tools';
}
function groupFor(file: string): Group {
  if (/RouteStud(?:y|ies)/.test(file)) return 'tools-chartlab';
  if (/articles/i.test(file)) return 'articles';
  if (SINGLE_CHAPTER_COMPONENT_RE.test(file)) return 'chapters';
  if (/data\/chapters|DeliveryLesson|Mentorship2025|Mentorship2026|Chapters|ChapterRoom|ChapterQuiz|Curriculum|TopicLearningGuide|MergedCurriculumFeatures|MentorshipLessonNav|ReadingRoomLayout|LessonExtract|LessonFaq|LessonRelatedLinks|curriculumReview|curriculumPhase1|curriculumHubContent|curriculumHubPractice|curriculumQuizzes|cornerstoneGuides|CornerstoneGuide|fvgLesson|fvgStory|chapterStories|ChapterStory|topicClusters|topicJourneys|topicGlossary|SearchFocusGuide|mentorshipRecordings|mentorshipReviewSources|mentorshipTracks|MentorshipsView|ChapterDiagram|InteractiveDiagram|OctantJournalFigure|Model2022JournalFigure|ict2022Sources|lessonBreadcrumbs/.test(file)) return 'chapters';
  if (/masood/i.test(file)) return 'masood';
  if (/Legal|publisherPageCopy/.test(file)) return 'publisher';
  if (/data\/masterclass|Masterclass/.test(file)) return 'tools-masterclass';
  if (/data\/(?:glossaryReview|concepts|comparisons)|(?:GlossaryCatalogue|GlossaryReference|ConceptExplorer|CompareView)|utils\/glossary/.test(file)) return 'tools-glossary';
  if (/data\/(?:chartScenarios|chartLab|silverBulletStudy|silverBulletSchema|breakerStudy|breakerSchema|breakerCaseSource|routeStudyLabels)|(?:StudyReadingNotes|GuidedMarketDesk|MarketWorkspace|MarketChart|ChartLab|SilverBulletStudy|BreakerStudy|RouteChartStudy|ChartStudyLinks|StudyEvidenceChart|chartHubArtwork)/.test(file)) return 'tools-chartlab';
  if (/data\/(?:deliverySuiteReading|workbenchCatalog|learningCases|labGuides|quizzes|theinnercircletraders|practiceLoopContent|practiceCases|practiceCaseCatalog|learningCaseSource)|(?:DeliveryReferenceNotes|MasteryDashboard|InstitutionalTools|KnowledgeGraph|BacktestLab|TradeSimulator|TradingJournal|TradingTools|PracticeLoop|PracticeReading|CaseStudyResource|ReadingChart|loadPracticeCase)/.test(file)) return 'tools';
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
    if (/data\/chapters\/(?:checkpoints|deliveryEdition|deliveryQuizzes|deliveryFigures|mentorship2025Edition|mentorship2025Support|mentorship2025Quizzes|mentorship2025Sources|mentorship2025Replays|mentorship2026Edition|mentorship2026Support|mentorship2026Quizzes|mentorship2026Sources|mentorship2026Visuals)\.json$/.test(file)) {
      const collect = (value: unknown) => {
        if (typeof value === 'string') add(value, 'chapters');
        else if (Array.isArray(value)) value.forEach(collect);
        else if (value && typeof value === 'object') Object.values(value).forEach(collect);
      };
      collect(JSON.parse(fs.readFileSync(file, 'utf8')));
      continue;
    }
    if (!/\.tsx?$/.test(file) || /(?:AcademyWorldMap|TextbookReader|SheryiansHome|OpeningScreen)\.tsx$/.test(file)) continue;
    if (/src\/data\/(?:chapters\/.*Chapters|theinnercircletradersChapters|glossaryReview)\.ts$/.test(file)) continue;
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const group = groupFor(file);
    function visit(node: ts.Node) {
      if (ts.isJsxText(node) || ts.isStringLiteralLike(node)) {
        add(node.text, group);
        if((file.startsWith('src/components/') && !SINGLE_CHAPTER_COMPONENT_RE.test(file) && (group === 'chapters' || group === 'shared')) || file === 'src/data/curriculumReview.ts' || file === 'src/data/chapters/diagrams.ts') {
          for(const candidate of [node.text,...lessonParagraphs(node.text)]) chapterUiKeys.add(normalize(candidate));
        }
        const parent = ts.isArrayLiteralExpression(node.parent) ? node.parent.parent : node.parent;
        const propName = ts.isPropertyAssignment(parent) ? parent.name.getText(source).replace(/^['"]|['"]$/g, '') : '';
        const isCatalogDataFile =
          (/src\/data\/conceptsData\.ts$/.test(file) && (propName === 'name' || propName === 'shortDefinition' || propName === 'category')) ||
          (/src\/data\/(?:articles|catalog\.generated)\.ts$/.test(file) && (propName === 'title' || propName === 'description' || propName === 'topic'));
        if (isCatalogDataFile && ts.isStringLiteralLike(node)) searchKeys.add(normalize(node.text));
      }
      else if (ts.isTemplateExpression(node)) {
        const tmpl = node.head.text + node.templateSpans.map((span, index) => `{${index}}${span.literal.text}`).join('');
        add(tmpl, group);
        if ((file.startsWith('src/components/') && !SINGLE_CHAPTER_COMPONENT_RE.test(file) && (group === 'chapters' || group === 'shared')) || file === 'src/data/curriculumReview.ts' || file === 'src/data/chapters/diagrams.ts') {
          chapterUiKeys.add(normalize(tmpl));
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
walk('src');
const collectReviewedChapter = (value: unknown) => {
  if (typeof value === 'string') add(value, 'chapters');
  else if (Array.isArray(value)) value.forEach(collectReviewedChapter);
  else if (value && typeof value === 'object') Object.values(value).forEach(collectReviewedChapter);
};
collectReviewedChapter(originalTextbookChapters);
collectReviewedChapter(textbookChapters);
for (const ch of activeCurriculumChapters) {
  for (const field of [ch.title, ...ch.summary, ...ch.keyTerms.map(kt => kt.term)]) {
    const key = normalize(field);
    if (urdu[key]) searchKeys.add(key);
  }
}
for (const ch of [...originalTextbookChapters, ...textbookChapters]) {
  const key = normalize(ch.title);
  if (urdu[key]) searchKeys.add(key);
}
for (const [pathname,pair] of Object.entries({...audit4Priority,...audit4Numbered,...audit4Lectures})) {
  add(pair.en,pathname.startsWith('/masood/')?'masood':pathname.startsWith('/tools/')?toolsGroupForPath(pathname):'chapters');
}
// These derived descriptions must resolve identically in static and client metadata.
for (const path of ['/tools/masterclass/pd-arrays/rejection-block/', '/tools/masterclass/pd-arrays/hangman-pd-array/'] as const) add(searchDescriptions[path].en, 'tools-masterclass');
for(const key of Object.keys(masterclassJournalUrdu)) add(key,'tools-masterclass');
for(const key of Object.keys(masterclassCategoryTranslations)) add(key,'tools-masterclass');
for(const key of [...Object.keys(practiceContentTranslations),...Object.keys(practiceLoopUrdu),...Object.keys(legacyPracticeUrdu)]) add(key,'tools');
for(const key of Object.keys(masterclassWeeklyReviewUrdu)) add(key,'tools-masterclass');
// Source records are shared with curriculum data; their strings are also needed
// by the Masterclass view. SVG text lives inside markup, beyond the TS literal scan.
const collectMasterclassSource=(value:unknown):void=>{
  if(typeof value==='string') add(value,'tools-masterclass');
  else if(Array.isArray(value)) value.forEach(collectMasterclassSource);
  else if(value&&typeof value==='object') Object.values(value).forEach(collectMasterclassSource);
};
for(const edition of Object.values(journalEditions)) collectMasterclassSource(edition.sources);
for(const svg of Object.values(masterclassStageArt)) for(const match of svg.matchAll(/<(?:text|title|desc)\b[^>]*>([^<]*)<\/(?:text|title|desc)>/g)) add(match[1].replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>'),'tools-masterclass');
// Directory descriptions and search titles are data-driven, not TS string literals.
for(const row of phase1Entries)for(const key of [...row.title,...row.description])if(urdu[key])keys.shared.add(key);
for(const key of Object.keys(curriculumPhase1Urdu))if(/^(Free ICT &|Learn ICT and Smart|The roadmap derives)/.test(key))keys.shared.add(key);
for(const key of [...Object.keys(silverLessonTranslations),...Object.keys(priceMovementTranslations),...Object.keys(fvgDocumentTranslations),...Object.keys(mitigationTranslations),...Object.keys(liquidityTranslations),...Object.keys(orderBookTranslations),...Object.keys(marketMakerTranslations),...Object.keys(model2022Translations),...Object.keys(oteTranslations),...Object.keys(rdrbTranslations),...Object.keys(pdArrayTranslations),...Object.keys(suspensionReaperTranslations),...Object.keys(swingTranslations),...Object.keys(structureTranslations),...Object.keys(breakTranslations)])add(key,'chapters');
// Handwritten overrides also include derived labels assembled at runtime.
const sourceKeysBeforeOverrides = new Set(groups.flatMap(group => [...keys[group]]));
for (const key of Object.keys({ ...editorialUrdu, ...toolsUrdu, ...terminology, ...learningUpdate })) if (!sourceKeysBeforeOverrides.has(key)&&!retiredPracticeStrings.includes(key)) keys.shared.add(key);
for (const key of Object.keys(mentorship2026Urdu)) if (!sourceKeysBeforeOverrides.has(key) && (/^Chapter \d+:|\| LearnSMC$/.test(key) || key.includes('66-'))) keys.shared.add(key);
// Promote keys used across multiple major sections (or global search) into shared,
// and keys shared across 2+ tool sub-sections into the shared tools catalog.
const allSourceKeys = new Set(groups.flatMap(group => [...keys[group]]));
const allToolsUnion = new Set([...keys.tools, ...toolSubGroups.flatMap(g => [...keys[g]])]);
const majorSections: ReadonlySet<string>[] = [keys.shared, keys.chapters, keys.masood, keys.articles, allToolsUnion, keys.publisher];
for (const key of allSourceKeys) {
  let sectionHits = 0;
  for (const sec of majorSections) if (sec.has(key)) sectionHits++;
  if ((key.length <= 35 && sectionHits >= 2) || searchKeys.has(key)) keys.shared.add(key);
}
for (const key of allToolsUnion) {
  if (keys.shared.has(key)) continue;
  let toolHits = 0;
  for (const tg of ['tools', ...toolSubGroups] as const) if (keys[tg].has(key)) toolHits++;
  if (toolHits >= 2) keys.tools.add(key);
}
const output = 'src/i18n/runtime';
fs.mkdirSync(output, { recursive: true });
for (const group of groups) {
  const isToolSub = toolSubGroups.includes(group);
  const catalog = Object.fromEntries(
    [...keys[group]]
      .filter(key => (group === 'shared' || !keys.shared.has(key)) && (!isToolSub || !keys.tools.has(key)))
      .sort()
      .map(key => [key, urdu[key]]),
  );
  fs.writeFileSync(path.join(output, `${group}.json`), JSON.stringify(catalog) + '\n');
  console.log(`Urdu ${group}: ${Object.keys(catalog).length} entries / ${Math.round(Buffer.byteLength(JSON.stringify(catalog)) / 1024)} KB`);
}
splitUrduLessons(output,chapterUiKeys);
