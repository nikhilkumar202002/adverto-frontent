"use client";

import { motion, useInView } from "framer-motion";
import Container from "../common/Container";
import { useEffect, useRef, useState } from "react";
// import InfiniteLogoSlider from "../common/InfiniteLogoSlider";

function useCount(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let rafId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return value;
}

export default function StorySection() {
  const stats = [
    { value: "120+", label: "Campaigns Delivered" },
    { value: "40+", label: "Brand Launches" },
    { value: "8+", label: "Years Experience" },
    { value: "96%", label: "Client Retention" },
  ];
  const statsRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(statsRef, { once: true, amount: 0.4 });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) setStart(true);
  }, [inView]);

  return (
    <section className="relative z-10 bg-[#050505] border-t border-white/5 py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* --- LEFT COLUMN: Header & Story --- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-start"
          >
            <p className="text-[#0000FF] uppercase text-[14px] tracking-[1] mb-2 flex items-center gap-2">
              <span className="w-[30px] h-[1px] bg-[#0000FF]"></span>OUR STORY
            </p>
            
            <h2 className="text-[45px] md:text-[60px] lg:text-[70px] font-medium leading-[1] text-[#EDEDED] mb-4 tracking-tight">
              Two friends. <br className="hidden md:block" />One shared vision.
            </h2>
            
            <p className="text-[#888888] text-[16px] leading-[1.4] max-w-[500px]">
              Founded in 2016, Adverto was built around one belief: that extraordinary creative work changes business outcomes. We combine strategic intelligence with bold visual thinking to create brands that lead categories.
            </p>
          </motion.div>

          {/* --- RIGHT COLUMN: Quote & Stats --- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center"
          >
            <h3 className="text-[18px] md:text-[20px] font-medium text-white mb-1 leading-snug">
              "Built on Trust. Proven Through Results."
            </h3>
            
            <p className="text-[#888888] text-[17px] leading-[1.4] mb-6">
              Behind every number is a project delivered, a challenge solved, and a relationship built on trust.
            </p>

            {/* Blue Divider */}
            <div className="w-12 h-[2px] bg-[#0000FF] mb-10" />

                {/* Stats - start counting when revealed or hovered */}
                <div
                  ref={statsRef}
                  onMouseEnter={() => setStart(true)}
                  className="grid grid-cols-2 gap-[15px]"
                >
                  {
                    // parse numeric targets and suffixes
                  }
                  {
                    (() => {
                      const parsed = stats.map((s) => {
                        const m = s.value.match(/(\d+)/);
                        const num = m ? Number(m[1]) : 0;
                        const suffix = s.value.replace(/\d+/g, "");
                        return { num, suffix, label: s.label };
                      });

                      const c0 = useCount(parsed[0].num, start);
                      const c1 = useCount(parsed[1].num, start);
                      const c2 = useCount(parsed[2].num, start);
                      const c3 = useCount(parsed[3].num, start);

                      const counts = [c0, c1, c2, c3];

                      return parsed.map((p, i) => (
                        <div
                          key={i}
                          className="bg-[#0000FF] border border-[#0000FF] rounded-[15px] p-6 md:p-8 flex flex-col justify-center transition-colors duration-300 hover:bg-[#0000D6] hover:border-[#0000D6]"
                        >
                          <h4 className="text-white text-3xl md:text-4xl font-medium mb-1">
                            {counts[i]}{p.suffix}
                          </h4>
                          <p className="text-white text-[13px] tracking-wide">
                            {p.label}
                          </p>
                        </div>
                      ));
                    })()
                  }
                </div>

          </motion.div>

        </div>

        {/* --- INFINITE LOGO SLIDER --- */}
        {/* <div className="mt-20">
          <InfiniteLogoSlider />
        </div> */}
      </Container>
    </section>
  );
}
