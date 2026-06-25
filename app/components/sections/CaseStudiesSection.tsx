"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "../common/Container";
import InfiniteProjectSlider from "../common/InfiniteProjectSlider";
import Reveal from "../common/Reveal";
import { moreProjects } from "../../data/moreProjects";
import { caseStudyCollageProjects } from "../../data/portfolio";
import { featuredPortfolioTiles } from "../../data/featuredportfolio";

type FeaturedPortfolioProject = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
};

type RotatingPortfolioTileProps = {
  projects: FeaturedPortfolioProject[];
  intervalMs: number;
  className: string;
};

function RotatingPortfolioTile({
  projects,
  intervalMs,
  className,
}: RotatingPortfolioTileProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    if (projects.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % projects.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, projects.length]);

  if (!activeProject) return null;

  return (
    <div className={`group relative w-full overflow-hidden rounded-[20px] border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF] [perspective:1200px] ${className}`}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={activeProject.image}
          src={activeProject.image}
          alt={activeProject.alt}
          loading="lazy"
          initial={{ opacity: 0, rotateY: -82, scale: 0.98 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 82, scale: 0.98 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 object-cover w-full h-full rounded-[20px] origin-left [backface-visibility:hidden] [transform-style:preserve-3d]"
        />
      </AnimatePresence>
    </div>
  );
}

export default function CaseStudiesSection() {
  const centerProject = caseStudyCollageProjects[2];

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
            className="md:col-span-4 md:col-start-9 flex flex-col items-start justify-end md:items-end"
          >
        
            <Link href="/portfolio" className="group flex items-center gap-2 text-sm text-[#EDEDED] transition-colors hover:text-[#0000FF]">
              View all works 
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* --- 2. FEATURED PROJECT 1 (NOIR) --- */}
        <Reveal>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group grid grid-cols-1 md:grid-cols-2 items-center mb-[20px] overflow-hidden rounded-[20px] border border-[#252525] bg-[#080808]"
          >
            <div className="relative overflow-hidden rounded-[20px] bg-white/5 h-[320px] md:h-[500px]">
              <div className="absolute inset-0 overflow-hidden rounded-[20px]">
                <img
                  src="https://cdn.dribbble.com/userupload/44948077/file/1ac8c0dd83bb22d8d20685ca89cc678e.jpg?resize=1024x767&vertical=center"
                  alt="NOIR — project"
                  loading="lazy"
                  className="object-cover w-full h-full rounded-[20px] transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 rounded-[20px] bg-black/20" />
            </div>

            <div className="flex flex-col h-[320px] md:h-[500px] justify-center p-6 md:p-12">
              <p className="text-[#0000FF] uppercase tracking-[0.15em] text-xs mb-3">Luxury Fashion</p>
              <h3 className="text-3xl md:text-4xl font-medium text-[#EDEDED] mb-4">NOIR — Identity System</h3>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                A bespoke visual identity designed for an emerging luxury fashion label.
                We focused on typography, robust photography direction, and a sleek monochromatic UI system.
              </p>
              <Link href="/portfolio/spices" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white border-b border-white/20 hover:border-white pb-1 w-max transition-all">
                View Case Study <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </Reveal>

        {/* --- 3. COLLAGE GRID (3 Columns) --- */}
        <Reveal>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
          {/* Col 1 */}
          <div className="flex flex-col gap-[20px]">
             <RotatingPortfolioTile
               projects={featuredPortfolioTiles.leftTop.projects}
               intervalMs={featuredPortfolioTiles.leftTop.intervalMs}
               className="aspect-square"
             />
             <RotatingPortfolioTile
               projects={featuredPortfolioTiles.leftBottom.projects}
               intervalMs={featuredPortfolioTiles.leftBottom.intervalMs}
               className="aspect-[4/3]"
             />
          </div>
          {/* Col 2 (Hero image in center) */}
          <div className="group relative min-h-[400px] h-full w-full overflow-hidden rounded-[20px] border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF]">
            <video
              src="/videos/center-video.mp4"
              aria-label={centerProject.alt}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="object-cover w-full h-full rounded-[20px]"
            />
          </div>
          {/* Col 3 */}
          <div className="flex flex-col gap-[20px]">
             <RotatingPortfolioTile
               projects={featuredPortfolioTiles.rightTop.projects}
               intervalMs={featuredPortfolioTiles.rightTop.intervalMs}
               className="aspect-[4/3]"
             />
             <RotatingPortfolioTile
               projects={featuredPortfolioTiles.rightBottom.projects}
               intervalMs={featuredPortfolioTiles.rightBottom.intervalMs}
               className="aspect-square"
             />
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
