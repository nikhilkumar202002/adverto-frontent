"use client";

import HeroVideo from "./HeroVideo";

export default function HeroSection() {
  return (
    <section
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-black"
    >
      <HeroVideo className="inset-0" />
    </section>
  );
}
