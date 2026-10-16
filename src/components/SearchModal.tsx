import { articleCatalog as articles } from '../data/catalog.generated';
import React, { useState, useEffect } from 'react';
import { ictConcepts } from '../data/conceptsData';
import { textbookChapters } from '../data/chaptersData';
import { Search, BookOpen, Layers, X, ArrowRight } from 'lucide-react';
import { useModalScrollLock } from '../hooks/useSmoothScroll';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept: (id: string) => void;
  onSelectChapter: (id: number, slug?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectConcept,
  onSelectChapter
}) => {
  const [query, setQuery] = useState<string>('');

  useModalScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredConcepts = query.trim() === ''
    ? ictConcepts.slice(0, 6)
    : ictConcepts.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.shortDefinition.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      );

  const filteredChapters = query.trim() === ''
    ? textbookChapters.slice(0, 4)
    : textbookChapters.filter(
        (ch) =>
          ch.title.toLowerCase().includes(query.toLowerCase()) ||
          ch.summary.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
          ch.keyTerms.some((kt) => kt.term.toLowerCase().includes(query.toLowerCase()))
      );

  const filteredArticles = articles.filter(a => !query.trim() || `${a.title} ${a.description} ${a.topic}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div 
      className="fixed inset-0 z-50 bg-ink/35 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 text-ink overflow-y-auto"
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-surface border border-ink/[0.1] rounded-2xl w-full max-w-2xl overflow-hidden font-sans text-xs shadow-2xl"
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-ink/[0.08] bg-surface-muted">
          <Search className="w-5 h-5 text-ink-muted shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, chapters, algorithms (FVG, OB, AMD)..."
            className="w-full bg-transparent text-ink placeholder-[#5f7064] text-sm focus:outline-none font-sans"
          />
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg bg-ink/[0.04] hover:bg-ink/[0.1] text-ink-secondary hover:text-ink transition-colors cursor-pointer"
            title="Close Search (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div 
          className="max-h-[60vh] modal-scrollable p-4 sm:p-6 space-y-6"
          data-lenis-prevent="true"
        >
          {/* Concepts Section */}
          {filteredConcepts.length > 0 && (
            <div className="space-y-3">
              <div className="text-[0.8125rem] text-ink-secondary uppercase tracking-wider flex items-center justify-between font-sans tabular-nums pb-1 border-b border-ink/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  <span>ENCYCLOPEDIA CONCEPTS</span>
                </div>
                <span className="text-[0.8125rem] text-ink-muted">
                  {filteredConcepts.length} MATCHES
                </span>
              </div>
              <div className="space-y-1.5">
                {filteredConcepts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectConcept(c.id);
                      onClose();
                    }}
                    className="w-full p-3 rounded-xl bg-ink/[0.02] hover:bg-ink/[0.06] border border-ink/[0.05] hover:border-ink/[0.12] text-left transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-ink group-hover:text-brand transition-colors truncate">
                          {c.name}
                        </span>
                        <span className="text-[0.8125rem] px-2 py-0.5 rounded bg-ink/[0.04] text-ink-secondary uppercase font-sans tabular-nums shrink-0">
                          {c.category}
                        </span>
                      </div>
                      <p className="text-xs text-ink-secondary line-clamp-1">
                        {c.shortDefinition}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-ink group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredArticles.length > 0 && <section className="space-y-3"><h2 className="text-sm font-semibold">Articles</h2>{filteredArticles.map(a => <a key={a.slug} href={`/articles/${a.slug}/`} className="block p-3 rounded-xl border border-ink/10 hover:bg-ink/5"><span className="text-teal text-xs">{a.topic}</span><h3 className="text-sm mt-1">{a.title}</h3></a>)}</section>}
          {/* Chapters Section */}
          {filteredChapters.length > 0 && (
            <div className="space-y-3">
              <div className="text-[0.8125rem] text-ink-secondary uppercase tracking-wider flex items-center justify-between font-sans tabular-nums pb-1 border-b border-ink/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  <span>TEXTBOOK CHAPTERS</span>
                </div>
                <span className="text-[0.8125rem] text-ink-muted">
                  {filteredChapters.length} MATCHES
                </span>
              </div>
              <div className="space-y-1.5">
                {filteredChapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onSelectChapter(ch.id, ch.slug);
                      onClose();
                    }}
                    className="w-full p-3 rounded-xl bg-ink/[0.02] hover:bg-ink/[0.06] border border-ink/[0.05] hover:border-ink/[0.12] text-left transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-sans tabular-nums font-medium text-teal">
                          CH {ch.id < 10 ? `0${ch.id}` : ch.id}
                        </span>
                        <span className="font-medium text-sm text-ink group-hover:text-teal transition-colors truncate">
                          {ch.title}
                        </span>
                      </div>
                      <p className="text-xs text-ink-secondary line-clamp-1 italic">
                        "{ch.quote}"
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-ink group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredConcepts.length === 0 && filteredChapters.length === 0 && filteredArticles.length === 0 && (
            <div className="text-center py-8 space-y-2">
              <p className="text-ink-secondary text-sm">No matches found for "{query}".</p>
              <p className="text-xs text-ink-muted font-sans tabular-nums">Try searching for FVG, Liquidity, Order Block, or Level 1.</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-surface-muted border-t border-ink/[0.06] flex items-center justify-between text-[0.8125rem] font-sans tabular-nums text-ink-muted">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <div className="flex items-center gap-2 text-ink-secondary">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ICT Knowledge Base</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
