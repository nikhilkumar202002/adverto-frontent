"use client";

import { useCallback, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  clearAboutNavigationState,
  readAboutNavigationState,
  type AboutFeaturedSliderState,
} from "./aboutNavigationState";
import usePageTransitionReady from "../components/common/usePageTransitionReady";
import { runAfterPageReady } from "../components/common/navigationRestore";

declare global {
  interface Window {
    gsap?: {
      set: (
        target: Element | Element[] | string,
        vars: Record<string, string | number>,
      ) => void;
    };
  }
}

const aboutPathnames = new Set(["/about-us", "/about"]);

const scrollToPosition = (top: number) => {
  window.scrollTo(0, top);
  window.dispatchEvent(new CustomEvent("adverto:scroll-to", { detail: { top } }));
};

const restoreFeaturedSlider = (state: AboutFeaturedSliderState | null) => {
  if (!state) return;

  const track = document.querySelector<HTMLElement>("[data-about-featured-track]");

  if (!track) return;

  const duration = state.animationDuration || 48;
  const progress = Math.min(
    Math.max(state.timelineProgress ?? state.animationProgress, 0),
    1,
  );

  window.dispatchEvent(
    new CustomEvent("adverto:about-featured-slider-restore", {
      detail: state,
    }),
  );

  track.style.animationDelay = `${-(duration * progress)}s`;
  track.style.animationPlayState = "running";
  track.dataset.restoredProgress = String(progress);

  if (window.gsap) {
    window.gsap.set(track, { x: state.trackTranslateX });
  } else {
    track.style.transform = `translate3d(${state.trackTranslateX}px, 0, 0)`;
  }

  window.requestAnimationFrame(() => {
    track.style.transform = "";
  });

  if (state.activeSlug) {
    document
      .querySelectorAll<HTMLElement>("[data-about-featured-project]")
      .forEach((card) => {
        card.dataset.active =
          card.dataset.aboutFeaturedProject === state.activeSlug ? "true" : "false";
      });
  }
};

export default function AboutNavigationStateRestorer() {
  const pathname = usePathname();
  const pageTransitionReady = usePageTransitionReady(true);

  const restore = useCallback(() => {
    if (!aboutPathnames.has(window.location.pathname)) return;

    const state = readAboutNavigationState();

    if (!state || !Number.isFinite(state.scrollY)) return;

    clearAboutNavigationState();

    return runAfterPageReady(() => {
      restoreFeaturedSlider(state.featuredSlider);
      scrollToPosition(state.scrollY);
    }, { delayMs: 180 });
  }, []);

  useLayoutEffect(() => {
    if (!aboutPathnames.has(pathname) || !pageTransitionReady) return;

    return restore();
  }, [pageTransitionReady, pathname, restore]);

  useEffect(() => {
    const handlePageShow = () => {
      restore();
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [restore]);

  return null;
}
