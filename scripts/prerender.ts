import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { textbookChapters } from '../src/data/chaptersData.ts';

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
}

const legalPages: RouteMeta[] = [
  {
    url: 'https://learnsmc.xyz/about',
    outputPath: 'about/index.html',
    title: 'About LearnSMC - Publisher, Mission & Editorial Integrity | ICT & SMC Academy',
    description: 'Learn about LearnSMC, our open-source mission to democratize algorithmic trading education, editorial methodology, and curriculum architecture.',
    canonical: 'https://learnsmc.xyz/about',
    heading: 'About LearnSMC & Editorial Integrity',
    subheading: 'Democratizing institutional market mechanics through rigorous, transparent, open-access education.',
    badge: 'Institutional Publisher & Mission',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">1. Our Publisher Mission</h2>
        <p style="margin-bottom: 1rem; line-height: 1.7; color: #C5CBD8;">
          LearnSMC was founded to bridge the divide between predatory retail trading lore and genuine institutional auction delivery. 
          Historically, Inner Circle Trader (ICT) concepts and Smart Money Concepts (SMC) have been obscured behind expensive paywalls, 
          unverified signal services, and misleading affiliate schemes. LearnSMC publishes a peer-reviewed, free-for-life 48-chapter curriculum 
          alongside 52 comprehensive Abdullah Masood masterclass breakdowns.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">2. Rigorous Editorial Architecture & Tripartite Model</h2>
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
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">3. Publisher & Editorial Board</h2>
        <p style="line-height: 1.7; color: #C5CBD8;">
          Editorial oversight is led by senior market analysts specializing in foreign exchange liquidity, index futures delivery, and algorithmic auction models. 
          All materials are reviewed annually to update market microstructure references and regulatory guidelines.
        </p>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/disclaimer',
    outputPath: 'disclaimer/index.html',
    title: 'Financial Risk Disclaimer & CFTC Rule 4.41 Notice | LearnSMC',
    description: 'Crucial educational disclaimer and CFTC Rule 4.41 financial risk disclosure for LearnSMC. Trading involves substantial risk of loss.',
    canonical: 'https://learnsmc.xyz/disclaimer',
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
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">CFTC RULE 4.41 - HYPOTHETICAL PERFORMANCE DISCLOSURE</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN INHERENT LIMITATIONS. UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. ALSO, SINCE THE TRADES HAVE NOT ACTUALLY BEEN EXECUTED, THE RESULTS MAY HAVE UNDER- OR OVER-COMPENSATED FOR THE IMPACT, IF ANY, OF CERTAIN MARKET FACTORS, SUCH AS LACK OF LIQUIDITY. SIMULATED TRADING PROGRAMS IN GENERAL ARE ALSO SUBJECT TO THE FACT THAT THEY ARE DESIGNED WITH THE BENEFIT OF HINDSIGHT. NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFITS OR LOSSES SIMILAR TO THOSE SHOWN.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">Educational Only Mandate</h2>
        <p style="line-height: 1.7; color: #C5CBD8;">
          All content, software tools, charts, simulations, and materials provided on LearnSMC (learnsmc.xyz) are published strictly for educational and informational purposes. 
          Under no circumstances does any material on this website constitute financial, investment, legal, or tax advice. LearnSMC does not operate an investment fund, manage assets, or recommend specific brokerages or trading platforms.
        </p>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/privacy',
    outputPath: 'privacy/index.html',
    title: 'Privacy Policy & Cookie Disclosure | LearnSMC',
    description: 'LearnSMC Privacy Policy: How we collect, safeguard, and process user data in full compliance with GDPR, CCPA, and Google AdSense guidelines.',
    canonical: 'https://learnsmc.xyz/privacy',
    heading: 'Privacy Policy & Cookie Usage',
    subheading: 'Transparent data practices compliant with GDPR, UK Data Protection Act, CCPA, and Google AdSense publisher standards.',
    badge: 'User Privacy & Data Protection',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">1. Data Collection & Usage</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          LearnSMC does not sell, rent, or lease personal customer data to any third party. 
          When you use our open educational resources, your study progress, bookmarks, journal notes, and simulation data are stored locally in your browser via HTML5 LocalStorage, ensuring complete privacy.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">2. Cookies & Advertising (Google AdSense)</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          We use Google AdSense and third-party advertising partners to deliver non-intrusive advertisements that fund free development and hosting. 
          Google uses cookies (including the DoubleClick cookie) to serve ads based on prior visits to our site or other websites. 
          You may opt out of personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener" style="color: #6366F1;">aboutads.info</a> or Google Ads Settings.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">3. GDPR & CCPA Compliance</h2>
        <p style="line-height: 1.7; color: #C5CBD8;">
          Users in the European Economic Area (EEA), United Kingdom, and California enjoy rights to data inspection, rectification, deletion, and consent revoking. 
          Our cookie consent banner ensures no non-essential advertising cookies load before your explicit consent.
        </p>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/terms',
    outputPath: 'terms/index.html',
    title: 'Terms of Service | LearnSMC - Free ICT & SMC Academy',
    description: 'LearnSMC Terms of Service governing acceptable use, intellectual property, open access education, and liability limitations.',
    canonical: 'https://learnsmc.xyz/terms',
    heading: 'Terms of Service',
    subheading: 'Governing rules, intellectual property, and acceptable use across LearnSMC.',
    badge: 'Legal Agreement',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">1. Acceptance of Terms</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          By accessing or using LearnSMC (learnsmc.xyz), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you must discontinue using our services immediately.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">2. Intellectual Property & Fair Use</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          The proprietary curriculum architecture, interactive diagrams, trading simulation engines, and written lesson materials published on LearnSMC are protected under international copyright law. 
          Inner Circle Trader concepts originate from Michael J. Huddleston and are presented here in an analytical educational format under Fair Use doctrine.
        </p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">3. Limitation of Liability</h2>
        <p style="line-height: 1.7; color: #C5CBD8;">
          In no event shall LearnSMC, its contributors, or publishers be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this platform, including financial trading losses.
        </p>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/contact',
    outputPath: 'contact/index.html',
    title: 'Contact Editorial & Academic Team | LearnSMC',
    description: 'Get in touch with the LearnSMC editorial team, submit curriculum corrections, suggest trading concepts, or inquire about educational partnerships.',
    canonical: 'https://learnsmc.xyz/contact',
    heading: 'Contact LearnSMC',
    subheading: 'Direct inquiry channels for curriculum corrections, research contributions, and technical inquiries.',
    badge: 'Publisher Inquiries',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">Publisher Communications</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1.5rem;">
          We welcome feedback from students, educators, and institutional quantitative traders. 
          Whether you have identified a diagram typo, wish to propose an additional masterclass breakdown, or have inquiries regarding our algorithmic trade simulator, please reach out below.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1.5rem;">
          <p style="margin: 0 0 0.5rem 0; color: #94A3B8; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Editorial Email</p>
          <p style="margin: 0 0 1rem 0; font-size: 1.15rem; color: #6366F1; font-family: monospace; font-weight: bold;">editorial@learnsmc.xyz</p>
          <p style="margin: 0 0 0.5rem 0; color: #94A3B8; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Publisher & Webmaster</p>
          <p style="margin: 0 0 1rem 0; font-size: 1.15rem; color: #6366F1; font-family: monospace; font-weight: bold;">publisher@learnsmc.xyz</p>
          <p style="margin: 0; font-size: 0.85rem; color: #94A3B8;">Average response turnaround: 24 to 48 business hours.</p>
        </div>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/adsense',
    outputPath: 'adsense/index.html',
    title: 'AdSense Publisher Disclosure & Ads.txt Verification | LearnSMC',
    description: 'LearnSMC Google AdSense publisher transparency, advertising disclosures, and official publisher ca-pub-6985025314302607 verification.',
    canonical: 'https://learnsmc.xyz/adsense',
    heading: 'Google AdSense Publisher Disclosure',
    subheading: 'Official publisher transparency in accordance with Google Publisher Policies.',
    badge: 'Publisher Transparency',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">Google AdSense Account Verification</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          LearnSMC is verified under Google Publisher Client ID:
        </p>
        <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 6px; padding: 1rem; font-family: monospace; color: #A5B4FC; margin-bottom: 1.5rem;">
          ca-pub-6985025314302607
        </div>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          Our authoritative <a href="/ads.txt" style="color: #6366F1; text-decoration: underline;">ads.txt</a> file is hosted at the root domain:
        </p>
        <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 1rem; font-family: monospace; color: #34D399; margin-bottom: 1.5rem;">
          google.com, pub-6985025314302607, DIRECT, f08c47fec0942fa0
        </div>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">Quality & Anti-Slop Commitment</h2>
        <p style="line-height: 1.7; color: #C5CBD8;">
          LearnSMC does not place ads that obscure lesson text, auto-refresh aggressively, or mimic trading buttons. 
          All ad units adhere to Better Ads Standards to ensure distraction-free learning.
        </p>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/curriculum',
    outputPath: 'curriculum/index.html',
    title: '48-Chapter Institutional Trading Curriculum | LearnSMC',
    description: 'Explore the full 48-chapter institutional trading curriculum covering Market Structure, Liquidity Sweeps, Fair Value Gaps, PO3, and Algorithmic Execution.',
    canonical: 'https://learnsmc.xyz/curriculum',
    heading: '48-Chapter Institutional Curriculum',
    subheading: 'A complete university-grade syllabus from foundational auction mechanics to advanced execution models.',
    badge: 'Comprehensive Syllabus',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">Curriculum Navigation & Chapters</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1.5rem;">
          Below is the complete catalog of all 48 institutional modules. Each module provides primary ICT definitions, empirical auction chart proof, step-by-step invalidation rules, and interactive chart labs.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
          ${textbookChapters.map(ch => `
            <a href="/chapter/${ch.id}" style="display: block; text-decoration: none; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; transition: border-color 0.2s;">
              <div style="color: #6366F1; font-size: 0.75rem; font-family: monospace; margin-bottom: 0.25rem;">CHAPTER ${ch.id} · ${escapeHtml(ch.part)}</div>
              <div style="color: #ffffff; font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">${escapeHtml(ch.title)}</div>
              <div style="color: #94A3B8; font-size: 0.8rem; line-height: 1.4;">Level ${ch.level} · ${ch.sections.length} core sections with diagrams</div>
            </a>
          `).join('')}
        </div>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/masood',
    outputPath: 'masood/index.html',
    title: 'Abdullah Masood 52-Lecture Masterclass Breakdown | LearnSMC',
    description: 'Systematic breakdowns of Abdullah Masood trading masterclasses: Institutional Orderflow, Liquidity Sweeps, Multi-Timeframe Matrix, and Algorithmic Execution.',
    canonical: 'https://learnsmc.xyz/masood',
    heading: 'Abdullah Masood Masterclass Series',
    subheading: '52 comprehensive, systematic lecture breakdowns and analytical chart blueprints.',
    badge: 'Masterclass Academy',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">Masterclass Pedagogy</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          Abdullah Masood has produced one of the most thorough and respected educational series on Smart Money Concepts, translating complex market behavior into actionable institutional frameworks. 
          LearnSMC catalogs all 52 lectures with clear transcripts, diagram models, key rules, and historical chart studies.
        </p>
        <p style="line-height: 1.7; color: #C5CBD8;">
          Navigate through our interactive player and workbench directly on the live platform to test scenarios and practice real-time identification.
        </p>
      </section>
    `
  },
  {
    url: 'https://learnsmc.xyz/tools',
    outputPath: 'tools/index.html',
    title: 'Institutional Trading Workbench & Algorithmic Simulator | LearnSMC',
    description: 'Interactive trading tools for SMC traders: Chart Lab, Algorithmic Replay Simulator, Backtest Lab, Position Sizing Matrix, and Session Clock.',
    canonical: 'https://learnsmc.xyz/tools',
    heading: 'Institutional Trading Workbench',
    subheading: 'Interactive algorithmic simulator, chart replay engine, backtest suite, and risk calculators.',
    badge: 'Trading Tools Suite',
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.75rem;">Suite Capabilities</h2>
        <p style="line-height: 1.7; color: #C5CBD8; margin-bottom: 1rem;">
          Theory is incomplete without deliberate practice. The LearnSMC Workbench includes:
        </p>
        <ul style="padding-left: 1.5rem; margin-bottom: 1rem; line-height: 1.8; color: #C5CBD8;">
          <li><strong style="color: #fff;">Chart Lab:</strong> High-definition candlestick auction engine with multi-layer ICT overlays.</li>
          <li><strong style="color: #fff;">Algorithmic Replay Simulator:</strong> Step-by-step blind testing across London and NY Killzones.</li>
          <li><strong style="color: #fff;">Backtesting Matrix:</strong> Validate Win Rate, Profit Factor, and Drawdown curves without risky live capital.</li>
          <li><strong style="color: #fff;">Institutional Risk Calculator:</strong> Exact position sizing calculated by account risk percentage and point value.</li>
        </ul>
      </section>
    `
  }
];

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

  // Inject Rich Pre-rendered Content into #root
  const renderedContent = `
    <div id="ssr-container" style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem; color: #E2E8F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <!-- Header Navigation Bar -->
      <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.5rem; margin-bottom: 2.5rem;">
        <a href="/" style="text-decoration: none; color: #ffffff; display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #4F46E5, #06B6D4); display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: monospace; color: #fff;">SMC</div>
          <div>
            <div style="font-weight: bold; font-size: 1.15rem; letter-spacing: -0.02em;">LearnSMC</div>
            <div style="font-size: 0.75rem; color: #94A3B8; font-family: monospace;">ICT &amp; SMC ACADEMY</div>
          </div>
        </a>
        <nav style="display: flex; gap: 1.25rem; font-size: 0.9rem; font-family: monospace;">
          <a href="/curriculum" style="color: #CBD5E1; text-decoration: none;">Curriculum</a>
          <a href="/masood" style="color: #CBD5E1; text-decoration: none;">Masood Academy</a>
          <a href="/tools" style="color: #CBD5E1; text-decoration: none;">Trading Tools</a>
          <a href="/about" style="color: #CBD5E1; text-decoration: none;">About</a>
        </nav>
      </header>

      <!-- Main Article / Route Body -->
      <main>
        <article>
          <header style="margin-bottom: 2rem;">
            <div style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); color: #818CF8; font-size: 0.75rem; font-family: monospace; margin-bottom: 0.75rem;">
              ${escapeHtml(meta.badge)}
            </div>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin: 0 0 0.75rem 0; letter-spacing: -0.03em;">
              ${escapeHtml(meta.heading)}
            </h1>
            <p style="font-size: 1.1rem; color: #94A3B8; line-height: 1.6; margin: 0;">
              ${escapeHtml(meta.subheading)}
            </p>
          </header>

          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 2rem; margin-bottom: 3rem;">
            ${meta.bodyHtml}
          </div>
        </article>
      </main>

      <!-- Crawlable Static Footer -->
      <footer style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 2rem; margin-top: 4rem; font-size: 0.85rem; color: #64748B;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2rem; margin-bottom: 2rem;">
          <div>
            <div style="color: #ffffff; font-weight: 600; margin-bottom: 0.5rem;">LearnSMC · ICT &amp; SMC Academy</div>
            <p style="margin: 0; max-width: 400px; line-height: 1.5;">Free, open-source institutional education. Empowering retail traders with institutional auction literacy.</p>
          </div>
          <div style="display: flex; gap: 2rem; font-family: monospace;">
            <div>
              <div style="color: #CBD5E1; font-weight: 600; margin-bottom: 0.5rem;">Navigation</div>
              <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
                <li><a href="/" style="color: #94A3B8; text-decoration: none;">Home</a></li>
                <li><a href="/curriculum" style="color: #94A3B8; text-decoration: none;">Curriculum</a></li>
                <li><a href="/masood" style="color: #94A3B8; text-decoration: none;">Masood Academy</a></li>
                <li><a href="/tools" style="color: #94A3B8; text-decoration: none;">Trading Tools</a></li>
              </ul>
            </div>
            <div>
              <div style="color: #CBD5E1; font-weight: 600; margin-bottom: 0.5rem;">Legal &amp; Policy</div>
              <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
                <li><a href="/disclaimer" style="color: #94A3B8; text-decoration: none;">Financial Disclaimer</a></li>
                <li><a href="/privacy" style="color: #94A3B8; text-decoration: none;">Privacy Policy</a></li>
                <li><a href="/terms" style="color: #94A3B8; text-decoration: none;">Terms of Service</a></li>
                <li><a href="/about" style="color: #94A3B8; text-decoration: none;">About Publisher</a></li>
                <li><a href="/contact" style="color: #94A3B8; text-decoration: none;">Contact Us</a></li>
                <li><a href="/adsense" style="color: #94A3B8; text-decoration: none;">AdSense Transparency</a></li>
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

  // Replace everything inside <div id="root">...</div> with the pre-rendered HTML content
  html = html.replace(/<div id="root">[\s\S]*?<\/div>(\s*<script type="module" src="\/src\/main\.tsx"><\/script>)/, `<div id="root">${renderedContent}</div>$1`);
  // Fallback in case compiled production build has different script tag
  if (!html.includes(renderedContent)) {
    html = html.replace(/<div id="root">[\s\S]*?<\/div>(\s*<script type="module" src="\/assets\/[^"]+"><\/script>)/, `<div id="root">${renderedContent}</div>$1`);
  }
  // Ultimate fallback
  if (!html.includes(renderedContent)) {
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${renderedContent}</div>`);
  }

  return html;
}

console.log('Generating pre-rendered static HTML routes for search crawlers & AdSense bots...');

// 1. Process Legal & Core Hub Pages
for (const page of legalPages) {
  const filePath = path.resolve(distDir, page.outputPath);
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const pageHtml = generatePrerenderedHtml(page);
  fs.writeFileSync(filePath, pageHtml, 'utf-8');
  console.log(`✓ Generated ${page.outputPath} (${(pageHtml.length / 1024).toFixed(1)} KB)`);
}

// 2. Process All 48 Chapter Pages (Generating /chapter/{id}/index.html)
for (const ch of textbookChapters) {
  const chapterMeta: RouteMeta = {
    url: `https://learnsmc.xyz/chapter/${ch.id}`,
    outputPath: `chapter/${ch.id}/index.html`,
    title: `Chapter ${ch.id}: ${ch.title} | ICT & SMC Curriculum`,
    description: `Master ${ch.title}. ${ch.summary.slice(0, 2).join(' ')} Institutional order flow, diagrams, and rules.`,
    canonical: `https://learnsmc.xyz/chapter/${ch.id}`,
    heading: `Chapter ${ch.id}: ${ch.title}`,
    subheading: `${ch.part} · Level ${ch.level} Institutional Module`,
    badge: `Chapter ${ch.id} · ${ch.part}`,
    bodyHtml: `
      <section style="margin-bottom: 2rem;">
        <blockquote style="border-left: 3px solid #6366F1; padding-left: 1rem; margin: 0 0 1.5rem 0; font-style: italic; color: #CBD5E1;">
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
              <div style="font-weight: bold; color: #818CF8; font-family: monospace; margin-bottom: 0.25rem;">${escapeHtml(kt.term)}</div>
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
              <div style="background: rgba(99, 102, 241, 0.08); border-left: 3px solid #818CF8; padding: 0.75rem 1rem; border-radius: 4px; font-size: 0.85rem; color: #E0E7FF;">
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

  const filePath = path.resolve(distDir, chapterMeta.outputPath);
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const pageHtml = generatePrerenderedHtml(chapterMeta);
  fs.writeFileSync(filePath, pageHtml, 'utf-8');
}

console.log(`✓ Generated static HTML files for all ${textbookChapters.length} chapters.`);
console.log('Static pre-rendering build completed successfully.');
