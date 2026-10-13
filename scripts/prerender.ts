import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { textbookChapters } from '../src/data/chaptersData.ts';
import { masoodPlaylistsData } from '../src/data/masoodData.ts';
import { 
  BASE_URL, 
  normalizeCanonicalUrl, 
  getLessonCanonicalUrl, 
  getLessonPath 
} from '../src/utils/url.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');
const templatePath = path.resolve(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html does not exist. Run "vite build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf-8');

interface RouteMeta {
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

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generatePrerenderedHtml(meta: RouteMeta): string {
  let html = templateHtml;

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

  // Optional Schema.org JSON-LD injection
  if (meta.schemaJson) {
    const jsonLdString = `<script type="application/ld+json">\n${JSON.stringify(meta.schemaJson, null, 2)}\n</script>`;
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
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090D; color: #F5F7FA; min-height: 100vh; padding: 2rem 1.5rem; max-width: 1200px; mx-auto; margin: 0 auto; box-sizing: border-box;">
      <!-- Crawlable Header -->
      <header style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.5rem; margin-bottom: 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <a href="/" style="font-weight: 800; font-size: 1.25rem; color: #ffffff; text-decoration: none; letter-spacing: -0.02em;">
            LearnSMC <span style="font-size: 0.85rem; color: #55E6D1; font-weight: normal; font-family: monospace;">// ICT &amp; SMC ACADEMY</span>
          </a>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; color: #94A3B8;">Free Institutional Smart Money Concepts Curriculum &amp; Research Matrix</p>
        </div>
        <nav style="display: flex; gap: 1.25rem; font-size: 0.85rem; font-family: monospace;" aria-label="Main Navigation">
          <a href="/" style="color: #CBD5E1; text-decoration: none;">Home</a>
          <a href="/curriculum/" style="color: #CBD5E1; text-decoration: none;">57 Chapters</a>
          <a href="/masood/" style="color: #CBD5E1; text-decoration: none;">Masood Academy</a>
          <a href="/tools/" style="color: #CBD5E1; text-decoration: none;">Workbench Lab</a>
          <a href="/about/" style="color: #CBD5E1; text-decoration: none;">About</a>
        </nav>
      </header>

      <!-- Main Article / Route Body -->
      <main>
        <article>
          <header style="margin-bottom: 2rem;">
            <div style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; background: rgba(88, 101, 255, 0.15); border: 1px solid rgba(88, 101, 255, 0.3); color: #8A72FF; font-size: 0.75rem; font-family: monospace; margin-bottom: 0.75rem;">
              ${escapeHtml(meta.badge)}
            </div>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin: 0 0 0.75rem 0; letter-spacing: -0.03em; line-height: 1.2;">
              ${escapeHtml(meta.heading)}
            </h1>
            <p style="font-size: 1.1rem; color: #94A3B8; line-height: 1.6; margin: 0;">
              ${escapeHtml(meta.subheading)}
            </p>
          </header>

          <div style="background: rgba(17, 20, 27, 0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 2rem; margin-bottom: 3rem;">
            ${meta.bodyHtml}
          </div>
        </article>
      </main>

      <!-- Crawlable Static Footer -->
      <footer style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 2rem; margin-top: 4rem; font-size: 0.85rem; color: #64748B;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2rem; margin-bottom: 2rem;">
          <div>
            <div style="color: #ffffff; font-weight: 600; margin-bottom: 0.5rem;">LearnSMC · ICT &amp; SMC Academy</div>
            <p style="margin: 0; max-width: 400px; line-height: 1.5;">Free, open-access institutional education. Empowering retail traders with institutional auction literacy.</p>
          </div>
          <div style="display: flex; gap: 2rem; font-family: monospace;">
            <div>
              <div style="color: #CBD5E1; font-weight: 600; margin-bottom: 0.5rem;">Navigation</div>
              <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
                <li><a href="/" style="color: #94A3B8; text-decoration: none;">Home</a></li>
                <li><a href="/curriculum/" style="color: #94A3B8; text-decoration: none;">Curriculum</a></li>
                <li><a href="/masood/" style="color: #94A3B8; text-decoration: none;">Masood Academy</a></li>
                <li><a href="/tools/" style="color: #94A3B8; text-decoration: none;">Trading Tools</a></li>
              </ul>
            </div>
            <div>
              <div style="color: #CBD5E1; font-weight: 600; margin-bottom: 0.5rem;">Legal &amp; Policy</div>
              <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
                <li><a href="/disclaimer/" style="color: #94A3B8; text-decoration: none;">Financial Disclaimer</a></li>
                <li><a href="/privacy/" style="color: #94A3B8; text-decoration: none;">Privacy Policy</a></li>
                <li><a href="/terms/" style="color: #94A3B8; text-decoration: none;">Terms of Service</a></li>
                <li><a href="/about/" style="color: #94A3B8; text-decoration: none;">About Publisher</a></li>
                <li><a href="/contact/" style="color: #94A3B8; text-decoration: none;">Contact Us</a></li>
                <li><a href="/adsense/" style="color: #94A3B8; text-decoration: none;">AdSense Transparency</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style="text-align: center; font-family: monospace; font-size: 0.75rem; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 1.5rem;">
          © 2026 LearnSMC. Published strictly for educational purposes. No financial advice.
        </div>
      </footer>
    </div>
  `;

  // Inject prerendered content into <div id="root">
  html = html.replace(/<div id="root">[\s\S]*?<\/div>(\s*<script type="module" src="\/src\/main\.tsx"><\/script>)/, `<div id="root">${renderedContent}</div>$1`);
  if (!html.includes(renderedContent)) {
    html = html.replace(/<div id="root">[\s\S]*?<\/div>(\s*<script type="module" src="\/assets\/[^"]+"><\/script>)/, `<div id="root">${renderedContent}</div>$1`);
  }
  if (!html.includes(renderedContent)) {
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${renderedContent}</div>`);
  }

  return html;
}

// -------------------------------------------------------------
// Route Definitions
// -------------------------------------------------------------

const allRoutes: RouteMeta[] = [];
const sitemapUrls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];
const todayIso = new Date().toISOString().split('T')[0];

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
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">1. Our Publisher Mission</h2>
        <p style="margin-bottom: 1rem; line-height: 1.7; color: #C5CBD8;">
          LearnSMC was founded to bridge the divide between predatory retail trading lore and genuine institutional auction delivery. 
          Historically, Inner Circle Trader (ICT) concepts and Smart Money Concepts (SMC) have been obscured behind expensive paywalls, 
          unverified signal services, and misleading affiliate schemes. LearnSMC publishes a peer-reviewed, free-for-life 57-chapter curriculum 
          alongside 52 comprehensive Abdullah Masood masterclass breakdowns.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">2. Rigorous Editorial Architecture & Tripartite Model</h2>
        <p style="margin-bottom: 1rem; line-height: 1.7; color: #C5CBD8;">
          Every concept published on LearnSMC is broken down through a strict tripartite model:
        </p>
        <ul style="padding-left: 1.5rem; margin-bottom: 1rem; line-height: 1.8; color: #C5CBD8;">
          <li><strong style="color: #fff;">1. Original ICT Pedagogy:</strong> Michael J. Huddleston's primary teaching from the 2016–2024 mentorships.</li>
          <li><strong style="color: #fff;">2. Observable Market Behavior:</strong> What empirical auction order flow, limit books, and tick data show on live charts.</li>
          <li><strong style="color: #fff;">3. Institutional Invalidation Rules:</strong> Quantitative rules that definitively void the trade idea before real capital is committed.</li>
        </ul>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">3. Publisher & Editorial Board</h2>
        <p style="line-height: 1.7; color: #C5CBD8;">
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
        <h3 style="color: #F87171; margin-top: 0; font-size: 1.15rem; font-weight: bold;">HIGH RISK WARNING & CAPITAL PRESERVATION NOTICE</h3>
        <p style="margin: 0; line-height: 1.6; color: #FCA5A5;">
          Trading foreign exchange (Forex), commodities, futures, equities, and digital assets on margin carries a high level of risk and may not be suitable for all investors. 
          The high degree of leverage can work against you as well as for you. Before deciding to trade foreign exchange or any financial market, you should carefully consider your investment objectives, level of experience, and risk appetite. 
          There is a possibility that you may sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose.
        </p>
      </div>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">CFTC RULE 4.41 - HYPOTHETICAL PERFORMANCE DISCLOSURE</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN INHERENT LIMITATIONS. UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. ALSO, SINCE THE TRADES HAVE NOT ACTUALLY BEEN EXECUTED, THE RESULTS MAY HAVE UNDER- OR OVER-COMPENSATED FOR THE IMPACT, IF ANY, OF CERTAIN MARKET FACTORS, SUCH AS LACK OF LIQUIDITY. SIMULATED TRADING PROGRAMS IN GENERAL ARE ALSO SUBJECT TO THE FACT THAT THEY ARE DESIGNED WITH THE BENEFIT OF HINDSIGHT. NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFITS OR LOSSES SIMILAR TO THOSE SHOWN.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">Educational Only Mandate</h2>
        <p style="line-height: 1.7; color: #C5CBD8;">
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
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">1. Data Collection & Usage</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          LearnSMC does not sell, rent, or lease personal customer data to any third party. 
          When you use our open educational resources, your study progress, bookmarks, journal notes, and simulation data are stored locally in your browser via HTML5 LocalStorage, ensuring complete privacy.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">2. Google AdSense & Third-Party Cookies</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          We use Google AdSense (Publisher ID: ca-pub-6985025314302607) to serve contextual educational advertisements. 
          Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. 
          Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to LearnSMC and/or other sites on the Internet.
        </p>
        <p style="line-height: 1.7; color: #C5CBD8;">
          Users may opt out of personalized advertising by visiting Google Ad Settings (<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style="color: #55E6D1;">https://adssettings.google.com</a>) or via the Network Advertising Initiative opt-out page (<a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" style="color: #55E6D1;">https://optout.networkadvertising.org</a>).
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
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">1. Acceptance of Terms</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          By accessing or using LearnSMC (learnsmc.xyz), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">2. Open Educational License</h2>
        <p style="line-height: 1.7; color: #C5CBD8;">
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
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">Direct Communication Channels</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          For educational questions, technical bugs, peer-review contributions, or copyright inquiries, reach us at:
        </p>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <p style="margin: 0 0 0.5rem 0; font-family: monospace; font-size: 1rem; color: #55E6D1;">support@learnsmc.xyz</p>
          <p style="margin: 0; font-size: 0.85rem; color: #94A3B8;">Average response turnaround: 24 to 48 business hours.</p>
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
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">Publisher Record</h2>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="font-family: monospace; color: #55E6D1; margin-bottom: 0.5rem;">Publisher ID: ca-pub-6985025314302607</div>
          <div style="font-family: monospace; color: #8A72FF;">ads.txt Entry: google.com, pub-6985025314302607, DIRECT, f08c47fec0942fa0</div>
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
  subheading: 'Master algorithmic price delivery, market microstructure, and high-probability trade execution protocols.',
  badge: 'Complete Syllabus Overview',
  bodyHtml: `
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 1rem;">Curriculum Phases & Modules</h2>
      <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1.5rem;">
        The LearnSMC curriculum is engineered in a logical, cumulative order. Each chapter builds upon foundational electronic auction mechanics, progressing into advanced intraday delivery algorithms.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
        ${textbookChapters.map(ch => `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-family: monospace; color: #55E6D1; margin-bottom: 0.25rem;">Chapter ${ch.id} · Level ${ch.level}</div>
            <a href="${getLessonPath(ch.slug)}" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 0.95rem; display: block; margin-bottom: 0.5rem;">
              ${escapeHtml(ch.title)}
            </a>
            <p style="color: #94A3B8; font-size: 0.8rem; line-height: 1.4; margin: 0;">${escapeHtml(ch.summary[0])}</p>
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
      <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">Mentorship Curriculum</h2>
      <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1.5rem;">
        Trader Abdullah Masood has distilled complex institutional algorithmic mechanics into crystal-clear, actionable rules. 
        Browse all 6 playlist series covering Beginner Foundations, Gold Legacy, Core ICT Mentorship, Advanced Market Geometry, and Live Trade Breakdowns.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <a href="/masood/animations/" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
          <div style="color: #55E6D1; font-weight: bold; margin-bottom: 0.25rem;">Animated Explainers</div>
          <p style="margin: 0; font-size: 0.8rem; color: #94A3B8;">Visual step-by-step animations of PO3, Fair Value Gap formation, and Liquidity Sweeps.</p>
        </a>
        <a href="/masood/bias-calculator/" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
          <div style="color: #8A72FF; font-weight: bold; margin-bottom: 0.25rem;">Daily Bias Calculator</div>
          <p style="margin: 0; font-size: 0.8rem; color: #94A3B8;">Systematic 4-step framework to determine higher timeframe daily candle direction.</p>
        </a>
        <a href="/masood/golden-rules/" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
          <div style="color: #FF5722; font-weight: bold; margin-bottom: 0.25rem;">Golden Execution Rules</div>
          <p style="margin: 0; font-size: 0.8rem; color: #94A3B8;">Non-negotiable risk management principles and entry execution criteria.</p>
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
      <p style="line-height: 1.7; color: #C5CBD8;">
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
      <p style="line-height: 1.7; color: #C5CBD8;">
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
      <ul style="padding-left: 1.5rem; line-height: 1.8; color: #C5CBD8;">
        <li><strong style="color: #fff;">Rule 1:</strong> Never enter a trade during the 09:30 AM equities open without a pre-market higher timeframe draw on liquidity.</li>
        <li><strong style="color: #fff;">Rule 2:</strong> Invalidation occurs at the candle body close beyond the Consequent Encroachment (50%) of the Fair Value Gap.</li>
        <li><strong style="color: #fff;">Rule 3:</strong> Risk strictly 1% or less of total equity per idea. Capital preservation precedes capital accumulation.</li>
        <li><strong style="color: #fff;">Rule 4:</strong> Align multi-timeframe narrative from the Daily down to the 1-Minute chart before executing limit orders.</li>
      </ul>
    `
  }
];

// 5. Workbench Tools Hub & Sub-Tools
const workbenchTools: RouteMeta[] = [
  {
    url: 'https://learnsmc.xyz/tools/',
    outputPath: 'tools/index.html',
    title: 'ICT Trading Workbench & Analytical Laboratories | LearnSMC',
    description: 'Interactive Chart Lab, SMC strategy simulator, backtester, trading journal, and institutional concepts reference.',
    canonical: 'https://learnsmc.xyz/tools/',
    heading: 'ICT Trading Workbench & Laboratory Suite',
    subheading: 'Empirical software tools engineered for deliberate practice without financial risk.',
    badge: 'Laboratory Suite',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.4rem; color: #ffffff; margin-bottom: 0.75rem;">Interactive Workbench Facilities</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem;">
          <a href="/tools/chartlab/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #55E6D1; margin-bottom: 0.25rem;">Chart Lab</div>
            <p style="margin: 0; font-size: 0.8rem; color: #94A3B8;">8-stage candlestick auction replay with multi-layer ICT overlays.</p>
          </a>
          <a href="/tools/simulator/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #8A72FF; margin-bottom: 0.25rem;">Trade Simulator</div>
            <p style="margin: 0; font-size: 0.8rem; color: #94A3B8;">Algorithmic limit order execution simulator with realistic slippage.</p>
          </a>
          <a href="/tools/backtest/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #FF5722; margin-bottom: 0.25rem;">Backtest Lab</div>
            <p style="margin: 0; font-size: 0.8rem; color: #94A3B8;">Statistical expectancy, Win Rate, and Drawdown curve calculator.</p>
          </a>
          <a href="/tools/journal/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #00E5FF; margin-bottom: 0.25rem;">Trading Journal</div>
            <p style="margin: 0; font-size: 0.8rem; color: #94A3B8;">7-point institutional trade audit and rule validation logger.</p>
          </a>
          <a href="/tools/graph/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #55E6D1; margin-bottom: 0.25rem;">Knowledge Graph</div>
            <p style="margin: 0; font-size: 0.8rem; color: #94A3B8;">10-step institutional pipeline and connected concept network.</p>
          </a>
          <a href="/tools/concepts/" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; text-decoration: none; color: inherit;">
            <div style="font-weight: bold; color: #8A72FF; margin-bottom: 0.25rem;">Concepts Glossary</div>
            <p style="margin: 0; font-size: 0.8rem; color: #94A3B8;">Searchable encyclopedia of 40+ ICT concepts and definitions.</p>
          </a>
        </div>
      </section>
    `
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
    bodyHtml: '<p style="line-height: 1.7; color: #C5CBD8;">Explore interactive candlestick sequences across historical London and New York Killzone sessions. Identify displacement candles, mark fair value gaps, and observe order block mitigation in real time.</p>'
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
    bodyHtml: '<p style="line-height: 1.7; color: #C5CBD8;">Simulate real-market conditions with step-by-step candle advance, limit order placement, stop loss setting, and profit target tracking.</p>'
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
    bodyHtml: '<p style="line-height: 1.7; color: #C5CBD8;">Validate your trading edge statistically. Model win rates across different setup confluence grades before committing live money.</p>'
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
    bodyHtml: '<p style="line-height: 1.7; color: #C5CBD8;">Track setup type, session, entry model, risk-reward ratio, and mistake tags in local browser storage.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/graph/',
    outputPath: 'tools/graph/index.html',
    title: 'Interactive Knowledge Graph — 10-Step Pipeline | LearnSMC',
    description: 'Visual node map connecting foundational market mechanics to advanced execution models.',
    canonical: 'https://learnsmc.xyz/tools/graph/',
    heading: 'SMC Interactive Knowledge Graph',
    subheading: 'Connect liquidity concepts, market structure, and algorithmic timing models.',
    badge: 'Concept Matrix',
    bodyHtml: '<p style="line-height: 1.7; color: #C5CBD8;">Explore the conceptual dependency tree connecting liquidity pools, displacement, market structure shifts, and optimal trade entries.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/concepts/',
    outputPath: 'tools/concepts/index.html',
    title: 'ICT & SMC Institutional Concepts Reference | LearnSMC',
    description: 'Searchable encyclopedia of Fair Value Gaps, Order Blocks, Liquidity Pools, and algorithmic mechanics.',
    canonical: 'https://learnsmc.xyz/tools/concepts/',
    heading: 'Institutional Concepts Encyclopedia',
    subheading: 'Rigorous definitions, mathematical parameters, and invalidation rules for 40+ ICT concepts.',
    badge: 'Encyclopedia',
    bodyHtml: '<p style="line-height: 1.7; color: #C5CBD8;">Comprehensive dictionary and visual guide to Fair Value Gaps (FVG), Inverse FVGs (IFVG), Order Blocks, Breakers, Liquidity Voids, and Session Profiles.</p>'
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
    bodyHtml: '<p style="line-height: 1.7; color: #C5CBD8;">Direct contrast between Order Blocks vs Breaker Blocks, MSS vs BOS, and Liquidity Sweeps vs Real Structural Breaks.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/dashboard/',
    outputPath: 'tools/dashboard/index.html',
    title: 'Mastery Profile & Operator Credentials | LearnSMC',
    description: 'Assessments, diagnostic quizzes, and operator credentials tracking your institutional mastery.',
    canonical: 'https://learnsmc.xyz/tools/dashboard/',
    heading: 'Mastery Profile & Operator Diagnostics',
    subheading: 'Track curriculum completion, test scores, and institutional skill readiness.',
    badge: 'Diagnostics',
    bodyHtml: '<p style="line-height: 1.7; color: #C5CBD8;">Verify your mastery across 57 curriculum chapters and track your progression from Novice to Certified Institutional Operator.</p>'
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
    bodyHtml: '<p style="line-height: 1.7; color: #C5CBD8;">Explore the 15-tier PD Array hierarchy from Old High/Low down to Mitigation Blocks, alongside 5 specialized opening range setups.</p>'
  },
  {
    url: 'https://learnsmc.xyz/tools/ict-suite/',
    outputPath: 'tools/ict-suite/index.html',
    title: 'ICT Delivery Suite & Killzone Macro Clock | LearnSMC',
    description: 'Optimal Trade Entry (OTE) calculator, Asian Judas planner, and 8 macro execution windows.',
    canonical: 'https://learnsmc.xyz/tools/ict-suite/',
    heading: 'ICT Delivery Suite & Macro Clock',
    subheading: 'Real-time countdown to algorithmic Killzones and macro windows.',
    badge: 'Timing & Macros',
    bodyHtml: '<p style="line-height: 1.7; color: #C5CBD8;">Calculators for 62% - 79% Optimal Trade Entry, Asian range projections, and New York macro algorithmic clocks.</p>'
  }
];

// Combine Hub & Tool pages
allRoutes.push(...legalPages);
allRoutes.push(curriculumHubPage);
allRoutes.push(masoodHubPage);
allRoutes.push(...masoodSubPages);
allRoutes.push(...workbenchTools);

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
        <blockquote style="border-left: 3px solid #5865FF; padding-left: 1rem; margin: 0 0 1.5rem 0; font-style: italic; color: #CBD5E1;">
          "${escapeHtml(ch.quote)}"
        </blockquote>
        <h2 style="font-size: 1.35rem; color: #ffffff; margin-bottom: 0.75rem;">Chapter Executive Summary</h2>
        <ul style="padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8; color: #C5CBD8;">
          ${ch.summary.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
        </ul>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.35rem; color: #ffffff; margin-bottom: 0.75rem;">Core Vocabulary & Key Terms</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          ${ch.keyTerms.map(kt => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem;">
              <div style="font-weight: bold; color: #8A72FF; font-family: monospace; margin-bottom: 0.25rem;">${escapeHtml(kt.term)}</div>
              <div style="color: #C5CBD8; font-size: 0.85rem; line-height: 1.5;">${escapeHtml(kt.definition)}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.35rem; color: #ffffff; margin-bottom: 0.75rem;">Detailed Lesson Sections</h2>
        ${ch.sections.map((sec, idx) => `
          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1.25rem; margin-top: 1.25rem;">
            <h3 style="color: #ffffff; font-size: 1.15rem; margin-bottom: 0.5rem;">${idx + 1}. ${escapeHtml(sec.title)}</h3>
            <p style="color: #C5CBD8; line-height: 1.7; margin-bottom: 0.75rem;">${escapeHtml(sec.content)}</p>
            ${sec.keyTakeaway ? `
              <div style="background: rgba(88, 101, 255, 0.08); border-left: 3px solid #8A72FF; padding: 0.75rem 1rem; border-radius: 4px; font-size: 0.85rem; color: #E0E7FF;">
                <strong style="color: #A5B4FC;">Key Takeaway:</strong> ${escapeHtml(sec.keyTakeaway)}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </section>

      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.35rem; color: #ffffff; margin-bottom: 0.75rem;">Practical Invalidation Rules & Practice</h2>
        <ul style="padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8; color: #C5CBD8;">
          ${ch.practiceQuestions.map(pq => `<li>${escapeHtml(pq)}</li>`).join('')}
        </ul>
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
        <h2 style="font-size: 1.35rem; color: #ffffff; margin-bottom: 0.75rem;">Executive Summary</h2>
        <p style="color: #C5CBD8; line-height: 1.7; margin-bottom: 1.5rem;">${escapeHtml(lec.shortSummary)}</p>

        <h3 style="font-size: 1.15rem; color: #ffffff; margin-bottom: 0.5rem;">Core Institutional Rules</h3>
        <ul style="padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8; color: #C5CBD8;">
          ${lec.coreRules.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
        </ul>

        <h3 style="font-size: 1.15rem; color: #ffffff; margin-bottom: 0.5rem;">Key Takeaways</h3>
        <ul style="padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8; color: #C5CBD8;">
          ${lec.keyTakeaways.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>

        ${lec.tradingChecklist ? `
          <h3 style="font-size: 1.15rem; color: #ffffff; margin-bottom: 0.5rem;">Pre-Flight Execution Checklist</h3>
          <ul style="padding-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8; color: #C5CBD8;">
            ${lec.tradingChecklist.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
          </ul>
        ` : ''}

        ${lec.youtubeId ? `
          <div style="margin-top: 1.5rem;">
            <a href="https://www.youtube.com/watch?v=${lec.youtubeId}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.25rem; background: #E11D48; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 0.85rem;">
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
      <p style="font-size: 1.1rem; color: #CBD5E1; margin-bottom: 2rem;">
        The requested URL was not found on LearnSMC.
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="/curriculum/" style="display: inline-block; padding: 0.75rem 1.5rem; background: #5865FF; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 0.9rem;">
          View 57 Curriculum Chapters &rarr;
        </a>
        <a href="/" style="display: inline-block; padding: 0.75rem 1.5rem; background: rgba(255,255,255,0.06); color: #CBD5E1; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.12);">
          Return to Homepage
        </a>
      </div>
    </div>
  `
};

console.log(`Starting static prerendering for ${allRoutes.length} canonical routes...`);

// Render and write all canonical routes
for (const route of allRoutes) {
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
    }

    sitemapUrls.push({
      loc: route.url,
      lastmod: todayIso,
      changefreq,
      priority
    });
  }
}

// Write 404 page
const notFoundHtml = generatePrerenderedHtml(notFoundPage);
fs.writeFileSync(path.resolve(distDir, '404.html'), notFoundHtml, 'utf-8');
const public404Path = path.resolve(projectRoot, 'public', '404.html');
fs.writeFileSync(public404Path, notFoundHtml, 'utf-8');
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
  <body style="background: #08090D; color: #fff; font-family: sans-serif; padding: 2rem; text-align: center;">
    <p>Navigating to Chapter ${ch.id}: <a href="${getLessonPath(ch.slug)}" style="color: #55E6D1;">${escapeHtml(ch.title)}</a>...</p>
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
  <body style="background: #08090D; color: #fff; font-family: sans-serif; padding: 2rem; text-align: center;">
    <p>Navigating to Curriculum: <a href="/curriculum/" style="color: #55E6D1;">Curriculum</a>...</p>
  </body>
</html>`;
fs.writeFileSync(path.resolve(chapterRootDir, 'index.html'), chapterRootHtml, 'utf-8');

console.log(`✓ Generated ${textbookChapters.length} legacy /chapter/:id redirect aliases + /chapter root fallback`);

// 10. Generate Complete XML Sitemap
// Ensure homepage is first
const finalSitemapUrls = [
  {
    loc: 'https://learnsmc.xyz/',
    lastmod: todayIso,
    changefreq: 'weekly',
    priority: '1.0'
  },
  ...sitemapUrls.filter(u => u.loc !== 'https://learnsmc.xyz/')
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${finalSitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const distSitemapPath = path.resolve(distDir, 'sitemap.xml');
const publicSitemapPath = path.resolve(projectRoot, 'public', 'sitemap.xml');

fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');
fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');

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
redirectsLines.push('# Cloudflare Pages SPA Fallback (existing static files take precedence)');
redirectsLines.push('/*                /index.html           200');
redirectsLines.push('');

const redirectsContent = redirectsLines.join('\n');
fs.writeFileSync(path.resolve(distDir, '_redirects'), redirectsContent, 'utf-8');
fs.writeFileSync(path.resolve(projectRoot, 'public', '_redirects'), redirectsContent, 'utf-8');
console.log(`✓ Generated _redirects with ${textbookChapters.length * 2} legacy chapter 301 rules`);

console.log('✓ Prerendering and SEO build completed successfully!');
