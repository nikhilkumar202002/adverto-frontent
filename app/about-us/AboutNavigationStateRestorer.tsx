"use client";

import { useCallback, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  clearAboutNavigationState,
  readAboutNavigationState,
  type AboutFeaturedSliderState,
} from "./aboutNavigationState";
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

  const restore = useCallback(() => {
    if (!aboutPathnames.has(window.location.pathname)) return;

    const state = readAboutNavigationState();

    if (!state || !Number.isFinite(state.scrollY)) return;

    clearAboutNavigationState();

    const restorePosition = () => {
      restoreFeaturedSlider(state.featuredSlider);
      scrollToPosition(state.scrollY);
    };

    let firstFrameId = 0;
    let secondFrameId = 0;

    restorePosition();

    firstFrameId = window.requestAnimationFrame(() => {
      restorePosition();
      secondFrameId = window.requestAnimationFrame(restorePosition);
    });

    const cleanupAfterReady = runAfterPageReady(restorePosition, {
      delayMs: 180,
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
      cleanupAfterReady();
    };
  }, []);

  useLayoutEffect(() => {
    if (!aboutPathnames.has(pathname)) return;

    return restore();
  }, [pathname, restore]);

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
