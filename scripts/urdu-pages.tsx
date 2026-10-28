import { isEnglishOnlyHistory, englishOnlyHistoryPaths } from '../src/data/history-paths';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { localizeHtml, addEnglishAlternates, addLanguageAlternates } from './localized-html';
import { languageAlternates, localizedHref, SITE_ORIGIN } from '../src/i18n/locale';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { t } from '../src/i18n/translate';
import { URDU_PUBLISHED } from '../src/i18n/release';
import { articles, articleImageKey } from '../src/data/articles';
import { StudySketchSvg } from '../src/components/articles/StudySketch';
import { SketchSvg } from '../src/components/articles/ArticleSketch';
import type { RouteMeta } from './prerender';
import { orderRedirectRules } from './redirect-rules';
import { replaceAuditedReadingRoot } from './audited-reading-document';

export function generateUrduPages(dist: string, routes: RouteMeta[]) {
  const preview = !URDU_PUBLISHED;
  if (preview && process.env.URDU_FULL_PREVIEW !== 'true') return;
  const available = new Set(routes.map(route => new URL(route.canonical).pathname));
  const missing = new Map<string, Set<string>>();
  const manifest = JSON.parse(fs.readFileSync(path.join(dist, 'seo-manifest.json'), 'utf8'));
  for (const route of routes) {
    const englishPath = new URL(route.canonical).pathname;
    const sourcePath = path.join(dist, route.outputPath);
    const source = fs.readFileSync(sourcePath, 'utf8');
    if (isEnglishOnlyHistory(englishPath)) {
      if (!preview) fs.writeFileSync(sourcePath, addLanguageAlternates(source, englishPath, !route.isNoindex));
      continue;
    }
    let html = localizeHtml(source, englishPath, urdu, { preview, indexable: !route.isNoindex, availablePaths: available, onMissing(text) {
      if (!text) return;
      if (!missing.has(text)) missing.set(text, new Set());
      missing.get(text)!.add(englishPath);
    } });
    html = replaceAuditedReadingRoot(html, localizedHref(englishPath, 'ur'), route.heading);
    const outputPath = path.posix.join('ur', route.outputPath);
    fs.mkdirSync(path.dirname(path.join(dist, outputPath)), { recursive: true });
    fs.writeFileSync(path.join(dist, outputPath), html);
    if (!preview) fs.writeFileSync(sourcePath, addEnglishAlternates(source, englishPath, !route.isNoindex));
    manifest.push({ path: localizedHref(englishPath, 'ur'), outputPath, title: t(route.title, 'ur', urdu), description: t(route.description, 'ur', urdu), indexable: !preview && !route.isNoindex, locale: 'ur' });
  }
  if (fs.existsSync(path.join(dist, '404.html'))) fs.writeFileSync(path.join(dist, 'ur/404.html'), localizeHtml(fs.readFileSync(path.join(dist, '404.html'), 'utf8'), '/404.html', urdu, { preview: true, availablePaths: available }));

  // Standalone cover SVGs cannot inherit the document font. Embed the local Urdu face.
  const font = fs.readFileSync('public/fonts/noto-naskh-arabic.woff2').toString('base64');
  for (const article of articles.filter(a=>!a.historyOrder)) {
    const svg = renderToStaticMarkup(<TranslationProvider locale="ur" catalog={urdu}>{article.visualSeries ? <StudySketchSvg series={article.visualSeries} /> : <SketchSvg kind={article.sketch} cover />}</TranslationProvider>);
    fs.writeFileSync(path.join(dist, `images/articles/${articleImageKey(article)}-ur.svg`), svg.replace(/(<svg[^>]*>)/, `$1<style>@font-face{font-family:'Noto Naskh Arabic';src:url(data:font/woff2;base64,${font}) format('woff2')}</style>`));
  }
  const feed = fs.readFileSync(path.join(dist, 'articles/feed.xml'), 'utf8');
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const translatedFeed = feed.replace(/<item>[\s\S]*?<\/item>/g, item => englishOnlyHistoryPaths.some(p => item.includes(`${SITE_ORIGIN}${p}`)) ? '' : item);
  const urduFeed = translatedFeed.replace(/<language>en<\/language>/, '<language>ur</language>')
    .replace(/<(title|description|category)>([\s\S]*?)<\/\1>/g, (_all, tag, text) => `<${tag}>${escape(t(text.replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&quot;/g, '"'), 'ur', urdu))}</${tag}>`)
    .replaceAll(`${SITE_ORIGIN}/articles/`, `${SITE_ORIGIN}/ur/articles/`);
  fs.writeFileSync(path.join(dist, 'ur/articles/feed.xml'), urduFeed);
  if (!preview) {
    const languages = '\n## Languages\n\nEnglish: https://learnsmc.xyz/\nUrdu: https://learnsmc.xyz/ur/\nUse the language switcher to open the equivalent page in either language.\n';
    fs.appendFileSync(path.join(dist, 'llms.txt'), languages);
    fs.appendFileSync(path.join(dist, 'llms-full.txt'), languages + '\n## Urdu page directory\n\n' + routes.filter(route => !route.isNoindex && !isEnglishOnlyHistory(new URL(route.canonical).pathname)).map(route => `- [${t(route.heading, 'ur', urdu)}](${SITE_ORIGIN + localizedHref(new URL(route.canonical).pathname, 'ur')}): ${t(route.description, 'ur', urdu)}`).join('\n') + '\n');
    const sitemapPath = path.join(dist, 'sitemap.xml');
    let sitemap = fs.readFileSync(sitemapPath, 'utf8').replace('<urlset ', '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml" ');
    const originals = [...sitemap.matchAll(/  <url>[\s\S]*?<\/url>/g)].map(match => match[0]);
    const localizedEntries: string[] = [];
    for (const entry of originals) {
      const englishUrl = entry.match(/<loc>([^<]+)<\/loc>/)![1];
      const pathname = new URL(englishUrl).pathname;
      const alternates = languageAlternates(pathname).map(a => `    <xhtml:link rel="alternate" hreflang="${a.language}" href="${a.href}" />`).join('\n');
      sitemap = sitemap.replace(entry, entry.replace('</url>', `${alternates}\n  </url>`));
      if(isEnglishOnlyHistory(pathname)) continue;
      localizedEntries.push(entry.replace(englishUrl, SITE_ORIGIN + localizedHref(pathname, 'ur')).replace('</url>', `${alternates}\n  </url>`));
    }
    sitemap = sitemap.replace('</urlset>', `${localizedEntries.join('\n')}\n</urlset>`);
    fs.writeFileSync(sitemapPath, sitemap);
    const redirectsPath = path.join(dist, '_redirects');
    const redirects = fs.readFileSync(redirectsPath, 'utf8');
    const localizedRedirects = redirects.split('\n').flatMap(line => {
      const parts = line.trim().split(/\s+/);
      if (parts.length !== 3 || !parts[0].startsWith('/') || !parts[1].startsWith('/')) return [];
      return [`/ur${parts[0]} ${localizedHref(parts[1], 'ur')} ${parts[2]}`];
    });
    fs.writeFileSync(redirectsPath, orderRedirectRules(`${redirects}\n# Urdu legacy aliases\n${localizedRedirects.join('\n')}\n# English-first history; no untranslated Urdu duplicates\n${englishOnlyHistoryPaths.map(p => `/ur${p} ${p} 302`).join('\n')}\n`));
  }
  fs.writeFileSync(path.join(dist, 'seo-manifest.json'), JSON.stringify(manifest, null, 2));
  fs.mkdirSync('outputs/urdu-localization', { recursive: true });
  fs.writeFileSync('outputs/urdu-localization/rendered-missing.json', JSON.stringify([...missing].map(([english, pages]) => ({ english, pages: [...pages] })), null, 2));
  const unchangedReferences = new Set(['LearnSMC', 'MSS', 'FVG', 'BOS', 'OTE', 'BSL', 'SSL', 'IFVG', 'MVRV = 2', 'NUPL = 0.5']);
  const unresolved = [...missing.keys()].filter(text => !unchangedReferences.has(text) && !/^(?:https?:\/\/|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$)/.test(text));
  if (!preview && unresolved.length) throw new Error(`Urdu publication stopped: ${unresolved.length} untranslated text segments. Review outputs/urdu-localization/rendered-missing.json.`);
  console.log(`Urdu ${preview ? 'noindex review' : 'public'} documents generated: ${routes.filter(route => !isEnglishOnlyHistory(new URL(route.canonical).pathname)).length}. Unmatched text segments require review: ${missing.size}.`);
}
