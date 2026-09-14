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
}

/**
 * ScrollReveal: Intersection-based reveal component using motion/react.
 * Smoothly lifts elements into view from opacity: 0, y: 35 to opacity: 1, y: 0.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.55,
  y = 35,
  threshold = 0.1,
  once = true,
  id,
  style,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      style={style}
      className={className}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ 
        once, 
        amount: threshold,
        margin: '0px 0px -40px 0px' 
      }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Deceleration cubic bezier for an organic, responsive lift
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
