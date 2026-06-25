"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import { servicesData } from "../../data/services";

const serviceCardBackground = "/Banners/service-card-banner.jpg";

export default function ServicesSection() {
  return (
    <section className="relative z-10 bg-[#050505] py-24 md:py-32 overflow-hidden border-t border-white/5">
      <Container>
        <Reveal>
        {/* --- SECTION HEADER --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 md:mb-10 items-end">
          {/* Title (Left, spans 7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7"
          >
            <p className="text-[#0000FF] uppercase text-[14px] tracking-[1] mb-1 flex items-center gap-2">
              <span className="w-[30px] h-[1px] bg-[#0000FF]"></span>WHAT WE DO
            </p>
            <h2 className="text-[45px] md:text-[65px] font-medium leading-[1.1] text-[#EDEDED]">
              Creative Services
            </h2>
          </motion.div>

          {/* Description (Right, starts at col 9, spans 4 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 md:col-start-9 flex flex-col items-end justify-end"
          >
           
          </motion.div>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden flex flex-col justify-between rounded-[20px] border border-white/10 p-8 md:p-10 transition-colors duration-500 hover:border-white/25 min-h-[380px]"
              >
                <img
                  src={serviceCardBackground}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                  className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Radial Glow Drop 
                  A large, blurred circle placed slightly above the top edge.
                  Fades in and drops down slightly (translate-y) on hover.
                */}
                <div className="absolute -top-[150px] left-1/2 z-[2] w-[300px] h-[300px] -translate-x-1/2 rounded-full bg-white/20 blur-[80px] pointer-events-none opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-8" />

                {/* Content Wrapper - Keeps text above the glow (z-10) */}
                <div className="relative z-10">
                  {/* Number & Icon */}
                  <div className="flex flex-col gap-6 mb-4">
                    <span className="text-white font-medium text-lg">
                      {service.id}
                    </span>
                    <div className="w-12 h-12 flex items-center justify-center rounded-md border border-white/30 transition-colors duration-500 group-hover:border-white/70 group-hover:bg-white/10">
                      <Icon className="text-white" size={20} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-medium text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/75 text-[16px] leading-[1.4] mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Explore Link */}
                <Link 
                  href={service.link}
                  className="relative z-10 flex items-center gap-2 text-[12px] font-medium tracking-[0.1em] text-white/75 uppercase transition-colors duration-300 group-hover:text-white mt-auto w-max"
                >
                  Explore 
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
