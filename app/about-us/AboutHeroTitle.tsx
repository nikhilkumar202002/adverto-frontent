"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import usePageTransitionReady from "../components/common/usePageTransitionReady";

const titleReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutHeroTitle() {
  const isReady = usePageTransitionReady(true);

  return (
    <motion.div
      className="max-w-[760px]"
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
      variants={titleReveal}
    >
      <h1 className="text-[58px] font-medium leading-[0.95] tracking-[-0.03em] text-[#F5F5F5] sm:text-[72px] md:text-[96px] lg:text-[120px]">
        Meet Adverto
      </h1>
    </motion.div>
  );
}
