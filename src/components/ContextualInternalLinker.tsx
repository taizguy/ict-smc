import React from 'react';
import { KEYWORD_CROSS_LINKS, KeywordCrossLink } from '../utils/glossaryRoutes';
import { ArrowUpRight } from 'lucide-react';

interface ContextualInternalLinkerProps {
  text: string | string[];
  className?: string;
  maxLinks?: number;
  onNavigate?: (url: string) => void;
}

// Sort keywords by descending length so multi-word terms take precedence
const SORTED_KEYWORDS: KeywordCrossLink[] = [...KEYWORD_CROSS_LINKS].sort(
  (a, b) => b.term.length - a.term.length
);

export const ContextualInternalLinker: React.FC<ContextualInternalLinkerProps> = ({
  text,
  className = '',
  maxLinks = 6,
  onNavigate
}) => {
  const normalizedText = Array.isArray(text) ? text.join('\n\n') : text;
  if (!normalizedText) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    // Allow modifier keys (cmd+click / ctrl+click) for new tabs
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    
    e.preventDefault();
    if (onNavigate) {
      onNavigate(url);
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Find occurrences of terms
  interface MatchRange {
    start: number;
    end: number;
    term: string;
    keyword: KeywordCrossLink;
  }

  const matches: MatchRange[] = [];
  const linkedTerms = new Set<string>();

  for (const kw of SORTED_KEYWORDS) {
    if (matches.length >= maxLinks) break;
    // Don't link duplicate terms in the same block
    if (linkedTerms.has(kw.term.toLowerCase())) continue;

    // Use boundary matching
    const escapedTerm = kw.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b(${escapedTerm})\\b`, 'i');
    const match = regex.exec(normalizedText);

    if (match && match.index !== undefined) {
      const start = match.index;
      const end = start + match[0].length;

      // Check if this range overlaps with any previously found match
      const overlaps = matches.some(
        m => (start >= m.start && start < m.end) || (end > m.start && end <= m.end)
      );

      if (!overlaps) {
        matches.push({
          start,
          end,
          term: match[0],
          keyword: kw
        });
        linkedTerms.add(kw.term.toLowerCase());
      }
    }
  }

  // If no matches, return plain text
  if (matches.length === 0) {
    return <span className={className}>{normalizedText}</span>;
  }

  // Sort matches by start index
  matches.sort((a, b) => a.start - b.start);

  // Split text into fragments
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((m, idx) => {
    // Leading text
    if (m.start > lastIndex) {
      nodes.push(normalizedText.substring(lastIndex, m.start));
    }

    // Anchor node
    nodes.push(
      <a
        key={`kw-${idx}-${m.start}`}
        href={m.keyword.url}
        onClick={(e) => handleClick(e, m.keyword.url)}
        title={`${m.keyword.term} (${m.keyword.badge}) — ${m.keyword.tooltip}`}
        className="inline-flex items-baseline font-medium text-[#55E6D1] underline decoration-[#55E6D1]/30 hover:decoration-[#55E6D1] underline-offset-[3px] hover:text-white transition-all cursor-pointer group px-0.5 rounded hover:bg-[#55E6D1]/10"
      >
        <span>{m.term}</span>
        <ArrowUpRight className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform inline-block ml-0.5 self-center" />
      </a>
    );

    lastIndex = m.end;
  });

  // Remaining trailing text
  if (lastIndex < normalizedText.length) {
    nodes.push(normalizedText.substring(lastIndex));
  }

  return <span className={className}>{nodes}</span>;
};
