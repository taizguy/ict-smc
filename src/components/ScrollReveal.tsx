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
  const shouldSkipAnimation = immediate || shouldReduceMotion;

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
      initial={false}
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
