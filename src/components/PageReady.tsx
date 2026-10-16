import { useLayoutEffect } from 'react';

/** Commit inside the route's Suspense boundary, after its actual view has loaded. */
export function PageReady() {
  useLayoutEffect(() => {
    document.documentElement.dataset.appStartup = 'ready';
    window.dispatchEvent(new Event('learnsmc:page-ready'));
  }, []);
  return null;
}
