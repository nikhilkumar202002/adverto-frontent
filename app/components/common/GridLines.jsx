"use client";

export default function GridLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Vertical Lines (moves diagonally) */}
      <div
        className="absolute inset-0 opacity-[0.08] grid-move"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.15) 1px,
              transparent 0px
            )
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Horizontal Lines (moves on a different path for parallax) */}
      <div
        className="absolute inset-0 opacity-[0.04] grid-move-slow"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.12) 1px,
              transparent 10px
            )
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Blue Glow (subtle floating movement) */}
      {/* <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#0000FF]/20 blur-[180px] glow-move" /> */}

      {/* Left-Bottom Glow (behind text) */}
      <div className="absolute left-[220px] bottom-[120px] h-[420px] w-[420px] rounded-full bg-[#0000FF]/20 blur-[160px] glow-left" />

      {/* Right-Top Glow (behind text) - mirrored/opposite of left */}
      <div className="absolute right-[220px] top-[60px] h-[520px] w-[520px] rounded-full bg-[#0000FF]/20 blur-[200px] glow-right" />

      <style jsx>{`
        .grid-move {
          animation: moveGrid 40s linear infinite;
          background-position: 0 0;
        }

        .grid-move-slow {
          animation: moveGridAlt 70s linear infinite;
          background-position: 0 0;
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