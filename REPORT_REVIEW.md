# LearnSMC: verification of the supplied SEO and GEO reports

Reviewed: 16 October 2026 (Asia/Karachi). Scope: both supplied PDFs, current main branch, public HTTP responses, all generated pages, and browser rendering. Report scores are vendor heuristics, not Google approval or ranking scores.

## Finding-by-finding assessment

| Report finding | Verification | Action / limit |
|---|---|---|
| No homepage H1; only 62 words | Incorrect for initial HTML: one H1 and about 299 words including navigation. Report heading list contains only the privacy banner. A transient React loading view could expose little content. | Preserve the published article during module loading; add a browser check that deliberately delays the homepage module. Expand useful homepage explanations. |
| Advertising keyword stuffing | Not established. The reported sample consists almost entirely of privacy UI. | Do not alter consent wording to manipulate density; fix transient content loss. |
| Snippets blocked | Incorrect: no restrictive snippet directive in live HTML or headers. | Add a regression assertion; retain normal indexing directives. |
| Homepage title too long | Confirmed (75 characters). | Replace with “Learn ICT & Smart Money Concepts | LearnSMC” (41 characters). |
| Description too wide | Pixel cutoff depends on display; previous description was long. | Shorter, factual homepage description. |
| Text-to-HTML ratio / reading grade | Heuristic, not an indexing requirement. | Plain-language explanations and practice example; no markup deletion or arbitrary word padding. |
| Missing font swap / preload | Incorrect: Google Fonts URLs already include display=swap and stylesheet preload. | Preserve existing strategy. Font file preloading is optional and should not guess remote font URLs. |
| No compression / Brotli / HTTP/3 | Incorrect live: content-encoding=br and alt-svc=h3 are present. | No server change needed. |
| Core Web Vitals pass | Not proven by HTML heuristics or a single Lighthouse run. | No field-performance guarantee. Use GSC/CrUX and representative mobile lab measurements. |
| Missing Permissions-Policy | Confirmed. | Disable unused camera, microphone and geolocation permissions; preserve video and fullscreen behavior. |
| HSTS missing preload/includeSubDomains | True, but not automatically a defect. | Keep existing one-year HSTS. Subdomain-wide enforcement/preload needs a complete subdomain inventory and explicit operational decision. |
| Missing skip navigation | Confirmed. | Add keyboard-visible skip link and focusable main target in static and interactive views. |
| Schema missing @type | False positive: JSON-LD root uses @context + @graph; entities inside the graph have types. | Preserve valid graph representation. |
| Missing author/byline | Existing lessons and Masood notes already have Muhammad Umer Ijaz attribution. Homepage had weaker visible attribution. | Add homepage attribution; extend Person schema and visible About/Contact with supplied email, phone and address. |
| Missing author expertise | No verified qualifications were supplied. | Describe confirmed authorship only; request exact profiles/qualifications. Do not invent trading credentials. |
| Missing physical address | Confirmed. | Add the address supplied by the user to About/Contact and Person schema. |
| Missing editorial policy | Policy text already existed, but no explicit stable policy anchor. | Add editorial-policy anchor and clear links. |
| Missing dates | Confirmed on lessons; original publication/review dates are not stored. | Add truthful update dates only to pages substantively changed in this revision. Do not claim all 171 lessons/videos were reviewed today. Original lesson dates still need source history or author records. |
| Missing trust badges/reviews | Absence is real, but badges are not mandatory. | No fabricated testimonials, certifications or review counts. |
| Missing YMYL disclaimer | Incorrect for static lessons/tools and Masood notes; disclaimer exists inside content. Homepage lacked one. | Add homepage disclaimer and tool guidance notice; retain existing notices. |
| Repetitive disclaimers open pages | Not true of published static articles: title, introduction and unique body precede the end notice. | Preserve end-of-content notices. Add specific tool explanations rather than removing risk disclosures. |
| Shallow tool/masterclass pages | Partly confirmed: several directory/state pages have short explanations. Word count alone is not a quality threshold. | Shared, tool-specific input, practice and limitation guidance in static and React views; expand homepage/curriculum. Keep detailed lessons, rules and examples. Further original case studies require author review. |
| Missing semantic comparison tables | Confirmed. | Add accessible tables with captions, column/row headers and horizontal scrolling to comparison documents and the interactive view. |
| Missing FAQPage / QAPage / HowTo | Markup absent, but recommendation overstates eligibility. Existing instructional sections are not necessarily FAQs or user-submitted Q&A. | Do not mislabel pages. Google limits FAQ rich results to eligible government/health sites; HowTo rich results were retired. |
| Missing Article schema | LearningResource with author is already appropriate for study notes. | Do not relabel every tool, directory and privacy policy as an article. |
| Missing VideoObject / Clip | Confirmed absent. A source link is not enough for a complete video result. Verified upload dates/durations are missing. | Retain honest video citations. Video markup and indexing require verified metadata and a qualifying visible watch experience; no invented uploadDate, duration or timestamps. |
| Missing Organization sameAs | Confirmed absent. Report claims @learnsmc ownership without evidence supplied by owner. | Await verified official profile URLs. Abdullah Masood's source channel must not become LearnSMC's sameAs. |
| AI bots blocked | Confirmed in live robots.txt; restrictions are inserted by Cloudflare, not the repository file. OAI-SearchBot and PerplexityBot are not explicitly blocked. | Ask owner whether to allow user-requested AI readers while retaining training restrictions. Account settings remain a separate pending action. |
| Blocking GPTBot prevents ChatGPT Search; Google-Extended prevents AI Overviews | Incorrect conflation of training, search and user-requested agents. | Preserve distinction. Google Search AI features use Googlebot; OpenAI search uses OAI-SearchBot independently of GPTBot. |
| Missing llms.txt / llms-full.txt | Confirmed. Optional files, not a Google indexing requirement. | Generate an attributed reading guide and canonical page directory; link from the document head. No promised ranking benefit. |
| Missing Reddit/Wikipedia/Wikidata/LinkedIn | Not proven by repository inspection or vendor searches. | External authority work remains separate. Do not fabricate profiles or publish promotional encyclopedia entries. Verified earned citations and useful community contributions require real work and user-authorized outreach. |
| Social sharing buttons absent | Optional usability feature, not an indexing defect. | Existing OpenGraph/Twitter metadata retained; avoid adding third-party tracking widgets. |
| noscript in head | Not inherently invalid: a stylesheet link fallback is permitted with scripting disabled. | Retain functioning font fallback. |
| Mobile/performance warnings | Reports disagree (GEO mobile warning vs SEO mobile pass); no evidence of a specific mobile failure provided. | Browser coverage includes mobile overflow and layout, scripts, consent defaults and navigation. Do not treat estimated CWV as field data. |

## Safety and scope

- Work is isolated on fix/verified-report-findings, starting at the deployed main revision 03e1934.
- Canonical paths, redirects, source-video attribution and advertising consent defaults are preserved.
- No backlinks, public profiles, claims of credentials, reviews or third-party account changes are fabricated.
- Contact details are public because the owner explicitly supplied them for author information.
- Auto ads remain gated by the existing build setting and consent checks.

## Authoritative references

- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google crawler distinctions: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers
- OpenAI crawler distinctions: https://developers.openai.com/api/docs/bots
- FAQ/HowTo eligibility changes: https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Video structured data requirements: https://developers.google.com/search/docs/appearance/structured-data/video

## Outstanding evidence / owner input

1. Confirm official LearnSMC/author social profile URLs and any verifiable qualifications.
2. Decide Cloudflare AI reader access policy; training and search access are separate choices.
3. Supply original publication/review records if historical lesson dates are desired.
4. Verify original video metadata before adding VideoObject/Clip markup; existing video links alone do not guarantee video-index eligibility.
5. Measure real-user Core Web Vitals in Search Console; no claim that a vendor's estimated scores are field measurements.
