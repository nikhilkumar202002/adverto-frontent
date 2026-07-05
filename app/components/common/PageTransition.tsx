"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname, useRouter } from "next/navigation";

const TILE_COUNT = 12;
const tiles = Array.from({ length: TILE_COUNT }, (_, index) => index);

const isModifiedClick = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const isTransitioningRef = useRef(false);
  const pendingPathRef = useRef<string | null>(null);
  const hasMountedRef = useRef(false);

  const setTileRef = useCallback((element: HTMLSpanElement | null, index: number) => {
    tileRefs.current[index] = element;
  }, []);

  const revealPage = useCallback(() => {
    const overlay = overlayRef.current;
    const tileElements = tileRefs.current.filter(Boolean);

    if (!overlay || tileElements.length === 0) return;

    gsap.killTweensOf([overlay, tileElements]);
    gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
    gsap.set(tileElements, { scaleY: 1, transformOrigin: "bottom center" });

    gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
          isTransitioningRef.current = false;
          pendingPathRef.current = null;
        },
      })
      .to(tileElements, {
        scaleY: 0,
        duration: 0.72,
        stagger: {
          each: 0.025,
          from: "random",
        },
      });
  }, []);

  const coverPage = useCallback(
    (href: string) => {
      const overlay = overlayRef.current;
      const tileElements = tileRefs.current.filter(Boolean);

      if (!overlay || tileElements.length === 0) {
        router.push(href);
        return;
      }

      isTransitioningRef.current = true;
      pendingPathRef.current = new URL(href, window.location.origin).pathname;

      gsap.killTweensOf([overlay, tileElements]);
      gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(tileElements, { scaleY: 0, transformOrigin: "top center" });

      gsap
        .timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: () => {
            router.push(href);
          },
        })
        .to(tileElements, {
          scaleY: 1,
          duration: 0.54,
          stagger: {
            each: 0.018,
            from: "random",
          },
        });
    },
    [router],
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const handleClick = (event: MouseEvent) => {
      if (isTransitioningRef.current || isModifiedClick(event)) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!anchor) return;
      if (anchor.target || anchor.hasAttribute("download")) return;

      const nextUrl = new URL(anchor.href, window.location.origin);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.origin !== currentUrl.origin) return;
      if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      coverPage(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [coverPage]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(tileRefs.current.filter(Boolean), { scaleY: 0 });
      return;
    }

    if (!isTransitioningRef.current && pendingPathRef.current !== pathname) {
      const overlay = overlayRef.current;
      const tileElements = tileRefs.current.filter(Boolean);

      gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(tileElements, { scaleY: 1, transformOrigin: "bottom center" });
    }

    revealPage();
  }, [pathname, revealPage]);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9997] flex min-h-svh opacity-0"
    >
      {tiles.map((tile) => (
        <span
          key={tile}
          ref={(element) => setTileRef(element, tile)}
          className="block min-h-svh flex-1 origin-top scale-y-0 bg-[#0000FF]"
        />
      ))}
    </div>
  );
}
