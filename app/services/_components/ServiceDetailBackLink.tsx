"use client";

import { useCallback, type KeyboardEvent, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ensureServicePageFallbackState } from "../../service/serviceNavigationState";

export default function ServiceDetailBackLink() {
  const ensureFallback = useCallback(() => {
    ensureServicePageFallbackState();
  }, []);
  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      if (event.button !== 0) return;

      ensureFallback();
    },
    [ensureFallback],
  );
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLAnchorElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      ensureFallback();
    },
    [ensureFallback],
  );

  return (
    <Link
      href="/services"
      className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
      onKeyDownCapture={handleKeyDown}
      onPointerDownCapture={handlePointerDown}
    >
      <ArrowLeft size={16} />
      Services
    </Link>
  );
}
