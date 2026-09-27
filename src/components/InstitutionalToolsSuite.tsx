import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calculator, 
  Compass, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Target, 
  Layers, 
  Flame, 
  Sparkles, 
  Zap, 
  BarChart3, 
  Timer, 
  ArrowRight,
  Info,
  Calendar,
  DollarSign,
  Percent
} from 'lucide-react';

export const InstitutionalToolsSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clock' | 'ote' | 'asian_planner' | 'learning_path' | 'glossary'>('clock');

  // --- 1. KILL ZONE & MACRO TIMES ENGINE ---
  const [currentEstTime, setCurrentEstTime] = useState<Date>(new Date());
  const [simulatedHour, setSimulatedHour] = useState<number | null>(null);
  const [simulatedMinute, setSimulatedMinute] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      // Calculate current New York (EST/EDT) time
      const now = new Date();
      const estString = now.toLocaleString("en-US", { timeZone: "America/New_York" });
      setCurrentEstTime(new Date(estString));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Effective time for analysis
  const effectiveDate = (() => {
    if (simulatedHour !== null && simulatedMinute !== null) {
      const d = new Date(currentEstTime);
      d.setHours(simulatedHour, simulatedMinute, 0, 0);
      return d;
    }
    return currentEstTime;
  })();

  const estHours = effectiveDate.getHours();
  const estMinutes = effectiveDate.getMinutes();
  const currentTotalMinutes = estHours * 60 + estMinutes;

  const killZones = [
    {
      id: 'asia',
      name: 'Asian Session & Range',
      timeStr: '20:00 - 00:00 EST (8:00 PM - 12:00 AM)',
      startMin: 20 * 60,
      endMin: 24 * 60,
      role: 'Consolidation & Boundary Establishment',
      desc: 'Smart money accumulates resting positions and establishes the benchmark high and low for London manipulation.',
      isSilverBullet: false,
      color: 'border-[#1040C0]'
    },
    {
      id: 'london_kz',
      name: 'London Killzone',
      timeStr: '02:00 - 05:00 EST (2:00 AM - 5:00 AM)',
      startMin: 2 * 60,
      endMin: 5 * 60,
      role: 'Judas Swing & Session Low/High Formation',
      desc: 'Creates the High or Low of the day in ~70% of trending profiles through an aggressive liquidity sweep of Asian boundaries.',
      isSilverBullet: false,
      color: 'border-[#D02020]'
    },
    {
      id: 'london_sb',
      name: 'London Silver Bullet Window',
      timeStr: '03:00 - 04:00 EST (3:00 AM - 4:00 AM)',
      startMin: 3 * 60,
      endMin: 4 * 60,
      role: 'Peak London Confluence Window',
      desc: 'The single highest-probability 60-minute window of the European session. Targets the First Presented FVG following the Asian sweep.',
      isSilverBullet: true,
      color: 'border-[#F0C020]'
    },
    {
      id: 'ny_am_kz',
      name: 'New York AM Killzone',
      timeStr: '07:00 - 10:00 EST (7:00 AM - 10:00 AM)',
      startMin: 7 * 60,
      endMin: 10 * 60,
      role: 'High-Impact News & Equities Cash Open',
      desc: '08:30 EST economic release injection followed by the 09:30 equities cash open. Massive volume and aggressive displacement.',
      isSilverBullet: false,
      color: 'border-[#1040C0]'
    },
    {
      id: 'ny_am_sb',
      name: 'New York AM Silver Bullet Window',
      timeStr: '10:00 - 11:00 EST (10:00 AM - 11:00 AM)',
      startMin: 10 * 60,
      endMin: 11 * 60,
      role: 'The 2022/Silver Bullet Delivery Leg',
      desc: 'The benchmark 10:00 AM macro activates. Fixed 10-15 handle delivery on NQ/ES seeking previous session extremes.',
      isSilverBullet: true,
      color: 'border-[#F0C020]'
    },
    {
      id: 'london_close',
      name: 'London Close Killzone',
      timeStr: '10:00 - 12:00 EST (10:00 AM - 12:00 PM)',
      startMin: 10 * 60,
      endMin: 12 * 60,
      role: 'European Books Squaring & Retracement',
      desc: 'London traders square intraday exposures. Often creates a counter-trend retracement before the afternoon NY continuation.',
      isSilverBullet: false,
      color: 'border-white/[0.08]'
    },
    {
      id: 'ny_pm_sb',
      name: 'London Close / NY PM Silver Bullet',
      timeStr: '14:00 - 15:00 EST (2:00 PM - 3:00 PM)',
      startMin: 14 * 60,
      endMin: 15 * 60,
      role: 'Afternoon Expansion / MOC Prep',
      desc: 'Afternoon institutional re-pricing into closing settlement. Offers clean FVG retests for the final daily leg.',
      isSilverBullet: true,
      color: 'border-[#F0C020]'
    },
    {
      id: 'ny_pm_kz',
      name: 'New York PM & Settle Killzone',
      timeStr: '13:30 - 16:00 EST (1:30 PM - 4:00 PM)',
      startMin: 13 * 60 + 30,
      endMin: 16 * 60,
      role: 'Afternoon Trend & Market on Close (MOC)',
      desc: 'Includes the 14:50-15:10 MOC macro and 15:50-16:00 closing cross auction. High institutional block matching.',
      isSilverBullet: false,
      color: 'border-[#1040C0]'
    }
  ];

  const macroWindows = [
    {
      id: 'm1',
      time: '02:33 - 03:00 EST',
      startMin: 2 * 60 + 33,
      endMin: 3 * 60,
      title: 'London Pre-Open Macro',
      instruction: 'Algorithms inject liquidity to sweep Asian High or Low, engineering the Judas swing before the 03:00 Silver Bullet opens.'
    },
    {
      id: 'm2',
      time: '08:50 - 09:10 EST',
      startMin: 8 * 60 + 50,
      endMin: 9 * 60 + 10,
      title: 'Pre-Market Equities Macro',
      instruction: 'Sets initial inventory before 09:30 cash open. Often mitigates into overnight FVG or tests opening gaps (NDOG/NWOG).'
    },
    {
      id: 'm3',
      time: '09:50 - 10:10 EST',
      startMin: 9 * 60 + 50,
      endMin: 10 * 60 + 10,
      title: 'Morning Silver Bullet Macro',
      instruction: 'Critical delivery macro. Sweeps initial 09:30 range high/low and shifts market structure, forming the primary Silver Bullet entry FVG.'
    },
    {
      id: 'm4',
      time: '10:50 - 11:10 EST',
      startMin: 10 * 60 + 50,
      endMin: 11 * 60 + 10,
      title: 'Late Morning Expansion Macro',
      instruction: 'Completes morning distribution leg or engineers high of the morning session before entering the midday lunch pause.'
    },
    {
      id: 'm5',
      time: '11:50 - 12:10 EST',
      startMin: 11 * 60 + 50,
      endMin: 12 * 60 + 10,
      title: 'London Fix & Midday Macro',
      instruction: 'European market fixes and benchmark pricing. London desks exit, leading to decreased volume and potential consolidation traps.'
    },
    {
      id: 'm6',
      time: '13:10 - 13:40 EST',
      startMin: 13 * 60 + 10,
      endMin: 13 * 60 + 40,
      title: 'Afternoon Resumption Macro',
      instruction: 'Post-lunch institutional return. Re-evaluates Daily Draw on Liquidity and initiates the second major trending wave of the day.'
    },
    {
      id: 'm7',
      time: '14:50 - 15:10 EST',
      startMin: 14 * 60 + 50,
      endMin: 15 * 60 + 10,
      title: 'Market on Close (MOC) Macro',
      instruction: 'Massive algorithmic order matching ahead of the 15:45/16:00 cash close. Rapid delivery into uncleared liquidity pools.'
    },
    {
      id: 'm8',
      time: '15:50 - 16:00 EST',
      startMin: 15 * 60 + 50,
      endMin: 16 * 60,
      title: 'Closing Auction Cross Macro',
      instruction: 'Final 10 minutes of equities trading. Settlement pricing determined. Never enter new directional swings here.'
    }
  ];

  // Active zone and macro detection
  const activeKillzones = killZones.filter(kz => {
    if (kz.startMin < kz.endMin) {
      return currentTotalMinutes >= kz.startMin && currentTotalMinutes < kz.endMin;
    } else {
      return currentTotalMinutes >= kz.startMin || currentTotalMinutes < kz.endMin;
    }
  });

  const activeMacro = macroWindows.find(m => currentTotalMinutes >= m.startMin && currentTotalMinutes < m.endMin);

  // Next macro window
  const nextMacro = macroWindows.find(m => m.startMin > currentTotalMinutes) || macroWindows[0];

  // --- 2. ICT OTE CALCULATOR (OPTIMAL TRADE ENTRY) ---
  const [oteAsset, setOteAsset] = useState<'NQ' | 'ES' | 'XAUUSD' | 'EURUSD' | 'BTC'>('NQ');
  const [oteDirection, setOteDirection] = useState<'bullish' | 'bearish'>('bullish');
  const [swingHigh, setSwingHigh] = useState<number>(20500);
  const [swingLow, setSwingLow] = useState<number>(20400);
  const [accountBalance, setAccountBalance] = useState<number>(25000);
  const [riskPercent, setRiskPercent] = useState<number>(1);

  // Presets
  const assetPresets = {
    NQ: { defaultHigh: 20500, defaultLow: 20400, tickSize: 0.25, pointValue: 20, name: 'Nasdaq 100 E-mini' },
    ES: { defaultHigh: 5850, defaultLow: 5820, tickSize: 0.25, pointValue: 50, name: 'S&P 500 E-mini' },
    XAUUSD: { defaultHigh: 2650, defaultLow: 2630, tickSize: 0.1, pointValue: 100, name: 'Gold Spot' },
    EURUSD: { defaultHigh: 1.0850, defaultLow: 1.0780, tickSize: 0.0001, pointValue: 100000, name: 'Euro / US Dollar' },
    BTC: { defaultHigh: 68000, defaultLow: 66000, tickSize: 1, pointValue: 1, name: 'Bitcoin / USD' }
  };

  const handleAssetSelect = (asset: 'NQ' | 'ES' | 'XAUUSD' | 'EURUSD' | 'BTC') => {
    setOteAsset(asset);
    setSwingHigh(assetPresets[asset].defaultHigh);
    setSwingLow(assetPresets[asset].defaultLow);
  };

  const range = Math.abs(swingHigh - swingLow);
  
  // OTE Levels
  // Bullish (Low to High retracing down):
  // 0.50 = High - range * 0.50
  // 0.618 = High - range * 0.618
  // 0.705 = High - range * 0.705 (Sweet Spot)
  // 0.790 = High - range * 0.790
  // Bearish (High to Low retracing up):
  // 0.50 = Low + range * 0.50
  // 0.618 = Low + range * 0.618
  // 0.705 = Low + range * 0.705 (Sweet Spot)
  // 0.790 = Low + range * 0.790
  const ote50 = oteDirection === 'bullish' ? swingHigh - range * 0.50 : swingLow + range * 0.50;
  const ote618 = oteDirection === 'bullish' ? swingHigh - range * 0.618 : swingLow + range * 0.618;
  const ote705 = oteDirection === 'bullish' ? swingHigh - range * 0.705 : swingLow + range * 0.705; // Institutional Sweet Spot
  const ote790 = oteDirection === 'bullish' ? swingHigh - range * 0.790 : swingLow + range * 0.790;
  const target1 = oteDirection === 'bullish' ? swingHigh + range * 0.27 : swingLow - range * 0.27; // -0.27 extension
  const target2 = oteDirection === 'bullish' ? swingHigh + range * 0.62 : swingLow - range * 0.62; // -0.62 extension

  const defaultStopLoss = oteDirection === 'bullish' ? swingLow - (range * 0.05) : swingHigh + (range * 0.05);
  const stopDistance = Math.abs(ote705 - defaultStopLoss);
  const dollarRisk = accountBalance * (riskPercent / 100);
  const pointValue = assetPresets[oteAsset].pointValue;
  const calculatedContracts = stopDistance > 0 && pointValue > 0 
    ? (dollarRisk / (stopDistance * pointValue)) 
    : 0;
  const targetDistance = Math.abs(target1 - ote705);
  const riskRewardRatio = stopDistance > 0 ? (targetDistance / stopDistance).toFixed(2) : '0';

  // --- 3. ASIAN RANGE & JUDAS SWING PLANNER ---
  const [asianHigh, setAsianHigh] = useState<number>(20450);
  const [asianLow, setAsianLow] = useState<number>(20400);
  const [midnightOpen, setMidnightOpen] = useState<number>(20425);

  const asianRangePips = Math.abs(asianHigh - asianLow);
  const asianMidpoint = (asianHigh + asianLow) / 2;

  // Standard deviation projections
  const sd15Bullish = asianHigh + asianRangePips * 1.5;
  const sd20Bullish = asianHigh + asianRangePips * 2.0;
  const sd25Bullish = asianHigh + asianRangePips * 2.5;

  const sd15Bearish = asianLow - asianRangePips * 1.5;
  const sd20Bearish = asianLow - asianRangePips * 2.0;
  const sd25Bearish = asianLow - asianRangePips * 2.5;

  const rangeTightness = asianRangePips < 30 ? 'TIGHT' : asianRangePips <= 60 ? 'NORMAL' : 'WIDE';

  // --- 4. 5-PHASE LEARNING PATH TRACKER ---
  const coursePhases = [
    {
      phase: 1,
      name: 'Foundation & Market Structure',
      articlesCount: 16,
      desc: 'Master the mechanical core of price: Order book auctions, liquidity dynamics, aggressive market orders, BOS, CHoCH, and true Market Structure Shift (MSS).',
      topics: [
        { id: 'p1_1', title: 'What is ICT Trading & How Exchanges Match Orders', completed: true },
        { id: 'p1_2', title: 'The Order Book: Passive Limits vs Aggressive Market Orders', completed: true },
        { id: 'p1_3', title: 'Why Candles Form: Time Containers & Displacement Origins', completed: true },
        { id: 'p1_4', title: 'Swings as Turning Points & The Principle of Significance', completed: true },
        { id: 'p1_5', title: 'Break of Structure (BOS) vs Change of Character (CHoCH)', completed: true },
        { id: 'p1_6', title: 'Market Structure Shift (MSS): Verified Trend Reversal', completed: true },
        { id: 'p1_7', title: 'CISD (Change in State of Delivery) vs MSS Mechanics', completed: false },
        { id: 'p1_8', title: 'Top-Down Market Structure Alignment: HTF to LTF', completed: false }
      ]
    },
    {
      phase: 2,
      name: 'Liquidity Engineering & Dealing Ranges',
      articlesCount: 10,
      desc: 'Understand why price moves: Buy-side liquidity (BSL), Sell-side liquidity (SSL), Internal vs External Range Liquidity, Liquidity Sweeps, and Double Purges.',
      topics: [
        { id: 'p2_1', title: 'Buy Side vs Sell Side Liquidity (Resting Stops)', completed: true },
        { id: 'p2_2', title: 'Equal Highs (EQH) & Equal Lows (EQL) Magnet Effect', completed: true },
        { id: 'p2_3', title: 'Liquidity Sweep vs Liquidity Run (Turtle Soup)', completed: true },
        { id: 'p2_4', title: 'Internal Range Liquidity (IRL) to External Range Liquidity (ERL)', completed: true },
        { id: 'p2_5', title: 'The Draw on Liquidity (DOL): Identifying Institutional Targets', completed: false },
        { id: 'p2_6', title: 'The ICT Double Purge: Dual-Sided Liquidity Clearing', completed: false },
        { id: 'p2_7', title: 'Inducement vs Significant Liquidity Pools', completed: false }
      ]
    },
    {
      phase: 3,
      name: 'PD Array Entry Toolkit & Imbalances',
      articlesCount: 12,
      desc: 'The institutional toolkit: Fair Value Gaps (FVG), Consequent Encroachment (50%), Order Blocks, Breaker Blocks, Suspension Blocks, RDRB, and Reaper iFVGs.',
      topics: [
        { id: 'p3_1', title: 'Fair Value Gaps (FVG) & Consequent Encroachment (50%)', completed: true },
        { id: 'p3_2', title: 'First Presented FVG: The Highest Probability Entry Rule', completed: true },
        { id: 'p3_3', title: 'Inversion Fair Value Gap (IFVG) Role-Reversal Rules', completed: true },
        { id: 'p3_4', title: 'ICT Reaper IFVG: The Inversion That Harvests Retail Entries', completed: false },
        { id: 'p3_5', title: 'Order Blocks (OB) & Mitigation Blocks', completed: true },
        { id: 'p3_6', title: 'ICT Breaker Blocks & The Unicorn Model Confluence', completed: true },
        { id: 'p3_7', title: 'ICT Suspension Block: The OB Hanging Between Liquidity Pools', completed: false },
        { id: 'p3_8', title: 'Balanced Price Range (BPR) & ICT RDRB (Redelivered BPR)', completed: false },
        { id: 'p3_9', title: 'ICT Hangman PD Array: Wick Rejection Confirmation Setup', completed: false },
        { id: 'p3_10', title: 'Volume Imbalance (VI) & Opening Gaps (NDOG/NWOG)', completed: false }
      ]
    },
    {
      phase: 4,
      name: 'Institutional Execution Models & Sessions',
      articlesCount: 9,
      desc: 'Trading the market on schedule: 2022 Mentorship Model, Silver Bullet Strategy, Venom Model, Candle Range Theory (CRT), Sick Sister, and MMXM cycles.',
      topics: [
        { id: 'p4_1', title: 'The ICT 2022 Mentorship Model: Sweep, Displacement, FVG', completed: true },
        { id: 'p4_2', title: 'The ICT Silver Bullet Strategy: 60-Minute Precision Windows', completed: true },
        { id: 'p4_3', title: 'The ICT Venom Model: 2025 Five-Stage Delivery Framework', completed: false },
        { id: 'p4_4', title: 'Candle Range Theory (CRT) & Pre-Session Preparation', completed: false },
        { id: 'p4_5', title: 'ICT Sick Sister Strategy: Trading Correlated Divergence', completed: false },
        { id: 'p4_6', title: 'Market Maker Models (MMBM / MMSM) & Curve Cycles', completed: false },
        { id: 'p4_7', title: 'Killzone & Silver Bullet Peak Confluence Overlaps', completed: false }
      ]
    },
    {
      phase: 5,
      name: 'Risk, Macro Timing & Psychology',
      articlesCount: 4,
      desc: 'Execution discipline: The 4-Pillar Daily Bias framework, IPDA 20/40/60 day lookback ranges, and the 8 algorithmic macro time injection windows.',
      topics: [
        { id: 'p5_1', title: 'The 4-Pillar Daily Bias Framework: HTF Liquidity & Trend', completed: true },
        { id: 'p5_2', title: 'IPDA 20, 40, 60-Day Lookback Data Ranges & Dealing Ranges', completed: false },
        { id: 'p5_3', title: 'The 8 Institutional Algorithmic Macro Windows Schedule', completed: false },
        { id: 'p5_4', title: 'Quarterly Shifts (90-Min & Seasonal Cycles) and Settle Rules', completed: false }
      ]
    }
  ];

  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({
    p1_1: true, p1_2: true, p1_3: true, p1_4: true, p1_5: true, p1_6: true,
    p2_1: true, p2_2: true, p2_3: true, p2_4: true,
    p3_1: true, p3_2: true, p3_3: true, p3_5: true, p3_6: true,
    p4_1: true, p4_2: true,
    p5_1: true
  });

  const toggleTopic = (id: string) => {
    setCompletedTopics(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalTopics = coursePhases.reduce((acc, p) => acc + p.topics.length, 0);
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const overallProgress = Math.round((completedCount / totalTopics) * 100);

  // --- 5. COMPREHENSIVE ICT GLOSSARY & ABBREVIATIONS ---
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('all');

  const glossaryItems = [
    { abbr: 'AMD', full: 'Accumulation, Manipulation, Distribution', cat: 'Price Action', desc: 'The Power of Three (PO3) cycle describing how algorithmic market makers engineer liquidity before expanding to targets.' },
    { abbr: 'BISI', full: 'Buy-side Imbalance Sell-side Inefficiency', cat: 'Imbalance', desc: 'A bullish Fair Value Gap formed when rapid buying leaves an imbalance without two-sided sell liquidity.' },
    { abbr: 'BOS', full: 'Break of Structure', cat: 'Structure', desc: 'A trend-continuation candle close beyond a previous swing high in an uptrend or swing low in a downtrend.' },
    { abbr: 'BPR', full: 'Balanced Price Range', cat: 'Imbalance', desc: 'A price zone defined by overlapping opposing Fair Value Gaps that demonstrates two-sided institutional balance.' },
    { abbr: 'BSL', full: 'Buy-Side Liquidity', cat: 'Liquidity', desc: 'Resting buy stop orders accumulated above old swing highs, equal highs, or session extremes.' },
    { abbr: 'CE', full: 'Consequent Encroachment', cat: 'PD Array', desc: 'The exact 50% midpoint of a Fair Value Gap, Volume Imbalance, or wick. Primary institutional mitigation target.' },
    { abbr: 'CHoCH', full: 'Change of Character', cat: 'Structure', desc: 'The first break of a minor counter-trend swing signaling that the internal order flow may be halting or reversing.' },
    { abbr: 'CISD', full: 'Change in State of Delivery', cat: 'Structure', desc: 'The earliest algorithmic indication that price delivery has flipped program (e.g. buy program to sell program), marked by candle body closes through the opposing sequence.' },
    { abbr: 'CRT', full: 'Candle Range Theory', cat: 'Models', desc: 'A framework where a pre-session Reference Candle boundary is swept (manipulation) before price mitigates and delivers towards the opposite extreme.' },
    { abbr: 'DOL', full: 'Draw on Liquidity', cat: 'Price Action', desc: 'The magnet price level or liquidity pool that the institutional algorithm is seeking to tap before concluding a delivery wave.' },
    { abbr: 'EQL / EQH', full: 'Equal Lows / Equal Highs', cat: 'Liquidity', desc: 'Engineered liquidity pools resting at identical horizontal levels designed to attract retail breakout and stop orders.' },
    { abbr: 'FVG', full: 'Fair Value Gap', cat: 'Imbalance', desc: 'A three-candle price imbalance where candle 1 wick and candle 3 wick do not overlap, leaving untraded volume in candle 2.' },
    { abbr: 'HRLR', full: 'High Resistance Liquidity Run', cat: 'Price Action', desc: 'Price action moving into dense, messy structure where every swing creates hesitation and long wicks (avoid trading).' },
    { abbr: 'IDM', full: 'Inducement', cat: 'Liquidity', desc: 'A minor swing point engineered to lure impatient retail traders into taking positions right before their stops are swept.' },
    { abbr: 'IFVG', full: 'Inversion Fair Value Gap', cat: 'Imbalance', desc: 'A Fair Value Gap that is violently broken with displacement, flipping its role from support to resistance or vice-versa.' },
    { abbr: 'IPDA', full: 'Interbank Price Delivery Algorithm', cat: 'Price Action', desc: 'The institutional computer algorithm that moves price between liquidity pools and rebalances inefficiencies.' },
    { abbr: 'Judas Swing', full: 'Judas Swing Manipulation', cat: 'Sessions', desc: 'A false directional break during the London or New York open that sweeps retail stops before the genuine trend launches.' },
    { abbr: 'KZ', full: 'Killzone', cat: 'Sessions', desc: 'Specific high-volatility time windows (Asia, London, New York AM/PM) when institutional order matching occurs.' },
    { abbr: 'LRLR', full: 'Low Resistance Liquidity Run', cat: 'Price Action', desc: 'Clean, rapid displacement moving through obvious stops with minimal counter-trend wicks or pauses (ideal trading regime).' },
    { abbr: 'MMBM', full: 'Market Maker Buy Model', cat: 'Models', desc: 'A complete curve cycle: Original Consolidation -> Sell-Side Delivery -> Smart Money Reversal -> Buy-Side Expansion back to the original consolidation.' },
    { abbr: 'MMSM', full: 'Market Maker Sell Model', cat: 'Models', desc: 'A complete curve cycle: Original Consolidation -> Buy-Side Delivery -> Smart Money Reversal -> Sell-Side Expansion back to origin.' },
    { abbr: 'MOC', full: 'Market on Close', cat: 'Sessions', desc: 'The 14:50 - 15:10 EST macro window where mutual funds and institutions square benchmark positions before the 16:00 close.' },
    { abbr: 'MSS', full: 'Market Structure Shift', cat: 'Structure', desc: 'A decisive displacement close through a significant swing point confirming that the trend direction has reversed.' },
    { abbr: 'NDOG', full: 'New Day Opening Gap', cat: 'PD Array', desc: 'The price gap between the 17:00 EST daily close and 18:00 EST daily restart in futures. Acts as a persistent support/resistance magnet.' },
    { abbr: 'NWOG', full: 'New Week Opening Gap', cat: 'PD Array', desc: 'The gap between Friday 17:00 EST close and Sunday 18:00 EST open. Primary multi-session institutional anchor.' },
    { abbr: 'OB', full: 'Order Block', cat: 'PD Array', desc: 'The last opposing candle prior to a strong displacement move that created a Market Structure Shift or swept liquidity.' },
    { abbr: 'OTE', full: 'Optimal Trade Entry', cat: 'PD Array', desc: 'Fibonacci retracement level between 0.618 and 0.790, with 0.705 being the institutional sweet spot entry.' },
    { abbr: 'RDRB', full: 'Redelivered Balanced Price Range', cat: 'PD Array', desc: 'When a Balanced Price Range (BPR) is revisited and defended a second time without violating consequent encroachment.' },
    { abbr: 'Reaper iFVG', full: 'Reaper Inversion Fair Value Gap', cat: 'Imbalance', desc: 'An inversion-of-inversion trap where an apparent IFVG lures retail breakout traders before re-inverting violently in the true direction.' },
    { abbr: 'SB', full: 'Silver Bullet', cat: 'Models', desc: 'A mechanical 60-minute entry window (03:00-04:00, 10:00-11:00, 14:00-15:00 EST) targeting 10-15 handles off the first presented FVG.' },
    { abbr: 'SIBI', full: 'Sell-side Imbalance Buy-side Inefficiency', cat: 'Imbalance', desc: 'A bearish Fair Value Gap created by rapid downward selling leaving untraded buying liquidity.' },
    { abbr: 'SMT', full: 'Smart Money Technique (Divergence)', cat: 'Price Action', desc: 'Non-confirmation between correlated assets (e.g. NQ makes higher high while ES makes lower high) indicating institutional manipulation.' },
    { abbr: 'SSL', full: 'Sell-Side Liquidity', cat: 'Liquidity', desc: 'Resting sell stop orders accumulated below old swing lows, equal lows, or session support levels.' },
    { abbr: 'Suspension Block', full: 'ICT Suspension Block', cat: 'PD Array', desc: 'An Order Block hanging suspended between internal and external liquidity pools where price pauses before continuing expansion.' },
    { abbr: 'Turtle Soup', full: 'Turtle Soup Reversal', cat: 'Models', desc: 'A false breakout setup where price sweeps a key high or low by a few ticks and immediately reverses back inside the range.' },
    { abbr: 'Unicorn Model', full: 'Breaker + FVG Confluence', cat: 'Models', desc: 'The highest probability ICT entry model combining a Breaker Block overlapping with a Fair Value Gap at the same price zone.' },
    { abbr: 'Venom Model', full: 'ICT Venom Model (2025 Framework)', cat: 'Models', desc: 'A five-stage delivery framework combining MMXM, CRT candle targeting, SMT divergence at manipulation extremes, and First Presented FVG entries.' },
    { abbr: 'VI', full: 'Volume Imbalance', cat: 'Imbalance', desc: 'An imbalance between candle bodies where wicks overlap but the bodies leave a small untraded price gap.' }
  ];

  const filteredGlossary = glossaryItems.filter(item => {
    const matchesSearch = item.abbr.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.full.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.desc.toLowerCase().includes(glossarySearch.toLowerCase());
    const matchesCat = glossaryCategory === 'all' || item.cat === glossaryCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#11141B] border border-white/[0.08] p-6 rounded-2xl text-[#F5F7FA]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-[#FF6B7A] text-white text-[10px] font-mono font-black uppercase tracking-wider border border-white/[0.08]">
                INSTITUTIONAL TOOLKIT 2026
              </span>
              <span className="text-xs font-mono font-bold text-[#656B78] uppercase">
                THE INNER CIRCLE TRADER BENCHMARK SUITE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#F5F7FA] tracking-tight">
              INSTITUTIONAL DELIVERY &amp; EXECUTION SUITE
            </h1>
            <p className="text-sm text-[#9BA1AE] mt-1 max-w-3xl">
              Official precision tools synthesized from <span className="font-bold underline text-[#5865FF]">theinnercircletraders.com</span>. Calculate institutional OTE retracements, forecast Asian Judas swings, monitor the 8 algorithmic macro windows in real-time, and track your 5-phase mentorship roadmap.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#151923] border border-white/[0.08] rounded-xl p-2 self-start lg:self-auto">
            <Clock className="w-5 h-5 text-[#5865FF] animate-pulse" />
            <div className="font-mono text-xs">
              <div className="font-bold text-[#F5F7FA]">NEW YORK EST CLOCK</div>
              <div className="text-[#5865FF] font-black text-sm">
                {effectiveDate.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false })} EST
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 border-t-2 border-white/[0.08] pt-4">
          <button
            onClick={() => setActiveTab('clock')}
            className={`px-3 py-2.5 text-xs font-mono font-black uppercase tracking-wider border border-white/[0.08] flex items-center justify-center gap-2 transition-all ${
              activeTab === 'clock' ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20 shadow-sm' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.04]'
            }`}
          >
            <Timer className="w-4 h-4" />
            Killzone &amp; Macros
          </button>

          <button
            onClick={() => setActiveTab('ote')}
            className={`px-3 py-2.5 text-xs font-mono font-black uppercase tracking-wider border border-white/[0.08] flex items-center justify-center gap-2 transition-all ${
              activeTab === 'ote' ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20 shadow-sm' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.04]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            OTE Calculator
          </button>

          <button
            onClick={() => setActiveTab('asian_planner')}
            className={`px-3 py-2.5 text-xs font-mono font-black uppercase tracking-wider border border-white/[0.08] flex items-center justify-center gap-2 transition-all ${
              activeTab === 'asian_planner' ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20 shadow-sm' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.04]'
            }`}
          >
            <Compass className="w-4 h-4" />
            Asian Range Planner
          </button>

          <button
            onClick={() => setActiveTab('learning_path')}
            className={`px-3 py-2.5 text-xs font-mono font-black uppercase tracking-wider border border-white/[0.08] flex items-center justify-center gap-2 transition-all ${
              activeTab === 'learning_path' ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20 shadow-sm' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.04]'
            }`}
          >
            <Target className="w-4 h-4" />
            5-Phase Roadmap
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-3 py-2.5 text-xs font-mono font-black uppercase tracking-wider border border-white/[0.08] flex items-center justify-center gap-2 transition-all ${
              activeTab === 'glossary' ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20 shadow-sm' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.04]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            A-Z Glossary
          </button>
        </div>
      </div>

      {/* --- TAB 1: KILL ZONE TIMER & MACRO CLOCK --- */}
      {activeTab === 'clock' && (
        <div className="space-y-6">
          
          {/* Active Macro Alert Banner */}
          <div className={`border border-white/[0.08] p-5  ${
            activeMacro ? 'bg-[#5865FF]/15 border-[#5865FF]/30 text-[#F5F7FA]' : 'bg-[#151923] border-white/[0.06] text-[#F5F7FA]'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] text-white flex items-center justify-center shrink-0 border border-white/[0.08]">
                  <Flame className={`w-6 h-6 ${activeMacro ? 'text-[#F0C020] animate-bounce' : 'text-white'}`} />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-black uppercase tracking-wider">
                    {activeMacro ? '🚨 ALGORITHMIC MACRO INJECTION IN PROGRESS' : 'STATUS: MACRO DORMANT'}
                  </div>
                  <h3 className="text-xl font-black uppercase">
                    {activeMacro ? activeMacro.title : 'Market In Standard Inter-Macro Order Flow'}
                  </h3>
                  <p className="text-xs font-mono mt-0.5">
                    {activeMacro ? activeMacro.instruction : `Next Macro Window: ${nextMacro.title} at ${nextMacro.time}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs font-mono px-3 py-1 bg-white/[0.04] text-[#9BA1AE] rounded-lg uppercase border border-white/[0.08]">
                  {activeKillzones.length > 0 
                    ? `ACTIVE KZ: ${activeKillzones.map(k => k.name).join(' & ')}` 
                    : 'INTER-SESSION'}
                </span>
              </div>
            </div>
          </div>

          {/* Time Scrubber / Simulation Controls */}
          <div className="bg-[#151923] border border-white/[0.06] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#5865FF]" />
              <span className="text-xs font-mono font-bold uppercase">Time Simulator:</span>
              <span className="text-xs font-mono text-[#9BA1AE]">
                {simulatedHour !== null ? 'Simulated Time Active' : 'Live Real-Time Active'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { setSimulatedHour(null); setSimulatedMinute(null); }}
                className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border border-white/[0.08] ${
                  simulatedHour === null ? 'bg-[#5865FF] text-white' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06]'
                }`}
              >
                LIVE REAL-TIME
              </button>
              <button
                onClick={() => { setSimulatedHour(2); setSimulatedMinute(45); }}
                className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border border-white/[0.08] ${
                  simulatedHour === 2 ? 'bg-[#FF6B7A] text-white' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06]'
                }`}
              >
                02:45 London Macro
              </button>
              <button
                onClick={() => { setSimulatedHour(9); setSimulatedMinute(55); }}
                className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border border-white/[0.08] ${
                  simulatedHour === 9 ? 'bg-[#55E6D1] text-[#08090D]' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06]'
                }`}
              >
                09:55 AM Silver Bullet
              </button>
              <button
                onClick={() => { setSimulatedHour(14); setSimulatedMinute(55); }}
                className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border border-white/[0.08] ${
                  simulatedHour === 14 ? 'bg-[#5865FF] text-white' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06]'
                }`}
              >
                14:55 MOC Macro
              </button>
            </div>
          </div>

          {/* Killzones Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black uppercase text-[#F5F7FA] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FF6B7A]" />
                Institutional Killzones &amp; Silver Bullet Overlaps
              </h3>
              <span className="text-xs font-mono text-[#656B78]">EST New York Timezone</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {killZones.map(kz => {
                const isActive = activeKillzones.some(a => a.id === kz.id);
                return (
                  <div
                    key={kz.id}
                    className={`border rounded-xl p-4 bg-[#151923] border-white/[0.08] transition-all ${
                      isActive 
                        ? ' -translate-y-1 ring-2 ring-[#D02020]' 
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-white/[0.08] ${
                        isActive ? 'bg-[#FF6B7A] text-white animate-pulse' : 'bg-white/[0.03] text-[#F5F7FA]'
                      }`}>
                        {isActive ? '● IN SESSION' : 'CLOSED'}
                      </span>
                      {kz.isSilverBullet && (
                        <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 bg-white/[0.06] text-[#F0B35B] text-[#F5F7FA] border border-white/[0.08]">
                          SILVER BULLET
                        </span>
                      )}
                    </div>

                    <h4 className="font-black text-sm uppercase text-[#F5F7FA] leading-tight">
                      {kz.name}
                    </h4>
                    <div className="text-xs font-mono text-[#5865FF] font-bold mt-1">
                      {kz.timeStr}
                    </div>
                    <div className="text-[11px] font-mono font-semibold text-[#9BA1AE] mt-2">
                      Role: {kz.role}
                    </div>
                    <p className="text-xs text-[#9BA1AE] mt-1 leading-relaxed">
                      {kz.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Algorithmic Macro Windows Schedule */}
          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-black uppercase text-[#F5F7FA] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#5865FF]" />
              The 8 Exact Algorithmic Macro Delivery Windows
            </h3>
            
            <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl text-[#F5F7FA] overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-[#0C0E13] text-[#9BA1AE] uppercase border-b border-white/[0.08]">
                    <th className="p-3 border-r border-white/20">Macro Window</th>
                    <th className="p-3 border-r border-white/20">EST Time Window</th>
                    <th className="p-3 border-r border-white/20">Algorithmic Function</th>
                    <th className="p-3">Execution Directive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {macroWindows.map((m, idx) => {
                    const isRunning = currentTotalMinutes >= m.startMin && currentTotalMinutes < m.endMin;
                    return (
                      <tr 
                        key={m.id}
                        className={isRunning ? 'bg-[#5865FF]/15 text-[#F5F7FA] font-medium' : idx % 2 === 0 ? 'bg-[#11141B]' : 'bg-[#151923]'}
                      >
                        <td className="p-3 font-black text-sm border-r-2 border-white/[0.08] flex items-center gap-2">
                          {isRunning && <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B7A] animate-ping" />}
                          {m.title}
                        </td>
                        <td className="p-3 text-[#5865FF] font-black border-r-2 border-white/[0.08] whitespace-nowrap">
                          {m.time}
                        </td>
                        <td className="p-3 border-r-2 border-white/[0.08] text-[#F5F7FA]/90">
                          {m.instruction}
                        </td>
                        <td className="p-3 text-[#F5F7FA]">
                          {isRunning ? (
                            <span className="px-2 py-0.5 bg-[#FF6B7A] text-white font-black uppercase text-[10px]">
                              ACTIVE EXECUTION WINDOW
                            </span>
                          ) : (
                            <span className="text-[#656B78]">Wait for timing window</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* --- TAB 2: ICT OTE CALCULATOR --- */}
      {activeTab === 'ote' && (
        <div className="space-y-6">
          <div className="bg-[#11141B] border border-white/[0.08] p-6 rounded-2xl text-[#F5F7FA]">
            <div className="border-b-2 border-white/[0.08] pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#FF6B7A] text-white border border-white/[0.08]">
                  OPTIMAL TRADE ENTRY (OTE) ENGINE
                </span>
                <h2 className="text-2xl font-black uppercase text-[#F5F7FA] mt-1">
                  Institutional Fibonacci &amp; Position Size Calculator
                </h2>
                <p className="text-xs text-[#9BA1AE] mt-0.5">
                  Calculates institutional retracement levels (0.618, 0.705 Sweet Spot, 0.790 Deep Retracement) and -0.27 / -0.62 expansion targets.
                </p>
              </div>

              {/* Direction Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOteDirection('bullish')}
                  className={`px-4 py-2 text-xs font-mono font-black uppercase border border-white/[0.08] flex items-center gap-1.5 transition-all ${
                    oteDirection === 'bullish' ? 'bg-[#5865FF] text-white rounded-lg shadow-sm' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] rounded-lg'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Bullish Long (Discount OTE)
                </button>
                <button
                  onClick={() => setOteDirection('bearish')}
                  className={`px-4 py-2 text-xs font-mono font-black uppercase border border-white/[0.08] flex items-center gap-1.5 transition-all ${
                    oteDirection === 'bearish' ? 'bg-[#FF6B7A] text-white rounded-lg shadow-sm' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] rounded-lg'
                  }`}
                >
                  <TrendingDown className="w-4 h-4" />
                  Bearish Short (Premium OTE)
                </button>
              </div>
            </div>

            {/* Asset Selection Bar */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-mono font-bold uppercase mr-2">Select Instrument:</span>
              {(['NQ', 'ES', 'XAUUSD', 'EURUSD', 'BTC'] as const).map(asset => (
                <button
                  key={asset}
                  onClick={() => handleAssetSelect(asset)}
                  className={`px-3 py-1.5 text-xs font-mono font-black uppercase border border-white/[0.08] ${
                    oteAsset === asset ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20 rounded-lg' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] rounded-lg'
                  }`}
                >
                  {asset} ({assetPresets[asset].name})
                </button>
              ))}
            </div>

            {/* Inputs & Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#151923] border border-white/[0.06] rounded-xl p-4">
                <label className="text-xs font-mono font-black uppercase block mb-1 text-[#F5F7FA]">
                  {oteDirection === 'bullish' ? 'Swing High (Run High)' : 'Swing High (Origin High)'}
                </label>
                <input
                  type="number"
                  step="any"
                  value={swingHigh}
                  onChange={(e) => setSwingHigh(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA] p-2 font-mono text-base font-black text-[#F5F7FA] focus:outline-none"
                />
                <span className="text-[10px] font-mono text-[#656B78] mt-1 block">Top of the dealing range</span>
              </div>

              <div className="bg-[#151923] border border-white/[0.06] rounded-xl p-4">
                <label className="text-xs font-mono font-black uppercase block mb-1 text-[#F5F7FA]">
                  {oteDirection === 'bullish' ? 'Swing Low (Origin Low)' : 'Swing Low (Run Low)'}
                </label>
                <input
                  type="number"
                  step="any"
                  value={swingLow}
                  onChange={(e) => setSwingLow(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA] p-2 font-mono text-base font-black text-[#F5F7FA] focus:outline-none"
                />
                <span className="text-[10px] font-mono text-[#656B78] mt-1 block">Bottom of the dealing range</span>
              </div>

              <div className="bg-[#151923] border border-white/[0.06] rounded-xl p-4">
                <label className="text-xs font-mono font-black uppercase block mb-1 text-[#F5F7FA]">
                  Account Balance ($)
                </label>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA] p-2 font-mono text-base font-black text-[#F5F7FA] focus:outline-none"
                />
                <span className="text-[10px] font-mono text-[#656B78] mt-1 block">Trading capital</span>
              </div>

              <div className="bg-[#151923] border border-white/[0.06] rounded-xl p-4">
                <label className="text-xs font-mono font-black uppercase block mb-1 text-[#F5F7FA]">
                  Risk Percent (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA] p-2 font-mono text-base font-black text-[#F5F7FA] focus:outline-none"
                />
                <span className="text-[10px] font-mono text-[#656B78] mt-1 block">Max 1-2% recommended</span>
              </div>
            </div>

            {/* Calculations & Fib Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Fib Matrix Table */}
              <div className="border border-white/[0.08] bg-[#151923] rounded-2xl p-5">
                <h3 className="font-black text-sm uppercase text-[#F5F7FA] mb-3 flex items-center gap-2 border-b-2 border-white/[0.08] pb-2">
                  <BarChart3 className="w-4 h-4 text-[#5865FF]" />
                  Algorithmic Price Matrix (Fibonacci Levels)
                </h3>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 bg-[#151923] border border-white/[0.08]">
                    <span className="font-bold">Target 2 Expansion (-0.620)</span>
                    <span className="font-black text-[#5865FF]">{target2.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#151923] border border-white/[0.08]">
                    <span className="font-bold">Target 1 Expansion (-0.270)</span>
                    <span className="font-black text-[#5865FF]">{target1.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/[0.03] border border-white/[0.08]">
                    <span className="font-bold">{oteDirection === 'bullish' ? '1.000 Swing High' : '0.000 Swing Low'}</span>
                    <span className="font-black">{(oteDirection === 'bullish' ? swingHigh : swingLow).toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#11141B] rounded-lg border border-white/[0.06]">
                    <span className="font-bold text-[#9BA1AE]">0.500 Equilibrium (50%)</span>
                    <span className="font-black">{ote50.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#11141B] rounded-lg border border-white/[0.06]">
                    <span className="font-bold text-[#9BA1AE]">0.618 Fib Retracement</span>
                    <span className="font-black">{ote618.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#5865FF]/15 border border-[#5865FF]/30 rounded-lg text-[#F5F7FA]">
                    <span className="font-black flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#F5F7FA]" />
                      0.705 Institutional Sweet Spot (OTE Entry)
                    </span>
                    <span className="font-black text-sm">{ote705.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#151923] border border-white/[0.08]">
                    <span className="font-bold">0.790 Deep Retrace / Stop Hunt</span>
                    <span className="font-black">{ote790.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/[0.03] border border-white/[0.08]">
                    <span className="font-bold">{oteDirection === 'bullish' ? '0.000 Swing Low (Invalidation)' : '1.000 Swing High (Invalidation)'}</span>
                    <span className="font-black text-[#FF6B7A]">{(oteDirection === 'bullish' ? swingLow : swingHigh).toFixed(4)}</span>
                  </div>
                </div>
              </div>

              {/* Execution Summary & Position Sizing */}
              <div className="border border-white/[0.08] bg-[#151923] p-5  space-y-4">
                <h3 className="font-black text-sm uppercase text-[#F5F7FA] border-b-2 border-white/[0.08] pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF6B7A]" />
                  Execution &amp; Risk Metrics
                </h3>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA]">
                    <div className="text-[10px] uppercase font-bold text-[#656B78]">Max Dollar Risk</div>
                    <div className="text-lg font-black text-[#FF6B7A]">${dollarRisk.toFixed(2)}</div>
                  </div>
                  <div className="p-3 bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA]">
                    <div className="text-[10px] uppercase font-bold text-[#656B78]">Risk-to-Reward (TP1)</div>
                    <div className="text-lg font-black text-[#5865FF]">1 : {riskRewardRatio}</div>
                  </div>
                  <div className="p-3 bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA]">
                    <div className="text-[10px] uppercase font-bold text-[#656B78]">Stop Distance</div>
                    <div className="text-lg font-black text-[#F5F7FA]">{stopDistance.toFixed(2)} pts</div>
                  </div>
                  <div className="p-3 bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA]">
                    <div className="text-[10px] uppercase font-bold text-[#656B78]">Suggested Sizing</div>
                    <div className="text-lg font-black text-[#5865FF]">
                      {calculatedContracts.toFixed(2)} {oteAsset === 'NQ' || oteAsset === 'ES' ? 'Contracts' : 'Lots'}
                    </div>
                  </div>
                </div>

                <div className="bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA] p-4 text-xs space-y-2">
                  <div className="font-mono font-bold uppercase text-[#F5F7FA]">Trading Directive:</div>
                  <p className="text-[#9BA1AE] leading-relaxed">
                    Place Limit Order at <strong className="text-[#5865FF] font-mono">{ote705.toFixed(4)}</strong> (0.705 Sweet Spot). Set initial Stop Loss at <strong className="text-[#FF6B7A] font-mono">{defaultStopLoss.toFixed(4)}</strong>. First partial profit taking at <strong className="text-[#5865FF] font-mono">{target1.toFixed(4)}</strong> (-0.27 extension).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: ASIAN RANGE & JUDAS SWING PLANNER --- */}
      {activeTab === 'asian_planner' && (
        <div className="space-y-6">
          <div className="bg-[#11141B] border border-white/[0.08] p-6 rounded-2xl text-[#F5F7FA]">
            <div className="border-b-2 border-white/[0.08] pb-4 mb-6">
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-white/[0.06] text-[#F0B35B] text-[#F5F7FA] border border-white/[0.08]">
                SESSION RANGE FORECASTER
              </span>
              <h2 className="text-2xl font-black uppercase text-[#F5F7FA] mt-1">
                Asian Range &amp; London Judas Swing Planner
              </h2>
              <p className="text-xs text-[#9BA1AE] mt-0.5">
                Evaluates Asian session volatility, marks benchmark liquidity boundaries, and projects 1.5x, 2.0x, 2.5x standard deviation expansion targets.
              </p>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#151923] border border-white/[0.06] rounded-xl p-4">
                <label className="text-xs font-mono font-black uppercase block mb-1 text-[#F5F7FA]">
                  Asian Session High (20:00-00:00 EST)
                </label>
                <input
                  type="number"
                  step="any"
                  value={asianHigh}
                  onChange={(e) => setAsianHigh(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA] p-2 font-mono text-base font-black text-[#F5F7FA] focus:outline-none"
                />
              </div>

              <div className="bg-[#151923] border border-white/[0.06] rounded-xl p-4">
                <label className="text-xs font-mono font-black uppercase block mb-1 text-[#F5F7FA]">
                  Asian Session Low (20:00-00:00 EST)
                </label>
                <input
                  type="number"
                  step="any"
                  value={asianLow}
                  onChange={(e) => setAsianLow(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA] p-2 font-mono text-base font-black text-[#F5F7FA] focus:outline-none"
                />
              </div>

              <div className="bg-[#151923] border border-white/[0.06] rounded-xl p-4">
                <label className="text-xs font-mono font-black uppercase block mb-1 text-[#F5F7FA]">
                  Midnight Open (00:00 EST)
                </label>
                <input
                  type="number"
                  step="any"
                  value={midnightOpen}
                  onChange={(e) => setMidnightOpen(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#151923] border border-white/[0.08] rounded-xl text-[#F5F7FA] p-2 font-mono text-base font-black text-[#F5F7FA] focus:outline-none"
                />
              </div>
            </div>

            {/* Range Classification Banner */}
            <div className="bg-[#0C0E13] text-[#F5F7FA] p-4 border border-white/[0.08] rounded-xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] text-[#55E6D1] font-bold text-xs flex items-center justify-center border border-white/10">
                  {asianRangePips.toFixed(1)}
                </div>
                <div>
                  <div className="text-[10px] text-white/60 uppercase">Asian Range Magnitude</div>
                  <div className="text-sm font-black">
                    RANGE STATUS: {rangeTightness} ({asianRangePips.toFixed(1)} PTS / PIPS)
                  </div>
                </div>
              </div>

              <div className="text-xs text-right text-white/80">
                {rangeTightness === 'TIGHT' && '🔥 Tight consolidation: Expect high-probability explosive London Judas expansion.'}
                {rangeTightness === 'NORMAL' && '✅ Standard distribution: Classic Judas swing manipulation expected in London Open.'}
                {rangeTightness === 'WIDE' && '⚠️ Wide range: Risk of consolidation / High Resistance Liquidity Run (HRLR).'}
              </div>
            </div>

            {/* Standard Deviation Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bullish Scenario */}
              <div className="border border-[#55E6D1]/30 bg-[#151923] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3 border-b-2 border-[#1040C0] pb-2">
                  <h3 className="font-black text-sm uppercase text-[#5865FF] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    Bullish Judas Swing Blueprint
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#5865FF] text-white font-bold">SCENARIO A</span>
                </div>

                <div className="text-xs space-y-2 mb-4 text-[#9BA1AE]">
                  <p><strong>Judas Sweep:</strong> Price drops below Asian Low (<span className="font-mono font-bold text-[#FF6B7A]">{asianLow.toFixed(2)}</span>) between 02:00 - 05:00 EST.</p>
                  <p><strong>Confirmation:</strong> CISD / MSS prints upward into London Silver Bullet (03:00-04:00 EST).</p>
                  <p><strong>Target:</strong> Asian High (<span className="font-mono font-bold">{asianHigh.toFixed(2)}</span>) and Bullish Standard Deviations.</p>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between p-2 bg-white/[0.03] border border-white/[0.08]">
                    <span>+2.5 Std Dev Expansion</span>
                    <span className="font-black text-[#5865FF]">{sd25Bullish.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#5865FF]/10 border border-[#1040C0]">
                    <span className="font-bold">+2.0 Std Dev Target (Primary)</span>
                    <span className="font-black text-[#5865FF]">{sd20Bullish.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white/[0.03] border border-white/[0.08]">
                    <span>+1.5 Std Dev Expansion</span>
                    <span className="font-black text-[#5865FF]">{sd15Bullish.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#151923] border border-white/[0.08]">
                    <span className="font-bold">Asian High (BSL Sweep)</span>
                    <span className="font-black">{asianHigh.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Bearish Scenario */}
              <div className="border border-[#FF6B7A]/30 bg-[#151923] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3 border-b-2 border-[#D02020] pb-2">
                  <h3 className="font-black text-sm uppercase text-[#FF6B7A] flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" />
                    Bearish Judas Swing Blueprint
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FF6B7A] text-white font-bold">SCENARIO B</span>
                </div>

                <div className="text-xs space-y-2 mb-4 text-[#9BA1AE]">
                  <p><strong>Judas Sweep:</strong> Price spikes above Asian High (<span className="font-mono font-bold text-[#5865FF]">{asianHigh.toFixed(2)}</span>) between 02:00 - 05:00 EST.</p>
                  <p><strong>Confirmation:</strong> CISD / MSS breaks downward into London Silver Bullet (03:00-04:00 EST).</p>
                  <p><strong>Target:</strong> Asian Low (<span className="font-mono font-bold">{asianLow.toFixed(2)}</span>) and Bearish Standard Deviations.</p>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between p-2 bg-[#151923] border border-white/[0.08]">
                    <span className="font-bold">Asian Low (SSL Sweep)</span>
                    <span className="font-black">{asianLow.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white/[0.03] border border-white/[0.08]">
                    <span>-1.5 Std Dev Expansion</span>
                    <span className="font-black text-[#FF6B7A]">{sd15Bearish.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#FF6B7A]/10 border border-[#D02020]">
                    <span className="font-bold">-2.0 Std Dev Target (Primary)</span>
                    <span className="font-black text-[#FF6B7A]">{sd20Bearish.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white/[0.03] border border-white/[0.08]">
                    <span>-2.5 Std Dev Expansion</span>
                    <span className="font-black text-[#FF6B7A]">{sd25Bearish.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: 5-PHASE LEARNING PATH TRACKER --- */}
      {activeTab === 'learning_path' && (
        <div className="space-y-6">
          <div className="bg-[#11141B] border border-white/[0.08] p-6 rounded-2xl text-[#F5F7FA]">
            <div className="border-b-2 border-white/[0.08] pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-medium uppercase px-2.5 py-0.5 bg-white/[0.04] text-[#9BA1AE] rounded border border-white/[0.08]">
                  CURRICULUM ARCHITECTURE (51 CORE ARTICLES)
                </span>
                <h2 className="text-2xl font-black uppercase text-[#F5F7FA] mt-1">
                  5-Phase Mentorship &amp; Milestone Tracker
                </h2>
                <p className="text-xs text-[#9BA1AE] mt-0.5">
                  Follow the verified sequential path from <span className="font-bold text-[#F5F7FA]">theinnercircletraders.com</span>. Check off mastered concepts to measure your institutional tape reading readiness.
                </p>
              </div>

              {/* Overall Progress Gauge */}
              <div className="bg-[#151923] border border-white/[0.08] rounded-xl p-3 flex items-center gap-4 min-w-[240px]">
                <div className="text-right flex-1 font-mono">
                  <div className="text-[10px] font-bold uppercase text-[#656B78]">Total Mastery</div>
                  <div className="text-xl font-black text-[#5865FF]">{overallProgress}%</div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-[#5865FF] flex items-center justify-center font-mono font-semibold text-xs bg-white/[0.04] text-[#5865FF]">
                  {completedCount}/{totalTopics}
                </div>
              </div>
            </div>

            {/* Phases Accordion / List */}
            <div className="space-y-6">
              {coursePhases.map((phase) => {
                const phaseCompleted = phase.topics.filter(t => completedTopics[t.id]).length;
                const phasePercent = Math.round((phaseCompleted / phase.topics.length) * 100);

                return (
                  <div key={phase.phase} className="border border-white/[0.08] bg-[#151923] rounded-2xl overflow-hidden">
                    <div className="bg-[#0C0E13] text-[#F5F7FA] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08]">
                      <div>
                        <div className="text-[10px] font-mono text-[#F0C020] font-black uppercase">
                          PHASE 0{phase.phase} // {phase.articlesCount} ARTICLES IN CURRICULUM
                        </div>
                        <h3 className="text-lg font-black uppercase tracking-tight">
                          {phase.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-white/80">{phaseCompleted} of {phase.topics.length} Mastered</span>
                        <span className="px-2 py-0.5 bg-white/[0.06] text-[#F0B35B] text-[#F5F7FA] font-black">
                          {phasePercent}%
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#11141B] border-b border-white/[0.06] text-xs text-[#9BA1AE] leading-relaxed">
                      {phase.desc}
                    </div>

                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {phase.topics.map(topic => {
                        const isDone = !!completedTopics[topic.id];
                        return (
                          <div
                            key={topic.id}
                            onClick={() => toggleTopic(topic.id)}
                            className={`p-3 border border-white/[0.08] flex items-center justify-between gap-3 cursor-pointer transition-all select-none ${
                              isDone ? 'bg-[#5865FF]/10 border-[#5865FF]/30 rounded-xl' : 'bg-[#11141B] hover:bg-white/[0.03] border-white/[0.06] rounded-xl'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-5 h-5 border border-white/[0.08] flex items-center justify-center shrink-0 ${
                                isDone ? 'bg-[#5865FF] text-white rounded' : 'border-white/20 bg-white/[0.04] rounded'
                              }`}>
                                {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                              <span className={`text-xs font-mono font-bold ${
                                isDone ? 'text-[#5865FF] line-through decoration-2' : 'text-[#F5F7FA]'
                              }`}>
                                {topic.title}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 bg-white/[0.03] border border-white/[0.08] shrink-0">
                              {isDone ? 'COMPLETE' : 'PENDING'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 5: A-Z GLOSSARY & ABBREVIATIONS --- */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          <div className="bg-[#11141B] border border-white/[0.08] p-6 rounded-2xl text-[#F5F7FA]">
            <div className="border-b-2 border-white/[0.08] pb-4 mb-6">
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#5865FF] text-white border border-white/[0.08]">
                A-Z INSTITUTIONAL DICTIONARY
              </span>
              <h2 className="text-2xl font-black uppercase text-[#F5F7FA] mt-1">
                Complete ICT Trading Glossary &amp; Abbreviations
              </h2>
              <p className="text-xs text-[#9BA1AE] mt-0.5">
                Every official abbreviation codified by Michael J. Huddleston and the ICT mentorship program.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#656B78]" />
                <input
                  type="text"
                  placeholder="Search abbreviations (e.g., CISD, CRT, Reaper, Venom, FVG)..."
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  className="w-full bg-[#151923] border border-white/[0.06] rounded-xl pl-9 pr-4 py-2 text-xs font-mono font-bold focus:outline-none focus:border-[#5865FF]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {(['all', 'Price Action', 'Imbalance', 'PD Array', 'Structure', 'Liquidity', 'Sessions', 'Models'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setGlossaryCategory(cat)}
                    className={`px-2.5 py-1.5 text-[10px] font-mono font-black uppercase border border-white/[0.08] whitespace-nowrap ${
                      glossaryCategory === cat ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20 rounded-lg' : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] rounded-lg'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Glossary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredGlossary.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-white/[0.08] p-4 bg-[#151923] hover:border-white/20 rounded-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-black text-base text-[#5865FF]">
                        {item.abbr}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white/[0.03] border border-white/[0.08] text-[#9BA1AE] uppercase font-bold">
                        {item.cat}
                      </span>
                    </div>
                    <div className="font-black text-xs uppercase text-[#F5F7FA] mb-1">
                      {item.full}
                    </div>
                    <p className="text-xs text-[#9BA1AE] leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredGlossary.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-white/[0.08] text-xs font-mono text-[#656B78]">
                No institutional abbreviation found matching your query.
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default InstitutionalToolsSuite;
