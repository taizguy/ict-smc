import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Youtube, 
  BookOpen, 
  Heart, 
  Wrench, 
  BarChart2, 
  Shield, 
  Zap, 
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Clock
} from 'lucide-react';
import boyStudyingImg from '../assets/images/boy_learning_trading_1788423487769.jpg';
import { MainTabType } from './Header';

interface WelcomeScreenProps {
  onEnterAcademy: (targetTab?: MainTabType) => void;
  onOpenMentorSpotlight: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onEnterAcademy, 
  onOpenMentorSpotlight 
}) => {
  const [gratitudeCount, setGratitudeCount] = useState<number>(1429);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'mentor' | 'pillars'>('mission');

  const quotes = [
    "“Trading isn't guessing. It's reading institutional footprints candle by candle.”",
    "“Price does not move because there are more buyers than sellers. It moves because liquidity is consumed.”",
    "“Patience pays better than any intraday leverage. Wait for the liquidity sweep.”",
    "“In honor of Trader Abdullah Masood — turning algorithmic complexity into mathematical clarity.”"
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const handleVote = () => {
    if (!hasVoted) {
      setGratitudeCount(prev => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="text-[#121212] flex flex-col justify-between relative selection:bg-[#1040C0] selection:text-white font-sans space-y-6">
      {/* Bauhaus Sub-Navigation & Dedication Bar */}
      <div className="relative z-10 w-full px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-4 border-[#121212] bg-white shadow-[6px_6px_0px_0px_#121212]">
        {/* Geometric Bauhaus Logo / Header */}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left cursor-pointer group"
          title="Return to top of Welcome Screen"
        >
          <div className="flex items-center gap-1.5 p-1.5 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] group-hover:-translate-y-0.5 transition-transform">
            <span className="w-3.5 h-3.5 rounded-full bg-[#D02020] border border-[#121212] inline-block shrink-0" />
            <span className="w-3.5 h-3.5 rounded-none bg-[#1040C0] border border-[#121212] inline-block shrink-0" />
            <span className="w-3.5 h-3.5 bg-[#F0C020] clip-triangle inline-block shrink-0" />
          </div>
          <div>
            <div className="font-black text-lg sm:text-xl uppercase tracking-tighter text-[#121212] flex items-center gap-1.5 leading-none group-hover:text-[#D02020] transition-colors">
              <span>ICT</span>
              <span className="text-[#D02020]">//</span>
              <span>BAUHAUS</span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#121212]/70 leading-tight mt-0.5 font-mono">
              INSTITUTIONAL CURRICULUM &amp; LAB
            </div>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            type="button"
            onClick={onOpenMentorSpotlight}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F0C020] hover:bg-yellow-400 text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#121212] stroke-[2.5]" />
            <span>Mentor Tribute</span>
          </button>

          <button
            type="button"
            onClick={handleVote}
            className={`flex items-center gap-2 px-3.5 py-1.5 border-2 border-[#121212] text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
              hasVoted
                ? 'bg-[#D02020] text-white shadow-[3px_3px_0px_0px_#121212]'
                : 'bg-white text-[#121212] hover:bg-[#F0F0F0] shadow-[3px_3px_0px_0px_#121212]'
            }`}
            title="Appreciation for free institutional education"
          >
            <Heart className={`w-3.5 h-3.5 ${hasVoted ? 'fill-white text-white' : 'text-[#D02020]'}`} />
            <span>{gratitudeCount}</span>
          </button>

          <button
            type="button"
            onClick={() => onEnterAcademy('curriculum')}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#1040C0] hover:bg-blue-700 text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <span>Enter Academy</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Main Welcome Content */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col justify-center space-y-10">
        
        {/* Main Constructivist Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Bauhaus Composition Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212] text-white text-xs font-black uppercase tracking-widest border-2 border-[#121212]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D02020]" />
                FORM FOLLOWS FUNCTION
              </span>
              <span className="px-3 py-1 bg-[#F0C020] text-[#121212] text-xs font-black uppercase tracking-widest border-2 border-[#121212]">
                OPEN ACCESSIBLE TRADING
              </span>
            </div>

            {/* Massive Bauhaus Heading */}
            <div className="space-y-1">
              <div className="text-sm sm:text-base font-black uppercase font-mono tracking-widest text-[#1040C0]">
                ICT SMART MONEY CONCEPTS
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-[#121212] leading-[0.9]">
                BAUHAUS <span className="bg-[#D02020] text-white px-3 py-1 inline-block border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212]">ACADEMY</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg font-medium text-[#121212] leading-relaxed max-w-xl">
              An institutional trading syllabus engineered with constructivist clarity. Master order flow, fair value gaps, algorithmic displacement, and liquidity delivery across 48 codified chapters, 52 masterclasses by Trader Abdullah Masood, and an interactive 8-tool laboratory.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => onEnterAcademy('curriculum')}
                className="px-6 py-3.5 bg-[#D02020] hover:bg-red-700 text-white text-sm font-black uppercase tracking-wider border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] flex items-center gap-2.5 transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <BookOpen className="w-4 h-4 stroke-[2.5]" />
                <span>Explore 48 Chapters</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => onEnterAcademy('masood')}
                className="px-6 py-3.5 bg-[#F0C020] hover:bg-yellow-400 text-[#121212] text-sm font-black uppercase tracking-wider border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] flex items-center gap-2.5 transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <Youtube className="w-4 h-4 text-[#D02020] fill-[#D02020]" />
                <span>Masood Academy (52)</span>
              </button>

              <button
                onClick={() => onEnterAcademy('tools')}
                className="px-6 py-3.5 bg-[#1040C0] hover:bg-blue-700 text-white text-sm font-black uppercase tracking-wider border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] flex items-center gap-2.5 transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <Wrench className="w-4 h-4 stroke-[2.5]" />
                <span>Trading Lab (8 Tools)</span>
              </button>
            </div>

            {/* Rotating Dynamic Quote */}
            <div className="p-4 bg-white border-2 sm:border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] space-y-1 max-w-xl">
              <div className="flex items-center gap-2 text-[10px] font-mono font-black uppercase text-[#D02020]">
                <Clock className="w-3.5 h-3.5" />
                <span>Algorithmic Dictum</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#121212] italic">
                {quotes[quoteIndex]}
              </p>
            </div>

          </div>

          {/* Right Column: Bauhaus Tribute & Visual Showcase */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Student & Mentor Bauhaus Card */}
            <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-5 sm:p-6 relative overflow-hidden space-y-4">
              
              <div className="flex items-center justify-between border-b-2 border-[#121212] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-[#D02020] border border-black" />
                  <span className="text-xs font-mono font-black uppercase text-[#121212]">
                    DEDICATION &amp; TRIBUTE
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#F0C020] px-2 py-0.5 border border-[#121212]">
                  100% UNLOCKED
                </span>
              </div>

              {/* Framed Image */}
              <div className="relative border-4 border-[#121212] overflow-hidden bg-[#E5E5E5] aspect-4/3">
                <img 
                  src={boyStudyingImg} 
                  alt="Young student studying institutional price delivery"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute bottom-2 left-2 bg-[#121212] text-white px-2.5 py-1 text-[10px] font-mono font-bold border border-white uppercase">
                  FOCUS // ORDERFLOW DISCIPLINE
                </div>
              </div>

              {/* Tribute Inscription */}
              <div className="p-3 bg-[#FFF9C4] border-2 border-[#121212] text-xs font-medium space-y-1">
                <div className="font-mono font-black uppercase text-[10px] text-[#D02020]">
                  IN HONOR OF TRADER ABDULLAH MASOOD
                </div>
                <p className="text-[#121212] text-xs leading-snug">
                  Transforming thousands of retail traders through relentless dedication to open education, algorithmic precision, and disciplined risk psychology.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-[#F0F0F0] border-2 border-[#121212]">
                  <div className="text-xl font-black text-[#121212] font-mono">48</div>
                  <div className="text-[9px] font-black uppercase text-[#121212]/70 font-mono">Textbook Ch.</div>
                </div>
                <div className="p-2.5 bg-[#F0F0F0] border-2 border-[#121212]">
                  <div className="text-xl font-black text-[#D02020] font-mono">52</div>
                  <div className="text-[9px] font-black uppercase text-[#121212]/70 font-mono">Lectures</div>
                </div>
                <div className="p-2.5 bg-[#F0F0F0] border-2 border-[#121212]">
                  <div className="text-xl font-black text-[#1040C0] font-mono">08</div>
                  <div className="text-[9px] font-black uppercase text-[#121212]/70 font-mono">Lab Tools</div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 3-Pillar Bauhaus Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* Pillar 1: 48 Institutional Chapters */}
          <div 
            onClick={() => onEnterAcademy('curriculum')}
            className="bg-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] p-6 space-y-4 cursor-pointer hover:-translate-y-1 transition-transform group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#D02020] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] flex items-center justify-center font-mono font-black text-sm">
                01
              </div>
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#F0F0F0] border border-[#121212]">
                OPEN SYLLABUS
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#121212] group-hover:text-[#D02020] transition-colors">
                The ICT Textbook
              </h3>
              <p className="text-xs text-[#121212]/80 mt-1 font-medium leading-relaxed">
                48 fully codified institutional chapters spanning market structure, liquidity sweeps, Fair Value Gaps, and killzones without arbitrary locks.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-black uppercase text-[#D02020]">
              <span>Read Chapters</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 2: Masood Academy */}
          <div 
            onClick={() => onEnterAcademy('masood')}
            className="bg-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] p-6 space-y-4 cursor-pointer hover:-translate-y-1 transition-transform group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] flex items-center justify-center font-mono font-black text-sm">
                02
              </div>
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#F0F0F0] border border-[#121212]">
                VIDEO SYNDICATE
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#121212] group-hover:text-[#D02020] transition-colors">
                Abdullah Masood Academy
              </h3>
              <p className="text-xs text-[#121212]/80 mt-1 font-medium leading-relaxed">
                52 structured video masterclasses across 6 curated playlists, the Daily Bias calculator, and the 10 Golden Execution Rules.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-black uppercase text-[#121212]">
              <span>Watch Masterclasses</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 3: Trading Lab Workbench */}
          <div 
            onClick={() => onEnterAcademy('tools')}
            className="bg-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] p-6 space-y-4 cursor-pointer hover:-translate-y-1 transition-transform group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#1040C0] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] flex items-center justify-center font-mono font-black text-sm">
                03
              </div>
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#F0F0F0] border border-[#121212]">
                INTERACTIVE LAB
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#121212] group-hover:text-[#1040C0] transition-colors">
                Trading Workbench
              </h3>
              <p className="text-xs text-[#121212]/80 mt-1 font-medium leading-relaxed">
                Step-by-step ChartLab, Execution Simulator, Monte Carlo Backtesting Engine, 7-point Trading Journal, and Concept Knowledge Graph.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-black uppercase text-[#1040C0]">
              <span>Launch Laboratory</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </main>

      {/* Bauhaus Footer */}
      <footer className="relative z-10 border-t-4 border-[#121212] bg-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D02020] border border-black" />
            <span className="font-black text-[#121212]">ICT // BAUHAUS DESIGN SYSTEM</span>
            <span className="text-[#121212]/40">|</span>
            <span className="text-[#121212]/70 font-bold">100% FREE &amp; OPEN EDUCATIONAL ARCHITECTURE</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onEnterAcademy('curriculum')}
              className="font-black text-[#121212] hover:text-[#D02020] uppercase underline cursor-pointer"
            >
              Curriculum
            </button>
            <button
              onClick={() => onEnterAcademy('masood')}
              className="font-black text-[#121212] hover:text-[#D02020] uppercase underline cursor-pointer"
            >
              Masood Academy
            </button>
            <button
              onClick={() => onEnterAcademy('tools')}
              className="font-black text-[#121212] hover:text-[#D02020] uppercase underline cursor-pointer"
            >
              Lab Workbench
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
