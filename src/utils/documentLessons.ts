/** Rebuilt document lessons use article-first source order and native HTML. */
export const documentLessonIds:readonly number[]=[1,3,4,7,9,10,11,13,15,16,18,33,36,45,53,55,56,59,60,1010,1011,1015,1016,1017,1018,1019,1023,1024,1031,1034,1064];
export const isDocumentLesson=(id:number|undefined)=>id!==undefined&&documentLessonIds.includes(id);
