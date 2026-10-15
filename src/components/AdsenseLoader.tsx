import { useEffect } from 'react';
import { advertisingAllowed, CONSENT_EVENT } from '../utils/consent';

/** Auto ads use a fresh document on navigation. Never refresh existing AdSense units. */
export function AdsenseLoader() {
  useEffect(() => {
    const eligible = /^\/(?:$|curriculum\/$|learn\/|masood\/(?:$|lectures\/|playlists\/)|tools\/(?:glossary\/|masterclass\/))/.test(location.pathname)
      && !document.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex');
    const sync = () => {
      const existing = document.getElementById('learnsmc-adsense');
      if (!advertisingAllowed()) {
        if (existing) location.reload();
        return;
      }
      if (!eligible || existing || import.meta.env.VITE_ADSENSE_ENABLED !== 'true') return;
      const script = document.createElement('script');
      script.id = 'learnsmc-adsense';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6985025314302607';
      document.head.appendChild(script);
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return null;
}
