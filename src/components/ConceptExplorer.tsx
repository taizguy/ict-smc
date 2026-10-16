import { ToolContentNotice } from './ToolContentNotice';
import React, { useState, useEffect } from 'react';
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
  Info,
  CornerDownRight,
  Compass,
  ArrowRight
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';
import { Target } from 'lucide-react';
import { SEO } from './SEO';
import { ContextualInternalLinker } from './ContextualInternalLinker';
import { 
  GLOSSARY_CATEGORIES, 
  DEEP_SUB_CONCEPTS, 
  getCategoryBySlugOrId, 
  getConceptBySlugOrId, 
  getDeepSubConceptBySlug, 
  getGlossaryRootPath,
  getGlossaryCategoryPath,
  getGlossaryConceptPath,
  getGlossarySubConceptPath,
  DeepSubConceptInfo
} from '../utils/glossaryRoutes';

interface ConceptExplorerProps {
  initialCategory?: string;
  initialConceptId?: string;
  initialSubConceptId?: string;
  onSelectConcept?: (id: string, slug?: string) => void;
  onOpenSimulator?: () => void;
}

export const ConceptExplorer: React.FC<ConceptExplorerProps> = ({ 
  initialCategory,
  initialConceptId,
  initialSubConceptId,
  onSelectConcept, 
  onOpenSimulator 
}) => {
  // Category state
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (initialCategory) {
      const match = getCategoryBySlugOrId(initialCategory);
      return match ? match.id : 'all';
    }
    return 'all';
  });

  // Concept state
  const [selectedConceptId, setSelectedConceptId] = useState<string>(() => {
    if (initialConceptId) {
      const match = getConceptBySlugOrId(initialConceptId);
      if (match) return match.id;
    }
    const category = getCategoryBySlugOrId(initialCategory || '');
    return (ictConcepts.find(c => c.category === category?.id) || ictConcepts[0]).id;
  });

  // Deep sub-concept state
  const [activeSubConcept, setActiveSubConcept] = useState<DeepSubConceptInfo | null>(() => {
    if (initialSubConceptId) {
      return getDeepSubConceptBySlug(initialSubConceptId) || null;
    }
    return null;
  });

  const [activeLayerTab, setActiveLayerTab] = useState<
    'overview' | 'tripartite' | 'anatomy' | 'traps_counterexamples' | 'ladder' | 'rules_invalidation' | 'scenarios' | 'masterclass_blueprint'
  >('overview');
  const [ladderLevel, setLadderLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [activeTripartiteTab, setActiveTripartiteTab] = useState<'ict' | 'observable' | 'derived'>('ict');

  // Sync with incoming props if changed externally
  useEffect(() => {
    if (initialCategory) {
      const cat = getCategoryBySlugOrId(initialCategory);
      if (cat && cat.id !== selectedCategory) {
        setSelectedCategory(cat.id);
      }
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialConceptId) {
      const c = getConceptBySlugOrId(initialConceptId);
      if (c && c.id !== selectedConceptId) {
        setSelectedConceptId(c.id);
      }
    }
  }, [initialConceptId]);

  useEffect(() => {
    if (initialSubConceptId) {
      const sc = getDeepSubConceptBySlug(initialSubConceptId);
      setActiveSubConcept(sc || null);
    } else if (initialSubConceptId === undefined && !initialConceptId && !initialCategory) {
      // do not overwrite if user clicked
    }
  }, [initialSubConceptId]);

  const concept = ictConcepts.find((c) => c.id === selectedConceptId) || ictConcepts[0];

  const filteredConcepts = selectedCategory === 'all'
    ? ictConcepts
    : ictConcepts.filter((c) => c.category === selectedCategory);

  const categories = [
    { id: 'all', slug: 'all', label: 'All Concepts' },
    ...GLOSSARY_CATEGORIES.map(c => ({ id: c.id, slug: c.slug, label: c.name.split('&')[0].trim() }))
  ];

  // Available deep sub-concepts for the current category or selected concept
  const availableSubConcepts = DEEP_SUB_CONCEPTS.filter(sc => {
    if (selectedCategory !== 'all') {
      const catObj = getCategoryBySlugOrId(selectedCategory);
      return sc.categorySlug === catObj?.slug;
    }
    return sc.parentConceptId === selectedConceptId;
  });

  // Client-side dynamic routing handlers
  const handleSelectCategory = (catId: string) => {
    if (typeof window !== 'undefined') {
      const catObj = getCategoryBySlugOrId(catId);
      const targetPath = catId === 'all' ? getGlossaryRootPath() : getGlossaryCategoryPath(catObj?.slug || catId);
      window.location.assign(targetPath);
    }
  };

  const handleSelectConcept = (conceptId: string) => {
    const mapping = getConceptBySlugOrId(conceptId);
    const catObj = getCategoryBySlugOrId(mapping?.category || selectedCategory);
    const catSlug = catObj?.slug || 'foundations';
    const conceptSlug = mapping?.slug || conceptId.replace(/_/g, '-');
    const targetPath = getGlossaryConceptPath(conceptSlug, catSlug);

    if (typeof window !== 'undefined') {
      window.location.assign(targetPath);
    }

  };

  const handleSelectSubConcept = (subConcept: DeepSubConceptInfo) => {
    const targetPath = getGlossarySubConceptPath(subConcept.categorySlug, subConcept.slug);

    if (typeof window !== 'undefined') {
      window.location.assign(targetPath);
    }
  };

  // Determine current active SEO metadata
  let dynamicTitle = 'ICT & SMC Institutional Concepts Glossary & Reference | LearnSMC';
  let dynamicDesc = 'Searchable encyclopedia of 41+ institutional trading concepts, Fair Value Gaps, Order Blocks, Liquidity Pools, and algorithmic mechanics.';
  let dynamicCanonicalPath = getGlossaryRootPath();

  if (activeSubConcept) {
    dynamicTitle = activeSubConcept.metaTitle;
    dynamicDesc = activeSubConcept.metaDescription;
    dynamicCanonicalPath = getGlossarySubConceptPath(activeSubConcept.categorySlug, activeSubConcept.slug);
  } else if (selectedConceptId) {
    const cMap = getConceptBySlugOrId(selectedConceptId);
    if (cMap) {
      dynamicTitle = cMap.metaTitle;
      dynamicDesc = cMap.metaDescription;
      dynamicCanonicalPath = getGlossaryConceptPath(cMap.slug, cMap.categorySlug);
    }
  } else if (selectedCategory !== 'all') {
    const catObj = getCategoryBySlugOrId(selectedCategory);
    if (catObj) {
      dynamicTitle = catObj.metaTitle;
      dynamicDesc = catObj.metaDescription;
      dynamicCanonicalPath = getGlossaryCategoryPath(catObj.slug);
    }
  }

  return (
    <div className="space-y-6 text-[#F5F7FA]">
      {/* Dynamic SEO Engine */}
      <SEO
        title={dynamicTitle}
        description={dynamicDesc}
        canonicalPath={dynamicCanonicalPath}
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": dynamicTitle,
          "url": `https://learnsmc.xyz${dynamicCanonicalPath}`,
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "description": dynamicDesc,
          "provider": {
            "@type": "Organization",
            "name": "LearnSMC",
            "url": "https://learnsmc.xyz/"
          }
        }}
      />

      {/* Breadcrumb Hierarchy */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#9BA1AE] px-1">
        <a 
          href="/tools/" 
          className="hover:text-white transition-colors"
        >
          Workbench
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-[#656B78]" />
        <a 
          href="/tools/glossary/" 
          className={`hover:text-white transition-colors ${selectedCategory === 'all' && !activeSubConcept ? 'text-[#55E6D1] font-semibold' : ''}`}
        >
          Glossary
        </a>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#656B78]" />
            <span className="text-[#9BA1AE] capitalize">
              {getCategoryBySlugOrId(selectedCategory)?.name || selectedCategory}
            </span>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-[#656B78]" />
        <span className="text-[#55E6D1] font-medium truncate max-w-xs">
          {activeSubConcept ? activeSubConcept.name : concept.name}
        </span>
      </div>

      <ToolContentNotice />
      {/* Category Pills Header with Scroller */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-3">
        <BauhausNavScroller>
          {categories.map((cat) => (
            <a
              key={cat.id}

              aria-current={selectedCategory === cat.id ? 'page' : undefined}
              href={cat.id === 'all' ? '/tools/glossary/' : getGlossaryCategoryPath(cat.slug)}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase whitespace-nowrap transition-all rounded-lg border cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-white/[0.12] text-[#F5F7FA] border-white/20'
                  : 'bg-white/[0.02] text-[#9BA1AE] hover:text-[#F5F7FA] border-white/[0.06] hover:bg-white/[0.05]'
              }`}
            >
              {cat.label}
            </a>
          ))}
        </BauhausNavScroller>
      </div>

      {/* Deep Sub-Concepts Quick Bar (If category or concept has specialized deep sub-concepts) */}
      {availableSubConcepts.length > 0 && (
        <div className="bg-[#151923] border border-[#5865FF]/20 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#55E6D1] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <CornerDownRight className="w-3.5 h-3.5" />
              Deep Sub-Concepts ({availableSubConcepts.length} Specialized Analyses):
            </span>
            <span className="text-[10px] text-[#9BA1AE]">Hierarchical Multi-Tier Exploration</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {availableSubConcepts.map((sub) => {
              const isSubActive = activeSubConcept?.id === sub.id;
              return (
                <a
                  key={sub.id}

                  href={getGlossarySubConceptPath(sub.categorySlug, sub.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSubActive
                      ? 'bg-[#5865FF]/25 border-[#5865FF] text-white shadow-sm'
                      : 'bg-white/[0.03] border-white/[0.08] text-[#9BA1AE] hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55E6D1]" />
                  <span>{sub.name}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-black/30 text-[#55E6D1]">
                    Sub-Concept
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

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

            <div 
              className="space-y-2 max-h-[calc(100vh-260px)] modal-scrollable pr-1"
              data-lenis-prevent="true"
            >
              {filteredConcepts.map((c) => {
                const isSelected = c.id === selectedConceptId && !activeSubConcept;
                return (
                  <a
                    key={c.id} aria-current={isSelected ? 'page' : undefined}

                    href={(() => { const mapping = getConceptBySlugOrId(c.id); return mapping ? getGlossaryConceptPath(mapping.slug, mapping.categorySlug) : '/tools/glossary/'; })()}
                    className={`block w-full text-left p-3 text-xs font-mono transition-all space-y-1.5 rounded-xl border cursor-pointer ${
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
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Deep Encyclopedic Breakdown */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          
          {/* SPECIALIZED DEEP SUB-CONCEPT CARD IF ACTIVE */}
          {activeSubConcept && (
            <div className="bg-gradient-to-br from-[#191D28] to-[#11141B] border-2 border-[#5865FF]/40 rounded-2xl p-6 sm:p-8 space-y-5 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#5865FF]/20 text-[#55E6D1] border border-[#5865FF]/30 uppercase text-[11px] font-semibold tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    Deep Sub-Concept Analysis
                  </span>
                  <span className="text-white/20">/</span>
                  <span className="text-[#9BA1AE] uppercase">{activeSubConcept.categorySlug}</span>
                </div>
                <a
                  href={(() => { const c = getConceptBySlugOrId(concept.id); return c ? getGlossaryConceptPath(c.slug, c.categorySlug) : '/tools/glossary/'; })()}
                  className="text-[11px] text-[#9BA1AE] hover:text-white underline font-mono cursor-pointer"
                >
                  Return to Main Concept
                </a>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeSubConcept.name}
                </h2>
                <div className="text-xs sm:text-sm font-mono text-[#55E6D1]">
                  {activeSubConcept.subtitle}
                </div>
                <div className="text-sm text-[#C5CBD8] leading-relaxed pt-1">
                  <ContextualInternalLinker text={activeSubConcept.shortDefinition} />
                </div>
              </div>

              {/* 4 Key Points */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0C0E13]/80 border border-white/[0.08] space-y-3">
                <div className="text-xs font-mono uppercase text-[#5865FF] font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5865FF]" />
                  <span>Decisive Operational Criteria &amp; Rules of Thumb:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9BA1AE] leading-relaxed">
                  {activeSubConcept.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#55E6D1] mt-1.5 shrink-0" />
                      <div>
                        <ContextualInternalLinker text={pt} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Invalidation & Example Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                  <span className="text-rose-400 uppercase tracking-wider font-semibold block text-[11px]">
                    Structural Invalidation Protocol:
                  </span>
                  <p className="text-[#C5CBD8] font-normal leading-relaxed">
                    {activeSubConcept.invalidation}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <span className="text-emerald-400 uppercase tracking-wider font-semibold block text-[11px]">
                    Institutional Market Scenario:
                  </span>
                  <p className="text-[#C5CBD8] font-normal leading-relaxed">
                    <ContextualInternalLinker text={activeSubConcept.exampleScenario} />
                  </p>
                </div>
              </div>
            </div>
          )}

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
                  aria-pressed={activeLayerTab === 'ladder'} onClick={() => setActiveLayerTab('ladder')}
                  className="btn-predikt-secondary text-xs py-1 px-3"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>5-Level Ladder</span>
                </button>
                <button
                  type="button"
                  aria-pressed={activeLayerTab === 'tripartite'} onClick={() => setActiveLayerTab('tripartite')}
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

            <div className="text-[#9BA1AE] text-sm leading-relaxed font-normal">
              <ContextualInternalLinker text={concept.shortDefinition} />
            </div>

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
                      aria-pressed={activeLayerTab === tab.id as any} onClick={() => setActiveLayerTab(tab.id as any)}
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
                  <div className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal">
                    <ContextualInternalLinker text={concept.whyItExists} />
                  </div>
                </div>

                <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#5865FF] font-mono text-xs uppercase">
                    <HelpCircle className="w-4 h-4" />
                    <h3 className="font-semibold">Problem It Solves</h3>
                  </div>
                  <div className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal">
                    <ContextualInternalLinker text={concept.problemItSolves} />
                  </div>
                </div>
              </div>

              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-[#55E6D1] font-mono text-xs uppercase">
                  <Activity className="w-4 h-4" />
                  <h3 className="font-semibold">How It Forms</h3>
                </div>
                <div className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal">
                  <ContextualInternalLinker text={concept.howItForms} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANATOMY & DIAGRAM */}
          {activeLayerTab === 'anatomy' && (
            <div className="space-y-6">
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#F5F7FA]">
                    <Layers className="w-4 h-4 text-[#55E6D1]" />
                    <span>Interactive Architectural Delivery Canvas</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-white/[0.04] text-[#9BA1AE] px-2 py-0.5 rounded border border-white/[0.08]">
                    {concept.diagramType}
                  </span>
                </div>
                <InteractiveDiagram
                  type={concept.diagramType}
                  title={concept.name}
                  isInteractive={true}
                />
              </div>

              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#55E6D1]">
                  <BookOpen className="w-4 h-4" />
                  <h4 className="font-semibold">Visual Anatomy &amp; Identification</h4>
                </div>
                <div className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed font-mono bg-[#0C0E13] p-4 rounded-xl border border-white/[0.06]">
                  <ContextualInternalLinker text={concept.chartAnatomy} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOURCE FIDELITY & TRIPARTITE VIEW */}
          {activeLayerTab === 'tripartite' && (
            <div className="space-y-6">
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#55E6D1]">
                    <Cpu className="w-4 h-4" />
                    <span>Source Fidelity Tripartite Engine</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#9BA1AE]">3 Perspectives</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'ict', label: '1. What ICT Teaches' },
                    { id: 'observable', label: '2. Observable Auction' },
                    { id: 'derived', label: '3. Derived SMC Model' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={activeTripartiteTab === t.id} onClick={() => setActiveTripartiteTab(t.id as any)}
                      className={`p-3 text-xs font-mono text-center rounded-xl border transition-all cursor-pointer ${
                        activeTripartiteTab === t.id
                          ? 'bg-white/[0.10] border-white/20 text-[#F5F7FA] font-semibold'
                          : 'bg-white/[0.02] border-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="p-5 rounded-xl bg-[#0C0E13] border border-white/[0.06] text-xs sm:text-sm text-[#F5F7FA] leading-relaxed">
                  {activeTripartiteTab === 'ict' && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono uppercase text-[#5865FF]">Explicit ICT Teaching:</div>
                      <ContextualInternalLinker text={concept.tripartiteView.ictTeaching} />
                    </div>
                  )}
                  {activeTripartiteTab === 'observable' && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono uppercase text-[#52D273]">Observable Market Microstructure:</div>
                      <ContextualInternalLinker text={concept.tripartiteView.observableMarketBehavior} />
                    </div>
                  )}
                  {activeTripartiteTab === 'derived' && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono uppercase text-[#FFB300]">Derived SMC Formalization:</div>
                      <ContextualInternalLinker text={concept.tripartiteView.derivedInterpretation} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 5-LEVEL EXPLANATION LADDER */}
          {activeLayerTab === 'ladder' && (
            <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#55E6D1]">
                  <GraduationCap className="w-4 h-4" />
                  <span>5-Level Conceptual Depth Ladder</span>
                </div>
                <span className="text-[10px] font-mono text-[#9BA1AE] uppercase">Level {ladderLevel} of 5</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[
                  { level: 1, label: 'Child Analogy' },
                  { level: 2, label: 'Beginner' },
                  { level: 3, label: 'Active Trader' },
                  { level: 4, label: 'Advanced' },
                  { level: 5, label: 'ICT Interbank' }
                ].map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    aria-pressed={ladderLevel === item.level} onClick={() => setLadderLevel(item.level as any)}
                    className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all cursor-pointer ${
                      ladderLevel === item.level
                        ? 'bg-[#5865FF]/20 border-[#5865FF] text-[#F5F7FA] font-semibold'
                        : 'bg-white/[0.02] border-white/[0.06] text-[#9BA1AE] hover:text-[#F5F7FA]'
                    }`}
                  >
                    <div className="text-[10px] text-[#656B78]">L0{item.level}</div>
                    <div className="truncate mt-0.5">{item.label}</div>
                  </button>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-[#0C0E13] border border-white/[0.06] text-xs sm:text-sm text-[#F5F7FA] leading-relaxed">
                {ladderLevel === 1 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#52D273]">Level 1: Everyday Analogy</span>
                    <p className="italic text-[#9BA1AE]">"{concept.explanationLadder.level1Child}"</p>
                  </div>
                )}
                {ladderLevel === 2 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#55E6D1]">Level 2: Beginner Chart Behavior</span>
                    <ContextualInternalLinker text={concept.explanationLadder.level2Beginner} />
                  </div>
                )}
                {ladderLevel === 3 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#5865FF]">Level 3: Active Retail Execution</span>
                    <ContextualInternalLinker text={concept.explanationLadder.level3Trader} />
                  </div>
                )}
                {ladderLevel === 4 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#FFB300]">Level 4: Advanced Microstructure</span>
                    <ContextualInternalLinker text={concept.explanationLadder.level4Advanced} />
                  </div>
                )}
                {ladderLevel === 5 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#FF6B7A]">Level 5: ICT Interbank IPDA Engine</span>
                    <ContextualInternalLinker text={concept.explanationLadder.level5ICTFramework} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: TRAPS & COUNTEREXAMPLES */}
          {activeLayerTab === 'traps_counterexamples' && (
            <div className="space-y-6">
              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#FF6B7A] pb-3 border-b border-white/[0.07]">
                  <ShieldAlert className="w-4 h-4" />
                  <h3 className="font-semibold">Retail Traps &amp; Counterexamples</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {(concept.counterexamples || []).map((trap, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-rose-400 font-semibold uppercase">{trap.title}</span>
                        <span className="text-[10px] text-[#656B78] uppercase">Common Fallacy</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed">
                        <strong className="text-[#F5F7FA]">The Trap:</strong> {trap.trapDescription}
                      </p>
                      <p className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed">
                        <strong className="text-[#55E6D1]">Why It Fails:</strong> {trap.whyItFails}
                      </p>
                      <div className="text-xs font-mono text-[#52D273] pt-1">
                        Rule of thumb: {trap.ruleOfThumb}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RULES & INVALIDATION MATRIX */}
          {activeLayerTab === 'rules_invalidation' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#52D273] font-mono text-xs uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <h3 className="font-semibold">Valid Signatures</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#9BA1AE]">
                    {concept.validCharacteristics.map((char, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#52D273] mt-1.5 shrink-0" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#FF6B7A] font-mono text-xs uppercase">
                    <XCircle className="w-4 h-4" />
                    <h3 className="font-semibold">Invalid Signatures</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#9BA1AE]">
                    {concept.invalidCharacteristics.map((char, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B7A] mt-1.5 shrink-0" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-[#FFB300] font-mono text-xs uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <h3 className="font-semibold">Mechanical Invalidation Threshold</h3>
                </div>
                <div className="text-xs sm:text-sm text-[#9BA1AE] leading-relaxed bg-[#0C0E13] p-4 rounded-xl border border-white/[0.06]">
                  {concept.invalidationCriteria}
                </div>
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
                  <div className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                    <ContextualInternalLinker text={concept.bullishScenario} />
                  </div>
                </div>

                <div className="bg-[#11141B] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#FF6B7A] font-mono text-xs uppercase">
                    <ArrowDownRight className="w-4 h-4" />
                    <h3 className="font-semibold">Bearish Execution Scenario</h3>
                  </div>
                  <div className="text-[#9BA1AE] text-xs sm:text-sm leading-relaxed font-normal bg-rose-500/5 border border-rose-500/20 rounded-xl p-4">
                    <ContextualInternalLinker text={concept.bearishScenario} />
                  </div>
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
                            <div className="text-xs font-mono text-[#9BA1AE] leading-relaxed">
                              <ContextualInternalLinker text={op} />
                            </div>
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
