"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  const closeGallery = () => setActiveIndex(null);
  const showPrevious = () => {
    setActiveIndex((index) =>
      index === null ? index : (index - 1 + images.length) % images.length,
    );
  };
  const showNext = () => {
    setActiveIndex((index) =>
      index === null ? index : (index + 1) % images.length,
    );
  };

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="md:col-span-8 [column-count:2] xl:[column-count:3] [column-gap:6px]">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative mb-[6px] block w-full break-inside-avoid overflow-hidden bg-[#0A0A0A] text-left"
            aria-label={`Open ${title} gallery image ${index + 1}`}
          >
            <img
              src={image}
              alt={`${title} gallery ${index + 1}`}
              loading="lazy"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/35" />
            <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center bg-[#0000FF] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Expand size={16} />
            </span>
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery image viewer`}
        >
          <button
            type="button"
            onClick={closeGallery}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-white/20 bg-black/50 text-white transition-colors hover:border-white md:right-8 md:top-8"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-white transition-colors hover:border-white md:left-8"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-white transition-colors hover:border-white md:right-8"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          ) : null}

          <div className="flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4">
            <img
              src={activeImage}
              alt={`${title} gallery ${activeIndex + 1}`}
              className="max-h-[82vh] w-auto max-w-full object-contain"
            />
            <p className="text-sm text-white/60">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
