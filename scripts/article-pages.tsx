import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { articles, articlePath, articleWordCount, readingMinutes } from '../src/data/articles';
import { ArticlesView } from '../src/components/articles/ArticlesView';
import { SketchSvg } from '../src/components/articles/ArticleSketch';
import { lessonAuthor, publisher } from '../src/utils/publisher';
import type { RouteMeta } from './prerender';

export function articlePages(projectRoot: string, distDir: string): RouteMeta[] {
  const base = 'https://learnsmc.xyz';
  const imageDir = path.join(distDir, 'images/articles');
  fs.mkdirSync(imageDir, { recursive: true });
  for (const a of articles) fs.writeFileSync(path.join(imageDir, `${a.sketch}.svg`), renderToStaticMarkup(<SketchSvg kind={a.sketch} />));
  const routes: RouteMeta[] = [{
    url: `${base}/articles/`, canonical: `${base}/articles/`, outputPath: 'articles/index.html',
    title: 'Illustrated Trading Articles: Psychology, Risk & Markets | LearnSMC',
    description: 'Original illustrated essays about trading psychology, drawdown, liquidity and Bitcoin on-chain data. Read thoughtful explanations by Muhammad Umer Ijaz.',
    heading: 'Markets are complicated. Let’s draw them out.', subheading: 'Original illustrated trading essays', badge: 'Articles',
    bodyHtml: renderToStaticMarkup(<ArticlesView staticMode />),
    schemaJson: { '@type': 'CollectionPage', name: 'LearnSMC Articles', url: `${base}/articles/`, publisher, mainEntity: { '@type': 'ItemList', itemListElement: articles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: base + articlePath(a), name: a.title })) } }
  }, ...articles.map(a => ({
    url: base + articlePath(a), canonical: base + articlePath(a), outputPath: `articles/${a.slug}/index.html`,
    title: a.seoTitle, description: a.description, heading: a.title, subheading: a.description, badge: a.topic,
    bodyHtml: renderToStaticMarkup(<ArticlesView slug={a.slug} staticMode />),
    schemaJson: { '@type': 'BlogPosting', '@id': base + articlePath(a) + '#article', headline: a.title, description: a.description,
      url: base + articlePath(a), mainEntityOfPage: base + articlePath(a), author: lessonAuthor, publisher,
      datePublished: `${a.date}T12:00:00+05:00`, dateModified: `${a.updated || a.date}T12:00:00+05:00`,
      image: [`${base}/images/articles/${a.sketch}-social.png`], inLanguage: 'en', isAccessibleForFree: true,
      articleSection: a.topic, wordCount: articleWordCount(a), timeRequired: `PT${readingMinutes(a)}M`,
      citation: a.sources.map(s => s.url), isPartOf: { '@type': 'Blog', name: 'LearnSMC Articles', url: `${base}/articles/` }
    }
  }))];
  const xml = (s: string) => s.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]!));
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>LearnSMC Articles</title><link>${base}/articles/</link><description>Original illustrated essays on trading, risk and market data.</description><language>en</language><atom:link href="${base}/articles/feed.xml" rel="self" type="application/rss+xml"/>${articles.map(a => `<item><title>${xml(a.title)}</title><link>${base + articlePath(a)}</link><guid isPermaLink="true">${base + articlePath(a)}</guid><description>${xml(a.description)}</description><category>${xml(a.topic)}</category><pubDate>${new Date(`${a.date}T12:00:00+05:00`).toUTCString()}</pubDate></item>`).join('')}</channel></rss>`;
  fs.mkdirSync(path.join(distDir, 'articles'), { recursive: true });
  fs.writeFileSync(path.join(distDir, 'articles/feed.xml'), feed);
  return routes;
}
