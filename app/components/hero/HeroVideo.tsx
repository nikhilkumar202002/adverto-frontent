type HeroVideoProps = {
  className?: string;
};

const HeroVideo = ({ className = "" }: HeroVideoProps) => {
  const videoClassName = "h-full w-full rounded-[30px] object-cover";

  return (
    <div
      className={`pointer-events-none absolute overflow-hidden rounded-[30px] ${className}`}
      aria-hidden="true"
    >
      <video
        className={`${videoClassName} block min-[821px]:hidden`}
        src="/videos/Adverto_Portrait.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <video
        className={`${videoClassName} hidden min-[821px]:block`}
        src="/videos/Adverto_Landscape.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
};

export default HeroVideo;
