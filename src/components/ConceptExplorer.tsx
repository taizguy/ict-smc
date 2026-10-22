import { currentDocumentHref } from '../i18n/navigation';
import { ToolContentNotice } from './ToolContentNotice';
import { ReviewedModelSource } from './ReviewedModelSource';
import { GlossaryTopicLink } from './TopicLearningGuide';
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
      window.location.assign(currentDocumentHref(targetPath));
    }
  };

  const handleSelectConcept = (conceptId: string) => {
    const mapping = getConceptBySlugOrId(conceptId);
    const catObj = getCategoryBySlugOrId(mapping?.category || selectedCategory);
    const catSlug = catObj?.slug || 'foundations';
    const conceptSlug = mapping?.slug || conceptId.replace(/_/g, '-');
    const targetPath = getGlossaryConceptPath(conceptSlug, catSlug);

    if (typeof window !== 'undefined') {
      window.location.assign(currentDocumentHref(targetPath));
    }

  };

  const handleSelectSubConcept = (subConcept: DeepSubConceptInfo) => {
    const targetPath = getGlossarySubConceptPath(subConcept.categorySlug, subConcept.slug);

    if (typeof window !== 'undefined') {
      window.location.assign(currentDocumentHref(targetPath));
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
    <div className="glossary-pages academy-surface space-y-6 text-ink">
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
      <div className="flex items-center gap-2 text-xs font-sans tabular-nums text-ink-secondary px-1">
        <a 
          href="/tools/" 
          className="hover:text-ink transition-colors"
        >
          Workbench
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />
        <a 
          href="/tools/glossary/" 
          className={`hover:text-ink transition-colors ${selectedCategory === 'all' && !activeSubConcept ? 'text-teal font-semibold' : ''}`}
        >
          Glossary
        </a>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />
            <span className="text-ink-secondary capitalize">
              {getCategoryBySlugOrId(selectedCategory)?.name || selectedCategory}
            </span>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />
        <span className="text-teal font-medium truncate max-w-xs">
          {activeSubConcept ? activeSubConcept.name : concept.name}
        </span>
      </div>

      <ToolContentNotice />
      {/* Category Pills Header with Scroller */}
      <div className="bg-surface border border-ink/[0.08] rounded-xl p-3">
        <BauhausNavScroller>
          {categories.map((cat) => (
            <a
              key={cat.id}

              aria-current={selectedCategory === cat.id ? 'page' : undefined}
              href={cat.id === 'all' ? '/tools/glossary/' : getGlossaryCategoryPath(cat.slug)}
              className={`px-3.5 py-1.5 text-xs font-sans tabular-nums uppercase whitespace-nowrap transition-[color,background-color,border-color,box-shadow,opacity,transform] rounded-lg border cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-ink/[0.12] text-ink border-ink/20'
                  : 'bg-ink/[0.02] text-ink-secondary hover:text-ink border-ink/[0.06] hover:bg-ink/[0.05]'
              }`}
            >
              {cat.label}
            </a>
          ))}
        </BauhausNavScroller>
      </div>

      {/* Deep Sub-Concepts Quick Bar (If category or concept has specialized deep sub-concepts) */}
      {availableSubConcepts.length > 0 && (
        <div className="bg-surface-raised border border-brand/20 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-[0.8125rem] font-sans tabular-nums">
            <span className="text-teal uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <CornerDownRight className="w-3.5 h-3.5" />
              Deep Sub-Concepts ({availableSubConcepts.length} Specialized Analyses):
            </span>
            <span className="text-[0.8125rem] text-ink-secondary">Hierarchical Multi-Tier Exploration</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {availableSubConcepts.map((sub) => {
              const isSubActive = activeSubConcept?.id === sub.id;
              return (
                <a
                  key={sub.id}

                  href={getGlossarySubConceptPath(sub.categorySlug, sub.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans tabular-nums transition-[color,background-color,border-color,box-shadow,opacity,transform] flex items-center gap-1.5 cursor-pointer border ${
                    isSubActive
                      ? 'bg-brand/25 border-brand text-ink shadow-sm'
                      : 'bg-ink/[0.03] border-ink/[0.08] text-ink-secondary hover:text-ink hover:bg-ink/[0.06]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  <span>{sub.name}</span>
                  <span className="text-[0.8125rem] uppercase px-1.5 py-0.2 rounded bg-teal/10 text-teal">
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
          <div className="bg-surface border border-ink/[0.08] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-ink/[0.07] text-xs font-sans tabular-nums">
              <span className="text-ink-secondary uppercase tracking-wider text-[0.8125rem]">Concept Index</span>
              <span className="text-brand font-medium bg-brand/10 px-2.5 py-0.5 rounded-full border border-brand/20 text-[0.8125rem] uppercase">
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
                    className={`block w-full text-left p-3 text-xs font-sans tabular-nums transition-[color,background-color,border-color,box-shadow,opacity,transform] space-y-1.5 rounded-xl border cursor-pointer ${
                      isSelected
                        ? 'bg-ink/[0.10] border-ink/20 text-ink'
                        : 'bg-ink/[0.02] border-ink/[0.06] text-ink-secondary hover:text-ink hover:bg-ink/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold uppercase tracking-tight truncate text-ink">{c.name}</span>
                      <span className="text-[0.8125rem] px-1.5 py-0.5 rounded bg-ink/[0.04] text-ink-muted uppercase shrink-0">
                        {c.category}
                      </span>
                    </div>
                    <p className="text-[0.8125rem] text-ink-secondary line-clamp-1 font-normal">
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
            <div className="bg-gradient-to-br from-surface to-surface border-2 border-brand/40 rounded-2xl p-6 sm:p-8 space-y-5 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-sans tabular-nums">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand/20 text-teal border border-brand/30 uppercase text-[0.8125rem] font-semibold tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    Deep Sub-Concept Analysis
                  </span>
                  <span className="text-ink">/</span>
                  <span className="text-ink-secondary uppercase">{activeSubConcept.categorySlug}</span>
                </div>
                <a
                  href={(() => { const c = getConceptBySlugOrId(concept.id); return c ? getGlossaryConceptPath(c.slug, c.categorySlug) : '/tools/glossary/'; })()}
                  className="text-[0.8125rem] text-ink-secondary hover:text-ink underline font-sans tabular-nums cursor-pointer"
                >
                  Return to Main Concept
                </a>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  {activeSubConcept.name}
                </h2>
                <div className="text-xs sm:text-sm font-sans tabular-nums text-teal">
                  {activeSubConcept.subtitle}
                </div>
                <div className="text-sm text-ink-secondary leading-relaxed pt-1">
                  <ContextualInternalLinker text={activeSubConcept.shortDefinition} />
                </div>
              </div>

              {/* 4 Key Points */}
              <div className="p-4 sm:p-5 rounded-xl bg-surface-muted/80 border border-ink/[0.08] space-y-3">
                <div className="text-xs font-sans tabular-nums uppercase text-brand font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand" />
                  <span>Decisive Operational Criteria &amp; Rules of Thumb:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink-secondary leading-relaxed">
                  {activeSubConcept.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 bg-ink/[0.02] p-2.5 rounded-lg border border-ink/[0.04]">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0" />
                      <div>
                        <ContextualInternalLinker text={pt} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Invalidation & Example Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans tabular-nums">
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                  <span className="text-rose-700 uppercase tracking-wider font-semibold block text-[0.8125rem]">
                    Structural Invalidation Protocol:
                  </span>
                  <p className="text-ink-secondary font-normal leading-relaxed">
                    {activeSubConcept.invalidation}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <span className="text-emerald-700 uppercase tracking-wider font-semibold block text-[0.8125rem]">
                    Institutional Market Scenario:
                  </span>
                  <p className="text-ink-secondary font-normal leading-relaxed">
                    <ContextualInternalLinker text={activeSubConcept.exampleScenario} />
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Concept Header Card with Source Provenance */}
          <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-7 relative overflow-hidden space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans tabular-nums">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded bg-brand/10 text-brand border border-brand/20 uppercase text-[0.8125rem]">
                  {concept.category} • ICT Core Framework
                </span>
                {concept.source && (
                  <span className="px-2.5 py-0.5 rounded bg-ink/[0.04] border border-ink/[0.08] text-ink-secondary text-[0.8125rem] uppercase flex items-center gap-1">
                    <FileText className="w-3 h-3 text-teal" />
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

            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              {concept.name}
            </h2>

            <div className="text-ink-secondary text-sm leading-relaxed font-normal">
              <ContextualInternalLinker text={concept.shortDefinition} />
            </div>

            {/* Source Reference Sub-Banner */}
            {concept.source && (
              <div className="p-4 rounded-xl bg-surface-muted border border-ink/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans tabular-nums">
                <div>
                  <span className="text-ink-muted block text-[0.8125rem] uppercase">Primary Mentorship</span>
                  <span className="text-ink font-medium uppercase truncate block">{concept.source.mentorship}</span>
                </div>
                <div>
                  <span className="text-ink-muted block text-[0.8125rem] uppercase">Original Terminology</span>
                  <span className="text-brand font-medium uppercase truncate block">{concept.source.originalTerminology}</span>
                </div>
                <div>
                  <span className="text-ink-muted block text-[0.8125rem] uppercase">Lecture Reference</span>
                  {concept.source.lectureReference?.startsWith('https://') ? <a className="text-negative font-medium underline block" href={concept.source.lectureReference}>Open source reference</a> : <span className="text-negative font-medium uppercase truncate block">{concept.source.lectureReference || 'Core Series'}</span>}
                </div>
              </div>
            )}

            <ReviewedModelSource modelId={concept.id} />
            <GlossaryTopicLink conceptId={concept.id}/>
            {/* Layer Tabs with Scroller */}
            <div className="pt-4 border-t border-ink/[0.07]">
              <div className="text-[0.8125rem] font-sans tabular-nums uppercase tracking-[0.16em] text-ink-muted mb-2">
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
                      className={`px-3.5 py-1.5 text-xs font-sans tabular-nums uppercase flex items-center gap-1.5 transition-[color,background-color,border-color,box-shadow,opacity,transform] rounded-lg border cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-ink/[0.12] text-ink border-ink/20'
                          : 'bg-ink/[0.02] text-ink-secondary hover:text-ink border-ink/[0.06] hover:bg-ink/[0.05]'
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
                <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-negative font-sans tabular-nums text-xs uppercase">
                    <Zap className="w-4 h-4" />
                    <h3 className="font-semibold">Why It Exists</h3>
                  </div>
                  <div className="text-ink-secondary text-xs sm:text-sm leading-relaxed font-normal">
                    <ContextualInternalLinker text={concept.whyItExists} />
                  </div>
                </div>

                <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-brand font-sans tabular-nums text-xs uppercase">
                    <HelpCircle className="w-4 h-4" />
                    <h3 className="font-semibold">Problem It Solves</h3>
                  </div>
                  <div className="text-ink-secondary text-xs sm:text-sm leading-relaxed font-normal">
                    <ContextualInternalLinker text={concept.problemItSolves} />
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-teal font-sans tabular-nums text-xs uppercase">
                  <Activity className="w-4 h-4" />
                  <h3 className="font-semibold">How It Forms</h3>
                </div>
                <div className="text-ink-secondary text-xs sm:text-sm leading-relaxed font-normal">
                  <ContextualInternalLinker text={concept.howItForms} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANATOMY & DIAGRAM */}
          {activeLayerTab === 'anatomy' && (
            <div className="space-y-6">
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-ink/[0.07]">
                  <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink">
                    <Layers className="w-4 h-4 text-teal" />
                    <span>Interactive Architectural Delivery Canvas</span>
                  </div>
                  <span className="text-[0.8125rem] font-sans tabular-nums uppercase bg-ink/[0.04] text-ink-secondary px-2 py-0.5 rounded border border-ink/[0.08]">
                    {concept.diagramType}
                  </span>
                </div>
                <InteractiveDiagram
                  type={concept.diagramType}
                  title={concept.name}
                  isInteractive={true}
                />
              </div>

              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-teal">
                  <BookOpen className="w-4 h-4" />
                  <h4 className="font-semibold">Visual Anatomy &amp; Identification</h4>
                </div>
                <div className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans tabular-nums bg-surface-muted p-4 rounded-xl border border-ink/[0.06]">
                  <ContextualInternalLinker text={concept.chartAnatomy} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOURCE FIDELITY & TRIPARTITE VIEW */}
          {activeLayerTab === 'tripartite' && (
            <div className="space-y-6">
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-ink/[0.07] pb-3">
                  <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-teal">
                    <Cpu className="w-4 h-4" />
                    <span>Source Fidelity Tripartite Engine</span>
                  </div>
                  <span className="text-[0.8125rem] font-sans tabular-nums uppercase text-ink-secondary">3 Perspectives</span>
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
                      className={`p-3 text-xs font-sans tabular-nums text-center rounded-xl border transition-[color,background-color,border-color,box-shadow,opacity,transform] cursor-pointer ${
                        activeTripartiteTab === t.id
                          ? 'bg-ink/[0.10] border-ink/20 text-ink font-semibold'
                          : 'bg-ink/[0.02] border-ink/[0.06] text-ink-secondary hover:text-ink'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="p-5 rounded-xl bg-surface-muted border border-ink/[0.06] text-xs sm:text-sm text-ink leading-relaxed">
                  {activeTripartiteTab === 'ict' && (
                    <div className="space-y-2">
                      <div className="text-[0.8125rem] font-sans tabular-nums uppercase text-brand">Explicit ICT Teaching:</div>
                      <ContextualInternalLinker text={concept.tripartiteView.ictTeaching} />
                    </div>
                  )}
                  {activeTripartiteTab === 'observable' && (
                    <div className="space-y-2">
                      <div className="text-[0.8125rem] font-sans tabular-nums uppercase text-positive">Observable Market Microstructure:</div>
                      <ContextualInternalLinker text={concept.tripartiteView.observableMarketBehavior} />
                    </div>
                  )}
                  {activeTripartiteTab === 'derived' && (
                    <div className="space-y-2">
                      <div className="text-[0.8125rem] font-sans tabular-nums uppercase text-amber">Derived SMC Formalization:</div>
                      <ContextualInternalLinker text={concept.tripartiteView.derivedInterpretation} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 5-LEVEL EXPLANATION LADDER */}
          {activeLayerTab === 'ladder' && (
            <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-ink/[0.07] pb-4">
                <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-teal">
                  <GraduationCap className="w-4 h-4" />
                  <span>5-Level Conceptual Depth Ladder</span>
                </div>
                <span className="text-[0.8125rem] font-sans tabular-nums text-ink-secondary uppercase">Level {ladderLevel} of 5</span>
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
                    className={`p-2.5 rounded-xl border text-center font-sans tabular-nums text-xs transition-[color,background-color,border-color,box-shadow,opacity,transform] cursor-pointer ${
                      ladderLevel === item.level
                        ? 'bg-brand/20 border-brand text-ink font-semibold'
                        : 'bg-ink/[0.02] border-ink/[0.06] text-ink-secondary hover:text-ink'
                    }`}
                  >
                    <div className="text-[0.8125rem] text-ink-muted">L0{item.level}</div>
                    <div className="truncate mt-0.5">{item.label}</div>
                  </button>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-surface-muted border border-ink/[0.06] text-xs sm:text-sm text-ink leading-relaxed">
                {ladderLevel === 1 && (
                  <div className="space-y-2">
                    <span className="text-[0.8125rem] font-sans tabular-nums uppercase text-positive">Level 1: Everyday Analogy</span>
                    <p className="italic text-ink-secondary">"{concept.explanationLadder.level1Child}"</p>
                  </div>
                )}
                {ladderLevel === 2 && (
                  <div className="space-y-2">
                    <span className="text-[0.8125rem] font-sans tabular-nums uppercase text-teal">Level 2: Beginner Chart Behavior</span>
                    <ContextualInternalLinker text={concept.explanationLadder.level2Beginner} />
                  </div>
                )}
                {ladderLevel === 3 && (
                  <div className="space-y-2">
                    <span className="text-[0.8125rem] font-sans tabular-nums uppercase text-brand">Level 3: Active Retail Execution</span>
                    <ContextualInternalLinker text={concept.explanationLadder.level3Trader} />
                  </div>
                )}
                {ladderLevel === 4 && (
                  <div className="space-y-2">
                    <span className="text-[0.8125rem] font-sans tabular-nums uppercase text-amber">Level 4: Advanced Microstructure</span>
                    <ContextualInternalLinker text={concept.explanationLadder.level4Advanced} />
                  </div>
                )}
                {ladderLevel === 5 && (
                  <div className="space-y-2">
                    <span className="text-[0.8125rem] font-sans tabular-nums uppercase text-negative">Level 5: ICT Interbank IPDA Engine</span>
                    <ContextualInternalLinker text={concept.explanationLadder.level5ICTFramework} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: TRAPS & COUNTEREXAMPLES */}
          {activeLayerTab === 'traps_counterexamples' && (
            <div className="space-y-6">
              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-negative pb-3 border-b border-ink/[0.07]">
                  <ShieldAlert className="w-4 h-4" />
                  <h3 className="font-semibold">Retail Traps &amp; Counterexamples</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {(concept.counterexamples || []).map((trap, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs font-sans tabular-nums">
                        <span className="text-rose-700 font-semibold uppercase">{trap.title}</span>
                        <span className="text-[0.8125rem] text-ink-muted uppercase">Common Fallacy</span>
                      </div>
                      <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                        <strong className="text-ink">The Trap:</strong> {trap.trapDescription}
                      </p>
                      <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                        <strong className="text-teal">Why It Fails:</strong> {trap.whyItFails}
                      </p>
                      <div className="text-xs font-sans tabular-nums text-positive pt-1">
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
                <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-positive font-sans tabular-nums text-xs uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <h3 className="font-semibold">Valid Signatures</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-ink-secondary">
                    {concept.validCharacteristics.map((char, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-positive mt-1.5 shrink-0" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-negative font-sans tabular-nums text-xs uppercase">
                    <XCircle className="w-4 h-4" />
                    <h3 className="font-semibold">Invalid Signatures</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-ink-secondary">
                    {concept.invalidCharacteristics.map((char, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-negative mt-1.5 shrink-0" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-amber font-sans tabular-nums text-xs uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <h3 className="font-semibold">Mechanical Invalidation Threshold</h3>
                </div>
                <div className="text-xs sm:text-sm text-ink-secondary leading-relaxed bg-surface-muted p-4 rounded-xl border border-ink/[0.06]">
                  {concept.invalidationCriteria}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SCENARIOS & TRADE FLOW */}
          {activeLayerTab === 'scenarios' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-positive font-sans tabular-nums text-xs uppercase">
                    <ArrowUpRight className="w-4 h-4" />
                    <h3 className="font-semibold">Bullish Execution Scenario</h3>
                  </div>
                  <div className="text-ink-secondary text-xs sm:text-sm leading-relaxed font-normal bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                    <ContextualInternalLinker text={concept.bullishScenario} />
                  </div>
                </div>

                <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-negative font-sans tabular-nums text-xs uppercase">
                    <ArrowDownRight className="w-4 h-4" />
                    <h3 className="font-semibold">Bearish Execution Scenario</h3>
                  </div>
                  <div className="text-ink-secondary text-xs sm:text-sm leading-relaxed font-normal bg-rose-500/5 border border-rose-500/20 rounded-xl p-4">
                    <ContextualInternalLinker text={concept.bearishScenario} />
                  </div>
                </div>
              </div>

              {onOpenSimulator && (
                <div className="p-6 sm:p-7 bg-surface-raised border border-ink/[0.08] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div>
                    <h4 className="font-semibold text-ink text-sm sm:text-base">Practice in the Decision Simulator</h4>
                    <p className="text-ink-secondary text-xs sm:text-sm mt-1 font-normal">Formulate a trade hypothesis using this concept and simulate price delivery.</p>
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
                    <div className="p-6 rounded-2xl bg-surface-raised border border-ink/[0.08] space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-brand/15 text-brand text-[0.8125rem] font-sans tabular-nums uppercase">
                          Masterclass Protocol • Unit #{matchedMasterclass.number.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-sans tabular-nums text-teal uppercase">
                          {matchedMasterclass.category.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
                        {matchedMasterclass.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-secondary font-sans tabular-nums italic">
                        "{matchedMasterclass.coreRule}"
                      </p>
                    </div>

                    <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-ink/[0.07]">
                        <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink">
                          <Layers className="w-4 h-4 text-brand" />
                          <span>Interactive Architectural Delivery Canvas</span>
                        </div>
                        <span className="text-[0.8125rem] font-sans tabular-nums uppercase bg-ink/[0.04] text-ink-secondary px-2 py-0.5 rounded border border-ink/[0.08]">
                          {matchedMasterclass.diagramType}
                        </span>
                      </div>
                      <InteractiveDiagram
                        type={matchedMasterclass.diagramType}
                        title={matchedMasterclass.title}
                        isInteractive={true}
                      />
                    </div>

                    <div className="bg-surface border border-ink/[0.08] rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-2 font-sans tabular-nums text-xs uppercase text-ink pb-2 border-b border-ink/[0.07]">
                        <Clock className="w-4 h-4 text-teal" />
                        <span>Step-by-Step Order of Operations</span>
                      </div>
                      <div className="space-y-2.5">
                        {matchedMasterclass.orderOfOperations.map((op, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-ink/[0.02] border border-ink/[0.06] flex items-start gap-3">
                            <span className="w-6 h-6 rounded-md bg-ink/[0.04] border border-ink/[0.08] text-brand font-sans tabular-nums text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div className="text-xs font-sans tabular-nums text-ink-secondary leading-relaxed">
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
