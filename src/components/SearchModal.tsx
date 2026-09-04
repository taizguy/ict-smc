import React, { useState, useEffect } from 'react';
import { ictConcepts } from '../data/conceptsData';
import { textbookChapters } from '../data/chaptersData';
import { Search, BookOpen, Compass, X, ArrowRight, CornerDownLeft } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept: (id: string) => void;
  onSelectChapter: (id: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectConcept,
  onSelectChapter
}) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Toggle search
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden font-mono text-xs">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-200 bg-slate-50/80">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ICT concepts, chapters, definitions (e.g. FVG, Order Block, AMD, BSL)..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none font-sans"
          />
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
            title="Close Search (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Concepts Section */}
          {filteredConcepts.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                <span>Encyclopedia Concepts</span>
              </div>
              <div className="space-y-1.5">
                {filteredConcepts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectConcept(c.id);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl bg-white hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 transition-all flex items-center justify-between group shadow-xs"
                  >
                    <div>
                      <div className="text-slate-900 font-bold group-hover:text-sky-700 flex items-center gap-2">
                        <span>{c.name}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono">
                          {c.category}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] font-sans truncate max-w-lg mt-1">
                        {c.shortDefinition}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 shrink-0 ml-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chapters Section */}
          {filteredChapters.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>Textbook Chapters</span>
              </div>
              <div className="space-y-1.5">
                {filteredChapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onSelectChapter(ch.id);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl bg-white hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 transition-all flex items-center justify-between group shadow-xs"
                  >
                    <div>
                      <div className="text-slate-900 font-bold group-hover:text-amber-700 flex items-center gap-2">
                        <span>Chapter {ch.id}: {ch.title}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] font-sans truncate max-w-lg mt-1">
                        {ch.part}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0 ml-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-sans">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px] text-slate-700 shadow-xs">ESC</kbd> to dismiss</span>
          <span className="flex items-center gap-1">
            <span>Select to jump</span>
            <CornerDownLeft className="w-3 h-3 text-slate-400" />
          </span>
        </div>
      </div>
    </div>
  );
};
