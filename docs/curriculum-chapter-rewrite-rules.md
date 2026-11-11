# Curriculum rewrite rules

User directions confirmed 10 November 2026. Apply chapter by chapter, preserving unrelated lessons.

- Keep hero placement and the UI of sections below Personal Learning Notes. Update their content to the chapter's actual topic.
- Keep notes, diagram, terms, applied quiz, summary, navigation, completion and review/corrections functions.
- Do not display the Official ICT accounts section in a rewritten lesson.
- Include Related primary sources only when the supplied document provides sources or the user authorises additional verified sources. The user authorised official-source research for Chapter 01.
- One financial education/risk notice per complete document, including the footer. Chapter 01 keeps the in-content notice and suppresses the repeated footer notice.
- Read each whole brief, separate learner text from SEO/design instructions, flag factual concerns and ask for approval before changing supplied wording. Do not publish authoring instructions.
- Keep permanent IDs/slugs. A suggested replacement slug is not permission to discard an established URL.
- Preserve native English/Urdu equivalence, static essential content, schema-to-visible parity and accurate review evidence. Do not invent author credentials, dates, historical examples or data.

## User correction — 10 November 2026
- Never add, skip, condense, correct or change supplied chapter text without asking first. Preserve wording, headings, hierarchy, order, lists and tables. Natural Urdu must match.
- Chapter 01: restore Part 2 verbatim (excluding document-only visual/authoring instructions), retain verified references, use myths and glossary tables, subtle highlights and smoothly animated FAQ cards.
- Original publication date supplied by user: 15 October 2026. Show this and the actual chapter update beside the author. Apply dates chapter by chapter, not as a blanket refresh.
- Part 3 optimisation must not override fidelity or invent credentials, statistics or URLs. Record conflicting recommendations rather than silently changing content.

## Semantic HTML and author privacy — confirmed 11 November 2026
- Rebuilt chapters place their semantic main/article before the heavy library and contents rails in source order; keep the existing visual columns and exactly one main landmark. Preserve keyboard order, skip-link targets and mobile drawer behaviour.
- Primary definitions and formulas use scoped semantic extraction containers. Use itemprop="description" only within a valid itemscope/itemtype, with a matching name; never present a heuristic as an empirical formula. Preserve representative JSON-LD. These attributes do not guarantee AI citations or rankings.
- FAQs use native details/summary with all answers in initial HTML and name-based exclusive groups. Add motion progressively with reduced-motion support; opening/closing must work without JavaScript.
- Person schema contains public identity fields (name, URL, confirmed profiles), not email, telephone, street address or other unnecessary contact details. Public contact-page content is a separate decision.
- Check reader-facing headings, captions and copy for research/authoring labels before release. Do not publish labels such as "Quick Definitions for AI and Skimmers". Keep other supplied copy verbatim; get approval before further editorial changes.
- Verify these conventions in EN/UR, raw HTML, both themes and mobile. Keep actual content-review dates; a technical schema cleanup is not a blanket content refresh.
# Typography standard (user confirmed 11 November 2026)

Body paragraphs and ordinary lists: Source Sans 3 (`var(--font-sans)`), 16px, regular 400, line-height 1.9 / 30.4px. FAQ answers: same family, size and weight, line-height 1.85 / 29.6px. Reuse shared lesson tokens in `src/styles/lesson-semantics.css`; keep headings, captions, tables and controls distinct. Apply to future chapter work across themes and responsive widths, preserving text zoom. Verify computed body and FAQ styles rather than assuming inheritance.
