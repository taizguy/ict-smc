import redirects from '../data/curriculumRedirects.json';
/** Small route registry: safe for startup, edge routing and locale resolution. */
export const mergedChapterIds:Record<number,number>={51:61,65:25,58:50,44:21,43:33,32:28,31:30,35:30,52:62};
export const canonicalChapterId=(id:number)=>mergedChapterIds[id]||id;
export const curriculumRedirects:Record<string,string>=redirects;
export function curriculumTarget(path:string){return curriculumRedirects[path.endsWith('/')?path:path+'/'];}

export function curriculumHref(value:string){if(!value.startsWith('/')&&!value.startsWith('https://learnsmc.xyz/'))return value;const u=new URL(value,'https://learnsmc.xyz'),prefix=u.pathname.startsWith('/ur/')?'/ur':'',clean=u.pathname.replace(/^\/ur(?=\/)/,''),target=curriculumTarget(clean);if(!target)return value;const destination=new URL(target,u.origin);destination.search=u.search;if(u.hash){const section=u.hash.match(/^#rr-section-(\d+)$/);destination.hash=section&&destination.hash.startsWith('#merged-')?(section[1]==='0'?destination.hash:destination.hash+'-section-'+section[1]):u.hash;}return (value.startsWith('http')?u.origin:'')+prefix+destination.pathname+destination.search+destination.hash;}
