"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type PreloaderProps = {
  duration?: number;
  onComplete?: () => void;
};

const Preloader = ({ duration = 2200, onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animationDuration = reduceMotion ? 500 : duration;
    const startTime = performance.now();
    let frameId = 0;
    let completeTimer: number | undefined;
    let removeTimer: number | undefined;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const nextProgress = Math.min(Math.round((elapsed / animationDuration) * 100), 100);

      setProgress(nextProgress);

      if (nextProgress < 100) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      completeTimer = window.setTimeout(() => {
        setIsLeaving(true);
        onComplete?.();

        removeTimer = window.setTimeout(() => {
          setIsVisible(false);
        }, 650);
      }, 180);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      if (completeTimer) window.clearTimeout(completeTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex min-h-svh items-center justify-center bg-[#050505] px-6 transition-all duration-700 ease-out ${
        isLeaving ? "pointer-events-none translate-y-[-100%]" : "translate-y-0"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex w-full flex-col items-center">
        <Image
          src="/main-logo.svg"
          alt="Adverto"
          width={300}
          height={60}
          priority
          className="mb-8 h-auto w-[min(64vw,300px)]"
        />

        <div
          className="h-[2px] w-[min(64vw,300px)] overflow-hidden bg-white/12"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full bg-[#0000FF] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Preloader;
