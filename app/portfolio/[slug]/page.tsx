import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Container from "../../components/common/Container";
import { portfolioPageProjects } from "../../data/portfolio";

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
        <Link
          href="/portfolio"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Portfolio
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[#0000FF]">
              {project.subtitle}
            </p>
            <h1 className="text-[56px] font-medium leading-[0.9] text-[#EDEDED] md:text-[110px]">
              {project.title}
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="text-[16px] leading-[1.5] text-white/55">
              {project.description}
            </p>
          </div>
        </div>

        <div className="mt-12 overflow-hidden border border-white/10 bg-[#0A0A0A]">
          <img
            src={project.heroImage}
            alt={project.title}
            className="h-[420px] w-full object-cover md:h-[720px]"
          />
        </div>

        <div className="mt-[6px] grid grid-cols-1 gap-[6px] md:grid-cols-3">
          <div className="bg-[#080808] p-6 md:p-8">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
              Category
            </p>
            <p className="text-xl font-medium text-white">{project.category}</p>
          </div>
          <div className="bg-[#080808] p-6 md:p-8">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
              Year
            </p>
            <p className="text-xl font-medium text-white">{project.year}</p>
          </div>
          <div className="bg-[#080808] p-6 md:p-8">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
              Services
            </p>
            <p className="text-xl font-medium text-white">
              {project.services.join(", ")}
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          <div className="md:sticky md:top-28 md:col-span-4">
            <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Gallery
            </p>
            <h2 className="text-4xl font-medium leading-none text-[#EDEDED] md:text-5xl">
              Project Visuals
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-[6px] md:col-span-8 md:grid-cols-3">
            {project.gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`overflow-hidden bg-[#0A0A0A] ${
                  index % 6 === 0 ? "md:col-span-2" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${project.title} gallery ${index + 1}`}
                  loading="lazy"
                  className="h-full min-h-[320px] w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-end">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
          >
            View all projects
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </article>
  );
}
