import { TERMS_SECTIONS, ABOUT_GUIDANCE, CONTACT_GUIDANCE } from '../data/publisherPageCopy';
import { authorContact } from '../utils/publisher';
import { chapterCount, lectureCount } from '../utils/catalogCounts';
import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Lock,
  FileText,
  Mail,
  Scale,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Copy,
  AlertTriangle,
  Building,
  Send,
  BookOpen,
  Calendar,
  UserCheck
} from 'lucide-react';

export type LegalTabType = 'disclaimer' | 'privacy' | 'terms' | 'about' | 'contact' | 'adsense';

interface LegalPageViewProps {
  currentTab: LegalTabType;
  onTabChange: (tab: LegalTabType) => void;
  onBackToCurriculum: () => void;
}

export const LegalPageView: React.FC<LegalPageViewProps> = ({
  currentTab,
  onTabChange,
  onBackToCurriculum
}) => {
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleCopyAdsTxt = () => {
    navigator.clipboard.writeText('google.com, pub-6985025314302607, DIRECT, f08c47fec0942fa0');
    setCopiedAdsTxt(true);
    setTimeout(() => setCopiedAdsTxt(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    const body = `Name: ${contactForm.name}\nReply email: ${contactForm.email}\n\n${contactForm.message}`;
    window.location.href = `mailto:itsmuhammadumerijaz@gmail.com?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(body)}`;
    setContactSubmitted(true);
  };

  const navTabs: { id: LegalTabType; label: string; icon: React.ReactNode }[] = [
    { id: 'disclaimer', label: 'Financial risk disclosure', icon: <ShieldAlert className="w-4 h-4 text-amber-700" /> },
    { id: 'privacy', label: 'Privacy Policy & Cookies', icon: <Lock className="w-4 h-4 text-teal" /> },
    { id: 'terms', label: 'Terms of Service', icon: <FileText className="w-4 h-4 text-violet" /> },
    { id: 'about', label: 'About & Editorial Team', icon: <Building className="w-4 h-4 text-ink" /> },
    { id: 'contact', label: 'Contact & Support', icon: <Mail className="w-4 h-4 text-teal" /> },
    { id: 'adsense', label: 'AdSense & ads.txt', icon: <CheckCircle2 className="w-4 h-4 text-positive" /> }
  ];

  return (
    <div className="min-h-screen pb-20 pt-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Return Bar */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-ink/[0.08]">
        <button
          onClick={onBackToCurriculum}
          className="inline-flex items-center gap-2 text-xs font-sans tabular-nums text-ink-secondary hover:text-teal transition-colors py-2 px-3 rounded-lg hover:bg-ink/[0.04]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>&larr; Return to Curriculum Directory</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-sans tabular-nums text-ink-muted">
          <span>learnsmc.xyz</span>
          <span>/</span>
          <span className="text-teal uppercase">{currentTab}</span>
        </div>
      </nav>

      {/* Standalone Tab Switcher */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-5 h-5 text-brand" />
          <h1 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
            {navTabs.find(t => t.id === currentTab)?.label}
          </h1>
        </div>
        <p className="text-sm text-ink-secondary max-w-3xl mb-6">
          Risk disclosures, privacy and cookie information, source attribution, and editorial policies for LearnSMC.
        </p>

        <div className="flex flex-wrap gap-2 p-1.5 bg-surface border border-ink/[0.08] rounded-xl">
          {navTabs.map((t) => {
            const isActive = currentTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-sans tabular-nums font-medium transition-all ${
                  isActive
                    ? 'bg-brand on-accent border border-brand shadow-sm [&_svg]:text-current'
                    : 'text-ink-secondary hover:text-ink hover:bg-ink/[0.04]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Standalone Content Card */}
      <article className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">

        {/* TAB 1: FINANCIAL RISK & CFTC RULE 4.41 */}
        {currentTab === 'disclaimer' && (
          <section className="space-y-6 animate-fade-in text-sm text-ink-secondary leading-relaxed">
            <header className="border-b border-ink/[0.08] pb-5">
              <div className="flex items-center gap-2 text-xs font-sans tabular-nums text-amber-700 uppercase tracking-widest mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>Education and simulated performance</span>
              </div>
              <h2 className="text-2xl font-bold text-ink">
                Financial Risk Disclosure &amp; Educational Non-Advice Declaration
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                Last reviewed: October 2026 · Mandatory regulatory notice for traders
              </p>
            </header>

            <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl p-5 text-amber-700 space-y-2">
              <h3 className="font-semibold text-amber-700 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                HIGH RISK INVESTMENT &amp; CAPITAL LOSS WARNING
              </h3>
              <p className="text-xs leading-relaxed">
                Trading foreign exchange (Forex), commodity futures, equity indices, cryptocurrencies, and Contracts for Difference (CFDs) carries a high level of risk and may not be suitable for all investors. The high degree of leverage that is often obtainable in financial trading can work against you as well as for you. Before deciding to trade foreign exchange or any financial instrument, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment; therefore, you should not invest money that you cannot afford to lose.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-ink">1. CFTC Rule 4.41 Notice on Hypothetical Performance</h3>
              <p>
                HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN LIMITATIONS. UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. ALSO, SINCE THE TRADES HAVE NOT BEEN EXECUTED, THE RESULTS MAY HAVE UNDER-OR-OVER COMPENSATED FOR THE IMPACT, IF ANY, OF CERTAIN MARKET FACTORS, SUCH AS LACK OF LIQUIDITY.
              </p>
              <p>
                SIMULATED TRADING PROGRAMS IN GENERAL ARE ALSO SUBJECT TO THE FACT THAT THEY ARE DESIGNED WITH THE BENEFIT OF HINDSIGHT. NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFIT OR LOSSES SIMILAR TO THOSE SHOWN OR DISCUSSED ON LEARNSMC.XYZ.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-ink">2. Strictly Educational &amp; Research Platform</h3>
              <p>
                LearnSMC (learnsmc.xyz) is strictly an educational digital textbook and market microstructure research repository. None of the curriculum chapters, Trader Abdullah Masood lecture notes, interactive chart simulators, calculators, or diagrams constitute personalized investment, financial, tax, or legal advice.
              </p>
              <p>
                LearnSMC does not operate as a registered Commodity Trading Advisor (CTA), broker-dealer, or investment management firm under the jurisdiction of the U.S. Commodity Futures Trading Commission (CFTC), the National Futures Association (NFA), the Financial Conduct Authority (FCA), or any other regulatory body.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-ink">3. Zero Predatory Affiliate Practices</h3>
              <p>
                LearnSMC does not promote unregulated offshore brokers, paid signal rooms, guaranteed win-rate robots, or predatory multi-tier affiliate programs. All {chapterCount} textbook chapters and {lectureCount} Abdullah Masood masterclasses are 100% free and open to all students worldwide.
              </p>
            </div>
          </section>
        )}

        {/* TAB 2: PRIVACY POLICY & GOOGLE ADSENSE */}
        {currentTab === 'privacy' && (
          <section className="space-y-6 animate-fade-in text-sm text-ink-secondary leading-relaxed">
            <header className="border-b border-ink/[0.08] pb-5">
              <div className="flex items-center gap-2 text-xs font-sans tabular-nums text-teal uppercase tracking-widest mb-1">
                <Lock className="w-4 h-4" />
                <span>Privacy &amp; Cookie Policy · Google Publisher Policies</span>
              </div>
              <h2 className="text-2xl font-bold text-ink">
                Privacy Policy, Cookie Disclosures &amp; Data Rights
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                Privacy, browser storage and third-party advertising
              </p>
            </header>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-ink">1. Introduction &amp; Commitment</h3>
              <p>
                LearnSMC (<strong className="text-ink">https://learnsmc.xyz</strong>) respects your personal privacy. This Privacy Policy details how information is handled when you browse our open digital textbook, use the interactive Chart Lab, or interact with our curriculum. We do not sell your personal data.
              </p>
            </div>

            <div className="bg-surface-raised border border-ink/[0.08] rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-teal flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal" />
                Google AdSense &amp; Third-Party Cookie Disclosures
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                As required by Google Publisher Policies and Google AdSense terms:
              </p>
              <ul className="text-xs text-ink-secondary space-y-2 list-disc pl-5">
                <li>
                  Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites on the internet.
                </li>
                <li>
                  Google's use of advertising cookies enables it and its partners to serve ads to your visitors based on their visit to this site and/or other sites on the Internet.
                </li>
                <li>
                  Users may opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal underline"
                  >
                    Google Ads Settings (adssettings.google.com)
                  </a>.
                </li>
                <li>
                  Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
                  <a
                    href="https://thenai.org/how-to-opt-out/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal underline"
                  >
                    Network Advertising Initiative opt-out guide
                  </a>.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-ink">2. Browser LocalStorage &amp; Non-Tracking Preferences</h3>
              <p>
                LearnSMC uses client-side browser <code className="text-teal font-sans tabular-nums text-xs bg-ink/[0.05] px-1.5 py-0.5 rounded">localStorage</code> solely to preserve:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-ink-secondary">
                <li>Your lesson bookmarking and chapter completion status.</li>
                <li>Your trading journal records and drafts, practice quiz answers and results, and study checklists.</li>
                <li>Your Cookie Consent preference response.</li>
              </ul>
              <p className="text-xs text-ink-secondary">
                This data stays strictly on your device. We do not transmit or store your personal notes or progress records on remote marketing databases.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-ink">3. Your Rights Under GDPR (EEA) and CCPA (California)</h3>
              <p>
                Under the European General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), you have the right to request access to any data collected, request deletion, or restrict processing. LearnSMC collects minimal server logs (standard IP, user-agent, and requested page timestamp) strictly for security and denial-of-service prevention.
              </p>
              <p>
                To exercise any privacy inquiries or request data removal, email our privacy team directly at{' '}
                <a href="mailto:itsmuhammadumerijaz@gmail.com" className="text-teal underline">itsmuhammadumerijaz@gmail.com</a>.
              </p>
            </div>
          </section>
        )}

        {/* TAB 3: TERMS OF SERVICE */}
        {currentTab === 'terms' && (
          <section className="space-y-6 animate-fade-in text-sm text-ink-secondary leading-relaxed">
            <header className="border-b border-ink/[0.08] pb-5">
              <div className="flex items-center gap-2 text-xs font-sans tabular-nums text-violet uppercase tracking-widest mb-1">
                <FileText className="w-4 h-4" />
                <span>Terms of Use · Educational Repository</span>
              </div>
              <h2 className="text-2xl font-bold text-ink">
                Terms of Service &amp; Acceptable Use
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                Last updated: October 2026 · Governing use of learnsmc.xyz
              </p>
            </header>

            {TERMS_SECTIONS.map(section => <div className="space-y-4" key={section.title}><h3 className="text-base font-bold text-ink">{section.title}</h3><p>{section.text}</p></div>)}
          </section>
        )}

        {/* TAB 4: ABOUT & EDITORIAL METHODOLOGY */}
        {currentTab === 'about' && (
          <section id="author" className="space-y-6 text-sm leading-relaxed">
            <h2 className="text-2xl font-semibold">About LearnSMC and its author</h2>
            <p>Muhammad Umer Ijaz writes and maintains the written lessons and study notes on LearnSMC. This is an independent educational project for studying ICT and Smart Money Concepts.</p>
            <address className="not-italic break-words">
              <p><a className="underline" href={`mailto:${authorContact.email}`}>{authorContact.email}</a></p>
              <p><a className="underline" href={`tel:${authorContact.telephone}`}>{authorContact.telephone}</a></p>
              <p>{authorContact.streetAddress}, Daska, Pakistan</p>
            </address>
            <h3 className="text-xl font-semibold">How to use this project</h3>
            {ABOUT_GUIDANCE.map(text => <p key={text}>{text}</p>)}
            <h3 className="text-xl font-semibold">Source attribution</h3>
            <p>Videos attributed to Trader Abdullah Masood link to their original YouTube sources. Written study notes are independently published and are not claimed to be reviewed or endorsed by the source educator.</p>
            <h3 id="editorial-policy" className="text-xl font-semibold">Editorial policy</h3>
            <p>Lessons explain the frameworks, definitions, examples and practice rules used in this curriculum. A trading framework is not proof of future results. Check the source material, test assumptions in a demo account and examine cases where a setup fails. Independent expert or peer review is not claimed.</p>
            <h3 className="text-xl font-semibold">Corrections and questions</h3>
            <p>To suggest a correction, include the page URL, the statement in question and a source supporting the correction. <a className="underline text-teal" href="/contact/">Contact the publisher</a>.</p>
          </section>
        )}

        {/* TAB 5: CONTACT & SUPPORT */}
        {currentTab === 'contact' && (
          <section className="space-y-6 animate-fade-in text-sm text-ink-secondary leading-relaxed">
            <header className="border-b border-ink/[0.08] pb-5">
              <div className="flex items-center gap-2 text-xs font-sans tabular-nums text-teal uppercase tracking-widest mb-1">
                <Mail className="w-4 h-4" />
                <span>Publisher Channels · Support &amp; Inquiries</span>
              </div>
              <h2 className="text-2xl font-bold text-ink">
                Contact LearnSMC &amp; Editorial Support
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                Contact the publisher about lessons, corrections, technical problems or copyright concerns.
              </p>
            </header>

            <section className="space-y-3"><h3 className="font-semibold text-ink">How to send a useful inquiry</h3>{CONTACT_GUIDANCE.map(text => <p key={text}>{text}</p>)}</section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Direct Info */}
              <div className="space-y-5">
                <div className="bg-surface-raised border border-ink/[0.08] rounded-xl p-5 space-y-3">
                  <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4 text-teal" />
                    Direct Email Contacts
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-ink-muted font-sans tabular-nums block">Primary Support &amp; Inquiries:</span>
                      <a href="mailto:itsmuhammadumerijaz@gmail.com" className="text-teal font-sans tabular-nums hover:underline">
                        itsmuhammadumerijaz@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-raised border border-ink/[0.08] rounded-xl p-5 space-y-2 text-xs text-ink-secondary">
                  <h4 className="font-bold text-ink text-sm">Publisher contact</h4>
                  <address className="not-italic"><p>Muhammad Umer Ijaz</p><p><a className="underline" href={`tel:${authorContact.telephone}`}>{authorContact.telephone}</a></p><p>{authorContact.streetAddress}, Daska, Pakistan</p></address>
                  <p>Muhammad Umer Ijaz maintains this independent project. Responses depend on availability.</p>
                  <p>Inquiries regarding chart interpretations, typo corrections, or technical bug reports are prioritized.</p>
                </div>
              </div>

              {/* Right Column: Working Contact Form */}
              <div className="bg-surface-raised border border-ink/[0.08] rounded-xl p-6">
                {contactSubmitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-positive/10 border border-positive/30 flex items-center justify-center mx-auto text-positive">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-ink">Complete sending in your email app</h4>
                    <p className="text-xs text-ink-secondary max-w-xs mx-auto">
                      Your email app should open with a prepared message. Review it and press Send there. This website has not submitted a message to a server.
                    </p>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
                      }}
                      className="btn-predikt-secondary text-xs mt-3"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="font-bold text-ink text-sm">Send an Editorial Message</h3>
                    <div>
                      <label className="block text-xs font-sans tabular-nums text-ink-secondary mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Trader Name"
                        className="w-full bg-surface border border-ink/[0.1] rounded-lg px-3 py-2 text-xs text-ink placeholder-[#5f7064] focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans tabular-nums text-ink-secondary mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="trader@example.com"
                        className="w-full bg-surface border border-ink/[0.1] rounded-lg px-3 py-2 text-xs text-ink placeholder-[#5f7064] focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans tabular-nums text-ink-secondary mb-1">Topic</label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full bg-surface border border-ink/[0.1] rounded-lg px-3 py-2 text-xs text-ink focus:border-brand focus:outline-none"
                      >
                        <option value="General Inquiry">General Curriculum Inquiry</option>
                        <option value="Content Correction">Lesson Correction / Feedback</option>
                        <option value="Technical Issue">Platform Bug / UI Suggestion</option>
                        <option value="AdSense / Partnership">Publisher / Compliance Question</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-sans tabular-nums text-ink-secondary mb-1">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Detail your inquiry or suggestion here..."
                        className="w-full bg-surface border border-ink/[0.1] rounded-lg px-3 py-2 text-xs text-ink placeholder-[#5f7064] focus:border-brand focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-predikt-primary text-xs flex items-center justify-center gap-2 py-2.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Open email draft</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

        {/* TAB 6: ADSENSE & ADS.TXT */}
        {currentTab === 'adsense' && (
          <section className="space-y-6 animate-fade-in text-sm text-ink-secondary leading-relaxed">
            <header className="border-b border-ink/[0.08] pb-5">
              <div className="flex items-center gap-2 text-xs font-sans tabular-nums text-positive uppercase tracking-widest mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Google AdSense · Official Publisher Verification</span>
              </div>
              <h2 className="text-2xl font-bold text-ink">
                Google AdSense Verification &amp; ads.txt Specification
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                Publisher ID: ca-pub-6985025314302607 · Domain: learnsmc.xyz
              </p>
            </header>

            <div className="bg-surface-raised border border-ink/[0.08] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-sans tabular-nums text-teal">ROOT DOMAIN ADS.TXT RECORD:</span>
                <button
                  onClick={handleCopyAdsTxt}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-ink/[0.06] hover:bg-ink/[0.12] text-xs font-sans tabular-nums text-ink transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedAdsTxt ? 'Copied to Clipboard!' : 'Copy ads.txt Entry'}</span>
                </button>
              </div>

              <div className="bg-canvas p-3 rounded-lg font-sans tabular-nums text-xs text-positive select-all border border-ink/[0.06]">
                google.com, pub-6985025314302607, DIRECT, f08c47fec0942fa0
              </div>

              <div className="text-xs text-ink-secondary space-y-1">
                <p>Publicly verifiable URL: <a href="https://learnsmc.xyz/ads.txt" target="_blank" rel="noopener noreferrer" className="text-teal underline">https://learnsmc.xyz/ads.txt</a></p>
                <p>AdSense Account Verification Tag: <code className="text-amber-700">&lt;meta name="google-adsense-account" content="ca-pub-6985025314302607"&gt;</code> (configured in HTML &lt;head&gt;).</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-ink-secondary">
              <h3 className="text-sm font-bold text-ink">Google Publisher Policies Adherence Checklist</h3>
              <ul className="space-y-1.5 list-disc pl-5">
                <li><strong className="text-ink">Original Value-Add Content:</strong> {chapterCount} comprehensive codified chapters with market microstructure diagrams and tape notes.</li>
                <li><strong className="text-ink">Accessible Navigation:</strong> Logical tab navigation and chapter progression without dead ends or broken links.</li>
                <li><strong className="text-ink">No Accidental Clicks:</strong> Clean separation between editorial text, interactive simulators, and potential ad placements.</li>
                <li><strong className="text-ink">Strict Compliance:</strong> Prominent CFTC disclaimers, privacy policy with Google advertising cookie opt-out, and terms of service.</li>
              </ul>
            </div>
          </section>
        )}

        {(currentTab === 'about' || currentTab === 'contact') && <p className="text-sm">Page updated: <time dateTime="2026-10-16">16 October 2026</time>. <a href="/about/#editorial-policy" className="underline">Editorial policy</a>.</p>}
      </article>
    </div>
  );
};
