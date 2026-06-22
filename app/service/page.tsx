import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Plus } from "lucide-react";
import Container from "../components/common/Container";
import { faqData } from "../data/faqs";
import { servicesData } from "../data/services";
import ServiceHeroContent from "./ServiceHeroContent";

const backgroundSquares = [
  "#000000", "#07000c", "#020417", "#030720", "#061035", "#071849", "#082464", "#0a2f73",
  "#17034e", "#160854", "#170a5e", "#180b65", "#1a0d70", "#1a0f78", "#171085", "#13108f",
  "#15158a", "#171894", "#1518a2", "#1518ab", "#1218b7", "#1218c4", "#1018cf", "#0f18d8",
  "#1114d0", "#1115d7", "#1116df", "#1417e6", "#1518ed", "#1519f1", "#1519f7", "#141aff",
  "#1215f2", "#1115f5", "#1014fa", "#1114ff", "#1819ff", "#2423ff", "#302cff", "#3a35ff",
];

export const metadata: Metadata = {
  title: "Creative Services | Adverto",
  description:
    "Explore Adverto services across branding, advertising campaigns, video production, and social media management.",
};

export default function ServicePage() {
  return (
    <div className="relative bg-[#050505] text-white">
      <section className="relative flex min-h-screen items-end overflow-hidden border-b border-white/5 pb-[40px]">
        <div
          aria-hidden
          className="absolute inset-0 z-0 grid grid-cols-4 grid-rows-10 bg-black sm:grid-cols-8 sm:grid-rows-5"
        >
          {backgroundSquares.map((color, index) => (
            <span
              key={`${color}-${index}`}
              className="block h-full w-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <Container className="relative z-10">
          <ServiceHeroContent />
        </Container>
      </section>

      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                What We Do
              </p>
              <h2 className="text-[45px] font-medium leading-[1] text-[#EDEDED] md:text-[70px]">
                Services Built
                <br />
                Around Outcomes
              </h2>
            </div>
            <div className="flex items-end md:col-span-4 md:col-start-9">
              <p className="max-w-[360px] text-[16px] leading-[1.45] text-white/55 md:text-right">
                Choose one focused discipline or combine them into a complete
                launch plan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[6px] md:grid-cols-2 lg:grid-cols-4">
            {servicesData.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.id}
                  className="group relative min-h-[480px] overflow-hidden border border-white/10 bg-black p-6 transition-colors duration-500 hover:border-[#0000FF] md:min-h-[540px] md:p-8"
                >
                  <div className="absolute right-6 top-6 text-[42px] font-medium leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-[#0000FF]/20 md:right-8 md:top-8">
                    {service.id}
                  </div>

                  <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center border border-white/10 text-[#0000FF] transition-colors duration-500 group-hover:border-[#0000FF]/50 group-hover:bg-[#0000FF]/10 md:left-8 md:top-8">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>

                  <div className="absolute inset-x-6 bottom-6 transition-transform duration-500 ease-out group-hover:-translate-y-[170px] md:inset-x-8 md:bottom-8">
                    <h3 className="text-2xl font-medium leading-tight text-[#EDEDED] md:text-3xl">
                      {service.title}
                    </h3>
                  </div>

                  <div className="absolute inset-x-6 bottom-6 translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:inset-x-8 md:bottom-8">
                    <p className="mb-8 text-[15px] leading-[1.55] text-white/55">
                      {service.description}
                    </p>
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center gap-2 border-b border-white/20 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-white/70 transition-colors duration-300 hover:border-white hover:text-white"
                    >
                      Start Project
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative z-10 border-t border-white/5 py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:sticky lg:top-28 lg:col-span-5">
              <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                FAQ
              </p>
              <h2 className="mb-6 text-[45px] font-medium leading-[1] text-[#EDEDED] md:text-[64px]">
                Service Questions
              </h2>
              <p className="max-w-[420px] text-[16px] leading-[1.5] text-white/50">
                Clear answers before the first call. For anything more specific,
                email hello@adverto.co.
              </p>
            </div>

            <div className="border-t border-white/10 lg:col-span-7">
              {faqData.map((faq, index) => (
                <details
                  key={faq.id}
                  open={index === 0}
                  className="group border-b border-white/10 transition-colors duration-300 open:border-[#0000FF]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-left md:py-8 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-lg font-medium text-[#EDEDED] transition-colors duration-300 group-hover:text-[#0000FF] md:text-xl">
                      {faq.question}
                    </h3>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-white/20 transition-all duration-300 group-open:rotate-45 group-open:border-[#0000FF] group-open:bg-[#0000FF]">
                      <Plus size={14} strokeWidth={2} />
                    </span>
                  </summary>
                  <p className="max-w-[90%] pb-8 text-[15px] leading-[1.6] text-white/50">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
