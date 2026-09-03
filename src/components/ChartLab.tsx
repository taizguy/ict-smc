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
    structure: true
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

  const trainingStepConfig: { [key in TrainingStep]: { number: number; title: string; instruction: string; type: 'candle_click' | 'price_click'; expectedAnnotationType?: string } } = {
    liquidity_pool: {
      number: 1,
      title: 'Identify Liquidity Pool (BSL / SSL)',
      instruction: 'Click on the initial swing high/low where resting stop orders reside.',
      type: 'candle_click',
      expectedAnnotationType: 'BSL'
    },
    sweep: {
      number: 2,
      title: 'Pinpoint the Liquidity Raid / Sweep',
      instruction: 'Click the candle that violently breaches the liquidity pool.',
      type: 'candle_click',
      expectedAnnotationType: 'MSS'
    },
    displacement: {
      number: 3,
      title: 'Detect Algorithmic Displacement',
      instruction: 'Select the prominent large-bodied energetic displacement candle.',
      type: 'candle_click',
      expectedAnnotationType: 'FVG'
    },
    mss: {
      number: 4,
      title: 'Confirm Market Structure Shift (MSS)',
      instruction: 'Click the swing low/high whose break confirms the structural shift.',
      type: 'candle_click',
      expectedAnnotationType: 'MSS'
    },
    fvg_ob: {
      number: 5,
      title: 'Locate Entry PD Array (FVG / OB)',
      instruction: 'Click the Fair Value Gap or Order Block created by displacement.',
      type: 'candle_click',
      expectedAnnotationType: 'FVG'
    },
    entry: {
      number: 6,
      title: 'Set Limit Entry Price Level',
      instruction: 'Click anywhere vertically on the chart canvas to set your Limit Entry.',
      type: 'price_click'
    },
    stop_loss: {
      number: 7,
      title: 'Define Invalidation Stop Loss Level',
      instruction: 'Click above/below the key structural swing to anchor your Stop Loss.',
      type: 'price_click'
    },
    target: {
      number: 8,
      title: 'Set Terminal Target (Draw on Liquidity)',
      instruction: 'Click at the opposing liquidity target / DOL level.',
      type: 'price_click'
    },
    completed: {
      number: 8,
      title: 'Trade Model Sequence Mastered!',
      instruction: 'You have systematically reasoned through the complete institutional setup.',
      type: 'candle_click'
    }
  };

  const handleCandleClick = (candleIndex: number) => {
    if (!isTrainingMode || activeStep === 'completed') return;
    const config = trainingStepConfig[activeStep];
    if (config.type !== 'candle_click') return;

    setUserMarkedCandles((prev) => ({ ...prev, [activeStep]: candleIndex }));

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
      setStepFeedback({ text: `⚠ Notice: Look closer at where the actual ${config.title.split('. ')[1] || config.title} occurred.`, isCorrect: false });
    }
  };

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
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl font-bold text-slate-900 tracking-wide font-display">
                ICT Chart Laboratory & Training Studio
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-50 text-sky-800 border border-sky-300 font-bold uppercase">
                {isTrainingMode ? 'Step-by-Step Training' : 'Free Inspection'}
              </span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm font-sans">
              Learn how to reason through price delivery by executing the 8-stage institutional marking sequence candle-by-candle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedScenarioId}
              onChange={(e) => handleScenarioChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-sky-500 shadow-sm"
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
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                isTrainingMode
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
        <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-bold font-mono text-[11px]">
                Stage {trainingStepConfig[activeStep].number} of 8
              </span>
              <h3 className="font-bold text-slate-900 font-mono text-sm">
                {trainingStepConfig[activeStep].title}
              </h3>
            </div>

            <button
              onClick={resetTraining}
              className="text-xs font-mono text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset Sequence
            </button>
          </div>

          <p className="text-amber-950 text-xs font-sans leading-relaxed">
            👉 <strong className="text-slate-900">Objective:</strong> {trainingStepConfig[activeStep].instruction}
          </p>

          {stepFeedback && (
            <div className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
              stepFeedback.isCorrect
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                : 'bg-amber-100 border border-amber-300 text-amber-900'
            }`}>
              {stepFeedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
              <span>{stepFeedback.text}</span>
            </div>
          )}
        </div>
      )}

      {/* Main Chart Window */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
        {/* Replay Controls & Layer Toggles Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentCandleIndex((prev) => Math.max(1, prev - 1))}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Step Back"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-sky-600/20"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Replay'}</span>
            </button>

            <button
              onClick={() => setCurrentCandleIndex((prev) => Math.min(scenario.candles.length, prev + 1))}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Step Forward"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <span className="text-slate-500 ml-2 font-mono">
              Candle {currentCandleIndex} / {scenario.candles.length}
            </span>
          </div>

          {/* Layer toggles */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setLayers((prev) => ({ ...prev, fvg: !prev.fvg }))}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all ${
                layers.fvg
                  ? 'bg-sky-100 border-sky-400 text-sky-800'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              FVG
            </button>
            <button
              onClick={() => setLayers((prev) => ({ ...prev, liquidity: !prev.liquidity }))}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all ${
                layers.liquidity
                  ? 'bg-amber-100 border-amber-400 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              Liquidity Pools
            </button>
            <button
              onClick={() => setLayers((prev) => ({ ...prev, structure: !prev.structure }))}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all ${
                layers.structure
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              MSS & Structure
            </button>
          </div>
        </div>

        {/* SVG Candlestick Chart Area */}
        <div className="overflow-x-auto bg-slate-50 border border-slate-200 rounded-2xl p-2">
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
                  <line x1="40" y1={yVal} x2={chartWidth - 20} y2={yVal} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
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
                      fill="rgba(14, 165, 233, 0.15)"
                      stroke="#0284c7"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <text x={startX + 5} y={Math.min(topY, botY) + 12} fill="#0369a1" fontSize="9" fontFamily="monospace" fontWeight="bold">
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
                      stroke={isBSL ? '#d97706' : '#e11d48'}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <text x={chartWidth - 25} y={yPos - 4} textAnchor="end" fill={isBSL ? '#b45309' : '#be123c'} fontSize="9" fontFamily="monospace" fontWeight="bold">
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

              const candleColor = isBullish ? '#059669' : '#e11d48';
              const wickColor = isBullish ? '#10b981' : '#f43f5e';

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
                <line x1="45" y1={getY(userMarkedPrices.entry)} x2={chartWidth - 20} y2={getY(userMarkedPrices.entry)} stroke="#0284c7" strokeWidth="2" />
                <text x="55" y={getY(userMarkedPrices.entry) - 4} fill="#0284c7" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  ENTRY @ {userMarkedPrices.entry}
                </text>
              </g>
            )}

            {userMarkedPrices.stop && (
              <g>
                <line x1="45" y1={getY(userMarkedPrices.stop)} x2={chartWidth - 20} y2={getY(userMarkedPrices.stop)} stroke="#e11d48" strokeWidth="2" strokeDasharray="3 3" />
                <text x="55" y={getY(userMarkedPrices.stop) - 4} fill="#e11d48" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  STOP LOSS @ {userMarkedPrices.stop}
                </text>
              </g>
            )}

            {userMarkedPrices.target && (
              <g>
                <line x1="45" y1={getY(userMarkedPrices.target)} x2={chartWidth - 20} y2={getY(userMarkedPrices.target)} stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
                <text x="55" y={getY(userMarkedPrices.target) - 4} fill="#059669" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  TARGET (DOL) @ {userMarkedPrices.target}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Hovered Candle Tooltip Information without # symbol */}
        {hoveredCandle && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono grid grid-cols-2 sm:grid-cols-5 gap-2 text-slate-800">
            <div><span className="text-slate-500">Candle {hoveredCandle.index + 1}</span></div>
            <div><span className="text-slate-500">Open:</span> <span className="font-bold text-slate-900">{hoveredCandle.candle.open}</span></div>
            <div><span className="text-slate-500">High:</span> <span className="font-bold text-slate-900">{hoveredCandle.candle.high}</span></div>
            <div><span className="text-slate-500">Low:</span> <span className="font-bold text-slate-900">{hoveredCandle.candle.low}</span></div>
            <div><span className="text-slate-500">Close:</span> <span className="font-bold text-slate-900">{hoveredCandle.candle.close}</span></div>
          </div>
        )}
      </div>
    </div>
  );
};
