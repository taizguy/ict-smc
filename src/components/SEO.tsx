import React, { useEffect } from 'react';
import { searchTitle, searchDescription } from '../utils/searchMetadata';
import { normalizeCanonicalUrl } from '../utils/url';

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  path?: string;
  type?: 'website' | 'article';
  schema?: Record<string, any>;
  exactMetadata?: boolean;
  image?: {url:string;alt:string};
  breadcrumbs?: Array<{ name: string; path: string }>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  path: explicitPath,
  type = 'website',
  schema,
  breadcrumbs,
  exactMetadata = false,
  image,
}) => {
  useEffect(() => {
    if (document.querySelector('meta[name="learnsmc-prerendered"]')) return;
    // 1. Resolve canonical URL
    const targetPath = canonicalPath || explicitPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const canonicalUrl = normalizeCanonicalUrl(targetPath);

    // 2. Document Title
    const pageTitle = exactMetadata ? title : searchTitle(title, new URL(canonicalUrl).pathname);
    const pageDescription = exactMetadata ? description : searchDescription(description, pageTitle, new URL(canonicalUrl).pathname);
    document.title = pageTitle;

    // Helper to set or update meta tag by name or property
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let tag = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 3. Standard Description & OpenGraph Tags
    setMetaTag('name', 'description', pageDescription);
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'LearnSMC');

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@ChiefAnt_');
    setMetaTag('name', 'twitter:creator', '@ChiefAnt_');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', pageDescription);
    if(image){
      setMetaTag('property','og:image',image.url);
      setMetaTag('property','og:image:alt',image.alt);
      setMetaTag('name','twitter:image',image.url);
      setMetaTag('name','twitter:image:alt',image.alt);
    }

    // 5. Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 6. Structured Data (Schema.org JSON-LD)
    const scriptId = 'tool-route-schema-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup on component unmount
    };
  }, [title, description, canonicalPath, explicitPath, type, schema, breadcrumbs, exactMetadata, image]);

  return null;
};

export default SEO;
