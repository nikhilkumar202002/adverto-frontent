"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "../common/Container";
import InfiniteProjectSlider from "../common/InfiniteProjectSlider";
import Reveal from "../common/Reveal";
import { moreProjects } from "../../data/moreProjects";
import { caseStudyCollageProjects } from "../../data/portfolio";

export default function CaseStudiesSection() {
  const [
    leftTopProject,
    leftBottomProject,
    centerProject,
    rightTopProject,
    rightBottomProject,
  ] = caseStudyCollageProjects;

  return (
    <section className="relative z-10 bg-[#050505] py-24 md:py-32 overflow-hidden">
      <Container>
        <Reveal>
        {/* --- 1. SECTION HEADER --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-[50px]">
          {/* Title (Left, spans 6 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-6"
          >
            <p className="text-[#0000FF] uppercase text-[14px] tracking-[1] mb-2 flex items-center gap-2">
              <span className="w-[30px] h-[1px] bg-[#0000FF]"></span>SELECTED WORK
            </p>
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
            <Link href="/portfolio" className="group flex items-center gap-2 text-sm text-[#EDEDED] transition-colors hover:text-[#0000FF]">
              View all works 
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* --- 2. FEATURED PROJECT 1 (NOIR) --- */}
        <Reveal>
        <div className="hidden grid-cols-1 md:grid-cols-2 gap-0 items-center mb-[6px]">
          {/* Image (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden bg-white/5 h-[320px] md:h-[500px] border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF]"
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
              <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none" />
              <div className="absolute left-0 right-0 bottom-0 p-6 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 pointer-events-none">
                <h4 className="text-2xl font-medium text-white">NOIR — Identity System</h4>
                <p className="text-sm text-[#0000FF] mt-2">Luxury Fashion</p>
              </div>
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
            <Link href="/portfolio/spices" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white border-b border-white/20 hover:border-white pb-1 w-max transition-all">
              View Case Study <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
        </Reveal>

        {/* --- 3. FEATURED PROJECT 2 (APEX) --- */}
        <div className="hidden grid-cols-1 md:grid-cols-2 gap-0 items-center mb-[6px]">
          {/* Image (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden bg-white/5 h-[320px] md:h-[500px] border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF]"
          >
            <div className="absolute inset-0 overflow-hidden">
               <img
                src="https://cdn.dribbble.com/userupload/46853171/file/81b0e4b8cb5f6afa0901ca006ff4fda1.jpg?resize=1024x576&vertical=center"
                alt="APEX — project"
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none" />
              <div className="absolute left-0 right-0 bottom-0 p-6 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 pointer-events-none">
                <h4 className="text-2xl font-medium text-white">APEX — Product Launch Campaign</h4>
                <p className="text-sm text-[#0000FF] mt-2">Technology</p>
              </div>
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
            <Link href="/portfolio/spices" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white border-b border-white/20 hover:border-white pb-1 w-max transition-all">
              View Case Study <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* --- 4. COLLAGE GRID (3 Columns) --- */}
        <Reveal>
        <div className="grid grid-cols-1 gap-[6px] md:grid-cols-3">
          {/* Col 1 */}
          <div className="flex flex-col gap-[6px]">
             <div className="group relative aspect-square w-full overflow-hidden border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF]">
               <img
                 src={leftTopProject.image}
                 alt={leftTopProject.alt}
                 loading="lazy"
                 className="object-cover w-full h-full"
               />
               <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
               <div className="absolute left-0 right-0 bottom-0 p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                 <h5 className="text-sm font-medium text-white">{leftTopProject.title}</h5>
                 <p className="text-xs text-white/60 mt-1">{leftTopProject.subtitle}</p>
               </div>
             </div>
             <div className="group relative aspect-[4/3] w-full overflow-hidden border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF]">
               <img
                 src={leftBottomProject.image}
                 alt={leftBottomProject.alt}
                 loading="lazy"
                 className="object-cover w-full h-full"
               />
               <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
               <div className="absolute left-0 right-0 bottom-0 p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                 <h5 className="text-sm font-medium text-white">{leftBottomProject.title}</h5>
                 <p className="text-xs text-white/60 mt-1">{leftBottomProject.subtitle}</p>
               </div>
             </div>
          </div>
          {/* Col 2 (Hero image in center) */}
          <div className="group relative min-h-[400px] h-full w-full overflow-hidden border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF]">
            <img
              src={centerProject.image}
              loading="lazy"
              alt={centerProject.alt}
              className="object-cover w-full h-full"
            />
            <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
            <div className="absolute left-0 right-0 bottom-0 p-6 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
              <h4 className="text-3xl font-medium text-white">{centerProject.title}</h4>
              <p className="text-sm text-[#0000FF] mt-2">{centerProject.subtitle}</p>
            </div>
          </div>
          {/* Col 3 */}
          <div className="flex flex-col gap-[6px]">
             <div className="group relative aspect-[4/3] w-full overflow-hidden border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF]">
               <img
                 src={rightTopProject.image}
                 alt={rightTopProject.alt}
                 loading="lazy"
                 className="object-cover w-full h-full"
               />
               <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
               <div className="absolute left-0 right-0 bottom-0 p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                 <h5 className="text-sm font-medium text-white">{rightTopProject.title}</h5>
                 <p className="text-xs text-white/60 mt-1">{rightTopProject.subtitle}</p>
               </div>
             </div>
             <div className="group relative aspect-square w-full overflow-hidden border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF]">
               <img
                 src={rightBottomProject.image}
                 loading="lazy"
                 alt={rightBottomProject.alt}
                 className="object-cover w-full h-full"
               />
               <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
               <div className="absolute left-0 right-0 bottom-0 p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                 <h5 className="text-sm font-medium text-white">{rightBottomProject.title}</h5>
                 <p className="text-xs text-white/60 mt-1">{rightBottomProject.subtitle}</p>
               </div>
             </div>
          </div>
        </div>
        </Reveal>

         <div className="mt-12 md:mt-24">
        <InfiniteProjectSlider projects={moreProjects} />
      </div>
        </Reveal>
      </Container>

     
    </section>
  );
}
