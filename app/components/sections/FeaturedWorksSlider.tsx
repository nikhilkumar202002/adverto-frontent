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
                    className="group relative mx-2 h-[360px] w-[280px] shrink-0 overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] transition-colors duration-300 hover:border-[#0000FF]/70 md:h-[460px] md:w-[380px]"
                  >
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 280px, 380px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute left-5 right-5 bottom-5 translate-y-3 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <h3 className="text-[25px] font-medium leading-none tracking-[-0.02em] text-white">
                        {project.title}
                      </h3>
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
