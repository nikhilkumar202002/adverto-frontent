"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../components/common/Container";
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

const fadeFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 56,
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

const staggerGroup: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
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

export default function PortfolioPageContent({
  projects,
}: PortfolioPageContentProps) {
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    if (window.__advertoPageTransitionComplete) {
      setMotionReady(true);
      return;
    }

    const handleTransitionComplete = () => {
      setMotionReady(true);
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
  }, []);

  return (
    <section className="relative bg-[#050505] pb-[25px] pt-32 md:pb-32 md:pt-40">
      <Container>
        <div className="mb-20 md:mb-28">
          <ServiceVideoShowcase motionReady={motionReady} />
        </div>

        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12">
          <motion.div
            className="md:col-span-7"
            initial="hidden"
            whileInView={motionReady ? "visible" : "hidden"}
            viewport={sectionRevealViewport}
            variants={fadeFromLeft}
          >
            <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Portfolio
            </p>
            <h1 className="w-full text-[40px] font-medium leading-[0.95] text-[#EDEDED] sm:text-[48px] md:max-w-[560px] md:text-[52px] lg:max-w-[700px] lg:text-[76px] xl:text-[82px]">
              Branding & Creative Portfolio
            </h1>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView={motionReady ? "visible" : "hidden"}
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerGroup}
        >
          {projects.map((project) => (
              <motion.div
                key={project.slug}
                variants={gridCardReveal}
                className="will-change-transform [transform:translateZ(0)]"
              >
                <Link
                  href={`/portfolio/${project.slug}`}
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
        </motion.div>
      </Container>
    </section>
  );
}
