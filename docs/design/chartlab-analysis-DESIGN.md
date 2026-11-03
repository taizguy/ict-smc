---
name: LearnSMC Chart Lab analysis workspace
description: Surface-specific extraction of the chart-led Chart Lab redesign; not global identity.
colors:
  accent: "#155fd4"
  ink: "#202a36"
  muted: "#536170"
  rule: "#dce2e8"
  soft: "#f5f7fa"
  selected: "#eaf1fc"
  dark-accent: "#86baff"
  dark-ink: "#edf1f6"
  dark-muted: "#b2bdca"
  dark-rule: "#373e48"
  dark-soft: "#1d2229"
  dark-selected: "#21334b"
typography:
  headline:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "clamp(1.5rem,2.5vw,2.15rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.025em"
  title:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.375rem"
    lineHeight: 1.25
    letterSpacing: "-.02em"
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.75
  label:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: ".8125rem"
rounded:
  control: "5px"
  workspace: "0px"
spacing:
  compact: "8px"
  control: "12px"
  panel: "22px"
  rail-gap: "28px"
  reading-gap: "40px"
  section-gap: "64px"
components:
  primary-action:
    backgroundColor: "{colors.accent}"
    textColor: "#fff"
    rounded: "{rounded.control}"
    padding: "11px 16px"
  study-step-current:
    backgroundColor: "{colors.selected}"
    textColor: "{colors.ink}"
    rounded: "{rounded.workspace}"
    padding: "16px 8px"
  task-panel:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    padding: "22px"
---

# Design System: LearnSMC Chart Lab analysis workspace

## Overview

**Creative North Star: "Chart-led analysis workspace"**

This specification applies only to Chart Lab root and its six scenario routes, in English and Urdu. It records the direction authorized for this page and extracted from `src/styles/chartlab-analysis.css` and `src/components/ChartLab.tsx`. It does not replace LearnSMC identity, the historical rejected Masterclass prototype, or another tool's design.

The chart is the largest working region. Precise rules, compact controls and a six-stage study rail keep attention on observing evidence in sequence. The existing exercise supplies the interaction; supporting reading and the scenario library follow the working surface.

**Key Characteristics:**
- Neutral inherited canvas with restrained blue interaction cues.
- Flat ruled workspace with a quiet adjacent task surface.
- Preserved exercise, keyboard access, themes, Urdu and reduced motion.

Engine 0.1.5 and its launcher were unavailable; no successful context, seed, comp or detector run is claimed. This is a source extraction, not an engine-generated identity or deployment authorization.

## Colors

### Primary
The `accent` blue identifies actions, links and focus; `selected` supplies a quiet current-step or pressed-state fill. Dark theme switches these to `dark-accent` and `dark-selected`.

### Neutral
`ink`, `muted`, `rule` and `soft` distinguish primary text, supporting text, boundaries and the task surface. Their `dark-` counterparts switch together. Page canvas remains inherited: white in light theme and the existing neutral dark canvas in dark theme. Chart evidence colors remain chart semantics, not new page identity tokens.

## Typography

Source Sans 3 uses the existing `--font-sans` stack. Preserve the inherited Urdu font override with Noto Naskh Arabic; do not substitute Latin typography for Urdu text. The frontmatter headline is the page H1; title is the task heading; body describes supporting reading. Task text uses `.9375rem` with `1.65` leading. Small captions and labels use `.8125rem`; study-step text uses `.875rem`. Supporting reading measures up to `72ch`; orientation up to `76ch`.

## Layout

The Chart Lab suite has a `1480px` maximum width and `clamp(0px,1.2vw,20px)` inline padding. Desktop study layout is a `156px` rail plus flexible workspace with `28px` gap. The workspace holds flexible chart plus `300px` task panel. The rail sticks at `90px`. Reading uses `1.2fr / 1fr` columns and a `40px` gap; section spacing is `64px`.

At `1150px`, rail becomes `120px`, gap `18px` and task panel `270px`. At `900px`, the desk stacks and all six study stages remain visible in three columns; reading becomes one column. At `680px`, chart and task stack, the task precedes the chart through the inherited phone ordering, the scenario library becomes one column and section spacing becomes `40px`. Above `680px`, the chart remains left of the task. Preserve logical text direction and left-to-right chart geometry.

## Elevation & Depth

Flat tonal layering and one-pixel rules convey grouping. Chart Lab controls, header and answer surfaces remove resting shadows. No glow or invented elevation is needed. Focus is a `2px` accent outline with `3px` offset.

## Shapes

Controls, answer surfaces, feedback and premise use `5px` corners. Workspace boundaries and rail rows stay square. Do not turn reading sections into repeated cards. Controls retain `44px` minimum height.

## Components

### Buttons / Fields
Buttons, summaries and selects share ink, transparent surface, rule border and `5px` corners. Hover uses the soft surface without movement. Primary actions use accent and white text; dark primary text is `#10243e`. Pressed controls use selected fill and accent border. Hint links are underlined rather than filled. Keep inherited field behavior and accessibility.

### Study Rail
Six numbered rows use bottom rules, muted labels and no circular badges. The current step uses selected fill, ink text and an accent number. Row background and text transition over `180ms ease-out`.

### Workspace / Task Panel
Caption, replay controls, chart, key and context share one ruled chart column. The task panel uses soft fill and an inline-start rule; on phones its boundary becomes a top rule. Answer selection, feedback, restart and case changes retain the existing exercise behavior. Keep the free crosshair and neutral background work intact.

### Reading / Scenario Navigation
Reading is open text below the workspace. The two-column scenario index uses two-digit tabular counters, ruled rows and underlined links; the current scenario uses heavier text. Preserve all six scenario routes and existing content bindings.

## Do's and Don'ts

- **Do** scope these rules to `.wb-suite[data-workbench-tool=chartlab]` and its Chart Lab descendants.
- **Do** preserve exercise logic, educational provenance, focus, themes and reduced-motion behavior. Reduced motion disables scoped transitions and animation.
- **Do** keep the chart dominant and the current task readable alongside it or before it on phones.
- **Don't** infer global brand rules from this page or reuse the rejected Masterclass prototype as authority.
- **Don't** invent market data, credentials, performance claims or successful engine gates.
- **Don't** publish, push or deploy on the basis of this document.
