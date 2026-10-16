import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

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
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
