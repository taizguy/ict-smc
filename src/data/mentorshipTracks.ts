export interface MentorshipTrack { slug:string; title:string; eyebrow:string; focus:string; audience:string; difference:string; prerequisite:string; caution:string; chapterIds:number[]; inventoryKey:string; color:string; }

export const mentorshipTracks: MentorshipTrack[] = [
  {
    "slug": "core-2016-2017",
    "title": "2016–2017 Core Content",
    "eyebrow": "Build the foundation",
    "focus": "Study the vocabulary and reasoning before assembling an entry model.",
    "audience": "Learners who want a structured foundation and a slower, concept-first route.",
    "difference": "The supplied collection is grouped by month, with separate lessons on market conditions, risk, timeframes, PD arrays, swing trading and multi-asset study. It rewards working through a topic rather than collecting isolated setups.",
    "prerequisite": "Start with market foundations if order types, contract values or chart timeframes are unfamiliar.",
    "caution": "The supplied files cover month groups 1–10. This page does not certify that the collection contains every original course recording.",
    "chapterIds": [
      1,
      2,
      4,
      7,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46
    ],
    "inventoryKey": "core-2016-2017",
    "color": "violet"
  },
  {
    "slug": "charter",
    "title": "Charter Price Action Models",
    "eyebrow": "Turn ideas into a plan",
    "focus": "Compare model objectives, trading horizons and the rules of a written trade plan.",
    "audience": "Learners who understand the core concepts and want to study a particular model in depth.",
    "difference": "This collection pairs named price-action models with trade-plan, algorithmic-theory, amplified and supplementary lectures. Its useful distinction is that extra planning detail, not a guarantee that the model is secret or more profitable.",
    "prerequisite": "Read the relevant concepts first. For Model 13, the source lecture explicitly assumes familiarity with the public 2022 mentorship.",
    "caution": "Use each model’s own source and assumptions. Similar terms do not make every model’s entry, stop or target interchangeable.",
    "chapterIds": [
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36
    ],
    "inventoryKey": "charter",
    "color": "amber"
  },
  {
    "slug": "2022",
    "title": "2022 Mentorship",
    "eyebrow": "Focus on one framework",
    "focus": "Connect context, a liquidity reference, displacement, structure and an FVG.",
    "audience": "Learners who prefer a focused model with repeated chart examples and explicit no-setup cases.",
    "difference": "The public series develops a relatively focused execution framework through chart lessons, Forex applications, psychology and risk discussion. Keep the original example’s rules separate from stricter research variations.",
    "prerequisite": "Understand swing references, three-candle FVG geometry and the difference between a chart label and a forecast.",
    "caution": "An initial structure crossing, later FVG completion and an actual entry are separate events. Not every episode uses the same close requirement.",
    "chapterIds": [
      7,
      11,
      13,
      15,
      19,
      21,
      22,
      36,
      38
    ],
    "inventoryKey": "2022",
    "color": "forest"
  },
  {
    "slug": "2023",
    "title": "2023 Mentorship",
    "eyebrow": "Apply ideas to sessions",
    "focus": "Study time-based models alongside session reviews and tape-reading examples.",
    "audience": "Learners who know the 2022 framework and want to compare applications in actual recorded sessions.",
    "difference": "The supplied series includes a dedicated Silver Bullet lesson, live tape-reading sessions, opening-range-gap examples and drawdown homework. A dated session example should be studied with its own context.",
    "prerequisite": "Review FVGs, session clocks, structure and risk before interpreting execution examples.",
    "caution": "A time window is a model condition, not a promise of a trade every day or a fixed number of points.",
    "chapterIds": [
      19,
      11,
      13,
      21,
      26,
      50,
      51,
      57,
      38
    ],
    "inventoryKey": "2023",
    "color": "violet"
  },
  {
    "slug": "2025",
    "title": "2025 Mentorship",
    "eyebrow": "Refine the opening read",
    "focus": "Investigate opening-range context, FVG selection and reasons to disqualify an apparent setup.",
    "audience": "Learners ready to compare a precise rule with cases where the same-looking pattern should be rejected.",
    "difference": "The supplied lecture titles include the first presented FVG, disqualification examples, algorithmic timing and journaling, Forex reviews and Venom examples. Study the rejection conditions alongside attractive entries.",
    "prerequisite": "Be comfortable distinguishing pattern geometry, context, entry conditions and execution assumptions.",
    "caution": "Being first does not establish an FVG’s superiority. Use the exact lecture when attributing a timing or disqualification rule.",
    "chapterIds": [24, 58, 25, 59, 26, 60, 53, 61, 62, 27, 63, 64],
    "inventoryKey": "2025",
    "color": "amber"
  },
  {
    "slug": "2026",
    "title": "2026 SMC Mentorship",
    "eyebrow": "Study the context in depth",
    "focus": "Connect higher-timeframe references with opening ranges, event conditions and later delivery.",
    "audience": "Learners who already keep a clear journal and can distinguish a case study from a general rule.",
    "difference": "This supplied collection combines new-student guidance with detailed NQ/ES reviews, daily inefficiencies, opening-range context and event case studies. Select a question before watching a long recording.",
    "prerequisite": "Review the foundations and the relevant earlier model. A later year is not a shortcut around practice.",
    "caution": "Some supplied recordings are visual-only. Review coverage distinguishes chart inspection from checked spoken passages.",
    "chapterIds": [
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57
    ],
    "inventoryKey": "2026",
    "color": "forest"
  }
];
export const mentorshipPath = (slug:string) => '/curriculum/mentorships/' + slug + '/';
/** Study-path selection is UI state, not a separate indexable lesson document. */
export const mentorshipLessonPath = (slug:string, track:string) => '/learn/' + slug + '/#mentorship=' + encodeURIComponent(track);
export function selectedMentorship(location: Pick<Location, 'hash' | 'search'>): string | null {
  return new URLSearchParams(location.hash.replace(/^#/, '')).get('mentorship')
    || new URLSearchParams(location.search).get('mentorship');
}
