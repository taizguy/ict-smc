import { parse, parseFragment, serialize, defaultTreeAdapter, html, type DefaultTreeAdapterTypes as HTML } from 'parse5';
import { languageAlternates, localizedHref, SITE_ORIGIN } from '../src/i18n/locale';
import { t, type TranslationCatalog } from '../src/i18n/translate';
import { contextualFragments } from '../src/utils/contextualLinks';

const textAttributes = new Set(['title', 'alt', 'aria-label', 'aria-description', 'placeholder']);
const schemaTextKeys = new Set(['name', 'headline', 'description', 'text', 'articleSection', 'alternativeHeadline', 'about', 'educationalLevel', 'learningResourceType']);
const documentTypes = new Set(['WebPage', 'Article', 'BlogPosting', 'LearningResource', 'CollectionPage', 'DigitalDocument', 'WebApplication', 'ItemPage', 'DefinedTermSet', 'AboutPage', 'ContactPage', 'FAQPage']);
const escaped = (text: string) => text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!));
const textContent = (node: HTML.Node): string => node.nodeName === '#text' ? (node as HTML.TextNode).value : 'childNodes' in node ? node.childNodes.map(textContent).join('') : '';
const switcher = (pathname: string, locale: 'en' | 'ur') => `<nav data-language-switcher class="language-switcher" aria-label="${locale === 'ur' ? 'زبان منتخب کریں' : 'Choose language'}" dir="ltr"><a href="${localizedHref(pathname, 'en')}" hreflang="en" lang="en" translate="no"${locale === 'en' ? ' aria-current="page"' : ''}>English</a><a href="${localizedHref(pathname, 'ur')}" hreflang="ur" lang="ur" translate="no"${locale === 'ur' ? ' aria-current="page"' : ''}>اردو</a></nav>`;
const attribute = (node: HTML.Element, name: string) => node.attrs.find(a => a.name === name)?.value;
const set = (node: HTML.Element, name: string, value: string) => {
  const existing = node.attrs.find(a => a.name === name);
  if (existing) existing.value = value; else node.attrs.push({ name, value });
};

/** Parse real HTML rather than replacing strings inside scripts, JSON, IDs or attributes. */
export function localizeHtml(source: string, pathname: string, catalog: TranslationCatalog, options: { preview?: boolean; indexable?: boolean; availablePaths?: ReadonlySet<string>; nativeReadingRoot?: boolean; onMissing?: (text: string) => void } = {}): string {
  const document = parse(source.replace(/<nav\b[^>]*data-language-switcher[^>]*>[\s\S]*?<\/nav>/g, '').replace('</header>', `${switcher(pathname, 'ur')}</header>`));
  const translate = (text: string) => {
    const result = t(text, 'ur', catalog);
    if (result === text && /[a-z]{3}/i.test(text)) options.onMissing?.(text.replace(/\s+/g, ' ').trim());
    return result;
  };
  const localizedPath = localizedHref(pathname, 'ur');
  const deliveryLinkedUrls = new Set<string>();
  const localLink = (href: string) => {
    if (href === '/articles/feed.xml') return '/ur/articles/feed.xml';
    let url: URL;
    try { url = new URL(href, SITE_ORIGIN); } catch { return href; }
    if (url.origin !== SITE_ORIGIN || (options.availablePaths && !options.availablePaths.has(url.pathname))) return href;
    const target = localizedHref(href, 'ur');
    return href.startsWith('https:') && !target.startsWith('https:') ? SITE_ORIGIN + target : target;
  };
  function schema(value: any, key = '', identity = false): any {
    if (Array.isArray(value)) return value.map(v => schema(v, key, identity));
    if (value && typeof value === 'object') {
      const isIdentity = ['Person', 'Organization', 'WebSite'].includes(value['@type']);
      const result = Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === 'inLanguage' && value['@type'] === 'MediaObject' ? v : schema(v, k, isIdentity)]));
      if (documentTypes.has(value['@type'])) result.inLanguage = 'ur';
      if (value['@type'] === 'WebSite') result.inLanguage = ['en', 'ur'];
      return result;
    }
    if (typeof value !== 'string') return value;
    if (key === '@id' && /#(?:organization|website|author|person)$/.test(value)) return value;
    if (key === 'inLanguage') return 'ur';
    if (schemaTextKeys.has(key) && !identity) return translate(value);
    if (!identity && ['url', '@id', 'item', 'mainEntityOfPage'].includes(key) && value.startsWith(SITE_ORIGIN)) return localLink(value);
    return value;
  }
  let head: HTML.Element | undefined;
  function visit(node: HTML.Node, skip = false) {
    // These bodies are replaced by native locale rendering, not translated text nodes.
    // Continue validating the head; discarded English fragments are not missing Urdu.
    if (options.nativeReadingRoot && 'tagName' in node && attribute(node, 'id') === 'root') return;
    if ('tagName' in node) {
      if (node.tagName === 'html') { set(node, 'lang', 'ur'); set(node, 'dir', 'rtl'); }
      if (node.tagName === 'svg' && attribute(node, 'class')?.split(' ').includes('chapter-diagram-canvas')) set(node, 'lang', 'ur');
      if (node.tagName === 'head') {
        head = node;
        node.childNodes = node.childNodes.filter(child => !('tagName' in child && child.tagName === 'link' && attribute(child, 'hreflang')));
      }
      const accentSource = attribute(node, 'data-accent-source');
      if (accentSource) {
        const sentence = translate(accentSource);
        const focus = attribute(node, 'data-accent-focus-ur') || translate(attribute(node, 'data-accent-focus') || '');
        const index = sentence.toLowerCase().indexOf(focus.toLowerCase());
        const tone = ['sage', 'coral', 'violet'].includes(attribute(node, 'data-accent-tone') || '') ? attribute(node, 'data-accent-tone')! : 'sage';
        const markup = index < 0 || !focus ? escaped(sentence) : `${escaped(sentence.slice(0, index))}<span class="ink-accent ink-accent--${tone}">${escaped(sentence.slice(index, index + focus.length))}</span>${escaped(sentence.slice(index + focus.length))}`;
        const replacement = parseFragment(markup);
        node.childNodes = [];
        for (const child of [...replacement.childNodes]) defaultTreeAdapter.appendChild(node, child);
        set(node, 'translate', 'no');
      }
      if (attribute(node, 'data-reading-source')) {
        const translated=translate(attribute(node, 'data-reading-source')!).replace(/^\d+\.\d+\s*/,'');
        node.childNodes=[];
        defaultTreeAdapter.appendChild(node,defaultTreeAdapter.createTextNode(translated));
        set(node,'translate','no');
      }
      if (node.tagName === 'p' && attribute(node, 'data-lesson-content') !== undefined) {
        const translated = translate(textContent(node));
        const isDelivery = attribute(node, 'data-delivery-content') !== undefined;
        const is2025 = /data-mentorship-2025/.test(source);
        const parts = contextualFragments(translated, pathname, is2025 ? 4 : isDelivery ? 3 : 4, isDelivery ? deliveryLinkedUrls : undefined);
        if (isDelivery) parts.forEach(part => { if (part.href) deliveryLinkedUrls.add(part.href); });
        const fragments = parts.map(fragment => fragment.href ? `<a href="${escaped(fragment.href)}">${escaped(fragment.text)}</a>` : escaped(fragment.text)).join('');
        const replacement = parseFragment(fragments);
        node.childNodes = [];
        for (const child of [...replacement.childNodes]) defaultTreeAdapter.appendChild(node, child);
        set(node, 'translate', 'no');
      }
      if (attribute(node, 'translate') === 'no') skip = true;
      for (const attr of node.attrs) if (!skip && textAttributes.has(attr.name)) attr.value = translate(attr.value);
      if (node.tagName === 'a' && attribute(node, 'href') && !attribute(node, 'hreflang')) set(node, 'href', localLink(attribute(node, 'href')!));
      if (node.tagName === 'img' && /^\/images\/articles\/[^/]+\.svg$/.test(attribute(node, 'src') || '')) set(node, 'src', attribute(node, 'src')!.replace(/\.svg$/, '-ur.svg'));
      if (node.tagName === 'link') {
        const rel = attribute(node, 'rel');
        if (rel === 'canonical') set(node, 'href', SITE_ORIGIN + localizedPath);
        if (rel === 'alternate' && attribute(node, 'type') === 'application/rss+xml') set(node, 'href', SITE_ORIGIN + '/ur/articles/feed.xml');
      }
      if (node.tagName === 'meta') {
        const key = attribute(node, 'name') || attribute(node, 'property') || '';
        const content = attribute(node, 'content') || '';
        if (['description', 'og:title', 'og:description', 'og:image:alt', 'twitter:image:alt', 'twitter:title', 'twitter:description', 'learnsmc-heading'].includes(key)) set(node, 'content', translate(content));
        if (key === 'og:url') set(node, 'content', SITE_ORIGIN + localizedPath);
        if (key === 'og:locale') set(node, 'content', 'ur_PK');
        if (key === 'robots' && options.preview) set(node, 'content', 'noindex, follow');
      }
      if (node.tagName === 'script') {
        if (attribute(node, 'type') === 'application/ld+json') {
          const text = node.childNodes.find(child => child.nodeName === '#text') as HTML.TextNode | undefined;
          if (text) text.value = JSON.stringify(schema(JSON.parse(text.value))).replace(/</g, '\\u003c');
        }
        return;
      }
      if (['style', 'pre', 'code'].includes(node.tagName)) return;
    }
    if (node.nodeName === '#text' && !skip) (node as HTML.TextNode).value = translate((node as HTML.TextNode).value);
    if ('childNodes' in node) node.childNodes.forEach(child => visit(child, skip));
  }
  visit(document);
  if (head) defaultTreeAdapter.appendChild(head, defaultTreeAdapter.createElement('link', html.NS.HTML, [
    { name: 'rel', value: 'preload' }, { name: 'as', value: 'font' }, { name: 'type', value: 'font/woff2' },
    { name: 'href', value: '/fonts/noto-naskh-arabic.woff2' }, { name: 'crossorigin', value: '' },
  ]));
  if (head && !options.preview && options.indexable !== false) {
    for (const alternate of languageAlternates(pathname)) {
      const link = defaultTreeAdapter.createElement('link', html.NS.HTML, [
        { name: 'rel', value: 'alternate' }, { name: 'hreflang', value: alternate.language }, { name: 'href', value: alternate.href },
      ]);
      defaultTreeAdapter.appendChild(head, link);
    }
  }
  return serialize(document);
}

/** Include the current language even when an editorial series has no translation yet. */
export function addLanguageAlternates(source: string, pathname: string, indexable = true): string {
  const links = indexable ? languageAlternates(pathname).map(item => `<link rel="alternate" hreflang="${item.language}" href="${item.href}" />`).join('') : '';
  return source.replace(/<link\b[^>]*hreflang="[^"]+"[^>]*>/g, '').replace('</head>', `${links}</head>`);
}

export function addEnglishAlternates(source: string, pathname: string, indexable = true): string {
  return addLanguageAlternates(source, pathname, indexable).replace(/<nav\b[^>]*data-language-switcher[^>]*>[\s\S]*?<\/nav>/g, '').replace('</header>', `${switcher(pathname, 'en')}</header>`);
}
