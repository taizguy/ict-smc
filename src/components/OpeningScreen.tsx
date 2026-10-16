import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Youtube, 
  Heart, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Coffee,
  CandlestickChart,
  MessageCircle,
  Volume2,
  VolumeX,
  Compass,
  Star,
  Moon
} from 'lucide-react';
import boyStudyingImg from '../assets/images/boy_learning_trading_1788423487769.jpg';

interface OpeningScreenProps {
  onEnter: () => void;
  onOpenMentorSpotlight: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnter, onOpenMentorSpotlight }) => {
  const [activeTab, setActiveTab] = useState<'journey' | 'appreciation' | 'curriculum'>('journey');
  const [typedTextIndex, setTypedTextIndex] = useState(0);
  const [gratitudeVotes, setGratitudeVotes] = useState<number>(1428);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [audioAmbient, setAudioAmbient] = useState<boolean>(false);

  const studentQuotes = [
    "“Trading isn't guessing. It's reading institutional footprints candle by candle.”",
    "“Every successful trade begins with a student who refused to give up on the charts.”",
    "“Patience pays better than any intraday leverage. Wait for the liquidity sweep.”",
    "“Thank you to Trader Abdullah Masood for turning confusion into clarity.”"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedTextIndex((prev) => (prev + 1) % studentQuotes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleVoteGratitude = () => {
    if (!hasVoted) {
      setGratitudeVotes(prev => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-canvas text-ink-secondary modal-scrollable flex flex-col justify-between selection:bg-cyan-500 selection:text-ink relative"
      data-lenis-prevent="true"
    >
      {/* Deep Celestial Fantasy Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Deep Cosmic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-canvas to-surface" />
        
        {/* Subtle Tech / Constellation Matrix Grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-30" />

        {/* Ethereal Nebula Clouds */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse-aura" />
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/12 via-sky-600/5 to-transparent rounded-full blur-3xl animate-float-subtle" />
        <div className="absolute bottom-0 -right-20 w-[700px] h-[700px] bg-gradient-to-tl from-amber-600/10 via-rose-600/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />

        {/* Shimmering Starlight Constellation Dots */}
        <div className="absolute top-16 left-12 w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping opacity-60" />
        <div className="absolute top-36 right-24 w-2 h-2 rounded-full bg-indigo-300 animate-pulse opacity-75" />
        <div className="absolute top-2/3 left-1/5 w-1 h-1 rounded-full bg-amber-300 animate-pulse opacity-80" />
        <div className="absolute bottom-28 right-1/3 w-1.5 h-1.5 rounded-full bg-purple-300 animate-ping opacity-40" />
      </div>

      {/* Top Welcome Bar - Sheryians Glass Header */}
      <header className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 py-4 flex items-center justify-between bg-surface/85 backdrop-blur-xl border-b border-ink/[0.08] rounded-b-3xl shadow-2xl relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rust via-rust to-amber flex items-center justify-center text-on-brand shadow-lg shadow-rust/30 border border-ink/20 on-accent">
            <CandlestickChart className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-display font-black text-ink text-base sm:text-lg tracking-tight flex items-center gap-2">
              <span>ICT ACADEMY</span>
              <span className="text-[10px] font-mono font-extrabold bg-rust/15 text-rust px-2.5 py-0.5 rounded-full border border-rust/30 uppercase tracking-wider shadow-xs">
                STUDENT ONBOARDING 2026
              </span>
            </div>
            <div className="text-[11px] font-mono text-ink-muted">The Journey From Beginner to Institutional Trader</div>
          </div>
        </div>

        {/* Action Skip & Mentorship Quick Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenMentorSpotlight}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 border border-amber-500/30 text-xs font-mono font-bold transition-all shadow-md shadow-amber-950/30 hover:scale-105"
          >
            <Youtube className="w-4 h-4 text-rose-700 fill-rose-500/20" />
            <span>Tribute: @TraderAbdullahMasood</span>
          </button>

          <button
            onClick={onEnter}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-rust to-amber hover:from-rust hover:to-amber text-on-brand font-mono font-extrabold text-xs sm:text-sm shadow-lg shadow-rust/30 transition-all hover:scale-105 active:scale-95 on-accent"
          >
            <span>Enter App</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE: The Visual Story of the Boy Learning */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Frame Card - Celestial Arcane Terminal Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-surface-muted/80 backdrop-blur-2xl shadow-2xl shadow-indigo-950/40 p-2.5 group">
              {/* Inner ambient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Image Container with Ambient Light */}
              <div className="relative aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden bg-surface-muted">
                <img
                  src={boyStudyingImg}
                  alt="A boy passionately studying trading charts with laptop, notebook and charts"
                  width="1376"
                  height="768"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 brightness-95"
                />

                {/* Dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent flex flex-col justify-end p-4 sm:p-6 text-ink" />

                {/* Floating Badges over the artwork */}
                <div className="absolute top-3 left-3 bg-surface-muted/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-ink-secondary text-xs font-mono font-bold flex items-center gap-2 shadow-lg border border-cyan-500/30">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-cyan-700">Session: London & NY Open</span>
                </div>

                <div className="absolute top-3 right-3 bg-surface-muted/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-ink-secondary text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg border border-amber-500/30">
                  <Coffee className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-amber-700">Deep Focus Mode</span>
                </div>

                {/* Animated Candle Widget Pill */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-surface-muted/95 backdrop-blur-md text-ink p-3.5 rounded-2xl border border-indigo-500/40 shadow-2xl max-w-sm">
                  <div className="flex items-center justify-between gap-4 text-xs font-mono pb-1 border-b border-line">
                    <span className="text-cyan-700 font-bold">CURRENT LESSON</span>
                    <span className="text-emerald-700 font-bold">+1.0842 High Draw</span>
                  </div>
                  <div className="text-xs font-sans text-ink-secondary mt-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Mapping Fair Value Gaps & Buy-Side Liquidity</span>
                  </div>
                </div>
              </div>

              {/* Secondary Interactive Study Strip */}
              <div className="mt-3 p-3 bg-surface-muted/70 rounded-2xl border border-line/90 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 font-mono text-ink-secondary">
                  <div className="w-8 h-8 rounded-xl bg-surface-muted border border-line flex items-center justify-center shadow-xs">
                    <img
                      src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=80&h=80&q=80"
                      alt="Candlestick icon"
                      className="w-5 h-5 object-contain rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-ink-secondary">Algorithmic Order Flow</div>
                    <div className="text-[10px] text-ink-muted">Zero retail indicators • Pure price delivery</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="px-3 py-1 rounded-xl bg-emerald-50/60 text-emerald-700 font-bold text-[11px] border border-emerald-500/40">
                    Syllabus Level: Beginner ➔ Pro
                  </span>
                </div>
              </div>
            </div>

            {/* Rotating Inspirational Quote */}
            <div className="p-4 rounded-2xl bg-surface border border-ink/[0.08] shadow-xl flex items-start gap-3 relative overflow-hidden">
              <div className="p-2 rounded-xl bg-rust/15 text-rust shrink-0 border border-rust/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-rust font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <span>Trader Mindset</span>
                  <Star className="w-3 h-3 text-amber-700 fill-amber-400/40" />
                </div>
                <p className="text-sm font-sans italic text-ink-secondary transition-all duration-500 leading-relaxed">
                  {studentQuotes[typedTextIndex]}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Mentor Abdullah Masood Gratitude & Launch Hub */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Headline */}
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rust/10 text-rust text-xs font-mono font-extrabold border border-rust/25">
                <BookOpen className="w-3.5 h-3.5" />
                <span>INTERACTIVE DIGITAL ACADEMY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-ink font-display tracking-tight leading-tight">
                Master Institutional Trading & Price Action
              </h1>
              <p className="text-ink-secondary text-sm font-sans leading-relaxed">
                Step into the mind of institutional market makers. Built for aspiring traders determined to understand real liquidity, order blocks, and algorithmic delivery without retail myths.
              </p>
            </div>

            {/* SPECIAL ABDULLAH MASOOD APPRECIATION CARD - Sheryians Masterclass Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-surface border border-amber-500/30 shadow-2xl shadow-amber-950/20 space-y-4 relative overflow-hidden">
              {/* Subtle ambient light aura */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-rust/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rust via-rust to-amber flex items-center justify-center text-on-brand shadow-lg shadow-rust/25 border border-ink/20 shrink-0 on-accent">
                    <Youtube className="w-6 h-6 fill-ink text-ink" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-extrabold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span>SPECIAL MENTORSHIP TRIBUTE</span>
                      <Award className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <h3 className="text-base font-black text-ink font-display">
                      Trader Abdullah Masood
                    </h3>
                    <a
                      href="https://www.youtube.com/@TraderAbdullahMasood"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-rust hover:text-amber font-bold underline"
                    >
                      @TraderAbdullahMasood
                    </a>
                  </div>
                </div>

                {/* Gratitude Heart Counter */}
                <button
                  onClick={handleVoteGratitude}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                    hasVoted 
                      ? 'bg-rose-600 text-on-brand shadow-lg shadow-rose-600/30 scale-105 on-accent'
                      : 'bg-surface-muted hover:bg-rose-50/60 text-rose-700 border border-rose-500/40 shadow-xs'
                  }`}
                  title="Send Appreciation & Gratitude to Abdullah Masood"
                >
                  <Heart className={`w-3.5 h-3.5 ${hasVoted ? 'fill-ink' : 'fill-rose-400'}`} />
                  <span>{gratitudeVotes}</span>
                </button>
              </div>

              {/* Mentorship Impact Note */}
              <div className="p-4 rounded-2xl bg-surface border border-ink/[0.06] text-xs text-ink-secondary leading-relaxed font-sans space-y-2 relative z-10">
                <p>
                  "We dedicate this interactive academy to <strong>Trader Abdullah Masood</strong>. His selfless dedication, structured video breakdowns, and genuine mentorship have demystified Inner Circle Trader (ICT) concepts for countless students around the world."
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-ink/[0.06] text-[10px] font-mono text-amber-700">
                  <span className="flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#25734f]" /> 100% Free Mentorship
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#25734f]" /> Honest Risk Education
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#25734f]" /> Institutional Logic
                  </span>
                </div>
              </div>

              {/* Action buttons inside tribute */}
              <div className="flex items-center gap-2 pt-1 relative z-10">
                <button
                  onClick={onOpenMentorSpotlight}
                  className="flex-1 py-2.5 px-3 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 border border-amber-500/30 font-mono font-bold text-xs transition-colors text-center shadow-xs"
                >
                  View Full Mentor Profile & Videos
                </button>
                <a
                  href="https://www.youtube.com/@TraderAbdullahMasood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-ink font-mono font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-950/40 transition-all hover:scale-105"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Subscribe</span>
                </a>
              </div>
            </div>

            {/* Launch Call to Action */}
            <div className="pt-2 space-y-3">
              <button
                onClick={onEnter}
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-rust via-rust to-amber hover:from-rust hover:to-amber text-on-brand font-mono font-black text-base shadow-2xl shadow-rust/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] on-accent"
              >
                <span>Enter Academy & Begin Learning</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Feature Highlights Pills */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-ink-muted">
                <div className="p-2.5 rounded-2xl bg-surface border border-ink/[0.06] shadow-xs">
                  <div className="font-extrabold text-ink">31 Modules</div>
                  <div className="text-[10px] text-ink-muted">Full Syllabus</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-surface border border-ink/[0.06] shadow-xs">
                  <div className="font-extrabold text-ink">Interactive</div>
                  <div className="text-[10px] text-ink-muted">Chart Laboratory</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-surface border border-ink/[0.06] shadow-xs">
                  <div className="font-extrabold text-ink">Zero Cost</div>
                  <div className="text-[10px] text-ink-muted">Community Tool</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Bottom Strip */}
      <footer className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 py-4 border-t border-ink/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-ink-muted bg-surface/85 backdrop-blur-xl rounded-t-3xl relative z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25734f] animate-ping" />
          <span>Institutional Price Delivery • Smart Money Concepts • Educational Platform</span>
        </div>
        <div className="flex items-center gap-3 text-ink-secondary font-bold">
          <span>In Gratitude to @TraderAbdullahMasood</span>
          <span>•</span>
          <button onClick={onEnter} className="text-rust hover:text-amber hover:underline">
            Skip To Curriculum ➔
          </button>
        </div>
      </footer>
    </div>
  );
};
