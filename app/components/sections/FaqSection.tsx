"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Plus, X } from "lucide-react";
import Container from "../common/Container";
import { faqData } from "../../data/faqs";

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

const headingWords = [["Common"], ["Questions"]];

function WordRevealHeading() {
  return (
    <motion.h2
      className="mb-4 text-[clamp(36px,11vw,45px)] font-medium leading-[1.08] text-[#EDEDED] md:mb-6 md:text-[clamp(48px,6vw,56px)] lg:text-[60px]"
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

export default function FaqSection() {

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      className="relative z-10 bg-[#050505] py-16 sm:py-20 md:py-24 lg:py-32 border-t border-white/5 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: smoothEase }}
    >
      <Container>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-8 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerRowVariants}
        >

          {/* --- LEFT COLUMN: Header --- */}
          <motion.div
            variants={fadeUpVariants}
            className="md:col-span-5 lg:col-span-5"
          >
            <p className="text-[#0000FF] uppercase text-[12px] md:text-[13px] lg:text-[14px] tracking-[0.12em] mb-1 flex items-center gap-2">
              <span className="w-[30px] h-[1px] bg-[#0000FF]"></span>FAQ
            </p>
            <WordRevealHeading />
            <p className="text-white/50 text-[15px] md:text-[16px] lg:text-[17px] leading-[1.5]">
              Not finding what you need? Reach out directly <br className="hidden md:block" />
              at <a href="mailto:connectadvertoads@gmail.com" className="break-words text-white hover:text-[#0000FF] transition-colors">connectadvertoads@gmail.com</a>
            </p>
          </motion.div>

          {/* --- RIGHT COLUMN: Accordion --- */}
          <motion.div
            variants={fadeUpVariants}
            className="md:col-span-7 lg:col-span-7 border-t border-white/10"
          >
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.id}
                  className={`border-b transition-colors duration-300 ${
                    isOpen ? "border-[#0000FF]" : "border-white/10"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between py-5 md:py-6 lg:py-8 text-left group"
                  >
                    <h3 className="text-[17px] md:text-lg lg:text-xl font-medium leading-[1.25] text-[#EDEDED] group-hover:text-[#0000FF] transition-colors pr-5 md:pr-8">
                      {faq.question}
                    </h3>

                    {/* The Icon Toggle */}
                    <div className="shrink-0 relative flex items-center justify-center w-6 h-6">
                      <AnimatePresence mode="wait">
                        {isOpen ? (
                          <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ borderRadius: "9999px" }}
                            className="w-6 h-6 !rounded-full bg-[#0000FF] flex items-center justify-center"
                          >
                            <X size={14} className="text-white" strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ borderRadius: "9999px" }}
                            className="w-6 h-6 !rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover:border-[#0000FF]"
                          >
                            <Plus size={14} className="text-white/70 group-hover:text-[#0000FF]" strokeWidth={2} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 md:pb-8 text-white/50 text-[14px] md:text-[15px] leading-[1.6] max-w-full md:max-w-[92%]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

        </motion.div>
      </Container>
    </motion.section>
  );
}
