"use client";

import Link from "next/link";
import Reveal from "./Reveal";

interface Project {
  id: number | string;
  slug?: string;
  title: string;
  subtitle: string;
  image?: string;
}

interface InfiniteProjectSliderProps {
  projects?: Project[];
}

const dummyProjectImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='520' height='360' viewBox='0 0 520 360'%3E%3Crect width='520' height='360' fill='%231A1A1A'/%3E%3Cpath d='M0 280L150 190L260 245L390 140L520 220V360H0Z' fill='%23252525'/%3E%3Ccircle cx='405' cy='92' r='34' fill='%23323232'/%3E%3Ctext x='260' y='183' fill='%23777777' font-family='Arial, sans-serif' font-size='22' text-anchor='middle' letter-spacing='3'%3EIMAGE SOON%3C/text%3E%3C/svg%3E";

export const moreProjectsDataset: Project[] = [
  {
    id: "spices",
    title: "Spices",
    subtitle: "Branding · 2024",
    image: "/case-studies/spices/BRANDING%20SPICES-01.jpg.jpeg",
  },
  {
    id: "trinity",
    title: "Trinity",
    subtitle: "Apparel · 2023",
    image: dummyProjectImage,
  },
  {
    id: "gotour",
    title: "GoTour",
    subtitle: "Architecture · 2022",
    image: dummyProjectImage,
  },
  {
    id: "ai-startup",
    title: "AI Startup",
    subtitle: "AI Startup · 2024",
    image: dummyProjectImage,
  },
  {
    id: "jumpqi",
    title: "JumpQi",
    subtitle: "Automotive · 2023",
    image: dummyProjectImage,
  },
  {
    id: "rexora",
    title: "Rexora",
    subtitle: "Real Estate · 2022",
    image: dummyProjectImage,
  },
];

export default function InfiniteProjectSlider({
  projects = moreProjectsDataset,
}: InfiniteProjectSliderProps) {
  const sliderProjects = projects.length > 0 ? projects : moreProjectsDataset;

  return (
    <div className="w-full overflow-hidden">
      <Reveal>
      <div className="flex items-center justify-between mb-4 max-xl:px-[60px] max-lg:px-[40px] max-md:px-[24px]">
        <p className="text-[#0000FF] uppercase text-[14px] tracking-[0.1em] flex items-center gap-3">
          <span className="w-[30px] h-[1px] bg-[#0000FF]" />
          MORE PROJECTS
        </p>
        <p className="text-xs text-white/40 tracking-widest uppercase">
          Hover to pause
        </p>
      </div>

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

      <div className="animate-image-marquee flex w-max items-center">
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex shrink-0 items-center">
            {sliderProjects.map((project, index) => (
              <Link
                href={`/portfolio/${project.slug || project.id}`}
                key={`${setIndex}-${project.id}-${index}`} 
                className="group relative w-[260px] h-[180px] mx-2 overflow-hidden bg-[#1A1A1A] cursor-pointer border border-transparent transition-colors duration-300 hover:border-b-2 hover:border-b-[#0000FF]"
              >
                <div className="absolute inset-0 bg-[#0A0A0A] z-0" />
                
                <img
                  src={project.image || dummyProjectImage}
                  alt={project.title}
                  loading="lazy"
                  className="object-cover w-full h-full relative z-0"
                />

                <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10" />
                
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
