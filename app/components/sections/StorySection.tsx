"use client";

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "../common/Container";
import { useEffect, useRef, useState } from "react";
// import InfiniteLogoSlider from "../common/InfiniteLogoSlider";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: smoothEase },
  },
};

const staggerRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const headingWords = [["Two", "friends."], ["One", "shared", "vision."]];

function WordRevealHeading() {
  return (
    <motion.h2
      className="mb-4 text-[clamp(36px,11vw,45px)] font-medium leading-[1.08] tracking-tight text-[#EDEDED] md:text-[clamp(50px,6.5vw,60px)] lg:text-[70px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.7 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {headingWords.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden pb-[0.08em]">
          {line.map((word) => (
            <motion.span
              key={`${lineIndex}-${word}`}
              className="mr-[0.18em] inline-block"
              variants={{
                hidden: { opacity: 0, y: "100%" },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: smoothEase },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}

function useCount(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let rafId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return value;
}

export default function StorySection() {
  const stats = [
    { value: "120+", label: "Campaigns Delivered" },
    { value: "40+", label: "Brand Launches" },
    { value: "3+", label: "Years Experience" },
    { value: "96%", label: "Client Retention" },
  ];
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const parsedStats = stats.map((stat) => {
    const match = stat.value.match(/(\d+)/);
    const num = match ? Number(match[1]) : 0;
    const suffix = stat.value.replace(/\d+/g, "");

    return { num, suffix, label: stat.label };
  });
  const count0 = useCount(parsedStats[0].num, inView);
  const count1 = useCount(parsedStats[1].num, inView);
  const count2 = useCount(parsedStats[2].num, inView);
  const count3 = useCount(parsedStats[3].num, inView);
  const counts = [count0, count1, count2, count3];

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 bg-[#050505] border-t border-white/5 py-16 sm:py-20 md:py-24 lg:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: smoothEase }}
    >
      <Container>
        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerRowVariants}
        >
          
          {/* --- LEFT COLUMN: Header & Story --- */}
          <motion.div 
            variants={fadeUpVariants}
            className="md:col-span-6 flex flex-col justify-start"
          >
            <p className="text-[#0000FF] uppercase text-[12px] md:text-[13px] lg:text-[14px] tracking-[0.12em] mb-2 flex items-center gap-2">
              <span className="w-[30px] h-[1px] bg-[#0000FF]"></span>OUR STORY
            </p>
            
            <WordRevealHeading />
            
            <p className="text-[#888888] text-[15px] md:text-[16px] leading-[1.5] max-w-[500px]">
              Founded in 2023, Adverto was built around one belief: that extraordinary creative work changes business outcomes. We combine strategic intelligence with bold visual thinking to create brands that lead categories.
            </p>
          </motion.div>

          {/* --- RIGHT COLUMN: Quote & Stats --- */}
          <motion.div 
            variants={fadeUpVariants}
            className="md:col-span-6 lg:col-span-5 lg:col-start-8 flex flex-col justify-center"
          >
            <h3 className="text-[18px] md:text-[19px] lg:text-[20px] font-medium text-white mb-1 leading-snug">
              &ldquo;Built on Trust. Proven Through Results.&rdquo;
            </h3>
            
            <p className="text-[#888888] text-[15px] md:text-[16px] lg:text-[17px] leading-[1.5] mb-6">
              Behind every number is a project delivered, a challenge solved, and a relationship built on trust.
            </p>

            {/* Blue Divider */}
            <div className="w-12 h-[2px] bg-[#0000FF] mb-7 md:mb-8 lg:mb-10" />

            {/* Stats - start counting when this section is revealed */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {parsedStats.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="bg-[#0000FF] border border-[#0000FF] rounded-[12px] md:rounded-[15px] p-4 sm:p-5 md:p-6 lg:p-8 flex min-h-[116px] flex-col justify-center transition-colors duration-300 hover:bg-[#0000D6] hover:border-[#0000D6]"
                >
                  <h4 className="text-white text-2xl sm:text-3xl md:text-[34px] lg:text-4xl font-medium mb-1">
                    {counts[i]}{p.suffix}
                  </h4>
                  <p className="text-white text-[12px] md:text-[13px] leading-[1.25] tracking-wide">
                    {p.label}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </motion.div>

        {/* --- INFINITE LOGO SLIDER --- */}
        {/* <div className="mt-20">
          <InfiniteLogoSlider />
        </div> */}
      </Container>
    </motion.section>
  );
}
