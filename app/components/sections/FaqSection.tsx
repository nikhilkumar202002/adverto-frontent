"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import { faqData } from "../../data/faqs";

export default function FaqSection() {

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 bg-[#050505] py-24 md:py-32 border-t border-white/5 overflow-hidden">
      <Container>
        <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* --- LEFT COLUMN: Header --- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 sticky"
          >
            <p className="text-[#0000FF] uppercase text-[14px] tracking-[1] mb-1 flex items-center gap-2">
              <span className="w-[30px] h-[1px] bg-[#0000FF]"></span>FAQ
            </p>
            <h2 className="text-[45px] md:text-[60px] font-medium leading-[1] text-[#EDEDED] mb-6">
              Common <br /> Questions
            </h2>
            <p className="text-white/50 text-[17px]">
              Not finding what you need? Reach out directly <br className="hidden md:block" />
              at <a href="mailto:hello@adverto.co" className="text-white hover:text-[#0000FF] transition-colors">hello@adverto.co</a>
            </p>
          </motion.div>

          {/* --- RIGHT COLUMN: Accordion --- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 border-t border-white/10"
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
                    className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
                  >
                    <h3 className="text-lg md:text-xl font-medium text-[#EDEDED] group-hover:text-[#0000FF] transition-colors pr-8">
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
                            className="w-6 h-6 bg-[#0000FF] rotate-45 flex items-center justify-center"
                          >
                            <X size={14} className="text-white -rotate-45" strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-6 h-6 border border-white/20 flex items-center justify-center transition-colors group-hover:border-[#0000FF]"
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
                        <p className="pb-8 text-white/50 text-[15px] leading-[1.6] max-w-[90%]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

        </div>
        </Reveal>
      </Container>
    </section>
  );
}