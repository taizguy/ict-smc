import { studyTopics } from '../data/searchTopics';
export { studyTopics };
/** Editorial budgets, not Google indexing limits. Keep the topic before the brand. */
const BRAND = ' | LearnSMC';
const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 155;

export function primaryTopic(value: string): string {
  return value.replace(/\s*\|\s*(?:LearnSMC|ICT\s*&\s*SMC Academy).*$/i, '')
    .replace(/^(?:Chapter|LEC)\s*\d+\s*:\s*/i, '')
    .replace(/\s+[—–]\s+(?:Institutional )?(?:Glossary|Knowledge Graph|Chart Lab|ICT Masterclass Hub|LearnSMC).*$/i, '')
    .replace(/\s+/g, ' ').trim();
}

/** Conservative approximate display widths; actual search layouts vary by device. */
export function estimatedSearchWidth(value: string, size: number): number {
  return [...value].reduce((sum, c) => sum + (/[ilI.,'!:;|]/.test(c) ? .25 : /[mwMW@%]/.test(c) ? .85 : /[A-Z]/.test(c) ? .65 : /\s/.test(c) ? .28 : .5) * size, 0);
}

function fitWords(value: string, chars: number, pixels: number, size: number): string {
  let text = value.replace(/\s+/g, ' ').trim();
  while (text.length > chars || estimatedSearchWidth(text, size) > pixels) {
    const boundary = text.lastIndexOf(' ');
    if (boundary < 1) return text; // Never split an identifier or a word.
    text = text.slice(0, boundary);
  }
  return text.replace(/\s*\([^)]*$/, '').replace(/(?:\s+(?:and|or|with|for|of|in|into|from|at|on|by|to|vs\.?|the|a|an|&|—|–|-|:))+$/i, '').replace(/[/,:;—–-]+$/, '').trim();
}

const routeTitles: Record<string, string> = {
  '/': 'Learn ICT & Smart Money Concepts',
  '/about/': 'About LearnSMC & Muhammad Umer Ijaz',
  '/contact/': 'Contact LearnSMC: Corrections & Support',
  '/terms/': 'Terms of Service & Acceptable Use',
  '/privacy/': 'Privacy & Cookie Policy',
  '/disclaimer/': 'Trading Risk & Hypothetical Results Disclaimer',
  '/adsense/': 'Advertising Information & ads.txt',
  '/curriculum/': 'Free ICT & Smart Money Concepts Curriculum',
  '/masood/': 'Abdullah Masood ICT Lectures & Study Notes',
  '/articles/': 'Trading Articles: Psychology, Risk & ICT',
  '/tools/simulator/ict-2022-model/': 'ICT 2022 Model: Trade-Plan Exercise',
  '/tools/masterclass/core-masterclasses/unicorn-model/': 'ICT Unicorn Model: Breaker & FVG',
  '/tools/masterclass/core-masterclasses/mmxm-stage2/': 'MMXM Second-Stage Distribution',
  '/tools/masterclass/entry-models/venom-model/': 'Venom Model: 2025 Opening-Session Study',
  '/tools/masterclass/pd-arrays/reaper-ifvg/': 'Reaper FVG Study: Nested Gaps & Breakers',
  '/tools/glossary/imbalances/ict-reaper-ifvg/': 'Reaper FVG Definition & Source Context',
  '/tools/masterclass/pd-arrays/suspension-block/': 'Suspension Block Study: Futures Charts',
  '/tools/glossary/order-blocks/suspension-block/': 'Suspension Block Definition & Body Gaps',
  '/tools/masterclass/pd-arrays/rdrb-balanced-price-range/': 'RDRB Study: Balanced-Range Revisits',
  '/tools/glossary/imbalances/redelivered-balanced-price-range/': 'RDRB Definition & Evidence Limits',
  '/tools/compare/internal-vs-external-liquidity/': 'Internal vs. External Range Liquidity',
  '/tools/compare/standard-ifvg-vs-reaper-ifvg/': 'Standard IFVG vs. Reaper IFVG',
  '/tools/glossary/time-and-sessions/sessions-killzones/': 'Trading Sessions & Killzones: London & New York',
  '/tools/glossary/trade-models/institutional-pricing-theory/': 'Institutional Pricing: 00, 20, 50 & 80 Levels',

};

export function searchTitle(value: string, path = '/'): string {
  let topic = routeTitles[path] || studyTopics[path] || primaryTopic(value);
  // Long subtitles describe the page in the deck; the title needs its main topic.
  if (topic.length > TITLE_LIMIT - BRAND.length) {
    const first = topic.split(/\s+[—–]\s+|:\s+|\?\s+/)[0];
    if (first.length >= 16) topic = first;
  }
  return fitWords(topic, TITLE_LIMIT - BRAND.length, 520 - estimatedSearchWidth(BRAND, 20), 20) + BRAND;
}

export function searchDescription(value: string, title: string, path: string): string {
  const reviewedDescriptions: Record<string, string> = {
    '/tools/masterclass/pd-arrays/reaper-ifvg/': 'Study the sourced Reaper variant with nested gaps and a breaker. Compare the chart context, invalidation assumptions and limits.',
    '/tools/glossary/imbalances/ict-reaper-ifvg/': 'Define the Reaper FVG label using a June 2026 source example. Distinguish a nested-gap variant from an ordinary failed inversion.',
    '/tools/masterclass/pd-arrays/suspension-block/': 'Study Suspension Block examples by comparing body gaps, breaker context and front-month versus continuous futures charts.',
    '/tools/glossary/order-blocks/suspension-block/': 'Understand the Suspension Block example: adjacent body-price gaps, overlapping wicks and source-specific contract references.',
    '/tools/masterclass/pd-arrays/rdrb-balanced-price-range/': 'Plan a balanced-range revisit study with fixed touch-counting rules, failed zones and costs. Second-touch performance is not established.',
    '/tools/glossary/imbalances/redelivered-balanced-price-range/': 'Understand RDRB as a descriptive later revisit to a balanced-price reference, with clear limits on its unverified named rules.',
  };
  if (Object.prototype.hasOwnProperty.call(reviewedDescriptions, path)) return reviewedDescriptions[path];
  const topic = primaryTopic(title);
  let text = path.startsWith('/learn/') ? `Study ${topic}. Review definitions, chart examples, failure conditions and the limits of the framework.`
    : path.startsWith('/masood/lectures/') ? `Study ${topic}. Independent Abdullah Masood video notes, with key points, practice and source links.`
    : value.replace(/\s+/g, ' ').trim();
  if (text.length <= DESCRIPTION_LIMIT && estimatedSearchWidth(text, 14) <= 920) return text;
  const sentence = text.match(/^.*?[.!?](?:\s|$)/)?.[0].trim();
  if (sentence && sentence.length >= 65 && sentence.length <= DESCRIPTION_LIMIT && estimatedSearchWidth(sentence, 14) <= 920) return sentence;
  if (path.startsWith('/learn/')) text = `Study ${topic}. Review definitions, chart examples and the conditions that can invalidate an interpretation.`;
  else if (path.startsWith('/masood/lectures/')) text = `${topic}: independent Abdullah Masood video notes, key takeaways, common mistakes and a demo exercise.`;
  else if (path.startsWith('/tools/')) text = `Explore ${topic}. Read the definitions, worked examples, study conditions and limits of this educational tool.`;
  else text = value;
  const result = fitWords(text, DESCRIPTION_LIMIT - 1, 910, 14).replace(/[.!?…]+$/, '');
  return result + '.';
}

export function conciseHeading(value: string): string {
  const clean = primaryTopic(value);
  const topic = clean.split(/\s+[—–]\s+/)[0];
  return topic.length >= 12 ? topic : clean;
}
