import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { textbookChapters } from '../src/data/chaptersData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');

console.log('--- Starting Comprehensive SEO & Metadata Audit ---');

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

// 1. Verify dist exists
assert(fs.existsSync(distDir), 'dist directory exists');

// 2. Verify robots.txt
const robotsPath = path.resolve(distDir, 'robots.txt');
assert(fs.existsSync(robotsPath), 'dist/robots.txt exists');
const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
assert(robotsContent.includes('Sitemap: https://learnsmc.xyz/sitemap.xml'), 'robots.txt points to correct sitemap URL');
assert(robotsContent.includes('Allow: /'), 'robots.txt allows crawling of public content');

// 3. Verify sitemap.xml
const sitemapPath = path.resolve(distDir, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
assert(sitemapContent.startsWith('<?xml'), 'sitemap.xml has valid XML header');
assert(sitemapContent.includes('<urlset'), 'sitemap.xml has urlset tag');
assert(sitemapContent.includes('https://learnsmc.xyz/'), 'sitemap.xml contains root domain');

// Check that all 53 chapters are in sitemap
let missingChapterUrls = 0;
for (const ch of textbookChapters) {
  const chapterUrl = `<loc>https://learnsmc.xyz/learn/${ch.slug}</loc>`;
  if (!sitemapContent.includes(chapterUrl)) {
    missingChapterUrls++;
    console.error(`Missing from sitemap: https://learnsmc.xyz/learn/${ch.slug}`);
  }
}
assert(missingChapterUrls === 0, `All ${textbookChapters.length} chapters present in sitemap.xml`);

// 4. Verify 404.html
const notFoundPath = path.resolve(distDir, '404.html');
assert(fs.existsSync(notFoundPath), 'dist/404.html exists');
const notFoundHtml = fs.readFileSync(notFoundPath, 'utf-8');
assert(notFoundHtml.includes('noindex'), '404.html contains noindex directive');
assert(notFoundHtml.includes('404'), '404.html contains 404 error indicator');

// 5. Verify HTML files across chapters, tools, and legal pages
const titlesMap = new Map<string, string>();
const descriptionsMap = new Map<string, string>();
const canonicalsMap = new Map<string, string>();

function auditHtmlFile(relPath: string, expectedCanonical: string, isRedirect = false) {
  const filePath = path.resolve(distDir, relPath);
  assert(fs.existsSync(filePath), `HTML file exists: ${relPath}`);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  assert(content.length > 500, `${relPath} is non-empty (${(content.length / 1024).toFixed(1)} KB)`);

  if (isRedirect) {
    assert(content.includes(`rel="canonical" href="${expectedCanonical}"`), `${relPath} has correct target canonical`);
    return;
  }

  // Title check
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
  assert(!!titleMatch && titleMatch[1].trim().length > 10, `${relPath} has non-empty <title>`);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Description check
  const descMatch = content.match(/<meta name="description" content="([\s\S]*?)" \/>/);
  assert(!!descMatch && descMatch[1].trim().length > 20, `${relPath} has non-empty description`);
  const desc = descMatch ? descMatch[1].trim() : '';

  // Canonical check
  const canonicalMatch = content.match(/<link rel="canonical" href="([\s\S]*?)" \/>/);
  assert(!!canonicalMatch && canonicalMatch[1] === expectedCanonical, `${relPath} has exact matching canonical: ${expectedCanonical}`);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';

  // H1 Check
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  assert(!!h1Match && h1Match[1].trim().length > 0, `${relPath} has primary <h1>`);

  // Uniqueness check across distinct canonical pages
  if (titlesMap.has(title) && titlesMap.get(title) !== relPath) {
    console.warn(`⚠️ Warning: Duplicate title across ${titlesMap.get(title)} and ${relPath}: "${title}"`);
  } else {
    titlesMap.set(title, relPath);
  }

  if (descriptionsMap.has(desc) && descriptionsMap.get(desc) !== relPath) {
    console.warn(`⚠️ Warning: Duplicate description across ${descriptionsMap.get(desc)} and ${relPath}: "${desc}"`);
  } else {
    descriptionsMap.set(desc, relPath);
  }

  if (canonicalsMap.has(canonical) && canonicalsMap.get(canonical) !== relPath) {
    console.error(`❌ Duplicate canonical URL across ${canonicalsMap.get(canonical)} and ${relPath}: "${canonical}"`);
    failedTests++;
  } else {
    canonicalsMap.set(canonical, relPath);
  }
}

// Audit Core Pages
console.log('Auditing Core & Legal Pages...');
auditHtmlFile('index.html', 'https://learnsmc.xyz/');
auditHtmlFile('curriculum/index.html', 'https://learnsmc.xyz/curriculum');
auditHtmlFile('masood/index.html', 'https://learnsmc.xyz/masood');
auditHtmlFile('tools/index.html', 'https://learnsmc.xyz/tools');
auditHtmlFile('about/index.html', 'https://learnsmc.xyz/about');
auditHtmlFile('disclaimer/index.html', 'https://learnsmc.xyz/disclaimer');
auditHtmlFile('privacy/index.html', 'https://learnsmc.xyz/privacy');
auditHtmlFile('terms/index.html', 'https://learnsmc.xyz/terms');
auditHtmlFile('contact/index.html', 'https://learnsmc.xyz/contact');
auditHtmlFile('adsense/index.html', 'https://learnsmc.xyz/adsense');

// Audit All 53 Chapter Pages at /learn/:slug
console.log(`Auditing all ${textbookChapters.length} chapter pages...`);
for (const ch of textbookChapters) {
  auditHtmlFile(`learn/${ch.slug}/index.html`, `https://learnsmc.xyz/learn/${ch.slug}`);
  // Check backward compatibility alias
  auditHtmlFile(`chapter/${ch.id}/index.html`, `https://learnsmc.xyz/learn/${ch.slug}`, true);
}

// Audit Workbench Tools
console.log('Auditing Workbench tools...');
const toolSlugs = ['chartlab', 'simulator', 'backtest', 'journal', 'graph', 'concepts', 'compare', 'dashboard', 'masterclass', 'ict-suite'];
for (const t of toolSlugs) {
  auditHtmlFile(`tools/${t}/index.html`, `https://learnsmc.xyz/tools/${t}`);
}

console.log('--------------------------------------------------');
console.log(`Results: ${passedTests} checks passed, ${failedTests} failed.`);
if (failedTests > 0) {
  console.error(`Audit finished with ${failedTests} failure(s).`);
  process.exit(1);
} else {
  console.log('✅ All SEO, metadata, canonical, and sitemap audits PASSED successfully!');
}
