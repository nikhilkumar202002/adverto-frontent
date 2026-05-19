import GridLines from "../common/GridLines";
import Container from "../common/Container";
import Button from "../common/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden h-[100vh] flex items-center justify-center">
      
      {/* Grid Background */}
      <GridLines />

      <Container className="relative z-10 h-full flex items-center justify-center">
        
        <div className="max-w-[1100px] w-full flex flex-col items-center justify-center text-center">
          
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white/60">
            Creative Agency — Est. 2016
          </p>

          <h1 className="text-[120px] font-semibold leading-[0.9] tracking-[-0.06em]">
            We build brands that{" "}
            <span className="text-[#0000FF] italic">
              dominate
            </span>{" "}
            attention.
          </h1>

          <p className="mt-8 max-w-[700px] text-lg leading-relaxed text-white/60">
            Branding, campaigns, video production, and social
            experiences crafted for modern businesses.
          </p>

          <div className="mt-12 flex items-center gap-5">
            <Button>
              View Works
            </Button>

            <Button variant="secondary">
              Book Consultation
            </Button>
          </div>

        </div>
      </Container>
    </section>
  );
}