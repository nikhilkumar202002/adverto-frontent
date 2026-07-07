"use client";

import { useCallback, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { saveServicePageState } from "./serviceNavigationState";

type ServiceCardLinkProps = {
  children: ReactNode;
  className: string;
  href: string;
};

export default function ServiceCardLink({
  children,
  className,
  href,
}: ServiceCardLinkProps) {
  const saveState = useCallback(() => {
    if (!["/service", "/services"].includes(window.location.pathname)) return;

    saveServicePageState(href);
  }, [href]);
  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      if (event.button !== 0) return;

      saveState();
    },
    [saveState],
  );
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLAnchorElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      saveState();
    },
    [saveState],
  );

  return (
    <Link
      href={href}
      className={className}
      data-service-card-link={href}
      onKeyDownCapture={handleKeyDown}
      onPointerDownCapture={handlePointerDown}
    >
      {children}
    </Link>
  );
}
