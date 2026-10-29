import { Header } from './Header';
import { SiteFooter } from './SiteFooter';
import { TradingToolsWorkbench } from './TradingToolsWorkbench';
import { MasoodLecturePage } from './MasoodLecturePage';
import { masoodPlaylistsData } from '../data/masoodData';
import { auditedReadingRoute } from '../utils/auditedReadingRoutes';
import { withoutLocale } from '../i18n/locale';

/** Same route views, initial props and document geometry as App; no hand-written substitute. */
export function AuditedRouteBody({ pathname, heading }: { pathname: string; heading?: string }) {
  const path = withoutLocale(pathname), kind = auditedReadingRoute(path);
  if (kind === 'chartlab') return <TradingToolsWorkbench documentPath={path} documentHeading={heading} initialTool="chartlab" chartScenarioSlug={path.split('/')[3]} />;
  if (kind === 'fvg-glossary') return <TradingToolsWorkbench documentPath={path} documentHeading={heading} initialTool="concepts" glossaryCategory="imbalances" glossaryConceptId="fair_value_gap" />;
  if (kind === 'ote') return <TradingToolsWorkbench documentPath={path} documentHeading={heading} initialTool="ict_suite" deliveryModuleSlug="ote-calculator" />;
  if (kind === 'masood') {
    const id = path.split('/')[3];
    const lecture = masoodPlaylistsData.flatMap(series => series.lectures).find(item => item.id === id);
    if (lecture) return <MasoodLecturePage lecture={lecture} />;
  }
  throw new Error(`No verified reading view for ${path}`);
}

export function AuditedRouteDocument({ pathname, heading }: { pathname: string; heading?: string }) {
  return <div className="min-h-screen bg-canvas text-ink flex flex-col font-sans selection:bg-brand selection:text-on-brand relative overflow-x-clip">
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <div className="site-wash fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
    <Header documentPath={pathname} activeTab={auditedReadingRoute(pathname) === 'masood' ? 'masood' : 'tools'} setActiveTab={() => {}} onOpenSearch={() => {}} onOpenMentorSpotlight={() => {}} onOpenWelcomeIntro={() => {}} progressPercent={0} />
    <main id="main-content" tabIndex={-1} className="flex-1 max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 space-y-10 sm:space-y-14"><AuditedRouteBody pathname={pathname} heading={heading} /></main>
    <SiteFooter playground={false} />
  </div>;
}
