export default function GridLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      
      {/* Vertical Lines */}
      <div
        className="absolute inset-0 opacity-[0.08]"
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

      {/* Horizontal Lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
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

      {/* Blue Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#0000FF]/20 blur-[180px]" />
    </div>
  );
}