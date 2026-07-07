"use client";

import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

const homeScrollKey = "adverto:home-project-scroll-y";
const homeRestoreKey = "adverto:home-project-restore-on-return";

const scrollToPosition = (top: number) => {
  window.scrollTo(0, top);
  window.dispatchEvent(new CustomEvent("adverto:scroll-to", { detail: { top } }));
};

const getCookie = (name: string) => {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
};

export default function HomeScrollRestore() {
  const pathname = usePathname();

  const restoreHomeScroll = useCallback(() => {
    if (window.location.pathname !== "/") return;

    const shouldRestore =
      getCookie(homeRestoreKey) === "true" ||
      sessionStorage.getItem(homeRestoreKey) === "true";
    const storedScrollY =
      getCookie(homeScrollKey) ?? sessionStorage.getItem(homeScrollKey);

    if (!shouldRestore || !storedScrollY) return;

    const scrollY = Number(storedScrollY);
    if (!Number.isFinite(scrollY)) return;

    sessionStorage.removeItem(homeRestoreKey);
    sessionStorage.removeItem(homeScrollKey);
    deleteCookie(homeRestoreKey);
    deleteCookie(homeScrollKey);

    scrollToPosition(scrollY);

    const frameId = window.requestAnimationFrame(() => {
      scrollToPosition(scrollY);
    });
    const settleTimers = [120, 320, 650].map((delay) =>
      window.setTimeout(() => scrollToPosition(scrollY), delay),
    );

    return () => {
      window.cancelAnimationFrame(frameId);
      settleTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
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
