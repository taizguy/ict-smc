import { AuditedRouteBody } from '../src/components/AuditedRouteDocument';
import { MasoodLecturePage } from '../src/components/MasoodLecturePage';
import { auditedReadingRoute } from '../src/utils/auditedReadingRoutes';
import {MasterclassHub} from '../src/components/MasterclassHub';
import {masterclassHubPath,masterclassHubTitle,masterclassHubDescription,masterclassHubH1,masterclassHubLessons,masterclassHubFaqs} from '../src/data/masterclassHub';
import {getMasterclassUrl} from '../src/utils/workbenchToolRoutes';
import {alchemyDates} from '../src/data/chapters/marketAlchemyPilot';
import { lessonBreadcrumbs } from '../src/utils/lessonBreadcrumbs';
import { deliverySupport } from '../src/data/chapters/deliverySupport';
import { retiredGraphAliases } from '../src/utils/knowledgeGraphRoutes';
import { TERMS_SECTIONS, ABOUT_GUIDANCE, CONTACT_GUIDANCE, publisherPageRevision } from '../src/data/publisherPageCopy';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CurriculumReview } from '../src/components/CurriculumReview';
import { ChapterDiagram } from '../src/components/ChapterDiagram';
import { CheatSheetPage } from '../src/components/CheatSheetPage';
import { LearningFirstHome } from '../src/components/LearningFirstHome';
import { SearchFocusGuide } from '../src/components/SearchFocusGuide';
import { TopicLearningGuide, TopicJourneyLinks, GlossaryTopicLink } from '../src/components/TopicLearningGuide';
import { topicJourneys, topicJourneyRevision } from '../src/data/topicJourneys';
import { cornerstoneGlossaryRoutes, cornerstoneRevision } from '../src/data/cornerstoneGuides';
import { guidedChartRevision } from '../src/utils/guidedChartDrills';
import { focusPaths, searchFocusRevision, type SearchFocusKind } from '../src/data/searchFocus';
import { chapterIllustrationRevision } from '../src/data/chapters/diagrams';
import { ChapterQuiz } from '../src/components/ChapterQuiz';
import { ReviewedModelSource } from '../src/components/ReviewedModelSource';
import { reviewedModelSources } from '../src/data/reviewedModelSources';
import { MentorshipsView, MentorshipsTeaser } from '../src/components/MentorshipsView';
import { mentorshipTracks, mentorshipPath } from '../src/data/mentorshipTracks';
import { curriculumReview, curriculumReviewDate, chapterReviewRevision } from '../src/data/curriculumReview';
import { searchTitle, searchDescription, conciseHeading, studyTopics } from '../src/utils/searchMetadata';
import { toolStudyGuide } from '../src/utils/toolStudyGuides';
import { correctToolDocument } from './tools-content';
import { textbookChapters } from '../src/data/chaptersData';
import { masoodPlaylistsData } from '../src/data/masoodData';
import { contextualFragments, relatedChapters } from '../src/utils/contextualLinks';
import { topicClusters } from '../src/utils/topicClusters';
import { publisher, lessonAuthor, financialDisclaimer, authorContact, authorProfileRevision } from '../src/utils/publisher';
import { conceptComparisons } from '../src/data/comparisonsData';
import { getComparisonSlug } from '../src/utils/workbenchToolRoutes';
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
const notice = `<aside class="ymyl-disclaimer" aria-label="Financial education and risk notice" style="margin-top:2rem;padding:1.25rem;border:1px solid #a97829;border-radius:8px;background:#ffffff"><h2>Financial education and risk notice</h2><p>${escape(financialDisclaimer)}</p>${link('/disclaimer/', 'Full risk disclosure')}</aside>`;
const byline = `<p>Written study notes by ${link('/about/#author', lessonAuthor.name)}. Published independently by LearnSMC.</p>`;
const source = `<p>Video source: <a href="https://www.youtube.com/@TraderAbdullahMasood" rel="noopener noreferrer">Trader Abdullah Masood on YouTube</a>. Notes are independently written; the source educator is not the author or reviewer of these notes.</p>`;
function route(path: string, title: string, description: string, bodyHtml: string): RouteMeta {
  return { url: `https://learnsmc.xyz${path}`, canonical: `https://learnsmc.xyz${path}`,
    outputPath: `${path.slice(1)}index.html`, title: `${title} | LearnSMC`, description,
    heading: title, subheading: description, badge: 'Study guide', bodyHtml };
}

export const canonicalAliases: Record<string, string> = {
  ...retiredGraphAliases,
  '/tools/graph/': '/tools/knowledge-graph/',
  '/tools/dashboard/': '/tools/profile/',
  '/tools/ict-suite/': '/tools/delivery-suite/',
  '/tools/ict_suite/': '/tools/delivery-suite/',
  '/masood/lectures/': '/masood/',
  '/masood/bias_calc/': '/masood/bias-calculator/',
  '/masood/rules/': '/masood/golden-rules/',
};

export function prepareRoutes(routes: RouteMeta[]) {
  const cheat = route('/resources/ict-smc-cheat-sheet/', 'Free ICT/SMC Glossary & Cheat Sheet PDF',
    'Download free English and Urdu ICT/SMC glossary PDFs with 20 definitions, original diagrams, risk examples and an observation checklist.',
    renderToStaticMarkup(createElement(CheatSheetPage, {staticOnly:true})));
  cheat.schemaJson = {'@type':'DigitalDocument',name:'ICT/SMC Glossary & Cheat Sheet',url:cheat.canonical,author:lessonAuthor,publisher,datePublished:'2026-10-20',dateModified:'2026-10-20',isAccessibleForFree:true,
    encoding:['en','ur'].map(language=>({'@type':'MediaObject',encodingFormat:'application/pdf',inLanguage:language,contentUrl:`https://learnsmc.xyz/downloads/learnsmc-ict-smc-cheat-sheet-${language}.pdf`}))};
  routes.push(cheat);
  const mentorshipHub = route('/curriculum/mentorships/', 'Compare ICT Mentorships & Study Paths',
    'Compare six ICT mentorships, choose a study path and find related lessons, original recordings, prerequisites and clearly stated review coverage.',
    renderToStaticMarkup(createElement(MentorshipsView, { embedded: true })));
  mentorshipHub.heading = 'Which ICT mentorship should I study?';
  mentorshipHub.schemaJson = { '@type':'CollectionPage', name:'ICT mentorship study paths', mainEntity:{ '@type':'ItemList', itemListElement:mentorshipTracks.map((track,index) => ({'@type':'ListItem',position:index+1,name:track.title,url:'https://learnsmc.xyz'+mentorshipPath(track.slug)})) } };
  routes.push(mentorshipHub, ...mentorshipTracks.map(track => {
    const page = route(mentorshipPath(track.slug), `${track.title}: Learning Path`,
      `Explore ${track.title} with related study notes, original source recordings, preparation guidance and review coverage.`,
      renderToStaticMarkup(createElement(MentorshipsView, { slug:track.slug, embedded:true })));
    page.heading = track.title;
    page.schemaJson = { '@type':'CollectionPage', name:track.title, about:track.focus, isAccessibleForFree:true, dateModified:'2026-10-19' };
    return page;
  }));
  for (const r of routes) {
    const old = new URL(r.canonical).pathname;
    if (canonicalAliases[old]) {
      r.canonical = r.url = `https://learnsmc.xyz${canonicalAliases[old]}`;
      r.outputPath = `${canonicalAliases[old].slice(1)}index.html`;
    }
  }
  routes.push(...topicClusters.map(cluster => route(`/curriculum/${cluster.slug}/`, cluster.part,
    `Study ${cluster.chapters.length} lessons in ${cluster.part.replace(/^Part [IVXLCDM]+ - /, '')}, with definitions, worked explanations and practice questions.`,
    (cluster.guidance.length ? section('How to use this learning path', cluster.guidance.map(p => `<p>${escape(p)}</p>`).join('')) : '') +
    section('Learning path', list(cluster.chapters.map(c => link(`/learn/${c.slug}/`, c.title)))) +
    cluster.chapters.map(c => section(c.title, renderToStaticMarkup(createElement(ChapterDiagram, { chapterId:c.id, thumbnail:true, staticOnly:true })) + `<p>${escape(c.summary[0])}</p>` + list(c.summary.slice(1).map(escape)) + link(`/learn/${c.slug}/`, 'Read the complete lesson'))).join(''))));
  routes.push(...masoodPlaylistsData.map(p => route(`/masood/playlists/${p.id}/`, `${p.badge} — Abdullah Masood lectures`,
    `${p.subtitle}. Browse ${p.lectures.length} Abdullah Masood video study guides with notes, exercises and source links.`,
    `<p>${escape(p.description)}</p><p>${escape(p.targetAudience)}</p>` + source +
    section('Before you start', list(p.prerequisites.map(escape))) +
    section('Lecture directory', list(p.lectures.map(l => link(`/masood/lectures/${l.id}/`, l.title)))) +
    p.lectures.map(l => section(l.title, `<p>${escape(l.shortSummary)}</p>` + list(l.keyTakeaways.map(escape)) + link(`/masood/lectures/${l.id}/`, 'Read the study notes'))).join(''))));
  const root = routes.find(r => r.canonical === 'https://learnsmc.xyz/curriculum/')!;
  root.bodyHtml = renderToStaticMarkup(createElement(MentorshipsTeaser)) + root.bodyHtml;
  root.bodyHtml += `<div class="static-diagram-directory">${textbookChapters.map(c => `<a href="/learn/${escape(c.slug)}/">${renderToStaticMarkup(createElement(ChapterDiagram, { chapterId:c.id, thumbnail:true, staticOnly:true }))}</a>`).join('')}</div>`;
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
    r.bodyHtml = renderToStaticMarkup(createElement(MasoodLecturePage,{lecture:lec}));
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

  const home = routes.find(r => r.canonical === 'https://learnsmc.xyz/')!;
  home.bodyHtml += section('What are ICT and Smart Money Concepts?', '<p>ICT stands for Inner Circle Trader, a trading education framework associated with Michael J. Huddleston. Smart Money Concepts is a broader collection of chart-reading terms covering market structure, liquidity, order blocks and price imbalances. LearnSMC explains these ideas as study frameworks. A chart pattern does not establish that a bank placed an order or that a future move is certain.</p>') +
    section('Choose a study path', '<p>Begin with market foundations in the curriculum, then study liquidity and market structure before entry patterns. Read a definition in the glossary, compare similar concepts, and use chart exercises to test whether you can identify the required conditions without looking ahead. The Abdullah Masood directory provides independently written notes and links to the original videos.</p>') +
    section('A practice example', '<p>If price moves above a previous high and returns below it, record it as a possible liquidity sweep. Do not assume that a reversal follows. Write down the timeframe, the prior range, the next structural level and the condition that would invalidate your interpretation. Compare the idea with a case where price continues higher. Use historical charts or a demo account, not money needed for living expenses.</p>') + byline + notice;
  root.bodyHtml += section('How to study a chapter', '<p>Read the definition first, identify its conditions on a historical chart, and record at least one example where the pattern fails. Hide future candles during practice to reduce hindsight bias. Keep observations separate from assumptions about institutional intent. Revisit market foundations whenever a later entry model depends on an unfamiliar term.</p>');
  for (const r of routes.filter(r => r.canonical.includes('/tools/compare/'))) {
    const selected = conceptComparisons.find(c => r.canonical.endsWith('/' + getComparisonSlug(c.id) + '/'));
    const entries = selected ? [selected] : conceptComparisons;
    r.bodyHtml += entries.map(c => section(selected ? 'Definitions and study conditions' : c.title, `<div style="overflow-x:auto"><table><caption>${escape(c.title)}: definitions and study conditions</caption><thead><tr><th scope="col">Feature</th><th scope="col">${escape(c.conceptA.name)}</th><th scope="col">${escape(c.conceptB.name)}</th></tr></thead><tbody><tr><th scope="row">Definition</th><td>${escape(c.conceptA.summary)}</td><td>${escape(c.conceptB.summary)}</td></tr><tr><th scope="row">Study condition</th><td>${escape(c.conceptA.idealCondition)}</td><td>${escape(c.conceptB.idealCondition)}</td></tr></tbody></table></div><p>${escape(c.commonConfusion)}</p>`)).join('');
  }
  const contact = routes.find(r => r.canonical.endsWith('/contact/'))!;
  const contactHtml = `<address><p>${escape(lessonAuthor.name)}</p><p><a href="mailto:${escape(authorContact.email)}">${escape(authorContact.email)}</a></p><p><a href="tel:${escape(authorContact.telephone)}">${escape(authorContact.telephone)}</a></p><p>${escape(authorContact.streetAddress)}, Daska, Pakistan</p></address>`;
  contact.bodyHtml = section('Contact the author and publisher', contactHtml);
  contact.bodyHtml += section('How to report an issue', '<p>For a lesson correction, include the full page URL, the passage in question and any supporting source. For a technical problem, include the URL, browser name and the steps that produced the issue. Do not send account passwords, trading account details or private financial records.</p>') +
    section('Copyright and source inquiries', '<p>If you own material referenced by this site, identify the work and the page where it appears so the publisher can review the request. Video links lead to third-party services; this site does not host those videos.</p>');
  const privacy = routes.find(r => r.canonical.endsWith('/privacy/'))!;
  privacy.bodyHtml += section('Advertising choices', '<p>Optional advertising does not load until you allow it in Privacy choices. You can withdraw that choice using the same control. If advertising is enabled, Google and its partners may use cookies and process device information. Regional consent messages, where required, are provided through the configured advertising consent service.</p><p><a href="https://policies.google.com/technologies/ads">How Google uses advertising information</a>. Embedded videos connect to YouTube only when loaded.</p>');
  const about = routes.find(r => r.canonical.endsWith('/about/'))!;
  about.bodyHtml = `<section id="author"><h2>Author and publisher</h2><p>Muhammad Umer Ijaz writes and maintains the LearnSMC lessons and study notes. LearnSMC is an independent educational project. Linked third-party videos retain their original authorship.</p><ul>${lessonAuthor.sameAs.map((url, index) => `<li><a href="${escape(url)}" rel="me">${index === 0 ? 'GitHub: taizguy' : 'X: @ChiefAnt_'}</a></li>`).join('')}</ul></section>` +
    `<section id="editorial-policy"><h2>Editorial policy</h2>` + '<p>These pages explain trading frameworks for study. Framework claims and simulated examples are not proof of profitable outcomes. Test assumptions independently and check the original video sources. Named expert or peer review is not claimed.</p>' + '</section>' +
    section('Corrections and contact', `<p>${link('/contact/', 'Send a correction, source reference or copyright inquiry')}.</p>`) + notice;
  about.bodyHtml += section('Publisher contact', contactHtml);
  about.bodyHtml += section('How to use LearnSMC', ABOUT_GUIDANCE.map(text => `<p>${escape(text)}</p>`).join(''));
  const terms = routes.find(r => r.canonical.endsWith('/terms/'))!;
  terms.bodyHtml = TERMS_SECTIONS.map(item => section(item.title, `<p>${escape(item.text)}</p>`)).join('');
  contact.bodyHtml += section('How to send a useful inquiry', CONTACT_GUIDANCE.map(text => `<p>${escape(text)}</p>`).join(''));
  about.schemaJson = { '@type': 'AboutPage', name: 'About LearnSMC', mainEntity: lessonAuthor, publisher };
}

export function enrichRoute(r: RouteMeta, routes: RouteMeta[]) {
  const path = new URL(r.canonical).pathname;
  if(path===masterclassHubPath){
    r.title=searchTitle(masterclassHubTitle,path);r.description=masterclassHubDescription;r.heading=masterclassHubH1;r.subheading='Less memorising. More understanding.';
    r.bodyHtml=renderToStaticMarkup(createElement(MasterclassHub));
    const listId=r.canonical+'#lessons';
    r.schemaJson={'@context':'https://schema.org','@graph':[
      publisher,lessonAuthor,{'@type':'WebSite','@id':'https://learnsmc.xyz/#website',name:'LearnSMC',url:'https://learnsmc.xyz/'},
      {'@type':'CollectionPage','@id':r.canonical,name:masterclassHubH1,description:masterclassHubDescription,url:r.canonical,inLanguage:'en',isAccessibleForFree:true,publisher,mainEntity:{'@id':listId}},
      {'@type':'BreadcrumbList',itemListElement:[['Home','/'],['Workbench & Lab','/tools/'],['Masterclass collection',masterclassHubPath]].map(([name,p],i)=>({'@type':'ListItem',position:i+1,name,item:'https://learnsmc.xyz'+p}))},
      {'@type':'ItemList','@id':listId,name:'Masterclass lesson collection',numberOfItems:masterclassHubLessons.length,itemListElement:masterclassHubLessons.map((lesson,i)=>({'@type':'ListItem',position:i+1,name:lesson.title,url:'https://learnsmc.xyz'+getMasterclassUrl(lesson)}))},
      {'@type':'FAQPage','@id':r.canonical+'#faq',mainEntity:masterclassHubFaqs.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))},
    ]};
    return;
  }
  correctToolDocument(r, path);
  const chapterCount = textbookChapters.length;
  const lectureCount = masoodPlaylistsData.reduce((sum, p) => sum + p.lectures.length, 0);
  const counts = (text: string) => text.replace(/\b57(?=[- ](?:chapter|Chapter|CHAPTER))/g, String(chapterCount)).replace(/\b52(?=[- ](?:Abdullah|lecture|Lecture|LECTURE|Masterclass|masterclass))/g, String(lectureCount));
  r.title = counts(r.title); r.description = counts(r.description); r.bodyHtml = counts(r.bodyHtml);
  r.heading = counts(r.heading); r.subheading = counts(r.subheading);
  if (path === '/') { r.title = 'Learn ICT & Smart Money Concepts | LearnSMC'; r.description = 'Study ICT and Smart Money Concepts with free trading lessons, Abdullah Masood video notes, chart exercises and risk education.'; r.heading='Learn ICT and Smart Money Concepts'; r.bodyHtml=renderToStaticMarkup(createElement(LearningFirstHome)); }
  if (path === '/curriculum/') r.heading = 'ICT and Smart Money Concepts Curriculum';
  r.title = searchTitle(r.title, path);
  r.description = searchDescription(r.description, r.title, path);
  if (/^\/(learn|masood\/lectures)\//.test(path)) r.heading = studyTopics[path] || conciseHeading(r.heading);
  if (path === '/tools/glossary/order-blocks/propulsion-and-reclaimed/') r.heading = 'Propulsion & Reclaimed Blocks: Comparison and Rules';
  if (/^\/tools\/(journal|profile)\//.test(path) || path === '/adsense/') r.isNoindex = true;
  const chapter = textbookChapters.find(c => path === `/learn/${c.slug}/`);
  if (chapter) {
    r.bodyHtml = renderToStaticMarkup(createElement(TopicLearningGuide, { chapterId: chapter.id, staticOnly: true })) + r.bodyHtml;
    const diagramHtml = renderToStaticMarkup(createElement(ChapterDiagram, { chapterId:chapter.id, staticOnly:true }));
    r.bodyHtml = chapter.id === 13 ? r.bodyHtml + diagramHtml : diagramHtml + r.bodyHtml;
    r.bodyHtml += renderToStaticMarkup(createElement(ChapterQuiz, { chapter, staticOnly:true }));
    r.bodyHtml += renderToStaticMarkup(createElement(CurriculumReview, { chapter }));
    r.bodyHtml += byline + section('Continue learning', list(relatedChapters(chapter.id).map(c => link(`/learn/${c.slug}/`, c.title)))) +
      link(`/curriculum/${topicClusters.find(c => c.part === chapter.part)!.slug}/`, `Explore ${chapter.part}`);
    r.schemaJson = { ...r.schemaJson, '@type': 'LearningResource', author: lessonAuthor, publisher,
      url: r.canonical, inLanguage: 'en', isAccessibleForFree: true, dateModified: chapterReviewRevision(chapter.id).iso,
      citation: curriculumReview(chapter).sources.map(source => ({ '@type': 'CreativeWork', name: source.title, url: source.url })) };
  }
  const children = routes.filter(c => c !== r && new URL(c.canonical).pathname.startsWith(path) &&
    !routes.some(mid => mid !== r && mid !== c && new URL(mid.canonical).pathname.startsWith(path) && new URL(c.canonical).pathname.startsWith(new URL(mid.canonical).pathname)));
  if (children.length && path !== '/') r.bodyHtml += section('Explore this topic', list(children.map(c => link(new URL(c.canonical).pathname, c.heading))));
  const guide = toolStudyGuide(path);
  if (guide && !r.bodyHtml.includes(`<h2>${escape(guide.title)}</h2>`)) r.bodyHtml += section(guide.title, guide.paragraphs.map(p => `<p>${escape(p)}</p>`).join(''));
  if (path.startsWith('/tools/')) {
    r.bodyHtml += renderToStaticMarkup(createElement(ReviewedModelSource, { modelId: path }));
    const review = reviewedModelSources(path);
    if (review) r.schemaJson = { ...r.schemaJson, dateModified: curriculumReviewDate,
      citation: review.sources.map(source => ({ '@type': 'CreativeWork', name: source.title, url: source.url })) };
  }
  if (/^\/(learn|masood|tools)\//.test(path) && !r.isNoindex) r.bodyHtml += notice;
  const focusKind = (Object.keys(focusPaths) as SearchFocusKind[]).find(key => focusPaths[key] === path);
  if (focusKind) {
    r.bodyHtml = renderToStaticMarkup(createElement(SearchFocusGuide, { kind: focusKind })) + r.bodyHtml;
    if (r.schemaJson) r.schemaJson = { ...r.schemaJson, dateModified: searchFocusRevision.iso };
  }
  const parentRoutes = routes.filter(c => c !== r && c.canonical !== 'https://learnsmc.xyz/' &&
    path.startsWith(new URL(c.canonical).pathname)).sort((a, b) => a.canonical.length - b.canonical.length);
  const crumbs = chapter ? lessonBreadcrumbs(chapter).map(crumb => ({ name: crumb.name, url: `https://learnsmc.xyz${crumb.path}` })) : [{ name: 'Home', url: 'https://learnsmc.xyz/' },
    ...parentRoutes.map(p => ({ name: new URL(p.canonical).pathname===masterclassHubPath?`Masterclass hub: ${masterclassHubLessons.length} lessons`:p.heading, url: p.canonical })),
    ...(path === '/' ? [] : [{ name: r.heading, url: r.canonical }])];
  if (path !== '/') r.bodyHtml = `<nav aria-label="Breadcrumb">${crumbs.map(c => link(new URL(c.url).pathname, c.name)).join(' / ')}</nav>` + r.bodyHtml;
  if (['/', '/curriculum/', '/about/', '/contact/'].includes(path) || path.startsWith('/tools/compare/')) {
    const revision = path === '/about/' ? authorProfileRevision : focusKind ? { iso: searchFocusRevision.iso, label: searchFocusRevision.iso } : path === '/curriculum/' || path === '/' ? chapterIllustrationRevision : publisherPageRevision;
    r.bodyHtml += `<p>Page updated: <time datetime="${revision.iso}">${revision.label}</time>. ` + link('/about/#editorial-policy', 'Editorial policy') + '</p>';
    if (r.schemaJson) r.schemaJson = { ...r.schemaJson, dateModified: revision.iso };
  }
  if (r.bodyHtml.includes('data-chapter-diagram=')) r.schemaJson = {
    ...(r.schemaJson || { '@type': children.length ? 'CollectionPage' : 'WebPage', name:r.heading, description:r.description, url:r.canonical, publisher }),
    dateModified: chapterIllustrationRevision.iso,
  };
  if (focusKind) r.schemaJson = {
    ...(r.schemaJson || { '@type': 'CollectionPage', name:r.heading, description:r.description, url:r.canonical, publisher }),
    dateModified: searchFocusRevision.iso,
  };
  if (path === '/curriculum/') r.bodyHtml += renderToStaticMarkup(createElement(TopicJourneyLinks));
  const cornerstoneGlossary = cornerstoneGlossaryRoutes.find(item => item.path === path);
  const glossaryTopic = path === '/tools/glossary/imbalances/fair-value-gap/' ? 'fair_value_gap' : path === '/tools/glossary/order-blocks/order-block/' ? 'order_block' : cornerstoneGlossary?.conceptId;
  if (glossaryTopic) {
    r.bodyHtml += renderToStaticMarkup(createElement(GlossaryTopicLink, {conceptId:glossaryTopic}));
    const sourceChapter = textbookChapters.find(c=>c.id===(cornerstoneGlossary?.chapterId ?? (glossaryTopic==='fair_value_gap' ? 13 : 15)))!;
    r.schemaJson = { ...r.schemaJson, citation: curriculumReview(sourceChapter).sources.map(source=>({'@type':'CreativeWork',name:source.title,url:source.url})) };
  }
  if (topicJourneys.some(journey => journey.path === path) || glossaryTopic || ['/resources/ict-smc-cheat-sheet/','/articles/pd-arrays-fvg-order-blocks-and-inversions/','/articles/liquidity-is-not-a-magnet/'].includes(path)) {
    r.schemaJson = { ...r.schemaJson, dateModified: topicJourneyRevision };
  }
  if (path.startsWith('/tools/chartlab/')) r.schemaJson = { ...r.schemaJson, dateModified: guidedChartRevision };
  if (cornerstoneGlossary) r.schemaJson = { ...r.schemaJson, dateModified: cornerstoneRevision };
  // The chapter review includes its copy, diagrams and quizzes; older shared-widget
  // revisions must not overwrite the chapter's actual editorial revision.
  if (chapter) r.schemaJson = { ...r.schemaJson, dateModified: chapterReviewRevision(chapter.id).iso };
  const faqs = chapter ? deliverySupport[chapter.id]?.faqs : undefined;
  if (faqs) r.schemaJson = { ...r.schemaJson, '@id': r.canonical, hasPart: { '@id': `${r.canonical}#faq` } };
  r.schemaJson = { '@context': 'https://schema.org', '@graph': [publisher, lessonAuthor,
    ...(chapter?.id===49?[{'@type':'Article','@id':`${r.canonical}#article`,headline:chapter.title,url:r.canonical,inLanguage:'en',image:'https://learnsmc.xyz/images/lessons/market-alchemy/ict-may14-overshoot-source.jpg',author:lessonAuthor,publisher,datePublished:alchemyDates.published.iso,dateModified:alchemyDates.updated.iso,mainEntityOfPage:{'@id':r.canonical}}]:[]),
    ...(faqs ? [{ '@type': 'FAQPage', '@id': `${r.canonical}#faq`, url: `${r.canonical}#delivery-faq`, inLanguage: 'en', isPartOf: { '@id': r.canonical }, mainEntity: faqs.map((item, i) => ({ '@type': 'Question', '@id': `${r.canonical}#question-${i + 1}`, name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }] : []),
    { '@type': 'WebSite', '@id': 'https://learnsmc.xyz/#website', name: 'LearnSMC', url: 'https://learnsmc.xyz/' },
    { '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) },
    r.schemaJson || { '@type': children.length ? 'CollectionPage' : 'WebPage', name: r.heading, description: r.description, url: r.canonical, publisher, ...(['/', '/curriculum/', '/about/', '/contact/'].includes(path) || path.startsWith('/tools/compare/') ? { dateModified: publisherPageRevision.iso } : {}) },
  ] };
  if (auditedReadingRoute(path)) r.bodyHtml = renderToStaticMarkup(createElement(AuditedRouteBody,{pathname:path,heading:r.heading}));

}
