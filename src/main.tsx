import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';
import './styles/urdu.css';
import './styles/design-details.css';
import { TranslationProvider } from './i18n/TranslationProvider';
import { localeFromPath } from './i18n/locale';
import { URDU_PUBLISHED } from './i18n/release';

// Review builds only; publication waits for the complete Urdu catalog.
const languagePreview = !URDU_PUBLISHED && import.meta.env.VITE_URDU_PREVIEW === 'true';
const locale = languagePreview || URDU_PUBLISHED ? localeFromPath(window.location.pathname) : 'en';
document.documentElement.lang = locale;
document.documentElement.dir = locale === 'ur' ? 'rtl' : 'ltr';
const catalog = locale === 'ur' ? await (await import('./i18n/loadCatalog')).loadUrduCatalog(window.location.pathname) : undefined;

const container = document.getElementById('root')!;
// Preserve the original document for script/network failures; no-JS visitors use it directly.
const readingHtml = container.innerHTML;
if (document.documentElement.dataset.appStartup !== 'fallback') {
  const appRoot = createRoot(container);
  const restoreReadingView = () => {
    appRoot.unmount();
    container.innerHTML = readingHtml;
    window.removeEventListener('learnsmc:page-ready', finishStartup);
  };
  const finishStartup = () => {
    window.removeEventListener('learnsmc:startup-timeout', restoreReadingView);
  };
  window.addEventListener('learnsmc:startup-timeout', restoreReadingView, { once: true });
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
