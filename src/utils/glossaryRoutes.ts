/**
 * LearnSMC Hierarchical Glossary, Multi-Tier Routing & Internal Link Mesh Engine
 * Single Source of Truth for:
 * 1. Category hierarchy: /tools/glossary/:category/
 * 2. Main concepts: /tools/glossary/:category/:concept/ (or /tools/glossary/:concept/)
 * 3. Deep sub-concepts: /tools/glossary/:category/:subConcept/ (e.g. /tools/glossary/order-blocks/mitigation-and-breakers/)
 * 4. Contextual keyword matchers for automatic cross-linking across curriculum & tools
 */

export interface GlossaryCategoryInfo {
  id: string; // internal id e.g. 'order_blocks'
  slug: string; // url slug e.g. 'order-blocks'
  aliases?: string[];
  name: string;
  badge: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
}

export interface DeepSubConceptInfo {
  id: string;
  slug: string;
  categorySlug: string;
  parentConceptId: string;
  name: string;
  subtitle: string;
  shortDefinition: string;
  metaTitle: string;
  metaDescription: string;
  keyPoints: string[];
  invalidation: string;
  exampleScenario: string;
}

export interface ConceptSlugMapping {
  id: string;
  slug: string;
  category: string;
  categorySlug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
}

// 1. Categories Hierarchy
export const GLOSSARY_CATEGORIES: GlossaryCategoryInfo[] = [
  {
    id: 'foundations',
    slug: 'foundations',
    name: 'Market Foundations & Microstructure',
    badge: 'Microstructure',
    description: 'Central limit order book mechanics, passive limit queues vs aggressive market orders, spread dynamics, and intermarket yield drivers.',
    metaTitle: 'Market Foundations & Order Book Microstructure — Glossary | LearnSMC',
    metaDescription: 'Explore institutional market foundations: central limit order books, bid-ask spreads, and intermarket yield curve drivers on LearnSMC.'
  },
  {
    id: 'liquidity',
    slug: 'liquidity',
    name: 'Liquidity Pools & Stop Runs',
    badge: 'Order Pools',
    description: 'Buy-Side Liquidity (BSL), Sell-Side Liquidity (SSL), Inducement (IDM), Low vs High Resistance Liquidity Runs, and Dual Purges.',
    metaTitle: 'Liquidity Pools, BSL, SSL & Stop Runs — Institutional Glossary | LearnSMC',
    metaDescription: 'Codified reference for Buy-Side and Sell-Side Liquidity pools, stop-loss cluster sweeps, internal vs external range liquidity, and engineered inducement.'
  },
  {
    id: 'structure',
    slug: 'structure',
    aliases: ['market-structure'],
    name: 'Market Structure & Delivery Shift',
    badge: 'Structural Flow',
    description: 'Break of Structure (BOS), Market Structure Shift (MSS), Change of Character (CHoCH), Changing State of Delivery (CSoD), and CISD.',
    metaTitle: 'Market Structure: BOS, MSS & Changing State of Delivery | LearnSMC',
    metaDescription: 'Differentiate true Market Structure Shifts (MSS) with displacement from retail Break of Structure (BOS) and Changing State of Delivery.'
  },
  {
    id: 'imbalances',
    slug: 'imbalances',
    name: 'Imbalances & Fair Value Gaps',
    badge: 'Price Imbalances',
    description: '3-candle Fair Value Gaps (FVG), Inverse FVGs (IFVG), Consequent Encroachment (50%), Opening Gap Matrix (NDOG/NWOG), and RDRB.',
    metaTitle: 'Fair Value Gaps (FVG) & Imbalance Inversions — Glossary | LearnSMC',
    metaDescription: 'Complete technical reference for Fair Value Gaps, 50% Consequent Encroachment, Inverse FVGs, and Opening Gap Matrix in institutional trading.'
  },
  {
    id: 'order_blocks',
    slug: 'order-blocks',
    name: 'Order Blocks & Mitigation Breakers',
    badge: 'Institutional Footprints',
    description: 'Institutional Order Blocks (OB), Breaker Blocks, Mitigation Blocks, Propulsion Blocks, Reclaimed Blocks, and Suspension Blocks.',
    metaTitle: 'Order Blocks, Breakers & Mitigation Blocks — Glossary | LearnSMC',
    metaDescription: 'Master institutional Order Blocks, Breaker Blocks, and Mitigation Blocks with precise identification rules and volume validation.'
  },
  {
    id: 'time_sessions',
    slug: 'time-and-sessions',
    aliases: ['time-sessions'],
    name: 'Time, Macros & Session Killzones',
    badge: 'Algorithmic Clocks',
    description: 'Power of Three (AMD), London & New York Killzones, Intraday Macro Windows, 4-Pillar Daily Bias, and 90-Day IPDA Quarterly Cycles.',
    metaTitle: 'Time & Session Killzones, Power of Three (PO3) & Macros | LearnSMC',
    metaDescription: 'Algorithmic timing reference: London & NY Killzones, Power of Three (AMD) accumulation/manipulation cycles, and intraday macro clocks.'
  },
  {
    id: 'models',
    slug: 'trade-models',
    aliases: ['models'],
    name: 'Institutional Trade Models & Setups',
    badge: 'Execution Protocols',
    description: 'ICT 2022 Mentorship Model, Silver Bullet, SMT Divergence, NASDAQ 09:30 Open, Gold Legacy SMC, and Candle Range Theory (CRT).',
    metaTitle: 'ICT Trade Models: 2022 Model, Silver Bullet & SMT — Glossary | LearnSMC',
    metaDescription: 'Codified execution setups: ICT 2022 Model, Silver Bullet hourly windows, SMT cross-asset divergence, and institutional entry frameworks.'
  }
];

// Category lookup by slug or alias or id
export function getCategoryBySlugOrId(identifier: string): GlossaryCategoryInfo | undefined {
  const clean = identifier.toLowerCase().replace(/^\/+|\/+$/g, '');
  return GLOSSARY_CATEGORIES.find(c => 
    c.id === clean || 
    c.slug === clean || 
    c.aliases?.includes(clean)
  );
}

// 2. All 41 Concepts Slug Mappings
export const CONCEPT_SLUG_MAP: Record<string, ConceptSlugMapping> = {
  'market_mechanics_liquidity': {
    id: 'market_mechanics_liquidity',
    slug: 'order-book-market-liquidity',
    category: 'foundations',
    categorySlug: 'foundations',
    name: 'Order Book & Market Liquidity',
    shortName: 'Market Mechanics',
    metaTitle: 'Order Book & Market Liquidity Mechanics — Glossary | LearnSMC',
    metaDescription: 'Central limit order book mechanics, depth of market queues, passive limit inventory vs aggressive market orders, and spread exhaustion.'
  },
  'interest_rate_triad': {
    id: 'interest_rate_triad',
    slug: 'interest-rate-triad',
    category: 'foundations',
    categorySlug: 'foundations',
    name: 'The Interest Rate Triad (US 10Y/30Y Yields & Intermarket Forex)',
    shortName: 'Interest Rate Triad',
    metaTitle: 'Interest Rate Triad: US 10Y/30Y Yields & FX Drivers | LearnSMC',
    metaDescription: 'Intermarket institutional mechanics connecting US Treasury bond yields, Fed funds expectations, and foreign exchange directional drivers.'
  },
  'buy_side_liquidity': {
    id: 'buy_side_liquidity',
    slug: 'buy-side-liquidity',
    category: 'liquidity',
    categorySlug: 'liquidity',
    name: 'Buy Side Liquidity (BSL)',
    shortName: 'Buy Side Liquidity',
    metaTitle: 'Buy Side Liquidity (BSL) — Institutional Order Flow | LearnSMC',
    metaDescription: 'Concentration of resting buy stop orders above swing highs, short stop-outs, and breakout orders exploited by smart money counterparties.'
  },
  'sell_side_liquidity': {
    id: 'sell_side_liquidity',
    slug: 'sell-side-liquidity',
    category: 'liquidity',
    categorySlug: 'liquidity',
    name: 'Sell Side Liquidity (SSL)',
    shortName: 'Sell Side Liquidity',
    metaTitle: 'Sell Side Liquidity (SSL) — Institutional Order Flow | LearnSMC',
    metaDescription: 'Resting sell stop clusters beneath key swing lows utilized by institutions to accumulate long positions with minimal market impact.'
  },
  'inducement_vs_external_liquidity': {
    id: 'inducement_vs_external_liquidity',
    slug: 'inducement-vs-external-liquidity',
    category: 'liquidity',
    categorySlug: 'liquidity',
    name: 'Inducement (IDM) Mechanics vs External Liquidity',
    shortName: 'Inducement (IDM)',
    metaTitle: 'Inducement (IDM) vs External Range Liquidity | LearnSMC',
    metaDescription: 'Understand internal range inducement traps that trick early retail participants into trading before major external liquidity is swept.'
  },
  'lrlr_vs_hrlr': {
    id: 'lrlr_vs_hrlr',
    slug: 'low-resistance-liquidity-runs',
    category: 'liquidity',
    categorySlug: 'liquidity',
    name: 'Low Resistance Liquidity Runs (LRLR) vs. High Resistance (HRLR)',
    shortName: 'LRLR vs HRLR',
    metaTitle: 'Low Resistance vs High Resistance Liquidity Runs | LearnSMC',
    metaDescription: 'Recognize clean one-sided institutional price delivery (LRLR) vs choppy structural obstacles and consolidation traps (HRLR).'
  },
  'nfp_thursday_hrlr_and_event_volatility': {
    id: 'nfp_thursday_hrlr_and_event_volatility',
    slug: 'event-volatility-hrlr',
    category: 'liquidity',
    categorySlug: 'liquidity',
    name: 'High Resistance Runs on Event Calendars & Volatility',
    shortName: 'Event Volatility',
    metaTitle: 'NFP Thursday HRLR & Macro Event Volatility Protocol | LearnSMC',
    metaDescription: 'How tier-one macroeconomic news releases (CPI, FOMC, NFP) create high-resistance delivery conditions and institutional expansion legs.'
  },
  'ict_double_purge': {
    id: 'ict_double_purge',
    slug: 'ict-double-purge',
    category: 'liquidity',
    categorySlug: 'liquidity',
    name: 'ICT Double Purge (Dual Liquidity Clearing)',
    shortName: 'Double Purge',
    metaTitle: 'ICT Double Purge: Dual Liquidity Sweep Setup | LearnSMC',
    metaDescription: 'A predatory algorithmic sequence where both the high and low of a range are swept within a single session before true expansion.'
  },
  'market_structure_bos_mss_choch': {
    id: 'market_structure_bos_mss_choch',
    slug: 'market-structure-bos-mss-choch',
    category: 'structure',
    categorySlug: 'structure',
    name: 'Market Structure: BOS vs MSS vs CHoCH',
    shortName: 'Structure BOS/MSS',
    metaTitle: 'BOS vs MSS vs CHoCH: Market Structure Breakdown | LearnSMC',
    metaDescription: 'Decisive criteria separating retail Break of Structure (BOS) from true institutional Market Structure Shift (MSS) with displacement.'
  },
  'changing_state_of_delivery': {
    id: 'changing_state_of_delivery',
    slug: 'changing-state-of-delivery',
    category: 'structure',
    categorySlug: 'structure',
    name: 'Changing State of Delivery (CSoD) & Change of Character',
    shortName: 'Changing State of Delivery',
    metaTitle: 'Changing State of Delivery (CSoD) in SMC Trading | LearnSMC',
    metaDescription: 'The earliest order flow confirmation signal when market maker algorithms transition from discount repricing to premium expansion.'
  },
  'cisd_vs_mss_breakdown': {
    id: 'cisd_vs_mss_breakdown',
    slug: 'cisd-vs-mss',
    category: 'structure',
    categorySlug: 'structure',
    name: 'CISD vs. MSS: Mechanical Differences',
    shortName: 'CISD vs MSS',
    metaTitle: 'Change In State of Delivery (CISD) vs MSS Differences | LearnSMC',
    metaDescription: 'Compare candle-level Change In State of Delivery (CISD) against swing-level Market Structure Shifts (MSS) across lower timeframes.'
  },
  'displacement_engine': {
    id: 'displacement_engine',
    slug: 'displacement',
    category: 'imbalances',
    categorySlug: 'imbalances',
    name: 'Displacement (The Engine)',
    shortName: 'Displacement',
    metaTitle: 'Displacement: The Core Engine of Institutional Flow | LearnSMC',
    metaDescription: 'Energetic price velocity and large-bodied candles that prove institutional sponsorship and leave Fair Value Gaps in their wake.'
  },
  'fair_value_gap': {
    id: 'fair_value_gap',
    slug: 'fair-value-gap',
    category: 'imbalances',
    categorySlug: 'imbalances',
    name: 'Fair Value Gap (FVG)',
    shortName: 'Fair Value Gap',
    metaTitle: 'Fair Value Gap (FVG) Institutional Mechanics & Rules | LearnSMC',
    metaDescription: 'Study FVG wick boundaries, midpoint arithmetic, overlapping non-examples and uncertainty. Follow the full lesson for sources and visual practice.'
  },
  'consequent_encroachment': {
    id: 'consequent_encroachment',
    slug: 'consequent-encroachment',
    category: 'imbalances',
    categorySlug: 'imbalances',
    name: 'Consequent Encroachment (CE 50%)',
    shortName: 'Consequent Encroachment',
    metaTitle: 'Consequent Encroachment (CE 50%) Level in SMC | LearnSMC',
    metaDescription: 'The 50% midpoint reference of a defined FVG or wick range. A midpoint is not a universal invalidation boundary.'
  },
  'inverse_fair_value_gap': {
    id: 'inverse_fair_value_gap',
    slug: 'inverse-fair-value-gap',
    category: 'imbalances',
    categorySlug: 'imbalances',
    name: 'Inverse Fair Value Gap (IFVG)',
    shortName: 'Inverse FVG',
    metaTitle: 'Inverse Fair Value Gap (IFVG): Role Inversion Setup | LearnSMC',
    metaDescription: 'When a previously violated FVG inverts from support to resistance (or vice versa), signaling aggressive structural regime changes.'
  },
  'opening_gap_matrix_ndog_nwog': {
    id: 'opening_gap_matrix_ndog_nwog',
    slug: 'opening-gap-matrix',
    category: 'imbalances',
    categorySlug: 'imbalances',
    name: 'The Opening Gap Matrix: NDOG, NWOG & 50% CE',
    shortName: 'Opening Gap Matrix',
    metaTitle: 'New Day Opening Gap (NDOG) & New Week Gap (NWOG) Matrix | LearnSMC',
    metaDescription: 'How interbank settlement gaps (NDOG & NWOG) act as perpetual gravitational attractors and magnet levels for intraday algorithms.'
  },
  'ict_reaper_ifvg': {
  "id": "ict_reaper_ifvg",
  "slug": "ict-reaper-ifvg",
  "category": "imbalances",
  "categorySlug": "imbalances",
  "name": "Reaper FVG: A Sourced Nested-Gap Variant",
  "shortName": "Reaper FVG",
  "metaTitle": "Reaper FVG: A Sourced Nested-Gap Variant | LearnSMC",
  "metaDescription": "Study ICT’s June 2026 Reaper variant: nested inversion and first-utilization gaps in a breaker context, with source references and limitations."
},
  'ict_rdrb': {
  "id": "ict_rdrb",
  "slug": "redelivered-balanced-price-range",
  "category": "imbalances",
  "categorySlug": "imbalances",
  "name": "RDRB: A Later Balanced-Range Visit",
  "shortName": "Balanced Price Range",
  "metaTitle": "RDRB: A Later Balanced-Range Visit | LearnSMC",
  "metaDescription": "These notes use RDRB descriptively for a later revisit to a selected balanced-price reference. A precise originating explanation for the previous named second-touch model has not been verified. Keep this limitation visible instead of attributing a universal second-touch rule to ICT."
},
  'ict_enigma_fvg': {
  "id": "ict_enigma_fvg",
  "slug": "ict-enigma-fvg",
  "category": "imbalances",
  "categorySlug": "imbalances",
  "name": "Enigma: FVG Measurements and Projections",
  "shortName": "Enigma FVG",
  "metaTitle": "Enigma: FVG Measurements and Projections | LearnSMC",
  "metaDescription": "The reviewed June 2026 Enigma lecture discusses FVG measurements, volume imbalances and projections into a price range that has not yet traded. It identifies the middle candle of a three-candle FVG and distinguishes wick-based and body-based measurements. It does not establish the previous two-candle FVG definition on this page."
},
  'order_block': {
    id: 'order_block',
    slug: 'order-block',
    category: 'order_blocks',
    categorySlug: 'order-blocks',
    name: 'Order Block (OB)',
    shortName: 'Order Block',
    metaTitle: 'Institutional Order Block (OB): Definition & Trading Rules | LearnSMC',
    metaDescription: 'Study order-block candle runs, opening references, mitigation and midpoint conventions. Candles do not reveal institutional inventory.'
  },
  'breaker_block': {
    id: 'breaker_block',
    slug: 'breaker-block',
    category: 'order_blocks',
    categorySlug: 'order-blocks',
    name: 'Breaker Block',
    shortName: 'Breaker Block',
    metaTitle: 'Breaker Block in SMC Trading: Trapped Liquidity Play | LearnSMC',
    metaDescription: 'A failed Order Block that sponsored a liquidity sweep before being breached, flipping its polarity to provide model-based support/resistance.'
  },
  'propulsion_and_reclaimed_blocks': {
    id: 'propulsion_and_reclaimed_blocks',
    slug: 'propulsion-reclaimed-blocks',
    category: 'order_blocks',
    categorySlug: 'order-blocks',
    name: 'Propulsion Blocks & Reclaimed Order Blocks',
    shortName: 'Propulsion Blocks',
    metaTitle: 'Propulsion & Reclaimed Order Blocks — ICT Framework | LearnSMC',
    metaDescription: 'A candle that retraces into an active Order Block and violently launches away, creating a secondary springboard for trend continuation.'
  },
  'ict_suspension_block': {
  "id": "ict_suspension_block",
  "slug": "suspension-block",
  "category": "order_blocks",
  "categorySlug": "order-blocks",
  "name": "Suspension Block: Body Gaps and Contract Context",
  "shortName": "Suspension Block",
  "metaTitle": "Suspension Block: Body Gaps and Contract Context | LearnSMC",
  "metaDescription": "In the reviewed April 2026 explanation, ICT examines separations between adjacent candle bodies while their wicks touch or overlap. These are volume imbalances in his terminology. Mark the actual close/open prices around the selected candle; an isolated counter-trend pause alone is not the definition illustrated here."
},
  'ict_hangman_pd_array': {
    id: 'ict_hangman_pd_array',
    slug: 'hangman-pd-array',
    category: 'order_blocks',
    categorySlug: 'order-blocks',
    name: 'ICT Hangman PD Array (Wick Rejection Setup)',
    shortName: 'Hangman PD Array',
    metaTitle: 'ICT Hangman PD Array: Wick Rejection Setup | LearnSMC',
    metaDescription: 'Long candle wicks acting as a proxy Order Block, treated as an independent 50% dealing range for precision entries.'
  },
  'power_of_three_amd': {
    id: 'power_of_three_amd',
    slug: 'power-of-three-amd',
    category: 'time_sessions',
    categorySlug: 'time-and-sessions',
    name: 'Power of Three (AMD): Accumulation, Manipulation, Distribution',
    shortName: 'Power of Three (PO3)',
    metaTitle: 'Power of Three (PO3 / AMD) Cycle in Smart Money Trading | LearnSMC',
    metaDescription: 'Understand the three phases of algorithmic price delivery: Accumulation around the open, Manipulation (Judas swing), and Distribution to target.'
  },
  'sessions_killzones_timing': {
    id: 'sessions_killzones_timing',
    slug: 'sessions-killzones',
    category: 'time_sessions',
    categorySlug: 'time-and-sessions',
    name: 'Sessions & Killzones Timing',
    shortName: 'Killzones Timing',
    metaTitle: 'ICT Sessions & Killzone Timing (London, NY AM, NY PM) | LearnSMC',
    metaDescription: 'Curriculum timing conventions: Asian Range (20:00-00:00), London Open (02:00-05:00), New York AM (08:30-11:00), and London Close Killzones.'
  },
  'daily_bias_masood': {
    id: 'daily_bias_masood',
    slug: 'daily-bias-engine',
    category: 'time_sessions',
    categorySlug: 'time-and-sessions',
    name: '4-Pillar Daily Bias Engine (Abdullah Masood Model)',
    shortName: 'Daily Bias Engine',
    metaTitle: '4-Pillar Daily Bias Engine — Trader Abdullah Masood | LearnSMC',
    metaDescription: 'Determine precise daily candle expansion direction using Higher Timeframe liquidity draws, PD Array discount/premium, and economic macro timing.'
  },
  'quarterly_shifts_ipda': {
    id: 'quarterly_shifts_ipda',
    slug: 'quarterly-shifts-ipda',
    category: 'time_sessions',
    categorySlug: 'time-and-sessions',
    name: '90-Day Quarterly Shifts & 6-Month IPDA Lookback',
    shortName: 'Quarterly Shifts',
    metaTitle: '90-Day Quarterly Shifts & IPDA Lookback Windows | LearnSMC',
    metaDescription: 'How the Interbank Price Delivery Algorithm recalibrates macro dealing ranges every 90 days and references 20, 40, and 60-day historical highs and lows.'
  },
  'lunch_and_afternoon_macros_2026': {
    id: 'lunch_and_afternoon_macros_2026',
    slug: 'intraday-macro-continuum',
    category: 'time_sessions',
    categorySlug: 'time-and-sessions',
    name: 'The Intraday Macro Continuum (11:50 Lunch & 13:30 Afternoon)',
    shortName: 'Macro Continuum',
    metaTitle: 'Intraday Macro Execution Windows: 11:50, 13:30 & 15:15 | LearnSMC',
    metaDescription: 'Specific 20-minute intraday algorithmic injection cycles delivering equity indices and forex into daily objectives.'
  },
  'ict_2022_model': {
    id: 'ict_2022_model',
    slug: 'ict-2022-model',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'ICT 2022 Mentorship Model',
    shortName: 'ICT 2022 Model',
    metaTitle: 'ICT 2022 Mentorship Model: Complete Execution Rules | LearnSMC',
    metaDescription: 'The core index futures execution protocol: Liquidity Sweep -> Market Structure Shift with Displacement -> Retracement into Fair Value Gap.'
  },
  'silver_bullet_model': {
    id: 'silver_bullet_model',
    slug: 'silver-bullet-model',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'ICT Silver Bullet Model',
    shortName: 'Silver Bullet',
    metaTitle: 'ICT Silver Bullet Model: 60-Minute Execution Windows | LearnSMC',
    metaDescription: 'Time-based trading strategy occurring precisely at 03:00-04:00 (London), 10:00-11:00 (NY AM), and 14:00-15:00 (NY PM) for model-based 15-point setups.'
  },
  'smt_divergence': {
    id: 'smt_divergence',
    slug: 'smt-divergence',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'SMT Divergence (Smart Money Technique)',
    shortName: 'SMT Divergence',
    metaTitle: 'SMT Divergence: Correlated Asset Non-Confirmation | LearnSMC',
    metaDescription: 'Detect smart money accumulation when ES makes a higher high while NQ fails (or EURUSD vs GBPUSD), revealing hidden institutional commitment.'
  },
  'gold_legacy_smc': {
    id: 'gold_legacy_smc',
    slug: 'gold-legacy-smc',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'The Gold Legacy (XAUUSD Precision SMC Execution)',
    shortName: 'Gold Legacy',
    metaTitle: 'XAUUSD Gold Legacy: Smart Money Execution Protocol | LearnSMC',
    metaDescription: 'Specialized gold market dynamics: London session fixes, Asian range liquidity sweeps, and volatility expansion models for spot gold.'
  },
  'nasdaq_session_open': {
    id: 'nasdaq_session_open',
    slug: 'nasdaq-session-open',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'NASDAQ (NQ) 09:30 AM Open & SMT Correlated Delivery',
    shortName: 'NQ 09:30 Open',
    metaTitle: 'NASDAQ 09:30 AM Opening Protocol & Equities SMT | LearnSMC',
    metaDescription: 'Rules for navigating the violent 09:30 AM New York opening bell on NASDAQ futures, avoiding the initial fakeout, and catching the true expansion.'
  },
  'institutional_pricing_theory': {
    id: 'institutional_pricing_theory',
    slug: 'institutional-pricing-theory',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'Institutional Pricing Theory & "Filling the Numbers"',
    shortName: 'Institutional Pricing',
    metaTitle: 'Institutional Pricing Theory & Key Levels (00, 20, 50, 80) | LearnSMC',
    metaDescription: 'How commercial banks and central bank pricing algorithms route liquidity toward psychological round numbers and institutional quarter levels.'
  },
  'mega_trades_framework': {
    id: 'mega_trades_framework',
    slug: 'mega-trades-framework',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'The ICT Mega-Trades Multi-Asset Architecture',
    shortName: 'Mega Trades',
    metaTitle: 'ICT Mega-Trades Multi-Asset Architecture | LearnSMC',
    metaDescription: 'High-timeframe multi-hundred pip swing setups combining weekly bias, monthly PD arrays, and commercial COT hedging data.'
  },
  'from_vision_to_execution': {
    id: 'from_vision_to_execution',
    slug: 'from-vision-to-execution',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'From Vision to Execution: The Core Protocol',
    shortName: 'Vision to Execution',
    metaTitle: 'From Vision to Execution: Complete Trader Blueprint | LearnSMC',
    metaDescription: 'Step-by-step checklist transforming abstract SMC market theory into rigid, repeatable intraday trade execution and strict risk controls.'
  },
  'market_alchemy_ath': {
    id: 'market_alchemy_ath',
    slug: 'market-alchemy-ath',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'Market Alchemy: Trading All-Time Highs (ATH) with Fibonacci Projections',
    shortName: 'Market Alchemy ATH',
    metaTitle: 'Trading All-Time Highs (ATH) with Fibonacci Projections | LearnSMC',
    metaDescription: 'How to trade discovery markets and uncharted price territory when there are no historical resistance levels using Fibonacci standard deviations.'
  },
  'ict_venom_model': {
    id: 'ict_venom_model',
    slug: 'ict-venom-model',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'ICT Venom Model: The 2025 Opening-Session Example',
    shortName: 'Venom Model',
    metaTitle: 'ICT Venom Model: 2025 Source & Opening-Session Study | LearnSMC',
    metaDescription: 'Study the official 2025 Venom example: the 08:00–09:30 New York reference window, liquidity raid, entry variations and limitations.'
  },
  'ict_crt_candle_range_theory': {
    id: 'ict_crt_candle_range_theory',
    slug: 'candle-range-theory',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'Candle Range Theory (CRT) Framework',
    shortName: 'Candle Range Theory',
    metaTitle: 'Candle Range Theory (CRT) in Institutional Trading | LearnSMC',
    metaDescription: 'How the high, low, open, and close of prior higher timeframe candles dictate boundaries and expansion probabilities on lower timeframes.'
  },
  'ict_sick_sister_strategy': {
    id: 'ict_sick_sister_strategy',
    slug: 'sick-sister-strategy',
    category: 'models',
    categorySlug: 'trade-models',
    name: 'ICT Sick Sister Strategy (Correlated SMT Execution)',
    shortName: 'Sick Sister Strategy',
    metaTitle: 'ICT Sick Sister Strategy: Relative Weakness Execution | LearnSMC',
    metaDescription: 'Study ICT’s 2023 Sick Sister consolidation example, conditional catch-up longs and why relative weakness is not an automatic short signal.'
  }
};

// 3. Deep Sub-Concepts (Multi-Tier Deep Hierarchy)
export const DEEP_SUB_CONCEPTS: DeepSubConceptInfo[] = [
  // Order Blocks Sub-Concepts
  {
    id: 'mitigation_and_breakers',
    slug: 'mitigation-and-breakers',
    categorySlug: 'order-blocks',
    parentConceptId: 'order_block',
    name: 'Mitigation Blocks & Breaker Order Blocks',
    subtitle: 'Polarity Inversion, Trapped Capital Mechanics & Reversal Confluence',
    shortDefinition: 'A comparative and operational deep-dive into how Order Blocks transform into Mitigation Blocks (when no liquidity sweep occurs) and Breaker Blocks (when liquidity was swept prior to structure breach).',
    metaTitle: 'Mitigation Blocks vs. Breaker Order Blocks — Deep Sub-Concept | LearnSMC',
    metaDescription: 'Master the mechanical distinction between Mitigation Blocks and Breaker Blocks: sweep origin, trapped retail volume, and role inversion.',
    keyPoints: [
      'Breakers originate from an Order Block that successfully swept opposing liquidity before breaking structure.',
      'Mitigation Blocks fail to sweep opposing liquidity before breaking structure, indicating urgent failure of original supply/demand.',
      'Both block variants represent trapped participants rushing to exit at breakeven when price retraces.',
      'The framework-selected setups occur when an Inversion Fair Value Gap overlaps directly with the Breaker candle.'
    ],
    invalidation: 'Candle body closes completely across the entire body of the breaker candle invalidates the mitigation setup.',
    exampleScenario: 'Price sweeps previous day high into BSL, makes a sharp lower low breaking the last up-candle with displacement, then pulls back to test the former up-candle as a bearish Breaker.'
  },
  {
    id: 'propulsion_and_reclaimed',
    slug: 'propulsion-and-reclaimed',
    categorySlug: 'order-blocks',
    parentConceptId: 'order_block',
    name: 'Propulsion & Reclaimed Blocks: Comparison and Rules',
    subtitle: 'Momentum Re-Ignition & Multi-Layered Institutional Entries',
    shortDefinition: 'Advanced Order Block subtypes where a subsequent candle tests an existing Order Block and explodes outward, creating a secondary propulsion engine.',
    metaTitle: 'Propulsion Blocks & Reclaimed Order Blocks — Deep Sub-Concept | LearnSMC',
    metaDescription: 'Operational guide to ICT Propulsion Blocks: how to trade secondary entries when an established Order Block sends price surging.',
    keyPoints: [
      'A Propulsion Block acts as an aggressive continuation springboard.',
      'Validates that institutions are adding further exposure rather than liquidating.',
      'Risk can be anchored tightly behind the propulsion candle rather than the initial deep base.'
    ],
    invalidation: 'Price retracing beyond the 50% Consequent Encroachment of the propulsion candle body.',
    exampleScenario: 'After a bullish OB is formed, a down-candle dips into its top 25% and immediately closes higher with a massive wick, creating the propulsion trigger.'
  },
  {
    id: 'suspension_and_hangman',
    slug: 'suspension-and-hangman',
    categorySlug: 'order-blocks',
    parentConceptId: 'order_block',
    name: 'Suspension Blocks & Hangman Wick PD Arrays',
    subtitle: 'Wick Rejections, Unfilled Voids & Macro Delay Tactics',
    shortDefinition: 'Algorithmic holding patterns where price refuses to touch an Order Block until an algorithmic macro window opens, utilizing candle wicks as proxy blocks.',
    metaTitle: 'Suspension Blocks & Hangman Wick Arrays — Deep Sub-Concept | LearnSMC',
    metaDescription: 'Explore algorithmic suspension patterns and how long candle wicks function as proxy order blocks in precision execution.',
    keyPoints: [
      'Long wick rejections store liquidity within their 50% midpoint (wick CE).',
      'Suspension reflects algorithmic timing: waiting for 08:30 or 09:30 news releases before delivering to the block.'
    ],
    invalidation: 'Full candle body acceptance outside the wick boundary on the execution timeframe.',
    exampleScenario: 'A 4H rejection wick prints at London open; during NY AM session, price retraces exactly 50% into that wick and reverses violently.'
  },

  // Imbalances Sub-Concepts
  {
    id: 'fair_value_gaps_and_inversions',
    slug: 'fair-value-gaps-and-inversions',
    categorySlug: 'imbalances',
    parentConceptId: 'fair_value_gap',
    name: 'Fair Value Gaps (FVG) & Inversion Traps (IFVG)',
    subtitle: 'From Virgin Imbalance Support to Inverted Directional Resistance',
    shortDefinition: 'The lifecycle of 3-candle price imbalances: from virgin discount rebalancing to predatory inversion when smart money slices through retail defense.',
    metaTitle: 'Fair Value Gaps & Inversion Traps (IFVG) — Deep Sub-Concept | LearnSMC',
    metaDescription: 'Complete lifecycle analysis of Fair Value Gaps transitioning into Inverse FVGs across market structure shifts.',
    keyPoints: [
      'FVG is a 3-candle imbalance where candle 1 wick and candle 3 wick do not touch.',
      'When an FVG is completely traversed by an opposing impulse candle, it becomes an IFVG on the retest.'
    ],
    invalidation: 'Candle body closes beyond the opposing boundary of the FVG.',
    exampleScenario: 'Bullish FVG holds for 2 taps, then sudden CPI news dumps price below it; on the subsequent pullback, the bottom of the former gap acts as ceiling resistance.'
  },
  {
    id: 'consequent_encroachment_and_gaps',
    slug: 'consequent-encroachment-and-gaps',
    categorySlug: 'imbalances',
    parentConceptId: 'consequent_encroachment',
    name: 'Consequent Encroachment (50% CE) & Opening Gap Matrix',
    subtitle: 'Mathematical Midpoints, NDOG & NWOG Settlement Dynamics',
    shortDefinition: 'Precise Fibonacci application to price voids: using the 50% Consequent Encroachment of FVGs, New Day Opening Gaps (NDOG), and New Week Opening Gaps (NWOG).',
    metaTitle: 'Consequent Encroachment (50% CE) & Opening Gaps — Deep Sub-Concept | LearnSMC',
    metaDescription: 'Mathematical rules of 50% Consequent Encroachment applied to NDOG, NWOG, and intraday Fair Value Gaps.',
    keyPoints: [
      'Bodies respect the 50% CE; wicks are permitted to pierce through as long as bodies close above/below.',
      'NDOG and NWOG create multi-day benchmark lines that price frequently respects throughout the trading week.'
    ],
    invalidation: 'Any 15-minute or 1-hour candle body closing through the 50% CE line.',
    exampleScenario: 'NDOG prints at 18:00 ET; at 09:30 equities open, price wicks into the exact 50% midpoint of that gap and rallies 40 points.'
  },

  // Liquidity Sub-Concepts
  {
    id: 'buy_side_and_sell_side_pools',
    slug: 'buy-side-and-sell-side-pools',
    categorySlug: 'liquidity',
    parentConceptId: 'buy_side_liquidity',
    name: 'Buy-Side & Sell-Side Liquidity Pool Architecture',
    subtitle: 'Old Highs/Lows, Equal Highs (EQH), Equal Lows (EQL) & Stop Hunting',
    shortDefinition: 'How institutions map the dealing landscape: engineering visible double tops and bottoms to concentrate liquidity for future stop-clearing campaigns.',
    metaTitle: 'BSL & SSL Liquidity Pool Architecture — Deep Sub-Concept | LearnSMC',
    metaDescription: 'Deep dive into retail stop loss clusters, equal highs/lows engineering, and how institutional algorithms harvest liquidity.',
    keyPoints: [
      'Equal highs (EQH) and equal lows (EQL) are not strong support/resistance; they are engineered liquidity magnets.',
      'Smart money requires large clusters of stops to fill institutional scale orders without moving the price against themselves.'
    ],
    invalidation: 'When price consolidates after a sweep without reversing or displaying displacement.',
    exampleScenario: 'Clean double highs on 15M; London open pops 8 ticks above the double highs, then prints an immediate bearish engulfing candle.'
  },
  {
    id: 'inducement_vs_external_range',
    slug: 'inducement-vs-external-range',
    categorySlug: 'liquidity',
    parentConceptId: 'inducement_vs_external_liquidity',
    name: 'Internal Inducement (IDM) vs. External Range Liquidity',
    subtitle: 'The Timing Trap: Avoiding Pre-Mature Entries Before the Real Sweep',
    shortDefinition: 'Distinguishing minor structural swings that exist purely to bait retail orders (inducement) from high-timeframe swing extremes that trigger real reversals.',
    metaTitle: 'Internal Inducement vs External Liquidity — Deep Sub-Concept | LearnSMC',
    metaDescription: 'Learn to avoid retail bait patterns by understanding how smart money uses internal inducement to fund external range expansions.',
    keyPoints: [
      'Inducement occurs inside the active dealing range.',
      'External range liquidity sits at the high or low of the higher timeframe dealing range.',
      'Trading before external liquidity is swept carries substantially elevated invalidation risk.'
    ],
    invalidation: 'Assuming an internal pullback is a trend reversal when higher timeframe draw on liquidity has not been reached.',
    exampleScenario: 'Traders buy a small 5M order block; price taps it, bounces 5 pips, then obliterates it to hit the major 1H external swing low.'
  },

  // Market Structure Sub-Concepts
  {
    id: 'bos_vs_mss_breakdowns',
    slug: 'bos-vs-mss-breakdowns',
    categorySlug: 'structure',
    parentConceptId: 'market_structure_bos_mss_choch',
    name: 'Break of Structure (BOS) vs. Market Structure Shift (MSS)',
    subtitle: 'Trend Continuation vs. Liquidity-Swept Reversal Signature',
    shortDefinition: 'Crucial structural comparison: BOS marks trend continuation in an existing trend; MSS marks a violent trend reversal following an external liquidity sweep.',
    metaTitle: 'BOS vs MSS Structural Mechanics — Deep Sub-Concept | LearnSMC',
    metaDescription: 'Detailed structural guide comparing Break of Structure continuation with Market Structure Shift reversal signatures and displacement.',
    keyPoints: [
      'BOS occurs in the direction of the established trend.',
      'MSS requires a prior liquidity sweep into a higher timeframe PD array and must break structure with energetic displacement.'
    ],
    invalidation: 'Wick-only penetrations of swing points without candle body closure do not qualify as true MSS.',
    exampleScenario: 'Uptrend prints higher highs; price sweeps the previous day high, then drops with 3 massive down-candles breaking the recent swing low—confirming an MSS.'
  },

  // Time & Sessions Sub-Concepts
  {
    id: 'power_of_three_amd_phases',
    slug: 'power-of-three-amd-phases',
    categorySlug: 'time-and-sessions',
    parentConceptId: 'power_of_three_amd',
    name: 'Power of Three (PO3 / AMD) Phase Anatomy',
    subtitle: 'Accumulation, Manipulation & Distribution Across Intraday Bars',
    shortDefinition: 'The fundamental heartbeat of candlestick formation: open, fakeout against bias (Judas swing), true expansion leg, and close.',
    metaTitle: 'Power of Three (PO3 / AMD) Phase Anatomy — Deep Sub-Concept | LearnSMC',
    metaDescription: 'Step-by-step breakdown of Accumulation, Manipulation, and Distribution across daily, 4-hour, and 15-minute candlestick delivery.',
    keyPoints: [
      'Open price is the benchmark: in a bullish candle, the low is engineered below the open.',
      'Manipulation traps breakout traders on the wrong side before the true move unfolds.'
    ],
    invalidation: 'Price failing to expand after manipulation and closing back inside the initial accumulation range.',
    exampleScenario: 'EUR/USD consolidates in Asian session (Accumulation); London open drops 25 pips below Asian low (Manipulation); then rallies 80 pips (Distribution).'
  },

  // Trade Models Sub-Concepts
  {
    id: 'ict_2022_and_silver_bullet_mechanics',
    slug: 'ict-2022-and-silver-bullet-mechanics',
    categorySlug: 'trade-models',
    parentConceptId: 'ict_2022_model',
    name: 'ICT 2022 Mentorship & Silver Bullet Mechanics',
    subtitle: 'Mechanical Entry Rules, Time Windows & FVG Retracement Protocols',
    shortDefinition: 'Step-by-step execution protocol for the two most popular mechanical ICT models: the 2022 model and the 60-minute Silver Bullet algorithm.',
    metaTitle: 'ICT 2022 Model & Silver Bullet Execution — Deep Sub-Concept | LearnSMC',
    metaDescription: 'Actionable trading protocol combining the ICT 2022 setup with the 10:00-11:00 AM NY Silver Bullet time window for model-based setups.',
    keyPoints: [
      'Step 1: Wait for higher timeframe liquidity sweep or PD array tap.',
      'Step 2: Require 1-5 minute displacement candle creating an unmistakable FVG.',
      'Step 3: Enter with limit order at the near boundary of the FVG with stop placed beyond the swing extreme.'
    ],
    invalidation: 'If the FVG is completely breached before reaching the profit target.',
    exampleScenario: 'At 10:05 AM NY time, NQ sweeps 15M high, prints MSS on 1M with a 12-point FVG; limit buy/sell fills at 10:12 AM and runs to the discount target.'
  }
];

// Helper: resolve concept by slug or id
export function getConceptBySlugOrId(identifier: string): ConceptSlugMapping | undefined {
  const clean = identifier.toLowerCase().replace(/^\/+|\/+$/g, '');
  // direct id check
  if (CONCEPT_SLUG_MAP[clean]) return CONCEPT_SLUG_MAP[clean];
  // slug check
  return Object.values(CONCEPT_SLUG_MAP).find(c => c.slug === clean || c.id === clean);
}

// Helper: resolve deep sub-concept by slug
export function getDeepSubConceptBySlug(slug: string, categorySlug?: string): DeepSubConceptInfo | undefined {
  const clean = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
  return DEEP_SUB_CONCEPTS.find(sc => {
    if (sc.slug === clean) {
      if (categorySlug) return sc.categorySlug === categorySlug;
      return true;
    }
    return false;
  });
}

// 4. Clean Canonical Path Generators
export function getGlossaryRootPath(): string {
  return '/tools/glossary/';
}

export function getGlossaryCategoryPath(categorySlug: string): string {
  const clean = categorySlug.toLowerCase().replace(/^\/+|\/+$/g, '');
  return `/tools/glossary/${clean}/`;
}

export function getGlossaryConceptPath(conceptSlugOrId: string, categorySlug?: string): string {
  const mapping = getConceptBySlugOrId(conceptSlugOrId);
  const cat = categorySlug || mapping?.categorySlug || 'foundations';
  const cSlug = mapping?.slug || conceptSlugOrId.toLowerCase().replace(/^\/+|\/+$/g, '').replace(/_/g, '-');
  return `/tools/glossary/${cat}/${cSlug}/`;
}

export function getGlossarySubConceptPath(categorySlug: string, subConceptSlug: string): string {
  const cat = categorySlug.toLowerCase().replace(/^\/+|\/+$/g, '');
  const sub = subConceptSlug.toLowerCase().replace(/^\/+|\/+$/g, '');
  return `/tools/glossary/${cat}/${sub}/`;
}

// 5. Resolved Glossary URL State for Router
export interface ResolvedGlossaryState {
  viewMode: 'root' | 'category' | 'concept' | 'sub_concept';
  categorySlug?: string;
  categoryInfo?: GlossaryCategoryInfo;
  conceptId?: string;
  conceptMapping?: ConceptSlugMapping;
  subConceptInfo?: DeepSubConceptInfo;
  activeSubTab?: 'overview' | 'tripartite' | 'anatomy' | 'traps_counterexamples' | 'ladder' | 'rules_invalidation';
  canonicalUrl: string;
  cleanPath: string;
  metaTitle: string;
  metaDescription: string;
}

/**
 * Universal Glossary URL Resolver
 * Handles paths like:
 * - /tools/glossary/
 * - /tools/glossary/order-blocks/
 * - /tools/glossary/order-blocks/order-block/
 * - /tools/glossary/order-blocks/mitigation-and-breakers/
 * - /tools/glossary/order-block/ (direct concept shorthand)
 * - /tools/concepts/... (legacy backward compatibility)
 */
export function resolveGlossaryUrl(pathname: string): ResolvedGlossaryState {
  const clean = pathname.toLowerCase().replace(/\/$/, '') || '/';
  const segments = clean.split('/').filter(Boolean);

  // default root
  const defaultState: ResolvedGlossaryState = {
    viewMode: 'root',
    canonicalUrl: 'https://learnsmc.xyz/tools/glossary/',
    cleanPath: '/tools/glossary/',
    metaTitle: 'ICT & Smart Money Concepts Glossary & Encyclopedia | LearnSMC',
    metaDescription: 'Comprehensive, searchable glossary of 41+ institutional trading concepts, market structure definitions, Fair Value Gaps, and execution models.'
  };

  // Not a glossary route
  if (!clean.includes('/tools/glossary') && !clean.includes('/tools/concepts')) {
    return defaultState;
  }

  // Find index of 'glossary' or 'concepts'
  const rootIndex = segments.findIndex(s => s === 'glossary' || s === 'concepts');
  if (rootIndex === -1 || rootIndex === segments.length - 1) {
    return defaultState;
  }

  const subSegments = segments.slice(rootIndex + 1);
  const first = subSegments[0];
  const second = subSegments[1];
  const third = subSegments[2];

  // Case A: First segment is a category (e.g., 'order-blocks')
  const matchedCategory = getCategoryBySlugOrId(first);
  if (matchedCategory) {
    if (!second) {
      // /tools/glossary/order-blocks/
      return {
        viewMode: 'category',
        categorySlug: matchedCategory.slug,
        categoryInfo: matchedCategory,
        canonicalUrl: `https://learnsmc.xyz/tools/glossary/${matchedCategory.slug}/`,
        cleanPath: `/tools/glossary/${matchedCategory.slug}/`,
        metaTitle: matchedCategory.metaTitle,
        metaDescription: matchedCategory.metaDescription
      };
    }

    // Check if second segment is a Deep Sub-Concept (e.g., /tools/glossary/order-blocks/mitigation-and-breakers/)
    const deepSub = getDeepSubConceptBySlug(second, matchedCategory.slug);
    if (deepSub) {
      return {
        viewMode: 'sub_concept',
        categorySlug: matchedCategory.slug,
        categoryInfo: matchedCategory,
        conceptId: deepSub.parentConceptId,
        subConceptInfo: deepSub,
        canonicalUrl: `https://learnsmc.xyz/tools/glossary/${matchedCategory.slug}/${deepSub.slug}/`,
        cleanPath: `/tools/glossary/${matchedCategory.slug}/${deepSub.slug}/`,
        metaTitle: deepSub.metaTitle,
        metaDescription: deepSub.metaDescription
      };
    }

    // Check if second segment is a Main Concept (e.g., /tools/glossary/order-blocks/order-block/)
    const matchedConcept = getConceptBySlugOrId(second);
    if (matchedConcept) {
      // If there's a third segment, check if it's a sub-concept or sub-tab
      if (third) {
        const deepSubThird = getDeepSubConceptBySlug(third, matchedCategory.slug);
        if (deepSubThird) {
          return {
            viewMode: 'sub_concept',
            categorySlug: matchedCategory.slug,
            categoryInfo: matchedCategory,
            conceptId: matchedConcept.id,
            conceptMapping: matchedConcept,
            subConceptInfo: deepSubThird,
            canonicalUrl: `https://learnsmc.xyz/tools/glossary/${matchedCategory.slug}/${deepSubThird.slug}/`,
            cleanPath: `/tools/glossary/${matchedCategory.slug}/${deepSubThird.slug}/`,
            metaTitle: deepSubThird.metaTitle,
            metaDescription: deepSubThird.metaDescription
          };
        }
      }

      return {
        viewMode: 'concept',
        categorySlug: matchedCategory.slug,
        categoryInfo: matchedCategory,
        conceptId: matchedConcept.id,
        conceptMapping: matchedConcept,
        canonicalUrl: `https://learnsmc.xyz/tools/glossary/${matchedCategory.slug}/${matchedConcept.slug}/`,
        cleanPath: `/tools/glossary/${matchedCategory.slug}/${matchedConcept.slug}/`,
        metaTitle: matchedConcept.metaTitle,
        metaDescription: matchedConcept.metaDescription
      };
    }
  }

  // Case B: First segment is directly a Concept slug (e.g. /tools/glossary/order-block/ or /tools/concepts/fair_value_gap)
  const directConcept = getConceptBySlugOrId(first);
  if (directConcept) {
    const parentCat = getCategoryBySlugOrId(directConcept.categorySlug) || GLOSSARY_CATEGORIES[0];
    return {
      viewMode: 'concept',
      categorySlug: directConcept.categorySlug,
      categoryInfo: parentCat,
      conceptId: directConcept.id,
      conceptMapping: directConcept,
      canonicalUrl: `https://learnsmc.xyz/tools/glossary/${directConcept.categorySlug}/${directConcept.slug}/`,
      cleanPath: `/tools/glossary/${directConcept.categorySlug}/${directConcept.slug}/`,
      metaTitle: directConcept.metaTitle,
      metaDescription: directConcept.metaDescription
    };
  }

  // Case C: First segment is directly a Deep Sub-Concept
  const directSub = getDeepSubConceptBySlug(first);
  if (directSub) {
    const parentCat = getCategoryBySlugOrId(directSub.categorySlug) || GLOSSARY_CATEGORIES[0];
    return {
      viewMode: 'sub_concept',
      categorySlug: directSub.categorySlug,
      categoryInfo: parentCat,
      conceptId: directSub.parentConceptId,
      subConceptInfo: directSub,
      canonicalUrl: `https://learnsmc.xyz/tools/glossary/${directSub.categorySlug}/${directSub.slug}/`,
      cleanPath: `/tools/glossary/${directSub.categorySlug}/${directSub.slug}/`,
      metaTitle: directSub.metaTitle,
      metaDescription: directSub.metaDescription
    };
  }

  // Fallback to root
  return defaultState;
}

// 6. Contextual Keyword Matching Mesh for Cross-Linking
export interface KeywordCrossLink {
  term: string;
  url: string;
  tooltip: string;
  badge: string;
}

export const KEYWORD_CROSS_LINKS: KeywordCrossLink[] = [
  {
    term: 'Order Block',
    url: '/tools/glossary/order-blocks/order-block/',
    tooltip: 'Institutional origin candle before displacement that breaks structure.',
    badge: 'PD Array'
  },
  {
    term: 'Order Blocks',
    url: '/tools/glossary/order-blocks/',
    tooltip: 'Institutional accumulation and distribution blocks.',
    badge: 'Category'
  },
  {
    term: 'Breaker Block',
    url: '/tools/glossary/order-blocks/breaker-block/',
    tooltip: 'Violated Order Block that swept liquidity before being broken.',
    badge: 'PD Array'
  },
  {
    term: 'Breaker Blocks',
    url: '/tools/glossary/order-blocks/breaker-block/',
    tooltip: 'Violated Order Blocks flipping polarity to opposing support/resistance.',
    badge: 'PD Array'
  },
  {
    term: 'Mitigation Block',
    url: '/tools/glossary/order-blocks/mitigation-and-breakers/',
    tooltip: 'Failed Order Block that did not sweep liquidity before breaking.',
    badge: 'Sub-Concept'
  },
  {
    term: 'Fair Value Gap',
    url: '/tools/glossary/imbalances/fair-value-gap/',
    tooltip: '3-candle price imbalance created by aggressive displacement.',
    badge: 'Imbalance'
  },
  {
    term: 'Fair Value Gaps',
    url: '/tools/glossary/imbalances/fair-value-gap/',
    tooltip: '3-candle price imbalances created by aggressive displacement.',
    badge: 'Imbalance'
  },
  {
    term: 'FVG',
    url: '/tools/glossary/imbalances/fair-value-gap/',
    tooltip: 'Fair Value Gap: 3-candle price imbalance.',
    badge: 'Imbalance'
  },
  {
    term: 'Inverse Fair Value Gap',
    url: '/tools/glossary/imbalances/inverse-fair-value-gap/',
    tooltip: 'Fair Value Gap that was violated and inverted its role.',
    badge: 'Inversion'
  },
  {
    term: 'IFVG',
    url: '/tools/glossary/imbalances/inverse-fair-value-gap/',
    tooltip: 'Inverse Fair Value Gap: violated FVG role inversion.',
    badge: 'Inversion'
  },
  {
    term: 'Consequent Encroachment',
    url: '/tools/glossary/imbalances/consequent-encroachment/',
    tooltip: 'The exact 50% midpoint of a Fair Value Gap or wick range.',
    badge: 'Midpoint'
  },
  {
    term: 'Buy Side Liquidity',
    url: '/tools/glossary/liquidity/buy-side-liquidity/',
    tooltip: 'Stop-loss clusters and buy orders resting above swing highs.',
    badge: 'Liquidity'
  },
  {
    term: 'BSL',
    url: '/tools/glossary/liquidity/buy-side-liquidity/',
    tooltip: 'Buy Side Liquidity: buy stops resting above swing highs.',
    badge: 'Liquidity'
  },
  {
    term: 'Sell Side Liquidity',
    url: '/tools/glossary/liquidity/sell-side-liquidity/',
    tooltip: 'Stop-loss clusters and sell orders resting below swing lows.',
    badge: 'Liquidity'
  },
  {
    term: 'SSL',
    url: '/tools/glossary/liquidity/sell-side-liquidity/',
    tooltip: 'Sell Side Liquidity: sell stops resting beneath swing lows.',
    badge: 'Liquidity'
  },
  {
    term: 'Market Structure Shift',
    url: '/tools/glossary/structure/market-structure-bos-mss-choch/',
    tooltip: 'Displacement breaking structure after a liquidity sweep.',
    badge: 'Structure'
  },
  {
    term: 'MSS',
    url: '/tools/glossary/structure/market-structure-bos-mss-choch/',
    tooltip: 'Market Structure Shift: structural change with displacement.',
    badge: 'Structure'
  },
  {
    term: 'Break of Structure',
    url: '/tools/glossary/structure/bos-vs-mss-breakdowns/',
    tooltip: 'Trend-continuation break beyond prior swing high/low.',
    badge: 'Structure'
  },
  {
    term: 'BOS',
    url: '/tools/glossary/structure/bos-vs-mss-breakdowns/',
    tooltip: 'Break of Structure: trend continuation signal.',
    badge: 'Structure'
  },
  {
    term: 'Displacement',
    url: '/tools/glossary/imbalances/displacement/',
    tooltip: 'Energetic, long-bodied candle movement showing institutional intent.',
    badge: 'Engine'
  },
  {
    term: 'Power of Three',
    url: '/tools/glossary/time-and-sessions/power-of-three-amd/',
    tooltip: 'Accumulation, Manipulation (Judas swing), and Distribution.',
    badge: 'Cycle'
  },
  {
    term: 'PO3',
    url: '/tools/glossary/time-and-sessions/power-of-three-amd/',
    tooltip: 'Power of Three: Accumulation, Manipulation, Distribution.',
    badge: 'Cycle'
  },
  {
    term: 'Inducement',
    url: '/tools/glossary/liquidity/inducement-vs-external-liquidity/',
    tooltip: 'Internal range swing points engineered to trap premature traders.',
    badge: 'Liquidity'
  },
  {
    term: 'Killzone',
    url: '/tools/glossary/time-and-sessions/sessions-killzones/',
    tooltip: 'High-volatility algorithmic time window (London, NY AM, NY PM).',
    badge: 'Time'
  },
  {
    term: 'Killzones',
    url: '/tools/glossary/time-and-sessions/sessions-killzones/',
    tooltip: 'Algorithmic time windows for peak institutional execution.',
    badge: 'Time'
  },
  {
    term: 'Optimal Trade Entry',
    url: '/tools/delivery-suite/',
    tooltip: '62% - 79% Fibonacci retracement sweet spot into a key PD array.',
    badge: 'Tool'
  },
  {
    term: 'OTE',
    url: '/tools/delivery-suite/',
    tooltip: 'Optimal Trade Entry: 62% to 79% retracement level.',
    badge: 'Tool'
  },
  {
    term: 'SMT Divergence',
    url: '/tools/glossary/trade-models/smt-divergence/',
    tooltip: 'Smart Money Technique: correlated asset swing non-confirmation.',
    badge: 'Model'
  },
  {
    term: 'Silver Bullet',
    url: '/tools/glossary/trade-models/silver-bullet-model/',
    tooltip: '60-minute execution window targeting 15+ ticks into a liquidity draw.',
    badge: 'Model'
  },
  {
    term: 'Chart Lab',
    url: '/tools/chartlab/',
    tooltip: 'Interactive 8-stage candlestick auction and replay laboratory.',
    badge: 'Workbench'
  },
  {
    term: 'Trade Simulator',
    url: '/tools/simulator/',
    tooltip: 'Simulate order entries, limits, and fills with slippage modeling.',
    badge: 'Workbench'
  },
  {
    term: 'Backtest Lab',
    url: '/tools/backtest/',
    tooltip: 'Calculate win rates, profit factor, and drawdown expectancy curves.',
    badge: 'Workbench'
  }
];
