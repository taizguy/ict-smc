import React, { useState } from 'react';
import { ictConcepts } from '../data/conceptsData';
import { masterclassCollection } from '../data/masterclassData';
import { InteractiveDiagram } from './InteractiveDiagram';
import { 
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
    'overview' | 'tripartite' | 'anatomy' | 'traps_counterexamples' | 'ladder' | 'rules_invalidation' | 'scenarios' | 'masterclass_blueprint'
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
    <div className="space-y-6 text-[#F5F7FA]">
      {/* Category Pills Header with Scroller */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-3">
        <BauhausNavScroller>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase whitespace-nowrap transition-all rounded-lg border cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                  : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
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
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.07] text-xs font-mono">
              <span className="text-[#9BA1AE] uppercase tracking-wider text-[11px]">Concept Index</span>
              <span className="text-[#5865FF] font-medium bg-[#5865FF]/10 px-2.5 py-0.5 rounded-full border border-[#5865FF]/20 text-[10px] uppercase">
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
                    className={`w-full text-left p-3 text-xs font-mono transition-all space-y-1.5 rounded-xl border cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.10] border-white/20 text-[#F5F7FA]'
                        : 'bg-white/[0.02] border-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold uppercase tracking-tight truncate text-[#F5F7FA]">{c.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-[#656B78] uppercase shrink-0">
                        {c.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9BA1AE] line-clamp-1 font-normal">
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
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 relative overflow-hidden space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded bg-[#5865FF]/10 text-[#5865FF] border border-[#5865FF]/20 uppercase text-[10px]">
                  {concept.category} • ICT Core Framework
                </span>
                {concept.source && (
                  <span className="px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[#9BA1AE] text-[10px] uppercase flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[#55E6D1]" />
                    {concept.source.approximateDate} • {concept.source.conceptStatus}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLayerTab('ladder')}
                  className="btn-predikt-secondary text-xs py-1 px-3"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>5-Level Ladder</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLayerTab('tripartite')}
                  className="btn-predikt-primary text-xs py-1 px-3"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Fidelity Layer</span>
                </button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F7FA] tracking-tight">
              {concept.name}
            </h2>

            <p className="text-[#9BA1AE] text-sm leading-relaxed font-normal">
              {concept.shortDefinition}
            </p>

            {/* Source Reference Sub-Banner */}
            {concept.source && (
              <div className="p-4 rounded-xl bg-[#0C0E13] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <span className="text-[#656B78] block text-[10px] uppercase">Primary Mentorship</span>
                  <span className="text-[#F5F7FA] font-medium uppercase truncate block">{concept.source.mentorship}</span>
                </div>
                <div>
                  <span className="text-[#656B78] block text-[10px] uppercase">Original Terminology</span>
                  <span className="text-[#5865FF] font-medium uppercase truncate block">{concept.source.originalTerminology}</span>
                </div>
                <div>
                  <span className="text-[#656B78] block text-[10px] uppercase">Lecture Reference</span>
                  <span className="text-[#FF6B7A] font-medium uppercase truncate block">{concept.source.lectureReference || 'Core Series'}</span>
                </div>
              </div>
            )}

            {/* Layer Tabs with Scroller */}
            <div className="pt-4 border-t border-white/[0.07]">
              <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#656B78] mb-2">
                ANALYSIS MODULES:
              </div>
              <BauhausNavScroller>
                {[
                  { id: 'overview', label: '1. Mechanism & Logic', icon: Info },
                  { id: 'anatomy', label: '2. Anatomy & Diagram', icon: Layers },
                  { id: 'tripartite', label: '3. Source Fidelity', icon: Cpu },
                  { id: 'ladder', label: '4. 5-Level Ladder', icon: GraduationCap },
                  { id: 'traps_counterexamples', label: '5. Traps & Counters', icon: ShieldAlert },
                  { id: 'rules_invalidation', label: '6. Rules & Matrix', icon: CheckCircle2 },
                  { id: 'scenarios', label: '7. Trade Scenarios', icon: Zap },
                  { id: 'masterclass_blueprint', label: '8. Masterclass Blueprint', icon: Flame }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeLayerTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveLayerTab(tab.id as any)}
                      className={`px-3.5 py-1.5 text-xs font-mono uppercase flex items-center gap-1.5 transition-all rounded-lg border cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                          : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#FF6B7A] font-mono text-xs uppercase">
                    <Zap className="w-4 h-4" />
                    <h3 className="font-semibold">Why It Exists</h3>
                  </div>
                  <p className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal">
                    {concept.whyItExists}
                  </p>
                </div>

                <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#5865FF] font-mono text-xs uppercase">
                    <HelpCircle className="w-4 h-4" />
                    <h3 className="font-semibold">Market Problem It Solves</h3>
                  </div>
                  <p className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal">
                    {concept.problemItSolves}
                  </p>
                </div>
              </div>

              {/* How ICT Uses It & Causal Connections */}
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#F5F7FA] font-mono text-xs uppercase">
                  <BookOpen className="w-4 h-4 text-[#55E6D1]" />
                  <h3 className="font-semibold">How ICT Employs This in Practice</h3>
                </div>
                <p className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal">
                  {concept.howICTUsesIt}
                </p>

                {/* Causal Pathway to Next Concept */}
                {concept.causalConnections && concept.causalConnections.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/[0.07] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#5865FF] uppercase">
                      <GitFork className="w-4 h-4" />
                      <span>Causal Sequence: Why Does This Lead to the Next Step?</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {concept.causalConnections.map((conn, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-2 text-xs font-mono">
                          <div className="flex items-center justify-between text-[#55E6D1] uppercase">
                            <span>Next Step: {conn.targetLabel}</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                          <p className="text-[#9BA1AE] text-[11px] leading-relaxed font-normal">
                            <strong className="text-[#F5F7FA]">Why it follows:</strong> {conn.whyThisFollows}
                          </p>
                          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] text-[#F5F7FA]/90">
                            ⚡ Institutional Mechanic: {conn.institutionalMechanic}
                          </div>
                          <p className="text-[#FF6B7A] text-[10px] uppercase">
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
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-[#F5F7FA] font-mono text-xs uppercase">
                    <Layers className="w-4 h-4 text-[#5865FF]" />
                    <h3 className="font-semibold">Interactive Diagram Engine</h3>
                  </div>
                  <span className="text-xs font-mono text-[#9BA1AE]">
                    Type: <span className="text-[#55E6D1] uppercase">{concept.diagramType}</span>
                  </span>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0C0E13] p-2">
                  <InteractiveDiagram type={concept.diagramType as any} title={concept.name} />
                </div>

                <div className="pt-3 border-t border-white/[0.07] text-xs text-[#9BA1AE] space-y-1.5">
                  <h4 className="text-[#F5F7FA] font-mono uppercase text-[11px]">Chart Anatomy Specifications:</h4>
                  <p className="leading-relaxed font-normal">{concept.chartAnatomy}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOURCE FIDELITY & TRIPARTITE */}
          {activeLayerTab === 'tripartite' && (
            <div className="space-y-6">
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-[#F5F7FA] font-mono text-xs uppercase mb-1">
                    <Cpu className="w-4 h-4 text-[#55E6D1]" />
                    <h3 className="font-semibold">Tripartite Epistemological Distinction</h3>
                  </div>
                  <p className="text-[#9BA1AE] text-xs sm:text-sm font-normal">
                    This platform separates what ICT explicitly teaches from observable auction orderbook mechanics and derived quantitative SMC interpretations.
                  </p>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center gap-2 border-b border-white/[0.07] pb-3 flex-wrap">
                  {[
                    { id: 'ict', label: '1. ICT Canonical Teaching' },
                    { id: 'observable', label: '2. Observable Auction Mechanics' },
                    { id: 'derived', label: '3. Derived SMC Synthesis' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTripartiteTab(tab.id as any)}
                      className={`px-3.5 py-1.5 text-xs font-mono uppercase transition-all rounded-lg border cursor-pointer ${
                        activeTripartiteTab === tab.id
                          ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                          : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {concept.tripartiteView && (
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-4">
                    {activeTripartiteTab === 'ict' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#5865FF] font-mono text-xs uppercase">
                          <Flame className="w-4 h-4" />
                          <h4>What ICT (Michael J. Huddleston) Explicitly Teaches:</h4>
                        </div>
                        <p className="text-[#F5F7FA]/90 text-xs sm:text-sm leading-relaxed font-normal bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 italic">
                          "{concept.tripartiteView.ictTeaching}"
                        </p>
                        <div className="text-[11px] font-mono text-[#656B78]">
                          Source: <span className="text-[#9BA1AE] uppercase">{concept.source?.mentorship}</span> ({concept.source?.approximateDate})
                        </div>
                      </div>
                    )}

                    {activeTripartiteTab === 'observable' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#55E6D1] font-mono text-xs uppercase">
                          <Activity className="w-4 h-4" />
                          <h4>What is Empirically Observable on Orderbooks &amp; Charts:</h4>
                        </div>
                        <p className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                          {concept.tripartiteView.observableMarketBehavior}
                        </p>
                        <div className="text-[11px] font-mono text-[#656B78]">
                          Domain: <span className="text-[#9BA1AE]">Central Limit Order Book (CLOB), Matching Engine Microstructure &amp; Auction Theory</span>
                        </div>
                      </div>
                    )}

                    {activeTripartiteTab === 'derived' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#52D273] font-mono text-xs uppercase">
                          <ShieldCheck className="w-4 h-4" />
                          <h4>Derived Quantitative &amp; SMC Synthesis:</h4>
                        </div>
                        <p className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                          {concept.tripartiteView.derivedInterpretation}
                        </p>
                        <div className="text-[11px] font-mono text-[#656B78]">
                          Application: <span className="text-[#9BA1AE]">Rule-based backtesting, statistical edge validation, risk-reward skew</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: 5-LEVEL LADDER */}
          {activeLayerTab === 'ladder' && (
            <div className="space-y-6">
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[#F5F7FA] font-mono text-xs uppercase mb-1">
                    <GraduationCap className="w-4 h-4 text-[#5865FF]" />
                    <h3 className="font-semibold">The 5-Level Conceptual Progression Ladder</h3>
                  </div>
                  <p className="text-[#9BA1AE] text-xs sm:text-sm font-normal">
                    Progress from intuitive first-principles metaphors up to advanced algorithmic interbank execution models.
                  </p>
                </div>

                {/* Ladder Selector */}
                <BauhausNavScroller>
                  {[
                    { lvl: 1, title: 'L1: Child Analogy', desc: 'Metaphor' },
                    { lvl: 2, title: 'L2: Beginner', desc: 'Chart behavior' },
                    { lvl: 3, title: 'L3: Trader', desc: 'Order flow' },
                    { lvl: 4, title: 'L4: Advanced', desc: 'Intermarket' },
                    { lvl: 5, title: 'L5: Canonical ICT', desc: 'IPDA algorithmic' }
                  ].map((step) => (
                    <button
                      key={step.lvl}
                      type="button"
                      onClick={() => setLadderLevel(step.lvl as any)}
                      className={`p-3 text-left transition-all font-mono rounded-xl border cursor-pointer min-w-[140px] shrink-0 ${
                        ladderLevel === step.lvl
                          ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                          : 'bg-white/[0.02] text-[#9BA1AE] border-white/[0.06] hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="block text-xs font-semibold uppercase">{step.title}</span>
                      <span className="text-[10px] block truncate text-[#656B78] uppercase mt-0.5">
                        {step.desc}
                      </span>
                    </button>
                  ))}
                </BauhausNavScroller>

                {/* Ladder Content Card */}
                {concept.explanationLadder && (
                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-4">
                    <div className="text-[#55E6D1] font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Active Explanation Level: {ladderLevel} of 5
                    </div>

                    <p className="text-[#F5F7FA]/90 text-sm sm:text-base leading-relaxed font-normal">
                      {ladderLevel === 1 && concept.explanationLadder.level1Child}
                      {ladderLevel === 2 && concept.explanationLadder.level2Beginner}
                      {ladderLevel === 3 && concept.explanationLadder.level3Trader}
                      {ladderLevel === 4 && concept.explanationLadder.level4Advanced}
                      {ladderLevel === 5 && concept.explanationLadder.level5ICTFramework}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.07]">
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase">
                          <Check className="w-4 h-4" />
                          <span>When Does It Matter?</span>
                        </div>
                        <p className="text-[#9BA1AE] text-xs font-normal leading-relaxed">
                          {concept.explanationLadder.whenItMatters}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1.5">
                        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase">
                          <XCircle className="w-4 h-4" />
                          <span>When Should You Ignore It?</span>
                        </div>
                        <p className="text-[#9BA1AE] text-xs font-normal leading-relaxed">
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
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-[#FF6B7A] font-mono text-xs uppercase mb-1">
                    <ShieldAlert className="w-4 h-4" />
                    <h3 className="font-semibold">Deliberate Counterexamples &amp; Fake Setup Traps</h3>
                  </div>
                  <p className="text-[#9BA1AE] text-xs sm:text-sm font-normal">
                    Recognize setups that look like ICT patterns on the surface, but are structurally invalid traps.
                  </p>
                </div>

                <div className="space-y-4">
                  {concept.counterexamples && concept.counterexamples.length > 0 ? (
                    concept.counterexamples.map((trap, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-3 font-mono">
                        <div className="flex items-center justify-between text-[#FF6B7A] text-sm uppercase flex-wrap gap-2">
                          <span className="flex items-center gap-2 font-medium">
                            <AlertTriangle className="w-4 h-4" />
                            {trap.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 uppercase">
                            Invalid Counterexample
                          </span>
                        </div>
                        <div className="text-xs text-[#9BA1AE] space-y-2">
                          <p><strong className="text-[#F5F7FA] uppercase">The Trap:</strong> {trap.trapDescription}</p>
                          <p><strong className="text-rose-400 uppercase">Why It Fails:</strong> {trap.whyItFails}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[#F5F7FA] text-xs font-normal">
                          🛡️ Rule of Thumb: {trap.ruleOfThumb}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] text-[#9BA1AE] text-xs space-y-2">
                      <p className="text-[#FF6B7A] font-mono uppercase">General Counterexample:</p>
                      <p className="leading-relaxed font-normal">{concept.counterexample}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RULES & INVALIDATION */}
          {activeLayerTab === 'rules_invalidation' && (
            <div className="space-y-6">
              {concept.timeframeMatrix && (
                <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-[#F5F7FA] font-mono text-xs uppercase">
                    <Clock className="w-4 h-4 text-[#5865FF]" />
                    <h3 className="font-semibold">Multi-Timeframe Application Matrix</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                      <span className="text-[#55E6D1] block uppercase text-[10px]">Higher Timeframe (HTF)</span>
                      <p className="text-[#9BA1AE] leading-relaxed font-normal">{concept.timeframeMatrix.htfApplication}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                      <span className="text-[#FF6B7A] block uppercase text-[10px]">Lower Timeframe (LTF)</span>
                      <p className="text-[#9BA1AE] leading-relaxed font-normal">{concept.timeframeMatrix.ltfApplication}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                      <span className="text-[#5865FF] block uppercase text-[10px]">Session &amp; Timing Context</span>
                      <p className="text-[#9BA1AE] leading-relaxed font-normal">{concept.timeframeMatrix.sessionAndTiming}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Invalidation Criteria */}
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-[#FF6B7A] font-mono text-xs uppercase">
                  <ShieldAlert className="w-4 h-4" />
                  <h3 className="font-semibold">Strict Invalidation Criteria</h3>
                </div>
                <p className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal bg-rose-500/5 border border-rose-500/20 rounded-xl p-4">
                  {concept.invalidationCriteria}
                </p>
              </div>

              {/* Identification Checklist */}
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-[#F5F7FA] font-mono text-xs uppercase">
                  <CheckCircle2 className="w-4 h-4 text-[#52D273]" />
                  <h3 className="font-semibold">Identification Checklist</h3>
                </div>
                <ul className="space-y-2 text-xs font-mono text-[#9BA1AE]">
                  {concept.identificationRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-white/[0.02] p-3 rounded-lg border border-white/[0.06]">
                      <Check className="w-4 h-4 text-[#52D273] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-normal">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 7: SCENARIOS & TRADE FLOW */}
          {activeLayerTab === 'scenarios' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#52D273] font-mono text-xs uppercase">
                    <ArrowUpRight className="w-4 h-4" />
                    <h3 className="font-semibold">Bullish Execution Scenario</h3>
                  </div>
                  <p className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                    {concept.bullishScenario}
                  </p>
                </div>

                <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#FF6B7A] font-mono text-xs uppercase">
                    <ArrowDownRight className="w-4 h-4" />
                    <h3 className="font-semibold">Bearish Execution Scenario</h3>
                  </div>
                  <p className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal bg-rose-500/5 border border-rose-500/20 rounded-xl p-4">
                    {concept.bearishScenario}
                  </p>
                </div>
              </div>

              {onOpenSimulator && (
                <div className="p-6 sm:p-7 bg-[#151923] border border-white/[0.08] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div>
                    <h4 className="font-semibold text-[#F5F7FA] text-sm sm:text-base">Practice in the Decision Simulator</h4>
                    <p className="text-[#9BA1AE] text-xs sm:text-sm mt-1 font-normal">Formulate a trade hypothesis using this concept and simulate price delivery.</p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenSimulator}
                    className="btn-predikt-primary text-xs"
                  >
                    Open Simulator
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: MASTERCLASS BLUEPRINT */}
          {activeLayerTab === 'masterclass_blueprint' && (
            <div className="space-y-6">
              {(() => {
                const matchedMasterclass = masterclassCollection.find(
                  m => m.id.includes(concept.id) || concept.id.includes(m.id) || m.title.toLowerCase().includes(concept.name.toLowerCase())
                ) || masterclassCollection[0];

                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-[#151923] border border-white/[0.08] space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-[#5865FF]/15 text-[#5865FF] text-[10px] font-mono uppercase">
                          Masterclass Protocol • Unit #{matchedMasterclass.number.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-mono text-[#55E6D1] uppercase">
                          {matchedMasterclass.category.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-[#F5F7FA] tracking-tight">
                        {matchedMasterclass.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9BA1AE] font-mono italic">
                        "{matchedMasterclass.coreRule}"
                      </p>
                    </div>

                    <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA]">
                          <Layers className="w-4 h-4 text-[#5865FF]" />
                          <span>Interactive Architectural Delivery Canvas</span>
                        </div>
                        <span className="text-[10px] font-mono uppercase bg-white/[0.04] text-[#9BA1AE] px-2 py-0.5 rounded border border-white/[0.08]">
                          {matchedMasterclass.diagramType}
                        </span>
                      </div>
                      <InteractiveDiagram
                        type={matchedMasterclass.diagramType}
                        title={matchedMasterclass.title}
                        isInteractive={true}
                      />
                    </div>

                    <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA] pb-2 border-b border-white/[0.07]">
                        <Clock className="w-4 h-4 text-[#55E6D1]" />
                        <span>Step-by-Step Order of Operations</span>
                      </div>
                      <div className="space-y-2.5">
                        {matchedMasterclass.orderOfOperations.map((op, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                            <span className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] text-[#5865FF] font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-xs font-mono text-[#9BA1AE] leading-relaxed">
                              {op}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptExplorer;
