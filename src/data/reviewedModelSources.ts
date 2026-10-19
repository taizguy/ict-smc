import { curriculumSources, type CurriculumSource } from './curriculumReview';
const aliases: Record<string, string> = {
  ict_reaper_ifvg: 'reaper', mc_22_reaper_ifvg: 'reaper', standard_ifvg_vs_reaper_ifvg: 'reaper',
  'ict-reaper-ifvg': 'reaper', 'reaper-ifvg': 'reaper', 'standard-ifvg-vs-reaper-ifvg': 'reaper',
  ict_suspension_block: 'suspension', mc_23_suspension_block: 'suspension', suspension_vs_propulsion_vs_ob: 'suspension',
  'suspension-block': 'suspension', 'suspension-vs-propulsion-vs-ob': 'suspension',
  ict_enigma_fvg: 'enigma', 'ict-enigma-fvg': 'enigma',
  ict_rdrb: 'rdrb', mc_24_rdrb_balanced_price_range: 'rdrb', bpr_vs_rdrb: 'rdrb',
  'redelivered-balanced-price-range': 'rdrb', 'rdrb-balanced-price-range': 'rdrb', 'bpr-vs-rdrb': 'rdrb',
  ict_venom_model: 'venom', mc_21_venom_model: 'venom', 'ict-venom-model': 'venom', 'venom-model': 'venom',
  ict_sick_sister_strategy: 'sick', mc_26_sick_sister_strategy: 'sick', 'sick-sister-strategy': 'sick',
  silver_bullet_vs_3am_london: 'silver', 'silver-bullet-vs-3am-london': 'silver',
};
const groups: Record<string, CurriculumSource[]> = {
  reaper: [curriculumSources.reaperVariant2026, curriculumSources.reaperExample2026], suspension: [curriculumSources.suspension2026],
  enigma: [curriculumSources.enigma2026], rdrb: [],
  venom: [curriculumSources.venom2025], sick: [curriculumSources.sickSister2023], silver: [curriculumSources.silverBullet2023],
};
export function reviewedModelSources(value: string) {
  const slug = value.split('/').filter(Boolean).at(-1) || '';
  const key = Object.prototype.hasOwnProperty.call(aliases, value) ? aliases[value]
    : Object.prototype.hasOwnProperty.call(aliases, slug) ? aliases[slug] : undefined;
  return key ? { key, sources: groups[key] } : null;
}
