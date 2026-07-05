import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Container from "../../components/common/Container";
import InnerBannerHeading from "../../components/common/InnerBannerHeading";
import { campaignProjects } from "../../data/campaigns";
import ProjectGallery from "../../portfolio/[slug]/ProjectGallery";

export function generateStaticParams() {
  return campaignProjects.map((campaign) => ({
    slug: campaign.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const campaign = campaignProjects.find((item) => item.slug === slug);

  if (!campaign) {
    return {
      title: "Campaign Not Found",
    };
  }

  return {
    title: `${campaign.title} | Campaigns`,
    description: campaign.description,
  };
}

export default async function CampaignPage({ params }) {
  const { slug } = await params;
  const campaign = campaignProjects.find((item) => item.slug === slug);

  if (!campaign) {
    notFound();
  }

  return (
    <article className="relative bg-[#050505] pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <Link
          href="/campigns"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Campaigns
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[#0000FF]">
              {campaign.subtitle}
            </p>
            <InnerBannerHeading text={campaign.title} />
          </div>
          <div className="md:col-span-4">
            <p className="text-[16px] leading-[1.5] text-white/55">
              {campaign.description}
            </p>
          </div>
        </div>

        <div className="mt-12 overflow-hidden border border-white/10 bg-[#0A0A0A]">
          <img
            src={campaign.heroImage}
            alt={campaign.title}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="mt-[6px] grid grid-cols-1 gap-[6px] md:grid-cols-3">
          <div className="bg-[#080808] p-6 md:p-8">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
              Category
            </p>
            <p className="text-xl font-medium text-white">{campaign.category}</p>
          </div>
          <div className="bg-[#080808] p-6 md:p-8">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
              Year
            </p>
            <p className="text-xl font-medium text-white">{campaign.year}</p>
          </div>
          <div className="bg-[#080808] p-6 md:p-8">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
              Services
            </p>
            <p className="text-xl font-medium text-white">
              {campaign.services.join(", ")}
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          <div className="md:sticky md:top-28 md:col-span-4">
            <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Gallery
            </p>
            <InnerBannerHeading
              as="h2"
              text="Campaign Visuals"
              variant="custom"
              className="text-4xl font-medium leading-none text-[#EDEDED] md:text-5xl"
            />
          </div>
          <ProjectGallery
            images={campaign.gallery}
            title={campaign.title}
            gridClassName="grid-cols-1 gap-5 md:grid-cols-2"
            itemClassName="rounded-[20px]"
          />
        </div>

        <div className="mt-20 flex justify-end">
          <Link
            href="/campigns"
            className="group inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
          >
            View all campaigns
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </article>
  );
}
