/** Rebuilt document lessons use article-first source order and native HTML. */
export const documentLessonIds:readonly number[]=[1,4,7,9,10,13,1010,1031];
export const isDocumentLesson=(id:number|undefined)=>id!==undefined&&documentLessonIds.includes(id);
