import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../components/common/Container";
import { portfolioPageProjects } from "../data/portfolio";

export default function PortfolioPage() {
  return (
    <section className="relative bg-[#050505] pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Portfolio
            </p>
            <h1 className="text-[52px] font-medium leading-[0.95] text-[#EDEDED] md:text-[88px]">
              Selected Project Pages
            </h1>
          </div>
          <div className="flex items-end md:col-span-4 md:col-start-9">
            <p className="max-w-[360px] text-[16px] leading-[1.45] text-white/55">
              Each project has a focused inner page with a hero image, project
              context, services, and a visual gallery.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[6px] md:grid-cols-2 lg:grid-cols-3">
          {portfolioPageProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className={`group relative overflow-hidden border border-white/10 bg-[#0A0A0A] ${
                index === 0 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-5 p-5 md:p-7">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#0000FF]">
                    {project.subtitle}
                  </p>
                  <h2 className="text-2xl font-medium text-white md:text-3xl">
                    {project.title}
                  </h2>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0000FF] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
