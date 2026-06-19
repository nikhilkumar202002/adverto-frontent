import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";
import Container from "../components/common/Container";

export const metadata: Metadata = {
  title: "Contact Adverto | Branding & Creative Agency",
  description:
    "Start a branding, advertising, video production, or social media project with Adverto.",
};

const contactMethods = [
  {
    label: "Email",
    value: "hello@adverto.co",
    href: "mailto:hello@adverto.co",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "Book a discovery call",
    href: "mailto:hello@adverto.co?subject=Discovery%20Call%20Request",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Kerala, India",
    href: "https://maps.google.com/?q=Kerala%2C%20India",
    icon: MapPin,
  },
];

const projectTypes = [
  "Branding",
  "Advertising Campaign",
  "Video Production",
  "Social Media",
  "Website / Digital",
  "Full Launch",
];

const responseSteps = [
  {
    id: "01",
    title: "Share the brief",
    text: "Tell us what you are building, where it needs to go, and what success should look like.",
  },
  {
    id: "02",
    title: "Align the scope",
    text: "We map the right creative direction, deliverables, timeline, and team for the project.",
  },
  {
    id: "03",
    title: "Start production",
    text: "Once the plan is clear, we move into strategy, design, content, and execution.",
  },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-[#050505] pt-32 pb-24 text-white md:pt-40 md:pb-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="mb-4 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Contact Us
            </p>
            <h1 className="max-w-[920px] text-[52px] font-medium leading-[0.95] text-[#EDEDED] md:text-[96px]">
              Start Your Next Brand Project
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="max-w-[380px] text-[16px] leading-[1.45] text-white/55 md:ml-auto">
              Bring us a launch, rebrand, campaign, or content challenge. We
              will shape it into a clear creative plan and production path.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-[6px] lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-[6px]">
              {contactMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <Link
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    className="group flex min-h-[150px] items-start justify-between gap-6 border border-white/10 bg-[#0A0A0A] p-6 transition-colors duration-300 hover:border-[#0000FF] hover:bg-[#0f0f0f] md:p-8"
                  >
                    <div>
                      <div className="mb-8 flex h-12 w-12 items-center justify-center border border-white/10 text-[#0000FF] transition-colors duration-300 group-hover:border-[#0000FF]/50 group-hover:bg-[#0000FF]/10">
                        <Icon size={20} strokeWidth={1.6} />
                      </div>
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
                        {method.label}
                      </p>
                      <p className="text-xl font-medium text-white">
                        {method.value}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 text-white/35 transition-colors duration-300 group-hover:text-white"
                    />
                  </Link>
                );
              })}

              <div className="border border-white/10 bg-[#080808] p-6 md:p-8">
                <div className="mb-8 flex items-center justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center border border-white/10 text-[#0000FF]">
                    <Clock3 size={20} strokeWidth={1.6} />
                  </div>
                  <p className="text-right text-xs uppercase tracking-[0.18em] text-white/35">
                    Typical response
                  </p>
                </div>
                <p className="text-3xl font-medium leading-none text-[#EDEDED]">
                  Within 24 hours
                </p>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-[#0A0A0A] p-6 md:p-8 lg:col-span-7">
            <div className="mb-10 flex items-start justify-between gap-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#0000FF]">
                  Project Inquiry
                </p>
                <h2 className="text-3xl font-medium leading-tight text-[#EDEDED] md:text-4xl">
                  Tell us what you need
                </h2>
              </div>
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center border border-white/10 text-[#0000FF] md:flex">
                <MessageSquareText size={20} strokeWidth={1.6} />
              </div>
            </div>

            <form
              action="mailto:hello@adverto.co"
              method="post"
              encType="text/plain"
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  className="h-14 w-full border border-white/10 bg-black/30 px-4 text-[16px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#0000FF]"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="h-14 w-full border border-white/10 bg-black/30 px-4 text-[16px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#0000FF]"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">
                  Service
                </span>
                <select
                  name="service"
                  defaultValue=""
                  className="h-14 w-full border border-white/10 bg-black/30 px-4 text-[16px] text-white outline-none transition-colors focus:border-[#0000FF]"
                  required
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">
                  Budget
                </span>
                <select
                  name="budget"
                  defaultValue=""
                  className="h-14 w-full border border-white/10 bg-black/30 px-4 text-[16px] text-white outline-none transition-colors focus:border-[#0000FF]"
                  required
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option value="Under 1 lakh">Under 1 lakh</option>
                  <option value="1 lakh to 3 lakh">1 lakh to 3 lakh</option>
                  <option value="3 lakh to 7 lakh">3 lakh to 7 lakh</option>
                  <option value="7 lakh plus">7 lakh plus</option>
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">
                  Project Details
                </span>
                <textarea
                  name="message"
                  required
                  rows={7}
                  className="w-full resize-none border border-white/10 bg-black/30 p-4 text-[16px] leading-relaxed text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#0000FF]"
                  placeholder="Tell us about the goal, timeline, audience, and deliverables."
                />
              </label>

              <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
                <p className="max-w-[420px] text-sm leading-relaxed text-white/40">
                  The form opens your email client with the project details. For
                  direct email, write to hello@adverto.co.
                </p>
                <button
                  type="submit"
                  className="group inline-flex h-14 items-center justify-center gap-3 bg-[#0000FF] px-7 text-[14px] font-medium tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,0,255,0.45)]"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                  }}
                >
                  Send Inquiry
                  <Send
                    size={18}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-[6px] grid grid-cols-1 gap-[6px] md:grid-cols-3">
          {responseSteps.map((step) => (
            <div
              key={step.id}
              className="min-h-[220px] border border-white/10 bg-[#080808] p-6 md:p-8"
            >
              <div className="mb-10 flex items-center justify-between gap-5">
                <span className="text-lg font-medium text-[#0000FF]">
                  {step.id}
                </span>
                <BriefcaseBusiness
                  size={20}
                  strokeWidth={1.5}
                  className="text-white/25"
                />
              </div>
              <h3 className="mb-3 text-xl font-medium text-[#EDEDED]">
                {step.title}
              </h3>
              <p className="text-[15px] leading-[1.45] text-white/45">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
