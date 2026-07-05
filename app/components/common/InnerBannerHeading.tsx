"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type InnerBannerHeadingProps = {
  text: string;
  active?: boolean;
  className?: string;
  highlightPrefix?: string;
};

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
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
      duration: 0.9,
      ease: easeOut,
    },
  },
};

export default function InnerBannerHeading({
  text,
  active = true,
  className = "",
  highlightPrefix,
}: InnerBannerHeadingProps) {
  const words = text.split(" ").filter(Boolean);
  const allWords = highlightPrefix ? [highlightPrefix, ...words] : words;
  const label = allWords.join(" ");

  return (
    <motion.h1
      className={`w-full text-[55px] font-medium leading-[1.04] text-[#EDEDED] min-[1320px]:text-[100px] ${className}`}
      aria-label={label}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
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
    </motion.h1>
  );
}
