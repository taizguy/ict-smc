import React, { useState, useEffect } from 'react';
import { ChartScenario, Candle, ChartAnnotation } from '../types';
import { chartScenarios } from '../data/chartScenarios';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Eye, 
  EyeOff, 
  Layers, 
  Crosshair, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  BarChart2, 
  ShieldCheck, 
  Target, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Clock,
  Zap,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

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
    fvg: true,
    orderBlocks: true,
    breakers: true,
    structure: true,
    sessions: true,
    premiumDiscount: true,
    ceMidpoint: true
  });

  // Interactive crosshair
  const [hoveredCandle, setHoveredCandle] = useState<{ candle: Candle; index: number; x: number; y: number } | null>(null);

  // Auto-play interval
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentCandleIndex((prev) => {
          if (prev < scenario.candles.length) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
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
    setActiveStep('liquidity_pool');
    setUserMarkedCandles({});
    setUserMarkedPrices({});
    setStepFeedback(null);
  };

  const visibleCandles = scenario.candles.slice(0, currentCandleIndex);

  // Price calculations for chart scaling
  const minPrice = Math.min(...scenario.candles.map((c) => c.low)) * 0.998;
  const maxPrice = Math.max(...scenario.candles.map((c) => c.high)) * 1.002;
  const priceRange = maxPrice - minPrice;

  const chartHeight = 360;
  const chartWidth = 780;
  const candleSpacing = (chartWidth - 80) / scenario.candles.length;
  const candleWidth = Math.max(12, Math.floor(candleSpacing) - 6);

  const getY = (price: number) => {
    return chartHeight - ((price - minPrice) / (priceRange || 1)) * (chartHeight - 40) - 20;
  };

  const getX = (index: number) => {
    return 50 + index * candleSpacing + candleSpacing / 2;
  };

  // Step Definitions for the Interactive Training Flow
  const trainingStepConfig: {
    [key in TrainingStep]: {
      number: number;
      title: string;
      instruction: string;
      expectedAnnotationType?: 'BSL' | 'SSL' | 'SWEEP' | 'DISPLACEMENT' | 'MSS' | 'FVG' | 'OB';
      type: 'candle_click' | 'price_click' | 'done';
    };
  } = {
    liquidity_pool: {
      number: 1,
      title: '1. Mark Initial Liquidity Pool (BSL/SSL)',
      instruction: 'Click on the swing high (Buy Side Liquidity) or swing low (Sell Side Liquidity) that acts as the target for the stop run.',
      expectedAnnotationType: 'BSL',
      type: 'candle_click'
    },
    sweep: {
      number: 2,
      title: '2. Mark the Liquidity Sweep Candle',
      instruction: 'Click on the candle that pierced through the liquidity pool to raid the resting stops (Turtle Soup).',
      expectedAnnotationType: 'SWEEP',
      type: 'candle_click'
    },
    displacement: {
      number: 3,
      title: '3. Identify Institutional Displacement',
      instruction: 'Click on the energetic, wide-body candle that reversed aggressively away from the swept liquidity.',
      expectedAnnotationType: 'DISPLACEMENT',
      type: 'candle_click'
    },
    mss: {
      number: 4,
      title: '4. Confirm Market Structure Shift (MSS)',
      instruction: 'Click on the candle that decisively closed beyond the intermediate structural swing point.',
      expectedAnnotationType: 'MSS',
      type: 'candle_click'
    },
    fvg_ob: {
      number: 5,
      title: '5. Identify the Imbalance / PD Array (FVG)',
      instruction: 'Click on the 3-candle Fair Value Gap or Order Block created by the displacement.',
      expectedAnnotationType: 'FVG',
      type: 'candle_click'
    },
    entry: {
      number: 6,
      title: '6. Set Limit Entry Level',
      instruction: 'Click the price level where you would set your limit order (ideally 50% Consequent Encroachment of the FVG).',
      type: 'price_click'
    },
    stop_loss: {
      number: 7,
      title: '7. Set Invalidation (Stop Loss)',
      instruction: 'Click the price level for your protective Stop Loss (safely beyond the sweep invalidation pivot).',
      type: 'price_click'
    },
    target: {
      number: 8,
      title: '8. Set Terminal Draw on Liquidity Target',
      instruction: 'Click the opposing liquidity pool or HTF PD array to secure take-profit.',
      type: 'price_click'
    },
    completed: {
      number: 9,
      title: 'Training Sequence Complete!',
      instruction: 'You successfully mapped all 8 institutional price delivery stages in strict logical order.',
      type: 'done'
    }
  };

  // Handle candle click during training
  const handleCandleClick = (candleIndex: number) => {
    if (!isTrainingMode || activeStep === 'completed') return;
    const config = trainingStepConfig[activeStep];
    if (config.type !== 'candle_click') return;

    setUserMarkedCandles((prev) => ({ ...prev, [activeStep]: candleIndex }));

    // Verify correctness based on scenario annotations
    const expectedAnn = scenario.annotations.find((a) => {
      if (config.expectedAnnotationType === 'BSL' || config.expectedAnnotationType === 'SSL') {
        return a.type === 'BSL' || a.type === 'SSL';
      }
      return a.type === config.expectedAnnotationType;
    });

    const isNearExpected = expectedAnn ? Math.abs(expectedAnn.candleIndexEnd - candleIndex) <= 2 : true;

    if (isNearExpected) {
      setStepFeedback({ text: `✓ Correct! Step ${config.number} identified with high precision.`, isCorrect: true });
      advanceStep();
    } else {
      setStepFeedback({ text: `⚠ Notice: Look closer at where the actual ${config.title.split('. ')[1]} occurred in the sequence.`, isCorrect: false });
    }
  };

  // Handle chart background price click (for entry/stop/target)
  const handleChartPriceClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isTrainingMode || activeStep === 'completed') return;
    const config = trainingStepConfig[activeStep];
    if (config.type !== 'price_click') return;

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
      {/* Top Header & Scenario Switcher */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white tracking-wide font-mono">
                ICT Chart Laboratory & Training Studio
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold uppercase">
                {isTrainingMode ? 'Step-by-Step Training Mode' : 'Free Inspection Mode'}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-sans">
              Learn how to reason through price delivery by executing the 8-stage institutional marking sequence candle-by-candle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedScenarioId}
              onChange={(e) => handleScenarioChange(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 font-mono focus:outline-none focus:border-cyan-500"
            >
              {chartScenarios.map((scen) => (
                <option key={scen.id} value={scen.id}>
                  {scen.asset} • {scen.title}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setIsTrainingMode(!isTrainingMode);
                resetTraining();
              }}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                isTrainingMode
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isTrainingMode ? 'Exit Training' : 'Start 8-Stage Training'}
            </button>
          </div>
        </div>
      </div>

      {/* Training HUD Progress Banner (When in Training Mode) */}
      {isTrainingMode && (
        <div className="bg-slate-900/95 border border-amber-500/40 rounded-xl p-4 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold font-mono text-[11px]">
                Stage {trainingStepConfig[activeStep].number} of 8
              </span>
              <h3 className="font-bold text-white font-mono text-sm">
                {trainingStepConfig[activeStep].title}
              </h3>
            </div>

            <button
              onClick={resetTraining}
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset Sequence
            </button>
          </div>

          <p className="text-amber-200/90 text-xs font-sans leading-relaxed">
            👉 <strong className="text-white">Objective:</strong> {trainingStepConfig[activeStep].instruction}
          </p>

          {stepFeedback && (
            <div className={`p-2.5 rounded-lg text-xs font-mono flex items-center gap-2 ${
              stepFeedback.isCorrect
                ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
                : 'bg-amber-950/40 border border-amber-800 text-amber-300'
            }`}>
              {stepFeedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
              <span>{stepFeedback.text}</span>
            </div>
          )}
        </div>
      )}

      {/* Main Chart Window */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-2xl space-y-4">
        {/* Replay Controls & Layer Toggles Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentCandleIndex((prev) => Math.max(1, prev - 1))}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Step Back"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Replay'}</span>
            </button>

            <button
              onClick={() => setCurrentCandleIndex((prev) => Math.min(scenario.candles.length, prev + 1))}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Step Forward"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <span className="text-slate-400 ml-2">
              Candle {currentCandleIndex} / {scenario.candles.length}
            </span>
          </div>

          {/* Layer toggles */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setLayers((prev) => ({ ...prev, fvg: !prev.fvg }))}
              className={`px-2 py-1 rounded text-[11px] border transition-all ${
                layers.fvg
                  ? 'bg-cyan-950/70 border-cyan-800 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              FVG
            </button>
            <button
              onClick={() => setLayers((prev) => ({ ...prev, liquidity: !prev.liquidity }))}
              className={`px-2 py-1 rounded text-[11px] border transition-all ${
                layers.liquidity
                  ? 'bg-amber-950/70 border-amber-800 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              Liquidity Pools
            </button>
            <button
              onClick={() => setLayers((prev) => ({ ...prev, structure: !prev.structure }))}
              className={`px-2 py-1 rounded text-[11px] border transition-all ${
                layers.structure
                  ? 'bg-emerald-950/70 border-emerald-800 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              MSS & Structure
            </button>
          </div>
        </div>

        {/* SVG Candlestick Chart Area */}
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full min-w-[700px] h-80 select-none cursor-crosshair"
            onClick={handleChartPriceClick}
          >
            {/* Background Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const yVal = chartHeight - ratio * (chartHeight - 40) - 20;
              const pVal = minPrice + ratio * priceRange;
              return (
                <g key={idx}>
                  <line x1="40" y1={yVal} x2={chartWidth - 20} y2={yVal} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="35" y={yVal + 3} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="monospace">
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
                      fill="rgba(6, 182, 212, 0.15)"
                      stroke="#06b6d4"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <text x={startX + 5} y={Math.min(topY, botY) + 12} fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="bold">
                      FVG ({ann.isBullish ? 'Bullish' : 'Bearish'})
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
                      stroke={isBSL ? '#f59e0b' : '#ec4899'}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <text x={chartWidth - 25} y={yPos - 4} textAnchor="end" fill={isBSL ? '#fbbf24' : '#f472b6'} fontSize="9" fontFamily="monospace" fontWeight="bold">
                      {ann.label}
                    </text>
                  </g>
                );
              })}

            {/* Render Candlesticks */}
            {visibleCandles.map((c, idx) => {
              const isBullish = c.close >= c.open;
              const xCenter = getX(idx);
              const openY = getY(c.open);
              const closeY = getY(c.close);
              const highY = getY(c.high);
              const lowY = getY(c.low);
              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.max(2, Math.abs(closeY - openY));

              const candleColor = isBullish ? '#10b981' : '#f43f5e';
              const wickColor = isBullish ? '#34d399' : '#fb7185';

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
                  
                  {/* Body */}
                  <rect
                    x={xCenter - candleWidth / 2}
                    y={bodyTop}
                    width={candleWidth}
                    height={bodyHeight}
                    fill={candleColor}
                    rx="1"
                  />
                </g>
              );
            })}

            {/* User Placed Entry / Stop / Target Lines */}
            {userMarkedPrices.entry && (
              <g>
                <line x1="45" y1={getY(userMarkedPrices.entry)} x2={chartWidth - 20} y2={getY(userMarkedPrices.entry)} stroke="#38bdf8" strokeWidth="2" />
                <text x="55" y={getY(userMarkedPrices.entry) - 4} fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  ENTRY @ {userMarkedPrices.entry}
                </text>
              </g>
            )}

            {userMarkedPrices.stop && (
              <g>
                <line x1="45" y1={getY(userMarkedPrices.stop)} x2={chartWidth - 20} y2={getY(userMarkedPrices.stop)} stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                <text x="55" y={getY(userMarkedPrices.stop) - 4} fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  STOP LOSS @ {userMarkedPrices.stop}
                </text>
              </g>
            )}

            {userMarkedPrices.target && (
              <g>
                <line x1="45" y1={getY(userMarkedPrices.target)} x2={chartWidth - 20} y2={getY(userMarkedPrices.target)} stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                <text x="55" y={getY(userMarkedPrices.target) - 4} fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  TARGET (DOL) @ {userMarkedPrices.target}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Hovered Candle Tooltip Information */}
        {hoveredCandle && (
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono grid grid-cols-2 sm:grid-cols-5 gap-2">
            <div><span className="text-slate-500">Candle #{hoveredCandle.index + 1}</span></div>
            <div><span className="text-slate-400">Open:</span> <span className="text-slate-200">{hoveredCandle.candle.open}</span></div>
            <div><span className="text-slate-400">High:</span> <span className="text-slate-200">{hoveredCandle.candle.high}</span></div>
            <div><span className="text-slate-400">Low:</span> <span className="text-slate-200">{hoveredCandle.candle.low}</span></div>
            <div><span className="text-slate-400">Close:</span> <span className="text-slate-200">{hoveredCandle.candle.close}</span></div>
          </div>
        )}
      </div>
    </div>
  );
};
