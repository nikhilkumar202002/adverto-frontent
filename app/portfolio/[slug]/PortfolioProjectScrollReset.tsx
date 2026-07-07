"use client";

import { useLayoutEffect } from "react";

type PortfolioProjectScrollResetProps = {
  slug: string;
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
  window.dispatchEvent(
    new CustomEvent("adverto:scroll-to", { detail: { top: 0 } }),
  );
};

export default function PortfolioProjectScrollReset({
  slug,
}: PortfolioProjectScrollResetProps) {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let frameId = 0;
    let settleTimer: number | undefined;

    scrollToTop();

    frameId = window.requestAnimationFrame(() => {
      scrollToTop();

      settleTimer = window.setTimeout(scrollToTop, 220);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      if (settleTimer) window.clearTimeout(settleTimer);
    };
  }, [slug]);

  return null;
}
