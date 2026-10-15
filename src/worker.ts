import { chapterCatalog } from './data/catalog.generated';

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
    const legacy = url.searchParams.get('chapter') || url.pathname.match(/^\/chapter[-/]([^/]+)\/?$/)?.[1] || url.pathname.match(/^\/learn\/(\d+)\/?$/)?.[1];
    if (legacy) {
      const chapter = chapterCatalog.find(c => String(c.id) === legacy || c.slug === legacy.toLowerCase());
      if (chapter) {
        url.pathname = `/learn/${chapter.slug}/`; url.search = '';
        return Response.redirect(url.href, 301);
      }
      const page = await env.ASSETS.fetch(new Request(new URL('/404.html', url), request));
      const headers = new Headers(page.headers); headers.set('X-Robots-Tag', 'noindex');
      return new Response(request.method === 'HEAD' ? null : page.body, { status: 404, headers });
    }
    if (url.pathname !== original) return Response.redirect(url.href, 301);
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;
    const headers = new Headers(response.headers); headers.set('X-Robots-Tag', 'noindex');
    return new Response(response.body, { status: 404, headers });
  },
};
