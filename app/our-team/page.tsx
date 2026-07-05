import Image from "next/image";
import type { Metadata } from "next";
import Container from "../components/common/Container";
import InnerBannerHeading from "../components/common/InnerBannerHeading";
import Reveal from "../components/common/Reveal";

export const metadata: Metadata = {
  title: "Our Team | Adverto",
  description:
    "Meet the creative directors, designers, editors, cinematographers, and operations team behind Adverto.",
};

const teamMembers = [
  {
    id: 1,
    name: "Fabis",
    role: "Co-Founder & Creative Director",
    image: "/teams/fabis.jpg",
    discipline: "Creative Lead",
  },
  {
    id: 2,
    name: "Shihab",
    role: "Co-Founder & Managing Director",
    image: "/teams/shihab.jpg",
    discipline: "Business Lead",
  },
  {
    id: 3,
    name: "Ashif",
    role: "Digital Marketer & Project Manager",
    image: "/teams/ASHIF.jpeg",
    discipline: "Digital Strategy",
  },
  {
    id: 4,
    name: "Ajin",
    role: "Graphic Designer",
    image: "/teams/AJIN.jpg",
    discipline: "Visual Design",
  },
  {
    id: 5,
    name: "Aby",
    role: "Senior Video Editor",
    image: "/teams/ABY.jpg",
    discipline: "Edit Lead",
  },
  {
    id: 6,
    name: "Ashish",
    role: "Director",
    image: "/teams/ashi.jpg",
    discipline: "Direction",
  },
  {
    id: 7,
    name: "Ameen",
    role: "Cinematographer",
    image: "/teams/ameen.jpg",
    discipline: "Cinematography",
  },
  {
    id: 8,
    name: "Alphya",
    role: "HR Manager",
    image: "/teams/ALPHY.jpg",
    discipline: "People Ops",
  },
  {
    id: 9,
    name: "Nawaz",
    role: "Graphic Designer & Video Editor",
    image: "/teams/navas%20..jpg",
    discipline: "Design & Edit",
  },
];

export default function OurTeamPage() {
  return (
    <div className="relative bg-[#050505] text-white">
      <Reveal y={0} duration={0.9} amount={0.01} waitForPageTransition>
        <section className="relative overflow-hidden bg-[#050505]">
          <Image
            src="/Banners/SQUAD-MOBILE-VIEW.webp"
            alt="Adverto team"
            width={1500}
            height={1875}
            priority
            sizes="100vw"
            className="h-auto w-full md:hidden"
          />
          <Image
            src="/Banners/Team-banner.jpg"
            alt="Adverto team"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            className="hidden h-auto w-full md:block"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent md:h-56" />
        </section>
      </Reveal>

      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal x={-56} y={0} once={false} waitForPageTransition>
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                  <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                  Studio Team
                </p>
                <InnerBannerHeading
                  as="h2"
                  text="Creative Minds, Production Hands"
                  variant="custom"
                  className="w-full text-[36px] font-medium leading-[1] text-[#EDEDED] sm:text-[44px] md:text-[58px] lg:text-[66px] xl:text-[70px]"
                />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Reveal
                key={member.id}
                className={index === 0 || index === 1 ? "lg:col-span-2" : ""}
                delay={index * 0.045}
                duration={0.55}
                y={28}
                amount={0.08}
                once
                waitForPageTransition
              >
                <article
                  className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#111]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes={
                        index === 0 || index === 1
                          ? "(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                          : "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      }
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <InnerBannerHeading
                      as="h3"
                      text={member.name}
                      variant="custom"
                      className="text-2xl font-medium text-white md:text-3xl"
                    />
                    <p className="mt-2 text-sm leading-snug text-white/60">
                      {member.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
