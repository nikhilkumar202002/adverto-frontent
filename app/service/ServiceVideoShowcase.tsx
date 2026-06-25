"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const horizontalVideos = [
  "/videos/horizontal/Img%200864.mp4",
  "/videos/horizontal/Img%200865.mp4",
  "/videos/horizontal/Img%200867.mp4",
  "/videos/horizontal/Img%200868.mp4",
  "/videos/horizontal/Img%200870.mp4",
  "/videos/horizontal/Img%200871.mp4",
  "/videos/horizontal/Img%200880.mp4",
  "/videos/horizontal/Img%200881.mp4",
  "/videos/horizontal/Img%200882.mp4",
  "/videos/horizontal/Img%200883.mp4",
];

const verticalVideos = [
  "/videos/vertical/Img%200884.mp4",
  "/videos/vertical/Img%200885.mp4",
  "/videos/vertical/Img%200886.mp4",
  "/videos/vertical/Img%200887.mp4",
  "/videos/vertical/Img%200888.mp4",
  "/videos/vertical/Img%200889.mp4",
  "/videos/vertical/Img%200890.mp4",
  "/videos/vertical/Img%201775.mp4",
  "/videos/vertical/Img%201776.mp4",
  "/videos/vertical/Img%201780.mp4",
  "/videos/vertical/Img%201782.mp4",
  "/videos/vertical/Img%201783.mp4",
  "/videos/vertical/Img%201784.mp4",
  "/videos/vertical/Img%201786.mp4",
  "/videos/vertical/Img%201788.mp4",
];

function PlaylistVideo({
  videos,
  label,
  className,
}: {
  videos: string[];
  label: string;
  className: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const activeVideo = videos[activeIndex];
  const AudioIcon = isMuted ? VolumeX : Volume2;

  return (
    <>
      <video
        key={activeVideo}
        src={activeVideo}
        aria-label={label}
        autoPlay
        muted={isMuted}
        playsInline
        preload="metadata"
        onEnded={() => {
          setActiveIndex((currentIndex) => (currentIndex + 1) % videos.length);
        }}
        className={className}
      />
      <button
        type="button"
        aria-label={isMuted ? `Unmute ${label}` : `Mute ${label}`}
        onClick={() => setIsMuted((currentValue) => !currentValue)}
        className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-colors duration-300 hover:border-[#0000FF] hover:bg-[#0000FF]"
      >
        <AudioIcon size={18} strokeWidth={2} />
      </button>
    </>
  );
}

export default function ServiceVideoShowcase() {
  return (
    <div>
      <div className="mb-12 max-w-[760px]">
        <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
          <span className="h-[1px] w-[30px] bg-[#0000FF]" />
          Video Work
        </p>
        <h2 className="text-[45px] font-medium leading-[1] text-[#EDEDED] md:text-[70px]">
          Frames That Move Brands
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] lg:col-span-3">
          <PlaylistVideo
            videos={horizontalVideos}
            label="Horizontal service video reel"
            className="aspect-video h-full w-full object-contain"
          />
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] lg:col-span-1">
          <PlaylistVideo
            videos={verticalVideos}
            label="Vertical service video reel"
            className="aspect-[9/16] h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
