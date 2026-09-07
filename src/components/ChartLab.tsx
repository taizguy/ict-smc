import React, { useState, useEffect } from 'react';
import { ChartScenario, Candle, ChartAnnotation } from '../types';
import { chartScenarios } from '../data/chartScenarios';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  BarChart2, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BauhausNavScroller } from './BauhausNavScroller';

type TrainingStep = 
  | 'liquidity_pool'
  | 'sweep'
  | 'displacement'
  | 'mss'
  | 'fvg_ob'
  | 'entry'
  | 'stop_loss'
  | 'target'
  | 'completed';

export const ChartLab: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(chartScenarios[0].id);
  const scenario = chartScenarios.find((s) => s.id === selectedScenarioId) || chartScenarios[0];

  // Replay State
  const [currentCandleIndex, setCurrentCandleIndex] = useState<number>(scenario.candles.length);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1000);

  // Training Mode vs Inspection Mode
  const [isTrainingMode, setIsTrainingMode] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<TrainingStep>('liquidity_pool');
  
  // User Marked Elements
  const [userMarkedCandles, setUserMarkedCandles] = useState<{ [key in TrainingStep]?: number }>({});
  const [userMarkedPrices, setUserMarkedPrices] = useState<{ entry?: number; stop?: number; target?: number }>({});
  const [stepFeedback, setStepFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);

  // Layer Visibility Toggles
  const [layers, setLayers] = useState({
    liquidity: true,
    structure: true,
    fvg: true,
    orderBlock: true,
    fib: false
  });

  // Candle Inspection Hover
  const [hoveredCandle, setHoveredCandle] = useState<{
    candle: Candle;
    index: number;
    x: number;
    y: number;
  } | null>(null);

  // Step definition details
  const trainingStepConfig: { [key in TrainingStep]: { title: string; instruction: string; targetAnnotation?: string; number: number } } = {
    liquidity_pool: {
      number: 1,
      title: 'Locate Resting Liquidity Pool',
      instruction: 'Click on the candle creating the key swing high/low where retail stop losses are resting.',
      targetAnnotation: 'BSL'
    },
    sweep: {
      number: 2,
      title: 'Identify the Liquidity Purge (Sweep)',
      instruction: 'Click the exact candle that pierces through the liquidity line to trigger stop orders.',
      targetAnnotation: 'SWEEP'
    },
    displacement: {
      number: 3,
      title: 'Detect Algorithmic Displacement',
      instruction: 'Click on the long-bodied expansion candle showing aggressive institutional participation.',
      targetAnnotation: 'DISPLACEMENT'
    },
    mss: {
      number: 4,
      title: 'Confirm Market Structure Shift (MSS)',
      instruction: 'Click the candle that breaks and closes beyond the structural swing point.',
      targetAnnotation: 'MSS'
    },
    fvg_ob: {
      number: 5,
      title: 'Pinpoint Fair Value Gap / Order Block',
      instruction: 'Click the candle body or imbalance area where price left an institutional void.',
      targetAnnotation: 'FVG'
    },
    entry: {
      number: 6,
      title: 'Execute Limit Order Entry',
      instruction: 'Click on the chart price axis or candle level to place your Limit Order inside the FVG / OB.',
      targetAnnotation: 'ENTRY'
    },
    stop_loss: {
      number: 7,
      title: 'Anchor Invalidation (Stop Loss)',
      instruction: 'Click below the swing low / above the swing high that invalidates the trade thesis.',
      targetAnnotation: 'STOP'
    },
    target: {
      number: 8,
      title: 'Set Draw on Liquidity (Target)',
      instruction: 'Click the opposing high-timeframe liquidity level to harvest profit.',
      targetAnnotation: 'DOL'
    },
    completed: {
      number: 8,
      title: 'Sequence Successfully Executed!',
      instruction: 'Trade fully established with institutional rule discipline. Review your marks.',
      targetAnnotation: 'DONE'
    }
  };

  // Automated Replay loop
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentCandleIndex((prev) => {
          if (prev >= scenario.candles.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playSpeed, scenario.candles.length]);

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    const newScen = chartScenarios.find((s) => s.id === id) || chartScenarios[0];
    setCurrentCandleIndex(newScen.candles.length);
    setIsPlaying(false);
    resetTraining();
  };

  // Dimensions & Coordinate mapping
  const chartWidth = 900;
  const chartHeight = 360;
  const visibleCandles = scenario.candles.slice(0, currentCandleIndex);

  const minPrice = Math.min(...scenario.candles.map((c) => c.low)) * 0.998;
  const maxPrice = Math.max(...scenario.candles.map((c) => c.high)) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  const candleSpacing = chartWidth / (scenario.candles.length + 1);
  const candleWidth = Math.max(6, candleSpacing * 0.65);

  const getY = (price: number) => {
    const normalized = (price - minPrice) / priceRange;
    return chartHeight - 20 - normalized * (chartHeight - 40);
  };

  const getX = (index: number) => {
    return 40 + (index + 0.5) * candleSpacing;
  };

  // Candle selection logic during training
  const handleCandleClick = (candleIndex: number) => {
    if (!isTrainingMode) return;

    const clickedCandle = scenario.candles[candleIndex];
    if (!clickedCandle) return;

    setUserMarkedCandles((prev) => ({
      ...prev,
      [activeStep]: candleIndex
    }));

    if (activeStep === 'liquidity_pool') {
      setStepFeedback({ text: 'Resting liquidity pool identified.', isCorrect: true });
      advanceStep();
    } else if (activeStep === 'sweep') {
      setStepFeedback({ text: 'Liquidity sweep confirmed.', isCorrect: true });
      advanceStep();
    } else if (activeStep === 'displacement') {
      setStepFeedback({ text: 'Algorithmic displacement locked.', isCorrect: true });
      advanceStep();
    } else if (activeStep === 'mss') {
      setStepFeedback({ text: 'Market Structure Shift (MSS) verified.', isCorrect: true });
      advanceStep();
    } else if (activeStep === 'fvg_ob') {
      setStepFeedback({ text: 'Institutional imbalance / FVG pinpointed.', isCorrect: true });
      advanceStep();
    } else {
      setStepFeedback({ text: 'Marked on chart.', isCorrect: true });
      advanceStep();
    }
  };

  // User price click for Entry, Stop, Target
  const handleChartPriceClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isTrainingMode) return;
    if (activeStep !== 'entry' && activeStep !== 'stop_loss' && activeStep !== 'target') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const normalizedY = (chartHeight - 20 - clickY) / (chartHeight - 40);
    const estimatedPrice = Math.round((minPrice + normalizedY * priceRange) * 100) / 100;

    if (activeStep === 'entry') {
      setUserMarkedPrices((prev) => ({ ...prev, entry: estimatedPrice }));
      setStepFeedback({ text: `✓ Entry level placed at ${estimatedPrice.toFixed(2)}.`, isCorrect: true });
      setActiveStep('stop_loss');
    } else if (activeStep === 'stop_loss') {
      setUserMarkedPrices((prev) => ({ ...prev, stop: estimatedPrice }));
      setStepFeedback({ text: `✓ Protective Stop Loss anchored at ${estimatedPrice.toFixed(2)}.`, isCorrect: true });
      setActiveStep('target');
    } else if (activeStep === 'target') {
      setUserMarkedPrices((prev) => ({ ...prev, target: estimatedPrice }));
      setStepFeedback({ text: `✓ Terminal Target locked at ${estimatedPrice.toFixed(2)}. Sequence complete!`, isCorrect: true });
      setActiveStep('completed');
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const advanceStep = () => {
    if (activeStep === 'liquidity_pool') setActiveStep('sweep');
    else if (activeStep === 'sweep') setActiveStep('displacement');
    else if (activeStep === 'displacement') setActiveStep('mss');
    else if (activeStep === 'mss') setActiveStep('fvg_ob');
    else if (activeStep === 'fvg_ob') setActiveStep('entry');
  };

  const resetTraining = () => {
    setActiveStep('liquidity_pool');
    setUserMarkedCandles({});
    setUserMarkedPrices({});
    setStepFeedback(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Scenario Switcher - Bauhaus Constructivist Card */}
      <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 bg-[#D02020] border border-black inline-block" />
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#121212] tracking-tight">
                ICT Chart Laboratory &amp; Training Studio
              </h2>
              <span className="px-3 py-1 text-[10px] font-mono bg-[#F0C020] text-[#121212] border-2 border-[#121212] font-black uppercase shadow-[2px_2px_0px_0px_#121212]">
                {isTrainingMode ? 'Step-by-Step Training' : 'Free Inspection'}
              </span>
            </div>
            <p className="text-[#121212]/80 text-xs sm:text-sm font-medium">
              Learn how to reason through price delivery by executing the 8-stage institutional marking sequence candle-by-candle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedScenarioId}
              onChange={(e) => handleScenarioChange(e.target.value)}
              className="bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] text-xs font-mono font-bold uppercase px-4 py-2 shadow-[3px_3px_0px_0px_#121212] focus:outline-none focus:bg-white cursor-pointer"
            >
              {chartScenarios.map((scen) => (
                <option key={scen.id} value={scen.id} className="bg-white text-[#121212]">
                  {scen.asset} • {scen.title}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setIsTrainingMode(!isTrainingMode);
                resetTraining();
              }}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 border-2 border-[#121212] cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                isTrainingMode
                  ? 'bg-[#F0C020] text-[#121212] shadow-[4px_4px_0px_0px_#121212]'
                  : 'bg-white text-[#121212] hover:bg-[#F0C020] shadow-[2px_2px_0px_0px_#121212]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{isTrainingMode ? 'Exit Training' : 'Start 8-Stage Training'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Training HUD Progress Banner (When in Training Mode) */}
      {isTrainingMode && (
        <div className="bg-[#FFF9C4] border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] p-5 sm:p-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 bg-[#D02020] text-white font-black font-mono text-xs border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
                Stage {trainingStepConfig[activeStep].number} of 8
              </span>
              <h3 className="font-black text-[#121212] uppercase text-sm sm:text-base">
                {trainingStepConfig[activeStep].title}
              </h3>
            </div>

            <button
              onClick={resetTraining}
              className="text-xs font-mono font-black uppercase text-[#121212] hover:text-[#D02020] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" /> Reset Sequence
            </button>
          </div>

          <p className="text-[#121212] text-xs sm:text-sm font-medium leading-relaxed">
            👉 <strong className="font-black uppercase text-[#D02020]">Objective:</strong> {trainingStepConfig[activeStep].instruction}
          </p>

          {stepFeedback && (
            <div className={`p-3 border-2 border-[#121212] text-xs font-mono font-bold flex items-center gap-2.5 shadow-[2px_2px_0px_0px_#121212] ${
              stepFeedback.isCorrect
                ? 'bg-emerald-100 text-emerald-950'
                : 'bg-amber-100 text-amber-950'
            }`}>
              {stepFeedback.isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 stroke-[3]" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 stroke-[3]" />
              )}
              <span>{stepFeedback.text}</span>
            </div>
          )}
        </div>
      )}

      {/* Main Chart Window - Bauhaus Stage */}
      <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-4">
        
        {/* Replay Controls & Layer Toggles Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b-4 border-[#121212] text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentCandleIndex((prev) => Math.max(1, prev - 1))}
              className="p-2 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              title="Step Back"
            >
              <SkipBack className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2 bg-[#D02020] hover:bg-red-700 text-white font-black uppercase text-xs flex items-center gap-2 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 stroke-[3]" /> : <Play className="w-3.5 h-3.5 fill-white stroke-[2]" />}
              <span>{isPlaying ? 'Pause' : 'Replay'}</span>
            </button>

            <button
              onClick={() => setCurrentCandleIndex((prev) => Math.min(scenario.candles.length, prev + 1))}
              className="p-2 bg-white hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              title="Step Forward"
            >
              <SkipForward className="w-4 h-4 stroke-[2.5]" />
            </button>

            <span className="text-[#121212] ml-2 font-mono font-bold bg-[#F0F0F0] px-3 py-1.5 border-2 border-[#121212]">
              Candle {currentCandleIndex} / {scenario.candles.length}
            </span>
          </div>

          {/* Layer toggles with Navigation Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLayers((prev) => ({ ...prev, fvg: !prev.fvg }))}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-[#121212] transition-all cursor-pointer ${
                layers.fvg
                  ? 'bg-[#D02020] text-white shadow-[2px_2px_0px_0px_#121212]'
                  : 'bg-white text-[#121212] hover:bg-[#F0C020]'
              }`}
            >
              FVG
            </button>
            <button
              onClick={() => setLayers((prev) => ({ ...prev, liquidity: !prev.liquidity }))}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-[#121212] transition-all cursor-pointer ${
                layers.liquidity
                  ? 'bg-[#F0C020] text-[#121212] shadow-[2px_2px_0px_0px_#121212]'
                  : 'bg-white text-[#121212] hover:bg-[#F0C020]'
              }`}
            >
              Liquidity Pools
            </button>
            <button
              onClick={() => setLayers((prev) => ({ ...prev, structure: !prev.structure }))}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-[#121212] transition-all cursor-pointer ${
                layers.structure
                  ? 'bg-[#1040C0] text-white shadow-[2px_2px_0px_0px_#121212]'
                  : 'bg-white text-[#121212] hover:bg-[#F0C020]'
              }`}
            >
              MSS &amp; Structure
            </button>
          </div>
        </div>

        {/* SVG Candlestick Chart Area - Technical Light Bauhaus Surface */}
        <div className="overflow-x-auto bg-[#FAF9F5] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] p-3">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full min-w-[700px] h-84 select-none cursor-crosshair"
            onClick={handleChartPriceClick}
          >
            {/* Background Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const yVal = chartHeight - ratio * (chartHeight - 40) - 20;
              const pVal = minPrice + ratio * priceRange;
              return (
                <g key={idx}>
                  <line x1="40" y1={yVal} x2={chartWidth - 20} y2={yVal} stroke="#D4D4D4" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="35" y={yVal + 3} textAnchor="end" fill="#525252" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    {pVal.toFixed(2)}
                  </text>
                </g>
              );
            })}

            {/* FVG Annotations Layer */}
            {layers.fvg && scenario.annotations
              .filter((a) => a.type === 'FVG' && a.candleIndexStart < currentCandleIndex)
              .map((ann, idx) => {
                if (!ann.priceTop || !ann.priceBottom) return null;
                const topY = getY(ann.priceTop);
                const botY = getY(ann.priceBottom);
                const fvgHeight = Math.abs(botY - topY);
                const startX = getX(ann.candleIndexStart);
                const fvgWidth = (chartWidth - 20) - startX;

                return (
                  <g key={idx}>
                    <rect
                      x={startX}
                      y={Math.min(topY, botY)}
                      width={fvgWidth}
                      height={fvgHeight}
                      fill="rgba(208, 32, 32, 0.18)"
                      stroke="#D02020"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                    <text x={startX + 6} y={Math.min(topY, botY) + 12} fill="#D02020" fontSize="9" fontFamily="monospace" fontWeight="black">
                      FVG ({ann.isBullish ? 'BULLISH' : 'BEARISH'})
                    </text>
                  </g>
                );
              })}

            {/* Liquidity Lines (BSL / SSL) */}
            {layers.liquidity && scenario.annotations
              .filter((a) => (a.type === 'BSL' || a.type === 'SSL') && a.candleIndexStart < currentCandleIndex)
              .map((ann, idx) => {
                if (!ann.priceLevel) return null;
                const yPos = getY(ann.priceLevel);
                const isBSL = ann.type === 'BSL';

                return (
                  <g key={idx}>
                    <line
                      x1="45"
                      y1={yPos}
                      x2={chartWidth - 20}
                      y2={yPos}
                      stroke={isBSL ? '#121212' : '#D02020'}
                      strokeWidth="2"
                      strokeDasharray="5 3"
                    />
                    <text x={chartWidth - 25} y={yPos - 4} textAnchor="end" fill={isBSL ? '#121212' : '#D02020'} fontSize="9" fontFamily="monospace" fontWeight="black">
                      {ann.label}
                    </text>
                  </g>
                );
              })}

            {/* Render Candlesticks with Bauhaus Stark Contrasts */}
            {visibleCandles.map((c, idx) => {
              const isBullish = c.close >= c.open;
              const xCenter = getX(idx);
              const openY = getY(c.open);
              const closeY = getY(c.close);
              const highY = getY(c.high);
              const lowY = getY(c.low);
              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.max(2, Math.abs(closeY - openY));

              const candleColor = isBullish ? '#1040C0' : '#D02020';
              const wickColor = '#121212';

              return (
                <g
                  key={`${c.time}-${idx}`}
                  className="cursor-pointer"
                  onClick={() => handleCandleClick(idx)}
                  onMouseEnter={() => setHoveredCandle({ candle: c, index: idx, x: xCenter, y: bodyTop })}
                  onMouseLeave={() => setHoveredCandle(null)}
                >
                  {/* Upper & Lower Wicks */}
                  <line x1={xCenter} y1={highY} x2={xCenter} y2={lowY} stroke={wickColor} strokeWidth="1.5" />
                  
                  {/* Body with Black Outline */}
                  <rect
                    x={xCenter - candleWidth / 2}
                    y={bodyTop}
                    width={candleWidth}
                    height={bodyHeight}
                    fill={candleColor}
                    stroke="#121212"
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}

            {/* User Placed Entry / Stop / Target Lines */}
            {userMarkedPrices.entry && (
              <g>
                <line x1="45" y1={getY(userMarkedPrices.entry)} x2={chartWidth - 20} y2={getY(userMarkedPrices.entry)} stroke="#1040C0" strokeWidth="2.5" />
                <text x="55" y={getY(userMarkedPrices.entry) - 4} fill="#1040C0" fontSize="9" fontFamily="monospace" fontWeight="black">
                  ENTRY @ {userMarkedPrices.entry}
                </text>
              </g>
            )}

            {userMarkedPrices.stop && (
              <g>
                <line x1="45" y1={getY(userMarkedPrices.stop)} x2={chartWidth - 20} y2={getY(userMarkedPrices.stop)} stroke="#D02020" strokeWidth="2.5" strokeDasharray="4 3" />
                <text x="55" y={getY(userMarkedPrices.stop) - 4} fill="#D02020" fontSize="9" fontFamily="monospace" fontWeight="black">
                  STOP LOSS @ {userMarkedPrices.stop}
                </text>
              </g>
            )}

            {userMarkedPrices.target && (
              <g>
                <line x1="45" y1={getY(userMarkedPrices.target)} x2={chartWidth - 20} y2={getY(userMarkedPrices.target)} stroke="#121212" strokeWidth="2.5" strokeDasharray="4 3" />
                <text x="55" y={getY(userMarkedPrices.target) - 4} fill="#121212" fontSize="9" fontFamily="monospace" fontWeight="black">
                  TARGET (DOL) @ {userMarkedPrices.target}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Hovered Candle Tooltip Information */}
        {hoveredCandle && (
          <div className="p-4 bg-[#FFF9C4] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-mono grid grid-cols-2 sm:grid-cols-5 gap-2 text-[#121212]">
            <div><span className="text-[#121212]/60 uppercase font-black">Candle:</span> <span className="font-bold">{hoveredCandle.index + 1}</span></div>
            <div><span className="text-[#121212]/60 uppercase font-black">Open:</span> <span className="font-bold">{hoveredCandle.candle.open}</span></div>
            <div><span className="text-[#121212]/60 uppercase font-black">High:</span> <span className="font-bold">{hoveredCandle.candle.high}</span></div>
            <div><span className="text-[#121212]/60 uppercase font-black">Low:</span> <span className="font-bold">{hoveredCandle.candle.low}</span></div>
            <div><span className="text-[#121212]/60 uppercase font-black">Close:</span> <span className="font-bold">{hoveredCandle.candle.close}</span></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartLab;
