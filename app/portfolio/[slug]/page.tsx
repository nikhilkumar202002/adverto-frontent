import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Container from "../../components/common/Container";
import Reveal from "../../components/common/Reveal";
import { portfolioPageProjects } from "../../data/portfolio";
import ProjectGallery from "./ProjectGallery";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolioPageProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioPageProjects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function PortfolioProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioPageProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="relative bg-[#050505] pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <Reveal
          x={-32}
          y={0}
          duration={0.55}
          once={false}
          waitForPageTransition
        >
          <Link
            href="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Portfolio
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-[4px] xl:grid-cols-12 xl:items-end xl:gap-8">
          <Reveal
            className="xl:col-span-8"
            x={-56}
            y={0}
            once={false}
            waitForPageTransition
          >
            <h1 className="text-[56px] font-medium leading-[0.9] text-[#EDEDED] md:text-[84px] lg:text-[96px] xl:text-[110px]">
              {project.title}
            </h1>
          </Reveal>
          <Reveal
            className="xl:col-span-4"
            x={56}
            y={0}
            once={false}
            waitForPageTransition
          >
            <p className="text-[15px] leading-[1.5] text-white/55 lg:text-[16px]">
              {project.description}
            </p>
          </Reveal>
        </div>

        <Reveal y={36} amount={0.08} once waitForPageTransition>
          <div className="mt-[30px] overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A]">
            <img
              src={project.heroImage}
              alt={project.title}
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-[6px] grid grid-cols-2 gap-[6px] xl:grid-cols-3">
          {[
            ["Category", project.category],
            ["Year", project.year],
            ["Services", project.services.join(", ")],
          ].map(([label, value], index) => (
            <Reveal
              key={label}
              className={index === 2 ? "col-span-2 xl:col-span-1" : ""}
              delay={index * 0.06}
              duration={0.55}
              y={24}
              amount={0.12}
              once
              waitForPageTransition
            >
              <div className="bg-[#080808] p-6 md:p-8">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
                  {label}
                </p>
                <p className="text-xl font-medium text-white">{value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 xl:grid-cols-12 xl:items-start">
          <div className="xl:sticky xl:top-28 xl:col-span-4 xl:self-start">
            <Reveal
              x={-56}
              y={0}
              amount={0.12}
              once={false}
              waitForPageTransition
            >
              <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                Gallery
              </p>
              <h2 className="text-4xl font-medium leading-none text-[#EDEDED] md:text-5xl">
                Project Visuals
              </h2>
            </Reveal>
          </div>
          <Reveal
            className="xl:col-span-8"
            y={36}
            amount={0.06}
            once
            waitForPageTransition
          >
            <ProjectGallery images={project.gallery} title={project.title} />
          </Reveal>
        </div>

        <Reveal y={24} amount={0.12} once waitForPageTransition>
          <div className="mt-20 flex justify-end">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
            >
              View all projects
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
