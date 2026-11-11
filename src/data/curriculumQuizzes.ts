import type {TextbookChapter} from '../types';
import {originalTextbookChapters} from './chaptersData';
import {chapterQuiz} from './chapters/chapterQuizzes';
const ipda=(q:ReturnType<typeof chapterQuiz>[number])=>/IPDA|lookback/i.test(q.context||q.question);
/** Preserve source question IDs/answers; relocate only the 20-day IPDA vocabulary exercise. */
export function curriculumQuiz(chapter:TextbookChapter){const source=originalTextbookChapters.find(c=>c.id===chapter.id)||chapter;const questions=chapterQuiz(source);if(chapter.id===28)return questions.filter(q=>!ipda(q));if(chapter.id===41)return [...questions,...chapterQuiz(originalTextbookChapters.find(c=>c.id===28)!).filter(ipda)];return questions;}
