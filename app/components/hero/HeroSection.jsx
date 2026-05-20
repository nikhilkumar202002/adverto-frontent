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
          
          <p className="mb-6 text-[20px] tracking-[0.1em] text-[#0000FF] flex items-center gap-3">
            <span className="w-[50px] h-[1.5px] bg-[#0000FF] inline-block"></span>Creative Agency — Est. 2016
          </p>

          <h1 className="text-[93px] font-semibold leading-[0.9]">
            We build brands that{" "}
            <span className="text-[#0000FF] italic">
              dominate
            </span>{" "}
            attention.
          </h1>

          <p className="mt-8 max-w-[550px] text-[20px] leading-[1.1] text-white/60 font-regular">
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