"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
    });

    const updateScrollTrigger = () => {
      if (ScrollTrigger.getAll().length > 0) {
        ScrollTrigger.update();
      }
    };
    const scrollToPosition = (top = 0) => {
      if (typeof window === "undefined") return;
      window.scrollTo(0, top);
      lenis.scrollTo(top, { immediate: true, force: true });
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const scrollToTop = () => scrollToPosition();
    const handleScrollTo = (event: Event) => {
      const { top = 0 } = (event as CustomEvent<{ top?: number }>).detail ?? {};

      scrollToPosition(top);
    };

    lenis.on("scroll", updateScrollTrigger);
    window.addEventListener("adverto:scroll-to", handleScrollTo);
    window.requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => {
      window.removeEventListener("adverto:scroll-to", handleScrollTo);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
    };
  }, []);

  return children;
}
