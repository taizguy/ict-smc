import { useTranslation } from '../i18n/TranslationProvider';
import { matchesSearch as matchesLocalizedSearch } from '../i18n/search';
import { currentDocumentHref } from '../i18n/navigation';
import { useToolStorage, isBooleanRecord } from '../hooks/useToolStorage';
import { ToolContentNotice } from './ToolContentNotice';
import { ReviewedModelSource } from './ReviewedModelSource';
import { SearchFocusGuide } from './SearchFocusGuide';
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
  const { t: translateSearch } = useTranslation();
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
    } else if (typeof window !== 'undefined' && window.location.pathname !== currentDocumentHref(targetUrl)) {
      window.location.assign(currentDocumentHref(targetUrl));
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
    } else if (typeof window !== 'undefined' && window.location.pathname !== currentDocumentHref(targetUrl)) {
      window.location.assign(currentDocumentHref(targetUrl));
    }
  };

  const filteredItems = masterclassCollection.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory || (selectedCategory === 'masterclass_34' && item.category === 'algorithmic_signatures');
    const matchesSearch = searchQuery === '' || 
      matchesLocalizedSearch(searchQuery, [item.title], translateSearch) ||
      matchesLocalizedSearch(searchQuery, [item.subtitle], translateSearch) ||
      matchesLocalizedSearch(searchQuery, [item.coreRule], translateSearch);
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
    <div className="space-y-6 text-ink">
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
      {!initialModuleSlug && (!initialCategory || initialCategory === 'all') && <SearchFocusGuide kind="masterclass" />}
      {ruleStorage.error && <p role="alert">{ruleStorage.error}</p>}
      {/* Top Banner: Masterclass Philosophy */}
      <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/20 text-[0.8125rem] font-sans tabular-nums uppercase">
                Visual Blueprint
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-ink/[0.04] text-teal border border-ink/[0.08] text-[0.8125rem] font-sans tabular-nums uppercase">
                {masterclassCollection.length} model and reference lessons
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
              ICT &amp; SMC Masterclass Visual Compendium
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Step-by-step institutional order of operations, failed auction mechanics, 
              exact invalidation checklists, and interactive visual delivery signatures.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-ink/[0.04] border border-ink/[0.08] rounded-xl p-3 text-center min-w-[90px]">
              <span className="block text-[0.8125rem] font-sans tabular-nums uppercase text-ink-muted">Selected Unit</span>
              <span className="text-lg font-semibold font-sans tabular-nums text-brand">#{activeItem.number.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Header */}
      <div className="bg-surface border border-ink/[0.08] rounded-2xl p-3 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <BauhausNavScroller>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <a
                  key={cat.id} aria-current={isActive ? 'page' : undefined}

                  href={cat.id === 'all' ? '/tools/masterclass/' : `/tools/masterclass/${getMasterclassCategorySlug(cat.id)}/`}
                  className={`px-3.5 py-1.5 text-xs font-sans tabular-nums uppercase flex items-center gap-1.5 transition-all rounded-lg border cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-ink/[0.12] text-ink border-ink/20'
                      : 'bg-ink/[0.02] text-ink-secondary hover:text-ink border-ink/[0.06] hover:bg-ink/[0.05]'
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
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search masterclasses" placeholder="Search masterclasses..."
              className="w-full pl-9 pr-3 py-1.5 text-xs font-sans tabular-nums rounded-lg border border-ink/[0.08] bg-surface-raised text-ink placeholder-[#5f7064] focus:outline-none focus:border-brand"
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Masterclass Navigation Directory */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-3">
          <div className="bg-surface border border-ink/[0.08] rounded-2xl p-4">
            <div className="flex items-center justify-between pb-3 border-b border-ink/[0.07] mb-3 text-xs font-sans tabular-nums">
              <span className="text-ink-secondary uppercase tracking-wider text-[0.8125rem]">Curriculum Index</span>
              <span className="text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-full text-[0.8125rem] uppercase">
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
                    className={`block w-full text-left p-3 text-xs font-sans tabular-nums transition-all rounded-xl border cursor-pointer ${
                      isSelected
                        ? 'bg-ink/[0.10] border-ink/20 text-ink'
                        : 'bg-ink/[0.02] border-ink/[0.06] text-ink-secondary hover:text-ink hover:bg-ink/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[0.8125rem] px-1.5 py-0.2 bg-ink/[0.04] text-brand rounded">
                        #{item.number.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[0.8125rem] px-1.5 py-0.5 rounded bg-ink/[0.04] text-ink-muted uppercase shrink-0">
                        {MASTERCLASS_CATEGORIES.find(c => c.slug === getMasterclassCategorySlug(item.category))?.name}
                      </span>
                    </div>
                    <div className="font-semibold uppercase tracking-tight text-ink truncate text-xs">
                      {item.title}
                    </div>
                    <p className="text-[0.8125rem] text-ink-secondary line-clamp-1 mt-0.5">
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
          <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand/10 text-brand font-sans tabular-nums text-[0.8125rem] uppercase border border-brand/20">
                  Unit #{activeItem.number.toString().padStart(2, '0')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-ink/[0.04] text-ink-secondary font-sans tabular-nums text-[0.8125rem] uppercase border border-ink/[0.08]">
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
                      aria-label={tab.label}
                      onClick={() => setActiveSubTab(tab.id as any)}
                      className={`px-3 py-1.5 text-xs font-sans tabular-nums uppercase flex items-center gap-1 rounded-lg border transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-ink/[0.12] text-ink border-ink/20'
                          : 'bg-ink/[0.02] text-ink-secondary hover:text-ink border-ink/[0.06] hover:bg-ink/[0.05]'
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
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
                {activeItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-teal font-sans tabular-nums mt-1">
                {activeItem.subtitle}
              </p>
            </div>

            {/* Core Rule Highlight */}
            <div className="p-4 rounded-xl bg-ink/[0.02] border border-ink/[0.08] space-y-1">
              <div className="flex items-center gap-2 text-amber font-sans tabular-nums uppercase text-[0.8125rem] tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber" />
                <span>The Core Rule:</span>
              </div>
              <p className="text-xs sm:text-sm font-sans tabular-nums text-ink leading-relaxed">
                {activeItem.coreRule}
              </p>
            </div>

            {/* Quote banner */}
            <div className="p-3 rounded-lg bg-surface-muted border-l-2 border-brand text-xs font-sans tabular-nums text-ink-secondary italic">
              Study summary: {activeItem.quote}
            </div>
          </div>

          {/* TAB 1: VISUAL BLUEPRINT & INTERACTIVE DIAGRAM */}
          {activeSubTab === 'blueprint' && (
            <div className="space-y-6">
              {/* Interactive Diagram Component */}
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-ink/[0.07]">
                  <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink">
                    <Layers className="w-4 h-4 text-brand" />
                    <span>Interactive Architectural Delivery Canvas</span>
                  </div>
                  <span className="text-[0.8125rem] font-sans tabular-nums uppercase bg-ink/[0.04] text-ink-secondary px-2 py-0.5 rounded border border-ink/[0.08]">
                    Diagram: {activeItem.diagramType}
                  </span>
                </div>

                <InteractiveDiagram
                  type={activeItem.diagramType}
                  title={activeItem.title}
                  isInteractive={true}
                />
              </div>

              <ReviewedModelSource modelId={activeItem.id} />
              {/* Step-by-Step Breakdown Grid */}
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink pb-2 border-b border-ink/[0.07]">
                  <GitBranch className="w-4 h-4 text-teal" />
                  <span>Sequential Algorithmic Stages</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeItem.stepByStepBreakdown.map((s) => (
                    <div 
                      key={s.step} 
                      className="p-4 rounded-xl bg-surface-raised border border-ink/[0.06] space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-lg bg-ink/[0.04] text-brand font-sans tabular-nums text-xs flex items-center justify-center border border-ink/[0.08]">
                          0{s.step}
                        </span>
                        <span className="text-[0.8125rem] font-sans tabular-nums text-teal uppercase">
                          Phase 0{s.step}
                        </span>
                      </div>
                      <h4 className="font-semibold text-xs font-sans tabular-nums text-ink">
                        {s.title}
                      </h4>
                      <p className="text-xs font-sans tabular-nums text-ink-secondary leading-relaxed">
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
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-ink/[0.07]">
                  <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink">
                    <GitBranch className="w-4 h-4 text-brand" />
                    <span>Exact Order of Operations (Strict Protocol)</span>
                  </div>
                  <span className="text-[0.8125rem] font-sans tabular-nums uppercase text-teal">
                    Execution Protocol
                  </span>
                </div>

                <div className="space-y-3">
                  {activeItem.orderOfOperations.map((stepText, idx) => (
                    <div 
                      key={idx}
                      className="p-4 bg-surface-raised rounded-xl border border-ink/[0.06] flex items-start gap-3"
                    >
                      <span className="w-7 h-7 rounded-lg bg-brand/10 text-brand font-sans tabular-nums text-xs flex items-center justify-center shrink-0 mt-0.5 border border-brand/20">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <span className="text-[0.8125rem] font-sans tabular-nums uppercase text-ink-muted block">
                          Step #{idx + 1} Mandate
                        </span>
                        <p className="text-xs sm:text-sm font-sans tabular-nums text-ink leading-relaxed">
                          {stepText}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related PD Arrays & Confluences */}
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-sans tabular-nums uppercase text-ink flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber" />
                  Confluent PD Arrays Required
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeItem.relatedPdArrays.map((arr, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-lg bg-ink/[0.03] border border-ink/[0.07] text-xs font-sans tabular-nums uppercase text-ink-secondary"
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
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-ink/[0.07]">
                  <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-negative">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Mandatory Invalidation Conditions (Exit Criteria)</span>
                  </div>
                  <span className="text-[0.8125rem] font-sans tabular-nums uppercase bg-negative/10 text-negative border border-negative/20 px-2 py-0.5 rounded-full">
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
                            ? 'bg-negative/10 border-negative/30 text-ink'
                            : 'bg-ink/[0.02] border-ink/[0.06] hover:bg-ink/[0.04]'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-negative border-negative text-on-brand on-accent' : 'border-ink/20 bg-ink/[0.04]'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[0.8125rem] font-sans tabular-nums uppercase text-negative">
                            Invalidation Criterion #{idx + 1}
                          </span>
                          <p className="text-xs font-sans tabular-nums text-ink-secondary leading-relaxed">
                            {rule}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Retail Traps & What Retail Misses */}
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-amber pb-2 border-b border-ink/[0.07]">
                  <AlertTriangle className="w-4 h-4 text-amber" />
                  <span>Key Points Missed By Retail Traders</span>
                </div>

                <div className="space-y-2">
                  {activeItem.keyMistakes.map((mistake, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs font-sans tabular-nums text-ink-secondary">
                      <span className="text-negative font-bold">✕</span>
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
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-ink/[0.07]">
                  <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink">
                    <Target className="w-4 h-4 text-brand" />
                    <span>Risk Allocation &amp; Execution Sizing</span>
                  </div>
                  <span className="text-[0.8125rem] font-sans tabular-nums uppercase bg-ink/[0.04] text-teal px-2 py-0.5 rounded-full border border-ink/[0.08]">
                    Capital Preservation
                  </span>
                </div>

                <div className="space-y-3">
                  {activeItem.riskRules.map((rule, idx) => (
                    <div 
                      key={idx}
                      className="p-4 bg-surface-raised rounded-xl border border-ink/[0.06] flex items-center gap-3"
                    >
                      <ShieldCheck className="w-5 h-5 text-teal shrink-0" />
                      <p className="text-xs sm:text-sm font-sans tabular-nums text-ink">
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Anatomy Summary */}
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink-secondary">
                  <Info className="w-4 h-4 text-brand" />
                  <span>Visual Chart Anatomy Specification</span>
                </div>
                <p className="text-xs font-sans tabular-nums text-ink-secondary leading-relaxed bg-surface-muted p-4 rounded-xl border border-ink/[0.06]">
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
