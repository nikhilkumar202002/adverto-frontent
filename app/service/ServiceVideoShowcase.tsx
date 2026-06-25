"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const horizontalVideos = [
  "/videos/horizontal/Img%200864.mp4",
  "/videos/horizontal/Img%200865.mp4",
  "/videos/horizontal/IMG_0866.mp4",
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
  "/videos/vertical/IMG_1781.mp4",
  "/videos/vertical/Img%201782.mp4",
  "/videos/vertical/Img%201783.mp4",
  "/videos/vertical/Img%201784.mp4",
  "/videos/vertical/Img%201786.mp4",
  "/videos/vertical/Img%201788.mp4",
];

function createShuffledIndexes(length: number, previousIndex?: number) {
  const indexes = Array.from({ length }, (_, index) => index);

  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [indexes[index], indexes[swapIndex]] = [indexes[swapIndex], indexes[index]];
  }

  if (length > 1 && indexes[0] === previousIndex) {
    [indexes[0], indexes[1]] = [indexes[1], indexes[0]];
  }

  return indexes;
}

function PlaylistVideo({
  videos,
  label,
  className,
}: {
  videos: string[];
  label: string;
  className: string;
}) {
  const [playbackOrder, setPlaybackOrder] = useState([0]);
  const [orderIndex, setOrderIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const activeIndex = playbackOrder[orderIndex] ?? 0;
  const activeVideo = videos[activeIndex];
  const AudioIcon = isMuted ? VolumeX : Volume2;

  const playNextVideo = () => {
    if (videos.length < 2) return;

    if (orderIndex < playbackOrder.length - 1) {
      setOrderIndex((currentValue) => currentValue + 1);
      return;
    }

    setPlaybackOrder(createShuffledIndexes(videos.length, activeIndex));
    setOrderIndex(0);
  };

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
        onEnded={playNextVideo}
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
