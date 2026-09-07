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
    <div className="fixed inset-0 z-50 bg-black/75 flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-white border-4 border-[#121212] shadow-[12px_12px_0px_0px_#121212] rounded-none w-full max-w-2xl overflow-hidden font-sans text-xs">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 sm:p-5 border-b-4 border-[#121212] bg-[#F0F0F0]">
          <div className="w-10 h-10 rounded-none bg-[#1040C0] text-white flex items-center justify-center border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] shrink-0">
            <Search className="w-5 h-5 stroke-[2.5]" />
          </div>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH CONCEPTS, CHAPTERS, ALGORITHMS (FVG, OB, AMD)..."
            className="w-full bg-transparent text-[#121212] placeholder-[#121212]/50 text-sm focus:outline-none font-mono font-bold uppercase"
          />
          <button 
            onClick={onClose} 
            className="p-2 rounded-none bg-white text-[#121212] hover:bg-[#D02020] hover:text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] transition-colors cursor-pointer"
            title="Close Search (Esc)"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Concepts Section */}
          {filteredConcepts.length > 0 && (
            <div className="space-y-3">
              <div className="text-[11px] text-[#121212] uppercase font-black tracking-widest flex items-center justify-between font-mono pb-1 border-b-2 border-[#121212]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#D02020] inline-block border border-black" />
                  <span>ENCYCLOPEDIA CONCEPTS</span>
                </div>
                <span className="text-[10px] font-mono text-[#121212]/60">
                  {filteredConcepts.length} MATCHES
                </span>
              </div>
              <div className="space-y-2">
                {filteredConcepts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectConcept(c.id);
                      onClose();
                    }}
                    className="w-full text-left p-3.5 rounded-none bg-[#F0F0F0] hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] transition-all flex items-center justify-between group cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    <div>
                      <div className="font-black text-sm uppercase tracking-tight flex items-center gap-2">
                        <span>{c.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-none bg-white text-[#121212] border border-[#121212] font-mono font-bold">
                          {c.category}
                        </span>
                      </div>
                      <div className="text-[#121212]/80 text-xs font-medium truncate max-w-lg mt-1">
                        {c.shortDefinition}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-none bg-white group-hover:bg-[#121212] group-hover:text-white border-2 border-[#121212] flex items-center justify-center transition-all ml-3 shrink-0">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chapters Section */}
          {filteredChapters.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="text-[11px] text-[#121212] uppercase font-black tracking-widest flex items-center justify-between font-mono pb-1 border-b-2 border-[#121212]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1040C0] inline-block border border-black" />
                  <span>CURRICULUM CHAPTERS</span>
                </div>
                <span className="text-[10px] font-mono text-[#121212]/60">
                  {filteredChapters.length} CHAPTERS
                </span>
              </div>
              <div className="space-y-2">
                {filteredChapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onSelectChapter(ch.id);
                      onClose();
                    }}
                    className="w-full text-left p-3.5 rounded-none bg-[#F0F0F0] hover:bg-[#1040C0] hover:text-white text-[#121212] border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] transition-all flex items-center justify-between group cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    <div>
                      <div className="font-black text-sm uppercase tracking-tight flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded-none bg-[#D02020] text-white border border-[#121212]">
                          CH {ch.id < 10 ? `0${ch.id}` : ch.id}
                        </span>
                        <span>{ch.title}</span>
                      </div>
                      <div className="opacity-80 text-xs font-medium truncate max-w-lg mt-1">
                        {ch.part}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-none bg-white group-hover:bg-[#F0C020] group-hover:text-[#121212] text-[#121212] border-2 border-[#121212] flex items-center justify-center transition-all ml-3 shrink-0">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-4 bg-[#F0F0F0] border-t-4 border-[#121212] flex items-center justify-between text-xs text-[#121212] font-mono font-bold uppercase">
          <span className="flex items-center gap-2">
            <span>PRESS</span>
            <kbd className="px-2 py-0.5 rounded-none bg-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-[10px]">
              ESC
            </kbd>
            <span>TO DISMISS</span>
          </span>
          <span className="flex items-center gap-1.5 text-[10px]">
            <span>SELECT TO OPEN</span>
            <CornerDownLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
