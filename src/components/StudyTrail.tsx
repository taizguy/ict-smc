import { BookOpen, GitCompare, Play } from 'lucide-react';

const steps = [
  { title: 'Read the context', note: 'Start with the foundations.', href: '/curriculum/', icon: BookOpen, tone: 'sage' },
  { title: 'Question the label', note: 'Compare the definitions.', href: '/tools/compare/', icon: GitCompare, tone: 'violet' },
  { title: 'Try it in replay', note: 'Practice before risking capital.', href: '/tools/chartlab/', icon: Play, tone: 'coral' },
];

/** A small, useful desk-like navigation object; no canvas, 3D library or autoplay. */
export function StudyTrail() {
  return <nav className="study-trail" aria-label="A small study routine">
    <p className="study-trail-label">A little less guessing.<br/><strong>A little more process.</strong></p>
    <ol>{steps.map((step, index) => {
      const Icon = step.icon;
      return <li key={step.href}><a href={step.href} className={`study-step study-step--${step.tone}`}>
        <span className="study-key" aria-hidden="true"><Icon size={21}/><span>{String(index + 1).padStart(2, '0')}</span></span>
        <span><strong>{step.title}</strong><small>{step.note}</small></span>
      </a></li>;
    })}</ol>
  </nav>;
}
