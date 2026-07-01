import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Container from "../components/common/Container";
import { servicesData } from "../data/services";
import ServiceHeroContent from "./ServiceHeroContent";

export const metadata: Metadata = {
  title: "Creative Services | Adverto",
  description:
    "Explore Adverto services across branding, advertising campaigns, video production, and social media management.",
};

export default function ServicePage() {
  return (
    <div className="relative bg-[#050505] text-white">
      <section
        className="relative flex min-h-screen items-end overflow-hidden border-b border-white/5 pb-[40px]"
        data-navbar-transparent
      >
        <div aria-hidden className="absolute inset-0 z-0 bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(72,88,255,0.58),rgba(0,0,255,0.34)_38%,rgba(0,0,0,0)_72%)] opacity-80 blur-[120px] md:h-[1040px] md:w-[1040px]" />
          <div className="absolute bottom-[-14%] right-[-8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,0,255,0.28),rgba(0,0,0,0)_70%)] opacity-70 blur-[110px] md:h-[620px] md:w-[620px]" />
          <div className="absolute left-[-10%] top-[12%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(35,0,124,0.34),rgba(0,0,0,0)_68%)] opacity-60 blur-[96px] md:h-[500px] md:w-[500px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.14)_54%,rgba(0,0,0,0.68)_100%)]" />
          <div className="absolute inset-0 bg-black/40" />
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
              {/* <p className="max-w-[360px] text-[16px] leading-[1.45] text-white/55 md:text-right">
                Choose one focused discipline or combine them into a complete
                launch plan.
              </p> */}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-[20px] gap-y-[20px] md:grid-cols-2 lg:grid-cols-4">
            {servicesData.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.id}
                  className="group relative min-h-[480px] overflow-hidden rounded-[20px] border border-white/10 bg-[#0000FF] p-6 text-white transition-colors duration-500 hover:border-white/25 hover:bg-[#0000cc] md:min-h-[540px] md:p-8"
                >
                  <div className="pointer-events-none absolute -top-[150px] left-1/2 z-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/20 opacity-0 blur-[80px] transition-all duration-700 group-hover:translate-y-8 group-hover:opacity-100" />

                  <div className="absolute right-6 top-6 z-10 text-[42px] font-medium leading-none text-white/20 transition-colors duration-500 group-hover:text-white/35 md:right-8 md:top-8">
                    {service.id}
                  </div>

                  <div className="absolute left-6 top-6 z-10 flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors duration-500 group-hover:border-white/60 group-hover:bg-white/10 md:left-8 md:top-8">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>

                  <div className="absolute inset-x-6 bottom-6 z-10 transition-transform duration-500 ease-out group-hover:-translate-y-[170px] md:inset-x-8 md:bottom-8">
                    <h3 className="text-2xl font-medium leading-tight text-white md:text-3xl">
                      {service.title}
                    </h3>
                  </div>

                  <div className="absolute inset-x-6 bottom-6 z-10 translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:inset-x-8 md:bottom-8">
                    <p className="mb-8 text-[15px] leading-[1.55] text-white/80">
                      {service.description}
                    </p>
                    <Link
                      href={service.link}
                      className="inline-flex items-center gap-2 border-b border-white/35 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white"
                    >
                      Explore Service
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
    </div>
  );
}
