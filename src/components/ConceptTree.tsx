import React, { useMemo, useState } from 'react';
import { CONCEPT_SLUG_MAP, DEEP_SUB_CONCEPTS, GLOSSARY_CATEGORIES, getGlossaryConceptPath, getGlossarySubConceptPath } from '../utils/glossaryRoutes';
import { useTranslation } from '../i18n/TranslationProvider';

const branches: Record<string, [string, string, string]> = {
 foundations: ['Market foundations', 'Start with how orders and markets work.', 'مارکیٹ کی بنیادیں'],
 structure: ['Market structure', 'Describe swings before interpreting a change.', 'مارکیٹ اسٹرکچر'],
 liquidity: ['Liquidity', 'Separate reference levels from observed orders.', 'لیکویڈیٹی'],
 imbalances: ['Imbalances & gaps', 'Study price-range relationships and their limits.', 'عدم توازن اور گیپس'],
 order_blocks: ['Order blocks', 'Explore block families and their distinctions.', 'آرڈر بلاکس'],
 time_sessions: ['Time & sessions', 'Place observations in their session context.', 'وقت اور سیشنز'],
 models: ['Models & execution', 'Combine defined conditions; retain invalidation and risk.', 'ماڈلز اور ایگزیکیوشن'],
};
const connections = [
 ['displacement_engine', 'fair_value_gap', 'Study a directional move alongside the completed three-candle gap; neither guarantees a reversal.'],
 ['buy_side_liquidity', 'market_structure_bos_mss_choch', 'A reference-level sweep and a structure change are different observations. Define each separately.'],
 ['order_block', 'fair_value_gap', 'These are different reference zones. Their overlap alone does not establish an executable trade.'],
];

export function ConceptTree() {
 const { locale, href } = useTranslation(); const ur = locale === 'ur';
 const [query, setQuery] = useState(''); const [open, setOpen] = useState<string[]>(['foundations']);
 const [selected, setSelected] = useState('');
 const concepts = Object.values(CONCEPT_SLUG_MAP);
 const matching = useMemo(() => concepts.filter(c => `${c.name} ${c.shortName}`.toLowerCase().includes(query.trim().toLowerCase())), [query]);
 const active = CONCEPT_SLUG_MAP[selected];
 return <section className="concept-tree" aria-label={ur ? 'تصورات کا شجرہ' : 'Smart money concept tree'}>
  <header className="ct-intro"><div><span className="ct-eyebrow">{ur ? 'بڑی تصویر' : 'THE BIG PICTURE'}</span><h2>{ur ? 'دیکھیں Smart Money Concepts کیسے جڑتے ہیں' : <>See how <em>smart money concepts</em> fit together.</>}</h2><p>{ur ? 'شاخ کھولیں، تعلق سمجھیں، پھر متعلقہ سبق پڑھیں۔ یہ مطالعے کی ترتیب ہے، ٹریڈ کا سگنل نہیں۔' : 'Open a branch. Follow a connection. Find your next lesson. This is a learning structure—not a sequence the market must follow.'}</p></div><div className="ct-sculpture" aria-hidden="true"><span>ICT</span><i>SMC</i><b>↗</b></div></header>
  <div className="ct-toolbar"><label>{ur ? 'تصور تلاش کریں' : 'Find a concept'}<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="FVG, liquidity, order blocks…" /></label><button type="button" onClick={()=>setOpen(Object.keys(branches))}>{ur ? 'تمام شاخیں کھولیں' : 'Expand all'}</button><button type="button" onClick={()=>{setOpen([]);setQuery('');setSelected('');}}>{ur ? 'دوبارہ شروع' : 'Reset map'}</button></div>
  <div className="ct-root"><span aria-hidden="true">◈</span><strong>ICT / Smart Money Concepts</strong><small>{ur ? 'شاخیں موضوعات کو گروپ کرتی ہیں' : 'Branches group topics · Lines show membership'}</small></div>
  <div className="ct-branches">{Object.entries(branches).map(([id, [name, description, nameUr]], index)=>{
   const category = GLOSSARY_CATEGORIES.find(c=>c.id===id); const items=matching.filter(c=>c.category===id || c.categorySlug===category?.slug);
   const expanded = !!query.trim() || open.includes(id);
   if(query.trim()&&!items.length)return null;
   return <section className={`ct-branch ct-tone-${index%4}`} key={id}><button className="ct-branch-toggle" type="button" aria-expanded={expanded} aria-controls={`ct-${id}`} onClick={()=>setOpen(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id])}><span className="ct-number">{String(index+1).padStart(2,'0')}</span><span><strong>{ur?nameUr:name}</strong><small>{ur ? `${items.length} concepts` : description}</small></span><span className="ct-plus" aria-hidden="true">{expanded?'−':'+'}</span></button><div className="ct-reveal" data-open={expanded}><div id={`ct-${id}`} inert={!expanded}><ul className="ct-leaves">{items.map(c=><li key={c.id}><button type="button" aria-pressed={selected===c.id} onClick={()=>setSelected(c.id)}>{c.shortName || c.name}<span aria-hidden="true">↗</span></button><a href={href(getGlossaryConceptPath(c.slug,c.categorySlug))}>{ur?'پڑھیں':'Read'} <span className="sr-only">{c.name}</span></a>{DEEP_SUB_CONCEPTS.some(d=>d.parentConceptId===c.id)&&<ul>{DEEP_SUB_CONCEPTS.filter(d=>d.parentConceptId===c.id).map(d=><li key={d.id}><a href={href(getGlossarySubConceptPath(d.categorySlug,d.slug))}>{d.name}</a></li>)}</ul>}</li>)}</ul></div></div></section>;
  })}</div>
  {matching.length===0&&<p role="status">{ur?'کوئی تصور نہیں ملا۔ دوسرا English trading term آزمائیں۔':'No matching concepts. Try another term or abbreviation.'}</p>}
  <aside className="ct-connections" aria-live="polite"><span className="ct-eyebrow">{ur?'شاخوں کے درمیان تعلق':'ACROSS THE BRANCHES'}</span><h3>{active ? active.name : ur?'ایک تصور منتخب کریں':'Select a concept to follow its connections'}</h3>{!active&&<p>{ur?'تصور کے نام پر کلک کریں۔ Read سے پوری وضاحت کھلے گی۔':'Click a concept name above. “Read” opens its full explanation. Cross-connections below describe relationships, not proof of causation.'}</p>}{active&&<><a href={href(getGlossaryConceptPath(active.slug,active.categorySlug))}>{ur?'مکمل وضاحت پڑھیں':'Read the full explanation'} →</a>{connections.filter(c=>c[0]===selected||c[1]===selected).map(([a,b,note])=>{const other=CONCEPT_SLUG_MAP[a===selected?b:a];return other&&<div className="ct-connection" key={a+b}><strong>{active.shortName} ↔ {other.shortName}</strong><p>{ur?'یہ متعلقہ تصورات ہیں، ایک دوسرے کا ثبوت نہیں۔ دونوں کی شرائط الگ پڑھیں۔':note}</p><a href={href(getGlossaryConceptPath(other.slug,other.categorySlug))}>{other.name} →</a></div>;})}{!connections.some(c=>c[0]===selected||c[1]===selected)&&<p>{ur?'یہ تصور اپنی موضوعاتی شاخ میں ہے۔ تفصیلی شرائط متعلقہ وضاحت میں پڑھیں۔':'This concept belongs to the topic branch above. Open its explanation for the defining conditions and limitations.'}</p>}</>}</aside>
 </section>;
}
