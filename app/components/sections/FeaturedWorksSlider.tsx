import Image from "next/image";
import Link from "next/link";
import { portfolioPageProjects } from "../../data/portfolio";
import Reveal from "../common/Reveal";

type PortfolioProject = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  heroImage: string;
};

const projects = portfolioPageProjects as PortfolioProject[];

const featuredProjects = [...projects].sort((a, b) => {
  const aScore = a.slug.charCodeAt(0) + a.title.length * 7;
  const bScore = b.slug.charCodeAt(0) + b.title.length * 7;

  return aScore - bScore;
});

export default function FeaturedWorksSlider() {
  return (
    <section className="relative z-10 overflow-hidden bg-[#030303] py-24 text-white">
      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6 px-[80px] max-xl:px-[60px] max-lg:px-[40px] max-md:px-[24px]">
          <div>
            <h2 className="max-w-[720px] text-[42px] font-medium leading-[0.95] tracking-[-0.03em] text-[#F5F5F5] md:text-[72px]">
              Selected projects in motion.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden border-b border-white/25 pb-1 text-[13px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white hover:text-white md:inline-flex"
          >
            View all work
          </Link>
        </div>
      </Reveal>

      <style>{`
        @keyframes featured-work-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .featured-work-track {
          animation: featured-work-marquee 48s linear infinite;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .featured-work-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .featured-work-track {
            animation: none;
          }
        }
      `}</style>

      <Reveal>
        <div className="w-full overflow-hidden">
          <div className="featured-work-track flex w-max items-stretch">
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex shrink-0 items-stretch">
                {featuredProjects.map((project, index) => (
                  <Link
                    key={`${setIndex}-${project.slug}-${index}`}
                    href={`/portfolio/${project.slug}`}
                    className="group relative mx-2 h-[360px] w-[280px] shrink-0 overflow-hidden border border-white/10 bg-[#0A0A0A] transition-colors duration-300 hover:border-[#0000FF]/70 md:h-[460px] md:w-[380px]"
                  >
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 280px, 380px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-90" />
                    <div className="absolute left-5 right-5 bottom-5 translate-y-3 opacity-95 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="mb-3 w-max bg-[#0000FF] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(0,0,255,0.45)]">
                        {project.category}
                      </p>
                      <h3 className="w-max max-w-full bg-white px-3 py-2 text-[26px] font-medium leading-none tracking-[-0.02em] text-black transition-colors duration-300 group-hover:bg-[#0000FF] group-hover:text-white md:text-[34px]">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-[14px] font-medium text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                        {project.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
