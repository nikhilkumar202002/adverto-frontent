'use client';

import GridLines from "../common/GridLines";
import Container from "../common/Container";
import Button from "../common/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      
      {/* Grid Background */}
      <GridLines />

      <Container className="relative z-10 h-full flex items-center justify-center">
        
        <div className="max-w-[1100px] w-full flex flex-col items-center justify-center text-center">
          
          <p className="mb-4 text-sm md:text-[14px] tracking-[0.1em] text-[#0000FF] flex items-center gap-3">
            <span className="w-[30px] md:w-[50px] h-[1px] md:h-[1.5px] bg-[#0000FF] inline-block" />
            Creative Agency — Est. 2016
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-[64px] lg:text-[93px] font-semibold leading-[0.9]">
            We build brands that{" "}
            <span className="text-[#0000FF] italic">
              dominate
            </span>{" "}
            attention.
          </h1>

          <p className="mt-6 max-w-[550px] text-base md:text-[20px] leading-[1.1] text-white/60 font-regular">
            Branding, campaigns, video production, and social
            experiences crafted for modern businesses.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <Button>
              View Works
            </Button>

            <Button variant="secondary">
              Book Consultation
            </Button>
          </div>

        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 w-full flex items-center justify-center z-20">
        <button
          aria-label="Scroll to explore"
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }
          }}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs md:text-sm">Scroll to Explore</span>
        </button>
      </div>

      <style jsx>{`
        button[aria-label="Scroll to explore"] svg {
          animation: arrowBounce 1.6s infinite;
        }

        @keyframes arrowBounce {
          0% { transform: translateY(0); opacity: 0.9 }
          30% { transform: translateY(6px); opacity: 1 }
          60% { transform: translateY(0); opacity: 0.9 }
          100% { transform: translateY(0); opacity: 0.9 }
        }
      `}</style>
    </section>
  );
}