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
      <div 
        onWheel={(e) => { 
          if (e.deltaY !== 0) {
            e.currentTarget.scrollLeft += e.deltaY;
          }
        }} 
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white font-extrabold shadow-md shadow-sky-600/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Concepts Directory */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3 text-xs font-mono">
              <span className="text-slate-600 uppercase font-bold tracking-wider">Concept Index</span>
              <span className="text-sky-800 font-extrabold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">{filteredConcepts.length} Topics</span>
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
                        ? 'bg-sky-50 border-2 border-sky-500 text-sky-950 shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 tracking-wide truncate">{c.name}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase font-bold border border-slate-200">
                        {c.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 font-sans">
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
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
            {/* Subtle Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-sky-700 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-300 font-extrabold uppercase text-[10px] text-sky-800">
                  {concept.category} • ICT Core Framework
                </span>
                {concept.source && (
                  <span className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-mono text-[10px] font-bold flex items-center gap-1">
                    <FileText className="w-3 h-3 text-amber-600" />
                    {concept.source.approximateDate} • {concept.source.conceptStatus}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLayerTab('ladder')}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all bg-slate-50 text-amber-900 border border-amber-300 hover:bg-amber-100"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                  5-Level Ladder
                </button>
                <button
                  onClick={() => setActiveLayerTab('tripartite')}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all bg-slate-50 text-sky-800 border border-sky-300 hover:bg-sky-100"
                >
                  <Cpu className="w-3.5 h-3.5 text-sky-600" />
                  Fidelity Layer
                </button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              {concept.name}
            </h2>

            <p className="text-slate-600 text-sm mt-2 leading-relaxed font-sans">
              {concept.shortDefinition}
            </p>

            {/* Source Reference Sub-Banner */}
            {concept.source && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Primary Mentorship</span>
                  <span className="text-slate-900 font-bold truncate block">{concept.source.mentorship}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Original Terminology</span>
                  <span className="text-amber-800 font-bold truncate block">{concept.source.originalTerminology}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Lecture Reference</span>
                  <span className="text-sky-800 font-bold truncate block">{concept.source.lectureReference || 'Core Series'}</span>
                </div>
              </div>
            )}

            {/* Layer Tabs */}
            <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-200">
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
                        ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20'
                        : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
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
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-sky-700 font-mono text-sm font-bold">
                    <Zap className="w-4 h-4 text-sky-600" />
                    <h3 className="text-slate-900">Why It Exists</h3>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {concept.whyItExists}
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-amber-700 font-mono text-sm font-bold">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <h3 className="text-slate-900">Market Problem It Solves</h3>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {concept.problemItSolves}
                  </p>
                </div>
              </div>

              {/* How ICT Uses It & Causal Connections */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-emerald-700 font-mono text-sm font-bold">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-slate-900">How ICT Employs This in Practice</h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {concept.howICTUsesIt}
                </p>

                {/* Causal Pathway to Next Concept */}
                {concept.causalConnections && concept.causalConnections.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-sky-800 font-bold uppercase">
                      <GitFork className="w-4 h-4 text-sky-600" />
                      <span>Causal Sequence: Why Does This Lead to the Next Step?</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {concept.causalConnections.map((conn, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-sky-800 font-mono font-bold">
                            <span>Next Step: {conn.targetLabel}</span>
                            <ChevronRight className="w-4 h-4 text-sky-600" />
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed">
                            <strong className="text-slate-900">Why it follows:</strong> {conn.whyThisFollows}
                          </p>
                          <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-mono">
                            ⚡ Institutional Mechanic: {conn.institutionalMechanic}
                          </div>
                          <p className="text-rose-700 text-[10px] font-mono">
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
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sky-700 font-mono text-sm font-bold">
                    <Layers className="w-4 h-4 text-sky-600" />
                    <h3 className="text-slate-900">Interactive Step-by-Step Diagram Engine</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Type: <span className="text-sky-800 font-bold">{concept.diagramType}</span>
                  </span>
                </div>

                <InteractiveDiagram diagramType={concept.diagramType} />

                <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-2 font-sans">
                  <h4 className="font-bold text-slate-900 font-mono uppercase text-[11px]">Chart Anatomy Specifications:</h4>
                  <p className="leading-relaxed text-slate-600">{concept.chartAnatomy}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOURCE FIDELITY & TRIPARTITE EPISTEMOLOGY */}
          {activeLayerTab === 'tripartite' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-sky-700 font-mono text-sm font-bold mb-1">
                    <Cpu className="w-4 h-4 text-sky-600" />
                    <h3 className="text-slate-900">Tripartite Epistemological Distinction</h3>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm font-sans">
                    To maintain strict academic and source integrity, this platform separates what ICT explicitly teaches from observable auction orderbook mechanics and derived quantitative SMC interpretations.
                  </p>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  {[
                    { id: 'ict', label: '1. ICT Canonical Teaching', color: 'bg-amber-50 text-amber-900 border-amber-300' },
                    { id: 'observable', label: '2. Observable Auction Mechanics', color: 'bg-sky-50 text-sky-900 border-sky-300' },
                    { id: 'derived', label: '3. Derived SMC Synthesis', color: 'bg-emerald-50 text-emerald-900 border-emerald-300' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTripartiteTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                        activeTripartiteTab === tab.id
                          ? `${tab.color} border font-bold shadow-sm`
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {concept.tripartiteView && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    {activeTripartiteTab === 'ict' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-amber-800 font-mono text-sm font-bold">
                          <Flame className="w-4 h-4 text-amber-600" />
                          <h4>What ICT (Michael J. Huddleston) Explicitly Teaches:</h4>
                        </div>
                        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-sans bg-amber-50 border border-amber-200 p-4 rounded-xl">
                          "{concept.tripartiteView.ictTeaching}"
                        </p>
                        <div className="text-[11px] font-mono text-slate-500">
                          Source: <span className="text-amber-800 font-bold">{concept.source?.mentorship}</span> ({concept.source?.approximateDate})
                        </div>
                      </div>
                    )}

                    {activeTripartiteTab === 'observable' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sky-800 font-mono text-sm font-bold">
                          <Activity className="w-4 h-4 text-sky-600" />
                          <h4>What is Empirically Observable on Orderbooks & Charts:</h4>
                        </div>
                        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-sans bg-sky-50 border border-sky-200 p-4 rounded-xl">
                          {concept.tripartiteView.observableMarketBehavior}
                        </p>
                        <div className="text-[11px] font-mono text-slate-500">
                          Domain: <span className="text-sky-800 font-bold">Central Limit Order Book (CLOB), Matching Engine Microstructure & Auction Theory</span>
                        </div>
                      </div>
                    )}

                    {activeTripartiteTab === 'derived' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-emerald-800 font-mono text-sm font-bold">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <h4>Derived Quantitative & SMC Synthesis:</h4>
                        </div>
                        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-sans bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                          {concept.tripartiteView.derivedInterpretation}
                        </p>
                        <div className="text-[11px] font-mono text-slate-500">
                          Application: <span className="text-emerald-800 font-bold">Rule-based backtesting, statistical edge validation, risk-reward skew</span>
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
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-amber-700 font-mono text-sm font-bold mb-1">
                    <GraduationCap className="w-5 h-5 text-amber-600" />
                    <h3 className="text-slate-900">The 5-Level Conceptual Progression Ladder</h3>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm font-sans">
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
                      className={`p-3 rounded-xl text-left transition-all font-mono ${
                        ladderLevel === step.lvl
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/25'
                          : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                  <div className="p-5 rounded-2xl bg-slate-50 border border-amber-300 space-y-4">
                    <div className="text-amber-900 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Active Explanation Level: {ladderLevel} of 5
                    </div>

                    <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-sans">
                      {ladderLevel === 1 && concept.explanationLadder.level1Child}
                      {ladderLevel === 2 && concept.explanationLadder.level2Beginner}
                      {ladderLevel === 3 && concept.explanationLadder.level3Trader}
                      {ladderLevel === 4 && concept.explanationLadder.level4Advanced}
                      {ladderLevel === 5 && concept.explanationLadder.level5ICTFramework}
                    </p>

                    {/* Actionable Boundaries: When it Matters vs When to Ignore */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>⚡ When Does It Matter?</span>
                        </div>
                        <p className="text-slate-700 text-xs font-sans leading-relaxed">
                          {concept.explanationLadder.whenItMatters}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 space-y-1.5">
                        <div className="flex items-center gap-2 text-rose-800 font-mono text-xs font-bold">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>🚫 When Should You Ignore It?</span>
                        </div>
                        <p className="text-slate-700 text-xs font-sans leading-relaxed">
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
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-rose-700 font-mono text-sm font-bold mb-1">
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    <h3 className="text-slate-900">Deliberate Counterexamples & Fake Setup Traps</h3>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm font-sans">
                    True pattern recognition comes from recognizing setups that look like ICT patterns on the surface, but are structurally invalid traps.
                  </p>
                </div>

                {/* Traps Grid */}
                <div className="space-y-4">
                  {concept.counterexamples && concept.counterexamples.length > 0 ? (
                    concept.counterexamples.map((trap, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-3">
                        <div className="flex items-center justify-between text-rose-800 font-mono text-sm font-bold">
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-600" />
                            {trap.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono uppercase border border-rose-300">
                            Invalid Counterexample
                          </span>
                        </div>
                        <div className="text-xs text-slate-700 font-sans space-y-2">
                          <p><strong className="text-slate-900 font-mono">The Trap:</strong> {trap.trapDescription}</p>
                          <p><strong className="text-rose-700 font-mono">Why It Fails:</strong> {trap.whyItFails}</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-mono">
                          🛡️ Rule of Thumb: {trap.ruleOfThumb}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs space-y-2">
                      <p className="font-bold text-rose-700 font-mono">General Counterexample:</p>
                      <p className="text-slate-600 leading-relaxed font-sans">{concept.counterexample}</p>
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
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-sky-700 font-mono text-sm font-bold">
                    <Clock className="w-4 h-4 text-sky-600" />
                    <h3 className="text-slate-900">Multi-Timeframe Application Matrix</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="text-amber-800 font-mono font-bold block uppercase text-[10px]">Higher Timeframe (HTF)</span>
                      <p className="text-slate-600 font-sans leading-relaxed">{concept.timeframeMatrix.htfApplication}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="text-sky-800 font-mono font-bold block uppercase text-[10px]">Lower Timeframe (LTF)</span>
                      <p className="text-slate-600 font-sans leading-relaxed">{concept.timeframeMatrix.ltfApplication}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="text-emerald-800 font-mono font-bold block uppercase text-[10px]">Session & Timing Context</span>
                      <p className="text-slate-600 font-sans leading-relaxed">{concept.timeframeMatrix.sessionAndTiming}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Strict Invalidation Criteria */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-rose-700 font-mono text-sm font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <h3 className="text-slate-900">Strict Invalidation Criteria</h3>
                </div>
                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-sans bg-rose-50 border border-rose-200 p-4 rounded-xl">
                  {concept.invalidationCriteria}
                </p>
              </div>

              {/* Identification Checklist */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-mono text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-slate-900">Identification Checklist</h3>
                </div>
                <ul className="space-y-2 text-xs font-mono text-slate-700">
                  {concept.identificationRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
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
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-mono text-sm font-bold">
                    <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-slate-900">Bullish Execution Scenario</h3>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-sans bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                    {concept.bullishScenario}
                  </p>
                </div>

                {/* Bearish Scenario */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-rose-700 font-mono text-sm font-bold">
                    <ArrowDownRight className="w-5 h-5 text-rose-600" />
                    <h3 className="text-slate-900">Bearish Execution Scenario</h3>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-sans bg-rose-50 border border-rose-200 p-4 rounded-xl">
                    {concept.bearishScenario}
                  </p>
                </div>
              </div>

              {/* Trade Execution CTA */}
              {onOpenSimulator && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h4 className="font-bold text-slate-900 font-mono text-sm">Practice This Setup in the Decision Simulator</h4>
                    <p className="text-slate-600 text-xs mt-1">Formulate a trade hypothesis using this concept and simulate price delivery.</p>
                  </div>
                  <button
                    onClick={onOpenSimulator}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold font-mono text-xs shadow-md shadow-sky-600/20 transition-all shrink-0"
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
