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

  return (
    <main className="relative overflow-x-hidden bg-black text-white">
      <section
        className="relative flex min-h-[72vh] items-end overflow-hidden border-b border-white/5 pb-12 pt-32 md:min-h-[76vh] md:pb-16"
        data-navbar-transparent
      >
        <div aria-hidden className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#030303]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
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
              <div className="relative overflow-hidden border border-white/10 bg-black">
                <div className="relative border-b border-white/10 p-5 md:p-8">
                  <div className="mb-10 flex items-start justify-between gap-8">
                    <div>
                      <p className="mb-4 flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-[#0000FF]">
                        <span className="h-[1px] w-[34px] bg-[#0000FF]" />
                        Service Scope
                      </p>
                      <h2 className="max-w-[620px] text-[42px] font-medium leading-[0.94] tracking-[-0.04em] text-[#F5F5F5] md:text-[72px]">
                        What&apos;s included in this service.
                      </h2>
                    </div>
                    <span className="hidden text-[64px] font-medium leading-none text-white/[0.06] md:block">
                      {service.id}
                    </span>
                  </div>

                  <p className="max-w-[680px] text-[17px] leading-[1.6] text-white/55">
                    Each item is shaped around the business goal, then connected
                    into a clear system for brand, campaign, content, or growth.
                  </p>
                </div>

                <div className="relative grid grid-cols-1 gap-[1px] bg-white/10 md:grid-cols-2">
                  {service.items.map((item, index) => (
                    <div
                      key={item}
                      className="group min-h-[180px] bg-black p-5 transition-colors duration-300 hover:bg-[#050505] md:p-7"
                    >
                      <div className="mb-10 flex items-center justify-between gap-6">
                        <span className="text-[13px] uppercase tracking-[0.16em] text-white/22 transition-colors duration-300 group-hover:text-[#0000FF]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#0000FF] transition-colors duration-300 group-hover:border-[#0000FF] group-hover:bg-[#0000FF] group-hover:text-white">
                          <Check size={16} strokeWidth={2} />
                        </span>
                      </div>
                      <h3 className="text-[24px] font-medium leading-[1.05] tracking-[-0.025em] text-white/86 md:text-[32px]">
                        {item}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
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
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
