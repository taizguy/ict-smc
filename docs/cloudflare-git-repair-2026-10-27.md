# Cloudflare Git connection repair — 2026-10-27

Commit `2796090` could not be fetched by Cloudflare. The deployment failed during repository cloning, before dependency installation or the application build. Retrying failed at the same stage. GitHub served the commit successfully, while Cloudflare settings reported an error fetching GitHub user or organization details.

With the owner's approval, reconnected the existing `taizguy/ict-smc` repository. Confirmed `main`, build command `npm run build`, deploy command `npx wrangler deploy`, root `/`, the existing scoped build token, and build caching. GitHub app permissions were not expanded. The account error disappeared and the repository list loaded successfully.

A fresh push is required for the replacement Git connection; old failed build retries belong to the disconnected trigger.
