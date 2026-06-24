"use client";

import Container from "../common/Container";
import Button from "../common/Button";
import { MoveDown } from "lucide-react";

const backgroundSquares = [
  "#000000", "#07000c", "#020417", "#030720", "#061035", "#071849", "#082464", "#0a2f73",
  "#17034e", "#160854", "#170a5e", "#180b65", "#1a0d70", "#1a0f78", "#171085", "#13108f",
  "#15158a", "#171894", "#1518a2", "#1518ab", "#1218b7", "#1218c4", "#1018cf", "#0f18d8",
  "#1114d0", "#1115d7", "#1116df", "#1417e6", "#1518ed", "#1519f1", "#1519f7", "#141aff",
  "#1215f2", "#1115f5", "#1014fa", "#1114ff", "#1819ff", "#2423ff", "#302cff", "#3a35ff",
];

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[720px] w-full items-center justify-center overflow-hidden sm:min-h-screen sm:min-h-[100svh]"
      data-navbar-transparent
    >
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

      <Container className="relative z-10 flex min-h-[720px] items-center justify-center py-24 sm:min-h-screen sm:min-h-[100svh] sm:py-28 lg:py-32">
        <div
          className="flex w-full max-w-[1100px] flex-col items-center justify-center text-center"
        >
          <p
            className="mb-4 text-center text-xs tracking-[0.1em] text-[#0000FF] sm:text-sm md:text-[14px]"
          >
            Creative Agency Est. 2023
          </p>

          <h1
            className="w-full text-[42px] font-semibold leading-[0.92] sm:text-6xl md:text-[72px] lg:max-w-none lg:text-[93px]"
          >
            We build brands that dominate attention.
          </h1>

          <p
            className="mt-5 max-w-[34rem] text-sm leading-[1.25] text-white/60 sm:text-base md:mt-6 md:text-[20px] md:leading-[1.1]"
          >
            Branding, campaigns, video production, and social
            experiences crafted for modern businesses.
          </p>

          <div className="mt-7 flex w-full flex-row flex-wrap items-center justify-center gap-4 sm:mt-8 sm:w-auto sm:gap-5">
            <Button>View Works</Button>

            <Button variant="secondary">Book Consultation</Button>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-5 left-0 z-20 flex w-full items-center justify-center sm:bottom-8">
        <button
          aria-label="Scroll to explore"
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }
          }}
        >
          <MoveDown className="h-5 w-5 scale-y-[1.6] text-[white]" strokeWidth={1.6} aria-hidden />
          <span className="text-xs md:text-sm">Scroll to Explore</span>
        </button>
      </div>
    </section>
  );
}
