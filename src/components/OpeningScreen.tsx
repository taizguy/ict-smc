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
  Compass
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
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] text-slate-900 overflow-y-auto flex flex-col justify-between selection:bg-cyan-200">
      {/* Ambient Top Glows (Light Theme) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-100/80 via-blue-50/50 to-transparent pointer-events-none blur-3xl -z-10" />
      <div className="fixed -bottom-20 -left-20 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed -bottom-20 -right-20 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Welcome Bar */}
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <CandlestickChart className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display font-extrabold text-slate-900 text-base sm:text-lg tracking-tight flex items-center gap-2">
              <span>ICT ACADEMY</span>
              <span className="text-[11px] font-mono font-bold bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200">
                STUDENT ONBOARDING
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-500">The Journey From Beginner to Institutional Trader</div>
          </div>
        </div>

        {/* Action Skip & Mentorship Quick Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenMentorSpotlight}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-mono font-bold transition-all shadow-sm"
          >
            <Youtube className="w-4 h-4 text-red-600" />
            <span>Tribute: @TraderAbdullahMasood</span>
          </button>

          <button
            onClick={onEnter}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-mono font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <span>Enter App</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE: The Animated Visual Story of the Boy Learning */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Frame Card */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200/80 bg-white shadow-xl shadow-slate-200/60 p-2 group">
              {/* Image Container with Ambient Light */}
              <div className="relative aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={boyStudyingImg}
                  alt="A boy passionately studying trading charts with laptop, notebook and charts"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Light gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6 text-white" />

                {/* Floating Animated Badges over the artwork */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-slate-800 text-xs font-mono font-bold flex items-center gap-2 shadow-md border border-slate-200">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>Studying Session: London & NY Open</span>
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-slate-800 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md border border-slate-200">
                  <Coffee className="w-3.5 h-3.5 text-amber-600" />
                  <span>Deep Focus Mode</span>
                </div>

                {/* Animated Candle Widget Pill */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl border border-slate-700 shadow-xl max-w-sm">
                  <div className="flex items-center justify-between gap-4 text-xs font-mono pb-1 border-b border-slate-800">
                    <span className="text-sky-400 font-bold">CURRENT LESSON</span>
                    <span className="text-emerald-400 font-bold">+1.0842 High Draw</span>
                  </div>
                  <div className="text-xs font-sans text-slate-200 mt-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Mapping Fair Value Gaps & Buy-Side Liquidity</span>
                  </div>
                </div>
              </div>

              {/* Secondary Animated GIF & Interactive Study Strip */}
              <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 font-mono text-slate-700">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=80&h=80&q=80"
                      alt="Candlestick icon"
                      className="w-5 h-5 object-contain rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Algorithmic Order Flow</div>
                    <div className="text-[10px] text-slate-500">Zero indicators • Pure price delivery</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                    Syllabus Level: Beginner ➔ Pro
                  </span>
                </div>
              </div>
            </div>

            {/* Rotating Inspirational Quote */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-sky-600 font-bold uppercase tracking-wider">
                  Trader Mindset
                </div>
                <p className="text-sm font-serif italic text-slate-700 transition-all duration-500">
                  {studentQuotes[typedTextIndex]}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Mentor Abdullah Masood Gratitude & Launch Hub */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Headline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-mono font-bold border border-sky-200">
                <BookOpen className="w-3.5 h-3.5" />
                <span>INTERACTIVE DIGITAL ACADEMY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
                Master Institutional Trading & Price Action
              </h1>
              <p className="text-slate-600 text-sm font-sans leading-relaxed">
                Step into the mind of institutional market makers. Built for aspiring traders determined to understand real liquidity, order blocks, and algorithmic delivery without retail myths.
              </p>
            </div>

            {/* SPECIAL ABDULLAH MASOOD APPRECIATION CARD */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-50/50 border-2 border-amber-300 shadow-lg shadow-amber-500/10 space-y-4 relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white shadow-md shadow-amber-500/25 border-2 border-white shrink-0">
                    <Youtube className="w-6 h-6 fill-white text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-extrabold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
                      <span>SPECIAL MENTORSHIP TRIBUTE</span>
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      Trader Abdullah Masood
                    </h3>
                    <a
                      href="https://www.youtube.com/@TraderAbdullahMasood"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-amber-700 hover:text-amber-800 font-bold underline"
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
                      ? 'bg-rose-500 text-white shadow-md scale-105' 
                      : 'bg-white hover:bg-rose-50 text-rose-600 border border-rose-200'
                  }`}
                  title="Send Appreciation & Gratitude to Abdullah Masood"
                >
                  <Heart className={`w-3.5 h-3.5 ${hasVoted ? 'fill-white' : 'fill-rose-500'}`} />
                  <span>{gratitudeVotes}</span>
                </button>
              </div>

              {/* Mentorship Impact Note */}
              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 text-xs text-slate-700 leading-relaxed font-sans space-y-2">
                <p>
                  "We dedicate this interactive academy to <strong>Trader Abdullah Masood</strong>. His selfless dedication, structured video breakdowns, and genuine mentorship have demystified Inner Circle Trader (ICT) concepts for countless students around the world."
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-100 text-[11px] font-mono text-amber-800">
                  <span className="flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Free Mentorship
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Honest Risk Education
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Institutional Logic
                  </span>
                </div>
              </div>

              {/* Action buttons inside tribute */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={onOpenMentorSpotlight}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-mono font-bold text-xs transition-colors text-center"
                >
                  View Full Mentor Profile & Videos
                </button>
                <a
                  href="https://www.youtube.com/@TraderAbdullahMasood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
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
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-mono font-extrabold text-base shadow-lg shadow-sky-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Enter Academy & Begin Learning</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Feature Highlights Pills */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-slate-600">
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <div className="font-bold text-slate-900">23 Units</div>
                  <div>Full Syllabus</div>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <div className="font-bold text-slate-900">Interactive</div>
                  <div>Chart Laboratory</div>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <div className="font-bold text-slate-900">Zero Cost</div>
                  <div>Community Tool</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Subtle Bottom Strip */}
      <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Institutional Price Delivery • Smart Money Concepts • Educational Platform</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600 font-bold">
          <span>In Gratitude to @TraderAbdullahMasood</span>
          <span>•</span>
          <button onClick={onEnter} className="text-sky-600 hover:underline">
            Skip To Curriculum ➔
          </button>
        </div>
      </footer>
    </div>
  );
};
