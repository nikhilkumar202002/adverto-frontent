"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { moreProjects } from "../../data/moreProjects";

interface Project {
  id: number | string;
  slug?: string;
  title: string;
  subtitle: string;
  image: string;
}

interface InfiniteProjectSliderProps {
  projects?: Project[];
}

export const moreProjectsDataset = moreProjects as Project[];

export default function InfiniteProjectSlider({
  projects = moreProjectsDataset,
}: InfiniteProjectSliderProps) {
  const sliderProjects = projects.length > 0 ? projects : moreProjectsDataset;

  return (
    <div className="project-marquee w-full overflow-hidden">
      <Reveal>
        <div className="flex items-center justify-between mb-4 max-xl:px-[60px] max-lg:px-[40px] max-md:px-[24px]">
          <p className="text-[#0000FF] uppercase text-[14px] tracking-[0.1em] flex items-center gap-3">
            <span className="w-[30px] h-[1px] bg-[#0000FF]" />
            MORE PROJECTS
          </p>
        </div>

        <style>{`
          @keyframes image-marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }

          .project-marquee__track {
            animation: image-marquee 35s linear infinite;
            backface-visibility: hidden;
            contain: layout paint;
            transform: translate3d(0, 0, 0);
            will-change: transform;
          }

          .project-marquee__card {
            backface-visibility: hidden;
            border-bottom-color: transparent;
            transform: translateZ(0);
          }

          .project-marquee__card:hover {
            border-bottom-color: #0000FF;
          }

          .project-marquee__hover-layer {
            will-change: opacity, transform;
          }

          @media (prefers-reduced-motion: reduce) {
            .project-marquee__track {
              animation: none;
            }
          }
        `}</style>

        <div className="project-marquee__track flex w-max items-center">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0 items-center">
              {sliderProjects.map((project, index) => (
                <Link
                  href={`/portfolio/${project.slug || project.id}`}
                  key={`${setIndex}-${project.id}-${index}`}
                  data-cursor-ignore="true"
                  className="project-marquee__card group relative mx-2 h-[180px] w-[260px] overflow-hidden rounded-[25px] border border-b-2 border-transparent bg-[#1A1A1A] transition-colors duration-300 ease-out"
                >
                  <div className="absolute inset-0 bg-[#0A0A0A] z-0" />

                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="relative z-0 h-full w-full object-cover"
                  />

                  <div className="project-marquee__hover-layer pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-1/2 translate-y-full bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100" />

                  <div className="absolute left-4 bottom-4 z-20">
                    <h4 className="text-[15px] text-white font-medium tracking-wide">
                      {project.title}
                    </h4>
                    <p className="text-[13px] text-white/90 font-medium tracking-wide">
                      {project.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
