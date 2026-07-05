"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __advertoPageTransitionComplete?: boolean;
  }
}

export default function usePageTransitionReady(waitForPageTransition = false) {
  const [isReady, setIsReady] = useState(!waitForPageTransition);

  useEffect(() => {
    if (!waitForPageTransition) {
      setIsReady(true);
      return;
    }

    if (window.__advertoPageTransitionComplete) {
      setIsReady(true);
      return;
    }

    const handleTransitionComplete = () => {
      setIsReady(true);
    };

    window.addEventListener(
      "adverto:page-transition-complete",
      handleTransitionComplete,
      { once: true },
    );

    return () => {
      window.removeEventListener(
        "adverto:page-transition-complete",
        handleTransitionComplete,
      );
    };
  }, [waitForPageTransition]);

  return isReady;
}
