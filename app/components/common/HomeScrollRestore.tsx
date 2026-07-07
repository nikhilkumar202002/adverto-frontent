"use client";

import { useCallback, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  clearHomeNavigationState,
  readHomeNavigationState,
  type HomeProjectSliderState,
  type HomeServicesGridState,
} from "../../homeNavigationState";

const scrollToPosition = (top: number) => {
  window.scrollTo(0, top);
  window.dispatchEvent(new CustomEvent("adverto:scroll-to", { detail: { top } }));
};

const restoreProjectSlider = (state: HomeProjectSliderState | null) => {
  if (!state) return;

  const track = document.querySelector<HTMLElement>("[data-home-project-track]");

  if (!track) return;

  const duration = state.animationDuration || 52;
  const progress = Math.min(Math.max(state.animationProgress, 0), 1);

  window.dispatchEvent(
    new CustomEvent("adverto:home-project-slider-restore", {
      detail: state,
    }),
  );

  track.style.animationDelay = `${-(duration * progress)}s`;
  track.style.animationPlayState = "running";
  track.dataset.restoredProgress = String(progress);
  track.style.transform = `translate3d(${state.trackTranslateX}px, 0, 0)`;

  window.requestAnimationFrame(() => {
    track.style.transform = "";
  });

  if (state.activeProjectId) {
    document
      .querySelectorAll<HTMLElement>("[data-home-project-card]")
      .forEach((card) => {
        card.dataset.active =
          card.dataset.homeProjectCard === state.activeProjectId
            ? "true"
            : "false";
      });
  }
};

const restoreServicesGrid = (state: HomeServicesGridState | null | undefined) => {
  if (!state?.activeServiceHref) return;

  document
    .querySelectorAll<HTMLElement>("[data-home-service-card]")
    .forEach((card) => {
      card.dataset.active =
        card.dataset.homeServiceCard === state.activeServiceHref
          ? "true"
          : "false";
    });
};

export default function HomeScrollRestore() {
  const pathname = usePathname();

  const restoreHomeScroll = useCallback(() => {
    if (window.location.pathname !== "/") return;

    const state = readHomeNavigationState();

    if (!state || !Number.isFinite(state.scrollY)) return;

    clearHomeNavigationState();
    const restore = () => {
      restoreProjectSlider(state.projectSlider);
      restoreServicesGrid(state.servicesGrid);
      scrollToPosition(state.scrollY);
    };

    restore();
    const frameId = window.requestAnimationFrame(() => {
      restore();
    });
    const settleTimers = [80, 180, 360, 700, 1000].map((delay) =>
      window.setTimeout(restore, delay),
    );

    return () => {
      window.cancelAnimationFrame(frameId);
      settleTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useLayoutEffect(() => {
    if (pathname !== "/") return;

    return restoreHomeScroll();
  }, [pathname, restoreHomeScroll]);

  useEffect(() => {
    const handlePageShow = () => {
      restoreHomeScroll();
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [restoreHomeScroll]);

  return null;
}
