import { textbookChapters } from '../data/chaptersData';
export function topicSlug(part: string) {
  return part.replace(/^Part\s+[IVXLCDM]+\s*[-–—:]\s*/i, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
const studyGuidance: Record<string, string[]> = {
  'ict-2025-official-mentorship-curriculum': ["This independent LearnSMC path reorganises the supplied 2025 lecture collection into twelve standalone lessons. Begin with session references and gap measurement, then study FVG qualification, PD-array selection, SMT and liquidity before the Venom and later-session applications.", "Each lesson includes an original worked example, a contrasting outcome, a topic-specific interactive illustration, an applied quiz and five FAQs. The sources sit below the explanation. News conditions, weekly scenarios, options mechanics and journaling are separate studies rather than extra boxes on one universal entry checklist.", "The local library and official playlist contain the same 83 recordings. This edition draws on selected passages from 75 captioned recordings and visual-only review of eight others; it does not claim every spoken minute or every variation has been independently verified. Keep using the linked source library for the full original demonstrations."],
  'time-based-delivery': [
    'This path studies the role of time in chart analysis. Begin by identifying the instrument, exchange session and chart timezone. A New York time window and your local clock may differ, and daylight saving time can change that difference. Record the date and timezone before marking an opening range or a session high.',
    'Work through the linked lesson with future candles hidden. Mark the selected session boundaries, then record what was visible when each observation became available. A developing range is not the same as a completed range. Do not use its final high or low before the observation window has ended.',
    'For review, compare one example that meets your written conditions with one that does not. A clock window alone is not a trade signal. Check price structure, order assumptions and the condition that would cancel the idea. Use a historical chart or simulation for this exercise; the goal is a clearer record, not a daily trading quota.',
  ],
  'special-mentorship-track-practical-field-guide': [
    'This field guide connects the lessons to a repeatable study routine. Before opening a chart, choose one question and one observation window. Write the market, timeframe, reference levels and conditions you plan to examine. Keep the question small enough that another reader could understand what would count as an example.',
    'Read the linked chapter before trying the exercise. In replay, record a decision before revealing later candles. Keep the original note even if the next move makes it look mistaken. Save examples where the pattern fails, never appears or cannot be marked clearly. Those cases help show where a definition needs more work.',
    'Finish with a short review. Separate what you observed from what you inferred about orders or participants. Check any position-size arithmetic against the actual product specifications, and state the costs and fill assumptions used in a simulation. This track is an educational practice guide; completing it does not establish a profitable strategy or a professional qualification.',
  ],
};
export const topicClusters = [...new Set(textbookChapters.map(c => c.part))].map(part => ({
  part, slug: topicSlug(part), chapters: textbookChapters.filter(c => c.part === part), guidance: studyGuidance[topicSlug(part)] || [],
}));
