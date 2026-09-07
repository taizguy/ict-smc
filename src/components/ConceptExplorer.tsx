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
import { BauhausNavScroller } from './BauhausNavScroller';

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
      {/* Category Pills Header with BauhausNavScroller */}
      <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-3">
        <BauhausNavScroller>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono font-black uppercase whitespace-nowrap transition-all border-2 border-[#121212] cursor-pointer shrink-0 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                selectedCategory === cat.id
                  ? 'bg-[#D02020] text-white shadow-[3px_3px_0px_0px_#121212]'
                  : 'bg-white text-[#121212] hover:bg-[#F0C020]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </BauhausNavScroller>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Concepts Directory */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-3">
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-5">
            <div className="flex items-center justify-between pb-3 border-b-4 border-[#121212] mb-3 text-xs font-mono">
              <span className="text-[#121212] uppercase font-black tracking-wider text-[11px]">Concept Index</span>
              <span className="text-white font-black bg-[#121212] px-3 py-0.5 text-[10px] uppercase">
                {filteredConcepts.length} Topics
              </span>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
              {filteredConcepts.map((c) => {
                const isSelected = c.id === selectedConceptId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedConceptId(c.id);
                      if (onSelectConcept) onSelectConcept(c.id);
                    }}
                    className={`w-full text-left p-3 text-xs font-mono transition-all space-y-1 border-2 border-[#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                      isSelected
                        ? 'bg-[#F0C020] text-[#121212] shadow-[3px_3px_0px_0px_#121212] font-black'
                        : 'bg-white text-[#121212] hover:bg-[#F0F0F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-black uppercase tracking-tight truncate text-[#121212]">{c.name}</span>
                      <span className="text-[8px] px-1.5 py-0.5 bg-[#121212] text-white uppercase font-black shrink-0">
                        {c.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#121212]/80 line-clamp-1 font-medium">
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
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 relative overflow-hidden space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-[#D02020] text-white border-2 border-[#121212] font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_#121212]">
                  {concept.category} • ICT Core Framework
                </span>
                {concept.source && (
                  <span className="px-3 py-1 bg-[#FFF9C4] border-2 border-[#121212] text-[#121212] font-mono text-[10px] font-black uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_#121212]">
                    <FileText className="w-3 h-3 text-[#121212]" />
                    {concept.source.approximateDate} • {concept.source.conceptStatus}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLayerTab('ladder')}
                  className="px-4 py-1.5 text-xs font-mono font-black uppercase flex items-center gap-1.5 transition-all bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  <GraduationCap className="w-3.5 h-3.5 stroke-[2.5]" />
                  5-Level Ladder
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLayerTab('tripartite')}
                  className="px-4 py-1.5 text-xs font-mono font-black uppercase flex items-center gap-1.5 transition-all bg-[#1040C0] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  <Cpu className="w-3.5 h-3.5 stroke-[2.5]" />
                  Fidelity Layer
                </button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#121212] uppercase tracking-tight">
              {concept.name}
            </h2>

            <p className="text-[#121212] text-sm leading-relaxed font-medium">
              {concept.shortDefinition}
            </p>

            {/* Source Reference Sub-Banner */}
            {concept.source && (
              <div className="p-4 bg-[#F0F0F0] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <span className="text-[#121212]/60 block text-[10px] uppercase font-black">Primary Mentorship</span>
                  <span className="text-[#121212] font-black uppercase truncate block">{concept.source.mentorship}</span>
                </div>
                <div>
                  <span className="text-[#121212]/60 block text-[10px] uppercase font-black">Original Terminology</span>
                  <span className="text-[#1040C0] font-black uppercase truncate block">{concept.source.originalTerminology}</span>
                </div>
                <div>
                  <span className="text-[#121212]/60 block text-[10px] uppercase font-black">Lecture Reference</span>
                  <span className="text-[#D02020] font-black uppercase truncate block">{concept.source.lectureReference || 'Core Series'}</span>
                </div>
              </div>
            )}

            {/* Layer Tabs with BauhausNavScroller */}
            <div className="pt-4 border-t-4 border-[#121212]">
              <div className="text-[10px] font-mono font-black uppercase tracking-widest text-[#121212]/60 mb-2">
                ANALYSIS MODULES (SCROLL WITH ARROWS):
              </div>
              <BauhausNavScroller>
                {[
                  { id: 'overview', label: '1. Mechanism & Logic', icon: Info },
                  { id: 'anatomy', label: '2. Anatomy & Diagram', icon: Layers },
                  { id: 'tripartite', label: '3. Source Fidelity', icon: Cpu },
                  { id: 'ladder', label: '4. 5-Level Ladder', icon: GraduationCap },
                  { id: 'traps_counterexamples', label: '5. Traps & Counters', icon: ShieldAlert },
                  { id: 'rules_invalidation', label: '6. Rules & Matrix', icon: CheckCircle2 },
                  { id: 'scenarios', label: '7. Trade Scenarios', icon: Zap }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeLayerTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveLayerTab(tab.id as any)}
                      className={`px-4 py-2 text-xs font-mono font-black uppercase flex items-center gap-1.5 transition-all border-2 border-[#121212] cursor-pointer shrink-0 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                        isActive
                          ? 'bg-[#1040C0] text-white shadow-[3px_3px_0px_0px_#121212]'
                          : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                      {tab.label}
                    </button>
                  );
                })}
              </BauhausNavScroller>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & MECHANISM */}
          {activeLayerTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#D02020] font-mono text-sm font-black uppercase">
                    <Zap className="w-4 h-4 text-[#D02020] stroke-[2.5]" />
                    <h3>Why It Exists</h3>
                  </div>
                  <p className="text-[#121212] text-xs sm:text-sm leading-relaxed font-medium">
                    {concept.whyItExists}
                  </p>
                </div>

                <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#1040C0] font-mono text-sm font-black uppercase">
                    <HelpCircle className="w-4 h-4 text-[#1040C0] stroke-[2.5]" />
                    <h3>Market Problem It Solves</h3>
                  </div>
                  <p className="text-[#121212] text-xs sm:text-sm leading-relaxed font-medium">
                    {concept.problemItSolves}
                  </p>
                </div>
              </div>

              {/* How ICT Uses It & Causal Connections */}
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#121212] font-mono text-sm font-black uppercase">
                  <BookOpen className="w-4 h-4 stroke-[2.5]" />
                  <h3>How ICT Employs This in Practice</h3>
                </div>
                <p className="text-[#121212] text-xs sm:text-sm leading-relaxed font-medium">
                  {concept.howICTUsesIt}
                </p>

                {/* Causal Pathway to Next Concept */}
                {concept.causalConnections && concept.causalConnections.length > 0 && (
                  <div className="mt-4 pt-4 border-t-4 border-[#121212] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#D02020] font-black uppercase">
                      <GitFork className="w-4 h-4 stroke-[2.5]" />
                      <span>Causal Sequence: Why Does This Lead to the Next Step?</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {concept.causalConnections.map((conn, idx) => (
                        <div key={idx} className="p-4 bg-[#F0F0F0] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] space-y-2 text-xs font-mono">
                          <div className="flex items-center justify-between text-[#D02020] font-black uppercase">
                            <span>Next Step: {conn.targetLabel}</span>
                            <ChevronRight className="w-4 h-4 stroke-[3]" />
                          </div>
                          <p className="text-[#121212] text-[11px] leading-relaxed font-medium">
                            <strong className="text-[#121212] font-black">Why it follows:</strong> {conn.whyThisFollows}
                          </p>
                          <div className="p-2.5 bg-[#FFF9C4] border border-[#121212] text-[11px] text-[#121212] font-bold">
                            ⚡ Institutional Mechanic: {conn.institutionalMechanic}
                          </div>
                          <p className="text-[#D02020] text-[10px] font-black uppercase">
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
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-[#121212] font-mono text-sm font-black uppercase">
                    <Layers className="w-4 h-4 stroke-[2.5]" />
                    <h3>Interactive Step-by-Step Diagram Engine</h3>
                  </div>
                  <span className="text-xs font-mono text-[#121212]">
                    Type: <span className="text-[#D02020] font-black uppercase">{concept.diagramType}</span>
                  </span>
                </div>

                <div className="border-2 border-[#121212]">
                  <InteractiveDiagram type={concept.diagramType as any} title={concept.name} />
                </div>

                <div className="pt-3 border-t-2 border-[#121212] text-xs text-[#121212] space-y-2">
                  <h4 className="font-black text-[#121212] font-mono uppercase text-[11px]">Chart Anatomy Specifications:</h4>
                  <p className="leading-relaxed text-[#121212] font-medium">{concept.chartAnatomy}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOURCE FIDELITY & TRIPARTITE EPISTEMOLOGY */}
          {activeLayerTab === 'tripartite' && (
            <div className="space-y-6">
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-[#121212] font-mono text-sm font-black uppercase mb-1">
                    <Cpu className="w-4 h-4 stroke-[2.5]" />
                    <h3>Tripartite Epistemological Distinction</h3>
                  </div>
                  <p className="text-[#121212]/80 text-xs sm:text-sm font-medium">
                    To maintain strict academic and source integrity, this platform separates what ICT explicitly teaches from observable auction orderbook mechanics and derived quantitative SMC interpretations.
                  </p>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center gap-2 border-b-4 border-[#121212] pb-3 flex-wrap">
                  {[
                    { id: 'ict', label: '1. ICT Canonical Teaching' },
                    { id: 'observable', label: '2. Observable Auction Mechanics' },
                    { id: 'derived', label: '3. Derived SMC Synthesis' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTripartiteTab(tab.id as any)}
                      className={`px-4 py-2 text-xs font-mono font-black uppercase transition-all border-2 border-[#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                        activeTripartiteTab === tab.id
                          ? 'bg-[#F0C020] text-[#121212] shadow-[2px_2px_0px_0px_#121212]'
                          : 'bg-white text-[#121212] hover:bg-[#F0F0F0]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {concept.tripartiteView && (
                  <div className="p-5 bg-[#FAF9F5] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] space-y-4">
                    {activeTripartiteTab === 'ict' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#D02020] font-mono text-sm font-black uppercase">
                          <Flame className="w-4 h-4 stroke-[2.5]" />
                          <h4>What ICT (Michael J. Huddleston) Explicitly Teaches:</h4>
                        </div>
                        <p className="text-[#121212] text-xs sm:text-sm leading-relaxed font-medium bg-[#FFF9C4] border-2 border-[#121212] p-4">
                          "{concept.tripartiteView.ictTeaching}"
                        </p>
                        <div className="text-[11px] font-mono text-[#121212]/70 font-bold">
                          Source: <span className="text-[#121212] font-black uppercase">{concept.source?.mentorship}</span> ({concept.source?.approximateDate})
                        </div>
                      </div>
                    )}

                    {activeTripartiteTab === 'observable' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#1040C0] font-mono text-sm font-black uppercase">
                          <Activity className="w-4 h-4 stroke-[2.5]" />
                          <h4>What is Empirically Observable on Orderbooks &amp; Charts:</h4>
                        </div>
                        <p className="text-[#121212] text-xs sm:text-sm leading-relaxed font-medium bg-[#E0E7FF] border-2 border-[#121212] p-4">
                          {concept.tripartiteView.observableMarketBehavior}
                        </p>
                        <div className="text-[11px] font-mono text-[#121212]/70 font-bold">
                          Domain: <span className="text-[#1040C0] font-black">Central Limit Order Book (CLOB), Matching Engine Microstructure &amp; Auction Theory</span>
                        </div>
                      </div>
                    )}

                    {activeTripartiteTab === 'derived' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#121212] font-mono text-sm font-black uppercase">
                          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                          <h4>Derived Quantitative &amp; SMC Synthesis:</h4>
                        </div>
                        <p className="text-[#121212] text-xs sm:text-sm leading-relaxed font-medium bg-[#DCFCE7] border-2 border-[#121212] p-4">
                          {concept.tripartiteView.derivedInterpretation}
                        </p>
                        <div className="text-[11px] font-mono text-[#121212]/70 font-bold">
                          Application: <span className="text-[#121212] font-black">Rule-based backtesting, statistical edge validation, risk-reward skew</span>
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
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[#121212] font-mono text-sm font-black uppercase mb-1">
                    <GraduationCap className="w-5 h-5 stroke-[2.5]" />
                    <h3>The 5-Level Conceptual Progression Ladder</h3>
                  </div>
                  <p className="text-[#121212]/80 text-xs sm:text-sm font-medium">
                    Progress from intuitive first-principles metaphors up to advanced algorithmic interbank execution models.
                  </p>
                </div>

                {/* Ladder Level Selector with BauhausNavScroller */}
                <BauhausNavScroller>
                  {[
                    { lvl: 1, title: 'L1: Child Analogy', desc: 'Metaphor' },
                    { lvl: 2, title: 'L2: Beginner', desc: 'Chart behavior' },
                    { lvl: 3, title: 'L3: Trader', desc: 'Orderflow' },
                    { lvl: 4, title: 'L4: Advanced', desc: 'Intermarket' },
                    { lvl: 5, title: 'L5: Canonical ICT', desc: 'IPDA algorithmic' }
                  ].map((step) => (
                    <button
                      key={step.lvl}
                      type="button"
                      onClick={() => setLadderLevel(step.lvl as any)}
                      className={`p-3 text-left transition-all font-mono border-2 border-[#121212] cursor-pointer min-w-[140px] shrink-0 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                        ladderLevel === step.lvl
                          ? 'bg-[#F0C020] text-[#121212] font-black shadow-[3px_3px_0px_0px_#121212]'
                          : 'bg-white text-[#121212] hover:bg-[#F0F0F0]'
                      }`}
                    >
                      <span className="block text-xs font-black uppercase">{step.title}</span>
                      <span className="text-[10px] block truncate text-[#121212]/70 font-bold uppercase">
                        {step.desc}
                      </span>
                    </button>
                  ))}
                </BauhausNavScroller>

                {/* Ladder Content Card */}
                {concept.explanationLadder && (
                  <div className="p-6 bg-[#FAF9F5] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] space-y-4">
                    <div className="text-[#D02020] font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 stroke-[2.5]" />
                      Active Explanation Level: {ladderLevel} of 5
                    </div>

                    <p className="text-[#121212] text-sm sm:text-base leading-relaxed font-medium">
                      {ladderLevel === 1 && concept.explanationLadder.level1Child}
                      {ladderLevel === 2 && concept.explanationLadder.level2Beginner}
                      {ladderLevel === 3 && concept.explanationLadder.level3Trader}
                      {ladderLevel === 4 && concept.explanationLadder.level4Advanced}
                      {ladderLevel === 5 && concept.explanationLadder.level5ICTFramework}
                    </p>

                    {/* Actionable Boundaries: When it Matters vs When to Ignore */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-[#121212]">
                      <div className="p-4 bg-[#DCFCE7] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] space-y-1.5">
                        <div className="flex items-center gap-2 text-[#121212] font-mono text-xs font-black uppercase">
                          <Check className="w-4 h-4 text-[#166534] stroke-[3]" />
                          <span>⚡ When Does It Matter?</span>
                        </div>
                        <p className="text-[#121212] text-xs font-medium leading-relaxed">
                          {concept.explanationLadder.whenItMatters}
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] space-y-1.5">
                        <div className="flex items-center gap-2 text-[#D02020] font-mono text-xs font-black uppercase">
                          <XCircle className="w-4 h-4 stroke-[2.5]" />
                          <span>🚫 When Should You Ignore It?</span>
                        </div>
                        <p className="text-[#121212] text-xs font-medium leading-relaxed">
                          {concept.explanationLadder.whenToIgnore}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: TRAPS & COUNTEREXAMPLES */}
          {activeLayerTab === 'traps_counterexamples' && (
            <div className="space-y-6">
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 sm:p-7 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-[#D02020] font-mono text-sm font-black uppercase mb-1">
                    <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
                    <h3>Deliberate Counterexamples &amp; Fake Setup Traps</h3>
                  </div>
                  <p className="text-[#121212]/80 text-xs sm:text-sm font-medium">
                    True pattern recognition comes from recognizing setups that look like ICT patterns on the surface, but are structurally invalid traps.
                  </p>
                </div>

                {/* Traps Grid */}
                <div className="space-y-4">
                  {concept.counterexamples && concept.counterexamples.length > 0 ? (
                    concept.counterexamples.map((trap, idx) => (
                      <div key={idx} className="p-5 bg-rose-50 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] space-y-3 font-mono">
                        <div className="flex items-center justify-between text-[#D02020] text-sm font-black uppercase flex-wrap gap-2">
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                            {trap.title}
                          </span>
                          <span className="text-[10px] px-2.5 py-0.5 bg-[#D02020] text-white border border-[#121212] uppercase font-black">
                            Invalid Counterexample
                          </span>
                        </div>
                        <div className="text-xs text-[#121212] space-y-2">
                          <p><strong className="font-black text-[#121212] uppercase">The Trap:</strong> {trap.trapDescription}</p>
                          <p><strong className="font-black text-[#D02020] uppercase">Why It Fails:</strong> {trap.whyItFails}</p>
                        </div>
                        <div className="p-3 bg-[#FFF9C4] border border-[#121212] text-[#121212] text-xs font-bold">
                          🛡️ Rule of Thumb: {trap.ruleOfThumb}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 bg-[#FAF9F5] border-2 border-[#121212] text-[#121212] text-xs space-y-2">
                      <p className="font-black text-[#D02020] font-mono uppercase">General Counterexample:</p>
                      <p className="leading-relaxed font-medium">{concept.counterexample}</p>
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
                <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-4">
                  <div className="flex items-center gap-2 text-[#121212] font-mono text-sm font-black uppercase">
                    <Clock className="w-4 h-4 stroke-[2.5]" />
                    <h3>Multi-Timeframe Application Matrix</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="p-4 bg-[#FFF9C4] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] space-y-1.5">
                      <span className="text-[#121212] font-black block uppercase text-[10px]">Higher Timeframe (HTF)</span>
                      <p className="text-[#121212] leading-relaxed font-medium">{concept.timeframeMatrix.htfApplication}</p>
                    </div>
                    <div className="p-4 bg-[#FEE2E2] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] space-y-1.5">
                      <span className="text-[#D02020] font-black block uppercase text-[10px]">Lower Timeframe (LTF)</span>
                      <p className="text-[#121212] leading-relaxed font-medium">{concept.timeframeMatrix.ltfApplication}</p>
                    </div>
                    <div className="p-4 bg-[#E0E7FF] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] space-y-1.5">
                      <span className="text-[#1040C0] font-black block uppercase text-[10px]">Session &amp; Timing Context</span>
                      <p className="text-[#121212] leading-relaxed font-medium">{concept.timeframeMatrix.sessionAndTiming}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Strict Invalidation Criteria */}
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-3">
                <div className="flex items-center gap-2 text-[#D02020] font-mono text-sm font-black uppercase">
                  <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
                  <h3>Strict Invalidation Criteria</h3>
                </div>
                <p className="text-[#121212] text-xs sm:text-sm leading-relaxed font-medium bg-rose-50 border-2 border-[#121212] p-4">
                  {concept.invalidationCriteria}
                </p>
              </div>

              {/* Identification Checklist */}
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-3">
                <div className="flex items-center gap-2 text-[#121212] font-mono text-sm font-black uppercase">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <h3>Identification Checklist</h3>
                </div>
                <ul className="space-y-2 text-xs font-mono text-[#121212]">
                  {concept.identificationRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-[#F0F0F0] p-3 border-2 border-[#121212]">
                      <Check className="w-4 h-4 text-[#1040C0] shrink-0 mt-0.5 stroke-[3]" />
                      <span className="leading-relaxed font-bold">{rule}</span>
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
                <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#1040C0] font-mono text-sm font-black uppercase">
                    <ArrowUpRight className="w-5 h-5 stroke-[3]" />
                    <h3>Bullish Execution Scenario</h3>
                  </div>
                  <p className="text-[#121212] text-xs sm:text-sm leading-relaxed font-medium bg-[#E0E7FF] border-2 border-[#121212] p-4">
                    {concept.bullishScenario}
                  </p>
                </div>

                {/* Bearish Scenario */}
                <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#D02020] font-mono text-sm font-black uppercase">
                    <ArrowDownRight className="w-5 h-5 stroke-[3]" />
                    <h3>Bearish Execution Scenario</h3>
                  </div>
                  <p className="text-[#121212] text-xs sm:text-sm leading-relaxed font-medium bg-rose-50 border-2 border-[#121212] p-4">
                    {concept.bearishScenario}
                  </p>
                </div>
              </div>

              {/* Trade Execution CTA */}
              {onOpenSimulator && (
                <div className="p-6 sm:p-7 bg-[#F0C020] border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div>
                    <h4 className="font-black text-[#121212] uppercase text-base">Practice This Setup in the Decision Simulator</h4>
                    <p className="text-[#121212]/90 text-xs sm:text-sm mt-1 font-medium">Formulate a trade hypothesis using this concept and simulate price delivery.</p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenSimulator}
                    className="px-6 py-3 bg-[#D02020] hover:bg-red-700 text-white font-black font-mono text-xs uppercase border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] transition-all shrink-0 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
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

export default ConceptExplorer;
