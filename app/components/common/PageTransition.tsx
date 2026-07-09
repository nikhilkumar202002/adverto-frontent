"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { saveAboutNavigationState } from "../../about-us/aboutNavigationState";

const TILE_COUNT = 12;
const tiles = Array.from({ length: TILE_COUNT }, (_, index) => index);
const homeProjectScrollKey = "adverto:home-project-scroll-y";
const homeProjectRestoreKey = "adverto:home-project-restore-on-return";
const homeNavigationRestoreKey = "adverto:home-navigation-restore-on-return";
const portfolioScrollKey = "adverto:portfolio-scroll-y";
const portfolioRestoreKey = "adverto:portfolio-restore-on-return";
const worksPageRestoreKey = "adverto:works-page-restore-on-return";
const servicePageRestoreKey = "adverto:service-page-restore-on-return";
const aboutRestoreKey = "adverto:about-restore-on-return";

declare global {
  interface Window {
    __advertoPageTransitionComplete?: boolean;
  }
}

const isModifiedClick = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const markPageTransitionComplete = () => {
  window.__advertoPageTransitionComplete = true;
  window.dispatchEvent(new Event("adverto:page-transition-complete"));
};

const scrollToPosition = (top = 0) => {
  window.dispatchEvent(new CustomEvent("adverto:scroll-to", { detail: { top } }));
};

const shouldRestoreHomePosition = (path: string) =>
  path.startsWith("/portfolio/") || path.startsWith("/services/");

const setScrollCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=1800; SameSite=Lax`;
};

const getCookie = (name: string) => {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null;
};

const hasRestoreState = (name: string) =>
  getCookie(name) === "true" || sessionStorage.getItem(name) === "true";

const shouldPreserveScrollForPath = (path: string) => {
  if (path === "/") {
    return (
      hasRestoreState(homeNavigationRestoreKey) ||
      hasRestoreState(homeProjectRestoreKey)
    );
  }

  if (path === "/portfolio" || path === "/works") {
    return (
      hasRestoreState(worksPageRestoreKey) ||
      hasRestoreState(portfolioRestoreKey)
    );
  }

  if (path === "/service" || path === "/services") {
    return hasRestoreState(servicePageRestoreKey);
  }

  if (path === "/about-us" || path === "/about") {
    return hasRestoreState(aboutRestoreKey);
  }

  return false;
};

const saveHomeProjectScroll = (currentPath: string, nextPath: string) => {
  if (currentPath !== "/" || !shouldRestoreHomePosition(nextPath)) return;

  const scrollY = String(window.scrollY);

  sessionStorage.setItem(homeProjectScrollKey, scrollY);
  sessionStorage.setItem(homeProjectRestoreKey, "true");
  setScrollCookie(homeProjectScrollKey, scrollY);
  setScrollCookie(homeProjectRestoreKey, "true");
};

const isPortfolioDetailPath = (path: string) =>
  path.startsWith("/portfolio/") && path !== "/portfolio/";

const isProjectDetailPath = (path: string) =>
  isPortfolioDetailPath(path) || (path.startsWith("/works/") && path !== "/works/");

const savePortfolioScroll = (currentPath: string, nextPath: string) => {
  if (currentPath !== "/portfolio" || !isPortfolioDetailPath(nextPath)) return;

  const scrollY = String(window.scrollY);

  sessionStorage.setItem(portfolioScrollKey, scrollY);
  sessionStorage.setItem(portfolioRestoreKey, "true");
  setScrollCookie(portfolioScrollKey, scrollY);
  setScrollCookie(portfolioRestoreKey, "true");
};

const saveAboutScroll = (currentPath: string, nextPath: string) => {
  if (!["/about-us", "/about"].includes(currentPath) || !isProjectDetailPath(nextPath)) {
    return;
  }

  saveAboutNavigationState();
};

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const isTransitioningRef = useRef(false);
  const pendingPathRef = useRef<string | null>(null);
  const pendingScrollTopRef = useRef(false);
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
          markPageTransitionComplete();
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
    (href: string, scrollToTop = false) => {
      const overlay = overlayRef.current;
      const tileElements = tileRefs.current.filter(Boolean);
      pendingScrollTopRef.current = scrollToTop;

      if (!overlay || tileElements.length === 0) {
        router.push(href, { scroll: false });
        return;
      }

      isTransitioningRef.current = true;
      window.__advertoPageTransitionComplete = false;
      pendingPathRef.current = new URL(href, window.location.origin).pathname;

      gsap.killTweensOf([overlay, tileElements]);
      gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(tileElements, { scaleY: 0, transformOrigin: "top center" });

      gsap
        .timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: () => {
            router.push(href, { scroll: false });
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

    if (reduceMotion) {
      markPageTransitionComplete();
      return;
    }

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

      saveHomeProjectScroll(currentUrl.pathname, nextUrl.pathname);
      savePortfolioScroll(currentUrl.pathname, nextUrl.pathname);
      saveAboutScroll(currentUrl.pathname, nextUrl.pathname);

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      coverPage(
        `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`,
        !shouldPreserveScrollForPath(nextUrl.pathname),
      );
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [coverPage]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      markPageTransitionComplete();
      return;
    }

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(tileRefs.current.filter(Boolean), { scaleY: 0 });
      markPageTransitionComplete();
      return;
    }

    if (pendingScrollTopRef.current || isPortfolioDetailPath(pathname)) {
      scrollToPosition();
      pendingScrollTopRef.current = false;
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
