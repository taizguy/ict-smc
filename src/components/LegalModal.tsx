import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  FileText, 
  Lock, 
  Mail, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  AlertTriangle,
  Scale
} from 'lucide-react';
import { useModalScrollLock } from '../hooks/useSmoothScroll';

export type LegalModalTab = 'disclaimer' | 'privacy' | 'terms' | 'about' | 'adsense';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalModalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'disclaimer'
}) => {
  const [activeTab, setActiveTab] = useState<LegalModalTab>(initialTab);
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);

  useModalScrollLock(isOpen);

  // Sync initial tab when changed externally
  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Handle ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyAdsTxt = () => {
    navigator.clipboard.writeText('google.com, pub-6985025314302607, DIRECT, f08c47fec0942fa0');
    setCopiedAdsTxt(true);
    setTimeout(() => setCopiedAdsTxt(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/35 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      data-lenis-prevent="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-surface border border-ink/[0.12] w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col shadow-2xl shadow-black/90 overflow-hidden relative my-auto"
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/[0.08] bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-ink/[0.05] border border-ink/[0.1] flex items-center justify-center text-teal">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-base sm:text-lg font-bold text-ink tracking-wide flex items-center gap-2">
                Legal Compliance &amp; Disclosure
                <span className="text-[11px] font-mono text-brand bg-brand/10 px-2 py-0.5 rounded border border-brand/30">
                  learnsmc.xyz
                </span>
              </h2>
              <p className="text-xs text-ink-muted mt-0.5">
                Official regulatory notices, publisher information &amp; AdSense disclosures
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-ink/[0.04] hover:bg-ink/[0.1] text-ink-muted hover:text-ink flex items-center justify-center transition-colors"
            aria-label="Close legal modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 py-2 bg-surface border-b border-ink/[0.06] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
              activeTab === 'disclaimer'
                ? 'bg-amber/15 text-amber border border-amber/30 shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-ink/[0.04]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber" />
            <span>Risk Disclaimer</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
              activeTab === 'privacy'
                ? 'bg-teal/15 text-teal border border-teal/30 shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-ink/[0.04]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
              activeTab === 'terms'
                ? 'bg-brand/15 text-violet border border-brand/30 shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-ink/[0.04]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
              activeTab === 'about'
                ? 'bg-ink/10 text-ink border border-ink/20 shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-ink/[0.04]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>About &amp; Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('adsense')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all shrink-0 ml-auto ${
              activeTab === 'adsense'
                ? 'bg-teal/20 text-teal border border-teal/40'
                : 'text-ink-muted hover:text-teal hover:bg-ink/[0.04]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span>ads.txt Status</span>
          </button>
        </div>

        {/* Content Body */}
        <div 
          className="flex-1 min-h-0 modal-scrollable p-6 sm:p-8 space-y-6 text-ink-secondary text-xs sm:text-sm leading-relaxed"
          data-lenis-prevent="true"
        >
          
          {/* TAB 1: FINANCIAL & RISK DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber/10 border border-amber/25 text-amber flex items-start gap-3.5">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm tracking-wide text-ink">
                    CFTC &amp; SEC Regulatory High-Risk Warning
                  </h3>
                  <p className="text-xs text-amber/90 mt-1 leading-relaxed">
                    Trading Foreign Exchange (Forex), Futures, Equities, Commodities, Indices, and Digital Assets carries substantial risk and is not suitable for every investor. You may lose all or more than your initial invested capital.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-ink tracking-wide">
                  1. Strictly Educational and Research Purpose
                </h3>
                <p>
                  All content, curriculum modules, algorithms, trade setups, order block models, Fair Value Gap (FVG) frameworks, liquidity diagrams, market reviews, backtest charts, and simulator tools published on <strong>learnsmc.xyz</strong> are presented exclusively for <strong>educational, informational, and academic research purposes</strong>.
                </p>
                <p>
                  Neither <strong>learnsmc.xyz</strong>, its operators, nor its contributors are registered as an Investment Advisor with the U.S. Securities and Exchange Commission (SEC), a Commodity Trading Advisor (CTA) with the Commodity Futures Trading Commission (CFTC), or equivalent financial regulatory bodies in any jurisdiction.
                </p>

                <h3 className="text-base font-bold text-ink tracking-wide pt-2">
                  2. No Financial, Investment, or Legal Advice
                </h3>
                <p>
                  Nothing contained on this website constitutes a personal recommendation, solicitation, endorsement, or offer to buy or sell any currency pair, contract, derivative, security, or financial instrument. You are solely responsible for your own financial decisions and trading actions. Always consult a qualified, licensed independent financial advisor before executing trades with real money.
                </p>

                <h3 className="text-base font-bold text-ink tracking-wide pt-2">
                  3. Hypothetical &amp; Simulated Performance Disclosure
                </h3>
                <p>
                  The interactive Chart Laboratory, Backtesting Workbench, and Trade Simulator hosted on this platform utilize simulated historical or synthetic price quotes. Simulated results have inherent limitations because they do not reflect actual market execution, liquidity constraints, commissions, slippage, latency, or psychological pressures of live capital risk.
                </p>
                <div className="p-3.5 rounded-lg bg-ink/[0.03] border border-ink/[0.08] text-xs text-ink-secondary italic font-mono">
                  &quot;CFTC RULE 4.41: Hypothetical or simulated performance results have certain inherent limitations. Unlike an actual performance record, simulated results do not represent actual trading. Also, since the trades have not actually been executed, the results may have under- or over-compensated for the impact, if any, of certain market factors, such as lack of liquidity. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.&quot;
                </div>

                <h3 className="text-base font-bold text-ink tracking-wide pt-2">
                  4. Assumption of Risk
                </h3>
                <p>
                  You expressly agree that your use of or reliance upon any material on <strong>learnsmc.xyz</strong> is undertaken at your sole risk. Under no circumstances shall <strong>learnsmc.xyz</strong> or its operators be held liable for any direct, indirect, incidental, punitive, or consequential trading losses or financial damage arising from your trading activities.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b border-ink/[0.08] pb-4">
                <span className="text-[11px] font-mono text-teal uppercase tracking-wider">Privacy Standards</span>
                <h3 className="text-base sm:text-lg font-bold text-ink mt-1">Privacy Policy &amp; Cookie Disclosure</h3>
                <p className="text-xs text-ink-muted mt-1">Last Updated: October 2026 · learnsmc.xyz</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-ink text-sm">1. Commitment to User Privacy</h4>
                <p>
                  At <strong>learnsmc.xyz</strong>, accessible from https://learnsmc.xyz, we respect your privacy and are committed to safeguarding any personal data collected during your use of our educational services.
                </p>

                <h4 className="font-semibold text-ink text-sm pt-2">2. Google AdSense &amp; Third-Party Advertising Cookies</h4>
                <p>
                  This website displays advertisements served by <strong>Google AdSense</strong> and authorized digital advertising partners. Google uses cookies (including the DoubleClick cookie) to serve ads to users based on their visits to this site and other sites on the Internet:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-ink-secondary">
                  <li>
                    Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
                  </li>
                  <li>
                    Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
                  </li>
                  <li>
                    Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-teal underline">Google Ads Settings</a> or through the Network Advertising Initiative opt-out page at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-teal underline">aboutads.info</a>.
                  </li>
                </ul>

                <h4 className="font-semibold text-ink text-sm pt-2">3. Local Storage &amp; Progress Tracking</h4>
                <p>
                  To provide an interactive digital textbook and curriculum experience, <strong>learnsmc.xyz</strong> saves your chapter completion progress, journal records and drafts, practice quiz answers and results, and study checklists locally within your browser&apos;s <code className="bg-ink/[0.06] px-1.5 py-0.5 rounded text-ink font-mono text-xs">localStorage</code>. This data never leaves your device and is not sold or shared with any third party.
                </p>

                <h4 className="font-semibold text-ink text-sm pt-2">4. Log Files and Web Analytics</h4>
                <p>
                  Like most modern web services, we utilize standard server logs and edge analytics (Cloudflare) to record IP addresses, browser types, Internet Service Providers (ISPs), date/time stamps, referring/exit pages, and click counts to analyze trends, administer the platform, and protect against malicious cyber attacks.
                </p>

                <h4 className="font-semibold text-ink text-sm pt-2">5. GDPR &amp; CCPA Privacy Rights</h4>
                <p>
                  Under European (GDPR) and California (CCPA) regulations, you have the right to request access to, rectification of, or erasure of your personal data. If you have inquiries regarding privacy or wish to exercise your rights, contact us at: <a href="mailto:itsmuhammadumerijaz@gmail.com" className="text-teal underline">itsmuhammadumerijaz@gmail.com</a>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="border-b border-ink/[0.08] pb-4">
                <span className="text-[11px] font-mono text-violet uppercase tracking-wider">User Agreement</span>
                <h3 className="text-base sm:text-lg font-bold text-ink mt-1">Terms of Service</h3>
                <p className="text-xs text-ink-muted mt-1">Effective Date: October 2026 · learnsmc.xyz</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-ink text-sm">1. Acceptance of Terms</h4>
                <p>
                  By accessing or utilizing <strong>learnsmc.xyz</strong> (&quot;the Platform&quot;), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the platform immediately.
                </p>

                <h4 className="font-semibold text-ink text-sm pt-2">2. Intellectual Property Rights</h4>
                <p>
                  The educational articles, architectural software diagrams, user interface design, codebases, and interactive tools are the exclusive intellectual property of <strong>learnsmc.xyz</strong> and its creators. Third-party video masterclasses curated in tribute are the property of their respective creators (including Trader Abdullah Masood and Inner Circle Trader ICT).
                </p>

                <h4 className="font-semibold text-ink text-sm pt-2">3. Prohibited Conduct</h4>
                <p>
                  You agree not to: (a) engage in unauthorized automated scraping or data harvesting; (b) attempt to compromise the security or infrastructure of the website; (c) misrepresent yourself or make fraudulent claims based on the curriculum; (d) commercially redistribute or resell the platform&apos;s textbook or simulator software without prior written authorization.
                </p>

                <h4 className="font-semibold text-ink text-sm pt-2">4. Warranty Disclaimer</h4>
                <p>
                  The platform is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express, statutory, or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: ABOUT & CONTACT */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="border-b border-ink/[0.08] pb-4">
                <span className="text-[11px] font-mono text-brand uppercase tracking-wider">Publisher Identity</span>
                <h3 className="text-base sm:text-lg font-bold text-ink mt-1">About learnsmc.xyz &amp; Contact Information</h3>
                <p className="text-xs text-ink-muted mt-1">Educational Platform for Inner Circle Trader &amp; Smart Money Concepts</p>
              </div>

              <div className="space-y-4">
                <p>
                  <strong>learnsmc.xyz</strong> was created to deliver an uncompromised, institutional-grade digital textbook, interactive chart laboratory, and curated masterclass archive for traders studying price action algorithms, market structure, liquidity sweeps, and time-based delivery models.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-ink/[0.03] border border-ink/[0.08]">
                    <div className="text-xs text-ink-muted uppercase font-mono">Website Domain</div>
                    <div className="text-sm font-semibold text-ink mt-1">learnsmc.xyz</div>
                    <div className="text-xs text-teal mt-0.5">Active &amp; SSL Secured</div>
                  </div>

                  <div className="p-4 rounded-xl bg-ink/[0.03] border border-ink/[0.08]">
                    <div className="text-xs text-ink-muted uppercase font-mono">Editorial Contact Email</div>
                    <a href="mailto:itsmuhammadumerijaz@gmail.com" className="text-sm font-semibold text-teal hover:underline mt-1 block">
                      itsmuhammadumerijaz@gmail.com
                    </a>
                    <div className="text-xs text-ink-muted mt-0.5">Inquiries, corrections &amp; support</div>
                  </div>
                </div>

                <h4 className="font-semibold text-ink text-sm pt-2">Editorial Independence &amp; Academic Rigor</h4>
                <p>
                  All curriculum lessons are rigorously structured to explain institutional order flow without sensationalized claims of guaranteed profits or get-rich-quick promises. We emphasize strict risk management, drawdown preservation, and statistical backtesting.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: ADSENSE & ADS.TXT */}
          {activeTab === 'adsense' && (
            <div className="space-y-6">
              <div className="border-b border-ink/[0.08] pb-4">
                <span className="text-[11px] font-mono text-teal uppercase tracking-wider">Monetization Infrastructure</span>
                <h3 className="text-base sm:text-lg font-bold text-ink mt-1">Google AdSense Integration &amp; ads.txt</h3>
                <p className="text-xs text-ink-muted mt-1">Ready for publisher verification</p>
              </div>

              <div className="p-4 rounded-xl bg-teal/10 border border-teal/30 flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-ink">ads.txt File Active on learnsmc.xyz</h4>
                  <p className="text-xs text-ink-secondary">
                    Your domain now hosts the mandatory Authorized Digital Sellers file at{' '}
                    <a 
                      href="https://learnsmc.xyz/ads.txt" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal underline inline-flex items-center gap-1 font-mono"
                    >
                      https://learnsmc.xyz/ads.txt <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-ink-muted uppercase">Current ads.txt Content:</span>
                  <button
                    onClick={handleCopyAdsTxt}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-ink/[0.06] hover:bg-ink/[0.12] text-xs font-mono text-teal transition-colors"
                  >
                    {copiedAdsTxt ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAdsTxt ? 'Copied!' : 'Copy Line'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-surface-muted border border-ink/[0.1] text-xs font-mono text-teal overflow-x-auto select-all">
                  google.com, pub-6985025314302607, DIRECT, f08c47fec0942fa0
                </pre>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-semibold text-ink text-sm">How to finalize Google AdSense approval:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-ink-secondary">
                  <li>
                    Log in to your <strong>Google AdSense</strong> console at <a href="https://adsense.google.com" target="_blank" rel="noopener noreferrer" className="text-teal underline">adsense.google.com</a>.
                  </li>
                  <li>
                    Click <strong>Sites &gt; Add Site</strong>, and enter <code className="text-ink font-mono bg-ink/[0.08] px-1.5 py-0.5 rounded">learnsmc.xyz</code>.
                  </li>
                  <li>
                    Copy your assigned <strong>Publisher ID</strong> (e.g. <code className="text-ink font-mono bg-ink/[0.08] px-1 py-0.5 rounded">pub-1234567890123456</code>).
                  </li>
                  <li>
                    Tell me your Publisher ID, and I will instantly replace the placeholder in your <code className="text-ink font-mono bg-ink/[0.08] px-1 py-0.5 rounded">ads.txt</code> and <code className="text-ink font-mono bg-ink/[0.08] px-1 py-0.5 rounded">index.html</code> verification code!
                  </li>
                </ol>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-ink/[0.08] bg-surface">
          <div className="text-[11px] font-mono text-ink-muted flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Publisher information for learnsmc.xyz</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-ink/[0.08] hover:bg-ink/[0.14] text-ink text-xs font-semibold tracking-wide transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
