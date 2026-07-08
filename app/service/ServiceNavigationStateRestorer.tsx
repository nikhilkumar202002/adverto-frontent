"use client";

import { useCallback, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  clearServicePageState,
  readServicePageState,
} from "./serviceNavigationState";
import usePageTransitionReady from "../components/common/usePageTransitionReady";
import { runAfterPageReady } from "../components/common/navigationRestore";

const serviceListPathnames = new Set(["/service", "/services"]);

const scrollToPosition = (top: number) => {
  window.scrollTo(0, top);
  window.dispatchEvent(new CustomEvent("adverto:scroll-to", { detail: { top } }));
};

export default function ServiceNavigationStateRestorer() {
  const pathname = usePathname();
  const pageTransitionReady = usePageTransitionReady(true);

  const restore = useCallback(() => {
    if (!serviceListPathnames.has(window.location.pathname)) return;

    const state = readServicePageState();

    if (!state || !Number.isFinite(state.scrollY)) return;

    clearServicePageState();
    const restorePosition = () => {
      if (state.activeServiceHref) {
        const matchingLink = document.querySelector<HTMLElement>(
          `[data-service-card-link="${state.activeServiceHref}"]`,
        );

        document
          .querySelectorAll<HTMLElement>("[data-service-card-link]")
          .forEach((link) => {
            link.dataset.active =
              link.dataset.serviceCardLink === state.activeServiceHref
                ? "true"
                : "false";
          });

        if (matchingLink) {
          const cardTop =
            window.scrollY + matchingLink.getBoundingClientRect().top - 24;
          const top = Math.max(0, cardTop);

          scrollToPosition(top);
          return;
        }
      }

      scrollToPosition(state.scrollY);
    };

    // Restore immediately on first RAF to prevent flickering
    window.requestAnimationFrame(() => {
      restorePosition();
      // Call once more after layout paint to ensure it sticks
      window.requestAnimationFrame(restorePosition);
    });

    // Also run after page ready as a fallback for lazy-loaded content
    return runAfterPageReady(restorePosition, { delayMs: 0 });
  }, []);

  useLayoutEffect(() => {
    if (!serviceListPathnames.has(pathname) || !pageTransitionReady) return;

    return restore();
  }, [pageTransitionReady, pathname, restore]);

  return null;
}
