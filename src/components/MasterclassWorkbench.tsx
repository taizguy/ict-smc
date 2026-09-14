import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Compass, 
  GitBranch, 
  Zap, 
  ChevronRight, 
  BookOpen, 
  Target,
  ArrowUpRight,
  ShieldAlert,
  Info,
  Maximize2
} from 'lucide-react';
import { masterclassCollection, MasterclassItem } from '../data/masterclassData';
import { InteractiveDiagram } from './InteractiveDiagram';
import { BauhausNavScroller } from './BauhausNavScroller';

export const MasterclassWorkbench: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(masterclassCollection[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'blueprint' | 'order_of_ops' | 'invalidation' | 'risk_rules'>('blueprint');
  const [checkedRules, setCheckedRules] = useState<{ [key: string]: boolean }>({});

  const activeItem = masterclassCollection.find(m => m.id === selectedId) || masterclassCollection[0];

  const filteredItems = masterclassCollection.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.coreRule.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleRuleCheck = (ruleKey: string) => {
    setCheckedRules(prev => ({
      ...prev,
      [ruleKey]: !prev[ruleKey]
    }));
  };

  const categories = [
    { id: 'all', label: 'All Masterclasses (34+)', icon: Flame },
    { id: 'masterclass_34', label: 'Core Masterclasses', icon: BookOpen },
    { id: 'pd_array_15', label: '15 PD Arrays Hierarchy', icon: Layers },
    { id: 'entry_model_5', label: '5 A+ Entry Models', icon: Target },
    { id: 'opening_range_5', label: '5 Algorithmic Opening Ranges', icon: Clock },
    { id: 'mentorship_2026', label: '2026 Mentorship Frameworks', icon: Zap }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Masterclass Philosophy */}
      <div className="bg-[#121212] text-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#1040C0] p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#D02020] text-white text-[10px] font-mono font-black uppercase tracking-wider">
                Uncompromising Visual Blueprint
              </span>
              <span className="px-2.5 py-0.5 bg-[#F0C020] text-[#121212] text-[10px] font-mono font-black uppercase tracking-wider">
                34 Masterclasses • 15 PD Arrays • 5 Models
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              ICT / SMC Masterclass Visual Compendium
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-mono leading-relaxed">
              Nothing skipped. Step-by-step institutional order of operations, failed auction mechanics, 
              exact invalidation checklists, and interactive visual delivery signatures.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 border-2 border-white/30 p-3 text-center">
              <span className="block text-[10px] font-mono uppercase text-white/60">Selected Unit</span>
              <span className="text-lg font-black font-mono text-[#F0C020]">#{activeItem.number.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Header with BauhausNavScroller */}
      <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-3 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <BauhausNavScroller>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-mono font-black uppercase flex items-center gap-1.5 transition-all border-2 border-[#121212] cursor-pointer shrink-0 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                    isActive
                      ? 'bg-[#1040C0] text-white shadow-[3px_3px_0px_0px_#121212]'
                      : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                  {cat.label}
                </button>
              );
            })}
          </BauhausNavScroller>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#121212]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search masterclasses..."
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono border-2 border-[#121212] bg-[#F0F0F0] text-[#121212] focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Masterclass Navigation Directory */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-3">
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-4">
            <div className="flex items-center justify-between pb-3 border-b-4 border-[#121212] mb-3 text-xs font-mono">
              <span className="text-[#121212] uppercase font-black tracking-wider text-[11px]">Curriculum Index</span>
              <span className="text-white font-black bg-[#121212] px-2.5 py-0.5 text-[10px] uppercase">
                {filteredItems.length} Units
              </span>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
              {filteredItems.map((item) => {
                const isSelected = item.id === activeItem.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(item.id);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 text-xs font-mono transition-all border-2 border-[#121212] cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                      isSelected
                        ? 'bg-[#F0C020] text-[#121212] shadow-[3px_3px_0px_0px_#121212] font-black'
                        : 'bg-white text-[#121212] hover:bg-[#F0F0F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] px-1.5 py-0.2 bg-[#121212] text-white font-black">
                        #{item.number.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[8px] px-1.5 py-0.5 bg-[#1040C0] text-white uppercase font-black shrink-0">
                        {item.category.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="font-black uppercase tracking-tight text-[#121212] truncate text-xs">
                      {item.title}
                    </div>
                    <p className="text-[10px] text-[#121212]/70 line-clamp-1 font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Active Masterclass Deep Dive */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#D02020] text-white font-mono text-[10px] font-black uppercase border-2 border-[#121212]">
                  Masterclass Unit #{activeItem.number.toString().padStart(2, '0')}
                </span>
                <span className="px-2.5 py-1 bg-[#F0F0F0] text-[#121212] font-mono text-[10px] font-black uppercase border-2 border-[#121212]">
                  Category: {activeItem.category.replace('_', ' ')}
                </span>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'blueprint', label: '1. Visual Blueprint', icon: Layers },
                  { id: 'order_of_ops', label: '2. Order of Operations', icon: GitBranch },
                  { id: 'invalidation', label: '3. Invalidation Rules', icon: ShieldAlert },
                  { id: 'risk_rules', label: '4. Risk & Execution', icon: Target }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveSubTab(tab.id as any)}
                      className={`px-3 py-1.5 text-xs font-mono font-black uppercase flex items-center gap-1 border-2 border-[#121212] transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-[#1040C0] text-white shadow-[2px_2px_0px_0px_#121212]'
                          : 'bg-white text-[#121212] hover:bg-[#F0C020]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#121212]">
                {activeItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#1040C0] font-mono font-bold uppercase mt-1">
                {activeItem.subtitle}
              </p>
            </div>

            {/* Core Rule Highlight */}
            <div className="p-4 bg-[#FFF9C4] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] space-y-1">
              <div className="flex items-center gap-2 text-[#121212] font-black uppercase text-[10px] tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#1040C0] stroke-[2.5]" />
                <span>The Uncompromising Core Rule:</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-[#121212] leading-relaxed font-bold">
                "{activeItem.coreRule}"
              </p>
            </div>

            {/* Quote banner */}
            <div className="p-3 bg-[#F0F0F0] border-l-4 border-[#D02020] text-xs font-mono text-[#121212] italic">
              « {activeItem.quote} »
            </div>
          </div>

          {/* TAB 1: VISUAL BLUEPRINT & INTERACTIVE DIAGRAM */}
          {activeSubTab === 'blueprint' && (
            <div className="space-y-6">
              {/* Interactive Diagram Component */}
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#121212]">
                  <div className="flex items-center gap-2 font-mono font-black text-xs uppercase text-[#121212]">
                    <Layers className="w-4 h-4 text-[#1040C0] stroke-[2.5]" />
                    <span>Interactive Architectural Delivery Canvas</span>
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase bg-[#121212] text-white px-2 py-0.5">
                    Diagram: {activeItem.diagramType}
                  </span>
                </div>

                <InteractiveDiagram
                  type={activeItem.diagramType}
                  title={activeItem.title}
                  isInteractive={true}
                />
              </div>

              {/* Step-by-Step Breakdown Grid */}
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-4">
                <div className="flex items-center gap-2 font-mono font-black text-sm uppercase text-[#121212] pb-2 border-b-2 border-[#121212]">
                  <GitBranch className="w-4 h-4 text-[#D02020] stroke-[2.5]" />
                  <span>Sequential Algorithmic Stages</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeItem.stepByStepBreakdown.map((s) => (
                    <div 
                      key={s.step} 
                      className="p-4 bg-[#F8F8F8] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-none bg-[#121212] text-white font-mono font-black text-xs flex items-center justify-center">
                          0{s.step}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#1040C0] uppercase">
                          Phase 0{s.step}
                        </span>
                      </div>
                      <h4 className="font-black text-xs uppercase font-mono text-[#121212]">
                        {s.title}
                      </h4>
                      <p className="text-xs font-mono text-[#121212]/80 leading-relaxed font-medium">
                        {s.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER OF OPERATIONS */}
          {activeSubTab === 'order_of_ops' && (
            <div className="space-y-6">
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#121212]">
                  <div className="flex items-center gap-2 font-mono font-black text-sm uppercase text-[#121212]">
                    <GitBranch className="w-4 h-4 text-[#1040C0] stroke-[2.5]" />
                    <span>Exact Order of Operations (No Steps Skipped)</span>
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase text-[#D02020]">
                    Strict Execution Protocol
                  </span>
                </div>

                <div className="space-y-3">
                  {activeItem.orderOfOperations.map((stepText, idx) => (
                    <div 
                      key={idx}
                      className="p-4 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-start gap-3"
                    >
                      <span className="w-7 h-7 bg-[#1040C0] text-white font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#121212]">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-black uppercase text-[#121212]/60 block">
                          Step #{idx + 1} Mandate
                        </span>
                        <p className="text-xs sm:text-sm font-mono text-[#121212] leading-relaxed font-medium">
                          {stepText}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related PD Arrays & Confluences */}
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-3">
                <h4 className="text-xs font-mono font-black uppercase text-[#121212] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#F0C020] stroke-[2.5]" />
                  Confluent PD Arrays Required
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeItem.relatedPdArrays.map((arr, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-[#F0F0F0] border-2 border-[#121212] text-xs font-mono font-black uppercase text-[#121212] shadow-[2px_2px_0px_0px_#121212]"
                    >
                      {arr}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INVALIDATION CHECKLIST & RETAIL TRAPS */}
          {activeSubTab === 'invalidation' && (
            <div className="space-y-6">
              {/* Interactive Invalidation Checklist */}
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#121212]">
                  <div className="flex items-center gap-2 font-mono font-black text-sm uppercase text-[#D02020]">
                    <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
                    <span>Mandatory Invalidation Conditions (Exit Criteria)</span>
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase bg-[#D02020] text-white px-2 py-0.5">
                    Immediate Stop-Loss Action
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeItem.invalidationChecklist.map((rule, idx) => {
                    const ruleKey = `${activeItem.id}_inv_${idx}`;
                    const isChecked = !!checkedRules[ruleKey];
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleRuleCheck(ruleKey)}
                        className={`w-full text-left p-3.5 border-2 border-[#121212] flex items-start gap-3 transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-[#FFEBEE] border-[#D02020] shadow-[2px_2px_0px_0px_#D02020]' 
                            : 'bg-white hover:bg-[#F9F9F9] shadow-[2px_2px_0px_0px_#121212]'
                        }`}
                      >
                        <div className={`w-5 h-5 border-2 border-[#121212] flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-[#D02020] text-white' : 'bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono font-bold uppercase text-[#D02020]">
                            Invalidation Criterion #{idx + 1}
                          </span>
                          <p className="text-xs font-mono text-[#121212] font-medium leading-relaxed">
                            {rule}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Retail Traps & What Retail Misses */}
              <div className="bg-[#FFF9C4] border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono font-black text-sm uppercase text-[#121212] pb-2 border-b-2 border-[#121212]">
                  <AlertTriangle className="w-4 h-4 text-[#D02020] stroke-[2.5]" />
                  <span>Key Points Missed By Retail Traders</span>
                </div>

                <div className="space-y-2">
                  {activeItem.keyMistakes.map((mistake, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs font-mono text-[#121212]">
                      <span className="text-[#D02020] font-black text-sm">✕</span>
                      <p className="font-medium leading-relaxed">{mistake}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RISK & EXECUTION MATRIX */}
          {activeSubTab === 'risk_rules' && (
            <div className="space-y-6">
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#121212]">
                  <div className="flex items-center gap-2 font-mono font-black text-sm uppercase text-[#121212]">
                    <Target className="w-4 h-4 text-[#1040C0] stroke-[2.5]" />
                    <span>Risk Allocation & Execution Sizing</span>
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase bg-[#F0C020] text-[#121212] px-2 py-0.5 border border-[#121212]">
                    Prop Firm Safety Mode
                  </span>
                </div>

                <div className="space-y-3">
                  {activeItem.riskRules.map((rule, idx) => (
                    <div 
                      key={idx}
                      className="p-4 bg-[#F8F8F8] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-center gap-3"
                    >
                      <ShieldCheck className="w-5 h-5 text-[#166534] stroke-[2.5] shrink-0" />
                      <p className="text-xs sm:text-sm font-mono text-[#121212] font-bold">
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Anatomy Summary */}
              <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono font-black text-xs uppercase text-[#121212]">
                  <Info className="w-4 h-4 text-[#1040C0] stroke-[2.5]" />
                  <span>Visual Chart Anatomy Specification</span>
                </div>
                <p className="text-xs font-mono text-[#121212]/90 leading-relaxed bg-[#F0F0F0] p-4 border-2 border-[#121212]">
                  {activeItem.visualAnatomy}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
