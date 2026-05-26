"use client";

import GridLines from "../common/GridLines";
import Container from "../common/Container";
import Button from "../common/Button";
import AnimatedText from "../common/AnimatedText";
import { motion } from "framer-motion";
import { MoveDown } from "lucide-react";
import MagneticButton from "../common/MagneticButton";
import React from "react";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center justify-center"
      data-navbar-transparent
    >
      <GridLines />

      <Container className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          className="max-w-[1100px] w-full flex flex-col items-center justify-center text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="mb-4 text-sm md:text-[14px] tracking-[0.1em] text-[#0000FF] flex items-center gap-3"
          >
            <span className="w-[30px] md:w-[50px] h-[1px] md:h-[1.5px] bg-[#0000FF] inline-block" />
            Creative Agency — Est. 2016
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
            className="text-4xl sm:text-5xl md:text-[64px] lg:text-[93px] font-semibold leading-[0.9]"
          >
            <AnimatedText text={"We build brands that " } className="mr-2" />
            <AnimatedText text={<span className="text-[#0000FF] italic">dominate</span>} className="mr-2" />
            <AnimatedText text={"attention."} />
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="mt-6 max-w-[550px] text-base md:text-[20px] leading-[1.1] text-white/60 font-regular"
          >
            Branding, campaigns, video production, and social
            experiences crafted for modern businesses.
          </motion.p>

          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <MagneticButton>
              <Button>View Works</Button>
            </MagneticButton>

            <MagneticButton>
              <Button variant="secondary">Book Consultation</Button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </Container>

      <div className="absolute bottom-8 left-0 w-full flex items-center justify-center z-20">
        <button
          aria-label="Scroll to explore"
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }
          }}
        >
          <MoveDown className="long-arrow text-[#0000FF]" strokeWidth={1.6} aria-hidden />
          <span className="text-xs md:text-sm">Scroll to Explore</span>
        </button>
      </div>

      <style jsx>{`
        button[aria-label="Scroll to explore"] svg {
          animation: arrowBounce 1.6s infinite;
        }

        button[aria-label="Scroll to explore"] svg.long-arrow {
          transform-origin: center;
          transform: scaleY(1.6);
          width: 20px;
          height: 20px;
        }

        @keyframes arrowBounce {
          0% { transform: translateY(0); opacity: 0.9 }
          30% { transform: translateY(6px); opacity: 1 }
          60% { transform: translateY(0); opacity: 0.9 }
          100% { transform: translateY(0); opacity: 0.9 }
        }
      `}</style>
    </section>
  );
}
