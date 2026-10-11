import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  threshold?: number | 'some' | 'all';
  once?: boolean;
  id?: string;
  style?: React.CSSProperties;
  immediate?: boolean;
}

// Identify search engine crawlers, SEO audit tools, and AI agentic scrapers
const isCrawlerOrBot = (): boolean => {
  if (typeof navigator === 'undefined') return true;
  const ua = navigator.userAgent;
  if (!ua) return false;
  return /bot|googlebot|crawler|spider|robot|crawling|mediapartners|adsbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|pinterest|slackbot|whatsapp|applebot|gptbot|chatgpt|perplexity|claude/i.test(ua);
};

/**
 * ScrollReveal: SEO & Crawler-Optimized Intersection reveal component using motion/react.
 * Guarantees zero blank content above/below fold, positive pre-fetch threshold margin,
 * and immediate visibility for Googlebot, AdSense crawler, and AI bots.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  y = 20,
  threshold = 0,
  once = true,
  id,
  style,
  immediate = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isBot = isCrawlerOrBot();
  const shouldSkipAnimation = immediate || shouldReduceMotion || isBot;

  if (shouldSkipAnimation) {
    return (
      <div id={id} style={style} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      style={style}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ 
        once, 
        amount: threshold,
        margin: '0px 0px 120px 0px' // Positive 120px margin triggers before or at fold edge
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth deceleration cubic bezier
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
