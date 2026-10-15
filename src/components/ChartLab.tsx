import React, { useState, useEffect } from 'react';
import { Candle } from '../types';
import { chartScenarios } from '../data/chartScenarios';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles,
  BookOpen,
  ShieldCheck,
  Target,
  Layers,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEO } from './SEO';
import { ContextualInternalLinker } from './ContextualInternalLinker';
import { 
  CHART_SCENARIOS_META, 
  getChartScenarioSlug, 
  getChartScenarioUrl 
} from '../utils/workbenchToolRoutes';

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

export interface ChartLabProps {
  initialScenarioSlug?: string;
  initialStepSlug?: string;
  onNavigateUrl?: (url: string) => void;
}

export const ChartLab: React.FC<ChartLabProps> = ({
  initialScenarioSlug,
  initialStepSlug,
  onNavigateUrl
}) => {
  // Resolve initial scenario from slug
  const resolvedScenario = initialScenarioSlug
    ? chartScenarios.find(s => getChartScenarioSlug(s.id) === initialScenarioSlug || s.id === initialScenarioSlug)
    : chartScenarios[0];

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(resolvedScenario ? resolvedScenario.id : chartScenarios[0].id);
  const scenario = chartScenarios.find((s) => s.id === selectedScenarioId) || chartScenarios[0];

  // Sync with prop updates
  useEffect(() => {
    if (initialScenarioSlug) {
      const match = chartScenarios.find(s => getChartScenarioSlug(s.id) === initialScenarioSlug || s.id === initialScenarioSlug);
      if (match && match.id !== selectedScenarioId) {
        setSelectedScenarioId(match.id);
      }
    }
  }, [initialScenarioSlug]);

  const updateScenarioUrl = (scenarioId: string, step?: string) => {
    const targetUrl = getChartScenarioUrl(scenarioId, step);
    if (onNavigateUrl) {
      onNavigateUrl(targetUrl);
    } else if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.location.assign(targetUrl);
    }
  };

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    updateScenarioUrl(scenarioId);
  };

  // Replay State
  const [currentCandleIndex, setCurrentCandleIndex] = useState<number>(scenario.candles.length);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed] = useState<number>(1000);

  // Training Mode vs Inspection Mode
  const [isTrainingMode, setIsTrainingMode] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<TrainingStep>('liquidity_pool');
  
  // User Marked Elements
  const [, setUserMarkedCandles] = useState<{ [key in TrainingStep]?: number }>({});
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
    handleSelectScenario(id);
    const newScen = chartScenarios.find((s) => s.id === id) || chartScenarios[0];
    setCurrentCandleIndex(newScen.candles.length);
    setIsPlaying(false);
    resetTraining();
  };

  // Dimensions & Coordinate mapping
  const chartWidth = 900;
  const chartHeight = 360;
  const visibleCandles = scenario.candles.slice(0, currentCandleIndex);

  const scenarioSlug = getChartScenarioSlug(scenario.id);
  const scenarioMeta = CHART_SCENARIOS_META[scenario.id];
  const canonicalPath = `/tools/chartlab/${scenarioSlug}/`;

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

  const handleChartPriceClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isTrainingMode) return;
    if (activeStep !== 'entry' && activeStep !== 'stop_loss' && activeStep !== 'target') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const normalizedY = (chartHeight - 20 - clickY) / (chartHeight - 40);
    const estimatedPrice = Math.round((minPrice + normalizedY * priceRange) * 100) / 100;

    if (activeStep === 'entry') {
      setUserMarkedPrices((prev) => ({ ...prev, entry: estimatedPrice }));
      setStepFeedback({ text: `✓ Entry placed at ${estimatedPrice.toFixed(2)}.`, isCorrect: true });
      setActiveStep('stop_loss');
    } else if (activeStep === 'stop_loss') {
      setUserMarkedPrices((prev) => ({ ...prev, stop: estimatedPrice }));
      setStepFeedback({ text: `✓ Stop Loss anchored at ${estimatedPrice.toFixed(2)}.`, isCorrect: true });
      setActiveStep('target');
    } else if (activeStep === 'target') {
      setUserMarkedPrices((prev) => ({ ...prev, target: estimatedPrice }));
      setStepFeedback({ text: `✓ Terminal Target locked at ${estimatedPrice.toFixed(2)}. Sequence complete!`, isCorrect: true });
      setActiveStep('completed');
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-6 text-[#F5F7FA]">
      <SEO
        title={scenarioMeta?.metaTitle || `${scenario.title} — Chart Lab | LearnSMC`}
        description={scenarioMeta?.metaDescription || `${scenario.description.substring(0, 150)}...`}
        path={canonicalPath}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Workbench', path: '/tools/' },
          { name: 'Chart Lab', path: '/tools/chartlab/' },
          { name: scenario.title, path: canonicalPath }
        ]}
      />
      
      {/* Top Header & Scenario Switcher */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#5865FF]" />
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                ICT Chart Laboratory
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-mono bg-white/[0.04] text-[#55E6D1] border border-white/[0.08] rounded-md uppercase">
                {isTrainingMode ? 'Guided Sequence' : 'Free Inspection'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9BA1AE] max-w-xl">
              Execute the 8-stage institutional marking sequence candle-by-candle and reason through price delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedScenarioId}
              onChange={(e) => handleScenarioChange(e.target.value)}
              className="bg-[#0C0E13] border border-white/[0.08] text-[#F5F7FA] text-xs font-mono px-3.5 py-2 rounded-lg focus:outline-none focus:border-[#5865FF]/60 cursor-pointer"
            >
              {chartScenarios.map((scen) => (
                <option key={scen.id} value={scen.id} className="bg-[#0C0E13] text-[#F5F7FA]">
                  {scen.asset} • {scen.title}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setIsTrainingMode(!isTrainingMode);
                resetTraining();
              }}
              className="btn-predikt-secondary text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#55E6D1]" />
              <span>{isTrainingMode ? 'Free View' : 'Start 8-Stage Training'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Training HUD Progress Banner */}
      {isTrainingMode && (
        <div className="bg-[#151923] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-[#5865FF]/10 text-[#5865FF] font-mono text-xs rounded border border-[#5865FF]/20">
                Stage {trainingStepConfig[activeStep].number} of 8
              </span>
              <h3 className="font-medium text-[#F5F7FA] text-sm sm:text-base">
                {trainingStepConfig[activeStep].title}
              </h3>
            </div>

            <button
              onClick={resetTraining}
              className="text-xs font-mono text-[#9BA1AE] hover:text-[#F5F7FA] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Sequence</span>
            </button>
          </div>

          <p className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed">
            <strong className="text-[#F5F7FA]">Objective:</strong> {trainingStepConfig[activeStep].instruction}
          </p>

          {stepFeedback && (
            <div className={`p-3 rounded-lg border text-xs font-mono flex items-center gap-2.5 ${
              stepFeedback.isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              {stepFeedback.isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span>{stepFeedback.text}</span>
            </div>
          )}
        </div>
      )}

      {/* Main Chart Window */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        
        {/* Replay Controls & Layer Toggles Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/[0.07] text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentCandleIndex((prev) => Math.max(1, prev - 1))}
              className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[#9BA1AE] hover:text-[#F5F7FA] transition-all cursor-pointer"
              title="Step Back"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn-predikt-blue text-xs py-1.5 px-3.5 flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              <span>{isPlaying ? 'Pause' : 'Replay'}</span>
            </button>

            <button
              onClick={() => setCurrentCandleIndex((prev) => Math.min(scenario.candles.length, prev + 1))}
              className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[#9BA1AE] hover:text-[#F5F7FA] transition-all cursor-pointer"
              title="Step Forward"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <span className="text-[#9BA1AE] ml-2 text-xs font-mono">
              Candle {currentCandleIndex} / {scenario.candles.length}
            </span>
          </div>

          {/* Layer toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLayers((prev) => ({ ...prev, fvg: !prev.fvg }))}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                layers.fvg
                  ? 'bg-[#5865FF]/20 text-[#5865FF] border-[#5865FF]/40 font-medium'
                  : 'bg-white/[0.02] text-[#656B78] border-white/[0.06] hover:text-[#9BA1AE]'
              }`}
            >
              FVG
            </button>
            <button
              onClick={() => setLayers((prev) => ({ ...prev, liquidity: !prev.liquidity }))}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                layers.liquidity
                  ? 'bg-[#55E6D1]/20 text-[#55E6D1] border-[#55E6D1]/40 font-medium'
                  : 'bg-white/[0.02] text-[#656B78] border-white/[0.06] hover:text-[#9BA1AE]'
              }`}
            >
              Liquidity Pools
            </button>
            <button
              onClick={() => setLayers((prev) => ({ ...prev, structure: !prev.structure }))}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                layers.structure
                  ? 'bg-white/[0.15] text-[#F5F7FA] border-white/30 font-medium'
                  : 'bg-white/[0.02] text-[#656B78] border-white/[0.06] hover:text-[#9BA1AE]'
              }`}
            >
              Structure
            </button>
          </div>
        </div>

        {/* SVG Candlestick Chart Area */}
        <div className="overflow-x-auto bg-[#08090D] border border-white/[0.06] rounded-xl p-3">
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
                  <line x1="40" y1={yVal} x2={chartWidth - 20} y2={yVal} stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="35" y={yVal + 3} textAnchor="end" fill="#656B78" fontSize="9" fontFamily="monospace">
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
                      fill="rgba(102, 117, 255, 0.15)"
                      stroke="#6675FF"
                      strokeWidth="1"
                      strokeDasharray="4 2"
                      rx="2"
                    />
                    <text x={startX + 6} y={Math.min(topY, botY) + 12} fill="#6675FF" fontSize="9" fontFamily="monospace" fontWeight="600">
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
                      stroke={isBSL ? '#55E6D1' : '#FF6B7A'}
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <text x={chartWidth - 25} y={yPos - 4} textAnchor="end" fill={isBSL ? '#55E6D1' : '#FF6B7A'} fontSize="9" fontFamily="monospace" fontWeight="600">
                      {ann.label}
                    </text>
                  </g>
                );
              })}

            {/* Candlesticks */}
            {visibleCandles.map((c, idx) => {
              const isBullish = c.close >= c.open;
              const xCenter = getX(idx);
              const openY = getY(c.open);
              const closeY = getY(c.close);
              const highY = getY(c.high);
              const lowY = getY(c.low);
              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.max(2, Math.abs(closeY - openY));

              const candleColor = isBullish ? '#52D273' : '#FF6B7A';

              return (
                <g
                  key={`${c.time}-${idx}`}
                  className="cursor-pointer"
                  onClick={() => handleCandleClick(idx)}
                  onMouseEnter={() => setHoveredCandle({ candle: c, index: idx, x: xCenter, y: bodyTop })}
                  onMouseLeave={() => setHoveredCandle(null)}
                >
                  <line x1={xCenter} y1={highY} x2={xCenter} y2={lowY} stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" />
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
                <line x1="45" y1={getY(userMarkedPrices.entry)} x2={chartWidth - 20} y2={getY(userMarkedPrices.entry)} stroke="#5865FF" strokeWidth="2" />
                <text x="55" y={getY(userMarkedPrices.entry) - 4} fill="#5865FF" fontSize="9" fontFamily="monospace" fontWeight="600">
                  ENTRY @ {userMarkedPrices.entry}
                </text>
              </g>
            )}

            {userMarkedPrices.stop && (
              <g>
                <line x1="45" y1={getY(userMarkedPrices.stop)} x2={chartWidth - 20} y2={getY(userMarkedPrices.stop)} stroke="#FF6B7A" strokeWidth="2" strokeDasharray="4 3" />
                <text x="55" y={getY(userMarkedPrices.stop) - 4} fill="#FF6B7A" fontSize="9" fontFamily="monospace" fontWeight="600">
                  STOP LOSS @ {userMarkedPrices.stop}
                </text>
              </g>
            )}

            {userMarkedPrices.target && (
              <g>
                <line x1="45" y1={getY(userMarkedPrices.target)} x2={chartWidth - 20} y2={getY(userMarkedPrices.target)} stroke="#55E6D1" strokeWidth="2" strokeDasharray="4 3" />
                <text x="55" y={getY(userMarkedPrices.target) - 4} fill="#55E6D1" fontSize="9" fontFamily="monospace" fontWeight="600">
                  TARGET (DOL) @ {userMarkedPrices.target}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Hovered Candle Tooltip Information */}
        {hoveredCandle && (
          <div className="p-3.5 bg-[#151923] border border-white/[0.08] rounded-xl text-xs font-mono grid grid-cols-2 sm:grid-cols-5 gap-2 text-[#9BA1AE]">
            <div><span className="text-[#656B78] uppercase">Candle:</span> <span className="text-[#F5F7FA] font-medium">{hoveredCandle.index + 1}</span></div>
            <div><span className="text-[#656B78] uppercase">Open:</span> <span className="text-[#F5F7FA] font-medium">{hoveredCandle.candle.open}</span></div>
            <div><span className="text-[#656B78] uppercase">High:</span> <span className="text-[#F5F7FA] font-medium">{hoveredCandle.candle.high}</span></div>
            <div><span className="text-[#656B78] uppercase">Low:</span> <span className="text-[#F5F7FA] font-medium">{hoveredCandle.candle.low}</span></div>
            <div><span className="text-[#656B78] uppercase">Close:</span> <span className="text-[#F5F7FA] font-medium">{hoveredCandle.candle.close}</span></div>
          </div>
        )}
      </div>

      {/* SEO Engine & Structured Data */}
      <SEO
        title="Interactive Chart Lab — Candlestick Auction Engine | LearnSMC"
        description="High-definition candlestick auction engine with multi-layer ICT overlays, Fair Value Gaps, liquidity sweeps, and step-by-step mechanical trade delivery."
        canonicalPath="/tools/chartlab/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "LearnSMC Interactive Chart Lab",
          "url": "https://learnsmc.xyz/tools/chartlab/",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "description": "Candlestick auction simulation engine for Smart Money Concepts, algorithmic displacement, and liquidity sweeps.",
          "educationalUse": "Interactive price action analysis and trade replay",
          "provider": {
            "@type": "Organization",
            "name": "LearnSMC",
            "url": "https://learnsmc.xyz/"
          }
        }}
      />

      {/* Static Semantic HTML Documentation Block (Indexable by Googlebot & Search Engines) */}
      <article className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6 text-[#F5F7FA]">
        <header className="border-b border-white/[0.07] pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#55E6D1]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#55E6D1]">
              DOCUMENTATION // ENGINE SPECIFICATION
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
            Candlestick Auction Theory &amp; Algorithmic Delivery Specification
          </h2>
          <p className="text-sm text-[#9BA1AE] mt-1">
            A comprehensive institutional reference on electronic order book mechanics, continuous double auctions, and mechanical trade delivery steps.
          </p>
        </header>

        {/* Section 1: Electronic Auction & Order Book Mechanics */}
        <section className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-[#55E6D1] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#55E6D1]" />
            1. The Electronic Central Limit Order Book (CLOB)
          </h3>
          <p className="text-xs sm:text-sm text-[#C5CBD8] leading-relaxed">
            Market prices in foreign exchange, futures, and equity indexes do not move according to geometric shapes, diagonal trendlines, or retail indicators. 
            Price delivery is governed by electronic matching engines executing continuous double auctions. At any given moment, market participants 
            post resting passive liquidity (Limit Orders) across bid and ask queues, while aggressive participants consume that liquidity using Market Orders.
          </p>
          <p className="text-xs sm:text-sm text-[#C5CBD8] leading-relaxed">
            When buy stops resting above previous swing highs are triggered, they convert into market buy orders. Institutional market makers utilize 
            this influx of buy liquidity to unload their long inventory or initiate large short positions without causing adverse price slippage. 
            This sequence forms the foundation of the <strong>Turtle Soup</strong> and <strong>Liquidity Sweep</strong> phenomenon.
          </p>
        </section>

        {/* Section 2: The 8-Stage Mechanical Replay Execution Pipeline */}
        <section className="space-y-3 pt-3 border-t border-white/[0.06]">
          <h3 className="text-base sm:text-lg font-semibold text-[#5865FF] flex items-center gap-2">
            <Target className="w-4 h-4 text-[#5865FF]" />
            2. The 8-Stage Mechanical Delivery Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-[#C5CBD8] leading-relaxed">
            Every high-probability institutional setup follows an unvarying algorithmic sequence codified into eight discrete milestones:
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#9BA1AE] list-none p-0">
            <li className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">01. Liquidity Pool Identification (BSL / SSL)</strong>
              Locate equal highs (EQH), previous day highs (PDH), or session highs where retail stop-losses accumulate.
            </li>
            <li className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">02. The Liquidity Sweep</strong>
              Price pierces the identified liquidity pool to trigger resting stop orders and inject liquidity into the matching engine.
            </li>
            <li className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">03. Algorithmic Displacement</strong>
              Large institutional candles expand aggressively away from the swept level, printing wide bodies with minimal wicks.
            </li>
            <li className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">04. Market Structure Shift (MSS)</strong>
              The displacement candle closes decisively through a key structural swing point, confirming an algorithmic reversal.
            </li>
            <li className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">05. PD Array Formation (FVG / OB)</strong>
              The displacement leaves a three-candle Fair Value Gap (imbalance) or an unmitigated Order Block.
            </li>
            <li className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">06. Optimal Trade Entry (OTE) Retracement</strong>
              Price retraces into the 62% - 79% Fibonacci discount/premium zone directly into the PD Array.
            </li>
            <li className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">07. Invalidation &amp; Stop Placement</strong>
              Protective stop-loss is placed mechanically beyond the displacement origin or the Order Block threshold.
            </li>
            <li className="bg-[#151923] p-3.5 rounded-xl border border-white/[0.06]">
              <strong className="text-[#F5F7FA] block mb-1">08. Draw on Liquidity (DOL) Target</strong>
              Target is established at the opposing liquidity pool (Sell-Side Liquidity or equal lows) for asymmetric risk-to-reward.
            </li>
          </ol>
        </section>

        {/* Section 3: Technical Parameters & Invalidation Rules */}
        <section className="space-y-3 pt-3 border-t border-white/[0.06]">
          <h3 className="text-base sm:text-lg font-semibold text-[#FFB020] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFB020]" />
            3. Invalidation Rules &amp; Mathematical Parameters
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-[#C5CBD8]">
            <p>
              <strong>Fair Value Gap Invalidation:</strong> An FVG is defined by three consecutive candles where Candle 1 high and Candle 3 low do not overlap. 
              The imbalance is considered violated if a subsequent candle body closes beyond the Consequent Encroachment (the 50% midpoint of the FVG).
            </p>
            <p>
              <strong>Order Block Mean Threshold:</strong> The Order Block represents the last opposite-colored candle before displacement. 
              The 50% midpoint of the candle body (Mean Threshold) is the definitive line in the sand; any body close beyond this level invalidates the setup.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default ChartLab;
