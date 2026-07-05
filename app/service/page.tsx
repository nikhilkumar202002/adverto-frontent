import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Container from "../components/common/Container";
import Reveal from "../components/common/Reveal";
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
        className="relative flex min-h-[680px] items-end overflow-hidden border-b border-white/5 pb-[40px]"
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
          <ServiceHeroContent waitForPageTransition />
        </Container>
      </section>

      <section className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-32">
        <Container>
          <Reveal once={false} waitForPageTransition>
            <div className="mb-[25px] grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-12">
                <p className="mb-2 flex items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-[#0000FF] sm:text-[13px] md:mb-3 md:text-[14px]">
                  <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                  What We Do
                </p>
                <h2 className="w-full text-[36px] font-medium leading-[1] text-[#EDEDED] sm:text-[44px] md:text-[58px] lg:text-[66px] xl:text-[70px]">
                  Services Built
                  <br />
                  Around Outcomes
                </h2>
              </div>
              <div className="flex items-end md:col-span-4 md:col-start-9">
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-[20px] gap-y-[20px] md:grid-cols-2 lg:grid-cols-4">
            {servicesData.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal
                  key={service.id}
                  delay={index * 0.08}
                  y={36}
                  once={false}
                  waitForPageTransition
                >
                  <article
                    className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0000FF] p-5 pt-28 text-white transition-colors duration-500 hover:border-white/25 hover:bg-[#0000cc] sm:min-h-[390px] sm:p-6 sm:pt-32 md:min-h-[430px] md:p-7 md:pt-36 lg:min-h-[460px] lg:p-8 lg:pt-36 min-[1200px]:pt-0"
                  >
                    <div className="pointer-events-none absolute -top-[150px] left-1/2 z-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/20 opacity-0 blur-[80px] transition-all duration-700 group-hover:translate-y-8 group-hover:opacity-100" />

                    <div className="absolute right-5 top-5 z-10 text-[32px] font-medium leading-none text-white/20 transition-colors duration-500 group-hover:text-white/35 sm:right-6 sm:top-6 sm:text-[38px] md:right-7 md:top-7 md:text-[42px] lg:right-8 lg:top-8">
                      {service.id}
                    </div>

                    <div className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors duration-500 group-hover:border-white/60 group-hover:bg-white/10 sm:left-6 sm:top-6 sm:h-11 sm:w-11 md:left-7 md:top-7 md:h-12 md:w-12 lg:left-8 lg:top-8">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>

                    <div className="relative z-10 mt-auto mb-4 transition-transform duration-500 ease-out min-[1200px]:absolute min-[1200px]:inset-x-8 min-[1200px]:bottom-8 min-[1200px]:mb-0 min-[1200px]:mt-0 min-[1200px]:group-hover:-translate-y-[170px]">
                      <h3 className="text-[22px] font-medium leading-tight text-white sm:text-[24px] md:text-[26px] lg:text-[24px] xl:text-[28px]">
                        {service.title}
                      </h3>
                    </div>

                    <div className="relative z-10 translate-y-0 opacity-100 transition-all duration-500 ease-out min-[1200px]:absolute min-[1200px]:inset-x-8 min-[1200px]:bottom-8 min-[1200px]:translate-y-6 min-[1200px]:opacity-0 min-[1200px]:group-hover:translate-y-0 min-[1200px]:group-hover:opacity-100">
                      <p className="mb-6 text-[14px] leading-[1.55] text-white/80 sm:text-[15px] md:mb-7 lg:mb-8 lg:text-[14px] xl:text-[16px]">
                        {service.description}
                      </p>
                      <Link
                        href={service.link}
                        className="inline-flex items-center gap-2 border-b border-white/35 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white sm:text-[12px]"
                      >
                        Explore Service
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
