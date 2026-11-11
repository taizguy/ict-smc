import { withoutLocale } from './locale';
import type { TranslationCatalog } from './translate';
import fallbackParts from './runtime/chapter-fallback-parts.json';
const lessonCatalogs = import.meta.glob<{default:TranslationCatalog}>('./runtime/lessons/*.json');

export async function loadUrduCatalog(pathname: string): Promise<TranslationCatalog> {
  const path = withoutLocale(pathname);
  const shared = await import('./runtime/shared.json');
  const slug=path.match(/^\/learn\/([^/]+)\/$/)?.[1];
  const loadLesson=slug&&lessonCatalogs[`./runtime/lessons/${slug}.json`];
  if(loadLesson) {
    const [common,lesson]=await Promise.all([import('./runtime/chapter-common.json'),loadLesson()]);
    const overrides=slug==='mitigation-and-rejection-blocks'?(await import('./runtime/mitigation-overrides.json')).default:{};
    return {...shared.default,...common.default,...lesson.default,...overrides};
  }
  const section = path.startsWith('/curriculum/') || path.startsWith('/learn/') ? await import('./runtime/chapters.json')
    : path.startsWith('/masood/') ? await import('./runtime/masood.json')
    : path.startsWith('/articles/') ? await import('./runtime/articles.json')
    : path.startsWith('/tools/') ? await import('./runtime/tools.json')
    : /^\/(?:about|privacy|terms|contact|disclaimer|adsense)\//.test(path) ? await import('./runtime/publisher.json')
    : { default: {} };
  const needsChapterFallback=path.startsWith('/curriculum/')||path.startsWith('/learn/');
  const common=needsChapterFallback?await import('./runtime/chapter-common.json'):{default:{}};
  const reused=needsChapterFallback?await Promise.all(fallbackParts.map(slug=>lessonCatalogs[`./runtime/lessons/${slug}.json`]!())):[];
  return { ...shared.default,...common.default, ...section.default,...Object.assign({},...reused.map(part=>part.default)) };
}
