import Container from "../common/Container";
import Reveal from "../common/Reveal";

const principles = [
  "Clarity before complexity",
  "Practical creative decisions",
  "Execution tied to business goals",
  "Value over visibility alone",
];

export default function HowItsWork() {
  return (
    <section className="relative z-10 border-y border-white/5 bg-[#030303] py-24 text-white md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative overflow-hidden border border-white/10 bg-[#080808] p-6 md:p-10">
                <div
                  aria-hidden
                  className="absolute right-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#0000FF]/20 blur-[90px]"
                />
                <div className="relative">
                  <p className="mb-4 flex items-center gap-3 text-[13px] uppercase tracking-[0.16em] text-[#0000FF]">
                    <span className="h-[1px] w-[34px] bg-[#0000FF]" />
                    How We Work
                  </p>
                  <h2 className="mb-8 max-w-[680px] text-[42px] font-medium leading-[0.96] tracking-[-0.03em] text-[#F5F5F5] md:text-[68px]">
                    Strategy, creativity, and execution in one clear direction.
                  </h2>
                  <div className="max-w-[760px] space-y-5 text-[17px] leading-[1.65] text-white/60 md:text-[19px]">
                    <p>
                      Every project begins with understanding the business. From
                      there, we identify opportunities, develop tailored
                      solutions, and continuously refine our approach based on
                      performance and results.
                    </p>
                    <p>
                      Our work is guided by a balance of creativity, strategy,
                      and execution, ensuring that every decision contributes to
                      a clear business objective.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative overflow-hidden border border-white/10 bg-[#0A0A0A] p-6 md:p-10">
                <p className="mb-4 flex items-center gap-3 text-[13px] uppercase tracking-[0.16em] text-[#0000FF]">
                  <span className="h-[1px] w-[34px] bg-[#0000FF]" />
                  What We Believe
                </p>
                <h3 className="mb-6 text-[34px] font-medium leading-[1] tracking-[-0.03em] text-[#F5F5F5] md:text-[48px]">
                  Purpose first. Thoughtfully executed.
                </h3>
                <div className="space-y-5 text-[16px] leading-[1.65] text-white/58 md:text-[18px]">
                  <p>
                    We believe good design should solve problems, not just look
                    appealing. Marketing should support business goals, not
                    simply generate visibility. Creative work should always
                    serve a purpose and create value.
                  </p>
                  <p>
                    That is why we focus on clarity, practicality, and
                    thoughtful execution rather than unnecessary complexity.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-[1px] overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
                  {principles.map((principle) => (
                    <div
                      key={principle}
                      className="bg-[#080808] p-4 text-[14px] leading-[1.4] text-white/68"
                    >
                      {principle}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
