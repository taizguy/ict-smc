import React, { useState } from 'react';
import { ictConcepts } from '../data/conceptsData';
import { ICTConcept } from '../types';
import { InteractiveDiagram } from './InteractiveDiagram';
import { 
  Compass, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Layers, 
  Sparkles, 
  HelpCircle, 
  ShieldAlert, 
  Zap, 
  BookOpen, 
  FileText, 
  Cpu, 
  Activity, 
  GraduationCap, 
  GitFork, 
  Clock, 
  Target, 
  Check, 
  ChevronRight,
  ShieldCheck,
  Flame,
  Info
} from 'lucide-react';

interface ConceptExplorerProps {
  onSelectConcept?: (id: string) => void;
  onOpenSimulator?: () => void;
}

export const ConceptExplorer: React.FC<ConceptExplorerProps> = ({ onSelectConcept, onOpenSimulator }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedConceptId, setSelectedConceptId] = useState<string>(ictConcepts[0].id);
  const [activeLayerTab, setActiveLayerTab] = useState<
    'overview' | 'tripartite' | 'anatomy' | 'traps_counterexamples' | 'ladder' | 'rules_invalidation' | 'scenarios'
  >('overview');
  const [ladderLevel, setLadderLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [activeTripartiteTab, setActiveTripartiteTab] = useState<'ict' | 'observable' | 'derived'>('ict');

  const concept = ictConcepts.find((c) => c.id === selectedConceptId) || ictConcepts[0];

  const filteredConcepts = selectedCategory === 'all'
    ? ictConcepts
    : ictConcepts.filter((c) => c.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Concepts' },
    { id: 'foundations', label: 'Foundations' },
    { id: 'structure', label: 'Market Structure' },
    { id: 'liquidity', label: 'Liquidity' },
    { id: 'imbalances', label: 'Imbalances & FVGs' },
    { id: 'order_blocks', label: 'Order Blocks & Breakers' },
    { id: 'time_sessions', label: 'Time & Sessions' },
    { id: 'models', label: 'Trade Models' }
  ];

  return (
    <div className="space-y-6">
      {/* Category Pills Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/25'
                : 'bg-[#0B0F19] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Concepts Directory */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-3">
          <div className="bg-[#0B0F19] border border-slate-800/90 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-xs font-mono">
              <span className="text-slate-400 uppercase font-bold tracking-wider">Concept Index</span>
              <span className="text-cyan-300 font-extrabold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">{filteredConcepts.length} Topics</span>
            </div>

            <div className="space-y-1.5 max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
              {filteredConcepts.map((c) => {
                const isSelected = c.id === selectedConceptId;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedConceptId(c.id);
                      if (onSelectConcept) onSelectConcept(c.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs font-mono transition-all space-y-1 ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/90 to-[#070A12] border border-cyan-500/60 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white tracking-wide truncate">{c.name}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 uppercase font-bold">
                        {c.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 font-sans">
                      {c.shortDefinition}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Deep Encyclopedic Breakdown */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Concept Header Card with Source Provenance */}
          <div className="bg-[#0B0F19] border border-slate-800/90 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            {/* Subtle Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-cyan-400 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-700/60 font-extrabold uppercase text-[10px] text-cyan-300">
                  {concept.category} • ICT Core Framework
                </span>
                {concept.source && (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950/70 border border-amber-600/60 text-amber-300 font-mono text-[10px] font-bold flex items-center gap-1">
                    <FileText className="w-3 h-3 text-amber-400" />
                    {concept.source.approximateDate} • {concept.source.conceptStatus}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLayerTab('ladder')}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all bg-[#070A12] text-amber-300 border border-amber-500/40 hover:bg-slate-800"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  5-Level Ladder
                </button>
                <button
                  onClick={() => setActiveLayerTab('tripartite')}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all bg-[#070A12] text-cyan-300 border border-cyan-500/40 hover:bg-slate-800"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  Fidelity Layer
                </button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              {concept.name}
            </h2>

            <p className="text-slate-200 text-sm mt-2 leading-relaxed font-sans">
              {concept.shortDefinition}
            </p>

            {/* Source Reference Sub-Banner */}
            {concept.source && (
              <div className="mt-4 p-4 rounded-xl bg-[#070A12] border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Primary Mentorship</span>
                  <span className="text-slate-200 font-bold truncate block">{concept.source.mentorship}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Original Terminology</span>
                  <span className="text-amber-300 font-bold truncate block">{concept.source.originalTerminology}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Lecture Reference</span>
                  <span className="text-cyan-300 font-bold truncate block">{concept.source.lectureReference || 'Core Series'}</span>
                </div>
              </div>
            )}

            {/* Layer Tabs */}
            <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800/80">
              {[
                { id: 'overview', label: '1. Mechanism & Logic', icon: Info },
                { id: 'anatomy', label: '2. Anatomy & Diagram', icon: Layers },
                { id: 'tripartite', label: '3. Source Fidelity (Tripartite)', icon: Cpu },
                { id: 'ladder', label: '4. 5-Level Ladder', icon: GraduationCap },
                { id: 'traps_counterexamples', label: '5. Traps & Counterexamples', icon: ShieldAlert },
                { id: 'rules_invalidation', label: '6. Rules & Matrix', icon: CheckCircle2 },
                { id: 'scenarios', label: '7. Scenarios & Trade Flow', icon: Zap }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveLayerTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                      activeLayerTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25'
                        : 'bg-[#070A12] text-slate-300 border border-slate-800 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: OVERVIEW & MECHANISM */}
          {activeLayerTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold">
                    <Zap className="w-4 h-4" />
                    <h3>Why It Exists</h3>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    {concept.whyItExists}
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold">
                    <HelpCircle className="w-4 h-4" />
                    <h3>Market Problem It Solves</h3>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    {concept.problemItSolves}
                  </p>
                </div>
              </div>

              {/* How ICT Uses It & Causal Connections */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
                  <BookOpen className="w-4 h-4" />
                  <h3>How ICT Employs This in Practice</h3>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  {concept.howICTUsesIt}
                </p>

                {/* Causal Pathway to Next Concept */}
                {concept.causalConnections && concept.causalConnections.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                      <GitFork className="w-4 h-4" />
                      <span>Causal Sequence: Why Does This Lead to the Next Step?</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {concept.causalConnections.map((conn, idx) => (
                        <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-cyan-300 font-mono font-bold">
                            <span>Next Step: {conn.targetLabel}</span>
                            <ChevronRight className="w-4 h-4 text-cyan-400" />
                          </div>
                          <p className="text-slate-400 text-[11px] leading-relaxed">
                            <strong className="text-slate-200">Why it follows:</strong> {conn.whyThisFollows}
                          </p>
                          <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-amber-300/90 font-mono">
                            ⚡ Institutional Mechanic: {conn.institutionalMechanic}
                          </div>
                          <p className="text-rose-400/90 text-[10px] font-mono">
                            ⚠️ Risk of skipping: {conn.riskOfSkipping}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ANATOMY & INTERACTIVE DIAGRAM */}
          {activeLayerTab === 'anatomy' && (
            <div className="space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold">
                    <Layers className="w-4 h-4" />
                    <h3>Interactive Step-by-Step Diagram Engine</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Type: <span className="text-cyan-300">{concept.diagramType}</span>
                  </span>
                </div>

                <InteractiveDiagram diagramType={concept.diagramType} />

                <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-2 font-sans">
                  <h4 className="font-bold text-white font-mono uppercase text-[11px]">Chart Anatomy Specifications:</h4>
                  <p className="leading-relaxed text-slate-400">{concept.chartAnatomy}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOURCE FIDELITY & TRIPARTITE EPISTEMOLOGY */}
          {activeLayerTab === 'tripartite' && (
            <div className="space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold mb-1">
                    <Cpu className="w-4 h-4" />
                    <h3>Tripartite Epistemological Distinction</h3>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm font-sans">
                    To maintain strict academic and source integrity, this platform separates what ICT explicitly teaches from observable auction orderbook mechanics and derived quantitative SMC interpretations.
                  </p>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  {[
                    { id: 'ict', label: '1. ICT Canonical Teaching', color: 'text-amber-400 border-amber-500' },
                    { id: 'observable', label: '2. Observable Auction Mechanics', color: 'text-cyan-400 border-cyan-500' },
                    { id: 'derived', label: '3. Derived SMC Synthesis', color: 'text-emerald-400 border-emerald-500' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTripartiteTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                        activeTripartiteTab === tab.id
                          ? `bg-slate-800 ${tab.color} border font-bold shadow-md`
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {concept.tripartiteView && (
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                    {activeTripartiteTab === 'ict' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold">
                          <Flame className="w-4 h-4" />
                          <h4>What ICT (Michael J. Huddleston) Explicitly Teaches:</h4>
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans bg-amber-950/20 border border-amber-900/40 p-4 rounded-lg">
                          "{concept.tripartiteView.ictTeaching}"
                        </p>
                        <div className="text-[11px] font-mono text-slate-400">
                          Source: <span className="text-amber-300">{concept.source?.mentorship}</span> ({concept.source?.approximateDate})
                        </div>
                      </div>
                    )}

                    {activeTripartiteTab === 'observable' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold">
                          <Activity className="w-4 h-4" />
                          <h4>What is Empirically Observable on Orderbooks & Charts:</h4>
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans bg-cyan-950/20 border border-cyan-900/40 p-4 rounded-lg">
                          {concept.tripartiteView.observableMarketBehavior}
                        </p>
                        <div className="text-[11px] font-mono text-slate-400">
                          Domain: <span className="text-cyan-300">Central Limit Order Book (CLOB), Matching Engine Microstructure & Auction Theory</span>
                        </div>
                      </div>
                    )}

                    {activeTripartiteTab === 'derived' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
                          <ShieldCheck className="w-4 h-4" />
                          <h4>Derived Quantitative & SMC Synthesis:</h4>
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-lg">
                          {concept.tripartiteView.derivedInterpretation}
                        </p>
                        <div className="text-[11px] font-mono text-slate-400">
                          Application: <span className="text-emerald-300">Rule-based backtesting, statistical edge validation, risk-reward skew</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: 5-LEVEL EXPLANATION LADDER */}
          {activeLayerTab === 'ladder' && (
            <div className="space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold mb-1">
                    <GraduationCap className="w-5 h-5" />
                    <h3>The 5-Level Conceptual Progression Ladder</h3>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm font-sans">
                    Progress from intuitive first-principles metaphors up to advanced algorithmic interbank execution models.
                  </p>
                </div>

                {/* Ladder Level Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { lvl: 1, title: 'Level 1: Child Analogy', desc: 'Intuitive metaphor' },
                    { lvl: 2, title: 'Level 2: Beginner', desc: 'Chart behavior' },
                    { lvl: 3, title: 'Level 3: Trader', desc: 'Orderflow & execution' },
                    { lvl: 4, title: 'Level 4: Advanced', desc: 'Intermarket & timing' },
                    { lvl: 5, title: 'Level 5: Canonical ICT', desc: 'IPDA algorithmic model' }
                  ].map((step) => (
                    <button
                      key={step.lvl}
                      onClick={() => setLadderLevel(step.lvl as any)}
                      className={`p-3 rounded-lg text-left transition-all font-mono ${
                        ladderLevel === step.lvl
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <span className="block text-xs font-bold">{step.title}</span>
                      <span className={`text-[10px] block truncate ${ladderLevel === step.lvl ? 'text-slate-900' : 'text-slate-500'}`}>
                        {step.desc}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Ladder Content Card */}
                {concept.explanationLadder && (
                  <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-4">
                    <div className="text-amber-400 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Active Explanation Level: {ladderLevel} of 5
                    </div>

                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
                      {ladderLevel === 1 && concept.explanationLadder.level1Child}
                      {ladderLevel === 2 && concept.explanationLadder.level2Beginner}
                      {ladderLevel === 3 && concept.explanationLadder.level3Trader}
                      {ladderLevel === 4 && concept.explanationLadder.level4Advanced}
                      {ladderLevel === 5 && concept.explanationLadder.level5ICTFramework}
                    </p>

                    {/* Actionable Boundaries: When it Matters vs When to Ignore */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                      <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                          <Check className="w-4 h-4" />
                          <span>⚡ When Does It Matter?</span>
                        </div>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed">
                          {concept.explanationLadder.whenItMatters}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-800/40 space-y-1.5">
                        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
                          <XCircle className="w-4 h-4" />
                          <span>🚫 When Should You Ignore It?</span>
                        </div>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed">
                          {concept.explanationLadder.whenToIgnore}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: TRAPS & COUNTEREXAMPLES (ANTI-SLOP PATTERN RECOGNITION) */}
          {activeLayerTab === 'traps_counterexamples' && (
            <div className="space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-sm font-bold mb-1">
                    <ShieldAlert className="w-5 h-5" />
                    <h3>Deliberate Counterexamples & Fake Setup Traps</h3>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm font-sans">
                    True pattern recognition comes from recognizing setups that look like ICT patterns on the surface, but are structurally invalid traps.
                  </p>
                </div>

                {/* Traps Grid */}
                <div className="space-y-4">
                  {concept.counterexamples && concept.counterexamples.length > 0 ? (
                    concept.counterexamples.map((trap, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-rose-900/40 space-y-3">
                        <div className="flex items-center justify-between text-rose-300 font-mono text-sm font-bold">
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-500" />
                            {trap.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-400 font-mono uppercase">
                            Invalid Counterexample
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 font-sans space-y-2">
                          <p><strong className="text-slate-400 font-mono">The Trap:</strong> {trap.trapDescription}</p>
                          <p><strong className="text-rose-400 font-mono">Why It Fails:</strong> {trap.whyItFails}</p>
                        </div>
                        <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-amber-300 text-xs font-mono">
                          🛡️ Rule of Thumb: {trap.ruleOfThumb}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs space-y-2">
                      <p className="font-bold text-rose-400 font-mono">General Counterexample:</p>
                      <p className="text-slate-400 leading-relaxed font-sans">{concept.counterexample}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RULES, TIMEFRAME MATRIX & INVALIDATION */}
          {activeLayerTab === 'rules_invalidation' && (
            <div className="space-y-6">
              {/* Timeframe Matrix */}
              {concept.timeframeMatrix && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold">
                    <Clock className="w-4 h-4" />
                    <h3>Multi-Timeframe Application Matrix</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-amber-400 font-mono font-bold block uppercase text-[10px]">Higher Timeframe (HTF)</span>
                      <p className="text-slate-300 font-sans leading-relaxed">{concept.timeframeMatrix.htfApplication}</p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-cyan-400 font-mono font-bold block uppercase text-[10px]">Lower Timeframe (LTF)</span>
                      <p className="text-slate-300 font-sans leading-relaxed">{concept.timeframeMatrix.ltfApplication}</p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-emerald-400 font-mono font-bold block uppercase text-[10px]">Session & Timing Context</span>
                      <p className="text-slate-300 font-sans leading-relaxed">{concept.timeframeMatrix.sessionAndTiming}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Strict Invalidation Criteria */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-sm font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <h3>Strict Invalidation Criteria</h3>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans bg-rose-950/20 border border-rose-900/30 p-4 rounded-lg">
                  {concept.invalidationCriteria}
                </p>
              </div>

              {/* Identification Checklist */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3>Identification Checklist</h3>
                </div>
                <ul className="space-y-2 text-xs font-mono text-slate-300">
                  {concept.identificationRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 7: SCENARIOS & TRADE FLOW */}
          {activeLayerTab === 'scenarios' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bullish Scenario */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
                    <ArrowUpRight className="w-5 h-5" />
                    <h3>Bullish Execution Scenario</h3>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-lg">
                    {concept.bullishScenario}
                  </p>
                </div>

                {/* Bearish Scenario */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-sm font-bold">
                    <ArrowDownRight className="w-5 h-5" />
                    <h3>Bearish Execution Scenario</h3>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans bg-rose-950/20 border border-rose-900/30 p-4 rounded-lg">
                    {concept.bearishScenario}
                  </p>
                </div>
              </div>

              {/* Trade Execution CTA */}
              {onOpenSimulator && (
                <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white font-mono text-sm">Practice This Setup in the Decision Simulator</h4>
                    <p className="text-slate-400 text-xs mt-1">Formulate a trade hypothesis using this concept and simulate price delivery.</p>
                  </div>
                  <button
                    onClick={onOpenSimulator}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-all shrink-0"
                  >
                    Open Simulator
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
