"use client";

import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import { clientLogos } from "../../data/logos";

export default function ClientLogo() {
  return (
    <section className="relative z-10 bg-[#050505] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden border-t border-white/5">
      


      <Container className="relative z-10">
        <Reveal>
          {/* --- SECTION HEADER --- */}
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-16 lg:mb-24">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#0000FF] uppercase text-[11px] md:text-[13px] lg:text-[14px] tracking-[0.15em] mb-3 md:mb-4 flex items-center gap-3 justify-center"
            >
              <span className="w-[20px] md:w-[30px] h-[1px] bg-[#0000FF]"></span>
              OUR CLIENTS
              <span className="w-[20px] md:w-[30px] h-[1px] bg-[#0000FF]"></span>
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(32px,9vw,40px)] md:text-[clamp(46px,5.6vw,54px)] lg:text-[60px] font-medium leading-[1.1] text-[#EDEDED]"
            >
              Brands We Helped Grow
            </motion.h2>
          </div>

          {/* --- LOGOS GRID --- */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-14 lg:gap-y-16 items-center justify-items-center">
            {clientLogos.map((logo, index) => {
              const Icon = logo.icon;
              return (
                <motion.div
                  key={logo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                  className="group flex items-center justify-center w-full h-full p-2 sm:p-3 md:p-4 transition-transform duration-300 hover:scale-110"
                >
                  {/* Rendering the logo icon with a size prop. 
                      You can adjust the size depending on your base image resolutions */}
                  <Icon 
                    size={100} 
                    className="max-w-[88px] max-h-[56px] sm:max-w-[104px] sm:max-h-[68px] md:max-w-[112px] md:max-h-[74px] lg:max-w-[120px] lg:max-h-[80px] w-auto h-auto object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" 
                  />
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
