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
        document
          .querySelectorAll<HTMLElement>("[data-service-card-link]")
          .forEach((link) => {
            link.dataset.active =
              link.dataset.serviceCardLink === state.activeServiceHref
                ? "true"
                : "false";
          });
      }

      scrollToPosition(state.scrollY);
    };

    return runAfterPageReady(restorePosition, { delayMs: 140 });
  }, []);

  useLayoutEffect(() => {
    if (!serviceListPathnames.has(pathname) || !pageTransitionReady) return;

    return restore();
  }, [pageTransitionReady, pathname, restore]);

  return null;
}
