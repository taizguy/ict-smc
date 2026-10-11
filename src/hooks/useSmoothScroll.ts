import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const getLenis = (): Lenis | null => lenisInstance;

export const smoothScrollTo = (target: number | string | HTMLElement, options?: { offset?: number; duration?: number }) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: options?.duration ?? 1.1,
      offset: options?.offset ?? 0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (typeof target === 'string') {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: 'smooth' });
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Hook to pause Lenis smooth scrolling and lock background page scrolling
 * whenever any modal, drawer, or dialog is open.
 */
export const useModalScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    if (!isOpen) return;

    // Pause Lenis while modal is open so wheel/touch inside modal scrolls smoothly & natively
    if (lenisInstance) {
      lenisInstance.stop();
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      if (lenisInstance) {
        lenisInstance.start();
      }
    };
  }, [isOpen]);
};

/**
 * Hook to initialize Lenis momentum smooth scrolling across the website.
 * Configured with prevent handlers and allowNestedScroll so all modals,
 * dialogs, and scrollable containers preserve silky native scrolling.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      allowNestedScroll: true,
      prevent: (node) => {
        if (!node || !(node instanceof HTMLElement)) return false;

        // 1. Explicit data-lenis-prevent attribute anywhere in hierarchy
        if (node.hasAttribute('data-lenis-prevent') || node.closest('[data-lenis-prevent]')) {
          return true;
        }

        // 2. Any modal, dialog, or fullscreen overlay
        if (node.closest('[role="dialog"], [aria-modal="true"], .modal, .modal-scrollable, [data-modal]')) {
          return true;
        }

        // 3. Fixed overlay containers
        if (node.closest('.fixed.inset-0')) {
          return true;
        }

        // 4. Any container with active vertical or horizontal overflow
        try {
          const style = window.getComputedStyle(node);
          const isScrollY = (style.overflowY === 'auto' || style.overflowY === 'scroll') && node.scrollHeight > node.clientHeight;
          const isScrollX = (style.overflowX === 'auto' || style.overflowX === 'scroll') && node.scrollWidth > node.clientWidth;
          if (isScrollY || isScrollX) {
            return true;
          }
        } catch {
          // ignore
        }

        return false;
      },
    });

    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};
