import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { servicesData } from "../data/services";

export const metadata: Metadata = {
  title: "About Adverto | Creative Advertising Agency",
  description:
    "Learn about Adverto Ads, a Kerala-based creative agency building brands, campaigns, films, and social content for ambitious businesses.",
};

const stats = [
  { value: "2016", label: "Founded with a focus on outcome-led creative work" },
  { value: "120+", label: "Campaigns, launches, and content systems delivered" },
  { value: "40+", label: "Brands shaped across identity, media, and rollout" },
  { value: "4", label: "Core disciplines connected under one workflow" },
];

const principles = [
  "Strategy before styling",
  "Ideas built for business outcomes",
  "Sharp design with production discipline",
  "Campaign thinking from the first brief",
  "Long-term brand consistency, not one-off noise",
];

const process = [
  {
    id: "01",
    title: "Discover",
    text: "We understand the brand, audience, market, competitors, offer, and the business result the work must create.",
  },
  {
    id: "02",
    title: "Shape",
    text: "We turn the brief into positioning, messaging, visual direction, campaign routes, and a clear production plan.",
  },
  {
    id: "03",
    title: "Create",
    text: "Designers, marketers, directors, editors, and project leads build the assets with speed, craft, and consistency.",
  },
  {
    id: "04",
    title: "Launch",
    text: "We prepare the final rollout across brand touchpoints, social channels, campaigns, video, and digital platforms.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] text-white">
      <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-20 md:pt-40 md:pb-28">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute right-[-18%] top-[-22%] h-[560px] w-[560px] rounded-full bg-[#0000FF]/25 blur-[120px]" />
          <div className="absolute bottom-[-24%] left-[-12%] h-[460px] w-[460px] rounded-full bg-[#2f1bff]/15 blur-[110px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.78)_100%)]" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-4 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                About Adverto
              </p>
              <h1 className="max-w-[980px] text-[52px] font-medium leading-[0.95] text-[#EDEDED] md:text-[96px]">
                A creative agency for brands that need attention to become
                action.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="max-w-[430px] text-[17px] leading-[1.5] text-white/58 lg:ml-auto">
                Adverto Ads is a branding, advertising, video production, and
                social media agency based in Kalamassery, Ernakulam. We connect
                strategy, design, content, and distribution into one focused
                creative workflow.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact-us">Start a Project</Button>
            <Button href="/portfolio" variant="secondary">
              View Work
            </Button>
          </div>
        </Container>
      </section>

      <section className="relative z-10 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                Who We Are
              </p>
              <h2 className="text-[42px] font-medium leading-[1] text-[#EDEDED] md:text-[68px]">
                Built for clear thinking and bold execution.
              </h2>
            </div>
            <div className="space-y-6 text-[17px] leading-[1.6] text-white/56 lg:col-span-6 lg:col-start-7">
              <p>
                We work with businesses that need more than good-looking posts
                or isolated campaign ideas. Our role is to make the brand easier
                to understand, easier to trust, and easier to choose.
              </p>
              <p>
                From identity systems and advertising campaigns to brand films,
                reels, product content, and social media management, every piece
                is planned to support a larger brand direction. The result is
                creative work that looks sharp, communicates clearly, and moves
                with purpose across every channel.
              </p>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-[6px] md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="min-h-[170px] border border-white/10 bg-[#0A0A0A] p-6 transition-colors duration-300 hover:border-[#0000FF] hover:bg-[#0f0f0f] md:p-8"
              >
                <p className="mb-5 text-[42px] font-medium leading-none text-[#0000FF]">
                  {stat.value}
                </p>
                <p className="text-[15px] leading-[1.45] text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative z-10 border-t border-white/5 py-20 md:py-28">
        <Container>
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                What We Do
              </p>
              <h2 className="text-[42px] font-medium leading-[1] text-[#EDEDED] md:text-[64px]">
                One agency, four connected disciplines.
              </h2>
            </div>
            <p className="max-w-[380px] text-[16px] leading-[1.5] text-white/50 md:col-span-4 md:col-start-9 md:text-right">
              Each service can stand alone, but the strongest work happens when
              strategy, creative, production, and media move together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-[6px] md:grid-cols-2 lg:grid-cols-4">
            {servicesData.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.id}
                  href={service.link}
                  className="group relative min-h-[310px] overflow-hidden border border-white/10 bg-[#0A0A0A] p-6 transition-colors duration-500 hover:border-[#0000FF] hover:bg-[#0f0f0f] md:p-8"
                >
                  <div className="pointer-events-none absolute -top-[150px] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#0000FF]/25 opacity-0 blur-[80px] transition-all duration-700 group-hover:translate-y-8 group-hover:opacity-100" />
                  <div className="relative z-10 mb-12 flex items-start justify-between gap-5">
                    <div className="flex h-12 w-12 items-center justify-center border border-white/10 text-[#0000FF] transition-colors duration-500 group-hover:border-[#0000FF]/50 group-hover:bg-[#0000FF]/10">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <span className="text-lg font-medium text-white/20 transition-colors duration-500 group-hover:text-[#0000FF]/60">
                      {service.id}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="mb-3 text-2xl font-medium leading-tight text-[#EDEDED]">
                      {service.title}
                    </h3>
                    <p className="mb-8 text-[15px] leading-[1.5] text-white/50">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white/70 transition-colors duration-300 group-hover:text-white">
                      Explore
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative z-10 border-t border-white/5 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-[6px] lg:grid-cols-12">
            <div className="border border-white/10 bg-[#080808] p-6 md:p-8 lg:col-span-5">
              <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                How We Think
              </p>
              <h2 className="mb-8 text-[40px] font-medium leading-[1] text-[#EDEDED] md:text-[58px]">
                Compact teams. Complete ownership.
              </h2>
              <div className="space-y-4">
                {principles.map((principle) => (
                  <div
                    key={principle}
                    className="flex items-center gap-3 text-[16px] text-white/62"
                  >
                    <CheckCircle2
                      size={18}
                      strokeWidth={1.7}
                      className="shrink-0 text-[#0000FF]"
                    />
                    {principle}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[6px] md:grid-cols-2 lg:col-span-7">
              {process.map((step) => (
                <div
                  key={step.id}
                  className="min-h-[250px] border border-white/10 bg-[#0A0A0A] p-6 md:p-8"
                >
                  <span className="mb-10 block text-lg font-medium text-[#0000FF]">
                    {step.id}
                  </span>
                  <h3 className="mb-3 text-2xl font-medium text-[#EDEDED]">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-[1.55] text-white/48">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 border-t border-white/5 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 border border-white/10 bg-[#0A0A0A] p-6 md:grid-cols-12 md:p-10 lg:p-12">
            <div className="md:col-span-7">
              <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                Studio
              </p>
              <h2 className="max-w-[760px] text-[42px] font-medium leading-[1] text-[#EDEDED] md:text-[64px]">
                Based in Kerala. Built to work wherever the brand needs to go.
              </h2>
            </div>
            <div className="md:col-span-5">
              <div className="mb-8 flex items-start gap-4 text-white/56">
                <MapPin
                  size={22}
                  strokeWidth={1.7}
                  className="mt-1 shrink-0 text-[#0000FF]"
                />
                <p className="text-[16px] leading-[1.6]">
                  ADVERTO ADS
                  <br />
                  SUITE NO: 387B, 5/257A8
                  <br />
                  Basement Floor, Pallath Square, FACT Kalamassery Rd,
                  <br />
                  Kalamassery P.O, Ernakulam - 683104
                </p>
              </div>
              <div className="flex flex-col gap-3 text-[16px] text-white/62">
                <a
                  href="mailto:connectadvertoads@gmail.com"
                  className="transition-colors hover:text-white"
                >
                  connectadvertoads@gmail.com
                </a>
                <a
                  href="tel:+917356560800"
                  className="transition-colors hover:text-white"
                >
                  +91 73565 60800
                </a>
              </div>
              <div className="mt-8">
                <Button href="/contact-us">Talk to Adverto</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
