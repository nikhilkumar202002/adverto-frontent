"use client";

export default function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Vertical Lines (moves diagonally) */}
      <div
        className="absolute inset-0 opacity-[0.08] grid-move vertical-grid"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.15) 1px,
              transparent 0px
            )
          `,
        }}
      />

      {/* Horizontal Lines (moves on a different path for parallax) */}
      <div
        className="absolute inset-0 opacity-[0.04] grid-move-slow horizontal-grid"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.12) 1px,
              transparent 10px
            )
          `,
        }}
      />

      {/* Blue Glow (subtle floating movement) */}
      {/* <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#0000FF]/20 blur-[180px] glow-move" /> */}

      {/* Left-Bottom Glow (behind text) */}
      <div className="absolute left-14 bottom-8 h-[220px] w-[220px] rounded-full bg-[#0000FF]/20 blur-[120px] glow-left md:left-[220px] md:bottom-[120px] md:h-[420px] md:w-[420px] md:blur-[160px]" />

      {/* Right-Top Glow (behind text) - mirrored/opposite of left */}
      <div className="absolute right-8 top-4 h-[260px] w-[260px] rounded-full bg-[#0000FF]/20 blur-[140px] glow-right md:right-[220px] md:top-[60px] md:h-[520px] md:w-[520px] md:blur-[200px]" />

      <style jsx>{`
        .grid-move {
          animation: moveGrid 40s linear infinite;
          background-position: 0 0;
          background-size: 120px 120px;
        }

        .grid-move-slow {
          animation: moveGridAlt 70s linear infinite;
          background-position: 0 0;
          background-size: 120px 120px;
        }

        /* smaller background grid on small screens */
        @media (max-width: 640px) {
          .grid-move,
          .grid-move-slow {
            background-size: 80px 80px;
          }
          .grid-move { opacity: 0.06; }
          .grid-move-slow { opacity: 0.03; }
        }

        .glow-move {
          animation: glowFloat 12s ease-in-out infinite;
        }

        .glow-left {
          animation: glowLeftFloat 14s ease-in-out infinite;
        }

        .glow-right {
          animation: glowRightFloat 18s ease-in-out infinite;
        }

        @keyframes moveGrid {
          0% { background-position: 0px 0px; }
          25% { background-position: 180px 120px; }
          50% { background-position: -120px -180px; }
          75% { background-position: -60px 90px; }
          100% { background-position: 0px 0px; }
        }

        @keyframes moveGridAlt {
          0% { background-position: 0px 0px; }
          20% { background-position: -140px 80px; }
          40% { background-position: 80px -140px; }
          60% { background-position: 160px 60px; }
          80% { background-position: -60px -160px; }
          100% { background-position: 0px 0px; }
        }

        @keyframes glowFloat {
          0% { transform: translateX(-50%) translateY(0) scale(1); }
          50% { transform: translateX(-30%) translateY(40px) scale(1.05); }
          100% { transform: translateX(-50%) translateY(0) scale(1); }
        }

        @keyframes glowLeftFloat {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.95; }
          50% { transform: translateX(28px) translateY(-20px) scale(1.04); opacity: 0.9; }
          100% { transform: translateX(0) translateY(0) scale(1); opacity: 0.95; }
        }

        @keyframes glowRightFloat {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.9; }
          50% { transform: translateX(-36px) translateY(26px) scale(1.06); opacity: 0.85; }
          100% { transform: translateX(0) translateY(0) scale(1); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}