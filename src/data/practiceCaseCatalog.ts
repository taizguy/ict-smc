import rows from './practiceCaseSummaries.generated.json';
import type {CaseFile,PracticeTool} from './practiceCases';
/** Build-derived chooser projection; no candles, plans or outcome evaluation. */
export type CaseSummary=Pick<CaseFile,'id'|'slug'|'title'|'instrument'|'session'|'timeframe'|'glossaryTermIds'|'curriculumChapterSlug'|'difficulty'|'estimatedMinutes'|'learningGoal'|'scope'|'toolStatus'>;
export const practiceCaseSummaries=rows as unknown as CaseSummary[];
export const spineCaseSummaries=practiceCaseSummaries.filter(c=>c.scope==='spine');
export const summariesForTool=(tool:PracticeTool)=>practiceCaseSummaries.filter(c=>c.toolStatus[tool].available);
