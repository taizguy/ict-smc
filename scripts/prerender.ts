import { articlePages } from './article-pages';
import { applySitemapDates } from './sitemap-dates';
import { URDU_PUBLISHED } from '../src/i18n/release';
import { generateUrduPages } from './urdu-pages';
import { orderRedirectRules } from './redirect-rules';
import { lessonParagraphs } from '../src/utils/lessonText';
import { articles as writtenArticles, articleImageKey } from '../src/data/articles';
import 'dotenv/config';
import { prepareRoutes, enrichRoute, renderContextualText, canonicalAliases } from './seo-content';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { textbookChapters } from '../src/data/chaptersData.ts';
import { masoodPlaylistsData } from '../src/data/masoodData.ts';
import { ictConcepts } from '../src/data/conceptsData.ts';
import {
  GLOSSARY_CATEGORIES,
  CONCEPT_SLUG_MAP,
  DEEP_SUB_CONCEPTS
} from '../src/utils/glossaryRoutes.ts';
import {
  BASE_URL,
  normalizeCanonicalUrl,
  getLessonCanonicalUrl,
  getLessonPath
} from '../src/utils/url.ts';
import { masterclassCollection } from '../src/data/masterclassData.ts';
import { chartScenarios } from '../src/data/chartScenarios.ts';
import { conceptComparisons } from '../src/data/comparisonsData.ts';
import { quizzes } from '../src/data/quizzesData.ts';
import {
  MASTERCLASS_CATEGORIES,
  getMasterclassSlug,
  getMasterclassCategorySlug,
  getMasterclassUrl,
  CHART_SCENARIOS_META,
  getChartScenarioSlug,
  SIMULATOR_MODELS,
  BACKTEST_STRATEGIES,
  JOURNAL_SECTIONS,
  KNOWLEDGE_GRAPH_STEPS,
  getComparisonSlug,
  MASTERY_EXAMS,
  DELIVERY_SUITE_MODULES
} from '../src/utils/workbenchToolRoutes.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, process.env.PRERENDER_OUT_DIR || 'dist');
const templatePath = path.resolve(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html does not exist. Run "vite build" first.');
  process.exit(1);
}

// Re-running prerender must not nest old page content or retain old JSON-LD.
const templateHtml = fs.readFileSync(templatePath, 'utf-8')
  .replace(/<div id="root">[\s\S]*<\/div>\s*<\/body>/, '<div id="root"></div>\n</body>')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
  .replace(/<meta name="(?:learnsmc-prerendered|learnsmc-heading|learnsmc-status|google-site-verification)"[^>]*>/g, '');

export interface RouteMeta {
  url: string;
  outputPath: string;
  title: string;
  description: string;
  canonical: string;
  heading: string;
  subheading: string;
  badge: string;
  bodyHtml: string;
  schemaJson?: object;
  isNoindex?: boolean;
}

function escapeHtml(val: unknown): string {
  if (val === null || val === undefined) return '';
  if (Array.isArray(val)) {
    return val.map(item => escapeHtml(item)).join(' ');
  }
  const str = typeof val === 'string' ? val : String(val);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generatePrerenderedHtml(meta: RouteMeta): string {
  const chapterCount = textbookChapters.length;
  const lectureCount = masoodPlaylistsData.reduce((sum, p) => sum + p.lectures.length, 0);
  let html = templateHtml.replace(/\b57(?=[- ](?:chapter|Chapter|CHAPTER))/g, String(chapterCount)).replace(/\b52(?=[- ](?:Abdullah|lecture|Lecture|LECTURE|Masterclass|masterclass))/g, String(lectureCount));

  html = html.replace('</head>', '<meta name="learnsmc-prerendered" content="true" /></head>');
  const verification = process.env.GOOGLE_SITE_VERIFICATION;
  if (verification) html = html.replace('</head>', `<meta name="google-site-verification" content="${escapeHtml(verification)}" /></head>`);
  if (/\/(learn|masood\/lectures|articles\/[^/]+)\//.test(meta.canonical)) html = html.replace('property="og:type" content="website"', 'property="og:type" content="article"');
  html = html.replace('</head>', `<meta name="learnsmc-heading" content="${escapeHtml(meta.heading)}" /></head>`);
  if (meta.outputPath === '404.html') html = html.replace('</head>', '<meta name="learnsmc-status" content="404" /></head>');
  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);

  // Replace Description
  html = html.replace(
    /<meta name="description" content="[\s\S]*?" \/>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );

  // Replace Canonical
  html = html.replace(
    /<link rel="canonical" href="[\s\S]*?" \/>/,
    `<link rel="canonical" href="${meta.canonical}" />`
  );

  // Replace OG & Twitter Meta Tags
  html = html.replace(
    /<meta property="og:title" content="[\s\S]*?" \/>/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[\s\S]*?" \/>/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[\s\S]*?" \/>/,
    `<meta property="og:url" content="${meta.canonical}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[\s\S]*?" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[\s\S]*?" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
  );

  if (new URL(meta.canonical).pathname.startsWith('/articles/')) {
    html = html.replace('</head>', '<link rel="alternate" type="application/rss+xml" title="LearnSMC Articles" href="https://learnsmc.xyz/articles/feed.xml" /></head>');
    const article = writtenArticles.find(a => meta.canonical.endsWith(`/articles/${a.slug}/`));
    const image = `https://learnsmc.xyz/images/articles/${article ? articleImageKey(article) : 'decision'}-social.png`;
    html = html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*(" \/>)/g, `$1${image}$2`);
    html = html.replace(/(<meta property="og:image:alt" content=")[^"]*(" \/>)/, '$1Original LearnSMC illustrated trading essay$2');
  }
  // Optional Schema.org JSON-LD injection
  if (meta.schemaJson) {
    const jsonLdString = `<script type="application/ld+json">\n${JSON.stringify(meta.schemaJson, null, 2).replace(/</g, '\\u003c')}\n</script>`;
    html = html.replace('</head>', `  ${jsonLdString}\n  </head>`);
  }

  // Handle Noindex if specified
  if (meta.isNoindex) {
    html = html.replace(
      /<meta name="robots" content="[\s\S]*?" \/>/,
      '<meta name="robots" content="noindex, follow" />'
    );
  }

  // Generate Crawlable Structural Layout
  const renderedContent = `
    <div id="static-content" style="font-family: var(--font-sans, system-ui); background-color: #ffffff; color: #121c32; min-height: 100vh; padding: 2rem 1.5rem; max-width: 1200px; margin: 0 auto; box-sizing: border-box;">
      <style>#static-content a{color:#23796d;text-underline-offset:3px}#static-content p,#static-content li{line-height:1.75;font-size:1rem!important;max-inline-size:68ch}#static-content h1{font-size:clamp(2rem,1.5rem + 2vw,3.5rem)!important;line-height:1.15}#static-content nav{flex-wrap:wrap}#static-content section{margin-block:1.5rem}#static-content li{margin-block:.5rem}#static-content ul{padding-left:1.25rem}</style>
      <a href="#main-content" style="color:#23796d">Skip to main content</a>
      <!-- Crawlable Header -->
      <header style="border-bottom: 1px solid rgba(34,59,53,0.08); padding-bottom: 1.5rem; margin-bottom: 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <a href="/" style="font-weight: 800; font-size: 1.25rem; color: #121c32; text-decoration: none; letter-spacing: -0.02em;">
            LearnSMC <span style="font-size: 0.85rem; color: #23796d; font-weight: normal; font-family: monospace;">// ICT &amp; SMC ACADEMY</span>
          </a>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; color: #4f5d75;">Free Institutional Smart Money Concepts Curriculum &amp; Research Matrix</p>
        </div>
        <nav style="display: flex; gap: 1.25rem; font-size: 0.85rem; font-family: monospace;" aria-label="Main Navigation">
          <a href="/" style="color: #4f5d75; text-decoration: none;">Home</a>
          <a href="/curriculum/" style="color: #4f5d75; text-decoration: none;">57 Chapters</a>
          <a href="/articles/" style="color: #4f5d75; text-decoration: none;">Articles</a>
          <a href="/masood/" style="color: #4f5d75; text-decoration: none;">Masood Academy</a>
          <a href="/tools/" style="color: #4f5d75; text-decoration: none;">Workbench Lab</a>
          <a href="/about/" style="color: #4f5d75; text-decoration: none;">About</a>
        </nav>
      </header>

      <!-- Main Article / Route Body -->
      <main id="main-content" tabindex="-1">
        <article>
          ${new URL(meta.canonical).pathname.startsWith('/articles/') ? '' : `<header style="margin-bottom: 2rem;">
            <div style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; background: rgba(37,101,82, 0.15); border: 1px solid rgba(37,101,82, 0.3); color: #705692; font-size: 0.75rem; font-family: monospace; margin-bottom: 0.75rem;">
              ${escapeHtml(meta.badge)}
            </div>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: #121c32; margin: 0 0 0.75rem 0; letter-spacing: -0.03em; line-height: 1.2;">
              ${escapeHtml(meta.heading)}
            </h1>
            <p style="font-size: 1.1rem; color: #4f5d75; line-height: 1.6; margin: 0;">
              ${escapeHtml(meta.subheading)}
            </p>
          </header>`}

          <div style="background: #ffffff; border: 1px solid rgba(34,59,53,0.08); border-radius: 14px; padding: 2rem; margin-bottom: 3rem;">
            ${meta.bodyHtml}
          </div>
        </article>
      </main>

      <!-- Crawlable Static Footer -->
      <footer style="border-top: 1px solid rgba(34,59,53,0.08); padding-top: 2rem; margin-top: 4rem; font-size: 0.85rem; color: #64748B;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2rem; margin-bottom: 2rem;">
          <div>
            <div style="color: #121c32; font-weight: 600; margin-bottom: 0.5rem;">LearnSMC · ICT &amp; SMC Academy</div>
            <p style="margin: 0; max-width: 400px; line-height: 1.5;">Free, open-access institutional education. Empowering retail traders with institutional auction literacy.</p>
          </div>
          <div style="display: flex; gap: 2rem; font-family: monospace;">
            <div>
              <div style="color: #4f5d75; font-weight: 600; margin-bottom: 0.5rem;">Navigation</div>
              <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
                <li><a href="/" style="color: #4f5d75; text-decoration: none;">Home</a></li>
                <li><a href="/curriculum/" style="color: #4f5d75; text-decoration: none;">Curriculum</a></li>
                <li><a href="/masood/" style="color: #4f5d75; text-decoration: none;">Masood Academy</a></li>
                <li><a href="/tools/" style="color: #4f5d75; text-decoration: none;">Trading Tools</a></li>
              </ul>
            </div>
            <div>
              <div style="color: #4f5d75; font-weight: 600; margin-bottom: 0.5rem;">Legal &amp; Policy</div>
              <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
                <li><a href="/disclaimer/" style="color: #4f5d75; text-decoration: none;">Financial Disclaimer</a></li>
                <li><a href="/privacy/" style="color: #4f5d75; text-decoration: none;">Privacy Policy</a></li>
                <li><a href="/terms/" style="color: #4f5d75; text-decoration: none;">Terms of Service</a></li>
                <li><a href="/about/" style="color: #4f5d75; text-decoration: none;">About Publisher</a></li><li><a href="/about/#editorial-policy">Editorial policy</a></li>
                <li><a href="/contact/" style="color: #4f5d75; text-decoration: none;">Contact Us</a></li>
                <li><a href="/adsense/" style="color: #4f5d75; text-decoration: none;">AdSense Transparency</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style="text-align: center; font-family: monospace; font-size: 0.75rem; border-top: 1px solid rgba(34,59,53,0.04); padding-top: 1.5rem;">
          © 2026 LearnSMC. Published strictly for educational purposes. No financial advice.
        </div>
      </footer>
    </div>
  `;

  // Inject prerendered content into <div id="root">
  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">\n${renderedContent}\n</div>`);
  } else {
    html = html.replace(/<div id="root">[\s\S]*?<\/div>(\s*<script type="module" src="\/src\/main\.tsx"><\/script>)/, `<div id="root">\n${renderedContent}\n</div>$1`);
    if (!html.includes(renderedContent)) {
      html = html.replace(/<div id="root">[\s\S]*?<\/div>(\s*<script type="module" src="\/assets\/[^"]+"><\/script>)/, `<div id="root">\n${renderedContent}\n</div>$1`);
    }
    if (!html.includes(renderedContent)) {
      html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">\n${renderedContent}\n</div>`);
    }
  }

  return html.replace(/\b57(?=[- ](?:chapter|Chapter|CHAPTER))/g, String(chapterCount)).replace(/\b52(?=[- ](?:Abdullah|lecture|Lecture|LECTURE|Masterclass|masterclass))/g, String(lectureCount));
}

// -------------------------------------------------------------
// Route Definitions
// -------------------------------------------------------------

const allRoutes: RouteMeta[] = [];
const sitemapUrls: { loc: string; changefreq: string; priority: string }[] = [];

// 0. Institutional Homepage (Root /)
const homePage: RouteMeta = {
  url: 'https://learnsmc.xyz/',
  outputPath: 'index.html',
  title: 'Learn ICT & Smart Money Concepts | LearnSMC',
  description: 'Study ICT and Smart Money Concepts with free trading lessons, Abdullah Masood video notes, chart exercises and risk education.',
  canonical: 'https://learnsmc.xyz/',
  heading: 'ICT & SMC Institutional Trading Academy',
  subheading: 'Master algorithmic price delivery, fair value gaps, order blocks, and market liquidity through 57 codified chapters and 52 Abdullah Masood masterclasses.',
  badge: 'Institutional Curriculum · Open Access Codex',
  bodyHtml: `
    <section style="margin-bottom: 2.5rem;">
      <h2 style="font-size: 1.5rem; color: #121c32; margin-bottom: 1rem;">Codified Institutional Curriculum</h2>
      <p style="line-height: 1.7; color: #435b50; margin-bottom: 1.5rem;">
        LearnSMC is an open-access educational institution preserving and codifying Smart Money Concepts (SMC) and Inner Circle Trader (ICT) market mechanics.
        Unlike retail technical analysis that relies on lagging indicators and trendlines, our curriculum teaches how central banks, algorithmic market makers,
        and high-frequency matching engines deliver price across electronic auctions.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem;">
        <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1.25rem;">
          <h3 style="font-size: 1.1rem; color: #23796d; margin-top: 0; margin-bottom: 0.5rem;">57 Digital Textbook Chapters</h3>
          <p style="color: #4f5d75; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1rem;">From auction theory and limit order books to complex algorithmic delivery models.</p>
          <a href="/curriculum/" style="color: #705692; text-decoration: none; font-weight: 600; font-size: 0.85rem;">Browse 57 Chapters &rarr;</a>
        </div>
        <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1.25rem;">
          <h3 style="font-size: 1.1rem; color: #23796d; margin-top: 0; margin-bottom: 0.5rem;">52 Abdullah Masood Masterclasses</h3>
          <p style="color: #4f5d75; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1rem;">Curated video lectures, timestamped breakdown notes, and mechanical checklists.</p>
          <a href="/masood/" style="color: #705692; text-decoration: none; font-weight: 600; font-size: 0.85rem;">Explore Masood Academy &rarr;</a>
        </div>
        <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1.25rem;">
          <h3 style="font-size: 1.1rem; color: #23796d; margin-top: 0; margin-bottom: 0.5rem;">Interactive Trading Workbench</h3>
          <p style="color: #4f5d75; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1rem;">Chart Lab, algorithmic trade simulator, backtest expectancy engine, and journal.</p>
          <a href="/tools/" style="color: #705692; text-decoration: none; font-weight: 600; font-size: 0.85rem;">Launch Workbench &rarr;</a>
        </div>
      </div>
    </section>
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 1.3rem; color: #121c32; margin-bottom: 1rem;">Foundational Learning Tracks</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem;">
        <div style="background: rgba(34,59,53,0.02); border: 1px solid rgba(34,59,53,0.06); padding: 1rem; border-radius: 6px;">
          <h3 style="color: #121c32; margin: 0 0 0.5rem 0; font-size: 0.95rem;">Part I · Market Foundations</h3>
          <p style="color: #4f5d75; font-size: 0.8rem; margin: 0;">Auction mechanics, CLOB limit order books, liquidity consumption, and market structure.</p>
        </div>
        <div style="background: rgba(34,59,53,0.02); border: 1px solid rgba(34,59,53,0.06); padding: 1rem; border-radius: 6px;">
          <h3 style="color: #121c32; margin: 0 0 0.5rem 0; font-size: 0.95rem;">Part II · Core ICT Frameworks</h3>
          <p style="color: #4f5d75; font-size: 0.8rem; margin: 0;">Fair Value Gaps (FVG), Order Blocks, Breaker Blocks, and institutional mitigation.</p>
        </div>
        <div style="background: rgba(34,59,53,0.02); border: 1px solid rgba(34,59,53,0.06); padding: 1rem; border-radius: 6px;">
          <h3 style="color: #121c32; margin: 0 0 0.5rem 0; font-size: 0.95rem;">Part III · Sessions & Algorithmic Time</h3>
          <p style="color: #4f5d75; font-size: 0.8rem; margin: 0;">ICT Killzones, London Open Judas Swing, New York AM/PM sessions, and Power of 3 (PO3).</p>
        </div>
        <div style="background: rgba(34,59,53,0.02); border: 1px solid rgba(34,59,53,0.06); padding: 1rem; border-radius: 6px;">
          <h3 style="color: #121c32; margin: 0 0 0.5rem 0; font-size: 0.95rem;">Part IV · Execution Protocols</h3>
          <p style="color: #4f5d75; font-size: 0.8rem; margin: 0;">2022 Mentorship Model, Silver Bullet algorithm, and OTE Fibonacci matrix.</p>
        </div>
      </div>
    </section>
  `
};

// 1. Legal & Informational Pages
const legalPages: RouteMeta[] = [
  {
    url: 'https://learnsmc.xyz/about/',
    outputPath: 'about/index.html',
    title: 'About LearnSMC — Publisher, Mission & Editorial Integrity | ICT & SMC Academy',
    description: 'Learn about LearnSMC, our open-source mission to democratize algorithmic trading education, editorial methodology, and curriculum architecture.',
    canonical: 'https://learnsmc.xyz/about/',
    heading: 'About LearnSMC & Editorial Integrity',
    subheading: 'Democratizing institutional market mechanics through rigorous, transparent, open-access education.',
    badge: 'Institutional Publisher & Mission',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">1. Our Publisher Mission</h2>
        <p style="margin-bottom: 1rem; line-height: 1.7; color: #435b50;">
          LearnSMC was founded to bridge the divide between predatory retail trading lore and genuine institutional auction delivery.
          Historically, Inner Circle Trader (ICT) concepts and Smart Money Concepts (SMC) have been obscured behind expensive paywalls,
          unverified signal services, and misleading affiliate schemes. LearnSMC publishes a peer-reviewed, free-for-life 57-chapter curriculum
          alongside 52 comprehensive Abdullah Masood masterclass breakdowns.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">2. Rigorous Editorial Architecture & Tripartite Model</h2>
        <p style="margin-bottom: 1rem; line-height: 1.7; color: #435b50;">
          Every concept published on LearnSMC is broken down through a strict tripartite model:
        </p>
        <ul style="padding-left: 1.5rem; margin-bottom: 1rem; line-height: 1.8; color: #435b50;">
          <li><strong style="color: #121c32;">1. Original ICT Pedagogy:</strong> Michael J. Huddleston's primary teaching from the 2016–2024 mentorships.</li>
          <li><strong style="color: #121c32;">2. Observable Market Behavior:</strong> What empirical auction order flow, limit books, and tick data show on live charts.</li>
          <li><strong style="color: #121c32;">3. Institutional Invalidation Rules:</strong> Quantitative rules that definitively void the trade idea before real capital is committed.</li>
        </ul>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">3. Publisher & Editorial Board</h2>
        <p style="line-height: 1.7; color: #435b50;">
          Editorial oversight is led by senior market analysts specializing in foreign exchange liquidity, index futures delivery, and algorithmic auction models.
          All materials are reviewed annually to update market microstructure references and regulatory guidelines.
        </p>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/disclaimer/',
    outputPath: 'disclaimer/index.html',
    title: 'Financial Risk Disclaimer & CFTC Rule 4.41 Compliance Notice | LearnSMC',
    description: 'Crucial educational disclaimer and CFTC Rule 4.41 financial risk disclosure for LearnSMC. Trading involves substantial risk of loss.',
    canonical: 'https://learnsmc.xyz/disclaimer/',
    heading: 'Financial Risk & Regulatory Disclaimer',
    subheading: 'Strict compliance with CFTC Rule 4.41, NFA guidelines, and global financial conduct authorities.',
    badge: 'Legal & Risk Disclosures',
    bodyHtml: `
      <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem;">
        <h2 style="color: #F87171; margin-top: 0; font-size: 1.15rem; font-weight: bold;">Trading risk and capital preservation</h2>
        <p style="margin: 0; line-height: 1.6; color: #b44746;">
          Trading foreign exchange (Forex), commodities, futures, equities, and digital assets on margin carries a high level of risk and may not be suitable for all investors.
          The high degree of leverage can work against you as well as for you. Before deciding to trade foreign exchange or any financial market, you should carefully consider your investment objectives, level of experience, and risk appetite.
          There is a possibility that you may sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose.
        </p>
      </div>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">CFTC RULE 4.41 - HYPOTHETICAL PERFORMANCE DISCLOSURE</h2>
        <p style="line-height: 1.7; color: #435b50; margin-bottom: 1rem;">
          HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN INHERENT LIMITATIONS. UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. ALSO, SINCE THE TRADES HAVE NOT ACTUALLY BEEN EXECUTED, THE RESULTS MAY HAVE UNDER- OR OVER-COMPENSATED FOR THE IMPACT, IF ANY, OF CERTAIN MARKET FACTORS, SUCH AS LACK OF LIQUIDITY. SIMULATED TRADING PROGRAMS IN GENERAL ARE ALSO SUBJECT TO THE FACT THAT THEY ARE DESIGNED WITH THE BENEFIT OF HINDSIGHT. NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFITS OR LOSSES SIMILAR TO THOSE SHOWN.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">Educational Only Mandate</h2>
        <p style="line-height: 1.7; color: #435b50;">
          All content, software tools, charts, simulations, and materials provided on LearnSMC (learnsmc.xyz) are published strictly for educational and informational purposes.
          Under no circumstances does any material on this website constitute financial, investment, legal, or tax advice. LearnSMC does not operate an investment fund, manage assets, or recommend specific brokerages or trading platforms.
        </p>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/privacy/',
    outputPath: 'privacy/index.html',
    title: 'Privacy Policy & Google AdSense Cookie Disclosures | LearnSMC',
    description: 'LearnSMC Privacy Policy: How we collect, safeguard, and process user data in full compliance with GDPR, CCPA, and Google AdSense guidelines.',
    canonical: 'https://learnsmc.xyz/privacy/',
    heading: 'Privacy Policy & Cookie Usage',
    subheading: 'Transparent data practices compliant with GDPR, UK Data Protection Act, CCPA, and Google AdSense publisher standards.',
    badge: 'User Privacy & Data Protection',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">1. Data Collection & Usage</h2>
        <p style="line-height: 1.7; color: #435b50; margin-bottom: 1rem;">
          LearnSMC does not sell, rent, or lease personal customer data to any third party.
          When you use our open educational resources, your study progress, bookmarks, journal notes, and simulation data are stored locally in your browser via HTML5 LocalStorage, ensuring complete privacy.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">2. Google AdSense & Third-Party Cookies</h2>
        <p style="line-height: 1.7; color: #435b50; margin-bottom: 1rem;">
          We use Google AdSense (Publisher ID: ca-pub-6985025314302607) to serve contextual educational advertisements.
          Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.
          Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to LearnSMC and/or other sites on the Internet.
        </p>
        <p style="line-height: 1.7; color: #435b50;">
          Users may opt out of personalized advertising by visiting Google Ad Settings (<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style="color: #23796d;">https://adssettings.google.com</a>) or via the Network Advertising Initiative opt-out page (<a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" style="color: #23796d;">https://optout.networkadvertising.org</a>).
        </p>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/terms/',
    outputPath: 'terms/index.html',
    title: 'Terms of Service & Open Educational License | LearnSMC',
    description: 'Official Terms of Service governing access to the LearnSMC educational platform, intellectual property rights, and user conduct.',
    canonical: 'https://learnsmc.xyz/terms/',
    heading: 'Terms of Service & Platform Usage',
    subheading: 'Open educational licensing terms, acceptable use standards, and user rights.',
    badge: 'Terms of Service',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">1. Acceptance of Terms</h2>
        <p style="line-height: 1.7; color: #435b50; margin-bottom: 1rem;">
          By accessing or using LearnSMC (learnsmc.xyz), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">2. Open Educational License</h2>
        <p style="line-height: 1.7; color: #435b50;">
          All textbook chapters, syllabus materials, and analytical tools are provided for individual study, personal development, and non-commercial educational use. Reproduction, redistribution, or mirroring of proprietary code or interactive engines without prior written authorization is strictly prohibited.
        </p>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/contact/',
    outputPath: 'contact/index.html',
    title: 'Contact LearnSMC — Support & Editorial Channels | LearnSMC',
    description: 'Get in touch with the LearnSMC editorial and technical team. Contact information, inquiries, corrections, and academic contributions.',
    canonical: 'https://learnsmc.xyz/contact/',
    heading: 'Contact LearnSMC & Editorial Office',
    subheading: 'We welcome feedback, corrections, curriculum contributions, and partnership inquiries.',
    badge: 'Publisher Inquiries',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">Direct Communication Channels</h2>
        <p style="line-height: 1.7; color: #435b50; margin-bottom: 1rem;">
          For educational questions, technical bugs, peer-review contributions, or copyright inquiries, reach us at:
        </p>
        <div style="background: rgba(34,59,53,0.04); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <p style="margin: 0 0 0.5rem 0; font-family: monospace; font-size: 1rem; color: #23796d;">support@learnsmc.xyz</p>
          <p style="margin: 0; font-size: 0.85rem; color: #4f5d75;">Average response turnaround: 24 to 48 business hours.</p>
        </div>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/adsense/',
    outputPath: 'adsense/index.html',
    title: 'Google AdSense Publisher Verification & ads.txt Record | LearnSMC',
    description: 'Official Google AdSense publisher verification, ca-pub-6985025314302607 record, and ads.txt declaration for learnsmc.xyz.',
    canonical: 'https://learnsmc.xyz/adsense/',
    heading: 'Google AdSense Verification & ads.txt',
    subheading: 'Transparent advertising credentials and authorized digital seller verification.',
    badge: 'Publisher Verification',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">Publisher Record</h2>
        <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="font-family: monospace; color: #23796d; margin-bottom: 0.5rem;">Publisher ID: ca-pub-6985025314302607</div>
          <div style="font-family: monospace; color: #705692;">ads.txt Entry: google.com, pub-6985025314302607, DIRECT, f08c47fec0942fa0</div>
        </div>
      </section>
    `
  }
];

// 2. Core Curriculum Hub
const curriculumHubPage: RouteMeta = {
  url: 'https://learnsmc.xyz/curriculum/',
  outputPath: 'curriculum/index.html',
  title: 'ICT & SMC Academy — 57-Chapter Institutional Trading Curriculum | LearnSMC',
  description: 'Explore the complete 57-chapter institutional trading curriculum covering Market Structure, Liquidity Sweeps, Fair Value Gaps, PO3, and Algorithmic Execution.',
  canonical: 'https://learnsmc.xyz/curriculum/',
  heading: 'The 57-Chapter Institutional Curriculum',
  subheading: 'Study ICT and Smart Money Concepts with free lessons, original diagrams and chart exercises. Start with market foundations, then learn structure, liquidity and price patterns at your own pace.',
  badge: 'Complete Syllabus Overview',
  bodyHtml: `
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 1rem;">Curriculum Phases & Modules</h2>
      <p style="line-height: 1.7; color: #435b50; margin-bottom: 1.5rem;">
        The LearnSMC curriculum is engineered in a logical, cumulative order. Each chapter builds upon foundational electronic auction mechanics, progressing into advanced intraday delivery algorithms.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
        ${textbookChapters.map(ch => `
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-family: monospace; color: #23796d; margin-bottom: 0.25rem;">Chapter ${ch.id} · Level ${ch.level}</div>
            <a href="${getLessonPath(ch.slug)}" style="color: #121c32; text-decoration: none; font-weight: bold; font-size: 0.95rem; display: block; margin-bottom: 0.5rem;">
              ${escapeHtml(ch.title)}
            </a>
            <p style="color: #4f5d75; font-size: 0.8rem; line-height: 1.4; margin: 0;">${escapeHtml(ch.summary[0])}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `
};

// 3. Masood Academy Hub
const masoodHubPage: RouteMeta = {
  url: 'https://learnsmc.xyz/masood/',
  outputPath: 'masood/index.html',
  title: 'Trader Abdullah Masood Academy — 52 Masterclasses | LearnSMC',
  description: 'Study Trader Abdullah Masood complete 52-lecture institutional curriculum on ICT and Smart Money Concepts with video timestamps and notes.',
  canonical: 'https://learnsmc.xyz/masood/',
  heading: 'Trader Abdullah Masood Mentorship Academy',
  subheading: '52 Masterclasses, Golden Rules, Algorithmic Bias Calculator, and Animated Explainers.',
  badge: 'Masterclass Archive',
  bodyHtml: `
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">Mentorship Curriculum</h2>
      <p style="line-height: 1.7; color: #435b50; margin-bottom: 1.5rem;">
        Trader Abdullah Masood has distilled complex institutional algorithmic mechanics into crystal-clear, actionable rules.
        Browse all 6 playlist series covering Beginner Foundations, Gold Legacy, Core ICT Mentorship, Advanced Market Geometry, and Live Trade Breakdowns.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <a href="/masood/animations/" style="background: rgba(34,59,53,0.04); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
          <div style="color: #23796d; font-weight: bold; margin-bottom: 0.25rem;">Animated Explainers</div>
          <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">Visual step-by-step animations of PO3, Fair Value Gap formation, and Liquidity Sweeps.</p>
        </a>
        <a href="/masood/bias-calculator/" style="background: rgba(34,59,53,0.04); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
          <div style="color: #705692; font-weight: bold; margin-bottom: 0.25rem;">Daily Bias Calculator</div>
          <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">Systematic 4-step framework to determine higher timeframe daily candle direction.</p>
        </a>
        <a href="/masood/golden-rules/" style="background: rgba(34,59,53,0.04); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
          <div style="color: #b34e30; font-weight: bold; margin-bottom: 0.25rem;">Golden Execution Rules</div>
          <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">Non-negotiable risk management principles and entry execution criteria.</p>
        </a>
      </div>
    </section>
  `
};

// 4. Masood Sub-Pages
const masoodSubPages: RouteMeta[] = [
  {
    url: 'https://learnsmc.xyz/masood/animations/',
    outputPath: 'masood/animations/index.html',
    title: 'Animated SMC & ICT Explainers — Trader Abdullah Masood | LearnSMC',
    description: 'Interactive visual animations of PO3, Fair Value Gap formation, Liquidity Sweeps, and Order Blocks by Trader Abdullah Masood.',
    canonical: 'https://learnsmc.xyz/masood/animations/',
    heading: 'Animated SMC & ICT Market Mechanics',
    subheading: 'Watch price action unfold step-by-step with interactive institutional diagrams.',
    badge: 'Visual Animations',
    bodyHtml: `
      <p style="line-height: 1.7; color: #435b50;">
        Visualize algorithmic market maker models with high-fidelity animated charts. Understand Accumulation, Manipulation, and Distribution (PO3), the mechanics of Judas Swings at 09:30 AM, and how Fair Value Gaps form during energetic institutional displacement.
      </p>
    `
  },
  {
    url: 'https://learnsmc.xyz/masood/bias-calculator/',
    outputPath: 'masood/bias-calculator/index.html',
    title: 'Daily Bias Calculator — Trader Abdullah Masood | LearnSMC',
    description: 'Systematic 4-step daily bias calculator for index futures and Forex based on HTF liquidity, discount/premium, and economic macros.',
    canonical: 'https://learnsmc.xyz/masood/bias-calculator/',
    heading: 'Algorithmic Daily Bias Calculator',
    subheading: 'Determine high-probability daily expansion direction before the session opens.',
    badge: 'Quantitative Decision Tool',
    bodyHtml: `
      <p style="line-height: 1.7; color: #435b50;">
        Trading without directional bias is gambling. The Masood Daily Bias Calculator evaluates Higher Timeframe market structure, whether price is currently in Premium or Discount relative to the dealing range, and whether Buy-Side or Sell-Side liquidity was recently swept.
      </p>
    `
  },
  {
    url: 'https://learnsmc.xyz/masood/golden-rules/',
    outputPath: 'masood/golden-rules/index.html',
    title: 'Golden Trading Rules — Trader Abdullah Masood | LearnSMC',
    description: 'Non-negotiable institutional execution and risk management rules distilled from 52 Abdullah Masood masterclasses.',
    canonical: 'https://learnsmc.xyz/masood/golden-rules/',
    heading: 'The Golden Rules of Institutional Execution',
    subheading: 'Essential risk parameters, psychological frameworks, and trade management rules.',
    badge: 'Core Tenets',
    bodyHtml: `
      <ul style="padding-left: 1.5rem; line-height: 1.8; color: #435b50;">
        <li><strong style="color: #121c32;">Rule 1:</strong> Never enter a trade during the 09:30 AM equities open without a pre-market higher timeframe draw on liquidity.</li>
        <li><strong style="color: #121c32;">Rule 2:</strong> Invalidation occurs at the candle body close beyond the Consequent Encroachment (50%) of the Fair Value Gap.</li>
        <li><strong style="color: #121c32;">Rule 3:</strong> Risk strictly 1% or less of total equity per idea. Capital preservation precedes capital accumulation.</li>
        <li><strong style="color: #121c32;">Rule 4:</strong> Align multi-timeframe narrative from the Daily down to the 1-Minute chart before executing limit orders.</li>
      </ul>
    `
  }
];

// 5. Workbench Tools Hub & Root Tools
const workbenchTools: RouteMeta[] = [
  {
    url: 'https://learnsmc.xyz/tools/',
    outputPath: 'tools/index.html',
    title: 'ICT Trading Workbench & Analytical Laboratories | LearnSMC',
    description: 'Interactive Chart Lab, SMC strategy simulator, backtester, trading journal, masterclass hub, and institutional concepts reference.',
    canonical: 'https://learnsmc.xyz/tools/',
    heading: 'ICT Trading Workbench & Laboratory Suite',
    subheading: 'Empirical software tools engineered for deliberate practice without financial risk.',
    badge: 'Laboratory Suite',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #121c32; margin-bottom: 0.75rem;">Interactive Workbench Facilities</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem;">
          <a href="/tools/masterclass/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #2453ef; margin-bottom: 0.25rem;">Masterclass Hub</div>
            <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">34 Masterclasses, 15 PD Arrays in hierarchical order, and 5 A+ entry models.</p>
          </a>
          <a href="/tools/chartlab/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #23796d; margin-bottom: 0.25rem;">Chart Lab</div>
            <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">8-stage candlestick auction replay with multi-layer ICT overlays.</p>
          </a>
          <a href="/tools/simulator/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #705692; margin-bottom: 0.25rem;">Trade Simulator</div>
            <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">Algorithmic limit order execution simulator with realistic slippage.</p>
          </a>
          <a href="/tools/backtest/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #b34e30; margin-bottom: 0.25rem;">Backtest Lab</div>
            <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">Statistical expectancy, Win Rate, and Drawdown curve calculator.</p>
          </a>
          <a href="/tools/journal/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #23796d; margin-bottom: 0.25rem;">Trading Journal</div>
            <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">7-point institutional trade audit and rule validation logger.</p>
          </a>
          <a href="/tools/knowledge-graph/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #23796d; margin-bottom: 0.25rem;">Knowledge Graph</div>
            <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">10-step institutional pipeline and connected concept network.</p>
          </a>
          <a href="/tools/glossary/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #705692; margin-bottom: 0.25rem;">Concepts Glossary</div>
            <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">Searchable encyclopedia of 41+ ICT concepts, categories, and deep sub-concepts.</p>
          </a>
          <a href="/tools/compare/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #b44746; margin-bottom: 0.25rem;">Compare Matrix</div>
            <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">Side-by-side contrast of overlapping or misunderstood concepts.</p>
          </a>
          <a href="/tools/profile/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #25734f; margin-bottom: 0.25rem;">Mastery Profile</div>
            <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">Assessments, diagnostic quizzes, and operator credentials.</p>
          </a>
          <a href="/tools/delivery-suite/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #b44746; margin-bottom: 0.25rem;">ICT Delivery Suite</div>
            <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">OTE calculator, Asian Judas planner, and 8 macro execution windows.</p>
          </a>
        </div>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/tools/masterclass/',
    outputPath: 'tools/masterclass/index.html',
    title: 'Masterclass Hub (34 Models & 15 PD Arrays) | LearnSMC',
    description: 'Explore 34 institutional masterclasses, 15 PD Arrays in hierarchical order, and 5 opening range models.',
    canonical: 'https://learnsmc.xyz/tools/masterclass/',
    heading: 'Masterclass Hub (34 Models & 15 PD Arrays)',
    subheading: 'Deep-dive reference into algorithmic premium/discount arrays and high-probability entry models.',
    badge: 'Advanced Models',
    bodyHtml: '<p style="line-height: 1.7; color: #435b50;">Explore the 15-tier PD Array hierarchy from Old High/Low down to Mitigation Blocks, alongside 5 specialized opening range setups.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/chartlab/',
    outputPath: 'tools/chartlab/index.html',
    title: 'Interactive Chart Lab — Candlestick Auction Engine | LearnSMC',
    description: 'High-definition candlestick auction engine with multi-layer ICT overlays, Fair Value Gaps, and liquidity sweeps.',
    canonical: 'https://learnsmc.xyz/tools/chartlab/',
    heading: 'Interactive Chart Laboratory',
    subheading: 'Multi-layer ICT candlestick auction engine with algorithmic overlays.',
    badge: 'Chart Laboratory',
    bodyHtml: '<p style="line-height: 1.7; color: #435b50;">Explore interactive candlestick sequences across historical London and New York Killzone sessions. Identify displacement candles, mark fair value gaps, and observe order block mitigation in real time.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/simulator/',
    outputPath: 'tools/simulator/index.html',
    title: 'Trade Simulator & Algorithmic Market Replay | LearnSMC',
    description: 'Step-by-step blind testing across London and NY Killzones with realistic limit order fills and slip models.',
    canonical: 'https://learnsmc.xyz/tools/simulator/',
    heading: 'Trade Simulator & Execution Engine',
    subheading: 'Blind test your ICT execution protocols without risking real capital.',
    badge: 'Execution Simulator',
    bodyHtml: '<p style="line-height: 1.7; color: #435b50;">Simulate real-market conditions with step-by-step candle advance, limit order placement, stop loss setting, and profit target tracking.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/backtest/',
    outputPath: 'tools/backtest/index.html',
    title: 'Backtest Lab & Strategy Expectancy Matrix | LearnSMC',
    description: 'Statistical expectancy, win-rates, profit factor, and drawdown curves without risking live capital.',
    canonical: 'https://learnsmc.xyz/tools/backtest/',
    heading: 'Backtesting Laboratory & Expectancy Engine',
    subheading: 'Measure Win Rate, Profit Factor, Risk-to-Reward, and Max Drawdown curves.',
    badge: 'Quantitative Research',
    bodyHtml: '<p style="line-height: 1.7; color: #435b50;">Validate your trading edge statistically. Model win rates across different setup confluence grades before committing live money.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/journal/',
    outputPath: 'tools/journal/index.html',
    title: 'Institutional Trading Journal & Rule Validation | LearnSMC',
    description: '7-point institutional trade audit and rule validation logger for disciplined trade execution.',
    canonical: 'https://learnsmc.xyz/tools/journal/',
    heading: 'Institutional Trading Journal',
    subheading: 'Audit every trade setup against institutional rules and emotional states.',
    badge: 'Discipline Audit',
    bodyHtml: '<p style="line-height: 1.7; color: #435b50;">Track setup type, session, entry model, risk-reward ratio, and mistake tags in local browser storage.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/knowledge-graph/',
    outputPath: 'tools/knowledge-graph/index.html',
    title: 'Interactive Knowledge Graph — 10-Step Pipeline | LearnSMC',
    description: 'Visual node map connecting foundational market mechanics to advanced execution models.',
    canonical: 'https://learnsmc.xyz/tools/knowledge-graph/',
    heading: 'SMC Interactive Knowledge Graph',
    subheading: 'Connect liquidity concepts, market structure, and algorithmic timing models.',
    badge: 'Concept Matrix',
    bodyHtml: '<p style="line-height: 1.7; color: #435b50;">Explore the conceptual dependency tree connecting liquidity pools, displacement, market structure shifts, and optimal trade entries.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/glossary/',
    outputPath: 'tools/glossary/index.html',
    title: 'ICT & SMC Institutional Concepts Glossary & Reference | LearnSMC',
    description: 'Searchable encyclopedia of Fair Value Gaps, Order Blocks, Liquidity Pools, and algorithmic mechanics.',
    canonical: 'https://learnsmc.xyz/tools/glossary/',
    heading: 'Institutional Concepts Encyclopedia & Glossary',
    subheading: 'Rigorous definitions, mathematical parameters, and invalidation rules for 41+ ICT concepts.',
    badge: 'Encyclopedia',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.3rem; color: #121c32; margin-bottom: 0.75rem;">Glossary Categories &amp; Knowledge Structure</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem;">
          ${GLOSSARY_CATEGORIES.map(cat => `
            <a href="/tools/glossary/${cat.slug}/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
              <div style="font-weight: bold; color: #23796d; margin-bottom: 0.25rem;">${escapeHtml(cat.name)}</div>
              <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">${escapeHtml(cat.description)}</p>
            </a>
          `).join('')}
        </div>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/tools/compare/',
    outputPath: 'tools/compare/index.html',
    title: 'Concept Comparison Matrix — Side-by-Side Analysis | LearnSMC',
    description: 'Contrast overlapping concepts such as Order Block vs Breaker Block, and BSL vs SSL.',
    canonical: 'https://learnsmc.xyz/tools/compare/',
    heading: 'Concept Comparison Matrix',
    subheading: 'Side-by-side technical breakdown of frequently confused institutional concepts.',
    badge: 'Side-by-Side Analysis',
    bodyHtml: '<p style="line-height: 1.7; color: #435b50;">Direct contrast between Order Blocks vs Breaker Blocks, MSS vs BOS, and Liquidity Sweeps vs Real Structural Breaks.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/profile/',
    outputPath: 'tools/profile/index.html',
    title: 'Mastery Profile & Operator Credentials | LearnSMC',
    description: 'Assessments, diagnostic quizzes, and operator credentials tracking your institutional mastery.',
    canonical: 'https://learnsmc.xyz/tools/profile/',
    heading: 'Mastery Profile & Operator Diagnostics',
    subheading: 'Track curriculum completion, test scores, and institutional skill readiness.',
    badge: 'Diagnostics',
    bodyHtml: '<p style="line-height: 1.7; color: #435b50;">Verify your mastery across 57 curriculum chapters and track your progression from Novice to Certified Institutional Operator.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/delivery-suite/',
    outputPath: 'tools/delivery-suite/index.html',
    title: 'ICT Delivery Suite & Killzone Macro Clock | LearnSMC',
    description: 'Optimal Trade Entry (OTE) calculator, Asian Judas planner, and 8 macro execution windows.',
    canonical: 'https://learnsmc.xyz/tools/delivery-suite/',
    heading: 'ICT Delivery Suite & Macro Clock',
    subheading: 'Real-time countdown to algorithmic Killzones and macro windows.',
    badge: 'Timing & Macros',
    bodyHtml: '<p style="line-height: 1.7; color: #435b50;">Calculators for 62% - 79% Optimal Trade Entry, Asian range projections, and New York macro algorithmic clocks.</p>'
  }
];

// 5a. Masterclass Category Sub-Routes (/tools/masterclass/:category/)
const masterclassCategoryRoutes: RouteMeta[] = MASTERCLASS_CATEGORIES
  .filter(cat => cat.id !== 'all')
  .map(cat => {
    const catItems = masterclassCollection.filter(m => m.category === cat.id);
    return {
      url: `https://learnsmc.xyz/tools/masterclass/${cat.slug}/`,
      outputPath: `tools/masterclass/${cat.slug}/index.html`,
      title: `${cat.name} — ICT Masterclass Hub | LearnSMC`,
      description: cat.description,
      canonical: `https://learnsmc.xyz/tools/masterclass/${cat.slug}/`,
      heading: cat.name,
      subheading: cat.description,
      badge: `${cat.name} • Series`,
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'Course',
        'name': cat.name,
        'description': cat.description,
        'provider': {
          '@type': 'Organization',
          'name': 'LearnSMC',
          'url': 'https://learnsmc.xyz/'
        }
      },
      bodyHtml: `
        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; color: #121c32; margin-bottom: 0.75rem;">Masterclasses in ${escapeHtml(cat.name)}</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
            ${catItems.map(m => `
              <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1.25rem;">
                <div style="font-size: 0.75rem; font-family: monospace; color: #2453ef; margin-bottom: 0.25rem;">Masterclass #${m.number}</div>
                <a href="${getMasterclassUrl(m)}" style="color: #121c32; text-decoration: none; font-weight: bold; font-size: 1rem; display: block; margin-bottom: 0.5rem;">
                  ${escapeHtml(m.title)}
                </a>
                <p style="color: #4f5d75; font-size: 0.85rem; line-height: 1.5; margin: 0 0 0.75rem 0;">${escapeHtml(m.subtitle)}</p>
                <div style="font-size: 0.8rem; color: #23796d; font-family: monospace;">Rule: ${escapeHtml(m.coreRule.substring(0, 90))}...</div>
              </div>
            `).join('')}
          </div>
        </section>
      `
    };
  });

// 5b. Individual Masterclass Sub-Routes (/tools/masterclass/:category/:module/)
const masterclassModuleRoutes: RouteMeta[] = masterclassCollection.map(m => {
  const catSlug = getMasterclassCategorySlug(m.category);
  const modSlug = getMasterclassSlug(m);
  const targetUrl = `https://learnsmc.xyz/tools/masterclass/${catSlug}/${modSlug}/`;

  return {
    url: targetUrl,
    outputPath: `tools/masterclass/${catSlug}/${modSlug}/index.html`,
    title: `${m.title} — ICT Masterclass Hub | LearnSMC`,
    description: `${m.subtitle}. Core institutional rule: ${m.coreRule}`,
    canonical: targetUrl,
    heading: `#${m.number.toString().padStart(2, '0')}: ${m.title}`,
    subheading: m.subtitle,
    badge: `Masterclass #${m.number} • ${catSlug.toUpperCase()}`,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      'name': m.title,
      'description': m.subtitle,
      'learningResourceType': 'Masterclass Blueprint',
      'isPartOf': {
        '@type': 'Course',
        'name': 'ICT & SMC Masterclass Compendium',
        'url': 'https://learnsmc.xyz/tools/masterclass/'
      }
    },
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <div style="background: rgba(37,101,82, 0.08); border-left: 3px solid #2453ef; padding: 1rem 1.25rem; border-radius: 6px; margin-bottom: 1.5rem;">
          <h3 style="color: #121c32; margin: 0 0 0.5rem 0; font-size: 1.1rem;">Core Institutional Execution Rule</h3>
          <p style="color: #121c32; font-size: 0.95rem; margin: 0; line-height: 1.6;">${escapeHtml(m.coreRule)}</p>
        </div>

        <div style="margin-bottom: 1.75rem;">
          <h3 style="color: #121c32; font-size: 1.15rem; margin-bottom: 0.75rem;">Step-by-Step Order of Operations</h3>
          <ol style="padding-left: 1.5rem; line-height: 1.8;">
            ${m.orderOfOperations.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
          </ol>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem;">
          <div style="background: rgba(244,63,94,0.08); border: 1px solid rgba(244,63,94,0.2); border-radius: 8px; padding: 1rem;">
            <h4 style="color: #b44746; margin: 0 0 0.5rem 0; font-size: 0.95rem;">Structural Invalidation Criteria</h4>
            <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.85rem; line-height: 1.6;">
              ${m.invalidationChecklist.map(inv => `<li>${escapeHtml(inv)}</li>`).join('')}
            </ul>
          </div>
          <div style="background: rgba(85,230,209,0.08); border: 1px solid rgba(85,230,209,0.2); border-radius: 8px; padding: 1rem;">
            <h4 style="color: #23796d; margin: 0 0 0.5rem 0; font-size: 0.95rem;">Visual Anatomy Signature</h4>
            <p style="margin: 0; font-size: 0.85rem; line-height: 1.6;">${escapeHtml(m.visualAnatomy || m.coreRule)}</p>
          </div>
        </div>

        <div style="border-top: 1px solid rgba(34,59,53,0.06); padding-top: 1.25rem; font-size: 0.85rem; color: #4f5d75;">
          Cross-reference this blueprint with the <a href="/tools/glossary/" style="color: #23796d;">Concepts Glossary</a> and test live execution inside the <a href="/tools/simulator/" style="color: #705692;">Trade Simulator</a>.
        </div>
      </article>
    `
  };
});

// 5c. Chart Lab Scenarios Sub-Routes (/tools/chartlab/:scenario/)
const chartLabScenarioRoutes: RouteMeta[] = chartScenarios.map(s => {
  const slug = getChartScenarioSlug(s.id);
  const meta = CHART_SCENARIOS_META[s.id];
  const targetUrl = `https://learnsmc.xyz/tools/chartlab/${slug}/`;

  return {
    url: targetUrl,
    outputPath: `tools/chartlab/${slug}/index.html`,
    title: meta?.metaTitle || `${s.title} — Chart Lab | LearnSMC`,
    description: meta?.metaDescription || s.description,
    canonical: targetUrl,
    heading: s.title,
    subheading: `${s.asset} · Interactive Candlestick Auction Replay & Training Lab`,
    badge: `${s.asset} • Lab Scenario`,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': s.title,
      'applicationCategory': 'Trading Simulation',
      'operatingSystem': 'Any Web Browser'
    },
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <div style="background: rgba(85, 230, 209, 0.08); border-left: 3px solid #23796d; padding: 1rem 1.25rem; border-radius: 6px; margin-bottom: 1.5rem;">
          <h3 style="color: #121c32; margin: 0 0 0.5rem 0; font-size: 1.1rem;">Scenario Objective &amp; Learning Takeaway</h3>
          <p style="color: #121c32; font-size: 0.95rem; margin: 0;">${escapeHtml(s.description)}</p>
        </div>

        <div style="margin-bottom: 1.75rem;">
          <h3 style="color: #121c32; font-size: 1.15rem; margin-bottom: 0.75rem;">8-Stage Sequential Execution Protocol</h3>
          <ol style="padding-left: 1.5rem; line-height: 1.8;">
            <li><strong>Stage 1 (Liquidity Pool):</strong> Identify resting Buy-Side (BSL) or Sell-Side (SSL) stops.</li>
            <li><strong>Stage 2 (Sweep):</strong> Mark the candle wick penetrating resting stops to engineer liquidity.</li>
            <li><strong>Stage 3 (Displacement):</strong> Spot explosive institutional expansion candles with wide bodies.</li>
            <li><strong>Stage 4 (Market Structure Shift):</strong> Confirm candle body close breaking internal structure swing.</li>
            <li><strong>Stage 5 (PD Array Formation):</strong> Highlight the Fair Value Gap (FVG) or Order Block.</li>
            <li><strong>Stage 6 (Institutional Entry):</strong> Place limit entry at the 50% Consequent Encroachment (CE).</li>
            <li><strong>Stage 7 (Invalidation Stop):</strong> Anchor protective stop beyond the structural sweep high/low.</li>
            <li><strong>Stage 8 (Terminal Target):</strong> Lock profit at opposing Higher Timeframe liquidity pool.</li>
          </ol>
        </div>

        <p style="font-size: 0.85rem; color: #4f5d75;">
          Ready to trade this setup? Open the <a href="/tools/chartlab/" style="color: #23796d;">Interactive Chart Lab</a> for step-by-step candle advance and automatic feedback.
        </p>
      </article>
    `
  };
});

// 5d. Trade Simulator Models Sub-Routes (/tools/simulator/:model/)
const simulatorModelRoutes: RouteMeta[] = SIMULATOR_MODELS.map(m => {
  const targetUrl = `https://learnsmc.xyz/tools/simulator/${m.slug}/`;

  return {
    url: targetUrl,
    outputPath: `tools/simulator/${m.slug}/index.html`,
    title: `${m.name} Execution Simulator | LearnSMC`,
    description: `${m.subtitle}. ${m.description}`,
    canonical: targetUrl,
    heading: m.name,
    subheading: m.subtitle,
    badge: `${m.direction} • ${m.location}`,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': `${m.name} Simulator`,
      'applicationCategory': 'Financial Application'
    },
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <p style="font-size: 1rem; color: #121c32; margin-bottom: 1.25rem;">${escapeHtml(m.description)}</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem;">
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-family: monospace; color: #23796d;">Direction &amp; Higher Timeframe Bias</div>
            <div style="font-weight: bold; color: #121c32; margin-top: 0.25rem;">${m.direction} (${m.htfBias} in ${m.location})</div>
          </div>
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-family: monospace; color: #705692;">Liquidity Event &amp; Confirmation</div>
            <div style="font-weight: bold; color: #121c32; margin-top: 0.25rem;">${m.liquidityEvent} ➔ ${m.confirmation}</div>
          </div>
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-family: monospace; color: #b34e30;">Entry Array &amp; Invalidation Stop</div>
            <div style="font-weight: bold; color: #121c32; margin-top: 0.25rem;">${m.entryArray} (Stop: ${m.stopPlacement})</div>
          </div>
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-family: monospace; color: #25734f;">Profit Target Objective</div>
            <div style="font-weight: bold; color: #121c32; margin-top: 0.25rem;">${m.targetType}</div>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: #4f5d75;">
          Test your execution rules live in the <a href="/tools/simulator/" style="color: #705692;">Trade Simulator</a> or explore backtested win rates in the <a href="/tools/backtest/" style="color: #b34e30;">Backtest Lab</a>.
        </p>
      </article>
    `
  };
});

// 5e. Backtest Strategies Sub-Routes (/tools/backtest/:strategy/)
const backtestStrategyRoutes: RouteMeta[] = BACKTEST_STRATEGIES.map(s => {
  const targetUrl = `https://learnsmc.xyz/tools/backtest/${s.slug}/`;

  return {
    url: targetUrl,
    outputPath: `tools/backtest/${s.slug}/index.html`,
    title: `${s.shortName} Backtest Strategy & Expectancy | LearnSMC`,
    description: `${s.description} Expected Win Rate: ${s.expectedWinRate}, Average RR: ${s.avgRR}.`,
    canonical: targetUrl,
    heading: s.title,
    subheading: 'Quantitative Statistical Edge & Expectancy Model',
    badge: `${s.avgRR} • Expectancy`,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': s.title,
      'applicationCategory': 'Quantitative Finance Research'
    },
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <p style="font-size: 1rem; color: #121c32; margin-bottom: 1.25rem;">${escapeHtml(s.description)}</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.75rem;">
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 0.75rem; font-family: monospace; color: #4f5d75;">Expected Win Rate</div>
            <div style="font-size: 1.5rem; font-weight: bold; color: #25734f; margin-top: 0.25rem;">${s.expectedWinRate}</div>
          </div>
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 0.75rem; font-family: monospace; color: #4f5d75;">Average R-Multiple</div>
            <div style="font-size: 1.5rem; font-weight: bold; color: #23796d; margin-top: 0.25rem;">${s.avgRR}</div>
          </div>
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 0.75rem; font-family: monospace; color: #4f5d75;">Profit Factor Range</div>
            <div style="font-size: 1.5rem; font-weight: bold; color: #705692; margin-top: 0.25rem;">${s.profitFactor}</div>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: #4f5d75;">
          Run Monte Carlo simulations for this strategy in the <a href="/tools/backtest/" style="color: #b34e30;">Backtest Lab</a>.
        </p>
      </article>
    `
  };
});

// 5f. Trading Journal Sections Sub-Routes (/tools/journal/:section/)
const journalSectionRoutes: RouteMeta[] = JOURNAL_SECTIONS.map(s => {
  const targetUrl = `https://learnsmc.xyz/tools/journal/${s.slug}/`;

  return {
    url: targetUrl,
    outputPath: `tools/journal/${s.slug}/index.html`,
    title: `${s.title} — Trading Journal | LearnSMC`,
    description: s.description,
    canonical: targetUrl,
    heading: s.title,
    subheading: 'Institutional Audit & Trade Discipline Logger',
    badge: "Trader's Log",
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': s.title,
      'applicationCategory': 'Trading Journal'
    },
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <p style="font-size: 1rem; color: #121c32; margin-bottom: 1.25rem;">${escapeHtml(s.description)}</p>

        <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
          <h3 style="color: #23796d; margin-top: 0; font-size: 1.1rem;">The 7-Point Institutional Quality Audit</h3>
          <ul style="padding-left: 1.5rem; line-height: 1.8;">
            <li>1. HTF Daily Bias Aligned with clear liquidity draw</li>
            <li>2. Execution strictly in Discount (Buy) or Premium (Sell)</li>
            <li>3. Obvious liquidity raid of session or daily boundaries</li>
            <li>4. Clean displacement candle breaking structure with full body</li>
            <li>5. Clear Fair Value Gap (FVG) or unmitigated Order Block present</li>
            <li>6. Invalidation stop placed beyond structural raid swing</li>
            <li>7. Execution inside London or New York Killzone time window</li>
          </ul>
        </div>

        <p style="font-size: 0.85rem; color: #4f5d75;">
          Log your executions with automated local storage in the <a href="/tools/journal/" style="color: #23796d;">Institutional Trading Journal</a>.
        </p>
      </article>
    `
  };
});

// 5g. Knowledge Graph Steps & Network Sub-Routes (/tools/knowledge-graph/pipeline/step-:step/)
const knowledgeGraphStepRoutes: RouteMeta[] = KNOWLEDGE_GRAPH_STEPS.map(s => {
  const targetUrl = `https://learnsmc.xyz/tools/knowledge-graph/pipeline/step-${s.step}/`;

  return {
    url: targetUrl,
    outputPath: `tools/knowledge-graph/pipeline/step-${s.step}/index.html`,
    title: `${s.title} — Knowledge Graph | LearnSMC`,
    description: `${s.shortDesc} Non-random causal pipeline connecting liquidity to execution.`,
    canonical: targetUrl,
    heading: s.title,
    subheading: `Step ${s.step} of 10 in Algorithmic Institutional Price Delivery`,
    badge: `Step ${s.step} of 10 • Pipeline`,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      'name': s.title,
      'description': s.shortDesc
    },
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <p style="font-size: 1.05rem; color: #121c32; margin-bottom: 1.25rem;">${escapeHtml(s.shortDesc)}</p>

        <div style="background: rgba(85,230,209,0.08); border-left: 3px solid #23796d; padding: 1rem 1.25rem; border-radius: 6px; margin-bottom: 1.5rem;">
          <h3 style="color: #121c32; margin: 0 0 0.5rem 0; font-size: 1.1rem;">Algorithmic Causality</h3>
          <p style="color: #121c32; font-size: 0.95rem; margin: 0;">Step ${s.step} represents a deterministic link in institutional auction mechanics. Smart money relies on resting liquidity pools to fill large position blocks before triggering displacement.</p>
        </div>

        <p style="font-size: 0.85rem; color: #4f5d75;">
          Interact with this causal node and view interconnected concept prerequisites in the <a href="/tools/knowledge-graph/" style="color: #23796d;">Interactive Knowledge Graph</a>.
        </p>
      </article>
    `
  };
});

const knowledgeGraphNetworkRoute: RouteMeta = {
  url: 'https://learnsmc.xyz/tools/knowledge-graph/network/fair_value_gap/',
  outputPath: 'tools/knowledge-graph/network/fair_value_gap/index.html',
  title: 'Knowledge Graph Network: Fair Value Gap Node | LearnSMC',
  description: 'Interactive concept dependency network connecting Fair Value Gaps with displacement, liquidity sweeps, and trade models.',
  canonical: 'https://learnsmc.xyz/tools/knowledge-graph/network/fair_value_gap/',
  heading: 'Smart Money Interconnected Node Network',
  subheading: 'Visual Dependency Tree for Institutional Trading Concepts',
  badge: 'Network Matrix',
  schemaJson: {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    'name': 'Knowledge Graph Network'
  },
  bodyHtml: `
    <article style="line-height: 1.7; color: #435b50;">
      <p style="font-size: 1rem; color: #121c32; margin-bottom: 1.25rem;">
        The Smart Money Concepts knowledge graph links core concepts into a cohesive causal web: Liquidity Sweeps ➔ Displacement ➔ Fair Value Gaps ➔ Market Structure Shifts ➔ Institutional Order Blocks ➔ Killzone Execution Models.
      </p>
      <p style="font-size: 0.85rem; color: #4f5d75;">
        Explore the 2D visual layout in the <a href="/tools/knowledge-graph/" style="color: #23796d;">Knowledge Graph</a>.
      </p>
    </article>
  `
};

// 5h. Compare Matrix Sub-Routes (/tools/compare/:slug/)
const compareSubRoutes: RouteMeta[] = conceptComparisons.map(c => {
  const slug = getComparisonSlug(c.id);
  const targetUrl = `https://learnsmc.xyz/tools/compare/${slug}/`;

  return {
    url: targetUrl,
    outputPath: `tools/compare/${slug}/index.html`,
    title: `${c.title} — Compare Matrix | LearnSMC`,
    description: `Key Difference: ${c.keyDifference} Side-by-side technical comparison of ${c.conceptA.name} and ${c.conceptB.name}.`,
    canonical: targetUrl,
    heading: c.title,
    subheading: 'Side-by-Side Microstructure Contrast & Operational Decision Rules',
    badge: 'Side-by-Side Analysis',
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      'name': c.title,
      'description': c.keyDifference
    },
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <div style="background: rgba(37,101,82, 0.08); border-left: 3px solid #2453ef; padding: 1rem 1.25rem; border-radius: 6px; margin-bottom: 1.5rem;">
          <h3 style="color: #121c32; margin: 0 0 0.5rem 0; font-size: 1.1rem;">The Crucial Operational Distinction</h3>
          <p style="color: #121c32; font-size: 0.95rem; margin: 0;">${escapeHtml(c.keyDifference)}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem;">
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem;">
            <h4 style="color: #23796d; margin: 0 0 0.5rem 0;">${escapeHtml(c.conceptA.name)}</h4>
            <p style="font-size: 0.85rem; margin-bottom: 0.75rem;">${escapeHtml(c.conceptA.summary)}</p>
            <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.8rem; line-height: 1.5;">
              ${c.conceptA.keyPoints.map(kp => `<li>${escapeHtml(kp)}</li>`).join('')}
            </ul>
          </div>
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem;">
            <h4 style="color: #705692; margin: 0 0 0.5rem 0;">${escapeHtml(c.conceptB.name)}</h4>
            <p style="font-size: 0.85rem; margin-bottom: 0.75rem;">${escapeHtml(c.conceptB.summary)}</p>
            <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.8rem; line-height: 1.5;">
              ${c.conceptB.keyPoints.map(kp => `<li>${escapeHtml(kp)}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem;">
          <div style="background: rgba(244,63,94,0.08); border: 1px solid rgba(244,63,94,0.2); border-radius: 8px; padding: 1rem;">
            <strong style="color: #b44746;">Common Confusion:</strong>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem;">${escapeHtml(c.commonConfusion)}</p>
          </div>
          <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); border-radius: 8px; padding: 1rem;">
            <strong style="color: #25734f;">Mechanical Decision Rule:</strong>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem;">${escapeHtml(c.decisionRule)}</p>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: #4f5d75;">
          View all pairings in the <a href="/tools/compare/" style="color: #b44746;">Compare Matrix</a> or search definitions in the <a href="/tools/glossary/" style="color: #23796d;">Concepts Glossary</a>.
        </p>
      </article>
    `
  };
});

// 5i. Mastery Profile Sub-Routes (/tools/profile/roadmap/ & /tools/profile/exams/)
const profileRoadmapRoute: RouteMeta = {
  url: 'https://learnsmc.xyz/tools/profile/roadmap/',
  outputPath: 'tools/profile/roadmap/index.html',
  title: 'Institutional Operator Roadmap — Mastery Profile | LearnSMC',
  description: 'Track progression across Level 0 Foundations, Liquidity, Displacement, PD Arrays, and 2026 Advanced Execution Protocols.',
  canonical: 'https://learnsmc.xyz/tools/profile/roadmap/',
  heading: 'Institutional Trader Curriculum Roadmap',
  subheading: 'Progressive Level 0 through Level 5 Competency Milestones',
  badge: 'Curriculum Roadmap',
  schemaJson: {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    'name': 'Mastery Roadmap'
  },
  bodyHtml: `
    <article style="line-height: 1.7; color: #435b50;">
      <p style="font-size: 1rem; color: #121c32; margin-bottom: 1.25rem;">
        The LearnSMC curriculum spans 6 rigorous phases of deliberate practice:
      </p>
      <ul style="padding-left: 1.5rem; line-height: 2;">
        <li><strong>Level 0:</strong> Foundations & Electronic Auction Microstructure (Chapters 1 - 3)</li>
        <li><strong>Level 1:</strong> Market Structure, Swing Mechanics & Liquidity Pools (Chapters 4 - 8)</li>
        <li><strong>Level 2:</strong> Energetic Displacement, Fair Value Gaps & Dealing Range (Chapters 9 - 14)</li>
        <li><strong>Level 3:</strong> Institutional PD Arrays, Breakers & Mitigation Blocks (Chapters 15 - 18)</li>
        <li><strong>Level 4:</strong> Time, Killzones & Daily/Weekly Profiles (Chapters 19 - 21)</li>
        <li><strong>Level 5:</strong> 2026 Smart Money Concepts, ATH Alchemy & Trinity Rules (Chapters 22 - 57)</li>
      </ul>
      <p style="font-size: 0.85rem; color: #4f5d75;">
        Test your readiness across these levels in the <a href="/tools/profile/exams/" style="color: #25734f;">Mastery Diagnostic Exams</a>.
      </p>
    </article>
  `
};

const profileExamsRootRoute: RouteMeta = {
  url: 'https://learnsmc.xyz/tools/profile/exams/',
  outputPath: 'tools/profile/exams/index.html',
  title: 'Institutional Diagnostic Exams — Mastery Profile | LearnSMC',
  description: '5 rigorous diagnostic exams evaluating liquidity mechanics, imbalances, order blocks, and 2026 Smart Money execution.',
  canonical: 'https://learnsmc.xyz/tools/profile/exams/',
  heading: 'Institutional Diagnostic Examination Suite',
  subheading: 'Evaluate Your Market Microstructure Knowledge',
  badge: 'Diagnostic Exams',
  schemaJson: {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    'name': 'Institutional Diagnostic Exams'
  },
  bodyHtml: `
    <article style="line-height: 1.7; color: #435b50;">
      <p style="font-size: 1rem; color: #121c32; margin-bottom: 1.25rem;">
        Benchmark your institutional market understanding with interactive diagnostic assessments:
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem;">
        ${MASTERY_EXAMS.map(e => `
          <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1.25rem;">
            <div style="font-size: 0.75rem; font-family: monospace; color: #25734f; margin-bottom: 0.25rem;">${e.level}</div>
            <a href="/tools/profile/exams/${e.slug}/" style="color: #121c32; text-decoration: none; font-weight: bold; font-size: 1rem; display: block; margin-bottom: 0.5rem;">
              ${escapeHtml(e.title)}
            </a>
            <p style="color: #4f5d75; font-size: 0.85rem; margin: 0;">${escapeHtml(e.description)}</p>
          </div>
        `).join('')}
      </div>
    </article>
  `
};

const profileExamDetailRoutes: RouteMeta[] = MASTERY_EXAMS.map(e => {
  const targetUrl = `https://learnsmc.xyz/tools/profile/exams/${e.slug}/`;

  return {
    url: targetUrl,
    outputPath: `tools/profile/exams/${e.slug}/index.html`,
    title: `${e.title} — Mastery Exam | LearnSMC`,
    description: `${e.description} Level: ${e.level}.`,
    canonical: targetUrl,
    heading: e.title,
    subheading: `Level: ${e.level} Diagnostic Assessment`,
    badge: e.level,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      'name': e.title,
      'description': e.description,
      'educationalLevel': e.level
    },
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <p style="font-size: 1.05rem; color: #121c32; margin-bottom: 1.25rem;">${escapeHtml(e.description)}</p>

        <div style="background: rgba(52,211,153,0.08); border-left: 3px solid #25734f; padding: 1rem 1.25rem; border-radius: 6px; margin-bottom: 1.5rem;">
          <h3 style="color: #121c32; margin: 0 0 0.5rem 0; font-size: 1.1rem;">Exam Parameters</h3>
          <p style="color: #121c32; font-size: 0.95rem; margin: 0;">Passing score: 75% or higher. Evaluates conceptual mastery, operational rules, and invalidation recognition under pressure.</p>
        </div>

        <p style="font-size: 0.85rem; color: #4f5d75;">
          Take this exam with instant scoring in the <a href="/tools/profile/" style="color: #25734f;">Mastery Profile</a>.
        </p>
      </article>
    `
  };
});

// 5j. ICT Delivery Suite Sub-Routes (/tools/delivery-suite/:module/)
const deliverySuiteSubRoutes: RouteMeta[] = DELIVERY_SUITE_MODULES.map(m => {
  const targetUrl = `https://learnsmc.xyz/tools/delivery-suite/${m.slug}/`;

  return {
    url: targetUrl,
    outputPath: `tools/delivery-suite/${m.slug}/index.html`,
    title: `${m.name} — ICT Delivery Suite | LearnSMC`,
    description: m.description,
    canonical: targetUrl,
    heading: m.name,
    subheading: 'Official Precision Institutional Delivery Tool',
    badge: m.badge,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': m.name,
      'applicationCategory': 'Financial Application'
    },
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <p style="font-size: 1.05rem; color: #121c32; margin-bottom: 1.25rem;">${escapeHtml(m.description)}</p>

        <div style="background: rgba(255,107,122,0.08); border-left: 3px solid #b44746; padding: 1rem 1.25rem; border-radius: 6px; margin-bottom: 1.5rem;">
          <h3 style="color: #121c32; margin: 0 0 0.5rem 0; font-size: 1.1rem;">Mathematical &amp; Algorithmic Foundation</h3>
          <p style="color: #121c32; font-size: 0.95rem; margin: 0;">Derived from the canonical algorithms of Inner Circle Trader delivery mechanics. Time and price must synchronize for highest expectancy setups.</p>
        </div>

        <p style="font-size: 0.85rem; color: #4f5d75;">
          Access the live interactive calculator in the <a href="/tools/delivery-suite/" style="color: #b44746;">ICT Delivery Suite</a>.
        </p>
      </article>
    `
  };
});

// 5b. Multi-Tier Dynamic Glossary Categories: /tools/glossary/:category/
const glossaryCategoryRoutes: RouteMeta[] = GLOSSARY_CATEGORIES.map(cat => {
  const catConcepts = ictConcepts.filter(c => c.category === cat.id);
  return {
    url: `https://learnsmc.xyz/tools/glossary/${cat.slug}/`,
    outputPath: `tools/glossary/${cat.slug}/index.html`,
    title: cat.metaTitle,
    description: cat.metaDescription,
    canonical: `https://learnsmc.xyz/tools/glossary/${cat.slug}/`,
    heading: cat.name,
    subheading: cat.description,
    badge: `${cat.badge} • Category`,
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.3rem; color: #121c32; margin-bottom: 0.75rem;">${escapeHtml(cat.name)} Topics (${catConcepts.length})</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
          ${catConcepts.map(c => {
            const mapping = CONCEPT_SLUG_MAP[c.id];
            const cSlug = mapping?.slug || c.id.replace(/_/g, '-');
            return `
              <a href="/tools/glossary/${cat.slug}/${cSlug}/" style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
                <div style="font-weight: bold; color: #23796d; margin-bottom: 0.25rem;">${escapeHtml(c.name)}</div>
                <p style="margin: 0; font-size: 0.8rem; color: #4f5d75;">${escapeHtml(c.shortDefinition)}</p>
              </a>
            `;
          }).join('\n')}
        </div>
      </section>
    `
  };
});

// 5c. Multi-Tier Dynamic Glossary Concepts: /tools/glossary/:category/:concept/
const glossaryConceptRoutes: RouteMeta[] = ictConcepts.map(c => {
  const mapping = CONCEPT_SLUG_MAP[c.id];
  const catSlug = mapping?.categorySlug || 'foundations';
  const cSlug = mapping?.slug || c.id.replace(/_/g, '-');
  const canonicalUrl = `https://learnsmc.xyz/tools/glossary/${catSlug}/${cSlug}/`;

  return {
    url: canonicalUrl,
    outputPath: `tools/glossary/${catSlug}/${cSlug}/index.html`,
    title: mapping?.metaTitle || `${c.name} — ICT Institutional Glossary | LearnSMC`,
    description: mapping?.metaDescription || c.shortDefinition,
    canonical: canonicalUrl,
    heading: c.name,
    subheading: c.shortDefinition,
    badge: `${c.category} • ICT Framework`,
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <section style="margin-bottom: 1.5rem;">
          <h3 style="color: #23796d; font-size: 1.1rem; margin-bottom: 0.5rem;">1. Mechanism &amp; Operational Logic</h3>
          <p><strong style="color: #121c32;">Why It Exists:</strong> ${escapeHtml(c.whyItExists)}</p>
          <p><strong style="color: #121c32;">Problem It Solves:</strong> ${escapeHtml(c.problemItSolves)}</p>
          <p><strong style="color: #121c32;">How It Forms:</strong> ${escapeHtml(c.howItForms)}</p>
        </section>
        <section style="margin-bottom: 1.5rem;">
          <h3 style="color: #2453ef; font-size: 1.1rem; margin-bottom: 0.5rem;">2. Visual Anatomy &amp; Identification Rules</h3>
          <p>${escapeHtml(c.chartAnatomy)}</p>
          <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
            ${(c.identificationRules || []).map(r => `<li>${escapeHtml(r)}</li>`).join('')}
          </ul>
        </section>
        <section style="margin-bottom: 1.5rem;">
          <h3 style="color: #94631f; font-size: 1.1rem; margin-bottom: 0.5rem;">3. Mechanical Invalidation Threshold</h3>
          <p>${escapeHtml(c.invalidationCriteria)}</p>
        </section>
      </article>
    `
  };
});

// 5d. Multi-Tier Deep Sub-Concepts: /tools/glossary/:category/:subConcept/
const deepSubConceptRoutes: RouteMeta[] = DEEP_SUB_CONCEPTS.map(sub => {
  const canonicalUrl = `https://learnsmc.xyz/tools/glossary/${sub.categorySlug}/${sub.slug}/`;
  return {
    url: canonicalUrl,
    outputPath: `tools/glossary/${sub.categorySlug}/${sub.slug}/index.html`,
    title: sub.metaTitle,
    description: sub.metaDescription,
    canonical: canonicalUrl,
    heading: sub.name,
    subheading: sub.subtitle,
    badge: `Deep Sub-Concept • ${sub.categorySlug}`,
    bodyHtml: `
      <article style="line-height: 1.7; color: #435b50;">
        <p style="font-size: 1rem; color: #121c32; margin-bottom: 1rem;">${escapeHtml(sub.shortDefinition)}</p>
        <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
          <h2 style="color: #23796d; margin-top: 0;">Study criteria and rules of thumb</h2>
          <ul style="padding-left: 1.5rem;">
            ${sub.keyPoints.map(pt => `<li>${escapeHtml(pt)}</li>`).join('')}
          </ul>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(244,63,94,0.08); border: 1px solid rgba(244,63,94,0.2); border-radius: 8px; padding: 1rem;">
            <strong style="color: #b44746;">Structural Invalidation:</strong>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">${escapeHtml(sub.invalidation)}</p>
          </div>
          <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); border-radius: 8px; padding: 1rem;">
            <strong style="color: #25734f;">Market Scenario:</strong>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">${escapeHtml(sub.exampleScenario)}</p>
          </div>
        </div>
      </article>
    `
  };
});

// Combine Hub, Tool, and Dynamic Glossary pages
allRoutes.push(homePage);
allRoutes.push(...legalPages);
allRoutes.push(curriculumHubPage);
allRoutes.push(masoodHubPage);
allRoutes.push(...masoodSubPages);
allRoutes.push(...workbenchTools);
allRoutes.push(...masterclassCategoryRoutes);
allRoutes.push(...masterclassModuleRoutes);
allRoutes.push(...chartLabScenarioRoutes);
allRoutes.push(...simulatorModelRoutes);
allRoutes.push(...backtestStrategyRoutes);
allRoutes.push(...journalSectionRoutes);
allRoutes.push(...knowledgeGraphStepRoutes);
allRoutes.push(knowledgeGraphNetworkRoute);
allRoutes.push(...compareSubRoutes);
allRoutes.push(profileRoadmapRoute);
allRoutes.push(profileExamsRootRoute);
allRoutes.push(...profileExamDetailRoutes);
allRoutes.push(...deliverySuiteSubRoutes);
allRoutes.push(...glossaryCategoryRoutes);
allRoutes.push(...glossaryConceptRoutes);
allRoutes.push(...deepSubConceptRoutes);

// 6. Process All 53 Chapters at Canonical /learn/:slug/
for (const ch of textbookChapters) {
  const chapterRoute: RouteMeta = {
    url: getLessonCanonicalUrl(ch.slug),
    outputPath: `learn/${ch.slug}/index.html`,
    title: `${ch.title} — Chapter ${ch.id} | LearnSMC`,
    description: `Master ${ch.title} (${ch.part}). ${ch.summary.slice(0, 2).join(' ')} In-depth institutional notes, diagrams, and rules.`,
    canonical: getLessonCanonicalUrl(ch.slug),
    heading: `Chapter ${ch.id}: ${ch.title}`,
    subheading: `${ch.part} · Level ${ch.level} Institutional Module`,
    badge: `Chapter ${ch.id} · ${ch.part}`,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      'name': `Chapter ${ch.id}: ${ch.title}`,
      'description': ch.summary[0] || ch.title,
      'learningResourceType': 'Lesson',
      'educationalLevel': `Level ${ch.level}`,
      'isPartOf': {
        '@type': 'Course',
        'name': 'LearnSMC Institutional Trading Curriculum',
        'url': 'https://learnsmc.xyz/curriculum/'
      }
    },
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <blockquote style="border-left: 3px solid #2453ef; padding-left: 1rem; margin: 0 0 1.5rem 0; font-style: italic; color: #4f5d75;">
          ${escapeHtml(ch.quote)}
        </blockquote>
        <h2 style="font-size: 1.35rem; color: #121c32; margin-bottom: 0.75rem;">Chapter Executive Summary</h2>
        <ul style="padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8; color: #435b50;">
          ${ch.summary.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
        </ul>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.35rem; color: #121c32; margin-bottom: 0.75rem;">Core Vocabulary & Key Terms</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          ${ch.keyTerms.map(kt => `
            <div style="background: rgba(34,59,53,0.03); border: 1px solid rgba(34,59,53,0.08); border-radius: 8px; padding: 1rem;">
              <div style="font-weight: bold; color: #705692; font-family: monospace; margin-bottom: 0.25rem;">${escapeHtml(kt.term)}</div>
              <div style="color: #435b50; font-size: 0.85rem; line-height: 1.5;">${escapeHtml(kt.definition)}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.35rem; color: #121c32; margin-bottom: 0.75rem;">Detailed Lesson Sections</h2>
        ${ch.sections.map((sec, idx) => `
          <div style="border-top: 1px solid rgba(34,59,53,0.06); padding-top: 1.25rem; margin-top: 1.25rem;">
            <h3 style="color: #121c32; font-size: 1.15rem; margin-bottom: 0.5rem;">${escapeHtml(sec.title)}</h3>
            ${lessonParagraphs(sec.content).map(paragraph => `<p data-lesson-content style="color: #435b50; line-height: 1.7; margin-bottom: 0.75rem;">${renderContextualText(paragraph, getLessonPath(ch.slug))}</p>`).join('')}
            ${sec.keyTakeaway ? `
              <div style="background: rgba(37,101,82, 0.08); border-left: 3px solid #705692; padding: 0.75rem 1rem; border-radius: 4px; font-size: 0.85rem; color: #121c32;">
                <strong style="color: #405a98;">Key Takeaway:</strong> ${escapeHtml(sec.keyTakeaway)}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </section>


    `
  };

  allRoutes.push(chapterRoute);
}

// 7. Process Masood Lectures at /masood/lectures/:id/
const allMasoodLectures = masoodPlaylistsData.flatMap(p => p.lectures);
for (const lec of allMasoodLectures) {
  const lectureRoute: RouteMeta = {
    url: `https://learnsmc.xyz/masood/lectures/${lec.id}/`,
    outputPath: `masood/lectures/${lec.id}/index.html`,
    title: `${lec.title} — Trader Abdullah Masood | LearnSMC`,
    description: `${lec.shortSummary} Comprehensive video analysis, checklists, and institutional trading rules by Trader Abdullah Masood.`,
    canonical: `https://learnsmc.xyz/masood/lectures/${lec.id}/`,
    heading: `${lec.title}`,
    subheading: `Lecture ${lec.lectureNumber} · Trader Abdullah Masood Curriculum`,
    badge: `Lecture ${lec.lectureNumber} · ${lec.playlistType.toUpperCase()}`,
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.35rem; color: #121c32; margin-bottom: 0.75rem;">Executive Summary</h2>
        <p style="color: #435b50; line-height: 1.7; margin-bottom: 1.5rem;">${escapeHtml(lec.shortSummary)}</p>

        <h3 style="font-size: 1.15rem; color: #121c32; margin-bottom: 0.5rem;">Core Institutional Rules</h3>
        <ul style="padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8; color: #435b50;">
          ${lec.coreRules.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
        </ul>

        <h3 style="font-size: 1.15rem; color: #121c32; margin-bottom: 0.5rem;">Key Takeaways</h3>
        <ul style="padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8; color: #435b50;">
          ${lec.keyTakeaways.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>

        ${lec.tradingChecklist ? `
          <h3 style="font-size: 1.15rem; color: #121c32; margin-bottom: 0.5rem;">Pre-Flight Execution Checklist</h3>
          <ul style="padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8; color: #435b50;">
            ${lec.tradingChecklist.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
          </ul>
        ` : ''}

        ${lec.youtubeId ? `
          <div style="margin-top: 1.5rem;">
            <a href="https://www.youtube.com/watch?v=${lec.youtubeId}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.25rem; background: #E11D48; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 0.85rem;">
              Watch Lecture on YouTube &rarr;
            </a>
          </div>
        ` : ''}
      </section>
    `
  };

  allRoutes.push(lectureRoute);
}

// 8. Generate 404 Not Found Page (Noindex)
const notFoundPage: RouteMeta = {
  url: 'https://learnsmc.xyz/404',
  outputPath: '404.html',
  title: '404 - Module Not Found | LearnSMC',
  description: 'The requested trading module, chapter, or workbench tool does not exist. Explore the 57-chapter institutional curriculum on LearnSMC.',
  canonical: 'https://learnsmc.xyz/404',
  heading: 'HTTP 404 // Module Not Found',
  subheading: 'The requested path does not match any published ICT textbook chapter or workbench tool.',
  badge: 'Status: 404 Not Found',
  isNoindex: true,
  bodyHtml: `
    <div style="text-align: center; padding: 2rem 1rem;">
      <p style="font-size: 1.1rem; color: #4f5d75; margin-bottom: 2rem;">
        The requested URL was not found on LearnSMC.
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="/curriculum/" style="display: inline-block; padding: 0.75rem 1.5rem; background: #2453ef; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 0.9rem;">
          View 57 Curriculum Chapters &rarr;
        </a>
        <a href="/" style="display: inline-block; padding: 0.75rem 1.5rem; background: rgba(34,59,53,0.06); color: #4f5d75; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 0.9rem; border: 1px solid rgba(34,59,53,0.12);">
          Return to Homepage
        </a>
      </div>
    </div>
  `
};

allRoutes.push(...articlePages(projectRoot, distDir));

console.log(`Starting static prerendering for ${allRoutes.length} canonical routes...`);

// Render and write all canonical routes
prepareRoutes(allRoutes);
for (const route of allRoutes) {
  enrichRoute(route, allRoutes);
  const filePath = path.resolve(distDir, route.outputPath);
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const pageHtml = generatePrerenderedHtml(route);
  fs.writeFileSync(filePath, pageHtml, 'utf-8');

  // Track sitemap entry for indexable pages
  if (!route.isNoindex) {
    let priority = '0.7';
    let changefreq = 'monthly';

    if (route.outputPath === 'index.html' || route.url === 'https://learnsmc.xyz/') {
      priority = '1.0';
      changefreq = 'weekly';
    } else if (route.outputPath.startsWith('learn/')) {
      priority = '0.9';
      changefreq = 'weekly';
    } else if (route.outputPath.startsWith('curriculum/') || route.outputPath.startsWith('masood/')) {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (route.outputPath.startsWith('tools/glossary/')) {
      priority = '0.85';
      changefreq = 'weekly';
    } else if (route.outputPath.startsWith('tools/')) {
      priority = '0.8';
      changefreq = 'weekly';
    }

    sitemapUrls.push({
      loc: route.url,
      changefreq,
      priority
    });
  }
}

// Write 404 page
const notFoundHtml = generatePrerenderedHtml(notFoundPage);
fs.writeFileSync(path.resolve(distDir, '404.html'), notFoundHtml, 'utf-8');

console.log('✓ Generated 404.html for static hosting fallback');

// 9. Generate Legacy Backward Compatibility Routes (/chapter/:id/index.html & /chapter/index.html)
// Pointing canonical to /learn/:slug/ with instant client redirect
for (const ch of textbookChapters) {
  const legacyDir = path.resolve(distDir, `chapter/${ch.id}`);
  if (!fs.existsSync(legacyDir)) {
    fs.mkdirSync(legacyDir, { recursive: true });
  }

  const legacyHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(ch.title)} | LearnSMC</title>
    <link rel="canonical" href="${getLessonCanonicalUrl(ch.slug)}" />
    <meta http-equiv="refresh" content="0; url=${getLessonPath(ch.slug)}" />
    <script>window.location.replace('${getLessonPath(ch.slug)}');</script>
  </head>
  <body style="background: #ffffff; color: #121c32; font-family: sans-serif; padding: 2rem; text-align: center;">
    <p>Navigating to Chapter ${ch.id}: <a href="${getLessonPath(ch.slug)}" style="color: #23796d;">${escapeHtml(ch.title)}</a>...</p>
  </body>
</html>`;

  fs.writeFileSync(path.resolve(legacyDir, 'index.html'), legacyHtml, 'utf-8');
}

// Fallback /chapter/index.html pointing to /curriculum/
const chapterRootDir = path.resolve(distDir, 'chapter');
if (!fs.existsSync(chapterRootDir)) {
  fs.mkdirSync(chapterRootDir, { recursive: true });
}
const chapterRootHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Curriculum — 57 Chapters | LearnSMC</title>
    <link rel="canonical" href="https://learnsmc.xyz/curriculum/" />
    <meta http-equiv="refresh" content="0; url=/curriculum/" />
    <script>window.location.replace('/curriculum/');</script>
  </head>
  <body style="background: #ffffff; color: #121c32; font-family: sans-serif; padding: 2rem; text-align: center;">
    <p>Navigating to Curriculum: <a href="/curriculum/" style="color: #23796d;">Curriculum</a>...</p>
  </body>
</html>`;
fs.writeFileSync(path.resolve(chapterRootDir, 'index.html'), chapterRootHtml, 'utf-8');

// 9b. Legacy Redirect for /tools/concepts/ -> /tools/glossary/
const legacyConceptsDir = path.resolve(distDir, 'tools/concepts');
if (!fs.existsSync(legacyConceptsDir)) {
  fs.mkdirSync(legacyConceptsDir, { recursive: true });
}
const legacyConceptsHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Concepts Glossary | LearnSMC</title>
    <link rel="canonical" href="https://learnsmc.xyz/tools/glossary/" />
    <meta http-equiv="refresh" content="0; url=/tools/glossary/" />
    <script>window.location.replace('/tools/glossary/');</script>
  </head>
  <body style="background: #ffffff; color: #121c32; font-family: sans-serif; padding: 2rem; text-align: center;">
    <p>Navigating to Glossary: <a href="/tools/glossary/" style="color: #23796d;">Glossary</a>...</p>
  </body>
</html>`;
fs.writeFileSync(path.resolve(legacyConceptsDir, 'index.html'), legacyConceptsHtml, 'utf-8');

// 9c. Legacy Redirect for /workbench/ -> /tools/
// 9c. Legacy Redirect for /workbench/ -> /tools/
const legacyWorkbenchDir = path.resolve(distDir, 'workbench');
if (!fs.existsSync(legacyWorkbenchDir)) {
  fs.mkdirSync(legacyWorkbenchDir, { recursive: true });
}
const legacyWorkbenchHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Trading Tools & Workbench | LearnSMC</title>
    <link rel="canonical" href="https://learnsmc.xyz/tools/" />
    <meta http-equiv="refresh" content="0; url=/tools/" />
    <script>window.location.replace('/tools/');</script>
  </head>
  <body style="background: #ffffff; color: #121c32; font-family: sans-serif; padding: 2rem; text-align: center;">
    <p>Navigating to Workbench: <a href="/tools/" style="color: #23796d;">Workbench</a>...</p>
  </body>
</html>`;
fs.writeFileSync(path.resolve(legacyWorkbenchDir, 'index.html'), legacyWorkbenchHtml, 'utf-8');

// 9d. Legacy / Alternative Aliases:
// /tools/graph/ -> /tools/knowledge-graph/
// /tools/dashboard/ -> /tools/profile/
// /tools/ict-suite/ & /tools/ict_suite/ -> /tools/delivery-suite/
const aliasMappings = [
  { fromDir: 'tools/graph', toUrl: '/tools/knowledge-graph/', title: 'Knowledge Graph' },
  { fromDir: 'tools/dashboard', toUrl: '/tools/profile/', title: 'Mastery Profile' },
  { fromDir: 'tools/ict-suite', toUrl: '/tools/delivery-suite/', title: 'ICT Delivery Suite' },
  { fromDir: 'tools/ict_suite', toUrl: '/tools/delivery-suite/', title: 'ICT Delivery Suite' }
];

for (const alias of aliasMappings) {
  const aliasDir = path.resolve(distDir, alias.fromDir);
  if (!fs.existsSync(aliasDir)) {
    fs.mkdirSync(aliasDir, { recursive: true });
  }
  const aliasHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${alias.title} | LearnSMC</title>
    <link rel="canonical" href="https://learnsmc.xyz${alias.toUrl}" />
    <meta http-equiv="refresh" content="0; url=${alias.toUrl}" />
    <script>window.location.replace('${alias.toUrl}');</script>
  </head>
  <body style="background: #ffffff; color: #121c32; font-family: sans-serif; padding: 2rem; text-align: center;">
    <p>Redirecting to <a href="${alias.toUrl}" style="color: #23796d;">${alias.title}</a>...</p>
  </body>
</html>`;
  fs.writeFileSync(path.resolve(aliasDir, 'index.html'), aliasHtml, 'utf-8');
}

console.log(`✓ Generated ${textbookChapters.length} legacy /chapter/:id redirect aliases + /chapter root fallback + /tools/concepts & tool aliases`);

// 10. Generate Complete XML Sitemap
// Ensure homepage is first
const finalSitemapUrls = [
  {
    loc: 'https://learnsmc.xyz/',
    changefreq: 'weekly',
    priority: '1.0'
  },
  ...sitemapUrls.filter(u => u.loc !== 'https://learnsmc.xyz/')
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${finalSitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const distSitemapPath = path.resolve(distDir, 'sitemap.xml');
const publicSitemapPath = path.resolve(projectRoot, 'public', 'sitemap.xml');

fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');


console.log(`✓ Generated sitemap.xml with ${finalSitemapUrls.length} verified canonical URLs`);

// 11. Generate Edge Redirects (_redirects for Cloudflare Pages and Netlify)
const redirectsLines: string[] = [
  '# ====================================================================',
  '# Cloudflare Pages & Netlify Edge Redirects',
  '# HTTP 301 Permanent Redirects: Legacy Chapter URLs -> Canonical Lessons',
  '# ====================================================================',
  '',
];

for (const ch of textbookChapters) {
  redirectsLines.push(`/chapter/${ch.id}     ${getLessonPath(ch.slug)}    301`);
  redirectsLines.push(`/chapter/${ch.id}/    ${getLessonPath(ch.slug)}    301`);
}

redirectsLines.push('');
redirectsLines.push('# Legacy /chapter root and invalid identifier fallbacks');
redirectsLines.push('/chapter          /curriculum/          301');
redirectsLines.push('/chapter/         /curriculum/          301');
redirectsLines.push('/chapter/*        /curriculum/          301');
redirectsLines.push('');
redirectsLines.push('# Workbench & Glossary route migrations');
redirectsLines.push('/workbench          /tools/               301');
redirectsLines.push('/workbench/         /tools/               301');
redirectsLines.push('/tools/concepts     /tools/glossary/      301');
redirectsLines.push('/tools/concepts/    /tools/glossary/      301');
redirectsLines.push('/tools/concepts/*   /tools/glossary/      301');
redirectsLines.push('/tools/graph        /tools/knowledge-graph/  301');
redirectsLines.push('/tools/graph/       /tools/knowledge-graph/  301');
redirectsLines.push('/tools/graph/*      /tools/knowledge-graph/  301');
redirectsLines.push('/tools/dashboard    /tools/profile/       301');
redirectsLines.push('/tools/dashboard/   /tools/profile/       301');
redirectsLines.push('/tools/dashboard/*  /tools/profile/       301');
redirectsLines.push('/tools/mastery-profile  /tools/profile/   301');
redirectsLines.push('/tools/mastery-profile/ /tools/profile/   301');
redirectsLines.push('/tools/mastery-profile/* /tools/profile/  301');
redirectsLines.push('/tools/ict_suite    /tools/delivery-suite/ 301');
redirectsLines.push('/tools/ict_suite/   /tools/delivery-suite/ 301');
redirectsLines.push('/tools/ict_suite/*  /tools/delivery-suite/ 301');
redirectsLines.push('');
// Missing documents use the generated 404 page. No success-status SPA catch-all.
for (const [from, to] of Object.entries(canonicalAliases)) {
  redirectsLines.push(`${from} ${to} 301`, `${from.slice(0, -1)} ${to} 301`);
}
// Cloudflare deduplicates by source path, not by the full formatted line.
const redirectTargets = new Map<string, string>();
const uniqueRedirectLines = redirectsLines.filter(line => {
  const parts = line.trim().split(/\s+/);
  if (!parts[0]?.startsWith('/') || parts.length !== 3) return true;
  const [source, target, status] = parts;
  const destination = `${target} ${status}`;
  if (redirectTargets.has(source)) {
    if (redirectTargets.get(source) !== destination) throw new Error(`Conflicting redirect for ${source}`);
    return false;
  }
  redirectTargets.set(source, destination);
  return true;
});
const redirectsContent = orderRedirectRules(uniqueRedirectLines.join('\n'));
fs.writeFileSync(path.resolve(distDir, '_redirects'), redirectsContent, 'utf-8');

console.log(`✓ Generated _redirects with ${textbookChapters.length * 2 + 17} legacy 301 rules`);

console.log('✓ Prerendering and SEO build completed successfully!');

fs.writeFileSync(path.resolve(distDir, 'seo-manifest.json'), JSON.stringify(allRoutes.map(r => ({
  path: new URL(r.canonical).pathname, title: r.title, description: r.description,
  outputPath: r.outputPath, indexable: !r.isNoindex,
})), null, 2));

// Optional AI orientation files, not a substitute for indexing or robots rules.
const llms = '# LearnSMC\n\n> Independent ICT and Smart Money Concepts study notes by Muhammad Umer Ijaz. Education is not investment advice or proof of future performance.\n\n## Main sections\n\n' +
  ['/curriculum/', '/masood/', '/tools/glossary/', '/tools/compare/', '/about/', '/contact/', '/disclaimer/'].map(p => {
    const r = allRoutes.find(r => new URL(r.canonical).pathname === p)!;
    return `- [${r.heading}](${r.canonical}): ${r.description}`;
  }).join('\n') + '\n\n## Attribution\n\nWritten notes: Muhammad Umer Ijaz. Linked videos retain their original authorship; linking does not imply endorsement or review. Canonical HTML pages are the primary source.\n';
fs.writeFileSync(path.join(distDir, 'llms.txt'), llms);
fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llms + '\n## Published page directory\n\n' + allRoutes.filter(r => !r.isNoindex).map(r => `- [${r.heading}](${r.canonical}): ${r.description}`).join('\n') + '\n');

// Only completed language editions enter the public sitemap. Review builds remain noindex.
if (URDU_PUBLISHED || process.env.URDU_FULL_PREVIEW === 'true') generateUrduPages(distDir, allRoutes);
applySitemapDates(distDir);
