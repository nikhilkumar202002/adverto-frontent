"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../components/common/Container";
import InnerBannerHeading from "../components/common/InnerBannerHeading";
import usePageTransitionReady from "../components/common/usePageTransitionReady";
import ServiceVideoShowcase from "../service/ServiceVideoShowcase";

type PortfolioProject = {
  slug: string;
  title: string;
  heroImage: string;
};

type PortfolioPageContentProps = {
  projects: PortfolioProject[];
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionRevealViewport = {
  once: false,
  amount: 0.2,
};

const fadeFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

const gridCardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.48,
      ease: smoothEase,
    },
  },
};

const portfolioScrollKey = "adverto:portfolio-scroll-y";
const portfolioRestoreKey = "adverto:portfolio-restore-on-return";
const scrollToPosition = (top: number) => {
  window.dispatchEvent(new CustomEvent("adverto:scroll-to", { detail: { top } }));
};
const setScrollCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=1800; SameSite=Lax`;
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

export default function PortfolioPageContent({
  projects,
}: PortfolioPageContentProps) {
  const pathname = usePathname();
  const motionReady = usePageTransitionReady(true);
  const savePortfolioScroll = useCallback(() => {
    const scrollY = String(window.scrollY);

    sessionStorage.setItem(portfolioScrollKey, scrollY);
    sessionStorage.setItem(portfolioRestoreKey, "true");
    setScrollCookie(portfolioScrollKey, scrollY);
    setScrollCookie(portfolioRestoreKey, "true");
  }, []);

  useEffect(() => {
    if (pathname !== "/portfolio") return;

    const shouldRestore =
      getCookie(portfolioRestoreKey) === "true" ||
      sessionStorage.getItem(portfolioRestoreKey) === "true";
    const storedScrollY =
      getCookie(portfolioScrollKey) ?? sessionStorage.getItem(portfolioScrollKey);

    if (!motionReady || !shouldRestore || !storedScrollY) return;

    const scrollY = Number(storedScrollY);
    if (!Number.isFinite(scrollY)) return;

    sessionStorage.removeItem(portfolioRestoreKey);
    sessionStorage.removeItem(portfolioScrollKey);
    deleteCookie(portfolioRestoreKey);
    deleteCookie(portfolioScrollKey);

    let frameId = 0;
    let settleTimers: number[] = [];

    frameId = window.requestAnimationFrame(() => {
      scrollToPosition(scrollY);

      settleTimers = [180, 420, 700].map((delay) =>
        window.setTimeout(() => scrollToPosition(scrollY), delay),
      );
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      settleTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [motionReady, pathname]);

  return (
    <section className="relative bg-[#050505] pb-[25px] pt-32 md:pb-32 md:pt-40">
      <Container>
        <div className="mb-20 md:mb-28">
          <ServiceVideoShowcase motionReady={motionReady} />
        </div>

        <div className="mb-[25px] grid grid-cols-1 gap-8 md:mb-14 md:grid-cols-12">
          <motion.div
            className="md:col-span-12 lg:col-span-10"
            initial="hidden"
            whileInView={motionReady ? "visible" : "hidden"}
            viewport={sectionRevealViewport}
            variants={fadeFromLeft}
          >
            <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Portfolio
            </p>
            <InnerBannerHeading
              text={"Branding &\nCreative Portfolio"}
              active={motionReady}
              revealOnScroll
              variant="custom"
              className="max-w-[720px] text-[45px] font-medium leading-[0.94] text-[#EDEDED] min-[720px]:text-[50px] min-[920px]:text-[55px] lg:max-w-[1100px] lg:text-[76px] min-[1320px]:text-[100px]"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
              <motion.div
                key={project.slug}
                initial="hidden"
                whileInView={motionReady ? "visible" : "hidden"}
                viewport={{ once: false, amount: 0.16 }}
                variants={gridCardReveal}
                transition={{ delay: 0.045 }}
                className="will-change-transform [transform:translateZ(0)]"
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  onClick={savePortfolioScroll}
                  className="group relative block overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-end gap-5 p-5 md:p-7">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0000FF] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </Link>
              </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
