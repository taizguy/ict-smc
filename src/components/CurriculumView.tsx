import { withoutLocale } from '../i18n/locale';
import { useTranslation } from '../i18n/TranslationProvider';
import { AccentText } from './AccentText';
import { matchesSearch as matchesLocalizedSearch } from '../i18n/search';
import { chapterCount, lectureCount } from '../utils/catalogCounts';
import { topicClusters, topicSlug } from '../utils/topicClusters';
import React, { useState, useMemo } from 'react';
import { textbookChapters } from '../data/chaptersData';
import { getLessonPath } from '../utils/url';
import {
  Search,
  ArrowRight,
  X
} from 'lucide-react';
import { BauhausNavScroller } from './BauhausNavScroller';
import { ScrollReveal } from './ScrollReveal';
import { MentorshipsTeaser, MentorshipsView } from './MentorshipsView';
import { ChapterDiagram } from './ChapterDiagram';
import { SearchFocusGuide } from './SearchFocusGuide';
import { TopicJourneyLinks } from './TopicLearningGuide';
import { chapterIllustrationRevision } from '../data/chapters/diagrams';

interface CurriculumViewProps {
  onSelectChapter: (chapterId: number, slug?: string) => void;
  onOpenSearch: () => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  onSelectChapter,
  onOpenSearch
}) => {
  const { t: translateSearch } = useTranslation();
  const [selectedPart, setSelectedPart] = useState<string>(() => topicClusters.find(c => withoutLocale(location.pathname) === `/curriculum/${c.slug}/`)?.part || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique parts
  const parts = useMemo(() => {
    const list: string[] = [];
    textbookChapters.forEach((ch) => {
      if (!list.includes(ch.part)) {
        list.push(ch.part);
      }
    });
    return list;
  }, []);

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    return textbookChapters.filter((ch) => {
      if (selectedPart !== 'all' && ch.part !== selectedPart) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = matchesLocalizedSearch(query, [ch.title], translateSearch);
        const matchesQuote = matchesLocalizedSearch(query, [ch.quote], translateSearch);
        const matchesPart = matchesLocalizedSearch(query, [ch.part], translateSearch);
        const matchesTerms = ch.keyTerms.some(k => matchesLocalizedSearch(query, [k.term], translateSearch) || matchesLocalizedSearch(query, [k.definition], translateSearch));
        const matchesSummary = ch.summary.some(s => matchesLocalizedSearch(query, [s], translateSearch));
        return matchesTitle || matchesQuote || matchesPart || matchesTerms || matchesSummary;
      }
      return true;
    });
  }, [selectedPart, searchQuery]);

  const mentorshipRoute = withoutLocale(location.pathname).match(/^\/curriculum\/mentorships(?:\/([^/]+))?\/?$/);
  if (mentorshipRoute) return <MentorshipsView slug={mentorshipRoute[1]} />;

  return (
    <div className="studio-curriculum space-y-12 sm:space-y-16 pb-20">
      <MentorshipsTeaser />

      <details className="curriculum-topics"><summary>Browse curriculum topics</summary><nav aria-label="Curriculum topics" className="grid sm:grid-cols-2 gap-2 pt-4">
        <a className="underline" href="/curriculum/">All lessons</a>
        {topicClusters.map(c => <a key={c.slug} className="underline text-teal" href={`/curriculum/${c.slug}/`}>{c.part}</a>)}
      </nav></details>
      {/* Editorial Header Section */}
      <ScrollReveal y={25} duration={0.6}>
        <section className="studio-page-intro bg-surface border border-ink/[0.08] rounded-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">

              {/* Technical Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="text-[0.8125rem] font-sans tabular-nums tracking-[0.2em] uppercase text-teal">
                  01 / CURRICULUM ARCHITECTURE
                </span>
                <span className="text-ink">·</span>
                <span className="text-[0.8125rem] font-sans tabular-nums tracking-[0.16em] uppercase text-ink-muted">
                  {chapterCount} CODIFIED CHAPTERS
                </span>
              </div>

              {/* Large Section Headline */}
              <div className="space-y-1">
                <h1 className="predikt-section-title">{selectedPart === 'all' ? <AccentText text="ICT & SMC Syllabus" focus="Syllabus" urduFocus="نصاب" tone="violet"/> : selectedPart}</h1>
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl font-normal pt-1">
                  {translateSearch('Study ICT and Smart Money Concepts with free lessons, original diagrams and chart exercises. Start with market foundations, then learn structure, liquidity and price patterns at your own pace.')}
                </p>
              </div>

              {selectedPart !== 'all' && topicClusters.find(c => c.part === selectedPart)?.guidance.length > 0 && <section className="max-w-3xl space-y-3 text-sm leading-relaxed text-ink-secondary"><h2 className="text-lg font-semibold text-ink">How to use this learning path</h2>{topicClusters.find(c => c.part === selectedPart)?.guidance.map(p => <p key={p}>{p}</p>)}</section>}

              {/* Search Bar */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                  <input
                    type="text"
                    placeholder="SEARCH CHAPTERS, CONCEPTS, TERMS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-surface-muted border border-ink/[0.09] rounded-xl text-xs sm:text-sm font-sans tabular-nums text-ink placeholder-[#5f7064] uppercase tracking-wider focus:outline-none focus:border-brand/60 transition-[color,background-color,border-color,box-shadow,opacity,transform]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-ink-muted hover:text-ink transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={onOpenSearch}
                  className="btn-predikt-secondary text-xs px-4 whitespace-nowrap"
                >
                  Index (⌘K)
                </button>
              </div>
            </div>

            {/* Right Column: Stats Block */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">

              <div className="flex-1 bg-ink/[0.02] border border-ink/[0.07] p-4 sm:p-5 rounded-xl">
                <div className="text-3xl sm:text-4xl font-semibold font-sans tabular-nums text-ink tracking-tight leading-none">
                  {chapterCount}
                </div>
                <div className="text-xs text-ink-secondary mt-1 font-sans tabular-nums tracking-wider uppercase">
                  Textbook Chapters
                </div>
              </div>

              <div className="flex-1 bg-ink/[0.02] border border-ink/[0.07] p-4 sm:p-5 rounded-xl">
                <div className="text-3xl sm:text-4xl font-semibold font-sans tabular-nums text-brand tracking-tight leading-none">
                  {topicClusters.length}
                </div>
                <div className="text-xs text-ink-secondary mt-1 font-sans tabular-nums tracking-wider uppercase">
                  Curriculum Modules
                </div>
              </div>

              <div className="flex-1 bg-ink/[0.02] border border-ink/[0.07] p-4 sm:p-5 rounded-xl">
                <div className="text-3xl sm:text-4xl font-semibold font-sans tabular-nums text-teal tracking-tight leading-none">
                  100%
                </div>
                <div className="text-xs text-ink-secondary mt-1 font-sans tabular-nums tracking-wider uppercase">
                  Unrestricted &amp; Open
                </div>
              </div>

            </div>

          </div>
        </section>
      </ScrollReveal>

      {selectedPart === 'all' && <SearchFocusGuide kind="curriculum" />}
      {selectedPart === 'all' && <TopicJourneyLinks />}
      {/* Part Filter Section */}
      <ScrollReveal y={20} delay={0.1}>
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-4 pb-2 border-b border-ink/[0.07]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans tabular-nums uppercase tracking-[0.16em] text-ink-secondary">
                FILTER BY CURRICULUM MODULE
              </span>
            </div>
            <div className="text-xs font-sans tabular-nums text-ink-muted">
              {filteredChapters.length} of {textbookChapters.length} Chapters
            </div>
          </div>

          <BauhausNavScroller innerClassName="gap-2 py-1" showArrowsAlways={true}>
            <button
              onClick={() => setSelectedPart('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-tight whitespace-nowrap border transition-[color,background-color,border-color,box-shadow,opacity,transform] cursor-pointer shrink-0 ${
                selectedPart === 'all'
                  ? 'bg-ink/[0.12] text-ink border-ink/20'
                  : 'bg-ink/[0.02] hover:bg-ink/[0.06] text-ink-secondary hover:text-ink border-ink/[0.06]'
              }`}
            >
              All Modules ({textbookChapters.length})
            </button>

            {parts.map((p, idx) => {
              const count = textbookChapters.filter(ch => ch.part === p).length;
              const shortName = p.replace(/^Part\s+[IVXLCDM]+\s*-\s*/, '');
              const isSelected = selectedPart === p;

              return (
                <button
                  key={p}
                  onClick={() => setSelectedPart(p)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-tight whitespace-nowrap border transition-[color,background-color,border-color,box-shadow,opacity,transform] cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-ink/[0.12] text-ink border-ink/20'
                      : 'bg-ink/[0.02] hover:bg-ink/[0.06] text-ink-secondary hover:text-ink border-ink/[0.06]'
                  }`}
                >
                  P{idx + 1}: {shortName} ({count})
                </button>
              );
            })}
          </BauhausNavScroller>
        </section>
      </ScrollReveal>

      {/* Chapters Grid - Predikt Dark Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredChapters.map((ch) => {
          const partShort = ch.part.replace(/^Part\s+[IVXLCDM]+\s*-\s*/, '');

          return (
            <a
              key={ch.id}
              href={getLessonPath(ch.slug)}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onSelectChapter(ch.id, ch.slug);
                }
              }}
              className="group predikt-card p-6 flex flex-col justify-between cursor-pointer space-y-5 no-underline block"
            >
              <div className="space-y-4">
                {/* Card Header Metadata */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans tabular-nums font-semibold text-brand tracking-wider">
                    {String(textbookChapters.indexOf(ch) + 1).padStart(2, '0')} / {chapterCount}
                  </span>
                  <span className="text-[0.8125rem] font-sans tabular-nums tracking-wider uppercase text-ink-muted">
                    LEVEL {ch.level} · {partShort}
                  </span>
                </div>

                <ChapterDiagram chapterId={ch.id} thumbnail />
                {/* Chapter Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-ink group-hover:text-brand transition-colors leading-snug">
                    {ch.title}
                  </h3>

                  {/* Quote Callout */}
                  <div className="mt-3 p-3 rounded-lg bg-ink/[0.02] border-l-2 border-brand text-xs text-ink-secondary italic line-clamp-2 leading-relaxed">
                    "{ch.quote}"
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-ink/[0.06] flex items-center justify-between gap-3 text-xs font-sans tabular-nums">
                <div className="flex items-center gap-2 text-ink-muted text-[0.8125rem]">
                  <span>{ch.sections.length} SEC</span>
                  <span>·</span>
                  <span>{ch.keyTerms.length} TERMS</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-ink font-sans group-hover:text-brand transition-colors">
                  <span>Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </a>
          );
        })}
      </section>

      {/* Empty Search State */}
      {filteredChapters.length === 0 && (
        <div className="bg-surface border border-ink/[0.08] rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-ink/[0.04] border border-ink/[0.08] flex items-center justify-center mx-auto text-ink-secondary">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-ink tracking-tight">
            No Chapters Match Your Search
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary max-w-md mx-auto leading-relaxed">
            Try searching for terms like "Liquidity", "Order Block", "FVG", or reset your current filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPart('all');
            }}
            className="btn-predikt-secondary text-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}

      <section className="space-y-3 text-sm leading-relaxed"><h2 className="text-xl font-semibold">How to study a chapter</h2><p>Read the definition, identify its conditions on a historical chart, and record an example where the pattern fails. Hide future candles to reduce hindsight bias. Keep observations separate from assumptions about institutional intent.</p><p>Page updated: <time dateTime={chapterIllustrationRevision.iso}>{chapterIllustrationRevision.label}</time>. <a className="underline" href="/about/#editorial-policy">Editorial policy</a>.</p></section>
    </div>
  );
};

export default CurriculumView;
