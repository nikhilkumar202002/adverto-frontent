"use client";

import {
  useCallback,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { hasHomeNavigationState } from "../../homeNavigationState";
import {
  ensureServicePageFallbackState,
  hasServicePageState,
} from "../../service/serviceNavigationState";

export default function ServiceDetailBackLink() {
  const [backHref] = useState(() => {
    if (typeof window === "undefined") return "/services";
    if (hasServicePageState()) return "/services";
    if (hasHomeNavigationState()) return "/";
    return "/services";
  });
  const ensureFallback = useCallback(() => {
    if (hasHomeNavigationState() || hasServicePageState()) return;

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
      href={backHref}
      className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
      onKeyDownCapture={handleKeyDown}
      onPointerDownCapture={handlePointerDown}
    >
      <ArrowLeft size={16} />
      Services
    </Link>
  );
}
