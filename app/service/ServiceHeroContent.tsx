"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ServiceHeroContent() {
  return (
    <motion.div
      className="max-w-[980px]"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={itemVariants}
        className="mb-4 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]"
      >
        <span className="h-[1px] w-[30px] bg-[#0000FF]" />
        Creative Services
      </motion.p>

      <motion.h1
        variants={itemVariants}
        className="max-w-[980px] text-[52px] font-medium leading-[0.95] text-[#EDEDED] md:text-[100px]"
      >
        Brand, Campaign & Content Systems
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-6 max-w-[520px] text-[16px] leading-[1.45] text-white/55"
      >
        We connect strategy, design, production, and distribution into one
        creative workflow for ambitious brands.
      </motion.p>
    </motion.div>
  );
}
