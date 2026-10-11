import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, X, ChevronRight } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenPrivacyPolicy: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPrivacyPolicy
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [advertisingConsent, setAdvertisingConsent] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('learnsmc_cookie_consent');
      if (!stored) {
        // Small delay so it doesn't flash immediately on first paint
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage security errors in sandbox
    }
  }, []);

  const saveConsent = (status: 'all' | 'essential' | 'custom') => {
    try {
      localStorage.setItem('learnsmc_cookie_consent', JSON.stringify({
        status,
        timestamp: new Date().toISOString(),
        analytics: status === 'all' ? true : status === 'custom' ? analyticsConsent : false,
        advertising: status === 'all' ? true : status === 'custom' ? advertisingConsent : false
      }));
    } catch {
      // LocalStorage access failure safe handling
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <aside 
      aria-label="Cookie and Privacy Consent"
      role="region"
      className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-5 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto bg-[#11141B]/95 backdrop-blur-md border border-white/[0.12] rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80 pointer-events-auto animate-slide-up">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#55E6D1]/10 border border-[#55E6D1]/20 flex items-center justify-center text-[#55E6D1] shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-2">
                Privacy &amp; Cookie Consent
                <span className="text-[10px] font-mono text-[#5865FF] bg-[#5865FF]/10 px-1.5 py-0.5 rounded border border-[#5865FF]/20">
                  GDPR / UK / AdSense Compliant
                </span>
              </h3>
              <p className="text-xs text-[#9BA1AE] leading-relaxed max-w-2xl">
                We use cookies and browser storage to optimize textbook study progress, retain your personal notes, and deliver relevant educational content via Google AdSense. You have full control over your preferences.
              </p>

              {showCustomize && (
                <div className="mt-3 pt-3 border-t border-white/[0.08] space-y-2 text-xs">
                  <label className="flex items-center justify-between text-white/90 cursor-pointer">
                    <span>Essential Functional Cookies (Required for progress &amp; study state)</span>
                    <input type="checkbox" checked disabled className="accent-[#5865FF]" />
                  </label>
                  <label className="flex items-center justify-between text-white/90 cursor-pointer">
                    <span>Analytics &amp; Performance Cookies (Anonymous site measurement)</span>
                    <input 
                      type="checkbox" 
                      checked={analyticsConsent} 
                      onChange={(e) => setAnalyticsConsent(e.target.checked)} 
                      className="accent-[#5865FF]" 
                    />
                  </label>
                  <label className="flex items-center justify-between text-white/90 cursor-pointer">
                    <span>Advertising &amp; Google Partner Cookies (Personalized AdSense ads)</span>
                    <input 
                      type="checkbox" 
                      checked={advertisingConsent} 
                      onChange={(e) => setAdvertisingConsent(e.target.checked)} 
                      className="accent-[#5865FF]" 
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => saveConsent('essential')}
            className="text-[#656B78] hover:text-white p-1 rounded transition-colors shrink-0"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={onOpenPrivacyPolicy}
            className="text-[#55E6D1] hover:underline flex items-center gap-1 font-mono text-[11px]"
          >
            <Lock className="w-3 h-3" />
            <span>Read Full Privacy &amp; Cookie Policy</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <div className="flex items-center gap-2 flex-wrap ml-auto">
            {!showCustomize ? (
              <button
                onClick={() => setShowCustomize(true)}
                className="px-3 py-1.5 rounded-lg border border-white/[0.1] text-[#9BA1AE] hover:text-white hover:bg-white/[0.04] font-mono text-[11px] transition-colors"
              >
                Customize
              </button>
            ) : (
              <button
                onClick={() => saveConsent('custom')}
                className="px-3 py-1.5 rounded-lg border border-white/[0.1] text-[#9BA1AE] hover:text-white hover:bg-white/[0.04] font-mono text-[11px] transition-colors"
              >
                Save Preferences
              </button>
            )}

            <button
              onClick={() => saveConsent('essential')}
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white font-mono text-[11px] transition-colors"
            >
              Essential Only
            </button>

            <button
              onClick={() => saveConsent('all')}
              className="px-4 py-1.5 rounded-lg bg-[#5865FF] hover:bg-[#6F7BFF] text-white font-mono font-medium text-[11px] transition-colors shadow-sm"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
