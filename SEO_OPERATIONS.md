# Search and publisher setup

The production build creates static HTML for every published document, a canonical-only sitemap, a real 404 page, and hosting redirect rules. Build with `npm ci` and `npm run build`. The build runs both the existing SEO checks and the complete generated-site crawl. Run `npm run lint` for TypeScript checks.

## Publish and inspect

Deploy `dist` as the static asset directory. Cloudflare Workers uses `src/worker.ts` and the bindings in `wrangler.jsonc`; Cloudflare Pages uses `dist/_redirects`, `dist/_headers` and `dist/404.html`. Vercel uses `vercel.json`. Missing documents must return HTTP 404; never add a catch-all rewrite to the home page. Use one production host, `https://learnsmc.xyz`.

After deploying, inspect `/`, a lesson, a Masood lecture, a playlist, a glossary entry and a made-up URL. Verify titles and canonical URLs before and after JavaScript runs. Confirm actual response headers, redirects and the made-up URL's 404 status at the chosen hosting provider. The code includes HTTPS and lowercase document redirects in the Cloudflare Worker; other providers should configure equivalent host and URL normalization at the edge.

## Google Search Console

Use a DNS Domain property where possible. Alternatively set `GOOGLE_SITE_VERIFICATION` to the verification token before building; the static HTML will include the verification meta tag. Do not put private account credentials into environment variables exposed to the browser. Submit `https://learnsmc.xyz/sitemap.xml`, inspect representative URLs and use Search Console's rendered HTML view to confirm their content. A sitemap helps discovery; Google decides whether to index pages.

The sitemap deliberately omits artificial build-date `lastmod` values. Add source-managed modification dates only when the actual page content changes. Personal journal and mastery-profile routes, and the publisher advertising status page, use `noindex, follow` and are omitted from the sitemap. Do not disallow these pages in robots.txt: crawlers need to see their noindex directives. Robots.txt remains open to search, AdSense and AI crawlers.

## AdSense and consent: complete before enabling ads

Ads are off unless `VITE_ADSENSE_ENABLED=true` is explicitly supplied at build time. The publisher account meta tag and ads.txt remain available for verification. Before enabling ads, open AdSense → Privacy & messaging and create/publish the European regulations message for learnsmc.xyz, or integrate another Google-certified TCF CMP. Check the regions, vendor choices, withdrawal control and the actual consent behavior with a fresh browser profile. The site's optional advertising preference is an additional gate; it does not replace a certified CMP or certify legal compliance.

The site uses Auto ads and fresh document navigation. It does not call Google Ad Manager's `googletag.pubads().refresh()` or repeatedly request new AdSense units. Optional advertising is off until a visitor allows it; withdrawing the choice reloads the document to stop existing ad scripts. Auto ads are excluded from error, policy, contact, personal journal, profile and interactive calculator pages. In AdSense, review Auto ads previews and exclusions: reserve appropriate space and keep ads away from tool controls and other clickable elements. Actual placement and CLS must be checked after real ads serve; source code cannot validate Google-selected placements.

## Topic clusters and useful citations

Curriculum topic hubs link to their lessons; lessons link to related lessons and their parent cluster. The six Abdullah Masood playlist hubs link to complete video study pages, and those pages link back to their series and original video sources. Contextual term links are included in initial HTML and in React. The author of the written notes is Muhammad Umer Ijaz; video sources are credited separately. No endorsement or peer review by a source educator is claimed.

For earned links, maintain useful original explanations, reproducible examples, diagrams, source notes and corrections. Prioritize pages that already get impressions in Search Console; improve their explanations and source evidence. Prepare a short list of relevant educators and trading education resources that could find those pages useful, then request human approval before any outreach messages are sent. Do not buy links, create fake recommendations, mass-post comments, or present outbound citations as backlinks. New external backlinks require a third-party site to choose to link to LearnSMC.

## Ongoing content quality

The automated crawl checks technical completeness, not the truth of trading claims, copyright permissions, legal adequacy or expertise. Check financial statements and numerical claims against reliable sources; distinguish a framework's interpretation from established market mechanics, explain failure cases, and avoid certainty about returns. The site has no verified publication dates for source videos, so it does not fabricate VideoObject upload dates or rich-result eligibility. Keep original notes substantive, maintain source links and review external embeds for availability.
