import { useEffect } from "react";
import Lenis from "lenis";
import { useLocation } from "@tanstack/react-router";

declare global {
  interface Window {
    lenis: any;
  }
}

export function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable native browser automatic scroll restoration which fights SPA navigation
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const isMobile =
      typeof window !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // When pathname changes, force scroll to top across Lenis, window, documentElement, and body
  useEffect(() => {
    const scrollToTop = () => {
      if (window.lenis) {
        try {
          window.lenis.scrollTo(0, { immediate: true, force: true, lock: false });
        } catch (_) {}
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as any });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // 1. Immediately
    scrollToTop();

    // 2. Next animation frame (after React commits DOM changes)
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
    });

    // 3. Short timeouts to handle any async component renders or layout shifts
    const t1 = setTimeout(scrollToTop, 50);
    const t2 = setTimeout(scrollToTop, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
