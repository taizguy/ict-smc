import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';

export function LearningFAQ({ items }: { items: string[][] }) {
 const { t, href } = useTranslation();
 const [active, setActive] = useState<number | null>(null);
 const id = useId();
 const reduced = useReducedMotion();
 return <section className="learning-faq"><h2>{t('Questions people ask first')}</h2><div className="faq-cluster">{items.map(([question, answer], i) => {
  const open = active === i;
  return <article className="faq-item" data-open={open} key={question}>
   <h3><button id={`${id}-q${i}`} aria-expanded={open} aria-controls={`${id}-a${i}`} onClick={() => setActive(open ? null : i)}>{t(question)}<ChevronDown size={18} aria-hidden="true"/></button></h3>
   <motion.div id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`} aria-hidden={!open} inert={!open} initial={false} animate={{height:open?'auto':0,opacity:open?1:0}} transition={{duration:reduced?0:.32,ease:[.16,1,.3,1]}} className="faq-answer"><div><p>{t(answer)}</p>{question==='Where should a beginner start?'&&<a href={href('/curriculum/')}>{t('Start learning')}<ArrowRight size={16}/></a>}</div></motion.div>
  </article>;
 })}</div></section>;
}
