"use client";

import Container from "../common/Container";
import HeroVideo from "./HeroVideo";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100svh-82px)] w-full overflow-hidden bg-black pt-[82px]"
    >
      <Container className="relative min-h-[calc(100svh-82px)]">
        <HeroVideo className="inset-x-5 bottom-0 top-0 sm:inset-x-6 md:inset-x-10 lg:inset-x-[60px] xl:inset-x-[80px]" />
      </Container>
    </section>
  );
}
