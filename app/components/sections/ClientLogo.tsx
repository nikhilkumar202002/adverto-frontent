"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "../common/Container";
import { clientLogos } from "../../data/logos";

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

const clientLogoSequenceVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.32,
    },
  },
};

const logoGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.035,
    },
  },
};

const headingWords = ["Brands", "We", "Helped", "Grow"];

function WordRevealHeading() {
  return (
    <motion.h2
      className="text-[clamp(32px,9vw,40px)] md:text-[clamp(46px,5.6vw,54px)] lg:text-[60px] font-medium leading-[1.1] text-[#EDEDED]"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      <span className="block overflow-hidden pb-[0.08em]">
        {headingWords.map((word) => (
          <motion.span
            key={word}
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
    </motion.h2>
  );
}

export default function ClientLogo() {
  return (
    <motion.section
      className="relative z-10 bg-[#050505] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden border-t border-white/5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={clientLogoSequenceVariants}
    >
      <Container className="relative z-10">
          {/* --- SECTION HEADER --- */}
          <motion.div
            className="flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-16 lg:mb-24"
            variants={staggerRowVariants}
          >
            <motion.p 
              variants={fadeUpVariants}
              className="text-[#0000FF] uppercase text-[11px] md:text-[13px] lg:text-[14px] tracking-[0.15em] mb-3 md:mb-4 flex items-center gap-3 justify-center"
            >
              <span className="w-[20px] md:w-[30px] h-[1px] bg-[#0000FF]"></span>
              OUR CLIENTS
              <span className="w-[20px] md:w-[30px] h-[1px] bg-[#0000FF]"></span>
            </motion.p>
            <motion.div variants={fadeUpVariants}>
              <WordRevealHeading />
            </motion.div>
          </motion.div>

          {/* --- LOGOS GRID --- */}
          <motion.div
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-14 lg:gap-y-16 items-center justify-items-center"
            variants={logoGridVariants}
          >
            {clientLogos.map((logo) => {
              const Icon = logo.icon;
              return (
                <motion.div
                  key={logo.id}
                  variants={fadeUpVariants}
                  className="group flex items-center justify-center w-full h-full p-2 sm:p-3 md:p-4 transition-transform duration-300 xl:hover:scale-110"
                >
                  {/* Rendering the logo icon with a size prop. 
                      You can adjust the size depending on your base image resolutions */}
                  <Icon 
                    size={100} 
                    className="max-w-[88px] max-h-[56px] sm:max-w-[104px] sm:max-h-[68px] md:max-w-[112px] md:max-h-[74px] lg:max-w-[120px] lg:max-h-[80px] w-auto h-auto object-contain opacity-80 grayscale transition-all duration-300 xl:group-hover:opacity-100 xl:group-hover:grayscale-0" 
                  />
                </motion.div>
              );
            })}
          </motion.div>
      </Container>
    </motion.section>
  );
}
