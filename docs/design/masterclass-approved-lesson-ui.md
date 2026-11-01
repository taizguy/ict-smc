# Approved Masterclass lesson UI — 1 November 2026

The user approved the incremental ICT2022 lesson layout for all29 Masterclass lessons. This supersedes the rejected standalone design/masterclass-study prototype; preserve the existing Field Journal structure and source content.

- Outcomes: lightly tinted card, teal highlighted contextual links in body only.
- Procedure: individual subtle white-to-blue/green gradient cards; unchanged headings, contextual links in description text.
- Operations: numbered pastel rows, native sticky scroll reveal/reverse when the whole stage fits; complete static list on mobile, short windows, reduced motion and before enhancement.
- Review: three desktop cards (mistakes amber, invalidation rose, risk blue), corresponding dark tints; stack below1100px.
- Remove the duplicate Related PD arrays list; preserve the lesson-specific Related rail.
- FAQ: separate tinted cards, single-open, no chevron symbol, gentle grid-row/opacity transition, reduced-motion fallback. Answers remain in static HTML. Source-inspired questions identify the question research separately from authoritative teaching references.
- Preserve URLs, metadata, dates, sources and lesson wording except explicitly approved Q&A additions. Local only until push/deployment authorization.

Implementation: src/components/MasterclassJournal.tsx, MasterclassCatalogueBody.tsx, MasterclassScrollSequence.tsx; src/styles/masterclass-journal.css.
