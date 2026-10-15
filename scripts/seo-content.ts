import { textbookChapters } from '../src/data/chaptersData';
import { masoodPlaylistsData } from '../src/data/masoodData';
import { contextualFragments, relatedChapters } from '../src/utils/contextualLinks';
import { topicClusters } from '../src/utils/topicClusters';
import { publisher, lessonAuthor, financialDisclaimer } from '../src/utils/publisher';
import type { RouteMeta } from './prerender';

export const escape = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]!));
export function renderContextualText(text: string, path: string) {
  return contextualFragments(text, path).map(f => f.href
    ? `<a href="${escape(f.href)}">${escape(f.text)}</a>` : escape(f.text)).join('');
}
const link = (path: string, text: string) => `<a href="${escape(path)}">${escape(text)}</a>`;
const list = (items: string[]) => `<ul>${items.map(s => `<li>${s}</li>`).join('')}</ul>`;
const section = (title: string, content: string) => `<section><h2>${escape(title)}</h2>${content}</section>`;
const notice = `<aside class="ymyl-disclaimer" aria-label="Financial education and risk notice" style="margin-top:2rem;padding:1.25rem;border:1px solid #a97829;border-radius:8px;background:#241d15"><h2>Financial education and risk notice</h2><p>${escape(financialDisclaimer)}</p>${link('/disclaimer/', 'Full risk disclosure')}</aside>`;
const byline = `<p>Written study notes by ${link('/about/#author', lessonAuthor.name)}. Published independently by LearnSMC.</p>`;
const source = `<p>Video source: <a href="https://www.youtube.com/@TraderAbdullahMasood" rel="noopener noreferrer">Trader Abdullah Masood on YouTube</a>. Notes are independently written; the source educator is not the author or reviewer of these notes.</p>`;
function route(path: string, title: string, description: string, bodyHtml: string): RouteMeta {
  return { url: `https://learnsmc.xyz${path}`, canonical: `https://learnsmc.xyz${path}`,
    outputPath: `${path.slice(1)}index.html`, title: `${title} | LearnSMC`, description,
    heading: title, subheading: description, badge: 'Study guide', bodyHtml };
}

export const canonicalAliases: Record<string, string> = {
  '/tools/graph/': '/tools/knowledge-graph/',
  '/tools/dashboard/': '/tools/profile/',
  '/tools/ict-suite/': '/tools/delivery-suite/',
  '/tools/ict_suite/': '/tools/delivery-suite/',
  '/masood/lectures/': '/masood/',
  '/masood/bias_calc/': '/masood/bias-calculator/',
  '/masood/rules/': '/masood/golden-rules/',
};

export function prepareRoutes(routes: RouteMeta[]) {
  for (const r of routes) {
    const old = new URL(r.canonical).pathname;
    if (canonicalAliases[old]) {
      r.canonical = r.url = `https://learnsmc.xyz${canonicalAliases[old]}`;
      r.outputPath = `${canonicalAliases[old].slice(1)}index.html`;
    }
  }
  routes.push(...topicClusters.map(cluster => route(`/curriculum/${cluster.slug}/`, cluster.part,
    `Study ${cluster.chapters.length} lessons in ${cluster.part.replace(/^Part [IVXLCDM]+ - /, '')}, with definitions, worked explanations and practice questions.`,
    section('Learning path', list(cluster.chapters.map(c => link(`/learn/${c.slug}/`, c.title)))) +
    cluster.chapters.map(c => section(c.title, `<p>${escape(c.summary[0])}</p>` + list(c.summary.slice(1).map(escape)) + link(`/learn/${c.slug}/`, 'Read the complete lesson'))).join(''))));
  routes.push(...masoodPlaylistsData.map(p => route(`/masood/playlists/${p.id}/`, `${p.badge} — Abdullah Masood lectures`,
    `${p.subtitle}. Browse ${p.lectures.length} Abdullah Masood video study guides with notes, exercises and source links.`,
    `<p>${escape(p.description)}</p><p>${escape(p.targetAudience)}</p>` + source +
    section('Before you start', list(p.prerequisites.map(escape))) +
    section('Lecture directory', list(p.lectures.map(l => link(`/masood/lectures/${l.id}/`, l.title)))) +
    p.lectures.map(l => section(l.title, `<p>${escape(l.shortSummary)}</p>` + list(l.keyTakeaways.map(escape)) + link(`/masood/lectures/${l.id}/`, 'Read the study notes'))).join(''))));
  const root = routes.find(r => r.canonical === 'https://learnsmc.xyz/curriculum/')!;
  root.bodyHtml += section('Browse by topic', list(topicClusters.map(c => link(`/curriculum/${c.slug}/`, c.part))));

  const hub = routes.find(r => r.canonical === 'https://learnsmc.xyz/masood/')!;
  const lectures = masoodPlaylistsData.flatMap(p => p.lectures);
  hub.title = `Abdullah Masood ICT & SMC Lectures and Study Notes | LearnSMC`;
  hub.description = `Explore ${lectures.length} Abdullah Masood video study guides across ${masoodPlaylistsData.length} series: ICT, SMC, daily bias, trading psychology and risk management.`;
  hub.subheading = hub.description;
  hub.bodyHtml = source + masoodPlaylistsData.map(p => section(p.title,
    `<p>${escape(p.description)}</p>` + link(`/masood/playlists/${p.id}/`, `Browse all ${p.lectures.length} lectures`) +
    list(p.lectures.map(l => link(`/masood/lectures/${l.id}/`, l.title))))).join('');

  for (const p of masoodPlaylistsData) for (const lec of p.lectures) {
    const path = `/masood/lectures/${lec.id}/`;
    const r = routes.find(r => r.canonical === `https://learnsmc.xyz${path}`)!;
    r.description = `${lec.shortSummary} Study notes, practice exercise and the original Abdullah Masood video.`;
    r.bodyHtml = byline + source + `<p>${renderContextualText(lec.shortSummary, path)}</p>` +
      [['Key takeaways', lec.keyTakeaways], ['Rules discussed in this lecture', lec.coreRules],
        ['Practice checklist', lec.tradingChecklist], ['Common mistakes to examine', lec.commonMistakes]]
      .map(([title, points]) => section(title as string, list((points as string[] || []).map(t => renderContextualText(t, path))))).join('') +
      section('Demo account exercise', `<p>${renderContextualText(lec.practicalExercise, path)}</p>`) +
      (lec.bilingualNotes ? section('Additional study notes', `<p>${escape(lec.bilingualNotes)}</p>`) : '') +
      `<p><a href="https://www.youtube.com/watch?v=${escape(lec.youtubeId)}" rel="noopener noreferrer">Watch the original lecture on YouTube</a></p>` +
      section('Continue this series', list(p.lectures.filter(l => l.id !== lec.id).slice(0, 5).map(l => link(`/masood/lectures/${l.id}/`, l.title))) + link(`/masood/playlists/${p.id}/`, `Complete ${p.badge} series`));
    r.schemaJson = {
      '@type': 'LearningResource', name: lec.title, description: lec.shortSummary,
      url: r.canonical, learningResourceType: 'Study notes', author: lessonAuthor, publisher,
      isPartOf: { '@type': 'CollectionPage', name: p.title, url: `https://learnsmc.xyz/masood/playlists/${p.id}/` },
      citation: { '@type': 'CreativeWork', name: lec.title, url: `https://www.youtube.com/watch?v=${lec.youtubeId}`,
        creator: { '@type': 'Person', name: 'Abdullah Masood', sameAs: ['https://www.youtube.com/@TraderAbdullahMasood'] } },
    };
  }

  const animations = routes.find(r => r.canonical.endsWith('/masood/animations/'))!;
  animations.bodyHtml += section('Animation study directory', list(lectures.filter(l => l.animationType).map(l =>
    `${link(`/masood/lectures/${l.id}/`, l.title)} — ${escape(l.shortSummary)}`)));
  const bias = routes.find(r => r.canonical.endsWith('/masood/bias-calculator/'))!;
  bias.bodyHtml += section('How to use the four inputs', list([
    'Choose a higher timeframe direction from the chart; choose unclear when evidence conflicts.',
    'Locate price inside the selected range. Premium and discount describe relative location, not a guarantee of reversal.',
    'Record whether a prior high or low has been swept. A sweep alone does not confirm a trade.',
    'Check upcoming economic releases. The output is a training heuristic, not a forecast or a validated probability.',
  ].map(escape))) + section('Study the underlying lessons', list(lectures.filter(l => /bias|news|premium/i.test(l.title)).map(l => link(`/masood/lectures/${l.id}/`, l.title))));
  const rules = routes.find(r => r.canonical.endsWith('/masood/golden-rules/'))!;
  rules.bodyHtml += section('Source-linked rule study', list(lectures.filter(l => /risk|psychology|golden|rules/i.test(l.title)).map(l => `${link(`/masood/lectures/${l.id}/`, l.title)}: ${escape(l.shortSummary)}`)));

  const contact = routes.find(r => r.canonical.endsWith('/contact/'))!;
  contact.bodyHtml += section('How to report an issue', '<p>For a lesson correction, include the full page URL, the passage in question and any supporting source. For a technical problem, include the URL, browser name and the steps that produced the issue. Do not send account passwords, trading account details or private financial records.</p>') +
    section('Copyright and source inquiries', '<p>If you own material referenced by this site, identify the work and the page where it appears so the publisher can review the request. Video links lead to third-party services; this site does not host those videos.</p>');
  const privacy = routes.find(r => r.canonical.endsWith('/privacy/'))!;
  privacy.bodyHtml += section('Advertising choices', '<p>Optional advertising does not load until you allow it in Privacy choices. You can withdraw that choice using the same control. If advertising is enabled, Google and its partners may use cookies and process device information. Regional consent messages, where required, are provided through the configured advertising consent service.</p><p><a href="https://policies.google.com/technologies/ads">How Google uses advertising information</a>. Embedded videos connect to YouTube only when loaded.</p>');
  const about = routes.find(r => r.canonical.endsWith('/about/'))!;
  about.bodyHtml = `<section id="author"><h2>Author and publisher</h2><p>Muhammad Umer Ijaz writes and maintains the LearnSMC lessons and study notes. LearnSMC is an independent educational project. Linked third-party videos retain their original authorship.</p></section>` +
    section('Editorial approach', '<p>These pages explain trading frameworks for study. Framework claims and simulated examples are not proof of profitable outcomes. Test assumptions independently and check the original video sources. Named expert or peer review is not claimed.</p>') +
    section('Corrections and contact', `<p>${link('/contact/', 'Send a correction, source reference or copyright inquiry')}.</p>`) + notice;
  about.schemaJson = { '@type': 'AboutPage', name: 'About LearnSMC', mainEntity: lessonAuthor, publisher };
}

export function enrichRoute(r: RouteMeta, routes: RouteMeta[]) {
  const path = new URL(r.canonical).pathname;
  const chapterCount = textbookChapters.length;
  const lectureCount = masoodPlaylistsData.reduce((sum, p) => sum + p.lectures.length, 0);
  const counts = (text: string) => text.replace(/\b57(?=[- ](?:chapter|Chapter|CHAPTER))/g, String(chapterCount)).replace(/\b52(?=[- ](?:Abdullah|lecture|Lecture|LECTURE|Masterclass|masterclass))/g, String(lectureCount));
  r.title = counts(r.title); r.description = counts(r.description); r.bodyHtml = counts(r.bodyHtml);
  r.heading = counts(r.heading); r.subheading = counts(r.subheading);
  if (r.title.length > 80) r.title = r.title.slice(0, 65).replace(/\s+\S*$/, '') + ' | LearnSMC';
  r.description = r.description.replace(/\s+/g, ' ').trim();
  if (r.description.length > 165) r.description = r.description.slice(0, 162).replace(/\s+\S*$/, '') + '…';
  if (/^\/tools\/(journal|profile)\//.test(path) || path === '/adsense/') r.isNoindex = true;
  const chapter = textbookChapters.find(c => path === `/learn/${c.slug}/`);
  if (chapter) {
    r.bodyHtml += byline + section('Continue learning', list(relatedChapters(chapter.id).map(c => link(`/learn/${c.slug}/`, c.title)))) +
      link(`/curriculum/${topicClusters.find(c => c.part === chapter.part)!.slug}/`, `Explore ${chapter.part}`);
    r.schemaJson = { ...r.schemaJson, '@type': 'LearningResource', author: lessonAuthor, publisher,
      url: r.canonical, inLanguage: 'en', isAccessibleForFree: true };
  }
  const children = routes.filter(c => c !== r && new URL(c.canonical).pathname.startsWith(path) &&
    !routes.some(mid => mid !== r && mid !== c && new URL(mid.canonical).pathname.startsWith(path) && new URL(c.canonical).pathname.startsWith(new URL(mid.canonical).pathname)));
  if (children.length && path !== '/') r.bodyHtml += section('Explore this topic', list(children.map(c => link(new URL(c.canonical).pathname, c.heading))));
  if (/^\/(learn|masood|tools)\//.test(path) && !r.isNoindex) r.bodyHtml += notice;
  const parentRoutes = routes.filter(c => c !== r && c.canonical !== 'https://learnsmc.xyz/' &&
    path.startsWith(new URL(c.canonical).pathname)).sort((a, b) => a.canonical.length - b.canonical.length);
  const crumbs = [{ name: 'Home', url: 'https://learnsmc.xyz/' },
    ...parentRoutes.map(p => ({ name: p.heading, url: p.canonical })),
    ...(path === '/' ? [] : [{ name: r.heading, url: r.canonical }])];
  if (path !== '/') r.bodyHtml = `<nav aria-label="Breadcrumb">${crumbs.map(c => link(new URL(c.url).pathname, c.name)).join(' / ')}</nav>` + r.bodyHtml;
  r.schemaJson = { '@context': 'https://schema.org', '@graph': [publisher, lessonAuthor,
    { '@type': 'WebSite', '@id': 'https://learnsmc.xyz/#website', name: 'LearnSMC', url: 'https://learnsmc.xyz/' },
    { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) },
    r.schemaJson || { '@type': children.length ? 'CollectionPage' : 'WebPage', name: r.heading, description: r.description, url: r.canonical, publisher },
  ] };
}
