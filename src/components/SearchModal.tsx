import { useTranslation } from '../i18n/TranslationProvider';
import { matchesSearch } from '../i18n/search';
import { articleCatalog as articles } from '../data/catalog.generated';
import React, { useState, useEffect, useRef } from 'react';
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
  const { t, href, message } = useTranslation();
  const [query, setQuery] = useState<string>('');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLInputElement>('input')?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('input, button:not(:disabled), a[href]')).filter(el => el.getClientRects().length > 0);
      if (event.key === 'Tab') {
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const results = Array.from(dialog.querySelectorAll<HTMLElement>('.search-results button, .search-results a[href]'));
        if (!results.length) return;
        const current = results.indexOf(document.activeElement as HTMLElement);
        const next = current < 0 ? (event.key === 'ArrowDown' ? 0 : results.length - 1) : (current + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
        event.preventDefault(); results[next].focus();
      }
    };
    document.addEventListener('keydown', keyboard);
    return () => { document.removeEventListener('keydown', keyboard); if (previousFocus?.isConnected) previousFocus.focus(); };
  }, [isOpen]);

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
    : ictConcepts.filter(c => matchesSearch(query, [c.name, c.shortDefinition, c.category], t));
  const filteredChapters = query.trim() === ''
    ? textbookChapters.slice(0, 4)
    : textbookChapters.filter(ch => matchesSearch(query, [ch.title, ...ch.summary, ...ch.keyTerms.map(kt => kt.term)], t));
  const filteredArticles = articles.filter(a => matchesSearch(query, [a.title, a.description, a.topic], t));
  return (
    <div 
      ref={dialogRef}
      className="search-overlay fixed inset-0 z-[80] bg-ink/35 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 text-ink overflow-y-auto"
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-label={t('Search')}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="search-dialog bg-surface border border-ink/[0.1] rounded-2xl w-full max-w-2xl overflow-hidden font-sans text-xs shadow-2xl"
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="search-input-row flex items-center gap-3 p-4 sm:p-5 border-b border-ink/[0.08] bg-surface-muted">
          <Search className="w-5 h-5 text-ink-muted shrink-0" />
          <input
            type="text"
            aria-label={t('Search')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Search concepts, chapters, algorithms (FVG, OB, AMD)...')}
            className="w-full bg-transparent text-ink placeholder-[#5f7064] text-sm focus:outline-none font-sans"
          />
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg bg-ink/[0.04] hover:bg-ink/[0.1] text-ink-secondary hover:text-ink transition-colors cursor-pointer"
            title={t('Close Search (Esc)')}
            aria-label={t('Close Search (Esc)')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div 
          className="search-results max-h-[60vh] modal-scrollable p-4 sm:p-6 space-y-6"
          data-lenis-prevent="true"
        >
          {/* Concepts Section */}
          {filteredConcepts.length > 0 && (
            <div className="space-y-3">
              <div className="text-[0.8125rem] text-ink-secondary uppercase tracking-wider flex items-center justify-between font-sans tabular-nums pb-1 border-b border-ink/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  <span>{t('ENCYCLOPEDIA CONCEPTS')}</span>
                </div>
                <span className="text-[0.8125rem] text-ink-muted">
                  {filteredConcepts.length} {t('MATCHES')}
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
                    className="w-full p-3 rounded-xl bg-ink/[0.02] hover:bg-ink/[0.06] border border-ink/[0.05] hover:border-ink/[0.12] text-left transition-[color,background-color,border-color,box-shadow,opacity,transform] flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-ink group-hover:text-brand transition-colors truncate">
                          {t(c.name)}
                        </span>
                        <span className="text-[0.8125rem] px-2 py-0.5 rounded bg-ink/[0.04] text-ink-secondary uppercase font-sans tabular-nums shrink-0">
                          {t(c.category)}
                        </span>
                      </div>
                      <p className="text-xs text-ink-secondary line-clamp-1">
                        {t(c.shortDefinition)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-ink group-hover:translate-x-0.5 transition-[color,background-color,border-color,box-shadow,opacity,transform] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredArticles.length > 0 && <section className="space-y-3"><h2 className="text-sm font-semibold">{t('Articles')}</h2>{filteredArticles.map(a => <a key={a.slug} href={href(`/articles/${a.slug}/`)} className="block p-3 rounded-xl border border-ink/10 hover:bg-ink/5"><span className="text-teal text-xs">{t(a.topic)}</span><h3 className="text-sm mt-1">{t(a.title)}</h3></a>)}</section>}
          {/* Chapters Section */}
          {filteredChapters.length > 0 && (
            <div className="space-y-3">
              <div className="text-[0.8125rem] text-ink-secondary uppercase tracking-wider flex items-center justify-between font-sans tabular-nums pb-1 border-b border-ink/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  <span>{t('TEXTBOOK CHAPTERS')}</span>
                </div>
                <span className="text-[0.8125rem] text-ink-muted">
                  {filteredChapters.length} {t('MATCHES')}
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
                    className="w-full p-3 rounded-xl bg-ink/[0.02] hover:bg-ink/[0.06] border border-ink/[0.05] hover:border-ink/[0.12] text-left transition-[color,background-color,border-color,box-shadow,opacity,transform] flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-sans tabular-nums font-medium text-teal">
                          CH {ch.id < 10 ? `0${ch.id}` : ch.id}
                        </span>
                        <span className="font-medium text-sm text-ink group-hover:text-teal transition-colors truncate">
                          {t(ch.title)}
                        </span>
                      </div>
                      <p className="text-xs text-ink-secondary line-clamp-1 italic">
                        "{t(ch.quote)}"
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-ink group-hover:translate-x-0.5 transition-[color,background-color,border-color,box-shadow,opacity,transform] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredConcepts.length === 0 && filteredChapters.length === 0 && filteredArticles.length === 0 && (
            <div className="search-empty text-center py-8 space-y-2" role="status">
              <p className="text-ink-secondary text-sm">{message('No matches found for "{query}".', { query })}</p>
              <p className="text-xs text-ink-muted font-sans tabular-nums">{t('Try searching for FVG, Liquidity, Order Block, or Level 1.')}</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-surface-muted border-t border-ink/[0.06] flex items-center justify-between text-[0.8125rem] font-sans tabular-nums text-ink-muted">
          <div className="flex items-center gap-3">
            <span>{t('↑↓ Navigate')}</span>
            <span>{t('↵ Select')}</span>
            <span>{t('Esc Close')}</span>
          </div>
          <div className="flex items-center gap-2 text-ink-secondary">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('ICT Knowledge Base')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
