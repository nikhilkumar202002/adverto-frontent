"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

export default function CaseStudiesSection() {
  return (
    <section className="relative z-10 bg-[#050505] py-24 md:py-32 overflow-hidden">
      <Container>
        {/* --- 1. SECTION HEADER --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-[50px]">
          {/* Title (Left, spans 6 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-6"
          >
            <p className="text-[#0000FF] uppercase text-[14px] tracking-[1] mb-2 flex items-center gap-2"><span className="w-[30px] h-[1px]  bg-[#0000FF] "></span>SELECTED WORK</p>
            <h2 className="text-[45px] md:text-[65px] font-medium leading-[1] text-[#EDEDED]">
              Case Studies & <br /> Campaigns
            </h2>
          </motion.div>

          {/* Description & Link (Right, starts at col 9, spans 4 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 md:col-start-9 flex flex-col items-end justify-end"
          >
            <p className="text-[#CDCDCD] text-[16px] mb-6 leading-[1.3] w-[300px] text-end">
              We build project architectures that are scalable, visually striking, and engineered for maximum conversion.
            </p>
            <Link href="/work" className="group flex items-center gap-2 text-sm text-[#EDEDED] transition-colors hover:text-[#0000FF]">
              View all works 
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* --- 2. FEATURED PROJECT 1 (NOIR) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center mb-[6px]">
          {/* Image (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden bg-white/5 h-[320px] md:h-[500px]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://cdn.dribbble.com/userupload/44948077/file/1ac8c0dd83bb22d8d20685ca89cc678e.jpg?resize=1024x767&vertical=center"
                alt="NOIR — project"
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          {/* Text (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-[320px] md:h-[500px] justify-center p-6 md:p-12 bg-[#080808] border border-[#252525]"
          >
            <p className="text-[#0000FF] uppercase tracking-[0.15em] text-xs mb-3">Luxury Fashion</p>
            <h3 className="text-3xl md:text-4xl font-medium text-[#EDEDED] mb-4">NOIR — Identity System</h3>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">
              A bespoke visual identity designed for an emerging luxury fashion label.
              We focused on typography, robust photography direction, and a sleek monochromatic UI system.
            </p>
            <Link href="/work/noir" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white border-b border-white/20 hover:border-white pb-1 w-max transition-all">
              View Case Study <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* --- 3. FEATURED PROJECT 2 (APEX) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center mb-[6px]">
          {/* Image (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden bg-white/5 h-[320px] md:h-[500px]"
          >
            <div className="absolute inset-0 overflow-hidden">
               <img
                src="https://cdn.dribbble.com/userupload/46853171/file/81b0e4b8cb5f6afa0901ca006ff4fda1.jpg?resize=1024x576&vertical=center"
                alt="NOIR — project"
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          {/* Text (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-[320px] md:h-[500px] justify-center p-6 md:p-12 bg-[#080808] border border-[#252525]"
          >
            <p className="text-[#0000FF] uppercase tracking-[0.15em] text-xs mb-3">Technology</p>
            <h3 className="text-3xl md:text-4xl font-medium text-[#EDEDED] mb-4">APEX — Product Launch Campaign</h3>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">
              A comprehensive launch campaign spanning web, social, and digital OOH.
            </p>
            <Link href="/work/apex" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white border-b border-white/20 hover:border-white pb-1 w-max transition-all">
              View Case Study <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* --- 4. COLLAGE GRID (3 Columns) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[6px]">
          {/* Col 1 */}
          <div className="flex flex-col gap-[6px]">
             <div className="w-full aspect-square bg-[#1A1A1A] " />
             <div className="w-full aspect-[4/3] bg-[#1A1A1A] " />
          </div>
          {/* Col 2 (Hero image in center) */}
          <div className="w-full h-full min-h-[400px] bg-[#1A1A1A] " />
          {/* Col 3 */}
          <div className="flex flex-col gap-[6px]">
             <div className="w-full aspect-[4/3] bg-[#1A1A1A] " />
             <div className="w-full aspect-square bg-[#1A1A1A] " />
          </div>
        </div>

        {/* --- 5. BOTTOM CAROUSEL/SLIDER --- */}
        <div className="w-full border-t border-white/10 pt-12">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[#0000FF] uppercase tracking-[0.2em] text-xs">— MORE PROJECTS</p>
            <p className="text-xs text-white/40 tracking-widest">DRAG TO EXPLORE</p>
          </div>
          
          {/* Simple scrollable row for small screens */}
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x hide-scrollbar">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="shrink-0 w-[280px] group cursor-pointer snap-start">
                <div className="w-full aspect-[16/9] bg-[#1A1A1A] rounded-sm mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-sm font-medium text-white group-hover:text-[#0000FF] transition-colors">Project Name {item}</h4>
                <p className="text-xs text-white/40 mt-1">Branding, Web</p>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}