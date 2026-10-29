import { retiredGraphTarget } from './utils/knowledgeGraphRoutes';
import { chapterCatalog } from './data/catalog.generated';
import { localeFromPath, localizedHref, withoutLocale } from './i18n/locale';
import { URDU_PUBLISHED } from './i18n/release';
import { mentorshipTracks } from './data/mentorshipTracks';

interface Env { ASSETS: { fetch: (request: Request) => Promise<Response> } }

/** Normalize documents at the edge; static assets and missing pages retain their real statuses. */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname === 'www.learnsmc.xyz' || (url.hostname === 'learnsmc.xyz' && url.protocol !== 'https:')) {
      url.hostname = 'learnsmc.xyz'; url.protocol = 'https:';
      return Response.redirect(url.href, 301);
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') return env.ASSETS.fetch(request);
    const original = url.pathname;
    const documentPath = !/\.[a-z0-9]{2,5}$/i.test(original);
    if (documentPath) url.pathname = original.replace(/\/{2,}/g, '/').toLowerCase();
    const locale = URDU_PUBLISHED ? localeFromPath(url.pathname) : 'en';
    const routePath = locale === 'ur' ? withoutLocale(url.pathname) : url.pathname;
    // The configured asset handler otherwise emits a temporary 307 for this path.
    if (routePath === '/curriculum') {
      url.pathname = localizedHref('/curriculum/', locale);
      return Response.redirect(url.href, 301);
    }
    const graphTarget = retiredGraphTarget(routePath);
    if (graphTarget) {
      url.pathname = localizedHref(graphTarget, locale); url.search = '';
      return Response.redirect(url.href, 301);
    }
    const legacy = url.searchParams.get('chapter') || routePath.match(/^\/chapter[-/]([^/]+)\/?$/)?.[1] || routePath.match(/^\/learn\/(\d+)\/?$/)?.[1];
    if (legacy) {
      const chapter = chapterCatalog.find(c => String(c.id) === legacy || c.slug === legacy.toLowerCase());
      if (chapter) {
        url.pathname = localizedHref(`/learn/${chapter.slug}/`, locale); url.search = '';
        return Response.redirect(url.href, 301);
      }
      const page = await env.ASSETS.fetch(new Request(new URL(locale === 'ur' ? '/ur/404.html' : '/404.html', url), request));
      const headers = new Headers(page.headers); headers.set('X-Robots-Tag', 'noindex');
      return new Response(request.method === 'HEAD' ? null : page.body, { status: 404, headers });
    }
    // Mentorship is a reading preference. Redirect old query links to fragment
    // state so language alternates refer only to canonical lesson documents.
    const mentorship = url.searchParams.get('mentorship');
    const lessonSlug = routePath.match(/^\/learn\/([^/]+)\/?$/)?.[1];
    const lesson = lessonSlug && chapterCatalog.find(c => c.slug === lessonSlug);
    if (mentorship && lesson && mentorshipTracks.some(t => t.slug === mentorship && t.chapterIds.includes(lesson.id))) {
      url.pathname = localizedHref(`/learn/${lesson.slug}/`, locale);
      url.searchParams.delete('mentorship');
      url.hash = `mentorship=${encodeURIComponent(mentorship)}`;
      return Response.redirect(url.href, 301);
    }
    if (url.pathname !== original) return Response.redirect(url.href, 301);
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) {
      if (!response.headers.get('Content-Type')?.includes('text/html')) return response;
      const headers = new Headers(response.headers); headers.set('Content-Language', locale);
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    if (locale === 'ur') {
      const page = await env.ASSETS.fetch(new Request(new URL('/ur/404.html', url), request));
      const headers = new Headers(page.headers); headers.set('X-Robots-Tag', 'noindex'); headers.set('Content-Language', 'ur');
      return new Response(request.method === 'HEAD' ? null : page.body, { status: 404, headers });
    }
    const headers = new Headers(response.headers); headers.set('X-Robots-Tag', 'noindex');
    return new Response(response.body, { status: 404, headers });
  },
};
