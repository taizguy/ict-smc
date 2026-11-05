export type CaseFamily='remaining'|'silver'|'breaker'|'guided';
const modules=typeof window==='undefined'?{}:import.meta.glob<{default:unknown}>('./runtime/practice-cases/*/*.json');
const cache=new Map<string,Promise<unknown>>();
export function loadPracticeCase<T>(family:CaseFamily,id:string):Promise<T>{const key='./runtime/practice-cases/'+family+'/'+id+'.json';if(!cache.has(key)){const load=modules[key];if(!load)return Promise.reject(Error('Unknown practice case '+family+'/'+id));cache.set(key,load().then(m=>m.default).catch(e=>{cache.delete(key);throw e;}));}return cache.get(key)! as Promise<T>;}
