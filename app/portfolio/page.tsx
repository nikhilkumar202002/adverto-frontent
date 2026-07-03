import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../components/common/Container";
import { portfolioPageProjects } from "../data/portfolio";
import ServiceVideoShowcase from "../service/ServiceVideoShowcase";

export default function PortfolioPage() {
  return (
    <section className="relative bg-[#050505] pt-32 pb-[25px] md:pt-40 md:pb-32">
      <Container>
    

        <div className="mb-20 md:mb-28">
          <ServiceVideoShowcase />
        </div>

    <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Portfolio
            </p>
            <h1 className="w-full text-[40px] font-medium leading-[0.95] text-[#EDEDED] sm:text-[48px] md:max-w-[620px] md:text-[64px] lg:max-w-[700px] lg:text-[76px] xl:text-[82px]">
              Branding & Creative Portfolio
            </h1>
          </div>
       
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolioPageProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-end gap-5 p-5 md:p-7">
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
