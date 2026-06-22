import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { serviceDetails, type ServiceSlug } from "../serviceDetails";

type ServiceDetailPageProps = {
  slug: ServiceSlug;
};

const serviceOrder = Object.keys(serviceDetails) as ServiceSlug[];

export default function ServiceDetailPage({ slug }: ServiceDetailPageProps) {
  const service = serviceDetails[slug];
  const currentIndex = serviceOrder.indexOf(slug);
  const nextSlug = serviceOrder[(currentIndex + 1) % serviceOrder.length];
  const nextService = serviceDetails[nextSlug];

  return (
    <main className="relative overflow-hidden bg-black text-white">
      <section
        className="relative flex min-h-screen min-h-[100svh] items-end overflow-hidden border-b border-white/5 pb-16 pt-32"
        data-navbar-transparent
      >
        <div aria-hidden className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#030303]" />
          <div className="absolute right-[-16%] top-[-20%] h-[620px] w-[620px] rounded-full bg-[#0000FF]/25 blur-[130px]" />
          <div className="absolute bottom-[-24%] left-[-10%] h-[520px] w-[520px] rounded-full bg-white/8 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,255,0.18),transparent_44%),linear-gradient(180deg,rgba(0,0,0,0.08)_0%,#000_100%)]" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-4 flex items-center gap-3 text-[13px] uppercase tracking-[0.18em] text-[#0000FF]">
                <span className="h-[1px] w-[34px] bg-[#0000FF]" />
                {service.eyebrow}
              </p>
              <h1 className="max-w-[960px] text-[56px] font-medium leading-[0.9] tracking-[-0.04em] text-[#F5F5F5] md:text-[104px]">
                <span className="text-[#0000FF]">{service.id}</span>{" "}
                {service.title}
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="max-w-[460px] text-[17px] leading-[1.6] text-white/58 lg:ml-auto">
                {service.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <div className="border-t border-[#0000FF] bg-[#111111]">
                <div className="px-5 py-5 md:px-8">
                  <p className="mb-3 text-[12px] uppercase tracking-[0.18em] text-white/38">
                    Service Scope
                  </p>
                  <h2 className="text-[34px] font-medium leading-none tracking-[-0.03em] text-[#0000FF] md:text-[56px]">
                    What&apos;s Included
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-[1px] bg-white/8">
                  {service.items.map((item, index) => (
                    <div
                      key={item}
                      className="group flex min-h-[82px] items-center justify-between gap-6 bg-[#151515] px-5 py-4 transition-colors duration-300 hover:bg-[#1A1A1A] md:px-8"
                    >
                      <div className="flex items-center gap-4">
                        <Check
                          size={18}
                          strokeWidth={2}
                          className="shrink-0 text-[#0000FF]"
                        />
                        <span className="text-[20px] leading-[1.25] text-white/84 md:text-[28px]">
                          {item}
                        </span>
                      </div>
                      <span className="text-[13px] uppercase tracking-[0.16em] text-white/18 transition-colors duration-300 group-hover:text-[#0000FF]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:col-span-4">
              <div className="border border-white/10 bg-[#080808] p-5 md:p-8">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-2 text-[12px] uppercase tracking-[0.18em] text-white/35">
                      Current Service
                    </p>
                    <h3 className="text-[30px] font-medium leading-none tracking-[-0.03em] text-white md:text-[42px]">
                      {service.title}
                    </h3>
                  </div>
                  <Link
                    href="/contact-us"
                    aria-label={`Start ${service.title} project`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#0000FF] text-[#0000FF] transition-colors hover:bg-[#0000FF] hover:text-white"
                  >
                    <ArrowUpRight size={22} strokeWidth={1.7} />
                  </Link>
                </div>

                <p className="mb-8 text-[16px] leading-[1.6] text-white/58">
                  Need this as a standalone service or part of a larger campaign
                  system? We can shape the scope around your goals.
                </p>

                <Button href="/contact-us" className="w-full">
                  Start a Project
                </Button>

                <div className="mt-10 border-t border-white/10 pt-6">
                  <p className="mb-4 text-[12px] uppercase tracking-[0.18em] text-white/35">
                    All Services
                  </p>
                  <div className="space-y-2">
                    {serviceOrder.map((serviceSlug) => {
                      const navService = serviceDetails[serviceSlug];
                      const isActive = serviceSlug === slug;

                      return (
                        <Link
                          key={serviceSlug}
                          href={`/services/${serviceSlug}`}
                          className={`flex items-center justify-between gap-4 border px-4 py-3 text-[15px] transition-colors ${
                            isActive
                              ? "border-[#0000FF] bg-[#0000FF] text-white"
                              : "border-white/10 bg-white/[0.03] text-white/58 hover:border-[#0000FF]/60 hover:text-white"
                          }`}
                        >
                          <span>
                            {navService.id} {navService.title}
                          </span>
                          <ArrowUpRight size={16} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6">
                  <Link
                    href={`/services/${nextSlug}`}
                    className="group flex items-center justify-between gap-4"
                  >
                    <span>
                      <span className="block text-[12px] uppercase tracking-[0.18em] text-white/35">
                        Next Service
                      </span>
                      <span className="mt-1 block text-[22px] font-medium text-white transition-colors group-hover:text-[#0000FF]">
                        {nextService.title}
                      </span>
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-[#0000FF] group-hover:bg-[#0000FF]">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
