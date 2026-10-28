import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';
import './styles/study-workbench.css';
import './styles/urdu.css';
import './styles/design-details.css';
import { TranslationProvider } from './i18n/TranslationProvider';
import { localeFromPath } from './i18n/locale';
import { URDU_PUBLISHED } from './i18n/release';
import { auditedReadingRoute } from './utils/auditedReadingRoutes';

// Review builds only; publication waits for the complete Urdu catalog.
const languagePreview = !URDU_PUBLISHED && import.meta.env.VITE_URDU_PREVIEW === 'true';
const locale = languagePreview || URDU_PUBLISHED ? localeFromPath(window.location.pathname) : 'en';
document.documentElement.lang = locale;
document.documentElement.dir = locale === 'ur' ? 'rtl' : 'ltr';
const catalog = locale === 'ur' ? await (await import('./i18n/loadCatalog')).loadUrduCatalog(window.location.pathname) : undefined;

const container = document.getElementById('root')!;
// Preserve the original document for script/network failures; no-JS visitors use it directly.
const readingHtml = container.innerHTML;
const progressive = document.documentElement.dataset.readingEnhancement === 'true' && !!auditedReadingRoute(window.location.pathname) && !!readingHtml.trim();
if (document.documentElement.dataset.appStartup !== 'fallback' || progressive) {
  // Verified routes retain their real reading DOM until the complete view commits.
  // This is a staged createRoot enhancement, not hydration of a different tree.
  const mount = progressive ? document.createElement('div') : container;
  if (progressive) {
    mount.id = 'app-enhancement';
    mount.setAttribute('aria-hidden', 'true');
    mount.inert = true;
    Object.assign(mount.style, {position:'absolute',top:'0',left:'-200vw',width:'100%',visibility:'hidden',pointerEvents:'none'});
    container.after(mount);
  }
  const appRoot = createRoot(mount);
  const restoreReadingView = () => {
    appRoot.unmount();
    if (progressive) mount.remove(); else container.innerHTML = readingHtml;
    window.removeEventListener('learnsmc:page-ready', finishStartup);
  };
  const finishStartup = () => {
    window.removeEventListener('learnsmc:startup-timeout', restoreReadingView);
    if (progressive) {
      // Promote the mounted container itself so React's event delegation stays intact.
      const focused = document.activeElement;
      const href = focused instanceof HTMLAnchorElement ? focused.getAttribute('href') : null;
      mount.removeAttribute('style'); mount.removeAttribute('aria-hidden'); mount.inert = false;
      container.replaceWith(mount); mount.id = 'root';
      if (href) Array.from(mount.querySelectorAll<HTMLAnchorElement>('a[href]')).find(link => link.getAttribute('href') === href)?.focus({preventScroll:true});
    }
  };
  // A slow enhancement may still finish later: the original reading view never left.
  if (!progressive) window.addEventListener('learnsmc:startup-timeout', restoreReadingView, { once: true });
  window.addEventListener('learnsmc:page-ready', finishStartup, { once: true });
  appRoot.render(
    <StrictMode>
      <TranslationProvider locale={locale} catalog={catalog} preview={languagePreview}>
        <ErrorBoundary><App /></ErrorBoundary>
      </TranslationProvider>
    </StrictMode>,
  );
}

import './styles/playground.css';
import './styles/search-focus.css';

import './styles/interface-polish.css';

import './styles/learning-first.css';
import './styles/workbench-hallmark/page.css';

import './styles/home-playground.css';
import './styles/reading-room.css';
import './styles/delivery-lesson.css';
import './styles/mentorship2025.css';
import './styles/mentorship2026.css';
import './styles/mentorship2026-alchemy.css';

import './styles/masterclass-hub.css';
