"use client";

import React from "react";
import Image from "next/image";
import Reveal from "./Reveal";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

interface InfiniteProjectSliderProps {
  projects: Project[];
}

export default function InfiniteProjectSlider({ projects }: InfiniteProjectSliderProps) {
  return (
    <div className="w-full overflow-hidden">
      <Reveal>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 max-xl:px-[60px] max-lg:px-[40px] max-md:px-[24px]">
        <p className="text-[#0000FF] uppercase text-[14px] tracking-[0.1em] flex items-center gap-3">
          <span className="w-[30px] h-[1px] bg-[#0000FF]" />
          MORE PROJECTS
        </p>
        <p className="text-xs text-white/40 tracking-widest uppercase">
          Hover to pause
        </p>
      </div>

      {/* Marquee Animation Styles */}
      <style>{`
        @keyframes image-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-image-marquee {
          animation: image-marquee 35s linear infinite;
        }
        .animate-image-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* The scrolling track */}
      <div className="animate-image-marquee flex w-max items-center">
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex shrink-0 items-center">
            {projects.map((project, index) => (
              <div 
                key={`${setIndex}-${index}`} 
                className="group relative w-[260px] h-[180px] mx-2 overflow-hidden bg-[#1A1A1A] cursor-pointer border border-transparent transition-colors duration-300 hover:border-b-2 hover:border-b-[#0000FF]"
              >
                {/* Fallback background if image is missing */}
                <div className="absolute inset-0 bg-[#0A0A0A] z-0" />
                
                {/* External image (supports remote URLs) */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="object-cover w-full h-full relative z-0"
                />

                {/* Bottom-to-top gradient overlay that slides up on hover (also fades in) */}
                <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10" />
                
                {/* Bottom Left Text */}
                <div className="absolute left-4 bottom-4 z-20">
                  <p className="text-[13px] text-white/90 font-medium tracking-wide">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      </Reveal>
      </div>
  );
}