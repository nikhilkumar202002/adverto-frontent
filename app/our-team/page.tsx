import Image from "next/image";
import type { Metadata } from "next";
import Container from "../components/common/Container";
import HeroBanner from "../components/HeroBanner/HeroBanner";

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
      <div className="relative">
        <HeroBanner />
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end">
          <Container className="pb-12 md:pb-20">
            <p className="mb-4 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Our Team
            </p>
            <h1 className="max-w-[980px] text-[54px] font-medium leading-[0.9] text-[#EDEDED] md:text-[110px]">
              The People Behind the Work
            </h1>
          </Container>
        </div>
      </div>

      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                Studio Team
              </p>
              <h2 className="text-[45px] font-medium leading-[1] text-[#EDEDED] md:text-[70px]">
                Creative Minds,
                <br />
                Production Hands
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <article
                key={member.id}
                className={`group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] ${
                  index === 0 || index === 1 ? "lg:col-span-2" : ""
                }`}
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
                  <h3 className="text-2xl font-medium text-white md:text-3xl">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm leading-snug text-white/60">
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
