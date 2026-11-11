import type {ReactNode} from 'react';
/** Native exclusive disclosure: usable before, after, or without JavaScript. */
export function LessonFaq({id,group,question,children,className}:{id:string;group:string;question:string;children:ReactNode;className:string}){
 return <details className={`${className} lesson-faq`} name={group} id={id}><summary><h3>{question}<span className="lesson-faq-icon" aria-hidden="true">+</span></h3></summary><div className="lesson-faq-answer">{children}</div></details>;
}
