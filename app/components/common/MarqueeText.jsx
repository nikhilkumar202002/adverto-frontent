"use client";

import React from "react";

export default function MarqueeText({ items = [] }) {
  return (
    <div className="relative flex w-full overflow-hidden border-y border-white/10 bg-black py-4">
      {/* Inline style for the keyframes. 
        Translating by -50% works perfectly because we render exactly TWO identical sets of the items. 
      */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        /* Optional: Pause animation on hover */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* The scrolling track */}
      <div className="animate-marquee flex w-max items-center">
        {/* We duplicate the array to 2 sets to create the seamless loop */}
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex shrink-0 items-center">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <span className="mx-8 text-[13px] font-semibold tracking-[0.15em] text-white/90 uppercase">
                  {item}
                </span>
                {/* The Blue Dot Separator */}
                <span className="text-xl leading-none text-[#0000FF]">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}