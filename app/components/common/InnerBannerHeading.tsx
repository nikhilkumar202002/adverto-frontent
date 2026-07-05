"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import usePageTransitionReady from "./usePageTransitionReady";

type InnerBannerHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  active?: boolean;
  className?: string;
  highlightPrefix?: string;
  variant?: "banner" | "custom";
  waitForPageTransition?: boolean;
};

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.16,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
    scale: 0.94,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.18,
      ease: easeOut,
    },
  },
};

export default function InnerBannerHeading({
  text,
  as = "h1",
  active = true,
  className = "",
  highlightPrefix,
  variant = "banner",
  waitForPageTransition = true,
}: InnerBannerHeadingProps) {
  const isReady = usePageTransitionReady(waitForPageTransition);
  const words = text.split(" ").filter(Boolean);
  const allWords = highlightPrefix ? [highlightPrefix, ...words] : words;
  const label = allWords.join(" ");
  const MotionHeading =
    as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : motion.h1;
  const variantClassName =
    variant === "banner"
      ? "w-full text-[55px] font-medium leading-[1.04] text-[#EDEDED] min-[1320px]:text-[100px]"
      : "";

  return (
    <MotionHeading
      className={`${variantClassName} ${className}`}
      aria-label={label}
      initial="hidden"
      animate={active && isReady ? "visible" : "hidden"}
      variants={headingVariants}
    >
      {allWords.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom pb-[0.12em]"
          aria-hidden="true"
        >
          <motion.span
            className={`inline-block origin-bottom will-change-transform ${
              highlightPrefix && index === 0 ? "text-[#0000FF]" : ""
            }`}
            variants={wordVariants}
          >
            {word}
          </motion.span>
          {index < allWords.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </MotionHeading>
  );
}
