import React from 'react';
import { contextualFragments } from '../utils/contextualLinks';
interface Props { text: string | string[]; className?: string; maxLinks?: number; onNavigate?: (url: string) => void }
export const ContextualInternalLinker: React.FC<Props> = ({ text, className = '', maxLinks = 4 }) => (
  <span className={className}>{contextualFragments(text, typeof location === 'undefined' ? '' : location.pathname, maxLinks).map((fragment, i) =>
    fragment.href ? <a key={i} href={fragment.href} className="font-medium text-teal underline underline-offset-4">{fragment.text}</a> : fragment.text
  )}</span>
);
