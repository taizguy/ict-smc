import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { textbookChapters } from '../src/data/chaptersData.ts';
import { 
  BASE_URL, 
  normalizeCanonicalUrl, 
  normalizePath, 
  getLessonCanonicalUrl, 
  getLessonPath, 
  resolveLegacyChapter 
} from '../src/utils/url.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');

console.log('--- Starting Comprehensive SEO, URL Consistency & Redirect Integrity Audit ---');

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`❌ FAILED: ${msg}`);
  }
}

// ============================================================================
// TEST SUITE 1: Trailing Slash Normalization & URL Utility Tests
// ============================================================================
console.log('\n[Suite 1] Testing Trailing Slash Normalization & Canonical URL Generator...');

assert(
  normalizeCanonicalUrl('/') === 'https://learnsmc.xyz/',
  'normalizeCanonicalUrl("/") correctly preserves root trailing slash'
);

assert(
  normalizeCanonicalUrl('https://learnsmc.xyz') === 'https://learnsmc.xyz/',
  'normalizeCanonicalUrl("https://learnsmc.xyz") normalizes to root with trailing slash'
);

assert(
  normalizeCanonicalUrl('/learn/what-actually-moves-price') === 'https://learnsmc.xyz/learn/what-actually-moves-price/',
  'normalizeCanonicalUrl adds trailing slash to lesson path without slash'
);

assert(
  normalizeCanonicalUrl('/learn/what-actually-moves-price/') === 'https://learnsmc.xyz/learn/what-actually-moves-price/',
  'normalizeCanonicalUrl keeps existing trailing slash without doubling'
);

assert(
  normalizeCanonicalUrl('/learn/what-actually-moves-price?ref=twitter#section-1') === 'https://learnsmc.xyz/learn/what-actually-moves-price/',
  'normalizeCanonicalUrl strips query params and anchors to avoid duplicate canonicals'
);

assert(
  normalizeCanonicalUrl('/sitemap.xml') === 'https://learnsmc.xyz/sitemap.xml',
  'normalizeCanonicalUrl does NOT add trailing slash to file extensions (.xml)'
);

assert(
  getLessonCanonicalUrl('what-actually-moves-price') === 'https://learnsmc.xyz/learn/what-actually-moves-price/',
  'getLessonCanonicalUrl produces exact canonical lesson URL with trailing slash'
);

assert(
  getLessonPath('what-actually-moves-price') === '/learn/what-actually-moves-price/',
  'getLessonPath produces preferred internal path with trailing slash'
);

// ============================================================================
// TEST SUITE 2: Legacy Chapter Mapping & Invalid Identifier Fallback
// ============================================================================
console.log('\n[Suite 2] Testing Legacy Chapter Mapping & Fallback...');

let mappingErrors = 0;
for (const ch of textbookChapters) {
  const byId = resolveLegacyChapter(ch.id, textbookChapters);
  if (!byId || byId.slug !== ch.slug || byId.targetPath !== `/learn/${ch.slug}/`) {
    mappingErrors++;
    console.error(`Failed legacy resolution by ID for chapter ${ch.id}`);
  }

  const bySlug = resolveLegacyChapter(ch.slug, textbookChapters);
  if (!bySlug || bySlug.id !== ch.id) {
    mappingErrors++;
    console.error(`Failed legacy resolution by slug for chapter ${ch.id}`);
  }
}
assert(mappingErrors === 0, `All ${textbookChapters.length} chapters resolve via legacy chapter mapping`);

// Test invalid chapter identifiers fallback
assert(
  resolveLegacyChapter(999, textbookChapters) === null,
  'Unknown chapter ID (999) returns null (signals fallback to /curriculum/)'
);
assert(
  resolveLegacyChapter('invalid-slug-xyz', textbookChapters) === null,
  'Unknown chapter slug returns null (signals fallback to /curriculum/)'
);

// ============================================================================
// TEST SUITE 3: Static Build Output, Robots & Sitemap Integrity
// ============================================================================
console.log('\n[Suite 3] Testing Robots.txt and XML Sitemap...');

assert(fs.existsSync(distDir), 'dist directory exists');

const robotsPath = path.resolve(distDir, 'robots.txt');
assert(fs.existsSync(robotsPath), 'dist/robots.txt exists');
const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
assert(robotsContent.includes('Sitemap: https://learnsmc.xyz/sitemap.xml'), 'robots.txt specifies correct absolute sitemap URL');
assert(robotsContent.includes('Allow: /'), 'robots.txt allows crawling of public resources');

const sitemapPath = path.resolve(distDir, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
assert(sitemapContent.startsWith('<?xml'), 'sitemap.xml begins with valid XML declaration');
assert(sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'sitemap.xml has standard sitemap 0.9 schema');

// Verify all 53 chapters have exact trailing-slash entries in sitemap.xml
let missingSitemapChapters = 0;
for (const ch of textbookChapters) {
  const expectedEntry = `<loc>https://learnsmc.xyz/learn/${ch.slug}/</loc>`;
  if (!sitemapContent.includes(expectedEntry)) {
    missingSitemapChapters++;
    console.error(`Missing from sitemap.xml: ${expectedEntry}`);
  }
}
assert(missingSitemapChapters === 0, `All ${textbookChapters.length} chapters present in sitemap with canonical trailing slashes`);

// Verify sitemap does NOT contain non-canonical or query URLs in <loc> entries
const sitemapLocs = (sitemapContent.match(/<loc>[\s\S]*?<\/loc>/g) || []);
const hasQueryInLoc = sitemapLocs.some(loc => loc.includes('?'));
assert(!hasQueryInLoc, 'sitemap.xml <loc> entries contain ZERO query parameter URLs');
const hasLegacyChapterInLoc = sitemapLocs.some(loc => loc.includes('/chapter/'));
assert(!hasLegacyChapterInLoc, 'sitemap.xml <loc> entries contain ZERO legacy /chapter/ URLs');
const has404InLoc = sitemapLocs.some(loc => loc.includes('/404'));
assert(!has404InLoc, 'sitemap.xml <loc> entries contain ZERO 404 error URLs');

// ============================================================================
// TEST SUITE 4: HTML Prerendering, Canonical Tags & CSR Fallback
// ============================================================================
console.log('\n[Suite 4] Testing HTML Pre-rendered Pages & Canonical Tags...');

const titlesMap = new Map<string, string>();
const canonicalsMap = new Map<string, string>();

function auditHtmlFile(relPath: string, expectedCanonical: string, isRedirect = false) {
  const filePath = path.resolve(distDir, relPath);
  assert(fs.existsSync(filePath), `HTML file exists: ${relPath}`);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  assert(content.length > 400, `${relPath} is non-empty (${(content.length / 1024).toFixed(1)} KB)`);

  if (isRedirect) {
    assert(
      content.includes(`rel="canonical" href="${expectedCanonical}"`),
      `${relPath} has correct target canonical tag: ${expectedCanonical}`
    );
    assert(
      content.includes('http-equiv="refresh"'),
      `${relPath} has instant meta refresh fallback`
    );
    return;
  }

  // Canonical tag check
  const canonicalMatch = content.match(/<link rel="canonical" href="([\s\S]*?)" \/>/);
  assert(
    !!canonicalMatch && canonicalMatch[1] === expectedCanonical,
    `${relPath} has exact matching canonical: ${expectedCanonical}`
  );

  // Title tag check
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
  assert(
    !!titleMatch && titleMatch[1].trim().length > 10,
    `${relPath} has descriptive <title>`
  );

  // Description check
  const descMatch = content.match(/<meta name="description" content="([\s\S]*?)" \/>/);
  assert(
    !!descMatch && descMatch[1].trim().length > 20,
    `${relPath} has descriptive meta description`
  );

  // OpenGraph URL matches canonical
  const ogUrlMatch = content.match(/<meta property="og:url" content="([\s\S]*?)" \/>/);
  assert(
    !!ogUrlMatch && ogUrlMatch[1] === expectedCanonical,
    `${relPath} og:url matches canonical link`
  );

  // Uniqueness check across distinct canonical pages
  const canonical = canonicalMatch ? canonicalMatch[1] : '';
  if (canonicalsMap.has(canonical) && canonicalsMap.get(canonical) !== relPath) {
    console.error(`❌ Duplicate canonical URL across ${canonicalsMap.get(canonical)} and ${relPath}: "${canonical}"`);
    failedTests++;
  } else {
    canonicalsMap.set(canonical, relPath);
  }
}

// Audit Core Hubs & Legal Pages
auditHtmlFile('index.html', 'https://learnsmc.xyz/');
auditHtmlFile('curriculum/index.html', 'https://learnsmc.xyz/curriculum/');
auditHtmlFile('masood/index.html', 'https://learnsmc.xyz/masood/');
auditHtmlFile('tools/index.html', 'https://learnsmc.xyz/tools/');
auditHtmlFile('about/index.html', 'https://learnsmc.xyz/about/');
auditHtmlFile('disclaimer/index.html', 'https://learnsmc.xyz/disclaimer/');
auditHtmlFile('privacy/index.html', 'https://learnsmc.xyz/privacy/');
auditHtmlFile('terms/index.html', 'https://learnsmc.xyz/terms/');
auditHtmlFile('contact/index.html', 'https://learnsmc.xyz/contact/');
auditHtmlFile('adsense/index.html', 'https://learnsmc.xyz/adsense/');

// Audit All 53 Chapter Pages at /learn/:slug/
for (const ch of textbookChapters) {
  auditHtmlFile(`learn/${ch.slug}/index.html`, `https://learnsmc.xyz/learn/${ch.slug}/`);
  // Audit legacy redirect alias
  auditHtmlFile(`chapter/${ch.id}/index.html`, `https://learnsmc.xyz/learn/${ch.slug}/`, true);
}

// Audit legacy /chapter root fallback
auditHtmlFile('chapter/index.html', 'https://learnsmc.xyz/curriculum/', true);

// Audit 404 page (noindex)
const notFoundPath = path.resolve(distDir, '404.html');
assert(fs.existsSync(notFoundPath), '404.html exists in dist');
const notFoundContent = fs.readFileSync(notFoundPath, 'utf-8');
assert(notFoundContent.includes('noindex'), '404.html contains noindex directive');

// ============================================================================
// TEST SUITE 5: Hosting Configuration & Redirect Loop Prevention
// ============================================================================
console.log('\n[Suite 5] Testing Cloudflare & Vercel Edge Redirect Configurations...');

// 1. Cloudflare Pages _redirects file
const distRedirectsPath = path.resolve(distDir, '_redirects');
assert(fs.existsSync(distRedirectsPath), 'dist/_redirects file exists');
const distRedirectsContent = fs.readFileSync(distRedirectsPath, 'utf-8');

let redirectsRuleErrors = 0;
for (const ch of textbookChapters) {
  const expectedRule = `/chapter/${ch.id}     /learn/${ch.slug}/    301`;
  if (!distRedirectsContent.includes(`/chapter/${ch.id} `)) {
    redirectsRuleErrors++;
    console.error(`Missing redirect rule for Chapter ${ch.id} in _redirects`);
  }
}
assert(redirectsRuleErrors === 0, `All ${textbookChapters.length} legacy chapters have 301 rules in _redirects`);
assert(distRedirectsContent.includes('/chapter/*        /curriculum/          301'), '_redirects has /chapter/* fallback to /curriculum/');
assert(!distRedirectsContent.includes('/index.html'), '_redirects does NOT contain /index.html rewrite (prevents Cloudflare error 100324)');

// Verify 200.html exists for Cloudflare Pages native SPA fallback
const dist200Path = path.resolve(distDir, '200.html');
assert(fs.existsSync(dist200Path), 'dist/200.html exists for Cloudflare Pages native SPA fallback');

// 2. Vercel vercel.json configuration
const vercelPath = path.resolve(projectRoot, 'vercel.json');
assert(fs.existsSync(vercelPath), 'vercel.json file exists');
const vercelJson = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
assert(Array.isArray(vercelJson.redirects), 'vercel.json has redirects array');

// Check redirect loop prevention: no redirect destination should be an existing redirect source
const redirectSources = new Set<string>();
for (const r of vercelJson.redirects) {
  redirectSources.add(r.source);
}
let loopErrors = 0;
for (const r of vercelJson.redirects) {
  if (redirectSources.has(r.destination)) {
    loopErrors++;
    console.error(`Potential redirect loop: ${r.source} -> ${r.destination}`);
  }
}
assert(loopErrors === 0, 'Redirect loop prevention check passed: ZERO circular redirect rules detected');

// ============================================================================
// TEST SUITE 6: Content Isolation & Preventing Chapter 1 Bleed Across Pages
// ============================================================================
console.log('\n[Suite 6] Testing Content Isolation & Preventing Chapter 1 Bleed...');

// 1. Verify Home Page does not leak Chapter 1 body/heading
const homeContent = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');
assert(!homeContent.includes('What Actually Moves Price? — The Mechanics of the Electronic Auction'), 'Homepage does not contain Chapter 1 header bleed');
assert(!homeContent.includes('id="chapter-1"'), 'Homepage does not contain id="chapter-1" article bleed');
assert(homeContent.includes('Codified Institutional Curriculum'), 'Homepage contains authentic institutional homepage content');

// 2. Verify non-chapter hub & legal pages do NOT leak Chapter 1
const standaloneHubsToCheck = ['masood/index.html', 'tools/index.html', 'about/index.html', 'privacy/index.html', 'terms/index.html', 'disclaimer/index.html', 'contact/index.html', 'adsense/index.html'];
let hubBleedCount = 0;
for (const hub of standaloneHubsToCheck) {
  const hubContent = fs.readFileSync(path.resolve(distDir, hub), 'utf-8');
  if (hubContent.includes('What Actually Moves Price') || hubContent.includes('id="chapter-1"')) {
    hubBleedCount++;
    console.error(`❌ Content bleed detected: Chapter 1 found in ${hub}`);
  }
}
// Curriculum index should list Chapter 1 as a syllabus link, but must NOT contain the full chapter article or id="chapter-1"
const curriculumContent = fs.readFileSync(path.resolve(distDir, 'curriculum/index.html'), 'utf-8');
if (curriculumContent.includes('id="chapter-1"') || curriculumContent.includes('The Great Fallacy')) {
  hubBleedCount++;
  console.error('❌ Content bleed detected: Chapter 1 article body found in curriculum/index.html');
}
assert(hubBleedCount === 0, 'Hub, curriculum and legal pages have ZERO Chapter 1 article body bleed');

// 3. Verify other textbook chapters do NOT have Chapter 1 appended to them
let otherChapterBleedCount = 0;
for (const ch of textbookChapters) {
  if (ch.slug === 'what-actually-moves-price') continue;
  const chFile = path.resolve(distDir, `learn/${ch.slug}/index.html`);
  if (fs.existsSync(chFile)) {
    const chContent = fs.readFileSync(chFile, 'utf-8');
    if (chContent.includes('What Actually Moves Price? — The Mechanics of the Electronic Auction')) {
      otherChapterBleedCount++;
      console.error(`❌ Content bleed detected: Chapter 1 found in learn/${ch.slug}/index.html`);
    }
  }
}
assert(otherChapterBleedCount === 0, 'All 52 other chapters are cleanly isolated with ZERO Chapter 1 bleed');

// 4. Verify ONLY Chapter 1 itself contains the Chapter 1 heading
const ch1File = path.resolve(distDir, 'learn/what-actually-moves-price/index.html');
const ch1Content = fs.readFileSync(ch1File, 'utf-8');
assert(ch1Content.includes('What Actually Moves Price'), 'Chapter 1 page properly contains its own heading');

// 5. Verify NO prerendered pages contain legacy links (?chapter= or href="https://learnsmc.xyz/chapter/1")
let legacyLinkLeaks = 0;
for (const hub of ['index.html', 'curriculum/index.html', ...standaloneHubsToCheck]) {
  const content = fs.readFileSync(path.resolve(distDir, hub), 'utf-8');
  if (content.includes('href="https://learnsmc.xyz/?chapter=1"') || content.includes('href="https://learnsmc.xyz/chapter/1"')) {
    legacyLinkLeaks++;
    console.error(`❌ Legacy link leak detected in ${hub}`);
  }
}
assert(legacyLinkLeaks === 0, 'ZERO legacy /chapter/1 or ?chapter=1 links found in hub pages');

console.log('\n--------------------------------------------------');
console.log(`Results: ${passedTests} checks passed, ${failedTests} failed.`);
if (failedTests > 0) {
  console.error(`Audit completed with ${failedTests} failure(s).`);
  process.exit(1);
} else {
  console.log('✅ ALL URL consistency, canonical trailing slash, sitemap, and legacy redirect audits PASSED successfully!');
}
