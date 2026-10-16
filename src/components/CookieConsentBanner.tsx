import { useState } from 'react';
import { advertisingAllowed, CONSENT_KEY, CONSENT_EVENT } from '../utils/consent';
export function CookieConsentBanner({ onOpenPrivacyPolicy }: { onOpenPrivacyPolicy: () => void }) {
  const [isOpen, setIsOpen] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null')?.version !== 2; }
    catch { return true; }
  });
  const save = (advertising: boolean) => {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 2, advertising, timestamp: new Date().toISOString() })); }
    catch { return; }
    setIsOpen(false);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };
  return <>
    <button className="underline text-sm p-3 relative z-10" onClick={() => setIsOpen(true)}>Privacy choices</button>
    {isOpen && <aside aria-label="Privacy choices" className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-3xl mx-auto bg-surface border border-ink/20 rounded-xl p-5 shadow-xl space-y-4 text-sm">
        <h2 className="font-semibold">Your privacy choices</h2>
        <p>Study progress and notes are saved in your browser. Advertising is optional. Allowing advertising loads Google AdSense, which may use cookies and process device information. You can change your choice here at any time.</p>
        <p><button className="underline" onClick={onOpenPrivacyPolicy}>Read our privacy and cookie policy</button></p>
        <div className="flex flex-wrap gap-3">
          <button className="btn-predikt-secondary" onClick={() => save(false)}>Continue without advertising</button>
          <button className="btn-predikt-secondary" onClick={() => save(true)}>Allow advertising</button>
        </div>
      </div>
    </aside>}
  </>;
}
