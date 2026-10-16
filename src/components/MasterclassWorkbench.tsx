import { useToolStorage, isBooleanRecord } from '../hooks/useToolStorage';
import { ToolContentNotice } from './ToolContentNotice';
import React, { useState, useEffect } from 'react';
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
  ShieldAlert,
  Info
} from 'lucide-react';
import { masterclassCollection, MasterclassItem } from '../data/masterclassData';
import { InteractiveDiagram } from './InteractiveDiagram';
import { BauhausNavScroller } from './BauhausNavScroller';
import { SEO } from './SEO';
import { ContextualInternalLinker } from './ContextualInternalLinker';
import { 
  MASTERCLASS_CATEGORIES, 
  getMasterclassSlug, 
  getMasterclassCategorySlug, 
  getMasterclassUrl 
} from '../utils/workbenchToolRoutes';

export interface MasterclassWorkbenchProps {
  initialCategory?: string;
  initialModuleSlug?: string;
  initialSubTab?: 'blueprint' | 'order_of_ops' | 'invalidation' | 'risk_rules';
  onNavigateUrl?: (url: string) => void;
}

export const MasterclassWorkbench: React.FC<MasterclassWorkbenchProps> = ({
  initialCategory,
  initialModuleSlug,
  initialSubTab = 'blueprint',
  onNavigateUrl
}) => {
  const normalizedCategory = initialCategory === 'algorithmic_signatures' ? 'masterclass_34' : initialCategory;
  // Resolve initial item from slug if provided
  const resolvedInitialItem = initialModuleSlug
    ? masterclassCollection.find(m => getMasterclassSlug(m) === initialModuleSlug || m.id === initialModuleSlug)
    : masterclassCollection.find(m => m.category === initialCategory || (initialCategory === 'masterclass_34' && m.category === 'algorithmic_signatures')) || masterclassCollection[0];

  const [selectedId, setSelectedId] = useState<string>(resolvedInitialItem ? resolvedInitialItem.id : masterclassCollection[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>(normalizedCategory || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'blueprint' | 'order_of_ops' | 'invalidation' | 'risk_rules'>(initialSubTab);
  const ruleStorage = useToolStorage('learnsmc_masterclass_checks_v1', {} as Record<string, boolean>, isBooleanRecord);
  const checkedRules = ruleStorage.value;

  // Sync with prop changes (e.g. from browser back/forward or direct links)
  useEffect(() => {
    if (normalizedCategory && normalizedCategory !== selectedCategory) {
      setSelectedCategory(normalizedCategory);
    }
  }, [normalizedCategory]);

  useEffect(() => {
    if (initialModuleSlug) {
      const match = masterclassCollection.find(m => getMasterclassSlug(m) === initialModuleSlug || m.id === initialModuleSlug);
      if (match && match.id !== selectedId) {
        setSelectedId(match.id);
      }
    }
  }, [initialModuleSlug]);

  const activeItem = masterclassCollection.find(m => m.id === selectedId) || masterclassCollection[0];

  const updateUrl = (item: MasterclassItem, cat: string) => {
    const targetUrl = getMasterclassUrl(item);

    if (onNavigateUrl) {
      onNavigateUrl(targetUrl);
    } else if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.location.assign(targetUrl);
    }
  };

  const handleSelectMasterclass = (item: MasterclassItem) => {
    updateUrl(item, selectedCategory);
  };

  const handleSelectCategory = (catId: string) => {
    const catMeta = MASTERCLASS_CATEGORIES.find(c => c.id === catId);
    const targetUrl = catId === 'all' 
      ? '/tools/masterclass/' 
      : `/tools/masterclass/${catMeta?.slug || catId}/`;
    
    if (onNavigateUrl) {
      onNavigateUrl(targetUrl);
    } else if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.location.assign(targetUrl);
    }
  };

  const filteredItems = masterclassCollection.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory || (selectedCategory === 'masterclass_34' && item.category === 'algorithmic_signatures');
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.coreRule.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleRuleCheck = (ruleKey: string) => {
    ruleStorage.save({ ...checkedRules, [ruleKey]: !checkedRules[ruleKey] });
  };

  const categories = [
    { id: 'all', label: `All masterclasses (${masterclassCollection.length})`, icon: Flame },
    { id: 'masterclass_34', label: 'Core Masterclasses', icon: BookOpen },
    { id: 'pd_array_15', label: 'PD array studies', icon: Layers },
    { id: 'entry_model_5', label: 'Entry models', icon: Target },
    { id: 'opening_range_5', label: 'Opening range studies', icon: Clock },
    { id: 'mentorship_2026', label: 'Mentorship Frameworks', icon: Zap }
  ];

  const currentCatSlug = getMasterclassCategorySlug(activeItem.category);
  const currentItemSlug = getMasterclassSlug(activeItem);
  const canonicalPath = `/tools/masterclass/${currentCatSlug}/${currentItemSlug}/`;

  return (
    <div className="space-y-6 text-[#F5F7FA]">
      <SEO
        title={`${activeItem.title} — ICT Masterclass Hub | LearnSMC`}
        description={`${activeItem.subtitle}. Institutional rule: ${activeItem.coreRule.substring(0, 140)}...`}
        path={canonicalPath}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Workbench', path: '/tools/' },
          { name: 'Masterclass Hub', path: '/tools/masterclass/' },
          { name: activeItem.title, path: canonicalPath }
        ]}
      />
      <ToolContentNotice />
      {ruleStorage.error && <p role="alert">{ruleStorage.error}</p>}
      {/* Top Banner: Masterclass Philosophy */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#5865FF]/10 text-[#5865FF] border border-[#5865FF]/20 text-[10px] font-mono uppercase">
                Visual Blueprint
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#55E6D1] border border-white/[0.08] text-[10px] font-mono uppercase">
                {masterclassCollection.length} model and reference lessons
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F7FA]">
              ICT &amp; SMC Masterclass Visual Compendium
            </h2>
            <p className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed">
              Step-by-step institutional order of operations, failed auction mechanics, 
              exact invalidation checklists, and interactive visual delivery signatures.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 text-center min-w-[90px]">
              <span className="block text-[10px] font-mono uppercase text-[#656B78]">Selected Unit</span>
              <span className="text-lg font-semibold font-mono text-[#5865FF]">#{activeItem.number.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Header */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-3 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <BauhausNavScroller>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <a
                  key={cat.id} aria-current={isActive ? 'page' : undefined}

                  href={cat.id === 'all' ? '/tools/masterclass/' : `/tools/masterclass/${getMasterclassCategorySlug(cat.id)}/`}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase flex items-center gap-1.5 transition-all rounded-lg border cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                      : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </a>
              );
            })}
          </BauhausNavScroller>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#656B78]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search masterclasses" placeholder="Search masterclasses..."
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono rounded-lg border border-white/[0.08] bg-[#151923] text-[#F5F7FA] placeholder-[#656B78] focus:outline-none focus:border-[#5865FF]"
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Masterclass Navigation Directory */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-3">
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.07] mb-3 text-xs font-mono">
              <span className="text-[#9BA1AE] uppercase tracking-wider text-[11px]">Curriculum Index</span>
              <span className="text-[#5865FF] bg-[#5865FF]/10 border border-[#5865FF]/20 px-2 py-0.5 rounded-full text-[10px] uppercase">
                {filteredItems.length} Units
              </span>
            </div>

            <div 
              className="space-y-2 max-h-[calc(100vh-320px)] modal-scrollable pr-1"
              data-lenis-prevent="true"
            >
              {filteredItems.map((item) => {
                const isSelected = item.id === activeItem.id;
                return (
                  <a
                    key={item.id} aria-current={isSelected ? 'page' : undefined}

                    href={getMasterclassUrl(item)}
                    className={`block w-full text-left p-3 text-xs font-mono transition-all rounded-xl border cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.10] border-white/20 text-[#F5F7FA]'
                        : 'bg-white/[0.02] border-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] px-1.5 py-0.2 bg-white/[0.04] text-[#5865FF] rounded">
                        #{item.number.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/[0.04] text-[#656B78] uppercase shrink-0">
                        {MASTERCLASS_CATEGORIES.find(c => c.slug === getMasterclassCategorySlug(item.category))?.name}
                      </span>
                    </div>
                    <div className="font-semibold uppercase tracking-tight text-[#F5F7FA] truncate text-xs">
                      {item.title}
                    </div>
                    <p className="text-[10px] text-[#9BA1AE] line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Active Masterclass Deep Dive */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#5865FF]/10 text-[#5865FF] font-mono text-[10px] uppercase border border-[#5865FF]/20">
                  Unit #{activeItem.number.toString().padStart(2, '0')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#9BA1AE] font-mono text-[10px] uppercase border border-white/[0.08]">
                  {MASTERCLASS_CATEGORIES.find(c => c.slug === getMasterclassCategorySlug(activeItem.category))?.name}
                </span>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'blueprint', label: '1. Blueprint', icon: Layers },
                  { id: 'order_of_ops', label: '2. Sequence', icon: GitBranch },
                  { id: 'invalidation', label: '3. Invalidation', icon: ShieldAlert },
                  { id: 'risk_rules', label: '4. Risk Rules', icon: Target }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      aria-pressed={activeSubTab === tab.id}
                      onClick={() => setActiveSubTab(tab.id as any)}
                      className={`px-3 py-1.5 text-xs font-mono uppercase flex items-center gap-1 rounded-lg border transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                          : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
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
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F7FA]">
                {activeItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#55E6D1] font-mono mt-1">
                {activeItem.subtitle}
              </p>
            </div>

            {/* Core Rule Highlight */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
              <div className="flex items-center gap-2 text-[#F0B35B] font-mono uppercase text-[10px] tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#F0B35B]" />
                <span>The Core Rule:</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-[#F5F7FA] leading-relaxed">
                {activeItem.coreRule}
              </p>
            </div>

            {/* Quote banner */}
            <div className="p-3 rounded-lg bg-[#0C0E13] border-l-2 border-[#5865FF] text-xs font-mono text-[#9BA1AE] italic">
              Study summary: {activeItem.quote}
            </div>
          </div>

          {/* TAB 1: VISUAL BLUEPRINT & INTERACTIVE DIAGRAM */}
          {activeSubTab === 'blueprint' && (
            <div className="space-y-6">
              {/* Interactive Diagram Component */}
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA]">
                    <Layers className="w-4 h-4 text-[#5865FF]" />
                    <span>Interactive Architectural Delivery Canvas</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-white/[0.04] text-[#9BA1AE] px-2 py-0.5 rounded border border-white/[0.08]">
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
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA] pb-2 border-b border-white/[0.07]">
                  <GitBranch className="w-4 h-4 text-[#55E6D1]" />
                  <span>Sequential Algorithmic Stages</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeItem.stepByStepBreakdown.map((s) => (
                    <div 
                      key={s.step} 
                      className="p-4 rounded-xl bg-[#151923] border border-white/[0.06] space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-lg bg-white/[0.04] text-[#5865FF] font-mono text-xs flex items-center justify-center border border-white/[0.08]">
                          0{s.step}
                        </span>
                        <span className="text-[10px] font-mono text-[#55E6D1] uppercase">
                          Phase 0{s.step}
                        </span>
                      </div>
                      <h4 className="font-semibold text-xs font-mono text-[#F5F7FA]">
                        {s.title}
                      </h4>
                      <p className="text-xs font-mono text-[#9BA1AE] leading-relaxed">
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
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA]">
                    <GitBranch className="w-4 h-4 text-[#5865FF]" />
                    <span>Exact Order of Operations (Strict Protocol)</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#55E6D1]">
                    Execution Protocol
                  </span>
                </div>

                <div className="space-y-3">
                  {activeItem.orderOfOperations.map((stepText, idx) => (
                    <div 
                      key={idx}
                      className="p-4 bg-[#151923] rounded-xl border border-white/[0.06] flex items-start gap-3"
                    >
                      <span className="w-7 h-7 rounded-lg bg-[#5865FF]/10 text-[#5865FF] font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#5865FF]/20">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-[#656B78] block">
                          Step #{idx + 1} Mandate
                        </span>
                        <p className="text-xs sm:text-sm font-mono text-[#F5F7FA] leading-relaxed">
                          {stepText}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related PD Arrays & Confluences */}
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-mono uppercase text-[#F5F7FA] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#F0B35B]" />
                  Confluent PD Arrays Required
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeItem.relatedPdArrays.map((arr, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.07] text-xs font-mono uppercase text-[#9BA1AE]"
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
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#FF6B7A]">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Mandatory Invalidation Conditions (Exit Criteria)</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#FF6B7A]/10 text-[#FF6B7A] border border-[#FF6B7A]/20 px-2 py-0.5 rounded-full">
                    Immediate Invalidation
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
                        aria-pressed={isChecked}
                        onClick={() => toggleRuleCheck(ruleKey)}
                        className={`block w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-[#FF6B7A]/10 border-[#FF6B7A]/30 text-[#F5F7FA]' 
                            : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-[#FF6B7A] border-[#FF6B7A] text-white' : 'border-white/20 bg-white/[0.04]'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono uppercase text-[#FF6B7A]">
                            Invalidation Criterion #{idx + 1}
                          </span>
                          <p className="text-xs font-mono text-[#9BA1AE] leading-relaxed">
                            {rule}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Retail Traps & What Retail Misses */}
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F0B35B] pb-2 border-b border-white/[0.07]">
                  <AlertTriangle className="w-4 h-4 text-[#F0B35B]" />
                  <span>Key Points Missed By Retail Traders</span>
                </div>

                <div className="space-y-2">
                  {activeItem.keyMistakes.map((mistake, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs font-mono text-[#9BA1AE]">
                      <span className="text-[#FF6B7A] font-bold">✕</span>
                      <p className="leading-relaxed">{mistake}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RISK & EXECUTION MATRIX */}
          {activeSubTab === 'risk_rules' && (
            <div className="space-y-6">
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA]">
                    <Target className="w-4 h-4 text-[#5865FF]" />
                    <span>Risk Allocation &amp; Execution Sizing</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-white/[0.04] text-[#55E6D1] px-2 py-0.5 rounded-full border border-white/[0.08]">
                    Capital Preservation
                  </span>
                </div>

                <div className="space-y-3">
                  {activeItem.riskRules.map((rule, idx) => (
                    <div 
                      key={idx}
                      className="p-4 bg-[#151923] rounded-xl border border-white/[0.06] flex items-center gap-3"
                    >
                      <ShieldCheck className="w-5 h-5 text-[#55E6D1] shrink-0" />
                      <p className="text-xs sm:text-sm font-mono text-[#F5F7FA]">
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Anatomy Summary */}
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#9BA1AE]">
                  <Info className="w-4 h-4 text-[#5865FF]" />
                  <span>Visual Chart Anatomy Specification</span>
                </div>
                <p className="text-xs font-mono text-[#9BA1AE] leading-relaxed bg-[#0C0E13] p-4 rounded-xl border border-white/[0.06]">
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

export default MasterclassWorkbench;
